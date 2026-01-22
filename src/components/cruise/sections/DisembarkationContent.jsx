import './SectionContent.css';

function DisembarkationContent({ sectionKey, dayData }) {
  const renderSection = () => {
    switch (sectionKey) {
      case 'whatToExpect':
        return <WhatToExpectSection dayData={dayData} />;
      case 'gettingThere':
        return <GettingHomeSection dayData={dayData} />;
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

function WhatToExpectSection({ dayData: _dayData }) {
  return (
    <div className="section-what-expect">
      <div className="sub-section">
        <h3>The Night Before Disembarkation</h3>
        
        <p><strong>Key tasks to complete:</strong></p>

        <p><strong>Settle your onboard account:</strong></p>
        <p>Check your bill on the TV or My Holiday website (myholiday.pocruises.com). Any discrepancies must be resolved at Guest Services before 10pm. If paying by card registered at boarding, charges are automatic.</p>

        <p><strong>Pack your luggage:</strong></p>
        <p>If using P&O's luggage service, bags must be outside your cabin door by the time stated (usually 10pm-11pm). Make sure your luggage tags are firmly secured to your baggage.</p>

        <p><strong>Check disembarkation information:</strong></p>
        <p>A letter will be delivered to your cabin with your allocated time and further information on the process.</p>

        <p><strong>Collect any stored items:</strong></p>
        <p>Retrieve valuables from the safe, collect any dry cleaning, and gather items from around the cabin.</p>

        <p><strong>Set aside breakfast clothes:</strong></p>
        <p>Keep what you need for the morning in the cabin - don't pack everything!</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Disembarkation Morning Timeline</h3>
        
        <p><strong>Typical schedule (times vary by sailing):</strong></p>
        <ul className="info-list">
          <li><strong>6:00am - 8:30am:</strong> Breakfast available (buffet and main dining room)</li>
          <li><strong>6:30am onwards:</strong> Ship cleared by UK Border Force</li>
          <li><strong>7:00am - 7:30am:</strong> Self-disembarkation guests begin disembarking</li>
          <li><strong>9:30am - 10:00am:</strong> Final guests disembark</li>
          <li><strong>10:30am:</strong> All guests must have left the ship</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Two Disembarkation Options</h3>
        <p>You have two choices for how you leave the ship. Consider which suits you best:</p>
      </div>

      <hr className="section-divider" />

      <div className="content-card">
        <h3 className="content-card-title">Option 1: Self-Disembarkation (Carrying Your Own Luggage)</h3>
        
        <p><strong>Best for:</strong> Early departures, light packers, tight connections, avoiding waits.</p>

        <p><strong>How it works:</strong></p>
        <ul className="info-list">
          <li>You carry ALL your own luggage off the ship</li>
          <li>No waiting for your time slot</li>
          <li>Walk straight through the terminal to exit</li>
        </ul>

        <p><strong>Typical timing:</strong> Self-disembarkation usually starts around 6:30am (subject to customs clearance). <strong>Self-disembarkation guests are typically the first allowed off the ship.</strong></p>

        <p><strong>How to register:</strong> Visit Guest Services or use My Holiday website (myholiday.pocruises.com) during the cruise to register for self-disembarkation.</p>

        <p><strong>Requirements:</strong></p>
        <ul className="info-list">
          <li>Must be able to manage all luggage yourself (no porter assistance available for self-disembarkation)</li>
          <li>Bags must fit through X-ray security scanning</li>
        </ul>

        <p><strong>Advantages:</strong></p>
        <ul className="info-list">
          <li>First off the ship</li>
          <li>No waiting around</li>
          <li>Control your own timing</li>
          <li>Often through terminal by 7:30am-8:00am</li>
          <li>Ideal if collecting car from nearby parking</li>
        </ul>

        <p><strong>Considerations:</strong></p>
        <ul className="info-list">
          <li>Early start required</li>
          <li>Must manage stairs/lifts with all bags</li>
          <li>No assistance available</li>
          <li>Breakfast options limited if leaving very early</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="content-card">
        <h3 className="content-card-title">Option 2: Standard Disembarkation (P&O Luggage Service)</h3>
        
        <p><strong>Best for:</strong> Those with heavy luggage, families, guests with mobility considerations, anyone who prefers a relaxed final morning.</p>

        <p><strong>How it works:</strong></p>
        <ol className="info-list">
          <li>Place tagged luggage outside your cabin door the night before (by stated deadline)</li>
          <li>P&O transport bags to the terminal baggage hall</li>
          <li>Enjoy breakfast at leisure</li>
          <li>Wait for your designated time slot to disembark</li>
          <li>Walk off with just hand luggage</li>
          <li>Collect bags from the terminal hall (organised by deck number)</li>
        </ol>

        <p><strong>Advantages:</strong></p>
        <ul className="info-list">
          <li>Relaxed final morning</li>
          <li>Enjoy a full breakfast</li>
          <li>No heavy lifting until terminal</li>
          <li>Assistance available if needed</li>
          <li>Bags transported for you</li>
        </ul>

        <p><strong>Considerations:</strong></p>
        <ul className="info-list">
          <li>Less control over timing</li>
          <li>May wait 1-2 hours after breakfast</li>
          <li>Bags handled by multiple people</li>
          <li>Must locate bags in busy terminal hall</li>
        </ul>

        <p><strong>Baggage collection in terminal:</strong></p>
        <p>Your bags will be arranged in the terminal by deck number. Look for your deck zone, then find your individual bags. Porters and trolleys are available to help you to the exit.</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>What Happens When You Leave the Ship</h3>
        
        <p><strong>The walk-off process:</strong></p>
        <ol className="info-list">
          <li><strong>Exit the ship:</strong> Walk down the gangway to the terminal building</li>
          <li><strong>UK Border Control:</strong> Present your passport (usually quick e-gates or manual check)</li>
          <li><strong>Customs:</strong> Nothing to declare route or goods to declare route if needed</li>
          <li><strong>Baggage hall (standard disembarkation only):</strong> Collect your tagged luggage</li>
          <li><strong>Exit:</strong> Through to arrivals area where taxis, transfers, and family can meet you</li>
        </ol>

        <p><strong>Border Control tips:</strong></p>
        <ul className="info-list">
          <li>Have passport ready and open</li>
          <li>Remove hats and sunglasses for e-gates</li>
          <li>Family members go through together</li>
          <li>Usually takes 5-15 minutes depending on queue</li>
        </ul>
      </div>

    </div>
  );
}

function GettingHomeSection({ dayData: _dayData }) {
  return (
    <div className="section-getting-there">
      <div className="info-block">
        <h3>By Car (Collecting from Parking)</h3>
        
        <p>If you've pre-booked parking, follow the signs to your parking provider's collection point. Most parking services are adjacent to or within walking distance of the terminal.</p>

        <p><strong>Exiting Southampton:</strong></p>
        <ul className="info-list">
          <li>For M27/M3: Follow signs from the port - well signposted</li>
          <li>Expect some traffic on busy disembarkation mornings</li>
          <li>Allow 10-15 minutes from terminal exit to driving away</li>
        </ul>

        <div className="content-card">
          <p><strong>Terminal Postcodes:</strong></p>
          <p>Ocean Terminal: <strong>SO15 1BA</strong><br />
          Ocean Cruise Terminal: <strong>SO14 3QN</strong></p>
        </div>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>By Train</h3>
        
        <p><strong>Getting to Southampton Central:</strong></p>
        <p>A taxi rank is located directly outside the terminal. The journey to Southampton Central station takes approximately 5-10 minutes.</p>

        <p><strong>Major train connections from Southampton Central:</strong></p>
        <ul className="info-list">
          <li><strong>London Waterloo:</strong> 1hr 20mins - frequent service</li>
          <li><strong>London Victoria:</strong> 1hr 45mins - via Brighton</li>
          <li><strong>Birmingham:</strong> 2hrs 30mins</li>
          <li><strong>Bristol:</strong> 2hrs</li>
        </ul>

        <p className="info-note">If your disembarkation time is uncertain, consider flexible/anytime tickets.</p>
      </div>

      <hr className="section-divider" />

      <div className="info-block">
        <h3>To Airports</h3>
        
        <p><strong>Nearby airports:</strong></p>
        <ul className="info-list">
          <li><strong>Southampton Airport (SOU):</strong> 5 miles, approximately 15 mins by taxi</li>
          <li><strong>Bournemouth Airport (BOH):</strong> 30 miles, approximately 40 mins</li>
          <li><strong>Heathrow (LHR):</strong> 75 miles, approximately 1hr 30mins</li>
          <li><strong>Gatwick (LGW):</strong> 85 miles, approximately 1hr 45mins</li>
        </ul>

        <p className="info-note">For Heathrow/Gatwick, consider train connections via London or pre-book a transfer. Allow plenty of time as traffic can be unpredictable.</p>
      </div>
    </div>
  );
}

function TipsSection({ dayData: _dayData }) {
  return (
    <div className="section-tips">
      <div className="content-card tip-card">
        <p className="content-card-title">Pack the Night Before Properly</p>
        <p>If using standard disembarkation, your bags go out by 10-11pm the night before. This means you need to plan carefully. Keep out: breakfast clothes, toiletries, medications, phone charger, travel documents. Use a small day bag or hand luggage for morning essentials. Don't forget items in the safe, drawers, or bathroom.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Luggage are in Deck Order</p>
        <p>Your luggage will be arranged in the terminal baggage hall in deck order, making it easier to locate your bags when you disembark.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Have a Proper Breakfast</p>
        <p>Don't rush your final morning! The buffet serves breakfast on disembarkation day which opens around 6am.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Check Your Onboard Account</p>
        <p>Your final bill is generated overnight. Check on cabin TV or My Holiday website first thing. Any disputes need to be resolved at Guest Services before you disembark - it's much harder to fix issues afterwards. Keep your receipts if you've queried any charges.</p>
      </div>

      <div className="content-card tip-card">
        <p className="content-card-title">Keep Essentials in Hand Luggage</p>
        <p>Whatever disembarkation method you choose, keep these items on your person or in hand luggage: passport and travel documents, medication, phone, charger, and valuables, car keys/parking ticket, money and payment cards, any items you can't replace.</p>
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

        <p><strong>During Your Cruise:</strong></p>
        <ul className="info-list">
          <li>Visit Guest Services or accessibility desk onboard</li>
          <li>Dial 0 from your cabin phone to contact reception</li>
          <li>Confirm arrangements for disembarkation the day before</li>
        </ul>

        <p><strong>At the Terminal:</strong></p>
        <ul className="info-list">
          <li>Inform parking staff/porters of your needs</li>
          <li>Meet & Assist staff available at terminal entrance</li>
          <li>Southampton Ocean Terminal is fully accessible</li>
        </ul>

        <p className="info-note">For complete details on all accessibility services, equipment availability, and specific requirements, please visit the official P&O Cruises accessibility pages linked above. Information is subject to change and P&O's official website contains the most current details.</p>
      </div>
    </div>
  );
}

export default DisembarkationContent;
