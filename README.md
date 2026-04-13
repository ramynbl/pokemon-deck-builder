# Pokémon Deck Builder

**Projet de cours – Bachelor 1ᵉʳ année Développement Web – HETIC**

## 🎯 Objectif du projet
Créer une application web **React** permettant de construire des decks pour le **Pokémon Trading Card Game** (TCG). L’application supporte deux formats de jeu :
- **TCG Classic** – 60 cartes max, 4 exemplaires par carte, les cartes énergie sont autorisées.
- **TCG Pocket** – 20 cartes max, 2 exemplaires par carte, les cartes énergie sont exclues.

Le projet met en pratique :
- Consommation d’APIs publiques (Pokémon TCG API & TCGdex).
- Gestion d’état avancée (thème Light/Dark, format sélectionné, persistance locale).
- UI premium avec glassmorphism, animations fluides et polices personnalisées.
- Navigation via une landing page dynamique.

## ✨ Fonctionnalités principales
- **Landing page** avec vidéo (ou image) de fond et bouton d’accès au deck builder.
- **Bascule de thème** (Light/Dark) et **toggle de format** (Classic / Pocket).
- **Recherche de cartes** avec filtres par nom et par set.
- **Gestion du deck** : ajout/retrait, validation des règles, sauvegarde dans `localStorage`.
- **Export du deck** au format JSON.
- **Responsive design** – fonctionne sur desktop et mobile.
- **Favicon** personnalisé (Pikachu).

## 🛠️ Stack technique
| Technologie | Version |
|-------------|---------|
| React       | 18.x    |
| Vite        | 5.x     |
| JavaScript  | ES2022  |
| CSS (vanilla) | — |
| React Router DOM | 6.x |
| Google Fonts | Jersey 10 (titres) + Outfit (texte) |
| API PokéTCG | `https://api.pokemontcg.io/v2/cards` |
| API TCGdex  | `https://api.tcgdex.net/v2/en/cards` |

## 📦 Installation
```bash
# Cloner le dépôt
git clone https://github.com/ramynbl/pokemon-deck-builder.git
cd pokemon-deck-builder

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```
Le site sera disponible à l’adresse `http://localhost:5173`.

## 📦 Build pour la production
```bash
npm run build   # génère le dossier /dist
npm run preview # prévisualise le build
```

## 🚀 Utilisation
1. **Landing page** – Vous êtes d’abord accueilli par une page d’accueil avec une vidéo/une image de fond, le logo du projet et le titre *Deck Builder*.
2. Cliquez sur le bouton **Deck Builder** (ou le lien du menu) pour accéder à l’application principale.
3. Sélectionnez le format (Classic ou Pocket) via le toggle en haut à droite.
4. Recherchez des cartes, ajoutez‑les à votre deck, respectez les règles de chaque format.
5. Exportez votre deck avec le bouton d’export.

## 📂 Structure du projet
```
pokemon-deckbuilder/
├─ public/                # assets publics (logo, favicon, vidéo, image de fond)
│   ├─ background.png
│   ├─ logo-trading-card.png
│   ├─ pikachu.png
│   └─ pokemon.mp4
├─ src/
│   ├─ components/        # CardItem, CardGrid, DeckPanel, LandingPage, …
│   ├─ hooks/             # useDeck, usePokemonCards, useTCGdexCards
│   ├─ App.jsx            # logique principale + routes
│   ├─ main.jsx           # bootstrap React + BrowserRouter
│   └─ index.css          # styles globaux + thème + landing page
├─ .gitignore
├─ README.md              # ← ce fichier
├─ package.json
└─ vite.config.js
```

## 🎨 Design & Accessibilité
- **Couleurs** : palette sombre avec accents dorés, mode clair (`#F6F8FC` + bleu nuit).
- **Typographies** : *Jersey 10* pour les titres, *Outfit* pour le texte courant.
- **Animations** : micro‑animations au survol des cartes, bouton CTA, flottement du logo.
- **Responsive** : mise en page adaptative, navigation mobile via le menu burger (à implémenter ultérieurement).

## 📚 Ressources & Documentation
- **Pokémon TCG API** – https://pokemontcg.io/
- **TCGdex API** – https://tcgdex.dev/
- **Guide de style** – Google Fonts, CSS custom properties.

## 👨‍🏫 Contexte académique
Ce projet a été réalisé dans le cadre du **Bachelor 1ᵉʳ année – Développement Web** à **HETIC**. Il illustre les compétences suivantes :
- Architecture d’une application React moderne.
- Consommation d’APIs tierces et gestion de flux de données.
- Mise en place d’un thème dynamique (Light/Dark).
- Utilisation de bonnes pratiques de versionnage Git.
- Design UI premium et responsive.

## 📄 Licence
Ce projet est publié sous licence **MIT** – vous êtes libre de le réutiliser, le modifier et le distribuer.

---
*Happy deck building!*
