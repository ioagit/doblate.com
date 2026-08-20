import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import type { GameApi } from '../hooks/useGame';
import { useRouter } from '../hooks/useRouter';
import { useSound } from '../hooks/useSound';
import { LEVELS_PATH, levelPath } from '../routes';
import { FACTS_PER_LEVEL, MAX_EXPONENT } from '../types/game';
import { getFactsForLevel } from '../utils/factEngine';
import {
  exactValue,
  levelFaq,
  levelHeading,
  levelIntro,
  levelNumber,
} from '../utils/levelCopy';
import { formatLevelNumber, formatPowerOfTwo } from '../utils/numberFormat';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DoublingAnimation } from '../components/DoublingAnimation';
import { FactList } from '../components/FactList';
import { Link } from '../components/Link';
import { NumberDisplay } from '../components/NumberDisplay';
import { ArrowRightIcon, CheckIcon, ChartIcon } from '../components/icons';

interface LevelPageProps {
  exponent: number;
  game: GameApi;
}

const TOTAL_LEVELS = MAX_EXPONENT + 1;

export const LevelPage = ({ exponent, game }: LevelPageProps) => {
  const { navigate } = useRouter();
  const play = useSound();
  const [doubling, setDoubling] = useState(false);

  const facts = useMemo(() => getFactsForLevel(exponent), [exponent]);
  const faq = useMemo(() => levelFaq(exponent), [exponent]);
  const formatted = formatLevelNumber(exponent);
  const value = exactValue(exponent);

  const { hydrated, visitLevel, completeLevel } = game;
  const completed = game.progress.completedLevels.includes(exponent);
  const nextExponent = exponent < MAX_EXPONENT ? exponent + 1 : null;
  const previousExponent = exponent > 0 ? exponent - 1 : null;

  useEffect(() => {
    setDoubling(false);
  }, [exponent]);

  // Runs once the saved game is in memory, so a visit is never overwritten.
  useEffect(() => {
    if (!hydrated) return;
    visitLevel(exponent);
  }, [hydrated, exponent, visitLevel]);

  const handleDouble = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (nextExponent === null) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      completeLevel(exponent);
      setDoubling(true);
    },
    [completeLevel, exponent, nextExponent],
  );

  const finishDoubling = useCallback(() => {
    if (nextExponent === null) return;
    navigate(levelPath(nextExponent));
  }, [navigate, nextExponent]);

  if (doubling && nextExponent !== null) {
    return (
      <div className="panel panel-doubling">
        <DoublingAnimation
          fromExponent={exponent}
          reduceMotion={game.progress.preferences.reduceMotion === true}
          onFinished={finishDoubling}
        />
      </div>
    );
  }

  return (
    <article className="panel level-page">
      <Breadcrumbs
        trail={[
          { name: 'Inicio', to: '/' },
          { name: 'Potencias de dos', to: LEVELS_PATH },
          { name: levelHeading(exponent) },
        ]}
      />

      <NumberDisplay
        formatted={formatted}
        exponent={exponent}
        levelLabel={`Nivel ${levelNumber(exponent)} de ${TOTAL_LEVELS}`}
      />

      <p className="level-intro">{levelIntro(exponent)}</p>

      <div className="progress-pills" aria-label="Resumen del nivel">
        <span className="pill">{FACTS_PER_LEVEL} datos</span>
        <span className="pill">
          Nivel {levelNumber(exponent)} de {TOTAL_LEVELS}
        </span>
        {completed && (
          <span className="pill pill-done">
            <CheckIcon />
            Completado
          </span>
        )}
      </div>

      <h2 id="facts-title" className="section-title">
        {FACTS_PER_LEVEL} datos sobre {value}
      </h2>
      <FactList facts={facts} labelledBy="facts-title" />

      <div className="level-actions">
        {nextExponent !== null ? (
          <a
            href={levelPath(nextExponent)}
            className="btn btn-primary"
            onClick={handleDouble}
          >
            ¡Dóblate! Ve a {formatPowerOfTwo(nextExponent)}
            <span className="btn-badge">
              <ArrowRightIcon />
            </span>
          </a>
        ) : (
          <Link
            to={LEVELS_PATH}
            className="btn btn-primary"
            onActivate={() => play('unlock')}
          >
            Has llegado al final: ver los {TOTAL_LEVELS} niveles
            <span className="btn-badge">
              <ArrowRightIcon />
            </span>
          </Link>
        )}
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

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Preguntas frecuentes sobre {value}
        </h2>
        <dl>
          {faq.map((entry) => (
            <div className="faq-item" key={entry.question}>
              <dt>{entry.question}</dt>
              <dd>{entry.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav className="level-nav" aria-label="Niveles contiguos">
        {previousExponent !== null ? (
          <Link
            to={levelPath(previousExponent)}
            className="level-nav-link"
            rel="prev"
            onActivate={() => play('tap')}
          >
            <span className="level-nav-hint">Anterior</span>
            <span className="level-nav-value">{levelHeading(previousExponent)}</span>
          </Link>
        ) : (
          <span />
        )}
        {nextExponent !== null ? (
          <Link
            to={levelPath(nextExponent)}
            className="level-nav-link level-nav-next"
            rel="next"
            onActivate={() => play('tap')}
          >
            <span className="level-nav-hint">Siguiente</span>
            <span className="level-nav-value">{levelHeading(nextExponent)}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
};
