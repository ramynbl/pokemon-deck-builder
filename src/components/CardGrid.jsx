import React from 'react';
import CardItem from './CardItem';

export default function CardGrid({ cards, loading, error, onAddCard }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Catching cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <p>No cards found. Try another search.</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} onAdd={onAddCard} />
      ))}
    </div>
  );
}
