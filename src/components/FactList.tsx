import type { Fact } from '../types/game';
import { categoryLabel } from '../utils/spanish';

interface FactListProps {
  facts: Fact[];
  labelledBy?: string;
}

/** Every fact of a level, rendered in the page instead of behind a carousel. */
export const FactList = ({ facts, labelledBy }: FactListProps) => (
  <ol className="fact-list" aria-labelledby={labelledBy}>
    {facts.map((fact, index) => (
      <li key={fact.id} className="fact-item">
        <article>
          <p className="fact-item-head">
            <span className="fact-index" aria-hidden="true">
              {index + 1}
            </span>
            <span className="fact-category">{categoryLabel(fact.category)}</span>
          </p>
          <p className="fact-text">{fact.text}</p>
        </article>
      </li>
    ))}
  </ol>
);
