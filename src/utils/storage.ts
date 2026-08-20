import type { GameProgress, PlayerPreferences } from '../types/game';
import {
  LEGACY_STORAGE_KEY,
  MAX_EXPONENT,
  STORAGE_KEY,
  STORAGE_VERSION,
} from '../types/game';

export const defaultPreferences = (): PlayerPreferences => ({
  reduceMotion: null,
  soundEnabled: true,
});

export const createInitialProgress = (): GameProgress => ({
  version: STORAGE_VERSION,
  currentExponent: 0,
  highestExponentUnlocked: 0,
  completedLevels: [],
  visitedLevels: [],
  currentStreak: 0,
  bestStreak: 0,
  preferences: defaultPreferences(),
  lastPlayedAt: new Date().toISOString(),
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number');

export const clampExponent = (value: number): number =>
  Math.min(Math.max(Math.trunc(value), 0), MAX_EXPONENT);

const sortedLevels = (values: number[]): number[] =>
  [...new Set(values.filter((value) => value >= 0 && value <= MAX_EXPONENT))].sort(
    (a, b) => a - b,
  );

export const isValidProgress = (value: unknown): value is GameProgress => {
  if (!isRecord(value)) return false;
  if (value.version !== STORAGE_VERSION) return false;
  if (typeof value.currentExponent !== 'number') return false;
  if (typeof value.highestExponentUnlocked !== 'number') return false;
  if (!isNumberArray(value.completedLevels)) return false;
  if (!isNumberArray(value.visitedLevels)) return false;
  if (typeof value.currentStreak !== 'number') return false;
  if (typeof value.bestStreak !== 'number') return false;
  if (!isRecord(value.preferences)) return false;
  if (typeof value.lastPlayedAt !== 'string') return false;
  return true;
};

/**
 * The carousel schema stored viewed facts per level. Pages show every fact at
 * once, so only the milestones carry over: what was reached and completed.
 */
const migrateLegacy = (raw: string): GameProgress | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    const completed = isNumberArray(parsed.completedLevels)
      ? sortedLevels(parsed.completedLevels)
      : [];
    const visited = isRecord(parsed.factsViewed)
      ? sortedLevels(Object.keys(parsed.factsViewed).map(Number).filter(Number.isFinite))
      : [];
    const highest =
      typeof parsed.highestExponentUnlocked === 'number'
        ? clampExponent(parsed.highestExponentUnlocked)
        : 0;
    const current =
      typeof parsed.currentExponent === 'number'
        ? clampExponent(parsed.currentExponent)
        : 0;

    if (completed.length === 0 && visited.length === 0 && highest === 0) {
      return null;
    }

    const base = createInitialProgress();
    return {
      ...base,
      currentExponent: current,
      highestExponentUnlocked: Math.max(highest, current, ...completed, 0),
      completedLevels: completed,
      visitedLevels: sortedLevels([...visited, ...completed]),
      currentStreak:
        typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      preferences: isRecord(parsed.preferences)
        ? {
            reduceMotion:
              typeof parsed.preferences.reduceMotion === 'boolean'
                ? parsed.preferences.reduceMotion
                : null,
            soundEnabled: parsed.preferences.soundEnabled !== false,
          }
        : base.preferences,
    };
  } catch {
    return null;
  }
};

export type StorageResult =
  | { ok: true; progress: GameProgress; fromStorage: boolean }
  | { ok: false; progress: GameProgress; reason: 'unavailable' | 'corrupted' };

export const loadProgress = (): StorageResult => {
  try {
    if (typeof localStorage === 'undefined') {
      return { ok: false, progress: createInitialProgress(), reason: 'unavailable' };
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      const migrated = legacy ? migrateLegacy(legacy) : null;
      if (migrated) {
        saveProgress(migrated);
        return { ok: true, progress: migrated, fromStorage: true };
      }
      return { ok: true, progress: createInitialProgress(), fromStorage: false };
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isValidProgress(parsed)) {
      return { ok: false, progress: createInitialProgress(), reason: 'corrupted' };
    }

    return { ok: true, progress: parsed, fromStorage: true };
  } catch {
    return { ok: false, progress: createInitialProgress(), reason: 'corrupted' };
  }
};

export const saveProgress = (progress: GameProgress): boolean => {
  try {
    if (typeof localStorage === 'undefined') return false;
    const next: GameProgress = {
      ...progress,
      version: STORAGE_VERSION,
      lastPlayedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch {
    return false;
  }
};

export const clearProgress = (): boolean => {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

export const hasSavedProgress = (): boolean => {
  try {
    if (typeof localStorage === 'undefined') return false;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidProgress(parsed)) return false;
    return (
      parsed.highestExponentUnlocked > 0 ||
      parsed.completedLevels.length > 0 ||
      parsed.visitedLevels.length > 0
    );
  } catch {
    return false;
  }
};
