import './ConversationSummary.css';

/**
 * Conversation Summary - Tracks key discussion points
 * Replaces the simple progress checklist with detailed conversation notes
 */
function ConversationSummary({ collectedData }) {
  // Build summary sections from collected data
  const sections = [];

  // Destinations & Cruise
  if (collectedData.destinations || collectedData.cruise_line_prefs) {
    const cruiseItems = [];
    
    // Handle destinations array
    const destination = Array.isArray(collectedData.destinations) 
      ? collectedData.destinations.join(', ') 
      : collectedData.destinations;
    if (destination) cruiseItems.push(`📍 ${destination}`);
    
    // Handle alternative_destinations array
    if (collectedData.alternative_destinations && Array.isArray(collectedData.alternative_destinations)) {
      const alts = collectedData.alternative_destinations.join(', ');
      cruiseItems.push(`📍 Also considering: ${alts}`);
    }
    
    if (collectedData.cruise_line_prefs) cruiseItems.push(`🚢 ${collectedData.cruise_line_prefs}`);
    
    // Handle cabin_preferences array
    if (collectedData.cabin_preferences && Array.isArray(collectedData.cabin_preferences)) {
      collectedData.cabin_preferences.forEach(pref => {
        let cabinStr = `🛏️ ${pref.type}`;
        if (pref.location) cabinStr += ` (${pref.location})`;
        if (pref.priority) cabinStr += ` - ${pref.priority} priority`;
        cruiseItems.push(cabinStr);
      });
    } else {
      if (collectedData.cabin_type) cruiseItems.push(`🛏️ Cabin: ${collectedData.cabin_type}`);
      if (collectedData.cabin_location) cruiseItems.push(`📍 Location: ${collectedData.cabin_location}`);
    }
    
    if (collectedData.deck_preference) cruiseItems.push(`📊 Deck: ${collectedData.deck_preference}`);
    
    if (cruiseItems.length > 0) {
      sections.push({
        title: '⛵ Cruise & Destination',
        items: cruiseItems
      });
    }
  }

  // Travel Dates
  if (collectedData.timeframe || (collectedData.timeframes && Array.isArray(collectedData.timeframes))) {
    const dateItems = [];
    
    // Handle timeframes array
    if (collectedData.timeframes && Array.isArray(collectedData.timeframes)) {
      collectedData.timeframes.forEach(tf => {
        let dateStr = tf.value;
        if (tf.primary) dateStr += ' (preferred)';
        if (tf.confirmed === false) dateStr += ' (flexible)';
        dateItems.push(dateStr);
      });
    } else if (collectedData.timeframe) {
      dateItems.push(collectedData.timeframe);
    }
    
    if (collectedData.school_holiday_constraint) {
      dateItems.push('🏫 School holidays required');
    }
    
    if (dateItems.length > 0) {
      sections.push({
        title: '📅 When',
        items: dateItems
      });
    }
  }

  // Travelers
  if (collectedData.travelers) {
    sections.push({
      title: '👥 Travelers',
      items: [
        collectedData.travelers,
        collectedData.traveler_ages && `Ages: ${collectedData.traveler_ages}`,
        collectedData.mobility_needs && `Mobility: ${collectedData.mobility_needs}`,
        collectedData.dietary_requirements && `Dietary: ${collectedData.dietary_requirements}`
      ].filter(Boolean)
    });
  }

  // Flights
  if (collectedData.wants_flights !== false && (collectedData.flight_class || collectedData.flight_class_preferences || collectedData.preferred_airline)) {
    const flightItems = [];
    
    // Handle flight_class_preferences array
    if (collectedData.flight_class_preferences && Array.isArray(collectedData.flight_class_preferences)) {
      const prefs = collectedData.flight_class_preferences.map(p => 
        p.acceptable ? `${p.preferred} (or ${p.acceptable})` : p.preferred
      ).join(', ');
      flightItems.push(`Class: ${prefs}`);
    } else if (collectedData.flight_class) {
      flightItems.push(`Class: ${collectedData.flight_class}`);
    }
    
    if (collectedData.preferred_airline) flightItems.push(`Airline: ${collectedData.preferred_airline}`);
    
    // Handle preferred_airports array
    if (collectedData.preferred_airports) {
      const airports = Array.isArray(collectedData.preferred_airports) 
        ? collectedData.preferred_airports.join(', ') 
        : collectedData.preferred_airports;
      flightItems.push(`Departure: ${airports}`);
    }
    
    if (collectedData.flight_connections) flightItems.push(`Connections: ${collectedData.flight_connections}`);
    if (collectedData.layover_hotel) flightItems.push(`Layover hotel: ${collectedData.layover_hotel}`);
    if (collectedData.seat_preferences) flightItems.push(`Seats: ${collectedData.seat_preferences}`);
    
    if (flightItems.length > 0) {
      sections.push({
        title: '✈️ Flights',
        items: flightItems
      });
    }
  }

  // Hotels
  if (collectedData.wants_pre_hotel || collectedData.wants_post_hotel) {
    const hotelItems = [];
    if (collectedData.wants_pre_hotel) hotelItems.push('Pre-cruise hotel');
    if (collectedData.wants_post_hotel) hotelItems.push('Post-cruise hotel');
    if (collectedData.hotel_preferences) hotelItems.push(`Preferences: ${collectedData.hotel_preferences}`);
    if (collectedData.hotel_budget) hotelItems.push(`Budget: ${collectedData.hotel_budget}`);
    
    if (hotelItems.length > 0) {
      sections.push({
        title: '🏨 Hotels',
        items: hotelItems
      });
    }
  }

  // Transfers
  if (collectedData.wants_transfers !== false && collectedData.transfer_type) {
    sections.push({
      title: '🚗 Transfers',
      items: [
        collectedData.transfer_type && `Type: ${collectedData.transfer_type}`,
        collectedData.transfer_requirements && collectedData.transfer_requirements
      ].filter(Boolean)
    });
  }

  // Drinks & Extras
  if (collectedData.drinks_package || collectedData.drinks_preferences || collectedData.special_requirements) {
    sections.push({
      title: '🍷 Drinks & Extras',
      items: [
        collectedData.drinks_package && `Package: ${collectedData.drinks_package}`,
        collectedData.drinks_preferences && collectedData.drinks_preferences,
        collectedData.special_requirements && `Special: ${collectedData.special_requirements}`,
        collectedData.special_occasion && `Occasion: ${collectedData.special_occasion}`,
        collectedData.travel_insurance && `Insurance: ${collectedData.travel_insurance}`
      ].filter(Boolean)
    });
  }

  // Budget
  if (collectedData.budget) {
    sections.push({
      title: '💰 Budget',
      items: [collectedData.budget]
    });
  }

  // Contact
  if (collectedData.name || collectedData.email) {
    sections.push({
      title: '📞 Contact',
      items: [
        collectedData.name && `✍️ ${collectedData.name}`,
        collectedData.email && `📧 ${collectedData.email}`
      ].filter(Boolean)
    });
  }

  return (
    <div className="conversation-summary">
      <h3>Conversation Summary</h3>
      <p className="summary-subtitle">Key points discussed</p>
      
      {sections.length > 0 ? (
        <div className="summary-sections">
          {sections.map((section, idx) => (
            <div key={idx} className="summary-section">
              <h4>{section.title}</h4>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="summary-empty">
          <p>Chat with The Skipper to start building your perfect cruise package!</p>
        </div>
      )}
      
      {sections.length > 0 && (
        <div className="summary-footer">
          <small>This summary will be sent with your enquiry</small>
        </div>
      )}
    </div>
  );
}

export default ConversationSummary;

