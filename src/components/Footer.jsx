import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('https://hook.eu1.make.com/lu83al7awmwk1d7jmvkz9kfc9wsx3xpm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      setStatus('error');
    }
  };

  return (
    <footer className="landing-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <Link to="/#about">À propos</Link>
              <Link to="/#testimonials">Avis Clients</Link>
              <Link to="/rules">Règles du jeu</Link>
              <Link to="/deck-builder">Deck Builder</Link>
            </div>
            <div className="footer-column">
              <h4>Légal</h4>
              <a href="#terms">Conditions d'utilisation</a>
              <a href="#privacy">Politique de confidentialité</a>
            </div>
          </div>
          
          {/* Réseaux sociaux — à activer quand les comptes sont créés */}
        </div>

        <div className="footer-newsletter">
          <h3>Inscris-toi à la newsletter</h3>
          <p>Et reçois toutes les stratégies et les decks incontournables directement dans ta boîte mail.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <label htmlFor="footer-email-input">E-mail</label>
            <div className="input-group">
              <input 
                type="email" 
                id="footer-email-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com" 
                required 
                disabled={status === 'loading' || status === 'success'}
              />
              <button type="submit" className="btn-primary" disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? '...' : status === 'success' ? '✓' : "S'inscrire"}
              </button>
            </div>
            {status === 'error' && <p className="error-message" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>Une erreur est survenue.</p>}
            {status === 'success' && <p className="success-message" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>Inscription réussie !</p>}
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Strategy Camp — Plateforme indépendante pour les passionnés de Pokémon TCG.</p>
      </div>
    </footer>
  );
}
