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
// Publish the same public application with the existing API host as well.
const webroot = path.join(root, 'backend', 'wwwroot');
const appFolder = path.join(webroot, 'app');
await fs.mkdir(appFolder, { recursive: true });
await fs.mkdir(path.join(webroot, 'releases', APP_RELEASE), { recursive: true });
for (const name of [...assets, 'release.json']) {
  await fs.copyFile(path.join(folder, name), path.join(webroot, 'releases', APP_RELEASE, name));
}
await fs.cp(path.join(root, 'icons'), path.join(webroot, 'icons'), { recursive: true });
for (const name of ['logo_sehitkamil.png', 'logo_saha_anket.png']) {
  await fs.copyFile(path.join(root, name), path.join(appFolder, name));
  await fs.copyFile(path.join(root, name), path.join(webroot, name));
}
const hostedHtml = html
  .replace('<head>', '<head>\n  <script>window.SAHA_ANKET_API_URL = "/api";</script>')
  .replace("manifest.href = '/manifest.json'", "manifest.href = '/app/manifest.json'")
  .replace("register('/sw.js', { scope: '/'", "register('/app/sw.js', { scope: '/app/'");
await fs.writeFile(path.join(appFolder, 'index.html'), hostedHtml);
const hostedManifest = JSON.parse(await fs.readFile(path.join(root, 'manifest.json'), 'utf8'));
hostedManifest.id = '/app/';
hostedManifest.start_url = '/app/';
hostedManifest.scope = '/app/';
for (const shortcut of hostedManifest.shortcuts || []) shortcut.url = shortcut.url.replace(/^\//, '/app/');
await fs.writeFile(path.join(appFolder, 'manifest.json'), JSON.stringify(hostedManifest, null, 2) + '\n');
const hostedSw = sw.replaceAll("'/index.html'", "'/app/index.html'")
  .replaceAll('"/index.html"', '"/app/index.html"')
  .replace('  "/",', '  "/app/",')
  .replace('"/manifest.json"', '"/app/manifest.json"');
await fs.writeFile(path.join(appFolder, 'sw.js'), hostedSw);
console.log(`Built release ${APP_RELEASE}: ${assets.length} isolated assets.`);
