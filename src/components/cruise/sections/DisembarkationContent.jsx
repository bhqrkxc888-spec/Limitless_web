import FeedbackSection from '../FeedbackSection';
import './SectionContent.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

function DisembarkationContent({ sectionKey, dayData }) {
  const renderSection = () => {
    switch (sectionKey) {
      case 'whatToExpect':
        return <WhatToExpectSection dayData={dayData} />;
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

function WhatToExpectSection({ dayData }) {
  return (
    <div className="section-what-expect">
      <div className="sub-section">
        <h3>🌙 NIGHT BEFORE</h3>
        <p><strong>[TBC]</strong> Packing, luggage outside cabin, overnight bag info will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>☀️ MORNING</h3>
        <p><strong>[TBC]</strong> Breakfast, disembarkation process info will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>📋 TYPICAL TIMELINE</h3>
        <ul className="info-list">
          <li><strong>[TBC]</strong> Times for disembarkation will appear here</li>
        </ul>
      </div>

      <div className="fb-group-link">
        <p>
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Stay in touch via our FB group
          </a>
        </p>
      </div>
    </div>
  );
}

function TipsSection({ dayData }) {
  return (
    <div className="section-tips">
      <p><strong>[TBC]</strong> Tips for disembarkation day will appear here.</p>
      <ul className="info-list">
        <li>[TBC] Tip 1</li>
        <li>[TBC] Tip 2</li>
        <li>[TBC] Tip 3</li>
      </ul>
    </div>
  );
}

function SendSection({ dayData }) {
  return (
    <div className="section-send">
      <SubSection title="🚢 PRIORITY DISEMBARKATION" content="[TBC] Content about priority disembarkation" />
      <SubSection title="♿ ASSISTANCE" content="[TBC] Content about assistance available" />
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

export default DisembarkationContent;
