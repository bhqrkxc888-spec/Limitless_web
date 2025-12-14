/**
 * Destinations Data
 * Cruise destination information for the site
 */

export const destinations = [
  {
    id: 'mediterranean',
    slug: 'mediterranean-cruises',
    name: 'Mediterranean',
    tagline: 'Sun-soaked history and culture',
    description: 'Explore ancient civilizations, stunning coastlines, and world-class cuisine on a Mediterranean cruise. From Barcelona to Athens, discover iconic destinations.',
    image: '/images/destinations/mediterranean.jpg',
    featured: true,
    // Coordinates for API integration (Barcelona as primary port)
    coordinates: {
      lat: 41.3851,
      lon: 2.1734,
      // Major Mediterranean cruise ports
      ports: [
        { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734 },
        { name: 'Gibraltar', country: 'Gibraltar', lat: 36.1408, lon: -5.3536 },
        { name: 'Málaga', country: 'Spain', lat: 36.7213, lon: -4.4214 },
        { name: 'Alicante', country: 'Spain', lat: 38.3452, lon: -0.4810 },
        { name: 'Toulon', country: 'France', lat: 43.1242, lon: 5.9280 },
        { name: 'Civitavecchia (Rome)', country: 'Italy', lat: 42.0934, lon: 11.7964 },
        { name: 'Piraeus (Athens)', country: 'Greece', lat: 37.9425, lon: 23.6467 },
        { name: 'Valletta', country: 'Malta', lat: 35.8989, lon: 14.5146 },
        { name: 'Ibiza', country: 'Spain', lat: 38.9067, lon: 1.4206 }
      ]
    },
    regions: ['Western Mediterranean', 'Eastern Mediterranean', 'Greek Isles', 'Adriatic'],
    highlights: [
      'Historic ports like Rome, Athens, and Barcelona',
      'Beautiful Greek Islands',
      'Croatian coastline',
      'French and Italian Riviera'
    ],
    bestTime: 'April - October',
    cruiseLines: ['P&O Cruises', 'MSC Cruises', 'Royal Caribbean', 'Celebrity Cruises'],
    meta: {
      title: 'Mediterranean Cruises | Greek Isles, Italy & Spain',
      description: 'Book Mediterranean cruise holidays. Explore Greek Isles, Italian ports, Spanish coastline and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'caribbean',
    slug: 'caribbean-cruises',
    name: 'Caribbean',
    tagline: 'Paradise islands await',
    description: 'Crystal-clear waters, white sand beaches, and tropical adventures await in the Caribbean. From Jamaica to the Bahamas, find your perfect island escape.',
    image: '/images/destinations/caribbean.jpg',
    featured: true,
    // Coordinates for API integration (Nassau, Bahamas as primary port)
    coordinates: {
      lat: 25.0479,
      lon: -77.3554,
      ports: [
        { name: 'Nassau', lat: 25.0479, lon: -77.3554 },
        { name: 'Cozumel', lat: 20.5083, lon: -86.9458 },
        { name: 'St. Thomas', lat: 18.3381, lon: -64.8941 }
      ]
    },
    regions: ['Eastern Caribbean', 'Western Caribbean', 'Southern Caribbean', 'Bahamas'],
    highlights: [
      'Private island experiences',
      'Beautiful white sand beaches',
      'Snorkeling and diving',
      'Tropical rainforests'
    ],
    bestTime: 'December - April',
    cruiseLines: ['Royal Caribbean', 'Disney Cruise Line', 'Norwegian Cruise Line', 'MSC Cruises'],
    meta: {
      title: 'Caribbean Cruises | Island Hopping Holidays',
      description: 'Book Caribbean cruise holidays. Visit tropical islands, private beaches and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'norwegian-fjords',
    slug: 'norwegian-fjords-cruises',
    name: 'Norwegian Fjords',
    tagline: 'Majestic natural beauty',
    description: 'Sail through dramatic fjords, past cascading waterfalls, and beneath towering mountains on a Norwegian Fjords cruise. Nature at its most spectacular.',
    image: '/images/destinations/norwegian-fjords.jpg',
    featured: true,
    // Coordinates for API integration (Bergen as primary port)
    coordinates: {
      lat: 60.3913,
      lon: 5.3221,
      ports: [
        { name: 'Bergen', lat: 60.3913, lon: 5.3221 },
        { name: 'Geiranger', lat: 62.1000, lon: 7.2069 },
        { name: 'Stavanger', lat: 58.9690, lon: 5.7331 }
      ]
    },
    regions: ['Fjords', 'North Cape', 'Lofoten Islands', 'Arctic Norway'],
    highlights: [
      'Dramatic fjord landscapes',
      'Midnight sun (summer)',
      'Northern Lights (winter)',
      'Charming Norwegian villages'
    ],
    bestTime: 'May - September',
    cruiseLines: ['P&O Cruises', 'Fred. Olsen', 'Viking', 'Holland America'],
    meta: {
      title: 'Norwegian Fjords Cruises | Norway Cruise Holidays',
      description: 'Book Norwegian Fjords cruises. Dramatic landscapes, midnight sun and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'atlantic-islands',
    slug: 'atlantic-islands-cruises',
    name: 'Atlantic Islands',
    tagline: 'Canaries, Azores & Madeira',
    description: 'Discover the volcanic landscapes, year-round sunshine, and unique cultures of the Atlantic Islands including the Canaries, Azores, and Madeira.',
    image: '/images/destinations/atlantic-islands.jpg',
    featured: false,
    // Coordinates for API integration (Tenerife as primary port)
    coordinates: {
      lat: 28.4636,
      lon: -16.2518,
      ports: [
        { name: 'Tenerife', lat: 28.4636, lon: -16.2518 },
        { name: 'Madeira', lat: 32.6457, lon: -16.9255 },
        { name: 'Lanzarote', lat: 28.9630, lon: -13.5477 }
      ]
    },
    regions: ['Canary Islands', 'Azores', 'Madeira', 'Cape Verde'],
    highlights: [
      'Year-round sunshine',
      'Volcanic landscapes',
      'Botanical gardens',
      'Unique local cultures'
    ],
    bestTime: 'Year-round',
    cruiseLines: ['P&O Cruises', 'Marella Cruises', 'Fred. Olsen', 'MSC Cruises'],
    meta: {
      title: 'Atlantic Islands Cruises | Canary Islands, Madeira & Azores',
      description: 'Book Atlantic Islands cruises. Canaries, Madeira, Azores and more. Expert advice from Limitless Cruises.'
    }
  }
];

// Helper functions
export const getDestinationBySlug = (slug) => destinations.find(d => d.slug === slug);
export const getFeaturedDestinations = () => destinations.filter(d => d.featured);

