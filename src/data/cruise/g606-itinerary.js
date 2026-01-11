/**
 * G606 Itinerary Data
 * P&O Iona - Spain, Portugal & Canary Islands
 * March 14-28, 2026
 */

export const g606Itinerary = [
  {
    date: "2026-03-14",
    dayNumber: 1,
    dayLabel: "Day 1",
    portName: "Southampton",
    country: "UK",
    dayType: "embarkation",
    arriveTime: null,
    departTime: "TBC"
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
    arriveTime: "TBC",
    departTime: "TBC"
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
    arriveTime: "TBC",
    departTime: "TBC"
  },
  {
    date: "2026-03-20",
    dayNumber: 7,
    dayLabel: "Day 7",
    portName: "Gran Canaria",
    country: "Spain",
    dayType: "port",
    arriveTime: "TBC",
    departTime: "TBC"
  },
  {
    date: "2026-03-21",
    dayNumber: 8,
    dayLabel: "Day 8",
    portName: "Lanzarote",
    displayName: "Arrecife de Lanzarote",
    country: "Spain",
    dayType: "port",
    arriveTime: "TBC",
    departTime: "TBC"
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
    arriveTime: "TBC",
    departTime: "TBC",
    note: "Tours to Seville available"
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
    arriveTime: "TBC",
    departTime: "TBC",
    isOvernight: true
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
    arriveTime: "TBC",
    departTime: null
  }
];

/**
 * Get sections available for a day type
 */
export function getSectionsForDayType(dayType) {
  switch (dayType) {
    case 'port':
      return ['overview', 'stayLocal', 'goFurther', 'withKids', 'send', 'foodAndDrink'];
    case 'sea':
      return ['overview', 'onTheShip', 'quietSpots', 'send'];
    case 'embarkation':
      return ['whatToExpect', 'gettingThere', 'tips', 'send'];
    case 'disembarkation':
      return ['whatToExpect', 'tips', 'send'];
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
    stayLocal: 'Stay Local',
    goFurther: 'Go Further',
    withKids: 'With Kids',
    send: 'SEND & Accessibility',
    foodAndDrink: 'Food & Drink',
    onTheShip: 'On The Ship',
    quietSpots: 'Quiet Spots',
    whatToExpect: 'What to Expect',
    gettingThere: 'Getting There',
    tips: 'Tips'
  };
  return labels[sectionKey] || sectionKey;
}
