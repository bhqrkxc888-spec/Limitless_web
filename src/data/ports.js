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
    description: 'Major UK cruise ports including Southampton and Dover',
    image: null, // Will use WEB_categories/ports/uk/hero.webp
  },
  {
    id: 'mediterranean',
    slug: 'mediterranean',
    name: 'Mediterranean',
    description: 'Classic Mediterranean cruise ports across Spain, Italy, France, and beyond',
    image: null,
  },
  {
    id: 'atlantic-coast',
    slug: 'atlantic-coast',
    name: 'Atlantic Coast',
    description: 'Mainland Atlantic ports from Portugal to Spain including Lisbon, Vigo, and Cádiz',
    image: null,
  },
  {
    id: 'atlantic-islands',
    slug: 'atlantic-islands',
    name: 'Atlantic Islands',
    description: 'Island ports including Madeira and the Canary Islands',
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
    region: 'mediterranean',
    coordinates: { lat: 41.3851, lon: 2.1734 },
    tagline: 'Europe\'s busiest cruise hub with Gaudí, beaches, and world-class tapas',
    description: 'Barcelona is one of Europe\'s biggest and easiest cruise ports, with terminals close to the city centre and excellent links to the airport and trains. With one full day you can see several headline sights; 2–3 days lets you add beaches, food and maybe a day trip.',
    
    // Detailed port information
    aboutPort: {
      overview: 'Barcelona Cruise Port is Europe\'s busiest cruise hub, with large, modern terminals mainly on Moll Adossat plus a smaller terminal at the World Trade Center (Port Vell) near the city.',
      terminals: 'Most big ships dock at Terminals A–E on Moll Adossat; smaller or luxury ships sometimes use the World Trade Center / Maremagnum berths just by the lower end of La Rambla.',
      shuttle: 'A shuttle bus (often called the "blue bus") usually runs between Moll Adossat and the Columbus Monument at the bottom of La Rambla, putting you a short walk from the Gothic Quarter.',
      walkability: 'The World Trade Center terminal is walkable to La Rambla in about 10 minutes, which is ideal if your ship docks there. From Moll Adossat, most people use the shuttle or a taxi first, then walk within the historic centre.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish & Catalan',
      timezone: 'CET/CEST',
      portType: 'Home Port & Port of Call',
      walkable: false, // Port is large, need transport to city
      tenderRequired: false,
    },
    
    // Airport and train connections
    transportConnections: {
      airport: {
        name: 'Barcelona El Prat (BCN)',
        distance: '25–35 minutes from cruise port by taxi',
        options: 'Common options from the airport into the city are taxi, the Aerobús shuttle to Plaça de Catalunya, or the R2 Nord train to Sants/Estació de França, then taxi/metro to the port.',
      },
      trains: {
        mainStation: 'Barcelona Sants',
        description: 'Barcelona Sants is the main long-distance station for high-speed trains to Madrid, Paris and beyond; from Sants it is about 15–25 minutes by taxi to the cruise terminals.',
        localHubs: 'For local trains, Sants and Passeig de Gràcia are the main city hubs, and both connect easily by metro and taxi to the port area.',
      },
      cruiseLines: 'Barcelona is a major homeport for Western Mediterranean itineraries, regularly handling ships from MSC, Costa, Royal Caribbean, Norwegian, Celebrity, Carnival, Princess and others.',
    },

    gettingAround: {
      fromPort: 'The main cruise wharf (Moll Adossat) sits at the southern edge of the city, roughly 10–15 minutes by taxi to the Gothic Quarter in normal traffic. Use the port shuttle or taxi rather than walking the whole way, as parts of the walk are exposed and industrial.',
      publicTransport: 'Dense metro and bus network makes it easy to reach Sagrada Família, Park Güell and Montjuïc. The Hola Barcelona travel card gives unlimited public transport for 2–5 days.',
      taxis: 'Plentiful, metered and relatively straightforward for hops between port, Sagrada Família, Park Güell and beaches.',
      walkingDistance: 'From the Columbus Monument you can walk La Rambla, the Gothic Quarter and much of Port Vell; expect cobbles and occasional crowds.',
      sightseeingBus: 'Hop-on hop-off buses loop between major sights, useful if you want an overview without navigating public transport on a tight schedule.',
    },
    
    // Must-see sights (the headline attractions)
    mustSeeSights: [
      {
        title: 'La Sagrada Família',
        description: 'Gaudí\'s iconic, still-unfinished basilica. Pre-book timed entry if at all possible.',
        image: 'sagrada-familia.webp',
      },
      {
        title: 'Gothic Quarter (Barri Gòtic)',
        description: 'Medieval lanes, Roman remains and Barcelona Cathedral, just off La Rambla.',
        image: 'gothic-quarter.webp',
      },
      {
        title: 'La Rambla & La Boqueria Market',
        description: 'The classic pedestrian boulevard from Plaça de Catalunya to the port, with the colourful food market about halfway.',
        image: 'la-boqueria.webp',
      },
      {
        title: 'Park Güell',
        description: 'Gaudí\'s park with mosaics and city views; most of the Monumental Zone requires a timed ticket and a bit of uphill walking.',
        image: 'park-guell.webp',
      },
      {
        title: 'Passeig de Gràcia',
        description: 'Elegant shopping avenue lined with Modernista buildings including Gaudí\'s famous Casa Batlló and La Pedrera.',
        image: 'casa-batllo.webp',
      },
      {
        title: 'Montjuïc Hill',
        description: 'Overlooks port and city with a castle, museums and gardens; reachable by cable car, bus or taxi from the waterfront.',
        image: 'montjuic.webp',
      },
    ],

    thingsToDo: [
      {
        title: 'La Sagrada Família + Eixample Stroll',
        description: 'Visit the basilica inside, then stroll through the Eixample district to admire more Gaudí facades.',
        category: 'culture',
        duration: '2–3 hours',
        price: '££',
      },
      {
        title: 'Gothic Quarter & La Rambla',
        description: 'Explore the Gothic Quarter, cathedral and Plaça Reial, combined with La Rambla and La Boqueria market.',
        category: 'exploration',
        duration: '3–4 hours',
        price: 'Free',
      },
      {
        title: 'Park Güell & Passeig de Gràcia',
        description: 'Head to Park Güell for views, then continue down to Passeig de Gràcia for Casa Batlló/La Pedrera exteriors.',
        category: 'culture',
        duration: '3–4 hours',
        price: '£-££',
      },
      {
        title: 'Montjuïc Panoramas',
        description: 'Ride up Montjuïc for port and city panoramas, possibly combining with MNAC museum or the Olympic area.',
        category: 'nature',
        duration: '2–3 hours',
        price: '£',
      },
      {
        title: 'Barceloneta Beach',
        description: 'Spend relaxed hours at Barceloneta Beach and the Port Vell waterfront promenade.',
        category: 'beach',
        duration: '2–4 hours',
        price: 'Free',
      },
      {
        title: 'City Highlights Tour',
        description: 'Join an organised city highlights tour that bundles Sagrada Família photo stops, Park Güell, Gothic Quarter and Montjuïc to maximise limited time.',
        category: 'experience',
        duration: 'Full day',
        price: '££',
      },
    ],
    
    // Nearest beach info
    nearestBeach: {
      name: 'Barceloneta Beach',
      description: 'The closest major beach to the cruise area, stretching along the seafront east of Port Vell.',
      distance: 'From Moll Adossat you can take a taxi (about 10–15 minutes depending on traffic) or walk from the Columbus Monument in roughly 20–25 minutes along the waterfront.',
    },

    shoreExcursions: [
      {
        title: 'Gaudí Highlights Tour',
        description: 'See Sagrada Família, Park Güell, Casa Batlló, and La Pedrera in one comprehensive tour.',
        duration: 'Full day',
        bookWith: 'Cruise line or independent',
      },
      {
        title: 'Montserrat Monastery',
        description: 'Mountain monastery with a basilica and views; typical tours run 4–6 hours from Barcelona and combine the rack railway or cable car with free time.',
        duration: '4–6 hours',
        bookWith: 'Cruise line recommended',
      },
      {
        title: 'Costa Brava Coastal Villages',
        description: 'Longer full-day trips to towns like Tossa de Mar offer beaches, cliffs and old towns.',
        duration: 'Full day',
        bookWith: 'Cruise line',
      },
      {
        title: 'Cava & Wine Country (Penedès)',
        description: 'Tastings and vineyard visits roughly 1 hour from Barcelona.',
        duration: 'Half day',
        bookWith: 'Either',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late April–June and September–early October – warm but not extreme, longer daylight and generally comfortable for walking.',
      cruiseTerminals: ['Moll Adossat Terminals A–E', 'World Trade Center', 'Maremagnum'],
      parking: 'Not applicable for cruise passengers',
      nearbyAirport: 'Barcelona El Prat (BCN) – 25–35 mins',
      visaInfo: 'Schengen visa requirements apply',
      timeZone: 'Central European Time (CET), Central European Summer Time (CEST) in summer',
      power: 'Type C and F plugs, 230V',
      water: 'Tap water is generally safe to drink, though some visitors prefer bottled due to taste.',
      dressCode: 'Churches (including Sagrada Família) expect shoulders and thighs reasonably covered.',
    },

    // Time required estimates
    timeRequired: {
      intro: 'Idea of time required for key sights:',
      estimates: [
        { sight: 'Gothic Quarter + La Rambla + Boqueria', time: '3–4 hours at a relaxed pace' },
        { sight: 'Sagrada Família inside + transport', time: '2–3 hours' },
        { sight: 'Park Güell (Monumental Zone)', time: '1.5–2 hours plus travel' },
        { sight: 'Montjuïc viewpoint + MNAC/Olympic area', time: '2–3 hours' },
      ],
      summary: 'For a standard cruise day (8–10 hours ashore), combining one major Gaudí site, the Gothic Quarter/Rambla and a quick beach or Montjuïc stop is realistic if you use taxis efficiently.',
    },

    foodAndDrink: [
      {
        name: 'La Boqueria Market',
        type: 'Market',
        description: 'Numerous stalls and small counters for tapas, fresh fruit and seafood right off La Rambla.',
        priceRange: '£-££',
      },
      {
        name: 'El Nacional',
        type: 'Food Hall',
        description: 'Multi-restaurant food hall on Passeig de Gràcia with tapas, seafood, and grilled dishes in a stylish setting.',
        priceRange: '££-£££',
      },
      {
        name: 'Cal Pep',
        type: 'Tapas Bar',
        description: 'Classic bustling tapas bar in the Born district known for seafood; often a queue, but great for a quick, authentic stop.',
        priceRange: '££',
      },
      {
        name: 'Tapeo',
        type: 'Tapas',
        description: 'Modern tapas with inventive small plates in El Born, walkable from the Gothic Quarter.',
        priceRange: '££',
      },
    ],
    
    // Nearest familiar option
    fastFood: {
      name: 'McDonald\'s',
      description: 'One of the most convenient McDonald\'s for cruise visitors is near the bottom of La Rambla and the Columbus Monument (around La Rambla / Plaça del Portal de la Pau), walkable from the port shuttle stop.',
      alternatives: 'There are also branches on La Rambla closer to Plaça de Catalunya and around central transport hubs such as Sants.',
    },

    insiderTips: [
      'Pre-book timed entries for Sagrada Família and Park Güell, especially in spring–autumn, to avoid disappointment.',
      'Keep valuables secure; pickpocketing can be an issue in busy areas like La Rambla, metro stations and markets.',
      'Factor in queues, security checks and traffic when planning an independent day; always aim to be back at the ship at least 1–2 hours before all-aboard.',
      'If docking at Moll Adossat, use the port shuttle or taxi rather than walking the whole way, as parts of the walk are exposed and industrial.',
      'Avoid tourist trap restaurants on La Rambla – head to side streets for authentic food.',
      'The hop-on hop-off bus is actually good value for hitting major sights on a tight schedule.',
    ],
    
    // FAQ section
    faq: [
      {
        question: 'Is Barcelona walkable from the cruise port?',
        answer: 'From the World Trade Center terminal, yes – La Rambla is about 10 minutes on foot. From Moll Adossat, most people use the shuttle or a taxi first, then walk within the historic centre.',
      },
      {
        question: 'How long do you need in Barcelona?',
        answer: 'For a cruise stop, one full day covers a few key sights; two days allows Sagrada Família inside, Park Güell, Gothic Quarter and a beach or Montjuïc. A dedicated city break of 3–4 days lets you explore at a calmer pace.',
      },
      {
        question: 'Is English widely spoken?',
        answer: 'In tourist areas, hotels and attractions, staff usually speak at least basic English, though Catalan and Spanish are the local languages.',
      },
      {
        question: 'Can you do Montserrat on a cruise day?',
        answer: 'Yes, with a ship excursion or carefully timed independent trip, but it can be tight on shorter calls; check all-aboard time and transport schedules.',
      },
    ],

    // Monthly weather data
    weather: {
      intro: 'Figures below are approximate long-term averages for Barcelona; conditions vary year to year.',
      months: [
        { month: 'Jan', highC: 13, lowC: 5, rainMm: 40, rainyDays: 5, sunDays: 18, seaTempC: 14, uv: 'Low–moderate', wind: 'Light to moderate, often NW/NE' },
        { month: 'Feb', highC: 14, lowC: 6, rainMm: 35, rainyDays: 5, sunDays: 18, seaTempC: 13, uv: 'Moderate', wind: 'Light–moderate breezes' },
        { month: 'Mar', highC: 16, lowC: 8, rainMm: 40, rainyDays: 6, sunDays: 20, seaTempC: 14, uv: 'Moderate', wind: 'Breezier at times with fronts' },
        { month: 'Apr', highC: 18, lowC: 10, rainMm: 45, rainyDays: 7, sunDays: 20, seaTempC: 15, uv: 'Moderate', wind: 'Variable spring winds' },
        { month: 'May', highC: 22, lowC: 14, rainMm: 55, rainyDays: 7, sunDays: 22, seaTempC: 18, uv: 'High', wind: 'Often light sea breezes' },
        { month: 'Jun', highC: 26, lowC: 18, rainMm: 40, rainyDays: 5, sunDays: 24, seaTempC: 21, uv: 'High–very high', wind: 'Light onshore winds' },
        { month: 'Jul', highC: 29, lowC: 21, rainMm: 20, rainyDays: 3, sunDays: 27, seaTempC: 24, uv: 'Very high', wind: 'Often light, occasional hotter inland winds' },
        { month: 'Aug', highC: 29, lowC: 22, rainMm: 50, rainyDays: 5, sunDays: 25, seaTempC: 26, uv: 'Very high', wind: 'Warm, humid sea breezes' },
        { month: 'Sep', highC: 26, lowC: 19, rainMm: 75, rainyDays: 7, sunDays: 22, seaTempC: 24, uv: 'High', wind: 'Stormier days mixed with calm spells' },
        { month: 'Oct', highC: 22, lowC: 15, rainMm: 95, rainyDays: 8, sunDays: 19, seaTempC: 22, uv: 'Moderate', wind: 'Autumn fronts, some gusty days' },
        { month: 'Nov', highC: 17, lowC: 10, rainMm: 55, rainyDays: 6, sunDays: 18, seaTempC: 18, uv: 'Low–moderate', wind: 'Mixed calm and breezy spells' },
        { month: 'Dec', highC: 14, lowC: 6, rainMm: 45, rainyDays: 6, sunDays: 17, seaTempC: 15, uv: 'Low–moderate', wind: 'Generally light–moderate winds' },
      ],
      bestTime: {
        overall: 'Late April–June and September–early October – warm but not extreme, longer daylight and generally comfortable for walking.',
        hottest: 'July–August – great for beach time, but heat, humidity and crowds can make intensive sightseeing harder.',
        quietest: 'November–March – fewer tourists and milder temperatures, but shorter days and more risk of unsettled weather.',
        recommendation: 'For a first-time cruise visit, spring or early autumn are usually the sweet spot for comfort and still-pleasant sea temperatures.',
      },
    },

    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Barcelona Cruise Port Guide | Gaudí, Beaches & Tapas',
      description: 'Complete Barcelona cruise port guide. Visit Sagrada Família, explore the Gothic Quarter, enjoy tapas at La Boqueria, and discover insider tips for your Mediterranean cruise.',
      keywords: ['Barcelona cruise port', 'Barcelona shore excursions', 'Barcelona things to do', 'Barcelona from cruise ship', 'Barcelona Moll Adossat', 'Barcelona cruise terminal'],
    },
    
    status: 'draft', // Ready for review
    lastUpdated: '2025-12-28',
  },
  
  {
    id: 'malaga',
    slug: 'malaga',
    name: 'Málaga',
    country: 'Spain',
    region: 'mediterranean',
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
    region: 'atlantic-coast',
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
    
    relatedDestinations: ['mediterranean-cruises', 'transatlantic-cruises'],
    
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
    region: 'atlantic-islands',
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

  // ============================================================================
  // ATLANTIC COAST - NEW PORTS
  // ============================================================================
  
  // Vigo - PLACEHOLDER - Content needed
  {
    id: 'vigo',
    slug: 'vigo',
    name: 'Vigo',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 42.2406, lon: -8.7207 },
    tagline: 'Gateway to Galicia and Santiago de Compostela',
    description: 'Vigo is Spain\'s largest fishing port on the Atlantic coast, offering access to Santiago de Compostela, beautiful Galician cuisine, and stunning coastal scenery.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish & Galician',
      timezone: 'CET/CEST',
      portType: 'Tender & Pier',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Port is close to city centre. Shuttle buses typically provided by cruise lines.',
      publicTransport: 'Local buses connect port area to city centre and nearby beaches.',
      taxis: 'Taxis available at cruise terminal.',
      walkingDistance: 'City centre approximately 15-20 minutes walk.',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'May to September',
      cruiseTerminals: ['Port of Vigo'],
      nearbyAirport: 'Vigo-Peinador Airport (12km)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Vigo Cruise Port Guide | Gateway to Galicia | UK Cruise Consultant',
      description: 'Complete Vigo cruise port guide. Things to do, getting around, and expert tips for your Atlantic coast port day.',
      keywords: ['Vigo cruise port', 'Vigo Spain', 'Galicia', 'Atlantic coast cruises']
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // Cádiz - PLACEHOLDER - Content needed
  {
    id: 'cadiz',
    slug: 'cadiz',
    name: 'Cádiz',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 36.5271, lon: -6.2886 },
    tagline: 'Europe\'s oldest city with golden beaches',
    description: 'Cádiz is one of Europe\'s oldest continuously inhabited cities, offering beautiful beaches, historic architecture, and easy access to Seville and Jerez.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'CET/CEST',
      portType: 'Pier',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Port is within walking distance of old town.',
      publicTransport: 'Excellent local bus network connects all areas.',
      taxis: 'Taxis available at cruise terminal.',
      walkingDistance: 'Old town is walkable from port (15-20 mins).',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'April to October',
      cruiseTerminals: ['Puerto de Cádiz'],
      nearbyAirport: 'Jerez Airport (45km), Seville Airport (120km)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises'],
    
    meta: {
      title: 'Cádiz Cruise Port Guide | Historic Spanish Port | UK Cruise Consultant',
      description: 'Complete Cádiz cruise port guide. Gateway to Seville, beautiful beaches, and Andalusian culture.',
      keywords: ['Cádiz cruise port', 'Cadiz Spain', 'Seville excursions', 'Atlantic coast']
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // Gibraltar - PLACEHOLDER - Content needed
  {
    id: 'gibraltar',
    slug: 'gibraltar',
    name: 'Gibraltar',
    country: 'British Overseas Territory',
    region: 'mediterranean',
    coordinates: { lat: 36.1408, lon: -5.3536 },
    tagline: 'The Rock at the gateway to the Mediterranean',
    description: 'Gibraltar is a unique British territory at the southern tip of Spain, famous for the Rock of Gibraltar, Barbary macaques, and duty-free shopping.',
    
    quickFacts: {
      currency: 'GBP (£) & EUR accepted',
      language: 'English',
      timezone: 'CET/CEST',
      portType: 'Tender',
      walkable: true,
      tenderRequired: true,
    },
    
    gettingAround: {
      fromPort: 'Tender to town centre. Most attractions walkable.',
      publicTransport: 'Small territory - walking is main option. Cable car to top of Rock.',
      taxis: 'Available but rarely needed for cruise passengers.',
      walkingDistance: 'Everything is within walking distance.',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round - mild Mediterranean climate',
      cruiseTerminals: ['Tender only'],
      nearbyAirport: 'Gibraltar International Airport',
      visaInfo: 'British territory - UK visa rules apply',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises'],
    
    meta: {
      title: 'Gibraltar Cruise Port Guide | The Rock | UK Cruise Consultant',
      description: 'Complete Gibraltar cruise port guide. The Rock, duty-free shopping, and British culture on the Med.',
      keywords: ['Gibraltar cruise', 'Rock of Gibraltar', 'Gibraltar port', 'Mediterranean cruises']
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // Alicante - PLACEHOLDER - Content needed
  {
    id: 'alicante',
    slug: 'alicante',
    name: 'Alicante',
    country: 'Spain',
    region: 'mediterranean',
    coordinates: { lat: 38.3452, lon: -0.4815 },
    tagline: 'Costa Blanca\'s vibrant port city',
    description: 'Alicante offers beautiful beaches, historic castles, palm-lined promenades, and authentic Spanish culture on the Costa Blanca.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'CET/CEST',
      portType: 'Pier',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Port is close to city centre and beach promenade.',
      publicTransport: 'Excellent tram system connects city and beaches.',
      taxis: 'Available at cruise terminal.',
      walkingDistance: 'City centre and beach walkable (10-15 mins).',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'April to October',
      cruiseTerminals: ['Puerto de Alicante'],
      nearbyAirport: 'Alicante-Elche Airport (15km)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'balearic-islands-cruises'],
    
    meta: {
      title: 'Alicante Cruise Port Guide | Costa Blanca | UK Cruise Consultant',
      description: 'Complete Alicante cruise port guide. Beaches, castle, and Spanish culture on the Mediterranean.',
      keywords: ['Alicante cruise port', 'Costa Blanca', 'Alicante Spain', 'Mediterranean ports']
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // ============================================================================
  // ATLANTIC ISLANDS - NEW PORTS
  // ============================================================================
  
  // Funchal, Madeira - PLACEHOLDER - Content needed
  {
    id: 'funchal',
    slug: 'funchal-madeira',
    name: 'Funchal, Madeira',
    country: 'Portugal',
    region: 'atlantic-islands',
    coordinates: { lat: 32.6669, lon: -16.9241 },
    tagline: 'Island of eternal spring',
    description: 'Funchal is the capital of Madeira, Portugal\'s beautiful Atlantic island known for year-round mild weather, fortified wine, stunning gardens, and dramatic landscapes.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese',
      timezone: 'WET/WEST',
      portType: 'Pier & Tender',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Port is in city centre. Most attractions walkable.',
      publicTransport: 'Local buses connect to villages and attractions.',
      taxis: 'Available at cruise terminal.',
      walkingDistance: 'City centre is immediately accessible from port.',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round - mild subtropical climate',
      cruiseTerminals: ['Porto do Funchal'],
      nearbyAirport: 'Madeira Airport (20km)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Funchal Madeira Cruise Port Guide | Island Paradise | UK Cruise Consultant',
      description: 'Complete Funchal Madeira cruise port guide. Gardens, wine, and year-round sunshine.',
      keywords: ['Funchal cruise', 'Madeira port', 'Funchal Portugal', 'Atlantic islands']
    },
    
    status: 'template',
    lastUpdated: '2025-01-01',
  },

  // Las Palmas, Gran Canaria - PLACEHOLDER - Content needed
  {
    id: 'las-palmas',
    slug: 'las-palmas-gran-canaria',
    name: 'Las Palmas, Gran Canaria',
    country: 'Spain (Canary Islands)',
    region: 'atlantic-islands',
    coordinates: { lat: 28.1248, lon: -15.4300 },
    tagline: 'Year-round sunshine and golden beaches',
    description: 'Las Palmas is the capital of Gran Canaria, offering year-round warm weather, beautiful city beaches, historic Vegueta district, and excellent shopping.',
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'WET/WEST',
      portType: 'Pier',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Port is close to city centre and Las Canteras beach.',
      publicTransport: 'Excellent bus network across the city.',
      taxis: 'Available at cruise terminal.',
      walkingDistance: 'Beach and shopping area 10-15 mins walk.',
    },
    
    thingsToDo: [],
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round - average 22°C',
      cruiseTerminals: ['Puerto de la Luz'],
      nearbyAirport: 'Gran Canaria Airport (25km)',
      visaInfo: 'Schengen visa requirements apply',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'west-africa-cruises'],
    
    meta: {
      title: 'Las Palmas Gran Canaria Cruise Port Guide | Year-Round Sun | UK Cruise Consultant',
      description: 'Complete Las Palmas cruise port guide. Beaches, shopping, and Canary Islands sunshine.',
      keywords: ['Las Palmas cruise', 'Gran Canaria port', 'Canary Islands', 'Atlantic islands']
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

