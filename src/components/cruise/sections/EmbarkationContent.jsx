import FeedbackSection from '../FeedbackSection';
import PortWeather from '../PortWeather';
import './SectionContent.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

function EmbarkationContent({ sectionKey, dayData }) {
  const renderSection = () => {
    switch (sectionKey) {
      case 'whatToExpect':
        return <WhatToExpectSection dayData={dayData} />;
      case 'weather':
        return <WeatherSection dayData={dayData} />;
      case 'gettingThere':
        return <GettingThereSection dayData={dayData} />;
      case 'tips':
        return <TipsSection dayData={dayData} />;
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

function WeatherSection({ dayData }) {
  // Southampton coordinates
  const coords = dayData.coords || { lat: 50.8998, lon: -1.4044 };
  
  return (
    <div className="section-weather">
      <div className="section-intro">
        <p>Weather forecast for Southampton on embarkation day. Live forecasts become available about 8 days before departure.</p>
      </div>

      <hr className="section-divider" />

      <div className="weather-live-section">
        <PortWeather 
          portName="Southampton"
          lat={coords.lat}
          lon={coords.lon}
          portDate={dayData.date}
          compact={false}
          showHourly={true}
          showDaily={true}
          hourlyCount={12}
        />
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>What to Wear</h3>
        <ul className="info-list">
          <li>March in Southampton can be chilly - layer up!</li>
          <li>Comfortable shoes for walking through the terminal</li>
          <li>Keep a jacket in your hand luggage</li>
        </ul>
      </div>

      <div className="info-note">
        <p>The ship has a warm, controlled environment so pack accordingly for the cruise itself.</p>
      </div>
    </div>
  );
}

function WhatToExpectSection({ dayData: _dayData }) {
  return (
    <div className="section-what-expect">
      <div className="info-block">
        <h3>📋 TYPICAL TIMELINE</h3>
        <ul className="info-list">
          <li>Arrive at terminal at allocated time</li>
          <li>Security screening</li>
          <li>Check-in and boarding card</li>
          <li>Board ship, cabin ready ~2pm</li>
          <li>Muster drill (check Horizon for time)</li>
          <li>Sail away ~4:30-5pm (check your docs)</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>🚢 FIRST FEW HOURS ONBOARD</h3>
        <p><strong>[TBC]</strong> Content about what to do when you board will appear here.</p>
      </div>

      <div className="fb-group-link">
        <p>
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Join our G606 Facebook group
          </a>{' '}
          to connect with fellow cruisers!
        </p>
      </div>
    </div>
  );
}

function GettingThereSection({ dayData: _dayData }) {
  return (
    <div className="section-getting-there">
      <div className="info-block">
        <h3>🚗 BY CAR</h3>
        <p><strong>[TBC]</strong> Postcode, parking info will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🚂 BY TRAIN</h3>
        <p><strong>[TBC]</strong> Station, taxi info will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🧳 LUGGAGE</h3>
        <p><strong>[TBC]</strong> Luggage tag info, what to keep in hand luggage will appear here.</p>
      </div>
    </div>
  );
}

function TipsSection({ dayData: _dayData }) {
  return (
    <div className="section-tips">
      <p><strong>[TBC]</strong> Tips for embarkation day will appear here.</p>
      <ul className="info-list">
        <li>[TBC] Tip 1</li>
        <li>[TBC] Tip 2</li>
        <li>[TBC] Tip 3</li>
      </ul>
    </div>
  );
}

function SendSection({ dayData: _dayData }) {
  return (
    <div className="section-send">
      <SubSection title="♿ ASSISTANCE" content="[TBC] Content about assistance available" />
      <SubSection title="🚢 EARLY BOARDING" content="[TBC] Content about early boarding options" />
      <SubSection title="🛡️ MUSTER DRILL" content="[TBC] Content about muster drill accommodations" />
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

export default EmbarkationContent;
