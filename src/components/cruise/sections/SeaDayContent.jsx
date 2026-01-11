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
      <div className="section-intro">
        <p><strong>[TBC]</strong> Description - what to expect on a sea day will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🌡️ WEATHER</h3>
        <p><strong>[TBC]</strong> Seasonal note - e.g., "Bay of Biscay can be choppy"</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>➡️ WHAT'S AHEAD</h3>
        <p>Tomorrow: {nextPort || '[TBC] Next port'}</p>
      </div>

      <div className="fb-group-link">
        <p>
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Join our G606 Facebook group
          </a>{' '}
          to share your sea day tips!
        </p>
      </div>
    </div>
  );
}

function OnTheShipSection({ dayData }) {
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

function QuietSpotsSection({ dayData }) {
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

function SendSection({ dayData }) {
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
