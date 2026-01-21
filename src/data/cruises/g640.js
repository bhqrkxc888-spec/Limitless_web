/**
 * G640 Cruise Configuration
 * P&O Iona - Christmas & New Year Canary Islands
 * December 19, 2026 - January 4, 2027
 * 
 * This file defines ONLY the cruise-specific data:
 * - Ship info
 * - Departure info
 * - Day-by-day itinerary (dates, ports, times)
 * 
 * Port content is AUTOMATICALLY pulled from port guides (ports.js & portContent.js)
 * based on the portSlug field.
 */

export const g640Cruise = {
  id: 'g640',
  name: 'Christmas & New Year Canary Islands',
  shortName: 'Christmas Canaries',
  
  // Ship information
  ship: {
    name: 'Iona',
    operator: 'P&O Cruises',
    imo: '9826548',
    mmsi: '310857000'
  },
  
  // Departure info for countdown
  departure: {
    date: '2026-12-19',
    time: '16:30',
    port: 'Southampton'
  },
  
  // Social/community
  facebookGroup: 'https://www.facebook.com/groups/2090299874803136/',
  
  // OG Image for social sharing
  ogImage: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_destinations/canary-islands/hero.webp',
  
  // Day-by-day itinerary
  // portSlug links to port guides - content is pulled automatically
  itinerary: [
    {
      date: "2026-12-19",
      dayNumber: 1,
      dayLabel: "Day 1",
      portName: "Southampton",
      portSlug: "southampton",
      country: "UK",
      dayType: "embarkation",
      arriveTime: null,
      departTime: "16:30",
      coords: { lat: 50.8998, lon: -1.4044 }
    },
    {
      date: "2026-12-20",
      dateEnd: "2026-12-22",
      dayNumber: 2,
      dayNumberEnd: 4,
      dayLabel: "Days 2-4",
      portName: "At Sea",
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-12-23",
      dayNumber: 5,
      dayLabel: "Day 5",
      portName: "Madeira",
      portSlug: "funchal-madeira",
      country: "Portugal",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      coords: { lat: 32.6669, lon: -16.9241 }
    },
    {
      date: "2026-12-24",
      dayNumber: 6,
      dayLabel: "Day 6",
      portName: "Tenerife",
      portSlug: "santa-cruz-de-tenerife",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      note: "Christmas Eve",
      coords: { lat: 28.4636, lon: -16.2518 }
    },
    {
      date: "2026-12-25",
      dayNumber: 7,
      dayLabel: "Day 7",
      portName: "At Sea",
      portSlug: null,
      country: null,
      dayType: "sea",
      note: "Christmas Day"
    },
    {
      date: "2026-12-26",
      dayNumber: 8,
      dayLabel: "Day 8",
      portName: "Fuerteventura",
      displayName: "Puerto del Rosario",
      portSlug: "fuerteventura",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      note: "Boxing Day",
      coords: { lat: 28.4995, lon: -13.8600 }
    },
    {
      date: "2026-12-27",
      dayNumber: 9,
      dayLabel: "Day 9",
      portName: "Gran Canaria",
      portSlug: "las-palmas-gran-canaria",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      coords: { lat: 28.1235, lon: -15.4363 }
    },
    {
      date: "2026-12-28",
      dayNumber: 10,
      dayLabel: "Day 10",
      portName: "Lanzarote",
      displayName: "Arrecife de Lanzarote",
      portSlug: "lanzarote",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "18:00",
      coords: { lat: 28.9630, lon: -13.5477 }
    },
    {
      date: "2026-12-29",
      dayNumber: 11,
      dayLabel: "Day 11",
      portName: "At Sea",
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-12-30",
      dayNumber: 12,
      dayLabel: "Day 12",
      portName: "Cádiz",
      portSlug: "cadiz",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "17:00",
      note: "Tours to Seville available",
      coords: { lat: 36.5271, lon: -6.2886 }
    },
    {
      date: "2026-12-31",
      dayNumber: 13,
      dayLabel: "Day 13",
      portName: "Lisbon",
      portSlug: "lisbon",
      country: "Portugal",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "17:00",
      note: "New Year's Eve",
      coords: { lat: 38.7223, lon: -9.1393 }
    },
    {
      date: "2027-01-01",
      dayNumber: 14,
      dayLabel: "Day 14",
      portName: "At Sea",
      portSlug: null,
      country: null,
      dayType: "sea",
      note: "New Year's Day"
    },
    {
      date: "2027-01-02",
      dayNumber: 15,
      dayLabel: "Day 15",
      portName: "La Coruña",
      portSlug: "a-coruna",
      country: "Spain",
      dayType: "port",
      arriveTime: "08:00",
      departTime: "17:00",
      coords: { lat: 43.3623, lon: -8.4115 }
    },
    {
      date: "2027-01-03",
      dayNumber: 16,
      dayLabel: "Day 16",
      portName: "At Sea",
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2027-01-04",
      dayNumber: 17,
      dayLabel: "Day 17",
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
