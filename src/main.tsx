import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// Built pages ship prerendered markup; the dev server serves an empty shell.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
