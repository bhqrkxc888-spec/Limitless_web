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
    heroImage: '/images/bucket-list/world-cruises-hero.jpg',
    cardImage: '/images/bucket-list/world-cruises-card.jpg',
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
    heroImage: '/images/bucket-list/antarctica-hero.jpg',
    cardImage: '/images/bucket-list/antarctica-card.jpg',
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
    heroImage: '/images/bucket-list/japan-asia-hero.jpg',
    cardImage: '/images/bucket-list/japan-asia-card.jpg',
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
    images: [],
    featured: true,
    priority: 3
  },
  {
    id: 'rocky-mountaineer-alaska',
    slug: 'rocky-mountaineer-alaska',
    title: 'Rocky Mountaineer & Alaska',
    tagline: 'Iconic rail journey meets stunning cruise',
    description: 'Combine two bucket-list experiences: the legendary Rocky Mountaineer train journey through Canada\'s stunning mountain landscapes, followed by an Alaska cruise through the Inside Passage.',
    heroImage: '/images/bucket-list/rocky-mountaineer-hero.jpg',
    cardImage: '/images/bucket-list/rocky-mountaineer-card.jpg',
    duration: '10-14 nights',
    season: 'May - September',
    startingFrom: 'From £5,500 per person',
    bestFor: ['Rail enthusiasts', 'Scenic travelers', 'Nature lovers', 'Adventure seekers'],
    highlights: [
      'Rocky Mountaineer train journey',
      'Alaska Inside Passage cruise',
      'Spectacular mountain scenery',
      'Wildlife viewing opportunities',
      'Glacier viewing',
      'Luxury rail experience',
      'Combined land and sea adventure'
    ],
    includes: [
      'Rocky Mountaineer train journey (2-3 days)',
      '7-night Alaska cruise',
      'Meals on train and ship',
      'Hotel stays in Vancouver',
      'Scenic dome car access',
      'Selected shore excursions'
    ],
    cruiseLines: ['Princess Cruises', 'Holland America', 'Celebrity Cruises', 'Royal Caribbean'],
    itinerary: [
      { day: '1', location: 'Vancouver arrival', description: 'Welcome to Canada' },
      { day: '2-3', location: 'Rocky Mountaineer train', description: 'Journey through the Canadian Rockies' },
      { day: '4', location: 'Banff/Jasper', description: 'Mountain resort stay' },
      { day: '5', location: 'Return to Vancouver', description: 'Board your cruise ship' },
      { day: '6-7', location: 'Inside Passage', description: 'Scenic cruising' },
      { day: '8', location: 'Ketchikan', description: 'Salmon capital' },
      { day: '9', location: 'Juneau', description: 'Alaska\'s capital' },
      { day: '10', location: 'Skagway', description: 'Gold rush history' },
      { day: '11', location: 'Glacier Bay', description: 'Ice formations' },
      { day: '12-13', location: 'At sea', description: 'Relax and enjoy' },
      { day: '14', location: 'Vancouver', description: 'Journey complete' }
    ],
    destinations: [
      { name: 'Canadian Rockies', description: 'Spectacular mountain passes by train' },
      { name: 'Alaska Inside Passage', description: 'Protected waterways and wildlife' },
      { name: 'Glacier Bay', description: 'Tidewater glaciers and ice formations' }
    ],
    testimonials: [
      { quote: 'The train journey was breathtaking, and Alaska was the perfect complement. Two amazing experiences in one trip!', author: 'Patricia & Richard', location: 'Glasgow' },
      { quote: 'Rocky Mountaineer exceeded expectations, and the cruise was the perfect way to end the adventure.', author: 'James W.', location: 'Cardiff' }
    ],
    faq: [
      {
        question: 'What routes does Rocky Mountaineer offer?',
        answer: 'Popular routes include Vancouver to Banff/Jasper, and Vancouver to Whistler. All routes feature glass-dome cars for panoramic views.'
      },
      {
        question: 'When is the best time for this trip?',
        answer: 'May to September offers the best weather and scenery. July and August are peak season with longer daylight hours.'
      },
      {
        question: 'How long is the train journey?',
        answer: 'The Rocky Mountaineer journey is typically 2-3 days, with overnight hotel stays included. The train operates during daylight hours for maximum scenic viewing.'
      }
    ],
    meta: {
      title: 'Rocky Mountaineer & Alaska Cruise | Train & Cruise Combination',
      description: 'Combine the iconic Rocky Mountaineer train with an Alaska cruise. Experience Canadian Rockies by rail and Inside Passage by sea. Expert booking from Limitless Cruises.',
      keywords: ['rocky mountaineer cruise', 'alaska train cruise', 'rocky mountaineer alaska', 'canada alaska cruise', 'rail and cruise']
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
    description: 'Explore the Galápagos Islands, where unique wildlife found nowhere else on Earth inspired Charles Darwin. Snorkel with sea lions, observe giant tortoises, and discover endemic species.',
    heroImage: '/images/bucket-list/galapagos-hero.jpg',
    cardImage: '/images/bucket-list/galapagos-card.jpg',
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
    featured: false,
    priority: 5
  },
  {
    id: 'northern-lights',
    slug: 'northern-lights-arctic',
    title: 'Northern Lights & Arctic',
    tagline: 'Dance under the Aurora Borealis',
    description: 'Witness the magical Northern Lights in the Arctic regions of Norway, Iceland, and beyond. Combine Aurora viewing with husky sledding, snow activities, and Arctic landscapes.',
    heroImage: '/images/bucket-list/northern-lights-hero.jpg',
    cardImage: '/images/bucket-list/northern-lights-card.jpg',
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
    featured: false,
    priority: 6
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

