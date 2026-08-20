import type { GameApi } from '../hooks/useGame';
import { useSound } from '../hooks/useSound';
import { LEVELS_PATH, levelPath } from '../routes';
import { MAX_EXPONENT } from '../types/game';
import { exactValue } from '../utils/levelCopy';
import { formatPowerOfTwo } from '../utils/numberFormat';
import { HomeScreen } from '../components/HomeScreen';
import { Link } from '../components/Link';

interface HomePageProps {
  game: GameApi;
}

const STARTER_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7];
const MILESTONE_LEVELS = [8, 10, 16, 20, 24, 30];

export const HomePage = ({ game }: HomePageProps) => {
  const play = useSound();

  return (
    <>
      <HomeScreen
        hasProgress={game.hasProgress}
        currentExponent={game.progress.currentExponent}
        storageNotice={game.storageNotice}
        onStartFresh={game.startFresh}
        onDismissNotice={game.dismissStorageNotice}
      />

      <section className="panel home-intro" aria-labelledby="about-title">
        <h2 id="about-title" className="section-title">
          Qué es Dóblate
        </h2>
        <p>
          Dóblate es un juego educativo sobre el crecimiento exponencial. Empiezas en 1
          y, nivel a nivel, doblas el número hasta {exactValue(MAX_EXPONENT)}. Cada uno
          de los {MAX_EXPONENT + 1} niveles tiene su propia página con el valor exacto de
          la potencia, diez datos curiosos y las preguntas más habituales sobre ese
          número.
        </p>
        <p>
          Doblar parece inofensivo al principio: del 1 al 2, del 2 al 4. Pero treinta
          duplicaciones después estás en mil millones. Esa es la idea que el juego intenta
          volver intuitiva.
        </p>

        <h2 className="section-title">Empieza por el principio</h2>
        <ul className="quick-links">
          {STARTER_LEVELS.map((exponent) => (
            <li key={exponent}>
              <Link to={levelPath(exponent)} onActivate={() => play('tap')}>
                {formatPowerOfTwo(exponent)} = {exactValue(exponent)}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="section-title">Los números que todo el mundo busca</h2>
        <ul className="quick-links">
          {MILESTONE_LEVELS.map((exponent) => (
            <li key={exponent}>
              <Link to={levelPath(exponent)} onActivate={() => play('tap')}>
                {formatPowerOfTwo(exponent)} = {exactValue(exponent)}
              </Link>
            </li>
          ))}
        </ul>

        <p>
          <Link to={LEVELS_PATH} onActivate={() => play('pop')}>
            Ver la tabla completa de potencias de dos
          </Link>
        </p>
      </section>
    </>
  );
};
