import { MAX_EXPONENT } from './types/game';

export const SITE_URL = 'https://doblate.com';
export const SITE_NAME = 'Dóblate';

export const HOME_PATH = '/';
export const LEVELS_PATH = '/potencias-de-dos/';
export const PROGRESS_PATH = '/progreso/';

const LEVEL_PATTERN = /^\/2-elevado-a-(\d{1,3})\/$/;

export type Route =
  | { kind: 'home' }
  | { kind: 'levels' }
  | { kind: 'level'; exponent: number }
  | { kind: 'progress' }
  | { kind: 'notFound' };

export const levelPath = (exponent: number): string => `/2-elevado-a-${exponent}/`;

export const isPlayableExponent = (exponent: number): boolean =>
  Number.isInteger(exponent) && exponent >= 0 && exponent <= MAX_EXPONENT;

/** One canonical shape per page: leading slash, trailing slash, no query or hash. */
export const normalizePath = (path: string): string => {
  const withoutHash = path.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  if (!withoutQuery || withoutQuery === '/') return '/';
  const withLeading = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

export const parseRoute = (path: string): Route => {
  const normalized = normalizePath(path);

  if (normalized === HOME_PATH) return { kind: 'home' };
  if (normalized === LEVELS_PATH) return { kind: 'levels' };
  if (normalized === PROGRESS_PATH) return { kind: 'progress' };

  const match = LEVEL_PATTERN.exec(normalized);
  if (match?.[1]) {
    const exponent = Number(match[1]);
    // Reject zero-padded forms so each level keeps a single indexable URL.
    if (isPlayableExponent(exponent) && String(exponent) === match[1]) {
      return { kind: 'level', exponent };
    }
  }

  return { kind: 'notFound' };
};

export const routePath = (route: Route): string => {
  switch (route.kind) {
    case 'home':
      return HOME_PATH;
    case 'levels':
      return LEVELS_PATH;
    case 'level':
      return levelPath(route.exponent);
    case 'progress':
      return PROGRESS_PATH;
    default:
      return HOME_PATH;
  }
};

export const absoluteUrl = (path: string): string => {
  const normalized = normalizePath(path);
  return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
};

export const ALL_EXPONENTS: number[] = Array.from(
  { length: MAX_EXPONENT + 1 },
  (_, index) => index,
);

/** Pages that belong in the sitemap and should be indexed. */
export const INDEXABLE_PATHS: string[] = [
  HOME_PATH,
  LEVELS_PATH,
  ...ALL_EXPONENTS.map(levelPath),
];

/** Everything written to disk at build time, indexable or not. */
export const PRERENDER_PATHS: string[] = [...INDEXABLE_PATHS, PROGRESS_PATH];
