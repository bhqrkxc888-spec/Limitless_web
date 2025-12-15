/**
 * Placeholder Offers Data
 * Used when Supabase offers aren't available yet
 * TODO: Remove this file once CMS offers are populated
 * 
 * These are example offers to demonstrate the UI.
 * Prices and availability are illustrative only.
 */

export const placeholderOffers = [
  {
    id: 'demo-1',
    slug: 'norwegian-fjords-summer-2025',
    title: 'Norwegian Fjords Summer 2025',
    short_description: 'Experience the dramatic beauty of Norway\'s fjords with this spectacular 10-night cruise from Southampton.',
    full_description: `<p>Sail through some of the world's most breathtaking scenery on this unforgettable Norwegian Fjords adventure. Departing from Southampton, you'll cruise past towering cliffs, cascading waterfalls, and picture-perfect villages.</p>
    <p>Highlights include:</p>
    <ul>
      <li>Scenic sailing through Geirangerfjord (UNESCO World Heritage Site)</li>
      <li>Visit to Bergen - gateway to the fjords</li>
      <li>Optional excursions to Flåm Railway and glaciers</li>
      <li>No flights required - sail from Southampton</li>
    </ul>`,
    price_from: 1299,
    price_was: 1599,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'P&O Cruises',
    ship_name: 'Arvia',
    destination: 'Norwegian Fjords',
    departure_port: 'Southampton',
    duration_nights: 10,
    departure_date: '2025-06-15',
    return_date: '2025-06-25',
    offer_type: 'cruise_only',
    cabin_type: 'Inside cabin',
    featured: true,
    featured_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    gallery_images: [],
    inclusions: ['All meals', 'Entertainment', 'Port calls', 'Service charges'],
    terms_conditions: 'Price based on two adults sharing an inside cabin. Subject to availability.',
    created_at: new Date().toISOString(),
    is_demo: true // Flag to identify demo data
  },
  {
    id: 'demo-2',
    slug: 'mediterranean-highlights-2025',
    title: 'Mediterranean Highlights Fly-Cruise',
    short_description: 'Discover the best of the Mediterranean with visits to Barcelona, Rome, and the French Riviera.',
    full_description: `<p>This 7-night fly-cruise takes you to the heart of the Mediterranean, visiting iconic destinations including Barcelona, Rome, and Nice.</p>
    <p>What's included:</p>
    <ul>
      <li>Return flights from major UK airports</li>
      <li>7 nights aboard MSC Virtuosa</li>
      <li>All meals and entertainment</li>
      <li>Visits to 5 stunning ports</li>
    </ul>`,
    price_from: 899,
    price_was: null,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'MSC Cruises',
    ship_name: 'MSC Virtuosa',
    destination: 'Mediterranean',
    departure_port: 'Barcelona',
    duration_nights: 7,
    departure_date: '2025-09-08',
    return_date: '2025-09-15',
    offer_type: 'fly_cruise',
    cabin_type: 'Balcony cabin',
    featured: true,
    featured_image: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800',
    gallery_images: [],
    inclusions: ['Flights', 'All meals', 'Entertainment', '24hr room service'],
    terms_conditions: 'Price based on two adults sharing a balcony cabin. Flights from London Gatwick.',
    created_at: new Date().toISOString(),
    is_demo: true
  },
  {
    id: 'demo-3',
    slug: 'caribbean-christmas-2025',
    title: 'Caribbean Christmas 2025',
    short_description: 'Escape the winter and spend Christmas in the Caribbean with this festive 14-night adventure.',
    full_description: `<p>Experience the magic of Christmas in the Caribbean! This 14-night cruise offers the perfect escape from the British winter, with warm weather, stunning beaches, and festive celebrations onboard.</p>
    <p>Ports of call include:</p>
    <ul>
      <li>St. Lucia - dramatic Piton mountains</li>
      <li>Barbados - beautiful beaches</li>
      <li>Antigua - historic English Harbour</li>
      <li>St. Maarten - Dutch Caribbean charm</li>
    </ul>`,
    price_from: 2499,
    price_was: 2899,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'Royal Caribbean',
    ship_name: 'Anthem of the Seas',
    destination: 'Caribbean',
    departure_port: 'Southampton',
    duration_nights: 14,
    departure_date: '2025-12-20',
    return_date: '2026-01-03',
    offer_type: 'cruise_only',
    cabin_type: 'Ocean view cabin',
    featured: true,
    featured_image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
    gallery_images: [],
    inclusions: ['All meals', 'Entertainment', 'Christmas & New Year celebrations', 'Port visits'],
    terms_conditions: 'Price based on two adults sharing an ocean view cabin. Festive sailings sell out quickly.',
    created_at: new Date().toISOString(),
    is_demo: true
  },
  {
    id: 'demo-4',
    slug: 'alaska-wilderness-2025',
    title: 'Alaska Wilderness Adventure',
    short_description: 'Witness glaciers, wildlife, and stunning natural beauty on this 7-night Alaskan cruise.',
    full_description: `<p>Holland America Line's Alaska expertise shines in this 7-night voyage through America's Last Frontier. Watch glaciers calve into the sea, spot whales and bears, and explore charming frontier towns.</p>`,
    price_from: 1899,
    price_was: null,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'Holland America Line',
    ship_name: 'Koningsdam',
    destination: 'Alaska',
    departure_port: 'Seattle',
    duration_nights: 7,
    departure_date: '2025-07-12',
    return_date: '2025-07-19',
    offer_type: 'fly_cruise',
    cabin_type: 'Verandah cabin',
    featured: false,
    featured_image: 'https://images.unsplash.com/photo-1531176175280-33e76ce12523?w=800',
    gallery_images: [],
    inclusions: ['Flights', 'All meals', 'Glacier cruising', 'Onboard enrichment'],
    terms_conditions: 'Price based on two adults sharing. Flights from London. Subject to availability.',
    created_at: new Date().toISOString(),
    is_demo: true
  },
  {
    id: 'demo-5',
    slug: 'canary-islands-winter-sun',
    title: 'Canary Islands Winter Sun',
    short_description: 'Escape the grey British winter with this 7-night no-fly cruise to the sunny Canary Islands.',
    full_description: `<p>When Britain is cold and grey, the Canary Islands offer guaranteed sunshine just a few days' sailing from Southampton. This relaxing cruise visits Tenerife, Gran Canaria, and more.</p>`,
    price_from: 699,
    price_was: 849,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'Fred. Olsen Cruise Lines',
    ship_name: 'Borealis',
    destination: 'Canary Islands',
    departure_port: 'Southampton',
    duration_nights: 7,
    departure_date: '2025-02-08',
    return_date: '2025-02-15',
    offer_type: 'cruise_only',
    cabin_type: 'Inside cabin',
    featured: false,
    featured_image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
    gallery_images: [],
    inclusions: ['All meals', 'Entertainment', 'Gratuities included', 'No single supplement (solo cabins)'],
    terms_conditions: 'Price based on two adults sharing. Solo cabins available at no single supplement.',
    created_at: new Date().toISOString(),
    is_demo: true
  },
  {
    id: 'demo-6',
    slug: 'adults-only-mediterranean',
    title: 'Adults-Only Mediterranean',
    short_description: 'Relax in style on this adults-only all-inclusive Mediterranean cruise with Marella.',
    full_description: `<p>For those seeking a sophisticated, peaceful cruise experience, Marella Voyager offers an adults-only atmosphere with all-inclusive drinks and gratuities. Explore the Mediterranean's finest ports without the crowds.</p>`,
    price_from: 1199,
    price_was: null,
    currency: 'GBP',
    price_per: 'person',
    price_valid_until: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    cruise_line: 'Marella Cruises',
    ship_name: 'Marella Voyager',
    destination: 'Mediterranean',
    departure_port: 'Palma',
    duration_nights: 7,
    departure_date: '2025-05-17',
    return_date: '2025-05-24',
    offer_type: 'fly_cruise',
    cabin_type: 'Balcony cabin',
    featured: false,
    featured_image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    gallery_images: [],
    inclusions: ['Flights', 'All-inclusive drinks', 'Gratuities', 'Entertainment'],
    terms_conditions: 'Price based on two adults sharing. Adults only (18+). All-inclusive drinks package included.',
    created_at: new Date().toISOString(),
    is_demo: true
  }
];

/**
 * Get placeholder offer by slug
 * @param {string} slug 
 * @returns {Object|null}
 */
export const getPlaceholderOfferBySlug = (slug) => 
  placeholderOffers.find(o => o.slug === slug) || null;

/**
 * Get featured placeholder offers
 * @returns {Array}
 */
export const getFeaturedPlaceholderOffers = () => 
  placeholderOffers.filter(o => o.featured);

