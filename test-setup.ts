import { afterEach, beforeEach, vi } from 'vitest';

if (typeof jsdom !== 'undefined') {
  const storage: Storage = jsdom.window.localStorage;

  beforeEach(() => {
    storage.clear();

    // Node's Web Storage global can shadow jsdom's localStorage in Vitest.
    vi.stubGlobal('localStorage', storage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
