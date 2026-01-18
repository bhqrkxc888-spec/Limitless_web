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
          <li>Muster drill (check Horizon for time)</li>
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
        
        <p>Upon embarkation, a friendly crew member will help direct you to your muster station. Your boarding pass is scanned so you can familiarise yourself with where you'd need to go in an emergency.</p>

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
          <li>Attendance is tracked electronically when you scan your card</li>
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
        <p>P&O send luggage tags with your cruise documents approximately 3-4 weeks before departure. You can also print tags from your My P&O Cruises account online.</p>

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
        <p>You receive your cruise card during check-in at the terminal, before boarding. This card is your cabin key, onboard payment method, ID for getting on/off the ship, and muster drill tracker.</p>

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
      <div className="content-card">
        <p className="content-card-title">Tip 1: Arrive at Your Allocated Time Slot</p>
        <p>P&O assign boarding time slots to manage the flow of guests. Your slot is shown in your cruise documents and My P&O app. Arriving early won't get you on sooner - you'll just queue longer. Arriving within your slot means minimal waiting.</p>
        <p className="info-note">Exception: Suite guests and those with early boarding benefits can arrive earlier.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 2: Download the P&O Horizon App Before Boarding</p>
        <p>Download and log into the P&O Horizon app before you leave home. On embarkation day, the ship's WiFi will be slow with everyone connecting. Use the app to check your boarding time, view cabin readiness status, make dining reservations, book speciality restaurants, check daily programme, and navigate the ship with deck plans.</p>
        <p className="info-note">Pro tip: Screenshot anything important as app connectivity can be patchy initially.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 3: Book Speciality Restaurants Immediately</p>
        <p>Speciality restaurant slots sell out fast - especially 7pm Saturday sittings and formal night dates. As soon as you board, head to the restaurant booking desk (usually near the Atrium), or use the Horizon app to book online.</p>
        <p><strong>Popular restaurants to book:</strong> The Glass House (wine bar dining), Epicurean (fine dining), Sindhu (Asian fusion), The Keel & Cow (steakhouse).</p>
        <p className="info-note">Don't wait until after the muster drill - prime slots go quickly.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 4: Head to the Buffet for Lunch First</p>
        <p>The Horizon Buffet is your best lunch option on boarding day. The main dining rooms don't open until dinner, and the buffet has the widest selection. Head there early (before 1pm) for the quietest experience and best selection.</p>
        <p className="info-note">Sit by the windows for views of Southampton as you prepare to depart.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 5: Capture the Sail-Away Experience</p>
        <p>Sail-away from Southampton is special - you pass the historic docks, other cruise ships, and head into the Solent. Position yourself on the pool deck (best elevated views, busy atmosphere), promenade deck (classic ocean liner experience), your balcony (private and peaceful if cabin is ready), or Crow's Nest bar (forward-facing views with a drink).</p>
        <p className="info-note">The ship sounds its horn as it departs - a proper goosebumps moment. Have your camera ready!</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 6: Know Your Muster Station Before Boarding</p>
        <p>Your muster station letter is on your cruise documents and will be on your cabin door. Memorise it before you board so you're not rushing later. The drill happens about 30-60 minutes before sail-away - you don't want to miss your position on deck watching the departure!</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 7: Keep Your Cruise Card Handy at All Times</p>
        <p>From the moment you receive it at check-in, your cruise card is your everything. You'll need it to get back on the ship (every time), open your cabin door, pay for drinks and purchases, check in at the muster drill, and scan when entering restaurants.</p>
        <p className="info-note">Top tip: Use a lanyard or card holder - it's easy to misplace otherwise.</p>
      </div>
    </div>
  );
}

function SendSection({ dayData: _dayData }) {
  return (
    <div className="section-send">
      <div className="sub-section">
        <h3>Assistance at Southampton Terminal</h3>
        
        <p><strong>What Assistance is Available?</strong></p>
        <p>Southampton Ocean Terminal is fully accessible and P&O provides comprehensive support:</p>
        <ul className="info-list">
          <li><strong>Wheelchair assistance:</strong> Available from car drop-off through to the ship</li>
          <li><strong>Mobility scooter users:</strong> Can use scooters through the terminal; ship has designated storage</li>
          <li><strong>Visual impairment support:</strong> Staff escort through check-in and security</li>
          <li><strong>Hearing impairment:</strong> Visual announcements displayed; staff trained in basic BSL</li>
          <li><strong>Hidden disabilities:</strong> Sunflower lanyard scheme recognised</li>
        </ul>

        <p><strong>How to Arrange Assistance:</strong></p>
        
        <p><strong>Before your cruise:</strong></p>
        <ul className="info-list">
          <li>Contact P&O's Guest Accessibility Team: 0344 338 8014</li>
          <li>Add requirements to your booking via My P&O Cruises</li>
          <li>Email: accessibility@pocruises.com</li>
          <li>Request assistance at least 48 hours before embarkation</li>
        </ul>

        <p><strong>On arrival:</strong></p>
        <ul className="info-list">
          <li>Inform parking staff/porters of your needs</li>
          <li>Meet & Assist staff available at terminal entrance</li>
          <li>Dedicated accessible check-in lanes available</li>
        </ul>

        <p><strong>Wheelchairs:</strong></p>
        <ul className="info-list">
          <li>Bring your own (stored in cabin or designated area)</li>
          <li>Ship wheelchairs available for emergency use only</li>
          <li>Terminal wheelchairs available for embarkation/disembarkation</li>
          <li>Power wheelchairs and scooters must be battery-operated (dry cell or gel batteries only)</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Early Boarding</h3>
        
        <p><strong>Who Gets Early Boarding?</strong></p>
        <ul className="info-list">
          <li><strong>Guests requiring assistance:</strong> Priority boarding - contact accessibility team</li>
          <li><strong>Suite guests:</strong> Early slots allocated automatically - check documents</li>
          <li><strong>Peninsular Club members:</strong> Earlier slots by tier - automatic based on tier</li>
          <li><strong>Select Price bookings:</strong> May include priority - check booking benefits</li>
          <li><strong>Families with young children:</strong> Priority at terminal - request at check-in</li>
        </ul>

        <p><strong>How to Request Early Boarding:</strong></p>
        
        <p><strong>For accessibility needs:</strong></p>
        <ul className="info-list">
          <li>Contact P&O Guest Accessibility Team (details above)</li>
          <li>State your specific requirements</li>
          <li>Request priority boarding in your notes</li>
          <li>Confirm arrangements 48 hours before sailing</li>
        </ul>

        <p><strong>For other reasons:</strong></p>
        <ul className="info-list">
          <li>Loyalty members: Check your tier benefits in My P&O</li>
          <li>Suite guests: Usually automatic - check your documents</li>
          <li>Select Price: Review your booking benefits</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Muster Drill Accommodations</h3>
        
        <p><strong>Standard Muster Drill Process:</strong></p>
        <p>All guests must attend the emergency muster drill before departure. This involves going to your assigned station and listening to safety information.</p>

        <p><strong>Accessibility Provisions:</strong></p>
        
        <p><strong>Mobility requirements:</strong></p>
        <ul className="info-list">
          <li>Accessible muster stations assigned automatically when booked</li>
          <li>Stations located in areas with lift access and seating</li>
          <li>Wheelchair users positioned for easy evacuation route access</li>
          <li>Extended time allowances for reaching stations</li>
        </ul>

        <p><strong>Seated drill arrangements:</strong></p>
        <ul className="info-list">
          <li>Yes, you can request a seated drill location</li>
          <li>Chairs provided at all accessible muster stations</li>
          <li>Notify the accessibility team when booking</li>
          <li>Crew will verify attendance at your seat</li>
        </ul>

        <p><strong>Visual impairments:</strong></p>
        <ul className="info-list">
          <li>Tactile guidance available to stations</li>
          <li>Crew member escort can be arranged</li>
          <li>Audio descriptions of safety equipment</li>
          <li>Braille safety cards available in cabins</li>
        </ul>

        <p><strong>Hearing impairments:</strong></p>
        <ul className="info-list">
          <li>Visual alarm systems in accessible cabins</li>
          <li>Written safety information provided</li>
          <li>BSL interpretation available on request</li>
          <li>Vibrating pillow alerts can be arranged</li>
        </ul>

        <p><strong>Exemptions:</strong></p>
        <p>There are no exemptions from the muster drill as it's a legal requirement. However, significant accommodations are made:</p>
        <ul className="info-list">
          <li>Cabin muster drill for guests who cannot attend in person (rare, requires medical documentation)</li>
          <li>Crew member visits to explain procedures</li>
          <li>Alternative timing if genuine medical emergency</li>
        </ul>

        <p><strong>How to Arrange Muster Accommodations:</strong></p>
        <ol className="info-list">
          <li>Add accessibility requirements to your booking</li>
          <li>Contact the Guest Accessibility Team</li>
          <li>Confirm arrangements on boarding</li>
          <li>Speak to Guest Services if issues arise</li>
        </ol>
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
