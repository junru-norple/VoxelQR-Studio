import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import {
  assert,
  buildRoot,
  chromePath,
  createStaticServer,
  decodePng,
  ensureEvidenceDirs,
  setPayloadAndWait,
  setScanAndWait,
  setSceneAndWait,
  sha256,
  themes,
  validationRoot,
  waitForGarden,
  writeEvidence,
} from './validation-helpers.mjs';

const expectedSide = 1001;
const kittyPoseCountPerPayload = 330;
const kittyObservationSeconds = 164.5;
const expectedLegacySampleCount = 1016;
const expectedKittySampleCount = 2640;
const expectedSampleCount = 3656;
const model = 'session-seeded-natural-lively-v1';
const windowByTheme = {
  sakura: 15,
  summer: 15,
  maple: 15,
  ginkgo: 15,
  snow: 15,
  sunset: 12,
  ocean: 12,
  wanderer: 20,
};
const payloadCases = [
  { name: 'minimum-n21', payload: 'X', expectedN: 21 },
  { name: 'boundary-v1-last-n21', payload: 'X'.repeat(10), expectedN: 21 },
  { name: 'boundary-v2-first-n25', payload: 'X'.repeat(11), expectedN: 25 },
  { name: 'boundary-v3-last-n29', payload: 'X'.repeat(35), expectedN: 29 },
  { name: 'calibration-v4-first-n33', payload: 'X'.repeat(36), expectedN: 33 },
  { name: 'first-n37', payload: 'X'.repeat(51), expectedN: 37 },
  { name: 'middle-n65', payload: 'X'.repeat(201), expectedN: 65 },
  { name: 'near-capacity-n105', payload: 'X'.repeat(600), expectedN: 105 },
];
const executionThemes = ['kitty', ...themes.filter((theme) => theme !== 'kitty')];
const executionPayloadCases = [...payloadCases.slice(6), payloadCases[5], payloadCases[4], payloadCases[3], payloadCases[2], ...payloadCases.slice(0, 2)];

function dataUrlBuffer(dataUrl) {
  const index = dataUrl.indexOf('base64,');
  assert(index >= 0, 'R6_EXPORT_DATA_URL_INVALID');
  return Buffer.from(dataUrl.slice(index + 7), 'base64');
}

function legacySampleTimes(durationSeconds) {
  return Array.from({ length: durationSeconds + 1 }, (_, index) => index);
}

function sampleTimes(theme) {
  if (theme === 'kitty') {
    return Array.from({ length: kittyPoseCountPerPayload }, (_, index) => Number((index * 0.5).toFixed(6)));
  }
  return legacySampleTimes(windowByTheme[theme]);
}

const exactRestoreKeys = [
  'clockExact', 'poseExact', 'intentExact', 'steeringExact', 'heatmapExact', 'recentTargetsExact',
  'rngStateExact', 'bodyMatricesExact', 'darkCapMatricesExact', 'lightCapMatricesExact',
  'particleMatricesExact', 'seedExact',
];

await ensureEvidenceDirs();
const partialPath = path.join(validationRoot, 'export-r6-validation.partial.json');
const debugRoot = path.join(validationRoot, 'downloads', 'export-r6-decode-debug');
await mkdir(debugRoot, { recursive: true });
const rows = [];
const consoleErrors = [];
const externalRequests = [];
const server = await createStaticServer(path.join(buildRoot, 'web'));
let browser;

async function writePartial(failure = null, activeRow = null) {
  await writeFile(partialPath, `${JSON.stringify({
    schemaVersion: 'v1.1.0-r6-export-validation-v1',
    generatedAtUtc: new Date().toISOString(),
    expectedSide,
    kittyPoseCountPerPayload,
    kittyObservationSeconds,
    rows,
    activeRow,
    failure,
  }, null, 2)}\n`, 'utf8');
}

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
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== server.origin) externalRequests.push(request.url());
  });
  await page.goto(`${server.origin}/`, { waitUntil: 'networkidle' });
  await waitForGarden(page);
  await setSceneAndWait(page);

  for (const theme of executionThemes) {
    await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
    for (const payloadCase of executionPayloadCases) {
      await setSceneAndWait(page);
      await setPayloadAndWait(page, payloadCase.payload, 'text');
      await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().visual.responsiveHero.transitionSettled, undefined, { timeout: 10_000 });
      const actualN = await page.evaluate(() => window.__VOXELQR_TEST__.getQr().size);
      assert(actualN === payloadCase.expectedN, `R6_EXPORT_GRID_SIZE:${theme}:${payloadCase.name}:N${actualN}`);
      if (theme === 'kitty') {
        await page.evaluate((seed) => {
          const api = window.__VOXELQR_TEST__;
          api.setDiagnosticAnimationTime(null);
          api.setKittyTestSeed(seed);
          api.setDiagnosticAnimationTime(0);
        }, `r6-export-${payloadCase.name}`);
      } else {
        await page.evaluate(() => window.__VOXELQR_TEST__.setDiagnosticAnimationTime(0));
        await setScanAndWait(page);
      }

      const times = sampleTimes(theme);
      const samples = [];
      let kittyFinal = null;
      for (let sampleIndex = 0; sampleIndex < times.length; sampleIndex += 1) {
        const timeSeconds = times[sampleIndex];
        let capture;
        if (theme === 'kitty') {
          capture = await page.evaluate(async (time) => {
            const api = window.__VOXELQR_TEST__;
            api.setDiagnosticAnimationTime(time);
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            const before = api.getKittyMotionSample();
            api.setMode('scan');
            const frozen = api.getKittyMotionSample();
            const dataUrl = api.captureTopDown();
            api.setMode('scene');
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            const restored = api.getKittyMotionSample();
            return { before, frozen, restored, dataUrl };
          }, timeSeconds);
          const { before, frozen, restored } = capture;
          assert(before.motionModel === model && before.testSeedOverride && before.seedSource === 'test-override', `R6_EXPORT_MODEL_OR_SEED:${payloadCase.name}:${sampleIndex}`);
          assert(!Object.hasOwn(before, 'plan'), `R6_EXPORT_FIXED_PLAN_PRESENT:${payloadCase.name}:${sampleIndex}`);
          assert(Object.values(before.loopPolicy).every((value) => value === false), `R6_EXPORT_LOOP_POLICY:${payloadCase.name}:${sampleIndex}`);
          assert(Math.abs(before.pose.time - timeSeconds) <= 1e-6, `R6_EXPORT_POSE_TIME:${payloadCase.name}:${sampleIndex}:${before.pose.time}`);
          assert(frozen.scanHidden && !frozen.renderVisible && frozen.snapshot, `R6_EXPORT_SCAN_HIDE:${payloadCase.name}:${sampleIndex}`);
          assert(!frozen.bodyMeshVisible && !frozen.darkCapsVisible && !frozen.lightCapsVisible, `R6_EXPORT_VISIBLE_MESH:${payloadCase.name}:${sampleIndex}`);
          assert(frozen.snapshot.sessionSeed === before.sessionSeed, `R6_EXPORT_SNAPSHOT_SEED:${payloadCase.name}:${sampleIndex}`);
          assert(frozen.snapshot.intent === before.intent, `R6_EXPORT_SNAPSHOT_INTENT:${payloadCase.name}:${sampleIndex}`);
          assert(JSON.stringify(frozen.snapshot.rngState) === JSON.stringify(before.rngState), `R6_EXPORT_SNAPSHOT_RNG:${payloadCase.name}:${sampleIndex}`);
          assert(exactRestoreKeys.every((key) => restored.lastRestore?.[key] === true), `R6_EXPORT_RESTORE:${payloadCase.name}:${sampleIndex}`);
          kittyFinal = before;
        } else {
          capture = await page.evaluate(async (time) => {
            window.__VOXELQR_TEST__.setDiagnosticAnimationTime(time);
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            return { dataUrl: window.__VOXELQR_TEST__.captureTopDown() };
          }, timeSeconds);
        }
        const buffer = dataUrlBuffer(capture.dataUrl);
        const image = PNG.sync.read(buffer);
        const decoded = decodePng(buffer);
        const motion = theme === 'kitty' ? capture.before : null;
        samples.push({
          poseIndex: theme === 'kitty' ? sampleIndex : null,
          timeSeconds,
          intent: motion?.intent ?? null,
          action: motion?.pose.action ?? null,
          moving: motion?.pose.moving ?? null,
          worldX: motion?.pose.worldX ?? null,
          worldZ: motion?.pose.worldZ ?? null,
          heading: motion?.pose.heading ?? null,
          speed: motion?.pose.normalizedSpeed ?? null,
          targetId: motion?.steering.targetId ?? null,
          width: image.width,
          height: image.height,
          pngSha256: sha256(buffer),
          decodedPayloadSha256: decoded === null ? null : sha256(Buffer.from(decoded)),
          decode: decoded === payloadCase.payload ? 'PASS' : 'FAIL',
        });
        if (image.width !== expectedSide || image.height !== expectedSide || decoded !== payloadCase.payload) {
          const failureName = `${theme}-${payloadCase.name}-p${sampleIndex}-fail.png`;
          await writeFile(path.join(debugRoot, failureName), buffer);
          await writePartial({ theme, payloadCase: payloadCase.name, sampleIndex, timeSeconds, failureName }, { theme, payloadCase: payloadCase.name, samples });
          assert(image.width === expectedSide && image.height === expectedSide, `R6_EXPORT_DIMENSIONS:${theme}:${payloadCase.name}:${sampleIndex}:${image.width}x${image.height}`);
          assert(decoded === payloadCase.payload, `R6_EXPORT_DECODE:${theme}:${payloadCase.name}:${sampleIndex}`);
        }
        if (theme === 'kitty' && (sampleIndex + 1) % 30 === 0) {
          await writePartial(null, { theme, payloadCase: payloadCase.name, sampleCount: samples.length });
          console.log(`R6_EXPORT_KITTY_PROGRESS ${payloadCase.name} ${sampleIndex + 1}/${times.length}`);
        }
      }

      let kittyScanZeroDiff = null;
      let kittyRestore = null;
      if (theme === 'kitty') {
        assert(new Set(samples.map((sample) => sample.action)).size === 6, `R6_EXPORT_ACTION_COVERAGE:${payloadCase.name}`);
        assert(new Set(samples.map((sample) => sample.intent)).size === 6, `R6_EXPORT_INTENT_COVERAGE:${payloadCase.name}`);
        const distribution = kittyFinal.behavior.intentDistribution;
        const passive = distribution.observe + distribution.turn + distribution.tail;
        assert(distribution.walk >= 0.35 && distribution.walk <= 0.55, `R6_EXPORT_WALK_DISTRIBUTION:${payloadCase.name}`);
        assert(distribution.run >= 0.20 && distribution.run <= 0.35, `R6_EXPORT_RUN_DISTRIBUTION:${payloadCase.name}`);
        assert(distribution.dash >= 0.05 && distribution.dash <= 0.12, `R6_EXPORT_DASH_DISTRIBUTION:${payloadCase.name}`);
        assert(passive >= 0.15 && passive <= 0.25, `R6_EXPORT_PASSIVE_DISTRIBUTION:${payloadCase.name}`);
        await setScanAndWait(page);
        kittyScanZeroDiff = await page.evaluate(() => window.__VOXELQR_TEST__.measureKittyScanNoCatPixelDiff({ includeImages: false }));
        assert(kittyScanZeroDiff.diff.exact && kittyScanZeroDiff.diff.fullFrameDifferentPixels === 0 && kittyScanZeroDiff.diff.qrRoiDifferentPixels === 0, `R6_EXPORT_ZERO_DIFF:${payloadCase.name}`);
        await setSceneAndWait(page);
        const restored = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
        assert(exactRestoreKeys.every((key) => restored.lastRestore?.[key] === true), `R6_EXPORT_FINAL_RESTORE:${payloadCase.name}`);
        kittyRestore = Object.fromEntries(exactRestoreKeys.map((key) => [key, restored.lastRestore[key]]));
      }

      rows.push({
        theme,
        payloadCase: payloadCase.name,
        gridSize: actualN,
        sampleCount: samples.length,
        kittySessionSeed: kittyFinal?.sessionSeed ?? null,
        kittyBehavior: kittyFinal?.behavior ?? null,
        kittySafety: kittyFinal?.safety ?? null,
        kittyLoopPolicy: kittyFinal?.loopPolicy ?? null,
        kittyTargetHistorySignature: kittyFinal ? sha256(Buffer.from(JSON.stringify(kittyFinal.targetHistory))) : null,
        kittyScanZeroDiff,
        kittyRestore,
        samples,
      });
      await page.evaluate(() => window.__VOXELQR_TEST__.setDiagnosticAnimationTime(null));
      await setSceneAndWait(page);
      await writePartial();
      console.log(`R6_EXPORT_ROW_PASS ${rows.length}/72 ${theme} ${payloadCase.name} ${samples.length}/${samples.length}`);
    }
  }

  const legacyRows = rows.filter((row) => row.theme !== 'kitty');
  const kittyRows = rows.filter((row) => row.theme === 'kitty');
  const legacySampleCount = legacyRows.reduce((sum, row) => sum + row.samples.length, 0);
  const kittySampleCount = kittyRows.reduce((sum, row) => sum + row.samples.length, 0);
  const sampleCount = legacySampleCount + kittySampleCount;
  assert(rows.length === 72, `R6_EXPORT_ROWS:${rows.length}`);
  assert(legacyRows.length === 64 && legacySampleCount === expectedLegacySampleCount, `R6_EXPORT_LEGACY:${legacyRows.length}:${legacySampleCount}`);
  assert(kittyRows.length === 8 && kittySampleCount === expectedKittySampleCount, `R6_EXPORT_KITTY:${kittyRows.length}:${kittySampleCount}`);
  assert(sampleCount === expectedSampleCount, `R6_EXPORT_TOTAL:${sampleCount}`);
  assert(new Set(kittyRows.map((row) => row.kittySessionSeed)).size === 8, 'R6_EXPORT_SEED_UNIQUENESS');
  assert(new Set(kittyRows.map((row) => row.kittyTargetHistorySignature)).size === 8, 'R6_EXPORT_TARGET_SEQUENCE_UNIQUENESS');
  assert(kittyRows.every((row) => Object.values(row.kittyLoopPolicy).every((value) => value === false)), 'R6_EXPORT_LOOP_POLICY_GATE');
  assert(kittyRows.every((row) => row.kittyScanZeroDiff?.diff?.exact), 'R6_EXPORT_SCAN_ZERO_DIFF_GATE');
  assert(kittyRows.every((row) => exactRestoreKeys.every((key) => row.kittyRestore?.[key] === true)), 'R6_EXPORT_RESTORE_GATE');
  assert(consoleErrors.length === 0, `R6_EXPORT_CONSOLE_ERRORS:${consoleErrors.join('|')}`);
  assert(externalRequests.length === 0, `R6_EXPORT_EXTERNAL_REQUESTS:${externalRequests.join('|')}`);

  const gates = {
    R6_EXPORT_FIXED_NATIVE_FRAMEBUFFER_GATE: `PASS_${expectedSide}X${expectedSide}`,
    R6_EXPORT_FRESH_LEGACY_1016_GATE: `PASS_${legacySampleCount}_OF_${expectedLegacySampleCount}`,
    R6_EXPORT_NATURAL_KITTY_2640_GATE: `PASS_${kittySampleCount}_OF_${expectedKittySampleCount}`,
    R6_EXPORT_STRICT_TOTAL_GATE: `PASS_${sampleCount}_OF_${expectedSampleCount}`,
    R6_EXPORT_QR_DECODE_GATE: `PASS_${sampleCount}_OF_${expectedSampleCount}`,
    R6_EXPORT_KITTY_NO_FIXED_LOOP_GATE: 'PASS_8_OF_8_DISTINCT_SEEDS_AND_TARGET_SEQUENCES',
    R6_EXPORT_KITTY_SCAN_NO_CAT_GATE: 'PASS_8_OF_8_FULL_FRAME_AND_QR_ROI_0',
    R6_EXPORT_KITTY_SNAPSHOT_RESTORE_GATE: 'PASS_8_OF_8_COMPLETE_R6_STATE_EXACT',
    R6_EXPORT_OFFLINE_CONSOLE_GATE: 'PASS_0_REQUESTS_0_ERRORS',
  };
  const report = {
    schemaVersion: 'v1.1.0-r6-export-validation-v1',
    generatedAtUtc: new Date().toISOString(),
    exportContract: 'r6',
    expectedSide,
    kittyPoseCountPerPayload,
    kittyObservationSeconds,
    kittySamplingContract: '330_HALF_SECOND_SAMPLES_ACROSS_164_5_SECONDS_PER_PAYLOAD_WITH_DISTINCT_FIXED_TEST_SEEDS_NO_FINITE_CYCLE',
    rowCount: rows.length,
    sampleCount,
    legacyFreshGate: { rowCount: legacyRows.length, sampleCount: legacySampleCount },
    kittyNaturalMotionGate: { rowCount: kittyRows.length, samplesPerPayload: kittyPoseCountPerPayload, sampleCount: kittySampleCount },
    rows,
    consoleErrors,
    externalRequests,
    gates,
  };
  const reportPath = await writeEvidence('export-r6-validation.json', report);
  console.log(JSON.stringify({ ...gates, rowCount: rows.length, sampleCount, reportPath }, null, 2));
} finally {
  await browser?.close();
  await server.close();
}
