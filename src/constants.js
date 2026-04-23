// Formats
export const FORMAT = { POCKET: 'pocket', CLASSIC: 'classic' };

// Deck rules
export const MAX_CARDS = { pocket: 20, classic: 60 };
export const MAX_COPIES = { pocket: 2, classic: 4 };

// Filter options
export const POKEMON_TYPES = [
  "Colorless", "Darkness", "Dragon", "Fairy", "Fighting",
  "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"
];

export const POCKET_RARITIES = [
  "One Diamond", "Two Diamond", "Three Diamond", "Four Diamond",
  "One Star", "Two Star", "Three Star", "Crown"
];

export const CLASSIC_RARITIES = [
  "Common", "Uncommon", "Rare", "Rare Holo", "Ultra Rare", "Secret Rare"
];

// API Endpoints
export const API_TCGDEX = 'https://api.tcgdex.net/v2/en';
export const API_POKEMON = 'https://api.pokemontcg.io/v2';

// Filters default state
export const EMPTY_FILTERS = { type: '', rarity: '', category: '' };
