import { renderHook, act } from '@testing-library/react';
import { usePokemonCards } from '../usePokemonCards';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FORMAT } from '../../constants';

// Helper: wait for useEffect auto-fetch to complete
const waitForAutoFetch = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
};

describe('usePokemonCards Hook', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        // eslint-disable-next-line no-undef
        json: () => Promise.resolve({ data: [{ id: '1', name: 'Test Card' }] }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds correct query for pocket format', async () => {
    renderHook(() => usePokemonCards(FORMAT.POCKET));
    await waitForAutoFetch();
    
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalled();
    // The auto-fetch from useEffect is the first call
    // eslint-disable-next-line no-undef
    const url = new URL(global.fetch.mock.lastCall[0]);
    const q = url.searchParams.get('q');
    expect(q).toContain('(set.id:A* OR set.id:B*)');
    expect(q).toContain('-supertype:energy');
  });

  it('builds correct query for classic format', async () => {
    renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();
    
    // eslint-disable-next-line no-undef
    const url = new URL(global.fetch.mock.lastCall[0]);
    const q = url.searchParams.get('q');
    expect(q).toContain('-set.id:A*');
    expect(q).toContain('-set.id:B*');
  });

  it('includes name filter in query', async () => {
    const { result } = renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch(); // let useEffect auto-fetch complete

    await act(async () => {
      await result.current.searchCards('pikachu');
    });
    
    // The explicit searchCards call is the last one
    // eslint-disable-next-line no-undef
    const url = new URL(global.fetch.mock.lastCall[0]);
    const q = url.searchParams.get('q');
    expect(q).toContain('name:"*pikachu*"');
  });

  it('includes type, rarity, category filters', async () => {
    const { result } = renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();

    await act(async () => {
      await result.current.searchCards('', { type: 'Fire', rarity: 'Rare', category: 'Pokémon' });
    });
    
    // eslint-disable-next-line no-undef
    const url = new URL(global.fetch.mock.lastCall[0]);
    const q = url.searchParams.get('q');
    expect(q).toContain('types:"Fire"');
    expect(q).toContain('rarity:"Rare"');
    expect(q).toContain('supertype:"Pokémon"');
  });

  it('appends pagination params', async () => {
    // Return 50 items so hasMore = true
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: Array.from({ length: 50 }, (_, i) => ({ id: `${i}`, name: `Card ${i}` })) }),
      })
    );

    const { result } = renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();

    // Now loadMore should work since hasMore is true
    await act(async () => {
      await result.current.loadMore('', {}, 'releaseDate', 'desc');
    });
    
    // eslint-disable-next-line no-undef
    const url = new URL(global.fetch.mock.lastCall[0]);
    expect(url.searchParams.get('page')).toBe('2');
  });

  it('sets hasMore to false when < 50 results', async () => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: Array.from({ length: 49 }) }),
      })
    );

    renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();
    
    // hasMore checked indirectly via the hook — we re-read from result
    const { result } = renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();
    expect(result.current.hasMore).toBe(false);
  });

  it('handles API error gracefully', async () => {
    // Override fetch to ALWAYS reject
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => usePokemonCards(FORMAT.CLASSIC));
    await waitForAutoFetch();
    
    expect(result.current.error).toBe('Failed to fetch cards. Please try again.');
    expect(result.current.cards).toEqual([]);
    
    consoleSpy.mockRestore();
  });
});
