export type FactCategory =
  | 'matemáticas'
  | 'ciencia'
  | 'tecnología'
  | 'naturaleza'
  | 'historia'
  | 'comparación'
  | 'tiempo'
  | 'datos'
  | 'probabilidad'
  | 'usos';

export interface Fact {
  id: string;
  text: string;
  category: FactCategory;
}

export type Screen = 'home' | 'level' | 'progress';

export interface PlayerPreferences {
  reduceMotion: boolean | null;
  soundEnabled: boolean;
}

export interface GameProgress {
  version: number;
  currentExponent: number;
  highestExponentUnlocked: number;
  completedLevels: number[];
  /** exponent -> indices of facts the player has viewed (carousel positions) */
  factsViewed: Record<string, number[]>;
  /** exponent -> permutation of fact indices 0..9 */
  factOrders: Record<string, number[]>;
  /** exponent -> current carousel index */
  factPositions: Record<string, number>;
  /** Levels completed (kept for compatibility / stats) */
  correctAnswers: number;
  incorrectAnswers: number;
  currentStreak: number;
  bestStreak: number;
  /** @deprecated Kept null for older saves */
  challengeState: null;
  preferences: PlayerPreferences;
  lastPlayedAt: string;
}

export interface FormattedNumber {
  display: string;
  scientific: string | null;
  power: string;
  digits: number;
  scaleExplanation: string;
  useScientific: boolean;
}

export const STORAGE_VERSION = 1;
export const STORAGE_KEY = 'doblate-progress-v1';
export const FACTS_PER_LEVEL = 10;
export const MIN_FACTS_TO_ADVANCE = 3;
export const SCIENTIFIC_THRESHOLD_DIGITS = 15;
