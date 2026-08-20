import { useCallback, useEffect, useState } from 'react';
import type { GameProgress } from '../types/game';
import { FACTS_PER_LEVEL, MAX_EXPONENT } from '../types/game';
import {
  clampExponent,
  clearProgress,
  createInitialProgress,
  loadProgress,
  saveProgress,
} from '../utils/storage';

export type StorageNotice = 'unavailable' | 'corrupted' | null;

const withLevel = (levels: number[], exponent: number): number[] =>
  levels.includes(exponent)
    ? levels
    : [...levels, exponent].sort((a, b) => a - b);

export const useGame = () => {
  // Starts from a clean object on both server and client: the saved game is
  // read after mount so the first render always matches the prerendered HTML.
  const [progress, setProgress] = useState<GameProgress>(createInitialProgress);
  const [storageNotice, setStorageNotice] = useState<StorageNotice>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const result = loadProgress();
    setProgress(result.progress);
    setStorageNotice(result.ok ? null : result.reason);
    setHydrated(true);
  }, []);

  const updateProgress = useCallback(
    (updater: (prev: GameProgress) => GameProgress) => {
      setProgress((prev) => {
        const next = updater(prev);
        if (next === prev) return prev;
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  /** A level page was opened: every fact of that level is now on screen. */
  const visitLevel = useCallback(
    (rawExponent: number) => {
      const exponent = clampExponent(rawExponent);
      updateProgress((prev) => {
        const visitedLevels = withLevel(prev.visitedLevels, exponent);
        const highestExponentUnlocked = Math.max(
          prev.highestExponentUnlocked,
          exponent,
        );
        if (
          visitedLevels === prev.visitedLevels &&
          highestExponentUnlocked === prev.highestExponentUnlocked &&
          prev.currentExponent === exponent
        ) {
          return prev;
        }
        return {
          ...prev,
          visitedLevels,
          highestExponentUnlocked,
          currentExponent: exponent,
        };
      });
    },
    [updateProgress],
  );

  const completeLevel = useCallback(
    (rawExponent: number) => {
      const exponent = clampExponent(rawExponent);
      const next = Math.min(exponent + 1, MAX_EXPONENT);
      updateProgress((prev) => {
        const isNew = !prev.completedLevels.includes(exponent);
        const streak = isNew ? prev.currentStreak + 1 : prev.currentStreak;
        return {
          ...prev,
          completedLevels: withLevel(prev.completedLevels, exponent),
          visitedLevels: withLevel(prev.visitedLevels, exponent),
          highestExponentUnlocked: Math.max(prev.highestExponentUnlocked, next),
          currentExponent: next,
          currentStreak: streak,
          bestStreak: Math.max(prev.bestStreak, streak),
        };
      });
    },
    [updateProgress],
  );

  const startFresh = useCallback(() => {
    clearProgress();
    const fresh = createInitialProgress();
    saveProgress(fresh);
    setProgress(fresh);
    setStorageNotice(null);
  }, []);

  const updatePreferences = useCallback(
    (partial: Partial<GameProgress['preferences']>) => {
      updateProgress((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...partial },
      }));
    },
    [updateProgress],
  );

  const dismissStorageNotice = useCallback(() => setStorageNotice(null), []);

  const isUnlocked = useCallback(
    (exponent: number) => exponent <= progress.highestExponentUnlocked,
    [progress.highestExponentUnlocked],
  );

  const hasProgress =
    progress.completedLevels.length > 0 || progress.visitedLevels.length > 0;

  return {
    progress,
    storageNotice,
    hydrated,
    hasProgress,
    factsDiscovered: progress.visitedLevels.length * FACTS_PER_LEVEL,
    isUnlocked,
    visitLevel,
    completeLevel,
    startFresh,
    updatePreferences,
    dismissStorageNotice,
  };
};

export type GameApi = ReturnType<typeof useGame>;
