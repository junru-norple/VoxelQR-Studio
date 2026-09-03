import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  R6_KITTY_FIXED_STEP_SECONDS,
  R6_KITTY_HEATMAP_SIDE,
  R6_KITTY_MOTION_MODEL,
  R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
  advanceKittyNaturalMotion,
  cloneKittyNaturalMotion,
  createKittyNaturalMotion,
  createProductionKittySessionSeed,
  kittyNaturalMotionDiagnostic,
  kittyNaturalMotionSignature,
  kittyNavigationGeometry,
  reprojectKittyNaturalMotionForGrid,
  sampleKittyNaturalPose,
  seekKittyNaturalMotion,
  type KittyNaturalMotionState,
  type KittyNaturalPose,
} from '../../src/scene/r6KittyNaturalMotion';
import { r5KittyScaleForGrid } from '../../src/scene/r5CharacterContract';

const SESSION_SECONDS = 240;
const SEEDS = Array.from({ length: 30 }, (_, index) => `r6-natural-lively-fixed-seed-${String(index).padStart(2, '0')}`);
const locomotionActions = new Set(['walk', 'run', 'dash']);

interface SessionReport {
  seed: string;
  state: KittyNaturalMotionState;
  diagnostic: ReturnType<typeof kittyNaturalMotionDiagnostic>;
  signature: string;
  traceSignature: string;
  integerPoses: Map<number, KittyNaturalPose>;
  maximumStepDistance: number;
  maximumSpeedDelta: number;
  maximumHeadingDelta: number;
  maximumAngularAcceleration: number;
  maximumAxisExtent: number;
  longestLocomotionStallSeconds: number;
  footSlideViolations: number;
}

const angleDistance = (first: number, second: number) => (
  Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)))
);

function runSession(seed: string, seconds = SESSION_SECONDS): SessionReport {
  const state = createKittyNaturalMotion(seed, 'test-override');
  const integerPoses = new Map<number, KittyNaturalPose>();
  const trace: string[] = [];
  let priorPose = sampleKittyNaturalPose(state, 33);
  let priorAngularVelocity = state.angularVelocity;
  let maximumStepDistance = 0;
  let maximumSpeedDelta = 0;
  let maximumHeadingDelta = 0;
  let maximumAngularAcceleration = 0;
  let maximumAxisExtent = Math.max(Math.abs(state.position.x), Math.abs(state.position.z));
  let currentLocomotionStall = 0;
  let longestLocomotionStallSeconds = 0;
  let footSlideViolations = 0;
  integerPoses.set(0, priorPose);
  const steps = Math.round(seconds / R6_KITTY_FIXED_STEP_SECONDS);
  for (let step = 1; step <= steps; step += 1) {
    advanceKittyNaturalMotion(state, R6_KITTY_FIXED_STEP_SECONDS);
    const pose = sampleKittyNaturalPose(state, 33);
    const stepDistance = Math.hypot(
      pose.normalizedX - priorPose.normalizedX,
      pose.normalizedZ - priorPose.normalizedZ,
    );
    maximumStepDistance = Math.max(maximumStepDistance, stepDistance);
    maximumSpeedDelta = Math.max(maximumSpeedDelta, Math.abs(pose.normalizedSpeed - priorPose.normalizedSpeed));
    maximumHeadingDelta = Math.max(maximumHeadingDelta, angleDistance(pose.heading, priorPose.heading));
    maximumAngularAcceleration = Math.max(
      maximumAngularAcceleration,
      Math.abs(state.angularVelocity - priorAngularVelocity),
    );
    maximumAxisExtent = Math.max(maximumAxisExtent, Math.abs(state.position.x), Math.abs(state.position.z));
    if (locomotionActions.has(state.intent) && state.intentElapsedSeconds > 0.55 && state.speed < 0.012) {
      currentLocomotionStall += R6_KITTY_FIXED_STEP_SECONDS;
      longestLocomotionStallSeconds = Math.max(longestLocomotionStallSeconds, currentLocomotionStall);
    } else {
      currentLocomotionStall = 0;
    }
    if (pose.normalizedSpeed > 0.008 && (!pose.moving || !locomotionActions.has(pose.action))) {
      footSlideViolations += 1;
    }
    if (step % 60 === 0) integerPoses.set(Math.round(step / 60), pose);
    if (step % 180 === 0) {
      trace.push(`${pose.normalizedX.toFixed(4)},${pose.normalizedZ.toFixed(4)},${pose.intent}`);
    }
    priorPose = pose;
    priorAngularVelocity = state.angularVelocity;
  }
  const diagnostic = kittyNaturalMotionDiagnostic(state);
  return {
    seed,
    state,
    diagnostic,
    signature: kittyNaturalMotionSignature(state),
    traceSignature: trace.join('|'),
    integerPoses,
    maximumStepDistance,
    maximumSpeedDelta,
    maximumHeadingDelta,
    maximumAngularAcceleration,
    maximumAxisExtent,
    longestLocomotionStallSeconds,
    footSlideViolations,
  };
}

let reports: SessionReport[] = [];

beforeAll(() => {
  reports = SEEDS.map((seed) => runSession(seed));
});

describe('v1.1.0 R6 session-seeded natural lively Kitty motion', () => {
  it('declares an unbounded stateful model with no modulo cycle, fixed waypoint order, or mandatory origin return', () => {
    const diagnostic = reports[0].diagnostic;
    expect(R6_KITTY_MOTION_MODEL).toBe('session-seeded-natural-lively-v1');
    expect(diagnostic.loopPolicy).toEqual({
      finiteCycle: false,
      moduloTime: false,
      fixedWaypointOrder: false,
      mandatoryOriginReturn: false,
    });
    expect(diagnostic.elapsedSeconds).toBe(SESSION_SECONDS);
  });

  it('creates ten distinct 128-bit production seeds while fixed seeds remain an explicit test override', () => {
    const seeds = Array.from({ length: 10 }, () => createProductionKittySessionSeed());
    expect(new Set(seeds).size).toBe(10);
    seeds.forEach((seed) => expect(seed).toMatch(/^[0-9a-f]{32}$/));
    expect(reports.every((report) => report.state.seedSource === 'test-override')).toBe(true);
  });

  it('replays a fixed seed exactly, including pose, intent, heatmap, recent targets, and RNG state', () => {
    const first = runSession('r6-exact-replay', 180);
    const second = runSession('r6-exact-replay', 180);
    expect(second.state).toEqual(first.state);
    expect(second.signature).toBe(first.signature);
    expect(second.traceSignature).toBe(first.traceSignature);
  });

  it('seeks to the same deterministic state as incremental fixed-step advancement', () => {
    const incremental = createKittyNaturalMotion('r6-seek-replay', 'test-override');
    for (let index = 0; index < 10_800; index += 1) {
      advanceKittyNaturalMotion(incremental, R6_KITTY_FIXED_STEP_SECONDS);
    }
    const sought = seekKittyNaturalMotion('r6-seek-replay', 'test-override', 180);
    expect(sought).toEqual(incremental);
  });

  it('clones a complete serializable Scan snapshot without shared mutable RNG, heatmap, or target arrays', () => {
    const source = reports[0].state;
    const snapshot = cloneKittyNaturalMotion(source);
    expect(snapshot).toEqual(source);
    expect(JSON.parse(JSON.stringify(snapshot))).toEqual(snapshot);
    snapshot.rng.words[0] ^= 1;
    snapshot.heatmap.seconds[0] += 1;
    snapshot.recentTargets.push({ id: 0, x: 0, z: 0, chosenAtSeconds: 0, intent: 'walk' });
    expect(snapshot.rng.words).not.toEqual(source.rng.words);
    expect(snapshot.heatmap.seconds).not.toEqual(source.heatmap.seconds);
    expect(snapshot.recentTargets).not.toEqual(source.recentTargets);
  });

  it('keeps R5 physical-board scaling and footprint geometry exact at N21, N33, N65, and N105', () => {
    for (const size of [21, 33, 65, 105]) {
      const geometry = kittyNavigationGeometry(size);
      expect(geometry.heroScale).toBe(r5KittyScaleForGrid(size));
      expect(geometry.boardSideWorld).toBe(size + 8);
      expect(geometry.footprintRadiusLocal).toBe(R6_KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL);
      expect(geometry.centerLimitWorld + geometry.footprintRadiusWorld).toBeCloseTo(geometry.boardHalfWorld, 12);
    }
  });

  it('produces thirty distinct long-session motion signatures and traces', () => {
    expect(new Set(reports.map((report) => report.signature)).size).toBe(30);
    expect(new Set(reports.map((report) => report.traceSignature)).size).toBe(30);
    expect(new Set(reports.map((report) => report.state.sessionSeed)).size).toBe(30);
  });

  it('has no common target order and applies recent-target anti-repeat', () => {
    const orders = reports.map((report) => report.state.targetHistory.join(','));
    expect(new Set(orders).size).toBe(30);
    const firstFour = reports.map((report) => report.state.targetHistory.slice(0, 4).join(','));
    expect(new Set(firstFour).size).toBeGreaterThan(24);
    for (const report of reports) {
      for (let index = 1; index < report.state.targetHistory.length; index += 1) {
        expect(report.state.targetHistory[index]).not.toBe(report.state.targetHistory[index - 1]);
      }
      expect(report.state.recentTargets.length).toBeLessThanOrEqual(8);
    }
  });

  it('keeps every long-session behavior distribution inside the requested natural bands', () => {
    for (const report of reports) {
      const distribution = report.diagnostic.intentDistribution;
      const nonLocomotion = distribution.observe + distribution.turn + distribution.tail;
      expect(distribution.walk).toBeGreaterThanOrEqual(0.35);
      expect(distribution.walk).toBeLessThanOrEqual(0.55);
      expect(distribution.run).toBeGreaterThanOrEqual(0.2);
      expect(distribution.run).toBeLessThanOrEqual(0.35);
      expect(distribution.dash).toBeGreaterThanOrEqual(0.05);
      expect(distribution.dash).toBeLessThanOrEqual(0.12);
      expect(nonLocomotion).toBeGreaterThanOrEqual(0.15);
      expect(nonLocomotion).toBeLessThanOrEqual(0.25);
    }
  });

  it('observes walk, run, dash, observe, turn, and tail in every long session', () => {
    for (const report of reports) {
      expect(Object.values(report.state.intentTransitions).every((count) => count > 0)).toBe(true);
    }
  });

  it('does not repeat the full route or return to the same pose after 44 or 88 seconds', () => {
    for (const report of reports) {
      const pose0 = report.integerPoses.get(0)!;
      const pose44 = report.integerPoses.get(44)!;
      const pose88 = report.integerPoses.get(88)!;
      expect(Math.hypot(pose44.normalizedX - pose0.normalizedX, pose44.normalizedZ - pose0.normalizedZ)).toBeGreaterThan(0.02);
      expect(Math.hypot(pose88.normalizedX - pose44.normalizedX, pose88.normalizedZ - pose44.normalizedZ)).toBeGreaterThan(0.02);
      expect(`${pose44.intent}:${pose44.heading}`).not.toBe(`${pose0.intent}:${pose0.heading}`);
    }
  });

  it('enforces inertia, finite turn rate, smooth acceleration, and no 180-degree frame flips', () => {
    for (const report of reports) {
      expect(report.maximumStepDistance).toBeLessThanOrEqual(0.006);
      expect(report.maximumSpeedDelta).toBeLessThanOrEqual(0.0101);
      expect(report.maximumHeadingDelta).toBeLessThanOrEqual(0.037);
      expect(report.maximumAngularAcceleration).toBeLessThanOrEqual(0.077);
      expect(report.maximumHeadingDelta).toBeLessThan(Math.PI / 2);
    }
  });

  it('never leaves the board safety inset or enters boundary oscillation', () => {
    for (const report of reports) {
      expect(report.maximumAxisExtent).toBeLessThanOrEqual(report.diagnostic.safety.normalizedSafetyLimit + 1e-8);
      expect(report.diagnostic.safety.boundaryClearance).toBeGreaterThanOrEqual(-1e-8);
      expect(report.state.boundaryCorrections).toBeLessThanOrEqual(2);
      for (const size of [21, 33, 105]) {
        const pose = sampleKittyNaturalPose(report.state, size);
        const geometry = kittyNavigationGeometry(size);
        expect(Math.abs(pose.worldX) + geometry.footprintRadiusWorld).toBeLessThanOrEqual(geometry.boardHalfWorld + 1e-6);
        expect(Math.abs(pose.worldZ) + geometry.footprintRadiusWorld).toBeLessThanOrEqual(geometry.boardHalfWorld + 1e-6);
      }
    }
  });

  it('has no locomotion stall or foot sliding', () => {
    for (const report of reports) {
      expect(report.longestLocomotionStallSeconds).toBeLessThanOrEqual(1.4);
      expect(report.footSlideViolations).toBe(0);
      expect(report.diagnostic.safety.stuckSeconds).toBeLessThanOrEqual(1.4);
    }
  });

  it('uses visitation heatmaps across the board and keeps bounded recent-target history', () => {
    const union = new Set<number>();
    for (const report of reports) {
      report.state.heatmap.seconds.forEach((seconds, cell) => { if (seconds > 0) union.add(cell); });
      expect(report.state.heatmap.totalSeconds).toBeCloseTo(SESSION_SECONDS, 5);
      expect(report.state.heatmap.targetSelections.reduce((sum, count) => sum + count, 0)).toBe(report.state.targetHistory.length);
      expect(report.state.recentTargets).toHaveLength(Math.min(8, report.state.targetHistory.length));
    }
    expect(union.size).toBeGreaterThanOrEqual(Math.floor(R6_KITTY_HEATMAP_SIDE ** 2 * 0.85));
  });

  it('preserves the session and world-space continuity while reprojecting across matrix sizes', () => {
    const state = cloneKittyNaturalMotion(reports[3].state);
    const beforeState = cloneKittyNaturalMotion(state);
    const beforePose = sampleKittyNaturalPose(state, 33);
    const result = reprojectKittyNaturalMotionForGrid(state, 33, 65);
    const afterPose = sampleKittyNaturalPose(state, 65);
    expect(result.positionWorldExact).toBe(true);
    expect(result.velocityWorldExact).toBe(true);
    expect(result.positionClamped).toBe(false);
    expect(afterPose.worldX).toBe(beforePose.worldX);
    expect(afterPose.worldZ).toBe(beforePose.worldZ);
    expect(afterPose.heading).toBe(beforePose.heading);
    expect(afterPose.gaitPhase).toBe(beforePose.gaitPhase);
    expect(state.sessionSeed).toBe(beforeState.sessionSeed);
    expect(state.rng).toEqual(beforeState.rng);
    expect(state.intent).toBe(beforeState.intent);
    expect(state.heatmap).toEqual(beforeState.heatmap);
    expect(state.recentTargets).toEqual(beforeState.recentTargets);
  });

  it('keeps the rejected closed-loop code only in tests/fixtures and out of every production source import', () => {
    const sourceRoot = path.join(process.cwd(), 'src');
    const files: string[] = [];
    const visit = (directory: string) => {
      for (const name of readdirSync(directory)) {
        const candidate = path.join(directory, name);
        if (statSync(candidate).isDirectory()) visit(candidate);
        else if (/\.(?:ts|tsx|js|mjs)$/.test(name)) files.push(candidate);
      }
    };
    visit(sourceRoot);
    const productionText = files.map((file) => readFileSync(file, 'utf8')).join('\n');
    expect(productionText).not.toContain('v11Kitty');
    expect(productionText).not.toContain('KITTY_MOTION_CYCLE_SECONDS');
    expect(productionText).not.toContain('createKittyMotionPlan');
    const fixture = readFileSync(path.join(process.cwd(), 'tests', 'fixtures', 'r5KittyClosedLoop.ts'), 'utf8');
    expect(fixture).toContain('Rejected R5 closed-loop implementation retained only as a historical test fixture.');
    expect(fixture).toContain('KITTY_MOTION_CYCLE_SECONDS = 44');
  });
});
