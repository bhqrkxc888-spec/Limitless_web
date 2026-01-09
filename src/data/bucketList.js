/**
 * Bucket List Experiences Data
 * Once-in-a-lifetime cruise experiences
 * 
 * Schema: See bucketListSchema.js for full type definitions and validation
 */

import { validateAllBucketListExperiences } from './bucketListSchema.js';

/**
 * Bucket List Experiences Data
 * 
 * AUTHORING RULE: Bucket list itineraries MUST start at Day 1.
 * Day 1 is the first travel day (departure from home).
 * Never use Day 0 in bucket list data.
 * Schema validation will reject any Day 0 entries.
 */

export const bucketListExperiences = [
  {
    id: 'world-cruises',
    slug: 'world-cruises',
    lastUpdated: '2026-01-02',
    title: 'World Cruises',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'World Cruise | Round the World Voyage from Barcelona | Limitless Cruises',
      metaDescription: 'Complete guide to world cruises from the UK. 100-140 night voyages circumnavigating the globe from Barcelona. Flights included, best time to go, what to expect, expert advice.',
      keywords: ['world cruise', 'round the world cruise', 'circumnavigation cruise', 'world voyage', 'world cruise from barcelona', 'extended cruise']
    },
    
    // Hero
    hero: {
      headline: 'World Cruises',
      subheadline: 'The ultimate voyage: four months, five continents, one unforgettable journey'
    },
    
    // Simple summary
    tagline: 'The ultimate voyage: four months, five continents, one unforgettable journey',
    heroImage: null,
    cardImage: null,
    duration: '100-140 nights',
    season: 'January - May',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>Sailing around the world is one of travel\'s great adventures. A world cruise offers something no other form of travel can: the gift of time. Time to properly explore a place rather than just tick it off. Time to watch cultures change gradually as you move from continent to continent. Time to make lasting friendships with fellow travellers who share your sense of adventure.</p><p>The journey itself becomes part of the experience. Sea days become welcome breaks for reading, relaxing, and looking forward to the next port. You settle into a rhythm-the gentle motion of the ship, the changing light on the water, the anticipation of what tomorrow will bring.</p><p>What makes a world cruise special is the sheer variety of experiences. In a single voyage, you might tango in Buenos Aires, watch a Maori haka in New Zealand, transit the Panama Canal, and explore Gaudí\'s Barcelona. Each port brings something different-Latin American music and colour, peaceful Pacific island life, the buzz of Australian cities, the warmth of Caribbean hospitality.</p><p>The contrast between destinations makes each one more memorable. After days of Pacific blue, catching sight of a coastline feels genuinely exciting. After the drama of Rio\'s harbour, a quiet South Seas atoll feels like your own private discovery.</p>'
    },
    optimalTiming: {
      summary: 'Typical duration: 100-140 nights. World cruises typically depart in January from Barcelona and return in April or May, timing the voyage to arrive in each region during its most favourable season. Flights from the UK included.',
      seasons: [
        {
          name: 'South America',
          months: 'January-February',
          highlights: ['Summer warmth in Rio and Buenos Aires', 'Optimal conditions for Cape Horn passage', 'Peak wildlife viewing in Patagonia']
        },
        {
          name: 'Pacific & Australasia',
          months: 'February-March',
          highlights: ['Late summer in New Zealand and Australia', 'Dry season in French Polynesia', 'Calm Pacific crossings']
        },
        {
          name: 'Caribbean & Atlantic',
          months: 'April-May',
          highlights: ['Pleasant Caribbean temperatures', 'Spring warmth in the Mediterranean', 'Longer daylight for European arrival']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Tango at Twilight',
        highlights: [
          'Experience the passion of Argentine tango in a hidden Buenos Aires milonga',
          'Locals dance until dawn in authentic venues',
          'Immerse yourself in Buenos Aires\' cultural heart'
        ]
      },
      { 
        theme: 'Rounding Cape Horn',
        highlights: [
          'Sail past the legendary tip of South America',
          'Where the Atlantic and Pacific meet in dramatic fashion',
          'Historic significance of this legendary passage'
        ]
      },
      { 
        theme: 'Bora Bora\'s Lagoon',
        highlights: [
          'Float in impossibly blue waters beneath the volcanic peak of Mount Otemanu',
          'Iconic overwater bungalows and coral reefs',
          'Ultimate tropical paradise experience'
        ]
      },
      { 
        theme: 'Easter Island\'s Moai',
        highlights: [
          'Stand before the enigmatic stone guardians of Rapa Nui',
          'One of Earth\'s most remote inhabited places',
          'Archaeological wonder shrouded in mystery'
        ]
      },
      { 
        theme: 'Panama Canal Transit',
        highlights: [
          'Experience one of humanity\'s greatest engineering achievements',
          'Watch your ship pass through the legendary locks',
          'Full daylight transit from Pacific to Atlantic'
        ]
      },
      { 
        theme: 'Sydney Harbour Awakening',
        highlights: [
          'Sail beneath the Harbour Bridge and past the Opera House',
          'As the sun rises over Australia\'s most iconic city',
          'One of the world\'s most spectacular harbour arrivals'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'World cruises suit travellers who value depth over speed and connection over convenience. Most world cruises depart from Barcelona or other Mediterranean ports, with flights from the UK included.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Savour slow, immersive travel. Want to truly know places rather than just visit them. Value time for reading, reflection and new friendships. Are comfortable with extended sea days.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You prefer fast-paced itineraries with constant activity. You get restless during sea days. You need frequent connectivity (satellite wifi can be slow). You have limited time available.' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Minimal. You set your own pace entirely. Ships offer excellent facilities for all activity levels. Many guests are in their 60s, 70s and beyond.' 
        },
        { 
          type: 'The reality', 
          description: 'World cruises attract a refined, well-travelled clientele. Expect enriching lectures, cultural performances, and fellow passengers who share your curiosity. The overall pace is relaxed and civilised.' 
        }
      ]
    },
    bespokeTailoring: [
      'Choice of embarkation point and voyage segments',
      'Cabin category and location tailored to your preferences',
      'Pre- and post-cruise hotel stays in key cities',
      'Private shore excursions and cultural experiences',
      'Flight upgrades and regional departures from the UK',
      'Special occasion arrangements-anniversaries, birthdays, celebrations'
    ],
    cruiseLines: ['MSC Cruises', 'Cunard', 'P&O Cruises', 'Princess Cruises', 'Oceania Cruises'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Barcelona (2hr15 direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Barcelona, Spain - Embark', 
        description: 'Arrive Barcelona, transfer to port, embark world cruise. Begin your 121-night global odyssey',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '3', 
        location: 'At Sea', 
        description: 'Relax and enjoy ship amenities, enrichment lectures, destination-focused entertainment'
      },
      { 
        day: '4', 
        location: 'Palma de Mallorca, Spain', 
        description: 'Palma - historic cathedral, Mediterranean charm, Spanish culture, beautiful beaches',
        coordinates: { lat: 39.5696, lon: 2.6502 }
      },
      { 
        day: '5', 
        location: 'At Sea', 
        description: 'Mediterranean sailing, onboard activities, formal evening'
      },
      { 
        day: '6', 
        location: 'Civitavecchia (Rome), Italy', 
        description: 'Civitavecchia - gateway to Rome, ancient history, Colosseum, Vatican City, Italian cuisine',
        coordinates: { lat: 42.0934, lon: 11.7964 }
      },
      { 
        day: '7-8', 
        location: 'At Sea', 
        description: 'Mediterranean crossing, enrichment programs, relaxation'
      },
      { 
        day: '9', 
        location: 'Las Palmas, Canary Islands', 
        description: 'Las Palmas - Atlantic gateway, Spanish culture, volcanic landscapes, Canarian cuisine',
        coordinates: { lat: 28.1248, lon: -15.4300 }
      },
      { 
        day: '10-13', 
        location: 'At Sea - Atlantic Crossing', 
        description: 'Atlantic crossing to South America, sea days, onboard entertainment'
      },
      { 
        day: '14', 
        location: 'Salvador, Brazil', 
        description: 'Salvador - colonial architecture, Afro-Brazilian culture, historic Pelourinho, Brazilian energy',
        coordinates: { lat: -12.9714, lon: -38.5014 }
      },
      { 
        day: '15', 
        location: 'At Sea', 
        description: 'Coastal sailing, Brazilian waters, onboard activities'
      },
      { 
        day: '16', 
        location: 'Rio de Janeiro, Brazil - Overnight', 
        description: 'Rio de Janeiro arrive - overnight stay, Christ the Redeemer, Sugarloaf Mountain, Copacabana Beach, iconic harbour, Carnival vibe',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '17', 
        location: 'Rio de Janeiro, Brazil', 
        description: 'Rio de Janeiro - second day, explore Ipanema, Tijuca Forest, samba culture, Brazilian cuisine',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '18', 
        location: 'At Sea', 
        description: 'Coastal sailing south, Brazilian coastline views'
      },
      { 
        day: '19', 
        location: 'Montevideo, Uruguay', 
        description: 'Montevideo - charming capital, colonial architecture, La Rambla waterfront, Uruguayan culture',
        coordinates: { lat: -34.9011, lon: -56.1645 }
      },
      { 
        day: '20', 
        location: 'Buenos Aires, Argentina - Overnight', 
        description: 'Buenos Aires arrive - overnight stay, tango shows, Recoleta Cemetery, steaks, Pampas culture, Argentine sophistication',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '21', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires - second day, San Telmo markets, La Boca, Iguazu Falls day trip option, tango immersion',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '22', 
        location: 'At Sea', 
        description: 'Sailing south, Patagonian waters approaching'
      },
      { 
        day: '23', 
        location: 'Puerto Madryn, Argentina', 
        description: 'Puerto Madryn - gateway to Peninsula Valdés, whale watching, penguin colonies, Patagonian wildlife',
        coordinates: { lat: -42.7692, lon: -65.0385 }
      },
      { 
        day: '24', 
        location: 'At Sea', 
        description: 'Patagonian sailing, approaching Cape Horn'
      },
      { 
        day: '25', 
        location: 'Ushuaia, Argentina', 
        description: 'Ushuaia - world\'s southernmost city, Tierra del Fuego, Beagle Channel, End of the World, dramatic landscapes',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '26', 
        location: 'Cape Horn (Scenic Cruising)', 
        description: 'Cape Horn - legendary passage, dramatic cliffs, historic significance, weather permitting'
      },
      { 
        day: '27', 
        location: 'At Sea - Chilean Fjords', 
        description: 'Chilean fjords scenic cruising, glaciers, rugged coastline, Patagonian wilderness'
      },
      { 
        day: '28', 
        location: 'Punta Arenas, Chile', 
        description: 'Punta Arenas - Magellan Strait, penguin colonies, Patagonian culture, gateway to Torres del Paine',
        coordinates: { lat: -53.1638, lon: -70.9171 }
      },
      { 
        day: '29-30', 
        location: 'At Sea - Chilean Coast', 
        description: 'Coastal sailing north, Chilean fjords, Pacific waters'
      },
      { 
        day: '31', 
        location: 'Valparaíso, Chile', 
        description: 'Valparaíso - colourful hillside city, UNESCO World Heritage, Chilean culture, gateway to Santiago',
        coordinates: { lat: -33.0472, lon: -71.6127 }
      },
      { 
        day: '32-34', 
        location: 'At Sea - Pacific Crossing', 
        description: 'Pacific crossing to Easter Island, longest sea days, onboard enrichment'
      },
      { 
        day: '35', 
        location: 'Easter Island (Rapa Nui), Chile', 
        description: 'Easter Island - moai statues, Rapa Nui culture, remote Pacific island, archaeological wonder, weather permitting',
        coordinates: { lat: -27.1127, lon: -109.3497 }
      },
      { 
        day: '36-39', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to French Polynesia, tropical waters approaching'
      },
      { 
        day: '40', 
        location: 'Papeete (Tahiti), French Polynesia - Overnight', 
        description: 'Papeete arrive - overnight stay, Tahitian culture, overwater bungalows, turquoise lagoons, French Polynesian paradise',
        coordinates: { lat: -17.5390, lon: -149.5688 }
      },
      { 
        day: '41', 
        location: 'Papeete (Tahiti), French Polynesia', 
        description: 'Tahiti - second day, explore Moorea, coral reefs, tropical paradise, Polynesian hospitality',
        coordinates: { lat: -17.5390, lon: -149.5688 }
      },
      { 
        day: '42', 
        location: 'Moorea, French Polynesia', 
        description: 'Moorea - stunning lagoon, volcanic peaks, overwater bungalows, snorkelling, tropical beauty',
        coordinates: { lat: -17.5388, lon: -149.8295 }
      },
      { 
        day: '43', 
        location: 'Bora Bora, French Polynesia', 
        description: 'Bora Bora - iconic overwater bungalows, Mount Otemanu, turquoise water, coral reefs, ultimate paradise',
        coordinates: { lat: -16.5004, lon: -151.7415 }
      },
      { 
        day: '44-46', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing towards New Zealand, Cook Islands region'
      },
      { 
        day: '47', 
        location: 'Rarotonga, Cook Islands', 
        description: 'Rarotonga - Polynesian culture, pristine beaches, tropical landscapes, South Pacific charm',
        coordinates: { lat: -21.2297, lon: -159.7747 }
      },
      { 
        day: '48-50', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to New Zealand, approaching Australasia'
      },
      { 
        day: '51', 
        location: 'Bay of Islands, New Zealand', 
        description: 'Bay of Islands - pristine beaches, dolphin watching, historic Waitangi, New Zealand beauty',
        coordinates: { lat: -35.2269, lon: 174.1617 }
      },
      { 
        day: '52', 
        location: 'Auckland, New Zealand', 
        description: 'Auckland - City of Sails, Sky Tower, harbour cruises, Maori culture, New Zealand gateway',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '53', 
        location: 'Tauranga, New Zealand', 
        description: 'Tauranga - Mount Maunganui, geothermal wonders, Kiwi culture, beautiful coastline',
        coordinates: { lat: -37.6878, lon: 176.1651 }
      },
      { 
        day: '54', 
        location: 'Wellington, New Zealand', 
        description: 'Wellington - capital city, Te Papa Museum, cable car, wind city, New Zealand culture',
        coordinates: { lat: -41.2865, lon: 174.7762 }
      },
      { 
        day: '55', 
        location: 'Dunedin, New Zealand', 
        description: 'Dunedin - Scottish heritage, Larnach Castle, Otago Peninsula, wildlife, New Zealand charm',
        coordinates: { lat: -45.8741, lon: 170.5036 }
      },
      { 
        day: '56-57', 
        location: 'At Sea - Tasman Sea', 
        description: 'Tasman Sea crossing to Australia, approaching Sydney'
      },
      { 
        day: '58', 
        location: 'Hobart, Tasmania, Australia', 
        description: 'Hobart - historic port, MONA museum, Tasmanian wilderness, Australian culture',
        coordinates: { lat: -42.8821, lon: 147.3272 }
      },
      { 
        day: '59', 
        location: 'At Sea', 
        description: 'Sailing to Sydney, Australian coastline'
      },
      { 
        day: '60', 
        location: 'Sydney, Australia - Overnight', 
        description: 'Sydney arrive - overnight stay, Opera House, Harbour Bridge, iconic skyline, harbour cruises, Australian culture',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '61', 
        location: 'Sydney, Australia', 
        description: 'Sydney - second day, Bondi Beach, Royal Botanic Gardens, Sydney Harbour, Australian lifestyle',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '62', 
        location: 'At Sea', 
        description: 'Sailing north, Pacific islands approaching'
      },
      { 
        day: '63', 
        location: 'Nouméa, New Caledonia', 
        description: 'Nouméa - French Pacific, colonial architecture, tropical beauty, Melanesian culture',
        coordinates: { lat: -22.2558, lon: 166.4509 }
      },
      { 
        day: '64', 
        location: 'At Sea', 
        description: 'Pacific sailing, tropical waters'
      },
      { 
        day: '65', 
        location: 'Port Vila, Vanuatu', 
        description: 'Port Vila - Melanesian culture, tropical paradise, blue holes, Pacific charm',
        coordinates: { lat: -17.7333, lon: 168.3167 }
      },
      { 
        day: '66', 
        location: 'At Sea', 
        description: 'Pacific sailing towards Hawaii'
      },
      { 
        day: '67', 
        location: 'Honolulu, Hawaii, USA', 
        description: 'Honolulu - Waikiki Beach, Pearl Harbor, Diamond Head, Hawaiian culture, Pacific gateway',
        coordinates: { lat: 21.3099, lon: -157.8581 }
      },
      { 
        day: '68', 
        location: 'Lahaina (Maui), Hawaii, USA', 
        description: 'Lahaina - historic whaling town, Maui beauty, Hawaiian culture, tropical paradise',
        coordinates: { lat: 20.8783, lon: -156.6825 }
      },
      { 
        day: '69-73', 
        location: 'At Sea - Pacific', 
        description: 'Pacific crossing to North America, longest sea days'
      },
      { 
        day: '74', 
        location: 'Los Angeles, California, USA', 
        description: 'Los Angeles - Hollywood, Beverly Hills, Santa Monica, West Coast USA, American culture',
        coordinates: { lat: 34.0522, lon: -118.2437 }
      },
      { 
        day: '75', 
        location: 'At Sea', 
        description: 'Coastal sailing, Mexican Riviera approaching'
      },
      { 
        day: '76', 
        location: 'Cabo San Lucas, Mexico', 
        description: 'Cabo San Lucas - Baja California, El Arco, Mexican Riviera, Pacific beauty',
        coordinates: { lat: 22.8905, lon: -109.9167 }
      },
      { 
        day: '77-79', 
        location: 'At Sea - Pacific', 
        description: 'Pacific sailing to Panama Canal'
      },
      { 
        day: '80', 
        location: 'Panama Canal (Full Transit)', 
        description: 'Panama Canal - full daylight transit, engineering marvel, Gatun Locks, Miraflores Locks, Pacific to Atlantic',
        coordinates: { lat: 9.0810, lon: -79.5937 }
      },
      { 
        day: '81', 
        location: 'At Sea - Caribbean', 
        description: 'Caribbean waters, tropical sailing'
      },
      { 
        day: '82', 
        location: 'Aruba', 
        description: 'Aruba - Dutch Caribbean, white sand beaches, turquoise water, Caribbean paradise',
        coordinates: { lat: 12.5211, lon: -70.0370 }
      },
      { 
        day: '83', 
        location: 'Curaçao', 
        description: 'Curaçao - colourful Dutch architecture, Caribbean charm, Willemstad UNESCO site',
        coordinates: { lat: 12.1696, lon: -68.9900 }
      },
      { 
        day: '84', 
        location: 'At Sea', 
        description: 'Caribbean sailing, tropical waters'
      },
      { 
        day: '85', 
        location: 'Barbados', 
        description: 'Barbados - British Caribbean, rum culture, beautiful beaches, Caribbean hospitality',
        coordinates: { lat: 13.1939, lon: -59.5432 }
      },
      { 
        day: '86', 
        location: 'St Maarten', 
        description: 'St Maarten - dual nation island, Maho Beach, Caribbean charm, duty-free shopping',
        coordinates: { lat: 18.0425, lon: -63.0548 }
      },
      { 
        day: '87-91', 
        location: 'At Sea - Atlantic Crossing', 
        description: 'Atlantic crossing to Europe, final sea days, world cruise gala events'
      },
      { 
        day: '92', 
        location: 'Lisbon, Portugal', 
        description: 'Lisbon - historic capital, Belem Tower, Portuguese culture, European return',
        coordinates: { lat: 38.7223, lon: -9.1393 }
      },
      { 
        day: '93', 
        location: 'At Sea', 
        description: 'Mediterranean approaching, final sea day'
      },
      { 
        day: '94', 
        location: 'Barcelona, Spain - Disembark', 
        description: 'Arrive Barcelona, disembark world cruise. Transfer to airport, fly Barcelona → LHR (2hr15 direct)',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      }
    ],
    faqs: [
      {
        question: 'What makes a world cruise different from other long voyages?',
        answer: 'A world cruise offers something no other journey can: the chance to circumnavigate the globe while unpacking only once. You experience the gradual shift of cultures, climates and landscapes as continents give way to oceans and new horizons appear. It is travel at its most immersive-each day building upon the last, each port adding to your understanding of our planet\'s amazing diversity.'
      },
      {
        question: 'Which continents and regions will I experience?',
        answer: 'A full world cruise typically encompasses five continents: Europe, South America, Australasia, Asia or the Pacific Islands, and North America (via the Caribbean and Panama Canal). You will sail through iconic waterways-the Mediterranean, the Atlantic, the Pacific-and call at legendary ports from Rio de Janeiro to Sydney, from Bora Bora to Barcelona.'
      },
      {
        question: 'Is a world cruise only for retirees?',
        answer: 'Not at all. While many world cruisers are retired or semi-retired, an increasing number of professionals take sabbaticals or remote-work voyages. Couples marking significant milestones, solo travellers seeking meaningful connection, and lifelong learners of all ages find the experience equally rewarding. The common thread is a love of travel and a desire for depth over speed.'
      },
      {
        question: 'What is the atmosphere like on such a long voyage?',
        answer: 'World cruises attract a refined, well-travelled clientele. Expect enriching lectures, cultural performances, and fellow passengers who share your curiosity. Sea days become treasured interludes for reading, spa time and new friendships. Gala evenings and themed events punctuate the journey, but the overall pace is relaxed and civilised.'
      },
      {
        question: 'Can I sail only part of the world cruise?',
        answer: 'Absolutely. Most world cruises can be booked in segments-perhaps South America to Australia, or the Pacific crossing alone. This flexibility allows you to experience a substantial portion of the journey without committing to the full four months. Many guests return in future years for different segments.'
      },
      {
        question: 'How physically demanding is a world cruise?',
        answer: 'You set your own pace entirely. Some guests explore every port on foot; others prefer leisurely ship-based days with occasional gentle excursions. Ships offer excellent facilities-pools, spas, libraries, restaurants-so you can be as active or as relaxed as you wish. The journey is designed for comfort, not endurance.'
      }
    ],
    images: [],
    featured: true,
    priority: 1
  },
  {
    id: 'antarctica',
    slug: 'antarctica-expeditions',
    lastUpdated: '2026-01-02',
    title: 'Antarctica Expeditions',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Antarctica Cruise from UK | Expert Guide | Limitless Cruises',
      metaDescription: 'Visiting Antarctica from the UK: best time to go, what to expect, how rough is the Drake Passage. Penguin colonies, expedition cruises, expert advice from specialists.',
      keywords: ['antarctica cruise from uk', 'best time to visit antarctica', 'antarctica expedition cruise', 'drake passage cruise', 'how to get to antarctica from uk']
    },
    
    // Hero
    hero: {
      headline: 'Antarctica',
      subheadline: 'The ultimate bucket list destination for wildlife, wilderness and adventure'
    },
    
    // Simple summary
    tagline: 'Earth\'s last great wilderness',
    heroImage: null,
    cardImage: null,
    duration: '18-22 nights from UK',
    season: 'November - March',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>Antarctica receives approximately 100,000 visitors each year-still fewer than a busy weekend at Stonehenge. It is the only continent with no permanent human population, no native land mammals, and no property ownership. Ninety percent of the world\'s ice is here, along with the largest wildlife colonies on Earth.</p><p>What makes Antarctica remarkable is the wildlife\'s complete lack of fear. Penguins have no natural land predators, so they\'ve never learned to flee from humans. They will waddle over to inspect your boots while their neighbours go about their business metres away. Seals barely lift their heads. Whales surface alongside your boat with what seems like genuine curiosity.</p><p>The landscape is equally impressive. Icebergs the size of cathedrals drift past in shades of blue you didn\'t know existed. Glaciers calve with thunderous cracks. The silence, when it falls, is remarkable-no traffic, no aircraft, no background hum of civilisation. Just you and the ice.</p><p>For British travellers, there\'s added meaning here. This is where Shackleton, Scott and their expeditions made history. You\'ll pass sites of remarkable courage and endurance, and visit research stations continuing that tradition of exploration.</p>'
    },
    
    // Optimal Timing - Factual, helpful breakdown
    optimalTiming: {
      summary: 'The Antarctic season runs from November to March. Ships cannot operate outside these months due to sea ice. Each period offers genuinely different experiences.',
      seasons: [
        {
          name: 'Early Season',
          months: 'November - mid-December',
          highlights: [
            'Penguins courting and building nests',
            'Pristine snow (less muddy than later)',
            'Pack ice can limit landing sites',
            'Fewer whales (still migrating south)'
          ]
        },
        {
          name: 'Peak Season',
          months: 'Mid-December - January',
          highlights: [
            'Penguin chicks hatching',
            'Nearly 24 hours of daylight',
            'Warmest temperatures (around 0°C)',
            'Highest demand-book 12-18 months ahead'
          ]
        },
        {
          name: 'Late Season',
          months: 'February - March',
          highlights: [
            'Peak whale watching (humpbacks especially)',
            'Penguin chicks fledging and swimming',
            'More dramatic icebergs breaking off',
            'Fewer ships, quieter landings'
          ]
        }
      ]
    },
    
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Penguin Colonies',
        highlights: [
          'Typically 10,000-100,000 penguins per colony',
          'Adélie, Chinstrap and Gentoo species',
          'Approach within 5 metres (IAATO rules)',
          'They often approach you first'
        ]
      },
      { 
        theme: 'Zodiac Landings',
        highlights: [
          '2-3 landings per day, weather permitting',
          'Usually 2-3 hours ashore each landing',
          'Wet landings (boots in shallow water)',
          'Small groups of 10-12 passengers'
        ]
      },
      { 
        theme: 'Whale Watching',
        highlights: [
          'Humpback, minke and orca most common',
          'Best in February-March',
          'Often approach Zodiacs',
          'Bubble-net feeding possible in late season'
        ]
      },
      { 
        theme: 'Dramatic Landscapes',
        highlights: [
          'Lemaire Channel (narrow passage, towering cliffs)',
          'Deception Island (volcanic crater you sail into)',
          'Paradise Bay (aptly named)',
          'Icebergs in every shade of blue'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'Antarctica suits some travellers brilliantly and others less so. Here\'s an honest assessment.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Want genuine wilderness rather than a resort. Are comfortable with 2 days at sea each way. Can manage stepping in and out of Zodiacs. Embrace weather changing plans.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You need a guaranteed itinerary (landings depend on conditions). You\'re severely prone to seasickness. You have significant mobility limitations. You want constant connectivity (satellite wifi is slow and expensive).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Moderate fitness for Zodiac boarding and walking on uneven terrain. Many passengers are in their 60s and 70s. Ships have medical facilities. Activity levels can be adjusted.' 
        },
        { 
          type: 'The reality', 
          description: 'About 97% of Antarctic visitors say it exceeded their expectations. Many describe it as the best travel experience of their lives. But it is an expedition, not a holiday-you need to embrace uncertainty.' 
        }
      ]
    },
    cruiseLines: ['Quark Expeditions', 'Hurtigruten', 'Ponant', 'Silversea'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Buenos Aires EZE (13-14hr direct BA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Buenos Aires, Argentina', 
        description: 'Arrive Buenos Aires EZE, transfer to luxury hotel. Check-in, explore Recoleta, tango show, Argentine steaks',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '4', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires free day - San Telmo markets, La Boca, Palermo, cultural immersion, jetlag recovery',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '5', 
        location: 'Buenos Aires → Ushuaia', 
        description: 'Transfer to airport, fly Buenos Aires → Ushuaia (3hr domestic). Arrive Ushuaia, gateway to Antarctica. Check-in hotel',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '6', 
        location: 'Ushuaia - Embark cruise', 
        description: 'Ushuaia exploration - Tierra del Fuego National Park, penguin colonies nearby. Afternoon embark expedition ship',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '7-8', 
        location: 'Drake Passage', 
        description: 'Cross the legendary Drake Passage - expedition team lectures, seabird watching, prepare for Antarctica',
        coordinates: { lat: -60.0, lon: -65.0 }
      },
      { 
        day: '9', 
        location: 'South Shetland Islands', 
        description: 'First Antarctic landings - penguin rookeries, seal colonies, research stations, Zodiac cruising',
        coordinates: { lat: -62.0, lon: -58.0 }
      },
      { 
        day: '10-14', 
        location: 'Antarctic Peninsula', 
        description: 'Daily Zodiac landings - penguin colonies (Adélie, Chinstrap, Gentoo), whale watching, icebergs, pristine wilderness',
        coordinates: { lat: -64.0, lon: -62.0 }
      },
      { 
        day: '15', 
        location: 'Lemaire Channel', 
        description: 'Navigate stunning Lemaire Channel - narrow passage between towering icebergs, kayaking opportunities, photography paradise',
        coordinates: { lat: -65.1, lon: -64.0 }
      },
      { 
        day: '16-17', 
        location: 'Antarctic Peninsula continued', 
        description: 'More Zodiac landings - additional penguin colonies, whale breaches, seal encounters, expedition activities',
        coordinates: { lat: -64.0, lon: -62.0 }
      },
      { 
        day: '18-19', 
        location: 'Drake Passage return', 
        description: 'Cross Drake Passage northbound - reflect on adventure, final lectures, seabird watching, expedition recap',
        coordinates: { lat: -60.0, lon: -65.0 }
      },
      { 
        day: '20', 
        location: 'Ushuaia - Disembark', 
        description: 'Arrive Ushuaia, disembark expedition ship. Transfer to airport, fly Ushuaia → Buenos Aires',
        coordinates: { lat: -54.8019, lon: -68.3030 }
      },
      { 
        day: '21', 
        location: 'Buenos Aires → London Heathrow', 
        description: 'Connect in Buenos Aires, depart EZE → LHR (13-14hr direct BA)',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '22', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'How rough is the Drake Passage?',
        answer: 'The Drake Passage has a fearsome reputation, but the reality varies widely. About 25% of crossings are genuinely rough (4-6 metre swells), 50% are moderate (2-4 metres), and 25% are surprisingly calm. Modern expedition ships have stabilisers that significantly reduce motion. Seasickness medication works for most people-start 24 hours before departure. The crossing takes about 36-48 hours each way. Some itineraries now fly across the Drake, eliminating sea time but adding cost.'
      },
      {
        question: 'What\'s the best month to visit Antarctica?',
        answer: 'December and January offer the most reliable conditions-warmest temperatures (around 0°C), calmest seas, and peak penguin activity with chicks hatching. February-March is best for whale watching, with humpbacks at their most numerous. November has pristine snow but more variable conditions. If you want penguin chicks, aim for late December. If whales matter most, choose late February.'
      },
      {
        question: 'How much does an Antarctica cruise from the UK cost?',
        answer: 'Expect to budget £8,000-£15,000 per person for an 11-12 day expedition cruise, plus £1,500-£3,000 for flights to Ushuaia (via Buenos Aires). Luxury ships and longer itineraries (with South Georgia) can reach £20,000-£40,000. Prices include all meals, landings, Zodiac excursions, and expedition gear loans. The best deals are often for early or late season dates.'
      },
      {
        question: 'Do I need to be physically fit?',
        answer: 'Moderate fitness is sufficient. You need to climb in and out of Zodiacs (rubber boats) with crew assistance, which requires reasonable mobility. Landings involve walking on rocks, snow, or sand-sometimes uneven. The pace is entirely flexible; you can skip landings or do shorter walks. Many passengers are in their 60s and 70s. Ships have medical officers and can accommodate most mobility needs with advance notice.'
      },
      {
        question: 'Will I definitely see penguins and whales?',
        answer: 'Penguins: yes, guaranteed. Every Antarctic itinerary visits penguin colonies, and you\'ll see thousands of them. The question isn\'t if but how many-colonies range from a few hundred to over 100,000 birds. Whales are seasonal: very likely in February-March, less so in November-December. Seals (Weddell, leopard, fur, elephant) are present throughout the season. Wildlife sightings are never guaranteed but rarely disappoint.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'Book 12-18 months ahead for the best cabin selection and pricing. Peak dates (late December-January) on popular ships sell out quickly. However, last-minute deals do exist for unsold cabins-sometimes 20-30% off-if you can travel flexibly. We monitor availability and can advise on both early booking and late offers.'
      }
    ],
    images: [],
    featured: true,
    priority: 2
  },
  {
    id: 'japan-asia',
    slug: 'japan-asia-cruises',
    lastUpdated: '2026-01-02',
    title: 'Japan & Asia',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Japan & Asia Cruise from UK | Cherry Blossom Cruises | Limitless Cruises',
      metaDescription: 'Japan and Asia cruises from the UK. Cherry blossom season, Tokyo to Singapore voyages, best time to visit, what to expect. Expert advice from specialists.',
      keywords: ['japan cruise from uk', 'asia cruise from uk', 'cherry blossom cruise', 'japan sakura cruise', 'asia cruise itinerary']
    },
    
    // Hero
    hero: {
      headline: 'Japan & Asia',
      subheadline: 'Ancient temples, neon cities, and tropical gardens: Asia\'s most beguiling destinations by sea'
    },
    
    // Simple summary
    tagline: 'Ancient temples, neon cities, and tropical gardens: Asia\'s most beguiling destinations by sea',
    heroImage: null,
    cardImage: null,
    duration: '14-21 nights from UK',
    season: 'March - November',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>Asia defies simple description. It is simultaneously ancient and hyper-modern, serene and pulsating, familiar and utterly foreign. A cruise through these waters offers the rare privilege of experiencing this complexity without the exhaustion of constant packing and flights. Watch Japan\'s rugged coastline give way to Korea\'s sweeping bays, then sail south through the turquoise waters of the South China Sea.</p><p>Each port reveals another facet of Asian life. The reverent silence of a Shinto shrine at dawn. The theatrical bustle of Hong Kong\'s harbour at night. The aromatic maze of a Taiwanese night market. The pristine perfection of Singapore\'s botanical gardens. These moments accumulate into an understanding of Asia that no hurried itinerary could provide.</p><p>For food lovers, an Asia cruise is a pilgrimage. Tokyo\'s sushi masters. Busan\'s legendary seafood markets. Hong Kong\'s dim sum temples. Singapore\'s hawker centres, where Michelin-starred dishes cost less than a London coffee. Each port expands your palate and challenges your assumptions about what food can be.</p>'
    },
    optimalTiming: {
      summary: 'Asia offers year-round cruising, with each season bringing distinct advantages. Spring cherry blossoms and autumn colours are particularly prized.',
      seasons: [
        {
          name: 'Cherry Blossom Season',
          months: 'Late March-April',
          highlights: ['Japan\'s sakura at its most magical', 'Pleasant temperatures throughout', 'Festivals and celebrations']
        },
        {
          name: 'Summer',
          months: 'June-August',
          highlights: ['Long days for exploration', 'Vibrant festivals across Asia', 'Peak availability on many ships']
        },
        {
          name: 'Autumn',
          months: 'September-November',
          highlights: ['Japan\'s fiery autumn foliage', 'Cooler, comfortable temperatures', 'Fewer crowds at key sites']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Kyoto\'s Temple Gardens',
        highlights: [
          'Wander through gardens designed to induce contemplation',
          'Every rock and tree placement carries centuries of meaning',
          'Experience the essence of Japanese aesthetics'
        ]
      },
      { 
        theme: 'Hong Kong by Night',
        highlights: [
          'Sail into one of the world\'s most electrifying harbours',
          'A million lights illuminate the Victoria Peak skyline',
          'Iconic harbour views from the water'
        ]
      },
      { 
        theme: 'Tokyo\'s Tsukiji District',
        highlights: [
          'Experience the pulse of the world\'s fish capital',
          'Where sushi is elevated to high art',
          'Authentic Japanese culinary culture'
        ]
      },
      { 
        theme: 'Gardens by the Bay',
        highlights: [
          'Walk amongst Singapore\'s remarkable Supertrees',
          'A vision of urban nature that feels like science fiction made real',
          'Futuristic botanical wonder'
        ]
      },
      { 
        theme: 'Taipei Night Markets',
        highlights: [
          'Lose yourself in the sensory overload of Taiwan\'s legendary after-dark food scene',
          'Street food culture at its finest',
          'Authentic local experiences'
        ]
      },
      { 
        theme: 'The Bund at Dawn',
        highlights: [
          'Watch Shanghai awaken along its famous waterfront',
          'Where East meets West in spectacular fashion',
          'Historic architecture meets modern skyline'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'Asia cruises suit travellers who want to experience diverse cultures without the exhaustion of constant travel.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Love cultural immersion and history. Are fascinated by food and culinary traditions. Want to see multiple destinations without packing and unpacking. Enjoy the contrast between ancient and modern.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You prefer deep immersion in one country (cruises cover multiple). You dislike crowds (some ports can be busy). You need extensive time ashore (port calls are typically 8-12 hours).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Minimal. Most ports have good infrastructure. Some temples and markets involve walking, but pace is flexible. Ships dock centrally in most ports.' 
        },
        { 
          type: 'The reality', 
          description: 'Asia cruises offer an efficient way to sample multiple destinations. You get a taste of each place rather than deep immersion. Perfect for first-time visitors to Asia or those wanting to see several countries in one trip.' 
        }
      ]
    },
    bespokeTailoring: [
      'Open-jaw routing-fly into Tokyo, home from Singapore (or reverse)',
      'Cherry blossom timing for Japan sailings',
      'Pre-cruise nights in Tokyo with cultural experiences',
      'Post-cruise Singapore extensions',
      'Private shore excursions and dining reservations',
      'Flight upgrades and regional UK departures'
    ],
    cruiseLines: ['Celebrity Cruises', 'Holland America Line', 'Ponant'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Tokyo NRT (12hr direct JAL/ANA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Tokyo, Japan', 
        description: 'Arrive Tokyo NRT, transfer to luxury hotel (Park Hyatt or similar). Check-in, explore Shibuya Crossing, Meiji Shrine',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '4', 
        location: 'Tokyo, Japan', 
        description: 'Tokyo free day - sushi omakase, Tsukiji market, traditional ryokan experience, Mount Fuji views',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '5', 
        location: 'Tokyo - Embark cruise', 
        description: 'Transfer to port, embark 12-night Asia cruise. Set sail for Busan',
        coordinates: { lat: 35.7649, lon: 140.3864 }
      },
      { 
        day: '6', 
        location: 'Busan, South Korea', 
        description: 'Busan - Haeundae Beach, Gamcheon Culture Village, Jagalchi Fish Market, temples',
        coordinates: { lat: 35.1796, lon: 129.0756 }
      },
      { 
        day: '7', 
        location: 'At sea', 
        description: 'Relax onboard, cultural enrichment programs, Asian cuisine demonstrations'
      },
      { 
        day: '8', 
        location: 'Kagoshima, Japan', 
        description: 'Kagoshima - active Sakurajima volcano views, Sengan-en Garden, samurai history',
        coordinates: { lat: 31.5968, lon: 130.5571 }
      },
      { 
        day: '9', 
        location: 'Okinawa (Naha), Japan', 
        description: 'Okinawa - pristine beaches, Shuri Castle, traditional Ryukyuan culture, crystal-clear waters',
        coordinates: { lat: 26.2124, lon: 127.6809 }
      },
      { 
        day: '10', 
        location: 'Taipei, Taiwan', 
        description: 'Taipei - night markets, Taipei 101 skyscraper, traditional temples, street food',
        coordinates: { lat: 25.0330, lon: 121.5654 }
      },
      { 
        day: '11', 
        location: 'Hong Kong', 
        description: 'Hong Kong - Victoria Peak, Star Ferry, harbour lights, dim sum, Temple Street Night Market',
        coordinates: { lat: 22.3964, lon: 114.1095 }
      },
      { 
        day: '12', 
        location: 'Shanghai, China', 
        description: 'Shanghai - The Bund, Yu Garden, French Concession, modern skyline, traditional markets',
        coordinates: { lat: 31.2304, lon: 121.4737 }
      },
      { 
        day: '13', 
        location: 'At sea', 
        description: 'Final sea day, prepare for Singapore arrival, onboard activities'
      },
      { 
        day: '14', 
        location: 'Singapore - Disembark', 
        description: 'Arrive Singapore, disembark cruise. Transfer to Marina Bay Sands (2 nights)',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '15', 
        location: 'Singapore', 
        description: 'Singapore - Marina Bay Sands Infinity Pool, Gardens by the Bay, hawker centres, Orchard Road',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '16', 
        location: 'Singapore', 
        description: 'Singapore free day - explore Little India, Chinatown, Sentosa Island, rooftop bars',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '17', 
        location: 'Singapore → London Heathrow', 
        description: 'Transfer to Singapore Changi Airport, depart SIN → LHR (13hr direct)',
        coordinates: { lat: 1.3521, lon: 103.8198 }
      },
      { 
        day: '18', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'Why explore Asia by cruise rather than flying between cities?',
        answer: 'Cruising Asia eliminates the exhaustion of constant airport transfers and hotel check-ins while offering something flights never can: the gradual transition between cultures. You unpack once and wake each morning in a new destination, refreshed rather than jet-lagged. The sea voyage between ports provides time to absorb what you have experienced.'
      },
      {
        question: 'What makes Japan such a great cruise destination?',
        answer: 'Japan from the sea reveals a different country than the familiar Tokyo-Kyoto circuit. Smaller ports like Kagoshima and Naha offer authentic experiences away from crowds. The blend of ancient tradition and cutting-edge modernity is endlessly fascinating, and the legendary Japanese attention to detail extends to everything from garden design to sushi preparation.'
      },
      {
        question: 'Is cherry blossom season really worth timing a cruise around?',
        answer: 'Absolutely. The sakura season transforms Japan into something almost otherworldly-clouds of pale pink against temple walls, petals drifting on still ponds, entire hillsides flushed with colour. It is brief (typically late March to mid-April), which only heightens its poignancy. For those who can time their visit, it is unforgettable.'
      },
      {
        question: 'How diverse is the food experience across Asia?',
        answer: 'Spectacularly so. From the precision of Japanese kaiseki to the sizzle of Hong Kong wok cooking, from Taipei\'s legendary night markets to Singapore\'s Michelin-starred hawker stalls, each port offers entirely distinct culinary traditions. Many cruises feature onboard Asian cooking demonstrations and sake tastings to deepen the experience.'
      },
      {
        question: 'What is the cultural transition like between countries?',
        answer: 'This is one of cruising\'s great advantages. You observe subtle shifts-from Japanese minimalism to Korean warmth to Chinese scale to Singaporean efficiency-without the jarring disconnection of air travel. The sea days between major destinations give you time to reflect and look forward to what\'s next.'
      },
      {
        question: 'Is language a barrier when exploring independently?',
        answer: 'Less than you might expect. English is widely spoken in tourist areas, particularly in Singapore and Hong Kong. In Japan and Korea, younger generations often speak some English, and translation apps have become remarkably effective. The warmth of Asian hospitality goes beyond language-a smile works everywhere.'
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
    lastUpdated: '2026-01-02',
    title: 'Rocky Mountaineer & Alaska',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Rocky Mountaineer & Alaska Cruise from UK | Expert Guide | Limitless Cruises',
      metaDescription: 'Combining the Rocky Mountaineer train with an Alaska cruise from the UK. Canadian Rockies, Inside Passage, best time to go, what to expect. Expert advice.',
      keywords: ['rocky mountaineer alaska cruise', 'canada alaska cruise from uk', 'rocky mountaineer train cruise', 'alaska inside passage cruise', 'canadian rockies cruise']
    },
    
    // Hero
    hero: {
      headline: 'Rocky Mountaineer & Alaska',
      subheadline: 'Glass-domed trains through the Rockies, then Alaska\'s glaciers: Canada\'s best double act'
    },
    
    // Simple summary
    tagline: 'Glass-domed trains through the Rockies, then Alaska\'s glaciers: Canada\'s best double act',
    heroImage: null,
    cardImage: null,
    duration: '14-18 nights from UK',
    season: 'May - September',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>The Rocky Mountaineer is not merely a train-it is a moving theatre of natural wonder. From your glass-domed carriage, watch the landscapes of the Canadian Rockies unfold like a living painting. Snow-dusted peaks give way to rushing rivers. Black bears forage on distant slopes. And every curve in the track reveals another vista that makes you catch your breath.</p><p>This is travel from a more gracious era, where the journey itself is the destination. Gourmet meals appear as you cruise past impossible scenery. Wine flows as freely as the mountain streams below. Fellow passengers become friends, united in shared wonder at what passes beyond the glass.</p><p>The Inside Passage offers an entirely different kind of spectacle. Here, primeval rainforest tumbles down to waters so rich with life that whales, seals and eagles are everyday sightings. Glacier Bay reveals ice formations that have stood for millennia, calving with explosive force into the sea below. Small towns like Ketchikan and Sitka offer glimpses of Alaska\'s unique blend of Native heritage, Russian history and frontier spirit.</p><p>The combination of rail and cruise creates something greater than either alone-a journey through North America\'s most dramatic landscapes in uncompromising comfort.</p>'
    },
    optimalTiming: {
      summary: 'The season runs from May to September, with peak wildlife activity in July and early August. Each month offers distinct advantages.',
      seasons: [
        {
          name: 'Early Season',
          months: 'May-June',
          highlights: ['Snow on mountain peaks', 'Fewer crowds in Banff', 'Longer daylight approaching']
        },
        {
          name: 'Peak Season',
          months: 'July-August',
          highlights: ['Prime wildlife viewing', 'Warmest temperatures', 'Bear activity at its height', 'Whale watching peak']
        },
        {
          name: 'Late Season',
          months: 'September',
          highlights: ['Autumn colours beginning', 'Excellent value', 'Clear skies for photography']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Lake Louise',
        highlights: [
          'Stand before the most photographed lake in Canada',
          'Its impossible turquoise colour is no exaggeration',
          'Iconic Canadian Rockies scenery'
        ]
      },
      { 
        theme: 'Rocky Mountaineer Glass Dome',
        highlights: [
          'Watch peaks, rivers and wildlife parade past your panoramic window',
          'Gourmet meals served as you travel',
          'Unobstructed views of the Canadian Rockies'
        ]
      },
      { 
        theme: 'Glacier Bay',
        highlights: [
          'Witness ancient ice calve into the sea with thunderous force',
          'A spectacle that has humbled observers for centuries',
          'UNESCO World Heritage site'
        ]
      },
      { 
        theme: 'Grizzly Encounters',
        highlights: [
          'Spot bears fishing for salmon along Alaskan streams',
          'A primal scene unchanged since the ice ages',
          'Best viewing in July-August'
        ]
      },
      { 
        theme: 'Whale Watching',
        highlights: [
          'Humpback whales breach and blow throughout the Inside Passage',
          'Often visible right from your ship',
          'Peak season is July-early August'
        ]
      },
      { 
        theme: 'Klondike Gold Rush Towns',
        highlights: [
          'Walk the wooden boardwalks of Skagway',
          'Where prospectors once dreamed of fortune',
          'Historic frontier atmosphere'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'This combination suits travellers who want both rail and cruise experiences in one journey.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Love nature and wildlife. Appreciate premium travel experiences. Want to see both Canadian Rockies and Alaska. Enjoy scenic journeys as much as destinations.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You prefer deep immersion in one place (this covers two regions). You dislike organised tours (train and cruise are structured). You have limited mobility (some excursions involve walking).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Moderate. Train travel is comfortable. Cruise excursions vary-some are easy walks, others more active. Most activities can be tailored to your fitness level.' 
        },
        { 
          type: 'The reality', 
          description: 'This is a premium experience combining two iconic journeys. The Rocky Mountaineer is consistently rated one of the world\'s great train journeys. Alaska\'s Inside Passage offers some of the most spectacular coastal scenery on Earth.' 
        }
      ]
    },
    bespokeTailoring: [
      'Choice of Rocky Mountaineer class-SilverLeaf or GoldLeaf',
      'Extended stays in Banff or Vancouver',
      'Cruise line and cabin selection',
      'Wildlife excursions and bear-watching tours',
      'Private shore excursions in Alaska',
      'Flight upgrades and regional UK departures'
    ],
    cruiseLines: ['Holland America Line', 'Princess Cruises', 'Celebrity Cruises'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Calgary (9hr direct Air Canada/BA)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Calgary → Banff (Fairmont Banff Springs)', 
        description: 'YYC arrival, transfer to Fairmont Banff Springs (2 nights). Arrive in mountain air, check into luxury resort',
        coordinates: { lat: 51.1784, lon: -115.5708 }
      },
      { 
        day: '4', 
        location: 'Banff - Lake Louise', 
        description: 'Lake Louise day trip, Bow Valley hikes, turquoise lakes and mountain vistas',
        coordinates: { lat: 51.4254, lon: -116.1773 }
      },
      { 
        day: '5', 
        location: 'Banff - Free exploration', 
        description: 'Banff free day / Moraine Lake, Johnston Canyon, gondola rides, wildlife viewing',
        coordinates: { lat: 51.1784, lon: -115.5708 }
      },
      { 
        day: '6', 
        location: 'Rocky Mountaineer Scenic Voyager → Kamloops', 
        description: 'Board Scenic Voyager train to Kamloops (overnight train) - glass-dome luxury, gourmet meals, bear spotting',
        coordinates: { lat: 50.6745, lon: -120.3272 }
      },
      { 
        day: '7', 
        location: 'Train → Vancouver', 
        description: 'Scenic Voyager continues to Vancouver, check-in Fairmont Vancouver (1 night)',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '8', 
        location: 'Vancouver', 
        description: 'Vancouver exploration - Seawall, Granville Island, Stanley Park, city vibes',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '9', 
        location: 'Vancouver - Embark cruise', 
        description: 'Embark 7-night Inside Passage cruise (HAL Nieuw Amsterdam/Princess Ruby Princess/Celebrity Solstice)',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '10', 
        location: 'Ketchikan, Alaska', 
        description: 'Ketchikan - totem poles, native culture, salmon capital, eagle viewing',
        coordinates: { lat: 55.3422, lon: -131.6461 }
      },
      { 
        day: '11', 
        location: 'Juneau, Alaska', 
        description: 'Juneau - Mendenhall Glacier, whale watching, Alaska\'s capital, gold rush history',
        coordinates: { lat: 58.3019, lon: -134.4197 }
      },
      { 
        day: '12', 
        location: 'Skagway, Alaska', 
        description: 'Skagway - gold rush history, White Pass Railway, Klondike heritage',
        coordinates: { lat: 59.4583, lon: -135.3089 }
      },
      { 
        day: '13', 
        location: 'Glacier Bay National Park', 
        description: 'Glacier Bay - calving icebergs, seals, tidewater glaciers, UNESCO World Heritage site',
        coordinates: { lat: 58.2232, lon: -136.1075 }
      },
      { 
        day: '14', 
        location: 'Sitka, Alaska', 
        description: 'Sitka - eagles, Russian heritage, native culture, wildlife viewing',
        coordinates: { lat: 57.0531, lon: -135.3300 }
      },
      { 
        day: '15', 
        location: 'At sea', 
        description: 'Sea day - scenic cruising Inside Passage, relax and enjoy ship amenities',
        coordinates: null
      },
      { 
        day: '16', 
        location: 'Victoria, BC', 
        description: 'Victoria - Butchart Gardens, British charm, afternoon tea, coastal beauty',
        coordinates: { lat: 48.4284, lon: -123.3656 }
      },
      { 
        day: '17', 
        location: 'Vancouver - Disembark', 
        description: 'Disembark cruise, final night at Fairmont Vancouver',
        coordinates: { lat: 49.2827, lon: -123.1207 }
      },
      { 
        day: '18', 
        location: 'Vancouver → London Heathrow', 
        description: 'YVR → LHR return flight (10hr direct), journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'What makes the Rocky Mountaineer experience so special?',
        answer: 'The Rocky Mountaineer is consistently rated one of the world\'s great train journeys for good reason. The glass-domed carriages offer unobstructed views of the Canadian Rockies\' most spectacular scenery. Gourmet meals and premium service transform the journey into a moving luxury hotel. And travelling by daylight-the train only operates during daylight hours-ensures you miss nothing.'
      },
      {
        question: 'How do the train and cruise combine logistically?',
        answer: 'Perfectly. The Rocky Mountaineer delivers you to Vancouver, where a short transfer connects you with your Inside Passage cruise. The open-jaw routing means you fly into Calgary and home from Vancouver (or reverse), so there is no backtracking. Every connection is handled - you simply enjoy the journey.'
      },
      {
        question: 'What wildlife might I see on this journey?',
        answer: 'The Canadian Rockies are home to black bears, grizzlies, elk and mountain goats-all commonly spotted from the train. Alaska\'s Inside Passage adds humpback whales, orcas, bald eagles and sea otters. Glacier Bay often reveals seals hauled out on ice floes. July and August offer peak wildlife activity.'
      },
      {
        question: 'Is Glacier Bay really as impressive as photographs suggest?',
        answer: 'More so. Photographs cannot capture the scale-glaciers that dwarf your ship, ice that glows an impossible blue, and the thunderous crash of calving icebergs that reverberates across the water. It is a UNESCO World Heritage site for good reason, and standing on deck as the ship navigates this frozen cathedral is genuinely humbling.'
      },
      {
        question: 'How physically demanding is this journey?',
        answer: 'Not at all. The train requires no physical exertion, and the cruise offers complete flexibility-from gentle port strolls to more adventurous excursions. Banff offers everything from leisurely lakeside walks to more challenging hikes, so you can tailor the experience to your comfort level.'
      },
      {
        question: 'Why do UK travellers particularly love this combination?',
        answer: 'The combination offers two iconic bucket list experiences in one journey-without the logistical complexity of arranging them separately. Direct flights from London make it remarkably accessible, and the calibre of accommodation (Fairmont properties, premium cruise ships) matches British expectations of comfort and service.'
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
    lastUpdated: '2026-01-02',
    title: 'Galápagos Islands',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Galápagos Islands Cruise from UK | Expert Guide | Limitless Cruises',
      metaDescription: 'Galápagos Islands cruises from the UK. Giant tortoises, blue-footed boobies, marine iguanas. Best time to go, what wildlife to expect, expedition options. Expert advice.',
      keywords: ['galapagos cruise from uk', 'galapagos islands cruise', 'galapagos expedition cruise', 'darwin islands cruise', 'ecuador galapagos cruise']
    },
    
    // Hero
    hero: {
      headline: 'Galápagos Islands',
      subheadline: 'Darwin\'s enchanted archipelago: where wildlife writes the rules'
    },
    
    // Simple summary
    tagline: 'Darwin\'s enchanted archipelago: where wildlife writes the rules',
    heroImage: null,
    cardImage: null,
    duration: '10-14 nights from UK',
    season: 'Year-round',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>There is nowhere else on Earth where animals show such complete indifference to human presence. In the Galápagos, sea lions sprawl across your path, blue-footed boobies perform courtship dances at arm\'s length, and giant tortoises-creatures that seem to belong to another era-regard you with prehistoric calm. This volcanic archipelago, straddling the equator six hundred miles off Ecuador\'s coast, inspired Darwin\'s revolutionary insights and continues to amaze visitors with wildlife encounters unlike anywhere else on the planet.</p><p>The Galápagos Islands play by their own rules. Isolated by vast stretches of Pacific Ocean, life here evolved in remarkable directions. Cormorants lost the ability to fly because there were no predators to escape. Tortoises grew to improbable sizes because nothing hunted them. Marine iguanas developed the ability to dive for seaweed-the world\'s only seafaring lizards.</p><p>For visitors, this evolutionary isolation means something special: wildlife that has never learned to fear humans. Animals do not flee as you approach; they continue their business as if you were merely another curious creature in their domain. It is the closest most of us will ever come to a pre-human world.</p><p>The islands are strictly protected, and the best way to experience them is aboard a small expedition vessel with certified naturalist guides. Each day brings new landings-volcanic shores where penguins coexist with tropical fish, lagoons where flamingos wade alongside marine iguanas, cliffs where albatrosses launch their epic migrations.</p>'
    },
    optimalTiming: {
      summary: 'The Galápagos can be visited year-round, with each season offering distinct wildlife highlights. There is no bad time-only different experiences.',
      seasons: [
        {
          name: 'Warm Season',
          months: 'December-May',
          highlights: ['Warmer waters for snorkelling', 'Sea turtle nesting', 'Marine iguana nesting', 'Calmer seas']
        },
        {
          name: 'Cool Season',
          months: 'June-November',
          highlights: ['Peak wildlife activity', 'Blue-footed booby mating dances', 'Albatross breeding on Española', 'Nutrient-rich waters attract more marine life']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Giant Tortoises',
        highlights: [
          'Meet the gentle giants that can live for two centuries',
          'Creatures that seem to belong to the age of dinosaurs',
          'See them in their natural habitat on Santa Cruz and Isabela'
        ]
      },
      { 
        theme: 'Blue-Footed Boobies',
        highlights: [
          'Watch these charismatic birds perform their absurd mating dance',
          'Lifting electric-blue feet in elaborate courtship',
          'Best viewing during cool season (June-November)'
        ]
      },
      { 
        theme: 'Snorkelling with Sea Lions',
        highlights: [
          'Playful sea lion pups spiral around you underwater',
          'Seemingly delighted by human visitors',
          'Some of the world\'s best snorkelling experiences'
        ]
      },
      { 
        theme: 'Marine Iguanas',
        highlights: [
          'Observe the world\'s only sea-going lizards',
          'Basking on volcanic rocks before diving to graze on seaweed',
          'Unique to the Galápagos'
        ]
      },
      { 
        theme: 'Hammerhead Sharks',
        highlights: [
          'Snorkel at volcanic outcrops where schools patrol',
          'Nutrient-rich currents attract large numbers',
          'Best at specific dive sites with experienced guides'
        ]
      },
      { 
        theme: 'Volcanic Landscapes',
        highlights: [
          'Walk across recent lava flows',
          'Islands still being shaped by the Earth\'s geological forces',
          'Dramatic, otherworldly scenery'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'The Galápagos suits travellers who want amazing wildlife encounters and are comfortable with expedition-style travel.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Love wildlife and nature. Are comfortable snorkelling (or willing to learn). Want unique, close-up animal encounters. Appreciate small-group experiences with expert guides.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You dislike small boats (vessels are typically 16-100 passengers). You need constant connectivity (limited wifi). You prefer luxury resorts (this is expedition travel). You cannot swim (snorkelling is a major part of the experience).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Moderate. You need to climb in and out of Zodiacs, walk on uneven volcanic terrain, and snorkel. However, many activities can be tailored to different fitness levels. Ships have medical facilities.' 
        },
        { 
          type: 'The reality', 
          description: 'The Galápagos delivers on its promise of close wildlife encounters. Animals genuinely do not fear humans. You will see things here you cannot see anywhere else on Earth. It is a once-in-a-lifetime experience for most visitors.' 
        }
      ]
    },
    bespokeTailoring: [
      'Choice of expedition vessel-from intimate yachts to luxurious catamarans',
      'Pre-cruise stays in Quito with cultural experiences',
      'Diving add-ons for certified divers',
      'Amazon rainforest extensions',
      'Photography-focused departures',
      'Flight routing and upgrade options'
    ],
    cruiseLines: ['Celebrity Cruises', 'Silversea', 'Hurtigruten', 'Quasar Expeditions'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Quito UIO (12hr via Miami/US connection)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Quito, Ecuador', 
        description: 'Arrive Quito, transfer to JW Marriott. Check-in, altitude acclimatisation, explore UNESCO Old Town',
        coordinates: { lat: -0.2202, lon: -78.5123 }
      },
      { 
        day: '4', 
        location: 'Quito, Ecuador', 
        description: 'Quito free day - Mitad del Mundo equator monument, colonial architecture, Andean culture, continue acclimatisation',
        coordinates: { lat: -0.2202, lon: -78.5123 }
      },
      { 
        day: '5', 
        location: 'Quito → Baltra Airport - Embark', 
        description: 'Transfer to airport, fly Quito → Baltra Airport (2hr domestic). Arrive Baltra, transfer to port, embark expedition ship',
        coordinates: { lat: -0.4531, lon: -90.5947 }
      },
      { 
        day: '6', 
        location: 'Santa Cruz Island', 
        description: 'Santa Cruz - Charles Darwin Research Station, giant tortoise sanctuary, lava tunnels, snorkel with sea lions',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      },
      { 
        day: '7', 
        location: 'Santiago Island', 
        description: 'Santiago - fur seals, lava lizards, marine iguanas, snorkel opportunities, volcanic landscapes',
        coordinates: { lat: -0.2289, lon: -90.9979 }
      },
      { 
        day: '8', 
        location: 'Isabela Island', 
        description: 'Isabela - world\'s largest tortoises in wild, flamingos, volcanic craters, giant tortoise tracking, endemic wildlife',
        coordinates: { lat: -0.9579, lon: -91.0000 }
      },
      { 
        day: '9', 
        location: 'Fernandina Island', 
        description: 'Fernandina - youngest island, marine iguana paradise, flightless cormorants, hammerhead shark snorkel, pristine wilderness',
        coordinates: { lat: -0.2807, lon: -91.6678 }
      },
      { 
        day: '10', 
        location: 'Española Island', 
        description: 'Española - albatross breeding ground, blue-footed booby courtship dances, blowholes, waved albatross, endemic species',
        coordinates: { lat: -1.3703, lon: -89.6049 }
      },
      { 
        day: '11', 
        location: 'Puerto Ayora, Santa Cruz', 
        description: 'Disembark expedition ship, transfer to Puerto Ayora hotel (1 night). Charles Darwin Station visit, tortoise reserve, final wildlife encounters',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      },
      { 
        day: '12', 
        location: 'Puerto Ayora → Quito → London Heathrow', 
        description: 'Transfer to Baltra Airport, fly Puerto Ayora → Quito → LHR (via US connection)',
        coordinates: { lat: -0.7464, lon: -90.3143 }
      }
    ],
    faqs: [
      {
        question: 'Why are the Galápagos Islands so unique for wildlife?',
        answer: 'The islands\' extreme isolation-600 miles from the South American mainland-meant that animals evolved with no land predators and no instinctive fear of larger creatures. The result is wildlife that treats human visitors with remarkable indifference. Blue-footed boobies dance within arm\'s reach. Sea lions pups approach snorkellers to play. It is the closest most of us will come to a world before humanity\'s dominance.'
      },
      {
        question: 'What makes expedition cruising the best way to visit?',
        answer: 'The islands are strictly protected, with visitor numbers carefully managed. Small expedition vessels (typically 16-100 guests) allow access to multiple islands under expert naturalist guidance. Each day brings new landings, new species, new wonder. The intimacy of small ships means you are never competing with crowds for wildlife encounters.'
      },
      {
        question: 'How close can you actually get to the wildlife?',
        answer: 'Remarkably close. Park rules require maintaining a two-metre distance, but the animals frequently close that gap themselves. Sea lions may lounge directly in your path. Boobies perform mating dances at your feet. Giant tortoises lumber past unconcerned. Underwater, sea lions spiral around snorkellers as if delighted by the company.'
      },
      {
        question: 'Is snorkelling suitable for beginners?',
        answer: 'Absolutely. The protected bays offer calm, warm waters ideal for first-time snorkellers. Wetsuits and flotation aids are provided, and naturalist guides accompany every excursion. Even confident swimmers are astounded by what appears below-marine iguanas grazing on underwater rocks, sea turtles drifting past, schools of colourful fish swirling around volcanic formations.'
      },
      {
        question: 'What makes each island different?',
        answer: 'Each island is a unique ecosystem. Española hosts the world\'s only waved albatross breeding colony. Fernandina\'s recent volcanism creates otherworldly lava landscapes. Isabela\'s lagoons attract flamingos and marine iguanas. This diversity means that each day\'s landing reveals entirely new species and experiences.'
      },
      {
        question: 'Is this suitable for families?',
        answer: 'Exceptionally so. Children are captivated by the wildlife encounters and the freedom to observe animals at close range. Many expedition ships offer family-friendly departures with activities designed for younger travellers. The snorkelling is accessible, the landings are manageable, and the educational value is immense.'
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
    lastUpdated: '2026-01-02',
    title: 'Northern Lights & Arctic',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Northern Lights Cruise from UK | Aurora Borealis Norway | Limitless Cruises',
      metaDescription: 'Northern lights cruises from the UK. See the aurora borealis in Norway, best time to go, aurora viewing tips, cruise options. Expert advice.',
      keywords: ['northern lights cruise from uk', 'aurora borealis cruise', 'norway northern lights cruise', 'arctic cruise from uk', 'aurora viewing cruise']
    },
    
    // Hero
    hero: {
      headline: 'Northern Lights & Arctic',
      subheadline: 'Nature\'s greatest light show above Norway\'s dramatic Arctic coast'
    },
    
    // Simple summary
    tagline: 'Nature\'s greatest light show above Norway\'s dramatic Arctic coast',
    heroImage: null,
    cardImage: null,
    duration: '10-14 nights from UK',
    season: 'October - March',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>There are few natural phenomena that genuinely stop you in your tracks. The aurora borealis is one of them. When those ethereal curtains of green, purple and pink begin to dance across the Arctic sky, conversation ceases and you simply watch, transfixed, as the heavens perform. Norway\'s northern coast-from the elegant university town of Tromsø to the frontier settlement of Kirkenes-offers some of Earth\'s best aurora viewing, combined with landscapes of staggering beauty: the Lofoten Islands\' shark-tooth peaks, the sheer cliffs of North Cape, and fjords that seem carved by giants.</p><p>The northern lights are not predictable. They cannot be scheduled or guaranteed. This uncertainty is part of their magic-when the sky ignites with otherworldly colour, you understand why our ancestors wove these lights into their myths. Modern forecasting has improved the odds dramatically, but there remains something wonderfully unpredictable about aurora hunting.</p><p>Norway\'s northern coast offers optimal conditions: the right latitude (inside the aurora zone), often clear skies, and minimal light pollution. Sailing these waters means multiple viewing opportunities-from the ship\'s deck, from remote shore excursions, from the warmth of glass-fronted observation lounges. Each night brings fresh anticipation.</p><p>The coastal voyage reveals Norway at its most dramatic. The Lofoten Islands rise from the sea like a frozen dragon\'s spine, their peaks dusted with snow and their fishing villages painted in traditional red. North Cape-Europe\'s northernmost point-presents sheer cliffs plunging into the Arctic Ocean. And everywhere, the interplay of light and landscape creates moments of extraordinary beauty.</p>'
    },
    optimalTiming: {
      summary: 'The aurora season runs from late September to late March, with peak viewing typically in December through February when nights are longest.',
      seasons: [
        {
          name: 'Early Season',
          months: 'October-November',
          highlights: ['Good aurora probability', 'Some autumn colours remaining', 'Less extreme cold']
        },
        {
          name: 'Peak Season',
          months: 'December-February',
          highlights: ['Longest nights for maximum viewing', 'Polar night atmosphere', 'Best aurora statistics', 'Snow-covered landscapes']
        },
        {
          name: 'Late Season',
          months: 'March',
          highlights: ['Returning daylight', 'Often excellent aurora activity', 'More comfortable temperatures']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Aurora Borealis',
        highlights: [
          'Watch the northern lights dance across the Arctic sky',
          'Nature\'s most spectacular light show',
          'Best viewing December-February with longest nights'
        ]
      },
      { 
        theme: 'The Lofoten Islands',
        highlights: [
          'Dramatic peaks rising from the sea',
          'Traditional fishing villages painted in red',
          'Some of Norway\'s most iconic scenery'
        ]
      },
      { 
        theme: 'North Cape',
        highlights: [
          'Stand at Europe\'s northernmost point',
          '300-metre cliffs drop to the Arctic Ocean',
          'Dramatic Arctic landscape'
        ]
      },
      { 
        theme: 'Husky Sledding',
        highlights: [
          'Race through snowy landscapes behind a team of enthusiastic Arctic dogs',
          'Authentic Arctic experience',
          'Available as shore excursion'
        ]
      },
      { 
        theme: 'Sami Heritage',
        highlights: [
          'Learn about the indigenous people of the Arctic',
          'Reindeer-herding traditions',
          'Rich cultural experiences'
        ]
      },
      { 
        theme: 'Ice Hotel Stay',
        highlights: [
          'Sleep in a room sculpted from ice',
          'An unforgettable Arctic experience',
          'Available as pre or post-cruise extension'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'Northern lights cruises suit travellers who want to see the aurora and experience Arctic winter landscapes.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Want to see the northern lights. Are comfortable with cold weather (proper clothing provided). Enjoy dramatic winter landscapes. Appreciate the unpredictability of nature.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You need guaranteed aurora sightings (they cannot be promised). You dislike cold weather. You prefer warm destinations. You need constant daylight (winter means long nights).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Minimal. Most viewing is from the ship or short excursions. Some activities like husky sledding require basic mobility. Ships are fully heated and comfortable.' 
        },
        { 
          type: 'The reality', 
          description: 'On voyages of 7-10 nights during peak season (December-February), aurora viewing probability is typically 80% or higher. Multiple nights mean multiple opportunities. However, nature cannot be guaranteed.' 
        }
      ]
    },
    bespokeTailoring: [
      'Choice of cruise line and cabin category',
      'Pre-cruise nights in Tromsø with aurora excursions',
      'Post-cruise ice hotel experiences',
      'Husky sledding and snowmobile adventures',
      'Whale watching additions (seasonal)',
      'Flight routing from regional UK airports'
    ],
    cruiseLines: ['Hurtigruten', 'Ponant', 'HX (Hurtigruten Expeditions)'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Tromsø TOS (3hr direct Norwegian/SAS)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Tromsø, Norway', 
        description: 'Arrive Tromsø, transfer to hotel. Check-in, explore Arctic Cathedral, cable car to Mount Storsteinen for panoramic views',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '4', 
        location: 'Tromsø, Norway', 
        description: 'Tromsø free day - aurora hunting tours, whale watching, Sami culture experiences, midnight aurora viewing',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '5', 
        location: 'Tromsø - Embark cruise', 
        description: 'Transfer to port, embark coastal voyage. Set sail north along Norwegian coast, begin aurora watching',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '6', 
        location: 'Lofoten Islands', 
        description: 'Lofoten Islands - Reine fishing village, rugged peaks, red cabins, midnight hikes, dramatic fjord landscapes',
        coordinates: { lat: 68.3500, lon: 14.2500 }
      },
      { 
        day: '7', 
        location: 'At sea - Aurora viewing', 
        description: 'Sea day along Norwegian coast - aurora viewing opportunities, fjord cruising, onboard activities, lights forecast',
        coordinates: { lat: 70.0, lon: 20.0 }
      },
      { 
        day: '8', 
        location: 'Honningsvåg / North Cape', 
        description: 'Honningsvåg - North Cape visit (Europe\'s northernmost point), 1,000ft cliffs, Arctic Ocean views, winter solstice drama',
        coordinates: { lat: 71.1800, lon: 25.7800 }
      },
      { 
        day: '9', 
        location: 'At sea - Lights forecast', 
        description: 'Sea day continuing north - aurora viewing, coastal scenery, expedition lectures, prepare for Kirkenes arrival',
        coordinates: { lat: 70.5, lon: 28.0 }
      },
      { 
        day: '10', 
        location: 'Kirkenes - Disembark', 
        description: 'Arrive Kirkenes, disembark coastal voyage. Transfer to ice hotel, check-in for 2-night stay. Russian border nearby',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '11', 
        location: 'Kirkenes', 
        description: 'Kirkenes - husky sledding, snowmobile adventures, ice hotel experience, Arctic activities, aurora viewing',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '12', 
        location: 'Kirkenes', 
        description: 'Kirkenes free day - Sami reindeer experiences, Russian border walks, ice fishing, additional winter activities',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '13', 
        location: 'Kirkenes → London Heathrow', 
        description: 'Transfer to Kirkenes airport, fly KKN → OSL → LHR (via Oslo connection)',
        coordinates: { lat: 69.7200, lon: 30.0500 }
      },
      { 
        day: '14', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'What are the chances of actually seeing the northern lights?',
        answer: 'On a voyage of 7-10 nights along Norway\'s Arctic coast during peak season (December-February), the statistical probability of witnessing aurora is very high-typically above 80%. Multiple nights at sea and in port mean multiple opportunities. While no natural phenomenon can be guaranteed, the odds are firmly in your favour.'
      },
      {
        question: 'What makes Norway such a good place to see the aurora?',
        answer: 'Norway\'s northern coast sits squarely within the aurora zone-the oval of maximum activity that rings the magnetic pole. The Gulf Stream keeps coastal waters ice-free and creates clearer skies than you might expect at these latitudes. And the dramatic landscapes-fjords, mountains, sea-create a stunning backdrop for the light show above.'
      },
      {
        question: 'How cold is it in the Arctic winter?',
        answer: 'Temperatures typically range from -5°C to -15°C, occasionally colder. Modern Arctic clothing makes this entirely manageable-you dress in layers, and ships provide warm observation areas. Many travellers find the cold invigorating rather than uncomfortable, and stepping out onto the deck to watch the aurora is part of the adventure.'
      },
      {
        question: 'Is this suitable for someone who dislikes cold weather?',
        answer: 'Surprisingly, yes. Ships are warm and comfortable, with heated observation lounges offering aurora viewing without exposure to the elements. Shore excursions provide all necessary gear. Many guests who expected to struggle with the cold find themselves thoroughly enchanted by the winter wonderland atmosphere.'
      },
      {
        question: 'What else is there to see besides the aurora?',
        answer: 'The coastal scenery is spectacular in its own right-the Lofoten Islands, the North Cape, countless fjords. Winter brings possible whale sightings as orcas and humpbacks follow the herring. Shore excursions offer husky sledding, Sami cultural experiences, and visits to traditional fishing villages. The aurora is the headliner, but the supporting cast is impressive.'
      },
      {
        question: 'Is there enough daylight to enjoy the scenery?',
        answer: 'Even during polar night (late November to mid-January), there are hours of beautiful twilight-the famous "blue hour" that photographers prize. As you move toward spring, daylight increases rapidly. The shorter days actually enhance the aurora viewing opportunities while still allowing scenic appreciation during the twilight hours.'
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
    lastUpdated: '2026-01-02',
    title: 'Northern Lights No-Fly from UK',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Northern Lights Cruise from Dover | No-Fly Aurora Cruise | Limitless Cruises',
      metaDescription: 'Northern lights cruise from Dover with no flights. See the aurora borealis from UK ports. Best time to go, what to expect. Expert advice.',
      keywords: ['northern lights cruise from dover', 'no fly northern lights cruise', 'aurora cruise from uk', 'dover northern lights cruise', 'uk port aurora cruise']
    },
    
    // Hero
    hero: {
      headline: 'Northern Lights No-Fly from UK',
      subheadline: 'The aurora experience without a single flight: depart Dover, return home transformed'
    },
    
    // Simple summary
    tagline: 'The aurora experience without a single flight: depart Dover, return home transformed',
    heroImage: null,
    cardImage: null,
    duration: '12-16 nights from Dover',
    season: 'October - March',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>For many UK travellers, the appeal of a no-fly cruise goes beyond convenience-it is about the journey itself. Depart from Dover and watch Britain\'s coast recede, then wake each morning to new horizons: the Art Nouveau architecture of Ålesund, the historic streets of Trondheim, and the dramatic fjords of Norway\'s coast. The highlight is an overnight stay in Tromsø-the aurora capital-where a 24-hour window gives you the best chance of seeing the northern lights. The Scottish islands on your return add Neolithic history and whisky heritage. No airports, no jetlag, just a proper Arctic adventure.</p><p>There is a real pleasure in leaving home without setting foot in an airport. The train or coach to Dover takes less than two hours from London; you step aboard your ship in the afternoon and wake the next morning already at sea. The gradual approach to Norway-watching the latitude numbers climb, feeling the air get crisper-builds anticipation in a way that air travel simply cannot match.</p><p>The real highlight is an overnight stay in Tromsø-one of the best places in the world to see the northern lights. This 24-hour window gives you both evening and early morning viewing opportunities, which significantly increases your chances. The town itself is lovely: the striking Arctic Cathedral, the cable car up Mount Storsteinen, and the friendly atmosphere of Norway\'s northernmost university city.</p>'
    },
    optimalTiming: {
      summary: 'The aurora season runs from October to March, with peak viewing typically December through February when nights are longest and activity is highest.',
      seasons: [
        {
          name: 'Autumn',
          months: 'October-November',
          highlights: ['Good aurora probability', 'Milder temperatures', 'Some daylight for scenic cruising']
        },
        {
          name: 'Deep Winter',
          months: 'December-February',
          highlights: ['Longest nights for aurora viewing', 'Highest aurora activity', 'Snow-covered landscapes']
        },
        {
          name: 'Late Winter',
          months: 'March',
          highlights: ['Returning daylight', 'Still excellent aurora chances', 'More comfortable temperatures']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Aurora from Tromsø',
        highlights: [
          'Overnight stay in Norway\'s aurora capital',
          '24-hour window to witness the northern lights',
          'Both evening and early morning viewing opportunities'
        ]
      },
      { 
        theme: 'Norwegian Fjord Towns',
        highlights: [
          'Explore Art Nouveau Ålesund',
          'Historic Trondheim',
          'Charming coastal villages'
        ]
      },
      { 
        theme: 'Skara Brae',
        highlights: [
          'Walk through a 5,000-year-old Neolithic village',
          'One of Europe\'s most remarkable prehistoric sites',
          'On return journey through Scottish islands'
        ]
      },
      { 
        theme: 'Highland Park Distillery',
        highlights: [
          'Sample single malt whisky in Orkney',
          'Where Norse and Scottish traditions merge',
          'Authentic Scottish heritage experience'
        ]
      },
      { 
        theme: 'Shetland Wildlife',
        highlights: [
          'Spot puffins and seabirds',
          'Islands that feel closer to Norway than Scotland',
          'Rich wildlife viewing opportunities'
        ]
      },
      { 
        theme: 'Sea Day Serenity',
        highlights: [
          'Enjoy the rhythm of days at sea',
          'Lectures, fine dining, and anticipation building',
          'Unhurried journey experience'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'No-fly northern lights cruises suit travellers who want to avoid airports and enjoy a more gradual journey to the Arctic.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Prefer travel without airports. Want a more gradual journey to the Arctic. Enjoy sea days and enrichment. Value the journey as much as the destination.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You have limited time (no-fly cruises are longer). You dislike sea days. You need to get to the Arctic quickly. You prefer flying.' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Minimal. Easy access from UK ports. Most activities are gentle. Ships are fully accessible.' 
        },
        { 
          type: 'The reality', 
          description: 'No-fly cruises offer a unique experience-the journey itself becomes part of the adventure. The overnight in Tromsø provides excellent aurora viewing opportunities. Perfect for those who want to avoid airports entirely.' 
        }
      ]
    },
    bespokeTailoring: [
      'Cabin category and location selection',
      'Specialty dining packages',
      'Shore excursion pre-booking',
      'Private aurora hunting tours in Tromsø',
      'Pre-cruise London hotel stays',
      'Door-to-door transfers to Dover'
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
        day: '3', 
        location: 'At sea - English Channel', 
        description: 'Sea day - English Channel crossing, HAL welcome events, explore ship amenities, BB King Club blues',
        coordinates: { lat: 50.5, lon: 1.0 }
      },
      { 
        day: '4', 
        location: 'Rotterdam, Netherlands', 
        description: 'Arrive Rotterdam - overnight stay, explore windmills, canals, Dutch culture, evening in port',
        coordinates: { lat: 51.9244, lon: 4.4777 }
      },
      { 
        day: '5', 
        location: 'Rotterdam, Netherlands', 
        description: 'Rotterdam - continue exploration, depart afternoon, begin North Sea crossing',
        coordinates: { lat: 51.9244, lon: 4.4777 }
      },
      { 
        day: '6', 
        location: 'At sea - North Sea', 
        description: 'Sea day - North Sea crossing, onboard activities, prepare for Norwegian coast, aurora viewing begins',
        coordinates: { lat: 57.0, lon: 2.0 }
      },
      { 
        day: '7', 
        location: 'Lerwick, Shetland Islands', 
        description: 'Lerwick 08:00-17:00 - Shetland Islands, puffin watching, Jarlshof ruins, Scottish heritage, wildlife',
        coordinates: { lat: 60.1550, lon: -1.1450 }
      },
      { 
        day: '8', 
        location: 'At sea - Norwegian Sea', 
        description: 'Sea day - Norwegian Sea, aurora viewing opportunities, lights forecast, onboard lectures',
        coordinates: { lat: 62.0, lon: 4.0 }
      },
      { 
        day: '9', 
        location: 'Ålesund, Norway', 
        description: 'Ålesund 08:00-17:00 - Art Nouveau architecture, fjord gateway, Norwegian culture, scenic beauty',
        coordinates: { lat: 62.4722, lon: 6.1549 }
      },
      { 
        day: '10', 
        location: 'Trondheim, Norway', 
        description: 'Trondheim 08:00-17:00 - Nidaros Cathedral, historic city, Norwegian heritage, cultural immersion',
        coordinates: { lat: 63.4305, lon: 10.3951 }
      },
      { 
        day: '11', 
        location: 'At sea - Peak aurora sea day', 
        description: 'Sea day - peak aurora viewing day, History Channel Northern Lights lectures, prepare for Tromsø',
        coordinates: { lat: 68.0, lon: 10.0 }
      },
      { 
        day: '12', 
        location: 'Tromsø, Norway - Overnight', 
        description: 'Tromsø arrive 13:00 - overnight stay begins, cable car to Mount Storsteinen, Arctic Cathedral, aurora hunts, 24-hour lights window',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '13', 
        location: 'Tromsø, Norway', 
        description: 'Tromsø - final lights chance, continue aurora viewing, depart 18:00, begin return crossing',
        coordinates: { lat: 69.6500, lon: 18.9600 }
      },
      { 
        day: '14', 
        location: 'At sea - Return crossing', 
        description: 'Sea day - return crossing, reflect on aurora experiences, final onboard activities',
        coordinates: { lat: 65.0, lon: 5.0 }
      },
      { 
        day: '15', 
        location: 'Kirkwall, Orkney Islands', 
        description: 'Kirkwall 08:00-17:00 - Orkney Islands, Skara Brae Neolithic village, Highland Park whisky distillery, Scottish heritage',
        coordinates: { lat: 58.9800, lon: -2.9600 }
      },
      { 
        day: '16', 
        location: 'Dover, UK', 
        description: 'Arrive Dover 07:00 - disembark, journey complete, easy return home via train/coach',
        coordinates: { lat: 51.1294, lon: 1.3089 }
      }
    ],
    faqs: [
      {
        question: 'Why choose a no-fly cruise for the northern lights?',
        answer: 'For many travellers, the appeal goes beyond avoiding airports. Departing from Dover means the journey itself becomes part of the experience-watching Britain recede, waking to Norwegian fjords, arriving in the Arctic having truly travelled to get there. The sea days build anticipation and provide time for enrichment lectures about the aurora.'
      },
      {
        question: 'How likely am I to see the aurora?',
        answer: 'On voyages with an overnight in Tromsø during peak season (December-February), success rates typically exceed 80%. The 24-hour Tromsø window is crucial-it provides both evening and early morning viewing opportunities. Even in shoulder months, the statistical odds are strongly in your favour.'
      },
      {
        question: 'How easy is it to get to Dover?',
        answer: 'Remarkably easy. From London, trains take under two hours from St Pancras or Victoria. Coach services connect from across the UK. Compared to Heathrow or Gatwick, reaching the port is often quicker and always less stressful. Many cruise lines offer parking for those who prefer to drive.'
      },
      {
        question: 'Is this suitable for first-time cruisers?',
        answer: 'Exceptionally so. The gentle pace, no airport stress, and the romance of departing from home shores make this an ideal introduction to cruising. The ships on this route are typically mid-sized and refined rather than overwhelming, with excellent service and food.'
      },
      {
        question: 'What makes the Scottish islands special on this route?',
        answer: 'Orkney and Shetland offer wonderful contrasts to the Norwegian ports. Skara Brae is a 5,000-year-old Neolithic village-amazingly well-preserved. Highland Park distillery produces whisky with distinct Norse influences. Shetland\'s wildlife and Norse heritage feel almost as Arctic as Norway itself.'
      },
      {
        question: 'How cold will it be at sea?',
        answer: 'The ship is fully heated and comfortable. Outside temperatures vary from around 5°C near Britain to well below freezing in Arctic Norway. For aurora viewing on deck, warm layers are essential-but there are also enclosed viewing areas. The cold is part of the atmosphere rather than an obstacle.'
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
    lastUpdated: '2026-01-02',
    title: 'South America',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'South America Cruise from UK | Buenos Aires & Brazil | Limitless Cruises',
      metaDescription: 'South America cruises from the UK. Buenos Aires tango, Rio de Janeiro beaches, Patagonia wildlife, best time to visit. Expert advice.',
      keywords: ['south america cruise from uk', 'buenos aires cruise', 'brazil cruise from uk', 'rio de janeiro cruise', 'south america cruise itinerary']
    },
    
    // Hero
    hero: {
      headline: 'South America',
      subheadline: 'From tango nights in Buenos Aires to Brazil\'s sun-blessed coast'
    },
    
    // Simple summary
    tagline: 'From tango nights in Buenos Aires to Brazil\'s sun-blessed coast',
    heroImage: null,
    cardImage: null,
    duration: '14-18 nights from UK',
    season: 'November - March',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>South America pulses with life in a way that other continents only dream of. In Buenos Aires, tango is not just a dance but a way of being-passionate, precise, utterly absorbing. Rio de Janeiro\'s harbour, with Christ the Redeemer presiding from above, may be the most dramatically sited city on Earth. And Brazil\'s northeastern coast-colonial Salvador, pristine Ilhabela, laid-back Fortaleza-offers beaches, culture, and a warmth of welcome that lingers long after you return home.</p><p>South America moves to its own beat. In Buenos Aires, you feel it in the late-night milongas where couples dance tango until dawn, in the sizzle of steaks over open flames, in the theatrical passion that infuses everyday life. The city is often called the Paris of South America-but it is more than that. It is entirely itself: elegant, dramatic, alive with culture.</p><p>Cruising north along Brazil\'s coast, the rhythm changes but never fades. Samba replaces tango. The colonial grandeur of Salvador gives way to the modernist sweep of Rio. Each port brings new music, new flavours, new perspectives on what it means to embrace life fully.</p><p>There are harbours, and then there is Rio de Janeiro. Sailing beneath Sugarloaf Mountain, with Christ the Redeemer watching from Corcovado, you understand why this place has inspired artists and dreamers for centuries. The city sprawls across the most improbable geography-mountains tumbling to beaches, rainforest pressing against favelas, the Atlantic stretching towards Africa.</p>'
    },
    optimalTiming: {
      summary: 'The South American summer (November-March) offers the best weather, with December to February being peak season. Carnival typically falls in February.',
      seasons: [
        {
          name: 'Early Summer',
          months: 'November-December',
          highlights: ['Warm temperatures', 'Pre-Carnival buzz building', 'Jacaranda blooms in Buenos Aires']
        },
        {
          name: 'Peak Summer',
          months: 'January-February',
          highlights: ['Warmest weather', 'Carnival celebrations', 'Peak beach season', 'Longest days']
        },
        {
          name: 'Late Summer',
          months: 'March',
          highlights: ['Still warm', 'Fewer crowds', 'Excellent value', 'Harvest festivals']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Buenos Aires Tango',
        highlights: [
          'Experience the world\'s most passionate dance in the city where it was born',
          'From street performers to hidden milongas',
          'Late-night tango shows until dawn'
        ]
      },
      { 
        theme: 'Rio\'s Harbour',
        highlights: [
          'Sail into one of Earth\'s most spectacular natural harbours',
          'Sugarloaf and Christ the Redeemer framing the city',
          'Overnight stays allow time to explore'
        ]
      },
      { 
        theme: 'Salvador\'s Pelourinho',
        highlights: [
          'Walk the cobblestone streets of Brazil\'s most atmospheric colonial quarter',
          'Alive with Afro-Brazilian culture',
          'UNESCO World Heritage site'
        ]
      },
      { 
        theme: 'Iguazu Falls Extension',
        highlights: [
          'Add the world\'s most powerful waterfalls',
          '275 cascades straddling the Argentina-Brazil border',
          'Available as pre or post-cruise extension'
        ]
      },
      { 
        theme: 'Argentine Steaks',
        highlights: [
          'Taste some of the world\'s finest beef',
          'Grilled to perfection in traditional parillas',
          'Culinary highlight of Buenos Aires'
        ]
      },
      { 
        theme: 'Fortaleza Dune Buggies',
        highlights: [
          'Race across golden sand dunes',
          'Along Brazil\'s northeastern coast',
          'Adventure activity available as shore excursion'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'South America cruises suit travellers who want to experience Latin American culture, music, and vibrant cities.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Love culture, music and dance. Want to experience vibrant Latin American cities. Enjoy warm weather and beaches. Appreciate passionate, energetic destinations.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You prefer quiet, serene destinations (South America is energetic). You dislike crowds (ports can be busy). You need constant English signage (less common in smaller ports).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Moderate. Ports involve walking and some hills. Rio\'s Sugarloaf and Corcovado require cable car/van access. Most activities are accessible.' 
        },
        { 
          type: 'The reality', 
          description: 'South America offers an intensity of experience that few regions can match. The cultural richness, dramatic landscapes, and warmth of Latin hospitality create a journey that engages every sense. Perfect for those seeking vibrant, passionate destinations.' 
        }
      ]
    },
    bespokeTailoring: [
      'Pre-cruise Buenos Aires stays with tango experiences',
      'Iguazu Falls extensions',
      'Choice of cruise line and cabin category',
      'Rio overnight with cultural excursions',
      'Post-cruise beach extensions in Brazil',
      'Flight routing and upgrade options'
    ],
    cruiseLines: ['Norwegian Cruise Line', 'MSC Cruises', 'Silversea'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Buenos Aires EZE (13hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Buenos Aires, Argentina', 
        description: 'Arrive Buenos Aires EZE, transfer to luxury hotel. Check-in, explore Recoleta, tango show, Argentine steaks',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '4', 
        location: 'Buenos Aires, Argentina', 
        description: 'Buenos Aires free day - tango immersion, San Telmo markets, La Boca, Iguazu Falls day trip option',
        coordinates: { lat: -34.6037, lon: -58.3816 }
      },
      { 
        day: '5', 
        location: 'Montevideo, Uruguay - Embark', 
        description: 'Transfer to Montevideo port, embark South America cruise. Begin coastal masterpiece journey',
        coordinates: { lat: -34.9011, lon: -56.1645 }
      },
      { 
        day: '6', 
        location: 'Punta del Este, Uruguay', 
        description: 'Punta del Este - polo beaches, glamorous resort town, Atlantic coast, Uruguayan culture',
        coordinates: { lat: -34.9475, lon: -54.9336 }
      },
      { 
        day: '7', 
        location: 'Santos (São Paulo), Brazil', 
        description: 'Santos - gateway to São Paulo, Brazilian buzz, urban exploration, coffee culture',
        coordinates: { lat: -23.9608, lon: -46.3332 }
      },
      { 
        day: '8', 
        location: 'Rio de Janeiro, Brazil - Overnight', 
        description: 'Rio de Janeiro arrive - overnight stay, Christ Redeemer, Copacabana, iconic harbour, Carnival vibe',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '9', 
        location: 'Rio de Janeiro, Brazil', 
        description: 'Rio de Janeiro - continue exploration, Sugarloaf Mountain, Ipanema, samba culture, depart afternoon',
        coordinates: { lat: -22.9068, lon: -43.1729 }
      },
      { 
        day: '10', 
        location: 'Ilhabela, Brazil', 
        description: 'Ilhabela - pristine island paradise, tropical beaches, Atlantic rainforest, Brazilian coast beauty',
        coordinates: { lat: -23.7781, lon: -45.3581 }
      },
      { 
        day: '11', 
        location: 'Salvador, Brazil', 
        description: 'Salvador - Bahia colonial charm, Pelourinho historic centre, Afro-Brazilian culture, vibrant city',
        coordinates: { lat: -12.9714, lon: -38.5014 }
      },
      { 
        day: '12', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, prepare for Fortaleza arrival, Brazilian coast cruising',
        coordinates: { lat: -5.0, lon: -35.0 }
      },
      { 
        day: '13', 
        location: 'Fortaleza - Disembark', 
        description: 'Arrive Fortaleza, disembark cruise. Transfer to beach hotel (2 nights). Begin Brazilian coast finale',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '14', 
        location: 'Fortaleza, Brazil', 
        description: 'Fortaleza - beaches, dune buggy adventures, colonial architecture, Brazilian culture, coastal exploration',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '15', 
        location: 'Fortaleza, Brazil', 
        description: 'Fortaleza free day - additional beach time, local markets, seafood dining, final Brazilian experiences',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '16', 
        location: 'Fortaleza → London Heathrow', 
        description: 'Transfer to Fortaleza airport, fly FOR → LHR (via Lisbon/Miami connection)',
        coordinates: { lat: -3.7172, lon: -38.5433 }
      },
      { 
        day: '17', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'What makes South America such a great cruise destination?',
        answer: 'South America offers an intensity of experience that few regions can match. The cultural richness of Buenos Aires and Salvador, the natural drama of Rio\'s harbour and Brazil\'s endless coastline, the warmth of Latin hospitality-all combine into a journey that engages every sense. Cruising allows you to experience this diversity without the exhaustion of constant travel between cities.'
      },
      {
        question: 'Is Buenos Aires really as romantic as its reputation suggests?',
        answer: 'More so. The city has a real sense of drama-the passion of tango, the beautiful old buildings, the steakhouses with their open flames. Late dinners stretch towards midnight. Conversations linger over wine. The pace is relaxed but never dull. For couples, it is an intensely romantic start to any journey.'
      },
      {
        question: 'Should I add Iguazu Falls to my trip?',
        answer: 'If at all possible, yes. Iguazu is not merely a waterfall-it is 275 waterfalls cascading over a vast crescent of cliffs, straddling the Argentina-Brazil border. The scale is almost incomprehensible. A two-day extension from Buenos Aires allows you to experience both sides. Many consider it the trip\'s highlight.'
      },
      {
        question: 'What is the Brazilian coast like?',
        answer: 'Varied and wonderful. Salvador offers colonial architecture and vibrant Afro-Brazilian culture. Ilhabela is a pristine island paradise. Rio needs no introduction. Fortaleza\'s northeastern beaches combine golden sand with dramatic dune landscapes. Each port reveals a different facet of Brazil\'s incredible diversity.'
      },
      {
        question: 'How safe is South America for visitors?',
        answer: 'The main tourist areas and cruise ports are well-accustomed to welcoming international visitors. As with any destination, common-sense precautions apply. The advantage of cruising is that you arrive and depart at secure cruise terminals, with organised excursions into each city\'s highlights.'
      },
      {
        question: 'Is the South American summer comfortable for travel?',
        answer: 'Yes, though expect warmth. Temperatures in Rio and Buenos Aires typically range from 25°C to 35°C in the height of summer. The coastal cruise offers sea breezes and air-conditioned comfort. Light, breathable clothing is recommended, along with sun protection for shore excursions.'
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
    lastUpdated: '2026-01-02',
    title: 'Middle East & Arabian Peninsula',
    
    // SEO - targeting real UK search terms
    seo: {
      metaTitle: 'Middle East Cruise from UK | Dubai & Arabian Peninsula | Limitless Cruises',
      metaDescription: 'Middle East cruises from the UK. Dubai, Abu Dhabi, Petra by land, Arabian Peninsula, best time to visit. Expert advice.',
      keywords: ['middle east cruise from uk', 'dubai cruise from uk', 'arabian peninsula cruise', 'petra cruise', 'red sea cruise from uk']
    },
    
    // Hero
    hero: {
      headline: 'Middle East & Arabian Peninsula',
      subheadline: 'Where ancient civilisations meet futuristic skylines: Arabia\'s golden coast'
    },
    
    // Simple summary
    tagline: 'Where ancient civilisations meet futuristic skylines: Arabia\'s golden coast',
    heroImage: null,
    cardImage: null,
    duration: '10-14 nights from UK',
    season: 'November - April',
    
    // Why This Destination - Real, factual content
    whyBucketListWorthy: {
      narrative: '<p>The Arabian Peninsula offers something increasingly rare in modern travel: the genuine thrill of discovery. Here, ancient trading ports sit beside gleaming skyscrapers. Desert dunes meet turquoise waters. And millennia of history-from Petra\'s rose-red treasury to the Pharaohs\' tombs at Luxor-unfold within reach of the world\'s most ambitious modern cities. For UK travellers seeking winter sun with substance, the Middle East delivers warmth, wonder, and a fascinating window onto cultures both ancient and futuristic.</p><p>Few regions embody contrast as dramatically as the Arabian Peninsula. Dubai\'s Burj Khalifa pierces the desert sky-the world\'s tallest building rising from sands where Bedouin caravans once trekked. Abu Dhabi\'s Sheikh Zayed Grand Mosque represents Islamic architecture at its most refined, while just hours away, Petra\'s treasury stands as testament to the Nabataean civilisation that flourished two thousand years ago.</p><p>Cruising connects these extremes effortlessly. You sail between futuristic skylines and ancient souks, between Omani fjords and Egyptian monuments. Each morning brings a new world, each evening a different perspective on this endlessly fascinating region.</p><p>The Middle East of the cruise ports is not the Middle East of the headlines. This is a region that has invested billions in welcoming visitors, from Qatar\'s Museum of Islamic Art to Oman\'s meticulously restored heritage sites. The warmth of Arabian hospitality-the coffee ceremonies, the genuine interest in guests-often surprises those making their first visit.</p>',
      personaVignettes: [
        { persona: 'The Cultural Explorer', description: 'Those fascinated by the contrast between ancient civilisations and modern ambition find the Middle East endlessly interesting.' },
        { persona: 'The Winter Sun Seeker', description: 'Travellers seeking guaranteed warmth just seven hours from London discover substance beyond the beaches.' },
        { persona: 'The History Enthusiast', description: 'Those drawn to Petra, the Pyramids, and millennia of trading heritage find the region\'s depth remarkable.' }
      ]
    },
    optimalTiming: {
      summary: 'Typical duration: 10-14 nights from UK. The Gulf and Red Sea are at their best from November to April, when temperatures are comfortably warm without the searing heat of summer.',
      seasons: [
        {
          name: 'Early Season',
          months: 'November-December',
          highlights: ['Comfortable temperatures (25-30°C)', 'Festive atmosphere building', 'Excellent visibility for desert excursions']
        },
        {
          name: 'Winter Peak',
          months: 'January-February',
          highlights: ['Perfect weather for sightseeing', 'Peak demand-book early', 'Ideal for Petra and Egypt excursions']
        },
        {
          name: 'Spring',
          months: 'March-April',
          highlights: ['Warming temperatures', 'Longer daylight', 'Good value as season winds down']
        }
      ]
    },
    // What You'll Experience - Practical, real detail
    signatureSights: [
      { 
        theme: 'Dubai\'s Skyline',
        highlights: [
          'Watch the world\'s most ambitious cityscape glitter at sunset',
          'A vision of the future rising from the desert',
          'Burj Khalifa and modern architecture'
        ]
      },
      { 
        theme: 'Sheikh Zayed Grand Mosque',
        highlights: [
          'Walk through one of the world\'s most beautiful mosques',
          'White marble and gold create stunning spaces',
          'Abu Dhabi\'s architectural masterpiece'
        ]
      },
      { 
        theme: 'Petra\'s Treasury',
        highlights: [
          'Emerge through the narrow Siq to behold the rose-red treasury',
          'One of archaeology\'s most dramatic reveals',
          'Available as shore excursion from Aqaba'
        ]
      },
      { 
        theme: 'Muscat\'s Souks',
        highlights: [
          'Lose yourself in the aromatic maze of Mutrah Souq',
          'Frankincense and spices scent the air',
          'Authentic Omani culture'
        ]
      },
      { 
        theme: 'Desert Safari',
        highlights: [
          'Experience the romance of the desert',
          'Dune bashing, Bedouin camps, and stargazing under unpolluted skies',
          'Available as shore excursion'
        ]
      },
      { 
        theme: 'The Pyramids of Giza',
        highlights: [
          'On extended itineraries, visit the last surviving wonder of the ancient world',
          'Available on Red Sea route extensions',
          'Historic Cairo and Egyptian monuments'
        ]
      }
    ],
    
    // Is This Right for You - Honest assessment
    idealVoyagerProfile: {
      intro: 'Middle East cruises suit travellers who want guaranteed winter sun combined with rich cultural experiences.',
      profiles: [
        { 
          type: 'Good fit if you...', 
          description: 'Want guaranteed winter sunshine (just 7 hours from London). Are fascinated by the contrast between ancient and modern. Enjoy cultural exploration. Appreciate warm hospitality.' 
        },
        { 
          type: 'Consider carefully if...', 
          description: 'You have concerns about regional travel (ports are very safe and tourist-focused). You prefer beach-only holidays (this combines culture and relaxation). You dislike organised tours (many excursions are structured).' 
        },
        { 
          type: 'Physical requirements', 
          description: 'Moderate. Most ports have good infrastructure. Petra involves walking through the Siq (about 1.5km). Desert safaris can be bumpy. Most activities are accessible.' 
        },
        { 
          type: 'The reality', 
          description: 'The Middle East of cruise ports is very different from media headlines. This is a region that has invested heavily in welcoming visitors. The warmth of Arabian hospitality often surprises first-time visitors. Perfect for those seeking winter sun with substance.' 
        }
      ]
    },
    bespokeTailoring: [
      'Choice of Gulf-only or Gulf plus Red Sea routing',
      'Pre-cruise Dubai or Abu Dhabi stays with desert experiences',
      'Petra and Luxor/Cairo excursions',
      'Cruise line and cabin category selection',
      'Flight upgrades and regional UK departures',
      'Private shore excursions and cultural experiences'
    ],
    cruiseLines: ['Celebrity Cruises', 'Royal Caribbean', 'MSC Cruises', 'Costa Cruises', 'P&O Cruises'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Dubai (7hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Dubai, UAE', 
        description: 'Dubai hotel stay - Burj Khalifa, fountains, historic creek, Dubai Marina, Dubai Mall, modern skylines',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '4', 
        location: 'Dubai, UAE - Embark', 
        description: 'Embark in Dubai. Overnight in port to enjoy evening city lights, Dubai Harbour or Port Rashid cruise terminals',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '5', 
        location: 'Abu Dhabi, UAE', 
        description: 'Abu Dhabi - Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, Yas Island theme parks, Corniche, Zayed Port',
        coordinates: { lat: 24.4762, lon: 54.3583 }
      },
      { 
        day: '6', 
        location: 'Sir Bani Yas Island, UAE', 
        description: 'Sir Bani Yas Island - beach and wildlife reserve, desert island experience, Arabian Gulf beauty',
        coordinates: { lat: 24.3167, lon: 52.6167 }
      },
      { 
        day: '7', 
        location: 'At Sea', 
        description: 'Arabian Gulf cruising, onboard activities, enrichment programs'
      },
      { 
        day: '8', 
        location: 'Doha, Qatar', 
        description: 'Doha - Souq Waqif, Museum of Islamic Art, National Museum of Qatar, Corniche, futuristic skyline, new-build cruise terminal',
        coordinates: { lat: 25.2773, lon: 51.5275 }
      },
      { 
        day: '9', 
        location: 'At Sea', 
        description: 'Transit through Hormuz region, Arabian Sea cruising'
      },
      { 
        day: '10', 
        location: 'Muscat, Oman', 
        description: 'Muscat - Mutrah Souq, Corniche, Sultan Qaboos Grand Mosque, Omani culture, traditional architecture',
        coordinates: { lat: 23.6207, lon: 58.5666 }
      },
      { 
        day: '11', 
        location: 'At Sea', 
        description: 'Arabian Sea cruising, approaching Red Sea'
      },
      { 
        day: '12', 
        location: 'Safaga or Sokhna, Egypt', 
        description: 'Safaga or Sokhna - optional excursion to Luxor or Cairo, Valley of the Kings, pyramids, ancient Egyptian wonders',
        coordinates: { lat: 26.7333, lon: 33.9333 }
      },
      { 
        day: '13', 
        location: 'Aqaba, Jordan - Disembark', 
        description: 'Aqaba - disembark, Petra or Wadi Rum full-day tour, Jordan\'s only seaport, ancient wonders, desert landscapes',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      },
      { 
        day: '14', 
        location: 'Aqaba → Amman → London Heathrow', 
        description: 'Aqaba → Amman → LHR (or direct return to Dubai by air, depending on preference)',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      }
    ],
    faqs: [
      {
        question: 'Why cruise the Middle East rather than just visiting Dubai?',
        answer: 'A cruise transforms a city break into an odyssey. Yes, you can explore Dubai and Abu Dhabi-but you also wake in Muscat\'s aromatic souks, cruise Omani fjords teeming with dolphins, and potentially reach Petra or the Pyramids. All without packing and unpacking, all in guaranteed winter sunshine.'
      },
      {
        question: 'What makes the Arabian Gulf special for UK travellers?',
        answer: 'The combination of proximity (7 hours from London), guaranteed winter warmth, and genuine cultural depth makes the Gulf uniquely appealing. You escape British winter for desert sunshine, but the experience goes far beyond a beach resort-ancient trading posts, Islamic architecture, and futuristic cities create endless fascination.'
      },
      {
        question: 'Is the Middle East suitable for first-time visitors to the region?',
        answer: 'Exceptionally so. The cruise ports-UAE, Oman, Qatar, Jordan-have invested heavily in tourism infrastructure. Cruise ships provide a comfortable base from which to explore, with organised excursions that navigate any cultural considerations. Many guests find their preconceptions entirely overturned by the warmth and welcome they receive.'
      },
      {
        question: 'Should I add Petra to my itinerary?',
        answer: 'If your routing includes Aqaba, absolutely. Petra is genuinely one of the world\'s great archaeological sites-the moment you emerge through the Siq to behold the Treasury is unforgettable. It is a long day trip from the port, but one that justifies extending your cruise to include Red Sea ports.'
      },
      {
        question: 'What should I wear in the Middle East?',
        answer: 'Onboard, standard cruise dress codes apply. Ashore, lightweight, breathable clothing is ideal for the warmth, but shoulders and knees should be covered when visiting mosques and conservative areas. Women will need a headscarf for mosque visits. Your cruise line will provide specific guidance.'
      },
      {
        question: 'How does the weather compare to UK winter?',
        answer: 'While Britain shivers under grey skies, Gulf temperatures typically range from 25°C to 30°C from November to March-perfect for sightseeing, desert excursions, and lounging by the pool. It is the contrast that makes it so appealing: guaranteed sunshine just seven hours from home.'
      }
    ],
    meta: {
      title: 'Middle East Cruises | Dubai & Arabian Peninsula from UK | Limitless Cruises',
      description: 'Middle East cruise from UK - Dubai skylines, desert dunes and ancient wonders. 10-14 nights including flights. Dubai, Abu Dhabi, Muscat, Doha, Petra. Expert booking from Limitless Cruises.',
      keywords: ['middle east cruise from uk', 'dubai cruise from uk', 'abu dhabi cruise', 'arabian peninsula cruise', 'middle east winter sun', 'dubai abu dhabi cruise', 'petra cruise', 'red sea cruise']
    },
    images: [],
    featured: true,
    priority: 8
  },
  {
    id: 'pacific-new-zealand',
    slug: 'pacific-new-zealand-cruises',
    lastUpdated: '2026-01-02',
    title: 'Pacific Islands & New Zealand',
    
    // SEO
    seo: {
      metaTitle: 'Pacific Islands & New Zealand Cruise: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Discover the South Pacific on a tailored cruise adventure. Fiji\'s coral reefs, Māori culture, volcanic islands-perfect for discerning UK explorers. Enquire for your bespoke itinerary.',
      keywords: ['pacific islands cruise from uk', 'fiji cruise', 'new zealand cruise', 'south pacific cruise', 'maori culture cruise', 'tropical cruise from uk', 'vanuatu cruise', 'new caledonia cruise']
    },
    
    // Hero
    hero: {
      headline: 'Pacific Islands & New Zealand: The Ultimate Tropical Odyssey',
      subheadline: 'Māori culture, volcanic drama, and the turquoise infinity of the South Seas',
      bullets: [
        'Fiji\'s legendary warmth and pristine coral reefs',
        'Living Māori culture and Auckland\'s harbourside charm',
        'New Caledonia\'s French elegance amid the tropics',
        'Volcanic Vanuatu and islands barely touched by time'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: '14-18 nights from UK',
    season: 'November-April',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>The South Pacific has attracted explorers, artists and dreamers for centuries, and it is easy to see why. The light is different here-softer, more golden, filtering through coconut palms onto sand so white it dazzles. The water shifts through countless shades of blue and green, clear enough to reveal reef fish from the surface.</p><p>But the Pacific is more than beaches. It is Fiji\'s genuine warmth of welcome, the traditional kava ceremonies that have honoured guests for generations. It is New Caledonia\'s unexpected French style, baguettes and boutiques alongside Melanesian villages. It is Vanuatu\'s volcanic landscapes and the knowledge that you are experiencing somewhere truly remote. Each island brings something new; each day ends with a sunset that makes you stop and watch.</p><p>Beginning your journey in New Zealand adds cultural and natural depth that pure island-hopping cannot match. The Māori heritage-New Zealand\'s first and living indigenous culture-offers experiences that stay with you: the power of a haka performance, the intricate beauty of carved meeting houses, the deep connection to land and sea. Auckland itself is a wonderful gateway: the City of Sails, surrounded by volcanoes, blessed with harbours and beaches.</p>',
      personaVignettes: [
        { persona: 'The Tropical Dreamer', description: 'Those who have longed for palm-fringed beaches and turquoise lagoons-the South Pacific delivers paradise beyond imagination.' },
        { persona: 'The Cultural Explorer', description: 'Travellers seeking authentic indigenous experiences find the Māori heritage and Fijian hospitality genuinely transformative.' },
        { persona: 'The Underwater Enthusiast', description: 'Snorkellers and divers who seek pristine coral reefs discover some of the world\'s most spectacular marine environments.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Perfect for those who seek genuine escape - warm waters, welcoming cultures, and islands that time seems to have forgotten.',
      profiles: [
        { type: 'Beach Seeker', description: 'Those who dream of powder-white sand, gentle lagoons and the simple pleasure of perfect tropical days.' },
        { type: 'Reef Explorer', description: 'Snorkellers and divers drawn to coral gardens teeming with colourful life in crystal-clear waters.' },
        { type: 'Culture Appreciator', description: 'Travellers who find meaning in traditional ceremonies, village hospitality and indigenous heritage.' },
        { type: 'Escape Artist', description: 'Those craving genuine remoteness-islands where modern life\'s pace cannot reach.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'The Pacific cruising season runs from November to April, coinciding with the Southern Hemisphere summer and avoiding the worst of cyclone risk.',
      seasons: [
        {
          name: 'Early Season',
          months: 'November-December',
          highlights: ['Warming waters', 'Pre-Christmas departures', 'Jacaranda blooms in New Zealand', 'Excellent visibility']
        },
        {
          name: 'Peak Season',
          months: 'January-February',
          highlights: ['Warmest weather', 'Perfect beach conditions', 'School holiday cruises', 'Longest daylight']
        },
        {
          name: 'Late Season',
          months: 'March-April',
          highlights: ['Still warm waters', 'Fewer crowds', 'Exceptional snorkelling', 'Value positioning']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Cultural Immersion', highlights: ['Māori haka performance', 'Fijian kava ceremony', 'Village homestays'] },
      { theme: 'Underwater Wonder', highlights: ['Fiji\'s soft coral capital', 'Nouméa\'s UNESCO lagoon', 'Pristine reef systems'] },
      { theme: 'Volcanic Drama', highlights: ['Vanuatu\'s active craters', 'New Zealand\'s geothermal zones', 'Black sand beaches'] },
      { theme: 'Island Paradise', highlights: ['Dravuni\'s pristine shores', 'Lifou\'s turquoise bays', 'Countless atolls'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Classic Pacific', duration: '14 nights', essence: 'Essential island-hopping', highlights: ['Auckland city stay', 'Fiji coral reefs', 'New Caledonia elegance', 'Key island ports'] },
      { name: 'Immersive South Seas', duration: '18 nights', essence: 'Deep exploration', highlights: ['Extended Auckland time', 'Multiple Fiji islands', 'Vanuatu volcanos', 'Private island visits'] },
      { name: 'Ultimate Pacific', duration: '21+ nights', essence: 'Complete odyssey', highlights: ['New Zealand touring', 'Comprehensive island circuit', 'Remote atoll visits', 'Papua New Guinea'] }
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Carnival Cruise Line'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Auckland AKL (24hr via Asia/Sydney connection)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Auckland, New Zealand', 
        description: 'Arrive Auckland, transfer to hotel. Check-in, explore Sky Tower, Viaduct Harbour, Māori culture',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '4', 
        location: 'Auckland, New Zealand', 
        description: 'Auckland free day - Sky Tower views, Viaduct exploration, Māori cultural experiences, city of sails',
        coordinates: { lat: -36.8485, lon: 174.7633 }
      },
      { 
        day: '5', 
        location: 'Bay of Islands - Embark', 
        description: 'Transfer to Bay of Islands port, embark Pacific cruise. Begin island hopping journey',
        coordinates: { lat: -35.2271, lon: 174.2430 }
      },
      { 
        day: '6', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, prepare for Pacific islands, onboard activities, tropical cruising',
        coordinates: { lat: -30.0, lon: 175.0 }
      },
      { 
        day: '7', 
        location: 'Suva, Fiji', 
        description: 'Suva - Fijian capital, coral reefs, tropical beaches, Fijian culture, island paradise',
        coordinates: { lat: -18.1416, lon: 178.4419 }
      },
      { 
        day: '8', 
        location: 'Dravuni Island, Fiji', 
        description: 'Dravuni Island - pristine tropical paradise, turquoise waters, coral reefs, snorkelling, beach relaxation',
        coordinates: { lat: -18.7833, lon: 178.5167 }
      },
      { 
        day: '9', 
        location: 'Lautoka, Fiji', 
        description: 'Lautoka - sugar city, Fijian culture, tropical landscapes, beach activities, island exploration',
        coordinates: { lat: -17.6244, lon: 177.4528 }
      },
      { 
        day: '10', 
        location: 'Nouméa, New Caledonia', 
        description: 'Nouméa - French Pacific charm, beautiful lagoon, colonial architecture, tropical paradise',
        coordinates: { lat: -22.2558, lon: 166.4508 }
      },
      { 
        day: '11', 
        location: 'Lifou, Loyalty Islands', 
        description: 'Lifou - Loyalty Islands, pristine beaches, coral reefs, French Pacific culture, tropical beauty',
        coordinates: { lat: -20.9167, lon: 167.2333 }
      },
      { 
        day: '12', 
        location: 'Port Vila, Vanuatu', 
        description: 'Port Vila - Vanuatu capital, volcanoes, tropical landscapes, Melanesian culture, island paradise',
        coordinates: { lat: -17.7333, lon: 168.3167 }
      },
      { 
        day: '13', 
        location: 'At sea', 
        description: 'Sea day - relax onboard, reflect on island experiences, prepare for final port, tropical cruising',
        coordinates: { lat: -12.0, lon: 165.0 }
      },
      { 
        day: '14', 
        location: 'Final port - Disembark', 
        description: 'Arrive final port (Port Moresby or Cairns), disembark cruise. Transfer to hotel (2 nights). Begin tropical finale',
        coordinates: { lat: -9.4438, lon: 147.1803 } // Port Moresby default, can be Cairns
      },
      { 
        day: '15', 
        location: 'Final port', 
        description: 'Final port free day - beach relaxation, Barrier Reef tie-in (if Cairns), tropical exploration, local culture',
        coordinates: { lat: -9.4438, lon: 147.1803 }
      },
      { 
        day: '16', 
        location: 'Final port → London Heathrow', 
        description: 'Transfer to airport, fly final port → LHR (24hr via Asia/Sydney connection)',
        coordinates: { lat: -9.4438, lon: 147.1803 }
      },
      { 
        day: '17', 
        location: 'London Heathrow (LHR)', 
        description: 'Arrive LHR, journey complete',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      }
    ],
    faqs: [
      {
        question: 'What makes the South Pacific such a great cruise destination?',
        answer: 'The South Pacific offers something increasingly rare: genuine remoteness combined with stunning natural beauty. These islands are not easily reached by other means, but a cruise connects them effortlessly-you wake each morning to a new paradise. The cultures are welcoming, the waters warm, and the sense of escape complete.'
      },
      {
        question: 'Why do UK explorers choose to discover the Pacific by cruise?',
        answer: 'A cruise is the perfect way to experience multiple islands without constant repacking. You sail overnight while you sleep, wake in a new tropical paradise, and never face the logistical challenges of inter-island flights. The ship becomes your floating resort between destinations.'
      },
      {
        question: 'What is the appeal of experiencing Māori culture firsthand?',
        answer: 'The Māori heritage of New Zealand offers meaningful cultural experiences-the power of a haka performance, the artistry of traditional carving, the deep connection to land and sea. These are not performances for tourists but living traditions that welcome respectful visitors into ancient customs.'
      },
      {
        question: 'How does snorkelling in the South Pacific compare to other destinations?',
        answer: 'Many consider Pacific reefs among the world\'s finest. Fiji in particular offers exceptional coral health and fish diversity, earning its reputation as the "soft coral capital of the world." The waters are warm, clear, and uncrowded-even casual snorkellers encounter amazing marine life.'
      },
      {
        question: 'What makes Fijian hospitality so legendary?',
        answer: 'The warmth is genuine. Fijians have a gift for making visitors feel welcome-the famous "Bula" greeting is just the beginning. Kava ceremonies, village visits, and simply chatting with locals reveal a culture that values connection and celebration. It is hospitality that goes far beyond the transactional.'
      },
      {
        question: 'Is the journey from the UK manageable?',
        answer: 'Auckland is approximately 24 hours from London, typically via Singapore, Hong Kong, or Sydney. It is a significant journey, but the destinations justify the effort entirely. Many travellers break the journey with a stopover in Asia or Australia. Once there, the cruise itself is pure relaxation.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every Pacific journey tailored around your interests - from dive sites to cultural experiences.' },
        { title: 'UK Expertise', description: 'Specialists who understand British sensibilities and the journey from the UK.' },
        { title: 'Intimate Voyages', description: 'Access to vessels and itineraries that larger operators cannot offer.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind.' }
      ],
      testimonials: [
        { quote: 'The snorkelling in Fiji was the best of our lives. Every island was more beautiful than the last.', author: 'James & Catherine', location: 'Hampshire' },
        { quote: 'The Māori cultural experience in Auckland set the tone for the entire voyage-deeply moving.', author: 'Dr Richard M.', location: 'Edinburgh' }
      ]
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
    lastUpdated: '2026-01-02',
    title: 'Transatlantic Crossings',
    
    // SEO
    seo: {
      metaTitle: 'Transatlantic Crossing: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Experience the classic Southampton to New York crossing on Queen Mary 2. Elegant ocean liner tradition, no-fly outbound, Manhattan finale. Enquire for your bespoke voyage.',
      keywords: ['transatlantic crossing from uk', 'queen mary 2 crossing', 'southampton to new york cruise', 'cunard transatlantic', 'no fly cruise to america', 'ocean liner crossing', 'classic transatlantic voyage']
    },
    
    // Hero
    hero: {
      headline: 'Transatlantic Crossing: The Original Ocean Voyage',
      subheadline: 'Cross the mighty Atlantic as travellers have for centuries-in elegant ocean liner style',
      bullets: [
        'Southampton departure-no airports, no jetlag',
        'Seven days of pure ocean liner elegance',
        'Sail into New York harbour past the Statue of Liberty',
        'The romance of sea travel rediscovered'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: '10 nights from UK',
    season: 'April - May, October - November (repositioning season)',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>There is something genuinely satisfying about crossing an ocean the proper way-not hurtled through the sky in hours, but sailing across the Atlantic over several days. The transatlantic crossing is the original voyage, the journey that connected the Old World to the New, and it remains one of travel\'s great pleasures.</p><p>From Southampton-that historic port from which so many famous crossings departed-you set sail into the Atlantic. Seven days of sea stretch before you: days of interesting lectures and afternoon tea, of gala nights and stargazing from the deck, of watching the horizon and letting the rhythm of the ocean slow your pace of life.</p><p>And then, the arrival. New York harbour appears gradually: first the distant glitter of the skyline, then the unmistakable silhouette of the Statue of Liberty, and finally the towers of Manhattan rising before you. It is an arrival that no aeroplane can match-a moment of real excitement that connects you to generations of travellers who made this same approach.</p>',
      personaVignettes: [
        { persona: 'The Romantic Classicist', description: 'Those who yearn for travel\'s golden age find the transatlantic crossing a living embodiment of elegant, unhurried journeys.' },
        { persona: 'The Thoughtful Traveller', description: 'Voyagers who prefer depth to speed, who want the journey itself to be the experience, not merely a means to an end.' },
        { persona: 'The No-Fly Seeker', description: 'Travellers who choose not to fly-whether for environmental reasons or personal preference-find the perfect solution.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Designed for those who understand that how you travel matters as much as where you travel.',
      profiles: [
        { type: 'Ocean Purist', description: 'Those who relish the vastness of the Atlantic and the special quality of days spent entirely at sea.' },
        { type: 'Elegance Seeker', description: 'Travellers drawn to the formal traditions-gala nights, afternoon tea, the ballroom-that define ocean liner culture.' },
        { type: 'City Discoverer', description: 'Those who dream of arriving in New York by sea and experiencing Manhattan with the perspective of a true arrival.' },
        { type: 'Sustainable Voyager', description: 'Environmentally conscious travellers who prefer sea travel to flying where the journey allows.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'Transatlantic crossings operate year-round, with peak seasons in spring and autumn when repositioning cruises also traverse this route.',
      seasons: [
        {
          name: 'Spring Crossings',
          months: 'April-May',
          highlights: ['Eastbound repositioning season', 'Pleasant Atlantic conditions', 'New York in bloom', 'Longer days']
        },
        {
          name: 'Summer Season',
          months: 'June-August',
          highlights: ['Warmest weather', 'Longest daylight', 'Regular weekly QM2 crossings', 'Peak Manhattan energy']
        },
        {
          name: 'Autumn Crossings',
          months: 'September-November',
          highlights: ['Westbound repositioning', 'Fall foliage in NYC', 'Cooler Atlantic air', 'Dramatic skies']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Ocean Days', highlights: ['Endless Atlantic horizon', 'Stargazing at sea', 'Sunrise from the deck'] },
      { theme: 'Liner Traditions', highlights: ['Gala evenings', 'Afternoon tea ritual', 'QM2 Planetarium'] },
      { theme: 'New York Arrival', highlights: ['Statue of Liberty sail-past', 'Manhattan skyline reveal', 'Hudson River berth'] },
      { theme: 'Manhattan Magic', highlights: ['Top of the Rock views', 'Central Park strolls', 'Broadway spectacles'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Classic Crossing', duration: '10 nights', essence: 'Essential transatlantic', highlights: ['Southampton departure', '7-night crossing', '2 nights NYC', 'Flight home'] },
      { name: 'Extended Manhattan', duration: '12 nights', essence: 'Deeper New York', highlights: ['Southampton departure', '7-night crossing', '4 nights NYC', 'Comprehensive exploration'] },
      { name: 'Round Voyage', duration: '17 nights', essence: 'There and back', highlights: ['Southampton to NYC', 'Manhattan interlude', 'Return crossing', 'No flying required'] }
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
        day: '3', 
        location: 'At sea - Atlantic crossing', 
        description: 'First sea day - explore ship amenities, enrichment lectures, afternoon tea, begin ocean crossing',
        coordinates: { lat: 50.0, lon: -10.0 }
      },
      { 
        day: '4', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - QM2 Planetarium (if on Cunard), world-class entertainment, fine dining, relaxation',
        coordinates: { lat: 48.0, lon: -20.0 }
      },
      { 
        day: '5', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - gala nights, formal dining, enrichment programs, spa treatments, ocean views',
        coordinates: { lat: 46.0, lon: -30.0 }
      },
      { 
        day: '6', 
        location: 'At sea - Atlantic crossing', 
        description: 'Mid-Atlantic - halfway point, onboard activities, lectures, afternoon tea, elegant evenings',
        coordinates: { lat: 44.0, lon: -40.0 }
      },
      { 
        day: '7', 
        location: 'At sea - Atlantic crossing', 
        description: 'Sea day - approaching North America, final gala night, entertainment, fine dining',
        coordinates: { lat: 42.0, lon: -50.0 }
      },
      { 
        day: '8', 
        location: 'At sea - Atlantic crossing', 
        description: 'Final sea day - prepare for New York arrival, enrichment lectures, onboard activities',
        coordinates: { lat: 40.5, lon: -60.0 }
      },
      { 
        day: '9', 
        location: 'New York, USA - Arrive & Disembark', 
        description: 'Arrive New York harbour - sail past Statue of Liberty, iconic skyline arrival. Disembark, transfer to Manhattan hotel (2 nights)',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      { 
        day: '10', 
        location: 'New York, USA', 
        description: 'New York free day - Statue of Liberty visit, Top of Rock observation deck, Manhattan exploration, Broadway shows',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      { 
        day: '11', 
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
      { quote: 'Arriving in New York by sea, passing the Statue of Liberty, was absolutely magical. The crossing was so relaxing-no jetlag!', author: 'William & Mary', location: 'Kent' },
      { quote: 'Queen Mary 2 is simply the most elegant way to cross the Atlantic. The ballroom, the Planetarium, the service-perfection.', author: 'Elizabeth T.', location: 'Surrey' },
      { quote: 'No-fly made it perfect. 7 days at sea, then 2 nights in NYC. The perfect combination of relaxation and city excitement.', author: 'Classicists', location: 'London' }
    ],
    faqs: [
      {
        question: 'What makes the transatlantic crossing such an iconic voyage?',
        answer: 'The transatlantic crossing connects you to over a century of maritime heritage-the same route taken by generations of emigrants, adventurers, and celebrities. Arriving in New York by sea, sailing past the Statue of Liberty as millions before you have done, is a moment of genuine historical resonance.'
      },
      {
        question: 'Why do UK travellers choose to cross by ship rather than fly?',
        answer: 'For many, the journey is the point. Seven days of pure relaxation, no jet lag, no airports-just the pleasure of ocean travel, enrichment lectures, elegant dining, and the satisfaction of crossing an ocean the way it was meant to be crossed. It is travel as an experience, not merely transportation.'
      },
      {
        question: 'What is special about sailing into New York harbour?',
        answer: 'The approach to New York by sea is one of travel\'s great arrivals. The distant shimmer of the skyline gradually resolves into recognisable towers, the Statue of Liberty passes close enough to photograph, and Manhattan reveals itself in all its drama. It is an arrival that stays with you forever.'
      },
      {
        question: 'How does Queen Mary 2 differ from other cruise ships?',
        answer: 'Queen Mary 2 is the last true ocean liner in service-built specifically for Atlantic crossings rather than adapted from a cruise ship. Her hull is designed for the North Atlantic, her spaces celebrate the ocean liner tradition, and her weekly crossings maintain a schedule that has continued for generations.'
      },
      {
        question: 'What is the experience of days at sea like?',
        answer: 'Sea days on an Atlantic crossing are uniquely restful. The vastness of the ocean, the rhythm of the ship, the endless horizon-they combine to create a meditative quality. Add enrichment lectures, afternoon tea, gala evenings, and the simple pleasure of watching the waves, and the time passes too quickly.'
      },
      {
        question: 'Is a transatlantic crossing suitable for first-time cruisers?',
        answer: 'Absolutely. The pace is gentle, the routine quickly becomes familiar, and the absence of constant port calls allows genuine relaxation. Many travellers who have never considered cruising find the transatlantic crossing opens their eyes to the pleasures of sea travel.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes-all transfers between Southampton port, New York hotel, and JFK airport are featured. Private transfers also available. No need to navigate with luggage.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes-all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this classic ocean crossing journey.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every crossing tailored to your preferences-cabin choice, Manhattan experiences, extensions.' },
        { title: 'UK Expertise', description: 'Southampton specialists who understand the transatlantic tradition.' },
        { title: 'Ocean Liner Heritage', description: 'Deep knowledge of Queen Mary 2 and the crossing experience.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind.' }
      ],
      testimonials: [
        { quote: 'Arriving in New York by sea, passing the Statue of Liberty, was absolutely magical. The crossing was so relaxing-no jet lag!', author: 'William & Mary', location: 'Kent' },
        { quote: 'Queen Mary 2 is simply the most elegant way to cross the Atlantic. The ballroom, the Planetarium, the service-perfection.', author: 'Elizabeth T.', location: 'Surrey' }
      ]
    },
    
    images: [],
    featured: true,
    priority: 10
  },
  {
    id: 'iceland-circumnavigation',
    slug: 'iceland-circumnavigation',
    lastUpdated: '2026-01-02',
    title: 'Iceland Circumnavigation',
    
    // SEO
    seo: {
      metaTitle: 'Iceland Circumnavigation: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Complete the Ring of Fire by sea-from Reykjavik\'s geothermal wonders to the remote East Fjords. Volcano landings, puffin colonies, midnight sun. Enquire for your bespoke voyage.',
      keywords: ['iceland cruise from uk', 'iceland circumnavigation', 'ring of iceland cruise', 'volcano cruise iceland', 'puffin cruise from uk', 'midnight sun cruise', 'reykjavik cruise']
    },
    
    // Hero
    hero: {
      headline: 'Iceland Circumnavigation: Complete the Ring of Fire',
      subheadline: 'Volcanic shores, puffin cliffs, and the ethereal light of the midnight sun',
      bullets: [
        'Complete circumnavigation-every coast, every wonder',
        'Volcano landings and puffin colony encounters',
        'The otherworldly Westfjords and dramatic East',
        'Midnight sun sailing through Arctic waters'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: '12 nights from UK',
    season: 'May - September (summer light, midnight sun)',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>Iceland is a land still being formed-volcanoes erupting, glaciers carving, geysers spouting. To circumnavigate this island is to witness Earth\'s raw creative forces in action, from the fire beneath your feet to the ice on the horizon. No other destination offers such concentrated geological drama.</p><p>A sea voyage reveals Iceland that road travellers miss entirely. The remote Westfjords, barely accessible by land, open their arms to small ships that anchor in pristine fjords. The wild east coast, with its towering basalt cliffs and rainbow-coloured villages, unfolds naturally as you sail from one sheltered harbour to the next.</p><p>And there is the light. From late May through July, the sun barely sets. At midnight you stand on deck watching golden light play across volcanic peaks, the distinction between day and night suspended. Combined with puffin colonies numbering in the millions and whales breaching in northern waters, an Iceland circumnavigation creates memories that burn bright for a lifetime.</p>',
      personaVignettes: [
        { persona: 'The Geology Enthusiast', description: 'Those fascinated by Earth\'s forces find Iceland\'s active volcanoes, geysers and thermal springs endlessly fascinating.' },
        { persona: 'The Wildlife Seeker', description: 'Travellers who dream of puffin colonies, breaching whales and Arctic seabird cliffs in their natural habitat.' },
        { persona: 'The Photographer', description: 'Those who seek amazing light-the midnight sun creates golden hours that last for days.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Ideal for those who seek raw natural beauty and the thrill of lands where nature still dominates.',
      profiles: [
        { type: 'Nature Purist', description: 'Those who find their greatest joy in landscapes untamed by human hands.' },
        { type: 'Active Explorer', description: 'Travellers eager for Zodiac landings, coastal hikes and close wildlife encounters.' },
        { type: 'Light Chaser', description: 'Photographers and dreamers drawn to the ethereal quality of Arctic summer light.' },
        { type: 'Geological Pilgrim', description: 'Those who want to stand on newly formed land and feel Earth\'s pulse.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'The Iceland season runs from May to September, with peak midnight sun conditions in June and July. Each month offers distinct experiences.',
      seasons: [
        {
          name: 'Early Season',
          months: 'May-early June',
          highlights: ['Puffin arrivals', 'Spring waterfalls', 'Longer daylight building', 'Fewer visitors']
        },
        {
          name: 'Peak Midnight Sun',
          months: 'Mid-June-July',
          highlights: ['24-hour daylight', 'Warmest temperatures', 'Peak wildlife activity', 'Optimal photography']
        },
        {
          name: 'Late Season',
          months: 'August-September',
          highlights: ['Northern lights possible', 'Autumn colours', 'Whale watching peak', 'Quieter fjords']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Volcanic Power', highlights: ['Heimaey volcano landing', 'Eldfell crater walk', 'Lava field exploration'] },
      { theme: 'Wildlife Wonders', highlights: ['Puffin colonies', 'Whale encounters', 'Arctic seabird cliffs'] },
      { theme: 'Fjord Drama', highlights: ['Remote Westfjords', 'Ísafjörður hot springs', 'East Fjords waterfalls'] },
      { theme: 'Arctic Light', highlights: ['Midnight sun sailing', 'Golden hour photography', 'Ethereal landscapes'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Classic Circumnavigation', duration: '12 nights', essence: 'Complete ring', highlights: ['Reykjavik stay', 'Full circumnavigation', 'East Fjords finale', 'Key wildlife sites'] },
      { name: 'Extended Exploration', duration: '15 nights', essence: 'Deeper immersion', highlights: ['Golden Circle touring', 'Longer cruise', 'Remote stops', 'Glacier visits'] },
      { name: 'Photography Special', duration: '14 nights', essence: 'Optimal light', highlights: ['Midnight sun timing', 'Extended shore time', 'Expert guides', 'Prime locations'] }
    ],
    cruiseLines: ['Ambassador Cruise Line', 'Fred. Olsen', 'Ponant'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Reykjavik KEF (3hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Reykjavik, Iceland', 
        description: 'Arrive Reykjavik, transfer to hotel. Check-in, explore Harpa Concert Hall, Reykjavik city centre',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '4', 
        location: 'Reykjavik, Iceland', 
        description: 'Reykjavik free day - Blue Lagoon geothermal spa, Golden Circle tour option, Icelandic culture',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '5', 
        location: 'Reykjavik - Embark cruise', 
        description: 'Transfer to port, embark circumnavigation cruise. Set sail for Westmann Islands, begin ring of fire journey',
        coordinates: { lat: 64.1460, lon: -21.9420 }
      },
      { 
        day: '6', 
        location: 'Heimaey, Westmann Islands', 
        description: 'Heimaey - Eldfell volcano tender landing, puffin colonies, volcanic landscapes, dramatic cliffs',
        coordinates: { lat: 63.4420, lon: -20.2760 }
      },
      { 
        day: '7', 
        location: 'Patreksfjörður, Westfjords', 
        description: 'Patreksfjörður - remote Westfjords, seabird cliffs, dramatic coastline, Icelandic wilderness',
        coordinates: { lat: 65.5970, lon: -23.9960 }
      },
      { 
        day: '8', 
        location: 'Ísafjörður, Westfjords', 
        description: 'Ísafjörður - hot springs, fishing heritage, Arctic Circle proximity, fjord beauty',
        coordinates: { lat: 66.0750, lon: -23.1350 }
      },
      { 
        day: '9', 
        location: 'At sea / Ísafjarðardjúp', 
        description: 'Sea day - navigate Ísafjarðardjúp fjord system, onboard activities, midnight sun viewing',
        coordinates: { lat: 66.0, lon: -23.0 }
      },
      { 
        day: '10', 
        location: 'Akureyri, North Iceland', 
        description: 'Akureyri - whale watching capital, Godafoss waterfall, botanical gardens, northern gateway',
        coordinates: { lat: 65.6830, lon: -18.0880 }
      },
      { 
        day: '11', 
        location: 'Siglufjörður, North Iceland', 
        description: 'Siglufjörður - herring fishing heritage, Arctic Circle, dramatic fjord landscapes',
        coordinates: { lat: 66.1500, lon: -18.9167 }
      },
      { 
        day: '12', 
        location: 'Seyðisfjörður - Disembark', 
        description: 'Arrive Seyðisfjörður, disembark cruise. Transfer to East Fjords hotel (2 nights). Rainbow street, waterfalls nearby',
        coordinates: { lat: 65.2560, lon: -14.0100 }
      },
      { 
        day: '13', 
        location: 'East Fjords', 
        description: 'East Fjords free day - waterfalls, hiking trails, Icelandic horses, dramatic landscapes, local culture',
        coordinates: { lat: 65.2560, lon: -14.0100 }
      },
      { 
        day: '14', 
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
      { quote: 'Heimaey volcano landing-unreal. The tender approach to Eldfell was unforgettable. Iceland by sea is the only way.', author: 'Iceland first-timers', location: 'London' },
      { quote: 'The puffin colonies and midnight sun sailing were magical. Every fjord was more dramatic than the last.', author: 'Jonathan K.', location: 'Edinburgh' },
      { quote: 'East Fjords finale was perfect-waterfalls, hiking, Icelandic horses. The complete ring was incredible.', author: 'Rachel & Tom', location: 'Manchester' }
    ],
    faqs: [
      {
        question: 'What makes circumnavigating Iceland by ship so special?',
        answer: 'A circumnavigation reveals Iceland that road travellers simply cannot reach. The remote Westfjords, accessible only by small ship, offer pristine wilderness. The volcanic south coast, the dramatic east-each region has its own character, and by sea you experience them all without the exhaustion of constant driving.'
      },
      {
        question: 'Why do UK explorers choose to discover Iceland by cruise?',
        answer: 'Iceland\'s most dramatic coastlines are best appreciated from the sea. Small expedition ships can anchor in fjords too remote for road access, make Zodiac landings on volcanic shores, and position perfectly for wildlife encounters. It is an entirely different perspective on a remarkable island.'
      },
      {
        question: 'What is the experience of a volcano landing like?',
        answer: 'Approaching Heimaey by Zodiac, you see the 1973 lava flow that nearly buried the town. Then you climb the slopes of Eldfell itself-a volcano still warm to the touch, barely fifty years old. Standing in the crater, looking over the island, you feel Earth\'s power in a visceral way no photograph can capture.'
      },
      {
        question: 'What can I expect from puffin encounters?',
        answer: 'Iceland hosts millions of Atlantic puffins, and the seabird cliffs are incredible to see. From ship or Zodiac, you observe these charismatic birds going about their business-flying, fishing, returning to burrows with beaks full of sand eels. The experience is magical, especially during peak breeding season.'
      },
      {
        question: 'What is the midnight sun actually like?',
        answer: 'In midsummer, the sun barely dips below the horizon. At midnight you stand on deck in golden light, watching volcanic peaks glow. The distinction between day and night dissolves. For photographers and dreamers, this endless twilight is genuinely otherworldly-and uniquely available to those sailing in Arctic waters.'
      },
      {
        question: 'How challenging is the voyage?',
        answer: 'Modern expedition ships are designed for comfort in these waters. While the open stretches can be lively, the fjords offer shelter, and most sailing occurs in protected waters. The reward of accessing remote Iceland far outweighs any brief open-water passages. Vessels carry stabilisers and experienced crews.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every Iceland journey tailored-from Golden Circle extensions to specific wildlife interests.' },
        { title: 'UK Expertise', description: 'Specialists who understand the short flight from Britain and the unique appeal of Iceland.' },
        { title: 'Expedition Focus', description: 'Access to small ships that reach where larger vessels cannot venture.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind.' }
      ],
      testimonials: [
        { quote: 'Heimaey volcano landing-unreal. The tender approach to Eldfell was unforgettable. Iceland by sea is the only way.', author: 'Iceland first-timers', location: 'London' },
        { quote: 'The puffin colonies and midnight sun sailing were magical. Every fjord was more dramatic than the last.', author: 'Jonathan K.', location: 'Edinburgh' }
      ]
    },
    
    images: [],
    featured: true,
    priority: 12
  },
  {
    id: 'european-rivers',
    slug: 'european-river-cruises',
    lastUpdated: '2026-01-02',
    title: 'European River Cruises',
    
    // SEO
    seo: {
      metaTitle: 'European River Cruises: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Discover Europe\'s great rivers-Danube, Rhine, Douro. Castles and vineyards, medieval towns, capital cities. The gentlest way to explore the Continent. Enquire for your bespoke voyage.',
      keywords: ['european river cruise from uk', 'danube cruise', 'rhine cruise', 'douro cruise', 'river cruise europe', 'budapest cruise', 'amsterdam river cruise', 'christmas markets cruise']
    },
    
    // Hero
    hero: {
      headline: 'European River Cruises: The Continent\'s Gentle Highways',
      subheadline: 'From Amsterdam\'s canals to Budapest\'s illuminated skyline-Europe unfolds from the water',
      bullets: [
        'Dock in the heart of cities-no tender rides or transit days',
        'Imperial capitals, medieval towns, vineyard valleys',
        'Small ships with intimate, destination-focused atmosphere',
        'Daily discoveries without packing and unpacking'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: '7-14 nights from the UK',
    season: 'March - November (spring blossom, summer sun, autumn vines, Christmas markets)',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>There is a reason rivers carved the heart of European civilisation. Along their banks, empires built their capitals, merchants established their trading posts, and vintners planted their vines. To cruise these waterways is to follow the currents of history through landscapes that have inspired artists, musicians and poets for centuries.</p><p>European river cruising offers something ocean voyages cannot: intimacy with the Continent. Your ship glides silently into the centre of Budapest, Strasbourg, or Porto-no tender rides, no shuttle buses-and you step directly onto cobbled streets. By morning you are exploring a medieval old town; by evening you are watching the city lights reflect in the water from your floating hotel.</p><p>The pace is gentle but the rewards are rich. Vineyards slide past as you sip wine on the sun deck. Fairytale castles crown every bend of the Rhine. The Wachau Valley unfolds in terraced perfection. And through it all, your cabin remains unpacked, your floating base travelling with you from one discovery to the next.</p>',
      personaVignettes: [
        { persona: 'The Cultural Connoisseur', description: 'Those who want imperial palaces, concert halls and galleries without the logistics of city-hopping find river cruising ideal.' },
        { persona: 'The Relaxed Explorer', description: 'Travellers who prefer gentle discovery-walking tours rather than expeditions, wine tastings rather than treks.' },
        { persona: 'The First-Time Cruiser', description: 'Those curious about cruising but uncertain about ocean voyages find rivers an approachable, rewarding introduction.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Suited to those who wish to experience Europe deeply without the exhaustion of constant travel.',
      profiles: [
        { type: 'Culture Lover', description: 'Those who relish museums, concerts, and the layers of history visible in every European city.' },
        { type: 'Gentle Pace Seeker', description: 'Travellers who value quality over quantity-time to linger rather than rush between sights.' },
        { type: 'Wine Enthusiast', description: 'Those drawn to vineyard valleys and the pleasures of tasting local varieties at their source.' },
        { type: 'Celebration Traveller', description: 'Couples marking anniversaries, birthdays, or retirements with a special journey.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'European rivers cruise from March through November, with each season offering distinct character-from spring blossoms to Christmas markets.',
      seasons: [
        {
          name: 'Spring Awakening',
          months: 'March-May',
          highlights: ['Cherry blossoms in Vienna', 'Tulip season in Amsterdam', 'Mild temperatures', 'Fewer crowds']
        },
        {
          name: 'Summer Season',
          months: 'June-August',
          highlights: ['Longest days', 'Outdoor dining', 'Festival season', 'Vineyard greenery']
        },
        {
          name: 'Autumn Harvest',
          months: 'September-October',
          highlights: ['Grape harvest', 'Wine tastings', 'Golden foliage', 'Comfortable temperatures']
        },
        {
          name: 'Christmas Markets',
          months: 'November-December',
          highlights: ['Festive atmosphere', 'Mulled wine and stalls', 'Illuminated cities', 'Seasonal magic']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Imperial Capitals', highlights: ['Vienna\'s palaces', 'Budapest\'s Parliament', 'Prague excursions'] },
      { theme: 'Medieval Towns', highlights: ['Passau\'s cobbles', 'Cologne Cathedral', 'Strasbourg\'s quarters'] },
      { theme: 'Vineyard Valleys', highlights: ['Wachau terraces', 'Douro wine country', 'Rhine wine region'] },
      { theme: 'Scenic Passages', highlights: ['Rhine Gorge castles', 'Danube bend', 'Douro locks'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Classic Danube', duration: '8-10 nights', essence: 'Imperial capitals', highlights: ['Budapest stay', 'Vienna exploration', 'Wachau Valley', 'Passau farewell'] },
      { name: 'Rhine Journey', duration: '7-9 nights', essence: 'Castles and cathedrals', highlights: ['Amsterdam start', 'Rhine Gorge', 'Cologne Cathedral', 'Strasbourg finale'] },
      { name: 'Douro Discovery', duration: '7-10 nights', essence: 'Portuguese wine country', highlights: ['Porto immersion', 'Vineyard visits', 'Valley scenery', 'Barca d\'Alva'] }
    ],
    cruiseLines: ['Viking', 'AmaWaterways', 'Uniworld', 'Avalon Waterways', 'Scenic'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Budapest (2-2.5hr direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Budapest, Hungary', 
        description: 'Budapest hotel stay - explore both Buda and Pest: Castle District, Parliament, riverfront. Optional evening river illuminations cruise',
        coordinates: { lat: 47.4979, lon: 19.0402 }
      },
      { 
        day: '4', 
        location: 'Budapest, Hungary - Embark', 
        description: 'Free morning in the city, then transfer to the river ship and settle in. Evening welcome dinner and scenic departure',
        coordinates: { lat: 47.4979, lon: 19.0402 }
      },
      { 
        day: '5', 
        location: 'Bratislava, Slovakia', 
        description: 'Morning arrival with guided walking tour of the old town and hilltop castle. Afternoon at leisure, Slovakian culture',
        coordinates: { lat: 48.1486, lon: 17.1077 }
      },
      { 
        day: '6', 
        location: 'Vienna, Austria', 
        description: 'City tour (Ringstrasse, St Stephen\'s Cathedral) and optional Schönbrunn Palace. Evening classical concert option, imperial palaces, coffee houses',
        coordinates: { lat: 48.2082, lon: 16.3738 }
      },
      { 
        day: '7', 
        location: 'Wachau Valley & Dürnstein, Austria', 
        description: 'Scenic morning sailing through vineyards and castle-topped hills. Afternoon stroll through Dürnstein or visit Melk Abbey, terraced vineyards, pretty villages',
        coordinates: { lat: 48.3958, lon: 15.5206 }
      },
      { 
        day: '8', 
        location: 'Linz or Salzburg Excursion, Austria', 
        description: 'Choice of staying in Linz or taking a full-day excursion to Salzburg and the lakes region, Austrian culture',
        coordinates: { lat: 48.3069, lon: 14.2858 }
      },
      { 
        day: '9', 
        location: 'Passau, Germany', 
        description: 'Guided walking tour and organ recital in the baroque cathedral. Farewell dinner onboard, three-rivers town where Danube, Inn and Ilz meet',
        coordinates: { lat: 48.5667, lon: 13.4333 }
      },
      { 
        day: '10', 
        location: 'Passau → Munich → London Heathrow', 
        description: 'Disembark Passau, transfer by coach to Munich airport (roughly 2-3 hours), then fly back to the UK',
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
      { quote: 'The ship felt like a floating boutique hotel - small, friendly, and always moored right by the old town so we could wander off after dinner.' }
    ],
    faqs: [
      {
        question: 'What makes European river cruising so appealing to UK travellers?',
        answer: 'River cruising offers the Continent at its most accessible. A short flight from the UK, and you are in Budapest, Amsterdam, or Porto-stepping directly from ship to city centre without tender rides or shuttle buses. The intimacy of small ships, the daily discoveries, and the gentle pace create a uniquely civilised way to explore.'
      },
      {
        question: 'How does the Danube compare to the Rhine as a river cruise destination?',
        answer: 'The Danube offers imperial history-Budapest, Vienna, the Wachau Valley\'s wine terraces. The Rhine delivers fairytale scenery-castles crowning every bend, the dramatic gorge, Cologne\'s cathedral. Many travellers eventually experience both, but the choice depends on whether you prefer Habsburg elegance or Germanic romance.'
      },
      {
        question: 'What is special about the Douro in Portugal?',
        answer: 'The Douro Valley is port wine country-terraced vineyards rising steeply from the river, quintas perched on hillsides, the historic city of Porto at the journey\'s end. It is more intimate than the great central European rivers, with a distinctly Portuguese character of warmth and wine.'
      },
      {
        question: 'Why do people describe river cruising as "unpacking once"?',
        answer: 'Your cabin travels with you from city to city. You explore Budapest in the morning, return for lunch, and by dinner you are approaching Bratislava-all without touching a suitcase. It is the rare combination of variety and convenience that makes river cruising so appealing.'
      },
      {
        question: 'What is the Christmas markets experience like by river?',
        answer: 'European Christmas markets are magical from the river. Vienna\'s lights reflect in the Danube, Cologne\'s cathedral towers above festive stalls, and you return each evening to your warm, decorated ship. The markets feel intimate rather than crowded, and mulled wine tastes better when you don\'t have to drive home.'
      },
      {
        question: 'Is river cruising suitable for first-time cruisers?',
        answer: 'Exceptionally so. The ships are intimate (usually under 200 guests), the waters are calm, and there are no sea days to endure. Daily port calls keep the experience varied, and the atmosphere is more boutique hotel than floating resort. Many people who thought they would never cruise discover river cruising suits them perfectly.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every river journey tailored-from cabin choice to pre-cruise city stays.' },
        { title: 'UK Expertise', description: 'Specialists who understand the short flights and the appeal of each river.' },
        { title: 'Line Knowledge', description: 'Deep familiarity with all major river cruise lines and their distinctive styles.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind.' }
      ],
      testimonials: [
        { quote: 'We saw Budapest, Vienna and more without ever touching a suitcase after day one. Sitting on deck through the Wachau Valley with a glass of wine was the highlight of our year.', author: 'First-time cruisers', location: 'Surrey' },
        { quote: 'The ship felt like a floating boutique hotel-small, friendly, and always moored right by the old town so we could wander off after dinner.', author: 'Margaret T.', location: 'Edinburgh' }
      ]
    },
    
    images: [],
    featured: true,
    priority: 13
  },
  {
    id: 'great-barrier-reef',
    slug: 'great-barrier-reef-cruises',
    lastUpdated: '2026-01-02',
    title: 'Great Barrier Reef & Australia',
    
    // SEO
    seo: {
      metaTitle: 'Great Barrier Reef & Australia Cruise: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Experience Australia\'s icons-Sydney Harbour, the Great Barrier Reef, Whitsunday beaches. The ultimate long-haul adventure for UK travellers. Enquire for your bespoke journey.',
      keywords: ['great barrier reef cruise from uk', 'australia cruise', 'sydney cruise', 'whitsunday islands cruise', 'australian cruise from uk', 'barrier reef snorkelling', 'cairns cruise']
    },
    
    // Hero
    hero: {
      headline: 'Great Barrier Reef & Australia: The Ultimate Antipodean Adventure',
      subheadline: 'Sydney\'s iconic harbour, the world\'s largest coral reef, and the endless warmth of Australian sunshine',
      bullets: [
        'Sydney Harbour-Opera House, Harbour Bridge, Bondi beaches',
        'The Great Barrier Reef-snorkelling over the world\'s largest coral system',
        'Whitsunday Islands-Whitehaven Beach\'s pristine white sands',
        'Queensland\'s tropical coast-Cairns, Port Douglas, rainforest meets reef'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: '14-18 nights from the UK',
    season: 'April - October (drier, cooler conditions; avoid cyclone season)',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>Australia occupies a special place in British consciousness-that vast, sun-drenched land at the far end of the Earth, where Christmas falls in summer and kangaroos really do hop across roads. For many UK travellers, Australia represents the ultimate long-haul destination, and the Great Barrier Reef its crowning natural wonder.</p><p>The Reef defies description. It is visible from space, stretches over 2,300 kilometres, and supports an ecosystem of such colour and complexity that a single snorkel excursion reveals more species than most of us see in a lifetime. To float above these coral gardens, fish of every hue darting below, is to experience one of Earth\'s genuine miracles.</p><p>But Australia offers so much more. Sydney Harbour is one of the world\'s great urban waterways-the Opera House glowing at sunset, ferries crisscrossing between beaches and headlands, the Harbour Bridge arching overhead. The Whitsunday Islands present beaches so white, water so turquoise, that photographs look digitally enhanced. A voyage along Australia\'s eastern coast combines these wonders into a single, unforgettable journey.</p>',
      personaVignettes: [
        { persona: 'The Long-Haul Adventurer', description: 'Those ready for the ultimate journey-distance that rewards with landscapes and experiences found nowhere else on Earth.' },
        { persona: 'The Underwater Dreamer', description: 'Snorkellers and divers who have long imagined floating above the Barrier Reef\'s legendary coral formations.' },
        { persona: 'The Winter-Sun Seeker', description: 'UK travellers escaping grey January skies for Australian summer warmth and endless blue horizons.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Perfect for those who wish to experience Australia\'s greatest icons in comfort, without the logistics of independent long-haul travel.',
      profiles: [
        { type: 'Reef Enthusiast', description: 'Those who dream of coral gardens, tropical fish, and floating above one of Earth\'s natural wonders.' },
        { type: 'Icon Collector', description: 'Travellers who want to see Sydney Harbour, the Opera House, and the Barrier Reef on a single journey.' },
        { type: 'Beach Lover', description: 'Those seeking Whitehaven\'s silica sands, turquoise shallows, and island paradise perfection.' },
        { type: 'Comfort Seeker', description: 'Travellers who prefer a floating base with all logistics handled on a long-haul adventure.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'The Australian cruising season runs from April to October, avoiding the wet season and cyclone risk while offering comfortable temperatures and excellent reef visibility.',
      seasons: [
        {
          name: 'Autumn Arrival',
          months: 'April-May',
          highlights: ['Warm but not hot', 'Excellent visibility', 'Whale migration begins', 'Quieter beaches']
        },
        {
          name: 'Winter Escape',
          months: 'June-August',
          highlights: ['UK winter sun', 'Dry conditions', 'Peak whale watching', 'Comfortable cruising']
        },
        {
          name: 'Spring Delight',
          months: 'September-October',
          highlights: ['Warming waters', 'Coral spawning events', 'Jacaranda blooms', 'Before summer crowds']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Sydney Icons', highlights: ['Opera House', 'Harbour Bridge', 'Bondi Beach', 'Circular Quay'] },
      { theme: 'Reef Wonders', highlights: ['Coral gardens', 'Tropical fish', 'Giant clams', 'Reef sharks'] },
      { theme: 'Island Paradise', highlights: ['Whitehaven Beach', 'Whitsunday Islands', 'Turquoise lagoons'] },
      { theme: 'Tropical Coast', highlights: ['Cairns gateway', 'Port Douglas charm', 'Rainforest meets reef'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Classic Reef & Sydney', duration: '14 nights', essence: 'Essential Australia', highlights: ['Sydney stay', 'Harbour sailing', 'Reef snorkelling', 'Whitsunday beaches'] },
      { name: 'Extended Explorer', duration: '18 nights', essence: 'Deep immersion', highlights: ['Sydney extension', 'Multiple reef stops', 'Cairns exploration', 'Rainforest options'] },
      { name: 'Ultimate Australian', duration: '21+ nights', essence: 'Complete journey', highlights: ['Sydney and Brisbane', 'Comprehensive reef', 'Tasmania extension', 'Melbourne culture'] }
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Celebrity Cruises', 'Coral Expeditions', 'Holland America'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Sydney (22-26hr via Dubai/Doha/Singapore/Hong Kong)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Sydney, Australia', 
        description: 'Arrive Sydney, transfer to hotel. Check-in, begin jetlag recovery, explore harbour area',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '4', 
        location: 'Sydney, Australia', 
        description: 'Sydney city stay - explore the harbour, Opera House, The Rocks, Bondi beach, Manly ferry, iconic harbour views',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '5', 
        location: 'Sydney, Australia', 
        description: 'Sydney free day - optional Blue Mountains day trip for eucalyptus forests, canyons and viewpoints, or continue city exploration',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '6', 
        location: 'Sydney, Australia - Embark', 
        description: 'Board your cruise mid-afternoon; sail out past the Opera House and Harbour Bridge, iconic harbour departure',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '7', 
        location: 'At Sea', 
        description: 'Relax and adjust fully to the time zone with pool time, spa and onboard activities, coastal sailing north'
      },
      { 
        day: '8', 
        location: 'Brisbane, Australia', 
        description: 'Visit South Bank, Lone Pine Koala Sanctuary or explore the riverfront, Queensland\'s capital, river city with galleries',
        coordinates: { lat: -27.4698, lon: 153.0251 }
      },
      { 
        day: '9', 
        location: 'Airlie Beach / Whitsunday Islands, Australia', 
        description: 'Launch point for Great Barrier Reef and Whitehaven Beach excursions, bright white sand, translucent water, island paradise',
        coordinates: { lat: -20.2674, lon: 148.7183 }
      },
      { 
        day: '10', 
        location: 'Cairns / Port Douglas, Australia', 
        description: 'More reef options, or combine reef with nearby rainforest attractions, gateway to Great Barrier Reef, tropical Queensland',
        coordinates: { lat: -16.9186, lon: 145.7781 }
      },
      { 
        day: '11', 
        location: 'Great Barrier Reef (Reef Excursion)', 
        description: 'Organised snorkelling or diving excursions over coral gardens, vibrant coral and tropical fish, world\'s largest coral reef system',
        coordinates: { lat: -18.2871, lon: 147.6992 }
      },
      { 
        day: '12', 
        location: 'Townsville or Willis Island, Australia', 
        description: 'Another reef or coastal call - could be Townsville, Willis Island (scenic cruising) or a further Whitsunday stop, laid-back marina',
        coordinates: { lat: -19.2590, lon: 146.8169 }
      },
      { 
        day: '13', 
        location: 'At Sea', 
        description: 'Time to enjoy the ship and Australian-themed activities, coastal sailing south'
      },
      { 
        day: '14', 
        location: 'Return to Sydney or Brisbane', 
        description: 'Option to disembark and stay a final night ashore, or remain onboard if cruise continues, return to gateway city',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '15', 
        location: 'Sydney or Brisbane, Australia', 
        description: 'Final city stay (if open-jaw pattern) - extra day in Sydney or a second city such as Melbourne or Brisbane, Australian culture',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '16', 
        location: 'Sydney or Brisbane → London Heathrow', 
        description: 'Transfer to airport, fly Sydney/Brisbane → LHR (22-26hr via Dubai/Doha/Singapore/Hong Kong, typically overnight)',
        coordinates: { lat: -33.8688, lon: 151.2093 }
      },
      { 
        day: '17', 
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
      { quote: 'We combined three nights in Sydney with a reef cruise from Brisbane - the Harbour sail-away and snorkelling over the coral were stand-out moments.' },
      { quote: 'Booking it as a complete journey from UK flights to local tours made the distance feel manageable. The jetlag was gone by the time we reached the Whitsundays.' }
    ],
    faqs: [
      {
        question: 'What makes the Great Barrier Reef such an iconic destination?',
        answer: 'The Great Barrier Reef is Earth\'s largest living structure-visible from space, home to thousands of species, and an ecosystem of staggering beauty and complexity. To float above these coral formations, tropical fish darting below in every colour imaginable, is to witness one of nature\'s genuine miracles.'
      },
      {
        question: 'Why do UK travellers choose to experience Australia by cruise?',
        answer: 'A cruise along Australia\'s eastern coast connects its greatest icons without constant flights and transfers. You sail out of Sydney Harbour past the Opera House, wake to new Queensland ports, and access the Reef from a comfortable floating base. The logistics are handled; you simply experience.'
      },
      {
        question: 'What is Sydney Harbour really like in person?',
        answer: 'Sydney Harbour exceeds expectations. The Opera House glows at sunset, the Harbour Bridge arches overhead, ferries crisscross between beaches and headlands. Sailing in or out of this harbour ranks among cruising\'s great experiences-the entire city seems to wave you off on your adventure.'
      },
      {
        question: 'What can I expect from snorkelling the Barrier Reef?',
        answer: 'The reef reveals itself gradually as you float above. First the coral formations-branching, plated, boulder-then the fish, astonishing in their variety and colour. Clownfish in anemones, parrotfish grazing, perhaps a reef shark patrolling the drop-off. It is genuinely unforgettable, even for experienced snorkellers.'
      },
      {
        question: 'Why is Whitehaven Beach considered one of the world\'s best?',
        answer: 'Whitehaven\'s silica sand is 98% pure quartz-blindingly white, squeaking underfoot, cool even in summer sun. The water shifts through impossible shades of turquoise and blue. It is the kind of beach you thought existed only in advertisements; discovering it is real feels like a gift.'
      },
      {
        question: 'Is the journey from the UK manageable?',
        answer: 'Australia is a significant journey-22 to 26 hours with a connection-but the distance is part of the adventure. Building in a Sydney stay on arrival allows adjustment before the cruise begins. By the time you reach the Whitsundays, jet lag is a distant memory and you are fully immersed in the Australian experience.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every Australian journey tailored-from Sydney extensions to specific reef experiences.' },
        { title: 'UK Expertise', description: 'Specialists who understand the long-haul journey and how to make it comfortable.' },
        { title: 'Reef Knowledge', description: 'Deep familiarity with the best reef sites, operators, and seasonal conditions.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind on this significant journey.' }
      ],
      testimonials: [
        { quote: 'We combined three nights in Sydney with a reef cruise from Brisbane-the Harbour sail-away and snorkelling over the coral were stand-out moments.', author: 'First-time Australia visitors', location: 'Bristol' },
        { quote: 'Booking it as a complete journey from UK flights to local tours made the distance feel manageable. The jet lag was gone by the time we reached the Whitsundays.', author: 'Robert & Helen', location: 'Cheshire' }
      ]
    },
    
    images: [],
    featured: true,
    priority: 14
  },
  {
    id: 'grand-voyages',
    slug: 'grand-voyages',
    lastUpdated: '2026-01-02',
    title: 'Grand Voyages',
    
    // SEO
    seo: {
      metaTitle: 'Grand Voyages: A Bucket List Pursuit | Limitless Cruises',
      metaDescription: 'Discover the world on a Grand Voyage-30 to 60+ nights linking continents via classic sea routes. Mediterranean to Asia, Europe to South America. Enquire for your bespoke odyssey.',
      keywords: ['grand voyage cruise', 'long cruise from uk', 'repositioning cruise', 'extended cruise', 'world cruise segment', 'suez canal cruise', 'barcelona to singapore cruise', 'multi-month cruise']
    },
    
    // Hero
    hero: {
      headline: 'Grand Voyages: Epic Journeys Linking Continents',
      subheadline: 'Thirty to sixty nights of adventure-the feel of a world cruise without four months at sea',
      bullets: [
        'Barcelona to Singapore via Suez and the Indian Ocean',
        'Southampton to South America across the Atlantic',
        'Europe to Asia following ancient trade routes',
        'Unpack once, settle in, and watch the world unfold'
      ]
    },
    
    heroImage: null,
    cardImage: null,
    duration: 'Typically 30-60+ nights',
    season: 'Spring and autumn (repositioning seasons)',
    
    // Why Bucket List Worthy
    whyBucketListWorthy: {
      narrative: '<p>There comes a moment in many travellers\' lives when a week or two simply isn\'t enough. They want to truly travel-to unpack once, settle into a ship\'s rhythm, and watch as continents change outside their window. They want the journey itself to be the destination.</p><p>Grand Voyages answer this call. These extended segments-typically thirty to sixty nights-follow the classic routes of maritime history: through the Suez Canal from Mediterranean to Asia, across the Atlantic to South America, along the coast of Africa from Cape Town to Barcelona. They move between seasons, repositioning ships for new deployments while offering passengers the trip of a lifetime.</p><p>The experience differs fundamentally from shorter cruises. Sea days become treasured rather than endured-time for reading, reflection, enrichment lectures, new friendships. A shipboard community forms, sharing meals and stories night after night. Port calls feel genuinely exotic because you have truly covered the distance to reach them. And throughout, the satisfaction of travelling as explorers once travelled: slowly, deeply, meaningfully.</p>',
      personaVignettes: [
        { persona: 'The Time-Rich Adventurer', description: 'Those blessed with time-retirees, sabbatical-takers, remote workers-find Grand Voyages the ultimate expression of freedom.' },
        { persona: 'The Deep Explorer', description: 'Travellers who have done the highlights and now want to truly immerse, to see how regions connect across ocean and time.' },
        { persona: 'The Value Seeker', description: 'Those who appreciate that cost-per-night on a Grand Voyage often represents exceptional value versus multiple shorter trips.' }
      ]
    },
    
    // Ideal Voyager Profile
    idealVoyagerProfile: {
      intro: 'Suited to those with the time and disposition to embrace travel at the pace of the ocean itself.',
      profiles: [
        { type: 'Retiree Explorer', description: 'Those for whom decades of work have earned the freedom to spend months experiencing the world.' },
        { type: 'Sabbatical Voyager', description: 'Professionals taking career breaks who want a single, transformative travel experience.' },
        { type: 'Experienced Cruiser', description: 'Those who have loved shorter cruises and are ready for the deeper satisfaction of extended voyages.' },
        { type: 'Slow Travel Devotee', description: 'Travellers who reject rushing, who understand that the journey is the destination.' }
      ]
    },
    
    // Optimal Timing
    optimalTiming: {
      summary: 'Grand Voyages primarily operate during repositioning seasons-spring and autumn-when ships move between their summer and winter deployments.',
      seasons: [
        {
          name: 'Autumn Repositioning',
          months: 'September-November',
          highlights: ['Europe to Asia or Caribbean', 'Avoiding northern winter', 'Suez or Atlantic crossings', 'Following the sun']
        },
        {
          name: 'Spring Repositioning',
          months: 'March-May',
          highlights: ['Asia to Europe', 'South America to Mediterranean', 'Returning to northern waters', 'Optimal weather transitions']
        },
        {
          name: 'Winter Extended',
          months: 'January-February',
          highlights: ['World cruise segments', 'Circumnavigation portions', 'Southern Hemisphere exploration', 'Extended warm-weather routing']
        }
      ]
    },
    
    // Signature Sights & Encounters
    signatureSights: [
      { theme: 'Classic Transits', highlights: ['Suez Canal passage', 'Panama Canal crossing', 'Strait of Gibraltar'] },
      { theme: 'Continental Highlights', highlights: ['Mediterranean jewels', 'Arabian Peninsula', 'Indian subcontinent', 'Southeast Asia'] },
      { theme: 'Remote Calls', highlights: ['Island stops rarely reached', 'South Atlantic outposts', 'Indian Ocean atolls'] },
      { theme: 'Sea Days', highlights: ['Atlantic crossings', 'Indian Ocean passages', 'Time for reflection'] }
    ],
    
    // Curated Itinerary Vignettes
    itineraryVignettes: [
      { name: 'Mediterranean to Asia', duration: '35-45 nights', essence: 'Classic eastbound', highlights: ['Barcelona or Rome start', 'Suez transit', 'Arabian highlights', 'Singapore finale'] },
      { name: 'Europe to South America', duration: '30-40 nights', essence: 'Atlantic odyssey', highlights: ['Southampton or Lisbon', 'Atlantic crossing', 'Brazil coast', 'Buenos Aires arrival'] },
      { name: 'Grand Pacific', duration: '45-60 nights', essence: 'Ultimate distance', highlights: ['Asia departure', 'Pacific islands', 'South America west coast', 'World cruise flavour'] }
    ],
    cruiseLines: ['Cunard', 'Holland America', 'Princess Cruises', 'P&O Cruises', 'Fred. Olsen', 'MSC Cruises'],
    itinerary: [
      { 
        day: '1', 
        location: 'London Heathrow (LHR)', 
        description: 'Depart LHR → Barcelona (2hr15 direct)',
        coordinates: { lat: 51.4700, lon: -0.4543 }
      },
      { 
        day: '2', 
        location: 'Barcelona, Spain', 
        description: 'Arrive Barcelona, transfer to hotel. Stay 1-2 nights to explore Las Ramblas, the Gothic Quarter and Sagrada Família',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '4', 
        location: 'Barcelona, Spain - Embark', 
        description: 'Board your Grand Voyage ship and enjoy a sunset sail-away along the Catalan coast, begin epic journey',
        coordinates: { lat: 41.3851, lon: 2.1734 }
      },
      { 
        day: '5', 
        location: 'Marseille, France', 
        description: 'Marseille - historic port city, Provence gateway, French Riviera, Mediterranean culture',
        coordinates: { lat: 43.3285, lon: 5.3695 }
      },
      { 
        day: '6', 
        location: 'At Sea', 
        description: 'Mediterranean sailing, onboard activities, enrichment programs'
      },
      { 
        day: '7', 
        location: 'Naples, Italy', 
        description: 'Naples - gateway to Pompeii, Amalfi Coast, Italian culture, historic port',
        coordinates: { lat: 40.8375, lon: 14.2660 }
      },
      { 
        day: '8', 
        location: 'At Sea', 
        description: 'Eastern Mediterranean sailing, approaching Greece'
      },
      { 
        day: '9', 
        location: 'Piraeus (Athens), Greece', 
        description: 'Piraeus - gateway to Athens, Acropolis, ancient history, Greek culture, Mediterranean highlight',
        coordinates: { lat: 37.9425, lon: 23.6467 }
      },
      { 
        day: '10', 
        location: 'At Sea', 
        description: 'Sea day(s) with enrichment talks about the history and geopolitics of the region, approaching Suez'
      },
      { 
        day: '11', 
        location: 'Suez Canal (Transit)', 
        description: 'Slow transit through the Suez Canal, engineering marvel, connecting Mediterranean to Red Sea',
        coordinates: { lat: 29.9669, lon: 32.5498 }
      },
      { 
        day: '12', 
        location: 'Aqaba, Jordan', 
        description: 'Aqaba - optional excursions to Petra or Wadi Rum, Jordan\'s only seaport, ancient wonders, desert landscapes',
        coordinates: { lat: 29.5305, lon: 35.0106 }
      },
      { 
        day: '13', 
        location: 'At Sea - Red Sea', 
        description: 'Red Sea cruising, Arabian Peninsula approaching, onboard activities'
      },
      { 
        day: '14', 
        location: 'Jeddah, Saudi Arabia', 
        description: 'Jeddah - Red Sea gateway, modern city, Arabian culture, optional excursions to Mecca region',
        coordinates: { lat: 21.4858, lon: 39.1925 }
      },
      { 
        day: '15', 
        location: 'At Sea - Red Sea', 
        description: 'Red Sea sailing, approaching Arabian Gulf'
      },
      { 
        day: '16', 
        location: 'Muscat, Oman', 
        description: 'Muscat - Mutrah Souq, Corniche, Sultan Qaboos Grand Mosque, Omani culture, Arabian Peninsula',
        coordinates: { lat: 23.6207, lon: 58.5666 }
      },
      { 
        day: '17', 
        location: 'Doha, Qatar', 
        description: 'Doha - Souq Waqif, Museum of Islamic Art, National Museum of Qatar, Corniche, futuristic skyline',
        coordinates: { lat: 25.2773, lon: 51.5275 }
      },
      { 
        day: '18', 
        location: 'Dubai, UAE', 
        description: 'Dubai - modern skylines, Dubai Marina, Burj Khalifa, Dubai Mall, Arabian Gulf highlight',
        coordinates: { lat: 25.2615, lon: 55.3010 }
      },
      { 
        day: '19-21', 
        location: 'At Sea - Arabian Sea', 
        description: 'Indian Ocean crossing, Arabian Sea cruising, approaching India'
      },
      { 
        day: '22', 
        location: 'Mumbai, India', 
        description: 'Mumbai - Gateway of India, Bollywood, colonial architecture, Indian culture, vibrant city',
        coordinates: { lat: 18.9220, lon: 72.8347 }
      },
      { 
        day: '23', 
        location: 'At Sea', 
        description: 'Arabian Sea sailing, Indian coastline'
      },
      { 
        day: '24', 
        location: 'Goa, India', 
        description: 'Goa - Portuguese heritage, beautiful beaches, Indian culture, laid-back atmosphere',
        coordinates: { lat: 15.4909, lon: 73.8278 }
      },
      { 
        day: '25-26', 
        location: 'At Sea - Indian Ocean', 
        description: 'Indian Ocean crossing, approaching Sri Lanka'
      },
      { 
        day: '27', 
        location: 'Colombo, Sri Lanka', 
        description: 'Colombo - tea culture, colonial architecture, Sri Lankan culture, Indian Ocean gateway',
        coordinates: { lat: 6.9271, lon: 79.8612 }
      },
      { 
        day: '28-29', 
        location: 'At Sea - Indian Ocean', 
        description: 'Indian Ocean sailing, approaching Southeast Asia'
      },
      { 
        day: '30', 
        location: 'Penang, Malaysia', 
        description: 'Penang - George Town UNESCO site, street art, Malaysian culture, food paradise, Southeast Asia gateway',
        coordinates: { lat: 5.4164, lon: 100.3327 }
      },
      { 
        day: '31', 
        location: 'Port Klang (Kuala Lumpur), Malaysia', 
        description: 'Port Klang - gateway to Kuala Lumpur, Petronas Towers, Malaysian culture, modern city',
        coordinates: { lat: 3.0100, lon: 101.4000 }
      },
      { 
        day: '32', 
        location: 'At Sea', 
        description: 'Malacca Strait sailing, approaching Thailand'
      },
      { 
        day: '33', 
        location: 'Phuket, Thailand', 
        description: 'Phuket - beautiful beaches, Thai culture, island paradise, Southeast Asia highlight',
        coordinates: { lat: 7.8865, lon: 98.3983 }
      },
      { 
        day: '34', 
        location: 'At Sea', 
        description: 'Andaman Sea sailing, approaching Singapore'
      },
      { 
        day: '35', 
        location: 'Singapore - Disembark', 
        description: 'Arrive Singapore, disembark Grand Voyage. Transfer to hotel (1-2 nights), explore marina, gardens and hawker centres',
        coordinates: { lat: 1.2660, lon: 103.8070 }
      },
      { 
        day: '36', 
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
      { name: 'Indian Ocean', description: 'Calls at ports along the Arabian Sea and Indian Ocean - potential stops could include Mumbai or Goa, Sri Lanka, or island calls in the Maldives or Seychelles on some routes' },
      { name: 'South & Southeast Asia', description: 'A mix of sea days and port calls in India and Southeast Asia: for example, Penang, Kuala Lumpur (Port Klang), Phuket or Ho Chi Minh City' }
    ],
    testimonials: [
      { quote: 'We weren\'t ready for a full four-month world cruise, but a 38-night Barcelona-to-Singapore segment gave us a real sense of crossing continents.' },
      { quote: 'Having the flights, hotels and cruise all lined up as one journey made a complicated route feel simple - we just unpacked once and let the itinerary unfold.' }
    ],
    faqs: [
      {
        question: 'What makes a Grand Voyage such a great way to travel?',
        answer: 'A Grand Voyage offers what shorter cruises cannot: the satisfaction of truly covering distance, of watching continents change outside your window, of allowing the journey itself to transform you. You settle into ship life, form genuine friendships, and experience the world at the pace it was meant to be experienced.'
      },
      {
        question: 'How does the experience differ from a standard two-week cruise?',
        answer: 'The rhythm is fundamentally different. Sea days become treasured rather than endured-time for reading, lectures, reflection. A community forms among passengers who share meals and stories night after night. Ports feel genuinely exotic because you have truly covered the distance to reach them. It is immersive travel at its finest.'
      },
      {
        question: 'What is it like to transit the Suez Canal?',
        answer: 'The Suez transit is one of cruising\'s great experiences-a slow passage through desert landscape, watching both banks of this engineering marvel slide past. The sense of passing from one world to another-Mediterranean to Red Sea, Europe to Asia-is palpable and genuinely moving.'
      },
      {
        question: 'Why do experienced cruisers seek out Grand Voyages?',
        answer: 'Those who have loved shorter cruises often find themselves craving something deeper. Grand Voyages satisfy that hunger-the chance to truly settle in, to watch how regions connect, to enjoy the rare luxury of unhurried time. Many describe them as cruising at its most rewarding.'
      },
      {
        question: 'What is the appeal of repositioning season voyages?',
        answer: 'When ships move between their summer and winter deployments, they must cross oceans and seas. These repositioning voyages offer remarkable itineraries-routes that follow ancient trade winds, ports rarely visited on standard loops-often at exceptional value. They are cruising\'s hidden treasures.'
      },
      {
        question: 'Is a Grand Voyage suitable for first-time cruisers?',
        answer: 'For the right person, absolutely. If you have the time and disposition for slow travel, a Grand Voyage can be a wonderful introduction to cruising-allowing you to truly settle in, to discover all a ship offers, and to experience the world without constant packing and unpacking. It requires patience but rewards abundantly.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'Because Grand Voyages have limited capacity and appeal strongly to early planners, it is common to open sales 18 to 24 months ahead. Booking early gives the best accommodation choice and access to launch promotions; last-minute availability on popular segments is much less predictable.'
      }
    ],
    
    // Provenance & Assurance
    provenanceAssurance: {
      pillars: [
        { title: 'Bespoke Curation', description: 'Every Grand Voyage tailored-from cabin selection to pre and post stays.' },
        { title: 'UK Expertise', description: 'Specialists who understand the appeal of extended voyages for British travellers.' },
        { title: 'Segment Knowledge', description: 'Deep familiarity with which segments offer the best routing and experiences.' },
        { title: 'Complete Protection', description: 'Full ATOL protection for total peace of mind on extended journeys.' }
      ],
      testimonials: [
        { quote: 'We weren\'t ready for a full four-month world cruise, but a 38-night Barcelona-to-Singapore segment gave us a real sense of crossing continents.', author: 'First-time Grand Voyagers', location: 'Hampshire' },
        { quote: 'Having the flights, hotels and cruise all lined up as one journey made a complicated route feel simple-we just unpacked once and let the itinerary unfold.', author: 'Peter & Anne', location: 'Oxfordshire' }
      ]
    },
    
    images: [],
    featured: true,
    priority: 17
  }
];

// ============================================================================
// ITINERARY HELPERS - Data is clean (no Day 0 at source)
// ============================================================================
// All bucket list data starts at Day 1. Schema validation rejects Day 0.
// The normalizeItinerary function is a simple pass-through for backwards
// compatibility with existing code that calls it.
// ============================================================================

/**
 * Normalize an itinerary array - PASS-THROUGH (data is already clean)
 * 
 * All bucket list data starts at Day 1 (no Day 0 at source).
 * This function exists for backwards compatibility with existing code.
 * 
 * @param {array} itinerary - Itinerary array (already clean at source)
 * @returns {array} Same itinerary (no modification needed)
 */
export function normalizeItinerary(itinerary) {
  if (!itinerary || !Array.isArray(itinerary)) {
    return [];
  }
  
  // Data is clean at source - just return as-is
  return itinerary;
}

/**
 * Extract day number from a day string for display
 * Data is clean at source (no Day 0).
 * 
 * @param {string} dayStr - The day string (e.g., '1', '2-3', '10')
 * @param {number} fallbackIndex - Fallback index (0-based) if day is invalid
 * @returns {string} Day number for display
 */
export function normalizeDayNumber(dayStr, fallbackIndex = 0) {
  const dayMatch = String(dayStr || '').match(/^\d+/);
  const dayNumber = dayMatch ? dayMatch[0] : null;
  
  // If invalid, use fallback (index + 1 to be 1-based)
  if (!dayNumber) {
    return String(fallbackIndex + 1);
  }
  
  return dayNumber;
}

// Helper functions
export const getBucketListBySlug = (slug) => 
  bucketListExperiences.find(exp => exp.slug === slug);

export const getFeaturedBucketList = () => 
  bucketListExperiences.filter(exp => exp.featured).sort((a, b) => a.priority - b.priority);

export const getAllBucketList = (sortBy = 'lastUpdated') => {
  const experiences = [...bucketListExperiences];
  
  if (sortBy === 'lastUpdated') {
    // Sort by lastUpdated desc (newest first), fallback to priority
    return experiences.sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      if (dateB - dateA !== 0) {
        return dateB - dateA; // Newest first
      }
      return a.priority - b.priority; // Fallback to priority
    });
  } else if (sortBy === 'priority') {
    return experiences.sort((a, b) => a.priority - b.priority);
  }
  
  return experiences;
};

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

/**
 * Check if a bucket list experience was recently updated (within last 30 days)
 * @param {string} lastUpdated - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if updated within last 30 days
 */
export const isRecentlyUpdated = (lastUpdated) => {
  if (!lastUpdated) return false;
  const updateDate = new Date(lastUpdated);
  const now = new Date();
  const diffMs = now - updateDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
};

/**
 * Format lastUpdated date for display
 * @param {string} lastUpdated - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "2 Jan 2026")
 */
export const formatLastUpdated = (lastUpdated) => {
  if (!lastUpdated) return 'Date unknown';
  const date = new Date(lastUpdated);
  return new Intl.DateTimeFormat('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(date);
};

// Dev-only validation: Check all bucket list experiences against schema
validateAllBucketListExperiences(bucketListExperiences);

// Dev-only console summary (helps verify updates are reflected)
if (import.meta.env?.DEV) {
  const totalExperiences = bucketListExperiences.length;
  const sortedByDate = [...bucketListExperiences]
    .filter(exp => exp.lastUpdated)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
  
  const latestUpdated = sortedByDate[0];
  const recentlyUpdatedCount = sortedByDate.filter(exp => isRecentlyUpdated(exp.lastUpdated)).length;
  
  console.info(
    `[Bucket List Data Loaded]\n` +
    `  Total experiences: ${totalExperiences}\n` +
    `  Latest lastUpdated: ${latestUpdated?.lastUpdated || 'N/A'} (${latestUpdated?.title || 'N/A'})\n` +
    `  Recently updated (30d): ${recentlyUpdatedCount}\n` +
    `  ---`
  );
}

