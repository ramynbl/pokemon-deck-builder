import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { usePokemonCards } from './hooks/usePokemonCards';
import { useTCGdexCards } from './hooks/useTCGdexCards';
import { useDeck } from './hooks/useDeck';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import CardGrid from './components/CardGrid';
import DeckPanel from './components/DeckPanel';
import { EMPTY_FILTERS, FORMAT } from './constants';
import ErrorBoundary from './components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

// Lazy-loaded routes (non-critical for initial render)
const LandingPage = lazy(() => import('./components/LandingPage'));
const RulesPage = lazy(() => import('./components/RulesPage'));
const RegisterPage = lazy(() => import('./components/RegisterPage'));
const MetaHub = lazy(() => import('./components/MetaHub'));

function DeckBuilderApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [format, setFormat] = useState(() => localStorage.getItem('format') || FORMAT.POCKET);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState('releaseDate');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('format', format);
  }, [format]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const classicApi = usePokemonCards(format);
  const pocketApi = useTCGdexCards();
  const { cards, loading, error, searchCards, loadMore, hasMore } = format === 'pocket' ? pocketApi : classicApi;
  const { deck, addCard, removeCard, exportDeck, notification } = useDeck(format);

  // Trigger search when search or filters change
  useEffect(() => {
    searchCards(searchQuery, filters, sortBy, sortDir);
  }, [searchQuery, filters, sortBy, sortDir, searchCards]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSortChange = useCallback((newSortBy, newSortDir) => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const handleFormatChange = useCallback((newFormat) => {
    setFormat(newFormat);
    // Reset filters and search inline instead of chaining effects
    setFilters(EMPTY_FILTERS);
    setSearchQuery('');
  }, []);

  // Client-side sorting for TCGdex (Pocket) or backup for Classic
  const sortedCards = useMemo(() => {
    if (format === 'classic') return cards; // pokemontcg.io handles sorting in API

    const sorted = [...cards];
    
    // If sorting by date, rely on original array order since API returns chronologically
    // If asc, reverse the array. If desc, keep it (assuming API returns desc).
    if (sortBy === 'releaseDate') {
      return sortDir === 'asc' ? sorted.reverse() : sorted;
    }

    sorted.sort((a, b) => {
      let valA = a.name.toLowerCase();
      let valB = b.name.toLowerCase();
      
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [cards, sortBy, sortDir, format]);

  return (
    <div className="app-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}
      
      <main className="main-content">
        <header className="header" style={{ position: 'relative' }}>
          <Link to="/" className="back-to-home" title="Retour à l'accueil" aria-label="Retour à l'accueil">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <h1>Strategy Camp ‒ Deck Builder</h1>
          <p className="subtitle">Construis ton deck {format === 'pocket' ? '20' : '60'} cartes.</p>
          
          <div className="format-toggle">
            <button 
              className={`format-btn ${format === 'classic' ? 'active' : ''}`}
              onClick={() => handleFormatChange('classic')}
            >
              TCG Classic
            </button>
            <button 
              className={`format-btn ${format === 'pocket' ? 'active' : ''}`}
              onClick={() => handleFormatChange('pocket')}
            >
              TCG Pocket
            </button>
          </div>

          <SearchBar onSearch={(query) => setSearchQuery(query)} />
        </header>

        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          sortDir={sortDir}
          onSortChange={handleSortChange}
          format={format}
          onClearFilters={handleClearFilters}
        />

        <section className="catalog">
          <ErrorBoundary onRetry={() => searchCards(searchQuery, filters, sortBy, sortDir)}>
            <CardGrid 
              cards={sortedCards} 
              loading={loading} 
              error={error} 
              onAddCard={addCard}
              hasMore={hasMore}
              onLoadMore={() => loadMore(searchQuery, filters, sortBy, sortDir)}
            />
          </ErrorBoundary>
        </section>
      </main>

      <DeckPanel 
        deck={deck} 
        onRemove={removeCard} 
        onExport={exportDeck}
        format={format}
      />
    </div>
  );
}

const LoadingFallback = () => (
  <div className="loading-state">
    <div className="spinner"></div>
    <p>Chargement…</p>
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/rules" element={<PageTransition><RulesPage /></PageTransition>} />
          <Route path="/deck-builder" element={<PageTransition><DeckBuilderApp /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="/guides-exclusifs" element={<PageTransition><MetaHub /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
