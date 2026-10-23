import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(path.join(root, name), 'utf8');
const normalize = text => text.replace(/\r\n/g, '\n').trim();

async function markdownFiles(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    if (entry.isDirectory() && ['node_modules', 'dist', 'build', 'target', 'coverage', '.venv'].includes(entry.name)) return [];
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(name) : name.endsWith('.md') ? [name] : [];
  }));
  return files.flat();
}

test('docs contains only Markdown files and covers all ten numbered documents', async () => {
  const entries = await readdir(path.join(root, 'docs'), { withFileTypes: true });
  assert.ok(entries.every(entry => entry.isFile() && entry.name.endsWith('.md')));
  for (let number = 1; number <= 10; number++) {
    const prefix = `${String(number).padStart(2, '0')}-`;
    assert.equal(entries.filter(entry => entry.name.startsWith(prefix)).length, 1, prefix);
  }
});

test('local Markdown links resolve', async () => {
  const files = ['readme.md', ...await markdownFiles('docs'),
    ...await markdownFiles('diagrams'), ...await markdownFiles('frontend'),
    ...await markdownFiles('backend'), ...await markdownFiles('analysis'),
    ...await markdownFiles('config'), ...await markdownFiles('tests')];
  for (const file of files) {
    for (const match of (await read(file)).matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
      await assert.doesNotReject(access(path.resolve(root, path.dirname(file), target)),
        `${file}: ${target}`);
    }
  }
});

test('editable diagrams match the architecture and have readable SVG exports', async () => {
  const architecture = await read('docs/07-architecture.md');
  const blocks = [...architecture.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)];
  const sources = (await readdir(path.join(root, 'diagrams/src')))
    .filter(name => name.endsWith('.mmd')).sort();
  assert.equal(sources.length, 3);
  assert.equal(blocks.length, sources.length);
  for (const [index, name] of sources.entries()) {
    assert.equal(normalize(await read(`diagrams/src/${name}`)), normalize(blocks[index][1]), name);
    const svg = await read(`diagrams/exports/${name.replace(/\.mmd$/, '.svg')}`);
    assert.match(svg, /<svg\b/);
    assert.match(svg, /viewBox=/);
    assert.match(svg, /<text\b|<foreignObject\b/);
  }
});

test('git ignores local secrets, datasets, and generated caches but keeps examples', async () => {
  const cases = JSON.parse(await read('tests/fixtures/ignore-cases.json'));
  const paths = [...cases.ignored, ...cases.visible];
  const output = execFileSync('git', ['check-ignore', '--no-index', '--stdin'], {
    cwd: root, input: `${paths.join('\n')}\n`, encoding: 'utf8',
  });
  const ignored = new Set(output.trim().split(/\r?\n/));
  for (const name of cases.ignored) assert.ok(ignored.has(name), `${name} should be ignored`);
  for (const name of cases.visible) assert.ok(!ignored.has(name), `${name} should be visible`);
});
