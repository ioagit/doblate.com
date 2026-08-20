import { describe, expect, it } from 'vitest';
import {
  ALL_EXPONENTS,
  INDEXABLE_PATHS,
  LEVELS_PATH,
  PRERENDER_PATHS,
  PROGRESS_PATH,
  absoluteUrl,
  levelPath,
  normalizePath,
  parseRoute,
  routePath,
} from '../routes';
import { MAX_EXPONENT } from '../types/game';

describe('routes', () => {
  it('builds one path per playable level', () => {
    expect(levelPath(0)).toBe('/2-elevado-a-0/');
    expect(levelPath(17)).toBe('/2-elevado-a-17/');
    expect(ALL_EXPONENTS).toHaveLength(MAX_EXPONENT + 1);
  });

  it('parses the site routes', () => {
    expect(parseRoute('/')).toEqual({ kind: 'home' });
    expect(parseRoute(LEVELS_PATH)).toEqual({ kind: 'levels' });
    expect(parseRoute(PROGRESS_PATH)).toEqual({ kind: 'progress' });
    expect(parseRoute('/2-elevado-a-30/')).toEqual({ kind: 'level', exponent: 30 });
  });

  it('accepts paths with or without the trailing slash', () => {
    expect(parseRoute('/2-elevado-a-5')).toEqual({ kind: 'level', exponent: 5 });
    expect(normalizePath('/2-elevado-a-5?utm=x#datos')).toBe('/2-elevado-a-5/');
  });

  it('rejects levels outside the playable range and padded duplicates', () => {
    expect(parseRoute(levelPath(MAX_EXPONENT + 1))).toEqual({ kind: 'notFound' });
    expect(parseRoute('/2-elevado-a-07/')).toEqual({ kind: 'notFound' });
    expect(parseRoute('/2-elevado-a--1/')).toEqual({ kind: 'notFound' });
    expect(parseRoute('/otra-cosa/')).toEqual({ kind: 'notFound' });
  });

  it('round-trips route to path', () => {
    for (const exponent of ALL_EXPONENTS) {
      const path = levelPath(exponent);
      expect(routePath(parseRoute(path))).toBe(path);
    }
  });

  it('lists every level in the indexable set and none twice', () => {
    expect(INDEXABLE_PATHS).toHaveLength(ALL_EXPONENTS.length + 2);
    expect(new Set(INDEXABLE_PATHS).size).toBe(INDEXABLE_PATHS.length);
    expect(INDEXABLE_PATHS).not.toContain(PROGRESS_PATH);
    expect(PRERENDER_PATHS).toContain(PROGRESS_PATH);
  });

  it('builds absolute canonical urls', () => {
    expect(absoluteUrl('/')).toBe('https://doblate.com/');
    expect(absoluteUrl(levelPath(3))).toBe('https://doblate.com/2-elevado-a-3/');
  });
});
