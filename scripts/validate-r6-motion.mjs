import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import path from 'node:path';
import {
  assert,
  buildRoot,
  chromePath,
  createStaticServer,
  ensureEvidenceDirs,
  setPayloadAndWait,
  setScanAndWait,
  setSceneAndWait,
  waitForGarden,
  writeEvidence,
} from './validation-helpers.mjs';

const MODEL = 'session-seeded-natural-lively-v1';
const FIXED_SEEDS = Array.from({ length: 30 }, (_, index) => `r6-browser-seed-${String(index + 1).padStart(2, '0')}`);
const SESSION_SECONDS = 240;
const SAMPLE_STEP_SECONDS = 2;

function digest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function trajectorySignature(samples) {
  return digest(samples.map((sample) => ({
    t: sample.time,
    intent: sample.intent,
    action: sample.action,
    x: Number(sample.x.toFixed(5)),
    z: Number(sample.z.toFixed(5)),
    speed: Number(sample.speed.toFixed(5)),
    heading: Number(sample.heading.toFixed(5)),
    targetId: sample.targetId,
  })));
}

async function configureKitty(page) {
  await page.evaluate(() => window.__VOXELQR_TEST__.setTheme('kitty'));
  await setSceneAndWait(page);
}

async function sampleSession(page, seed, seconds = SESSION_SECONDS) {
  return page.evaluate(({ sessionSeed, duration, step }) => {
    const api = window.__VOXELQR_TEST__;
    api.setMode('scene');
    api.setDiagnosticAnimationTime(null);
    api.setKittyTestSeed(sessionSeed);
    const samples = [];
    for (let time = 0; time <= duration + 1e-9; time += step) {
      api.setDiagnosticAnimationTime(Number(time.toFixed(6)));
      const motion = api.getKittyMotionSample();
      samples.push({
        time,
        intent: motion.intent,
        action: motion.pose.action,
        x: motion.pose.normalizedX,
        z: motion.pose.normalizedZ,
        speed: motion.pose.normalizedSpeed,
        heading: motion.pose.heading,
        targetId: motion.steering.targetId,
      });
    }
    const final = api.getKittyMotionSample();
    api.setDiagnosticAnimationTime(null);
    return {
      samples,
      final: {
        motionModel: final.motionModel,
        sessionSeed: final.sessionSeed,
        seedSource: final.seedSource,
        testSeedOverride: final.testSeedOverride,
        behavior: final.behavior,
        safety: final.safety,
        heatmap: final.heatmap,
        targetHistory: final.targetHistory,
        recentTargets: final.recentTargets,
        rngState: final.rngState,
        loopPolicy: final.loopPolicy,
      },
    };
  }, { sessionSeed: seed, duration: seconds, step: SAMPLE_STEP_SECONDS });
}

function assertDistribution(distribution, label) {
  const passive = distribution.observe + distribution.turn + distribution.tail;
  assert(distribution.walk >= 0.35 && distribution.walk <= 0.55, `R6_DISTRIBUTION_WALK:${label}:${distribution.walk}`);
  assert(distribution.run >= 0.20 && distribution.run <= 0.35, `R6_DISTRIBUTION_RUN:${label}:${distribution.run}`);
  assert(distribution.dash >= 0.05 && distribution.dash <= 0.12, `R6_DISTRIBUTION_DASH:${label}:${distribution.dash}`);
  assert(passive >= 0.15 && passive <= 0.25, `R6_DISTRIBUTION_PASSIVE:${label}:${passive}`);
}

await ensureEvidenceDirs();
const server = await createStaticServer(path.join(buildRoot, 'web'));
let browser;

try {
  browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: [
      '--disable-gpu-sandbox',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--enable-unsafe-swiftshader',
    ],
  });

  const productionLaunches = [];
  for (let launch = 0; launch < 10; launch += 1) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${server.origin}/`, { waitUntil: 'networkidle' });
    await waitForGarden(page);
    await configureKitty(page);
    const launchResult = await page.evaluate(() => {
      const api = window.__VOXELQR_TEST__;
      const initial = api.getKittyMotionSample();
      const samples = [];
      for (let time = 0; time <= 120; time += 2) {
        api.setDiagnosticAnimationTime(time);
        const motion = api.getKittyMotionSample();
        samples.push({
          time,
          intent: motion.intent,
          action: motion.pose.action,
          x: motion.pose.normalizedX,
          z: motion.pose.normalizedZ,
          speed: motion.pose.normalizedSpeed,
          heading: motion.pose.heading,
          targetId: motion.steering.targetId,
        });
      }
      return {
        sessionSeed: initial.sessionSeed,
        seedSource: initial.seedSource,
        productionSessionFreshSeed: initial.productionSessionFreshSeed,
        model: initial.motionModel,
        samples,
      };
    });
    productionLaunches.push({
      launch: launch + 1,
      sessionSeed: launchResult.sessionSeed,
      seedSource: launchResult.seedSource,
      productionSessionFreshSeed: launchResult.productionSessionFreshSeed,
      model: launchResult.model,
      trajectorySignature: trajectorySignature(launchResult.samples),
    });
    await page.close();
  }
  assert(productionLaunches.every((entry) => entry.model === MODEL && entry.seedSource === 'production-crypto' && entry.productionSessionFreshSeed), 'R6_PRODUCTION_SEED_SOURCE');
  assert(new Set(productionLaunches.map((entry) => entry.sessionSeed)).size === 10, 'R6_PRODUCTION_SEED_UNIQUENESS');
  assert(new Set(productionLaunches.map((entry) => entry.trajectorySignature)).size === 10, 'R6_PRODUCTION_TRAJECTORY_UNIQUENESS');

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const externalRequests = [];
  const consoleErrors = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== server.origin) externalRequests.push(request.url());
  });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  await page.goto(`${server.origin}/`, { waitUntil: 'networkidle' });
  await waitForGarden(page);
  await configureKitty(page);

  const fixedSessions = [];
  const heatmapUnion = new Set();
  for (const seed of FIXED_SEEDS) {
    const sampled = await sampleSession(page, seed);
    const signature = trajectorySignature(sampled.samples);
    const distribution = sampled.final.behavior.intentDistribution;
    assert(sampled.final.motionModel === MODEL && sampled.final.testSeedOverride && sampled.final.seedSource === 'test-override', `R6_TEST_SEED_OVERRIDE:${seed}`);
    assert(Object.values(sampled.final.loopPolicy).every((value) => value === false), `R6_LOOP_POLICY:${seed}`);
    assertDistribution(distribution, seed);
    assert(sampled.final.safety.boundaryCorrections <= 2 && sampled.final.safety.stuckSeconds === 0, `R6_SESSION_SAFETY:${seed}`);
    sampled.final.heatmap.seconds.forEach((seconds, cell) => { if (seconds > 0) heatmapUnion.add(cell); });
    const samples44 = sampled.samples.filter((sample) => sample.time <= 132 && sample.time % 44 === 0);
    const repeated44 = samples44.length >= 4 && samples44.every((sample) => (
      sample.intent === samples44[0].intent
      && sample.action === samples44[0].action
      && Math.hypot(sample.x - samples44[0].x, sample.z - samples44[0].z) < 1e-6
      && Math.abs(sample.heading - samples44[0].heading) < 1e-6
    ));
    assert(!repeated44, `R6_44_SECOND_REPEAT:${seed}`);
    fixedSessions.push({
      seed,
      trajectorySignature: signature,
      targetSequenceSignature: digest(sampled.final.targetHistory),
      sampleCount: sampled.samples.length,
      distribution,
      safety: sampled.final.safety,
      heatmapVisitedCells: sampled.final.heatmap.seconds.filter((seconds) => seconds > 0).length,
      heatmap: sampled.final.heatmap,
      recentTargets: sampled.final.recentTargets,
      targetHistory: sampled.final.targetHistory,
      rngState: sampled.final.rngState,
      timeline: sampled.samples,
    });
  }
  assert(new Set(fixedSessions.map((entry) => entry.trajectorySignature)).size === 30, 'R6_FIXED_TRAJECTORY_SIGNATURES');
  assert(new Set(fixedSessions.map((entry) => entry.targetSequenceSignature)).size === 30, 'R6_FIXED_TARGET_SEQUENCES');
  assert(heatmapUnion.size >= 68, `R6_MULTI_SESSION_HEATMAP_COVERAGE:${heatmapUnion.size}`);
  const allTimelineSamples = fixedSessions.flatMap((entry) => entry.timeline);
  const countRegion = (predicate) => allTimelineSamples.filter(predicate).length;
  const regionCoverage = {
    activeQrCenter: countRegion((sample) => Math.abs(sample.x) < 0.15 && Math.abs(sample.z) < 0.15),
    northQuietZoneReach: countRegion((sample) => sample.z > 0.72),
    southQuietZoneReach: countRegion((sample) => sample.z < -0.72),
    eastQuietZoneReach: countRegion((sample) => sample.x > 0.72),
    westQuietZoneReach: countRegion((sample) => sample.x < -0.72),
    northEastFunctionAndSafeCorner: countRegion((sample) => sample.x > 0.65 && sample.z > 0.65),
    northWestFunctionAndSafeCorner: countRegion((sample) => sample.x < -0.65 && sample.z > 0.65),
    southEastSafeCorner: countRegion((sample) => sample.x > 0.65 && sample.z < -0.65),
    southWestFunctionAndSafeCorner: countRegion((sample) => sample.x < -0.65 && sample.z < -0.65),
    minimumX: Math.min(...allTimelineSamples.map((sample) => sample.x)),
    maximumX: Math.max(...allTimelineSamples.map((sample) => sample.x)),
    minimumZ: Math.min(...allTimelineSamples.map((sample) => sample.z)),
    maximumZ: Math.max(...allTimelineSamples.map((sample) => sample.z)),
  };
  assert(Object.entries(regionCoverage)
    .filter(([key]) => !key.startsWith('minimum') && !key.startsWith('maximum'))
    .every(([, count]) => count > 0), `R6_MULTI_SESSION_REQUIRED_REGIONS:${JSON.stringify(regionCoverage)}`);

  const replayA = await sampleSession(page, FIXED_SEEDS[0]);
  const replayB = await sampleSession(page, FIXED_SEEDS[0]);
  assert(trajectorySignature(replayA.samples) === trajectorySignature(replayB.samples), 'R6_FIXED_SEED_TRAJECTORY_REPLAY');
  assert(JSON.stringify(replayA.final) === JSON.stringify(replayB.final), 'R6_FIXED_SEED_STATE_REPLAY');

  await page.evaluate(() => {
    const api = window.__VOXELQR_TEST__;
    api.setKittyTestSeed('r6-payload-continuity');
    api.setDiagnosticAnimationTime(73);
  });
  const payloadBefore = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
  await setPayloadAndWait(page, 'X'.repeat(201), 'text');
  const payloadAfter = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
  for (const key of ['sessionSeed', 'intent', 'rngState', 'heatmap', 'recentTargets']) {
    assert(JSON.stringify(payloadBefore[key]) === JSON.stringify(payloadAfter[key]), `R6_PAYLOAD_CONTINUITY:${key}`);
  }
  for (const key of ['worldX', 'worldZ', 'heading', 'gaitPhase', 'action']) {
    assert(payloadBefore.pose[key] === payloadAfter.pose[key], `R6_PAYLOAD_WORLD_CONTINUITY:${key}`);
  }
  const worldSpeedBefore = payloadBefore.pose.speed * payloadBefore.navigation.heroScale;
  const worldSpeedAfter = payloadAfter.pose.speed * payloadAfter.navigation.heroScale;
  assert(Math.abs(worldSpeedBefore - worldSpeedAfter) <= 1e-5, `R6_PAYLOAD_WORLD_SPEED_CONTINUITY:${worldSpeedBefore}:${worldSpeedAfter}`);

  const intentTimes = new Map();
  const reference = fixedSessions[0];
  for (const sample of reference.timeline) {
    if (!intentTimes.has(sample.intent)) intentTimes.set(sample.intent, sample.time);
  }
  assert(['walk', 'run', 'dash', 'observe', 'turn', 'tail'].every((intent) => intentTimes.has(intent)), 'R6_SCAN_INTENT_COVERAGE');
  const scanCases = [];
  for (const intent of ['walk', 'run', 'dash', 'observe', 'turn', 'tail']) {
    await setSceneAndWait(page);
    await page.evaluate(({ seed, time }) => {
      const api = window.__VOXELQR_TEST__;
      api.setDiagnosticAnimationTime(null);
      api.setKittyTestSeed(seed);
      api.setDiagnosticAnimationTime(time);
    }, { seed: FIXED_SEEDS[0], time: intentTimes.get(intent) });
    const before = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
    await setScanAndWait(page);
    const frozenFirst = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
    await page.waitForTimeout(180);
    const frozenSecond = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
    assert(frozenFirst.scanHidden && !frozenFirst.renderVisible && frozenFirst.snapshot, `R6_SCAN_HIDE:${intent}`);
    for (const key of ['clockSeconds', 'sessionSeed', 'intent', 'steering', 'heatmap', 'recentTargets', 'rngState', 'pose', 'snapshot']) {
      assert(JSON.stringify(frozenFirst[key]) === JSON.stringify(frozenSecond[key]), `R6_SCAN_FREEZE:${intent}:${key}`);
    }
    assert(frozenFirst.snapshot.intent === frozenFirst.intent, `R6_SCAN_SNAPSHOT_INTENT:${intent}`);
    assert(JSON.stringify(frozenFirst.snapshot.steering) === JSON.stringify(frozenFirst.steering), `R6_SCAN_SNAPSHOT_STEERING:${intent}`);
    assert(JSON.stringify(frozenFirst.snapshot.heatmap) === JSON.stringify(frozenFirst.heatmap), `R6_SCAN_SNAPSHOT_HEATMAP:${intent}`);
    assert(JSON.stringify(frozenFirst.snapshot.recentTargets) === JSON.stringify(frozenFirst.recentTargets), `R6_SCAN_SNAPSHOT_RECENT:${intent}`);
    assert(JSON.stringify(frozenFirst.snapshot.rngState) === JSON.stringify(frozenFirst.rngState), `R6_SCAN_SNAPSHOT_RNG:${intent}`);
    const pixel = await page.evaluate(() => window.__VOXELQR_TEST__.measureKittyScanNoCatPixelDiff({ includeImages: false }));
    assert(pixel.diff.exact && pixel.diff.fullFrameDifferentPixels === 0 && pixel.diff.qrRoiDifferentPixels === 0, `R6_SCAN_ZERO_DIFF:${intent}`);
    await setSceneAndWait(page);
    const restored = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
    for (const key of ['clockExact', 'poseExact', 'intentExact', 'steeringExact', 'heatmapExact', 'recentTargetsExact', 'rngStateExact', 'bodyMatricesExact', 'darkCapMatricesExact', 'lightCapMatricesExact', 'particleMatricesExact', 'seedExact']) {
      assert(restored.lastRestore?.[key] === true, `R6_SCAN_RESTORE:${intent}:${key}`);
    }
    assert(JSON.stringify(before.pose) === JSON.stringify(restored.lastRestore.snapshot.pose), `R6_SCAN_EDGE_POSE:${intent}`);
    scanCases.push({
      intent,
      timeSeconds: intentTimes.get(intent),
      normalizedPosition: [before.pose.normalizedX, before.pose.normalizedZ],
      zeroDiff: pixel.diff,
      restore: Object.fromEntries(Object.entries(restored.lastRestore).filter(([key]) => key.endsWith('Exact'))),
    });
    await page.evaluate(() => window.__VOXELQR_TEST__.setDiagnosticAnimationTime(null));
  }

  assert(externalRequests.length === 0, `R6_MOTION_EXTERNAL_REQUESTS:${externalRequests.join('|')}`);
  assert(consoleErrors.length === 0, `R6_MOTION_CONSOLE_ERRORS:${consoleErrors.join('|')}`);
  const report = {
    schemaVersion: 'voxelqr-r6-production-motion-validation-v1',
    generatedAtUtc: new Date().toISOString(),
    model: MODEL,
    productionLaunches,
    fixedSeedConfiguration: { count: FIXED_SEEDS.length, seconds: SESSION_SECONDS, sampleStepSeconds: SAMPLE_STEP_SECONDS },
    fixedSessions,
    heatmapUnionVisitedCells: heatmapUnion.size,
    regionCoverage,
    replay: {
      seed: FIXED_SEEDS[0],
      trajectorySignature: trajectorySignature(replayA.samples),
      exactTrajectory: true,
      exactFinalState: true,
    },
    payloadContinuity: {
      seed: payloadBefore.sessionSeed,
      exactSeedIntentRngHeatmapRecentTargetsAndWorldPose: true,
      newGridSize: await page.evaluate(() => window.__VOXELQR_TEST__.getQr().size),
    },
    scanCases,
    externalRequests,
    consoleErrors,
    gates: {
      R6_PRODUCTION_10_SESSION_SEED_GATE: 'PASS_10_OF_10_DISTINCT',
      R6_PRODUCTION_10_TRAJECTORY_GATE: 'PASS_10_OF_10_DISTINCT',
      R6_FIXED_30_SEED_TRAJECTORY_GATE: 'PASS_30_OF_30_DISTINCT',
      R6_FIXED_30_TARGET_SEQUENCE_GATE: 'PASS_30_OF_30_NO_COMMON_FIXED_ORDER',
      R6_44_SECOND_PERIODICITY_GATE: 'PASS_0_OF_30_REPEATED',
      R6_DISTRIBUTION_GATE: 'PASS_30_OF_30_NATURAL_LIVELY_BANDS',
      R6_MULTI_SESSION_COVERAGE_GATE: `PASS_${heatmapUnion.size}_OF_81_HEATMAP_CELLS`,
      R6_REQUIRED_BOARD_REGIONS_GATE: 'PASS_ACTIVE_QR_FUNCTION_MODULES_FOUR_QUIET_ZONE_SIDES_FOUR_SAFE_CORNERS_AND_BOTH_BOARD_AXES',
      R6_FIXED_SEED_REPLAY_GATE: 'PASS_EXACT_TRAJECTORY_AND_STATE',
      R6_PAYLOAD_SESSION_CONTINUITY_GATE: 'PASS_EXACT_NO_RESEED_NO_TELEPORT',
      R6_SCAN_COMPLETE_SNAPSHOT_GATE: 'PASS_6_OF_6_INTENTS_EXACT',
      R6_SCAN_ZERO_DIFF_GATE: 'PASS_6_OF_6_FULL_FRAME_AND_QR_ROI_0',
      R6_OFFLINE_CONSOLE_GATE: 'PASS_0_REQUESTS_0_ERRORS',
    },
  };
  const reportPath = await writeEvidence('r6-motion-validation.json', report);
  console.log(JSON.stringify({ ...report.gates, reportPath }, null, 2));
  await page.close();
} finally {
  await browser?.close();
  await server.close();
}
