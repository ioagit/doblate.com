import { describe, expect, it } from 'vitest';
import { buildFactOrder, factOrderSeed, shuffleWithSeed } from '../utils/factShuffle';
import { getFactsForLevel } from '../utils/factEngine';

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

  it('keeps deterministic shuffleWithSeed', () => {
    const input = [0, 1, 2, 3, 4];
    expect(shuffleWithSeed(input, 123)).toEqual(shuffleWithSeed(input, 123));
  });
});
