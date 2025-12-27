/**
 * Port Guides Data
 * 
 * Comprehensive cruise port information for SEO and user value.
 * Each port is a detailed guide with things to do, practical info, etc.
 * 
 * Content to be populated via Perplexity AI research.
 * 
 * Status: Draft - hidden from public until content is ready
 */

export const portRegions = [
  {
    id: 'uk',
    slug: 'united-kingdom',
    name: 'United Kingdom',
    description: 'Major UK cruise ports including Southampton, Dover, and Liverpool',
    image: null, // Will use WEB_categories/ports/uk/hero.webp
  },
  {
    id: 'spain',
    slug: 'spain',
    name: 'Spain',
    description: 'Popular Spanish cruise ports from Barcelona to the Balearic Islands',
    image: null,
  },
  {
    id: 'portugal',
    slug: 'portugal',
    name: 'Portugal',
    description: 'Portuguese cruise ports including Lisbon and Madeira',
    image: null,
  },
  {
    id: 'canary-islands',
    slug: 'canary-islands',
    name: 'Canary Islands',
    description: 'Year-round sun in the Canary Islands cruise ports',
    image: null,
  },
  {
    id: 'mediterranean',
    slug: 'mediterranean',
    name: 'Mediterranean',
    description: 'Classic Mediterranean cruise ports across Italy, France, Croatia and more',
    image: null,
  },
];

export const ports = [
  // ============================================================================
  // UNITED KINGDOM
  // ============================================================================
  {
    id: 'southampton',
    slug: 'southampton',
    name: 'Southampton',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 50.9097, lon: -1.4044 },
    tagline: 'The UK\'s premier cruise port',
    description: 'Southampton is the busiest cruise port in the UK, serving as the home port for major cruise lines including P&O Cruises, Cunard, and Royal Caribbean. Located on England\'s south coast, it offers excellent transport links to London and beyond.',
    
    // Quick facts for the info bar
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT/BST',
      portType: 'Home Port & Turnaround',
      walkable: true,
      tenderRequired: false,
    },
    
    // Getting around section
    gettingAround: {
      fromPort: 'The cruise terminals are well-connected with taxi ranks, bus services, and a short walk to the city centre.',
      publicTransport: 'Regular bus services connect the port to Southampton Central station. Trains run frequently to London Waterloo (1h 20m).',
      taxis: 'Licensed taxis available at all terminals. Expect £5-10 to city centre.',
      walkingDistance: 'City centre is approximately 15-20 minutes walk from Ocean Terminal.',
    },
    
    // Things to do - main content
    thingsToDo: [
      {
        title: 'SeaCity Museum',
        description: 'Explore Southampton\'s maritime heritage including the Titanic story. The museum features interactive exhibits about the city\'s connection to the famous ship.',
        category: 'culture',
        duration: '2-3 hours',
        price: '£',
      },
      {
        title: 'Old Town Walls',
        description: 'Walk along the medieval walls that once protected the city. These are some of the best-preserved medieval walls in England.',
        category: 'history',
        duration: '1 hour',
        price: 'Free',
      },
      {
        title: 'West Quay Shopping Centre',
        description: 'Major shopping destination with over 100 stores, restaurants, and a cinema. Perfect for pre-cruise shopping.',
        category: 'shopping',
        duration: '2-4 hours',
        price: 'Varies',
      },
    ],
    
    // Shore excursions tips
    shoreExcursions: [
      {
        title: 'Stonehenge & Salisbury',
        description: 'Visit the iconic prehistoric monument and the beautiful cathedral city of Salisbury.',
        duration: 'Full day',
        bookWith: 'Cruise line or independent',
      },
      {
        title: 'Winchester Cathedral',
        description: 'Explore England\'s ancient capital and its magnificent cathedral.',
        duration: 'Half day',
        bookWith: 'Independent recommended',
      },
    ],
    
    // Practical information
    practicalInfo: {
      bestTimeToVisit: 'May to September for warmest weather',
      cruiseTerminals: ['Ocean Terminal', 'City Cruise Terminal', 'Mayflower Cruise Terminal', 'Queen Elizabeth II Terminal'],
      parking: 'Long-term parking available at ABP Southampton. Book in advance for best rates.',
      nearbyAirport: 'Southampton Airport (15 mins), London Heathrow (1h 15m), London Gatwick (1h 30m)',
      visaInfo: 'UK visa requirements apply for non-UK/EU citizens',
    },
    
    // Food & drink recommendations
    foodAndDrink: [
      {
        name: 'The Pig in the Wall',
        type: 'Restaurant',
        description: 'Boutique hotel restaurant with excellent British cuisine',
        priceRange: '££',
      },
      {
        name: 'Oxford Street',
        type: 'Area',
        description: 'Pedestrianised street with numerous cafes, pubs and restaurants',
        priceRange: '£-££',
      },
    ],
    
    // Tips from experienced cruisers
    insiderTips: [
      'Arrive the day before for stress-free embarkation',
      'The Mayflower Park offers great views of ships departing',
      'Book airport transfers in advance, especially during peak season',
    ],
    
    // Related destinations (for internal linking)
    relatedDestinations: ['norwegian-fjords-cruises', 'mediterranean-cruises', 'caribbean-cruises'],
    
    // SEO metadata
    meta: {
      title: 'Southampton Cruise Port Guide | Things to Do & Practical Info',
      description: 'Complete guide to Southampton cruise port. Discover things to do, shore excursions, restaurants, and practical tips for your cruise from the UK\'s busiest port.',
      keywords: ['Southampton cruise port', 'Southampton cruise terminal', 'things to do Southampton', 'Southampton shore excursions'],
    },
    
    // Content status
    status: 'template', // template | draft | review | published
    lastUpdated: '2025-01-01',
  },
  
  {
    id: 'dover',
    slug: 'dover',
    name: 'Dover',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 51.1279, lon: 1.3134 },
    tagline: 'Gateway to Europe with iconic white cliffs',
    description: 'Dover is famous for its white cliffs and historic castle. As a cruise port, it offers easy access to London and Kent\'s beautiful countryside.',
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT/BST',
      portType: 'Turnaround & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'The cruise terminal is close to Dover Priory station with regular trains to London.',
      publicTransport: 'Trains to London St Pancras take approximately 1 hour.',
      taxis: 'Available at the terminal.',
      walkingDistance: 'Town centre is a 10-minute walk.',
    },
    
    thingsToDo: [
      {
        title: 'Dover Castle',
        description: 'Explore the largest castle in England with over 2,000 years of history, including secret wartime tunnels.',
        category: 'history',
        duration: '3-4 hours',
        price: '££',
      },
      {
        title: 'White Cliffs of Dover',
        description: 'Walk along the iconic chalk cliffs with stunning views across the English Channel to France.',
        category: 'nature',
        duration: '2-3 hours',
        price: 'Free',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Canterbury Cathedral',
        description: 'Visit the famous cathedral, seat of the Archbishop of Canterbury.',
        duration: 'Half day',
        bookWith: 'Independent recommended',
      },
      {
        title: 'Leeds Castle',
        description: 'Explore one of the most beautiful castles in England.',
        duration: 'Half day',
        bookWith: 'Cruise line or independent',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to September',
      cruiseTerminals: ['Dover Cruise Terminal'],
      parking: 'Cruise parking available, book in advance',
      nearbyAirport: 'London Gatwick (1h 30m), London Heathrow (2h)',
      visaInfo: 'UK visa requirements apply',
    },
    
    foodAndDrink: [],
    insiderTips: [
      'The castle is a steep walk from town - consider a taxi',
      'Book White Cliffs walks for the morning when lighting is best',
    ],
    
    relatedDestinations: ['british-isles-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Dover Cruise Port Guide | White Cliffs & Castle',
      description: 'Complete guide to Dover cruise port. Visit Dover Castle, walk the White Cliffs, and discover practical tips for your UK cruise.',
      keywords: ['Dover cruise port', 'Dover white cliffs', 'Dover castle', 'Dover shore excursions'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // ============================================================================
  // SPAIN
  // ============================================================================
  {
    id: 'barcelona',
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    region: 'spain',
    coordinates: { lat: 41.3851, lon: 2.1734 },
    tagline: 'Gaudí, beaches, and Mediterranean charm',
    description: 'Barcelona is one of Europe\'s busiest cruise ports, offering world-class architecture, vibrant culture, stunning beaches, and exceptional cuisine. From Gaudí\'s masterpieces to the Gothic Quarter, there\'s something for everyone.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish & Catalan',
      timezone: 'CET (GMT+1)',
      portType: 'Home Port & Port of Call',
      walkable: false, // Port is large, need transport to city
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'The cruise terminals are at Port Vell. Shuttle buses run to La Rambla. Some ships dock closer to the city.',
      publicTransport: 'Excellent metro system. T-Casual card offers 10 trips. Buy at any metro station.',
      taxis: 'Plentiful yellow and black taxis. Meter fare from port to city centre €10-15.',
      walkingDistance: 'If docked at World Trade Center terminal, La Rambla is 15 minutes walk.',
    },
    
    thingsToDo: [
      {
        title: 'La Sagrada Família',
        description: 'Gaudí\'s unfinished masterpiece basilica. Book tickets online well in advance - this is a must-see.',
        category: 'culture',
        duration: '2 hours',
        price: '££',
      },
      {
        title: 'Park Güell',
        description: 'Whimsical park designed by Gaudí with mosaic benches and stunning city views.',
        category: 'culture',
        duration: '2-3 hours',
        price: '£',
      },
      {
        title: 'La Rambla & Gothic Quarter',
        description: 'Stroll down the famous pedestrian boulevard and explore the medieval streets of the Gothic Quarter.',
        category: 'exploration',
        duration: '2-3 hours',
        price: 'Free',
      },
      {
        title: 'La Boqueria Market',
        description: 'Famous food market on La Rambla. Sample fresh produce, jamón, seafood, and local delicacies.',
        category: 'food',
        duration: '1-2 hours',
        price: '£',
      },
      {
        title: 'Barceloneta Beach',
        description: 'Sandy beach with restaurants and bars. Perfect for relaxing if you\'ve seen the sights before.',
        category: 'beach',
        duration: '2-4 hours',
        price: 'Free',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Gaudí Highlights Tour',
        description: 'See Sagrada Família, Park Güell, Casa Batlló, and La Pedrera in one comprehensive tour.',
        duration: 'Full day',
        bookWith: 'Cruise line or independent',
      },
      {
        title: 'Montserrat Monastery',
        description: 'Day trip to the mountain monastery with stunning views and the famous Black Madonna.',
        duration: 'Half day',
        bookWith: 'Cruise line recommended',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'April to June, September to October (avoid August heat and crowds)',
      cruiseTerminals: ['Moll Adossat Terminals A-D', 'World Trade Center', 'Moll de Barcelona'],
      parking: 'Not applicable for cruise passengers',
      nearbyAirport: 'Barcelona El Prat (20-30 mins)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    foodAndDrink: [
      {
        name: 'La Boqueria Market',
        type: 'Market',
        description: 'Fresh produce, tapas bars, and local specialties',
        priceRange: '£-££',
      },
      {
        name: 'El Born Neighbourhood',
        type: 'Area',
        description: 'Trendy area with excellent tapas bars and restaurants',
        priceRange: '££',
      },
      {
        name: 'Barceloneta',
        type: 'Area',
        description: 'Beachfront restaurants specialising in paella and seafood',
        priceRange: '££-£££',
      },
    ],
    
    insiderTips: [
      'Book Sagrada Família tickets 2-3 weeks in advance online',
      'Avoid the tourist trap restaurants on La Rambla - head to side streets',
      'The hop-on hop-off bus is actually good value for hitting major sights',
      'Download the T-Casual metro app before arriving',
    ],
    
    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Barcelona Cruise Port Guide | Gaudí, Beaches & Tapas',
      description: 'Complete Barcelona cruise port guide. Visit Sagrada Família, explore the Gothic Quarter, enjoy tapas, and discover insider tips for your Mediterranean cruise.',
      keywords: ['Barcelona cruise port', 'Barcelona shore excursions', 'Barcelona things to do', 'Barcelona from cruise ship'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },
  
  {
    id: 'malaga',
    slug: 'malaga',
    name: 'Málaga',
    country: 'Spain',
    region: 'spain',
    coordinates: { lat: 36.7213, lon: -4.4214 },
    tagline: 'Birthplace of Picasso on the Costa del Sol',
    description: 'Málaga combines rich cultural heritage with beautiful beaches and excellent weather. As Picasso\'s birthplace, it offers world-class museums alongside historic sites and vibrant tapas bars.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'CET (GMT+1)',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'The cruise terminal is in the city centre, walking distance to major attractions.',
      publicTransport: 'Most attractions are walkable. Bus system available for further sites.',
      taxis: 'Available at the port. Meters used.',
      walkingDistance: 'Historic centre is 5-10 minutes walk from the port.',
    },
    
    thingsToDo: [
      {
        title: 'Picasso Museum',
        description: 'Extensive collection of Picasso\'s work in a beautiful 16th-century palace. The artist was born just around the corner.',
        category: 'culture',
        duration: '2 hours',
        price: '£',
      },
      {
        title: 'Alcazaba',
        description: 'Moorish fortress-palace with beautiful gardens and views over the city and port.',
        category: 'history',
        duration: '1-2 hours',
        price: '£',
      },
      {
        title: 'Málaga Cathedral',
        description: 'Impressive Renaissance cathedral known as "La Manquita" (the one-armed lady) due to its unfinished tower.',
        category: 'history',
        duration: '1 hour',
        price: '£',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Granada & Alhambra',
        description: 'Day trip to see the stunning Alhambra palace and Generalife gardens.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended (long drive)',
      },
      {
        title: 'Ronda',
        description: 'Visit the dramatic clifftop town famous for its bridge and bullring.',
        duration: 'Half day',
        bookWith: 'Either',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round - enjoys 300+ days of sunshine',
      cruiseTerminals: ['Muelle de Levante'],
      parking: 'Not applicable',
      nearbyAirport: 'Málaga-Costa del Sol Airport (15 mins)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    foodAndDrink: [
      {
        name: 'Atarazanas Market',
        type: 'Market',
        description: 'Beautiful 19th-century market with fresh produce and tapas bars',
        priceRange: '£',
      },
      {
        name: 'El Pimpi',
        type: 'Restaurant/Bar',
        description: 'Famous bodega serving local wines and traditional tapas',
        priceRange: '££',
      },
    ],
    
    insiderTips: [
      'Combined ticket for Alcazaba and Gibralfaro castle offers best value',
      'Try "pescaíto frito" - Málaga\'s famous fried fish',
      'The Pompidou Centre Málaga is worth a visit for modern art fans',
    ],
    
    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Málaga Cruise Port Guide | Picasso, Beaches & Tapas',
      description: 'Complete Málaga cruise port guide. Visit the Picasso Museum, explore the Alcazaba, enjoy Costa del Sol beaches, and discover the best tapas.',
      keywords: ['Málaga cruise port', 'Málaga shore excursions', 'Málaga things to do'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // ============================================================================
  // PORTUGAL
  // ============================================================================
  {
    id: 'lisbon',
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'portugal',
    coordinates: { lat: 38.7223, lon: -9.1393 },
    tagline: 'City of seven hills and pastel de nata',
    description: 'Lisbon is Portugal\'s sun-drenched capital, famous for its colourful tiled buildings, historic trams, world-class custard tarts, and vibrant nightlife. The city offers a perfect blend of history, culture, and modern creativity.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese',
      timezone: 'WET (GMT)',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Ships dock at Santa Apolónia or Alcântara terminals, both close to the city centre.',
      publicTransport: 'Metro, trams, and buses available. Buy a Viva Viagem card for discounted travel.',
      taxis: 'Cream or black taxis available. Uber and Bolt also work well.',
      walkingDistance: 'Be prepared for hills! Tram 28 is a scenic alternative.',
    },
    
    thingsToDo: [
      {
        title: 'Belém Tower & Jerónimos Monastery',
        description: 'UNESCO World Heritage sites showcasing Portugal\'s Age of Discovery. Don\'t miss the monastery\'s stunning cloisters.',
        category: 'history',
        duration: '3-4 hours',
        price: '£',
      },
      {
        title: 'Tram 28',
        description: 'Ride the iconic yellow tram through Alfama, Graça, and the historic neighbourhoods.',
        category: 'experience',
        duration: '1 hour',
        price: '£',
      },
      {
        title: 'Alfama District',
        description: 'Wander the oldest neighbourhood\'s narrow streets, discover hidden viewpoints, and listen for Fado music.',
        category: 'exploration',
        duration: '2-3 hours',
        price: 'Free',
      },
      {
        title: 'Pastéis de Belém',
        description: 'Queue for the original pastel de nata (custard tart) at this legendary bakery since 1837.',
        category: 'food',
        duration: '30 mins',
        price: '£',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Sintra Palaces',
        description: 'Day trip to the fairytale town of Sintra with its colourful Pena Palace and Moorish castle.',
        duration: 'Half to full day',
        bookWith: 'Either',
      },
      {
        title: 'Cascais & Estoril',
        description: 'Visit the charming coastal towns of the Portuguese Riviera.',
        duration: 'Half day',
        bookWith: 'Independent (easy by train)',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'March to October',
      cruiseTerminals: ['Santa Apolónia', 'Alcântara'],
      parking: 'Not applicable',
      nearbyAirport: 'Lisbon Humberto Delgado Airport (20 mins)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    foodAndDrink: [
      {
        name: 'Pastéis de Belém',
        type: 'Bakery',
        description: 'The original home of pastel de nata since 1837',
        priceRange: '£',
      },
      {
        name: 'Time Out Market',
        type: 'Food Hall',
        description: 'Curated food hall with the best of Lisbon\'s restaurants',
        priceRange: '££',
      },
      {
        name: 'A Cevicheria',
        type: 'Restaurant',
        description: 'Famous for creative Peruvian-Portuguese fusion',
        priceRange: '£££',
      },
    ],
    
    insiderTips: [
      'Take Tram 28 early morning to avoid extreme crowds',
      'Wear comfortable shoes - Lisbon is very hilly',
      'Sintra gets very busy - book Pena Palace tickets online',
      'Try ginjinha (cherry liqueur) at the tiny bars near Rossio',
    ],
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Lisbon Cruise Port Guide | Pastéis de Belém, Tram 28 & Sintra',
      description: 'Complete Lisbon cruise port guide. Ride Tram 28, visit Belém Tower, taste pastel de nata, and explore Sintra from your cruise ship.',
      keywords: ['Lisbon cruise port', 'Lisbon shore excursions', 'Lisbon things to do', 'Lisbon from cruise ship'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // ============================================================================
  // CANARY ISLANDS
  // ============================================================================
  {
    id: 'tenerife',
    slug: 'santa-cruz-de-tenerife',
    name: 'Santa Cruz de Tenerife',
    country: 'Spain (Canary Islands)',
    region: 'canary-islands',
    coordinates: { lat: 28.4636, lon: -16.2518 },
    tagline: 'Gateway to Spain\'s highest peak and year-round sun',
    description: 'Tenerife is the largest Canary Island, offering everything from black volcanic beaches to Spain\'s highest mountain (Mount Teide). The capital Santa Cruz is a vibrant city with excellent shopping and dining.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'WET (GMT)',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'The cruise terminal is in the city centre, walkable to main attractions.',
      publicTransport: 'TITSA buses connect to beaches and other towns. Tram runs through the city.',
      taxis: 'Available at the port. Agree fares for longer trips.',
      walkingDistance: 'City centre and beaches within walking distance.',
    },
    
    thingsToDo: [
      {
        title: 'Mount Teide National Park',
        description: 'Spain\'s highest peak (3,718m) with lunar landscapes. Cable car takes you near the summit for incredible views.',
        category: 'nature',
        duration: 'Full day',
        price: '££',
      },
      {
        title: 'Loro Parque',
        description: 'World-famous zoo and aquarium with orcas, dolphins, penguins, and the largest parrot collection.',
        category: 'attraction',
        duration: 'Half day',
        price: '££',
      },
      {
        title: 'Playa de las Teresitas',
        description: 'Beautiful golden sand beach (imported from the Sahara) with calm waters.',
        category: 'beach',
        duration: '3-4 hours',
        price: 'Free',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Mount Teide & Wine Tasting',
        description: 'Visit the national park and sample local wines at a traditional bodega.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended',
      },
      {
        title: 'La Laguna Old Town',
        description: 'Explore the UNESCO-listed colonial town, Tenerife\'s original capital.',
        duration: 'Half day',
        bookWith: 'Either',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round (eternal spring climate)',
      cruiseTerminals: ['Muelle Sur'],
      parking: 'Not applicable',
      nearbyAirport: 'Tenerife North (Los Rodeos) 15 mins, Tenerife South 1 hour',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    foodAndDrink: [
      {
        name: 'La Hierbita',
        type: 'Restaurant',
        description: 'Traditional Canarian cuisine in a historic building',
        priceRange: '££',
      },
      {
        name: 'Mercado de Nuestra Señora de África',
        type: 'Market',
        description: 'Vibrant local market with fresh produce and flowers',
        priceRange: '£',
      },
    ],
    
    insiderTips: [
      'Book Teide cable car tickets in advance online',
      'The summit permit (free) is needed to hike to the very top',
      'Try papas arrugadas (wrinkly potatoes) with mojo sauce',
      'Teide is cold at altitude - bring a jacket even in summer',
    ],
    
    relatedDestinations: ['canary-islands-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Tenerife Cruise Port Guide | Mount Teide & Beaches',
      description: 'Complete Santa Cruz de Tenerife cruise port guide. Visit Mount Teide, relax on volcanic beaches, and explore the Canary Islands from your cruise ship.',
      keywords: ['Tenerife cruise port', 'Santa Cruz Tenerife', 'Tenerife shore excursions', 'Mount Teide cruise'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // ============================================================================
  // MEDITERRANEAN (Additional ports to add)
  // ============================================================================
  {
    id: 'civitavecchia',
    slug: 'civitavecchia-rome',
    name: 'Civitavecchia (Rome)',
    country: 'Italy',
    region: 'mediterranean',
    coordinates: { lat: 42.0934, lon: 11.7964 },
    tagline: 'Gateway to the Eternal City',
    description: 'Civitavecchia is the cruise port for Rome, located about 80km northwest of the Italian capital. Most cruisers use this as a gateway to explore Rome\'s incredible history, though the port town itself has some charm.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Italian',
      timezone: 'CET (GMT+1)',
      portType: 'Home Port & Port of Call',
      walkable: false, // Rome is 80km away
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Shuttle buses run from the port to the train station. Trains to Rome take 60-80 minutes.',
      publicTransport: 'Regional trains to Roma Termini run frequently. Buy tickets before boarding.',
      taxis: 'Fixed fare taxis to Rome (expensive but convenient for groups).',
      walkingDistance: 'Civitavecchia town is 15-20 minutes walk from the port.',
    },
    
    thingsToDo: [
      {
        title: 'Colosseum & Roman Forum',
        description: 'Iconic ancient Roman amphitheatre and the heart of the Roman Empire. Book skip-the-line tickets.',
        category: 'history',
        duration: '3-4 hours',
        price: '££',
      },
      {
        title: 'Vatican City',
        description: 'St. Peter\'s Basilica, the Sistine Chapel, and Vatican Museums. Allow ample time.',
        category: 'culture',
        duration: '4-5 hours',
        price: '££',
      },
      {
        title: 'Trevi Fountain & Spanish Steps',
        description: 'Toss a coin in the famous fountain and climb the iconic steps.',
        category: 'exploration',
        duration: '1-2 hours',
        price: 'Free',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Rome Highlights',
        description: 'Whirlwind tour of the Colosseum, Vatican, and key landmarks.',
        duration: 'Full day',
        bookWith: 'Cruise line (handles logistics)',
      },
      {
        title: 'Rome on Your Own',
        description: 'Take the train to Rome and explore independently.',
        duration: 'Full day',
        bookWith: 'Independent',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'April to June, September to October (avoid August)',
      cruiseTerminals: ['Terminals 10-25 along the port'],
      parking: 'Not applicable',
      nearbyAirport: 'Rome Fiumicino (50 mins), Rome Ciampino (1h 15m)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    foodAndDrink: [
      {
        name: 'Trastevere',
        type: 'Neighbourhood (Rome)',
        description: 'Charming area with authentic Roman trattorias',
        priceRange: '££',
      },
      {
        name: 'In Civitavecchia',
        type: 'Note',
        description: 'If staying local, try fresh seafood at restaurants near the old port',
        priceRange: '££',
      },
    ],
    
    insiderTips: [
      'Book Vatican tickets weeks in advance to avoid 3+ hour queues',
      'Take the train, not a tour, if you want flexibility in Rome',
      'The last train back can be crowded - don\'t cut it too close',
      'If you\'ve done Rome before, consider staying in Civitavecchia and relaxing',
    ],
    
    relatedDestinations: ['mediterranean-cruises', 'italian-cruises'],
    
    meta: {
      title: 'Civitavecchia (Rome) Cruise Port Guide | Visiting Rome from Your Cruise',
      description: 'Complete Civitavecchia cruise port guide. How to visit Rome\'s Colosseum, Vatican, and top attractions from your Mediterranean cruise ship.',
      keywords: ['Civitavecchia cruise port', 'Rome cruise port', 'Rome shore excursions', 'Civitavecchia to Rome'],
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all ports
 */
export function getAllPorts() {
  return ports;
}

/**
 * Get port by slug
 */
export function getPortBySlug(slug) {
  return ports.find(p => p.slug === slug) || null;
}

/**
 * Get ports by region
 */
export function getPortsByRegion(regionId) {
  return ports.filter(p => p.region === regionId).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get region by slug
 */
export function getRegionBySlug(slug) {
  return portRegions.find(r => r.slug === slug) || null;
}

/**
 * Get all regions
 */
export function getAllRegions() {
  return portRegions;
}

/**
 * Get ports count by region
 */
export function getPortsCountByRegion(regionId) {
  return ports.filter(p => p.region === regionId).length;
}

/**
 * Search ports by name or country
 */
export function searchPorts(query) {
  const lowerQuery = query.toLowerCase();
  return ports.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.country.toLowerCase().includes(lowerQuery)
  );
}

