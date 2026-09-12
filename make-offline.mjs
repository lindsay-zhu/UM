import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('./dist/index.html', import.meta.url);
const html = await readFile(output, 'utf8');
// Keep the bundled script deferred so it runs after the body has created #root.
// Converting a module script to a synchronous head script causes React error #299.
// The single-file plugin places the bundled script in <head>. Inline classic
// scripts ignore the `defer` attribute, so move the bundle after #root exists.
const scriptMatch = html.match(/<script[^>]*>[\s\S]*?<\/script>/i);
if (!scriptMatch) throw new Error('Bundled app script not found in generated HTML');
const offlineHtml = html
  .replace(scriptMatch[0], '')
  .replace('</body>', `${scriptMatch[0]}</body>`);

if (offlineHtml === html) {
  throw new Error('Could not find the generated module script to convert.');
}

await writeFile(output, offlineHtml, 'utf8');
console.log('Converted dist/index.html for direct offline opening.');
