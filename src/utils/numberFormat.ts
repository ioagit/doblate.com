import {
  digitCount,
  leadingDigits,
  powerOfTwo,
} from './bigIntMath';
import type { FormattedNumber } from '../types/game';
import { SCIENTIFIC_THRESHOLD_DIGITS } from '../types/game';
import { pluralize } from './spanish';

const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
};

export const toSuperscript = (value: number | string): string =>
  String(value)
    .split('')
    .map((ch) => SUPERSCRIPT_DIGITS[ch] ?? ch)
    .join('');

/** Format a non-negative integer (bigint or number) with Spanish thousands separators (.). */
export const formatSpanishInteger = (value: bigint | number): string => {
  const raw = typeof value === 'bigint' ? value.toString() : Math.trunc(value).toString();
  const negative = raw.startsWith('-');
  const digits = negative ? raw.slice(1) : raw;
  const withDots = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return negative ? `-${withDots}` : withDots;
};

/** Format mantissa with Spanish decimal comma. */
export const formatSpanishDecimal = (value: number, maxFractionDigits = 3): string => {
  const fixed = value
    .toFixed(maxFractionDigits)
    .replace(/\.?0+$/, '');
  return fixed.replace('.', ',');
};

export const formatScientific = (exponent: number, significantDigits = 4): string => {
  const { mantissa, powerOfTen } = leadingDigits(exponent, significantDigits);
  return `${formatSpanishDecimal(mantissa, significantDigits - 1)} × 10${toSuperscript(powerOfTen)}`;
};

export const formatPowerOfTwo = (exponent: number): string => `2${toSuperscript(exponent)}`;

export const formatBinary = (exponent: number): string => {
  if (exponent > 64) {
    return `1 seguido de ${formatSpanishInteger(exponent)} ceros (demasiado largo para mostrarlo completo)`;
  }
  return `1${'0'.repeat(exponent)}`;
};

const scaleExplanationFor = (exponent: number, digits: number): string => {
  if (exponent === 0) return 'La unidad: el punto de partida de todo lo que se dobla.';
  if (exponent <= 3) return 'Todavía cabe en los dedos de una mano.';
  if (exponent <= 6) return 'Un número pequeño que ya empieza a sentirse familiar.';
  if (exponent <= 10) return 'Del tamaño de un kibibyte: 1024 unidades.';
  if (exponent <= 20) return 'Escala de megabytes y poblaciones de ciudades pequeñas.';
  if (exponent <= 30) return 'Miles de millones: escala de habitantes del planeta.';
  if (exponent <= 40) return 'Billones: más allá de lo que se cuenta a simple vista.';
  if (exponent <= 53) return 'Cerca del límite de precisión de los números decimales en JavaScript.';
  if (exponent <= 100) return 'Un gigante con docenas de dígitos: solo BigInt lo guarda exacto.';
  if (digits < 100) {
    return `Aproximadamente ${pluralize(digits, 'dígito', 'dígitos')}: hay que leerlo en notación científica.`;
  }
  return `Un coloso de unos ${formatSpanishInteger(digits)} dígitos. La notación científica es la única forma práctica de mirarlo.`;
};

export const formatLevelNumber = (exponent: number): FormattedNumber => {
  const digits = digitCount(exponent);
  const useScientific = digits > SCIENTIFIC_THRESHOLD_DIGITS;
  const power = formatPowerOfTwo(exponent);
  const scientific = formatScientific(exponent);
  const exact = powerOfTwo(exponent);

  return {
    display: useScientific ? scientific : formatSpanishInteger(exact),
    scientific: useScientific ? scientific : null,
    power,
    digits,
    scaleExplanation: scaleExplanationFor(exponent, digits),
    useScientific,
  };
};

/** Compact label for UI chips and lists. */
export const shortNumberLabel = (exponent: number): string => {
  const formatted = formatLevelNumber(exponent);
  if (!formatted.useScientific) return formatted.display;
  return formatted.power;
};
