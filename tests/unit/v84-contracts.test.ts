import { describe, expect, it } from 'vitest';
import { createCanonicalQr } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { t } from '../../src/i18n';
import {
  buildV8Hero,
  collectV8Metrics,
  HERO_AREA_AUTHORING_TARGET,
  HERO_AREA_REQUIRED_MAX,
  HERO_AREA_REQUIRED_MIN,
  HERO_REFERENCE_MAJOR_AXIS,
  isHeroAreaSemantic,
  MICRO_EDGE,
  WANDERER_AUTHORING_SCALE,
  WANDERER_CHARACTER_SCALE,
  WANDERER_SILHOUETTE_DEPTH_SCALE,
  type BodyState,
} from '../../src/scene/v8Hero';
import {
  COMPACT_SCAN_POSTFILTER_PX,
  TOP_DOWN_EXPORT_MARGIN_MODULES,
  TOP_DOWN_EXPORT_POSTFILTER_PX,
  TOP_DOWN_EXPORT_RENDER_SIDE,
  TOP_DOWN_EXPORT_SIDE,
  TOP_DOWN_EXPORT_SUPERSAMPLE,
  topDownExportProjectedModulePixels,
  topDownExportZoom,
} from '../../src/scene/VoxelGarden';
const TREE_IDS = ['sakura', 'summer', 'maple', 'ginkgo', 'snow'] as const;
type TreeId = (typeof TREE_IDS)[number];
type Projection = 'front' | 'side' | 'top';

const qr = createCanonicalQr('X'.repeat(36), 'text');
const trees = new Map<TreeId, ReturnType<typeof buildV8Hero>>();

function buildTree(theme: TreeId) {
  const existing = trees.get(theme);
  if (existing) return existing;
  const hero = buildV8Hero(qr, theme, seededRandom(hashSeed(theme + ':hero:v8.2')));
  trees.set(theme, hero);
  return hero;
}

function projectionMask(states: BodyState[], projection: Projection, cell = 0.8): Set<string> {
  const mask = new Set<string>();
  for (const state of states) {
    const center = projection === 'front'
      ? [state.x, state.baseY]
      : projection === 'side'
        ? [state.z, state.baseY]
        : [state.x, state.z];
    const extent = projection === 'front'
      ? [state.scaleX, state.scaleY]
      : projection === 'side'
        ? [state.scaleZ, state.scaleY]
        : [state.scaleX, state.scaleZ];
    const minFirst = Math.floor((center[0] - extent[0] * 0.5) / cell);
    const maxFirst = Math.floor((center[0] + extent[0] * 0.5) / cell);
    const minSecond = Math.floor((center[1] - extent[1] * 0.5) / cell);
    const maxSecond = Math.floor((center[1] + extent[1] * 0.5) / cell);
    for (let first = minFirst; first <= maxFirst; first += 1) {
      for (let second = minSecond; second <= maxSecond; second += 1) {
        mask.add(first + ',' + second);
      }
    }
  }
  return mask;
}

function jaccard(first: Set<string>, second: Set<string>): number {
  let intersection = 0;
  first.forEach((value) => {
    if (second.has(value)) intersection += 1;
  });
  return intersection / Math.max(1, first.size + second.size - intersection);
}

function span(states: BodyState[], axis: 'x' | 'y' | 'z'): number {
  const centers = states.map((state) => axis === 'x' ? state.x : axis === 'y' ? state.baseY : state.z);
  const extents = states.map((state) => axis === 'x' ? state.scaleX : axis === 'y' ? state.scaleY : state.scaleZ);
  return Math.max(...centers.map((value, index) => value + extents[index] * 0.5))
    - Math.min(...centers.map((value, index) => value - extents[index] * 0.5));
}

function geometrySignature(theme: TreeId): string {
  const states = buildTree(theme).bodies.filter((state) => state.semantic === 'trunk' || state.semantic === 'branch');
  const byLineage = new Map<string, BodyState[]>();
  states.forEach((state) => {
    const lineage = byLineage.get(state.lineageId) ?? [];
    lineage.push(state);
    byLineage.set(state.lineageId, lineage);
  });
  return [...byLineage.entries()].sort(([first], [second]) => first.localeCompare(second)).map(([lineageId, lineage]) => {
    const average = (selector: (state: BodyState) => number) => (
      lineage.reduce((sum, state) => sum + selector(state), 0) / lineage.length
    ).toFixed(2);
    return [lineageId, lineage[0].lineageDepth, lineage.length, average((state) => state.x), average((state) => state.baseY), average((state) => state.z)].join(':');
  }).join('|');
}

describe('v8.4 two-sided actual silhouette-area contract', () => {
  it('locks a strict 40–50% interval with an interior authoring target', () => {
    expect(HERO_AREA_REQUIRED_MIN).toBe(0.4);
    expect(HERO_AREA_REQUIRED_MAX).toBe(0.5);
    expect(HERO_AREA_AUTHORING_TARGET).toBeGreaterThan(HERO_AREA_REQUIRED_MIN);
    expect(HERO_AREA_AUTHORING_TARGET).toBeLessThan(HERO_AREA_REQUIRED_MAX);
  });

  it('keeps only the main Ocean wave in the numerator while preserving the complete nine-tile field', () => {
    const hero = buildV8Hero(qr, 'ocean', seededRandom(hashSeed('ocean:hero:v8.2')));
    const main = hero.bodies.filter((state) => isHeroAreaSemantic('ocean', state.semantic));
    const support = hero.bodies.filter((state) => state.semantic === 'water-support');
    const allWater = [...main, ...support];
    expect(allWater).toHaveLength(qr.size * qr.size * 9);
    expect(main.length / allWater.length).toBeGreaterThanOrEqual(0.38);
    expect(main.length / allWater.length).toBeLessThanOrEqual(0.46);
    expect(support.length).toBeGreaterThan(0);
  });
});

describe('v8.4 five genuinely distinct tree structures', () => {
  it.each(TREE_IDS)('%s contains visible trunk plus real primary and secondary branch lineages', (theme) => {
    const hero = buildTree(theme);
    const metrics = collectV8Metrics(theme, hero.bodies, hero.particles);
    expect(metrics.treeStructure).not.toBeNull();
    expect(metrics.treeStructure!.trunkLineageCount).toBeGreaterThanOrEqual(2);
    expect(metrics.treeStructure!.primaryBranchCount).toBeGreaterThanOrEqual(4);
    expect(metrics.treeStructure!.secondaryBranchCount).toBeGreaterThanOrEqual(7);
    expect(metrics.treeStructure!.canopyClusterCount).toBeGreaterThanOrEqual(8);
    expect(metrics.treeStructure!.trunkVoxelCount).toBeGreaterThan(100);
    expect(metrics.treeStructure!.primaryBranchVoxelCount).toBeGreaterThan(150);
    expect(metrics.treeStructure!.secondaryBranchVoxelCount).toBeGreaterThan(150);
    expect(metrics.treeStructure!.canopyVoxelCount).toBeGreaterThan(1_000);
    expect(metrics.treeStructure!.maximumLineageDepth).toBeGreaterThanOrEqual(3);

    const leafless = hero.bodies.filter((state) => state.semantic === 'trunk' || state.semantic === 'branch');
    expect(projectionMask(leafless, 'front').size).toBeGreaterThan(100);
    expect(projectionMask(leafless, 'side').size).toBeGreaterThan(100);
  });

  it('uses five explicit archetypes and five non-color geometry signatures', () => {
    const archetypes = TREE_IDS.map((theme) => collectV8Metrics(theme, buildTree(theme).bodies, buildTree(theme).particles).treeStructure!.archetype);
    expect(new Set(archetypes).size).toBe(5);
    expect(new Set(TREE_IDS.map(geometrySignature)).size).toBe(5);
  });

  it('has no pair that is near-identical in front, side, and top grayscale silhouettes', () => {
    for (let firstIndex = 0; firstIndex < TREE_IDS.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < TREE_IDS.length; secondIndex += 1) {
        const first = buildTree(TREE_IDS[firstIndex]).bodies.filter((state) => isHeroAreaSemantic(TREE_IDS[firstIndex], state.semantic));
        const second = buildTree(TREE_IDS[secondIndex]).bodies.filter((state) => isHeroAreaSemantic(TREE_IDS[secondIndex], state.semantic));
        const similarities = (['front', 'side', 'top'] as const).map((view) => (
          jaccard(projectionMask(first, view), projectionMask(second, view))
        ));
        const pairDiagnostic = `${TREE_IDS[firstIndex]}:${TREE_IDS[secondIndex]} front=${similarities[0].toFixed(6)} side=${similarities[1].toFixed(6)} top=${similarities[2].toFixed(6)}`;
        expect(Math.min(...similarities), pairDiagnostic).toBeLessThan(0.82);
        expect(similarities.filter((value) => value < 0.9).length, pairDiagnostic).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('locks the required broadleaf, fan, asymmetric, open-crown, and tiered-conifer proportions', () => {
    const summerCanopy = buildTree('summer').bodies.filter((state) => state.semantic === 'canopy');
    const ginkgoCanopy = buildTree('ginkgo').bodies.filter((state) => state.semantic === 'canopy');
    const mapleBranches = buildTree('maple').bodies.filter((state) => state.semantic === 'branch');
    const sakuraCanopy = buildTree('sakura').bodies.filter((state) => state.semantic === 'canopy');
    const snow = buildTree('snow').bodies;

    expect(span(ginkgoCanopy, 'x')).toBeLessThan(span(summerCanopy, 'x'));
    expect(span(ginkgoCanopy, 'y') / span(ginkgoCanopy, 'x')).toBeGreaterThan(span(summerCanopy, 'y') / span(summerCanopy, 'x'));
    expect(Math.abs(Math.min(...mapleBranches.map((state) => state.x)))).toBeGreaterThan(Math.max(...mapleBranches.map((state) => state.x)));
    const sakuraCentroidX = sakuraCanopy.reduce((sum, state) => sum + state.x, 0) / sakuraCanopy.length;
    expect(Math.abs(sakuraCentroidX)).toBeGreaterThan(0.25);
    expect(new Set(snow.filter((state) => state.semantic === 'branch' && state.lineageDepth === 1).map((state) => state.lineageId)).size).toBeGreaterThanOrEqual(12);
    expect(new Set(snow.filter((state) => state.semantic === 'canopy' && state.part.startsWith('snow-load-')).map((state) => state.lineageId)).size).toBeGreaterThanOrEqual(12);
  });
});

describe('v8.4 public live-scene label', () => {
  it('uses the exact requested bilingual copy', () => {
    expect(t('zh-TW', 'liveScene')).toBe('動態場景');
    expect(t('en', 'liveScene')).toBe('LIVE SCENE');
  });
});

describe('v8.4 Pixel Wanderer 90-percent character revision', () => {
  it('applies one exact XYZ scale only to the character while retaining theme accents', () => {
    const hero = buildV8Hero(qr, 'wanderer', seededRandom(hashSeed('wanderer:hero:v8.2')));
    const character = hero.bodies.filter((state) => isHeroAreaSemantic('wanderer', state.semantic));
    const garden = hero.bodies.filter((state) => state.semantic === 'wanderer-garden');
    const median = (values: number[]) => [...values].sort((first, second) => first - second)[Math.floor(values.length * 0.5)];

    expect(WANDERER_CHARACTER_SCALE).toBe(0.9);
    expect(WANDERER_SILHOUETTE_DEPTH_SCALE).toBe(1.21);
    expect(HERO_REFERENCE_MAJOR_AXIS.wanderer).toBeCloseTo(34.748 * WANDERER_CHARACTER_SCALE, 12);
    expect(character.length).toBeGreaterThan(0);
    expect(garden.length).toBeGreaterThan(0);
    expect(median(character.map((state) => state.cellEdge))).toBeCloseTo(
      MICRO_EDGE * WANDERER_AUTHORING_SCALE * WANDERER_CHARACTER_SCALE,
      12,
    );
    expect(median(garden.map((state) => state.cellEdge))).toBeCloseTo(MICRO_EDGE * WANDERER_AUTHORING_SCALE, 12);
  });
});

describe('v8.4 viewport-independent top-down export integrity', () => {
  it('uses one fixed native square framebuffer and scan framing for every viewport', () => {
    expect(TOP_DOWN_EXPORT_SIDE).toBe(1001);
    expect(TOP_DOWN_EXPORT_SUPERSAMPLE).toBe(2);
    expect(TOP_DOWN_EXPORT_RENDER_SIDE).toBe(2002);
    expect(TOP_DOWN_EXPORT_MARGIN_MODULES).toBe(20);
    expect(TOP_DOWN_EXPORT_POSTFILTER_PX).toBe(0.8);
    expect(COMPACT_SCAN_POSTFILTER_PX).toBe(0.8);
    expect(topDownExportZoom(21)).toBeCloseTo(36 / 41, 12);
    expect(topDownExportZoom(105)).toBeCloseTo(36 / 125, 12);
  });

  it('preserves at least eight native pixels per projected module at N=105', () => {
    [21, 25, 29, 33, 37, 65, 105].forEach((gridSize) => {
      expect(topDownExportProjectedModulePixels(gridSize)).toBeGreaterThanOrEqual(8);
      expect(TOP_DOWN_EXPORT_SIDE % (gridSize + TOP_DOWN_EXPORT_MARGIN_MODULES)).not.toBe(0);
    });
    expect(topDownExportProjectedModulePixels(105)).toBeCloseTo(8.008, 12);
  });
});
