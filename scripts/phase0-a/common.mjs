import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const TREE_FINGERPRINT_ALGORITHM_ID = 'posix-relative-path-utf8-byte-order-v1';

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function deepEqual(first, second) {
  return canonicalJson(first) === canonicalJson(second);
}

export function assertPlainObject(value, label) {
  assert(value !== null && typeof value === 'object' && !Array.isArray(value), `${label}:EXPECTED_OBJECT`);
}

export function assertExactKeys(value, required, optional, label) {
  assertPlainObject(value, label);
  const allowed = new Set([...required, ...optional]);
  const actual = Object.keys(value);
  const missing = required.filter((key) => !Object.hasOwn(value, key));
  const unknown = actual.filter((key) => !allowed.has(key));
  assert(missing.length === 0, `${label}:MISSING_FIELDS:${missing.join(',')}`);
  assert(unknown.length === 0, `${label}:UNKNOWN_FIELDS:${unknown.join(',')}`);
}

export function assertSafeRelativePath(value, label) {
  assert(typeof value === 'string' && value.length > 0, `${label}:PATH_REQUIRED`);
  assert(!path.isAbsolute(value), `${label}:ABSOLUTE_PATH`);
  assert(!/^[A-Za-z]:[\\/]/u.test(value), `${label}:WINDOWS_ABSOLUTE_PATH`);
  assert(!value.startsWith('\\\\') && !value.startsWith('/'), `${label}:ROOTED_PATH`);
  assert(!value.includes('\\'), `${label}:BACKSLASH_NOT_PORTABLE`);
  const normalized = path.posix.normalize(value);
  assert(normalized === value && normalized !== '.' && !normalized.startsWith('../'), `${label}:PATH_TRAVERSAL`);
  return value;
}

export function resolveRelative(root, relativePath, label) {
  assertSafeRelativePath(relativePath, label);
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, ...relativePath.split('/'));
  const prefix = `${resolvedRoot}${path.sep}`;
  assert(resolved.startsWith(prefix), `${label}:OUTSIDE_ROOT`);
  return resolved;
}

export async function readJson(file, label = file) {
  let value;
  try {
    value = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`${label}:MALFORMED_JSON:${error.message}`);
  }
  return value;
}

export async function fileFingerprint(file) {
  const bytes = await readFile(file);
  return { bytes: bytes.length, sha256: sha256(bytes) };
}

export function compareUtf8Bytewise(first, second) {
  return Buffer.compare(Buffer.from(first, 'utf8'), Buffer.from(second, 'utf8'));
}

export function canonicalizeTreeRelativePath(value, label = 'TREE_PATH') {
  assert(typeof value === 'string' && value.length > 0, `${label}:PATH_REQUIRED`);
  assert(!path.posix.isAbsolute(value) && !path.win32.isAbsolute(value), `${label}:ABSOLUTE_PATH`);
  assert(!value.startsWith('\\\\') && !value.startsWith('//'), `${label}:ROOTED_PATH`);
  const canonical = value.replaceAll('\\', '/');
  const normalized = path.posix.normalize(canonical);
  assert(
    canonical === normalized && normalized !== '.' && !normalized.startsWith('../'),
    `${label}:PATH_TRAVERSAL_OR_NONCANONICAL`,
  );
  return canonical;
}

export function classifyTreeEntry(metadata, relativePath) {
  assert(metadata && typeof metadata.isSymbolicLink === 'function', `TREE_ENTRY:INVALID_METADATA:${relativePath}`);
  if (metadata.isSymbolicLink()) throw new Error(`TREE_ENTRY:SYMLINK_OR_REPARSE_POINT:${relativePath}`);
  if (metadata.isDirectory()) return 'directory';
  if (metadata.isFile()) return 'file';
  throw new Error(`TREE_ENTRY:NON_REGULAR:${relativePath}`);
}

function sameFileIdentity(first, second) {
  return first.dev === second.dev &&
    first.ino === second.ino &&
    first.mode === second.mode &&
    first.size === second.size &&
    first.mtimeMs === second.mtimeMs;
}

async function readTreeFileNoFollow(file, relativePath) {
  const before = await lstat(file);
  assert(classifyTreeEntry(before, relativePath) === 'file', `TREE_ENTRY:NOT_FILE:${relativePath}`);
  const contents = await readFile(file);
  const after = await lstat(file);
  assert(classifyTreeEntry(after, relativePath) === 'file', `TREE_ENTRY:NOT_FILE_AFTER_READ:${relativePath}`);
  assert(sameFileIdentity(before, after), `TREE_ENTRY:CHANGED_DURING_READ:${relativePath}`);
  assert(contents.length === before.size, `TREE_ENTRY:SIZE_CHANGED_DURING_READ:${relativePath}`);
  return contents;
}

export async function walkFiles(root, { exclude = () => false } = {}) {
  const resolvedRoot = path.resolve(root);
  const rootMetadata = await lstat(resolvedRoot);
  assert(classifyTreeEntry(rootMetadata, '.') === 'directory', 'TREE_ROOT:NOT_DIRECTORY');
  const output = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      const relativePath = canonicalizeTreeRelativePath(path.relative(resolvedRoot, absolute), 'TREE_ENTRY');
      const metadata = await lstat(absolute);
      const kind = classifyTreeEntry(metadata, relativePath);
      if (exclude(relativePath, entry)) continue;
      if (kind === 'directory') await visit(absolute);
      else output.push(relativePath);
    }
  }

  await visit(resolvedRoot);
  return output.sort(compareUtf8Bytewise);
}

export function fingerprintRecords(records) {
  assert(Array.isArray(records), 'TREE_RECORDS:EXPECTED_ARRAY');
  const canonicalRecords = records.map((record, index) => {
    assertPlainObject(record, `TREE_RECORD:${index}`);
    const relativePath = canonicalizeTreeRelativePath(record.relativePath, `TREE_RECORD:${index}:PATH`);
    assert(Number.isSafeInteger(record.bytes) && record.bytes >= 0, `TREE_RECORD:${index}:BYTES`);
    assert(typeof record.sha256 === 'string' && /^[0-9a-f]{64}$/u.test(record.sha256), `TREE_RECORD:${index}:SHA256`);
    return { relativePath, bytes: record.bytes, sha256: record.sha256 };
  }).sort((first, second) => compareUtf8Bytewise(first.relativePath, second.relativePath));

  for (let index = 1; index < canonicalRecords.length; index += 1) {
    assert(
      canonicalRecords[index - 1].relativePath !== canonicalRecords[index].relativePath,
      `TREE_RECORDS:DUPLICATE_PATH:${canonicalRecords[index].relativePath}`,
    );
  }

  const totalBytes = canonicalRecords.reduce((total, record) => total + record.bytes, 0);
  const treeSha256 = sha256(
    canonicalRecords.map((record) => `${record.relativePath}\t${record.bytes}\t${record.sha256}`).join('\n'),
  );
  return {
    algorithmId: TREE_FINGERPRINT_ALGORITHM_ID,
    fileCount: canonicalRecords.length,
    totalBytes,
    treeSha256,
    files: canonicalRecords,
  };
}

export async function treeFingerprint(root, options = {}) {
  const files = await walkFiles(root, options);
  const records = [];
  for (const relativePath of files) {
    const absolute = resolveRelative(root, relativePath, 'TREE_FILE');
    const contents = await readTreeFileNoFollow(absolute, relativePath);
    records.push({ relativePath, bytes: contents.length, sha256: sha256(contents) });
  }
  return fingerprintRecords(records);
}
