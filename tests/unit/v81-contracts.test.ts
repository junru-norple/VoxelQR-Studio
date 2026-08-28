import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createCanonicalQr, type CanonicalQr } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { THEME_IDS, type ThemeId } from '../../src/themes';
import {
  buildV8Hero,
  collectV8Metrics,
  evaluateBody,
  HERO_REFERENCE_GRID_SIZE,
  HERO_REFERENCE_MAJOR_AXIS,
  HERO_SCALE_TRANSITION_MS,
  heroScaleForGrid,
  measureParticleTrajectory,
  type BodyState,
} from '../../src/scene/v8Hero';

const TREE_IDS: ThemeId[] = ['sakura', 'summer', 'maple', 'ginkgo', 'snow'];
const DOWNWARD_IDS: ThemeId[] = [...TREE_IDS, 'sunset'];
const EXPECTED_PARTICLES = ['petal', 'warm-mote', 'maple-leaf', 'ginkgo-fan', 'snowflake', 'sun-mote'];

function qrOfSize(size: number): CanonicalQr {
  return { payload: `synthetic-${size}`, size, matrix: Array.from({ length: size }, () => Array<boolean>(size).fill(false)) };
}

function build(theme: ThemeId, qr: CanonicalQr = createCanonicalQr('https://example.com/voxelqr-studio', 'text')) {
  return buildV8Hero(qr, theme, seededRandom(hashSeed(`${theme}:hero:v8.1`)));
}

function displacement(state: BodyState, time: number): THREE.Vector3 {
  const value = evaluateBody(state, 'summer', time, 1);
  return new THREE.Vector3(value.x - state.x, value.y - state.baseY, value.z - state.z);
}

function percentile(values: number[], amount: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * amount) - 1)] ?? 0;
}

describe('v8.1 responsive Hero contract', () => {
  it('uses one strictly monotonic N/33 scalar for all eight themes and all axes', () => {
    const gridSizes = [21, 25, 29, 33, 37, 53, 105];
    const scales = gridSizes.map(heroScaleForGrid);
    expect(HERO_REFERENCE_GRID_SIZE).toBe(33);
    expect(HERO_SCALE_TRANSITION_MS).toBeLessThanOrEqual(350);
    scales.slice(1).forEach((scale, index) => expect(scale).toBeGreaterThan(scales[index]));
    for (const theme of THEME_IDS) {
      const referenceRatio = HERO_REFERENCE_MAJOR_AXIS[theme] / HERO_REFERENCE_GRID_SIZE;
      for (const size of gridSizes) {
        const scale = heroScaleForGrid(size);
        const axes = [scale, scale, scale];
        const ratio = HERO_REFERENCE_MAJOR_AXIS[theme] * scale / size;
        expect(Math.max(...axes) - Math.min(...axes)).toBeLessThanOrEqual(0.01);
        expect(Math.abs(ratio / referenceRatio - 1)).toBeLessThanOrEqual(0.08);
      }
    }
  });

  it('normalizes the Ocean authored field so group scaling restores each QR active extent', () => {
    for (const size of [21, 33, 53, 105]) {
      const hero = build('ocean', qrOfSize(size));
      const water = hero.bodies.filter((state) => state.semantic === 'water');
      const minX = Math.min(...water.map((state) => state.x - state.scaleX * 0.5));
      const maxX = Math.max(...water.map((state) => state.x + state.scaleX * 0.5));
      const worldWidth = (maxX - minX) * heroScaleForGrid(size);
      expect(worldWidth / size).toBeGreaterThan(0.98);
      expect(worldWidth / size).toBeLessThan(1.02);
    }
  });
});

describe('v8.1 five-tree topology contract', () => {
  it.each(TREE_IDS)('%s exposes rooted lineage and at least five bounded response groups', (theme) => {
    const hero = build(theme);
    const metrics = collectV8Metrics(theme, hero.bodies, hero.particles).treeMotion;
    expect(metrics).not.toBeNull();
    expect(metrics?.rootedTopologyDepth).toBeGreaterThanOrEqual(2);
    expect(metrics?.responseGroupCount).toBeGreaterThanOrEqual(5);
    expect(metrics?.independentVerticalColumnTranslationChannelCount).toBe(0);
    expect(metrics?.deformationField).toBe('lineage-height-radial-seeded-wind');
  });

  it.each(TREE_IDS)('%s keeps its base anchored and neighboring cluster deformation continuous', (theme) => {
    const hero = build(theme);
    const anchored = hero.bodies.filter((state) => state.motionLayer === 'anchored');
    for (const state of anchored.slice(0, 24)) {
      for (const time of [0, 3.1, 7.7, 12.4, 15]) {
        expect(displacement(state, time).length()).toBeLessThanOrEqual(state.cellEdge * 0.05);
      }
    }

    const byLineage = new Map<string, BodyState[]>();
    hero.bodies.filter((state) => state.motionLayer === 'canopy').forEach((state) => {
      const values = byLineage.get(state.lineageId) ?? [];
      values.push(state);
      byLineage.set(state.lineageId, values);
    });
    const gradients: number[] = [];
    for (const states of byLineage.values()) {
      const ordered = [...states].sort((a, b) => a.baseY - b.baseY || a.x - b.x || a.z - b.z);
      for (let index = 1; index < ordered.length; index += 1) {
        const first = ordered[index - 1];
        const second = ordered[index];
        const restDistance = Math.hypot(first.x - second.x, first.baseY - second.baseY, first.z - second.z);
        if (restDistance > 0.76) continue;
        for (let time = 0; time <= 15; time += 0.5) {
          gradients.push(displacement(first, time).sub(displacement(second, time)).length() / first.cellEdge);
        }
      }
    }
    expect(gradients.length).toBeGreaterThan(100);
    expect(percentile(gradients, 0.95)).toBeLessThanOrEqual(0.25);
  });
});

describe('v8.1 six-family downward particle contract', () => {
  it('keeps every visible world-Y interval downward and respawns only after hidden frames', () => {
    const observedKinds: string[] = [];
    for (const theme of DOWNWARD_IDS) {
      const hero = build(theme);
      observedKinds.push(hero.particles[0].kind);
      for (const particle of hero.particles) {
        const metric = measureParticleTrajectory(particle, 12, 30);
        expect(metric.canonicalUpAxis).toBe('world-y');
        expect(metric.visibleUpwardSegmentCount).toBe(0);
        expect(metric.maxVisibleUpwardStepCellEdges).toBeLessThanOrEqual(0.01);
        expect(metric.netVerticalDisplacementCellEdges).toBeLessThan(0);
        expect(metric.invisibleGapFrameCount).toBeGreaterThan(0);
        expect(metric.respawnAfterInvisibleGapCount).toBeGreaterThan(0);
        expect(metric.visibleRespawnTeleportCount).toBe(0);
      }
    }
    expect(observedKinds).toEqual(EXPECTED_PARTICLES);
  });
});
