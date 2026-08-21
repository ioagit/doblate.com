import { useCallback, useMemo } from 'react';
import { useGame } from '../hooks/useGame';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useRouter } from '../hooks/useRouter';
import { SoundProvider, useSoundEffect } from '../hooks/useSound';
import { metaForRoute } from '../seo';
import { LEVELS_PATH, PROGRESS_PATH, levelPath } from '../routes';
import { MAX_EXPONENT } from '../types/game';
import { playCue } from '../utils/sound';
import { HomePage } from '../pages/HomePage';
import { LevelPage } from '../pages/LevelPage';
import { LevelsIndexPage } from '../pages/LevelsIndexPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProgressPage } from '../pages/ProgressPage';
import { Link } from './Link';
import { FlameIcon, HomeIcon, SoundOffIcon, SoundOnIcon, StarIcon } from './icons';

export const AppShell = () => {
  const { route } = useRouter();
  const game = useGame();
  const meta = useMemo(() => metaForRoute(route), [route]);
  useDocumentMeta(meta);

  const reduceMotion = game.progress.preferences.reduceMotion === true;
  // Older saves may predate the preference, so treat anything but false as on.
  const soundEnabled = game.progress.preferences.soundEnabled !== false;
  const play = useSoundEffect(soundEnabled);

  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    // Play straight from the engine: the provider is still muted at this point.
    if (next) playCue('pop');
    game.updatePreferences({ soundEnabled: next });
  }, [game, soundEnabled]);

  return (
    <SoundProvider enabled={soundEnabled}>
      <div className={`app-shell${reduceMotion ? ' reduce-motion' : ''}${route.kind === 'home' ? ' app-shell-home' : ''}`}>
        <header className="app-header">
          <div className="header-side">
            {route.kind !== 'home' && (
              <Link
                to="/"
                className="btn btn-icon"
                aria-label="Ir al inicio de Dóblate"
                title="Inicio"
                onActivate={() => play('back')}
              >
                <HomeIcon />
              </Link>
            )}
            <Link
              to={LEVELS_PATH}
              className="level-badge"
              title="Todas las potencias de dos"
              onActivate={() => play('tap')}
            >
              <span className="level-badge-star" aria-hidden="true">
                <StarIcon size={12} />
              </span>
              <span>2ⁿ</span>
            </Link>
          </div>

          <div className="header-side">
            <Link
              to={PROGRESS_PATH}
              className="meter"
              onActivate={() => play('pop')}
            >
              <span className="meter-icon" aria-hidden="true">
                <FlameIcon />
              </span>
              <span className="meter-label">Progreso</span>
            </Link>
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
          {route.kind === 'home' && <HomePage game={game} />}
          {route.kind === 'level' && (
            <LevelPage key={route.exponent} exponent={route.exponent} game={game} />
          )}
          {route.kind === 'levels' && <LevelsIndexPage game={game} />}
          {route.kind === 'progress' && <ProgressPage game={game} />}
          {route.kind === 'notFound' && <NotFoundPage />}
        </main>

        <footer className="app-footer">
          <nav aria-label="Enlaces del sitio">
            <Link to="/">Inicio</Link>
            <Link to={LEVELS_PATH}>Potencias de dos</Link>
            <Link to={levelPath(0)}>Primer nivel</Link>
            <Link to={levelPath(MAX_EXPONENT)}>Último nivel</Link>
          </nav>
          <p>Dóblate — el crecimiento exponencial, un nivel cada vez.</p>
        </footer>
      </div>
    </SoundProvider>
  );
};
