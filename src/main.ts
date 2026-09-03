import './styles.css';
import { createCanonicalQr, type CanonicalQr, type PayloadType } from './core/qr';
import { t, type Locale, type MessageKey } from './i18n';
import {
  VoxelGarden,
  type GardenStats,
  type HeroAreaWindowMetric,
  type ProjectedCompositionMetric,
} from './scene/VoxelGarden';
import {
  KITTY_AUTHORING_SCALE,
  KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  KITTY_VISUAL_X_SCALE,
  KITTY_VISUAL_Y_SCALE,
  KITTY_VISUAL_Z_SCALE,
  WANDERER_AUTHORING_SCALE,
  WANDERER_CHARACTER_SCALE,
  WANDERER_SILHOUETTE_DEPTH_SCALE,
} from './scene/v8Hero';
import {
  R3_KITTY_FOOT_CONTACT_Y,
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  R3_KITTY_VISUAL_X_SCALE,
  R3_KITTY_VISUAL_Y_SCALE,
  R3_KITTY_VISUAL_Z_SCALE,
  R3_WANDERER_FOOT_CONTACT_Y,
  R4_KITTY_LINEAR_SCALE,
  R4_WANDERER_LINEAR_SCALE,
} from './scene/r4CharacterContract';
import {
  R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL as KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
} from './scene/r6KittyNaturalMotion';
import {
  R5_KITTY_LINEAR_SCALE_FROM_R3,
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_MASK_CAMERA,
  R5_KITTY_MASK_DENOMINATOR,
  R5_KITTY_PROJECTED_SILHOUETTE_MAX,
  R5_KITTY_PROJECTED_SILHOUETTE_MIN,
  R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
  R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES,
} from './scene/r5CharacterContract';
import { isStudioThemeId, STUDIO_THEME_IDS, THEMES, type StudioThemeId } from './themes';

type Mode = 'scene' | 'scan';
type InspectionView = 'front' | 'three-quarter' | 'three-quarter-rear' | 'side' | 'left-side' | 'right-side' | 'back' | 'low' | 'top' | 'top-oblique';
type StructureEvidenceMode = 'normal' | 'color-structure' | 'grayscale' | 'leafless';

interface RuntimeStats extends GardenStats {
  liveInputP95Ms: number;
  liveInputSamples: number;
  pendingInput: boolean;
  canvasCount: number;
  qrOverlayCount: number;
}

declare global {
  interface Window {
    __VOXELQR_TEST__: {
      setTheme: (theme: StudioThemeId) => void;
      setMode: (mode: Mode) => void;
      setLocale: (locale: Locale) => void;
      setPayload: (payload: string, type?: PayloadType) => Promise<void>;
      getQr: () => CanonicalQr;
      setInspectionView: (view: InspectionView) => void;
      setInspectionOrbitAngle: (angleDegrees: number) => void;
      resetView: () => void;
      setStructureEvidenceMode: (mode: StructureEvidenceMode) => void;
      getStats: () => RuntimeStats;
      getTreeMotionSample: () => unknown;
      getTreeStructureEvidence: () => unknown;
      getParticleMotionSample: () => unknown;
      getKittyMotionSample: () => unknown;
      measureKittyScanNoCatPixelDiff: (options?: { includeImages?: boolean }) => unknown;
      getR4CharacterContract: () => unknown;
      getR5CorrectionContract: () => unknown;
      getProjectedComposition: () => ProjectedCompositionMetric;
      measureSemanticHeroAreaWindow: (options?: {
        startTimeSeconds?: number;
        durationSeconds?: number;
        sampleHz?: number;
        resolution?: number;
        includeWorstMask?: boolean;
        includeExtremaMasks?: boolean;
        cameraMode?: 'top-down' | 'default';
        kittySubjectLinearScaleMultiplier?: number;
      }) => HeroAreaWindowMetric;
      setDiagnosticAnimationTime: (timeSeconds: number | null) => void;
      setKittyTestSeed: (sessionSeed: string | null) => void;
      captureTopDown: () => string;
      resetPerformanceMetrics: () => void;
      sampleFidelityFrame: (frameTime: number) => void;
    };
  }
}

const defaultPayload = 'https://example.com/voxelqr-studio';
let locale = readPreference<Locale>('voxelqr-locale', ['zh-TW', 'en'], 'zh-TW');
let theme = readPreference<StudioThemeId>('voxelqr-theme', STUDIO_THEME_IDS, 'sakura');
let payloadType: PayloadType = 'url';
let mode: Mode = 'scene';
let qr = createCanonicalQr(defaultPayload, payloadType);
let toastTimer = 0;
let inputFrame = 0;
let latestInputAt = performance.now();
const liveInputSamples: number[] = [];
const inputWaiters: Array<() => void> = [];

function readPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored && allowed.includes(stored as T) ? stored as T : fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* storage may be unavailable in privacy mode */ }
}

function label(key: MessageKey): string {
  return t(locale, key);
}

function percentile(values: number[], value: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * value) - 1)];
}

function themeCards(): string {
  return STUDIO_THEME_IDS.map((id) => {
    const palette = THEMES[id];
    return `<button type="button" class="theme-card" data-theme="${id}" aria-pressed="${id === theme}"
      style="--card-dark:${palette.scanDark};--card-mid:${palette.mid};--card-bright:${palette.bright};--card-light:${palette.highlight}">
      <span class="theme-card-art" aria-hidden="true"><i></i><i></i><i></i><i></i><b>${palette.glyph}</b></span>
      <span class="theme-card-copy"><strong data-theme-label="${id}">${label(id)}</strong><small>${palette.signature}</small></span>
      <span class="selected-check" aria-hidden="true">✓</span>
    </button>`;
  }).join('');
}

function appMarkup(): string {
  return `
    <div class="studio-shell">
      <header class="studio-bar">
        <a class="brand" href="#garden-stage" aria-label="VoxelQR Studio home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></span>
          <span><strong>VoxelQR Studio</strong><small data-i18n="productName">${label('productName')}</small></span>
        </a>
        <div class="studio-meta">
          <span class="offline-badge"><i aria-hidden="true"></i><span data-i18n="offline">${label('offline')}</span></span>
          <button type="button" id="compact-scan-exit" class="compact-scan-exit"><span aria-hidden="true">◆</span><span data-i18n="scene">${label('scene')}</span></button>
          <div class="language-toggle" role="group" aria-label="Language">
            <button type="button" data-locale="zh-TW" aria-pressed="${locale === 'zh-TW'}">繁中</button>
            <button type="button" data-locale="en" aria-pressed="${locale === 'en'}">EN</button>
          </div>
        </div>
      </header>

      <main class="workspace">
        <section class="stage" id="garden-stage" aria-label="Interactive 3D QR scene" data-same-scene="true">
          <canvas id="garden-canvas" aria-label="Interactive 3D voxel QR scene"></canvas>
          <header class="stage-heading">
            <p class="stage-eyebrow"><span class="live-dot" aria-hidden="true"></span> <span data-i18n="liveScene">${label('liveScene')}</span> · <span id="qr-size">${qr.size} × ${qr.size}</span></p>
            <h1 id="theme-title">${label(theme)}</h1>
            <p id="theme-signature">${THEMES[theme].signature}</p>
          </header>
          <div class="stage-tools">
            <div class="mode-switch" role="group" aria-label="View mode">
              <button type="button" data-mode="scene" aria-pressed="true"><span aria-hidden="true">◆</span><span data-i18n="scene">${label('scene')}</span></button>
              <button type="button" data-mode="scan" aria-pressed="false"><span aria-hidden="true">⌗</span><span data-i18n="scan">${label('scan')}</span></button>
            </div>
            <button type="button" id="reset-view" class="fit-button"><span aria-hidden="true">⛶</span><span data-i18n="reset">${label('reset')}</span></button>
          </div>
          <p class="control-hint" id="mode-tip" data-i18n="sceneTip">${label('sceneTip')}</p>
        </section>

        <aside class="grow-panel" aria-labelledby="controls-title">
          <div class="panel-intro">
            <p class="panel-step">01 · CONTENT</p>
            <h2 id="controls-title" data-i18n="controls">${label('controls')}</h2>
          </div>

          <fieldset class="input-kind">
            <legend data-i18n="inputType">${label('inputType')}</legend>
            <div class="segmented">
              <button type="button" data-payload-type="url" aria-pressed="true" data-i18n="url">${label('url')}</button>
              <button type="button" data-payload-type="text" aria-pressed="false" data-i18n="text">${label('text')}</button>
            </div>
          </fieldset>

          <label class="payload-label" for="payload-input" data-i18n="payload">${label('payload')}</label>
          <textarea id="payload-input" rows="4" maxlength="600" spellcheck="false" aria-describedby="input-help input-error">${defaultPayload}</textarea>
          <div class="input-meta">
            <span class="sync-state"><i id="sync-dot" aria-hidden="true"></i><span id="sync-status" role="status" aria-live="polite" data-i18n="synchronized">${label('synchronized')}</span></span>
            <span id="character-count">${[...defaultPayload].length}/600</span>
          </div>
          <p id="input-help" class="input-help" data-i18n="inputHelp">${label('inputHelp')}</p>
          <p id="input-error" class="input-error" role="alert"></p>

          <div class="encoded-card">
            <span data-i18n="encoded">${label('encoded')}</span>
            <output id="encoded-output">${qr.payload}</output>
          </div>

          <section class="theme-library" aria-labelledby="theme-label">
            <div class="library-heading"><span class="panel-step">02 · STYLE</span><h3 id="theme-label" data-i18n="themes">${label('themes')}</h3></div>
            <div class="theme-grid">${themeCards()}</div>
          </section>

          <section class="export-actions" aria-label="Export actions">
            <button type="button" id="export-scene"><span aria-hidden="true">◇</span><span data-i18n="exportScene">${label('exportScene')}</span></button>
            <button type="button" id="export-qr"><span aria-hidden="true">⌗</span><span data-i18n="exportQr">${label('exportQr')}</span></button>
          </section>
        </aside>
      </main>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
  `;
}

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('APP_ROOT_MISSING');
app.innerHTML = appMarkup();

const payloadInput = required<HTMLTextAreaElement>('#payload-input');
const gardenCanvas = required<HTMLCanvasElement>('#garden-canvas');
const garden = new VoxelGarden(gardenCanvas, qr, theme);
applyStageTheme();
bindEvents();
setPayloadType(payloadType, false);
document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : 'en';

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`MISSING_ELEMENT:${selector}`);
  return element;
}

function bindEvents(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-payload-type]').forEach((button) => {
    button.addEventListener('click', () => setPayloadType(button.dataset.payloadType as PayloadType));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((button) => {
    button.addEventListener('click', () => setLocale(button.dataset.locale as Locale));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.theme ?? ''));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode as Mode));
  });
  required<HTMLButtonElement>('#reset-view').addEventListener('click', () => garden.resetView());
  required<HTMLButtonElement>('#compact-scan-exit').addEventListener('click', () => setMode('scene'));
  required<HTMLButtonElement>('#export-qr').addEventListener('click', exportQr);
  required<HTMLButtonElement>('#export-scene').addEventListener('click', exportScene);
  payloadInput.addEventListener('input', scheduleLiveUpdate);
}

function setPayloadType(next: PayloadType, update = true): void {
  payloadType = next;
  document.querySelectorAll<HTMLButtonElement>('[data-payload-type]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.payloadType === next));
  });
  payloadInput.placeholder = next === 'url' ? label('payloadHintUrl') : label('payloadHintText');
  if (update) scheduleLiveUpdate();
}

function scheduleLiveUpdate(): void {
  latestInputAt = performance.now();
  required<HTMLElement>('#character-count').textContent = `${[...payloadInput.value].length}/600`;
  required<HTMLElement>('#input-error').textContent = '';
  setSyncState('syncing');
  if (inputFrame) return;
  inputFrame = requestAnimationFrame(commitLiveUpdate);
}

function commitLiveUpdate(): void {
  inputFrame = 0;
  const queuedAt = latestInputAt;
  const error = required<HTMLElement>('#input-error');
  try {
    const nextQr = createCanonicalQr(payloadInput.value, payloadType);
    const visualStart = performance.now();
    qr = nextQr;
    garden.setQr(qr);
    liveInputSamples.push(visualStart - queuedAt);
    if (liveInputSamples.length > 240) liveInputSamples.shift();
    error.textContent = '';
    required<HTMLOutputElement>('#encoded-output').textContent = qr.payload;
    required<HTMLElement>('#qr-size').textContent = `${qr.size} × ${qr.size}`;
    setSyncState('synchronized');
  } catch (exception) {
    const key = exception instanceof Error && exception.message === 'PAYLOAD_TOO_LONG' ? 'tooLong' : 'empty';
    error.textContent = label(key);
    setSyncState('needsInput');
  } finally {
    inputWaiters.splice(0).forEach((resolve) => resolve());
  }
}

function waitForInputCommit(): Promise<void> {
  if (!inputFrame) return Promise.resolve();
  return new Promise((resolve) => inputWaiters.push(resolve));
}

function setSyncState(state: 'syncing' | 'synchronized' | 'needsInput'): void {
  const status = required<HTMLElement>('#sync-status');
  const dot = required<HTMLElement>('#sync-dot');
  status.dataset.i18n = state;
  status.textContent = label(state);
  dot.dataset.state = state;
}

function setTheme(value: string): void {
  if (!isStudioThemeId(value)) return;
  theme = value;
  savePreference('voxelqr-theme', theme);
  document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
  required<HTMLElement>('#theme-title').textContent = label(theme);
  required<HTMLElement>('#theme-signature').textContent = THEMES[theme].signature;
  garden.setTheme(theme);
  applyStageTheme();
}

function setMode(next: Mode): void {
  mode = next;
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  const modeTip = required<HTMLElement>('#mode-tip');
  modeTip.textContent = label(mode === 'scan' ? 'scanTip' : 'sceneTip');
  modeTip.dataset.i18n = mode === 'scan' ? 'scanTip' : 'sceneTip';
  document.body.dataset.mode = mode;
  garden.setScanMode(mode === 'scan');
}

function setLocale(next: Locale): void {
  locale = next;
  document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : 'en';
  savePreference('voxelqr-locale', locale);
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.locale === locale)));
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    element.textContent = label(element.dataset.i18n as MessageKey);
  });
  STUDIO_THEME_IDS.forEach((id) => {
    const element = document.querySelector<HTMLElement>(`[data-theme-label="${id}"]`);
    if (element) element.textContent = label(id);
  });
  required<HTMLElement>('#theme-title').textContent = label(theme);
  payloadInput.placeholder = payloadType === 'url' ? label('payloadHintUrl') : label('payloadHintText');
}

function applyStageTheme(): void {
  const stage = required<HTMLElement>('.stage');
  const current = THEMES[theme];
  stage.style.setProperty('--sky-a', current.sky[0]);
  stage.style.setProperty('--sky-b', current.sky[1]);
  stage.style.setProperty('--garden-dark', current.scanDark);
  stage.style.setProperty('--garden-mid', current.mid);
  stage.style.setProperty('--garden-bright', current.bright);
  stage.style.setProperty('--garden-light', current.highlight);
  stage.style.setProperty('--garden-ground', current.ground);
}

function downloadData(name: string, data: string): void {
  const anchor = document.createElement('a');
  anchor.download = name;
  anchor.href = data;
  anchor.click();
}

function exportQr(): void {
  downloadData(`VoxelQR-Studio-${theme}-top-view.png`, garden.captureTopDown());
  showToast(label('downloadedQr'));
}

function exportScene(): void {
  downloadData(`VoxelQR-Studio-${theme}-scene.png`, garden.captureScene());
  showToast(label('downloadedScene'));
}

function showToast(message: string): void {
  const toast = required<HTMLElement>('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

window.__VOXELQR_TEST__ = {
  setTheme: (next) => setTheme(next),
  setMode: (next) => setMode(next),
  setLocale: (next) => setLocale(next),
  setInspectionView: (view) => garden.setInspectionView(view),
  setInspectionOrbitAngle: (angleDegrees) => garden.setInspectionOrbitAngle(angleDegrees),
  resetView: () => garden.resetView(),
  setStructureEvidenceMode: (mode) => garden.setStructureEvidenceMode(mode),
  setPayload: async (payload, type = 'text') => {
    setPayloadType(type, false);
    payloadInput.value = payload;
    scheduleLiveUpdate();
    await waitForInputCommit();
  },
  getQr: () => qr,
  getStats: () => ({
    ...garden.getStats(),
    liveInputP95Ms: percentile(liveInputSamples, 0.95),
    liveInputSamples: liveInputSamples.length,
    pendingInput: Boolean(inputFrame),
    canvasCount: document.querySelectorAll('canvas').length,
    qrOverlayCount: document.querySelectorAll('canvas:not(#garden-canvas), img[data-qr], svg[data-qr], .qr-overlay, .scan-mat').length,
  }),
  getTreeMotionSample: () => garden.getTreeMotionSample(),
  getTreeStructureEvidence: () => garden.getTreeStructureEvidence(),
  getParticleMotionSample: () => garden.getParticleMotionSample(),
  getKittyMotionSample: () => garden.getKittyMotionSample(),
  measureKittyScanNoCatPixelDiff: (options) => garden.measureKittyScanNoCatPixelDiff(options),
  getR4CharacterContract: () => ({
    schemaVersion: 'voxelqr-r4-character-transform-v1',
    gateBasis: 'direct R3 transform coefficients; screen-space occupancy is evidence only',
    wanderer: {
      requiredLinearScale: R4_WANDERER_LINEAR_SCALE,
      r3: {
        authoring: 1,
        character: 1,
        depth: 1,
        footContactBottomLocal: R3_WANDERER_FOOT_CONTACT_Y,
      },
      r4: {
        authoring: WANDERER_AUTHORING_SCALE,
        character: WANDERER_CHARACTER_SCALE,
        depth: WANDERER_SILHOUETTE_DEPTH_SCALE,
        linearAxes: {
          x: WANDERER_CHARACTER_SCALE,
          y: WANDERER_CHARACTER_SCALE,
          z: WANDERER_CHARACTER_SCALE * WANDERER_SILHOUETTE_DEPTH_SCALE,
        },
        footContactBottomLocal: R3_WANDERER_FOOT_CONTACT_Y,
      },
    },
    kitty: {
      requiredLinearScale: R4_KITTY_LINEAR_SCALE,
      r3: {
        authoring: 1,
        visualX: R3_KITTY_VISUAL_X_SCALE,
        visualY: R3_KITTY_VISUAL_Y_SCALE,
        visualZ: R3_KITTY_VISUAL_Z_SCALE,
        visualFootprintRadiusLocal: R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
        scanFootprintRadiusLocal: KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
        footContactBottomLocal: R3_KITTY_FOOT_CONTACT_Y,
      },
      r4: {
        authoring: KITTY_AUTHORING_SCALE,
        visualX: R3_KITTY_VISUAL_X_SCALE * R4_KITTY_LINEAR_SCALE,
        visualY: R3_KITTY_VISUAL_Y_SCALE * R4_KITTY_LINEAR_SCALE,
        visualZ: R3_KITTY_VISUAL_Z_SCALE * R4_KITTY_LINEAR_SCALE,
        visualFootprintRadiusLocal: R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL * R4_KITTY_LINEAR_SCALE,
        scanFootprintRadiusLocal: KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
        linearAxes: {
          x: R4_KITTY_LINEAR_SCALE,
          y: R4_KITTY_LINEAR_SCALE,
          z: R4_KITTY_LINEAR_SCALE,
        },
        footContactBottomLocal: R3_KITTY_FOOT_CONTACT_Y,
      },
    },
  }),
  getR5CorrectionContract: () => ({
    schemaVersion: 'voxelqr-r5-correction-contract-v1',
    acceptanceBasis: 'deterministic object-ID silhouette pixels divided by full physical board top mask pixels',
    aabbAcceptanceRole: 'informational-only-not-a-gate',
    kitty: {
      r4PreservedBaseline: {
        linearScaleFromR3: R4_KITTY_LINEAR_SCALE,
        modelTailPaletteAnimationStylePreserved: true,
      },
      r5: {
        linearScaleFromR4: R5_KITTY_LINEAR_SCALE_FROM_R4,
        linearScaleFromR3: R5_KITTY_LINEAR_SCALE_FROM_R3,
        actualVisualScale: {
          x: KITTY_VISUAL_X_SCALE,
          y: KITTY_VISUAL_Y_SCALE,
          z: KITTY_VISUAL_Z_SCALE,
        },
        actualVisualFootprintRadiusLocal: KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
        silhouette: {
          target: R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
          min: R5_KITTY_PROJECTED_SILHOUETTE_MIN,
          max: R5_KITTY_PROJECTED_SILHOUETTE_MAX,
          camera: R5_KITTY_MASK_CAMERA,
          denominator: R5_KITTY_MASK_DENOMINATOR,
        },
        navigation: {
          quietZoneModules: R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES,
          responsiveScaleBasis: '(N + 2 * quietZone) / (33 + 2 * quietZone)',
          shadowSafetyMarginLocal: R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
          fullPhysicalBoardCoverageRequired: true,
        },
        scan: {
          characterGroupRenderable: false,
          characterCapsRenderable: false,
          exactPoseSnapshotRequired: true,
          revealOnlyAfterExploreRestore: true,
        },
      },
    },
    wanderer: {
      r4ScalePreserved: true,
      continuousFullNeckLoop: true,
      knot: 'side-front',
      tails: ['short-forward-outward', 'long-side-down'],
    },
  }),
  getProjectedComposition: () => garden.getProjectedComposition(),
  measureSemanticHeroAreaWindow: (options) => garden.measureSemanticHeroAreaWindow(options),
  setDiagnosticAnimationTime: (timeSeconds) => garden.setDiagnosticAnimationTime(timeSeconds),
  setKittyTestSeed: (sessionSeed) => garden.setKittyTestSeed(sessionSeed),
  captureTopDown: () => garden.captureTopDown(),
  resetPerformanceMetrics: () => garden.resetPerformanceMetrics(),
  sampleFidelityFrame: (frameTime) => garden.sampleFidelityFrame(frameTime),
};

window.addEventListener('beforeunload', () => garden.dispose(), { once: true });
