/** Exact power of two using BigInt. */
export const powerOfTwo = (exponent: number): bigint => {
  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new RangeError(`El exponente debe ser un entero no negativo: ${exponent}`);
  }
  return 1n << BigInt(exponent);
};

export const doubleValue = (value: bigint): bigint => value << 1n;

export const doubleExponent = (exponent: number): number => exponent + 1;

/** Number of decimal digits of 2^exponent. Exact via log10. */
export const digitCount = (exponent: number): number => {
  if (exponent === 0) return 1;
  return Math.floor(exponent * Math.LOG10E * Math.LN2) + 1;
};

/** Approximate leading digits for scientific notation of 2^e. */
export const leadingDigits = (
  exponent: number,
  significantDigits = 4,
): { mantissa: number; powerOfTen: number } => {
  if (exponent === 0) {
    return { mantissa: 1, powerOfTen: 0 };
  }

  const log10 = exponent * Math.LOG10E * Math.LN2;
  const powerOfTen = Math.floor(log10);
  const frac = log10 - powerOfTen;
  let mantissa = 10 ** frac;

  const factor = 10 ** (significantDigits - 1);
  mantissa = Math.round(mantissa * factor) / factor;

  if (mantissa >= 10) {
    return { mantissa: mantissa / 10, powerOfTen: powerOfTen + 1 };
  }

  return { mantissa, powerOfTen };
};

export const isPowerOfTwoExponent = (exponent: number): boolean =>
  Number.isInteger(exponent) && exponent >= 0;
