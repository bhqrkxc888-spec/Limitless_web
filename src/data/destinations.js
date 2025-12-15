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
        { name: 'Nassau', country: 'Bahamas', lat: 25.0479, lon: -77.3554 },
        { name: 'Cozumel', country: 'Mexico', lat: 20.5083, lon: -86.9458 },
        { name: 'St. Thomas', country: 'US Virgin Islands', lat: 18.3381, lon: -64.8941 },
        { name: 'Grand Cayman', country: 'Cayman Islands', lat: 19.2869, lon: -81.3674 },
        { name: 'Aruba', country: 'Aruba', lat: 12.5211, lon: -70.0337 }
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
        { name: 'Bergen', country: 'Norway', lat: 60.3913, lon: 5.3221 },
        { name: 'Geiranger', country: 'Norway', lat: 62.1000, lon: 7.2069 },
        { name: 'Stavanger', country: 'Norway', lat: 58.9690, lon: 5.7331 },
        { name: 'Flåm', country: 'Norway', lat: 60.8628, lon: 7.1137 },
        { name: 'Ålesund', country: 'Norway', lat: 62.4723, lon: 6.1549 }
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
        { name: 'Tenerife', country: 'Spain', lat: 28.4636, lon: -16.2518 },
        { name: 'Madeira', country: 'Portugal', lat: 32.6457, lon: -16.9255 },
        { name: 'Lanzarote', country: 'Spain', lat: 28.9630, lon: -13.5477 },
        { name: 'Gran Canaria', country: 'Spain', lat: 27.9202, lon: -15.5474 },
        { name: 'La Palma', country: 'Spain', lat: 28.6835, lon: -17.7642 }
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
  },
  // NEW DESTINATIONS BELOW
  {
    id: 'alaska',
    slug: 'alaska-cruises',
    name: 'Alaska',
    tagline: 'America\'s last frontier',
    description: 'Experience the raw wilderness of Alaska with its towering glaciers, abundant wildlife, and pristine natural beauty. From the Inside Passage to Glacier Bay, discover one of the world\'s most spectacular cruise destinations.',
    image: '/images/destinations/alaska.jpg',
    featured: true,
    coordinates: {
      lat: 58.3019,
      lon: -134.4197,
      ports: [
        { name: 'Juneau', country: 'USA', lat: 58.3019, lon: -134.4197 },
        { name: 'Ketchikan', country: 'USA', lat: 55.3422, lon: -131.6461 },
        { name: 'Skagway', country: 'USA', lat: 59.4583, lon: -135.3139 },
        { name: 'Sitka', country: 'USA', lat: 57.0531, lon: -135.3300 },
        { name: 'Glacier Bay', country: 'USA', lat: 58.5000, lon: -136.0000 }
      ]
    },
    regions: ['Inside Passage', 'Glacier Bay', 'Gulf of Alaska', 'Hubbard Glacier'],
    highlights: [
      'Massive tidewater glaciers',
      'Whale watching opportunities',
      'Grizzly bear sightings',
      'Historic Gold Rush towns',
      'Stunning mountain scenery'
    ],
    bestTime: 'May - September',
    cruiseLines: ['Princess Cruises', 'Holland America', 'Royal Caribbean', 'Celebrity Cruises', 'Norwegian Cruise Line'],
    meta: {
      title: 'Alaska Cruises | Inside Passage & Glacier Bay Holidays',
      description: 'Book Alaska cruise holidays. Experience glaciers, wildlife and stunning scenery. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'baltic',
    slug: 'baltic-cruises',
    name: 'Baltic & Northern Europe',
    tagline: 'Historic capitals and cultural treasures',
    description: 'Discover the enchanting cities of the Baltic Sea, from the grandeur of St Petersburg to the charm of Copenhagen and Stockholm. Rich history, stunning architecture, and Nordic culture await.',
    image: '/images/destinations/baltic.jpg',
    featured: true,
    coordinates: {
      lat: 59.9311,
      lon: 30.3609,
      ports: [
        { name: 'St Petersburg', country: 'Russia', lat: 59.9311, lon: 30.3609 },
        { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
        { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
        { name: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384 },
        { name: 'Tallinn', country: 'Estonia', lat: 59.4370, lon: 24.7536 },
        { name: 'Gdańsk', country: 'Poland', lat: 54.3520, lon: 18.6466 }
      ]
    },
    regions: ['Scandinavia', 'Baltic States', 'Russia', 'Northern Germany'],
    highlights: [
      'The Hermitage Museum in St Petersburg',
      'Copenhagen\'s Tivoli Gardens',
      'Stockholm\'s archipelago',
      'Tallinn\'s medieval old town',
      'White nights in summer'
    ],
    bestTime: 'May - September',
    cruiseLines: ['Viking', 'Celebrity Cruises', 'Princess Cruises', 'Holland America', 'P&O Cruises'],
    meta: {
      title: 'Baltic Cruises | St Petersburg, Copenhagen & Stockholm',
      description: 'Book Baltic cruise holidays. Visit historic capitals and cultural treasures. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'british-isles',
    slug: 'british-isles-cruises',
    name: 'British Isles',
    tagline: 'Discover the beauty of home',
    description: 'Explore the stunning coastlines, historic castles, and charming villages of the British Isles. From the Scottish Highlands to the Irish coast, discover the beauty and heritage on your doorstep.',
    image: '/images/destinations/british-isles.jpg',
    featured: false,
    coordinates: {
      lat: 57.4596,
      lon: -4.2264,
      ports: [
        { name: 'Edinburgh (Leith)', country: 'Scotland', lat: 55.9533, lon: -3.1883 },
        { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
        { name: 'Belfast', country: 'Northern Ireland', lat: 54.5973, lon: -5.9301 },
        { name: 'Liverpool', country: 'England', lat: 53.4084, lon: -2.9916 },
        { name: 'Invergordon', country: 'Scotland', lat: 57.6868, lon: -4.1714 },
        { name: 'Cork (Cobh)', country: 'Ireland', lat: 51.8503, lon: -8.2943 },
        { name: 'Orkney Islands', country: 'Scotland', lat: 58.9809, lon: -2.9605 }
      ]
    },
    regions: ['Scottish Highlands', 'Ireland', 'Wales', 'English Channel', 'Orkney & Shetland'],
    highlights: [
      'Scottish castles and Highlands',
      'Irish landscapes and culture',
      'Historic Liverpool and Belfast',
      'Remote island communities',
      'No flights required from UK'
    ],
    bestTime: 'May - September',
    cruiseLines: ['P&O Cruises', 'Fred. Olsen', 'Viking', 'Cunard', 'Princess Cruises'],
    meta: {
      title: 'British Isles Cruises | UK & Ireland Cruise Holidays',
      description: 'Book British Isles cruises. Explore Scotland, Ireland and UK coastline. No flights needed. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'transatlantic',
    slug: 'transatlantic-cruises',
    name: 'Transatlantic',
    tagline: 'Classic ocean voyages',
    description: 'Experience the romance of crossing the Atlantic Ocean in the tradition of the great ocean liners. Relaxing sea days, exceptional service, and the anticipation of arrival in a new world.',
    image: '/images/destinations/transatlantic.jpg',
    featured: false,
    coordinates: {
      lat: 40.6892,
      lon: -74.0445,
      ports: [
        { name: 'Southampton', country: 'England', lat: 50.8998, lon: -1.4044 },
        { name: 'New York', country: 'USA', lat: 40.6892, lon: -74.0445 },
        { name: 'Boston', country: 'USA', lat: 42.3601, lon: -71.0589 },
        { name: 'Fort Lauderdale', country: 'USA', lat: 26.1224, lon: -80.1373 }
      ]
    },
    regions: ['North Atlantic', 'Southampton to New York', 'Caribbean repositioning'],
    highlights: [
      'Classic ocean liner experience',
      'Extended relaxing sea days',
      'Excellent onboard enrichment',
      'Cunard\'s Queen Mary 2',
      'Repositioning cruise value'
    ],
    bestTime: 'April - May, September - November',
    cruiseLines: ['Cunard', 'Celebrity Cruises', 'Norwegian Cruise Line', 'Holland America'],
    meta: {
      title: 'Transatlantic Cruises | Ocean Crossings & Voyages',
      description: 'Book Transatlantic cruise crossings. Classic ocean voyages between UK and USA. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'hawaii',
    slug: 'hawaii-cruises',
    name: 'Hawaii',
    tagline: 'Aloha spirit and volcanic wonder',
    description: 'Discover the magic of the Hawaiian Islands with their stunning volcanic landscapes, pristine beaches, and rich Polynesian culture. Island-hop between Maui, Oahu, Kauai, and the Big Island.',
    image: '/images/destinations/hawaii.jpg',
    featured: false,
    coordinates: {
      lat: 21.3069,
      lon: -157.8583,
      ports: [
        { name: 'Honolulu (Oahu)', country: 'USA', lat: 21.3069, lon: -157.8583 },
        { name: 'Maui (Lahaina)', country: 'USA', lat: 20.8783, lon: -156.6825 },
        { name: 'Kauai (Nawiliwili)', country: 'USA', lat: 21.9544, lon: -159.3550 },
        { name: 'Hilo (Big Island)', country: 'USA', lat: 19.7241, lon: -155.0868 },
        { name: 'Kona (Big Island)', country: 'USA', lat: 19.6400, lon: -155.9969 }
      ]
    },
    regions: ['Oahu', 'Maui', 'Kauai', 'Big Island', 'Hawaiian Islands'],
    highlights: [
      'Active volcanoes on the Big Island',
      'Na Pali Coast of Kauai',
      'Pearl Harbor and Honolulu',
      'Whale watching (winter)',
      'Traditional luaus and culture'
    ],
    bestTime: 'Year-round (whale season December - April)',
    cruiseLines: ['Norwegian Cruise Line', 'Princess Cruises', 'Holland America', 'Celebrity Cruises'],
    meta: {
      title: 'Hawaii Cruises | Island Hopping Holidays',
      description: 'Book Hawaii cruise holidays. Island hop between Maui, Oahu, Kauai and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'australia',
    slug: 'australia-cruises',
    name: 'Australia',
    tagline: 'Discover Down Under',
    description: 'From the iconic Sydney Harbour to the Great Barrier Reef, experience Australia\'s diverse landscapes, unique wildlife, and vibrant cities on a cruise holiday.',
    image: '/images/destinations/australia.jpg',
    featured: false,
    coordinates: {
      lat: -33.8688,
      lon: 151.2093,
      ports: [
        { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
        { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631 },
        { name: 'Brisbane', country: 'Australia', lat: -27.4698, lon: 153.0251 },
        { name: 'Cairns', country: 'Australia', lat: -16.9186, lon: 145.7781 },
        { name: 'Perth (Fremantle)', country: 'Australia', lat: -32.0569, lon: 115.7439 }
      ]
    },
    regions: ['East Coast', 'Great Barrier Reef', 'Tasmania', 'Western Australia'],
    highlights: [
      'Sydney Harbour and Opera House',
      'Great Barrier Reef snorkeling',
      'Unique Australian wildlife',
      'Cosmopolitan Melbourne',
      'Tropical North Queensland'
    ],
    bestTime: 'October - April (Australian summer)',
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Celebrity Cruises', 'Holland America'],
    meta: {
      title: 'Australia Cruises | Sydney & Great Barrier Reef Holidays',
      description: 'Book Australia cruise holidays. Explore Sydney, Melbourne, Great Barrier Reef and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'greek-isles',
    slug: 'greek-isles-cruises',
    name: 'Greek Isles',
    tagline: 'Ancient history meets island paradise',
    description: 'Island-hop through the stunning Greek Isles, from the whitewashed beauty of Santorini to the beaches of Mykonos. Discover ancient ruins, azure waters, and legendary Greek hospitality.',
    image: '/images/destinations/greek-isles.jpg',
    featured: true,
    coordinates: {
      lat: 36.3932,
      lon: 25.4615,
      ports: [
        { name: 'Santorini', country: 'Greece', lat: 36.3932, lon: 25.4615 },
        { name: 'Mykonos', country: 'Greece', lat: 37.4467, lon: 25.3289 },
        { name: 'Rhodes', country: 'Greece', lat: 36.4350, lon: 28.2176 },
        { name: 'Crete (Heraklion)', country: 'Greece', lat: 35.3387, lon: 25.1442 },
        { name: 'Corfu', country: 'Greece', lat: 39.6243, lon: 19.9217 },
        { name: 'Piraeus (Athens)', country: 'Greece', lat: 37.9425, lon: 23.6467 }
      ]
    },
    regions: ['Cyclades', 'Dodecanese', 'Ionian Islands', 'Crete', 'Saronic Gulf'],
    highlights: [
      'Iconic Santorini sunsets',
      'Mykonos beaches and nightlife',
      'Ancient Athens and Acropolis',
      'Medieval Rhodes old town',
      'Authentic Greek cuisine'
    ],
    bestTime: 'May - October',
    cruiseLines: ['Celebrity Cruises', 'Royal Caribbean', 'Viking', 'Azamara', 'Windstar'],
    meta: {
      title: 'Greek Isles Cruises | Santorini, Mykonos & Island Hopping',
      description: 'Book Greek Islands cruise holidays. Visit Santorini, Mykonos, Rhodes and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'adriatic',
    slug: 'adriatic-cruises',
    name: 'Adriatic',
    tagline: 'Croatia, Venice and Montenegro',
    description: 'Cruise the stunning Adriatic coastline, from the floating city of Venice to Croatia\'s medieval walled cities and Montenegro\'s dramatic fjords. A treasure trove of history and natural beauty.',
    image: '/images/destinations/adriatic.jpg',
    featured: false,
    coordinates: {
      lat: 42.6507,
      lon: 18.0944,
      ports: [
        { name: 'Dubrovnik', country: 'Croatia', lat: 42.6507, lon: 18.0944 },
        { name: 'Venice', country: 'Italy', lat: 45.4408, lon: 12.3155 },
        { name: 'Split', country: 'Croatia', lat: 43.5081, lon: 16.4402 },
        { name: 'Kotor', country: 'Montenegro', lat: 42.4247, lon: 18.7712 },
        { name: 'Hvar', country: 'Croatia', lat: 43.1729, lon: 16.4411 },
        { name: 'Zadar', country: 'Croatia', lat: 44.1194, lon: 15.2314 }
      ]
    },
    regions: ['Croatia', 'Montenegro', 'Venice & Northern Italy', 'Slovenia'],
    highlights: [
      'Dubrovnik\'s ancient walls',
      'Venice\'s canals and architecture',
      'Kotor\'s dramatic bay',
      'Croatian island hopping',
      'Game of Thrones filming locations'
    ],
    bestTime: 'May - October',
    cruiseLines: ['Viking', 'Azamara', 'Windstar', 'Celebrity Cruises', 'Oceania'],
    meta: {
      title: 'Adriatic Cruises | Croatia, Venice & Montenegro',
      description: 'Book Adriatic cruise holidays. Explore Dubrovnik, Venice, Split and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'scandinavia',
    slug: 'scandinavia-cruises',
    name: 'Scandinavia',
    tagline: 'Nordic capitals and culture',
    description: 'Explore the stylish capitals and stunning landscapes of Scandinavia. From Copenhagen\'s hygge to Stockholm\'s archipelago and Oslo\'s fjords, discover the best of Nordic culture.',
    image: '/images/destinations/scandinavia.jpg',
    featured: false,
    coordinates: {
      lat: 59.9139,
      lon: 10.7522,
      ports: [
        { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
        { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
        { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522 },
        { name: 'Gothenburg', country: 'Sweden', lat: 57.7089, lon: 11.9746 },
        { name: 'Aarhus', country: 'Denmark', lat: 56.1629, lon: 10.2039 }
      ]
    },
    regions: ['Denmark', 'Sweden', 'Norway', 'Nordic Capitals'],
    highlights: [
      'Copenhagen\'s Nyhavn and Tivoli',
      'Stockholm\'s Gamla Stan',
      'Oslo\'s Viking heritage',
      'World-class Scandinavian design',
      'Nordic cuisine and culture'
    ],
    bestTime: 'May - September',
    cruiseLines: ['Viking', 'Celebrity Cruises', 'Princess Cruises', 'Holland America'],
    meta: {
      title: 'Scandinavia Cruises | Copenhagen, Stockholm & Oslo',
      description: 'Book Scandinavia cruise holidays. Explore Nordic capitals and culture. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'canada-new-england',
    slug: 'canada-new-england-cruises',
    name: 'Canada & New England',
    tagline: 'Fall foliage and maritime charm',
    description: 'Experience the spectacular autumn colours, historic ports, and maritime heritage of Canada and New England. From Boston to Quebec City, discover charming towns and stunning natural beauty.',
    image: '/images/destinations/canada-new-england.jpg',
    featured: false,
    coordinates: {
      lat: 46.8139,
      lon: -71.2080,
      ports: [
        { name: 'Quebec City', country: 'Canada', lat: 46.8139, lon: -71.2080 },
        { name: 'Boston', country: 'USA', lat: 42.3601, lon: -71.0589 },
        { name: 'Halifax', country: 'Canada', lat: 44.6488, lon: -63.5752 },
        { name: 'Bar Harbor', country: 'USA', lat: 44.3876, lon: -68.2039 },
        { name: 'Portland (Maine)', country: 'USA', lat: 43.6591, lon: -70.2568 },
        { name: 'Montreal', country: 'Canada', lat: 45.5017, lon: -73.5673 }
      ]
    },
    regions: ['New England', 'Maritime Canada', 'St Lawrence River', 'Atlantic Canada'],
    highlights: [
      'Spectacular fall foliage',
      'Historic Quebec City',
      'Lobster and seafood cuisine',
      'Acadia National Park',
      'French Canadian culture'
    ],
    bestTime: 'September - October (fall foliage)',
    cruiseLines: ['Holland America', 'Princess Cruises', 'Celebrity Cruises', 'Norwegian Cruise Line'],
    meta: {
      title: 'Canada & New England Cruises | Fall Foliage Holidays',
      description: 'Book Canada & New England cruises. Experience fall colours and maritime charm. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'panama-canal',
    slug: 'panama-canal-cruises',
    name: 'Panama Canal',
    tagline: 'Engineering marvel of the world',
    description: 'Transit one of the world\'s greatest engineering achievements on a Panama Canal cruise. Experience the wonder of crossing between two oceans while exploring Central American ports.',
    image: '/images/destinations/panama-canal.jpg',
    featured: false,
    coordinates: {
      lat: 9.0801,
      lon: -79.6804,
      ports: [
        { name: 'Panama City', country: 'Panama', lat: 8.9824, lon: -79.5199 },
        { name: 'Cartagena', country: 'Colombia', lat: 10.3910, lon: -75.4794 },
        { name: 'Puerto Limon', country: 'Costa Rica', lat: 9.9907, lon: -83.0360 },
        { name: 'Colon', country: 'Panama', lat: 9.3590, lon: -79.8998 }
      ]
    },
    regions: ['Panama Canal', 'Central America', 'Colombia', 'Costa Rica'],
    highlights: [
      'Full Panama Canal transit',
      'Miraflores Locks viewing',
      'Gatun Lake crossing',
      'Caribbean and Pacific ports',
      'Rainforest excursions'
    ],
    bestTime: 'December - April (dry season)',
    cruiseLines: ['Princess Cruises', 'Holland America', 'Celebrity Cruises', 'Norwegian Cruise Line'],
    meta: {
      title: 'Panama Canal Cruises | Full Transit & Partial Crossings',
      description: 'Book Panama Canal cruise holidays. Transit the famous locks and explore Central America. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'southeast-asia',
    slug: 'southeast-asia-cruises',
    name: 'Southeast Asia',
    tagline: 'Temples, beaches and exotic culture',
    description: 'Explore the exotic wonders of Southeast Asia, from Thailand\'s temples to Vietnam\'s halong Bay and Singapore\'s modernity. A sensory journey through rich cultures and stunning landscapes.',
    image: '/images/destinations/southeast-asia.jpg',
    featured: false,
    coordinates: {
      lat: 1.3521,
      lon: 103.8198,
      ports: [
        { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
        { name: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lon: 106.6297 },
        { name: 'Bangkok (Laem Chabang)', country: 'Thailand', lat: 13.0827, lon: 100.8875 },
        { name: 'Phuket', country: 'Thailand', lat: 7.8804, lon: 98.3923 },
        { name: 'Bali (Benoa)', country: 'Indonesia', lat: -8.7467, lon: 115.2142 },
        { name: 'Halong Bay', country: 'Vietnam', lat: 20.9101, lon: 107.1839 }
      ]
    },
    regions: ['Thailand', 'Vietnam', 'Singapore', 'Indonesia', 'Malaysia'],
    highlights: [
      'Halong Bay\'s limestone karsts',
      'Thai temple complexes',
      'Singapore\'s Gardens by the Bay',
      'Bali\'s spiritual culture',
      'Incredible street food'
    ],
    bestTime: 'November - March (dry season)',
    cruiseLines: ['Celebrity Cruises', 'Princess Cruises', 'Holland America', 'Azamara', 'Viking'],
    meta: {
      title: 'Southeast Asia Cruises | Thailand, Vietnam & Singapore',
      description: 'Book Southeast Asia cruise holidays. Explore temples, beaches and exotic culture. Expert advice from Limitless Cruises.'
    }
  }
];

// Helper functions
export const getDestinationBySlug = (slug) => destinations.find(d => d.slug === slug);
export const getFeaturedDestinations = () => destinations.filter(d => d.featured);
export const getAllDestinations = () => destinations;
