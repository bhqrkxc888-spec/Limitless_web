import FeedbackSection from '../FeedbackSection';
import VenueFinder from '../VenueFinder';
import { getRecommendations } from '../../../data/cruise/iona-venues';
import './SectionContent.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

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
      <FeedbackSection sectionKey={sectionKey} dayNumber={dayData.dayNumber} />
    </div>
  );
}

function OverviewSection({ dayData, nextPort }) {
  return (
    <div className="section-overview">
      {/* Sea Day Hero Image Placeholder */}
      <div className="image-placeholder">
        <span className="image-placeholder-icon">🌊</span>
        <span className="image-placeholder-text">Sea day image coming soon</span>
      </div>

      <div className="section-intro">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--clr-text)' }}>
          Sea Day {dayData.dayNumberEnd ? `(${dayData.dayNumber}-${dayData.dayNumberEnd})` : ''}
        </h2>
        <p><strong>No port stops today</strong> — this is your chance to properly explore the ship, relax by the pool, catch a show, or just do absolutely nothing.</p>
        <p>Sea days are what you make them. Some people plan their entire day around meals and activities. Others bring a book to a sun lounger at 10am and don't move until dinner. Both are entirely valid.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🌡️ WEATHER & SEA CONDITIONS</h3>
        <p><strong>[TBC]</strong> Real-time weather forecast and sea conditions will appear here.</p>
        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
          {dayData.dayNumber === 2 ? 'Sailing from Southampton towards Spain — Bay of Biscay can be lively in March' : ''}
          {dayData.dayNumber === 4 ? 'Heading south towards the Canaries — waters typically calmer as we get further south' : ''}
          {dayData.dayNumber === 9 ? 'Sailing north from Canaries towards mainland Spain' : ''}
          {dayData.dayNumber === 13 ? 'Returning north from Lisbon to Southampton — crossing the Bay of Biscay again' : ''}
        </p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>Ship Location</h3>
        <p><strong>[TBC]</strong> Live ship tracking map will appear here.</p>
        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Estimated position and progress will be displayed in future updates.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>➡️ WHAT'S AHEAD</h3>
        <p>
          {nextPort ? (
            <>Next port: <strong>{nextPort}</strong></>
          ) : (
            'Returning to Southampton'
          )}
        </p>
      </div>

      <div className="fb-group-link">
        <p>
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Join our G606 Facebook group
          </a>{' '}
          to share your sea day photos and tips!
        </p>
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
