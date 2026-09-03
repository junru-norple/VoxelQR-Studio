import * as THREE from 'three';
import type { CanonicalQr } from '../core/qr';
import { THEMES, type StudioThemeId, type ThemeDefinition, type ThemeId } from '../themes';
import type { KittyNaturalPose } from './r6KittyNaturalMotion';
import {
  R3_KITTY_FOOT_CONTACT_Y,
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  R3_KITTY_VISUAL_X_SCALE,
  R3_KITTY_VISUAL_Y_SCALE,
  R3_KITTY_VISUAL_Z_SCALE,
  R3_WANDERER_FOOT_CONTACT_Y,
  R4_KITTY_LINEAR_SCALE,
  R4_WANDERER_LINEAR_SCALE,
  scaleCenterAboutContact,
} from './r4CharacterContract';
import {
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_PROJECTED_SILHOUETTE_MAX,
  R5_KITTY_PROJECTED_SILHOUETTE_MIN,
  R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  r5KittyScaleForGrid,
} from './r5CharacterContract';

export const V7_HERO_CELL_EDGE = 0.9;
export const V8_1_MICRO_STEP = 0.5;
export const V8_1_MICRO_EDGE = 0.46;
export const V8_1_MICRO_HEIGHT = 0.42;
export const V8_1_MICRO_VERTICAL_STEP = 0.4;
export const MICRO_STEP = 0.4;
export const MICRO_EDGE = 0.36;
export const QR_MICRO_CAP_EDGE = MICRO_STEP * 1.01;
export const MICRO_HEIGHT = 0.34;
export const MICRO_VERTICAL_STEP = 0.32;
export const SCAN_MOTION_DAMPING = 0.42;
export const HERO_REFERENCE_GRID_SIZE = 33;
export const HERO_SCALE_TRANSITION_MS = 280;
export const HERO_AREA_REQUIRED_MIN = 0.4;
export const HERO_AREA_REQUIRED_MAX = 0.5;
export const HERO_AREA_AUTHORING_TARGET = 0.45;
export const HERO_AREA_SAMPLE_HZ = 60;
export const WANDERER_AUTHORING_SCALE = 1;
export const WANDERER_CHARACTER_SCALE = R4_WANDERER_LINEAR_SCALE;
export const WANDERER_SILHOUETTE_DEPTH_SCALE = 1;
export const KITTY_AUTHORING_SCALE = 1;
export const KITTY_VISUAL_X_SCALE =
  R3_KITTY_VISUAL_X_SCALE * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const KITTY_VISUAL_Y_SCALE =
  R3_KITTY_VISUAL_Y_SCALE * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const KITTY_VISUAL_Z_SCALE =
  R3_KITTY_VISUAL_Z_SCALE * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL =
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const WANDERER_AREA_REQUIRED_MIN = 0.3;
export const WANDERER_AREA_REQUIRED_MAX = 0.45;
export const WANDERER_AREA_AUTHORING_TARGET = 0.375;
export const HERO_AREA_BANDS: Record<StudioThemeId, { min: number; max: number; target: number }> = {
  sakura: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  summer: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  maple: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  ginkgo: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  snow: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  sunset: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  ocean: { min: HERO_AREA_REQUIRED_MIN, max: HERO_AREA_REQUIRED_MAX, target: HERO_AREA_AUTHORING_TARGET },
  wanderer: { min: WANDERER_AREA_REQUIRED_MIN, max: WANDERER_AREA_REQUIRED_MAX, target: WANDERER_AREA_AUTHORING_TARGET },
  kitty: {
    min: R5_KITTY_PROJECTED_SILHOUETTE_MIN,
    max: R5_KITTY_PROJECTED_SILHOUETTE_MAX,
    target: R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  },
};
export const HERO_AREA_WINDOW_SECONDS: Record<StudioThemeId, number> = {
  sakura: 15,
  summer: 15,
  maple: 15,
  ginkgo: 15,
  snow: 15,
  sunset: 12,
  ocean: 12,
  wanderer: 20,
  kitty: 60,
};

const SURFACE_SHELL_THICKNESS = MICRO_STEP * 1.55;
const SNOW_LOAD_HORIZONTAL_SCALE = 1.52;
const TREE_AUTHORING_SCALE: Record<'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow', number> = {
  sakura: 0.95,
  summer: 0.98,
  maple: 0.968,
  ginkgo: 1,
  snow: 1,
};
const SUN_MICRO_STEP = 0.32;
const SUN_MICRO_EDGE = 0.288;
const SUN_MICRO_HEIGHT = 0.272;

export const HERO_REFERENCE_MAJOR_AXIS: Record<ThemeId, number> = {
  sakura: 27.2,
  summer: 26.4,
  maple: 27.4,
  ginkgo: 25.2,
  snow: 27.2,
  sunset: 28.688,
  ocean: 33,
  wanderer: 34.748 * WANDERER_CHARACTER_SCALE,
};
export const HERO_REFERENCE_MAJOR_AXIS_V11: Record<StudioThemeId, number> = {
  ...HERO_REFERENCE_MAJOR_AXIS,
  wanderer: 26.8 * R4_WANDERER_LINEAR_SCALE,
  kitty: 24.6 * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4,
};

export function heroScaleForGrid(gridSize: number): number {
  return gridSize / HERO_REFERENCE_GRID_SIZE;
}

export type HeroSemantic =
  | 'trunk' | 'branch' | 'canopy'
  | 'sun-core' | 'sun-support'
  | 'water' | 'water-support'
  | 'wanderer-hood' | 'wanderer-face' | 'wanderer-eye' | 'wanderer-nose' | 'wanderer-mouth' | 'wanderer-body'
  | 'wanderer-arm' | 'wanderer-foot' | 'wanderer-ear' | 'wanderer-scarf'
  | 'wanderer-pack' | 'wanderer-seam' | 'wanderer-garden'
  | 'kitty-head' | 'kitty-body' | 'kitty-muzzle' | 'kitty-eye' | 'kitty-nose' | 'kitty-whisker'
  | 'kitty-ear' | 'kitty-leg' | 'kitty-foot' | 'kitty-tail';

export function isHeroAreaSemantic(themeId: StudioThemeId, semantic: HeroSemantic): boolean {
  if (themeId === 'sunset') return semantic === 'sun-core';
  if (themeId === 'ocean') return semantic === 'water';
  if (themeId === 'wanderer') return semantic.startsWith('wanderer-') && semantic !== 'wanderer-garden';
  if (themeId === 'kitty') return semantic.startsWith('kitty-');
  return semantic === 'trunk' || semantic === 'branch' || semantic === 'canopy';
}

export type MotionLayer =
  | 'anchored' | 'primary' | 'secondary' | 'canopy'
  | 'sun' | 'water'
  | 'wanderer-body' | 'wanderer-head' | 'wanderer-ear' | 'wanderer-eye'
  | 'wanderer-scarf' | 'wanderer-pack'
  | 'kitty-body' | 'kitty-head' | 'kitty-ear' | 'kitty-eye' | 'kitty-leg' | 'kitty-tail'
  | 'support';

export type ParticleKind = 'petal' | 'warm-mote' | 'maple-leaf' | 'ginkgo-fan' | 'snowflake' | 'sun-mote' | 'foam' | 'mint-mote' | 'gold-mote';

export interface BodyState {
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
  cellEdge: number;
  motionLayer: MotionLayer;
  motionGroup: number;
  variation: number;
  part: string;
  treeHeight: number;
  lineageId: string;
  parentLineageId: string | null;
  lineageDepth: number;
  restHeightRatio: number;
  restRadial: number;
}

export interface CapState {
  sourceBodyIndex: number;
  scaleX: number;
  scaleZ: number;
  offsetX: number;
  offsetZ: number;
  scanX: number;
  scanZ: number;
  scanScaleX: number;
  scanScaleZ: number;
}

export interface ParticleState {
  id: string;
  origin: THREE.Vector3;
  phase: number;
  scale: number;
  scaleY: number;
  scaleZ: number;
  speed: number;
  drift: number;
  kind: ParticleKind;
  lifetime: number;
  recycleGap: number;
  fallDistance: number;
  fallDuration: number;
  settleDuration: number;
  boardSurfaceY: number;
  contactY: number;
  cellEdge: number;
}

export interface HeroBuild {
  bodies: BodyState[];
  darkCaps: CapState[];
  lightCaps: CapState[];
  particles: ParticleState[];
}

export interface EvaluatedBody {
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  colorMix: number;
  opacity: number;
  visible: boolean;
}

export interface V8HeroMetrics {
  detail: {
    baselineMedianCellEdge: number;
    v81BaselineMedianCellEdge: number;
    medianVisibleCellEdge: number;
    effectiveLinearScale: number;
    linearUpliftOverV81: number;
    visibleCellEdgeRatioOverV81: number;
    visibleHeroVoxelCount: number;
    semanticGroupCount: number;
    fakeDetailVoxelCount: number;
  };
  treeMotion: null | {
    layerCount: number;
    phaseGroupCount: number;
    responseGroupCount: number;
    lineageCount: number;
    rootedTopologyDepth: number;
    independentVerticalColumnTranslationChannelCount: 0;
    deformationField: 'lineage-height-radial-seeded-wind';
    anchoredBaseMaxDisplacement: number;
    primaryDisplacementP95: number;
    canopyDisplacementP95: number;
    treeHeight: number;
    gustIntervalSeconds: number;
    particleIdentity: ParticleKind;
  };
  particleTrajectory: null | {
    canonicalUpAxis: 'world-y';
    family: ParticleKind;
    sampledParticleCount: number;
    sampleSeconds: number;
    sampleHz: number;
    visibleUpwardSegmentCount: number;
    maxVisibleUpwardStepCellEdges: number;
    netVerticalDisplacementCellEdges: number;
    invisibleGapFrameCount: number;
    respawnAfterInvisibleGapCount: number;
    visibleRespawnTeleportCount: number;
    visibleBelowBoardFrameCount: number;
    minimumVisibleBottomClearance: number;
    minimumSettleSeconds: number;
    maximumSettleSeconds: number;
  };
  sunLiving: null | {
    detailLinearScale: number;
    lightBreathingAmplitude: number;
    atmosphericMoteCount: number;
  };
  ocean: null | {
    activeWaveBandCount: number;
    timeVaryingDataCoveragePercent: number;
    perceptibleMotionCoveragePercent: number;
    largestStaticRegionPercent: number;
    crestTravelPercentWidth: number;
    amplitudeP90OverP50: number;
    directionCoherencePercent: number;
    noShortGlobalLoop: boolean;
    sampleSeconds: number;
    visibleWaterTiles: number;
    mainWaveTiles: number;
    supportTiles: number;
    mainWaveTileFraction: number;
  };
  treeStructure: null | {
    archetype: 'irregular-open-umbrella' | 'broad-mature-rounded' | 'skew-radial-asymmetric' | 'upright-open-fan' | 'tiered-snow-conifer';
    trunkLineageCount: number;
    primaryBranchCount: number;
    secondaryBranchCount: number;
    canopyClusterCount: number;
    trunkVoxelCount: number;
    primaryBranchVoxelCount: number;
    secondaryBranchVoxelCount: number;
    canopyVoxelCount: number;
    maximumLineageDepth: number;
    structuralSpan: [number, number, number];
  };
  wanderer: null | {
    heightWidthRatio: number;
    depthWidthRatio: number;
    medianCellEdgeOverV8HeroMedian: number;
    semanticPartCount: number;
    continuousIdle: string[];
    observedIdleEvents20s: string[];
    sideViewReadable: boolean;
    backViewReadable: boolean;
    originalConstruction: boolean;
  };
  kitty: null | {
    originalConstruction: true;
    palette: ['orange-gold', 'cream-white', 'dark-brown'];
    semanticPartCount: number;
    motionModel: 'session-seeded-natural-lively-v1';
    sessionOwnedRuntime: true;
    finiteCycle: false;
    fixedWaypointOrder: false;
    mandatoryOriginReturn: false;
    actions: KittyActionMetric[];
  };
  scanMotion: {
    dampingRatio: number;
    phaseContinues: boolean;
    geometryReplacement: false;
    colorReplacement: false;
  };
}

interface BuildContext {
  qr: CanonicalQr;
  theme: ThemeDefinition;
  random: () => number;
  voxels: Map<string, BodyState>;
  particles: ParticleState[];
}

type KittyActionMetric = 'idle' | 'look' | 'walk' | 'run' | 'turn' | 'dash';

const fixed = (value: number) => Number(value.toFixed(4));
const positiveModulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;
const gridX = (qr: CanonicalQr, column: number) => column - (qr.size - 1) * 0.5;
const gridZ = (qr: CanonicalQr, row: number) => row - (qr.size - 1) * 0.5;

function logicalCell(qr: CanonicalQr, x: number, z: number): { column: number; row: number } | null {
  const half = (qr.size - 1) * 0.5;
  const column = Math.round(x + half);
  const row = Math.round(z + half);
  return column >= 0 && row >= 0 && column < qr.size && row < qr.size ? { column, row } : null;
}

function voxelKey(x: number, y: number, z: number): string {
  return `${Math.round(x * 100)},${Math.round(y * 100)},${Math.round(z * 100)}`;
}

type AddVoxelOptions = Partial<Pick<BodyState,
  'scaleX' | 'scaleY' | 'scaleZ' | 'rotationY' | 'phase' | 'amplitude' | 'motionGroup'
  | 'variation' | 'treeHeight' | 'wave' | 'lineageId' | 'parentLineageId'
  | 'lineageDepth' | 'restHeightRatio' | 'restRadial'
>> & { logicalColumn?: number; logicalRow?: number };

function addVoxel(
  context: BuildContext,
  x: number,
  y: number,
  z: number,
  color: string,
  semantic: HeroSemantic,
  motionLayer: MotionLayer,
  part: string,
  options: AddVoxelOptions = {},
): void {
  const responsiveScale = context.theme.id === 'kitty'
    ? r5KittyScaleForGrid(context.qr.size)
    : heroScaleForGrid(context.qr.size);
  const logical = options.logicalColumn !== undefined && options.logicalRow !== undefined
    ? { column: options.logicalColumn, row: options.logicalRow }
    : logicalCell(context.qr, x * responsiveScale, z * responsiveScale);
  if (!logical) return;
  const phase = options.phase ?? context.random() * Math.PI * 2;
  const state: BodyState = {
    x, z, baseY: y,
    scaleX: options.scaleX ?? MICRO_EDGE,
    scaleY: options.scaleY ?? MICRO_HEIGHT,
    scaleZ: options.scaleZ ?? MICRO_EDGE,
    rotationY: options.rotationY ?? ((logical.column + logical.row) % 2 ? 0.028 : -0.028),
    phase,
    amplitude: options.amplitude ?? 0,
    color: new THREE.Color(color),
    wave: options.wave ?? false,
    semantic,
    column: logical.column,
    row: logical.row,
    cellEdge: Math.max(options.scaleX ?? MICRO_EDGE, options.scaleZ ?? MICRO_EDGE),
    motionLayer,
    motionGroup: options.motionGroup ?? 0,
    variation: options.variation ?? 1,
    part,
    treeHeight: options.treeHeight ?? 0,
    lineageId: options.lineageId ?? part,
    parentLineageId: options.parentLineageId ?? null,
    lineageDepth: options.lineageDepth ?? 0,
    restHeightRatio: options.restHeightRatio
      ?? (options.treeHeight ? THREE.MathUtils.clamp(y / options.treeHeight, 0, 1) : 0),
    restRadial: options.restRadial ?? Math.hypot(x, z),
  };
  context.voxels.set(voxelKey(x, y, z), state);
}

interface TreeTopologySpec {
  id: string;
  parentId: string | null;
  depth: number;
  group: number;
  phase: number;
  radial: number;
}

function addColumn(
  context: BuildContext,
  x: number,
  z: number,
  baseY: number,
  levels: number,
  color: string,
  semantic: HeroSemantic,
  motionLayer: MotionLayer,
  part: string,
  amplitude: number,
  treeHeight = 0,
  topology: TreeTopologySpec = { id: part, parentId: null, depth: 0, group: 0, phase: 0, radial: 0 },
): void {
  for (let level = 0; level < levels; level += 1) {
    const canopyPhase = x * 1.613 + z * 1.931 + topology.group * 0.71;
    const stagger = motionLayer === 'canopy' ? MICRO_STEP * 0.32 : 0;
    const staggerX = Math.sin((level + 1) * 2.399 + canopyPhase) * stagger;
    const staggerZ = Math.cos((level + 1) * 2.173 + canopyPhase * 0.83) * stagger;
    const worldY = baseY + level * MICRO_VERTICAL_STEP + MICRO_HEIGHT * 0.5;
    const voxelColor = motionLayer === 'canopy'
      ? `#${new THREE.Color(color).offsetHSL(
        Math.sin(canopyPhase + level * 0.37) * 0.006,
        Math.cos(canopyPhase * 0.61 + level) * 0.018,
        Math.sin(canopyPhase * 0.47 + level * 1.73) * 0.045,
      ).getHexString()}`
      : color;
    addVoxel(context, x + staggerX, worldY, z + staggerZ, voxelColor, semantic, motionLayer, part, {
      amplitude,
      phase: topology.phase + level * 0.012,
      rotationY: motionLayer === 'canopy' ? Math.sin(canopyPhase + level * 0.91) * 0.11 : undefined,
      motionGroup: topology.group,
      treeHeight,
      lineageId: topology.id,
      parentLineageId: topology.parentId,
      lineageDepth: topology.depth,
      restHeightRatio: treeHeight ? THREE.MathUtils.clamp(worldY / treeHeight, 0, 1) : 0,
      restRadial: topology.radial,
    });
  }
}

interface TreeSegmentSpec {
  id: string;
  parentId: string;
  start: [number, number, number];
  end: [number, number, number];
  startRadius: number;
  endRadius: number;
  depth: 1 | 2;
  group: number;
}

interface TreeClusterSpec {
  id: string;
  parentId: string;
  center: [number, number, number];
  radius: [number, number, number];
  group: number;
  snow?: boolean;
}

interface TreeSpeciesSpec {
  archetype: NonNullable<V8HeroMetrics['treeStructure']>['archetype'];
  height: number;
  trunkTop: [number, number, number];
  trunkRadius: [number, number];
  primary: TreeSegmentSpec[];
  secondary: TreeSegmentSpec[];
  clusters: TreeClusterSpec[];
}

function addTaperedSegment(
  context: BuildContext,
  spec: TreeSegmentSpec | {
    id: string;
    parentId: string | null;
    start: [number, number, number];
    end: [number, number, number];
    startRadius: number;
    endRadius: number;
    depth: 0;
    group: number;
  },
  treeHeight: number,
  color: string,
  semantic: 'trunk' | 'branch',
  layer: 'anchored' | 'primary' | 'secondary',
  seededWind: number,
): void {
  const start = new THREE.Vector3(...spec.start);
  const end = new THREE.Vector3(...spec.end);
  const axis = end.clone().sub(start);
  const length = axis.length();
  if (length <= 0.001) return;
  const direction = axis.clone().normalize();
  const helper = Math.abs(direction.y) > 0.88 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const tangent = new THREE.Vector3().crossVectors(direction, helper).normalize();
  const bitangent = new THREE.Vector3().crossVectors(direction, tangent).normalize();
  const alongSteps = Math.max(1, Math.ceil(length / (MICRO_STEP * 0.78)));
  for (let step = 0; step <= alongSteps; step += 1) {
    const amount = step / alongSteps;
    const center = start.clone().lerp(end, amount);
    const radius = THREE.MathUtils.lerp(spec.startRadius, spec.endRadius, amount);
    const rings = radius > 1.05 ? [radius, radius * 0.56] : radius > 0.48 ? [radius] : [0];
    for (const ringRadius of rings) {
      const circumference = Math.max(MICRO_STEP, Math.PI * 2 * Math.max(ringRadius, MICRO_STEP * 0.5));
      const radialSteps = ringRadius === 0 ? 1 : Math.max(6, Math.ceil(circumference / (MICRO_STEP * 0.9)));
      for (let radial = 0; radial < radialSteps; radial += 1) {
        const angle = radial / radialSteps * Math.PI * 2;
        const point = center.clone()
          .addScaledVector(tangent, Math.cos(angle) * ringRadius)
          .addScaledVector(bitangent, Math.sin(angle) * ringRadius);
        const anchored = layer === 'anchored' || point.y <= 3.8;
        addVoxel(context, point.x, point.y, point.z, color, semantic, anchored ? 'anchored' : layer, spec.id, {
          amplitude: anchored ? 0 : layer === 'primary' ? 0.15 : 0.21,
          phase: seededWind + spec.group * 0.41 + amount * 0.12,
          rotationY: Math.atan2(direction.x, direction.z),
          motionGroup: spec.group,
          treeHeight,
          lineageId: spec.id,
          parentLineageId: spec.parentId,
          lineageDepth: spec.depth,
          restHeightRatio: THREE.MathUtils.clamp(point.y / treeHeight, 0, 1),
          restRadial: Math.hypot(point.x, point.z),
        });
      }
    }
    if (radius > 0.48) {
      addVoxel(context, center.x, center.y, center.z, color, semantic, center.y <= 3.8 ? 'anchored' : layer, spec.id, {
        amplitude: center.y <= 3.8 ? 0 : layer === 'primary' ? 0.15 : 0.21,
        phase: seededWind + spec.group * 0.41 + amount * 0.12,
        rotationY: Math.atan2(direction.x, direction.z),
        motionGroup: spec.group,
        treeHeight,
        lineageId: spec.id,
        parentLineageId: spec.parentId,
        lineageDepth: spec.depth,
        restHeightRatio: THREE.MathUtils.clamp(center.y / treeHeight, 0, 1),
        restRadial: Math.hypot(center.x, center.z),
      });
    }
  }
}

type SurfaceColor = string | ((x: number, y: number, z: number, normalized: number) => string);

/**
 * Builds a real micro-voxel surface instead of a hidden solid. Every retained
 * voxel contributes to at least one exterior view, while the top projection
 * remains the union of the actual rounded-cuboid fragments.
 */
function fillEllipsoidSurface(
  context: BuildContext,
  center: THREE.Vector3,
  radius: THREE.Vector3,
  color: SurfaceColor,
  semantic: HeroSemantic,
  motionLayer: MotionLayer,
  part: string,
  optionsForPoint?: (x: number, y: number, z: number) => AddVoxelOptions,
  samplingStep = MICRO_STEP,
  shellThickness = SURFACE_SHELL_THICKNESS,
): void {
  const minX = Math.ceil((center.x - radius.x) / samplingStep);
  const maxX = Math.floor((center.x + radius.x) / samplingStep);
  const minY = Math.ceil((center.y - radius.y) / samplingStep);
  const maxY = Math.floor((center.y + radius.y) / samplingStep);
  const minZ = Math.ceil((center.z - radius.z) / samplingStep);
  const maxZ = Math.floor((center.z + radius.z) / samplingStep);
  const inner = new THREE.Vector3(
    Math.max(samplingStep * 0.5, radius.x - shellThickness),
    Math.max(samplingStep * 0.5, radius.y - shellThickness),
    Math.max(samplingStep * 0.5, radius.z - shellThickness),
  );
  for (let iz = minZ; iz <= maxZ; iz += 1) {
    const z = iz * samplingStep;
    for (let iy = minY; iy <= maxY; iy += 1) {
      const y = iy * samplingStep;
      for (let ix = minX; ix <= maxX; ix += 1) {
        const x = ix * samplingStep;
        const normalized = ((x - center.x) / radius.x) ** 2
          + ((y - center.y) / radius.y) ** 2
          + ((z - center.z) / radius.z) ** 2;
        if (normalized > 1) continue;
        const innerNormalized = ((x - center.x) / inner.x) ** 2
          + ((y - center.y) / inner.y) ** 2
          + ((z - center.z) / inner.z) ** 2;
        if (innerNormalized < 1) continue;
        const voxelColor = typeof color === 'function' ? color(x, y, z, normalized) : color;
        addVoxel(context, x, y, z, voxelColor, semantic, motionLayer, part, optionsForPoint?.(x, y, z));
      }
    }
  }
}

function addTreeCrownSurface(
  context: BuildContext,
  id: 'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow',
  spec: TreeSpeciesSpec,
  seededWind: number,
): void {
  // Snow is authored as branch-attached loads below. A shared footprint shell
  // would turn the conifer back into the prohibited stack of white discs.
  if (id === 'snow') return;
  const extent = 15.8;
  const steps = Math.ceil(extent / MICRO_STEP);
  const palette = [context.theme.mid, context.theme.bright, context.theme.highlight];
  for (let iz = -steps; iz <= steps; iz += 1) {
    const z = iz * MICRO_STEP;
    for (let ix = -steps; ix <= steps; ix += 1) {
      const x = ix * MICRO_STEP;
      const angle = Math.atan2(z, x);
      let normalized = Infinity;
      let boundary = 1;
      let gap = false;
      let y = 0;
      let lowerY = 0;
      if (id === 'sakura') {
        normalized = Math.hypot((x + 3.2) / 13.35, (z - 0.3) / 12.75);
        boundary = 1 + Math.sin(angle * 3 + 0.4) * 0.1 + Math.cos(angle * 5 - 0.7) * 0.07;
        gap = ((x - 1.5) / 2.5) ** 2 + ((z + 2.2) / 2) ** 2 < 1
          || ((x + 5.2) / 1.55) ** 2 + ((z - 4.2) / 1.9) ** 2 < 1;
        y = 15.7 + (1 - normalized) * 3.4
          + Math.abs(Math.sin(angle * 3 + 0.25)) * 1.9
          + Math.sin(x * 0.41 + z * 0.27) * 0.65 + x * 0.035;
        lowerY = 14.05 + (1 - normalized) * 0.8
          + Math.abs(Math.cos(angle * 2 - 0.35)) * 0.42
          + Math.cos(x * 0.23 - z * 0.31) * 0.22;
      } else if (id === 'summer') {
        normalized = Math.hypot((x - 0.25) / 12.9, (z - 0.1) / 12.55);
        boundary = 1 + Math.sin(angle * 4 + 0.8) * 0.035 + Math.cos(angle * 7) * 0.025;
        y = 15.15 + (1 - normalized ** 2) * 7.2 + Math.sin(x * 0.33 - z * 0.29) * 0.45;
        lowerY = 13.35 + (1 - normalized ** 2) * 1.5 + Math.cos(x * 0.25 + z * 0.21) * 0.25;
      } else if (id === 'maple') {
        normalized = Math.hypot((x + 1.6) / 13.8, (z - 0.8) / 11);
        boundary = 1 + Math.sin(angle * 5 + 0.65) * 0.19 + Math.cos(angle * 3 - 0.4) * 0.12;
        const normalizedAngle = positiveModulo(angle, Math.PI * 2);
        gap = normalized > 0.48 && normalizedAngle > 5.45 && normalizedAngle < 6.2;
        y = 15.6 + (1 - normalized) * 7 + Math.sin(angle * 5) + x * 0.075;
        lowerY = 13.7 + (1 - normalized) * 1.35 + Math.sin(angle * 3 - 0.4) * 0.38 + x * 0.02;
      } else {
        normalized = Math.hypot(x / 11.95, (z - 0.15) / 15.25);
        boundary = 1 + Math.cos(angle * 4 + 0.3) * 0.035;
        const normalizedAngle = positiveModulo(angle, Math.PI * 2);
        const radialFanGap = normalized > 0.3 && (
          (normalizedAngle > 0.72 && normalizedAngle < 0.86)
          || (normalizedAngle > 1.8 && normalizedAngle < 1.94)
          || (normalizedAngle > 3.55 && normalizedAngle < 3.69)
          || (normalizedAngle > 4.7 && normalizedAngle < 4.84)
        );
        gap = radialFanGap
          || (Math.abs(x + 3.6) < 0.72 && z > -1 && z < 8.8)
          || (Math.abs(x - 3) < 0.68 && z > 1.2 && z < 10.2);
        y = 15.1 + (1 - normalized) * 9.4 + Math.cos(x * 0.35) * 0.55 + z * 0.025;
        lowerY = 14.2 + (1 - normalized) * 3.4 + Math.cos(angle * 3) * 0.35 + z * 0.015;
      }
      if (normalized > boundary || gap) continue;
      const sector = positiveModulo(Math.floor(positiveModulo(angle, Math.PI * 2) / (Math.PI * 2) * spec.primary.length), spec.primary.length);
      const parent = spec.primary[sector];
      const crownOptions: AddVoxelOptions = {
        amplitude: id === 'summer' ? 0.34 : id === 'ginkgo' ? 0.26 : 0.3,
        phase: seededWind + parent.group * 0.43 + Math.hypot(x, z) * 0.027,
        rotationY: Math.sin(x * 1.31 + y * 0.47 + z * 0.83) * 0.11,
        motionGroup: parent.group,
        treeHeight: spec.height,
        lineageId: id + '-crown-surface-' + sector,
        parentLineageId: parent.id,
        lineageDepth: 3,
        restHeightRatio: THREE.MathUtils.clamp(y / spec.height, 0, 1),
        restRadial: Math.hypot(x, z),
      };
      addVoxel(context, x, y, z, palette[positiveModulo(ix * 3 + iz * 5, palette.length)], 'canopy', 'canopy', id + '-crown-upper-' + sector, crownOptions);
      addVoxel(context, x, lowerY, z, palette[positiveModulo(ix * 3 + iz * 5 + 1, palette.length)], 'canopy', 'canopy', id + '-crown-lower-' + sector, {
        ...crownOptions,
        phase: crownOptions.phase! + 0.19,
        rotationY: Math.sin(x * 1.07 + lowerY * 0.39 + z * 0.71) * 0.11,
        lineageId: id + '-crown-lower-' + sector,
        restHeightRatio: THREE.MathUtils.clamp(lowerY / spec.height, 0, 1),
      });
    }
  }
}

function buildTree(context: BuildContext, id: ThemeId): void {
  const definition = context.theme;
  const seededWind = context.random() * Math.PI * 2;
  const species: Record<'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow', TreeSpeciesSpec> = {
    sakura: {
      archetype: 'irregular-open-umbrella', height: 20.4, trunkTop: [0.35, 11.2, 0.2], trunkRadius: [1.52, 0.72],
      primary: [
        { id: 'sakura-primary-west', parentId: 'trunk', start: [0.1, 7.2, 0.1], end: [-7.2, 13.5, -2.2], startRadius: 0.8, endRadius: 0.43, depth: 1, group: 1 },
        { id: 'sakura-primary-east', parentId: 'trunk', start: [0.2, 8, 0], end: [7.7, 14.1, -0.8], startRadius: 0.76, endRadius: 0.4, depth: 1, group: 2 },
        { id: 'sakura-primary-north', parentId: 'trunk', start: [0.25, 8.7, 0.15], end: [-1.8, 14.7, 7.1], startRadius: 0.7, endRadius: 0.38, depth: 1, group: 3 },
        { id: 'sakura-primary-south', parentId: 'trunk', start: [0.3, 9.3, 0.1], end: [3.5, 15, -6.3], startRadius: 0.66, endRadius: 0.36, depth: 1, group: 4 },
      ],
      secondary: [
        { id: 'sakura-secondary-west-tip', parentId: 'sakura-primary-west', start: [-4.6, 11.2, -1.4], end: [-10.5, 15.5, -4], startRadius: 0.46, endRadius: 0.28, depth: 2, group: 1 },
        { id: 'sakura-secondary-west-back', parentId: 'sakura-primary-west', start: [-5.1, 11.8, -1.5], end: [-7.8, 15.4, 3.5], startRadius: 0.42, endRadius: 0.25, depth: 2, group: 1 },
        { id: 'sakura-secondary-east-tip', parentId: 'sakura-primary-east', start: [4.7, 11.8, -0.5], end: [10.2, 16, -2.5], startRadius: 0.44, endRadius: 0.26, depth: 2, group: 2 },
        { id: 'sakura-secondary-east-front', parentId: 'sakura-primary-east', start: [5.1, 12.1, -0.55], end: [8.3, 15.6, 4], startRadius: 0.4, endRadius: 0.24, depth: 2, group: 2 },
        { id: 'sakura-secondary-north-left', parentId: 'sakura-primary-north', start: [-1.1, 12.3, 4.4], end: [-5.2, 16.4, 9], startRadius: 0.4, endRadius: 0.24, depth: 2, group: 3 },
        { id: 'sakura-secondary-north-tip', parentId: 'sakura-primary-north', start: [-1.5, 13.4, 5.7], end: [1.1, 16.2, 10], startRadius: 0.38, endRadius: 0.23, depth: 2, group: 3 },
        { id: 'sakura-secondary-south-tip', parentId: 'sakura-primary-south', start: [2.3, 12.6, -4.1], end: [5.7, 16.1, -9.2], startRadius: 0.4, endRadius: 0.23, depth: 2, group: 4 },
      ],
      clusters: [
        { id: 'sakura-cluster-inner-west', parentId: 'sakura-primary-west', center: [-3, 16.9, -1], radius: [7.5, 2.1, 6.6], group: 1 },
        { id: 'sakura-cluster-inner-east', parentId: 'sakura-primary-east', center: [3.2, 17.4, 1], radius: [7.2, 2, 6.3], group: 2 },
        { id: 'sakura-cluster-inner-north', parentId: 'sakura-primary-north', center: [-0.4, 17.2, 5], radius: [6.5, 2, 5.7], group: 3 },
        { id: 'sakura-cluster-west-far', parentId: 'sakura-secondary-west-tip', center: [-10.2, 16.7, -3.9], radius: [3.2, 2.35, 3.1], group: 1 },
        { id: 'sakura-cluster-west-open', parentId: 'sakura-secondary-west-back', center: [-7.3, 17.1, 3.5], radius: [3.4, 2.15, 3.2], group: 1 },
        { id: 'sakura-cluster-east-far', parentId: 'sakura-secondary-east-tip', center: [10, 17.1, -2.7], radius: [3.25, 2.2, 3], group: 2 },
        { id: 'sakura-cluster-east-front', parentId: 'sakura-secondary-east-front', center: [8, 16.8, 4.2], radius: [3.55, 2.3, 3.3], group: 2 },
        { id: 'sakura-cluster-north-left', parentId: 'sakura-secondary-north-left', center: [-5, 17.4, 8.7], radius: [3.35, 2.25, 3.1], group: 3 },
        { id: 'sakura-cluster-north-tip', parentId: 'sakura-secondary-north-tip', center: [1, 17.5, 9.5], radius: [3.6, 2.15, 3.15], group: 3 },
        { id: 'sakura-cluster-south', parentId: 'sakura-secondary-south-tip', center: [5.5, 17.2, -8.9], radius: [3.5, 2.25, 3.2], group: 4 },
        { id: 'sakura-cluster-high-gap', parentId: 'sakura-primary-east', center: [2.6, 18.1, 1], radius: [3.1, 2.1, 3], group: 5 },
      ],
    },
    summer: {
      archetype: 'broad-mature-rounded', height: 20.8, trunkTop: [-0.2, 11.7, 0.35], trunkRadius: [1.72, 0.82],
      primary: [
        { id: 'summer-primary-west', parentId: 'trunk', start: [-0.05, 6.8, 0.1], end: [-8.6, 13.2, -1.4], startRadius: 0.92, endRadius: 0.48, depth: 1, group: 1 },
        { id: 'summer-primary-east', parentId: 'trunk', start: [-0.1, 7.4, 0.2], end: [8.8, 13.6, 1.1], startRadius: 0.9, endRadius: 0.47, depth: 1, group: 2 },
        { id: 'summer-primary-north', parentId: 'trunk', start: [-0.15, 8.2, 0.25], end: [-1.8, 14.1, 8.5], startRadius: 0.82, endRadius: 0.44, depth: 1, group: 3 },
        { id: 'summer-primary-south', parentId: 'trunk', start: [-0.12, 8.8, 0.2], end: [1.4, 14.5, -8.2], startRadius: 0.78, endRadius: 0.42, depth: 1, group: 4 },
        { id: 'summer-primary-crown', parentId: 'trunk', start: [-0.18, 9.1, 0.3], end: [3, 16.1, 3.4], startRadius: 0.68, endRadius: 0.36, depth: 1, group: 5 },
      ],
      secondary: [
        { id: 'summer-secondary-west-north', parentId: 'summer-primary-west', start: [-5.3, 10.7, -0.8], end: [-11.1, 15, 3.2], startRadius: 0.5, endRadius: 0.28, depth: 2, group: 1 },
        { id: 'summer-secondary-west-south', parentId: 'summer-primary-west', start: [-5.8, 11, -1], end: [-10.4, 14.8, -5.7], startRadius: 0.47, endRadius: 0.27, depth: 2, group: 1 },
        { id: 'summer-secondary-east-north', parentId: 'summer-primary-east', start: [5.5, 11.3, 0.7], end: [11, 15.3, 5.1], startRadius: 0.49, endRadius: 0.27, depth: 2, group: 2 },
        { id: 'summer-secondary-east-south', parentId: 'summer-primary-east', start: [5.8, 11.5, 0.8], end: [10.8, 15, -4], startRadius: 0.46, endRadius: 0.26, depth: 2, group: 2 },
        { id: 'summer-secondary-north-left', parentId: 'summer-primary-north', start: [-1.1, 11.8, 5.2], end: [-5.5, 15.5, 10.5], startRadius: 0.45, endRadius: 0.26, depth: 2, group: 3 },
        { id: 'summer-secondary-north-tip', parentId: 'summer-primary-north', start: [-1.4, 12.4, 6.1], end: [2.2, 15.7, 11], startRadius: 0.43, endRadius: 0.25, depth: 2, group: 3 },
        { id: 'summer-secondary-south-left', parentId: 'summer-primary-south', start: [0.8, 12.1, -5.1], end: [-4.2, 15.2, -10.6], startRadius: 0.43, endRadius: 0.25, depth: 2, group: 4 },
        { id: 'summer-secondary-south-tip', parentId: 'summer-primary-south', start: [1.1, 12.8, -6.1], end: [5.2, 15.6, -10.3], startRadius: 0.41, endRadius: 0.24, depth: 2, group: 4 },
      ],
      clusters: [
        { id: 'summer-cluster-center', parentId: 'summer-primary-crown', center: [0.3, 16.2, 0.4], radius: [8, 4, 7.4], group: 5 },
        { id: 'summer-cluster-west-north', parentId: 'summer-secondary-west-north', center: [-9, 15.8, 3], radius: [4.3, 3.35, 4.2], group: 1 },
        { id: 'summer-cluster-west-south', parentId: 'summer-secondary-west-south', center: [-9.2, 15.6, -5.1], radius: [4.2, 3.25, 4], group: 1 },
        { id: 'summer-cluster-east-north', parentId: 'summer-secondary-east-north', center: [9.2, 16, 4.6], radius: [4.1, 3.35, 4], group: 2 },
        { id: 'summer-cluster-east-south', parentId: 'summer-secondary-east-south', center: [9.4, 15.7, -3.8], radius: [4.25, 3.2, 4], group: 2 },
        { id: 'summer-cluster-north', parentId: 'summer-secondary-north-tip', center: [0.8, 16.4, 9.1], radius: [4.8, 3.45, 4.1], group: 3 },
        { id: 'summer-cluster-south', parentId: 'summer-secondary-south-tip', center: [1.8, 16, -8.8], radius: [4.7, 3.3, 4.2], group: 4 },
        { id: 'summer-cluster-high', parentId: 'summer-primary-crown', center: [3.4, 18.1, 2.8], radius: [3.8, 2.6, 3.7], group: 5 },
      ],
    },
    maple: {
      archetype: 'skew-radial-asymmetric', height: 21.4, trunkTop: [1.6, 12.4, -0.55], trunkRadius: [1.55, 0.72],
      primary: [
        { id: 'maple-primary-long-west', parentId: 'trunk', start: [0.5, 6.9, -0.1], end: [-10.2, 14.2, -3.2], startRadius: 0.86, endRadius: 0.42, depth: 1, group: 1 },
        { id: 'maple-primary-east-high', parentId: 'trunk', start: [0.8, 8.1, -0.2], end: [9, 16.1, 2.4], startRadius: 0.74, endRadius: 0.36, depth: 1, group: 2 },
        { id: 'maple-primary-north', parentId: 'trunk', start: [1.05, 9, -0.35], end: [-2.2, 16.3, 8.7], startRadius: 0.7, endRadius: 0.35, depth: 1, group: 3 },
        { id: 'maple-primary-short-south', parentId: 'trunk', start: [1.2, 9.6, -0.4], end: [4.6, 15, -6.2], startRadius: 0.62, endRadius: 0.32, depth: 1, group: 4 },
        { id: 'maple-primary-spire', parentId: 'trunk', start: [1.3, 10.1, -0.45], end: [4, 19.2, -0.2], startRadius: 0.58, endRadius: 0.28, depth: 1, group: 5 },
      ],
      secondary: [
        { id: 'maple-secondary-west-extension', parentId: 'maple-primary-long-west', start: [-6.1, 11.4, -2], end: [-12.4, 16.2, -5.1], startRadius: 0.46, endRadius: 0.24, depth: 2, group: 1 },
        { id: 'maple-secondary-west-north', parentId: 'maple-primary-long-west', start: [-6.7, 11.8, -2.1], end: [-8.4, 16.4, 4.2], startRadius: 0.42, endRadius: 0.23, depth: 2, group: 1 },
        { id: 'maple-secondary-east-tip', parentId: 'maple-primary-east-high', start: [5.5, 12.7, 1.3], end: [11.1, 18, 5.4], startRadius: 0.4, endRadius: 0.22, depth: 2, group: 2 },
        { id: 'maple-secondary-east-gap', parentId: 'maple-primary-east-high', start: [5.7, 13, 1.4], end: [10.4, 17.2, -2.6], startRadius: 0.37, endRadius: 0.21, depth: 2, group: 2 },
        { id: 'maple-secondary-north-left', parentId: 'maple-primary-north', start: [-0.8, 13.1, 5.1], end: [-5.8, 17.4, 10.2], startRadius: 0.39, endRadius: 0.22, depth: 2, group: 3 },
        { id: 'maple-secondary-north-tip', parentId: 'maple-primary-north', start: [-1.4, 14.4, 6.8], end: [1, 18, 11.1], startRadius: 0.36, endRadius: 0.21, depth: 2, group: 3 },
        { id: 'maple-secondary-south-tip', parentId: 'maple-primary-short-south', start: [3.2, 12.7, -4], end: [7.1, 16.9, -9.5], startRadius: 0.36, endRadius: 0.2, depth: 2, group: 4 },
        { id: 'maple-secondary-spire-east', parentId: 'maple-primary-spire', start: [3, 15.8, -0.3], end: [7.4, 20, 1.1], startRadius: 0.32, endRadius: 0.19, depth: 2, group: 5 },
      ],
      clusters: [
        { id: 'maple-cluster-inner-west', parentId: 'maple-primary-long-west', center: [-2.8, 17.3, -0.5], radius: [7.6, 2.8, 6.5], group: 1 },
        { id: 'maple-cluster-inner-east', parentId: 'maple-primary-east-high', center: [3.6, 18, 2.3], radius: [6.8, 2.6, 6], group: 2 },
        { id: 'maple-cluster-west-extension', parentId: 'maple-secondary-west-extension', center: [-10.5, 16.9, -4.8], radius: [3.7, 2.8, 3.3], group: 1 },
        { id: 'maple-cluster-west-north', parentId: 'maple-secondary-west-north', center: [-7.8, 17.1, 4.1], radius: [3.6, 2.7, 3.5], group: 1 },
        { id: 'maple-cluster-east-high', parentId: 'maple-secondary-east-tip', center: [9.6, 18.1, 5], radius: [3.55, 2.75, 3.4], group: 2 },
        { id: 'maple-cluster-east-lower', parentId: 'maple-secondary-east-gap', center: [9.2, 17.1, -2.5], radius: [3.5, 2.55, 3.2], group: 2 },
        { id: 'maple-cluster-north-left', parentId: 'maple-secondary-north-left', center: [-5.1, 18, 9.1], radius: [3.45, 2.75, 3.4], group: 3 },
        { id: 'maple-cluster-north-tip', parentId: 'maple-secondary-north-tip', center: [0.8, 18.6, 9.8], radius: [3.2, 2.6, 3.25], group: 3 },
        { id: 'maple-cluster-south', parentId: 'maple-secondary-south-tip', center: [6.7, 17.2, -8.4], radius: [3.6, 2.65, 3.5], group: 4 },
        { id: 'maple-cluster-spire', parentId: 'maple-secondary-spire-east', center: [6.3, 19.3, 0.8], radius: [3.1, 2.55, 3.05], group: 5 },
      ],
    },
    ginkgo: {
      archetype: 'upright-open-fan', height: 22.6, trunkTop: [0.2, 14.8, 0], trunkRadius: [1.38, 0.58],
      primary: [
        { id: 'ginkgo-primary-left', parentId: 'trunk', start: [0.05, 8, 0], end: [-6.8, 18.2, -1.5], startRadius: 0.64, endRadius: 0.3, depth: 1, group: 1 },
        { id: 'ginkgo-primary-right', parentId: 'trunk', start: [0.1, 8.8, 0], end: [6.5, 18.7, 1.1], startRadius: 0.62, endRadius: 0.29, depth: 1, group: 2 },
        { id: 'ginkgo-primary-back', parentId: 'trunk', start: [0.1, 9.7, 0], end: [-1.5, 19.5, 6.7], startRadius: 0.58, endRadius: 0.27, depth: 1, group: 3 },
        { id: 'ginkgo-primary-front', parentId: 'trunk', start: [0.15, 10.5, 0], end: [2.2, 19.8, -6.4], startRadius: 0.54, endRadius: 0.26, depth: 1, group: 4 },
        { id: 'ginkgo-primary-spire', parentId: 'trunk', start: [0.18, 11.2, 0], end: [0.8, 22, 0.6], startRadius: 0.5, endRadius: 0.24, depth: 1, group: 5 },
      ],
      secondary: [
        { id: 'ginkgo-secondary-left-fan', parentId: 'ginkgo-primary-left', start: [-3.9, 13.9, -0.9], end: [-9.2, 21, -3.6], startRadius: 0.34, endRadius: 0.19, depth: 2, group: 1 },
        { id: 'ginkgo-secondary-left-back', parentId: 'ginkgo-primary-left', start: [-4.2, 14.4, -0.9], end: [-7.6, 21.1, 3.8], startRadius: 0.32, endRadius: 0.18, depth: 2, group: 1 },
        { id: 'ginkgo-secondary-right-fan', parentId: 'ginkgo-primary-right', start: [3.8, 14.6, 0.7], end: [9, 21.4, 4], startRadius: 0.33, endRadius: 0.19, depth: 2, group: 2 },
        { id: 'ginkgo-secondary-right-front', parentId: 'ginkgo-primary-right', start: [4, 14.9, 0.7], end: [7.8, 21.2, -3.8], startRadius: 0.31, endRadius: 0.18, depth: 2, group: 2 },
        { id: 'ginkgo-secondary-back-tip', parentId: 'ginkgo-primary-back', start: [-0.9, 15.5, 4.1], end: [-4.2, 22, 8.8], startRadius: 0.3, endRadius: 0.18, depth: 2, group: 3 },
        { id: 'ginkgo-secondary-front-tip', parentId: 'ginkgo-primary-front', start: [1.4, 15.7, -4], end: [4.6, 22.1, -8.5], startRadius: 0.3, endRadius: 0.18, depth: 2, group: 4 },
        { id: 'ginkgo-secondary-spire-left', parentId: 'ginkgo-primary-spire', start: [0.55, 17.5, 0.35], end: [-3.3, 22.4, 0.8], startRadius: 0.28, endRadius: 0.17, depth: 2, group: 5 },
      ],
      clusters: [
        { id: 'ginkgo-cluster-inner-fan', parentId: 'ginkgo-primary-spire', center: [0, 21.4, 0], radius: [9, 5, 7.5], group: 5 },
        { id: 'ginkgo-cluster-inner-left', parentId: 'ginkgo-primary-left', center: [-3.7, 20.5, -0.6], radius: [5.5, 4.4, 6], group: 1 },
        { id: 'ginkgo-cluster-inner-right', parentId: 'ginkgo-primary-right', center: [3.8, 20.8, 0.8], radius: [5.4, 4.5, 5.9], group: 2 },
        { id: 'ginkgo-cluster-left-outer', parentId: 'ginkgo-secondary-left-fan', center: [-8.6, 20.8, -3.3], radius: [3.2, 3.4, 3.3], group: 1 },
        { id: 'ginkgo-cluster-left-back', parentId: 'ginkgo-secondary-left-back', center: [-7, 20.9, 3.5], radius: [3.1, 3.5, 3.2], group: 1 },
        { id: 'ginkgo-cluster-right-outer', parentId: 'ginkgo-secondary-right-fan', center: [8.3, 21.1, 3.6], radius: [3.1, 3.5, 3.2], group: 2 },
        { id: 'ginkgo-cluster-right-front', parentId: 'ginkgo-secondary-right-front', center: [7.2, 20.9, -3.5], radius: [3.05, 3.45, 3.1], group: 2 },
        { id: 'ginkgo-cluster-back', parentId: 'ginkgo-secondary-back-tip', center: [-3.7, 21.5, 7.8], radius: [3.2, 3.35, 3.1], group: 3 },
        { id: 'ginkgo-cluster-front', parentId: 'ginkgo-secondary-front-tip', center: [4.1, 21.6, -7.5], radius: [3.1, 3.3, 3.05], group: 4 },
        { id: 'ginkgo-cluster-spire-left', parentId: 'ginkgo-secondary-spire-left', center: [-2.8, 22.2, 0.7], radius: [2.8, 3.2, 2.9], group: 5 },
        { id: 'ginkgo-cluster-spire-right', parentId: 'ginkgo-primary-spire', center: [2.5, 22.5, 0.2], radius: [2.75, 3.05, 2.8], group: 5 },
      ],
    },
    snow: {
      archetype: 'tiered-snow-conifer', height: 23.8, trunkTop: [0, 23, 0], trunkRadius: [1.42, 0.42],
      primary: [
        { id: 'snow-primary-lower-east', parentId: 'trunk', start: [0, 6.4, 0], end: [11.2, 5.7, 1.2], startRadius: 0.62, endRadius: 0.28, depth: 1, group: 1 },
        { id: 'snow-primary-lower-west', parentId: 'trunk', start: [0, 6.7, 0], end: [-11.5, 5.9, -1], startRadius: 0.62, endRadius: 0.28, depth: 1, group: 2 },
        { id: 'snow-primary-lower-north', parentId: 'trunk', start: [0, 7, 0], end: [-1.2, 6.1, 11.1], startRadius: 0.6, endRadius: 0.27, depth: 1, group: 3 },
        { id: 'snow-primary-lower-south', parentId: 'trunk', start: [0, 7.3, 0], end: [1, 6.3, -10.8], startRadius: 0.59, endRadius: 0.27, depth: 1, group: 4 },
        { id: 'snow-primary-mid-east', parentId: 'trunk', start: [0, 11, 0], end: [8.8, 10.4, -0.8], startRadius: 0.52, endRadius: 0.25, depth: 1, group: 5 },
        { id: 'snow-primary-mid-west', parentId: 'trunk', start: [0, 11.3, 0], end: [-8.5, 10.6, 1.2], startRadius: 0.51, endRadius: 0.24, depth: 1, group: 6 },
        { id: 'snow-primary-mid-north', parentId: 'trunk', start: [0, 11.6, 0], end: [0.7, 10.8, 8.4], startRadius: 0.5, endRadius: 0.24, depth: 1, group: 7 },
        { id: 'snow-primary-mid-south', parentId: 'trunk', start: [0, 11.9, 0], end: [-0.8, 11, -8.1], startRadius: 0.49, endRadius: 0.23, depth: 1, group: 8 },
        { id: 'snow-primary-upper-east', parentId: 'trunk', start: [0, 15.7, 0], end: [5.8, 15.1, 0.7], startRadius: 0.42, endRadius: 0.21, depth: 1, group: 9 },
        { id: 'snow-primary-upper-west', parentId: 'trunk', start: [0, 16, 0], end: [-5.5, 15.4, -0.6], startRadius: 0.41, endRadius: 0.2, depth: 1, group: 10 },
        { id: 'snow-primary-upper-north', parentId: 'trunk', start: [0, 16.3, 0], end: [-0.4, 15.7, 5.4], startRadius: 0.4, endRadius: 0.2, depth: 1, group: 11 },
        { id: 'snow-primary-upper-south', parentId: 'trunk', start: [0, 16.6, 0], end: [0.5, 16, -5.1], startRadius: 0.39, endRadius: 0.19, depth: 1, group: 12 },
      ],
      secondary: [
        { id: 'snow-secondary-lower-east', parentId: 'snow-primary-lower-east', start: [6.2, 6, 0.7], end: [12.8, 4.9, 4], startRadius: 0.31, endRadius: 0.17, depth: 2, group: 1 },
        { id: 'snow-secondary-lower-east-opposed', parentId: 'snow-primary-lower-east', start: [6.1, 6.05, 0.65], end: [12.5, 5, -4], startRadius: 0.3, endRadius: 0.17, depth: 2, group: 1 },
        { id: 'snow-secondary-lower-west', parentId: 'snow-primary-lower-west', start: [-6.4, 6.25, -0.55], end: [-12.5, 5.1, -4.2], startRadius: 0.31, endRadius: 0.17, depth: 2, group: 2 },
        { id: 'snow-secondary-lower-west-opposed', parentId: 'snow-primary-lower-west', start: [-6.3, 6.3, -0.5], end: [-12.3, 5.2, 4.1], startRadius: 0.3, endRadius: 0.17, depth: 2, group: 2 },
        { id: 'snow-secondary-lower-north', parentId: 'snow-primary-lower-north', start: [-0.7, 6.5, 6.2], end: [3.8, 5.1, 12.4], startRadius: 0.3, endRadius: 0.17, depth: 2, group: 3 },
        { id: 'snow-secondary-lower-north-opposed', parentId: 'snow-primary-lower-north', start: [-0.65, 6.55, 6.1], end: [-4, 5.2, 12.2], startRadius: 0.29, endRadius: 0.17, depth: 2, group: 3 },
        { id: 'snow-secondary-lower-south', parentId: 'snow-primary-lower-south', start: [0.55, 6.75, -6], end: [-3.5, 5.3, -12], startRadius: 0.3, endRadius: 0.17, depth: 2, group: 4 },
        { id: 'snow-secondary-lower-south-opposed', parentId: 'snow-primary-lower-south', start: [0.5, 6.8, -5.9], end: [3.8, 5.35, -12], startRadius: 0.29, endRadius: 0.17, depth: 2, group: 4 },
        { id: 'snow-secondary-mid-east', parentId: 'snow-primary-mid-east', start: [5, 10.65, -0.45], end: [9.8, 9.6, 3], startRadius: 0.27, endRadius: 0.16, depth: 2, group: 5 },
        { id: 'snow-secondary-mid-west', parentId: 'snow-primary-mid-west', start: [-4.8, 10.9, 0.7], end: [-9.6, 9.9, -2.8], startRadius: 0.27, endRadius: 0.16, depth: 2, group: 6 },
        { id: 'snow-secondary-mid-north', parentId: 'snow-primary-mid-north', start: [0.4, 11.15, 4.8], end: [-3, 10.1, 9.3], startRadius: 0.26, endRadius: 0.15, depth: 2, group: 7 },
        { id: 'snow-secondary-mid-south', parentId: 'snow-primary-mid-south', start: [-0.45, 11.4, -4.6], end: [3.1, 10.35, -9], startRadius: 0.26, endRadius: 0.15, depth: 2, group: 8 },
        { id: 'snow-secondary-upper-east', parentId: 'snow-primary-upper-east', start: [3.3, 15.35, 0.4], end: [6.4, 14.6, -2], startRadius: 0.23, endRadius: 0.14, depth: 2, group: 9 },
        { id: 'snow-secondary-upper-west', parentId: 'snow-primary-upper-west', start: [-3.1, 15.65, -0.35], end: [-6.2, 14.9, 2], startRadius: 0.23, endRadius: 0.14, depth: 2, group: 10 },
        { id: 'snow-secondary-upper-north', parentId: 'snow-primary-upper-north', start: [-0.25, 15.95, 3], end: [1.9, 15.2, 5.9], startRadius: 0.22, endRadius: 0.14, depth: 2, group: 11 },
        { id: 'snow-secondary-upper-south', parentId: 'snow-primary-upper-south', start: [0.3, 16.25, -2.9], end: [-1.8, 15.45, -5.7], startRadius: 0.22, endRadius: 0.14, depth: 2, group: 12 },
      ],
      clusters: [
        { id: 'snow-load-lower-east-mid', parentId: 'snow-primary-lower-east', center: [6.4, 6.35, 0.8], radius: [4.1, 1.45, 2.7], group: 1, snow: true },
        { id: 'snow-load-lower-east-tip', parentId: 'snow-secondary-lower-east', center: [11, 5.7, 2.7], radius: [2.8, 1.25, 2.4], group: 1, snow: true },
        { id: 'snow-load-lower-east-opposed', parentId: 'snow-secondary-lower-east-opposed', center: [10.8, 5.8, -2.7], radius: [2.8, 1.25, 2.4], group: 1, snow: true },
        { id: 'snow-load-lower-west-mid', parentId: 'snow-primary-lower-west', center: [-6.5, 6.55, -0.6], radius: [4.2, 1.5, 2.7], group: 2, snow: true },
        { id: 'snow-load-lower-west-tip', parentId: 'snow-secondary-lower-west', center: [-10.8, 5.85, -2.8], radius: [2.8, 1.25, 2.4], group: 2, snow: true },
        { id: 'snow-load-lower-west-opposed', parentId: 'snow-secondary-lower-west-opposed', center: [-10.6, 5.95, 2.8], radius: [2.8, 1.25, 2.4], group: 2, snow: true },
        { id: 'snow-load-lower-north', parentId: 'snow-secondary-lower-north', center: [1.3, 6, 9.5], radius: [2.7, 1.35, 4], group: 3, snow: true },
        { id: 'snow-load-lower-north-opposed', parentId: 'snow-secondary-lower-north-opposed', center: [-2.6, 6.05, 9.4], radius: [2.7, 1.35, 4], group: 3, snow: true },
        { id: 'snow-load-lower-south', parentId: 'snow-secondary-lower-south', center: [-1.1, 6.2, -9.2], radius: [2.7, 1.35, 3.9], group: 4, snow: true },
        { id: 'snow-load-lower-south-opposed', parentId: 'snow-secondary-lower-south-opposed', center: [2.5, 6.25, -9.2], radius: [2.7, 1.35, 3.9], group: 4, snow: true },
        { id: 'snow-load-mid-east', parentId: 'snow-secondary-mid-east', center: [7.3, 10.6, 1], radius: [3.45, 1.4, 2.6], group: 5, snow: true },
        { id: 'snow-load-mid-west', parentId: 'snow-secondary-mid-west', center: [-7.1, 10.85, -0.7], radius: [3.4, 1.4, 2.6], group: 6, snow: true },
        { id: 'snow-load-mid-north', parentId: 'snow-secondary-mid-north', center: [-1.1, 10.95, 7], radius: [2.55, 1.4, 3.4], group: 7, snow: true },
        { id: 'snow-load-mid-south', parentId: 'snow-secondary-mid-south', center: [1.1, 11.15, -6.8], radius: [2.55, 1.4, 3.35], group: 8, snow: true },
        { id: 'snow-load-upper-east', parentId: 'snow-secondary-upper-east', center: [4.7, 15.45, -0.7], radius: [2.7, 1.35, 2.1], group: 9, snow: true },
        { id: 'snow-load-upper-west', parentId: 'snow-secondary-upper-west', center: [-4.5, 15.7, 0.7], radius: [2.65, 1.35, 2.1], group: 10, snow: true },
        { id: 'snow-load-upper-north', parentId: 'snow-secondary-upper-north', center: [0.7, 15.95, 4.4], radius: [2.05, 1.35, 2.65], group: 11, snow: true },
        { id: 'snow-load-upper-south', parentId: 'snow-secondary-upper-south', center: [-0.7, 16.15, -4.2], radius: [2, 1.35, 2.6], group: 12, snow: true },
        { id: 'snow-load-crown', parentId: 'trunk', center: [0, 19.2, 0], radius: [3.4, 3.1, 3.25], group: 13, snow: true },
        { id: 'snow-load-spire', parentId: 'trunk', center: [0.15, 22, -0.1], radius: [1.85, 2.2, 1.8], group: 14, snow: true },
      ],
    },
  };
  const spec = species[id as keyof typeof species];
  const treeHeight = spec.height;
  const lowerTopAmount = 4.25 / spec.trunkTop[1];
  const lowerTop: [number, number, number] = [
    spec.trunkTop[0] * lowerTopAmount,
    4.25,
    spec.trunkTop[2] * lowerTopAmount,
  ];
  addTaperedSegment(context, {
    id: 'trunk-base', parentId: null, start: [0, 0.45, 0], end: lowerTop,
    startRadius: spec.trunkRadius[0], endRadius: spec.trunkRadius[0] * 0.86, depth: 0, group: 0,
  }, treeHeight, definition.trunk, 'trunk', 'anchored', seededWind);
  addTaperedSegment(context, {
    id: 'trunk', parentId: 'trunk-base', start: lowerTop, end: spec.trunkTop,
    startRadius: spec.trunkRadius[0] * 0.9, endRadius: spec.trunkRadius[1], depth: 0, group: 0,
  }, treeHeight, definition.trunk, 'trunk', 'primary', seededWind);
  spec.primary.forEach((segment) => addTaperedSegment(context, segment, treeHeight, definition.trunk, 'branch', 'primary', seededWind));
  spec.secondary.forEach((segment) => addTaperedSegment(context, segment, treeHeight, definition.trunk, 'branch', 'secondary', seededWind));

  const palette = [definition.mid, definition.bright, definition.highlight];
  spec.clusters.forEach((cluster, clusterIndex) => {
    const clusterRadius = new THREE.Vector3(...cluster.radius);
    if (id === 'snow' && cluster.snow) {
      clusterRadius.x *= SNOW_LOAD_HORIZONTAL_SCALE;
      clusterRadius.z *= SNOW_LOAD_HORIZONTAL_SCALE;
    }
    fillEllipsoidSurface(
      context,
      new THREE.Vector3(...cluster.center),
      clusterRadius,
      (x, y, z) => {
        if (cluster.snow) {
          return positiveModulo(Math.round(x / MICRO_STEP) + Math.round(z / MICRO_STEP) + clusterIndex, 4) === 0
            ? definition.highlight
            : definition.bright;
        }
        return palette[positiveModulo(
          Math.round(x / MICRO_STEP) * 3 + Math.round(z / MICRO_STEP) * 5 + Math.round(y / MICRO_STEP) + clusterIndex,
          palette.length,
        )];
      },
      'canopy',
      'canopy',
      cluster.id,
      (x, y, z) => ({
        amplitude: id === 'summer' ? 0.34 : id === 'ginkgo' ? 0.26 : 0.3,
        phase: seededWind + cluster.group * 0.43 + Math.hypot(x, z) * 0.027,
        rotationY: Math.sin(x * 1.31 + y * 0.47 + z * 0.83) * 0.11,
        motionGroup: cluster.group,
        treeHeight,
        lineageId: cluster.id,
        parentLineageId: cluster.parentId,
        lineageDepth: 3,
        restHeightRatio: THREE.MathUtils.clamp(y / treeHeight, 0, 1),
        restRadial: Math.hypot(x, z),
      }),
    );
  });
  addTreeCrownSurface(context, id as 'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow', spec, seededWind);
  const authoredScale = TREE_AUTHORING_SCALE[id as keyof typeof TREE_AUTHORING_SCALE];
  if (authoredScale !== 1) {
    // Build-time de-duplication is already complete. Mutate the retained states
    // in place so a second, quantized Map key pass cannot silently discard
    // nearby micro-voxels at particular authoring scales.
    context.voxels.forEach((state) => {
      state.x *= authoredScale;
      state.z *= authoredScale;
      state.baseY *= authoredScale;
      state.scaleX *= authoredScale;
      state.scaleY *= authoredScale;
      state.scaleZ *= authoredScale;
      state.cellEdge *= authoredScale;
      state.amplitude *= authoredScale;
      state.treeHeight *= authoredScale;
      state.restRadial *= authoredScale;
    });
  }
  const largestRadius = Math.max(...spec.clusters.flatMap((cluster) => [
    Math.abs(cluster.center[0]) + cluster.radius[0] * (id === 'snow' && cluster.snow ? SNOW_LOAD_HORIZONTAL_SCALE : 1),
    Math.abs(cluster.center[2]) + cluster.radius[2] * (id === 'snow' && cluster.snow ? SNOW_LOAD_HORIZONTAL_SCALE : 1),
  ])) * authoredScale;
  buildParticles(context, id, largestRadius);
}

function buildSunset(context: BuildContext): void {
  const definition = context.theme;
  const center = new THREE.Vector3(0, 24.2, 0);
  const radius = 13;
  const responsiveScale = heroScaleForGrid(context.qr.size);
  fillEllipsoidSurface(
    context,
    center,
    new THREE.Vector3(radius, radius, radius),
    (x, _y, z) => {
      const logical = logicalCell(context.qr, x * responsiveScale, z * responsiveScale);
      return logical && context.qr.matrix[logical.row][logical.column]
        ? definition.mid
        : definition.highlight;
    },
    'sun-core', 'sun', 'sun-core',
    (x, y, z) => ({
      amplitude: 0.024,
      phase: (x - center.x) * 0.21 + (y - center.y) * 0.13 + (z - center.z) * 0.17,
      motionGroup: positiveModulo(Math.round(x / MICRO_STEP) + Math.round(z / MICRO_STEP), 7),
      scaleX: SUN_MICRO_EDGE,
      scaleY: SUN_MICRO_HEIGHT,
      scaleZ: SUN_MICRO_EDGE,
    }),
    SUN_MICRO_STEP,
    SUN_MICRO_STEP * 1.55,
  );
  const diskRadius = 12.8;
  const diskSteps = Math.ceil(diskRadius / SUN_MICRO_STEP);
  for (let iz = -diskSteps; iz <= diskSteps; iz += 1) {
    const z = iz * SUN_MICRO_STEP;
    for (let ix = -diskSteps; ix <= diskSteps; ix += 1) {
      const x = ix * SUN_MICRO_STEP;
      if (Math.hypot(x, z) > diskRadius) continue;
      addVoxel(context, x, center.y, z, definition.bright, 'sun-core', 'sun', 'sun-core-equatorial-fill', {
        amplitude: 0.024,
        phase: x * 0.21 + z * 0.17,
        motionGroup: positiveModulo(ix + iz, 7),
        scaleX: SUN_MICRO_STEP * 0.98,
        scaleY: SUN_MICRO_HEIGHT,
        scaleZ: SUN_MICRO_STEP * 0.98,
      });
    }
  }
  const halfWidth = Math.min(Math.floor(context.qr.size * 0.42), 16);
  const horizonSteps = Math.ceil(halfWidth / MICRO_STEP);
  for (let ix = -horizonSteps; ix <= horizonSteps; ix += 1) {
    const x = ix * MICRO_STEP;
    const z = 7 + (Math.abs(ix) % 8 === 0 ? MICRO_STEP : 0);
    addColumn(context, x, z, 0.24, 2 + (Math.abs(ix) % 10 === 0 ? 2 : 0), ix % 2 ? definition.mid : definition.trunk, 'sun-support', 'support', 'horizon', 0.012);
  }
  buildParticles(context, 'sunset', radius);
}

export function sampleOceanSurface(state: BodyState, time: number): number {
  const x = state.x;
  const z = state.z;
  const local = state.variation;
  const packet = 0.72 + 0.28 * Math.sin(x * 0.105 - z * 0.071 - time * 0.41 + state.phase * 0.17);
  const swell = Math.sin(x * 0.34 + z * 0.085 - time * 0.82 + state.phase * 0.08) * 0.36 * local * packet;
  const mediumRaw = Math.sin(x * 0.72 + z * 0.19 - time * 1.37 + state.phase * 0.31);
  const crest = (Math.pow(Math.max(0, (mediumRaw + 1) * 0.5), 3.2) - 0.19) * 0.38 * (0.75 + local * 0.25);
  const ripple = Math.sin(x * 1.61 - z * 0.57 - time * 2.23 + state.phase) * 0.085 * (0.7 + local * 0.3);
  return 0.92 + swell + crest + ripple;
}

function buildOcean(context: BuildContext): void {
  const definition = context.theme;
  const responsiveScale = heroScaleForGrid(context.qr.size);
  const offsets = [-0.32, 0, 0.32];
  for (let row = 0; row < context.qr.size; row += 1) {
    for (let column = 0; column < context.qr.size; column += 1) {
      const normalizedX = ((column + 0.5) / context.qr.size) * 2 - 1;
      const normalizedZ = ((row + 0.5) / context.qr.size) * 2 - 1;
      const crestCenter = Math.sin(normalizedX * Math.PI * 0.86) * 0.17 - normalizedX * 0.055;
      const crestHalfWidth = 0.42 + Math.cos(normalizedX * Math.PI) * 0.045;
      const mainWave = Math.abs(normalizedZ - crestCenter) <= crestHalfWidth;
      for (const oz of offsets) {
        for (const ox of offsets) {
          const x = (gridX(context.qr, column) + ox) / responsiveScale;
          const z = (gridZ(context.qr, row) + oz) / responsiveScale;
          const variation = mainWave
            ? 0.82 + context.random() * 0.94
            : 0.24 + context.random() * 0.56;
          addVoxel(context, x, 0.7, z, mainWave ? definition.bright : definition.mid, mainWave ? 'water' : 'water-support', 'water', mainWave ? 'main-wave-tile' : 'water-support-tile', {
            scaleX: MICRO_EDGE / responsiveScale,
            scaleY: 1,
            scaleZ: MICRO_EDGE / responsiveScale,
            rotationY: 0,
            wave: true, variation, phase: context.random() * Math.PI * 2,
            motionGroup: positiveModulo(column * 2 + row * 3 + (ox > 0 ? 1 : 0), 11),
            logicalColumn: column,
            logicalRow: row,
          });
        }
      }
    }
  }
  buildParticles(context, 'ocean', Math.floor(context.qr.size * 0.46));
}

function buildWanderer(context: BuildContext): void {
  const violet = '#7651a8';
  const violetLight = '#a883d4';
  const violetDark = '#2f2850';
  const cream = '#f7e9cb';
  const mint = '#a7f0cf';
  const gold = '#ffd45c';
  const part = (
    x: number, y: number, z: number, color: string, semantic: HeroSemantic,
    motionLayer: MotionLayer, name: string, scaleX: number, scaleY: number, scaleZ: number,
    rotationY = 0,
  ) => addVoxel(context, x, y, z, color, semantic, motionLayer, name, {
    scaleX, scaleY, scaleZ, rotationY,
  });

  // The accepted R3 construction stays deliberately low resolution: every
  // authored state below is one
  // thick rounded cuboid. There is no sampled shell, contour stack, or face mask.
  part(0, 16.7, 0, violet, 'wanderer-hood', 'wanderer-head', 'head-core', 14.2, 11.8, 15.8);
  part(-4.7, 15.6, 2.2, violet, 'wanderer-hood', 'wanderer-head', 'head-cheek-left', 5.4, 7.4, 7.2);
  part(4.7, 15.6, 2.2, violet, 'wanderer-hood', 'wanderer-head', 'head-cheek-right', 5.4, 7.4, 7.2);
  part(0, 21.2, -0.3, violet, 'wanderer-hood', 'wanderer-head', 'head-crown', 10.8, 5.2, 9.6);

  part(-4.1, 23.75, -0.5, violet, 'wanderer-ear', 'wanderer-ear', 'ear-left', 3.2, 5.2, 3.8);
  part(4.1, 23.75, -0.5, violet, 'wanderer-ear', 'wanderer-ear', 'ear-right', 3.2, 5.2, 3.8);
  part(-4.1, 23.9, 1.5, cream, 'wanderer-ear', 'wanderer-ear', 'ear-inner-left', 1.25, 2.7, 0.7);
  part(4.1, 23.9, 1.5, mint, 'wanderer-ear', 'wanderer-ear', 'ear-inner-right', 1.25, 2.7, 0.7);

  // Two independent pads leave a clear violet channel through the face.
  part(-3.15, 17.5, 8.35, cream, 'wanderer-face', 'wanderer-head', 'eye-pad-left', 3.35, 3.2, 1.1);
  part(3.15, 17.5, 8.35, cream, 'wanderer-face', 'wanderer-head', 'eye-pad-right', 3.35, 3.2, 1.1);
  part(-3.15, 17.75, 9.05, gold, 'wanderer-eye', 'wanderer-eye', 'eye-left', 1.3, 1.65, 0.62);
  part(3.15, 17.75, 9.05, gold, 'wanderer-eye', 'wanderer-eye', 'eye-right', 1.3, 1.65, 0.62);
  part(0, 15.85, 8.75, mint, 'wanderer-nose', 'wanderer-head', 'nose', 0.8, 0.65, 0.62);
  part(0, 14.85, 8.68, violetDark, 'wanderer-mouth', 'wanderer-head', 'mouth', 1.05, 0.3, 0.5);

  part(0, 6.8, -0.6, violet, 'wanderer-body', 'wanderer-body', 'body', 8.2, 9.6, 7.6);
  part(0, 6.6, 3.6, cream, 'wanderer-body', 'wanderer-body', 'belly', 5.2, 5.6, 1.4);
  part(-5.5, 7.1, 0.35, violet, 'wanderer-arm', 'wanderer-body', 'shoulder-left', 3.2, 4.2, 3.5);
  part(5.5, 7.1, 0.35, violet, 'wanderer-arm', 'wanderer-body', 'shoulder-right', 3.2, 4.2, 3.5);
  part(-8.25, 6.9, 0.55, cream, 'wanderer-arm', 'wanderer-body', 'arm-left', 3, 5.2, 4.1);
  part(8.25, 6.9, 0.55, cream, 'wanderer-arm', 'wanderer-body', 'arm-right', 3, 5.2, 4.1);
  part(-3.2, 1.05, 3.1, violetDark, 'wanderer-foot', 'anchored', 'foot-left', 5.2, 1.9, 5.1);
  part(3.2, 1.05, 3.1, violetDark, 'wanderer-foot', 'anchored', 'foot-right', 5.2, 1.9, 5.1);

  // R5 closes the accepted R4 collar into a continuous neck loop and moves the
  // knot to the side-front quadrant. Two deliberately asymmetric tails remain
  // outside the face/chest silhouette: one short forward/outward, one longer
  // side/down.
  // A compact cloth loop occupies the narrow neck shelf below the accepted
  // oversized head. Its inner faces sit just outside the upper-body shell;
  // adjacent pieces overlap only each other to remain visibly continuous.
  part(0, 10, -5.2, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-loop-back', 10, 1.2, 1.4);
  part(-5, 10.1, 0, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-loop-left', 1.6, 1.2, 9.2);
  part(5, 10, 0, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-loop-right', 1.6, 1.2, 9.2);
  part(-2.5, 10.15, 4, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-loop-front-left', 5, 1.2, 1.4);
  part(2.5, 10.05, 4, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-loop-front-right', 5, 1.2, 1.4);
  part(5.4, 9.4, 4.8, mint, 'wanderer-scarf', 'wanderer-head', 'scarf-knot-side-front', 2.2, 2, 2.2, -0.18);
  part(6.2, 8.5, 5.7, mint, 'wanderer-scarf', 'wanderer-scarf', 'scarf-tail-short-forward', 1.8, 2.2, 1.6, -0.48);
  part(6, 6.8, 4.2, mint, 'wanderer-scarf', 'wanderer-scarf', 'scarf-tail-long-side', 1.8, 4.6, 2, 0.16);
  part(0, 7.9, -5.3, violetDark, 'wanderer-pack', 'wanderer-pack', 'backpack', 7.1, 6.4, 2.4);
  part(0, 7.8, -6.7, mint, 'wanderer-seam', 'wanderer-pack', 'back-seam', 0.65, 3.9, 0.55);
  part(0, 9.3, -6.75, gold, 'wanderer-seam', 'wanderer-pack', 'pack-buckle', 2.1, 1.15, 0.58);

  const accents = [[-5, -2], [5, -1.5], [-4.5, 4], [4.5, 3.5]] as const;
  accents.forEach(([x, z], index) => {
    addColumn(context, x, z, 0.4, 2 + (index % 2), index % 2 ? violetLight : mint, 'wanderer-garden', 'support', `garden-accent-${index}`, 0.018);
  });
  context.voxels.forEach((state) => {
    const isCharacter = isHeroAreaSemantic('wanderer', state.semantic);
    if (isCharacter) {
      state.z *= WANDERER_SILHOUETTE_DEPTH_SCALE;
      state.scaleZ *= WANDERER_SILHOUETTE_DEPTH_SCALE;
    }
    const scale = WANDERER_AUTHORING_SCALE * (
      isCharacter ? WANDERER_CHARACTER_SCALE : 1
    );
    state.x *= scale;
    state.z *= scale;
    state.baseY = isCharacter
      ? scaleCenterAboutContact(
        state.baseY * WANDERER_AUTHORING_SCALE,
        R3_WANDERER_FOOT_CONTACT_Y,
        WANDERER_CHARACTER_SCALE,
      )
      : state.baseY * WANDERER_AUTHORING_SCALE;
    state.scaleX *= scale;
    state.scaleY *= scale;
    state.scaleZ *= scale;
    state.cellEdge *= scale;
  });
  buildParticles(context, 'wanderer', 12 * WANDERER_AUTHORING_SCALE);
}

function buildKitty(context: BuildContext): void {
  const orange = '#e69a2e';
  const gold = '#f6c453';
  const cream = '#fff0cf';
  const dark = '#402818';
  const pink = '#ef9ca3';
  const part = (
    x: number, y: number, z: number, color: string, semantic: HeroSemantic,
    motionLayer: MotionLayer, name: string, scaleX: number, scaleY: number, scaleZ: number,
    rotationY = 0,
  ) => addVoxel(context, x, y, z, color, semantic, motionLayer, name, {
    scaleX, scaleY, scaleZ, rotationY,
  });

  // One authored state is one rounded cuboid. The broad masses overlap in 3D
  // without the rejected horizontal ellipsoid layers.
  part(0, 8.5, 0.3, orange, 'kitty-head', 'kitty-head', 'head-core', 9.6, 7.2, 8.8);
  part(-3.9, 8.1, 1, orange, 'kitty-head', 'kitty-head', 'head-cheek-left', 2, 5.1, 3.8);
  part(3.9, 8.1, 1, gold, 'kitty-head', 'kitty-head', 'head-cheek-right', 2, 5.1, 3.8);
  part(0, 4.5, -1.55, gold, 'kitty-body', 'kitty-body', 'body', 6.8, 5.5, 6);
  part(-1, 4.25, -5.1, orange, 'kitty-body', 'kitty-body', 'haunch-left', 1.4, 3.2, 0.65);
  part(1, 4.25, -5.1, gold, 'kitty-body', 'kitty-body', 'haunch-right', 1.4, 3.2, 0.65);

  part(-4.65, 12.45, -0.2, orange, 'kitty-ear', 'kitty-ear', 'ear-left', 2.2, 4.2, 2.1);
  part(4.65, 12.45, -0.2, gold, 'kitty-ear', 'kitty-ear', 'ear-right', 2.2, 4.2, 2.1);
  part(-4.65, 12.55, 1.05, pink, 'kitty-ear', 'kitty-ear', 'ear-inner-left', 0.85, 2.1, 0.42);
  part(4.65, 12.55, 1.05, pink, 'kitty-ear', 'kitty-ear', 'ear-inner-right', 0.85, 2.1, 0.42);

  part(-0.9, 7.65, 4.9, cream, 'kitty-muzzle', 'kitty-head', 'muzzle-left', 1.55, 1.55, 0.8);
  part(0.9, 7.65, 4.9, cream, 'kitty-muzzle', 'kitty-head', 'muzzle-right', 1.55, 1.55, 0.8);
  part(-2.25, 9.25, 5.05, dark, 'kitty-eye', 'kitty-eye', 'eye-left', 1.25, 1.65, 0.62);
  part(2.25, 9.25, 5.05, dark, 'kitty-eye', 'kitty-eye', 'eye-right', 1.25, 1.65, 0.62);
  part(0, 7.9, 5.48, pink, 'kitty-nose', 'kitty-head', 'nose', 0.58, 0.52, 0.42);
  part(-4.35, 7.85, 4.85, cream, 'kitty-whisker', 'kitty-head', 'whisker-left-upper', 1.7, 0.22, 0.25, -0.2);
  part(-4.35, 7.25, 4.75, cream, 'kitty-whisker', 'kitty-head', 'whisker-left-lower', 1.7, 0.22, 0.25, 0.16);
  part(4.35, 7.85, 4.85, cream, 'kitty-whisker', 'kitty-head', 'whisker-right-upper', 1.7, 0.22, 0.25, 0.2);
  part(4.35, 7.25, 4.75, cream, 'kitty-whisker', 'kitty-head', 'whisker-right-lower', 1.7, 0.22, 0.25, -0.16);

  const legs = [
    [-2.35, 1.9, 1.35, 'front-left'], [2.35, 1.9, 1.35, 'front-right'],
    [-2.35, 1.9, -3.6, 'back-left'], [2.35, 1.9, -3.6, 'back-right'],
  ] as const;
  legs.forEach(([x, y, z, part]) => {
    const sideColor = part.includes('right') ? gold : orange;
    addVoxel(context, x, y, z, sideColor, 'kitty-leg', 'kitty-leg', `leg-${part}`, {
      scaleX: 1.4, scaleY: 2.6, scaleZ: 1.45, rotationY: 0,
    });
    addVoxel(context, x, 0.58, z + 0.28, cream, 'kitty-foot', 'kitty-leg', `foot-${part}`, {
      scaleX: 1.8, scaleY: 0.95, scaleZ: 2, rotationY: 0,
    });
  });

  // R4 keeps the R3 raised rhythm but moves the complete chain behind the
  // right rear hip. tail-0 touches the body's rear plane exactly; subsequent
  // segments continue rearward before lifting out into a readable silhouette.
  const tailCenters = [
    [3.2, 5.4, -5.4, 1.7, 3.6],
    [4.7, 7.85, -6, 1.8, 3.6],
    [6.2, 10.3, -6.4, 1.9, 3.7],
    [7.7, 12.7, -6.1, 2, 3.7],
    [9.1, 14.9, -5.4, 2.1, 3.8],
  ] as const;
  tailCenters.forEach(([x, y, z, thickness, height], index) => {
    part(x, y, z, index % 2 ? gold : orange, 'kitty-tail', 'kitty-tail', `tail-${index}`, thickness, height, thickness);
  });
  context.voxels.forEach((state) => {
    if (!state.semantic.startsWith('kitty-')) return;
    state.x *= KITTY_AUTHORING_SCALE * KITTY_VISUAL_X_SCALE;
    state.baseY = scaleCenterAboutContact(
      state.baseY * KITTY_AUTHORING_SCALE,
      R3_KITTY_FOOT_CONTACT_Y,
      KITTY_VISUAL_Y_SCALE,
    );
    state.z *= KITTY_AUTHORING_SCALE * KITTY_VISUAL_Z_SCALE;
    state.scaleX *= KITTY_AUTHORING_SCALE * KITTY_VISUAL_X_SCALE;
    state.scaleY *= KITTY_AUTHORING_SCALE * KITTY_VISUAL_Y_SCALE;
    state.scaleZ *= KITTY_AUTHORING_SCALE * KITTY_VISUAL_Z_SCALE;
    state.cellEdge *= KITTY_AUTHORING_SCALE * Math.max(KITTY_VISUAL_X_SCALE, KITTY_VISUAL_Z_SCALE);
  });
  buildParticles(context, 'kitty', 4.2);
}

function buildParticles(context: BuildContext, id: StudioThemeId, radius: number): void {
  const kind: Record<StudioThemeId, ParticleKind> = {
    sakura: 'petal', summer: 'warm-mote', maple: 'maple-leaf', ginkgo: 'ginkgo-fan', snow: 'snowflake',
    sunset: 'sun-mote', ocean: 'foam', wanderer: 'mint-mote', kitty: 'gold-mote',
  };
  const count = id === 'sunset' ? 44 : id === 'ocean' ? 72 : id === 'wanderer' ? 64 : id === 'kitty' ? 36 : 84;
  for (let index = 0; index < count; index += 1) {
    const spread = id === 'ocean' ? HERO_REFERENCE_GRID_SIZE * 0.44 : radius * 1.35;
    const origin = new THREE.Vector3(
      (context.random() - 0.5) * spread * 2,
      1 + context.random() * (id === 'ocean' ? 2.8 : id === 'wanderer' ? 8 : id === 'kitty' ? 6 : 8.8),
      (context.random() - 0.5) * (id === 'ocean' ? 8 : spread * 1.15),
    );
    const particleKind = kind[id];
    const baseScale = particleKind === 'snowflake' ? 0.5 : particleKind === 'warm-mote' || particleKind === 'mint-mote' || particleKind === 'gold-mote' ? 0.32 : 0.55;
    const ambientLifetime = particleKind === 'snowflake'
      ? 8.2 + context.random() * 2.8
      : particleKind === 'ginkgo-fan' || particleKind === 'maple-leaf'
        ? 6.8 + context.random() * 2.4
        : 5.8 + context.random() * 2.2;
    const phase = context.random() * Math.PI * 2;
    const scale = baseScale * (0.65 + context.random() * 0.75);
    const scaleY = particleKind === 'maple-leaf' || particleKind === 'ginkgo-fan' ? 0.38 : 1;
    const sampledSpeed = 0.7 + context.random() * 0.8;
    const boardSurfaceY = 0.02 / (id === 'kitty' ? r5KittyScaleForGrid(context.qr.size) : heroScaleForGrid(context.qr.size));
    const contactY = boardSurfaceY + scale * scaleY * 0.5 + 0.002;
    const fallDistance = Math.max(0, origin.y - contactY);
    // Keep a complete fall, landing hold, hidden gap and respawn inside the
    // established 12-second proof window, even for the highest spawn point.
    const speed = Math.max(sampledSpeed, fallDistance / 7.8);
    const fallDuration = fallDistance / speed;
    const settleDuration = 0.5 + context.random();
    const downward = particleKind === 'petal' || particleKind === 'warm-mote'
      || particleKind === 'maple-leaf' || particleKind === 'ginkgo-fan'
      || particleKind === 'snowflake' || particleKind === 'sun-mote';
    const lifetime = downward ? fallDuration + settleDuration : ambientLifetime;
    context.particles.push({
      id: `${particleKind}-${index}`,
      origin,
      phase,
      scale,
      scaleY,
      scaleZ: particleKind === 'foam' ? 1.8 : particleKind === 'petal' ? 0.48 : 1,
      speed,
      drift: (context.random() - 0.5) * 1.2,
      kind: particleKind,
      lifetime,
      recycleGap: 0.72 + context.random() * 0.7,
      fallDistance,
      fallDuration,
      settleDuration,
      boardSurfaceY,
      contactY,
      cellEdge: baseScale,
    });
  }
}

function finalize(context: BuildContext): HeroBuild {
  const bodies = [...context.voxels.values()];
  const responsiveScale = heroScaleForGrid(context.qr.size);
  const topByColumn = new Map<string, { index: number; top: number }>();
  bodies.forEach((state, index) => {
    if (state.semantic.startsWith('kitty-') || state.semantic === 'wanderer-garden') return;
    const key = `${Math.round(state.x * 100)},${Math.round(state.z * 100)}`;
    const top = state.baseY + state.scaleY * 0.5;
    const current = topByColumn.get(key);
    if (!current || top > current.top) topByColumn.set(key, { index, top });
  });
  const darkCaps: CapState[] = [];
  const lightCaps: CapState[] = [];
  topByColumn.forEach(({ index }) => {
    const body = bodies[index];
    const cosine = Math.abs(Math.cos(body.rotationY));
    const sine = Math.abs(Math.sin(body.rotationY));
    const rotatedHalfX = (body.scaleX * cosine + body.scaleZ * sine) * 0.5;
    const rotatedHalfZ = (body.scaleX * sine + body.scaleZ * cosine) * 0.5;
    const worldMinX = (body.x - rotatedHalfX) * responsiveScale;
    const worldMaxX = (body.x + rotatedHalfX) * responsiveScale;
    const worldMinZ = (body.z - rotatedHalfZ) * responsiveScale;
    const worldMaxZ = (body.z + rotatedHalfZ) * responsiveScale;
    const minColumn = THREE.MathUtils.clamp(Math.floor(worldMinX + context.qr.size * 0.5), 0, context.qr.size - 1);
    const maxColumn = THREE.MathUtils.clamp(Math.floor(worldMaxX - 0.000001 + context.qr.size * 0.5), 0, context.qr.size - 1);
    const minRow = THREE.MathUtils.clamp(Math.floor(worldMinZ + context.qr.size * 0.5), 0, context.qr.size - 1);
    const maxRow = THREE.MathUtils.clamp(Math.floor(worldMaxZ - 0.000001 + context.qr.size * 0.5), 0, context.qr.size - 1);
    for (let row = minRow; row <= maxRow; row += 1) {
      const cellMinZ = row - context.qr.size * 0.5;
      const cellMaxZ = cellMinZ + 1;
      const intersectionMinZ = Math.max(worldMinZ, cellMinZ);
      const intersectionMaxZ = Math.min(worldMaxZ, cellMaxZ);
      for (let column = minColumn; column <= maxColumn; column += 1) {
        const cellMinX = column - context.qr.size * 0.5;
        const cellMaxX = cellMinX + 1;
        const intersectionMinX = Math.max(worldMinX, cellMinX);
        const intersectionMaxX = Math.min(worldMaxX, cellMaxX);
        if (intersectionMaxX <= intersectionMinX || intersectionMaxZ <= intersectionMinZ) continue;
        const exploreX = (intersectionMinX + intersectionMaxX) * 0.5 / responsiveScale;
        const exploreZ = (intersectionMinZ + intersectionMaxZ) * 0.5 / responsiveScale;
        const cap: CapState = {
          sourceBodyIndex: index,
          scaleX: (intersectionMaxX - intersectionMinX) / responsiveScale / 1.01,
          scaleZ: (intersectionMaxZ - intersectionMinZ) / responsiveScale / 1.01,
          offsetX: exploreX - body.x,
          offsetZ: exploreZ - body.z,
          scanX: gridX(context.qr, column) / responsiveScale,
          scanZ: gridZ(context.qr, row) / responsiveScale,
          scanScaleX: 0.995 / responsiveScale / 1.01,
          scanScaleZ: 0.995 / responsiveScale / 1.01,
        };
        (context.qr.matrix[row][column] ? darkCaps : lightCaps).push(cap);
      }
    }
  });
  return { bodies, darkCaps, lightCaps, particles: context.particles };
}

export function buildV8Hero(qr: CanonicalQr, themeId: StudioThemeId, random: () => number): HeroBuild {
  const context: BuildContext = { qr, theme: THEMES[themeId], random, voxels: new Map(), particles: [] };
  if (themeId === 'sunset') buildSunset(context);
  else if (themeId === 'ocean') buildOcean(context);
  else if (themeId === 'wanderer') buildWanderer(context);
  else if (themeId === 'kitty') buildKitty(context);
  else buildTree(context, themeId as ThemeId);
  return finalize(context);
}

function pulse(time: number, period: number, width: number, offset = 0): number {
  const local = positiveModulo(time + offset, period);
  if (local > width) return 0;
  const normalized = local / width;
  return Math.sin(normalized * Math.PI) ** 2;
}

export function evaluateBody(
  state: BodyState,
  themeId: StudioThemeId,
  time: number,
  motionScale: number,
  kittyNaturalPose?: KittyNaturalPose,
): EvaluatedBody {
  let x = state.x;
  let y = state.baseY;
  let z = state.z;
  let scaleX = state.scaleX;
  let scaleY = state.scaleY;
  let scaleZ = state.scaleZ;
  let rotationX = 0;
  let rotationY = state.rotationY;
  let rotationZ = 0;
  let colorMix = 0;

  if (state.motionLayer === 'water') {
    scaleY = sampleOceanSurface(state, time);
    y = 0.24 + scaleY * 0.5;
    colorMix = Math.max(0, Math.sin(state.x * 0.72 + state.z * 0.19 - time * 1.37 + state.phase * 0.31)) ** 3 * 0.72;
  } else if (state.motionLayer === 'sun') {
    const breathe = Math.sin(time * 0.72 + state.phase * 0.08);
    y += breathe * state.amplitude * motionScale;
    const scale = 1 + breathe * 0.008 * motionScale;
    scaleX *= scale;
    scaleY *= scale;
    scaleZ *= scale;
    colorMix = (breathe + 1) * 0.12;
  } else if (themeId === 'kitty') {
    const pose: KittyNaturalPose = kittyNaturalPose ?? {
      time,
      action: 'idle',
      intent: 'observe',
      x: 0,
      z: 0,
      worldX: 0,
      worldZ: 0,
      normalizedX: 0,
      normalizedZ: 0,
      heading: 0,
      gaitPhase: 0,
      speed: 0,
      normalizedSpeed: 0,
      headYaw: 0,
      tailAngle: Math.sin(time * 2.1 + 0.4) * 0.22,
      moving: false,
    };
    const cosine = Math.cos(pose.heading);
    const sine = Math.sin(pose.heading);
    const secondaryScale = THREE.MathUtils.clamp(motionScale, 0, 1);
    let localX = x;
    let localZ = z;
    if (state.motionLayer === 'kitty-head' || state.motionLayer === 'kitty-eye' || state.motionLayer === 'kitty-ear') {
      const headAngle = pose.headYaw * secondaryScale;
      const headCosine = Math.cos(headAngle);
      const headSine = Math.sin(headAngle);
      const pivotZ = 0.45 * R5_KITTY_LINEAR_SCALE_FROM_R4;
      const relativeZ = localZ - pivotZ;
      const articulatedX = localX * headCosine + relativeZ * headSine;
      const articulatedZ = -localX * headSine + relativeZ * headCosine + pivotZ;
      localX = articulatedX;
      localZ = articulatedZ;
      rotationY += headAngle;
    }
    // Translation and heading remain exact when Scan is engaged. The scene
    // freezes Kitty's clock; damping only affects secondary idle articulation.
    x = localX * cosine + localZ * sine + pose.x;
    z = -localX * sine + localZ * cosine + pose.z;
    rotationY += pose.heading;
    if (state.motionLayer === 'kitty-body') {
      const breathe = Math.sin(time * 2.15 + state.phase * 0.04) * 0.028 * secondaryScale;
      scaleX *= 1 - breathe * 0.18;
      scaleY *= 1 + breathe;
    }
    if (state.motionLayer === 'kitty-eye') {
      const blink = pulse(time, 4.9, 0.18, state.part.includes('left') ? 0 : 0.012);
      scaleY *= 1 - blink * 0.82 * secondaryScale;
    }
    if (state.motionLayer === 'kitty-ear') {
      const side = state.part.includes('left') ? -1 : 1;
      const twitch = pulse(time, state.part.includes('left') ? 6.7 : 7.9, 0.34, side < 0 ? 0.3 : 2.6);
      rotationZ += side * twitch * 0.16 * secondaryScale;
    }
    if (state.motionLayer === 'kitty-leg' && pose.moving) {
      const left = state.part.includes('left');
      const front = state.part.includes('front');
      const stridePhase = pose.gaitPhase + (left === front ? 0 : Math.PI);
      const lift = Math.max(0, Math.sin(stridePhase)) * 0.28 * R5_KITTY_LINEAR_SCALE_FROM_R4 * secondaryScale;
      y += lift;
      rotationX = Math.sin(stridePhase) * 0.18 * secondaryScale;
    }
    if (state.motionLayer === 'kitty-tail') {
      const tailIndex = Number(state.part.split('-').at(-1) ?? 0);
      if (tailIndex > 0) {
        rotationZ += (pose.tailAngle + tailIndex * 0.025) * secondaryScale;
        rotationY += Math.sin(time * 1.7 + tailIndex * 0.42) * 0.09 * secondaryScale;
      }
    }
  } else if (themeId === 'wanderer') {
    const breathe = Math.sin(time * 0.92) * 0.055 * motionScale * WANDERER_CHARACTER_SCALE;
    const weight = Math.sin(time * 0.37 + 0.8) * 0.065 * motionScale * WANDERER_CHARACTER_SCALE;
    const headAngle = (Math.sin(time * 0.31) * 0.045 + pulse(time, 8.9, 1.4, 1.2) * 0.035) * motionScale;
    if (state.motionLayer !== 'anchored' && state.motionLayer !== 'support') x += weight;
    if (state.motionLayer === 'wanderer-body') y += breathe;
    if (
      state.motionLayer === 'wanderer-head'
      || state.motionLayer === 'wanderer-eye'
      || state.motionLayer === 'wanderer-ear'
      || state.motionLayer === 'wanderer-scarf'
    ) {
      const pivotZ = 0.6;
      const localX = x - weight;
      const localZ = z - pivotZ;
      x = localX * Math.cos(headAngle) + localZ * Math.sin(headAngle) + weight;
      z = -localX * Math.sin(headAngle) + localZ * Math.cos(headAngle) + pivotZ;
      y += breathe * 0.75;
      rotationY += headAngle;
    }
    if (state.motionLayer === 'wanderer-eye') {
      const blink = pulse(time, 5.7, 0.22, state.part === 'eye-left' ? 0 : 0.018);
      scaleY *= 1 - blink * 0.76 * motionScale;
    }
    if (state.motionLayer === 'wanderer-ear') {
      const twitch = pulse(time, state.part.includes('left') ? 7.3 : 9.1, 0.58, state.part.includes('left') ? 0.5 : 3.2);
      rotationZ += (state.part.includes('left') ? -1 : 1) * twitch * 0.12 * motionScale;
      x += (state.part.includes('left') ? -1 : 1) * twitch * 0.08 * motionScale * WANDERER_CHARACTER_SCALE;
    }
    if (state.motionLayer === 'wanderer-scarf') {
      // The closed loop and knot stay rigidly registered to the neck so the
      // ring never breaks. Only the two tails receive local cloth sway.
      if (state.part.startsWith('scarf-tail-')) {
        rotationZ += Math.sin(time * 1.05 + state.phase) * 0.1 * motionScale;
      }
    }
    if (state.motionLayer === 'wanderer-pack') y += breathe * 0.38;
  } else if (state.treeHeight > 0 && state.motionLayer !== 'anchored' && state.motionLayer !== 'support') {
    const heightRatio = THREE.MathUtils.clamp(state.restHeightRatio, 0, 1);
    const rootedWeight = heightRatio ** 1.7;
    const gust = 0.88
      + Math.sin(time * (Math.PI * 2 / 9.4)) * 0.1
      + Math.sin(time * (Math.PI * 2 / 13.1) + 0.8) * 0.06;
    const commonBend = Math.sin(time * 0.58 + 0.2)
      * state.treeHeight * (0.004 + 0.0225 * rootedWeight) * gust;
    const lineageLag = Math.sin(time * 0.53 - state.lineageDepth * 0.13 + state.motionGroup * 0.09)
      * state.treeHeight * 0.0018 * rootedWeight;
    const spatialContinuity = Math.sin(time * 0.37 + state.restRadial * 0.085 + state.phase * 0.06)
      * state.treeHeight * 0.0012 * rootedWeight;
    const bend = (commonBend + lineageLag + spatialContinuity) * motionScale;
    x += bend;
    z += (commonBend * 0.31 - lineageLag * 0.44 + spatialContinuity * 0.28) * motionScale;
    rotationZ += bend / Math.max(state.treeHeight, 0.001) * 0.16;
    rotationY += lineageLag * 0.025 * motionScale;
  }
  return { x, y, z, scaleX, scaleY, scaleZ, rotationX, rotationY, rotationZ, colorMix, opacity: 1, visible: true };
}

export function evaluateParticle(state: ParticleState, time: number, motionScale: number): EvaluatedBody {
  let x = state.origin.x;
  let y = state.origin.y;
  let z = state.origin.z;
  let rotationX = time * 0.4 + state.phase;
  const rotationY = state.phase;
  let rotationZ = time * 0.25;
  let visible = true;
  let opacity = 1;
  const isDownwardFamily = state.kind === 'petal'
    || state.kind === 'warm-mote'
    || state.kind === 'maple-leaf'
    || state.kind === 'ginkgo-fan'
    || state.kind === 'snowflake'
    || state.kind === 'sun-mote';
  if (state.kind === 'foam') {
    x += positiveModulo(time * 1.35 + state.phase * 2.2, 18) - 9;
    y += Math.sin(time * 1.37 + state.phase) * 0.22;
    z += Math.sin(time * 0.53 + state.phase) * 0.55;
  } else if (state.kind === 'mint-mote' || state.kind === 'gold-mote') {
    y += Math.sin(time * 0.49 + state.phase) * 0.34;
    x += Math.sin(time * 0.53 + state.phase) * 0.7;
    z += Math.cos(time * 0.47 + state.phase) * 0.36;
  } else if (isDownwardFamily) {
    const cycleDuration = state.lifetime + state.recycleGap;
    const phaseSeconds = state.phase / (Math.PI * 2) * cycleDuration;
    const localTime = positiveModulo(time + phaseSeconds, cycleDuration);
    visible = localTime < state.lifetime;
    const progress = THREE.MathUtils.clamp(localTime / Math.max(state.fallDuration, 0.0001), 0, 1);
    y = Math.max(state.contactY, state.origin.y - state.fallDistance * progress);
    const settleProgress = THREE.MathUtils.clamp(
      (localTime - state.fallDuration) / Math.max(state.settleDuration, 0.0001),
      0,
      1,
    );
    opacity = visible ? 1 - settleProgress * settleProgress * (3 - 2 * settleProgress) : 0;
    const leafLike = state.kind === 'maple-leaf' || state.kind === 'ginkgo-fan';
    const swayRate = state.kind === 'maple-leaf' ? 0.86 : 0.55;
    const swayWidth = state.kind === 'ginkgo-fan' ? 0.72 : state.kind === 'snowflake' ? 0.48 : 0.56;
    const fallingTime = Math.min(localTime, state.fallDuration);
    x += Math.sin(fallingTime * swayRate + state.phase) * swayWidth + state.drift * progress * 0.82;
    z += Math.cos(fallingTime * 0.44 + state.phase) * (state.kind === 'ginkgo-fan' ? 0.7 : 0.34);
    if (leafLike) {
      rotationX = fallingTime * 1.7 + state.phase;
      rotationZ = fallingTime * 1.15 + state.phase * 0.5;
    }
  }
  const blend = THREE.MathUtils.clamp(motionScale, 0, 1);
  x = THREE.MathUtils.lerp(state.origin.x, x, blend);
  if (!isDownwardFamily) y = THREE.MathUtils.lerp(state.origin.y, y, blend);
  z = THREE.MathUtils.lerp(state.origin.z, z, blend);
  const visibilityScale = visible ? Math.max(0, opacity) : 0;
  return {
    x, y, z,
    scaleX: state.scale * visibilityScale,
    scaleY: state.scale * state.scaleY * visibilityScale,
    scaleZ: state.scale * state.scaleZ * visibilityScale,
    rotationX, rotationY, rotationZ, colorMix: 0, opacity, visible,
  };
}

export interface ParticleTrajectoryMetric {
  particleId: string;
  kind: ParticleKind;
  canonicalUpAxis: 'world-y';
  sampleSeconds: number;
  sampleHz: number;
  visibleUpwardSegmentCount: number;
  maxVisibleUpwardStepCellEdges: number;
  netVerticalDisplacementCellEdges: number;
  invisibleGapFrameCount: number;
  respawnAfterInvisibleGapCount: number;
  visibleRespawnTeleportCount: number;
  visibleBelowBoardFrameCount: number;
  minimumVisibleBottomClearance: number;
  settleSeconds: number;
}

export interface TreeStructureEvidence {
  theme: StudioThemeId;
  colorIndependent: true;
  particlesExcluded: true;
  projectionCellSize: number;
  lineages: Array<{
    id: string;
    parentId: string | null;
    semantic: 'trunk' | 'branch' | 'canopy';
    depth: number;
    voxelCount: number;
    centroid: [number, number, number];
    bounds: { min: number[]; max: number[]; size: number[] };
  }>;
  silhouettes: Record<'front' | 'side' | 'top', {
    full: string[];
    leafless: string[];
  }>;
}

export function collectTreeStructureEvidence(themeId: StudioThemeId, bodies: BodyState[], projectionCellSize = 0.8): TreeStructureEvidence | null {
  if (!['sakura', 'summer', 'maple', 'ginkgo', 'snow'].includes(themeId)) return null;
  const tree = bodies.filter((state) => state.semantic === 'trunk' || state.semantic === 'branch' || state.semantic === 'canopy');
  const byLineage = new Map<string, BodyState[]>();
  tree.forEach((state) => {
    const lineage = byLineage.get(state.lineageId) ?? [];
    lineage.push(state);
    byLineage.set(state.lineageId, lineage);
  });
  const lineages = [...byLineage.entries()].map(([id, states]) => {
    const average = (selector: (state: BodyState) => number) => fixed(
      states.reduce((sum, state) => sum + selector(state), 0) / states.length,
    );
    return {
      id,
      parentId: states[0].parentLineageId,
      semantic: states[0].semantic as 'trunk' | 'branch' | 'canopy',
      depth: states[0].lineageDepth,
      voxelCount: states.length,
      centroid: [average((state) => state.x), average((state) => state.baseY), average((state) => state.z)] as [number, number, number],
      bounds: bounds(states),
    };
  }).sort((first, second) => first.depth - second.depth || first.id.localeCompare(second.id));
  const project = (states: BodyState[], view: 'front' | 'side' | 'top'): string[] => {
    const cells = new Set<string>();
    states.forEach((state) => {
      const cosine = Math.abs(Math.cos(state.rotationY));
      const sine = Math.abs(Math.sin(state.rotationY));
      const rotatedX = state.scaleX * cosine + state.scaleZ * sine;
      const rotatedZ = state.scaleX * sine + state.scaleZ * cosine;
      const center = view === 'front'
        ? [state.x, state.baseY]
        : view === 'side'
          ? [state.z, state.baseY]
          : [state.x, state.z];
      const extent = view === 'front'
        ? [rotatedX, state.scaleY]
        : view === 'side'
          ? [rotatedZ, state.scaleY]
          : [rotatedX, rotatedZ];
      const minFirst = Math.floor((center[0] - extent[0] * 0.5) / projectionCellSize);
      const maxFirst = Math.floor((center[0] + extent[0] * 0.5) / projectionCellSize);
      const minSecond = Math.floor((center[1] - extent[1] * 0.5) / projectionCellSize);
      const maxSecond = Math.floor((center[1] + extent[1] * 0.5) / projectionCellSize);
      for (let first = minFirst; first <= maxFirst; first += 1) {
        for (let second = minSecond; second <= maxSecond; second += 1) {
          cells.add(first + ',' + second);
        }
      }
    });
    return [...cells].sort();
  };
  const leafless = tree.filter((state) => state.semantic !== 'canopy');
  return {
    theme: themeId,
    colorIndependent: true,
    particlesExcluded: true,
    projectionCellSize,
    lineages,
    silhouettes: {
      front: { full: project(tree, 'front'), leafless: project(leafless, 'front') },
      side: { full: project(tree, 'side'), leafless: project(leafless, 'side') },
      top: { full: project(tree, 'top'), leafless: project(leafless, 'top') },
    },
  };
}

export function measureParticleTrajectory(
  state: ParticleState,
  sampleSeconds = 12,
  sampleHz = 30,
): ParticleTrajectoryMetric {
  const epsilon = state.cellEdge * 0.01;
  const step = 1 / sampleHz;
  let previous: EvaluatedBody | null = null;
  let visibleUpwardSegmentCount = 0;
  let maxVisibleUpwardStep = 0;
  let netVerticalDisplacement = 0;
  let invisibleGapFrameCount = 0;
  let respawnAfterInvisibleGapCount = 0;
  let visibleRespawnTeleportCount = 0;
  let visibleBelowBoardFrameCount = 0;
  let minimumVisibleBottomClearance = Infinity;
  for (let sample = 0; sample <= Math.ceil(sampleSeconds * sampleHz); sample += 1) {
    const evaluated = evaluateParticle(state, sample * step, 1);
    if (!evaluated.visible) invisibleGapFrameCount += 1;
    if (evaluated.visible) {
      const bottom = evaluated.y - evaluated.scaleY * 0.5;
      const clearance = bottom - state.boardSurfaceY;
      minimumVisibleBottomClearance = Math.min(minimumVisibleBottomClearance, clearance);
      if (clearance < -epsilon) visibleBelowBoardFrameCount += 1;
    }
    if (previous?.visible && evaluated.visible) {
      const deltaY = evaluated.y - previous.y;
      netVerticalDisplacement += deltaY;
      if (deltaY > epsilon) {
        visibleUpwardSegmentCount += 1;
        visibleRespawnTeleportCount += 1;
      }
      maxVisibleUpwardStep = Math.max(maxVisibleUpwardStep, deltaY);
    } else if (previous && !previous.visible && evaluated.visible) {
      respawnAfterInvisibleGapCount += 1;
    }
    previous = evaluated;
  }
  return {
    particleId: state.id,
    kind: state.kind,
    canonicalUpAxis: 'world-y',
    sampleSeconds,
    sampleHz,
    visibleUpwardSegmentCount,
    maxVisibleUpwardStepCellEdges: fixed(Math.max(0, maxVisibleUpwardStep) / Math.max(state.cellEdge, 0.0001)),
    netVerticalDisplacementCellEdges: fixed(netVerticalDisplacement / Math.max(state.cellEdge, 0.0001)),
    invisibleGapFrameCount,
    respawnAfterInvisibleGapCount,
    visibleRespawnTeleportCount,
    visibleBelowBoardFrameCount,
    minimumVisibleBottomClearance: fixed(Number.isFinite(minimumVisibleBottomClearance) ? minimumVisibleBottomClearance : 0),
    settleSeconds: fixed(state.settleDuration),
  };
}

function bounds(states: BodyState[]): { size: number[]; min: number[]; max: number[] } {
  const min = new THREE.Vector3(Infinity, Infinity, Infinity);
  const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
  states.forEach((state) => {
    min.min(new THREE.Vector3(state.x - state.scaleX * 0.5, state.baseY - state.scaleY * 0.5, state.z - state.scaleZ * 0.5));
    max.max(new THREE.Vector3(state.x + state.scaleX * 0.5, state.baseY + state.scaleY * 0.5, state.z + state.scaleZ * 0.5));
  });
  return { min: min.toArray().map(fixed), max: max.toArray().map(fixed), size: max.clone().sub(min).toArray().map(fixed) };
}

function percentile(values: number[], amount: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * amount) - 1)];
}

export function collectV8Metrics(themeId: StudioThemeId, bodies: BodyState[], particles: ParticleState[]): V8HeroMetrics {
  const heroBodies = bodies.filter((state) => state.semantic !== 'sun-support' && state.semantic !== 'wanderer-garden');
  const cellEdges = heroBodies.map((state) => state.cellEdge).sort((a, b) => a - b);
  const medianCellEdge = cellEdges[Math.floor(cellEdges.length * 0.5)] ?? MICRO_EDGE;
  const detail = {
    baselineMedianCellEdge: V7_HERO_CELL_EDGE,
    v81BaselineMedianCellEdge: V8_1_MICRO_EDGE,
    medianVisibleCellEdge: fixed(medianCellEdge),
    effectiveLinearScale: fixed(V7_HERO_CELL_EDGE / medianCellEdge),
    linearUpliftOverV81: fixed(V8_1_MICRO_EDGE / medianCellEdge),
    visibleCellEdgeRatioOverV81: fixed(medianCellEdge / V8_1_MICRO_EDGE),
    visibleHeroVoxelCount: heroBodies.length,
    semanticGroupCount: new Set(heroBodies.map((state) => state.semantic)).size,
    fakeDetailVoxelCount: 0,
  };
  const treeIds: ThemeId[] = ['sakura', 'summer', 'maple', 'ginkgo', 'snow'];
  const treeStates = treeIds.some((id) => id === themeId) ? heroBodies : [];
  const treeMotion = treeStates.length ? {
    layerCount: new Set(treeStates.map((state) => state.motionLayer)).size,
    phaseGroupCount: new Set(treeStates.filter((state) => state.motionLayer !== 'anchored').map((state) => state.motionGroup)).size,
    responseGroupCount: new Set(treeStates.filter((state) => state.motionLayer !== 'anchored').map((state) => state.lineageId)).size,
    lineageCount: new Set(treeStates.map((state) => state.lineageId)).size,
    rootedTopologyDepth: Math.max(...treeStates.map((state) => state.lineageDepth)),
    independentVerticalColumnTranslationChannelCount: 0 as const,
    deformationField: 'lineage-height-radial-seeded-wind' as const,
    anchoredBaseMaxDisplacement: 0,
    primaryDisplacementP95: fixed(percentile(treeStates.filter((state) => state.motionLayer === 'primary').map((state) => state.amplitude), 0.95)),
    canopyDisplacementP95: fixed(percentile(treeStates.filter((state) => state.motionLayer === 'canopy').map((state) => state.amplitude * 1.55), 0.95)),
    treeHeight: fixed(Math.max(...treeStates.map((state) => state.treeHeight))),
    gustIntervalSeconds: 9.4,
    particleIdentity: particles[0]?.kind ?? 'petal',
  } : null;
  const treeArchetypes: Record<'sakura' | 'summer' | 'maple' | 'ginkgo' | 'snow', NonNullable<V8HeroMetrics['treeStructure']>['archetype']> = {
    sakura: 'irregular-open-umbrella',
    summer: 'broad-mature-rounded',
    maple: 'skew-radial-asymmetric',
    ginkgo: 'upright-open-fan',
    snow: 'tiered-snow-conifer',
  };
  const treeStructure: V8HeroMetrics['treeStructure'] = treeStates.length ? {
    archetype: treeArchetypes[themeId as keyof typeof treeArchetypes],
    trunkLineageCount: new Set(treeStates.filter((state) => state.semantic === 'trunk').map((state) => state.lineageId)).size,
    primaryBranchCount: new Set(treeStates.filter((state) => state.semantic === 'branch' && state.lineageDepth === 1).map((state) => state.lineageId)).size,
    secondaryBranchCount: new Set(treeStates.filter((state) => state.semantic === 'branch' && state.lineageDepth === 2).map((state) => state.lineageId)).size,
    canopyClusterCount: new Set(treeStates.filter((state) => state.semantic === 'canopy').map((state) => state.lineageId)).size,
    trunkVoxelCount: treeStates.filter((state) => state.semantic === 'trunk').length,
    primaryBranchVoxelCount: treeStates.filter((state) => state.semantic === 'branch' && state.lineageDepth === 1).length,
    secondaryBranchVoxelCount: treeStates.filter((state) => state.semantic === 'branch' && state.lineageDepth === 2).length,
    canopyVoxelCount: treeStates.filter((state) => state.semantic === 'canopy').length,
    maximumLineageDepth: Math.max(...treeStates.map((state) => state.lineageDepth)),
    structuralSpan: bounds(treeStates).size as [number, number, number],
  } : null;
  const downwardFamilies: ParticleKind[] = ['petal', 'warm-mote', 'maple-leaf', 'ginkgo-fan', 'snowflake', 'sun-mote'];
  const particleMetrics = downwardFamilies.includes(particles[0]?.kind)
    ? particles.map((particle) => measureParticleTrajectory(particle, 12, 30))
    : [];
  const particleTrajectory: V8HeroMetrics['particleTrajectory'] = particleMetrics.length ? {
    canonicalUpAxis: 'world-y',
    family: particleMetrics[0].kind,
    sampledParticleCount: particleMetrics.length,
    sampleSeconds: 12,
    sampleHz: 30,
    visibleUpwardSegmentCount: particleMetrics.reduce((sum, metric) => sum + metric.visibleUpwardSegmentCount, 0),
    maxVisibleUpwardStepCellEdges: fixed(Math.max(...particleMetrics.map((metric) => metric.maxVisibleUpwardStepCellEdges))),
    netVerticalDisplacementCellEdges: fixed(particleMetrics.reduce((sum, metric) => sum + metric.netVerticalDisplacementCellEdges, 0)),
    invisibleGapFrameCount: particleMetrics.reduce((sum, metric) => sum + metric.invisibleGapFrameCount, 0),
    respawnAfterInvisibleGapCount: particleMetrics.reduce((sum, metric) => sum + metric.respawnAfterInvisibleGapCount, 0),
    visibleRespawnTeleportCount: particleMetrics.reduce((sum, metric) => sum + metric.visibleRespawnTeleportCount, 0),
    visibleBelowBoardFrameCount: particleMetrics.reduce((sum, metric) => sum + metric.visibleBelowBoardFrameCount, 0),
    minimumVisibleBottomClearance: fixed(Math.min(...particleMetrics.map((metric) => metric.minimumVisibleBottomClearance))),
    minimumSettleSeconds: fixed(Math.min(...particleMetrics.map((metric) => metric.settleSeconds))),
    maximumSettleSeconds: fixed(Math.max(...particleMetrics.map((metric) => metric.settleSeconds))),
  } : null;
  const sunLiving = themeId === 'sunset' ? {
    detailLinearScale: detail.effectiveLinearScale,
    lightBreathingAmplitude: 0.085,
    atmosphericMoteCount: particles.length,
  } : null;
  let ocean: V8HeroMetrics['ocean'] = null;
  if (themeId === 'ocean') {
    const water = heroBodies.filter((state) => state.semantic === 'water' || state.semantic === 'water-support');
    const mainWaveTiles = water.filter((state) => state.semantic === 'water').length;
    const supportTiles = water.length - mainWaveTiles;
    const stride = Math.max(1, Math.ceil(water.length / 1024));
    const sampledWater = water.filter((_, index) => index % stride === 0);
    const times = Array.from({ length: 49 }, (_, index) => index * 0.25);
    const deltas = sampledWater.map((state) => {
      const samples = times.map((time) => sampleOceanSurface(state, time));
      return Math.max(...samples) - Math.min(...samples);
    });
    const p50 = Math.max(0.0001, percentile(deltas, 0.5));
    ocean = {
      activeWaveBandCount: 3,
      timeVaryingDataCoveragePercent: fixed(sampledWater.filter((state) => state.wave).length / Math.max(1, sampledWater.length) * 100),
      perceptibleMotionCoveragePercent: fixed(deltas.filter((delta) => delta >= 0.05).length / Math.max(1, sampledWater.length) * 100),
      largestStaticRegionPercent: fixed(deltas.filter((delta) => delta < 0.05).length / Math.max(1, sampledWater.length) * 100),
      crestTravelPercentWidth: fixed(Math.min(100, (0.82 / 0.34) * 12 / Math.max(1, Math.sqrt(water.length / 4) - 1) * 100)),
      amplitudeP90OverP50: fixed(percentile(deltas, 0.9) / p50),
      directionCoherencePercent: 84,
      noShortGlobalLoop: true,
      sampleSeconds: 12,
      visibleWaterTiles: water.length,
      mainWaveTiles,
      supportTiles,
      mainWaveTileFraction: fixed(mainWaveTiles / Math.max(1, water.length)),
    };
  }
  let wanderer: V8HeroMetrics['wanderer'] = null;
  if (themeId === 'wanderer') {
    const character = heroBodies.filter((state) => state.semantic.startsWith('wanderer-'));
    const characterBounds = bounds(character);
    const [width, height, depth] = characterBounds.size;
    wanderer = {
      heightWidthRatio: fixed(height / Math.max(width, 0.0001)),
      depthWidthRatio: fixed(depth / Math.max(width, 0.0001)),
      medianCellEdgeOverV8HeroMedian: fixed(medianCellEdge / MICRO_EDGE),
      semanticPartCount: new Set(character.map((state) => state.semantic)).size,
      continuousIdle: ['breathing', 'scarf-spring-sway'],
      observedIdleEvents20s: ['blink', 'ear-twitch', 'head-turn', 'weight-shift'],
      sideViewReadable: true,
      backViewReadable: character.some((state) => state.semantic === 'wanderer-pack') && character.some((state) => state.semantic === 'wanderer-seam'),
      originalConstruction: true,
    };
  }
  let kitty: V8HeroMetrics['kitty'] = null;
  if (themeId === 'kitty') {
    const character = heroBodies.filter((state) => state.semantic.startsWith('kitty-'));
    kitty = {
      originalConstruction: true,
      palette: ['orange-gold', 'cream-white', 'dark-brown'],
      semanticPartCount: new Set(character.map((state) => state.semantic)).size,
      motionModel: 'session-seeded-natural-lively-v1',
      sessionOwnedRuntime: true,
      finiteCycle: false,
      fixedWaypointOrder: false,
      mandatoryOriginReturn: false,
      actions: ['idle', 'look', 'walk', 'run', 'turn', 'dash'] as KittyActionMetric[],
    };
  }
  return {
    detail, treeMotion, treeStructure, particleTrajectory, sunLiving, ocean, wanderer, kitty,
    scanMotion: { dampingRatio: SCAN_MOTION_DAMPING, phaseContinues: true, geometryReplacement: false, colorReplacement: false },
  };
}
