import { LEVELS_PATH, levelPath } from '../routes';
import { MAX_EXPONENT } from '../types/game';
import { formatPowerOfTwo } from '../utils/numberFormat';
import { Link } from '../components/Link';
import { ArrowRightIcon } from '../components/icons';

export const NotFoundPage = () => (
  <section className="panel" aria-labelledby="notfound-title">
    <h1 id="notfound-title" className="page-title">
      Esta página no existe
    </h1>
    <p className="level-intro">
      Dóblate tiene una página por cada potencia de dos, de 2⁰ hasta{' '}
      {formatPowerOfTwo(MAX_EXPONENT)}. La dirección que has abierto no es ninguna de
      ellas.
    </p>
    <div className="level-actions">
      <Link to={levelPath(0)} className="btn btn-primary">
        Empezar en 2⁰ = 1
        <span className="btn-badge">
          <ArrowRightIcon />
        </span>
      </Link>
      <Link to={LEVELS_PATH} className="btn btn-secondary">
        Ver todas las potencias
      </Link>
    </div>
  </section>
);
