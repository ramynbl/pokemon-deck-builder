import React from 'react';

function getCardImage(card) {
  // pokemontcg.io format
  if (card.images?.small) return card.images.small;
  // TCGdex format
  if (card.image) return card.image + '/low.webp';
  return null;
}

export default function CardItem({ card, onAdd }) {
  const imageSrc = getCardImage(card);

  return (
    <div className="card-item" onClick={() => onAdd(card)}>
      <div className="card-image-wrapper">
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={card.name} 
            className="card-image" 
            loading="lazy" 
          />
        )}
        <div className="card-overlay">
          <button className="add-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-name">{card.name}</h3>
        <span className="card-type">{card.supertype || card.category || ''} {card.subtypes ? `- ${card.subtypes.join(', ')}` : ''}</span>
      </div>
    </div>
  );
}
