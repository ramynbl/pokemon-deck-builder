import { renderHook, act } from '@testing-library/react';
import { useTCGdexCards } from '../useTCGdexCards';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Helper: wait for useEffect auto-fetch to complete
const waitForAutoFetch = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
};

describe('useTCGdexCards Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', name: 'Test Card', category: 'Pokémon' }]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds correct URL with search query', async () => {
    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch(); // let useEffect auto-fetch complete

    await act(async () => {
      await result.current.searchCards('pikachu');
    });
    
    expect(global.fetch).toHaveBeenCalled();
    const url = global.fetch.mock.lastCall[0];
    expect(url).toContain('name=pikachu');
  });

  it('filters out energy cards by default', async () => {
    // Override fetch to return mixed data (Pokémon + Energy)
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '1', name: 'Pikachu', category: 'Pokémon' },
          { id: '2', name: 'Fire Energy', category: 'Energy' }
        ]),
      })
    );

    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch();
    
    expect(result.current.cards.length).toBe(1);
    expect(result.current.cards[0].name).toBe('Pikachu');
  });

  it('paginates client-side with PAGE_SIZE=50', async () => {
    // Override fetch to return 60 cards
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(Array.from({ length: 60 }, (_, i) => ({ id: `${i}`, name: `Card ${i}`, category: 'Pokémon' }))),
      })
    );

    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch();
    
    expect(result.current.cards.length).toBe(50); // PAGE_SIZE
    expect(result.current.hasMore).toBe(true);
  });

  it('loadMore exposes next cards', async () => {
    // Override fetch to return 60 cards
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(Array.from({ length: 60 }, (_, i) => ({ id: `${i}`, name: `Card ${i}`, category: 'Pokémon' }))),
      })
    );

    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch();

    expect(result.current.cards.length).toBe(50);
    
    act(() => {
      result.current.loadMore();
    });
    
    expect(result.current.cards.length).toBe(60);
    expect(result.current.hasMore).toBe(false);
  });

  it('sets hasMore correctly', async () => {
    // Override fetch to return only 30 cards (< PAGE_SIZE)
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(Array.from({ length: 30 }, (_, i) => ({ id: `${i}`, name: `Card ${i}`, category: 'Pokémon' }))),
      })
    );

    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch();
    
    expect(result.current.hasMore).toBe(false);
  });

  it('handles API error gracefully', async () => {
    // Override fetch to ALWAYS reject
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useTCGdexCards());
    await waitForAutoFetch();
    
    expect(result.current.error).toBe('Failed to fetch cards. Please try again.');
    expect(result.current.cards).toEqual([]);
    
    consoleSpy.mockRestore();
  });
});
