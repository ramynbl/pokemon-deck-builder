import { renderHook, act } from '@testing-library/react';
import { useDeck } from '../useDeck';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('useDeck Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a card to the deck', () => {
    const { result } = renderHook(() => useDeck('pocket'));
    act(() => {
      result.current.addCard({ id: '1', name: 'Pikachu', supertype: 'Pokémon' });
    });
    expect(result.current.deck.length).toBe(1);
    expect(result.current.deck[0].name).toBe('Pikachu');
    expect(result.current.notification.type).toBe('success');
  });

  it('prevents exceeding max cards (pocket: 20)', () => {
    const { result } = renderHook(() => useDeck('pocket'));
    
    // Fill the deck
    act(() => {
      for (let i = 0; i < 20; i++) {
        result.current.addCard({ id: `card-${i}`, name: `Pokemon ${i}`, supertype: 'Pokémon' });
      }
    });
    expect(result.current.deck.length).toBe(20);

    // Try to add one more
    act(() => {
      const added = result.current.addCard({ id: '21', name: 'Charizard', supertype: 'Pokémon' });
      expect(added).toBe(false);
    });
    
    expect(result.current.deck.length).toBe(20);
    expect(result.current.notification.msg).toContain('Deck is full');
  });

  it('prevents exceeding max copies (pocket: 2)', () => {
    const { result } = renderHook(() => useDeck('pocket'));
    const card = { id: '1', name: 'Pikachu', supertype: 'Pokémon' };
    
    act(() => { result.current.addCard(card); });
    act(() => { result.current.addCard({ ...card, id: '2' }); }); // Second copy allowed
    
    act(() => {
      const added = result.current.addCard({ ...card, id: '3' }); // Third copy should fail
      expect(added).toBe(false);
    });
    
    expect(result.current.deck.length).toBe(2);
    expect(result.current.notification.msg).toContain('Maximum 2 copies');
  });

  it('allows unlimited Basic Energy in classic', () => {
    const { result } = renderHook(() => useDeck('classic'));
    const energy = { id: 'e1', name: 'Water Energy', supertype: 'Energy', subtypes: ['Basic'] };
    
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.addCard({ ...energy, id: `e${i}` });
      }
    });
    
    expect(result.current.deck.length).toBe(10);
  });

  it('blocks Energy cards in pocket', () => {
    const { result } = renderHook(() => useDeck('pocket'));
    const energy = { id: 'e1', name: 'Water Energy', supertype: 'Energy' };
    
    act(() => {
      const added = result.current.addCard(energy);
      expect(added).toBe(false);
    });
    
    expect(result.current.deck.length).toBe(0);
    expect(result.current.notification.msg).toContain('Energy cards are not allowed in TCG Pocket');
  });

  it('removes a card by index', () => {
    const { result } = renderHook(() => useDeck('pocket'));
    act(() => {
      result.current.addCard({ id: '1', name: 'Bulbasaur', supertype: 'Pokémon' });
      result.current.addCard({ id: '2', name: 'Charmander', supertype: 'Pokémon' });
      result.current.addCard({ id: '3', name: 'Squirtle', supertype: 'Pokémon' });
    });
    
    expect(result.current.deck.length).toBe(3);
    
    act(() => {
      result.current.removeCard(1); // Remove Charmander
    });
    
    expect(result.current.deck.length).toBe(2);
    expect(result.current.deck[0].name).toBe('Bulbasaur');
    expect(result.current.deck[1].name).toBe('Squirtle');
  });

  it('exports deck as text file', () => {
    // eslint-disable-next-line no-undef
    global.URL.createObjectURL = vi.fn(() => 'blob:url');
    // eslint-disable-next-line no-undef
    global.URL.revokeObjectURL = vi.fn();

    const { result } = renderHook(() => useDeck('pocket'));
    act(() => {
      result.current.addCard({ id: '1', name: 'Pikachu', supertype: 'Pokémon' });
    });
    act(() => {
      result.current.exportDeck();
    });

    // eslint-disable-next-line no-undef
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(result.current.notification.msg).toBe('Deck exported!');
    expect(result.current.notification.type).toBe('success');
  });
});
