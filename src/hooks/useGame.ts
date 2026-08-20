import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GameProgress, Screen } from '../types/game';
import { FACTS_PER_LEVEL, MIN_FACTS_TO_ADVANCE } from '../types/game';
import { curatedFactCount } from '../utils/factEngine';
import { buildFactOrder } from '../utils/factShuffle';
import {
  clearProgress,
  createInitialProgress,
  loadProgress,
  saveProgress,
} from '../utils/storage';

export type StorageNotice = 'unavailable' | 'corrupted' | null;

const ensureFactOrder = (
  progress: GameProgress,
  exponent: number,
): GameProgress => {
  const key = String(exponent);
  if (progress.factOrders[key]?.length === FACTS_PER_LEVEL) return progress;
  return {
    ...progress,
    factOrders: {
      ...progress.factOrders,
      [key]: buildFactOrder(
        exponent,
        FACTS_PER_LEVEL,
        curatedFactCount(exponent),
      ),
    },
    factPositions: {
      ...progress.factPositions,
      [key]: progress.factPositions[key] ?? 0,
    },
    factsViewed: {
      ...progress.factsViewed,
      [key]: progress.factsViewed[key] ?? [],
    },
  };
};

const persist = (progress: GameProgress): GameProgress => {
  saveProgress(progress);
  return progress;
};

export const useGame = () => {
  const initial = useMemo(() => loadProgress(), []);
  const [progress, setProgress] = useState<GameProgress>(() =>
    ensureFactOrder(initial.progress, initial.progress.currentExponent),
  );
  const [screen, setScreen] = useState<Screen>('home');
  const [viewingExponent, setViewingExponent] = useState(
    initial.progress.currentExponent,
  );
  const [storageNotice, setStorageNotice] = useState<StorageNotice>(
    initial.ok ? null : initial.reason,
  );
  const [isRevisit, setIsRevisit] = useState(false);
  const [doublingFrom, setDoublingFrom] = useState<number | null>(null);

  useEffect(() => {
    if (initial.ok && initial.fromStorage) {
      setScreen('home');
    }
  }, [initial]);

  const updateProgress = useCallback((updater: (prev: GameProgress) => GameProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      if (next === prev) return prev;
      return persist(next);
    });
  }, []);

  const openLevel = useCallback(
    (exponent: number, revisit = false) => {
      setIsRevisit(revisit);
      setViewingExponent(exponent);
      setDoublingFrom(null);
      updateProgress((prev) => {
        const withOrder = ensureFactOrder(prev, exponent);
        const nextCurrent = revisit ? prev.currentExponent : exponent;

        if (withOrder === prev && prev.currentExponent === nextCurrent) {
          return prev;
        }

        return {
          ...withOrder,
          currentExponent: nextCurrent,
        };
      });
      setScreen('level');
    },
    [updateProgress],
  );

  const continueGame = useCallback(() => {
    openLevel(progress.currentExponent, false);
  }, [openLevel, progress.currentExponent]);

  const startFresh = useCallback(() => {
    clearProgress();
    const fresh = createInitialProgress();
    const withOrder = ensureFactOrder(fresh, 0);
    saveProgress(withOrder);
    setProgress(withOrder);
    setStorageNotice(null);
    setIsRevisit(false);
    setViewingExponent(0);
    setDoublingFrom(null);
    setScreen('level');
  }, []);

  const markFactViewed = useCallback(
    (exponent: number, position: number) => {
      updateProgress((prev) => {
        const key = String(exponent);
        const previousViewed = prev.factsViewed[key] ?? [];
        const alreadyViewed = previousViewed.includes(position);
        const samePosition = prev.factPositions[key] === position;
        if (alreadyViewed && samePosition) return prev;

        const viewed = alreadyViewed
          ? previousViewed
          : [...previousViewed, position].sort((a, b) => a - b);

        return {
          ...prev,
          factsViewed: {
            ...prev.factsViewed,
            [key]: viewed,
          },
          factPositions: {
            ...prev.factPositions,
            [key]: position,
          },
        };
      });
    },
    [updateProgress],
  );

  const setFactPosition = useCallback(
    (exponent: number, position: number) => {
      updateProgress((prev) => {
        const key = String(exponent);
        if (prev.factPositions[key] === position) return prev;
        return {
          ...prev,
          factPositions: {
            ...prev.factPositions,
            [key]: position,
          },
        };
      });
    },
    [updateProgress],
  );

  const viewedCount = progress.factsViewed[String(viewingExponent)]?.length ?? 0;
  const levelAlreadyCompleted = progress.completedLevels.includes(viewingExponent);
  const canAdvance =
    levelAlreadyCompleted || viewedCount >= MIN_FACTS_TO_ADVANCE;
  const isDoubling = doublingFrom !== null;

  const completeLevel = useCallback(() => {
    if (isDoubling) return;
    if (!canAdvance && !isRevisit) return;

    const completedExp = viewingExponent;
    const nextExp = completedExp + 1;
    const alreadyDone = progress.completedLevels.includes(completedExp);

    if (alreadyDone && isRevisit) {
      setScreen('progress');
      return;
    }

    updateProgress((prev) => {
      const completed = new Set(prev.completedLevels);
      const wasNew = !completed.has(completedExp);
      completed.add(completedExp);
      const streak = wasNew ? prev.currentStreak + 1 : prev.currentStreak;

      return {
        ...prev,
        completedLevels: [...completed].sort((a, b) => a - b),
        highestExponentUnlocked: Math.max(prev.highestExponentUnlocked, nextExp),
        currentExponent: isRevisit ? prev.currentExponent : nextExp,
        correctAnswers: wasNew ? prev.correctAnswers + 1 : prev.correctAnswers,
        currentStreak: streak,
        bestStreak: Math.max(prev.bestStreak, streak),
        challengeState: null,
      };
    });

    setDoublingFrom(completedExp);
  }, [
    canAdvance,
    isDoubling,
    isRevisit,
    progress.completedLevels,
    updateProgress,
    viewingExponent,
  ]);

  const finishDoubling = useCallback(() => {
    if (doublingFrom === null) return;
    const nextExp = doublingFrom + 1;
    setDoublingFrom(null);
    if (isRevisit) {
      setScreen('progress');
      return;
    }
    openLevel(nextExp, false);
  }, [doublingFrom, isRevisit, openLevel]);

  const goHome = useCallback(() => {
    setDoublingFrom(null);
    setScreen('home');
  }, []);

  const goProgress = useCallback(() => {
    setDoublingFrom(null);
    setScreen('progress');
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

  const hasProgress =
    progress.highestExponentUnlocked > 0 ||
    progress.completedLevels.length > 0 ||
    progress.correctAnswers > 0 ||
    (progress.factsViewed['0']?.length ?? 0) > 0;

  return {
    progress,
    screen,
    viewingExponent,
    storageNotice,
    canAdvance,
    isRevisit,
    isDoubling,
    doublingFrom,
    hasProgress,
    openLevel,
    continueGame,
    startFresh,
    markFactViewed,
    setFactPosition,
    completeLevel,
    finishDoubling,
    goHome,
    goProgress,
    updatePreferences,
    dismissStorageNotice: () => setStorageNotice(null),
  };
};
