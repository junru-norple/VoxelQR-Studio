import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import {
  assert,
  assertExactKeys,
  canonicalJson,
  deepEqual,
  fileFingerprint,
  readJson,
  resolveRelative,
} from './common.mjs';

export const PUBLIC_DOCUMENTATION_SURFACES = Object.freeze([
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
]);

export const PRIMARY_NAMING_SURFACES = Object.freeze([
  'README.md',
  'README_FIRST.txt',
  'RELEASE_NOTES_v1.1.1.md',
]);

export const EXPECTED_ENGLISH_THEME_NAMES = Object.freeze([
  'Sakura',
  'Summer Grove',
  'Maple',
  'Ginkgo',
  'Snow Pine',
  'Sunset',
  'Ocean Waves',
  'Pixel Wanderer',
  'Voxel Kitty',
]);

const SHOWCASE_REQUIRED_PATHS = Object.freeze([
  'docs/assets/v1.1.1/pixel-wanderer-scene.en.png',
  'docs/assets/v1.1.1/pixel-wanderer-scene.zh-TW.png',
  'docs/assets/v1.1.1/voxel-kitty-scene.en.png',
  'docs/assets/v1.1.1/voxel-kitty-scene.zh-TW.png',
  'docs/assets/v1.1.1/scan-view.en.png',
  'docs/assets/v1.1.1/scan-view.zh-TW.png',
]);

const PUBLIC_COPY_RULES = Object.freeze([
  ['internal-review-id', /\bR(?:[3-9]|[1-9][0-9])\b/giu],
  ['candidate-wording', /\bcandidate\b|候選/giu],
  ['rejection-history', /\brejected\b|\brejection\b|退件/giu],
  ['internal-acceptance', /\b(?:internal|human)\s+acceptance\b|\bacceptance\s+(?:candidate|review|state)\b|內部驗收|人工驗收/giu],
  ['accepted-baseline-narrative', /accepted\s+(?:R\d+\s+appearance|baseline|v1\.1\.0\s+product\s+baseline)|已接受的\s*v1\.1\.0\s*產品基線/giu],
  ['obsolete-rabbit-measurement', /28\s*(?:%|％)?\s*(?:[-–—~～]|至)\s*35\s*(?:%|％)/giu],
  ['obsolete-kitty-measurement', /8\s*(?:%|％)?\s*(?:[-–—~～]|至)\s*12\s*(?:%|％)/giu],
  ['obsolete-technical-measurement', /0\.08016706/gu],
  ['noncanonical-theme-name', /Summer tree|Snow tree|Ocean waves|夏樹|雪樹/gu],
  ['outdated-showcase-path', /docs[\\/]assets[\\/]v1\.(?:0\.0|1\.0)[\\/]/giu],
]);

const APPROVED_ZH_LATIN_TOKENS_BY_KEY = Object.freeze({
  productName: ['3D', 'QR', 'Code'],
  controls: ['3D', 'QR', 'Code'],
  payloadHintUrl: ['example.com'],
  wandererDescription: ['3D'],
  kitty: ['Voxel', 'Kitty'],
});

function unwrap(node) {
  let current = node;
  while (ts.isAsExpression(current) || ts.isParenthesizedExpression(current) || ts.isSatisfiesExpression?.(current)) {
    current = current.expression;
  }
  return current;
}

function evaluateLiteral(node, environment, label) {
  const current = unwrap(node);
  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) return current.text;
  if (current.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (current.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isNumericLiteral(current)) return Number(current.text);
  if (ts.isIdentifier(current)) {
    assert(environment.has(current.text), `${label}:UNKNOWN_IDENTIFIER:${current.text}`);
    return environment.get(current.text);
  }
  if (ts.isArrayLiteralExpression(current)) {
    const values = [];
    for (const element of current.elements) {
      if (ts.isSpreadElement(element)) {
        const spread = evaluateLiteral(element.expression, environment, label);
        assert(Array.isArray(spread), `${label}:SPREAD_NOT_ARRAY`);
        values.push(...spread);
      } else {
        values.push(evaluateLiteral(element, environment, label));
      }
    }
    return values;
  }
  if (ts.isObjectLiteralExpression(current)) {
    const value = {};
    for (const property of current.properties) {
      assert(ts.isPropertyAssignment(property), `${label}:UNSUPPORTED_OBJECT_MEMBER`);
      const name = property.name.getText().replace(/^['"]|['"]$/gu, '');
      value[name] = evaluateLiteral(property.initializer, environment, label);
    }
    return value;
  }
  throw new Error(`${label}:UNSUPPORTED_LITERAL:${ts.SyntaxKind[current.kind]}`);
}

function parseConstants(sourceText, fileName) {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const environment = new Map();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
      try {
        environment.set(declaration.name.text, evaluateLiteral(declaration.initializer, environment, fileName));
      } catch {
        // Only literal product-contract declarations are relevant here.
      }
    }
  }
  return { source, environment };
}

export async function loadProductLocaleContract(root) {
  const [themeSource, localeSource, mainSource] = await Promise.all([
    readFile(path.join(root, 'src/themes.ts'), 'utf8'),
    readFile(path.join(root, 'src/i18n.ts'), 'utf8'),
    readFile(path.join(root, 'src/main.ts'), 'utf8'),
  ]);
  const themeConstants = parseConstants(themeSource, 'src/themes.ts').environment;
  const localeConstants = parseConstants(localeSource, 'src/i18n.ts').environment;
  const themeIds = themeConstants.get('STUDIO_THEME_IDS');
  const messages = localeConstants.get('messages');
  assert(Array.isArray(themeIds), 'LOCALE_CONTRACT:STUDIO_THEME_IDS_NOT_LITERAL');
  assert(messages && typeof messages === 'object', 'LOCALE_CONTRACT:MESSAGES_NOT_LITERAL');
  assert(messages.en && messages['zh-TW'], 'LOCALE_CONTRACT:SUPPORTED_LOCALES_MISSING');

  const referencedKeys = new Set();
  const mainAst = ts.createSourceFile('src/main.ts', mainSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'label') {
      const argument = node.arguments[0];
      if (argument && ts.isStringLiteral(argument)) referencedKeys.add(argument.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(mainAst);
  for (const match of mainSource.matchAll(/data-i18n="([A-Za-z0-9]+)"/gu)) referencedKeys.add(match[1]);
  for (const themeId of themeIds) {
    referencedKeys.add(themeId);
    referencedKeys.add(`${themeId}Description`);
  }
  for (const key of Object.keys(messages.en)) {
    if (new RegExp(`['"]${key}['"]`, 'u').test(mainSource)) referencedKeys.add(key);
  }
  return { themeIds, messages, referencedKeys: [...referencedKeys].sort(), sources: { themeSource, localeSource, mainSource } };
}

function latinTokens(value) {
  return value.match(/[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*/gu)?.filter((token) => /[A-Za-z]/u.test(token)) ?? [];
}

export async function validateLocaleContract(root) {
  const contract = await loadProductLocaleContract(root);
  const { themeIds, messages, referencedKeys, sources } = contract;
  assert(themeIds.length === 9, `LOCALE_CONTRACT:THEME_COUNT:${themeIds.length}`);
  const englishKeys = Object.keys(messages.en).sort();
  const traditionalChineseKeys = Object.keys(messages['zh-TW']).sort();
  assert(deepEqual(englishKeys, traditionalChineseKeys), 'LOCALE_CONTRACT:KEY_PARITY');
  const missingReachable = referencedKeys.filter((key) => !Object.hasOwn(messages.en, key) || !Object.hasOwn(messages['zh-TW'], key));
  assert(missingReachable.length === 0, `LOCALE_CONTRACT:REACHABLE_KEYS_MISSING:${missingReachable.join(',')}`);
  const unreachableDictionaryKeys = englishKeys.filter((key) => !referencedKeys.includes(key));

  const englishThemeNames = themeIds.map((id) => messages.en[id]);
  const traditionalChineseThemeNames = themeIds.map((id) => messages['zh-TW'][id]);
  assert(deepEqual(englishThemeNames, EXPECTED_ENGLISH_THEME_NAMES), `LOCALE_CONTRACT:CANONICAL_ENGLISH_NAMES:${englishThemeNames.join('|')}`);
  assert(new Set(traditionalChineseThemeNames).size === 9, 'LOCALE_CONTRACT:DUPLICATE_ZH_THEME_NAME');

  for (const key of referencedKeys) {
    const english = messages.en[key];
    const traditionalChinese = messages['zh-TW'][key];
    assert(typeof english === 'string' && english.trim().length > 0, `LOCALE_CONTRACT:EMPTY_EN:${key}`);
    assert(typeof traditionalChinese === 'string' && traditionalChinese.trim().length > 0, `LOCALE_CONTRACT:EMPTY_ZH:${key}`);
    assert(!/[\u3400-\u9fff]/u.test(english), `LOCALE_CONTRACT:ZH_IN_EN:${key}`);
    const approved = new Set(APPROVED_ZH_LATIN_TOKENS_BY_KEY[key] ?? []);
    const unexpected = latinTokens(traditionalChinese).filter((token) => !approved.has(token));
    assert(unexpected.length === 0, `LOCALE_CONTRACT:UNEXPECTED_EN_FALLBACK_IN_ZH:${key}:${unexpected.join(',')}`);
    if (!approved.size) assert(traditionalChinese !== english, `LOCALE_CONTRACT:IDENTICAL_LOCALE_VALUE:${key}`);
  }
  assert(!/messages\s*\.\s*en|messages\s*\[\s*['"]en['"]\s*\]\s*\?\?/u.test(sources.localeSource), 'LOCALE_CONTRACT:ENGLISH_FALLBACK_LOGIC');
  return {
    status: 'PASS',
    themeCount: themeIds.length,
    reachableKeyCount: referencedKeys.length,
    dictionaryOnlyKeys: unreachableDictionaryKeys,
    englishThemeNames,
    traditionalChineseThemeNames,
    approvedTraditionalChineseLatinTokens: APPROVED_ZH_LATIN_TOKENS_BY_KEY,
  };
}

export function inspectPublicCopyText(text, surface = 'fixture') {
  const failures = [];
  for (const [rule, pattern] of PUBLIC_COPY_RULES) {
    pattern.lastIndex = 0;
    const matches = [...text.matchAll(pattern)].map((match) => match[0]);
    if (matches.length) failures.push({ surface, rule, matches });
  }
  return failures;
}

export async function validatePublicCopyContract(root, localeContract = undefined) {
  const locale = localeContract ?? await loadProductLocaleContract(root);
  const documents = {};
  for (const relativePath of PUBLIC_DOCUMENTATION_SURFACES) {
    documents[relativePath] = await readFile(resolveRelative(root, relativePath, 'PUBLIC_SURFACE'), 'utf8');
  }
  const failures = Object.entries(documents).flatMap(([surface, text]) => inspectPublicCopyText(text, surface));
  assert(failures.length === 0, `PUBLIC_COPY_CONTRACT:${canonicalJson(failures)}`);

  const englishThemeNames = locale.themeIds.map((id) => locale.messages.en[id]);
  const traditionalChineseThemeNames = locale.themeIds.map((id) => locale.messages['zh-TW'][id]);
  for (const relativePath of PRIMARY_NAMING_SURFACES) {
    const text = documents[relativePath];
    const missingEnglish = englishThemeNames.filter((name) => !text.includes(name));
    const missingTraditionalChinese = traditionalChineseThemeNames.filter((name) => !text.includes(name));
    assert(missingEnglish.length === 0, `PUBLIC_COPY_CONTRACT:MISSING_EN_NAMES:${relativePath}:${missingEnglish.join(',')}`);
    assert(missingTraditionalChinese.length === 0, `PUBLIC_COPY_CONTRACT:MISSING_ZH_NAMES:${relativePath}:${missingTraditionalChinese.join(',')}`);
  }

  const readme = documents['README.md'];
  const traditionalAnchor = readme.indexOf('<a id="traditional-chinese"></a>');
  assert(traditionalAnchor > 0, 'PUBLIC_COPY_CONTRACT:README_LANGUAGE_ANCHOR');
  const englishBlock = readme.slice(0, traditionalAnchor);
  const traditionalChineseBlock = readme.slice(traditionalAnchor);
  assert(!/\.zh-TW\.png/gu.test(englishBlock), 'PUBLIC_COPY_CONTRACT:ZH_IMAGE_IN_EN_BLOCK');
  assert(!/\.en\.png/gu.test(traditionalChineseBlock), 'PUBLIC_COPY_CONTRACT:EN_IMAGE_IN_ZH_BLOCK');
  for (const relativePath of SHOWCASE_REQUIRED_PATHS) assert(readme.includes(relativePath), `PUBLIC_COPY_CONTRACT:README_IMAGE_MISSING:${relativePath}`);
  return { status: 'PASS', surfaceCount: PUBLIC_DOCUMENTATION_SURFACES.length, primaryNamingSurfaceCount: PRIMARY_NAMING_SURFACES.length };
}

function comparableCapture(capture) {
  const value = globalThis.structuredClone(capture);
  delete value.locale;
  delete value.relativePath;
  delete value.bytes;
  delete value.sha256;
  return value;
}

export async function validateShowcaseManifest(root, relativeManifestPath = 'docs/assets/v1.1.1/showcase-manifest.json') {
  const manifestPath = resolveRelative(root, relativeManifestPath, 'SHOWCASE_MANIFEST');
  const manifest = await readJson(manifestPath, 'SHOWCASE_MANIFEST');
  assertExactKeys(manifest, ['schemaVersion', 'productVersion', 'captures'], [], 'SHOWCASE_MANIFEST');
  assert(manifest.schemaVersion === '1.0.0', 'SHOWCASE_MANIFEST:SCHEMA_VERSION');
  assert(manifest.productVersion === 'v1.1.1', 'SHOWCASE_MANIFEST:PRODUCT_VERSION');
  assert(Array.isArray(manifest.captures) && manifest.captures.length === 6, `SHOWCASE_MANIFEST:CAPTURE_COUNT:${manifest.captures?.length}`);

  const paths = new Set();
  const pairs = new Map();
  for (const [index, capture] of manifest.captures.entries()) {
    const label = `SHOWCASE_CAPTURE_${index}`;
    assertExactKeys(capture, [
      'pairId', 'version', 'theme', 'locale', 'relativePath', 'bytes', 'sha256', 'payload',
      'viewport', 'applicationState', 'camera', 'composition', 'captureSource',
    ], ['scan'], label);
    assert(capture.version === manifest.productVersion, `${label}:VERSION`);
    assert(['en', 'zh-TW'].includes(capture.locale), `${label}:LOCALE`);
    assert(typeof capture.theme === 'string' && capture.theme.length > 0, `${label}:THEME`);
    assert(!paths.has(capture.relativePath), `${label}:DUPLICATE_PATH`);
    paths.add(capture.relativePath);
    const absolute = resolveRelative(root, capture.relativePath, label);
    const fingerprint = await fileFingerprint(absolute);
    assert(fingerprint.bytes === capture.bytes, `${label}:BYTES`);
    assert(fingerprint.sha256 === capture.sha256, `${label}:SHA256`);
    const image = PNG.sync.read(await readFile(absolute));
    assert(image.width === capture.viewport.width && image.height === capture.viewport.height, `${label}:VIEWPORT_DIMENSIONS`);
    const expectedSuffix = capture.locale === 'en' ? '.en.png' : '.zh-TW.png';
    assert(capture.relativePath.endsWith(expectedSuffix), `${label}:LOCALE_PATH`);
    if (!pairs.has(capture.pairId)) pairs.set(capture.pairId, []);
    pairs.get(capture.pairId).push(capture);

    if (capture.pairId === 'scan-view') {
      assertExactKeys(capture.scan, ['topDown', 'decodedPayload'], [], `${label}:SCAN`);
      assert(capture.scan.topDown === true, `${label}:SCAN_NOT_TOP_DOWN`);
      assert(capture.scan.decodedPayload === capture.payload, `${label}:RECORDED_DECODE_MISMATCH`);
      const decoded = jsQR(new Uint8ClampedArray(image.data), image.width, image.height, { inversionAttempts: 'dontInvert' });
      assert(decoded?.data === capture.payload, `${label}:ACTUAL_DECODE_MISMATCH:${decoded?.data ?? 'null'}`);
    } else {
      assert(!Object.hasOwn(capture, 'scan'), `${label}:UNEXPECTED_SCAN_METADATA`);
    }
  }
  assert(deepEqual([...paths].sort(), [...SHOWCASE_REQUIRED_PATHS].sort()), 'SHOWCASE_MANIFEST:PATH_SET');
  assert(pairs.size === 3, `SHOWCASE_MANIFEST:PAIR_COUNT:${pairs.size}`);
  for (const [pairId, captures] of pairs) {
    assert(captures.length === 2, `SHOWCASE_MANIFEST:PAIR_SIZE:${pairId}`);
    assert(deepEqual(captures.map((capture) => capture.locale).sort(), ['en', 'zh-TW']), `SHOWCASE_MANIFEST:PAIR_LOCALES:${pairId}`);
    assert(deepEqual(comparableCapture(captures[0]), comparableCapture(captures[1])), `SHOWCASE_MANIFEST:PAIR_METADATA_DRIFT:${pairId}`);
  }
  return { status: 'PASS', captureCount: manifest.captures.length, pairCount: pairs.size, scanDecodeCount: 2 };
}

export async function validatePublicAndLocaleContracts(root) {
  const productContract = await loadProductLocaleContract(root);
  return {
    publicCopy: await validatePublicCopyContract(root, productContract),
    locale: await validateLocaleContract(root),
    showcase: await validateShowcaseManifest(root),
  };
}
