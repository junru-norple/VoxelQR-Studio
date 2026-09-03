import { describe, expect, it } from 'vitest';
import { createCanonicalQr, type CanonicalQr } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { THEME_IDS, type ThemeId } from '../../src/themes';
import {
  buildV8Hero,
  collectV8Metrics,
  heroScaleForGrid,
  MICRO_EDGE,
  V8_1_MICRO_EDGE,
  type BodyState,
} from '../../src/scene/v8Hero';

const V81_BASELINE = {
  sakura: { count: 4591, majorAxis: 13.563916 },
  summer: { count: 6136, majorAxis: 16.063916 },
  maple: { count: 5349, majorAxis: 15.563916 },
  ginkgo: { count: 3888, majorAxis: 14.563916 },
  snow: { count: 4453, majorAxis: 13.544519 },
  sunset: { count: 2109, majorAxis: 8.46 },
  ocean: { count: 4356, majorAxis: 32.96 },
  wanderer: { count: 1502, majorAxis: 9.96 },
} satisfies Record<ThemeId, { count: number; majorAxis: number }>;

const MICRO_THEME_IDS = THEME_IDS.slice(0, 7) as ThemeId[];

function qrOfSize(size: number): CanonicalQr {
  return { payload: `synthetic-${size}`, size, matrix: Array.from({ length: size }, () => Array<boolean>(size).fill(false)) };
}

function build(theme: ThemeId, qr = createCanonicalQr('X'.repeat(36), 'text')) {
  return buildV8Hero(qr, theme, seededRandom(hashSeed(`${theme}:hero:v8.2`)));
}

function semanticBodies(theme: ThemeId, bodies: BodyState[]): BodyState[] {
  if (theme === 'sunset') return bodies.filter((state) => state.semantic === 'sun-core');
  if (theme === 'ocean') return bodies.filter((state) => state.semantic === 'water' || state.semantic === 'water-support');
  if (theme === 'wanderer') return bodies.filter((state) => state.semantic.startsWith('wanderer-') && state.semantic !== 'wanderer-garden');
  return bodies.filter((state) => state.semantic === 'trunk' || state.semantic === 'branch' || state.semantic === 'canopy');
}

function majorAxis(states: BodyState[]): number {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const state of states) {
    const half = [state.scaleX, state.scaleY, state.scaleZ].map((value) => value * 0.5);
    const center = [state.x, state.baseY, state.z];
    for (let axis = 0; axis < 3; axis += 1) {
      min[axis] = Math.min(min[axis], center[axis] - half[axis]);
      max[axis] = Math.max(max[axis], center[axis] + half[axis]);
    }
  }
  return Math.max(...max.map((value, axis) => value - min[axis]));
}

describe('v8.2 direct detail uplift contract', () => {
  it.each(MICRO_THEME_IDS)('%s exceeds its actual v8.1 linear-detail baseline while retaining all visible support geometry under the v8.4 area gate', (theme) => {
    const hero = build(theme);
    const semantic = semanticBodies(theme, hero.bodies);
    const metrics = collectV8Metrics(theme, hero.bodies, hero.particles).detail;
    const boundsRatio = majorAxis(semantic) / V81_BASELINE[theme].majorAxis;
    expect(metrics.v81BaselineMedianCellEdge).toBe(V8_1_MICRO_EDGE);
    expect(metrics.medianVisibleCellEdge).toBeLessThanOrEqual(MICRO_EDGE);
    expect(metrics.linearUpliftOverV81).toBeGreaterThanOrEqual(1.25);
    expect(metrics.visibleCellEdgeRatioOverV81).toBeLessThanOrEqual(0.8);
    expect(metrics.effectiveLinearScale).toBeGreaterThanOrEqual(2.25);
    expect(semantic.length).toBeGreaterThan(V81_BASELINE[theme].count);
    expect(boundsRatio).toBeGreaterThanOrEqual(0.98);
  });

  it('freezes the seven v8.2 micro medians while allowing the R3 Wanderer to use deliberate low-resolution parts', () => {
    const medians = MICRO_THEME_IDS.map((theme) => {
      const hero = build(theme);
      return collectV8Metrics(theme, hero.bodies, hero.particles).detail.medianVisibleCellEdge;
    });
    const existingMedian = [...medians].sort((a, b) => a - b)[3];
    const wanderer = build('wanderer');
    const wandererMedian = collectV8Metrics('wanderer', wanderer.bodies, wanderer.particles).detail.medianVisibleCellEdge;
    expect(medians.every((median) => median <= MICRO_EDGE)).toBe(true);
    expect(wandererMedian).toBeGreaterThan(existingMedian * 4);
  });

  it('keeps Pixel Wanderer volumetric proportions inside the v8.2 acceptance envelope', () => {
    const hero = build('wanderer');
    const metric = collectV8Metrics('wanderer', hero.bodies, hero.particles).wanderer;
    expect(metric).not.toBeNull();
    expect(metric!.heightWidthRatio).toBeGreaterThanOrEqual(1.2);
    expect(metric!.heightWidthRatio).toBeLessThanOrEqual(1.35);
    expect(metric!.depthWidthRatio).toBeGreaterThanOrEqual(0.7);
  });

  it('uses nine visible micro tiles per logical Ocean module through near-capacity N=105', () => {
    for (const size of [21, 33, 65, 105]) {
      const bodies = build('ocean', qrOfSize(size)).bodies;
      const water = bodies.filter((state) => state.semantic === 'water' || state.semantic === 'water-support');
      const mainWave = bodies.filter((state) => state.semantic === 'water');
      expect(water).toHaveLength(size * size * 9);
      expect(mainWave.length / water.length).toBeGreaterThanOrEqual(0.38);
      expect(mainWave.length / water.length).toBeLessThanOrEqual(0.46);
      const minX = Math.min(...water.map((state) => state.x - state.scaleX * 0.5));
      const maxX = Math.max(...water.map((state) => state.x + state.scaleX * 0.5));
      const worldWidth = (maxX - minX) * heroScaleForGrid(size);
      expect(worldWidth / size).toBeGreaterThan(0.98);
      expect(worldWidth / size).toBeLessThan(1.02);
    }
  });
});
