/**
 * Cruise Lines Data
 * All cruise line information for the site
 */

export const cruiseLines = [
  {
    id: 'po-cruises',
    slug: 'p-and-o-cruises',
    name: 'P&O Cruises',
    shortName: 'P&O',
    tagline: 'Britain\'s favourite cruise line',
    description: 'P&O Cruises offers a quintessentially British cruising experience with a wide range of itineraries from convenient UK ports. Perfect for first-time cruisers and seasoned sailors alike.',
    category: 'mainstream',
    featured: true,
    image: '/images/cruise-lines/po-cruises.jpg',
    logo: '/images/cruise-lines/logos/po-cruises.png',
    highlights: [
      'Sailings from Southampton',
      'No-fly cruising from the UK',
      'Award-winning British cuisine',
      'Entertainment by Headliners Theatre Company'
    ],
    ships: ['Iona', 'Arvia', 'Britannia', 'Ventura', 'Aurora', 'Arcadia'],
    destinations: ['Mediterranean', 'Norwegian Fjords', 'Caribbean', 'Canary Islands'],
    suitableFor: ['Couples', 'Families', 'Solo Travellers'],
    meta: {
      title: 'P&O Cruises | UK Cruise Holidays from Southampton',
      description: 'Explore P&O Cruises holidays from UK ports. No-fly cruising to the Mediterranean, Norway, Caribbean and more. Book with Limitless Cruises.'
    }
  },
  {
    id: 'royal-caribbean',
    slug: 'royal-caribbean',
    name: 'Royal Caribbean',
    shortName: 'Royal Caribbean',
    tagline: 'The world\'s most innovative cruise line',
    description: 'Royal Caribbean is known for groundbreaking ships featuring incredible amenities like FlowRider surf simulators, rock climbing walls, and the iconic Central Park at sea.',
    category: 'mainstream',
    featured: true,
    image: '/images/cruise-lines/royal-caribbean.jpg',
    logo: '/images/cruise-lines/logos/royal-caribbean.png',
    highlights: [
      'World\'s largest cruise ships',
      'Innovative onboard activities',
      'Perfect Day at CocoCay private island',
      'Award-winning entertainment'
    ],
    ships: ['Icon of the Seas', 'Wonder of the Seas', 'Symphony of the Seas', 'Odyssey of the Seas'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Asia'],
    suitableFor: ['Families', 'Adventure Seekers', 'Multi-generational'],
    meta: {
      title: 'Royal Caribbean Cruises | Book with Limitless Cruises',
      description: 'Discover Royal Caribbean cruise holidays with innovative ships and exciting destinations. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'msc-cruises',
    slug: 'msc-cruises',
    name: 'MSC Cruises',
    shortName: 'MSC',
    tagline: 'Mediterranean style, global destinations',
    description: 'MSC Cruises brings European elegance to cruising with beautiful ships, outstanding cuisine, and excellent value for families.',
    category: 'mainstream',
    featured: true,
    image: '/images/cruise-lines/msc-cruises.jpg',
    logo: '/images/cruise-lines/logos/msc-cruises.png',
    highlights: [
      'Modern fleet with latest technology',
      'MSC Yacht Club luxury experience',
      'Ocean Cay marine reserve',
      'Great value family cruises'
    ],
    ships: ['MSC World Europa', 'MSC Seascape', 'MSC Virtuosa', 'MSC Grandiosa'],
    destinations: ['Mediterranean', 'Caribbean', 'Northern Europe', 'Middle East'],
    suitableFor: ['Families', 'Couples', 'Budget-conscious'],
    meta: {
      title: 'MSC Cruises | Mediterranean & Caribbean Cruise Holidays',
      description: 'Book MSC Cruises for Mediterranean elegance at great value. Family-friendly ships and exciting destinations with Limitless Cruises.'
    }
  },
  {
    id: 'norwegian-cruise-line',
    slug: 'norwegian-cruise-line',
    name: 'Norwegian Cruise Line',
    shortName: 'NCL',
    tagline: 'Feel free to cruise your way',
    description: 'Norwegian Cruise Line pioneered Freestyle Cruising, offering flexibility with no fixed dining times and a relaxed, resort-style atmosphere.',
    category: 'mainstream',
    featured: true,
    image: '/images/cruise-lines/norwegian.jpg',
    logo: '/images/cruise-lines/logos/norwegian.png',
    highlights: [
      'Freestyle Cruising - no set dining times',
      'The Haven exclusive ship-within-a-ship',
      'Great Stirrup Cay private island',
      'Award-winning entertainment'
    ],
    ships: ['Norwegian Prima', 'Norwegian Viva', 'Norwegian Encore', 'Norwegian Escape'],
    destinations: ['Caribbean', 'Alaska', 'Mediterranean', 'Northern Europe'],
    suitableFor: ['Couples', 'Solo Travellers', 'Families'],
    meta: {
      title: 'Norwegian Cruise Line | Freestyle Cruising Holidays',
      description: 'Experience Freestyle Cruising with Norwegian Cruise Line. Flexible dining, exciting destinations. Book with Limitless Cruises.'
    }
  },
  {
    id: 'disney-cruise-line',
    slug: 'disney-cruise-line',
    name: 'Disney Cruise Line',
    shortName: 'Disney',
    tagline: 'Where magic meets the sea',
    description: 'Disney Cruise Line delivers magical family holidays with world-class entertainment, character experiences, and exceptional service.',
    category: 'premium',
    featured: true,
    image: '/images/cruise-lines/disney.jpg',
    logo: '/images/cruise-lines/logos/disney.png',
    highlights: [
      'Disney character experiences',
      'Award-winning Broadway-style shows',
      'Castaway Cay private island',
      'Adults-only areas and dining'
    ],
    ships: ['Disney Wish', 'Disney Fantasy', 'Disney Dream', 'Disney Magic', 'Disney Wonder'],
    destinations: ['Caribbean', 'Bahamas', 'Mediterranean', 'Alaska'],
    suitableFor: ['Families', 'Disney Fans', 'Multi-generational'],
    meta: {
      title: 'Disney Cruise Line | Magical Family Cruise Holidays',
      description: 'Create magical memories with Disney Cruise Line. Character experiences, entertainment & more. Book with Limitless Cruises.'
    }
  },
  {
    id: 'celebrity-cruises',
    slug: 'celebrity-cruises',
    name: 'Celebrity Cruises',
    shortName: 'Celebrity',
    tagline: 'Modern luxury at sea',
    description: 'Celebrity Cruises offers modern luxury with stylish ships, Michelin-inspired cuisine, and a focus on destination immersion.',
    category: 'premium',
    featured: true,
    image: '/images/cruise-lines/celebrity.jpg',
    logo: '/images/cruise-lines/logos/celebrity.png',
    highlights: [
      'Award-winning cuisine',
      'The Retreat - suite class experience',
      'Destination-focused itineraries',
      'Modern, elegant ship design'
    ],
    ships: ['Celebrity Beyond', 'Celebrity Apex', 'Celebrity Edge', 'Celebrity Eclipse'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Galapagos'],
    suitableFor: ['Couples', 'Foodies', 'Luxury Seekers'],
    meta: {
      title: 'Celebrity Cruises | Modern Luxury Cruise Holidays',
      description: 'Experience modern luxury with Celebrity Cruises. Award-winning dining and stunning destinations. Book with Limitless Cruises.'
    }
  },
  {
    id: 'fred-olsen',
    slug: 'fred-olsen-cruises',
    name: 'Fred. Olsen Cruise Lines',
    shortName: 'Fred. Olsen',
    tagline: 'Smaller ships for a more personal experience',
    description: 'Fred. Olsen offers intimate cruising on smaller ships with friendly British service and access to smaller ports that larger ships cannot reach.',
    category: 'traditional',
    featured: false,
    image: '/images/cruise-lines/fred-olsen.jpg',
    logo: '/images/cruise-lines/logos/fred-olsen.png',
    highlights: [
      'Small ship cruising',
      'Access to unique ports',
      'British-style service',
      'Regional UK departures'
    ],
    ships: ['Bolette', 'Borealis', 'Balmoral', 'Braemar'],
    destinations: ['Norwegian Fjords', 'Baltic', 'Mediterranean', 'British Isles'],
    suitableFor: ['Couples', 'Solo Travellers', 'Mature Travellers'],
    meta: {
      title: 'Fred. Olsen Cruises | Small Ship UK Cruising',
      description: 'Discover Fred. Olsen Cruise Lines for intimate small ship cruising from UK ports. Book with Limitless Cruises.'
    }
  },
  {
    id: 'holland-america',
    slug: 'holland-america-line',
    name: 'Holland America Line',
    shortName: 'Holland America',
    tagline: 'A signature of excellence',
    description: 'Holland America Line combines classic elegance with modern amenities, offering enriching destination experiences and refined dining.',
    category: 'premium',
    featured: false,
    image: '/images/cruise-lines/holland-america.jpg',
    logo: '/images/cruise-lines/logos/holland-america.png',
    highlights: [
      'Music Walk entertainment venues',
      'Explorations Central destination experiences',
      'Award-winning Pinnacle Grill',
      'Elegant mid-sized ships'
    ],
    ships: ['Rotterdam', 'Nieuw Statendam', 'Koningsdam', 'Eurodam'],
    destinations: ['Alaska', 'Caribbean', 'Northern Europe', 'World Cruises'],
    suitableFor: ['Mature Travellers', 'Couples', 'Music Lovers'],
    meta: {
      title: 'Holland America Line | Classic Premium Cruising',
      description: 'Experience elegant cruising with Holland America Line. Enriching destinations and refined service. Book with Limitless Cruises.'
    }
  },
  {
    id: 'marella',
    slug: 'marella-cruises',
    name: 'Marella Cruises',
    shortName: 'Marella',
    tagline: 'All-inclusive cruise holidays',
    description: 'Marella Cruises, part of TUI, offers great value all-inclusive cruising with flights included from UK airports.',
    category: 'mainstream',
    featured: false,
    image: '/images/cruise-lines/marella.jpg',
    logo: '/images/cruise-lines/logos/marella.png',
    highlights: [
      'All-inclusive drinks packages',
      'Flights included',
      'Adults-only and family ships',
      'Great value'
    ],
    ships: ['Marella Voyager', 'Marella Discovery', 'Marella Discovery 2', 'Marella Explorer'],
    destinations: ['Mediterranean', 'Caribbean', 'Canary Islands', 'Arabian Gulf'],
    suitableFor: ['Families', 'Couples', 'Budget-conscious'],
    meta: {
      title: 'Marella Cruises | All-Inclusive TUI Cruise Holidays',
      description: 'Book Marella Cruises for all-inclusive cruise holidays with flights. Great value from Limitless Cruises.'
    }
  },
  {
    id: 'virgin-voyages',
    slug: 'virgin-voyages-cruises',
    name: 'Virgin Voyages',
    shortName: 'Virgin',
    tagline: 'Rebelliously different cruising',
    description: 'Virgin Voyages offers an adults-only, design-forward cruise experience that challenges traditional cruising conventions.',
    category: 'contemporary',
    featured: true,
    image: '/images/cruise-lines/virgin-voyages.jpg',
    logo: '/images/cruise-lines/logos/virgin-voyages.png',
    highlights: [
      'Adults-only ships',
      'All restaurants included',
      'No main dining room',
      'Rockstar Suites with private karaoke'
    ],
    ships: ['Scarlet Lady', 'Valiant Lady', 'Resilient Lady', 'Brilliant Lady'],
    destinations: ['Caribbean', 'Mediterranean', 'Australia'],
    suitableFor: ['Adults Only', 'Couples', 'Millennials', 'Party Seekers'],
    meta: {
      title: 'Virgin Voyages | Adults-Only Modern Cruise Holidays',
      description: 'Experience Virgin Voyages - adults-only cruising that\'s rebelliously different. Book with Limitless Cruises.'
    }
  },
  {
    id: 'viking',
    slug: 'viking-cruises',
    name: 'Viking',
    shortName: 'Viking',
    tagline: 'The thinking person\'s cruise',
    description: 'Viking offers destination-focused ocean and river cruises for curious travellers who want to explore the world thoughtfully.',
    category: 'luxury',
    featured: false,
    image: '/images/cruise-lines/viking.jpg',
    logo: '/images/cruise-lines/logos/viking.png',
    highlights: [
      'Destination-focused itineraries',
      'All-inclusive shore excursions',
      'Adults-only (18+)',
      'Elegant Scandinavian design'
    ],
    ships: ['Viking Neptune', 'Viking Mars', 'Viking Saturn', 'Viking Orion'],
    destinations: ['Northern Europe', 'Mediterranean', 'World Cruises', 'Expeditions'],
    suitableFor: ['Mature Travellers', 'Couples', 'Culture Seekers'],
    meta: {
      title: 'Viking Cruises | Destination-Focused Ocean & River Cruising',
      description: 'Explore with Viking - elegant, destination-focused cruising. Ocean and river voyages. Book with Limitless Cruises.'
    }
  },
  {
    id: 'seabourn',
    slug: 'seabourn-cruises',
    name: 'Seabourn',
    shortName: 'Seabourn',
    tagline: 'Intimate luxury at sea',
    description: 'Seabourn delivers ultra-luxury cruising on intimate ships with exceptional service, all-inclusive luxury, and unique destinations.',
    category: 'ultra-luxury',
    featured: false,
    image: '/images/cruise-lines/seabourn.jpg',
    logo: '/images/cruise-lines/logos/seabourn.png',
    highlights: [
      'All-suite accommodations',
      'Open bars and fine dining included',
      'Intimate ships (up to 600 guests)',
      'Marina with water sports'
    ],
    ships: ['Seabourn Ovation', 'Seabourn Encore', 'Seabourn Quest', 'Seabourn Pursuit'],
    destinations: ['Mediterranean', 'Northern Europe', 'Caribbean', 'Expeditions'],
    suitableFor: ['Luxury Seekers', 'Couples', 'Mature Travellers'],
    meta: {
      title: 'Seabourn Cruises | Ultra-Luxury Small Ship Cruising',
      description: 'Experience Seabourn\'s ultra-luxury all-inclusive cruising. Intimate ships, exceptional service. Book with Limitless Cruises.'
    }
  },
  {
    id: 'princess',
    slug: 'princess-cruises',
    name: 'Princess Cruises',
    shortName: 'Princess',
    tagline: 'Come back new',
    description: 'Princess Cruises offers award-winning MedallionClass technology for a personalized cruise experience with innovative service.',
    category: 'premium',
    featured: false,
    image: '/images/cruise-lines/princess.jpg',
    logo: '/images/cruise-lines/logos/princess.png',
    highlights: [
      'MedallionClass technology',
      'Movies Under the Stars',
      'Discovery at Sea programmes',
      'Private balcony dining'
    ],
    ships: ['Sun Princess', 'Discovery Princess', 'Enchanted Princess', 'Sky Princess'],
    destinations: ['Alaska', 'Caribbean', 'Mediterranean', 'Australia'],
    suitableFor: ['Couples', 'Families', 'Tech-savvy Travellers'],
    meta: {
      title: 'Princess Cruises | MedallionClass Cruise Holidays',
      description: 'Discover Princess Cruises with innovative MedallionClass service. Award-winning cruising. Book with Limitless Cruises.'
    }
  },
  {
    id: 'azamara',
    slug: 'azamara-cruises',
    name: 'Azamara',
    shortName: 'Azamara',
    tagline: 'Destination immersion at sea',
    description: 'Azamara specializes in destination-intensive cruising with longer stays, more overnights, and night touring in unique ports.',
    category: 'luxury',
    featured: false,
    image: '/images/cruise-lines/azamara.jpg',
    logo: '/images/cruise-lines/logos/azamara.png',
    highlights: [
      'Longer stays in port',
      'More overnight calls',
      'AzAmazing Evenings events',
      'Boutique ships (600-700 guests)'
    ],
    ships: ['Azamara Journey', 'Azamara Quest', 'Azamara Pursuit', 'Azamara Onward'],
    destinations: ['Mediterranean', 'British Isles', 'Asia', 'South America'],
    suitableFor: ['Culture Seekers', 'Couples', 'Mature Travellers'],
    meta: {
      title: 'Azamara Cruises | Destination-Intensive Boutique Cruising',
      description: 'Experience Azamara\'s destination-immersive cruising. Longer port stays, unique experiences. Book with Limitless Cruises.'
    }
  },
  {
    id: 'ae-expeditions',
    slug: 'ae-expeditions',
    name: 'A&E Expeditions',
    shortName: 'A&E',
    tagline: 'Adventure expedition cruising',
    description: 'A&E Expeditions offers adventure expedition cruises to remote destinations including Antarctica, Arctic, and beyond.',
    category: 'expedition',
    featured: false,
    image: '/images/cruise-lines/ae-expeditions.jpg',
    logo: '/images/cruise-lines/logos/ae-expeditions.png',
    highlights: [
      'Expedition to remote regions',
      'Expert expedition team',
      'Zodiac excursions',
      'Small expedition vessels'
    ],
    ships: ['Greg Mortimer', 'Sylvia Earle', 'Douglas Mawson'],
    destinations: ['Antarctica', 'Arctic', 'Kimberley', 'Remote Islands'],
    suitableFor: ['Adventure Seekers', 'Wildlife Enthusiasts', 'Photographers'],
    meta: {
      title: 'A&E Expeditions | Antarctic & Arctic Expedition Cruises',
      description: 'Explore Antarctica and the Arctic with A&E Expeditions. Adventure expedition cruising. Book with Limitless Cruises.'
    }
  }
];

// Helper functions
export const getCruiseLineBySlug = (slug) => cruiseLines.find(cl => cl.slug === slug);
export const getFeaturedCruiseLines = () => cruiseLines.filter(cl => cl.featured);
export const getCruiseLinesByCategory = (category) => cruiseLines.filter(cl => cl.category === category);

