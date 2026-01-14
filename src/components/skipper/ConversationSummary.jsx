import './ConversationSummary.css';

/**
 * Conversation Summary - Tracks key discussion points
 * Replaces the simple progress checklist with detailed conversation notes
 */
function ConversationSummary({ collectedData }) {
  // Build summary sections from collected data
  const sections = [];

  // Helper to safely stringify values (prevents React crash on objects)
  const stringify = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.map(v => stringify(v)).filter(Boolean).join(', ');
    if (typeof value === 'object') {
      // Try to make a readable string from common object shapes
      const parts = [];
      Object.entries(value).forEach(([k, v]) => {
        if (v && typeof v !== 'object') parts.push(`${k}: ${v}`);
      });
      return parts.length > 0 ? parts.join(', ') : null;
    }
    return String(value);
  };

  // Destinations & Cruise
  if (collectedData.destinations || collectedData.cruise_line_prefs) {
    const cruiseItems = [];
    
    // Handle destinations array
    const destination = stringify(collectedData.destinations);
    if (destination) cruiseItems.push(`📍 ${destination}`);
    
    // Handle alternative_destinations array
    if (collectedData.alternative_destinations) {
      const alts = stringify(collectedData.alternative_destinations);
      if (alts) cruiseItems.push(`📍 Also considering: ${alts}`);
    }
    
    // Handle cruise_line_prefs (can be string or array)
    const cruiseLines = stringify(collectedData.cruise_line_prefs);
    if (cruiseLines) cruiseItems.push(`🚢 ${cruiseLines}`);
    
    // Handle cabin_preferences (object or array)
    if (collectedData.cabin_preferences) {
      if (Array.isArray(collectedData.cabin_preferences)) {
        collectedData.cabin_preferences.forEach(pref => {
          if (typeof pref === 'object' && pref.type) {
            let cabinStr = `🛏️ ${pref.type}`;
            if (pref.location) cabinStr += ` (${pref.location})`;
            if (pref.priority) cabinStr += ` - ${pref.priority} priority`;
            cruiseItems.push(cabinStr);
          } else {
            cruiseItems.push(`🛏️ ${stringify(pref)}`);
          }
        });
      } else if (typeof collectedData.cabin_preferences === 'object') {
        const cp = collectedData.cabin_preferences;
        if (cp.type) cruiseItems.push(`🛏️ ${cp.type}${cp.location ? ` (${cp.location})` : ''}`);
      } else {
        cruiseItems.push(`🛏️ ${stringify(collectedData.cabin_preferences)}`);
      }
    } else {
      if (collectedData.cabin_type) cruiseItems.push(`🛏️ Cabin: ${collectedData.cabin_type}`);
      if (collectedData.cabin_location) cruiseItems.push(`📍 Location: ${collectedData.cabin_location}`);
    }
    
    if (collectedData.deck_preference) cruiseItems.push(`📊 Deck: ${stringify(collectedData.deck_preference)}`);
    
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
        if (typeof tf === 'object') {
          let dateStr = tf.value || stringify(tf);
          if (tf.primary) dateStr += ' (preferred)';
          if (tf.confirmed === false) dateStr += ' (flexible)';
          dateItems.push(dateStr);
        } else {
          dateItems.push(stringify(tf));
        }
      });
    } else if (collectedData.timeframe) {
      dateItems.push(stringify(collectedData.timeframe));
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
    const travelerItems = [];
    
    // Handle travelers - can be string or object
    if (typeof collectedData.travelers === 'object') {
      const t = collectedData.travelers;
      const parts = [];
      if (t.adults) parts.push(`${t.adults} adult${t.adults > 1 ? 's' : ''}`);
      if (t.children) parts.push(`${t.children} child${t.children > 1 ? 'ren' : ''}`);
      if (t.infants) parts.push(`${t.infants} infant${t.infants > 1 ? 's' : ''}`);
      if (parts.length > 0) travelerItems.push(parts.join(', '));
      if (t.cot_bed_needed) travelerItems.push('Cot bed needed');
      if (t.accessibility_needs && t.accessibility_needs !== 'None') travelerItems.push(`Accessibility: ${t.accessibility_needs}`);
      if (t.adult_only_preference) travelerItems.push(`Adult-only: ${t.adult_only_preference}`);
    } else {
      travelerItems.push(stringify(collectedData.travelers));
    }
    
    if (collectedData.traveler_ages) travelerItems.push(`Ages: ${stringify(collectedData.traveler_ages)}`);
    if (collectedData.mobility_needs) travelerItems.push(`Mobility: ${stringify(collectedData.mobility_needs)}`);
    if (collectedData.dietary_requirements) travelerItems.push(`Dietary: ${stringify(collectedData.dietary_requirements)}`);
    
    if (travelerItems.filter(Boolean).length > 0) {
      sections.push({
        title: '👥 Travelers',
        items: travelerItems.filter(Boolean)
      });
    }
  }

  // Flights
  if (collectedData.wants_flights !== false && (collectedData.flight_class || collectedData.flight_class_preferences || collectedData.preferred_airline || collectedData.departure_airport)) {
    const flightItems = [];
    
    // Handle flight_class_preferences (can be array, object, or string)
    if (collectedData.flight_class_preferences) {
      if (Array.isArray(collectedData.flight_class_preferences)) {
        const prefs = collectedData.flight_class_preferences.map(p => {
          if (typeof p === 'object') {
            return p.acceptable ? `${p.preferred || p.outbound} (or ${p.acceptable || p.return})` : (p.preferred || p.outbound || stringify(p));
          }
          return stringify(p);
        }).filter(Boolean).join(', ');
        if (prefs) flightItems.push(`Class: ${prefs}`);
      } else {
        flightItems.push(`Class: ${stringify(collectedData.flight_class_preferences)}`);
      }
    } else if (collectedData.flight_class) {
      flightItems.push(`Class: ${stringify(collectedData.flight_class)}`);
    }
    
    if (collectedData.preferred_airline) flightItems.push(`Airline: ${stringify(collectedData.preferred_airline)}`);
    if (collectedData.airline_preferences) flightItems.push(`Airline: ${stringify(collectedData.airline_preferences)}`);
    
    // Handle airports
    if (collectedData.departure_airport) flightItems.push(`Departure: ${stringify(collectedData.departure_airport)}`);
    if (collectedData.return_airport) flightItems.push(`Return: ${stringify(collectedData.return_airport)}`);
    if (collectedData.preferred_airports) flightItems.push(`Airports: ${stringify(collectedData.preferred_airports)}`);
    
    if (collectedData.flight_connections) flightItems.push(`Connections: ${stringify(collectedData.flight_connections)}`);
    if (collectedData.layover_hotel) flightItems.push(`Layover hotel: ${stringify(collectedData.layover_hotel)}`);
    if (collectedData.seat_preferences) flightItems.push(`Seats: ${stringify(collectedData.seat_preferences)}`);
    if (collectedData.luggage_quantity) flightItems.push(`Luggage: ${stringify(collectedData.luggage_quantity)}`);
    
    if (flightItems.length > 0) {
      sections.push({
        title: '✈️ Flights',
        items: flightItems
      });
    }
  }

  // Pre-cruise stay
  if (collectedData.pre_cruise_stay) {
    const preStay = collectedData.pre_cruise_stay;
    const hotelItems = [];
    if (typeof preStay === 'object') {
      if (preStay.wanted) {
        hotelItems.push(`Pre-cruise: ${preStay.nights || '?'} night${preStay.nights !== 1 ? 's' : ''}`);
        if (preStay.location) hotelItems.push(`Location: ${preStay.location}`);
        if (preStay.style) hotelItems.push(`Style: ${preStay.style}`);
      }
    } else {
      hotelItems.push(`Pre-cruise: ${stringify(preStay)}`);
    }
    if (hotelItems.length > 0) {
      sections.push({ title: '🏨 Pre-Cruise Stay', items: hotelItems });
    }
  }

  // Post-cruise stay
  if (collectedData.post_cruise_stay) {
    const postStay = collectedData.post_cruise_stay;
    const hotelItems = [];
    if (typeof postStay === 'object') {
      if (postStay.wanted) {
        hotelItems.push(`Post-cruise: ${postStay.nights || '?'} night${postStay.nights !== 1 ? 's' : ''}`);
        if (postStay.location) hotelItems.push(`Location: ${postStay.location}`);
        if (postStay.style) hotelItems.push(`Style: ${postStay.style}`);
      }
    } else {
      hotelItems.push(`Post-cruise: ${stringify(postStay)}`);
    }
    if (hotelItems.length > 0) {
      sections.push({ title: '🏨 Post-Cruise Stay', items: hotelItems });
    }
  }

  // Legacy hotels format
  if (!collectedData.pre_cruise_stay && !collectedData.post_cruise_stay && (collectedData.wants_pre_hotel || collectedData.wants_post_hotel)) {
    const hotelItems = [];
    if (collectedData.wants_pre_hotel) hotelItems.push('Pre-cruise hotel');
    if (collectedData.wants_post_hotel) hotelItems.push('Post-cruise hotel');
    if (collectedData.hotel_preferences) hotelItems.push(`Preferences: ${stringify(collectedData.hotel_preferences)}`);
    if (collectedData.hotel_budget) hotelItems.push(`Budget: ${stringify(collectedData.hotel_budget)}`);
    
    if (hotelItems.length > 0) {
      sections.push({
        title: '🏨 Hotels',
        items: hotelItems
      });
    }
  }

  // Transfers
  if (collectedData.transfers) {
    const transfers = collectedData.transfers;
    const transferItems = [];
    if (typeof transfers === 'object') {
      if (transfers.wanted) transferItems.push('Transfers requested');
      if (transfers.type) transferItems.push(`Type: ${transfers.type}`);
    } else {
      transferItems.push(stringify(transfers));
    }
    if (transferItems.length > 0) {
      sections.push({ title: '🚗 Transfers', items: transferItems });
    }
  } else if (collectedData.wants_transfers !== false && collectedData.transfer_type) {
    sections.push({
      title: '🚗 Transfers',
      items: [
        collectedData.transfer_type && `Type: ${stringify(collectedData.transfer_type)}`,
        collectedData.transfer_requirements && stringify(collectedData.transfer_requirements)
      ].filter(Boolean)
    });
  }

  // Drinks & Extras
  if (collectedData.drinks_package || collectedData.drinks_preferences || collectedData.special_requirements || collectedData.upgrades_extras) {
    const extraItems = [];
    
    // Handle upgrades_extras object
    if (collectedData.upgrades_extras && typeof collectedData.upgrades_extras === 'object') {
      const ue = collectedData.upgrades_extras;
      if (ue.specialty_dining) extraItems.push(`Dining: ${stringify(ue.specialty_dining)}`);
      if (ue.shore_excursions) extraItems.push(`Excursions: ${stringify(ue.shore_excursions)}`);
      if (ue.spa_treatments) extraItems.push(`Spa: ${stringify(ue.spa_treatments)}`);
      if (ue.internet_package) extraItems.push(`Internet: ${stringify(ue.internet_package)}`);
      if (ue.special_occasion) extraItems.push(`Occasion: ${stringify(ue.special_occasion)}`);
    }
    
    // Handle drinks_package (string or object)
    if (collectedData.drinks_package) {
      if (typeof collectedData.drinks_package === 'object') {
        if (collectedData.drinks_package.wanted) {
          extraItems.push(`Drinks: ${collectedData.drinks_package.type || 'Yes'}`);
        }
      } else {
        extraItems.push(`Drinks: ${stringify(collectedData.drinks_package)}`);
      }
    }
    
    if (collectedData.drinks_preferences) extraItems.push(stringify(collectedData.drinks_preferences));
    if (collectedData.special_requirements) extraItems.push(`Special: ${stringify(collectedData.special_requirements)}`);
    if (collectedData.special_occasion && !collectedData.upgrades_extras?.special_occasion) extraItems.push(`Occasion: ${stringify(collectedData.special_occasion)}`);
    if (collectedData.travel_insurance) extraItems.push(`Insurance: ${stringify(collectedData.travel_insurance)}`);
    
    if (extraItems.length > 0) {
      sections.push({
        title: '🍷 Drinks & Extras',
        items: extraItems
      });
    }
  }

  // Budget
  if (collectedData.budget) {
    sections.push({
      title: '💰 Budget',
      items: [stringify(collectedData.budget)]
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

