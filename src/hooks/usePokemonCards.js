import { useState, useEffect, useCallback } from 'react';
import { API_POKEMON, FORMAT } from '../constants';

export function usePokemonCards(format = FORMAT.POCKET) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchCards = useCallback(async (query = '', filters = {}, sortBy = 'releaseDate', sortDir = 'desc', pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      let apiUrl = `${API_POKEMON}/cards?pageSize=50`;
      
      let q = [];
      
      // Format-based filters
      if (format === 'pocket') {
        q.push('(set.id:A* OR set.id:B*)');
        q.push('-supertype:energy');
      } else {
        q.push('-set.id:A*');
        q.push('-set.id:B*');
      }

      // Name search
      if (query) {
        q.push(`name:"*${query}*"`);
      }

      // Filters
      if (filters.type) q.push(`types:"${filters.type}"`);
      if (filters.rarity) q.push(`rarity:"${filters.rarity}"`);
      if (filters.category) q.push(`supertype:"${filters.category}"`);

      const queryString = q.join(' ');
      apiUrl += `&q=${encodeURIComponent(queryString)}`;

      // Sorting
      // pokemontcg.io sort fields: name, -name, set.releaseDate, -set.releaseDate, hp, -hp
      let sortField = sortBy === 'releaseDate' ? 'set.releaseDate' : sortBy;
      apiUrl += `&orderBy=${sortDir === 'desc' ? '-' : ''}${sortField}&page=${pageNum}`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (pageNum === 1) {
        setCards(data.data);
      } else {
        setCards(prev => [...prev, ...data.data]);
      }
      
      setHasMore(data.data.length === 50); // 50 is pageSize
      setPage(pageNum);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [format]);

  useEffect(() => {
    searchCards();
  }, [searchCards]);

  const loadMore = useCallback((query, filters, sortBy, sortDir) => {
    if (!loading && hasMore) {
      searchCards(query, filters, sortBy, sortDir, page + 1);
    }
  }, [loading, hasMore, page, searchCards]);

  return { cards, loading, error, searchCards, loadMore, hasMore };
}
