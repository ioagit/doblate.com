import type { GameProgress, PlayerPreferences } from '../types/game';
import { STORAGE_KEY, STORAGE_VERSION } from '../types/game';

export const defaultPreferences = (): PlayerPreferences => ({
  reduceMotion: null,
  soundEnabled: true,
});

export const createInitialProgress = (): GameProgress => ({
  version: STORAGE_VERSION,
  currentExponent: 0,
  highestExponentUnlocked: 0,
  completedLevels: [],
  factsViewed: {},
  factOrders: {},
  factPositions: {},
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  challengeState: null,
  preferences: defaultPreferences(),
  lastPlayedAt: new Date().toISOString(),
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number');

const isNumberRecord = (value: unknown): value is Record<string, number> => {
  if (!isRecord(value)) return false;
  return Object.values(value).every((item) => typeof item === 'number');
};

const isNumberArrayRecord = (value: unknown): value is Record<string, number[]> => {
  if (!isRecord(value)) return false;
  return Object.values(value).every(isNumberArray);
};

export const isValidProgress = (value: unknown): value is GameProgress => {
  if (!isRecord(value)) return false;
  if (value.version !== STORAGE_VERSION) return false;
  if (typeof value.currentExponent !== 'number') return false;
  if (typeof value.highestExponentUnlocked !== 'number') return false;
  if (!isNumberArray(value.completedLevels)) return false;
  if (!isNumberArrayRecord(value.factsViewed)) return false;
  if (!isNumberArrayRecord(value.factOrders)) return false;
  if (!isNumberRecord(value.factPositions)) return false;
  if (typeof value.correctAnswers !== 'number') return false;
  if (typeof value.incorrectAnswers !== 'number') return false;
  if (typeof value.currentStreak !== 'number') return false;
  if (typeof value.bestStreak !== 'number') return false;
  if (!isRecord(value.preferences)) return false;
  if (typeof value.lastPlayedAt !== 'string') return false;
  return true;
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
      parsed.correctAnswers > 0
    );
  } catch {
    return false;
  }
};
