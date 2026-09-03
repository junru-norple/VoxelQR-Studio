import { chromium } from '@playwright/test';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import {
  acceptanceRoot, assert, buildRoot, canvasFrame, decodePng, ensureEvidenceDirs, previewRoot,
  setPayloadAndWait, setScanAndWait, themes, validationRoot, waitForGarden, writeEvidence,
} from './validation-helpers.mjs';

const acceptanceExecutable = path.join(acceptanceRoot, 'VoxelQR-Studio.exe');
const buildExecutable = path.join(buildRoot, 'windows', 'VoxelQR-Studio.exe');
const executablePath = existsSync(acceptanceExecutable) ? acceptanceExecutable : buildExecutable;
const executableSource = executablePath === acceptanceExecutable ? 'acceptance' : 'r6-build';
const profileBase = path.join(validationRoot, 'runtime-profiles');
await mkdir(profileBase, { recursive: true });
const profileRoot = await mkdtemp(path.join(profileBase, 'windows-portable-'));
const crashRoot = path.join(profileRoot, 'Crashpad');
const cacheRoot = path.join(profileRoot, 'Cache');
const dataRoot = path.join(profileRoot, 'Data');
await mkdir(crashRoot, { recursive: true });
assert(
  path.resolve(profileRoot).startsWith(`${path.resolve(profileBase)}${path.sep}`),
  'WINDOWS_RUNTIME: temporary profile escaped validation root',
);

function reserveLoopbackPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

function waitForExit(child, timeoutMs) {
  if (child.exitCode !== null) return Promise.resolve(true);
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      child.off('exit', onExit);
      resolve(false);
    }, timeoutMs);
    const onExit = () => {
      clearTimeout(timer);
      resolve(true);
    };
    child.once('exit', onExit);
  });
}

async function removeRuntimeProfile(root) {
  let lastError;
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      await rm(root, { recursive: true, force: true, maxRetries: 2, retryDelay: 100 });
      return;
    } catch (error) {
      lastError = error;
      if (error.code !== 'EBUSY' && error.code !== 'EPERM') throw error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError;
}

function probeCdp(endpoint) {
  return new Promise((resolve, reject) => {
    const request = http.get(`${endpoint}/json/version`, { timeout: 1_000 }, (response) => {
      const success = response.statusCode >= 200 && response.statusCode < 300;
      response.resume();
      resolve(success);
    });
    request.on('timeout', () => request.destroy(new Error('CDP probe timeout')));
    request.on('error', reject);
  });
}

async function waitForCdp(port, child, stderr) {
  const endpoint = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 90_000;
  let lastError = '';
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`WINDOWS_RUNTIME: portable exited before CDP was ready (${child.exitCode}): ${stderr.join('')}`);
    }
    try {
      if (await probeCdp(endpoint)) return endpoint;
      lastError = 'HTTP non-success response';
    } catch (error) {
      lastError = error.message;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`WINDOWS_RUNTIME: CDP timeout at ${endpoint}: ${lastError}; ${stderr.join('')}`);
}

async function waitForApplicationPage(context, diagnostics) {
  const deadline = Date.now() + 90_000;
  const observed = new Set();
  const instrumented = new WeakSet();
  while (Date.now() < deadline) {
    for (const candidate of context.pages()) {
      if (candidate.isClosed()) continue;
      observed.add(candidate.url());
      if (!instrumented.has(candidate)) {
        instrumented.add(candidate);
        candidate.on('console', (message) => {
          if (message.type() === 'error') diagnostics.consoleErrors.push(message.text());
        });
        candidate.on('pageerror', (error) => diagnostics.pageErrors.push(error.message));
      }
      try {
        if (await candidate.evaluate(() => Boolean(window.__VOXELQR_TEST__))) return candidate;
      } catch {
        // Navigation can replace the execution context while Electron boots.
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(
    `WINDOWS_RUNTIME: no application page exposed the test API; observed=${JSON.stringify([...observed])}; diagnostics=${JSON.stringify(diagnostics)}`,
  );
}

await ensureEvidenceDirs();
const cdpPort = await reserveLoopbackPort();
const stderr = [];
const portableProcess = spawn(
  executablePath,
  [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profileRoot}`,
    `--crash-dumps-dir=${crashRoot}`,
    `--disk-cache-dir=${cacheRoot}`,
    `--data-path=${dataRoot}`,
    '--no-first-run',
  ],
  { cwd: validationRoot, env: process.env, stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true },
);
portableProcess.stderr.on('data', (chunk) => {
  if (stderr.join('').length < 16_000) stderr.push(chunk.toString());
});
assert(
  path.resolve(portableProcess.spawnfile) === path.resolve(executablePath),
  'WINDOWS_RUNTIME: spawned executable identity drifted',
);

let browser;
let page;
let result;
let testError;
const startupDiagnostics = { consoleErrors: [], pageErrors: [] };
try {
  const cdpEndpoint = await waitForCdp(cdpPort, portableProcess, stderr);
  browser = await chromium.connectOverCDP(cdpEndpoint);
  const context = browser.contexts()[0];
  assert(context, 'WINDOWS_RUNTIME: CDP returned no browser context');
  page = await waitForApplicationPage(context, startupDiagnostics);
  const externalRequests = [];
  const consoleErrors = [];
  page.on('request', (request) => {
    const protocol = new URL(request.url()).protocol;
    if (protocol === 'http:' || protocol === 'https:') externalRequests.push(request.url());
  });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(`PAGE_ERROR: ${error.message}`));
  await page.reload({ waitUntil: 'load' });
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
    themeMetrics.push({
      theme,
      detail: stats.visual.v8.detail,
      heroResolutionPreserved: stats.performance.heroResolutionPreserved,
      qrResolutionPreserved: stats.performance.qrResolutionPreserved,
    });
  }
  await page.evaluate(() => { window.__VOXELQR_TEST__.setTheme('sakura'); window.__VOXELQR_TEST__.setMode('scene'); });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(previewRoot, '23-windows-sakura.png') });
  assert(externalRequests.length === 0, `WINDOWS_OFFLINE: unexpected network ${externalRequests.join(', ')}`);
  assert(consoleErrors.length === 0, `WINDOWS_RUNTIME console errors: ${consoleErrors.join(' | ')}`);
  result = {
    WINDOWS_RUNTIME_GATE: 'PASS',
    WINDOWS_SAME_SCENE_GATE: 'PASS',
    WINDOWS_NO_QR_OVERLAY_GATE: 'PASS',
    WINDOWS_LIVE_INPUT_GATE: 'PASS',
    WINDOWS_BRAND_GATE: 'PASS_EXACT_VOXELQR_STUDIO',
    WINDOWS_PORTABLE_SOURCE_GATE: executableSource === 'acceptance'
      ? 'PASS_DIRECT_ACCEPTANCE_EXE'
      : 'PASS_PROJECT_CONTAINED_R6_BUILD_EXE_PRE_ACCEPTANCE',
    executableSource,
    WINDOWS_QR_RUNTIME_GATE: `PASS_${themes.length}_OF_${themes.length}`,
    WINDOWS_OFFLINE_GATE: 'PASS_0_REQUESTS',
    cdpTransport: 'DIRECT_PORTABLE_LOOPBACK',
    themeMetrics,
  };
} catch (error) {
  testError = error;
} finally {
  if (page && !page.isClosed()) await page.close({ runBeforeUnload: false }).catch(() => {});
  if (browser) await browser.close().catch(() => {});
  const exitedNormally = await waitForExit(portableProcess, 15_000);
  if (!exitedNormally && portableProcess.exitCode === null) {
    assert(
      path.resolve(portableProcess.spawnfile) === path.resolve(executablePath),
      'WINDOWS_RUNTIME: cleanup executable identity drifted',
    );
    const cleanup = spawnSync(
      'taskkill.exe',
      ['/PID', String(portableProcess.pid), '/T', '/F'],
      { encoding: 'utf8', windowsHide: true },
    );
    if (cleanup.status !== 0) {
      testError ??= new Error(`WINDOWS_RUNTIME: exact process-tree cleanup failed: ${cleanup.stderr || cleanup.stdout}`);
    }
  }
  await removeRuntimeProfile(profileRoot);
}

if (testError) throw testError;
await writeEvidence('windows-validation.json', result);
console.log(JSON.stringify(result, null, 2));
