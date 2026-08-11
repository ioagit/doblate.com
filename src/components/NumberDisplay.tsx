import type { FormattedNumber } from '../types/game';
import { pluralize } from '../utils/spanish';

interface NumberDisplayProps {
  formatted: FormattedNumber;
  exponent: number;
  levelLabel?: string;
}

export const NumberDisplay = ({
  formatted,
  exponent,
  levelLabel,
}: NumberDisplayProps) => (
  <section className="number-display" aria-labelledby="level-number">
    <div className="number-power" aria-label={`Potencia de dos: ${formatted.power}`}>
      <span>{formatted.power}</span>
      <span aria-hidden="true">·</span>
      <span>{pluralize(formatted.digits, 'dígito', 'dígitos')}</span>
    </div>
    <h1 id="level-number" className="number-value">
      {formatted.display}
    </h1>
    <p className="number-meta">
      {levelLabel ?? `Nivel ${exponent + 1}`}
      {' — '}
      {formatted.scaleExplanation}
    </p>
  </section>
);
