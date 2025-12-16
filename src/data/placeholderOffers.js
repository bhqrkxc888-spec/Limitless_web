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
    original_price: 1599,
    savings_percentage: 19,
    savings_amount: 300,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'P&O Cruises',
    ship_name: 'Arvia',
    destination: 'Norwegian Fjords',
    departure_port: 'Southampton',
    duration_nights: 10,
    duration_days: 11,
    departure_date: '2025-06-15',
    return_date: '2025-06-25',
    offer_type: 'cruise_only',
    cabin_type: 'inside',
    category: 'mainstream',
    featured: true,
    hero_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800'
    ],
    includes: ['All meals onboard', 'Evening entertainment', 'Port calls at 5 destinations', 'Service charges'],
    excludes: ['Travel insurance', 'Shore excursions', 'Drinks packages'],
    highlights: [
      'Scenic sailing through UNESCO Geirangerfjord',
      'Visit to Bergen, gateway to the fjords',
      'No flying - sail from Southampton',
      'Multiple glacier viewing opportunities'
    ],
    itinerary_summary: 'Southampton → Bergen → Geiranger → Ålesund → Stavanger → Southampton',
    ports_of_call: ['Bergen', 'Geiranger', 'Ålesund', 'Stavanger'],
    suitable_for: ['Couples', 'Families', 'Photography Enthusiasts'],
    best_for: 'Nature lovers and scenic cruise seekers',
    regions: ['Norwegian Fjords', 'Northern Europe'],
    published_at: new Date().toISOString(),
    is_demo: true,
    // V2: Enhanced pricing fields
    solo_supplement: 450,
    deposit_amount: 150,
    onboard_credit_amount: 100,
    onboard_credit_currency: 'GBP'
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
    original_price: null,
    savings_percentage: null,
    savings_amount: null,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'MSC Cruises',
    ship_name: 'MSC Virtuosa',
    destination: 'Mediterranean',
    departure_port: 'Barcelona',
    departure_airport: 'London Gatwick',
    duration_nights: 7,
    duration_days: 8,
    departure_date: '2025-09-08',
    return_date: '2025-09-15',
    offer_type: 'fly_cruise',
    cabin_type: 'balcony',
    category: 'mainstream',
    featured: true,
    includes_flight: true,
    flight_class: 'economy',
    flight_direct: true,
    transfer_included: true,
    hero_image_url: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800'
    ],
    includes: ['Return flights', 'All meals onboard', 'Entertainment', '24hr room service', 'Airport transfers', '$200 onboard credit'],
    excludes: ['Travel insurance', 'Shore excursions', 'Specialty dining', 'Drinks packages'],
    highlights: [
      'Flights and transfers included',
      'Visit 5 Mediterranean ports',
      'Brand new MSC Virtuosa ship',
      'Balcony cabin for stunning views'
    ],
    itinerary_summary: 'Barcelona → Marseille → Genoa → Rome → Palma → Barcelona',
    ports_of_call: ['Barcelona', 'Marseille', 'Genoa', 'Rome (Civitavecchia)', 'Palma de Mallorca'],
    suitable_for: ['Couples', 'First-time Cruisers', 'Culture Lovers'],
    best_for: 'Mediterranean first-timers wanting to see the highlights',
    regions: ['Western Mediterranean', 'French Riviera', 'Italian Coast'],
    published_at: new Date().toISOString(),
    is_demo: true,
    // V2: Multi-airport pricing
    airport_prices: [
      { code: 'LGW', name: 'London Gatwick', price: 899, direct: true },
      { code: 'LHR', name: 'London Heathrow', price: 949, direct: true },
      { code: 'MAN', name: 'Manchester', price: 929, direct: false },
      { code: 'BHX', name: 'Birmingham', price: 959, direct: false },
      { code: 'EDI', name: 'Edinburgh', price: 979, direct: false }
    ],
    // V2: Enhanced pricing
    solo_supplement: 600,
    deposit_amount: 200,
    onboard_credit_amount: 200,
    onboard_credit_currency: 'USD'
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
    original_price: 2899,
    savings_percentage: 14,
    savings_amount: 400,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'Royal Caribbean',
    ship_name: 'Anthem of the Seas',
    destination: 'Caribbean',
    departure_port: 'Southampton',
    duration_nights: 14,
    duration_days: 15,
    departure_date: '2025-12-20',
    return_date: '2026-01-03',
    offer_type: 'cruise_only',
    cabin_type: 'ocean_view',
    category: 'mainstream',
    featured: true,
    hero_image_url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800'
    ],
    includes: ['All meals onboard', 'Evening entertainment', 'Christmas & New Year celebrations', 'Port visits', '$300 onboard credit'],
    excludes: ['Flights', 'Travel insurance', 'Shore excursions', 'Drinks packages'],
    highlights: [
      'Escape British winter for Caribbean sun',
      'Christmas Day onboard celebrations',
      'New Year\'s Eve party at sea',
      'No flying - sail from Southampton'
    ],
    itinerary_summary: 'Southampton → Barbados → St. Lucia → Antigua → St. Maarten → Southampton',
    ports_of_call: ['Barbados', 'St. Lucia', 'Antigua', 'St. Maarten'],
    suitable_for: ['Families', 'Couples', 'Groups'],
    best_for: 'Those wanting a festive Caribbean escape without flying',
    regions: ['Eastern Caribbean', 'Southern Caribbean'],
    published_at: new Date().toISOString(),
    is_demo: true,
    // V2: Enhanced pricing
    solo_supplement: 1200,
    deposit_amount: 300,
    onboard_credit_amount: 300,
    onboard_credit_currency: 'USD'
  },
  {
    id: 'demo-4',
    slug: 'alaska-wilderness-2025',
    title: 'Alaska Wilderness Adventure with Seattle Stay',
    short_description: 'Witness glaciers, wildlife, and stunning natural beauty on this 10-night package including 2 nights in Seattle.',
    full_description: `<p>Holland America Line's Alaska expertise shines in this incredible 10-night package. Start with 2 nights in vibrant Seattle, then embark on a 7-night voyage through America's Last Frontier. Watch glaciers calve into the sea, spot whales and bears, and explore charming frontier towns. After your cruise, enjoy a final night in Vancouver before flying home.</p>`,
    price_from: 2599,
    original_price: null,
    savings_percentage: null,
    savings_amount: null,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'Holland America Line',
    ship_name: 'Koningsdam',
    destination: 'Alaska',
    departure_port: 'Seattle',
    departure_airport: 'London Heathrow',
    duration_nights: 7,
    duration_days: 8,
    departure_date: '2025-07-12',
    return_date: '2025-07-22',
    offer_type: 'fly_cruise',
    cabin_type: 'balcony',
    category: 'premium',
    featured: false,
    includes_flight: true,
    flight_class: 'economy',
    flight_direct: false,
    transfer_included: true,
    hero_image_url: 'https://images.unsplash.com/photo-1531176175280-33e76ce12523?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1531176175280-33e76ce12523?w=800',
    gallery_images: [],
    includes: ['Flights', 'All meals onboard', 'Glacier cruising', 'Onboard naturalist talks', 'Airport transfers', '2 nights Seattle hotel', '1 night Vancouver hotel', '$150 onboard credit'],
    excludes: ['Travel insurance', 'Shore excursions', 'Drinks packages'],
    highlights: [
      'Glacier Bay National Park scenic cruising',
      'Wildlife spotting opportunities',
      'Expert onboard naturalists',
      'Premium Holland America service',
      '2 nights exploring Seattle',
      '1 night in beautiful Vancouver'
    ],
    itinerary_summary: 'Seattle (2 nights) → Cruise → Ketchikan → Juneau → Glacier Bay → Vancouver (1 night)',
    ports_of_call: ['Ketchikan', 'Juneau', 'Glacier Bay (scenic cruising)', 'Victoria', 'Vancouver'],
    suitable_for: ['Nature Lovers', 'Couples', 'Photography Enthusiasts'],
    best_for: 'Those seeking Alaska\'s natural wonders with premium service',
    regions: ['Alaska', 'Inside Passage', 'Pacific Northwest'],
    published_at: new Date().toISOString(),
    is_demo: true,
    // V2: Pre/Post Stay Accommodation
    pre_stay_hotel_name: 'Fairmont Olympic Hotel',
    pre_stay_hotel_stars: 5,
    pre_stay_nights: 2,
    pre_stay_location: 'Seattle',
    pre_stay_includes: ['breakfast', 'wifi'],
    post_stay_hotel_name: 'Pan Pacific Vancouver',
    post_stay_hotel_stars: 5,
    post_stay_nights: 1,
    post_stay_location: 'Vancouver',
    post_stay_includes: ['breakfast', 'transfers'],
    // V2: Multi-airport pricing
    airport_prices: [
      { code: 'LHR', name: 'London Heathrow', price: 2599, direct: false },
      { code: 'MAN', name: 'Manchester', price: 2699, direct: false },
      { code: 'GLA', name: 'Glasgow', price: 2749, direct: false }
    ],
    // V2: Enhanced pricing
    solo_supplement: 1500,
    deposit_amount: 350,
    onboard_credit_amount: 150,
    onboard_credit_currency: 'USD'
  },
  {
    id: 'demo-5',
    slug: 'canary-islands-winter-sun',
    title: 'Canary Islands Winter Sun',
    short_description: 'Escape the grey British winter with this 7-night no-fly cruise to the sunny Canary Islands.',
    full_description: `<p>When Britain is cold and grey, the Canary Islands offer guaranteed sunshine just a few days' sailing from Southampton. This relaxing cruise visits Tenerife, Gran Canaria, and more.</p>`,
    price_from: 699,
    original_price: 849,
    savings_percentage: 18,
    savings_amount: 150,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'Fred. Olsen Cruise Lines',
    ship_name: 'Borealis',
    destination: 'Canary Islands',
    departure_port: 'Southampton',
    duration_nights: 7,
    duration_days: 8,
    departure_date: '2025-02-08',
    return_date: '2025-02-15',
    offer_type: 'cruise_only',
    cabin_type: 'inside',
    category: 'mainstream',
    featured: false,
    hero_image_url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
    gallery_images: [],
    includes: ['All meals onboard', 'Entertainment', 'Gratuities', 'Tea & coffee throughout'],
    excludes: ['Travel insurance', 'Shore excursions', 'Drinks packages'],
    highlights: [
      'No flying required',
      'Gratuities included',
      'Winter sun escape',
      'Small ship intimate atmosphere'
    ],
    itinerary_summary: 'Southampton → Madeira → Tenerife → Gran Canaria → Lanzarote → Southampton',
    ports_of_call: ['Madeira', 'Tenerife', 'Gran Canaria', 'Lanzarote'],
    suitable_for: ['Solo Travellers', 'Couples', 'Mature Cruisers'],
    best_for: 'Budget-conscious winter sun seekers',
    regions: ['Canary Islands', 'Atlantic Islands'],
    published_at: new Date().toISOString(),
    is_demo: true
  },
  {
    id: 'demo-6',
    slug: 'adults-only-mediterranean',
    title: 'Adults-Only Mediterranean',
    short_description: 'Relax in style on this adults-only all-inclusive Mediterranean cruise with Marella.',
    full_description: `<p>For those seeking a sophisticated, peaceful cruise experience, Marella Voyager offers an adults-only atmosphere with all-inclusive drinks and gratuities. Explore the Mediterranean's finest ports without the crowds.</p>`,
    price_from: 1199,
    original_price: null,
    savings_percentage: null,
    savings_amount: null,
    currency: 'GBP',
    price_basis: 'per_person',
    cruise_line_name: 'Marella Cruises',
    ship_name: 'Marella Voyager',
    destination: 'Mediterranean',
    departure_port: 'Palma',
    departure_airport: 'Various UK',
    duration_nights: 7,
    duration_days: 8,
    departure_date: '2025-05-17',
    return_date: '2025-05-24',
    offer_type: 'fly_cruise',
    cabin_type: 'balcony',
    category: 'mainstream',
    featured: false,
    includes_flight: true,
    flight_class: 'Economy',
    transfer_included: true,
    hero_image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920',
    card_image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    gallery_images: [],
    includes: ['Flights', 'All-inclusive drinks', 'Gratuities', 'All meals onboard', 'Entertainment'],
    excludes: ['Travel insurance', 'Shore excursions', 'Spa treatments'],
    highlights: [
      'Adults-only (18+) atmosphere',
      'All-inclusive drinks package',
      'Gratuities included',
      'Smaller, more intimate ship'
    ],
    itinerary_summary: 'Palma → Cagliari → Naples → Rome → Marseille → Palma',
    ports_of_call: ['Palma de Mallorca', 'Cagliari', 'Naples', 'Rome (Civitavecchia)', 'Marseille'],
    suitable_for: ['Couples', 'Friends', 'Solo Travellers'],
    best_for: 'Adults seeking a relaxed, all-inclusive Mediterranean experience',
    regions: ['Western Mediterranean', 'Italian Coast'],
    published_at: new Date().toISOString(),
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
