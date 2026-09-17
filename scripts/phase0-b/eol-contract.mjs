import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TextDecoder } from 'node:util';

const BINARY_EXTENSIONS = new Set([
  '.7z', '.avif', '.bmp', '.db', '.dll', '.eot', '.exe', '.gif', '.gz',
  '.ico', '.jpeg', '.jpg', '.otf', '.pdf', '.pdb', '.png', '.sqlite',
  '.sqlite3', '.tar', '.ttf', '.webp', '.woff', '.woff2', '.zip'
]);

const IGNORED_TOP_LEVEL_DIRECTORIES = new Set([
  '.git', '.cache', 'artifacts', 'coverage', 'dist', 'dist-single',
  'node_modules', 'release', '_workspace'
]);

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function slash(value) {
  return value.split(path.sep).join('/');
}

function globRegex(pattern) {
  let source = '';
  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    if (character === '*') {
      if (pattern[index + 1] === '*') {
        source += '.*';
        index += 1;
      } else {
        source += '[^/]*';
      }
    } else if (character === '?') {
      source += '[^/]';
    } else {
      source += character.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
    }
  }
  return new RegExp('^' + source + '$');
}

function matchesPattern(relativePath, pattern) {
  const normalizedPattern = pattern.startsWith('/') ? pattern.slice(1) : pattern;
  const candidate = normalizedPattern.includes('/')
    ? relativePath
    : path.posix.basename(relativePath);
  return globRegex(normalizedPattern).test(candidate);
}

export function parseAttributes(source) {
  const rules = [];
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const fields = trimmed.split(/\s+/u);
    if (fields.length < 2) {
      throw new Error('INVALID_GITATTRIBUTES_LINE:' + String(index + 1));
    }
    const rule = { pattern: fields[0], type: null, eol: null, line: index + 1 };
    for (const attribute of fields.slice(1)) {
      if (attribute === 'text') rule.type = 'text';
      else if (attribute === '-text') rule.type = 'binary';
      else if (attribute === 'eol=lf') rule.eol = 'lf';
      else if (attribute === 'eol=crlf') rule.eol = 'crlf';
      else throw new Error('UNSUPPORTED_GIT_ATTRIBUTE:' + attribute + ':LINE:' + String(index + 1));
    }
    if (!rule.type) throw new Error('MISSING_TEXT_CLASSIFICATION:LINE:' + String(index + 1));
    if (rule.type === 'binary' && rule.eol) {
      throw new Error('BINARY_RULE_HAS_EOL:LINE:' + String(index + 1));
    }
    if (rule.type === 'text' && !rule.eol) {
      throw new Error('TEXT_RULE_MISSING_EOL:LINE:' + String(index + 1));
    }
    rules.push(rule);
  }
  return rules;
}

export function resolvePolicy(relativePath, rules) {
  let resolved = null;
  for (const rule of rules) {
    if (matchesPattern(relativePath, rule.pattern)) {
      resolved = { type: rule.type, eol: rule.eol, pattern: rule.pattern, line: rule.line };
    }
  }
  return resolved;
}

export function detectBom(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return 'UTF-8';
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) return 'UTF-16LE';
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) return 'UTF-16BE';
  return 'none';
}

export function inspectEol(bytes) {
  let crlfCount = 0;
  let lfCount = 0;
  let loneCrCount = 0;
  for (let index = 0; index < bytes.length; index += 1) {
    if (bytes[index] === 13 && bytes[index + 1] === 10) {
      crlfCount += 1;
      index += 1;
    } else if (bytes[index] === 10) {
      lfCount += 1;
    } else if (bytes[index] === 13) {
      loneCrCount += 1;
    }
  }
  let style = 'none';
  if (loneCrCount > 0) style = crlfCount > 0 || lfCount > 0 ? 'mixed-with-lone-cr' : 'CR';
  else if (crlfCount > 0 && lfCount > 0) style = 'mixed';
  else if (crlfCount > 0) style = 'CRLF';
  else if (lfCount > 0) style = 'LF';
  return { style, crlfCount, lfCount, loneCrCount };
}

function isValidUtf8(bytes) {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}

export function detectFileType(relativePath, bytes) {
  const extension = path.posix.extname(relativePath).toLowerCase();
  const binaryExtension = BINARY_EXTENSIONS.has(extension);
  const nulByte = bytes.includes(0);
  const validUtf8 = isValidUtf8(bytes);
  return {
    type: binaryExtension || nulByte || !validUtf8 ? 'binary' : 'text',
    binaryExtension,
    nulByte,
    validUtf8
  };
}

export function inspectBytes(relativePath, bytes) {
  const detection = detectFileType(relativePath, bytes);
  const finalNewline = bytes.length > 0 && (bytes[bytes.length - 1] === 10 || bytes[bytes.length - 1] === 13);
  return {
    bytes: bytes.length,
    sha256: sha256(bytes),
    detectedType: detection.type,
    detection,
    eol: detection.type === 'text' ? inspectEol(bytes) : null,
    bom: detection.type === 'text' ? detectBom(bytes) : null,
    finalNewline: detection.type === 'text' ? finalNewline : null
  };
}

export function canonicalEolBytes(bytes) {
  const output = [];
  for (let index = 0; index < bytes.length; index += 1) {
    if (bytes[index] === 13 && bytes[index + 1] === 10) {
      output.push(10);
      index += 1;
    } else {
      output.push(bytes[index]);
    }
  }
  return Buffer.from(output);
}

export function semanticSha256(bytes) {
  return sha256(canonicalEolBytes(bytes));
}

export function normalizeEolBytes(bytes, target) {
  if (target !== 'lf' && target !== 'crlf') throw new Error('INVALID_EOL_TARGET:' + String(target));
  const current = inspectEol(bytes);
  if (current.loneCrCount > 0) throw new Error('LONE_CR_CANNOT_BE_NORMALIZED_SAFELY');
  const output = [];
  for (let index = 0; index < bytes.length; index += 1) {
    if (bytes[index] === 13 && bytes[index + 1] === 10) {
      if (target === 'crlf') output.push(13);
      output.push(10);
      index += 1;
    } else if (bytes[index] === 10) {
      if (target === 'crlf') output.push(13);
      output.push(10);
    } else {
      output.push(bytes[index]);
    }
  }
  return Buffer.from(output);
}

export function compareNormalizedContent(before, after) {
  const beforeCanonical = canonicalEolBytes(before);
  const afterCanonical = canonicalEolBytes(after);
  const sharedLength = Math.min(beforeCanonical.length, afterCanonical.length);
  let nonEolDifferenceCount = Math.abs(beforeCanonical.length - afterCanonical.length);
  for (let index = 0; index < sharedLength; index += 1) {
    if (beforeCanonical[index] !== afterCanonical[index]) nonEolDifferenceCount += 1;
  }
  return {
    beforeSha256: sha256(before),
    afterSha256: sha256(after),
    beforeSemanticSha256: sha256(beforeCanonical),
    afterSemanticSha256: sha256(afterCanonical),
    semanticEqual: nonEolDifferenceCount === 0,
    nonEolDifferenceCount,
    beforeBom: detectBom(before),
    afterBom: detectBom(after),
    bomPreserved: detectBom(before) === detectBom(after),
    beforeFinalNewline: before.length > 0 && (before[before.length - 1] === 10 || before[before.length - 1] === 13),
    afterFinalNewline: after.length > 0 && (after[after.length - 1] === 10 || after[after.length - 1] === 13),
    finalNewlinePreserved:
      (before.length > 0 && (before[before.length - 1] === 10 || before[before.length - 1] === 13)) ===
      (after.length > 0 && (after[after.length - 1] === 10 || after[after.length - 1] === 13))
  };
}

export async function walkContractFiles(root) {
  const output = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((first, second) => first.name.localeCompare(second.name, 'en'));
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      const relativePath = slash(path.relative(root, absolute));
      const topLevel = relativePath.split('/')[0];
      if (entry.isDirectory() && IGNORED_TOP_LEVEL_DIRECTORIES.has(topLevel)) continue;
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) output.push(relativePath);
      else throw new Error('UNSUPPORTED_FILE_TYPE:' + relativePath);
    }
  }
  await visit(root);
  return output.sort((first, second) => first.localeCompare(second, 'en'));
}

function validatePreservation(preservation) {
  if (!preservation || preservation.schemaVersion !== '1.0.0') throw new Error('INVALID_PRESERVATION_SCHEMA');
  if (!['none', 'UTF-8', 'UTF-16LE', 'UTF-16BE'].includes(preservation.defaultBom)) {
    throw new Error('INVALID_DEFAULT_BOM');
  }
  if (typeof preservation.defaultFinalNewline !== 'boolean') throw new Error('INVALID_DEFAULT_FINAL_NEWLINE');
  if (!Array.isArray(preservation.exceptions)) throw new Error('INVALID_PRESERVATION_EXCEPTIONS');
  const seen = new Set();
  for (const exception of preservation.exceptions) {
    if (!exception || typeof exception.path !== 'string' || seen.has(exception.path)) {
      throw new Error('INVALID_PRESERVATION_EXCEPTION');
    }
    seen.add(exception.path);
    if (exception.bom !== undefined && !['none', 'UTF-8', 'UTF-16LE', 'UTF-16BE'].includes(exception.bom)) {
      throw new Error('INVALID_EXCEPTION_BOM:' + exception.path);
    }
    if (exception.finalNewline !== undefined && typeof exception.finalNewline !== 'boolean') {
      throw new Error('INVALID_EXCEPTION_FINAL_NEWLINE:' + exception.path);
    }
  }
  return new Map(preservation.exceptions.map((entry) => [entry.path, entry]));
}

export async function validateTree(root, options = {}) {
  const attributesPath = path.resolve(root, options.attributesPath ?? '.gitattributes');
  const preservationPath = path.resolve(root, options.preservationPath ?? 'config/phase0-b/eol-preservation.json');
  const rules = parseAttributes(await readFile(attributesPath, 'utf8'));
  const preservation = JSON.parse(await readFile(preservationPath, 'utf8'));
  const exceptions = validatePreservation(preservation);
  const files = await walkContractFiles(root);
  const fileSet = new Set(files);
  const violations = [];
  const records = [];
  let textCount = 0;
  let binaryCount = 0;

  for (const exceptionPath of exceptions.keys()) {
    if (!fileSet.has(exceptionPath)) violations.push({ path: exceptionPath, code: 'STALE_PRESERVATION_EXCEPTION' });
  }

  for (const relativePath of files) {
    const bytes = await readFile(path.join(root, ...relativePath.split('/')));
    const inspection = inspectBytes(relativePath, bytes);
    const policy = resolvePolicy(relativePath, rules);
    const record = { relativePath, policy, ...inspection };
    records.push(record);
    if (!policy) {
      violations.push({ path: relativePath, code: 'UNCOVERED_PATH' });
      continue;
    }
    if (inspection.detectedType === 'binary') {
      binaryCount += 1;
      if (policy.type !== 'binary') violations.push({ path: relativePath, code: 'BINARY_POLICY_MISMATCH' });
      continue;
    }
    textCount += 1;
    if (policy.type !== 'text') {
      violations.push({ path: relativePath, code: 'TEXT_POLICY_MISMATCH' });
      continue;
    }
    if (policy.eol === 'lf' && (inspection.eol.crlfCount > 0 || inspection.eol.loneCrCount > 0)) {
      violations.push({ path: relativePath, code: 'EOL_NOT_LF', actual: inspection.eol.style });
    }
    if (policy.eol === 'crlf' && (inspection.eol.lfCount > 0 || inspection.eol.loneCrCount > 0)) {
      violations.push({ path: relativePath, code: 'EOL_NOT_CRLF', actual: inspection.eol.style });
    }
    const exception = exceptions.get(relativePath) ?? {};
    const expectedBom = exception.bom ?? preservation.defaultBom;
    const expectedFinalNewline = exception.finalNewline ?? preservation.defaultFinalNewline;
    if (inspection.bom !== expectedBom) {
      violations.push({ path: relativePath, code: 'BOM_DRIFT', expected: expectedBom, actual: inspection.bom });
    }
    if (inspection.finalNewline !== expectedFinalNewline) {
      violations.push({
        path: relativePath,
        code: 'FINAL_NEWLINE_DRIFT',
        expected: expectedFinalNewline,
        actual: inspection.finalNewline
      });
    }
  }

  return {
    pass: violations.length === 0,
    root,
    attributesPath,
    preservationPath,
    fileCount: files.length,
    textCount,
    binaryCount,
    ruleCount: rules.length,
    violations,
    records
  };
}

function option(args, name, fallback = null) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  if (!args[index + 1]) throw new Error('MISSING_OPTION_VALUE:' + name);
  return args[index + 1];
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command !== 'validate') throw new Error('USAGE: eol-contract.mjs validate --root <path> --preservation <path>');
  const root = path.resolve(option(args, '--root', '.'));
  const preservation = option(args, '--preservation', 'config/phase0-b/eol-preservation.json');
  const result = await validateTree(root, { preservationPath: preservation });
  const summary = {
    result: result.pass ? 'PASS' : 'FAIL',
    fileCount: result.fileCount,
    textCount: result.textCount,
    binaryCount: result.binaryCount,
    ruleCount: result.ruleCount,
    violationCount: result.violations.length,
    violations: result.violations
  };
  console.log(JSON.stringify(summary, null, 2));
  if (!result.pass) process.exitCode = 1;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error('PHASE0_B_EOL_CONTRACT=FAIL');
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
