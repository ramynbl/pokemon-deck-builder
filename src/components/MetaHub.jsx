import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { metaDecks } from '../data/metaDecks';

const popVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const slideUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 20 } }
};

export default function MetaHub() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [loadingCards, setLoadingCards] = useState(false);
  const imageCacheRef = useRef({});

  useEffect(() => {
    if (!selectedDeck) return;
    
    const fetchImages = async () => {
      setLoadingCards(true);
      const allCards = [...selectedDeck.pokemon, ...selectedDeck.trainers];
      const images = { ...imageCacheRef.current };
      const uncached = allCards.filter(card => !images[card.display]);
      
      try {
        await Promise.all(uncached.map(async (card) => {
          const query = `name:"${card.name}"`;
          const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&pageSize=1`);
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            images[card.display] = data.data[0].images.large || data.data[0].images.small;
          } else {
            images[card.display] = 'https://placehold.co/240x330/1e293b/cbd5e1?text=' + encodeURIComponent(card.display);
          }
        }));
        imageCacheRef.current = images;
        setCardImages(images);
      } catch (error) {
        console.error("Erreur lors du fetch des cartes", error);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedDeck]);

  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };
  const buttonTap = { scale: 0.95 };

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
  };

  const handleBack = () => {
    setSelectedDeck(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    
    <div className="meta-hub-page">
      {/* Navbar Exclusif */}
      <nav className="landing-navbar meta-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo-2.svg" alt="Logo" className="nav-logo-img" />
          </Link>
        </div>
        <div className="navbar-badge">
          <span className="exclusive-badge"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png" alt="icon" style={{ width: '16px', height: '16px', imageRendering: 'pixelated', verticalAlign: 'middle', marginRight: '4px' }} /> Guides Exclusifs</span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!selectedDeck ? (
          /* --- VUE GRILLE DE TOUS LES DECKS --- */
          <motion.div 
            key="grid-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="meta-hub-grid-view"
          >
            <section className="meta-hero" style={{ paddingBottom: '3rem' }}>
              <div className="container meta-hero-container">
                <motion.div className="title-wrapper" initial="hidden" animate="visible" variants={slideUpVariant}>
                  <h1>La Bibliothèque Méta</h1>
                  <p className="meta-description">Découvrez les meilleures stratégies pour dominer vos adversaires. Ces 7 decks sont actuellement les plus performants du format.</p>
                </motion.div>
              </div>
            </section>

            <section className="guides-grid-section">
              <div className="container">
                <div className="guides-grid">
                  {metaDecks.map((deck, idx) => (
                    <motion.div 
                      key={deck.id}
                      className="guide-card"
                      onClick={() => handleDeckSelect(deck)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={popVariant}
                      custom={idx}
                      whileHover={{ scale: 1.03, translateY: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`guide-card-header type-${deck.type.toLowerCase()}`}>
                        <img src={deck.sprite} alt={deck.name} className="guide-sprite pixel-sprite" />
                      </div>
                      <div className="guide-card-body">
                        <h3>{deck.name}</h3>
                        <p>{deck.description.substring(0, 100)}...</p>
                        <span className="read-more-btn">Lire le guide &rarr;</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- VUE DÉTAIL D'UN DECK --- */
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="meta-hub-detail-view"
          >
            <section className="meta-hero">
              <div className="container meta-hero-container">
                <button className="back-btn" onClick={handleBack}>&larr; Retour aux guides</button>
                <motion.div className="meta-hero-text" initial="hidden" animate="visible" variants={slideUpVariant}>
                  <div className="title-wrapper">
                    <img src={selectedDeck.sprite} alt="Main Sprite" className="pixel-sprite hero-sprite" />
                    <h1>{selectedDeck.name}</h1>
                  </div>
                  <p className="meta-description">{selectedDeck.description}</p>
                </motion.div>
              </div>
            </section>

            {/* Decklist Section */}
            <section className="meta-decklist-section">
              <div className="container">
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUpVariant} className="section-title">
                  Liste des Cartes
                </motion.h2>
                
                <div className="decklist-grid">
                  <div className="decklist-column">
                    <h3>Pokémon</h3>
                    <div className="cards-grid">
                      {selectedDeck.pokemon.map((card) => (
                        <motion.div key={card.display} className="meta-card-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popVariant}>
                          <div className="card-image-wrapper">
                            {loadingCards ? (
                              <div className="card-skeleton"></div>
                            ) : (
                              <img src={cardImages[card.display]} alt={card.display} />
                            )}
                            <span className="card-qty">x{card.qty}</span>
                          </div>
                          <div className="card-info">
                            <h4>{card.display}</h4>
                            <p>{card.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="decklist-column">
                    <h3>Dresseurs & Énergies</h3>
                    <div className="cards-grid">
                      {selectedDeck.trainers.map((card) => (
                        <motion.div key={card.display} className="meta-card-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popVariant}>
                          <div className="card-image-wrapper">
                            {loadingCards ? (
                              <div className="card-skeleton"></div>
                            ) : (
                              <img src={cardImages[card.display]} alt={card.display} />
                            )}
                            <span className="card-qty">x{card.qty}</span>
                          </div>
                          <div className="card-info">
                            <h4>{card.display}</h4>
                            <p>{card.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stratégie et Combos Section */}
            <section className="meta-strategy-section">
              <div className="container">
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUpVariant} className="section-title">
                  Combos à Réaliser
                </motion.h2>

                <div className="combo-timeline">
                  {selectedDeck.combos.map((combo, idx) => (
                    <motion.div key={combo.title} className="combo-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpVariant}>
                      <div className="combo-header">
                        <div className="combo-icon">
                          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{idx + 1}</span>
                        </div>
                        <h3>{combo.title}</h3>
                      </div>
                      <div className="combo-steps">
                        {combo.steps.map((step, stepIdx) => (
                          <p key={stepIdx}><strong>Étape {stepIdx + 1}:</strong> {step}</p>
                        ))}
                        {combo.result && (
                          <div className="combo-result">
                            <strong>Résultat:</strong> {combo.result}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call To Action / Retour Site Principal */}
      <section className="meta-cta-section">
        <div className="container text-center">
          <motion.div className="meta-cta-box" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popVariant}>
            <h2>Créez vos propres variantes !</h2>
            <p>Maintenant que vous maîtrisez les decks de la Méta, pourquoi ne pas les importer et les personnaliser dans notre Deck Builder ?</p>
            <motion.div whileHover={buttonHover} whileTap={buttonTap} style={{ display: 'inline-block', marginTop: '1.5rem' }}>
              <Link to="/deck-builder" className="btn-primary btn-large">Aller au Deck Builder</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    
  );
}
