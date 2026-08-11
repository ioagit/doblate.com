import { useState } from 'react';
import type { StorageNotice } from '../hooks/useGame';

interface HomeScreenProps {
  hasProgress: boolean;
  storageNotice: StorageNotice;
  onContinue: () => void;
  onStartFresh: () => void;
  onProgress: () => void;
  onDismissNotice: () => void;
}

export const HomeScreen = ({
  hasProgress,
  storageNotice,
  onContinue,
  onStartFresh,
  onProgress,
  onDismissNotice,
}: HomeScreenProps) => {
  const [confirmReset, setConfirmReset] = useState(false);

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

      <h1 id="home-title" className="home-title">
        Dó<span>blate</span>
      </h1>
      <p className="home-lead">
        Empieza en 1. Cada nivel te enseña un número con datos curiosos. Cuando explores
        unos cuantos, el número se dobla. El crecimiento exponencial, jugado a tu ritmo.
      </p>

      <div className="home-actions">
        {hasProgress ? (
          <>
            <button type="button" className="btn btn-primary" onClick={onContinue}>
              Continuar partida
            </button>
            <button type="button" className="btn btn-secondary" onClick={onProgress}>
              Ver progreso
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmReset(true)}
            >
              Empezar de nuevo
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onStartFresh}>
            Empezar
          </button>
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
                  setConfirmReset(false);
                  onStartFresh();
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
