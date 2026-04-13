import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <div className="navbar-logo">
          <img src="/logo-blanc.png" alt="Logo" className="nav-logo-img" />
        </div>
        <ul className="navbar-links">
          <li><a href="#about">À propos</a></li>
          <li><Link to="/rules">Règles</Link></li>
          <li><a href="#pricing">Prix</a></li>
        </ul>
        <div className="navbar-cta">
          <Link to="/deck-builder" className="btn-primary">Deck Builder</Link>
        </div>
      </nav>

      <div className="hero-section">
        <img 
          src="/background.png" 
          alt="Pixel view background" 
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img 
            src="/logo-trading-card.png" 
            alt="Pokémon Trading Card Game" 
            className="hero-main-logo" 
          />
          <h1 className="hero-title">Deck Builder</h1>
          <div className="hero-actions">
            <Link to="/deck-builder" className="btn-primary">Deck Builder</Link>
            <Link to="/rules" className="btn-secondary">Règles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
