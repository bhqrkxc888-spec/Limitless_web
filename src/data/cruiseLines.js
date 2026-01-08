/**
 * Cruise Lines Data
 * All cruise line information for the site
 * 
 * Extended data structure supports optional sections:
 * - whyChoose: Array of { title, description } benefit cards
 * - destinationImages: Array of { name, image, alt } for featured destinations
 * - kidsClub: { name, intro, quickFacts, ageGroups } for family ships
 * - accessibility: { intro, tips } for accessibility info
 * - loyaltyProgram: { name, intro, tiers } for loyalty schemes
 * - fleet: Array of { name, type, description, features } for ship details
 * - dining: Array of { name, description } for restaurant info
 * - entertainment: Array of { name, description } for onboard activities
 */

export const cruiseLines = [
  {
    id: 'po-cruises',
    slug: 'p-and-o-cruises',
    name: 'P&O Cruises',
    shortName: 'P&O',
    tagline: 'Britain\'s favourite cruise line',
    description: 'P&O Cruises offers warm British hospitality from convenient UK ports. Choose adults-only ships (Aurora, Arcadia) or family-friendly vessels (Iona, Arvia, Britannia). No-fly departures from Southampton, pounds sterling onboard, and no tipping required.',
    category: 'mainstream',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Classic British Cruising',
        description: 'P&O Cruises delivers the authentic British cruise experience with a heritage spanning 185 years. Expect proper tea service, British-inspired menus, and entertainment featuring West End-style shows. Perfect for UK travellers seeking familiar comforts at sea with impeccable service standards.',
        icon: 'anchor'
      },
      {
        title: 'Modern Fleet',
        description: 'Seven contemporary ships ranging from family-friendly Iona class to classic mid-size vessels like Britannia. Every ship offers British-style pubs, afternoon tea, and panoramic lounges. Regular refits ensure modern facilities across the entire fleet.',
        icon: 'ship'
      },
      {
        title: 'SkyDome & The 710 Club',
        description: 'Iona and Arvia feature a glass-enclosed SkyDome and live music bar created with Gary Barlow.',
        icon: 'music'
      },
      {
        title: 'Exceptional Dining',
        description: 'Multiple main dining rooms plus speciality venues like Epicurean (gourmet British cuisine) and Sindhu (Indian fusion). All-inclusive Horizon drinks package available. Kids eat free in main restaurants and traditional British options always available.',
        icon: 'dining'
      },
      {
        title: 'Family Entertainment',
        description: 'West End-quality production shows, family-friendly deck parties, and kids clubs from Reef Rangers (2-4yrs) to Dare to Dance (15-17yrs). Family harbour days in Southampton and evening childcare let parents enjoy adult-only evening entertainment.',
        icon: 'child'
      },
      {
        title: 'Outstanding Value',
        description: 'No tipping required, all main meals included, kids sail from £99, and flexible dining times. Solo traveller fares match double occupancy on selected sailings. ABTA/ATOL protected with familiar UK departure ports.',
        icon: 'adventure'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Tropical Caribbean beach with turquoise waters' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastal harbour' },
      { name: 'Norwegian Fjords',  alt: 'Norwegian Fjords with Northern Lights' },
      { name: 'Northern Europe',  alt: 'Northern European waterfront' },
      { name: 'Canary Islands',  alt: 'Canary Islands volcanic landscape' },
      { name: 'Baltic & Northern Europe',  alt: 'Nordic capitals and Baltic Sea' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'The Reef',
      intro: 'P&O Cruises is one of Britain\'s most family-friendly cruise lines with dedicated kids clubs across multiple age groups on every ship. P&O\'s award-winning kids programme features Reef Rangers (2-4yrs) with sensory play, Scubas (5-8yrs) with pirate adventures, and older clubs up to 17yrs. Every ship has splash zones, family cinemas, and kids eat free in main dining rooms. Evening childcare until late lets parents enjoy Horizon shows and adult loungers. Family balconies, interconnecting cabins, and kids clubs open from 9am-11pm daily. Multi-generational appeal perfect for grandparents travelling with grandchildren.',
      quickFacts: [
        'Included in cruise fare',
        'Qualified Reef Rangers',
        'Night Nursery available',
        'Pre-book guarantee slots'
      ],
      ageGroups: [
        { club: 'Night Nursery', age: '6mo-4yr', morning: '-', afternoon: '-', evening: '6pm-midnight' },
        { club: 'Splashers', age: '2-4yr', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '6pm-10pm' },
        { club: 'Surfers', age: '5-8yr', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '6pm-10pm' },
        { club: 'Scubas', age: '9-12yr', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '6pm-10pm' },
        { club: 'H2O/The Scene', age: '13-17yr', morning: '-', afternoon: 'Open access', evening: 'Open access' }
      ],
      note: 'Times vary by ship. Teen spaces are open access; younger groups have set sessions.'
    },

    // Accessibility info
    accessibility: {
      intro: 'P&O Cruises offers accessible cabins with widened doors, roll-in showers, and grab rails across the fleet. Limitless Cruises can liaise with the Accessibility Team to confirm cabin availability, arrange port assistance, and note any mobility or medical needs.',
      tips: [
        { title: 'Accessible cabins', description: 'Book early - limited availability, allocated first-come.' },
        { title: 'Mobility equipment', description: 'Bring aids or hire via Mobility at Sea.' },
        { title: 'Port assistance', description: 'Request 14 days before sailing.' },
        { title: 'Hearing/visual', description: 'Induction loops, vibrating alerts, TTY phones available.' },
        { title: 'Medical services', description: 'Doctors and nurses onboard all ships.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Peninsular Club',
      intro: 'Peninsular Club - P&O\'s generous loyalty programme rewards repeat cruisers with points-based benefits across all tiers. Join free at booking or onboard. Earn 1 Club Point per night (double for suites), redeemable against onboard credit, cabin upgrades, and exclusive events. Pacific tier from first cruise, with escalating benefits through Atlantic, Mediterranean, Caribbean, Baltic and up to Ligurian tier. Over 1 million members enjoy the UK\'s most generous cruise loyalty scheme with no blackout dates for rewards.',
      pointsInfo: 'Key Benefits: Percentage discounts increase with each tier (5% Pacific to 10% Caribbean/Baltic), priority tendering and dining reservations, exclusive cocktail parties and loyalty desk services, Champagne welcome from Atlantic tier, 50% laundry discount at Baltic and Ligurian tiers.',
      tiers: [
        { tier: 'Pacific', points: '150-500', benefits: '5% discount, magazine' },
        { tier: 'Atlantic', points: '501-1,000', benefits: '7.5% discount, Champagne welcome' },
        { tier: 'Mediterranean', points: '1,001-2,000', benefits: '8.5% discount, cocktail party' },
        { tier: 'Caribbean', points: '2,001-2,500', benefits: '10% discount, priority booking' },
        { tier: 'Baltic', points: '2,501+', benefits: '10% discount, 50% laundry, priority check-in' },
        { tier: 'Ligurian', points: '2,501+ (201+ nights)', benefits: 'All above + hospitality lounge, free pressing' }
      ]
    },

    // Simple lists for sidebar/quick reference
    highlights: [
      'No-fly cruising from Southampton with pounds sterling onboard and no tipping required',
      'Adults-only ships (Aurora and Arcadia) plus family-friendly ships (Iona, Arvia, Britannia, Azura, Ventura)',
      'SkyDome glass-enclosed retreat and entertainment venue on Iona and Arvia',
      'The 710 Club live music bar created with Gary Barlow on Iona and Arvia',
      'The Reef kids club for ages 6 months to 17 years included in your fare',
      'Food Heroes dining with Marco Pierre White, José Pizarro and wine expert Olly Smith',
      'British hospitality with fine dining, afternoon tea, live theatre shows and casual entertainment',
      'Arvia exclusive experiences: Altitude Skywalk high ropes and Mission Control submarine adventure'
    ],
    ships: ['Iona', 'Arvia', 'Britannia', 'Ventura', 'Azura', 'Aurora', 'Arcadia'],
    destinations: ['Mediterranean', 'Norwegian Fjords', 'Caribbean', 'Canary Islands', 'Northern Europe', 'Baltic & Northern Europe'],
    suitableFor: ['Couples', 'Families', 'Solo Travellers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes P&O Cruises different from other cruise lines?',
        answer: 'P&O offers authentic British cruising with 185 years heritage - proper tea service, British cuisine, West End shows, and UK departure ports. Unlike American lines, expect formal nights, bridge tournaments, and BBC World News. Family-friendly yet sophisticated, perfect for multi-generational UK holidays.'
      },
      {
        question: 'What destinations does P&O Cruises sail to?',
        answer: 'Winter Caribbean from Barbados/Bridgetown, summer Norwegian fjords (23 visits), Mediterranean, Canary Islands, and British Isles cruises. Signature 16-night Scandinavia & Baltic voyages. Longest-running fjord cruises from Southampton with overnight Bergen stays and exclusive Scottish port calls.'
      },
      {
        question: 'Is P&O Cruises suitable for families?',
        answer: 'Excellent for families - kids clubs (2-17yrs), splash zones on Iona/Arvia, family cinemas, and kids eat free. Evening childcare until 1am, interconnecting cabins, and family balconies. Multi-generational favourite with grandparents enjoying quieter lounges while kids entertain themselves.'
      },
      {
        question: 'What is included in a P&O Cruises holiday?',
        answer: 'All meals in main restaurants, buffet, entertainment, kids clubs, gym, pools, most onboard activities included. No tipping required. Extras: speciality dining (£20-40pp), spa, excursions, drinks packages (£35/day), casino, photos. Classic drinks package covers beer, wine, spirits at lunch/dinner.'
      },
      {
        question: 'How do I join P&O Cruises\' loyalty programme?',
        answer: 'Join Peninsular Club free at booking or onboard. Earn 1 point per night automatically. Pacific tier from 150 points, progressing through Atlantic (501pts), Mediterranean (1,001pts), Caribbean (2,001pts), Baltic (2,501pts), and Ligurian (2,501pts with 201+ nights). Benefits include percentage discounts, priority services, exclusive events. Points redeemable against cruises and onboard spending.'
      },
      {
        question: 'What should I know before booking a P&O Cruises holiday?',
        answer: 'Gala evenings (smart casual/formal attire), British currency onboard, tips included. Best book 12-18 months ahead for fjords/Caribbean. Choose balcony for fjord scenery. Southampton departures easiest (no flights). Average passenger age 45-75, perfect for mature families. Solo fares match doubles on selected sailings.'
      }
    ],
    meta: {
      title: 'P&O Cruises | UK Cruise Holidays from Southampton',
      description: 'Explore P&O Cruises holidays from UK ports. No-fly cruising to the Mediterranean, Norway, Caribbean and more. Book with Limitless Cruises.'
    }
  },
  {
    id: 'royal-caribbean',
    slug: 'royal-caribbean',
    name: 'Royal Caribbean',
    shortName: 'Royal Caribbean',
    tagline: 'The world\'s most innovative cruise line',
    description: 'Royal Caribbean is known for groundbreaking ships featuring incredible amenities like FlowRider surf simulators, rock climbing walls, and the iconic Central Park at sea.',
    category: 'mainstream',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Ultimate Family Adventure',
        description: 'Royal Caribbean builds the world\'s most innovative ships with multi-level water slides, indoor skydiving, FlowRider surf simulators, and robot bartenders. Perfect for active families wanting non-stop action and cutting-edge entertainment at sea.',
        icon: 'adventure'
      },
      {
        title: 'Mega-Resort Ships',
        description: 'Icon, Oasis, Quantum, and Ovation class mega-ships carrying 5,000-7,000 guests with Central Park neighbourhoods, seven distinct districts, and Broadway-calibre shows. Largest ships at sea with something for everyone.',
        icon: 'ship'
      },
      {
        title: 'Award-Winning Entertainment',
        description: 'Original ice skating shows, full-size AquaTheatre diving spectaculars, 1,300-seat Royal Theatre productions, and guest stars like Jason Derulo. Largest entertainment offering in cruising with shows exclusive to each ship class.',
        icon: 'entertainment'
      },
      {
        title: 'Adventure Ocean Kids Programme',
        description: 'World-renowned kids clubs from 3 months to 17yrs with science labs, rock climbing walls, circus school, and DJ studios. Every ship designed as floating adventure park with dedicated kids spaces and teen hangouts.',
        icon: 'child'
      },
      {
        title: 'Private Island Paradise',
        description: 'Exclusive Perfect Day at CocoCay with private waterpark, tallest waterslide in Western Hemisphere (Daredevil\'s Peak), adults-only Hideaway Beach, and private cabanas. Only cruise line with its own Caribbean island resort.',
        icon: 'island'
      },
      {
        title: 'Incredible Value',
        description: 'Kids sail free promotions, drink packages from $59/day, flexible dining across 25+ venues, and WiFi packages. Best onboard credit deals and dynamic pricing system rewards early bookers.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Caribbean beach and turquoise sea' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Alaska',  alt: 'Alaska glaciers and mountains' },
      { name: 'Northern Europe',  alt: 'Northern Europe waterfront' },
      { name: 'Asia',  alt: 'Asian port city' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Adventure Ocean',
      intro: 'Royal Caribbean is the world\'s #1 family cruise line with the most comprehensive kids programme from babies to teens on every ship. Royal Adventure Ocean (3 months-5yrs), Adventure Ocean (6-12yrs), and teen clubs up to 17yrs. Every ship features multi-level water slides, indoor skydiving, rock climbing walls, and dedicated kids pools. Family suites sleep 8+ and interconnecting cabins available. Baby splash pools, family movie nights under the stars, and supervised late-night group babysitting. Perfect Day at CocoCay private island included on most Caribbean sailings.',
      ageGroups: [
        { club: 'Royal Babies & Tots', age: '3m-5yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Adventure Ocean Aquanauts', age: '6-8yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Explorers', age: '9-11yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-11pm' },
        { club: 'Voyagers', age: '12-14yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' },
        { club: 'Teens', age: '15-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Crown & Anchor Society',
      intro: 'Crown & Anchor Society - Royal Caribbean\'s tiered loyalty programme rewarding every cruise with status perks and onboard benefits. Join free automatically after first cruise. Earn 1 Crown & Anchor point per night (double for suites). Gold (3 nights), Platinum (30 nights), Diamond (80 nights), Pinnacle (700 nights). Benefits increase with each tier. Over 18 million members with generous benefits starting from just 3 nights cruised.',
      pointsInfo: 'Key Benefits: Onboard credit (£25 Diamond, £75 Pinnacle per cruise), priority tendering, speciality dining reservations, suite lounge access, BOGO drink specials (Diamond+), complimentary Happy Hour drinks, exclusive members events, double points events, spa discounts.',
      tiers: [
        { tier: 'Gold', points: '3+ nights', benefits: 'Welcome gift, priority check-in' },
        { tier: 'Platinum', points: '30+ nights', benefits: 'Platinum benefits, priority dining' },
        { tier: 'Diamond', points: '80+ nights', benefits: 'Diamond benefits, onboard credit, priority services' },
        { tier: 'Diamond Plus', points: '175+ nights', benefits: 'All Diamond benefits, enhanced perks' },
        { tier: 'Pinnacle', points: '700+ nights', benefits: 'Ultimate benefits, suite lounge access, exclusive events' }
      ]
    },
    highlights: [
      'World\'s largest cruise ships',
      'Innovative onboard activities',
      'Perfect Day at CocoCay private island',
      'Award-winning entertainment'
    ],
    ships: ['Icon of the Seas', 'Wonder of the Seas', 'Symphony of the Seas', 'Odyssey of the Seas'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Asia'],
    suitableFor: ['Families', 'Adventure Seekers', 'Multi-generational'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Royal Caribbean different from other cruise lines?',
        answer: 'Royal Caribbean builds the world\'s largest, most innovative ships with features no one else offers: indoor skydiving, surf simulators, robot bartenders, and Broadway shows. Perfect Day at CocoCay private island exclusive to Royal guests. Non-stop family adventure focus.'
      },
      {
        question: 'What destinations does Royal Caribbean sail to?',
        answer: 'Caribbean (300+ sailings yearly), Alaska, Mediterranean, Northern Europe, Australia, Asia, South America, and world cruises. Signature 7-night Perfect Day CocoCay itineraries plus 18-night Transatlantic repositioning cruises.'
      },
      {
        question: 'Is Royal Caribbean suitable for families?',
        answer: 'World\'s #1 family cruise line - kids clubs 3 months-17yrs, water slides on every ship, indoor skydiving, rock climbing, and private island CocoCay. Family suites sleep 8+, kids sail free promotions, and Adventure Ocean programme voted best in cruising.'
      },
      {
        question: 'What is included in a Royal Caribbean holiday?',
        answer: 'All main dining meals (25+ venues), entertainment, kids clubs, pools, gym, most activities included. Extras: drinks packages, speciality dining, internet, spa, excursions, photos. Classic drinks package covers beer, wine, cocktails all day.'
      },
      {
        question: 'How do I join Royal Caribbean\'s loyalty programme?',
        answer: 'Join Crown & Anchor Society free automatically after first cruise. Earn 1 point per night. Gold (3 nights), Platinum (30 nights), Diamond (80 nights), Pinnacle (700 nights). Benefits: onboard credit, priority services, drink specials, exclusive events.'
      },
      {
        question: 'What should I know before booking a Royal Caribbean holiday?',
        answer: 'Smart casual dress (no formal nights), drinks packages essential, US plugs (adapters needed). Book 9-12 months ahead for summer sailings. Ultimate Family Suite popular. Multi-generational appeal with teen hangouts and kids areas. Southampton departures available.'
      }
    ],
    meta: {
      title: 'Royal Caribbean | Adventure Cruises | UK Expert Bookings',
      description: 'Royal Caribbean adventure cruises with expert UK guidance. Oasis, Quantum, Icon class ships. Innovative features, endless entertainment.'
    }
  },
  {
    id: 'msc-cruises',
    slug: 'msc-cruises',
    name: 'MSC Cruises',
    shortName: 'MSC',
    tagline: 'Mediterranean style, global destinations',
    description: 'MSC Cruises is one of the world\'s largest and fastest-growing lines, offering Italian design, modern ships and global itineraries. Guests can sail from the UK or choose fly-cruise packages worldwide. Expect an international atmosphere with family-friendly fun, varied entertainment, and the exclusive Yacht Club for those seeking privacy and relaxation.',
    category: 'mainstream',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'European Style Cruising',
        description: 'MSC offers authentic Mediterranean flair with Italian design, fresh pasta daily, and gelato stations. Ships feature Formula 1 simulators, indoor waterslides, and European-style promenades. Perfect for UK families wanting continental elegance with British departure options from Southampton.',
        icon: 'anchor'
      },
      {
        title: 'Modern Mega-Ships',
        description: 'World\'s newest fleet with LNG-powered Meraviglia class ships carrying 6,000+ guests. Every MSC ship has indoor promenade with LED sky, multiple pools, and high-tech entertainment. Regular class launches keep fleet cutting-edge.',
        icon: 'ship'
      },
      {
        title: 'MSC Yacht Club',
        description: 'Exclusive "ship-within-a-ship" premium experience with private suites, dedicated pool, 24-hour butler service, and dedicated restaurant. Priority embarkation, free premium drinks, and seafront lounge. Luxury enclave on mega-ships.',
        icon: 'luxury'
      },
      {
        title: 'Family-Friendly Design',
        description: 'Built for families with indoor waterslides, LEGO Experience partnerships, indoor sports arenas, and kids clubs from 0-17yrs. Family connecting cabins, family ocean views, and kids stay/sail free promotions. Europe\'s family cruise leader.',
        icon: 'child'
      },
      {
        title: 'Global Destinations',
        description: 'Worldwide network: Caribbean, Mediterranean, Northern Europe, Red Sea, South America, Dubai, and world cruises. Longest Caribbean season from Barbados plus dedicated family fly-cruise packages. Over 300 itineraries yearly.',
        icon: 'destination'
      },
      {
        title: 'Outstanding Value',
        description: 'Easy drinks packages, kids sail free, flexible dining, and MSC Voyagers Club loyalty points. No single supplements on selected sailings and family balconies from £999pp. Best value European mega-ship cruising.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Caribbean beach and turquoise sea' },
      { name: 'Mediterranean',  alt: 'Mediterranean ruins and coastline' },
      { name: 'Middle East',  alt: 'Middle East Dubai skyline' },
      { name: 'Northern Europe',  alt: 'Northern Europe skyline and waterfront' },
      { name: 'Asia & Japan',  alt: 'Cherry blossom path in Japan' },
      { name: 'Grand Voyages',  alt: 'Sunset over the ocean on a Grand Voyage' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Doremi and LEGO® Fun',
      intro: 'MSC Cruises is Europe\'s leading family cruise line with dedicated kids facilities on every ship and innovative club programme for ages 0-17. Chicco Baby Club (0-3yrs), Mini Club (3-6yrs), Junior Club (7-11yrs), Young Club (12-14yrs), and Teens Club (15-17yrs). Every ship has indoor waterslides, splash pools, LEGO Experience rooms, and Formula 1 simulators. Kids sail free on selected sailings and family connecting cabins available. Doremi characters entertain kids daily. Family harbour in Southampton plus fly-cruise options from major UK airports.',
      detail: 'Age-appropriate playrooms, LEGO® play for younger guests, consoles and social lounges for older children, plus daily schedules that vary between sea days and port days. Parents register children once onboard and can check the daily programme in the app or on notice boards. Sign in and out procedures help make drop off and collection simple.',
      quickFacts: [
        'Complimentary programme for ages 0-17',
        'Trained, multilingual youth staff',
        'LEGO® play areas for younger children',
        'Consoles and social lounges for teens',
        'Registration completed onboard'
      ],
      highlights: [
        { title: 'Baby and Mini', description: 'Chicco inspired Baby Club areas and Miniclubs with LEGO play, crafts, music and story time.' },
        { title: 'Junior and Young', description: 'Team games, sports tournaments, talent shows, themed parties and quizzes.' },
        { title: 'Teens', description: 'Lounges with consoles and film nights, dance parties and hosted meet ups.' },
        { title: 'Family time', description: 'Doremiland activities, character moments and movie sessions for all ages.' }
      ],
      ageGroups: [
        { club: 'Baby Club / Baby Time and Baby Care', age: '0-3 years (supervised care from 6 months)', morning: '9:00 am - 12:00 pm', afternoon: '2:00 pm - 5:00 pm', evening: '7:00 pm - 9:00 pm' },
        { club: 'Mini Club', age: '3-6 years', morning: '9:00 am - 12:00 pm', afternoon: '2:00 pm - 5:00 pm', evening: '7:00 pm - 10:00 pm' },
        { club: 'Junior Club', age: '7-11 years', morning: '9:00 am - 12:00 pm', afternoon: '2:00 pm - 5:00 pm', evening: '7:00 pm - 11:00 pm' },
        { club: 'Young Club', age: '12-14 years', morning: '10:00 am - 1:00 pm', afternoon: '3:00 pm - 6:00 pm', evening: '7:00 pm - 11:00 pm' },
        { club: 'Teen Club', age: '15-17 years', morning: '10:00 am - 1:00 pm', afternoon: '3:00 pm - 6:00 pm', evening: '7:00 pm - 11:00 pm' }
      ],
      costsInfo: 'The main Kids Club programme is included in your cruise fare. Registration is completed onboard at the club desk or during open house sessions. Activities and schedules can vary by ship, itinerary and whether the ship is in port or at sea. Some special activities, late night sessions or babysitting services may be chargeable.',
      note: 'Spaces operate to capacity limits for safety. Arrive early for popular sessions. Share allergies, medical needs and authorised pick up adults during registration.'
    },

    // Accessibility info
    accessibility: {
      intro: 'Most cruise lines provide accessible staterooms, embarkation and disembarkation assistance, and onboard support for guests with disabilities or additional needs. Support can include mobility access, sensory assistance and medical equipment guidance. Staff can discuss reasonable adjustments to ensure guests enjoy the ship\'s facilities and activities safely and comfortably. At Limitless Cruises, we can help you review each cruise line\'s accessibility policies, complete any required forms and communicate your needs before sailing.',
      tips: [
        { title: 'Boarding support', description: 'Request wheelchair or assisted boarding ahead of time to ensure smooth embarkation and disembarkation.' },
        { title: 'Cabin arrangements', description: 'Many ships have accessible staterooms with roll-in showers, grab bars and widened doorways. Book early, as these are limited.' },
        { title: 'Dining & activities', description: 'Notify the team of dietary restrictions or sensory considerations so seating or service can be adapted for comfort.' },
        { title: 'Medical & mobility devices', description: 'Bring any required medical aids, chargers and mobility equipment. Ships can usually store wheelchairs or scooters safely in cabins.' },
        { title: 'Excursions', description: 'Ask about accessible tour options and check terrain details in advance. Some ports may use tender boats which are not always step-free.' },
        { title: 'Preparation', description: 'Submit accessibility or special needs forms as early as possible (ideally 60 days before departure) so arrangements are confirmed in writing.' }
      ]
    },

    // Loyalty program - MSC Voyagers Club
    loyaltyProgram: {
      name: 'MSC Voyagers Club',
      intro: 'Discover the exclusive world of the MSC Voyagers Club, designed to reward loyal guests with ever-increasing privileges, savings and special experiences before, during and after your cruise. Compare each tier\'s benefits below, from booking perks to on-board discounts and priority services.',
      pointsInfo: 'Points are earned based on cruise nights sailed. Benefits vary by tier and may be subject to ship and itinerary availability.',
      tiers: [
        { tier: 'Welcome', points: '0', benefits: 'Members\' E-Newsletter, Online Private Area, Luggage identification tag, Voyagers Selection discount up to +15%' },
        { tier: 'Classic', points: '1-2,199', benefits: '5% cruise fare discount, +5% Voyagers Exclusives discount, Double experience points, 10% Logo Shop, 20% Photographs, 10% Digital accessories, 5% Internet, 50% F1 Simulator, 10% SPA services' },
        { tier: 'Silver', points: '2,200-4,299', benefits: 'All Classic benefits, €/$50 Voyagers Exclusives shipboard credit, 10% Laundry package, 10% Minibar' },
        { tier: 'Gold', points: '4,300-9,999', benefits: 'All Silver benefits, Complimentary 1-hour thermal area session, Courtesy bathrobe & slippers, One free F1 Simulator credit, 15% Logo Shop, 20% SPA services' },
        { tier: 'Diamond', points: '10,000-24,999', benefits: 'All Gold benefits, Priority line at check-in, Priority drop-off of luggage, Priority for free cabin upgrade, Priority line assistance, Early access to theatre shows, MSC Voyagers Club Diamond Party, One free picture, Bottle of spumante with macarons, Specialty restaurant dinner, Free bottle of water' },
        { tier: 'Blue Diamond', points: '25,000+', benefits: 'All Diamond benefits, Flexible arrival in port, Yacht Club drop-off luggage, Access to Yacht Club dedicated check-in, Exclusive Pillow Selection, One free shuttle bus ticket, Behind-the-scenes tour, Free Internet "Browse" Package, My Choice dining option, Private Meet & Greet with Captain' }
      ],
      note: 'Voyagers Exclusives benefits & discounts depend on advance-booking period and T&Cs. Some features vary by ship and may carry age/height limits. Members\' event not held on cruises under 4 days.'
    },

    // Simple lists for sidebar/quick reference
    highlights: [
      'Modern fleet with latest technology',
      'MSC Yacht Club luxury experience',
      'Ocean Cay marine reserve',
      'Great value family cruises',
      'Italian design and Mediterranean service',
      'Fly-cruise packages available',
      'Innovative ships including MSC Virtuosa and MSC World Europa'
    ],
    ships: ['MSC World Europa', 'MSC Seascape', 'MSC Virtuosa', 'MSC Grandiosa', 'MSC Seashore', 'MSC Seaview'],
    destinations: ['Mediterranean', 'Caribbean', 'Northern Europe', 'Middle East', 'Asia & Japan', 'Grand Voyages'],
    suitableFor: ['Families', 'Couples', 'Budget-conscious', 'Luxury Seekers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes MSC Cruises different from other cruise lines?',
        answer: 'MSC delivers European mega-ship cruising with Italian design, Yacht Club luxury enclave, and global reach from Europe to world cruises. Unlike British lines, expect continental dining, gelato stations, and indoor waterslides. Best for families wanting modern ships and value.'
      },
      {
        question: 'What destinations does MSC Cruises sail to?',
        answer: 'Global leader: Caribbean (longest season), Mediterranean (300+ ports), Northern Europe, Norwegian fjords, Red Sea, Dubai, South America, Grand Voyages. UK departures from Southampton plus fly-cruises from 12 UK airports. Signature 117-night world cruises.'
      },
      {
        question: 'Is MSC Cruises suitable for families?',
        answer: 'Europe\'s #1 family cruise line - kids clubs 0-17yrs, indoor waterslides on every ship, LEGO Experience rooms, family connecting cabins, and kids sail free promotions. Chicco Baby Club (0-3yrs), Doremi characters, and family harbour days in Southampton.'
      },
      {
        question: 'What is included in an MSC Cruises holiday?',
        answer: 'All main meals, entertainment, kids clubs, pools, gym, most activities included. 24-hour room service (charges apply). Extras: speciality dining, drinks packages, spa, excursions, WiFi, photos. MSC Yacht Club includes premium drinks, butler service.'
      },
      {
        question: 'How do I join MSC Cruises\' loyalty programme?',
        answer: 'Join MSC Voyagers Club free at msc.com or onboard. Earn 100 points per night + onboard spend. Silver status (2,100pts), Gold (10,000pts), Diamond (25,000pts). Benefits: cruise discounts, onboard credit, priority services. Status match available from other lines.'
      },
      {
        question: 'What should I know before booking an MSC Cruises holiday?',
        answer: 'Smart casual dress code (no formal nights), drinks packages recommended, European plug sockets. Best book 6-12 months ahead for summer Med/Caribbean. Family ocean view cabins popular. International passenger mix (50% European), English widely spoken. Southampton departures available.'
      }
    ],
    meta: {
      title: 'MSC Cruises | Mediterranean & Caribbean Cruise Holidays',
      description: 'Book MSC Cruises for Mediterranean elegance at great value. Family-friendly ships, MSC Yacht Club luxury, and exciting destinations with Limitless Cruises.'
    }
  },
  {
    id: 'norwegian-cruise-line',
    slug: 'norwegian-cruise-line',
    name: 'Norwegian Cruise Line',
    shortName: 'NCL',
    tagline: 'Feel free to cruise your way',
    description: 'Norwegian Cruise Line pioneered Freestyle Cruising, offering flexibility with no fixed dining times and a relaxed, resort-style atmosphere.',
    category: 'mainstream',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Freestyle Cruising',
        description: 'No fixed dining times, no formal nights, eat/drink/do whatever whenever. Dine across 20+ venues anytime from 5:30am-1am. Dress casual, live your way - perfect for relaxed British travellers wanting flexibility at sea.',
        icon: 'freedom'
      },
      {
        title: 'Modern Freestyle Ships',
        description: 'Breakaway, Breakaway Plus, and Prima class ships with go-kart tracks (6 decks high), 360° ocean coasters, infinity pools, and largest outdoor LED screens at sea. Every ship purpose-built for freestyle living.',
        icon: 'ship'
      },
      {
        title: 'More Choices Onboard',
        description: '25+ dining venues (most at sea), 12 bars/lounges, Mandara Spa, casino, Broadway shows, and Vibe Beach Club adults-only sun deck. Free kids clubs, go-karts, and laser tag included in fare.',
        icon: 'dining'
      },
      {
        title: 'Family Fun Leader',
        description: 'Splash Academy (3-12yrs), Entourage teen club (13-17yrs), and Guppies nursery (6m-36m). Every ship has ropes courses, water slides, sports complexes, and family entertainment. Kids sail half price.',
        icon: 'child'
      },
      {
        title: 'Private Island Haven',
        description: 'Great Stirrup Cay - Norwegian\'s private Bahamas island with private beach, waterpark, adults-only beach club, and unlimited drinks included. Only cruise line with two private Caribbean islands (Harvest Caye too).',
        icon: 'island'
      },
      {
        title: 'Exceptional Value',
        description: 'Free at Sea package standard: unlimited open bar, speciality dining, WiFi, shore excursion credit, and premium guest services. No solo supplements on all sailings + kids half price.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Caribbean beach and turquoise sea' },
      { name: 'Alaska',  alt: 'Alaska glaciers and mountains' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Northern Europe',  alt: 'Northern Europe waterfront' },
      { name: 'Hawaii',  alt: 'Hawaiian beach and palm trees' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Splash Academy & Entourage',
      intro: 'Norwegian Cruise Line delivers freestyle family cruising with extensive kids facilities, free specialty dining, and flexible schedules perfect for modern families. Guppies (6m-36m), Splash Academy (3-5yrs, 6-12yrs), and Entourage (13-17yrs). Every ship features go-kart tracks, ropes courses, water slides, indoor sports arenas, and family movie nights. Free at Sea includes unlimited drinks for adults. Family funnels, multi-room family suites, and late-night group babysitting. Great Stirrup Cay private island included on most Caribbean sailings.',
      ageGroups: [
        { club: 'Guppies', age: '6m-36m', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-9pm' },
        { club: 'Splash Academy', age: '3-5yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Splash Academy', age: '6-12yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-11pm' },
        { club: 'Entourage', age: '13-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Latitudes Rewards',
      intro: 'Latitudes Rewards - Norwegian\'s simple tiered loyalty programme with instant perks from your first cruise. Join free automatically. Earn 1 Latitude point per night. Bronze (1 night), Silver (10 nights), Gold (25 nights), Platinum (75 nights), Sapphire (150 nights), Diamond (300 nights). Benefits scale with every tier. 7 million members enjoy Norwegian\'s most generous freestyle loyalty benefits with no blackout dates.',
      pointsInfo: 'Key Benefits: Onboard credit (£25 Silver, £150 Diamond per cruise), priority boarding/disembarkation, speciality dining reservations, free drinks hour (Gold+), companion fare discounts, exclusive cocktail parties, suite lounge access (Platinum+).',
      tiers: [
        { tier: 'Bronze', points: '1+ nights', benefits: 'Welcome gift, Latitudes Insider offers' },
        { tier: 'Silver', points: '10+ nights', benefits: 'Onboard credit, priority check-in' },
        { tier: 'Gold', points: '25+ nights', benefits: 'Free drinks hour, priority dining' },
        { tier: 'Platinum', points: '75+ nights', benefits: 'Suite lounge access, speciality dining' },
        { tier: 'Sapphire', points: '150+ nights', benefits: 'Enhanced Platinum benefits' },
        { tier: 'Diamond', points: '300+ nights', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },
    highlights: [
      'Freestyle Cruising - no set dining times',
      'The Haven exclusive ship-within-a-ship',
      'Great Stirrup Cay private island',
      'Award-winning entertainment'
    ],
    ships: ['Norwegian Prima', 'Norwegian Viva', 'Norwegian Encore', 'Norwegian Escape'],
    destinations: ['Caribbean', 'Alaska', 'Mediterranean', 'Northern Europe'],
    suitableFor: ['Couples', 'Solo Travellers', 'Families'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Norwegian Cruise Line different from other cruise lines?',
        answer: 'Freestyle Cruising - no schedules, no formal nights, 25+ dining venues open all day, casual dress code. Go-karts, ocean coasters, and private islands set Norwegian apart. Perfect for relaxed, active families.'
      },
      {
        question: 'What destinations does Norwegian Cruise Line sail to?',
        answer: 'Caribbean (Great Stirrup Cay), Alaska, Europe, Hawaii, Bermuda, Panama Canal, South America, Asia, Australia. Signature 14-night Hawaii inter-island, private island itineraries, and longest Bermuda season from Boston.'
      },
      {
        question: 'Is Norwegian Cruise Line suitable for families?',
        answer: 'Outstanding for families - kids clubs 6m-17yrs, go-karts/rope courses on every ship, free at Sea drinks package, and private island Great Stirrup Cay. Family suites sleep 8+, kids half price, freestyle dining flexibility.'
      },
      {
        question: 'What is included in a Norwegian Cruise Line holiday?',
        answer: 'Main dining rooms, buffet, entertainment, kids clubs, pools, gym, most activities. Free at Sea upgrade adds unlimited drinks, speciality dining, WiFi, excursions. Extras: spa, casino, premium drinks.'
      },
      {
        question: 'How do I join Norwegian Cruise Line\'s loyalty programme?',
        answer: 'Join Latitudes Rewards free automatically after first cruise. Earn 1 point per night. Bronze (1 night), Silver (10 nights), Gold (25 nights), Platinum (75 nights). Benefits: onboard credit, priority services, companion discounts.'
      },
      {
        question: 'What should I know before booking a Norwegian Cruise Line holiday?',
        answer: 'Casual dress (no formal nights), Free at Sea package essential, US plugs onboard. Book 6-12 months ahead for summer. Oceanview balconies popular. International crowd (40% American), English primary. Southampton departures available.'
      }
    ],
    meta: {
      title: 'Norwegian Cruise Line | Freestyle Cruising | UK Expert Bookings',
      description: 'Norwegian Freestyle Cruising with expert UK guidance. The Haven luxury, Great Stirrup Cay. Flexible dining, no set schedules.'
    }
  },
  {
    id: 'disney-cruise-line',
    slug: 'disney-cruise-line',
    name: 'Disney Cruise Line',
    shortName: 'Disney',
    tagline: 'Where magic meets the sea',
    description: 'Disney Cruise Line delivers magical family holidays with world-class entertainment, character experiences, and exceptional service.',
    category: 'premium',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Magical Disney Experience',
        description: 'Disney characters meet-and-greets, Broadway-quality Frozen and Aladdin shows, themed rotational dining with Disney storytelling. Every detail designed for family magic from character breakfasts to fireworks at sea.',
        icon: 'magic'
      },
      {
        title: 'Immersive Themed Ships',
        description: 'Disney Wish, Fantasy, Dream, and Magic class ships with AquaDuck watercoasters, adult-exclusive areas, and movie theatre popcorn. Rotational dining rooms transform nightly with Disney themes and characters.',
        icon: 'ship'
      },
      {
        title: 'World-Class Family Entertainment',
        description: 'Original Disney Broadway productions, live character shows, first-run Disney films in Buena Vista Theatre, and family deck parties. Oceaneer Club/Lab voted best kids clubs worldwide multiple years running.',
        icon: 'entertainment'
      },
      {
        title: 'Split-Age Kids Clubs',
        description: 'Oceaneer Club (3-12yrs) with Marvel Super Hero Academy, Star Wars, and Pixar play. Edge (11-14yrs) and Vibe (14-17yrs) teen clubs. It\'s a Small World Nursery (6m-3yrs). Open sunrise to midnight.',
        icon: 'child'
      },
      {
        title: 'Private Island Castaway Cay',
        description: 'Disney\'s private Bahamas island with family beach, adults-only Serenity Bay, complimentary bikes/kayaks, and adult splash zone. Only cruise line with dedicated kids beach area on private island.',
        icon: 'island'
      },
      {
        title: 'Exceptional Family Value',
        description: 'Rotational dining (no buffet lines), kids sail 25-50% off 3rd/4th guests, zero single supplements select sailings. Disney Visa cardholders get onboard credit and stateroom discounts.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Bahamas',  alt: 'Bahamas beach and turquoise sea' },
      { name: 'Caribbean',  alt: 'Caribbean palm tree beach' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Alaska',  alt: 'Alaska glaciers and mountains' },
      { name: 'Northern Europe',  alt: 'Northern Europe waterfront' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Oceaneer Club & Lab',
      intro: 'Disney Cruise Line delivers the world\'s most magical family cruise experience with the best kids clubs, character entertainment, and family activities on every sailing. Oceaneer Club/Lab (3-12yrs) with Marvel, Pixar, and Disney princess adventures. Edge (11-14yrs) and Vibe (14-17yrs) dedicated teen spaces. It\'s a Small World Nursery (6m-3yrs). Clubs open 7:30pm-midnight with late-night group babysitting. Character meet-and-greets daily, family cabanas on Castaway Cay, and themed kids menus. Ultimate family cruise experience.',
      ageGroups: [
        { club: 'It\'s a Small World Nursery', age: '6m-3yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7:30pm-midnight' },
        { club: 'Oceaneer Club/Lab', age: '3-12yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7:30pm-midnight' },
        { club: 'Edge', age: '11-14yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7:30pm-midnight' },
        { club: 'Vibe', age: '14-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7:30pm-midnight' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Castaway Club',
      intro: 'Disney Cruise Line Castaway Club - Exclusive loyalty programme starting after your second Disney cruise with escalating family benefits. Join automatically after second sailing. Silver (5 points), Gold (50 points), Platinum (75 points), Pearl (200 points), Platinum (250 points). Points earned per night cruised. MagicBand+ integration and family-focused benefits make Disney loyalty unique.',
      pointsInfo: 'Key Benefits: Onboard credit (£50 Silver, £250 Pearl per stateroom), priority booking (75 days advance Gold+, 105 Pearl+), welcome receptions, exclusive merchandise, photo discounts, Castaway Cay cabanas priority (Platinum+).',
      tiers: [
        { tier: 'Silver', points: '5+ points', benefits: 'Onboard credit, welcome gift' },
        { tier: 'Gold', points: '50+ points', benefits: 'Priority booking, enhanced benefits' },
        { tier: 'Platinum', points: '75+ points', benefits: 'Castaway Cay cabanas priority, exclusive events' },
        { tier: 'Pearl', points: '200+ points', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },
    highlights: [
      'Disney character experiences',
      'Award-winning Broadway-style shows',
      'Castaway Cay private island',
      'Adults-only areas and dining'
    ],
    ships: ['Disney Wish', 'Disney Fantasy', 'Disney Dream', 'Disney Magic', 'Disney Wonder'],
    destinations: ['Caribbean', 'Bahamas', 'Mediterranean', 'Alaska'],
    suitableFor: ['Families', 'Disney Fans', 'Multi-generational'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Disney Cruise Line different from other cruise lines?',
        answer: 'Disney storytelling permeates every experience - rotational dining with characters, Broadway shows, kids clubs with Marvel/Pixar, and private island Castaway Cay. Designed by Imagineers for ultimate family magic.'
      },
      {
        question: 'What destinations does Disney Cruise Line sail to?',
        answer: 'Bahamas (Castaway Cay), Caribbean, Mediterranean, Alaska, Northern Europe, Hawaii, Panama Canal, Australia, South Pacific. Signature 7-night Bahamian sailings plus 14-night Mediterranean summer season.'
      },
      {
        question: 'Is Disney Cruise Line suitable for families?',
        answer: 'World\'s best family cruise - kids clubs 6m-17yrs, character meet-and-greets, family entertainment, themed dining, and Castaway Cay kids beach. Oceaneer Club voted #1 worldwide. Perfect ages newborn to grandparents.'
      },
      {
        question: 'What is included in a Disney Cruise Line holiday?',
        answer: 'Rotational dining (3 themed restaurants), snacks, non-alcoholic drinks, kids clubs, entertainment, pools, most activities included. Extras: adult drinks, spa, excursions, specialty coffee, photos.'
      },
      {
        question: 'How do I join Disney Cruise Line\'s loyalty programme?',
        answer: 'Join Castaway Club automatically after second Disney cruise. Earn 1 point per night. Silver (5 points), Gold (50 points), Platinum (75 points). Benefits: onboard credit, priority booking, exclusive events.'
      },
      {
        question: 'What should I know before booking a Disney Cruise Line holiday?',
        answer: 'Disney dress code (smart casual evenings), book 18-24 months ahead, US plugs onboard. Average age 5-65 (family-focused). Character rotations vary by sailing. Southampton charters available seasonally.'
      }
    ],
    meta: {
      title: 'Disney Cruise Line | Magical Family Cruises | UK Expert Bookings',
      description: 'Disney magic at sea with expert UK consultant service. Character experiences, Castaway Cay, Broadway shows. Perfect family holidays.'
    }
  },
  {
    id: 'celebrity-cruises',
    slug: 'celebrity-cruises',
    name: 'Celebrity Cruises',
    shortName: 'Celebrity',
    tagline: 'Modern luxury at sea',
    description: 'Celebrity Cruises offers modern luxury with stylish ships, Michelin-inspired cuisine, and a focus on destination immersion.',
    category: 'premium',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Premium Modern Luxury',
        description: 'Elevated premium experience with Edge-class innovation: Magic Carpet moving lounge, infinite Veranda cabins, and Eden garden venue. Sophisticated design by award-winning interior teams. Perfect for discerning travellers seeking luxury without ultra-luxury prices.',
        icon: 'luxury'
      },
      {
        title: 'Revolutionary Edge Class',
        description: 'World\'s most innovative ships with 17-deck Magic Carpet platform, 20:1 passenger-space ratio, and largest suites at sea. Infinite Verandas, Rooftop Garden, and Eden theatre redefine premium cruising.',
        icon: 'ship'
      },
      {
        title: 'Michelin-Starred Dining',
        description: 'Main dining by Master Chef Michel Roux Jr, Tuscan Grille steakhouse, and Le Petit Chef digital dining experience. AquaClass spa cabins with exclusive Blu restaurant. Elevated culinary focus.',
        icon: 'dining'
      },
      {
        title: 'Award-Winning Service',
        description: 'Retreat - ship-within-ship luxury with dedicated suites, lounge, restaurant, and sundeck. World\'s highest crew-to-passenger ratio in premium category. Multiple service excellence awards.',
        icon: 'service'
      },
      {
        title: 'Destination Immersion',
        description: 'Longer port stays, overnight calls, and immersive itineraries visiting 300+ destinations. Signature Galapagos expeditions, Alaska Inside Passage, and Mediterranean deep dives. Travel for destinations first.',
        icon: 'destination'
      },
      {
        title: 'Exceptional Value',
        description: 'All-Inclusive packages (drinks, WiFi, tips, speciality dining), Always Included fare structure, and flexible suite upgrades. Best value premium cruising with no nickel-and-diming.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Caribbean turquoise waters' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Alaska',  alt: 'Alaska glaciers and mountains' },
      { name: 'Galapagos',  alt: 'Galapagos wildlife' },
      { name: 'Northern Europe',  alt: 'Northern Europe waterfront' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Camp at Sea',
      intro: 'Celebrity Cruises offers sophisticated family travel with Camp at Sea kids programme for ages 3-17 plus teen spaces on every ship. Camp at Sea (3-11yrs) with STEM activities, arts, and sports. Teen Club (12-17yrs) with video games, movies, and social events. Family-friendly yet refined atmosphere perfect for multi-generational holidays. Supervised late-night group babysitting, family trivia nights, and family-friendly shore excursions. Retreat suites offer adult luxury while kids enjoy dedicated spaces.',
      ageGroups: [
        { club: 'Camp at Sea', age: '3-5yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Camp at Sea', age: '6-11yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Teen Club', age: '12-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Captain\'s Club',
      intro: 'Captain\'s Club - Celebrity\'s tiered loyalty programme rewarding every cruise with status perks and suite benefits. Join free after first cruise. Earn points per night cruised. Classic (2 nights), Select (15 nights), Elite (30 nights), Elite Plus (55 nights), Zenith (200 nights), Enyaq (750 nights). 3 million members enjoy premium loyalty benefits with generous suite upgrade opportunities.',
      pointsInfo: 'Key Benefits: Onboard credit (£25 Elite, £150 Zenith per cruise), priority tendering, spa reservations, suite lounge access, complimentary drinks hour (Elite+), laundry discounts, exclusive members events, double points promotions.',
      tiers: [
        { tier: 'Classic', points: '2+ nights', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Select', points: '15+ nights', benefits: 'Priority check-in, discounts' },
        { tier: 'Elite', points: '30+ nights', benefits: 'Onboard credit, drinks hour' },
        { tier: 'Elite Plus', points: '55+ nights', benefits: 'Enhanced Elite benefits, suite perks' },
        { tier: 'Zenith', points: '200+ nights', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },
    highlights: [
      'Award-winning cuisine',
      'The Retreat - suite class experience',
      'Destination-focused itineraries',
      'Modern, elegant ship design'
    ],
    ships: ['Celebrity Beyond', 'Celebrity Apex', 'Celebrity Edge', 'Celebrity Eclipse'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Galapagos'],
    suitableFor: ['Couples', 'Foodies', 'Luxury Seekers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Celebrity Cruises different from other cruise lines?',
        answer: 'Premium modern luxury with Edge-class innovation (Magic Carpet, Infinite Verandas), Michelin-starred dining, and Retreat ship-within-ship concept. Elevated design and service without ultra-luxury pricing.'
      },
      {
        question: 'What destinations does Celebrity Cruises sail to?',
        answer: 'Caribbean, Alaska, Mediterranean, Galapagos expeditions, Bermuda, Northern Europe, Asia, Australia, South America. Signature overnight stays, longer port times, and immersive itineraries visiting 300+ destinations.'
      },
      {
        question: 'Is Celebrity Cruises suitable for families?',
        answer: 'Sophisticated family choice - Camp at Sea kids clubs (3-17yrs), teen spaces, family entertainment, and multi-generational appeal. Retreat offers adult luxury while kids enjoy dedicated programming.'
      },
      {
        question: 'What is included in a Celebrity Cruises holiday?',
        answer: 'All main meals, entertainment, kids clubs, pools, gym included. Always Included packages add drinks, WiFi, tips. Extras: speciality dining, spa, excursions, premium drinks. Retreat includes butler service.'
      },
      {
        question: 'How do I join Celebrity Cruises\' loyalty programme?',
        answer: 'Join Captain\'s Club free after first cruise. Earn points per night. Classic (2 nights), Select (15 nights), Elite (30 nights), Elite Plus (55 nights). Benefits: onboard credit, priority services, suite perks.'
      },
      {
        question: 'What should I know before booking a Celebrity Cruises holiday?',
        answer: 'Evening Chic dress code (smart casual), Always Included packages recommended, US plugs onboard. Book 12-18 months ahead for Edge-class sailings. Multi-generational appeal (average age 45-70). Southampton charters available.'
      }
    ],
    meta: {
      title: 'Celebrity Cruises | Modern Luxury | UK Expert Bookings',
      description: 'Celebrity modern luxury with expert UK consultant service. Award-winning dining, Edge-class ships, stunning destinations.'
    }
  },
  {
    id: 'fred-olsen',
    slug: 'fred-olsen-cruises',
    name: 'Fred. Olsen Cruise Lines',
    shortName: 'Fred. Olsen',
    tagline: 'Smaller ships for a more personal experience',
    description: 'Fred. Olsen offers intimate cruising on smaller ships with friendly British service and access to smaller ports that larger ships cannot reach. Family-owned for five generations, they specialise in no-fly cruises from multiple UK regional ports including Southampton, Liverpool, Newcastle, Dover, and Edinburgh.',
    category: 'mainstream',
    featured: true, // Important for UK market
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Small Ship Excellence',
        description: 'Intimate ships (800-1,400 guests) get closer to destinations with unique itineraries and overnight stays. No huge queues, personal service, and ships that fit everywhere from Scottish islands to Antarctic fjords. Traditional British cruising at its best.',
        icon: 'ship'
      },
      {
        title: 'Destination Immersion',
        description: 'Signature Scenic Discovery itineraries with overnight ports, late stays, and unique routes other lines can\'t access. Bolette and Borealis visit remote Scottish islands, Arctic Norway, and exclusive Antarctic calls. Travel for the destinations first.',
        icon: 'destination'
      },
      {
        title: 'Traditional British Style',
        description: 'Classic cruise experience with black tie nights, afternoon tea, guest speakers, and single-seaters at every table. British officers, familiar cuisine, and no tipping culture. Perfect for mature travellers seeking elegance and familiarity.',
        icon: 'heritage'
      },
      {
        title: 'Exceptional Service',
        description: '15+ crew per guest ratio delivers personalised service. Named waiters, cabin stewards knowing your name, and attentive service throughout. Multiple awards for service excellence and passenger satisfaction.',
        icon: 'service'
      },
      {
        title: 'British Isles Specialist',
        description: 'UK\'s leading British Isles cruise line with 50+ Scottish island calls yearly. Signature Hebridean and Orkney itineraries plus cruises around England, Ireland, and Wales. Home ports Southampton, Newcastle, Rosyth, Liverpool.',
        icon: 'uk'
      },
      {
        title: 'Outstanding Value',
        description: 'No solo supplements on all sailings, all-inclusive fares (tips, tea/coffee, most excursions included), and flexible dining. Best value small-ship cruising with no nickel-and-diming.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'British Isles',  alt: 'British Isles coastline' },
      { name: 'Norwegian Fjords',  alt: 'Norwegian fjord landscape' },
      { name: 'Scandinavia',  alt: 'Scandinavian coastline' },
      { name: 'Baltic Capitals',  alt: 'Colourful Baltic waterfront' },
      { name: 'Canary Islands',  alt: 'Canary Islands volcanic landscape' }
    ],

    // Kids Club section - Adults-only (16+)
    kidsClub: null, // Fred. Olsen is adults-only, no kids clubs

    accessibility: {
      intro: 'Fred. Olsen\'s smaller ships offer a more accessible experience with less walking required. Wheelchair-accessible cabins are available, and the intimate size means crew can provide more personalised assistance.',
      tips: [
        { title: 'Accessible cabins', description: 'Limited accessible cabins available - book early to secure.' },
        { title: 'Smaller ship benefits', description: 'Less walking between venues compared to mega-ships.' },
        { title: 'Port access', description: 'Some smaller ports may use tender boats - discuss accessibility needs when booking.' },
        { title: 'Mobility aids', description: 'Wheelchairs and scooters can be accommodated in cabins and public areas.' },
        { title: 'Dietary needs', description: 'Galley team accommodates special diets with advance notice.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Fred. Olsen Rewards',
      intro: 'Fred. Olsen Rewards - Simple membership programme with instant benefits for every cruise booked. Join free online or at booking. Earn 3% Rewards Vouchers on every booking (redeemable on future cruises). No tiers or points tracking - every cruiser gets same benefits. Straightforward loyalty with no complex tiers - benefits from first cruise.',
      pointsInfo: 'Key Benefits: 3% Rewards Voucher on every booking (redeem on future sailings), members-only early booking discounts, priority customer service line, exclusive members offers and newsletters.',
      tiers: [
        { tier: 'Member', points: 'All cruisers', benefits: '3% Rewards Voucher, early booking discounts, priority service' }
      ]
    },

    highlights: [
      'Small ship cruising (800-1,400 guests) for intimate atmosphere',
      'Multiple UK regional departures - Southampton, Liverpool, Newcastle, Dover, Rosyth',
      'Access to unique smaller ports and scenic harbours',
      'No single supplement on many sailings - excellent for solo travellers',
      'British family-owned for five generations',
      'Pounds sterling onboard with no tipping required',
      'Expert on Norwegian Fjords and scenic cruising routes',
      'Friendly crew who remember you by name'
    ],
    ships: ['Bolette', 'Borealis'],
    destinations: ['Norwegian Fjords', 'Baltic Capitals', 'Mediterranean', 'British Isles', 'Canary Islands', 'Iceland & Arctic', 'Caribbean'],
    suitableFor: ['Solo Travellers', 'Couples', 'Mature Travellers', 'First-Time Cruisers', 'Those Avoiding Flights'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Fred. Olsen Cruises different from other cruise lines?',
        answer: 'Small ships (800-1,400 guests) access unique destinations with overnight stays and Scenic Discovery itineraries. Traditional British style with black tie nights, no tipping, and personal service. Perfect for mature travellers valuing destinations over onboard razzmatazz.'
      },
      {
        question: 'What destinations does Fred. Olsen Cruises sail to?',
        answer: 'British Isles specialist (50+ Scottish calls), Norwegian fjords, Scandinavia, Baltic, Canary Islands, Mediterranean, Iceland/Greenland, and Antarctic expeditions. Signature Hebridean cruises and world cruises visiting Japan, New Zealand, South America.'
      },
      {
        question: 'Is Fred. Olsen Cruises suitable for families?',
        answer: 'Adults-only experience (16+ minimum) perfect for mature travellers, couples, and multi-generational groups. No kids clubs but sophisticated entertainment, guest speakers, and destination focus appeals to discerning grandparents with adult children.'
      },
      {
        question: 'What is included in a Fred. Olsen Cruises holiday?',
        answer: 'All meals, entertainment, most excursions, tips, tea/coffee included. No nickel-and-diming. Extras: premium drinks, spa treatments, speciality coffees. All-inclusive philosophy with excellent value.'
      },
      {
        question: 'How do I join Fred. Olsen Cruises\' loyalty programme?',
        answer: 'Join Fred. Olsen Rewards free at fredolsencruises.com. Earn 3% Rewards Voucher on every booking automatically. No tiers - every member gets same benefits from first cruise. Redeem on future sailings.'
      },
      {
        question: 'What should I know before booking a Fred. Olsen Cruises holiday?',
        answer: 'Black tie nights (smart formal wear), average age 55-75, British currency onboard. Book 12-18 months ahead for popular fjords/Hebridean sailings. Balcony cabins recommended for scenery. Multiple UK departure ports (Southampton, Newcastle, Rosyth, Liverpool).'
      }
    ],
    meta: {
      title: 'Fred. Olsen Cruises | Small Ship UK Cruising from Regional Ports',
      description: 'Discover Fred. Olsen Cruise Lines for intimate small ship cruising from UK regional ports. Perfect for solo travellers. Book with Limitless Cruises.'
    }
  },
  {
    id: 'holland-america',
    slug: 'holland-america-line',
    name: 'Holland America Line',
    shortName: 'Holland America',
    tagline: 'A signature of excellence',
    description: 'Holland America Line combines classic elegance with modern amenities, offering enriching destination experiences and refined dining. With over 150 years of heritage, their mid-sized ships provide the perfect balance between intimacy and variety, particularly excelling in Alaska and world cruise itineraries.',
    category: 'premium',
    featured: true, // Upgraded to featured as per user priority
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Classic Premium Cruising',
        description: 'Traditional elegance with 150+ years experience - tuxedo nights, classical music, guest lecturers, and afternoon tea. Mid-size ships offer personal service and refined atmosphere perfect for discerning British travellers.',
        icon: 'heritage'
      },
      {
        title: 'Mid-Size Elegant Fleet',
        description: 'Nine premium ships (1,400-2,600 guests) with wraparound promenades, classic teak decks, and Music Walk entertainment district. Pinnacle Class innovation with largest Vista suites at sea. Perfect ship size.',
        icon: 'ship'
      },
      {
        title: 'Culinary Excellence',
        description: 'Pinnacle Grill steakhouse, Tamarind Asian fusion, Canaletto Italian, and main dining by America\'s Test Kitchen. Fresh seafood emphasis, no surcharges for specialty breakfast, and extensive wine list.',
        icon: 'dining'
      },
      {
        title: 'Enrichment-Focused',
        description: 'BBC Earth Experiences, Explorations Central lectures, Digital Workshop computer classes, and Live@Sea music concerts. World\'s leading culinary and cultural enrichment at sea with partnerships.',
        icon: 'experience'
      },
      {
        title: 'Alaska & Canada Specialist',
        description: 'Glacier Bay National Park monopoly, Inside Passage expertise, 75+ years Alaskan experience. Signature 7-night Gulf of Alaska, 14-night Inside Passage roundtrip sailings with park ranger programs.',
        icon: 'destination'
      },
      {
        title: 'Exceptional Value',
        description: 'Have It All package (drinks, WiFi, dining, gratuities), Mariner Society loyalty benefits, and flexible suite upgrades. Best value premium cruising with no nickel-and-diming.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Alaska',  alt: 'Alaska glacier and mountains' },
      { name: 'Canada & New England',  alt: 'Canadian coastline' },
      { name: 'Caribbean',  alt: 'Caribbean turquoise waters' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastal village' },
      { name: 'Northern Europe',  alt: 'Northern Europe colourful waterfront' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Club HAL',
      intro: 'Holland America offers Club HAL kids programme for ages 3-17 plus family-friendly enrichment perfect for multi-generational holidays. Club HAL (3-6yrs, 7-12yrs, 13-17yrs) with arts, crafts, sports, and dance parties. Family movie nights, kids menus, and family shore excursions. Sophisticated yet welcoming for grandparents with grandchildren. Family staterooms, kids sail 30% off 3rd/4th guests, supervised late-night group babysitting. Alaska family favourite.',
      ageGroups: [
        { club: 'Club HAL', age: '3-6yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Club HAL', age: '7-12yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Club HAL', age: '13-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    // Accessibility info
    accessibility: {
      intro: 'Holland America Line provides accessible staterooms with roll-in showers, grab bars, and lowered fixtures. Ships have accessible public areas, and the line works with guests to accommodate mobility, visual, and hearing needs.',
      tips: [
        { title: 'Accessible cabins', description: 'Wheelchair-accessible staterooms available in various categories. Book early as availability is limited.' },
        { title: 'Shore excursions', description: 'Accessible tours available in many ports. Shore excursion team can advise on accessibility.' },
        { title: 'Mobility equipment', description: 'Ships can accommodate wheelchairs and scooters. Contact the Access Office before sailing.' },
        { title: 'Hearing assistance', description: 'Assistive listening devices, visual alerts, and TTY phones available upon request.' },
        { title: 'Special diets', description: 'Dietary accommodations handled with advance notice.' }
      ]
    },

    // Loyalty program - Mariner Society
    loyaltyProgram: {
      name: 'Mariner Society',
      intro: 'The Mariner Society rewards loyal guests with cruise credits, discounts, and exclusive benefits. Points accumulate based on cruise nights sailed, with five membership tiers offering increasing perks.',
      pointsInfo: '1 point per cruise day. Benefits vary by tier and ship.',
      tiers: [
        { tier: 'Star Mariner', points: '1-74 days', benefits: 'Welcome back gift, member-only offers' },
        { tier: '2-Star Mariner', points: '75-149 days', benefits: 'Priority boarding, specialty dining discount' },
        { tier: '3-Star Mariner', points: '150-299 days', benefits: 'Enhanced cabin amenities, cocktail party invite' },
        { tier: '4-Star Mariner', points: '300-499 days', benefits: 'Suite upgrades (when available), laundry credit' },
        { tier: '5-Star Mariner', points: '500+ days', benefits: 'Pinnacle Suite perks, wine package, increased discounts' }
      ]
    },

    highlights: [
      'Music Walk entertainment with B.B. King\'s Blues Club and Lincoln Center Stage',
      'Explorations Central (EXC) destination experiences and shore excursions',
      'Award-winning Pinnacle Grill steakhouse and specialty dining',
      'Alaska specialists with over 75 years of experience',
      'Elegant mid-sized ships (1,400-2,600 guests)',
      'Exceptional world cruises and grand voyages',
      'O, The Oprah Magazine spa partnership',
      'America\'s Test Kitchen culinary programming'
    ],
    ships: ['Rotterdam', 'Nieuw Statendam', 'Koningsdam', 'Nieuw Amsterdam', 'Eurodam', 'Oosterdam', 'Westerdam', 'Zuiderdam', 'Volendam'],
    destinations: ['Alaska', 'Caribbean', 'Northern Europe', 'Mediterranean', 'World Cruises', 'Australia & New Zealand', 'Canada & New England', 'Panama Canal'],
    suitableFor: ['Mature Travellers', 'Couples', 'Music Lovers', 'Alaska Enthusiasts', 'World Cruise Seekers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Holland America Line different from other cruise lines?',
        answer: 'Classic premium elegance with mid-size ships, culinary excellence (America\'s Test Kitchen), and world-class enrichment (BBC Earth). Perfect for mature travellers valuing service, destinations, and sophistication.'
      },
      {
        question: 'What destinations does Holland America Line sail to?',
        answer: 'Alaska specialist (Glacier Bay monopoly), Canada/New England, Caribbean, Europe, South America, Asia, Australia, world cruises. Signature 7-night Glacier Bay Inside Passage, 128-night Grand World Voyage.'
      },
      {
        question: 'Is Holland America Line suitable for families?',
        answer: 'Excellent multi-generational choice - Club HAL kids clubs (3-17yrs), family enrichment, kids 30% off, and sophisticated grandparents appeal. Alaska family favourite with ranger programs.'
      },
      {
        question: 'What is included in a Holland America Line holiday?',
        answer: 'All main meals, entertainment, kids clubs, pools, gym included. Have It All package adds drinks, WiFi, dining, gratuities. Extras: spa, casino, premium drinks, excursions.'
      },
      {
        question: 'How do I join Holland America Line\'s loyalty programme?',
        answer: 'Join Mariner Society free automatically after first cruise. Earn 1 point per night. 1-Star (1 night), 2-Star (30 nights), 3-Star (75 nights). Benefits: onboard credit, priority services, suite perks.'
      },
      {
        question: 'What should I know before booking a Holland America Line holiday?',
        answer: 'Gala nights (formal black tie), average age 55-75, US plugs onboard. Book 12-18 months ahead for Alaska/Europe. Wraparound promenade decks popular. Sophisticated British/European appeal.'
      }
    ],
    meta: {
      title: 'Holland America Line | Premium Alaska & World Cruises',
      description: 'Experience elegant cruising with Holland America Line. Alaska specialists, Music Walk entertainment, refined dining. Book with Limitless Cruises.'
    }
  },
  {
    id: 'marella',
    slug: 'marella-cruises',
    name: 'Marella Cruises',
    shortName: 'Marella',
    tagline: 'All-inclusive cruise holidays',
    description: 'Marella Cruises, part of TUI UK, offers exceptional value all-inclusive cruising with flights, drinks, and gratuities included. With both family-friendly and adults-only ships, Marella makes cruising simple with a truly hassle-free experience.',
    category: 'mainstream',
    featured: true, // Popular UK cruise line
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'All-Inclusive Excellence',
        description: 'Everything included: unlimited drinks (100+ brands), all meals (tips/speciality dining), flights/transfers from 18 UK airports. No nickel-and-diming - perfect for stress-free British holidays with everything covered upfront.',
        icon: 'value'
      },
      {
        title: 'Modern All-Inclusive Fleet',
        description: 'Nine contemporary ships from family-friendly Marella Explorer 2 to adults-only Celebration class. Every ship offers Marella Spa, Broadway-style shows, and British-style pubs. Regular refits keep fleet fresh.',
        icon: 'ship'
      },
      {
        title: 'UK Fly-Cruise Specialist',
        description: '18 UK departure airports (no Southampton queues). Door-to-door transfers included from all-inclusive fare. Easy access from Scotland, Wales, Northern Ireland - Britain\'s most convenient cruise operator.',
        icon: 'flights'
      },
      {
        title: 'Family-Friendly Holidays',
        description: 'Marella Kids Clubs (3-6yrs, 7-11yrs, 12-17yrs), family entertainment, kids pools, and interconnecting cabins. Kids clubs open sunrise to sunset with professional staff. Family balconies and kids stay/eat free promotions.',
        icon: 'child'
      },
      {
        title: 'Mediterranean Specialist',
        description: '300+ days sailing Greece, Turkey, Croatia, Spain, Italy yearly. Signature 7-night Greek Islands, Dalmatian Coast, and Canary Islands itineraries. Best value Med cruising from UK airports.',
        icon: 'destination'
      },
      {
        title: 'Adults-Only Options',
        description: 'Celebration, Explorer, and Dream class ships offer child-free relaxation. Themed cruises (wine, wellness, music) with sophisticated entertainment. Perfect for couples seeking peaceful all-inclusive escapes.',
        icon: 'adults'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Mediterranean',  alt: 'Mediterranean coastal village' },
      { name: 'Canary Islands',  alt: 'Canary Islands volcanic landscape' },
      { name: 'Caribbean',  alt: 'Caribbean palm tree beach' },
      { name: 'Norwegian Fjords',  alt: 'Norwegian fjord landscape' },
      { name: 'Adriatic',  alt: 'Croatian coastline' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Marella Kids Clubs',
      intro: 'Marella Cruises offers dedicated kids clubs on family ships plus adults-only options - flexible choice for all holiday types. Chill Out Zone (3-6yrs), The Workshop (7-11yrs), and The Hangout (12-17yrs). Every family ship has kids pools, family entertainment, and interconnecting cabins. Kids clubs open 9am-10pm with professional activities. Adults-only ships (Celebration, Explorer, Dream) offer child-free relaxation. Family ships: Tui Discovery 2, Explorer 2, Discovery. Flexible choice for all budgets and preferences.',
      ageGroups: [
        { club: 'Chill Out Zone', age: '3-6yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'The Workshop', age: '7-11yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'The Hangout', age: '12-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    accessibility: {
      intro: 'Marella Cruises offer accessible cabins on all ships with roll-in showers and other adaptations. TUI\'s access team can assist with arranging accessible transfers and shore excursions.',
      tips: [
        { title: 'Accessible cabins', description: 'Wheelchair-accessible staterooms available across ship categories.' },
        { title: 'Inclusive flights', description: 'TUI arranges accessible airport assistance as part of your package.' },
        { title: 'Shore excursions', description: 'Accessible tours available in many destinations.' },
        { title: 'Mobility equipment', description: 'Ships can accommodate wheelchairs and mobility aids.' },
        { title: 'Dietary needs', description: 'All-inclusive dining accommodates special diets.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'My Marella Club',
      intro: 'My Marella Club - Generous loyalty programme rewarding repeat cruisers with instant cabin discounts and exclusive benefits. Join free online or at booking. Earn Status Points per cruise. Bronze (1 cruise), Silver (3 cruises), Gold (6 cruises), Platinum (10 cruises). Discounts increase with every tier. Over 500,000 members enjoy Marella\'s generous all-inclusive loyalty benefits.',
      pointsInfo: 'Key Benefits: Cabin discounts: 5% Silver, 10% Platinum on future bookings, priority boarding and customer service, exclusive members fares and early booking access, onboard spending credit and spa discounts (Gold+).',
      tiers: [
        { tier: 'Bronze', points: '1 cruise', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Silver', points: '3 cruises', benefits: '5% cabin discount, priority boarding' },
        { tier: 'Gold', points: '6 cruises', benefits: 'Enhanced Silver benefits, spa discounts' },
        { tier: 'Platinum', points: '10 cruises', benefits: '10% cabin discount, exclusive fares' }
      ]
    },

    highlights: [
      'All-inclusive: drinks, flights, and gratuities included',
      'Part of TUI UK with ATOL protection',
      'Adults-only ships (Voyager, Explorer) or family-friendly options',
      'Flights from multiple UK regional airports',
      'No tipping or hidden costs',
      'West End-style entertainment included',
      'Relaxed dress code - smart casual is fine',
      'Popular with first-time cruisers for simplicity'
    ],
    ships: ['Marella Voyager (Adults Only)', 'Marella Explorer (Adults Only)', 'Marella Discovery (Family)', 'Marella Discovery 2 (Family)'],
    destinations: ['Mediterranean', 'Caribbean', 'Canary Islands', 'Arabian Gulf', 'Adriatic'],
    suitableFor: ['Families', 'Couples', 'Adults-Only Seekers', 'First-Time Cruisers', 'Budget-Conscious'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Marella Cruises different from other cruise lines?',
        answer: 'True all-inclusive (drinks/meals/flights/transfers), 18 UK departure airports, and adults-only ship options. No surprises at checkout - everything included upfront. Britain\'s easiest, most convenient cruise holiday.'
      },
      {
        question: 'What destinations does Marella Cruises sail to?',
        answer: 'Mediterranean specialist (Greece, Turkey, Croatia, Spain), Canary Islands, Norwegian fjords, Caribbean. Signature 7-night Greek Islands from Palma, Dalmatian Coast cruises, and winter Canaries sailings.'
      },
      {
        question: 'Is Marella Cruises suitable for families?',
        answer: 'Excellent family choice on Discovery 2/Explorer 2 ships - kids clubs 3-17yrs, family entertainment, interconnecting cabins. Adults-only options (Celebration, Explorer, Dream) for child-free holidays. Flexible for all.'
      },
      {
        question: 'What is included in a Marella Cruises holiday?',
        answer: 'Everything: unlimited house drinks (100+ brands), all meals including speciality, flights/transfers, tips, entertainment, kids clubs, gym, pools. Extras: premium drinks, spa, excursions, WiFi.'
      },
      {
        question: 'How do I join Marella Cruises\' loyalty programme?',
        answer: 'Join My Marella Club free at marella.co.uk. Earn Status Points per cruise. Bronze (1 cruise), Silver (3), Gold (6), Platinum (10). Benefits: cabin discounts (5-10%), priority services, exclusive fares.'
      },
      {
        question: 'What should I know before booking a Marella Cruises holiday?',
        answer: 'All-inclusive (no extras), smart casual dress (no formal nights), UK plugs onboard. Book 9-15 months ahead for summer Med. 18 UK airports - no Southampton queues. Average age 35-65, relaxed British atmosphere.'
      }
    ],
    meta: {
      title: 'Marella Cruises | All-Inclusive TUI Cruise Holidays',
      description: 'Book Marella Cruises - truly all-inclusive with flights, drinks & tips included. Adults-only and family ships. Book with Limitless Cruises.'
    }
  },
  {
    id: 'virgin-voyages',
    slug: 'virgin-voyages-cruises',
    name: 'Virgin Voyages',
    shortName: 'Virgin',
    tagline: 'Rebelliously different cruising',
    description: 'Virgin Voyages offers an adults-only, design-forward cruise experience that challenges traditional cruising conventions.',
    category: 'contemporary',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Adults-Only RockStar Experience',
        description: '18+ only sailings with no kids, no buffets, no formal nights. DJ-led parties, tattoo parlours, world-class fitness studios, and 20+ eateries with no reservations needed. Virgin\'s bold reimagining of cruising.',
        icon: 'adults'
      },
      {
        title: 'Award-Winning Design',
        description: 'Boutique hotel ships designed by supermodels, rockstars, and Michelin chefs. Red Room cabaret theatre, The Manor nightclub, Athletic Club gym, and private social clubs. Most Instagrammable ships at sea.',
        icon: 'design'
      },
      {
        title: 'Michelin-Level Dining',
        description: 'Six complimentary restaurants including Test Kitchen (molecular gastronomy), Razzle Dazzle (drag queen brunch), and Pink Agave (Mexican). No buffets - all table service with dietary accommodations.',
        icon: 'dining'
      },
      {
        title: 'Fitness & Wellness Focus',
        description: 'World-class B-Complex gym, yoga studios, running track, and spa with 360° massage tables. Fitness classes included (pilates, HIIT, boxing). Health-conscious menus and no-sugar-added cocktails.',
        icon: 'fitness'
      },
      {
        title: 'Epic Sea Parties',
        description: 'Scarlet Night pool parties, silent disco, live music, and Festival Stage entertainment. World\'s first tattoo parlour at sea and nightly drag shows. Party like a Virgin - responsibly.',
        icon: 'entertainment'
      },
      {
        title: 'Exceptional Value',
        description: 'All-inclusive: premium WiFi, laundry, fitness classes, gratuities, group fitness, all dining included. Bar Tab drinks packages. Best value adults-only cruising with no hidden fees.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Caribbean',  alt: 'Caribbean turquoise waters' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Australia',  alt: 'Australian coastline' },
      { name: 'New Zealand',  alt: 'New Zealand landscape' }
    ],

    // Kids Club section - Adults-only (18+)
    kidsClub: null, // Virgin Voyages is adults-only, no kids clubs
    highlights: [
      'Adults-only ships',
      'All restaurants included',
      'No main dining room',
      'Rockstar Suites with private karaoke'
    ],
    // Loyalty program
    loyaltyProgram: {
      name: 'Virgin Voyagers Club',
      intro: 'Virgin Voyagers Club - Simple loyalty programme rewarding every cruise with instant status and VIP benefits. Join free automatically after first booking. Red, Silver, Gold, Platinum tiers based on nights cruised. Benefits available from first sailing. Virgin\'s generous adults-only loyalty with instant gratification.',
      pointsInfo: 'Key Benefits: Onboard credit (£50 Silver, £250 Platinum per cruise), priority boarding, restaurant access, spa bookings, exclusive events, VIP nightclub access, cabin upgrades, double loyalty points events and status matching.',
      tiers: [
        { tier: 'Red', points: 'First cruise', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Silver', points: '2+ cruises', benefits: 'Onboard credit, priority services' },
        { tier: 'Gold', points: '5+ cruises', benefits: 'Enhanced Silver benefits, VIP access' },
        { tier: 'Platinum', points: '10+ cruises', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },

    ships: ['Scarlet Lady', 'Valiant Lady', 'Resilient Lady', 'Brilliant Lady'],
    destinations: ['Caribbean', 'Mediterranean', 'Australia'],
    suitableFor: ['Adults Only', 'Couples', 'Millennials', 'Party Seekers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Virgin Voyages different from other cruise lines?',
        answer: 'Adults-only (18+) with no kids, no buffets, no formal nights. Boutique hotel design, Michelin dining, tattoo parlours, and late-night parties. Virgin\'s disruptive approach to cruising for modern adults.'
      },
      {
        question: 'What destinations does Virgin Voyages sail to?',
        answer: 'Caribbean (Bimini private island), Mediterranean, Australia, New Zealand. Signature 4-5 night weekend getaways plus 7-14 night itineraries. Adults-only private destination The Beach Club at Bimini.'
      },
      {
        question: 'Is Virgin Voyages suitable for families?',
        answer: 'Adults-only experience (18+ minimum) perfect for couples, friends groups, and solo travellers. No kids clubs or family facilities - designed exclusively for child-free adult holidays and celebrations.'
      },
      {
        question: 'What is included in a Virgin Voyages holiday?',
        answer: 'All dining (6 restaurants), premium WiFi, fitness classes, gratuities, laundry, group workouts. Extras: drinks (Bar Tab), spa, shore excursions. No reservations needed for dining.'
      },
      {
        question: 'How do I join Virgin Voyages\' loyalty programme?',
        answer: 'Join Virgin Voyagers Club free automatically after first booking. Red, Silver, Gold, Platinum tiers. Benefits: onboard credit, priority services, VIP events from first cruise. Status matching available.'
      },
      {
        question: 'What should I know before booking a Virgin Voyages holiday?',
        answer: 'Adults-only (18+), casual dress (no formal wear), US plugs onboard. Book 6-12 months ahead for popular Caribbean sailings. High-energy social atmosphere, perfect 30-55 age group. Southampton charters available.'
      }
    ],
    meta: {
      title: 'Virgin Voyages | Adults-Only Modern Cruise Holidays',
      description: 'Experience Virgin Voyages - adults-only cruising that\'s rebelliously different. Book with Limitless Cruises.'
    }
  },
  {
    id: 'viking',
    slug: 'viking-cruises',
    name: 'Viking',
    shortName: 'Viking',
    tagline: 'The thinking person\'s cruise',
    description: 'Viking offers destination-focused ocean and river cruises for curious travellers who want to explore the world thoughtfully. With elegant Scandinavian design, adults-only ships, and enriching cultural experiences, Viking has redefined what cruising can be.',
    category: 'luxury',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Adults-Only Luxury Experience',
        description: 'No children under 18 - sophisticated small-ship cruising for discerning travellers. Inclusive luxury with no nickel-and-diming, destination-focused itineraries, and exceptional service standards.',
        icon: 'adults'
      },
      {
        title: 'Small Longships Fleet',
        description: 'Award-winning Viking Longships (190 guests) with all-veranda staterooms, revolutionary all-outside design, and French balconies on every cabin. Purpose-built for Europe\'s rivers and oceans.',
        icon: 'ship'
      },
      {
        title: 'Destination Immersion Focus',
        description: 'Longer port stays, overnight calls, and Viking Explorer Guides delivering authentic cultural experiences. Itineraries designed by historians visiting UNESCO sites and lesser-known gems.',
        icon: 'destination'
      },
      {
        title: 'Veranda Staterooms Standard',
        description: '100% veranda staterooms - largest in river cruising. French balconies, suites with walk-out verandas, and floor-to-ceiling windows. Unparalleled views from every cabin.',
        icon: 'luxury'
      },
      {
        title: 'Cultural Enrichment Leader',
        description: 'Viking Resident Historian, cooking demonstrations, classical music concerts, and destination lectures. World\'s most awarded enrichment programme with university partnerships.',
        icon: 'culture'
      },
      {
        title: 'True All-Inclusive Luxury',
        description: 'All meals, premium wines/beers with lunch/dinner, WiFi, excursions, enrichment, gratuities included. No supplements for main dining, silver spirits at lunch/dinner.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Europe Rivers',  alt: 'European river landscape' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastal village' },
      { name: 'Scandinavia',  alt: 'Scandinavian coastline' },
      { name: 'Baltic',  alt: 'Baltic capital waterfront' },
      { name: 'Antarctica',  alt: 'Antarctic expedition landscape' }
    ],

    // Kids Club section - Adults-only (18+)
    kidsClub: null, // Viking is adults-only, no kids clubs

    accessibility: {
      intro: 'Viking ships are designed with accessibility in mind, featuring accessible staterooms, lifts throughout, and accessible shore excursions in many ports.',
      tips: [
        { title: 'Accessible staterooms', description: 'Wheelchair-accessible cabins with roll-in showers available.' },
        { title: 'Ship design', description: 'All public areas accessible. Ships feature lifts between all decks.' },
        { title: 'Shore excursions', description: 'Many tours offer accessible options. Team can advise on specific ports.' },
        { title: 'Dietary needs', description: 'All restaurants accommodate dietary requirements with advance notice.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Viking Explorer Society',
      intro: 'Viking Explorer Society - Simple loyalty programme with instant benefits from first Viking cruise and generous future cruise discounts. Join free automatically after first booking. Silver, Gold, Platinum tiers based on cruises taken. Benefits available immediately. Straightforward luxury loyalty rewarding repeat cultural travellers.',
      pointsInfo: 'Key Benefits: 10% discount on future Viking cruises (Silver), priority booking and telephone support, complimentary wine tastings and shore excursion discounts, exclusive members events and newsletters.',
      tiers: [
        { tier: 'Silver', points: '1+ cruise', benefits: '10% future cruise discount, priority booking' },
        { tier: 'Gold', points: '5+ cruises', benefits: 'Enhanced Silver benefits, wine tastings' },
        { tier: 'Platinum', points: '10+ cruises', benefits: 'Ultimate benefits, highest discounts' }
      ]
    },

    highlights: [
      'Destination-focused itineraries with more time in port',
      'Shore excursion included in every port',
      'Adults-only ships (18+) for peaceful cruising',
      'Award-winning Scandinavian ship design',
      'Wi-Fi, specialty dining, and drinks with meals included',
      'Cultural enrichment with resident historians',
      'LivNordic spa on every ship',
      'Ocean, river, and expedition options'
    ],
    ships: ['Viking Neptune', 'Viking Mars', 'Viking Saturn', 'Viking Venus', 'Viking Orion', 'Viking Star', 'Viking Sea', 'Viking Sky'],
    destinations: ['Northern Europe', 'Mediterranean', 'British Isles', 'World Cruises', 'Alaska', 'Caribbean', 'Polar Expeditions'],
    suitableFor: ['Mature Travellers', 'Couples', 'Culture Seekers', 'First-Time Cruisers', 'Those Seeking Calm'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Viking different from other cruise lines?',
        answer: 'Adults-only (18+) small-ship luxury with 100% veranda staterooms, Viking Longships design, and destination immersion. True all-inclusive cultural cruising without children or nickel-and-diming.'
      },
      {
        question: 'What destinations does Viking sail to?',
        answer: 'Europe\'s rivers (Rhine, Danube, Seine), Mediterranean, Scandinavia, Baltic, North America rivers, ocean voyages to Antarctica, Caribbean, Asia. Signature 8-day Rhine Getaway, 15-day Danube Christmas Markets.'
      },
      {
        question: 'Is Viking suitable for families?',
        answer: 'Adults-only experience (18+ minimum) perfect for mature couples and cultural travellers. No kids clubs - designed for destination immersion, history lectures, and sophisticated adult holidays.'
      },
      {
        question: 'What is included in a Viking holiday?',
        answer: 'All meals, premium wines/beers lunch/dinner, WiFi, daily excursions, enrichment lectures, gratuities. No supplements for main dining venues. True all-inclusive luxury.'
      },
      {
        question: 'How do I join Viking\'s loyalty programme?',
        answer: 'Join Viking Explorer Society free automatically after first booking. Silver, Gold, Platinum tiers. Benefits: 10% future cruise discounts, priority services, exclusive events from first cruise.'
      },
      {
        question: 'What should I know before booking a Viking holiday?',
        answer: 'Adults-only (18+), smart casual dress (no formal nights), European plugs onboard. Book 12-18 months ahead for popular river sailings. Average age 55+, sophisticated cultural atmosphere.'
      }
    ],
    meta: {
      title: 'Viking Cruises | Destination-Focused Ocean, River & Expedition Cruising',
      description: 'Explore with Viking - elegant, destination-focused cruising. Adults-only, all-inclusive value. Book with Limitless Cruises.'
    }
  },
  {
    id: 'seabourn',
    slug: 'seabourn-cruises',
    name: 'Seabourn',
    shortName: 'Seabourn',
    tagline: 'Intimate luxury at sea',
    description: 'Seabourn delivers ultra-luxury cruising on intimate ships with exceptional service, all-inclusive luxury, and unique destinations. With all ocean-front suites, open bars, and a crew-to-guest ratio that ensures personalised attention, Seabourn represents the pinnacle of cruise luxury.',
    category: 'ultra-luxury',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Ultra-Luxury All-Inclusive',
        description: 'True all-suite ultra-luxury with caviar service anytime, complimentary premium spirits, and no nickel-and-diming. Seabourn Conversations casual enrichment and door-to-door service from UK homes.',
        icon: 'luxury'
      },
      {
        title: 'Small Yacht-Like Ships',
        description: 'Ultra-small ships (264-600 guests) with nearly 1:1 crew ratio and all oceanview veranda suites. Access private yacht harbours, overnight stays, and intimate ports mega-ships can\'t reach.',
        icon: 'ship'
      },
      {
        title: 'Award-Winning Dining',
        description: 'The Grill by Thomas Keller (3-Michelin-starred), Sushi by Thomas Keller, and Seabourn Signature dishes. Open-seating dining with caviar service 24/7 and regional culinary partnerships.',
        icon: 'dining'
      },
      {
        title: 'Personalised Seabourn Service',
        description: 'Caviar on demand, personalised service, and Seabourn Officers host private cocktail parties. World\'s highest service ratings with dedicated caviar servers and suite hosts.',
        icon: 'service'
      },
      {
        title: 'Expedition & Yachting',
        description: 'Seabourn Venture polar expedition yachts and Venture expedition ships for Antarctica, Arctic, Galapagos. Private marina with kayaks, zodiacs, submarines for authentic exploration.',
        icon: 'adventure'
      },
      {
        title: 'Exceptional Value Luxury',
        description: 'All-inclusive (drinks, gratuities, WiFi, laundry, excursions), complimentary Ventures by Seabourn tours, and winter garden suites. Best value true ultra-luxury cruising.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Antarctica',  alt: 'Antarctic expedition' },
      { name: 'Mediterranean',  alt: 'Mediterranean luxury coastline' },
      { name: 'Caribbean',  alt: 'Caribbean paradise' },
      { name: 'Arctic',  alt: 'Arctic expedition' },
      { name: 'South Pacific',  alt: 'South Pacific luxury destination' }
    ],

    // Kids Club section - Adults-focused (no dedicated kids clubs)
    kidsClub: null, // Seabourn is adults-focused ultra-luxury, no dedicated kids clubs

    accessibility: {
      intro: 'Seabourn offers accessible suites with wider doorways, roll-in showers, and personalised assistance. The intimate ship size means attentive service for all guests.',
      tips: [
        { title: 'Accessible suites', description: 'Modified suites available with wheelchair-friendly bathrooms.' },
        { title: 'Personal service', description: 'High crew-to-guest ratio ensures attentive individual assistance.' },
        { title: 'Shore excursions', description: 'Accessible tours arranged where possible. Ventures excursions may have limitations.' },
        { title: 'Marina activities', description: 'Some watersports may not be suitable for all mobility levels.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Seabourn Club',
      intro: 'Seabourn Club - Exclusive loyalty programme rewarding repeat ultra-luxury voyages with suite benefits and priority services. Join free after first sailing. Classic (1-24 nights), Diamond (25-74 nights), Diamond Plus (75-199 nights), Diamond 200+, President\'s Circle (300+ nights). Ultra-luxury loyalty for Seabourn\'s most loyal clientele.',
      pointsInfo: 'Key Benefits: Onboard credit (£100 Diamond, £1,000 President\'s Circle per voyage), priority tendering, suite selection, dining reservations, complimentary laundry, spa treatments, premium wines, exclusive cocktail parties, double club points events.',
      tiers: [
        { tier: 'Classic', points: '1-24 nights', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Diamond', points: '25-74 nights', benefits: 'Onboard credit, priority services' },
        { tier: 'Diamond Plus', points: '75-199 nights', benefits: 'Enhanced Diamond benefits, spa treatments' },
        { tier: 'Diamond 200+', points: '200-299 nights', benefits: 'Premium benefits, suite upgrades' },
        { tier: 'President\'s Circle', points: '300+ nights', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },

    highlights: [
      'All ocean-front suites with luxury amenities',
      'Ultra all-inclusive: premium drinks, fine dining, gratuities',
      'Intimate ships with just 450-600 guests',
      'Marina with complimentary water sports',
      'Ventures by Seabourn expedition excursions',
      'The Grill by Thomas Keller restaurant',
      'Carefully selected wine and spirits collections',
      'Seabourn Conversations with guest speakers'
    ],
    ships: ['Seabourn Ovation', 'Seabourn Encore', 'Seabourn Quest', 'Seabourn Pursuit', 'Seabourn Venture'],
    destinations: ['Mediterranean', 'Northern Europe', 'Caribbean', 'Antarctica', 'Arctic', 'Asia', 'Arabia'],
    suitableFor: ['Luxury Seekers', 'Couples', 'Mature Travellers', 'Foodies', 'Adventure Lovers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Seabourn different from other cruise lines?',
        answer: 'Ultra-luxury all-suite small ships (264-600 guests) with caviar service anytime, 1:1 crew ratio, and expedition yachts. True all-inclusive with no nickel-and-diming and personalised service excellence.'
      },
      {
        question: 'What destinations does Seabourn sail to?',
        answer: 'Worldwide: Antarctica, Arctic, Mediterranean, Caribbean, Kimberley (Australia), South Pacific, world cruises. Signature Seabourn & Caviar itineraries and Ventures by Seabourn expeditions.'
      },
      {
        question: 'Is Seabourn suitable for families?',
        answer: 'Adults-focused ultra-luxury perfect for mature couples and celebrations. No kids clubs but family suites available. Expedition sailings welcome multi-generational families seeking adventure.'
      },
      {
        question: 'What is included in a Seabourn holiday?',
        answer: 'Everything: all-suite accommodations, gourmet dining, premium drinks, caviar service, gratuities, WiFi, laundry, most excursions. True all-inclusive ultra-luxury.'
      },
      {
        question: 'How do I join Seabourn\'s loyalty programme?',
        answer: 'Join Seabourn Club free after first sailing. Classic (1-24 nights), Diamond (25-74 nights), Diamond Plus (75-199 nights). Benefits: onboard credit, priority services, suite perks.'
      },
      {
        question: 'What should I know before booking a Seabourn holiday?',
        answer: 'Smart elegant casual (no formal nights), average age 55+, European plugs onboard. Book 12-18 months ahead for expeditions. Ultra-intimate (264 guests), personalised service focus.'
      }
    ],
    meta: {
      title: 'Seabourn Cruises | Ultra-Luxury All-Inclusive Cruising',
      description: 'Experience Seabourn\'s ultra-luxury cruising. All-suite ships, open bars, The Grill by Thomas Keller. Book with Limitless Cruises.'
    }
  },
  {
    id: 'princess',
    slug: 'princess-cruises',
    name: 'Princess Cruises',
    shortName: 'Princess',
    tagline: 'Come back new',
    description: 'Princess Cruises offers award-winning MedallionClass technology for a personalised cruise experience with innovative service. Known for their Alaska expertise, romantic destinations, and the famous Movies Under the Stars poolside cinema.',
    category: 'premium',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Premium Cruise Experience',
        description: 'Princess delivers classic premium cruising with MedallionClass technology - keyless entry, personalised service, and touchless ordering. Sophisticated yet approachable perfect for British travellers seeking reliable excellence.',
        icon: 'premium'
      },
      {
        title: 'Innovative MedallionClass',
        description: 'World-first wearable Medallion enables OceanNow delivery, queue-free check-in, personalised menus, and stateroom location services. Every ship upgraded with digital innovation revolutionising cruise experience.',
        icon: 'technology'
      },
      {
        title: 'World-Class Dining',
        description: 'Crown Grill steakhouse, Sabatini\'s Italian, and Harmony Chinese fusion. Main dining with flexible Princess Anytime dining. Fresh seafood emphasis and extensive wine list selected by expert sommeliers.',
        icon: 'dining'
      },
      {
        title: 'Family-Friendly Premium',
        description: 'Princess Kids Clubs (3-12yrs), Remix teen club (13-17yrs), and family harbour programs. Every ship offers family suites, kids pools, and family entertainment. Sophisticated yet welcoming.',
        icon: 'child'
      },
      {
        title: 'Global Destination Leader',
        description: '50+ years experience with Alaska, Caribbean, Europe, Hawaii, world cruises. Signature 7-night Inside Passage Alaska, Mediterranean Grand Adventures, and 111-day roundworld voyages.',
        icon: 'destination'
      },
      {
        title: 'Exceptional Value',
        description: 'Princess Plus package (drinks, WiFi, gratuities, casual dining), flexible suite upgrades, and no solo supplements select sailings. Best value premium cruising for discerning travellers.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Alaska',  alt: 'Alaska glacier scenery' },
      { name: 'Caribbean',  alt: 'Caribbean beach paradise' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastal town' },
      { name: 'Hawaii',  alt: 'Hawaiian volcanic coastline' },
      { name: 'Europe',  alt: 'European coastline' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Princess Kids & Remix',
      intro: 'Princess Cruises offers comprehensive kids programmes across all age groups plus sophisticated family entertainment perfect for multi-generational holidays. Princess Kids (3-7yrs, 8-12yrs), Remix (13-17yrs). Every ship features kids pools, family movie nights under the stars, and family shore excursions. MedallionClass enables personalised kids menus. Family harbour programs, kids sail/eat free promotions, late-night group babysitting. Alaska family specialist.',
      ageGroups: [
        { club: 'Reef', age: '3-7yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Shockwave', age: '8-12yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'Remix', age: '13-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    accessibility: {
      intro: 'Princess Cruises is committed to accessible cruising with modified staterooms, accessible dining, and shore excursion options. The MedallionClass technology also assists guests with mobility needs.',
      tips: [
        { title: 'Accessible staterooms', description: 'Wheelchair-accessible cabins with wider doors and roll-in showers.' },
        { title: 'MedallionClass benefits', description: 'Technology enables easier navigation and service requests.' },
        { title: 'Shore excursions', description: 'Accessible tours available in many destinations.' },
        { title: 'Dining', description: 'All restaurants accessible with dietary accommodations available.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Captain\'s Circle',
      intro: 'Princess Captain Circle - Generous tiered loyalty programme with instant benefits from first cruise and generous suite upgrades. Join free automatically. Earn 1 point per night. Gold (1 night), Platinum (16 nights), Ruby (31 nights), Sapphire (46 nights), Diamond (71 nights), Diamond Plus (101 nights), Pinnacle (571 nights). 6 million members enjoy Princess\' generous premium loyalty benefits.',
      pointsInfo: 'Key Benefits: Onboard credit (£25 Platinum, £200 Pinnacle per cruise), priority tendering, dining reservations, suite lounge access, complimentary laundry, Happy Hour drinks, mini-bar credits, exclusive members events, double points promotions.',
      tiers: [
        { tier: 'Gold', points: '1+ nights', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Platinum', points: '16+ nights', benefits: 'Onboard credit, priority services' },
        { tier: 'Ruby', points: '31+ nights', benefits: 'Enhanced Platinum benefits' },
        { tier: 'Sapphire', points: '46+ nights', benefits: 'Complimentary laundry, Happy Hour' },
        { tier: 'Diamond', points: '71+ nights', benefits: 'Suite lounge access, enhanced perks' },
        { tier: 'Diamond Plus', points: '101+ nights', benefits: 'Enhanced Diamond benefits' },
        { tier: 'Pinnacle', points: '571+ nights', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },

    highlights: [
      'MedallionClass wearable technology for effortless service',
      'Movies Under the Stars poolside cinema',
      'Over 50 years of Alaska cruising expertise',
      'Discovery at Sea enrichment programmes',
      'The Sanctuary adults-only retreat',
      'Ultimate Balcony Dining experience',
      'Award-winning itineraries to 380+ destinations',
      'Princess Plus all-inclusive package option'
    ],
    ships: ['Sun Princess', 'Discovery Princess', 'Enchanted Princess', 'Sky Princess', 'Majestic Princess', 'Regal Princess', 'Royal Princess'],
    destinations: ['Alaska', 'Caribbean', 'Mediterranean', 'Australia & New Zealand', 'Hawaii', 'Panama Canal', 'World Cruises'],
    suitableFor: ['Couples', 'Families', 'Tech-Savvy Travellers', 'Alaska Seekers', 'Movie Lovers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Princess Cruises different from other cruise lines?',
        answer: 'MedallionClass digital innovation (wearable technology, personalised service), premium value positioning, and 50+ years destination expertise. Perfect balance sophisticated service and family-friendly facilities.'
      },
      {
        question: 'What destinations does Princess Cruises sail to?',
        answer: 'Alaska specialist, Caribbean, Europe, Hawaii, Mexico, Canada/New England, Asia, Australia, world cruises. Signature 7-night Glacier Bay Inside Passage, 111-day Round the World, Mediterranean Adventures.'
      },
      {
        question: 'Is Princess Cruises suitable for families?',
        answer: 'Excellent family choice - kids clubs 3-17yrs, family suites, kids pools, family entertainment, and multi-generational appeal. Princess Kids voted best in premium category multiple years.'
      },
      {
        question: 'What is included in a Princess Cruises holiday?',
        answer: 'All main meals, entertainment, kids clubs, pools, gym included. Princess Plus adds drinks, WiFi, gratuities, casual dining. Extras: specialty dining, spa, excursions, premium drinks.'
      },
      {
        question: 'How do I join Princess Cruises\' loyalty programme?',
        answer: 'Join Captain Circle free automatically after first cruise. Earn 1 point per night. Gold (1 night), Platinum (16 nights), Ruby (31 nights). Benefits: onboard credit, priority services, suite perks.'
      },
      {
        question: 'What should I know before booking a Princess Cruises holiday?',
        answer: 'Smart casual dress code (no strict formal nights), MedallionClass wearables provided, US plugs onboard. Book 12-18 months ahead for Alaska/Europe. Multi-generational appeal (average age 45-75).'
      }
    ],
    meta: {
      title: 'Princess Cruises | MedallionClass Cruises | UK Expert Bookings',
      description: 'Princess Cruises with expert UK consultant service. MedallionClass technology, Alaska specialists, Movies Under the Stars.'
    }
  },
  {
    id: 'azamara',
    slug: 'azamara-cruises',
    name: 'Azamara',
    shortName: 'Azamara',
    tagline: 'Destination immersion at sea',
    description: 'Azamara specializes in destination-intensive cruising with longer stays, more overnights, and night touring in unique ports. Their boutique ships carry just 600-700 guests to smaller harbours that larger ships cannot access.',
    category: 'luxury',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Destination Immersion Leader',
        description: 'Longest port stays and overnight calls in luxury cruising - up to 14 hours in port vs industry average 8 hours. Azamazing Evenings exclusive cultural events included. Travel deeper, stay longer.',
        icon: 'destination'
      },
      {
        title: 'Small Luxury Ships',
        description: 'Ultra-small boutique ships (702 guests) with nearly 1:1 crew ratio and all-balcony staterooms. Access private yacht harbours and intimate ports mega-ships can\'t reach.',
        icon: 'ship'
      },
      {
        title: 'Inclusive Luxury Experience',
        description: 'All-inclusive: premium drinks, speciality dining, self-service laundry, gratuities, shuttle service. Discoveries restaurant open-seating with regional menus and Discoverer\'s Lounge.',
        icon: 'luxury'
      },
      {
        title: 'Azamazing Evenings',
        description: 'Exclusive complimentary cultural events - private concerts, cooking classes with local chefs, traditional performances. Signature experiences included in every itinerary.',
        icon: 'experience'
      },
      {
        title: 'Intimate Service Excellence',
        description: 'Personalised service with dedicated destination lecturers, Azamara Club Benefits, and pre/post-cruise hotel packages. World\'s highest small-ship service ratings.',
        icon: 'service'
      },
      {
        title: 'Exceptional Value Luxury',
        description: 'Best value true luxury with longer port stays, inclusive features, and flexible suite upgrades. No single supplements on select voyages.',
        icon: 'value'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Mediterranean',  alt: 'Mediterranean harbour village' },
      { name: 'Caribbean',  alt: 'Caribbean paradise' },
      { name: 'South America',  alt: 'South American coastline' },
      { name: 'Asia',  alt: 'Asian temple at sunset' },
      { name: 'Australia',  alt: 'Australian coastline' }
    ],

    // Kids Club section - Adults-focused (no dedicated kids clubs)
    kidsClub: null, // Azamara is adults-focused luxury, no dedicated kids clubs

    accessibility: {
      intro: 'Azamara\'s boutique ships offer accessible staterooms and attentive service. The smaller size means less walking between venues.',
      tips: [
        { title: 'Accessible staterooms', description: 'Modified cabins available with roll-in showers and grab bars.' },
        { title: 'Boutique advantage', description: 'Smaller ships mean shorter distances between venues.' },
        { title: 'Tender ports', description: 'Some smaller ports require tender boats - discuss accessibility needs when booking.' },
        { title: 'Shore excursions', description: 'Accessible options available in many destinations.' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Azamara Circle Programme',
      intro: 'Azamara Circle Programme - Generous tiered loyalty rewarding repeat small-ship voyages with suite benefits and priority services. Join free after first sailing. Discoverer (1-29 nights), Enthusiast (30-89 nights), Voyager (90+ nights), Commodore (Commodore Suite bookings). Luxury loyalty for Azamara\'s most loyal destination travellers.',
      pointsInfo: 'Key Benefits: Onboard credit (£50 Enthusiast, £250 Voyager per voyage), priority tendering, dining reservations, suite lounge access, complimentary laundry, spa discounts, premium wines, exclusive cocktail parties, double club points events.',
      tiers: [
        { tier: 'Discoverer', points: '1-29 nights', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Enthusiast', points: '30-89 nights', benefits: 'Onboard credit, priority services' },
        { tier: 'Voyager', points: '90+ nights', benefits: 'Enhanced benefits, suite lounge access' },
        { tier: 'Commodore', points: 'Commodore Suite bookings', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },

    highlights: [
      'Longer stays in port with late evening departures',
      'Complimentary AzAmazing Evenings exclusive events',
      'Boutique ships carrying just 600-700 guests',
      'Night touring experiences after other ships leave',
      'Gratuities and select drinks included',
      'Shuttle buses in port included',
      'Access to smaller, less-visited harbours',
      'Country-intensive destination exploration'
    ],
    ships: ['Azamara Journey', 'Azamara Quest', 'Azamara Pursuit', 'Azamara Onward'],
    destinations: ['Mediterranean', 'British Isles', 'Asia', 'South America', 'Caribbean', 'Northern Europe'],
    suitableFor: ['Culture Seekers', 'Couples', 'Mature Travellers', 'Destination Lovers', 'Small Ship Fans'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Azamara different from other cruise lines?',
        answer: 'Longest port stays (14+ hours), Azamazing Evenings exclusive events, and small-ship intimacy (702 guests). True destination immersion luxury with overnight calls and cultural experiences included.'
      },
      {
        question: 'What destinations does Azamara sail to?',
        answer: 'Worldwide immersion: Mediterranean, Caribbean, South America, Asia, Australia, world voyages. Signature Club Cruises with multiple overnights, Azamara Journeys extended itineraries.'
      },
      {
        question: 'Is Azamara suitable for families?',
        answer: 'Adults-focused luxury perfect for mature couples and celebrations. No kids clubs but family suites available. Multi-generational appeal for grandparents with adult children.'
      },
      {
        question: 'What is included in an Azamara holiday?',
        answer: 'Everything: all-suite accommodations, gourmet dining, premium drinks, gratuities, laundry, Azamazing Evenings, shuttle service. True all-inclusive small-ship luxury.'
      },
      {
        question: 'How do I join Azamara\'s loyalty programme?',
        answer: 'Join Azamara Circle free after first sailing. Discoverer (1-29 nights), Enthusiast (30-89 nights), Voyager (90+ nights). Benefits: onboard credit, priority services, exclusive events.'
      },
      {
        question: 'What should I know before booking an Azamara holiday?',
        answer: 'Smart elegant casual (no formal nights), average age 55+, European plugs onboard. Book 12-18 months ahead for popular itineraries. Ultra-intimate (702 guests), destination-focused luxury.'
      }
    ],
    meta: {
      title: 'Azamara Cruises | Destination-Intensive Boutique Cruising',
      description: 'Experience Azamara\'s destination-immersive cruising. Longer port stays, boutique ships, AzAmazing Evenings. Book with Limitless Cruises.'
    }
  },
  {
    id: 'cunard',
    slug: 'cunard-cruises',
    name: 'Cunard',
    shortName: 'Cunard',
    tagline: 'The most famous ocean liners in the world',
    description: 'Cunard offers timeless elegance aboard the world\'s most iconic ocean liners, including Queen Mary 2, Queen Victoria, and Queen Elizabeth.',
    category: 'premium',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Ocean Liner Heritage',
        description: '184 years of transatlantic tradition with White Star Service, afternoon tea in Queens Room, and black tie gala evenings. True ocean liners built for North Atlantic service with legendary elegance.',
        icon: 'heritage'
      },
      {
        title: 'Iconic Queen Mary 2',
        description: 'World\'s only true ocean liner crossing Atlantic weekly. 148,000 gross tons with 2,700 passenger capacity, planetarium, largest library at sea, and Royal Court Theatre. Cunard\'s flagship.',
        icon: 'ship'
      },
      {
        title: 'World-Class White Star Service',
        description: '45 crew per 100 guests ratio delivering personalised service. Butler service in Queens and Princess Grills, white-gloved afternoon tea, and 24-hour room service. Multiple service excellence awards.',
        icon: 'service'
      },
      {
        title: 'Gala Evenings & Ballroom',
        description: 'Six formal black tie nights per crossing with live orchestra in magnificent Queens Ballroom. World\'s most elegant cruise dress code with professional dance hosts and dance lessons.',
        icon: 'entertainment'
      },
      {
        title: 'Transatlantic Specialist',
        description: 'Weekly Southampton-New York crossings plus world voyages visiting 100+ ports. Signature 7-night transatlantic, 108-night world cruise, and Cunard-only calls like Hamburg and Le Havre.',
        icon: 'voyage'
      },
      {
        title: 'Exceptional British Luxury',
        description: 'Britannia Club dining, Princess/Queens Grill suites, spa with thermal suite, and comprehensive enrichment programme. Best value true luxury ocean liner experience.',
        icon: 'luxury'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Transatlantic',  alt: 'Transatlantic crossing' },
      { name: 'Mediterranean',  alt: 'Mediterranean coastline' },
      { name: 'Northern Europe',  alt: 'Northern Europe waterfront' },
      { name: 'Caribbean',  alt: 'Caribbean turquoise waters' },
      { name: 'World Cruises',  alt: 'World cruise itinerary' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Marschner Kids Club',
      intro: 'Cunard offers sophisticated multi-generational travel with Marschner Kids Club for ages 2-17 plus family enrichment perfect for grandparents and grandchildren. The Play Zone (2-7yrs), The Zone (8-12yrs), and The Teen Zone (13-17yrs). Family-friendly yet refined with planetarium shows, kids afternoon tea, and family shore excursions. Supervised late-night childcare, family staterooms, and junior afternoon tea service. Perfect for elegant multi-generational holidays.',
      ageGroups: [
        { club: 'The Play Zone', age: '2-7yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'The Zone', age: '8-12yrs', morning: '9am-12pm', afternoon: '2pm-5pm', evening: '7pm-10pm' },
        { club: 'The Teen Zone', age: '13-17yrs', morning: '10am-1pm', afternoon: '3pm-6pm', evening: '7pm-11pm' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Cunard World Club',
      intro: 'Cunard World Club - Exclusive tiered loyalty programme rewarding repeat ocean liner voyages with suite benefits and priority services. Join free after first sailing. Bronze (2 sailings), Silver (5 sailings), Gold (10 sailings), Diamond (25 sailings), Platinum (100 sailings). Points based on nights cruised. Cunard\'s most generous ocean liner loyalty programme.',
      pointsInfo: 'Key Benefits: Onboard credit (£50 Silver, £500 Platinum per voyage), priority tendering, dining reservations, suite lounge access, complimentary laundry service, champagne receptions, exclusive events, double points promotions, suite upgrades.',
      tiers: [
        { tier: 'Bronze', points: '2 sailings', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Silver', points: '5 sailings', benefits: 'Onboard credit, priority services' },
        { tier: 'Gold', points: '10 sailings', benefits: 'Enhanced Silver benefits' },
        { tier: 'Diamond', points: '25 sailings', benefits: 'Complimentary laundry, champagne receptions' },
        { tier: 'Platinum', points: '100 sailings', benefits: 'Ultimate benefits, highest onboard credit' }
      ]
    },
    highlights: [
      'Iconic Queen Mary 2 transatlantic crossings',
      'White Star service and formal evenings',
      'Grill Suite exclusive experiences',
      'Royal Nights themed events'
    ],
    ships: ['Queen Mary 2', 'Queen Victoria', 'Queen Elizabeth', 'Queen Anne'],
    destinations: ['World Cruises', 'Mediterranean', 'Northern Europe'],
    suitableFor: ['Couples', 'Mature Travellers', 'Luxury Seekers', 'History Enthusiasts'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Cunard different from other cruise lines?',
        answer: 'True ocean liners (Queen Mary 2) with 184-year transatlantic heritage, White Star Service, black tie gala evenings, and weekly Southampton-New York crossings. World\'s most elegant cruise experience.'
      },
      {
        question: 'What destinations does Cunard sail to?',
        answer: 'Transatlantic specialist plus world voyages visiting 100+ ports. Signature 7-night Southampton-New York, 108-night world cruise, Mediterranean, Northern Europe, Caribbean, Asia, Australia.'
      },
      {
        question: 'Is Cunard suitable for families?',
        answer: 'Excellent multi-generational choice - kids clubs 2-17yrs, family enrichment, junior afternoon tea, and sophisticated grandparents appeal. Perfect for elegant family holidays across generations.'
      },
      {
        question: 'What is included in a Cunard holiday?',
        answer: 'All main meals, entertainment, kids clubs, pools, gym included. Grills suites include butler service. Extras: premium drinks, spa, excursions, speciality coffee. Formal evening attire required.'
      },
      {
        question: 'How do I join Cunard\'s loyalty programme?',
        answer: 'Join Cunard World Club free after first sailing. Gold (2 sailings), Silver (5 sailings), Gold (10 sailings). Benefits: onboard credit, priority services, suite perks, exclusive events.'
      },
      {
        question: 'What should I know before booking a Cunard holiday?',
        answer: 'Black tie gala evenings (formal wear required), average age 45-75, British currency onboard. Book 12-18 months ahead for transatlantic/world voyages. Sophisticated British elegance.'
      }
    ],
    meta: {
      title: 'Cunard | Luxury Ocean Liners | UK Expert Bookings',
      description: 'Cunard\'s legendary ocean liners with expert UK consultant service. Queen Mary 2 transatlantic crossings, world cruises, British elegance.'
    }
  },
  {
    id: 'ae-expeditions',
    slug: 'ae-expeditions',
    name: 'Aurora Expeditions',
    shortName: 'Aurora',
    tagline: 'Adventure expedition cruising',
    description: 'Aurora Expeditions offers adventure expedition cruises to the world\'s most remote destinations. With small ships, expert expedition teams, and a focus on active exploration, Aurora delivers authentic polar and adventure experiences.',
    category: 'expedition',
    featured: true,
    
    logo: null, // Logo to be uploaded to CRM
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'True Polar Expedition Experts',
        description: 'Australian-owned polar specialists with 40+ years Arctic/Antarctic experience. Small expedition ships designed for polar waters with ice-strengthened hulls and highest polar classification.',
        icon: 'polar'
      },
      {
        title: 'Small Expedition Ships',
        description: 'Intimate vessels (50-200 guests) with highest Zodiac-to-passenger ratio for daily landings and wildlife encounters. Purpose-built for polar navigation with shallow draft for unique access.',
        icon: 'ship'
      },
      {
        title: 'Expert Expedition Teams',
        description: 'World-leading polar biologists, glaciologists, historians leading every voyage. Daily lectures, Zodiac cruises, kayaking, snowshoeing, and citizen science projects. Unmatched expertise.',
        icon: 'experts'
      },
      {
        title: 'Adventure Activities Included',
        description: 'Sea kayaking, camping, mountaineering, scuba diving included (limited places). Zodiac cruises, hiking, photography workshops standard. Highest activity-to-passenger ratio in polar cruising.',
        icon: 'adventure'
      },
      {
        title: 'Sustainable Polar Travel',
        description: 'Carbon-neutral by 2025 commitment, plastic-free ships, sustainable seafood, and community support in remote regions. IAATO member with strict environmental protocols.',
        icon: 'sustainability'
      },
      {
        title: 'Australian Expedition Excellence',
        description: 'Australian crew, medical staff, chefs delivering personalised service. Highest guest satisfaction ratings in polar expedition sector. Expedition cruising perfected.',
        icon: 'service'
      }
    ],

    // Destination images for grid
    destinationImages: [
      { name: 'Antarctica',  alt: 'Antarctic ice and penguins' },
      { name: 'Arctic',  alt: 'Arctic polar landscape' },
      { name: 'Kimberley',  alt: 'Australian Kimberley coastline' },
      { name: 'Galapagos',  alt: 'Galapagos wildlife' },
      { name: 'Pacific Islands',  alt: 'Pacific island paradise' }
    ],

    // Kids Club section - Junior Explorer programme (8+ years)
    kidsClub: {
      name: 'Junior Explorer Club',
      intro: 'Aurora Expeditions offers adventure-focused polar expeditions suitable for families 8+ years with Junior Explorer programme and family-friendly activities. Junior Explorer Club (8-17yrs) with polar science, photography, and Zodiac training. Family kayaking, camping, and wildlife observation. Active families seeking authentic polar adventure. Minimum age 8 years. Active multi-generational families welcome. No traditional kids clubs - expedition adventure focus.',
      ageGroups: [
        { club: 'Junior Explorers', age: '8-12yrs', activities: 'Polar science, photography' },
        { club: 'Junior Explorers', age: '13-17yrs', activities: 'Zodiac training, kayaking' },
        { club: 'Family Activities', age: 'All ages', activities: 'Hiking, wildlife observation, camping' }
      ]
    },

    accessibility: {
      intro: 'Expedition cruising involves physical elements including Zodiac transfers and landings on beaches. Some voyages may have limitations for guests with mobility challenges. Please discuss your needs before booking.',
      tips: [
        { title: 'Ship access', description: 'Ships have lifts between decks and some accessible cabins.' },
        { title: 'Zodiac transfers', description: 'Require stepping into small boats from a platform - may be challenging for some.' },
        { title: 'Shore landings', description: 'Often involve wet landings on beaches or rocky shores.' },
        { title: 'Activities', description: 'Many optional activities require moderate fitness levels.' }
      ]
    },

    highlights: [
      'Over 30 years of polar expedition experience',
      'Small expedition ships (126-170 guests)',
      'Expert expedition team with scientists and naturalists',
      'Multiple daily Zodiac excursions',
      'Optional sea kayaking, diving, and snorkelling',
      'Polar plunge experience in Antarctica',
      'Committed to sustainable and responsible travel',
      'Lectures and workshops throughout voyage'
    ],

    // Loyalty program
    loyaltyProgram: {
      name: 'Aurora Expedition Club',
      intro: 'Aurora Expedition Club - Simple repeat guest programme with priority booking and onboard benefits for loyal polar adventurers. Join free after first voyage. Silver, Gold, Platinum tiers based on voyages completed. Instant benefits from first sailing. Repeat guest recognition for polar exploration enthusiasts.',
      pointsInfo: 'Key Benefits: Priority cabin selection and itinerary booking, welcome aboard receptions and expedition team access, onboard credit (£100 Gold, £300 Platinum per voyage), exclusive pre-sale access to new itineraries.',
      tiers: [
        { tier: 'Silver', points: '1+ voyage', benefits: 'Priority booking, welcome receptions' },
        { tier: 'Gold', points: '2+ voyages', benefits: 'Onboard credit, expedition team access' },
        { tier: 'Platinum', points: '3+ voyages', benefits: 'Highest onboard credit, pre-sale access' }
      ]
    },

    ships: ['Greg Mortimer', 'Sylvia Earle', 'Douglas Mawson'],
    destinations: ['Antarctica', 'Arctic', 'Kimberley (Australia)', 'Patagonia', 'New Zealand Sub-Antarctic Islands', 'Costa Rica'],
    suitableFor: ['Adventure Seekers', 'Wildlife Enthusiasts', 'Photographers', 'Active Travellers', 'Bucket List Seekers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Aurora Expeditions different from other cruise lines?',
        answer: 'True polar expedition specialists with Australian expertise, highest Zodiac ratio, expert teams, and included adventure activities. Small ships purpose-built for polar waters with 40+ years experience.'
      },
      {
        question: 'What destinations does Aurora Expeditions sail to?',
        answer: 'Arctic (Svalbard, Greenland, Canadian High Arctic), Antarctica (Peninsula, Weddell Sea), Kimberley (Australia), Galapagos, Pacific Islands. Signature 12-day Antarctic Peninsula, 20-day Northwest Passage.'
      },
      {
        question: 'Is Aurora Expeditions suitable for families?',
        answer: 'Adventure expeditions for families 8+ years with Junior Explorer programme. Active multi-generational families seeking polar wildlife, Zodiac cruises, kayaking. Minimum age 8 years.'
      },
      {
        question: 'What is included in an Aurora Expeditions holiday?',
        answer: 'All meals, house drinks, Zodiac cruises, lectures, hiking, most activities, gratuities included. Extras: premium drinks, kayaking/camping (limited places), scuba diving.'
      },
      {
        question: 'How do I join Aurora Expeditions\' loyalty programme?',
        answer: 'Join Aurora Expedition Club free after first voyage. Silver, Gold, Platinum tiers. Benefits: priority booking, onboard credit, exclusive events from first sailing.'
      },
      {
        question: 'What should I know before booking an Aurora Expeditions holiday?',
        answer: 'Active expeditions (hiking, Zodiacs required), waterproof gear needed, Australian plugs onboard. Book 12-18 months ahead for Antarctica/Arctic peak season. Age 8+ minimum, adventure fitness level.'
      }
    ],
    meta: {
      title: 'Aurora Expeditions | Antarctic & Arctic Expedition Cruises',
      description: 'Explore Antarctica, the Arctic, and beyond with Aurora Expeditions. Expert-led adventure cruising. Book with Limitless Cruises.'
    }
  },
  {
    id: 'hurtigruten',
    slug: 'hurtigruten',
    name: 'Hurtigruten',
    shortName: 'Hurtigruten',
    tagline: 'The world leader in exploration travel',
    description: 'Hurtigruten has been exploring the Norwegian coast since 1893 and is now the world leader in expedition cruising. From the Arctic to Antarctica, their purpose-built expedition ships deliver authentic exploration experiences with expert teams.',
    category: 'expedition',
    featured: true,
    
    logo: null,
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Norwegian Coastal Voyage Icon',
        description: '134 years of authentic Norwegian coastal service delivering mail, passengers, and cargo along iconic 1,250km fjord route. World\'s most scenic sea journey visiting 34 ports in 6 days.',
        icon: 'heritage'
      },
      {
        title: 'Hybrid Electric Expedition Ships',
        description: 'World\'s first hybrid battery-electric expedition fleet with zero-emission sailing. Purpose-built for polar waters with ice-strengthened hulls and highest Zodiac capacity.',
        icon: 'ship'
      },
      {
        title: 'Working Ship Experience',
        description: 'Real working ships carrying Norwegian locals, cargo, and tourists. Authentic local experience with fishermen, postal deliveries, and community stops. Not a tourist-only cruise.',
        icon: 'authentic'
      },
      {
        title: 'Expert Expedition Teams',
        description: 'Norwegian polar experts leading Zodiac cruises, kayaking, snowshoeing, and citizen science. Daily landings, wildlife observation, and photography workshops included.',
        icon: 'experts'
      },
      {
        title: 'Sustainable Polar Pioneers',
        description: 'Carbon-neutral coastal voyages, world\'s greenest expedition fleet. Plastic-free ships, sustainable seafood, and community partnerships in remote Arctic/Antarctic regions.',
        icon: 'sustainability'
      },
      {
        title: 'Exceptional Norwegian Value',
        description: 'All-inclusive coastal voyages with meals, port talks, and authentic Norwegian hospitality. Best value authentic Norwegian coastal experience with no hidden extras.',
        icon: 'value'
      }
    ],
    
    // Destination images for grid
    destinationImages: [
      { name: 'Norwegian Fjords',  alt: 'Norwegian fjord landscape' },
      { name: 'Antarctica',  alt: 'Antarctic ice and penguins' },
      { name: 'Arctic',  alt: 'Arctic polar landscape' },
      { name: 'Greenland',  alt: 'Greenland icebergs' },
      { name: 'Alaska',  alt: 'Alaska glacier scenery' }
    ],

    // Kids Club section - Junior Explorer programme (7+ years)
    kidsClub: {
      name: 'Junior Explorer',
      intro: 'Hurtigruten offers adventure-focused expeditions suitable for families 7+ years with Junior Explorer programme and family-friendly polar activities. Junior Explorer (7-12yrs) with polar science, photography, and Zodiac safety training. Family hiking, wildlife observation, and educational port talks. Active families seeking authentic Norwegian adventure. Minimum age 7 years on expeditions, 12 months on coastal voyages. Active multi-generational families welcome. Expedition adventure focus.',
      ageGroups: [
        { club: 'Junior Explorers', age: '7-12yrs', activities: 'Polar science, photography, Zodiac training' },
        { club: 'Family Activities', age: '13+ yrs', activities: 'Hiking, kayaking, wildlife observation' }
      ]
    },

    // Loyalty program
    loyaltyProgram: {
      name: 'Hurtigruten Club',
      intro: 'Hurtigruten Club - Simple repeat guest programme with priority booking and onboard benefits for loyal Norwegian coastal explorers. Join free after first voyage. Silver, Gold, Platinum tiers based on voyages completed. Instant benefits available. Repeat guest recognition for Norwegian coastal veterans.',
      pointsInfo: 'Key Benefits: Priority cabin selection and itinerary booking, welcome aboard receptions and expedition team access, onboard credit (£50 Gold, £150 Platinum per voyage), exclusive pre-sale access to new itineraries and discounts.',
      tiers: [
        { tier: 'Silver', points: '1+ voyage', benefits: 'Priority booking, welcome receptions' },
        { tier: 'Gold', points: '2+ voyages', benefits: 'Onboard credit, expedition team access' },
        { tier: 'Platinum', points: '3+ voyages', benefits: 'Highest onboard credit, pre-sale access' }
      ]
    },

    highlights: [
      'Norwegian Coastal Express since 1893',
      'Hybrid-powered expedition ships',
      'Arctic and Antarctic specialists',
      'Northern Lights voyages',
      'Expert expedition teams',
      'Sustainable exploration focus'
    ],
    ships: ['MS Fridtjof Nansen', 'MS Roald Amundsen', 'MS Maud', 'MS Otto Sverdrup', 'MS Kong Harald', 'MS Nordnorge'],
    destinations: ['Norwegian Fjords', 'Arctic', 'Antarctica', 'Iceland', 'Greenland', 'British Isles'],
    suitableFor: ['Adventure Seekers', 'Nature Lovers', 'Aurora Hunters', 'Wildlife Enthusiasts', 'Polar Explorers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Hurtigruten different from other cruise lines?',
        answer: 'Authentic Norwegian coastal service (134 years) with working ships, hybrid electric fleet, and true expedition focus. Mail ships carrying locals and tourists along iconic fjord route.'
      },
      {
        question: 'What destinations does Hurtigruten sail to?',
        answer: 'Norwegian fjords (daily coastal voyage), Antarctica, Arctic Svalbard, Greenland, Alaska, Galapagos, Kimberley. Signature 6-day Bergen-Kirkenes coastal voyage, 12-day Antarctic Peninsula.'
      },
      {
        question: 'Is Hurtigruten suitable for families?',
        answer: 'Adventure expeditions for families 7+ years with Junior Explorer programme. Active multi-generational families seeking polar wildlife, Zodiac cruises, educational experiences.'
      },
      {
        question: 'What is included in a Hurtigruten holiday?',
        answer: 'All meals (coastal), Zodiac cruises, lectures, hiking, most activities, gratuities included. Extras: premium drinks, kayaking/scuba (limited places), single cabins.'
      },
      {
        question: 'How do I join Hurtigruten\'s loyalty programme?',
        answer: 'Join Hurtigruten Club free after first voyage. Silver, Gold, Platinum tiers. Benefits: priority booking, onboard credit, exclusive events from first sailing.'
      },
      {
        question: 'What should I know before booking a Hurtigruten holiday?',
        answer: 'Active expeditions (hiking/Zodiacs required), waterproof gear essential, European plugs onboard. Book 12-18 months ahead for Antarctica/Arctic. Minimum age 7 years expeditions.'
      }
    ],
    meta: {
      title: 'Hurtigruten Expeditions | Norwegian Coastal & Polar Cruises',
      description: 'Experience Hurtigruten expedition cruises to Norway, Arctic, and Antarctica. World leaders in exploration travel. Book with Limitless Cruises.'
    }
  },
  {
    id: 'silversea',
    slug: 'silversea',
    name: 'Silversea Cruises',
    shortName: 'Silversea',
    tagline: 'All-inclusive ultra-luxury cruising',
    description: 'Silversea delivers the finest ultra-luxury cruise experiences with intimate ships, all-inclusive fares, and butler service in every suite. Their expedition ships bring luxury to the world\'s most remote destinations.',
    category: 'ultra-luxury',
    featured: true,
    
    logo: null,
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Ultra-All-Inclusive Luxury',
        description: 'True all-suite ultra-luxury with butler service in every suite, caviar anywhere anytime, premium drinks, and personalised service. No nickel-and-diming with door-to-door service from UK homes.',
        icon: 'luxury'
      },
      {
        title: 'Small Luxury Expedition Ships',
        description: 'Ultra-intimate ships (100-728 guests) with highest Zodiac ratio and polar-class expedition vessels. Access remote ports, overnight stays, and private yacht harbours mega-ships can\'t reach.',
        icon: 'ship'
      },
      {
        title: 'Personal Butler Service',
        description: 'Dedicated butler for every suite delivering caviar service, in-suite dining, laundry, and personalised service. World\'s highest crew-to-passenger ratio (1:1.4) in ultra-luxury.',
        icon: 'service'
      },
      {
        title: 'S.A.L.T. Culinary Programme',
        description: 'Sea and Land Taste (S.A.L.T.) immersive culinary experiences with regional menus, cooking classes, and shore tastings. World\'s first ocean cruise culinary immersion programme.',
        icon: 'dining'
      },
      {
        title: 'True Expedition Specialists',
        description: 'Silver Origin Galapagos, Silver Endeavour polar expeditions with submarines, kayaks, zodiacs included. Highest expedition activity capacity with expert naturalists leading every voyage.',
        icon: 'expedition'
      },
      {
        title: 'Exceptional Ultra-Luxury Value',
        description: 'Best value true ultra-luxury with all-inclusive features, complimentary excursions, and flexible suite upgrades. Door-to-door service and pre/post hotel packages included.',
        icon: 'value'
      }
    ],
    
    // Destination images for grid
    destinationImages: [
      { name: 'Antarctica',  alt: 'Antarctic ice and penguins' },
      { name: 'Galapagos',  alt: 'Galapagos wildlife' },
      { name: 'Mediterranean',  alt: 'Mediterranean luxury coastline' },
      { name: 'Arctic',  alt: 'Arctic polar landscape' },
      { name: 'Caribbean',  alt: 'Caribbean paradise' }
    ],

    // Kids Club section - Adults-focused (no dedicated kids clubs)
    kidsClub: null, // Silversea is adults-focused ultra-luxury, no dedicated kids clubs

    // Loyalty program
    loyaltyProgram: {
      name: 'Venetian Society',
      intro: 'Venetian Society - Exclusive loyalty programme rewarding repeat ultra-luxury voyages with suite benefits and priority services. Join free after first sailing. Classic (1-49 nights), Silver (50-99 nights), Gold (100-199 nights), Medallion (200+ nights), Century (Century Suite bookings). Ultra-luxury loyalty for Silversea\'s most loyal clientele.',
      pointsInfo: 'Key Benefits: Onboard credit (£150 Silver, £1,000 Medallion per voyage), priority tendering, suite selection, dining reservations, complimentary laundry, spa treatments, premium wines, exclusive cocktail parties, double Venetian points events.',
      tiers: [
        { tier: 'Classic', points: '1-49 nights', benefits: 'Welcome benefits, member pricing' },
        { tier: 'Silver', points: '50-99 nights', benefits: 'Onboard credit, priority services' },
        { tier: 'Gold', points: '100-199 nights', benefits: 'Enhanced Silver benefits, spa treatments' },
        { tier: 'Medallion', points: '200+ nights', benefits: 'Ultimate benefits, highest onboard credit' },
        { tier: 'Century', points: 'Century Suite bookings', benefits: 'Exclusive Century benefits' }
      ]
    },

    highlights: [
      'All-suite, all-inclusive luxury',
      'Butler service in every suite',
      'Expedition and ocean cruise options',
      'Galapagos specialists',
      'Antarctica luxury expeditions',
      'SALT culinary experiences'
    ],
    ships: ['Silver Dawn', 'Silver Nova', 'Silver Ray', 'Silver Moon', 'Silver Muse', 'Silver Spirit', 'Silver Cloud', 'Silver Wind', 'Silver Endeavour', 'Silver Origin'],
    destinations: ['Mediterranean', 'Alaska', 'Antarctica', 'Galapagos', 'Arctic', 'Asia', 'Caribbean'],
    suitableFor: ['Luxury Seekers', 'Couples', 'Expedition Enthusiasts', 'Gourmets', 'Discerning Travellers'],
    // FAQ section for SEO
    faq: [
      {
        question: 'What makes Silversea different from other cruise lines?',
        answer: 'Ultra-all-inclusive luxury with butler service every suite, small expedition ships (100-728 guests), S.A.L.T. culinary immersion, and polar submarines. True personalised ultra-luxury.'
      },
      {
        question: 'What destinations does Silversea sail to?',
        answer: 'Worldwide expeditions: Antarctica, Arctic, Galapagos, Kimberley, South Pacific, Mediterranean, Caribbean. Signature Silver Origin Galapagos, Silver Endeavour polar voyages.'
      },
      {
        question: 'Is Silversea suitable for families?',
        answer: 'Adults-focused ultra-luxury perfect for mature couples and celebrations. No kids clubs but family suites available. Expedition sailings welcome multi-generational families.'
      },
      {
        question: 'What is included in a Silversea holiday?',
        answer: 'Everything: all-suite accommodations, butler service, gourmet dining, premium drinks, caviar service, gratuities, WiFi, laundry, most excursions. True ultra-all-inclusive luxury.'
      },
      {
        question: 'How do I join Silversea\'s loyalty programme?',
        answer: 'Join Venetian Society free after first sailing. Classic (1-49 nights), Silver (50-99 nights), Gold (100-199 nights). Benefits: onboard credit, priority services, suite perks.'
      },
      {
        question: 'What should I know before booking a Silversea holiday?',
        answer: 'Elegant casual (no formal nights), average age 55+, European plugs onboard. Book 12-18 months ahead for expeditions. Ultra-intimate (100-728 guests), personalised butler service.'
      }
    ],
    meta: {
      title: 'Silversea Cruises | Ultra-Luxury All-Inclusive Cruising',
      description: 'Experience Silversea ultra-luxury cruising with butler service and all-inclusive fares. Expedition and ocean cruises worldwide. Book with Limitless Cruises.'
    }
  },
  {
    id: 'ponant',
    slug: 'ponant',
    name: 'Ponant',
    shortName: 'Ponant',
    tagline: 'French luxury expedition cruising',
    description: 'Ponant combines French elegance with expedition expertise aboard their fleet of small luxury ships. From polar regions to tropical islands, Ponant delivers refined exploration with an unmistakable French touch.',
    category: 'luxury-expedition',
    featured: true,
    
    logo: null,
    
    whyChoose: [
      { title: 'French Elegance', description: 'Refined French hospitality and Ducasse Conseil cuisine.', icon: 'luxury' },
      { title: 'Small Luxury Ships', description: 'Intimate vessels carrying 92-264 guests with zodiac fleets.', icon: 'ship' },
      { title: 'Expedition Excellence', description: 'Purpose-built polar vessels with PC2 ice class ratings.', icon: 'expedition' },
      { title: 'All-Inclusive', description: 'Open bar, included excursions, and expedition gear.', icon: 'inclusive' }
    ],
    
    highlights: [
      'French luxury and service',
      'Ducasse Conseil dining',
      'Purpose-built expedition ships',
      'Antarctica and Arctic experts',
      'All-inclusive expedition fares',
      'Blue Eye underwater lounge'
    ],
    ships: ['Le Commandant Charcot', 'Le Bellot', 'Le Jacques Cartier', 'Le Bougainville', 'Le Champlain', 'Le Dumont-d\'Urville', 'Le Lapérouse', 'Le Lyrial', 'L\'Austral', 'Le Boréal'],
    destinations: ['Antarctica', 'Arctic', 'Mediterranean', 'Northern Europe', 'Polynesia', 'Australia'],
    suitableFor: ['Luxury Seekers', 'Expedition Lovers', 'Francophiles', 'Polar Explorers', 'Gourmets'],
    meta: {
      title: 'Ponant | French Luxury Expedition Cruises',
      description: 'Experience Ponant French luxury expedition cruising to Antarctica, Arctic, and beyond. Elegant ships and refined service. Book with Limitless Cruises.'
    }
  }
];

// Helper functions
export const getCruiseLineBySlug = (slug) => cruiseLines.find(cl => cl.slug === slug);
export const getFeaturedCruiseLines = () => cruiseLines.filter(cl => cl.featured);
export const getCruiseLinesByCategory = (category) => cruiseLines.filter(cl => cl.category === category);
