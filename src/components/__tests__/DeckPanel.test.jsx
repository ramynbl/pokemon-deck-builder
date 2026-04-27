import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeckPanel from '../DeckPanel';
import { FORMAT } from '../../constants';

describe('DeckPanel Component', () => {
  const defaultProps = {
    deck: [],
    onRemove: vi.fn(),
    onExport: vi.fn(),
    format: FORMAT.POCKET,
  };

  it('renders deck count and progress bar', () => {
    const deck = Array.from({ length: 5 }, (_, i) => ({ id: `${i}`, name: `Card ${i}` }));
    render(<DeckPanel {...defaultProps} deck={deck} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('/ 20')).toBeInTheDocument();
  });

  it('groups identical cards', () => {
    const deck = [
      { id: '1', name: 'Pikachu' },
      { id: '1', name: 'Pikachu' },
      { id: '1', name: 'Pikachu' },
    ];
    render(<DeckPanel {...defaultProps} deck={deck} />);
    expect(screen.getByText('3x')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('calls onRemove when card is clicked', () => {
    const deck = [{ id: '1', name: 'Pikachu' }];
    render(<DeckPanel {...defaultProps} deck={deck} />);
    const removeBtn = screen.getByLabelText('Remove Pikachu from deck');
    fireEvent.click(removeBtn);
    expect(defaultProps.onRemove).toHaveBeenCalledWith(0); // index 0
  });

  it('disables export button when deck is empty', () => {
    render(<DeckPanel {...defaultProps} deck={[]} />);
    const exportBtn = screen.getByRole('button', { name: 'Export Deck' });
    expect(exportBtn).toBeDisabled();
  });

  it('calls onExport when clicked', () => {
    const deck = [{ id: '1', name: 'Pikachu' }];
    render(<DeckPanel {...defaultProps} deck={deck} />);
    const exportBtn = screen.getByRole('button', { name: 'Export Deck' });
    expect(exportBtn).not.toBeDisabled();
    fireEvent.click(exportBtn);
    expect(defaultProps.onExport).toHaveBeenCalled();
  });
});
