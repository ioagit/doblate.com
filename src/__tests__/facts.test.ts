import { describe, expect, it } from 'vitest';
import { shuffleWithSeed } from '../utils/factShuffle';
import { curatedFactCount, getFactsForLevel } from '../utils/factEngine';
import { ALL_EXPONENTS } from '../routes';
import { FACTS_PER_LEVEL } from '../types/game';

describe('facts engine', () => {
  it('returns exactly 10 facts for curated and generated levels', () => {
    expect(getFactsForLevel(0)).toHaveLength(FACTS_PER_LEVEL);
    expect(getFactsForLevel(10)).toHaveLength(FACTS_PER_LEVEL);
    expect(getFactsForLevel(42)).toHaveLength(FACTS_PER_LEVEL);
    expect(getFactsForLevel(100)).toHaveLength(FACTS_PER_LEVEL);
  });

  it('renders the same facts in the same order on every call', () => {
    // Prerendered HTML and the hydrated app must agree, so order is stable.
    const first = getFactsForLevel(17).map((fact) => fact.id);
    const second = getFactsForLevel(17).map((fact) => fact.id);
    expect(first).toEqual(second);
  });

  it('puts curated facts before generated filler', () => {
    const exponent = 17;
    const curated = curatedFactCount(exponent);
    expect(curated).toBeGreaterThan(0);
    expect(curated).toBeLessThan(FACTS_PER_LEVEL);

    const ids = getFactsForLevel(exponent).map((fact) => fact.id);
    expect(ids.slice(0, curated).some((id) => id.startsWith('g-'))).toBe(false);
  });

  it('gives every playable level ten unique facts', () => {
    for (const exponent of ALL_EXPONENTS) {
      const facts = getFactsForLevel(exponent);
      expect(facts).toHaveLength(FACTS_PER_LEVEL);
      expect(new Set(facts.map((fact) => fact.text)).size).toBe(FACTS_PER_LEVEL);
      expect(new Set(facts.map((fact) => fact.id)).size).toBe(FACTS_PER_LEVEL);
    }
  });

  it('keeps deterministic shuffleWithSeed', () => {
    const input = [0, 1, 2, 3, 4];
    expect(shuffleWithSeed(input, 123)).toEqual(shuffleWithSeed(input, 123));
  });
});
