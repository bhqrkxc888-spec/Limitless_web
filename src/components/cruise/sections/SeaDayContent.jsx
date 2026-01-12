import FeedbackSection from '../FeedbackSection';
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
        <h3>📍 SHIP LOCATION</h3>
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
      <SubSection title="🏊 POOLS & SUN DECKS" content="[TBC] Content about pool areas" />
      <SubSection title="🍽️ DINING" content="[TBC] Content about restaurants, times" />
      <SubSection title="🎭 ENTERTAINMENT" content="[TBC] Content about shows, activities" />

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>💡 SEA DAY TIP</h3>
        <p><strong>[TBC]</strong> Advice for making most of sea day will appear here.</p>
      </div>
    </div>
  );
}

function QuietSpotsSection({ dayData: _dayData }) {
  return (
    <div className="section-quiet-spots">
      <div className="section-intro">
        <p>Where to escape the crowds.</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <p><strong>[TBC]</strong> List of quiet areas on Iona with descriptions will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>⏰ BEST TIMES</h3>
        <p><strong>[TBC]</strong> When different areas are quietest will appear here.</p>
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
