import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { assertPathInside, resolveInsideProject, workspaceRoot } from './root-containment.mjs';

const sources = [
  {
    source: resolveInsideProject(path.join(workspaceRoot, 'build', 'v1.1.0-r6', 'single', 'index.html'), 'ACCEPTANCE_WEB_SOURCE'),
    name: 'VoxelQR-Studio-Web.html',
    minimumBytes: 100_000,
  },
  {
    source: resolveInsideProject(path.join(workspaceRoot, 'build', 'v1.1.0-r6', 'windows', 'VoxelQR-Studio.exe'), 'ACCEPTANCE_WINDOWS_SOURCE'),
    name: 'VoxelQR-Studio.exe',
    minimumBytes: 10_000_000,
  },
];
const targetDirectory = resolveInsideProject(path.join(workspaceRoot, 'acceptance'), 'ACCEPTANCE_DIRECTORY');
await mkdir(targetDirectory, { recursive: true });
const outputs = [];
for (const entry of sources) {
  const target = assertPathInside(targetDirectory, path.join(targetDirectory, entry.name), 'ACCEPTANCE_TARGET');
  await copyFile(entry.source, target);
  const metadata = await stat(target);
  if (metadata.size < entry.minimumBytes) throw new Error(`ACCEPTANCE_ARTIFACT_TOO_SMALL:${entry.name}:${metadata.size}`);
  outputs.push({ path: target, bytes: metadata.size });
}
console.log(JSON.stringify({ ACCEPTANCE_BUILD_GATE: 'BUILT', outputs }, null, 2));
