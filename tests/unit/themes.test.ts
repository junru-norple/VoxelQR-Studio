import { describe, expect, it } from 'vitest';
import { THEMES, THEME_IDS } from '../../src/themes';

describe('theme contract', () => {
  it('defines exactly eight distinct themes', () => {
    expect(THEME_IDS).toHaveLength(8);
    expect(new Set(THEME_IDS)).toHaveProperty('size', 8);
  });

  it('uses eight structural signatures, geometry families, motions, and scan-safe palettes', () => {
    const palettes = THEME_IDS.map((id) => [THEMES[id].ground, ...THEMES[id].moduleColors, THEMES[id].highlight].join(':'));
    const families = THEME_IDS.map((id) => THEMES[id].family);
    const signatures = THEME_IDS.map((id) => THEMES[id].signature);
    const motions = THEME_IDS.map((id) => THEMES[id].motion);
    expect(new Set(palettes).size).toBe(8);
    expect(new Set(families).size).toBe(8);
    expect(new Set(signatures).size).toBe(8);
    expect(new Set(motions).size).toBe(8);
    expect(THEMES.sakura.family).toBe('blossom');
    expect(THEMES.sunset.signature).toContain('sun');
    expect(THEMES.ocean.motion).toBe('travelling-wave');
    expect(THEMES.wanderer.family).toBe('wanderer');
    expect(THEMES.wanderer.motion).toBe('wanderer-idle');
    expect(signatures.join('\n')).not.toMatch(/\bgarden\b/i);
  });
});
