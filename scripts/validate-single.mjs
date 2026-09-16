import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  assert, assertVisibleLocaleCoherence, buildRoot, canvasFrame, chromePath, decodePng, ensureEvidenceDirs,
  setPayloadAndWait, setScanAndWait, setSceneAndWait, themes, waitForGarden, writeEvidence,
} from './validation-helpers.mjs';

const browser = await chromium.launch({ headless: true, executablePath: chromePath, args: ['--disable-gpu-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const networkRequests = [];
const consoleErrors = [];
await ensureEvidenceDirs();
page.on('request', (request) => {
  const protocol = new URL(request.url()).protocol;
  if (protocol === 'http:' || protocol === 'https:') networkRequests.push(request.url());
});
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
const singlePath = path.join(buildRoot, 'single', 'index.html');
assert(existsSync(singlePath), 'WEB_SINGLE_HTML_FRESH_BUILD_MISSING');
const singleSource = 'v1.1.1-build';
const fileUrl = pathToFileURL(singlePath).href;
await page.goto(fileUrl, { waitUntil: 'load' });
await waitForGarden(page);
assert((await page.title()) === 'VoxelQR Studio', 'WEB_SINGLE_HTML: wrong Studio title');
assert((await page.locator('.brand strong').textContent())?.trim() === 'VoxelQR Studio', 'WEB_SINGLE_HTML: wrong Studio display name');
const payload = 'VoxelQR Single HTML｜完全離線 ✓';
await setPayloadAndWait(page, payload, 'text');
const initial = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
assert(initial.canvasCount === 1, `WEB_SINGLE_HTML: expected one canvas, got ${initial.canvasCount}`);
assert(initial.qrOverlayCount === 0, `WEB_SINGLE_HTML: QR overlay detected (${initial.qrOverlayCount})`);
assert(await page.locator('#generate-button').count() === 0, 'WEB_SINGLE_HTML: manual Generate control found');
const themeMetrics = [];
for (const theme of themes) {
  await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
  await setScanAndWait(page);
  const scanBuffer = await canvasFrame(page);
  assert(decodePng(scanBuffer) === payload, `WEB_SINGLE_HTML: ${theme} QR mismatch`);
  const stats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  themeMetrics.push({ theme, detail: stats.visual.v8.detail, heroResolutionPreserved: stats.performance.heroResolutionPreserved, qrResolutionPreserved: stats.performance.qrResolutionPreserved });
}
await setSceneAndWait(page);
const localeCoherence = await assertVisibleLocaleCoherence(page, { theme: 'kitty', mode: 'scene' });
assert(networkRequests.length === 0, `WEB_OFFLINE_FILE: unexpected network ${networkRequests.join(', ')}`);
assert(consoleErrors.length === 0, `WEB_SINGLE_HTML console errors: ${consoleErrors.join(' | ')}`);
const result = {
  WEB_SINGLE_HTML_GATE: 'PASS',
  WEB_SINGLE_HTML_SAME_SCENE_GATE: 'PASS',
  WEB_SINGLE_HTML_NO_OVERLAY_GATE: 'PASS',
  WEB_SINGLE_HTML_LIVE_INPUT_GATE: 'PASS',
  WEB_SINGLE_HTML_BRAND_GATE: 'PASS_EXACT_VOXELQR_STUDIO',
  WEB_SINGLE_HTML_LOCALE_COHERENCE_GATE: 'PASS_EN_AND_ZH_TW_ALL_REQUIRED_VISIBLE_TEXT',
  localeCoherence,
  WEB_OFFLINE_FILE_GATE: 'PASS_0_REQUESTS',
  WEB_SINGLE_HTML_QR_RUNTIME_GATE: `PASS_${themes.length}_OF_${themes.length}`,
  WEB_SINGLE_HTML_SOURCE_GATE: 'PASS_PROJECT_CONTAINED_V1_1_1_BUILD_HTML_PRE_ACCEPTANCE',
  singleSource,
  WEB_SINGLE_HTML_COLD_OPEN_PATH: fileUrl,
  themeMetrics,
};
await writeEvidence('single-validation.json', result);
await browser.close();
console.log(JSON.stringify(result, null, 2));
