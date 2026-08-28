import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const read = (file: string) => readFile(file, 'utf8');

describe('current public English copy contract', () => {
  it('uses scene language in UI, accessibility, themes, README, and metadata', async () => {
    const [i18n, main, themes, readme, readmeZh, readmeFirst, license, index, packageJson, builder, notices] = await Promise.all([
      read('src/i18n.ts'), read('src/main.ts'), read('src/themes.ts'), read('README.md'),
      read('README.zh-TW.md'), read('README_FIRST.txt'), read('LICENSE'),
      read('index.html'), read('package.json'), read('electron-builder.yml'), read('THIRD_PARTY_NOTICES.md'),
    ]);
    expect(`${i18n}\n${themes}\n${readme}\n${index}`).not.toMatch(/\bgarden\b/i);
    expect(main).toContain('aria-label="Interactive 3D QR scene"');
    expect(main).toContain('aria-label="Interactive 3D voxel QR scene"');
    expect(main).not.toMatch(/aria-label="[^"]*\bgarden\b/i);
    expect(`${packageJson}\n${builder}\n${notices}`).not.toMatch(/VoxelQR(?:[ _-])Garden|\bformerly\b/i);
    expect(`${license}\n${readme}\n${readmeZh}\n${readmeFirst}`).toContain('VoxelQR Studio contributors');
    expect(`${license}\n${readme}\n${readmeZh}\n${readmeFirst}`).not.toMatch(/VoxelQR(?:[ _-])Garden contributors/i);
    expect(`${readme}\n${readmeZh}\n${readmeFirst}\n${notices}`).toContain('Enzo Manuel Mangano');
    expect(`${readme}\n${readmeZh}\n${readmeFirst}\n${notices}`).toContain('https://github.com/enzomanuelmangano/demos');
  });

  it('keeps internal technical identifiers while removing public scene wording', async () => {
    const main = await read('src/main.ts');
    expect(main).toContain('#garden-canvas');
    expect(main).toContain('new VoxelGarden');
    expect(main).not.toContain('Choose a garden');
    expect(main).not.toContain('Interactive 3D QR garden');
  });
});
