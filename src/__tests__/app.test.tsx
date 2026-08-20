import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { levelPath } from '../routes';
import { FACTS_PER_LEVEL } from '../types/game';

const openPath = (path: string) => {
  window.history.pushState({}, '', path);
  return render(<App initialPath={path} />);
};

describe('level pages', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('puts every fact of the level in the page', () => {
    openPath(levelPath(17));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '2¹⁷ = 131.072',
    );

    const list = screen.getByRole('list', { name: /10 datos sobre 131\.072/ });
    expect(within(list).getAllByRole('listitem')).toHaveLength(FACTS_PER_LEVEL);
    expect(
      screen.getByText(/El Macintosh 128K de 1984 tenía 131 072 bytes/),
    ).toBeInTheDocument();
  });

  it('links to the neighbouring levels with real hrefs', () => {
    openPath(levelPath(17));

    expect(screen.getByRole('link', { name: /Anterior/ })).toHaveAttribute(
      'href',
      '/2-elevado-a-16/',
    );
    expect(screen.getByRole('link', { name: /Siguiente/ })).toHaveAttribute(
      'href',
      '/2-elevado-a-18/',
    );
  });

  it('navigates to the next level without a page load', async () => {
    const user = userEvent.setup();
    openPath(levelPath(3));

    await user.click(screen.getByRole('link', { name: /Siguiente/ }));

    expect(window.location.pathname).toBe('/2-elevado-a-4/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('2⁴ = 16');
  });

  it('answers the search question in the page body', () => {
    openPath(levelPath(10));
    expect(screen.getByText('¿Cuánto es 2 elevado a 10?')).toBeInTheDocument();
    expect(
      screen.getByText(/2¹⁰ es 1\.024\. Es el resultado de multiplicar 2/),
    ).toBeInTheDocument();
  });

  it('shows a not found page for an unplayable level', () => {
    openPath('/2-elevado-a-99/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Esta página no existe',
    );
  });

  it('hydrates the prerendered markup without mismatches', async () => {
    const path = levelPath(5);
    window.history.pushState({}, '', path);

    const container = document.createElement('div');
    container.innerHTML = renderToString(<App initialPath={path} />);
    document.body.appendChild(container);

    const errors: unknown[][] = [];
    const spy = vi
      .spyOn(console, 'error')
      .mockImplementation((...args: unknown[]) => errors.push(args));

    let root: ReturnType<typeof hydrateRoot> | null = null;
    await act(async () => {
      root = hydrateRoot(container, <App initialPath={path} />);
    });
    spy.mockRestore();

    expect(errors).toEqual([]);
    expect(container.textContent).toContain('32');

    await act(async () => {
      root?.unmount();
    });
  });
});
