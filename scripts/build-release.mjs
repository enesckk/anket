import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { APP_RELEASE } from '../release-info.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = ['app.js', 'components.js', 'store.js', 'pwa-policy.js', 'survey-report.js', 'report-xlsx.js', 'release-info.js', 'styles.css'];
const folder = path.join(root, 'releases', APP_RELEASE);
await fs.mkdir(folder, { recursive: true });
const hashes = {};
const contents = {};
for (const name of assets) {
  const bytes = await fs.readFile(path.join(root, name));
  contents[name] = bytes;
  hashes[name] = createHash('sha256').update(bytes).digest('hex');
}
const previous = await fs.readFile(path.join(folder, 'release.json'), 'utf8').then(JSON.parse).catch(error => {
  if (error.code === 'ENOENT') return null;
  throw error;
});
if (previous && JSON.stringify(previous.hashes) !== JSON.stringify(hashes)) throw new Error('Yayınlanan sürüm değiştirilemez. Önce release-info.js içindeki APP_RELEASE değerini artırın.');
for (const name of assets) await fs.writeFile(path.join(folder, name), contents[name]);
await fs.writeFile(path.join(folder, 'release.json'), JSON.stringify({ version: APP_RELEASE, hashes }, null, 2) + '\n');
let html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
html = html.replace(/(?:\.\/|\/releases\/[^/]+\/)(app\.js|components\.js|store\.js|styles\.css)/g, `/releases/${APP_RELEASE}/$1`);
html = html.replace(/<meta name="app-release" content="[^"]*"\/>/, `<meta name="app-release" content="${APP_RELEASE}"/>`);
await fs.writeFile(path.join(root, 'index.html'), html);
let sw = await fs.readFile(path.join(root, 'sw.js'), 'utf8');
sw = sw.replace(/const CACHE_NAME = '[^']+';/, `const CACHE_NAME = 'sahaanket-${APP_RELEASE}';`);
sw = sw.replace(/const APP_SHELL = \[[\s\S]*?\];/, `const APP_SHELL = ${JSON.stringify(['/', '/index.html', ...assets.map(name => `/releases/${APP_RELEASE}/${name}`), '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'], null, 2)};`);
await fs.writeFile(path.join(root, 'sw.js'), sw);
console.log(`Built release ${APP_RELEASE}: ${assets.length} isolated assets.`);
