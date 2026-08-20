import { describe, expect, it, beforeEach } from 'vitest';
import {
  clearProgress,
  createInitialProgress,
  isValidProgress,
  loadProgress,
  saveProgress,
} from '../utils/storage';
import { LEGACY_STORAGE_KEY, STORAGE_KEY, STORAGE_VERSION } from '../types/game';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a versioned initial progress object', () => {
    const progress = createInitialProgress();
    expect(progress.version).toBe(STORAGE_VERSION);
    expect(progress.currentExponent).toBe(0);
    expect(progress.highestExponentUnlocked).toBe(0);
    expect(progress.visitedLevels).toEqual([]);
    expect(isValidProgress(progress)).toBe(true);
  });

  it('saves and restores progress', () => {
    const progress = createInitialProgress();
    progress.currentExponent = 5;
    progress.highestExponentUnlocked = 5;
    progress.completedLevels = [0, 1, 2, 3, 4];
    progress.visitedLevels = [0, 1, 2, 3, 4, 5];
    progress.bestStreak = 3;

    expect(saveProgress(progress)).toBe(true);
    const loaded = loadProgress();
    expect(loaded.ok).toBe(true);
    if (!loaded.ok) return;
    expect(loaded.fromStorage).toBe(true);
    expect(loaded.progress.currentExponent).toBe(5);
    expect(loaded.progress.completedLevels).toEqual([0, 1, 2, 3, 4]);
    expect(loaded.progress.visitedLevels).toEqual([0, 1, 2, 3, 4, 5]);
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

  it('carries a carousel-era save over to the page schema', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        currentExponent: 4,
        highestExponentUnlocked: 4,
        completedLevels: [0, 1, 2, 3],
        factsViewed: { 0: [0, 1, 2], 4: [0] },
        bestStreak: 4,
        preferences: { reduceMotion: null, soundEnabled: false },
      }),
    );

    const loaded = loadProgress();
    expect(loaded.ok).toBe(true);
    if (!loaded.ok) return;
    expect(loaded.progress.version).toBe(STORAGE_VERSION);
    expect(loaded.progress.currentExponent).toBe(4);
    expect(loaded.progress.completedLevels).toEqual([0, 1, 2, 3]);
    expect(loaded.progress.visitedLevels).toEqual([0, 1, 2, 3, 4]);
    expect(loaded.progress.preferences.soundEnabled).toBe(false);
    // The migration is written back so it only runs once.
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it('ignores an empty legacy save', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({ version: 1, currentExponent: 0, completedLevels: [] }),
    );
    const loaded = loadProgress();
    expect(loaded.ok).toBe(true);
    if (!loaded.ok) return;
    expect(loaded.fromStorage).toBe(false);
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
