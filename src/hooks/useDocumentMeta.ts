import { useEffect } from 'react';
import { documentTitle, OG_IMAGE, type PageMeta } from '../seo';
import { SITE_NAME } from '../routes';

const JSON_LD_ID = 'page-schema';

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
};

const upsertJsonLd = (graph: Record<string, unknown>[]) => {
  const existing = document.getElementById(JSON_LD_ID);
  if (graph.length === 0) {
    existing?.remove();
    return;
  }
  const script = existing ?? document.createElement('script');
  script.id = JSON_LD_ID;
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
  if (!existing) document.head.appendChild(script);
};

/** Keeps the head in sync when the player navigates without a page load. */
export const useDocumentMeta = (meta: PageMeta) => {
  useEffect(() => {
    const title = documentTitle(meta);
    document.title = title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.indexable ? 'index, follow' : 'noindex, follow');
    upsertCanonical(meta.canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'es_ES');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', meta.canonical);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
    upsertJsonLd(meta.jsonLd);
  }, [meta]);
};
