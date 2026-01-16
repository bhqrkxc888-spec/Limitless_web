import FeedbackSection from '../FeedbackSection';
import VenueFinder from '../VenueFinder';
import { getRecommendations } from '../../../data/cruise/iona-venues';
import './SectionContent.css';

function SeaDayContent({ sectionKey, dayData, nextPort }) {
  const renderSection = () => {
    switch (sectionKey) {
      case 'overview':
        return <OverviewSection dayData={dayData} nextPort={nextPort} />;
      case 'onTheShip':
        return <OnTheShipSection dayData={dayData} />;
      case 'quietSpots':
        return <QuietSpotsSection dayData={dayData} />;
      case 'send':
        return <SendSection dayData={dayData} />;
      default:
        return null;
    }
  };

  return (
    <div className="section-content">
      {renderSection()}
      <FeedbackSection sectionKey={sectionKey} dayNumber={dayData.dayNumber} portName="At Sea" />
    </div>
  );
}

function OverviewSection({ dayData, nextPort }) {
  // Context-aware sailing notes
  const getSailingNote = () => {
    switch (dayData.dayNumber) {
      case 2:
        return 'Sailing from Southampton towards Spain. The Bay of Biscay can be lively in March, so keep your sea bands handy just in case.';
      case 4:
        return 'Heading south towards the Canaries. Waters are typically calmer as we get further south. A good time to explore the ship.';
      case 9:
        return 'Sailing north from the Canaries towards mainland Spain. Enjoy the last stretch of Atlantic warmth.';
      case 13:
        return 'Returning north from Lisbon to Southampton, crossing the Bay of Biscay again. Final sea day to enjoy the ship.';
      default:
        return null;
    }
  };

  const sailingNote = getSailingNote();

  return (
    <div className="section-overview">
      {/* Sea Day Hero Image Placeholder */}
      <div className="image-placeholder">
        
        <span className="image-placeholder-text">Sea day image coming soon</span>
      </div>

      <div className="section-intro">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--clr-text)' }}>
          Sea Day {dayData.dayNumberEnd ? `(${dayData.dayNumber}-${dayData.dayNumberEnd})` : ''}
        </h2>
        <p><strong>No port stops today.</strong> This is your chance to properly explore the ship, relax by the pool, catch a show, or just do absolutely nothing.</p>
        <p>Sea days are what you make them. Some people plan their entire day around meals and activities. Others bring a book to a sun lounger at 10am and don't move until dinner. Both are entirely valid.</p>
        
        {sailingNote && (
          <p style={{ marginTop: '1rem', fontSize: '0.9375rem', fontStyle: 'italic', opacity: 0.85 }}>
            {sailingNote}
          </p>
        )}
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>What's Ahead</h3>
        <p>
          {nextPort ? (
            <>Next port: <strong>{nextPort}</strong></>
          ) : (
            'Returning to Southampton'
          )}
        </p>
      </div>

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>Sea Day Essentials</h3>
        <ul className="info-list">
          <li><strong>Ship tracker and weather</strong> are shown at the top of this page</li>
          <li>Check the <strong>Ship</strong> tab to explore all venues, restaurants, and facilities</li>
          <li>Book shows and specialty dining through the <strong>Horizon app</strong></li>
          <li>Shops are <strong>only open at sea</strong>, so this is your chance to browse</li>
        </ul>
      </div>
    </div>
  );
}

function OnTheShipSection({ dayData: _dayData }) {
  return (
    <div className="section-on-ship">
      <div className="section-intro">
        <p>Searchable directory of everything on Iona - restaurants, bars, pools, entertainment, and more.</p>
      </div>

      <hr className="section-divider" />

      {/* Venue Finder Component */}
      <VenueFinder />

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>Sea Day Tips</h3>
        <ul className="info-list">
          <li><strong>Book shows early</strong> - Use the Horizon app to reserve seats for popular performances</li>
          <li><strong>Pool loungers</strong> - Grab one early (8-9am) on sea days as they fill up quickly</li>
          <li><strong>Specialty restaurants</strong> - Sea days are good for bookings as there's no port time to consider</li>
          <li><strong>Gym & Spa</strong> - Quieter early morning before the pools get busy</li>
          <li><strong>Shops</strong> - Only open at sea, with best deals often on the last sea day</li>
        </ul>
      </div>
    </div>
  );
}

function QuietSpotsSection({ dayData: _dayData }) {
  const quietSpots = getRecommendations.quietSpots();
  
  return (
    <div className="section-quiet-spots">
      <div className="section-intro">
        <p>Where to escape the crowds on sea days when the ship is busy.</p>
      </div>

      <hr className="section-divider" />

      {quietSpots.map((venue, idx) => (
        <div key={venue.id}>
          <div className="content-card">
            <div className="content-card-title">{venue.name}</div>
            <div className="content-card-meta">
              <span>Deck {venue.deck}</span>
              {venue.style && <span> • {venue.style}</span>}
              {venue.adultsOnly && <span> • Adults Only</span>}
            </div>
            <p>{venue.description}</p>
            {venue.tips && venue.tips.length > 0 && (
              <ul className="info-list">
                {venue.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
          {idx < quietSpots.length - 1 && <hr className="section-divider" />}
        </div>
      ))}

      <hr className="section-divider" />

      <div className="info-block">
        <h3>⏰ BEST TIMES FOR QUIET</h3>
        <ul className="info-list">
          <li><strong>Early morning (7-9am)</strong> - Most areas quiet before breakfast rush</li>
          <li><strong>Lunchtime (12-2pm)</strong> - Everyone at the buffet or dining areas</li>
          <li><strong>Show times (evenings)</strong> - When the theatre is on, public areas empty out</li>
          <li><strong>Port days</strong> - When everyone's ashore, the ship is wonderfully quiet</li>
        </ul>
      </div>

      <div className="tip-block">
        <h3>For Neurodivergent Travellers</h3>
        <p>The Crow's Nest (Deck 17 forward) is particularly good for sensory breaks - 270-degree views with minimal noise. Anderson's Bar & Library is also quiet and dimly lit.</p>
        <p>If you need a complete break, your cabin with the TV off is the quietest spot on the ship.</p>
      </div>
    </div>
  );
}

function SendSection({ dayData: _dayData }) {
  return (
    <div className="section-send">
      <SubSection title="🔇 QUIET HOURS" content="[TBC] Content about quiet hours" />
      <SubSection title="♿ ACCESSIBLE VENUES" content="[TBC] Content about accessible venues" />
      <SubSection title="🎧 SENSORY INFO" content="[TBC] Content about sensory considerations" />
    </div>
  );
}

function SubSection({ title, content }) {
  return (
    <>
      <div className="sub-section">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <hr className="section-divider" />
    </>
  );
}

export default SeaDayContent;
