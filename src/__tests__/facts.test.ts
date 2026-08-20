import { describe, expect, it } from 'vitest';
import { buildFactOrder, factOrderSeed, shuffleWithSeed } from '../utils/factShuffle';
import { curatedFactCount, getFactsForLevel } from '../utils/factEngine';
import { FACTS_PER_LEVEL, MIN_FACTS_TO_ADVANCE } from '../types/game';

describe('fact shuffling and engine', () => {
  it('produces a stable shuffle for the same level', () => {
    const a = buildFactOrder(7);
    const b = buildFactOrder(7);
    expect(a).toEqual(b);
    expect(new Set(a).size).toBe(10);
    expect(a).not.toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('produces different orders for different levels', () => {
    expect(buildFactOrder(3)).not.toEqual(buildFactOrder(8));
    expect(factOrderSeed(3)).not.toBe(factOrderSeed(8));
  });

  it('returns exactly 10 facts for curated and generated levels', () => {
    expect(getFactsForLevel(0)).toHaveLength(10);
    expect(getFactsForLevel(10)).toHaveLength(10);
    expect(getFactsForLevel(42)).toHaveLength(10);
    expect(getFactsForLevel(100)).toHaveLength(10);
  });

  it('shows curated facts first on partially curated levels', () => {
    const exponent = 17;
    const curated = curatedFactCount(exponent);
    expect(curated).toBeGreaterThanOrEqual(MIN_FACTS_TO_ADVANCE);
    expect(curated).toBeLessThan(FACTS_PER_LEVEL);

    const order = buildFactOrder(exponent, FACTS_PER_LEVEL, curated);
    expect(new Set(order).size).toBe(FACTS_PER_LEVEL);
    expect(order.slice(0, curated).every((index) => index < curated)).toBe(true);

    const facts = getFactsForLevel(exponent);
    const firstRevealed = order.slice(0, curated).map((index) => facts[index]!.id);
    expect(firstRevealed.some((id) => id.startsWith('g-'))).toBe(false);
  });

  it('keeps deterministic shuffleWithSeed', () => {
    const input = [0, 1, 2, 3, 4];
    expect(shuffleWithSeed(input, 123)).toEqual(shuffleWithSeed(input, 123));
  });
});
