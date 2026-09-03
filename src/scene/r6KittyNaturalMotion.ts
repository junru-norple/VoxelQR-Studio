import {
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
  R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES,
  r5KittyScaleForGrid,
} from './r5CharacterContract';
import {
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  R4_KITTY_LINEAR_SCALE,
} from './r4CharacterContract';

export const R6_KITTY_MOTION_MODEL = 'session-seeded-natural-lively-v1' as const;
export const R6_KITTY_HEATMAP_SIDE = 9;
export const R6_KITTY_FIXED_STEP_SECONDS = 1 / 60;
export const R6_KITTY_RECENT_TARGET_LIMIT = 8;
export const R6_KITTY_FULL_BOARD_QUIET_ZONE = R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES;
export const R6_KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL =
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4;
export const R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL =
  R6_KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL + R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL;

export type KittyNaturalIntent = 'walk' | 'run' | 'dash' | 'observe' | 'turn' | 'tail';
export type KittyNaturalAction = 'idle' | 'look' | 'walk' | 'run' | 'turn' | 'dash';
export type KittySessionSeedSource = 'production-crypto' | 'test-override';

export interface KittyNaturalPoint {
  x: number;
  z: number;
}

export interface KittyRecentTarget extends KittyNaturalPoint {
  id: number;
  chosenAtSeconds: number;
  intent: 'walk' | 'run' | 'dash';
}

export interface KittyNaturalRngState {
  algorithm: 'xoshiro128ss';
  words: [number, number, number, number];
  draws: number;
}

export type KittyIntentShares = Record<KittyNaturalIntent, number>;

export interface KittyNaturalMotionState {
  schemaVersion: 'voxelqr-r6-kitty-natural-motion-state-v1';
  model: typeof R6_KITTY_MOTION_MODEL;
  sessionSeed: string;
  seedSource: KittySessionSeedSource;
  rng: KittyNaturalRngState;
  elapsedSeconds: number;
  accumulatorSeconds: number;
  position: KittyNaturalPoint;
  velocity: KittyNaturalPoint;
  speed: number;
  heading: number;
  angularVelocity: number;
  desiredHeading: number;
  targetSpeed: number;
  target: KittyNaturalPoint | null;
  targetId: number | null;
  intent: KittyNaturalIntent;
  intentElapsedSeconds: number;
  intentDurationSeconds: number;
  intentSequence: number;
  repeatedIntentCount: number;
  turnGoalHeading: number;
  gaitDistance: number;
  targetShares: KittyIntentShares;
  intentSeconds: KittyIntentShares;
  intentTransitions: Record<KittyNaturalIntent, number>;
  heatmap: {
    side: typeof R6_KITTY_HEATMAP_SIDE;
    seconds: number[];
    targetSelections: number[];
    totalSeconds: number;
  };
  recentTargets: KittyRecentTarget[];
  targetHistory: number[];
  distanceTravelled: number;
  maximumSpeed: number;
  maximumAngularVelocity: number;
  boundaryCorrections: number;
  stuckSeconds: number;
}

export interface KittyNavigationGeometry {
  gridSize: number;
  heroScale: number;
  boardSideWorld: number;
  boardHalfWorld: number;
  footprintRadiusLocal: number;
  footprintRadiusWorld: number;
  centerLimitWorld: number;
  normalizedSafetyLimit: number;
}

export interface KittyGridReprojectionResult {
  previousGridSize: number;
  nextGridSize: number;
  positionWorldExact: boolean;
  velocityWorldExact: boolean;
  targetReselected: boolean;
  positionClamped: boolean;
}

export interface KittyNaturalPose {
  time: number;
  action: KittyNaturalAction;
  intent: KittyNaturalIntent;
  x: number;
  z: number;
  worldX: number;
  worldZ: number;
  normalizedX: number;
  normalizedZ: number;
  heading: number;
  gaitPhase: number;
  speed: number;
  normalizedSpeed: number;
  headYaw: number;
  tailAngle: number;
  moving: boolean;
}

export interface KittyNaturalMotionDiagnostic {
  model: typeof R6_KITTY_MOTION_MODEL;
  sessionSeed: string;
  seedSource: KittySessionSeedSource;
  elapsedSeconds: number;
  intent: KittyNaturalIntent;
  intentElapsedSeconds: number;
  intentDurationSeconds: number;
  targetShares: KittyIntentShares;
  intentSeconds: KittyIntentShares;
  intentDistribution: KittyIntentShares;
  steering: {
    position: KittyNaturalPoint;
    velocity: KittyNaturalPoint;
    speed: number;
    heading: number;
    desiredHeading: number;
    angularVelocity: number;
    targetSpeed: number;
    target: KittyNaturalPoint | null;
    targetId: number | null;
  };
  heatmap: KittyNaturalMotionState['heatmap'];
  recentTargets: KittyRecentTarget[];
  targetHistory: number[];
  rngState: KittyNaturalRngState;
  safety: {
    normalizedSafetyLimit: number;
    boundaryClearance: number;
    distanceTravelled: number;
    maximumSpeed: number;
    maximumAngularVelocity: number;
    boundaryCorrections: number;
    stuckSeconds: number;
  };
  loopPolicy: {
    finiteCycle: false;
    moduloTime: false;
    fixedWaypointOrder: false;
    mandatoryOriginReturn: false;
  };
}

const INTENTS: KittyNaturalIntent[] = ['walk', 'run', 'dash', 'observe', 'turn', 'tail'];
const LOCOMOTION_INTENTS = new Set<KittyNaturalIntent>(['walk', 'run', 'dash']);
const NORMALIZED_SAFETY_LIMIT = 0.94;
const TARGET_LIMIT = 0.78;
const UINT32_RANGE = 0x1_0000_0000;

const fixed = (value: number, digits = 8) => Number(value.toFixed(digits));
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const emptyShares = (): KittyIntentShares => ({ walk: 0, run: 0, dash: 0, observe: 0, turn: 0, tail: 0 });
const wrapAngle = (value: number) => {
  let angle = value;
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
};

function rotateLeft(value: number, shift: number): number {
  return ((value << shift) | (value >>> (32 - shift))) >>> 0;
}

function seedWords(seed: string): [number, number, number, number] {
  let a = 0x243f6a88;
  let b = 0x85a308d3;
  let c = 0x13198a2e;
  let d = 0x03707344;
  for (let index = 0; index < seed.length; index += 1) {
    const code = seed.charCodeAt(index);
    a = Math.imul(a ^ code, 0x9e3779b1) >>> 0;
    b = Math.imul(b ^ (code + index), 0x85ebca6b) >>> 0;
    c = Math.imul(c ^ (code + a), 0xc2b2ae35) >>> 0;
    d = Math.imul(d ^ (code + b), 0x27d4eb2f) >>> 0;
  }
  a = (a ^ (a >>> 16) ^ c) >>> 0;
  b = (b ^ (b >>> 13) ^ d) >>> 0;
  c = (c ^ (c >>> 16) ^ a) >>> 0;
  d = (d ^ (d >>> 13) ^ b) >>> 0;
  if ((a | b | c | d) === 0) d = 1;
  return [a, b, c, d];
}

function nextUint32(state: KittyNaturalMotionState): number {
  const words = state.rng.words;
  const result = Math.imul(rotateLeft(Math.imul(words[1], 5) >>> 0, 7), 9) >>> 0;
  const t = (words[1] << 9) >>> 0;
  words[2] ^= words[0];
  words[3] ^= words[1];
  words[1] ^= words[2];
  words[0] ^= words[3];
  words[2] ^= t;
  words[3] = rotateLeft(words[3], 11);
  state.rng.draws += 1;
  return result;
}

function random01(state: KittyNaturalMotionState): number {
  return nextUint32(state) / UINT32_RANGE;
}

function randomBetween(state: KittyNaturalMotionState, minimum: number, maximum: number): number {
  return minimum + (maximum - minimum) * random01(state);
}

function approach(value: number, target: number, maximumDelta: number): number {
  if (value < target) return Math.min(target, value + maximumDelta);
  return Math.max(target, value - maximumDelta);
}

function approachVector(
  value: KittyNaturalPoint,
  target: KittyNaturalPoint,
  maximumDelta: number,
): KittyNaturalPoint {
  const dx = target.x - value.x;
  const dz = target.z - value.z;
  const distance = Math.hypot(dx, dz);
  if (distance <= maximumDelta || distance <= 1e-12) return { ...target };
  return {
    x: value.x + dx / distance * maximumDelta,
    z: value.z + dz / distance * maximumDelta,
  };
}

function heatmapCell(point: KittyNaturalPoint): number {
  const toCell = (value: number) => clamp(
    Math.floor((value / (NORMALIZED_SAFETY_LIMIT * 2) + 0.5) * R6_KITTY_HEATMAP_SIDE),
    0,
    R6_KITTY_HEATMAP_SIDE - 1,
  );
  return toCell(point.z) * R6_KITTY_HEATMAP_SIDE + toCell(point.x);
}

function intentDuration(state: KittyNaturalMotionState, intent: KittyNaturalIntent): number {
  const ranges: Record<KittyNaturalIntent, [number, number]> = {
    walk: [2.8, 5.1],
    run: [2.1, 3.8],
    dash: [0.75, 1.3],
    observe: [1.25, 2.35],
    turn: [0.7, 1.3],
    tail: [1.05, 2.05],
  };
  return randomBetween(state, ...ranges[intent]);
}

function buildTargetShares(state: KittyNaturalMotionState): KittyIntentShares {
  const nonLocomotion = randomBetween(state, 0.18, 0.23);
  const dash = randomBetween(state, 0.07, 0.09);
  const run = randomBetween(state, 0.25, 0.29);
  const walk = 1 - nonLocomotion - dash - run;
  const observeFraction = randomBetween(state, 0.46, 0.58);
  const observe = nonLocomotion * observeFraction;
  const remaining = nonLocomotion - observe;
  const turnFraction = randomBetween(state, 0.44, 0.58);
  return {
    walk,
    run,
    dash,
    observe,
    turn: remaining * turnFraction,
    tail: remaining * (1 - turnFraction),
  };
}

function chooseIntent(state: KittyNaturalMotionState): KittyNaturalIntent {
  const horizon = 14;
  let selected = INTENTS[0];
  let selectedScore = Number.NEGATIVE_INFINITY;
  for (const intent of INTENTS) {
    const targetSeconds = state.targetShares[intent] * (state.elapsedSeconds + horizon);
    const deficit = targetSeconds - state.intentSeconds[intent];
    const repeatPenalty = intent === state.intent
      ? 0.65 + state.repeatedIntentCount * 0.55
      : 0;
    const jitter = (random01(state) - 0.5) * 1.2;
    const score = deficit - repeatPenalty + jitter;
    if (score > selectedScore) {
      selectedScore = score;
      selected = intent;
    }
  }
  return selected;
}

function targetSpeedFor(intent: KittyNaturalIntent): number {
  if (intent === 'walk') return 0.115;
  if (intent === 'run') return 0.205;
  if (intent === 'dash') return 0.34;
  return 0;
}

function selectTarget(state: KittyNaturalMotionState, intent: 'walk' | 'run' | 'dash'): void {
  const recentIds = new Set(state.recentTargets.slice(-5).map((target) => target.id));
  const desiredDistance: Record<typeof intent, [number, number]> = {
    walk: [0.22, 0.72],
    run: [0.38, 1.08],
    dash: [0.58, 1.5],
  };
  const [minimumDistance, maximumDistance] = desiredDistance[intent];
  let best: { point: KittyNaturalPoint; id: number; score: number } | null = null;
  for (let candidateIndex = 0; candidateIndex < 24; candidateIndex += 1) {
    const point = {
      x: randomBetween(state, -TARGET_LIMIT, TARGET_LIMIT),
      z: randomBetween(state, -TARGET_LIMIT, TARGET_LIMIT),
    };
    const id = heatmapCell(point);
    const distance = Math.hypot(point.x - state.position.x, point.z - state.position.z);
    const visits = state.heatmap.seconds[id];
    const targetSelections = state.heatmap.targetSelections[id];
    const distancePenalty = distance < minimumDistance
      ? (minimumDistance - distance) * 8
      : distance > maximumDistance
        ? (distance - maximumDistance) * 3
        : 0;
    const recentPenalty = recentIds.has(id) ? 7 : 0;
    const heatPenalty = visits * 0.42 + targetSelections * 0.8;
    const heading = Math.atan2(point.x - state.position.x, point.z - state.position.z);
    const turn = Math.abs(wrapAngle(heading - state.heading));
    const turnPenalty = intent === 'dash' ? Math.max(0, turn - 1.25) * 1.5 : 0;
    const score = -distancePenalty - recentPenalty - heatPenalty - turnPenalty + random01(state) * 1.7;
    if (!best || score > best.score) best = { point, id, score };
  }
  if (!best) throw new Error('R6_KITTY_TARGET_SELECTION_FAILED');
  state.target = best.point;
  state.targetId = best.id;
  state.heatmap.targetSelections[best.id] += 1;
  state.recentTargets.push({
    id: best.id,
    x: fixed(best.point.x),
    z: fixed(best.point.z),
    chosenAtSeconds: fixed(state.elapsedSeconds),
    intent,
  });
  if (state.recentTargets.length > R6_KITTY_RECENT_TARGET_LIMIT) state.recentTargets.shift();
  state.targetHistory.push(best.id);
  if (state.targetHistory.length > 256) state.targetHistory.shift();
}

function beginIntent(state: KittyNaturalMotionState, forcedIntent?: KittyNaturalIntent): void {
  const previous = state.intent;
  const intent = forcedIntent ?? chooseIntent(state);
  state.repeatedIntentCount = intent === previous ? state.repeatedIntentCount + 1 : 0;
  state.intent = intent;
  state.intentElapsedSeconds = 0;
  state.intentDurationSeconds = intentDuration(state, intent);
  state.intentSequence += 1;
  state.intentTransitions[intent] += 1;
  state.targetSpeed = targetSpeedFor(intent);
  if (LOCOMOTION_INTENTS.has(intent)) {
    selectTarget(state, intent as 'walk' | 'run' | 'dash');
  } else {
    state.target = null;
    state.targetId = null;
    if (intent === 'turn') {
      state.turnGoalHeading = wrapAngle(state.heading + randomBetween(state, -1.15, 1.15));
      if (Math.abs(wrapAngle(state.turnGoalHeading - state.heading)) < 0.35) {
        state.turnGoalHeading = wrapAngle(state.heading + (random01(state) < 0.5 ? -0.65 : 0.65));
      }
    }
  }
}

function simulationStep(state: KittyNaturalMotionState, deltaSeconds: number): void {
  state.elapsedSeconds += deltaSeconds;
  state.intentElapsedSeconds += deltaSeconds;
  state.intentSeconds[state.intent] += deltaSeconds;
  const currentCell = heatmapCell(state.position);
  state.heatmap.seconds[currentCell] += deltaSeconds;
  state.heatmap.totalSeconds += deltaSeconds;

  const targetDistance = state.target
    ? Math.hypot(state.target.x - state.position.x, state.target.z - state.position.z)
    : Number.POSITIVE_INFINITY;
  const reachedTarget = LOCOMOTION_INTENTS.has(state.intent) && targetDistance < 0.075;
  if (state.intentElapsedSeconds >= state.intentDurationSeconds || reachedTarget || state.stuckSeconds > 1.4) {
    beginIntent(state);
  }

  if (state.target) {
    state.desiredHeading = Math.atan2(
      state.target.x - state.position.x,
      state.target.z - state.position.z,
    );
  } else if (state.intent === 'turn') {
    state.desiredHeading = state.turnGoalHeading;
  } else if (state.intent === 'observe') {
    state.desiredHeading = wrapAngle(state.heading + Math.sin(state.intentElapsedSeconds * 1.35) * 0.18);
  } else {
    state.desiredHeading = state.heading;
  }

  const edgePressureX = Math.max(0, Math.abs(state.position.x) - 0.62) / 0.2;
  const edgePressureZ = Math.max(0, Math.abs(state.position.z) - 0.62) / 0.2;
  const edgePressure = Math.max(edgePressureX, edgePressureZ);
  if (edgePressure > 0) {
    const inward = Math.atan2(
      -Math.sign(state.position.x) * edgePressureX,
      -Math.sign(state.position.z) * edgePressureZ,
    );
    const pressure = clamp(edgePressure, 0, 1);
    const blendX = Math.sin(state.desiredHeading) * (1 - pressure) + Math.sin(inward) * pressure;
    const blendZ = Math.cos(state.desiredHeading) * (1 - pressure) + Math.cos(inward) * pressure;
    state.desiredHeading = Math.atan2(blendX, blendZ);
  }

  const headingError = wrapAngle(state.desiredHeading - state.heading);
  const maximumTurnRate = state.intent === 'dash' ? 1.5 : state.intent === 'run' ? 1.85 : 2.2;
  const targetAngularVelocity = clamp(headingError * 2.8, -maximumTurnRate, maximumTurnRate);
  state.angularVelocity = approach(state.angularVelocity, targetAngularVelocity, 4.6 * deltaSeconds);
  state.heading = wrapAngle(state.heading + state.angularVelocity * deltaSeconds);

  const edgeSpeedScale = 1 - clamp(edgePressure, 0, 1) * 0.82;
  const effectiveTargetSpeed = state.targetSpeed * edgeSpeedScale;
  const desiredVelocity = {
    x: Math.sin(state.heading) * effectiveTargetSpeed,
    z: Math.cos(state.heading) * effectiveTargetSpeed,
  };
  const accelerating = effectiveTargetSpeed > state.speed;
  const acceleration = accelerating
    ? state.intent === 'dash' ? 0.6 : state.intent === 'run' ? 0.38 : 0.27
    : 0.46;
  const nextVelocity = approachVector(state.velocity, desiredVelocity, acceleration * deltaSeconds);
  const nextPosition = {
    x: state.position.x + nextVelocity.x * deltaSeconds,
    z: state.position.z + nextVelocity.z * deltaSeconds,
  };
  if (Math.abs(nextPosition.x) > NORMALIZED_SAFETY_LIMIT || Math.abs(nextPosition.z) > NORMALIZED_SAFETY_LIMIT) {
    nextPosition.x = clamp(nextPosition.x, -NORMALIZED_SAFETY_LIMIT, NORMALIZED_SAFETY_LIMIT);
    nextPosition.z = clamp(nextPosition.z, -NORMALIZED_SAFETY_LIMIT, NORMALIZED_SAFETY_LIMIT);
    if (Math.sign(nextVelocity.x) === Math.sign(nextPosition.x)) nextVelocity.x *= 0.25;
    if (Math.sign(nextVelocity.z) === Math.sign(nextPosition.z)) nextVelocity.z *= 0.25;
    state.boundaryCorrections += 1;
  }
  if (Math.abs(nextPosition.x) < 1e-12) nextPosition.x = 0;
  if (Math.abs(nextPosition.z) < 1e-12) nextPosition.z = 0;
  if (Math.abs(nextVelocity.x) < 1e-12) nextVelocity.x = 0;
  if (Math.abs(nextVelocity.z) < 1e-12) nextVelocity.z = 0;
  const distance = Math.hypot(nextPosition.x - state.position.x, nextPosition.z - state.position.z);
  state.position = nextPosition;
  state.velocity = nextVelocity;
  state.speed = Math.hypot(nextVelocity.x, nextVelocity.z);
  state.distanceTravelled += distance;
  state.gaitDistance += distance;
  state.maximumSpeed = Math.max(state.maximumSpeed, state.speed);
  state.maximumAngularVelocity = Math.max(state.maximumAngularVelocity, Math.abs(state.angularVelocity));
  state.stuckSeconds = LOCOMOTION_INTENTS.has(state.intent) && state.intentElapsedSeconds > 0.55 && state.speed < 0.012
    ? state.stuckSeconds + deltaSeconds
    : 0;
}

export function createProductionKittySessionSeed(): string {
  const entropy = new Uint32Array(4);
  const cryptoSource = globalThis.crypto;
  if (!cryptoSource?.getRandomValues) throw new Error('R6_KITTY_CRYPTO_ENTROPY_UNAVAILABLE');
  cryptoSource.getRandomValues(entropy);
  return Array.from(entropy, (value) => value.toString(16).padStart(8, '0')).join('');
}

export function createKittyNaturalMotion(
  sessionSeed: string,
  seedSource: KittySessionSeedSource = 'test-override',
): KittyNaturalMotionState {
  if (!sessionSeed || sessionSeed.length < 4) throw new Error('R6_KITTY_SESSION_SEED_INVALID');
  const state: KittyNaturalMotionState = {
    schemaVersion: 'voxelqr-r6-kitty-natural-motion-state-v1',
    model: R6_KITTY_MOTION_MODEL,
    sessionSeed,
    seedSource,
    rng: { algorithm: 'xoshiro128ss', words: seedWords(sessionSeed), draws: 0 },
    elapsedSeconds: 0,
    accumulatorSeconds: 0,
    position: { x: 0, z: 0 },
    velocity: { x: 0, z: 0 },
    speed: 0,
    heading: 0,
    angularVelocity: 0,
    desiredHeading: 0,
    targetSpeed: 0,
    target: null,
    targetId: null,
    intent: 'observe',
    intentElapsedSeconds: 0,
    intentDurationSeconds: 0,
    intentSequence: 0,
    repeatedIntentCount: 0,
    turnGoalHeading: 0,
    gaitDistance: 0,
    targetShares: emptyShares(),
    intentSeconds: emptyShares(),
    intentTransitions: { walk: 0, run: 0, dash: 0, observe: 0, turn: 0, tail: 0 },
    heatmap: {
      side: R6_KITTY_HEATMAP_SIDE,
      seconds: Array.from({ length: R6_KITTY_HEATMAP_SIDE ** 2 }, () => 0),
      targetSelections: Array.from({ length: R6_KITTY_HEATMAP_SIDE ** 2 }, () => 0),
      totalSeconds: 0,
    },
    recentTargets: [],
    targetHistory: [],
    distanceTravelled: 0,
    maximumSpeed: 0,
    maximumAngularVelocity: 0,
    boundaryCorrections: 0,
    stuckSeconds: 0,
  };
  state.position = {
    x: randomBetween(state, -0.18, 0.18),
    z: randomBetween(state, -0.2, 0.12),
  };
  state.heading = randomBetween(state, -Math.PI, Math.PI);
  state.desiredHeading = state.heading;
  state.turnGoalHeading = state.heading;
  state.targetShares = buildTargetShares(state);
  beginIntent(state);
  return state;
}

export function cloneKittyNaturalMotion(state: KittyNaturalMotionState): KittyNaturalMotionState {
  return JSON.parse(JSON.stringify(state)) as KittyNaturalMotionState;
}

export function advanceKittyNaturalMotion(
  state: KittyNaturalMotionState,
  deltaSeconds: number,
): KittyNaturalMotionState {
  if (!Number.isFinite(deltaSeconds) || deltaSeconds < 0) throw new Error('R6_KITTY_DELTA_INVALID');
  state.accumulatorSeconds += deltaSeconds;
  let steps = 0;
  while (state.accumulatorSeconds + 1e-9 >= R6_KITTY_FIXED_STEP_SECONDS) {
    simulationStep(state, R6_KITTY_FIXED_STEP_SECONDS);
    state.accumulatorSeconds -= R6_KITTY_FIXED_STEP_SECONDS;
    steps += 1;
    if (steps > 216_000) throw new Error('R6_KITTY_ADVANCE_STEP_LIMIT');
  }
  state.accumulatorSeconds = Math.abs(state.accumulatorSeconds) < 1e-9
    ? 0
    : Math.max(0, state.accumulatorSeconds);
  return state;
}

export function seekKittyNaturalMotion(
  sessionSeed: string,
  seedSource: KittySessionSeedSource,
  seconds: number,
): KittyNaturalMotionState {
  if (!Number.isFinite(seconds) || seconds < 0) throw new Error('R6_KITTY_SEEK_TIME_INVALID');
  const state = createKittyNaturalMotion(sessionSeed, seedSource);
  return advanceKittyNaturalMotion(state, seconds);
}

export function kittyNavigationGeometry(gridSize: number): KittyNavigationGeometry {
  if (!Number.isFinite(gridSize) || gridSize < 21) throw new Error('R6_KITTY_GRID_SIZE_INVALID');
  const heroScale = r5KittyScaleForGrid(gridSize);
  const footprintRadiusWorld = R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL * heroScale;
  const boardSideWorld = gridSize + R6_KITTY_FULL_BOARD_QUIET_ZONE * 2;
  const boardHalfWorld = boardSideWorld * 0.5;
  const centerLimitWorld = boardHalfWorld - footprintRadiusWorld;
  if (centerLimitWorld <= 0) throw new Error(`R6_KITTY_SAFE_INSET_EMPTY:N${gridSize}`);
  return {
    gridSize,
    heroScale,
    boardSideWorld,
    boardHalfWorld,
    footprintRadiusLocal: R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
    footprintRadiusWorld,
    centerLimitWorld,
    normalizedSafetyLimit: NORMALIZED_SAFETY_LIMIT,
  };
}

export function reprojectKittyNaturalMotionForGrid(
  state: KittyNaturalMotionState,
  previousGridSize: number,
  nextGridSize: number,
): KittyGridReprojectionResult {
  const previous = kittyNavigationGeometry(previousGridSize);
  const next = kittyNavigationGeometry(nextGridSize);
  if (previousGridSize === nextGridSize) {
    return {
      previousGridSize,
      nextGridSize,
      positionWorldExact: true,
      velocityWorldExact: true,
      targetReselected: false,
      positionClamped: false,
    };
  }
  const normalizedScale = previous.centerLimitWorld / next.centerLimitWorld;
  const previousWorldPosition = {
    x: state.position.x * previous.centerLimitWorld,
    z: state.position.z * previous.centerLimitWorld,
  };
  const previousWorldVelocity = {
    x: state.velocity.x * previous.centerLimitWorld,
    z: state.velocity.z * previous.centerLimitWorld,
  };
  const mappedPosition = {
    x: state.position.x * normalizedScale,
    z: state.position.z * normalizedScale,
  };
  const positionClamped = Math.abs(mappedPosition.x) > NORMALIZED_SAFETY_LIMIT
    || Math.abs(mappedPosition.z) > NORMALIZED_SAFETY_LIMIT;
  state.position = {
    x: clamp(mappedPosition.x, -NORMALIZED_SAFETY_LIMIT, NORMALIZED_SAFETY_LIMIT),
    z: clamp(mappedPosition.z, -NORMALIZED_SAFETY_LIMIT, NORMALIZED_SAFETY_LIMIT),
  };
  state.velocity = {
    x: state.velocity.x * normalizedScale,
    z: state.velocity.z * normalizedScale,
  };
  state.speed = Math.hypot(state.velocity.x, state.velocity.z);
  state.targetSpeed *= normalizedScale;
  state.gaitDistance *= (previous.centerLimitWorld / previous.heroScale)
    / (next.centerLimitWorld / next.heroScale);
  let targetReselected = false;
  if (state.target) {
    const mappedTarget = {
      x: state.target.x * normalizedScale,
      z: state.target.z * normalizedScale,
    };
    if (Math.abs(mappedTarget.x) > TARGET_LIMIT || Math.abs(mappedTarget.z) > TARGET_LIMIT) {
      if (LOCOMOTION_INTENTS.has(state.intent)) {
        selectTarget(state, state.intent as 'walk' | 'run' | 'dash');
        targetReselected = true;
      } else {
        state.target = null;
        state.targetId = null;
      }
    } else {
      state.target = mappedTarget;
      state.targetId = heatmapCell(mappedTarget);
    }
  }
  if (positionClamped) state.boundaryCorrections += 1;
  const positionWorldExact = !positionClamped
    && Math.abs(state.position.x * next.centerLimitWorld - previousWorldPosition.x) <= 1e-9
    && Math.abs(state.position.z * next.centerLimitWorld - previousWorldPosition.z) <= 1e-9;
  const velocityWorldExact = Math.abs(state.velocity.x * next.centerLimitWorld - previousWorldVelocity.x) <= 1e-9
    && Math.abs(state.velocity.z * next.centerLimitWorld - previousWorldVelocity.z) <= 1e-9;
  return {
    previousGridSize,
    nextGridSize,
    positionWorldExact,
    velocityWorldExact,
    targetReselected,
    positionClamped,
  };
}

export function sampleKittyNaturalPose(
  state: KittyNaturalMotionState,
  gridSize: number,
): KittyNaturalPose {
  const geometry = kittyNavigationGeometry(gridSize);
  const worldX = state.position.x * geometry.centerLimitWorld;
  const worldZ = state.position.z * geometry.centerLimitWorld;
  const moving = state.speed > 0.008;
  const locomotionAction = LOCOMOTION_INTENTS.has(state.intent)
    ? state.intent as 'walk' | 'run' | 'dash'
    : 'walk';
  let action: KittyNaturalAction;
  if (moving) action = locomotionAction;
  else if (state.intent === 'observe') action = 'look';
  else if (state.intent === 'turn') action = 'turn';
  else action = 'idle';
  const observeDirection = ((state.rng.words[0] >>> 3) & 1) === 0 ? -1 : 1;
  const headYaw = state.intent === 'observe'
    ? Math.sin(clamp(state.intentElapsedSeconds / Math.max(state.intentDurationSeconds, 1e-9), 0, 1) * Math.PI) * 0.42 * observeDirection
    : state.intent === 'tail'
      ? Math.sin(state.intentElapsedSeconds * 1.7) * 0.18
      : clamp(wrapAngle(state.desiredHeading - state.heading) * 0.22, -0.16, 0.16);
  const seedPhase = (state.rng.words[3] % 4096) / 4096 * Math.PI * 2;
  const tailPlay = state.intent === 'tail' ? Math.sin(state.intentElapsedSeconds * 3.2) * 0.12 : 0;
  return {
    time: fixed(state.elapsedSeconds, 6),
    action,
    intent: state.intent,
    x: fixed(worldX / geometry.heroScale, 6),
    z: fixed(worldZ / geometry.heroScale, 6),
    worldX: fixed(worldX, 6),
    worldZ: fixed(worldZ, 6),
    normalizedX: fixed(state.position.x, 8),
    normalizedZ: fixed(state.position.z, 8),
    heading: fixed(state.heading, 6),
    gaitPhase: fixed(state.gaitDistance * geometry.centerLimitWorld / geometry.heroScale * 0.92, 6),
    speed: fixed(state.speed * geometry.centerLimitWorld / geometry.heroScale, 6),
    normalizedSpeed: fixed(state.speed, 8),
    headYaw: fixed(headYaw, 6),
    tailAngle: fixed(Math.sin(state.elapsedSeconds * 2.1 + 0.4 + seedPhase) * 0.22 + tailPlay, 6),
    moving,
  };
}

export function kittyNaturalMotionDiagnostic(
  state: KittyNaturalMotionState,
): KittyNaturalMotionDiagnostic {
  const distribution = emptyShares();
  const total = Math.max(state.heatmap.totalSeconds, 1e-9);
  for (const intent of INTENTS) distribution[intent] = state.intentSeconds[intent] / total;
  return {
    model: state.model,
    sessionSeed: state.sessionSeed,
    seedSource: state.seedSource,
    elapsedSeconds: fixed(state.elapsedSeconds),
    intent: state.intent,
    intentElapsedSeconds: fixed(state.intentElapsedSeconds),
    intentDurationSeconds: fixed(state.intentDurationSeconds),
    targetShares: Object.fromEntries(INTENTS.map((intent) => [intent, fixed(state.targetShares[intent])])) as unknown as KittyIntentShares,
    intentSeconds: Object.fromEntries(INTENTS.map((intent) => [intent, fixed(state.intentSeconds[intent])])) as unknown as KittyIntentShares,
    intentDistribution: Object.fromEntries(INTENTS.map((intent) => [intent, fixed(distribution[intent])])) as unknown as KittyIntentShares,
    steering: {
      position: { x: fixed(state.position.x), z: fixed(state.position.z) },
      velocity: { x: fixed(state.velocity.x), z: fixed(state.velocity.z) },
      speed: fixed(state.speed),
      heading: fixed(state.heading),
      desiredHeading: fixed(state.desiredHeading),
      angularVelocity: fixed(state.angularVelocity),
      targetSpeed: fixed(state.targetSpeed),
      target: state.target ? { x: fixed(state.target.x), z: fixed(state.target.z) } : null,
      targetId: state.targetId,
    },
    heatmap: {
      side: state.heatmap.side,
      seconds: state.heatmap.seconds.map((value) => fixed(value)),
      targetSelections: [...state.heatmap.targetSelections],
      totalSeconds: fixed(state.heatmap.totalSeconds),
    },
    recentTargets: state.recentTargets.map((target) => ({ ...target })),
    targetHistory: [...state.targetHistory],
    rngState: {
      algorithm: state.rng.algorithm,
      words: [...state.rng.words] as [number, number, number, number],
      draws: state.rng.draws,
    },
    safety: {
      normalizedSafetyLimit: NORMALIZED_SAFETY_LIMIT,
      boundaryClearance: fixed(NORMALIZED_SAFETY_LIMIT - Math.max(Math.abs(state.position.x), Math.abs(state.position.z))),
      distanceTravelled: fixed(state.distanceTravelled),
      maximumSpeed: fixed(state.maximumSpeed),
      maximumAngularVelocity: fixed(state.maximumAngularVelocity),
      boundaryCorrections: state.boundaryCorrections,
      stuckSeconds: fixed(state.stuckSeconds),
    },
    loopPolicy: {
      finiteCycle: false,
      moduloTime: false,
      fixedWaypointOrder: false,
      mandatoryOriginReturn: false,
    },
  };
}

export function kittyNaturalMotionSignature(
  state: KittyNaturalMotionState,
  precision = 4,
): string {
  const diagnostic = kittyNaturalMotionDiagnostic(state);
  return [
    state.sessionSeed,
    diagnostic.elapsedSeconds.toFixed(precision),
    diagnostic.steering.position.x.toFixed(precision),
    diagnostic.steering.position.z.toFixed(precision),
    diagnostic.steering.heading.toFixed(precision),
    diagnostic.intent,
    diagnostic.targetHistory.join('.'),
    diagnostic.rngState.words.join('.'),
  ].join('|');
}
