import { _electron as electron } from '@playwright/test';
import path from 'node:path';
import {
  assert, buildRoot, canvasFrame, decodePng, ensureEvidenceDirs, previewRoot,
  setPayloadAndWait, setScanAndWait, themes, waitForGarden, writeEvidence,
} from './validation-helpers.mjs';

const executablePath = path.join(buildRoot, 'windows-dev', 'win-unpacked', 'VoxelQR-Studio.exe');
await ensureEvidenceDirs();
const electronApp = await electron.launch({ executablePath, timeout: 90_000 });
const page = await electronApp.firstWindow({ timeout: 90_000 });
const externalRequests = [];
const consoleErrors = [];
page.on('request', (request) => {
  const protocol = new URL(request.url()).protocol;
  if (protocol === 'http:' || protocol === 'https:') externalRequests.push(request.url());
});
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
await waitForGarden(page);
assert((await page.title()) === 'VoxelQR Studio', 'WINDOWS_RUNTIME: wrong Studio window title');
assert((await page.locator('.brand strong').textContent())?.trim() === 'VoxelQR Studio', 'WINDOWS_RUNTIME: wrong Studio display name');
const payload = 'https://example.com/voxelqr-runtime?gate=windows';
await setPayloadAndWait(page, payload, 'url');
const initial = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
assert(initial.canvasCount === 1, `WINDOWS_RUNTIME: expected one canvas, got ${initial.canvasCount}`);
assert(initial.qrOverlayCount === 0, `WINDOWS_RUNTIME: QR overlay detected (${initial.qrOverlayCount})`);
assert(await page.locator('#generate-button').count() === 0, 'WINDOWS_RUNTIME: manual Generate control found');
const themeMetrics = [];
for (const theme of themes) {
  await page.evaluate((value) => window.__VOXELQR_TEST__.setTheme(value), theme);
  await setScanAndWait(page);
  const scanBuffer = await canvasFrame(page);
  assert(decodePng(scanBuffer) === payload, `WINDOWS_QR_RUNTIME: ${theme} QR mismatch`);
  const stats = await page.evaluate(() => window.__VOXELQR_TEST__.getStats());
  themeMetrics.push({ theme, detail: stats.visual.v8.detail, heroResolutionPreserved: stats.performance.heroResolutionPreserved, qrResolutionPreserved: stats.performance.qrResolutionPreserved });
}
await page.evaluate(() => { window.__VOXELQR_TEST__.setTheme('sakura'); window.__VOXELQR_TEST__.setMode('scene'); });
await page.waitForTimeout(1600);
await page.screenshot({ path: path.join(previewRoot, '23-windows-sakura.png') });
assert(externalRequests.length === 0, `WINDOWS_OFFLINE: unexpected network ${externalRequests.join(', ')}`);
assert(consoleErrors.length === 0, `WINDOWS_RUNTIME console errors: ${consoleErrors.join(' | ')}`);
const result = {
  WINDOWS_RUNTIME_GATE: 'PASS',
  WINDOWS_SAME_SCENE_GATE: 'PASS',
  WINDOWS_NO_QR_OVERLAY_GATE: 'PASS',
  WINDOWS_LIVE_INPUT_GATE: 'PASS',
  WINDOWS_BRAND_GATE: 'PASS_EXACT_VOXELQR_STUDIO',
  WINDOWS_QR_RUNTIME_GATE: `PASS_${themes.length}_OF_${themes.length}`,
  WINDOWS_OFFLINE_GATE: 'PASS_0_REQUESTS',
  themeMetrics,
};
await writeEvidence('windows-validation.json', result);
await electronApp.close();
console.log(JSON.stringify(result, null, 2));
