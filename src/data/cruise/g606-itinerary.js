/**
 * G606 Itinerary Data
 * P&O Iona - Spain, Portugal & Canary Islands
 * March 14-28, 2026
 */

// Ship information for tracking
export const g606ShipInfo = {
  name: 'Iona',
  imo: '9826548',
  mmsi: '310857000',
  operator: 'P&O Cruises'
};

// Departure info for countdown
export const g606Departure = {
  date: '2026-03-14',
  time: '16:30',
  port: 'Southampton'
};

export const g606Itinerary = [
  {
    date: "2026-03-14",
    dayNumber: 1,
    dayLabel: "Day 1",
    portName: "Southampton",
    country: "UK",
    dayType: "embarkation",
    arriveTime: null,
    departTime: "16:30",
    coords: { lat: 50.8998, lon: -1.4044 }
  },
  {
    date: "2026-03-15",
    dayNumber: 2,
    dayLabel: "Day 2",
    portName: "At Sea",
    country: null,
    dayType: "sea"
  },
  {
    date: "2026-03-16",
    dayNumber: 3,
    dayLabel: "Day 3",
    portName: "La Coruña",
    country: "Spain",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "17:00",
    coords: { lat: 43.3623, lon: -8.4115 }
  },
  {
    date: "2026-03-17",
    dateEnd: "2026-03-18",
    dayNumber: 4,
    dayNumberEnd: 5,
    dayLabel: "Days 4-5",
    portName: "At Sea",
    country: null,
    dayType: "sea"
  },
  {
    date: "2026-03-19",
    dayNumber: 6,
    dayLabel: "Day 6",
    portName: "Tenerife",
    country: "Spain",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "18:00",
    coords: { lat: 28.4636, lon: -16.2518 }
  },
  {
    date: "2026-03-20",
    dayNumber: 7,
    dayLabel: "Day 7",
    portName: "Gran Canaria",
    country: "Spain",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "18:00",
    coords: { lat: 28.1235, lon: -15.4363 }
  },
  {
    date: "2026-03-21",
    dayNumber: 8,
    dayLabel: "Day 8",
    portName: "Lanzarote",
    displayName: "Arrecife de Lanzarote",
    country: "Spain",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "18:00",
    coords: { lat: 28.9630, lon: -13.5477 }
  },
  {
    date: "2026-03-22",
    dayNumber: 9,
    dayLabel: "Day 9",
    portName: "At Sea",
    country: null,
    dayType: "sea"
  },
  {
    date: "2026-03-23",
    dayNumber: 10,
    dayLabel: "Day 10",
    portName: "Cádiz",
    country: "Spain",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "17:00",
    note: "Tours to Seville available",
    coords: { lat: 36.5271, lon: -6.2886 }
  },
  {
    date: "2026-03-24",
    dateEnd: "2026-03-25",
    dayNumber: 11,
    dayNumberEnd: 12,
    dayLabel: "Days 11-12",
    portName: "Lisbon",
    country: "Portugal",
    dayType: "port",
    arriveTime: "08:00",
    departTime: "17:00",
    isOvernight: true,
    coords: { lat: 38.7223, lon: -9.1393 }
  },
  {
    date: "2026-03-26",
    dateEnd: "2026-03-27",
    dayNumber: 13,
    dayNumberEnd: 14,
    dayLabel: "Days 13-14",
    portName: "At Sea",
    country: null,
    dayType: "sea"
  },
  {
    date: "2026-03-28",
    dayNumber: 15,
    dayLabel: "Day 15",
    portName: "Southampton",
    country: "UK",
    dayType: "disembarkation",
    arriveTime: "06:30",
    departTime: null,
    coords: { lat: 50.8998, lon: -1.4044 }
  }
];

/**
 * Get sections available for a day type
 * Note: 'ship' is available on all day types
 */
export function getSectionsForDayType(dayType) {
  switch (dayType) {
    case 'port':
      return ['overview', 'weather', 'stayLocal', 'goFurther', 'withKids', 'send', 'foodAndDrink', 'ship'];
    case 'sea':
      return ['overview', 'onTheShip', 'quietSpots', 'send', 'ship'];
    case 'embarkation':
      return ['whatToExpect', 'weather', 'gettingThere', 'tips', 'send', 'ship'];
    case 'disembarkation':
      return ['whatToExpect', 'tips', 'send', 'ship'];
    default:
      return [];
  }
}

/**
 * Get section label
 */
export function getSectionLabel(sectionKey) {
  const labels = {
    overview: 'Overview',
    weather: 'Weather',
    stayLocal: 'Stay Local',
    goFurther: 'Go Further',
    withKids: 'With Kids',
    send: 'SEND & Accessibility',
    foodAndDrink: 'Food & Drink',
    onTheShip: 'On The Ship',
    quietSpots: 'Quiet Spots',
    whatToExpect: 'What to Expect',
    gettingThere: 'Getting There',
    tips: 'Tips',
    ship: 'Ship'
  };
  return labels[sectionKey] || sectionKey;
}
