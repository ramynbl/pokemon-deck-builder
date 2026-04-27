import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
          <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')}>Avis Clients</a></li>
          <li><Link to="/rules">Règles</Link></li>
        </ul>
        <div className="navbar-cta">
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link to="/register" className="btn-primary" style={{ display: 'inline-block' }}>Inscription</Link>
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
          <motion.div 
            className="hero-actions"
            initial="hidden"
            animate="visible"
            variants={popVariant}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/register" className="btn-primary" style={{ display: 'inline-block' }}>Inscription</Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/deck-builder" className="btn-secondary" style={{ display: 'inline-block' }}>Deck Builder</Link>
            </motion.div>
          </motion.div>
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
            À propos / About
          </motion.h2>
          <motion.div 
            className="about-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeftVariant}
          >
            <p>
              Découvrez la plateforme ultime pour les passionnés : un <strong>Deckbuilder complet réunissant toutes les cartes des jeux TCG Pocket & TCG Classique</strong>.
            </p>
            <p>
              Profitez d'un outil intuitif pour créer, gérer et optimiser vos stratégies simplement en vous inscrivant avec votre adresse e-mail.
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
                 <img src="https://placehold.co/600x400/e2e8f0/64748b?text=Img+Deck+Builder" alt="Placeholder Deck Builder" />
              </div>
              <div className="about-card-content">
                <h3>Deck & Guides</h3>
                <p>Création de deck personnalisés et accès immédiat à la page Guides et Règles des jeux de base pour bien démarrer.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div className="about-card" variants={cardVariant}>
              <div className="card-image-placeholder">
                <img src="https://placehold.co/600x400/e2e8f0/64748b?text=Img+Meta+Mensuelle" alt="Placeholder Meta" />
              </div>
              <div className="about-card-content">
                <h3>Méta par E-mail</h3>
                <p>Envoi de guides détaillés sur les nouveaux decks et les métas du moment, envoyés mensuellement par e-mail après votre inscription.</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div className="about-card" variants={cardVariant}>
              <div className="card-image-placeholder">
                <img src="https://placehold.co/600x400/e2e8f0/64748b?text=Img+Strategie" alt="Placeholder Strategy" />
              </div>
              <div className="about-card-content">
                <h3>Stratégies TCG</h3>
                <p>Accès exclusif aux documents complets et guides de stratégie approfondis TCG, automatiquement envoyés par e-mail dès votre adhésion.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                text: "En tant que joueuse débutante pour mieux comprendre et pouvoir me lancer convenablement, j'ai choisi l'option du coaching. Ça m'a aidé, j'ai compris les règles assez rapidement et j'ai pu commencer les tournois.",
                stars: 5,
              },
              {
                name: 'Irys',
                pokemon: 'pikachu',
                text: "En tant que joueuse débutante j'ai fait le choix de prendre l'abonnement premium avec un Coach, ce qui m'a permis d'apprendre très vite les bases et d'être compétitif. Si vous comptez vous lancer dans la compétition, je vous conseille.",
                stars: 5,
              },
              {
                name: 'Clara',
                pokemon: 'jigglypuff',
                text: "Nettes améliorations grâce au coaching, j'ai pu me dépasser en jouant à haut niveau (régional), je recommande fortement.",
                stars: 5,
              },
              {
                name: 'Maxime',
                pokemon: 'charmander',
                text: "Je débute, j'ai pris un Coach et j'en suis content aujourd'hui, je me débrouille bien.",
                stars: 4,
              },
              {
                name: 'Youssef',
                pokemon: 'squirtle',
                text: "En tant que joueur intermédiaire, j'ai voulu me lancer dans le compétitif. J'ai choisi de prendre l'option premium pour pouvoir avoir les statistiques et créer un deck optimal.",
                stars: 5,
              },
              {
                name: 'Inès',
                pokemon: 'bulbasaur',
                text: "En tant que joueuse aimant la compétition, j'ai pris le choix de prendre les accès premium et pousser l'expérience jusqu'au bout. Aujourd'hui j'en suis contente, j'ai amélioré mes performances en tournois.",
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
              <Link to="/rules" className="btn-primary btn-large" style={{ display: 'inline-block' }}>Voir les Règles</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Deck Builder */}
      <motion.section 
        className="cta-deckbuilder-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideRightVariant}
      >
        <div className="container cta-flex-container reverse">
          <div className="cta-text">
            <h2>Construis tes decks sans limites</h2>
            <p>
              Que tu sois un joueur compétitif acharné du TCG Classique ou un fin collectionneur sur TCG Pocket, 
              notre outil complet a été pensé pour toi. Assemble, analyse, et sauvegarde toutes tes idées de decks en quelques clics. 
              Prêt à concevoir la prochaine stratégie imparable et devenir le meilleur dresseur ?
            </p>
          </div>
          <div className="cta-action">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link to="/deck-builder" className="btn-primary btn-large" style={{ display: 'inline-block' }}>Lancer le Deck Builder</Link>
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
              <Link to="/register" className="btn-primary btn-large" style={{ display: 'inline-block' }}>Recevoir les decks par mail</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
