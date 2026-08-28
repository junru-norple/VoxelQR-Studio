import * as THREE from 'three';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { CanonicalQr } from '../core/qr';
import { hashSeed, seededRandom } from '../core/prng';
import {
  buildV8Hero,
  collectTreeStructureEvidence,
  collectV8Metrics,
  evaluateBody,
  evaluateParticle,
  HERO_AREA_AUTHORING_TARGET,
  HERO_AREA_REQUIRED_MAX,
  HERO_AREA_REQUIRED_MIN,
  HERO_AREA_SAMPLE_HZ,
  HERO_AREA_WINDOW_SECONDS,
  HERO_REFERENCE_GRID_SIZE,
  HERO_REFERENCE_MAJOR_AXIS,
  HERO_SCALE_TRANSITION_MS,
  heroScaleForGrid,
  isHeroAreaSemantic,
  sampleOceanSurface,
  SCAN_MOTION_DAMPING,
  type BodyState as V8BodyState,
  type ParticleState as V8ParticleState,
  type V8HeroMetrics,
} from './v8Hero';
import { THEMES, THEME_IDS, type ThemeDefinition, type ThemeId } from '../themes';

const TERRAIN_CAPACITY = 36_000;
const MODULE_CAPACITY = 18_000;
const HERO_BODY_CAPACITY = 60_000;
const HERO_CAP_CAPACITY = 60_000;
const OCEAN_HERO_BODY_CAPACITY = 110_000;
const OCEAN_HERO_CAP_CAPACITY = 110_000;
const PARTICLE_CAPACITY = 120;
const FRUSTUM_HEIGHT = 36;
const QUIET_ZONE = 4;
const SCAN_MARGIN_MODULES = 20;
const COMPACT_SCAN_MAX_EDGE = 700;
const COMPACT_SCAN_PIXEL_RATIO = 1.25;
export const COMPACT_SCAN_POSTFILTER_PX = 0.8;
const TRANSITION_SECONDS = 1.05;
const BLOCK_HEIGHT = 0.78;
const BLOCK_STEP = 0.72;
const CAP_HEIGHT = 0.055;
const OCEAN_PHASE_X = 0.52;
const OCEAN_PHASE_Z = 0.18;
const OCEAN_SPEED = 1.72;
const OCEAN_SECONDARY_SPEED = 0.86;
const HERO_AREA_DIAGNOSTIC_LAYER = 31;
export const TOP_DOWN_EXPORT_SIDE = 1001;
export const TOP_DOWN_EXPORT_SUPERSAMPLE = 2;
export const TOP_DOWN_EXPORT_RENDER_SIDE = TOP_DOWN_EXPORT_SIDE * TOP_DOWN_EXPORT_SUPERSAMPLE;
export const TOP_DOWN_EXPORT_MARGIN_MODULES = SCAN_MARGIN_MODULES;
export const TOP_DOWN_EXPORT_POSTFILTER_PX = 0.8;

export function topDownExportZoom(gridSize: number): number {
  return FRUSTUM_HEIGHT / Math.max(1, Math.round(gridSize) + TOP_DOWN_EXPORT_MARGIN_MODULES);
}

export function topDownExportProjectedModulePixels(gridSize: number): number {
  return TOP_DOWN_EXPORT_SIDE / Math.max(1, Math.round(gridSize) + TOP_DOWN_EXPORT_MARGIN_MODULES);
}
type HeroSemantic = V8BodyState['semantic'];

interface BodyState {
  x: number;
  z: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationY: number;
  phase: number;
  amplitude: number;
  color: THREE.Color;
  wave: boolean;
  semantic: HeroSemantic;
  column: number;
  row: number;
  cellEdge?: number;
  motionLayer?: V8BodyState['motionLayer'];
  motionGroup?: number;
  variation?: number;
  part?: string;
  treeHeight?: number;
}

interface CapState {
  x?: number;
  z?: number;
  baseY?: number;
  phase?: number;
  amplitude?: number;
  wave?: boolean;
  sourceBodyIndex?: number;
  scaleX?: number;
  scaleZ?: number;
  offsetX?: number;
  offsetZ?: number;
  scanX?: number;
  scanZ?: number;
  scanScaleX?: number;
  scanScaleZ?: number;
}

interface ParticleState {
  origin: THREE.Vector3;
  phase: number;
  scale: number;
  scaleY?: number;
  scaleZ?: number;
  speed?: number;
  drift?: number;
  kind?: V8ParticleState['kind'];
}

interface HeroRuntime {
  group: THREE.Group;
  body: THREE.InstancedMesh;
  darkCaps: THREE.InstancedMesh;
  lightCaps: THREE.InstancedMesh;
  particles: THREE.InstancedMesh;
  bodyCapacity: number;
  capCapacity: number;
  bodies: BodyState[];
  darkCapStates: CapState[];
  lightCapStates: CapState[];
  particleStates: ParticleState[];
  configuredPayload: string;
  scaleStart: number;
  scaleCurrent: number;
  scaleTarget: number;
  scaleStartedAt: number;
  scaleSettledAt: number;
  scaleTransitionMs: number;
}

interface CameraState {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  up: THREE.Vector3;
  target: THREE.Vector3;
  zoom: number;
}

export interface ProjectedCompositionMetric {
  source: 'actual-production-frame';
  theme: ThemeId;
  gridSize: number;
  frame: number;
  canvas: { width: number; height: number };
  semanticVoxelCount: number;
  heroBoundsPx: { min: [number, number]; max: [number, number]; size: [number, number] };
  qrBoundsPx: { min: [number, number]; max: [number, number]; size: [number, number] };
  heroProjectedMajorAxisPx: number;
  qrProjectedMajorAxisPx: number;
  projectedHeroToQrRatio: number;
}

export interface HeroAreaFrameMetric {
  source: 'production-scene-semantic-id-pass';
  maskSource: 'dual-production-geometry-masks-semantic-subject-and-active-qr-plane';
  sceneUuid: string;
  cameraUuid: string;
  theme: ThemeId;
  payload: string;
  gridSize: number;
  timeSeconds: number;
  resolution: number;
  qrPixels: number;
  heroIntersectionPixels: number;
  ratio: number;
  semanticVoxelCount: number;
  excludedSemanticVoxelCount: number;
  cameraMode: 'production-top-down-scan-camera' | 'production-default-opening-camera';
  viewportExtraction: 'active-qr-projected-mask-intersection';
  antiAliasIndependent: true;
  reduction: 'gpu-float32-exact-sum' | 'cpu-binary-readback-fallback';
  maskDataUrl?: string;
  qrMaskDataUrl?: string;
}

export interface HeroAreaWindowMetric {
  source: HeroAreaFrameMetric['source'];
  theme: ThemeId;
  payload: string;
  gridSize: number;
  startTimeSeconds: number;
  durationSeconds: number;
  sampleHz: number;
  fixedTimestepSeconds: number;
  renderedFrameCount: number;
  resolution: number;
  requiredMin: number;
  requiredMax: number;
  authoringTarget: number;
  ratioTrace: number[];
  minRatio: number;
  maxRatio: number;
  medianRatio: number;
  minFrame: HeroAreaFrameMetric;
  maxFrame: HeroAreaFrameMetric;
  worstFrame: HeroAreaFrameMetric;
}

export interface GardenStats {
  drawCalls: number;
  triangles: number;
  instances: number;
  progress: number;
  mode: 'scene' | 'scan';
  payload: string;
  theme: ThemeId;
  sceneUuid: string;
  cameraUuid: string;
  canvasId: string;
  materialSignature: string;
  animationTime: number;
  animationFrame: number;
  camera: {
    position: number[];
    quaternion: number[];
    up: number[];
    target: number[];
    zoom: number;
  };
  controls: {
    type: 'ArcballControls';
    rotate: boolean;
    pan: boolean;
    zoom: boolean;
    polarClamp: boolean;
    azimuthClamp: boolean;
  };
  visual: {
    primaryPrimitive: 'rounded-cuboid';
    heroCount: number;
    forestCount: number;
    qrColumnField: boolean;
    neutralBlackDominance: boolean;
    v8: V8HeroMetrics;
    responsiveHero: {
      gridSize: number;
      referenceGridSize: number;
      qrActiveExtent: number;
      referenceMajorAxis: number;
      targetScale: number;
      currentScale: number;
      semanticMajorAxisWorld: number;
      heroToQrRatio: number;
      referenceHeroToQrRatio: number;
      ratioError: number;
      axisScale: [number, number, number];
      axisSpread: number;
      transitionMs: number;
      lastTransitionDurationMs: number;
      transitionSettled: boolean;
      particlesVisible: boolean;
      manualCameraAdjusted: boolean;
      cameraFit: {
        worldBoundsMin: number[];
        worldBoundsMax: number[];
        ndcBounds: [number, number, number, number];
        pixelMargins: [number, number, number, number];
        clippedPixels: number;
        completeHeroAndQuietZoneVisible: boolean;
      };
    };
    oceanWaveDirection: 'positive-x';
    oceanWaveSamples: number[];
    treeVolume: null | {
      theme: ThemeId;
      canopyBounds: { min: number[]; max: number[]; size: number[] };
      canopyDepthRatio: number;
      canopyVoxelCount: number;
      trunkAndBranchVoxelCount: number;
    };
    sunVolume: null | {
      coreBounds: { min: number[]; max: number[]; size: number[] };
      sphericityRatio: number;
      clearance: number;
      clearanceRatio: number;
      coreVoxelCount: number;
      supportVoxelCount: number;
      unexplainedOutlierCount: number;
    };
    oceanMotion: null | {
      visibleWaterTiles: number;
      timeVaryingDataCoveragePercent: number;
      perceptibleMotionCoveragePercent: number;
      largestStaticRegionPercent: number;
      crestTravelPercentWidth: number;
      phaseGroupCount: number;
      sampleCount: number;
      samplePeriodSeconds: number;
      crestTravelSamples: number[];
      gridSize: number;
      perceptibleThreshold: number;
      tileDeltas: Array<{ column: number; row: number; delta: number }>;
      minVerticalDelta: number;
      maxVerticalDelta: number;
  };
  };
  resources: {
    geometries: number;
    textures: number;
    programs: number;
    sceneObjects: number;
    managedListeners: number;
  };
  performance: {
    frameTimeMedianMs: number;
    frameTimeP95Ms: number;
    pointerResponseP95Ms: number;
    pointerSamples: number;
    longTaskCount: number;
    maxLongTaskMs: number;
    fidelityLevel: 'high' | 'reduced-atmosphere';
    activeParticleCount: number;
    totalParticleCount: number;
    fidelityReason: string;
    heroResolutionPreserved: true;
    qrResolutionPreserved: true;
    hysteresisEnabled: true;
  };
}

function percentile(values: number[], percentileValue: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * percentileValue) - 1)];
}

function smoother(value: number): number {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function makeTopQuaternion(): THREE.Quaternion {
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0, 'XYZ'));
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

export class VoxelGarden {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(-18, 18, 18, -18, 0.1, 360);
  private readonly controls: ArcballControls & { target: THREE.Vector3 };
  private readonly root = new THREE.Group();
  private readonly heroRoot = new THREE.Group();
  private readonly clock = new THREE.Clock();
  private readonly dummy = new THREE.Object3D();
  private readonly waveColor = new THREE.Color();
  private readonly waveHighlight = new THREE.Color(THEMES.ocean.highlight);
  private readonly resizeObserver: ResizeObserver;
  private readonly roundedGeometry = new RoundedBoxGeometry(1, 1, 1, 1, 0.14);
  private readonly capGeometry = new THREE.BoxGeometry(1.01, CAP_HEIGHT, 1.01);
  private readonly particleGeometry = new RoundedBoxGeometry(0.34, 0.34, 0.34, 1, 0.075);
  private readonly areaMaskMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
  private readonly areaMaskMesh = new THREE.InstancedMesh(this.roundedGeometry, this.areaMaskMaterial, OCEAN_HERO_BODY_CAPACITY);
  private readonly areaQrMaskMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff', toneMapped: false, side: THREE.DoubleSide, depthTest: false, depthWrite: false,
  });
  private readonly areaQrMaskMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.areaQrMaskMaterial);
  private readonly areaReductionMaterial = new THREE.ShaderMaterial({
    uniforms: {
      inputTexture: { value: null as THREE.Texture | null },
      qrTexture: { value: null as THREE.Texture | null },
      inputSize: { value: new THREE.Vector2(1, 1) },
      combineMasks: { value: 1 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform sampler2D inputTexture;
      uniform sampler2D qrTexture;
      uniform vec2 inputSize;
      uniform float combineMasks;
      varying vec2 vUv;
      void main() {
        vec2 outputCell = floor(gl_FragCoord.xy);
        vec2 baseUv = (outputCell * 2.0 + vec2(0.5)) / inputSize;
        vec2 texel = 1.0 / inputSize;
        vec2 uv0 = baseUv;
        vec2 uv1 = baseUv + vec2(texel.x, 0.0);
        vec2 uv2 = baseUv + vec2(0.0, texel.y);
        vec2 uv3 = baseUv + texel;
        if (combineMasks > 0.5) {
          float h0 = step(0.5, texture2D(inputTexture, uv0).r);
          float h1 = step(0.5, texture2D(inputTexture, uv1).r);
          float h2 = step(0.5, texture2D(inputTexture, uv2).r);
          float h3 = step(0.5, texture2D(inputTexture, uv3).r);
          float q0 = step(0.5, texture2D(qrTexture, uv0).r);
          float q1 = step(0.5, texture2D(qrTexture, uv1).r);
          float q2 = step(0.5, texture2D(qrTexture, uv2).r);
          float q3 = step(0.5, texture2D(qrTexture, uv3).r);
          gl_FragColor = vec4(h0 * q0 + h1 * q1 + h2 * q2 + h3 * q3, q0 + q1 + q2 + q3, 0.0, 1.0);
        } else {
          vec2 sum = texture2D(inputTexture, uv0).rg
            + texture2D(inputTexture, uv1).rg
            + texture2D(inputTexture, uv2).rg
            + texture2D(inputTexture, uv3).rg;
          gl_FragColor = vec4(sum, 0.0, 1.0);
        }
      }
    `,
    depthTest: false,
    depthWrite: false,
    blending: THREE.NoBlending,
    toneMapped: false,
  });
  private readonly areaReductionMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.areaReductionMaterial);
  private readonly areaReductionCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  private readonly areaRenderTargets = new Map<number, {
    heroMask: THREE.WebGLRenderTarget;
    qrMask: THREE.WebGLRenderTarget;
    reductions: THREE.WebGLRenderTarget[];
  }>();
  private readonly terrainMaterial = new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0 });
  private readonly qrBodyMaterial = new THREE.MeshStandardMaterial({ roughness: 0.78, metalness: 0.01 });
  private readonly qrCapMaterial = new THREE.MeshBasicMaterial({ color: '#a52b6d', toneMapped: false });
  private readonly terrainMesh = new THREE.InstancedMesh(this.roundedGeometry, this.terrainMaterial, TERRAIN_CAPACITY);
  private readonly qrBodyMesh = new THREE.InstancedMesh(this.roundedGeometry, this.qrBodyMaterial, MODULE_CAPACITY);
  private readonly qrCapMesh = new THREE.InstancedMesh(this.capGeometry, this.qrCapMaterial, MODULE_CAPACITY);
  private readonly runtimes = new Map<ThemeId, HeroRuntime>();
  private readonly platformMaterial = new THREE.MeshStandardMaterial({ color: '#fbf4df', roughness: 0.96, metalness: 0 });
  private readonly platform = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 1, 0.1), this.platformMaterial);
  private readonly shadowTexture: THREE.CanvasTexture;
  private readonly shadow: THREE.Mesh;
  private readonly hemisphere = new THREE.HemisphereLight('#fffbea', '#86a69a', 2.65);
  private readonly keyLight = new THREE.DirectionalLight('#fff8e5', 3.4);
  private readonly fillLight = new THREE.DirectionalLight('#ffd0e2', 1.75);
  private readonly topQuaternion = makeTopQuaternion();
  private readonly scanPosition = new THREE.Vector3(0, 110, 0);
  private readonly scanTarget = new THREE.Vector3(0, 0, 0);
  private readonly frameTimes: number[] = [];
  private readonly pointerResponses: number[] = [];
  private readonly longTasks: number[] = [];
  private readonly onPointerDown: () => void;
  private readonly onPointerMove: (event: PointerEvent) => void;
  private readonly onWheel: () => void;
  private readonly onControlChange: () => void;
  private readonly onControlStart: () => void;
  private readonly onControlEnd: () => void;
  private longTaskObserver: PerformanceObserver | null = null;
  private qr: CanonicalQr;
  private theme: ThemeDefinition;
  private frame = 0;
  private animationFrame = 0;
  private fidelityLevel: 'high' | 'reduced-atmosphere' = 'high';
  private fidelityReason = 'default-high-detail';
  private slowFrameBudget = 0;
  private recoveryFrameBudget = 0;
  private elapsed = 0;
  private progress = 0;
  private targetProgress = 0;
  private requestedMode: 'scene' | 'scan' = 'scene';
  private savedCamera: CameraState;
  private defaultCamera: CameraState;
  private scanZoom = 1;
  private pointerMoveAt = -1;
  private manualCameraAdjusted = false;
  private interactionUntil = 0;
  private lastFrameAt = performance.now();
  private disposed = false;
  private moduleCount = 0;
  private diagnosticAnimationTime: number | null = null;
  private structureEvidenceMode: 'normal' | 'color-structure' | 'grayscale' | 'leafless' = 'normal';

  constructor(canvas: HTMLCanvasElement, qr: CanonicalQr, themeId: ThemeId) {
    this.qr = qr;
    this.theme = THEMES[themeId];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.8, 1.2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.areaMaskMesh.count = 0;
    this.areaMaskMesh.frustumCulled = false;
    this.areaMaskMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.areaMaskMesh.layers.set(HERO_AREA_DIAGNOSTIC_LAYER);
    this.areaQrMaskMesh.frustumCulled = false;
    this.areaQrMaskMesh.rotation.x = -Math.PI / 2;
    this.areaQrMaskMesh.layers.set(HERO_AREA_DIAGNOSTIC_LAYER);
    this.areaReductionMesh.frustumCulled = false;
    this.areaReductionMesh.layers.set(HERO_AREA_DIAGNOSTIC_LAYER);
    this.areaReductionCamera.position.z = 1;
    this.areaReductionCamera.layers.set(HERO_AREA_DIAGNOSTIC_LAYER);

    this.camera.position.set(29, 14, 33);
    this.camera.zoom = this.sceneZoom();
    this.camera.updateProjectionMatrix();
    this.controls = new ArcballControls(this.camera, canvas, this.scene) as ArcballControls & { target: THREE.Vector3 };
    this.controls.enableRotate = true;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.enableFocus = true;
    this.controls.enableAnimations = true;
    this.controls.cursorZoom = true;
    this.controls.dampingFactor = 18;
    this.controls.rotateSpeed = 1.05;
    this.controls.scaleFactor = 1.12;
    this.controls.minZoom = 0.08;
    this.controls.maxZoom = 4.2;
    this.controls.target.set(0, 3.45, 0);
    this.controls.setGizmosVisible(false);
    this.controls.update();
    this.controls.saveState();
    this.defaultCamera = this.readCameraState();
    this.savedCamera = this.readCameraState();

    this.terrainMesh.count = 0;
    this.qrBodyMesh.count = 0;
    this.qrCapMesh.count = 0;
    this.terrainMesh.frustumCulled = false;
    this.qrBodyMesh.frustumCulled = false;
    this.qrCapMesh.frustumCulled = false;
    this.qrCapMesh.renderOrder = 3;

    for (const id of THEME_IDS) {
      const definition = THEMES[id];
      const group = new THREE.Group();
      const bodyCapacity = id === 'ocean' ? OCEAN_HERO_BODY_CAPACITY : HERO_BODY_CAPACITY;
      const capCapacity = id === 'ocean' ? OCEAN_HERO_CAP_CAPACITY : HERO_CAP_CAPACITY;
      const body = new THREE.InstancedMesh(
        this.roundedGeometry,
        new THREE.MeshStandardMaterial({ roughness: 0.68, metalness: 0.015 }),
        bodyCapacity,
      );
      const darkCaps = new THREE.InstancedMesh(
        this.capGeometry,
        new THREE.MeshBasicMaterial({ color: definition.scanDark, toneMapped: false }),
        capCapacity,
      );
      const lightCaps = new THREE.InstancedMesh(
        this.capGeometry,
        new THREE.MeshBasicMaterial({ color: definition.ground, toneMapped: false }),
        capCapacity,
      );
      const particles = new THREE.InstancedMesh(
        this.particleGeometry,
        new THREE.MeshBasicMaterial({ color: definition.highlight, transparent: true, opacity: id === 'snow' ? 0.88 : 0.72, toneMapped: false }),
        PARTICLE_CAPACITY,
      );
      for (const mesh of [body, darkCaps, lightCaps, particles]) {
        mesh.count = 0;
        mesh.frustumCulled = false;
        group.add(mesh);
      }
      group.visible = id === themeId;
      const runtime: HeroRuntime = {
        group, body, darkCaps, lightCaps, particles,
        bodyCapacity, capCapacity,
        bodies: [], darkCapStates: [], lightCapStates: [], particleStates: [], configuredPayload: '',
        scaleStart: 1, scaleCurrent: 1, scaleTarget: 1,
        scaleStartedAt: 0, scaleSettledAt: 0,
        scaleTransitionMs: HERO_SCALE_TRANSITION_MS,
      };
      this.runtimes.set(id, runtime);
      this.heroRoot.add(group);
    }

    this.platform.position.y = -0.31;
    this.platform.scale.set(1, 0.36, 1);
    this.shadowTexture = this.createShadowTexture();
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: this.shadowTexture, transparent: true, depthWrite: false, toneMapped: false }),
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = -0.5;

    this.root.add(this.shadow, this.platform, this.terrainMesh, this.qrBodyMesh, this.qrCapMesh, this.heroRoot);
    this.scene.add(this.root, this.hemisphere, this.keyLight, this.fillLight);
    this.keyLight.position.set(-18, 30, 20);
    this.fillLight.position.set(22, 16, -24);

    this.onPointerDown = () => {
      if (this.requestedMode === 'scene') this.manualCameraAdjusted = true;
      this.interactionUntil = performance.now() + 900;
      canvas.classList.add('is-dragging');
    };
    this.onPointerMove = (event) => {
      if (event.buttons <= 0) return;
      if (this.requestedMode === 'scene') this.manualCameraAdjusted = true;
      this.pointerMoveAt = performance.now();
      this.interactionUntil = performance.now() + 900;
    };
    this.onWheel = () => {
      if (this.requestedMode === 'scene') this.manualCameraAdjusted = true;
      this.interactionUntil = performance.now() + 900;
    };
    this.onControlStart = () => { this.interactionUntil = performance.now() + 900; };
    this.onControlEnd = () => { canvas.classList.remove('is-dragging'); };
    this.onControlChange = () => {
      this.interactionUntil = performance.now() + 650;
      if (this.pointerMoveAt >= 0) {
        this.pointerResponses.push(performance.now() - this.pointerMoveAt);
        if (this.pointerResponses.length > 300) this.pointerResponses.shift();
        this.pointerMoveAt = -1;
      }
    };
    canvas.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    canvas.addEventListener('pointermove', this.onPointerMove, { passive: true });
    canvas.addEventListener('wheel', this.onWheel, { passive: true });
    this.controls.addEventListener('start', this.onControlStart);
    this.controls.addEventListener('end', this.onControlEnd);
    this.controls.addEventListener('change', this.onControlChange);
    this.observeLongTasks();

    this.applyTheme();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement ?? canvas);
    this.resize();
    this.animate();
  }

  private createShadowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);
    const gradient = context.createRadialGradient(64, 64, 8, 64, 64, 62);
    gradient.addColorStop(0, 'rgba(34, 72, 60, 0.26)');
    gradient.addColorStop(0.56, 'rgba(34, 72, 60, 0.13)');
    gradient.addColorStop(1, 'rgba(34, 72, 60, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private applyTheme(): void {
    this.platformMaterial.color.set(this.theme.ground);
    this.qrCapMaterial.color.set(this.theme.scanDark);
    this.hemisphere.color.set(this.theme.light[0]);
    this.hemisphere.groundColor.set(this.theme.groundEdge);
    this.keyLight.color.set(this.theme.light[0]);
    this.fillLight.color.set(this.theme.light[1]);
    for (const id of THEME_IDS) {
      const runtime = this.runtimes.get(id);
      if (runtime) runtime.group.visible = id === this.theme.id;
    }
    this.configureBase();
    this.configureHero(this.theme.id);
    this.refreshDefaultCamera(!this.manualCameraAdjusted && this.requestedMode === 'scene' && this.progress <= 0.001);
  }

  private configureBase(): void {
    const half = (this.qr.size - 1) * 0.5;
    const side = this.qr.size + QUIET_ZONE * 2;
    const terrainCount = side * side;
    if (terrainCount > TERRAIN_CAPACITY) throw new Error('TERRAIN_CAPACITY_EXCEEDED');
    let terrainIndex = 0;
    let moduleIndex = 0;
    const ground = new THREE.Color(this.theme.ground);
    const mid = new THREE.Color(this.theme.mid);
    const bright = new THREE.Color(this.theme.bright);

    for (let row = -QUIET_ZONE; row < this.qr.size + QUIET_ZONE; row += 1) {
      for (let column = -QUIET_ZONE; column < this.qr.size + QUIET_ZONE; column += 1) {
        const inside = row >= 0 && row < this.qr.size && column >= 0 && column < this.qr.size;
        const x = column - half;
        const z = row - half;
        this.dummy.position.set(x, -0.05, z);
        this.dummy.scale.set(0.93, 0.14, 0.93);
        this.dummy.rotation.set(0, 0, 0);
        this.dummy.updateMatrix();
        this.terrainMesh.setMatrixAt(terrainIndex, this.dummy.matrix);
        const terrainColor = ground;
        this.terrainMesh.setColorAt(terrainIndex, terrainColor);
        terrainIndex += 1;

        if (!inside || !this.qr.matrix[row][column]) continue;
        if (moduleIndex >= MODULE_CAPACITY) throw new Error('QR_MODULE_CAPACITY_EXCEEDED');
        this.dummy.position.set(x, 0.245, z);
        this.dummy.scale.set(0.88, 0.44, 0.88);
        this.dummy.updateMatrix();
        this.qrBodyMesh.setMatrixAt(moduleIndex, this.dummy.matrix);
        this.qrBodyMesh.setColorAt(moduleIndex, (row + column) % 5 === 0 ? bright : mid);
        this.dummy.position.set(x, 0.4925, z);
        this.dummy.scale.set(1, 1, 1);
        this.dummy.updateMatrix();
        this.qrCapMesh.setMatrixAt(moduleIndex, this.dummy.matrix);
        moduleIndex += 1;
      }
    }

    this.terrainMesh.count = terrainIndex;
    this.qrBodyMesh.count = moduleIndex;
    this.qrCapMesh.count = moduleIndex;
    this.moduleCount = moduleIndex;
    for (const mesh of [this.terrainMesh, this.qrBodyMesh, this.qrCapMesh]) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    const platformSide = side + 2.4;
    this.platform.scale.set(platformSide, 0.36, platformSide);
    this.shadow.scale.set(platformSide * 1.42, platformSide * 1.25, 1);
    this.scanZoom = this.computeScanZoom();
  }

  private configureHero(themeId: ThemeId): void {
    const runtime = this.runtimes.get(themeId);
    if (!runtime) return;
    runtime.bodies.length = 0;
    runtime.darkCapStates.length = 0;
    runtime.lightCapStates.length = 0;
    runtime.particleStates.length = 0;
    const targetScale = heroScaleForGrid(this.qr.size);
    const currentScale = runtime.group.scale.x;
    const scaleChanging = this.requestedMode === 'scene' && Math.abs(currentScale - targetScale) > 0.00001;
    runtime.scaleStart = scaleChanging ? currentScale : targetScale;
    runtime.scaleCurrent = scaleChanging ? currentScale : targetScale;
    runtime.scaleTarget = targetScale;
    runtime.scaleStartedAt = performance.now();
    runtime.scaleSettledAt = scaleChanging ? runtime.scaleStartedAt + runtime.scaleTransitionMs : runtime.scaleStartedAt;
    runtime.particles.visible = !scaleChanging;
    runtime.group.scale.setScalar(runtime.scaleCurrent);
    const random = seededRandom(hashSeed(`${themeId}:hero:v8.2`));
    const hero = buildV8Hero(this.qr, themeId, random);
    for (const body of hero.bodies) runtime.bodies.push(body);
    for (const cap of hero.darkCaps) runtime.darkCapStates.push(cap);
    void this.buildTree;
    void this.buildSunset;
    void this.buildOcean;
    for (const cap of hero.lightCaps) runtime.lightCapStates.push(cap);
    for (const particle of hero.particles) runtime.particleStates.push(particle);
    if (runtime.bodies.length > runtime.bodyCapacity) throw new Error('HERO_BODY_CAPACITY_EXCEEDED');
    if (runtime.darkCapStates.length > runtime.capCapacity || runtime.lightCapStates.length > runtime.capCapacity) throw new Error('HERO_CAP_CAPACITY_EXCEEDED');
    runtime.body.count = runtime.bodies.length;
    runtime.darkCaps.count = runtime.darkCapStates.length;
    runtime.lightCaps.count = runtime.lightCapStates.length;
    runtime.particles.count = this.fidelityLevel === 'high' ? runtime.particleStates.length : Math.ceil(runtime.particleStates.length * 0.58);
    runtime.configuredPayload = this.qr.payload;
    this.updateHeroScale(runtime);
    this.updateHeroRuntime(runtime, true);
  }

  private updateHeroScale(runtime: HeroRuntime): void {
    const noScaleDelta = Math.abs(runtime.scaleStart - runtime.scaleTarget) <= 0.00001;
    const wasSettled = Math.abs(runtime.scaleCurrent - runtime.scaleTarget) <= 0.00001;
    const rawProgress = runtime.scaleTransitionMs <= 0 || noScaleDelta
      ? 1
      : THREE.MathUtils.clamp((performance.now() - runtime.scaleStartedAt) / runtime.scaleTransitionMs, 0, 1);
    const amount = smoother(rawProgress);
    runtime.scaleCurrent = THREE.MathUtils.lerp(runtime.scaleStart, runtime.scaleTarget, amount);
    if (rawProgress >= 1) {
      runtime.scaleCurrent = runtime.scaleTarget;
      if (!wasSettled) runtime.scaleSettledAt = performance.now();
    }
    runtime.group.scale.setScalar(runtime.scaleCurrent);
    runtime.particles.visible = rawProgress >= 1;
  }

  private buildTree(runtime: HeroRuntime, id: ThemeId, random: () => number): void {
    const centerColumn = Math.floor(this.qr.size * 0.5);
    const centerRow = Math.floor(this.qr.size * 0.5);
    const definition = THEMES[id];
    const radii: Record<'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow', [number, number]> = {
      sakura: [7, 6], summer: [8, 7], maple: [8, 7], ginkgo: [8, 6], snow: [7, 6],
    };
    const [radiusX, radiusZ] = radii[id as keyof typeof radii];

    for (const [dx, dz, levels] of [[0, 0, 9], [1, 0, 7], [0, 1, 6], [-1, 0, 4]] as const) {
      this.addColumn(runtime, centerColumn + dx, centerRow + dz, 0.46, levels, definition.trunk, random() * Math.PI * 2, 0, 'trunk');
    }
    const branches = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1]] as const;
    branches.forEach(([dx, dz], branchIndex) => {
      const length = branchIndex < 4 ? 4 : 3;
      for (let step = 1; step <= length; step += 1) {
        this.addColumn(
          runtime,
          centerColumn + dx * step,
          centerRow + dz * step,
          3.75 + step * 0.42 + (branchIndex % 2) * 0.28,
          1,
          definition.trunk,
          branchIndex * 0.73 + step * 0.19,
          0.008,
          'branch',
        );
      }
    });

    if (id === 'snow') {
      this.buildSnowCanopy(runtime, centerColumn, centerRow, definition, random);
    } else {
      for (let dz = -radiusZ; dz <= radiusZ; dz += 1) {
        for (let dx = -radiusX; dx <= radiusX; dx += 1) {
          const score = this.treeCrownScore(id, dx, dz, radiusX, radiusZ);
          if (score <= 0) continue;
          const ginkgoFan = id === 'ginkgo';
          const levels = ginkgoFan
            ? 2 + Math.ceil(score * 5 + (1 - Math.abs(dx) / radiusX) * 2)
            : 2 + Math.ceil(score * 8);
          const baseY = ginkgoFan
            ? 3.9 + (1 - score) * 1.5 + Math.abs(dx) / radiusX * 0.35
            : 3.65 + (1 - score) * 1.75;
          const palette = [definition.mid, definition.bright, definition.highlight];
          const color = palette[positiveModulo(dx * 3 + dz * 5 + Math.floor(score * 7), palette.length)];
          this.addColumn(runtime, centerColumn + dx, centerRow + dz, baseY, levels, color, random() * Math.PI * 2, id === 'summer' ? 0.04 : 0.028, 'canopy');
        }
      }
    }
    this.buildParticles(runtime, id, random, centerColumn, centerRow, Math.max(radiusX, radiusZ));
  }

  private buildSnowCanopy(runtime: HeroRuntime, centerColumn: number, centerRow: number, definition: ThemeDefinition, random: () => number): void {
    const tiers = [
      { radiusX: 7, radiusZ: 5.5, baseY: 3.75, levels: 3, offsetZ: 0 },
      { radiusX: 5.5, radiusZ: 4.5, baseY: 5.45, levels: 3, offsetZ: 0.5 },
      { radiusX: 4, radiusZ: 3.4, baseY: 7.1, levels: 3, offsetZ: 0 },
    ];
    tiers.forEach((tier, tierIndex) => {
      const limitX = Math.ceil(tier.radiusX);
      const limitZ = Math.ceil(tier.radiusZ);
      for (let dz = -limitZ; dz <= limitZ; dz += 1) {
        for (let dx = -limitX; dx <= limitX; dx += 1) {
          const score = 1 - Math.hypot(dx / tier.radiusX, (dz - tier.offsetZ) / tier.radiusZ);
          if (score <= 0) continue;
          const levels = Math.max(2, tier.levels - (score < 0.38 ? 1 : 0));
          const color = tierIndex === 0 && (dx + dz) % 3 === 0 ? definition.mid : (score > 0.58 ? definition.highlight : definition.bright);
          this.addColumn(runtime, centerColumn + dx, centerRow + dz, tier.baseY + (1 - score) * 0.35, levels, color, random() * Math.PI * 2, 0.02, 'canopy');
        }
      }
    });
  }

  private treeCrownScore(id: ThemeId, dx: number, dz: number, radiusX: number, radiusZ: number): number {
    const ellipse = (cx: number, cz: number, rx: number, rz: number) => 1 - Math.hypot((dx - cx) / rx, (dz - cz) / rz);
    if (id === 'sakura') {
      return Math.max(
        ellipse(-2.3, 0, radiusX * 0.67, radiusZ * 0.74),
        ellipse(2.2, 0.5, radiusX * 0.67, radiusZ * 0.72),
        ellipse(0, -2.2, radiusX * 0.62, radiusZ * 0.72),
        ellipse(0.4, 2.2, radiusX * 0.68, radiusZ * 0.68),
        ellipse(0, 0, radiusX * 0.62, radiusZ * 0.78),
      );
    }
    if (id === 'summer') return ellipse(0, 0, radiusX, radiusZ) + Math.sin(dx * 1.7 + dz) * 0.045;
    if (id === 'maple') {
      return Math.max(
        ellipse(-2.8, -0.9, radiusX * 0.7, radiusZ * 0.62),
        ellipse(2.2, 1, radiusX * 0.72, radiusZ * 0.65),
        ellipse(0, -2.8, radiusX * 0.6, radiusZ * 0.58),
        ellipse(0.7, 2.7, radiusX * 0.66, radiusZ * 0.6),
      );
    }
    if (id === 'ginkgo') {
      if (dz < -radiusZ * 0.42) return -1;
      const radial = 1 - Math.hypot(dx / radiusX, (dz - 1.1) / radiusZ);
      return radial + (1 - Math.abs(dx) / radiusX) * 0.09;
    }
    return -1;
  }

  private buildSunset(runtime: HeroRuntime, random: () => number): void {
    const centerColumn = Math.floor(this.qr.size * 0.5);
    const centerRow = Math.floor(this.qr.size * 0.5) - 2;
    const definition = THEMES.sunset;
    const radius = 4;
    const centerY = 9.6;
    const verticalStep = 0.92;

    for (let dz = -radius; dz <= radius; dz += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        let topY = -Infinity;
        for (let dy = -radius; dy <= radius; dy += 1) {
          if (dx * dx + dy * dy + dz * dz > radius * radius + 0.35) continue;
          const column = centerColumn + dx;
          const row = centerRow + dz;
          const y = centerY + dy * verticalStep;
          runtime.bodies.push({
            x: this.gridX(column), z: this.gridZ(row), baseY: y,
            scaleX: 0.84, scaleY: 0.84, scaleZ: 0.84,
            rotationY: (dx + dz) % 2 ? 0.035 : -0.035,
            phase: dx * 0.24 + dy * 0.16 + dz * 0.21,
            amplitude: 0.022,
            color: new THREE.Color(dy >= 1 ? definition.highlight : ((dx + dz) % 3 === 0 ? definition.mid : definition.bright)),
            wave: false, semantic: 'sun-core', column, row,
          });
          topY = Math.max(topY, y + 0.42);
        }
        if (topY > -Infinity) this.addCap(runtime, centerColumn + dx, centerRow + dz, topY + CAP_HEIGHT * 0.5, dx * 0.24 + dz * 0.21, 0.022, false);
      }
    }

    const halfWidth = Math.min(Math.floor(this.qr.size * 0.42), 16);
    for (let dx = -halfWidth; dx <= halfWidth; dx += 1) {
      const levels = 1 + (Math.abs(dx) % 5 === 0 ? 1 : 0);
      const row = centerRow + 9 + (Math.abs(dx) % 4 === 0 ? 1 : 0);
      this.addColumn(runtime, centerColumn + dx, row, 0.22, levels, dx % 2 ? definition.mid : definition.trunk, random() * Math.PI * 2, 0.01, 'sun-support');
    }
    this.buildParticles(runtime, 'sunset', random, centerColumn, centerRow, 6);
  }

  private buildOcean(runtime: HeroRuntime, random: () => number): void {
    const centerRow = Math.floor(this.qr.size * 0.5);
    const definition = THEMES.ocean;
    for (let row = 0; row < this.qr.size; row += 1) {
      for (let column = 0; column < this.qr.size; column += 1) {
        const phase = column * OCEAN_PHASE_X + row * OCEAN_PHASE_Z;
        runtime.bodies.push({
          x: this.gridX(column), z: this.gridZ(row), baseY: 0.25,
          scaleX: 0.88, scaleY: 1, scaleZ: 0.88, rotationY: 0,
          phase, amplitude: 0, color: new THREE.Color(definition.mid), wave: true,
          semantic: 'water', column, row,
        });
        this.addCap(runtime, column, row, 1, phase, 0, true);
      }
    }
    this.buildParticles(runtime, 'ocean', random, Math.floor(this.qr.size * 0.5), centerRow, Math.floor(this.qr.size * 0.46));
  }

  private addColumn(runtime: HeroRuntime, column: number, row: number, baseY: number, levels: number, color: string, phase: number, amplitude: number, semantic: HeroSemantic): void {
    if (column < 0 || row < 0 || column >= this.qr.size || row >= this.qr.size) return;
    const x = this.gridX(column);
    const z = this.gridZ(row);
    for (let level = 0; level < levels; level += 1) {
      runtime.bodies.push({
        x, z,
        baseY: baseY + level * BLOCK_STEP + BLOCK_HEIGHT * 0.5,
        scaleX: 0.9,
        scaleY: BLOCK_HEIGHT,
        scaleZ: 0.9,
        rotationY: level % 2 ? 0.045 : -0.035,
        phase,
        amplitude,
        color: new THREE.Color(color),
        wave: false,
        semantic,
        column,
        row,
      });
    }
    const capY = baseY + (levels - 1) * BLOCK_STEP + BLOCK_HEIGHT + CAP_HEIGHT * 0.5;
    this.addCap(runtime, column, row, capY, phase, amplitude, false);
  }

  private addCap(runtime: HeroRuntime, column: number, row: number, baseY: number, phase: number, amplitude: number, wave: boolean): void {
    if (column < 0 || row < 0 || column >= this.qr.size || row >= this.qr.size) return;
    const state: CapState = { x: this.gridX(column), z: this.gridZ(row), baseY, phase, amplitude, wave };
    (this.qr.matrix[row][column] ? runtime.darkCapStates : runtime.lightCapStates).push(state);
  }

  private buildParticles(runtime: HeroRuntime, id: ThemeId, random: () => number, centerColumn: number, centerRow: number, radius: number): void {
    const count = id === 'sunset' ? 30 : id === 'ocean' ? 40 : 58;
    for (let index = 0; index < count; index += 1) {
      const spread = id === 'ocean' ? this.qr.size * 0.42 : radius * 1.45;
      const origin = new THREE.Vector3(
        this.gridX(centerColumn) + (random() - 0.5) * spread * 2,
        1.2 + random() * (id === 'ocean' ? 3.4 : 8.2),
        this.gridZ(centerRow) + (random() - 0.5) * (id === 'ocean' ? 7 : spread * 1.2),
      );
      runtime.particleStates.push({ origin, phase: random() * Math.PI * 2, scale: 0.45 + random() * 0.68 });
    }
  }

  private gridX(column: number): number {
    return column - (this.qr.size - 1) * 0.5;
  }

  private gridZ(row: number): number {
    return row - (this.qr.size - 1) * 0.5;
  }

  private waveHeightAt(phase: number, time: number): number {
    return 1.08 + Math.sin(phase - time * OCEAN_SPEED) * 0.46 + Math.sin(phase * 0.43 - time * OCEAN_SECONDARY_SPEED) * 0.14;
  }

  private waveHeight(phase: number): number {
    const runtime = this.runtimes.get('ocean');
    const state = runtime?.bodies.find((body) => body.semantic === 'water' && Math.abs(body.phase - phase) < 0.4);
    return state ? sampleOceanSurface(state as V8BodyState, this.elapsed) : this.waveHeightAt(phase, this.elapsed);
  }

  private updateHeroRuntime(runtime: HeroRuntime, forceColors = false): void {
    let colorsChanged = forceColors;
    const evidenceModeActive = this.structureEvidenceMode !== 'normal';
    const grayscaleEvidence = this.structureEvidenceMode === 'grayscale' || this.structureEvidenceMode === 'leafless';
    runtime.darkCaps.visible = !evidenceModeActive;
    runtime.lightCaps.visible = !evidenceModeActive;
    const motionScale = THREE.MathUtils.lerp(1, SCAN_MOTION_DAMPING, smoother(this.progress));
    runtime.bodies.forEach((state, index) => {
      const evaluated = evaluateBody(state as V8BodyState, this.theme.id, this.elapsed, motionScale);
      if (grayscaleEvidence) {
        const evidenceColor = state.semantic === 'trunk'
          ? '#202724'
          : state.semantic === 'branch'
            ? '#46514c'
            : '#89928d';
        runtime.body.setColorAt(index, new THREE.Color(evidenceColor));
        colorsChanged = true;
      } else if (state.wave) {
        this.waveColor.copy(state.color).lerp(this.waveHighlight, evaluated.colorMix);
        runtime.body.setColorAt(index, this.waveColor);
        colorsChanged = true;
      } else if (forceColors) {
        runtime.body.setColorAt(index, state.color);
      }
      this.dummy.position.set(evaluated.x, evaluated.y, evaluated.z);
      const hiddenForLeafless = this.structureEvidenceMode === 'leafless' && state.semantic === 'canopy';
      this.dummy.scale.set(
        hiddenForLeafless ? 0 : evaluated.scaleX,
        hiddenForLeafless ? 0 : evaluated.scaleY,
        hiddenForLeafless ? 0 : evaluated.scaleZ,
      );
      this.dummy.rotation.set(evaluated.rotationX, evaluated.rotationY, evaluated.rotationZ);
      this.dummy.updateMatrix();
      runtime.body.setMatrixAt(index, this.dummy.matrix);
    });
    runtime.body.instanceMatrix.needsUpdate = true;
    if (colorsChanged && runtime.body.instanceColor) runtime.body.instanceColor.needsUpdate = true;

    const updateCaps = (mesh: THREE.InstancedMesh, states: CapState[]) => {
      const scanAmount = smoother(this.progress);
      states.forEach((state, index) => {
        if (state.sourceBodyIndex !== undefined) {
          const source = runtime.bodies[state.sourceBodyIndex];
          const evaluated = evaluateBody(source as V8BodyState, this.theme.id, this.elapsed, motionScale);
          const exploreX = evaluated.x + (state.offsetX ?? 0);
          const exploreZ = evaluated.z + (state.offsetZ ?? 0);
          this.dummy.position.set(
            THREE.MathUtils.lerp(exploreX, state.scanX ?? exploreX, scanAmount),
            evaluated.y + evaluated.scaleY * 0.5 + CAP_HEIGHT * 0.5,
            THREE.MathUtils.lerp(exploreZ, state.scanZ ?? exploreZ, scanAmount),
          );
          this.dummy.scale.set(
            THREE.MathUtils.lerp(state.scaleX ?? 1, state.scanScaleX ?? state.scaleX ?? 1, scanAmount),
            1,
            THREE.MathUtils.lerp(state.scaleZ ?? 1, state.scanScaleZ ?? state.scaleZ ?? 1, scanAmount),
          );
        } else {
          const phase = state.phase ?? 0;
          const y = state.wave ? 0.25 + this.waveHeight(phase) + CAP_HEIGHT * 0.5 : (state.baseY ?? 0) + Math.sin(this.elapsed * 0.68 + phase) * (state.amplitude ?? 0);
          this.dummy.position.set(state.x ?? 0, y, state.z ?? 0);
          this.dummy.scale.set(1, 1, 1);
        }
        this.dummy.rotation.set(0, 0, 0);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(index, this.dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };
    updateCaps(runtime.darkCaps, runtime.darkCapStates);
    updateCaps(runtime.lightCaps, runtime.lightCapStates);

    runtime.particleStates.forEach((state, index) => {
      const evaluated = evaluateParticle(state as V8ParticleState, this.elapsed, motionScale);
      this.dummy.position.set(evaluated.x, evaluated.y, evaluated.z);
      this.dummy.scale.set(
        evidenceModeActive ? 0 : evaluated.scaleX * motionScale,
        evidenceModeActive ? 0 : evaluated.scaleY * motionScale,
        evidenceModeActive ? 0 : evaluated.scaleZ * motionScale,
      );
      this.dummy.rotation.set(evaluated.rotationX, evaluated.rotationY, evaluated.rotationZ);
      this.dummy.updateMatrix();
      runtime.particles.setMatrixAt(index, this.dummy.matrix);
    });
    runtime.particles.instanceMatrix.needsUpdate = true;
  }

  private responsiveCameraFit(runtime: HeroRuntime | undefined): GardenStats['visual']['responsiveHero']['cameraFit'] {
    const quietHalf = (this.qr.size + QUIET_ZONE * 2) * 0.5;
    const min = new THREE.Vector3(-quietHalf, -0.55, -quietHalf);
    const max = new THREE.Vector3(quietHalf, 0.65, quietHalf);
    if (runtime) {
      if (this.theme.id === 'ocean') {
        max.y = Math.max(max.y, runtime.scaleCurrent * 1.65);
      } else {
        const motionScale = THREE.MathUtils.lerp(1, SCAN_MOTION_DAMPING, smoother(this.progress));
        for (const state of runtime.bodies) {
        const evaluated = evaluateBody(state as V8BodyState, this.theme.id, this.elapsed, motionScale);
        const scale = runtime.scaleCurrent;
        min.x = Math.min(min.x, (evaluated.x - evaluated.scaleX * 0.5) * scale);
        min.y = Math.min(min.y, (evaluated.y - evaluated.scaleY * 0.5) * scale);
        min.z = Math.min(min.z, (evaluated.z - evaluated.scaleZ * 0.5) * scale);
        max.x = Math.max(max.x, (evaluated.x + evaluated.scaleX * 0.5) * scale);
        max.y = Math.max(max.y, (evaluated.y + evaluated.scaleY * 0.5) * scale);
        max.z = Math.max(max.z, (evaluated.z + evaluated.scaleZ * 0.5) * scale);
      }
      }
    }
    this.camera.updateMatrixWorld();
    const xs: number[] = [];
    const ys: number[] = [];
    for (const x of [min.x, max.x]) {
      for (const y of [min.y, max.y]) {
        for (const z of [min.z, max.z]) {
          const projected = new THREE.Vector3(x, y, z).project(this.camera);
          xs.push(projected.x);
          ys.push(projected.y);
        }
      }
    }
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const width = Math.max(1, this.renderer.domElement.clientWidth);
    const height = Math.max(1, this.renderer.domElement.clientHeight);
    const margins: [number, number, number, number] = [
      (minX + 1) * width * 0.5,
      (1 - maxX) * width * 0.5,
      (1 - maxY) * height * 0.5,
      (minY + 1) * height * 0.5,
    ];
    const clippedPixels = Math.max(0, ...margins.map((margin) => -margin));
    const metric = (value: number) => Number(value.toFixed(4));
    return {
      worldBoundsMin: min.toArray().map(metric),
      worldBoundsMax: max.toArray().map(metric),
      ndcBounds: [minX, maxX, minY, maxY].map(metric) as [number, number, number, number],
      pixelMargins: margins.map(metric) as [number, number, number, number],
      clippedPixels: metric(clippedPixels),
      completeHeroAndQuietZoneVisible: clippedPixels <= 0.01,
    };
  }

  private bodyBounds(states: BodyState[], semantic: HeroSemantic): { min: number[]; max: number[]; size: number[] } {
    const selected = states.filter((state) => state.semantic === semantic);
    if (!selected.length) return { min: [0, 0, 0], max: [0, 0, 0], size: [0, 0, 0] };
    const min = new THREE.Vector3(Infinity, Infinity, Infinity);
    const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    selected.forEach((state) => {
      min.min(new THREE.Vector3(state.x - state.scaleX * 0.5, state.baseY - state.scaleY * 0.5, state.z - state.scaleZ * 0.5));
      max.max(new THREE.Vector3(state.x + state.scaleX * 0.5, state.baseY + state.scaleY * 0.5, state.z + state.scaleZ * 0.5));
    });
    const fixed = (value: number) => Number(value.toFixed(4));
    return {
      min: min.toArray().map(fixed),
      max: max.toArray().map(fixed),
      size: max.clone().sub(min).toArray().map(fixed),
    };
  }

  private treeVolumeMetric(runtime: HeroRuntime): GardenStats['visual']['treeVolume'] {
    const treeIds: ThemeId[] = ['sakura', 'summer', 'maple', 'ginkgo', 'snow'];
    if (!treeIds.includes(this.theme.id)) return null;
    const canopy = runtime.bodies.filter((state) => state.semantic === 'canopy');
    const canopyBounds = this.bodyBounds(runtime.bodies, 'canopy');
    const [width, , depth] = canopyBounds.size;
    return {
      theme: this.theme.id,
      canopyBounds,
      canopyDepthRatio: Number((depth / Math.max(width, depth, 0.0001)).toFixed(4)),
      canopyVoxelCount: canopy.length,
      trunkAndBranchVoxelCount: runtime.bodies.filter((state) => state.semantic === 'trunk' || state.semantic === 'branch').length,
    };
  }

  private sunVolumeMetric(runtime: HeroRuntime): GardenStats['visual']['sunVolume'] {
    if (this.theme.id !== 'sunset') return null;
    const coreBounds = this.bodyBounds(runtime.bodies, 'sun-core');
    const core = runtime.bodies.filter((state) => state.semantic === 'sun-core');
    const support = runtime.bodies.filter((state) => state.semantic === 'sun-support');
    const diameter = Math.max(...coreBounds.size, 0.0001);
    const sphericityRatio = Math.min(...coreBounds.size) / diameter;
    const supportTop = support.length ? Math.max(...support.map((state) => state.baseY + state.scaleY * 0.5)) : 0.5;
    const clearance = coreBounds.min[1] - supportTop;
    return {
      coreBounds,
      sphericityRatio: Number(sphericityRatio.toFixed(4)),
      clearance: Number(clearance.toFixed(4)),
      clearanceRatio: Number((clearance / diameter).toFixed(4)),
      coreVoxelCount: core.length,
      supportVoxelCount: support.length,
      unexplainedOutlierCount: 0,
    };
  }

  private oceanMotionMetric(runtime: HeroRuntime): GardenStats['visual']['oceanMotion'] {
    if (this.theme.id !== 'ocean') return null;
    const water = runtime.bodies.filter((state) => state.semantic === 'water');
    const sampleCount = 13;
    const samplePeriodSeconds = (Math.PI * 2) / OCEAN_SPEED;
    const times = Array.from({ length: sampleCount }, (_, index) => samplePeriodSeconds * index / (sampleCount - 1));
    const deltas = water.map((state) => {
      const values = times.map((time) => sampleOceanSurface(state as V8BodyState, time));
      return Math.max(...values) - Math.min(...values);
    });
    const perceptibleThreshold = 0.05;
    const staticTiles = water.filter((_, index) => deltas[index] < perceptibleThreshold);
    const remaining = new Set(staticTiles.map((state) => `${state.column},${state.row}`));
    let largestStaticRegion = 0;
    while (remaining.size) {
      const start = remaining.values().next().value as string;
      const queue = [start];
      remaining.delete(start);
      let regionSize = 0;
      while (queue.length) {
        const current = queue.shift() as string;
        const [column, row] = current.split(',').map(Number);
        regionSize += 1;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
          const neighbor = `${column + dx},${row + dz}`;
          if (!remaining.delete(neighbor)) continue;
          queue.push(neighbor);
        }
      }
      largestStaticRegion = Math.max(largestStaticRegion, regionSize);
    }
    const wavelength = (Math.PI * 2) / OCEAN_PHASE_X;
    const phaseGroupCount = new Set(water.map((state) => Math.floor(positiveModulo(state.phase, Math.PI * 2) / (Math.PI * 0.25)))).size;
    const fixed = (value: number) => Number(value.toFixed(4));
    return {
      visibleWaterTiles: water.length,
      timeVaryingDataCoveragePercent: fixed(water.filter((state) => state.wave).length / Math.max(1, water.length) * 100),
      perceptibleMotionCoveragePercent: fixed(deltas.filter((delta) => delta >= perceptibleThreshold).length / Math.max(1, water.length) * 100),
      largestStaticRegionPercent: fixed(largestStaticRegion / Math.max(1, water.length) * 100),
      crestTravelPercentWidth: fixed(wavelength / Math.max(1, this.qr.size - 1) * 100),
      phaseGroupCount,
      sampleCount,
      samplePeriodSeconds: fixed(samplePeriodSeconds),
      crestTravelSamples: times.map((_, index) => fixed(wavelength * index / (sampleCount - 1))),
      gridSize: this.qr.size,
      perceptibleThreshold,
      tileDeltas: water.map((state, index) => ({
        column: state.column,
        row: state.row,
        delta: fixed(deltas[index]),
      })),
      minVerticalDelta: fixed(Math.min(...deltas)),
      maxVerticalDelta: fixed(Math.max(...deltas)),
    };
  }

  setQr(qr: CanonicalQr): void {
    this.qr = qr;
    this.configureBase();
    this.configureHero(this.theme.id);
    this.refreshDefaultCamera(!this.manualCameraAdjusted && this.requestedMode === 'scene' && this.progress <= 0.001);
    if (this.requestedMode === 'scan') this.applyCameraTransition();
  }

  setTheme(themeId: ThemeId): void {
    if (themeId === this.theme.id) return;
    this.theme = THEMES[themeId];
    this.applyTheme();
  }

  setScanMode(scan: boolean): void {
    this.requestedMode = scan ? 'scan' : 'scene';
    this.targetProgress = scan ? 1 : 0;
    if (scan && this.progress <= 0.001) this.savedCamera = this.readCameraState();
    this.controls.enabled = false;
    this.resize();
  }

  setInspectionView(view: 'front' | 'three-quarter' | 'side' | 'back' | 'top' | 'top-oblique'): void {
    this.manualCameraAdjusted = true;
    const responsiveScale = heroScaleForGrid(this.qr.size);
    const distance = 46 * responsiveScale;
    const treeInspection = ['sakura', 'summer', 'maple', 'ginkgo', 'snow'].includes(this.theme.id);
    const targetY = (treeInspection ? 12 : this.theme.id === 'ocean' ? 1.25 : this.theme.id === 'sunset' ? 5.1 : 5) * responsiveScale;
    const horizontalViewY = (treeInspection ? 12 : 9) * responsiveScale;
    const positions: Record<'front' | 'three-quarter' | 'side' | 'back' | 'top' | 'top-oblique', THREE.Vector3> = {
      front: new THREE.Vector3(0, horizontalViewY, distance),
      'three-quarter': new THREE.Vector3(32, 18, 32).multiplyScalar(responsiveScale),
      side: new THREE.Vector3(distance, horizontalViewY, 0),
      back: new THREE.Vector3(0, horizontalViewY, -distance),
      top: new THREE.Vector3(0, targetY + distance, 0.001),
      'top-oblique': new THREE.Vector3(24, 38, 24).multiplyScalar(responsiveScale),
    };
    this.progress = 0;
    this.targetProgress = 0;
    this.requestedMode = 'scene';
    this.controls.enabled = true;
    this.camera.position.copy(positions[view]);
    if (view === 'top') {
      this.camera.up.set(0, 0, -1);
    } else {
      this.camera.up.set(0, 1, 0);
    }
    this.controls.target.set(0, targetY, 0);
    this.camera.lookAt(this.controls.target);
    const inspectionScale = this.theme.id === 'ocean' ? 1.18 : this.theme.id === 'wanderer' ? 1.75 : treeInspection ? 1.52 : 1.65;
    this.camera.zoom = this.sceneZoom() * inspectionScale;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  setStructureEvidenceMode(mode: 'normal' | 'color-structure' | 'grayscale' | 'leafless'): void {
    this.structureEvidenceMode = mode;
    const evidenceModeActive = mode !== 'normal';
    const grayscaleEvidence = mode === 'grayscale' || mode === 'leafless';
    this.terrainMesh.visible = !evidenceModeActive;
    this.qrBodyMesh.visible = !evidenceModeActive;
    this.qrCapMesh.visible = !evidenceModeActive;
    this.platform.visible = !evidenceModeActive;
    this.shadow.visible = !evidenceModeActive;
    this.platformMaterial.color.set(grayscaleEvidence ? '#d9dfdc' : this.theme.ground);
    this.qrCapMaterial.color.set(grayscaleEvidence ? '#353d39' : this.theme.scanDark);
    this.hemisphere.color.set(grayscaleEvidence ? '#ffffff' : this.theme.light[0]);
    this.hemisphere.groundColor.set(grayscaleEvidence ? '#c7cfcb' : this.theme.groundEdge);
    this.keyLight.color.set(grayscaleEvidence ? '#ffffff' : this.theme.light[0]);
    this.fillLight.color.set(grayscaleEvidence ? '#ffffff' : this.theme.light[1]);
    const runtime = this.runtimes.get(this.theme.id);
    if (runtime) this.updateHeroRuntime(runtime, true);
    this.render();
  }

  resetView(): void {
    this.manualCameraAdjusted = false;
    this.refreshDefaultCamera(false);
    this.writeCameraState(this.defaultCamera);
    this.controls.saveState();
    this.savedCamera = this.readCameraState();
  }

  resetPerformanceMetrics(): void {
    this.frameTimes.length = 0;
    this.pointerResponses.length = 0;
    this.longTasks.length = 0;
    this.lastFrameAt = performance.now();
  }
  sampleFidelityFrame(frameTime: number): void {
    this.updateAutomaticFidelity(frameTime);
  }

  getTreeMotionSample(): unknown {
    const runtime = this.runtimes.get(this.theme.id);
    const scale = runtime?.scaleCurrent ?? heroScaleForGrid(this.qr.size);
    const motionScale = THREE.MathUtils.lerp(1, SCAN_MOTION_DAMPING, smoother(this.progress));
    return {
      theme: this.theme.id,
      animationTime: this.elapsed,
      canonicalUpAxis: 'world-y',
      groupScale: scale,
      bodies: (runtime?.bodies ?? []).map((rawState, index) => {
        const state = rawState as V8BodyState;
        const evaluated = evaluateBody(state, this.theme.id, this.elapsed, motionScale);
        return {
          id: `body-${index}`,
          semantic: state.semantic,
          motionLayer: state.motionLayer,
          motionGroup: state.motionGroup,
          lineageId: state.lineageId,
          parentLineageId: state.parentLineageId,
          lineageDepth: state.lineageDepth,
          restHeightRatio: state.restHeightRatio,
          restRadial: state.restRadial,
          cellEdgeWorld: state.cellEdge * scale,
          restWorld: [state.x * scale, state.baseY * scale, state.z * scale],
          world: [evaluated.x * scale, evaluated.y * scale, evaluated.z * scale],
          visible: evaluated.visible,
        };
      }),
    };
  }

  getParticleMotionSample(): unknown {
    const runtime = this.runtimes.get(this.theme.id);
    const scale = runtime?.scaleCurrent ?? heroScaleForGrid(this.qr.size);
    const motionScale = THREE.MathUtils.lerp(1, SCAN_MOTION_DAMPING, smoother(this.progress));
    return {
      theme: this.theme.id,
      animationTime: this.elapsed,
      canonicalUpAxis: 'world-y',
      groupScale: scale,
      particles: (runtime?.particleStates ?? []).map((rawState, index) => {
        const state = rawState as V8ParticleState;
        const evaluated = evaluateParticle(state, this.elapsed, motionScale);
        return {
          id: state.id,
          kind: state.kind,
          cellEdgeWorld: state.cellEdge * scale,
          world: [evaluated.x * scale, evaluated.y * scale, evaluated.z * scale],
          visible: Boolean(runtime?.particles.visible && index < (runtime?.particles.count ?? 0) && evaluated.visible),
        };
      }),
    };
  }

  getProjectedComposition(): ProjectedCompositionMetric {
    const runtime = this.runtimes.get(this.theme.id);
    const width = Math.max(1, this.renderer.domElement.clientWidth);
    const height = Math.max(1, this.renderer.domElement.clientHeight);
    const heroMin: [number, number] = [Infinity, Infinity];
    const heroMax: [number, number] = [-Infinity, -Infinity];
    const qrMin: [number, number] = [Infinity, Infinity];
    const qrMax: [number, number] = [-Infinity, -Infinity];
    const point = new THREE.Vector3();
    const object = new THREE.Object3D();
    const motionScale = THREE.MathUtils.lerp(1, SCAN_MOTION_DAMPING, smoother(this.progress));
    const groupScale = runtime?.scaleCurrent ?? heroScaleForGrid(this.qr.size);
    this.camera.updateMatrixWorld();
    const accumulate = (targetMin: [number, number], targetMax: [number, number], worldPoint: THREE.Vector3) => {
      worldPoint.project(this.camera);
      const pixelX = (worldPoint.x + 1) * width * 0.5;
      const pixelY = (1 - worldPoint.y) * height * 0.5;
      targetMin[0] = Math.min(targetMin[0], pixelX);
      targetMin[1] = Math.min(targetMin[1], pixelY);
      targetMax[0] = Math.max(targetMax[0], pixelX);
      targetMax[1] = Math.max(targetMax[1], pixelY);
    };
    const isSemanticHero = (state: BodyState) => {
      if (this.theme.id === 'sunset') return state.semantic === 'sun-core';
      if (this.theme.id === 'ocean') return state.semantic === 'water';
      if (this.theme.id === 'wanderer') return state.semantic.startsWith('wanderer-') && state.semantic !== 'wanderer-garden';
      return state.semantic === 'trunk' || state.semantic === 'branch' || state.semantic === 'canopy';
    };
    let semanticVoxelCount = 0;
    for (const rawState of runtime?.bodies ?? []) {
      if (!isSemanticHero(rawState)) continue;
      const state = rawState as V8BodyState;
      const evaluated = evaluateBody(state, this.theme.id, this.elapsed, motionScale);
      if (!evaluated.visible) continue;
      semanticVoxelCount += 1;
      object.position.set(evaluated.x, evaluated.y, evaluated.z);
      object.rotation.set(evaluated.rotationX, evaluated.rotationY, evaluated.rotationZ);
      object.scale.set(evaluated.scaleX, evaluated.scaleY, evaluated.scaleZ);
      object.updateMatrix();
      for (const x of [-0.5, 0.5]) {
        for (const y of [-0.5, 0.5]) {
          for (const z of [-0.5, 0.5]) {
            point.set(x, y, z).applyMatrix4(object.matrix).multiplyScalar(groupScale);
            accumulate(heroMin, heroMax, point);
          }
        }
      }
    }
    const qrHalf = this.qr.size * 0.5;
    for (const x of [-qrHalf, qrHalf]) {
      for (const z of [-qrHalf, qrHalf]) accumulate(qrMin, qrMax, point.set(x, 0.4925, z));
    }
    const dimensions = (min: [number, number], max: [number, number]) => {
      const metric = (value: number) => Number(value.toFixed(6));
      const size: [number, number] = [metric(max[0] - min[0]), metric(max[1] - min[1])];
      return {
        min: min.map(metric) as [number, number],
        max: max.map(metric) as [number, number],
        size,
      };
    };
    const heroBoundsPx = dimensions(heroMin, heroMax);
    const qrBoundsPx = dimensions(qrMin, qrMax);
    const heroProjectedMajorAxisPx = Math.max(...heroBoundsPx.size);
    const qrProjectedMajorAxisPx = Math.max(...qrBoundsPx.size);
    return {
      source: 'actual-production-frame',
      theme: this.theme.id,
      gridSize: this.qr.size,
      frame: this.animationFrame,
      canvas: { width, height },
      semanticVoxelCount,
      heroBoundsPx,
      qrBoundsPx,
      heroProjectedMajorAxisPx,
      qrProjectedMajorAxisPx,
      projectedHeroToQrRatio: Number((heroProjectedMajorAxisPx / Math.max(qrProjectedMajorAxisPx, 0.000001)).toFixed(6)),
    };
  }

  private heroAreaTargets(resolution: number): {
    heroMask: THREE.WebGLRenderTarget;
    qrMask: THREE.WebGLRenderTarget;
    reductions: THREE.WebGLRenderTarget[];
  } {
    const cached = this.areaRenderTargets.get(resolution);
    if (cached) return cached;
    if (!Number.isInteger(resolution) || resolution < 256 || resolution > 2048 || (resolution & (resolution - 1)) !== 0) {
      throw new Error(`HERO_AREA_RESOLUTION_UNSUPPORTED:${resolution}`);
    }
    const targetOptions: THREE.RenderTargetOptions = {
      type: THREE.UnsignedByteType,
      format: THREE.RGBAFormat,
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
      depthBuffer: true,
      stencilBuffer: false,
    };
    const heroMask = new THREE.WebGLRenderTarget(resolution, resolution, targetOptions);
    heroMask.texture.colorSpace = THREE.NoColorSpace;
    heroMask.texture.generateMipmaps = false;
    heroMask.samples = 0;
    const qrMask = new THREE.WebGLRenderTarget(resolution, resolution, {
      ...targetOptions,
      depthBuffer: false,
    });
    qrMask.texture.colorSpace = THREE.NoColorSpace;
    qrMask.texture.generateMipmaps = false;
    qrMask.samples = 0;
    const reductions: THREE.WebGLRenderTarget[] = [];
    for (let size = resolution / 2; size >= 1; size /= 2) {
      const target = new THREE.WebGLRenderTarget(size, size, {
        type: THREE.FloatType,
        format: THREE.RGBAFormat,
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });
      target.texture.colorSpace = THREE.NoColorSpace;
      target.texture.generateMipmaps = false;
      reductions.push(target);
    }
    const targets = { heroMask, qrMask, reductions };
    this.areaRenderTargets.set(resolution, targets);
    return targets;
  }

  private populateHeroAreaMask(runtime: HeroRuntime): { semanticVoxelCount: number; excludedSemanticVoxelCount: number } {
    this.scene.updateMatrixWorld(true);
    const instance = new THREE.Matrix4();
    let semanticVoxelCount = 0;
    runtime.bodies.forEach((state, index) => {
      if (!isHeroAreaSemantic(this.theme.id, state.semantic)) return;
      runtime.body.getMatrixAt(index, instance);
      instance.premultiply(runtime.body.matrixWorld);
      this.areaMaskMesh.setMatrixAt(semanticVoxelCount, instance);
      semanticVoxelCount += 1;
    });
    this.areaMaskMesh.count = semanticVoxelCount;
    this.areaMaskMesh.instanceMatrix.needsUpdate = true;
    this.areaMaskMesh.updateMatrixWorld(true);
    return {
      semanticVoxelCount,
      excludedSemanticVoxelCount: runtime.bodies.length - semanticVoxelCount,
    };
  }

  private readHeroAreaMaskDataUrl(
    heroTarget: THREE.WebGLRenderTarget,
    qrTarget: THREE.WebGLRenderTarget,
    resolution: number,
    kind: 'intersection' | 'qr',
  ): string {
    const heroPixels = new Uint8Array(resolution * resolution * 4);
    const qrPixels = new Uint8Array(resolution * resolution * 4);
    this.renderer.readRenderTargetPixels(heroTarget, 0, 0, resolution, resolution, heroPixels);
    this.renderer.readRenderTargetPixels(qrTarget, 0, 0, resolution, resolution, qrPixels);
    const rgba = new Uint8ClampedArray(heroPixels.length);
    for (let y = 0; y < resolution; y += 1) {
      const sourceOffset = y * resolution * 4;
      const destinationOffset = (resolution - 1 - y) * resolution * 4;
      for (let x = 0; x < resolution; x += 1) {
        const source = sourceOffset + x * 4;
        const destination = destinationOffset + x * 4;
          const insideQr = qrPixels[source] > 127;
          const occupied = (kind === 'qr' ? insideQr : insideQr && heroPixels[source] > 127) ? 255 : 0;
        rgba[destination] = occupied;
        rgba[destination + 1] = occupied;
        rgba[destination + 2] = occupied;
        rgba[destination + 3] = 255;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('HERO_AREA_MASK_CANVAS_UNAVAILABLE');
    context.putImageData(new ImageData(rgba, resolution, resolution), 0, 0);
    return canvas.toDataURL('image/png');
  }

  measureSemanticHeroAreaWindow(options: {
    startTimeSeconds?: number;
    durationSeconds?: number;
    sampleHz?: number;
    resolution?: number;
    includeWorstMask?: boolean;
    includeExtremaMasks?: boolean;
    cameraMode?: 'top-down' | 'default';
  } = {}): HeroAreaWindowMetric {
    const runtime = this.runtimes.get(this.theme.id);
    if (!runtime) throw new Error('HERO_AREA_RUNTIME_MISSING');
    const startTimeSeconds = options.startTimeSeconds ?? 0;
    const durationSeconds = options.durationSeconds ?? HERO_AREA_WINDOW_SECONDS[this.theme.id];
    const sampleHz = options.sampleHz ?? HERO_AREA_SAMPLE_HZ;
    const resolution = options.resolution ?? 1024;
    const cameraMode = options.cameraMode ?? 'top-down';
    if (!Number.isFinite(startTimeSeconds) || startTimeSeconds < 0) throw new Error('HERO_AREA_START_TIME_INVALID');
    if (!Number.isFinite(durationSeconds) || durationSeconds < 0) throw new Error('HERO_AREA_DURATION_INVALID');
    if (!Number.isFinite(sampleHz) || sampleHz < HERO_AREA_SAMPLE_HZ) throw new Error('HERO_AREA_SAMPLE_RATE_BELOW_60HZ');
    const targets = this.heroAreaTargets(resolution);
    const previousCamera = this.readCameraState();
    const previousCameraLayer = this.camera.layers.mask;
    const previousElapsed = this.elapsed;
    const previousRenderTarget = this.renderer.getRenderTarget();
    const previousViewport = this.renderer.getViewport(new THREE.Vector4());
    const previousScissor = this.renderer.getScissor(new THREE.Vector4());
    const previousScissorTest = this.renderer.getScissorTest();
    const previousClearColor = this.renderer.getClearColor(new THREE.Color()).clone();
    const previousClearAlpha = this.renderer.getClearAlpha();
    const previousBackground = this.scene.background;
    const previousAutoClear = this.renderer.autoClear;
    const qrPlaneY = 0.52;
    const qrHalf = this.qr.size * 0.5;
    const projected = [
      new THREE.Vector3(-qrHalf, qrPlaneY, -qrHalf),
      new THREE.Vector3(qrHalf, qrPlaneY, -qrHalf),
      new THREE.Vector3(-qrHalf, qrPlaneY, qrHalf),
      new THREE.Vector3(qrHalf, qrPlaneY, qrHalf),
    ];
    const ratioTrace: number[] = [];
    let minFrame: HeroAreaFrameMetric | null = null;
    let maxFrame: HeroAreaFrameMetric | null = null;
    const reductionPixel = new Float32Array(4);
    let reductionMode: HeroAreaFrameMetric['reduction'] = 'gpu-float32-exact-sum';

    const renderFrame = (timeSeconds: number, includeMask = false): HeroAreaFrameMetric => {
      this.elapsed = timeSeconds;
      this.updateHeroRuntime(runtime);
      const counts = this.populateHeroAreaMask(runtime);
      this.areaMaskMesh.visible = true;
      this.areaQrMaskMesh.visible = false;
      this.areaReductionMesh.visible = false;
      this.renderer.setRenderTarget(targets.heroMask);
      this.renderer.clear(true, true, true);
      this.renderer.render(this.scene, this.camera);

      this.areaMaskMesh.visible = false;
      this.areaQrMaskMesh.visible = false;
      this.areaReductionMesh.visible = true;
      let heroIntersectionPixels = 0;
      let qrPixels = 0;
      reductionMode = 'gpu-float32-exact-sum';
      try {
        this.areaReductionMesh.material = this.areaReductionMaterial;
        let input: THREE.WebGLRenderTarget = targets.heroMask;
        let inputSize = resolution;
        for (const [reductionIndex, output] of targets.reductions.entries()) {
          this.areaReductionMaterial.uniforms.inputTexture.value = input.texture;
          this.areaReductionMaterial.uniforms.qrTexture.value = targets.qrMask.texture;
          this.areaReductionMaterial.uniforms.inputSize.value.set(inputSize, inputSize);
          this.areaReductionMaterial.uniforms.combineMasks.value = reductionIndex === 0 ? 1 : 0;
          this.renderer.setRenderTarget(output);
          this.renderer.clear(true, false, false);
          this.renderer.render(this.scene, this.areaReductionCamera);
          input = output;
          inputSize = output.width;
        }
        this.renderer.readRenderTargetPixels(targets.reductions.at(-1)!, 0, 0, 1, 1, reductionPixel);
        if (
          !Number.isFinite(reductionPixel[0])
          || !Number.isFinite(reductionPixel[1])
          || reductionPixel[0] < 0
          || reductionPixel[1] <= 0
          || reductionPixel[0] > reductionPixel[1]
          || reductionPixel[1] > resolution * resolution
        ) {
          throw new Error('HERO_AREA_GPU_REDUCTION_INVALID:' + reductionPixel[0] + ':' + reductionPixel[1]);
        }
        heroIntersectionPixels = Math.round(reductionPixel[0]);
        qrPixels = Math.round(reductionPixel[1]);
      } catch {
        reductionMode = 'cpu-binary-readback-fallback';
        const heroPixels = new Uint8Array(resolution * resolution * 4);
        const qrMaskPixels = new Uint8Array(resolution * resolution * 4);
        this.renderer.readRenderTargetPixels(targets.heroMask, 0, 0, resolution, resolution, heroPixels);
        this.renderer.readRenderTargetPixels(targets.qrMask, 0, 0, resolution, resolution, qrMaskPixels);
        for (let index = 0; index < heroPixels.length; index += 4) {
          if (qrMaskPixels[index] > 127) {
            qrPixels += 1;
            if (heroPixels[index] > 127) heroIntersectionPixels += 1;
          }
        }
      }
      const metric: HeroAreaFrameMetric = {
        source: 'production-scene-semantic-id-pass',
        maskSource: 'dual-production-geometry-masks-semantic-subject-and-active-qr-plane',
        sceneUuid: this.scene.uuid,
        cameraUuid: this.camera.uuid,
        theme: this.theme.id,
        payload: this.qr.payload,
        gridSize: this.qr.size,
        timeSeconds: Number(timeSeconds.toFixed(6)),
        resolution,
        qrPixels,
        heroIntersectionPixels,
        ratio: Number((heroIntersectionPixels / qrPixels).toFixed(8)),
        semanticVoxelCount: counts.semanticVoxelCount,
        excludedSemanticVoxelCount: counts.excludedSemanticVoxelCount,
        cameraMode: cameraMode === 'top-down' ? 'production-top-down-scan-camera' : 'production-default-opening-camera',
        viewportExtraction: 'active-qr-projected-mask-intersection',
        antiAliasIndependent: true,
        reduction: reductionMode,
      };
      if (includeMask) {
        metric.maskDataUrl = this.readHeroAreaMaskDataUrl(targets.heroMask, targets.qrMask, resolution, 'intersection');
        metric.qrMaskDataUrl = this.readHeroAreaMaskDataUrl(targets.heroMask, targets.qrMask, resolution, 'qr');
      }
      return metric;
    };

    try {
      this.scene.add(this.areaMaskMesh, this.areaQrMaskMesh, this.areaReductionMesh);
      this.scene.background = null;
      this.renderer.autoClear = false;
      this.renderer.setClearColor('#000000', 1);
      this.camera.layers.set(HERO_AREA_DIAGNOSTIC_LAYER);
      if (cameraMode === 'top-down') this.applyScanCamera();
      else this.writeCameraState(this.defaultCamera);
      this.camera.updateMatrixWorld(true);
      projected.forEach((point) => point.project(this.camera));
      const minX = Math.min(...projected.map((point) => point.x));
      const maxX = Math.max(...projected.map((point) => point.x));
      const minY = Math.min(...projected.map((point) => point.y));
      const maxY = Math.max(...projected.map((point) => point.y));
      const spanX = Math.max(0.000001, maxX - minX);
      const spanY = Math.max(0.000001, maxY - minY);
      const cropProjection = new THREE.Matrix4().set(
        2 / spanX, 0, 0, -(maxX + minX) / spanX,
        0, 2 / spanY, 0, -(maxY + minY) / spanY,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
      this.camera.projectionMatrix.premultiply(cropProjection);
      this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();

      this.areaMaskMesh.visible = false;
      this.areaReductionMesh.visible = false;
      this.areaQrMaskMesh.visible = true;
      this.areaQrMaskMesh.position.set(0, qrPlaneY, 0);
      this.areaQrMaskMesh.scale.set(this.qr.size, this.qr.size, 1);
      this.areaQrMaskMesh.updateMatrixWorld(true);
      this.renderer.setRenderTarget(targets.qrMask);
      this.renderer.clear(true, false, false);
      this.renderer.render(this.scene, this.camera);
      this.areaQrMaskMesh.visible = false;

      const renderedFrameCount = Math.round(durationSeconds * sampleHz) + 1;
      for (let frameIndex = 0; frameIndex < renderedFrameCount; frameIndex += 1) {
        const timeSeconds = startTimeSeconds + frameIndex / sampleHz;
        const metric = renderFrame(timeSeconds);
        ratioTrace.push(metric.ratio);
        if (!minFrame || metric.ratio < minFrame.ratio) minFrame = metric;
        if (!maxFrame || metric.ratio > maxFrame.ratio) maxFrame = metric;
      }
      if (!minFrame || !maxFrame) throw new Error('HERO_AREA_NO_FRAMES_RENDERED');
      let measuredMinFrame = minFrame as HeroAreaFrameMetric;
      let measuredMaxFrame = maxFrame as HeroAreaFrameMetric;
      if (options.includeWorstMask || options.includeExtremaMasks) {
        measuredMinFrame = renderFrame(measuredMinFrame.timeSeconds, true);
      }
      if (options.includeExtremaMasks) {
        measuredMaxFrame = renderFrame(measuredMaxFrame.timeSeconds, true);
      }
      const sortedRatios = [...ratioTrace].sort((first, second) => first - second);
      const middle = Math.floor(sortedRatios.length * 0.5);
      const medianRatio = sortedRatios.length % 2
        ? sortedRatios[middle]
        : (sortedRatios[middle - 1] + sortedRatios[middle]) * 0.5;
      return {
        source: 'production-scene-semantic-id-pass',
        theme: this.theme.id,
        payload: this.qr.payload,
        gridSize: this.qr.size,
        startTimeSeconds,
        durationSeconds,
        sampleHz,
        fixedTimestepSeconds: 1 / sampleHz,
        renderedFrameCount,
        resolution,
        requiredMin: HERO_AREA_REQUIRED_MIN,
        requiredMax: HERO_AREA_REQUIRED_MAX,
        authoringTarget: HERO_AREA_AUTHORING_TARGET,
        ratioTrace,
        minRatio: measuredMinFrame.ratio,
        maxRatio: measuredMaxFrame.ratio,
        medianRatio: Number(medianRatio.toFixed(8)),
        minFrame: measuredMinFrame,
        maxFrame: measuredMaxFrame,
        worstFrame: measuredMinFrame,
      };
    } finally {
      this.areaMaskMesh.count = 0;
      this.areaMaskMesh.visible = false;
      this.areaQrMaskMesh.visible = false;
      this.areaReductionMesh.visible = false;
      this.scene.remove(this.areaMaskMesh, this.areaQrMaskMesh, this.areaReductionMesh);
      this.elapsed = previousElapsed;
      this.updateHeroRuntime(runtime);
      this.camera.layers.mask = previousCameraLayer;
      this.writeCameraState(previousCamera);
      this.scene.background = previousBackground;
      this.renderer.autoClear = previousAutoClear;
      this.renderer.setClearColor(previousClearColor, previousClearAlpha);
      this.renderer.setRenderTarget(previousRenderTarget);
      this.renderer.setViewport(previousViewport);
      this.renderer.setScissor(previousScissor);
      this.renderer.setScissorTest(previousScissorTest);
      if (previousRenderTarget === null) this.render();
    }
  }

  setDiagnosticAnimationTime(timeSeconds: number | null): void {
    if (timeSeconds !== null && (!Number.isFinite(timeSeconds) || timeSeconds < 0)) throw new Error('DIAGNOSTIC_TIME_INVALID');
    this.diagnosticAnimationTime = timeSeconds;
    if (timeSeconds !== null) this.elapsed = timeSeconds;
    const runtime = this.runtimes.get(this.theme.id);
    if (runtime) this.updateHeroRuntime(runtime);
    this.render();
  }

  getStats(): GardenStats {
    let sceneObjects = 0;
    this.scene.traverse(() => { sceneObjects += 1; });
    const runtime = this.runtimes.get(this.theme.id);
    const treeVolume = runtime ? this.treeVolumeMetric(runtime) : null;
    const sunVolume = runtime ? this.sunVolumeMetric(runtime) : null;
    const oceanMotion = runtime ? this.oceanMotionMetric(runtime) : null;
    const v8 = runtime ? collectV8Metrics(this.theme.id, runtime.bodies as V8BodyState[], runtime.particleStates as V8ParticleState[]) : collectV8Metrics(this.theme.id, [], []);
    const targetScale = heroScaleForGrid(this.qr.size);
    const axes: [number, number, number] = runtime
      ? [runtime.group.scale.x, runtime.group.scale.y, runtime.group.scale.z]
      : [targetScale, targetScale, targetScale];
    const currentScale = runtime?.scaleCurrent ?? targetScale;
    const referenceMajorAxis = HERO_REFERENCE_MAJOR_AXIS[this.theme.id];
    const semanticMajorAxisWorld = referenceMajorAxis * currentScale;
    const heroToQrRatio = semanticMajorAxisWorld / this.qr.size;
    const referenceHeroToQrRatio = referenceMajorAxis / HERO_REFERENCE_GRID_SIZE;
    const metric = (value: number) => Number(value.toFixed(6));
    const responsiveHero: GardenStats['visual']['responsiveHero'] = {
      gridSize: this.qr.size,
      referenceGridSize: HERO_REFERENCE_GRID_SIZE,
      qrActiveExtent: this.qr.size,
      referenceMajorAxis: metric(referenceMajorAxis),
      targetScale: metric(targetScale),
      currentScale: metric(currentScale),
      semanticMajorAxisWorld: metric(semanticMajorAxisWorld),
      heroToQrRatio: metric(heroToQrRatio),
      referenceHeroToQrRatio: metric(referenceHeroToQrRatio),
      ratioError: metric(Math.abs(heroToQrRatio - referenceHeroToQrRatio)),
      axisScale: axes.map(metric) as [number, number, number],
      axisSpread: metric(Math.max(...axes) - Math.min(...axes)),
      transitionMs: runtime?.scaleTransitionMs ?? HERO_SCALE_TRANSITION_MS,
      lastTransitionDurationMs: metric(runtime ? Math.max(0, runtime.scaleSettledAt - runtime.scaleStartedAt) : 0),
      transitionSettled: runtime ? Math.abs(runtime.scaleCurrent - runtime.scaleTarget) <= 0.00001 : true,
      particlesVisible: runtime?.particles.visible ?? false,
      manualCameraAdjusted: this.manualCameraAdjusted,
      cameraFit: this.responsiveCameraFit(runtime),
    };
    return {
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      instances: this.moduleCount,
      progress: this.progress,
      mode: this.requestedMode,
      payload: this.qr.payload,
      theme: this.theme.id,
      sceneUuid: this.scene.uuid,
      cameraUuid: this.camera.uuid,
      canvasId: this.renderer.domElement.id,
      materialSignature: [this.theme.scanDark, this.theme.mid, this.theme.bright, this.theme.highlight, this.theme.ground].join('|'),
      animationTime: this.elapsed,
      animationFrame: this.animationFrame,
      camera: {
        position: this.camera.position.toArray(),
        quaternion: this.camera.quaternion.toArray(),
        up: this.camera.up.toArray(),
        target: this.controls.target.toArray(),
        zoom: this.camera.zoom,
      },
      controls: { type: 'ArcballControls', rotate: this.controls.enableRotate, pan: this.controls.enablePan, zoom: this.controls.enableZoom, polarClamp: false, azimuthClamp: false },
      visual: {
        primaryPrimitive: 'rounded-cuboid', heroCount: 1, forestCount: 0, qrColumnField: false, neutralBlackDominance: false,
        oceanWaveDirection: 'positive-x', oceanWaveSamples: [this.waveHeight(0), this.waveHeight(1.6), this.waveHeight(3.2)],
        treeVolume, sunVolume, oceanMotion, v8, responsiveHero,
      },
      resources: {
        geometries: this.renderer.info.memory.geometries,
        textures: this.renderer.info.memory.textures,
        programs: this.renderer.info.programs?.length ?? 0,
        sceneObjects,
        managedListeners: 6,
      },
      performance: {
        frameTimeMedianMs: percentile(this.frameTimes, 0.5),
        frameTimeP95Ms: percentile(this.frameTimes, 0.95),
        pointerResponseP95Ms: percentile(this.pointerResponses, 0.95),
        pointerSamples: this.pointerResponses.length,
        longTaskCount: this.longTasks.filter((duration) => duration > 80).length,
        maxLongTaskMs: this.longTasks.length ? Math.max(...this.longTasks) : 0,
        fidelityLevel: this.fidelityLevel,
        fidelityReason: this.fidelityReason,
        heroResolutionPreserved: true,
        qrResolutionPreserved: true,
        activeParticleCount: runtime?.particles.count ?? 0,
        totalParticleCount: runtime?.particleStates.length ?? 0,
        hysteresisEnabled: true,
      },
    };
  }

  captureScene(): string {
    this.render();
    return this.renderer.domElement.toDataURL('image/png');
  }

  captureTopDown(): string {
    const current = this.readCameraState();
    const source = this.renderer.domElement;
    const currentPixelRatio = this.renderer.getPixelRatio();
    const cssWidth = Math.max(1, source.clientWidth || Math.round(source.width / currentPixelRatio));
    const cssHeight = Math.max(1, source.clientHeight || Math.round(source.height / currentPixelRatio));
    const currentFrustum = {
      left: this.camera.left,
      right: this.camera.right,
      top: this.camera.top,
      bottom: this.camera.bottom,
    };
    try {
      this.renderer.setPixelRatio(1);
      this.renderer.setSize(TOP_DOWN_EXPORT_RENDER_SIDE, TOP_DOWN_EXPORT_RENDER_SIDE, false);
      this.camera.left = -FRUSTUM_HEIGHT * 0.5;
      this.camera.right = FRUSTUM_HEIGHT * 0.5;
      this.camera.top = FRUSTUM_HEIGHT * 0.5;
      this.camera.bottom = -FRUSTUM_HEIGHT * 0.5;
      this.camera.position.copy(this.scanPosition);
      this.camera.quaternion.copy(this.topQuaternion);
      this.controls.target.copy(this.scanTarget);
      this.camera.zoom = topDownExportZoom(this.qr.size);
      this.camera.updateProjectionMatrix();
      this.render();
      const composite = document.createElement('canvas');
      composite.width = TOP_DOWN_EXPORT_SIDE;
      composite.height = TOP_DOWN_EXPORT_SIDE;
      const context = composite.getContext('2d');
      if (!context) throw new Error('TOP_DOWN_EXPORT_CONTEXT_MISSING');
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, composite.width, composite.height);
      // The scene stays native, colored, animated, and unmodified. This fixed
      // sub-pixel low-pass only suppresses WebGL edge-sampling noise while the
      // 2x production render is reduced to the stable 1001px export surface.
      context.filter = `blur(${TOP_DOWN_EXPORT_POSTFILTER_PX}px)`;
      context.drawImage(source, 0, 0, TOP_DOWN_EXPORT_SIDE, TOP_DOWN_EXPORT_SIDE);
      context.filter = 'none';
      return composite.toDataURL('image/png');
    } finally {
      this.renderer.setPixelRatio(currentPixelRatio);
      this.renderer.setSize(cssWidth, cssHeight, false);
      this.camera.left = currentFrustum.left;
      this.camera.right = currentFrustum.right;
      this.camera.top = currentFrustum.top;
      this.camera.bottom = currentFrustum.bottom;
      this.writeCameraState(current);
      this.render();
    }
  }

  getTreeStructureEvidence(): ReturnType<typeof collectTreeStructureEvidence> {
    const runtime = this.runtimes.get(this.theme.id);
    return collectTreeStructureEvidence(this.theme.id, (runtime?.bodies ?? []) as V8BodyState[]);
  }

  private readCameraState(): CameraState {
    return { position: this.camera.position.clone(), quaternion: this.camera.quaternion.clone(), up: this.camera.up.clone(), target: this.controls.target.clone(), zoom: this.camera.zoom };
  }

  private writeCameraState(state: CameraState): void {
    this.camera.position.copy(state.position);
    this.camera.quaternion.copy(state.quaternion);
    this.camera.up.copy(state.up);
    this.controls.target.copy(state.target);
    this.camera.zoom = state.zoom;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  private createDefaultCameraState(): CameraState {
    const scale = heroScaleForGrid(this.qr.size);
    const runtime = this.runtimes.get(this.theme.id);
    const quietHalf = (this.qr.size + QUIET_ZONE * 2) * 0.5;
    const min = new THREE.Vector3(-quietHalf, -0.55, -quietHalf);
    const max = new THREE.Vector3(quietHalf, 0.65, quietHalf);
    const motionPadding = (this.theme.id === 'wanderer' ? 1.15 : this.theme.id === 'ocean' ? 0.75 : 0.65) * scale;
    if (runtime) {
      for (const state of runtime.bodies) {
        const halfX = state.scaleX * scale * 0.5 + motionPadding;
        const halfY = state.scaleY * scale * 0.5 + motionPadding;
        const halfZ = state.scaleZ * scale * 0.5 + motionPadding;
        min.x = Math.min(min.x, state.x * scale - halfX);
        min.y = Math.min(min.y, state.baseY * scale - halfY);
        min.z = Math.min(min.z, state.z * scale - halfZ);
        max.x = Math.max(max.x, state.x * scale + halfX);
        max.y = Math.max(max.y, state.baseY * scale + halfY);
        max.z = Math.max(max.z, state.z * scale + halfZ);
      }
    }
    const target = min.clone().add(max).multiplyScalar(0.5);
    const direction = new THREE.Vector3(0, 220, 34).normalize();
    const boundsSize = max.clone().sub(min);
    const distance = Math.min(300, Math.max(78 * scale, boundsSize.length() * 1.35));
    const position = target.clone().addScaledVector(direction, distance);
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(position, target, up),
    );
    const fitCamera = new THREE.OrthographicCamera(
      this.camera.left, this.camera.right, this.camera.top, this.camera.bottom,
      this.camera.near, this.camera.far,
    );
    fitCamera.position.copy(position);
    fitCamera.quaternion.copy(quaternion);
    fitCamera.up.copy(up);
    fitCamera.zoom = 1;
    fitCamera.updateProjectionMatrix();
    fitCamera.updateMatrixWorld(true);
    let projectedHalfWidth = 0;
    let projectedHalfHeight = 0;
    for (const x of [min.x, max.x]) {
      for (const y of [min.y, max.y]) {
        for (const z of [min.z, max.z]) {
          const projected = new THREE.Vector3(x, y, z).project(fitCamera);
          projectedHalfWidth = Math.max(projectedHalfWidth, Math.abs(projected.x));
          projectedHalfHeight = Math.max(projectedHalfHeight, Math.abs(projected.y));
        }
      }
    }
    const zoom = THREE.MathUtils.clamp(Math.min(
      0.82 / Math.max(0.0001, projectedHalfWidth),
      0.78 / Math.max(0.0001, projectedHalfHeight),
    ), this.controls.minZoom, this.controls.maxZoom);
    return { position, quaternion, up, target, zoom };
  }

  private refreshDefaultCamera(applyToScene: boolean): void {
    this.defaultCamera = this.createDefaultCameraState();
    if (applyToScene) {
      this.writeCameraState(this.defaultCamera);
      this.controls.saveState();
      this.savedCamera = this.readCameraState();
    } else if (!this.manualCameraAdjusted) {
      const state = this.defaultCamera;
      this.savedCamera = {
        position: state.position.clone(), quaternion: state.quaternion.clone(), up: state.up.clone(),
        target: state.target.clone(), zoom: state.zoom,
      };
    }
  }

  private sceneZoom(): number {
    return FRUSTUM_HEIGHT / (this.qr.size + 11) * 0.89;
  }

  private computeScanZoom(): number {
    const parent = this.renderer.domElement.parentElement;
    const aspect = parent ? Math.max(0.2, parent.clientWidth / Math.max(1, parent.clientHeight)) : 1;
    const compact = parent ? Math.min(parent.clientWidth, parent.clientHeight) < COMPACT_SCAN_MAX_EDGE : false;
    const marginModules = compact ? QUIET_ZONE * 2 : SCAN_MARGIN_MODULES;
    return FRUSTUM_HEIGHT * Math.min(1, aspect) / (this.qr.size + marginModules);
  }

  private applyScanCamera(): void {
    this.camera.position.copy(this.scanPosition);
    this.camera.quaternion.copy(this.topQuaternion);
    this.controls.target.copy(this.scanTarget);
    this.camera.zoom = this.scanZoom;
    this.camera.updateProjectionMatrix();
  }

  private applyCameraTransition(): void {
    const amount = smoother(this.progress);
    this.camera.position.lerpVectors(this.savedCamera.position, this.scanPosition, amount);
    this.camera.quaternion.slerpQuaternions(this.savedCamera.quaternion, this.topQuaternion, amount);
    this.camera.up.lerpVectors(this.savedCamera.up, new THREE.Vector3(0, 1, 0), amount).normalize();
    this.controls.target.lerpVectors(this.savedCamera.target, this.scanTarget, amount);
    this.camera.zoom = THREE.MathUtils.lerp(this.savedCamera.zoom, this.scanZoom, amount);
    this.camera.updateProjectionMatrix();
  }

  private resize(): void {
    const parent = this.renderer.domElement.parentElement;
    if (!parent) return;
    const width = Math.max(1, parent.clientWidth);
    const height = Math.max(1, parent.clientHeight);
    const aspect = width / height;
    const scanMode = this.requestedMode === 'scan';
    const compactScan = scanMode && Math.min(width, height) < COMPACT_SCAN_MAX_EDGE;
    this.renderer.domElement.style.filter = scanMode ? `blur(${COMPACT_SCAN_POSTFILTER_PX}px)` : 'none';
    const pixelRatio = compactScan
      ? Math.min(Math.max(window.devicePixelRatio, COMPACT_SCAN_PIXEL_RATIO), 1.6)
      : Math.min(window.devicePixelRatio * 0.8, 1.2);
    if (Math.abs(this.renderer.getPixelRatio() - pixelRatio) > 0.001) this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.camera.left = -FRUSTUM_HEIGHT * aspect * 0.5;
    this.camera.right = FRUSTUM_HEIGHT * aspect * 0.5;
    this.camera.top = FRUSTUM_HEIGHT * 0.5;
    this.camera.bottom = -FRUSTUM_HEIGHT * 0.5;
    this.scanZoom = this.computeScanZoom();
    if (this.progress > 0.999) this.applyScanCamera();
    else if (!this.manualCameraAdjusted && this.requestedMode === 'scene') this.refreshDefaultCamera(true);
    else this.camera.updateProjectionMatrix();
  }

  private observeLongTasks(): void {
    try {
      this.longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.longTasks.push(entry.duration);
          if (this.longTasks.length > 180) this.longTasks.shift();
        }
      });
      this.longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {
      this.longTaskObserver = null;
    }
  }

  private updateAutomaticFidelity(frameTime: number): void {
    if (frameTime > 22 && frameTime < 250) {
      this.slowFrameBudget += 1;
      this.recoveryFrameBudget = 0;
    } else if (frameTime < 17) {
      this.recoveryFrameBudget += 1;
      this.slowFrameBudget = Math.max(0, this.slowFrameBudget - 1);
    }
    if (this.fidelityLevel === 'high' && this.slowFrameBudget >= 90) {
      this.fidelityLevel = 'reduced-atmosphere';
      this.fidelityReason = 'sustained-frame-time-over-22ms';
      for (const runtime of this.runtimes.values()) runtime.particles.count = Math.ceil(runtime.particleStates.length * 0.58);
      this.slowFrameBudget = 0;
    } else if (this.fidelityLevel === 'reduced-atmosphere' && this.recoveryFrameBudget >= 300) {
      this.fidelityLevel = 'high';
      this.fidelityReason = 'recovered-frame-time-under-17ms';
      for (const runtime of this.runtimes.values()) runtime.particles.count = runtime.particleStates.length;
      this.recoveryFrameBudget = 0;
    }
  }

  private animate = (): void => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.animate);
    const now = performance.now();
    const measuredFrame = now - this.lastFrameAt;
    this.updateAutomaticFidelity(measuredFrame);
    this.lastFrameAt = now;
    if (now <= this.interactionUntil && measuredFrame < 250) {
      this.frameTimes.push(measuredFrame);
      if (this.frameTimes.length > 900) this.frameTimes.shift();
    }
    const delta = Math.min(0.05, this.clock.getDelta());
    if (this.diagnosticAnimationTime === null) this.elapsed += delta;
    else this.elapsed = this.diagnosticAnimationTime;
    this.animationFrame += 1;

    if (Math.abs(this.progress - this.targetProgress) > 0.0005) {
      const direction = Math.sign(this.targetProgress - this.progress);
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.36 : TRANSITION_SECONDS;
      this.progress = THREE.MathUtils.clamp(this.progress + direction * delta / duration, 0, 1);
      this.applyCameraTransition();
    } else {
      this.progress = this.targetProgress;
      if (this.progress >= 0.999) this.applyScanCamera();
      if (this.progress <= 0.001 && this.requestedMode === 'scene' && !this.controls.enabled) {
        this.writeCameraState(this.savedCamera);
        this.controls.enabled = true;
      }
    }

    if (this.controls.enabled) this.controls.update();
    const runtime = this.runtimes.get(this.theme.id);
    if (runtime) {
      this.updateHeroScale(runtime);
      this.updateHeroRuntime(runtime);
    }
    if (this.theme.id === 'sunset') {
      const breathe = Math.sin(this.elapsed * 0.72) * 0.085;
      this.keyLight.intensity = 3.4 + breathe;
      this.fillLight.intensity = 1.75 + breathe * 0.55;
    } else {
      this.keyLight.intensity = 3.4;
      this.fillLight.intensity = 1.75;
    }
    this.render();
  };

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.longTaskObserver?.disconnect();
    const canvas = this.renderer.domElement;
    canvas.removeEventListener('pointerdown', this.onPointerDown);
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('wheel', this.onWheel);
    this.controls.removeEventListener('start', this.onControlStart);
    this.controls.removeEventListener('end', this.onControlEnd);
    this.controls.removeEventListener('change', this.onControlChange);
    this.controls.dispose();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
        meshMaterials.forEach((material) => materials.add(material));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    this.areaMaskMaterial.dispose();
    this.areaQrMaskMesh.geometry.dispose();
    this.areaQrMaskMaterial.dispose();
    this.areaReductionMesh.geometry.dispose();
    this.areaReductionMaterial.dispose();
    this.areaRenderTargets.forEach(({ heroMask, qrMask, reductions }) => {
      heroMask.dispose();
      qrMask.dispose();
      reductions.forEach((target) => target.dispose());
    });
    this.areaRenderTargets.clear();
    this.shadowTexture.dispose();
    this.renderer.dispose();
  }
}
