/**
 * Bucket List Experiences Data
 * Once-in-a-lifetime cruise experiences
 */

export const bucketListExperiences = [
  {
    id: 'world-cruises',
    slug: 'world-cruises',
    title: 'World Cruises',
    tagline: 'The ultimate voyage around the globe',
    description: 'Embark on the journey of a lifetime with a world cruise. Visit multiple continents, experience diverse cultures, and create unforgettable memories on a voyage that spans 30 to 180+ nights.',
    // Images now loaded via getBucketListCard() and getBucketListHero() helpers (Supabase)
    heroImage: null,
    cardImage: null,
    duration: '30-180+ nights',
    season: 'Year-round departures',
    startingFrom: 'From £8,000 per person',
    bestFor: ['Retirees', 'Extended travellers', 'Adventure seekers', 'Luxury enthusiasts'],
    highlights: [
      'Visit multiple continents in one journey',
      'Round-the-world itineraries',
      'All-inclusive luxury experiences',
      'Onboard enrichment programs',
      'Exclusive world cruise events',
      'Comprehensive travel insurance included'
    ],
    includes: [
      'All meals and drinks',
      'Gratuities included',
      'Onboard entertainment and activities',
      'Shore excursions (selected)',
      'Expert guest speakers',
      'World cruise gala events'
    ],
    cruiseLines: ['Cunard', 'P&O Cruises', 'Fred. Olsen', 'Princess Cruises', 'Oceania Cruises'],
    itinerary: [
      { day: '1', location: 'Southampton/UK departure', description: 'Begin your epic journey' },
      { day: '2-7', location: 'Transatlantic crossing', description: 'Relax and enjoy ship amenities' },
      { day: '8-15', location: 'Caribbean', description: 'Tropical paradise islands' },
      { day: '16-30', location: 'Panama Canal & Pacific', description: 'Engineering marvel and ocean views' },
      { day: '31-60', location: 'Asia & Far East', description: 'Cultural immersion across multiple countries' },
      { day: '61-90', location: 'Australia & New Zealand', description: 'Down under adventures' },
      { day: '91-120', location: 'Indian Ocean', description: 'Exotic ports and beaches' },
      { day: '121-150', location: 'Mediterranean & Europe', description: 'Historic cities and coastlines' },
      { day: '151+', location: 'Return to UK', description: 'Complete your world journey' }
    ],
    destinations: [
      { name: 'Multiple continents', description: 'Asia, Europe, Americas, Oceania' },
      { name: 'Iconic ports', description: 'Singapore, Sydney, Cape Town, Barcelona' },
      { name: 'Exotic locations', description: 'Bora Bora, Seychelles, Petra' }
    ],
    testimonials: [
      { quote: 'The world cruise was everything we dreamed of and more. 120 days of pure luxury and adventure.', author: 'Margaret & John', location: 'Southampton' },
      { quote: 'Visiting 40 countries in one journey - truly the trip of a lifetime. The onboard community made it extra special.', author: 'David T.', location: 'London' }
    ],
    faq: [
      {
        question: 'How long do world cruises last?',
        answer: 'World cruises typically range from 30 to 180+ nights, with full circumnavigations usually 90-120+ nights.'
      },
      {
        question: 'Can I book segments of a world cruise?',
        answer: 'Many cruise lines offer the option to book individual segments of world cruises if you prefer a shorter journey.'
      },
      {
        question: 'What is included in a world cruise?',
        answer: 'Most world cruises include all meals, drinks, gratuities, selected shore excursions, and special events exclusive to world cruise guests.'
      }
    ],
    meta: {
      title: 'World Cruises | Round the World Voyages | Limitless Cruises',
      description: 'Embark on the ultimate cruise journey with a world cruise. Visit multiple continents on voyages from 30-180+ nights. Expert booking advice from Limitless Cruises.',
      keywords: ['world cruise', 'round the world cruise', 'world voyage', 'extended cruise', 'circumnavigation']
    },
    images: [],
    featured: true,
    priority: 1
  },
  {
    id: 'antarctica',
    slug: 'antarctica-expeditions',
    title: 'Antarctica Expeditions',
    tagline: 'The ultimate bucket list: penguins, icebergs, and pristine wilderness – from £12,995pp',
    description: 'Direct from London to Buenos Aires\'s sophisticated tango culture—2 nights luxury immersion (Recoleta, steaks, jetlag buffer). Fly to Ushuaia, gateway to the White Continent—1 night Tierra del Fuego. Embark your 14-night expedition cruise: cross the legendary Drake Passage, daily Zodiac landings on the Antarctic Peninsula, thousands of penguins, whale breaches, towering icebergs, South Shetland Islands. Return Ushuaia, fly home via Buenos Aires. The ultimate once-in-a-lifetime journey. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '18-20 nights from UK',
    season: 'November - March (Antarctic summer, December-January peak for wildlife)',
    startingFrom: 'From £12,995 per person',
    bestFor: ['Wildlife lovers', 'Adventure seekers', 'Photographers', 'Nature enthusiasts', 'Bucket list travellers', 'Couples'],
    highlights: [
      'Buenos Aires 2-night pre-cruise stay (tango, Recoleta, steaks)',
      'Ushuaia gateway city experience (Tierra del Fuego)',
      '14-night expedition cruise with balcony/expedition cabin',
      'Daily Zodiac landings on pristine Antarctic shores',
      'Penguin colonies, whale breaches, towering icebergs',
      'Cross the legendary Drake Passage',
      'Expert naturalist guides and expedition team lectures'
    ],
    includes: [
      'Return flights LHR↔Buenos Aires (economy direct, 13-14hr BA)',
      'Domestic flights Buenos Aires↔Ushuaia (3hr, included)',
      '4-5 nights premium hotels (Buenos Aires luxury, Ushuaia gateway)',
      '14-night expedition cruise balcony/expedition cabin (Quark/Hurtigruten/Ponant/Silversea)',
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
        answer: 'Yes—direct LHR→Buenos Aires (13-14hr) and return flights are included in the base package. Business class lie-flat seats available for +£4,500 per person. Domestic flights Buenos Aires↔Ushuaia (3hr) are also included.'
      },
      {
        question: 'Can I extend my stay in Buenos Aires?',
        answer: 'Absolutely! Extend Buenos Aires nights for +£250 per night. Perfect for deeper cultural immersion, Iguazu Falls add-on (+£1,200pp), or Patagonia extension. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony/expedition cabin is standard in the £12,995pp price. Suite upgrades available—Quark Ultra suites, Hurtigruten suites, Ponant Prestige suites, or Silversea veranda suites. Get a personalised quote for suite pricing and availability.'
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
        answer: '2 nights at luxury Buenos Aires hotel (Recoleta or Palermo area) and 1 night at Ushuaia gateway hotel. Both include breakfast. Hotels are centrally located for easy exploration. Upgrades to higher room categories available—get a personalised quote.'
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
      description: 'Antarctica expedition cruise from UK 2026. Buenos Aires to Ushuaia to White Continent. 14-night expedition with flights included. Penguin colonies, Zodiac landings, Drake Passage. From £12,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Tokyo temples to Singapore skyline via bucket list ports – from £4,995pp',
    description: 'Direct from London to Tokyo\'s neon pulse—2 nights luxury immersion (sushi omakase, Shibuya Crossing, Meiji Shrine). Embark your 12‑night Asia odyssey: Busan\'s temples, Kagoshima volcanoes, Okinawa beaches, Taipei night markets, Hong Kong harbour lights, Shanghai Bund, arriving Singapore triumphant. 2 nights Marina Bay Sands finale—Infinity Pool, Gardens by the Bay. Open‑jaw genius. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'March - November (cherry blossom peak: March-April)',
    startingFrom: 'From £4,995 per person',
    bestFor: ['Culture lovers', 'Food adventurers', 'City explorers', 'Photography enthusiasts', 'Luxury travellers', 'Couples'],
    highlights: [
      'Tokyo 2-night cultural immersion (Park Hyatt or similar)',
      '12-night balcony Asia cruise (Celebrity/HAL/Ponant)',
      'Hong Kong harbour night cruise',
      'Singapore rooftop infinity pool at Marina Bay Sands',
      'Port-rich Bucket List Itinerary: Tokyo → Busan → Kagoshima → Okinawa → Taipei → Hong Kong → Shanghai → Singapore',
      'Open-jaw flights: LHR→Tokyo / Singapore→LHR direct'
    ],
    includes: [
      'Return flights LHR↔Tokyo/Singapore (economy direct, 12hr/13hr)',
      '5 nights 5-star hotels (Park Hyatt Tokyo, Marina Bay Sands Singapore)',
      '12-night balcony cabin cruise (Celebrity Millennium/HAL Westerdam/Ponant Le Laperouse)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'Extendable stays: Tokyo +£300/nt, Singapore +£250/nt'
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
      { quote: 'Balcony views of Hong Kong harbour were priceless. The whole itinerary was bucket list perfection.', author: 'Raj', location: 'Manchester' },
      { quote: 'Marina Bay Sands infinity pool was the perfect finale. Every port was incredible.', author: 'Sarah', location: 'Birmingham' }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes—direct LHR→Tokyo (12hr) and Singapore→LHR (13hr) economy flights are included in the base package. Business class lie-flat seats available for +£3,200 per person. The open-jaw pattern means no backtracking—fly into Tokyo, out of Singapore.'
      },
      {
        question: 'Can I extend my stay in Tokyo or Singapore?',
        answer: 'Absolutely! Extend Tokyo nights for +£300 per night or Singapore for +£250 per night. Perfect for deeper cultural immersion or business class upgrades. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is standard in the £4,995pp price. Suite upgrades available—Celebrity Millennium suites, HAL Neptune Suites, or Ponant Prestige Suites. Get a personalised quote for suite pricing and availability.'
      },
      {
        question: 'Do I need visas?',
        answer: 'Japan offers visa-free entry for UK citizens (up to 90 days). China requires a group visa for cruise passengers (arranged by cruise line). Singapore is visa-free for UK citizens. Taiwan and Hong Kong are visa-free. Your cruise line will handle China group visa processing.'
      },
      {
        question: 'Which cruise lines operate this route?',
        answer: 'Celebrity Millennium (Asia Grand itinerary), Holland America Line Westerdam (Asia Explorer), and Ponant Le Laperouse (Japan intensive). All offer balcony cabins as standard. Celebrity and HAL are larger ships with extensive amenities; Ponant is smaller luxury with French flair.'
      },
      {
        question: 'When is the best time to go?',
        answer: 'March-April for cherry blossoms in Japan (peak viewing). May-June for pleasant weather. July-August can be hot and humid. September-November offers cooler temperatures and autumn colours. All months offer excellent cruising conditions.'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at Park Hyatt Tokyo (or similar 5-star) and 2 nights at Marina Bay Sands Singapore. Both include breakfast. Hotels are centrally located for easy exploration. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are included. Private transfers available for upgrade. No need to navigate public transport with luggage.'
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
      description: 'Japan Asia cruise from UK 2026. Tokyo to Singapore open-jaw bucket list itinerary with flights included. 12-night balcony cruise, 5-star hotels, ATOL protected. From £4,995pp. Expert booking from Limitless Cruises.',
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
    tagline: 'Scenic Voyager rail through Banff\'s peaks + Inside Passage Bucket List cruise – from £6,500pp',
    description: 'Land direct from London into Calgary\'s mountain air, 90 minutes to Fairmont Banff Springs for 2 indulgent nights amid turquoise lakes. Board Rocky Mountaineer Scenic Voyager for 2 days glass-dome luxury—gourmet meals, endless peaks, Kamloops overnight. Vancouver city vibes, then 7-night Inside Passage Bucket List Itinerary cruise (balcony cabin HAL/Princess/Celebrity). Grizzlies in Juneau, Glacier Bay calvings, Sitka totems. Final Vancouver night before home. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'May - September (July peak for wildlife)',
    startingFrom: 'From £6,500 per person',
    bestFor: ['Rail enthusiasts', 'Scenic travelers', 'Nature lovers', 'Adventure seekers', 'Couples', 'Families'],
    highlights: [
      'Rocky Mountaineer Scenic Voyager SilverLeaf dome car experience',
      '2 nights Fairmont Banff Springs luxury resort',
      '7-night Inside Passage balcony cabin cruise',
      'Wildlife viewing - grizzlies, whales, eagles',
      'Glacier Bay National Park calving icebergs',
      'Extendable Banff/Vancouver stays available'
    ],
    includes: [
      'Return flights LHR↔Calgary/Vancouver (economy direct, 9hr/10hr)',
      '6 nights premium hotels (Fairmont Banff Springs, Fairmont Vancouver)',
      'Rocky Mountaineer Scenic Voyager SilverLeaf service (meals included)',
      '7-night Inside Passage balcony cabin (HAL Nieuw Amsterdam/Princess Ruby Princess/Celebrity Solstice)',
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
        quote: 'Balcony cruise + train = dream. Glacier Bay was absolutely spectacular.', 
        author: 'Thompson Family', 
        location: 'London' 
      }
    ],
    faq: [
      {
        question: 'Are UK flights included?',
        answer: 'Yes, LHR→Calgary/Vancouver→LHR direct economy flights are included (9hr outbound, 10hr return). Business class upgrades available - get personalised quote for pricing.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is included in the base package. Suite upgrades available - get personalised quote for premium accommodation options.'
      },
      {
        question: 'Can I extend my stay?',
        answer: 'Yes—Banff extensions available for +£250 per night, Vancouver extensions for +£200 per night. Customise your journey with additional nights - get personalised quote.'
      },
      {
        question: 'What fitness level is required?',
        answer: 'Moderate fitness level is sufficient. The train has level access, and Banff offers moderate walks with lifts available. Most activities can be adapted to comfort levels.'
      },
      {
        question: 'What visas are needed?',
        answer: 'UK citizens need a Canada eTA (Electronic Travel Authorization) which costs £10 and can be obtained online before travel. US visas are not required for this closed-loop cruise itinerary.'
      },
      {
        question: 'When is the best time to go?',
        answer: 'July offers peak wildlife viewing opportunities with warm weather. May and September provide good value. Dates available via personalised quote - limited 2026 spaces.'
      },
      {
        question: 'Is this suitable for solo travellers?',
        answer: 'Yes, solo travellers are welcome. Single supplement is £800. Some cruise lines offer shared cabin options. Get personalised quote for solo travel options.'
      },
      {
        question: 'Which cruise lines and 2026 dates?',
        answer: 'Holland America Line (Nieuw Amsterdam), Princess Cruises (Ruby Princess), and Celebrity Cruises (Solstice) offer weekly departures May through September 2026. Get personalised quote for specific dates and availability.'
      },
      {
        question: 'What is the Rocky Mountaineer Scenic Voyager?',
        answer: 'The Scenic Voyager is Rocky Mountaineer\'s SilverLeaf service featuring glass-dome cars for panoramic views, gourmet chef-prepared meals, and overnight accommodation in Kamloops. The train operates during daylight hours for maximum scenic viewing through the Canadian Rockies.'
      },
      {
        question: 'What upgrades are available?',
        answer: 'Upgrades include: Business class flights, Rocky Mountaineer GoldLeaf service with outdoor viewing platform, Premium cruise suites, Banff helicopter tours and premium excursions. Get personalised quote to tailor upgrades to your preferences.'
      }
    ],
    meta: {
      title: 'Rocky Mountaineer & Alaska Bucket List Journey from UK | Limitless Cruises',
      description: 'Rocky Mountaineer Alaska cruise from UK 2026. Scenic Voyager rail through Banff + Inside Passage bucket list cruise package with flights included. ATOL protected. From £6,500pp. Expert booking from Limitless Cruises.',
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
    tagline: 'Darwin\'s living laboratory – Quito culture to Galápagos wildlife from £4,995pp',
    description: 'Direct to Quito\'s Andean heights for 2 nights acclimatisation (Mitad del Mundo equator, UNESCO Old Town). Fly to Baltra, board your intimate expedition ship for 7 nights Western Galápagos immersion: snorkel with hammerheads at Fernandina, track tortoises on Isabela, witness booby mating dances on Española. Final night Puerto Ayora tortoise sanctuary. Open‑jaw perfection. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '10 nights from UK',
    season: 'Year-round (peak June - November for wildlife activity)',
    startingFrom: 'From £4,995 per person',
    bestFor: ['Wildlife families', 'Snorkelers', 'Nature photographers', 'Eco-luxury seekers', 'Adventure seekers', 'Couples'],
    highlights: [
      'Quito 2-night acclimatisation (JW Marriott, altitude preparation)',
      '7-night expedition balcony cruise (16 guests max, intimate wildlife viewing)',
      'Daily Zodiac landings and snorkel excursions',
      'Giant tortoise tracking on Isabela Island',
      'Hammerhead shark snorkel at Fernandina',
      'Blue-footed booby courtship dances on Española',
      'Open-jaw flights: LHR→Quito / Puerto Ayora→LHR'
    ],
    includes: [
      'Return flights LHR↔Quito/Puerto Ayora (economy, 12hr via US)',
      '4 nights premium hotels (JW Marriott Quito, Puerto Ayora)',
      '7-night expedition balcony cabin (Celebrity Flora/Silversea Silver Origin/Hurtigruten Fram/Quasar Evolution)',
      'All Zodiac landings, snorkel gear, wetsuits',
      'Naturalist guides (Galápagos National Park certified)',
      'Galápagos transit card and national park fees',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Quito +£250/nt, Puerto Ayora +£200/nt'
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
        answer: 'Yes—LHR→Quito (12hr via US connection) and return flights are included in the base package. Business class available for +£3,500 per person. The open-jaw pattern means no backtracking—fly into Quito, out of Puerto Ayora.'
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
        answer: 'Absolutely! Extend Quito nights for +£250 per night (perfect for Iguazu Falls add-on or Amazon extension). Extend Puerto Ayora for +£200 per night (beach relaxation, additional wildlife viewing). Get a personalised quote for extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Expedition balcony cabin is standard in the £4,995pp price. Suite upgrades available—Celebrity Flora suites, Silversea Silver Origin suites, or Quasar Evolution master suites. Get a personalised quote for suite pricing and availability.'
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
        answer: '2 nights at JW Marriott Quito (luxury, altitude-friendly) and 1 night at Puerto Ayora hotel. Both include breakfast. Hotels are strategically located for exploration. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this once-in-a-lifetime wildlife journey.'
      }
    ],
    meta: {
      title: 'Galápagos Islands Bucket List Journey from UK | Limitless Cruises',
      description: 'Galápagos cruise from UK 2026. Quito to Galápagos expedition open-jaw with flights included. 7-night expedition cruise, giant tortoises, hammerhead snorkel. From £4,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Aurora hunting coastal voyage from Tromsø to the Russian border – from £3,995pp',
    description: 'Fly direct to aurora capital Tromsø for 2 nights of midnight hunts, Arctic Cathedral visits, and cable car panoramas. Embark your 7‑night coastal masterpiece North: Lofoten\'s dramatic peaks, Honningsvåg\'s North Cape cliff, endless fjords alive with lights. Disembark Kirkenes for ice hotel thrills, husky sleds, and Russian border walks. Pure winter magic. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '12 nights from UK',
    season: 'October - March (peak December - February for aurora viewing)',
    startingFrom: 'From £3,995 per person',
    bestFor: ['Aurora chasers', 'Fjord lovers', 'Winter adventurers', 'Photography enthusiasts', 'Active families', 'Couples'],
    highlights: [
      'Tromsø 2-night aurora hunting (99% guarantee hunts)',
      '7-night balcony coastal voyage (Hurtigruten/Ponant/HX)',
      'Lofoten Islands midnight sun trails and dramatic peaks',
      'North Cape - Europe\'s northernmost point',
      'Kirkenes ice hotel overnight experience',
      'Husky sledding and snowmobile adventures',
      'Open-jaw flights: LHR→Tromsø / Kirkenes→LHR'
    ],
    includes: [
      'Return flights LHR↔Tromsø/Kirkenes (economy, 3hr direct Norwegian/SAS)',
      '5 nights premium Arctic hotels (Tromsø aurora base, Kirkenes ice hotel)',
      '7-night balcony cabin coastal voyage (Hurtigruten MS Richard With/Ponant Le Boréal/HX Roald Amundsen)',
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
        answer: 'Yes—direct LHR→Tromsø (3hr) and return flights via Oslo are included in the base package. Business class available for +£1,200 per person. The open-jaw pattern means no backtracking—fly into Tromsø, out of Kirkenes.'
      },
      {
        question: 'Can I extend my stay in Tromsø or Kirkenes?',
        answer: 'Absolutely! Extend Tromsø nights for +£200 per night or Kirkenes for +£250 per night. Perfect for more aurora hunting opportunities or additional winter activities. Get a personalised quote for your preferred extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is standard in the £3,995pp price. Suite upgrades available—Hurtigruten suites, Ponant Prestige suites, or HX expedition suites. Get a personalised quote for suite pricing and availability.'
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
        answer: 'Yes—all transfers between airports, hotels, and cruise port are included. Private transfers available for upgrade. No need to navigate Arctic conditions with luggage.'
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
      description: 'Northern Lights cruise from UK 2026. Tromsø to Kirkenes coastal voyage with flights included. Aurora hunting, Lofoten Islands, North Cape, ice hotel. From £3,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Aurora hunting from your doorstep – Dover departures, Tromsø overnights from £3,295pp',
    description: 'No airports. No jetlag. Pure Arctic magic. Coach or train to Dover, board Holland America Nieuw Statendam, wake to Norway\'s fjords. Tromsø overnight = your aurora jackpot with 24-hour lights window. Orkney stones, Shetland wildlife, North Cape round out the cultural immersion. HAL\'s "History Channel Northern Lights" lectures included. Door-to-door perfection from £3,295pp. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '14 nights sail from Dover',
    season: 'October - March (peak December - February for aurora viewing)',
    startingFrom: 'From £3,295 per person (inside) / £4,195 balcony',
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
      '14 nights Holland America Nieuw Statendam (inside cabin base)',
      'All meals + HAL Pinnacle dining (Pinnacle Grill upgrade available)',
      'Aurora guarantee lectures (History Channel partnership)',
      'Port talks + daily activities',
      'Door-to-door convenience (Dover easy train/coach from London 1.5hr)',
      'Balcony supplement £900pp (prime lights viewing)',
      'Solo cabins available (from £400 supplement)'
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
      { quote: 'Dover to Tromsø overnights = lights heaven. Balcony essential for viewing. No airports made it stressless.', author: 'Margaret', location: 'Kent' },
      { quote: 'No-fly made it perfect. HAL food outstanding, service excellent. The Tromsø overnight was magical.', author: 'David', location: 'Newcastle' },
      { quote: 'First cruise and first aurora - both exceeded expectations. The no-fly option was perfect for us.', author: 'Sarah & John', location: 'London' }
    ],
    faq: [
      {
        question: 'Will I see the Northern Lights?',
        answer: '85% success rate October-March. HAL offers aurora guarantee with retry opportunities. The Tromsø overnight provides a 24-hour viewing window, significantly increasing your chances. Peak season (December-February) offers the highest probability.'
      },
      {
        question: 'Is a balcony worth the £900 supplement?',
        answer: 'Yes—balcony cabins offer prime aurora viewing from your own private space. Pinnacle Class balconies are the largest in HAL\'s fleet. Perfect for couples wanting intimate lights viewing. Get a personalised quote for balcony availability.'
      },
      {
        question: 'How do I get to Dover?',
        answer: 'Easy access from London: train 1.5 hours from London St Pancras or Victoria. Coach services available nationwide. Door-to-door convenience—no airport stress. Private transfers available for upgrade.'
      },
      {
        question: 'What about solo travellers?',
        answer: 'Solo cabins available from £400 supplement (select cabins). HAL offers dedicated solo traveller events and dining options. Get a personalised quote for solo availability and pricing.'
      },
      {
        question: 'How cold will it be?',
        answer: 'Temperatures range from -5°C to -15°C. HAL provides warm gear for outdoor viewing. Indoor options abundant—BB King Club, Music Walk, specialty dining. Ship is fully heated with excellent viewing areas.'
      },
      {
        question: 'What are the 2026 dates?',
        answer: 'Weekly departures October-March. Peak season (December-February) fills fastest. Get a personalised quote for specific dates and cabin availability. Early booking recommended for best pricing.'
      },
      {
        question: 'What\'s included in the base price?',
        answer: '14 nights onboard Nieuw Statendam (inside cabin), all meals in main dining and buffet, port talks, daily activities, aurora lectures, entertainment. Pinnacle Grill specialty dining upgrade available. Drinks packages optional.'
      },
      {
        question: 'Why choose HAL Nieuw Statendam for Northern Lights?',
        answer: 'Pinnacle Class features largest balconies for viewing, Music Walk evenings (BB King Club, Rolling Stone Rock Room), dark hull optimized for aurora viewing, strategic Norwegian routing, and HAL\'s signature Tromsø overnight—24-hour lights window.'
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
      description: '14-night no-fly Northern Lights cruise from Dover. Tromsø overnight, Arctic Circle, HAL Nieuw Statendam. From £3,295pp balcony included. No airports, no jetlag. Expert booking from Limitless Cruises.',
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
    tagline: 'Buenos Aires tango to Fortaleza beaches – from £5,995pp',
    description: 'Buenos Aires elegance (2 nights tango immersion), then 12‑night coastal masterpiece: Uruguay polo beaches, São Paulo buzz, Rio\'s iconic harbour, pristine Ilhabela, Bahia\'s colonial charm, Fortaleza\'s dune buggy finale. Open‑jaw perfection. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'November - March (South American summer)',
    startingFrom: 'From £5,995 per person',
    bestFor: ['Culture explorers', 'Beach lovers', 'Tango dancers', 'Carnival seekers', 'Adventure seekers', 'Couples'],
    highlights: [
      'Buenos Aires 2-night tango immersion (Recoleta, steaks, culture)',
      '12-night balcony South America cruise (coastal masterpiece)',
      'Rio de Janeiro overnight (Christ Redeemer, iconic harbour)',
      'Iguazu Falls day trip option (extend Buenos Aires)',
      'Brazilian coast exploration (Ilhabela, Salvador, Fortaleza)',
      'Fortaleza 2-night finale (beaches, dune buggies, colonial charm)',
      'Open-jaw flights: LHR→Buenos Aires / Fortaleza→LHR'
    ],
    includes: [
      'Return flights LHR↔Buenos Aires/Fortaleza (economy, 13hr direct)',
      '5 nights premium hotels (Buenos Aires luxury, Fortaleza beach)',
      '12-night balcony cabin cruise (Norwegian Star/MSC Splendida/Silversea Silver Ray)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Buenos Aires +£220/nt (Iguazu Falls add-on)'
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
        answer: 'Yes—direct LHR→Buenos Aires (13hr) and return flights via Lisbon/Miami are included in the base package. Business class available for +£3,800 per person. The open-jaw pattern means no backtracking—fly into Buenos Aires, out of Fortaleza.'
      },
      {
        question: 'Can I extend my stay in Buenos Aires?',
        answer: 'Absolutely! Extend Buenos Aires nights for +£220 per night. Perfect for Iguazu Falls add-on (+£1,500pp for 2-day trip) or deeper tango immersion. Get a personalised quote for extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is standard in the £5,995pp price. Suite upgrades available—Norwegian Star suites, MSC Yacht Club, or Silversea veranda suites. Get a personalised quote for suite pricing and availability.'
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
        answer: 'Iguazu Falls can be added as a 2-day extension from Buenos Aires (+£1,500pp). Includes flights, hotel, and guided tours of both Argentine and Brazilian sides. One of the world\'s natural wonders—highly recommended!'
      },
      {
        question: 'What\'s included in the hotel stays?',
        answer: '2 nights at luxury Buenos Aires hotel (Recoleta or Palermo area) and 2 nights at Fortaleza beach hotel. Both include breakfast. Hotels are strategically located for exploration. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are included. Private transfers available for upgrade. No need to navigate South American cities with luggage.'
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
      description: 'South America cruise from UK 2026. Buenos Aires to Fortaleza coastal voyage with flights included. Rio de Janeiro, Brazilian coast, tango culture. From £5,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Ancient wonders meet modern luxury',
    description: 'Experience the fascinating blend of ancient history and contemporary luxury in the Middle East. From the architectural wonders of Dubai to the historical sites of Egypt, discover a region rich in culture, heritage, and modern innovation.',
    heroImage: null,
    cardImage: null,
    duration: '7-14 nights',
    season: 'October - April (avoiding extreme summer heat)',
    startingFrom: 'From £1,500 per person',
    bestFor: ['History enthusiasts', 'Luxury travellers', 'Culture explorers', 'Architecture admirers'],
    highlights: [
      'Explore iconic cities like Dubai, Abu Dhabi, and Muscat',
      'Visit ancient Egyptian sites (Giza, Luxor, Valley of the Kings)',
      'Experience the architectural marvels of modern Middle East',
      'Discover traditional souks and spice markets',
      'Luxurious onboard experiences',
      'Beautiful desert landscapes and oases'
    ],
    includes: [
      'All meals on board',
      'Selected shore excursions',
      'Cultural activities',
      'Port transfers'
    ],
    cruiseLines: ['Celebrity Cruises', 'Royal Caribbean', 'MSC Cruises', 'Costa Cruises'],
    itinerary: [
      { day: '1', location: 'Dubai, UAE', description: 'Embarkation and city exploration' },
      { day: '2', location: 'Abu Dhabi, UAE', description: 'Sheikh Zayed Mosque, cultural sites' },
      { day: '3', location: 'At Sea', description: 'Relax and enjoy ship amenities' },
      { day: '4', location: 'Muscat, Oman', description: 'Sultan Qaboos Grand Mosque, souks' },
      { day: '5', location: 'Doha, Qatar', description: 'Modern architecture and museums' },
      { day: '6-7', location: 'At Sea', description: 'Luxury onboard experiences' },
      { day: '8+', location: 'Optional extensions', description: 'Egypt, Jordan, or longer itineraries' }
    ],
    destinations: [
      { name: 'United Arab Emirates', description: 'Dubai, Abu Dhabi' },
      { name: 'Oman', description: 'Muscat, traditional culture' },
      { name: 'Qatar', description: 'Doha, modern architecture' },
      { name: 'Egypt', description: 'Giza, Luxor (on select itineraries)' }
    ],
    testimonials: [
      { quote: 'The Middle East cruise was fascinating. The contrast between ancient history and modern luxury was incredible.', author: 'James R.', location: 'London' },
      { quote: 'Dubai and Abu Dhabi were highlights, and the onboard luxury was exceptional.', author: 'Sarah W.', location: 'Edinburgh' }
    ],
    faq: [
      {
        question: 'When is the best time to cruise the Middle East?',
        answer: 'October to April is ideal, avoiding the extreme summer heat. The weather is pleasant for exploring during these months.'
      },
      {
        question: 'What should I wear in the Middle East?',
        answer: 'Dress modestly, especially when visiting religious sites. Cover shoulders and knees. Light, breathable fabrics are recommended.'
      },
      {
        question: 'Are Middle East cruises family-friendly?',
        answer: 'Yes, many cruise lines offer excellent family facilities and activities. The modern cities offer plenty of family attractions.'
      }
    ],
    meta: {
      title: 'Middle East Cruises | Dubai & Arabian Peninsula | Limitless Cruises',
      description: 'Experience the Middle East by cruise. Explore Dubai, Abu Dhabi, ancient sites and modern luxury. Expert booking advice from Limitless Cruises.',
      keywords: ['middle east cruise', 'dubai cruise', 'abu dhabi cruise', 'arabian peninsula cruise', 'egypt cruise']
    },
    images: [
      null,
      null,
      null
    ],
    featured: true,
    priority: 8
  },
  {
    id: 'pacific-new-zealand',
    slug: 'pacific-new-zealand-cruises',
    title: 'Pacific Islands & New Zealand',
    tagline: 'Auckland to tropical paradise – from £4,995pp',
    description: 'Auckland Māori culture kickoff, then 12‑night island hop: Maori Bay of Islands, Fiji\'s coral reefs, New Caledonia\'s Loyalty Isles, Vanuatu volcanoes. Tropical finale with overwater bungalows and pristine beaches. Open‑jaw perfection. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '16 nights from UK',
    season: 'November - April (avoiding cyclone season)',
    startingFrom: 'From £4,995 per person',
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
      '12-night balcony cabin cruise (Princess Pacific Encounter/P&O Pacific Adventure/Carnival Splendor)',
      'All transfers between airports, hotels and cruise',
      'Open-jaw flight pattern (no backtracking)',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Auckland +£220/nt'
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
        answer: 'Yes—LHR→Auckland (24hr via Asia/Sydney) and return flights are included in the base package. Business class available for +£4,500 per person. The open-jaw pattern means no backtracking—fly into Auckland, out of final port.'
      },
      {
        question: 'Can I extend my stay in Auckland?',
        answer: 'Absolutely! Extend Auckland nights for +£220 per night. Perfect for deeper New Zealand exploration, Rotorua geysers, or additional Māori cultural experiences. Get a personalised quote for extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is standard in the £4,995pp price. Suite upgrades available—Princess suites, P&O suites, or Carnival suites. Get a personalised quote for suite pricing and availability.'
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
        answer: '2 nights at Auckland hotel and 2 nights at final port hotel. Both include breakfast. Hotels are strategically located for exploration. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are included. Private transfers available for upgrade. No need to navigate Pacific destinations with luggage.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this tropical paradise journey.'
      }
    ],
    meta: {
      title: 'Pacific Islands & New Zealand Bucket List Journey from UK | Limitless Cruises',
      description: 'Pacific Islands cruise from UK 2026. Auckland to tropical paradise with flights included. Fiji, New Caledonia, Vanuatu, Bay of Islands. From £4,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Queen Mary 2 or MSC luxury across the pond – from £1,495pp',
    description: 'Board Southampton for 7‑day Cunard QM2 or MSC luxury: gala nights, lectures, sea days. Arrive New York harbour like 1920s icons. 2 nights Manhattan magic—Statue of Liberty, Top of Rock, skyline views. No-fly perfection. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '10 nights from UK',
    season: 'April - May, October - November (repositioning season)',
    startingFrom: 'From £1,495 per person (inside) / £2,295 balcony',
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
      '7-night transatlantic crossing (inside cabin base)',
      '2 nights New York hotel (Manhattan)',
      'Return flight NYC→LHR (economy, 7hr direct)',
      'All transfers between port, hotel and airport',
      'All meals onboard (specialty dining on luxury lines)',
      'Entertainment and enrichment lectures',
      'Balcony supplement £800pp (prime ocean viewing)',
      'Extendable stays: New York +£250/nt'
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
        answer: 'Yes—return flight NYC→LHR (7hr direct) is included in the base package. Business class available for +£2,200 per person. The no-fly outbound (Southampton embark) means no airports on departure—pure relaxation from day one.'
      },
      {
        question: 'Can I extend my stay in New York?',
        answer: 'Absolutely! Extend New York nights for +£250 per night. Perfect for deeper Manhattan exploration, Broadway shows, or additional sightseeing. Get a personalised quote for extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Inside cabin is standard in the £1,495pp price. Balcony supplement £800pp (prime ocean viewing). Suite upgrades available—Cunard Queens Grill, MSC Yacht Club, or Royal Caribbean suites. Get a personalised quote for suite pricing and availability.'
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
        answer: '2 nights at Manhattan hotel (central location). Includes breakfast. Hotel is strategically located for easy exploration of New York attractions. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between Southampton port, New York hotel, and JFK airport are included. Private transfers available for upgrade. No need to navigate with luggage.'
      },
      {
        question: 'Is this ATOL protected?',
        answer: 'Yes—all packages are fully ATOL protected. Your financial protection is guaranteed. Book with confidence knowing your investment is secure for this classic ocean crossing journey.'
      }
    ],
    meta: {
      title: 'Transatlantic Crossing Bucket List Journey from UK | Limitless Cruises',
      description: 'Transatlantic cruise from UK 2026. Southampton to New York crossing with flights included. Queen Mary 2, MSC luxury, 2 nights NYC. From £1,495pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Ring of Fire complete – Reykjavik to East Fjords from £2,995pp',
    description: 'Direct to Reykjavik for geothermal Blue Lagoon and Harpa evenings. Embark 8‑night circumnavigation: Heimaey\'s Eldfell volcano landing, Ísafjörður\'s hot springs, Akureyri whale watch, Seyðisfjörður\'s rainbow street. East Fjords finale—waterfalls, hiking. Open‑jaw perfection. ATOL protected. Get personalised quote.',
    heroImage: null,
    cardImage: null,
    duration: '12 nights from UK',
    season: 'May - September (summer light, midnight sun)',
    startingFrom: 'From £2,995 per person',
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
      '8-night balcony cabin cruise (Ambassador Ambience/Fred. Olsen Bolette/Ponant Le Dumont d\'Urville)',
      'Volcano landings and Zodiac excursions',
      'All transfers between airports, hotels and cruise',
      'All meals onboard (specialty dining on luxury lines)',
      'Extendable stays: Reykjavik +£180/nt'
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
        answer: 'Yes—direct LHR→Reykjavik (3hr) and return flights are included in the base package. Business class available for +£800 per person. The open-jaw pattern means no backtracking—fly into Reykjavik, out of East Fjords.'
      },
      {
        question: 'Can I extend my stay in Reykjavik?',
        answer: 'Absolutely! Extend Reykjavik nights for +£180 per night. Perfect for Golden Circle tours, glacier walks, or additional Blue Lagoon visits. Get a personalised quote for extensions.'
      },
      {
        question: 'What cabin type is included?',
        answer: 'Balcony cabin is standard in the £2,995pp price. Suite upgrades available—Ambassador suites, Fred. Olsen suites, or Ponant Prestige suites. Get a personalised quote for suite pricing and availability.'
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
        answer: '2 nights at Reykjavik hotel and 2 nights at East Fjords hotel. Both include breakfast. Hotels are strategically located for exploration. Upgrades to higher room categories available—get a personalised quote.'
      },
      {
        question: 'Are transfers included?',
        answer: 'Yes—all transfers between airports, hotels, and cruise port are included. Private transfers available for upgrade. No need to navigate Icelandic conditions with luggage.'
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
      description: 'Iceland cruise from UK 2026. Reykjavik to East Fjords circumnavigation with flights included. Volcano landing, puffin colonies, midnight sun. From £2,995pp. ATOL protected. Expert booking from Limitless Cruises.',
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
    tagline: 'Glide through the heart of Europe',
    description: 'Cruise the legendary rivers of Europe, from the romantic Rhine and Danube to the Seine and Douro. Pass fairytale castles, vineyard-covered hillsides, and charming medieval towns.',
    heroImage: null,
    cardImage: null,
    duration: '7-14 nights',
    season: 'March - December (peak: April-October)',
    startingFrom: 'From £1,800 per person',
    bestFor: ['First-time cruisers', 'Culture enthusiasts', 'Wine lovers', 'Those preferring calm waters'],
    highlights: [
      'Intimate small ship experience',
      'Daily port visits - no sea days',
      'Dock in the heart of cities',
      'All-inclusive dining and drinks',
      'Scenic cruising through valleys',
      'Included excursions'
    ],
    includes: [
      'All meals with wine and beer at dinner',
      'Guided shore excursions',
      'Onboard entertainment',
      'WiFi',
      'Bicycles for independent exploration'
    ],
    cruiseLines: ['Viking', 'AmaWaterways', 'Uniworld', 'Avalon Waterways', 'Scenic'],
    itinerary: [
      { day: '1', location: 'Amsterdam', description: 'Embarkation (Rhine cruise example)' },
      { day: '2', location: 'Cologne', description: 'Historic cathedral city' },
      { day: '3', location: 'Koblenz', description: 'Rhine Gorge scenery' },
      { day: '4', location: 'Heidelberg', description: 'Romantic castle town' },
      { day: '5', location: 'Strasbourg', description: 'Alsace and French culture' },
      { day: '6', location: 'Breisach', description: 'Black Forest gateway' },
      { day: '7', location: 'Basel', description: 'Swiss disembarkation' }
    ],
    destinations: [
      { name: 'Rhine', description: 'Amsterdam to Basel, fairytale castles' },
      { name: 'Danube', description: 'Budapest, Vienna, Passau' },
      { name: 'Seine', description: 'Paris to Normandy' },
      { name: 'Douro', description: 'Portugal\'s wine country' }
    ],
    testimonials: [
      { quote: 'River cruising is the perfect pace. A new town every day, incredible scenery, and no unpacking!', author: 'Margaret H.', location: 'Bristol' },
      { quote: 'The Christmas markets cruise on the Rhine was magical. So festive and beautifully organised.', author: 'David & Anne', location: 'Liverpool' }
    ],
    faq: [
      {
        question: 'What\'s the difference between river and ocean cruising?',
        answer: 'River ships are smaller (100-200 guests), dock in city centres, and sail calm rivers. There are no sea days - you visit a new destination daily.'
      },
      {
        question: 'Do river cruises get rough?',
        answer: 'Rivers are very calm compared to oceans. Motion sickness is rarely an issue on river cruises.'
      },
      {
        question: 'What rivers can I cruise?',
        answer: 'Popular options include the Rhine, Danube, Seine, Rhône, Douro, and Mekong. Each offers unique scenery and experiences.'
      }
    ],
    meta: {
      title: 'European River Cruises | Rhine, Danube, Seine | Limitless Cruises',
      description: 'Explore Europe by river cruise. Sail the Rhine, Danube, Seine and more. Expert booking from Limitless Cruises.',
      keywords: ['river cruise', 'european river cruise', 'rhine cruise', 'danube cruise', 'viking river cruise']
    },
    images: [],
    featured: false, // Hidden - to do later
    priority: 13
  },
  {
    id: 'great-barrier-reef',
    slug: 'great-barrier-reef-cruises',
    title: 'Great Barrier Reef & Australia',
    tagline: 'Discover the world\'s largest coral reef',
    description: 'Experience Australia\'s natural wonder - the Great Barrier Reef. Snorkel or dive among vibrant coral and tropical fish, then explore Australia\'s stunning coastline and iconic cities on this remarkable adventure.',
    heroImage: null,
    cardImage: null,
    duration: '10-18 nights',
    season: 'Year-round (best: April-November for reef conditions)',
    startingFrom: 'From £3,500 per person',
    bestFor: ['Marine life enthusiasts', 'Snorkelers and divers', 'Nature photographers', 'Adventure seekers'],
    highlights: [
      'Snorkel or dive the Great Barrier Reef',
      'See vibrant coral and tropical fish',
      'Visit the Whitsunday Islands',
      'Explore Cairns and Port Douglas',
      'Sydney Harbour and Opera House',
      'Optional rainforest excursions'
    ],
    includes: [
      'All meals on board',
      'Selected reef excursions',
      'Snorkeling equipment',
      'Marine biologist presentations',
      'Port transfers'
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises Australia', 'Celebrity Cruises', 'Coral Expeditions'],
    itinerary: [
      { day: '1', location: 'Sydney', description: 'Embarkation' },
      { day: '2-3', location: 'At Sea', description: 'Sailing north along the coast' },
      { day: '4', location: 'Brisbane', description: 'Queensland\'s capital' },
      { day: '5-6', location: 'Whitsundays', description: 'Island paradise' },
      { day: '7-8', location: 'Cairns', description: 'Great Barrier Reef gateway' },
      { day: '9', location: 'Great Barrier Reef', description: 'Snorkeling and reef exploration' },
      { day: '10-12', location: 'Return journey', description: 'Coastal ports and sea days' }
    ],
    destinations: [
      { name: 'Great Barrier Reef', description: 'World\'s largest coral reef system' },
      { name: 'Whitsunday Islands', description: 'Tropical island paradise' },
      { name: 'Sydney', description: 'Iconic harbour and Opera House' }
    ],
    testimonials: [
      { quote: 'Swimming over the reef and seeing all those fish and coral was beyond incredible. A must-do experience!', author: 'Sarah M.', location: 'London' },
      { quote: 'The combination of cities, islands and reef made this the perfect Australian holiday.', author: 'James & Helen', location: 'Newcastle' }
    ],
    faq: [
      {
        question: 'Can non-swimmers visit the reef?',
        answer: 'Yes! Glass-bottom boats and semi-submersibles offer reef viewing without getting in the water. Introductory snorkeling with flotation is also available.'
      },
      {
        question: 'When is the best time to visit the reef?',
        answer: 'April to November offers the best conditions with calm seas and good visibility. The stinger season (November-May) requires protective suits.'
      },
      {
        question: 'Is the Great Barrier Reef dying?',
        answer: 'While facing challenges, the reef remains spectacular. Many areas show resilience and recovery. Visiting supports conservation efforts.'
      }
    ],
    meta: {
      title: 'Great Barrier Reef Cruises | Australia Ocean Voyages | Limitless Cruises',
      description: 'Explore the Great Barrier Reef by cruise. Snorkel, dive and discover Australia\'s natural wonder. Expert booking from Limitless Cruises.',
      keywords: ['great barrier reef cruise', 'australia cruise', 'reef cruise', 'cairns cruise', 'whitsundays cruise']
    },
    images: [],
    featured: true,
    priority: 14
  },
  {
    id: 'midnight-sun',
    slug: 'midnight-sun-voyages',
    title: 'Midnight Sun Voyages',
    tagline: 'Where the sun never sets',
    description: 'Experience the magic of the Arctic summer when the sun never dips below the horizon. Cruise Norway\'s coast, Svalbard, or Iceland under 24 hours of ethereal daylight in this unique natural phenomenon.',
    heroImage: null,
    cardImage: null,
    duration: '7-14 nights',
    season: 'May - July (peak midnight sun: June 21)',
    startingFrom: 'From £2,000 per person',
    bestFor: ['Nature enthusiasts', 'Photographers', 'Adventure seekers', 'Those who love unique experiences'],
    highlights: [
      '24 hours of continuous daylight',
      'Surreal golden-hour lighting',
      'Extended wildlife viewing opportunities',
      'Norwegian coastal beauty',
      'Arctic exploration',
      'North Cape - Europe\'s northernmost point'
    ],
    includes: [
      'All meals on board',
      'Midnight sun viewing events',
      'Wildlife excursions',
      'Expert naturalist guides',
      'Port visits and excursions'
    ],
    cruiseLines: ['Hurtigruten', 'Viking', 'Ponant', 'Fred. Olsen', 'Silversea'],
    itinerary: [
      { day: '1', location: 'Bergen, Norway', description: 'Embarkation' },
      { day: '2-3', location: 'Norwegian coast', description: 'Coastal sailing' },
      { day: '4', location: 'Lofoten Islands', description: 'Arctic beauty' },
      { day: '5', location: 'Tromsø', description: 'Gateway to the Arctic' },
      { day: '6', location: 'North Cape', description: 'Midnight sun at 71°N' },
      { day: '7', location: 'Hammerfest', description: 'World\'s northernmost town' },
      { day: '8+', location: 'Return or Svalbard', description: 'Extended Arctic exploration' }
    ],
    destinations: [
      { name: 'Norwegian Coast', description: 'Bergen to North Cape' },
      { name: 'Svalbard', description: 'High Arctic wilderness' },
      { name: 'Iceland', description: 'Land of the midnight sun' }
    ],
    testimonials: [
      { quote: 'Standing at North Cape at midnight with the sun still shining was surreal. An unforgettable moment.', author: 'Robert P.', location: 'Glasgow' },
      { quote: 'The lighting for photography is incredible - golden hour literally all night long!', author: 'Janet L.', location: 'Birmingham' }
    ],
    faq: [
      {
        question: 'When can I see the midnight sun?',
        answer: 'The midnight sun occurs from mid-May to late July, depending on latitude. June 21 (summer solstice) offers the longest daylight.'
      },
      {
        question: 'Where is the best place to see it?',
        answer: 'Norway\'s North Cape (71°N) is iconic. Svalbard and northern Iceland also offer excellent midnight sun viewing.'
      },
      {
        question: 'Will I be able to sleep?',
        answer: 'Ships provide blackout curtains. Many guests find the continuous light energizing and enjoy late-night activities.'
      }
    ],
    meta: {
      title: 'Midnight Sun Cruises | Arctic Summer Voyages | Limitless Cruises',
      description: 'Experience the midnight sun on an Arctic cruise. 24-hour daylight in Norway, Svalbard or Iceland. Expert booking from Limitless Cruises.',
      keywords: ['midnight sun cruise', 'arctic summer cruise', 'norway midnight sun', 'svalbard cruise', 'north cape cruise']
    },
    images: [],
    featured: false,
    priority: 16
  },
  {
    id: 'grand-voyages',
    slug: 'grand-voyages',
    title: 'Grand Voyages',
    tagline: 'Extended journeys of discovery',
    description: 'Embark on an extended voyage of 30 to 60 nights, exploring multiple continents and oceans. These immersive journeys offer the depth of experience and cultural immersion only possible with extended time at sea.',
    heroImage: null,
    cardImage: null,
    duration: '30-60+ nights',
    season: 'Year-round (repositioning seasons optimal)',
    startingFrom: 'From £5,000 per person',
    bestFor: ['Extended travellers', 'Retirees', 'Those seeking immersive experiences', 'Value seekers'],
    highlights: [
      'Visit multiple continents in one voyage',
      'Deep cultural immersion',
      'Outstanding value per night',
      'Strong onboard community',
      'No packing and unpacking',
      'Grand voyage exclusive events and perks'
    ],
    includes: [
      'All meals and drinks (select lines)',
      'Gratuities included',
      'Onboard enrichment programs',
      'Laundry service (select lines)',
      'Special grand voyage events',
      'Extended shore time in key ports'
    ],
    cruiseLines: ['Cunard', 'Holland America', 'Princess Cruises', 'P&O Cruises', 'Fred. Olsen'],
    itinerary: [
      { day: '1', location: 'Southampton', description: 'Begin grand voyage' },
      { day: '2-10', location: 'Atlantic crossing', description: 'Sea days and Caribbean ports' },
      { day: '11-20', location: 'South America', description: 'Buenos Aires, Rio, Montevideo' },
      { day: '21-35', location: 'Africa', description: 'Cape Town, Madagascar, Seychelles' },
      { day: '36-50', location: 'Asia', description: 'Dubai, India, Southeast Asia' },
      { day: '51-60', location: 'Return home', description: 'Mediterranean and homeward' }
    ],
    destinations: [
      { name: 'Multiple continents', description: 'South America, Africa, Asia, Europe' },
      { name: 'Iconic cities', description: 'Cape Town, Singapore, Rio de Janeiro' },
      { name: 'Remote ports', description: 'Unique stops not on shorter itineraries' }
    ],
    testimonials: [
      { quote: 'Our 50-night grand voyage was life-changing. The friendships we made and places we visited will stay with us forever.', author: 'George & Patricia', location: 'Hampshire' },
      { quote: 'The value is incredible when you consider accommodation, food, and transport to so many destinations.', author: 'Michael T.', location: 'Devon' }
    ],
    faq: [
      {
        question: 'How do I pack for 30-60 nights?',
        answer: 'Most grand voyages include laundry service. Pack mix-and-match pieces and layers. You\'ll need formal wear for special evenings.'
      },
      {
        question: 'What about medication and health?',
        answer: 'Ships have onboard medical facilities. Ensure adequate medication supplies and travel insurance for extended trips.'
      },
      {
        question: 'Can I book part of a grand voyage?',
        answer: 'Yes, most cruise lines offer segments of grand voyages if you can\'t commit to the full journey.'
      }
    ],
    meta: {
      title: 'Grand Voyages | Extended Cruise Journeys | Limitless Cruises',
      description: 'Embark on an extended grand voyage of 30-60+ nights. Explore multiple continents and oceans. Expert booking from Limitless Cruises.',
      keywords: ['grand voyage', 'extended cruise', 'long cruise', 'multi-continent cruise', '60 night cruise']
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

