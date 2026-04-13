import { useState, useEffect } from 'react';

export function usePokemonCards(format = 'pocket') {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCards = async (query = '', selectedSet = '') => {
    setLoading(true);
    setError(null);
    try {
      let apiUrl = 'https://api.pokemontcg.io/v2/cards?pageSize=50';
      
      let q = '';
      if (format === 'pocket') {
        if (selectedSet) {
          q = `set.id:${selectedSet} -supertype:energy`;
        } else {
          q = `(set.id:A* OR set.id:B*) -supertype:energy`;
        }
      } else {
        q = `-set.id:A* -set.id:B*`;
      }

      if (query) {
        q += ` name:"*${query}*"`;
      }
      apiUrl += `&q=${encodeURIComponent(q)}&orderBy=-set.releaseDate`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCards(data.data);
    } catch {
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  return { cards, loading, error, searchCards };
}
