import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardItem from '../CardItem';

describe('CardItem Component', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      card: { id: '1', name: 'Pikachu', supertype: 'Pokémon', subtypes: ['Basic'] },
      onAdd: vi.fn(),
    };
  });

  it('renders card name', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Pokémon - Basic')).toBeInTheDocument();
  });

  it('renders card image for pokemontcg.io format', () => {
    const cardWithClassicImage = { ...defaultProps.card, images: { small: 'http://example.com/classic.png' } };
    render(<CardItem card={cardWithClassicImage} onAdd={defaultProps.onAdd} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://example.com/classic.png');
  });

  it('renders card image for TCGdex format', () => {
    const cardWithPocketImage = { ...defaultProps.card, image: 'http://example.com/pocket' };
    render(<CardItem card={cardWithPocketImage} onAdd={defaultProps.onAdd} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://example.com/pocket/low.webp');
  });

  it('calls onAdd when clicked', () => {
    render(<CardItem {...defaultProps} />);
    // Use aria-label to target the outer card div specifically (avoids finding the inner add-button too)
    const cardDiv = screen.getByLabelText('Add Pikachu to deck');
    fireEvent.click(cardDiv);
    expect(defaultProps.onAdd).toHaveBeenCalledWith(defaultProps.card);
  });

  it('calls onAdd on Enter key', () => {
    render(<CardItem {...defaultProps} />);
    const cardDiv = screen.getByLabelText('Add Pikachu to deck');
    fireEvent.keyDown(cardDiv, { key: 'Enter', code: 'Enter' });
    expect(defaultProps.onAdd).toHaveBeenCalledWith(defaultProps.card);
  });

  it('shows fallback when image fails', () => {
    const cardWithImage = { ...defaultProps.card, images: { small: 'invalid-url.png' } };
    render(<CardItem card={cardWithImage} onAdd={defaultProps.onAdd} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('P')).toBeInTheDocument(); // P for Pikachu fallback
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
