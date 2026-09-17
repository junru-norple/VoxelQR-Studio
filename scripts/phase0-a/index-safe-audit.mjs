import { spawnSync } from 'node:child_process';
import { copyFile, lstat, mkdir, mkdtemp, readFile, readlink, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assert, fileFingerprint } from './common.mjs';

const SAFE_GIT_COMMANDS = new Set(['rev-parse', 'ls-tree', 'ls-files', 'cat-file']);
const RISKY_PROCESS_NAMES = new Set([
  'code', 'code.exe', 'githubdesktop', 'githubdesktop.exe', 'gitkraken', 'gitkraken.exe',
  'sourcetree', 'sourcetree.exe', 'devenv', 'devenv.exe', 'git', 'git.exe',
]);

function runGit(repository, args, extraEnvironment = {}) {
  assert(args.length > 0 && SAFE_GIT_COMMANDS.has(args[0]), `INDEX_AUDIT:PROHIBITED_GIT_COMMAND:${args[0] ?? 'missing'}`);
  const result = spawnSync('git', args, {
    cwd: repository,
    env: {
      ...process.env,
      GIT_OPTIONAL_LOCKS: '0',
      GIT_TERMINAL_PROMPT: '0',
      GCM_INTERACTIVE: 'Never',
      ...extraEnvironment,
    },
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true,
  });
  assert(!result.error, `INDEX_AUDIT:GIT_LAUNCH:${result.error?.message}`);
  assert(result.status === 0, `INDEX_AUDIT:GIT_${args[0]}:${result.stderr?.toString('utf8').trim()}`);
  return result.stdout;
}

async function resolveGitDirectory(repository) {
  const dotGit = path.join(repository, '.git');
  const metadata = await lstat(dotGit);
  if (metadata.isDirectory()) return dotGit;
  assert(metadata.isFile(), 'INDEX_AUDIT:DOT_GIT_UNSUPPORTED');
  const value = (await readFile(dotGit, 'utf8')).trim();
  const match = /^gitdir:\s*(.+)$/iu.exec(value);
  assert(match, 'INDEX_AUDIT:GITDIR_FILE_MALFORMED');
  return path.resolve(repository, match[1]);
}

function parseHeadTree(buffer) {
  const entries = new Map();
  for (const record of buffer.toString('utf8').split('\0').filter(Boolean)) {
    const match = /^(\d+)\s+(\S+)\s+([a-f0-9]+)\t([\s\S]+)$/u.exec(record);
    assert(match, `INDEX_AUDIT:LS_TREE_RECORD:${record}`);
    entries.set(match[4], { mode: match[1], type: match[2], objectId: match[3] });
  }
  return entries;
}

function parseIndex(buffer) {
  const entries = new Map();
  for (const record of buffer.toString('utf8').split('\0').filter(Boolean)) {
    const match = /^(\d+)\s+([a-f0-9]+)\s+(\d+)\t([\s\S]+)$/u.exec(record);
    assert(match, `INDEX_AUDIT:LS_FILES_RECORD:${record}`);
    const pathName = match[4];
    if (!entries.has(pathName)) entries.set(pathName, []);
    entries.get(pathName).push({ mode: match[1], objectId: match[2], stage: Number(match[3]) });
  }
  return entries;
}

async function listWorktreeFiles(repository) {
  const files = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (directory === repository && entry.name === '.git') continue;
      const absolute = path.join(directory, entry.name);
      const relative = path.relative(repository, absolute).split(path.sep).join('/');
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile() || entry.isSymbolicLink()) files.push(relative);
    }
  }
  await visit(repository);
  return files.sort((first, second) => first.localeCompare(second, 'en'));
}

async function worktreeBytes(repository, relativePath) {
  const absolute = path.join(repository, ...relativePath.split('/'));
  const metadata = await lstat(absolute);
  if (metadata.isSymbolicLink()) return Buffer.from(await readlink(absolute), 'utf8');
  return readFile(absolute);
}

export function detectConcurrentGitTools() {
  const command = process.platform === 'win32' ? 'tasklist' : 'ps';
  const args = process.platform === 'win32' ? ['/fo', 'csv', '/nh'] : ['-A', '-o', 'comm='];
  const result = spawnSync(command, args, { encoding: 'utf8', windowsHide: true, maxBuffer: 4 * 1024 * 1024 });
  if (result.error || result.status !== 0) return { status: 'unknown', matches: [], detail: result.error?.message ?? result.stderr?.trim() ?? 'process-list-failed' };
  const matches = [];
  for (const line of result.stdout.split(/\r?\n/u).filter(Boolean)) {
    const image = process.platform === 'win32' ? line.match(/^"([^"]+)"/u)?.[1] : path.basename(line.trim());
    if (image && RISKY_PROCESS_NAMES.has(image.toLowerCase())) matches.push(image);
  }
  return { status: 'known', matches: [...new Set(matches)].sort(), detail: null };
}

function compareSemanticTrees(headEntries, indexEntries) {
  const changed = new Set();
  const nonStageZero = [];
  const allPaths = new Set([...headEntries.keys(), ...indexEntries.keys()]);
  for (const pathName of allPaths) {
    const head = headEntries.get(pathName);
    const index = indexEntries.get(pathName) ?? [];
    if (index.some((entry) => entry.stage !== 0)) nonStageZero.push(pathName);
    const stageZero = index.find((entry) => entry.stage === 0);
    if (!head || !stageZero || head.mode !== stageZero.mode || head.objectId !== stageZero.objectId || index.length !== 1) changed.add(pathName);
  }
  return { changedPaths: [...changed].sort(), nonStageZero: [...new Set(nonStageZero)].sort() };
}

export async function auditIndexSafe(repository, {
  strict = true,
  temporaryRoot,
  processDetector = detectConcurrentGitTools,
  simulateIndexMutation = undefined,
} = {}) {
  const resolvedRepository = path.resolve(repository);
  const gitDirectory = await resolveGitDirectory(resolvedRepository);
  const indexPath = path.join(gitDirectory, 'index');
  assert(typeof temporaryRoot === 'string' && temporaryRoot.length > 0, 'INDEX_AUDIT:TEMP_ROOT_REQUIRED');
  const resolvedTemporaryRoot = path.resolve(temporaryRoot);
  assert(!resolvedTemporaryRoot.startsWith(`${resolvedRepository}${path.sep}`), 'INDEX_AUDIT:TEMP_ROOT_INSIDE_AUDITED_REPOSITORY');

  const baseline = (await fileFingerprint(indexPath)).sha256;
  const checkpoints = [{ phase: 'before', sha256: baseline }];
  async function checkpoint(phase) {
    const current = (await fileFingerprint(indexPath)).sha256;
    checkpoints.push({ phase, sha256: current });
    assert(current === baseline, `INDEX_AUDIT:INDEX_BYTES_CHANGED:${phase}:${baseline}:${current}`);
  }

  const concurrentProcesses = processDetector();
  await checkpoint('after-process-risk-check');
  if (strict) {
    assert(concurrentProcesses.status === 'known', `INDEX_AUDIT:CONCURRENT_PROCESS_STATE_UNKNOWN:${concurrentProcesses.detail}`);
    assert(concurrentProcesses.matches.length === 0, `INDEX_AUDIT:CONCURRENT_GIT_TOOLS:${concurrentProcesses.matches.join(',')}`);
  }

  await mkdir(resolvedTemporaryRoot, { recursive: true });
  const temporaryDirectory = await mkdtemp(path.join(resolvedTemporaryRoot, 'audit-'));
  const temporaryIndex = path.join(temporaryDirectory, 'index');
  let report;
  try {
    await copyFile(indexPath, temporaryIndex);
    await checkpoint('after-temporary-index-copy');
    const temporaryEnvironment = { GIT_INDEX_FILE: temporaryIndex };
    const head = runGit(resolvedRepository, ['rev-parse', '--verify', 'HEAD']).toString('utf8').trim();
    await checkpoint('after-rev-parse');
    const headEntries = parseHeadTree(runGit(resolvedRepository, ['ls-tree', '-r', '-z', '--full-tree', 'HEAD']));
    await checkpoint('after-ls-tree');
    const indexEntries = parseIndex(runGit(resolvedRepository, ['ls-files', '--stage', '-z'], temporaryEnvironment));
    await checkpoint('after-ls-files-temporary-index');
    const semantic = compareSemanticTrees(headEntries, indexEntries);

    if (simulateIndexMutation) await simulateIndexMutation(indexPath);
    await checkpoint('before-worktree-byte-comparison');

    const worktreePaths = await listWorktreeFiles(resolvedRepository);
    const worktreeSet = new Set(worktreePaths);
    const modified = [];
    const deleted = [];
    for (const [pathName, entry] of indexEntries) {
      const stageZero = entry.find((candidate) => candidate.stage === 0);
      if (!stageZero) continue;
      if (!worktreeSet.has(pathName)) {
        deleted.push(pathName);
        continue;
      }
      const working = await worktreeBytes(resolvedRepository, pathName);
      const blob = runGit(resolvedRepository, ['cat-file', 'blob', stageZero.objectId]);
      if (!working.equals(blob)) modified.push(pathName);
    }
    const untracked = worktreePaths.filter((pathName) => !indexEntries.has(pathName));
    await checkpoint('after-worktree-byte-comparison');
    report = {
      status: 'PASS',
      method: 'temporary-index-plus-read-only-plumbing-and-direct-bytes',
      optionalLocksDisabled: true,
      porcelainUsed: false,
      head,
      concurrentProcessCheck: concurrentProcesses,
      indexSha256: { before: baseline, during: checkpoints.map((entry) => entry.sha256), after: null },
      indexStable: true,
      indexSemanticTreeEqualsHead: semantic.changedPaths.length === 0 && semantic.nonStageZero.length === 0,
      stagedChangeCount: semantic.changedPaths.length,
      stagedPaths: semantic.changedPaths,
      nonStageZeroPaths: semantic.nonStageZero,
      worktree: { modified, deleted, untracked },
    };
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
  await checkpoint('after-temporary-cleanup');
  const finalHash = (await fileFingerprint(indexPath)).sha256;
  checkpoints.push({ phase: 'final', sha256: finalHash });
  assert(finalHash === baseline, `INDEX_AUDIT:INDEX_BYTES_CHANGED:final:${baseline}:${finalHash}`);
  report.indexSha256.after = finalHash;
  report.checkpoints = checkpoints;
  return report;
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const repository = argument('--repo');
  const temporaryRoot = argument('--temp-root');
  assert(repository, 'INDEX_AUDIT_CLI:--repo_REQUIRED');
  assert(temporaryRoot, 'INDEX_AUDIT_CLI:--temp-root_REQUIRED');
  const report = await auditIndexSafe(repository, {
    strict: process.argv.includes('--strict'),
    temporaryRoot,
  });
  console.log(JSON.stringify(report, null, 2));
}
