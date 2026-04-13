import React from 'react';
import { Link } from 'react-router-dom';

export default function RulesPage() {
  return (
    <div className="rules-page">
      <nav className="landing-navbar rules-navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo-blanc.png" alt="Logo" className="nav-logo-img" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/deck-builder">Deck Builder</Link></li>
        </ul>
        <div className="navbar-cta">
          <Link to="/deck-builder" className="btn-primary">Deck Builder</Link>
        </div>
      </nav>

      <div className="rules-container">
        <h1 className="rules-main-title">Règles du jeu</h1>
        <p className="rules-intro">
          Bienvenue dans la documentation officielle du Pokémon TCG Deck Builder. 
          Retrouvez ici les règles essentielles pour les deux formats supportés par l'application.
        </p>

        {/* --- TCG Classic --- */}
        <section className="rules-section">
          <h2 className="rules-section-title">
            <span className="rules-badge classic">Classic</span>
            TCG Classique
          </h2>
          <p className="rules-description">
            Le format classique du Pokémon Trading Card Game, tel qu'il est joué dans les tournois officiels et les compétitions.
          </p>

          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">🃏</div>
              <h3>Taille du deck</h3>
              <p>Un deck doit contenir exactement <strong>60 cartes</strong>.</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">🔢</div>
              <h3>Limite de copies</h3>
              <p>Maximum <strong>4 exemplaires</strong> d'une même carte (par nom), sauf les cartes Énergie de base qui sont illimitées.</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">⚡</div>
              <h3>Cartes Énergie</h3>
              <p>Les cartes Énergie sont <strong>autorisées et essentielles</strong>. Elles permettent à vos Pokémon d'utiliser leurs attaques.</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">⭐</div>
              <h3>Pokémon de base</h3>
              <p>Votre deck doit contenir au moins <strong>1 Pokémon de base</strong> pour pouvoir commencer la partie.</p>
            </div>
          </div>

          <div className="rules-details">
            <h3>Déroulement d'un tour</h3>
            <ol>
              <li><strong>Piocher</strong> – Piochez une carte au début de votre tour.</li>
              <li><strong>Actions</strong> – Vous pouvez réaliser plusieurs actions dans l'ordre de votre choix :
                <ul>
                  <li>Poser des Pokémon de base sur le Banc.</li>
                  <li>Faire évoluer un Pokémon.</li>
                  <li>Attacher une carte Énergie à un Pokémon (1 par tour).</li>
                  <li>Jouer des cartes Dresseur.</li>
                  <li>Utiliser des Talents (Abilities).</li>
                  <li>Faire une retraite (Retreat).</li>
                </ul>
              </li>
              <li><strong>Attaquer</strong> – Déclarez une attaque pour terminer votre tour.</li>
            </ol>

            <h3>Conditions de victoire</h3>
            <ul>
              <li>Récupérer toutes vos <strong>6 cartes Récompense</strong> (Prize Cards).</li>
              <li>Mettre K.O. tous les Pokémon adverses (plus aucun en jeu ni sur le banc).</li>
              <li>L'adversaire ne peut plus piocher au début de son tour.</li>
            </ul>
          </div>
        </section>

        {/* --- TCG Pocket --- */}
        <section className="rules-section">
          <h2 className="rules-section-title">
            <span className="rules-badge pocket">Pocket</span>
            TCG Pocket (Mobile)
          </h2>
          <p className="rules-description">
            Le format simplifié du Pokémon TCG conçu pour le jeu mobile. Des parties plus courtes et plus accessibles.
          </p>

          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">🃏</div>
              <h3>Taille du deck</h3>
              <p>Un deck contient exactement <strong>20 cartes</strong>.</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">🔢</div>
              <h3>Limite de copies</h3>
              <p>Maximum <strong>2 exemplaires</strong> d'une même carte (par nom).</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">🚫</div>
              <h3>Pas de cartes Énergie</h3>
              <p>Les cartes Énergie <strong>n'existent pas</strong> dans ce format. L'énergie est générée automatiquement à chaque tour.</p>
            </div>
            <div className="rule-card">
              <div className="rule-icon">🎯</div>
              <h3>Points de victoire</h3>
              <p>Récupérez <strong>3 points</strong> pour gagner la partie (au lieu de 6 récompenses).</p>
            </div>
          </div>

          <div className="rules-details">
            <h3>Différences clés avec le TCG Classique</h3>
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>TCG Classique</th>
                  <th>TCG Pocket</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taille du deck</td>
                  <td>60 cartes</td>
                  <td>20 cartes</td>
                </tr>
                <tr>
                  <td>Copies par carte</td>
                  <td>4 max</td>
                  <td>2 max</td>
                </tr>
                <tr>
                  <td>Cartes Énergie</td>
                  <td>Oui (obligatoires)</td>
                  <td>Non (automatiques)</td>
                </tr>
                <tr>
                  <td>Points pour gagner</td>
                  <td>6 récompenses</td>
                  <td>3 points</td>
                </tr>
                <tr>
                  <td>Banc</td>
                  <td>5 emplacements</td>
                  <td>3 emplacements</td>
                </tr>
                <tr>
                  <td>Énergie par tour</td>
                  <td>1 attachée manuellement</td>
                  <td>1 générée automatiquement</td>
                </tr>
              </tbody>
            </table>

            <h3>Déroulement d'un tour (Pocket)</h3>
            <ol>
              <li><strong>Énergie automatique</strong> – Une Énergie est assignée aléatoirement à un Pokémon au début du tour.</li>
              <li><strong>Actions</strong> – Poser des Pokémon, évoluer, jouer des Objets ou des Supporters.</li>
              <li><strong>Attaquer</strong> – Déclarez une attaque pour terminer votre tour.</li>
            </ol>
          </div>
        </section>

        <div className="rules-cta-section">
          <h2>Prêt à construire votre deck ?</h2>
          <Link to="/deck-builder" className="btn-primary">Lancer le Deck Builder</Link>
        </div>
      </div>
    </div>
  );
}
