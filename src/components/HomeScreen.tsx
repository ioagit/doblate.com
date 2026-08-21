import { useState } from 'react';
import type { StorageNotice } from '../hooks/useGame';
import { useRouter } from '../hooks/useRouter';
import { PROGRESS_PATH, levelPath } from '../routes';
import {
  ArrowRightIcon,
  BoltIcon,
  ChartIcon,
  LockIcon,
  RefreshIcon,
  StarIcon,
} from './icons';
import { Link } from './Link';
import { useSound } from '../hooks/useSound';

const TRAIL = ['1', '2', '4', '8', '16'];

interface HomeScreenProps {
  hasProgress: boolean;
  currentExponent: number;
  storageNotice: StorageNotice;
  onStartFresh: () => void;
  onDismissNotice: () => void;
}

export const HomeScreen = ({
  hasProgress,
  currentExponent,
  storageNotice,
  onStartFresh,
  onDismissNotice,
}: HomeScreenProps) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const { navigate } = useRouter();
  const play = useSound();

  return (
    <section className="panel home-hero" aria-labelledby="home-title">
      {storageNotice && (
        <div className="notice" role="status">
          {storageNotice === 'unavailable'
            ? 'No se pudo acceder al almacenamiento local. Podrás jugar, pero el progreso no se guardará.'
            : 'El progreso guardado estaba dañado y se reinició con cuidado.'}
          <div className="level-actions">
            <button type="button" className="btn btn-ghost" onClick={onDismissNotice}>
              Entendido
            </button>
          </div>
        </div>
      )}

      <p className="kicker">
        <span className="kicker-icon" aria-hidden="true">
          <BoltIcon />
        </span>
        El juego de duplicar
      </p>
      <h1 id="home-title" className="home-title">
        Dó<span>blate</span>
      </h1>

      <div className="doubling-trail" aria-hidden="true">
        {TRAIL.map((value) => (
          <span key={value} className="trail-bubble">
            {value}
            <span className="trail-stars">
              <StarIcon size={9} />
              <StarIcon size={11} />
              <StarIcon size={9} />
            </span>
          </span>
        ))}
        <span className="trail-bubble trail-bubble-locked">
          <LockIcon />
          <span className="trail-dots">•••</span>
        </span>
      </div>

      <p className="home-lead">
        Empieza en 1. Cada nivel te enseña un número con datos curiosos. Cuando explores
        unos cuantos, el número se dobla.
        <strong className="lead-highlight">
          El crecimiento exponencial, jugado a tu ritmo.
        </strong>
      </p>

      <div className="home-actions">
        {hasProgress ? (
          <>
            <Link
              to={levelPath(currentExponent)}
              className="btn btn-primary"
              onActivate={() => play('unlock')}
            >
              Continuar partida
              <span className="btn-badge">
                <ArrowRightIcon />
              </span>
            </Link>
            <Link
              to={PROGRESS_PATH}
              className="btn btn-secondary"
              onActivate={() => play('pop')}
            >
              <span className="btn-icon-lead" aria-hidden="true">
                <ChartIcon />
              </span>
              Ver progreso
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                play('back');
                setConfirmReset(true);
              }}
            >
              <RefreshIcon />
              Empezar de nuevo
            </button>
          </>
        ) : (
          <Link
            to={levelPath(0)}
            className="btn btn-primary"
            onActivate={() => play('unlock')}
          >
            Empezar
            <span className="btn-badge">
              <ArrowRightIcon />
            </span>
          </Link>
        )}
      </div>

      {confirmReset && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setConfirmReset(false)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="reset-title">¿Empezar de nuevo?</h2>
            <p>
              Se borrará tu progreso guardado en este dispositivo. Esta acción no se puede
              deshacer.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setConfirmReset(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  play('reset');
                  setConfirmReset(false);
                  onStartFresh();
                  navigate(levelPath(0));
                }}
              >
                Sí, borrar y empezar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
