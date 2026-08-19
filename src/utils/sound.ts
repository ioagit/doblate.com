/**
 * Tiny synth built on the Web Audio API. Cues are generated at runtime instead
 * of shipping audio files: they weigh nothing and the bleepy timbre matches the
 * playful visual language better than sampled sounds.
 */

export type SoundCue = 'tap' | 'pop' | 'unlock' | 'double' | 'back' | 'reset';

interface Note {
  /** Starting frequency in Hz */
  freq: number;
  /** Optional glide target, reached at the end of the note */
  to?: number;
  type?: OscillatorType;
  /** Offset from cue start, in seconds */
  at?: number;
  dur?: number;
  gain?: number;
}

const CUES: Record<SoundCue, Note[]> = {
  tap: [{ freq: 660, dur: 0.07, gain: 0.05 }],
  pop: [{ freq: 320, to: 720, dur: 0.13, gain: 0.09 }],
  unlock: [
    { freq: 440, dur: 0.1, gain: 0.08 },
    { freq: 659.25, at: 0.08, dur: 0.18, gain: 0.08 },
  ],
  double: [
    { freq: 523.25, dur: 0.16, gain: 0.08 },
    { freq: 659.25, at: 0.08, dur: 0.16, gain: 0.08 },
    { freq: 783.99, at: 0.16, dur: 0.18, gain: 0.08 },
    { freq: 1046.5, at: 0.24, dur: 0.42, gain: 0.09 },
    { freq: 130.81, at: 0.24, dur: 0.42, gain: 0.05, type: 'sine' },
  ],
  back: [{ freq: 420, to: 240, dur: 0.14, gain: 0.07 }],
  reset: [{ freq: 200, dur: 0.16, gain: 0.05, type: 'square' }],
};

/** Rapid repeats of the same cue stack into noise, so throttle each one. */
const MIN_GAP_MS = 60;
const lastPlayed = new Map<SoundCue, number>();

let context: AudioContext | null = null;

const getContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;

  try {
    context ??= new Ctor();
    // Browsers start the context suspended until a user gesture.
    if (context.state === 'suspended') void context.resume();
    return context;
  } catch {
    return null;
  }
};

export const playCue = (cue: SoundCue): void => {
  const now = Date.now();
  const previous = lastPlayed.get(cue) ?? 0;
  if (now - previous < MIN_GAP_MS) return;
  lastPlayed.set(cue, now);

  const audio = getContext();
  if (!audio) return;

  const start = audio.currentTime;

  for (const note of CUES[cue]) {
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    const at = start + (note.at ?? 0);
    const dur = note.dur ?? 0.12;
    const peak = note.gain ?? 0.08;

    osc.type = note.type ?? 'triangle';
    osc.frequency.setValueAtTime(note.freq, at);
    if (note.to) {
      osc.frequency.exponentialRampToValueAtTime(note.to, at + dur);
    }

    // Exponential ramps need a non-zero floor, hence 0.0001.
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.exponentialRampToValueAtTime(peak, at + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    osc.connect(amp).connect(audio.destination);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }
};
