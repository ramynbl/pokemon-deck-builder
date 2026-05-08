import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Footer from './Footer';

export default function LandingPage() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 340; // Card width (320) + gap (1.5rem/24px)
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Variants
  const popVariant = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  const slideLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  const slideRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };
  const buttonTap = { scale: 0.95 };

  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo-blanc.png" alt="Logo" className="nav-logo-img" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>À propos</a></li>
          <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')}>Avis</a></li>
          <li><Link to="/rules">Règles</Link></li>
          <li><Link to="/deck-builder">Deck Builder</Link></li>
        </ul>
        <div className="navbar-cta">
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link to="/register" className="btn-primary navbar-register-btn" style={{ display: 'inline-block' }}>S'inscrire — c'est gratuit</Link>
          </motion.div>
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
          <motion.img
            src="/logo-trading-card.png"
            alt="Pokémon Trading Card Game"
            className="hero-main-logo"
            initial="hidden"
            animate="visible"
            variants={popVariant}
          />
          <motion.h1
            className="hero-title"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.2 }}
          >
            Deck Builder
          </motion.h1>
          <motion.p
            className="hero-tagline"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.35 }}
          >
            Construis le deck parfait. Reste dans la méta. Bats tout le monde.
          </motion.p>
          <motion.div
            className="hero-social-proof"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.45 }}
          >
            <span className="hero-social-proof-badge">
              <span className="hero-social-proof-avatars">🎴🎴🎴</span>
              <span>+500 dresseurs déjà inscrits</span>
            </span>
          </motion.div>
          <motion.div
            className="hero-actions"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/register" className="btn-primary btn-hero-primary" style={{ display: 'inline-block' }}>S'inscrire gratuitement →</Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/deck-builder" className="btn-secondary btn-hero-secondary" style={{ display: 'inline-block' }}>Essayer le Deck Builder</Link>
            </motion.div>
          </motion.div>
          <motion.p
            className="hero-reassurance"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.65 }}
          >
            ✓ Gratuit &nbsp;·&nbsp; ✓ Zéro spam &nbsp;·&nbsp; ✓ Prêt en 30 secondes
          </motion.p>
        </div>
      </div>

      <section id="about" className="about-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeftVariant}
          >
            Tout ce dont tu as besoin pour dominer la méta
          </motion.h2>
          <motion.div
            className="about-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeftVariant}
          >
            <p>
              Strategy Camp réunit en un seul endroit le <strong>deck builder complet TCG Classique & Pocket</strong>, les analyses méta fraîches et les guides stratégiques — livrés directement dans ta boîte mail.
            </p>
            <p>
              Inscris-toi gratuitement et accède immédiatement à tous les outils pour construire, affiner et gagner.
            </p>
          </motion.div>

          <motion.div 
            className="about-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Card 1 */}
            <motion.div className="about-card" variants={cardVariant}>
              <div className="card-image-placeholder">
                 <img src="/tcg.jpeg" alt="Deck & Guides" />
              </div>
              <div className="about-card-content">
                <h3>Deck & Guides</h3>
                <p>Création de deck personnalisés et accès immédiat à la page Guides et Règles des jeux de base pour bien démarrer.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div className="about-card" variants={cardVariant}>
              <div className="card-image-placeholder">
                <img src="/echange.jpeg" alt="Méta par E-mail" />
              </div>
              <div className="about-card-content">
                <h3>Méta par E-mail</h3>
                <p>Envoi de guides détaillés sur les nouveaux decks et les métas du moment, envoyés mensuellement par e-mail après ton inscription.</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div className="about-card" variants={cardVariant}>
              <div className="card-image-placeholder">
                <img src="/battle.jpeg" alt="Stratégies TCG" />
              </div>
              <div className="about-card-content">
                <h3>Stratégies TCG</h3>
                <p>Accès exclusif aux documents complets et guides de stratégie approfondis TCG, automatiquement envoyés par e-mail dès ton inscription.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section freemium */}
      <motion.section
        className="freemium-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 className="section-title freemium-title" variants={cardVariant}>
            C'est gratuit. Voilà ce que tu débloques.
          </motion.h2>
          <motion.p className="freemium-subtitle" variants={cardVariant}>
            Inscris-toi en 30 secondes avec ton e-mail — aucune carte bancaire demandée.
          </motion.p>
          <div className="freemium-grid">
            <motion.div className="freemium-card" variants={cardVariant}>
              <div className="freemium-icon">🃏</div>
              <h3>Deck Builder complet</h3>
              <p>Accès immédiat au builder pour TCG Classique (60 cartes) et TCG Pocket (20 cartes). Construis, sauvegarde et affine tes listes sans limite.</p>
              <span className="freemium-tag">Accès immédiat</span>
            </motion.div>
            <motion.div className="freemium-card freemium-card--highlight" variants={cardVariant}>
              <div className="freemium-icon">📧</div>
              <h3>Méta par e-mail</h3>
              <p>Les meilleurs decks du moment, les nouveaux archétypes dominants et les analyses de méta — livrés directement dans ta boîte mail dès qu'une nouveauté arrive.</p>
              <span className="freemium-tag">Dès l'inscription</span>
            </motion.div>
            <motion.div className="freemium-card" variants={cardVariant}>
              <div className="freemium-icon">📖</div>
              <h3>Guides stratégiques</h3>
              <p>Des documents complets sur les mécaniques de jeu, la gestion d'énergie et les stratégies avancées — envoyés automatiquement après ton inscription.</p>
              <span className="freemium-tag">Envoi automatique</span>
            </motion.div>
          </div>
          <motion.div className="freemium-cta" variants={cardVariant}>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/register" className="btn-primary btn-hero-primary" style={{ display: 'inline-block' }}>
                C'est gratuit, je m'inscris →
              </Link>
            </motion.div>
            <p className="freemium-cta-note">✓ Zéro spam · Désabonnement en 1 clic</p>
          </motion.div>
        </div>
      </motion.section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header-inline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeftVariant}
          >
            <h2 className="section-title text-left">Ils nous font confiance</h2>
            <div className="carousel-controls">
              <motion.button whileHover={buttonHover} whileTap={buttonTap} className="carousel-btn prev" onClick={() => scroll('left')} aria-label="Avis précédent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </motion.button>
              <motion.button whileHover={buttonHover} whileTap={buttonTap} className="carousel-btn next" onClick={() => scroll('right')} aria-label="Avis suivant">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="testimonials-carousel" 
            ref={carouselRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideRightVariant}
          >
            {[
              {
                name: 'Léa',
                pokemon: 'eevee',
                text: "En tant que joueuse débutante, j'avais du mal à construire un deck cohérent. Grâce au deck builder et aux analyses méta reçues par mail, j'ai compris les bases rapidement et j'ai pu me lancer dans les tournois.",
                stars: 5,
              },
              {
                name: 'Irys',
                pokemon: 'pikachu',
                text: "J'avais essayé d'autres outils mais rien d'aussi complet pour le TCG Pocket. Le deck builder est intuitif et les guides stratégiques envoyés par mail m'ont vraiment aidée à progresser. Je recommande à toutes les joueuses qui veulent se lancer en compétitif.",
                stars: 5,
              },
              {
                name: 'Clara',
                pokemon: 'jigglypuff',
                text: "Les analyses de méta envoyées par e-mail sont au top. J'ai pu adapter mes decks avant les régionaux et j'ai atteint le top 8. Une vraie longueur d'avance sur les adversaires qui ne suivent pas la méta.",
                stars: 5,
              },
              {
                name: 'Maxime',
                pokemon: 'charmander',
                text: "Je débute dans le TCG Classique, le deck builder m'a permis de comprendre comment construire une liste équilibrée. Simple à utiliser, et les guides par mail expliquent bien les archetypes du moment.",
                stars: 5,
              },
              {
                name: 'Youssef',
                pokemon: 'squirtle',
                text: "En tant que joueur intermédiaire qui voulait passer au niveau compétitif, Strategy Camp m'a donné exactement ce qu'il fallait : un outil pour simuler mes decks et des analyses méta pour anticiper les stratégies adverses.",
                stars: 5,
              },
              {
                name: 'Inès',
                pokemon: 'bulbasaur',
                text: "J'aime la compétition et je cherchais un outil sérieux pour optimiser mes listes. Le deck builder TCG Classique est complet, et les stratégies reçues par mail m'ont permis d'améliorer nettement mes résultats en tournois.",
                stars: 5,
              },
            ].map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
                        { eevee: 133, pikachu: 25, jigglypuff: 39, charmander: 4, squirtle: 7, bulbasaur: 1 }[review.pokemon]
                      }.gif`}
                      alt={review.pokemon}
                    />
                  </div>
                  <div className="testimonial-meta">
                    <h4>{review.name}</h4>
                    <div className="stars">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                  </div>
                </div>
                <div className="testimonial-body">
                  <p>{review.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Rules */}
      <motion.section 
        className="cta-rules-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeftVariant}
      >
        <div className="container cta-flex-container">
          <div className="cta-text">
            <h2>Maitrisez toutes les Règles</h2>
            <p>
              Pour devenir un vrai maître Pokémon, il est primordial de comprendre les mécaniques de jeu. 
              Que ce soit pour le format compétitif Classique (60 cartes) ou pour les affrontements rapides de TCG Pocket (20 cartes), 
              consultez notre guide officiel. Maîtrisez la gestion d'énergie, les évolutions, et remportez chaque partie !
            </p>
          </div>
          <div className="cta-action">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/rules" className="btn-primary btn-large" style={{ display: 'inline-block' }}>Apprendre les règles →</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Deck Builder */}
      <motion.section
        className="cta-deckbuilder-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideRightVariant}
      >
        <div className="container deckbuilder-preview-layout">
          {/* Mockup visuel */}
          <div className="deck-preview-mockup" aria-hidden="true">
            <div className="mockup-window">
              <div className="mockup-topbar">
                <span className="mockup-dot red" />
                <span className="mockup-dot yellow" />
                <span className="mockup-dot green" />
                <span className="mockup-title-bar">Strategy Camp · Deck Builder</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-catalog">
                  <div className="mockup-search" />
                  <div className="mockup-cards-grid">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`mockup-card-thumb mockup-card-thumb--${['fire','water','grass','lightning','psychic','fighting','fire','water','grass'][i]}`} />
                    ))}
                  </div>
                </div>
                <div className="mockup-deck-panel">
                  <div className="mockup-deck-title" />
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="mockup-deck-row">
                      <div className="mockup-deck-row-thumb" />
                      <div className="mockup-deck-row-name" style={{ width: `${55 + (i * 7) % 30}%` }} />
                      <div className="mockup-deck-row-count" />
                    </div>
                  ))}
                  <div className="mockup-deck-export" />
                </div>
              </div>
            </div>
          </div>
          {/* Texte + CTA */}
          <div className="deckbuilder-preview-text">
            <h2>Construis tes decks sans limites</h2>
            <p>
              Que tu sois un joueur compétitif acharné du TCG Classique ou un fin collectionneur sur TCG Pocket,
              notre outil complet a été pensé pour toi. Assemble, analyse, et sauvegarde toutes tes idées de decks en quelques clics.
              Prêt à concevoir la prochaine stratégie imparable ?
            </p>
            <motion.div whileHover={buttonHover} whileTap={buttonTap} style={{ marginTop: '1.5rem' }}>
              <Link to="/deck-builder" className="btn-primary btn-hero-primary" style={{ display: 'inline-block' }}>Construire mon premier deck →</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Inscription */}
      <motion.section 
        className="cta-signup-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeftVariant}
      >
        <div className="container cta-flex-container">
          <div className="cta-text">
            <h2>Inscris-toi et reçois les decks méta par e-mail</h2>
            <p>
              Ne manque aucune évolution critique de la métagame ! L'univers Pokémon évolue vite, tes stratégies doivent suivre. 
              Rejoins notre communauté et reçois en exclusivité dans ta boîte e-mail nos analyses détaillées, 
              les nouveaux archétypes de decks dominants, ainsi que des conseils tactiques de haut niveau. 
              Une longueur d'avance garantie sur tes adversaires.
            </p>
          </div>
          <div className="cta-action">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/register" className="btn-primary btn-large" style={{ display: 'inline-block' }}>Recevoir la méta gratuitement →</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
