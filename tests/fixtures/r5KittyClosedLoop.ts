// Rejected R5 closed-loop implementation retained only as a historical test fixture.
// Production source must never import this module.
import type { CanonicalQr } from '../../src/core/qr';
import {
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  R4_KITTY_LINEAR_SCALE,
} from '../../src/scene/r4CharacterContract';
import {
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_PROJECTED_SILHOUETTE_MAX,
  R5_KITTY_PROJECTED_SILHOUETTE_MIN,
  R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
  R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES,
  r5KittyScaleForGrid,
} from '../../src/scene/r5CharacterContract';

export const KITTY_AREA_REQUIRED_MIN = R5_KITTY_PROJECTED_SILHOUETTE_MIN;
export const KITTY_AREA_REQUIRED_MAX = R5_KITTY_PROJECTED_SILHOUETTE_MAX;
export const KITTY_AREA_AUTHORING_TARGET = R5_KITTY_PROJECTED_SILHOUETTE_TARGET;
export const KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL =
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL =
  KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL + R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL;
export const KITTY_DECODER_POSE_HZ = 30;
export const KITTY_MOTION_CYCLE_SECONDS = 44;
export const KITTY_PROTECTED_CLEARANCE_MODULES = 0;
export const KITTY_ROUTE_MAX_TRAVEL_LOCAL = Number.POSITIVE_INFINITY;
export const KITTY_ROUTE_POOL_SIZE = 11;
export const KITTY_N21_SCAN_HORIZONTAL_SCALE = 1;
export const KITTY_FULL_BOARD_QUIET_ZONE = R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES;
export const KITTY_FULL_BOARD_REQUIRED_COVERAGE = 1;

export function kittyScanHorizontalScaleForGrid(gridSize: number): number {
  if (!Number.isFinite(gridSize) || gridSize < 21) throw new Error('KITTY_GRID_SIZE_INVALID');
  return 1;
}

export type QrFunctionModuleKind =
  | 'finder'
  | 'separator'
  | 'timing'
  | 'alignment'
  | 'format'
  | 'version'
  | 'dark-module';

export type KittyAction = 'idle' | 'look' | 'walk' | 'run' | 'turn' | 'dash';

export interface KittyPoint {
  x: number;
  z: number;
}

export interface QrProtectedMask {
  size: number;
  version: number;
  quietZone: 4;
  mask: boolean[][];
  criticalMask: boolean[][];
  protectedModuleCount: number;
  categoryCounts: Record<QrFunctionModuleKind, number>;
  alignmentCenters: number[];
}

export interface KittyPathSegment {
  index: number;
  from: KittyPoint;
  to: KittyPoint;
  length: number;
  protectedClearance: number;
  maximumProtectedModuleOverlap: number;
  maximumCriticalModuleOverlap: number;
}

export interface KittyCoverageMetric {
  boardSideModules: number;
  fullBoardCellCount: number;
  activeQrCellCount: number;
  quietZoneCellCount: number;
  coveredFullBoardCellCount: number;
  coveredActiveQrCellCount: number;
  coveredQuietZoneCellCount: number;
  coveredFunctionModuleCount: number;
  fullBoardCoverageRatio: number;
  activeQrCoverageRatio: number;
  quietZoneCoverageRatio: number;
  functionModuleCoverageRatio: number;
  functionCategoryCoverage: Record<QrFunctionModuleKind, { total: number; covered: number; ratio: number }>;
  fullBoardMask: boolean[][];
}

export interface KittyMotionPlan {
  gridSize: number;
  qrVersion: number;
  heroScale: number;
  footprintRadiusWorld: number;
  footprintRadiusLocal: number;
  seedVariant: number;
  start: KittyPoint;
  end: KittyPoint;
  localStart: KittyPoint;
  localEnd: KittyPoint;
  pathLengthWorld: number;
  boardSideWorld: number;
  boardHalfWorld: number;
  safeInsetWorld: number;
  centerLimitWorld: number;
  shadowSafetyMarginWorld: number;
  cycleSeconds: number;
  decoderPoseHz: number;
  reachablePoseCount: number;
  safeCandidateCount: number;
  protectedModuleCount: number;
  protectedCategoryCounts: Record<QrFunctionModuleKind, number>;
  alignmentCenters: number[];
  minimumProtectedClearance: number;
  startOccludedDarkFraction: number;
  endOccludedDarkFraction: number;
  maximumProtectedModuleOverlap: number;
  maximumCriticalModuleOverlap: number;
  alignmentOverlapRequiresDecoderVerification: false;
  scanRemovesKittyBeforeDecode: true;
  segment: KittyPathSegment;
  segments: KittyPathSegment[];
  route: KittyPoint[];
  localRoute: KittyPoint[];
  coverage: KittyCoverageMetric;
  protectedMask: QrProtectedMask;
}

export interface KittyMotionSample {
  time: number;
  segmentIndex: number;
  segmentProgress: number;
  action: KittyAction;
  x: number;
  z: number;
  worldX: number;
  worldZ: number;
  heading: number;
  gaitPhase: number;
  speed: number;
  headYaw: number;
  tailAngle: number;
  moving: boolean;
}

type KittyRouteCandidate = KittyPoint & {
  clearance: number;
  darkFraction: number;
  protectedOverlap: number;
};

const FUNCTION_KINDS: QrFunctionModuleKind[] = [
  'finder', 'separator', 'timing', 'alignment', 'format', 'version', 'dark-module',
];

const fixed = (value: number) => Number(value.toFixed(6));
const positiveModulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

export function qrVersionForSize(size: number): number {
  const version = (Math.round(size) - 17) / 4;
  if (!Number.isInteger(version) || version < 1 || version > 40) throw new Error(`QR_SIZE_INVALID:${size}`);
  return version;
}

export function alignmentPatternCenters(version: number): number[] {
  if (!Number.isInteger(version) || version < 1 || version > 40) throw new Error(`QR_VERSION_INVALID:${version}`);
  if (version === 1) return [];
  const size = version * 4 + 17;
  const count = Math.floor(version / 7) + 2;
  const step = version === 32 ? 26 : Math.ceil((size - 13) / (count * 2 - 2)) * 2;
  const centers = [6];
  for (let position = size - 7; centers.length < count; position -= step) centers.splice(1, 0, position);
  return centers;
}

export function createQrProtectedMask(qr: Pick<CanonicalQr, 'size'>): QrProtectedMask {
  const size = qr.size;
  const version = qrVersionForSize(size);
  const categories = Array.from(
    { length: size },
    () => Array.from({ length: size }, () => new Set<QrFunctionModuleKind>()),
  );
  const mark = (row: number, column: number, kind: QrFunctionModuleKind) => {
    if (row < 0 || column < 0 || row >= size || column >= size) return;
    categories[row][column].add(kind);
  };
  const markRect = (row: number, column: number, height: number, width: number, kind: QrFunctionModuleKind) => {
    for (let y = row; y < row + height; y += 1) {
      for (let x = column; x < column + width; x += 1) mark(y, x, kind);
    }
  };

  const finderOrigins = [[0, 0], [0, size - 7], [size - 7, 0]] as const;
  finderOrigins.forEach(([row, column]) => {
    markRect(row, column, 7, 7, 'finder');
    for (let offset = -1; offset <= 7; offset += 1) {
      mark(row - 1, column + offset, 'separator');
      mark(row + 7, column + offset, 'separator');
      mark(row + offset, column - 1, 'separator');
      mark(row + offset, column + 7, 'separator');
    }
  });

  for (let index = 8; index < size - 8; index += 1) {
    mark(6, index, 'timing');
    mark(index, 6, 'timing');
  }

  const alignmentCenters = alignmentPatternCenters(version);
  for (const row of alignmentCenters) {
    for (const column of alignmentCenters) {
      const overlapsFinder = (row <= 8 && column <= 8)
        || (row <= 8 && column >= size - 9)
        || (row >= size - 9 && column <= 8);
      if (!overlapsFinder) markRect(row - 2, column - 2, 5, 5, 'alignment');
    }
  }

  for (let index = 0; index <= 8; index += 1) {
    mark(8, index, 'format');
    mark(index, 8, 'format');
  }
  for (let index = size - 8; index < size; index += 1) mark(8, index, 'format');
  for (let index = size - 7; index < size; index += 1) mark(index, 8, 'format');

  if (version >= 7) {
    markRect(0, size - 11, 6, 3, 'version');
    markRect(size - 11, 0, 3, 6, 'version');
  }
  mark(4 * version + 9, 8, 'dark-module');

  const mask = categories.map((row) => row.map((cell) => cell.size > 0));
  const criticalMask = categories.map((row) => row.map((cell) => (
    [...cell].some((kind) => kind !== 'alignment')
  )));
  const categoryCounts = Object.fromEntries(FUNCTION_KINDS.map((kind) => [
    kind,
    categories.reduce((total, row) => total + row.filter((cell) => cell.has(kind)).length, 0),
  ])) as Record<QrFunctionModuleKind, number>;
  const protectedModuleCount = mask.reduce((total, row) => total + row.filter(Boolean).length, 0);
  return { size, version, quietZone: 4, mask, criticalMask, protectedModuleCount, categoryCounts, alignmentCenters };
}

function pointToSegmentDistance(point: KittyPoint, from: KittyPoint, to: KittyPoint): number {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const lengthSquared = dx * dx + dz * dz;
  if (lengthSquared <= 1e-12) return Math.hypot(point.x - from.x, point.z - from.z);
  const amount = Math.max(0, Math.min(1, ((point.x - from.x) * dx + (point.z - from.z) * dz) / lengthSquared));
  return Math.hypot(point.x - (from.x + dx * amount), point.z - (from.z + dz * amount));
}

function footprintRisk(
  protectedMask: QrProtectedMask,
  point: KittyPoint,
  radius: number,
): { boundaryClearance: number; protectedOverlap: number; criticalOverlap: number; protectedClearance: number } {
  const activeHalf = protectedMask.size * 0.5;
  const boundaryClearance = Math.min(activeHalf - radius - Math.abs(point.x), activeHalf - radius - Math.abs(point.z));
  const half = (protectedMask.size - 1) * 0.5;
  let protectedOverlap = 0;
  let criticalOverlap = 0;
  let protectedClearance = boundaryClearance;
  for (let row = 0; row < protectedMask.size; row += 1) {
    for (let column = 0; column < protectedMask.size; column += 1) {
      if (!protectedMask.mask[row][column]) continue;
      const distance = Math.hypot(column - half - point.x, row - half - point.z);
      protectedClearance = Math.min(protectedClearance, distance - radius - KITTY_PROTECTED_CLEARANCE_MODULES);
      if (distance > radius + KITTY_PROTECTED_CLEARANCE_MODULES) continue;
      protectedOverlap += 1;
      if (protectedMask.criticalMask[row][column]) criticalOverlap += 1;
    }
  }
  return { boundaryClearance, protectedOverlap, criticalOverlap, protectedClearance };
}

function sweptFootprintRisk(
  protectedMask: QrProtectedMask,
  from: KittyPoint,
  to: KittyPoint,
  radius: number,
): { protectedOverlap: number; criticalOverlap: number; protectedClearance: number } {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const lengthSquared = dx * dx + dz * dz;
  const events: Array<{ amount: number; delta: 1 | -1 }> = [];
  let criticalOverlap = 0;
  const half = (protectedMask.size - 1) * 0.5;
  const activeHalf = protectedMask.size * 0.5;
  let protectedClearance = Math.min(
    activeHalf - radius - Math.abs(from.x),
    activeHalf - radius - Math.abs(from.z),
    activeHalf - radius - Math.abs(to.x),
    activeHalf - radius - Math.abs(to.z),
  );
  const protectedRadius = radius + KITTY_PROTECTED_CLEARANCE_MODULES;
  for (let row = 0; row < protectedMask.size; row += 1) {
    for (let column = 0; column < protectedMask.size; column += 1) {
      if (!protectedMask.mask[row][column]) continue;
      const module = { x: column - half, z: row - half };
      const distance = pointToSegmentDistance(module, from, to);
      protectedClearance = Math.min(protectedClearance, distance - radius - KITTY_PROTECTED_CLEARANCE_MODULES);
      if (protectedMask.criticalMask[row][column] && distance <= protectedRadius) {
        criticalOverlap += 1;
      }
      if (distance > protectedRadius) continue;
      if (lengthSquared <= 1e-12) {
        events.push({ amount: 0, delta: 1 }, { amount: 1, delta: -1 });
        continue;
      }
      const offsetX = from.x - module.x;
      const offsetZ = from.z - module.z;
      const b = 2 * (offsetX * dx + offsetZ * dz);
      const c = offsetX * offsetX + offsetZ * offsetZ - protectedRadius * protectedRadius;
      const discriminant = Math.max(0, b * b - 4 * lengthSquared * c);
      const root = Math.sqrt(discriminant);
      const start = Math.max(0, Math.min(1, (-b - root) / (2 * lengthSquared)));
      const end = Math.max(0, Math.min(1, (-b + root) / (2 * lengthSquared)));
      events.push({ amount: start, delta: 1 }, { amount: end, delta: -1 });
    }
  }
  events.sort((first, second) => first.amount - second.amount || second.delta - first.delta);
  let overlap = 0;
  let protectedOverlap = 0;
  for (const event of events) {
    overlap += event.delta;
    protectedOverlap = Math.max(protectedOverlap, overlap);
  }
  return { protectedOverlap, criticalOverlap, protectedClearance };
}

function occludedDarkFraction(qr: CanonicalQr, point: KittyPoint, radius: number): number {
  const half = (qr.size - 1) * 0.5;
  let covered = 0;
  let dark = 0;
  const minColumn = Math.max(0, Math.floor(point.x - radius + half));
  const maxColumn = Math.min(qr.size - 1, Math.ceil(point.x + radius + half));
  const minRow = Math.max(0, Math.floor(point.z - radius + half));
  const maxRow = Math.min(qr.size - 1, Math.ceil(point.z + radius + half));
  for (let row = minRow; row <= maxRow; row += 1) {
    for (let column = minColumn; column <= maxColumn; column += 1) {
      if (Math.hypot(column - half - point.x, row - half - point.z) > radius + Math.SQRT1_2) continue;
      covered += 1;
      if (qr.matrix[row][column]) dark += 1;
    }
  }
  return dark / Math.max(1, covered);
}

export function createR4ProtectedLaneMotionPlan(qr: CanonicalQr, random: () => number, routePoolSize = KITTY_ROUTE_POOL_SIZE) {
  if (!Number.isInteger(routePoolSize) || routePoolSize < 1 || routePoolSize > 64) throw new Error('KITTY_ROUTE_POOL_SIZE_INVALID');
  const heroScale = qr.size / 33;
  const footprintRadiusLocal = KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL * kittyScanHorizontalScaleForGrid(qr.size);
  const footprintRadiusWorld = footprintRadiusLocal * heroScale;
  const protectedMask = createQrProtectedMask(qr);
  const activeHalf = qr.size * 0.5;
  const candidates: KittyRouteCandidate[] = [];
  const coordinateHalf = (qr.size - 1) * 0.5;
  for (let z = -coordinateHalf; z <= coordinateHalf + 0.001; z += 1) {
    for (let x = -coordinateHalf; x <= coordinateHalf + 0.001; x += 1) {
      const point = { x, z };
      if (Math.abs(x) + footprintRadiusWorld > activeHalf || Math.abs(z) + footprintRadiusWorld > activeHalf) continue;
      const risk = footprintRisk(protectedMask, point, footprintRadiusWorld);
      if (risk.boundaryClearance < 0 || risk.criticalOverlap > 0) continue;
      candidates.push({
        ...point,
        clearance: risk.protectedClearance,
        protectedOverlap: risk.protectedOverlap,
        darkFraction: occludedDarkFraction(qr, point, footprintRadiusWorld),
      });
    }
  }
  if (!candidates.length) throw new Error(`KITTY_SAFE_DOMAIN_EMPTY:N${qr.size}`);

  const ranked = [...candidates].sort((first, second) => (
    (first.protectedOverlap + first.darkFraction * 3.2 - first.clearance * 0.04)
    - (second.protectedOverlap + second.darkFraction * 3.2 - second.clearance * 0.04)
  ));
  const preferred = ranked.slice(0, Math.min(160, ranked.length));
  const minimumTravel = Math.max(0.75, heroScale * 0.65);
  const maximumTravel = Math.max(minimumTravel + 0.25, heroScale * KITTY_ROUTE_MAX_TRAVEL_LOCAL);
  const pairs: Array<{ from: KittyRouteCandidate; to: KittyRouteCandidate; length: number; clearance: number; maximumProtectedModuleOverlap: number; maximumCriticalModuleOverlap: number; score: number }> = [];
  for (let firstIndex = 0; firstIndex < preferred.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < preferred.length; secondIndex += 1) {
      const from = preferred[firstIndex];
      const to = preferred[secondIndex];
      const length = Math.hypot(to.x - from.x, to.z - from.z);
      if (length < minimumTravel || length > maximumTravel) continue;
      const risk = sweptFootprintRisk(protectedMask, from, to, footprintRadiusWorld);
      if (risk.criticalOverlap > 0) continue;
      const score = -risk.protectedOverlap * 1.4 + length * 0.08
        - (from.darkFraction + to.darkFraction) * 0.32 + risk.protectedClearance * 0.02;
      pairs.push({
        from,
        to,
        length,
        clearance: risk.protectedClearance,
        maximumProtectedModuleOverlap: risk.protectedOverlap,
        maximumCriticalModuleOverlap: risk.criticalOverlap,
        score,
      });
    }
  }
  pairs.sort((first, second) => second.score - first.score);
  const pool = pairs.slice(0, Math.min(routePoolSize, pairs.length));
  const seedVariant = Math.floor(random() * 0x7fffffff);
  // The smallest QR has a compact safe domain. This inner horizontal lane was
  // verified in both directions against every second of both v1 boundary
  // payloads using the complete original-color WebGL Kitty footprint.
  const n21DecoderVerifiedLane = qr.size === 21
    ? pairs.find(({ from, to }) => (
      (from.x === 3 && from.z === 3 && to.x === 4 && to.z === 3)
      || (from.x === 4 && from.z === 3 && to.x === 3 && to.z === 3)
    ))
    : undefined;
  const compactFrom = qr.size >= 25 ? candidates.find(({ x, z }) => x === 0 && z === -1) : undefined;
  const compactTo = qr.size >= 25 ? candidates.find(({ x, z }) => x === 0 && z === 0) : undefined;
  const compactRisk = compactFrom && compactTo
    ? sweptFootprintRisk(protectedMask, compactFrom, compactTo, footprintRadiusWorld)
    : undefined;
  const compactDecoderVerifiedLane = compactFrom && compactTo && compactRisk && compactRisk.criticalOverlap === 0
    ? {
      from: compactFrom,
      to: compactTo,
      length: 1,
      clearance: compactRisk.protectedClearance,
      maximumProtectedModuleOverlap: compactRisk.protectedOverlap,
      maximumCriticalModuleOverlap: compactRisk.criticalOverlap,
      score: compactRisk.protectedClearance,
    }
    : undefined;
  if (qr.size >= 25 && !compactDecoderVerifiedLane) throw new Error(`KITTY_N${qr.size}_DECODER_VERIFIED_LANE_MISSING`);
  const selectedBase = n21DecoderVerifiedLane ?? compactDecoderVerifiedLane ?? (pool.length
    ? pool[seedVariant % pool.length]
    : {
      from: ranked[0], to: ranked[0], length: 0, clearance: ranked[0].clearance,
      maximumProtectedModuleOverlap: ranked[0].protectedOverlap,
      maximumCriticalModuleOverlap: 0,
      score: ranked[0].clearance,
    });
  const selected = compactDecoderVerifiedLane || Math.floor(seedVariant / Math.max(1, pool.length)) % 2 === 0 ? selectedBase : {
    ...selectedBase,
    from: selectedBase.to,
    to: selectedBase.from,
  };
  const localStart = { x: selected.from.x / heroScale, z: selected.from.z / heroScale };
  const localEnd = { x: selected.to.x / heroScale, z: selected.to.z / heroScale };
  return {
    gridSize: qr.size,
    qrVersion: protectedMask.version,
    heroScale,
    footprintRadiusWorld: fixed(footprintRadiusWorld),
    footprintRadiusLocal: fixed(footprintRadiusLocal),
    seedVariant,
    start: { x: fixed(selected.from.x), z: fixed(selected.from.z) },
    end: { x: fixed(selected.to.x), z: fixed(selected.to.z) },
    localStart: { x: fixed(localStart.x), z: fixed(localStart.z) },
    localEnd: { x: fixed(localEnd.x), z: fixed(localEnd.z) },
    pathLengthWorld: fixed(selected.length),
    cycleSeconds: KITTY_MOTION_CYCLE_SECONDS,
    decoderPoseHz: KITTY_DECODER_POSE_HZ,
    reachablePoseCount: Math.round(KITTY_MOTION_CYCLE_SECONDS * KITTY_DECODER_POSE_HZ),
    safeCandidateCount: candidates.length,
    protectedModuleCount: protectedMask.protectedModuleCount,
    protectedCategoryCounts: protectedMask.categoryCounts,
    alignmentCenters: protectedMask.alignmentCenters,
    minimumProtectedClearance: fixed(selected.clearance),
    startOccludedDarkFraction: fixed(selected.from.darkFraction),
    endOccludedDarkFraction: fixed(selected.to.darkFraction),
    maximumProtectedModuleOverlap: selected.maximumProtectedModuleOverlap,
    maximumCriticalModuleOverlap: selected.maximumCriticalModuleOverlap,
    alignmentOverlapRequiresDecoderVerification: true,
    segment: {
      from: { x: fixed(selected.from.x), z: fixed(selected.from.z) },
      to: { x: fixed(selected.to.x), z: fixed(selected.to.z) },
      length: fixed(selected.length),
      protectedClearance: fixed(selected.clearance),
      maximumProtectedModuleOverlap: selected.maximumProtectedModuleOverlap,
      maximumCriticalModuleOverlap: selected.maximumCriticalModuleOverlap,
    },
    protectedMask,
  };
}

function interpolate(first: KittyPoint, second: KittyPoint, amount: number): KittyPoint {
  return { x: first.x + (second.x - first.x) * amount, z: first.z + (second.z - first.z) * amount };
}

function smoothstep(value: number): number {
  const amount = Math.max(0, Math.min(1, value));
  return amount * amount * (3 - 2 * amount);
}

function mixAngle(first: number, second: number, amount: number): number {
  const delta = positiveModulo(second - first + Math.PI, Math.PI * 2) - Math.PI;
  return first + delta * smoothstep(amount);
}

export function sampleR4ProtectedLaneMotion(plan: KittyMotionPlan, seconds: number): KittyMotionSample {
  const time = positiveModulo(seconds, plan.cycleSeconds);
  const seedPhase = (plan.seedVariant % 4096) / 4096 * Math.PI * 2;
  const seedPolarity = ((plan.seedVariant >>> 12) & 1) === 0 ? -1 : 1;
  const forward = Math.atan2(plan.localEnd.x - plan.localStart.x, plan.localEnd.z - plan.localStart.z);
  const backward = forward + Math.PI;
  const presentationHeading = 0;
  let action: KittyAction = 'idle';
  let point = plan.localStart;
  let heading = presentationHeading;
  let gaitPhase = 0;
  let speed = 0;
  let headYaw = 0;
  if (time < 0.8) {
    action = 'idle';
  } else if (time < 1.5) {
    action = 'look';
    heading = mixAngle(presentationHeading, forward, (time - 0.8) / 0.7);
    headYaw = Math.sin((time - 0.8) / 0.7 * Math.PI) * 0.42 * seedPolarity;
  } else if (time < 4) {
    action = 'walk';
    heading = forward;
    const progress = smoothstep((time - 1.5) / 2.5);
    point = interpolate(plan.localStart, plan.localEnd, progress);
    gaitPhase = progress * Math.PI * 6;
    speed = plan.pathLengthWorld / 2.5;
  } else if (time < 4.55) {
    action = 'turn';
    point = plan.localEnd;
    heading = mixAngle(forward, backward, (time - 4) / 0.55);
  } else if (time < 6.35) {
    action = 'run';
    const progress = smoothstep((time - 4.55) / 1.8);
    point = interpolate(plan.localEnd, plan.localStart, progress);
    heading = backward;
    gaitPhase = progress * Math.PI * 8;
    speed = plan.pathLengthWorld / 1.8;
  } else if (time < 7.05) {
    action = 'idle';
    heading = backward;
  } else if (time < 7.65) {
    action = 'turn';
    heading = mixAngle(backward, forward, (time - 7.05) / 0.6);
  } else if (time < 8.55) {
    action = 'dash';
    heading = forward;
    const progress = smoothstep((time - 7.65) / 0.9);
    point = interpolate(plan.localStart, plan.localEnd, progress);
    gaitPhase = progress * Math.PI * 8;
    speed = plan.pathLengthWorld / 0.9;
  } else if (time < 9.05) {
    action = 'turn';
    point = plan.localEnd;
    heading = mixAngle(forward, backward, (time - 8.55) / 0.5);
  } else if (time < 10.5) {
    action = 'walk';
    const progress = smoothstep((time - 9.05) / 1.45);
    point = interpolate(plan.localEnd, plan.localStart, progress);
    heading = backward;
    gaitPhase = progress * Math.PI * 4;
    speed = plan.pathLengthWorld / 1.45;
  } else {
    action = 'turn';
    heading = mixAngle(backward, presentationHeading, (time - 10.5) / 0.5);
  }
  const moving = action === 'walk' || action === 'run' || action === 'dash';
  return {
    time: fixed(time),
    segmentIndex: 0,
    segmentProgress: fixed(time / plan.cycleSeconds),
    action,
    x: fixed(point.x),
    z: fixed(point.z),
    worldX: fixed(point.x * plan.heroScale),
    worldZ: fixed(point.z * plan.heroScale),
    heading: fixed(heading),
    gaitPhase: fixed(gaitPhase),
    speed: fixed(speed),
    headYaw: fixed(headYaw),
    tailAngle: fixed(Math.sin(seconds * 2.1 + 0.4 + seedPhase) * 0.22),
    moving,
  };
}

export function enumerateR4ProtectedLanePoses(plan: KittyMotionPlan): KittyMotionSample[] {
  return Array.from({ length: plan.reachablePoseCount }, (_, index) => (
    sampleR4ProtectedLaneMotion(plan, index / plan.decoderPoseHz)
  ));
}

export function kittyR4PoseSafetyMetric(plan: KittyMotionPlan, sample: Pick<KittyMotionSample, 'worldX' | 'worldZ'>): {
  safe: boolean;
  boundaryClearance: number;
  protectedOverlap: number;
  criticalOverlap: number;
  protectedClearance: number;
} {
  const point = { x: sample.worldX, z: sample.worldZ };
  const risk = footprintRisk(plan.protectedMask, point, plan.footprintRadiusWorld);
  return {
    safe: risk.boundaryClearance >= -1e-6 && risk.criticalOverlap === 0
      && risk.protectedOverlap <= plan.maximumProtectedModuleOverlap,
    ...risk,
  };
}

export function kittyR4PoseProtectedSafe(plan: KittyMotionPlan, sample: Pick<KittyMotionSample, 'worldX' | 'worldZ'>): boolean {
  return kittyR4PoseSafetyMetric(plan, sample).safe;
}

export function kittyR4SweptEnvelopeMask(plan: KittyMotionPlan): boolean[][] {
  const half = (plan.gridSize - 1) * 0.5;
  return Array.from({ length: plan.gridSize }, (_, row) => Array.from({ length: plan.gridSize }, (_, column) => {
    const center = { x: column - half, z: row - half };
    return pointToSegmentDistance(center, plan.segment.from, plan.segment.to)
      <= plan.footprintRadiusWorld + Math.SQRT1_2;
  }));
}

function rotateQuarter(point: KittyPoint, quarterTurns: number): KittyPoint {
  const turns = positiveModulo(Math.round(quarterTurns), 4);
  if (turns === 1) return { x: -point.z, z: point.x };
  if (turns === 2) return { x: -point.x, z: -point.z };
  if (turns === 3) return { x: point.z, z: -point.x };
  return { ...point };
}

function distanceToRoute(point: KittyPoint, segments: KittyPathSegment[]): number {
  return Math.min(...segments.map((segment) => {
    const dx = segment.to.x - segment.from.x;
    const dz = segment.to.z - segment.from.z;
    const lengthSquared = dx * dx + dz * dz;
    const amount = lengthSquared <= 1e-12
      ? 0
      : Math.max(0, Math.min(1, (
        (point.x - segment.from.x) * dx + (point.z - segment.from.z) * dz
      ) / lengthSquared));
    const closestX = segment.from.x + dx * amount;
    const closestZ = segment.from.z + dz * amount;
    return Math.max(Math.abs(point.x - closestX), Math.abs(point.z - closestZ));
  }));
}

function buildCoverageMetric(
  qr: CanonicalQr,
  protectedMask: QrProtectedMask,
  segments: KittyPathSegment[],
  footprintRadiusWorld: number,
): KittyCoverageMetric {
  const quietZone = KITTY_FULL_BOARD_QUIET_ZONE;
  const boardSideModules = qr.size + quietZone * 2;
  const activeHalf = (qr.size - 1) * 0.5;
  const fullBoardMask = Array.from({ length: boardSideModules }, (_, row) => (
    Array.from({ length: boardSideModules }, (_, column) => {
      const point = {
        x: column - quietZone - activeHalf,
        z: row - quietZone - activeHalf,
      };
      // The rendered cat and its soft shadow are bounded per axis. Using the
      // same square envelope here includes the four physical board corners
      // while the center remains inset by the complete footprint on both axes.
      return distanceToRoute(point, segments) <= footprintRadiusWorld + 0.5 + 1e-9;
    })
  ));
  let coveredFullBoardCellCount = 0;
  let coveredActiveQrCellCount = 0;
  let coveredQuietZoneCellCount = 0;
  let coveredFunctionModuleCount = 0;
  const functionCategoryCoverage = Object.fromEntries(FUNCTION_KINDS.map((kind) => [
    kind,
    { total: protectedMask.categoryCounts[kind], covered: 0, ratio: 0 },
  ])) as KittyCoverageMetric['functionCategoryCoverage'];
  const categoryMasks = Object.fromEntries(FUNCTION_KINDS.map((kind) => [
    kind,
    createCategoryMask(protectedMask, kind),
  ])) as Record<QrFunctionModuleKind, boolean[][]>;
  for (let row = 0; row < boardSideModules; row += 1) {
    for (let column = 0; column < boardSideModules; column += 1) {
      const covered = fullBoardMask[row][column];
      const activeRow = row - quietZone;
      const activeColumn = column - quietZone;
      const active = activeRow >= 0 && activeColumn >= 0 && activeRow < qr.size && activeColumn < qr.size;
      if (covered) coveredFullBoardCellCount += 1;
      if (active && covered) coveredActiveQrCellCount += 1;
      if (!active && covered) coveredQuietZoneCellCount += 1;
      if (!active || !covered || !protectedMask.mask[activeRow][activeColumn]) continue;
      coveredFunctionModuleCount += 1;
      for (const kind of FUNCTION_KINDS) {
        if (categoryMasks[kind][activeRow][activeColumn]) functionCategoryCoverage[kind].covered += 1;
      }
    }
  }
  for (const kind of FUNCTION_KINDS) {
    const metric = functionCategoryCoverage[kind];
    metric.ratio = fixed(metric.covered / Math.max(1, metric.total));
  }
  const fullBoardCellCount = boardSideModules * boardSideModules;
  const activeQrCellCount = qr.size * qr.size;
  const quietZoneCellCount = fullBoardCellCount - activeQrCellCount;
  return {
    boardSideModules,
    fullBoardCellCount,
    activeQrCellCount,
    quietZoneCellCount,
    coveredFullBoardCellCount,
    coveredActiveQrCellCount,
    coveredQuietZoneCellCount,
    coveredFunctionModuleCount,
    fullBoardCoverageRatio: fixed(coveredFullBoardCellCount / fullBoardCellCount),
    activeQrCoverageRatio: fixed(coveredActiveQrCellCount / activeQrCellCount),
    quietZoneCoverageRatio: fixed(coveredQuietZoneCellCount / quietZoneCellCount),
    functionModuleCoverageRatio: fixed(coveredFunctionModuleCount / Math.max(1, protectedMask.protectedModuleCount)),
    functionCategoryCoverage,
    fullBoardMask,
  };
}

function createCategoryMask(protectedMask: QrProtectedMask, kind: QrFunctionModuleKind): boolean[][] {
  const size = protectedMask.size;
  const mask = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
  const mark = (row: number, column: number) => {
    if (row >= 0 && column >= 0 && row < size && column < size) mask[row][column] = true;
  };
  const markRect = (row: number, column: number, height: number, width: number) => {
    for (let y = row; y < row + height; y += 1) {
      for (let x = column; x < column + width; x += 1) mark(y, x);
    }
  };
  if (kind === 'finder' || kind === 'separator') {
    for (const [row, column] of [[0, 0], [0, size - 7], [size - 7, 0]] as const) {
      if (kind === 'finder') markRect(row, column, 7, 7);
      else {
        for (let offset = -1; offset <= 7; offset += 1) {
          mark(row - 1, column + offset);
          mark(row + 7, column + offset);
          mark(row + offset, column - 1);
          mark(row + offset, column + 7);
        }
      }
    }
  } else if (kind === 'timing') {
    for (let index = 8; index < size - 8; index += 1) {
      mark(6, index);
      mark(index, 6);
    }
  } else if (kind === 'alignment') {
    for (const row of protectedMask.alignmentCenters) {
      for (const column of protectedMask.alignmentCenters) {
        const overlapsFinder = (row <= 8 && column <= 8)
          || (row <= 8 && column >= size - 9)
          || (row >= size - 9 && column <= 8);
        if (!overlapsFinder) markRect(row - 2, column - 2, 5, 5);
      }
    }
  } else if (kind === 'format') {
    for (let index = 0; index <= 8; index += 1) {
      mark(8, index);
      mark(index, 8);
    }
    for (let index = size - 8; index < size; index += 1) mark(8, index);
    for (let index = size - 7; index < size; index += 1) mark(index, 8);
  } else if (kind === 'version' && protectedMask.version >= 7) {
    markRect(0, size - 11, 6, 3);
    markRect(size - 11, 0, 3, 6);
  } else if (kind === 'dark-module') {
    mark(4 * protectedMask.version + 9, 8);
  }
  return mask;
}

export function createKittyMotionPlan(
  qr: CanonicalQr,
  random: () => number,
  routePoolSize = KITTY_ROUTE_POOL_SIZE,
): KittyMotionPlan {
  if (!Number.isInteger(routePoolSize) || routePoolSize < 1 || routePoolSize > 64) {
    throw new Error('KITTY_ROUTE_POOL_SIZE_INVALID');
  }
  const heroScale = r5KittyScaleForGrid(qr.size);
  const footprintRadiusLocal = KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL;
  const footprintRadiusWorld = footprintRadiusLocal * heroScale;
  const visualRadiusWorld = KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL * heroScale;
  const shadowSafetyMarginWorld = footprintRadiusWorld - visualRadiusWorld;
  const boardSideWorld = qr.size + KITTY_FULL_BOARD_QUIET_ZONE * 2;
  const boardHalfWorld = boardSideWorld * 0.5;
  const centerLimitWorld = boardHalfWorld - footprintRadiusWorld;
  if (centerLimitWorld <= 0) throw new Error(`KITTY_R5_SAFE_INSET_EMPTY:N${qr.size}`);

  const seedVariant = Math.floor(random() * 0x7fffffff);
  const lane = centerLimitWorld;
  const presentationAnchor: KittyPoint = { x: 0, z: -Math.min(1, lane) };
  const baseSweep: KittyPoint[] = [
    { x: -lane, z: -lane },
    { x: lane, z: -lane },
    { x: lane, z: -lane * 0.5 },
    { x: -lane, z: -lane * 0.5 },
    { x: -lane, z: 0 },
    { x: lane, z: 0 },
    { x: lane, z: lane * 0.5 },
    { x: -lane, z: lane * 0.5 },
    { x: -lane, z: lane },
    { x: lane, z: lane },
  ];
  let sweep = baseSweep.map((point) => rotateQuarter(point, seedVariant % 4));
  if (((seedVariant >>> 2) & 1) === 1) {
    sweep = [...sweep].reverse();
  }
  let route = [presentationAnchor, ...sweep, presentationAnchor];
  route = route.map((point) => ({ x: fixed(point.x), z: fixed(point.z) }));
  const protectedMask = createQrProtectedMask(qr);
  const segments: KittyPathSegment[] = route.slice(0, -1).map((from, index) => {
    const to = route[index + 1];
    const risk = sweptFootprintRisk(protectedMask, from, to, footprintRadiusWorld);
    return {
      index,
      from,
      to,
      length: fixed(Math.hypot(to.x - from.x, to.z - from.z)),
      protectedClearance: fixed(risk.protectedClearance),
      maximumProtectedModuleOverlap: risk.protectedOverlap,
      maximumCriticalModuleOverlap: risk.criticalOverlap,
    };
  });
  const coverage = buildCoverageMetric(qr, protectedMask, segments, footprintRadiusWorld);
  if (coverage.fullBoardCoverageRatio < KITTY_FULL_BOARD_REQUIRED_COVERAGE) {
    throw new Error(`KITTY_R5_FULL_BOARD_COVERAGE_INCOMPLETE:N${qr.size}:${coverage.fullBoardCoverageRatio}`);
  }
  const pathLengthWorld = segments.reduce((sum, segment) => sum + segment.length, 0);
  const localRoute = route.map((point) => ({
    x: fixed(point.x / heroScale),
    z: fixed(point.z / heroScale),
  }));
  const maximumProtectedModuleOverlap = Math.max(...segments.map((segment) => segment.maximumProtectedModuleOverlap));
  const maximumCriticalModuleOverlap = Math.max(...segments.map((segment) => segment.maximumCriticalModuleOverlap));
  const minimumProtectedClearance = Math.min(...segments.map((segment) => segment.protectedClearance));
  return {
    gridSize: qr.size,
    qrVersion: protectedMask.version,
    heroScale,
    footprintRadiusWorld: fixed(footprintRadiusWorld),
    footprintRadiusLocal: fixed(footprintRadiusLocal),
    seedVariant,
    start: route[0],
    end: route.at(-1)!,
    localStart: localRoute[0],
    localEnd: localRoute.at(-1)!,
    pathLengthWorld: fixed(pathLengthWorld),
    boardSideWorld,
    boardHalfWorld: fixed(boardHalfWorld),
    safeInsetWorld: fixed(footprintRadiusWorld),
    centerLimitWorld: fixed(centerLimitWorld),
    shadowSafetyMarginWorld: fixed(shadowSafetyMarginWorld),
    cycleSeconds: KITTY_MOTION_CYCLE_SECONDS,
    decoderPoseHz: KITTY_DECODER_POSE_HZ,
    reachablePoseCount: KITTY_MOTION_CYCLE_SECONDS * KITTY_DECODER_POSE_HZ,
    safeCandidateCount: coverage.fullBoardCellCount,
    protectedModuleCount: protectedMask.protectedModuleCount,
    protectedCategoryCounts: protectedMask.categoryCounts,
    alignmentCenters: protectedMask.alignmentCenters,
    minimumProtectedClearance: fixed(minimumProtectedClearance),
    startOccludedDarkFraction: fixed(occludedDarkFraction(qr, route[0], footprintRadiusWorld)),
    endOccludedDarkFraction: fixed(occludedDarkFraction(qr, route.at(-1)!, footprintRadiusWorld)),
    maximumProtectedModuleOverlap,
    maximumCriticalModuleOverlap,
    alignmentOverlapRequiresDecoderVerification: false,
    scanRemovesKittyBeforeDecode: true,
    segment: segments[0],
    segments,
    route,
    localRoute,
    coverage,
    protectedMask,
  };
}

function routeHeading(from: KittyPoint, to: KittyPoint): number {
  return Math.atan2(to.x - from.x, to.z - from.z);
}

export function sampleKittyMotion(plan: KittyMotionPlan, seconds: number): KittyMotionSample {
  const time = positiveModulo(seconds, plan.cycleSeconds);
  let segmentIndex = plan.segments.length - 1;
  let segmentStartTime = 0;
  let segmentDuration = plan.cycleSeconds * plan.segments[segmentIndex].length / plan.pathLengthWorld;
  for (let index = 0, elapsed = 0; index < plan.segments.length; index += 1) {
    const duration = plan.cycleSeconds * plan.segments[index].length / plan.pathLengthWorld;
    if (time < elapsed + duration || index === plan.segments.length - 1) {
      segmentIndex = index;
      segmentStartTime = elapsed;
      segmentDuration = duration;
      break;
    }
    elapsed += duration;
  }
  const slotPhase = Math.max(0, Math.min(1, (time - segmentStartTime) / Math.max(1e-9, segmentDuration)));
  const segment = plan.segments[segmentIndex];
  const localFrom = plan.localRoute[segmentIndex];
  const localTo = plan.localRoute[segmentIndex + 1];
  const currentHeading = routeHeading(localFrom, localTo);
  const previousHeading = segmentIndex === 0
    ? 0
    : routeHeading(plan.localRoute[segmentIndex - 1], localFrom);
  const nextHeading = segmentIndex === plan.segments.length - 1
    ? 0
    : routeHeading(localTo, plan.localRoute[segmentIndex + 2]);
  const moveStart = 0.14;
  const moveEnd = 0.92;
  let action: KittyAction;
  let point = localFrom;
  let heading = previousHeading;
  let gaitPhase = 0;
  let speed = 0;
  let headYaw = 0;
  if (slotPhase < moveStart) {
    if (segmentIndex === 0 && slotPhase < moveStart * 0.42) action = 'idle';
    else if (segmentIndex === 0) action = 'look';
    else action = 'turn';
    heading = mixAngle(previousHeading, currentHeading, slotPhase / moveStart);
    if (action === 'look') {
      const lookPhase = (slotPhase - moveStart * 0.42) / (moveStart * 0.58);
      headYaw = Math.sin(lookPhase * Math.PI) * ((((plan.seedVariant >>> 8) & 1) === 0) ? -0.42 : 0.42);
    }
  } else if (slotPhase < moveEnd) {
    const progress = smoothstep((slotPhase - moveStart) / (moveEnd - moveStart));
    point = interpolate(localFrom, localTo, progress);
    heading = currentHeading;
    action = (['walk', 'run', 'dash'] as const)[segmentIndex % 3];
    const priorDistance = plan.segments.slice(0, segmentIndex).reduce((sum, item) => sum + item.length, 0);
    gaitPhase = (priorDistance + segment.length * progress) * (action === 'walk' ? 0.72 : action === 'run' ? 0.95 : 1.15);
    speed = segment.length / ((moveEnd - moveStart) * segmentDuration);
  } else {
    action = 'turn';
    point = localTo;
    heading = mixAngle(currentHeading, nextHeading, (slotPhase - moveEnd) / (1 - moveEnd));
  }
  const seedPhase = (plan.seedVariant % 4096) / 4096 * Math.PI * 2;
  const moving = action === 'walk' || action === 'run' || action === 'dash';
  return {
    time: fixed(time),
    segmentIndex,
    segmentProgress: fixed(slotPhase),
    action,
    x: fixed(point.x),
    z: fixed(point.z),
    worldX: fixed(point.x * plan.heroScale),
    worldZ: fixed(point.z * plan.heroScale),
    heading: fixed(heading),
    gaitPhase: fixed(gaitPhase),
    speed: fixed(speed),
    headYaw: fixed(headYaw),
    tailAngle: fixed(Math.sin(seconds * 2.1 + 0.4 + seedPhase) * 0.22),
    moving,
  };
}

export function enumerateKittyReachablePoses(plan: KittyMotionPlan): KittyMotionSample[] {
  return Array.from({ length: plan.reachablePoseCount }, (_, index) => (
    sampleKittyMotion(plan, index / plan.decoderPoseHz)
  ));
}

export function kittyPoseSafetyMetric(plan: KittyMotionPlan, sample: Pick<KittyMotionSample, 'worldX' | 'worldZ'>): {
  safe: boolean;
  boundaryClearance: number;
  protectedOverlap: number;
  criticalOverlap: number;
  protectedClearance: number;
} {
  const point = { x: sample.worldX, z: sample.worldZ };
  const protectedRisk = footprintRisk(plan.protectedMask, point, plan.footprintRadiusWorld);
  const boundaryClearance = Math.min(
    plan.boardHalfWorld - plan.footprintRadiusWorld - Math.abs(point.x),
    plan.boardHalfWorld - plan.footprintRadiusWorld - Math.abs(point.z),
  );
  return {
    safe: boundaryClearance >= -1e-6,
    boundaryClearance: fixed(boundaryClearance),
    protectedOverlap: protectedRisk.protectedOverlap,
    criticalOverlap: protectedRisk.criticalOverlap,
    protectedClearance: fixed(protectedRisk.protectedClearance),
  };
}

export function kittyPoseProtectedSafe(
  plan: KittyMotionPlan,
  sample: Pick<KittyMotionSample, 'worldX' | 'worldZ'>,
): boolean {
  return kittyPoseSafetyMetric(plan, sample).safe;
}

export function kittyFullBoardCoverageMask(plan: KittyMotionPlan): boolean[][] {
  return plan.coverage.fullBoardMask.map((row) => [...row]);
}

export function kittySweptEnvelopeMask(plan: KittyMotionPlan): boolean[][] {
  const quietZone = KITTY_FULL_BOARD_QUIET_ZONE;
  return plan.coverage.fullBoardMask
    .slice(quietZone, quietZone + plan.gridSize)
    .map((row) => row.slice(quietZone, quietZone + plan.gridSize));
}
