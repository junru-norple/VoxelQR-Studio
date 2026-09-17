import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readJson } from './common.mjs';
import { validateAcceptanceManifest } from './acceptance-status.mjs';
import { validatePublicAndLocaleContracts } from './public-contracts.mjs';
import { parseAndValidateStatusDocument } from './acceptance-status.mjs';
import { readFile } from 'node:fs/promises';

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export async function validateCandidate(root) {
  const fixtureRoot = path.join(root, 'tests', 'fixtures', 'phase0-a');
  const acceptance = await readJson(path.join(fixtureRoot, 'acceptance.valid.json'));
  const statusJson = await readFile(path.join(fixtureRoot, 'status.valid.json'), 'utf8');
  const statusMarkdown = await readFile(path.join(fixtureRoot, 'status.valid.md'), 'utf8');
  return {
    schemaVersion: '1.0.0',
    publicContracts: await validatePublicAndLocaleContracts(root),
    acceptanceManifest: await validateAcceptanceManifest(acceptance, { artifactRoot: fixtureRoot, expectedProductVersion: 'v9.9.9' }),
    statusJson: parseAndValidateStatusDocument(statusJson, 'json'),
    statusMarkdown: parseAndValidateStatusDocument(statusMarkdown, 'markdown'),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = path.resolve(argument('--root') ?? process.cwd());
  console.log(JSON.stringify(await validateCandidate(root), null, 2));
}
