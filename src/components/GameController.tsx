import { useCallback, useMemo } from 'react';
import { useGame } from '../hooks/useGame';
import { getOrderedFacts } from '../utils/factEngine';
import { formatLevelNumber } from '../utils/numberFormat';
import { MIN_FACTS_TO_ADVANCE } from '../types/game';
import { pluralize } from '../utils/spanish';
import { HomeScreen } from './HomeScreen';
import { NumberDisplay } from './NumberDisplay';
import { FactCarousel } from './FactCarousel';
import { DoublingAnimation } from './DoublingAnimation';
import { ProgressScreen } from './ProgressScreen';
import {
  ArrowRightIcon,
  FlameIcon,
  HomeIcon,
  SoundOffIcon,
  SoundOnIcon,
  StarIcon,
} from './icons';
import { SoundProvider, useSoundEffect } from '../hooks/useSound';
import { playCue } from '../utils/sound';

export const GameController = () => {
  const game = useGame();
  const {
    progress,
    screen,
    viewingExponent,
    canAdvance,
    isRevisit,
    isDoubling,
    doublingFrom,
    hasProgress,
    storageNotice,
  } = game;

  const factOrderKey = String(viewingExponent);
  const factOrderSignature =
    progress.factOrders[factOrderKey]?.join(',') ?? '0,1,2,3,4,5,6,7,8,9';

  const facts = useMemo(() => {
    const order = factOrderSignature.split(',').map(Number);
    return getOrderedFacts(viewingExponent, order);
  }, [viewingExponent, factOrderSignature]);

  const factPosition = progress.factPositions[factOrderKey] ?? 0;
  const viewed = progress.factsViewed[factOrderKey]?.length ?? 0;
  const formatted = formatLevelNumber(viewingExponent);
  const reduceMotion = progress.preferences.reduceMotion === true;
  // Older saves may predate the preference, so treat anything but false as on.
  const soundEnabled = progress.preferences.soundEnabled !== false;
  const alreadyCompleted = progress.completedLevels.includes(viewingExponent);

  const handlePositionChange = useCallback(
    (index: number) => {
      game.setFactPosition(viewingExponent, index);
    },
    [game.setFactPosition, viewingExponent],
  );

  const handleFactViewed = useCallback(
    (index: number) => {
      game.markFactViewed(viewingExponent, index);
    },
    [game.markFactViewed, viewingExponent],
  );

  const play = useSoundEffect(soundEnabled);

  const handleGoHome = useCallback(() => {
    play('back');
    game.goHome();
  }, [game.goHome, play]);

  const handleGoProgress = useCallback(() => {
    play('pop');
    game.goProgress();
  }, [game.goProgress, play]);

  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    // Play straight from the engine: the provider is still muted at this point.
    if (next) playCue('pop');
    game.updatePreferences({ soundEnabled: next });
  }, [game.updatePreferences, soundEnabled]);

  return (
    <SoundProvider enabled={soundEnabled}>
      <div className={`app-shell${reduceMotion ? ' reduce-motion' : ''}`}>
        <header className="app-header">
          <div className="header-side">
            {screen !== 'home' && (
              <button
                type="button"
                className="btn btn-icon"
                onClick={handleGoHome}
                aria-label="Ir al inicio de Dóblate"
                title="Inicio"
              >
                <HomeIcon />
              </button>
            )}
            <p className="level-badge">
              <span className="level-badge-star" aria-hidden="true">
                <StarIcon size={12} />
              </span>
              <span aria-label="dos elevado a n">2ⁿ</span>
            </p>
          </div>

          <div className="header-side">
            <button type="button" className="meter" onClick={handleGoProgress}>
              <span className="meter-icon" aria-hidden="true">
                <FlameIcon />
              </span>
              <span className="meter-label">Progreso</span>
            </button>
            <button
              type="button"
              className="btn btn-icon"
              onClick={handleToggleSound}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            >
              {soundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
            </button>
          </div>
        </header>

        <main>
          {screen === 'home' && (
            <HomeScreen
              hasProgress={hasProgress}
              storageNotice={storageNotice}
              onContinue={game.continueGame}
              onStartFresh={game.startFresh}
              onProgress={game.goProgress}
              onDismissNotice={game.dismissStorageNotice}
            />
          )}

          {screen === 'level' && (
            <div className={`panel${isDoubling ? ' panel-doubling' : ''}`}>
              {isDoubling && doublingFrom !== null ? (
                <DoublingAnimation
                  fromExponent={doublingFrom}
                  reduceMotion={reduceMotion}
                  onFinished={game.finishDoubling}
                />
              ) : (
                <>
                  <NumberDisplay formatted={formatted} exponent={viewingExponent} />
                  <div className="progress-pills" aria-label="Resumen del nivel">
                    <span className="pill">
                      {pluralize(viewed, 'dato visto', 'datos vistos')}
                    </span>
                    <span className="pill">
                      Racha: {pluralize(progress.currentStreak, 'nivel', 'niveles')}
                    </span>
                    {isRevisit && <span className="pill">Revisitando</span>}
                  </div>

                  <FactCarousel
                    facts={facts}
                    position={Math.min(factPosition, Math.max(facts.length - 1, 0))}
                    onPositionChange={handlePositionChange}
                    onFactViewed={handleFactViewed}
                  />

                  <div className="level-actions">
                    {alreadyCompleted && isRevisit ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleGoProgress}
                      >
                        Volver al progreso
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={game.completeLevel}
                        disabled={!canAdvance}
                        aria-describedby="advance-hint"
                      >
                        ¡Dóblate!
                        <span className="btn-badge">
                          <ArrowRightIcon />
                        </span>
                      </button>
                    )}
                  </div>
                  {!canAdvance && (
                    <p id="advance-hint" className="challenge-lock">
                      Mira al menos {MIN_FACTS_TO_ADVANCE} datos sobre este número para
                      continuar ({viewed} de {MIN_FACTS_TO_ADVANCE}).
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {screen === 'progress' && (
            <ProgressScreen
              progress={progress}
              onOpenLevel={(exponent) => {
                const revisit =
                  progress.completedLevels.includes(exponent) ||
                  exponent !== progress.currentExponent;
                game.openLevel(exponent, revisit || exponent < progress.currentExponent);
              }}
              onHome={game.goHome}
              onContinue={game.continueGame}
            />
          )}
        </main>
      </div>
    </SoundProvider>
  );
};
