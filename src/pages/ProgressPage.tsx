import type { GameApi } from '../hooks/useGame';
import { ProgressScreen } from '../components/ProgressScreen';

interface ProgressPageProps {
  game: GameApi;
}

export const ProgressPage = ({ game }: ProgressPageProps) => (
  <ProgressScreen progress={game.progress} factsDiscovered={game.factsDiscovered} />
);
