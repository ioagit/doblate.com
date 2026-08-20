import { MAX_EXPONENT } from '../types/game';
import { powerOfTwo } from './bigIntMath';
import {
  formatLevelNumber,
  formatPowerOfTwo,
  formatSpanishInteger,
} from './numberFormat';
import { pluralize } from './spanish';

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Players count levels from 1, exponents start at 0. */
export const levelNumber = (exponent: number): string => String(exponent + 1);

export const exactValue = (exponent: number): string =>
  formatSpanishInteger(powerOfTwo(exponent));

/** Plain-language heading, also used as the accessible name of the page. */
export const levelHeading = (exponent: number): string =>
  `${formatPowerOfTwo(exponent)} = ${exactValue(exponent)}`;

/**
 * Two or three sentences of copy that exist only on this level's page.
 * Everything derives from the exponent, so no two pages read the same.
 */
export const levelIntro = (exponent: number): string => {
  const power = formatPowerOfTwo(exponent);
  const value = exactValue(exponent);
  const { digits } = formatLevelNumber(exponent);
  const digitLabel = pluralize(digits, 'dígito', 'dígitos');

  if (exponent === 0) {
    return `${power} es ${value}: cualquier número elevado a cero vale 1, así que aquí empieza todo. Es el nivel 1 de Dóblate y el punto de partida de las ${MAX_EXPONENT} duplicaciones que vienen después.`;
  }

  const previous = formatPowerOfTwo(exponent - 1);
  const previousValue = exactValue(exponent - 1);
  const doublings = pluralize(exponent, 'duplicación', 'duplicaciones');

  return `${power} es ${value}, el resultado de doblar ${previousValue} (${previous}). Tiene ${digitLabel} y llega tras ${doublings} desde el 1, en el nivel ${levelNumber(exponent)} de Dóblate.`;
};

/** Short summary for cards, lists and meta descriptions. */
export const levelSummary = (exponent: number): string => {
  const value = exactValue(exponent);
  const power = formatPowerOfTwo(exponent);
  if (exponent === 0) {
    return `¿Cuánto es 2 elevado a 0? Es ${value}, el punto de partida. Descubre 10 datos sobre el número ${value} y empieza a doblar.`;
  }
  const next = exponent < MAX_EXPONENT ? formatPowerOfTwo(exponent + 1) : null;
  const tail = next
    ? `Descubre 10 datos sobre ${value} y dóblalo para llegar a ${next}.`
    : `Descubre 10 datos sobre ${value}, el último nivel de Dóblate.`;
  return `¿Cuánto es 2 elevado a ${exponent}? ${power} es ${value}. ${tail}`;
};

/**
 * Questions people actually type into a search box, answered on the page and
 * mirrored in FAQPage structured data.
 */
export const levelFaq = (exponent: number): FaqEntry[] => {
  const power = formatPowerOfTwo(exponent);
  const value = exactValue(exponent);
  const { digits } = formatLevelNumber(exponent);
  const entries: FaqEntry[] = [];

  entries.push({
    question: `¿Cuánto es 2 elevado a ${exponent}?`,
    answer:
      exponent === 0
        ? `${power} es ${value}. Cualquier número distinto de cero elevado a 0 da 1.`
        : `${power} es ${value}. Es el resultado de multiplicar 2 por sí mismo ${pluralize(exponent, 'vez', 'veces')}.`,
  });

  entries.push({
    question: `¿Cuántos dígitos tiene ${value}?`,
    answer: `${value} tiene ${pluralize(digits, 'dígito', 'dígitos')} en base 10.`,
  });

  entries.push({
    question: `¿Cuál es el doble de ${value}?`,
    answer: `El doble de ${value} es ${exactValue(exponent + 1)}, es decir ${formatPowerOfTwo(exponent + 1)}.`,
  });

  if (exponent > 0) {
    entries.push({
      question: `¿Cuál es la mitad de ${value}?`,
      answer: `La mitad de ${value} es ${exactValue(exponent - 1)}, es decir ${formatPowerOfTwo(exponent - 1)}.`,
    });
  }

  return entries;
};
