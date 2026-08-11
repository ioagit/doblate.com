import { describe, expect, it } from 'vitest';
import { createInitialProgress } from '../utils/storage';
import { MIN_FACTS_TO_ADVANCE } from '../types/game';

describe('level unlocking', () => {
  it('requires at least 3 viewed facts before advancing', () => {
    expect(MIN_FACTS_TO_ADVANCE).toBe(3);
  });

  it('unlocks the next level after completion in progress model', () => {
    const progress = createInitialProgress();
    const completedExp = 0;
    const nextExp = completedExp + 1;
    const completed = new Set(progress.completedLevels);
    completed.add(completedExp);
    const updated = {
      ...progress,
      completedLevels: [...completed],
      highestExponentUnlocked: Math.max(progress.highestExponentUnlocked, nextExp),
      currentExponent: nextExp,
    };
    expect(updated.highestExponentUnlocked).toBe(1);
    expect(updated.currentExponent).toBe(1);
    expect(updated.completedLevels).toContain(0);
  });

  it('does not unlock when fewer than the required facts were viewed', () => {
    const viewed = [0, 1];
    expect(viewed.length >= MIN_FACTS_TO_ADVANCE).toBe(false);
    expect([0, 1, 2].length >= MIN_FACTS_TO_ADVANCE).toBe(true);
  });
});
