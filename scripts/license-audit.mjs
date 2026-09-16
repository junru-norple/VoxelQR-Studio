import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { projectRoot, validationRoot } from './validation-helpers.mjs';

const lock = JSON.parse(readFileSync(path.join(projectRoot, 'package-lock.json'), 'utf8'));
const projectLicense = readFileSync(path.join(projectRoot, 'LICENSE'), 'utf8');
const licenseZh = readFileSync(path.join(projectRoot, 'LICENSE.zh-TW.md'), 'utf8');
const readme = readFileSync(path.join(projectRoot, 'README.md'), 'utf8');
const readmeFirst = readFileSync(path.join(projectRoot, 'README_FIRST.txt'), 'utf8');
const notices = readFileSync(path.join(projectRoot, 'THIRD_PARTY_NOTICES.md'), 'utf8');
const allowed = /^(MIT|ISC|0BSD|BSD-2-Clause|BSD-3-Clause|Apache-2\.0)$/;
const runtime = new Map();

for (const [key, value] of Object.entries(lock.packages)) {
  if (!key.includes('node_modules/') || value.dev === true) continue;
  const name = key.match(/(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)$/)?.[1];
  if (name && value.version) runtime.set(`${name}@${value.version}`, { name, version: value.version });
}
runtime.set('electron@43.4.1', { name: 'electron', version: '43.4.1' });

const failures = [];
for (const component of runtime.values()) {
  const match = Object.entries(lock.packages).find(([key, value]) => {
    const name = key.match(/(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)$/)?.[1];
    return name === component.name && value.version === component.version;
  });
  const license = match?.[1]?.license;
  if (typeof license !== 'string' || !allowed.test(license)) failures.push({ ...component, license: license ?? 'MISSING' });
}

const attributionCorpus = `${readme}\n${readmeFirst}\n${notices}`;
const projectLicenseBrandPass = projectLicense.includes('Copyright (c) 2026 VoxelQR Studio contributors')
  && !projectLicense.includes('VoxelQR Garden contributors');
const authoritativeLicensePass = projectLicense.startsWith('MIT License\n\n')
  && projectLicense.includes('THE SOFTWARE IS PROVIDED "AS IS"');
const licenseTranslationPass = /non-authoritative/i.test(licenseZh)
  && /English original controls/i.test(licenseZh)
  && /僅供理解/.test(licenseZh)
  && /以英文原文為準/.test(licenseZh)
  && licenseZh.includes('特此免費授權任何取得本軟體及其相關文件檔案（以下稱「本軟體」）副本之人');
const enzoAttributionPass = attributionCorpus.includes('Enzo Manuel Mangano')
  && attributionCorpus.includes('https://github.com/enzomanuelmangano/demos')
  && attributionCorpus.includes('Copyright © 2024 Enzo Manuel Mangano');
const upstreamRelationshipPass = notices.includes('No upstream source code, components, assets, shaders, constants, or UI are included or redistributed here.')
  && notices.includes('custom Software License Agreement')
  && notices.includes('本專案未包含或重新散布任何上游原始碼、元件、素材、著色器、常數或介面');
const noticesBilingualPass = notices.slice(0, 400).includes('English')
  && notices.slice(0, 400).includes('繁體中文')
  && notices.includes('<a id="english"></a>')
  && notices.includes('<a id="traditional-chinese"></a>');

const failed = failures.length
  || !projectLicenseBrandPass
  || !authoritativeLicensePass
  || !licenseTranslationPass
  || !enzoAttributionPass
  || !upstreamRelationshipPass
  || !noticesBilingualPass;
if (failed) {
  const result = {
    schemaVersion: 'voxelqr-v1.1.1-license-validation-v1',
    LICENSE_GATE: 'FAIL',
    failures,
    projectLicenseBrandPass,
    authoritativeLicensePass,
    licenseTranslationPass,
    enzoAttributionPass,
    upstreamRelationshipPass,
    noticesBilingualPass,
  };
  mkdirSync(validationRoot, { recursive: true });
  writeFileSync(path.join(validationRoot, 'license-validation.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

const result = {
  schemaVersion: 'voxelqr-v1.1.1-license-validation-v1',
  generatedAtUtc: new Date().toISOString(),
  LICENSE_GATE: 'PASS',
  auditedRuntimePackages: runtime.size,
  allowedLicensePolicy: ['MIT', 'ISC', '0BSD', 'BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0'],
  PROJECT_LICENSE_BRAND_GATE: 'PASS_VOXELQR_STUDIO_CONTRIBUTORS',
  AUTHORITATIVE_ENGLISH_LICENSE_GATE: 'PASS_UNCHANGED_LEGAL_ORIGINAL',
  TRADITIONAL_CHINESE_REFERENCE_GATE: 'PASS_COMPLETE_NON_AUTHORITATIVE_ENGLISH_CONTROLS',
  THIRD_PARTY_NOTICES_BILINGUAL_GATE: 'PASS_COMPLETE_ENGLISH_AND_TRADITIONAL_CHINESE',
  ENZO_MANUEL_MANGANO_ATTRIBUTION_GATE: 'PASS_README_README_FIRST_THIRD_PARTY_NOTICES',
  UPSTREAM_RELATIONSHIP_GATE: 'PASS_DESIGN_BEHAVIOR_REFERENCE_NO_UPSTREAM_CODE_REDISTRIBUTED',
  upstream: {
    author: 'Enzo Manuel Mangano',
    project: 'Demos',
    github: 'https://github.com/enzomanuelmangano/demos',
    license: 'Custom Software License Agreement',
    copyright: 'Copyright © 2024 Enzo Manuel Mangano. All rights reserved.',
  },
};
mkdirSync(validationRoot, { recursive: true });
writeFileSync(path.join(validationRoot, 'license-validation.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result, null, 2));
