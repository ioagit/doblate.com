import { AppShell } from './components/AppShell';
import { RouterProvider } from './hooks/useRouter';

interface AppProps {
  /** Path the page was requested with, so server and client agree on the route. */
  initialPath: string;
}

const App = ({ initialPath }: AppProps) => (
  <RouterProvider initialPath={initialPath}>
    <AppShell />
  </RouterProvider>
);

export default App;
