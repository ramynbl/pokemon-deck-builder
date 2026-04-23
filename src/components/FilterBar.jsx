import React from 'react';
import { POKEMON_TYPES, POCKET_RARITIES, CLASSIC_RARITIES, FORMAT } from '../constants';

const FilterBar = React.memo(function FilterBar({ 
  filters, 
  onFilterChange, 
  sortBy, 
  sortDir, 
  onSortChange, 
  format,
  onClearFilters 
}) {
  const rarities = format === 'pocket' ? POCKET_RARITIES : CLASSIC_RARITIES;

  const handleCategoryToggle = (cat) => {
    onFilterChange('category', filters.category === cat ? '' : cat);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {/* Type Filter */}
        <div className="filter-group">
          <span className="filter-label">Type</span>
          <select 
            className="filter-select"
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            aria-label="Filter by Pokémon type"
            id="filter-type"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div className="filter-group">
          <span className="filter-label">Rarity</span>
          <select 
            className="filter-select"
            value={filters.rarity}
            onChange={(e) => onFilterChange('rarity', e.target.value)}
            aria-label="Filter by card rarity"
            id="filter-rarity"
          >
            <option value="">All Rarities</option>
            {rarities.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="filter-group">
          <span className="filter-label">Category</span>
          <div className="category-pills">
            <button 
              className={`pill-btn ${filters.category === 'Pokemon' ? 'active' : ''}`}
              onClick={() => handleCategoryToggle('Pokemon')}
            >
              Pokémon
            </button>
            <button 
              className={`pill-btn ${filters.category === 'Trainer' ? 'active' : ''}`}
              onClick={() => handleCategoryToggle('Trainer')}
            >
              Trainer
            </button>
          </div>
        </div>

        {/* Sort Select */}
        <div className="filter-group">
          <span className="filter-label">Sort By</span>
          <select 
            className="filter-select"
            value={`${sortBy}-${sortDir}`}
            onChange={(e) => {
              const [newSortBy, newSortDir] = e.target.value.split('-');
              onSortChange(newSortBy, newSortDir);
            }}
            aria-label="Sort cards by"
            id="sort-select"
          >
            <option value="releaseDate-desc">Newest</option>
            <option value="releaseDate-asc">Oldest</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            {format === 'classic' && <option value="hp-desc">HP (High-Low)</option>}
            {format === 'classic' && <option value="hp-asc">HP (Low-High)</option>}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="active-filters">
          {filters.type && (
            <div className="filter-chip">
              {filters.type}
              <button className="remove-chip" onClick={() => onFilterChange('type', '')} aria-label={`Remove type filter ${filters.type}`}>✕</button>
            </div>
          )}
          {filters.rarity && (
            <div className="filter-chip">
              {filters.rarity}
              <button className="remove-chip" onClick={() => onFilterChange('rarity', '')} aria-label={`Remove rarity filter ${filters.rarity}`}>✕</button>
            </div>
          )}
          {filters.category && (
            <div className="filter-chip">
              {filters.category}
              <button className="remove-chip" onClick={() => onFilterChange('category', '')} aria-label={`Remove category filter ${filters.category}`}>✕</button>
            </div>
          )}
          <button className="clear-all-btn" onClick={onClearFilters}>Clear All</button>
        </div>
      )}
    </div>
  );
});

export default FilterBar;
