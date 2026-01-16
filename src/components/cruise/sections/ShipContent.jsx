import FeedbackSection from '../FeedbackSection';
import VenueFinder from '../VenueFinder';
import { ionaShipInfo } from '../../../data/cruise/g606-ship-info';
import './SectionContent.css';

/**
 * ShipContent - Dedicated ship information section available on all day types
 * Includes venue finder, ship stats, and deck highlights
 */
function ShipContent({ sectionKey, dayData }) {
  return (
    <div className="section-content">
      <div className="section-ship">
        {/* Ship Overview */}
        <div className="section-intro">
          <h2 className="ship-title">P&O Iona</h2>
          <p>{ionaShipInfo.description}</p>
        </div>

        {/* Ship Stats */}
        <div className="ship-stats-grid">
          <div className="ship-stat">
            <span className="stat-label">Guests</span>
            <span className="stat-value">{ionaShipInfo.capacity}</span>
          </div>
          <div className="ship-stat">
            <span className="stat-label">Tonnage</span>
            <span className="stat-value">{ionaShipInfo.tonnage}</span>
          </div>
          <div className="ship-stat">
            <span className="stat-label">Crew</span>
            <span className="stat-value">{ionaShipInfo.crew}</span>
          </div>
          <div className="ship-stat">
            <span className="stat-label">Decks</span>
            <span className="stat-value">{ionaShipInfo.decks}</span>
          </div>
          <div className="ship-stat">
            <span className="stat-label">Length</span>
            <span className="stat-value">{ionaShipInfo.length}</span>
          </div>
          <div className="ship-stat">
            <span className="stat-label">Cabins</span>
            <span className="stat-value">{ionaShipInfo.cabins}</span>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Key Venues Quick List */}
        <div className="sub-section">
          <h3>Key Venues</h3>
          <ul className="info-list">
            {ionaShipInfo.keyVenues.map((venue, index) => (
              <li key={index}>{venue}</li>
            ))}
          </ul>
        </div>

        <hr className="section-divider" />

        {/* Deck Highlights */}
        <div className="sub-section">
          <h3>Deck Guide</h3>
          <div className="deck-highlights">
            <div className="deck-highlight">
              <strong>Deck 19 (Sky Deck)</strong>
              <p>Sunbathing areas, Sports Arena, Golf Nets</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 18 (Panorama)</strong>
              <p>Panorama Pool, Beachcombers, Jogging Track, The Retreat (adults only)</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 17</strong>
              <p>The Reef kids clubs, Crow's Nest bar, Epicurean restaurant, Sky Bar</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 16 (Lido)</strong>
              <p>SkyDome pool, Horizon buffet, Infinity Pool, Taste 360</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 8 (Promenade)</strong>
              <p>The Quays food market, Sindhu, specialty restaurants, Sunset Bar</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 7 (Parade)</strong>
              <p>Reception, Shore Excursions, The Avenue shops, Casino, Brodie's pub</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 6 (Gala)</strong>
              <p>Headliners Theatre, 710 Club, Anderson's Bar, main restaurants</p>
            </div>
            <div className="deck-highlight">
              <strong>Deck 5</strong>
              <p>Oasis Gym, Thermal Suite, cabins</p>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Important Notes */}
        {ionaShipInfo.importantNotes && (
          <>
            <div className="sub-section">
              <h3>Important Notes</h3>
              <ul className="info-list">
                {ionaShipInfo.importantNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            <hr className="section-divider" />
          </>
        )}

        {/* Full Venue Finder */}
        <VenueFinder />

        <hr className="section-divider" />

        {/* Useful Info */}
        <div className="sub-section">
          <h3>Good to Know</h3>
          <ul className="info-list">
            <li>Access P&O Horizon (web-based) for show bookings and daily schedules - can be added to home screen as a shortcut</li>
            <li>Shops and casino are only open at sea</li>
            <li>The Retreat on Deck 18 is adults only (16+)</li>
            <li>Launderettes available on Decks 5, 9, 10, 12, 14 and 15</li>
            <li>Reception open 24 hours on Deck 7</li>
            <li>Four self-service laundrettes throughout the ship</li>
            <li>Currency onboard is British Pounds</li>
          </ul>
        </div>

        <div className="info-note">
          <p>
            <a 
              href={ionaShipInfo.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              More about Iona on the P&O website
            </a>
          </p>
        </div>
      </div>

      <FeedbackSection 
        sectionKey={sectionKey} 
        dayNumber={dayData.dayNumber} 
        portName={dayData.portName} 
      />
    </div>
  );
}

export default ShipContent;
