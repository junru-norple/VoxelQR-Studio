import { readFile } from 'node:fs/promises';
import {
  assert,
  assertExactKeys,
  assertSafeRelativePath,
  canonicalJson,
  deepEqual,
  fileFingerprint,
  resolveRelative,
} from './common.mjs';

const SHA256_PATTERN = /^[a-f0-9]{64}$/u;
const ACCEPTANCE_SCOPES = new Set(['visual-composition', 'public-copy', 'runtime-behavior', 'release-artifact', 'automation-contract']);
const EVALUATOR_ROLES = new Set(['human-user', 'automated-validator', 'release-manager']);
const ACCEPTANCE_STATUSES = new Set(['pending', 'accepted', 'rejected']);
const STATUS_STATE_FIELDS = Object.freeze([
  'formalRepositoryContentWrite',
  'gitIndexMetadataWrite',
  'gitHistoryOrRefsWrite',
  'remoteWrite',
  'verified',
  'humanAccepted',
  'packaged',
  'synced',
  'pushed',
  'tagged',
  'released',
]);

function assertFingerprint(value, label) {
  assert(Number.isSafeInteger(value.bytes) && value.bytes >= 0, `${label}:INVALID_BYTES`);
  assert(typeof value.sha256 === 'string' && SHA256_PATTERN.test(value.sha256), `${label}:INVALID_SHA256`);
}

function comparablePairMetadata(value) {
  const clone = globalThis.structuredClone(value);
  delete clone.locale;
  return clone;
}

export async function validateAcceptanceManifest(manifest, { artifactRoot, expectedProductVersion }) {
  assertExactKeys(manifest, ['schemaVersion', 'productVersion', 'acceptanceId', 'artifacts'], [], 'ACCEPTANCE_MANIFEST');
  assert(manifest.schemaVersion === '1.0.0', 'ACCEPTANCE_MANIFEST:SCHEMA_VERSION');
  assert(manifest.productVersion === expectedProductVersion, `ACCEPTANCE_MANIFEST:PRODUCT_VERSION:${manifest.productVersion}`);
  assert(typeof manifest.acceptanceId === 'string' && /^[a-z0-9][a-z0-9._-]{2,127}$/u.test(manifest.acceptanceId), 'ACCEPTANCE_MANIFEST:ACCEPTANCE_ID');
  assert(Array.isArray(manifest.artifacts) && manifest.artifacts.length > 0, 'ACCEPTANCE_MANIFEST:ARTIFACTS_REQUIRED');

  const paths = new Set();
  const pairs = new Map();
  for (const [index, artifact] of manifest.artifacts.entries()) {
    const label = `ACCEPTANCE_ARTIFACT_${index}`;
    assertExactKeys(artifact, [
      'productVersion', 'relativePath', 'bytes', 'sha256', 'acceptanceScope', 'evaluatorRole',
      'acceptanceStatus', 'frozen', 'evidenceReference', 'dependencies', 'invalidationConditions',
    ], ['pairedImage'], label);
    assert(artifact.productVersion === manifest.productVersion, `${label}:PRODUCT_VERSION`);
    assertSafeRelativePath(artifact.relativePath, `${label}:ARTIFACT_PATH`);
    assert(!paths.has(artifact.relativePath), `${label}:DUPLICATE_ARTIFACT`);
    paths.add(artifact.relativePath);
    assertFingerprint(artifact, label);
    const actual = await fileFingerprint(resolveRelative(artifactRoot, artifact.relativePath, `${label}:ARTIFACT_PATH`));
    assert(actual.bytes === artifact.bytes, `${label}:BYTES_MISMATCH`);
    assert(actual.sha256 === artifact.sha256, `${label}:SHA256_MISMATCH`);
    assert(Array.isArray(artifact.acceptanceScope) && artifact.acceptanceScope.length > 0, `${label}:ACCEPTANCE_SCOPE`);
    assert(artifact.acceptanceScope.every((scope) => ACCEPTANCE_SCOPES.has(scope)), `${label}:UNKNOWN_ACCEPTANCE_SCOPE`);
    assert(EVALUATOR_ROLES.has(artifact.evaluatorRole), `${label}:EVALUATOR_ROLE`);
    assert(ACCEPTANCE_STATUSES.has(artifact.acceptanceStatus), `${label}:ACCEPTANCE_STATUS`);
    assert(typeof artifact.frozen === 'boolean', `${label}:FROZEN_TYPE`);
    if (artifact.frozen) {
      assert(artifact.acceptanceStatus === 'accepted', `${label}:FROZEN_WITHOUT_ACCEPTANCE`);
      assert(artifact.evaluatorRole === 'human-user', `${label}:FROZEN_WITHOUT_HUMAN_EVALUATOR`);
    }
    assertSafeRelativePath(artifact.evidenceReference, `${label}:EVIDENCE_REFERENCE`);
    await readFile(resolveRelative(artifactRoot, artifact.evidenceReference, `${label}:EVIDENCE_REFERENCE`));
    assert(Array.isArray(artifact.dependencies) && artifact.dependencies.length > 0, `${label}:DEPENDENCIES_REQUIRED`);
    const dependencyPaths = new Set();
    for (const [dependencyIndex, dependency] of artifact.dependencies.entries()) {
      const dependencyLabel = `${label}:DEPENDENCY_${dependencyIndex}`;
      assertExactKeys(dependency, ['kind', 'relativePath', 'bytes', 'sha256'], [], dependencyLabel);
      assert(['input', 'tool', 'source', 'schema'].includes(dependency.kind), `${dependencyLabel}:KIND`);
      assertSafeRelativePath(dependency.relativePath, `${dependencyLabel}:PATH`);
      assert(!dependencyPaths.has(dependency.relativePath), `${dependencyLabel}:DUPLICATE`);
      dependencyPaths.add(dependency.relativePath);
      assertFingerprint(dependency, dependencyLabel);
      const dependencyActual = await fileFingerprint(resolveRelative(artifactRoot, dependency.relativePath, `${dependencyLabel}:PATH`));
      assert(dependencyActual.bytes === dependency.bytes && dependencyActual.sha256 === dependency.sha256, `${dependencyLabel}:FINGERPRINT_CHANGED`);
    }
    assert(Array.isArray(artifact.invalidationConditions) && artifact.invalidationConditions.length > 0, `${label}:INVALIDATION_CONDITIONS`);
    assert(artifact.invalidationConditions.every((condition) => typeof condition === 'string' && condition.trim().length > 0), `${label}:INVALIDATION_CONDITION_VALUE`);

    if (artifact.pairedImage) {
      assertExactKeys(artifact.pairedImage, ['pairId', 'locale', 'payload', 'viewport', 'applicationState', 'camera', 'composition'], [], `${label}:PAIRED_IMAGE`);
      assert(['en', 'zh-TW'].includes(artifact.pairedImage.locale), `${label}:PAIRED_IMAGE_LOCALE`);
      if (!pairs.has(artifact.pairedImage.pairId)) pairs.set(artifact.pairedImage.pairId, []);
      pairs.get(artifact.pairedImage.pairId).push(artifact.pairedImage);
    }
  }
  for (const [pairId, members] of pairs) {
    assert(members.length === 2, `ACCEPTANCE_MANIFEST:PAIR_SIZE:${pairId}`);
    assert(deepEqual(members.map((member) => member.locale).sort(), ['en', 'zh-TW']), `ACCEPTANCE_MANIFEST:PAIR_LOCALES:${pairId}`);
    assert(deepEqual(comparablePairMetadata(members[0]), comparablePairMetadata(members[1])), `ACCEPTANCE_MANIFEST:PAIR_METADATA_MISMATCH:${pairId}`);
  }
  return { status: 'PASS', acceptanceId: manifest.acceptanceId, artifactCount: manifest.artifacts.length, pairCount: pairs.size };
}

export async function validateAcceptanceManifestSet(manifests, options) {
  assert(Array.isArray(manifests) && manifests.length > 0, 'ACCEPTANCE_SET:MANIFESTS_REQUIRED');
  const ids = new Set();
  const reports = [];
  for (const manifest of manifests) {
    assert(!ids.has(manifest.acceptanceId), `ACCEPTANCE_SET:DUPLICATE_ACCEPTANCE_ID:${manifest.acceptanceId}`);
    ids.add(manifest.acceptanceId);
    reports.push(await validateAcceptanceManifest(manifest, options));
  }
  return reports;
}

function assertStateValue(value, label) {
  assert(value === true || value === false || value === 'unknown', `${label}:INVALID_STATE_VALUE`);
}

export function validateStatusRecord(status) {
  assertExactKeys(status, ['schemaVersion', 'workPackage', ...STATUS_STATE_FIELDS, 'evidenceReferences'], [], 'STATUS_RECORD');
  assert(status.schemaVersion === '1.0.0', 'STATUS_RECORD:SCHEMA_VERSION');
  assert(typeof status.workPackage === 'string' && /^[A-Z0-9_]+$/u.test(status.workPackage), 'STATUS_RECORD:WORK_PACKAGE');
  for (const field of STATUS_STATE_FIELDS) assertStateValue(status[field], `STATUS_RECORD:${field}`);
  assert(Array.isArray(status.evidenceReferences), 'STATUS_RECORD:EVIDENCE_REFERENCES');
  for (const [index, reference] of status.evidenceReferences.entries()) assertSafeRelativePath(reference, `STATUS_RECORD:EVIDENCE_${index}`);

  if (status.packaged === true) assert(status.humanAccepted === true, 'STATUS_RECORD:PACKAGED_WITHOUT_HUMAN_ACCEPTANCE');
  if (status.pushed === true) assert(status.remoteWrite === true, 'STATUS_RECORD:PUSHED_WITHOUT_REMOTE_WRITE');
  if (status.tagged === true) assert(status.gitHistoryOrRefsWrite === true, 'STATUS_RECORD:TAGGED_WITHOUT_REF_WRITE');
  if (status.released === true) {
    const prerequisites = ['verified', 'humanAccepted', 'packaged', 'synced', 'pushed', 'tagged'];
    const incomplete = prerequisites.filter((field) => status[field] !== true);
    assert(incomplete.length === 0, `STATUS_RECORD:RELEASED_WITHOUT_PREREQUISITES:${incomplete.join(',')}`);
    assert(status.remoteWrite === true, 'STATUS_RECORD:RELEASED_WITHOUT_REMOTE_WRITE');
  }
  return { status: 'PASS', workPackage: status.workPackage, stateFields: STATUS_STATE_FIELDS.length };
}

function parseMarkdownValue(raw) {
  const value = raw.trim().replace(/^`|`$/gu, '');
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'unknown') return 'unknown';
  if (value.startsWith('[')) {
    try { return JSON.parse(value); }
    catch (error) { throw new Error(`STATUS_MARKDOWN:MALFORMED_JSON_VALUE:${error.message}`); }
  }
  return value;
}

export function parseStatusMarkdown(text) {
  const lines = text.split(/\r?\n/u).filter((line) => line.trim().length > 0);
  assert(lines.length >= 3, 'STATUS_MARKDOWN:TABLE_TOO_SHORT');
  const rows = lines.map((line, index) => {
    assert(line.trim().startsWith('|') && line.trim().endsWith('|'), `STATUS_MARKDOWN:ROW_DELIMITERS:${index + 1}`);
    const cells = line.trim().slice(1, -1).split('|').map((cell) => cell.trim());
    assert(cells.length === 2, `STATUS_MARKDOWN:COLUMN_COUNT:${index + 1}:${cells.length}`);
    assert(cells.every((cell) => cell.length > 0), `STATUS_MARKDOWN:EMPTY_CELL:${index + 1}`);
    return cells;
  });
  assert(deepEqual(rows[0], ['Field', 'Value']), 'STATUS_MARKDOWN:HEADER');
  assert(rows[1].every((cell) => /^:?-{3,}:?$/u.test(cell)), 'STATUS_MARKDOWN:SEPARATOR');
  const status = {};
  for (const [field, rawValue] of rows.slice(2)) {
    assert(!Object.hasOwn(status, field), `STATUS_MARKDOWN:DUPLICATE_FIELD:${field}`);
    status[field] = parseMarkdownValue(rawValue);
  }
  return status;
}

export function parseAndValidateStatusDocument(text, format) {
  let value;
  if (format === 'json') {
    try { value = JSON.parse(text); }
    catch (error) { throw new Error(`STATUS_JSON:MALFORMED:${error.message}`); }
  } else if (format === 'markdown') {
    value = parseStatusMarkdown(text);
  } else {
    throw new Error(`STATUS_DOCUMENT:UNKNOWN_FORMAT:${format}`);
  }
  const report = validateStatusRecord(value);
  return { ...report, canonical: canonicalJson(value) };
}

export { STATUS_STATE_FIELDS };
