/**
 * Cruise Types Data
 * Types of cruise experiences for the hub page
 */

export const cruiseTypes = [
  {
    id: 'family',
    slug: 'family-cruises',
    name: 'Family Cruises',
    tagline: 'Adventures for all ages',
    shortDescription: 'Create unforgettable family memories with cruises designed for all ages.',
    description: 'Create unforgettable family memories with cruises designed for all ages. Kids clubs, family activities, waterparks, and entertainment the whole family will love. From toddler-friendly facilities to teen hangouts, cruise lines have perfected the art of keeping everyone happy.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/South%20America/rio-beech.jpeg',
    icon: 'family',
    highlights: [
      'Award-winning kids clubs and teen programmes',
      'Family-friendly shore excursions',
      'Connecting staterooms and family suites',
      'Character experiences (Disney, DreamWorks)',
      'Waterparks and adventure activities',
      'Kids-eat-free dining options'
    ],
    bestFor: ['Families with young children', 'Multi-generational groups', 'First-time family cruisers'],
    recommendedLines: ['Disney Cruise Line', 'Royal Caribbean', 'MSC Cruises', 'P&O Cruises', 'Norwegian Cruise Line'],
    tips: [
      'Book early to secure connecting cabins',
      'Choose ships with extensive kids facilities',
      'Consider school holiday sailings for best kids club experience',
      'Look for kids-sail-free promotions'
    ],
    featured: true,
    priority: 1,
    meta: {
      title: 'Family Cruises | Kids-Friendly Cruise Holidays | Limitless Cruises',
      description: 'Book family cruise holidays with kids clubs, waterparks and activities for all ages. Expert family cruise advice from Limitless Cruises.'
    }
  },
  {
    id: 'adults-only',
    slug: 'adult-only-cruises',
    name: 'Adults Only',
    tagline: 'Sophisticated escapes',
    shortDescription: 'Peaceful relaxation on ships designed exclusively for grown-ups.',
    description: 'Enjoy peaceful relaxation on adults-only ships or adult-exclusive areas. Perfect for couples, groups of friends, or solo travellers seeking a serene, sophisticated atmosphere without the bustle of family cruising.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Polynesia/bora-bora.jpeg',
    icon: 'adults',
    highlights: [
      'No children on board - guaranteed tranquillity',
      'Sophisticated entertainment and nightlife',
      'Fine dining experiences',
      'Tranquil pool and spa areas',
      'Premium cabin categories',
      'Curated shore excursions'
    ],
    bestFor: ['Couples', 'Groups of friends', 'Solo travellers', 'Those seeking relaxation'],
    recommendedLines: ['Virgin Voyages', 'Viking', 'Seabourn', 'Azamara', 'Saga Cruises'],
    tips: [
      'Virgin Voyages is exclusively 18+ with rock & roll vibes',
      'Viking offers refined cultural enrichment',
      'Saga is 50+ with British sensibilities',
      'Many luxury lines are effectively adults-only due to atmosphere'
    ],
    featured: true,
    priority: 2,
    meta: {
      title: 'Adults Only Cruises | Child-Free Cruise Holidays | Limitless Cruises',
      description: 'Book adults-only cruise holidays. Peaceful, sophisticated cruising without children. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'uk-sailings',
    slug: 'uk-no-fly-cruises',
    name: 'UK No-Fly Cruises',
    tagline: 'No-fly cruising from home',
    shortDescription: 'Skip the airport hassle with cruises departing from UK ports.',
    description: 'Skip the airport hassle with cruises departing from Southampton, Liverpool, Tilbury, and other UK ports. Your holiday starts the moment you board - no flights, generous baggage allowances, and easy access from home.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Transatlantic/queen-mary-2.jpeg',
    icon: 'uk',
    highlights: [
      'No flights required - drive to the port',
      'Generous baggage allowances',
      'Holiday starts immediately',
      'Avoid airport stress and queues',
      'Southampton is the UK cruise capital',
      'Regional ports available (Liverpool, Newcastle, Dover)'
    ],
    bestFor: ['Those who prefer not to fly', 'First-time cruisers', 'Mobility-limited travellers', 'Those with lots of luggage'],
    recommendedLines: ['P&O Cruises', 'Fred. Olsen', 'Marella Cruises', 'MSC Cruises', 'Cunard'],
    tips: [
      'Southampton offers the widest choice of itineraries',
      'Consider overnight hotel before sailing for stress-free start',
      'Port parking is available at most UK terminals',
      'Winter sun cruises to Canaries are popular from UK ports'
    ],
    featured: true,
    priority: 3,
    meta: {
      title: 'UK No-Fly Cruises | Southampton & UK Port Sailings | Limitless Cruises',
      description: 'Book no-fly cruises from UK ports. Southampton, Liverpool and more. Expert cruise advice from Limitless Cruises.'
    }
  },
  {
    id: 'luxury',
    slug: 'luxury-cruises',
    name: 'Luxury Cruises',
    tagline: 'The finest way to travel',
    shortDescription: 'All-inclusive elegance with exceptional service and intimate ships.',
    description: 'Experience cruising at its finest with all-inclusive luxury lines. Butler service, gourmet dining, premium drinks, and gratuities included. Smaller ships mean exceptional service ratios and access to exclusive ports.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Middle%20East/hero-dubai.jpeg',
    icon: 'luxury',
    highlights: [
      'All-inclusive fares (drinks, dining, gratuities)',
      'Small ship intimacy (under 1,000 guests)',
      'Exceptional crew-to-guest ratios',
      'Suite-style accommodations',
      'Michelin-quality dining',
      'Included shore excursions'
    ],
    bestFor: ['Discerning travellers', 'Special occasions', 'Those seeking all-inclusive value', 'Experienced cruisers'],
    recommendedLines: ['Regent Seven Seas', 'Silversea', 'Seabourn', 'Oceania', 'Crystal'],
    tips: [
      'All-inclusive often represents excellent value',
      'Book verandah suites for the best experience',
      'Luxury lines often visit smaller, less crowded ports',
      'Special dietary requirements are handled beautifully'
    ],
    featured: true,
    priority: 4,
    meta: {
      title: 'Luxury Cruises | All-Inclusive Premium Voyages | Limitless Cruises',
      description: 'Book luxury cruise holidays. All-inclusive elegance with exceptional service. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'river',
    slug: 'river-cruises',
    name: 'River Cruises',
    tagline: 'Glide through the heart of cities',
    shortDescription: 'Intimate ships sailing Europe\'s legendary waterways.',
    description: 'Cruise the legendary rivers of Europe on intimate ships that dock in the heart of cities. No sea days, daily new destinations, and all-inclusive packages make river cruising the stress-free way to explore.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Rivers/rhine-castle.jpeg',
    icon: 'river',
    highlights: [
      'Dock in city centres',
      'New destination every day',
      'Intimate ships (100-200 guests)',
      'All-inclusive packages available',
      'No motion sickness concerns',
      'Included shore excursions'
    ],
    bestFor: ['First-time cruisers', 'Culture enthusiasts', 'Those who dislike sea days', 'Wine and food lovers'],
    recommendedLines: ['Viking', 'AmaWaterways', 'Uniworld', 'Avalon Waterways', 'Scenic'],
    tips: [
      'Rhine and Danube are perfect for first-timers',
      'Christmas markets cruises are magical',
      'Book early for the best cabin locations (middle of ship)',
      'Consider the Douro for wine lovers'
    ],
    featured: true,
    priority: 5,
    meta: {
      title: 'River Cruises | Rhine, Danube & European Rivers | Limitless Cruises',
      description: 'Book European river cruises. Sail the Rhine, Danube, Seine and more. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'expedition',
    slug: 'expedition-cruises',
    name: 'Expedition Cruises',
    tagline: 'Explore the world\'s wild places',
    shortDescription: 'Adventure to remote destinations on specialist expedition ships.',
    description: 'Venture beyond the ordinary to the world\'s most remote and pristine destinations. Antarctica, the Arctic, Galápagos, and more - expedition cruises combine adventure with expert-led exploration.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Antartica/antartica-card.jpeg',
    icon: 'expedition',
    highlights: [
      'Zodiac landings on remote shores',
      'Expert naturalist guides',
      'Small ship access to unique destinations',
      'Wildlife encounters',
      'Educational lectures and programs',
      'All-inclusive expedition packages'
    ],
    bestFor: ['Adventure seekers', 'Wildlife enthusiasts', 'Photographers', 'Experienced travellers'],
    recommendedLines: ['Hurtigruten', 'Ponant', 'Silversea Expeditions', 'Lindblad', 'Quark Expeditions'],
    tips: [
      'Book Antarctica 12-18 months in advance',
      'Invest in proper expedition clothing',
      'Choose operators with strong environmental credentials',
      'Consider shoulder seasons for better value'
    ],
    featured: true,
    priority: 6,
    meta: {
      title: 'Expedition Cruises | Antarctica, Arctic & Adventure | Limitless Cruises',
      description: 'Book expedition cruises to Antarctica, Arctic, Galápagos and beyond. Expert adventure cruise advice from Limitless Cruises.'
    }
  },
  {
    id: 'solo',
    slug: 'solo-cruises',
    name: 'Solo Traveller',
    tagline: 'Freedom to cruise your way',
    shortDescription: 'Cruises designed for independent travellers with no single supplements.',
    description: 'Cruising solo has never been easier. Many cruise lines now offer dedicated solo cabins with little or no single supplement, plus social events and dining designed to help solo travellers connect.',
    image: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/Grand/grand-voyage.jpeg',
    icon: 'solo',
    highlights: [
      'Studio cabins designed for solo travellers',
      'No or low single supplements',
      'Solo traveller meet-ups and events',
      'Host-facilitated dining',
      'Freedom to do as you please',
      'Safe and secure travel environment'
    ],
    bestFor: ['Independent travellers', 'Those between travel companions', 'Widows and widowers', 'Anyone seeking solo adventure'],
    recommendedLines: ['Norwegian Cruise Line', 'P&O Cruises', 'Fred. Olsen', 'Saga Cruises', 'Cunard'],
    tips: [
      'Norwegian\'s Studio cabins have exclusive solo lounge',
      'Book guaranteed cabin grades for solo supplement savings',
      'Consider smaller ships for easier socialising',
      'Fred. Olsen is excellent for solo UK travellers'
    ],
    featured: false,
    priority: 7,
    meta: {
      title: 'Solo Cruises | Single Traveller Cruise Holidays | Limitless Cruises',
      description: 'Book cruises for solo travellers. Studio cabins, no single supplements and social events. Expert advice from Limitless Cruises.'
    }
  }
];

// Helper functions
export const getCruiseTypeBySlug = (slug) => cruiseTypes.find(t => t.slug === slug);
export const getFeaturedCruiseTypes = () => cruiseTypes.filter(t => t.featured).sort((a, b) => a.priority - b.priority);
export const getAllCruiseTypes = () => [...cruiseTypes].sort((a, b) => a.priority - b.priority);

// Legacy support - keep categories export for backwards compatibility
export const categories = cruiseTypes;
export const getCategoryBySlug = getCruiseTypeBySlug;

