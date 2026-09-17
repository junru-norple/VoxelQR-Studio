import { afterEach, describe, expect, it } from 'vitest';
import { Buffer } from 'node:buffer';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { cwd } from 'node:process';
import {
  compareNormalizedContent,
  normalizeEolBytes,
  validateTree
} from '../scripts/phase0-b/eol-contract.mjs';

const temporaryRoots = [];
const baseAttributes = '.gitattributes text eol=lf\n*.json text eol=lf\n';

async function fixture({
  prefix = 'phase0-b-',
  attributes = '',
  files = {},
  defaultBom = 'none',
  defaultFinalNewline = true,
  exceptions = []
}) {
  const root = await mkdtemp(path.join(tmpdir(), prefix));
  temporaryRoots.push(root);
  const preservation = {
    schemaVersion: '1.0.0',
    defaultBom,
    defaultFinalNewline,
    exceptions
  };
  const allFiles = {
    '.gitattributes': baseAttributes + attributes,
    'config/phase0-b/eol-preservation.json': JSON.stringify(preservation, null, 2) + '\n',
    ...files
  };
  for (const [relativePath, content] of Object.entries(allFiles)) {
    const absolute = path.join(root, ...relativePath.split('/'));
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content);
  }
  return root;
}

afterEach(async () => {
  while (temporaryRoots.length > 0) {
    await rm(temporaryRoots.pop(), { recursive: true, force: true });
  }
});

describe('Phase 0-B EOL contract', () => {
  it('accepts a valid LF text file', async () => {
    const root = await fixture({ attributes: '*.txt text eol=lf\n', files: { 'valid.txt': 'one\ntwo\n' } });
    const result = await validateTree(root);
    expect(result.pass).toBe(true);
  });

  it('accepts a valid CRLF Windows command file', async () => {
    const root = await fixture({
      attributes: '*.cmd text eol=crlf\n',
      files: { 'launch.cmd': Buffer.from('@echo off\r\nexit /b 0\r\n', 'utf8') }
    });
    const result = await validateTree(root);
    expect(result.pass).toBe(true);
  });

  it('accepts a binary file explicitly marked as binary', async () => {
    const root = await fixture({
      attributes: '*.png -text\n',
      files: { 'asset.png': Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a]) }
    });
    const result = await validateTree(root);
    expect(result.pass).toBe(true);
  });

  it('rejects mixed LF and CRLF text', async () => {
    const root = await fixture({
      attributes: '*.txt text eol=lf\n',
      files: { 'mixed.txt': Buffer.from('one\r\ntwo\n', 'utf8') }
    });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(expect.objectContaining({ path: 'mixed.txt', code: 'EOL_NOT_LF' }));
  });

  it('rejects a lone carriage return', async () => {
    const root = await fixture({
      attributes: '*.txt text eol=lf\n',
      files: { 'lone-cr.txt': Buffer.from('one\rtwo\n', 'utf8') }
    });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(expect.objectContaining({ path: 'lone-cr.txt', code: 'EOL_NOT_LF' }));
  });

  it('rejects detected binary content marked as text', async () => {
    const root = await fixture({
      attributes: '*.png text eol=lf\n',
      files: { 'binary-as-text.png': Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00]) }
    });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(
      expect.objectContaining({ path: 'binary-as-text.png', code: 'BINARY_POLICY_MISMATCH' })
    );
  });

  it('rejects detected text content marked as binary', async () => {
    const root = await fixture({ attributes: '*.txt -text\n', files: { 'text-as-binary.txt': 'plain text\n' } });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(
      expect.objectContaining({ path: 'text-as-binary.txt', code: 'TEXT_POLICY_MISMATCH' })
    );
  });

  it('rejects UTF-8 BOM drift', async () => {
    const root = await fixture({
      attributes: '*.txt text eol=lf\n',
      files: { 'bom.txt': Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from('text\n')]) }
    });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(expect.objectContaining({ path: 'bom.txt', code: 'BOM_DRIFT' }));
  });

  it('rejects final-newline drift', async () => {
    const root = await fixture({ attributes: '*.txt text eol=lf\n', files: { 'no-final.txt': 'text' } });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(
      expect.objectContaining({ path: 'no-final.txt', code: 'FINAL_NEWLINE_DRIFT' })
    );
  });

  it('detects a non-EOL semantic change', () => {
    const comparison = compareNormalizedContent(Buffer.from('alpha\r\n'), Buffer.from('bravo\n'));
    expect(comparison.semanticEqual).toBe(false);
    expect(comparison.nonEolDifferenceCount).toBeGreaterThan(0);
  });

  it('rejects an uncovered text file', async () => {
    const root = await fixture({ files: { 'uncovered.custom': 'text\n' } });
    const result = await validateTree(root);
    expect(result.violations).toContainEqual(
      expect.objectContaining({ path: 'uncovered.custom', code: 'UNCOVERED_PATH' })
    );
  });

  it('supports a Windows-compatible Unicode path with spaces and parentheses', async () => {
    const root = await fixture({
      prefix: '繁體 中文(Phase 0-B)-',
      attributes: '*.txt text eol=lf\n',
      files: { '巢狀 目錄(測試)/內容.txt': '正確\n' }
    });
    const result = await validateTree(root);
    expect(result.pass).toBe(true);
  });

  it('normalizes only line-ending bytes while preserving BOM and final-newline state', () => {
    const before = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from('甲\r\n乙\r\n', 'utf8')]);
    const after = normalizeEolBytes(before, 'lf');
    const comparison = compareNormalizedContent(before, after);
    expect(comparison.semanticEqual).toBe(true);
    expect(comparison.nonEolDifferenceCount).toBe(0);
    expect(comparison.bomPreserved).toBe(true);
    expect(comparison.finalNewlinePreserved).toBe(true);
  });

  it('validates the complete Phase 0-B candidate tree', async () => {
    const result = await validateTree(cwd());
    expect(result.violations).toEqual([]);
    expect(result.pass).toBe(true);
  });
});
