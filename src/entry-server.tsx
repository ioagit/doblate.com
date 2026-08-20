import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { SITE_NAME, parseRoute } from './routes';
import { OG_IMAGE, documentTitle, metaForRoute } from './seo';

const escapeAttribute = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const meta = (attribute: 'name' | 'property', key: string, content: string): string =>
  `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;

export interface RenderResult {
  html: string;
  head: string;
}

/** Renders one route to static HTML plus the head tags that belong to it. */
export const render = (path: string): RenderResult => {
  const route = parseRoute(path);
  const pageMeta = metaForRoute(route);
  const title = documentTitle(pageMeta);

  const head = [
    `<title>${escapeAttribute(title)}</title>`,
    meta('name', 'description', pageMeta.description),
    meta('name', 'robots', pageMeta.indexable ? 'index, follow' : 'noindex, follow'),
    `<link rel="canonical" href="${escapeAttribute(pageMeta.canonical)}" />`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:locale', 'es_ES'),
    meta('property', 'og:title', title),
    meta('property', 'og:description', pageMeta.description),
    meta('property', 'og:url', pageMeta.canonical),
    meta('property', 'og:image', OG_IMAGE),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', pageMeta.description),
    meta('name', 'twitter:image', OG_IMAGE),
  ];

  if (pageMeta.jsonLd.length > 0) {
    const graph = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': pageMeta.jsonLd,
    }).replace(/</g, '\\u003c');
    head.push(
      `<script id="page-schema" type="application/ld+json">${graph}</script>`,
    );
  }

  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );

  return { html, head: head.join('\n    ') };
};
