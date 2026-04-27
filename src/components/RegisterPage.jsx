import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
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
    <div className="register-page">
      <nav className="landing-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo-blanc.png" alt="Logo" className="nav-logo-img" />
          </Link>
        </div>
        <div className="navbar-cta">
          <Link to="/" className="btn-secondary">Retour à l'accueil</Link>
        </div>
      </nav>

      <div className="register-hero-content">
        <div className="register-hero-sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
            alt="Charizard"
            className="hero-pixel-sprite"
          />
        </div>

        <div className="register-text-block">
          <h1 className="register-title">Rejoins le niveau supérieur</h1>

          <div className="register-text">
            <p>
              Garde toujours une longueur d'avance sur la compétition. En t'inscrivant, tu débloques l'accès à de nombreuses ressources :
            </p>
            <ul>
              <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png" alt="Fire Badge" className="list-badge" /> <span><strong>Des decks exclusifs</strong> taillés pour le TCG Classique et Pocket</span></li>
              <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png" alt="Stats Badge" className="list-badge" /> <span><strong>Des analyses de la méta</strong> pour anticiper les stratégies adverses</span></li>
              <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png" alt="Idea Badge" className="list-badge" /> <span><strong>Des guides stratégiques</strong> pour optimiser tes prises de décision</span></li>
            </ul>
            <p>Zéro spam. Uniquement de la valeur pure envoyée directement dans ta boîte mail dès qu'une grosse nouveauté apparaît !</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="inline-form">
              <input
                type="email"
                id="hero-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                className="btn-primary register-btn"
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Inscription...' : status === 'success' ? 'Inscrit avec succès !' : 'Recevoir'}
              </button>
            </div>

            {status === 'error' && (
              <p className="error-message">Une erreur est survenue lors de l'inscription. Veuillez réessayer.</p>
            )}
            {status === 'success' && (
              <p className="success-message">Bienvenue dans l'équipe ! Surveille ta boîte mail.</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
