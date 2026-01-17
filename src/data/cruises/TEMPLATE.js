/**
 * CRUISE TEMPLATE
 * 
 * Copy this file and rename to your cruise ID (e.g., g701.js)
 * 
 * HOW IT WORKS:
 * 1. You define the cruise itinerary (dates, ports, times)
 * 2. For each port day, set portSlug to match a port guide slug
 * 3. ALL content (overview, stay local, go further, with kids, etc.) 
 *    is AUTOMATICALLY pulled from the port guide
 * 
 * YOU DON'T NEED TO:
 * - Write port content (it comes from port guides)
 * - Create separate content files
 * - Modify any components
 * 
 * JUST:
 * 1. Create this file
 * 2. Register it in index.js
 * 3. Done!
 */

export const templateCruise = {
  id: 'cruise-id',           // URL-friendly ID (used in /cruise/cruise-id)
  name: 'Full Cruise Name',   // e.g., "Mediterranean Explorer"
  shortName: 'Short Name',    // e.g., "Med Explorer"
  
  // Ship information
  ship: {
    name: 'Ship Name',
    operator: 'Cruise Line',
    imo: '1234567',           // IMO number for tracking
    mmsi: '123456789'         // MMSI for AIS tracking
  },
  
  // Departure info for countdown timer
  departure: {
    date: '2026-06-01',       // YYYY-MM-DD
    time: '17:00',            // HH:MM (24hr)
    port: 'Southampton'
  },
  
  // Optional: Facebook group for this cruise
  facebookGroup: null,
  
  // OG Image for social sharing (optional)
  ogImage: null,
  
  // Day-by-day itinerary
  itinerary: [
    // === EMBARKATION DAY ===
    {
      date: "2026-06-01",
      dayNumber: 1,
      dayLabel: "Day 1",
      portName: "Southampton",
      portSlug: "southampton",  // Must match port guide slug in ports.js
      country: "UK",
      dayType: "embarkation",   // embarkation | port | sea | disembarkation
      arriveTime: null,
      departTime: "17:00",
      coords: { lat: 50.8998, lon: -1.4044 }  // For weather
    },
    
    // === SEA DAY ===
    {
      date: "2026-06-02",
      dayNumber: 2,
      dayLabel: "Day 2",
      portName: "At Sea",
      portSlug: null,           // No port guide for sea days
      country: null,
      dayType: "sea"
      // No coords needed for sea days
    },
    
    // === PORT DAY ===
    {
      date: "2026-06-03",
      dayNumber: 3,
      dayLabel: "Day 3",
      portName: "Barcelona",    // Display name
      portSlug: "barcelona",    // Links to /ports/barcelona guide
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      coords: { lat: 41.3851, lon: 2.1734 },
      note: "Optional: Any special notes for this day"
    },
    
    // === MULTI-DAY PORT (OVERNIGHT) ===
    {
      date: "2026-06-04",
      dateEnd: "2026-06-05",    // End date for multi-day stays
      dayNumber: 4,
      dayNumberEnd: 5,
      dayLabel: "Days 4-5",
      portName: "Rome",
      displayName: "Rome (Civitavecchia)",  // Optional display name
      portSlug: "rome",
      country: "Italy",
      dayType: "port",
      arriveTime: "07:00",
      departTime: "18:00",      // Departure on last day
      isOvernight: true,        // Flag for overnight stays
      coords: { lat: 42.0934, lon: 11.7877 }
    },
    
    // === DISEMBARKATION DAY ===
    {
      date: "2026-06-10",
      dayNumber: 10,
      dayLabel: "Day 10",
      portName: "Southampton",
      portSlug: "southampton",
      country: "UK",
      dayType: "disembarkation",
      arriveTime: "06:30",
      departTime: null,
      coords: { lat: 50.8998, lon: -1.4044 }
    }
  ]
};

/**
 * AFTER CREATING YOUR CRUISE:
 * 
 * 1. Open src/data/cruises/index.js
 * 2. Import your cruise:
 *    import { yourCruise } from './your-cruise-id';
 * 3. Add to the registry:
 *    export const cruises = {
 *      'g606': g606Cruise,
 *      'your-cruise-id': yourCruise,  // <-- Add here
 *    };
 * 
 * That's it! The cruise is now accessible at /cruise/your-cruise-id
 * 
 * REQUIREMENTS:
 * - Port guides must exist for each portSlug you reference
 * - If a port guide doesn't exist, the system shows "content coming soon"
 */
