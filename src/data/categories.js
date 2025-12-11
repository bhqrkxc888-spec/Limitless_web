/**
 * Cruise Categories Data
 * Category/type information for the site
 */

export const categories = [
  {
    id: 'family',
    slug: 'family-cruises',
    name: 'Family Cruises',
    tagline: 'Adventures for all ages',
    description: 'Create unforgettable family memories with cruises designed for all ages. Kids clubs, family activities, and entertainment everyone will love.',
    image: '/images/categories/family-cruises.jpg',
    icon: 'family',
    highlights: [
      'Kids clubs and teen programmes',
      'Family-friendly shore excursions',
      'Connecting cabins available',
      'Character experiences (select lines)'
    ],
    recommendedLines: ['Disney Cruise Line', 'Royal Caribbean', 'MSC Cruises', 'P&O Cruises'],
    meta: {
      title: 'Family Cruises | Kids-Friendly Cruise Holidays',
      description: 'Book family cruise holidays with kids clubs, activities and more. Expert family cruise advice from Limitless Cruises.'
    }
  },
  {
    id: 'adults-only',
    slug: 'adult-only-cruises',
    name: 'Adults Only Cruises',
    tagline: 'Sophisticated escapes',
    description: 'Enjoy peaceful relaxation on adults-only ships or adult-exclusive areas. Perfect for couples and travellers seeking a serene atmosphere.',
    image: '/images/categories/adults-only-cruises.jpg',
    icon: 'adults',
    highlights: [
      'No children on board',
      'Sophisticated entertainment',
      'Fine dining experiences',
      'Tranquil pool and spa areas'
    ],
    recommendedLines: ['Virgin Voyages', 'Viking', 'Seabourn', 'Azamara'],
    meta: {
      title: 'Adults Only Cruises | Child-Free Cruise Holidays',
      description: 'Book adults-only cruise holidays. Peaceful, sophisticated cruising without children. Expert advice from Limitless Cruises.'
    }
  },
  {
    id: 'uk-sailings',
    slug: 'uk-sailings',
    name: 'UK Sailings',
    tagline: 'No-fly cruising from home',
    description: 'Skip the airport hassle with cruises departing from UK ports. Southampton, Liverpool, and more - your holiday starts the moment you board.',
    image: '/images/categories/uk-sailings.jpg',
    icon: 'uk',
    highlights: [
      'No flights required',
      'Drive to the port',
      'Generous baggage allowances',
      'Avoid airport stress'
    ],
    recommendedLines: ['P&O Cruises', 'Fred. Olsen', 'Marella Cruises', 'MSC Cruises'],
    meta: {
      title: 'UK Sailings | No-Fly Cruises from Southampton & UK Ports',
      description: 'Book no-fly cruises from UK ports. Southampton, Liverpool and more. Expert cruise advice from Limitless Cruises.'
    }
  }
];

// Helper functions
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);

