import { useState, useMemo } from 'react';
// motion is used in JSX as <motion.div>
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { getAllVenues, searchVenues } from '../../data/cruise/iona-venues';
import './VenueFinder.css';

/**
 * VenueFinder - Searchable directory of Iona venues
 * 
 * Features:
 * - Search by keyword (coffee, pool, kids, etc.)
 * - Filter by type (dining, bars, pools, etc.)
 * - Filter by deck
 * - Shows location, hours, cost info
 * 
 * Integrates with Limitless Cruises design system
 */

const VENUE_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'restaurant', label: 'Dining' },
  { id: 'cafe', label: 'Cafés' },
  { id: 'bar', label: 'Bars' },
  { id: 'pool', label: 'Pools' },
  { id: 'whirlpool', label: 'Hot Tubs' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'theatre', label: 'Theatre' },
  { id: 'spa', label: 'Spa & Gym' },
  { id: 'gym', label: 'Gym' },
  { id: 'kids-club', label: 'Kids' },
  { id: 'shop', label: 'Shopping' },
  { id: 'service', label: 'Services' },
];

const POSITION_LABELS = {
  'forward': 'Forward (Front)',
  'mid-forward': 'Mid-Forward',
  'midship': 'Midship (Middle)',
  'mid-aft': 'Mid-Aft',
  'aft': 'Aft (Back)',
  'all': 'Full Length'
};

const SIDE_LABELS = {
  'port': 'Port (Left)',
  'starboard': 'Starboard (Right)',
  'central': 'Central',
  'both': 'Both Sides'
};

const COST_BADGES = {
  'included': { label: 'Included', className: 'cost-included' },
  'extra': { label: 'Extra Cost', className: 'cost-extra' },
  'pay-as-you-go': { label: 'Pay As You Go', className: 'cost-payg' },
};

const VenueFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDeck, setSelectedDeck] = useState('all');
  const [expandedVenue, setExpandedVenue] = useState(null);

  // Get filtered venues
  const filteredVenues = useMemo(() => {
    let venues = getAllVenues();

    // Filter by search query
    if (searchQuery.trim()) {
      venues = searchVenues(searchQuery);
    }

    // Filter by type
    if (selectedType !== 'all') {
      // Handle spa & gym combo
      if (selectedType === 'spa') {
        venues = venues.filter(v => v.type === 'spa' || v.type === 'gym' || v.type === 'fitness');
      } else {
        venues = venues.filter(v => v.type === selectedType);
      }
    }

    // Filter by deck
    if (selectedDeck !== 'all') {
      venues = venues.filter(v => 
        v.deck === parseInt(selectedDeck) || 
        v.deck === selectedDeck ||
        (typeof v.deck === 'string' && v.deck.includes(selectedDeck))
      );
    }

    // Sort by deck, then name
    return venues.sort((a, b) => {
      const deckA = typeof a.deck === 'string' ? parseInt(a.deck) : a.deck;
      const deckB = typeof b.deck === 'string' ? parseInt(b.deck) : b.deck;
      if (deckA !== deckB) return deckB - deckA; // Higher decks first
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedType, selectedDeck]);

  // Get unique decks for filter
  const availableDecks = useMemo(() => {
    const decks = new Set();
    getAllVenues().forEach(v => {
      if (typeof v.deck === 'number') {
        decks.add(v.deck);
      } else if (typeof v.deck === 'string') {
        // Handle ranges like "6-7"
        v.deck.split('-').forEach(d => decks.add(parseInt(d)));
      }
    });
    return Array.from(decks).sort((a, b) => b - a);
  }, []);

  return (
    <div className="venue-finder">
      <div className="venue-finder-header">
        <h3 className="venue-finder-title">What's On Iona</h3>
        <p className="venue-finder-subtitle">Find restaurants, bars, pools, and more</p>
      </div>

      {/* Search Bar */}
      <div className="venue-search-container">
        <div className="venue-search-box">
          <input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="venue-search-input"
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Type Filters */}
      <div className="venue-filters">
        <div className="filter-row type-filters">
          {VENUE_TYPES.map(type => (
            <button
              key={type.id}
              className={`filter-chip ${selectedType === type.id ? 'active' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Deck Filter */}
        <div className="filter-row deck-filter">
          <label className="filter-label-text" htmlFor="deck-select">Deck:</label>
          <select 
            id="deck-select"
            value={selectedDeck} 
            onChange={(e) => setSelectedDeck(e.target.value)}
            className="deck-select"
          >
            <option value="all">All Decks</option>
            {availableDecks.map(deck => (
              <option key={deck} value={deck}>Deck {deck}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="venue-results-count">
        {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} found
      </div>

      {/* Venue List */}
      <div className="venue-list">
        <AnimatePresence>
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className="venue-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setExpandedVenue(expandedVenue === venue.id ? null : venue.id)}
            >
              <div className="venue-card-header">
                <div className="venue-main-info">
                  <h4 className="venue-name">{venue.name}</h4>
                  <div className="venue-location">
                    <span className="venue-deck">Deck {venue.deck}</span>
                    <span className="venue-separator">·</span>
                    <span className="venue-position">{POSITION_LABELS[venue.position] || venue.position}</span>
                  </div>
                </div>
                {venue.cost && COST_BADGES[venue.cost] && (
                  <span className={`venue-cost-badge ${COST_BADGES[venue.cost].className}`}>
                    {COST_BADGES[venue.cost].label}
                  </span>
                )}
              </div>

              {/* Quick Info */}
              <div className="venue-quick-info">
                {venue.cuisine && (
                  <span className="quick-tag">{venue.cuisine}</span>
                )}
                {venue.style && (
                  <span className="quick-tag">{venue.style}</span>
                )}
                {venue.ageGroup && (
                  <span className="quick-tag age-tag">{venue.ageGroup}</span>
                )}
                {venue.adultsOnly && (
                  <span className="quick-tag adults-tag">Adults Only</span>
                )}
                {venue.familyFriendly && (
                  <span className="quick-tag family-tag">Family Friendly</span>
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedVenue === venue.id && (
                  <motion.div
                    className="venue-expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {venue.description && (
                      <p className="venue-description">{venue.description}</p>
                    )}

                    <div className="venue-details-grid">
                      {/* Location Details */}
                      <div className="venue-detail">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">
                          Deck {venue.deck}, {POSITION_LABELS[venue.position] || venue.position}
                          {venue.side && ` (${SIDE_LABELS[venue.side] || venue.side})`}
                        </span>
                      </div>

                      {/* Hours */}
                      {venue.hours && (
                        <div className="venue-detail">
                          <span className="detail-label">Hours</span>
                          <span className="detail-value">
                            {typeof venue.hours === 'object' ? (
                              Object.entries(venue.hours)
                                .filter(([_, v]) => v)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(' | ') || 'Check Horizon app'
                            ) : venue.hours}
                          </span>
                        </div>
                      )}

                      {/* Meals */}
                      {venue.meals && (
                        <div className="venue-detail">
                          <span className="detail-label">Meals</span>
                          <span className="detail-value">
                            {venue.meals.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                          </span>
                        </div>
                      )}

                      {/* Dress Code */}
                      {venue.dressCode && (
                        <div className="venue-detail">
                          <span className="detail-label">Dress code</span>
                          <span className="detail-value">{venue.dressCode}</span>
                        </div>
                      )}

                      {/* Booking */}
                      {venue.bookingRequired !== undefined && (
                        <div className="venue-detail">
                          <span className="detail-label">Booking</span>
                          <span className="detail-value">
                            {venue.bookingRequired ? 'Required' : 'Not required'}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      {venue.price && (
                        <div className="venue-detail">
                          <span className="detail-label">Price</span>
                          <span className="detail-value">{venue.price}</span>
                        </div>
                      )}
                    </div>

                    {/* Tips */}
                    {venue.tips && venue.tips.length > 0 && (
                      <div className="venue-tips">
                        <span className="tips-label">Tips</span>
                        <ul className="tips-list">
                          {venue.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="venue-expand-indicator" aria-hidden="true">
                {expandedVenue === venue.id ? '▲' : '▼'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredVenues.length === 0 && (
          <div className="no-results">
            <p>No venues found matching your search.</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedDeck('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueFinder;
