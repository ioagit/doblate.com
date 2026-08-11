import type { GameProgress } from '../types/game';
import { shortNumberLabel } from '../utils/numberFormat';
import {
  datosDescubiertos,
  nivelesCompletados,
  pluralize,
} from '../utils/spanish';

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
      <h2 id="progress-title" style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>
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

      <h3 style={{ marginBottom: '0.75rem' }}>Números desbloqueados</h3>
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
              onClick={() => onOpenLevel(exponent)}
              aria-label={`Abrir nivel ${shortNumberLabel(exponent)}${completed ? ', completado' : ''}`}
            >
              {shortNumberLabel(exponent)}
            </button>
          );
        })}
      </div>

      <div className="level-actions">
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continuar partida
        </button>
        <button type="button" className="btn btn-secondary" onClick={onHome}>
          Inicio
        </button>
      </div>
    </section>
  );
};
