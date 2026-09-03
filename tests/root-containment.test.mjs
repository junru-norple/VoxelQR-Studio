import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  assertIncidentRootsAbsent,
  assertPathInside,
  assertR6ProcessEnvironment,
  externalIncidentRoot,
  hostProjectRoot,
  isPathInside,
  projectIncidentRoot,
  r6TempRoot,
  resolveInsideProject,
  sourceRoot,
  workspaceRoot,
} from '../scripts/root-containment.mjs';

describe('R6 repository-local fail-closed root containment', () => {
  it('accepts descendants and rejects the Repository root by default', () => {
    const output = path.join(workspaceRoot, 'build', 'v1.1.0-r6', 'web');
    expect(isPathInside(hostProjectRoot, output)).toBe(true);
    expect(resolveInsideProject(output, 'BUILD')).toBe(path.resolve(output));
    expect(() => resolveInsideProject(hostProjectRoot, 'ROOT')).toThrow(/ROOT_CONTAINMENT:ROOT/);
    expect(isPathInside(hostProjectRoot, hostProjectRoot, { allowRoot: true })).toBe(true);
  });

  it('rejects traversal, absolute external paths, and sibling-prefix bypasses', () => {
    for (const candidate of [
      path.resolve(hostProjectRoot, '..', 'outside'),
      path.parse(hostProjectRoot).root,
      `${hostProjectRoot}-outside`,
    ]) {
      expect(isPathInside(hostProjectRoot, candidate)).toBe(false);
      expect(() => resolveInsideProject(candidate, 'NEGATIVE')).toThrow(/ROOT_CONTAINMENT:NEGATIVE/);
    }
  });

  it('requires process-only TEMP and TMP to equal the exact local R6 temp root', () => {
    expect(assertR6ProcessEnvironment({ TEMP: r6TempRoot, TMP: r6TempRoot })).toEqual({ TEMP: r6TempRoot, TMP: r6TempRoot });
    expect(() => assertR6ProcessEnvironment({ TEMP: workspaceRoot, TMP: r6TempRoot })).toThrow(/TEMP_MUST_EQUAL_R6_TEMP/);
    expect(() => assertR6ProcessEnvironment({ TEMP: r6TempRoot, TMP: r6TempRoot, npm_config_cache: path.resolve(sourceRoot, '..') })).toThrow(/npm_config_cache/);
  });

  it('contains every configured build, validation, evidence, acceptance, and recovery target', () => {
    const configured = [
      path.join(workspaceRoot, 'build', 'v1.1.0-r6'),
      path.join(workspaceRoot, 'validation', 'v1.1.0-r6'),
      path.join(workspaceRoot, 'evidence', 'v1.1.0-r6'),
      path.join(workspaceRoot, 'acceptance'),
      path.join(workspaceRoot, 'boundary-recovery'),
    ];
    for (const candidate of configured) expect(assertPathInside(hostProjectRoot, candidate, 'CONFIGURED')).toBe(path.resolve(candidate));
  });

  it('fails closed for either repository-local incident sentinel', () => {
    expect(assertIncidentRootsAbsent()).toMatchObject({ projectIncidentRootAbsent: true, externalIncidentRootAbsent: true });
    expect(() => assertIncidentRootsAbsent((candidate) => candidate === projectIncidentRoot)).toThrow(/PROJECT_INCIDENT_ROOT_PRESENT/);
    expect(() => assertIncidentRootsAbsent((candidate) => candidate === externalIncidentRoot)).toThrow(/EXTERNAL_INCIDENT_ROOT_PRESENT/);
  });

  it('ships only repository-local public build and validation entry points', () => {
    for (const relative of ['package.json', 'scripts/root-containment.mjs', 'src/main.ts', 'tests/qr-decode.test.ts']) {
      const target = path.join(sourceRoot, relative);
      expect(assertPathInside(sourceRoot, target, 'PUBLIC_FILE')).toBe(path.resolve(target));
      expect(existsSync(target)).toBe(true);
    }
  });
});
