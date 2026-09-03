import { existsSync } from 'node:fs';
import path from 'node:path';

export const sourceRoot = path.resolve(import.meta.dirname, '..');
export const workspaceRoot = path.join(sourceRoot, '_workspace');
export const hostProjectRoot = sourceRoot;
export const r6TempRoot = path.join(workspaceRoot, 'tmp', 'r6');
export const projectIncidentRoot = path.join(workspaceRoot, 'boundary-incidents', 'project-root');
export const externalIncidentRoot = path.join(workspaceRoot, 'boundary-incidents', 'external-root');

function samePath(first, second) {
  const left = path.resolve(first);
  const right = path.resolve(second);
  return process.platform === 'win32'
    ? left.localeCompare(right, undefined, { sensitivity: 'accent' }) === 0
    : left === right;
}

export function isPathInside(root, candidate, { allowRoot = false } = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);
  const relative = path.relative(resolvedRoot, resolvedCandidate);
  if (relative === '') return allowRoot;
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

export function assertPathInside(root, candidate, purpose, options) {
  const resolved = path.resolve(candidate);
  if (!isPathInside(root, resolved, options)) throw new Error(`ROOT_CONTAINMENT:${purpose}:${resolved}`);
  return resolved;
}

export function resolveInsideProject(candidate, purpose, options) {
  return assertPathInside(hostProjectRoot, candidate, purpose, options);
}

export function assertR6ProcessEnvironment(environment = process.env) {
  const observed = {};
  for (const key of ['TEMP', 'TMP']) {
    const value = environment[key];
    if (!value) throw new Error(`ROOT_CONTAINMENT:${key}_MISSING`);
    const resolved = path.resolve(value);
    if (!samePath(resolved, r6TempRoot)) throw new Error(`ROOT_CONTAINMENT:${key}_MUST_EQUAL_R6_TEMP:${resolved}`);
    observed[key] = resolved;
  }
  for (const key of ['npm_config_cache', 'ELECTRON_BUILDER_CACHE', 'PLAYWRIGHT_BROWSERS_PATH']) {
    const value = environment[key];
    if (!value || value === '0') continue;
    observed[key] = resolveInsideProject(value, key);
  }
  return observed;
}

export const assertR5ProcessEnvironment = assertR6ProcessEnvironment;
export const r5TempRoot = r6TempRoot;

export function assertIncidentRootsAbsent(exists = existsSync) {
  const observed = {
    projectIncidentRoot,
    externalIncidentRoot,
    projectIncidentRootAbsent: !exists(projectIncidentRoot),
    externalIncidentRootAbsent: !exists(externalIncidentRoot),
  };
  if (!observed.projectIncidentRootAbsent) throw new Error(`ROOT_CONTAINMENT:PROJECT_INCIDENT_ROOT_PRESENT:${projectIncidentRoot}`);
  if (!observed.externalIncidentRootAbsent) throw new Error(`ROOT_CONTAINMENT:EXTERNAL_INCIDENT_ROOT_PRESENT:${externalIncidentRoot}`);
  return observed;
}
