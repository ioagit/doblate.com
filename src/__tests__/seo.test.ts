import { describe, expect, it } from 'vitest';
import { ALL_EXPONENTS, levelPath, parseRoute } from '../routes';
import { documentTitle, metaForRoute } from '../seo';
import { levelFaq, levelIntro } from '../utils/levelCopy';

const levelMetas = ALL_EXPONENTS.map((exponent) =>
  metaForRoute({ kind: 'level', exponent }),
);

describe('page metadata', () => {
  it('gives every level a unique title, description and canonical', () => {
    expect(new Set(levelMetas.map((meta) => meta.title)).size).toBe(
      ALL_EXPONENTS.length,
    );
    expect(new Set(levelMetas.map((meta) => meta.description)).size).toBe(
      ALL_EXPONENTS.length,
    );
    expect(new Set(levelMetas.map((meta) => meta.canonical)).size).toBe(
      ALL_EXPONENTS.length,
    );
  });

  it('keeps titles and descriptions within search result limits', () => {
    for (const meta of levelMetas) {
      expect(documentTitle(meta).length).toBeLessThanOrEqual(70);
      expect(meta.description.length).toBeLessThanOrEqual(165);
      expect(meta.description.length).toBeGreaterThan(50);
    }
  });

  it('points the canonical url at the level page itself', () => {
    for (const exponent of ALL_EXPONENTS) {
      const meta = metaForRoute({ kind: 'level', exponent });
      expect(meta.canonical.endsWith(levelPath(exponent))).toBe(true);
      expect(meta.indexable).toBe(true);
    }
  });

  it('answers the search intent of each level in its FAQ', () => {
    const faq = levelFaq(17);
    expect(faq[0]?.question).toBe('¿Cuánto es 2 elevado a 17?');
    expect(faq[0]?.answer).toContain('131.072');
    expect(levelIntro(17)).toContain('131.072');
  });

  it('ships breadcrumbs and FAQ structured data on level pages', () => {
    const types = metaForRoute(parseRoute(levelPath(10))).jsonLd.map(
      (node) => node['@type'],
    );
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(types).toContain('LearningResource');
  });

  it('keeps the progress screen out of the index', () => {
    expect(metaForRoute({ kind: 'progress' }).indexable).toBe(false);
    expect(metaForRoute({ kind: 'notFound' }).indexable).toBe(false);
  });
});
