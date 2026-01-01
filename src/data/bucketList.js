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
    tagline: 'Journey to the last great wilderness',
    description: 'Experience the pristine beauty of Antarctica, where penguins rule the ice, whales breach in icy waters, and towering icebergs create a landscape unlike anywhere else on Earth.',
    heroImage: null,
    cardImage: null,
    duration: '10-20 nights',
    season: 'November - March (Antarctic summer)',
    startingFrom: 'From £4,500 per person',
    bestFor: ['Wildlife lovers', 'Adventure seekers', 'Photographers', 'Nature enthusiasts'],
    highlights: [
      'Zodiac landings on pristine shores',
      'See thousands of penguins in their natural habitat',
      'Cross the legendary Drake Passage',
      'Kayak among icebergs',
      'Expert naturalist guides',
      'Whale watching opportunities',
      'Ice camping experiences (selected voyages)'
    ],
    includes: [
      'All meals and drinks',
      'Zodiac excursions',
      'Expert naturalist guides',
      'Expedition team lectures',
      'Parka and boots rental',
      'Shore landing activities'
    ],
    cruiseLines: ['Hurtigruten', 'Ponant', 'Silversea', 'Quark Expeditions', 'Lindblad Expeditions'],
    itinerary: [
      { day: '1', location: 'Ushuaia, Argentina', description: 'Gateway to Antarctica' },
      { day: '2-3', location: 'Drake Passage', description: 'Crossing to the White Continent' },
      { day: '4-9', location: 'Antarctic Peninsula', description: 'Daily Zodiac landings and wildlife viewing' },
      { day: '10', location: 'South Shetland Islands', description: 'Penguin colonies and seals' },
      { day: '11-12', location: 'Drake Passage return', description: 'Reflect on your adventure' },
      { day: '13', location: 'Ushuaia', description: 'Journey complete' }
    ],
    destinations: [
      { name: 'Antarctic Peninsula', description: 'Spectacular ice formations and wildlife' },
      { name: 'South Shetland Islands', description: 'Penguin rookeries and research stations' },
      { name: 'Lemaire Channel', description: 'Stunning narrow passage between icebergs' }
    ],
    testimonials: [
      { quote: 'Antarctica exceeded all expectations. The penguins, the icebergs, the silence - absolutely magical.', author: 'Sarah K.', location: 'Manchester' },
      { quote: 'A truly once-in-a-lifetime experience. The expedition team made it educational and unforgettable.', author: 'Robert & Jane', location: 'Edinburgh' }
    ],
    faq: [
      {
        question: 'When is the best time to visit Antarctica?',
        answer: 'November to March is Antarctic summer, offering the best weather and wildlife viewing. December and January have the most penguin activity.'
      },
      {
        question: 'How rough is the Drake Passage?',
        answer: 'The Drake Passage can be rough, but modern expedition ships are well-equipped. Many crossings are surprisingly calm. Motion sickness medication is recommended.'
      },
      {
        question: 'Do I need special clothing?',
        answer: 'Expedition cruises typically provide parkas and boots. You\'ll need warm layers, waterproof trousers, and gloves. A packing list will be provided.'
      }
    ],
    meta: {
      title: 'Antarctica Cruise Expeditions | Once in a Lifetime Polar Adventure',
      description: 'Discover Antarctica on an expedition cruise. See penguins, whales, and icebergs on voyages from 10-20 nights. Expert booking from Limitless Cruises.',
      keywords: ['antarctica cruise', 'antarctica expedition', 'polar cruise', 'penguin cruise', 'drake passage']
    },
    images: [],
    featured: true,
    priority: 2
  },
  {
    id: 'japan-asia',
    slug: 'japan-asia-cruises',
    title: 'Japan & Asia Cruises',
    tagline: 'Where ancient traditions meet modern wonders',
    description: 'Discover the captivating blend of ancient traditions and cutting-edge innovation across Japan and Asia. From cherry blossoms to towering skyscrapers, serene temples to bustling markets.',
    heroImage: null,
    cardImage: null,
    duration: '14-21+ nights',
    season: 'Year-round (cherry blossom season: March-May)',
    startingFrom: 'From £3,500 per person',
    bestFor: ['Culture enthusiasts', 'Food lovers', 'History buffs', 'Photography enthusiasts'],
    highlights: [
      'Cherry blossom season (spring)',
      'Ancient temples and shrines',
      'Modern cities: Tokyo, Singapore, Hong Kong',
      'Exceptional Asian cuisine',
      'Traditional tea ceremonies',
      'Bullet train experiences',
      'Geisha districts and cultural performances'
    ],
    includes: [
      'All meals (including specialty restaurants)',
      'Cultural enrichment programs',
      'Traditional performances onboard',
      'Expert local guides',
      'Selected shore excursions'
    ],
    cruiseLines: ['Celebrity Cruises', 'Princess Cruises', 'Holland America', 'Ponant', 'Cunard'],
    itinerary: [
      { day: '1', location: 'Tokyo, Japan', description: 'Begin in the neon capital' },
      { day: '2-3', location: 'At sea', description: 'Onboard cultural enrichment' },
      { day: '4', location: 'Osaka/Kyoto', description: 'Ancient temples and gardens' },
      { day: '5-6', location: 'Shanghai, China', description: 'Modern metropolis' },
      { day: '7-8', location: 'Hong Kong', description: 'Victoria Harbour views' },
      { day: '9-10', location: 'Vietnam ports', description: 'Rich history and cuisine' },
      { day: '11-12', location: 'Singapore', description: 'Garden city finale' }
    ],
    destinations: [
      { name: 'Japan', description: 'Tokyo, Kyoto, Osaka, Hiroshima' },
      { name: 'China', description: 'Shanghai, Beijing, Hong Kong' },
      { name: 'Southeast Asia', description: 'Vietnam, Thailand, Singapore' }
    ],
    testimonials: [
      { quote: 'Japan in cherry blossom season was magical. The culture, food, and people made it unforgettable.', author: 'Emma L.', location: 'Birmingham' },
      { quote: 'Perfect blend of ancient and modern. Every port was a new adventure.', author: 'Michael H.', location: 'Leeds' }
    ],
    faq: [
      {
        question: 'When is cherry blossom season?',
        answer: 'Cherry blossoms typically bloom from late March to early May, with peak viewing in early April. Timing varies by region.'
      },
      {
        question: 'Do I need a visa for Asian countries?',
        answer: 'Visa requirements vary by country. Japan offers visa-free entry for UK citizens for short stays. Your cruise line will provide visa information.'
      },
      {
        question: 'What currency should I bring?',
        answer: 'Each country has its own currency. Most major ports accept credit cards. It\'s helpful to have some local currency for markets and small vendors.'
      }
    ],
    meta: {
      title: 'Japan & Asia Cruises | Cultural Journey Through the Far East',
      description: 'Discover Japan and Asia on a cultural cruise. Experience cherry blossoms, ancient temples, and modern cities. Expert booking from Limitless Cruises.',
      keywords: ['japan cruise', 'asia cruise', 'cherry blossom cruise', 'far east cruise', 'asian cruise holidays']
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
    tagline: 'Darwin\'s living laboratory',
    description: 'Explore the Galápagos Islands, where unique wildlife found nowhere else on Earth inspired Charles Darwin. Snorkel with sea lions, observe giant tortoises, and discover endemic species in their natural habitat.',
    heroImage: null,
    cardImage: null,
    duration: '7-10 nights',
    season: 'Year-round (dry season: June-December)',
    startingFrom: 'From £3,500 per person',
    bestFor: ['Wildlife enthusiasts', 'Nature photographers', 'Families', 'Adventure seekers'],
    highlights: [
      'See giant tortoises in the wild',
      'Swim with sea lions',
      'Observe blue-footed boobies',
      'Snorkel with marine iguanas',
      'Visit Darwin Research Station',
      'Endemic wildlife viewing',
      'Small ship expedition experience'
    ],
    includes: [
      'All meals and drinks',
      'Snorkeling equipment',
      'Naturalist guides',
      'Zodiac excursions',
      'National park fees',
      'Galápagos transit card'
    ],
    cruiseLines: ['Celebrity Xpedition', 'Silversea', 'Lindblad Expeditions', 'G Adventures'],
    itinerary: [
      { day: '1', location: 'Quito/Guayaquil', description: 'Ecuador arrival' },
      { day: '2', location: 'Fly to Galápagos', description: 'Board expedition ship' },
      { day: '3-8', location: 'Galápagos Islands', description: 'Daily island visits and wildlife encounters' },
      { day: '9', location: 'Return to mainland', description: 'Flight to Quito' },
      { day: '10', location: 'Departure', description: 'Journey complete' }
    ],
    destinations: [
      { name: 'Galápagos Islands', description: 'Unique wildlife and volcanic landscapes' },
      { name: 'Multiple islands', description: 'Each with distinct ecosystems and species' }
    ],
    testimonials: [
      { quote: 'The wildlife encounters were incredible - sea lions swimming with us, tortoises everywhere. A nature lover\'s paradise.', author: 'Jennifer M.', location: 'Norwich' },
      { quote: 'Our kids were amazed by the animals. The guides were fantastic and made it educational and fun.', author: 'The Johnson Family', location: 'Brighton' }
    ],
    faq: [
      {
        question: 'How big are the ships?',
        answer: 'Galápagos ships are typically small (50-100 passengers) to allow for intimate wildlife viewing and fewer environmental impacts.'
      },
      {
        question: 'Do I need to be a good swimmer?',
        answer: 'While snorkeling is optional, basic swimming ability is helpful. Life jackets are provided and activities can be adapted to comfort levels.'
      },
      {
        question: 'What wildlife will I see?',
        answer: 'You\'ll see giant tortoises, marine iguanas, sea lions, blue-footed boobies, penguins, and many other endemic species unique to the Galápagos.'
      }
    ],
    meta: {
      title: 'Galápagos Islands Cruise | Wildlife Expedition | Limitless Cruises',
      description: 'Explore the Galápagos Islands on a small ship expedition. See unique wildlife, snorkel with sea lions, and visit Darwin\'s inspiration. Expert booking from Limitless Cruises.',
      keywords: ['galapagos cruise', 'galapagos expedition', 'darwin cruise', 'ecuador cruise', 'wildlife cruise']
    },
    images: [],
    featured: true,
    priority: 5
  },
  {
    id: 'northern-lights',
    slug: 'northern-lights-arctic',
    title: 'Northern Lights & Arctic',
    tagline: 'Dance under the Aurora Borealis',
    description: 'Witness the magical Northern Lights in the Arctic regions of Norway, Iceland, and beyond. Combine Aurora viewing with husky sledding, snow activities, and stunning Arctic landscapes.',
    heroImage: null,
    cardImage: null,
    duration: '7-14 nights',
    season: 'September - March (best: November - February)',
    startingFrom: 'From £2,500 per person',
    bestFor: ['Photography enthusiasts', 'Adventure seekers', 'Winter lovers', 'Aurora chasers'],
    highlights: [
      'Northern Lights viewing',
      'Arctic Circle crossing',
      'Husky sledding experiences',
      'Snowmobiling adventures',
      'Tromsø and Svalbard visits',
      'Winter landscapes',
      'Midnight sun (spring voyages)'
    ],
    includes: [
      'All meals',
      'Aurora viewing activities',
      'Arctic experiences',
      'Expert guides',
      'Selected winter activities'
    ],
    cruiseLines: ['Hurtigruten', 'Viking', 'P&O Cruises', 'Fred. Olsen'],
    itinerary: [
      { day: '1', location: 'Tromsø, Norway', description: 'Gateway to the Arctic' },
      { day: '2-5', location: 'Norwegian coast', description: 'Aurora hunting and fjords' },
      { day: '6-7', location: 'North Cape', description: 'Northernmost point of Europe' },
      { day: '8-10', location: 'Svalbard (optional)', description: 'Polar bear territory' },
      { day: '11-14', location: 'Return journey', description: 'More Aurora opportunities' }
    ],
    destinations: [
      { name: 'Northern Norway', description: 'Tromsø, Alta, North Cape' },
      { name: 'Svalbard', description: 'Arctic wilderness and polar bears' },
      { name: 'Iceland', description: 'Alternative Northern Lights destination' }
    ],
    testimonials: [
      { quote: 'The Northern Lights were incredible - dancing across the sky in shades of green and purple. Absolutely magical.', author: 'Daniel P.', location: 'Sheffield' },
      { quote: 'Husky sledding and Aurora viewing made this a winter wonderland adventure we\'ll never forget.', author: 'Linda & Mark', location: 'Bristol' }
    ],
    faq: [
      {
        question: 'When can I see the Northern Lights?',
        answer: 'The Aurora is visible from September to March, with peak viewing in November through February. Clear, dark skies are essential.'
      },
      {
        question: 'How cold will it be?',
        answer: 'Temperatures can range from -5°C to -20°C or colder. Warm layers, thermal clothing, and proper winter gear are essential.'
      },
      {
        question: 'Will I definitely see the Northern Lights?',
        answer: 'While sightings are highly likely during peak season, the Aurora is a natural phenomenon. Most voyages offer multiple viewing opportunities.'
      }
    ],
    meta: {
      title: 'Northern Lights Cruise | Aurora Borealis & Arctic | Limitless Cruises',
      description: 'Experience the Northern Lights on an Arctic cruise. See Aurora Borealis, try husky sledding, and explore Norway\'s winter landscapes. Expert booking from Limitless Cruises.',
      keywords: ['northern lights cruise', 'aurora cruise', 'arctic cruise', 'norway cruise', 'northern lights holiday']
    },
    images: [],
    featured: true,
    priority: 6
  },
  {
    id: 'south-america',
    slug: 'south-america-cruises',
    title: 'South America',
    tagline: 'Vibrant cultures and stunning landscapes',
    description: 'Discover the dramatic beauty and rich culture of South America. From the Amazon rainforest to the wilds of Patagonia, from vibrant cities to ancient Incan ruins, experience the continent\'s incredible diversity on an unforgettable voyage.',
    heroImage: null,
    cardImage: null,
    duration: '10-21+ nights',
    season: 'Year-round (best: October-April)',
    startingFrom: 'From £2,000 per person',
    bestFor: ['Culture enthusiasts', 'Nature lovers', 'Adventure seekers', 'History buffs'],
    highlights: [
      'Amazon River cruises through the rainforest',
      'Visit iconic cities like Rio de Janeiro, Buenos Aires, and Lima',
      'Explore ancient Machu Picchu and Incan ruins',
      'Witness the natural wonder of Iguazu Falls',
      'Patagonia\'s breathtaking glaciers and fjords',
      'Experience vibrant Latin American culture'
    ],
    includes: [
      'All meals on board',
      'Selected shore excursions',
      'Cultural performances',
      'Port transfers'
    ],
    cruiseLines: ['Holland America Line', 'Celebrity Cruises', 'Princess Cruises', 'Azamara'],
    itinerary: [
      { day: '1', location: 'Buenos Aires, Argentina', description: 'Embarkation and city exploration' },
      { day: '2-3', location: 'Montevideo, Uruguay', description: 'Colonial charm and coastal beauty' },
      { day: '4-5', location: 'At Sea', description: 'Relax and enjoy ship amenities' },
      { day: '6-7', location: 'Falkland Islands', description: 'Wildlife and remote landscapes' },
      { day: '8-10', location: 'Cape Horn & Patagonia', description: 'Dramatic fjords and glaciers' },
      { day: '11-12', location: 'Punta Arenas, Chile', description: 'Gateway to Patagonia' },
      { day: '13-14', location: 'Strait of Magellan', description: 'Scenic cruising' },
      { day: '15+', location: 'Additional ports', description: 'Ushuaia, Valparaíso, and more' }
    ],
    destinations: [
      { name: 'Argentina', description: 'Buenos Aires, Ushuaia, Patagonia' },
      { name: 'Chile', description: 'Valparaíso, Chilean Fjords, Cape Horn' },
      { name: 'Brazil', description: 'Rio de Janeiro, Amazon River' },
      { name: 'Peru', description: 'Lima, Machu Picchu (overland)' }
    ],
    testimonials: [
      { quote: 'South America exceeded all expectations. The diversity of landscapes and cultures was incredible.', author: 'David M.', location: 'Manchester' },
      { quote: 'The Amazon cruise was a highlight, and visiting Machu Picchu was a dream come true.', author: 'Lisa K.', location: 'Birmingham' }
    ],
    faq: [
      {
        question: 'When is the best time to cruise South America?',
        answer: 'October to April is generally the best time, with warmer weather in the south and drier conditions. Peak season is December to February for summer weather.'
      },
      {
        question: 'Can I visit Machu Picchu on a South America cruise?',
        answer: 'Yes, many cruises offer overland excursions to Machu Picchu from ports like Lima or Callao. These are typically 2-3 day add-on experiences.'
      },
      {
        question: 'What is the weather like?',
        answer: 'Weather varies greatly by region and season. Northern areas (Amazon, Brazil) are tropical year-round, while the south (Patagonia) has distinct seasons with cold winters.'
      }
    ],
    meta: {
      title: 'South America Cruises | Amazon & Patagonia Voyages | Limitless Cruises',
      description: 'Discover South America by cruise. Explore the Amazon, Patagonia, vibrant cities and ancient ruins. Expert booking advice from Limitless Cruises.',
      keywords: ['south america cruise', 'amazon cruise', 'patagonia cruise', 'machu picchu cruise', 'south american voyage']
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
    tagline: 'Paradise found in the South Pacific',
    description: 'Discover the stunning beauty of the South Pacific and New Zealand. From pristine tropical islands with turquoise waters to New Zealand\'s dramatic landscapes, experience paradise in all its forms on this unforgettable journey.',
    heroImage: null,
    cardImage: null,
    duration: '10-18+ nights',
    season: 'Year-round (best: October-April for New Zealand)',
    startingFrom: 'From £2,200 per person',
    bestFor: ['Nature lovers', 'Beach enthusiasts', 'Adventure seekers', 'Photography enthusiasts'],
    highlights: [
      'Pristine beaches and turquoise waters of the Pacific Islands',
      'New Zealand\'s stunning fjords, mountains, and coastlines',
      'Explore vibrant Maori culture',
      'Snorkelling and water sports in crystal-clear lagoons',
      'Adventure activities in New Zealand (bungee, hiking)',
      'Relaxed island lifestyle and friendly locals'
    ],
    includes: [
      'All meals on board',
      'Selected shore excursions',
      'Cultural experiences',
      'Port transfers'
    ],
    cruiseLines: ['Princess Cruises', 'P&O Cruises', 'Celebrity Cruises', 'Holland America Line'],
    itinerary: [
      { day: '1', location: 'Sydney, Australia', description: 'Embarkation (or Auckland, New Zealand)' },
      { day: '2-3', location: 'At Sea', description: 'Crossing the Tasman Sea' },
      { day: '4', location: 'Auckland, New Zealand', description: 'City of Sails exploration' },
      { day: '5', location: 'Bay of Islands, NZ', description: 'Beautiful coastline and marine life' },
      { day: '6-7', location: 'At Sea', description: 'Scenic cruising' },
      { day: '8', location: 'Fiji', description: 'Tropical paradise islands' },
      { day: '9-10', location: 'Vanuatu', description: 'Volcanic islands and culture' },
      { day: '11-12', location: 'New Caledonia', description: 'French Pacific charm' },
      { day: '13+', location: 'Additional Pacific islands', description: 'Tonga, Samoa, or more New Zealand ports' }
    ],
    destinations: [
      { name: 'New Zealand', description: 'Auckland, Bay of Islands, Milford Sound, Wellington' },
      { name: 'Fiji', description: 'Tropical islands, pristine beaches' },
      { name: 'Vanuatu', description: 'Volcanic landscapes, local culture' },
      { name: 'New Caledonia', description: 'French Pacific, beautiful lagoons' }
    ],
    testimonials: [
      { quote: 'New Zealand\'s fjords were absolutely breathtaking. The Pacific islands were pure paradise.', author: 'Helen T.', location: 'Bristol' },
      { quote: 'The perfect combination of adventure in New Zealand and relaxation in the islands.', author: 'Mark D.', location: 'Leeds' }
    ],
    faq: [
      {
        question: 'When is the best time for Pacific & New Zealand cruises?',
        answer: 'October to April is ideal for New Zealand (warmer weather), while the Pacific Islands can be visited year-round, though the dry season (May-October) is often preferred.'
      },
      {
        question: 'Do I need a visa for New Zealand?',
        answer: 'UK citizens typically need a New Zealand Electronic Travel Authority (NZeTA) before travel, which can be obtained online.'
      },
      {
        question: 'What activities are available?',
        answer: 'Activities range from relaxing beach days and snorkelling in the Pacific Islands to adventure activities like hiking, bungee jumping, and scenic cruises in New Zealand\'s fjords.'
      }
    ],
    meta: {
      title: 'Pacific & New Zealand Cruises | South Pacific Voyages | Limitless Cruises',
      description: 'Discover the Pacific Islands and New Zealand by cruise. Pristine beaches, stunning fjords, and island paradise. Expert booking advice from Limitless Cruises.',
      keywords: ['pacific cruise', 'new zealand cruise', 'fiji cruise', 'south pacific cruise', 'new zealand fjords']
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
    tagline: 'The classic ocean voyage experience',
    description: 'Experience the romance of crossing the Atlantic in the tradition of the great ocean liners. Days of relaxation at sea, world-class entertainment, and the anticipation of arrival in a new world.',
    heroImage: null, // Images now loaded via Supabase
    cardImage: null, // Transatlantic card - Upload to Vercel
    duration: '7-14 nights',
    season: 'Year-round (peak: April-May, September-October)',
    startingFrom: 'From £899 per person',
    bestFor: ['Ocean liner enthusiasts', 'Those who prefer not to fly', 'Classic cruise lovers', 'First-time cruisers'],
    highlights: [
      'Classic ocean liner experience on Cunard\'s Queen Mary 2',
      'Six or seven relaxing sea days',
      'World-class entertainment and enrichment programs',
      'Elegant afternoon tea and formal nights',
      'Outstanding dining experiences',
      'Arrive refreshed without jet lag'
    ],
    includes: [
      'All meals and room service',
      'Entertainment and enrichment lectures',
      'Onboard activities',
      'Formal evening events',
      'Access to ship amenities'
    ],
    cruiseLines: ['Cunard', 'Celebrity Cruises', 'Holland America', 'Norwegian Cruise Line'],
    itinerary: [
      { day: '1', location: 'Southampton, UK', description: 'Embarkation and departure' },
      { day: '2-6', location: 'At Sea', description: 'Relaxing days crossing the Atlantic' },
      { day: '7', location: 'New York, USA', description: 'Arrival under the Statue of Liberty' }
    ],
    destinations: [
      { name: 'Southampton to New York', description: 'The classic transatlantic route' },
      { name: 'Eastbound crossings', description: 'New York to Southampton' },
      { name: 'Repositioning voyages', description: 'Seasonal crossings with added ports' }
    ],
    testimonials: [
      { quote: 'Arriving in New York by sea, passing the Statue of Liberty, was absolutely magical. The crossing was so relaxing.', author: 'William & Mary', location: 'Kent' },
      { quote: 'Queen Mary 2 is simply the most elegant way to cross the Atlantic. We\'ll never fly again!', author: 'Elizabeth T.', location: 'Surrey' }
    ],
    faq: [
      {
        question: 'How long does a transatlantic crossing take?',
        answer: 'A typical Southampton to New York crossing takes 7 nights. Some voyages include stops in ports like Halifax or Boston.'
      },
      {
        question: 'Is it rough crossing the Atlantic?',
        answer: 'The Atlantic can be unpredictable, but modern ships like Queen Mary 2 are designed for ocean crossings with excellent stabilizers.'
      },
      {
        question: 'What is there to do on sea days?',
        answer: 'Enrichment lectures, West End style shows, fine dining, spa treatments, afternoon tea, and simply enjoying the ocean views.'
      }
    ],
    meta: {
      title: 'Transatlantic Cruises | Ocean Crossings on Queen Mary 2',
      description: 'Experience the classic transatlantic crossing. Sail from Southampton to New York on Cunard\'s Queen Mary 2. Expert booking from Limitless Cruises.',
      keywords: ['transatlantic cruise', 'ocean crossing', 'queen mary 2', 'cunard crossing', 'southampton new york']
    },
    images: [],
    featured: true,
    priority: 10
  },
  {
    id: 'iceland-circumnavigation',
    slug: 'iceland-circumnavigation',
    title: 'Iceland Circumnavigation',
    tagline: 'Land of fire and ice',
    description: 'Sail around Iceland to discover its otherworldly landscapes of geysers, glaciers, volcanoes, and waterfalls. Witness the midnight sun or Northern Lights depending on the season.',
    heroImage: null,
    cardImage: null,
    duration: '10-14 nights',
    season: 'May - September (summer), September - March (Northern Lights)',
    startingFrom: 'From £2,500 per person',
    bestFor: ['Nature lovers', 'Photography enthusiasts', 'Adventure seekers', 'Geology enthusiasts'],
    highlights: [
      'Witness dramatic volcanic landscapes',
      'See powerful waterfalls and geysers',
      'Whale watching in Husavik',
      'Midnight sun in summer',
      'Northern Lights potential (winter voyages)',
      'Explore remote Westfjords'
    ],
    includes: [
      'All meals on board',
      'Selected shore excursions',
      'Expert guides',
      'Zodiac landings (expedition ships)',
      'Lectures on geology and nature'
    ],
    cruiseLines: ['Hurtigruten', 'Viking', 'Ponant', 'Silversea', 'Fred. Olsen'],
    itinerary: [
      { day: '1', location: 'Reykjavik', description: 'Embarkation in Iceland\'s capital' },
      { day: '2', location: 'Westfjords', description: 'Remote fjords and seabird cliffs' },
      { day: '3', location: 'Akureyri', description: 'Gateway to the north' },
      { day: '4', location: 'Husavik', description: 'Whale watching capital' },
      { day: '5-6', location: 'East Fjords', description: 'Dramatic landscapes' },
      { day: '7', location: 'Heimaey', description: 'Westman Islands' },
      { day: '8', location: 'Return to Reykjavik', description: 'Circumnavigation complete' }
    ],
    destinations: [
      { name: 'Reykjavik', description: 'Vibrant capital city' },
      { name: 'Westfjords', description: 'Remote, dramatic coastline' },
      { name: 'North Iceland', description: 'Akureyri, Husavik, Godafoss' }
    ],
    testimonials: [
      { quote: 'Iceland by sea is the best way to truly appreciate its incredible coastline. Every port was a new adventure.', author: 'Jonathan K.', location: 'Edinburgh' },
      { quote: 'Seeing the Northern Lights from the ship\'s deck while anchored in a fjord was unforgettable.', author: 'Rachel & Tom', location: 'Manchester' }
    ],
    faq: [
      {
        question: 'When can I see the Northern Lights?',
        answer: 'Northern Lights are visible from September to March. Summer voyages instead feature the midnight sun.'
      },
      {
        question: 'What is the weather like?',
        answer: 'Icelandic weather is unpredictable. Summer temperatures average 10-15°C. Layered, waterproof clothing is essential.'
      },
      {
        question: 'Can I combine with a land stay?',
        answer: 'Yes, many cruises offer pre or post Golden Circle tours, glacier walks, or Blue Lagoon visits.'
      }
    ],
    meta: {
      title: 'Iceland Cruises | Circumnavigation & Northern Lights | Limitless Cruises',
      description: 'Sail around Iceland. Witness volcanoes, glaciers, Northern Lights and midnight sun. Expert booking from Limitless Cruises.',
      keywords: ['iceland cruise', 'iceland circumnavigation', 'northern lights cruise', 'iceland expedition', 'reykjavik cruise']
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

