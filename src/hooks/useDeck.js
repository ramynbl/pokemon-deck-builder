import { useState, useEffect } from 'react';
import { MAX_CARDS, MAX_COPIES, FORMAT } from '../constants';

export function useDeck(format = FORMAT.POCKET) {
  const [decks, setDecks] = useState(() => {
    return {
      pocket: JSON.parse(localStorage.getItem('pokemon_pocket_deck')) || [],
      classic: JSON.parse(localStorage.getItem('pokemon_classic_deck')) || []
    };
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('pokemon_pocket_deck', JSON.stringify(decks.pocket));
    localStorage.setItem('pokemon_classic_deck', JSON.stringify(decks.classic));
  }, [decks]);

  const deck = decks[format] || [];

  const showNotification = (msg, type = 'error') => {
    const id = Date.now();
    setNotification({ msg, type, id });
    setTimeout(() => {
      setNotification((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  const addCard = (card) => {
    const maxCards = MAX_CARDS[format] || 60;
    const maxCopies = MAX_COPIES[format] || 4;

    if (deck.length >= maxCards) {
      showNotification(`Deck is full (Maximum ${maxCards} cards limit for ${format})`);
      return false;
    }

    if (format === 'pocket' && card.supertype === 'Energy') {
      showNotification('Energy cards are not allowed in TCG Pocket!');
      return false;
    }

    // Classic Unlimited Basic Energy
    if (format === 'classic' && card.supertype === 'Energy' && card.subtypes?.includes('Basic')) {
      // Allow unlimited
    } else {
      const copies = deck.filter((c) => c.name === card.name).length;
      if (copies >= maxCopies) {
        showNotification(`Limit reached: Maximum ${maxCopies} copies of ${card.name}`);
        return false;
      }
    }

    setDecks(prev => ({
      ...prev,
      [format]: [...prev[format], card]
    }));
    showNotification(`Added ${card.name}`, 'success');
    return true;
  };

  const removeCard = (index) => {
    const newDeck = [...deck];
    const removed = newDeck.splice(index, 1)[0];
    setDecks(prev => ({
      ...prev,
      [format]: newDeck
    }));
    if (removed) {
      showNotification(`Removed ${removed.name}`, 'info');
    }
  };

  const exportDeck = () => {
    if (deck.length === 0) {
      showNotification('Deck is empty', 'error');
      return;
    }
    const deckText = deck.map((c) => c.name).sort().join('\n');
    const blob = new Blob([deckText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${format}_deck.txt`;
    a.click();
    showNotification('Deck exported!', 'success');
  };

  return { deck, addCard, removeCard, exportDeck, notification };
}
