import { describe, expect, it } from 'vitest';
import { messageKeys, t, type MessageKey } from '../../src/i18n';

const themeNameKeys = [
  'sakura', 'summer', 'maple', 'ginkgo', 'snow', 'sunset', 'ocean', 'wanderer', 'kitty',
] as const satisfies readonly MessageKey[];

const themeDescriptionKeys = [
  'sakuraDescription', 'summerDescription', 'mapleDescription',
  'ginkgoDescription', 'snowDescription', 'sunsetDescription',
  'oceanDescription', 'wandererDescription', 'kittyDescription',
] as const satisfies readonly MessageKey[];

describe('i18n contract', () => {
  it('keeps English and Traditional Chinese keys in parity', () => {
    expect(messageKeys('zh-TW')).toEqual(messageKeys('en'));
  });

  it('contains localized live-input and same-scene scan labels', () => {
    expect(t('zh-TW', 'scan')).toBe('俯視掃描');
    expect(t('en', 'scan')).toBe('Top-down scan');
    expect(t('zh-TW', 'synchronized')).not.toBe(t('en', 'synchronized'));
    expect(t('en', 'inputHelp')).toContain('no Generate step');
    expect(t('zh-TW', 'wanderer')).toBe('像素旅兔');
    expect(t('en', 'wanderer')).toBe('Pixel Wanderer');
    expect(t('zh-TW', 'ocean')).not.toBe(t('en', 'ocean'));
    expect(t('en', 'themes')).toBe('Choose a scene');
    expect(t('en', 'empty')).toBe('Enter content and the scene will appear immediately.');
    expect(t('en', 'scanTip')).toBe('The same colored scene is moving smoothly overhead');
  });

  it('localizes both workflow steps and all nine theme descriptions', () => {
    expect(t('zh-TW', 'contentStep')).toBe('01 · 內容');
    expect(t('zh-TW', 'styleStep')).toBe('02 · 風格');
    expect(t('en', 'contentStep')).toBe('01 · CONTENT');
    expect(t('en', 'styleStep')).toBe('02 · STYLE');
    expect(themeNameKeys.map((key) => t('en', key))).toEqual([
      'Sakura', 'Summer Grove', 'Maple', 'Ginkgo', 'Snow Pine', 'Sunset', 'Ocean Waves', 'Pixel Wanderer', 'Voxel Kitty',
    ]);
    expect(themeNameKeys.map((key) => t('zh-TW', key))).toEqual([
      '櫻花', '盛夏綠蔭', '楓葉', '銀杏', '雪松', '日落', '海浪', '像素旅兔', 'Voxel Kitty',
    ]);
    for (const key of themeDescriptionKeys) {
      expect(t('zh-TW', key)).toMatch(/[\u3400-\u9fff]/u);
      expect(t('en', key)).not.toMatch(/[\u3400-\u9fff]/u);
      expect(t('zh-TW', key)).not.toBe(t('en', key));
    }
  });

  it('uses scene language throughout current public English copy', () => {
    const publicEnglishCopy = messageKeys('en').map((key) => t('en', key as MessageKey)).join('\n');
    expect(publicEnglishCopy).not.toMatch(/\bgarden\b/i);
    expect(publicEnglishCopy).toContain('voxel scene');
  });

  it('uses the exact VoxelQR Studio public headings', () => {
    expect(t('zh-TW', 'controls')).toBe('3D 動態體素 QR Code 生成器');
    expect(t('en', 'controls')).toBe('3D QR Code Converter');
  });
});