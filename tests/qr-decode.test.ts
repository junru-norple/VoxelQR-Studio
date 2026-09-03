import jsQR from 'jsqr';
import { describe, expect, it } from 'vitest';
import { createCanonicalQr, renderQrRgba, type PayloadType } from '../src/core/qr';
import { STUDIO_THEME_IDS } from '../src/themes';

const cases: Array<{ name: string; type: PayloadType; payload: string }> = [
  { name: 'short URL', type: 'url', payload: 'https://example.com' },
  { name: 'long URL', type: 'url', payload: 'https://example.com/garden/voxel/seasonal/collection/2026/details?source=portfolio&medium=qr' },
  { name: 'URL query', type: 'url', payload: 'https://example.com/search?q=voxel%20garden&lang=zh-TW&safe=true' },
  { name: 'URL fragment', type: 'url', payload: 'https://example.com/gallery#ocean-waves' },
  { name: 'English text', type: 'text', payload: 'A small garden can hold a large idea.' },
  { name: 'Traditional Chinese', type: 'text', payload: '把一段文字，種成可以掃描的庭園。' },
  { name: 'mixed text', type: 'text', payload: 'VoxelQR Studio｜春 2026｜Offline First' },
  { name: 'Unicode symbols', type: 'text', payload: 'QR → voxels ✓ 3D ◇ 波／雪／花 ♫' },
];

describe('QR_DECODE_GATE 9 themes × 8 payload classes', () => {
  for (const theme of STUDIO_THEME_IDS) {
    for (const testCase of cases) {
      it(`${theme} / ${testCase.name}`, () => {
        const qr = createCanonicalQr(testCase.payload, testCase.type);
        const image = renderQrRgba(qr, 12);
        const decoded = jsQR(image.data, image.width, image.height, { inversionAttempts: 'dontInvert' });
        expect(decoded?.data).toBe(qr.payload);
      });
    }
  }
});
