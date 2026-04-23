import React from 'react';

export default function DeckPanel({ deck, onRemove, onExport, format }) {
  const totalCards = deck.length;
  const maxCards = format === 'pocket' ? 20 : 60;
  const isFull = totalCards === maxCards;

  // Group by name to show counts
  const groupedCards = deck.reduce((acc, card, idx) => {
    if (!acc[card.id]) {
      acc[card.id] = { ...card, count: 0, indices: [] };
    }
    acc[card.id].count += 1;
    acc[card.id].indices.push(idx);
    return acc;
  }, {});

  return (
    <aside className="deck-panel" role="complementary" aria-label="Deck panel">
      <div className="deck-header">
        <h2>Your Deck</h2>
        <div className="progress-indicator">
          <span className={`count ${isFull ? 'full' : ''}`}>{totalCards}</span>
          <span className="max">/ {maxCards}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className={`progress-bar ${isFull ? 'full' : ''}`} 
            style={{ width: `${(totalCards / maxCards) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="deck-list">
        {Object.values(groupedCards).map((group) => (
          <div key={group.id} className="deck-list-item" onClick={() => onRemove(group.indices[group.indices.length - 1])}>
            <div className="deck-item-info">
              <span className="deck-item-count">{group.count}x</span>
              <span className="deck-item-name">{group.name}</span>
            </div>
            <button className="remove-btn" aria-label={`Remove ${group.name} from deck`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="deck-footer">
        <button className="export-btn" onClick={onExport} disabled={totalCards === 0}>
          Export Deck
        </button>
      </div>
    </aside>
  );
}
