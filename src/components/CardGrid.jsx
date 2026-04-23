import React from 'react';
import CardItem from './CardItem';

export default function CardGrid({ cards, loading, error, onAddCard, onRetry, onLoadMore, hasMore }) {
  // Only show full loading state if we are on the first page (no cards yet)
  if (loading && cards.length === 0) {
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
        {onRetry && <button className="retry-btn" onClick={onRetry}>Retry</button>}
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
    <>
      <div className="card-grid">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onAdd={onAddCard} />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={onLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Cards'}
          </button>
        </div>
      )}
    </>
  );
}
