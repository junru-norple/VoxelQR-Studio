import { describe, expect, it } from 'vitest';
import { createCanonicalQr } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { buildV8Hero, isHeroAreaSemantic } from '../../src/scene/v8Hero';
import {
  R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  R4_KITTY_LINEAR_SCALE,
  R4_WANDERER_LINEAR_SCALE,
} from '../../src/scene/r4CharacterContract';
import {
  R5_KITTY_LINEAR_SCALE_FROM_R3,
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_MASK_CAMERA,
  R5_KITTY_MASK_DENOMINATOR,
  R5_KITTY_PROJECTED_SILHOUETTE_MAX,
  R5_KITTY_PROJECTED_SILHOUETTE_MIN,
  R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  R5_KITTY_REFERENCE_PHYSICAL_BOARD_SIDE,
  R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
  R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES,
  r5KittyScaleForGrid,
} from '../../src/scene/r5CharacterContract';
import {
  createKittyMotionPlan,
  createR4ProtectedLaneMotionPlan,
  KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
  KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL,
  sampleKittyMotion,
} from '../fixtures/r5KittyClosedLoop';

const planFor = (payloadLength: number, suffix: string) => {
  const qr = createCanonicalQr('X'.repeat(payloadLength), 'text');
  return createKittyMotionPlan(qr, seededRandom(hashSeed(`r5-correction:${suffix}`)));
};

describe('v1.1.0 R5 correction-only strict-superset contracts', () => {
  it('locks the measured uniform R4→R5 coefficient and exact linear transform composition', () => {
    expect(R5_KITTY_LINEAR_SCALE_FROM_R4).toBe(0.38);
    expect(R5_KITTY_LINEAR_SCALE_FROM_R3).toBeCloseTo(R4_KITTY_LINEAR_SCALE * 0.38, 12);
    [0.9675, 0.75, 0.6375].map((axis) => axis * R5_KITTY_LINEAR_SCALE_FROM_R4)
      .forEach((axis, index) => expect(axis).toBeCloseTo([0.36765, 0.285, 0.24225][index], 12));
  });

  it('locks the deterministic silhouette band, fixed R4 camera, and full-board denominator', () => {
    expect([R5_KITTY_PROJECTED_SILHOUETTE_MIN, R5_KITTY_PROJECTED_SILHOUETTE_TARGET, R5_KITTY_PROJECTED_SILHOUETTE_MAX])
      .toEqual([0.07, 0.08, 0.09]);
    expect(R5_KITTY_MASK_CAMERA).toBe('r4-fixed-three-quarter-explore-camera');
    expect(R5_KITTY_MASK_DENOMINATOR).toBe('full-physical-board-top-mask');
  });

  it('normalizes Kitty to the complete physical board while leaving N33 exactly unchanged', () => {
    expect(R5_KITTY_REFERENCE_PHYSICAL_BOARD_SIDE).toBe(41);
    expect(R5_PHYSICAL_BOARD_QUIET_ZONE_MODULES).toBe(4);
    expect(r5KittyScaleForGrid(33)).toBe(1);
    for (const size of [21, 33, 65, 105]) {
      expect((size + 8) / r5KittyScaleForGrid(size)).toBeCloseTo(41, 12);
    }
  });

  it('keeps the archived R4 protected-lane helper on N/33 while R5 uses (N+8)/41', () => {
    const qr = createCanonicalQr('X'.repeat(36), 'text');
    const legacy = createR4ProtectedLaneMotionPlan(qr, seededRandom(hashSeed('legacy-r4-scale')));
    const current = createKittyMotionPlan(qr, seededRandom(hashSeed('current-r5-scale')));
    expect(legacy.heroScale).toBeCloseTo(qr.size / 33, 12);
    expect(current.heroScale).toBeCloseTo((qr.size + 8) / 41, 12);
  });

  it('keeps the visual and shadow envelope in one constant proportion across representative matrices', () => {
    const ratios = [1, 36, 201, 600].map((length, index) => {
      const plan = planFor(length, `ratio-${index}`);
      expect(plan.coverage.fullBoardCoverageRatio).toBe(1);
      return KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL * plan.heroScale / plan.boardSideWorld;
    });
    ratios.forEach((ratio) => expect(ratio).toBeCloseTo(ratios[0], 12));
    expect(KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL - KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL)
      .toBeCloseTo(R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL, 12);
    expect(KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL).toBeCloseTo(
      R3_KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL * R4_KITTY_LINEAR_SCALE * R5_KITTY_LINEAR_SCALE_FROM_R4,
      12,
    );
  });

  it('publishes replayable segment identity, progress, target, velocity, and action for snapshotting', () => {
    const plan = planFor(36, 'snapshot-fields');
    const pose = sampleKittyMotion(plan, 7.25);
    expect(pose.segmentIndex).toBeGreaterThanOrEqual(0);
    expect(pose.segmentIndex).toBeLessThan(plan.segments.length);
    expect(pose.segmentProgress).toBeGreaterThanOrEqual(0);
    expect(pose.segmentProgress).toBeLessThanOrEqual(1);
    expect(plan.route[pose.segmentIndex + 1]).toBeDefined();
    expect(Number.isFinite(pose.speed)).toBe(true);
    expect(['idle', 'look', 'walk', 'run', 'turn', 'dash']).toContain(pose.action);
  });

  it('keeps every representative R5 route closed, boundary-safe, and 100% full-board covered', () => {
    for (const [index, length] of [1, 36, 201, 600].entries()) {
      const plan = planFor(length, `closed-${index}`);
      expect(plan.route[0]).toEqual(plan.route.at(-1));
      expect(plan.coverage.fullBoardCoverageRatio).toBe(1);
      expect(plan.coverage.activeQrCoverageRatio).toBe(1);
      expect(plan.coverage.quietZoneCoverageRatio).toBe(1);
      expect(plan.coverage.functionModuleCoverageRatio).toBe(1);
    }
  });

  it('preserves the R4 Wanderer scale and 25 non-scarf parts while replacing only the scarf with eight readable pieces', () => {
    const qr = createCanonicalQr('r5-wanderer-scarf-superset', 'text');
    const hero = buildV8Hero(qr, 'wanderer', seededRandom(hashSeed('wanderer:hero:v8.2')));
    const character = hero.bodies.filter((state) => isHeroAreaSemantic('wanderer', state.semantic));
    const scarf = character.filter((state) => state.semantic === 'wanderer-scarf');
    expect(R4_WANDERER_LINEAR_SCALE).toBe(0.7);
    expect(character.filter((state) => state.semantic !== 'wanderer-scarf')).toHaveLength(25);
    expect(scarf.map((state) => state.part).sort()).toEqual([
      'scarf-knot-side-front', 'scarf-loop-back', 'scarf-loop-front-left', 'scarf-loop-front-right',
      'scarf-loop-left', 'scarf-loop-right', 'scarf-tail-long-side', 'scarf-tail-short-forward',
    ]);
  });
});
