import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { normalizePath, parseRoute, type Route } from '../routes';

interface RouterValue {
  path: string;
  route: Route;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

interface RouterProviderProps {
  /** Server-rendered path, so the first client render matches the HTML. */
  initialPath: string;
  children: ReactNode;
}

export const RouterProvider = ({ initialPath, children }: RouterProviderProps) => {
  const [path, setPath] = useState(() => normalizePath(initialPath));

  useEffect(() => {
    const syncFromLocation = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = normalizePath(to);
    setPath((current) => {
      if (current === next) return current;
      window.history.pushState({}, '', next);
      window.scrollTo({ top: 0, left: 0 });
      return next;
    });
  }, []);

  const value = useMemo<RouterValue>(
    () => ({ path, route: parseRoute(path), navigate }),
    [path, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = (): RouterValue => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter debe usarse dentro de RouterProvider');
  }
  return context;
};
