import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const MINI_REVIEWS = [
  {
    name: 'Youssef',
    pokemon: 7,
    text: 'Les analyses méta reçues par mail m\'ont permis de construire un deck optimal avant les régionaux.',
    stars: 5,
  },
  {
    name: 'Clara',
    pokemon: 39,
    text: 'J\'ai atteint le top 8 en régional grâce aux guides stratégiques. Une vraie longueur d\'avance.',
    stars: 5,
  },
  {
    name: 'Léa',
    pokemon: 133,
    text: 'Outil intuitif, guides clairs. Je recommande à tous les joueurs qui veulent progresser vite.',
    stars: 5,
  },
];

const FAQ = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui, totalement. L'inscription et l'accès au deck builder sont 100% gratuits. Aucune carte bancaire demandée, jamais.",
  },
  {
    q: "À quelle fréquence envoyez-vous des mails ?",
    a: "Maximum 1 à 2 fois par mois, uniquement quand la méta évolue vraiment. On ne spamme pas — on envoie de la valeur.",
  },
  {
    q: "Je peux me désinscrire quand je veux ?",
    a: "En un seul clic depuis n'importe quel mail reçu. Aucune friction, aucune question posée.",
  },
];

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  // Redirection automatique vers le deck builder après succès
  useEffect(() => {
    if (status !== 'success') return;
    if (countdown <= 0) {
      navigate('/deck-builder');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://hook.eu1.make.com/lu83al7awmwk1d7jmvkz9kfc9wsx3xpm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
            <img src="/logo-blanc.png" alt="Logo Strategy Camp" className="nav-logo-img" />
          </Link>
        </div>
        <div className="navbar-cta">
          <Link to="/" className="btn-secondary">← Retour à l'accueil</Link>
        </div>
      </nav>

      {/* Hero inscription */}
      <div className="register-hero-content">
        <div className="register-hero-sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
            alt="Charizard"
            className="hero-pixel-sprite"
          />
        </div>

        <div className="register-text-block">
          {/* Badge social proof */}
          <div className="register-social-proof">
            <span className="register-social-badge">🎴 +500 dresseurs déjà inscrits</span>
          </div>

          <h1 className="register-title">Rejoins le niveau supérieur</h1>

          <div className="register-text">
            <p>
              Garde toujours une longueur d'avance sur la compétition. En t'inscrivant, tu débloques l'accès à :
            </p>
            <ul>
              <li>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png" alt="" className="list-badge" />
                <span><strong>Des decks exclusifs</strong> taillés pour le TCG Classique et Pocket</span>
              </li>
              <li>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png" alt="" className="list-badge" />
                <span><strong>Des analyses de la méta</strong> pour anticiper les stratégies adverses</span>
              </li>
              <li>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png" alt="" className="list-badge" />
                <span><strong>Des guides stratégiques</strong> pour optimiser tes prises de décision</span>
              </li>
            </ul>
            <p className="register-zero-spam">✓ Zéro spam &nbsp;·&nbsp; ✓ Gratuit pour toujours &nbsp;·&nbsp; ✓ Désabonnement en 1 clic</p>
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
                {status === 'loading'
                  ? 'Inscription...'
                  : status === 'success'
                  ? '✓ Inscrit !'
                  : "S'inscrire gratuitement →"}
              </button>
            </div>

            {status === 'error' && (
              <p className="error-message">Une erreur est survenue. Réessaie dans quelques secondes.</p>
            )}
            {status === 'success' && (
              <div className="success-block">
                <p className="success-message">🎉 Bienvenue dans l'équipe ! Surveille ta boîte mail.</p>
                <p className="success-redirect">
                  Tu vas être redirigé vers le Deck Builder dans <strong>{countdown}s</strong>…{' '}
                  <Link to="/deck-builder" className="success-redirect-link">y aller maintenant →</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mini testimonials */}
      <section className="register-reviews">
        <div className="register-reviews-inner">
          <p className="register-reviews-label">Ce qu'ils en disent</p>
          <div className="register-reviews-grid">
            {MINI_REVIEWS.map((r, i) => (
              <div key={i} className="register-review-card">
                <div className="register-review-header">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${r.pokemon}.gif`}
                    alt={r.name}
                    className="register-review-avatar"
                  />
                  <div>
                    <strong>{r.name}</strong>
                    <div className="stars" style={{ fontSize: '0.75rem' }}>{'★'.repeat(r.stars)}</div>
                  </div>
                </div>
                <p>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ objections */}
      <section className="register-faq">
        <div className="register-faq-inner">
          <h2 className="register-faq-title">Questions fréquentes</h2>
          <div className="register-faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`register-faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="register-faq-question">
                  <span>{item.q}</span>
                  <span className="register-faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
                </div>
                {openFaq === i && (
                  <div className="register-faq-answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
