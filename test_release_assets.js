import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { APP_RELEASE } from './release-info.js';

const prefix = `/releases/${APP_RELEASE}/`;
const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('./sw.js', import.meta.url), 'utf8');
const manifest = JSON.parse(fs.readFileSync(new URL(`./releases/${APP_RELEASE}/release.json`, import.meta.url)));
assert.equal(manifest.version, APP_RELEASE);
for (const [name, hash] of Object.entries(manifest.hashes)) {
  const shipped = fs.readFileSync(new URL(`.${prefix}${name}`, import.meta.url));
  assert.equal(createHash('sha256').update(shipped).digest('hex'), hash, `${name}: release hash mismatch`);
  assert(shipped.equals(fs.readFileSync(new URL(`./${name}`, import.meta.url))), `${name}: root and release differ. Bump APP_RELEASE and rebuild.`);
  if (name.endsWith('.js')) {
    for (const match of shipped.toString().matchAll(/(?:from\s+|import\s*)['"]\.\/([^'"]+)['"]/g)) {
      assert(manifest.hashes[match[1]], `Missing release dependency: ${match[1]}`);
    }
  }
  assert(sw.includes(prefix + name), `Offline shell misses ${name}`);
}
assert(html.includes(`content="${APP_RELEASE}"`));
for (const name of ['app.js','components.js','store.js','styles.css']) assert(html.includes(prefix + name));
assert(!/src="\.\/app\.js"/.test(html));
assert(sw.includes("fetch(request, { cache: 'no-store' })"));
assert(sw.includes('caches.open(CACHE_NAME).then(async cache =>'));
const hostedHtml = fs.readFileSync(new URL('./backend/wwwroot/app/index.html', import.meta.url), 'utf8');
assert(hostedHtml.includes('window.SAHA_ANKET_API_URL = "/api"'));
assert(hostedHtml.includes("register('/app/sw.js', { scope: '/app/'"));
assert(hostedHtml.includes("manifest.href = '/app/manifest.json'"));
const hostedManifest = JSON.parse(fs.readFileSync(new URL('./backend/wwwroot/app/manifest.json', import.meta.url)));
assert.equal(hostedManifest.start_url, '/app/');
assert.equal(hostedManifest.scope, '/app/');
const hostedSw = fs.readFileSync(new URL('./backend/wwwroot/app/sw.js', import.meta.url), 'utf8');
for (const asset of JSON.parse(hostedSw.match(/const APP_SHELL = (\[[\s\S]*?\]);/)[1])) {
  const file = asset.endsWith('/') ? asset + 'index.html' : asset;
  assert(fs.existsSync(new URL('./backend/wwwroot' + file, import.meta.url)), `API host shell misses ${asset}`);
}
for (const [name, hash] of Object.entries(manifest.hashes)) {
  const bytes = fs.readFileSync(new URL(`./backend/wwwroot${prefix}${name}`, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), hash);
}
console.log(`Release ${APP_RELEASE} verified: frozen module graph, matching hashes, versioned entry points and isolated offline cache.`);
