import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RulesPage from './components/RulesPage';
import { usePokemonCards } from './hooks/usePokemonCards';
import { useTCGdexCards } from './hooks/useTCGdexCards';
import { useDeck } from './hooks/useDeck';
import SearchBar from './components/SearchBar';
import CardGrid from './components/CardGrid';
import DeckPanel from './components/DeckPanel';

function DeckBuilderApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [format, setFormat] = useState(() => localStorage.getItem('format') || 'pocket');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('format', format);
  }, [format]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const classicApi = usePokemonCards(format);
  const pocketApi = useTCGdexCards();
  const { cards, loading, error, searchCards } = format === 'pocket' ? pocketApi : classicApi;
  const { deck, addCard, removeCard, exportDeck, notification } = useDeck(format);

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
          <h1>TCG Pocket Builder</h1>
          <p className="subtitle">Build your ultimate {format === 'pocket' ? '20' : '60'}-card deck.</p>
          
          <div className="format-toggle">
            <button 
              className={`format-btn ${format === 'classic' ? 'active' : ''}`}
              onClick={() => setFormat('classic')}
            >
              TCG Classic
            </button>
            <button 
              className={`format-btn ${format === 'pocket' ? 'active' : ''}`}
              onClick={() => setFormat('pocket')}
            >
              TCG Pocket
            </button>
          </div>

          <SearchBar onSearch={(query) => searchCards(query)} />
        </header>

        <section className="catalog">
          <CardGrid 
            cards={cards} 
            loading={loading} 
            error={error} 
            onAddCard={addCard} 
          />
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/deck-builder" element={<DeckBuilderApp />} />
    </Routes>
  );
}
