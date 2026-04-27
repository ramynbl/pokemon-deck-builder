import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterBar from '../FilterBar';
import { EMPTY_FILTERS, FORMAT } from '../../constants';

describe('FilterBar Component', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      filters: EMPTY_FILTERS,
      onFilterChange: vi.fn(),
      sortBy: 'releaseDate',
      sortDir: 'desc',
      onSortChange: vi.fn(),
      format: FORMAT.POCKET,
      onClearFilters: vi.fn(),
    };
  });

  it('renders all filter groups', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Rarity')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
  });

  it('calls onFilterChange when type is selected', () => {
    render(<FilterBar {...defaultProps} />);
    const typeSelect = screen.getByLabelText('Filter by Pokémon type');
    fireEvent.change(typeSelect, { target: { value: 'Fire' } });
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('type', 'Fire');
  });

  it('calls onFilterChange when rarity is selected', () => {
    render(<FilterBar {...defaultProps} />);
    const raritySelect = screen.getByLabelText('Filter by card rarity');
    fireEvent.change(raritySelect, { target: { value: 'One Star' } });
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('rarity', 'One Star');
  });

  it('toggles category pill on click', () => {
    render(<FilterBar {...defaultProps} />);
    const pokemonBtn = screen.getByText('Pokémon');
    fireEvent.click(pokemonBtn);
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('category', 'Pokemon');
  });

  it('shows active filter chips', () => {
    render(<FilterBar {...defaultProps} filters={{ ...EMPTY_FILTERS, type: 'Fire' }} />);
    // "Fire" appears both in the <option> and in the .filter-chip — target the chip specifically
    const chip = screen.getByLabelText('Remove type filter Fire').closest('.filter-chip');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Fire');
  });

  it('removes filter chip on ✕ click', () => {
    render(<FilterBar {...defaultProps} filters={{ ...EMPTY_FILTERS, type: 'Fire' }} />);
    const removeBtn = screen.getByLabelText('Remove type filter Fire');
    fireEvent.click(removeBtn);
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('type', '');
  });

  it('calls onClearFilters on Clear All click', () => {
    render(<FilterBar {...defaultProps} filters={{ ...EMPTY_FILTERS, type: 'Fire' }} />);
    const clearBtn = screen.getByText('Clear All');
    fireEvent.click(clearBtn);
    expect(defaultProps.onClearFilters).toHaveBeenCalled();
  });

  it('shows correct rarities for pocket format', () => {
    render(<FilterBar {...defaultProps} format={FORMAT.POCKET} />);
    expect(screen.getByText('One Diamond')).toBeInTheDocument();
    expect(screen.queryByText('Common')).not.toBeInTheDocument();
  });

  it('shows correct rarities for classic format', () => {
    render(<FilterBar {...defaultProps} format={FORMAT.CLASSIC} />);
    expect(screen.getByText('Common')).toBeInTheDocument();
    expect(screen.queryByText('One Diamond')).not.toBeInTheDocument();
  });
});
