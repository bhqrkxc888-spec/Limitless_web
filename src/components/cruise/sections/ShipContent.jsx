import VenueFinder from '../VenueFinder';
import { ionaShipInfo } from '../../../data/cruise/g606-ship-info';
import './SectionContent.css';

/**
 * ShipContent - Dedicated ship information section available on all day types
 * Includes venue finder, ship stats, and deck highlights
 */
function ShipContent({ sectionKey: _sectionKey, dayData: _dayData }) {
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

        {/* Dining Overview */}
        <div className="sub-section">
          <h3>Dining Onboard</h3>
          <p>With options available around the clock, you can enjoy delicious dishes whenever you're hungry. From modern British classics to flavours inspired by your destinations.</p>
          
          <p><strong>Freedom Dining (Iona exclusive):</strong></p>
          <p>Iona offers exclusively Freedom Dining. Dine any time from 6pm to 9.30pm in the ship's Freedom restaurants - simply turn up and you'll be seated at an available table. At peak times, you'll get a pager so you can relax with a drink while you wait.</p>

          <p><strong>Included Restaurants:</strong></p>
          <ul className="info-list">
            <li><strong>Freedom Restaurants</strong> (Coral, Pearl, Aqua, Opal) - Main dining rooms, included</li>
            <li><strong>The Quays</strong> - Fresh, casual dining, included</li>
            <li><strong>Horizon Buffet</strong> - All-day buffet, included</li>
            <li><strong>Poolside Grill</strong> - Burgers and hot dogs, included</li>
            <li><strong>The Chef's Table</strong> - Fine dining experience, included</li>
          </ul>

          <p><strong>Extra-Cost Restaurants:</strong></p>
          <ul className="info-list">
            <li><strong>Epicurean</strong> - Fine dining with stunning views</li>
            <li><strong>Sindhu</strong> - Indian cuisine by Atul Kochhar</li>
            <li><strong>The Glass House</strong> - Wine bar dining</li>
            <li><strong>Keel & Cow</strong> - Gastropub steaks</li>
            <li><strong>Ocean Grill</strong> - Premium seafood and steaks</li>
            <li><strong>Sundaes</strong> - Ice cream parlour</li>
            <li><strong>The Beach House</strong> - Casual beach-style dining</li>
          </ul>

          <p><strong>Room Service:</strong> Available 24 hours. Breakfast is included; other items have a charge. Tray charge applies on Iona.</p>

          <p className="info-note">Book speciality restaurants in advance via My P&O Cruises at my.pocruises.com - popular slots go quickly!</p>
        </div>

        <hr className="section-divider" />

        {/* Good to Know */}
        <div className="sub-section">
          <h3>Good to Know</h3>
          
          <p><strong>No Tipping Required:</strong></p>
          <p>No tipping is needed on P&O ships. Good service is all part of your holiday.</p>

          <p><strong>Staying Connected:</strong></p>
          <p>Your mobile should work as it does ashore (check roaming with your provider). All ships have extensive WiFi - you can purchase internet packages before you sail or log on when you board.</p>

          <p><strong>My Holiday App:</strong></p>
          <p>Once onboard, use the free guest WiFi to access My Holiday - your pocket planner for booking shows, viewing your account, making dining reservations, and even joining restaurant queues virtually.</p>

          <p><strong>Laundry:</strong></p>
          <p>Self-service launderettes with washers, dryers and ironing stations are available. You'll need to supply your own detergent (available to buy onboard). Launderettes are closed on cruises less than 5 nights.</p>

          <p><strong>Smoking Policy:</strong></p>
          <p>For everyone's safety and comfort, smoking isn't permitted in cabins, on balconies, or in public rooms. Smoking (including e-cigarettes) is only allowed in designated open deck areas.</p>

          <p><strong>Other Useful Info:</strong></p>
          <ul className="info-list">
            <li>Access P&O Horizon for show bookings and daily schedules</li>
            <li>Shops and casino are only open at sea</li>
            <li>The Retreat on Deck 18 is adults only (16+)</li>
            <li>Reception is open 24 hours on Deck 7</li>
            <li>Currency onboard is British Pounds (£)</li>
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
    </div>
  );
}

export default ShipContent;
