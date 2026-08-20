import { Link } from './Link';

export interface Crumb {
  name: string;
  to?: string;
}

interface BreadcrumbsProps {
  trail: Crumb[];
}

export const Breadcrumbs = ({ trail }: BreadcrumbsProps) => (
  <nav className="breadcrumbs" aria-label="Ruta de navegación">
    <ol>
      {trail.map((crumb) => (
        <li key={crumb.name}>
          {crumb.to ? (
            <Link to={crumb.to}>{crumb.name}</Link>
          ) : (
            <span aria-current="page">{crumb.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
