/** Deterministic mulberry32 PRNG from a 32-bit seed. */
export const createRng = (seed: number): (() => number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export const hashString = (input: string): number => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** Fisher–Yates shuffle with deterministic RNG. */
export const shuffleWithSeed = <T>(items: readonly T[], seed: number): T[] => {
  const result = [...items];
  const rng = createRng(seed);
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = result[i]!;
    result[i] = result[j]!;
    result[j] = tmp;
  }
  return result;
};

export const factOrderSeed = (exponent: number): number =>
  hashString(`doblate-facts-v1:${exponent}`);

export const buildFactOrder = (exponent: number, length = 10): number[] => {
  const indices = Array.from({ length }, (_, i) => i);
  return shuffleWithSeed(indices, factOrderSeed(exponent));
};

export const pickIndex = (seed: number, length: number): number => {
  if (length <= 0) return 0;
  return (createRng(seed)() * length) | 0;
};
