import type { GameApi } from '../hooks/useGame';
import { HomeScreen } from '../components/HomeScreen';

interface HomePageProps {
  game: GameApi;
}

export const HomePage = ({ game }: HomePageProps) => (
  <HomeScreen
    hasProgress={game.hasProgress}
    currentExponent={game.progress.currentExponent}
    storageNotice={game.storageNotice}
    onStartFresh={game.startFresh}
    onDismissNotice={game.dismissStorageNotice}
  />
);
