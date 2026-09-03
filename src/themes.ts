export const THEME_IDS = ['sakura', 'summer', 'maple', 'ginkgo', 'snow', 'sunset', 'ocean', 'wanderer'] as const;
export type ThemeId = (typeof THEME_IDS)[number];
export const STUDIO_THEME_IDS = [...THEME_IDS, 'kitty'] as const;
export type StudioThemeId = (typeof STUDIO_THEME_IDS)[number];

export type ThemeFamily = 'blossom' | 'canopy' | 'maple' | 'ginkgo' | 'snow' | 'sunset' | 'ocean' | 'wanderer' | 'kitty';
export type ThemeMotion = 'petal-drift' | 'canopy-breathe' | 'ember-turn' | 'fan-fall' | 'snow-drift' | 'sun-breathe' | 'travelling-wave' | 'wanderer-idle' | 'kitty-explore';

export interface ThemeDefinition {
  id: StudioThemeId;
  family: ThemeFamily;
  motion: ThemeMotion;
  glyph: string;
  signature: string;
  scanDark: string;
  mid: string;
  bright: string;
  highlight: string;
  trunk: string;
  ground: string;
  groundAlt: string;
  groundEdge: string;
  sky: [string, string];
  light: [string, string];
  moduleColors: [string, string, string];
}

export const THEMES: Record<StudioThemeId, ThemeDefinition> = {
  sakura: {
    id: 'sakura', family: 'blossom', motion: 'petal-drift', glyph: '花', signature: 'one rounded-pixel cherry tree',
    scanDark: '#a52b6d', mid: '#df4f96', bright: '#ff91c2', highlight: '#ffd1e5', trunk: '#704129',
    ground: '#fbf4df', groundAlt: '#b8d995', groundEdge: '#6da66d', sky: ['#dcefe8', '#f9e3ed'], light: ['#fff9e8', '#ffc5de'],
    moduleColors: ['#7a1f52', '#d95092', '#ff91c2'],
  },
  summer: {
    id: 'summer', family: 'canopy', motion: 'canopy-breathe', glyph: '葉', signature: 'one broad summer canopy',
    scanDark: '#176b45', mid: '#3ca668', bright: '#8ddb6c', highlight: '#dcf5a6', trunk: '#76502d',
    ground: '#f6f1d3', groundAlt: '#a7d17d', groundEdge: '#5a9b5b', sky: ['#d9eee5', '#edf4c9'], light: ['#fffbd9', '#a9e2b2'],
    moduleColors: ['#145b3b', '#3ca668', '#8ddb6c'],
  },
  maple: {
    id: 'maple', family: 'maple', motion: 'ember-turn', glyph: '楓', signature: 'one asymmetric maple crown',
    scanDark: '#9b3026', mid: '#dc4b30', bright: '#f57932', highlight: '#ffcb64', trunk: '#70402a',
    ground: '#f9efd8', groundAlt: '#d8aa6c', groundEdge: '#aa653c', sky: ['#f1dfd0', '#f7ba79'], light: ['#fff0c3', '#ff8d58'],
    moduleColors: ['#7b241f', '#d9492e', '#f57932'],
  },
  ginkgo: {
    id: 'ginkgo', family: 'ginkgo', motion: 'fan-fall', glyph: '杏', signature: 'one golden fan canopy',
    scanDark: '#77580b', mid: '#c28a08', bright: '#f3c52e', highlight: '#ffe98a', trunk: '#77542e',
    ground: '#faf3d2', groundAlt: '#ddca6e', groundEdge: '#aa8b28', sky: ['#e7efe1', '#f8e9a3'], light: ['#fff7c4', '#f6c541'],
    moduleColors: ['#6b4b05', '#c28a08', '#f3c52e'],
  },
  snow: {
    id: 'snow', family: 'snow', motion: 'snow-drift', glyph: '雪', signature: 'one tiered snow-bough tree',
    scanDark: '#2d6780', mid: '#5d94ac', bright: '#bde5ee', highlight: '#ffffff', trunk: '#59686b',
    ground: '#f4f8f7', groundAlt: '#d4e8e9', groundEdge: '#82abb7', sky: ['#dcecf0', '#f6fbfb'], light: ['#ffffff', '#b8e5ed'],
    moduleColors: ['#27556c', '#5d94ac', '#bde5ee'],
  },
  sunset: {
    id: 'sunset', family: 'sunset', motion: 'sun-breathe', glyph: '日', signature: 'pixel sun over a warm horizon',
    scanDark: '#922c55', mid: '#dc4b4a', bright: '#ff8738', highlight: '#ffd45c', trunk: '#71345c',
    ground: '#fff0d6', groundAlt: '#e9a26e', groundEdge: '#c85c54', sky: ['#eadce7', '#ffc074'], light: ['#fff1a8', '#ff7560'],
    moduleColors: ['#752347', '#dc4b4a', '#ff8738'],
  },
  ocean: {
    id: 'ocean', family: 'ocean', motion: 'travelling-wave', glyph: '波', signature: 'a directional rounded-pixel wave band',
    scanDark: '#0e6395', mid: '#177eb2', bright: '#24c7d7', highlight: '#d2faf4', trunk: '#145c82',
    ground: '#e9f6f1', groundAlt: '#9edbd5', groundEdge: '#4ba5b2', sky: ['#d5eff0', '#bfe8e5'], light: ['#effffc', '#70d8dd'],
    moduleColors: ['#0d4c77', '#177eb2', '#24c7d7'],
  },
  wanderer: {
    id: 'wanderer', family: 'wanderer', motion: 'wanderer-idle', glyph: '兔', signature: 'one original 3D traveller in a twilight scene',
    scanDark: '#493277', mid: '#7651a8', bright: '#a883d4', highlight: '#bdf5d7', trunk: '#2f2850',
    ground: '#f7f0de', groundAlt: '#b9e5cf', groundEdge: '#6f8f85', sky: ['#ded8ea', '#b8e6d5'], light: ['#fff4d6', '#c4a6ed'],
    moduleColors: ['#3e2869', '#7651a8', '#bdf5d7'],
  },
  kitty: {
    id: 'kitty', family: 'kitty', motion: 'kitty-explore', glyph: '貓', signature: 'one original orange-gold voxel cat exploring a decoder-safe route',
    scanDark: '#7a4515', mid: '#d77b1f', bright: '#f2aa3a', highlight: '#fff0c8', trunk: '#5a341b',
    ground: '#fff6df', groundAlt: '#d8e8c0', groundEdge: '#7aa47c', sky: ['#e0eee8', '#f7ddb8'], light: ['#fff7df', '#ffc46b'],
    moduleColors: ['#6c3b12', '#c66d1b', '#efa437'],
  },
};

export function isThemeId(value: string): value is ThemeId {
  return THEME_IDS.includes(value as ThemeId);
}

export function isStudioThemeId(value: string): value is StudioThemeId {
  return STUDIO_THEME_IDS.includes(value as StudioThemeId);
}
