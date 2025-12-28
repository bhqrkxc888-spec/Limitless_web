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
        duration: '2 to 3 hours',
      },
      {
        title: 'Old Town Walls',
        description: 'Walk along the medieval walls that once protected the city. These are some of the best-preserved medieval walls in England.',
        category: 'history',
        duration: '1 hour',
      },
      {
        title: 'West Quay Shopping Centre',
        description: 'Major shopping destination with over 100 stores, restaurants, and a cinema. Perfect for pre-cruise shopping.',
        category: 'shopping',
        duration: '2 to 4 hours',
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
        description: 'Boutique hotel restaurant with excellent British cuisine.',
      },
      {
        name: 'Oxford Street',
        type: 'Area',
        description: 'Pedestrianised street with numerous cafes, pubs and restaurants.',
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
        duration: '3 to 4 hours',
      },
      {
        title: 'White Cliffs of Dover',
        description: 'Walk along the iconic chalk cliffs with stunning views across the English Channel to France.',
        category: 'nature',
        duration: '2 to 3 hours',
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
    tagline: 'Europe\'s busiest cruise hub with Gaudi, beaches, and world-class tapas',
    description: 'Barcelona is one of Europe\'s biggest and easiest cruise ports, with terminals close to the city centre and excellent links to the airport and trains. With one full day you can see several headline sights. Two or three days lets you add beaches, food and maybe a day trip.',
    
    // Detailed port information
    aboutPort: {
      overview: 'Barcelona Cruise Port is Europe\'s busiest cruise hub, with large, modern terminals mainly on Moll Adossat plus a smaller terminal at the World Trade Center (Port Vell) near the city.',
      terminals: 'Most big ships dock at Terminals A to E on Moll Adossat. Smaller or luxury ships sometimes use the World Trade Center or Maremagnum berths just by the lower end of La Rambla.',
      shuttle: 'A shuttle bus (often called the blue bus) usually runs between Moll Adossat and the Columbus Monument at the bottom of La Rambla, putting you a short walk from the Gothic Quarter.',
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
        distance: '25 to 35 minutes from cruise port by taxi',
        options: 'Common options from the airport into the city are taxi, the Aerobus shuttle to Placa de Catalunya, or the R2 Nord train to Sants or Estacio de Franca, then taxi or metro to the port.',
      },
      trains: {
        mainStation: 'Barcelona Sants',
        description: 'Barcelona Sants is the main long-distance station for high-speed trains to Madrid, Paris and beyond. From Sants it is about 15 to 25 minutes by taxi to the cruise terminals.',
        localHubs: 'For local trains, Sants and Passeig de Gracia are the main city hubs, and both connect easily by metro and taxi to the port area.',
      },
      cruiseLines: 'Barcelona is a major homeport for Western Mediterranean itineraries, regularly handling ships from MSC, Costa, Royal Caribbean, Norwegian, Celebrity, Carnival, Princess and others.',
    },

    gettingAround: {
      fromPort: 'The main cruise wharf (Moll Adossat) sits at the southern edge of the city, roughly 10 to 15 minutes by taxi to the Gothic Quarter in normal traffic. Use the port shuttle or taxi rather than walking the whole way, as parts of the walk are exposed and industrial.',
      publicTransport: 'Dense metro and bus network makes it easy to reach Sagrada Familia, Park Guell and Montjuic. The Hola Barcelona travel card gives unlimited public transport for 2 to 5 days.',
      taxis: 'Plentiful, metered and relatively straightforward for hops between port, Sagrada Familia, Park Guell and beaches.',
      walkingDistance: 'From the Columbus Monument you can walk La Rambla, the Gothic Quarter and much of Port Vell. Expect cobbles and occasional crowds.',
      sightseeingBus: 'Hop-on hop-off buses loop between major sights, useful if you want an overview without navigating public transport on a tight schedule.',
    },
    
    // Must-see sights (the headline attractions)
    mustSeeSights: [
      {
        title: 'La Sagrada Familia',
        description: 'Gaudi\'s iconic, still-unfinished basilica. Pre-book timed entry if at all possible.',
        image: 'sagrada-familia.webp',
      },
      {
        title: 'Gothic Quarter',
        description: 'Medieval lanes, Roman remains and Barcelona Cathedral, just off La Rambla.',
        image: 'gothic-quarter.webp',
      },
      {
        title: 'La Rambla and La Boqueria Market',
        description: 'The classic pedestrian boulevard from Placa de Catalunya to the port, with the colourful food market about halfway.',
        image: 'la-boqueria.webp',
      },
      {
        title: 'Park Guell',
        description: 'Gaudi\'s park with mosaics and city views; most of the Monumental Zone requires a timed ticket and a bit of uphill walking.',
        image: 'park-guell.webp',
      },
      {
        title: 'Passeig de Gracia',
        description: 'Elegant shopping avenue lined with Modernista buildings including Gaudi\'s famous Casa Batllo and La Pedrera.',
        image: 'casa-batllo.webp',
      },
      {
        title: 'Montjuic Hill',
        description: 'Overlooks port and city with a castle, museums and gardens; reachable by cable car, bus or taxi from the waterfront.',
        image: 'montjuic.webp',
      },
    ],

    thingsToDo: [
      {
        title: 'La Sagrada Familia and Eixample',
        description: 'Visit the basilica inside, then stroll through the Eixample district to admire more Gaudi facades.',
        category: 'culture',
        duration: '2 to 3 hours',
      },
      {
        title: 'Gothic Quarter and La Rambla',
        description: 'Explore the Gothic Quarter, cathedral and Placa Reial, combined with La Rambla and La Boqueria market.',
        category: 'exploration',
        duration: '3 to 4 hours',
      },
      {
        title: 'Park Guell and Passeig de Gracia',
        description: 'Head to Park Guell for views, then continue down to Passeig de Gracia for Casa Batllo and La Pedrera exteriors.',
        category: 'culture',
        duration: '3 to 4 hours',
      },
      {
        title: 'Montjuic Hill',
        description: 'Ride up Montjuic for port and city panoramas, possibly combining with MNAC museum or the Olympic area.',
        category: 'nature',
        duration: '2 to 3 hours',
      },
      {
        title: 'Barceloneta Beach',
        description: 'Spend relaxed hours at Barceloneta Beach and the Port Vell waterfront promenade.',
        category: 'beach',
        duration: '2 to 4 hours',
      },
      {
        title: 'City Highlights Tour',
        description: 'Join an organised city highlights tour that bundles Sagrada Familia photo stops, Park Guell, Gothic Quarter and Montjuic to maximise limited time.',
        category: 'experience',
        duration: 'Full day',
      },
    ],
    
    // Nearest beach info
    nearestBeach: {
      name: 'Barceloneta Beach',
      description: 'The closest major beach to the cruise area, stretching along the seafront east of Port Vell.',
      distance: 'From Moll Adossat you can take a taxi (about 10 to 15 minutes depending on traffic) or walk from the Columbus Monument in roughly 20 to 25 minutes along the waterfront.',
    },

    shoreExcursions: [
      {
        title: 'Gaudi Highlights Tour',
        description: 'See Sagrada Familia, Park Guell, Casa Batllo, and La Pedrera in one comprehensive tour.',
        duration: 'Full day',
        bookWith: 'Cruise line or independent',
      },
      {
        title: 'Montserrat Monastery',
        description: 'Mountain monastery with a basilica and views. Typical tours run 4 to 6 hours from Barcelona and combine the rack railway or cable car with free time.',
        duration: '4 to 6 hours',
        bookWith: 'Cruise line recommended',
      },
      {
        title: 'Costa Brava Coastal Villages',
        description: 'Longer full-day trips to towns like Tossa de Mar offer beaches, cliffs and old towns.',
        duration: 'Full day',
        bookWith: 'Cruise line',
      },
      {
        title: 'Cava and Wine Country',
        description: 'Tastings and vineyard visits in the Penedes region, roughly 1 hour from Barcelona.',
        duration: 'Half day',
        bookWith: 'Either',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late April to June and September to early October. Warm but not extreme, longer daylight and generally comfortable for walking.',
      cruiseTerminals: ['Moll Adossat Terminals A to E', 'World Trade Center', 'Maremagnum'],
      parking: 'Not applicable for cruise passengers',
      nearbyAirport: 'Barcelona El Prat (BCN), 25 to 35 minutes',
      visaInfo: 'Schengen visa requirements apply',
      timeZone: 'Central European Time (CET), Central European Summer Time (CEST) in summer',
      power: 'Type C and F plugs, 230V',
      water: 'Tap water is generally safe to drink, though some visitors prefer bottled due to taste.',
      dressCode: 'Churches (including Sagrada Familia) expect shoulders and thighs reasonably covered.',
    },

    // Time required estimates
    timeRequired: {
      intro: 'Here is an idea of how long you will need for the key sights in Barcelona.',
      estimates: [
        { sight: 'Gothic Quarter, La Rambla and Boqueria', time: '3 to 4 hours at a relaxed pace' },
        { sight: 'Sagrada Familia inside plus transport', time: '2 to 3 hours' },
        { sight: 'Park Guell Monumental Zone', time: '1.5 to 2 hours plus travel' },
        { sight: 'Montjuic viewpoint and MNAC or Olympic area', time: '2 to 3 hours' },
      ],
      summary: 'For a standard cruise day of 8 to 10 hours ashore, combining one major Gaudi site, the Gothic Quarter and La Rambla, and a quick beach or Montjuic stop is realistic if you use taxis efficiently.',
    },

    foodAndDrink: [
      {
        name: 'La Boqueria Market',
        type: 'Market',
        description: 'Numerous stalls and small counters for tapas, fresh fruit and seafood right off La Rambla.',
      },
      {
        name: 'El Nacional',
        type: 'Food Hall',
        description: 'Multi-restaurant food hall on Passeig de Gracia with tapas, seafood, and grilled dishes in a stylish setting.',
      },
      {
        name: 'Cal Pep',
        type: 'Tapas Bar',
        description: 'Classic bustling tapas bar in the Born district known for seafood; often a queue, but great for a quick, authentic stop.',
      },
      {
        name: 'Tapeo',
        type: 'Tapas',
        description: 'Modern tapas with inventive small plates in El Born, walkable from the Gothic Quarter.',
      },
    ],
    
    // Nearest familiar option
    fastFood: {
      name: 'McDonald\'s',
      description: 'One of the most convenient McDonald\'s for cruise visitors is near the bottom of La Rambla and the Columbus Monument (around La Rambla / Plaça del Portal de la Pau), walkable from the port shuttle stop.',
      alternatives: 'There are also branches on La Rambla closer to Plaça de Catalunya and around central transport hubs such as Sants.',
    },

    insiderTips: [
      'Pre-book timed entries for Sagrada Familia and Park Guell, especially in spring to autumn, to avoid disappointment.',
      'Keep valuables secure as pickpocketing can be an issue in busy areas like La Rambla, metro stations and markets.',
      'Factor in queues, security checks and traffic when planning your day. Always aim to be back at the ship at least 1 to 2 hours before the all-aboard time.',
      'If docking at Moll Adossat, use the port shuttle or taxi rather than walking the whole way, as parts of the walk are exposed and industrial.',
      'Avoid tourist trap restaurants on La Rambla. Head to side streets for authentic food.',
      'The hop-on hop-off bus is actually good value for hitting major sights on a tight schedule.',
    ],
    
    // FAQ section
    faq: [
      {
        question: 'Is Barcelona walkable from the cruise port?',
        answer: 'From the World Trade Center terminal, yes. La Rambla is about 10 minutes on foot. From Moll Adossat, most people use the shuttle or a taxi first, then walk within the historic centre.',
      },
      {
        question: 'How long do you need in Barcelona?',
        answer: 'For a cruise stop, one full day covers a few key sights. Two days allows Sagrada Familia inside, Park Guell, Gothic Quarter and a beach or Montjuic. A dedicated city break of 3 to 4 days lets you explore at a calmer pace.',
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
        { month: 'Jan', highC: 13, lowC: 5, rainMm: 40, rainyDays: 5, sunDays: 18, seaTempC: 14, uv: 'Low to moderate', wind: 'Light to moderate, often NW or NE' },
        { month: 'Feb', highC: 14, lowC: 6, rainMm: 35, rainyDays: 5, sunDays: 18, seaTempC: 13, uv: 'Moderate', wind: 'Light to moderate breezes' },
        { month: 'Mar', highC: 16, lowC: 8, rainMm: 40, rainyDays: 6, sunDays: 20, seaTempC: 14, uv: 'Moderate', wind: 'Breezier at times with fronts' },
        { month: 'Apr', highC: 18, lowC: 10, rainMm: 45, rainyDays: 7, sunDays: 20, seaTempC: 15, uv: 'Moderate', wind: 'Variable spring winds' },
        { month: 'May', highC: 22, lowC: 14, rainMm: 55, rainyDays: 7, sunDays: 22, seaTempC: 18, uv: 'High', wind: 'Often light sea breezes' },
        { month: 'Jun', highC: 26, lowC: 18, rainMm: 40, rainyDays: 5, sunDays: 24, seaTempC: 21, uv: 'High to very high', wind: 'Light onshore winds' },
        { month: 'Jul', highC: 29, lowC: 21, rainMm: 20, rainyDays: 3, sunDays: 27, seaTempC: 24, uv: 'Very high', wind: 'Often light, occasional hotter inland winds' },
        { month: 'Aug', highC: 29, lowC: 22, rainMm: 50, rainyDays: 5, sunDays: 25, seaTempC: 26, uv: 'Very high', wind: 'Warm, humid sea breezes' },
        { month: 'Sep', highC: 26, lowC: 19, rainMm: 75, rainyDays: 7, sunDays: 22, seaTempC: 24, uv: 'High', wind: 'Stormier days mixed with calm spells' },
        { month: 'Oct', highC: 22, lowC: 15, rainMm: 95, rainyDays: 8, sunDays: 19, seaTempC: 22, uv: 'Moderate', wind: 'Autumn fronts, some gusty days' },
        { month: 'Nov', highC: 17, lowC: 10, rainMm: 55, rainyDays: 6, sunDays: 18, seaTempC: 18, uv: 'Low to moderate', wind: 'Mixed calm and breezy spells' },
        { month: 'Dec', highC: 14, lowC: 6, rainMm: 45, rainyDays: 6, sunDays: 17, seaTempC: 15, uv: 'Low to moderate', wind: 'Generally light to moderate winds' },
      ],
      bestTime: {
        overall: 'Late April to June and September to early October. Warm but not extreme, longer daylight and generally comfortable for walking.',
        hottest: 'July and August are great for beach time, but heat, humidity and crowds can make intensive sightseeing harder.',
        quietest: 'November to March sees fewer tourists and milder temperatures, but shorter days and more risk of unsettled weather.',
        recommendation: 'For a first-time cruise visit, spring or early autumn are usually the sweet spot for comfort and still-pleasant sea temperatures.',
      },
    },

    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Barcelona Cruise Port Guide | Gaudí, Beaches & Tapas',
      description: 'Complete Barcelona cruise port guide. Visit Sagrada Família, explore the Gothic Quarter, enjoy tapas at La Boqueria, and discover insider tips for your Mediterranean cruise.',
      keywords: ['Barcelona cruise port', 'Barcelona shore excursions', 'Barcelona things to do', 'Barcelona from cruise ship', 'Barcelona Moll Adossat', 'Barcelona cruise terminal'],
    },
    
    status: 'published', // Fully live - complete guide
    lastUpdated: '2025-12-28',
  },
  
  {
    id: 'malaga',
    slug: 'malaga',
    name: 'Málaga',
    country: 'Spain',
    region: 'mediterranean',
    coordinates: { lat: 36.72, lon: -4.42 },
    tagline: 'Sun-drenched gateway to Picasso, castles and the Costa del Sol',
    description: 'Málaga sits on Spain\'s southern Mediterranean coast, combining a busy modern port with a compact historic centre of Moorish fortresses, churches and museums. Cruise ships berth on piers that are linked directly to the waterfront promenades, so passengers can walk to the old town, marina and beaches.',
    
    aboutPort: {
      overview: 'Málaga Cruise Port lies within the sheltered bay immediately beside the city, and is one of Spain\'s busiest cruise harbours after Barcelona. It handles large ocean vessels and smaller ships, as well as ferries to North Africa and general cargo.',
      terminals: 'There are three cruise terminals: Terminal A and Terminal B on the eastern cruise pier for larger vessels, plus the Palm Grove Terminal (Palmeral) at the inner basin close to the historic centre that caters mainly for smaller and luxury ships.',
      shuttleServices: 'Dedicated shuttles are often provided from the outer eastern cruise berths to the Palm Grove area or near the city centre, especially in hot weather or for passengers with reduced mobility.',
      walkability: 'On foot, the walk from Terminal A or B to the edge of the historic centre via Palmeral de las Sorpresas and Muelle Uno typically takes around 15 to 20 minutes on flat, well-paved paths. The Palm Grove waterfront, Muelle Uno shopping and dining area, and the city\'s cathedral are within a few minutes\' walk from the inner basin berths.',
    },

    quickFacts: {
      currency: 'EUR',
      language: 'Spanish is the main language; English is widely used in tourist, port and hospitality areas',
      timezone: 'CET/CEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Málaga–Costa del Sol Airport (AGP)',
        distance: 'Around 8 to 12 kilometres south-west of the city, typically 15 to 20 minutes by road in normal traffic',
        options: 'Taxi: Direct road transfer between port and airport usually takes 15 to 20 minutes. Train: Cercanías line C1 runs between the airport and Málaga María Zambrano station; from there it is about a 15-minute walk or a 5-minute taxi ride to the cruise area, giving a total journey of roughly 30 to 40 minutes. Bus: Airport buses also run into the city centre, from where you can walk or take a short taxi to the port.',
      },
      trains: {
        mainStation: 'Málaga María Zambrano (mainline and AVE), with Málaga Centro-Alameda as a nearby inner-city stop',
        description: 'High-speed AVE and long-distance services connect Málaga with Madrid and other major Spanish cities, while regional trains link it with Córdoba, Seville and the wider Andalusian network',
        localHubs: 'María Zambrano serves as the primary hub for both high-speed and local Cercanías services along the coast and inland, making onward travel straightforward for pre- and post-cruise stays',
      },
      cruiseLines: 'Málaga is featured on many Western Mediterranean, repositioning and Canary Islands itineraries, and is also used as a departure port. Cruise lines calling regularly include MSC Cruises, Costa Cruises, Royal Caribbean, Norwegian Cruise Line, Carnival, P&O Cruises, Celebrity Cruises and various premium and luxury operators',
    },

    gettingAround: {
      fromPort: 'From ship to city, passengers generally either walk along the landscaped harbour promenades or use a short shuttle ride if offered. The route into town passes cafés, shops and views of the cathedral and Alcazaba on the hill above.',
      publicTransport: 'Málaga has an urban bus network and a modern suburban rail system (Cercanías), but no full metro; however, two short underground-style lines link the west of the city with the centre. Buses and local trains connect easily to the intermodal María Zambrano station and newer districts, while most cruise visitors only need them for more distant beaches or shopping centres.',
      taxis: 'Taxis are plentiful at the port and throughout the city, with signed ranks at the terminals and near key squares, and are convenient for short hops to the train station, Gibralfaro viewpoint or more distant beach areas.',
      walkingDistance: 'Walking distances in the central area are modest: the cathedral, Alcazaba, Picasso Museum and main shopping street Calle Larios all sit within about 10 to 20 minutes\' walk of the cruise promenades.',
      sightseeingBus: 'A hop-on hop-off sightseeing bus operates from near the port and runs a loop past main attractions including the cathedral, Alcazaba, Gibralfaro, beaches and modern districts, with commentary provided in multiple languages. This can be useful if you want to minimise uphill walking or cover several dispersed sights in a single day.',
    },
    
    mustSeeSights: [
      {
        title: 'Alcazaba of Málaga',
        description: 'The Alcazaba is a well-preserved Moorish fortress rising above the city, with walls, courtyards and gardens offering views over the port and bullring. It sits just above the Roman theatre and can be reached by a relatively short but uphill walk from the old town.',
        image: 'alcazaba-malaga.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Castillo de Gibralfaro',
        description: 'Higher up the same hill, Gibralfaro Castle provides panoramic views over Málaga, the harbour and coastline, and is linked to the Alcazaba by a defensive walkway. Visitors can explore the ramparts and small interpretation displays, and reach it either by a steep walk, taxi or local bus.',
        image: 'gibralfaro-castle.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Picasso Museum Málaga',
        description: 'Located in the historic centre, the Picasso Museum celebrates Málaga\'s most famous son with a broad collection of his works housed in a restored palace. It is an essential stop for art-minded visitors and can easily be combined with a stroll through the old streets and nearby cafés.',
        image: 'picasso-museum-malaga.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Málaga Cathedral (La Manquita)',
        description: 'Málaga Cathedral, nicknamed "La Manquita" for its unfinished second tower, is an impressive Renaissance and Baroque building close to the port promenade. Its interior, chapels and possible rooftop visits (when operating) offer both architectural interest and city views.',
        image: 'malaga-cathedral.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Historic centre and Calle Larios',
        description: 'The pedestrianised historic centre, anchored by Calle Marqués de Larios, is filled with elegant buildings, shops, cafés and squares such as Plaza de la Constitución. It is ideal for wandering, shopping and sampling tapas, and lies a short walk from the harbour front.',
        image: 'calle-larios.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Day trip to Granada and the Alhambra (for long calls)',
        description: 'For itineraries with a long port stay, Málaga acts as a gateway to Granada and the Alhambra Palace, approximately 90 to 120 minutes away by coach each way. Many cruise lines offer full-day excursions combining the palace complex with a brief city overview.',
        image: 'alhambra-granada.webp',
        duration: '4 to 5 hours plus travel time',
      },
    ],

    thingsToDo: [
      {
        title: 'Alcazaba and Gibralfaro',
        description: 'Visit the Moorish fortress and castle complex for stunning views and history. The combined ticket offers best value for both sites.',
        category: 'history',
        duration: '3 to 4 hours',
      },
      {
        title: 'Picasso Museum and Historic Centre',
        description: 'Explore the Picasso Museum then wander through the old town streets, visiting the cathedral and Calle Larios shopping street.',
        category: 'culture',
        duration: '3 to 4 hours',
      },
      {
        title: 'Malagueta Beach',
        description: 'Relax on the main city beach, enjoy beach bars and the seafront promenade within easy reach of the port.',
        category: 'beach',
        duration: '2 to 4 hours',
      },
    ],
    
    nearestBeach: {
      name: 'Playa de la Malagueta',
      description: 'Malagueta is the main city beach, a broad stretch of sand backed by a promenade, palm trees, play areas and chiringuitos (beach bars), popular for swimming and sunbathing. It provides easy seaside relaxation within the city and is busy with both locals and cruise visitors in good weather.',
      gettingThere: 'From the cruise area and Muelle Uno, Malagueta Beach is around 10 to 20 minutes\' walk depending on exact berth, following the seafront promenade eastwards; taxis reduce the journey to a few minutes.',
    },
    
    shoreExcursions: [
      {
        title: 'Granada and the Alhambra',
        description: 'Day trip to see the stunning Alhambra palace and Generalife gardens, approximately 90 to 120 minutes each way by coach.',
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
      bestTimeToVisit: 'Late spring and early autumn provide the best mix of warm weather, sunshine and manageable crowds for sightseeing and beach time',
      cruiseTerminals: ['Terminal A', 'Terminal B', 'Palm Grove Terminal (Palmeral)'],
      parking: 'Not applicable',
      nearbyAirport: 'Málaga–Costa del Sol Airport (AGP), approximately 8 to 12 kilometres from the cruise port',
      visaInfo: 'Spain is part of the Schengen Area; EU citizens and many other nationalities can enter visa-free for short stays, but travellers should check current Schengen and Spanish entry rules for their nationality and itinerary before sailing',
    },
    
    foodAndDrink: [
      {
        name: 'Muelle Uno and Palmeral waterfront',
        type: 'Restaurant / Café zone',
        description: 'The modern Muelle Uno and Palmeral de las Sorpresas area beside the cruise quays offers numerous restaurants and cafés with harbour views, serving tapas, seafood and international dishes convenient for passengers',
      },
      {
        name: 'Atarazanas Market (Mercado Central de Atarazanas)',
        type: 'Market / Tapas',
        description: 'This covered market in the centre is known for its fresh produce, fish and tapas stalls, giving visitors a lively taste of local food culture and quick bites',
      },
      {
        name: 'Traditional tapas bars in the historic centre',
        type: 'Tapas Bar',
        description: 'Streets around Calle Larios and nearby plazas host classic tapas bars where you can sample regional dishes, Iberian ham, fried fish and local Málaga sweet wines',
      },
      {
        name: 'Beachfront chiringuitos at Malagueta',
        type: 'Beach Restaurant / Chiringuito',
        description: 'The chiringuitos lining Malagueta Beach specialise in grilled sardines on skewers (espetos), fried fish and simple seafood plates enjoyed with sea views',
      },
    ],
    
    insiderTips: [
      'Booking tickets in advance: For popular attractions such as the Picasso Museum and Alhambra excursions from Málaga, advance booking is strongly recommended to secure timed entry',
      'Safety and pickpockets: The central area is generally safe, but visitors should take normal precautions with bags and valuables in busy streets, on public transport and at major sights',
      'Timing and queues: Heat and crowds build towards midday in high season; visiting hilltop sites like Gibralfaro early or late in the day makes climbing more comfortable and views clearer',
      'Transport advice: For central sightseeing, walking is usually easiest, with taxis or local buses used mainly for Gibralfaro, the airport, more distant beaches or pre/post-cruise transfers',
      'Things to avoid: Trying to combine a full Granada and Alhambra excursion with thorough exploration of Málaga in a short call can feel rushed; it is often better to choose one focus',
      'Heat management: In summer, plan indoor museum visits or shaded park stops in the early afternoon and carry water and sun protection',
    ],

    weather: {
      intro: 'Málaga has a Mediterranean climate with hot, dry summers and mild winters. The city enjoys over 300 days of sunshine per year.',
      months: [
        { month: 'Jan', highC: 17, lowC: 8, rainMm: 60, sunDays: 18, seaTempC: 15 },
        { month: 'Feb', highC: 18, lowC: 9, rainMm: 50, sunDays: 18, seaTempC: 15 },
        { month: 'Mar', highC: 20, lowC: 10, rainMm: 40, sunDays: 21, seaTempC: 15 },
        { month: 'Apr', highC: 22, lowC: 12, rainMm: 40, sunDays: 22, seaTempC: 16 },
        { month: 'May', highC: 25, lowC: 15, rainMm: 20, sunDays: 26, seaTempC: 18 },
        { month: 'Jun', highC: 29, lowC: 19, rainMm: 10, sunDays: 28, seaTempC: 20 },
        { month: 'Jul', highC: 31, lowC: 21, rainMm: 2, sunDays: 30, seaTempC: 23 },
        { month: 'Aug', highC: 31, lowC: 22, rainMm: 3, sunDays: 30, seaTempC: 24 },
        { month: 'Sep', highC: 28, lowC: 20, rainMm: 15, sunDays: 26, seaTempC: 23 },
        { month: 'Oct', highC: 24, lowC: 16, rainMm: 50, sunDays: 22, seaTempC: 21 },
        { month: 'Nov', highC: 20, lowC: 12, rainMm: 60, sunDays: 19, seaTempC: 18 },
        { month: 'Dec', highC: 17, lowC: 9, rainMm: 70, sunDays: 17, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'May, June, September and early October offer warm but usually not extreme temperatures, plenty of sunshine and good sea conditions for beach time and walking',
        hottest: 'July and August bring very warm weather, busy city and beaches, long daylight and a lively atmosphere, but also more intense heat and larger crowds',
        quietest: 'Winter and early spring are milder, quieter and good for sightseeing, though the sea is cooler and there is more chance of rain on some days',
        recommendation: 'Late spring or early autumn is usually ideal, giving comfortable conditions for both cultural visits and some time on Malagueta Beach without the peak summer heat',
      },
    },

    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, the terminals are linked to the city by seafront promenades, with the historic centre around 15 to 20 minutes away on foot from the main cruise pier and even closer from the inner Palm Grove terminal.',
      },
      {
        question: 'How long do you need?',
        answer: 'A full cruise day allows time to see the Alcazaba, cathedral, Picasso Museum and old town, while even a shorter call can fit in a focused route plus a brief beach or harbour stop.',
      },
      {
        question: 'Is English spoken?',
        answer: 'English is widely used in port facilities, main attractions and many restaurants and shops, especially those catering to visitors.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'Walking suits most central sightseeing; taxis or local buses are helpful for the airport, Gibralfaro hill or more distant beaches and shopping centres.',
      },
      {
        question: 'Can you do Granada and the Alhambra on a cruise day?',
        answer: 'Yes, many ships offer full-day excursions, usually 90 to 120 minutes each way by coach, but they are best for longer calls and mean sacrificing in-depth time in Málaga itself.',
      },
    ],
    
    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Málaga Cruise Port Guide | Picasso, Alcazaba & Costa del Sol',
      description: 'Complete Málaga cruise port guide. Visit the Alcazaba, explore Picasso\'s birthplace, enjoy Malagueta Beach, and discover the best tapas and chiringuitos on the Costa del Sol.',
      keywords: ['Málaga cruise port', 'Málaga shore excursions', 'Málaga things to do', 'Málaga from cruise ship', 'Málaga cruise terminal', 'Costa del Sol cruise'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
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
    coordinates: { lat: 38.72, lon: -9.14 },
    tagline: 'Riverfront gateway to hills, trams and tiled boulevards',
    description: 'Lisbon sits on the north bank of the River Tagus, spreading over steep hills with viewpoints, historic quarters and famous yellow trams above a long urban waterfront. Cruise ships dock along this riverfront, with several terminals located within or near walking distance of the Baixa and Alfama districts.',
    
    aboutPort: {
      overview: 'Lisbon\'s cruise facilities stretch along the north bank of the Tagus close to the historic city, with a deep sheltered channel that accommodates large modern ships. The location allows views of the city, castle and 25 de Abril Bridge during arrival and departure.',
      terminals: 'There are several cruise areas: the newer Lisbon Cruise Terminal complex at Jardim do Tabaco and Santa Apolónia, and the Alcântara and Rocha Conde de Óbidos (Rocha) terminals further west towards the bridge. The main Lisbon Cruise Terminal building at Jardim do Tabaco, opened in 2017 and designed by architect João Luís Carrilho da Graça, offers modern check-in areas, luggage handling, terraces and easy access to Alfama and Baixa.',
      shuttleServices: 'Shuttle buses and public buses are often available from terminals a little further out, while Santa Apolónia and Jardim do Tabaco are close enough that many passengers walk straight into the city.',
      walkability: 'From the newer terminal area it is typically about 10 to 15 minutes on foot to the heart of Baixa and Praça do Comércio, and a similar or slightly longer walk uphill into Alfama streets.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese is the official language; English is widely spoken in tourist, port and hospitality sectors',
      timezone: 'Western European Time (WET), Western European Summer Time (WEST) in summer',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },

    transportConnections: {
      airport: {
        name: 'Humberto Delgado Airport, Lisbon Airport (LIS)',
        distance: 'Approximately 8 to 10 kilometres from the main riverfront terminals, typically 20 to 30 minutes by road depending on traffic',
        options: 'Direct transfers usually take 20 to 30 minutes between airport and central cruise terminals. The airport is on the metro network; passengers can connect via metro to Santa Apolónia or Cais do Sodré stations near riverfront areas, then walk or take a short taxi. Regular buses and aerobus-type services link the airport with central Lisbon, from where it is a short taxi or walk to many terminals.',
      },
      trains: {
        mainStation: 'Santa Apolónia (close to some cruise quays) and Lisboa-Oriente (major intercity and high-speed hub)',
        description: 'Long-distance and high-speed services connect Lisbon with Porto, Coimbra, Faro and Spanish cities such as Madrid, while suburban trains link to Cascais, Sintra and regional towns.',
        localHubs: 'Cais do Sodré for Cascais line and Rossio for Sintra line act as key suburban hubs alongside Oriente.',
      },
      cruiseLines: ['MSC Cruises', 'Royal Caribbean', 'Norwegian Cruise Line', 'Costa', 'P&O Cruises', 'Cunard', 'Celebrity Cruises'],
    },
    
    gettingAround: {
      fromPort: 'From ship to city, passengers at Santa Apolónia and Jardim do Tabaco can usually walk along the riverfront or through Alfama and Baixa without needing transport. From Alcântara and Rocha, many walkers still head along the waterfront, but shuttles, buses or trams shorten the approach.',
      publicTransport: 'Lisbon has an extensive public transport network including metro, trams, urban and suburban trains and buses. Iconic tram 28E passes through several historic districts, while trams and buses along the river connect terminals with Cais do Sodré, Baixa and Belém.',
      taxis: 'Taxis and app-based rides are widely available at terminals and central squares, useful for steep hill climbs to viewpoints or for those with limited mobility.',
      walkingDistance: 'Walking distances vary by terminal, but many main sights in Baixa, Chiado and Alfama are within 15 to 25 minutes of the central cruise quays, with steep cobbled streets in some quarters.',
      sightseeingBus: 'Hop-on hop-off sightseeing buses operate from stops near the terminals and along the river, running loops to downtown, Belém, Parque das Nações and other districts, and are popular with cruise visitors wanting a structured overview.',
    },
    
    mustSeeSights: [
      {
        title: 'Alfama and São Jorge Castle',
        description: 'Alfama is Lisbon\'s oldest quarter, a maze of steep alleys, viewpoints and traditional houses climbing from the river towards São Jorge Castle. The castle itself crowns the hill with ramparts and views over the Tagus and city roofs, and can be reached on foot or via tram and short climbs.',
        image: 'alfama-castle.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Baixa and Praça do Comércio',
        description: 'The Baixa district is the rebuilt lower town with grid-pattern streets, shops and cafés between Rossio and the river. Praça do Comércio opens onto the Tagus with arcades and the triumphal arch, forming a central point for exploring downtown on foot.',
        image: 'baixa-comercio.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Belém (Jerónimos Monastery and Belém Tower)',
        description: 'Belém lies west along the river and contains the Jerónimos Monastery, Belém Tower and Monument to the Discoveries, key symbols of Portugal\'s Age of Discovery. These waterfront monuments are typically reached by tram, bus or hop-on hop-off bus from near the cruise area.',
        image: 'belem-monastery.webp',
        duration: '3 to 4 hours',
      },
      {
        title: 'Elevador de Santa Justa and Chiado',
        description: 'The iron Santa Justa lift links Baixa with the higher Carmo and Chiado areas and offers elevated views over central Lisbon. The surrounding streets of Chiado mix historic buildings, cafés and shops, ideal for a combined viewpoint and shopping stop.',
        image: 'santa-justa-chiado.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Tram 28E route',
        description: 'Tram 28E passes through several historic districts including Baixa, Graça and Alfama, offering a scenic ride through narrow streets and past viewpoints. It is a popular way to experience the hills, though it can be crowded at peak times.',
        image: 'tram-28.webp',
        duration: '1 to 1.5 hours (including waiting)',
      },
      {
        title: 'Parque das Nações (modern riverfront)',
        description: 'Further east along the river, Parque das Nações is a redeveloped area from Expo 98, with modern architecture, riverside walks and the large Oceanário de Lisboa aquarium. It is reached by metro or train to Oriente and provides a contrast to the historic centre.',
        image: 'parque-nacoes.webp',
        duration: '2 to 3 hours',
      },
    ],

    thingsToDo: [
      {
        title: 'Belém Tower & Jerónimos Monastery',
        description: 'UNESCO World Heritage sites showcasing Portugal\'s Age of Discovery. Don\'t miss the monastery\'s stunning cloisters.',
        category: 'history',
        duration: '3 to 4 hours',
      },
      {
        title: 'Tram 28',
        description: 'Ride the iconic yellow tram through Alfama, Graça, and the historic neighbourhoods.',
        category: 'experience',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Alfama District',
        description: 'Wander the oldest neighbourhood\'s narrow streets, discover hidden viewpoints, and listen for Fado music.',
        category: 'exploration',
        duration: '2 to 3 hours',
      },
      {
        title: 'Pastéis de Belém',
        description: 'Queue for the original pastel de nata (custard tart) at this legendary bakery since 1837.',
        category: 'food',
        duration: '30 mins',
      },
    ],

    nearestBeach: {
      name: 'Nearest true Atlantic beaches are at Costa da Caparica (south bank) and the Cascais / Estoril coast (west of Lisbon)',
      description: 'These beaches offer wide sandy shores with Atlantic waves, promenades and seasonal facilities, popular with locals and visitors for day trips from the city.',
      gettingThere: 'From central Lisbon, suburban trains from Cais do Sodré reach Cascais in about 40 minutes, while Costa da Caparica is reached by bus or taxi across the bridge in roughly 25 to 40 minutes depending on traffic.',
      image: 'beach.webp',
    },
    
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
    
    foodAndDrink: [
      {
        name: 'Time Out Market (Mercado da Ribeira)',
        type: 'Food Hall / Market',
        description: 'This indoor food hall near Cais do Sodré houses numerous curated stalls showcasing Portuguese chefs, regional dishes, seafood, pastries and wines under one roof.',
      },
      {
        name: 'Alfama traditional restaurants and fado houses',
        type: 'Restaurant / Fado venue',
        description: 'Alfama\'s small restaurants and fado houses serve traditional Portuguese cuisine, grilled fish and petiscos alongside live fado music on selected evenings.',
      },
      {
        name: 'Baixa and Chiado cafés and pastelarias',
        type: 'Café / Bakery',
        description: 'Central streets and squares are lined with pastelarias offering coffee and pastries such as pastéis de nata, ideal for a quick break during walking tours.',
      },
      {
        name: 'Belém pastry shops',
        type: 'Bakery / Café',
        description: 'Belém is famous for pastéis de Belém, custard tarts from historic pastry shops near the monastery, often enjoyed before or after visiting the monuments.',
      },
    ],
    
    insiderTips: [
      'Booking tickets in advance: Pre-book timed entries for popular sites like Jerónimos Monastery, Belém Tower and the castle in high season to reduce queue times.',
      'Safety and pickpockets: Central Lisbon is generally safe, but pickpockets operate on crowded trams, in busy squares and around major viewpoints, so keep valuables secure.',
      'Timing and queues: Belém and Tram 28E are busiest late morning to mid-afternoon; going early or later in the day helps avoid long waits.',
      'Transport advice: For hills, consider using trams, funiculars or taxis one way and walking downhill back towards the river.',
      'Things to avoid: Trying to cover both extensive Belém sightseeing and multiple hilltop quarters in a short call can feel rushed; choose one or two key areas and explore them well.',
      'Footwear: Many streets are cobbled and steep; comfortable shoes with good grip are very helpful, especially when pavements are wet.',
    ],

    weather: {
      intro: 'Typical monthly climate averages for Lisbon, rounded.',
      months: [
        { month: 'Jan', highC: 15, lowC: 8, rainMm: 100, sunDays: 15, seaTempC: 15 },
        { month: 'Feb', highC: 16, lowC: 9, rainMm: 85, sunDays: 15, seaTempC: 15 },
        { month: 'Mar', highC: 18, lowC: 10, rainMm: 70, sunDays: 18, seaTempC: 15 },
        { month: 'Apr', highC: 20, lowC: 11, rainMm: 65, sunDays: 20, seaTempC: 16 },
        { month: 'May', highC: 22, lowC: 14, rainMm: 40, sunDays: 24, seaTempC: 17 },
        { month: 'Jun', highC: 26, lowC: 17, rainMm: 20, sunDays: 27, seaTempC: 18 },
        { month: 'Jul', highC: 28, lowC: 18, rainMm: 5, sunDays: 30, seaTempC: 19 },
        { month: 'Aug', highC: 29, lowC: 19, rainMm: 5, sunDays: 30, seaTempC: 20 },
        { month: 'Sep', highC: 27, lowC: 18, rainMm: 35, sunDays: 25, seaTempC: 20 },
        { month: 'Oct', highC: 23, lowC: 15, rainMm: 80, sunDays: 20, seaTempC: 19 },
        { month: 'Nov', highC: 18, lowC: 11, rainMm: 95, sunDays: 17, seaTempC: 17 },
        { month: 'Dec', highC: 15, lowC: 9, rainMm: 110, sunDays: 15, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'Late spring and early autumn (May, June, September) usually offer warm but comfortable temperatures, plenty of dry days and good sightseeing conditions.',
        hottest: 'July and August provide long days, lively streets and warm evenings, but also higher heat and crowds at popular sites and on trams.',
        quietest: 'Winter and early spring are milder and quieter, with more changeable weather yet easier access to museums and viewpoints without long queues.',
        recommendation: 'May, June or September generally give the best balance of weather, daylight and crowd levels for exploring hills, trams and riverside areas in a single port day.',
      },
    },

    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, from the central riverfront terminals many major sights in Baixa and Alfama are walkable in 10 to 25 minutes, while Alcântara and Rocha may require short transport rides.',
      },
      {
        question: 'How long do you need?',
        answer: 'A full cruise day allows time for a mix of riverfront, Baixa and one hilltop quarter, while shorter calls are best focused on either Alfama and the castle or Baixa and Belém.',
      },
      {
        question: 'Is English spoken?',
        answer: 'English is widely spoken in tourist areas, hotels, restaurants and attractions, alongside Portuguese.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'Walking and trams cover most needs in the historic centre; taxis, funiculars and metro are useful for steep climbs or reaching more distant districts such as Belém or Parque das Nações.',
      },
      {
        question: 'Can you do Sintra on a cruise day?',
        answer: 'Yes, but Sintra lies around 40 minutes by train from Rossio plus local transfers to palaces, so it suits longer port calls and will limit time in Lisbon itself.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late spring and early autumn offer warm, mostly dry weather, long enough days and manageable crowds for hill walking and riverfront sightseeing.',
      cruiseTerminals: ['Alcântara', 'Rocha Conde de Óbidos', 'Jardim do Tabaco (Lisbon Cruise Terminal)', 'Santa Apolónia'],
      parking: 'Not applicable',
      nearbyAirport: 'Humberto Delgado Airport (LIS), about 8 to 10 kilometres from the main cruise terminals',
      visaInfo: 'Portugal is part of the Schengen Area, so EU citizens and many other nationalities can visit visa-free for short stays, but travellers should check up-to-date Schengen and Portuguese entry rules for their nationality and itinerary.',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Lisbon Cruise Port Guide | Riverfront Gateway, Trams & Belém',
      description: 'Complete Lisbon cruise port guide. Explore Alfama and São Jorge Castle, ride Tram 28E, visit Belém Tower and Jerónimos Monastery, and discover insider tips for your Atlantic cruise.',
      keywords: ['Lisbon cruise port', 'Lisbon shore excursions', 'Lisbon things to do', 'Lisbon from cruise ship', 'Lisbon cruise terminal', 'Santa Apolónia terminal'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
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
    coordinates: { lat: 28.47, lon: -16.25 },
    tagline: 'Year-round winter-sun gateway to volcanoes and palm-lined plazas',
    description: 'Santa Cruz de Tenerife lies on the north-east coast of Tenerife, backed by the Anaga mountains and facing the Atlantic with a large natural harbour. Cruise ships dock along long piers just outside the city centre, with a modern terminal and free shuttle buses connecting directly to the main square Plaza de España.',
    
    aboutPort: {
      overview: 'Santa Cruz de Tenerife\'s cruise facilities form part of Puerto de Santa Cruz de Tenerife, a deep natural harbour on the island\'s north-east coast. It is one of Spain\'s busiest cruise ports after Barcelona, particularly popular on Canary Islands and Atlantic itineraries.',
      terminals: 'Cruise ships usually dock at Muelle Sur (South Pier) or Muelle Norte / Muelle Ribera close to the city; the newest main terminal opened in 2016 with a berth length of about 395 metres, a large check-in area with 50 desks and extensive bus and taxi staging. Larger ships tend to use Muelle Sur, while some smaller vessels may berth closer to town at Muelle Ribera.',
      shuttleServices: 'A free shuttle bus provided by the port authority normally runs between the cruise pier and Plaza de España, Santa Cruz\'s main central square, reducing the walk into town.',
      walkability: 'Distances vary by berth, but the walk from the terminal to Plaza de España is roughly 1 to 1.5 kilometres (about 10 to 20 minutes) on flat surfaces; some reports note that taxis or shuttles may be limited at times, so passengers with mobility issues should confirm arrangements in advance.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish is the main language; English is widely understood in tourist areas and at port, with some German also heard',
      timezone: 'WET/WEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Tenerife North – Ciudad de La Laguna Airport (TFN) and Tenerife South Airport (TFS)',
        distance: 'Tenerife North is about 10 to 15 kilometres from Santa Cruz (around 15 to 20 minutes by road), while Tenerife South is roughly 60 kilometres away (around 45 to 60 minutes by road)',
        options: 'Taxis connect the port with both airports, typically taking around 15 to 20 minutes to Tenerife North and 45 to 60 minutes to Tenerife South depending on traffic. TITSA buses operate frequent services between Santa Cruz bus station (Intercambiador) and both airports; from the bus station it is a short taxi or 15 to 20 minute walk to the port area. There is no direct train service on Tenerife.',
      },
      trains: {
        mainStation: 'No conventional railway network on Tenerife',
        description: 'There is no conventional railway network on Tenerife; public transport relies on buses and tram. The tram links Santa Cruz with La Laguna, and buses connect to most major resorts and towns around the island.',
        localHubs: 'The modern tram (Tranvía de Tenerife) links Santa Cruz with La Laguna inland, reachable after a short walk or bus ride from the centre.',
      },
      cruiseLines: ['AIDA', 'Cunard', 'Costa', 'Holland America', 'P&O Cruises (UK)', 'Princess', 'Seabourn'],
    },

    gettingAround: {
      fromPort: 'Passengers get from ship to city either by walking along the waterfront or by taking the free shuttle to Plaza de España, from where most central sights are within easy reach.',
      publicTransport: 'Santa Cruz has a good public transport system with buses operated by TITSA covering the city, nearby beaches and other parts of the island. The modern tram (Tranvía de Tenerife) links Santa Cruz with La Laguna inland, reachable after a short walk or bus ride from the centre, and can be a pleasant way to see everyday island life.',
      taxis: 'Taxis are generally available at the pier and around Plaza de España, although there are occasional reports of shortages when multiple ships are in port. Taxi and bus are the most common ways to reach out-of-town attractions such as Mount Teide, Loro Parque (Puerto de la Cruz) or more distant beaches.',
      walkingDistance: 'The city centre is compact, with pedestrianised streets, parks and plazas radiating from the square. For many visitors, central Santa Cruz is easily covered on foot with only one extra bus or taxi ride needed for a beach or viewpoint.',
      sightseeingBus: 'A hop-on hop-off sightseeing bus operates in Santa Cruz, usually starting near the port or Plaza de España and running a loop that includes main city sights, parks and the striking Auditorio de Tenerife.',
    },
    
    mustSeeSights: [
      {
        title: 'Plaza de España and central streets',
        description: 'Plaza de España is the main square of Santa Cruz and the shuttle drop-off point, with a large artificial lake, modern sculptures and views towards the harbour. From here, pedestrian streets lead to shops, cafés and nearby historic buildings including Plaza de la Candelaria and the surrounding commercial district.',
        image: 'plaza-espana-tenerife.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Auditorio de Tenerife',
        description: 'The Auditorio de Tenerife is an eye-catching, wave-shaped concert hall designed by Santiago Calatrava on the seafront west of the city centre. It is a popular photo spot and sometimes offers guided tours or access to performances, easily reached by a short taxi, bus ride or longer waterfront walk.',
        image: 'auditorio-tenerife.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Mercado de Nuestra Señora de África',
        description: 'This semi-covered market showcases local produce, cheeses, meats, flowers and Canarian products in a distinctive pink-arched building. It is within walking distance of Plaza de España and offers a flavour of everyday island life as well as snacks and souvenirs.',
        image: 'mercado-africa-tenerife.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Parque García Sanabria',
        description: 'Parque García Sanabria is a large, lush city park slightly uphill from the centre, known for subtropical plants, sculptures and shady paths. It is ideal for a quiet break from city streets and can be reached on foot from Plaza de España in around 15 to 20 minutes.',
        image: 'parque-garcia-sanabria.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Day trip to Mount Teide National Park',
        description: 'Mount Teide, a volcano and Spain\'s highest peak, dominates the centre of Tenerife and is part of a UNESCO-listed national park. Organised excursions and private tours from the port typically include a drive through dramatic volcanic landscapes, viewpoints and sometimes the cable car (weather permitting).',
        image: 'mount-teide.webp',
        duration: '3 to 4 hours plus travel (full-day excursion)',
      },
      {
        title: 'Puerto de la Cruz and Loro Parque',
        description: 'Puerto de la Cruz on the north coast is a traditional resort town, home to the famous zoo and marine park Loro Parque. Many cruises offer full-day trips combining time in the town with a visit to Loro Parque\'s exhibits and shows.',
        image: 'loro-parque.webp',
        duration: '4 to 5 hours plus travel (full-day excursion)',
      },
    ],

    nearestBeach: {
      name: 'Playa de las Teresitas',
      description: 'Playa de las Teresitas is a wide, golden-sand beach in a sheltered bay near the village of San Andrés, backed by palm trees and breakwaters. It is considered one of the most attractive beaches near Santa Cruz and is popular for swimming and sunbathing.',
      gettingThere: 'From Plaza de España, local buses run to San Andrés and Playa de las Teresitas in around 20 minutes, or you can take a taxi in a similar time depending on traffic. The distance is roughly 8 to 10 kilometres north of Santa Cruz along the coast.',
      image: 'beach.webp',
    },
    
    foodAndDrink: [
      {
        name: 'Around Plaza de España and Plaza de la Candelaria',
        type: 'Restaurant / Café zone',
        description: 'Streets around these central squares offer numerous cafés, tapas bars and restaurants serving Canarian and Spanish dishes, ideal for a meal or drink close to the shuttle stop.',
      },
      {
        name: 'Mercado de Nuestra Señora de África',
        type: 'Market',
        description: 'The market itself and nearby stalls provide local cheeses, pastries, tapas and quick bites, letting visitors sample everyday Canarian flavours in a lively setting.',
      },
      {
        name: 'Waterfront and marina area',
        type: 'Restaurant / Café',
        description: 'Along the seafront walks between the port and Auditorio de Tenerife are modern cafés and restaurants with harbour views, serving seafood, tapas and international menus convenient for cruise passengers.',
      },
      {
        name: 'Rambla and García Sanabria surroundings',
        type: 'Café / Restaurant area',
        description: 'The area around Rambla de Santa Cruz and Parque García Sanabria offers local cafés and eateries frequented by residents, good for a more relaxed, non-touristy meal.',
      },
    ],
    
    insiderTips: [
      'For full-day excursions to Mount Teide or Loro Parque, booking through the cruise line or a reputable operator in advance helps ensure return in time for departure.',
      'Santa Cruz is generally safe, but as in other cities, keep valuables secure in busy shopping streets, markets and on buses.',
      'Teide cable car, popular beaches and major parks can be busy in peak season; early departures from the port give more time and better chances of shorter queues.',
      'Use the free shuttle to Plaza de España to save walking, then rely on buses or taxis for more distant sights; TITSA buses are reliable for beach and airport transfers.',
      'Trying to combine a full-day Teide or Loro Parque trip with in-depth exploration of Santa Cruz in a short call can feel rushed; consider choosing either a city-plus-beach day or a single big excursion.',
      'The north-east of Tenerife can be breezy and cooler than southern resorts; carrying a light layer is sensible even on sunny days, especially if heading up Mount Teide where temperatures drop significantly.',
    ],

    weather: {
      intro: 'Typical climate averages for Santa Cruz de Tenerife, rounded.',
      months: [
        { month: 'Jan', highC: 20, lowC: 15, rainMm: 40, sunDays: 20, seaTempC: 20 },
        { month: 'Feb', highC: 20, lowC: 15, rainMm: 35, sunDays: 20, seaTempC: 19 },
        { month: 'Mar', highC: 21, lowC: 16, rainMm: 25, sunDays: 23, seaTempC: 19 },
        { month: 'Apr', highC: 22, lowC: 16, rainMm: 15, sunDays: 24, seaTempC: 20 },
        { month: 'May', highC: 23, lowC: 17, rainMm: 10, sunDays: 26, seaTempC: 20 },
        { month: 'Jun', highC: 25, lowC: 19, rainMm: 5, sunDays: 27, seaTempC: 21 },
        { month: 'Jul', highC: 27, lowC: 21, rainMm: 2, sunDays: 30, seaTempC: 22 },
        { month: 'Aug', highC: 28, lowC: 22, rainMm: 3, sunDays: 30, seaTempC: 23 },
        { month: 'Sep', highC: 27, lowC: 21, rainMm: 10, sunDays: 27, seaTempC: 24 },
        { month: 'Oct', highC: 26, lowC: 20, rainMm: 25, sunDays: 25, seaTempC: 23 },
        { month: 'Nov', highC: 23, lowC: 18, rainMm: 40, sunDays: 22, seaTempC: 22 },
        { month: 'Dec', highC: 21, lowC: 16, rainMm: 45, sunDays: 20, seaTempC: 21 },
      ],
      bestTime: {
        overall: 'Santa Cruz is a genuine year-round destination, but November to March are particularly attractive for warm, sunny "winter sun" conditions compared with northern Europe.',
        hottest: 'Winter and school holiday periods see higher cruise and hotel traffic, giving a lively atmosphere but busier beaches and excursions.',
        quietest: 'Late spring and early autumn can feel slightly quieter with very pleasant temperatures, though some winter-sun focused services may be less busy.',
        recommendation: 'Any time between late autumn and early spring works well, with many UK-focused itineraries visiting between October and March for reliable mild weather and a clear contrast with home conditions.',
      },
    },

    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, the city centre is around 10 to 20 minutes\' walk from most berths, and there is usually a free shuttle to Plaza de España that shortens the distance.',
      },
      {
        question: 'How long do you need?',
        answer: 'A standard cruise day is enough to explore Santa Cruz, visit a nearby beach such as Las Teresitas or take a short excursion; full-day Teide or Loro Parque trips require most of the day.',
      },
      {
        question: 'Is English spoken?',
        answer: 'English is widely spoken in port, tourist information, many shops and restaurants, especially those used to cruise visitors.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'Walking covers the central city, with shuttle, buses and taxis used for beaches, Teide, Puerto de la Cruz or airport transfers.',
      },
      {
        question: 'Can you do Mount Teide on a cruise day?',
        answer: 'Yes, many ships offer full-day excursions to Teide National Park, but they are best for longer calls and will leave little time in Santa Cruz itself.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Santa Cruz de Tenerife is attractive year-round, but late autumn to early spring is particularly appealing for warm, dry winter-sun conditions.',
      cruiseTerminals: ['Muelle Sur (South Pier) cruise terminal', 'Muelle Norte / Muelle Ribera berths within Puerto de Santa Cruz de Tenerife'],
      nearbyAirport: 'Tenerife North – Ciudad de La Laguna Airport (TFN) about 10 to 15 kilometres away, and Tenerife South Airport (TFS) about 60 kilometres away',
      visaInfo: 'The Canary Islands are part of Spain and the Schengen Area; EU citizens and many other nationalities can visit visa-free for short stays, but travellers should check current Schengen and Spanish entry rules for their nationality and cruise itinerary before departure',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Santa Cruz de Tenerife Cruise Port Guide | Mount Teide & Beaches',
      description: 'Complete Santa Cruz de Tenerife cruise port guide. Visit Mount Teide, explore the city centre, relax on golden beaches, and discover year-round winter sun in the Canary Islands.',
      keywords: ['Santa Cruz de Tenerife cruise port', 'Tenerife shore excursions', 'Tenerife things to do', 'Mount Teide cruise', 'Canary Islands cruise', 'Tenerife cruise terminal'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-28',
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
    coordinates: { lat: 42.10, lon: 11.79 },
    tagline: 'Gateway to ancient Rome\'s Colosseum and forums',
    description: 'Civitavecchia is a working port town on the Tyrrhenian coast, handling massive cruise traffic as Rome\'s maritime hub with efficient terminals linked to the capital by frequent trains. Passengers find basic local amenities near the quays but focus on excursions to Rome\'s historic core, 1 to 1.5 hours away.',
    
    aboutPort: {
      overview: 'Civitavecchia\'s cruise facilities span multiple quays along the Cristoforo Colombo antemurale, managed by Roma Cruise Terminal with capacity for several large ships. Key sites include the Amerigo Vespucci Terminal (12B North, 10,000 m² for 4,500 passengers) and new Donato Bramante Terminal (Pier 12, opened 2025).',
      terminals: 'Terminals at Quays 10, 11, 12 (Bramante/12S), 12 North (Vespucci), 13 and 25S offer check-in, Wi-Fi, shops and shuttles to port gates.',
      shuttleServices: 'Free shuttles run from quays to terminals and Largo della Pace service centre near the train station.',
      walkability: 'Civitavecchia town centre lies 1 to 2 km from most berths (10 to 20-minute walk); Rome is 80 km distant.',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Italian primarily; English common at terminals and in Rome tourist areas',
      timezone: 'Central European Time (CET), Central European Summer Time (CEST) in summer',
      portType: 'Both, Europe\'s second-busiest cruise port by volume',
      walkable: true, // To Civitavecchia town (10 to 20 minutes), but Rome requires transport
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Shuttles transport passengers from ship to terminal exits, then local buses or taxis reach Civitavecchia station or town; trains provide the best link to Rome.',
      publicTransport: 'No metro in Civitavecchia, but frequent regional trains (every 30 minutes) run to Rome Termini or Ostiense. Trenitalia connects all major Rome stations to Civitavecchia (1 to 1.5 hours, book ahead).',
      taxis: 'Taxis cost around 160 euros from Fiumicino Airport. Fixed fare taxis to Rome available but expensive; convenient for groups.',
      walkingDistance: 'Walking suits port-town exploration (beach, fort); Rome needs full or half-day planning.',
      sightseeingBus: 'Hop-on hop-off buses operate in Rome from stations, not the port.',
      accessibility: 'Terminals have basic accessibility features; Rome sites vary in accessibility.',
    },
    
    transportConnections: {
      airport: {
        name: 'Rome Fiumicino (Leonardo da Vinci, FCO) or Ciampino (CIA)',
        distance: 'FCO about 80 km (50 to 80 minutes); CIA similar via train changes',
        options: 'Taxi: 120 to 160 euros direct to port (50 to 80 minutes). Train: FCO to Roma Termini (30 minutes), then to Civitavecchia (1 hour); total 1.5 to 2 hours. Bus: Limited direct services; train preferred.',
      },
      trains: {
        mainStation: 'Civitavecchia station, 1 km from port (walkable or short bus)',
        description: 'Frequent to Rome Termini/Ostiense (1 to 1.5 hours), plus Naples and northern Italy',
        localHubs: 'Rome Termini as primary interchange for high-speed and metro links',
      },
      cruiseLines: 'Major home-port operator for MSC, Costa, Royal Caribbean on Western Mediterranean routes; also transit calls',
    },
    
    mustSeeSights: [
      {
        title: 'Rome Colosseum and Roman Forum',
        description: 'Iconic Flavian Amphitheatre and ancient civic heart; book timed tickets to skip lines.',
        image: 'colosseum-roman-forum.webp',
        duration: '3 to 4 hours',
      },
      {
        title: 'Vatican Museums and St Peter\'s Basilica',
        description: 'Michelangelo\'s Sistine Chapel and Renaissance art in world\'s largest church.',
        image: 'vatican-museums.webp',
        duration: '3 to 4 hours',
      },
      {
        title: 'Pantheon and Piazza Navona',
        description: 'Perfectly preserved Roman temple and Bernini fountains in lively Baroque square.',
        image: 'pantheon-piazza-navona.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Trevi Fountain and Spanish Steps',
        description: 'Baroque masterpiece and elegant staircase; toss coin for return visit.',
        image: 'trevi-fountain-spanish-steps.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Civitavecchia Fort Michelangelo',
        description: '16th-century harbour fortress with sea views, near town beach.',
        image: 'fort-michelangelo.webp',
        duration: '1 hour',
      },
      {
        title: 'Rome Trastevere and food tour',
        description: 'Bohemian district with trattorias, ideal half-day alternative to major sites.',
        image: 'trastevere.webp',
        duration: '2 to 3 hours',
      },
    ],
    
    thingsToDo: [
      {
        title: 'Colosseum & Roman Forum',
        description: 'Iconic ancient Roman amphitheatre and the heart of the Roman Empire. Book skip-the-line tickets.',
        category: 'history',
        duration: '3-4 hours',
      },
      {
        title: 'Vatican City',
        description: 'St. Peter\'s Basilica, the Sistine Chapel, and Vatican Museums. Allow ample time.',
        category: 'culture',
        duration: '4-5 hours',
      },
      {
        title: 'Trevi Fountain & Spanish Steps',
        description: 'Toss a coin in the famous fountain and climb the iconic steps.',
        category: 'exploration',
        duration: '1-2 hours',
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
    
    nearestBeach: {
      name: 'Civitavecchia Beach',
      description: 'Local urban strand for swimming and walks, calmer than Rome options with fort backdrop.',
      gettingThere: '10 to 20-minute walk from port gates along seafront path.',
      image: 'beach.webp',
    },
    
    practicalInfo: {
      bestTimeToVisit: 'Spring/autumn balance mild weather and shorter Rome lines',
      cruiseTerminals: ['Amerigo Vespucci (12B)', 'Bramante (12S)', 'Quay 10', 'Quay 11', 'Quay 13', 'Quay 25S'],
      parking: 'Not applicable',
      nearbyAirport: 'Fiumicino (FCO), 80 km',
      visaInfo: 'Schengen Area (Italy); visa-free short stays for many, check rules',
    },
    
    foodAndDrink: [
      {
        name: 'Civitavecchia waterfront trattorias',
        type: 'Restaurant area',
        description: 'Seafood pasta and local fish near beach and fort',
      },
      {
        name: 'Rome Trastevere taverns',
        type: 'Trattoria zone',
        description: 'Authentic Roman cacio e pepe and artichokes',
      },
      {
        name: 'Port cafés at terminals',
        type: 'Café',
        description: 'Quick coffee and pastries pre-Rome train',
      },
      {
        name: 'Campo de\' Fiori market (Rome)',
        type: 'Market',
        description: 'Fresh produce, street food in historic square',
      },
    ],
    
    insiderTips: [
      'Booking tickets in advance: Essential for Colosseum/Vatican; use official sites or cruise excursions',
      'Safety and pickpockets: High risk in Rome crowds; use money belts',
      'Timing and queues: Trains fill fast, arrive early; Rome sites best pre-10am',
      'Transport advice: Validate train tickets; avoid unregulated taxis',
      'Things to avoid: Short calls rushing full Rome, opt for Civitavecchia beach or half-day highlights',
      'Dress code: Shoulders/knees covered for Vatican/Colosseum',
    ],
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'To Civitavecchia yes; Rome needs 1+ hour train.',
      },
      {
        question: 'How long do you need?',
        answer: 'Full day minimum for Rome highlights.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Limited in Civitavecchia, fluent in Rome tourist zones.',
      },
      {
        question: 'What\'s the best way to get around?',
        answer: 'Train to Rome, then metro/walking.',
      },
      {
        question: 'Can you do Rome on a cruise day?',
        answer: 'Yes, but prioritise Colosseum/Vatican or food walk.',
      },
    ],
    
    weather: {
      intro: 'Civitavecchia has a Mediterranean climate with hot, dry summers and mild, wet winters. Spring and autumn offer the best balance of weather and manageable crowds for visiting Rome.',
      months: [
        { month: 'Jan', highC: 13, lowC: 5, rainMm: 100, sunDays: 12, seaTempC: 14 },
        { month: 'Feb', highC: 13, lowC: 5, rainMm: 90, sunDays: 13, seaTempC: 14 },
        { month: 'Mar', highC: 15, lowC: 7, rainMm: 80, sunDays: 16, seaTempC: 14 },
        { month: 'Apr', highC: 17, lowC: 9, rainMm: 70, sunDays: 18, seaTempC: 15 },
        { month: 'May', highC: 21, lowC: 13, rainMm: 50, sunDays: 22, seaTempC: 17 },
        { month: 'Jun', highC: 25, lowC: 16, rainMm: 30, sunDays: 26, seaTempC: 21 },
        { month: 'Jul', highC: 28, lowC: 19, rainMm: 20, sunDays: 29, seaTempC: 23 },
        { month: 'Aug', highC: 29, lowC: 19, rainMm: 25, sunDays: 28, seaTempC: 24 },
        { month: 'Sep', highC: 26, lowC: 17, rainMm: 60, sunDays: 24, seaTempC: 23 },
        { month: 'Oct', highC: 22, lowC: 13, rainMm: 90, sunDays: 20, seaTempC: 21 },
        { month: 'Nov', highC: 17, lowC: 9, rainMm: 110, sunDays: 15, seaTempC: 18 },
        { month: 'Dec', highC: 14, lowC: 6, rainMm: 100, sunDays: 13, seaTempC: 15 },
      ],
      bestTime: {
        overall: 'Spring (April-June) and autumn (September-October) avoid summer heat and crowds',
        hottest: 'July-August warm but packed with queues',
        quietest: 'Winter mild for sightseeing, fewer tourists',
        recommendation: 'May or October for comfortable Rome walking',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises', 'italian-cruises'],
    
    meta: {
      title: 'Civitavecchia (Rome) Cruise Port Guide | Visiting Rome from Your Cruise',
      description: 'Complete Civitavecchia cruise port guide. How to visit Rome\'s Colosseum, Vatican, and top attractions from your Mediterranean cruise ship.',
      keywords: ['Civitavecchia cruise port', 'Rome cruise port', 'Rome shore excursions', 'Civitavecchia to Rome', 'Civitavecchia cruise terminal', 'Rome from cruise ship'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  // ============================================================================
  // ATLANTIC COAST - NEW PORTS
  // ============================================================================
  
  {
    id: 'vigo',
    slug: 'vigo',
    name: 'Vigo',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 42.24, lon: -8.72 },
    tagline: 'Gateway to Galicia\'s coast and seafood',
    description: 'Vigo sits on Spain\'s north-west Atlantic coast in Galicia, with a deep natural ria and busy harbour that welcomes both cruise ships and fishing fleets. Passengers step off almost directly into the city centre, with an old town, waterfront promenades and viewpoints all within easy reach on foot.',
    
    aboutPort: {
      overview: 'Vigo Cruise Port lies on the Ría de Vigo, a deep fjord-like estuary described as one of the finest natural harbours in the world. The wider commercial port area stretches over more than 20 kilometres of waterfront with several distinct zones, but cruise ships use a central, city-side berth.',
      terminals: 'Cruise vessels dock at Muelle de Transatlánticos (Transatlantic Quay), directly in front of the city and beside the Estación Marítima (cruise terminal) that offers basic services such as shops, café and Wi-Fi.',
      shuttle: 'Shuttle buses may be provided by cruise lines for specific excursions, particularly to Samil Beach or out-of-town attractions, though many passengers simply walk from the ship into the city without needing a shuttle.',
      walkability: 'The walk to the central streets and Casco Vello (old town) is roughly 600 to 800 metres, usually 10 to 15 minutes at an easy pace.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish & Galician',
      timezone: 'CET/CEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Vigo–Peinador Airport (VGO)',
        distance: 'Approximately 10 to 12 kilometres east of the waterfront, usually 20 to 25 minutes by road depending on traffic',
        options: 'Taxi readily available at both the port and airport, with a road journey of roughly 20 to 25 minutes in normal conditions. Local buses connect the airport with central Vigo; with walk or short taxi from central stops to the port, the total journey can take around 35 to 50 minutes. There is no direct rail link from the airport; passengers would typically combine bus or taxi to reach the main railway station.',
      },
      trains: {
        mainStation: 'Vigo–Guixar and Vigo–Urzáiz are the key stations, with Vigo–Urzáiz used for many high-speed services',
        description: 'Services link Vigo with Santiago de Compostela, A Coruña, Ourense and other Galician cities, plus longer-distance and international routes towards Madrid and northern Portugal (via nearby connections)',
        localHubs: 'Santiago de Compostela and A Coruña act as regional hubs, while connections in Portugal (such as Porto) are accessible via regional cross-border services',
      },
      cruiseLines: 'Major cruise lines that regularly include Vigo as a port of call on Atlantic, Iberian Peninsula, Canary Islands and repositioning itineraries include Royal Caribbean, MSC Cruises, Norwegian Cruise Line, P&O Cruises, Cunard, Celebrity Cruises and others, particularly on sailings in and out of the UK',
    },
    
    gettingAround: {
      fromPort: 'From ship to city, most passengers walk: you exit the terminal, cross the seafront road and are effectively in central Vigo, with the old town and main shopping streets rising on the hill just behind. For those with mobility issues, taxis are available immediately outside and some ships organise limited shuttle services into town or to key viewpoints.',
      publicTransport: 'Public transport consists mainly of urban buses run by Vitrasa, with several lines passing near the port; the C1 circular bus is frequently recommended as it loops through much of the city from a stop across from the tourist office near the terminal. There is no metro or tram system, but intercity and regional trains depart from Vigo\'s main stations a short taxi or bus ride away.',
      taxis: 'Taxis are plentiful at the pier on cruise days, operating on metered fares for trips within the city and to the airport or beaches.',
      walkingDistance: 'For most central sights, walking distances are modest: Casco Vello and the main shopping streets are within about 10 minutes, while the climb to Monte do Castro viewpoint may take around 20 to 30 minutes uphill.',
      sightseeingBus: 'A hop-on hop-off sightseeing bus operates from close to the pier head on some days, offering a loop that covers central Vigo and viewpoints; however, services can be infrequent so schedules should be checked on arrival.',
    },
    
    mustSeeSights: [
      {
        title: 'Casco Vello (Old Town)',
        description: 'Vigo\'s Casco Vello is the historic quarter that climbs the hill just behind the port, with narrow lanes, old squares and traditional stone buildings. It is ideal for wandering on foot, with cafés, small shops and viewpoints opening towards the harbour.',
        image: 'casco-vello.webp',
        duration: '1 to 2 hours',
      },
      {
        title: 'Monte do Castro',
        description: 'Monte do Castro is a hill-top park and fortress above the city, providing panoramic views over the ria, port and Cíes Islands. Visitors can explore gardens, historic fortifications and archaeological remains of ancient settlements along well-marked paths.',
        image: 'monte-do-castro.webp',
        duration: '1.5 to 2.5 hours',
      },
      {
        title: 'Cíes Islands (Parque Nacional Marítimo-Terrestre)',
        description: 'The Cíes Islands sit at the mouth of the Ría de Vigo and form part of the Atlantic Islands of Galicia National Park, known for white sandy beaches and clear waters. Access is by ferry from Vigo, and capacity is regulated, so advance booking is required for day trips when time in port allows.',
        image: 'cies-islands.webp',
        duration: '4 to 6 hours (only suitable on longer calls)',
      },
      {
        title: 'Praza da Constitución and central shopping streets',
        description: 'Praza da Constitución is one of Vigo\'s most atmospheric squares, surrounded by historic arcades and close to main shopping streets such as Príncipe. It offers a mix of traditional character and modern stores, making it an easy stop during a walking circuit from the port.',
        image: 'praza-constituicion.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Mercado da Pedra and waterfront promenade',
        description: 'The area around Mercado da Pedra and the waterfront promenade below the old town features seafood eateries, stalls and sea views close to the cruise pier. Passengers often combine a stroll here with tasting local shellfish and Albariño wine in nearby bars and restaurants.',
        image: 'mercado-da-pedra.webp',
        duration: '1 to 2 hours',
      },
      {
        title: 'Day trip to Santiago de Compostela (for longer calls)',
        description: 'Santiago de Compostela, an important pilgrimage city and the endpoint of the Camino de Santiago, lies roughly an hour away by road or rail from Vigo and is a popular organised excursion. The historic centre and cathedral can be explored on a guided tour when schedules provide sufficient time ashore.',
        image: 'santiago-compostela.webp',
        duration: '4 to 5 hours, plus travel time',
      },
    ],

    thingsToDo: [
      {
        title: 'Explore Casco Vello',
        description: 'Wander through the historic old town with its narrow lanes, traditional architecture and charming squares.',
        category: 'culture',
        duration: '1 to 2 hours',
      },
      {
        title: 'Visit Monte do Castro',
        description: 'Climb to the hilltop park for panoramic views over the ria, port and surrounding islands.',
        category: 'nature',
        duration: '1.5 to 2.5 hours',
      },
      {
        title: 'Cíes Islands day trip',
        description: 'Take a ferry to the pristine Cíes Islands with white sandy beaches and clear waters (advance booking required).',
        category: 'nature',
        duration: '4 to 6 hours',
      },
      {
        title: 'Waterfront and seafood',
        description: 'Stroll along the waterfront promenade and enjoy fresh seafood and Albariño wine in the Mercado da Pedra area.',
        category: 'food',
        duration: '1 to 2 hours',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Santiago de Compostela',
        description: 'Visit the famous pilgrimage city and cathedral, approximately one hour away by coach.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended for longer calls',
      },
      {
        title: 'Cíes Islands',
        description: 'Ferry trip to the pristine islands with beaches and hiking trails. Advance booking essential.',
        duration: 'Half to full day',
        bookWith: 'Independent or cruise line (book early)',
      },
    ],
    
    nearestBeach: {
      name: 'Samil Beach (Praia de Samil)',
      description: 'Samil is Vigo\'s best-known urban beach, a long crescent of sand with promenade, pools, cafés and views across the ria towards the Cíes Islands. It is popular with locals and visitors alike in summer, offering a relaxed seaside atmosphere within the city limits.',
      distance: 'From the cruise port, Samil Beach is around 7 to 8 kilometres away; by taxi it typically takes 15 to 20 minutes, while local buses from central stops near the port can reach the beach in roughly 25 to 35 minutes depending on route and traffic',
    },
    
    foodAndDrink: [
      {
        name: 'O Berbés and nearby seafood restaurants',
        type: 'Restaurant area',
        description: 'The historic fishermen\'s quarter of O Berbés, a short walk from the port, is surrounded by seafood restaurants known for freshly landed fish and shellfish from Vigo\'s huge fishing fleet.',
      },
      {
        name: 'Mercado da Pedra vicinity',
        type: 'Tapas Bar / Restaurant cluster',
        description: 'Streets around Mercado da Pedra host numerous bars serving tapas, oysters and Galician specialities, making it a convenient place for cruise visitors to sample local flavours close to the waterfront.',
      },
      {
        name: 'Central cafés near Praza da Constitución',
        type: 'Café',
        description: 'The central squares and adjoining streets contain many cafés that are popular for coffee, pastries and light snacks during a day in port, ideal for a break during a walking tour.',
      },
      {
        name: 'Modern eateries on the waterfront promenade',
        type: 'Restaurant / Café',
        description: 'The redeveloped waterfront around the terminal and marina includes contemporary bars and restaurants with outdoor seating, combining harbour views with Galician cuisine and international dishes.',
      },
    ],
    
    insiderTips: [
      'Ferries and day trips to the Cíes Islands operate with strict capacity limits, so tickets should be booked ahead if your call is long enough to visit.',
      'Central Vigo is generally considered safe, but as in most busy port cities, passengers should keep an eye on bags and valuables in crowded areas and transport hubs.',
      'Lines for popular excursions and for ferries to islands can build up in peak summer, so arriving early in the day or joining a pre-booked tour can save time.',
      'The city centre is compact, so walking is often the fastest option; taxis are best reserved for the airport, Samil Beach or steep uphill journeys if mobility is limited.',
      'Trying to fit both a full Santiago de Compostela excursion and in-depth exploration of Vigo into a short call may feel rushed, so it is worth choosing either the city itself or a single major excursion.',
      'Streets in the old town are often cobbled and the climb to viewpoints can be steep, so comfortable walking shoes are recommended.',
      'Atlantic weather can change quickly; carrying a light waterproof layer, even in warmer months, is advisable.',
    ],
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, the cruise quay is directly beside the city, with the old town about 10 to 15 minutes on foot from the terminal.',
      },
      {
        question: 'How long do you need?',
        answer: 'A full cruise day is enough to explore the old town, viewpoints and waterfront at a relaxed pace; shorter calls still allow a compact walking tour.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Spanish and Galician are primary languages, but English is commonly spoken in the port, tourist office, many restaurants and by tour providers.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'For central Vigo, walking is usually best; taxis or buses are useful only for the airport, beaches or out-of-town excursions.',
      },
      {
        question: 'Can you do Santiago de Compostela on a cruise day?',
        answer: 'Yes, many ships offer excursions to Santiago, typically about an hour away by coach each way, though it suits longer port calls better than short stops.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late spring and early autumn give the most comfortable mix of mild temperatures, manageable crowds and reasonable chances of dry, clear days',
      cruiseTerminals: ['Estación Marítima de Vigo at Muelle de Transatlánticos (Transatlantic Quay)'],
      nearbyAirport: 'Vigo–Peinador Airport (VGO), roughly 10 to 12 kilometres from the cruise port',
      visaInfo: 'Spain is part of the Schengen Area; EU and many other nationals can enter visa-free for short tourist stays, but passengers should check current Schengen and national entry rules for their nationality and cruise itinerary before travelling',
    },

    weather: {
      intro: 'Values are typical climate averages rounded; actual conditions vary day to day.',
      months: [
        { month: 'Jan', highC: 13, lowC: 6, rainMm: 170, rainyDays: 16, sunDays: 9, seaTempC: 13, uv: 'Low', wind: 'Moderate to strong' },
        { month: 'Feb', highC: 14, lowC: 7, rainMm: 140, rainyDays: 13, sunDays: 10, seaTempC: 13, uv: 'Low to moderate', wind: 'Moderate' },
        { month: 'Mar', highC: 16, lowC: 8, rainMm: 120, rainyDays: 12, sunDays: 12, seaTempC: 13, uv: 'Moderate', wind: 'Moderate' },
        { month: 'Apr', highC: 17, lowC: 9, rainMm: 110, rainyDays: 11, sunDays: 13, seaTempC: 14, uv: 'Moderate', wind: 'Moderate' },
        { month: 'May', highC: 19, lowC: 11, rainMm: 90, rainyDays: 9, sunDays: 15, seaTempC: 15, uv: 'Moderate to high', wind: 'Light to moderate' },
        { month: 'Jun', highC: 22, lowC: 13, rainMm: 60, rainyDays: 6, sunDays: 18, seaTempC: 17, uv: 'High', wind: 'Light' },
        { month: 'Jul', highC: 24, lowC: 15, rainMm: 40, rainyDays: 4, sunDays: 22, seaTempC: 18, uv: 'Very high', wind: 'Light' },
        { month: 'Aug', highC: 25, lowC: 15, rainMm: 50, rainyDays: 5, sunDays: 21, seaTempC: 19, uv: 'Very high', wind: 'Light' },
        { month: 'Sep', highC: 23, lowC: 14, rainMm: 80, rainyDays: 8, sunDays: 17, seaTempC: 19, uv: 'High', wind: 'Light to moderate' },
        { month: 'Oct', highC: 20, lowC: 12, rainMm: 130, rainyDays: 12, sunDays: 13, seaTempC: 17, uv: 'Moderate', wind: 'Moderate' },
        { month: 'Nov', highC: 16, lowC: 9, rainMm: 170, rainyDays: 15, sunDays: 10, seaTempC: 15, uv: 'Low to moderate', wind: 'Moderate to strong' },
        { month: 'Dec', highC: 13, lowC: 7, rainMm: 190, rainyDays: 17, sunDays: 9, seaTempC: 14, uv: 'Low', wind: 'Moderate to strong' },
      ],
      bestTime: {
        overall: 'Late spring and early autumn (May, June, September) often provide comfortable temperatures, comparatively lower rainfall than winter and good conditions for walking and coastal views',
        hottest: 'July and August bring the warmest weather and best beach conditions, but also the highest visitor numbers and more crowded excursions and city streets',
        quietest: 'Late autumn to early spring is quieter and can feel more local, though rain is more frequent and sea and air temperatures are cooler',
        recommendation: 'For a balanced experience with pleasant walking weather, moderate crowds and good chances of dry days, first-time visitors often find May, June or September ideal',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Vigo Cruise Port Guide | Gateway to Galicia\'s Coast',
      description: 'Complete Vigo cruise port guide. Explore Casco Vello, visit Monte do Castro, discover the Cíes Islands, and enjoy Galician seafood in this walkable Atlantic port.',
      keywords: ['Vigo cruise port', 'Vigo Spain', 'Galicia cruise port', 'Atlantic coast cruises', 'Vigo shore excursions', 'Cíes Islands'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  {
    id: 'cadiz',
    slug: 'cadiz',
    name: 'Cádiz',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 36.53, lon: -6.29 },
    tagline: 'Walk-off access to Andalusian history and beaches',
    description: 'Cádiz sits on a narrow peninsula on Spain\'s Atlantic coast, with the walled old town almost surrounded by water and the cruise quay integrated into the city itself. Cruise passengers disembark just outside the historic centre, making it easy to see key sights, plazas and seafront promenades in a single day.',
    
    aboutPort: {
      overview: 'Cádiz Cruise Port is part of the Port of the Bay of Cádiz, a sizeable commercial, ferry and cruise harbour on the edge of the historic city. The usual berths for cruise ships are directly integrated into the urban centre, so the port and old town effectively blend together.',
      terminals: 'The main cruise facilities are at Muelle Alfonso XIII (Alfonso XIII pier), where the principal cruise terminal provides check-in desks, disembarkation areas, tourist information, luggage storage, free Wi-Fi, and shops. A second dedicated cruise terminal is located at Muelle Ciudad (Ciudad Pier), also giving immediate pedestrian access into the city via Paseo de Canalejas and Plaza de San Juan de Dios.',
      shuttle: 'Shuttle services are generally not required into the old town because of the short distance, but tour coaches and excursion buses park immediately next to the terminal for trips further afield such as Seville or Jerez.',
      walkability: 'The walk from the cruise terminal to the heart of the historic area around Plaza de San Juan de Dios and the cathedral is typically 5 to 10 minutes on level pavements.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish is the main language; English is commonly understood in tourist, port and service areas',
      timezone: 'CET/CEST',
      portType: 'Primarily Port of Call with some home-porting and turnaround operations',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Jerez Airport (Aeropuerto de Jerez), code XRY',
        distance: 'Roughly 45 kilometres north-east of Cádiz, typically 35 to 45 minutes by road depending on traffic',
        options: 'Taxi: Direct road transfer between port and Jerez Airport normally takes around 35 to 45 minutes. Train: Regional trains connect Cádiz with Jerez de la Frontera; from Jerez rail station there is a short dedicated rail link or onward transfer to the airport, with total journey time usually around 60 to 75 minutes including changes. Bus: Interurban buses run between Cádiz and Jerez area, but for most cruise passengers a train or taxi combination is more straightforward given time limits.',
      },
      trains: {
        mainStation: 'Cádiz railway station (Estación de Cádiz), located a short walk or brief taxi ride from the cruise quays along the same waterfront',
        description: 'Services run to Jerez de la Frontera, El Puerto de Santa María, San Fernando and onwards to Seville and other Andalusian destinations, with some longer-distance connections into the Spanish rail network',
        localHubs: 'Seville functions as the principal hub for high-speed AVE and long-distance trains, while Jerez operates as a regional node for services in western Andalusia',
      },
      cruiseLines: ['P&O Cruises', 'Cunard', 'Royal Caribbean', 'Norwegian Cruise Line', 'MSC Cruises', 'Costa Cruises', 'TUI Cruises'],
    },
    
    gettingAround: {
      fromPort: 'Most cruise passengers simply walk from ship to city, as the terminal exits almost directly onto Avenida del Puerto and Paseo de Canalejas opposite the main square. The majority of key attractions, including the cathedral, Roman theatre, seafront promenades and parks, lie within a compact, walkable radius.',
      publicTransport: 'Cádiz does not have a metro, but there is a local bus network and a coastal suburban rail service that link the peninsula with nearby towns and the newer parts of the city on the mainland. Bus stops and the catamaran passenger terminal (for services to El Puerto de Santa María and Rota) are within easy walking distance of the cruise quay.',
      taxis: 'Taxis are available directly outside the terminal and at nearby taxi ranks, offering fixed or metered fares for city tours, beaches such as Playa de la Victoria, Jerez de la Frontera or the railway station.',
      walkingDistance: 'For healthy travellers, most central distances are under 20 minutes on foot, although there are occasional gentle slopes and cobbled sections in the older streets.',
      sightseeingBus: 'A hop-on hop-off sightseeing bus operates from close to the cruise area, running a loop past major sights such as the cathedral, seafront, beaches and Parque Genovés; it is particularly useful in hot weather or for those who prefer not to walk the full route. Tickets can usually be bought on the day at stands near the pier subject to availability.',
    },
    
    mustSeeSights: [
      {
        title: 'Cádiz Cathedral and Torre de Poniente',
        description: 'The Baroque-Neoclassical Cádiz Cathedral dominates the skyline with its golden dome and towers overlooking the sea. Visitors can tour the interior and, where opening times allow, climb the Torre de Poniente for panoramic views across the city and bay.',
        image: 'cadiz-cathedral.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Roman Theatre (Teatro Romano)',
        description: 'Just behind the waterfront lies the excavated Roman Theatre of Cádiz, one of the largest and oldest in the Iberian Peninsula, partially built into the ancient city walls. A small interpretation centre explains its history and offers views over the remaining structure.',
        image: 'roman-theatre.webp',
        duration: '45 minutes to 1 hour',
      },
      {
        title: 'Parque Genovés and seafront promenade',
        description: 'Parque Genovés is a landscaped park on the seaward edge of the old town, featuring exotic trees, manicured paths and viewpoints towards the Atlantic. It connects with coastal promenades that allow a scenic walk along the outer ramparts and seafront.',
        image: 'parque-genoves.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Torre Tavira and camera obscura',
        description: 'Torre Tavira is one of Cádiz\'s historic watchtowers, once used to monitor merchant ships entering the bay. Inside, a camera obscura shows real-time images of the city on a viewing table, and the rooftop terrace offers some of the best urban views.',
        image: 'torre-tavira.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Mercado Central de Abastos',
        description: 'The Central Market is a lively local food market housed within a historic structure, with stalls selling fresh fish, seafood, fruit, vegetables and tapas. It is popular with both residents and visitors and gives a vivid sense of everyday life in Cádiz.',
        image: 'mercado-central.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Seafront castles: Castillo de Santa Catalina and Castillo de San Sebastián',
        description: 'On the outer edges of the peninsula, these historic fortifications guard the approaches to the bay and provide dramatic views of the coastline and city. Reached via causeways and promenades, they are ideal for photography and a breezy coastal walk from the centre.',
        image: 'castillos-cadiz.webp',
        duration: '1.5 to 2 hours (combined)',
      },
    ],

    thingsToDo: [
      {
        title: 'Cádiz Cathedral and Torre de Poniente',
        description: 'Visit the Baroque-Neoclassical cathedral and climb the tower for panoramic city views.',
        category: 'culture',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Roman Theatre',
        description: 'Explore one of the largest and oldest Roman theatres in the Iberian Peninsula.',
        category: 'history',
        duration: '45 minutes to 1 hour',
      },
      {
        title: 'Parque Genovés and seafront walk',
        description: 'Stroll through the landscaped park and along the coastal promenades with Atlantic views.',
        category: 'nature',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Torre Tavira camera obscura',
        description: 'Experience the camera obscura and enjoy rooftop views from this historic watchtower.',
        category: 'culture',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Mercado Central de Abastos',
        description: 'Browse the lively food market and sample fresh seafood and local tapas.',
        category: 'food',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Seafront castles',
        description: 'Visit Castillo de Santa Catalina and Castillo de San Sebastián for coastal views and history.',
        category: 'history',
        duration: '1.5 to 2 hours',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Seville day trip',
        description: 'Full-day coach excursion to Seville (around 1.5 to 2 hours each way by road), best suited to longer calls rather than very short port times.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended',
      },
      {
        title: 'Jerez de la Frontera',
        description: 'Visit the sherry capital with bodega tours and flamenco shows.',
        duration: 'Half day',
        bookWith: 'Either',
      },
    ],

    nearestBeach: {
      name: 'Playa de la Victoria (principal urban beach) with Playa de la Caleta being the closest within the old town',
      description: 'Playa de la Victoria is a long, sandy Atlantic beach backed by a modern promenade and facilities, popular with locals and visitors for swimming and sunbathing. Playa de la Caleta, nestled between two castles at the tip of the old town, is smaller but very atmospheric, with sheltered waters and sunset views.',
      gettingThere: 'From the port, Playa de la Caleta is about 20 to 25 minutes on foot through the old town, or a short taxi ride. Playa de la Victoria lies further along the oceanfront, typically 10 to 15 minutes by taxi or around 25 to 35 minutes by local bus from stops near the cruise terminal.',
      image: 'beach.webp',
    },
    
    foodAndDrink: [
      {
        name: 'Tapas bars around Plaza de San Juan de Dios',
        type: 'Tapas Bar / Restaurant area',
        description: 'The square directly opposite the port and neighbouring streets host numerous tapas bars serving Andalusian dishes, fresh seafood and casual outdoor dining, ideal for a quick taste of local cuisine near the ship.',
      },
      {
        name: 'Mercado Central food stalls',
        type: 'Market / Tapas',
        description: 'Inside and around Mercado Central, informal stalls and counters offer tapas, fried fish and small plates, creating a lively environment suited to grazing on local specialities.',
      },
      {
        name: 'Seafront chiringuitos on Playa de la Victoria',
        type: 'Beach Restaurant / Chiringuito',
        description: 'Along Playa de la Victoria\'s promenade, beach bars and restaurants are known for fried fish, grilled seafood and relaxed sea views, popular for lunchtime stops on warm days.',
      },
      {
        name: 'Cafés and bakeries in the old town',
        type: 'Café',
        description: 'Scattered through the narrow streets and plazas are traditional cafés and bakeries where visitors can enjoy coffee, pastries and light snacks between sightseeing stops.',
      },
    ],
    
    insiderTips: [
      'Booking tickets in advance: For attractions with limited capacity such as Torre Tavira and some guided cathedral tower visits, advance reservations or early arrival help avoid waits.',
      'Safety and pickpockets: The historic centre is generally safe, but as in most popular cities, passengers should keep valuables secure in busy plazas, markets and on crowded buses.',
      'Timing and queues: Mid-morning and late afternoon can be busiest at headline sights; starting early or heading first to the furthest attraction can help smooth the day.',
      'Transport advice: Given how compact Cádiz is, walking covers most needs, with taxis or the hop-on hop-off bus reserved for reaching beaches or for those sensitive to heat.',
      'Things to avoid: Trying to combine a full-day Seville excursion with independent exploration of Cádiz during a short call can feel rushed; it is usually better to choose one focus.',
      'Heat and sun: In high summer, midday heat can be strong; planning indoor visits or park breaks around the hottest hours and carrying water is sensible.',
    ],
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, the cruise berths are about 5 to 10 minutes\' walk from the old town and main squares on generally flat terrain.',
      },
      {
        question: 'How long do you need?',
        answer: 'A standard cruise day allows enough time to see the cathedral, Roman Theatre, parks and seafront on foot; even a shorter stop can accommodate a compact city circuit.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Spanish is dominant, but English is widely used in port facilities, tourist venues and many cafés and restaurants.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'Walking suits most passengers because the historic centre is compact; taxis, local buses or hop-on hop-off services are mainly useful for beaches or specific tours.',
      },
      {
        question: 'Can you do Seville on a cruise day?',
        answer: 'Yes, many ships offer full-day coach excursions to Seville (around 1.5 to 2 hours each way by road), best suited to longer calls rather than very short port times.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late spring and early autumn provide the best balance of warm temperatures, manageable crowds and comfortable walking conditions',
      cruiseTerminals: ['Cruise terminal at Muelle Alfonso XIII', 'Cruise terminal at Muelle Ciudad (Ciudad Pier)'],
      nearbyAirport: 'Jerez Airport (XRY), approximately 45 kilometres from the port of Cádiz',
      visaInfo: 'Spain forms part of the Schengen Area, so EU citizens and many other nationalities enjoy visa-free short stays, but passengers should verify current Schengen and Spanish entry rules for their own nationality and cruise itinerary before travel',
    },

    weather: {
      intro: 'Values are typical climate averages for Cádiz, rounded; actual conditions vary.',
      months: [
        { month: 'Jan', highC: 16, lowC: 8, rainMm: 90, sunDays: 15, seaTempC: 15 },
        { month: 'Feb', highC: 17, lowC: 9, rainMm: 70, sunDays: 16, seaTempC: 15 },
        { month: 'Mar', highC: 19, lowC: 10, rainMm: 60, sunDays: 18, seaTempC: 15 },
        { month: 'Apr', highC: 20, lowC: 12, rainMm: 45, sunDays: 20, seaTempC: 16 },
        { month: 'May', highC: 23, lowC: 14, rainMm: 25, sunDays: 24, seaTempC: 18 },
        { month: 'Jun', highC: 26, lowC: 18, rainMm: 10, sunDays: 27, seaTempC: 20 },
        { month: 'Jul', highC: 28, lowC: 20, rainMm: 1, sunDays: 30, seaTempC: 22 },
        { month: 'Aug', highC: 29, lowC: 21, rainMm: 2, sunDays: 29, seaTempC: 23 },
        { month: 'Sep', highC: 27, lowC: 19, rainMm: 20, sunDays: 25, seaTempC: 23 },
        { month: 'Oct', highC: 23, lowC: 16, rainMm: 60, sunDays: 21, seaTempC: 21 },
        { month: 'Nov', highC: 19, lowC: 12, rainMm: 80, sunDays: 17, seaTempC: 18 },
        { month: 'Dec', highC: 16, lowC: 9, rainMm: 95, sunDays: 15, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'May, June, September and early October often combine warm but not extreme temperatures, relatively low rainfall and pleasant sea conditions',
        hottest: 'July and August bring very warm weather, busy beaches and a lively atmosphere, but also higher crowds and stronger sun in the middle of the day',
        quietest: 'Winter and early spring are milder and less crowded, but some beach facilities are quieter and there is a higher chance of rain',
        recommendation: 'Late spring or early autumn is usually ideal for a first visit, enabling comfortable walking, sightseeing and potential beach time without the most intense heat',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises'],
    
    meta: {
      title: 'Cádiz Cruise Port Guide | Andalusian History & Beaches',
      description: 'Complete Cádiz cruise port guide. Walk-off access to historic sights, beaches, and easy day trips to Seville from this Atlantic port.',
      keywords: ['Cádiz cruise port', 'Cadiz Spain', 'Seville excursions', 'Atlantic coast', 'Cádiz cruise terminal', 'Andalusia cruise'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-28',
  },

  // Gibraltar
  {
    id: 'gibraltar',
    slug: 'gibraltar',
    name: 'Gibraltar',
    country: 'United Kingdom (British Overseas Territory)',
    region: 'mediterranean',
    coordinates: { lat: 36.14, lon: -5.35 },
    tagline: 'Ape-filled Rock with British pubs and Spanish views',
    description: 'Gibraltar is a compact British Overseas Territory at the Mediterranean\'s entrance, where cruise ships dock alongside a modern terminal just a 15-minute walk from the lively Main Street and city centre. Passengers enjoy duty-free shopping, red phone boxes and easy access to the iconic Rock, often combining town exploration with cable car rides to see the famous apes.',
    
    aboutPort: {
      overview: 'Gibraltar Cruise Terminal provides a secure, efficient facility with 940 metres of quay accommodating up to four medium ships or two large ones, equipped with phones, cafeteria, shops and tourist information. It sits within the port\'s secure zone near the airport runway, with constant patrols ensuring safety.',
      terminals: 'The single terminal handles all cruise traffic, offering VAT-free provisioning, bunkering and crew changes; a new expanded facility with solar panels and event spaces is planned.',
      shuttleServices: 'Mini-van shuttles and taxis operate from the quay for those avoiding the walk.',
      walkability: 'The 1.6 km stroll to downtown takes 15 minutes on flat ground past marinas and airport views.',
    },
    
    quickFacts: {
      currency: 'Gibraltar Pound (GIP) and British Pound (GBP) both accepted',
      language: 'English is official; Spanish widely understood',
      timezone: 'CET/CEST',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Gibraltar International Airport (GIB)',
        distance: 'Less than 1 kilometre, about 6 minutes by taxi or 15-minute walk across the runway crossing',
        options: 'Taxi: Quick 5 to 10-minute ride from terminal. Bus: Local buses connect port area to airport terminal. Walking possible via secure pedestrian path.',
      },
      trains: {
        mainStation: 'No railway service',
        description: 'No railway service; buses and taxis suffice for local needs.',
        localHubs: 'N/A',
      },
      cruiseLines: ['Celebrity', 'Oceania', 'SilverSea', 'Marella', 'AIDA', 'Ambition'],
    },
    
    gettingAround: {
      fromPort: 'Passengers walk from the terminal along the quay to Main Street, Gibraltar\'s bustling commercial heart with pubs, shops and cafés. The compact layout suits foot exploration of town sights.',
      publicTransport: 'Public buses run limited routes around the Rock and to Europa Point; no metro or trams exist.',
      taxis: 'Taxis wait at the terminal for short hops to cable car base or viewpoints, metered and plentiful.',
      walkingDistance: 'Most attractions lie within 20 to 30 minutes on foot from the port, though the Rock\'s upper reaches require cable car or taxi.',
      sightseeingBus: 'Hop-on hop-off buses depart near the terminal, covering Main Street, Rock Nature Reserve and southern tip efficiently for overview seekers.',
    },
    
    mustSeeSights: [
      {
        title: 'Rock of Gibraltar and Barbary Apes',
        description: 'The Rock\'s nature reserve houses wild Barbary macaques, military tunnels and WWII relics with stunning strait views. Cable car provides access; apes roam freely near the summit.',
        image: 'rock-gibraltar-apes.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Main Street and Casemates Square',
        description: 'Main Street offers duty-free shops, pubs and red phone boxes; Casemates hosts market stalls and cafés. Perfect for British-Spanish fusion shopping and eats.',
        image: 'main-street-casemates.webp',
        duration: '1 to 2 hours',
      },
      {
        title: 'Europa Point Lighthouse',
        description: 'Southernmost tip overlooks Africa and straits shipping, with Trinity Lighthouse and WWII batteries. Skywalk platform adds thrills.',
        image: 'europa-point-lighthouse.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Cable Car to O\'Hara\'s Battery',
        description: 'Cable car ascends the Rock\'s eastern face to viewpoints and ape territory, with return options. Panoramic bays and coastlines.',
        image: 'cable-car-ohara-battery.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Great Siege Tunnels',
        description: 'Hand-dug 18th-century tunnels through the Rock used in sieges, now a museum with audio guides. Claustrophobic history lesson.',
        image: 'great-siege-tunnels.webp',
        duration: '1 hour',
      },
      {
        title: '100 Ton Gun and Skywalk',
        description: 'Massive Victorian naval gun atop the Rock with glass-floor skywalk over cliffs. Dramatic engineering views.',
        image: '100-ton-gun-skywalk.webp',
        duration: '45 minutes to 1 hour',
      },
    ],
    
    thingsToDo: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: 'Eastern Beach',
      description: 'Eastern Beach offers shingle and sand for swimming; Sandy Bay is pebbly with clear waters amid reserve scenery.',
      gettingThere: 'Taxi or bus from terminal in 10 to 15 minutes; walkable from town end.',
      image: 'beach.webp',
    },
    
    foodAndDrink: [
      {
        name: 'Main Street pubs',
        type: 'Pub / Restaurant strip',
        description: 'British fish and chips, curries alongside tapas in lively bars.',
      },
      {
        name: 'Casemates Square eateries',
        type: 'Food Hall / Market area',
        description: 'Casual stalls for burgers, pizzas and local specials.',
      },
      {
        name: 'Rock summit cafés',
        type: 'Café',
        description: 'Ape-viewing spots for snacks and drinks at O\'Hara\'s Battery.',
      },
      {
        name: 'Marina restaurants',
        type: 'Waterfront dining',
        description: 'Seafood and international near port quay.',
      },
    ],
    
    insiderTips: [
      'Pre-book Rock Nature Reserve combined ticket or cable car for queues.',
      'Very safe but mind apes as they steal food and glasses.',
      'Cable car busiest midday; go early or late.',
      'Walk town, taxi or bus for Rock; no cars allowed in upper reserve.',
      'Avoid feeding apes (fines apply); keep loose items secure on cable car.',
      'Spanish side queues possible; passports ready.',
    ],
    
    weather: {
      intro: 'Gibraltar has a Mediterranean climate with mild winters and warm summers. Spring and autumn offer the best balance of weather and crowds.',
      months: [
        { month: 'Jan', highC: 16, lowC: 11, rainMm: 90, sunDays: 16, seaTempC: 15 },
        { month: 'Feb', highC: 16, lowC: 11, rainMm: 80, sunDays: 17, seaTempC: 15 },
        { month: 'Mar', highC: 18, lowC: 12, rainMm: 70, sunDays: 19, seaTempC: 15 },
        { month: 'Apr', highC: 20, lowC: 13, rainMm: 60, sunDays: 21, seaTempC: 16 },
        { month: 'May', highC: 22, lowC: 15, rainMm: 40, sunDays: 24, seaTempC: 17 },
        { month: 'Jun', highC: 25, lowC: 18, rainMm: 20, sunDays: 27, seaTempC: 19 },
        { month: 'Jul', highC: 28, lowC: 20, rainMm: 5, sunDays: 30, seaTempC: 21 },
        { month: 'Aug', highC: 28, lowC: 21, rainMm: 10, sunDays: 29, seaTempC: 22 },
        { month: 'Sep', highC: 26, lowC: 19, rainMm: 30, sunDays: 25, seaTempC: 22 },
        { month: 'Oct', highC: 23, lowC: 17, rainMm: 60, sunDays: 22, seaTempC: 20 },
        { month: 'Nov', highC: 19, lowC: 14, rainMm: 80, sunDays: 18, seaTempC: 18 },
        { month: 'Dec', highC: 17, lowC: 12, rainMm: 100, sunDays: 16, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'Spring (April-June) and autumn (September-October) balance warmth and low rain.',
        hottest: 'Summer heat great for beaches but crowded Rock trails.',
        quietest: 'Winter mild for sightseeing with fewer visitors.',
        recommendation: 'Spring/autumn for clear Rock views and ape spotting.',
      },
    },
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, 15 minutes to Main Street.',
      },
      {
        question: 'How long do you need?',
        answer: 'Half-day town + Rock; full day adds beaches.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Yes, everywhere as official language.',
      },
      {
        question: 'What\'s the best way to get around?',
        answer: 'Walking town, cable car/taxi for Rock.',
      },
      {
        question: 'Can you see apes on a cruise day?',
        answer: 'Yes, cable car to summit fits easily.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Spring and autumn offer mild weather ideal for Rock climbing.',
      cruiseTerminals: ['Gibraltar Cruise Terminal (940m quay)'],
      nearbyAirport: 'Gibraltar International Airport (GIB), under 1 km',
      visaInfo: 'British territory; UK/EU/EEA/Schengen short stays visa-free; check rules.',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises'],
    
    meta: {
      title: 'Gibraltar Cruise Port Guide | The Rock, Apes & British Culture',
      description: 'Complete Gibraltar cruise port guide. Visit the Rock of Gibraltar, see Barbary apes, explore Main Street, and discover insider tips for your Mediterranean cruise.',
      keywords: ['Gibraltar cruise port', 'Rock of Gibraltar', 'Gibraltar shore excursions', 'Barbary apes Gibraltar', 'Gibraltar cruise terminal', 'Mediterranean cruises'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  // Alicante
  {
    id: 'alicante',
    slug: 'alicante',
    name: 'Alicante',
    country: 'Spain',
    region: 'mediterranean',
    coordinates: { lat: 38.34, lon: -0.48 },
    tagline: 'Sunlit gateway to Costa Blanca castles and beaches',
    description: 'Alicante sits on the Mediterranean coast as the capital of Alicante Province, with a busy commercial harbour, marina and cruise pier forming part of the central waterfront. Cruise passengers step out close to the Explanada de España promenade, old town streets and Postiguet Beach, making it easy to explore independently in one day.',
    
    aboutPort: {
      overview: 'Alicante Cruise Port lies within the main commercial harbour, which faces directly onto the city and marina at the heart of town. It is a rapidly expanding Mediterranean cruise destination, handling over 100 000 passengers annually and marketed as a gateway to Costa Blanca resorts and inland historic towns. The cruise facility is centred on the Muelle de Levante / Muelle de Poniente area, with a modern terminal at the end of the pier that can accommodate two large ships along a total berthing line of about 700 metres. The terminal provides air-conditioned waiting areas, Wi-Fi, tourist information, ATMs and basic passenger services.',
      terminals: 'Alicante Cruise Terminal at Muelle de Levante / Muelle de Poniente (operated under concession by Global Ports Holding).',
      shuttleServices: 'Most ships offer a complimentary shuttle from the gangway to a drop-off near Plaza Puerta del Mar or the marina, which places you within a few minutes\' walk of the Explanada de España, old town and beach.',
      walkability: 'Walking all the way from the ship to the main waterfront area takes about 15 to 20 minutes on flat ground, roughly 1 to 1.5 kilometres. The waterfront route is straightforward, passing the marina and leading naturally to the Explanada de España and central squares.',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish (Castilian) and Valencian are official; English is widely spoken in tourist, port and hospitality businesses',
      timezone: 'CET/CEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Alicante–Elche Miguel Hernández Airport (ALC)',
        distance: 'Approximately 10 to 12 kilometres south-west of the city centre and harbour, typically 15 to 25 minutes by road depending on traffic',
        options: 'Taxis from the airport to the port area usually take 15 to 25 minutes via the coastal road. The C6 airport bus runs between the airport and Alicante city, stopping near key central points; from there it is a short walk or taxi to the port. There is no direct rail link from the airport; passengers must use bus or taxi to reach Alicante railway station or the cruise terminal.',
      },
      trains: {
        mainStation: 'Alicante-Terminal (Alicante main station)',
        description: 'Alicante-Terminal has high-speed and long-distance services to Madrid and other major Spanish cities, plus regional trains along the Mediterranean corridor.',
        localHubs: 'Madrid acts as the principal hub for AVE connections, while regional links extend along the Valencian Community and southwards towards Murcia.',
      },
      cruiseLines: 'Alicante receives calls from large mainstream and premium cruise brands on Mediterranean and repositioning itineraries. Lines using the port include MSC Cruises, Costa Cruises, Royal Caribbean and others, with some ships home-porting for round-trip cruises.',
    },
    
    gettingAround: {
      fromPort: 'From ship to city, passengers usually either walk along the pier or take the short shuttle to near Puerta del Mar, after which the old town, promenade and beach are all close. The waterfront route is straightforward, passing the marina and leading naturally to the Explanada de España and central squares.',
      publicTransport: 'Public transport options include city buses and the coastal tram system (TRAM Metropolitano de Alicante), which runs north along the Costa Blanca towards beach suburbs and towns such as El Campello and Benidorm. Key interchange points for buses and trams are around Puerta del Mar and nearby Avenida de la Estación, both within walking distance from the shuttle stop.',
      taxis: 'Taxis wait at the port exit and around central squares, offering quick transfers to attractions such as the castle lift entrance, the railway station or more distant beaches.',
      walkingDistance: 'Within central Alicante, most key sights are within 10 to 20 minutes on foot from the shuttle drop-off, although some routes involve gentle uphill stretches through the Barrio de Santa Cruz.',
      sightseeingBus: 'Hop-on hop-off style city tours and guided bus excursions are available from the port on some days, but the compact layout means many cruise visitors prefer a self-guided walking route that combines the promenade, old town, castle and beach.',
    },
    
    mustSeeSights: [
      {
        title: 'Castillo de Santa Bárbara',
        description: 'Santa Bárbara Castle crowns Mount Benacantil above Alicante and is one of Spain\'s largest medieval fortresses, overlooking the harbour and city. Visitors can reach it by lift from near Postiguet Beach or by road and walking paths, and enjoy ramparts, courtyards and broad sea views.',
        image: 'castillo-santa-barbara.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Barrio de Santa Cruz (Old Town)',
        description: 'The Barrio de Santa Cruz is the traditional old quarter on the hillside below the castle, known for its narrow lanes, colourful houses and viewpoints. It offers a distinctly local atmosphere with small squares, chapels and bars tucked into steep streets.',
        image: 'barrio-santa-cruz.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Explanada de España promenade',
        description: 'This iconic seafront promenade, paved with undulating mosaics of coloured marble tiles and lined with palms, runs parallel to the marina and central streets. It is ideal for a gentle stroll between port, beach and town, with cafés and market stalls along the way.',
        image: 'explanada-espana.webp',
        duration: '45 minutes to 1.5 hours',
      },
      {
        title: 'Playa del Postiguet',
        description: 'Postiguet is Alicante\'s main urban beach, a sandy bay directly below the castle and next to the city centre. Its proximity to the promenade and old town makes it easy to combine swimming or sunbathing with sightseeing in a typical cruise day.',
        image: 'playa-postiguet.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'MARQ Provincial Archaeological Museum',
        description: 'The MARQ museum showcases archaeological finds from across Alicante Province, using modern displays to cover prehistory through to the medieval period. It has won international awards for presentation quality and is accessible by a short bus or tram ride from the centre.',
        image: 'marq-museum.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Alicante harbour and marina area',
        description: 'The harbour and marina area immediately beside the cruise port features modern leisure facilities, restaurants and views of the city and castle. Walking the piers and waterfront gives a good sense of Alicante\'s maritime character and links nicely with the Explanada and city beaches.',
        image: 'alicante-marina.webp',
        duration: '1 to 2 hours',
      },
    ],
    
    thingsToDo: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: 'Playa del Postiguet',
      description: 'Postiguet Beach is a sheltered, sandy crescent at the foot of Mount Benacantil, popular for swimming and sunbathing with views up to Santa Bárbara Castle. It offers rental loungers, beach bars and quick access back to the promenade and city streets.',
      gettingThere: 'From the shuttle drop-off near Puerta del Mar, Postiguet Beach is about a 10 to 15 minute walk along the waterfront; from the end of the cruise pier on foot, allow around 20 minutes in total. Taxis can cover the distance in a few minutes if needed.',
      image: 'beach.webp',
    },
    
    foodAndDrink: [
      {
        name: 'Explanada de España cafés',
        type: 'Café / Tapas Bar zone',
        description: 'Along the Explanada de España promenade, numerous cafés and tapas bars serve coffee, pastries, ice cream and simple tapas, ideal for a relaxed stop between sightseeing and the beach.',
      },
      {
        name: 'Old town (Barrio de Santa Cruz) tapas bars',
        type: 'Tapas Bar area',
        description: 'The old quarter\'s narrow streets host intimate tapas bars and small restaurants offering local rice dishes, seafood and classic Spanish plates in a more traditional setting.',
      },
      {
        name: 'Marina and harbourfront restaurants',
        type: 'Restaurant',
        description: 'Around the marina and harbour area near the cruise shuttle stop are modern restaurants with terraces overlooking the boats, known for seafood, paella and Mediterranean menus.',
      },
      {
        name: 'Central market and nearby eateries',
        type: 'Market / Casual food',
        description: 'Alicante\'s Central Market (Mercado Central) and surrounding streets offer fresh produce stalls and casual eateries where visitors can taste local products and quick bites.',
      },
    ],
    
    insiderTips: [
      'In high season and on busy days, consider pre-booking castle tours, guided city walks or popular excursions to ensure availability within cruise timings.',
      'Alicante is generally considered safe, but standard precautions against pickpockets are sensible in crowded areas such as trams, markets and busy promenades.',
      'The castle lift and beach can get busy late morning to mid-afternoon; visiting early in the day or later in the afternoon can mean shorter waits and more comfortable temperatures.',
      'Most central sights are walkable from the shuttle stop, with trams and buses mainly useful for more distant beaches or MARQ; buying tickets on board trams is usually straightforward with machines.',
      'Attempting to combine long out-of-town excursions with a full castle and beach visit during a short call may feel rushed, so focusing on Alicante itself often gives a more relaxed day.',
      'The Costa Blanca climate provides strong sun for much of the year; carrying water, sun protection and taking breaks in shaded streets or cafés helps manage midday heat.',
    ],
    
    weather: {
      intro: 'Values are typical climate averages for Alicante, rounded; conditions vary by year.',
      months: [
        { month: 'Jan', highC: 17, lowC: 7, rainMm: 25, sunDays: 20, seaTempC: 14 },
        { month: 'Feb', highC: 18, lowC: 8, rainMm: 25, sunDays: 20, seaTempC: 14 },
        { month: 'Mar', highC: 20, lowC: 10, rainMm: 25, sunDays: 22, seaTempC: 15 },
        { month: 'Apr', highC: 21, lowC: 11, rainMm: 30, sunDays: 23, seaTempC: 16 },
        { month: 'May', highC: 24, lowC: 14, rainMm: 25, sunDays: 26, seaTempC: 18 },
        { month: 'Jun', highC: 28, lowC: 18, rainMm: 15, sunDays: 28, seaTempC: 21 },
        { month: 'Jul', highC: 31, lowC: 21, rainMm: 5, sunDays: 30, seaTempC: 24 },
        { month: 'Aug', highC: 32, lowC: 22, rainMm: 10, sunDays: 29, seaTempC: 26 },
        { month: 'Sep', highC: 28, lowC: 19, rainMm: 35, sunDays: 25, seaTempC: 24 },
        { month: 'Oct', highC: 24, lowC: 15, rainMm: 45, sunDays: 22, seaTempC: 22 },
        { month: 'Nov', highC: 20, lowC: 11, rainMm: 35, sunDays: 21, seaTempC: 18 },
        { month: 'Dec', highC: 17, lowC: 8, rainMm: 30, sunDays: 20, seaTempC: 15 },
      ],
      bestTime: {
        overall: 'Late spring and early autumn (May, June, September) usually bring warm but comfortable temperatures, plenty of sunshine and good sea conditions with less extreme heat than midsummer.',
        hottest: 'July and August offer very warm weather and lively beaches but also higher crowds and stronger sun, which can make midday sightseeing tiring.',
        quietest: 'Winter and early spring are quieter and mild, good for city walks and views, though sea temperatures are cooler and some beach services may be reduced.',
        recommendation: 'May, June or September generally provide the best balance for first-timers, with reliable warmth, swim-friendly sea, manageable crowds and comfortable conditions for castle and old town walks.',
      },
    },
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, the cruise pier is within walking distance of the city, and most ships provide a shuttle to near Puerta del Mar, from where the promenade, old town and beach are 10 to 15 minutes away on foot.',
      },
      {
        question: 'How long do you need?',
        answer: 'A full cruise day is ideal to combine the castle, old town, promenade and beach, while shorter calls still allow a focused walking route and either castle views or beach time.',
      },
      {
        question: 'Is English spoken?',
        answer: 'English is commonly spoken in tourist-facing venues, port services and many restaurants, although Spanish and Valencian remain the everyday languages.',
      },
      {
        question: 'What is the best way to get around?',
        answer: 'Walking suits most passengers for central Alicante; trams and buses help reach outlying beaches or the MARQ museum, with taxis filling gaps for those who prefer to avoid hills.',
      },
      {
        question: 'Can you do a Costa Blanca excursion on a cruise day?',
        answer: 'Yes, half-day and full-day tours along the coast or inland are offered, but they will reduce time available for castle and beach, so planning around your call length is important.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Late spring and early autumn offer warm, sunny weather and pleasant sea temperatures without peak midsummer crowds or heat.',
      cruiseTerminals: ['Alicante Cruise Terminal at Muelle de Levante / Muelle de Poniente (operated under concession by Global Ports Holding)'],
      nearbyAirport: 'Alicante–Elche Miguel Hernández Airport (ALC), around 10 to 12 kilometres from the cruise port',
      visaInfo: 'Spain is part of the Schengen Area, so EU nationals and many other passport holders can make short tourist visits without a visa, but travellers should check current Schengen and Spanish entry rules for their nationality and itinerary before sailing.',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'balearic-islands-cruises'],
    
    meta: {
      title: 'Alicante Cruise Port Guide | Costa Blanca Castles & Beaches',
      description: 'Complete Alicante cruise port guide. Visit Santa Bárbara Castle, explore the old town, stroll the Explanada de España promenade, and relax on Postiguet Beach.',
      keywords: ['Alicante cruise port', 'Alicante shore excursions', 'Costa Blanca', 'Alicante Spain', 'Alicante cruise terminal', 'Mediterranean ports'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  // ============================================================================
  // ATLANTIC ISLANDS - NEW PORTS
  // ============================================================================
  
  // Funchal, Madeira
  {
    id: 'funchal',
    slug: 'funchal-madeira',
    name: 'Funchal, Madeira',
    country: 'Portugal',
    region: 'atlantic-islands',
    coordinates: { lat: 32.64, lon: -16.92 },
    tagline: 'Cable car to hilltop views and toboggan thrills',
    description: 'Funchal curves around a deep natural harbour on Madeira\'s southern shore, blending colonial architecture, subtropical gardens and steep hills rising from the sea. Cruise ships berth along quays integrated into the city, placing passengers minutes from the Zona Velha old town, markets and seafront promenades.',
    
    aboutPort: {
      overview: 'Funchal Cruise Port is a historic harbour in the heart of the island capital, welcoming large ships with a dedicated terminal on the main quay. It handled over 700,000 passengers in recent record years, serving as a key stop for transatlantic and European itineraries.',
      terminals: 'Main Cruise Terminal on central quay; adjacent piers. Ships typically berth at the central cruise quay or adjacent piers accommodating up to three or four vessels, with the main terminal offering check-in, Wi-Fi, ATMs, shops and tourist information. A fourth ship may use a smaller pier near the CR7 Museum.',
      shuttleServices: 'Port shuttles or taxis (fixed rate to centre) are available, though many walk the flat 1 to 1.6 kilometre promenade to the old town.',
      walkability: 'The walk takes 15 to 20 minutes and passes the marina and market area. Many passengers walk the flat promenade rather than using transport.',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese; English widely spoken in tourist areas',
      timezone: 'WET/WEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Cristiano Ronaldo Madeira International Airport (FNC)',
        distance: 'Roughly 20 kilometres east of Funchal, typically 25 to 40 minutes by road due to coastal and mountain routes',
        options: 'Taxi: Direct transfers take 25 to 40 minutes depending on traffic. Bus: Airport buses connect to Funchal bus station, from where it is a short taxi or 20-minute walk to the port.',
      },
      trains: {
        mainStation: null,
        description: 'Madeira has no railway network; buses and taxis handle all inter-town travel.',
        localHubs: null,
      },
      cruiseLines: ['MSC', 'AIDA', 'Cunard', 'P&O', 'Princess', 'Major premium operators'],
    },
    
    gettingAround: {
      fromPort: 'Passengers exit the terminal and walk the seafront promenade into Funchal\'s centre, where most sights cluster around the old town and Avenida Arriaga. Taxis and occasional shuttles speed the journey for those preferring not to walk.',
      publicTransport: 'Public buses and electric tuk-tuks serve the city and hills, while the iconic cable car provides direct uphill access to Monte. No metro or tram exists, but hop-on hop-off buses and small electric sightseeing vehicles start near the terminal.',
      taxis: 'Taxis rank outside the terminal for short trips to viewpoints or the cable car base; fares are metered or fixed for popular routes. Fixed rate to centre available.',
      walkingDistance: 'Central distances are short: old town in 15 minutes, market in 10, cable car station in 20 to 25 minutes on foot.',
      sightseeingBus: 'Hop-on hop-off buses depart from near the port, looping through the city, Monte and botanical gardens, useful for covering dispersed attractions efficiently.',
      accessibility: 'Funchal centre is fairly walkable, but the cable car and Monte require some mobility. Cobbled streets in old town may be challenging for wheelchairs.',
    },
    
    mustSeeSights: [
      {
        title: 'Zona Velha (Old Town) and Sé Cathedral',
        description: 'Funchal\'s Zona Velha features narrow cobbled streets with colonial buildings, street art, cafés and the Gothic Sé Cathedral. It is perfect for wandering and offers a taste of Madeiran daily life close to the port.',
        image: 'zona-velha.webp',
        duration: '1 to 2 hours',
      },
      {
        title: 'Funchal Cable Car and Monte',
        description: 'The cable car climbs steeply from near the old town to Monte village, passing subtropical valleys with sea views. At the top, explore the church and gardens before optional toboggan descent.',
        image: 'funchal-cable-car.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Monte Toboggan Ride',
        description: 'Wicker toboggans steered by carreiros slide passengers down from Monte to Funchal at speeds up to 30 km/h over 2 kilometres. It is a thrilling, unique tradition lasting 10 to 15 minutes.',
        image: 'monte-toboggan.webp',
        duration: '1 to 1.5 hours (including cable car up)',
      },
      {
        title: 'Mercado dos Lavradores',
        description: 'This bustling market hall sells tropical fruits, flowers, fish and Madeira wine, with lively vendors and tasting opportunities. It captures the island\'s exotic produce just a short walk from the promenade.',
        image: 'mercado-lavradores.webp',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Botanical Gardens (Jardim Botânico)',
        description: 'Accessed by cable car extension from Monte, the gardens showcase Madeiran flora, exotic plants and panoramic island views. Paths wind through terraces ideal for relaxed exploration.',
        image: 'botanical-gardens.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Fortaleza de São Tiago',
        description: 'This 17th-century fort near the old town offers harbour views, military history exhibits and a small garden. It provides context on Madeira\'s seafaring past close to the cruise quay.',
        image: 'fortaleza-sao-tiago.webp',
        duration: '45 minutes to 1 hour',
      },
    ],
    
    thingsToDo: [],
    
    nearestBeach: {
      name: 'Praia Formosa',
      description: 'Praia Formosa features dark volcanic sands, rocky coves and promenades popular for swimming, snorkelling and local sunbathing amid subtropical scenery. A complex of small black-sand and pebble beaches west of centre.',
      distance: 'From the port promenade, walk or bus west about 2 to 3 kilometres (20 to 30 minutes on foot, 10 minutes by taxi or bus).',
    },
    
    shoreExcursions: [],
    
    foodAndDrink: [
      {
        name: 'Mercado dos Lavradores stalls',
        type: 'Market',
        description: 'Fresh seafood, exotic fruits, poncha drinks and quick eats amid vibrant produce displays.',
      },
      {
        name: 'Zona Velha restaurants',
        type: 'Restaurant / Tapas area',
        description: 'Traditional spots serving espada (black scabbardfish), bolo do caco bread and Madeira wine in historic surroundings.',
      },
      {
        name: 'Waterfront cafés near promenade',
        type: 'Café',
        description: 'Casual venues for coffee, pastries and light meals with harbour views, convenient post-walk.',
      },
      {
        name: 'Monte cafés and levada walks',
        type: 'Café',
        description: 'Hilltop spots near the cable car offering poncha, cakes and local treats after toboggan or garden visits.',
      },
    ],
    
    insiderTips: [
      'Booking tickets in advance: Reserve cable car or toboggan slots online during peak season to avoid queues.',
      'Safety and pickpockets: Funchal is safe, but watch bags in crowded markets and on cable cars.',
      'Timing and queues: Cable car and Monte peak midday; go early or late for shorter waits.',
      'Transport advice: Walk the flat centre, use cable car or taxi for hills; comfortable shoes essential for cobbles.',
      'Things to avoid: Overloading with multiple hill trips in hot weather; prioritise cable car-toboggan combo.',
      'Weather: Subtropical showers possible; light rain gear useful year-round.',
    ],
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Yes, old town and market are 15 to 20 minutes along flat promenade.',
      },
      {
        question: 'How long do you need?',
        answer: 'Full day for cable car, toboggan and market; half-day covers essentials.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Yes, extensively in tourist zones.',
      },
      {
        question: 'What\'s the best way to get around?',
        answer: 'Walking centre, cable car or taxi for hills.',
      },
      {
        question: 'Can you do Monte toboggan on a cruise day?',
        answer: 'Yes, cable car up and toboggan down fits most calls.',
      },
    ],
    
    weather: {
      intro: 'Funchal has a subtropical climate with mild, year-round temperatures. Spring and autumn bring mild temperatures and fewer showers, while summer offers warmth and long days.',
      months: [
        { month: 'Jan', highC: 19, lowC: 15, rainMm: 100, rainyDays: null, sunDays: 15, seaTempC: 18, uv: null, wind: null },
        { month: 'Feb', highC: 19, lowC: 15, rainMm: 90, rainyDays: null, sunDays: 16, seaTempC: 18, uv: null, wind: null },
        { month: 'Mar', highC: 20, lowC: 15, rainMm: 70, rainyDays: null, sunDays: 18, seaTempC: 18, uv: null, wind: null },
        { month: 'Apr', highC: 21, lowC: 16, rainMm: 60, rainyDays: null, sunDays: 20, seaTempC: 18, uv: null, wind: null },
        { month: 'May', highC: 22, lowC: 17, rainMm: 30, rainyDays: null, sunDays: 23, seaTempC: 19, uv: null, wind: null },
        { month: 'Jun', highC: 24, lowC: 19, rainMm: 20, rainyDays: null, sunDays: 25, seaTempC: 21, uv: null, wind: null },
        { month: 'Jul', highC: 25, lowC: 20, rainMm: 10, rainyDays: null, sunDays: 27, seaTempC: 22, uv: null, wind: null },
        { month: 'Aug', highC: 26, lowC: 21, rainMm: 15, rainyDays: null, sunDays: 26, seaTempC: 23, uv: null, wind: null },
        { month: 'Sep', highC: 25, lowC: 21, rainMm: 40, rainyDays: null, sunDays: 23, seaTempC: 23, uv: null, wind: null },
        { month: 'Oct', highC: 24, lowC: 20, rainMm: 80, rainyDays: null, sunDays: 20, seaTempC: 22, uv: null, wind: null },
        { month: 'Nov', highC: 22, lowC: 18, rainMm: 100, rainyDays: null, sunDays: 17, seaTempC: 21, uv: null, wind: null },
        { month: 'Dec', highC: 20, lowC: 16, rainMm: 110, rainyDays: null, sunDays: 15, seaTempC: 19, uv: null, wind: null },
      ],
      bestTime: {
        overall: 'Spring (April to June) and autumn (September to October) bring mild temperatures and fewer showers.',
        hottest: 'Summer offers warmth and long days but busier cable cars and trails.',
        quietest: 'Winter is mild yet wetter, with fewer crowds for gardens and walks.',
        recommendation: 'Spring or autumn for comfortable hiking and clear hill views.',
      },
    },
    
    practicalInfo: {
      bestTimeToVisit: 'Spring and autumn provide mild weather and lighter crowds for outdoor activities',
      cruiseTerminals: ['Main Cruise Terminal on central quay', 'Adjacent piers'],
      nearbyAirport: 'Cristiano Ronaldo Madeira International Airport (FNC), 20 kilometres east',
      visaInfo: 'Portugal (Schengen); visa-free for many short stays - check rules',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'transatlantic-cruises'],
    
    meta: {
      title: 'Funchal Madeira Cruise Port Guide | Cable Car & Toboggans',
      description: 'Complete Funchal Madeira cruise port guide. Explore Zona Velha, ride the cable car to Monte, experience the toboggan ride, visit markets and botanical gardens.',
      keywords: ['Funchal cruise port', 'Madeira cruise guide', 'Funchal cable car', 'Madeira toboggan', 'Funchal things to do', 'Madeira port guide'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  // Las Palmas, Gran Canaria
  {
    id: 'las-palmas',
    slug: 'las-palmas-gran-canaria',
    name: 'Las Palmas, Gran Canaria',
    country: 'Spain (Canary Islands)',
    region: 'atlantic-islands',
    coordinates: { lat: 28.13, lon: -15.42 },
    tagline: 'Europe\'s largest cruise terminal meets sunny island vibes',
    description: 'Las Palmas sprawls across Gran Canaria\'s north-east coast as the archipelago\'s largest city, blending metropolitan energy with beaches and volcanic hinterlands. The cruise port integrates directly into the urban fabric at Santa Catalina, linking passengers to promenades, malls and the old quarter via short walks or transport.',
    
    aboutPort: {
      overview: 'Las Palmas Cruise Port at Muelle Santa Catalina is now Europe\'s largest cruise facility following a major 40 million euro redevelopment completed in 2025, capable of berthing five large ships simultaneously. Managed by Global Ports Holding, the 14,000 m² two-level terminal features sustainable design, passenger bridges, promenades and direct links to the city boulevard.',
      terminals: 'New Santa Catalina Cruise Terminal with four main berths totalling 1,615 metres with no size restrictions, plus expansive outdoor areas connecting to Calle Mayor de Triana.',
      shuttle: 'No shuttles are typically needed as the terminal sits 100 metres from urban amenities like Parque Santa Catalina, El Muelle shopping centre and bus stops; everything feels integrated into the cityscape.',
      walkability: 'The walk to Vegueta old town takes about 20 to 30 minutes across town. Beach and shopping are mere minutes from the new terminal.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish predominates; English is common in port, tourist sites and hospitality areas',
      timezone: 'WET/WEST',
      portType: 'Home Port & Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Gran Canaria Airport (LPA)',
        distance: 'About 25 kilometres south of Las Palmas, typically 25 to 40 minutes by road',
        options: 'Taxi: Direct journey takes 25 to 40 minutes via highway. Bus: Frequent Global/Guaguas buses from the port-area station to the airport in around 40 to 50 minutes.',
      },
      trains: {
        mainStation: 'N/A',
        description: 'Gran Canaria lacks a railway; buses handle all inter-town links efficiently.',
        localHubs: 'N/A',
      },
      cruiseLines: 'Las Palmas welcomes mainstream giants on Canary winter-sun and transatlantic routes, including P&O (Iona, Azura), Cunard (Queen Anne), AIDA, MSC, Celebrity, TUI and many more.',
    },

    gettingAround: {
      fromPort: 'Passengers exit directly into the city at Santa Catalina, with immediate access to pedestrian zones, parks and transport hubs—no long pier walks required. The layout supports easy self-exploration of the modern district.',
      publicTransport: 'Public buses (Guaguas) and regional services depart from the terminal-adjacent station, covering beaches, Maspalomas dunes and inland Roque Nublo; no metro or tram exists.',
      taxis: 'Taxis queue outside the terminal for city rides, airport transfers or excursions, plentiful even on busy ship days. Central sights like the beach and cathedral are 10 to 30 minutes on foot; Vegueta about 3 kilometres away.',
      walkingDistance: 'Central sights like the beach and cathedral are 10 to 30 minutes on foot; Vegueta about 3 kilometres away.',
      sightseeingBus: 'Hop-on hop-off buses start right at the port, looping through beaches, old town, Palmitos Park and viewpoints—ideal for orienting first-timers.',
    },
    
    mustSeeSights: [
      {
        title: 'Playa de Las Canteras',
        description: 'Las Canteras is the city\'s spectacular urban beach, a 3 km golden arc with reefs, promenades and beach bars perfect for swimming. It lies minutes west of the terminal along the seafront.',
        image: 'las-canteras-beach.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'Vegueta historic district and Cathedral',
        description: 'Vegueta\'s cobbled streets house the Gothic Cathedral de Santa Ana, Columbus House museum and atmospheric plazas. Reached by 20 to 30 minute walk or quick bus.',
        image: 'vegueta-district.webp',
        duration: '2 to 3 hours',
      },
      {
        title: 'El Muelle and Santa Catalina',
        description: 'The massive shopping centre and adjacent park buzz with cafés, stores and street life right outside the terminal. Ideal for relaxed shopping and people-watching.',
        image: 'santa-catalina.webp',
        duration: '1 to 2 hours',
      },
      {
        title: 'Casa de Colón and Triana neighbourhood',
        description: 'Columbus House museum explores Canary history in a 15th-century mansion; Triana offers markets and Art Deco architecture nearby.',
        image: 'casa-colon.webp',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Maspalomas Dunes excursion',
        description: 'Iconic 6 km sand dunes at the south coast form a mini-Sahara, popular for camel rides and nature walks. Bus or tour from port in 45 to 60 minutes each way.',
        image: 'maspalomas-dunes.webp',
        duration: '3 to 4 hours plus travel',
      },
      {
        title: 'Roque Nublo hike or viewpoint',
        description: 'Gran Canaria\'s dramatic central monolith offers hiking amid volcanic peaks, accessed by bus/taxi combo.',
        image: 'roque-nublo.webp',
        duration: '4 to 5 hours round trip',
      },
    ],

    thingsToDo: [
      {
        title: 'Las Canteras Beach and promenade',
        description: 'Spend time at the city\'s spectacular urban beach with its golden sand, natural reef protection and beach bars.',
        category: 'beach',
        duration: '2 to 3 hours',
      },
      {
        title: 'Vegueta historic district',
        description: 'Explore the Gothic Cathedral de Santa Ana, Columbus House museum and atmospheric plazas in the old quarter.',
        category: 'culture',
        duration: '2 to 3 hours',
      },
      {
        title: 'El Muelle shopping and Santa Catalina',
        description: 'Browse the massive shopping centre and enjoy the park with cafés and street life right outside the terminal.',
        category: 'shopping',
        duration: '1 to 2 hours',
      },
      {
        title: 'Maspalomas Dunes day trip',
        description: 'Visit the iconic sand dunes at the south coast, popular for camel rides and nature walks.',
        category: 'nature',
        duration: 'Full day',
      },
    ],
    
    nearestBeach: {
      name: 'Playa de Las Canteras',
      description: 'A magnificent urban strand with natural reef protection, clear waters, promenade cafés and golden sand drawing locals and visitors year-round.',
      distance: '10 to 15 minute walk west from the terminal along the seafront path.',
    },

    foodAndDrink: [
      {
        name: 'El Muelle centre eateries',
        type: 'Food Hall / Mall',
        description: 'Diverse options from tapas to international inside the giant shopping complex next door.',
      },
      {
        name: 'Las Canteras beach chiringuitos',
        type: 'Beach Bar / Seafood',
        description: 'Fresh fish grills and papas arrugadas along the promenade.',
      },
      {
        name: 'Vegueta tapas bars',
        type: 'Tapas Bar area',
        description: 'Traditional spots in the old quarter serving mojo sauces and Canarian stews.',
      },
      {
        name: 'Santa Catalina cafés',
        type: 'Café zone',
        description: 'Park-side venues for coffee, pastries and light bites amid urban greenery.',
      },
    ],

    insiderTips: [
      'Reserve dunes tours or Roque Nublo via cruise or apps for timed slots.',
      'Safe city but watch bags in crowded markets and buses.',
      'Beach peaks midday; hit Vegueta early to beat heat.',
      'Walk to beach/mall, bus for south; taxis surge on multi-ship days.',
      'Overpacking itinerary—beach plus city or one big excursion fits best.',
      'Year-round UV strong; hats and shade essential.',
    ],
    
    faq: [
      {
        question: 'Is the port walkable?',
        answer: 'Exceptionally—beach and mall in minutes, old town 20 to 30 minutes.',
      },
      {
        question: 'How long do you need?',
        answer: 'Full day for beach plus Vegueta; half-day essentials.',
      },
      {
        question: 'Is English spoken?',
        answer: 'Yes, port and tourist hubs fluent.',
      },
      {
        question: 'What\'s the best way to get around?',
        answer: 'Walking centre/beach, buses south.',
      },
      {
        question: 'Can you do Maspalomas on a cruise day?',
        answer: 'Yes, 45-min bus/tour fits well.',
      },
    ],

    weather: {
      intro: 'Las Palmas enjoys a subtropical climate with year-round mild temperatures, minimal rainfall and strong sunshine.',
      months: [
        { month: 'Jan', highC: 21, lowC: 15, rainMm: 25, rainyDays: 4, sunDays: 22, seaTempC: 20, uv: 'Moderate', wind: 'Light to moderate trade winds' },
        { month: 'Feb', highC: 21, lowC: 15, rainMm: 20, rainyDays: 3, sunDays: 22, seaTempC: 19, uv: 'Moderate', wind: 'Light to moderate trade winds' },
        { month: 'Mar', highC: 22, lowC: 16, rainMm: 15, rainyDays: 3, sunDays: 24, seaTempC: 19, uv: 'High', wind: 'Moderate trade winds' },
        { month: 'Apr', highC: 23, lowC: 16, rainMm: 10, rainyDays: 2, sunDays: 25, seaTempC: 20, uv: 'High', wind: 'Moderate trade winds' },
        { month: 'May', highC: 24, lowC: 18, rainMm: 5, rainyDays: 1, sunDays: 27, seaTempC: 20, uv: 'Very high', wind: 'Light to moderate trade winds' },
        { month: 'Jun', highC: 26, lowC: 19, rainMm: 2, rainyDays: 0, sunDays: 28, seaTempC: 21, uv: 'Very high', wind: 'Light trade winds' },
        { month: 'Jul', highC: 28, lowC: 21, rainMm: 0, rainyDays: 0, sunDays: 30, seaTempC: 22, uv: 'Very high', wind: 'Light trade winds' },
        { month: 'Aug', highC: 29, lowC: 22, rainMm: 1, rainyDays: 0, sunDays: 30, seaTempC: 23, uv: 'Very high', wind: 'Light trade winds' },
        { month: 'Sep', highC: 28, lowC: 21, rainMm: 5, rainyDays: 1, sunDays: 27, seaTempC: 23, uv: 'High', wind: 'Light to moderate trade winds' },
        { month: 'Oct', highC: 26, lowC: 20, rainMm: 10, rainyDays: 2, sunDays: 25, seaTempC: 23, uv: 'High', wind: 'Moderate trade winds' },
        { month: 'Nov', highC: 24, lowC: 18, rainMm: 15, rainyDays: 3, sunDays: 23, seaTempC: 22, uv: 'Moderate', wind: 'Moderate trade winds' },
        { month: 'Dec', highC: 22, lowC: 16, rainMm: 25, rainyDays: 4, sunDays: 22, seaTempC: 21, uv: 'Moderate', wind: 'Light to moderate trade winds' },
      ],
      bestTime: {
        overall: 'Year-round mildness shines, but spring/autumn avoid peak heat.',
        hottest: 'Summer warmth draws crowds to beaches.',
        quietest: 'Winter sun without European chill, fewer visitors.',
        recommendation: 'November to March for classic winter escape.',
      },
    },
    
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round appeal peaks in winter for sunny escapes',
      cruiseTerminals: ['New Santa Catalina Cruise Terminal (berths 1-5)'],
      nearbyAirport: 'Gran Canaria Airport (LPA), 25 km south',
      visaInfo: 'Schengen (Spain); visa-free short stays for many—verify rules',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'west-africa-cruises'],
    
    meta: {
      title: 'Las Palmas Gran Canaria Cruise Port Guide | Europe\'s Largest Terminal',
      description: 'Complete Las Palmas cruise port guide. Visit Las Canteras beach, explore Vegueta historic district, enjoy Canarian cuisine, and discover insider tips for your Atlantic cruise.',
      keywords: ['Las Palmas cruise port', 'Gran Canaria cruise', 'Las Palmas shore excursions', 'Canary Islands cruise', 'Las Palmas things to do', 'Santa Catalina cruise terminal']
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
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

