import { useState, useEffect } from 'react';
import { MAX_CARDS, MAX_COPIES, FORMAT } from '../constants';

// Versioned storage keys to allow safe schema migrations
const STORAGE_KEYS = {
  pocket: 'pokemon_pocket_deck:v1',
  classic: 'pokemon_classic_deck:v1',
};

// Migrate old unversioned keys to versioned ones (one-time)
function migrateStorage() {
  const oldKeys = { pocket: 'pokemon_pocket_deck', classic: 'pokemon_classic_deck' };
  for (const [format, oldKey] of Object.entries(oldKeys)) {
    const newKey = STORAGE_KEYS[format];
    if (!localStorage.getItem(newKey) && localStorage.getItem(oldKey)) {
      localStorage.setItem(newKey, localStorage.getItem(oldKey));
      localStorage.removeItem(oldKey);
    }
  }
}

export function useDeck(format = FORMAT.POCKET) {
  const [decks, setDecks] = useState(() => {
    migrateStorage();
    return {
      pocket: JSON.parse(localStorage.getItem(STORAGE_KEYS.pocket)) || [],
      classic: JSON.parse(localStorage.getItem(STORAGE_KEYS.classic)) || []
    };
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.pocket, JSON.stringify(decks.pocket));
    localStorage.setItem(STORAGE_KEYS.classic, JSON.stringify(decks.classic));
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
