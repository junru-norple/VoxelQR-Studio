import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import {
  assertIncidentRootsAbsent,
  assertPathInside,
  assertR6ProcessEnvironment,
  hostProjectRoot,
  resolveInsideProject,
  sourceRoot,
  workspaceRoot as containedWorkspaceRoot,
} from './root-containment.mjs';

export const projectRoot = sourceRoot;
export const workspaceRoot = containedWorkspaceRoot;
export const validationVersion = process.env.VOXELQR_VALIDATION_VERSION ?? 'v1.1.1';
export const buildRoot = resolveInsideProject(path.join(workspaceRoot, 'build', validationVersion), 'BUILD_ROOT');
export const acceptanceRoot = resolveInsideProject(path.join(workspaceRoot, 'acceptance'), 'ACCEPTANCE_ROOT');
export const validationRoot = resolveInsideProject(path.join(workspaceRoot, 'validation', validationVersion), 'VALIDATION_ROOT');
export const previewRoot = resolveInsideProject(path.join(workspaceRoot, 'evidence', validationVersion, 'runtime'), 'PREVIEW_ROOT');
export const projectHostRoot = hostProjectRoot;
export const r6ProcessEnvironment = assertR6ProcessEnvironment();
export const incidentRootState = assertIncidentRootsAbsent();
const programFilesRoot = process.env.ProgramFiles
  ?? process.env.PROGRAMFILES
  ?? path.join(path.parse(process.cwd()).root, 'Program Files');
export const chromePath = process.env.CHROME_PATH
  ?? path.join(programFilesRoot, 'Google', 'Chrome', 'Application', 'chrome.exe');
export const themes = ['sakura', 'summer', 'maple', 'ginkgo', 'snow', 'sunset', 'ocean', 'wanderer', 'kitty'];
export const payloadCases = [
  { name: 'short-url', type: 'url', payload: 'https://example.com' },
  { name: 'long-url', type: 'url', payload: 'https://example.com/garden/voxel/seasonal/collection/2026/details?source=portfolio&medium=qr' },
  { name: 'url-query', type: 'url', payload: 'https://example.com/search?q=voxel%20garden&lang=zh-TW&safe=true' },
  { name: 'url-fragment', type: 'url', payload: 'https://example.com/gallery#ocean-waves' },
  { name: 'english-text', type: 'text', payload: 'A small garden can hold a large idea.' },
  { name: 'traditional-chinese', type: 'text', payload: '把一段文字，種成可以掃描的庭園。' },
  { name: 'mixed-text', type: 'text', payload: 'VoxelQR Studio｜春 2026｜Offline First' },
  { name: 'unicode-symbols', type: 'text', payload: 'QR → voxels ✓ 3D ◇ 波／雪／花 ♫' },
];

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function decodePng(buffer) {
  const image = PNG.sync.read(buffer);
  const decoded = jsQR(new Uint8ClampedArray(image.data), image.width, image.height, { inversionAttempts: 'dontInvert' });
  return decoded?.data ?? null;
}

export function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

export async function ensureEvidenceDirs() {
  await mkdir(previewRoot, { recursive: true });
  await mkdir(path.join(validationRoot, 'downloads'), { recursive: true });
}

export async function writeEvidence(name, value) {
  const target = assertPathInside(validationRoot, path.join(validationRoot, name), 'EVIDENCE_TARGET');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  return target;
}

export async function waitForGarden(page) {
  await page.waitForFunction(() => Boolean(window.__VOXELQR_TEST__), undefined, { timeout: 20_000 });
  await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().drawCalls > 0, undefined, { timeout: 20_000 });
}

export async function setPayloadAndWait(page, payload, type = 'text') {
  await page.evaluate(async ({ value, payloadType }) => window.__VOXELQR_TEST__.setPayload(value, payloadType), { value: payload, payloadType: type });
  await page.waitForFunction((value) => window.__VOXELQR_TEST__.getStats().payload === value && !window.__VOXELQR_TEST__.getStats().pendingInput, payload, { timeout: 10_000 });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

export async function setScanAndWait(page) {
  await page.evaluate(() => window.__VOXELQR_TEST__.setMode('scan'));
  await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().progress >= 0.999, undefined, { timeout: 10_000 });
  await page.waitForTimeout(80);
}

export async function setSceneAndWait(page) {
  await page.evaluate(() => window.__VOXELQR_TEST__.setMode('scene'));
  await page.waitForFunction(() => window.__VOXELQR_TEST__.getStats().progress <= 0.001, undefined, { timeout: 10_000 });
  await page.waitForTimeout(80);
}

export async function canvasFrame(page) {
  return page.locator('#garden-canvas').screenshot();
}

export function cameraDistance(a, b) {
  return Math.hypot(...a.position.map((value, index) => value - b.position[index]));
}

export function cameraStateDistance(a, b) {
  const position = cameraDistance(a, b);
  const target = Math.hypot(...a.target.map((value, index) => value - b.target[index]));
  const quaternion = Math.min(
    Math.hypot(...a.quaternion.map((value, index) => value - b.quaternion[index])),
    Math.hypot(...a.quaternion.map((value, index) => value + b.quaternion[index])),
  );
  return { position, target, quaternion, zoom: Math.abs(a.zoom - b.zoom) };
}

export function resourcesEqual(a, b) {
  return ['geometries', 'textures', 'programs', 'sceneObjects', 'managedListeners'].every((key) => a[key] === b[key]);
}

export async function createStaticServer(rootDirectory) {
  const root = resolveInsideProject(rootDirectory, 'STATIC_SERVER_ROOT');
  const contentTypes = new Map([
    ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
    ['.png', 'image/png'], ['.svg', 'image/svg+xml'], ['.json', 'application/json; charset=utf-8'],
  ]);
  const server = http.createServer(async (request, response) => {
    try {
      const rawPath = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
      const relative = rawPath === '/' ? 'index.html' : rawPath.replace(/^\/+/, '');
      let target;
      try { target = assertPathInside(root, path.resolve(root, relative), 'STATIC_SERVER_TARGET'); }
      catch { response.writeHead(403).end('Forbidden'); return; }
      const metadata = await stat(target);
      const file = metadata.isDirectory() ? path.join(target, 'index.html') : target;
      const contentType = contentTypes.get(path.extname(file).toLowerCase()) ?? 'application/octet-stream';
      response.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
      createReadStream(file).pipe(response);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  assert(address && typeof address === 'object', 'STATIC_SERVER_ADDRESS_MISSING');
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

export async function readJsonEvidence(name) {
  return JSON.parse(await readFile(path.join(validationRoot, name), 'utf8'));
}
const localeUiExpectations = {
  en: {
    locale: 'en', lang: 'en', productName: 'Dynamic 3D Voxel QR Code Generator', offline: 'Fully offline',
    liveScene: 'LIVE SCENE', scene: 'Explore scene', scan: 'Top-down scan', reset: 'Fit view',
    contentStep: '01 · CONTENT', controls: '3D QR Code Converter', inputType: 'Content type',
    payloadTypes: ['URL', 'Text'], payload: 'Enter a URL or text', synchronized: 'Updated live',
    inputHelp: 'Typing, pasting, and deleting update immediately—there is no Generate step.', encoded: 'Encoded as',
    styleStep: '02 · STYLE', themes: 'Choose a scene', exports: ['Export scene', 'Export top view'],
    sceneTip: 'Left drag rotates · Right drag pans · Wheel zooms', scanTip: 'The same colored scene is moving smoothly overhead',
    themeNames: ['Sakura', 'Summer Grove', 'Maple', 'Ginkgo', 'Snow Pine', 'Sunset', 'Ocean Waves', 'Pixel Wanderer', 'Voxel Kitty'],
    themeDescriptions: [
      'one rounded-pixel cherry tree', 'one broad summer canopy', 'one asymmetric maple crown',
      'one golden fan canopy', 'one tiered snow-bough tree', 'pixel sun over a warm horizon',
      'a directional rounded-pixel wave band', 'one original 3D traveller in a twilight scene',
      'one original orange-gold voxel cat exploring a decoder-safe route',
    ],
  },
  'zh-TW': {
    locale: 'zh-TW', lang: 'zh-Hant', productName: '3D 動態體素 QR Code 生成器', offline: '完全離線',
    liveScene: '動態場景', scene: '探索場景', scan: '俯視掃描', reset: '符合視窗',
    contentStep: '01 · 內容', controls: '3D 動態體素 QR Code 生成器', inputType: '內容類型',
    payloadTypes: ['網址', '文字'], payload: '輸入網址或文字', synchronized: '已即時更新',
    inputHelp: '輸入、貼上或刪除都會立即更新，不需要按下生成。', encoded: '實際寫入',
    styleStep: '02 · 風格', themes: '選擇庭園', exports: ['匯出場景', '匯出俯視'],
    sceneTip: '左鍵自由旋轉 · 右鍵平移 · 滾輪縮放', scanTip: '同一座彩色庭園，正平滑移向俯視',
    themeNames: ['櫻花', '盛夏綠蔭', '楓葉', '銀杏', '雪松', '日落', '海浪', '像素旅兔', 'Voxel Kitty'],
    themeDescriptions: [
      '一棵圓潤像素櫻花樹', '一棵枝冠寬廣的夏日樹木', '一棵不對稱樹冠的楓樹',
      '一棵金黃扇葉樹冠的銀杏', '一棵層疊覆雪枝椏的雪松', '暖色地平線上的像素日落',
      '有方向感的圓潤像素海浪', '暮色場景中的原創 3D 旅兔', '沿可安全解碼路徑探索的原創橘金體素小貓',
    ],
  },
};

export async function assertVisibleLocaleCoherence(page, { theme = 'kitty', mode = 'scene' } = {}) {
  const themeIndex = themes.indexOf(theme);
  assert(themeIndex >= 0, `LOCALE_COHERENCE_UNKNOWN_THEME:${theme}`);
  const results = {};
  for (const specification of Object.values(localeUiExpectations)) {
    await page.evaluate(({ locale, nextTheme, nextMode }) => {
      const api = window.__VOXELQR_TEST__;
      api.setTheme(nextTheme);
      api.setMode(nextMode);
      api.setLocale(locale);
    }, { locale: specification.locale, nextTheme: theme, nextMode: mode });
    await page.waitForTimeout(40);
    const actual = await page.evaluate(() => {
      const text = (selector) => document.querySelector(selector)?.textContent?.trim() ?? null;
      return {
        lang: document.documentElement.lang,
        productName: text('.brand small'), offline: text('.offline-badge span'), liveScene: text('.stage-eyebrow [data-i18n]'),
        currentTheme: text('#theme-title'), currentDescription: text('#theme-signature'),
        scene: text('.mode-switch button[data-mode="scene"] span:last-child'),
        scan: text('.mode-switch button[data-mode="scan"] span:last-child'), reset: text('#reset-view span:last-child'),
        modeTip: text('#mode-tip'), contentStep: text('.panel-intro .panel-step'), controls: text('#controls-title'),
        inputType: text('.input-kind legend'),
        payloadTypes: [...document.querySelectorAll('[data-payload-type]')].map((node) => node.textContent?.trim()),
        payload: text('.payload-label'), synchronized: text('#sync-status'), inputHelp: text('#input-help'), encoded: text('.encoded-card > span'),
        styleStep: text('.library-heading .panel-step'), themes: text('#theme-label'),
        exports: [...document.querySelectorAll('.export-actions button span:last-child')].map((node) => node.textContent?.trim()),
        themeNames: [...document.querySelectorAll('[data-theme-label]')].map((node) => node.textContent?.trim()),
        themeDescriptions: [...document.querySelectorAll('[data-theme-description]')].map((node) => node.textContent?.trim()),
      };
    });
    const expectedUi = {
      lang: specification.lang,
      productName: specification.productName, offline: specification.offline, liveScene: specification.liveScene,
      currentTheme: specification.themeNames[themeIndex], currentDescription: specification.themeDescriptions[themeIndex],
      scene: specification.scene, scan: specification.scan, reset: specification.reset,
      modeTip: mode === 'scan' ? specification.scanTip : specification.sceneTip,
      contentStep: specification.contentStep, controls: specification.controls, inputType: specification.inputType,
      payloadTypes: specification.payloadTypes, payload: specification.payload, synchronized: specification.synchronized,
      inputHelp: specification.inputHelp, encoded: specification.encoded, styleStep: specification.styleStep,
      themes: specification.themes, exports: specification.exports,
      themeNames: specification.themeNames, themeDescriptions: specification.themeDescriptions,
    };
    assert(JSON.stringify(actual) === JSON.stringify(expectedUi), `LOCALE_COHERENCE_${specification.locale}:${JSON.stringify(actual)}`);
    results[specification.locale] = actual;
  }
  return results;
}
