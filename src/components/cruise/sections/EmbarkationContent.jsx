import PortWeather from '../PortWeather';
import './SectionContent.css';

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
        <h3>Typical Timeline</h3>
        <ul className="info-list">
          <li>Arrive at terminal at allocated time</li>
          <li>Security screening</li>
          <li>Check-in and boarding card</li>
          <li>Board ship, cabin ready ~2pm</li>
          <li>Muster drill (check Horizon magazine (delivered to your cabin) for time)</li>
          <li>Sail away ~4:30-5pm (check your docs)</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>First Few Hours Onboard</h3>
        
        <p><strong>What Happens Right After Boarding?</strong></p>
        <p>Once you've cleared security and check-in, you'll walk through the gangway directly onto the ship. P&O crew members will be there to welcome you and direct you to your deck. You'll tap your cruise card on a sensor as you board - this activates your account and tracks your embarkation.</p>

        <p><strong>Where to Go First?</strong></p>
        
        <div className="content-card">
          <p className="content-card-title">Option 1: Head to the Buffet (Recommended)</p>
          <p>Most experienced cruisers head straight to the Horizon Buffet (Deck 16 on Iona). It's open from boarding, serves a full lunch spread, and you can grab a table with sea views while the ship is still quiet. This is your best chance for a relaxed first meal before the crowds arrive.</p>
        </div>

        <div className="content-card">
          <p className="content-card-title">Option 2: Explore the Ship</p>
          <p>If you've eaten, take advantage of the quiet ship to explore. The pools, main atrium, and public areas are all open. It's much easier to get your bearings before 4,000 other guests have the same idea.</p>
        </div>

        <div className="content-card">
          <p className="content-card-title">Option 3: Go to Your Cabin</p>
          <p>If you booked a Conservatory Mini-Suite, Suite, or have Select Price benefits, your cabin may be ready earlier. Otherwise, head to your cabin area to drop off hand luggage - the steward can store bags in the corridor if not quite ready.</p>
        </div>

        <p><strong>When Are Cabins Ready?</strong></p>
        <ul className="info-list">
          <li><strong>Standard cabins:</strong> Usually ready between 1:30pm and 2:00pm</li>
          <li><strong>Suites and higher grades:</strong> Often ready from 1:00pm</li>
          <li><strong>Luggage delivery:</strong> Typically arrives between 3:00pm and 6:00pm (sometimes later on busy sailings)</li>
        </ul>

        <p><strong>What's Open Immediately on Embarkation Day?</strong></p>
        <p><strong>Restaurants & Bars (from boarding):</strong></p>
        <ul className="info-list">
          <li>Horizon Buffet (Deck 16) - full lunch service</li>
          <li>Grab & Go counter - sandwiches, snacks</li>
          <li>Coffee shops - may charge for speciality coffees</li>
          <li>Most bars open from early afternoon</li>
        </ul>

        <p><strong>Open Areas:</strong></p>
        <ul className="info-list">
          <li>Main pool deck and pools (weather dependent)</li>
          <li>Spa facilities (treatments bookable)</li>
          <li>Shops (browse only until sail-away)</li>
          <li>Photo gallery</li>
          <li>Casino (opens once at sea)</li>
          <li>Main theatre (may have welcome shows)</li>
        </ul>

        <p><strong>Closed Until Later:</strong></p>
        <ul className="info-list">
          <li>Main Dining Room - opens for dinner</li>
          <li>Speciality restaurants - dinner service only</li>
          <li>Some entertainment venues</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Muster Drill & Safety Briefing</h3>
        
        <p>Upon embarkation, a friendly crew member will help direct you to your muster station. You'll scan your boarding pass at your muster station (you'll receive your cruise card/room key later - it will be in the letter holder outside your cabin).</p>

        <p><strong>In-Cabin Safety Video:</strong></p>
        <p>When you arrive at your cabin, you'll be asked to watch the safety video on your in-cabin TV. This covers important health, wellbeing and safety information, including what to do in an emergency and a life jacket demonstration. Once you've watched it, you're free to relax, explore and enjoy the ship.</p>

        <p><strong>Your Muster Station:</strong></p>
        <ul className="info-list">
          <li>Each cabin is assigned a muster station letter (A, B, C, etc.)</li>
          <li>Your station is shown on your cabin door and cruise card</li>
          <li>Stations are in public areas like lounges or the theatre</li>
          <li>Crew will be there to guide you on embarkation day</li>
        </ul>

        <p><strong>What You Need to Know:</strong></p>
        <ul className="info-list">
          <li>No need to bring life jackets - just yourself and your cruise card</li>
          <li>Attendance is tracked electronically when you scan your boarding pass</li>
          <li>The whole process takes about 15-20 minutes</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Health & Wellbeing Onboard</h3>
        
        <p>P&O has comprehensive measures in place to help everyone feel comfortable throughout their holiday:</p>

        <ul className="info-list">
          <li>Guests are asked to declare any symptoms before boarding</li>
          <li>Enhanced onboard ventilation systems improve air filtration</li>
          <li>High levels of cleanliness maintained throughout the ship</li>
          <li>Medical facilities and plans in place for any health needs</li>
        </ul>

        <p className="info-note">Wellbeing measures may be updated during your cruise as P&O works with experts and authorities. The focus is always on protecting guests, crew and the communities visited.</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Money Matters</h3>
        
        <p><strong>Everything in Sterling:</strong></p>
        <p>Because everything on a P&O cruise is priced in £ sterling - from your initial holiday cost to onboard extras - you never need to worry about fluctuating exchange rates.</p>

        <p><strong>Cash-Free Ship:</strong></p>
        <p>All P&O ships operate a 'cash free' environment. Simply present your cruise card for any purchases. Ships don't accept cash except at Reception for settling your final account.</p>

        <p><strong>Register Your Card:</strong></p>
        <p>As part of online check-in, you'll register a payment card for onboard use. This speeds up embarkation. Accepted cards include Visa, MasterCard, American Express, Diners Club, and Discover. Solo, Maestro, Switch or prepaid cards are not accepted.</p>

        <p><strong>Daily Authorisation:</strong></p>
        <p>Your daily spend is authorised with your card provider at the end of each day. Your card company may hold these authorisations for up to 28 days. Final payment isn't taken until you disembark.</p>

        <p><strong>Cash Onboard:</strong></p>
        <p>If you need cash whilst onboard, you can charge it to your account. Limits apply: £250 per day, £1,250 per 7 days, £5,000 per 30 days.</p>

        <p className="info-note">Foreign exchange services are not available onboard. Exchange money before you travel, or use ATMs in port.</p>
      </div>

    </div>
  );
}

function GettingThereSection({ dayData: _dayData }) {
  return (
    <div className="section-getting-there">
      <div className="info-block">
        <h3>By Car</h3>
        
        <p><strong>Terminal Address & Postcode:</strong></p>
        <div className="content-card">
          <p><strong>Ocean Terminal (Berths 46/47)</strong><br />
          Southern Road<br />
          Southampton<br />
          SO15 1BA</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--clr-text-muted)' }}>
            For the newer Ocean Cruise Terminal (Horizon Cruise Terminal), use: <strong>SO14 3QN</strong>
          </p>
          <p className="info-note" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Check your cruise documents for the exact terminal name.
          </p>
        </div>

        <p><strong>Parking:</strong></p>
        <p>Various parking options are available at and near the terminal. If you've pre-booked parking, follow the instructions provided by your parking provider.</p>

        <p><strong>Drop-off:</strong></p>
        <p>There's a dedicated drop-off area at the terminal entrance with porters available to assist with luggage.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>By Train</h3>
        
        <p><strong>Station:</strong> Southampton Central</p>
        <p><strong>Distance to Terminal:</strong> Approximately 1.5 miles (2.5 km)</p>

        <p>A taxi rank is located outside Southampton Central station. The journey to the cruise terminal takes approximately 5-10 minutes. Simply tell the driver "Ocean Terminal for P&O".</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>Luggage</h3>
        
        <p><strong>Luggage Tags:</strong></p>
        <p>Print your own luggage tags from the P&O Cruises website before you travel, or collect them at the terminal check-in desk.</p>

        <p><strong>Hand Luggage Essentials:</strong></p>
        <p>Your main bags may not arrive at your cabin for several hours, so pack these items in your hand luggage:</p>

        <p><strong>Must have:</strong></p>
        <ul className="info-list">
          <li>Passport and cruise documents</li>
          <li>Any medications</li>
          <li>Phone and charger</li>
          <li>Glasses/contact lenses</li>
          <li>Money/cards</li>
        </ul>

        <p><strong>Strongly recommended:</strong></p>
        <ul className="info-list">
          <li>Change of clothes (swimwear if you want the pool!)</li>
          <li>Basic toiletries</li>
          <li>Sunglasses and sun cream</li>
          <li>Camera for embarkation photos</li>
        </ul>

        <p><strong>When Do You Get Your Cabin Key (Cruise Card)?</strong></p>
        <p>You receive your boarding pass at terminal check-in. Your cruise card (room key and onboard payment card) will be in the letter holder outside your cabin when you arrive.</p>

        <p><strong>Luggage Options:</strong></p>

        <div className="content-card">
          <p className="content-card-title">Porter Service (recommended for large bags)</p>
          <ul className="info-list">
            <li>Hand your tagged luggage to porters at the terminal entrance</li>
            <li>Bags are delivered to your cabin door</li>
            <li>Usually arrives between 3pm and 6pm</li>
          </ul>
        </div>

        <div className="content-card">
          <p className="content-card-title">Self-carry</p>
          <ul className="info-list">
            <li>You can wheel/carry bags through security yourself</li>
            <li>Take them directly to your cabin</li>
            <li>Recommended for hand luggage and smaller bags only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TipsSection({ dayData: _dayData }) {
  return (
    <div className="section-tips">
      <div className="content-card tip-card">
        <p className="content-card-title">Arrive at Your Allocated Time Slot</p>
        <p>P&O assign boarding time slots to manage the flow of guests. Your slot is shown in your cruise documents. Arriving early won't get you on sooner - you'll just queue longer. Arriving within your slot means minimal waiting.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Know How to Access My Holiday Onboard</p>
        <p>Once onboard, you'll use the My Holiday website to book restaurants, reserve show seats, and check your onboard account.</p>
        <p><strong>How to Access My Holiday:</strong></p>
        <ol className="info-list">
          <li>Switch your device to Airplane Mode</li>
          <li>Connect to P&O Cruises Wi-Fi network (1 hour free for the duration of the cruise; access to P&O Horizon is always available)</li>
          <li>Open browser and go to myholiday.pocruises.com (or scan QR codes in your cabin)</li>
          <li>Log in using the last 6 digits of your cruise card barcode</li>
        </ol>
        
        <p><strong>About the free 1 hour Wi-Fi:</strong> When you start using your 1 hour of free Wi-Fi, the timer runs for 60 continuous minutes. This cannot be split into shorter sessions throughout the cruise (e.g., 12 × 5-minute sessions).</p>

        <div className="warning-box">
          <p><strong>⚠️ Important: Disable Mobile Data</strong></p>
          <p>If you do not have a Wi-Fi plan, ensure mobile data is disabled on your device to prevent charges. Maritime networks are extremely expensive and can run up significant costs very quickly if your device connects automatically.</p>
        </div>

        <p><strong>What You Can Do:</strong></p>
        <ul className="info-list">
          <li>Book specialty restaurants and show seats</li>
          <li>Check your onboard spending and account balance</li>
          <li>View daily event schedules (also in Horizon magazine)</li>
          <li>Browse shore excursion information</li>
        </ul>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Book Speciality Restaurants Immediately (if not already booked pre-cruise)</p>
        <p>Speciality restaurant slots sell out fast - especially 7pm Saturday sittings and formal night dates. As soon as you board, head to the restaurant booking desk (usually near the Atrium), or use the My Holiday website (myholiday.pocruises.com) once onboard.</p>
        <p><strong>Popular restaurants to book:</strong> The Glass House (wine bar dining), Epicurean (fine dining), Sindhu (Asian fusion), The Keel & Cow (steakhouse).</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Head to the Buffet for Lunch First</p>
        <p>The Horizon Buffet is your best lunch option on boarding day. The main dining rooms don't open until dinner, and the buffet has the widest selection. Head there early (before 1pm) for the quietest experience and best selection.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Capture the Sail-Away Experience</p>
        <p>Sail-away from Southampton is special - you pass the historic docks, other cruise ships, and head into the Solent. Position yourself on the pool deck (best elevated views, busy atmosphere), promenade deck (classic ocean liner experience), your balcony (private and peaceful if cabin is ready), or Crow's Nest bar (forward-facing views with a drink).</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Know Your Muster Station</p>
        <p>Your muster station is provided at check-in and will be explained as you board the ship by staff who will scan details confirming that you have attended your muster station.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Keep Your Cruise Card Handy at All Times</p>
        <p>From the moment you collect your cruise card from your room letter box, your cruise card is your everything. You'll need it to get back on the ship (every time), open your cabin door, pay for drinks and purchases, check in at the muster drill, and scan when entering restaurants.</p>
      </div>
    </div>
  );
}

function SendSection({ dayData: _dayData }) {
  return (
    <div className="section-send">
      <div className="sub-section">
        <h3>SEND & Accessibility Support</h3>
        
        <p>P&O Cruises works with guests to ensure cruise holidays are suitable for their needs whilst remaining enjoyable and relaxing. This guide provides a summary of the support available. For complete, up-to-date information, please visit the official P&O Cruises accessibility pages.</p>

        <div className="info-box">
          <p><strong>📋 Complete the On Board Needs Questionnaire</strong></p>
          <p>It is essential that you complete the On Board Needs questionnaire as soon as possible after booking. This allows P&O to arrange appropriate assistance and ensure compliance with safety requirements. Access via your booking: <a href="https://www.pocruises.com/account/manage-booking" target="_blank" rel="noopener noreferrer">Manage My Booking</a></p>
        </div>

        <p><strong>Official P&O Accessibility Information:</strong></p>
        <ul className="info-list">
          <li><strong>Main Accessibility Hub:</strong> <a href="https://www.pocruises.com/accessibility" target="_blank" rel="noopener noreferrer">P&O Accessibility</a></li>
          <li><strong>Life Onboard:</strong> <a href="https://www.pocruises.com/accessibility/life-onboard" target="_blank" rel="noopener noreferrer">Mobility Assessment & Onboard Assistance</a></li>
          <li><strong>Trips & Shore Excursions:</strong> <a href="https://www.pocruises.com/accessibility/ashore" target="_blank" rel="noopener noreferrer">Getting On/Off Ship & Port Access</a></li>
          <li><strong>Impairments & Disabilities:</strong> <a href="https://www.pocruises.com/accessibility/impairments-and-disabilities" target="_blank" rel="noopener noreferrer">Specific Support Information</a></li>
          <li><strong>Emergencies & Safety:</strong> <a href="https://www.pocruises.com/accessibility/emergencies-and-other-information" target="_blank" rel="noopener noreferrer">Emergency Procedures & Requirements</a></li>
        </ul>
      </div>


      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Emergency Procedures - Critical Information</h3>
        
        <div className="warning-box">
          <p><strong>⚠️ Emergency Assistance Registration Required</strong></p>
          <p>In the event of an emergency, guests will not be able to use the lifts. Guests who cannot independently reach their muster stations (which could involve going up or down several flights of stairs) due to disability, health or mental capacity must be pre-registered for assistance.</p>
          <p>This is essential to ensure we have enough crew allocated and to comply with Safety of Life at Sea (SOLAS) requirements.</p>
          <p><strong>Even if you are travelling with someone who can support you, you must still register for assistance as that person may not be with you in the event of an emergency.</strong></p>
          <p>If you arrive at the terminal and require assistance in the event of an emergency but have failed to disclose this requirement beforehand, you may be denied boarding on safety grounds.</p>
        </div>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>How to Arrange Assistance</h3>
        
        <p><strong>Before Your Cruise (at least 2 weeks before embarkation):</strong></p>
        <ul className="info-list">
          <li>Complete the On Board Needs questionnaire via <a href="https://www.pocruises.com/account/manage-booking" target="_blank" rel="noopener noreferrer">My P&O Cruises</a></li>
          <li>Contact P&O's Guest Accessibility Team: <strong>0344 338 8014</strong></li>
          <li>Email: <strong>accessibility@pocruises.com</strong></li>
          <li>Inform P&O of any disability at time of booking</li>
        </ul>

        <p><strong>At the Terminal:</strong></p>
        <ul className="info-list">
          <li>Inform parking staff/porters of your needs</li>
          <li>Meet & Assist staff available at terminal entrance</li>
          <li>Dedicated accessible check-in lanes available</li>
          <li>Southampton Ocean Terminal is fully accessible</li>
        </ul>

        <p className="info-note">For complete details on all accessibility services, equipment availability, and specific requirements, please visit the official P&O Cruises accessibility pages linked above. Information is subject to change and P&O's official website contains the most current details.</p>
      </div>
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
