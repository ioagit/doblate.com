import { useEffect, useRef } from 'react';
import { formatLevelNumber, shortNumberLabel } from '../utils/numberFormat';
import { pickSuccessMessage } from '../utils/spanish';
import { useSound } from '../hooks/useSound';

interface DoublingAnimationProps {
  fromExponent: number;
  reduceMotion: boolean;
  onFinished: () => void;
}

const ANIMATION_MS = 2200;
const REDUCED_MS = 400;

export const DoublingAnimation = ({
  fromExponent,
  reduceMotion,
  onFinished,
}: DoublingAnimationProps) => {
  const from = formatLevelNumber(fromExponent);
  const to = formatLevelNumber(fromExponent + 1);
  const message = pickSuccessMessage(fromExponent + from.digits);
  const finishedRef = useRef(false);
  const onFinishedRef = useRef(onFinished);
  const play = useSound();

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    finishedRef.current = false;
    play('double');
    const duration = reduceMotion ? REDUCED_MS : ANIMATION_MS;
    const timer = window.setTimeout(() => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onFinishedRef.current();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [fromExponent, play, reduceMotion]);

  return (
    <div
      className="doubling-overlay"
      role="status"
      aria-live="polite"
      aria-label={`${shortNumberLabel(fromExponent)} se convierte en ${shortNumberLabel(fromExponent + 1)}`}
    >
      <div className="complete-burst" aria-hidden="true" />
      <p className="complete-message">{message}</p>
      <div className="double-transform">
        <span className="from">{shortNumberLabel(fromExponent)}</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
        <span className="to">{shortNumberLabel(fromExponent + 1)}</span>
      </div>
      <p className="number-meta">
        {from.power} se convierte en {to.power}. El crecimiento exponencial no pide permiso.
      </p>
    </div>
  );
};
