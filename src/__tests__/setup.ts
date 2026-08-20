import '@testing-library/jest-dom/vitest';

// jsdom has no layout engine, so the router's scroll reset is a no-op in tests.
window.scrollTo = () => {};
