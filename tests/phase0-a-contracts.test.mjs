import { spawnSync } from 'node:child_process';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import {
  appendFile,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  parseAndValidateStatusDocument,
  validateAcceptanceManifest,
  validateAcceptanceManifestSet,
  validateStatusRecord,
} from '../scripts/phase0-a/acceptance-status.mjs';
import { auditIndexSafe } from '../scripts/phase0-a/index-safe-audit.mjs';
import {
  inspectPublicCopyText,
  PUBLIC_DOCUMENTATION_SURFACES,
  validateLocaleContract,
  validatePublicAndLocaleContracts,
} from '../scripts/phase0-a/public-contracts.mjs';
import { verifyPublicRelease } from '../scripts/phase0-a/public-release-verifier.mjs';
import {
  canonicalizeTreeRelativePath,
  classifyTreeEntry,
  compareUtf8Bytewise,
  fingerprintRecords,
  sha256,
  TREE_FINGERPRINT_ALGORITHM_ID,
  treeFingerprint,
} from '../scripts/phase0-a/common.mjs';

const projectRoot = process.cwd();
const fixtureRoot = path.join(projectRoot, 'tests', 'fixtures', 'phase0-a');
const scratchParent = path.join(projectRoot, '.phase0-a-test-temp');

const readJson = async (relativePath) => JSON.parse(await readFile(path.join(fixtureRoot, relativePath), 'utf8'));
const clone = (value) => globalThis.structuredClone(value);

beforeAll(async () => {
  await mkdir(scratchParent, { recursive: true });
});

afterAll(async () => {
  await rm(scratchParent, { recursive: true, force: true });
});

const FIXED_TREE_SHA256 = '83d533f8475dffac642833010ae8009234c86deaacf8fb004921f5d195ed61fa';
const fixedTreeFiles = [
  ['A.txt', 'A\n'],
  ['b.txt', 'b\n'],
  ['electron/main.cjs', 'main\n'],
  ['electron-builder.yml', 'builder\n'],
  ['資料/甲.txt', '甲\n'],
];

async function createTreeFixture(prefix, entries) {
  const root = await mkdtemp(path.join(scratchParent, prefix));
  for (const [relativePath, contents] of entries) {
    const absolute = path.join(root, ...relativePath.split('/'));
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, contents, 'utf8');
  }
  return root;
}

describe('Phase 0-A canonical tree fingerprint v1 contract', () => {
  it('matches the hard-coded miniature tree vector and global UTF-8 byte order', async () => {
    const root = await createTreeFixture('fingerprint-vector-', [...fixedTreeFiles].reverse());
    const result = await treeFingerprint(root);
    expect(result.algorithmId).toBe('posix-relative-path-utf8-byte-order-v1');
    expect(result.algorithmId).toBe(TREE_FINGERPRINT_ALGORITHM_ID);
    expect(result.treeSha256).toBe(FIXED_TREE_SHA256);
    expect(result.files.map((record) => record.relativePath)).toEqual([
      'A.txt',
      'b.txt',
      'electron-builder.yml',
      'electron/main.cjs',
      '資料/甲.txt',
    ]);
  });

  it('is invariant to creation order and directory enumeration order', async () => {
    const firstRoot = await createTreeFixture('fingerprint-order-a-', fixedTreeFiles);
    const secondRoot = await createTreeFixture('fingerprint-order-b-', [...fixedTreeFiles].reverse());
    const first = await treeFingerprint(firstRoot);
    const second = await treeFingerprint(secondRoot);
    expect(first).toEqual(second);

    const shuffled = [first.files[4], first.files[1], first.files[3], first.files[0], first.files[2]];
    expect(fingerprintRecords(shuffled)).toEqual(first);
  });

  it('sorts directory/file prefixes, case, and non-ASCII paths by UTF-8 bytes', () => {
    const paths = ['資料/甲.txt', 'electron/main.cjs', 'a.txt', 'electron-builder.yml', 'A.txt'];
    expect([...paths].sort(compareUtf8Bytewise)).toEqual([
      'A.txt',
      'a.txt',
      'electron-builder.yml',
      'electron/main.cjs',
      '資料/甲.txt',
    ]);
  });

  it('canonicalizes Windows and POSIX separators to the same slash path', () => {
    expect(canonicalizeTreeRelativePath('nested\\file.txt')).toBe('nested/file.txt');
    expect(canonicalizeTreeRelativePath('nested/file.txt')).toBe('nested/file.txt');
    const base = { bytes: 2, sha256: sha256('x\n') };
    const windows = fingerprintRecords([{ relativePath: 'nested\\file.txt', ...base }]);
    const posix = fingerprintRecords([{ relativePath: 'nested/file.txt', ...base }]);
    expect(windows).toEqual(posix);
  });

  it('changes when bytes or content change but not when records are merely reordered', () => {
    const alpha = { relativePath: 'alpha.txt', bytes: 6, sha256: sha256('alpha\n') };
    const beta = { relativePath: 'beta.txt', bytes: 5, sha256: sha256('beta\n') };
    const baseline = fingerprintRecords([alpha, beta]);
    expect(fingerprintRecords([beta, alpha]).treeSha256).toBe(baseline.treeSha256);
    expect(fingerprintRecords([{ ...alpha, bytes: 7 }, beta]).treeSha256).not.toBe(baseline.treeSha256);
    expect(fingerprintRecords([{ ...alpha, sha256: sha256('other\n') }, beta]).treeSha256).not.toBe(baseline.treeSha256);
  });

  it('rejects traversal, duplicate canonical paths, symlinks, junctions, and non-regular entries', () => {
    expect(() => canonicalizeTreeRelativePath('../escape.txt')).toThrow(/PATH_TRAVERSAL/u);
    const record = { bytes: 1, sha256: sha256('x') };
    expect(() => fingerprintRecords([
      { relativePath: 'same\\file.txt', ...record },
      { relativePath: 'same/file.txt', ...record },
    ])).toThrow(/DUPLICATE_PATH/u);

    const symbolicLink = { isSymbolicLink: () => true, isDirectory: () => false, isFile: () => false };
    const junction = { isSymbolicLink: () => true, isDirectory: () => true, isFile: () => false };
    const nonRegular = { isSymbolicLink: () => false, isDirectory: () => false, isFile: () => false };
    expect(() => classifyTreeEntry(symbolicLink, 'link')).toThrow(/SYMLINK_OR_REPARSE_POINT/u);
    expect(() => classifyTreeEntry(junction, 'junction')).toThrow(/SYMLINK_OR_REPARSE_POINT/u);
    expect(() => classifyTreeEntry(nonRegular, 'pipe')).toThrow(/NON_REGULAR/u);
  });

  it('fails closed on a real symlink or junction when the host permits creating one', async () => {
    const root = await createTreeFixture('fingerprint-link-', [['target/file.txt', 'inside\n']]);
    const linkPath = path.join(root, 'linked-target');
    let linkCreated = false;
    try {
      await symlink(path.join(root, 'target'), linkPath, 'junction');
      linkCreated = true;
    } catch (error) {
      expect(['EACCES', 'EPERM', 'UNKNOWN']).toContain(error.code);
    }
    if (linkCreated) await expect(treeFingerprint(root)).rejects.toThrow(/SYMLINK_OR_REPARSE_POINT/u);
    else {
      const junctionMetadata = { isSymbolicLink: () => true, isDirectory: () => true, isFile: () => false };
      expect(() => classifyTreeEntry(junctionMetadata, 'linked-target')).toThrow(/SYMLINK_OR_REPARSE_POINT/u);
    }
  });
});

describe('Phase 0-A public copy, canonical names, locale, and paired-image contracts', () => {
  it('passes the current explicit public-facing surface without scanning internal fixtures', async () => {
    const report = await validatePublicAndLocaleContracts(projectRoot);
    expect(report.publicCopy.status).toBe('PASS');
    expect(report.locale.englishThemeNames).toEqual([
      'Sakura', 'Summer Grove', 'Maple', 'Ginkgo', 'Snow Pine', 'Sunset', 'Ocean Waves', 'Pixel Wanderer', 'Voxel Kitty',
    ]);
    expect(report.showcase).toMatchObject({ status: 'PASS', captureCount: 6, pairCount: 3, scanDecodeCount: 2 });
    expect(PUBLIC_DOCUMENTATION_SURFACES.some((surface) => surface.includes('fixtures'))).toBe(false);
  });

  it('rejects every historical public-copy regression fixture', async () => {
    const fixtures = await readJson('public-copy-negative.json');
    for (const fixture of fixtures) {
      expect(inspectPublicCopyText(fixture.text, fixture.id), fixture.id).not.toEqual([]);
    }
  });

  it('rejects an English fallback introduced into a reachable Traditional Chinese key', async () => {
    const temporaryRoot = await mkdtemp(path.join(scratchParent, 'locale-'));
    try {
      await mkdir(path.join(temporaryRoot, 'src'));
      for (const name of ['themes.ts', 'i18n.ts', 'main.ts']) await copyFile(path.join(projectRoot, 'src', name), path.join(temporaryRoot, 'src', name));
      const i18nPath = path.join(temporaryRoot, 'src', 'i18n.ts');
      const source = await readFile(i18nPath, 'utf8');
      await writeFile(i18nPath, source.replace("summer: '盛夏綠蔭'", "summer: 'Summer Grove'"), 'utf8');
      await expect(validateLocaleContract(temporaryRoot)).rejects.toThrow(/UNEXPECTED_EN_FALLBACK_IN_ZH|IDENTICAL_LOCALE_VALUE/u);
    } finally {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  });
});

describe('Phase 0-A scoped human-acceptance manifest contract', () => {
  it('accepts the sanitized pending, non-frozen paired fixture', async () => {
    const manifest = await readJson('acceptance.valid.json');
    await expect(validateAcceptanceManifest(manifest, { artifactRoot: fixtureRoot, expectedProductVersion: 'v9.9.9' })).resolves.toMatchObject({ status: 'PASS', artifactCount: 2, pairCount: 1 });
  });

  it.each([
    ['absolute path', (manifest) => { manifest.artifacts[0].relativePath = 'C:/private/artifact.txt'; }],
    ['path traversal', (manifest) => { manifest.artifacts[0].relativePath = '../artifact.txt'; }],
    ['duplicate artifact', (manifest) => { manifest.artifacts[1].relativePath = manifest.artifacts[0].relativePath; }],
    ['missing required field', (manifest) => { delete manifest.artifacts[0].sha256; }],
    ['unknown field', (manifest) => { manifest.artifacts[0].sha265 = manifest.artifacts[0].sha256; }],
    ['bytes mismatch', (manifest) => { manifest.artifacts[0].bytes += 1; }],
    ['sha mismatch', (manifest) => { manifest.artifacts[0].sha256 = '0'.repeat(64); }],
    ['nonexistent file', (manifest) => { manifest.artifacts[0].relativePath = 'artifacts/missing.txt'; }],
    ['pending artifact marked frozen', (manifest) => { manifest.artifacts[0].frozen = true; }],
    ['changed dependency', (manifest) => { manifest.artifacts[0].dependencies[0].sha256 = '0'.repeat(64); }],
    ['paired metadata mismatch', (manifest) => { manifest.artifacts[1].pairedImage.camera.view = 'different'; }],
    ['wrong artifact version', (manifest) => { manifest.artifacts[0].productVersion = 'v1.1.1'; }],
  ])('rejects %s', async (_name, mutate) => {
    const manifest = clone(await readJson('acceptance.valid.json'));
    mutate(manifest);
    await expect(validateAcceptanceManifest(manifest, { artifactRoot: fixtureRoot, expectedProductVersion: 'v9.9.9' })).rejects.toThrow();
  });

  it('rejects a manifest for a different current product version', async () => {
    const manifest = await readJson('acceptance.valid.json');
    await expect(validateAcceptanceManifest(manifest, { artifactRoot: fixtureRoot, expectedProductVersion: 'v1.1.1' })).rejects.toThrow(/PRODUCT_VERSION/u);
  });

  it('rejects duplicate acceptance IDs across manifests', async () => {
    const manifest = await readJson('acceptance.valid.json');
    await expect(validateAcceptanceManifestSet([manifest, clone(manifest)], { artifactRoot: fixtureRoot, expectedProductVersion: 'v9.9.9' })).rejects.toThrow(/DUPLICATE_ACCEPTANCE_ID/u);
  });
});

describe('Phase 0-A fixed status schema and malformed document rejection', () => {
  it('accepts equivalent strict JSON and Markdown status documents', async () => {
    const json = await readFile(path.join(fixtureRoot, 'status.valid.json'), 'utf8');
    const markdown = await readFile(path.join(fixtureRoot, 'status.valid.md'), 'utf8');
    expect(parseAndValidateStatusDocument(json, 'json').status).toBe('PASS');
    expect(parseAndValidateStatusDocument(markdown, 'markdown').status).toBe('PASS');
  });

  it('rejects the two previously corrupted status keys', async () => {
    const invalid = await readFile(path.join(fixtureRoot, 'status.invalid-malformed-keys.json'), 'utf8');
    expect(() => parseAndValidateStatusDocument(invalid, 'json')).toThrow(/UNKNOWN_FIELDS/u);
  });

  it('rejects missing, merged, misspelled, and case-drifted fields', async () => {
    const base = await readJson('status.valid.json');
    const missing = clone(base);
    delete missing.remoteWrite;
    expect(() => validateStatusRecord(missing)).toThrow(/MISSING_FIELDS/u);
    const merged = clone(base);
    delete merged.gitIndexMetadataWrite;
    delete merged.gitHistoryOrRefsWrite;
    merged.gitIndexMetadataWriteAndHistoryOrRefsWrite = false;
    expect(() => validateStatusRecord(merged)).toThrow();
    const misspelled = clone(base);
    misspelled.canonicalThemeNamesRestabatored = true;
    expect(() => validateStatusRecord(misspelled)).toThrow(/UNKNOWN_FIELDS/u);
    const caseDrift = clone(base);
    caseDrift.remoteWrite = 'FALSE';
    expect(() => validateStatusRecord(caseDrift)).toThrow(/INVALID_STATE_VALUE/u);
  });

  it('rejects malformed JSON, malformed Markdown, and evidence contradictions', async () => {
    expect(() => parseAndValidateStatusDocument('{"schemaVersion":', 'json')).toThrow(/MALFORMED/u);
    const malformedMarkdown = await readFile(path.join(fixtureRoot, 'status.invalid-malformed.md'), 'utf8');
    expect(() => parseAndValidateStatusDocument(malformedMarkdown, 'markdown')).toThrow();
    const contradictory = await readJson('status.valid.json');
    contradictory.released = true;
    expect(() => validateStatusRecord(contradictory)).toThrow(/RELEASED_WITHOUT_PREREQUISITES/u);
  });
});

function runFixtureGit(repository, args) {
  const result = spawnSync('git', args, {
    cwd: repository,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: '0', GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never' },
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.status !== 0) throw new Error(`FIXTURE_GIT:${args[0]}:${result.stderr}`);
}

async function createDisposableGitFixture(prefix) {
  const fixture = await mkdtemp(path.join(scratchParent, prefix));
  const repository = path.join(fixture, 'repository');
  const temporaryRoot = path.join(fixture, 'temporary-index');
  await mkdir(repository);
  runFixtureGit(repository, ['init', '--initial-branch=main']);
  runFixtureGit(repository, ['config', 'user.name', 'Sanitized Fixture']);
  runFixtureGit(repository, ['config', 'user.email', 'fixture@example.invalid']);
  await writeFile(path.join(repository, 'tracked.txt'), 'baseline\n', 'utf8');
  runFixtureGit(repository, ['add', 'tracked.txt']);
  runFixtureGit(repository, ['commit', '-m', 'fixture baseline']);
  return { fixture, repository, temporaryRoot };
}

describe('Phase 0-A index-safe audit', () => {
  it('detects clean, worktree-modified, and staged states without changing audited index bytes', async () => {
    const { fixture, repository, temporaryRoot } = await createDisposableGitFixture('index-states-');
    try {
      const clean = await auditIndexSafe(repository, { strict: false, temporaryRoot, processDetector: () => ({ status: 'known', matches: [], detail: null }) });
      expect(clean).toMatchObject({ indexStable: true, indexSemanticTreeEqualsHead: true, stagedChangeCount: 0 });
      expect(clean.worktree).toEqual({ modified: [], deleted: [], untracked: [] });

      await writeFile(path.join(repository, 'tracked.txt'), 'worktree change\n', 'utf8');
      const modified = await auditIndexSafe(repository, { strict: false, temporaryRoot, processDetector: () => ({ status: 'known', matches: [], detail: null }) });
      expect(modified.worktree.modified).toEqual(['tracked.txt']);
      expect(modified.stagedChangeCount).toBe(0);

      runFixtureGit(repository, ['add', 'tracked.txt']);
      const staged = await auditIndexSafe(repository, { strict: false, temporaryRoot, processDetector: () => ({ status: 'known', matches: [], detail: null }) });
      expect(staged.stagedChangeCount).toBe(1);
      expect(staged.stagedPaths).toEqual(['tracked.txt']);
      expect(staged.indexSha256.before).toBe(staged.indexSha256.after);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });

  it('fails closed when index bytes mutate during the audit', async () => {
    const { fixture, repository, temporaryRoot } = await createDisposableGitFixture('index-mutation-');
    try {
      await expect(auditIndexSafe(repository, {
        strict: false,
        temporaryRoot,
        processDetector: () => ({ status: 'known', matches: [], detail: null }),
        simulateIndexMutation: (indexPath) => appendFile(indexPath, Buffer.from([0])),
      })).rejects.toThrow(/INDEX_BYTES_CHANGED/u);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });

  it('strict mode stops when a known Git watcher is present', async () => {
    const { fixture, repository, temporaryRoot } = await createDisposableGitFixture('index-process-');
    try {
      await expect(auditIndexSafe(repository, {
        strict: true,
        temporaryRoot,
        processDetector: () => ({ status: 'known', matches: ['Code.exe'], detail: null }),
      })).rejects.toThrow(/CONCURRENT_GIT_TOOLS/u);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });
});

async function createReleaseMock({ wrongDigest = false, omitDigests = false, latestTag = 'v9.9.9' } = {}) {
  const configuration = await readJson('public-release.valid.json');
  const archive = await readFile(path.join(fixtureRoot, 'release', 'archive.zip'));
  const checksum = await readFile(path.join(fixtureRoot, 'release', 'archive.zip.sha256'));
  const expectedByName = new Map(configuration.expectedManagedAssets.map((asset) => [asset.name, asset]));
  const assets = ['archive.zip', 'archive.zip.sha256'].map((name) => {
    const expected = expectedByName.get(name);
    return {
      name,
      size: expected.bytes,
      digest: omitDigests ? null : `sha256:${wrongDigest && name === 'archive.zip' ? '0'.repeat(64) : expected.sha256}`,
      browser_download_url: `https://downloads.fixture.invalid/${name}`,
    };
  });
  const json = (value, status = 200) => new globalThis.Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json' } });
  const fetchImpl = async (input) => {
    const url = String(input);
    if (url.endsWith('/commits/main')) return json({ sha: configuration.expectedTarget.commit });
    if (url.includes('/git/ref/tags/')) return json({ object: { type: 'commit', sha: configuration.expectedTarget.commit } });
    if (url.includes('/releases/tags/')) return json({
      tag_name: configuration.tag,
      name: configuration.expectedReleaseTitle,
      draft: false,
      prerelease: false,
      target_commitish: 'main',
      body: 'English marker\n\n繁體中文標記',
      assets,
    });
    if (url === 'https://downloads.fixture.invalid/archive.zip') return new globalThis.Response(archive, { status: 200 });
    if (url === 'https://downloads.fixture.invalid/archive.zip.sha256') return new globalThis.Response(checksum, { status: 200 });
    if (url.includes('raw.githubusercontent.com') && url.endsWith('/README.md')) return new globalThis.Response('![fixture](docs/image.png)', { status: 200 });
    if (url.includes('raw.githubusercontent.com') && url.endsWith('/docs/image.png')) return new globalThis.Response(Buffer.from('png'), { status: 200 });
    if (url.startsWith('https://api.github.com/') && url.endsWith('/releases/latest')) return json({ tag_name: latestTag });
    if (url.startsWith('https://github.com/') && url.endsWith('/releases/latest')) {
      return new globalThis.Response(null, { status: 302, headers: { location: `https://github.com/fixture-owner/fixture-repository/releases/tag/${latestTag}` } });
    }
    throw new Error(`UNEXPECTED_FIXTURE_URL:${url}`);
  };
  return { configuration, fetchImpl };
}

describe('Phase 0-A public GitHub Release verifier fixtures', () => {
  it('passes a complete unauthenticated read-only public Release fixture', async () => {
    const { configuration, fetchImpl } = await createReleaseMock();
    const report = await verifyPublicRelease(configuration, { fetchImpl });
    expect(report).toMatchObject({
      status: 'PASS', authenticationUsed: false, mutationApiUsed: false,
      managedAssetCount: 2, automaticSourceArchiveCount: 2,
      checksumMatchesPackage: true, publicImageCount: 1,
    });
    expect(report.readOnlyHttpMethods).toEqual(['GET']);
  });

  it('rejects a managed asset digest mismatch', async () => {
    const { configuration, fetchImpl } = await createReleaseMock({ wrongDigest: true });
    await expect(verifyPublicRelease(configuration, { fetchImpl })).rejects.toThrow(/ASSET_SHA256/u);
  });

  it('refuses PASS when required digests are unavailable and download is disabled', async () => {
    const { configuration, fetchImpl } = await createReleaseMock({ omitDigests: true });
    await expect(verifyPublicRelease(configuration, { fetchImpl, downloadMissingDigests: false })).rejects.toThrow(/UNKNOWN_ASSET_DIGESTS/u);
  });

  it('rejects an incorrect Latest target', async () => {
    const { configuration, fetchImpl } = await createReleaseMock({ latestTag: 'v9.9.8' });
    await expect(verifyPublicRelease(configuration, { fetchImpl })).rejects.toThrow(/LATEST_API_TAG/u);
  });
});

describe('Phase 0-A machine-readable schemas', () => {
  it('keeps all four schemas strict and parseable', async () => {
    for (const name of ['human-acceptance.schema.json', 'status.schema.json', 'showcase-manifest.schema.json', 'public-release.schema.json']) {
      const schema = JSON.parse(await readFile(path.join(projectRoot, 'schemas', 'phase0-a', name), 'utf8'));
      expect(schema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
      expect(schema.additionalProperties).toBe(false);
      expect(schema.required.length).toBeGreaterThan(0);
    }
  });
});
