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
  {
    id: 'north-africa',
    slug: 'north-africa',
    name: 'North Africa',
    description: 'Moroccan and North African cruise ports along the Mediterranean and Atlantic coasts',
    image: null,
  },
  {
    id: 'norwegian-fjords',
    slug: 'norwegian-fjords',
    name: 'Norwegian Fjords',
    description: 'Dramatic fjords, Arctic Circle and Northern Lights destinations',
    image: null,
  },
  {
    id: 'uk',
    slug: 'united-kingdom',
    name: 'United Kingdom',
    description: 'Major UK cruise ports including Southampton and Dover',
    image: null, // Will use WEB_categories/ports/uk/hero.webp
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
    tagline: 'Britain\'s cruise capital where Titanic\'s story began',
    description: 'Southampton is the UK\'s premier cruise hub, handling over two million passengers annually through its five modern terminals. This historic port city served as the departure point for the RMS Titanic in 1912, and that maritime heritage remains central to its identity today. The city seamlessly blends centuries of seafaring history with contemporary shopping and dining experiences.',
    portCharacter: 'gateway',
    
    // Detailed port information
    aboutPort: {
      overview: 'Walking off your ship at City, Horizon, or Ocean terminals puts you within easy reach of Southampton\'s attractions. The city centre is just a 15 to 20 minute walk from most terminals, with the medieval Old Town, Westquay shopping centre, and excellent museums all accessible on foot. The Bargate, a magnificent medieval gatehouse dating from 1180, stands at the heart of the modern city.',
      terminals: 'Five terminals along Southampton Water (City, Horizon, Ocean, Mayflower, QEII)',
      shuttleServices: 'Some cruise lines offer shuttles to town centre for a small fee',
      walkability: 'City and Horizon terminals are easiest for walking; others may require taxi. Walk to city centre takes 15 to 25 minutes depending on terminal.',
    },

    // Quick facts for the info bar
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    // Getting around section
    gettingAround: {
      fromPort: 'Terminals connect via secure paths to city centre. Taxis rank outside each terminal. Check which terminal your ship uses as distances vary significantly.',
      publicTransport: 'Direct trains to London (60 minutes) and Winchester (15 minutes) from Southampton Central Station, 20-minute walk from terminals.',
      taxis: 'Taxis readily available outside all terminals. Metered and straightforward.',
      walkingDistance: 'City centre 15-25 minutes walk depending on terminal. Medieval Walls, SeaCity Museum all accessible on foot.',
      sightseeingBus: 'No specific hop-on hop-off mentioned in port data.',
      accessibility: 'City and Horizon terminals are closest to town and mostly flat walking. All terminals have disabled access.',
    },
    
    // Airport and train connections
    transportConnections: {
      airport: {
        name: 'Southampton Airport (SOU)',
        distance: '4 miles',
        options: 'Southampton Airport 4 miles. London Heathrow 75 miles.',
      },
      trains: {
        mainStation: 'Southampton Central Station',
        description: 'Direct trains to London, Winchester, and UK network. 20-minute walk from terminals or short taxi ride.',
        localHubs: 'Southampton Central is the main hub for all rail connections.',
      },
    },
    
    // Must-see sights (the headline attractions)
    mustSeeSights: [
      {
        title: 'Stonehenge',
        category: 'landmark',
        description: 'One of the world\'s most famous prehistoric monuments, this UNESCO World Heritage Site features massive standing stones arranged in a circle over 5,000 years ago. The excellent visitor centre explains the mystery and history of this remarkable site, with exhibitions on the people who built it.',
        duration: '3 to 4 hours including travel for a relaxed pace',
        tips: [
          'Book timed entry tickets in advance, especially in summer',
          'Combine with a stop in Salisbury to see the cathedral and Magna Carta',
          'The visitor centre is a mile from the stones with shuttle buses running regularly',
        ],
        highlights: ['History', 'Photography', 'Architecture', 'Culture'],
        goodFor: ['First-time visitors', 'History buffs', 'Photographers', 'Families'],
      },
      {
        title: 'New Forest National Park',
        category: 'nature',
        description: 'Ancient woodland and open heathland where wild ponies roam free, just minutes from Southampton. Pretty villages like Lyndhurst and Brockenhurst offer tea rooms, antique shops, and traditional pubs. Perfect for nature lovers wanting an authentic English countryside experience.',
        duration: '3 to 5 hours for a relaxed pace',
        tips: [
          'Wild ponies are everywhere but do not feed or touch them',
          'Lyndhurst is the unofficial capital with a visitor centre',
          'Beaulieu Motor Museum and Palace House make an excellent combined visit',
        ],
        highlights: ['Nature', 'Wildlife', 'Scenic', 'Photography'],
        goodFor: ['Families', 'Nature lovers', 'Photographers', 'Active travelers'],
      },
      {
        title: 'SeaCity Museum',
        category: 'historic',
        description: 'Southampton\'s premier museum tells the story of the city\'s connection to the sea and the Titanic. The exhibition includes a 1:25 scale model of the ship, interactive displays, and moving accounts of crew members, most of whom came from Southampton. The Gateway to the World gallery covers 250,000 years of local history.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Your ticket allows free return visits for a year',
          'The Disaster Room recreation is particularly moving',
          'There is a good cafe on the ground floor',
        ],
        highlights: ['History', 'Museums', 'Culture', 'Family-friendly'],
        goodFor: ['History buffs', 'Families', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'Winchester',
        category: 'historic',
        description: 'England\'s ancient capital features one of Europe\'s finest cathedrals, the Great Hall with its legendary Round Table, and charming medieval streets. Jane Austen spent her final years here and is buried in the cathedral. The city offers excellent independent shops and restaurants.',
        duration: '4 to 5 hours for a relaxed pace',
        tips: [
          'Winchester Cathedral requires a ticket but the close and grounds are free',
          'Walk along the River Itchen for lovely views',
          'The Buttercross in the High Street is a good meeting point',
        ],
        highlights: ['History', 'Architecture', 'Culture', 'Shopping', 'Religious'],
        goodFor: ['History buffs', 'Architecture lovers', 'Culture seekers', 'Couples'],
      },
      {
        title: 'Tudor House and Garden',
        category: 'historic',
        description: 'Southampton\'s most important historic building reveals over 800 years of history in the heart of the Old Town. The timber-framed house dates from the late 15th century, with King John\'s Palace behind it dating back 300 years earlier. Interactive displays bring the stories of residents through the ages to life.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'The garden is a peaceful retreat from the busy city',
          'Look for the Tudor graffiti scratched into walls',
          'Combined tickets with SeaCity Museum offer good value',
        ],
        highlights: ['History', 'Architecture', 'Gardens'],
        goodFor: ['History buffs', 'Architecture lovers', 'Families'],
      },
      {
        title: 'Beaulieu National Motor Museum',
        category: 'family',
        description: 'World-famous motor museum set in the grounds of a historic abbey and stately home. Over 250 vehicles from vintage cars to Top Gear favourites. The Palace House, monorail, and abbey ruins are included in the entry. A full day out for car enthusiasts and families alike.',
        duration: '3 to 5 hours for a relaxed pace',
        tips: [
          'Allow time for the grounds and abbey as well as the museum',
          'The James Bond exhibition is popular',
          'Good restaurant on site',
        ],
        highlights: ['Museums', 'Family-friendly', 'History', 'Gardens'],
        goodFor: ['Families', 'History buffs', 'Car enthusiasts'],
      },
      {
        title: 'Southampton Old Town and Medieval Walls',
        category: 'stroll',
        description: 'Explore one of England\'s best-preserved medieval town wall circuits. The 1.25 mile walk takes you past 13 remaining towers, 6 city gates, and half a mile of original walls. The Bargate, dating from 1180, is one of the finest medieval town gates in the country.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Information boards along the route explain the history',
          'The Arcades on the western wall are unique in England',
          'God\'s House Tower is one of the first buildings designed for gunpowder weapons',
        ],
        highlights: ['History', 'Architecture', 'Photography'],
        goodFor: ['History buffs', 'Photographers', 'Solo travelers'],
      },
      {
        title: 'Solent Sky Museum',
        category: 'historic',
        description: 'Aviation museum celebrating Southampton\'s role in aircraft development, including the legendary Spitfire. Housed in a former aircraft hangar, the collection includes 19 aircraft and tells the story of the Schneider Trophy and flying boat era. The Spitfire Gallery is a highlight.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Look for the cockpit experiences where you can sit in a real aircraft',
          'The Sandringham flying boat is impressive',
          'Free parking available',
        ],
        highlights: ['History', 'Museums', 'Family-friendly'],
        goodFor: ['Families', 'History buffs', 'Aviation enthusiasts'],
      },
    ],
    
    // Shore excursions tips
    shoreExcursions: [
      {
        title: 'Stonehenge',
        description: 'UNESCO World Heritage prehistoric monument, about an hour\'s drive from Southampton.',
        duration: 'Half day',
        bookWith: 'Ship excursion or independent tour',
      },
      {
        title: 'Winchester',
        description: 'England\'s ancient capital with cathedral and Great Hall, 20 minutes by train.',
        duration: 'Half day',
        bookWith: 'Independent recommended',
      },
      {
        title: 'New Forest National Park',
        description: 'Ancient woodland with wild ponies and charming villages.',
        duration: 'Half day to full day',
        bookWith: 'Independent recommended',
      },
    ],
    
    // Beaches section (gateway port - no immediate beach)
    nearestBeach: {
      name: 'Weston Shore / Solent beaches',
      distance: '3 miles',
      description: 'Nearest beaches at the Solent (Weston Shore) approximately 3 miles east, or in Bournemouth (35 miles).',
    },
    
    // Food & drink recommendations
    foodAndDrink: [
      {
        name: 'The Dancing Man Brewery',
        type: 'Brewery/Restaurant',
        description: 'Craft brewery in medieval wool house on Town Quay with pub food.',
      },
      {
        name: 'The Pig in the Wall',
        type: 'Restaurant',
        description: 'Boutique hotel restaurant with locally sourced menu on Western Esplanade.',
      },
      {
        name: 'Oxford Brasserie',
        type: 'Restaurant',
        description: 'French-inspired brasserie near the waterfront on Oxford Street.',
      },
      {
        name: 'Mettricks',
        type: 'Cafe',
        description: 'Independent speciality coffee roastery on Oxford Street.',
      },
      {
        name: 'SeaCity Museum Cafe',
        type: 'Cafe',
        description: 'Museum cafe open to non-visitors with harbour views on Havelock Road.',
      },
      {
        name: 'Tudor House Cafe',
        type: 'Cafe',
        description: 'Light lunches in historic setting on Bugle Street.',
      },
    ],
    
    // Tips from experienced cruisers
    insiderTips: [
      'The QE2 Mile links the main attractions and is well signposted with information boards',
      'Start at SeaCity Museum near the Civic Centre, walk through the Old Town past Tudor House',
      'Follow along the medieval walls to Town Quay, and finish at Mayflower Park',
      'Allow 2 hours for a leisurely walk with stops to see your ship from the shore',
      'Check which terminal your ship uses as distances vary significantly between terminals',
      'City and Horizon terminals are easiest for walking to town',
      'Most shops close by 6pm except at Westquay shopping centre',
      'Sunday trading hours are reduced (typically 11am to 5pm)',
    ],

    // Weather information
    weather: {
      intro: '15 to 20°C in summer, 6 to 10°C in spring and autumn. Pack layers and a waterproof jacket as weather can change quickly. Summers are mild with occasional rain.',
      months: [
        { month: 'Jan', highC: 8, lowC: 3, rainMm: 80, sunDays: 2, seaTempC: 9 },
        { month: 'Feb', highC: 8, lowC: 3, rainMm: 56, sunDays: 3, seaTempC: 8 },
        { month: 'Mar', highC: 10, lowC: 4, rainMm: 62, sunDays: 4, seaTempC: 9 },
        { month: 'Apr', highC: 13, lowC: 5, rainMm: 48, sunDays: 5, seaTempC: 10 },
        { month: 'May', highC: 16, lowC: 8, rainMm: 55, sunDays: 6, seaTempC: 12 },
        { month: 'Jun', highC: 19, lowC: 11, rainMm: 52, sunDays: 7, seaTempC: 14 },
        { month: 'Jul', highC: 21, lowC: 13, rainMm: 45, sunDays: 8, seaTempC: 17 },
        { month: 'Aug', highC: 21, lowC: 13, rainMm: 54, sunDays: 7, seaTempC: 17 },
        { month: 'Sep', highC: 18, lowC: 11, rainMm: 68, sunDays: 5, seaTempC: 17 },
        { month: 'Oct', highC: 15, lowC: 9, rainMm: 71, sunDays: 4, seaTempC: 15 },
        { month: 'Nov', highC: 11, lowC: 5, rainMm: 78, sunDays: 2, seaTempC: 12 },
        { month: 'Dec', highC: 9, lowC: 4, rainMm: 84, sunDays: 2, seaTempC: 10 },
      ],
      bestTime: {
        overall: 'May to September offers the warmest and driest weather',
        hottest: 'July and August being peak months',
        quietest: 'Spring (April to May) and early autumn (September) offer pleasant conditions with fewer crowds',
        recommendation: 'May to September for warm weather.',
      },
    },

    // FAQ section (10 questions - V4 format)
    faq: [
      { 
        question: 'Is Southampton walkable from the cruise port?', 
        answer: 'Yes, but it depends on your terminal. City and Horizon terminals are 15 to 20 minutes walk to the city centre on flat ground. Ocean terminal is about 25 minutes. QEII and Mayflower terminals are further and most passengers prefer a taxi or shuttle.' 
      },
      { 
        question: 'How long do you need in Southampton?', 
        answer: 'Half a day is enough to see the main sights including SeaCity Museum, the medieval walls, and shopping at Westquay. Allow a full day if you want to visit Stonehenge or the New Forest.' 
      },
      { 
        question: 'Is English widely spoken in Southampton?', 
        answer: 'Yes, English is the first language. Southampton is multicultural with some European languages spoken, but you will have no communication issues.' 
      },
      { 
        question: 'Is Southampton safe for tourists?', 
        answer: 'Very safe. The city centre and tourist areas are well patrolled and busy during the day. Use normal precautions at night.' 
      },
      { 
        question: 'Is Southampton expensive?', 
        answer: 'Moderate by UK standards. Cafes and casual restaurants are affordable, while attractions like SeaCity Museum offer good value. London is considerably more expensive.' 
      },
      { 
        question: 'Do I need cash in Southampton or can I use card?', 
        answer: 'Card payments are accepted almost everywhere, including contactless up to a generous limit. Cash is rarely necessary but useful for small purchases under a few pounds.' 
      },
      { 
        question: 'Should I book a ship excursion or explore independently?', 
        answer: 'Southampton is very easy to explore independently if staying local. For Stonehenge, ship excursions guarantee return to the ship but independent tours or car hire offer more flexibility at similar or lower cost.' 
      },
      { 
        question: 'What is the best thing to do in Southampton on a cruise day?', 
        answer: 'Visit the SeaCity Museum to learn about the Titanic connection, then walk the medieval walls and explore the Old Town before lunch at Town Quay watching the ships come and go.' 
      },
      { 
        question: 'Can you do Stonehenge from Southampton on a cruise day?', 
        answer: 'Yes, Stonehenge is about an hour\'s drive. Many cruise excursions and private tours visit Stonehenge with time to spare. Allow at least 4 hours total.' 
      },
      { 
        question: 'Is Southampton good for families with children?', 
        answer: 'Yes, the SeaCity Museum has excellent interactive exhibits, and Westquay offers cinema, bowling, and family restaurants. The New Forest and Beaulieu are excellent for a day out with kids.' 
      },
    ],

    // Practical information
    practicalInfo: {
      bestTimeToVisit: 'May to September for warm weather',
      cruiseTerminals: ['City', 'Horizon', 'Ocean', 'Mayflower', 'QEII'],
      nearbyAirport: 'Southampton Airport (4 miles), London Heathrow (75 miles)',
      visaInfo: 'UK visa rules apply - EU citizens need passport, check requirements for other nationalities',
      emergencyNumber: '999 for emergencies, 111 for non-urgent medical advice',
      tippingCustom: 'Optional, 10 to 15 percent for good restaurant service',
      siestaShopClosing: 'Generally 9am to 6pm, Westquay until 9pm, reduced Sunday hours',
    },
    
    // Related destinations (for internal linking)
    relatedDestinations: ['norwegian-fjords-cruises', 'mediterranean-cruises', 'caribbean-cruises'],
    
    // SEO metadata
    meta: {
      title: 'Southampton Cruise Port Guide | Britain\'s Cruise Capital',
      description: 'Complete guide to Southampton cruise port. Britain\'s premier cruise hub with Titanic heritage, medieval walls, and gateway to Stonehenge, Winchester, and the New Forest.',
      keywords: ['Southampton cruise port', 'Southampton cruise terminal', 'things to do Southampton', 'Southampton shore excursions', 'UK cruise port', 'Titanic Southampton'],
    },
    
    // Content status
    status: 'published', // template | draft | review | published
    lastUpdated: '2026-01-17',
  },
  
  {
    id: 'dover',
    slug: 'dover',
    name: 'Dover',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 51.1279, lon: 1.3134 },
    tagline: 'Britain\'s White Cliffs gateway where history guards the Channel',
    description: 'Dover has served as England\'s gateway to the continent for over 2,000 years, and today its dramatic White Cliffs remain one of Britain\'s most recognisable natural landmarks. The port operates three modern cruise terminals at the Western Docks, with most ships arriving early morning and departing in the evening. Dominating the skyline above the port sits Dover Castle, known as the "Key to England," guarding the shortest sea crossing to Europe.',
    portCharacter: 'gateway',
    
    aboutPort: {
      overview: 'Dover has served as England\'s gateway to the continent for over 2,000 years. The chalk cliffs that tower above the harbour have inspired poets and musicians, symbolising homecoming for generations of British travellers. While Dover town itself is modest, the surrounding area offers excellent day trip options including Canterbury Cathedral.',
      terminals: 'Western Docks with 3 cruise terminals',
      shuttleServices: 'Most cruise lines offer shuttles to town centre and Dover Castle for around 5 pounds return',
      walkability: 'Town centre is walkable (10-15 mins), White Cliffs require bus or taxi',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'London Gatwick',
        distance: '88 miles',
        options: 'London Gatwick (88 miles), London Heathrow (95 miles)',
      },
      trains: {
        mainStation: 'Dover Priory Station',
        description: 'High-speed trains to London St Pancras in 60 minutes. Regular services to Canterbury and Kent network.',
        localHubs: 'Dover Priory is 20-minute walk or short taxi from terminals.',
      },
    },
    
    gettingAround: {
      fromPort: 'Town centre 10 to 15 minutes walk from cruise terminals. Shuttle buses to Dover Castle and White Cliffs available.',
      publicTransport: 'Bus 80 from Pencester Road to White Cliffs visitor centre. Buses to Canterbury (20-30 minute drive).',
      taxis: 'Taxis readily available outside terminals for trips to castle, cliffs, or Canterbury.',
      walkingDistance: 'Town centre walkable. White Cliffs visitor centre 45-60 mins walk with steep steps. Dover Castle 40 mins uphill.',
      sightseeingBus: 'Shuttle buses offered by cruise lines stop at town centre and Dover Castle.',
      accessibility: 'Terminals fully accessible. Seafront flat. Castle and cliffs have steep paths with limited wheelchair access.',
    },
    
    mustSeeSights: [
      {
        title: 'Dover Castle',
        category: 'landmark',
        description: 'Known as the "Key to England," this is the largest castle in the country and has defended Britain\'s shores for over 900 years. The Great Tower recreates Henry II\'s medieval court, while the Secret Wartime Tunnels reveal the underground headquarters where Operation Dynamo, the evacuation of Dunkirk, was coordinated.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'The Secret Wartime Tunnels tours book up quickly - head here first',
          'Allow time for the Roman lighthouse, one of only three surviving in the world',
          'The views over the Channel to France are stunning from the battlements',
        ],
        highlights: ['History', 'Architecture', 'Views', 'Museums'],
        goodFor: ['History buffs', 'Families', 'First-time visitors', 'Photographers'],
      },
      {
        title: 'White Cliffs of Dover',
        category: 'nature',
        description: 'These iconic chalk cliffs have symbolised Britain for centuries. The National Trust manages the visitor centre and walking trails, which offer stunning views across the Channel to France on clear days. The cliff-top paths lead to the South Foreland Lighthouse where you can tour the tower and enjoy cream teas.',
        duration: '2 to 4 hours for a relaxed pace depending on walking',
        tips: [
          'Check visibility before visiting - cloudy days limit views to France',
          'Wear sturdy footwear as paths can be muddy after rain',
          'The cafe at the visitor centre has excellent views',
        ],
        highlights: ['Nature', 'Views', 'Photography', 'Scenic'],
        goodFor: ['Active travelers', 'Photographers', 'Nature lovers', 'Couples'],
      },
      {
        title: 'Canterbury Cathedral',
        category: 'historic',
        description: 'One of the oldest and most important Christian sites in England, this UNESCO World Heritage cathedral has been a pilgrimage destination since the murder of Archbishop Thomas Becket in 1170. The stunning stained glass windows, atmospheric crypt, and Gothic architecture are awe-inspiring. The medieval city around it offers charming streets, excellent shopping, and punting on the River Stour.',
        duration: '3 to 5 hours including travel for a relaxed pace',
        tips: [
          'Check for Evensong times if you want to experience a choral service',
          'The cathedral may close for special services - verify opening times',
          'Allow time to explore the medieval streets and Westgate Towers',
        ],
        highlights: ['History', 'Architecture', 'Religious', 'Culture', 'Art'],
        goodFor: ['History buffs', 'Architecture lovers', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'South Foreland Lighthouse',
        category: 'historic',
        description: 'This beautiful Victorian lighthouse perched on the White Cliffs was the first to use electric light and where Marconi conducted pioneering radio experiments. Guided tours take you up the tower for panoramic views, and the tea room in the former keeper\'s cottage serves excellent cream teas.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'The walk from the White Cliffs visitor centre takes about an hour each way',
          'Cream tea with scones is a must',
          'Check opening times as it\'s not open every day',
        ],
        highlights: ['History', 'Views', 'Photography'],
        goodFor: ['History buffs', 'Active travelers', 'Photographers'],
      },
      {
        title: 'Dover Museum and Bronze Age Boat',
        category: 'historic',
        description: 'Home to the world\'s oldest known seagoing vessel, a 3,500-year-old wooden boat discovered during road works in 1992. The museum spans three floors covering the history of Dover from ancient times to the present. Interactive exhibits and the remarkable boat gallery make it suitable for all ages.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Free entry makes this excellent value',
          'The boat gallery on the top floor is the highlight',
          'Good wet weather alternative',
        ],
        highlights: ['History', 'Museums', 'Family-friendly'],
        goodFor: ['History buffs', 'Families', 'Rainy day visitors'],
      },
      {
        title: 'Leeds Castle',
        category: 'landmark',
        description: 'Often called the loveliest castle in the world, Leeds Castle sits on two islands in a lake surrounded by 500 acres of beautiful parkland. The castle has been home to six medieval queens of England and offers gardens, a maze, birds of prey displays, and elegant interiors to explore.',
        duration: '4 to 5 hours including travel for a relaxed pace',
        tips: [
          'The maze and grotto are popular with children',
          'Birds of prey displays run at set times',
          'Consider pre-booking tickets online',
        ],
        highlights: ['Architecture', 'Gardens', 'History', 'Family-friendly'],
        goodFor: ['Families', 'History buffs', 'Photographers', 'Couples'],
      },
      {
        title: 'Western Heights',
        category: 'historic',
        description: 'A vast Napoleonic-era fortification carved into the cliffs above Dover, featuring the unique triple spiral staircase of the Grand Shaft. The fortifications offer excellent walking with views over the harbour and town. Less visited than the castle, this provides a quieter historical experience.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'The Grand Shaft tours are excellent but run at limited times',
          'The Drop Redoubt is atmospheric and often empty',
          'Good views of cruise ships in the harbour',
        ],
        highlights: ['History', 'Views', 'Architecture'],
        goodFor: ['History buffs', 'Active travelers', 'Solo travelers'],
      },
      {
        title: 'St Margaret\'s Bay',
        category: 'stroll',
        description: 'A charming village and beach nestled beneath the White Cliffs, where Noel Coward and Ian Fleming once had homes. The pebble beach is quieter than Dover, with a pleasant pub and tea rooms. Access to the cliff-top path to South Foreland Lighthouse.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'The Coastguard pub has excellent views and food',
          'Park at the top and walk down to the beach',
          'Combine with a lighthouse visit for a full day',
        ],
        highlights: ['Beaches', 'Views', 'Food', 'Nature'],
        goodFor: ['Couples', 'Foodies', 'Relaxation seekers'],
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Dover Castle',
        description: 'Largest castle in the country with Secret Wartime Tunnels and Great Tower.',
        duration: 'Half day',
        bookWith: 'Independent or ship excursion',
      },
      {
        title: 'Canterbury Cathedral',
        description: 'UNESCO World Heritage cathedral, 20-30 minute drive from Dover.',
        duration: 'Half day',
        bookWith: 'Independent or ship excursion',
      },
      {
        title: 'White Cliffs of Dover',
        description: 'Iconic chalk cliffs with National Trust visitor centre and walking trails.',
        duration: 'Half day',
        bookWith: 'Independent recommended',
      },
    ],
    
    nearestBeach: {
      name: 'Dover Beach',
      distance: '10-15 minutes walk',
      description: 'Long shingle beach stretching along the seafront below the White Cliffs. A working harbour beach with views of ferries and cruise ships, plus the cliffs as a stunning backdrop. ~14°C in summer.',
    },
    
    foodAndDrink: [
      {
        name: 'Cullins Yard',
        type: 'Restaurant',
        description: 'Contemporary waterfront dining with local seafood at Dover Marina.',
      },
      {
        name: 'The Coastguard',
        type: 'Pub',
        description: 'Traditional pub with stunning cliff views at St Margaret\'s Bay.',
      },
      {
        name: 'The Allotment',
        type: 'Cafe',
        description: 'Modern British cafe with fresh local produce on High Street.',
      },
      {
        name: 'National Trust Cafe',
        type: 'Cafe',
        description: 'Cliff-top views and cream teas at White Cliffs visitor centre.',
      },
      {
        name: 'The White Horse',
        type: 'Pub',
        description: 'Historic pub near the castle on Castle Street.',
      },
    ],
    
    insiderTips: [
      'The shuttle buses offered by cruise lines stop at both the town centre and Dover Castle, saving a steep 40 minute walk uphill',
      'If you want to see the White Cliffs without the hour-long walk from the port, take the shuttle to the castle and enjoy cliff views from the battlements',
      'Catch bus 80 from Pencester Road to the White Cliffs visitor centre',
      'Cruise season runs primarily April to October; visits outside this period are rare',
      'The walk to the White Cliffs visitor centre from the port takes 45 to 60 minutes and includes steep steps',
      'Canterbury is a 20 to 30 minute drive or bus ride - allow at least 3 hours for a visit',
      'Check visibility before planning cliff walks as views to France disappear in fog or haze',
      'Dover Castle and tunnels open at 10am; Secret Wartime Tunnels book up quickly',
    ],
    
    weather: {
      intro: '14 to 20°C in summer, 10 to 15°C in spring and autumn. Exposed cliff tops can be windy and cool even in summer. Pack layers and a windproof jacket for walks.',
      months: [
        { month: 'Jan', highC: 7, lowC: 3, rainMm: 65, sunDays: 2, seaTempC: 8 },
        { month: 'Feb', highC: 7, lowC: 3, rainMm: 45, sunDays: 3, seaTempC: 7 },
        { month: 'Mar', highC: 10, lowC: 4, rainMm: 50, sunDays: 4, seaTempC: 8 },
        { month: 'Apr', highC: 12, lowC: 6, rainMm: 45, sunDays: 5, seaTempC: 10 },
        { month: 'May', highC: 16, lowC: 9, rainMm: 45, sunDays: 6, seaTempC: 12 },
        { month: 'Jun', highC: 19, lowC: 12, rainMm: 50, sunDays: 7, seaTempC: 14 },
        { month: 'Jul', highC: 21, lowC: 14, rainMm: 45, sunDays: 7, seaTempC: 16 },
        { month: 'Aug', highC: 21, lowC: 14, rainMm: 55, sunDays: 7, seaTempC: 17 },
        { month: 'Sep', highC: 18, lowC: 12, rainMm: 60, sunDays: 5, seaTempC: 16 },
        { month: 'Oct', highC: 14, lowC: 9, rainMm: 70, sunDays: 4, seaTempC: 14 },
        { month: 'Nov', highC: 10, lowC: 6, rainMm: 75, sunDays: 2, seaTempC: 12 },
        { month: 'Dec', highC: 8, lowC: 4, rainMm: 70, sunDays: 2, seaTempC: 10 },
      ],
      bestTime: {
        overall: 'May to September offers the warmest and most stable weather',
        hottest: 'July and August are peak months but can be busy',
        quietest: 'Late spring (May to June) often provides clear visibility for seeing France',
        recommendation: 'May to September for warm weather and clear days.',
      },
    },
    
    faq: [
      {
        question: 'Is Dover walkable from the cruise port?', 
        answer: 'Yes, the town centre is 10 to 15 minutes flat walk from the cruise terminals. However, Dover Castle requires a steep 40 minute uphill walk or shuttle bus, and the White Cliffs visitor centre is about an hour\'s walk including steep steps.' 
      },
      { 
        question: 'How long do you need in Dover?', 
        answer: 'Most cruise calls allow 8 to 10 hours. You can see Dover Castle and the White Cliffs in a full day, or combine Dover Castle with a trip to Canterbury. The town itself can be seen in a couple of hours.' 
      },
      { 
        question: 'Is English widely spoken in Dover?', 
        answer: 'Yes, English is the first language throughout. Dover sees many international visitors from the ferry port and cruise ships.' 
      },
      { 
        question: 'Is Dover safe for tourists?', 
        answer: 'Very safe. The town centre and tourist areas are well patrolled. Use normal precautions especially on quieter cliff paths.' 
      },
      { 
        question: 'Is Dover expensive?', 
        answer: 'Moderate by UK standards. Attraction entry fees are in line with other English Heritage and National Trust properties. Eating out is affordable compared to London.' 
      },
      { 
        question: 'Do I need cash in Dover or can I use card?', 
        answer: 'Card payments are widely accepted including contactless. Cash is rarely necessary but useful for small purchases.' 
      },
      { 
        question: 'Should I book a ship excursion or explore independently?', 
        answer: 'Dover Castle and the White Cliffs are easy to visit independently using the shuttle bus. For Canterbury or Leeds Castle, ship excursions guarantee return times but independent transport is straightforward if you plan carefully.' 
      },
      { 
        question: 'What is the best thing to do in Dover on a cruise day?', 
        answer: 'Dover Castle is the must-see attraction, especially the Secret Wartime Tunnels. If weather is good, combine with a walk along the White Cliffs to South Foreland Lighthouse. If weather is poor, focus on the castle\'s indoor areas.' 
      },
      { 
        question: 'Can you see France from Dover?', 
        answer: 'Yes, on clear days France is clearly visible across the 21-mile strait from the castle, cliff tops, and even the harbour. Check visibility before planning cliff walks as views disappear in fog or haze.' 
      },
      { 
        question: 'Is Dover good for families with children?', 
        answer: 'Dover Castle is excellent for families with interactive medieval displays and exciting wartime tunnels. The cliff walks are spectacular but require supervision. Canterbury offers more variety for a family day out.' 
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to September for warm weather and clear days',
      cruiseTerminals: ['Terminal 1 (historic Marine Station)', 'Terminal 2', 'Terminal 3'],
      nearbyAirport: 'London Gatwick (88 miles), London Heathrow (95 miles)',
      visaInfo: 'UK visa rules apply - EU citizens need passport, check requirements for other nationalities',
      emergencyNumber: '999 for emergencies, 111 for non-urgent medical advice',
      tippingCustom: 'Optional, 10 to 15 percent for good restaurant service',
      siestaShopClosing: 'Generally 9am to 5.30pm, earlier closing on Sundays',
    },
    
    relatedDestinations: ['british-isles-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Dover Cruise Port Guide | White Cliffs & Canterbury',
      description: 'Complete guide to Dover cruise port. Explore Dover Castle, walk the iconic White Cliffs, visit Canterbury Cathedral, and discover Britain\'s gateway to Europe.',
      keywords: ['Dover cruise port', 'Dover white cliffs', 'Dover castle', 'Canterbury from Dover', 'UK cruise terminal', 'Dover shore excursions'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
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
      language: 'Spanish, Catalan',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
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
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Málaga-Costa del Sol Airport (AGP)',
        distance: 'Around 8 to 12 kilometres south-west of the city, typically 15 to 20 minutes by road in normal traffic',
        options: 'Taxi: Direct road transfer between port and airport usually takes 15 to 20 minutes. Train: Cercanías line C1 runs between the airport and Málaga María Zambrano station; from there it is about a 15-minute walk or a 5-minute taxi ride to the cruise area, giving a total journey of roughly 30 to 40 minutes. Bus: Airport buses also run into the city centre, from where you can walk or take a short taxi to the port.',
      },
      trains: {
        mainStation: 'Málaga María Zambrano (mainline and AVE), with Málaga Centro-Alameda as a nearby inner-city stop',
        description: 'High-speed AVE and long-distance services connect Málaga with Madrid and other major Spanish cities, while regional trains link it with Córdoba, Seville and the wider Andalusian network',
        localHubs: 'María Zambrano serves as the primary hub for both high-speed and local Cercanías services along the coast and inland, making onward travel straightforward for pre- and post-cruise stays',
      },
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
      nearbyAirport: 'Málaga-Costa del Sol Airport (AGP), approximately 8 to 12 kilometres from the cruise port',
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
      language: 'Portuguese',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },

    transportConnections: {
      airport: {
        name: 'Humberto Delgado Airport (LIS)',
        distance: '8km, 15 to 20 minutes by taxi/metro',
        options: 'Metro red line (20 minutes) or Aerobus',
      },
      trains: {
        mainStation: 'Santa Apolónia Station',
        description: 'To Porto, Algarve; local to Sintra/Cascais',
        localHubs: 'Adjacent to main terminal',
      },
    },
    
    gettingAround: {
      fromPort: 'Exit terminals for 10 to 15 minute riverside stroll to Praça do Comércio.',
      publicTransport: 'Trams 15E and elevators (Santa Justa) conquer hills; taxis/Uber plentiful.',
      taxis: 'Taxis and Uber plentiful at terminals and central squares.',
      walkingDistance: 'Distances: Alfama 20 minutes uphill, Belém 30 minutes tram.',
      sightseeingBus: 'Hop-on hop-off buses loop Belém, Alfama, and castles (90-minute circuit, terminal stops).',
    },
    
    mustSeeSights: [
      {
        title: 'Praça do Comércio & Arco da Rua Augusta',
        category: 'landmark',
        description: 'Grand riverside square framed by triumphal arch; climb for Tagus panoramas and city views.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Morning before coaches arrive',
          'Free square access',
          'Arch lift queues short early',
        ],
        highlights: ['Architecture', 'Views', 'History', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers'],
      },
      {
        title: 'Alfama District',
        category: 'historic',
        description: 'Maze of laundry-lined alleys, fado houses, and São Jorge Castle walls; Lisbon\'s oldest quarter.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Wear comfy shoes for cobbles',
          'Free viewpoints',
          'Evening fado after 8pm',
        ],
        highlights: ['History', 'Culture', 'Architecture', 'Photography'],
        goodFor: ['Culture seekers', 'History buffs'],
      },
      {
        title: 'Elevador de Santa Justa & Chiado',
        category: 'stroll',
        description: 'Neo-Gothic lift to rooftop views over Baixa; descend to elegant shopping streets.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Buy lift ticket downstairs',
          'Skip peak lunch',
          'Chiado cafes nearby',
        ],
        highlights: ['Views', 'Architecture', 'Shopping'],
        goodFor: ['First-time visitors', 'Photographers'],
      },
      {
        title: 'Sé de Lisboa Cathedral',
        category: 'historic',
        description: '12th-century fortress-church with Romanesque cloister and royal pantheon.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Morning light in cloister',
          'Modest dress required',
          'Free entry except cloister',
        ],
        highlights: ['Architecture', 'History', 'Religious'],
        goodFor: ['History buffs', 'Architecture lovers'],
      },
      {
        title: 'Miradouro da Senhora do Monte',
        category: 'nature',
        description: 'Hilltop panorama over castle, river, and red rooftops; tram 28E stop nearby.',
        duration: '30 minutes to 45 minutes for a relaxed pace',
        tips: [
          'Sunset golden hour',
          'Picnic tables available',
          'Avoid night alone',
        ],
        highlights: ['Views', 'Photography', 'Nature'],
        goodFor: ['Photographers', 'Couples'],
      },
      {
        title: 'LX Factory',
        category: 'markets',
        description: 'Converted industrial warehouses with street art, boutiques, and Time Out Market food hall.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Tram 15E direct',
          'Weekends liveliest',
          'Street food variety',
        ],
        highlights: ['Culture', 'Food', 'Shopping', 'Art'],
        goodFor: ['Foodies', 'Culture seekers'],
      },
      {
        title: 'Belém Tower & Pastéis de Belém',
        category: 'excursion',
        description: 'Manueline fortress and original custard tart bakery, 30 minutes by tram.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Tram 15E from terminal',
          'Queue early for pastéis',
          'Tower tickets online',
        ],
        highlights: ['Architecture', 'History', 'Food'],
        goodFor: ['First-time visitors', 'Foodies'],
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
      name: 'Cascais Beaches',
      description: 'Cascais is a charming coastal town with several sandy beaches including Praia da Rainha, Praia da Conceição, and the larger Praia de Carcavelos. While not within walking distance from Lisbon\'s cruise port, Cascais is easily accessible by train and offers a pleasant seaside escape with promenade, cafés, and good swimming conditions.',
      gettingThere: 'From Santa Apolónia cruise terminal area, walk to Cais do Sodré station (or take metro). Direct trains to Cascais run every 20 minutes along the scenic coastal route. Journey time is approximately 40 minutes. The beaches are a short walk from Cascais station.',
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
        name: 'Time Out Market',
        type: 'Food Hall',
        description: '30+ stalls from Michelin chefs to pastéis. LX Factory area, tram access.',
      },
      {
        name: 'Pastéis de Belém',
        type: 'Cafe',
        description: 'Original custard tarts since 1837. Belém district.',
      },
      {
        name: 'Alfama fado houses',
        type: 'Restaurant',
        description: 'Traditional music with codfish dinner. Evening in old quarter.',
      },
      {
        name: 'Baixa cafes',
        type: 'Cafe',
        description: 'Galão coffee and bifana sandwiches. Near Santa Justa lift.',
      },
    ],
    
    insiderTips: [
      'Buy Viva Viagem card for all-day trams/metro; validate on board.',
      'Pickpockets target tram 28E and elevators; use cross-body bags.',
      'Visit sights 9 to 11am before cruise groups; afternoons quieter.',
      'Walk Baixa/Alfama; trams for hills/Belém; Uber reliable.',
      'Cards widely used; euros for markets; 10% tip optional restaurants.',
      'Churches require shoulders/knees covered; siesta minimal impact.',
      'Avoid souvenir stalls at miradouros; LX Factory better artisanal.',
      'Free terminal WiFi; Google Translate for menus.',
    ],

    weather: {
      intro: 'Typical monthly climate averages for Lisbon, rounded.',
      months: [
        { month: 'Jan', highC: 15, lowC: 9, rainMm: 110, sunDays: 10, seaTempC: 14 },
        { month: 'Feb', highC: 15, lowC: 9, rainMm: 100, sunDays: 12, seaTempC: 14 },
        { month: 'Mar', highC: 17, lowC: 11, rainMm: 80, sunDays: 15, seaTempC: 15 },
        { month: 'Apr', highC: 19, lowC: 12, rainMm: 70, sunDays: 18, seaTempC: 16 },
        { month: 'May', highC: 22, lowC: 15, rainMm: 60, sunDays: 21, seaTempC: 18 },
        { month: 'Jun', highC: 25, lowC: 18, rainMm: 40, sunDays: 24, seaTempC: 20 },
        { month: 'Jul', highC: 28, lowC: 20, rainMm: 30, sunDays: 27, seaTempC: 21 },
        { month: 'Aug', highC: 28, lowC: 20, rainMm: 30, sunDays: 26, seaTempC: 22 },
        { month: 'Sep', highC: 26, lowC: 18, rainMm: 50, sunDays: 23, seaTempC: 21 },
        { month: 'Oct', highC: 23, lowC: 16, rainMm: 90, sunDays: 19, seaTempC: 19 },
        { month: 'Nov', highC: 19, lowC: 12, rainMm: 120, sunDays: 13, seaTempC: 17 },
        { month: 'Dec', highC: 16, lowC: 10, rainMm: 130, sunDays: 10, seaTempC: 15 },
      ],
      bestTime: {
        overall: 'May to October for mild sun.',
        hottest: 'Peak season (Jul-Aug): Festivals but crowded.',
        quietest: 'Quieter months (May, Sep): Perfect weather.',
        recommendation: 'First-timers: May to Jun balance.',
      },
    },

    faq: [
      {
        question: 'Is Lisbon walkable from the cruise port?',
        answer: 'Yes, 10 to 15 minutes flat to Baixa square.',
      },
      {
        question: 'How long do you need in Lisbon?',
        answer: '8 to 10 hours for core districts and Belém.',
      },
      {
        question: 'Is English widely spoken in Lisbon?',
        answer: 'Yes in tourist zones, trams, restaurants.',
      },
      {
        question: 'Is Lisbon safe for tourists?',
        answer: 'Safe overall; watch bags on trams/elevators.',
      },
      {
        question: 'Is Lisbon expensive?',
        answer: 'Moderate; pastéis cheap, dining varies.',
      },
      {
        question: 'Do I need cash in Lisbon or can I use card?',
        answer: 'Cards dominant; euros for trams/markets.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent for city; ship for Sintra.',
      },
      {
        question: 'What is the best thing to do in Lisbon on a cruise day?',
        answer: 'Alfama wander to Santa Justa views.',
      },
      {
        question: 'Is Lisbon wheelchair accessible?',
        answer: 'Centre mixed (hills/cobbles); trams/elevators help.',
      },
      {
        question: 'Is Lisbon good for limited mobility?',
        answer: 'Partial; flat Baixa yes, Alfama challenging.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to October',
      cruiseTerminals: ['Santa Apolónia', 'Jardim do Tabaco', 'Alcântara'],
      parking: 'Not applicable',
      nearbyAirport: 'Humberto Delgado (LIS), 8km',
      visaInfo: 'None (Schengen 90/180 days)',
    },
    
    relatedDestinations: ['mediterranean-cruises'],
    
    meta: {
      title: 'Lisbon Cruise Port Guide 2026 | Alfama, Belém Tower & Pastéis de Nata',
      description: '2026 Lisbon cruise port guide. Walk to Alfama old town, iconic Tram 28, Belém Tower, pastéis de nata, fado music. Seven hills, stunning viewpoints. Insider tips from real cruisers.',
      keywords: ['Lisbon cruise port', 'Lisbon port guide', 'Lisbon things to do', 'Alfama walking', 'Tram 28 Lisbon', 'Belém Tower visit', 'pastéis de nata', 'Lisbon viewpoints', 'Santa Apolónia terminal', 'Sintra day trip'],
    },

    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s Rossio',
        location: 'Praça Dom Pedro IV 81-83, city centre',
        walkingTime: '20 minutes from cruise port or 10 minutes taxi',
        notes: 'Central location. Opens 8:00 AM. Also McDonald\'s in Belém near monuments.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+Rossio+Lisbon&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP Rua Augusta',
        location: 'Rua Augusta 184, Baixa district',
        walkingTime: '20 minutes from port',
        notes: 'Central shopping street. Quirky gifts and toys for kids.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+Rua+Augusta+Lisbon&travelmode=walking',
      },
      localPark: {
        name: 'Jardim da Estrela',
        location: 'Near Estrela Basilica',
        walkingTime: '15 minutes taxi from port',
        facilities: 'Playgrounds, duck pond, shaded areas, café on site',
        notes: 'Beautiful park perfect for families. Kids love feeding the ducks.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Jardim+da+Estrela+Lisbon&travelmode=walking',
      },
      themePark: {
        name: 'Lisbon Zoo (Jardim Zoológico)',
        location: 'North Lisbon (20 minutes by metro)',
        type: 'Zoo',
        highlights: 'Dolphin shows, cable car, pandas, giraffes, large play areas',
        cost: 'Adults €25, kids 3-12 €17',
        hours: '10:00 AM to 6:00 PM',
        notes: 'Full-day activity. Metro from Cais do Sodré. Very popular with families.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Jardim+Zoologico+Lisboa&travelmode=walking',
      },
      beachOption: 'No city beach in Lisbon port area. Nearest beaches are Cascais or Costa da Caparica (30-40 minutes away).',
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
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
      language: 'Spanish',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Tenerife North - Ciudad de La Laguna Airport (TFN) and Tenerife South Airport (TFS)',
        distance: 'Tenerife North is about 10 to 15 kilometres from Santa Cruz (around 15 to 20 minutes by road), while Tenerife South is roughly 60 kilometres away (around 45 to 60 minutes by road)',
        options: 'Taxis connect the port with both airports, typically taking around 15 to 20 minutes to Tenerife North and 45 to 60 minutes to Tenerife South depending on traffic. TITSA buses operate frequent services between Santa Cruz bus station (Intercambiador) and both airports; from the bus station it is a short taxi or 15 to 20 minute walk to the port area. There is no direct train service on Tenerife.',
      },
      trains: {
        mainStation: 'No conventional railway network on Tenerife',
        description: 'There is no conventional railway network on Tenerife; public transport relies on buses and tram. The tram links Santa Cruz with La Laguna, and buses connect to most major resorts and towns around the island.',
        localHubs: 'The modern tram (Tranvía de Tenerife) links Santa Cruz with La Laguna inland, reachable after a short walk or bus ride from the centre.',
      },
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
      intro: 'Year-round subtropical bliss with consistent mild temperatures and plenty of sunshine.',
      months: [
        { month: 'Jan', highC: 20, lowC: 15, rainMm: 30, sunDays: 20, seaTempC: 20 },
        { month: 'Feb', highC: 20, lowC: 15, rainMm: 25, sunDays: 21, seaTempC: 20 },
        { month: 'Mar', highC: 22, lowC: 16, rainMm: 20, sunDays: 23, seaTempC: 20 },
        { month: 'Apr', highC: 23, lowC: 17, rainMm: 15, sunDays: 24, seaTempC: 21 },
        { month: 'May', highC: 25, lowC: 19, rainMm: 10, sunDays: 26, seaTempC: 22 },
        { month: 'Jun', highC: 27, lowC: 21, rainMm: 5, sunDays: 28, seaTempC: 23 },
        { month: 'Jul', highC: 29, lowC: 22, rainMm: 5, sunDays: 30, seaTempC: 24 },
        { month: 'Aug', highC: 30, lowC: 23, rainMm: 5, sunDays: 29, seaTempC: 25 },
        { month: 'Sep', highC: 29, lowC: 22, rainMm: 10, sunDays: 27, seaTempC: 25 },
        { month: 'Oct', highC: 27, lowC: 21, rainMm: 20, sunDays: 25, seaTempC: 24 },
        { month: 'Nov', highC: 24, lowC: 18, rainMm: 30, sunDays: 22, seaTempC: 22 },
        { month: 'Dec', highC: 22, lowC: 16, rainMm: 35, sunDays: 20, seaTempC: 21 },
      ],
      bestTime: {
        overall: 'Year-round subtropical bliss with consistent mild temperatures.',
        hottest: 'Peak season (Jul-Aug): Families/beaches (cons: busier).',
        quietest: 'Quieter months (Apr-May, Oct): Hiking perfect (pros).',
        recommendation: 'First-timers: Spring for wildflowers and ideal hiking conditions.',
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
      bestTimeToVisit: 'Year-round',
      cruiseTerminals: ['Muelle Sur', 'Muelle Ribera'],
      nearbyAirport: 'Tenerife Norte (TFN), 10km',
      visaInfo: 'None (Schengen 90/180 days)',
    },
    
    relatedDestinations: ['canary-islands-cruises'],
    
    meta: {
      title: 'Santa Cruz de Tenerife Cruise Port Guide 2026 | Mount Teide & Year-Round Sun',
      description: '2026 Santa Cruz de Tenerife cruise port guide. Spain\'s highest peak Mount Teide, golden beaches, tax-free shopping, year-round sunshine. Siam Park & Loro Parque nearby. Insider tips from real cruisers.',
      keywords: ['Santa Cruz de Tenerife cruise port', 'Tenerife cruise port', 'Mount Teide excursion', 'Tenerife things to do', 'Canary Islands duty free', 'Siam Park Tenerife', 'Loro Parque', 'Tenerife beaches', 'Plaza de España Tenerife', 'Puerto de la Cruz'],
    },

    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s Santa Cruz',
        location: 'Calle Castillo, 12, city centre',
        walkingTime: '10-15 minutes from port',
        notes: 'Main shopping street. Several branches throughout city.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+Calle+Castillo+Santa+Cruz+Tenerife&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP Calle Castillo',
        location: 'Calle del Castillo, 43, Santa Cruz',
        walkingTime: '10-15 minutes from port',
        notes: 'Main shopping street. Gifts, toys, and novelties.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+Calle+Castillo+Santa+Cruz+Tenerife&travelmode=walking',
      },
      localPark: {
        name: 'Parque García Sanabria',
        location: 'Central Santa Cruz, slightly uphill from port',
        walkingTime: '15-20 minutes walk from port',
        facilities: 'Gardens, fountains, sculpture walks, shaded paths, playgrounds, subtropical plants',
        notes: 'Largest city park. Beautiful for relaxed family strolls. Ideal for quiet break from city streets.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Parque+Garcia+Sanabria+Santa+Cruz+Tenerife&travelmode=walking',
      },
      themePark: {
        name: 'Loro Parque',
        location: 'Puerto de la Cruz (north Tenerife, 45 minutes by taxi or organised tour)',
        type: 'Zoo and marine park',
        highlights: 'World-famous parrot collection, dolphin shows, orca shows, sea lion shows, Penguin World, tropical gardens',
        cost: 'Adults €42, kids 6-11 €30, under 6 free',
        hours: '9:30 AM to 5:30 PM daily',
        notes: 'World-class attraction. Plan full day. Book tickets in advance. Shows at set times. Consider organised tour from port.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Loro+Parque+Tenerife&travelmode=walking',
      },
      waterPark: {
        name: 'Siam Park',
        location: 'Costa Adeje (south Tenerife, 60 minutes from Santa Cruz port)',
        highlights: 'World-renowned water park with slides for all ages, Lost City for young kids, lazy river, wave pool, big thrill rides',
        notes: 'Full-day activity. Go early to beat crowds. Buy tickets in advance. Combo ticket with Loro Parque available.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Siam+Park+Tenerife&travelmode=walking',
      },
      beachOption: 'Playa de las Teresitas is main beach (8-10 km north, 20 minutes by bus). Golden sand, sheltered bay backed by palm trees, lifeguards, calm waters.',
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
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
    coordinates: { lat: 42.1028, lon: 11.7953 },
    tagline: 'Rome\'s essential cruise gateway',
    description: 'Civitavecchia functions purely as a transport hub for Rome\'s Colosseum, Vatican, and Trevi Fountain, with modern terminals efficiently shuttling passengers to the capital via train or coach. The port town offers basic marina walks and seafood but lacks independent appeal. All focus centres on reaching Rome\'s ancient wonders within tight cruise schedules.',
    
    aboutPort: {
      overview: 'Civitavecchia features multiple terminals (Amerigo Vespucci, Columbus Circle, Intrepida) spread across 1.5km waterfront, handling mega-ships with WiFi, ATMs, and excursion booking desks. Free shuttle trains connect distant berths to main terminal (5 minutes). Port town 15-minute walk offers cafes but no compelling sights; taxis/trains to Rome queue outside.',
      terminals: 'Amerigo Vespucci Terminal, Columbus Circle, Intrepida Terminal across 1.5km waterfront.',
      shuttleServices: 'Free shuttle trains connect distant berths to main terminal (5 minutes).',
      walkability: 'Port town 15-minute walk offers cafes but no compelling sights; Rome requires transport.',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Italian',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: true, // Yes (but minimal attractions)
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'To Rome: High-speed trains from Civitavecchia station (1 hour to Termini, 5 to 15 euros); ship shuttles drop nearby. Private transfers 100 to 200 euros roundtrip.',
      publicTransport: 'Frequent regional trains (every 30 minutes) run to Rome Termini or Ostiense. Trenitalia connects all major Rome stations to Civitavecchia.',
      taxis: 'Fixed fare taxis to Rome available but expensive (100 to 200 euros roundtrip); convenient for groups.',
      walkingDistance: 'Port town: Flat 15-minute walk to Piazza Vittorio Emanuele; minimal buses.',
      sightseeingBus: 'Rome tours depart port (full day 35 euros). Hop-on hop-off buses operate in Rome from stations, not the port.',
      accessibility: 'Terminals have basic accessibility features; Rome sites vary in accessibility.',
    },
    
    transportConnections: {
      airport: {
        name: 'Rome Fiumicino (FCO)',
        distance: '90km, 1 hour taxi/train',
        options: 'Leonardo Express from Roma Termini (30 minutes). Taxi 120 to 160 euros direct to port (1 hour). Train: FCO to Roma Termini (30 minutes), then to Civitavecchia (1 hour); total 1.5 to 2 hours.',
      },
      trains: {
        mainStation: 'Civitavecchia Station (500m from terminals)',
        description: 'Frecciarossa to Rome Termini (40 to 60 minutes), Naples/Florence. Shuttle trains from outer berths.',
        localHubs: 'Rome Termini as primary interchange for high-speed and metro links',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Colosseum & Roman Forum',
        category: 'landmark',
        description: 'Iconic Flavian Amphitheatre and adjacent imperial ruins; gladiator history epicentre.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Book skip-the-line tickets 2 months ahead',
          'Start Forum then Colosseum',
          'Avoid August heat',
        ],
        highlights: ['History', 'Architecture', 'Photography'],
        goodFor: ['First-time visitors', 'History buffs'],
      },
      {
        title: 'Vatican Museums & St. Peter\'s Basilica',
        category: 'historic',
        description: 'Sistine Chapel frescoes, Raphael Rooms, and Michelangelo\'s dome; world\'s largest church.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'Early Vatican tickets essential',
          'Climb dome for views',
          'Sistine last for crowds',
        ],
        highlights: ['Art', 'Religious', 'Architecture', 'Museums'],
        goodFor: ['Art lovers', 'First-time visitors'],
      },
      {
        title: 'Pantheon & Piazza Navona',
        category: 'stroll',
        description: 'Perfectly preserved Roman temple and Bernini fountains amid lively cafe squares.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Pantheon free but queues',
          'Gelato at Piazza Navona',
          'Evening lights magical',
        ],
        highlights: ['Architecture', 'History', 'Culture', 'Food'],
        goodFor: ['First-time visitors', 'Photographers'],
      },
      {
        title: 'Trevi Fountain & Spanish Steps',
        category: 'landmark',
        description: 'Baroque fountain coin toss and elegant staircase shopping/relaxing.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Trevi 8am empty',
          'Climb Spanish Steps to rooftops',
          'Right shoulder coin return',
        ],
        highlights: ['Architecture', 'Photography', 'Shopping'],
        goodFor: ['Photographers', 'Shoppers'],
      },
      {
        title: 'Trastevere Neighbourhood',
        category: 'historic',
        description: 'Medieval lanes, ivy walls, and authentic trattorias away from tourist crush.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Lunch in piazza',
          'Wander ivy alleys',
          'Evening aperitivo authentic',
        ],
        highlights: ['Culture', 'Food', 'History', 'Photography'],
        goodFor: ['Foodies', 'Culture seekers'],
      },
      {
        title: 'Campo de\' Fiori Market',
        category: 'markets',
        description: 'Morning produce stalls, flowers, and central location between Pantheon/Vatican.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Arrive 8am freshest',
          'Coffee at square cafes',
          'Cash for samples',
        ],
        highlights: ['Markets', 'Food', 'Culture'],
        goodFor: ['Foodies', 'First-time visitors'],
      },
    ],
    
    nearestBeach: null,
    
    practicalInfo: {
      bestTimeToVisit: 'Spring/autumn',
      cruiseTerminals: ['Amerigo Vespucci', 'Columbus Circle'],
      parking: 'Not applicable',
      nearbyAirport: 'Fiumicino (FCO), 90km',
      visaInfo: 'None (Schengen 90/180)',
    },
    
    foodAndDrink: [
      {
        name: 'Trastevere trattorias',
        type: 'Restaurant',
        description: 'Cacio e pepe, artichokes in medieval alleys',
      },
      {
        name: 'Campo de\' Fiori cafes',
        type: 'Cafe',
        description: 'Espresso cornetto at market square',
      },
      {
        name: 'Testaccio papardelle',
        type: 'Restaurant',
        description: 'Offal pasta specialists near Pyramid',
      },
      {
        name: 'Piazza Navona gelaterias',
        type: 'Gelateria',
        description: 'Artisan sorbets with fountain views',
      },
    ],
    
    insiderTips: [
      'Book Colosseum/Vatican tickets MONTHS ahead via official sites; ship tours sell out',
      'Pickpockets rampant at Termini/Colosseum; money belts essential',
      'Rome trains 7am departure catches 9am sights pre-crowds',
      'Trenitalia app tickets; validate paper tickets',
      'Cards everywhere; 10 to 20 euros cash taxis/gelato; 10% restaurant tip',
      'Shoulders/knees covered Vatican/cathedrals; siesta 1-4pm',
      'Skip Colosseum gladiator photos; Forum tablets better value',
      'Google Maps offline; Roma Pass if multiple museums',
    ],
    
    faq: [
      {
        question: 'Is Civitavecchia walkable from the cruise port?',
        answer: 'Port town yes, but Rome requires 1-hour train.',
      },
      {
        question: 'How long do you need in Civitavecchia/Rome?',
        answer: 'Full day (8+ hours) for 3-4 Rome sights.',
      },
      {
        question: 'Is English widely spoken in Civitavecchia/Rome?',
        answer: 'Port/tourist areas yes; Rome centre moderate.',
      },
      {
        question: 'Is Civitavecchia/Rome safe for tourists?',
        answer: 'Rome pickpockets high; vigilance Termini/Colosseum.',
      },
      {
        question: 'Is Civitavecchia/Rome expensive?',
        answer: 'Rome moderate-high; pasta 15 euros, tickets 20+ euros.',
      },
      {
        question: 'Do I need cash in Civitavecchia/Rome or can I use card?',
        answer: 'Cards dominant; euros cash taxis/gelato.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Ship for timing; train DIY cheaper.',
      },
      {
        question: 'What is the best thing to do in Civitavecchia/Rome on a cruise day?',
        answer: 'Colosseum-Forum-Vatican train combo.',
      },
      {
        question: 'Can you do Rome from Civitavecchia on a cruise day?',
        answer: 'Yes, 1-hour train each way feasible.',
      },
      {
        question: 'Is Rome worth it from Civitavecchia?',
        answer: 'Absolutely essential bucket-list priority.',
      },
    ],
    
    weather: {
      intro: 'Civitavecchia has a Mediterranean climate with hot, dry summers and mild, wet winters. Spring and autumn offer the best balance of weather and manageable crowds for visiting Rome.',
      months: [
        { month: 'Jan', highC: 12, lowC: 5, rainMm: 80, sunDays: 10, seaTempC: 14 },
        { month: 'Feb', highC: 13, lowC: 5, rainMm: 70, sunDays: 12, seaTempC: 14 },
        { month: 'Mar', highC: 15, lowC: 7, rainMm: 60, sunDays: 15, seaTempC: 15 },
        { month: 'Apr', highC: 18, lowC: 10, rainMm: 60, sunDays: 17, seaTempC: 16 },
        { month: 'May', highC: 22, lowC: 13, rainMm: 50, sunDays: 20, seaTempC: 19 },
        { month: 'Jun', highC: 26, lowC: 17, rainMm: 40, sunDays: 24, seaTempC: 22 },
        { month: 'Jul', highC: 30, lowC: 20, rainMm: 20, sunDays: 27, seaTempC: 24 },
        { month: 'Aug', highC: 30, lowC: 20, rainMm: 30, sunDays: 26, seaTempC: 25 },
        { month: 'Sep', highC: 27, lowC: 17, rainMm: 60, sunDays: 22, seaTempC: 24 },
        { month: 'Oct', highC: 23, lowC: 14, rainMm: 90, sunDays: 18, seaTempC: 22 },
        { month: 'Nov', highC: 17, lowC: 9, rainMm: 110, sunDays: 13, seaTempC: 19 },
        { month: 'Dec', highC: 13, lowC: 6, rainMm: 90, sunDays: 11, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'April-June for mild sightseeing',
        hottest: 'Peak season (Jul-Aug): Hot/crowded (cons)',
        quietest: 'Quieter months (Mar, Oct): Fewer queues (pros)',
        recommendation: 'First-timers: Spring avoids heat',
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

  {
    id: 'marseille',
    slug: 'marseille',
    name: 'Marseille',
    country: 'France',
    region: 'mediterranean',
    coordinates: { lat: 43.2965, lon: 5.3698 },
    tagline: 'Provençal port of bouillabaisse',
    description: 'Marseille fuses North African markets with 17th-century forts guarding Vieux Port, where fishing boats jostle mega-yachts amid pastel facades and basilica hilltop views. Cruise terminals position passengers for quick metro access to Le Panier alleys and Calanques hikes, defining this multicultural gateway to Provence.',
    
    aboutPort: {
      overview: 'Marseille Provence Cruise Terminal (MPCT) at Môle Léon Gourret (Gate 4) handles mega-ships 10km from Vieux Port with lounges, WiFi, cafes; J4 Joliette serves smaller vessels near centre. Free shuttles to metro; taxis 20 to 25 euros to old town (20 minutes). Flat access but uphill to basilica.',
      terminals: 'MPCT (Terminals A to F at Gate 4) for large vessels; J4 Joliette for smaller or luxury ships near city centre.',
      shuttleServices: 'Free shuttles run every 20 minutes from MPCT to Joliette on cruise days, dropping near the old port (9 to 10 km, 20 to 30 minutes). Walking from MPCT is impractical (over an hour); J4 places passengers amid historic sites immediately.',
      walkability: 'MPCT no (shuttle needed); J4 yes to Vieux Port (5 to 10 minutes).',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'French',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: false,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Marseille Provence (MRS)',
        distance: '27km, 25 minutes taxi',
        options: 'Taxi: 25 minutes direct. Shuttle bus 10 euros (30 minutes).',
      },
      trains: {
        mainStation: 'Marseille St-Charles',
        description: 'TGV to Paris (3 hours), Aix (30 minutes)',
        localHubs: 'St-Charles for regional TER services and metro connections',
      },
    },

    gettingAround: {
      fromPort: 'Shuttle or metro Line 2 (Joliette station) to Vieux Port (15 minutes). Taxis 20 euros to old town; trams and buses to beaches. Hop-on hop-off loops basilica and Calanques viewpoints (25 euros).',
      publicTransport: 'Metro, trams and buses connect to Aix (30 minutes), Calanques and airport; taxis plentiful at terminals. Vieux Port and basilica are 5 to 10 minutes from J4 or shuttle drop; beaches 30 minutes metro and bus.',
      taxis: 'Plentiful at terminals; metered fares. Expect 20 euros to old town, more for beaches.',
      walkingDistance: 'J4 to Vieux Port 5 to 10 minutes; MPCT requires shuttle (10km to centre).',
      sightseeingBus: 'Hop-on hop-off buses depart from near Vieux Port, covering basilica, forts and MuCEM (25 euros).',
      accessibility: 'Metro has good access; basilica has steps; Vieux Port flat. Check terminal facilities.',
    },
    
    mustSeeSights: [
      {
        title: 'Notre-Dame de la Garde',
        category: 'landmark',
        description: 'Hilltop basilica with golden Virgin overlooking city and sea; 360° panoramas of Marseille and coastline.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Free entry; bus 60 direct from Vieux Port',
          'Sunset golden hour for best photography',
          'Arrive early to avoid coach crowds',
        ],
        highlights: ['Views', 'Architecture', 'Religious'],
        goodFor: ['First-time visitors', 'Photographers'],
      },
      {
        title: 'Vieux Port & MuCEM',
        category: 'historic',
        description: 'Historic fishing harbour with modern European-Mediterranean museum bridge connecting old and new architecture.',
        duration: '1.5 to 2.5 hours for a relaxed pace',
        tips: [
          'Fish market mornings best for atmosphere',
          'MuCEM 11 euros entry; bridge free access',
          'Watch petanque games on quayside',
        ],
        highlights: ['Culture', 'History', 'Museums', 'Photography'],
        goodFor: ['Culture seekers', 'First-time visitors'],
      },
      {
        title: 'Le Panier Neighbourhood',
        category: 'stroll',
        description: 'Oldest quarter with pastel alleys, vibrant street art, and La Vieille Charité museum complex.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Pastis lunch at traditional cafes',
          'Follow street art trail up the hill',
          'Avoid siesta hours (2 to 5pm)',
        ],
        highlights: ['Culture', 'History', 'Photography', 'Food'],
        goodFor: ['Photographers', 'Foodies'],
      },
      {
        title: 'Cathédrale de la Major',
        category: 'historic',
        description: 'Byzantine-Romanesque waterfront giant with marble crypt and stunning architecture near J4 terminal.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Free entry to cathedral',
          'Crypt atmospheric and worth visiting',
          'J4 terminal adjacent for quick access',
        ],
        highlights: ['Architecture', 'Religious'],
        goodFor: ['Architecture lovers'],
      },
      {
        title: 'Calanques National Park',
        category: 'nature',
        description: 'Limestone cliffs and turquoise coves; Cassis boat or hike excursion showcases stunning natural beauty.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'Bus 19 plus boat 25 euros; book summer reservations ahead',
          'Water shoes recommended for rocky entries',
          'Full day needed for proper exploration',
        ],
        highlights: ['Nature', 'Views', 'Hiking'],
        goodFor: ['Active travelers', 'Photographers'],
      },
    ],
    
    nearestBeach: {
      name: 'Prado Beaches (Plages du Prado)',
      description: 'Urban sand and pebble stretches with pine shade, playgrounds, and gateway to Calanques. Family-friendly with shallow sections and good facilities.',
      type: 'sand / pebbles',
      waterEntry: 'shallow entry',
      shelter: 'partially sheltered',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: 'Not feasible from port',
        taxiTime: '20 minutes',
        busRoute: 'Metro M2 to Rond-Point du Prado then tram',
        notes: 'Family-friendly with shallow sections',
      },
      bestFor: ['families with children', 'swimming', 'relaxing'],
      tip: 'Northern Prado quieter than main beach area.',
    },
    
    foodAndDrink: [
      {
        name: 'Vieux Port fish stalls',
        type: 'Market',
        description: 'Bouillabaisse and fresh catch quayside at historic harbourfront',
      },
      {
        name: 'Le Panier bistros',
        type: 'Restaurant',
        description: 'Provençal daube and traditional dishes in historic alleys',
      },
      {
        name: 'La Maison de l\'Olivier',
        type: 'Cafe',
        description: 'Olive oil tasting and Provençal products near MuCEM',
      },
      {
        name: 'Prado beach chiringuitos',
        type: 'Beach Bar',
        description: 'Moules frites and beachside dining with easy beach access',
      },
    ],
    
    insiderTips: [
      'Metro 2 card 1.90 euros to Vieux Port; taxis chaotic but fast for longer distances',
      'Watch for pickpockets in markets and port areas; secure bags and valuables',
      'Visit basilica and Calanques at 9am before coach crowds arrive',
      'Metro best for city exploration; buses better for Calanques excursions',
      'Cards accepted everywhere; 10 to 20 euros cash for markets; 10% service tip standard',
      'Cover shoulders in cathedrals; note siesta hours 2 to 5pm when many shops close',
      'Skip tourist menus on Vieux Port; local rotisseries more authentic',
      'Google Translate helpful for menus; download offline maps for navigation',
    ],
    
    faq: [
      {
        question: 'Is Marseille walkable from the cruise port?',
        answer: 'No, MPCT requires 20-minute shuttle or metro to centre. J4 terminal is walkable to Vieux Port (5 to 10 minutes).',
      },
      {
        question: 'How long do you need in Marseille?',
        answer: '6 to 8 hours allows time for Vieux Port, basilica and beach. Full day ideal for Calanques excursion.',
      },
      {
        question: 'Is English widely spoken in Marseille?',
        answer: 'Yes in tourist areas and port; limited in markets and local neighbourhoods.',
      },
      {
        question: 'Is Marseille safe for tourists?',
        answer: 'Moderate safety; watch for pickpockets especially around Vieux Port and markets. Port areas generally secure.',
      },
      {
        question: 'Is Marseille expensive?',
        answer: 'Affordable for Mediterranean city; bouillabaisse around 25 euros, metro tickets reasonable. Beach facilities extra cost.',
      },
      {
        question: 'Do I need cash in Marseille or can I use card?',
        answer: 'Cards dominant in restaurants and shops; carry 10 to 20 euros cash for markets and small vendors.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works well for city sights; consider ship excursion for Calanques logistics and timing.',
      },
      {
        question: 'What is the best thing to do in Marseille on a cruise day?',
        answer: 'Basilica views in morning, then Vieux Port lunch and Le Panier wander, finishing with Prado beach if time allows.',
      },
      {
        question: 'Are the beaches nice in Marseille?',
        answer: 'Yes, Prado beaches offer urban sands that are family-friendly with good facilities, though busy in summer months.',
      },
      {
        question: 'Is Marseille family-friendly?',
        answer: 'Yes, beaches have playgrounds, parks nearby, and flat promenades suitable for children. Calanques more challenging.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to September for beach weather and warm exploration',
      cruiseTerminals: ['MPCT (Gate 4)', 'J4 Joliette'],
      nearbyAirport: 'Marseille Provence (MRS), 27km',
      visaInfo: 'None (Schengen 90/180)',
    },

    weather: {
      intro: 'Marseille has a Mediterranean climate with hot, dry summers and mild winters. May to September offer the best beach weather and comfortable sightseeing conditions.',
      months: [
        { month: 'Jan', highC: 12, lowC: 5, rainMm: 70, sunDays: 12, seaTempC: 14 },
        { month: 'Feb', highC: 13, lowC: 6, rainMm: 60, sunDays: 14, seaTempC: 14 },
        { month: 'Mar', highC: 15, lowC: 8, rainMm: 50, sunDays: 17, seaTempC: 15 },
        { month: 'Apr', highC: 17, lowC: 10, rainMm: 60, sunDays: 19, seaTempC: 16 },
        { month: 'May', highC: 21, lowC: 14, rainMm: 50, sunDays: 22, seaTempC: 18 },
        { month: 'Jun', highC: 25, lowC: 18, rainMm: 40, sunDays: 25, seaTempC: 21 },
        { month: 'Jul', highC: 28, lowC: 21, rainMm: 20, sunDays: 28, seaTempC: 23 },
        { month: 'Aug', highC: 29, lowC: 21, rainMm: 30, sunDays: 27, seaTempC: 24 },
        { month: 'Sep', highC: 26, lowC: 18, rainMm: 60, sunDays: 24, seaTempC: 23 },
        { month: 'Oct', highC: 22, lowC: 15, rainMm: 90, sunDays: 20, seaTempC: 21 },
        { month: 'Nov', highC: 17, lowC: 10, rainMm: 90, sunDays: 15, seaTempC: 18 },
        { month: 'Dec', highC: 13, lowC: 7, rainMm: 70, sunDays: 13, seaTempC: 15 },
      ],
      bestTime: {
        overall: 'May to September for beach weather and comfortable temperatures',
        hottest: 'Peak season (Jul-Aug): Hot and crowded but great for beaches',
        quietest: 'Quieter months (May, Sep): Mild and perfect for exploration',
        recommendation: 'First-timers: June offers best balance of weather and manageable crowds',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises', 'french-cruises'],
    
    meta: {
      title: 'Marseille Cruise Port Guide | Vieux Port, Calanques & Provence',
      description: 'Complete Marseille cruise port guide. Explore Vieux Port, visit Notre-Dame de la Garde, discover Calanques National Park, and enjoy bouillabaisse in France\'s leading cruise hub.',
      keywords: ['Marseille cruise port', 'Marseille France', 'Vieux Port', 'Calanques cruise', 'Marseille shore excursions', 'MPCT terminal'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-28',
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
      language: 'Spanish, Galician',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Vigo-Peinador Airport (VGO)',
        distance: 'Approximately 10 to 12 kilometres east of the waterfront, usually 20 to 25 minutes by road depending on traffic',
        options: 'Taxi readily available at both the port and airport, with a road journey of roughly 20 to 25 minutes in normal conditions. Local buses connect the airport with central Vigo; with walk or short taxi from central stops to the port, the total journey can take around 35 to 50 minutes. There is no direct rail link from the airport; passengers would typically combine bus or taxi to reach the main railway station.',
      },
      trains: {
        mainStation: 'Vigo-Guixar and Vigo-Urzáiz are the key stations, with Vigo-Urzáiz used for many high-speed services',
        description: 'Services link Vigo with Santiago de Compostela, A Coruña, Ourense and other Galician cities, plus longer-distance and international routes towards Madrid and northern Portugal (via nearby connections)',
        localHubs: 'Santiago de Compostela and A Coruña act as regional hubs, while connections in Portugal (such as Porto) are accessible via regional cross-border services',
      },
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
      nearbyAirport: 'Vigo-Peinador Airport (VGO), roughly 10 to 12 kilometres from the cruise port',
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
    
    relatedDestinations: ['mediterranean-cruises'],
    
    meta: {
      title: 'Vigo Cruise Port Guide | Gateway to Galicia\'s Coast',
      description: 'Complete Vigo cruise port guide. Explore Casco Vello, visit Monte do Castro, discover the Cíes Islands, and enjoy Galician seafood in this walkable Atlantic port.',
      keywords: ['Vigo cruise port', 'Vigo Spain', 'Galicia cruise port', 'Atlantic coast cruises', 'Vigo shore excursions', 'Cíes Islands'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  {
    id: 'porto',
    slug: 'porto',
    name: 'Porto',
    country: 'Portugal',
    region: 'atlantic-coast',
    coordinates: { lat: 41.1783, lon: -8.6967 },
    tagline: 'Douro gateway near Porto\'s heart',
    description: 'Leixões Cruise Terminal in Matosinhos positions passengers 3km from Porto\'s UNESCO Ribeira district and 8km from city centre, blending modern facilities with quick metro access to port wine cellars and azulejo-tiled churches. The port handles large ships efficiently as northern Portugal\'s cruise hub.',
    
    aboutPort: {
      overview: 'Modern Terminal Sul (19,000m², South Pier) handles mega-ships up to 320m with lounges for 2,500 passengers, WiFi, tourist info, shops, and shuttle buses to Matosinhos metro (5 minutes). Terminal Norte (840m² wooden heritage building) serves smaller vessels. Taxis 20 euros to Porto centre; no walking through port area.',
      terminals: 'Terminal Sul (South Pier) and Terminal Norte (North Pier). Terminal Sul is the main modern facility; Terminal Norte is a smaller heritage building.',
      shuttle: 'Free or 2 euro shuttles to Matosinhos metro (Line A, 20 minutes to Porto Trindade).',
      walkability: 'Matosinhos beach yes; Porto metro 20 minutes. The port is 3km from Ribeira, 8km from city centre.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: false,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Porto Airport (OPO)',
        distance: '15km, 20 minutes taxi',
        options: 'Taxi: 20 minutes direct. Metro: Line E from airport to Senhora da Hora, change to A for port (30 minutes).',
      },
      trains: {
        mainStation: 'Porto Campanhã or Trindade',
        description: 'High-speed to Lisbon; Douro Valley line.',
        localHubs: 'Metro from Matosinhos.',
      },
    },
    
    gettingAround: {
      fromPort: 'Free or 2 euro shuttles to Matosinhos metro (Line A, 20 minutes to Porto Trindade). Taxis 20 euros Porto (20 minutes); buses to beaches. Hop-on hop-off from terminal loops Ribeira, port wine cellars, Foz do Douro (18 euros).',
      publicTransport: 'Metro Line A + walking. No trams in port area, but Porto\'s historic tram 1 runs riverside; funiculars access upper levels. City centre 30 minutes total; beaches and wine tours require buses or taxis.',
      taxis: 'Taxis available at terminal, 20 euros to city centre.',
      walkingDistance: 'Distances: Porto Ribeira 8km, Matosinhos beach 1km.',
      sightseeingBus: 'Hop-on hop-off from terminal loops Ribeira, port wine cellars, Foz do Douro.',
      accessibility: 'Terminal has good access; metro stations have lifts; Ribeira has some cobbled streets.',
    },
    
    mustSeeSights: [
      {
        title: 'Porto Ribeira and Douro River',
        category: 'historic',
        description: 'UNESCO waterfront with rabelo boats, port wine cellars, tiled churches.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Metro to São Bento station for easy access',
          'Free cellar tastings available at some cellars',
          'Riverside lunch offers best views and atmosphere',
        ],
        highlights: ['History', 'Culture', 'Food', 'Photography'],
        goodFor: ['First-time visitors', 'Foodies'],
      },
      {
        title: 'Clérigos Tower and Church',
        category: 'landmark',
        description: '76m baroque tower with 360° city views; ornate interior.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          '8 euros climb 225 steps; worth it for panoramas',
          'Sunset offers best light for city views',
          'Livraria Lello bookstore nearby for combined visit',
        ],
        highlights: ['Views', 'Architecture', 'Photography'],
        goodFor: ['Photographers', 'Architecture lovers'],
      },
      {
        title: 'Port Wine Cellars (Ribeira)',
        category: 'historic',
        description: 'Graham\'s, Taylor\'s, Croft cellars with barrel ageing, tastings.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Free basic tasting available at some cellars',
          'Guided tours around 15 euros; informative',
          'Learn tawny vs ruby port differences',
        ],
        highlights: ['Food', 'Culture', 'History'],
        goodFor: ['Foodies', 'Culture seekers'],
      },
      {
        title: 'Matosinhos Beach and Seafood',
        category: 'beach',
        description: 'Long Atlantic sands adjacent to terminal with fresh fish restaurants.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          '10-minute walk from terminal; very convenient',
          'Seafood lunch at beachfront restaurants recommended',
          'Surf watching popular; conditions variable',
        ],
        highlights: ['Beaches', 'Food', 'Nature'],
        goodFor: ['Foodies', 'Families'],
      },
      {
        title: 'Douro Valley Day Excursion',
        category: 'excursion',
        description: 'Terraced vineyards, port quintas, river cruises (1.5 hours east).',
        duration: '6 to 8 hours for a relaxed pace',
        tips: [
          'Ship excursion or train plus tour; both work well',
          'Harvest in September offers most activity',
          'Pinhão viewpoints are spectacular',
        ],
        highlights: ['Nature', 'Views', 'Food', 'Culture'],
        goodFor: ['First-time visitors', 'Wine lovers'],
      },
      {
        title: 'São Bento Station',
        category: 'historic',
        description: '20,000 azulejo tiles depicting Portuguese history.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Free entry; no ticket needed to view',
          'Photo every panel; each tells a story',
          'Metro stop makes it easy to combine with other sights',
        ],
        highlights: ['Architecture', 'Culture', 'Photography'],
        goodFor: ['Photographers', 'Culture seekers'],
      },
    ],

    nearestBeach: {
      name: 'Praia de Matosinhos',
      description: 'Wide golden Atlantic sands steps from terminal, backed by seafood restaurants and surf schools.',
      type: 'sand',
      waterEntry: 'drops off quickly',
      shelter: 'exposed',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: false,
        umbrellas: false,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: '10 to 15 minutes from port or shuttle stop',
        taxiTime: '5 minutes',
        busRoute: 'Local buses available',
        notes: 'Flat promenade; surf conditions variable',
      },
      bestFor: ['swimming', 'relaxing', 'seafood lunch'],
      tip: 'Fresh grilled sardines at beach restaurants post-swim.',
    },
    
    shoreExcursions: [
      {
        title: 'Douro Valley wine tour',
        description: 'Full-day excursion to UNESCO-listed wine region with vineyard visits and river cruise.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended (timing essential)',
      },
      {
        title: 'Porto city walking tour',
        description: 'Explore Ribeira, São Bento station, Clérigos Tower and Livraria Lello on foot.',
        duration: 'Half day',
        bookWith: 'Independent (easy by metro)',
      },
    ],
    
    foodAndDrink: [
      {
        name: 'Matosinhos seafood restaurants',
        type: 'Restaurant',
        description: 'Grilled fish and sardines. Beachfront 10-minute walk from terminal.',
      },
      {
        name: 'Ribeira port wine bars',
        type: 'Wine Bar',
        description: 'Tawny tastings, cheese. Metro to Douro.',
      },
      {
        name: 'Mercado do Bolhão',
        type: 'Market',
        description: 'Fresh produce and tapas. Porto centre.',
      },
      {
        name: 'Foz do Douro cafés',
        type: 'Café',
        description: 'Pastéis de nata. Seafront tram.',
      },
    ],
    
    insiderTips: [
      'Metro Andante card (1.50 euros plus fare) essential; validates on board.',
      'Pickpockets low but watch Ribeira evenings.',
      'Cellars and wine tours 10am pre-groups for quieter experience.',
      'Metro for Porto; taxis for excursions; walk Matosinhos.',
      'Cards everywhere; 5 to 10 euros cash for metro and markets; 5 to 10 percent tip.',
      'No dress codes; relaxed Portuguese vibe.',
      'Skip tourist menus; seafood shacks authentic.',
      'Google Translate menus; Porto Card discounts available.',
    ],

    weather: {
      intro: 'Porto has a temperate maritime climate with mild winters and warm, dry summers. Spring and autumn are pleasant for sightseeing.',
      months: [
        { month: 'Jan', highC: 14, lowC: 8, rainMm: 140, sunDays: 10, seaTempC: 14 },
        { month: 'Feb', highC: 15, lowC: 9, rainMm: 110, sunDays: 12, seaTempC: 14 },
        { month: 'Mar', highC: 17, lowC: 11, rainMm: 90, sunDays: 15, seaTempC: 15 },
        { month: 'Apr', highC: 19, lowC: 12, rainMm: 80, sunDays: 17, seaTempC: 16 },
        { month: 'May', highC: 22, lowC: 15, rainMm: 70, sunDays: 19, seaTempC: 18 },
        { month: 'Jun', highC: 25, lowC: 18, rainMm: 40, sunDays: 22, seaTempC: 20 },
        { month: 'Jul', highC: 27, lowC: 20, rainMm: 20, sunDays: 26, seaTempC: 21 },
        { month: 'Aug', highC: 27, lowC: 20, rainMm: 20, sunDays: 25, seaTempC: 22 },
        { month: 'Sep', highC: 25, lowC: 18, rainMm: 60, sunDays: 22, seaTempC: 21 },
        { month: 'Oct', highC: 22, lowC: 15, rainMm: 110, sunDays: 17, seaTempC: 19 },
        { month: 'Nov', highC: 18, lowC: 11, rainMm: 140, sunDays: 12, seaTempC: 17 },
        { month: 'Dec', highC: 15, lowC: 9, rainMm: 150, sunDays: 10, seaTempC: 15 },
      ],
      bestTime: {
        overall: 'June to September mild weather and dry conditions ideal for exploring.',
        hottest: 'July and August bring festivals and lively atmosphere, but transport is busier.',
        quietest: 'May and September offer perfect wine weather with fewer crowds.',
        recommendation: 'June for first-timers offers ideal Douro Valley conditions and manageable crowds.',
      },
    },

    faq: [
      {
        question: 'Is Porto Leixões walkable from the cruise port?',
        answer: 'Matosinhos beach yes; Porto requires metro 20 minutes. The port is 3km from Ribeira, 8km from city centre.',
      },
      {
        question: 'How long do you need in Porto Leixões?',
        answer: '6 to 8 hours for Ribeira and beach; full day for Douro Valley excursion.',
      },
      {
        question: 'Is English widely spoken in Porto Leixões?',
        answer: 'Yes, English is widely spoken in tourist areas and port wine cellars.',
      },
      {
        question: 'Is Porto Leixões safe for tourists?',
        answer: 'Very safe; standard precautions recommended, especially in Ribeira evenings.',
      },
      {
        question: 'Is Porto Leixões expensive?',
        answer: 'Affordable; seafood around 15 euros, wine tastings often free at cellars.',
      },
      {
        question: 'Do I need cash in Porto Leixões or can I use card?',
        answer: 'Cards dominant; 5 to 10 euros cash useful for metro and markets.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works well for Porto; ship excursion recommended for Douro Valley due to timing.',
      },
      {
        question: 'What is the best thing to do in Porto Leixões on a cruise day?',
        answer: 'Metro to Ribeira plus port wine cellars offers the perfect combination of culture, history and local flavour.',
      },
      {
        question: 'Can you do Porto from Leixões on a cruise day?',
        answer: 'Yes, 20-minute metro ride makes Porto easily accessible for a full day of exploration.',
      },
      {
        question: 'Are the beaches nice in Porto Leixões?',
        answer: 'Matosinhos offers excellent seafood and sands nearby, just 10 to 15 minutes walk from terminal.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to October for pleasant weather and good conditions for exploring Porto and Douro Valley.',
      cruiseTerminals: ['Terminal Sul', 'Terminal Norte'],
      parking: 'Not applicable',
      nearbyAirport: 'Porto (OPO), 15km',
      visaInfo: 'None for UK passport holders (Schengen 90/180 days). Check current rules for other nationalities.',
    },
    
    relatedDestinations: ['mediterranean-cruises'],
    
    meta: {
      title: 'Porto Leixões Cruise Port Guide | Douro Gateway & Port Wine',
      description: 'Complete Porto Leixões cruise port guide. Explore Ribeira district, visit port wine cellars, enjoy Matosinhos beach, and discover the Douro Valley from Leixões terminal.',
      keywords: ['Porto Leixões cruise port', 'Leixões cruise terminal', 'Porto shore excursions', 'port wine tours', 'Douro Valley cruise', 'Matosinhos beach'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
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
      language: 'Spanish',
      timezone: 'GMT+1',
      portType: 'Port of Call',
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
    
    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s Cádiz',
        location: 'Calle Columela, city centre',
        walkingTime: '10 minutes from port',
        notes: 'Near main shopping area. Multiple locations in Cádiz.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+Calle+Columela+Cadiz&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP Calle Ancha',
        location: 'Calle Ancha, main shopping street',
        walkingTime: '15 minutes from port',
        notes: 'Main shopping street. Toys and novelties for kids.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+Calle+Ancha+Cadiz&travelmode=walking',
      },
      localPark: {
        name: 'Parque Genovés',
        location: 'Central Cádiz, north of old town',
        walkingTime: '10-15 minutes from port',
        facilities: 'Playground, zip line, duck pond, dinosaur sculptures, skate park, waterfall grotto',
        notes: 'Best park in Cádiz for kids. Varied attractions for all ages. Shaded areas under century-old trees.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Parque+Genoves+Cadiz&travelmode=walking',
      },
      beachOption: 'La Caleta Beach is closest (20-25 minutes walk). Calm waters, golden sand, small playground, rocks to climb. Also Playa de la Victoria for longer stretch.',
    },
    
    meta: {
      title: 'Cádiz Cruise Port Guide 2026 | Oldest City in Europe & Seville Day Trips',
      description: '2026 Cádiz cruise port guide. Walk off your ship in 5 mins to Europe\'s oldest city. Cathedral views, tapas trails, sherry tasting, Seville & Jerez day trips. Insider tips from real cruisers.',
      keywords: ['Cádiz cruise port', 'Cádiz port guide', 'Cádiz things to do', 'Cádiz shore excursions', 'Seville day trip from Cádiz', 'Jerez sherry tour', 'Cádiz cathedral tower', 'Cádiz beaches', 'Cádiz old town walking', 'Andalusia cruise port'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  {
    id: 'a-coruna',
    slug: 'a-coruna',
    name: 'A Coruña',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 43.3719, lon: -8.3954 },
    tagline: 'Glass city by the Atlantic',
    description: 'A Coruña charms with distinctive galería buildings, a promontory harbour, and the world\'s oldest functioning lighthouse amid Galician seafood culture. Cruise ships dock centrally for walkable access to Maria Pita Square and old town, with quick trips to Santiago\'s cathedral.',
    
    aboutPort: {
      overview: 'Transatlantic Quay offers direct downtown docking with modern terminal, WiFi, tourist info, and taxi ranks; Calvo Sotelo handles overflow. Record 2022 season with 136 calls.',
      terminals: 'Transatlantic Quay terminal provides check-in, free Wi-Fi, shops, cafés and info desks in a central location next to commercial areas. Calvo Sotelo (420m) handles overflow with provisional facilities and road access.',
      shuttleServices: 'No shuttles needed: exits lead straight to Avenida da Mariña\'s glass buildings and promenades; taxis park nearby.',
      walkability: '5-minute walk to Maria Pita Square; no shuttles needed. Beaches and old town lie within 10 to 15 minutes on foot.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Galician, Spanish',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'A Coruña Airport (LCG)',
        distance: '8 km, 15 minutes taxi',
        options: 'Taxi: 15 minutes. Bus: C2 line (1.50 euros) to city centre.',
      },
      trains: {
        mainStation: 'A Coruña Station',
        description: 'Regional services to Santiago (40 minutes) and Ferrol. A Coruña Station is a 15-minute walk from the port.',
        localHubs: 'A Coruña Station connects to Santiago de Compostela for pilgrimage routes and regional travel.',
      },
    },
    
    gettingAround: {
      fromPort: 'Exit terminal for 5-minute flat walk to old town and Maria Pita Square. Buses available to Santiago and beaches; taxis for longer trips.',
      publicTransport: 'Buses serve beaches and Domus museum; no metro but efficient network covers city. Bus to Santiago costs 12 euros return. Hop-on hop-off bus loops Tower of Hercules and beaches (15 euros).',
      taxis: 'Taxis available at terminal. Expect around 80 euros for trips to Santiago. Short city trips are affordable.',
      walkingDistance: 'Most key sights are within 5 to 20 minutes walking from the port. Tower of Hercules is 30 minutes walk or by bus.',
      sightseeingBus: 'Hop-on hop-off bus available near terminal, covering major sights including Tower of Hercules, beaches and city centre. Tickets 15 euros.',
      accessibility: 'City centre is walkable with level paths. Tower of Hercules has 234 steps and may require assistance for steep sections.',
    },
    
    mustSeeSights: [
      {
        title: 'Tower of Hercules',
        category: 'landmark',
        description: 'Roman lighthouse (UNESCO), 2nd-century, 55m climb for panoramas over the Atlantic. World\'s oldest working Roman lighthouse with stunning coastal views from the top.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Entry costs 2.50 euros; book online to avoid weekend queues',
          'Climb all 234 steps for the best views from the top',
          'Visit at sunset for spectacular coastal panoramas'
        ],
        highlights: ['History', 'Views', 'Architecture'],
        goodFor: ['First-time visitors', 'Photographers'],
      },
      {
        title: 'Maria Pita Square',
        category: 'historic',
        description: 'Heroine statue, town hall, cafés in glass-balconied core. The heart of A Coruña with historic buildings, lively atmosphere and traditional Galician character.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Perfect for morning coffee and relaxing',
          'Free WiFi available in the square',
          'Nearby cafés offer excellent views of the historic architecture'
        ],
        highlights: ['Culture', 'Architecture', 'Food'],
        goodFor: ['First-time visitors'],
      },
      {
        title: 'Old Town & San Carlos Garden',
        category: 'stroll',
        description: 'Medieval alleys, British general\'s tomb, boutique shops. Charming historic quarter with narrow lanes, traditional architecture and peaceful gardens.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'San Carlos Garden is free and perfect for a quiet break',
          'Explore side streets for authentic local atmosphere',
          'Stop for tapas lunch in one of the traditional tavernas'
        ],
        highlights: ['History', 'Culture', 'Photography'],
        goodFor: ['Culture seekers'],
      },
      {
        title: 'Domus Museum',
        category: 'family',
        description: 'Interactive science house with planetarium exploring human biology and evolution. Modern facility with engaging exhibits suitable for all ages.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          '6 euros for combo ticket includes planetarium',
          'Excellent hands-on exhibits for children',
          'English displays available throughout'
        ],
        highlights: ['Museums', 'Family-friendly'],
        goodFor: ['Families', 'First-time visitors'],
      },
      {
        title: 'Riazor/Orzán Beaches',
        category: 'beach',
        description: 'Urban twin golden sands with promenade, surf, and city backdrop. Wide double beach with excellent facilities, perfect for families and beach activities.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Riazor Beach is quieter than Orzán Beach for a more relaxed experience',
          'Surfing lessons available in summer months',
          'Promenade restaurants offer excellent seafood with beach views'
        ],
        highlights: ['Beaches', 'Nature', 'Active'],
        goodFor: ['Families', 'Active travelers'],
      },
      {
        title: 'Santiago de Compostela Excursion',
        category: 'excursion',
        description: 'Pilgrim cathedral, UNESCO old town (1 hour bus). The famous pilgrimage city with stunning cathedral and historic streets. Best suited to longer port calls.',
        duration: '6 to 8 hours for a relaxed pace',
        tips: [
          'Bus costs 12 euros return; book ahead for peak times',
          'Focus on cathedral square for the main highlights',
          'Time your visit to potentially see the botafumeiro ceremony'
        ],
        highlights: ['History', 'Religious', 'Architecture'],
        goodFor: ['Culture seekers', 'First-time visitors'],
      },
    ],

    thingsToDo: [
      {
        title: 'Visit Tower of Hercules',
        description: 'Climb the world\'s oldest working Roman lighthouse with UNESCO status and clifftop Atlantic views.',
        category: 'history',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Explore Maria Pita Square and Old Town',
        description: 'Discover the historic heart of A Coruña with its heroine statue, traditional architecture and charming medieval streets.',
        category: 'culture',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Stroll Marina glass galleries',
        description: 'Admire the iconic glass-fronted buildings along the waterfront promenade that give the city its distinctive "Glass City" character.',
        category: 'stroll',
        duration: '45 minutes',
      },
      {
        title: 'Relax at Riazor/Orzán Beaches',
        description: 'Enjoy the urban twin beaches with promenades, surf culture and excellent facilities, just minutes from the port.',
        category: 'beach',
        duration: '2 to 3 hours',
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Santiago de Compostela',
        description: 'Day trip to the famous pilgrimage city and cathedral, approximately one hour away by coach or bus.',
        duration: 'Full day',
        bookWith: 'Cruise line recommended for longer calls, or independent via bus',
      },
    ],
    
    nearestBeach: {
      name: 'Riazor/Orzán Beaches',
      description: 'Urban twin golden sands with promenade, surf, and city backdrop. Wide double beach with excellent facilities and easy access from the port.',
      type: 'sand',
      waterEntry: 'shallow entry',
      shelter: 'partially sheltered',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: '20 minutes from port',
        taxiTime: '5 minutes',
        busRoute: 'Bus 3A',
        notes: 'Flat promenade walk, no steep paths',
      },
      bestFor: ['families with children', 'surfing', 'relaxing'],
      tip: 'Riazor Beach is quieter than Orzán Beach.',
    },
    
    foodAndDrink: [
      {
        name: 'Maria Pita tapas',
        type: 'Tapas Bar',
        description: 'Pulpo gallego and traditional Galician tapas in square cafés. Perfect spot for authentic local flavours and relaxing.',
      },
      {
        name: 'Orzán beach chiringuitos',
        type: 'Beach Bar',
        description: 'Fresh sardines and seafood at beachfront bars. Relaxed atmosphere with excellent views of the Atlantic.',
      },
      {
        name: 'Old town markets',
        type: 'Market',
        description: 'Empanadas, cheeses and local produce at traditional market stalls. Authentic Galician flavours in the historic quarter.',
      },
      {
        name: 'Harbour seafood',
        type: 'Restaurant',
        description: 'Razor clams and fresh seafood near terminal. Traditional Galician restaurants serving the day\'s catch.',
      },
    ],
    
    insiderTips: [
      'Tower tickets online; queues weekends. Book in advance to avoid waiting, especially during peak summer months.',
      'Pickpockets low; standard vigilance. Very safe city but maintain normal precautions in busy areas.',
      'Lighthouse mornings; Santiago buses book ahead. Early visits to Tower of Hercules have better light; reserve bus tickets to Santiago in advance.',
      'Walk centre/beaches; buses excursions. Most sights are easily walkable; use buses for longer trips like Santiago.',
      'Cards everywhere; cash useful for markets; minimal tip. Cards widely accepted; have some euros for market stalls and small tips.',
      'Siesta 2 to 5pm; relaxed Galician pace. Many shops and restaurants close during siesta hours; plan accordingly.',
      'Skip tourist traps; local pulperías authentic. Head away from main squares for authentic Galician octopus and seafood.',
      'Free terminal WiFi; Google Maps. Terminal offers free WiFi; download offline maps before exploring.',
    ],
    
    faq: [
      {
        question: 'Is A Coruña walkable from the cruise port?',
        answer: 'Yes, 5 minutes to Maria Pita Square. The old town, Marina and beaches are easily accessible on foot from the terminal.',
      },
      {
        question: 'How long do you need in A Coruña?',
        answer: '6 to 8 hours for city and beach; full day if including Santiago excursion. A standard cruise day allows time to visit the Tower of Hercules, explore the old town and enjoy the beaches.',
      },
      {
        question: 'Is English widely spoken in A Coruña?',
        answer: 'Tourist areas yes. English is commonly spoken at the terminal, in restaurants and tourist venues, though Spanish and Galician are the main languages.',
      },
      {
        question: 'Is A Coruña safe for tourists?',
        answer: 'Very safe. A Coruña is considered one of Spain\'s safest cities with low crime rates and friendly locals. Standard vigilance recommended in busy areas.',
      },
      {
        question: 'Is A Coruña expensive?',
        answer: 'Affordable; tapas around 10 euros. Prices are reasonable with excellent value in local restaurants and markets compared to major tourist destinations.',
      },
      {
        question: 'Do I need cash in A Coruña or can I use card?',
        answer: 'Cards dominant; euros useful for markets. Credit and debit cards are widely accepted, but carry some cash for market stalls and small local vendors.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent perfect. The city is easily walkable and accessible, making independent exploration ideal. Ship excursions may be useful for Santiago day trips.',
      },
      {
        question: 'What is the best thing to do in A Coruña on a cruise day?',
        answer: 'Tower to beach stroll. Combine a morning visit to the Tower of Hercules with an afternoon at the beaches and old town exploration for the perfect day.',
      },
      {
        question: 'Are the beaches nice in A Coruña?',
        answer: 'Urban sands family-friendly. Riazor and Orzán beaches offer excellent facilities, good surf conditions and are perfect for families with golden sand and clean waters.',
      },
      {
        question: 'Can you do Santiago from A Coruña on a cruise day?',
        answer: 'Yes, 1-hour bus. Santiago de Compostela is easily accessible via bus (12 euros return) or organised excursion, best suited to longer port calls of 8 hours or more.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to September for pleasant weather and beach conditions',
      cruiseTerminals: ['Transatlantic Quay', 'Calvo Sotelo'],
      nearbyAirport: 'A Coruña (LCG), 8 km',
      visaInfo: 'None (Schengen). UK passport holders and EU citizens can visit visa-free for up to 90 days within 180 days.',
    },

    weather: {
      intro: 'A Coruña has a mild Atlantic climate with pleasant summers and mild, wet winters. Summer months offer the best conditions for beach visits and sightseeing.',
      months: [
        { month: 'Jan', highC: 13, lowC: 7, rainMm: 120, sunDays: 10, seaTempC: 13 },
        { month: 'Feb', highC: 13, lowC: 7, rainMm: 110, sunDays: 12, seaTempC: 13 },
        { month: 'Mar', highC: 15, lowC: 9, rainMm: 90, sunDays: 14, seaTempC: 14 },
        { month: 'Apr', highC: 16, lowC: 10, rainMm: 90, sunDays: 16, seaTempC: 15 },
        { month: 'May', highC: 19, lowC: 13, rainMm: 70, sunDays: 18, seaTempC: 17 },
        { month: 'Jun', highC: 22, lowC: 16, rainMm: 50, sunDays: 21, seaTempC: 19 },
        { month: 'Jul', highC: 24, lowC: 18, rainMm: 30, sunDays: 25, seaTempC: 21 },
        { month: 'Aug', highC: 25, lowC: 18, rainMm: 40, sunDays: 24, seaTempC: 22 },
        { month: 'Sep', highC: 23, lowC: 16, rainMm: 70, sunDays: 20, seaTempC: 21 },
        { month: 'Oct', highC: 20, lowC: 13, rainMm: 120, sunDays: 16, seaTempC: 19 },
        { month: 'Nov', highC: 16, lowC: 10, rainMm: 140, sunDays: 12, seaTempC: 16 },
        { month: 'Dec', highC: 14, lowC: 8, rainMm: 130, sunDays: 10, seaTempC: 14 },
      ],
      bestTime: {
        overall: 'June to September mild. These months offer the best balance of pleasant temperatures, lower rainfall and ideal conditions for both sightseeing and beach visits.',
        hottest: 'Peak season (July to August): Festivals and lively atmosphere, but beaches can be busier during these popular months.',
        quietest: 'Quieter months (May, September): Perfect weather with fewer crowds. May and September offer mild temperatures, good beach conditions and more relaxed atmosphere.',
        recommendation: 'First-timers: Summer Santiago. July and August provide the best weather for a full day combining city exploration with a Santiago de Compostela excursion.',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises'],
    
    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s Calle Real',
        location: 'Calle Real, 40, city centre',
        walkingTime: '10 minutes from port',
        notes: 'On main shopping street. Also one in C.C. Los Rosales mall.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+Calle+Real+A+Coruna&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP La Coruña',
        location: 'City centre shopping areas',
        walkingTime: '10-15 minutes from port',
        notes: 'Check store locator for nearest location. Toys, gifts, accessories for kids.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+A+Coruna&travelmode=walking',
      },
      localPark: {
        name: 'Parque de Santa Margarita',
        location: 'Heart of the city',
        walkingTime: '15 minutes from port',
        facilities: 'Large children\'s play zone, paths, birdlife, scenic nature, duck pond',
        notes: 'Near Casa de las Ciencias science museum. Beautiful green space in city centre.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Parque+Santa+Margarita+A+Coruna&travelmode=walking',
      },
      themePark: {
        name: 'Aquarium Finisterrae',
        location: 'Paseo Marítimo Alcalde Francisco Vázquez, 34',
        type: 'Aquarium',
        highlights: 'Over 300 marine species, seal colony, interactive exhibits, terraces with ocean views, Nautilus hall with submerged tank',
        cost: 'Adults €10.30, kids under 16 reduced, under 4 free',
        hours: 'Seasonal: 10:00-18:00 winter, 10:00-20:00 summer',
        notes: 'Perfect for families. Right on waterfront promenade. Can combine with Tower of Hercules visit.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Aquarium+Finisterrae+A+Coruna&travelmode=walking',
      },
      beachOption: 'Riazor and Orzán beaches are 30 minutes walk or 10 minutes taxi. Urban twin beaches with promenade, full facilities, surf, clean sand.',
    },
    
    meta: {
      title: 'A Coruña Cruise Port Guide 2026 | Tower of Hercules & Galician Seafood',
      description: '2026 A Coruña cruise port guide. Walk 5 mins to the city centre. World\'s oldest working lighthouse, Galician seafood, glass-fronted waterfront, Santiago day trips. Insider tips from real cruisers.',
      keywords: ['A Coruña cruise port', 'La Coruña port guide', 'A Coruña things to do', 'Tower of Hercules visit', 'Galician seafood', 'Santiago de Compostela day trip', 'A Coruña beaches', 'A Coruña walking tours', 'Galicia cruise port', 'Plaza Maria Pita'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  // Bilbao
  {
    id: 'bilbao',
    slug: 'bilbao',
    name: 'Bilbao',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 43.3485, lon: -3.0310 },
    tagline: 'Where Gehry\'s titanium curves meet Basque culinary tradition',
    description: 'Bilbao is northern Spain\'s largest city and the capital of the Basque Country. Once an industrial powerhouse, the city underwent a dramatic transformation in the 1990s with the opening of Frank Gehry\'s Guggenheim Museum - a shimmering titanium masterpiece that sparked the "Bilbao Effect." Your ship docks in Getxo, 15 kilometres north of the city, offering beautiful Ereaga Beach right beside the terminal and excellent metro access into Bilbao in about 25 minutes.',
    portCharacter: 'city-culture',
    
    aboutPort: {
      overview: 'Ships dock in Getxo, an affluent seaside suburb about 15 kilometres north of Bilbao\'s city centre. Getxo itself offers the UNESCO-listed Vizcaya Bridge, beautiful Ereaga Beach right beside the cruise terminal, and charming old fishing ports. The excellent metro system whisks you into Bilbao in about 25 minutes.',
      terminals: 'Getxo cruise terminal, beside Ereaga Beach and the marina',
      shuttleServices: 'Most cruise lines offer paid shuttles to Plaza Moyua in Bilbao city centre (around 15 to 20 euros return). Free port authority shuttle to metro stations (Areeta or Algorta)',
      walkability: 'Getxo is walkable from port. Bilbao Old Town and Guggenheim area are very walkable once you arrive by metro',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish, Basque',
      timezone: 'CET (GMT+1)',
      portType: 'Port of Call',
      walkable: false,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Bilbao Airport (BIO)',
        distance: '10 km northeast of the city, about 20 km from Getxo cruise terminal',
        options: 'Bus A3247 runs from airport to Bilbao city centre. Taxi from cruise terminal to airport approximately 30 to 40 euros.',
      },
      trains: {
        mainStation: 'Bilbao-Abando (main RENFE station for long-distance trains), Bilbao-Concordia (narrow gauge trains to Santander and the coast)',
        description: 'Regional services to Basque coast and San Sebastián; high-speed trains to Madrid from Abando.',
        localHubs: 'Abando serves as the hub for RENFE long-distance and regional services.',
      },
    },
    
    gettingAround: {
      fromPort: 'Free port authority shuttle to Areeta or Algorta metro stations, then Line 1 to Bilbao (25 minutes to Moyua for Guggenheim, Casco Viejo for Old Town). Cruise line shuttles available to Plaza Moyua.',
      publicTransport: 'Metro Line 1 from Areeta or Algorta to Bilbao. Moyua station for Guggenheim, Casco Viejo station for Old Town. Around 2 euros each way for 2-zone ticket.',
      taxis: 'Available at terminal, around 25 to 35 euros to Bilbao city centre.',
      walkingDistance: 'Getxo town centre and Vizcaya Bridge walkable (10-20 minutes). Bilbao city centre is 15 km away, requires transport.',
      sightseeingBus: 'Hop-on hop-off buses available in Bilbao city centre, covering museum, old town and riverside.',
      accessibility: 'Metro is accessible with lifts at all stations. Cruise shuttles can usually accommodate wheelchairs. Getxo promenade is flat and accessible.',
    },
    
    mustSeeSights: [
      {
        title: 'Guggenheim Museum',
        category: 'landmark',
        description: 'Frank Gehry\'s masterpiece of titanium curves and glass revolutionised modern architecture and transformed Bilbao from industrial backwater to world cultural destination. The building itself is the star - a shimmering, undulating sculpture beside the Nervion River. The outdoor sculptures - Jeff Koons\' flower-covered Puppy and Louise Bourgeois\' Maman spider - are iconic.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Closed on Mondays (except summer and holidays) - check the schedule before visiting',
          'Book tickets online in advance to skip queues, especially in peak season',
          'Don\'t miss the outdoor sculptures - Puppy and Maman are free to see',
        ],
        highlights: ['Architecture', 'Art', 'Photography', 'Culture', 'Museums'],
        goodFor: ['First-time visitors', 'Architecture lovers', 'Art lovers', 'Photographers'],
      },
      {
        title: 'Casco Viejo (Old Town)',
        category: 'historic',
        description: 'Bilbao\'s atmospheric medieval heart, known as Las Siete Calles (The Seven Streets), is a labyrinth of narrow lanes packed with pintxos bars, traditional shops and historic buildings. The 14th century Santiago Cathedral anchors the district, while the elegant 19th century Plaza Nueva provides a perfect setting for al fresco dining under its covered arcades.',
        duration: '2 to 3 hours for a relaxed pace (longer if doing a proper pintxos crawl)',
        tips: [
          'Visit Plaza Nueva for the highest concentration of pintxos bars - Gure Toki, Sorginzulo and Cafe Bar Bilbao are local favourites',
          'There\'s a flea market in Plaza Nueva on Sunday mornings',
          'The Ribera Market is one of Europe\'s largest covered food markets - visit in the morning for the freshest produce',
        ],
        highlights: ['History', 'Food', 'Shopping', 'Culture', 'Architecture'],
        goodFor: ['First-time visitors', 'Foodies', 'Culture seekers', 'Couples'],
      },
      {
        title: 'Mount Artxanda Funicular',
        category: 'nature',
        description: 'This historic funicular railway (operating since 1915) whisks you up to Mount Artxanda in just 3 minutes for spectacular panoramic views over Bilbao. From the viewpoint (marked by the famous red "BILBAO" letters), you can see the Guggenheim, the Old Town, the surrounding mountains and on clear days, all the way to the Bay of Biscay.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'The bottom station is about 15 minutes walk from Casco Viejo (near City Hall)',
          'There are restaurants at the top for a scenic lunch',
          'On the first Saturday of each month, guided tours explain the funicular\'s history',
        ],
        highlights: ['Views', 'Photography', 'Nature', 'Gardens'],
        goodFor: ['Photographers', 'Families', 'Couples', 'First-time visitors'],
      },
      {
        title: 'Mercado de la Ribera',
        category: 'markets',
        description: 'One of Europe\'s largest covered markets, this Art Deco gem sits beside the river in the Old Town. Three floors overflow with fresh fish, meat, produce and Basque specialties. The ground floor gastro market offers pintxos and drinks in a lively atmosphere perfect for lunch.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Market stalls open Monday to Friday 08:00 to 14:30 and 17:00 to 20:00, Saturday 08:00 to 15:00',
          'The pintxos bars have longer hours including Sundays',
          'Look for the beautiful stained glass windows and Art Deco details',
        ],
        highlights: ['Food', 'Markets', 'Shopping', 'Architecture', 'Culture'],
        goodFor: ['Foodies', 'Culture seekers', 'Families'],
      },
      {
        title: 'Vizcaya Bridge (Puente Colgante)',
        category: 'landmark',
        description: 'This UNESCO World Heritage Site is the world\'s oldest transporter bridge, built in 1893 by a disciple of Gustave Eiffel. The ingenious design carries passengers and vehicles across the Nervion estuary on a suspended gondola, while ships pass beneath. For the best experience, take the lift to the 50-metre-high pedestrian walkway for spectacular views.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Walk along Getxo\'s promenade to reach it from the cruise terminal (about 20 minutes)',
          'The gondola crossing takes 90 seconds and costs just a couple of euros',
          'The walkway experience includes lift access and panoramic views from both sides',
        ],
        highlights: ['History', 'Architecture', 'Photography', 'Views'],
        goodFor: ['History buffs', 'Architecture lovers', 'Photographers', 'Families'],
      },
      {
        title: 'San Juan de Gaztelugatxe (Day Excursion)',
        category: 'excursion',
        description: 'This dramatic islet topped by a medieval hermitage became world-famous as Dragonstone in Game of Thrones. A winding stone bridge connects it to the mainland, leading to 241 steps up to the chapel. The views of the rugged Basque coastline are breathtaking. Located 35 km east of Bilbao, this requires a half-day excursion but is unforgettable.',
        duration: 'Half day (4 to 5 hours including travel)',
        tips: [
          'Book free entry tickets in advance during peak season (required Easter, summer, weekends March to October)',
          'Wear sturdy shoes - the path is steep and can be slippery',
          'Combine with visits to the fishing village of Bermeo or the historic town of Gernika',
        ],
        highlights: ['Nature', 'Views', 'Photography', 'History'],
        goodFor: ['Active travelers', 'Photographers', 'History buffs', 'Couples'],
      },
      {
        title: 'Bilbao Fine Arts Museum',
        category: 'historic',
        description: 'Often overlooked in favour of its flashy neighbour, this excellent museum houses an outstanding collection spanning from medieval to contemporary art. Basque artists feature prominently alongside Spanish masters and international works. Set in a beautiful park, it makes a perfect complement to the Guggenheim.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Just 10 minutes walk from the Guggenheim through Doña Casilda Park',
          'Free entry on certain days - check the website',
          'The museum cafe has a lovely terrace in the park',
        ],
        highlights: ['Art', 'Museums', 'Culture', 'Gardens'],
        goodFor: ['Art lovers', 'Culture seekers', 'Solo travelers'],
      },
      {
        title: 'Pintxos Crawl Experience',
        category: 'stroll',
        description: 'Experience Bilbao\'s legendary pintxos culture with a self-guided bar hop through the Old Town. The ritual involves ordering one or two pintxos and a drink at each bar before moving to the next - standing at the bar, of course, never sitting down. This is how Bilbainos socialise, and participating is the best way to experience authentic Basque culture.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Start in Plaza Nueva where Gure Toki, Sorginzulo and Cafe Bar Bilbao cluster together',
          'Try the signature Gilda (anchovy, olive and guindilla pepper) and bacalao al pil-pil',
          'Pair with txakoli (local sparkling white wine) or a zurito (small beer)',
        ],
        highlights: ['Food', 'Culture', 'History'],
        goodFor: ['Foodies', 'Couples', 'First-time visitors', 'Culture seekers'],
      },
    ],

    shoreExcursions: [
      {
        title: 'Guggenheim and Casco Viejo',
        description: 'Half-day combining the iconic museum with pintxos in Old Town',
        duration: 'Half day',
        bookWith: 'Independent or ship excursion',
      },
      {
        title: 'San Juan de Gaztelugatxe',
        description: 'Game of Thrones filming location with dramatic coastal views',
        duration: 'Half day',
        bookWith: 'Ship excursion or local tour (advance booking required)',
      },
      {
        title: 'San Sebastián',
        description: 'Full day to elegant coastal city famous for beaches and Michelin-starred cuisine',
        duration: 'Full day',
        bookWith: 'Ship excursion recommended',
      },
    ],

    nearestBeach: {
      name: 'Playa de Ereaga (Ereaga Beach)',
      distance: 'Under 5 minutes walk from cruise terminal',
      description: 'Beautiful 800-metre urban beach of fine golden sand right next to the cruise terminal. Sheltered by the estuary, it offers calm waters and excellent facilities. Around 14 to 16°C in spring.',
    },
    
    foodAndDrink: [
      {
        name: 'Plaza Nueva pintxos bars',
        type: 'Tapas Bar',
        description: 'Highest concentration of quality pintxos bars - Gure Toki, Sorginzulo and Cafe Bar Bilbao are local favourites in Casco Viejo.',
      },
      {
        name: 'Mercado de la Ribera',
        type: 'Market',
        description: 'One of Europe\'s largest covered markets with fresh fish, meat, produce and Basque specialties. Ground floor gastro market offers pintxos.',
      },
      {
        name: 'Puerto Viejo de Algorta',
        type: 'Tapas Bar',
        description: 'Excellent local pintxos in old fishing port without tourist crowds in Getxo.',
      },
      {
        name: 'Calle Ledesma',
        type: 'Restaurant',
        description: 'Good pintxos options closer to the Guggenheim.',
      },
    ],
    
    insiderTips: [
      'The Guggenheim is closed on Mondays (except summer months and holidays) - plan accordingly',
      'Siesta is less observed in the Basque Country than southern Spain, but some small shops may close 14:00 to 17:00',
      'Pintxos bars are busiest 13:00 to 15:00 and 19:00 to 21:00 - arrive outside these times to secure space at the bar',
      'Take the free port shuttle to Areeta or Algorta metro stations, then Line 1 into Bilbao (about 2 euros, 20 to 25 minutes)',
      'For a relaxed day, stay in Getxo - the UNESCO Vizcaya Bridge and Puerto Viejo de Algorta offer excellent half-day without city commute',
      'San Juan de Gaztelugatxe (Game of Thrones location) requires booking free entry tickets in advance for peak times',
      'Try the Gilda pintxo (anchovy, olive, pepper), bacalao al pil-pil, and Basque burnt cheesecake',
      'Pair pintxos with txakoli (local sparkling white wine) poured from height',
    ],
    
    faq: [
      {
        question: 'Should I stay in Getxo or go into Bilbao?',
        answer: 'Both options have merit. Getxo offers the UNESCO Vizcaya Bridge, beautiful beaches, and charming old fishing ports - perfect if you want a relaxed day without commuting. Bilbao is essential for the Guggenheim, vibrant Old Town, and the full pintxos experience. Most visitors with 8+ hours combine both.',
      },
      {
        question: 'How do I get from the cruise port to Bilbao city centre?',
        answer: 'Take the cruise line shuttle (usually 15 to 20 euros return) which drops at Plaza Moyua, or use the free port shuttle to Areeta metro station and catch Line 1 into Bilbao (about 2 euros, 20 to 25 minutes).',
      },
      {
        question: 'Is the Guggenheim worth visiting even if I\'m not into art?',
        answer: 'Absolutely. Frank Gehry\'s building is the main attraction - a stunning architectural achievement that photographs beautifully from every angle. The outdoor sculptures (Puppy and Maman) are free to see. Even a quick visit is worthwhile.',
      },
      {
        question: 'What are pintxos and how do I order them?',
        answer: 'Pintxos are Basque small plates, typically served on bread. Order at the bar, point at what you want, and keep your toothpicks (they\'re used to tally your bill). It\'s normal to have just one or two items per bar, then move to the next.',
      },
      {
        question: 'Is Bilbao walkable?',
        answer: 'The Old Town and Guggenheim area are very walkable and mostly flat. The main sights are connected by a pleasant riverside promenade. However, getting from the cruise port requires transport (shuttle or metro).',
      },
      {
        question: 'What should I eat in Bilbao?',
        answer: 'Don\'t miss: the Gilda pintxo (anchovy, olive, pepper), bacalao al pil-pil (cod in garlic-oil sauce), and Basque burnt cheesecake (tarta de queso). Wash it down with txakoli, the local sparkling wine.',
      },
      {
        question: 'Is Bilbao good for families with children?',
        answer: 'Yes! The Guggenheim\'s architecture fascinates all ages, Doña Casilda Park offers space to run around, and Ereaga Beach is right beside the ship. The pintxos culture works well with kids - they can pick what looks interesting.',
      },
      {
        question: 'Is Bilbao wheelchair accessible?',
        answer: 'The Guggenheim is fully accessible. The Old Town has some cobblestones but main plazas are manageable. Metro stations have lifts. The Vizcaya Bridge gondola is wheelchair accessible. Getxo\'s promenade is flat and easy.',
      },
      {
        question: 'What\'s the weather like?',
        answer: 'Bilbao has an oceanic climate - mild but often wet. Expect temperatures of 13 to 18°C in spring and autumn with a high chance of rain. Pack layers and a waterproof jacket regardless of forecast.',
      },
      {
        question: 'Can I visit San Juan de Gaztelugatxe (Game of Thrones location)?',
        answer: 'Yes, but it requires advance planning. Located 35 km from Bilbao, you need a half-day excursion (organised tour or rental car). Book free entry tickets in advance for peak times. The hike involves 241 steps and takes about 75 minutes return.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to October for pleasant weather',
      cruiseTerminals: ['Getxo cruise terminal'],
      nearbyAirport: 'Bilbao Airport (BIO) - 10 km northeast of city, about 20 km from Getxo',
      visaInfo: 'Spain is part of the Schengen Area',
      emergencyNumber: '112 (pan-European emergency number)',
      tippingCustom: 'Not obligatory - rounding up or small change appreciated',
      siestaShopClosing: 'Less observed than southern Spain, some shops close 14:00 to 17:00',
    },

    weather: {
      intro: '13 to 16°C | Expect rain - this is Green Spain! Pack layers and a waterproof jacket. Bilbao has an oceanic climate with mild but wet conditions year-round. March and April average 16 to 18 rainy days per month.',
      months: [
        { month: 'Jan', highC: 13, lowC: 6, rainMm: 140, sunDays: 9, seaTempC: 13 },
        { month: 'Feb', highC: 14, lowC: 7, rainMm: 110, sunDays: 11, seaTempC: 13 },
        { month: 'Mar', highC: 16, lowC: 9, rainMm: 100, sunDays: 13, seaTempC: 14 },
        { month: 'Apr', highC: 17, lowC: 10, rainMm: 110, sunDays: 15, seaTempC: 15 },
        { month: 'May', highC: 20, lowC: 13, rainMm: 90, sunDays: 17, seaTempC: 17 },
        { month: 'Jun', highC: 23, lowC: 16, rainMm: 70, sunDays: 20, seaTempC: 19 },
        { month: 'Jul', highC: 26, lowC: 18, rainMm: 50, sunDays: 24, seaTempC: 21 },
        { month: 'Aug', highC: 26, lowC: 18, rainMm: 70, sunDays: 23, seaTempC: 22 },
        { month: 'Sep', highC: 24, lowC: 16, rainMm: 90, sunDays: 19, seaTempC: 21 },
        { month: 'Oct', highC: 21, lowC: 13, rainMm: 120, sunDays: 15, seaTempC: 19 },
        { month: 'Nov', highC: 16, lowC: 9, rainMm: 150, sunDays: 11, seaTempC: 16 },
        { month: 'Dec', highC: 13, lowC: 7, rainMm: 140, sunDays: 9, seaTempC: 14 },
      ],
      bestTime: {
        overall: 'May to October for pleasant weather and good conditions for exploring',
        hottest: 'July to August are warmest with festivals and vibrant atmosphere',
        quietest: 'May and September offer perfect sightseeing with fewer crowds',
        recommendation: 'Summer months offer most comfortable conditions for museum visits and outdoor pintxos culture',
      },
    },
    
    relatedDestinations: ['mediterranean-cruises', 'atlantic-coast-cruises'],
    
    meta: {
      title: 'Bilbao Cruise Port Guide | Guggenheim & Basque Pintxos',
      description: 'Complete Bilbao cruise port guide from Getxo. Visit the Guggenheim Museum, explore Casco Viejo pintxos bars, experience the Vizcaya Bridge, and discover authentic Basque culture.',
      keywords: ['Bilbao cruise port', 'Guggenheim Museum', 'Basque Country cruise', 'Bilbao shore excursions', 'Getxo cruise terminal', 'Bilbao pintxos', 'Vizcaya Bridge'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  // Gibraltar
  {
    id: 'gibraltar',
    slug: 'gibraltar',
    name: 'Gibraltar',
    country: 'United Kingdom (British Overseas Territory)',
    region: 'mediterranean',
    coordinates: { lat: 36.1447, lon: -5.3527 },
    tagline: 'Rock, apes and duty-free frontier',
    description: 'Gibraltar straddles Mediterranean and Atlantic at the strategic Strait, where the towering 426m Rock dominates the skyline amid naval history and nature reserves. Cruise ships dock centrally for direct access to Main Street\'s pubs, cathedrals, and cable car ascents to ape-filled summit viewpoints. Tax-free shopping and quick Spain border hops add cross-cultural appeal.',
    
    aboutPort: {
      overview: 'Queensway Quay and Ocean Village marina terminals handle large ships with modern facilities, WiFi, and shuttle links to town centre.',
      terminals: 'North Mole berths mega-ships 1km from Main Street; free port shuttles run every 15 minutes.',
      shuttle: 'Free port shuttles run every 15 minutes to town centre.',
      walkability: 'Flat 10 to 15 minute walk to shops and pubs; taxis available.',
    },
    
    quickFacts: {
      currency: 'GBP (£), EUR (€)',
      language: 'English, Spanish',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Gibraltar International Airport (GIB)',
        distance: '1km, 5 minutes taxi',
        options: 'Frequent shuttles or 20-minute walk across runway.',
      },
      trains: {
        mainStation: 'None',
        description: 'None; Spanish Algeciras station 30 minutes cross-border bus.',
        localHubs: 'N/A',
      },
    },
    
    gettingAround: {
      fromPort: 'Exit terminal for 10-minute stroll down Irish Town to Main Street.',
      publicTransport: 'No public buses (walking and taxis dominate); hop-on hop-off minibus loops Rock, tunnels, and border.',
      taxis: 'Taxis available at terminal.',
      walkingDistance: 'Distances: Cathedral 10 minutes, border 20 minutes, Rock summit 30 minutes cable car. Cable car base 15 minutes walk.',
      sightseeingBus: 'Hop-on hop-off minibus loops Rock, tunnels, and border.',
    },
    
    mustSeeSights: [
      {
        title: 'The Rock & Cable Car',
        category: 'landmark',
        description: '426m limestone monolith with military tunnels, WWII siege relics, and 360° sea views from summit.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Cable car up, walk down via apes',
          'Mornings shortest queues',
          'Wear sturdy shoes',
        ],
        highlights: ['Views', 'Nature', 'History', 'Wildlife'],
        goodFor: ['First-time visitors', 'Photographers', 'Active travelers'],
      },
      {
        title: 'Barbary Macaques',
        category: 'nature',
        description: 'Wild ape colony roaming summit paths; only wild monkeys in Europe, protected feeding zones.',
        duration: '30 minutes to 1 hour for a relaxed pace',
        tips: [
          'No feeding (fines apply)',
          'Keep distance from young',
          'Afternoon more active',
        ],
        highlights: ['Wildlife', 'Nature', 'Photography'],
        goodFor: ['Families', 'Photographers'],
      },
      {
        title: 'Main Street & Grand Casemates Square',
        category: 'stroll',
        description: 'Pedestrian shopping street with pubs, duty-free, and Trafalgar Cemetery; lively relaxing.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Morning before coaches',
          'Try fish chips at local pubs',
          'Free WiFi widespread',
        ],
        highlights: ['Shopping', 'Culture', 'Food', 'History'],
        goodFor: ['First-time visitors', 'Shoppers', 'Foodies'],
      },
      {
        title: 'Cathedral of St. Mary the Crowned',
        category: 'historic',
        description: '15th-century Moorish origins with Renaissance nave; Gibraltar\'s mother church.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Free entry',
          'Modest dress',
          'Quiet mornings best',
        ],
        highlights: ['Architecture', 'Religious', 'History'],
        goodFor: ['History buffs', 'Culture seekers'],
      },
      {
        title: 'Great Siege Tunnels',
        category: 'historic',
        description: '18th-century rock-hewn defences from 1779-1783 siege; guided audio tours.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Book ahead peak days',
          'Claustrophobic sections',
          'Combine with cable car',
        ],
        highlights: ['History', 'Architecture'],
        goodFor: ['History buffs'],
      },
      {
        title: 'Europa Point Lighthouse',
        category: 'nature',
        description: 'Southernmost tip with Africa views, mosque, and WWII gun battery.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Bus 2 from town',
          'Clear days for Morocco',
          'Free entry',
        ],
        highlights: ['Views', 'History', 'Photography'],
        goodFor: ['Photographers', 'History buffs'],
      },
    ],
    
    thingsToDo: [],
    shoreExcursions: [],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Main Street pubs',
        type: 'Pub',
        description: 'Fish chips and pints in the heart of duty-free zone.',
      },
      {
        name: 'Casemates Square stalls',
        type: 'Food Hall',
        description: 'International quick bites, 10-minute walk from port.',
      },
      {
        name: 'Rock Hotel terrace',
        type: 'Restaurant',
        description: 'Gibraltar grill specials at cable car base area.',
      },
      {
        name: 'Border tapas bars',
        type: 'Tapas Bar',
        description: 'Spanish crossover plates on La Línea side.',
      },
    ],
    
    insiderTips: [
      'Cable car tickets online; queues explode post-11am with coaches.',
      'Secure bags near apes (they steal glasses and food); no feeding fines apply.',
      'Visit Rock morning, town afternoon to avoid heat and crowds.',
      'Walk everywhere (compact); taxis for mobility and elderly.',
      'Cards everywhere; Gibraltar Pound notes UK-accepted; 10% tip restaurants.',
      'Cathedral shoulders and knees covered; no siesta culture.',
      'Skip overpriced Rock souvenirs; Main Street duty-free better.',
      'Free port WiFi; passport for Spanish border (queues 30+ minutes).',
    ],
    
    weather: {
      intro: 'Gibraltar has a Mediterranean climate with mild winters and warm summers. Spring offers ideal conditions for hiking and sightseeing.',
      months: [
        { month: 'Jan', highC: 15, lowC: 11, rainMm: 80, sunDays: 12, seaTempC: 15 },
        { month: 'Feb', highC: 15, lowC: 11, rainMm: 70, sunDays: 14, seaTempC: 15 },
        { month: 'Mar', highC: 17, lowC: 12, rainMm: 60, sunDays: 16, seaTempC: 16 },
        { month: 'Apr', highC: 19, lowC: 14, rainMm: 50, sunDays: 19, seaTempC: 17 },
        { month: 'May', highC: 22, lowC: 16, rainMm: 30, sunDays: 22, seaTempC: 19 },
        { month: 'Jun', highC: 25, lowC: 19, rainMm: 20, sunDays: 25, seaTempC: 21 },
        { month: 'Jul', highC: 28, lowC: 22, rainMm: 10, sunDays: 28, seaTempC: 22 },
        { month: 'Aug', highC: 28, lowC: 22, rainMm: 10, sunDays: 27, seaTempC: 23 },
        { month: 'Sep', highC: 26, lowC: 20, rainMm: 20, sunDays: 24, seaTempC: 23 },
        { month: 'Oct', highC: 23, lowC: 18, rainMm: 50, sunDays: 20, seaTempC: 21 },
        { month: 'Nov', highC: 19, lowC: 14, rainMm: 70, sunDays: 15, seaTempC: 18 },
        { month: 'Dec', highC: 16, lowC: 12, rainMm: 90, sunDays: 13, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'April to June for mild hiking weather.',
        hottest: 'July to August sunny but crowded (cons).',
        quietest: 'May and September perfect Rock weather (pros).',
        recommendation: 'Spring avoids heat for first-timers.',
      },
    },
    
    faq: [
      {
        question: 'Is Gibraltar walkable from the cruise port?',
        answer: 'Yes, 10 to 15 minutes flat to Main Street shops.',
      },
      {
        question: 'How long do you need in Gibraltar?',
        answer: '6 to 8 hours covers Rock cable car, apes, and duty-free.',
      },
      {
        question: 'Is English widely spoken in Gibraltar?',
        answer: 'Yes, official language throughout.',
      },
      {
        question: 'Is Gibraltar safe for tourists?',
        answer: 'Very safe; standard pickpocket vigilance on Main Street.',
      },
      {
        question: 'Is Gibraltar expensive?',
        answer: 'Duty-free bargains; dining moderate.',
      },
      {
        question: 'Do I need cash in Gibraltar or can I use card?',
        answer: 'Cards dominant; Gibraltar Pound and Euro for small vendors.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent perfect (cable car walkable).',
      },
      {
        question: 'What is the best thing to do in Gibraltar on a cruise day?',
        answer: 'Cable car to apes and summit views.',
      },
      {
        question: 'Is Gibraltar wheelchair accessible?',
        answer: 'Town yes; Rock cable car partial access.',
      },
      {
        question: 'Is Gibraltar good for limited mobility?',
        answer: 'Main Street and cable car yes; tunnels and hikes no.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Spring and autumn',
      cruiseTerminals: ['Queensway Quay', 'Ocean Village'],
      nearbyAirport: 'Gibraltar (GIB), 1km',
      visaInfo: 'None for UK passport holders',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'canary-islands-cruises'],
    
    meta: {
      title: 'Gibraltar Cruise Port Guide | The Rock, Apes & Duty-Free',
      description: 'Complete Gibraltar cruise port guide. Visit the Rock of Gibraltar, see Barbary macaques, explore Main Street, and discover insider tips for your Mediterranean cruise.',
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
    coordinates: { lat: 38.3452, lon: -0.4815 },
    tagline: 'Costa Blanca castle and sands',
    description: 'Alicante combines Mediterranean beaches with a dramatic hilltop castle overlooking the yacht-filled marina and palm-lined promenades. Its compact old town buzzes with tapas bars and markets, while the cruise terminal\'s central location makes exploration effortless for passengers. Sunny climate and authentic Spanish vibe define this Costa Blanca gem.',
    
    aboutPort: {
      overview: 'Alicante\'s modern cruise terminal at Muelle de Poniente sits 1.5km from the centre, with free shuttles to the promenade and Volvo Ocean Race Museum. Handles large ships with WiFi, ATMs, and info desks.',
      terminals: 'Muelle de Poniente',
      shuttleServices: 'Free shuttles to the promenade and Volvo Ocean Race Museum.',
      walkability: 'Walk to Explanada de España takes 15 to 20 minutes flat; taxis and buses available at exit.',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Alicante-Elche Airport (ALC)',
        distance: '12km, 20 minutes by taxi',
        options: 'Taxi 20 minutes; Bus C6 (30 minutes) from port area.',
      },
      trains: {
        mainStation: 'Alicante Terminal Station',
        description: 'To Madrid, Valencia; local trams to beaches.',
        localHubs: '20-minute walk or short bus from port.',
      },
    },
    
    gettingAround: {
      fromPort: 'Shuttle drops at promenade; from there, 5 to 10 minutes to old town.',
      publicTransport: 'TRAM lines and buses #01/#02 serve beaches.',
      taxis: 'Taxis queue (fixed fares to centre).',
      walkingDistance: 'Distances: Castle elevator 15 minutes, Postiguet beach 10 minutes.',
      sightseeingBus: 'Hop-on hop-off Turibus loops castle, market, and beach (90 minutes, port stop).',
    },
    
    mustSeeSights: [
      {
        title: 'Castillo de Santa Bárbara',
        category: 'landmark',
        description: 'Massive 9th-century fortress atop Mount Benacantil with panoramic city and sea views; free elevator access.',
        duration: '1.5 to 2.5 hours for a relaxed pace',
        tips: [
          'Elevator from Postiguet beach side',
          'Mornings less windy',
          'Picnic on ramparts',
        ],
        highlights: ['Views', 'History', 'Architecture', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'History buffs'],
      },
      {
        title: 'El Barrio (Old Town)',
        category: 'historic',
        description: 'Medieval lanes with colourful houses, churches, and tapas spots around Santa Cruz neighbourhood.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Wander uphill from castle',
          'Evening for lights',
          'Avoid siesta',
        ],
        highlights: ['History', 'Culture', 'Architecture', 'Photography'],
        goodFor: ['Culture seekers', 'Photographers', 'Couples'],
      },
      {
        title: 'Explanada de España',
        category: 'stroll',
        description: 'Iconic 6.5 million-tile palm promenade with cafés and street performers along marina.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Sunset golden hour',
          'Artisan stalls weekends',
          'Benches for views',
        ],
        highlights: ['Photography', 'Culture', 'Shopping'],
        goodFor: ['First-time visitors', 'Solo travelers', 'Families'],
      },
      {
        title: 'Central Market (Mercado Central)',
        category: 'markets',
        description: 'Bustling art nouveau hall with fresh seafood, tapas, and local produce.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Weekday mornings',
          'Upstairs bar',
          'Cash for samples',
        ],
        highlights: ['Food', 'Markets', 'Culture'],
        goodFor: ['Foodies', 'First-time visitors'],
      },
      {
        title: 'Concatedral de San Nicolás',
        category: 'historic',
        description: 'Baroque cathedral with blue dome and serene plaza; free entry.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Morning light best',
          'Modest dress',
          'Nearby cafés',
        ],
        highlights: ['Architecture', 'Religious', 'History'],
        goodFor: ['Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Volvo Ocean Race Museum',
        category: 'family',
        description: 'Interactive sailing exhibits near promenade; free entry, family-focused.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Shuttle drop-off spot',
          'Hands-on for kids',
          'English displays',
        ],
        highlights: ['Culture', 'Family-friendly', 'Museums'],
        goodFor: ['Families', 'First-time visitors'],
      },
    ],
    
    thingsToDo: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: 'Postiguet Beach',
      description: 'Urban golden sands right below the castle, backed by promenade with chiringuitos and showers. Perfect city-beach combo for quick dips.',
      type: 'sand',
      waterEntry: 'shallow entry',
      shelter: 'partially sheltered',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: '10 to 15 minutes from port or shuttle stop',
        taxiTime: '5 minutes',
        busRoute: 'Bus 01',
        notes: 'Elevator to castle starts here; flat access',
      },
      bestFor: ['families with children', 'swimming', 'relaxing'],
      tip: 'Castle side quieter than promenade end',
    },
    
    foodAndDrink: [
      {
        name: 'Central Market',
        type: 'Market',
        description: 'Fresh tapas and seafood stalls.',
      },
      {
        name: 'D\'Tablas',
        type: 'Restaurant',
        description: 'Local rice dishes and wines in old town alleys.',
      },
      {
        name: 'Promenade chiringuitos',
        type: 'Tapas Bar',
        description: 'Beachside paella on Postiguet beachfront.',
      },
      {
        name: 'Barrio Santa Cruz bars',
        type: 'Tapas Bar',
        description: 'Pintxos in historic streets near castle base.',
      },
    ],
    
    insiderTips: [
      'Castle elevator free but queues form; go early.',
      'Pickpockets in markets; use money belts.',
      'Sights best 9 to 11am pre-cruise rush.',
      'Shuttle or walk centre; tram for outer beaches.',
      'Cards common; euros for stalls; no tipping norm.',
      'Churches need covered shoulders; siesta 2 to 5pm.',
      'Skip souvenir chains; market better deals.',
      'Free port WiFi; offline maps for old town.',
    ],
    
    weather: {
      intro: 'Typical climate averages for Alicante; conditions vary by year.',
      months: [
        { month: 'Jan', highC: 16, lowC: 8, rainMm: 40, sunDays: 15, seaTempC: 15 },
        { month: 'Feb', highC: 17, lowC: 9, rainMm: 40, sunDays: 16, seaTempC: 15 },
        { month: 'Mar', highC: 19, lowC: 11, rainMm: 40, sunDays: 19, seaTempC: 16 },
        { month: 'Apr', highC: 21, lowC: 13, rainMm: 40, sunDays: 21, seaTempC: 17 },
        { month: 'May', highC: 24, lowC: 16, rainMm: 30, sunDays: 24, seaTempC: 19 },
        { month: 'Jun', highC: 28, lowC: 20, rainMm: 20, sunDays: 27, seaTempC: 22 },
        { month: 'Jul', highC: 31, lowC: 23, rainMm: 10, sunDays: 30, seaTempC: 24 },
        { month: 'Aug', highC: 31, lowC: 23, rainMm: 10, sunDays: 29, seaTempC: 25 },
        { month: 'Sep', highC: 28, lowC: 20, rainMm: 30, sunDays: 25, seaTempC: 24 },
        { month: 'Oct', highC: 25, lowC: 17, rainMm: 50, sunDays: 22, seaTempC: 22 },
        { month: 'Nov', highC: 20, lowC: 12, rainMm: 60, sunDays: 18, seaTempC: 18 },
        { month: 'Dec', highC: 17, lowC: 9, rainMm: 50, sunDays: 16, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'June to September for beach weather.',
        hottest: 'Peak season (Jul to Aug): Hot and crowded (cons).',
        quietest: 'Quieter months (May, Oct): Mild sun (pros).',
        recommendation: 'First-timers: May to Jun balance.',
      },
    },
    
    faq: [
      {
        question: 'Is Alicante walkable from the cruise port?',
        answer: 'Yes, 15 to 20 minutes flat to promenade and old town.',
      },
      {
        question: 'How long do you need in Alicante?',
        answer: '6 to 8 hours for castle, beach, market.',
      },
      {
        question: 'Is English widely spoken in Alicante?',
        answer: 'Yes in ports, tourist spots, beaches.',
      },
      {
        question: 'Is Alicante safe for tourists?',
        answer: 'Very safe; watch bags in markets.',
      },
      {
        question: 'Is Alicante expensive?',
        answer: 'Affordable tapas and beaches; moderate dining.',
      },
      {
        question: 'Do I need cash in Alicante or can I use card?',
        answer: 'Cards fine; cash for markets.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent perfect (all walkable).',
      },
      {
        question: 'What is the best thing to do in Alicante on a cruise day?',
        answer: 'Castle views to Postiguet beach stroll.',
      },
      {
        question: 'Are the beaches nice in Alicante?',
        answer: 'Yes, Postiguet urban sands steps away.',
      },
      {
        question: 'Is Alicante family-friendly?',
        answer: 'Excellent with beaches, museum, flat paths.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'May to October',
      cruiseTerminals: ['Muelle de Poniente'],
      nearbyAirport: 'Alicante-Elche (ALC), 12km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
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
    coordinates: { lat: 32.6443, lon: -16.9114 },
    tagline: 'Floating Garden of the Atlantic where toboggans race and flowers never stop blooming',
    description: 'Funchal, the capital of Portugal\'s Madeira archipelago, rises dramatically from the harbour in a natural amphitheatre of lush green hills dotted with white houses and red roofs. Cruise ships dock at the modern terminal on Pontinha Pier, just 15 to 20 minutes\' walk from the historic city centre. The city is most famous for its extraordinary gardens and the unique experience of riding a wicker toboggan down steep streets from Monte.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Funchal rises dramatically from the harbour in a natural amphitheatre of lush green hills. Named after the wild fennel (funcho) that Portuguese explorers found growing here in the 15th century. Madeira\'s mild year-round climate and unique flora have earned it the title of Europe\'s Best Cruise Destination.',
      terminals: 'Pontinha Pier, International Maritime Passenger Terminal',
      shuttleServices: 'Some cruise lines offer shuttles (around 9 euros return); taxis available for approximately 7 to 8 euros',
      walkability: 'Excellent - city centre easily walkable from port (15-20 mins)',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Portuguese',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Funchal Airport (Madeira Airport)',
        distance: 'Approximately 18km from port',
        options: 'Taxi or bus.',
      },
      trains: {
        mainStation: null,
        description: 'No train network on Madeira. Bus network serves the island.',
        localHubs: 'Bus station near city centre.',
      },
    },
    
    gettingAround: {
      fromPort: '15 to 20 minutes walk along the seafront promenade to city centre. Taxis and tuk-tuks available.',
      publicTransport: 'Public buses serve the city and island. The iconic cable car connects seafront to Monte.',
      taxis: 'Readily available outside terminal. Approximately 7 to 8 euros to city centre.',
      walkingDistance: 'City centre: 15-20 mins. Cable car station: 20 mins. Market: 20 mins walk.',
      sightseeingBus: 'Hop-on hop-off buses available near port, covering city attractions, Monte, and gardens.',
      accessibility: 'City centre walkable. Cable car accessible. Old Town has cobbled streets. Monte gardens very steep.',
    },
    
    mustSeeSights: [
      {
        title: 'Monte Cable Car and Toboggan Ride',
        category: 'landmark',
        description: 'The iconic Funchal experience combines a spectacular 15-minute cable car ride soaring 550 metres above the city with the unique wicker toboggan descent. The traditional sledges, guided by two "carreiros" using their boots as brakes, have been thrilling visitors since the 1850s. The 2km toboggan ride reaches speeds of up to 30mph and ends in Livramento.',
        duration: '2 to 3 hours for a relaxed pace (including gardens at top)',
        tips: [
          'Go early morning or late afternoon to avoid cruise ship crowds at the cable car',
          'The toboggan ends at Livramento, not the bottom - you\'ll need a taxi (approximately 10 euros) back to town',
          'One-way cable car ticket works best if taking the toboggan down',
        ],
        highlights: ['Views', 'Culture', 'Photography', 'Family-friendly'],
        goodFor: ['First-time visitors', 'Families', 'Photographers', 'Adventure seekers'],
      },
      {
        title: 'Monte Palace Tropical Garden',
        category: 'nature',
        description: 'Stunning 70,000 square metre garden featuring exotic plants from around the world, oriental architecture, decorative tile panels, and a museum of semi-precious stones. The garden cascades down the hillside with lakes, sculptures, and African art. The Church of Nossa Senhora do Monte, resting place of Emperor Charles I of Austria, is nearby.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'The gardens are steep - start at the top and work your way down',
          'Comfortable walking shoes essential',
          'Allow extra time if visiting the museums inside',
        ],
        highlights: ['Gardens', 'Views', 'Art', 'Photography', 'Architecture'],
        goodFor: ['Garden lovers', 'Photographers', 'Art lovers', 'Culture seekers'],
      },
      {
        title: 'Cabo Girão Skywalk',
        category: 'nature',
        description: 'Europe\'s highest sea cliff skywalk at 580 metres above the Atlantic Ocean. The glass platform juts out over the sheer cliff face, providing vertigo-inducing views down to the terraced vineyards and tiny beach below. A cable car descends to the base where you can swim.',
        duration: '2 to 3 hours including travel for a relaxed pace',
        tips: [
          'Early morning offers clearest views and fewer crowds',
          'Not for those with fear of heights - the glass floor is intimidating',
          'Combine with nearby Câmara de Lobos fishing village',
        ],
        highlights: ['Views', 'Nature', 'Photography'],
        goodFor: ['Photographers', 'Thrill seekers', 'First-time visitors'],
      },
      {
        title: 'Câmara de Lobos',
        category: 'stroll',
        description: 'Picturesque fishing village made famous by Winston Churchill, who painted its colourful boats and harbour. The traditional fishing boats still line the small harbour, and cliff-top viewpoints offer stunning panoramas. The village has excellent seafood restaurants and authentic local atmosphere.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'The hop-on hop-off bus stops here making independent visits easy',
          'Try the local poncha drink at a harbourside bar',
          'The Churchill viewpoint has an information board about his painting',
        ],
        highlights: ['Photography', 'Food', 'Culture', 'Scenic'],
        goodFor: ['Photographers', 'Foodies', 'Culture seekers', 'Couples'],
      },
      {
        title: 'Madeira Botanical Garden',
        category: 'nature',
        description: 'Nine acres of stunning gardens featuring over 2,500 exotic and rare plants, with panoramic views over Funchal. The garden includes a natural history museum, bird park, and themed sections from succulents to tropical flowers. A separate cable car connects from Monte.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Can be combined with Monte via the Botanical Garden cable car',
          'Entry to garden is separate from cable car tickets',
          'Less steep than Monte Palace and more traditional garden layout',
        ],
        highlights: ['Gardens', 'Views', 'Nature', 'Photography'],
        goodFor: ['Garden lovers', 'Photographers', 'Families', 'Nature lovers'],
      },
      {
        title: 'Blandy\'s Wine Lodge',
        category: 'historic',
        description: 'Discover the history and production of Madeira wine at this historic lodge founded in 1811. Guided tours take you through the 200-year-old cellars, explaining the unique heating process that creates Madeira\'s distinctive flavour. Tours conclude with tastings of different wine styles from dry to sweet.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Book tours in advance, especially when multiple ships are in port',
          'The vintage room has wines dating back 150 years',
          'Tours run in multiple languages',
        ],
        highlights: ['History', 'Food', 'Culture'],
        goodFor: ['Foodies', 'History buffs', 'Couples', 'Wine lovers'],
      },
      {
        title: 'Old Town (Zona Velha)',
        category: 'stroll',
        description: 'Funchal\'s historic quarter features narrow cobbled streets, the 15th-century Sé Cathedral, traditional tavernas, and the famous painted doors art project on Rua de Santa Maria. The Fortaleza de São Tiago fortress offers panoramic harbour views. Local restaurants serve authentic Madeiran cuisine in atmospheric settings.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'The painted doors make every street a photo opportunity',
          'Evening atmosphere is magical with lit doorways',
          'Look for espetada (beef skewers) on restaurant menus',
        ],
        highlights: ['Culture', 'Photography', 'Food', 'History'],
        goodFor: ['First-time visitors', 'Photographers', 'Foodies', 'Culture seekers'],
      },
      {
        title: 'Mercado dos Lavradores',
        category: 'markets',
        description: 'Funchal\'s famous farmers\' market is a feast for the senses, with flowers, exotic fruits, vegetables, and fish displayed in a beautiful Art Deco building. Local vendors in traditional costume offer samples of unfamiliar tropical fruits. The fish hall displays the distinctive black scabbard fish unique to Madeira.',
        duration: '1 hour for a relaxed pace',
        tips: [
          'Morning is best for atmosphere and freshest produce',
          'Try the exotic fruits but agree on price before accepting samples',
          'The flower vendors offer great value on pre-made bouquets',
        ],
        highlights: ['Markets', 'Food', 'Culture', 'Photography'],
        goodFor: ['Foodies', 'Photographers', 'First-time visitors', 'Culture seekers'],
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Monte Cable Car & Toboggan',
        description: 'Iconic cable car ride and traditional wicker toboggan descent',
        duration: 'Half day',
        bookWith: 'Independent or ship excursion',
      },
      {
        title: 'Cabo Girão Skywalk',
        description: 'Europe\'s highest sea cliff skywalk with glass platform',
        duration: 'Half day',
        bookWith: 'Ship excursion or hop-on bus',
      },
      {
        title: 'Levada Walks',
        description: 'Hiking along ancient irrigation channels through laurel forests',
        duration: 'Half to full day',
        bookWith: 'Ship excursion or local tour',
      },
    ],
    
    nearestBeach: {
      name: 'Praia Formosa',
      distance: 'Short bus or taxi ride (approximately 10 minutes), not walkable',
      description: 'Madeira\'s largest beach complex with dark pebbles and small sandy sections. Several beach clubs and facilities make this a popular spot for locals and visitors. ~20°C year-round sea temperature.',
    },
    
    foodAndDrink: [
      {
        name: 'Gavião Novo',
        type: 'Restaurant',
        description: 'Traditional Madeiran cuisine with espetada specialty in Old Town.',
      },
      {
        name: 'Armazém do Sal',
        type: 'Restaurant',
        description: 'Modern Madeiran food in converted salt warehouse near Marina.',
      },
      {
        name: 'A Muralha',
        type: 'Restaurant',
        description: 'Authentic local restaurant in historic building on Rua de Santa Maria.',
      },
      {
        name: 'Ritz Madeira',
        type: 'Cafe',
        description: 'Historic cafe with traditional pastries in City Centre.',
      },
      {
        name: 'Armazém do Mercado',
        type: 'Cafe',
        description: 'Trendy food hall with multiple vendors near Market.',
      },
      {
        name: 'Galáxia Skybar',
        type: 'Bar',
        description: 'Galaxy-themed rooftop bar with mountain views at Savoy Palace Hotel.',
      },
      {
        name: 'Venda Velha',
        type: 'Bar',
        description: 'Traditional poncha and local atmosphere in Old Town.',
      },
    ],
    
    insiderTips: [
      'The cable car to Monte can have long queues when multiple cruise ships are in port - go early or later afternoon',
      'Monte toboggans end halfway down the hill at Livramento, not at the port - you\'ll need a taxi or bus back',
      'The best way to experience highlights: cable car up to Monte in the morning, explore gardens, then toboggan down',
      'The painted doors of Rua de Santa Maria in Old Town are incredibly photogenic',
      'Try espetada (beef skewers hung from a stand), espada com banana (black scabbard fish with banana), and poncha cocktail',
      'Blandy\'s Wine Lodge tours should be booked in advance when multiple ships are in port',
      'Many shops close during siesta (roughly 1pm to 3pm), though tourist areas often stay open',
      'Santa Catarina Park offers excellent harbour views and is a pleasant spot to relax',
    ],
    
    faq: [
      {
        question: 'Is Funchal walkable from the cruise port?',
        answer: 'Yes, the city centre and Old Town are 15 to 20 minutes pleasant walk along the seafront promenade. The route is flat and well-maintained. The cable car station is about 20 minutes walk.',
      },
      {
        question: 'How long do you need in Funchal?',
        answer: 'A full day allows you to experience the cable car, Monte gardens, toboggan ride, and Old Town exploration. Half a day works for just the city centre highlights.',
      },
      {
        question: 'Is English widely spoken in Funchal?',
        answer: 'Yes, English is spoken throughout tourist areas, hotels, and restaurants. Portuguese is the official language but you will have no communication difficulties.',
      },
      {
        question: 'Is Funchal safe for tourists?',
        answer: 'Very safe. Madeira has very low crime rates. Normal precautions apply but violent crime is extremely rare.',
      },
      {
        question: 'Is Funchal expensive?',
        answer: 'Moderate by Western European standards and cheaper than mainland Portugal. Restaurants, transport, and attractions offer good value.',
      },
      {
        question: 'Do I need cash in Funchal or can I use card?',
        answer: 'Card payments are widely accepted including contactless. Some smaller vendors at the market prefer cash. ATMs are readily available.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Funchal is very easy to explore independently. The cable car and toboggan can be booked on the day (though queues form). For island tours to Cabo Girão or levada walks, ship excursions or local tours are convenient.',
      },
      {
        question: 'What is the best thing to do in Funchal on a cruise day?',
        answer: 'Take the cable car to Monte in the morning, explore the gardens, then ride the toboggan down. Spend the afternoon in the Old Town discovering painted doors and trying local food. Visit Blandy\'s Wine Lodge for a tasting before returning to the ship.',
      },
      {
        question: 'Is Funchal family-friendly?',
        answer: 'Excellent for families. Children love the cable car and toboggan (minimum age/height may apply for toboggan). Santa Catarina Park has a playground, and the CR7 Museum appeals to young football fans.',
      },
      {
        question: 'What is the weather like in Funchal?',
        answer: 'Mild year-round with temperatures between 18 and 25°C. The island lives up to its "Eternal Spring" nickname. Higher areas like Monte can be cooler and cloudier than the coast.',
      },
    ],
    
    weather: {
      intro: '18 to 25°C throughout the year with little seasonal variation. The mountains can be cooler and cloudier. Pack layers and a light rain jacket for higher altitudes.',
      months: [
        { month: 'Jan', highC: 19, lowC: 13, rainMm: 100, sunDays: 4, seaTempC: 18 },
        { month: 'Feb', highC: 19, lowC: 13, rainMm: 85, sunDays: 5, seaTempC: 18 },
        { month: 'Mar', highC: 19, lowC: 13, rainMm: 65, sunDays: 5, seaTempC: 18 },
        { month: 'Apr', highC: 20, lowC: 14, rainMm: 40, sunDays: 6, seaTempC: 18 },
        { month: 'May', highC: 21, lowC: 15, rainMm: 25, sunDays: 7, seaTempC: 19 },
        { month: 'Jun', highC: 23, lowC: 17, rainMm: 15, sunDays: 8, seaTempC: 20 },
        { month: 'Jul', highC: 25, lowC: 19, rainMm: 5, sunDays: 9, seaTempC: 22 },
        { month: 'Aug', highC: 26, lowC: 19, rainMm: 5, sunDays: 9, seaTempC: 23 },
        { month: 'Sep', highC: 25, lowC: 19, rainMm: 35, sunDays: 7, seaTempC: 23 },
        { month: 'Oct', highC: 23, lowC: 17, rainMm: 75, sunDays: 6, seaTempC: 22 },
        { month: 'Nov', highC: 21, lowC: 15, rainMm: 95, sunDays: 5, seaTempC: 20 },
        { month: 'Dec', highC: 19, lowC: 14, rainMm: 100, sunDays: 4, seaTempC: 19 },
      ],
      bestTime: {
        overall: 'Funchal is pleasant year-round thanks to its mild subtropical climate',
        hottest: 'April to October offers the driest weather with July to September being warmest',
        quietest: 'Winter can be wetter but temperatures remain mild',
        recommendation: 'Year-round, April to October driest',
      },
    },
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round, April to October driest',
      cruiseTerminals: ['International Maritime Passenger Terminal, Pontinha Pier'],
      nearbyAirport: 'Funchal Airport (Madeira Airport), approximately 18km from port',
      visaInfo: 'Madeira is part of Portugal and the Schengen Area',
      emergencyNumber: '112 for all emergencies',
      tippingCustom: 'Not mandatory, 5 to 10 percent appreciated for good service',
      siestaShopClosing: 'Some shops close 1pm to 3pm, tourist areas usually stay open',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'atlantic-islands-cruises'],
    
    meta: {
      title: 'Funchal Madeira Cruise Port Guide | Cable Cars & Toboggans',
      description: 'Complete Funchal Madeira cruise port guide. Experience the Monte cable car and toboggan, explore subtropical gardens, visit the painted doors of Old Town, and taste Madeira wine.',
      keywords: ['Funchal cruise port', 'Madeira cruise guide', 'Funchal cable car', 'Madeira toboggan', 'Funchal things to do', 'Madeira port guide', 'Monte Palace Garden'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  // Las Palmas, Gran Canaria
  {
    id: 'las-palmas',
    slug: 'las-palmas-gran-canaria',
    name: 'Las Palmas, Gran Canaria',
    country: 'Spain (Canary Islands)',
    region: 'atlantic-islands',
    coordinates: { lat: 28.1418, lon: -15.4310 },
    tagline: 'City, surf and sunshine in Gran Canaria',
    description: 'Las Palmas combines a lively Atlantic city with one of Spain\'s best urban beaches, historic colonial streets, and year-round springlike weather. Cruise ships dock at Muelle Santa Catalina, just a short walk from Santa Catalina Park, a large shopping centre and the start of Las Canteras Beach, making it ideal for independent exploring.',
    
    aboutPort: {
      overview: 'Cruise ships dock at Muelle Santa Catalina, the main cruise pier in Las Palmas, beside the El Muelle shopping centre and a few minutes\' walk from Santa Catalina Park. The expanded terminal at Santa Catalina can now berth multiple large cruise vessels at once and has modern facilities, including check-in areas, seating, Wi-Fi and a landscaped promenade linking it to the city\'s main boulevard.',
      terminals: 'Muelle de Santa Catalina (main cruise terminal; sometimes referred to simply as Santa Catalina Pier)',
      shuttle: 'No shuttles typically needed as the terminal is directly beside El Muelle mall and Santa Catalina Park.',
      walkability: 'Santa Catalina area and beach are right by the pier; historic Vegueta is a short bus or taxi ride away. Taxis, city buses and the hop-on hop-off bus are available immediately outside the terminal, and the flat seafront makes walking easy for most passengers.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+0',
      portType: 'Home Port & Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Gran Canaria Airport (LPA)',
        distance: 'Around 25 km south of Las Palmas (about 20 to 25 minutes by taxi in normal traffic)',
        options: 'Taxi directly from the cruise area or Santa Catalina (20 to 30 minutes). Intercity buses from San Telmo bus station to the airport; you can reach San Telmo easily by city bus or taxi from the port.',
      },
      trains: {
        mainStation: 'N/A',
        description: 'There is no train network on Gran Canaria; buses cover intercity and resort routes. The main hubs in Las Palmas are San Telmo bus station (for island-wide routes) and Santa Catalina (for local lines), both reachable by short bus or taxi from the pier.',
        localHubs: 'N/A',
      },
    },

    gettingAround: {
      fromPort: 'Walk 5 minutes to El Muelle mall and Santa Catalina Park, or follow the waterfront to Las Canteras Beach in around 10 minutes.',
      publicTransport: 'City buses leave from stops near Santa Catalina Park and Plaza de Canarias; bus 1 and 12 are popular routes to the historic Vegueta and Triana districts (around 15 to 20 minutes).',
      taxis: 'Rank just outside the terminal, with fixed or metered fares to Vegueta (about 10 minutes) and other parts of the city.',
      walkingDistance: 'Santa Catalina Park: 5 minutes. Las Canteras Beach (central stretch): around 10 minutes. Castillo de la Luz: 15 to 20 minutes along the waterfront.',
      sightseeingBus: 'The official city sightseeing bus has a stop at Muelle Santa Catalina and a loop including Las Canteras, Auditorio Alfredo Kraus, Vegueta Old Town and other key sights; typical full loop is about 90 minutes.',
    },
    
    mustSeeSights: [
      {
        title: 'Las Canteras Beach',
        category: 'beach',
        description: 'Las Canteras is a long, curving city beach with golden sand, a natural offshore reef that helps calm the waters, and a busy promenade lined with cafés, restaurants and surf schools. It is one of the main reasons many passengers stay right in Las Palmas for their cruise stop.',
        duration: '2 to 4 hours for a relaxed pace',
        tips: [
          'Walk towards the central or northern sections for calmer water protected by the reef, especially at low tide',
          'Bring water shoes if you want to explore rocky areas and tidal pools at very low tide',
          'Combine a beach session with a promenade stroll and café stop so you stay close to the ship',
        ],
        highlights: ['Beaches', 'Views', 'Photography', 'Food', 'Nature'],
        goodFor: ['Families', 'First-time visitors', 'Couples', 'Solo travelers'],
      },
      {
        title: 'Vegueta Old Town',
        category: 'historic',
        description: 'Vegueta is the original historic quarter of Las Palmas, with cobbled streets, colonial houses, museums and the imposing cathedral at its heart. It offers a very different feel from the modern port area and gives a glimpse of the city\'s role in Atlantic exploration.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Take bus 1 or 12 from near Santa Catalina and get off at Teatro to reach Vegueta and Triana easily',
          'Visit in the morning for cooler temperatures and quieter streets, especially on hot or busy cruise days',
          'Spend time in the cathedral square and side streets rather than rushing straight back to the bus stop',
        ],
        highlights: ['History', 'Architecture', 'Culture', 'Photography', 'Museums'],
        goodFor: ['History buffs', 'Culture seekers', 'Photographers', 'Couples'],
      },
      {
        title: 'Casa de Colón (Columbus House)',
        category: 'historic',
        description: 'This museum, set in a handsome 15th-century building in Vegueta, explores Christopher Columbus\' journeys and the Canary Islands\' role as a staging post for Atlantic voyages. Courtyards, models and artefacts make it an engaging stop even for those with only a passing interest in history.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Check opening times as the museum closes on some Mondays and has shorter Sunday hours',
          'Combine with a walking loop of Vegueta so you do not need to double back',
          'Allow time to enjoy the courtyards and architectural details, not just the exhibits',
        ],
        highlights: ['History', 'Museums', 'Architecture', 'Culture'],
        goodFor: ['History buffs', 'Culture seekers', 'Families', 'First-time visitors'],
      },
      {
        title: 'Catedral de Santa Ana and Plaza de Santa Ana',
        category: 'landmark',
        description: 'The Cathedral of Santa Ana towers over Vegueta\'s main square, with twin towers, a large interior and access to rooftop views in good weather. The surrounding plaza, with statues of bronze dogs and elegant buildings, is one of the most photographed spots in Las Palmas.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Modest dress is expected inside; shoulders and knees should be covered',
          'If the tower or rooftop viewpoints are open, prioritise them for wide views over Vegueta and the harbour',
          'Take photos from multiple corners of the square to capture both the cathedral and surrounding architecture',
        ],
        highlights: ['Architecture', 'Religious', 'Photography', 'History'],
        goodFor: ['First-time visitors', 'Architecture lovers', 'Photographers', 'Culture seekers'],
      },
      {
        title: 'Santa Catalina Park and El Muelle Area',
        category: 'stroll',
        description: 'Santa Catalina Park is a lively open square just behind the cruise area, surrounded by cafés, kiosks and the bus interchange, with El Muelle shopping centre and the science museum nearby. It is an easy first orientation point and a practical base for transport, shopping and short walks.',
        duration: '45 minutes to 1.5 hours for a relaxed pace',
        tips: [
          'Use the park as your landmark for returning to the ship, as it sits between the cruise terminal and Las Canteras',
          'Pick up bus tickets and information at the kiosks and bus stops here if heading to Vegueta',
          'Grab a coffee or snack at terrace cafés and watch daily life before or after exploring further afield',
        ],
        highlights: ['Culture', 'Food', 'Shopping', 'Photography'],
        goodFor: ['First-time visitors', 'Families', 'Solo travelers', 'Couples'],
      },
      {
        title: 'Castillo de la Luz',
        category: 'historic',
        description: 'Castillo de la Luz is a 15th-century fortress located near the port area that once guarded the harbour and now houses cultural exhibitions and art. Its thick stone walls and simple lines contrast with the modern surroundings and offer a short, manageable cultural stop close to the ship.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Walk along the waterfront from the cruise terminal; it takes roughly 15 to 20 minutes on foot',
          'Check opening days, as the castle is often closed on Mondays and late afternoons on some days',
          'Combine with a Las Canteras walk to create a loop that brings you back through Santa Catalina Park',
        ],
        highlights: ['History', 'Architecture', 'Museums', 'Photography'],
        goodFor: ['History buffs', 'Culture seekers', 'Photographers', 'Families'],
      },
    ],

    thingsToDo: [],
    
    nearestBeach: {
      name: 'Playa de Las Canteras',
      description: 'Las Canteras is a long, crescent-shaped urban beach with relatively calm waters thanks to the natural offshore reef, which shelters much of the bay. A paved seafront promenade, the Paseo de Las Canteras, runs along the sand and is lined with cafés, ice-cream shops and restaurants, making it ideal for a beach-and-city day.',
      type: 'sand',
      waterEntry: 'shallow entry near much of the central section, with some areas deepening more quickly depending on the tide',
      shelter: 'partially sheltered by the reef',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: false,
      },
      access: {
        walkTime: 'About 10 to 15 minutes from the cruise terminal via Santa Catalina Park and the mall area',
        taxiTime: 'Around 5 minutes, though usually walking is easier given how close it is',
        busRoute: 'City buses run parallel to the beach but walking from the pier is usually simplest',
        notes: 'The route is flat and suitable for most mobility levels; there are ramps from the promenade to the sand in several places',
      },
      bestFor: ['families with children', 'swimming', 'relaxing'],
      tip: 'Check the tide before you go, as low tide reveals more sheltered shallows and tidal-pool style areas, while higher tide brings livelier waves and better surf towards some sections',
    },

    foodAndDrink: [
      {
        name: 'Promenade cafés at Las Canteras',
        type: 'Restaurant/Tapas Bar',
        description: 'A row of casual spots along the Paseo de Las Canteras serves fresh fish, tapas and ice cream with front-row sea views, ideal for long lunches or sundowners.',
      },
      {
        name: 'Restaurants around Santa Catalina Park',
        type: 'Tapas Bar/Restaurant',
        description: 'Terrace cafés and tapas bars here serve Canarian dishes like papas arrugadas with mojo and simple grilled fish, convenient for a quick bite before returning to the ship.',
      },
      {
        name: 'Vegueta and Triana eateries',
        type: 'Restaurant/Tapas Bar',
        description: 'Around Vegueta\'s squares and Triana\'s shopping streets you will find traditional restaurants, wine bars and tapas spots, perfect for a more atmospheric meal amid historic surroundings.',
      },
      {
        name: 'El Muelle shopping centre food court',
        type: 'Food Hall/Café',
        description: 'The mall next to the pier has chain cafés and restaurants for those wanting something quick and familiar, plus rooftop terraces with harbour views.',
      },
    ],

    insiderTips: [
      'Pre-book organised excursions only if you plan to leave the city (for example, to the interior mountains or resort areas); for Las Canteras and Vegueta, DIY is straightforward by walking and urban buses.',
      'Watch out for pickpockets in crowded areas such as buses, Santa Catalina Park and around the cathedral; keep bags zipped and valuables close.',
      'If multiple ships are in, go early to Vegueta (around 9 to 11 am) to enjoy quieter historic streets before returning to the beach later in the day.',
      'Use local buses 1 or 12 from near the port to reach Vegueta cheaply and quickly; tickets can usually be bought with coins from the driver.',
      'Cards are widely accepted in shops and restaurants, but carry a small amount of euro cash for bus fares, small cafés and ice-cream stands.',
      'Canarian dining times are relatively relaxed; lunchtime runs from around 1 to 3 pm, and evening meals often start from 8 pm, though cruise-friendly venues near the port open earlier.',
      'Avoid spending your whole visit inside the mall unless you specifically need shopping; with the beach and historic quarter so close, a short walk offers a much more authentic experience.',
      'Take advantage of the flat, accessible paths around the port and along Las Canteras if travelling with limited mobility; the area around the cruise terminal and park is particularly suitable.',
    ],
    
    faq: [
      {
        question: 'Is Las Palmas walkable from the cruise port?',
        answer: 'Yes, the cruise terminal at Muelle Santa Catalina is directly beside El Muelle mall and Santa Catalina Park, with Las Canteras Beach about 10 to 15 minutes\' walk away on flat pavements.',
      },
      {
        question: 'How long do you need in Las Palmas?',
        answer: 'A standard cruise call of 7 to 8 hours is enough to enjoy Las Canteras Beach, Santa Catalina and a round trip to Vegueta, especially if you use the local buses or hop-on bus.',
      },
      {
        question: 'Is English widely spoken in Las Palmas?',
        answer: 'English is common in the port, beach area, shops and tourist venues, though you may hear more Spanish in Vegueta and local cafés; basic phrases in Spanish are appreciated but not essential.',
      },
      {
        question: 'Is Las Palmas safe for tourists?',
        answer: 'Las Palmas is generally very safe, with most issues limited to petty theft such as pickpocketing on busy buses, in markets or in crowded areas around the cathedral and beach. Normal city precautions are sufficient for most visitors.',
      },
      {
        question: 'Is Las Palmas expensive?',
        answer: 'Prices are typically moderate compared with many European capitals; beach cafés and tourist restaurants near the promenade can be slightly higher, but local tapas bars and menus of the day offer good value.',
      },
      {
        question: 'Do I need cash in Las Palmas or can I use card?',
        answer: 'Cards are widely accepted in shops, supermarkets and restaurants, but having euro coins and small notes makes paying for local buses, simple coffees and ice creams much easier.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'For Las Canteras, Santa Catalina and Vegueta, exploring independently works very well thanks to short walking distances and straightforward buses; ship excursions are mainly useful if you want a structured island tour inland.',
      },
      {
        question: 'What is the best thing to do in Las Palmas on a cruise day?',
        answer: 'Many visitors spend the morning exploring Vegueta\'s historic streets and cathedral, then return to enjoy the afternoon on Las Canteras Beach with a stroll along the promenade and a meal with sea views.',
      },
      {
        question: 'Is Las Palmas good for families with children?',
        answer: 'Yes, the flat promenade, safe city beach with lifeguards, nearby parks and easy access to cafés and facilities make Las Palmas very family-friendly for a relaxed day right by the ship.',
      },
      {
        question: 'What should I avoid in Las Palmas?',
        answer: 'Try not to spend your entire stop only inside the mall or in the closest few bars by the port, as it is easy to reach both the excellent beach and the more characterful historic quarter with minimal effort. Pay attention to belongings on buses and in very crowded spots, as in any city.',
      },
    ],

    weather: {
      intro: 'Las Palmas has a subtropical climate with year-round warm, relatively dry conditions even in winter.',
      months: [
        { month: 'Jan', highC: 21, lowC: 15, rainMm: 25, rainyDays: null, sunDays: 20, seaTempC: 20, uv: null, wind: null },
        { month: 'Feb', highC: 21, lowC: 15, rainMm: 20, rainyDays: null, sunDays: 20, seaTempC: 19, uv: null, wind: null },
        { month: 'Mar', highC: 22, lowC: 16, rainMm: 15, rainyDays: null, sunDays: 23, seaTempC: 19, uv: null, wind: null },
        { month: 'Apr', highC: 22, lowC: 16, rainMm: 10, rainyDays: null, sunDays: 24, seaTempC: 19, uv: null, wind: null },
        { month: 'May', highC: 23, lowC: 17, rainMm: 5, rainyDays: null, sunDays: 26, seaTempC: 20, uv: null, wind: null },
        { month: 'Jun', highC: 25, lowC: 19, rainMm: 2, rainyDays: null, sunDays: 28, seaTempC: 21, uv: null, wind: null },
        { month: 'Jul', highC: 26, lowC: 20, rainMm: 1, rainyDays: null, sunDays: 30, seaTempC: 22, uv: null, wind: null },
        { month: 'Aug', highC: 27, lowC: 21, rainMm: 2, rainyDays: null, sunDays: 29, seaTempC: 23, uv: null, wind: null },
        { month: 'Sep', highC: 27, lowC: 21, rainMm: 5, rainyDays: null, sunDays: 27, seaTempC: 23, uv: null, wind: null },
        { month: 'Oct', highC: 26, lowC: 20, rainMm: 15, rainyDays: null, sunDays: 25, seaTempC: 23, uv: null, wind: null },
        { month: 'Nov', highC: 24, lowC: 18, rainMm: 20, rainyDays: null, sunDays: 22, seaTempC: 22, uv: null, wind: null },
        { month: 'Dec', highC: 22, lowC: 16, rainMm: 25, rainyDays: null, sunDays: 20, seaTempC: 21, uv: null, wind: null },
      ],
      bestTime: {
        overall: 'Las Palmas is genuinely year-round, with warm, relatively dry conditions even in winter.',
        hottest: 'Peak season (roughly December to February and school holidays) brings more visitors escaping colder climates but still avoids extreme heat seen in mainland summers.',
        quietest: 'Quieter months such as late spring and autumn offer warm sea temperatures, plenty of sun and fewer crowds, making them ideal for relaxed beach and city days on a first visit.',
        recommendation: 'Late spring and autumn offer warm sea temperatures, plenty of sun and fewer crowds, making them ideal for relaxed beach and city days on a first visit.',
      },
    },
    
    shoreExcursions: [],
    
    practicalInfo: {
      bestTimeToVisit: 'Las Palmas is ideal year-round, with particularly pleasant conditions from late autumn through spring when much of Europe is cooler',
      cruiseTerminals: ['Muelle de Santa Catalina (main cruise terminal; sometimes referred to simply as Santa Catalina Pier)'],
      nearbyAirport: 'Gran Canaria Airport (LPA), about 25 km south of the port',
      visaInfo: 'For tourist stays within the Schengen 90-days-in-180-days rule, visas are generally not required for UK passport holders at the time of writing',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'west-africa-cruises'],
    
    meta: {
      title: 'Las Palmas Gran Canaria Cruise Port Guide | Beach & City',
      description: 'Complete Las Palmas cruise port guide. Visit Las Canteras beach, explore Vegueta historic district, enjoy Canarian cuisine, and discover insider tips for your Atlantic cruise.',
      keywords: ['Las Palmas cruise port', 'Gran Canaria cruise', 'Las Palmas shore excursions', 'Canary Islands cruise', 'Las Palmas things to do', 'Santa Catalina cruise terminal']
    },

    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s El Muelle',
        location: 'Centro Comercial El Muelle (near cruise port)',
        walkingTime: '5-10 minutes from port',
        notes: 'Opened Dec 2024. Includes play area for children. Very convenient location right by port.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+El+Muelle+Las+Palmas&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP Calle Triana',
        location: 'Calle Mayor de Triana, 48, Las Palmas',
        walkingTime: '15 minutes from port',
        notes: 'Main shopping street. Gifts, toys, and novelties for kids.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+Calle+Triana+Las+Palmas&travelmode=walking',
      },
      localPark: {
        name: 'Parque Santa Catalina',
        location: 'Next to Poema del Mar aquarium',
        walkingTime: '5 minutes from port',
        facilities: 'Open square with trees, café, benches, near beach promenade',
        notes: 'Central meeting spot right by port. Perfect starting point. Combine with beach promenade walk.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Parque+Santa+Catalina+Las+Palmas&travelmode=walking',
      },
      themePark: {
        name: 'Poema del Mar Aquarium',
        location: 'Las Palmas waterfront (5 minutes walk from port)',
        type: 'Aquarium',
        highlights: 'Over 350 species in themed ecosystems, very immersive modern exhibits, large viewing windows',
        cost: 'Check current prices online',
        hours: 'Daily opening',
        notes: 'Walking distance from cruise port. Perfect for families. One of Europe\'s most impressive aquariums.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Poema+del+Mar+Las+Palmas&travelmode=walking',
      },
      waterPark: {
        name: 'Aqualand Maspalomas',
        location: 'Maspalomas (south Gran Canaria, 40 minutes by taxi)',
        highlights: 'Slides, wave pools, separate play areas for young children, heated pools',
        cost: 'Adults €37-40 for day pass',
        hours: '10:00 AM to 5:00 PM (longer hours July-August until 6:00 PM)',
        notes: 'Main water park on island. Full-day trip. Consider organised tour or taxi.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Aqualand+Maspalomas+Gran+Canaria&travelmode=walking',
      },
      beachOption: 'Las Canteras Beach is 10-15 minutes walk from port. Long urban beach with golden sand, natural reef protection, promenade lined with cafés and restaurants.',
    },
    
    meta: {
      title: 'Las Palmas Gran Canaria Cruise Port Guide 2026 | Beach & Tax-Free Shopping',
      description: '2026 Las Palmas cruise port guide. Walk 10 mins to Las Canteras beach. Tax-free shopping, Vegueta old town, year-round sunshine. One of Spain\'s best urban beaches. Insider tips from real cruisers.',
      keywords: ['Las Palmas cruise port', 'Gran Canaria cruise port', 'Las Canteras beach', 'Las Palmas things to do', 'Canary Islands duty free', 'Vegueta old town', 'Las Palmas walking', 'Gran Canaria shore excursions', 'El Muelle shopping', 'Santa Catalina Park'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  {
    id: 'naples',
    slug: 'naples',
    name: 'Naples',
    country: 'Italy',
    region: 'mediterranean',
    coordinates: { lat: 40.8518, lon: 14.2681 },
    tagline: 'Pizza gateway to Pompeii',
    description: 'Naples buzzes with chaotic energy where cruise terminals sit amid castles, palaces, and narrow alleys leading to UNESCO old town. Passengers balance city chaos with efficient day trips to ancient ruins and island escapes, all under Mount Vesuvius shadow. Authentic street life defines this raw Mediterranean powerhouse.',
    
    aboutPort: {
      overview: 'Stazione Marittima terminals (Molo Angioino, Beverello) dock mega-ships centrally with WiFi, ATMs, shops, and excursion desks amid ferry traffic to Capri and Ischia. Modern facilities handle 1.5 million passengers yearly; free shuttles if needed. Old town gates 10-minute walk; taxis chaotic but plentiful.',
      terminals: 'Key areas include Molo Angioino (main pier) and Beverello for ferries to islands. Amenities cover WiFi, ATMs, shops, cafés and post office.',
      shuttleServices: 'No shuttles needed - exits lead straight to Via Nuova Marina and Piazza Municipio, with town just minutes away on foot.',
      walkability: 'Yes, 5 to 10 minutes walk to historic core. Exit for 10-minute stroll to Piazza Municipio and Royal Palace. Metro Line 1 (Toledo station) connects to Pompeii train; Circumvesuviana for Herculaneum and Vesuvius.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Italian',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Naples International Airport (NAP)',
        distance: '6 km, 15 minutes taxi or Alibus',
        options: 'Alibus direct to port (5 euros, 20 minutes). Taxi 15 to 20 minutes direct.',
      },
      trains: {
        mainStation: 'Napoli Centrale and Garibaldi',
        description: 'Circumvesuviana to Pompeii (30 minutes); high-speed to Rome. Metro from port.',
        localHubs: 'Napoli Centrale for national links; Garibaldi for Circumvesuviana regional trains',
      },
    },

    gettingAround: {
      fromPort: 'Exit for 10-minute stroll to Piazza Municipio and Royal Palace. Metro Line 1 (Toledo station) to Pompeii train; Circumvesuviana for Herculaneum and Vesuvius. Taxis 10 to 15 euros centre; hop-on hop-off loops Pompeii and Capri viewpoints.',
      publicTransport: 'Metro, buses and Circumvesuviana trains serve Pompeii (30 minutes), Sorrento and Amalfi. Validate metro tickets before boarding.',
      taxis: 'Taxis rank at exits for fixed fares to key sites. Negotiate fares upfront; expect 10 to 15 euros to city centre.',
      walkingDistance: 'Historic centre, markets and Castel Nuovo are 10 to 15 minutes on foot. Pompeii needs 30-minute train.',
      sightseeingBus: 'Hop-on hop-off buses start near terminal, looping Pompeii, Vesuvius and centre - useful for first-timers.',
      accessibility: 'Old town alleys challenging for wheelchairs. Metro has lifts at major stations. Pompeii ruins have uneven surfaces.',
    },
    
    mustSeeSights: [
      {
        title: 'Pompeii Day Excursion',
        category: 'excursion',
        description: 'Frozen Roman city buried by Vesuvius; forums, villas, amphitheatre preserved in ash. UNESCO World Heritage site 30 minutes by Circumvesuviana train.',
        duration: '4 to 6 hours for a relaxed pace',
        tips: [
          'Circumvesuviana train 3 euros; audio guide essential at site',
          'Visit Forum and House of Faun first before crowds arrive',
          'Book ship excursion if concerned about timing back to port',
        ],
        highlights: ['History', 'Architecture', 'Museums'],
        goodFor: ['History buffs', 'First-time visitors', 'Photographers'],
      },
      {
        title: 'Castel Nuovo (Maschio Angioino)',
        category: 'landmark',
        description: '13th-century fortress with triumphal arch, museums, and harbour views. Massive medieval castle dominates the port area with Renaissance gateway.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          '6 euro entry; ramparts offer excellent photo opportunities',
          'Morning visits are quieter with better light',
          'Combined ticket available with Royal Palace',
        ],
        highlights: ['Architecture', 'History', 'Views'],
        goodFor: ['First-time visitors', 'Photographers', 'History buffs'],
      },
      {
        title: 'Spaccanapoli & Historic Centre',
        category: 'historic',
        description: 'Straight street dividing old town through churches, presepi shops, and street life. UNESCO World Heritage old town with authentic Neapolitan chaos.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Visit Gesù Nuovo church with ornate baroque interior',
          'Watch for scooter traffic on narrow streets',
          'Perfect for authentic pizza lunch break',
        ],
        highlights: ['Culture', 'History', 'Food', 'Photography'],
        goodFor: ['Culture seekers', 'Foodies', 'Photographers'],
      },
      {
        title: 'Naples Cathedral (Duomo)',
        category: 'historic',
        description: 'Gothic treasure with San Gennaro blood relic, underground aqueducts. Main cathedral features miracle of liquefying saint blood ceremony.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Free entry; blood miracle ceremony 9am first Saturday of month',
          'Underground aqueduct tour 9 euros extra',
          'Dress code: shoulders and knees covered',
        ],
        highlights: ['Architecture', 'Religious', 'History'],
        goodFor: ['History buffs', 'Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Royal Palace & Piazza Plebiscito',
        category: 'stroll',
        description: 'Massive Bourbon palace with throne room, San Francesco di Paola church. Grand square with neoclassical church and palace overlooking bay.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Palace 10 euros entry; throne room is highlight',
          'Echo effect in church courtyard is fun',
          'Evening lights make square magical for photos',
        ],
        highlights: ['Architecture', 'Culture', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'Architecture lovers'],
      },
      {
        title: 'National Archaeological Museum',
        category: 'historic',
        description: 'Pompeii artefacts, mosaics, Farnese sculptures in grand halls. World\'s finest collection of Roman antiquities from Pompeii and Herculaneum.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          '15 euro combo ticket with Pompeii available',
          'Secret Cabinet (adult content) requires separate ticket',
          'Farnese Bull sculpture is centrepiece of collection',
        ],
        highlights: ['Museums', 'Art', 'History'],
        goodFor: ['History buffs', 'Art lovers', 'Culture seekers'],
      },
    ],

    thingsToDo: [],
    
    nearestBeach: null,

    shoreExcursions: [],
    
    foodAndDrink: [
      {
        name: 'L\'Antica Pizzeria da Michele',
        type: 'Pizzeria',
        description: 'Margherita since 1870, 20-minute walk from port. The original Neapolitan pizza experience featured in Eat Pray Love film.',
      },
      {
        name: 'Pizzeria Gino Sorbillo',
        type: 'Pizzeria',
        description: 'Buffalo mozzarella pies on Via dei Tribunali. Third-generation pizzaiolo serving creative toppings on classic bases.',
      },
      {
        name: 'Gay-Odin chocolate',
        type: 'Cafe',
        description: 'Hot chocolate and sfogliatelle in historic centre. Neapolitan chocolate institution since 1894, famous for foresta cake.',
      },
      {
        name: 'Port-area trattorias',
        type: 'Restaurant',
        description: 'Seafood linguine near Castel Nuovo. Fresh catch and local wines with harbour views.',
      },
    ],

    insiderTips: [
      'Book Pompeii or Vesuvius ship excursion if concerned about timing; DIY trains can be chaotic for cruise schedules',
      'Pickpockets rampant on Spaccanapoli and trains; use cross-body bags and keep valuables secure',
      'Visit sights between 9am and 11am to avoid crowds; siesta closes many shops 1pm to 4pm',
      'Metro and taxis best for city centre; Circumvesuviana trains for excursions to Pompeii',
      'Cards common but keep 10 to 20 euros cash for taxis and pizza; 10 percent tip at restaurants',
      'Cover shoulders and knees for cathedral visits; traffic is chaotic so cross streets carefully',
      'Skip tourist-trap pizza on the port; da Michele line worth the 30-minute wait',
      'Google Translate helps with menus; download offline maps for navigating narrow alleys',
    ],
    
    faq: [
      {
        question: 'Is Naples walkable from the cruise port?',
        answer: 'Yes, the port is centrally located. Piazza Municipio, Royal Palace and old town gates are just 10 minutes walk from the terminals.',
      },
      {
        question: 'How long do you need in Naples?',
        answer: 'Six to eight hours covers city highlights and pizza. Full day needed for Pompeii excursion (4 to 6 hours) plus travel time.',
      },
      {
        question: 'Is English widely spoken in Naples?',
        answer: 'Tourist areas, terminals and restaurant menus typically have English. Street vendors and local neighbourhoods have limited English; basic Italian phrases help.',
      },
      {
        question: 'Is Naples safe for tourists?',
        answer: 'Generally safe but chaotic. Pickpockets target Spaccanapoli streets and trains. Keep valuables secure, avoid flashing phones or cameras, and stay aware in crowds.',
      },
      {
        question: 'Is Naples expensive?',
        answer: 'Affordable compared to northern Italy. Pizza 10 euros, museum entry 10 to 15 euros, excursions 50 euros plus. Taxis and street food budget-friendly.',
      },
      {
        question: 'Do I need cash in Naples or can I use card?',
        answer: 'Cards widely accepted at restaurants and attractions. Keep euros for taxis, street pizza vendors and small shops. ATMs available at port terminals.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Ship excursion recommended for Pompeii to guarantee return timing. Independent exploring works well for city centre walking and pizza hunt.',
      },
      {
        question: 'What is the best thing to do in Naples on a cruise day?',
        answer: 'Morning Circumvesuviana train to Pompeii (30 minutes), explore ruins (3 to 4 hours), return for afternoon pizza walk through Spaccanapoli old town.',
      },
      {
        question: 'Can you do Pompeii from Naples on a cruise day?',
        answer: 'Yes, very feasible. Circumvesuviana train takes 30 minutes each way. Allow 4 to 6 hours total including site visit. Ship excursion safest for timing.',
      },
      {
        question: 'Is Naples good for limited mobility?',
        answer: 'City centre and Royal Palace area manageable with paved squares. Spaccanapoli alleys have cobbles and steps. Pompeii ruins extremely challenging with uneven ground.',
      },
    ],

    weather: {
      intro: 'Naples has a Mediterranean climate with hot, dry summers and mild, wet winters. Spring and autumn offer comfortable sightseeing temperatures.',
      months: [
        { month: 'Jan', highC: 13, lowC: 7, rainMm: 100, sunDays: 10, seaTempC: 15 },
        { month: 'Feb', highC: 13, lowC: 7, rainMm: 90, sunDays: 12, seaTempC: 15 },
        { month: 'Mar', highC: 15, lowC: 9, rainMm: 80, sunDays: 15, seaTempC: 16 },
        { month: 'Apr', highC: 18, lowC: 11, rainMm: 70, sunDays: 17, seaTempC: 17 },
        { month: 'May', highC: 22, lowC: 15, rainMm: 50, sunDays: 20, seaTempC: 19 },
        { month: 'Jun', highC: 26, lowC: 19, rainMm: 40, sunDays: 24, seaTempC: 22 },
        { month: 'Jul', highC: 29, lowC: 22, rainMm: 20, sunDays: 27, seaTempC: 24 },
        { month: 'Aug', highC: 30, lowC: 22, rainMm: 30, sunDays: 26, seaTempC: 25 },
        { month: 'Sep', highC: 27, lowC: 19, rainMm: 70, sunDays: 22, seaTempC: 24 },
        { month: 'Oct', highC: 23, lowC: 16, rainMm: 110, sunDays: 18, seaTempC: 22 },
        { month: 'Nov', highC: 18, lowC: 11, rainMm: 130, sunDays: 13, seaTempC: 19 },
        { month: 'Dec', highC: 14, lowC: 8, rainMm: 110, sunDays: 11, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'April to June for mild spring weather. September to October for autumn warmth without peak summer heat.',
        hottest: 'July and August bring vibrant summer heat and crowded sights. Great energy but exhausting for ruins.',
        quietest: 'November to March see fewer tourists and wetter weather. Milder temperatures but shorter days.',
        recommendation: 'May or early September offer perfect balance for comfortable Pompeii walks and city exploring.',
      },
    },
    
    practicalInfo: {
      bestTimeToVisit: 'Spring (April to June) and autumn (September to October)',
      cruiseTerminals: ['Stazione Marittima', 'Molo Angioino', 'Molo Beverello'],
      nearbyAirport: 'Naples International (NAP), 6 km',
      visaInfo: 'Schengen visa requirements apply (Italy)',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'italy-cruises'],
    
    meta: {
      title: 'Naples Cruise Port Guide | Pompeii, Pizza & Vesuvius',
      description: 'Complete Naples cruise port guide. Visit Pompeii ruins, explore Spaccanapoli old town, climb Mount Vesuvius, enjoy authentic Neapolitan pizza, and discover insider tips for your Mediterranean cruise.',
      keywords: ['Naples cruise port', 'Naples shore excursions', 'Naples things to do', 'Pompeii from cruise ship', 'Naples cruise terminal', 'Mount Vesuvius cruise', 'Neapolitan pizza']
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  {
    id: 'venice',
    slug: 'venice',
    name: 'Venice',
    country: 'Italy',
    region: 'mediterranean',
    coordinates: { lat: 45.4408, lon: 12.3155 },
    tagline: 'Canals and Renaissance splendour',
    description: 'Venice\'s labyrinth of 400 bridges and 118 islands creates the world\'s most romantic cityscape, where cruise passengers navigate gondolas, St. Mark\'s mosaics and Rialto markets amid rising acqua alta concerns. Modern terminals shuttle visitors to Piazzale Roma for vaporetto and water taxi entry into the car-free core.',
    
    aboutPort: {
      overview: 'Large ships dock at Fusina or Marghera (mainland terminals, 45 to 60 minutes from Venice centre via shuttle and water taxi), while smaller vessels use San Basilio near Piazzale Roma. Facilities include lounges, Wi-Fi and cafes with free shuttles to Tronchetto vaporetto stops. City gates 10-minute vaporetto from shuttle drop.',
      terminals: 'Fusina, Marghera, San Basilio and Santa Marta terminals handle cruise ships.',
      shuttleServices: 'Free shuttle buses connect mainland terminals to Tronchetto and Piazzale Roma for vaporetto connections.',
      walkability: 'No, shuttle and vaporetto required to reach historic centre from most terminals.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Italian',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: false,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Venice Marco Polo (VCE)',
        distance: '13 km, 20 minutes by water taxi or Alilaguna',
        options: 'ACTV bus 10 euros (30 minutes); water taxi 120 euros plus; Alilaguna water bus 15 euros (75 minutes).',
      },
      trains: {
        mainStation: 'Venezia Santa Lucia',
        description: 'High-speed trains to Milan, Florence and Rome. Vaporetto connections from station to port area.',
        localHubs: 'Santa Lucia for lagoon access',
      },
    },

    gettingAround: {
      fromPort: 'Shuttle to Piazzale Roma or Tronchetto, then vaporetto Line 1 (9.50 euros, 75 minutes) along Grand Canal to Rialto and San Marco. Water taxis 120 euros plus private; gondolas 80 euros per 30 minutes.',
      publicTransport: 'No metro; extensive vaporetto network, gondolas, water taxis and traghetti (ferry gondolas) navigate canals. Land taxis at Piazzale Roma and Tronchetto only. Vaporetto ACTV pass 25 euros per day.',
      taxis: 'Land taxis at Piazzale Roma and Tronchetto only. Water taxis scenic but expensive (120 euros plus).',
      walkingDistance: 'No cars or bikes; walking bridges challenging with luggage. St. Mark\'s 30 minutes total from shuttle drop; Rialto 20 minutes.',
      sightseeingBus: 'Hop-on hop-off vaporetto ACTV pass (25 euros per day) covers major canal routes efficiently.',
      accessibility: 'Bridges and steps challenge wheelchairs; vaporettos have some accessible routes but limited mobility difficult.',
    },
    
    mustSeeSights: [
      {
        title: 'St. Mark\'s Basilica and Square',
        category: 'landmark',
        description: 'Byzantine mosaics, Pala d\'Oro altar and campanile views over Piazza San Marco.',
        duration: '1.5 to 2.5 hours for a relaxed pace',
        tips: [
          'Book skip-the-line tickets 6 euros online; no large bags allowed',
          '9am entry is quietest before cruise ship crowds arrive',
          'Dress code: shoulders and knees covered for basilica entry'
        ],
        highlights: ['Architecture', 'Art', 'Religious', 'Photography'],
        goodFor: ['First-time visitors', 'Art lovers', 'Photographers'],
      },
      {
        title: 'Doge\'s Palace',
        category: 'historic',
        description: 'Gothic seat of Venetian republic with Bridge of Sighs, prisons and armoury.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          '30 euro combo ticket with Basilica saves money',
          'Secret itineraries tour shows hidden rooms and chambers',
          'Bridge of Sighs best photographed from exterior Ponte della Paglia'
        ],
        highlights: ['History', 'Architecture', 'Museums'],
        goodFor: ['History buffs', 'Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Rialto Bridge and Market',
        category: 'markets',
        description: 'Iconic stone arch with Grand Canal views and morning fish and fruit stalls.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          '7am market most authentic before tourist rush',
          'Avoid gondola touts near bridge; regulated stands only',
          'Cicchetti lunch at nearby bacari for best local experience'
        ],
        highlights: ['Markets', 'Shopping', 'Photography', 'Food'],
        goodFor: ['Foodies', 'Photographers', 'Shoppers'],
      },
      {
        title: 'Grand Canal vaporetto ride',
        category: 'stroll',
        description: 'World\'s most beautiful waterway lined with Renaissance palaces.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Line 1 vaporetto runs full route; Line 2 faster but fewer stops',
          'Front seats best for photos; less crowded at stern',
          'Sunset golden hour provides best light for palace photography'
        ],
        highlights: ['Architecture', 'Views', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'Couples'],
      },
      {
        title: 'Peggy Guggenheim Collection',
        category: 'historic',
        description: 'Modern art in Venetian palace on Grand Canal with Picasso and Pollock.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          '15 euro entry; book online to skip ticket queue',
          'Garden sculpture walk included; cafe overlooks canal',
          'Quieter afternoons after cruise groups depart'
        ],
        highlights: ['Art', 'Museums', 'Gardens'],
        goodFor: ['Art lovers', 'Culture seekers', 'Couples'],
      },
      {
        title: 'Murano and Burano islands',
        category: 'excursion',
        description: 'Glass factories, lace workshops and rainbow fishermen houses via vaporetto 4.2 and 12.',
        duration: '4 to 5 hours for a relaxed pace',
        tips: [
          '9.50 euro vaporetto covers islands; ACTV day pass best value',
          'Glass demonstration free at Murano factories; no pressure to buy',
          'Burano lunch at trattoria dal Gatto Nero for risotto de gò'
        ],
        highlights: ['Culture', 'Shopping', 'Photography'],
        goodFor: ['Shoppers', 'Photographers', 'Culture seekers'],
      },
    ],

    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Rialto market cicchetti',
        type: 'Tapas Bar',
        description: 'Small plates and spritz aperitifs in bridge area bacari.',
      },
      {
        name: 'Osteria alle Testiere',
        type: 'Restaurant',
        description: 'Venetian seafood specialties in Castello district.',
      },
      {
        name: 'Gelateria Nico',
        type: 'Cafe',
        description: 'Gianduiotto con panna gelato on Zattere waterfront.',
      },
      {
        name: 'Cantina do Spade',
        type: 'Wine Bar',
        description: 'Historic ombra wine and snacks in centre.',
      },
    ],

    insiderTips: [
      'Buy ACTV vaporetto pass day 1; single tickets 9.50 euros add up fast on multiple trips',
      'Pickpockets target San Marco and Rialto crowds; secure valuables in cross-body bags',
      'Book Basilica and Palace 9am tickets essential; queues reach 2 plus hours by midday',
      'Vaporetto Grand Canal scenic; walk narrow alleys for authentic Venice; water taxis splurge only',
      'Cards accepted everywhere; carry 10 to 20 euros cash for gondolas and gelato; 10 per cent tip rounding',
      'Cover shoulders and knees for Basilica entry; acqua alta raised walkway paths vary',
      'Skip overpriced Murano glass shops near San Marco; Rialto market authentic',
      'Download Google Maps offline and Citymapper for vaporetto times and routes',
    ],
    
    faq: [
      {
        question: 'Is Venice walkable from the cruise port?',
        answer: 'No, shuttle and vaporetto required to reach historic centre from Fusina and Marghera terminals. San Basilio pier is closer but still needs vaporetto to major sights.',
      },
      {
        question: 'How long do you need in Venice?',
        answer: '8 to 10 hours for full day covering vaporetto Grand Canal, St. Mark\'s, Doge\'s Palace, Rialto and possibly Murano or Burano islands. Minimum 6 hours for essentials.',
      },
      {
        question: 'Is English widely spoken in Venice?',
        answer: 'Yes in tourist areas, hotels, restaurants and major attractions. Menus have English translations. Some locals in residential areas speak limited English.',
      },
      {
        question: 'Is Venice safe for tourists?',
        answer: 'Very safe overall. Pickpockets operate in San Marco and Rialto crowds so secure valuables. Avoid unlicensed gondolas and touts. Evening streets well-lit and patrolled.',
      },
      {
        question: 'Is Venice expensive?',
        answer: 'High cost city. Vaporetto pass 25 euros per day; pizza 15 euros; water taxis 120 euros plus. San Marco cafes premium prices. Walk one street back for better value.',
      },
      {
        question: 'Do I need cash in Venice or can I use card?',
        answer: 'Cards accepted almost everywhere including vaporetto ticket machines. Carry 10 to 20 euros cash for gondola deposits, gelato and small market purchases.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration perfect via vaporetto network. Buy ACTV day pass and use Line 1 for Grand Canal. Ship excursions convenient but limited time at sights.',
      },
      {
        question: 'What is the best thing to do in Venice on a cruise day?',
        answer: 'Vaporetto Line 1 full Grand Canal (morning), St. Mark\'s Basilica and Doge\'s Palace (midday), Rialto market cicchetti lunch, then Burano excursion (afternoon) if time permits.',
      },
      {
        question: 'Is Venice wheelchair accessible?',
        answer: 'Challenging due to 400 bridges with steps and narrow alleys. Some vaporettos have accessible boarding. Santa Lucia station has lifts. Major sights like Doge\'s Palace have ramps but limited access.',
      },
      {
        question: 'Is Venice good for limited mobility?',
        answer: 'Vaporetto rides manageable but walking narrow alleys and bridges difficult. Water taxis easier boarding than vaporetto. Stick to main routes near San Marco and Rialto. Consider ship excursion with transport.',
      },
    ],

    weather: {
      intro: 'Venice has a humid subtropical climate with hot summers, mild winters and frequent autumn to winter acqua alta (high tides).',
      months: [
        { month: 'Jan', highC: 7, lowC: 2, rainMm: 70, sunDays: 10, seaTempC: 11 },
        { month: 'Feb', highC: 9, lowC: 3, rainMm: 60, sunDays: 12, seaTempC: 11 },
        { month: 'Mar', highC: 12, lowC: 6, rainMm: 60, sunDays: 15, seaTempC: 12 },
        { month: 'Apr', highC: 15, lowC: 9, rainMm: 70, sunDays: 17, seaTempC: 14 },
        { month: 'May', highC: 20, lowC: 14, rainMm: 70, sunDays: 20, seaTempC: 18 },
        { month: 'Jun', highC: 24, lowC: 18, rainMm: 60, sunDays: 23, seaTempC: 22 },
        { month: 'Jul', highC: 27, lowC: 21, rainMm: 50, sunDays: 26, seaTempC: 25 },
        { month: 'Aug', highC: 28, lowC: 21, rainMm: 70, sunDays: 25, seaTempC: 26 },
        { month: 'Sep', highC: 25, lowC: 18, rainMm: 80, sunDays: 22, seaTempC: 24 },
        { month: 'Oct', highC: 20, lowC: 14, rainMm: 90, sunDays: 18, seaTempC: 21 },
        { month: 'Nov', highC: 14, lowC: 9, rainMm: 100, sunDays: 13, seaTempC: 17 },
        { month: 'Dec', highC: 9, lowC: 4, rainMm: 70, sunDays: 11, seaTempC: 14 },
      ],
      bestTime: {
        overall: 'May to June for mild weather without acqua alta floods',
        hottest: 'July and August (hot and crowded, peak season)',
        quietest: 'April and October (fewer tourists, pleasant temperatures)',
        recommendation: 'Spring visits avoid acqua alta flooding risk for first-time cruise passengers',
      },
    },
    
    practicalInfo: {
      bestTimeToVisit: 'Spring and autumn for mild weather without acqua alta floods',
      cruiseTerminals: ['Fusina', 'Marghera', 'San Basilio', 'Santa Marta'],
      nearbyAirport: 'Venice Marco Polo (VCE), 13 km',
      visaInfo: 'Schengen visa requirements apply for non-EU visitors',
    },
    
    relatedDestinations: ['mediterranean-cruises', 'italy-cruises'],
    
    meta: {
      title: 'Venice Cruise Port Guide | Canals, Gondolas & St. Mark\'s',
      description: 'Complete Venice cruise port guide. Explore St. Mark\'s Square, ride vaporettos through canals, visit Doge\'s Palace, discover Rialto Bridge, and enjoy Venetian cicchetti with insider tips.',
      keywords: ['Venice cruise port', 'Venice shore excursions', 'Venice things to do', 'Venice from cruise ship', 'Venice cruise terminal', 'Venice gondola cruise']
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  {
    id: 'palma-de-mallorca',
    slug: 'palma-de-mallorca',
    name: 'Palma de Mallorca',
    country: 'Spain',
    region: 'mediterranean',
    coordinates: { lat: 39.5696, lon: 2.6502 },
    tagline: 'Cathedral and Mediterranean sands',
    description: 'Palma blends Gothic grandeur with palm-lined boulevards and yacht-filled marinas, where cruise passengers enjoy cathedral climbs, old town boutiques, and nearby beaches under year-round sunshine. Terminals position ships for shuttle or train access to the compact historic core dominated by La Seu Cathedral.',
    
    // Detailed port information
    aboutPort: {
      overview: 'Most ships dock at Muelle de Poniente Terminals 1-4 (2.5 miles from old town), with modern facilities, WiFi, cafes, and shuttle buses to Plaça d\'Espanya (10 to 15 minutes). Smaller vessels use Estació Marítima near centre.',
      terminals: 'Muelle de Poniente Terminals 1-4, Estació Marítima',
      shuttleServices: 'Shuttle buses run to Plaça d\'Espanya (10 to 15 minutes).',
      walkability: 'Not walkable from main terminals; shuttle or train needed.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish, Catalan',
      timezone: 'GMT+1',
      portType: 'Home Port & Call',
      walkable: false,
      tenderRequired: false,
    },
    
    // Airport and train connections
    transportConnections: {
      airport: {
        name: 'Palma de Mallorca Airport (PMI)',
        distance: '12km, 20 minutes taxi',
        options: 'Taxi 20 minutes direct. Airport bus A1 to city (40 minutes).',
      },
      trains: {
        mainStation: 'Palma Intermodal Station',
        description: 'Line 1 to beaches/Alcúdia. Shuttle drop-off at station.',
        localHubs: 'Plaça d\'Espanya for island connections.',
      },
    },

    gettingAround: {
      fromPort: 'Shuttle to Plaça d\'Espanya, then 10-minute walk to cathedral/old town. Train Line 1 to beaches. Hop-on hop-off loops cathedral, Bellver Castle, beaches. Taxis available at terminals.',
      publicTransport: 'Train Line 1 to beaches. Buses to Palma Nova. Hop-on hop-off from terminals. No metro.',
      taxis: 'Taxis rank at terminals. Approximate costs: old town 15 to 20 euros.',
      walkingDistance: 'Cathedral 15 minutes shuttle plus walk, Can Pere Antoni beach 30 minutes by train.',
      sightseeingBus: 'Hop-on hop-off loops cathedral, Bellver Castle, beaches. Departs from terminals. Approximately 20 euros per day.',
    },
    
    // Must-see sights (the headline attractions)
    mustSeeSights: [
      {
        title: 'Palma Cathedral (La Seu)',
        category: 'landmark',
        description: 'Gothic masterpiece with Gaudi canopy, rose window, sea views from roof.',
        duration: '1.5 to 2.5 hours for a relaxed pace',
        tips: [
          'Combo ticket (10 euros) includes roof terrace',
          'Mornings best for roof terrace visits',
          'Gaudí chapel highlight inside',
        ],
        highlights: ['Architecture', 'Views', 'Religious'],
        goodFor: ['First-time visitors', 'Architecture lovers'],
      },
      {
        title: 'Old Town & Passeig des Born',
        category: 'stroll',
        description: 'Medieval lanes, boutiques, cafes along palm boulevard to Avinguda Jaume III.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Side alleys reveal hidden patios',
          'Evening best for window shopping',
          'Flat stroll, easy for all ages',
        ],
        highlights: ['Shopping', 'Culture', 'Photography'],
        goodFor: ['Shoppers', 'Couples'],
      },
      {
        title: 'Bellver Castle',
        category: 'nature',
        description: '14th-century circular fortress atop pine-covered hill with 360-degree panoramas.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Bus 50 from centre (2 euros)',
          'Free entry on certain days',
          'Sunset offers golden light',
        ],
        highlights: ['Views', 'History', 'Architecture'],
        goodFor: ['Photographers', 'History buffs'],
      },
      {
        title: 'Es Baluard Museum',
        category: 'historic',
        description: 'Contemporary art in Renaissance walls overlooking bay.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          '6 euros entry fee',
          'Roof terrace cafe with views',
          'Picasso collection highlight',
        ],
        highlights: ['Art', 'Museums', 'Views'],
        goodFor: ['Art lovers', 'Culture seekers'],
      },
      {
        title: 'Palma Aquarium',
        category: 'family',
        description: 'Sharks, shark tunnel, tropical rainforest dome.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Bus 35 from centre',
          'Shark feeding at 11am and 3pm',
          'Pirate ship area for kids',
        ],
        highlights: ['Family-friendly', 'Nature', 'Wildlife'],
        goodFor: ['Families'],
      },
      {
        title: 'Alcúdia Old Town Day Excursion',
        category: 'excursion',
        description: 'Medieval walls, Roman ruins, beach 45 minutes north.',
        duration: '4 to 6 hours for a relaxed pace',
        tips: [
          'Train 6 euros return',
          'Walls walk free',
          'Beach lunch recommended',
        ],
        highlights: ['History', 'Culture', 'Beaches'],
        goodFor: ['History buffs', 'Beach lovers'],
      },
    ],

    thingsToDo: [],
    shoreExcursions: [],
    
    // Nearest beach info
    nearestBeach: {
      name: 'Can Pere Antoni',
      description: 'Urban golden sands with promenade, chiringuitos, and pine shade near city.',
      type: 'sand',
      waterEntry: 'shallow entry',
      shelter: 'partially sheltered',
      crowdLevel: 'busy in summer',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: 'Not feasible',
        taxiTime: '15 minutes',
        busRoute: 'Train Line 1 (25 minutes)',
        notes: 'Flat promenade; family-friendly',
      },
      bestFor: ['families with children', 'swimming', 'relaxing'],
      tip: 'Train drops beachfront; arrive before 11am to avoid peak crowds.',
    },

    foodAndDrink: [
      {
        name: 'La Bóveda',
        type: 'Restaurant',
        description: 'Tapas in wine cellars in old town alleys.',
      },
      {
        name: 'Celler Sa Premsa',
        type: 'Restaurant',
        description: 'Sobrasada, pa amb oli near cathedral.',
      },
      {
        name: 'Can Pere Antoni chiringuitos',
        type: 'Beach Bar',
        description: 'Fresh sardines on beachfront.',
      },
      {
        name: 'Plaça d\'Espanya cafes',
        type: 'Cafe',
        description: 'Ensaimadas pastries at shuttle drop-off.',
      },
    ],
    
    fastFood: {
      name: 'McDonald\'s',
      description: 'There are McDonald\'s locations in the city centre and near Porto Pi shopping centre, accessible from the cruise terminals.',
      alternatives: 'Other familiar chains can be found in the city centre and shopping areas.',
    },

    insiderTips: [
      'Shuttle plus walk to cathedral; train for beaches.',
      'Pickpockets in markets; secure bags.',
      'Cathedral best at 9am for tickets; siesta 2 to 5pm.',
      'Old town flat; buses for hills/beaches.',
      'Cards everywhere; euros for markets; 10 percent tip norm.',
      'No strict dress codes; relaxed island vibe.',
      'Skip souvenir chains; artisan ensaimadas authentic.',
      'Google Maps offline; download train app.',
    ],
    
    // FAQ section
    faq: [
      {
        question: 'Is Palma de Mallorca walkable from the cruise port?',
        answer: 'No, 10 to 15 minute shuttle to centre needed from main terminals.',
      },
      {
        question: 'How long do you need in Palma de Mallorca?',
        answer: '6 to 8 hours for cathedral, old town and beach.',
      },
      {
        question: 'Is English widely spoken in Palma de Mallorca?',
        answer: 'Yes in tourist areas and on menus.',
      },
      {
        question: 'Is Palma de Mallorca safe for tourists?',
        answer: 'Very safe; standard pickpocket vigilance in crowds.',
      },
      {
        question: 'Is Palma de Mallorca expensive?',
        answer: 'Moderate; tapas meals 15 euros, beaches free.',
      },
      {
        question: 'Do I need cash in Palma de Mallorca or can I use card?',
        answer: 'Cards dominant; euros for markets.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent perfect with shuttle plus train system.',
      },
      {
        question: 'What is the best thing to do in Palma de Mallorca on a cruise day?',
        answer: 'Cathedral visit to beach via train.',
      },
      {
        question: 'Are the beaches nice in Palma de Mallorca?',
        answer: 'Yes, Can Pere Antoni urban sands close by train.',
      },
      {
        question: 'Is Palma de Mallorca family-friendly?',
        answer: 'Excellent with beaches, aquarium, flat promenades.',
      },
    ],

    // Monthly weather data
    weather: {
      intro: 'Palma de Mallorca enjoys a Mediterranean climate with hot, dry summers and mild winters.',
      months: [
        { month: 'Jan', highC: 15, lowC: 9, rainMm: 50, sunDays: 16, seaTempC: 15 },
        { month: 'Feb', highC: 15, lowC: 9, rainMm: 40, sunDays: 17, seaTempC: 15 },
        { month: 'Mar', highC: 17, lowC: 11, rainMm: 40, sunDays: 20, seaTempC: 16 },
        { month: 'Apr', highC: 19, lowC: 13, rainMm: 40, sunDays: 22, seaTempC: 17 },
        { month: 'May', highC: 22, lowC: 16, rainMm: 40, sunDays: 24, seaTempC: 19 },
        { month: 'Jun', highC: 26, lowC: 20, rainMm: 20, sunDays: 27, seaTempC: 22 },
        { month: 'Jul', highC: 29, lowC: 23, rainMm: 10, sunDays: 30, seaTempC: 24 },
        { month: 'Aug', highC: 30, lowC: 23, rainMm: 20, sunDays: 29, seaTempC: 25 },
        { month: 'Sep', highC: 28, lowC: 21, rainMm: 40, sunDays: 25, seaTempC: 24 },
        { month: 'Oct', highC: 24, lowC: 18, rainMm: 70, sunDays: 22, seaTempC: 22 },
        { month: 'Nov', highC: 20, lowC: 13, rainMm: 70, sunDays: 18, seaTempC: 19 },
        { month: 'Dec', highC: 16, lowC: 10, rainMm: 60, sunDays: 16, seaTempC: 16 },
      ],
      bestTime: {
        overall: 'May to October beach season',
        hottest: 'Peak season (Jul to Aug): Hot and crowded (cons)',
        quietest: 'Quieter months (May, Sep): Perfect weather (pros)',
        recommendation: 'First-timers: June for balance',
      },
    },

    timeRequired: {
      intro: 'Here is an idea of how long you will need for the key sights in Palma de Mallorca.',
      estimates: [
        { sight: 'Palma Cathedral', time: '1.5 to 2.5 hours' },
        { sight: 'Old Town Passeig', time: '1.5 to 2 hours' },
        { sight: 'Bellver Castle', time: '1 to 1.5 hours' },
        { sight: 'Can Pere Antoni Beach', time: '2 to 3 hours' },
      ],
      summary: 'For a standard cruise day of 8 to 10 hours ashore, shuttle to cathedral/old town (morning), train to beach lunch (afternoon) is realistic.',
    },

    practicalInfo: {
      bestTimeToVisit: 'May to October',
      cruiseTerminals: ['Muelle de Poniente 1-4', 'Estació Marítima'],
      nearbyAirport: 'Palma (PMI), 12km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },

    relatedDestinations: ['mediterranean-cruises', 'spain-cruises'],
    
    meta: {
      title: 'Palma de Mallorca Cruise Port Guide | Cathedral, Beaches & Balearic Charm',
      description: 'Complete Palma de Mallorca cruise port guide. Visit the Gothic cathedral, explore the old town, relax on beaches, discover Bellver Castle with insider tips for your Balearic cruise.',
      keywords: ['Palma de Mallorca cruise port', 'Palma cruise terminal', 'Palma shore excursions', 'Palma things to do', 'Mallorca from cruise ship', 'Palma cathedral'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  // ============================================================================
  // NORWEGIAN FJORDS
  // ============================================================================
  {
    id: 'bergen',
    slug: 'bergen',
    name: 'Bergen',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 60.3913, lon: 5.3221 },
    tagline: 'Fjords between seven mountains',
    description: 'Bergen thrives as Norway\'s fjord capital where wooden Bryggen wharves face Mount Fløyen funiculars and fish market stalls overflow with salmon. Cruise terminals cluster centrally for immediate access to funiculars, fjord boats, and Mount Ulriken cable cars amid constant rain and mountain mist.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Bergen features five terminals (Skolten, Bontelabo, Jekteviken, Dokken, Dreggsallmenningen) handling mega-ships with WiFi, tourist info; Skolten serves largest vessels steps from Bryggen. No shuttles needed; 5-minute walk to fish market. Strict 4-ship/8,000-passenger daily limits.',
      terminals: 'Skolten, Bontelabo, Jekteviken, Dokken, and Dreggsallmenningen terminals all offer WiFi, tourist information, and direct access to city centre.',
      shuttleServices: 'No shuttles needed; all terminals are within 5 to 10 minutes walk to Bryggen and fish market.',
      walkability: 'All terminals walk 5 to 10 minutes to Bryggen, funiculars, and fish market. City centre is compact and easily accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'All terminals walk 5 to 10 minutes to Bryggen and funiculars. Funiculars to Fløyen, cable car to Ulriken. Light rail to airport; hop-on hop-off fjord boats available.',
      publicTransport: 'Light rail connects to airport. Hop-on hop-off fjord boats offer scenic tours. Funiculars and cable cars provide mountain access.',
      taxis: 'Taxis available at terminals. Expect higher costs than European cities; cards accepted everywhere.',
      walkingDistance: 'Fish Market 5 minutes, Fløyen funicular 7 minutes, Bryggen wharf 5 minutes from terminals. City centre is compact and walkable.',
      sightseeingBus: 'Hop-on hop-off fjord boats available for scenic tours of the harbour and nearby fjords.',
      accessibility: 'Bergen is fairly accessible with flat paths in city centre. Funiculars and cable cars have good access, though mountain trails may be challenging.',
    },
    
    transportConnections: {
      airport: {
        name: 'Bergen Airport (BGO)',
        distance: '16km, 25 minutes by light rail',
        options: 'Flybussen express bus (20 minutes) or light rail (25 minutes) connect airport to city centre. Taxi available but expensive.',
      },
      trains: {
        mainStation: 'Bergen Station',
        description: 'To Oslo (7 hours), Flåm (Norway\'s steepest railway). 15-minute walk from cruise terminals.',
        localHubs: 'Bergen Station is the main hub for all rail connections including scenic Flåm Railway.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Bryggen Hanseatic Wharf',
        category: 'historic',
        description: 'UNESCO wooden warehouses leaning at angles; alleys, shops, Hanseatic Museum. Iconic waterfront wharf dating from the 14th century with colourful wooden buildings.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Alley photos best in mornings before crowds arrive',
          'Free exteriors; museum entry costs around 120 NOK',
          'Explore narrow passages between buildings for authentic atmosphere',
        ],
        highlights: ['History', 'Architecture', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'History buffs'],
      },
      {
        title: 'Fløyen Funicular & Summit',
        category: 'nature',
        description: 'Mountain panoramas, trolls, hiking trails above fjord-filled cityscape. Iconic funicular ride to Mount Fløyen with stunning views over Bergen and surrounding fjords.',
        duration: '1.5 to 2.5 hours for a relaxed pace',
        tips: [
          'Book tickets online to avoid queues; costs around 150 NOK roundtrip',
          'Breakfast cafe at summit offers excellent views',
          'Troll path perfect for families with children',
        ],
        highlights: ['Views', 'Nature', 'Hiking', 'Family-friendly'],
        goodFor: ['Families', 'Photographers', 'Active travelers'],
      },
      {
        title: 'Fish Market & Waterfront',
        category: 'markets',
        description: 'Salmon, king crab stalls amid seagull chaos; waterfront relaxing. Vibrant market with fresh seafood, local produce, and lively atmosphere.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Cash only at many stalls; bring Norwegian Krone',
          'Whale watching boats depart from nearby harbour',
          'Avoid tourist trap restaurants; market stalls offer authentic experience',
        ],
        highlights: ['Food', 'Markets', 'Culture'],
        goodFor: ['Foodies', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'Ulriken Cable Car',
        category: 'nature',
        description: 'Highest Bergen peak with revolving restaurant, zipline, paragliders. Dramatic cable car ascent to Mount Ulriken for panoramic views.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Tickets cost around 300 NOK return; book online for discounts',
          'On clear days, views extend far across the fjords',
          'Summit restaurant offers lunch with spectacular panoramas',
        ],
        highlights: ['Views', 'Active', 'Adventure'],
        goodFor: ['Active travelers', 'Photographers', 'Adventure seekers'],
      },
      {
        title: 'Bergen Aquarium',
        category: 'family',
        description: 'Seals, penguins, sharks; king crab exhibits. Family-friendly aquarium showcasing Norwegian marine life and Arctic species.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Penguin feeding at 11am is popular with families',
          'Seal show offers entertaining demonstrations',
          'Located near funicular for easy combined visit',
        ],
        highlights: ['Wildlife', 'Family-friendly', 'Nature'],
        goodFor: ['Families', 'First-time visitors', 'Wildlife enthusiasts'],
      },
      {
        title: 'Nærøyfjord Fjord Cruise',
        category: 'excursion',
        description: 'UNESCO narrow fjord past waterfalls, farms clinging to cliffs. Scenic boat journey through one of Norway\'s most dramatic fjords with stunning natural scenery.',
        duration: '4 to 6 hours for a relaxed pace',
        tips: [
          'Fjord Line boats offer regular departures',
          'Look for goats on traditional grass-roofed farms',
          'Can connect with Flåm Railway for extended excursion',
        ],
        highlights: ['Nature', 'Views', 'Scenic'],
        goodFor: ['First-time visitors', 'Photographers', 'Nature lovers'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Fish Market stalls',
        type: 'Market',
        description: 'King crab, salmon, and fresh seafood at waterfront market stalls. Authentic Norwegian fish market experience with local specialities.',
      },
      {
        name: 'Bryggen seafood',
        type: 'Restaurant',
        description: 'Fjord trout and traditional Norwegian seafood in historic Hanseatic cellars. Atmospheric dining in restored wharf buildings.',
      },
      {
        name: 'Fløyen summit cafe',
        type: 'Cafe',
        description: 'Waffles, coffee, and light meals with mountain views. Perfect refreshment stop after funicular ride with panoramic fjord vistas.',
      },
      {
        name: 'Waterfront bryggens',
        type: 'Pub',
        description: 'Craft beers, fish cakes, and Norwegian pub fare in Bryggen alleys. Cosy atmosphere in historic waterfront setting.',
      },
    ],
    
    insiderTips: [
      'Book funicular and cable car tickets online in advance; queues can be massive during cruise season',
      'Pickpocket risk is low; rain gear essential year-round as Bergen is one of Europe\'s wettest cities',
      'Visit attractions 9 to 11am before coach tours arrive for quieter experience',
      'Walk everywhere in city centre; funiculars for mountains; fjord boats for excursions',
      'Cards accepted everywhere; keep 100 to 200 NOK cash for market stalls; no tipping expected',
      'No dress codes; practical layers essential for changeable mountain weather',
      'Skip tourist menus; fish market offers authentic Norwegian experience',
      'Check Yr.no for rain radar; Bergen Card offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Bergen has a temperate maritime climate with mild winters and cool summers. Rain is frequent year-round, making it one of Europe\'s wettest cities. Summer offers the best weather for fjord cruises and mountain hikes.',
      months: [
        { month: 'Jan', highC: 3, lowC: -1, rainMm: 200, sunDays: 6, seaTempC: 6 },
        { month: 'Feb', highC: 4, lowC: 0, rainMm: 150, sunDays: 8, seaTempC: 6 },
        { month: 'Mar', highC: 6, lowC: 1, rainMm: 150, sunDays: 10, seaTempC: 7 },
        { month: 'Apr', highC: 9, lowC: 4, rainMm: 130, sunDays: 12, seaTempC: 8 },
        { month: 'May', highC: 14, lowC: 8, rainMm: 140, sunDays: 15, seaTempC: 11 },
        { month: 'Jun', highC: 17, lowC: 11, rainMm: 160, sunDays: 16, seaTempC: 14 },
        { month: 'Jul', highC: 19, lowC: 13, rainMm: 170, sunDays: 17, seaTempC: 16 },
        { month: 'Aug', highC: 19, lowC: 13, rainMm: 190, sunDays: 16, seaTempC: 16 },
        { month: 'Sep', highC: 16, lowC: 10, rainMm: 200, sunDays: 13, seaTempC: 14 },
        { month: 'Oct', highC: 12, lowC: 7, rainMm: 220, sunDays: 11, seaTempC: 12 },
        { month: 'Nov', highC: 7, lowC: 3, rainMm: 220, sunDays: 8, seaTempC: 10 },
        { month: 'Dec', highC: 4, lowC: 0, rainMm: 200, sunDays: 6, seaTempC: 8 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun, warmest weather, and best fjord visibility',
        hottest: 'July and August (peak season with festivals and rain, but longest days and warmest temperatures)',
        quietest: 'May and September (fjords clearer, fewer tourists, but cooler temperatures)',
        recommendation: 'Summer solstice period offers the best balance of weather and daylight for first-time visitors seeking the classic fjord experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Bergen walkable from the cruise port?',
        answer: 'Yes, all terminals are within 5 to 10 minutes walk to Bryggen, fish market, and funiculars. The city centre is compact and easily accessible on foot.',
      },
      {
        question: 'How long do you need in Bergen?',
        answer: 'Allow 6 to 8 hours to cover mountains, fjords, and city sights. A full day enables funicular rides, fjord cruises, and exploring Bryggen wharf.',
      },
      {
        question: 'Is English widely spoken in Bergen?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Bergen safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Bergen is a welcoming, well-policed city with excellent safety standards.',
      },
      {
        question: 'Is Bergen expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Bergen or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 to 200 NOK cash for market stalls. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works perfectly for Bergen city sights and funiculars. Ship excursions are convenient for coordinated fjord cruises and longer excursions.',
      },
      {
        question: 'What is the best thing to do in Bergen on a cruise day?',
        answer: 'Ride the Fløyen funicular for mountain views, explore Bryggen wharf, visit the fish market, and take a fjord cruise to see the dramatic Norwegian scenery.',
      },
      {
        question: 'What\'s the best way to see the fjords from Bergen?',
        answer: 'Nærøyfjord cruise offers the most dramatic fjord experience, passing waterfalls and traditional farms. Fjord Line boats provide regular departures from the harbour.',
      },
      {
        question: 'Is Bergen good for hiking and outdoor activities?',
        answer: 'Excellent. Trails from Fløyen funicular offer mountain hiking with fjord views. Ulriken cable car provides access to higher peaks and more challenging routes.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for midnight sun and warmest weather',
      cruiseTerminals: ['Skolten', 'Bontelabo', 'Jekteviken', 'Dokken', 'Dreggsallmenningen'],
      nearbyAirport: 'Bergen Airport (BGO), 16km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Bergen Cruise Port Guide | Fjords, Mountains & Bryggen Wharf',
      description: 'Complete Bergen cruise port guide. Explore Bryggen wharf, ride Fløyen funicular, visit the fish market, take fjord cruises, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Bergen cruise port', 'Bergen fjords', 'Bergen shore excursions', 'Bergen things to do', 'Bergen from cruise ship', 'Norwegian fjords cruise'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  {
    id: 'geiranger',
    slug: 'geiranger',
    name: 'Geiranger',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 62.1012, lon: 7.2070 },
    tagline: 'UNESCO fjord between cliffs',
    description: 'Geiranger nestles at fjord\'s end surrounded by 1,000m peaks, Seven Sisters waterfall, and hovering eagles, where tenders deliver passengers to a compact village of 250 souls amid emerald farms and thundering cascades. Cruise calls create brief summer bustle before Hurtigruten ferries continue north.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Ships anchor in the fjord; tenders operate to Kaiet pier (Geirangervegen 2) with small terminal, tourist info, and restrooms. Handles 180 plus calls seasonally (May to September); floating SeaWalk pier for one ship, others tender.',
      terminals: 'Kaiet pier (tender landing) with small terminal building. Floating SeaWalk pier available for one ship.',
      shuttleServices: 'Shuttle buses to viewpoints available from village centre (around 25 euros). Village itself is walkable from tender pier.',
      walkability: 'Village is 2-minute walk from tender pier. Everything in the village is walkable within 1km. Viewpoints require transport.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: true,
    },
    
    gettingAround: {
      fromPort: 'Tender drops at Kaiet pier. Everything in village walkable (1km). Tourist buses to Dalsnibba, Flydalsjuvet, and Eagle Bend viewpoints.',
      publicTransport: 'No public transport. Tourist buses run to viewpoints from village centre. Fjord sightseeing boats available.',
      taxis: 'Taxis limited. Tourist buses are the main transport option for viewpoints. Agree fares in advance if hiring.',
      walkingDistance: 'Norwegian Fjords Centre 5 minutes, village centre 2 minutes from tender pier. Viewpoints require bus transport.',
      sightseeingBus: 'Tourist buses operate to Dalsnibba (around 35 euros, 1.5 hours), Flydalsjuvet, and Eagle Bend viewpoints. Fjord sightseeing boats available (around 40 euros, 1.5 hours).',
      accessibility: 'Village is fairly flat and accessible. Viewpoint buses may have limited wheelchair access; check with operators. Fjord Centre has good access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Ålesund Airport (AES)',
        distance: '110km, 2 hours by bus',
        options: 'Bus connections available. No direct flights. Journey takes around 2 hours from airport.',
      },
      trains: {
        mainStation: 'None',
        description: 'No trains. Hurtigruten ferry connects to Ålesund and Hellesylt. Stranda ferry takes around 1 hour.',
        localHubs: 'Hurtigruten ferry provides connections along the coast.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Seven Sisters & Suitor Waterfalls',
        category: 'nature',
        description: 'Iconic cascades with 250m Seven Sisters waterfall and persistent Suitor waterfall. Best viewed from fjord boats or Eagle Bend viewpoint. One of Norway\'s most photographed natural wonders.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Fjord sightseeing boat tours position perfectly for waterfall views',
          'Rainbows often appear post-shower creating spectacular photo opportunities',
          'Drone-free zone; respect local regulations',
        ],
        highlights: ['Nature', 'Views', 'Photography', 'Waterfalls'],
        goodFor: ['Photographers', 'First-time visitors', 'Nature lovers'],
      },
      {
        title: 'Dalsnibba Viewpoint & Skywalk',
        category: 'nature',
        description: '1,500m plateau with glass platform over fjord and Ørnesvingen hairpin road. Breathtaking panoramic views across Geirangerfjord from Norway\'s highest fjord viewpoint.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Tourist bus costs around 35 euros roundtrip; book immediately as fills fast',
          'Cloudbase varies; visibility can change rapidly at altitude',
          'Layers essential; temperatures drop significantly at summit',
        ],
        highlights: ['Views', 'Nature', 'Photography', 'Scenic'],
        goodFor: ['Photographers', 'Active travelers', 'First-time visitors'],
      },
      {
        title: 'Eagle Bend (Ørnesvingen)',
        category: 'nature',
        description: 'Fjord overlook with Seven Sisters and Suitor waterfalls framing cruise ships below. Classic viewpoint offering dramatic fjord panoramas from mountain road hairpin bend.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'First bus stop on viewpoint circuit; wide panoramas perfect for photography',
          'Eagle spotting possible; binoculars recommended',
          'Best light in morning before coach tours arrive',
        ],
        highlights: ['Views', 'Nature', 'Photography', 'Scenic'],
        goodFor: ['First-time visitors', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'Flydalsjuvet Viewpoint',
        category: 'nature',
        description: 'Classic postcard fjord overlook with farms clinging to cliffs. Iconic viewpoint providing picture-perfect framing of Geirangerfjord with traditional Norwegian farms in foreground.',
        duration: '30 minutes to 45 minutes for a relaxed pace',
        tips: [
          'Second bus stop on viewpoint circuit',
          'Foreground rock formations create natural framing for photos',
          'Steady camera essential; views can be windy at exposed location',
        ],
        highlights: ['Views', 'Scenic', 'Photography'],
        goodFor: ['Photographers', 'First-time visitors'],
      },
      {
        title: 'Norwegian Fjords Centre',
        category: 'historic',
        description: 'Fjord history exhibits, films, and local crafts in modern building. Educational centre explaining Geirangerfjord\'s UNESCO status, geology, and cultural heritage through interactive displays.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Perfect rainy day option with indoor exhibits and films',
          'English audio guides available; very informative',
          'Coffee terrace offers fjord views while you rest',
        ],
        highlights: ['Culture', 'Museums', 'History'],
        goodFor: ['Culture seekers', 'Families', 'First-time visitors'],
      },
      {
        title: 'Storseterfossen Waterfall Hike',
        category: 'active',
        description: '327-step climb behind thundering cascade with rainbow tunnel effect. Spectacular waterfall walk allowing visitors to stand directly behind the powerful waterfall for unique photo opportunities.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Waterproof gear essential; you will get wet near waterfall',
          'Non-slip shoes mandatory; path can be slippery',
          '15-minute walk from pier to trail start; well signposted',
        ],
        highlights: ['Nature', 'Hiking', 'Waterfalls', 'Photography'],
        goodFor: ['Active travelers', 'Photographers', 'Adventure seekers'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Pier kiosks',
        type: 'Cafe',
        description: 'Waffles and coffee at tender landing. Quick refreshments right at the pier with fjord views.',
      },
      {
        name: 'Village bakeries',
        type: 'Bakery',
        description: 'Skillingsboller pastries and traditional Norwegian baked goods along main street. Authentic local treats perfect for morning refreshment.',
      },
      {
        name: 'Fjord Centre cafe',
        type: 'Restaurant',
        description: 'Trout and salmon dishes near exhibits. Traditional Norwegian cuisine with fjord views from terrace.',
      },
      {
        name: 'Hotel Union Geiranger',
        type: 'Restaurant',
        description: 'Fjord buffet in historic hotel. Classic Norwegian hospitality with extensive buffet featuring local specialities.',
      },
    ],
    
    insiderTips: [
      'Book Dalsnibba bus immediately as spaces fill fast during cruise season',
      'Waterproof everything; microclimates can vary 10 degrees between village and viewpoints',
      'Visit viewpoints 9 to 11am before coach tours arrive for quieter experience and better light',
      'Tender priority for elderly and families with children; buses timed to ship schedules',
      'Cards accepted everywhere; keep 100 to 200 NOK cash for kiosks; no tipping expected',
      'Sturdy shoes mandatory for hikes; leech socks recommended for waterfall trails',
      'Skip souvenir stalls; local wool products offer authentic Norwegian keepsakes',
      'Check Yr.no radar hourly for weather updates; Fjord Pass offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Geiranger has a cool temperate climate with short, mild summers and long, cold winters. Cruise season runs May to September when weather is most favourable for fjord visits and outdoor activities.',
      months: [
        { month: 'Jan', highC: -1, lowC: -6, rainMm: 150, sunDays: 5, seaTempC: 7 },
        { month: 'Feb', highC: 0, lowC: -5, rainMm: 120, sunDays: 7, seaTempC: 7 },
        { month: 'Mar', highC: 2, lowC: -4, rainMm: 130, sunDays: 9, seaTempC: 8 },
        { month: 'Apr', highC: 6, lowC: -1, rainMm: 110, sunDays: 11, seaTempC: 9 },
        { month: 'May', highC: 11, lowC: 4, rainMm: 120, sunDays: 14, seaTempC: 11 },
        { month: 'Jun', highC: 15, lowC: 8, rainMm: 140, sunDays: 15, seaTempC: 14 },
        { month: 'Jul', highC: 17, lowC: 10, rainMm: 150, sunDays: 16, seaTempC: 16 },
        { month: 'Aug', highC: 16, lowC: 9, rainMm: 160, sunDays: 15, seaTempC: 16 },
        { month: 'Sep', highC: 12, lowC: 5, rainMm: 200, sunDays: 12, seaTempC: 14 },
        { month: 'Oct', highC: 7, lowC: 2, rainMm: 220, sunDays: 9, seaTempC: 12 },
        { month: 'Nov', highC: 2, lowC: -2, rainMm: 200, sunDays: 6, seaTempC: 10 },
        { month: 'Dec', highC: -1, lowC: -5, rainMm: 170, sunDays: 5, seaTempC: 8 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun, warmest weather, and longest days',
        hottest: 'July (peak season with busiest tenders, but summer solstice period offers best weather)',
        quietest: 'June and August (fjords greener, fewer tourists, but still excellent weather)',
        recommendation: 'July solstice period offers the best balance of weather and daylight for first-time visitors seeking the classic fjord experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Geiranger walkable from the cruise port?',
        answer: 'Yes, the tiny village is easily walkable from the tender pier. The village centre is just 2 minutes from the landing point, and everything within the village is accessible on foot.',
      },
      {
        question: 'How long do you need in Geiranger?',
        answer: 'Allow 6 to 8 hours to cover viewpoints, hikes, and village sights. A full day enables Dalsnibba bus circuit, waterfall hikes, and fjord boat tours.',
      },
      {
        question: 'Is English widely spoken in Geiranger?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Geiranger safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Geiranger is a welcoming, peaceful village with excellent safety standards.',
      },
      {
        question: 'Is Geiranger expensive?',
        answer: 'Yes, very expensive. Expect costs such as waffles around 80 NOK. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Geiranger or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 to 200 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Bus tour DIY works perfectly for viewpoints and hikes. Independent exploration is straightforward, though ship excursions offer convenience for coordinated timing.',
      },
      {
        question: 'What is the best thing to do in Geiranger on a cruise day?',
        answer: 'Take the Dalsnibba bus circuit to see the fjord from above, visit Seven Sisters waterfall by boat, and hike to Storseterfossen waterfall for a complete fjord experience.',
      },
      {
        question: 'What\'s the best way to see the fjords from Geiranger?',
        answer: 'Fjord sightseeing boat tours offer close-up views of Seven Sisters and Suitor waterfalls. Combine with viewpoint buses to Dalsnibba, Flydalsjuvet, and Eagle Bend for comprehensive fjord perspectives from both water and mountain.',
      },
      {
        question: 'Is Geiranger good for hiking and outdoor activities?',
        answer: 'Excellent. Short trails to waterfalls like Storseterfossen offer accessible hiking with spectacular rewards. Viewpoint circuits and fjord boat tours provide varied outdoor experiences suitable for most fitness levels.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August',
      cruiseTerminals: ['Kaiet Pier (tender)', 'SeaWalk floating pier'],
      nearbyAirport: 'Ålesund Airport (AES), 110km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Geiranger Cruise Port Guide | UNESCO Fjord & Waterfalls',
      description: 'Complete Geiranger cruise port guide. See Seven Sisters waterfall, visit Dalsnibba Skywalk, hike to Storseterfossen, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Geiranger cruise port', 'Geirangerfjord', 'Geiranger shore excursions', 'Geiranger things to do', 'Geiranger from cruise ship', 'Norwegian fjords cruise'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  {
    id: 'flam',
    slug: 'flam',
    name: 'Flåm',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 60.8628, lon: 7.1133 },
    tagline: 'Railway through the fjords',
    description: 'Flåm\'s tiny village (450 residents) hugs the fjord beneath 1,800m peaks, where tenders or docks deliver passengers steps from the iconic Flåm Railway station and fjord cruise piers. Summer brings cruise crowds to this Norway in a Nutshell hub, blending engineering marvels with kayaks, hikes, and Viking village excursions.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Modern pier handles smaller ships directly; larger vessels tender to Flåm Havn with tourist info, restrooms, WiFi. Steps from railway station and ferry pier; no shuttles needed. Peak season 100 plus calls May to September.',
      terminals: 'Flåm Havn pier for smaller ships; tender landing for larger vessels. Terminal offers tourist information, restrooms, and WiFi.',
      shuttleServices: 'No shuttles needed; everything is within walking distance from the pier and tender landing.',
      walkability: 'Everything within 500m walk: railway, fjord boats, village shops. Compact village is easily accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: true,
    },
    
    gettingAround: {
      fromPort: 'Everything within 500m walk: railway, fjord boats, village shops. Buses to Stegastein Viewpoint, e-bikes, and RIB boats available.',
      publicTransport: 'Flåm Railway connects to Myrdal (1 hour, connects to Bergen-Oslo line). Buses available for viewpoints and excursions.',
      taxis: 'Taxis available but limited. Buses and organised tours are the main transport options for viewpoints and excursions.',
      walkingDistance: 'Railway station 2 minutes, Nærøyfjord boat 5 minutes, village shops within 500m from pier. Everything central and walkable.',
      sightseeingBus: 'Buses to Stegastein Viewpoint available. E-bikes and RIB boats offer alternative sightseeing options.',
      accessibility: 'Village is fairly flat and accessible. Railway station and fjord boats have good access. Viewpoint buses may have limited wheelchair access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Bergen Airport (BGO)',
        distance: '170km, 3 hours via Norway in a Nutshell',
        options: 'No local airport. Bergen Airport accessible via Norway in a Nutshell route (3 hours) combining train, bus, and ferry connections.',
      },
      trains: {
        mainStation: 'Flåm Railway Station',
        description: 'Flåm Railway to Myrdal (1 hour, connects to Bergen-Oslo line). On-site station steps from cruise pier.',
        localHubs: 'Flåm Railway Station is the main hub, connecting to Myrdal and the Bergen-Oslo railway line.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Flåm Railway (Flåmsbana)',
        category: 'landmark',
        description: 'World\'s steepest railway (5km climb of 865m) through waterfalls, ravines to Myrdal. Engineering marvel offering spectacular fjord and mountain views.',
        duration: '2 hours roundtrip for a relaxed pace',
        tips: [
          'Book tickets in advance as they sell out quickly during cruise season',
          'Choose outward window seats for best views of waterfalls and scenery',
          'Don\'t miss the Kjosfossen waterfall stop for photos and experience',
        ],
        highlights: ['Scenic', 'Engineering', 'Photography'],
        goodFor: ['First-time visitors', 'Train enthusiasts', 'Photographers'],
      },
      {
        title: 'Nærøyfjord Cruise',
        category: 'nature',
        description: 'UNESCO narrow fjord past farms, waterfalls to Gudvangen (1.75 hours). One of Norway\'s most dramatic fjord experiences with stunning natural scenery.',
        duration: '2 to 3 hours roundtrip for a relaxed pace',
        tips: [
          'Book fjord boat tickets early as they combine with railway for popular Norway in a Nutshell route',
          'Bus return from Gudvangen offers alternative route back to Flåm',
          'Look for traditional grass-roofed farms with goats on roofs along the fjord',
        ],
        highlights: ['Fjords', 'Views', 'Nature'],
        goodFor: ['Photographers', 'Nature lovers', 'First-time visitors'],
      },
      {
        title: 'Stegastein Viewpoint',
        category: 'nature',
        description: 'Cantilever platform 650m above Aurlandsfjord offering breathtaking panoramic views. Bus journey takes 15 minutes from village.',
        duration: '1.5 to 2 hours roundtrip for a relaxed pace',
        tips: [
          'Book bus tickets in advance for popular times during cruise season',
          'Glass edge platform offers dramatic photo opportunities',
          'Clear mornings provide best visibility and lighting for photography',
        ],
        highlights: ['Views', 'Architecture', 'Photography'],
        goodFor: ['Photographers', 'Active travelers', 'First-time visitors'],
      },
      {
        title: 'Njardarheimr Viking Village',
        category: 'historic',
        description: 'Living Viking farm with mead, archery, longship rides. Authentic recreation of Viking settlement offering interactive experiences.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Entry costs around 300 NOK; includes access to all activities',
          'Dress-up photos in Viking costumes are popular with families',
          'Mead tasting available for adults; non-alcoholic options for children',
        ],
        highlights: ['History', 'Culture', 'Family-friendly'],
        goodFor: ['Families', 'History buffs', 'Culture seekers'],
      },
      {
        title: 'Brekkefossen Waterfall Hike',
        category: 'active',
        description: '20-minute steep climb to 800m cascade base with village views. Accessible waterfall hike offering rewarding views and natural beauty.',
        duration: '1 to 1.5 hours roundtrip for a relaxed pace',
        tips: [
          'Wear sturdy shoes as the path is steep and can be slippery',
          'Free to access; no tickets required',
          'Post-rain visits offer spectacular rainbows at the waterfall base',
        ],
        highlights: ['Hiking', 'Waterfalls', 'Views'],
        goodFor: ['Active travelers', 'Nature lovers', 'Photographers'],
      },
      {
        title: 'Ægir Brewery',
        category: 'markets',
        description: 'Award-winning craft beers in Viking longhall setting. Atmospheric brewery offering tastings and traditional Norwegian brewing experience.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Tastings cost around 150 NOK; includes several beer samples',
          'Try the pretzels which pair perfectly with the craft beers',
          'Non-alcoholic options available for those who don\'t drink',
        ],
        highlights: ['Food', 'Culture'],
        goodFor: ['Foodies', 'Culture seekers', 'First-time visitors'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Ægir BrewPub',
        type: 'Brewery',
        description: 'Craft IPAs, pretzels in Viking longhall setting. Award-winning brewery offering atmospheric dining experience.',
      },
      {
        name: 'Flåm Marina',
        type: 'Seafood',
        description: 'Salmon, seafood soup with fjord views. Traditional Norwegian seafood restaurant overlooking the harbour.',
      },
      {
        name: 'Village bakery',
        type: 'Cafe',
        description: 'Skillingsbolle cinnamon buns near railway station. Local bakery offering traditional Norwegian pastries and coffee.',
      },
      {
        name: 'Viking Village mead',
        type: 'Tavern',
        description: 'Honey mead tastings at Njardarheimr Viking Village. Authentic Viking drinking experience in historic setting.',
      },
    ],
    
    insiderTips: [
      'Book railway tickets first thing as they sell out quickly; Nærøyfjord boats next priority',
      'Waterproof layers essential; microclimates can vary by 10 degrees Celsius',
      'Arrive 8 to 10am to beat peak crowds before coach tours arrive',
      'Walk village for shops and cafes; buses for viewpoints; boats for fjords',
      'Cards accepted everywhere; keep 100 NOK cash for kiosks; no tipping expected',
      'E-bike and zipline activities should be booked ahead during peak season',
      'Skip chain restaurants; local craft beer at Ægir offers authentic experience',
      'Check Yr.no for weather forecasts; Flåm Card offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Flåm has a temperate maritime climate with cool summers and cold winters. Summer offers the best weather for fjord cruises and railway journeys, with long daylight hours and milder temperatures.',
      months: [
        { month: 'Jan', highC: 1, lowC: -4, rainMm: 180, sunDays: 5, seaTempC: 6 },
        { month: 'Feb', highC: 2, lowC: -3, rainMm: 150, sunDays: 7, seaTempC: 6 },
        { month: 'Mar', highC: 4, lowC: -2, rainMm: 150, sunDays: 10, seaTempC: 7 },
        { month: 'Apr', highC: 8, lowC: 1, rainMm: 120, sunDays: 12, seaTempC: 9 },
        { month: 'May', highC: 13, lowC: 6, rainMm: 130, sunDays: 15, seaTempC: 12 },
        { month: 'Jun', highC: 17, lowC: 10, rainMm: 140, sunDays: 16, seaTempC: 14 },
        { month: 'Jul', highC: 19, lowC: 12, rainMm: 150, sunDays: 17, seaTempC: 16 },
        { month: 'Aug', highC: 18, lowC: 11, rainMm: 160, sunDays: 16, seaTempC: 16 },
        { month: 'Sep', highC: 14, lowC: 7, rainMm: 200, sunDays: 13, seaTempC: 14 },
        { month: 'Oct', highC: 9, lowC: 3, rainMm: 220, sunDays: 10, seaTempC: 11 },
        { month: 'Nov', highC: 4, lowC: -1, rainMm: 200, sunDays: 7, seaTempC: 9 },
        { month: 'Dec', highC: 1, lowC: -4, rainMm: 180, sunDays: 5, seaTempC: 7 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun, warmest weather, and best fjord visibility',
        hottest: 'July (peak season with busiest trains, but longest days and warmest temperatures)',
        quietest: 'June and August (greener fjords, fewer tourists, but still excellent weather)',
        recommendation: 'June or August offer the best balance of weather and crowds for first-time visitors seeking the classic fjord experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Flåm walkable from the cruise port?',
        answer: 'Yes, everything is central and within walking distance. The railway station is 2 minutes from the pier, and the village shops and fjord boats are all within 500m.',
      },
      {
        question: 'How long do you need in Flåm?',
        answer: 'Allow 6 to 8 hours to cover the railway and fjord cruise. A full day enables you to experience both the Flåm Railway and Nærøyfjord cruise, plus village exploration.',
      },
      {
        question: 'Is English widely spoken in Flåm?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Flåm safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Flåm is a welcoming, well-maintained village with excellent safety standards.',
      },
      {
        question: 'Is Flåm expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Flåm or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works perfectly for railway and fjord boat tickets. DIY booking is straightforward, though ship excursions offer convenience for coordinated timing.',
      },
      {
        question: 'What is the best thing to do in Flåm on a cruise day?',
        answer: 'Ride the Flåm Railway for spectacular mountain and waterfall views, then take the Nærøyfjord cruise to experience one of Norway\'s most dramatic fjords.',
      },
      {
        question: 'What\'s the best way to see the fjords from Flåm?',
        answer: 'Nærøyfjord cruise offers the most dramatic fjord experience, passing waterfalls and traditional farms. Combine with the Flåm Railway for the complete Norway in a Nutshell experience.',
      },
      {
        question: 'Is Flåm good for hiking and outdoor activities?',
        answer: 'Excellent. Brekkefossen waterfall hike offers accessible mountain walking with rewarding views. E-bikes, kayaks, and RIB boats provide varied outdoor experiences suitable for most fitness levels.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for midnight sun and warmest weather',
      cruiseTerminals: ['Flåm Havn pier', 'Tender landing'],
      nearbyAirport: 'Bergen Airport (BGO), 170km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Flåm Cruise Port Guide | Railway, Fjords & Viking Village',
      description: 'Complete Flåm cruise port guide. Ride the Flåm Railway, cruise Nærøyfjord, visit Stegastein Viewpoint, explore Viking village, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Flåm cruise port', 'Flåm Railway', 'Flåm shore excursions', 'Flåm things to do', 'Flåm from cruise ship', 'Norwegian fjords cruise', 'Nærøyfjord'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  {
    id: 'stavanger',
    slug: 'stavanger',
    name: 'Stavanger',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 58.9701, lon: 5.7333 },
    tagline: 'Pulpit Rock fjord gateway',
    description: 'Stavanger blends Viking heritage with modern oil wealth, where cruise ships dock steps from cobblestone Gamle Stavanger alleys and colourful Øvre Holmegate while fjord boats depart for dramatic Lysefjord cliffs and Preikestolen views. Compact layout suits short port calls amid North Sea breezes.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Strandkaien terminal handles mega-ships directly with tourist info, restrooms, WiFi right at the harbour; 5-minute walk to old town. Viking House VR experience and fjord cruise departures adjacent. No shuttles needed for city core.',
      terminals: 'Strandkaien terminal offers tourist information, restrooms, and WiFi. Direct docking for large cruise ships with immediate access to city centre.',
      shuttleServices: 'No shuttles needed for city core; everything is within 5 minutes walk from the terminal.',
      walkability: 'Gamle Stavanger and city centre are 5 minutes flat walk from terminal. Compact layout makes everything easily accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Exit for 5-minute flat stroll to Gamle Stavanger and Øvre Holmegate. Fjord cruises and RIB boats depart from harbour adjacent to terminal.',
      publicTransport: 'Buses to Swords monument (around 30 NOK, 20 minutes). City centre is walkable; buses available for longer distances.',
      taxis: 'Taxis available at terminal. Expect higher costs than European cities; cards accepted everywhere.',
      walkingDistance: 'Old town 5 minutes, fjord cruise boats 3 minutes, Swords monument requires bus or taxi (20 minutes).',
      sightseeingBus: 'No dedicated hop-on hop-off bus; city is compact enough to explore on foot.',
      accessibility: 'Stavanger is fairly accessible with flat paths in city centre. Fjord cruises and museums have good access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Stavanger Airport (SVG)',
        distance: '14km, 20 minutes by taxi or bus',
        options: 'Taxi or bus connect airport to city centre in 20 minutes. Airport express bus available.',
      },
      trains: {
        mainStation: 'Stavanger Station',
        description: 'To Oslo (7 hours). 15-minute walk from cruise terminal.',
        localHubs: 'Stavanger Station is the main rail hub for connections to Oslo and other Norwegian cities.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Lysefjord Cruise',
        category: 'nature',
        description: '42km fjord with 600m Pulpit Rock, Hengjanefossen waterfall, granite cliffs. Spectacular fjord journey showcasing Norway\'s dramatic natural scenery and iconic Preikestolen cliffs.',
        duration: '3 to 3.5 hours for a relaxed pace',
        tips: [
          'Rødne electric boats are quieter and more environmentally friendly',
          'Best photos of Pulpit Rock are from underneath during the cruise',
          'Book at harbour first as tours fill fast during cruise season',
        ],
        highlights: ['Nature', 'Views', 'Waterfalls'],
        goodFor: ['First-time visitors', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'Gamle Stavanger (Old Town)',
        category: 'historic',
        description: '173 preserved 18th-century white wooden houses on cobblestones. Charming historic quarter showcasing traditional Norwegian architecture and maritime heritage.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Morning light offers best photography conditions',
          'Free to explore; can combine with canning museum visit',
          'Walk the narrow cobblestone alleys for authentic atmosphere',
        ],
        highlights: ['Architecture', 'History', 'Photography'],
        goodFor: ['Culture seekers', 'Photographers', 'History buffs'],
      },
      {
        title: 'Øvre Holmegate',
        category: 'stroll',
        description: 'Colourful street with street art, boutiques, cafes in pedestrian zone. Vibrant cultural hub known as Stavanger\'s most Instagram-worthy street.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Street food vendors offer authentic Norwegian snacks',
          'Evening lights create beautiful atmosphere',
          'Murals are Instagram-famous photo opportunities',
        ],
        highlights: ['Culture', 'Shopping', 'Photography'],
        goodFor: ['Photographers', 'Shoppers', 'Culture seekers'],
      },
      {
        title: 'Swords in Rock (Three Swords)',
        category: 'landmark',
        description: '10m bronze swords commemorating 872 Battle of Hafrsfjord. Iconic monument marking Norway\'s unification under King Harald Fairhair with dramatic waterfront setting.',
        duration: '1 to 1.5 hours roundtrip for a relaxed pace',
        tips: [
          'Take bus 18 from city centre for around 30 NOK',
          'Waterfront trails offer scenic walks around the monument',
          'Learn about Harald Fairhair history at the site',
        ],
        highlights: ['History', 'Sculpture', 'Views'],
        goodFor: ['History buffs', 'Photographers', 'Culture seekers'],
      },
      {
        title: 'Norwegian Petroleum Museum',
        category: 'historic',
        description: 'Interactive oil rigs, drilling simulators, North Sea platforms. Fascinating museum exploring Norway\'s oil industry and North Sea energy heritage through hands-on exhibits.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Entry costs around 140 NOK for adults',
          'Escape room offers interactive experience',
          'All exhibits have English translations',
        ],
        highlights: ['Museums', 'Technology', 'History'],
        goodFor: ['First-time visitors', 'Families', 'Culture seekers'],
      },
      {
        title: 'Viking House VR',
        category: 'historic',
        description: 'Immersive VR battle experience opposite tourist office. Interactive virtual reality attraction bringing Viking history to life with engaging storytelling.',
        duration: '45 minutes for a relaxed pace',
        tips: [
          'Entry costs around 175 NOK',
          'Book early as spaces fill quickly during cruise season',
          'Suitable for children aged 10 and over',
        ],
        highlights: ['History', 'Culture', 'Family-friendly'],
        goodFor: ['Families', 'History buffs', 'First-time visitors'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Øvre Holmegate cafes',
        type: 'Cafe',
        description: 'Cinnamon buns, coffee, and Norwegian pastries in colourful street setting. Perfect refreshment stop while exploring Stavanger\'s most vibrant street.',
      },
      {
        name: 'Harbour seafood stalls',
        type: 'Market',
        description: 'Salmon, shrimp salad, and fresh North Sea catch near fjord cruise area. Authentic Norwegian seafood experience at the waterfront.',
      },
      {
        name: 'Gamle Stavanger pubs',
        type: 'Pub',
        description: 'Local craft beers and traditional Norwegian pub fare in historic wooden house setting. Cosy atmosphere in preserved old town buildings.',
      },
      {
        name: 'Pintxos bars',
        type: 'Tapas',
        description: 'Basque-style skewers and small plates in old town. International flavours with Norwegian ingredients in vibrant bar setting.',
      },
    ],
    
    insiderTips: [
      'Fjord cruises book at harbour first as tours fill fast during peak season',
      'Waterproof layers essential; wind off fjords can be strong',
      'Visit old town in mornings before coach tour groups arrive',
      'Walk city centre; buses for monuments; boats for fjords',
      'Cards accepted everywhere; keep 100 NOK for kiosks; no tipping expected',
      'Relaxed Nordic vibe; siesta uncommon; shops keep regular hours',
      'Skip chain restaurants; street food offers authentic Norwegian experience',
      'Check Yr.no for weather radar; Stavanger Card offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Stavanger has a temperate maritime climate with mild winters and cool summers. North Sea breezes bring changeable weather year-round. Summer offers the best conditions for fjord cruises and outdoor exploration.',
      months: [
        { month: 'Jan', highC: 3, lowC: 0, rainMm: 130, sunDays: 8, seaTempC: 6 },
        { month: 'Feb', highC: 3, lowC: 0, rainMm: 110, sunDays: 9, seaTempC: 6 },
        { month: 'Mar', highC: 6, lowC: 2, rainMm: 100, sunDays: 11, seaTempC: 8 },
        { month: 'Apr', highC: 9, lowC: 4, rainMm: 80, sunDays: 13, seaTempC: 10 },
        { month: 'May', highC: 14, lowC: 8, rainMm: 90, sunDays: 16, seaTempC: 13 },
        { month: 'Jun', highC: 17, lowC: 11, rainMm: 90, sunDays: 17, seaTempC: 15 },
        { month: 'Jul', highC: 19, lowC: 13, rainMm: 100, sunDays: 18, seaTempC: 17 },
        { month: 'Aug', highC: 19, lowC: 13, rainMm: 120, sunDays: 17, seaTempC: 17 },
        { month: 'Sep', highC: 15, lowC: 10, rainMm: 140, sunDays: 14, seaTempC: 15 },
        { month: 'Oct', highC: 11, lowC: 7, rainMm: 160, sunDays: 12, seaTempC: 13 },
        { month: 'Nov', highC: 7, lowC: 4, rainMm: 160, sunDays: 9, seaTempC: 10 },
        { month: 'Dec', highC: 4, lowC: 1, rainMm: 140, sunDays: 8, seaTempC: 7 },
      ],
      bestTime: {
        overall: 'June to August for mild temperatures, longer days, and best fjord visibility',
        hottest: 'July and August (peak season with festivals and longest days, but can be busy)',
        quietest: 'June and September (fjords clearer, fewer tourists, but cooler temperatures)',
        recommendation: 'Summer months offer the best balance of weather and daylight for first-time visitors seeking the classic fjord experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Stavanger walkable from the cruise port?',
        answer: 'Yes, Gamle Stavanger and city centre are just 5 minutes flat walk from Strandkaien terminal. The compact layout makes everything easily accessible on foot.',
      },
      {
        question: 'How long do you need in Stavanger?',
        answer: 'Allow 6 to 8 hours to cover fjord cruise, old town, and city sights. A full day enables Lysefjord boat trip, Gamle Stavanger exploration, and visiting key attractions.',
      },
      {
        question: 'Is English widely spoken in Stavanger?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Stavanger safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Stavanger is a welcoming, well-policed city with excellent safety standards.',
      },
      {
        question: 'Is Stavanger expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 200 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Stavanger or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks and market stalls. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works perfectly for city sights and fjord cruises can be booked at harbour. Ship excursions offer convenience for coordinated experiences.',
      },
      {
        question: 'What is the best thing to do in Stavanger on a cruise day?',
        answer: 'Take a Lysefjord cruise to see Pulpit Rock from below, explore Gamle Stavanger old town, and visit the colourful Øvre Holmegate street for a perfect Norwegian fjords experience.',
      },
      {
        question: 'Is hiking Pulpit Rock possible on a cruise day?',
        answer: 'Pulpit Rock hike requires a full day (8 to 10 hours) with transport to trailhead. Ship excursions are the only viable option for cruise passengers; independent trips are not recommended due to timing constraints.',
      },
      {
        question: 'Is Stavanger family-friendly?',
        answer: 'Yes, very family-friendly. Museums, walks, and fjord cruises are suitable for all ages. Norwegian Petroleum Museum and Viking House VR offer engaging experiences for children.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for mild weather and longest days',
      cruiseTerminals: ['Strandkaien'],
      nearbyAirport: 'Stavanger Airport (SVG), 14km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Stavanger Cruise Port Guide | Lysefjord, Pulpit Rock & Old Town',
      description: 'Complete Stavanger cruise port guide. Take Lysefjord cruise to Pulpit Rock, explore Gamle Stavanger old town, visit colourful Øvre Holmegate, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Stavanger cruise port', 'Stavanger fjords', 'Stavanger shore excursions', 'Stavanger things to do', 'Stavanger from cruise ship', 'Norwegian fjords cruise', 'Lysefjord', 'Pulpit Rock'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-28',
  },

  {
    id: 'tromso',
    slug: 'tromso',
    name: 'Tromsø',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 69.6492, lon: 18.9551 },
    tagline: 'Arctic gateway to aurora',
    description: 'Tromsø blends urban vibrancy with fjord wilderness where cruise terminals position ships for immediate access to Polaria aquarium, Fjellheisen cable car panoramas, and Arctic Cathedral\'s stark silhouette across the bridge. Passengers chase humpbacks, huskies, and green skies from this northernmost university city.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Prostneset terminal docks centrally with WiFi and tourist info; larger ships use Breivika terminal (shuttle 15 minutes). Two-minute walk to Polaria; bridge to Arctic Cathedral 20 minutes. Year-round calls peak during winter aurora season.',
      terminals: 'Prostneset terminal offers WiFi and tourist information. Breivika terminal serves larger ships with shuttle service to city centre.',
      shuttleServices: 'Shuttle buses run from Breivika terminal to city centre (15 minutes). Prostneset terminal is walkable; no shuttle needed.',
      walkability: 'Prostneset terminal is walkable to city centre (2 minutes to Polaria). Breivika terminal requires shuttle bus or taxi (15 minutes).',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Flat walk to centre and cable car base (10 minutes from Prostneset). Buses to Sami camps; RIB boats for whale watching. City centre is compact and walkable.',
      publicTransport: 'Buses connect to Sami camps and outskirts. RIB boats offer whale watching tours. City centre attractions are within walking distance.',
      taxis: 'Taxis available at terminals. Expect higher costs than European cities; cards accepted everywhere.',
      walkingDistance: 'Polaria 2 minutes, Fjellheisen cable car 15 minutes, Arctic Cathedral 20 minutes from Prostneset terminal. City centre is compact.',
      sightseeingBus: 'City Sightseeing hop-on hop-off bus available seasonally for major attractions and viewpoints.',
      accessibility: 'Tromsø is fairly accessible with flat paths in city centre. Polaria and Arctic Cathedral have good access. Cable car and outdoor activities may have limitations.',
    },
    
    transportConnections: {
      airport: {
        name: 'Tromsø Airport (TOS)',
        distance: '5km, 10 minutes by taxi',
        options: 'Taxi connects airport to city centre in 10 minutes. Airport bus available. Distance is short and straightforward.',
      },
      trains: {
        mainStation: 'None',
        description: 'No trains. Hurtigruten coastal ferry connects to other Norwegian ports along the coast.',
        localHubs: 'Hurtigruten coastal ferry provides connections to other Arctic and Norwegian coastal destinations.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Polaria Aquarium',
        category: 'family',
        description: 'Bearded seals, Arctic films, and climate exhibits steps from terminal. Educational centre showcasing Arctic marine life with engaging exhibits and seal feeding demonstrations.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Seal feeding at 1pm is popular with visitors',
          'Cinema shows offer immersive Arctic experiences',
          'Perfect rainy day activity close to cruise terminal',
        ],
        highlights: ['Wildlife', 'Museums', 'Family-friendly'],
        goodFor: ['Families', 'First-time visitors', 'Wildlife enthusiasts'],
      },
      {
        title: 'Fjellheisen Cable Car',
        category: 'nature',
        description: 'Summit panoramas over fjords, city, and mountains with 421m ascent. Dramatic cable car ride offering spectacular views of Tromsø and surrounding Arctic landscape.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Book tickets online in advance for convenience and to avoid queues',
          'Midnight sun hikes available in summer months',
          'Cafe at summit offers refreshments with panoramic views',
        ],
        highlights: ['Views', 'Nature', 'Photography'],
        goodFor: ['Photographers', 'First-time visitors', 'Nature lovers'],
      },
      {
        title: 'Arctic Cathedral',
        category: 'landmark',
        description: 'Triangular modernist icon with massive stained glass windows and organ concerts. Iconic architectural landmark representing Tromsø\'s Arctic character with stunning design.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Entry fee applies; bridge views offer excellent photography opportunities',
          'Best visited during daylight hours for architectural details',
          'Check concert schedule for musical performances',
        ],
        highlights: ['Architecture', 'Religious', 'Photography'],
        goodFor: ['Architecture lovers', 'Photographers', 'First-time visitors'],
      },
      {
        title: 'Northern Lights Hunt',
        category: 'excursion',
        description: 'Evening minibus or RIB chases aurora during winter season (September to April). Guided tours seeking the spectacular Northern Lights with expert photography tips and warm refreshments.',
        duration: '4 to 6 hours for a relaxed pace',
        tips: [
          'Small group tours offer better experience and flexibility',
          'Photo tips included; bring camera equipment',
          'Clear skies essential; weather-dependent activity',
        ],
        highlights: ['Aurora', 'Night skies', 'Photography'],
        goodFor: ['Photographers', 'First-time visitors', 'Nature lovers'],
      },
      {
        title: 'Polar Museum',
        category: 'historic',
        description: 'Trappers, expeditions, and Amundsen artifacts in historic building. Fascinating museum exploring Arctic exploration history and Norwegian polar expeditions.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Free entry in winter months',
          'English audio guides available',
          'Exhibits showcase challenging Arctic exploration history',
        ],
        highlights: ['History', 'Museums', 'Culture'],
        goodFor: ['History buffs', 'Culture seekers', 'First-time visitors'],
      },
      {
        title: 'Whale Watching',
        category: 'excursion',
        description: 'Humpback and orca RIB tours during feeding season (November to February). Exciting boat trips to see magnificent whales in their natural Arctic habitat.',
        duration: '4 to 5 hours for a relaxed pace',
        tips: [
          'Warm suits provided by operators',
          'Seasickness tablets recommended for sensitive passengers',
          'Choose ethical operators following whale watching guidelines',
        ],
        highlights: ['Wildlife', 'Fjords', 'Nature'],
        goodFor: ['Nature lovers', 'Wildlife enthusiasts', 'Photographers'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Mack Ølhallen',
        type: 'Brewery',
        description: 'Northernmost beer hall with historic brews and traditional Norwegian atmosphere. Authentic brewery experience in historic setting.',
      },
      {
        name: 'Polaria cafe',
        type: 'Cafe',
        description: 'Seal-view seafood soup and light meals inside Polaria aquarium. Unique dining experience with views of Arctic marine life.',
      },
      {
        name: 'Storgata restaurants',
        type: 'Restaurant',
        description: 'Reindeer, stockfish, and traditional Norwegian cuisine on pedestrian street. Variety of dining options showcasing local Arctic specialities.',
      },
      {
        name: 'Waterfront kiosks',
        type: 'Market',
        description: 'King crab salads and fresh seafood at harbour stalls. Quick and authentic Norwegian street food experience at the waterfront.',
      },
    ],
    
    insiderTips: [
      'Aurora and whale tours book ahead as weather-dependent activities sell out fast',
      'Layered thermals essential; wind chill can drop temperatures significantly',
      'Cable car mornings before crowds arrive offer better experience',
      'Walk city centre; buses for outskirts; RIB boats for fjord excursions',
      'Cards accepted everywhere; keep 100 NOK for kiosks; no tipping expected',
      'Sami church visits require shoulders covered; respectful dress appreciated',
      'Skip chain restaurants; craft brewery offers authentic Norwegian experience',
      'Aurora forecast apps help plan evening activities; Tromsø Card offers discounts',
    ],
    
    weather: {
      intro: 'Tromsø has a subarctic climate with mild summers and cold, snowy winters. Winter brings Northern Lights opportunities while summer offers midnight sun. Layered clothing essential year-round.',
      months: [
        { month: 'Jan', highC: -1, lowC: -6, rainMm: 100, sunDays: 4, seaTempC: 2 },
        { month: 'Feb', highC: 0, lowC: -6, rainMm: 90, sunDays: 6, seaTempC: 3 },
        { month: 'Mar', highC: 1, lowC: -5, rainMm: 80, sunDays: 9, seaTempC: 5 },
        { month: 'Apr', highC: 4, lowC: -2, rainMm: 60, sunDays: 12, seaTempC: 8 },
        { month: 'May', highC: 9, lowC: 3, rainMm: 50, sunDays: 16, seaTempC: 12 },
        { month: 'Jun', highC: 13, lowC: 7, rainMm: 50, sunDays: 19, seaTempC: 15 },
        { month: 'Jul', highC: 15, lowC: 10, rainMm: 60, sunDays: 20, seaTempC: 17 },
        { month: 'Aug', highC: 14, lowC: 9, rainMm: 80, sunDays: 18, seaTempC: 16 },
        { month: 'Sep', highC: 10, lowC: 5, rainMm: 100, sunDays: 14, seaTempC: 12 },
        { month: 'Oct', highC: 5, lowC: 0, rainMm: 120, sunDays: 10, seaTempC: 8 },
        { month: 'Nov', highC: 1, lowC: -4, rainMm: 100, sunDays: 5, seaTempC: 4 },
        { month: 'Dec', highC: -1, lowC: -6, rainMm: 100, sunDays: 3, seaTempC: 2 },
      ],
      bestTime: {
        overall: 'Winter (December to March) for aurora hunting and summer (June to July) for midnight sun',
        hottest: 'July (peak summer with midnight sun and warmest temperatures, but busy season)',
        quietest: 'Shoulder seasons (May, September, October) offer balanced activities with fewer crowds',
        recommendation: 'Winter months offer the best Northern Lights experience for first-time visitors seeking aurora, while summer provides midnight sun and whale watching opportunities.',
      },
    },
    
    faq: [
      {
        question: 'Is Tromsø walkable from the cruise port?',
        answer: 'Yes, Prostneset terminal is walkable with Polaria just 2 minutes away. Breivika terminal requires shuttle bus (15 minutes) to city centre.',
      },
      {
        question: 'How long do you need in Tromsø?',
        answer: 'Allow 6 to 8 hours to cover city attractions and an excursion. A full day enables cable car, Polaria, Arctic Cathedral, and optional aurora or whale watching tour.',
      },
      {
        question: 'Is English widely spoken in Tromsø?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Tromsø safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Tromsø is a welcoming, well-policed Arctic city with excellent safety standards.',
      },
      {
        question: 'Is Tromsø expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Tromsø or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works perfectly for city sights. Ship excursions are convenient for coordinated aurora hunts and whale watching tours, which are weather-dependent.',
      },
      {
        question: 'What is the best thing to do in Tromsø on a cruise day?',
        answer: 'Ride the Fjellheisen cable car for panoramic views, visit Polaria aquarium, see the Arctic Cathedral, and consider an aurora hunt or whale watching tour depending on season.',
      },
      {
        question: 'Are Northern Lights guaranteed in Tromsø?',
        answer: 'No, Northern Lights are weather-dependent and require clear skies. Aurora hunt tours increase chances by travelling to areas with better conditions, but sightings are never guaranteed.',
      },
      {
        question: 'When is whale watching season in Tromsø?',
        answer: 'Whale watching season runs from November to February when humpback and orca whales feed in Arctic waters. Summer offers different wildlife viewing opportunities.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Winter (December to March) for aurora hunting and summer (June to July) for midnight sun',
      cruiseTerminals: ['Prostneset', 'Breivika'],
      nearbyAirport: 'Tromsø Airport (TOS), 5km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Tromsø Cruise Port Guide | Northern Lights, Arctic & Fjords',
      description: 'Complete Tromsø cruise port guide. Experience Northern Lights, ride Fjellheisen cable car, visit Polaria aquarium, see Arctic Cathedral, and discover insider tips for your Arctic cruise.',
      keywords: ['Tromsø cruise port', 'Tromsø Northern Lights', 'Tromsø shore excursions', 'Tromsø things to do', 'Tromsø from cruise ship', 'Norwegian fjords cruise', 'Arctic cruise', 'Tromsø aurora'],
    },
    
    status: 'published',
    lastUpdated: '2024-12-31',
  },

  {
    id: 'lofoten-islands',
    slug: 'lofoten-islands',
    name: 'Lofoten Islands',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 68.15, lon: 13.61 },
    tagline: 'Rorbus beneath Arctic peaks',
    description: 'Lofoten\'s Leknes-Gravdal piers (shared halfway between towns) anchor mega-ships for access to white-sand beaches, fishing villages like Ballstad and Nusfjord, and midnight sun hikes amid cod-drying racks. Vestvågøy Island\'s mountains frame turquoise seas in this UNESCO candidate above the Arctic Circle.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Ships anchor offshore; tenders to shared pier (5 to 6 minute ride) with gift shop, WiFi (3.50 euros for 20 minutes), fishing gear rental between Leknes (admin centre) and Gravdal (residential). Shuttles to Ballstad (15 euros); taxis to Svolvær. Peak May to September sees 100 plus calls.',
      terminals: 'Leknes-Gravdal shared pier (tender landing) with gift shop, WiFi, and fishing gear rental. Located halfway between Leknes and Gravdal towns.',
      shuttleServices: 'Shuttle buses to Ballstad fishing village (15 euros). Taxis available for longer journeys to Svolvær and other destinations.',
      walkability: 'Limited walkability from pier. Shuttles and taxis essential for reaching villages and attractions. Pier area has viewpoints accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: false,
      tenderRequired: true,
    },
    
    gettingAround: {
      fromPort: 'Tender pier has viewpoints walkable on foot. Shuttles and taxis to Ballstad (30 minutes), beach trails, and other villages. Buses along E10 highway; bikes available at pier (21 euros per day).',
      publicTransport: 'Buses run along E10 highway connecting villages. Hurtigruten ferries provide coastal connections. No train service.',
      taxis: 'Taxis available at pier for journeys to Ballstad, Svolvær, and beaches. Expect higher costs than European cities; agree fares in advance.',
      walkingDistance: 'Pier viewpoints walkable. Leknes town 4km, Ballstad 30 minutes by shuttle, Svolvær 1 hour by taxi.',
      sightseeingBus: 'Shuttle buses operate to Ballstad fishing village and other key destinations. Bikes available for hire at pier.',
      accessibility: 'Limited accessibility due to tender requirement and remote location. Some paths may be challenging; check with operators for specific needs.',
    },
    
    transportConnections: {
      airport: {
        name: 'Leknes Airport (LKN)',
        distance: '10km, 15 minutes by taxi',
        options: 'Taxi available (15 minutes). No public transport connection from airport to pier.',
      },
      trains: {
        mainStation: 'None',
        description: 'No trains. Hurtigruten ferries provide coastal connections along the Lofoten Islands.',
        localHubs: 'Hurtigruten ferry connections available for coastal travel.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Ballstad Fishing Village',
        category: 'historic',
        description: 'Traditional rorbu cabins, active harbour, cod drying racks, and whale spotting opportunities. Authentic fishing village experience showcasing Lofoten\'s maritime heritage.',
        duration: '2 to 3 hours roundtrip for a relaxed pace',
        tips: [
          'Shuttle costs 15 euros; book early as it fills fast',
          'Fresh seafood lunch available at village restaurants',
          'Stokksnes beach walk offers additional scenic views',
        ],
        highlights: ['Culture', 'Photography', 'Food', 'History'],
        goodFor: ['First-time visitors', 'Culture seekers', 'Photographers'],
      },
      {
        title: 'Uttakleiv Beach',
        category: 'beach',
        description: 'White sands, turquoise Arctic surf, and midnight sun picnics. One of the world\'s most beautiful beaches with dramatic mountain backdrop and Arctic waters.',
        duration: '1.5 to 2 hours roundtrip for a relaxed pace',
        tips: [
          'Taxi costs around 20 euros; best light at 10pm in summer',
          'Shallow entry makes it suitable for brave swimmers',
          'Northernmost palm trees create unique Arctic beach experience',
        ],
        highlights: ['Beaches', 'Nature', 'Photography', 'Views'],
        goodFor: ['Photographers', 'Nature lovers', 'Adventure seekers'],
      },
      {
        title: 'Nusfjord UNESCO Village',
        category: 'historic',
        description: '19th-century rorbu cabins, stockfish museum, and no modern buildings. Preserved fishing village offering authentic glimpse into traditional Lofoten life.',
        duration: '3 to 4 hours roundtrip for a relaxed pace',
        tips: [
          'Bus or taxi takes 45 minutes; free to explore exteriors',
          'Bakery offers fresh traditional pastries',
          'Photography opportunities best in morning light',
        ],
        highlights: ['History', 'Architecture', 'Culture', 'Photography'],
        goodFor: ['History buffs', 'Photographers', 'Culture seekers'],
      },
      {
        title: 'Lofoten Stockfish Museum',
        category: 'historic',
        description: 'Cod drying process, Viking trade exhibits in Gravdal. Educational museum explaining the traditional stockfish industry that shaped Lofoten culture.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Located near pier; easy to combine with other activities',
          'English displays throughout; informative for all visitors',
          'Cod liver oil tastings available for adventurous visitors',
        ],
        highlights: ['Museums', 'History', 'Culture', 'Food'],
        goodFor: ['History buffs', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'Hiking Peaks (Reineskarvatnet)',
        category: 'active',
        description: 'Lake viewpoints, mountain passes, and moderate hikes. Scenic trails offering panoramic views over Lofoten\'s dramatic landscape and fjords.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Sturdy shoes essential; trails can be challenging',
          'Guided hikes available (around 50 euros); eagle spotting opportunities',
          'Weather can change quickly; bring layers and waterproof gear',
        ],
        highlights: ['Hiking', 'Views', 'Nature', 'Wildlife'],
        goodFor: ['Active travelers', 'Nature lovers', 'Adventure seekers'],
      },
      {
        title: 'Svolvær Day Trip',
        category: 'excursion',
        description: 'Magic Ice bar, harbour, and 1 hour drive to other Lofoten port. Gateway town offering ice sculptures, galleries, and access to wider Lofoten attractions.',
        duration: '4 to 6 hours for a relaxed pace',
        tips: [
          'Taxi costs around 100 euros return; consider combining with other port visits',
          'Magic Ice bar offers unique Arctic experience',
          'Harbour area has restaurants and shops for extended visit',
        ],
        highlights: ['Culture', 'Art', 'Food', 'Views'],
        goodFor: ['First-time visitors', 'Culture seekers', 'Art lovers'],
      },
    ],
    
    nearestBeach: {
      name: 'Uttakleiv Beach',
      description: 'Arctic white sands with turquoise shallows, dunes, and mountain backdrop. One of the world\'s most beautiful beaches with dramatic Arctic scenery and midnight sun opportunities.',
      type: 'sand',
      waterEntry: 'shallow entry',
      shelter: 'exposed',
      crowdLevel: 'quiet',
      facilities: {
        lifeguards: false,
        lifeguardsSeasonal: false,
        sunbeds: false,
        umbrellas: false,
        showers: false,
        toilets: true,
        restaurants: false,
        changingRooms: false,
      },
      access: {
        walkTime: 'Not feasible from port',
        taxiTime: '20 minutes from port',
        busRoute: 'Local shuttles available',
        notes: 'Midnight sun swims possible; cold water year-round',
      },
      bestFor: ['photography', 'swimming', 'solitude'],
      tip: 'Best light at 10pm in summer for photography.',
    },
    
    foodAndDrink: [
      {
        name: 'Ballstad rorbu restaurants',
        type: 'Restaurant',
        description: 'Fresh cod, whale, and traditional seafood in authentic fishing village setting. Experience traditional Lofoten cuisine in historic rorbu cabins.',
      },
      {
        name: 'Pier kiosks',
        type: 'Cafe',
        description: 'Coffee, waffles, and light refreshments at tender area. Convenient stop for quick snacks and hot drinks after tender ride.',
      },
      {
        name: 'Leknes bakeries',
        type: 'Bakery',
        description: 'Traditional skillingsboller and Norwegian pastries. Authentic local bakery experience accessible via town shuttle.',
      },
      {
        name: 'Stockfish Museum cafe',
        type: 'Cafe',
        description: 'Cod liver pâté and traditional Norwegian dishes at cultural site. Unique dining experience combining food and local heritage.',
      },
    ],
    
    insiderTips: [
      'Book Ballstad shuttle first as it fills fast during peak season',
      'Waterproof layers essential; Arctic wind chill can be significant',
      'Mornings offer quieter experience before coach tour crowds arrive',
      'Shuttles for villages; taxis for beaches; bikes for flat areas',
      'Cards accepted everywhere; keep 100 NOK for kiosks; no tipping expected',
      'Sturdy shoes essential for trails; mosquito nets useful in summer',
      'Skip tourist souvenirs; local wool products offer authentic keepsakes',
      'Check Yr.no for weather radar; Lofoten Pass offers attraction discounts',
    ],
    
    weather: {
      intro: 'Lofoten has a subarctic climate with cool summers and cold winters. Summer brings midnight sun while winter offers Northern Lights opportunities. Weather can change quickly; layered clothing essential.',
      months: [
        { month: 'Jan', highC: 2, lowC: -2, rainMm: 120, sunDays: 5, seaTempC: 4 },
        { month: 'Feb', highC: 2, lowC: -2, rainMm: 100, sunDays: 7, seaTempC: 4 },
        { month: 'Mar', highC: 3, lowC: -2, rainMm: 90, sunDays: 10, seaTempC: 5 },
        { month: 'Apr', highC: 6, lowC: 0, rainMm: 70, sunDays: 13, seaTempC: 8 },
        { month: 'May', highC: 10, lowC: 4, rainMm: 60, sunDays: 17, seaTempC: 12 },
        { month: 'Jun', highC: 14, lowC: 8, rainMm: 50, sunDays: 20, seaTempC: 15 },
        { month: 'Jul', highC: 16, lowC: 10, rainMm: 60, sunDays: 21, seaTempC: 17 },
        { month: 'Aug', highC: 15, lowC: 9, rainMm: 80, sunDays: 19, seaTempC: 16 },
        { month: 'Sep', highC: 11, lowC: 6, rainMm: 110, sunDays: 15, seaTempC: 13 },
        { month: 'Oct', highC: 7, lowC: 2, rainMm: 130, sunDays: 11, seaTempC: 9 },
        { month: 'Nov', highC: 3, lowC: -1, rainMm: 110, sunDays: 6, seaTempC: 6 },
        { month: 'Dec', highC: 1, lowC: -3, rainMm: 120, sunDays: 4, seaTempC: 4 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun, warmest weather, and best visibility',
        hottest: 'July (peak season with busy shuttles, but warmest temperatures and longest days)',
        quietest: 'June and September (clearer peaks, fewer tourists, but cooler temperatures)',
        recommendation: 'June or July offer the best balance of weather and midnight sun experience for first-time visitors seeking the classic Lofoten experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Lofoten walkable from the cruise port?',
        answer: 'Limited walkability. The tender pier has viewpoints accessible on foot, but shuttles and taxis are essential for reaching villages, beaches, and main attractions.',
      },
      {
        question: 'How long do you need in Lofoten?',
        answer: 'Allow 8 to 10 hours for a full experience including tender, Ballstad shuttle (morning), beach visit, and museum (afternoon). Standard cruise day covers village and beach highlights.',
      },
      {
        question: 'Is English widely spoken in Lofoten?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Lofoten safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Lofoten is a welcoming, well-policed destination with excellent safety standards.',
      },
      {
        question: 'Is Lofoten expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Lofoten or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration with shuttles works perfectly for Ballstad village and beaches. Ship excursions are convenient for coordinated longer excursions and guaranteed transport.',
      },
      {
        question: 'What is the best thing to do in Lofoten on a cruise day?',
        answer: 'Visit Ballstad fishing village for authentic rorbu experience, explore Uttakleiv Beach for Arctic beauty, and visit Stockfish Museum to learn about local heritage.',
      },
      {
        question: 'Can you see Northern Lights in Lofoten?',
        answer: 'Yes, Northern Lights are visible in winter months (October to March) when skies are clear. Summer offers midnight sun instead of aurora opportunities.',
      },
      {
        question: 'Is Lofoten family-friendly?',
        answer: 'Yes, beaches and easy walks are suitable for families. Ballstad village offers safe exploration, and Stockfish Museum is educational for children.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for midnight sun and warmest weather',
      cruiseTerminals: ['Leknes-Gravdal shared pier (tender)'],
      nearbyAirport: 'Leknes Airport (LKN), 10km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Lofoten Islands Cruise Port Guide | Arctic Beaches & Fishing Villages',
      description: 'Complete Lofoten Islands cruise port guide. Visit Ballstad fishing village, explore Uttakleiv Beach, discover rorbu cabins, and find insider tips for your Norwegian fjords cruise.',
      keywords: ['Lofoten Islands cruise port', 'Leknes Gravdal', 'Lofoten shore excursions', 'Lofoten things to do', 'Lofoten from cruise ship', 'Norwegian fjords cruise', 'Arctic cruise', 'Ballstad fishing village'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-02',
  },

  {
    id: 'honningsvag',
    slug: 'honningsvag',
    name: 'Honningsvåg',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 70.9833, lon: 25.9833 },
    tagline: 'North Cape Arctic frontier',
    description: 'Honningsvåg\'s deep-water pier welcomes ships into this northernmost town (2,500 residents) above the Arctic Circle, positioning passengers for 40-minute buses to North Cape\'s dramatic 307m cliffs, globe monument, and midnight sun views. Colourful houses and fishing harbour frame excursions to reindeer herds and bird cliffs.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Central pier accommodates up to 4 ships with tourist office, North Cape Museum, WiFi, taxis adjacent; 5-minute walk to main street. Handles Hurtigruten and mega-ships; buses to North Cape depart pier.',
      terminals: 'Central pier with tourist office, North Cape Museum, WiFi, and taxi rank. Accommodates up to 4 ships simultaneously.',
      shuttleServices: 'Buses to North Cape depart from pier (50 euros return, 40 minutes each way). Tourist buses available for Gjesværstappan bird cliffs and other attractions.',
      walkability: '5-minute flat walk to shops and church. Town centre is compact and easily accessible on foot from the pier.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: '5-minute flat walk to shops and church. Buses to North Cape depart from pier. Taxis and car rental available at pier.',
      publicTransport: 'Tourist buses to North Cape and Gjesværstappan bird cliffs. No regular public transport; buses operate for cruise passengers.',
      taxis: 'Taxis available at pier. Expect around 100 euros return for North Cape. Agree fares in advance for longer journeys.',
      walkingDistance: 'Town centre 5 minutes, Honningsvåg Church 5 minutes from pier. North Cape 35km requires bus transport.',
      sightseeingBus: 'Tourist buses operate to North Cape (50 euros return, 40 minutes each way) and Gjesværstappan bird cliffs (60 euros). Buses depart from pier area.',
      accessibility: 'Pier and town centre are fairly flat and accessible. North Cape buses have good access. Museum and attractions have disabled facilities.',
    },
    
    transportConnections: {
      airport: {
        name: 'Lakselv Airport (LKL)',
        distance: '90km, 1.5 hours by road',
        options: 'Taxi or car rental available for 1.5-hour journey. No direct public transport connection from airport to port.',
      },
      trains: {
        mainStation: 'None',
        description: 'No trains. Hurtigruten coastal ferries provide connections along the Norwegian coast.',
        localHubs: 'Hurtigruten ferry connections available for coastal travel.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'North Cape Plateau',
        category: 'landmark',
        description: '307m cliff with globe monument, visitor centre, midnight sun chapel. Europe\'s northernmost mainland point offering dramatic views over the Arctic Ocean with iconic globe monument marking the continent\'s edge.',
        duration: '3 to 4 hours roundtrip for a relaxed pace',
        tips: [
          'Bus costs 50 euros return; book at pier first as it fills instantly',
          'North Cape certificate costs around 10 euros; popular souvenir',
          'Summer sun operates 24/7, winter offers aurora viewing opportunities',
        ],
        highlights: ['Views', 'Nature', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'North Cape Museum',
        category: 'historic',
        description: 'Arctic exploration, Sami history, Nordkapp Hall exhibits pier-side. Comprehensive museum showcasing Honningsvåg\'s role as gateway to the Arctic, featuring exhibits on polar exploration and local Sami culture.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Free entry with North Cape bus ticket; check with operator',
          'English audio guides available for exhibits',
          'Postcards from top of world available in gift shop',
        ],
        highlights: ['Museums', 'History', 'Culture'],
        goodFor: ['History buffs', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'Gjesværstappan Bird Cliffs',
        category: 'nature',
        description: 'Puffins, gannets on sea stacks accessible by RIB or bus. Dramatic bird cliffs with hundreds of thousands of nesting seabirds including puffins and gannets on towering sea stacks.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'Tours cost around 60 euros; book at tourist office',
          'Binoculars essential for bird watching; provided on some tours',
          'Summer nesting season offers best viewing opportunities',
        ],
        highlights: ['Wildlife', 'Photography', 'Nature'],
        goodFor: ['Nature lovers', 'Photographers', 'Wildlife enthusiasts'],
      },
      {
        title: 'King Crab Safari',
        category: 'active',
        description: 'Trap and pot-haul, tasting on RIB boat. Hands-on experience catching and tasting fresh king crab from Arctic waters, followed by traditional meal on board.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'Warm suits provided; dress in layers as Arctic winds can be cold',
          'Fresh feast included with catch; authentic Norwegian seafood experience',
          'Operators follow ethical quotas for sustainable fishing',
        ],
        highlights: ['Food', 'Wildlife', 'Adventure'],
        goodFor: ['Foodies', 'Adventure seekers', 'Active travelers'],
      },
      {
        title: 'Honningsvåg Church',
        category: 'historic',
        description: 'Colourful wooden Arctic cathedral with WWII history. Striking wooden church known as the Arctic Cathedral, featuring traditional Norwegian architecture and connections to World War II history.',
        duration: '30 minutes for a relaxed pace',
        tips: [
          'Free entry; donations welcome',
          '10-minute walk from pier; easily accessible',
          'Midnight sun services available in summer months',
        ],
        highlights: ['Architecture', 'History', 'Religious'],
        goodFor: ['First-time visitors', 'History buffs', 'Architecture lovers'],
      },
      {
        title: 'Sami Reindeer Experience',
        category: 'excursion',
        description: 'Herding, joik songs, Arctic meal in authentic lavvu tents via bus tour. Immersive cultural experience with local Sami community, including traditional reindeer herding, joik singing, and Arctic cuisine.',
        duration: '3 hours for a relaxed pace',
        tips: [
          'Tours cost around 70 euros; book in advance during peak season',
          'Authentic lavvu tents provide traditional Sami atmosphere',
          'Excellent photo opportunities with reindeer herds and traditional clothing',
        ],
        highlights: ['Culture', 'Wildlife', 'Food'],
        goodFor: ['Culture seekers', 'First-time visitors', 'Families'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Pier seafood kiosks',
        type: 'Cafe',
        description: 'Fresh crab salads and seafood snacks at tourist office area. Convenient pier-side dining with local Arctic specialities.',
      },
      {
        name: 'North Cape Hall',
        type: 'Restaurant',
        description: 'Traditional reindeer stew with cliff-top views over Arctic Ocean. Atmospheric dining at Europe\'s northernmost point.',
      },
      {
        name: 'Main street cafes',
        type: 'Cafe',
        description: 'Authentic Norwegian waffles, coffee, and light meals amid colourful houses. Cosy local cafes offering traditional Norwegian hospitality.',
      },
      {
        name: 'Ice Bar',
        type: 'Bar',
        description: 'Frozen drinks served in unique Arctic setting with souvenir glasses. Unique experience with drinks served in ice-carved surroundings.',
      },
    ],
    
    insiderTips: [
      'Book North Cape buses at pier first as they fill instantly during cruise season',
      'Thermals essential; Arctic wind chill can make temperatures feel 10 degrees colder',
      'Mornings before coach tours arrive offer quieter experience; summer sun never sets',
      'Walk town centre; buses for North Cape and cliffs; RIBs for crab safaris and bird watching',
      'Cards accepted everywhere; keep 100 NOK for kiosks; no tipping expected in Norway',
      'Sturdy shoes essential for trails; mosquito nets useful in summer months',
      'Skip chain restaurants; local crab from safaris offers authentic Norwegian experience',
      'Aurora apps useful in winter; North Cape certificate makes popular souvenir',
    ],
    
    weather: {
      intro: 'Honningsvåg has a subarctic climate above the Arctic Circle with cool summers and cold winters. Summer brings midnight sun from May to July, while winter offers Northern Lights opportunities. Weather can change rapidly; layered clothing essential.',
      months: [
        { month: 'Jan', highC: -2, lowC: -8, rainMm: 100, sunDays: 3, seaTempC: 1 },
        { month: 'Feb', highC: -2, lowC: -8, rainMm: 90, sunDays: 5, seaTempC: 2 },
        { month: 'Mar', highC: 0, lowC: -6, rainMm: 80, sunDays: 8, seaTempC: 4 },
        { month: 'Apr', highC: 3, lowC: -3, rainMm: 60, sunDays: 11, seaTempC: 7 },
        { month: 'May', highC: 8, lowC: 2, rainMm: 50, sunDays: 15, seaTempC: 11 },
        { month: 'Jun', highC: 12, lowC: 6, rainMm: 50, sunDays: 18, seaTempC: 14 },
        { month: 'Jul', highC: 14, lowC: 9, rainMm: 60, sunDays: 19, seaTempC: 16 },
        { month: 'Aug', highC: 13, lowC: 8, rainMm: 80, sunDays: 17, seaTempC: 15 },
        { month: 'Sep', highC: 9, lowC: 4, rainMm: 100, sunDays: 13, seaTempC: 12 },
        { month: 'Oct', highC: 4, lowC: -1, rainMm: 110, sunDays: 9, seaTempC: 7 },
        { month: 'Nov', highC: 0, lowC: -5, rainMm: 100, sunDays: 5, seaTempC: 3 },
        { month: 'Dec', highC: -2, lowC: -7, rainMm: 100, sunDays: 3, seaTempC: 1 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun and warmest weather, or October to March for Northern Lights opportunities',
        hottest: 'July (peak summer with busy buses, but warmest temperatures and 24-hour daylight)',
        quietest: 'June and September (clearer skies, fewer tourists, but cooler temperatures than peak summer)',
        recommendation: 'June or July offer the best balance of weather and midnight sun experience for first-time visitors seeking the classic Arctic frontier experience.',
      },
    },
    
    faq: [
      {
        question: 'Is Honningsvåg walkable from the cruise port?',
        answer: 'Yes, the town centre is 5 minutes walk from the pier. Main street shops and Honningsvåg Church are easily accessible on foot. North Cape requires bus transport (35km).',
      },
      {
        question: 'How long do you need in Honningsvåg?',
        answer: 'Allow 4 to 6 hours for North Cape bus trip, or 8 to 10 hours to combine North Cape bus (morning), town and museum (afternoon). Standard cruise day covers North Cape and town highlights.',
      },
      {
        question: 'Is English widely spoken in Honningsvåg?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Honningsvåg safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Honningsvåg is a welcoming, well-policed destination with excellent safety standards.',
      },
      {
        question: 'Is Honningsvåg expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of around 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Honningsvåg or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration with buses works perfectly for North Cape trips. Buses depart from pier and can be booked on arrival. Ship excursions offer guaranteed transport during busy periods.',
      },
      {
        question: 'What is the best thing to do in Honningsvåg on a cruise day?',
        answer: 'Take the bus to North Cape Plateau for Europe\'s northernmost mainland point, visit North Cape Museum, explore the colourful town centre, and consider a king crab safari or bird cliffs tour.',
      },
      {
        question: 'What\'s the best way to see the fjords and Arctic scenery?',
        answer: 'North Cape bus offers dramatic cliff views over Arctic Ocean. King Crab Safari and Gjesværstappan bird cliffs tours provide RIB boat experiences with spectacular coastal scenery.',
      },
      {
        question: 'Can you see the midnight sun in Honningsvåg?',
        answer: 'Yes, midnight sun is visible from May to July when the sun never sets. Best viewing is from North Cape Plateau during these months.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Summer for midnight sun and warmest weather, or winter for Northern Lights opportunities',
      cruiseTerminals: ['Central pier'],
      nearbyAirport: 'Lakselv Airport (LKL), 90km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Honningsvåg Cruise Port Guide | North Cape, Arctic & Midnight Sun',
      description: 'Complete Honningsvåg cruise port guide. Visit North Cape Plateau, explore Arctic scenery, experience midnight sun, discover Sami culture, and find insider tips for your Norwegian fjords cruise.',
      keywords: ['Honningsvåg cruise port', 'North Cape cruise', 'Honningsvåg shore excursions', 'Honningsvåg things to do', 'Honningsvåg from cruise ship', 'Norwegian fjords cruise', 'Arctic cruise', 'North Cape Plateau'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-03',
  },

  {
    id: 'alesund',
    slug: 'alesund',
    name: 'Ålesund',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 62.4722, lon: 6.1552 },
    tagline: 'Art Nouveau fjord jewel',
    description: 'Ålesund\'s islands sparkle with ornate facades, Jugendstil museums, and Brosundet harbour where cruise passengers climb 418 steps to Fjellstua viewpoint or bus to Atlantic Sea-Park seals amid Sunnmøre archipelago drama.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Skansekaia terminal (Stornespiren/Prestebrygga) positions mega-ships 200 to 700m from centre with WiFi and tourist information; no shuttles needed. Hop-on bus Stop 1 outside terminal.',
      terminals: 'Skansekaia terminal at Stornespiren/Prestebrygga handles mega-ships with WiFi and tourist information facilities.',
      shuttleServices: 'No shuttles needed; terminal is within 5 to 10 minutes walk to city centre.',
      walkability: 'Flat 5 to 10 minute walk to Art Nouveau streets and harbour. City centre is compact and easily accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: '5 to 10 minute flat walk to Art Nouveau streets. Stairs or taxi to Aksla; buses to aquarium and museum available. Hop-on bus Stop 1 outside terminal.',
      publicTransport: 'Buses connect to Atlantic Sea-Park aquarium and Sunnmøre Open-Air Museum. Day pass costs around 30 euros. Hop-on hop-off bus available.',
      taxis: 'Taxis available at terminal. Expect higher costs than European cities; taxi to Aksla costs around 10 euros. Cards accepted everywhere.',
      walkingDistance: 'Jugendstilsenteret 300m, Kongens Gate pedestrian street 5 minutes, Brosundet harbour 5 minutes from terminal. City centre is compact and walkable.',
      sightseeingBus: 'Hop-on hop-off bus available with Stop 1 outside terminal. Covers all major sights including Atlantic Sea-Park.',
      accessibility: 'City centre is fairly accessible with flat paths. Mount Aksla stairs are challenging; taxi alternative available. Museums and aquarium have good access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Ålesund Airport (AES)',
        distance: '13km, 20 minutes by taxi',
        options: 'Taxi takes 20 minutes from airport to cruise port. No direct public transport; taxi recommended.',
      },
      trains: {
        mainStation: 'No trains',
        description: 'No train connections. Buses available to Bergen and Oslo.',
        localHubs: 'Bus connections available to Bergen and Oslo from Ålesund bus station.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Mount Aksla (Fjellstua Viewpoint)',
        category: 'nature',
        description: '360 degree panorama over islands and fjords from 160m summit. Iconic viewpoint accessible via 418 steps or taxi, offering breathtaking views of the Sunnmøre archipelago.',
        duration: '1 to 1.5 hours roundtrip for a relaxed pace',
        tips: [
          '418 steps or taxi to summit; cafe at top offers refreshments',
          'Clear mornings provide best visibility and lighting for photography',
          'Allow time for the climb; taxi alternative available for those with mobility concerns',
        ],
        highlights: ['Views', 'Photography', 'Nature'],
        goodFor: ['First-time visitors', 'Photographers', 'Active travelers'],
      },
      {
        title: 'Jugendstilsenteret (Art Nouveau Centre)',
        category: 'historic',
        description: 'Fire rebuild exhibits in Swan Pharmacy building; architecture focus on the 1904 reconstruction. Museum dedicated to Ålesund\'s unique Art Nouveau heritage.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          'Entry costs around 120 NOK; English audio guides available',
          'Located 300m walk from terminal; easy to combine with town centre stroll',
          'Exhibits explain the 1904 fire and subsequent Art Nouveau rebuilding',
        ],
        highlights: ['Museums', 'Architecture', 'History'],
        goodFor: ['History buffs', 'Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Kongens Gate & Town Centre',
        category: 'stroll',
        description: 'Pedestrian street with turrets, spires, and pastel facades. Charming Art Nouveau architecture throughout the compact town centre with harbour views.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Morning photos offer best light on colourful facades',
          'Brosundet harbour reflections create beautiful photo opportunities',
          'Explore side streets for hidden architectural details',
        ],
        highlights: ['Culture', 'Shopping', 'Architecture', 'Photography'],
        goodFor: ['First-time visitors', 'Photographers', 'Culture seekers'],
      },
      {
        title: 'Atlantic Sea-Park Aquarium',
        category: 'family',
        description: 'Seals, penguins, and underwater tunnel; Europe\'s largest saltwater aquarium. Family-friendly attraction showcasing Norwegian marine life with interactive exhibits.',
        duration: '2 to 3 hours for a relaxed pace',
        tips: [
          'Bus Stop 8 connects to aquarium; day pass covers transport',
          'Seal feeding at 2pm is popular; arrive early for good viewing spots',
          'Entry costs around 295 NOK; family tickets available',
        ],
        highlights: ['Wildlife', 'Family-friendly', 'Nature'],
        goodFor: ['Families', 'First-time visitors', 'Nature lovers'],
      },
      {
        title: 'Sunnmøre Open-Air Museum',
        category: 'historic',
        description: '55 relocated houses, Viking boats, and coastal life exhibits. Living museum showcasing traditional Norwegian architecture and maritime heritage.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Bus Stop 2 connects to museum; day pass covers transport',
          'Entry costs around 120 NOK; medieval boat shed is highlight',
          'Allow time to explore the relocated historic buildings',
        ],
        highlights: ['History', 'Culture', 'Museums'],
        goodFor: ['History buffs', 'Culture seekers', 'First-time visitors'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Brosundet Waterfront',
        type: 'Seafood',
        description: 'Klipfish, mussels with harbour views. Traditional Norwegian seafood restaurant overlooking the picturesque harbour.',
      },
      {
        name: 'Kongens Gate Cafes',
        type: 'Cafe',
        description: 'Waffles and coffee in Art Nouveau setting. Charming cafes along the pedestrian street offering traditional Norwegian pastries.',
      },
      {
        name: 'Fjellstua Summit',
        type: 'Restaurant',
        description: 'Fjord panoramas from viewpoint cafe. Restaurant at Mount Aksla summit offering refreshments with spectacular views.',
      },
      {
        name: 'Aquarium Cafe',
        type: 'Cafe',
        description: 'Seal-view lunches in Sea-Park interior. Cafe within Atlantic Sea-Park offering meals with views of marine life.',
      },
    ],
    
    insiderTips: [
      'Aksla stairs early morning; hop-on bus day pass covers all attractions',
      'Waterproof layers essential; fjord mist is common throughout the day',
      'Arrive 9 to 11am to beat pre-coach tour crowds',
      'Walk city centre; buses needed for outskirts attractions like aquarium and museum',
      'Cards accepted everywhere; keep 100 NOK cash for kiosks; no tipping expected',
      'Relaxed Nordic pace; allow time to appreciate Art Nouveau architecture',
      'Skip chain restaurants; local bakeries offer authentic Norwegian experience',
      'Check Yr.no weather radar; Ålesund Card offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Ålesund has a temperate maritime climate with mild summers and cool winters. Summer offers the best weather for fjord views and outdoor activities, with long daylight hours.',
      months: [
        { month: 'Jan', highC: 3, lowC: -1, rainMm: 150, sunDays: 7, seaTempC: 5 },
        { month: 'Feb', highC: 3, lowC: -1, rainMm: 120, sunDays: 9, seaTempC: 5 },
        { month: 'Mar', highC: 5, lowC: 1, rainMm: 110, sunDays: 12, seaTempC: 7 },
        { month: 'Apr', highC: 8, lowC: 3, rainMm: 90, sunDays: 14, seaTempC: 9 },
        { month: 'May', highC: 13, lowC: 7, rainMm: 80, sunDays: 17, seaTempC: 13 },
        { month: 'Jun', highC: 16, lowC: 10, rainMm: 90, sunDays: 18, seaTempC: 15 },
        { month: 'Jul', highC: 18, lowC: 12, rainMm: 100, sunDays: 19, seaTempC: 17 },
        { month: 'Aug', highC: 17, lowC: 11, rainMm: 120, sunDays: 18, seaTempC: 16 },
        { month: 'Sep', highC: 14, lowC: 8, rainMm: 140, sunDays: 15, seaTempC: 14 },
        { month: 'Oct', highC: 10, lowC: 5, rainMm: 160, sunDays: 12, seaTempC: 11 },
        { month: 'Nov', highC: 6, lowC: 2, rainMm: 140, sunDays: 8, seaTempC: 8 },
        { month: 'Dec', highC: 4, lowC: 0, rainMm: 150, sunDays: 7, seaTempC: 6 },
      ],
      bestTime: {
        overall: 'June to August for mild weather, longest days, and clearest fjord views',
        hottest: 'July (peak season with festivals and busiest period, but warmest temperatures and longest days)',
        quietest: 'June and September (clearer views, fewer tourists, but still excellent weather)',
        recommendation: 'June or August offer the best balance of weather and crowds for first-time visitors seeking Art Nouveau architecture and fjord panoramas.',
      },
    },
    
    faq: [
      {
        question: 'Is Ålesund walkable from the cruise port?',
        answer: 'Yes, city centre is 5 to 10 minutes flat walk from terminal. Art Nouveau streets, harbour, and Jugendstilsenteret are all easily accessible on foot.',
      },
      {
        question: 'How long do you need in Ålesund?',
        answer: 'Allow 6 to 8 hours to cover Aksla climb, town centre, and aquarium. A full day enables you to experience Mount Aksla viewpoint, Art Nouveau architecture, and Atlantic Sea-Park.',
      },
      {
        question: 'Is English widely spoken in Ålesund?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Ålesund safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Ålesund is a welcoming, well-maintained town with excellent safety standards.',
      },
      {
        question: 'Is Ålesund expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Ålesund or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration with walk and buses works perfectly. DIY booking is straightforward; hop-on bus day pass covers all attractions.',
      },
      {
        question: 'What is the best thing to do in Ålesund on a cruise day?',
        answer: 'Climb Mount Aksla stairs for spectacular fjord panoramas, then explore the Art Nouveau town centre and harbour. Atlantic Sea-Park aquarium offers excellent family option.',
      },
      {
        question: 'What\'s the best way to see the fjords and archipelago from Ålesund?',
        answer: 'Mount Aksla viewpoint offers 360 degree panoramas over the Sunnmøre archipelago. Clear mornings provide best visibility for fjord and island views.',
      },
      {
        question: 'Is Ålesund good for hiking and outdoor activities?',
        answer: 'Mount Aksla stairs offer accessible mountain walking with rewarding views. Atlantic Sea-Park provides family-friendly outdoor experience. Waterproof layers essential for fjord mist.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for mild weather and clearest fjord views',
      cruiseTerminals: ['Skansekaia terminal (Stornespiren/Prestebrygga)'],
      nearbyAirport: 'Ålesund Airport (AES), 13km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Ålesund Cruise Port Guide | Art Nouveau, Fjords & Mount Aksla',
      description: 'Complete Ålesund cruise port guide. Climb Mount Aksla for fjord views, explore Art Nouveau architecture, visit Atlantic Sea-Park, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Ålesund cruise port', 'Ålesund shore excursions', 'Ålesund things to do', 'Ålesund from cruise ship', 'Norwegian fjords cruise', 'Mount Aksla', 'Art Nouveau Ålesund'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-03',
  },

  // ============================================================================
  // HAMMERFEST
  // ============================================================================
  {
    id: 'hammerfest',
    slug: 'hammerfest',
    name: 'Hammerfest',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 70.6296, lon: 23.6820 },
    tagline: 'Northernmost town\'s Arctic heritage',
    description: 'Hammerfest blends polar bear history with LNG modernity where cruise piers enable immediate access to reconstruction museums, Salen Hill panoramas, and RIB safaris through ice-free fjords kept warm by the Gulf Stream.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Central pier and Fuglenes (1.6km) handle mega-ships year-round with WiFi and tourist information; 5-minute walk to Strandgata main street. Hurtigruten stops daily.',
      terminals: 'Central pier and Fuglenes terminal (1.6km) handle mega-ships year-round with WiFi and tourist information facilities.',
      shuttleServices: 'No shuttles needed; central pier is within 5 minutes walk to Strandgata main street.',
      walkability: 'Flat 5 to 10 minute walk to city centre. Church and museum are 10 minutes walk from port.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Flat 5 to 10 minute walk to Strandgata main street. Church and museum are 10 minutes walk from port. Buses available for North Cape and Sami camp tours.',
      publicTransport: 'Buses available to North Cape (1.5 hours) and Sami cultural camp. Day passes available for multiple journeys.',
      taxis: 'Taxis available at port. Expect around 20 euros to Salen Hill. Cards accepted everywhere.',
      walkingDistance: 'Meridian Column 20 minutes, Museum of Reconstruction 10 minutes, Hammerfest Church 10 minutes, Strandgata main street 5 minutes from port.',
      sightseeingBus: 'No hop-on hop-off bus; local buses connect to attractions outside town centre.',
      accessibility: 'City centre is fairly accessible with flat paths. Salen Hill requires moderate hiking ability. Museums have good access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Hammerfest Airport (HFT)',
        distance: '3km, 10 minutes by taxi',
        options: 'Taxi takes 10 minutes from airport to cruise port. No direct public transport; taxi recommended.',
      },
      trains: {
        mainStation: 'No trains',
        description: 'No train connections. Hurtigruten ferries provide coastal transport connections.',
        localHubs: 'Hurtigruten ferries stop daily at Hammerfest, providing connections along the Norwegian coast.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Meridian Column (Struve Geodetic Arc)',
        category: 'landmark',
        description: 'UNESCO marker from 19th-century Earth measurement survey to Black Sea. Historic geodetic point marking the northern end of the Struve Geodetic Arc, a scientific achievement spanning from Norway to the Black Sea.',
        duration: '45 minutes to 1 hour for a relaxed pace',
        tips: [
          '20-minute walk from port; information boards explain the scientific significance',
          'Arctic views from the column site offer excellent photography opportunities',
          'Combine with nearby attractions for a full morning exploration',
        ],
        highlights: ['History', 'Photography', 'Landmark'],
        goodFor: ['First-time visitors', 'History buffs', 'Photographers'],
      },
      {
        title: 'Museum of Reconstruction',
        category: 'historic',
        description: 'WWII scorched-earth rebuild story with tower views and period rooms. Museum documenting Hammerfest\'s complete destruction in 1944 and subsequent reconstruction, featuring exhibits on wartime history and post-war recovery.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Multilingual guides available; tower panorama offers views over town and fjords',
          'Central location makes it easy to combine with other attractions',
          'Entry costs around 100 NOK; allow time for the tower climb',
        ],
        highlights: ['Museums', 'History', 'Views'],
        goodFor: ['History buffs', 'First-time visitors', 'Culture seekers'],
      },
      {
        title: 'Royal and Ancient Polar Bear Society',
        category: 'historic',
        description: 'Arctic hunting artifacts, taxidermy, and souvenirs in oldest club. Historic society celebrating Hammerfest\'s Arctic heritage with polar bear exhibits, hunting memorabilia, and traditional Norwegian Arctic culture.',
        duration: '45 minutes for a relaxed pace',
        tips: [
          'Entry costs around 60 NOK; polar bear souvenirs available in gift shop',
          'Harbour views from the society building add to the experience',
          'Located near the port, making it an easy first stop',
        ],
        highlights: ['Culture', 'Wildlife', 'History'],
        goodFor: ['History buffs', 'Culture seekers', 'First-time visitors'],
      },
      {
        title: 'Salen Hill Viewpoint',
        category: 'nature',
        description: '360 degree panoramas over town and fjords from moderate hike. Scenic viewpoint accessible via taxi or moderate hiking trail, offering spectacular views of Hammerfest, surrounding fjords, and on clear days, the Lofoten Islands.',
        duration: '1.5 to 2 hours roundtrip for a relaxed pace',
        tips: [
          'Taxi costs around 20 euros to summit; clear days offer views of Lofoten Islands',
          'Moderate hiking trail available for those preferring to walk',
          'Sturdy shoes essential; weather can change quickly at elevation',
        ],
        highlights: ['Views', 'Hiking', 'Nature', 'Photography'],
        goodFor: ['Active travelers', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'Hammerfest Church',
        category: 'landmark',
        description: 'Modernist fan-shaped Arctic cathedral. Contemporary church architecture featuring distinctive fan-shaped design, stained glass windows, and modern Norwegian religious art in an Arctic setting.',
        duration: '30 minutes for a relaxed pace',
        tips: [
          'Free entry; stained glass windows are particularly impressive',
          '10-minute walk from port makes it easily accessible',
          'Quiet atmosphere offers peaceful break from sightseeing',
        ],
        highlights: ['Architecture', 'Religious', 'Culture'],
        goodFor: ['First-time visitors', 'Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Sami Cultural Camp (Mikkelgammen)',
        category: 'excursion',
        description: 'Reindeer herding, joik songs, and Arctic meal bus tour. Authentic Sami cultural experience featuring traditional reindeer herding demonstrations, joik singing, and Arctic cuisine tastings in a traditional Sami camp setting.',
        duration: '3 hours for a relaxed pace',
        tips: [
          'Bus tour required; costs around 70 euros with tastings included',
          'Advance booking recommended for cruise day visits',
          'Dress warmly; camp is located outside town in Arctic environment',
        ],
        highlights: ['Culture', 'Wildlife', 'Food'],
        goodFor: ['Culture seekers', 'First-time visitors', 'Families'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Strandgata Seafood',
        type: 'Restaurant',
        description: 'King crab and stockfish on main street. Traditional Norwegian seafood restaurant specialising in fresh Arctic king crab and traditional stockfish dishes.',
      },
      {
        name: 'Museum Cafe',
        type: 'Cafe',
        description: 'Reindeer stew near reconstruction exhibits. Cafe within Museum of Reconstruction offering traditional Norwegian dishes including reindeer stew and local specialities.',
      },
      {
        name: 'Polar Bear Society',
        type: 'Pub',
        description: 'Local aquavit in historic club. Traditional Norwegian pub within the Royal and Ancient Polar Bear Society building, serving local aquavit and Norwegian beers.',
      },
      {
        name: 'Harbor Kiosks',
        type: 'Market',
        description: 'Fish soup near pier area. Convenient kiosks near the cruise port offering traditional Norwegian fish soup and quick snacks for cruise passengers.',
      },
    ],
    
    insiderTips: [
      'Visit Meridian Column and Salen Hill in mornings before wind picks up',
      'Thermal layers essential; Gulf Stream keeps fjords ice-free but breezy conditions common',
      'Walk city centre attractions; buses needed for Sami camp and North Cape tours',
      'Cards accepted everywhere; keep 100 NOK cash for kiosks; no tipping expected',
      'Sturdy shoes essential for Salen Hill; mosquito repellent recommended in summer',
      'Skip chain restaurants; fresh king crab and authentic local venues offer better value',
      'Aurora viewing possible in winter; midnight sun in summer offers unique Arctic experience',
    ],
    
    weather: {
      intro: 'Hammerfest has a subarctic climate with cool summers and cold winters, moderated by the Gulf Stream which keeps the fjords ice-free year-round. Summer offers midnight sun while winter provides opportunities for northern lights viewing.',
      months: [
        { month: 'Jan', highC: -2, lowC: -7, rainMm: 100, sunDays: 3, seaTempC: 1 },
        { month: 'Feb', highC: -2, lowC: -7, rainMm: 90, sunDays: 5, seaTempC: 2 },
        { month: 'Mar', highC: 0, lowC: -5, rainMm: 80, sunDays: 8, seaTempC: 4 },
        { month: 'Apr', highC: 3, lowC: -3, rainMm: 60, sunDays: 11, seaTempC: 7 },
        { month: 'May', highC: 8, lowC: 2, rainMm: 50, sunDays: 15, seaTempC: 11 },
        { month: 'Jun', highC: 12, lowC: 6, rainMm: 50, sunDays: 18, seaTempC: 14 },
        { month: 'Jul', highC: 14, lowC: 9, rainMm: 60, sunDays: 19, seaTempC: 16 },
        { month: 'Aug', highC: 13, lowC: 8, rainMm: 80, sunDays: 17, seaTempC: 15 },
        { month: 'Sep', highC: 9, lowC: 4, rainMm: 100, sunDays: 13, seaTempC: 12 },
        { month: 'Oct', highC: 4, lowC: -1, rainMm: 110, sunDays: 9, seaTempC: 7 },
        { month: 'Nov', highC: 0, lowC: -5, rainMm: 100, sunDays: 5, seaTempC: 3 },
        { month: 'Dec', highC: -2, lowC: -7, rainMm: 100, sunDays: 3, seaTempC: 1 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun and mildest weather, or March to April for clearer skies and aurora viewing',
        hottest: 'July and August (peak summer with longest days and warmest temperatures, but busiest period with more tourists)',
        quietest: 'March to April and September to October (clearer skies for aurora, fewer tourists, but cooler temperatures)',
        recommendation: 'June or July offer the best balance of weather and daylight for first-time visitors seeking Arctic experiences and fjord views.',
      },
    },
    
    faq: [
      {
        question: 'Is Hammerfest walkable from the cruise port?',
        answer: 'Yes, city centre is 5 to 10 minutes walk from port. Meridian Column, Museum of Reconstruction, and Hammerfest Church are all easily accessible on foot.',
      },
      {
        question: 'How long do you need in Hammerfest?',
        answer: 'Allow 4 to 6 hours to cover museum, Salen Hill, and Meridian Column. A full day enables you to experience the Sami cultural camp and explore the Arctic heritage sites.',
      },
      {
        question: 'Is English widely spoken in Hammerfest?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Hammerfest safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Hammerfest is a welcoming, well-maintained town with excellent safety standards.',
      },
      {
        question: 'Is Hammerfest expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Hammerfest or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration works perfectly for city centre attractions. DIY booking is straightforward; buses available for Sami camp and North Cape tours.',
      },
      {
        question: 'What is the best thing to do in Hammerfest on a cruise day?',
        answer: 'Visit the Meridian Column UNESCO site and climb Salen Hill for spectacular fjord panoramas. Museum of Reconstruction offers fascinating WWII history, and the Polar Bear Society showcases Arctic heritage.',
      },
      {
        question: 'Can you see northern lights from Hammerfest?',
        answer: 'Yes, northern lights are visible in winter on clear nights. March to April and September to October offer best viewing conditions with clearer skies.',
      },
      {
        question: 'Is Hammerfest good for hiking?',
        answer: 'Salen Hill offers moderate hiking trails with rewarding fjord views. Sturdy shoes and weather-appropriate clothing essential. Trails are well-marked and suitable for most fitness levels.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for midnight sun and mildest weather',
      cruiseTerminals: ['Central pier', 'Fuglenes'],
      nearbyAirport: 'Hammerfest Airport (HFT), 3km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Hammerfest Cruise Port Guide | Arctic Heritage & Fjords',
      description: 'Complete Hammerfest cruise port guide. Visit the UNESCO Meridian Column, explore Arctic heritage at the Polar Bear Society, climb Salen Hill for fjord views, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Hammerfest cruise port', 'Hammerfest shore excursions', 'Hammerfest things to do', 'Hammerfest from cruise ship', 'Norwegian fjords cruise', 'Meridian Column', 'Arctic Circle cruise'],
    },
    
    status: 'published',
    lastUpdated: '2025-01-03',
  },

  {
    id: 'bodo',
    slug: 'bodo',
    name: 'Bodø',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 67.2804, lon: 14.4050 },
    tagline: 'Maelstrom above Arctic Circle',
    description: 'Bodø serves as Nordland\'s capital where cruise piers position ships steps from the harbourfront, offering quick buses to Saltstraumen\'s tidal whirlpools, aviation history exhibits, and coastal trails like Mjelle Beach under midnight sun or northern lights.',
    portCharacter: 'fjord-nature',
    
    aboutPort: {
      overview: 'Central harbour quay handles mega-ships with WiFi and tourist info; 10 to 15 minute walk to Storgata shops. No shuttles needed; buses to Saltstraumen from pier area.',
      terminals: 'Central harbour quay handles mega-ships with WiFi and tourist information facilities.',
      shuttleServices: 'No shuttles needed; harbour quay is within 10 to 15 minutes walk to city centre.',
      walkability: 'Flat 10 to 15 minute stroll to centre and cathedral. Harbour quay is easily accessible on foot.',
    },

    quickFacts: {
      currency: 'Norwegian Krone (NOK)',
      language: 'Norwegian, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Flat 10-minute stroll to centre and cathedral. Buses to maelstrom and aviation museum available from pier area.',
      publicTransport: 'Buses to Saltstraumen maelstrom (30 minutes) and aviation museum (20 minutes). Day passes available.',
      taxis: 'Taxis available at harbour. Expect higher costs than European cities. Cards accepted everywhere.',
      walkingDistance: 'Bodø Cathedral 10 minutes, city centre 10 to 15 minutes, Storgata shops 15 minutes from harbour quay. City centre is compact and walkable.',
      sightseeingBus: 'Local buses operate to Saltstraumen and Norwegian Aviation Museum. Tourist information provides timetables.',
      accessibility: 'City centre is fairly accessible with flat paths. Buses to attractions have good access. Cathedral and museums have wheelchair access.',
    },
    
    transportConnections: {
      airport: {
        name: 'Bodø Airport (BOO)',
        distance: '2km, 10 minutes by taxi',
        options: 'Taxi takes 10 minutes from airport to harbour. Short distance makes taxi the most convenient option.',
      },
      trains: {
        mainStation: 'None',
        description: 'No trains. Hurtigruten ferries connect to Lofoten and coastal destinations.',
        localHubs: 'Hurtigruten ferry provides connections to Lofoten Islands and other coastal ports.',
      },
    },
    
    mustSeeSights: [
      {
        title: 'Saltstraumen Maelstrom',
        category: 'nature',
        description: 'World\'s strongest tidal current with 400 cubic metres per second creating dramatic whirlpools. View from bridge or take RIB boat tours for closer experience of this natural phenomenon.',
        duration: '2 to 3 hours roundtrip for a relaxed pace',
        tips: [
          'Check high tide schedule for best viewing times when whirlpools are most dramatic',
          'Bus or taxi available from city; RIB boats offer closer experience',
          'Bridge viewing is free; arrive early for best photography positions',
        ],
        highlights: ['Nature', 'Photography', 'Views'],
        goodFor: ['First-time visitors', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'Norwegian Aviation Museum',
        category: 'historic',
        description: 'Cold War jets, flight simulators, and Arctic flying exhibits showcasing Norway\'s aviation history. Interactive displays and cockpit access provide engaging experience.',
        duration: '1.5 to 2 hours for a relaxed pace',
        tips: [
          'Bus number 1 takes 20 minutes from city centre',
          'Cockpit access available on several aircraft exhibits',
          'English displays throughout; audio guides available',
        ],
        highlights: ['Museums', 'History', 'Culture'],
        goodFor: ['History buffs', 'Families', 'First-time visitors'],
      },
      {
        title: 'Keiservarden Viewpoint',
        category: 'nature',
        description: '403 metre summit panorama over city and Lofoten horizon. Accessible via 20-minute uphill walk with emperor monument and clear day views across the Arctic landscape.',
        duration: '1 to 1.5 hours roundtrip for a relaxed pace',
        tips: [
          '20-minute uphill walk from city centre; sturdy shoes essential',
          'Emperor monument at summit provides historical interest',
          'Clear days offer best visibility across to Lofoten Islands',
        ],
        highlights: ['Views', 'Hiking', 'Nature', 'Photography'],
        goodFor: ['Active travelers', 'Photographers', 'Nature lovers'],
      },
      {
        title: 'Mjelle Beach',
        category: 'nature',
        description: 'Arctic white sands with dunes, surf, and WWII bunker ruins along coastal trail. Scenic coastal walk offering solitude and dramatic Arctic scenery.',
        duration: '2 to 3 hours roundtrip for a relaxed pace',
        tips: [
          'Bus or taxi required; not walkable from city centre',
          'Arctic flora and surf watching provide unique experiences',
          'WWII bunkers offer interesting photo opportunities',
        ],
        highlights: ['Nature', 'Photography', 'History', 'Views'],
        goodFor: ['Nature lovers', 'Photographers', 'Active travelers'],
      },
      {
        title: 'Bodø Cathedral',
        category: 'landmark',
        description: 'Modernist 1956 church with detached tower. Significant example of post-war Norwegian architecture located in city centre.',
        duration: '30 minutes for a relaxed pace',
        tips: [
          'Free entry; located in city centre near harbour',
          'Organ recitals occasionally available; check schedule',
          'Detached tower is architectural highlight',
        ],
        highlights: ['Architecture', 'History', 'Culture'],
        goodFor: ['First-time visitors', 'Architecture lovers', 'Culture seekers'],
      },
      {
        title: 'Kjerringøy Trading Post',
        category: 'excursion',
        description: '19th-century merchant village preserved with traditional jekts and historic buildings. Accessible by boat or bus, offering glimpse into Norway\'s trading heritage.',
        duration: '4 to 5 hours for a relaxed pace',
        tips: [
          'Silent cruise tours available including transport',
          'Preserved jekts (traditional boats) are highlight of the site',
          'Full day excursion; plan timing carefully for cruise day',
        ],
        highlights: ['History', 'Culture', 'Museums'],
        goodFor: ['History buffs', 'Culture seekers', 'First-time visitors'],
      },
      {
        title: 'City Centre and Harbourfront',
        category: 'stroll',
        description: 'Compact pedestrian streets around Storgata with shops, cafes, and harbour views. Easy walk from cruise terminal offering authentic Norwegian town atmosphere.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Storgata is the main shopping street with local shops and cafes',
          'Harbourfront offers views across to mountains and fjords',
          'Combine with cathedral visit for complete city centre experience',
        ],
        highlights: ['Shopping', 'Culture', 'Views'],
        goodFor: ['First-time visitors', 'Culture seekers', 'Solo travelers'],
      },
    ],
    
    nearestBeach: null,
    
    foodAndDrink: [
      {
        name: 'Harbour seafood',
        type: 'Restaurant',
        description: 'Stockfish and salmon specialities at waterfront location. Traditional Norwegian seafood with harbour views.',
      },
      {
        name: 'Storgata cafes',
        type: 'Cafe',
        description: 'Waffles and coffee in pedestrian street setting. Cosy cafes offering traditional Norwegian pastries and refreshments.',
      },
      {
        name: 'Glasshuset food court',
        type: 'Market',
        description: 'Local produce and Norwegian specialities in shopping arcade. Food hall experience with regional ingredients.',
      },
      {
        name: 'Museum cafe',
        type: 'Cafe',
        description: 'Aviation-themed cafe with views at Norwegian Aviation Museum. Refreshments available during museum visit.',
      },
    ],
    
    insiderTips: [
      'Saltstraumen high tide schedule essential for best viewing times; check tide tables in advance',
      'Waterproof layers essential; coastal wind can be strong and changeable',
      'Mornings before buses arrive offer quieter experience at attractions',
      'Walk city centre; buses needed for maelstrom and museum attractions',
      'Cards accepted everywhere; keep 100 NOK for kiosks; no tipping expected',
      'Sturdy shoes essential for coastal trails and viewpoint hikes',
      'Skip chain restaurants; harbour seafood offers authentic Norwegian experience',
      'Check Yr.no weather radar; Bodø Card offers discounts on attractions',
    ],
    
    weather: {
      intro: 'Bodø has a subarctic climate with cold winters and cool summers. Located above the Arctic Circle, it experiences midnight sun in summer and polar nights in winter.',
      months: [
        { month: 'Jan', highC: 0, lowC: -4, rainMm: 120, sunDays: 5, seaTempC: 2 },
        { month: 'Feb', highC: 0, lowC: -4, rainMm: 110, sunDays: 7, seaTempC: 3 },
        { month: 'Mar', highC: 2, lowC: -3, rainMm: 100, sunDays: 10, seaTempC: 5 },
        { month: 'Apr', highC: 6, lowC: 0, rainMm: 80, sunDays: 13, seaTempC: 8 },
        { month: 'May', highC: 11, lowC: 4, rainMm: 70, sunDays: 17, seaTempC: 12 },
        { month: 'Jun', highC: 15, lowC: 8, rainMm: 70, sunDays: 19, seaTempC: 14 },
        { month: 'Jul', highC: 17, lowC: 11, rainMm: 80, sunDays: 20, seaTempC: 16 },
        { month: 'Aug', highC: 16, lowC: 10, rainMm: 100, sunDays: 18, seaTempC: 15 },
        { month: 'Sep', highC: 12, lowC: 6, rainMm: 130, sunDays: 14, seaTempC: 13 },
        { month: 'Oct', highC: 7, lowC: 2, rainMm: 140, sunDays: 10, seaTempC: 9 },
        { month: 'Nov', highC: 3, lowC: -1, rainMm: 120, sunDays: 6, seaTempC: 6 },
        { month: 'Dec', highC: 0, lowC: -4, rainMm: 120, sunDays: 5, seaTempC: 2 },
      ],
      bestTime: {
        overall: 'June to August for midnight sun, warmest weather, and longest days',
        hottest: 'July (peak season with busy periods, but warmest temperatures and midnight sun)',
        quietest: 'June and September (clearer views, fewer tourists, but still excellent weather)',
        recommendation: 'June or August offer the best balance of weather and crowds for first-time visitors seeking Arctic experiences and natural phenomena.',
      },
    },
    
    faq: [
      {
        question: 'Is Bodø walkable from the cruise port?',
        answer: 'Yes, city centre is 10 to 15 minutes flat walk from harbour quay. Cathedral and Storgata shopping street are easily accessible on foot.',
      },
      {
        question: 'How long do you need in Bodø?',
        answer: 'Allow 6 to 8 hours to cover maelstrom, aviation museum, and city sights. A full day enables Saltstraumen visit, museum exploration, and coastal walks.',
      },
      {
        question: 'Is English widely spoken in Bodø?',
        answer: 'Yes, English is universally spoken. Norway has excellent English proficiency and all tourist facilities communicate in English.',
      },
      {
        question: 'Is Bodø safe for tourists?',
        answer: 'Extremely safe. Norway has very low crime rates and Bodø is a welcoming, well-maintained city with excellent safety standards.',
      },
      {
        question: 'Is Bodø expensive?',
        answer: 'Yes, very expensive. Expect lunch costs of 250 NOK or more. Norway is one of Europe\'s most expensive countries, though quality is high.',
      },
      {
        question: 'Do I need cash in Bodø or can I use card?',
        answer: 'Cards are accepted everywhere. Keep 100 NOK cash for kiosks. Contactless payment is universal throughout Norway.',
      },
      {
        question: 'Should I book a ship excursion or explore independently?',
        answer: 'Independent exploration with buses works perfectly. Buses to Saltstraumen and aviation museum are reliable and can be booked on arrival. Ship excursions offer guaranteed transport during busy periods.',
      },
      {
        question: 'What is the best thing to do in Bodø on a cruise day?',
        answer: 'Visit Saltstraumen maelstrom at high tide for the world\'s strongest tidal current, explore the Norwegian Aviation Museum, and climb Keiservarden viewpoint for panoramic views.',
      },
      {
        question: 'What\'s the best way to see the fjords and Arctic scenery?',
        answer: 'Keiservarden viewpoint offers panoramic views over city and Lofoten horizon. Coastal walks at Mjelle Beach provide dramatic Arctic scenery with dunes and surf.',
      },
      {
        question: 'Can you see the northern lights from Bodø?',
        answer: 'Yes, northern lights are visible in winter on clear nights. Bodø is located above the Arctic Circle, making it an excellent location for aurora viewing during darker months.',
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'June to August for midnight sun and warmest weather',
      cruiseTerminals: ['Central harbour quay'],
      nearbyAirport: 'Bodø Airport (BOO), 2km',
      visaInfo: 'None (Schengen 90/180 days for UK passport holders)',
    },
    
    relatedDestinations: ['norwegian-fjords-cruises', 'northern-europe-cruises'],
    
    meta: {
      title: 'Bodø Cruise Port Guide | Saltstraumen Maelstrom & Arctic Circle',
      description: 'Complete Bodø cruise port guide. Visit Saltstraumen maelstrom, explore the Norwegian Aviation Museum, climb Keiservarden viewpoint, and discover insider tips for your Norwegian fjords cruise.',
      keywords: ['Bodø cruise port', 'Saltstraumen maelstrom', 'Bodø shore excursions', 'Bodø things to do', 'Bodø from cruise ship', 'Norwegian fjords cruise', 'Arctic Circle cruise'],
    },
    
    status: 'published',
    lastUpdated: '2025-12-28',
  },

  // Fuerteventura - Added for port guide expansion
  {
    id: 'fuerteventura',
    slug: 'fuerteventura',
    name: 'Fuerteventura',
    displayName: 'Puerto del Rosario',
    country: 'Spain (Canary Islands)',
    region: 'atlantic-islands',
    coordinates: { lat: 28.5004, lon: -13.8627 },
    tagline: 'Endless golden dunes, turquoise Atlantic, and the Canaries\' most unspoilt island',
    description: 'Fuerteventura is the second largest of Spain\'s Canary Islands but feels remarkably undeveloped compared to its neighbours. Cruise ships dock at Puerto del Rosario, the small capital city on the east coast, where the port sits just a short walk from the town beach and pedestrianised centre. The island\'s appeal lies in its raw natural beauty, with vast golden sand dunes and constant trade winds.',
    portCharacter: 'beach-city',
    
    aboutPort: {
      overview: 'Fuerteventura is the second largest of Spain\'s Canary Islands but feels remarkably undeveloped. Just 100 miles off the African coast, the island receives constant trade winds making it a world-class destination for windsurfing and kiteboarding. Puerto del Rosario may lack the polish of purpose-built resorts, but it offers an authentic slice of Canarian life.',
      terminals: 'Muelle de Cruceros, Puerto del Rosario',
      shuttleServices: 'Limited - most passengers walk or use taxis',
      walkability: 'Town easily walkable (5-10 mins); island attractions require transport',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Fuerteventura Airport (FUE)',
        distance: '6km south of Puerto del Rosario',
        options: 'Taxi or bus from town centre.',
      },
      trains: {
        mainStation: 'N/A',
        description: 'No train network. Bus services connect towns.',
        localHubs: 'Puerto del Rosario bus station',
      },
    },
    
    gettingAround: {
      fromPort: '5 minutes walk to beach, 10 minutes to town centre',
      publicTransport: 'Bus 6 runs to Corralejo (40 mins, ~3.40 euros). Services can be infrequent.',
      taxis: 'Available at port. Approximately 35 euros each way to Corralejo.',
      walkingDistance: 'Playa Chica: 5 mins. Town centre: 10 mins. Island attractions require transport.',
      sightseeingBus: 'Limited. Focus on buses or taxis for island exploration.',
      accessibility: 'Town centre largely flat and accessible. Dunes have soft sand not suitable for wheelchairs.',
    },
    
    mustSeeSights: [
      {
        title: 'Corralejo Natural Park and Dunes',
        category: 'beach',
        description: 'Vast golden sand dunes stretching along the coast, backed by turquoise lagoons and views of Lobos Island. Recently named the best beach in the world by National Geographic, this protected natural park offers miles of pristine beaches, from developed areas near Corralejo town to remote stretches accessible only on foot.',
        duration: '4 to 6 hours for a relaxed pace including travel',
        tips: [
          'Bus 6 from Puerto del Rosario runs regularly to Corralejo via the dunes',
          'The Grandes Playas stop is best for beach access',
          'Bring everything you need - facilities are limited in the dunes themselves',
        ],
        highlights: ['Beaches', 'Nature', 'Photography', 'Scenic'],
        goodFor: ['Beach lovers', 'Photographers', 'Active travelers', 'Families'],
      },
      {
        title: 'Betancuria',
        category: 'historic',
        description: 'The island\'s original capital, founded in 1405 by Norman conqueror Jean de Béthencourt, is a beautifully preserved colonial village nestled in a volcanic valley. White-washed buildings, the Santa María church, local craft shops, and traditional restaurants serve authentic Canarian cuisine. The location was chosen to hide from pirate attacks.',
        duration: '2 to 3 hours including travel for a relaxed pace',
        tips: [
          'The mountain drive is scenic but winding',
          'Try goat\'s cheese (queso majorero) in local restaurants',
          'Visit the church with its impressive wooden ceiling',
        ],
        highlights: ['History', 'Culture', 'Architecture', 'Food'],
        goodFor: ['History buffs', 'Culture seekers', 'Foodies', 'Photographers'],
      },
      {
        title: 'Corralejo Town',
        category: 'stroll',
        description: 'The island\'s main tourist town in the north offers a lively harbour, excellent restaurants, craft markets, and a traditional old town with pedestrianised streets. Ferries depart for Lobos Island and Lanzarote. The beaches in and around town are excellent, and the atmosphere is relaxed and welcoming.',
        duration: '2 to 4 hours for a relaxed pace',
        tips: [
          'The old town has more character than the newer tourist areas',
          'Ferry trips to Lobos Island offer wildlife watching',
          'Market days bring extra atmosphere',
        ],
        highlights: ['Stroll', 'Shopping', 'Food', 'Beaches'],
        goodFor: ['First-time visitors', 'Families', 'Couples', 'Shoppers'],
      },
      {
        title: 'Caleta de Fuste',
        category: 'beach',
        description: 'Purpose-built resort area 10km south of Puerto del Rosario, featuring a calm horseshoe-shaped beach perfect for families, a marina, shopping, and water sports. The 18th-century Castillo de Caleta de Fuste tower stands guard over the bay. More developed than other areas but convenient for a beach day.',
        duration: '3 to 4 hours for a relaxed pace',
        tips: [
          'The beach is excellent for children with shallow, calm water',
          'The castle tower is worth a quick look',
          'Good restaurant selection along the marina',
        ],
        highlights: ['Beaches', 'Family-friendly', 'Shopping'],
        goodFor: ['Families', 'Beach lovers', 'Relaxation seekers'],
      },
      {
        title: 'Oasis Wildlife Fuerteventura',
        category: 'family',
        description: 'Large zoo and botanical garden near La Lajita in the south, home to exotic animals including giraffes, lions, elephants, and camels. The park includes bird shows, sea lion encounters, camel rides through a cactus garden, and a botanical collection. A full day experience for families.',
        duration: '4 to 5 hours including travel for a relaxed pace',
        tips: [
          'Animal shows run at set times - check the schedule on arrival',
          'The camel safari through the cactus garden is popular',
          'Consider a ship excursion as it\'s quite far south',
        ],
        highlights: ['Wildlife', 'Family-friendly', 'Gardens'],
        goodFor: ['Families', 'Animal lovers', 'Nature lovers'],
      },
      {
        title: 'Ajuy Caves',
        category: 'nature',
        description: 'Dramatic sea caves carved into the oldest rock formations in the Canary Islands, located on the rugged west coast. A trail from the small fishing village of Ajuy leads to the caves along striking black volcanic cliffs. The village itself has traditional fish restaurants overlooking a black sand beach.',
        duration: '3 to 4 hours including travel for a relaxed pace',
        tips: [
          'Wear sturdy footwear for the cave trail',
          'The caves are best visited at low tide',
          'Fresh fish at the village restaurants is excellent',
        ],
        highlights: ['Nature', 'Geology', 'Food', 'Photography'],
        goodFor: ['Active travelers', 'Nature lovers', 'Photographers'],
      },
      {
        title: 'El Cotillo',
        category: 'beach',
        description: 'Laid-back fishing village in the northwest known for its stunning lagoon beaches (perfect for families) and wilder surf beaches (popular with surfers). The village has excellent seafood restaurants, a ruined castle tower, and a relaxed bohemian atmosphere. Less touristy than Corralejo.',
        duration: '3 to 4 hours including travel for a relaxed pace',
        tips: [
          'The lagoon beaches are best for swimming and families',
          'The north beaches attract surfers and have stronger currents',
          'Sunset views from the castle tower are spectacular',
        ],
        highlights: ['Beaches', 'Food', 'Scenic', 'Nature'],
        goodFor: ['Beach lovers', 'Surfers', 'Foodies', 'Photographers'],
      },
      {
        title: 'Mirador Morro Velosa',
        category: 'nature',
        description: 'Spectacular viewpoint designed by renowned Canarian artist César Manrique, perched high in the central mountains above Betancuria. The modern building houses a small museum about the landscape, while the terrace offers 360-degree views across Fuerteventura\'s dramatic volcanic terrain.',
        duration: '2 to 3 hours including travel for a relaxed pace',
        tips: [
          'Combine with a visit to nearby Betancuria',
          'The cafe has stunning views',
          'Check opening times (closed Mondays)',
        ],
        highlights: ['Views', 'Architecture', 'Photography'],
        goodFor: ['Photographers', 'Architecture lovers', 'First-time visitors'],
      },
    ],
    
    shoreExcursions: [
      {
        title: 'Corralejo Dunes',
        description: 'World-class beaches with vast golden sand dunes',
        duration: 'Half day',
        bookWith: 'Independent (Bus 6) or ship excursion',
      },
      {
        title: 'Betancuria',
        description: 'Historic colonial village in volcanic valley',
        duration: 'Half day',
        bookWith: 'Ship excursion or taxi',
      },
      {
        title: 'Island Tour',
        description: 'Comprehensive tour of Fuerteventura highlights',
        duration: 'Full day',
        bookWith: 'Ship excursion recommended',
      },
    ],
    
    nearestBeach: {
      name: 'Playa Chica',
      distance: '5 minutes walk',
      description: 'Charming, sheltered urban beach with golden sand right in the heart of Puerto del Rosario. Calm, clear waters perfect for swimming. Views of your cruise ship from the beach. ~20°C year-round.',
    },
    
    foodAndDrink: [
      {
        name: 'Huga Restaurant',
        type: 'Restaurant',
        description: 'Modern gastrotapas with local ingredients on Primero de Mayo.',
      },
      {
        name: 'Casa Santa Maria',
        type: 'Restaurant',
        description: 'Traditional Canarian in historic setting in Betancuria.',
      },
      {
        name: 'El Caleton',
        type: 'Restaurant',
        description: 'Seafood overlooking the harbour in Corralejo.',
      },
      {
        name: 'Cafe terraces',
        type: 'Cafe',
        description: 'Multiple options on Primero de Mayo pedestrian street.',
      },
      {
        name: 'Beach cafes',
        type: 'Cafe',
        description: 'Casual waterfront coffee and snacks at Playa Chica.',
      },
    ],
    
    insiderTips: [
      'Puerto del Rosario is small and can be explored in an hour or two',
      'The real Fuerteventura experience is the Corralejo dunes in the north',
      'Bus 6 runs regularly from Puerto del Rosario bus station (20 minute walk from port) to Corralejo (40 minutes, around 3.40 euros)',
      'Get off at the Grandes Playas stop for the best dune beaches',
      'Share a taxi with other passengers for approximately 35 euros each way to Corralejo',
      'Many shops close for siesta (roughly 2pm to 5pm)',
      'Las Rotondas shopping centre stays open all day',
      'The island is large (100km long) - focus on the north if time is limited',
    ],
    
    weather: {
      intro: '20 to 28°C year-round with constant sunshine and trade winds. Bring sun protection and something windproof for beach days. The island is notably windier than other Canary Islands.',
      months: [
        { month: 'Jan', highC: 20, lowC: 14, rainMm: 20, sunDays: 6, seaTempC: 19 },
        { month: 'Feb', highC: 21, lowC: 14, rainMm: 15, sunDays: 6, seaTempC: 18 },
        { month: 'Mar', highC: 22, lowC: 15, rainMm: 10, sunDays: 7, seaTempC: 18 },
        { month: 'Apr', highC: 22, lowC: 16, rainMm: 5, sunDays: 8, seaTempC: 19 },
        { month: 'May', highC: 24, lowC: 17, rainMm: 2, sunDays: 9, seaTempC: 19 },
        { month: 'Jun', highC: 26, lowC: 19, rainMm: 0, sunDays: 10, seaTempC: 20 },
        { month: 'Jul', highC: 28, lowC: 21, rainMm: 0, sunDays: 10, seaTempC: 21 },
        { month: 'Aug', highC: 29, lowC: 22, rainMm: 0, sunDays: 10, seaTempC: 22 },
        { month: 'Sep', highC: 28, lowC: 21, rainMm: 5, sunDays: 9, seaTempC: 23 },
        { month: 'Oct', highC: 26, lowC: 19, rainMm: 10, sunDays: 8, seaTempC: 22 },
        { month: 'Nov', highC: 23, lowC: 17, rainMm: 15, sunDays: 6, seaTempC: 21 },
        { month: 'Dec', highC: 21, lowC: 15, rainMm: 20, sunDays: 6, seaTempC: 20 },
      ],
      bestTime: {
        overall: 'Year-round destination with consistent sunshine',
        hottest: 'May to October offers the driest weather',
        quietest: 'December to March is "winter" but still pleasant with temperatures around 20°C',
        recommendation: 'Year-round, May to October driest. Expect wind year-round.',
      },
    },
    
    faq: [
      {
        question: 'Is Puerto del Rosario walkable from the cruise port?', 
        answer: 'Yes, very walkable. The town beach (Playa Chica) is 5 minutes walk, and the town centre is 10 to 15 minutes. Everything is flat and straightforward.' 
      },
      { 
        question: 'How long do you need in Puerto del Rosario?', 
        answer: 'The town itself can be seen in 1 to 2 hours. For a proper Fuerteventura experience, plan to explore beyond the capital - the Corralejo dunes or Betancuria deserve half a day each.' 
      },
      { 
        question: 'Is English widely spoken in Puerto del Rosario?', 
        answer: 'Basic English is understood in tourist areas and restaurants, but less so than on more developed Canary Islands. Spanish or simple phrases are appreciated.' 
      },
      { 
        question: 'Is Puerto del Rosario safe for tourists?', 
        answer: 'Very safe. The town is quiet and crime is rare. Normal precautions apply on beaches with valuables.' 
      },
      { 
        question: 'Is Fuerteventura expensive?', 
        answer: 'Budget-friendly by European standards. The Canary Islands have reduced VAT making shopping attractive. Restaurants and transport are affordable.' 
      },
      { 
        question: 'Do I need cash in Puerto del Rosario or can I use card?', 
        answer: 'Card is widely accepted including contactless. Some small vendors and market stalls prefer cash. ATMs are available in town.' 
      },
      { 
        question: 'Should I book a ship excursion or explore independently?', 
        answer: 'For Corralejo or Caleta de Fuste, independent visits work well via bus or taxi. For longer trips to Betancuria, Oasis Park, or island tours, ship excursions offer convenience and guarantee return times.' 
      },
      { 
        question: 'What is the best thing to do in Fuerteventura on a cruise day?', 
        answer: 'Visit the Corralejo dunes - they\'re genuinely world-class beaches. Take bus 6 from Puerto del Rosario bus station (20 minute walk from port) directly to the dunes. The journey takes 40 minutes and the beaches are spectacular.' 
      },
      { 
        question: 'Is Fuerteventura good for swimming / Are the beaches nice?', 
        answer: 'Excellent swimming beaches. Playa Chica in Puerto del Rosario has calm, sheltered water. Caleta de Fuste has a family-friendly lagoon. Corralejo dunes offer miles of pristine sand. The west coast has stronger currents suitable for experienced swimmers.' 
      },
      { 
        question: 'Is Fuerteventura family-friendly?', 
        answer: 'Very family-friendly. Calm beaches at Puerto del Rosario and Caleta de Fuste are perfect for children. The Oasis Wildlife Park is excellent for families (requires transport). Children will enjoy spotting the friendly Barbary ground squirrels found across the island.' 
      },
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round, May to October driest',
      cruiseTerminals: ['Muelle de Cruceros, Puerto del Rosario'],
      nearbyAirport: 'Fuerteventura Airport (FUE) - 6km south',
      visaInfo: 'Fuerteventura is part of Spain and the Schengen Area',
      emergencyNumber: '112 for all emergencies',
      tippingCustom: 'Not mandatory, 5 to 10 percent appreciated for good service',
      siestaShopClosing: 'Many shops close 2pm to 5pm, Las Rotondas stays open',
    },
    
    relatedDestinations: ['canary-islands-cruises', 'atlantic-islands-cruises'],
    
    meta: {
      title: 'Fuerteventura Cruise Port Guide | Corralejo Dunes & Beaches',
      description: 'Complete guide to Fuerteventura cruise port in Puerto del Rosario. Visit world-class Corralejo dunes, explore Betancuria village, and discover pristine beaches on the Canaries\' most unspoilt island.',
      keywords: ['Fuerteventura cruise port', 'Puerto del Rosario', 'Corralejo dunes', 'Fuerteventura beaches', 'Canary Islands cruise', 'Fuerteventura shore excursions'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  // Lanzarote - Added for G606 cruise guide
  {
    id: 'lanzarote',
    slug: 'lanzarote',
    name: 'Lanzarote',
    displayName: 'Arrecife de Lanzarote',
    country: 'Spain (Canary Islands)',
    region: 'atlantic-islands',
    coordinates: { lat: 28.9630, lon: -13.5477 },
    tagline: 'Volcanic landscapes and César Manrique artistry',
    description: 'Arrecife is the capital of Lanzarote, a working port city with authentic Canarian character. The island is famous for its dramatic volcanic landscapes, black sand beaches, and the artistic legacy of César Manrique. Cruise ships dock at Muelle de los Mármoles or Muelle de Naos, about 15-20 minutes walk from the city centre.',
    
    aboutPort: {
      overview: 'Cruise ships dock at Muelle de los Mármoles (main cruise terminal) or Muelle de Naos, located about 15-20 minutes walk from Arrecife city centre. Shuttle buses are usually available from the terminal to the city centre (5 minute ride). The port area is industrial but the city centre is pleasant and walkable.',
      terminals: 'Muelle de los Mármoles (main cruise terminal) or Muelle de Naos',
      shuttle: 'Shuttle bus usually available from terminal to city centre (5 mins)',
      walkability: 'City centre is 15-20 minutes walk from port. Flat, paved route. Shuttle bus recommended for convenience.',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Lanzarote Airport (ACE)',
        distance: 'About 5 km from Arrecife (10-15 minutes by taxi)',
        options: 'Taxi from port area or city centre. Local buses also available.',
      },
      trains: {
        mainStation: 'N/A',
        description: 'No train network on Lanzarote. Buses cover the island.',
        localHubs: 'N/A',
      },
    },

    gettingAround: {
      fromPort: 'Walk 15-20 minutes to city centre, or take shuttle bus (5 mins).',
      publicTransport: 'Local buses connect Arrecife with other parts of the island. Bus station in city centre.',
      taxis: 'Available at port and in city centre. Fixed or metered fares.',
      walkingDistance: 'Castillo de San Gabriel: 10 minutes from port. City centre: 15-20 minutes. Playa del Reducto: 20 minutes.',
      sightseeingBus: 'Limited hop-on hop-off services. Most attractions require organised tours or car hire.',
    },
    
    mustSeeSights: [
      {
        title: 'Timanfaya National Park',
        category: 'excursion',
        description: 'Dramatic volcanic landscapes with Fire Mountains and geothermal demonstrations where heat from below grills food. Mars-like otherworldly scenery across protected volcanic fields.',
        duration: 'Half-day excursion',
        tips: [
          'Organized tour recommended',
          'Book in advance during high season',
          'Bring layers as it can be windy',
        ],
        highlights: ['Nature', 'Volcanic', 'Unique'],
        goodFor: ['Nature lovers', 'Photographers', 'Adventure seekers'],
      },
      {
        title: 'César Manrique Foundation',
        category: 'culture',
        description: 'Former home of artist César Manrique built into five volcanic bubbles. Stunning architecture merging art and nature with white walls, lava rock, and tropical gardens.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Taxi or organised tour from port',
          'Entry fee applies',
          'Photography allowed in most areas',
        ],
        highlights: ['Art', 'Architecture', 'Culture'],
        goodFor: ['Art lovers', 'Architecture enthusiasts', 'Culture seekers'],
      },
      {
        title: 'Jameos del Agua',
        category: 'attraction',
        description: 'Lava tube cave system transformed by César Manrique into a cultural centre. Underground saltwater lake with rare blind albino crabs, concert hall carved into rock, and swimming pool.',
        duration: '1 to 2 hours for a relaxed pace',
        tips: [
          'Organized tour or taxi required',
          'Entry fee applies',
          'Evening concerts available some nights',
        ],
        highlights: ['Nature', 'Art', 'Unique'],
        goodFor: ['Nature lovers', 'Art enthusiasts', 'Unique experiences'],
      },
      {
        title: 'Cueva de los Verdes',
        category: 'attraction',
        description: 'Natural volcanic lava tube formed 4,000 years ago extending 6 km underground. Guided tours reveal striking rock formations, hidden auditorium, and optical illusions in the tunnel system.',
        duration: '1 hour for a relaxed pace',
        tips: [
          'Book tickets online in advance',
          'Tours run 09:30 to 16:15 last entry',
          'Comfortable shoes essential for uneven surfaces',
        ],
        highlights: ['Nature', 'Geology', 'Unique'],
        goodFor: ['Nature lovers', 'Families', 'Geology enthusiasts'],
      },
      {
        title: 'Mirador del Río',
        category: 'landmark',
        description: 'Clifftop viewpoint designed by César Manrique perched 450 meters above sea level. Glass windows frame panoramic views of La Graciosa island and the Chinijo Archipelago. Includes cafe.',
        duration: '1 to 1.5 hours for a relaxed pace',
        tips: [
          'Clear days essential for views',
          'Organized tour or car hire needed',
          'Cafe perfect for relaxing with views',
        ],
        highlights: ['Views', 'Photography', 'Architecture'],
        goodFor: ['Photographers', 'Nature lovers', 'First-time visitors'],
      },
      {
        title: 'Castillo de San Gabriel',
        category: 'historic',
        description: '16th-century fortress on a small islet connected by causeway and Puente de las Bolas bridge. Houses Museum of History of Lanzarote with exhibits on island heritage.',
        duration: '1 hour for a relaxed pace',
        tips: [
          'Just 10 minutes walk from cruise port',
          'Entry fee applies to museum',
          'Good photo spot from causeways',
        ],
        highlights: ['History', 'Architecture', 'Museums'],
        goodFor: ['History buffs', 'Families', 'Culture seekers'],
      },
    ],
    
    familyFriendly: {
      mcdonalds: {
        name: 'McDonald\'s Open Mall Lanzarote',
        location: 'Calle León y Castillo, 156, Arrecife',
        walkingTime: '15 minutes from cruise port',
        notes: 'Large terrace with 95 seats. Third McDonald\'s on the island. Indoor play area available.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=McDonald%27s+Open+Mall+Arrecife+Lanzarote&travelmode=walking',
      },
      aleHop: {
        name: 'ALE-HOP Open Mall',
        location: 'Open Mall Lanzarote, premises 21A-22A, Arrecife',
        walkingTime: '15 minutes from cruise port',
        notes: 'Gift and novelty store with quirky toys and accessories. Hours 10:00-22:00 daily.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Ale+Hop+Open+Mall+Arrecife+Lanzarote&travelmode=walking',
      },
      localPark: {
        name: 'El Cable Children\'s Park',
        location: 'El Cable, Arrecife',
        walkingTime: '10 minutes from cruise port',
        facilities: 'Swings, climbing structures, sandy areas, green space',
        notes: 'Nice for younger kids. Safe and well-maintained.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Parque+El+Cable+Arrecife+Lanzarote&travelmode=walking',
      },
      themePark: {
        name: 'Rancho Texas Lanzarote Park',
        location: 'Puerto del Carmen (15 minutes by taxi)',
        type: 'Wildlife and water park',
        highlights: 'White tigers, sea lions, animal shows, Aqua Rancho water park with heated pools and slides',
        cost: 'Combined admission around €30-35 adults',
        hours: '9:30 AM to 5:30 PM daily',
        notes: 'Perfect half-day or full-day trip. Water park included in admission. Sustainable geothermal heating.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Rancho+Texas+Lanzarote&travelmode=walking',
      },
      waterPark: {
        name: 'Aqualava Waterpark',
        location: 'Playa Blanca (25 minutes by taxi)',
        highlights: 'Slides, wave pools, magma river, heated pools, areas for young children',
        notes: 'All-year operation. Good alternative to Rancho Texas if staying south.',
        mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Aqualava+Waterpark+Lanzarote&travelmode=walking',
      },
      beachOption: 'Playa del Reducto is the main beach, 20 minutes walk or 5 minutes taxi from port. Golden sand, calm water, lifeguards, facilities.',
    },
    
    thingsToDo: [
      'Walk around Arrecife old town',
      'Visit Castillo de San Gabriel',
      'Relax at Playa del Reducto beach',
      'Explore Charco de San Ginés lagoon',
      'Visit César Manrique sites',
      'Take a volcanic landscape tour',
    ],
    
    nearestBeach: {
      name: 'Playa del Reducto',
      description: 'Urban golden sand beach with calm water protected by reef formations and breakwaters. Blue Flag status. Backed by promenade with hotels, restaurants, and cafes. Main beach in Arrecife.',
      type: 'sand',
      waterEntry: 'shallow entry',
      shelter: 'partially sheltered',
      crowdLevel: 'moderate',
      facilities: {
        lifeguards: true,
        lifeguardsSeasonal: true,
        sunbeds: true,
        umbrellas: true,
        showers: true,
        toilets: true,
        restaurants: true,
        changingRooms: true,
      },
      access: {
        walkTime: '20 minutes from port',
        taxiTime: '5 minutes',
        busRoute: 'Not needed, walkable',
        notes: 'Flat promenade walk from cruise terminal. Arrecife Gran Hotel adjacent to beach.',
      },
      bestFor: ['swimming', 'families', 'relaxing'],
      tip: 'Some rocks at low tide. Check water quality advisories before swimming.',
    },
    
    gettingAroundTips: [
      'City centre is walkable from port (15-20 mins) or take shuttle',
      'Taxis available for attractions outside city',
      'Organized tours best for Timanfaya and César Manrique sites',
      'Car hire available but not essential for port day',
      'Local buses connect to other towns but infrequent',
    ],
    
    practicalInfo: {
      bestTimeToVisit: 'Year-round destination. March offers pleasant temperatures without summer crowds.',
      visaInfo: 'Part of Spain/EU. Same visa requirements as mainland Spain.',
      safetyTips: 'Very safe destination. Standard precautions apply.',
      localCustoms: 'Spanish customs apply. Siesta hours observed (2-5pm).',
    },
    
    meta: {
      title: 'Lanzarote Cruise Port Guide 2026 | Timanfaya Fire Mountains & César Manrique',
      description: '2026 Lanzarote cruise port guide. Mars-like volcanic landscapes at Timanfaya, César Manrique art caves, volcanic wine tasting, duty-free prices. Insider tips from real cruisers.',
      keywords: ['Lanzarote cruise port', 'Arrecife cruise port', 'Timanfaya National Park tour', 'César Manrique Foundation', 'Jameos del Agua', 'Lanzarote things to do', 'Canary Islands duty free', 'volcanic wine La Geria', 'Cueva de los Verdes', 'Mirador del Rio'],
    },
    
    status: 'published',
    lastUpdated: '2026-01-17',
  },

  // ============================================================================
  // ATLANTIC COAST - NORTHERN SPAIN & FRANCE (TEMPLATES)
  // ============================================================================
  
  // Gijon, Spain
  {
    id: 'gijon',
    slug: 'gijon',
    name: 'Gijón',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 43.5453, lon: -5.6618 },
    tagline: '[TO BE COMPLETED]',
    description: '[TO BE COMPLETED]',
    portCharacter: 'city-culture',
    
    aboutPort: {
      overview: '[TO BE COMPLETED]',
      terminals: '[TO BE COMPLETED]',
      shuttleServices: '[TO BE COMPLETED]',
      walkability: '[TO BE COMPLETED]',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish, Asturian',
      timezone: 'CET (GMT+1)',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Asturias Airport (OVD)',
        distance: '[TO BE COMPLETED]',
        options: '[TO BE COMPLETED]',
      },
      trains: {
        mainStation: '[TO BE COMPLETED]',
        description: '[TO BE COMPLETED]',
        localHubs: '[TO BE COMPLETED]',
      },
    },
    
    gettingAround: {
      fromPort: '[TO BE COMPLETED]',
      publicTransport: '[TO BE COMPLETED]',
      taxis: '[TO BE COMPLETED]',
      walkingDistance: '[TO BE COMPLETED]',
      sightseeingBus: '[TO BE COMPLETED]',
      accessibility: '[TO BE COMPLETED]',
    },
    
    mustSeeSights: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: '[TO BE COMPLETED]',
      description: '[TO BE COMPLETED]',
      distance: '[TO BE COMPLETED]',
    },
    
    foodAndDrink: [],
    insiderTips: [],
    
    meta: {
      title: 'Gijón Cruise Port Guide 2026',
      description: '[TO BE COMPLETED]',
      keywords: ['Gijón cruise port', 'Asturias cruise port'],
    },
    
    status: 'template',
    lastUpdated: '2026-01-21',
  },

  // Santander, Spain
  {
    id: 'santander',
    slug: 'santander',
    name: 'Santander',
    country: 'Spain',
    region: 'atlantic-coast',
    coordinates: { lat: 43.4623, lon: -3.8050 },
    tagline: '[TO BE COMPLETED]',
    description: '[TO BE COMPLETED]',
    portCharacter: 'city-culture',
    
    aboutPort: {
      overview: '[TO BE COMPLETED]',
      terminals: '[TO BE COMPLETED]',
      shuttleServices: '[TO BE COMPLETED]',
      walkability: '[TO BE COMPLETED]',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'CET (GMT+1)',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'Santander Airport (SDR)',
        distance: '[TO BE COMPLETED]',
        options: '[TO BE COMPLETED]',
      },
      trains: {
        mainStation: '[TO BE COMPLETED]',
        description: '[TO BE COMPLETED]',
        localHubs: '[TO BE COMPLETED]',
      },
    },
    
    gettingAround: {
      fromPort: '[TO BE COMPLETED]',
      publicTransport: '[TO BE COMPLETED]',
      taxis: '[TO BE COMPLETED]',
      walkingDistance: '[TO BE COMPLETED]',
      sightseeingBus: '[TO BE COMPLETED]',
      accessibility: '[TO BE COMPLETED]',
    },
    
    mustSeeSights: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: '[TO BE COMPLETED]',
      description: '[TO BE COMPLETED]',
      distance: '[TO BE COMPLETED]',
    },
    
    foodAndDrink: [],
    insiderTips: [],
    
    meta: {
      title: 'Santander Cruise Port Guide 2026',
      description: '[TO BE COMPLETED]',
      keywords: ['Santander cruise port', 'Cantabria cruise port'],
    },
    
    status: 'template',
    lastUpdated: '2026-01-21',
  },

  // La Rochelle, France
  {
    id: 'la-rochelle',
    slug: 'la-rochelle',
    name: 'La Rochelle',
    country: 'France',
    region: 'atlantic-coast',
    coordinates: { lat: 46.1591, lon: -1.1520 },
    tagline: '[TO BE COMPLETED]',
    description: '[TO BE COMPLETED]',
    portCharacter: 'historic',
    
    aboutPort: {
      overview: '[TO BE COMPLETED]',
      terminals: '[TO BE COMPLETED]',
      shuttleServices: '[TO BE COMPLETED]',
      walkability: '[TO BE COMPLETED]',
    },

    quickFacts: {
      currency: 'EUR (€)',
      language: 'French',
      timezone: 'CET (GMT+1)',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    transportConnections: {
      airport: {
        name: 'La Rochelle – Île de Ré Airport (LRH)',
        distance: '[TO BE COMPLETED]',
        options: '[TO BE COMPLETED]',
      },
      trains: {
        mainStation: '[TO BE COMPLETED]',
        description: '[TO BE COMPLETED]',
        localHubs: '[TO BE COMPLETED]',
      },
    },
    
    gettingAround: {
      fromPort: '[TO BE COMPLETED]',
      publicTransport: '[TO BE COMPLETED]',
      taxis: '[TO BE COMPLETED]',
      walkingDistance: '[TO BE COMPLETED]',
      sightseeingBus: '[TO BE COMPLETED]',
      accessibility: '[TO BE COMPLETED]',
    },
    
    mustSeeSights: [],
    shoreExcursions: [],
    
    nearestBeach: {
      name: '[TO BE COMPLETED]',
      description: '[TO BE COMPLETED]',
      distance: '[TO BE COMPLETED]',
    },
    
    foodAndDrink: [],
    insiderTips: [],
    
    meta: {
      title: 'La Rochelle Cruise Port Guide 2026',
      description: '[TO BE COMPLETED]',
      keywords: ['La Rochelle cruise port', 'France Atlantic coast cruise'],
    },
    
    status: 'template',
    lastUpdated: '2026-01-21',
  },

  // ============================================================================
  // ADDITIONAL UK PORTS
  // ============================================================================
  
  // Liverpool
  {
    id: 'liverpool',
    slug: 'liverpool',
    name: 'Liverpool',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 53.4084, lon: -2.9916 },
    tagline: 'Beatles heritage and maritime history on the Mersey',
    description: 'Liverpool is a vibrant cruise port on the River Mersey, famous worldwide as the birthplace of The Beatles. The city\'s UNESCO-listed waterfront features the iconic Three Graces buildings and the award-winning Museum of Liverpool. Cruise ships dock at the Liverpool Cruise Terminal on the Pier Head, putting passengers within walking distance of the city\'s major attractions, world-class museums, and thriving cultural quarter.',
    portCharacter: 'city',
    
    aboutPort: {
      overview: 'Liverpool Cruise Terminal is located on the historic Pier Head waterfront, directly opposite the famous Three Graces. The terminal opened in 2007 and offers excellent facilities including check-in areas, seating, and refreshments. The city centre, Albert Dock, and major museums are all within a 10-15 minute walk.',
      terminals: 'Single cruise terminal at Pier Head with modern facilities',
      walkability: 'Excellent - city centre, Albert Dock, and museums all within walking distance',
      shuttleServices: 'Generally not required due to central location',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call & Turnaround',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Walk directly from the terminal to Albert Dock, the Museum of Liverpool, and city centre attractions.',
      publicTransport: 'Merseyrail trains connect to suburbs and beyond. Good bus network throughout the city.',
      taxis: 'Readily available at the terminal and throughout the city.',
      walkingDistance: 'Albert Dock 5 mins, The Beatles Story 10 mins, Cavern Quarter 15 mins, Liverpool ONE shopping 10 mins.',
      sightseeingBus: 'City Explorer hop-on hop-off buses operate from near the waterfront.',
    },
    
    mustSeeSights: [
      {
        title: 'The Beatles Story',
        category: 'museum',
        description: 'Award-winning exhibition chronicling the lives and times of The Beatles, located in Albert Dock. Features authentic memorabilia, replica venues, and immersive experiences.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Albert Dock',
        category: 'landmark',
        description: 'Grade I listed dock complex housing museums, galleries, restaurants, and bars. Home to Tate Liverpool, Merseyside Maritime Museum, and The Beatles Story.',
        duration: '2 to 4 hours',
      },
      {
        title: 'Cavern Quarter',
        category: 'cultural',
        description: 'The legendary Mathew Street area where The Beatles played their early gigs. The Cavern Club still hosts live music daily.',
        duration: '1 to 2 hours',
      },
    ],
    
    insiderTips: [
      'The Cavern Club offers free lunchtime sessions - arrive early for the best spots.',
      'Liverpool ONE offers excellent shopping and dining in a pedestrianised setting.',
      'The free museums at Albert Dock (Museum of Liverpool, Maritime Museum, Tate Liverpool) are world-class.',
    ],
    
    meta: {
      title: 'Liverpool Cruise Port Guide 2026 | Beatles Heritage & Maritime History',
      description: 'Complete Liverpool cruise port guide. Beatles attractions, Albert Dock, world-class museums. Walking distance from ship to city centre.',
      keywords: ['Liverpool cruise port', 'Beatles Story', 'Albert Dock', 'Cavern Club'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Edinburgh (Leith)
  {
    id: 'edinburgh',
    slug: 'edinburgh',
    name: 'Edinburgh (Leith)',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 55.9533, lon: -3.1883 },
    tagline: 'Scotland\'s historic capital with castle views and Royal Mile charm',
    description: 'Edinburgh, Scotland\'s capital, is one of Europe\'s most beautiful cities, dominated by its medieval castle perched on volcanic rock. Cruise ships typically dock at Leith or anchor at the Firth of Forth with tender services. The city offers a perfect blend of ancient history, Georgian elegance, world-class festivals, and vibrant culture. The Royal Mile connects Edinburgh Castle to the Palace of Holyroodhouse in a walkable historic core.',
    portCharacter: 'city',
    
    aboutPort: {
      overview: 'Most cruise ships dock at Ocean Terminal in Leith, about 2.5 miles from the city centre. Larger ships may anchor in the Firth of Forth near South Queensferry with tender service. Ocean Terminal offers shopping and dining facilities.',
      terminals: 'Ocean Terminal, Leith - modern shopping centre with cruise facilities',
      walkability: 'Leith is walkable locally; city centre requires transport',
      shuttleServices: 'Many cruise lines offer shuttles to Princes Street or the Royal Mile',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: false,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Bus services run from Ocean Terminal to the city centre (20-30 minutes). Taxis are readily available.',
      publicTransport: 'Lothian Buses serve the city extensively. Tram connects airport to city centre.',
      taxis: 'Available at Ocean Terminal and throughout Edinburgh.',
      walkingDistance: 'Royal Yacht Britannia is at Ocean Terminal. City centre is 2.5 miles away.',
      sightseeingBus: 'Edinburgh Bus Tours operates hop-on hop-off services from the city centre.',
    },
    
    mustSeeSights: [
      {
        title: 'Edinburgh Castle',
        category: 'landmark',
        description: 'Iconic fortress dominating the city skyline. Houses the Scottish Crown Jewels, Stone of Destiny, and offers panoramic views across Edinburgh.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Royal Mile',
        category: 'historic',
        description: 'Historic thoroughfare running from Edinburgh Castle to the Palace of Holyroodhouse. Lined with historic buildings, shops, pubs, and closes to explore.',
        duration: '2 to 4 hours',
      },
      {
        title: 'Royal Yacht Britannia',
        category: 'museum',
        description: 'Former royal yacht now permanently berthed at Ocean Terminal. Tour the State Apartments, crew quarters, and Royal Deck Tea Room.',
        duration: '1.5 to 2 hours',
      },
    ],
    
    insiderTips: [
      'Royal Yacht Britannia is right at Ocean Terminal - perfect for the start or end of your visit.',
      'Book Edinburgh Castle tickets online to skip the queues.',
      'The free National Museum of Scotland on Chambers Street is excellent for rainy days.',
    ],
    
    meta: {
      title: 'Edinburgh Cruise Port Guide 2026 | Castle, Royal Mile & Scottish Heritage',
      description: 'Complete Edinburgh cruise port guide. Edinburgh Castle, Royal Mile, Royal Yacht Britannia. Transport from Leith to city centre.',
      keywords: ['Edinburgh cruise port', 'Leith cruise terminal', 'Edinburgh Castle', 'Royal Mile'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Belfast
  {
    id: 'belfast',
    slug: 'belfast',
    name: 'Belfast',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 54.5973, lon: -5.9301 },
    tagline: 'Titanic\'s birthplace reborn as a vibrant cultural capital',
    description: 'Belfast has transformed from its industrial shipbuilding past into a dynamic, welcoming city. The Titanic Quarter, where the famous liner was built, now houses the award-winning Titanic Belfast museum. The Victorian architecture, vibrant Cathedral Quarter, political murals, and warm hospitality make Belfast a fascinating destination. Most cruise ships dock within easy reach of the city centre and Titanic Quarter.',
    portCharacter: 'city',
    
    aboutPort: {
      overview: 'Belfast has two main cruise berths: the Titanic Quarter berth (adjacent to Titanic Belfast) and the city centre berth near the Big Fish sculpture. Both offer excellent access to attractions.',
      terminals: 'Multiple berths in Titanic Quarter and city centre',
      walkability: 'Good - city centre and Titanic Belfast both walkable from berths',
      shuttleServices: 'Usually not required from city centre berth; shuttles may operate from Titanic Quarter',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'City centre is walkable from most berths. Titanic Belfast is a 10-minute walk from the Titanic Quarter berth.',
      publicTransport: 'Metro buses serve the city. Glider rapid transit connects key areas.',
      taxis: 'Black cabs and regular taxis readily available.',
      walkingDistance: 'Titanic Belfast 10-15 mins from Titanic berth, City Hall 10-15 mins from city berth.',
      sightseeingBus: 'City Sightseeing Belfast operates hop-on hop-off tours.',
    },
    
    mustSeeSights: [
      {
        title: 'Titanic Belfast',
        category: 'museum',
        description: 'World\'s largest Titanic visitor experience, built on the actual slipways where the liner was constructed. Nine interactive galleries tell the complete Titanic story.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Political Murals Tour',
        category: 'cultural',
        description: 'Black cab tours of the Falls Road and Shankill Road murals provide insight into Belfast\'s complex history and the peace process.',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Cathedral Quarter',
        category: 'neighbourhood',
        description: 'Belfast\'s cultural heart with cobbled streets, street art, independent shops, and the best pubs and restaurants in the city.',
        duration: '2 to 3 hours',
      },
    ],
    
    insiderTips: [
      'Book Titanic Belfast tickets online in advance - it can get very busy on cruise ship days.',
      'The Crown Liquor Saloon is a Victorian pub gem - arrive before lunch for the best experience.',
      'St George\'s Market on Friday, Saturday, and Sunday is excellent for local food and crafts.',
    ],
    
    meta: {
      title: 'Belfast Cruise Port Guide 2026 | Titanic Quarter & Cultural Revival',
      description: 'Complete Belfast cruise port guide. Titanic Belfast, political murals, Cathedral Quarter. Walking distance from cruise berths.',
      keywords: ['Belfast cruise port', 'Titanic Belfast', 'Belfast murals', 'Cathedral Quarter'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Invergordon
  {
    id: 'invergordon',
    slug: 'invergordon',
    name: 'Invergordon',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 57.6879, lon: -4.1756 },
    tagline: 'Gateway to the Scottish Highlands and Loch Ness',
    description: 'Invergordon is a small town on the Cromarty Firth that serves as the gateway to the Scottish Highlands. While the town itself is modest, its location makes it the perfect base for excursions to Loch Ness, Inverness, and the dramatic Highland scenery. Cruise ships dock at a deep-water berth with easy access to the town centre and tour buses.',
    portCharacter: 'gateway',
    
    aboutPort: {
      overview: 'Invergordon offers a single deep-water cruise berth that can accommodate the largest ships. The town centre is a short walk from the pier, but most visitors take organised excursions to Highland attractions.',
      terminals: 'Single deep-water pier with basic facilities',
      walkability: 'Town centre walkable; attractions require transport',
      shuttleServices: 'Usually not required for town; organised tours for Highland attractions',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Town centre is a 5-10 minute walk. Loch Ness and Inverness require organised tours or car hire.',
      publicTransport: 'Limited local buses. Train station connects to Inverness.',
      taxis: 'Limited availability - pre-book for independent exploration.',
      walkingDistance: 'High Street murals, local shops, and cafes within 10 minutes.',
      sightseeingBus: 'No hop-on hop-off; organised shore excursions recommended.',
    },
    
    mustSeeSights: [
      {
        title: 'Loch Ness',
        category: 'nature',
        description: 'The legendary loch, home to the mythical monster Nessie. Visit Urquhart Castle ruins on the shore and take a boat cruise on the dark waters.',
        duration: 'Full day excursion',
      },
      {
        title: 'Inverness',
        category: 'city',
        description: 'The capital of the Highlands offers Victorian architecture, riverside walks, and excellent shopping. Inverness Castle provides panoramic views.',
        duration: 'Half day',
      },
      {
        title: 'Culloden Battlefield',
        category: 'historic',
        description: 'Site of the 1746 battle that ended the Jacobite rising. Excellent visitor centre tells the story of this pivotal moment in Scottish history.',
        duration: '2 to 3 hours',
      },
    ],
    
    insiderTips: [
      'Book Loch Ness excursions through the cruise line or reputable local operators well in advance.',
      'Invergordon\'s High Street murals depicting local history are worth a stroll before departure.',
      'The Highlands weather is changeable - bring layers and waterproofs regardless of forecast.',
    ],
    
    meta: {
      title: 'Invergordon Cruise Port Guide 2026 | Gateway to Loch Ness & Highlands',
      description: 'Complete Invergordon cruise port guide. Gateway to Loch Ness, Inverness, Culloden. Scottish Highlands excursions from your cruise.',
      keywords: ['Invergordon cruise port', 'Loch Ness cruise', 'Scottish Highlands cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Greenock
  {
    id: 'greenock',
    slug: 'greenock',
    name: 'Greenock',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 55.9496, lon: -4.7649 },
    tagline: 'Gateway to Glasgow and the dramatic Highlands',
    description: 'Greenock is a historic shipbuilding town on the Firth of Clyde that serves as the cruise port for Glasgow. The Ocean Terminal offers modern facilities, and the town itself has Victorian architecture and connections to inventor James Watt. Most passengers use Greenock as a base for excursions to Glasgow, Loch Lomond, or the Trossachs National Park.',
    portCharacter: 'gateway',
    
    aboutPort: {
      overview: 'Greenock Ocean Terminal is a purpose-built cruise facility with covered walkways, café, and gift shop. Glasgow city centre is approximately 25 miles east, reached by train or organised tour.',
      terminals: 'Greenock Ocean Terminal - modern purpose-built facility',
      walkability: 'Town centre walkable; Glasgow requires transport',
      shuttleServices: 'Some cruise lines offer shuttles to Glasgow; check with your ship',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Greenock town is walkable. Glasgow requires 45-minute train journey or organised tour.',
      publicTransport: 'Regular trains from Greenock Central to Glasgow Central (45 minutes).',
      taxis: 'Available at the terminal for local trips.',
      walkingDistance: 'McLean Museum 15 mins, town centre 10 mins, Greenock West station 10 mins.',
      sightseeingBus: 'No local hop-on hop-off; Glasgow has City Sightseeing buses.',
    },
    
    mustSeeSights: [
      {
        title: 'Glasgow',
        category: 'city',
        description: 'Scotland\'s largest city offers world-class museums (most free), Victorian and Art Nouveau architecture, and excellent shopping on Buchanan Street.',
        duration: 'Full day',
      },
      {
        title: 'Loch Lomond',
        category: 'nature',
        description: 'Britain\'s largest freshwater lake offers stunning scenery, boat trips, and the picturesque village of Luss.',
        duration: 'Half day',
      },
      {
        title: 'Stirling Castle',
        category: 'landmark',
        description: 'Magnificent Renaissance palace with connections to Mary Queen of Scots and Robert the Bruce. Spectacular views over the Forth Valley.',
        duration: '3 to 4 hours',
      },
    ],
    
    insiderTips: [
      'Glasgow\'s Kelvingrove Art Gallery and Museum is free and absolutely world-class.',
      'The train to Glasgow is scenic along the Clyde - sit on the left side heading east.',
      'If staying local, the Victorian Cemetery is an atmospheric walk with views over the Firth.',
    ],
    
    meta: {
      title: 'Greenock Cruise Port Guide 2026 | Gateway to Glasgow & Loch Lomond',
      description: 'Complete Greenock cruise port guide. Gateway to Glasgow, Loch Lomond, Stirling. Transport options from Ocean Terminal.',
      keywords: ['Greenock cruise port', 'Glasgow cruise', 'Loch Lomond cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Lerwick
  {
    id: 'lerwick',
    slug: 'lerwick',
    name: 'Lerwick',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 60.1539, lon: -1.1451 },
    tagline: 'Shetland\'s Viking heritage and dramatic island landscapes',
    description: 'Lerwick is the capital of the Shetland Islands, Britain\'s most northerly archipelago. These remote islands offer dramatic coastal scenery, abundant wildlife, and a unique culture blending Scottish and Norse heritage. The Up Helly Aa fire festival celebrates Viking ancestry, and the islands are renowned for Shetland ponies, knitwear, and exceptional seabird colonies.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Cruise ships dock at Holmsgarth or anchor in Bressay Sound with tender service to Victoria Pier. The compact town centre is easily walkable with shops, cafes, and the excellent Shetland Museum.',
      terminals: 'Holmsgarth terminal or Victoria Pier (tender)',
      walkability: 'Town centre very walkable; wider island requires transport',
      shuttleServices: 'Usually not required for town; organised tours for island attractions',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Town centre is a 10-15 minute walk from either dock. Island attractions require organised tours.',
      publicTransport: 'Limited bus services to other parts of Shetland.',
      taxis: 'Book in advance - limited availability.',
      walkingDistance: 'Shetland Museum 10 mins, Fort Charlotte 15 mins, Commercial Street 10 mins.',
      sightseeingBus: 'No hop-on hop-off; organised excursions recommended for island exploration.',
    },
    
    mustSeeSights: [
      {
        title: 'Shetland Museum',
        category: 'museum',
        description: 'Award-winning museum covering 5,000 years of Shetland history from Norse settlers to oil industry. Free admission, boat-building gallery, and cafe.',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Jarlshof',
        category: 'historic',
        description: 'Remarkable archaeological site spanning Bronze Age to Viking settlements. Stone houses and Norse longhouses on a dramatic coastal setting.',
        duration: '2 to 3 hours (excursion)',
      },
      {
        title: 'Sumburgh Head',
        category: 'nature',
        description: 'RSPB reserve with puffins, gannets, and other seabirds. The lighthouse offers tours, and the views are spectacular.',
        duration: '2 to 3 hours (excursion)',
      },
    ],
    
    insiderTips: [
      'Commercial Street has excellent knitwear shops - authentic Shetland wool products make special souvenirs.',
      'Puffins are best seen May to July at Sumburgh Head or Noss National Nature Reserve.',
      'The weather changes quickly - layers and waterproofs essential.',
    ],
    
    meta: {
      title: 'Lerwick Cruise Port Guide 2026 | Shetland Islands & Viking Heritage',
      description: 'Complete Lerwick cruise port guide. Shetland Museum, Jarlshof, puffins at Sumburgh Head. Viking heritage and island wildlife.',
      keywords: ['Lerwick cruise port', 'Shetland Islands cruise', 'Viking heritage'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Kirkwall
  {
    id: 'kirkwall',
    slug: 'kirkwall',
    name: 'Kirkwall',
    country: 'United Kingdom',
    region: 'uk',
    coordinates: { lat: 58.9809, lon: -2.9605 },
    tagline: 'Orkney\'s ancient capital with Neolithic world heritage',
    description: 'Kirkwall is the capital of Orkney, an archipelago off Scotland\'s north coast with an extraordinary concentration of Neolithic monuments. The Heart of Neolithic Orkney UNESCO World Heritage Site includes Skara Brae, the Ring of Brodgar, and other sites older than the Egyptian pyramids. The town itself features the magnificent St Magnus Cathedral and narrow medieval streets.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Cruise ships dock at Hatston Pier, about 1.5 miles from the town centre. Smaller ships may use the town pier. Organised excursions are the best way to see the Neolithic sites.',
      terminals: 'Hatston Pier (large ships) or Town Pier (smaller vessels)',
      walkability: 'Town centre walkable from Town Pier; Hatston requires shuttle',
      shuttleServices: 'Shuttles often provided from Hatston to town centre',
    },
    
    quickFacts: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Shuttle or taxi from Hatston; Neolithic sites require organised tours.',
      publicTransport: 'Limited bus services around the islands.',
      taxis: 'Available but limited - book in advance for independent exploration.',
      walkingDistance: 'From town: St Magnus Cathedral 5 mins, Orkney Museum 5 mins, shops and cafes throughout.',
      sightseeingBus: 'No hop-on hop-off; organised excursions essential for major sites.',
    },
    
    mustSeeSights: [
      {
        title: 'Skara Brae',
        category: 'historic',
        description: 'Europe\'s best-preserved Neolithic village, older than Stonehenge and the pyramids. Stone-built homes with furniture still visible after 5,000 years.',
        duration: '2 to 3 hours (excursion)',
      },
      {
        title: 'Ring of Brodgar',
        category: 'historic',
        description: 'Magnificent stone circle in a dramatic setting between two lochs. 27 of the original 60 stones remain standing.',
        duration: '1 to 2 hours (excursion)',
      },
      {
        title: 'St Magnus Cathedral',
        category: 'landmark',
        description: 'Magnificent red and yellow sandstone cathedral founded in 1137 by Vikings. Free entry, atmospheric interior with Viking-era history.',
        duration: '30 mins to 1 hour',
      },
    ],
    
    insiderTips: [
      'Book Neolithic site excursions early - they fill up quickly and independent transport is limited.',
      'The Highland Park Distillery offers tours and tastings in Kirkwall itself.',
      'St Magnus Cathedral is free and unmissable - allow time even if doing an excursion.',
    ],
    
    meta: {
      title: 'Kirkwall Cruise Port Guide 2026 | Orkney & Neolithic World Heritage',
      description: 'Complete Kirkwall cruise port guide. Skara Brae, Ring of Brodgar, St Magnus Cathedral. Orkney Neolithic UNESCO World Heritage.',
      keywords: ['Kirkwall cruise port', 'Orkney cruise', 'Skara Brae cruise', 'Ring of Brodgar'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // ============================================================================
  // ADDITIONAL MEDITERRANEAN PORTS
  // ============================================================================

  // Dubrovnik
  {
    id: 'dubrovnik',
    slug: 'dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    region: 'mediterranean',
    coordinates: { lat: 42.6507, lon: 18.0944 },
    tagline: 'Pearl of the Adriatic with Game of Thrones fame',
    description: 'Dubrovnik is one of the Mediterranean\'s most beautiful walled cities, its terracotta rooftops and marble streets gleaming against the deep blue Adriatic. The UNESCO-listed Old Town, encircled by medieval walls, was famously used as King\'s Landing in Game of Thrones. Cruise ships anchor in the harbour or dock at Gruž port, with the Old Town accessible by bus, taxi, or scenic walk.',
    portCharacter: 'historic',
    
    aboutPort: {
      overview: 'Large ships dock at Gruž port, about 3km from the Old Town. Smaller ships may anchor near the Old Town with tender service. The walk along the seafront from Gruž to Pile Gate is scenic but uphill returning.',
      terminals: 'Gruž port with modern facilities; anchorage for smaller vessels',
      walkability: 'Old Town very walkable but hilly; port to Old Town requires transport',
      shuttleServices: 'Shuttles often provided; public buses also available',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Croatian',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Bus 1A/1B from Gruž to Old Town (15 mins). Taxis available. Walking takes 30-40 mins.',
      publicTransport: 'Efficient local bus network. Cable car to Mount Srđ.',
      taxis: 'Available at port and Old Town. Agree fare before departure.',
      walkingDistance: 'Old Town compact and fully walkable. Walls walk 2km circumference.',
      sightseeingBus: 'Hop-on hop-off buses connect Gruž port to Old Town and beaches.',
    },
    
    mustSeeSights: [
      {
        title: 'City Walls Walk',
        category: 'landmark',
        description: 'Walk the complete 2km circuit of medieval walls for panoramic views over terracotta rooftops and the Adriatic. One of Europe\'s finest urban experiences.',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Stradun',
        category: 'historic',
        description: 'Dubrovnik\'s main limestone-paved street running through the Old Town. Lined with cafes, shops, and baroque architecture.',
        duration: '30 mins to 1 hour',
      },
      {
        title: 'Cable Car to Mount Srđ',
        category: 'viewpoint',
        description: 'Ride to 412m for spectacular panoramic views over the Old Town, islands, and coastline. War museum at the summit.',
        duration: '1 to 2 hours',
      },
    ],
    
    insiderTips: [
      'Walk the walls early morning or late afternoon to avoid crowds and heat.',
      'The beaches at Banje and Lapad are excellent for swimming after sightseeing.',
      'Game of Thrones filming locations are throughout - maps available at tourist offices.',
    ],
    
    meta: {
      title: 'Dubrovnik Cruise Port Guide 2026 | Pearl of the Adriatic',
      description: 'Complete Dubrovnik cruise port guide. City walls, Old Town, Game of Thrones locations. Transport from Gruž to Old Town.',
      keywords: ['Dubrovnik cruise port', 'Dubrovnik walls', 'Game of Thrones Dubrovnik'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Kotor
  {
    id: 'kotor',
    slug: 'kotor',
    name: 'Kotor',
    country: 'Montenegro',
    region: 'mediterranean',
    coordinates: { lat: 42.4247, lon: 18.7712 },
    tagline: 'Medieval fortress town in Europe\'s southernmost fjord',
    description: 'Kotor sits at the head of a dramatic bay often called Europe\'s southernmost fjord. The UNESCO-listed Old Town is a maze of medieval churches, palaces, and squares, backed by imposing fortifications climbing the mountainside. Ships navigate the winding Bay of Kotor to dock right beside the Old Town, making this one of the most scenic cruise arrivals in the Mediterranean.',
    portCharacter: 'historic',
    
    aboutPort: {
      overview: 'Cruise ships dock directly beside the Old Town walls - simply walk off the ship and through the Sea Gate. Larger ships may anchor in the bay with tender service.',
      terminals: 'Town quay beside Old Town; anchorage for large ships',
      walkability: 'Excellent - Old Town steps from the ship; fortress climb steep',
      shuttleServices: 'Not required for Old Town',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Montenegrin',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Walk directly into Old Town through the Sea Gate.',
      publicTransport: 'Buses to Perast and other bay towns.',
      taxis: 'Available for excursions around the bay.',
      walkingDistance: 'Old Town entirely walkable. Fortress climb 1,350 steps.',
      sightseeingBus: 'Bay of Kotor tours available.',
    },
    
    mustSeeSights: [
      {
        title: 'Fortress of St John',
        category: 'landmark',
        description: 'Climb 1,350 steps up the fortifications for breathtaking views over the bay and Old Town. Challenging but unforgettable.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Old Town',
        category: 'historic',
        description: 'Wander the car-free medieval streets, discovering hidden squares, Romanesque churches, and the magnificent Cathedral of Saint Tryphon.',
        duration: '1.5 to 2 hours',
      },
      {
        title: 'Perast',
        category: 'village',
        description: 'Baroque village across the bay with the famous Our Lady of the Rocks island church. Reached by taxi or organised tour.',
        duration: 'Half day excursion',
      },
    ],
    
    insiderTips: [
      'Start the fortress climb early to avoid the heat - take water and wear sturdy shoes.',
      'The cats of Kotor are famous - look for the Cat Museum in the Old Town.',
      'Perast is quieter than Kotor and offers boat trips to Our Lady of the Rocks.',
    ],
    
    meta: {
      title: 'Kotor Cruise Port Guide 2026 | Montenegro\'s Fjord Gem',
      description: 'Complete Kotor cruise port guide. Fortress climb, Old Town, Bay of Kotor. Ships dock beside medieval walls.',
      keywords: ['Kotor cruise port', 'Bay of Kotor cruise', 'Montenegro cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Split
  {
    id: 'split',
    slug: 'split',
    name: 'Split',
    country: 'Croatia',
    region: 'mediterranean',
    coordinates: { lat: 43.5081, lon: 16.4402 },
    tagline: 'Roman Emperor\'s palace transformed into a living city',
    description: 'Split\'s Old Town is unique in the world - an entire city centre built within and around the 4th-century palace of Roman Emperor Diocletian. This UNESCO World Heritage site is no museum but a living neighbourhood of apartments, shops, bars, and restaurants occupying ancient Roman halls. The waterfront Riva promenade buzzes with Mediterranean life.',
    portCharacter: 'historic',
    
    aboutPort: {
      overview: 'Cruise ships dock at the cruise terminal on the waterfront, a short walk from Diocletian\'s Palace. The Old Town and Riva promenade are immediately accessible.',
      terminals: 'City port waterfront terminal',
      walkability: 'Excellent - palace and Old Town steps from the ship',
      shuttleServices: 'Not required',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Croatian',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Walk directly to Diocletian\'s Palace (5 minutes from terminal).',
      publicTransport: 'Buses to beaches and Trogir.',
      taxis: 'Available at the port.',
      walkingDistance: 'Diocletian\'s Palace 5 mins, Riva promenade 5 mins, Marjan Hill 15 mins.',
      sightseeingBus: 'Hop-on hop-off available.',
    },
    
    mustSeeSights: [
      {
        title: 'Diocletian\'s Palace',
        category: 'historic',
        description: 'Explore the 4th-century Roman palace complex - now Split\'s Old Town. See the Peristyle, Cathedral (former mausoleum), and underground cellars.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Riva Promenade',
        category: 'neighbourhood',
        description: 'Split\'s lively waterfront lined with cafes and palm trees. Perfect for people-watching with views across to the islands.',
        duration: '30 mins to 1 hour',
      },
      {
        title: 'Marjan Hill',
        category: 'nature',
        description: 'Forested peninsula with walking trails, viewpoints, and beaches. Escape the crowds for panoramic city views.',
        duration: '2 to 3 hours',
      },
    ],
    
    insiderTips: [
      'The palace cellars (where Game of Thrones dragons were kept) are worth exploring.',
      'Beaches at Bačvice and around Marjan Hill are walkable from the Old Town.',
      'Try peka (meat or fish cooked under a bell-shaped lid) at local restaurants.',
    ],
    
    meta: {
      title: 'Split Cruise Port Guide 2026 | Diocletian\'s Palace & Dalmatian Coast',
      description: 'Complete Split cruise port guide. Diocletian\'s Palace, Riva promenade, Marjan beaches. Walking distance from cruise terminal.',
      keywords: ['Split cruise port', 'Diocletian\'s Palace cruise', 'Croatia cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Valletta
  {
    id: 'valletta',
    slug: 'valletta',
    name: 'Valletta',
    country: 'Malta',
    region: 'mediterranean',
    coordinates: { lat: 35.8989, lon: 14.5146 },
    tagline: 'Knights\' fortress capital on a sun-drenched Mediterranean island',
    description: 'Valletta is a baroque masterpiece built by the Knights of St John after the Great Siege of 1565. This UNESCO World Heritage capital is one of Europe\'s smallest and most concentrated historic areas, packed with grand palaces, churches, and fortifications. The entire city is essentially an open-air museum, with stunning harbour views from its ramparts.',
    portCharacter: 'historic',
    
    aboutPort: {
      overview: 'Ships dock at the Valletta Cruise Port in the Grand Harbour. A lift takes passengers up to Barrakka Gardens and the Upper Town, or buses/taxis are available.',
      terminals: 'Valletta Cruise Port with modern facilities',
      walkability: 'City very walkable but hilly; lift from port to Upper Town',
      shuttleServices: 'Barrakka Lift provides easy access to Upper Town',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Maltese, English',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Barrakka Lift to Upper Town (2 mins). Buses available to Valletta and around Malta.',
      publicTransport: 'Comprehensive bus network covering Malta.',
      taxis: 'White taxis at port; Bolt/eCabs apps work well.',
      walkingDistance: 'Upper Barrakka Gardens 5 mins by lift, St John\'s Co-Cathedral 10 mins, Republic Street 10 mins.',
      sightseeingBus: 'Hop-on hop-off buses cover Valletta, Mdina, and beaches.',
    },
    
    mustSeeSights: [
      {
        title: 'St John\'s Co-Cathedral',
        category: 'landmark',
        description: 'Ornate baroque cathedral of the Knights of St John. Caravaggio masterpieces, marble tombs, and gilded interior.',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Upper Barrakka Gardens',
        category: 'viewpoint',
        description: 'Elegant gardens with panoramic views over Grand Harbour. Noon cannon firing daily.',
        duration: '30 mins to 1 hour',
      },
      {
        title: 'Mdina',
        category: 'historic',
        description: 'Malta\'s ancient capital - a walled city of honey-coloured stone and silent streets. Reached by bus or excursion.',
        duration: 'Half day excursion',
      },
    ],
    
    insiderTips: [
      'Arrive at St John\'s early to avoid cruise ship crowds.',
      'The noon cannon firing at Upper Barrakka Gardens is worth timing your visit around.',
      'Pastizzi (flaky pastries) from local bakeries cost cents and are delicious.',
    ],
    
    meta: {
      title: 'Valletta Cruise Port Guide 2026 | Malta\'s Baroque Capital',
      description: 'Complete Valletta cruise port guide. St John\'s Cathedral, Knights heritage, Grand Harbour views. Barrakka Lift from port.',
      keywords: ['Valletta cruise port', 'Malta cruise', 'Knights of Malta'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Santorini
  {
    id: 'santorini',
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'mediterranean',
    coordinates: { lat: 36.3932, lon: 25.4615 },
    tagline: 'Volcanic caldera crowned with whitewashed clifftop villages',
    description: 'Santorini is one of the world\'s most photographed destinations - whitewashed villages with blue domes perched on dramatic cliffs above a flooded volcanic caldera. Cruise ships anchor in the caldera, and passengers tender to the old port at Fira, then ascend by cable car, donkey, or 588 steps. The sunsets in Oia are legendary.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Ships anchor in the caldera. Tenders take passengers to the old port below Fira. Cable car (recommended), donkey, or 588 steps to reach the clifftop town.',
      terminals: 'Tender port below Fira; cable car to town',
      walkability: 'Towns walkable but steep; transport needed between villages',
      shuttleServices: 'Cable car essential for most visitors',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Greek',
      timezone: 'GMT+2',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: true,
    },
    
    gettingAround: {
      fromPort: 'Cable car to Fira (3 mins, queues likely). Donkeys or 588 steps alternatives.',
      publicTransport: 'Buses from Fira to Oia, beaches, and airport.',
      taxis: 'Limited and expensive - book in advance.',
      walkingDistance: 'Fira walkable; Oia requires bus or taxi (25 mins).',
      sightseeingBus: 'Excursions recommended for efficiency.',
    },
    
    mustSeeSights: [
      {
        title: 'Oia Village',
        category: 'village',
        description: 'The most photographed village in Greece - blue domes, whitewashed houses, and the famous sunset views. Arrive early for the best spots.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Fira Town',
        category: 'town',
        description: 'Capital of Santorini with caldera views, shops, restaurants, and the Museum of Prehistoric Thera. Cable car arrives here.',
        duration: '1 to 2 hours',
      },
      {
        title: 'Akrotiri',
        category: 'historic',
        description: 'Minoan Bronze Age settlement preserved under volcanic ash - Greece\'s Pompeii. Fascinating archaeological site.',
        duration: '1.5 to 2 hours (excursion)',
      },
    ],
    
    insiderTips: [
      'Cable car queues can be very long - allow plenty of time for return to ship.',
      'Oia sunset is crowded - Fira offers similar views with fewer people.',
      'Red Beach and Perissa Black Sand Beach require transport but offer swimming.',
    ],
    
    meta: {
      title: 'Santorini Cruise Port Guide 2026 | Volcanic Caldera & Blue Domes',
      description: 'Complete Santorini cruise port guide. Oia sunset, Fira town, cable car from caldera. Blue domes and whitewashed villages.',
      keywords: ['Santorini cruise port', 'Oia sunset cruise', 'Greek Islands cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Mykonos
  {
    id: 'mykonos',
    slug: 'mykonos',
    name: 'Mykonos',
    country: 'Greece',
    region: 'mediterranean',
    coordinates: { lat: 37.4467, lon: 25.3289 },
    tagline: 'Cycladic charm meets cosmopolitan glamour',
    description: 'Mykonos combines traditional Cycladic whitewashed architecture with a glamorous, cosmopolitan atmosphere. The charming Chora (Old Town) features narrow lanes, iconic windmills, and the waterfront Little Venice. While known for nightlife, it\'s equally appealing by day for its beaches, boutiques, and relaxed Mediterranean vibe.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Ships anchor in the bay or dock at the new cruise port. Tenders or shuttle buses take passengers to the Old Town (Chora). The old port is walking distance from Chora.',
      terminals: 'New cruise port or anchorage with tender to old port',
      walkability: 'Chora very walkable; beaches require transport',
      shuttleServices: 'Shuttle buses to Old Town from new port',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Greek',
      timezone: 'GMT+2',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Shuttle or short walk to Chora from old port.',
      publicTransport: 'Buses to beaches from Fabrika Square.',
      taxis: 'Available but limited during peak season.',
      walkingDistance: 'Windmills 5 mins, Little Venice 10 mins, Chora throughout.',
      sightseeingBus: 'Beach buses most useful transport.',
    },
    
    mustSeeSights: [
      {
        title: 'Little Venice',
        category: 'neighbourhood',
        description: 'Colourful houses built right on the waterfront, with balconies hanging over the sea. Perfect for sunset drinks at waterside bars.',
        duration: '1 to 2 hours',
      },
      {
        title: 'Windmills of Kato Mili',
        category: 'landmark',
        description: 'Iconic 16th-century windmills on the hillside above Little Venice. Mykonos\'s most photographed landmark.',
        duration: '15 to 30 mins',
      },
      {
        title: 'Chora (Old Town)',
        category: 'neighbourhood',
        description: 'Maze of whitewashed lanes lined with boutiques, galleries, and tavernas. Get lost - it\'s the best way to explore.',
        duration: '2 to 3 hours',
      },
    ],
    
    insiderTips: [
      'The lanes are designed to confuse pirates - getting lost is part of the experience.',
      'Paradise and Super Paradise beaches are famous but crowded; Agios Sostis is quieter.',
      'Pelicans wander the waterfront - look out for Petros the Pelican\'s successors.',
    ],
    
    meta: {
      title: 'Mykonos Cruise Port Guide 2026 | Windmills & Cycladic Charm',
      description: 'Complete Mykonos cruise port guide. Little Venice, windmills, Chora Old Town. Greek island glamour and traditional charm.',
      keywords: ['Mykonos cruise port', 'Little Venice Mykonos', 'Greek Islands cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Piraeus (Athens)
  {
    id: 'piraeus',
    slug: 'piraeus',
    name: 'Piraeus (Athens)',
    country: 'Greece',
    region: 'mediterranean',
    coordinates: { lat: 37.9475, lon: 23.6370 },
    tagline: 'Gateway to the Acropolis and birthplace of democracy',
    description: 'Piraeus is the port of Athens, one of the world\'s oldest cities and birthplace of Western civilisation. The Acropolis crowned by the Parthenon dominates the skyline, while the ancient Agora, Plaka neighbourhood, and world-class museums bring 3,000 years of history to life. The port is well-connected to central Athens by metro.',
    portCharacter: 'gateway',
    
    aboutPort: {
      overview: 'Large cruise port with multiple terminals. Metro station (Piraeus) connects directly to central Athens (Monastiraki/Acropolis) in about 25 minutes.',
      terminals: 'Multiple cruise terminals at Piraeus port',
      walkability: 'Port area basic; Athens requires metro or transport',
      shuttleServices: 'Some cruise lines offer shuttles; metro recommended',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Greek',
      timezone: 'GMT+2',
      portType: 'Port of Call & Turnaround',
      walkable: false,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Metro Line 1 (green) from Piraeus to Monastiraki (25 mins) for Acropolis access.',
      publicTransport: 'Excellent Athens metro; buses and trams throughout.',
      taxis: 'Available at port; use apps like Beat or Uber.',
      walkingDistance: 'Piraeus town 10-15 mins; Athens city centre 10km (use metro).',
      sightseeingBus: 'Athens hop-on hop-off buses pick up from port.',
    },
    
    mustSeeSights: [
      {
        title: 'Acropolis',
        category: 'landmark',
        description: 'Ancient citadel with the Parthenon, Erechtheion, and other classical temples. The symbol of Athens and Greek civilisation.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Acropolis Museum',
        category: 'museum',
        description: 'Modern museum at the Acropolis foot housing sculptures and artefacts from the sacred rock. Glass floors reveal excavations below.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Plaka',
        category: 'neighbourhood',
        description: 'Historic neighbourhood at the Acropolis foot with neoclassical houses, tavernas, and souvenir shops. Charming for wandering.',
        duration: '1 to 2 hours',
      },
    ],
    
    insiderTips: [
      'Book Acropolis tickets online to skip the queues - combination tickets include other sites.',
      'Visit the Acropolis early morning or late afternoon to avoid heat and crowds.',
      'The metro stations at Syntagma and Acropolis have archaeological displays.',
    ],
    
    meta: {
      title: 'Piraeus Cruise Port Guide 2026 | Gateway to Athens & Acropolis',
      description: 'Complete Piraeus cruise port guide. Acropolis, Parthenon, Plaka neighbourhood. Metro connection to central Athens.',
      keywords: ['Piraeus cruise port', 'Athens cruise', 'Acropolis cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Corfu
  {
    id: 'corfu',
    slug: 'corfu',
    name: 'Corfu',
    country: 'Greece',
    region: 'mediterranean',
    coordinates: { lat: 39.6243, lon: 19.9217 },
    tagline: 'Venetian elegance meets lush Greek island beauty',
    description: 'Corfu is the greenest of the Greek islands, with a UNESCO-listed Old Town reflecting centuries of Venetian, French, and British rule. The elegant Liston arcade, two Venetian fortresses, and winding kantounia (alleyways) give it a distinctly Italian feel. Beyond the town, the island offers beaches, mountain villages, and the famous Achilleion Palace.',
    portCharacter: 'island',
    
    aboutPort: {
      overview: 'Cruise ships dock at the new cruise terminal or anchor in the bay. The Old Town is a short walk or shuttle ride from the port.',
      terminals: 'New cruise terminal near Old Town',
      walkability: 'Old Town very walkable; island attractions require transport',
      shuttleServices: 'Usually not required; Old Town close to port',
    },
    
    quickFacts: {
      currency: 'EUR (€)',
      language: 'Greek',
      timezone: 'GMT+2',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Old Town 10-15 minute walk.',
      publicTransport: 'Blue buses around town; green buses to island destinations.',
      taxis: 'Available at port.',
      walkingDistance: 'Liston 10 mins, Old Fortress 15 mins, Spianada Square 10 mins.',
      sightseeingBus: 'Island tours available.',
    },
    
    mustSeeSights: [
      {
        title: 'Corfu Old Town',
        category: 'historic',
        description: 'UNESCO-listed town with Venetian architecture, the Liston arcade, and charming alleyways. Explore without a map for best discoveries.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Old Fortress',
        category: 'landmark',
        description: 'Venetian fortress on a promontory with panoramic views. Lighthouse and Byzantine church within the walls.',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Achilleion Palace',
        category: 'palace',
        description: 'Summer palace built for Empress Elisabeth of Austria (Sisi). Gardens, statues, and views over the Ionian Sea.',
        duration: '1.5 to 2 hours (excursion)',
      },
    ],
    
    insiderTips: [
      'The Liston arcade is perfect for coffee and people-watching.',
      'Kumquat liqueur and products are a Corfu speciality - makes good souvenirs.',
      'Palaiokastritsa on the west coast has beautiful beaches and a monastery.',
    ],
    
    meta: {
      title: 'Corfu Cruise Port Guide 2026 | Venetian Heritage & Greek Island Beauty',
      description: 'Complete Corfu cruise port guide. UNESCO Old Town, Venetian fortresses, Achilleion Palace. Walking distance from cruise port.',
      keywords: ['Corfu cruise port', 'Corfu Old Town', 'Greek Islands cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // ============================================================================
  // ADDITIONAL NORWEGIAN PORTS
  // ============================================================================

  // Oslo
  {
    id: 'oslo',
    slug: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 59.9139, lon: 10.7522 },
    tagline: 'Viking heritage and modern Nordic cool at the fjord\'s head',
    description: 'Oslo sits at the head of the Oslofjord, combining Viking heritage with cutting-edge Scandinavian design. The waterfront has been transformed with the striking Opera House and Munch Museum, while traditional highlights include the Viking Ship Museum and Vigeland Sculpture Park. The city offers a perfect blend of culture, nature, and Nordic lifestyle.',
    portCharacter: 'city',
    
    aboutPort: {
      overview: 'Cruise ships dock at various piers along the waterfront. Most terminals are within walking distance of the city centre, Opera House, and Aker Brygge.',
      terminals: 'Multiple waterfront berths near city centre',
      walkability: 'Excellent - city centre walkable from most berths',
      shuttleServices: 'Usually not required',
    },
    
    quickFacts: {
      currency: 'NOK (kr)',
      language: 'Norwegian',
      timezone: 'GMT+1',
      portType: 'Port of Call & Turnaround',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Walk to Opera House (5-10 mins), Karl Johan gate (15 mins).',
      publicTransport: 'Excellent tram, metro, and bus network. Ferries to Bygdøy.',
      taxis: 'Readily available but expensive.',
      walkingDistance: 'Opera House 5 mins, Aker Brygge 10 mins, Royal Palace 20 mins.',
      sightseeingBus: 'Hop-on hop-off buses operate throughout the city.',
    },
    
    mustSeeSights: [
      {
        title: 'Viking Ship Museum',
        category: 'museum',
        description: 'Three remarkably preserved 9th-century Viking ships. The Oseberg ship is particularly stunning. Located on Bygdøy peninsula.',
        duration: '1 to 1.5 hours',
      },
      {
        title: 'Vigeland Sculpture Park',
        category: 'park',
        description: 'Open-air gallery with over 200 bronze and granite sculptures by Gustav Vigeland. Free entry, extraordinary human forms.',
        duration: '1 to 2 hours',
      },
      {
        title: 'Opera House',
        category: 'landmark',
        description: 'Stunning contemporary architecture - walk on the sloping marble roof for harbour views. Symbol of modern Oslo.',
        duration: '30 mins to 1 hour',
      },
    ],
    
    insiderTips: [
      'The Oslo Pass includes public transport and museum entry - good value if seeing multiple sites.',
      'Bygdøy museums (Viking Ships, Fram, Kon-Tiki) are reached by ferry from Aker Brygge.',
      'Grünerløkka neighbourhood offers trendy cafes, vintage shops, and local atmosphere.',
    ],
    
    meta: {
      title: 'Oslo Cruise Port Guide 2026 | Viking Heritage & Modern Nordic Design',
      description: 'Complete Oslo cruise port guide. Viking Ship Museum, Opera House, Vigeland Park. Walking distance from cruise terminals.',
      keywords: ['Oslo cruise port', 'Viking Ship Museum cruise', 'Norway cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Trondheim
  {
    id: 'trondheim',
    slug: 'trondheim',
    name: 'Trondheim',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 63.4305, lon: 10.3951 },
    tagline: 'Norway\'s medieval pilgrimage city with colourful wharves',
    description: 'Trondheim was Norway\'s first capital and remains the country\'s spiritual centre, crowned by the magnificent Nidaros Cathedral - Scandinavia\'s largest medieval building. The colourful wooden warehouses of Bakklandet line the Nidelva River, while the historic wharf Bryggene echoes Bergen\'s famous waterfront. It\'s a walkable city rich in history and student energy.',
    portCharacter: 'city',
    
    aboutPort: {
      overview: 'Cruise ships dock at the city pier, a short walk from the centre. Nidaros Cathedral, Bakklandet, and the main attractions are all within walking distance.',
      terminals: 'City centre pier',
      walkability: 'Excellent - all major attractions walkable',
      shuttleServices: 'Not required',
    },
    
    quickFacts: {
      currency: 'NOK (kr)',
      language: 'Norwegian',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Nidaros Cathedral 10-15 minute walk. Bakklandet 15 minutes.',
      publicTransport: 'Trams and buses serve the city.',
      taxis: 'Available at the port.',
      walkingDistance: 'Cathedral 15 mins, Bakklandet 15 mins, Old Town Bridge 10 mins.',
      sightseeingBus: 'City tours available.',
    },
    
    mustSeeSights: [
      {
        title: 'Nidaros Cathedral',
        category: 'landmark',
        description: 'Scandinavia\'s largest medieval cathedral and Norway\'s national sanctuary. Built over the burial site of St Olav. Climb the tower for views.',
        duration: '1 to 2 hours',
      },
      {
        title: 'Bakklandet',
        category: 'neighbourhood',
        description: 'Charming old town district with colourful wooden houses, cobbled streets, cafes, and boutiques along the river.',
        duration: '1 to 2 hours',
      },
      {
        title: 'Old Town Bridge',
        category: 'landmark',
        description: 'Red wooden bridge with views of the colourful riverside warehouses. Perfect photo spot and gateway to Bakklandet.',
        duration: '15 to 30 mins',
      },
    ],
    
    insiderTips: [
      'The bicycle lift on Bakklandet is the world\'s first - try it for free.',
      'Nidaros Cathedral crown jewels can be viewed in the Archbishop\'s Palace.',
      'Trondheimsfjord excursions to Ringve Music Museum or Munkholmen island are worthwhile.',
    ],
    
    meta: {
      title: 'Trondheim Cruise Port Guide 2026 | Nidaros Cathedral & Medieval Heritage',
      description: 'Complete Trondheim cruise port guide. Nidaros Cathedral, Bakklandet, colourful wharves. Walking distance from cruise pier.',
      keywords: ['Trondheim cruise port', 'Nidaros Cathedral cruise', 'Norway cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
  },

  // Olden
  {
    id: 'olden',
    slug: 'olden',
    name: 'Olden',
    country: 'Norway',
    region: 'norwegian-fjords',
    coordinates: { lat: 61.8302, lon: 6.8095 },
    tagline: 'Gateway to Briksdal Glacier and turquoise glacial lakes',
    description: 'Olden is a small village at the head of Nordfjord, famous as the gateway to Briksdal Glacier and the stunning Oldevatnet and Lovatnet glacial lakes. The village itself is tiny, but the surrounding scenery - towering mountains, glacial valleys, and turquoise waters - is spectacular. Most visitors take excursions to the glacier or lakes.',
    portCharacter: 'village',
    
    aboutPort: {
      overview: 'Ships dock at the village pier or anchor with tender service. The village is very small; the main attractions require excursions.',
      terminals: 'Village pier',
      walkability: 'Village walkable; attractions require transport',
      shuttleServices: 'Organised excursions recommended',
    },
    
    quickFacts: {
      currency: 'NOK (kr)',
      language: 'Norwegian',
      timezone: 'GMT+1',
      portType: 'Port of Call',
      walkable: true,
      tenderRequired: false,
    },
    
    gettingAround: {
      fromPort: 'Village is steps from the pier.',
      publicTransport: 'Limited - excursions recommended.',
      taxis: 'Very limited.',
      walkingDistance: 'Village shops and cafe immediately accessible.',
      sightseeingBus: 'Organised excursions only.',
    },
    
    mustSeeSights: [
      {
        title: 'Briksdal Glacier',
        category: 'nature',
        description: 'Arm of the Jostedalsbreen glacier accessible by trolley car and walk. Dramatic ice face surrounded by waterfalls and mountains.',
        duration: 'Half day excursion',
      },
      {
        title: 'Loen Skylift',
        category: 'viewpoint',
        description: 'Cable car ascending 1,011 metres in 5 minutes to Mount Hoven. Spectacular views over Nordfjord and the mountains.',
        duration: '2 to 3 hours',
      },
      {
        title: 'Lovatnet Lake',
        category: 'nature',
        description: 'Stunning turquoise glacial lake surrounded by mountains and waterfalls. The drive alone is unforgettable.',
        duration: '2 to 3 hours (excursion)',
      },
    ],
    
    insiderTips: [
      'Briksdal Glacier has retreated significantly - manage expectations but it\'s still spectacular.',
      'Loen Skylift is best booked in advance through ship excursions or online.',
      'The village has a small shop and cafe for those staying local.',
    ],
    
    meta: {
      title: 'Olden Cruise Port Guide 2026 | Briksdal Glacier & Fjord Scenery',
      description: 'Complete Olden cruise port guide. Briksdal Glacier, Loen Skylift, glacial lakes. Gateway to spectacular Norwegian fjord scenery.',
      keywords: ['Olden cruise port', 'Briksdal Glacier cruise', 'Norwegian fjords cruise'],
    },
    
    status: 'overview',
    lastUpdated: '2026-01-29',
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

/**
 * Get previous and next port for navigation
 * Returns { prev: port | null, next: port | null }
 */
export function getAdjacentPorts(currentSlug) {
  const currentIndex = ports.findIndex(p => p.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prevPort = currentIndex > 0 ? ports[currentIndex - 1] : null;
  const nextPort = currentIndex < ports.length - 1 ? ports[currentIndex + 1] : null;
  
  return { prev: prevPort, next: nextPort };
}

