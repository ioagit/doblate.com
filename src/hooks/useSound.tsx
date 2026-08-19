import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { playCue, type SoundCue } from '../utils/sound';

type PlaySound = (cue: SoundCue) => void;

const noop: PlaySound = () => {};

const SoundContext = createContext<PlaySound>(noop);

interface SoundProviderProps {
  enabled: boolean;
  children: ReactNode;
}

/** For components that own the preference and sit outside the provider. */
export const useSoundEffect = (enabled: boolean): PlaySound =>
  useCallback<PlaySound>(
    (cue) => {
      if (!enabled) return;
      playCue(cue);
    },
    [enabled],
  );

/**
 * Shares a single `play` function with the whole screen tree so components do
 * not have to thread the sound preference through props.
 */
export const SoundProvider = ({ enabled, children }: SoundProviderProps) => {
  const play = useSoundEffect(enabled);

  return <SoundContext.Provider value={play}>{children}</SoundContext.Provider>;
};

export const useSound = (): PlaySound => useContext(SoundContext);
