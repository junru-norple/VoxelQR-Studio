import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const read = (file: string) => readFile(file, 'utf8');
const publicDocumentation = [
  'README.md',
  'README_FIRST.txt',
  'RELEASE_NOTES_v1.1.1.md',
  'CHANGELOG.md',
  'docs/ARCHITECTURE.md',
  'docs/DESIGN.md',
  'docs/QR_PIPELINE.md',
  'docs/RELEASE_VALIDATION.md',
  'docs/SECURITY.md',
  'docs/TESTING.md',
] as const;
const localizedAssets = [
  'docs/assets/v1.1.1/pixel-wanderer-scene.en.png',
  'docs/assets/v1.1.1/pixel-wanderer-scene.zh-TW.png',
  'docs/assets/v1.1.1/voxel-kitty-scene.en.png',
  'docs/assets/v1.1.1/voxel-kitty-scene.zh-TW.png',
  'docs/assets/v1.1.1/scan-view.en.png',
  'docs/assets/v1.1.1/scan-view.zh-TW.png',
] as const;

describe('current public bilingual copy contract', () => {
  it('uses scene language and a bilingual default README in UI, accessibility, themes, and metadata', async () => {
    const [i18n, main, themes, readme, readmeFirst, license, licenseZh, index, packageJson, builder, notices] = await Promise.all([
      read('src/i18n.ts'), read('src/main.ts'), read('src/themes.ts'), read('README.md'),
      read('README_FIRST.txt'), read('LICENSE'), read('LICENSE.zh-TW.md'),
      read('index.html'), read('package.json'), read('electron-builder.yml'), read('THIRD_PARTY_NOTICES.md'),
    ]);
    expect(`${i18n}\n${themes}\n${readme}\n${index}`).not.toMatch(/\bgarden\b/i);
    expect(main).toContain('aria-label="Interactive 3D QR scene"');
    expect(main).toContain('aria-label="Interactive 3D voxel QR scene"');
    expect(main).not.toMatch(/aria-label="[^"]*\bgarden\b/i);
    expect(main).toContain('data-theme-description');
    expect(main).not.toContain('${palette.signature}');
    expect(`${packageJson}\n${builder}\n${notices}`).not.toMatch(/VoxelQR(?:[ _-])Garden|\bformerly\b/i);
    expect(`${license}\n${licenseZh}\n${readme}\n${readmeFirst}`).toContain('VoxelQR Studio contributors');
    expect(`${license}\n${licenseZh}\n${readme}\n${readmeFirst}`).not.toMatch(/VoxelQR(?:[ _-])Garden contributors/i);
    expect(`${readme}\n${readmeFirst}\n${notices}`).toContain('Enzo Manuel Mangano');
    expect(`${readme}\n${readmeFirst}\n${notices}`).toContain('https://github.com/enzomanuelmangano/demos');
    expect(readme).toContain('[English](#english) | [繁體中文](#traditional-chinese)');
    expect(readme).toContain('<a id="english"></a>');
    expect(readme).toContain('<a id="traditional-chinese"></a>');
    for (const asset of localizedAssets) expect(readme).toContain(asset);
    expect(readme).not.toMatch(/docs[\\/]assets[\\/]v1\.(?:0\.0|1\.0)/i);
  });

  it('keeps formal public copy free of internal workflow language and obsolete names', async () => {
    const [documents, readme, readmeFirst, releaseNotes, i18n] = await Promise.all([
      Promise.all(publicDocumentation.map(read)).then((parts) => parts.join('\n')),
      read('README.md'),
      read('README_FIRST.txt'),
      read('RELEASE_NOTES_v1.1.1.md'),
      read('src/i18n.ts'),
    ]);
    expect(documents).not.toMatch(/28%\s*[–-]\s*35%/u);
    expect(documents).not.toMatch(/8%\s*[–-]\s*12%/u);
    expect(documents).not.toContain('0.08016706');
    expect(documents).not.toMatch(/\bR(?:[3-9]|[1-9][0-9])\b/u);
    expect(documents).not.toMatch(/\bcandidate\b|\brejected\b|accepted\s+(?:R5\s+appearance|baseline|v1\.1\.0\s+product\s+baseline)/i);
    expect(documents).not.toMatch(/候選|退件|人工驗收|已接受的\s*v1\.1\.0\s*產品基線/u);
    expect(documents).not.toMatch(/docs[\\/]assets[\\/]v1\.(?:0\.0|1\.0)/i);
    expect(documents).not.toMatch(/Summer tree|Snow tree|Ocean waves/u);
    expect(documents).not.toMatch(/夏樹|雪樹/u);

    const englishNames = 'Sakura, Summer Grove, Maple, Ginkgo, Snow Pine, Sunset, Ocean Waves, Pixel Wanderer, and Voxel Kitty';
    const traditionalChineseNames = '櫻花、盛夏綠蔭、楓葉、銀杏、雪松、日落、海浪、像素旅兔及 Voxel Kitty';
    for (const document of [readme, readmeFirst, releaseNotes]) {
      expect(document).toContain(englishNames);
      expect(document).toContain(traditionalChineseNames);
    }
    expect(i18n).toContain("summer: 'Summer Grove'");
    expect(i18n).toContain("snow: 'Snow Pine'");
    expect(i18n).toContain("ocean: 'Ocean Waves'");
    expect(i18n).toContain("summer: '盛夏綠蔭'");
    expect(i18n).toContain("snow: '雪松'");
    expect(i18n).toContain("sunset: '日落'");
    expect(i18n).toContain("kitty: 'Voxel Kitty'");

    expect(readme).toContain('six locale-matched screenshots captured from VoxelQR Studio v1.1.1');
    expect(readme).toContain('Pixel Wanderer is a compact chibi character that scales proportionally with the QR board. In the standard Explore reference view, Voxel Kitty occupies about 8% of the board and scales proportionally as the QR matrix grows.');
    expect(readme).toContain('Product mechanics are unchanged from v1.1.0. Character models, motion, QR generation, Scan behavior, camera controls, export, and offline operation remain the same.');
    expect(readme).toContain('以 VoxelQR Studio v1.1.1 實際擷取的六張語系相符展示圖');
    expect(readme).toContain('像素旅兔採用小巧的可愛比例，並會隨 QR 底板同比例縮放。在標準探索參考視角下，體素小貓約佔底板的 8%，也會隨 QR 矩陣增大而同比例放大。');
    expect(readme).toContain('產品機制與 v1.1.0 相同；角色模型、動態、QR 產生、掃描行為、相機控制、匯出及離線操作均維持不變。');
  });

  it('keeps internal technical identifiers while removing public scene wording', async () => {
    const main = await read('src/main.ts');
    expect(main).toContain('#garden-canvas');
    expect(main).toContain('new VoxelGarden');
    expect(main).not.toContain('Choose a garden');
    expect(main).not.toContain('Interactive 3D QR garden');
  });
});