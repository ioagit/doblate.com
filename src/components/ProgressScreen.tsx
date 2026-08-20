import type { GameProgress } from '../types/game';
import { MAX_EXPONENT } from '../types/game';
import { LEVELS_PATH, levelPath } from '../routes';
import { exactValue, levelNumber } from '../utils/levelCopy';
import { formatPowerOfTwo, shortNumberLabel } from '../utils/numberFormat';
import {
  datosDescubiertos,
  nivelesCompletados,
  pluralize,
} from '../utils/spanish';
import { ArrowRightIcon, CheckIcon, ChartIcon } from './icons';
import { Breadcrumbs } from './Breadcrumbs';
import { Link } from './Link';
import { useSound } from '../hooks/useSound';

interface ProgressScreenProps {
  progress: GameProgress;
  factsDiscovered: number;
}

export const ProgressScreen = ({ progress, factsDiscovered }: ProgressScreenProps) => {
  const play = useSound();
  const unlocked = Array.from(
    { length: Math.min(progress.highestExponentUnlocked, MAX_EXPONENT) + 1 },
    (_, index) => index,
  );

  return (
    <section className="panel" aria-labelledby="progress-title">
      <Breadcrumbs trail={[{ name: 'Inicio', to: '/' }, { name: 'Tu progreso' }]} />

      <h1 id="progress-title" className="page-title">
        Tu progreso
      </h1>

      <div className="progress-grid">
        <div className="stat-card">
          Nivel actual
          <strong>{levelNumber(progress.currentExponent)}</strong>
        </div>
        <div className="stat-card">
          Número más alto
          <strong>{shortNumberLabel(progress.highestExponentUnlocked)}</strong>
        </div>
        <div className="stat-card">
          Completados
          <strong>{nivelesCompletados(progress.completedLevels.length)}</strong>
        </div>
        <div className="stat-card">
          Datos
          <strong>{datosDescubiertos(factsDiscovered)}</strong>
        </div>
        <div className="stat-card">
          Niveles seguidos
          <strong>{pluralize(progress.bestStreak, 'nivel', 'niveles')}</strong>
        </div>
      </div>

      <h2 className="section-title">Números desbloqueados</h2>
      <p className="challenge-prompt">
        Puedes volver a cualquier nivel: cada uno vive en su propia página.
      </p>
      <div className="level-chips" role="list">
        {unlocked.map((exponent) => {
          const completed = progress.completedLevels.includes(exponent);
          const isCurrent = exponent === progress.currentExponent;
          return (
            <Link
              key={exponent}
              to={levelPath(exponent)}
              className={`level-chip${isCurrent ? ' current' : ''}`}
              role="listitem"
              onActivate={() => play('pop')}
              aria-label={`Abrir ${formatPowerOfTwo(exponent)} igual a ${exactValue(exponent)}${completed ? ', completado' : ''}`}
            >
              {shortNumberLabel(exponent)}
              {completed && (
                <span className="chip-check">
                  <CheckIcon />
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="level-actions">
        <Link
          to={levelPath(progress.currentExponent)}
          className="btn btn-primary"
          onActivate={() => play('unlock')}
        >
          Continuar en {formatPowerOfTwo(progress.currentExponent)}
          <span className="btn-badge">
            <ArrowRightIcon />
          </span>
        </Link>
        <Link
          to={LEVELS_PATH}
          className="btn btn-secondary"
          onActivate={() => play('pop')}
        >
          <span className="btn-icon-lead" aria-hidden="true">
            <ChartIcon />
          </span>
          Todas las potencias
        </Link>
      </div>
    </section>
  );
};
