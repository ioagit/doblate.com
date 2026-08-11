import { describe, expect, it, beforeEach } from 'vitest';
import {
  clearProgress,
  createInitialProgress,
  isValidProgress,
  loadProgress,
  saveProgress,
} from '../utils/storage';
import { STORAGE_KEY, STORAGE_VERSION } from '../types/game';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a versioned initial progress object', () => {
    const progress = createInitialProgress();
    expect(progress.version).toBe(STORAGE_VERSION);
    expect(progress.currentExponent).toBe(0);
    expect(progress.highestExponentUnlocked).toBe(0);
    expect(isValidProgress(progress)).toBe(true);
  });

  it('saves and restores progress', () => {
    const progress = createInitialProgress();
    progress.currentExponent = 5;
    progress.highestExponentUnlocked = 5;
    progress.completedLevels = [0, 1, 2, 3, 4];
    progress.correctAnswers = 5;
    progress.bestStreak = 3;

    expect(saveProgress(progress)).toBe(true);
    const loaded = loadProgress();
    expect(loaded.ok).toBe(true);
    if (!loaded.ok) return;
    expect(loaded.fromStorage).toBe(true);
    expect(loaded.progress.currentExponent).toBe(5);
    expect(loaded.progress.completedLevels).toEqual([0, 1, 2, 3, 4]);
    expect(loaded.progress.bestStreak).toBe(3);
  });

  it('handles corrupted storage gracefully', () => {
    localStorage.setItem(STORAGE_KEY, '{not-json');
    const loaded = loadProgress();
    expect(loaded.ok).toBe(false);
    if (loaded.ok) return;
    expect(loaded.reason).toBe('corrupted');
    expect(loaded.progress.currentExponent).toBe(0);
  });

  it('resets progress', () => {
    saveProgress(createInitialProgress());
    expect(clearProgress()).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('rejects wrong schema versions', () => {
    expect(
      isValidProgress({
        ...createInitialProgress(),
        version: 999,
      }),
    ).toBe(false);
  });
});
