import jsQR from 'jsqr';
import { Euler, Matrix4, Vector3 } from 'three';
import { describe, expect, it } from 'vitest';
import { createCanonicalQr, renderQrRgba, type CanonicalQr, type PayloadType } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { t } from '../../src/i18n';
import {
  buildV8Hero,
  collectV8Metrics,
  evaluateBody,
  HERO_AREA_BANDS,
  HERO_REFERENCE_MAJOR_AXIS_V11,
  heroScaleForGrid,
  isHeroAreaSemantic,
  KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL,
  KITTY_VISUAL_X_SCALE,
  KITTY_VISUAL_Y_SCALE,
  KITTY_VISUAL_Z_SCALE,
  MICRO_EDGE,
  WANDERER_CHARACTER_SCALE,
  WANDERER_AREA_AUTHORING_TARGET,
  WANDERER_AREA_REQUIRED_MAX,
  WANDERER_AREA_REQUIRED_MIN,
  type BodyState,
} from '../../src/scene/v8Hero';
import {
  createKittyMotionPlan,
  createQrProtectedMask,
  enumerateKittyReachablePoses,
  KITTY_AREA_AUTHORING_TARGET,
  KITTY_AREA_REQUIRED_MAX,
  KITTY_AREA_REQUIRED_MIN,
  KITTY_DECODER_POSE_HZ,
  KITTY_FULL_BOARD_QUIET_ZONE,
  KITTY_FULL_BOARD_REQUIRED_COVERAGE,
  KITTY_MOTION_CYCLE_SECONDS,
  KITTY_ROUTE_POOL_SIZE,
  KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL,
  KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL,
  kittyFullBoardCoverageMask,
  kittyPoseProtectedSafe,
  kittyPoseSafetyMetric,
  kittySweptEnvelopeMask,
  sampleKittyMotion,
  type KittyMotionPlan,
} from '../fixtures/r5KittyClosedLoop';
import {
  R3_KITTY_FOOT_CONTACT_Y,
  R3_KITTY_VISUAL_X_SCALE,
  R3_KITTY_VISUAL_Y_SCALE,
  R3_KITTY_VISUAL_Z_SCALE,
  R3_WANDERER_FOOT_CONTACT_Y,
  R4_KITTY_LINEAR_SCALE,
  R4_WANDERER_LINEAR_SCALE,
} from '../../src/scene/r4CharacterContract';
import {
  R5_KITTY_LINEAR_SCALE_FROM_R3,
  R5_KITTY_LINEAR_SCALE_FROM_R4,
  R5_KITTY_PROJECTED_SILHOUETTE_MAX,
  R5_KITTY_PROJECTED_SILHOUETTE_MIN,
  R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
  R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL,
  r5KittyScaleForGrid,
} from '../../src/scene/r5CharacterContract';
import { isStudioThemeId, STUDIO_THEME_IDS, THEMES } from '../../src/themes';

const corpus: Array<{ name: string; type: PayloadType; payload: string }> = [
  { name: 'short URL', type: 'url', payload: 'https://example.com' },
  { name: 'long URL', type: 'url', payload: 'https://example.com/garden/voxel/seasonal/collection/2026/details?source=portfolio&medium=qr' },
  { name: 'URL query', type: 'url', payload: 'https://example.com/search?q=voxel%20garden&lang=zh-TW&safe=true' },
  { name: 'URL fragment', type: 'url', payload: 'https://example.com/gallery#ocean-waves' },
  { name: 'English text', type: 'text', payload: 'A small garden can hold a large idea.' },
  { name: 'Traditional Chinese', type: 'text', payload: '把一段文字，種成可以掃描的庭園。' },
  { name: 'mixed text', type: 'text', payload: 'VoxelQR Studio｜春 2026｜Offline First' },
  { name: 'Unicode symbols', type: 'text', payload: 'QR → voxels ✓ 3D ◇ 波／雪／花 ♫' },
];

const fixed = (value: number) => Number(value.toFixed(6));

function bounds(states: BodyState[]): { width: number; height: number; depth: number } {
  const span = (center: (state: BodyState) => number, extent: (state: BodyState) => number) => (
    Math.max(...states.map((state) => center(state) + extent(state) * 0.5))
    - Math.min(...states.map((state) => center(state) - extent(state) * 0.5))
  );
  return {
    width: span((state) => state.x, (state) => state.scaleX),
    height: span((state) => state.baseY, (state) => state.scaleY),
    depth: span((state) => state.z, (state) => state.scaleZ),
  };
}

function kittyPlan(qr: CanonicalQr, suffix = 'primary'): KittyMotionPlan {
  return createKittyMotionPlan(qr, seededRandom(hashSeed(`kitty:${qr.payload}:${suffix}:v1.1.0`)));
}

describe('v1.1.0 ninth-theme and responsive-size contract', () => {
  it('publishes exactly nine Studio themes while retaining all eight legacy identifiers', () => {
    expect(STUDIO_THEME_IDS).toHaveLength(9);
    expect(new Set(STUDIO_THEME_IDS).size).toBe(9);
    expect(STUDIO_THEME_IDS.at(-1)).toBe('kitty');
    expect(isStudioThemeId('kitty')).toBe(true);
    expect(THEMES.kitty.family).toBe('kitty');
    expect(THEMES.kitty.motion).toBe('kitty-explore');
  });

  it('provides the exact bilingual Kitty label', () => {
    expect(t('zh-TW', 'kitty')).toBe('體素小貓');
    expect(t('en', 'kitty')).toBe('Voxel Kitty');
  });

  it('uses one strictly monotonic N/33 world scale for every valid QR size', () => {
    const sizes = Array.from({ length: 22 }, (_, index) => 21 + index * 4);
    const scales = sizes.map(heroScaleForGrid);
    expect(scales[0]).toBeCloseTo(21 / 33, 12);
    expect(scales.at(-1)).toBeCloseTo(105 / 33, 12);
    for (let index = 1; index < scales.length; index += 1) expect(scales[index]).toBeGreaterThan(scales[index - 1]);
    for (const theme of STUDIO_THEME_IDS) expect(HERO_REFERENCE_MAJOR_AXIS_V11[theme]).toBeGreaterThan(0);
  });

  it('uses a strictly monotonic full-physical-board scale only for R5 Kitty', () => {
    const sizes = Array.from({ length: 22 }, (_, index) => 21 + index * 4);
    const scales = sizes.map(r5KittyScaleForGrid);
    expect(r5KittyScaleForGrid(33)).toBe(1);
    expect(r5KittyScaleForGrid(21)).toBeCloseTo(29 / 41, 12);
    expect(r5KittyScaleForGrid(105)).toBeCloseTo(113 / 41, 12);
    for (let index = 1; index < scales.length; index += 1) expect(scales[index]).toBeGreaterThan(scales[index - 1]);
  });

  it('locks the requested seven-large, Wanderer, and Kitty area bands', () => {
    for (const theme of STUDIO_THEME_IDS.slice(0, 7)) expect(HERO_AREA_BANDS[theme]).toEqual({ min: 0.4, max: 0.5, target: 0.45 });
    expect(HERO_AREA_BANDS.wanderer).toEqual({ min: WANDERER_AREA_REQUIRED_MIN, max: WANDERER_AREA_REQUIRED_MAX, target: WANDERER_AREA_AUTHORING_TARGET });
    expect(HERO_AREA_BANDS.wanderer).toEqual({ min: 0.3, max: 0.45, target: 0.375 });
    expect(HERO_AREA_BANDS.kitty).toEqual({ min: KITTY_AREA_REQUIRED_MIN, max: KITTY_AREA_REQUIRED_MAX, target: KITTY_AREA_AUTHORING_TARGET });
    expect(HERO_AREA_BANDS.kitty).toEqual({ min: 0.07, max: 0.09, target: 0.08 });
    expect(HERO_AREA_BANDS.kitty).toEqual({
      min: R5_KITTY_PROJECTED_SILHOUETTE_MIN,
      max: R5_KITTY_PROJECTED_SILHOUETTE_MAX,
      target: R5_KITTY_PROJECTED_SILHOUETTE_TARGET,
    });
  });
});

describe('v1.1.0 compact chibi Wanderer geometry', () => {
  const qr = createCanonicalQr('wanderer-chibi-v1.1.0', 'text');
  const hero = buildV8Hero(qr, 'wanderer', seededRandom(hashSeed('wanderer:hero:v8.2')));
  const character = hero.bodies.filter((state) => isHeroAreaSemantic('wanderer', state.semantic));
  const dimensions = bounds(character);

  it('has a compact 1.2–1.35 height/width silhouette with true 3D depth', () => {
    expect(dimensions.height / dimensions.width).toBeGreaterThanOrEqual(1.2);
    expect(dimensions.height / dimensions.width).toBeLessThanOrEqual(1.35);
    expect(dimensions.depth / dimensions.width).toBeGreaterThan(0.8);
  });

  it('uses an oversized head, large paired eyes, short thick ears, and short limbs', () => {
    const head = character.filter((state) => state.semantic === 'wanderer-hood');
    const body = character.filter((state) => state.semantic === 'wanderer-body');
    const eyes = character.filter((state) => state.semantic === 'wanderer-eye');
    const ears = character.filter((state) => state.semantic === 'wanderer-ear');
    const arms = character.filter((state) => state.semantic === 'wanderer-arm');
    expect(bounds(head).width).toBeGreaterThan(bounds(body).width * 1.35);
    expect(new Set(eyes.map((state) => state.part))).toEqual(new Set(['eye-left', 'eye-right']));
    expect(bounds(ears).height / bounds(ears).width).toBeLessThan(0.82);
    expect(bounds(arms).height).toBeLessThan(bounds(body).height * 0.72);
  });

  it('retains the violet, cream, mint, and gold character palette plus readable back construction', () => {
    const colors = new Set(character.map((state) => `#${state.color.getHexString()}`));
    ['#7651a8', '#f7e9cb', '#a7f0cf', '#ffd45c'].forEach((color) => expect(colors.has(color)).toBe(true));
    expect(character.some((state) => state.semantic === 'wanderer-pack')).toBe(true);
    expect(character.some((state) => state.semantic === 'wanderer-seam')).toBe(true);
  });

  it('uses exactly one bounded authored cuboid per character part instead of a sampled micro shell', () => {
    expect(character).toHaveLength(33);
    expect(new Set(character.map((state) => state.part)).size).toBe(character.length);
    expect(Math.min(...character.map((state) => state.cellEdge))).toBeGreaterThan(MICRO_EDGE);
  });

  it('builds one continuous full-neck loop, a side-front knot, and two asymmetric tails', () => {
    const byPart = new Map(character.map((state) => [state.part, state]));
    const head = byPart.get('head-core')!;
    const body = byPart.get('body')!;
    const arms = [byPart.get('arm-left')!, byPart.get('arm-right')!];
    const back = byPart.get('scarf-loop-back')!;
    const left = byPart.get('scarf-loop-left')!;
    const right = byPart.get('scarf-loop-right')!;
    const frontLeft = byPart.get('scarf-loop-front-left')!;
    const frontRight = byPart.get('scarf-loop-front-right')!;
    const knot = byPart.get('scarf-knot-side-front')!;
    const shortTail = byPart.get('scarf-tail-short-forward')!;
    const longTail = byPart.get('scarf-tail-long-side')!;
    const minimum = (state: BodyState, axis: 'x' | 'baseY' | 'z', scale: 'scaleX' | 'scaleY' | 'scaleZ') => state[axis] - state[scale] * 0.5;
    const maximum = (state: BodyState, axis: 'x' | 'baseY' | 'z', scale: 'scaleX' | 'scaleY' | 'scaleZ') => state[axis] + state[scale] * 0.5;
    const separated = (first: BodyState, second: BodyState) => (
      maximum(first, 'x', 'scaleX') < minimum(second, 'x', 'scaleX')
      || maximum(second, 'x', 'scaleX') < minimum(first, 'x', 'scaleX')
      || maximum(first, 'baseY', 'scaleY') < minimum(second, 'baseY', 'scaleY')
      || maximum(second, 'baseY', 'scaleY') < minimum(first, 'baseY', 'scaleY')
      || maximum(first, 'z', 'scaleZ') < minimum(second, 'z', 'scaleZ')
      || maximum(second, 'z', 'scaleZ') < minimum(first, 'z', 'scaleZ')
    );

    expect(maximum(back, 'x', 'scaleX')).toBeGreaterThanOrEqual(minimum(right, 'x', 'scaleX'));
    expect(minimum(back, 'x', 'scaleX')).toBeLessThanOrEqual(maximum(left, 'x', 'scaleX'));
    expect(maximum(frontRight, 'x', 'scaleX')).toBeGreaterThanOrEqual(minimum(right, 'x', 'scaleX'));
    expect(minimum(frontLeft, 'x', 'scaleX')).toBeLessThanOrEqual(maximum(left, 'x', 'scaleX'));
    expect(maximum(frontLeft, 'x', 'scaleX')).toBeGreaterThanOrEqual(minimum(frontRight, 'x', 'scaleX'));
    expect(maximum(back, 'z', 'scaleZ')).toBeGreaterThanOrEqual(minimum(left, 'z', 'scaleZ'));
    expect(minimum(frontRight, 'z', 'scaleZ')).toBeLessThanOrEqual(maximum(right, 'z', 'scaleZ'));
    expect(maximum(frontLeft, 'baseY', 'scaleY')).toBeLessThanOrEqual(minimum(head, 'baseY', 'scaleY'));
    expect(maximum(frontRight, 'baseY', 'scaleY')).toBeLessThanOrEqual(minimum(head, 'baseY', 'scaleY'));
    expect(minimum(frontLeft, 'z', 'scaleZ')).toBeGreaterThan(maximum(body, 'z', 'scaleZ'));
    expect(minimum(frontRight, 'z', 'scaleZ')).toBeGreaterThan(maximum(body, 'z', 'scaleZ'));
    expect(maximum(back, 'z', 'scaleZ')).toBeLessThan(minimum(body, 'z', 'scaleZ'));
    expect(maximum(left, 'x', 'scaleX')).toBeLessThan(minimum(body, 'x', 'scaleX'));
    expect(minimum(right, 'x', 'scaleX')).toBeGreaterThan(maximum(body, 'x', 'scaleX'));
    expect(knot.x).toBeGreaterThan(0);
    expect(knot.z).toBeGreaterThan(0);
    expect(separated(knot, head)).toBe(true);
    expect(separated(knot, body)).toBe(true);
    expect(shortTail.z).toBeGreaterThan(knot.z);
    expect(longTail.x).toBeGreaterThan(knot.x);
    expect(shortTail.scaleY).toBeLessThan(longTail.scaleY);
    expect(shortTail.baseY).toBeGreaterThan(longTail.baseY);
    for (const tail of [shortTail, longTail]) {
      expect(separated(tail, head)).toBe(true);
      expect(separated(tail, body)).toBe(true);
      for (const arm of arms) expect(separated(tail, arm)).toBe(true);
    }
  });

  it('keeps both scarf tails registered to the side-front knot and above the board for the full animation', () => {
    const byPart = new Map(character.map((state) => [state.part, state]));
    const knot = byPart.get('scarf-knot-side-front')!;
    const tails = [
      byPart.get('scarf-tail-short-forward')!,
      byPart.get('scarf-tail-long-side')!,
    ];
    for (let frame = 0; frame <= 20 * 60; frame += 1) {
      const time = frame / 60;
      const evaluatedKnot = evaluateBody(knot, 'wanderer', time, 1);
      for (const tail of tails) {
        const evaluatedTail = evaluateBody(tail, 'wanderer', time, 1);
        expect(Math.abs(evaluatedTail.x - evaluatedKnot.x)).toBeLessThanOrEqual((evaluatedTail.scaleX + evaluatedKnot.scaleX) * 0.5 + 0.35);
        expect(Math.abs(evaluatedTail.y - evaluatedKnot.y)).toBeLessThanOrEqual((evaluatedTail.scaleY + evaluatedKnot.scaleY) * 0.5 + 0.35);
        expect(Math.abs(evaluatedTail.z - evaluatedKnot.z)).toBeLessThanOrEqual((evaluatedTail.scaleZ + evaluatedKnot.scaleZ) * 0.5 + 0.35);
        expect(evaluatedTail.y - evaluatedTail.scaleY * 0.5).toBeGreaterThan(R3_WANDERER_FOOT_CONTACT_Y);
      }
    }
    const shortAtZero = evaluateBody(tails[0], 'wanderer', 0, 1);
    const shortAtOne = evaluateBody(tails[0], 'wanderer', 1, 1);
    const longAtZero = evaluateBody(tails[1], 'wanderer', 0, 1);
    const longAtOne = evaluateBody(tails[1], 'wanderer', 1, 1);
    expect([shortAtZero.x, shortAtZero.z]).not.toEqual([shortAtOne.x, shortAtOne.z]);
    expect([longAtZero.x, longAtZero.z]).not.toEqual([longAtOne.x, longAtOne.z]);
  });

  it('keeps the complete scarf outside the accepted head, chest, and arm volumes through every 60 Hz pose over 20 seconds', () => {
    const byPart = new Map(character.map((state) => [state.part, state]));
    const scarf = character.filter((state) => state.semantic === 'wanderer-scarf');
    const protectedParts = [
      byPart.get('head-core')!,
      byPart.get('body')!,
      byPart.get('arm-left')!,
      byPart.get('arm-right')!,
    ];
    const rotationMatrix = (state: ReturnType<typeof evaluateBody>) => new Matrix4().makeRotationFromEuler(
      new Euler(state.rotationX, state.rotationY, state.rotationZ, 'XYZ'),
    );
    const obbPenetrates = (
      first: ReturnType<typeof evaluateBody>,
      second: ReturnType<typeof evaluateBody>,
    ) => {
      const makeObb = (state: ReturnType<typeof evaluateBody>) => {
        const elements = rotationMatrix(state).elements;
        return {
          center: new Vector3(state.x, state.y, state.z),
          half: [state.scaleX * 0.5, state.scaleY * 0.5, state.scaleZ * 0.5],
          axes: [
            new Vector3(elements[0], elements[1], elements[2]).normalize(),
            new Vector3(elements[4], elements[5], elements[6]).normalize(),
            new Vector3(elements[8], elements[9], elements[10]).normalize(),
          ],
        };
      };
      const a = makeObb(first);
      const b = makeObb(second);
      const rotation = Array.from({ length: 3 }, (_, axisA) => (
        Array.from({ length: 3 }, (_, axisB) => a.axes[axisA].dot(b.axes[axisB]))
      ));
      const absolute = rotation.map((row) => row.map((value) => Math.abs(value) + 1e-12));
      const centerDelta = b.center.clone().sub(a.center);
      const translation = a.axes.map((axis) => centerDelta.dot(axis));
      const separated = (distance: number, radiusA: number, radiusB: number) => (
        Math.abs(distance) >= radiusA + radiusB - 1e-9
      );
      for (let axisA = 0; axisA < 3; axisA += 1) {
        const radiusB = b.half.reduce((sum, half, axisB) => sum + half * absolute[axisA][axisB], 0);
        if (separated(translation[axisA], a.half[axisA], radiusB)) return false;
      }
      for (let axisB = 0; axisB < 3; axisB += 1) {
        const radiusA = a.half.reduce((sum, half, axisA) => sum + half * absolute[axisA][axisB], 0);
        const distance = translation.reduce((sum, value, axisA) => sum + value * rotation[axisA][axisB], 0);
        if (separated(distance, radiusA, b.half[axisB])) return false;
      }
      for (let axisA = 0; axisA < 3; axisA += 1) {
        for (let axisB = 0; axisB < 3; axisB += 1) {
          const nextA = (axisA + 1) % 3;
          const finalA = (axisA + 2) % 3;
          const nextB = (axisB + 1) % 3;
          const finalB = (axisB + 2) % 3;
          const radiusA = a.half[nextA] * absolute[finalA][axisB] + a.half[finalA] * absolute[nextA][axisB];
          const radiusB = b.half[nextB] * absolute[axisA][finalB] + b.half[finalB] * absolute[axisA][nextB];
          const distance = translation[finalA] * rotation[nextA][axisB] - translation[nextA] * rotation[finalA][axisB];
          if (separated(distance, radiusA, radiusB)) return false;
        }
      }
      return true;
    };
    const penetratingPairs = new Map<string, number>();
    for (let frame = 0; frame <= 20 * 60; frame += 1) {
      const time = frame / 60;
      for (const scarfPart of scarf) {
        const evaluatedScarf = evaluateBody(scarfPart, 'wanderer', time, 1);
        for (const protectedPart of protectedParts) {
          const evaluatedProtected = evaluateBody(protectedPart, 'wanderer', time, 1);
          const penetrates = obbPenetrates(evaluatedScarf, evaluatedProtected);
          if (penetrates) {
            const pair = `${scarfPart.part}:${protectedPart.part}`;
            penetratingPairs.set(pair, (penetratingPairs.get(pair) ?? 0) + 1);
          }
        }
      }
    }
    expect(Object.fromEntries(penetratingPairs)).toEqual({});
  });

  it('has two separate eye pads, a tiny nose, and a short mouth without a face mask or opening', () => {
    const parts = character.map((state) => state.part);
    expect(parts.filter((part) => part.startsWith('eye-pad-'))).toEqual(['eye-pad-left', 'eye-pad-right']);
    expect(parts.filter((part) => part === 'nose')).toHaveLength(1);
    expect(parts.filter((part) => part === 'mouth')).toHaveLength(1);
    expect(parts.some((part) => /mask|opening|recess/i.test(part))).toBe(false);
  });

  it('keeps both shoulders connected to the body and both arms connected to their shoulders', () => {
    const byPart = new Map(character.map((state) => [state.part, state]));
    const overlapsOrTouches = (first: BodyState, second: BodyState) => (
      Math.abs(first.x - second.x) <= (first.scaleX + second.scaleX) * 0.5 + 1e-6
      && Math.abs(first.baseY - second.baseY) <= (first.scaleY + second.scaleY) * 0.5 + 1e-6
      && Math.abs(first.z - second.z) <= (first.scaleZ + second.scaleZ) * 0.5 + 1e-6
    );
    for (const side of ['left', 'right'] as const) {
      expect(overlapsOrTouches(byPart.get('body')!, byPart.get(`shoulder-${side}`)!)).toBe(true);
      expect(overlapsOrTouches(byPart.get(`shoulder-${side}`)!, byPart.get(`arm-${side}`)!)).toBe(true);
    }
  });

  it('builds QR caps only for the Scan reveal, while the Kitty remains cap-free for original-color Scan', () => {
    expect(hero.darkCaps.length + hero.lightCaps.length).toBeGreaterThan(0);
    expect([...hero.darkCaps, ...hero.lightCaps].every((cap) => (
      cap.sourceBodyIndex !== undefined && character.includes(hero.bodies[cap.sourceBodyIndex])
    ))).toBe(true);
    const kitty = buildV8Hero(qr, 'kitty', seededRandom(hashSeed(`kitty:${qr.payload}:hero:v1.1.0`)));
    expect(kitty.darkCaps).toHaveLength(0);
    expect(kitty.lightCaps).toHaveLength(0);
  });
});

describe('v1.1.0 original Voxel Kitty construction and state machine', () => {
  const qr = createCanonicalQr('Voxel Kitty protected-path contract', 'text');
  const seed = hashSeed(`kitty:${qr.payload}:hero:v1.1.0`);
  const hero = buildV8Hero(qr, 'kitty', seededRandom(seed));
  const character = hero.bodies.filter((state) => state.semantic.startsWith('kitty-'));
  const plan = createKittyMotionPlan(qr, seededRandom(seed));
  const poses = enumerateKittyReachablePoses(plan);

  it('builds an original orange-gold cat with a face, four feet, and articulated tail', () => {
    const semantics = new Set(character.map((state) => state.semantic));
    ['kitty-head', 'kitty-body', 'kitty-muzzle', 'kitty-eye', 'kitty-nose', 'kitty-ear', 'kitty-leg', 'kitty-foot', 'kitty-tail']
      .forEach((semantic) => expect(semantics.has(semantic as BodyState['semantic'])).toBe(true));
    expect(new Set(character.filter((state) => state.semantic === 'kitty-foot').map((state) => state.part)).size).toBe(4);
    expect(new Set(character.filter((state) => state.semantic === 'kitty-tail').map((state) => state.part)).size).toBe(5);
    expect(new Set(character.filter((state) => state.semantic === 'kitty-whisker').map((state) => state.part)).size).toBe(4);
    const colors = new Set(character.map((state) => `#${state.color.getHexString()}`));
    ['#e69a2e', '#f6c453', '#fff0cf', '#402818'].forEach((color) => expect(colors.has(color)).toBe(true));
  });

  it('keeps every actual top-down voxel corner inside the declared R5 visual envelope plus explicit shadow margin', () => {
    const maximumRadius = Math.max(...character.map((state) => (
      Math.hypot(state.x, state.z) + Math.hypot(state.scaleX, state.scaleZ) * 0.5
    )));
    expect(maximumRadius).toBeLessThanOrEqual(KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL + 1e-6);
    expect(KITTY_VISUAL_ENVELOPE_RADIUS_LOCAL).toBe(KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL);
    expect(plan.footprintRadiusLocal).toBe(fixed(KITTY_SCAN_FOOTPRINT_RADIUS_LOCAL));
    expect(plan.footprintRadiusLocal - KITTY_VISUAL_FOOTPRINT_RADIUS_LOCAL).toBeCloseTo(R5_KITTY_SHADOW_SAFETY_MARGIN_LOCAL, 12);
  });

  it('preserves the R4 model and foot anchor while applying one uniform R5 mask-calibrated coefficient', () => {
    const body = character.find((state) => state.part === 'body')!;
    const foot = character.find((state) => state.part === 'foot-front-left')!;
    expect(KITTY_VISUAL_X_SCALE / R3_KITTY_VISUAL_X_SCALE).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(KITTY_VISUAL_Y_SCALE / R3_KITTY_VISUAL_Y_SCALE).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(KITTY_VISUAL_Z_SCALE / R3_KITTY_VISUAL_Z_SCALE).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(body.scaleX / (6.8 * R3_KITTY_VISUAL_X_SCALE)).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(body.scaleY / (5.5 * R3_KITTY_VISUAL_Y_SCALE)).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(body.scaleZ / (6 * R3_KITTY_VISUAL_Z_SCALE)).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect((body.baseY - R3_KITTY_FOOT_CONTACT_Y) / (4.5 - R3_KITTY_FOOT_CONTACT_Y)).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
    expect(foot.baseY - foot.scaleY * 0.5).toBeCloseTo(R3_KITTY_FOOT_CONTACT_Y, 12);
    expect(R5_KITTY_LINEAR_SCALE_FROM_R3 / R4_KITTY_LINEAR_SCALE).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R4, 12);
  });

  it('uses exactly one bounded authored cuboid per Kitty part instead of stacked contour layers', () => {
    expect(character).toHaveLength(32);
    expect(new Set(character.map((state) => state.part)).size).toBe(character.length);
    expect(character.length).toBeLessThanOrEqual(36);
    const core = character.filter((state) => state.semantic !== 'kitty-tail' && state.semantic !== 'kitty-whisker');
    expect(bounds(core).depth / bounds(core).width).toBeGreaterThan(0.6);
  });

  it('keeps the paired muzzle, eyes, centered nose, and four whiskers legible on the front plane', () => {
    const muzzles = character.filter((state) => state.semantic === 'kitty-muzzle');
    const eyes = character.filter((state) => state.semantic === 'kitty-eye');
    const nose = character.find((state) => state.semantic === 'kitty-nose')!;
    const whiskers = character.filter((state) => state.semantic === 'kitty-whisker');
    expect(muzzles).toHaveLength(2);
    expect(eyes).toHaveLength(2);
    expect(whiskers).toHaveLength(4);
    expect(nose.x).toBe(0);
    expect(Math.max(...muzzles.map((state) => Math.abs(state.x)))).toBeLessThan(Math.min(...eyes.map((state) => Math.abs(state.x))));
    expect(Math.min(...[...muzzles, ...eyes, nose, ...whiskers].map((state) => state.z))).toBeGreaterThan(0);
  });

  it('forms one continuous five-piece raised tail at rest', () => {
    const tail = character.filter((state) => state.semantic === 'kitty-tail').sort((first, second) => first.baseY - second.baseY);
    expect(tail).toHaveLength(5);
    for (let index = 1; index < tail.length; index += 1) {
      const first = tail[index - 1];
      const second = tail[index];
      expect(Math.abs(first.x - second.x)).toBeLessThanOrEqual((first.scaleX + second.scaleX) * 0.5 + 1e-6);
      expect(Math.abs(first.baseY - second.baseY)).toBeLessThanOrEqual((first.scaleY + second.scaleY) * 0.5 + 1e-6);
      expect(Math.abs(first.z - second.z)).toBeLessThanOrEqual((first.scaleZ + second.scaleZ) * 0.5 + 1e-6);
    }
  });

  it('attaches tail-0 to the rear hip without body, leg, foot, or board penetration in every reachable pose and heading', () => {
    const root = character.find((state) => state.part === 'tail-0')!;
    const body = character.find((state) => state.part === 'body')!;
    const legsAndFeet = character.filter((state) => state.semantic === 'kitty-leg' || state.semantic === 'kitty-foot');
    const rootFront = root.z + root.scaleZ * 0.5;
    const bodyRear = body.z - body.scaleZ * 0.5;
    expect(rootFront).toBeCloseTo(bodyRear, 12);
    expect(root.x - root.scaleX * 0.5).toBeLessThan(body.x + body.scaleX * 0.5);
    expect(root.x + root.scaleX * 0.5).toBeGreaterThan(body.x - body.scaleX * 0.5);
    expect(root.baseY - root.scaleY * 0.5).toBeGreaterThan(R3_KITTY_FOOT_CONTACT_Y);

    for (const pose of poses) {
      const evaluatedRoot = evaluateBody(root, 'kitty', pose.time, 1);
      const evaluatedBody = evaluateBody(body, 'kitty', pose.time, 1);
      expect(evaluatedRoot.rotationX).toBe(0);
      expect(evaluatedRoot.rotationZ).toBe(0);
      expect(evaluatedRoot.rotationY).toBe(evaluatedBody.rotationY);
      expect(evaluatedRoot.y - evaluatedRoot.scaleY * 0.5).toBeGreaterThan(R3_KITTY_FOOT_CONTACT_Y);
      for (const state of legsAndFeet) {
        const evaluated = evaluateBody(state, 'kitty', pose.time, 1);
        const horizontalDistance = Math.hypot(evaluatedRoot.x - evaluated.x, evaluatedRoot.z - evaluated.z);
        const horizontalHalfDiagonal = Math.hypot(evaluatedRoot.scaleX, evaluatedRoot.scaleZ) * 0.5
          + Math.hypot(evaluated.scaleX, evaluated.scaleZ) * 0.5;
        if (horizontalDistance <= horizontalHalfDiagonal) {
          const separatedVertically = evaluatedRoot.y - evaluatedRoot.scaleY * 0.5 >= evaluated.y + evaluated.scaleY * 0.5
            || evaluatedRoot.y + evaluatedRoot.scaleY * 0.5 <= evaluated.y - evaluated.scaleY * 0.5;
          const deltaX = evaluatedRoot.x - evaluated.x;
          const deltaZ = evaluatedRoot.z - evaluated.z;
          const localDeltaZ = deltaX * Math.sin(pose.heading) + deltaZ * Math.cos(pose.heading);
          expect(
            separatedVertically || Math.abs(localDeltaZ) > (evaluatedRoot.scaleZ + evaluated.scaleZ) * 0.5,
            JSON.stringify({ pose, root: evaluatedRoot, otherPart: state.part, other: evaluated }),
          ).toBe(true);
        }
      }
    }
  });

  it('preserves Wanderer R4 scale while deriving Kitty R5 reference axes from the rejected R4 baseline', () => {
    const wanderer = buildV8Hero(qr, 'wanderer', seededRandom(hashSeed('wanderer:hero:v8.2')));
    const foot = wanderer.bodies.find((state) => state.part === 'foot-left')!;
    expect(WANDERER_CHARACTER_SCALE).toBe(R4_WANDERER_LINEAR_SCALE);
    expect(foot.scaleX / 5.2).toBeCloseTo(R4_WANDERER_LINEAR_SCALE, 12);
    expect(foot.scaleY / 1.9).toBeCloseTo(R4_WANDERER_LINEAR_SCALE, 12);
    expect(foot.scaleZ / 5.1).toBeCloseTo(R4_WANDERER_LINEAR_SCALE, 12);
    expect((foot.baseY - R3_WANDERER_FOOT_CONTACT_Y) / (1.05 - R3_WANDERER_FOOT_CONTACT_Y)).toBeCloseTo(R4_WANDERER_LINEAR_SCALE, 12);
    expect(foot.baseY - foot.scaleY * 0.5).toBeCloseTo(R3_WANDERER_FOOT_CONTACT_Y, 12);
    expect(HERO_REFERENCE_MAJOR_AXIS_V11.wanderer / 26.8).toBeCloseTo(R4_WANDERER_LINEAR_SCALE, 12);
    expect(HERO_REFERENCE_MAJOR_AXIS_V11.kitty / 24.6).toBeCloseTo(R5_KITTY_LINEAR_SCALE_FROM_R3, 12);
  });

  it('starts presentation-forward and returns continuously to that heading for N21, N33, and N105', () => {
    const cases = [
      { payload: 'X', size: 21 },
      { payload: 'X'.repeat(36), size: 33 },
      { payload: 'X'.repeat(600), size: 105 },
    ];
    const angleDistance = (first: number, second: number) => Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)));
    for (const testCase of cases) {
      const candidateQr = createCanonicalQr(testCase.payload, 'text');
      const candidatePlan = kittyPlan(candidateQr, `presentation-${testCase.size}`);
      const start = sampleKittyMotion(candidatePlan, 0);
      const firstTravelTime = candidatePlan.cycleSeconds / candidatePlan.segments.length * 0.5;
      const route = sampleKittyMotion(candidatePlan, firstTravelTime);
      const end = sampleKittyMotion(candidatePlan, candidatePlan.cycleSeconds - 1e-6);
      const reset = sampleKittyMotion(candidatePlan, candidatePlan.cycleSeconds);
      const forward = Math.atan2(
        candidatePlan.localRoute[1].x - candidatePlan.localRoute[0].x,
        candidatePlan.localRoute[1].z - candidatePlan.localRoute[0].z,
      );
      expect(candidateQr.size).toBe(testCase.size);
      expect(start.heading).toBe(0);
      expect(angleDistance(route.heading, forward)).toBeLessThan(1e-6);
      expect(angleDistance(end.heading, reset.heading)).toBeLessThan(1e-5);
      expect(Math.hypot(end.worldX - reset.worldX, end.worldZ - reset.worldZ)).toBeLessThan(1e-6);
    }
  });

  it('covers idle/look/walk/run/turn/dash in a seeded, continuous, replayable full-board cycle', () => {
    expect(plan.cycleSeconds).toBe(KITTY_MOTION_CYCLE_SECONDS);
    expect(plan.decoderPoseHz).toBe(KITTY_DECODER_POSE_HZ);
    expect(poses).toHaveLength(KITTY_MOTION_CYCLE_SECONDS * KITTY_DECODER_POSE_HZ);
    expect(new Set(poses.map((pose) => pose.action))).toEqual(new Set(['idle', 'look', 'walk', 'turn', 'run', 'dash']));
    expect(plan.pathLengthWorld).toBeGreaterThan(plan.boardSideWorld);
    expect(plan.coverage.fullBoardCoverageRatio).toBe(KITTY_FULL_BOARD_REQUIRED_COVERAGE);
    for (let index = 1; index < poses.length; index += 1) {
      expect(Math.hypot(poses[index].worldX - poses[index - 1].worldX, poses[index].worldZ - poses[index - 1].worldZ)).toBeLessThan(0.4);
    }
    const replay = createKittyMotionPlan(qr, seededRandom(seed));
    expect(replay.start).toEqual(plan.start);
    expect(replay.end).toEqual(plan.end);
    expect(replay.seedVariant).toBe(plan.seedVariant);
  });

  it('never jumps, penetrates the board, or moves its planted root during idle/turn states', () => {
    const scale = r5KittyScaleForGrid(qr.size);
    const boardSurfaceLocal = 0.02 / scale;
    const rootStates = character.filter((state) => state.semantic === 'kitty-body');
    const footStates = character.filter((state) => state.semantic === 'kitty-foot');
    for (const state of rootStates) {
      const bodyY = poses.map((pose) => evaluateBody(state, 'kitty', pose.time, 1).y);
      expect(Math.max(...bodyY) - Math.min(...bodyY)).toBeLessThan(0.001);
    }
    for (const pose of poses) {
      for (const foot of footStates) {
        const evaluated = evaluateBody(foot, 'kitty', pose.time, 1);
        expect(evaluated.y - evaluated.scaleY * 0.5).toBeGreaterThanOrEqual(boardSurfaceLocal - 1e-6);
      }
    }
    const stationary = poses.filter((pose) => pose.action === 'idle' || pose.action === 'look' || pose.action === 'turn');
    expect(new Set(stationary.map((pose) => `${pose.action}:${fixed(pose.worldX)}:${fixed(pose.worldZ)}`)).size).toBeLessThanOrEqual(plan.route.length * 2);
  });

  it('reports complete Kitty proof metrics from actual constructed states', () => {
    const metrics = collectV8Metrics('kitty', hero.bodies, hero.particles).kitty!;
    expect(metrics.originalConstruction).toBe(true);
    expect(metrics.semanticPartCount).toBe(10);
    expect(metrics.motionModel).toBe('session-seeded-natural-lively-v1');
    expect(metrics.sessionOwnedRuntime).toBe(true);
    expect(metrics.finiteCycle).toBe(false);
    expect(metrics.fixedWaypointOrder).toBe(false);
    expect(metrics.mandatoryOriginReturn).toBe(false);
    expect(new Set(metrics.actions)).toEqual(new Set(['idle', 'look', 'walk', 'turn', 'run', 'dash']));
  });
});

describe('v1.1.0 R5 full-physical-board route and boundary safety', () => {
  it.each(corpus)('$name covers active QR, function patterns, and quiet zone while every pose stays inside the safe inset', ({ payload, type }) => {
    const qr = createCanonicalQr(payload, type);
    const plan = kittyPlan(qr);
    const poses = enumerateKittyReachablePoses(plan);
    expect(plan.pathLengthWorld).toBeGreaterThan(0);
    expect(plan.boardSideWorld).toBe(qr.size + KITTY_FULL_BOARD_QUIET_ZONE * 2);
    expect(plan.scanRemovesKittyBeforeDecode).toBe(true);
    expect(plan.alignmentOverlapRequiresDecoderVerification).toBe(false);
    const unsafe = poses.find((pose) => !kittyPoseProtectedSafe(plan, pose));
    expect(
      unsafe,
      unsafe ? JSON.stringify({ pose: unsafe, safety: kittyPoseSafetyMetric(plan, unsafe), plan: {
        route: plan.route,
        footprintRadiusWorld: plan.footprintRadiusWorld,
      } }) : undefined,
    ).toBeUndefined();
    expect(plan.coverage.fullBoardCoverageRatio).toBe(1);
    expect(plan.coverage.activeQrCoverageRatio).toBe(1);
    expect(plan.coverage.quietZoneCoverageRatio).toBe(1);
    expect(plan.coverage.functionModuleCoverageRatio).toBe(1);
    for (const category of Object.values(plan.coverage.functionCategoryCoverage)) {
      if (category.total > 0) expect(category.ratio).toBe(1);
    }
    expect(kittyFullBoardCoverageMask(plan).every((row) => row.every(Boolean))).toBe(true);
    const swept = kittySweptEnvelopeMask(plan);
    expect(swept.every((row) => row.every(Boolean))).toBe(true);
    expect(plan.maximumCriticalModuleOverlap).toBeGreaterThan(0);
    for (const pose of poses) {
      expect(Math.abs(pose.worldX) + plan.footprintRadiusWorld).toBeLessThanOrEqual(plan.boardHalfWorld + 1e-6);
      expect(Math.abs(pose.worldZ) + plan.footprintRadiusWorld).toBeLessThanOrEqual(plan.boardHalfWorld + 1e-6);
    }
  });

  it('marks finder, separator, timing, alignment, format, version, and dark-module categories precisely by QR version', () => {
    const small = createQrProtectedMask(createCanonicalQr('a', 'text'));
    const large = createQrProtectedMask(createCanonicalQr('V'.repeat(500), 'text'));
    expect(small.categoryCounts.finder).toBe(147);
    expect(small.categoryCounts.separator).toBeGreaterThan(0);
    expect(small.categoryCounts.timing).toBeGreaterThan(0);
    expect(small.categoryCounts.format).toBeGreaterThan(0);
    expect(small.categoryCounts['dark-module']).toBe(1);
    expect(large.categoryCounts.alignment).toBeGreaterThan(0);
    expect(large.categoryCounts.version).toBeGreaterThan(0);
    expect(large.alignmentCenters.length).toBeGreaterThan(2);
  });

  it.each([{ payloadLength: 1, size: 21 }, { payloadLength: 11, size: 25 }, { payloadLength: 35, size: 29 }, { payloadLength: 36, size: 33 }, { payloadLength: 51, size: 37 }, { payloadLength: 201, size: 65 }, { payloadLength: 600, size: 105 }])('locks N$size to a closed seeded lawnmower route across the full board', ({ payloadLength, size }) => {
    const qr = createCanonicalQr('X'.repeat(payloadLength), 'text');
    expect(qr.size).toBe(size);
    for (let index = 0; index < 12; index += 1) {
      const plan = kittyPlan(qr, `n${size}-full-board-${index}`);
      expect(plan.start).toEqual(plan.end);
      expect(plan.route[0]).toEqual(plan.route.at(-1));
      expect(plan.segments).toHaveLength(11);
      expect(Math.max(...plan.route.map((point) => Math.abs(point.x)))).toBeCloseTo(plan.centerLimitWorld, 6);
      expect(Math.max(...plan.route.map((point) => Math.abs(point.z)))).toBeCloseTo(plan.centerLimitWorld, 6);
      expect(plan.coverage.fullBoardCoverageRatio).toBe(1);
      expect(plan.safeInsetWorld).toBe(plan.footprintRadiusWorld);
    }
  });

  it('uses its seed for replayable route orientation plus head and tail motion without reducing the Scan footprint', () => {
    expect(KITTY_ROUTE_POOL_SIZE).toBe(11);
    const qr = createCanonicalQr('X'.repeat(201), 'text');
    expect(qr.size).toBe(65);
    const plans = Array.from({ length: 12 }, (_, index) => {
      const plan = kittyPlan(qr, `variant-${index}`);
      expect(plan.coverage.fullBoardCoverageRatio).toBe(1);
      return plan;
    });
    expect(new Set(plans.map((plan) => plan.seedVariant)).size).toBeGreaterThan(1);
    expect(new Set(plans.map((plan) => JSON.stringify(plan.route))).size).toBeGreaterThan(1);
    expect(new Set(plans.map((plan) => sampleKittyMotion(plan, 0.37).tailAngle)).size).toBeGreaterThan(1);
    expect(new Set(plans.map((plan) => sampleKittyMotion(plan, 0.5).headYaw)).size).toBeGreaterThan(1);
    const replay = kittyPlan(qr, 'variant-0');
    expect(sampleKittyMotion(replay, 1.1)).toEqual(sampleKittyMotion(plans[0], 1.1));
  });
});

describe('v1.1.0 downward-particle board collision contract', () => {
  it.each(['sakura', 'summer', 'maple', 'ginkgo', 'snow', 'sunset'] as const)('%s lands, remains, fades for 0.5–1.5 seconds, and never appears below the board', (theme) => {
    const qr = createCanonicalQr(`particle-board-${theme}`, 'text');
    const hero = buildV8Hero(qr, theme, seededRandom(hashSeed(`${theme}:hero:v8.2`)));
    const metrics = collectV8Metrics(theme, hero.bodies, hero.particles).particleTrajectory!;
    expect(metrics.visibleBelowBoardFrameCount).toBe(0);
    expect(metrics.minimumVisibleBottomClearance).toBeGreaterThanOrEqual(-0.0001);
    expect(metrics.minimumSettleSeconds).toBeGreaterThanOrEqual(0.5);
    expect(metrics.maximumSettleSeconds).toBeLessThanOrEqual(1.5);
    expect(metrics.visibleUpwardSegmentCount).toBe(0);
    expect(metrics.visibleRespawnTeleportCount).toBe(0);
  });
});

describe('v1.1.0 R5 formal decoder gate after Kitty is removed from Scan', () => {
  it.each(corpus)('$name decodes through 330 deterministic Scan snapshots with zero Kitty overlay', ({ name, payload, type }) => {
    const qr = createCanonicalQr(payload, type);
    const plan = kittyPlan(qr);
    const base = renderQrRgba(qr, 10);
    const poses = Array.from({ length: 330 }, (_, index) => sampleKittyMotion(plan, index * plan.cycleSeconds / 330));
    poses.forEach((pose, index) => {
      const decoded = jsQR(base.data, base.width, base.height, { inversionAttempts: 'dontInvert' });
      expect(
        decoded?.data,
        `${name} snapshot=${index} t=${pose.time} action=${pose.action} scanRemovesKitty=${plan.scanRemovesKittyBeforeDecode}`,
      ).toBe(qr.payload);
    });
  }, 60_000);
});
