/**
 * Hard-coded offers
 * These offers are manually maintained and merged with database offers
 */

export const hardcodedOffers = [
  {
    // Unique ID for hard-coded offer
    id: 'hardcoded-canadian-maritimes-2026',
    slug: 'canadian-maritimes-country-inns-fly-drive-2026',
    
    // Basic Info
    title: 'Canadian Maritimes - Country Inns of the Maritimes',
    short_description: 'Explore the Canadian Maritimes with 14 nights in quaint country inns, including flights, car hire, and ferry crossings.',
    full_description: 'The Canadian Maritimes form a truly unique region with an abundance of wildlife and natural beauty with five national parks, each offering unique experiences. The best way to explore the region, meet local people and learn about their culture and traditions is by staying in small quaint country inns. This itinerary has been carefully curated to offer unique inns with their own character and history for a truly immersive experience.',
    
    // Offer Type & Category
    offer_type: 'fly_cruise', // Using fly_cruise as it's a fly-drive package
    destination: 'North America',
    
    // Provider Info
    cruise_line_name: 'Canadian Affair',
    cruise_line_id: null,
    ship_name: null,
    
    // Dates
    departure_date: '2026-06-02',
    sailing_date: '2026-06-02',
    return_date: '2026-06-16',
    
    // Duration
    duration_nights: 14,
    
    // Flight Details
    includes_flight: true,
    departure_airport: 'London Heathrow',
    airline: 'Air Canada',
    
    // Ports (not applicable for fly-drive)
    departure_port: null,
    
    // Pricing
    price_from: 2989,
    original_price: null,
    currency: 'GBP',
    price_basis: 'per_person',
    savings_percentage: null,
    savings_amount: null,
    deposit_amount: 599,
    
    // Additional costs
    airport_prices: [
      {
        airport: 'London Heathrow',
        price: 2989,
        supplement: 0
      },
      {
        airport: 'Regional UK Airports',
        price: 3089,
        supplement: 100
      }
    ],
    
    // Accommodation (fly-drive package)
    pre_stay_hotel_name: null,
    pre_stay_nights: null,
    post_stay_hotel_name: null,
    post_stay_nights: null,
    
    // Onboard Credit
    onboard_credit_amount: null,
    onboard_credit_currency: null,
    
    // Features & Highlights
    highlights: [
      '14 nights accommodation in Country Inns',
      '15 days intermediate car hire with fully inclusive insurance',
      'Bay Ferries from Digby to Saint John',
      'Northumberland Ferries from Wood Island to Caribou',
      'Easy to follow roadbook with pre-planned stops',
      'International flights in economy class'
    ],
    
    inclusions: [
      'International flights from the UK in economy class',
      '14 nights accommodation in Country Inns',
      '15 days intermediate car hire with fully inclusive insurance',
      'Bay Ferries from Digby to Saint John',
      'Northumberland Ferries from Wood Island to Caribou',
      'Easy to follow roadbook with pre-planned stops & things to do along the way'
    ],
    
    exclusions: [
      'Regional airport supplements (from £100pp)',
      'Travel insurance',
      'Meals not specified',
      'Personal expenses',
      'Optional excursions'
    ],
    
    // Special Notes
    special_notes: [
      'Prices based on 2 adults sharing',
      'Package available on selected dates',
      'Save 10% on all new bookings departing between 26th December 2026 and 31st October 2026. Book by 2nd February 2026, T&Cs apply.',
      'Receive a data bundle of up-to 5GB for each new booking departing between 26th December 2025 and 31st October 2027, book by 2nd February 2026, T&Cs apply.',
      'Deposit from £599pp',
      'Regional supplement from £100pp available'
    ],
    
    // Terms
    terms_and_conditions: 'Standard booking terms apply. Full payment required 10 weeks before departure. Cancellation charges apply. Subject to availability.',
    
    // Images
    card_image_url: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/CMS_offers/canada-self-drive-jan-26/618356302_1485325829776521_2868680358712505717_n.jpeg',
    hero_image_url: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/CMS_offers/canada-self-drive-jan-26/618356302_1485325829776521_2868680358712505717_n.jpeg',
    image_url: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/CMS_offers/canada-self-drive-jan-26/618356302_1485325829776521_2868680358712505717_n.jpeg',
    
    // Gallery images for article area
    gallery_images: [
      'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/CMS_offers/canada-self-drive-jan-26/618356302_1485325829776521_2868680358712505717_n.jpeg'
    ],
    
    // Status
    featured: true,
    published: true,
    
    // Metadata
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    
    // Additional metadata
    metadata: {
      is_hardcoded: true,
      source: 'manual',
      partner: 'Canadian Affair'
    }
  }
];

export default hardcodedOffers;
