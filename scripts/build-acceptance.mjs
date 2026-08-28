import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const source = path.join(projectRoot, '_workspace', 'build', 'single', 'index.html');
const targetDirectory = path.join(projectRoot, '_workspace', 'acceptance', 'final');
const target = path.join(targetDirectory, 'VoxelQR-Studio-Web.html');

await mkdir(targetDirectory, { recursive: true });
await copyFile(source, target);
const metadata = await stat(target);
if (metadata.size < 100_000) throw new Error(`ACCEPTANCE_HTML_TOO_SMALL:${metadata.size}`);

console.log(JSON.stringify({
  ACCEPTANCE_SINGLE_HTML_GATE: 'BUILT',
  path: target,
  bytes: metadata.size,
}, null, 2));
