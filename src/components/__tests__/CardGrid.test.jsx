import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardGrid from '../CardGrid';

describe('CardGrid Component', () => {
  const defaultProps = {
    cards: [],
    loading: false,
    error: null,
    onAddCard: vi.fn(),
    onRetry: vi.fn(),
    onLoadMore: vi.fn(),
    hasMore: false,
  };

  it('renders loading spinner when loading and no cards', () => {
    render(<CardGrid {...defaultProps} loading={true} />);
    expect(screen.getByText('Catching cards...')).toBeInTheDocument();
  });

  it('renders error message with retry button', () => {
    render(<CardGrid {...defaultProps} error="Network Error" />);
    expect(screen.getByText('Network Error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders empty state when no cards', () => {
    render(<CardGrid {...defaultProps} />);
    expect(screen.getByText('No cards found. Try another search.')).toBeInTheDocument();
  });

  it('renders card list', () => {
    const cards = [
      { id: '1', name: 'Bulbasaur', supertype: 'Pokémon' },
      { id: '2', name: 'Charmander', supertype: 'Pokémon' },
      { id: '3', name: 'Squirtle', supertype: 'Pokémon' },
    ];
    render(<CardGrid {...defaultProps} cards={cards} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
  });

  it('renders Load More button when hasMore', () => {
    const cards = [{ id: '1', name: 'Bulbasaur', supertype: 'Pokémon' }];
    render(<CardGrid {...defaultProps} cards={cards} hasMore={true} />);
    expect(screen.getByRole('button', { name: 'Load More Cards' })).toBeInTheDocument();
  });

  it('does not render Load More when hasMore is false', () => {
    const cards = [{ id: '1', name: 'Bulbasaur', supertype: 'Pokémon' }];
    render(<CardGrid {...defaultProps} cards={cards} hasMore={false} />);
    expect(screen.queryByRole('button', { name: 'Load More Cards' })).not.toBeInTheDocument();
  });
});
