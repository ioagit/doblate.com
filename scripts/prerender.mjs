/**
 * Writes one static HTML file per route after the client build, so every level
 * is a real document that crawlers can read without running JavaScript.
 * The same bundle then hydrates in place and the site behaves like an app.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');

const templatePath = path.join(distDir, 'index.html');
const template = await readFile(templatePath, 'utf8');

for (const placeholder of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(placeholder)) {
    throw new Error(`index.html no contiene ${placeholder}`);
  }
}

const vite = await createServer({
  root,
  logLevel: 'warn',
  appType: 'custom',
  server: { middlewareMode: true },
});

const buildPage = (head, html) =>
  template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

const fileForPath = (route) =>
  route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\/|\/$/g, ''), 'index.html');

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const { PRERENDER_PATHS, INDEXABLE_PATHS, absoluteUrl } =
    await vite.ssrLoadModule('/src/routes.ts');

  for (const route of PRERENDER_PATHS) {
    const { html, head } = render(route);
    const file = fileForPath(route);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, buildPage(head, html), 'utf8');
  }

  // Static hosts serve this file for unknown paths.
  const notFound = render('/pagina-que-no-existe/');
  await writeFile(
    path.join(distDir, '404.html'),
    buildPage(notFound.head, notFound.html),
    'utf8',
  );

  const lastmod = new Date().toISOString().slice(0, 10);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...INDEXABLE_PATHS.map(
      (route) =>
        `  <url><loc>${absoluteUrl(route)}</loc><lastmod>${lastmod}</lastmod></url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');

  console.log(
    `Prerender listo: ${PRERENDER_PATHS.length} páginas, 404.html y sitemap.xml con ${INDEXABLE_PATHS.length} URLs.`,
  );
} finally {
  await vite.close();
}
