import { describe, expect, it } from 'vitest';
import { messageKeys, t, type MessageKey } from '../../src/i18n';

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
