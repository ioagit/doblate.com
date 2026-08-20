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

export interface PlayerPreferences {
  reduceMotion: boolean | null;
  soundEnabled: boolean;
}

export interface GameProgress {
  version: number;
  /** Furthest level the player reached, used by «continuar». */
  currentExponent: number;
  highestExponentUnlocked: number;
  completedLevels: number[];
  /** Levels whose page has been opened: every fact of a level is on its page. */
  visitedLevels: number[];
  currentStreak: number;
  bestStreak: number;
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

export const STORAGE_VERSION = 2;
export const STORAGE_KEY = 'doblate-progress-v2';
/** Pre-pages schema, read once to carry old saves over. */
export const LEGACY_STORAGE_KEY = 'doblate-progress-v1';
export const FACTS_PER_LEVEL = 10;
/** Last level with a page of its own: 2³⁰ = 1 073 741 824. */
export const MAX_EXPONENT = 30;
export const SCIENTIFIC_THRESHOLD_DIGITS = 15;
