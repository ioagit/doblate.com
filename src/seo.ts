import {
  ALL_EXPONENTS,
  LEVELS_PATH,
  PROGRESS_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  levelPath,
  type Route,
} from './routes';
import { MAX_EXPONENT } from './types/game';
import {
  exactValue,
  levelFaq,
  levelHeading,
  levelIntro,
  levelSummary,
  levelNumber,
} from './utils/levelCopy';
import { formatPowerOfTwo } from './utils/numberFormat';

export const OG_IMAGE = `${SITE_URL}/bg-space.png`;

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  indexable: boolean;
  /** Schema.org graph, serialized into a single application/ld+json block. */
  jsonLd: Record<string, unknown>[];
}

const breadcrumbs = (
  trail: { name: string; path: string }[],
): Record<string, unknown> => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const faqPage = (exponent: number): Record<string, unknown> => ({
  '@type': 'FAQPage',
  mainEntity: levelFaq(exponent).map((entry) => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: { '@type': 'Answer', text: entry.answer },
  })),
});

const levelMeta = (exponent: number): PageMeta => {
  const heading = levelHeading(exponent);
  const path = levelPath(exponent);

  return {
    title: `${heading} · 10 datos sobre esta potencia de dos`,
    description: levelSummary(exponent),
    canonical: absoluteUrl(path),
    indexable: true,
    jsonLd: [
      breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Potencias de dos', path: LEVELS_PATH },
        { name: heading, path },
      ]),
      {
        '@type': 'LearningResource',
        name: heading,
        url: absoluteUrl(path),
        inLanguage: 'es',
        description: levelIntro(exponent),
        learningResourceType: 'Ficha de número',
        educationalLevel: `Nivel ${levelNumber(exponent)}`,
        teaches: `Potencias de dos: ${formatPowerOfTwo(exponent)} es igual a ${exactValue(exponent)}`,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
      },
      faqPage(exponent),
    ],
  };
};

export const metaForRoute = (route: Route): PageMeta => {
  switch (route.kind) {
    case 'level':
      return levelMeta(route.exponent);

    case 'levels':
      return {
        title: 'Las potencias de dos del 1 al 1 073 741 824',
        description: `Tabla de las ${ALL_EXPONENTS.length} potencias de dos de 2⁰ a 2³⁰, con su valor exacto y 10 datos curiosos en la página de cada número.`,
        canonical: absoluteUrl(LEVELS_PATH),
        indexable: true,
        jsonLd: [
          breadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Potencias de dos', path: LEVELS_PATH },
          ]),
          {
            '@type': 'ItemList',
            name: 'Potencias de dos de 2⁰ a 2³⁰',
            numberOfItems: ALL_EXPONENTS.length,
            itemListElement: ALL_EXPONENTS.map((exponent) => ({
              '@type': 'ListItem',
              position: exponent + 1,
              name: levelHeading(exponent),
              url: absoluteUrl(levelPath(exponent)),
            })),
          },
        ],
      };

    case 'progress':
      return {
        title: 'Tu progreso',
        description:
          'Revisa los niveles que has completado en Dóblate y vuelve a cualquier potencia de dos.',
        canonical: absoluteUrl(PROGRESS_PATH),
        indexable: false,
        jsonLd: [],
      };

    case 'notFound':
      return {
        title: 'Página no encontrada',
        description:
          'Esta página no existe. Vuelve al inicio de Dóblate o consulta la tabla de potencias de dos.',
        canonical: absoluteUrl('/'),
        indexable: false,
        jsonLd: [],
      };

    default:
      return {
        title: 'Dóblate — el juego de duplicar potencias de dos',
        description: `Un juego educativo sobre el crecimiento exponencial: ${ALL_EXPONENTS.length} niveles, del 1 a 2³⁰, cada uno con 10 datos curiosos sobre su número.`,
        canonical: absoluteUrl('/'),
        indexable: true,
        jsonLd: [
          {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            inLanguage: 'es',
            description:
              'Juego educativo sobre potencias de dos y crecimiento exponencial.',
          },
          {
            '@type': 'Game',
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            inLanguage: 'es',
            genre: 'Educativo',
            numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
            gameItem: {
              '@type': 'Thing',
              name: `Potencias de dos de 1 a ${exactValue(MAX_EXPONENT)}`,
            },
          },
        ],
      };
  }
};

/** Title as it appears in the browser tab: pages already carry their own topic. */
export const documentTitle = (meta: PageMeta): string =>
  meta.title.startsWith(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`;
