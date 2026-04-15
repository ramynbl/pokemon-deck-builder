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
          
          <div className="footer-socials">
            {/* Icône Facebook */}
            <a href="#facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* Icône X (Twitter) */}
            <a href="#twitter" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            {/* Icône Instagram */}
            <a href="#instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
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
        <p>&copy; 2026 Pokémon TCG Deck Builder. Construit avec passion en guise de projet étudiant.</p>
      </div>
    </footer>
  );
}
