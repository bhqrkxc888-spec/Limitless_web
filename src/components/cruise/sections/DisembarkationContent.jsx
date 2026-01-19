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
        <p>If using P&O's luggage service, bags must be outside your cabin door by the time stated (usually 10pm-11pm). You'll receive coloured luggage tags indicating your collection time.</p>

        <p><strong>Check disembarkation information:</strong></p>
        <p>A letter will be delivered to your cabin with your allocated time and colour group. Also displayed on the ship's TV information channel.</p>

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
          <li><strong>7:30am onwards:</strong> Colour groups called in sequence</li>
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
          <li>You leave at your allocated time (in your disembarkation letter)</li>
          <li>No waiting for colour groups to be called</li>
          <li>Walk straight through the terminal to exit</li>
        </ul>

        <p><strong>Typical timing:</strong> Self-disembarkation usually starts around 6:30am (subject to customs clearance) - you'll be given your specific time in your disembarkation letter. <strong>Self-disembarkation guests are typically the first allowed off the ship.</strong></p>

        <p><strong>How to register:</strong> Visit Guest Services or use My Holiday website (myholiday.pocruises.com) during the cruise to register for self-disembarkation. You'll be given your allocated time in your disembarkation letter.</p>

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

        <p className="info-note">Pro tip: Pack a smaller overnight bag for the cruise and travel light - self-disembarkation is much easier with one wheelie case than three large suitcases.</p>
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
          <li>Wait for your colour group to be called</li>
          <li>Walk off with just hand luggage</li>
          <li>Collect bags from the terminal hall (organised by tag colour)</li>
        </ol>

        <p><strong>The colour tag system:</strong></p>
        <p>P&O provides <strong>colour-coded luggage tags</strong> (e.g., Red, Blue, Yellow) paired with a time slot. You place these tags on your bags the night before.</p>
        <ul className="info-list">
          <li>You'll receive coloured luggage tags with your disembarkation letter</li>
          <li>Colours are called in sequence over the morning</li>
          <li>Earlier colours = earlier departure (but no choice - assigned based on deck/cabin location and any special requirements)</li>
          <li>Listen for announcements and check TV channel for your colour</li>
        </ul>

        <p><strong>Typical colour group timing:</strong></p>
        <ul className="info-list">
          <li><strong>Priority/Assistance:</strong> 7:30am - 8:00am</li>
          <li><strong>First colours:</strong> 8:00am - 8:30am</li>
          <li><strong>Middle colours:</strong> 8:30am - 9:00am</li>
          <li><strong>Later colours:</strong> 9:00am - 9:30am</li>
        </ul>
        <p className="info-note">Actual times vary by sailing and passenger numbers.</p>

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
        <p>Your bags will be arranged in the terminal by colour group. Look for your tag colour zone, then find your individual bags. Porters and trolleys are available to help you to the exit.</p>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>What Happens When You Leave the Ship</h3>
        
        <p><strong>The walk-off process:</strong></p>
        <ol className="info-list">
          <li><strong>Exit the ship:</strong> Walk down the gangway to the terminal building</li>
          <li><strong>UK Border Control:</strong> Present your passport (usually quick e-gates or manual check)</li>
          <li><strong>Customs:</strong> Green channel (nothing to declare) or Red channel if needed</li>
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
      <div className="content-card">
        <p className="content-card-title">Tip 1: Decide Early - Self-Disembarkation or Standard?</p>
        <p>Choose as soon as possible during the cruise. Register at Guest Services or via My Holiday website (myholiday.pocruises.com). Self-disembarkation slots can fill up. Consider your luggage volume, mobility, and onward travel timing.</p>
        <p className="info-note">If you have an early flight or train, self-disembarkation is almost always the better choice.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 2: Pack the Night Before Properly</p>
        <p>If using standard disembarkation, your bags go out by 10-11pm the night before. This means you need to plan carefully. Keep out: breakfast clothes, toiletries, medications, phone charger, travel documents. Use a small day bag or hand luggage for morning essentials. Don't forget items in the safe, drawers, or bathroom.</p>
        <p className="info-note">Common mistakes: Packing passport in main luggage, forgetting phone charger, leaving medication in suitcase.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 3: Photograph Your Luggage Tags</p>
        <p>Take a photo of your coloured luggage tags before putting bags out. In the busy terminal baggage hall, you'll need to remember your exact colour to find the right zone. The tags also have a number that helps identify your specific bags.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 4: Have a Proper Breakfast</p>
        <p>Don't rush your final morning! Both the buffet and main dining room serve breakfast on disembarkation day. The buffet opens earliest (around 6am), while the MDR offers a sit-down experience. If you're standard disembarkation, you'll likely be waiting anyway - enjoy the meal.</p>
        <p className="info-note">The buffet gets very busy 7:30am-8:30am as colour groups are called. Go early or late.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 5: Check Your Onboard Account</p>
        <p>Your final bill is generated overnight. Check on cabin TV or My Holiday website first thing. Any disputes need to be resolved at Guest Services before you disembark - it's much harder to fix issues afterwards. Keep your receipts if you've queried any charges.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 6: Don't Rush for Your Colour Group</p>
        <p>When your colour is called, there's no prize for being first in the queue. Let the initial rush go, then walk off calmly. The baggage hall is always chaotic regardless - an extra 10 minutes onboard won't change your wait for luggage.</p>
        <p className="info-note">Exception: If you have a tight travel connection, position yourself ready to go when your colour is called.</p>
      </div>

      <div className="content-card">
        <p className="content-card-title">Tip 7: Keep Essentials in Hand Luggage</p>
        <p>Whatever disembarkation method you choose, keep these items on your person or in hand luggage: passport and travel documents, medication, phone, charger, and valuables, car keys/parking ticket, money and payment cards, any items you can't replace.</p>
      </div>
    </div>
  );
}

function SendSection({ dayData: _dayData }) {
  return (
    <div className="section-send">
      <div className="sub-section">
        <h3>Assistance at Southampton Terminal (Disembarkation)</h3>
        
        <p><strong>What Assistance is Available?</strong></p>
        <p>P&O provides full accessibility support for disembarkation:</p>
        <ul className="info-list">
          <li><strong>Priority disembarkation:</strong> Guests requiring assistance are typically in the first group called</li>
          <li><strong>Wheelchair assistance:</strong> Available from cabin to terminal exit</li>
          <li><strong>Mobility scooter support:</strong> Crew assist with scooter retrieval and transport to gangway</li>
          <li><strong>Escort service:</strong> Staff can accompany guests through border control and baggage hall</li>
          <li><strong>Luggage assistance:</strong> Porters available to transport bags to vehicles/taxis</li>
        </ul>

        <p><strong>How to Arrange Assistance:</strong></p>
        <ol className="info-list">
          <li><strong>During the cruise:</strong> Visit Guest Services or accessibility desk to confirm disembarkation arrangements</li>
          <li><strong>The day before:</strong> Confirm your requirements and timing with your cabin steward or Guest Services</li>
          <li><strong>Disembarkation morning:</strong> Call reception or use cabin phone when ready to leave</li>
        </ol>

        <p><strong>Wheelchair users:</strong></p>
        <ul className="info-list">
          <li>Ship's wheelchairs available for transport to terminal</li>
          <li>Your own wheelchair will be retrieved and brought to the gangway</li>
          <li>Accessible route through terminal (lifts available, no stairs required)</li>
          <li>Wheelchair-accessible taxis can be pre-arranged</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Priority Disembarkation</h3>
        
        <p><strong>Who Gets Priority Disembarkation?</strong></p>
        <ul className="info-list">
          <li><strong>Guests with disabilities/mobility needs:</strong> First group - contact Guest Services during cruise</li>
          <li><strong>Guests with early flight connections:</strong> Early colours - request at Guest Services with flight details</li>
          <li><strong>Families with young children:</strong> Priority consideration - request at Guest Services</li>
          <li><strong>Suite guests:</strong> Priority colours - usually automatic</li>
          <li><strong>Peninsular Club top tiers:</strong> Priority colours - usually automatic based on tier</li>
        </ul>

        <p><strong>How to Request Priority:</strong></p>
        
        <p><strong>For accessibility needs:</strong></p>
        <ul className="info-list">
          <li>Speak to Guest Services early in the cruise</li>
          <li>Confirm arrangements the day before disembarkation</li>
          <li>You'll receive early colour tags or direct priority boarding</li>
          <li>Assistance will be arranged for the morning</li>
        </ul>

        <p><strong>For flight/travel connections:</strong></p>
        <ul className="info-list">
          <li>Visit Guest Services with your travel details</li>
          <li>Genuine tight connections may receive earlier colours</li>
          <li>Provide flight times, booking references if helpful</li>
          <li>No guarantee but they try to accommodate</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Accessible Disembarkation Process</h3>
        
        <p><strong>Step-by-step for guests requiring assistance:</strong></p>

        <p><strong>Night before:</strong></p>
        <ul className="info-list">
          <li>Confirm arrangements with Guest Services</li>
          <li>Pack luggage (assistance available if needed)</li>
          <li>Receive your priority disembarkation time</li>
        </ul>

        <p><strong>Morning:</strong></p>
        <ul className="info-list">
          <li>Have breakfast (room service available if mobility is difficult)</li>
          <li>Call reception when ready</li>
          <li>Crew member will come to assist</li>
        </ul>

        <p><strong>Leaving the ship:</strong></p>
        <ul className="info-list">
          <li>Wheelchair or mobility aid brought to cabin</li>
          <li>Escorted to gangway via accessible route</li>
          <li>Accompanied through border control</li>
          <li>Assistance to baggage hall and exit</li>
        </ul>

        <p><strong>At the terminal:</strong></p>
        <ul className="info-list">
          <li>Porter assistance with luggage</li>
          <li>Wheelchair-accessible taxis available</li>
          <li>Assistance to your onward transport</li>
        </ul>

        <p><strong>If you have your own mobility equipment:</strong></p>
        <ul className="info-list">
          <li>Scooters and wheelchairs stored overnight are retrieved and brought to you</li>
          <li>Allow extra time as retrieval can take 15-30 minutes</li>
          <li>Confirm storage location with Guest Services the night before</li>
        </ul>

        <p><strong>Sensory impairments:</strong></p>
        <ul className="info-list">
          <li>Announcements supplemented with cabin visits if requested</li>
          <li>Escort through busy terminal areas</li>
          <li>Staff alert to assist at border control</li>
        </ul>

        <p><strong>Hidden disabilities:</strong></p>
        <ul className="info-list">
          <li>Sunflower lanyard recognised for priority queuing</li>
          <li>Quieter disembarkation times can be arranged</li>
          <li>Notify Guest Services of any specific needs</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <div className="sub-section">
        <h3>Important Contacts</h3>
        
        <p><strong>During cruise - Guest Services:</strong> Dial 0 from cabin phone</p>

        <p><strong>P&O Accessibility Team (pre/post cruise):</strong></p>
        <ul className="info-list">
          <li>Phone: 0344 338 8014</li>
          <li>Email: accessibility@pocruises.com</li>
        </ul>

        <p><strong>Southampton Port (terminal queries):</strong></p>
        <ul className="info-list">
          <li>Phone: 023 8048 8800</li>
        </ul>
      </div>
    </div>
  );
}

export default DisembarkationContent;
