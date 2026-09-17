import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assert, assertExactKeys, deepEqual, readJson } from './common.mjs';

const SHA256_PATTERN = /^[a-f0-9]{64}$/u;

function headers(accept = 'application/vnd.github+json') {
  return {
    Accept: accept,
    'User-Agent': 'VoxelQR-Studio-public-release-read-only-verifier',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function fetchChecked(fetchImpl, url, options, label) {
  const response = await fetchImpl(url, options);
  assert(response.ok, `${label}:HTTP_${response.status}`);
  return response;
}

async function fetchJson(fetchImpl, url, label) {
  const response = await fetchChecked(fetchImpl, url, { method: 'GET', headers: headers() }, label);
  return response.json();
}

async function streamDigest(response, keepBytes) {
  assert(response.body, 'PUBLIC_RELEASE:ASSET_BODY_MISSING');
  const hash = createHash('sha256');
  const chunks = [];
  let bytes = 0;
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = Buffer.from(value);
    hash.update(chunk);
    bytes += chunk.length;
    if (keepBytes) chunks.push(chunk);
  }
  return { bytes, sha256: hash.digest('hex'), content: keepBytes ? Buffer.concat(chunks) : null };
}

function validateConfiguration(config) {
  assertExactKeys(config, [
    'schemaVersion', 'repository', 'version', 'tag', 'expectedTarget', 'expectedReleaseTitle',
    'expectedReleaseState', 'requiredReleaseNoteMarkers', 'expectedManagedAssets', 'expectedChecksum',
    'expectedReadme', 'expectedLatest', 'expectedAutomaticSourceArchiveCount',
  ], [], 'PUBLIC_RELEASE_CONFIG');
  assert(config.schemaVersion === '1.0.0', 'PUBLIC_RELEASE_CONFIG:SCHEMA_VERSION');
  assertExactKeys(config.repository, ['owner', 'name'], [], 'PUBLIC_RELEASE_CONFIG:REPOSITORY');
  assertExactKeys(config.expectedTarget, ['branch', 'commit'], [], 'PUBLIC_RELEASE_CONFIG:TARGET');
  assert(/^[a-f0-9]{40}$/u.test(config.expectedTarget.commit), 'PUBLIC_RELEASE_CONFIG:COMMIT');
  assertExactKeys(config.expectedReleaseState, ['draft', 'prerelease'], [], 'PUBLIC_RELEASE_CONFIG:RELEASE_STATE');
  assert(Array.isArray(config.requiredReleaseNoteMarkers) && config.requiredReleaseNoteMarkers.length >= 2, 'PUBLIC_RELEASE_CONFIG:RELEASE_NOTE_MARKERS');
  assert(Array.isArray(config.expectedManagedAssets) && config.expectedManagedAssets.length > 0, 'PUBLIC_RELEASE_CONFIG:ASSETS');
  for (const [index, asset] of config.expectedManagedAssets.entries()) {
    assertExactKeys(asset, ['name', 'bytes', 'sha256'], [], `PUBLIC_RELEASE_CONFIG:ASSET_${index}`);
    assert(Number.isSafeInteger(asset.bytes) && asset.bytes >= 0, `PUBLIC_RELEASE_CONFIG:ASSET_${index}:BYTES`);
    assert(SHA256_PATTERN.test(asset.sha256), `PUBLIC_RELEASE_CONFIG:ASSET_${index}:SHA256`);
  }
  assertExactKeys(config.expectedChecksum, ['assetName', 'targetAssetName'], [], 'PUBLIC_RELEASE_CONFIG:CHECKSUM');
  assertExactKeys(config.expectedReadme, ['path', 'requiredImageReferences'], [], 'PUBLIC_RELEASE_CONFIG:README');
  assert(Array.isArray(config.expectedReadme.requiredImageReferences) && config.expectedReadme.requiredImageReferences.length > 0, 'PUBLIC_RELEASE_CONFIG:README_IMAGES');
  assert(typeof config.expectedLatest === 'boolean', 'PUBLIC_RELEASE_CONFIG:LATEST');
  assert(config.expectedAutomaticSourceArchiveCount === 2, 'PUBLIC_RELEASE_CONFIG:SOURCE_ARCHIVE_COUNT');
}

async function resolveTagCommit(fetchImpl, apiBase, tag) {
  const reference = await fetchJson(fetchImpl, `${apiBase}/git/ref/tags/${encodeURIComponent(tag)}`, 'PUBLIC_RELEASE:TAG_REF');
  if (reference.object?.type === 'commit') return reference.object.sha;
  assert(reference.object?.type === 'tag', `PUBLIC_RELEASE:TAG_OBJECT_TYPE:${reference.object?.type}`);
  const annotated = await fetchJson(fetchImpl, `${apiBase}/git/tags/${reference.object.sha}`, 'PUBLIC_RELEASE:ANNOTATED_TAG');
  assert(annotated.object?.type === 'commit', `PUBLIC_RELEASE:ANNOTATED_TAG_TARGET:${annotated.object?.type}`);
  return annotated.object.sha;
}

export async function verifyPublicRelease(config, {
  fetchImpl = globalThis.fetch,
  downloadMissingDigests = true,
} = {}) {
  validateConfiguration(config);
  assert(typeof fetchImpl === 'function', 'PUBLIC_RELEASE:FETCH_UNAVAILABLE');
  const { owner, name } = config.repository;
  const apiBase = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
  const webBase = `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
  const rawBase = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/${config.expectedTarget.commit}`;

  const branchCommit = await fetchJson(fetchImpl, `${apiBase}/commits/${encodeURIComponent(config.expectedTarget.branch)}`, 'PUBLIC_RELEASE:TARGET_BRANCH');
  assert(branchCommit.sha === config.expectedTarget.commit, `PUBLIC_RELEASE:TARGET_COMMIT:${branchCommit.sha}`);
  const tagCommit = await resolveTagCommit(fetchImpl, apiBase, config.tag);
  assert(tagCommit === config.expectedTarget.commit, `PUBLIC_RELEASE:TAG_COMMIT:${tagCommit}`);

  const release = await fetchJson(fetchImpl, `${apiBase}/releases/tags/${encodeURIComponent(config.tag)}`, 'PUBLIC_RELEASE:RELEASE');
  assert(release.tag_name === config.tag, `PUBLIC_RELEASE:RELEASE_TAG:${release.tag_name}`);
  assert(release.name === config.expectedReleaseTitle, `PUBLIC_RELEASE:RELEASE_TITLE:${release.name}`);
  assert(release.draft === config.expectedReleaseState.draft, `PUBLIC_RELEASE:DRAFT_STATE:${release.draft}`);
  assert(release.prerelease === config.expectedReleaseState.prerelease, `PUBLIC_RELEASE:PRERELEASE_STATE:${release.prerelease}`);
  assert(release.target_commitish === config.expectedTarget.branch || release.target_commitish === config.expectedTarget.commit, `PUBLIC_RELEASE:TARGET_COMMITISH:${release.target_commitish}`);
  for (const marker of config.requiredReleaseNoteMarkers) assert(release.body?.includes(marker), `PUBLIC_RELEASE:RELEASE_NOTE_MARKER:${marker}`);

  const actualAssets = [...(release.assets ?? [])].sort((first, second) => first.name.localeCompare(second.name, 'en'));
  const expectedAssets = [...config.expectedManagedAssets].sort((first, second) => first.name.localeCompare(second.name, 'en'));
  assert(deepEqual(actualAssets.map((asset) => asset.name), expectedAssets.map((asset) => asset.name)), `PUBLIC_RELEASE:MANAGED_ASSET_SET:${actualAssets.map((asset) => asset.name).join(',')}`);
  const downloaded = new Map();
  const assetReports = [];
  const unknownDigestAssets = [];
  for (const expected of expectedAssets) {
    const asset = actualAssets.find((candidate) => candidate.name === expected.name);
    assert(asset.size === expected.bytes, `PUBLIC_RELEASE:ASSET_BYTES:${expected.name}:${asset.size}`);
    const apiDigest = typeof asset.digest === 'string' && asset.digest.startsWith('sha256:') ? asset.digest.slice(7).toLowerCase() : null;
    let verifiedDigest = apiDigest;
    let digestSource = 'github-metadata';
    const needsContent = expected.name === config.expectedChecksum.assetName;
    if ((!apiDigest && downloadMissingDigests) || needsContent) {
      const response = await fetchChecked(fetchImpl, asset.browser_download_url, { method: 'GET', headers: headers('application/octet-stream') }, `PUBLIC_RELEASE:ASSET_DOWNLOAD:${expected.name}`);
      const streamed = await streamDigest(response, needsContent);
      assert(streamed.bytes === expected.bytes, `PUBLIC_RELEASE:DOWNLOADED_BYTES:${expected.name}:${streamed.bytes}`);
      downloaded.set(expected.name, streamed.content);
      if (!apiDigest) {
        verifiedDigest = streamed.sha256;
        digestSource = 'controlled-stream-download';
      } else {
        assert(streamed.sha256 === apiDigest, `PUBLIC_RELEASE:METADATA_DOWNLOAD_DIGEST_DRIFT:${expected.name}`);
      }
    }
    if (!verifiedDigest) {
      unknownDigestAssets.push(expected.name);
      digestSource = 'unknown';
    } else {
      assert(verifiedDigest === expected.sha256, `PUBLIC_RELEASE:ASSET_SHA256:${expected.name}:${verifiedDigest}`);
    }
    assetReports.push({ name: expected.name, bytes: expected.bytes, sha256: verifiedDigest ?? 'unknown', digestSource });
  }
  assert(unknownDigestAssets.length === 0, `PUBLIC_RELEASE:UNKNOWN_ASSET_DIGESTS:${unknownDigestAssets.join(',')}`);

  const checksumExpected = expectedAssets.find((asset) => asset.name === config.expectedChecksum.assetName);
  const checksumTarget = expectedAssets.find((asset) => asset.name === config.expectedChecksum.targetAssetName);
  assert(checksumExpected && checksumTarget, 'PUBLIC_RELEASE:CHECKSUM_ASSET_CONFIGURATION');
  const checksumBytes = downloaded.get(checksumExpected.name);
  assert(checksumBytes, 'PUBLIC_RELEASE:CHECKSUM_CONTENT_NOT_DOWNLOADED');
  const checksumText = checksumBytes.toString('utf8');
  const checksumPattern = new RegExp(`^${checksumTarget.sha256.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\s+\\*?${checksumTarget.name.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\s*$`, 'mu');
  assert(checksumPattern.test(checksumText), 'PUBLIC_RELEASE:CHECKSUM_CONTENT');

  const readmeUrl = `${rawBase}/${config.expectedReadme.path.split('/').map(encodeURIComponent).join('/')}`;
  const readmeResponse = await fetchChecked(fetchImpl, readmeUrl, { method: 'GET', headers: headers('text/plain') }, 'PUBLIC_RELEASE:README');
  const readme = await readmeResponse.text();
  for (const reference of config.expectedReadme.requiredImageReferences) {
    assert(readme.includes(reference), `PUBLIC_RELEASE:README_IMAGE_REFERENCE:${reference}`);
    const imageUrl = `${rawBase}/${reference.split('/').map(encodeURIComponent).join('/')}`;
    const imageResponse = await fetchChecked(fetchImpl, imageUrl, { method: 'GET', headers: headers('image/png') }, `PUBLIC_RELEASE:PUBLIC_IMAGE:${reference}`);
    await imageResponse.body?.cancel();
  }

  const latestRelease = await fetchJson(fetchImpl, `${apiBase}/releases/latest`, 'PUBLIC_RELEASE:LATEST_API');
  const latestMatches = latestRelease.tag_name === config.tag;
  assert(latestMatches === config.expectedLatest, `PUBLIC_RELEASE:LATEST_API_TAG:${latestRelease.tag_name}`);
  const latestRedirect = await fetchImpl(`${webBase}/releases/latest`, { method: 'GET', redirect: 'manual', headers: headers('text/html') });
  assert(latestRedirect.status >= 300 && latestRedirect.status < 400, `PUBLIC_RELEASE:LATEST_REDIRECT_STATUS:${latestRedirect.status}`);
  const location = latestRedirect.headers.get('location') ?? '';
  const redirectMatches = location.endsWith(`/releases/tag/${config.tag}`);
  assert(redirectMatches === config.expectedLatest, `PUBLIC_RELEASE:LATEST_REDIRECT:${location}`);

  return {
    status: 'PASS',
    readOnlyHttpMethods: ['GET'],
    authenticationUsed: false,
    mutationApiUsed: false,
    repository: `${owner}/${name}`,
    branch: config.expectedTarget.branch,
    commit: config.expectedTarget.commit,
    tag: config.tag,
    tagCommit,
    releaseTitle: release.name,
    draft: release.draft,
    prerelease: release.prerelease,
    bilingualReleaseNotes: true,
    managedAssetCount: assetReports.length,
    automaticSourceArchiveCount: config.expectedAutomaticSourceArchiveCount,
    assets: assetReports,
    checksumMatchesPackage: true,
    readmeAccessible: true,
    publicImageCount: config.expectedReadme.requiredImageReferences.length,
    latest: { expected: config.expectedLatest, apiTag: latestRelease.tag_name, redirectLocation: location },
  };
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const configurationPath = argument('--config');
  assert(configurationPath, 'PUBLIC_RELEASE_CLI:--config_REQUIRED');
  const configuration = await readJson(path.resolve(configurationPath), 'PUBLIC_RELEASE_CONFIG');
  const report = await verifyPublicRelease(configuration, { downloadMissingDigests: !process.argv.includes('--no-download-missing-digests') });
  console.log(JSON.stringify(report, null, 2));
}
