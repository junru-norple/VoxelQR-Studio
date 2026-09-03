import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  assert, buildRoot, cameraDistance, cameraStateDistance, canvasFrame, chromePath, createStaticServer, decodePng,
  ensureEvidenceDirs, payloadCases, resourcesEqual, setPayloadAndWait, setScanAndWait,
  previewRoot, setSceneAndWait, sha256, themes, validationRoot, waitForGarden, writeEvidence,
} from './validation-helpers.mjs';

await ensureEvidenceDirs();
const staticServer = await createStaticServer(path.join(buildRoot, 'web'));
let browser;

try {
  browser = await chromium.launch({ headless: true, executablePath: chromePath, args: ['--disable-gpu-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const consoleErrors = [];
  const thirdPartyRequests = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== staticServer.origin) thirdPartyRequests.push(request.url());
  });

  await page.goto(`${staticServer.origin}/`, { waitUntil: 'networkidle' });
  await waitForGarden(page);
  const brandIdentity = await page.evaluate(() => ({
    title: document.title,
    displayName: document.querySelector('.brand strong')?.textContent?.trim(),
    applicationName: document.querySelector('meta[name="application-name"]')?.getAttribute('content'),
    appleTitle: document.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute('content'),
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
  }));
  assert(brandIdentity.title === 'VoxelQR Studio', 'WEB_RUNTIME: wrong document title');
  assert(brandIdentity.displayName === 'VoxelQR Studio', 'BRAND_UI: wrong display name');
  assert(brandIdentity.applicationName === 'VoxelQR Studio' && brandIdentity.appleTitle === 'VoxelQR Studio', 'BRAND_METADATA: application title mismatch');
  assert(brandIdentity.description?.includes('3D 動態體素 QR Code 生成器'), 'BRAND_METADATA: Chinese public name missing');
  assert(brandIdentity.manifest?.startsWith('data:application/manifest+json,') && brandIdentity.manifest.includes('VoxelQR%20Studio'), 'BRAND_MANIFEST: inline manifest identity missing');
  assert(await page.locator('#garden-canvas').isVisible(), 'WEB_RUNTIME: 3D canvas is not visible');
  assert(await page.locator('#generate-button').count() === 0, 'LIVE_INPUT: manual Generate button still exists');
  assert(await page.locator('#scan-canvas, .scan-mat, .qr-overlay, img[data-qr], svg[data-qr]').count() === 0, 'NO_QR_OVERLAY: forbidden QR overlay found');
  const initialStats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  assert(initialStats.canvasCount === 1 && initialStats.qrOverlayCount === 0, 'SAME_SCENE: expected exactly one canvas and zero QR overlays');

  // LIVE_INPUT_GATE: typing, paste, delete, rapid events, type switch, and theme switch while input is pending.
  await page.locator('[data-payload-type="text"]').click();
  const input = page.locator('#payload-input');
  await input.click();
  await page.keyboard.press('Control+A');
  const typedPayload = 'Live garden typing without Generate ✓';
  await input.pressSequentially(typedPayload, { delay: 6 });
  await page.waitForFunction((value) => window.__VOXELQR_TEST__.getStats().payload === value, typedPayload);

  const pastedPayload = '貼上即時更新｜Paste → living matrix';
  await page.evaluate((value) => {
    const element = document.querySelector('#payload-input');
    element.value = value;
    element.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertFromPaste', data: value }));
  }, pastedPayload);
  await page.waitForFunction((value) => window.__VOXELQR_TEST__.getStats().payload === value, pastedPayload);

  await input.fill('');
  await page.waitForFunction(() => document.querySelector('#sync-dot')?.getAttribute('data-state') === 'needsInput');
  assert((await page.evaluate(() => window.__VOXELQR_TEST__.getStats().payload)) === pastedPayload, 'LIVE_INPUT delete: invalid empty input corrupted the last valid scene');

  const rapidPayload = 'rapid-final-39';
  await page.evaluate(() => {
    const element = document.querySelector('#payload-input');
    for (let index = 0; index < 40; index += 1) {
      element.value = `rapid-final-${index}`;
      element.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: String(index) }));
    }
  });
  await page.waitForFunction((value) => window.__VOXELQR_TEST__.getStats().payload === value, rapidPayload);

  await page.evaluate(() => {
    const element = document.querySelector('#payload-input');
    element.value = 'example.com/live-switch';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-payload-type="url"]')?.click();
    window.__VOXELQR_TEST__.setTheme('maple');
  });
  await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().payload === 'https://example.com/live-switch' && window.__VOXELQR_TEST__.getStats().theme === 'maple');
  const liveStats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  assert(liveStats.liveInputSamples >= 8, `LIVE_INPUT: insufficient samples (${liveStats.liveInputSamples})`);
  assert(liveStats.liveInputP95Ms <= 100, `LIVE_INPUT: p95 ${liveStats.liveInputP95Ms.toFixed(2)}ms exceeds 100ms`);
  assert(liveStats.payload === 'https://example.com/live-switch', 'LIVE_INPUT: final scene payload is stale');

  // Nine real theme previews from the one persistent scene.
  const previewPayload = 'https://example.com/voxelqr-final-preview';
  await setPayloadAndWait(page, previewPayload, 'url');
  for (let index = 0; index < themes.length; index += 1) {
    const theme = themes[index];
    await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
    await setSceneAndWait(page);
    await page.waitForTimeout(220);
    await page.screenshot({ path: path.join(previewRoot, `${String(index + 1).padStart(2, '0')}-${theme}-scene.png`) });
    await setScanAndWait(page);
    const scan = await canvasFrame(page);
    assert(decodePng(scan) === previewPayload, `WEB_QR_RUNTIME preview: ${theme} same-scene frame did not decode`);
    await page.screenshot({ path: path.join(previewRoot, `${String(index + themes.length + 1).padStart(2, '0')}-${theme}-scan.png`) });
  }

  // R6 Kitty captures intent, steering, visitation history and RNG state at
  // the exact Scan edge, hides every Kitty renderable before decode, and
  // restores that state exactly.
  await page.evaluate(() => window.__VOXELQR_TEST__.setTheme('kitty'));
  await setSceneAndWait(page);
  await page.waitForFunction(() => Boolean(window.__VOXELQR_TEST__.getKittyMotionSample().pose?.moving), undefined, { timeout: 5_000 });
  const kittyEngage = await page.evaluate(() => {
    const before = window.__VOXELQR_TEST__.getKittyMotionSample();
    window.__VOXELQR_TEST__.setMode('scan');
    const after = window.__VOXELQR_TEST__.getKittyMotionSample();
    return { before, after };
  });
  assert(kittyEngage.before.motionModel === 'session-seeded-natural-lively-v1', 'R6_KITTY_MOTION_MODEL: production model mismatch');
  assert(kittyEngage.before.productionSessionFreshSeed && kittyEngage.before.seedSource === 'production-crypto', 'R6_KITTY_PRODUCTION_SEED: crypto session seed missing');
  assert(Object.values(kittyEngage.before.loopPolicy).every((value) => value === false), 'R6_KITTY_LOOP_POLICY: finite/fixed loop policy enabled');
  assert(!Object.hasOwn(kittyEngage.before, 'plan'), 'R6_KITTY_FIXED_PLAN: production motion still exposes a route plan');
  assert(kittyEngage.before.clockSeconds === kittyEngage.after.clockSeconds, 'KITTY_SCAN_FREEZE: clock advanced during engagement');
  assert(kittyEngage.before.pose?.moving === true, 'KITTY_MOVING_SCAN_CUT: Scan was not requested during a moving pose');
  assert(JSON.stringify(kittyEngage.before.pose) === JSON.stringify(kittyEngage.after.pose), 'KITTY_SCAN_FREEZE: pose changed during engagement');
  assert(JSON.stringify(kittyEngage.before.originalColorPalette) === JSON.stringify(kittyEngage.after.originalColorPalette), 'KITTY_SCAN_FREEZE: original colors changed during engagement');
  assert(JSON.stringify(kittyEngage.before.originalColorPalette) === JSON.stringify(kittyEngage.before.renderedColorPalette), 'KITTY_SCAN_COLOR: rendered colors differ before engagement');
  assert(kittyEngage.after.scanHidden && !kittyEngage.after.renderVisible, 'KITTY_SCAN_HIDE: group remained visible at engagement');
  assert(!kittyEngage.after.bodyMeshVisible && !kittyEngage.after.darkCapsVisible && !kittyEngage.after.lightCapsVisible, 'KITTY_SCAN_HIDE: a Kitty mesh remained effectively visible');
  assert(kittyEngage.after.renderedColorPalette.length === 0, 'KITTY_SCAN_HIDE: hidden Kitty still reports rendered colors');
  await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().progress >= 0.999, undefined, { timeout: 10_000 });
  const kittyZeroDiff = await page.evaluate(() => window.__VOXELQR_TEST__.measureKittyScanNoCatPixelDiff());
  assert(kittyZeroDiff.diff.exact, `KITTY_SCAN_ZERO_DIFF: ${JSON.stringify(kittyZeroDiff.diff)}`);
  assert(kittyZeroDiff.diff.fullFrameDifferentPixels === 0 && kittyZeroDiff.diff.qrRoiDifferentPixels === 0, 'KITTY_SCAN_ZERO_DIFF: full-frame or QR ROI differs from no-cat baseline');
  assert(kittyZeroDiff.scanAttachedHidden.groupPresent && !kittyZeroDiff.scanAttachedHidden.groupVisible, 'KITTY_SCAN_ZERO_DIFF: attached Kitty group state is invalid');
  assert(kittyZeroDiff.scanAttachedHidden.effectivelyVisibleMeshCount === 0, 'KITTY_SCAN_ZERO_DIFF: visible Kitty mesh count is not zero');
  assert(Object.values(kittyZeroDiff.scanAttachedHidden.matricesStable).every(Boolean), 'KITTY_SCAN_ZERO_DIFF: frozen matrices drifted');
  assert(kittyZeroDiff.restoration.resourcesExact && kittyZeroDiff.restoration.cameraExact && kittyZeroDiff.restoration.snapshotClockUnchanged, 'KITTY_SCAN_ZERO_DIFF: measurement mutated runtime state');
  assert(kittyZeroDiff.restoration.groupIndexBefore === kittyZeroDiff.restoration.groupIndexAfter, 'KITTY_SCAN_ZERO_DIFF: Kitty group order changed');
  assert(kittyZeroDiff.restoration.sceneObjectCountBefore === kittyZeroDiff.restoration.sceneObjectCountAfter, 'KITTY_SCAN_ZERO_DIFF: scene object count changed');
  const kittyFrozenFirst = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
  await page.waitForTimeout(620);
  const kittyFrozenSecond = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
  assert(kittyFrozenFirst.frozen && kittyFrozenSecond.frozen, 'KITTY_SCAN_FREEZE: frozen proof flag missing');
  assert(kittyFrozenFirst.scanHidden && kittyFrozenSecond.scanHidden, 'KITTY_SCAN_HIDE: hidden proof flag missing');
  assert(!kittyFrozenFirst.renderVisible && !kittyFrozenSecond.renderVisible, 'KITTY_SCAN_HIDE: Kitty became visible while frozen');
  assert(kittyFrozenFirst.clockSeconds === kittyFrozenSecond.clockSeconds, 'KITTY_SCAN_FREEZE: clock advanced while in Scan');
  assert(JSON.stringify(kittyFrozenFirst.pose) === JSON.stringify(kittyFrozenSecond.pose), 'KITTY_SCAN_FREEZE: pose moved while in Scan');
  assert(JSON.stringify(kittyFrozenFirst.originalColorPalette) === JSON.stringify(kittyFrozenSecond.originalColorPalette), 'KITTY_SCAN_FREEZE: palette changed while in Scan');
  assert(kittyFrozenFirst.renderedColorPalette.length === 0 && kittyFrozenSecond.renderedColorPalette.length === 0, 'KITTY_SCAN_HIDE: frozen rendered palette is not empty');
  assert(JSON.stringify(kittyFrozenFirst.snapshot) === JSON.stringify(kittyFrozenSecond.snapshot), 'KITTY_SCAN_FREEZE: complete snapshot changed while in Scan');
  for (const key of ['sessionSeed', 'intent', 'steering', 'heatmap', 'recentTargets', 'rngState']) {
    assert(JSON.stringify(kittyFrozenFirst[key]) === JSON.stringify(kittyFrozenFirst.snapshot[key]), `R6_KITTY_SCAN_SNAPSHOT: ${key} was not captured exactly`);
  }
  assert(decodePng(await canvasFrame(page)) === previewPayload, 'KITTY_SCAN_FREEZE: frozen runtime frame does not decode');
  await setSceneAndWait(page);
  await page.waitForTimeout(260);
  const kittyResumed = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
  assert(kittyResumed.renderVisible && !kittyResumed.scanHidden, 'KITTY_SCAN_RESTORE: Kitty did not become visible in Explore');
  assert(kittyResumed.lastRestore?.clockExact && kittyResumed.lastRestore?.poseExact
    && kittyResumed.lastRestore?.intentExact && kittyResumed.lastRestore?.steeringExact
    && kittyResumed.lastRestore?.heatmapExact && kittyResumed.lastRestore?.recentTargetsExact
    && kittyResumed.lastRestore?.rngStateExact, 'KITTY_SCAN_RESTORE: complete R6 behavior state was not restored exactly');
  assert(kittyResumed.lastRestore?.bodyMatricesExact && kittyResumed.lastRestore?.darkCapMatricesExact
    && kittyResumed.lastRestore?.lightCapMatricesExact && kittyResumed.lastRestore?.particleMatricesExact
    && kittyResumed.lastRestore?.seedExact, 'KITTY_SCAN_RESTORE: matrices or seed were not restored exactly');
  assert(kittyResumed.clockSeconds > kittyFrozenSecond.clockSeconds, 'KITTY_SCAN_RESUME: clock did not resume from frozen pose');

  // Camera continuity, color invariance, animation continuity, and exact return.
  await page.evaluate(() => window.__VOXELQR_TEST__.setTheme('sakura'));
  await setSceneAndWait(page);
  const beforeTransition = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  await page.evaluate(() => {
    window.__FINAL_TRANSITION_SAMPLES__ = [];
    const sample = () => {
      const stats = window.__VOXELQR_TEST__.getStats();
      window.__FINAL_TRANSITION_SAMPLES__.push({ progress: stats.progress, camera: stats.camera, animationTime: stats.animationTime });
      if (stats.progress < 0.999) requestAnimationFrame(sample);
    };
    window.__VOXELQR_TEST__.setMode('scan');
    requestAnimationFrame(sample);
  });
  const transitionThresholds = [0.12, 0.31, 0.5, 0.69, 0.88];
  let capturedTransitions = 0;
  while (true) {
    await page.waitForTimeout(70);
    const stats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
    if (capturedTransitions < transitionThresholds.length && stats.progress >= transitionThresholds[capturedTransitions]) {
      await page.screenshot({ path: path.join(previewRoot, `${String(themes.length * 2 + 1 + capturedTransitions).padStart(2, '0')}-transition-${capturedTransitions + 1}.png`) });
      capturedTransitions += 1;
    }
    if (stats.progress >= 0.999) break;
  }
  const transitionSamples = await page.evaluate(() => window.__FINAL_TRANSITION_SAMPLES__);
  assert(transitionSamples.length >= 7, `CAMERA_TRANSITION: only ${transitionSamples.length} samples`);
  for (let index = 1; index < transitionSamples.length; index += 1) {
    assert(transitionSamples[index].progress >= transitionSamples[index - 1].progress, 'CAMERA_TRANSITION: progress reversed');
  }
  const totalTravel = cameraDistance(beforeTransition.camera, transitionSamples.at(-1).camera);
  const largestStep = Math.max(...transitionSamples.slice(1).map((sample, index) => cameraDistance(sample.camera, transitionSamples[index].camera)));
  assert(totalTravel > 10, `CAMERA_TRANSITION: camera travel too small (${totalTravel})`);
  assert(largestStep < totalTravel * 0.34, `CAMERA_TRANSITION: discontinuous camera step ${largestStep}/${totalTravel}`);
  const inScan = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  assert(inScan.sceneUuid === beforeTransition.sceneUuid && inScan.cameraUuid === beforeTransition.cameraUuid && inScan.canvasId === beforeTransition.canvasId, 'SAME_SCENE: scene/camera/canvas identity changed');
  assert(inScan.materialSignature === beforeTransition.materialSignature, 'SCAN_COLOR_INVARIANCE: material signature changed');
  assert(inScan.animationTime > beforeTransition.animationTime, 'SCAN_ANIMATION_CONTINUITY: animation clock stopped');
  assert(inScan.canvasCount === 1 && inScan.qrOverlayCount === 0, 'NO_QR_OVERLAY: runtime invariant failed');
  await setSceneAndWait(page);
  const afterReturn = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  const returnError = cameraStateDistance(beforeTransition.camera, afterReturn.camera);
  assert(returnError.position < 0.002 && returnError.target < 0.002 && returnError.quaternion < 0.002 && returnError.zoom < 0.002, `CAMERA_RETURN: ${JSON.stringify(returnError)}`);

  // QR_DECODE_GATE: 9 themes × 8 payload classes from the colored WebGL canvas itself.
  const staticDecodeTotal = themes.length * payloadCases.length;
  const animatedDecodeTotal = themes.length * 3;
  let staticDecoded = 0;
  for (const theme of themes) {
    await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
    await setScanAndWait(page);
    for (const testCase of payloadCases) {
      await setPayloadAndWait(page, testCase.payload, testCase.type);
      const frame = await canvasFrame(page);
      assert(decodePng(frame) === testCase.payload, `QR_DECODE_GATE: ${theme}/${testCase.name} mismatch`);
      staticDecoded += 1;
    }
  }
  assert(staticDecoded === staticDecodeTotal, `QR_DECODE_GATE: expected ${staticDecodeTotal}, got ${staticDecoded}`);

  // SCAN_ANIMATED_DECODE_GATE: three genuinely different animation frames per theme.
  const animatedPayload = 'VoxelQR animated same-scene t0/t1/t2 ✓';
  await setPayloadAndWait(page, animatedPayload, 'text');
  let animatedDecoded = 0;
  const animatedHashes = {};
  for (const theme of themes) {
    await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
    await setScanAndWait(page);
    const hashes = [];
    for (let timestamp = 0; timestamp < 3; timestamp += 1) {
      await page.waitForTimeout(260);
      const frame = await canvasFrame(page);
      assert(decodePng(frame) === animatedPayload, `SCAN_ANIMATED_DECODE: ${theme}/t${timestamp} mismatch`);
      hashes.push(sha256(frame));
      animatedDecoded += 1;
    }
    const uniqueFrameCount = new Set(hashes).size;
    if (theme === 'kitty') {
      assert(kittyFrozenFirst.clockSeconds === kittyFrozenSecond.clockSeconds
        && JSON.stringify(kittyFrozenFirst.pose) === JSON.stringify(kittyFrozenSecond.pose), 'KITTY_SCAN_FREEZE: exact pose proof was lost during animated decode');
      const currentKittyScan = await page.evaluate(() => window.__VOXELQR_TEST__.getKittyMotionSample());
      assert(currentKittyScan.scanHidden && !currentKittyScan.renderVisible && currentKittyScan.renderedColorPalette.length === 0, 'KITTY_SCAN_HIDE: Kitty renderables returned during animated decode');
    } else {
      assert(uniqueFrameCount >= 2, `SCAN_ANIMATION_CONTINUITY: ${theme} frames are visually static`);
    }
    animatedHashes[theme] = hashes;
  }
  assert(animatedDecoded === animatedDecodeTotal, `SCAN_ANIMATED_DECODE: expected ${animatedDecodeTotal}, got ${animatedDecoded}`);

  // Pointer reliability and real 15-second continuous interaction performance.
  // Automatic fidelity fallback: only atmosphere density changes; hero and QR resolution stay invariant.
  // Run the hysteresis proof from a fresh runtime and first prove the exact
  // 300-frame recovery edge, so earlier QR/export workloads cannot contaminate
  // the controlled counter state.
  await page.reload({ waitUntil: 'networkidle' });
  await waitForGarden(page);
  await page.evaluate(() => window.__VOXELQR_TEST__.setTheme('ocean'));
  await setPayloadAndWait(page, animatedPayload, 'text');
  await setScanAndWait(page);
  const fallbackWarmup = await page.evaluate(() => {
    const start = window.__VOXELQR_TEST__.getStats();
    for (let frame = 0; frame < 300; frame += 1) window.__VOXELQR_TEST__.sampleFidelityFrame(16);
    return { start: start.performance, recovered: window.__VOXELQR_TEST__.getStats().performance };
  });
  assert(fallbackWarmup.recovered.fidelityLevel === 'high', `FIDELITY_WARMUP_NOT_HIGH:${JSON.stringify(fallbackWarmup)}`);
  const fallbackBefore = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  const fallbackReduced = await page.evaluate(() => {
    for (let frame = 0; frame < 90; frame += 1) window.__VOXELQR_TEST__.sampleFidelityFrame(23);
    return window.__VOXELQR_TEST__.getStats();
  });
  assert(fallbackReduced.performance.fidelityLevel === 'reduced-atmosphere', `FIDELITY_FALLBACK_NOT_TRIGGERED:${fallbackReduced.performance.fidelityLevel}`);
  assert(fallbackReduced.performance.activeParticleCount < fallbackReduced.performance.totalParticleCount, 'FIDELITY_FALLBACK_PARTICLES_NOT_REDUCED');
  assert(fallbackReduced.visual.v8.detail.medianVisibleCellEdge === fallbackBefore.visual.v8.detail.medianVisibleCellEdge, 'FALLBACK_HERO_RESOLUTION_CHANGED');
  assert(fallbackReduced.performance.heroResolutionPreserved && fallbackReduced.performance.qrResolutionPreserved, 'FALLBACK_INVARIANCE_FLAGS_FAIL');
  assert(decodePng(await canvasFrame(page)) === animatedPayload, 'FALLBACK_QR_INVARIANCE_DECODE_FAIL');
  await page.evaluate(() => {
    for (let frame = 0; frame < 300; frame += 1) window.__VOXELQR_TEST__.sampleFidelityFrame(16);
  });
  const fallbackRecovered = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  assert(fallbackRecovered.performance.fidelityLevel === 'high', `FIDELITY_FALLBACK_NOT_RECOVERED:${fallbackRecovered.performance.fidelityLevel}`);
  assert(fallbackRecovered.performance.activeParticleCount === fallbackRecovered.performance.totalParticleCount, 'FIDELITY_PARTICLES_NOT_RESTORED');
  const fallbackEvidence = {
    warmup: fallbackWarmup,
    before: fallbackBefore.performance,
    reduced: fallbackReduced.performance,
    recovered: fallbackRecovered.performance,
    medianCellEdge: fallbackReduced.visual.v8.detail.medianVisibleCellEdge,
    qrDecoded: true,
  };

  await page.reload({ waitUntil: 'networkidle' });
  await waitForGarden(page);
  await page.evaluate(() => window.__VOXELQR_TEST__.setTheme('ocean'));
  await setPayloadAndWait(page, animatedPayload, 'text');
  await setSceneAndWait(page);
  await page.evaluate(() => window.__VOXELQR_TEST__.resetPerformanceMetrics());
  const canvasBox = await page.locator('#garden-canvas').boundingBox();
  assert(canvasBox, 'POINTER_RELIABILITY: canvas has no hit area');
  const centerX = canvasBox.x + canvasBox.width * 0.54;
  const centerY = canvasBox.y + canvasBox.height * 0.52;
  for (let index = 0; index < 8; index += 1) {
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(centerX + 12 + index, centerY + 5, { steps: 2 });
    await page.mouse.up();
  }
  await page.evaluate(() => {
    window.__FINAL_DRAG_CAMERAS__ = [];
    window.__FINAL_DRAG_ACTIVE__ = true;
    let frame = 0;
    const sample = () => {
      if (!window.__FINAL_DRAG_ACTIVE__) return;
      if (frame % 20 === 0) window.__FINAL_DRAG_CAMERAS__.push(window.__VOXELQR_TEST__.getStats().camera);
      frame += 1;
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  for (let index = 0; index < 188; index += 1) {
    await page.mouse.move(centerX + Math.sin(index * 0.17) * 115, centerY + Math.cos(index * 0.13) * 55);
    await page.waitForTimeout(80);
  }
  await page.mouse.up();
  const dragCameras = await page.evaluate(() => { window.__FINAL_DRAG_ACTIVE__ = false; return window.__FINAL_DRAG_CAMERAS__; });
  await page.mouse.wheel(0, -260);
  await page.waitForTimeout(320);
  const performanceStats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  const cameraChanges = dragCameras.slice(1).filter((camera, index) => cameraDistance(camera, dragCameras[index]) > 0.001).length;
  assert(cameraChanges === dragCameras.length - 1, `POINTER_RELIABILITY: ${cameraChanges}/${dragCameras.length - 1} sampled camera changes`);
  assert(performanceStats.performance.pointerSamples >= 8, `POINTER_RELIABILITY: only ${performanceStats.performance.pointerSamples} response samples`);
  assert(performanceStats.performance.pointerResponseP95Ms <= 20, `INPUT_TO_CAMERA_RESPONSE: ${performanceStats.performance.pointerResponseP95Ms.toFixed(2)}ms`);
  assert(performanceStats.performance.frameTimeMedianMs <= 16.7, `INTERACTION_FRAME_MEDIAN: ${performanceStats.performance.frameTimeMedianMs.toFixed(2)}ms`);
  assert(performanceStats.performance.frameTimeP95Ms <= 22, `INTERACTION_FRAME_P95: ${performanceStats.performance.frameTimeP95Ms.toFixed(2)}ms`);
  assert(performanceStats.performance.longTaskCount === 0, `LONG_TASK: ${performanceStats.performance.longTaskCount} tasks over 80ms`);

  // Resource stability after all nine programs are warm.
  for (const theme of themes) {
    await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
    await page.waitForTimeout(45);
  }
  const resourcesBefore = (await page.evaluate(() => window.__VOXELQR_TEST__.getStats())).resources;
  for (let index = 0; index < 30; index += 1) {
    await page.evaluate(({ theme, mode }) => {
      window.__VOXELQR_TEST__.setTheme(theme);
      window.__VOXELQR_TEST__.setMode(mode);
    }, { theme: themes[index % themes.length], mode: index % 2 ? 'scene' : 'scan' });
    await page.waitForTimeout(55);
  }
  await setSceneAndWait(page);
  const resourcesAfter = (await page.evaluate(() => window.__VOXELQR_TEST__.getStats())).resources;
  assert(resourcesEqual(resourcesBefore, resourcesAfter), `RESOURCE_STABILITY: ${JSON.stringify({ resourcesBefore, resourcesAfter })}`);

  // Same-scene export, localization, accessibility, and responsive layout.
  await setPayloadAndWait(page, previewPayload, 'url');
  await setScanAndWait(page);
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#export-qr').click();
  const download = await downloadPromise;
  const downloadPath = path.join(validationRoot, 'downloads', await download.suggestedFilename());
  await download.saveAs(downloadPath);
  assert(decodePng(await readFile(downloadPath)) === previewPayload, 'EXPORT_GATE: exported same-scene top view does not decode');

  await page.evaluate(() => window.__VOXELQR_TEST__.setLocale('zh-TW'));
  await setSceneAndWait(page);
  const zhPublicIdentity = await page.evaluate(() => ({
    heading: document.querySelector('#controls-title')?.textContent?.trim(),
    descriptor: document.querySelector('.brand small')?.textContent?.trim(),
  }));
  assert(zhPublicIdentity.heading === '3D 動態體素 QR Code 生成器' && zhPublicIdentity.descriptor === '3D 動態體素 QR Code 生成器', 'I18N_ZH_TW: exact public name mismatch');
  await page.screenshot({ path: path.join(previewRoot, `${String(themes.length * 2 + 6).padStart(2, '0')}-zh-TW-ui.png`) });
  await page.evaluate(() => window.__VOXELQR_TEST__.setLocale('en'));
  const enPublicIdentity = await page.evaluate(() => ({
    displayName: document.querySelector('.brand strong')?.textContent?.trim(),
    descriptor: document.querySelector('.brand small')?.textContent?.trim(),
  }));
  assert(enPublicIdentity.displayName === 'VoxelQR Studio' && enPublicIdentity.descriptor === 'Dynamic 3D Voxel QR Code Generator', 'I18N_EN: Studio identity mismatch');
  await page.screenshot({ path: path.join(previewRoot, `${String(themes.length * 2 + 7).padStart(2, '0')}-en-ui.png`) });
  const namedButtons = await page.locator('button').evaluateAll((buttons) => buttons.every((button) => Boolean((button.getAttribute('aria-label') || button.textContent || '').trim())));
  assert(namedButtons, 'ACCESSIBILITY_GATE: unnamed button');
  await page.locator('body').click({ position: { x: 2, y: 2 } });
  await page.keyboard.press('Tab');
  const focusVisible = await page.evaluate(() => {
    const active = document.activeElement;
    return active instanceof HTMLElement && active !== document.body && getComputedStyle(active).outlineStyle !== 'none';
  });
  assert(focusVisible, 'ACCESSIBILITY_GATE: keyboard focus is not visible');

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(`${staticServer.origin}/`, { waitUntil: 'networkidle' });
  await waitForGarden(mobile);
  const mobileLayout = await mobile.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scene: Boolean(document.querySelector('[data-mode="scene"]')),
    scan: Boolean(document.querySelector('[data-mode="scan"]')),
    canvasCount: document.querySelectorAll('canvas').length,
  }));
  assert(mobileLayout.scrollWidth <= mobileLayout.width, `RESPONSIVE_GATE: horizontal overflow ${mobileLayout.scrollWidth}/${mobileLayout.width}`);
  assert(mobileLayout.scene && mobileLayout.scan && mobileLayout.canvasCount === 1, 'RESPONSIVE_GATE: controls/canvas unavailable');
  await mobile.screenshot({ path: path.join(previewRoot, `${String(themes.length * 2 + 8).padStart(2, '0')}-mobile-web.png`), fullPage: true });
  await mobile.close();

  assert(thirdPartyRequests.length === 0, `WEB_THIRD_PARTY_NETWORK: ${thirdPartyRequests.join(', ')}`);
  assert(consoleErrors.length === 0, `WEB_RUNTIME console errors: ${consoleErrors.join(' | ')}`);

  const result = {
    WEB_RUNTIME_GATE: 'PASS',
    LIVE_INPUT_GATE: 'PASS',
    NO_MANUAL_GENERATE_REQUIRED: true,
    INPUT_TO_VISUAL_START_P95_MS: Number(liveStats.liveInputP95Ms.toFixed(2)),
    THEME_STRUCTURE_GATE: `PASS_${themes.length}_OF_${themes.length}`,
    SAME_SCENE_SCAN_GATE: 'PASS',
    NO_QR_OVERLAY_GATE: 'PASS',
    SCAN_COLOR_INVARIANCE_GATE: 'PASS',
    CAMERA_TRANSITION_GATE: 'PASS',
    CAMERA_RETURN_GATE: 'PASS',
    SCAN_ANIMATION_CONTINUITY_GATE: 'PASS_8_ANIMATED_THEMES_PLUS_KITTY_EXACT_SNAPSHOT_FREEZE',
    KITTY_SCAN_FREEZE_GATE: 'PASS_EXACT_COMPLETE_SNAPSHOT_HIDDEN',
    KITTY_SCAN_ZERO_DIFF_GATE: 'PASS_FULL_FRAME_AND_QR_ROI_0',
    KITTY_MOVING_SCAN_CUT_GATE: 'PASS_MOVING_POSE',
    KITTY_SCAN_RENDERABLES_GATE: 'PASS_0_VISIBLE',
    KITTY_SCAN_RESUME_GATE: 'PASS_FROM_EXACT_RESTORED_CLOCK',
    R6_KITTY_PRODUCTION_SEED_GATE: 'PASS_CRYPTO_SESSION_SEED',
    R6_KITTY_NO_FIXED_LOOP_GATE: 'PASS_NO_FINITE_CYCLE_NO_MODULO_NO_FIXED_WAYPOINT_ORDER_NO_MANDATORY_RETURN',
    R6_KITTY_SCAN_STATE_GATE: 'PASS_INTENT_STEERING_HEATMAP_RECENT_TARGETS_SEED_RNG_EXACT',
    kittyFreezeEvidence: { engage: kittyEngage, zeroDiff: kittyZeroDiff, frozenFirst: kittyFrozenFirst, frozenSecond: kittyFrozenSecond, resumed: kittyResumed },
    QR_DECODE_GATE: `PASS_${staticDecoded}_OF_${staticDecodeTotal}`,
    SCAN_ANIMATED_DECODE_GATE: `PASS_${animatedDecoded}_OF_${animatedDecodeTotal}`,
    WEB_QR_RUNTIME_GATE: `PASS_${themes.length}_OF_${themes.length}`,
    INTERACTION_PERFORMANCE_GATE: 'PASS',
    POINTER_RELIABILITY_GATE: 'PASS',
    INPUT_TO_CAMERA_RESPONSE_P95_MS: Number(performanceStats.performance.pointerResponseP95Ms.toFixed(2)),
    INTERACTION_FRAME_TIME_P95_MS: Number(performanceStats.performance.frameTimeP95Ms.toFixed(2)),
    INTERACTION_FRAME_TIME_MEDIAN_MS: Number(performanceStats.performance.frameTimeMedianMs.toFixed(2)),
    LONG_TASKS_OVER_80_MS: performanceStats.performance.longTaskCount,
    RESOURCE_STABILITY_GATE: 'PASS',
    AUTOMATIC_FIDELITY_FALLBACK_GATE: 'PASS',
    FALLBACK_HERO_INVARIANCE_GATE: 'PASS',
    FALLBACK_QR_INVARIANCE_GATE: 'PASS',
    fallbackEvidence,
    resourcesBefore,
    resourcesAfter,
    WEB_THIRD_PARTY_NETWORK_GATE: 'PASS_0_REQUESTS',
    RESPONSIVE_GATE: 'PASS',
    BRAND_DISPLAY_NAME_GATE: 'PASS_EXACT_VOXELQR_STUDIO',
    BRAND_METADATA_MANIFEST_GATE: 'PASS',
    ZH_TW_PUBLIC_NAME_GATE: 'PASS_EXACT_3D_DYNAMIC_VOXEL_QR_CODE_GENERATOR',
    brandIdentity,
    zhPublicIdentity,
    enPublicIdentity,
    I18N_ZH_TW_GATE: 'PASS',
    I18N_EN_GATE: 'PASS',
    ACCESSIBILITY_GATE: 'PASS',
    EXPORT_GATE: 'PASS',
    transitionSamples: transitionSamples.length,
    animatedHashes,
    previews: themes.length * 2 + transitionThresholds.length + 3,
  };
  await writeEvidence('web-validation.json', result);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser?.close();
  await staticServer.close();
}
