import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const cliDirectory = path.join(root, 'node_modules/@mermaid-js/mermaid-cli');
if (!existsSync(cliDirectory)) {
  throw new Error('Install development dependencies with npm ci before rendering diagrams.');
}
const metadata = JSON.parse(await readFile(path.join(cliDirectory, 'package.json'), 'utf8'));
const cli = path.join(cliDirectory, metadata.bin.mmdc);
const browserCandidates = [
  process.env.MERMAID_BROWSER_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
  process.env['PROGRAMFILES(X86)'] && path.join(process.env['PROGRAMFILES(X86)'], 'Microsoft/Edge/Application/msedge.exe'),
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const executablePath = browserCandidates.find(candidate => existsSync(candidate));
const cache = path.join(root, '.cache/mermaid');
await mkdir(cache, { recursive: true });
await mkdir(path.join(root, 'diagrams/exports'), { recursive: true });
const configuration = path.join(cache, 'puppeteer.json');
await writeFile(configuration, JSON.stringify(executablePath ? { executablePath } : {}));

const sources = (await readdir(path.join(root, 'diagrams/src')))
  .filter(name => name.endsWith('.mmd')).sort();
if (!sources.length) throw new Error('No Mermaid diagram sources found.');
for (const name of sources) {
  const output = name.replace(/\.mmd$/, '.svg');
  const result = spawnSync(process.execPath, [
    cli,
    '--input', path.join(root, 'diagrams/src', name),
    '--output', path.join(root, 'diagrams/exports', output),
    '--backgroundColor', 'white',
    '--size', '1800',
    '--svgId', `diagram-${name.replace(/\.mmd$/, '')}`,
    '--puppeteerConfigFile', configuration,
  ], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`Exported diagrams/exports/${output}`);
}
