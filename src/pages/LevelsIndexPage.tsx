import type { GameApi } from '../hooks/useGame';
import { useSound } from '../hooks/useSound';
import { ALL_EXPONENTS, levelPath } from '../routes';
import { MAX_EXPONENT } from '../types/game';
import { exactValue, levelNumber } from '../utils/levelCopy';
import { formatPowerOfTwo } from '../utils/numberFormat';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../components/Link';
import { ArrowRightIcon, CheckIcon } from '../components/icons';

interface LevelsIndexPageProps {
  game: GameApi;
}

export const LevelsIndexPage = ({ game }: LevelsIndexPageProps) => {
  const play = useSound();
  const { completedLevels, currentExponent } = game.progress;

  return (
    <article className="panel">
      <Breadcrumbs
        trail={[{ name: 'Inicio', to: '/' }, { name: 'Potencias de dos' }]}
      />

      <h1 className="page-title">
        Las potencias de dos, de 1 a {exactValue(MAX_EXPONENT)}
      </h1>
      <p className="level-intro">
        Cada potencia de dos tiene su propia página con su valor exacto y diez datos
        para entender su tamaño. Empieza en 2⁰ = 1 y dobla el número {MAX_EXPONENT}{' '}
        veces hasta llegar a {formatPowerOfTwo(MAX_EXPONENT)}.
      </p>

      <div className="level-actions">
        <Link
          to={levelPath(currentExponent)}
          className="btn btn-primary"
          onActivate={() => play('unlock')}
        >
          Jugar desde {formatPowerOfTwo(currentExponent)}
          <span className="btn-badge">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>

      <div className="table-scroll">
        <table className="levels-table">
          <caption className="sr-only">
            Tabla de las potencias de dos de 2⁰ a {formatPowerOfTwo(MAX_EXPONENT)} con
            su valor exacto
          </caption>
          <thead>
            <tr>
              <th scope="col">Potencia</th>
              <th scope="col">Valor</th>
              <th scope="col">Nivel</th>
            </tr>
          </thead>
          <tbody>
            {ALL_EXPONENTS.map((exponent) => (
              <tr key={exponent}>
                <th scope="row">
                  <Link to={levelPath(exponent)} onActivate={() => play('tap')}>
                    {formatPowerOfTwo(exponent)}
                  </Link>
                </th>
                <td>{exactValue(exponent)}</td>
                <td>
                  {levelNumber(exponent)}
                  {completedLevels.includes(exponent) && (
                    <span className="chip-check" title="Completado">
                      <CheckIcon />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
