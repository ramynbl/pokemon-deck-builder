import { useState, useEffect } from 'react';

export function useTCGdexCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCards = async (searchQuery = '', selectedSet = '') => {
    setLoading(true);
    setError(null);
    try {
      let data = [];

      if (selectedSet) {
        // Fetch all cards from a specific set
        const response = await fetch(`https://api.tcgdex.net/v2/en/sets/${selectedSet}`);
        if (!response.ok) throw new Error('Set not found');
        const setData = await response.json();
        data = setData.cards || [];

        // If there's also a search query, filter by name client-side
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          data = data.filter(c => c.name.toLowerCase().includes(q));
        }
      } else if (searchQuery) {
        // Search by name across all cards
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Search failed');
        data = await response.json();
      } else {
        // Default: fetch latest cards
        const response = await fetch('https://api.tcgdex.net/v2/en/cards');
        if (!response.ok) throw new Error('Failed to fetch cards');
        data = await response.json();
        // Limit to last 50 for performance
        data = data.slice(-50).reverse();
      }

      // Filter out energy cards for Pocket
      data = data.filter(c => {
        const cat = (c.category || '').toLowerCase();
        return cat !== 'energy';
      });

      setCards(data);
    } catch {
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchCards();
  }, []);

  return { cards, loading, error, searchCards };
}
