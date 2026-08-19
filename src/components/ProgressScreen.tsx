import type { GameProgress } from '../types/game';
import { shortNumberLabel } from '../utils/numberFormat';
import {
  datosDescubiertos,
  nivelesCompletados,
  pluralize,
} from '../utils/spanish';
import { ArrowRightIcon, CheckIcon, HomeIcon } from './icons';
import { useSound } from '../hooks/useSound';

interface ProgressScreenProps {
  progress: GameProgress;
  onOpenLevel: (exponent: number) => void;
  onHome: () => void;
  onContinue: () => void;
}

export const ProgressScreen = ({
  progress,
  onOpenLevel,
  onHome,
  onContinue,
}: ProgressScreenProps) => {
  const play = useSound();
  const factsDiscovered = Object.values(progress.factsViewed).reduce(
    (sum, list) => sum + list.length,
    0,
  );

  const unlocked = Array.from(
    { length: progress.highestExponentUnlocked + 1 },
    (_, i) => i,
  );

  return (
    <section className="panel" aria-labelledby="progress-title">
      <h2 id="progress-title" className="progress-title">
        Tu progreso
      </h2>

      <div className="progress-grid">
        <div className="stat-card">
          Nivel actual
          <strong>{progress.currentExponent + 1}</strong>
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

      <h3 className="progress-subtitle">Números desbloqueados</h3>
      <p className="challenge-prompt">
        Puedes revisitar cualquier nivel desbloqueado para explorar sus datos.
      </p>
      <div className="level-chips" role="list">
        {unlocked.map((exponent) => {
          const completed = progress.completedLevels.includes(exponent);
          const isCurrent = exponent === progress.currentExponent;
          return (
            <button
              key={exponent}
              type="button"
              className={`level-chip${isCurrent ? ' current' : ''}`}
              role="listitem"
              onClick={() => {
                play('pop');
                onOpenLevel(exponent);
              }}
              aria-label={`Abrir nivel ${shortNumberLabel(exponent)}${completed ? ', completado' : ''}`}
            >
              {shortNumberLabel(exponent)}
              {completed && (
                <span className="chip-check">
                  <CheckIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="level-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            play('unlock');
            onContinue();
          }}
        >
          Continuar partida
          <span className="btn-badge">
            <ArrowRightIcon />
          </span>
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            play('back');
            onHome();
          }}
        >
          <span className="btn-icon-lead" aria-hidden="true">
            <HomeIcon />
          </span>
          Inicio
        </button>
      </div>
    </section>
  );
};
