import { describe, expect, it } from 'vitest';
import { createCanonicalQr } from '../../src/core/qr';
import { hashSeed, seededRandom } from '../../src/core/prng';
import { THEME_IDS, type ThemeId } from '../../src/themes';
import {
  buildV8Hero,
  HERO_AREA_AUTHORING_TARGET,
  HERO_AREA_REQUIRED_MAX,
  HERO_AREA_REQUIRED_MIN,
  HERO_AREA_SAMPLE_HZ,
  HERO_AREA_WINDOW_SECONDS,
  HERO_REFERENCE_MAJOR_AXIS,
  isHeroAreaSemantic,
  MICRO_EDGE,
  type HeroSemantic,
} from '../../src/scene/v8Hero';

const payloadCases = [
  { length: 1, expectedN: 21 },
  { length: 10, expectedN: 21 },
  { length: 11, expectedN: 25 },
  { length: 35, expectedN: 29 },
  { length: 36, expectedN: 33 },
  { length: 51, expectedN: 37 },
  { length: 201, expectedN: 65 },
  { length: 600, expectedN: 105 },
];

const allSemantics: HeroSemantic[] = [
  'trunk', 'branch', 'canopy', 'sun-core', 'sun-support', 'water', 'water-support',
  'wanderer-hood', 'wanderer-face', 'wanderer-eye', 'wanderer-body',
  'wanderer-arm', 'wanderer-foot', 'wanderer-ear', 'wanderer-scarf',
  'wanderer-pack', 'wanderer-seam', 'wanderer-garden',
];

const expectedAllowlist: Record<ThemeId, HeroSemantic[]> = {
  sakura: ['trunk', 'branch', 'canopy'],
  summer: ['trunk', 'branch', 'canopy'],
  maple: ['trunk', 'branch', 'canopy'],
  ginkgo: ['trunk', 'branch', 'canopy'],
  snow: ['trunk', 'branch', 'canopy'],
  sunset: ['sun-core'],
  ocean: ['water'],
  wanderer: [
    'wanderer-hood', 'wanderer-face', 'wanderer-eye', 'wanderer-body',
    'wanderer-arm', 'wanderer-foot', 'wanderer-ear', 'wanderer-scarf',
    'wanderer-pack', 'wanderer-seam',
  ],
};

describe('v8.3 retained semantic contract under the superseding v8.4 two-sided gate', () => {
  it('locks the superseding lower and upper thresholds, authoring target, fixed timestep, and complete motion windows', () => {
    expect(HERO_AREA_REQUIRED_MIN).toBe(0.4);
    expect(HERO_AREA_REQUIRED_MAX).toBe(0.5);
    expect(HERO_AREA_AUTHORING_TARGET).toBeGreaterThan(HERO_AREA_REQUIRED_MIN);
    expect(HERO_AREA_AUTHORING_TARGET).toBeLessThan(HERO_AREA_REQUIRED_MAX);
    expect(HERO_AREA_SAMPLE_HZ).toBeGreaterThanOrEqual(60);
    for (const theme of THEME_IDS) {
      const minimum = theme === 'wanderer' ? 20 : theme === 'sunset' || theme === 'ocean' ? 12 : 15;
      expect(HERO_AREA_WINDOW_SECONDS[theme]).toBeGreaterThanOrEqual(minimum);
    }
  });

  it.each(THEME_IDS)('%s uses only the exact Decision 1A semantic allowlist', (theme) => {
    const actual = allSemantics.filter((semantic) => isHeroAreaSemantic(theme, semantic));
    expect(actual).toEqual(expectedAllowlist[theme]);
  });

  it('reproduces all eight required payload boundaries with seven distinct QR sizes', () => {
    const sizes = payloadCases.map(({ length, expectedN }) => {
      const qr = createCanonicalQr('X'.repeat(length), 'text');
      expect(qr.size).toBe(expectedN);
      return qr.size;
    });
    expect(new Set(sizes)).toEqual(new Set([21, 25, 29, 33, 37, 65, 105]));
  });

  it.each(THEME_IDS)('%s retains real semantic geometry without coarsening the micro-voxel edge', (theme) => {
    const qr = createCanonicalQr('X'.repeat(36), 'text');
    const hero = buildV8Hero(qr, theme, seededRandom(hashSeed(`${theme}:hero:v8.2`)));
    const semantic = hero.bodies.filter((state) => isHeroAreaSemantic(theme, state.semantic));
    expect(semantic.length).toBeGreaterThan(0);
    expect(Math.max(...semantic.map((state) => state.cellEdge))).toBeLessThanOrEqual(MICRO_EDGE);
    expect(HERO_REFERENCE_MAJOR_AXIS[theme]).toBeGreaterThan(0);
    expect(hero.particles.every((particle) => particle.cellEdge > 0)).toBe(true);
  });
});
