/**
 * G606 Cruise Configuration
 * P&O Iona - Spain, Portugal & Canary Islands
 * March 14-28, 2026
 * 
 * This file defines ONLY the cruise-specific data:
 * - Ship info
 * - Departure info
 * - Day-by-day itinerary (dates, ports, times)
 * 
 * Port content is AUTOMATICALLY pulled from port guides (ports.js & portContent.js)
 * based on the portSlug field.
 */

export const g606Cruise = {
  id: 'g606',
  name: 'Spain, Portugal & Canary Islands',
  shortName: 'Canary Islands',
  
  // Ship information
  ship: {
    name: 'Iona',
    operator: 'P&O Cruises',
    imo: '9826548',
    mmsi: '310857000'
  },
  
  // Departure info for countdown
  departure: {
    date: '2026-03-14',
    time: '16:30',
    port: 'Southampton'
  },
  
  // Social/community
  facebookGroup: 'https://www.facebook.com/groups/1019149802999591/',
  
  // OG Image for social sharing
  ogImage: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_destinations/canary-islands/hero.webp',
  
  // Day-by-day itinerary
  // portSlug links to port guides - content is pulled automatically
  itinerary: [
    {
      date: "2026-03-14",
      dayNumber: 1,
      dayLabel: "Day 1",
      portName: "Southampton",
      portSlug: "southampton", // Links to port guide
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
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-03-16",
      dayNumber: 3,
      dayLabel: "Day 3",
      portName: "La Coruña",
      portSlug: "a-coruna", // Links to port guide
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
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-03-19",
      dayNumber: 6,
      dayLabel: "Day 6",
      portName: "Tenerife",
      portSlug: "santa-cruz-de-tenerife", // Links to port guide
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
      portSlug: "las-palmas-gran-canaria", // Links to port guide
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
      portSlug: "lanzarote", // Links to port guide
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
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-03-23",
      dayNumber: 10,
      dayLabel: "Day 10",
      portName: "Cádiz",
      portSlug: "cadiz", // Links to port guide
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
      portSlug: "lisbon", // Links to port guide
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
      portSlug: null,
      country: null,
      dayType: "sea"
    },
    {
      date: "2026-03-28",
      dayNumber: 15,
      dayLabel: "Day 15",
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
