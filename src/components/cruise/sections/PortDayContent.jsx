import FeedbackSection from '../FeedbackSection';
import './SectionContent.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

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

function PortDayContent({ sectionKey, dayData }) {
  const renderSection = () => {
    switch (sectionKey) {
      case 'overview':
        return <OverviewSection dayData={dayData} />;
      case 'stayLocal':
        return <StayLocalSection dayData={dayData} />;
      case 'goFurther':
        return <GoFurtherSection dayData={dayData} />;
      case 'withKids':
        return <WithKidsSection dayData={dayData} />;
      case 'send':
        return <SendSection dayData={dayData} />;
      case 'foodAndDrink':
        return <FoodDrinkSection dayData={dayData} />;
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

function OverviewSection({ dayData }) {
  return (
    <div className="section-overview">
      <div className="section-intro">
        <p><strong>[TBC]</strong> Port description - 2-3 paragraphs about the place will appear here.</p>
        <p>[Placeholder content for port overview]</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🌡️ WEATHER (March typical)</h3>
        <p><strong>[TBC]</strong> {dayData.weatherSeasonal || 'Seasonal weather info will appear here.'}</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>📍 PORT INFO</h3>
        <ul className="info-list">
          <li><strong>Dock:</strong> [TBC] {dayData.portInfo?.dockLocation || 'Location'}</li>
          <li><strong>Distance to town:</strong> [TBC] {dayData.portInfo?.distanceToTown || 'Distance'}</li>
          <li><strong>Shuttle:</strong> {dayData.portInfo?.shuttleInfo || 'Check onboard'}</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>⏰ TIMING</h3>
        <ul className="info-list">
          <li><strong>Arrive:</strong> {dayData.arriveTime || '[TBC]'}</li>
          <li><strong>Depart:</strong> {dayData.departTime || '[TBC]'}</li>
          <li><strong>All aboard:</strong> 30 mins before departure</li>
        </ul>
      </div>
    </div>
  );
}

function StayLocalSection({ dayData }) {
  return (
    <div className="section-stay-local">
      <div className="section-intro">
        <p>Everything here is walking distance from the ship.</p>
        <p className="fb-group-link">
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Join our G606 Facebook group
          </a>{' '}
          to share tips with fellow cruisers!
        </p>
      </div>

      <hr className="section-divider" />

      <SubSection title="🚶 QUICK WALK (15 mins or less)" content="[TBC] Quick walk content" />
      <SubSection title="🚶‍♂️ LONGER WALK (30-45 mins)" content="[TBC] Longer walk content with suggested route" />
      <SubSection title="🌳 PARKS & GARDENS" content="[TBC] Parks and gardens content" />
      <SubSection title="🏖️ BEACH" content="[TBC] Beach content or 'No beach within walking distance'" />
      <SubSection title="📸 SCENIC / PHOTO SPOTS" content="[TBC] Scenic and photo spots content" />
      <SubSection title="🛍️ SHOPPING" content="[TBC] Shopping content" />
      <SubSection title="☕ QUICK COFFEE" content="[TBC] Quick coffee content" />
      <SubSection title="🍺 BAR / PUB" content="[TBC] Bar/pub content" />
      <SubSection title="🌧️ IF IT RAINS" content="[TBC] Rainy day alternatives" />

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>💡 OUR TIP</h3>
        <p><strong>[TBC]</strong> Personal recommendation will appear here.</p>
      </div>
    </div>
  );
}

function GoFurtherSection({ dayData }) {
  return (
    <div className="section-go-further">
      <div className="section-intro">
        <p>These need transport - tour, taxi, or public transport.</p>
      </div>

      <hr className="section-divider" />

      <div className="attraction-block">
        <h3>⭐ [ATTRACTION NAME]</h3>
        <p><strong>[TBC]</strong> Description will appear here.</p>
        <ul className="info-list">
          <li><strong>P&O option:</strong> [TBC] Info about typical P&O excursion</li>
          <li><strong>Independent:</strong> [TBC] How to do it yourself</li>
          <li><strong>Allow:</strong> [TBC] Time needed</li>
          <li><strong>Cost:</strong> [TBC] Approximate or "Check current prices"</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="attraction-block">
        <h3>⭐ [ANOTHER ATTRACTION]</h3>
        <p><strong>[TBC]</strong> More attractions will be listed here.</p>
      </div>

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>💡 OUR TAKE</h3>
        <p><strong>[TBC]</strong> Recommendation on what's worth it will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-note">
        <p>For P&O excursions: Check the P&O app or Reception onboard for current options, prices, and availability.</p>
      </div>
    </div>
  );
}

function WithKidsSection({ dayData }) {
  return (
    <div className="section-with-kids">
      <SubSection title="👶 TODDLERS / YOUNG KIDS" content="[TBC] Content - playgrounds, easy activities" />
      <SubSection title="🧒 OLDER KIDS / TEENS" content="[TBC] Content - activities for older children" />
      <SubSection title="🍕 KID-FRIENDLY FOOD" content="[TBC] Kid-friendly food recommendations" />
      <SubSection title="⚠️ WATCH OUT FOR" content="[TBC] Warnings - cobblestones, hills, timing issues" />

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>💡 EASY FAMILY DAY</h3>
        <p><strong>[TBC]</strong> Simple itinerary suggestion will appear here.</p>
      </div>
    </div>
  );
}

function SendSection({ dayData }) {
  return (
    <div className="section-send">
      <SubSection title="♿ MOBILITY" content="[TBC] Content - terrain, wheelchair access, distances" />
      <SubSection title="🔇 QUIET SPOTS" content="[TBC] Content - peaceful areas, escape from crowds" />
      <SubSection title="🎧 SENSORY CONSIDERATIONS" content="[TBC] Content - busy times, overwhelming areas, alternatives" />

      <hr className="section-divider" />

      <div className="info-note">
        <p>ℹ️ Accessibility information is based on research. Please contact venues directly to confirm current provisions for your specific needs.</p>
      </div>
    </div>
  );
}

function FoodDrinkSection({ dayData }) {
  return (
    <div className="section-food-drink">
      <SubSection title="🍽️ RESTAURANTS" content="[TBC] List with brief descriptions" />
      <SubSection title="☕ CAFÉS" content="[TBC] List with brief descriptions" />
      <SubSection title="🍺 BARS" content="[TBC] List with brief descriptions" />

      <hr className="section-divider" />

      <div className="info-block">
        <h3>🍴 LOCAL SPECIALITY</h3>
        <p><strong>[TBC]</strong> What to try - local dish/drink will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="tip-block">
        <h3>💡 TIPS</h3>
        <p><strong>[TBC]</strong> Lunch hours, tipping, etc. will appear here.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-note">
        <p>ℹ️ Always check current opening times before visiting.</p>
      </div>
    </div>
  );
}

export default PortDayContent;
