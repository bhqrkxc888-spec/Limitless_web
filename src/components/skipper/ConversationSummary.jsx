import './ConversationSummary.css';

/**
 * Conversation Summary - Tracks key discussion points
 * Replaces the simple progress checklist with detailed conversation notes
 */
function ConversationSummary({ collectedData, conversationHistory }) {
  // Build summary sections from collected data
  const sections = [];

  // Destinations & Cruise
  if (collectedData.destinations || collectedData.cruise_line_prefs) {
    const destination = Array.isArray(collectedData.destinations) 
      ? collectedData.destinations.join(', ') 
      : collectedData.destinations;
    
    sections.push({
      title: '⛵ Cruise & Destination',
      items: [
        destination && `📍 ${destination}`,
        collectedData.cruise_line_prefs && `🚢 ${collectedData.cruise_line_prefs}`,
        collectedData.cabin_type && `🛏️ Cabin: ${collectedData.cabin_type}`,
        collectedData.deck_preference && `📊 Deck: ${collectedData.deck_preference}`,
        collectedData.cabin_location && `📍 Location: ${collectedData.cabin_location}`,
      ].filter(Boolean)
    });
  }

  // Travel Dates
  if (collectedData.timeframe) {
    sections.push({
      title: '📅 When',
      items: [
        collectedData.timeframe,
        collectedData.school_holiday_constraint && '🏫 School holidays required'
      ].filter(Boolean)
    });
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
  if (collectedData.wants_flights !== false && (collectedData.flight_class || collectedData.preferred_airline)) {
    sections.push({
      title: '✈️ Flights',
      items: [
        collectedData.flight_class && `Class: ${collectedData.flight_class}`,
        collectedData.preferred_airline && `Airline: ${collectedData.preferred_airline}`,
        collectedData.preferred_airports && `Airports: ${collectedData.preferred_airports}`,
        collectedData.seat_preferences && `Seats: ${collectedData.seat_preferences}`
      ].filter(Boolean)
    });
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

  // Drinks & Extras
  if (collectedData.drinks_package || collectedData.drinks_preferences) {
    sections.push({
      title: '🍷 Drinks & Extras',
      items: [
        collectedData.drinks_package && `Package: ${collectedData.drinks_package}`,
        collectedData.drinks_preferences && collectedData.drinks_preferences,
        collectedData.special_requirements && `Special: ${collectedData.special_requirements}`
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
  if (collectedData.name || collectedData.email || collectedData.phone) {
    sections.push({
      title: '📞 Contact',
      items: [
        collectedData.name && `✍️ ${collectedData.name}`,
        collectedData.email && `📧 ${collectedData.email}`,
        collectedData.phone && `📱 ${collectedData.phone}`
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

