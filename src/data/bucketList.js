/**
 * Bucket List Experiences Data
 * Once-in-a-lifetime cruise experiences
 */

export const bucketListExperiences = [
  {
    id: 'world-cruises',
    slug: 'world-cruises',
    title: 'World Cruises',
    tagline: '121-night global odyssey from Barcelona',
    description: '25+ countries, 40+ ports, 7 overnights. The ultimate bucket list voyage from the UK. Start with a short hop from the UK to Barcelona, then step aboard for a four-month journey around the globe. Sail from the Mediterranean to the Atlantic, cross to South America for Rio Carnival energy and tango nights in Buenos Aires, then round Cape Horn to the fjords of Chile. Continue across the Pacific via Easter Island and French Polynesia to New Zealand and Australia, before turning north through Asia and the Pacific islands towards North America. Transit the Panama Canal, island-hop through the Caribbean, then return across the Atlantic to Spain. Every leg layers on new cultures, landscapes, and once-in-a-lifetime experiences, all while returning each night to the comfort of your cabin, favourite restaurant and familiar crew. This is slow, immersive travel at its most indulgent.',
    // Images now loaded via getBucketListCard() and getBucketListHero() helpers (Supabase)
    heroImage: null,
    cardImage: null,
    duration: '121 nights (approx. January–May)',
    season: 'January–May',
    bestFor: ['Retirees', 'Semi-retired guests', 'Seasoned cruisers', 'Slow-travel couples', 'Flexible professionals'],
    highlights: [
      'Overnights in Rio de Janeiro and Buenos Aires with time to see Christ the Redeemer, Sugarloaf, tango shows and Pampas ranch country',
      'Visit remote Easter Island with its moai statues, then enjoy lagoon-framed days in French Polynesia',
      'Call at ports such as Auckland, Bay of Islands, Wellington, Sydney or Melbourne with harbour cruises and Maori culture',
      'Sample Asian megacities or island paradises (e.g. Japan, Bali, Hawaii)',
      'Daylight transit of the Panama Canal before ending with warm Caribbean ports',
      'Sail the full world cruise or choose one or more segments – contact us to discuss options and availability'
    ],
    includes: [
      'Return economy flights from a major UK airport to Barcelona and back (business class and regional departures also available)',
      '121 nights\' accommodation onboard with a range of accommodation options available',
      'Full-board dining in main restaurants and buffet, with most onboard entertainment and enrichment',
      'Port taxes and basic onboard gratuities',
      'A selection of included or optional shore excursions across the voyage'
    ],
    cruiseLines: ['MSC Cruises', 'Cunard', 'P&O Cruises', 'Princess Cruises', 'Oceania Cruises'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Barcelona (2hr15 direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Barcelona, Spain - Embark', 
        description: 'Arrive Barcelona, transfer to port, embark world cruise. Begin your 121-night global odyssey',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '2', 
        location: 'At Sea', 
        description: 'Relax and enjoy ship amenities, enrichment lectures, destination-focused entertainment'
      },
      { 
        day: '3', 
        location: 'Palma de Mallorca, Spain', 
        description: 'Palma - historic cathedral, Mediterranean charm, Spanish culture, beautiful beaches',
        coordinates: { lat: 39.5696, lon: 2.6502 }
      },
      { 
        day: '4', 
        location: 'At Sea', 
        description: 'Mediterranean sailing, onboard activities, formal evening'
      },
      { 
        day: '5', 
        location: 'Civitavecchia (Rome), Italy', 
        description: 'Civitavecchia - gateway to Rome, ancient history, Colosseum, Vatican City, Italian cuisine',
        coordinates: { lat: 42.0934, lon: 11.7964 }
      },
      { 
        day: '6-7', 
        location: 'At Sea', 
        description: 'Mediterranean crossing, enrichment programs, relaxation'
      },
      { 
        day: '8', 
        location: 'Las Palmas, Canary Islands', 
        description: 'Las Palmas - Atlantic gateway, Spanish culture, volcanic landscapes, Canarian cuisine',
        coordinates: { lat: 28.1248, lon: -15.4300 }
      },
      { 
        day: '9-12', 
        location: 'At Sea - Atlantic Crossing', 
        description: 'Atlantic crossing to South America, sea days, onboard entertainment'
      },
      { 
        day: '13', 
        location: 'Salvador, Brazil', 
        description: 'Salvador - colonial architecture, Afro-Brazilian culture, historic Pelourinho, Brazilian energy',
        coordinates: { lat: -12.9714, lon: -38.5014 }
      },
      { 
        day: '14', 
        location: 'At Sea', 
        description: 'Coastal sailing, Brazilian waters, onboard activities'
      },
      { 
        day: '15', 
        location: 'Rio de Janeiro, Brazil - Overnight', 
        description: 'Rio de Janeiro arrive - overnight stay, Christ the Redeemer, Sugarloaf Mountain, Copacabana Beach, iconic harbour, Carnival vibe',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '16', 
        location: 'Rio de Janeiro, Brazil', 
        description: 'Rio de Janeiro - second day, explore Ipanema, Tijuca Forest, samba culture, Brazilian cuisine',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '17', 
        location: 'At Sea', 
        description: 'Coastal sailing south, Brazilian coastline views'
      },
      { 
        day: '18', 
        location: 'Montevideo, Uruguay', 
        description: 'Montevideo - charming capital, colonial architecture, La Rambla waterfront, Uruguayan culture',
        coordinates: { lat: -34.9011, lon: -56.1645 }
      },
      { 
        day: '19', 
        location: 'Buenos Aires, Argentina - Overnight', 
        description: 'Buenos Aires arrive - overnight stay, tango shows, Recoleta Cemetery, steaks, Pampas culture, Argentine sophistication',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '20', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires - second day, San Telmo markets, La Boca, Iguazu Falls day trip option, tango immersion',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '21', 
        location: 'At Sea', 
        description: 'Sailing south, Patagonian waters approaching'
      },
      { 
        day: '22', 
        location: 'Puerto Madryn, Argentina', 
        description: 'Puerto Madryn - gateway to Peninsula Valdés, whale watching, penguin colonies, Patagonian wildlife',
        coordinates: { lat: -42.7692, lon: -65.0385 }
      },
      { 
        day: '23', 
        location: 'At Sea', 
        description: 'Patagonian sailing, approaching Cape Horn'
      },
      { 
        day: '24', 
        location: 'Ushuaia, Argentina', 
        description: 'Ushuaia - world\'s southernmost city, Tierra del Fuego, Beagle Channel, End of the World, dramatic landscapes',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '25', 
        location: 'Cape Horn (Scenic Cruising)', 
        description: 'Cape Horn - legendary passage, dramatic cliffs, historic significance, weather permitting'
      },
      { 
        day: '26', 
        location: 'At Sea - Chilean Fjords', 
        description: 'Chilean fjords scenic cruising, glaciers, rugged coastline, Patagonian wilderness'
      },
      { 
        day: '27', 
        location: 'Punta Arenas, Chile', 
        description: 'Punta Arenas - Magellan Strait, penguin colonies, Patagonian culture, gateway to Torres del Paine',
        coordinates: { lat: -53.1638, lon: -70.9171 }
      },
      { 
        day: '28-29', 
        location: 'At Sea - Chilean Coast', 
        description: 'Coastal sailing north, Chilean fjords, Pacific waters'
      },
      { 
        day: '30', 
        location: 'Valparaíso, Chile', 
        description: 'Valparaíso - colourful hillside city, UNESCO World Heritage, Chilean culture, gateway to Santiago',
        coordinates: { lat: -33.0472, lon: -71.6127 }
      },
      { 
        day: '31-33', 
        location: 'At Sea - Pacific Crossing', 
        description: 'Pacific crossing to Easter Island, longest sea days, onboard enrichment'
      },
      { 
        day: '34', 
        location: 'Easter Island (Rapa Nui), Chile', 
        description: 'Easter Island - moai statues, Rapa Nui culture, remote Pacific island, archaeological wonder, weather permitting',
        coordinates: { lat: -27.1127, lon: -109.3497 }
      },
      { 
        day: '35-38', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to French Polynesia, tropical waters approaching'
      },
      { 
        day: '39', 
        location: 'Papeete (Tahiti), French Polynesia - Overnight', 
        description: 'Papeete arrive - overnight stay, Tahitian culture, overwater bungalows, turquoise lagoons, French Polynesian paradise',
        coordinates: { lat: -17.5390, lon: -149.5688 }
      },
      { 
        day: '40', 
        location: 'Papeete (Tahiti), French Polynesia', 
        description: 'Tahiti - second day, explore Moorea, coral reefs, tropical paradise, Polynesian hospitality',
        coordinates: { lat: -17.5390, lon: -149.5688 }
      },
      { 
        day: '41', 
        location: 'Moorea, French Polynesia', 
        description: 'Moorea - stunning lagoon, volcanic peaks, overwater bungalows, snorkelling, tropical beauty',
        coordinates: { lat: -17.5388, lon: -149.8295 }
      },
      { 
        day: '42', 
        location: 'Bora Bora, French Polynesia', 
        description: 'Bora Bora - iconic overwater bungalows, Mount Otemanu, turquoise water, coral reefs, ultimate paradise',
        coordinates: { lat: -16.5004, lon: -151.7415 }
      },
      { 
        day: '43-45', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing towards New Zealand, Cook Islands region'
      },
      { 
        day: '46', 
        location: 'Rarotonga, Cook Islands', 
        description: 'Rarotonga - Polynesian culture, pristine beaches, tropical landscapes, South Pacific charm',
        coordinates: { lat: -21.2297, lon: -159.7747 }
      },
      { 
        day: '47-49', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to New Zealand, approaching Australasia'
      },
      { 
        day: '50', 
        location: 'Bay of Islands, New Zealand', 
        description: 'Bay of Islands - pristine beaches, dolphin watching, historic Waitangi, New Zealand beauty',
        coordinates: { lat: -35.2269, lon: 174.1617 }
      },
      { 
        day: '51', 
        location: 'Auckland, New Zealand', 
        description: 'Auckland - City of Sails, Sky Tower, harbour cruises, Maori culture, New Zealand gateway',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '52', 
        location: 'Tauranga, New Zealand', 
        description: 'Tauranga - Mount Maunganui, geothermal wonders, Kiwi culture, beautiful coastline',
        coordinates: { lat: -37.6878, lon: 176.1651 }
      },
      { 
        day: '53', 
        location: 'Wellington, New Zealand', 
        description: 'Wellington - capital city, Te Papa Museum, cable car, wind city, New Zealand culture',
        coordinates: { lat: -41.2865, lon: 174.7762 }
      },
      { 
        day: '54', 
        location: 'Dunedin, New Zealand', 
        description: 'Dunedin - Scottish heritage, Larnach Castle, Otago Peninsula, wildlife, New Zealand charm',
        coordinates: { lat: -45.8741, lon: 170.5036 }
      },
      { 
        day: '55-56', 
        location: 'At Sea - Tasman Sea', 
        description: 'Tasman Sea crossing to Australia, approaching Sydney'
      },
      { 
        day: '57', 
        location: 'Hobart, Tasmania, Australia', 
        description: 'Hobart - historic port, MONA museum, Tasmanian wilderness, Australian culture',
        coordinates: { lat: -42.8821, lon: 147.3272 }
      },
      { 
        day: '58', 
        location: 'At Sea', 
        description: 'Sailing to Sydney, Australian coastline'
      },
      { 
        day: '59', 
        location: 'Sydney, Australia - Overnight', 
        description: 'Sydney arrive - overnight stay, Opera House, Harbour Bridge, iconic skyline, harbour cruises, Australian culture',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '60', 
        location: 'Sydney, Australia', 
        description: 'Sydney - second day, Bondi Beach, Royal Botanic Gardens, Sydney Harbour, Australian lifestyle',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '61', 
        location: 'At Sea', 
        description: 'Sailing north, Pacific islands approaching'
      },
      { 
        day: '62', 
        location: 'Nouméa, New Caledonia', 
        description: 'Nouméa - French Pacific, colonial architecture, tropical beauty, Melanesian culture',
        coordinates: { lat: -22.2558, lon: 166.4509 }
      },
      { 
        day: '63', 
        location: 'At Sea', 
        description: 'Pacific sailing, tropical waters'
      },
      { 
        day: '64', 
        location: 'Port Vila, Vanuatu', 
        description: 'Port Vila - Melanesian culture, tropical paradise, blue holes, Pacific charm',
        coordinates: { lat: -17.7333, lon: 168.3167 }
      },
      { 
        day: '65', 
        location: 'At Sea', 
        description: 'Pacific sailing towards Hawaii'
      },
      { 
        day: '66', 
        location: 'Honolulu, Hawaii, USA', 
        description: 'Honolulu - Waikiki Beach, Pearl Harbor, Diamond Head, Hawaiian culture, Pacific gateway',
        coordinates: { lat: 21.3099, lon: -157.8581 }
      },
      { 
        day: '67', 
        location: 'Lahaina (Maui), Hawaii, USA', 
        description: 'Lahaina - historic whaling town, Maui beauty, Hawaiian culture, tropical paradise',
        coordinates: { lat: 20.8783, lon: -156.6825 }
      },
      { 
        day: '68-72', 
        location: 'At Sea - Pacific', 
        description: 'Pacific crossing to North America, longest sea days'
      },
      { 
        day: '73', 
        location: 'Los Angeles, California, USA', 
        description: 'Los Angeles - Hollywood, Beverly Hills, Santa Monica, West Coast USA, American culture',
        coordinates: { lat: 34.0522, lon: -118.2437 }
      },
      { 
        day: '74', 
        location: 'At Sea', 
        description: 'Coastal sailing, Mexican Riviera approaching'
      },
      { 
        day: '75', 
        location: 'Cabo San Lucas, Mexico', 
        description: 'Cabo San Lucas - Baja California, El Arco, Mexican Riviera, Pacific beauty',
        coordinates: { lat: 22.8905, lon: -109.9167 }
      },
      { 
        day: '76-78', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to Panama Canal'
      },
      { 
        day: '79', 
        location: 'Panama Canal (Full Transit)', 
        description: 'Panama Canal - full daylight transit, engineering marvel, Gatun Locks, Miraflores Locks, Pacific to Atlantic',
        coordinates: { lat: 9.0810, lon: -79.5937 }
      },
      { 
        day: '80', 
        location: 'At Sea - Caribbean', 
        description: 'Caribbean waters, tropical sailing'
      },
      { 
        day: '81', 
        location: 'Aruba', 
        description: 'Aruba - Dutch Caribbean, white sand beaches, turquoise water, Caribbean paradise',
        coordinates: { lat: 12.5211, lon: -70.0370 }
      },
      { 
        day: '82', 
        location: 'Curaçao', 
        description: 'Curaçao - colourful Dutch architecture, Caribbean charm, Willemstad UNESCO site',
        coordinates: { lat: 12.1696, lon: -68.9900 }
      },
      { 
        day: '83', 
        location: 'At Sea', 
        description: 'Caribbean sailing, tropical waters'
      },
      { 
        day: '84', 
        location: 'Barbados', 
        description: 'Barbados - British Caribbean, rum culture, beautiful beaches, Caribbean hospitality',
        coordinates: { lat: 13.1939, lon: -59.5432 }
      },
      { 
        day: '85', 
        location: 'St Maarten', 
        description: 'St Maarten - dual nation island, Maho Beach, Caribbean charm, duty-free shopping',
        coordinates: { lat: 18.0425, lon: -63.0548 }
      },
      { 
        day: '86-90', 
        location: 'At Sea - Atlantic Crossing', 
        description: 'Atlantic crossing to Europe, final sea days, world cruise gala events'
      },
      { 
        day: '91', 
        location: 'Lisbon, Portugal', 
        description: 'Lisbon - historic capital, Belem Tower, Portuguese culture, European return',
        coordinates: { lat: 38.7223, lon: -9.1393 }
      },
      { 
        day: '92', 
        location: 'At Sea', 
        description: 'Mediterranean approaching, final sea day'
      },
      { 
        day: '93', 
        location: 'Barcelona, Spain - Disembark', 
        description: 'Arrive Barcelona, disembark world cruise. Transfer to airport, fly Barcelona → LHR (2hr15 direct)',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      }
    ],
    destinations: [
      { name: 'Barcelona', description: 'Starting point - Europe\'s busiest cruise hub with Gaudi, beaches, and world-class tapas' },
      { name: 'Rio de Janeiro', description: 'Overnight stay - Christ the Redeemer, Sugarloaf Mountain, Copacabana, Carnival energy' },
      { name: 'Buenos Aires', description: 'Overnight stay - tango shows, Recoleta, steaks, Pampas culture, Argentine sophistication' },
      { name: 'Easter Island', description: 'Remote Pacific island - moai statues, Rapa Nui culture, archaeological wonder' },
      { name: 'French Polynesia', description: 'Tahiti, Moorea, Bora Bora - overwater bungalows, turquoise lagoons, tropical paradise' },
      { name: 'New Zealand', description: 'Bay of Islands, Auckland, Tauranga, Wellington - Maori culture, harbour cruises, wine regions' },
      { name: 'Sydney', description: 'Overnight stay - Opera House, Harbour Bridge, iconic skyline, Australian culture' },
      { name: 'Panama Canal', description: 'Full daylight transit - engineering marvel, Gatun Locks, Miraflores Locks' },
      { name: 'Caribbean', description: 'Aruba, Curaçao, Barbados, St Maarten - white sand beaches, turquoise water, Caribbean paradise' }
    ],
    testimonials: [
      { quote: 'Four months, five continents and we still weren\'t ready to get off. The sea days became our rhythm, and waking up to Rio, Sydney and the Panama Canal felt unreal.' },
      { quote: 'Booking through a specialist made the difference – cabin, dining and flight advice meant we got it right first time.' }
    ],
    faq: [
      {
        question: 'Can I book part of the world cruise instead of all 121 nights?',
        answer: 'Yes. The voyage can usually be broken into 2–3 longer "segments" (for example: Europe–South America, South America–Australasia, and Australasia–Europe). Each segment can be booked on its own, and you can combine two segments for a shorter "Grand Voyage". Contact us to discuss segment options and availability for your preferred dates.'
      },
      {
        question: 'What flights from the UK are included?',
        answer: 'Return economy flights between the UK and Barcelona are typically featured, usually from London, with regional departures also available. Premium economy or business-class options can be arranged for extra comfort on the outbound and inbound journeys.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available across different categories. Availability varies by sailing date and ship. Contact us to discuss your preferences and we\'ll recommend the best options for your journey based on current availability.'
      },
      {
        question: 'How are visas and entry requirements handled?',
        answer: 'World cruises can cross many borders. The cruise line provides detailed pre-departure guidance, and in some cases arranges "in-transit" or group visas on your behalf for selected ports. You may still need to apply for certain visas (for example for North America or specific Asian countries), and support is included when your booking is handled through a specialist.'
      },
      {
        question: 'How many excursions are included?',
        answer: 'Most world cruises include a set number of complimentary or specially-curated excursions in key ports (for example, iconic city tours, scenic drives or cultural experiences). Additional shore excursions, small-group tours and private guides can be added. Contact us to discuss excursion options and availability based on your interests.'
      },
      {
        question: 'Can I extend stays in overnight ports like Rio or Sydney?',
        answer: 'Yes. Overnight or multi-day calls in marquee ports are ideal for pre- or post-cruise hotel stays. Many guests add nights in places such as Rio, Buenos Aires, Sydney or Tokyo either before embarking or after disembarking a segment. These land-stays, plus transfers and tours, are easiest to arrange through a tailored package.'
      },
      {
        question: 'Is a world cruise suitable if I have mobility or health considerations?',
        answer: 'Most large ships have good accessibility, with lifts and priority boarding. That said, tender ports, uneven pavements and long flight times can be challenging. A world-cruise consultation will factor in your mobility, accommodation preferences, and excursion type so that the pace and comfort level are right for you. Contact us to discuss your specific needs.'
      },
      {
        question: 'What is the typical onboard atmosphere?',
        answer: 'Expect a relaxed but refined environment. Longer itineraries tend to attract experienced travellers, couples and solo guests rather than families with young children. There is usually a mix of formal or gala evenings, smart-casual nights, daytime enrichment lectures, language classes and destination-focused entertainment.'
      },
      {
        question: 'What additional options are available onboard?',
        answer: 'Most core elements (accommodation, meals, transport between countries) are covered upfront. Additional options include excursions, drinks packages, speciality dining, Wi-Fi and personal services such as spa treatments. Contact us to discuss what\'s included and what additional options are available based on your style of travel.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'World cruises and their key segments often sell out 18–24 months ahead, especially for popular dates. Early booking also gives access to stronger early-booking offers and more flexible options. Last-minute availability is possible but limited. Contact us to check current availability for your preferred dates.'
      }
    ],
    meta: {
      title: 'World Cruises | 121-Night Global Odyssey from Barcelona | Limitless Cruises',
      description: '121-night world cruise from Barcelona – 25+ countries, 40+ ports, 7 overnights including UK flights. Sail the full world cruise or choose segments. Expert booking advice from Limitless Cruises.',
      keywords: ['world cruise', 'round the world cruise', '121 night cruise', 'Barcelona world cruise', 'global odyssey', 'world voyage', 'extended cruise', 'circumnavigation']
    },
    images: [],
    featured: true,
    priority: 1
  },
  {
    id: 'antarctica',
    slug: 'antarctica-expeditions',
    title: 'Antarctica Expeditions',
    tagline: 'The ultimate bucket list: penguins, icebergs, and pristine wilderness',
    description: 'Direct from London to Buenos Aires\'s sophisticated tango culture—2 nights luxury immersion (Recoleta, steaks, jetlag buffer). Fly to Ushuaia, gateway to the White Continent—1 night Tierra del Fuego. Embark your 14-night expedition cruise: cross the legendary Drake Passage, daily Zodiac landings on the Antarctic Peninsula, thousands of penguins, whale breaches, towering icebergs, South Shetland Islands. Return Ushuaia, fly home via Buenos Aires. The ultimate once-in-a-lifetime journey. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '18-20 nights from UK',
    season: 'November - March (Antarctic summer, December-January peak for wildlife)',
    bestFor: ['Wildlife lovers', 'Adventure seekers', 'Photographers', 'Nature enthusiasts', 'Bucket list travellers', 'Couples'],
    highlights: [
      'Buenos Aires 2-night pre-cruise stay (tango, Recoleta, steaks)',
      'Ushuaia gateway city experience (Tierra del Fuego)',
      '14-night expedition cruise with expedition ship accommodation',
      'Daily Zodiac landings on pristine Antarctic shores',
      'Penguin colonies, whale breaches, towering icebergs',
      'Cross the legendary Drake Passage',
      'Expert naturalist guides and expedition team lectures'
    ],
    includes: [
      'Return flights LHR↔Buenos Aires (economy direct, 13-14hr BA)',
      'Domestic flights Buenos Aires↔Ushuaia (3hr, included)',
      '4-5 nights premium hotels (Buenos Aires luxury, Ushuaia gateway)',
      '14-night expedition cruise accommodation (Quark/Hurtigruten/Ponant/Silversea)',
      'All transfers between airports, hotels and cruise',
      'Zodiac excursions and shore landings',
      'Expedition parka and boots rental',
      'Expert naturalist guides and lectures',
      'All meals onboard (specialty dining on luxury lines)'
    ],
    cruiseLines: ['Quark Expeditions', 'Hurtigruten', 'Ponant', 'Silversea'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Buenos Aires EZE (13-14hr direct BA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Buenos Aires, Argentina', 
        description: 'Arrive Buenos Aires EZE, transfer to luxury hotel. Check-in, explore Recoleta, tango show, Argentine steaks',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '2', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires free day - San Telmo markets, La Boca, Palermo, cultural immersion, jetlag recovery',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '3', 
        location: 'Buenos Aires → Ushuaia', 
        description: 'Transfer to airport, fly Buenos Aires → Ushuaia (3hr domestic). Arrive Ushuaia, gateway to Antarctica. Check-in hotel',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '4', 
        location: 'Ushuaia - Embark cruise', 
        description: 'Ushuaia exploration - Tierra del Fuego National Park, penguin colonies nearby. Afternoon embark expedition ship',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '5-6', 
        location: 'Drake Passage', 
        description: 'Cross the legendary Drake Passage - expedition team lectures, seabird watching, prepare for Antarctica',
        coordinates: { lat: -60.0, lon: -65.0 }
      },
      { 
        day: '7', 
        location: 'South Shetland Islands', 
        description: 'First Antarctic landings - penguin rookeries, seal colonies, research stations, Zodiac cruising',
        coordinates: { lat: -62.0, lon: -58.0 }
      },
      { 
        day: '8-12', 
        location: 'Antarctic Peninsula', 
        description: 'Daily Zodiac landings - penguin colonies (Adélie, Chinstrap, Gentoo), whale watching, icebergs, pristine wilderness',
        coordinates: { lat: -64.0, lon: -62.0 }
      },
      { 
        day: '13', 
        location: 'Lemaire Channel', 
        description: 'Navigate stunning Lemaire Channel - narrow passage between towering icebergs, kayaking opportunities, photography paradise',
        coordinates: { lat: -65.1, lon: -64.0 }
      },
      { 
        day: '14-15', 
        location: 'Antarctic Peninsula continued', 
        description: 'More Zodiac landings - additional penguin colonies, whale breaches, seal encounters, expedition activities',
        coordinates: { lat: -64.0, lon: -62.0 }
      },
      { 
        day: '16-17', 
        location: 'Drake Passage return', 
        description: 'Cross Drake Passage northbound - reflect on adventure, final lectures, seabird watching, expedition recap',
        coordinates: { lat: -60.0, lon: -65.0 }
      },
      { 
        day: '18', 
        location: 'Ushuaia - Disembark', 
        description: 'Arrive Ushuaia, disembark expedition ship. Transfer to airport, fly Ushuaia → Buenos Aires',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '19', 
        location: 'Buenos Aires → London Heathrow', 
        description: 'Connect in Buenos Aires, depart EZE → LHR (13-14hr direct BA)',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '20', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Buenos Aires', description: 'Tango culture, Recoleta, Argentine steaks, sophisticated gateway city' },
      { name: 'Ushuaia', description: 'Gateway to Antarctica, Tierra del Fuego, penguin colonies nearby, expedition vibe' },
      { name: 'Antarctic Peninsula', description: 'Pristine wilderness, penguin colonies, whale breaches, towering icebergs, Zodiac landings' },
      { name: 'South Shetland Islands', description: 'Penguin rookeries, seal colonies, research stations, first Antarctic encounters' }
    ],
    testimonials: [
      { quote: 'Buenos Aires start was perfect—tango and steaks before the adventure. Antarctica itself was beyond words—penguins everywhere!', author: 'Sarah K.', location: 'Manchester' },
      { quote: 'The expedition team made every landing special. Crossing the Drake was an adventure in itself. Truly once-in-a-lifetime.', author: 'Robert & Jane', location: 'Edinburgh' },
      { quote: 'Worth every penny. The Zodiac landings, the silence, the wildlife—nothing compares to Antarctica.', author: 'David', location: 'London' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Buenos Aires (13-14hr) and return flights are featured. Business class lie-flat seats are also available. Domestic flights Buenos Aires↔Ushuaia (3hr) are also featured.'
      },
      {
        question: 'Can I extend my stay in Buenos Aires?',
        answer: 'Absolutely! Extended stays in Buenos Aires can be arranged. Perfect for deeper cultural immersion, Iguazu Falls add-on, or Patagonia extension. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of expedition accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'When is the best time to visit Antarctica?',
        answer: 'November to March is Antarctic summer. November: penguin courtship, pristine ice. December-January: peak wildlife, penguin chicks, long daylight. February-March: whale watching peak, penguin fledglings. December-January offers the most activity and best weather.'
      },
      {
        question: 'How rough is the Drake Passage?',
        answer: 'The Drake Passage can be rough, but modern expedition ships are well-equipped with stabilizers. Many crossings are surprisingly calm ("Drake Lake"). Motion sickness medication is recommended. The crossing is part of the adventure—expedition team lectures and seabird watching help pass the time.'
      },
      {
        question: 'Do I need special clothing?',
        answer: 'Expedition cruises provide parkas and boots. You\'ll need warm base layers, waterproof trousers, gloves, and hats. A detailed packing list will be provided. No need to buy expensive gear—the expedition parka is yours to keep!'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Quark Expeditions (Ultra ships, adventure focus), Hurtigruten (MS Fridtjof Nansen, hybrid power), Ponant (Le Commandant Charcot, luxury icebreaker), and Silversea (Silver Endeavour, ultra-luxury). All offer expert naturalist guides, Zodiac landings, and expedition experiences.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at luxury Buenos Aires hotel (Recoleta or Palermo area) and 1 night at Ushuaia gateway hotel. Both include breakfast. Hotels are centrally located for easy exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are Zodiac landings safe?',
        answer: 'Yes—Zodiac landings are conducted by expert expedition teams with extensive polar experience. Safety briefings are mandatory. Life jackets are provided. Landings are weather-dependent and conducted in small groups with guides. All passengers receive comprehensive safety training.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this once-in-a-lifetime journey.'
      }
    ],
    meta: {
      title: 'Antarctica Expeditions Bucket List Journey from UK | Limitless Cruises',
      description: 'Antarctica expedition cruise from UK 2026. Buenos Aires to Ushuaia to White Continent. 14-night expedition with flights included. Penguin colonies, Zodiac landings, Drake Passage. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['antarctica cruise from uk', 'antarctica expedition 2026', 'antarctica bucket list', 'drake passage cruise', 'antarctic peninsula cruise', 'penguin cruise from uk', 'antarctica with flights']
    },
    images: [],
    featured: true,
    priority: 2
  },
  {
    id: 'japan-asia',
    slug: 'japan-asia-cruises',
    title: 'Japan & Asia',
    tagline: 'Tokyo temples to Singapore skyline via bucket list ports',
    description: 'Direct from London to Tokyo\'s neon pulse—2 nights luxury immersion (sushi omakase, Shibuya Crossing, Meiji Shrine). Embark your 12‑night Asia odyssey: Busan\'s temples, Kagoshima volcanoes, Okinawa beaches, Taipei night markets, Hong Kong harbour lights, Shanghai Bund, arriving Singapore triumphant. 2 nights Marina Bay Sands finale—Infinity Pool, Gardens by the Bay. Open‑jaw genius. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'March - November (cherry blossom peak: March-April)',
    bestFor: ['Culture lovers', 'Food adventurers', 'City explorers', 'Photography enthusiasts', 'Luxury travellers', 'Couples'],
    highlights: [
      'Tokyo 2-night cultural immersion (Park Hyatt or similar)',
      '12-night Asia cruise (Celebrity/HAL/Ponant)',
      'Hong Kong harbour night cruise',
      'Singapore rooftop infinity pool at Marina Bay Sands',
      'Port-rich Bucket List Itinerary: Tokyo → Busan → Kagoshima → Okinawa → Taipei → Hong Kong → Shanghai → Singapore',
      'Open-jaw flights: LHR→Tokyo / Singapore→LHR direct'
    ],
    includes: [
      'Return flights LHR↔Tokyo/Singapore (economy direct, 12hr/13hr)',
      '5 nights 5-star hotels (Park Hyatt Tokyo, Marina Bay Sands Singapore)',
      '12-night cruise (Celebrity Millennium/HAL Westerdam/Ponant Le Laperouse)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'Extendable stays: Tokyo and Singapore available'
    ],
    cruiseLines: ['Celebrity Cruises', 'Holland America Line', 'Ponant'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Tokyo NRT (12hr direct JAL/ANA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Tokyo, Japan', 
        description: 'Arrive Tokyo NRT, transfer to luxury hotel (Park Hyatt or similar). Check-in, explore Shibuya Crossing, Meiji Shrine',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '2', 
        location: 'Tokyo, Japan', 
        description: 'Tokyo free day - sushi omakase, Tsukiji market, traditional ryokan experience, Mount Fuji views',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '3', 
        location: 'Tokyo - Embark cruise', 
        description: 'Transfer to port, embark 12-night Asia cruise. Set sail for Busan',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '4', 
        location: 'Busan, South Korea', 
        description: 'Busan - Haeundae Beach, Gamcheon Culture Village, Jagalchi Fish Market, temples',
        coordinates: { lat: 35.1796, lon: 129.0756 }
      },
      { 
        day: '5', 
        location: 'At sea', 
        description: 'Relax onboard, cultural enrichment programs, Asian cuisine demonstrations'
      },
      { 
        day: '6', 
        location: 'Kagoshima, Japan', 
        description: 'Kagoshima - active Sakurajima volcano views, Sengan-en Garden, samurai history',
        coordinates: { lat: 31.5968, lon: 130.5571 }
      },
      { 
        day: '7', 
        location: 'Okinawa (Naha), Japan', 
        description: 'Okinawa - pristine beaches, Shuri Castle, traditional Ryukyuan culture, crystal-clear waters',
        coordinates: { lat: 26.2124, lon: 127.6809 }
      },
      { 
        day: '8', 
        location: 'Taipei, Taiwan', 
        description: 'Taipei - night markets, Taipei 101 skyscraper, traditional temples, street food',
        coordinates: { lat: 25.0330, lon: 121.5654 }
      },
      { 
        day: '9', 
        location: 'Hong Kong', 
        description: 'Hong Kong - Victoria Peak, Star Ferry, harbour lights, dim sum, Temple Street Night Market',
        coordinates: { lat: 22.3964, lon: 114.1095 }
      },
      { 
        day: '10', 
        location: 'Shanghai, China', 
        description: 'Shanghai - The Bund, Yu Garden, French Concession, modern skyline, traditional markets',
        coordinates: { lat: 31.2304, lon: 121.4737 }
      },
      { 
        day: '11', 
        location: 'At sea', 
        description: 'Final sea day, prepare for Singapore arrival, onboard activities'
      },
      { 
        day: '12', 
        location: 'Singapore - Disembark', 
        description: 'Arrive Singapore, disembark cruise. Transfer to Marina Bay Sands (2 nights)',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '13', 
        location: 'Singapore', 
        description: 'Singapore - Marina Bay Sands Infinity Pool, Gardens by the Bay, hawker centres, Orchard Road',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '14', 
        location: 'Singapore', 
        description: 'Singapore free day - explore Little India, Chinatown, Sentosa Island, rooftop bars',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '15', 
        location: 'Singapore → London Heathrow', 
        description: 'Transfer to Singapore Changi Airport, depart SIN → LHR (13hr direct)',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '16', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Tokyo', description: 'Shibuya, Tsukiji, ryokan stay, Mount Fuji backdrop, neon pulse' },
      { name: 'Busan', description: 'Haeundae Beach, Gamcheon Culture Village, Jagalchi Fish Market' },
      { name: 'Hong Kong', description: 'Victoria Peak, Star Ferry, harbour lights, dim sum culture' },
      { name: 'Singapore', description: 'Marina Bay Sands, Gardens by the Bay, hawker centres, infinity pool' }
    ],
    testimonials: [
      { quote: 'Tokyo start, Singapore end—perfect flow! The open-jaw flights made it seamless.', author: 'Emma', location: 'London' },
      { quote: 'The views of Hong Kong harbour were priceless. The whole itinerary was bucket list perfection.', author: 'Raj', location: 'Manchester' },
      { quote: 'Marina Bay Sands infinity pool was the perfect finale. Every port was incredible.', author: 'Sarah', location: 'Birmingham' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Tokyo (12hr) and Singapore→LHR (13hr) economy flights are featured. Business class lie-flat seats are also available. The open-jaw pattern means no backtracking—fly into Tokyo, out of Singapore.'
      },
      {
        question: 'Can I extend my stay in Tokyo or Singapore?',
        answer: 'Absolutely! Extended stays in Tokyo or Singapore can be arranged. Perfect for deeper cultural immersion or business class options. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available across different categories. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'Do I need visas?',
        answer: 'Japan offers visa-free entry for UK citizens (up to 90 days). China requires a group visa for cruise passengers (arranged by cruise line). Singapore is visa-free for UK citizens. Taiwan and Hong Kong are visa-free. Your cruise line will handle China group visa processing.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Celebrity Millennium (Asia Grand itinerary), Holland America Line Westerdam (Asia Explorer), and Ponant Le Laperouse (Japan intensive). Celebrity and HAL are larger ships with extensive amenities; Ponant is smaller luxury with French flair. Contact us to check which ships and dates are available for your preferred itinerary.'
      },
      {
        question: 'When is the best time to go?',
        answer: 'March-April for cherry blossoms in Japan (peak viewing). May-June for pleasant weather. July-August can be hot and humid. September-November offers cooler temperatures and autumn colours. All months offer excellent cruising conditions.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at Park Hyatt Tokyo (or similar 5-star) and 2 nights at Marina Bay Sands Singapore. Both include breakfast. Hotels are centrally located for easy exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are featured. Private transfers also available. No need to navigate public transport with luggage.'
      },
      {
        question: 'What about meals?',
        answer: 'Hotel breakfasts included. Cruise includes all meals (main dining, buffet, specialty restaurants on Celebrity/HAL). Onboard Asian cuisine demonstrations and cultural enrichment programs. Port stops offer incredible street food and local dining—your cruise line can arrange restaurant reservations.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure.'
      }
    ],
    meta: {
      title: 'Japan & Asia Bucket List Journey from UK | Limitless Cruises',
      description: 'Japan Asia cruise from UK 2026. Tokyo to Singapore open-jaw bucket list itinerary with flights included. 12-night cruise, 5-star hotels, ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['japan cruise from uk 2026', 'tokyo singapore open jaw cruise', 'asia bucket list itinerary flights included', 'japan asia cruise package', 'tokyo to singapore cruise', 'asia cruise with flights from uk', 'japan cherry blossom cruise']
    },
    images: [
      null,
      null, // Japan-mtfuji - Upload to Vercel
      null
    ],
    featured: true,
    priority: 3
  },
  {
    id: 'rocky-mountaineer-alaska',
    slug: 'rocky-mountaineer-alaska',
    title: 'Rocky Mountaineer & Alaska',
    tagline: 'Scenic Voyager rail through Banff\'s peaks + Inside Passage Bucket List cruise',
    description: 'Land direct from London into Calgary\'s mountain air, 90 minutes to Fairmont Banff Springs for 2 indulgent nights amid turquoise lakes. Board Rocky Mountaineer Scenic Voyager for 2 days glass-dome luxury—gourmet meals, endless peaks, Kamloops overnight. Vancouver city vibes, then 7-night Inside Passage Bucket List Itinerary cruise with HAL, Princess or Celebrity. Grizzlies in Juneau, Glacier Bay calvings, Sitka totems. Final Vancouver night before home. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'May - September (July peak for wildlife)',
    bestFor: ['Rail enthusiasts', 'Scenic travelers', 'Nature lovers', 'Adventure seekers', 'Couples', 'Families'],
    highlights: [
      'Rocky Mountaineer Scenic Voyager SilverLeaf dome car experience',
      '2 nights Fairmont Banff Springs luxury resort',
      '7-night Inside Passage cruise',
      'Wildlife viewing - grizzlies, whales, eagles',
      'Glacier Bay National Park calving icebergs',
      'Extendable Banff/Vancouver stays available'
    ],
    includes: [
      'Return flights LHR↔Calgary/Vancouver (economy direct, 9hr/10hr)',
      '6 nights premium hotels (Fairmont Banff Springs, Fairmont Vancouver)',
      'Rocky Mountaineer Scenic Voyager SilverLeaf service (meals included)',
      '7-night Inside Passage cruise (HAL Nieuw Amsterdam/Princess Ruby Princess/Celebrity Solstice)',
      'All transfers between airports, hotels, train and cruise',
      'Scenic dome car access on Rocky Mountaineer'
    ],
    cruiseLines: ['Holland America Line', 'Princess Cruises', 'Celebrity Cruises'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Calgary (9hr direct Air Canada/BA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Calgary → Banff (Fairmont Banff Springs)', 
        description: 'YYC arrival, transfer to Fairmont Banff Springs (2 nights). Arrive in mountain air, check into luxury resort',
        coordinates: { lat: 51.1784, lon: -115.5708 }
      },
      { 
        day: '2', 
        location: 'Banff - Lake Louise', 
        description: 'Lake Louise day trip, Bow Valley hikes, turquoise lakes and mountain vistas',
        coordinates: { lat: 51.4254, lon: -116.1773 }
      },
      { 
        day: '3', 
        location: 'Banff - Free exploration', 
        description: 'Banff free day / Moraine Lake, Johnston Canyon, gondola rides, wildlife viewing',
        coordinates: { lat: 51.1784, lon: -115.5708 }
      },
      { 
        day: '4', 
        location: 'Rocky Mountaineer Scenic Voyager → Kamloops', 
        description: 'Board Scenic Voyager train to Kamloops (overnight train) - glass-dome luxury, gourmet meals, bear spotting',
        coordinates: { lat: 50.6745, lon: -120.3272 }
      },
      { 
        day: '5', 
        location: 'Train → Vancouver', 
        description: 'Scenic Voyager continues to Vancouver, check-in Fairmont Vancouver (1 night)',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '6', 
        location: 'Vancouver', 
        description: 'Vancouver exploration - Seawall, Granville Island, Stanley Park, city vibes',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '7', 
        location: 'Vancouver - Embark cruise', 
        description: 'Embark 7-night Inside Passage cruise (HAL Nieuw Amsterdam/Princess Ruby Princess/Celebrity Solstice)',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '8', 
        location: 'Ketchikan, Alaska', 
        description: 'Ketchikan - totem poles, native culture, salmon capital, eagle viewing',
        coordinates: { lat: 55.3422, lon: -131.6461 }
      },
      { 
        day: '9', 
        location: 'Juneau, Alaska', 
        description: 'Juneau - Mendenhall Glacier, whale watching, Alaska\'s capital, gold rush history',
        coordinates: { lat: 58.3019, lon: -134.4197 }
      },
      { 
        day: '10', 
        location: 'Skagway, Alaska', 
        description: 'Skagway - gold rush history, White Pass Railway, Klondike heritage',
        coordinates: { lat: 59.4583, lon: -135.3089 }
      },
      { 
        day: '11', 
        location: 'Glacier Bay National Park', 
        description: 'Glacier Bay - calving icebergs, seals, tidewater glaciers, UNESCO World Heritage site',
        coordinates: { lat: 58.2232, lon: -136.1075 }
      },
      { 
        day: '12', 
        location: 'Sitka, Alaska', 
        description: 'Sitka - eagles, Russian heritage, native culture, wildlife viewing',
        coordinates: { lat: 57.0531, lon: -135.3300 }
      },
      { 
        day: '13', 
        location: 'At sea', 
        description: 'Sea day - scenic cruising Inside Passage, relax and enjoy ship amenities',
        coordinates: null
      },
      { 
        day: '14', 
        location: 'Victoria, BC', 
        description: 'Victoria - Butchart Gardens, British charm, afternoon tea, coastal beauty',
        coordinates: { lat: 48.4284, lon: -123.3656 }
      },
      { 
        day: '15', 
        location: 'Vancouver - Disembark', 
        description: 'Disembark cruise, final night at Fairmont Vancouver',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '16', 
        location: 'Vancouver → London Heathrow', 
        description: 'YVR → LHR return flight (10hr direct), journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { 
        name: 'Banff National Park', 
        description: 'Fairmont luxury, Lake Louise, Johnston Canyon, turquoise lakes and mountain vistas' 
      },
      { 
        name: 'Scenic Voyager Rail', 
        description: 'SilverLeaf domes, chef cuisine, bear spotting, glass-dome luxury through Canadian Rockies' 
      },
      { 
        name: 'Glacier Bay & Juneau', 
        description: 'UNESCO ice formations, whales, gold rush history, Mendenhall Glacier' 
      },
      { 
        name: 'Vancouver', 
        description: 'Seawall, Granville Island, Stanley Park, vibrant harbour city' 
      }
    ],
    testimonials: [
      { 
        quote: 'Open-jaw genius—more Banff time. Scenic Voyager magic! The train journey was breathtaking, and Alaska was the perfect complement.', 
        author: 'James', 
        location: 'Surrey' 
      },
      { 
        quote: 'Perfect bucket list. Quote made it ours. Two amazing experiences in one trip!', 
        author: 'Claire', 
        location: 'Edinburgh' 
      },
      { 
        quote: 'Train + cruise = dream. Glacier Bay was absolutely spectacular.', 
        author: 'Thompson Family', 
        location: 'London' 
      }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes, LHR→Calgary/Vancouver→LHR direct economy flights are featured (9hr outbound, 10hr return). Business class options also available - get a personalised quote.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship and sailing date. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'Can I extend my stay?',
        answer: 'Yes—Banff and Vancouver extensions can be arranged. Customise your journey with additional nights - get a personalised quote.'
      },
      {
        question: 'What fitness level is required?',
        answer: 'Moderate fitness level is sufficient. The train has level access, and Banff offers moderate walks with lifts available. Most activities can be adapted to comfort levels.'
      },
      {
        question: 'What visas are needed?',
        answer: 'UK citizens need a Canada eTA (Electronic Travel Authorization) which costs approximately £10 and can be obtained online before travel. US visas are not required for this closed-loop cruise itinerary.'
      },
      {
        question: 'When is the best time to go?',
        answer: 'July offers peak wildlife viewing opportunities with warm weather. May and September provide good value. Contact us to check current availability for 2026 dates - limited spaces available.'
      },
      {
        question: 'Is this suitable for solo travellers?',
        answer: 'Yes, solo travellers are welcome. Solo traveller options are available. Some cruise lines offer dedicated solo traveller events and dining options. Contact us to check current availability and options for solo travellers.'
      },
      {
        question: 'Which cruise lines and 2026 dates?',
        answer: 'Holland America Line (Nieuw Amsterdam), Princess Cruises (Ruby Princess), and Celebrity Cruises (Solstice) offer weekly departures May through September 2026. Get a personalised quote for specific dates and availability.'
      },
      {
        question: 'What is the Rocky Mountaineer Scenic Voyager?',
        answer: 'The Scenic Voyager is Rocky Mountaineer\'s SilverLeaf service featuring glass-dome cars for panoramic views, gourmet chef-prepared meals, and overnight accommodation in Kamloops. The train operates during daylight hours for maximum scenic viewing through the Canadian Rockies.'
      },
      {
        question: 'What additional options are available?',
        answer: 'Additional options include: Business class flights, Rocky Mountaineer GoldLeaf service with outdoor viewing platform, premium accommodation upgrades, Banff helicopter tours and premium excursions. Contact us to discuss available options and tailor your experience to your preferences.'
      }
    ],
    meta: {
      title: 'Rocky Mountaineer & Alaska Bucket List Journey from UK | Limitless Cruises',
      description: 'Rocky Mountaineer Alaska cruise from UK 2026. Scenic Voyager rail through Banff + Inside Passage bucket list cruise package with flights included. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['rocky mountaineer cruise', 'alaska train cruise from uk', 'rocky mountaineer alaska 2026', 'canada alaska cruise package', 'scenic voyager banff', 'rail and cruise from uk', 'rocky mountaineer bucket list', 'alaska cruise with flights uk']
    },
    images: [],
    featured: true,
    priority: 4
  },
  {
    id: 'galapagos',
    slug: 'galapagos-expeditions',
    title: 'Galápagos Islands',
    tagline: 'Darwin\'s living laboratory – Quito culture to Galápagos wildlife',
    description: 'Direct to Quito\'s Andean heights for 2 nights acclimatisation (Mitad del Mundo equator, UNESCO Old Town). Fly to Baltra, board your intimate expedition ship for 7 nights Western Galápagos immersion: snorkel with hammerheads at Fernandina, track tortoises on Isabela, witness booby mating dances on Española. Final night Puerto Ayora tortoise sanctuary. Open‑jaw perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '10 nights from UK',
    season: 'Year-round (peak June - November for wildlife activity)',
    bestFor: ['Wildlife families', 'Snorkelers', 'Nature photographers', 'Eco-luxury seekers', 'Adventure seekers', 'Couples'],
    highlights: [
      'Quito 2-night acclimatisation (JW Marriott, altitude preparation)',
      '7-night expedition cruise (16 guests max, intimate wildlife viewing)',
      'Daily Zodiac landings and snorkel excursions',
      'Giant tortoise tracking on Isabela Island',
      'Hammerhead shark snorkel at Fernandina',
      'Blue-footed booby courtship dances on Española',
      'Open-jaw flights: LHR→Quito / Puerto Ayora→LHR'
    ],
    includes: [
      'Return flights LHR↔Quito/Puerto Ayora (economy, 12hr via US)',
      '4 nights premium hotels (JW Marriott Quito, Puerto Ayora)',
      '7-night expedition cruise (Celebrity Flora/Silversea Silver Origin/Hurtigruten Fram/Quasar Evolution)',
      'All Zodiac landings, snorkel gear, wetsuits',
      'Naturalist guides (Galápagos National Park certified)',
      'Galápagos transit card and national park fees',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Quito and Puerto Ayora available'
    ],
    cruiseLines: ['Celebrity Cruises', 'Silversea', 'Hurtigruten', 'Quasar Expeditions'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Quito UIO (12hr via Miami/US connection)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Quito, Ecuador', 
        description: 'Arrive Quito, transfer to JW Marriott. Check-in, altitude acclimatisation, explore UNESCO Old Town',
        coordinates: { lat: -0.2202, lon: -78.5123 }
      },
      { 
        day: '2', 
        location: 'Quito, Ecuador', 
        description: 'Quito free day - Mitad del Mundo equator monument, colonial architecture, Andean culture, continue acclimatisation',
        coordinates: { lat: -0.2202, lon: -78.5123 }
      },
      { 
        day: '3', 
        location: 'Quito → Baltra Airport - Embark', 
        description: 'Transfer to airport, fly Quito → Baltra Airport (2hr domestic). Arrive Baltra, transfer to port, embark expedition ship',
        coordinates: { lat: -0.4531, lon: -90.5947 }
      },
      { 
        day: '4', 
        location: 'Santa Cruz Island', 
        description: 'Santa Cruz - Charles Darwin Research Station, giant tortoise sanctuary, lava tunnels, snorkel with sea lions',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      },
      { 
        day: '5', 
        location: 'Santiago Island', 
        description: 'Santiago - fur seals, lava lizards, marine iguanas, snorkel opportunities, volcanic landscapes',
        coordinates: { lat: -0.2289, lon: -90.9979 }
      },
      { 
        day: '6', 
        location: 'Isabela Island', 
        description: 'Isabela - world\'s largest tortoises in wild, flamingos, volcanic craters, giant tortoise tracking, endemic wildlife',
        coordinates: { lat: -0.9579, lon: -91.0000 }
      },
      { 
        day: '7', 
        location: 'Fernandina Island', 
        description: 'Fernandina - youngest island, marine iguana paradise, flightless cormorants, hammerhead shark snorkel, pristine wilderness',
        coordinates: { lat: -0.2807, lon: -91.6678 }
      },
      { 
        day: '8', 
        location: 'Española Island', 
        description: 'Española - albatross breeding ground, blue-footed booby courtship dances, blowholes, waved albatross, endemic species',
        coordinates: { lat: -1.3703, lon: -89.6049 }
      },
      { 
        day: '9', 
        location: 'Puerto Ayora, Santa Cruz', 
        description: 'Disembark expedition ship, transfer to Puerto Ayora hotel (1 night). Charles Darwin Station visit, tortoise reserve, final wildlife encounters',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      },
      { 
        day: '10', 
        location: 'Puerto Ayora → Quito → London Heathrow', 
        description: 'Transfer to Baltra Airport, fly Puerto Ayora → Quito → LHR (via US connection)',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      }
    ],
    destinations: [
      { name: 'Quito, Ecuador', description: 'Equator monument, colonial charm, UNESCO Old Town, Andean culture, altitude acclimatisation' },
      { name: 'Santa Cruz Island', description: 'Charles Darwin Research Station, lava tunnels, giant tortoise sanctuary, Puerto Ayora' },
      { name: 'Isabela Island', description: 'World\'s largest tortoises, volcanoes, flamingos, giant tortoise tracking, endemic wildlife' },
      { name: 'Fernandina Island', description: 'Youngest island, marine iguana paradise, hammerhead snorkel, flightless cormorants' }
    ],
    testimonials: [
      { quote: 'Tortoises feet away—Quito perfect intro. The 2-night stay helped with altitude, and the wildlife encounters were beyond words.', author: 'Wildlife family', location: 'Manchester' },
      { quote: 'Hammerheads snorkel = bucket list forever. The small ship made every landing intimate and special.', author: 'Dive couple', location: 'London' },
      { quote: 'Our kids were amazed by the blue-footed boobies. The naturalist guides made it educational and unforgettable.', author: 'The Johnson Family', location: 'Brighton' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—LHR→Quito (12hr via US connection) and return flights are featured. Business class also available. The open-jaw pattern means no backtracking—fly into Quito, out of Puerto Ayora.'
      },
      {
        question: 'Do I need visas?',
        answer: 'Ecuador tourist card issued on arrival (free for UK citizens, up to 90 days). Galápagos transit card and national park fees are included in your package. No advance visa application required.'
      },
      {
        question: 'What about altitude in Quito?',
        answer: 'Quito sits at 2,850m (9,350ft). The 2-night pre-cruise stay allows for proper acclimatisation. Most travellers adjust well with rest and hydration. The JW Marriott provides comfortable base for adjustment. If concerned, consult your GP before travel.'
      },
      {
        question: 'Can I extend my stay?',
        answer: 'Absolutely! Extended stays in Quito or Puerto Ayora can be arranged. Perfect for Iguazu Falls add-on, Amazon extension, or beach relaxation. Get a personalised quote for extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of expedition accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'How big are the ships?',
        answer: 'Galápagos ships are small (16-100 passengers) to allow intimate wildlife viewing and minimal environmental impact. Celebrity Flora (100 guests, luxury catamaran), Silversea Silver Origin (100 guests, ultra-luxury), Hurtigruten Fram (expedition authentic), Quasar Evolution (16 guests, small yacht).'
      },
      {
        question: 'Do I need to be a good swimmer?',
        answer: 'While snorkeling is optional, basic swimming ability is helpful. Life jackets are provided and activities can be adapted to comfort levels. Zodiac landings are dry. Naturalist guides ensure safety at all times.'
      },
      {
        question: 'What wildlife will I see?',
        answer: 'You\'ll see giant tortoises, marine iguanas, sea lions, blue-footed boobies, waved albatross, penguins, hammerhead sharks, flightless cormorants, and many other endemic species unique to the Galápagos. Wildlife encounters are guaranteed—animals are unafraid of humans.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at JW Marriott Quito (luxury, altitude-friendly) and 1 night at Puerto Ayora hotel. Both include breakfast. Hotels are strategically located for exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this once-in-a-lifetime wildlife journey.'
      }
    ],
    meta: {
      title: 'Galápagos Islands Bucket List Journey from UK | Limitless Cruises',
      description: 'Galápagos cruise from UK 2026. Quito to Galápagos expedition open-jaw with flights included. 7-night expedition cruise, giant tortoises, hammerhead snorkel. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['galapagos cruise from uk 2026', 'quito galapagos expedition open jaw', 'bucket list wildlife cruise ecuador', 'galapagos islands from uk', 'darwin cruise with flights', 'galapagos expedition cruise', 'quito to galapagos package']
    },
    images: [],
    featured: true,
    priority: 5
  },
  {
    id: 'northern-lights',
    slug: 'northern-lights-arctic',
    title: 'Northern Lights & Arctic',
    tagline: 'Aurora hunting coastal voyage from Tromsø to the Russian border',
    description: 'Fly direct to aurora capital Tromsø for 2 nights of midnight hunts, Arctic Cathedral visits, and cable car panoramas. Embark your 7‑night coastal masterpiece North: Lofoten\'s dramatic peaks, Honningsvåg\'s North Cape cliff, endless fjords alive with lights. Disembark Kirkenes for ice hotel thrills, husky sleds, and Russian border walks. Pure winter magic. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '12 nights from UK',
    season: 'October - March (peak December - February for aurora viewing)',
    bestFor: ['Aurora chasers', 'Fjord lovers', 'Winter adventurers', 'Photography enthusiasts', 'Active families', 'Couples'],
    highlights: [
      'Tromsø 2-night aurora hunting (99% guarantee hunts)',
      '7-night coastal voyage (Hurtigruten/Ponant/HX)',
      'Lofoten Islands midnight sun trails and dramatic peaks',
      'North Cape - Europe\'s northernmost point',
      'Kirkenes ice hotel overnight experience',
      'Husky sledding and snowmobile adventures',
      'Open-jaw flights: LHR→Tromsø / Kirkenes→LHR'
    ],
    includes: [
      'Return flights LHR↔Tromsø/Kirkenes (economy, 3hr direct Norwegian/SAS)',
      '5 nights premium Arctic hotels (Tromsø aurora base, Kirkenes ice hotel)',
      '7-night coastal voyage (Hurtigruten MS Richard With/Ponant Le Boréal/HX Roald Amundsen)',
      'Aurora guarantee excursions (free retry if missed)',
      'All transfers between airports, hotels and cruise',
      'Winter gear rental (warm layers provided)',
      'All meals onboard (specialty dining on luxury lines)'
    ],
    cruiseLines: ['Hurtigruten', 'Ponant', 'HX (Hurtigruten Expeditions)'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Tromsø TOS (3hr direct Norwegian/SAS)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Tromsø, Norway', 
        description: 'Arrive Tromsø, transfer to hotel. Check-in, explore Arctic Cathedral, cable car to Mount Storsteinen for panoramic views',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '2', 
        location: 'Tromsø, Norway', 
        description: 'Tromsø free day - aurora hunting tours, whale watching, Sami culture experiences, midnight aurora viewing',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '3', 
        location: 'Tromsø - Embark cruise', 
        description: 'Transfer to port, embark coastal voyage. Set sail north along Norwegian coast, begin aurora watching',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '4', 
        location: 'Lofoten Islands', 
        description: 'Lofoten Islands - Reine fishing village, rugged peaks, red cabins, midnight hikes, dramatic fjord landscapes',
        coordinates: { lat: 68.3500, lon: 14.2500 }
      },
      { 
        day: '5', 
        location: 'At sea - Aurora viewing', 
        description: 'Sea day along Norwegian coast - aurora viewing opportunities, fjord cruising, onboard activities, lights forecast',
        coordinates: { lat: 70.0, lon: 20.0 }
      },
      { 
        day: '6', 
        location: 'Honningsvåg / North Cape', 
        description: 'Honningsvåg - North Cape visit (Europe\'s northernmost point), 1,000ft cliffs, Arctic Ocean views, winter solstice drama',
        coordinates: { lat: 71.1800, lon: 25.7800 }
      },
      { 
        day: '7', 
        location: 'At sea - Lights forecast', 
        description: 'Sea day continuing north - aurora viewing, coastal scenery, expedition lectures, prepare for Kirkenes arrival',
        coordinates: { lat: 70.5, lon: 28.0 }
      },
      { 
        day: '8', 
        location: 'Kirkenes - Disembark', 
        description: 'Arrive Kirkenes, disembark coastal voyage. Transfer to ice hotel, check-in for 2-night stay. Russian border nearby',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '9', 
        location: 'Kirkenes', 
        description: 'Kirkenes - husky sledding, snowmobile adventures, ice hotel experience, Arctic activities, aurora viewing',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '10', 
        location: 'Kirkenes', 
        description: 'Kirkenes free day - Sami reindeer experiences, Russian border walks, ice fishing, additional winter activities',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '11', 
        location: 'Kirkenes → London Heathrow', 
        description: 'Transfer to Kirkenes airport, fly KKN → OSL → LHR (via Oslo connection)',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '12', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Tromsø', description: 'Aurora capital, Arctic Cathedral, cable car panoramas, whale watching, Sami culture' },
      { name: 'Lofoten Islands', description: 'Rugged peaks, red fishing cabins, dramatic fjords, midnight sun trails' },
      { name: 'North Cape', description: 'Europe\'s northernmost point, 1,000ft cliffs, Arctic Ocean, winter solstice' },
      { name: 'Kirkenes', description: 'Ice hotel, husky sledding, Russian border, snowmobiles, true Arctic frontier' }
    ],
    testimonials: [
      { quote: 'Tromsø start + Kirkenes ice hotel = lights perfection. The aurora danced every night!', author: 'Nordic family', location: 'Manchester' },
      { quote: 'Open-jaw made every night count. The coastal voyage was magical—fjords and lights everywhere.', author: 'Solo aurora hunter', location: 'London' },
      { quote: 'Husky sledding in Kirkenes was incredible. The whole journey was winter wonderland perfection.', author: 'Linda & Mark', location: 'Bristol' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Tromsø (3hr) and return flights via Oslo are featured. Business class also available. The open-jaw pattern means no backtracking—fly into Tromsø, out of Kirkenes.'
      },
      {
        question: 'Can I extend my stay in Tromsø or Kirkenes?',
        answer: 'Absolutely! Extended stays in Tromsø or Kirkenes can be arranged. Perfect for more aurora hunting opportunities or additional winter activities. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'Is there an aurora guarantee?',
        answer: 'Yes—most operators offer aurora guarantee excursions with free retry if the lights are missed. Multiple viewing opportunities throughout the voyage increase your chances. Peak season (December-February) offers the highest probability of sightings.'
      },
      {
        question: 'How cold will it be?',
        answer: 'Temperatures range from -5°C to -20°C or colder. Warm layers, thermal clothing, and proper winter gear are essential. Most operators provide warm gear rental. A detailed packing list will be provided.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Hurtigruten MS Richard With (coastal classic, budget-friendly), Ponant Le Boréal (luxury expedition), and HX Roald Amundsen (hybrid power, eco-friendly). All offer expert guides, aurora viewing, and Arctic experiences.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at Tromsø aurora base hotel and 2 nights at Kirkenes ice hotel (or warm alternative). Both include breakfast. Hotels are strategically located for aurora viewing and activities. Ice hotel experience is weather-dependent—warm alternatives available.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are featured. Private transfers also available. No need to navigate Arctic conditions with luggage.'
      },
      {
        question: 'What about meals?',
        answer: 'Hotel breakfasts included. Cruise includes all meals (main dining, buffet, specialty restaurants on luxury lines). Onboard Arctic cuisine and local specialties. Port stops offer Norwegian dining experiences.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this magical Arctic journey.'
      }
    ],
    meta: {
      title: 'Northern Lights & Arctic Bucket List Journey from UK | Limitless Cruises',
      description: 'Northern Lights cruise from UK 2026. Tromsø to Kirkenes coastal voyage with flights included. Aurora hunting, Lofoten Islands, North Cape, ice hotel. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['northern lights cruise from uk', 'aurora cruise from uk 2026', 'tromsø kirkenes cruise', 'arctic bucket list', 'northern lights with flights', 'norway aurora cruise', 'lofoten islands cruise']
    },
    images: [],
    featured: true,
    priority: 6
  },
  {
    id: 'northern-lights-no-fly',
    slug: 'northern-lights-no-fly-dover',
    title: 'Northern Lights No-Fly from UK',
    tagline: 'Aurora hunting from your doorstep – Dover departures, Tromsø overnights',
    description: 'No airports. No jetlag. Pure Arctic magic. Coach or train to Dover, board Holland America Nieuw Statendam, wake to Norway\'s fjords. Tromsø overnight = your aurora jackpot with 24-hour lights window. Orkney stones, Shetland wildlife, North Cape round out the cultural immersion. HAL\'s "History Channel Northern Lights" lectures included. Door-to-door perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '14 nights sail from Dover',
    season: 'October - March (peak December - February for aurora viewing)',
    bestFor: ['Airport avoiders', 'Couples 50+', 'First-time cruisers', 'No-fly travellers', 'Aurora chasers', 'Relaxation seekers'],
    highlights: [
      'Dover departures - no airports, no jetlag',
      'Tromsø overnight - 24-hour aurora viewing window',
      'Holland America Nieuw Statendam Pinnacle Class luxury',
      'Shetland Islands puffins and Jarlshof ruins',
      'North Cape - Europe\'s northernmost point',
      'Orkney Islands - Skara Brae, Highland Park whisky',
      'Aurora guarantee lectures (History Channel partnership)'
    ],
    includes: [
      '14 nights Holland America Nieuw Statendam with a range of accommodation options',
      'All meals + HAL Pinnacle dining (Pinnacle Grill specialty dining also available)',
      'Aurora guarantee lectures (History Channel partnership)',
      'Port talks + daily activities',
      'Door-to-door convenience (Dover easy train/coach from London 1.5hr)',
      'Range of accommodation options available',
      'Solo traveller options available'
    ],
    cruiseLines: ['Holland America Line'],
    itinerary: [
      { 
        day: '1', 
        location: 'Dover, UK', 
        description: 'Depart Dover 17:00 - board Holland America Nieuw Statendam, settle into your cabin, welcome dinner',
        coordinates: { lat: 51.1294, lon: 1.3089 }
      },
      { 
        day: '2', 
        location: 'At sea - English Channel', 
        description: 'Sea day - English Channel crossing, HAL welcome events, explore ship amenities, BB King Club blues',
        coordinates: { lat: 50.5, lon: 1.0 }
      },
      { 
        day: '3', 
        location: 'Rotterdam, Netherlands', 
        description: 'Arrive Rotterdam - overnight stay, explore windmills, canals, Dutch culture, evening in port',
        coordinates: { lat: 51.9244, lon: 4.4777 }
      },
      { 
        day: '4', 
        location: 'Rotterdam, Netherlands', 
        description: 'Rotterdam - continue exploration, depart afternoon, begin North Sea crossing',
        coordinates: { lat: 51.9244, lon: 4.4777 }
      },
      { 
        day: '5', 
        location: 'At sea - North Sea', 
        description: 'Sea day - North Sea crossing, onboard activities, prepare for Norwegian coast, aurora viewing begins',
        coordinates: { lat: 57.0, lon: 2.0 }
      },
      { 
        day: '6', 
        location: 'Lerwick, Shetland Islands', 
        description: 'Lerwick 08:00-17:00 - Shetland Islands, puffin watching, Jarlshof ruins, Scottish heritage, wildlife',
        coordinates: { lat: 60.1550, lon: -1.1450 }
      },
      { 
        day: '7', 
        location: 'At sea - Norwegian Sea', 
        description: 'Sea day - Norwegian Sea, aurora viewing opportunities, lights forecast, onboard lectures',
        coordinates: { lat: 62.0, lon: 4.0 }
      },
      { 
        day: '8', 
        location: 'Ålesund, Norway', 
        description: 'Ålesund 08:00-17:00 - Art Nouveau architecture, fjord gateway, Norwegian culture, scenic beauty',
        coordinates: { lat: 62.4722, lon: 6.1549 }
      },
      { 
        day: '9', 
        location: 'Trondheim, Norway', 
        description: 'Trondheim 08:00-17:00 - Nidaros Cathedral, historic city, Norwegian heritage, cultural immersion',
        coordinates: { lat: 63.4305, lon: 10.3951 }
      },
      { 
        day: '10', 
        location: 'At sea - Peak aurora sea day', 
        description: 'Sea day - peak aurora viewing day, History Channel Northern Lights lectures, prepare for Tromsø',
        coordinates: { lat: 68.0, lon: 10.0 }
      },
      { 
        day: '11', 
        location: 'Tromsø, Norway - Overnight', 
        description: 'Tromsø arrive 13:00 - overnight stay begins, cable car to Mount Storsteinen, Arctic Cathedral, aurora hunts, 24-hour lights window',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '12', 
        location: 'Tromsø, Norway', 
        description: 'Tromsø - final lights chance, continue aurora viewing, depart 18:00, begin return crossing',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '13', 
        location: 'At sea - Return crossing', 
        description: 'Sea day - return crossing, reflect on aurora experiences, final onboard activities',
        coordinates: { lat: 65.0, lon: 5.0 }
      },
      { 
        day: '14', 
        location: 'Kirkwall, Orkney Islands', 
        description: 'Kirkwall 08:00-17:00 - Orkney Islands, Skara Brae Neolithic village, Highland Park whisky distillery, Scottish heritage',
        coordinates: { lat: 58.9800, lon: -2.9600 }
      },
      { 
        day: '15', 
        location: 'Dover, UK', 
        description: 'Arrive Dover 07:00 - disembark, journey complete, easy return home via train/coach',
        coordinates: { lat: 51.1294, lon: 1.3089 }
      }
    ],
    destinations: [
      { name: 'Tromsø', description: 'Aurora capital, 24-hour overnight stay, cable car panoramas, Arctic Cathedral, prime lights viewing' },
      { name: 'Shetland Islands', description: 'Puffin watching, Jarlshof ruins, Scottish heritage, wildlife encounters' },
      { name: 'North Cape', description: 'Europe\'s northernmost point, midnight sun cliff, Arctic Ocean views' },
      { name: 'Orkney Islands', description: 'Skara Brae Neolithic village, Highland Park whisky, Scottish culture' }
    ],
    testimonials: [
      { quote: 'Dover to Tromsø overnights = lights heaven. No airports made it stressless.', author: 'Margaret', location: 'Kent' },
      { quote: 'No-fly made it perfect. HAL food outstanding, service excellent. The Tromsø overnight was magical.', author: 'David', location: 'Newcastle' },
      { quote: 'First cruise and first aurora - both exceeded expectations. The no-fly option was perfect for us.', author: 'Sarah & John', location: 'London' }
    ],
    faq: [
      {
        question: 'Will I see the Northern Lights?',
        answer: '85% success rate October-March. HAL offers aurora guarantee with retry opportunities. The Tromsø overnight provides a 24-hour viewing window, significantly increasing your chances. Peak season (December-February) offers the highest probability.'
      },
      {
        question: 'What accommodation is best for aurora viewing?',
        answer: 'A range of accommodation options are available, some offering excellent aurora viewing opportunities. Different categories provide varying levels of comfort and viewing options. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'How do I get to Dover?',
        answer: 'Easy access from London: train 1.5 hours from London St Pancras or Victoria. Coach services available nationwide. Door-to-door convenience—no airport stress. Private transfers also available.'
      },
      {
        question: 'What about solo travellers?',
        answer: 'Solo traveller options are available. Some cruise lines offer dedicated solo traveller events and dining options. Contact us to check current availability and options for solo travellers.'
      },
      {
        question: 'How cold will it be?',
        answer: 'Temperatures range from -5°C to -15°C. HAL provides warm gear for outdoor viewing. Indoor options abundant—BB King Club, Music Walk, specialty dining. Ship is fully heated with excellent viewing areas.'
      },
      {
        question: 'What are the 2026 dates?',
        answer: 'Weekly departures October-March. Peak season (December-February) fills fastest. Contact us to check current availability for your preferred dates. Early booking recommended for the best selection.'
      },
      {
        question: 'What\'s included?',
        answer: '14 nights onboard Nieuw Statendam with a range of accommodation options, all meals in main dining and buffet, port talks, daily activities, aurora lectures, entertainment. Pinnacle Grill specialty dining also available. Drinks packages optional. Contact us to discuss accommodation options and current availability.'
      },
      {
        question: 'Why choose HAL Nieuw Statendam for Northern Lights?',
        answer: 'Pinnacle Class features excellent viewing opportunities, Music Walk evenings (BB King Club, Rolling Stone Rock Room), dark hull optimized for aurora viewing, strategic Norwegian routing, and HAL\'s signature Tromsø overnight—24-hour lights window.'
      },
      {
        question: 'Are excursions included?',
        answer: 'Port talks and aurora lectures included. Shore excursions are optional and can be booked onboard or pre-cruise. Tromsø cable car, Arctic Cathedral, and aurora hunting tours highly recommended. Get a personalised quote for excursion packages.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this magical no-fly Arctic journey.'
      }
    ],
    meta: {
      title: 'Northern Lights Cruise No Fly from UK 2026 | Tromsø Overnights | Limitless Cruises',
      description: '14-night no-fly Northern Lights cruise from Dover. Tromsø overnight, Arctic Circle, HAL Nieuw Statendam. No airports, no jetlag. Expert booking from Limitless Cruises.',
      keywords: ['northern lights cruise no fly', 'aurora cruise from dover', 'tromsø overnight cruise', 'hal nieuw statendam northern lights', 'no fly cruise from uk', 'dover northern lights cruise', 'tromsø aurora cruise']
    },
    images: [],
    featured: true,
    priority: 7
  },
  {
    id: 'south-america',
    slug: 'south-america-cruises',
    title: 'South America',
    tagline: 'Buenos Aires tango to Fortaleza beaches',
    description: 'Buenos Aires elegance (2 nights tango immersion), then 12‑night coastal masterpiece: Uruguay polo beaches, São Paulo buzz, Rio\'s iconic harbour, pristine Ilhabela, Bahia\'s colonial charm, Fortaleza\'s dune buggy finale. Open‑jaw perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'November - March (South American summer)',
    bestFor: ['Culture explorers', 'Beach lovers', 'Tango dancers', 'Carnival seekers', 'Adventure seekers', 'Couples'],
    highlights: [
      'Buenos Aires 2-night tango immersion (Recoleta, steaks, culture)',
      '12-night South America cruise (coastal masterpiece)',
      'Rio de Janeiro overnight (Christ Redeemer, iconic harbour)',
      'Iguazu Falls day trip option (extend Buenos Aires)',
      'Brazilian coast exploration (Ilhabela, Salvador, Fortaleza)',
      'Fortaleza 2-night finale (beaches, dune buggies, colonial charm)',
      'Open-jaw flights: LHR→Buenos Aires / Fortaleza→LHR'
    ],
    includes: [
      'Return flights LHR↔Buenos Aires/Fortaleza (economy, 13hr direct)',
      '5 nights premium hotels (Buenos Aires luxury, Fortaleza beach)',
      '12-night cruise (Norwegian Star/MSC Splendida/Silversea Silver Ray)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Buenos Aires available (Iguazu Falls add-on also available)'
    ],
    cruiseLines: ['Norwegian Cruise Line', 'MSC Cruises', 'Silversea'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Buenos Aires EZE (13hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Buenos Aires, Argentina', 
        description: 'Arrive Buenos Aires EZE, transfer to luxury hotel. Check-in, explore Recoleta, tango show, Argentine steaks',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '2', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires free day - tango immersion, San Telmo markets, La Boca, Iguazu Falls day trip option',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '3', 
        location: 'Montevideo, Uruguay - Embark', 
        description: 'Transfer to Montevideo port, embark South America cruise. Begin coastal masterpiece journey',
        coordinates: { lat: -34.9011, lon: -56.1645 }
      },
      { 
        day: '4', 
        location: 'Punta del Este, Uruguay', 
        description: 'Punta del Este - polo beaches, glamorous resort town, Atlantic coast, Uruguayan culture',
        coordinates: { lat: -34.9475, lon: -54.9336 }
      },
      { 
        day: '5', 
        location: 'Santos (São Paulo), Brazil', 
        description: 'Santos - gateway to São Paulo, Brazilian buzz, urban exploration, coffee culture',
        coordinates: { lat: -23.9608, lon: -46.3332 }
      },
      { 
        day: '6', 
        location: 'Rio de Janeiro, Brazil - Overnight', 
        description: 'Rio de Janeiro arrive - overnight stay, Christ Redeemer, Copacabana, iconic harbour, Carnival vibe',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '7', 
        location: 'Rio de Janeiro, Brazil', 
        description: 'Rio de Janeiro - continue exploration, Sugarloaf Mountain, Ipanema, samba culture, depart afternoon',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '8', 
        location: 'Ilhabela, Brazil', 
        description: 'Ilhabela - pristine island paradise, tropical beaches, Atlantic rainforest, Brazilian coast beauty',
        coordinates: { lat: -23.7781, lon: -45.3581 }
      },
      { 
        day: '9', 
        location: 'Salvador, Brazil', 
        description: 'Salvador - Bahia colonial charm, Pelourinho historic centre, Afro-Brazilian culture, vibrant city',
        coordinates: { lat: -12.9714, lon: -38.5014 }
      },
      { 
        day: '10', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, prepare for Fortaleza arrival, Brazilian coast cruising',
        coordinates: { lat: -5.0, lon: -35.0 }
      },
      { 
        day: '11', 
        location: 'Fortaleza - Disembark', 
        description: 'Arrive Fortaleza, disembark cruise. Transfer to beach hotel (2 nights). Begin Brazilian coast finale',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '12', 
        location: 'Fortaleza, Brazil', 
        description: 'Fortaleza - beaches, dune buggy adventures, colonial architecture, Brazilian culture, coastal exploration',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '13', 
        location: 'Fortaleza, Brazil', 
        description: 'Fortaleza free day - additional beach time, local markets, seafood dining, final Brazilian experiences',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '14', 
        location: 'Fortaleza → London Heathrow', 
        description: 'Transfer to Fortaleza airport, fly FOR → LHR (via Lisbon/Miami connection)',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '15', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Buenos Aires', description: 'Tango culture, Recoleta, Argentine steaks, sophisticated gateway, Iguazu Falls access' },
      { name: 'Rio de Janeiro', description: 'Christ Redeemer, iconic harbour, Copacabana, Ipanema, Carnival vibe, samba culture' },
      { name: 'Fortaleza', description: 'Brazilian beaches, dune buggies, colonial architecture, coastal paradise, Brazilian culture' },
      { name: 'Brazilian Coast', description: 'Ilhabela pristine island, Salvador colonial charm, tropical beaches, Atlantic beauty' }
    ],
    testimonials: [
      { quote: 'Buenos Aires tango start was perfect. Rio overnight was incredible—Christ Redeemer at sunset!', author: 'Tango dancers', location: 'London' },
      { quote: 'The Brazilian coast was stunning. Fortaleza beaches and dune buggies were the perfect finale.', author: 'Carnival seekers', location: 'Manchester' },
      { quote: 'South America exceeded all expectations. The diversity of landscapes and cultures was incredible.', author: 'David M.', location: 'Manchester' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Buenos Aires (13hr) and return flights via Lisbon/Miami are featured. Business class also available. The open-jaw pattern means no backtracking—fly into Buenos Aires, out of Fortaleza.'
      },
      {
        question: 'Can I extend my stay in Buenos Aires?',
        answer: 'Absolutely! Extended stays in Buenos Aires can be arranged. Perfect for Iguazu Falls add-on or deeper tango immersion. Get a personalised quote for extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'When is the best time to cruise South America?',
        answer: 'November to March is South American summer, offering the best weather. December to February is peak season with warm temperatures and Carnival celebrations. Perfect for beach activities and outdoor exploration.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Norwegian Star (South America intensive, freestyle cruising), MSC Splendida (European elegance, Mediterranean flair), and Silversea Silver Ray (ultra-luxury, all-inclusive). All offer excellent service and South American experiences.'
      },
      {
        question: 'What about Iguazu Falls?',
        answer: 'Iguazu Falls can be added as a 2-day extension from Buenos Aires. Includes flights, hotel, and guided tours of both Argentine and Brazilian sides. One of the world\'s natural wonders—highly recommended!'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at luxury Buenos Aires hotel (Recoleta or Palermo area) and 2 nights at Fortaleza beach hotel. Both include breakfast. Hotels are strategically located for exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are featured. Private transfers also available. No need to navigate South American cities with luggage.'
      },
      {
        question: 'What about meals?',
        answer: 'Hotel breakfasts included. Cruise includes all meals (main dining, buffet, specialty restaurants on luxury lines). Onboard South American cuisine and local specialties. Port stops offer incredible dining—Brazilian churrascarias, Argentine steakhouses, local markets.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this vibrant South American journey.'
      }
    ],
    meta: {
      title: 'South America Bucket List Journey from UK | Limitless Cruises',
      description: 'South America cruise from UK 2026. Buenos Aires to Fortaleza coastal voyage with flights included. Rio de Janeiro, Brazilian coast, tango culture. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['south america cruise from uk', 'buenos aires to fortaleza cruise', 'rio de janeiro cruise from uk', 'south america bucket list', 'brazilian coast cruise', 'south america with flights', 'tango cruise argentina']
    },
    images: [
      null,
      null,
      null,
      null
    ],
    featured: true,
    priority: 7
  },
  {
    id: 'middle-east',
    slug: 'middle-east-cruises',
    title: 'Middle East & Arabian Peninsula',
    tagline: 'Dubai skylines, desert dunes and ancient wonders',
    description: 'Fly direct from the UK into the warmth of the Arabian Gulf, swapping grey winter skies for skyscrapers, souks and desert sunsets. Your journey typically begins with a stay in Dubai or Abu Dhabi, giving time to explore futuristic skylines, the Sheikh Zayed Grand Mosque or the Museum of Islamic Art before you even sail. From there, the ship becomes your moving resort as you hop between Gulf capitals and Omani fjords: Muscat\'s Mutrah Corniche, Khasab\'s dolphin-filled khors, Sir Bani Yas wildlife island, Doha\'s Corniche and Souq Waqif. Longer itineraries branch into the Red Sea, opening up Aqaba for Petra, Safaga or Sokhna for Luxor and Cairo, and occasionally ports in Saudi Arabia such as Jeddah or Al Wajh for AlUla. Each day blends modern luxury with deep history and desert landscapes.',
    heroImage: null,
    cardImage: null,
    duration: '10–14 nights from the UK',
    season: 'November–April (cooler Gulf & Red Sea months)',
    bestFor: ['Winter sun seekers', 'Culture lovers', 'First-time Middle East cruisers', 'UK travellers seeking winter warmth'],
    highlights: [
      'Dubai and Abu Dhabi with time to explore futuristic skylines, the Sheikh Zayed Grand Mosque and Museum of Islamic Art',
      'Muscat\'s Mutrah Corniche and Khasab\'s dolphin-filled khors in Omani fjords',
      'Sir Bani Yas wildlife island and Doha\'s Corniche and Souq Waqif',
      'Longer itineraries branch into the Red Sea with Aqaba for Petra and Safaga or Sokhna for Luxor and Cairo',
      'Desert safaris and optional Petra / pyramids add-ons',
      'Choose Gulf-only, Gulf+Red Sea or extended Holy Land option – contact us to discuss which itinerary works best for you'
    ],
    includes: [
      'Return economy flights from the UK to the main embarkation and disembarkation airports (e.g. Dubai/Abu Dhabi/Amman), with regional departures and premium flight options also available',
      'Pre-cruise hotel stay in Dubai or Abu Dhabi (usually 1–2 nights) and, on longer itineraries, 1 night post-cruise in Aqaba, Cairo or similar gateway city',
      '7–10 nights on board a mainstream or premium ship with a range of accommodation options available',
      'Full-board dining on the ship and most onboard entertainment',
      'Port taxes and standard onboard gratuities',
      'Transfers between airport, hotel and port on embarkation and disembarkation days'
    ],
    cruiseLines: ['Celebrity Cruises', 'Royal Caribbean', 'MSC Cruises', 'Costa Cruises', 'P&O Cruises'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Dubai (7hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Dubai, UAE', 
        description: 'Dubai hotel stay - Burj Khalifa, fountains, historic creek, Dubai Marina, Dubai Mall, modern skylines',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '2', 
        location: 'Dubai, UAE - Embark', 
        description: 'Embark in Dubai. Overnight in port to enjoy evening city lights, Dubai Harbour or Port Rashid cruise terminals',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '3', 
        location: 'Abu Dhabi, UAE', 
        description: 'Abu Dhabi - Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, Yas Island theme parks, Corniche, Zayed Port',
        coordinates: { lat: 24.4762, lon: 54.3583 }
      },
      { 
        day: '4', 
        location: 'Sir Bani Yas Island, UAE', 
        description: 'Sir Bani Yas Island - beach and wildlife reserve, desert island experience, Arabian Gulf beauty',
        coordinates: { lat: 24.3167, lon: 52.6167 }
      },
      { 
        day: '5', 
        location: 'At Sea', 
        description: 'Arabian Gulf cruising, onboard activities, enrichment programs'
      },
      { 
        day: '6', 
        location: 'Doha, Qatar', 
        description: 'Doha - Souq Waqif, Museum of Islamic Art, National Museum of Qatar, Corniche, futuristic skyline, new-build cruise terminal',
        coordinates: { lat: 25.2773, lon: 51.5275 }
      },
      { 
        day: '7', 
        location: 'At Sea', 
        description: 'Transit through Hormuz region, Arabian Sea cruising'
      },
      { 
        day: '8', 
        location: 'Muscat, Oman', 
        description: 'Muscat - Mutrah Souq, Corniche, Sultan Qaboos Grand Mosque, Omani culture, traditional architecture',
        coordinates: { lat: 23.6207, lon: 58.5666 }
      },
      { 
        day: '9', 
        location: 'At Sea', 
        description: 'Arabian Sea cruising, approaching Red Sea'
      },
      { 
        day: '10', 
        location: 'Safaga or Sokhna, Egypt', 
        description: 'Safaga or Sokhna - optional excursion to Luxor or Cairo, Valley of the Kings, pyramids, ancient Egyptian wonders',
        coordinates: { lat: 26.7333, lon: 33.9333 }
      },
      { 
        day: '11', 
        location: 'Aqaba, Jordan - Disembark', 
        description: 'Aqaba - disembark, Petra or Wadi Rum full-day tour, Jordan\'s only seaport, ancient wonders, desert landscapes',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      },
      { 
        day: '12', 
        location: 'Aqaba → Amman → London Heathrow', 
        description: 'Aqaba → Amman → LHR (or direct return to Dubai by air, depending on preference)',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      }
    ],
    destinations: [
      { name: 'Dubai, United Arab Emirates', description: 'Modern hub with Dubai Marina, the Burj Khalifa, Dubai Mall and the historic creek. New Dubai Harbour and Port Rashid cruise terminals put you within easy reach of the city' },
      { name: 'Abu Dhabi, United Arab Emirates', description: 'Capital of the UAE with Zayed Port as cruise gateway. Visit the Sheikh Zayed Grand Mosque, Louvre Abu Dhabi and Yas Island\'s theme parks, or relax along the Corniche' },
      { name: 'Muscat & Omani Fjords, Oman', description: 'Muscat\'s port leads quickly to the Mutrah Souq, Corniche and Sultan Qaboos Grand Mosque, while Khasab in the north offers dhow cruises through dramatic fjords where dolphins are common' },
      { name: 'Doha, Qatar', description: 'A new-build cruise terminal on the Corniche offers easy access to Souq Waqif, the National Museum of Qatar and the Museum of Islamic Art, backing onto a futuristic skyline' },
      { name: 'Aqaba & Petra, Jordan', description: 'Aqaba is Jordan\'s only seaport and a major cruise gateway; from here, day trips take guests to Petra and Wadi Rum' },
      { name: 'Sir Bani Yas Island, UAE', description: 'Beach and wildlife reserve, desert island experience in the Arabian Gulf' }
    ],
    testimonials: [
      { quote: 'We loved having Dubai and Abu Dhabi at the start, then finishing in Aqaba with Petra – it felt like three trips in one, but we only unpacked once.' },
      { quote: 'The mixture of desert safaris, mosques, souks and lazy sea days was spot on for our winter break. Flying into one city and home from another made the route feel logical rather than looping back.' }
    ],
    faq: [
      {
        question: 'Can I do just the Arabian Gulf without the Red Sea or Petra?',
        answer: 'Yes. Many itineraries operate 7-night loops from Dubai or Abu Dhabi that focus purely on Gulf ports such as Dubai, Abu Dhabi, Sir Bani Yas, Doha and Muscat. These can be sold as standalone winter-sun cruises, or combined with extra hotel nights for a longer stay.'
      },
      {
        question: 'What are the typical flight times and airlines from the UK?',
        answer: 'Most UK travellers fly from London or major regional airports to Dubai or Abu Dhabi, with flight times of around 7 hours non-stop on carriers such as Emirates, Etihad or British Airways. Options include economy, premium economy or business-class seats. Contact us to discuss flight options that suit your preferences.'
      },
      {
        question: 'Is it safe and culturally appropriate to cruise the Middle East?',
        answer: 'Cruise itineraries focus on stable, tourism-ready hubs such as the UAE, Oman, Qatar and Jordan, which have invested heavily in cruise terminals and visitor infrastructure. Guests are expected to dress modestly when visiting mosques and religious sites, and simple guidance is provided in pre-travel documents and onboard port talks.'
      },
      {
        question: 'Can I add Petra, Luxor or Cairo to my cruise?',
        answer: 'Yes. Longer Middle East itineraries often include Aqaba (for Petra and Wadi Rum) and Safaga or Sokhna (for Luxor and Cairo). These marquee excursions are usually offered both as cruise-line tours and as private, tailored experiences for small groups. They can be pre-booked when you request your personalised quote.'
      },
      {
        question: 'What is the dress code onboard and ashore?',
        answer: 'Onboard dress codes mirror mainstream Mediterranean cruising (smart casual by night, informal by day). Ashore, lightweight clothing is fine, but shoulders and knees should be covered in mosques and conservative areas; headscarves are required for women in some religious sites. Desert evenings and air-conditioned interiors can feel cool, so layers are recommended.'
      },
      {
        question: 'Is this suitable for families?',
        answer: 'Yes. Many lines in the Gulf deploy ships with strong family facilities, including waterparks and kids\' clubs, and the short distances between ports mean fewer long sea days. However, some excursions (desert safaris, long Petra/Luxor days) may be better suited to older children and teens.'
      },
      {
        question: 'What if I\'ve already been to Dubai on a city break?',
        answer: 'That\'s where a cruise-based bucket list route shines: you can still enjoy a night or two in Dubai or Abu Dhabi, but the real added value is combining it with less familiar stops such as Muscat, Khasab, Doha, Sir Bani Yas and the Red Sea gateways, all on a single, efficient itinerary.'
      },
      {
        question: 'When should I book?',
        answer: 'Winter-sun departures and itineraries including Petra or Luxor are particularly popular with UK guests and can sell out up to 12–18 months in advance. Early booking ensures the widest choice of sailing dates, accommodation options, and promotional offers. Contact us to check current availability for your preferred dates.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available across different categories. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll recommend the best options for your journey based on current availability.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes. Transfers between airport, hotel and port on embarkation and disembarkation days are featured. Private transfers also available. This ensures seamless connections throughout your journey.'
      }
    ],
    meta: {
      title: 'Middle East Cruises | Dubai & Arabian Peninsula from UK | Limitless Cruises',
      description: 'Middle East cruise from UK – Dubai skylines, desert dunes and ancient wonders. 10-14 nights including flights. Dubai, Abu Dhabi, Muscat, Doha, Petra. Expert booking from Limitless Cruises.',
      keywords: ['middle east cruise from uk', 'dubai cruise from uk', 'abu dhabi cruise', 'arabian peninsula cruise', 'middle east winter sun', 'dubai abu dhabi cruise', 'petra cruise', 'red sea cruise']
    },
    images: [],
    featured: true,
    priority: 8
  },
  {
    id: 'pacific-new-zealand',
    slug: 'pacific-new-zealand-cruises',
    title: 'Pacific Islands & New Zealand',
    tagline: 'Auckland to tropical paradise',
    description: 'Auckland Māori culture kickoff, then 12‑night island hop: Maori Bay of Islands, Fiji\'s coral reefs, New Caledonia\'s Loyalty Isles, Vanuatu volcanoes. Tropical finale with overwater bungalows and pristine beaches. Open‑jaw perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'November - April (avoiding cyclone season)',
    bestFor: ['Beach paradise seekers', 'Island hoppers', 'Snorkel families', 'Overwater dreamers', 'Adventure seekers', 'Couples'],
    highlights: [
      'Auckland 2-night pre-cruise stay (Sky Tower, Viaduct, Māori culture)',
      '12-night Pacific cruise (island hopping paradise)',
      'Bay of Islands - Maori culture, pristine coastline',
      'Fiji beaches - coral reefs, turquoise waters, Yasawa Islands',
      'New Caledonia - Nouméa lagoon, French Pacific charm',
      'Vanuatu - Port Vila volcanoes, tropical landscapes',
      'Open-jaw flights: LHR→Auckland / Final port→LHR'
    ],
    includes: [
      'Return flights LHR↔Auckland/Final port (economy, 24hr via Asia/Sydney)',
      '5 nights premium hotels (Auckland, final port)',
      '12-night cruise (Princess Pacific Encounter/P&O Pacific Adventure/Carnival Splendor)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Auckland available'
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Carnival Cruise Line'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Auckland AKL (24hr via Asia/Sydney connection)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Auckland, New Zealand', 
        description: 'Arrive Auckland, transfer to hotel. Check-in, explore Sky Tower, Viaduct Harbour, Māori culture',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '2', 
        location: 'Auckland, New Zealand', 
        description: 'Auckland free day - Sky Tower views, Viaduct exploration, Māori cultural experiences, city of sails',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '3', 
        location: 'Bay of Islands - Embark', 
        description: 'Transfer to Bay of Islands port, embark Pacific cruise. Begin island hopping journey',
        coordinates: { lat: -35.2271, lon: 174.2430 }
      },
      { 
        day: '4', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, prepare for Pacific islands, onboard activities, tropical cruising',
        coordinates: { lat: -30.0, lon: 175.0 }
      },
      { 
        day: '5', 
        location: 'Suva, Fiji', 
        description: 'Suva - Fijian capital, coral reefs, tropical beaches, Fijian culture, island paradise',
        coordinates: { lat: -18.1416, lon: 178.4419 }
      },
      { 
        day: '6', 
        location: 'Dravuni Island, Fiji', 
        description: 'Dravuni Island - pristine tropical paradise, turquoise waters, coral reefs, snorkelling, beach relaxation',
        coordinates: { lat: -18.7833, lon: 178.5167 }
      },
      { 
        day: '7', 
        location: 'Lautoka, Fiji', 
        description: 'Lautoka - sugar city, Fijian culture, tropical landscapes, beach activities, island exploration',
        coordinates: { lat: -17.6244, lon: 177.4528 }
      },
      { 
        day: '8', 
        location: 'Nouméa, New Caledonia', 
        description: 'Nouméa - French Pacific charm, beautiful lagoon, colonial architecture, tropical paradise',
        coordinates: { lat: -22.2558, lon: 166.4508 }
      },
      { 
        day: '9', 
        location: 'Lifou, Loyalty Islands', 
        description: 'Lifou - Loyalty Islands, pristine beaches, coral reefs, French Pacific culture, tropical beauty',
        coordinates: { lat: -20.9167, lon: 167.2333 }
      },
      { 
        day: '10', 
        location: 'Port Vila, Vanuatu', 
        description: 'Port Vila - Vanuatu capital, volcanoes, tropical landscapes, Melanesian culture, island paradise',
        coordinates: { lat: -17.7333, lon: 168.3167 }
      },
      { 
        day: '11', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, reflect on island experiences, prepare for final port, tropical cruising',
        coordinates: { lat: -12.0, lon: 165.0 }
      },
      { 
        day: '12', 
        location: 'Final port - Disembark', 
        description: 'Arrive final port (Port Moresby or Cairns), disembark cruise. Transfer to hotel (2 nights). Begin tropical finale',
        coordinates: { lat: -9.4438, lon: 147.1803 } // Port Moresby default, can be Cairns
      },
      { 
        day: '13', 
        location: 'Final port', 
        description: 'Final port free day - beach relaxation, Barrier Reef tie-in (if Cairns), tropical exploration, local culture',
        coordinates: { lat: -9.4438, lon: 147.1803 }
      },
      { 
        day: '14', 
        location: 'Final port → London Heathrow', 
        description: 'Transfer to airport, fly final port → LHR (24hr via Asia/Sydney connection)',
        coordinates: { lat: -9.4438, lon: 147.1803 }
      },
      { 
        day: '15', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Auckland', description: 'Sky Tower, Viaduct Harbour, Māori culture, city of sails, New Zealand gateway' },
      { name: 'Fiji Yasawas', description: 'Coral reefs, turquoise waters, pristine beaches, tropical paradise, snorkelling' },
      { name: 'Nouméa', description: 'French Pacific charm, beautiful lagoon, colonial architecture, tropical paradise' },
      { name: 'Port Vila', description: 'Vanuatu volcanoes, tropical landscapes, Melanesian culture, island paradise' }
    ],
    testimonials: [
      { quote: 'Auckland start was perfect—Māori culture and Sky Tower. The Fiji islands were pure paradise—overwater dreams!', author: 'Island hoppers', location: 'London' },
      { quote: 'The perfect combination of New Zealand adventure and Pacific relaxation. Every island was more beautiful than the last.', author: 'Helen T.', location: 'Bristol' },
      { quote: 'Snorkelling in Fiji\'s coral reefs was incredible. The whole journey was tropical perfection.', author: 'Snorkel families', location: 'Manchester' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—LHR→Auckland (24hr via Asia/Sydney) and return flights are featured. Business class also available. The open-jaw pattern means no backtracking—fly into Auckland, out of final port.'
      },
      {
        question: 'Can I extend my stay in Auckland?',
        answer: 'Absolutely! Extended stays in Auckland can be arranged. Perfect for deeper New Zealand exploration, Rotorua geysers, or additional Māori cultural experiences. Get a personalised quote for extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'When is the best time for Pacific & New Zealand cruises?',
        answer: 'November to April is ideal, avoiding cyclone season. November-December offers warm weather and fewer crowds. January-March is peak summer with best beach conditions. April is shoulder season with pleasant temperatures.'
      },
      {
        question: 'Do I need a visa for New Zealand?',
        answer: 'UK citizens need a New Zealand Electronic Travel Authority (NZeTA) before travel, which can be obtained online. Processing is quick and straightforward. Your cruise line will provide guidance.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Princess Pacific Encounter (Australian-based, repositioning season), P&O Pacific Adventure (Australian market, family-friendly), and Carnival Splendor (fun atmosphere, extensive amenities). All offer excellent Pacific island experiences.'
      },
      {
        question: 'What about the final port?',
        answer: 'Final port varies by itinerary—typically Port Moresby (Papua New Guinea) or Cairns (Great Barrier Reef gateway). Both offer 2-night stays with beach relaxation and tropical exploration. Cairns option includes Barrier Reef tie-in opportunities.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at Auckland hotel and 2 nights at final port hotel. Both include breakfast. Hotels are strategically located for exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are featured. Private transfers also available. No need to navigate Pacific destinations with luggage.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this tropical paradise journey.'
      }
    ],
    meta: {
      title: 'Pacific Islands & New Zealand Bucket List Journey from UK | Limitless Cruises',
      description: 'Pacific Islands cruise from UK 2026. Auckland to tropical paradise with flights included. Fiji, New Caledonia, Vanuatu, Bay of Islands. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['pacific islands cruise from uk', 'auckland to fiji cruise', 'new zealand pacific cruise', 'fiji cruise from uk', 'pacific islands bucket list', 'tropical paradise cruise', 'south pacific with flights']
    },
    images: [
      null,
      null
    ],
    featured: true,
    priority: 9
  },
  // NEW BUCKET LIST EXPERIENCES BELOW
  {
    id: 'transatlantic-crossings',
    slug: 'transatlantic-crossings',
    title: 'Transatlantic Crossings',
    tagline: 'Queen Mary 2 or MSC luxury across the pond',
    description: 'Board Southampton for 7‑day Cunard QM2 or MSC luxury: gala nights, lectures, sea days. Arrive New York harbour like 1920s icons. 2 nights Manhattan magic—Statue of Liberty, Top of Rock, skyline views. No-fly perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '10 nights from UK',
    season: 'April - May, October - November (repositioning season)',
    bestFor: ['Ocean lovers', 'NY romantics', 'Classicists', 'Sea day fans', 'NYC introverts', 'No-fly travellers'],
    highlights: [
      'Southampton embark - no airports, no jetlag',
      '7-day Atlantic crossing (Cunard QM2 or MSC luxury)',
      'QM2 Planetarium and world-class entertainment',
      'Gala nights and elegant dining',
      'New York harbour arrival (Statue of Liberty sail-in)',
      '2 nights Manhattan magic (skyline, Top of Rock)',
      'Open-jaw flights: Southampton → NYC / NYC→LHR (7hr direct)'
    ],
    includes: [
      '7-night transatlantic crossing with a range of accommodation options',
      '2 nights New York hotel (Manhattan)',
      'Return flight NYC→LHR (economy, 7hr direct)',
      'All transfers between port, hotel and airport',
      'All meals onboard (specialty dining on luxury lines)',
      'Entertainment and enrichment lectures',
      'Range of accommodation options available',
      'Extendable stays: New York available'
    ],
    cruiseLines: ['Cunard', 'MSC Cruises', 'Royal Caribbean'],
    itinerary: [
      { 
        day: '1', 
        location: 'Southampton, UK - Embark', 
        description: 'Transfer to Southampton port, embark Cunard QM2 or MSC Virtuosa. Settle into your cabin, welcome dinner, begin Atlantic crossing',
        coordinates: { lat: 50.9097, lon: -1.4044 }
      },
      { 
        day: '2', 
        location: 'At sea - Atlantic crossing', 
        description: 'First sea day - explore ship amenities, enrichment lectures, afternoon tea, begin ocean crossing',
        coordinates: { lat: 50.0, lon: -10.0 }
      },
      { 
        day: '3', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - QM2 Planetarium (if on Cunard), world-class entertainment, fine dining, relaxation',
        coordinates: { lat: 48.0, lon: -20.0 }
      },
      { 
        day: '4', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - gala nights, formal dining, enrichment programs, spa treatments, ocean views',
        coordinates: { lat: 46.0, lon: -30.0 }
      },
      { 
        day: '5', 
        location: 'At sea - Atlantic crossing', 
        description: 'Mid-Atlantic - halfway point, onboard activities, lectures, afternoon tea, elegant evenings',
        coordinates: { lat: 44.0, lon: -40.0 }
      },
      { 
        day: '6', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - approaching North America, final gala night, entertainment, fine dining',
        coordinates: { lat: 42.0, lon: -50.0 }
      },
      { 
        day: '7', 
        location: 'At sea - Atlantic crossing', 
        description: 'Final sea day - prepare for New York arrival, enrichment lectures, onboard activities',
        coordinates: { lat: 40.5, lon: -60.0 }
      },
      { 
        day: '8', 
        location: 'New York, USA - Arrive & Disembark', 
        description: 'Arrive New York harbour - sail past Statue of Liberty, iconic skyline arrival. Disembark, transfer to Manhattan hotel (2 nights)',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      { 
        day: '9', 
        location: 'New York, USA', 
        description: 'New York free day - Statue of Liberty visit, Top of Rock observation deck, Manhattan exploration, Broadway shows',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      { 
        day: '10', 
        location: 'New York → London Heathrow', 
        description: 'Transfer to JFK airport, depart NYC → LHR (7hr direct). Arrive LHR, journey complete',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      }
    ],
    destinations: [
      { name: 'Southampton to New York', description: 'The classic transatlantic route, ocean liner tradition, Statue of Liberty arrival' },
      { name: 'New York City', description: 'Manhattan magic, Statue of Liberty, Top of Rock, skyline views, Broadway, iconic harbour' },
      { name: 'Atlantic Ocean', description: '7-day ocean crossing, sea days, gala nights, world-class entertainment, relaxation' }
    ],
    testimonials: [
      { quote: 'Arriving in New York by sea, passing the Statue of Liberty, was absolutely magical. The crossing was so relaxing—no jetlag!', author: 'William & Mary', location: 'Kent' },
      { quote: 'Queen Mary 2 is simply the most elegant way to cross the Atlantic. The ballroom, the Planetarium, the service—perfection.', author: 'Elizabeth T.', location: 'Surrey' },
      { quote: 'No-fly made it perfect. 7 days at sea, then 2 nights in NYC. The perfect combination of relaxation and city excitement.', author: 'Classicists', location: 'London' }
    ],
    faq: [
      {
        question: 'Are flights included?',
        answer: 'Yes—return flight NYC→LHR (7hr direct) is featured. Business class also available. The no-fly outbound (Southampton embark) means no airports on departure—pure relaxation from day one.'
      },
      {
        question: 'Can I extend my stay in New York?',
        answer: 'Absolutely! Extended stays in New York can be arranged. Perfect for deeper Manhattan exploration, Broadway shows, or additional sightseeing. Get a personalised quote for extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'How long does a transatlantic crossing take?',
        answer: 'A typical Southampton to New York crossing takes 7 nights. The crossing follows the great circle route across the North Atlantic. Some voyages include stops in ports like Halifax or Boston for extended itineraries.'
      },
      {
        question: 'Is it rough crossing the Atlantic?',
        answer: 'The Atlantic can be unpredictable, but modern ships like Queen Mary 2 are specifically designed for ocean crossings with excellent stabilizers. QM2 is the only true ocean liner in service, built for Atlantic conditions. Most crossings are surprisingly smooth.'
      },
      {
        question: 'What is there to do on sea days?',
        answer: 'Enrichment lectures, West End style shows, QM2 Planetarium (Cunard), fine dining, spa treatments, elegant afternoon tea, gala nights, and simply enjoying the ocean views. There\'s never a dull moment—or perfect for complete relaxation.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Cunard Queen Mary 2 (weekly crossings, true ocean liner, Planetarium, ballroom), MSC Virtuosa (modern luxury, Mediterranean flair), and Royal Caribbean Independence of the Seas (family-friendly, extensive amenities). All offer excellent transatlantic experiences.'
      },
      {
        question: 'What\'s included in the hotel stay?',
        answer: '2 nights at Manhattan hotel (central location). Includes breakfast. Hotel is strategically located for easy exploration of New York attractions. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between Southampton port, New York hotel, and JFK airport are featured. Private transfers also available. No need to navigate with luggage.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this classic ocean crossing journey.'
      }
    ],
    meta: {
      title: 'Transatlantic Crossing Bucket List Journey from UK | Limitless Cruises',
      description: 'Transatlantic cruise from UK 2026. Southampton to New York crossing with flights included. Queen Mary 2, MSC luxury, 2 nights NYC. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['transatlantic cruise from uk', 'southampton to new york cruise', 'queen mary 2 crossing', 'atlantic crossing from uk', 'no fly cruise to new york', 'transatlantic bucket list', 'ocean crossing with flights']
    },
    images: [],
    featured: true,
    priority: 10
  },
  {
    id: 'iceland-circumnavigation',
    slug: 'iceland-circumnavigation',
    title: 'Iceland Circumnavigation',
    tagline: 'Ring of Fire complete – Reykjavik to East Fjords',
    description: 'Direct to Reykjavik for geothermal Blue Lagoon and Harpa evenings. Embark 8‑night circumnavigation: Heimaey\'s Eldfell volcano landing, Ísafjörður\'s hot springs, Akureyri whale watch, Seyðisfjörður\'s rainbow street. East Fjords finale—waterfalls, hiking. Open‑jaw perfection. ATOL protected. Get a personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '12 nights from UK',
    season: 'May - September (summer light, midnight sun)',
    bestFor: ['Volcano seekers', 'Puffin lovers', 'Nature photographers', 'Active couples', 'Birders', 'Adventure seekers'],
    highlights: [
      'Reykjavik 2-night pre-cruise stay (Blue Lagoon, Harpa)',
      '8-night circumnavigation cruise (complete ring of Iceland)',
      'Heimaey volcano tender landing (Eldfell)',
      'Puffin colony Zodiac excursions',
      'Midnight sun fjord sailing',
      'East Fjords 2-night finale (waterfalls, hiking)',
      'Open-jaw flights: LHR→Reykjavik / East Fjords→LHR'
    ],
    includes: [
      'Return flights LHR↔Reykjavik/East Fjords (economy, 3hr direct)',
      '5 nights premium hotels (Reykjavik, East Fjords)',
      '8-night cruise (Ambassador Ambience/Fred. Olsen Bolette/Ponant Le Dumont d\'Urville)',
      'Volcano landings and Zodiac excursions',
      'All transfers between airports, hotels and cruise',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Reykjavik available'
    ],
    cruiseLines: ['Ambassador Cruise Line', 'Fred. Olsen', 'Ponant'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Reykjavik KEF (3hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Reykjavik, Iceland', 
        description: 'Arrive Reykjavik, transfer to hotel. Check-in, explore Harpa Concert Hall, Reykjavik city centre',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '2', 
        location: 'Reykjavik, Iceland', 
        description: 'Reykjavik free day - Blue Lagoon geothermal spa, Golden Circle tour option, Icelandic culture',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '3', 
        location: 'Reykjavik - Embark cruise', 
        description: 'Transfer to port, embark circumnavigation cruise. Set sail for Westmann Islands, begin ring of fire journey',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '4', 
        location: 'Heimaey, Westmann Islands', 
        description: 'Heimaey - Eldfell volcano tender landing, puffin colonies, volcanic landscapes, dramatic cliffs',
        coordinates: { lat: 63.4420, lon: -20.2760 }
      },
      { 
        day: '5', 
        location: 'Patreksfjörður, Westfjords', 
        description: 'Patreksfjörður - remote Westfjords, seabird cliffs, dramatic coastline, Icelandic wilderness',
        coordinates: { lat: 65.5970, lon: -23.9960 }
      },
      { 
        day: '6', 
        location: 'Ísafjörður, Westfjords', 
        description: 'Ísafjörður - hot springs, fishing heritage, Arctic Circle proximity, fjord beauty',
        coordinates: { lat: 66.0750, lon: -23.1350 }
      },
      { 
        day: '7', 
        location: 'At sea / Ísafjarðardjúp', 
        description: 'Sea day - navigate Ísafjarðardjúp fjord system, onboard activities, midnight sun viewing',
        coordinates: { lat: 66.0, lon: -23.0 }
      },
      { 
        day: '8', 
        location: 'Akureyri, North Iceland', 
        description: 'Akureyri - whale watching capital, Godafoss waterfall, botanical gardens, northern gateway',
        coordinates: { lat: 65.6830, lon: -18.0880 }
      },
      { 
        day: '9', 
        location: 'Siglufjörður, North Iceland', 
        description: 'Siglufjörður - herring fishing heritage, Arctic Circle, dramatic fjord landscapes',
        coordinates: { lat: 66.1500, lon: -18.9167 }
      },
      { 
        day: '10', 
        location: 'Seyðisfjörður - Disembark', 
        description: 'Arrive Seyðisfjörður, disembark cruise. Transfer to East Fjords hotel (2 nights). Rainbow street, waterfalls nearby',
        coordinates: { lat: 65.2560, lon: -14.0100 }
      },
      { 
        day: '11', 
        location: 'East Fjords', 
        description: 'East Fjords free day - waterfalls, hiking trails, Icelandic horses, dramatic landscapes, local culture',
        coordinates: { lat: 65.2560, lon: -14.0100 }
      },
      { 
        day: '12', 
        location: 'East Fjords → Reykjavik → London Heathrow', 
        description: 'Transfer to airport, fly East Fjords → Reykjavik → LHR (3hr direct)',
        coordinates: { lat: 65.2560, lon: -14.0100 }
      }
    ],
    destinations: [
      { name: 'Reykjavik', description: 'Vibrant capital, Blue Lagoon, Harpa Concert Hall, Icelandic culture, geothermal wonders' },
      { name: 'Heimaey Volcano', description: 'Eldfell volcano landing, puffin colonies, dramatic cliffs, volcanic landscapes' },
      { name: 'Akureyri', description: 'Whale watching capital, Godafoss waterfall, botanical gardens, northern gateway' },
      { name: 'Seyðisfjörður', description: 'East Fjords, rainbow street, waterfalls, hiking trails, dramatic landscapes' }
    ],
    testimonials: [
      { quote: 'Heimaey volcano landing—unreal. The tender approach to Eldfell was unforgettable. Iceland by sea is the only way.', author: 'Iceland first-timers', location: 'London' },
      { quote: 'The puffin colonies and midnight sun sailing were magical. Every fjord was more dramatic than the last.', author: 'Jonathan K.', location: 'Edinburgh' },
      { quote: 'East Fjords finale was perfect—waterfalls, hiking, Icelandic horses. The complete ring was incredible.', author: 'Rachel & Tom', location: 'Manchester' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Reykjavik (3hr) and return flights are featured. Business class also available. The open-jaw pattern means no backtracking—fly into Reykjavik, out of East Fjords.'
      },
      {
        question: 'Can I extend my stay in Reykjavik?',
        answer: 'Absolutely! Extended stays in Reykjavik can be arranged. Perfect for Golden Circle tours, glacier walks, or additional Blue Lagoon visits. Get a personalised quote for extensions.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available. Availability varies by ship, sailing date, and cruise line. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'What is the weather like?',
        answer: 'Icelandic weather is unpredictable but summer (May-September) offers the best conditions. Temperatures average 10-15°C. Layered, waterproof clothing is essential. Midnight sun provides extended daylight for exploration.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Ambassador Ambience (UK small ship, friendly atmosphere), Fred. Olsen Bolette (British comfort, excellent service), and Ponant Le Dumont d\'Urville (luxury expedition, French flair). All offer expert guides and Icelandic experiences.'
      },
      {
        question: 'What about volcano landings?',
        answer: 'Heimaey volcano landing is weather-dependent and conducted via tender/Zodiac. Expert guides ensure safety. The Eldfell volcano is accessible and offers incredible views. Alternative activities available if weather prevents landing.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at Reykjavik hotel and 2 nights at East Fjords hotel. Both include breakfast. Hotels are strategically located for exploration. Higher room categories also available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are featured. Private transfers also available. No need to navigate Icelandic conditions with luggage.'
      },
      {
        question: 'What about meals?',
        answer: 'Hotel breakfasts included. Cruise includes all meals (main dining, buffet, specialty restaurants on luxury lines). Onboard Icelandic cuisine and local specialties. Port stops offer authentic Icelandic dining experiences.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this magical Icelandic journey.'
      }
    ],
    meta: {
      title: 'Iceland Circumnavigation Bucket List Journey from UK | Limitless Cruises',
      description: 'Iceland cruise from UK 2026. Reykjavik to East Fjords circumnavigation with flights included. Volcano landing, puffin colonies, midnight sun. ATOL protected. Expert booking from Limitless Cruises.',
      keywords: ['iceland cruise from uk', 'iceland circumnavigation 2026', 'reykjavik to east fjords cruise', 'iceland bucket list', 'volcano cruise iceland', 'puffin cruise from uk', 'iceland ring of fire cruise']
    },
    images: [],
    featured: true,
    priority: 12
  },
  {
    id: 'european-rivers',
    slug: 'european-river-cruises',
    title: 'European River Cruises',
    tagline: 'Sail Europe\'s great rivers – from Amsterdam canals to Budapest\'s skyline',
    description: 'European river cruises are a gentle way to see multiple countries in one trip without airport hopping or long coach days. You typically fly from the UK to your embarkation city (for example Amsterdam for the Rhine, Budapest for the Danube or Porto for the Douro), enjoy 1–2 nights in a hand-picked hotel, then join your river ship right in the heart of the city. From there, the river becomes your highway: castles and vineyards slide past as you sit on deck with a glass of wine, you step off into medieval old towns or capital-city centres, and the ship moves while you dine or sleep. There are no open seas, no long tender rides and no days lost in transit – just a sequence of cities, villages and landscapes strung together like beads on a necklace.',
    heroImage: null,
    cardImage: null,
    duration: '7–14 nights from the UK',
    season: 'March–November (spring blossom, summer sun, autumn vines, Christmas markets)',
    bestFor: ['Culture lovers', 'First-time cruisers', 'Relaxing slow-travel', 'Couples and friends', 'Guests with limited mobility', 'Seasoned ocean cruisers'],
    highlights: [
      'Small ships (often 120–190 guests) with panoramic lounges and outdoor decks',
      'Daily port visits - no sea days, almost always scenery',
      'Dock in the heart of cities - step off into medieval old towns',
      'Castles and vineyards slide past as you sit on deck',
      'Relaxed smart-casual, destination-focused atmosphere',
      'Choose a single iconic route or combine two rivers into a longer Grand River Journey'
    ],
    includes: [
      'Return economy flights between the UK and the river cruise start/end airports (for example London–Budapest and Munich–London), with regional departures by request',
      'Transfers between airport, hotel and ship at the beginning and end of the trip',
      '1–2 nights in a centrally located hotel in the embarkation or disembarkation city (Budapest, Amsterdam, Porto etc.), including breakfast',
      '7–10 nights on a European river cruise ship with a range of accommodation options available',
      'Full-board dining on the river cruise (breakfast, lunch and dinner) with tea/coffee and sometimes wine or beer with meals, depending on the line',
      'A programme of included walking tours or coach excursions in key ports, plus on-board talks to help you get more from each stop'
    ],
    cruiseLines: ['Viking', 'AmaWaterways', 'Uniworld', 'Avalon Waterways', 'Scenic'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Budapest (2-2.5hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Budapest, Hungary', 
        description: 'Budapest hotel stay - explore both Buda and Pest: Castle District, Parliament, riverfront. Optional evening river illuminations cruise',
        coordinates: { lat: 47.4979, lon: 19.0402 }
      },
      { 
        day: '2', 
        location: 'Budapest, Hungary - Embark', 
        description: 'Free morning in the city, then transfer to the river ship and settle in. Evening welcome dinner and scenic departure',
        coordinates: { lat: 47.4979, lon: 19.0402 }
      },
      { 
        day: '3', 
        location: 'Bratislava, Slovakia', 
        description: 'Morning arrival with guided walking tour of the old town and hilltop castle. Afternoon at leisure, Slovakian culture',
        coordinates: { lat: 48.1486, lon: 17.1077 }
      },
      { 
        day: '4', 
        location: 'Vienna, Austria', 
        description: 'City tour (Ringstrasse, St Stephen\'s Cathedral) and optional Schönbrunn Palace. Evening classical concert option, imperial palaces, coffee houses',
        coordinates: { lat: 48.2082, lon: 16.3738 }
      },
      { 
        day: '5', 
        location: 'Wachau Valley & Dürnstein, Austria', 
        description: 'Scenic morning sailing through vineyards and castle-topped hills. Afternoon stroll through Dürnstein or visit Melk Abbey, terraced vineyards, pretty villages',
        coordinates: { lat: 48.3958, lon: 15.5206 }
      },
      { 
        day: '6', 
        location: 'Linz or Salzburg Excursion, Austria', 
        description: 'Choice of staying in Linz or taking a full-day excursion to Salzburg and the lakes region, Austrian culture',
        coordinates: { lat: 48.3069, lon: 14.2858 }
      },
      { 
        day: '7', 
        location: 'Passau, Germany', 
        description: 'Guided walking tour and organ recital in the baroque cathedral. Farewell dinner onboard, three-rivers town where Danube, Inn and Ilz meet',
        coordinates: { lat: 48.5667, lon: 13.4333 }
      },
      { 
        day: '8', 
        location: 'Passau → Munich → London Heathrow', 
        description: 'Disembark Passau, transfer by coach to Munich airport (roughly 2–3 hours), then fly back to the UK',
        coordinates: { lat: 48.5667, lon: 13.4333 }
      }
    ],
    destinations: [
      { name: 'Budapest, Hungary', description: 'Often the start or end point for Danube cruises. Buda Castle, the Chain Bridge and the Parliament building light up spectacularly at night. Thermal baths and ruin-bar districts make pre- or post-cruise stays easy' },
      { name: 'Vienna, Austria', description: 'Imperial palaces, coffee houses and classical music. Many itineraries include an evening concert and allow guests plenty of time to explore the Ringstrasse and Schönbrunn' },
      { name: 'Wachau Valley, Austria', description: 'A scenic stretch of the Danube with terraced vineyards, castles and pretty villages like Dürnstein and Melk. Often enjoyed from the sun deck with commentary as you sail' },
      { name: 'Passau, Germany', description: 'A compact "three-rivers" town where the Danube, Inn and Ilz meet. Known for its baroque cathedral and cobbled streets, and a common disembarkation point for flights via Munich' },
      { name: 'Bratislava, Slovakia', description: 'Charming capital with hilltop castle, old town walking tours, Slovakian culture, Danube gateway' },
      { name: 'Rhine River', description: 'Amsterdam to Basel - fairytale castles, Rhine Gorge scenery, Cologne cathedral, Strasbourg, Alsace culture' },
      { name: 'Douro River', description: 'Porto to Pinhão - Portugal\'s wine country, terraced vineyards, Barca d\'Alva, scenic valley cruising' }
    ],
    testimonials: [
      { quote: 'We saw Budapest, Vienna and more without ever touching a suitcase after day one. Sitting on deck through the Wachau Valley with a glass of wine was the highlight of our year.' },
      { quote: 'The ship felt like a floating boutique hotel – small, friendly, and always moored right by the old town so we could wander off after dinner.' }
    ],
    faq: [
      {
        question: 'Do river cruises feel different from big ocean ships?',
        answer: 'Yes. River ships are much smaller (often under 200 guests) and sail on calm inland waterways. There are no sea days in the traditional sense – almost every day includes time in port, and you\'re never far from land.'
      },
      {
        question: 'What is the typical dress code on a European river cruise?',
        answer: 'Most river cruises are smart-casual. There might be one or two slightly dressier evenings, but tuxedos and ball gowns are not expected. Comfortable shoes are essential for cobbled streets and walking tours.'
      },
      {
        question: 'What is typically included and what additional options are available?',
        answer: 'Your cruise fare typically includes accommodation, meals, basic hot drinks, many sightseeing tours and port taxes. Additional options often include drinks packages, optional premium excursions, spa treatments and gratuities (if not bundled).'
      },
      {
        question: 'How active do I need to be?',
        answer: 'Daily tours can involve walking on uneven surfaces, steps and gentle hills, but many lines offer "easy pace" or "panorama" tours for those who prefer minimal walking. It\'s important to mention mobility needs during your quote so the right line and route can be suggested.'
      },
      {
        question: 'Are flights always included?',
        answer: 'Most UK-focused river cruise packages include flights and transfers as standard, but some can be sold "cruise only" if you prefer to arrange your own travel or drive to a regional airport. Your quote can be tailored either way.'
      },
      {
        question: 'When is the best time of year to cruise Europe\'s rivers?',
        answer: 'Spring (April–May) brings blossom and cooler days, summer (June–August) is warm and lively, autumn (September–October) offers harvest colours in the vineyards, and late November–December is ideal for Christmas markets. Each has a distinct feel; your preferences can guide date recommendations.'
      },
      {
        question: 'Can water levels affect my cruise?',
        answer: 'In very low- or high-water periods, river sections can become difficult to navigate, and ships may need to adjust routes or use short coach transfers to bypass specific stretches. Reputable lines plan around this and keep guests informed; it\'s rare for a cruise to be cancelled entirely.'
      },
      {
        question: 'Are children welcome on European river cruises?',
        answer: 'Some lines are strictly adult-focused, while others welcome families but have limited children\'s facilities. School-holiday sailings can be more family-oriented. If you\'re travelling with children or teens, this should be factored into your line and date selection.'
      },
      {
        question: 'Can I add extra city stays before or after the cruise?',
        answer: 'Yes. Many guests add nights in Budapest, Prague, Amsterdam, Porto or other gateway cities either side of the cruise. Packages can include hotels, private transfers, and extra city tours.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'Popular dates (spring blossom, wine-harvest weeks, Christmas markets) can sell out 9–18 months ahead, especially on smaller ships. Early booking gives you the best choice of route, accommodation options and promotional offers. Contact us to check current availability for your preferred dates.'
      }
    ],
    meta: {
      title: 'European River Cruises | Rhine, Danube, Douro from UK | Limitless Cruises',
      description: 'European river cruise from UK – sail Europe\'s great rivers. 7-14 nights including flights. Danube, Rhine, Douro. Budapest, Vienna, Amsterdam. Expert booking from Limitless Cruises.',
      keywords: ['european river cruise from uk', 'danube cruise from uk', 'rhine cruise from uk', 'river cruise uk', 'budapest vienna cruise', 'douro river cruise', 'viking river cruise uk']
    },
    images: [],
    featured: true,
    priority: 13
  },
  {
    id: 'great-barrier-reef',
    slug: 'great-barrier-reef-cruises',
    title: 'Great Barrier Reef & Australia',
    tagline: 'Sydney icons, reef snorkelling and Aussie sunshine',
    description: 'Most UK guests fly overnight to Sydney or Brisbane, with at least one connection in Asia or the Middle East. Building in a 2–3 night stay at the start helps with jetlag and gives time to explore Australia\'s flagship city: Sydney Harbour, the Opera House, Bondi and Manly beaches, and perhaps a day trip to the Blue Mountains. From there, you either join a reef-focused cruise from Brisbane or Sydney or take a short domestic flight up to a Queensland gateway such as Cairns or Airlie Beach, using a ship as your floating base for the Great Barrier Reef and Whitsunday Islands. Days are spent snorkelling over coral gardens, visiting white-sand beaches like Whitehaven and calling at relaxed coastal towns. On longer itineraries, you can also visit Melbourne, Adelaide, Tasmania or head further north towards tropical rainforest regions.',
    heroImage: null,
    cardImage: null,
    duration: '14–18 nights from the UK',
    season: 'Approx. April–October for drier, cooler reef conditions (avoid peak tropical cyclone/humidity in mid-summer)',
    bestFor: ['Long-haul first-timers', 'Reef lovers', 'Winter-sun seekers', 'First-time visitors to Australia', 'UK travellers seeking a winter-sun epic', 'Repeat cruisers'],
    highlights: [
      'Sydney Opera House and Harbour Bridge with 2-3 night city stay to explore harbour, Bondi and Manly beaches',
      'Great Barrier Reef snorkelling trips - the world\'s largest coral reef system with vibrant coral and tropical fish',
      'Whitsunday Islands with bright white sand and translucent water, Whitehaven Beach frequently topping "world\'s best beaches" lists',
      'Queensland beaches and coastal ports - Brisbane, Cairns, Port Douglas, Townsville or Airlie Beach',
      'Optional Blue Mountains day trip from Sydney for eucalyptus forests, canyons and viewpoints',
      'Trip can be structured as Sydney city stay + reef-focused cruise or a longer coastal voyage combining multiple Australian regions'
    ],
    includes: [
      'Return economy flights between the UK and Australia (for example UK → Sydney, Brisbane → UK), including checked baggage',
      'All internal transfers on arrival and departure days (airport ↔ hotel ↔ port)',
      '3–4 nights in 4- or 5-star city hotels in Sydney and/or Brisbane, including breakfast',
      '7–10 nights on a mainstream or premium cruise line with a range of accommodation options available',
      'Full-board dining on the cruise plus most onboard entertainment',
      'Port taxes and standard onboard gratuities where applicable'
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Celebrity Cruises', 'Coral Expeditions', 'Holland America'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Sydney (22-26hr via Dubai/Doha/Singapore/Hong Kong)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Sydney, Australia', 
        description: 'Arrive Sydney, transfer to hotel. Check-in, begin jetlag recovery, explore harbour area',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '2', 
        location: 'Sydney, Australia', 
        description: 'Sydney city stay - explore the harbour, Opera House, The Rocks, Bondi beach, Manly ferry, iconic harbour views',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '3', 
        location: 'Sydney, Australia', 
        description: 'Sydney free day - optional Blue Mountains day trip for eucalyptus forests, canyons and viewpoints, or continue city exploration',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '4', 
        location: 'Sydney, Australia - Embark', 
        description: 'Board your cruise mid-afternoon; sail out past the Opera House and Harbour Bridge, iconic harbour departure',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '5', 
        location: 'At Sea', 
        description: 'Relax and adjust fully to the time zone with pool time, spa and onboard activities, coastal sailing north'
      },
      { 
        day: '6', 
        location: 'Brisbane, Australia', 
        description: 'Visit South Bank, Lone Pine Koala Sanctuary or explore the riverfront, Queensland\'s capital, river city with galleries',
        coordinates: { lat: -27.4698, lon: 153.0251 }
      },
      { 
        day: '7', 
        location: 'Airlie Beach / Whitsunday Islands, Australia', 
        description: 'Launch point for Great Barrier Reef and Whitehaven Beach excursions, bright white sand, translucent water, island paradise',
        coordinates: { lat: -20.2674, lon: 148.7183 }
      },
      { 
        day: '8', 
        location: 'Cairns / Port Douglas, Australia', 
        description: 'More reef options, or combine reef with nearby rainforest attractions, gateway to Great Barrier Reef, tropical Queensland',
        coordinates: { lat: -16.9186, lon: 145.7781 }
      },
      { 
        day: '9', 
        location: 'Great Barrier Reef (Reef Excursion)', 
        description: 'Organised snorkelling or diving excursions over coral gardens, vibrant coral and tropical fish, world\'s largest coral reef system',
        coordinates: { lat: -18.2871, lon: 147.6992 }
      },
      { 
        day: '10', 
        location: 'Townsville or Willis Island, Australia', 
        description: 'Another reef or coastal call - could be Townsville, Willis Island (scenic cruising) or a further Whitsunday stop, laid-back marina',
        coordinates: { lat: -19.2590, lon: 146.8169 }
      },
      { 
        day: '11', 
        location: 'At Sea', 
        description: 'Time to enjoy the ship and Australian-themed activities, coastal sailing south'
      },
      { 
        day: '12', 
        location: 'Return to Sydney or Brisbane', 
        description: 'Option to disembark and stay a final night ashore, or remain onboard if cruise continues, return to gateway city',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '13', 
        location: 'Sydney or Brisbane, Australia', 
        description: 'Final city stay (if open-jaw pattern) - extra day in Sydney or a second city such as Melbourne or Brisbane, Australian culture',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '14', 
        location: 'Sydney or Brisbane → London Heathrow', 
        description: 'Transfer to airport, fly Sydney/Brisbane → LHR (22-26hr via Dubai/Doha/Singapore/Hong Kong, typically overnight)',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '15', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    destinations: [
      { name: 'Sydney, New South Wales', description: 'Australia\'s iconic harbour city: the Opera House, Harbour Bridge, Circular Quay and The Rocks historic district. Ferry rides to Manly and walks between Bondi and Coogee offer classic harbour and beach views' },
      { name: 'Great Barrier Reef & Whitsundays, Queensland', description: 'The world\'s largest coral reef system, accessible via organised snorkelling or diving excursions from ports like Cairns or Airlie Beach. The Whitsunday Islands offer bright white sand and translucent water, with Whitehaven Beach frequently topping "world\'s best beaches" lists' },
      { name: 'Queensland Coastal Ports', description: 'Examples include Brisbane (river city with galleries and South Bank parklands), Cairns (gateway to reef and rainforest), Port Douglas (more boutique), and Townsville or Airlie Beach for laid-back marina and island-hopping days' },
      { name: 'Blue Mountains', description: 'Optional extension from Sydney for eucalyptus forests, canyons and viewpoints' },
      { name: 'Hunter Valley', description: 'Optional winery regions for food and wine lovers' }
    ],
    testimonials: [
      { quote: 'We combined three nights in Sydney with a reef cruise from Brisbane – the Harbour sail-away and snorkelling over the coral were stand-out moments.' },
      { quote: 'Booking it as a complete journey from UK flights to local tours made the distance feel manageable. The jetlag was gone by the time we reached the Whitsundays.' }
    ],
    faq: [
      {
        question: 'How long are the flights from the UK and what routes do people usually take?',
        answer: 'Flights from London to Sydney or Brisbane typically involve one stop and total around 22–26 hours including transit time. Common routes connect via hubs such as Dubai, Doha, Singapore or Hong Kong. Regional UK departures are often available with an additional short hop into the main long-haul gateway.'
      },
      {
        question: 'Is this trip too long or intense for a first-time long-haul traveller?',
        answer: 'It\'s a big journey, but splitting it into stages with a 2–3 night stay on arrival and a comfortable cruise section makes it more manageable. Many first-time long-haul guests find that once they adjust to local time in Sydney or Brisbane, the rest of the trip feels surprisingly relaxed.'
      },
      {
        question: 'What level of fitness do I need for reef excursions?',
        answer: 'Basic mobility and comfort in the water are helpful for standard snorkelling trips, but many reef tours also offer glass-bottom boats, semi-submersibles and supervised snorkel areas suitable for non-experts. If you have limited mobility or don\'t swim, we can focus on more accessible reef-viewing options.'
      },
      {
        question: 'Is it safe and sustainable to visit the Great Barrier Reef?',
        answer: 'The cruise lines and reef operators used in curated packages are typically regulated, with strict rules on anchoring, reef access and wildlife interaction. Visitor numbers to sensitive sites are controlled, and many tours include a conservation or education component so you understand how the reef is being managed.'
      },
      {
        question: 'What\'s the best time of year to go?',
        answer: 'Conditions vary by region, but many UK travellers target the Australian autumn, winter and early spring months (roughly April–October) to avoid extreme heat and humidity in Queensland, while still enjoying warm air and water temperatures.'
      },
      {
        question: 'Are visas required for UK citizens?',
        answer: 'Most UK travellers to Australia will need an electronic travel authorisation or e-visa, which is usually straightforward to obtain online before travel. If your route connects via other countries, there may be transit visa considerations; these are easier to manage when the entire trip is booked as a package.'
      },
      {
        question: 'Can I add extra land-based stays instead of or in addition to the cruise?',
        answer: 'Yes. It\'s common to add time in the Blue Mountains, Hunter Valley, Cairns/Port Douglas or even combine Australia with a stopover in places like Singapore, Hong Kong or Dubai. The open-jaw structure of flights and cruise makes it straightforward to build in extra land legs.'
      },
      {
        question: 'Is the Great Barrier Reef still worth visiting given climate concerns?',
        answer: 'While some sections have been affected by bleaching events and storms, many reef sites still offer excellent coral and fish life, and visitor revenue can help fund conservation and monitoring. Choosing responsible operators and not touching or standing on the reef are key to minimising impact.'
      },
      {
        question: 'What accommodation options are available?',
        answer: 'A range of accommodation options are available for reef and coastal itineraries. Different categories provide varying levels of comfort, natural light, and viewing opportunities. Contact us to discuss your preferences and we\'ll show you what\'s currently available for your preferred dates.'
      },
      {
        question: 'How far in advance should I book an Australia & Reef trip?',
        answer: 'Because of limited capacity on long-haul flights and specific reef cruises or sailings, it\'s sensible to plan 9–18 months in advance, especially for peak UK holiday periods. Contact us to check current availability for your preferred dates and accommodation preferences.'
      }
    ],
    meta: {
      title: 'Great Barrier Reef & Australia Cruise from UK | Sydney & Reef | Limitless Cruises',
      description: 'Great Barrier Reef cruise from UK – Sydney icons, reef snorkelling and Aussie sunshine. 14-18 nights including flights. Sydney, Brisbane, Whitsundays, Cairns. Expert booking from Limitless Cruises.',
      keywords: ['great barrier reef cruise from uk', 'australia cruise from uk', 'sydney reef cruise', 'great barrier reef snorkelling', 'australia bucket list', 'whitsundays cruise from uk', 'cairns cruise from uk']
    },
    images: [],
    featured: true,
    priority: 14
  },
  {
    id: 'grand-voyages',
    slug: 'grand-voyages',
    title: 'Grand Voyages',
    tagline: '30–60+ night Grand Voyages linking continents',
    description: 'A Grand Voyage is essentially a long, one-way cruise segment that feels like a self-contained chapter of a world cruise. Instead of a 7–14 night loop, you might sail 35 nights from Barcelona to Cape Town or 45 nights from Rome to Singapore, with flights at each end. These journeys usually follow classic sea routes: across the Mediterranean and through the Suez Canal into the Red Sea and Indian Ocean, across the Atlantic to South America and the Caribbean, or along the coasts of Africa and Asia. You unpack once, settle into your ship routine and let the captain move you between regions while you pick off bucket list ports along the way.',
    heroImage: null,
    cardImage: null,
    duration: 'Typically 30–60+ nights',
    season: 'Mainly spring and autumn (when ships reposition between regions)',
    bestFor: ['Travellers with time and flexibility', 'Retirees and semi-retired guests', 'Experienced cruisers', 'Remote or flexible workers'],
    highlights: [
      'Super-segments that sit between standard itineraries and full world cruises – ideal if you want the feel of a world cruise without committing four months',
      'Popular patterns include Mediterranean → Asia via Suez, Europe → South America & Amazon, and Asia → Europe via the Middle East',
      'You unpack once, settle into your ship routine and let the captain move you between regions',
      'More sea days than typical cruises – time to truly switch off, enjoy the ship and feel the distance you\'re covering',
      'Strong onboard community with enrichment lectures, workshops and destination talks',
      'Outstanding value per night when compared to multiple shorter cruises'
    ],
    includes: [
      'Return economy flights from the UK to the embarkation and from the final port back to the UK (e.g. UK → Barcelona, Singapore → UK)',
      'Transfers between airports, hotels and the port at the start and end of the voyage',
      '1–3 nights hotel stays in the embarkation and/or disembarkation cities',
      '30–60+ nights on a mainstream, premium or luxury cruise ship with a range of accommodation options available',
      'Full-board dining on the ship, with most entertainment and enrichment activities',
      'Port taxes and service charges where applicable'
    ],
    cruiseLines: ['Cunard', 'Holland America', 'Princess Cruises', 'P&O Cruises', 'Fred. Olsen', 'MSC Cruises'],
    itinerary: [
      { 
        day: '0', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Barcelona (2hr15 direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '1', 
        location: 'Barcelona, Spain', 
        description: 'Arrive Barcelona, transfer to hotel. Stay 1–2 nights to explore Las Ramblas, the Gothic Quarter and Sagrada Família',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '2', 
        location: 'Barcelona, Spain - Embark', 
        description: 'Board your Grand Voyage ship and enjoy a sunset sail-away along the Catalan coast, begin epic journey',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '3', 
        location: 'Marseille, France', 
        description: 'Marseille - historic port city, Provence gateway, French Riviera, Mediterranean culture',
        coordinates: { lat: 43.3285, lon: 5.3695 }
      },
      { 
        day: '4', 
        location: 'At Sea', 
        description: 'Mediterranean sailing, onboard activities, enrichment programs'
      },
      { 
        day: '5', 
        location: 'Naples, Italy', 
        description: 'Naples - gateway to Pompeii, Amalfi Coast, Italian culture, historic port',
        coordinates: { lat: 40.8375, lon: 14.2660 }
      },
      { 
        day: '6', 
        location: 'At Sea', 
        description: 'Eastern Mediterranean sailing, approaching Greece'
      },
      { 
        day: '7', 
        location: 'Piraeus (Athens), Greece', 
        description: 'Piraeus - gateway to Athens, Acropolis, ancient history, Greek culture, Mediterranean highlight',
        coordinates: { lat: 37.9425, lon: 23.6467 }
      },
      { 
        day: '8', 
        location: 'At Sea', 
        description: 'Sea day(s) with enrichment talks about the history and geopolitics of the region, approaching Suez'
      },
      { 
        day: '9', 
        location: 'Suez Canal (Transit)', 
        description: 'Slow transit through the Suez Canal, engineering marvel, connecting Mediterranean to Red Sea',
        coordinates: { lat: 29.9669, lon: 32.5498 }
      },
      { 
        day: '10', 
        location: 'Aqaba, Jordan', 
        description: 'Aqaba - optional excursions to Petra or Wadi Rum, Jordan\'s only seaport, ancient wonders, desert landscapes',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      },
      { 
        day: '11', 
        location: 'At Sea - Red Sea', 
        description: 'Red Sea cruising, Arabian Peninsula approaching, onboard activities'
      },
      { 
        day: '12', 
        location: 'Jeddah, Saudi Arabia', 
        description: 'Jeddah - Red Sea gateway, modern city, Arabian culture, optional excursions to Mecca region',
        coordinates: { lat: 21.4858, lon: 39.1925 }
      },
      { 
        day: '13', 
        location: 'At Sea - Red Sea', 
        description: 'Red Sea sailing, approaching Arabian Gulf'
      },
      { 
        day: '14', 
        location: 'Muscat, Oman', 
        description: 'Muscat - Mutrah Souq, Corniche, Sultan Qaboos Grand Mosque, Omani culture, Arabian Peninsula',
        coordinates: { lat: 23.6207, lon: 58.5666 }
      },
      { 
        day: '15', 
        location: 'Doha, Qatar', 
        description: 'Doha - Souq Waqif, Museum of Islamic Art, National Museum of Qatar, Corniche, futuristic skyline',
        coordinates: { lat: 25.2773, lon: 51.5275 }
      },
      { 
        day: '16', 
        location: 'Dubai, UAE', 
        description: 'Dubai - modern skylines, Dubai Marina, Burj Khalifa, Dubai Mall, Arabian Gulf highlight',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '17-19', 
        location: 'At Sea - Arabian Sea', 
        description: 'Indian Ocean crossing, Arabian Sea cruising, approaching India'
      },
      { 
        day: '20', 
        location: 'Mumbai, India', 
        description: 'Mumbai - Gateway of India, Bollywood, colonial architecture, Indian culture, vibrant city',
        coordinates: { lat: 18.9220, lon: 72.8347 }
      },
      { 
        day: '21', 
        location: 'At Sea', 
        description: 'Arabian Sea sailing, Indian coastline'
      },
      { 
        day: '22', 
        location: 'Goa, India', 
        description: 'Goa - Portuguese heritage, beautiful beaches, Indian culture, laid-back atmosphere',
        coordinates: { lat: 15.4909, lon: 73.8278 }
      },
      { 
        day: '23-24', 
        location: 'At Sea - Indian Ocean', 
        description: 'Indian Ocean crossing, approaching Sri Lanka'
      },
      { 
        day: '25', 
        location: 'Colombo, Sri Lanka', 
        description: 'Colombo - tea culture, colonial architecture, Sri Lankan culture, Indian Ocean gateway',
        coordinates: { lat: 6.9271, lon: 79.8612 }
      },
      { 
        day: '26-27', 
        location: 'At Sea - Indian Ocean', 
        description: 'Indian Ocean sailing, approaching Southeast Asia'
      },
      { 
        day: '28', 
        location: 'Penang, Malaysia', 
        description: 'Penang - George Town UNESCO site, street art, Malaysian culture, food paradise, Southeast Asia gateway',
        coordinates: { lat: 5.4164, lon: 100.3327 }
      },
      { 
        day: '29', 
        location: 'Port Klang (Kuala Lumpur), Malaysia', 
        description: 'Port Klang - gateway to Kuala Lumpur, Petronas Towers, Malaysian culture, modern city',
        coordinates: { lat: 3.0100, lon: 101.4000 }
      },
      { 
        day: '30', 
        location: 'At Sea', 
        description: 'Malacca Strait sailing, approaching Thailand'
      },
      { 
        day: '31', 
        location: 'Phuket, Thailand', 
        description: 'Phuket - beautiful beaches, Thai culture, island paradise, Southeast Asia highlight',
        coordinates: { lat: 7.8865, lon: 98.3983 }
      },
      { 
        day: '32', 
        location: 'At Sea', 
        description: 'Andaman Sea sailing, approaching Singapore'
      },
      { 
        day: '33', 
        location: 'Singapore - Disembark', 
        description: 'Arrive Singapore, disembark Grand Voyage. Transfer to hotel (1-2 nights), explore marina, gardens and hawker centres',
        coordinates: { lat: 1.2660, lon: 103.8070 }
      },
      { 
        day: '34', 
        location: 'Singapore → London Heathrow', 
        description: 'Transfer to airport, fly Singapore → LHR (13hr direct, typically overnight). Arrive LHR, journey complete',
        coordinates: { lat: 1.2660, lon: 103.8070 }
      }
    ],
    destinations: [
      { name: 'Mediterranean to Asia (via Suez)', description: 'Start in a European port such as Barcelona, Rome or Athens, call at Greece and the Eastern Med, transit the Suez Canal, then follow the Red Sea, Arabian Peninsula and Indian Ocean towards India and Southeast Asia' },
      { name: 'Europe to South America & Amazon', description: 'Depart from a Western Mediterranean port, cross the Atlantic via the Canary Islands or Cape Verde, then call along the Brazilian coast and potentially sail up part of the Amazon River' },
      { name: 'Asia to Europe (reverse Suez)', description: 'Fly from the UK to an Asian hub such as Singapore or Dubai, cruise via India, the Arabian Peninsula and Suez back into the Mediterranean and end in a European city like Rome or Barcelona' },
      { name: 'Suez Canal', description: 'Slow transit through the Suez Canal, engineering marvel, connecting Mediterranean to Red Sea, historic waterway' },
      { name: 'Arabian Peninsula', description: 'Cruise the Red Sea and Arabian Gulf; ports might include cities such as Jeddah, Muscat, Doha or Dubai/Abu Dhabi, combining modern skylines with desert landscapes' },
      { name: 'Indian Ocean', description: 'Calls at ports along the Arabian Sea and Indian Ocean – potential stops could include Mumbai or Goa, Sri Lanka, or island calls in the Maldives or Seychelles on some routes' },
      { name: 'South & Southeast Asia', description: 'A mix of sea days and port calls in India and Southeast Asia: for example, Penang, Kuala Lumpur (Port Klang), Phuket or Ho Chi Minh City' }
    ],
    testimonials: [
      { quote: 'We weren\'t ready for a full four-month world cruise, but a 38-night Barcelona-to-Singapore segment gave us a real sense of crossing continents.' },
      { quote: 'Having the flights, hotels and cruise all lined up as one journey made a complicated route feel simple – we just unpacked once and let the itinerary unfold.' }
    ],
    faq: [
      {
        question: 'How is a Grand Voyage different from a World Cruise?',
        answer: 'A World Cruise typically lasts three to four months and circles much of the globe. A Grand Voyage is shorter – often 30–60+ nights – and usually covers one broad arc (for example, Europe to Asia or South America to Europe). It\'s a "chapter" rather than the whole book.'
      },
      {
        question: 'Are Grand Voyages only for luxury lines?',
        answer: 'No. Luxury and ultra-luxury lines do offer superb long segments, but many mainstream and premium lines also schedule extended repositioning cruises that effectively function as Grand Voyages. Contact us to discuss which cruise line and ship style best suits your preferences.'
      },
      {
        question: 'Will there be lots of sea days?',
        answer: 'Yes, more than on a typical 7–14 night holiday cruise. That\'s part of the appeal: you get time to truly switch off, enjoy the ship and feel the distance you\'re covering. Long strings of sea days are usually broken up by clusters of ports.'
      },
      {
        question: 'Do I need a lot of visas and paperwork?',
        answer: 'Because Grand Voyages cross multiple borders, there can be more visa considerations. The cruise line and your booking specialist provide clear guidance on which visas are needed and how best to obtain them, and some ports are covered by ship-arranged group visas.'
      },
      {
        question: 'What accommodation options are available for 30+ night voyages?',
        answer: 'A range of accommodation options are available for extended voyages. Different categories offer varying levels of comfort, space, and amenities. For very long segments, some ships offer enhanced experiences with additional services. Contact us to discuss your preferences and we\'ll recommend the best options for your journey based on current availability and your needs.'
      },
      {
        question: 'Is this suitable if I\'m prone to seasickness?',
        answer: 'Grand Voyages can include open-ocean crossings where seas may be more noticeable. Modern ships have stabilisers, and there are routing choices that favour more coastal tracks where possible. If you\'re sensitive, your adviser can steer you towards historically calmer routes and suggest practical remedies.'
      },
      {
        question: 'Can I join or leave a Grand Voyage part-way through?',
        answer: 'Some lines allow "segment within a segment" bookings (for example, only the Mediterranean–Red Sea portion of a longer cruise). Others restrict embarkation/disembarkation to specific ports. The easiest approach is to start with your ideal duration and let a specialist match that to available segments.'
      },
      {
        question: 'What\'s the onboard atmosphere like on longer voyages?',
        answer: 'Typically more relaxed and community-focused. Guests get to know each other and the crew, and there is often a strong programme of enrichment lectures, workshops and destination talks. There may be more mature clientele, though this varies by line and time of year.'
      },
      {
        question: 'What additional options are available onboard?',
        answer: 'Additional options include drinks packages, speciality dining, excursions, Wi-Fi and optional services like spas. Many lines offer packages that bundle drinks and Wi-Fi for long cruises, and excursion bundles are often available. Contact us to discuss what\'s included and what additional options you might want to consider.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'Because Grand Voyages have limited capacity and appeal strongly to early planners, it\'s common to open sales 18–24 months ahead. Booking early gives the best accommodation choice and access to launch promotions; last-minute availability on popular segments is much less predictable. Contact us to check current availability for your preferred dates.'
      }
    ],
    meta: {
      title: 'Grand Voyages | 30-60+ Night Multi-Continent Cruises from UK | Limitless Cruises',
      description: 'Grand Voyages from UK – 30-60+ night journeys linking continents. Mediterranean to Asia, Europe to South America. Barcelona to Singapore. Expert booking from Limitless Cruises.',
      keywords: ['grand voyage', 'extended cruise from uk', 'multi-continent cruise', '30 night cruise', '60 night cruise', 'barcelona to singapore cruise', 'grand voyage uk']
    },
    images: [],
    featured: true,
    priority: 17
  }
];

// Helper functions
export const getBucketListBySlug = (slug) => 
  bucketListExperiences.find(exp => exp.slug === slug);

export const getFeaturedBucketList = () => 
  bucketListExperiences.filter(exp => exp.featured).sort((a, b) => a.priority - b.priority);

export const getAllBucketList = () => 
  [...bucketListExperiences].sort((a, b) => a.priority - b.priority);

// Get random selection for dynamic content
export const getRandomBucketList = (count = 3) => {
  const shuffled = [...bucketListExperiences].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get rotating featured (changes on each page load/refresh)
export const getRotatingFeatured = (count = 3) => {
  const featured = getFeaturedBucketList();
  const shuffled = [...featured].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, featured.length));
};

