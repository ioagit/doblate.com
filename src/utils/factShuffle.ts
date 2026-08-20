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

/**
 * Order in which a level reveals its facts.
 *
 * Curated facts sit at the start of a level's fact list, so when a level mixes
 * curated and generated facts each block is shuffled on its own. Otherwise a
 * single shuffle could bury the hand-written facts behind generated filler,
 * and players only need to see three facts to advance.
 */
export const buildFactOrder = (
  exponent: number,
  length = 10,
  curatedCount = length,
): number[] => {
  const indices = Array.from({ length }, (_, i) => i);
  const seed = factOrderSeed(exponent);
  const pivot = Math.min(Math.max(curatedCount, 0), length);

  if (pivot === 0 || pivot === length) {
    return shuffleWithSeed(indices, seed);
  }

  return [
    ...shuffleWithSeed(indices.slice(0, pivot), seed),
    ...shuffleWithSeed(indices.slice(pivot), seed ^ 0x9e3779b9),
  ];
};

export const pickIndex = (seed: number, length: number): number => {
  if (length <= 0) return 0;
  return (createRng(seed)() * length) | 0;
};
