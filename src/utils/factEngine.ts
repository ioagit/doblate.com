import { CURATED_FACTS } from '../data/curatedFacts';
import type { Fact, FactCategory } from '../types/game';
import { FACTS_PER_LEVEL } from '../types/game';
import { digitCount, powerOfTwo } from './bigIntMath';
import {
  formatBinary,
  formatPowerOfTwo,
  formatScientific,
  formatSpanishInteger,
  toSuperscript,
} from './numberFormat';
import { createRng, hashString } from './factShuffle';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86_400;
const SECONDS_PER_YEAR = 31_557_600; // ~365.25 days

const formatDuration = (seconds: number): string => {
  if (seconds < SECONDS_PER_MINUTE) {
    return `unos ${formatSpanishInteger(Math.round(seconds))} segundos`;
  }
  if (seconds < SECONDS_PER_HOUR) {
    const minutes = seconds / SECONDS_PER_MINUTE;
    return `unos ${formatSpanishInteger(Math.round(minutes))} minutos`;
  }
  if (seconds < SECONDS_PER_DAY) {
    const hours = seconds / SECONDS_PER_HOUR;
    return `unas ${formatSpanishDecimalApprox(hours)} horas`;
  }
  if (seconds < SECONDS_PER_YEAR) {
    const days = seconds / SECONDS_PER_DAY;
    return `unos ${formatSpanishDecimalApprox(days)} días`;
  }
  const years = seconds / SECONDS_PER_YEAR;
  if (years < 1000) {
    return `unos ${formatSpanishDecimalApprox(years)} años`;
  }
  if (years < 1_000_000) {
    return `unos ${formatSpanishInteger(Math.round(years))} años`;
  }
  return `aproximadamente ${formatScientificFromNumber(years)} años`;
};

const formatSpanishDecimalApprox = (value: number): string => {
  if (value >= 100) return formatSpanishInteger(Math.round(value));
  const rounded = Math.round(value * 10) / 10;
  return String(rounded).replace('.', ',');
};

const formatScientificFromNumber = (value: number): string => {
  const exp = Math.floor(Math.log10(value));
  const mantissa = value / 10 ** exp;
  const m = (Math.round(mantissa * 100) / 100).toString().replace('.', ',');
  return `${m} × 10${toSuperscript(exp)}`;
};

const storageLabel = (exponent: number): string | null => {
  if (exponent < 10) return null;
  if (exponent === 10) return '1 kibibyte (KiB)';
  if (exponent === 20) return '1 mebibyte (MiB)';
  if (exponent === 30) return '1 gibibyte (GiB)';
  if (exponent === 40) return '1 tebibyte (TiB)';
  if (exponent === 50) return '1 pebibyte (PiB)';
  if (exponent === 60) return '1 exbibyte (EiB)';
  if (exponent > 10 && exponent < 20) {
    return `${formatSpanishInteger(2 ** (exponent - 10))} kibibytes (KiB)`;
  }
  if (exponent > 20 && exponent < 30) {
    return `${formatSpanishInteger(2 ** (exponent - 20))} mebibytes (MiB)`;
  }
  if (exponent > 30 && exponent < 40) {
    return `${formatSpanishInteger(2 ** (exponent - 30))} gibibytes (GiB)`;
  }
  return null;
};

const pixelSide = (exponent: number): number | null => {
  if (exponent % 2 !== 0) return null;
  if (exponent > 40) return null;
  return 2 ** (exponent / 2);
};

const fact = (
  id: string,
  text: string,
  category: FactCategory,
): Fact => ({ id, text, category });

/** Build up to many candidate generated facts; caller picks 10. */
export const generateCandidateFacts = (exponent: number): Fact[] => {
  const digits = digitCount(exponent);
  const power = formatPowerOfTwo(exponent);
  const scientific = formatScientific(exponent);
  const candidates: Fact[] = [];

  candidates.push(
    fact(
      `g-${exponent}-digits`,
      `${power} tiene exactamente ${formatSpanishInteger(digits)} dígitos en base 10.`,
      'matemáticas',
    ),
  );

  candidates.push(
    fact(
      `g-${exponent}-power`,
      `Este nivel es exactamente ${power}: un 1 seguido de ${formatSpanishInteger(exponent)} factores 2.`,
      'matemáticas',
    ),
  );

  candidates.push(
    fact(
      `g-${exponent}-binary`,
      `En binario, ${power} se escribe: ${formatBinary(exponent)}.`,
      'tecnología',
    ),
  );

  candidates.push(
    fact(
      `g-${exponent}-scientific`,
      `En notación científica aproximada: ${scientific}.`,
      'matemáticas',
    ),
  );

  // Counting time (1 number per second) — only meaningful description
  if (exponent <= 80) {
    const seconds = Number(powerOfTwo(exponent));
    // For large exponents Number loses precision but order of magnitude for duration is ok up to ~2^53
    if (exponent <= 53) {
      candidates.push(
        fact(
          `g-${exponent}-count`,
          `Si cuentas un número por segundo, llegar hasta ${power} tardaría ${formatDuration(seconds)}.`,
          'tiempo',
        ),
      );
    } else {
      const log10Years = exponent * Math.LOG10E * Math.LN2 - Math.log10(SECONDS_PER_YEAR);
      candidates.push(
        fact(
          `g-${exponent}-count`,
          `Contar hasta ${power} a un número por segundo tomaría aproximadamente 10${toSuperscript(Math.floor(log10Years))} años (valor aproximado).`,
          'tiempo',
        ),
      );
    }
  }

  // As seconds of time
  if (exponent >= 10 && exponent <= 53) {
    const seconds = Number(powerOfTwo(exponent));
    candidates.push(
      fact(
        `g-${exponent}-as-seconds`,
        `Si ${power} fueran segundos, equivaldrían a ${formatDuration(seconds)} (aproximadamente).`,
        'tiempo',
      ),
    );
  }

  const storage = storageLabel(exponent);
  if (storage) {
    candidates.push(
      fact(
        `g-${exponent}-storage`,
        `${power} bytes son exactamente ${storage}.`,
        'datos',
      ),
    );
  } else if (exponent > 10) {
    candidates.push(
      fact(
        `g-${exponent}-storage-approx`,
        `Como cantidad de bytes, ${power} supera con creces lo que cabe en un disco pequeño de consumo cotidiano (comparación de orden de magnitud).`,
        'datos',
      ),
    );
  }

  const side = pixelSide(exponent);
  if (side !== null) {
    const pixelCountLabel =
      exponent <= 53
        ? formatSpanishInteger(powerOfTwo(exponent))
        : power;
    candidates.push(
      fact(
        `g-${exponent}-pixels`,
        `Una imagen de ${formatSpanishInteger(side)}×${formatSpanishInteger(side)} píxeles tiene exactamente ${pixelCountLabel} píxeles.`,
        'comparación',
      ),
    );
  } else if (exponent >= 2) {
    const approxSide = Math.pow(2, exponent / 2);
    if (Number.isFinite(approxSide) && approxSide < 1e9) {
      candidates.push(
        fact(
          `g-${exponent}-pixels-approx`,
          `Una imagen cuadrada con aproximadamente ${formatSpanishInteger(Math.round(approxSide))} píxeles de lado tendría cerca de ${power} píxeles (valor aproximado).`,
          'comparación',
        ),
      );
    }
  }

  // Mathematical properties
  if (exponent === 0) {
    candidates.push(
      fact(`g-${exponent}-odd`, '1 es impar: no es divisible por 2.', 'matemáticas'),
    );
  } else {
    candidates.push(
      fact(
        `g-${exponent}-even`,
        `${power} es par: toda potencia de dos mayor que 1 es divisible por 2.`,
        'matemáticas',
      ),
    );
  }

  if (exponent >= 2 && exponent % 2 === 0) {
    candidates.push(
      fact(
        `g-${exponent}-square`,
        `${power} es un cuadrado perfecto porque el exponente ${exponent} es par: (${formatPowerOfTwo(exponent / 2)})².`,
        'matemáticas',
      ),
    );
  } else if (exponent >= 3 && exponent % 3 === 0) {
    candidates.push(
      fact(
        `g-${exponent}-cube`,
        `${power} es un cubo perfecto porque el exponente ${exponent} es múltiplo de 3: (${formatPowerOfTwo(exponent / 3)})³.`,
        'matemáticas',
      ),
    );
  } else {
    candidates.push(
      fact(
        `g-${exponent}-not-square`,
        `${power} no es un cuadrado perfecto: su exponente ${exponent} es impar.`,
        'matemáticas',
      ),
    );
  }

  // Coin flips
  if (exponent <= 40) {
    candidates.push(
      fact(
        `g-${exponent}-coins`,
        `Si lanzas una moneda justa ${formatSpanishInteger(exponent)} ${exponent === 1 ? 'vez' : 'veces'}, hay exactamente ${exponent <= 53 ? formatSpanishInteger(powerOfTwo(exponent)) : power} secuencias posibles de cara/cruz.`,
        'probabilidad',
      ),
    );
  } else {
    candidates.push(
      fact(
        `g-${exponent}-coins-big`,
        `Lanzar una moneda ${formatSpanishInteger(exponent)} veces produce ${power} secuencias posibles: más de las que podrías enumerar en una vida.`,
        'probabilidad',
      ),
    );
  }

  // Distance metaphor: meters
  if (exponent >= 10 && exponent <= 53) {
    const meters = Number(powerOfTwo(exponent));
    const km = meters / 1000;
    if (km < 1) {
      candidates.push(
        fact(
          `g-${exponent}-distance`,
          `Si ${power} fueran metros, medirían unos ${formatSpanishInteger(meters)} metros.`,
          'comparación',
        ),
      );
    } else if (km < 1_000_000) {
      candidates.push(
        fact(
          `g-${exponent}-distance`,
          `Si ${power} fueran metros, equivaldrían a unos ${formatSpanishInteger(Math.round(km))} kilómetros (aproximado al redondear).`,
          'comparación',
        ),
      );
    } else {
      const au = meters / 149_597_870_700;
      if (au < 1000) {
        candidates.push(
          fact(
            `g-${exponent}-distance`,
            `Si ${power} fueran metros, serían unas ${formatSpanishDecimalApprox(au)} unidades astronómicas (distancia Tierra–Sol ≈ 1 UA; valor aproximado).`,
            'ciencia',
          ),
        );
      } else {
        candidates.push(
          fact(
            `g-${exponent}-distance`,
            `Interpretado como metros, ${power} es una distancia interplanetaria o mayor (orden de magnitud astronómico).`,
            'ciencia',
          ),
        );
      }
    }
  }

  // Previous / next in sequence
  if (exponent > 0) {
    candidates.push(
      fact(
        `g-${exponent}-half`,
        `${power} es el doble exacto de ${formatPowerOfTwo(exponent - 1)}.`,
        'matemáticas',
      ),
    );
  }

  candidates.push(
    fact(
      `g-${exponent}-next`,
      `El siguiente nivel será ${formatPowerOfTwo(exponent + 1)}: exactamente el doble.`,
      'usos',
    ),
  );

  candidates.push(
    fact(
      `g-${exponent}-bits`,
      `En binario, ${power} ocupa ${formatSpanishInteger(exponent + 1)} bits: un 1 seguido de ${formatSpanishInteger(exponent)} ceros.`,
      'tecnología',
    ),
  );

  // Light travel
  if (exponent >= 20 && exponent <= 53) {
    const meters = Number(powerOfTwo(exponent));
    const lightSeconds = meters / 299_792_458;
    candidates.push(
      fact(
        `g-${exponent}-light`,
        `Si ${power} fueran metros, la luz tardaría aproximadamente ${formatDuration(lightSeconds)} en recorrerlos.`,
        'ciencia',
      ),
    );
  }

  return candidates;
};

const ensureTenFacts = (exponent: number, facts: Fact[]): Fact[] => {
  if (facts.length >= FACTS_PER_LEVEL) {
    return facts.slice(0, FACTS_PER_LEVEL);
  }

  const generated = generateCandidateFacts(exponent);
  const existingIds = new Set(facts.map((f) => f.id));
  const existingTexts = new Set(facts.map((f) => f.text));
  const merged = [...facts];

  for (const g of generated) {
    if (merged.length >= FACTS_PER_LEVEL) break;
    if (existingIds.has(g.id) || existingTexts.has(g.text)) continue;
    merged.push(g);
    existingIds.add(g.id);
    existingTexts.add(g.text);
  }

  // Absolute fallback: pad with deterministic distinct math facts
  let pad = 0;
  while (merged.length < FACTS_PER_LEVEL) {
    pad += 1;
    const text = `${formatPowerOfTwo(exponent)} = 2${toSuperscript(exponent)} (dato de refuerzo ${pad} de ${FACTS_PER_LEVEL}).`;
    if (existingTexts.has(text)) continue;
    merged.push(
      fact(`g-${exponent}-pad-${pad}`, text, 'matemáticas'),
    );
    existingTexts.add(text);
  }

  return merged.slice(0, FACTS_PER_LEVEL);
};

/**
 * Returns exactly 10 facts for a level.
 * Uses curated facts when available; fills/replaces with generated facts as needed.
 * For large exponents without curation, selects 10 deterministic generated facts.
 */
export const getFactsForLevel = (exponent: number): Fact[] => {
  const curated = CURATED_FACTS[exponent];

  if (curated && curated.length === FACTS_PER_LEVEL) {
    return curated.map((f) => ({ ...f }));
  }

  if (curated && curated.length > 0) {
    return ensureTenFacts(exponent, curated.map((f) => ({ ...f })));
  }

  const generated = generateCandidateFacts(exponent);
  const rng = createRng(hashString(`doblate-gen-pick-v1:${exponent}`));

  // Prefer a diverse category mix: shuffle then unique-ish pick
  const shuffled = [...generated];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }

  const picked: Fact[] = [];
  const usedCategories = new Set<string>();

  // First pass: prefer unused categories
  for (const f of shuffled) {
    if (picked.length >= FACTS_PER_LEVEL) break;
    if (usedCategories.has(f.category) && picked.length < FACTS_PER_LEVEL - 2) {
      continue;
    }
    picked.push(f);
    usedCategories.add(f.category);
  }

  // Second pass: fill remaining
  for (const f of shuffled) {
    if (picked.length >= FACTS_PER_LEVEL) break;
    if (picked.some((p) => p.id === f.id)) continue;
    picked.push(f);
  }

  return ensureTenFacts(exponent, picked);
};

export const getOrderedFacts = (
  exponent: number,
  order: number[],
): Fact[] => {
  const facts = getFactsForLevel(exponent);
  return order.map((index) => facts[index]!).filter(Boolean);
};
