import { useState, useEffect, useCallback } from 'react';
import { API_TCGDEX } from '../constants';

export function useTCGdexCards() {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const PAGE_SIZE = 50;

  const searchCards = useCallback(async (searchQuery = '', filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      const { type, rarity, category } = filters;

      // Build query for TCGdex
      // TCGdex doesn't support complex multi-field filtering in a single simple request as easily for all fields
      // but we can use their filtering system.
      let url = `${API_TCGDEX}/cards`;
      const params = new URLSearchParams();

      if (searchQuery) params.append('name', searchQuery);
      if (category) params.append('category', category);
      if (rarity) params.append('rarity', rarity);
      if (type) params.append('types', type);

      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Search failed');
      data = await response.json();

      // Default: if no search/filter, we show latest
      if (!searchQuery && !category && !rarity && !type) {
        // Limit to last 100 for performance
        data = data.slice(-100).reverse();
      }

      // Filter out energy cards for Pocket if not explicitly requested
      if (!category || category !== 'Energy') {
        data = data.filter(c => {
          const cat = (c.category || '').toLowerCase();
          return cat !== 'energy';
        });
      }

      setAllCards(data);
      setCards(data.slice(0, PAGE_SIZE));
      setPage(1);
      setHasMore(data.length > PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchCards();
  }, [searchCards]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      const nextCards = allCards.slice(0, nextPage * PAGE_SIZE);
      setCards(nextCards);
      setPage(nextPage);
      setHasMore(allCards.length > nextCards.length);
    }
  }, [loading, hasMore, page, allCards]);

  return { cards, loading, error, searchCards, loadMore, hasMore };
}
