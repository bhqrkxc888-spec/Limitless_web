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
    image: '/images/cruise-lines/po-cruises.jpg',
    logo: '/images/cruise-lines/logos/po-cruises.png',
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'No-Fly from Southampton',
        description: 'Start and finish in the UK with no airport stress. Pounds sterling onboard for easy budgeting, and tips are not required.',
        icon: 'anchor'
      },
      {
        title: 'Ships for Everyone',
        description: 'Adults-only ships (Aurora, Arcadia) for peaceful cruising, or family-friendly vessels (Iona, Arvia, Britannia, Azura, Ventura) with kids clubs.',
        icon: 'ship'
      },
      {
        title: 'SkyDome & The 710 Club',
        description: 'Iona and Arvia feature a glass-enclosed SkyDome and live music bar created with Gary Barlow.',
        icon: 'music'
      },
      {
        title: 'Food Heroes Dining',
        description: 'Enjoy menus by Marco Pierre White, José Pizarro, and wine expert Olly Smith at The Glass House.',
        icon: 'dining'
      },
      {
        title: 'Kids Club: The Reef',
        description: 'Ages 6 months to 17 years with age-specific programs, Night Nursery, and qualified Reef Rangers, all included.',
        icon: 'child'
      },
      {
        title: 'Arvia Exclusives',
        description: 'Try Altitude Skywalk high ropes 54m above the ocean and Mission Control submarine experience.',
        icon: 'adventure'
      }
    ],

    // Destination images for grid
    // TODO: Replace with Supabase URLs when images are uploaded
    // Expected bucket: 'destinations' or 'cruise-lines'
    destinationImages: [
      { name: 'Caribbean', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Caribbean', alt: 'Caribbean beach' },
      { name: 'Mediterranean', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Mediterranean', alt: 'Mediterranean coast' },
      { name: 'Norwegian Fjords', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Norwegian+Fjords', alt: 'Norwegian Fjords' },
      { name: 'Northern Europe', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Northern+Europe', alt: 'Northern Europe' },
      { name: 'Canary Islands', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Canary+Islands', alt: 'Canary Islands' },
      { name: 'Scandinavia', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Scandinavia', alt: 'Scandinavia' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'The Reef',
      intro: 'The Reef provides age-specific groups with dedicated rooms and activities from soft play to DJ sessions. Led by qualified Reef Rangers, clubs include Night Nursery (6 months–4 years), Splashers (2–4), Surfers (5–8), Scubas (9–12), and H2O/The Scene (13–17). Pre-registration is recommended in My P&O Cruises. Optional guaranteed sessions cost around £4.95 (day) or £8.95 (evening). Teen spaces are drop-in.',
      quickFacts: [
        'Included in cruise fare',
        'Qualified Reef Rangers',
        'Night Nursery available',
        'Pre-book guarantee slots'
      ],
      ageGroups: [
        { club: 'Night Nursery', age: '6mo–4yr', morning: '—', afternoon: '—', evening: '6pm–midnight' },
        { club: 'Splashers', age: '2–4yr', morning: '9am–12pm', afternoon: '2pm–5pm', evening: '6pm–10pm' },
        { club: 'Surfers', age: '5–8yr', morning: '9am–12pm', afternoon: '2pm–5pm', evening: '6pm–10pm' },
        { club: 'Scubas', age: '9–12yr', morning: '9am–12pm', afternoon: '2pm–5pm', evening: '6pm–10pm' },
        { club: 'H2O/The Scene', age: '13–17yr', morning: '—', afternoon: 'Open access', evening: 'Open access' }
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
      intro: 'Earn points for every night sailed and unlock benefits across six tiers: Pacific (150+ points) through to Ligurian (2,501+ points, 201+ nights). Enjoy discounts, priority services, and exclusive events.',
      pointsInfo: '10 points per night typically. Benefits vary by ship and itinerary.',
      tiers: [
        { tier: 'Pacific', points: '150–500', benefits: '5% discount, magazine' },
        { tier: 'Atlantic', points: '501–1,000', benefits: '7.5% discount, Champagne welcome' },
        { tier: 'Mediterranean', points: '1,001–2,000', benefits: '8.5% discount, cocktail party' },
        { tier: 'Caribbean', points: '2,001–2,500', benefits: '10% discount, priority booking' },
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
    destinations: ['Mediterranean', 'Norwegian Fjords', 'Caribbean', 'Canary Islands', 'Northern Europe', 'Scandinavia'],
    suitableFor: ['Couples', 'Families', 'Solo Travellers'],
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
    image: '/images/cruise-lines/royal-caribbean.jpg',
    logo: '/images/cruise-lines/logos/royal-caribbean.png',
    whyChoose: [
      { title: 'World\'s Largest Ships', description: 'Icon of the Seas and Wonder of the Seas offer unmatched scale and amenities.', icon: 'ship' },
      { title: 'Innovative Activities', description: 'FlowRider surf simulators, rock climbing, ice skating, and zip lines at sea.', icon: 'adventure' },
      { title: 'Perfect Day at CocoCay', description: 'Private island with Thrill Waterpark and Coco Beach Club.', icon: 'island' },
      { title: 'Award-Winning Entertainment', description: 'Broadway shows, ice skating performances, and AquaTheater diving shows.', icon: 'entertainment' }
    ],
    highlights: [
      'World\'s largest cruise ships',
      'Innovative onboard activities',
      'Perfect Day at CocoCay private island',
      'Award-winning entertainment'
    ],
    ships: ['Icon of the Seas', 'Wonder of the Seas', 'Symphony of the Seas', 'Odyssey of the Seas'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Asia'],
    suitableFor: ['Families', 'Adventure Seekers', 'Multi-generational'],
    meta: {
      title: 'Royal Caribbean Cruises | Book with Limitless Cruises',
      description: 'Discover Royal Caribbean cruise holidays with innovative ships and exciting destinations. Expert advice from Limitless Cruises.'
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
    image: '/images/cruise-lines/msc-cruises.jpg',
    logo: '/images/cruise-lines/logos/msc-cruises.png',
    
    // Why Choose section - benefit cards
    whyChoose: [
      {
        title: 'Accommodation on MSC Cruises',
        description: 'Choose interior, ocean-view, balcony or suites. Guests booking MSC Yacht Club enjoy a private lounge, restaurant and priority benefits.',
        icon: 'accommodation'
      },
      {
        title: 'Food and Entertainment',
        description: 'Full-board dining across restaurants and buffets, plus theatre shows, live music, pools, sports and kids\' clubs. Specialty venues are available fleetwide.',
        icon: 'dining'
      },
      {
        title: 'Global Itineraries',
        description: 'Mediterranean, Caribbean, Northern Europe, Middle East, Asia and more, including convenient MSC UK sailings in season.',
        icon: 'destination'
      },
      {
        title: 'Fly Cruise Packages',
        description: 'Flights, transfers and your cruise fare bundled together for simple, seamless travel to and from the ship.',
        icon: 'travel'
      },
      {
        title: 'Innovative Ships: MSC Virtuosa & MSC World Europa',
        description: 'Striking design, smart technology and vibrant promenades on flagship ships including MSC Virtuosa and MSC World Europa.',
        icon: 'ship'
      },
      {
        title: 'Italian Style & Exclusive Discounts',
        description: 'Friendly Mediterranean service across lounges, bars and spas, plus regular MSC exclusive discounts on selected sailings.',
        icon: 'style'
      },
      {
        title: 'Life onboard MSC Cruises',
        description: 'Choose lively pool decks, sport courts, shows and nightlife, or quiet lounges and spa time. Dining spans Italian classics and international flavours. Families get extensive kids\' and teens\' facilities; couples and solo travellers enjoy stylish bars and wellness. Guests in MSC Yacht Club can retreat to a private sanctuary whenever they choose.',
        icon: 'lifestyle'
      }
    ],

    // Destination images for grid
    // TODO: Replace with Supabase URLs when images are uploaded
    // Expected bucket: 'destinations' or 'cruise-lines'
    destinationImages: [
      { name: 'Caribbean', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Caribbean', alt: 'Caribbean beach and turquoise sea' },
      { name: 'Mediterranean', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Mediterranean', alt: 'Mediterranean ruins and coastline' },
      { name: 'Middle East', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Middle+East', alt: 'Middle East mountains and sea' },
      { name: 'Northern Europe', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Northern+Europe', alt: 'Northern Europe skyline and waterfront' },
      { name: 'Asia & Japan', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Asia+%26+Japan', alt: 'Cherry blossom path in Japan' },
      { name: 'Grand Voyages', image: 'https://via.placeholder.com/800x500/2C344C/C9A962?text=Grand+Voyages', alt: 'Sunset over the ocean on a Grand Voyage' }
    ],

    // Kids Club section
    kidsClub: {
      name: 'Doremi and LEGO® Fun',
      intro: 'MSC Kids Clubs are complimentary programmes on every MSC ship for guests aged 0–17. Children are grouped by age and welcomed in safe, dedicated spaces run by trained, multilingual youth staff. Activities blend fun with learning and are designed to suit each age group, from creative play to team games and socials.',
      detail: 'Age-appropriate playrooms, LEGO® play for younger guests, consoles and social lounges for older children, plus daily schedules that vary between sea days and port days. Parents register children once onboard and can check the daily programme in the app or on notice boards. Sign in and out procedures help make drop off and collection simple.',
      quickFacts: [
        'Complimentary programme for ages 0–17',
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
        { club: 'Baby Club / Baby Time and Baby Care', age: '0–3 years (supervised care from 6 months)', morning: '9:00 am – 12:00 pm', afternoon: '2:00 pm – 5:00 pm', evening: '7:00 pm – 9:00 pm' },
        { club: 'Mini Club', age: '3–6 years', morning: '9:00 am – 12:00 pm', afternoon: '2:00 pm – 5:00 pm', evening: '7:00 pm – 10:00 pm' },
        { club: 'Junior Club', age: '7–11 years', morning: '9:00 am – 12:00 pm', afternoon: '2:00 pm – 5:00 pm', evening: '7:00 pm – 11:00 pm' },
        { club: 'Young Club', age: '12–14 years', morning: '10:00 am – 1:00 pm', afternoon: '3:00 pm – 6:00 pm', evening: '7:00 pm – 11:00 pm' },
        { club: 'Teen Club', age: '15–17 years', morning: '10:00 am – 1:00 pm', afternoon: '3:00 pm – 6:00 pm', evening: '7:00 pm – 11:00 pm' }
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
        { tier: 'Classic', points: '1–2,199', benefits: '5% cruise fare discount, +5% Voyagers Exclusives discount, Double experience points, 10% Logo Shop, 20% Photographs, 10% Digital accessories, 5% Internet, 50% F1 Simulator, 10% SPA services' },
        { tier: 'Silver', points: '2,200–4,299', benefits: 'All Classic benefits, €/$50 Voyagers Exclusives shipboard credit, 10% Laundry package, 10% Minibar' },
        { tier: 'Gold', points: '4,300–9,999', benefits: 'All Silver benefits, Complimentary 1-hour thermal area session, Courtesy bathrobe & slippers, One free F1 Simulator credit, 15% Logo Shop, 20% SPA services' },
        { tier: 'Diamond', points: '10,000–24,999', benefits: 'All Gold benefits, Priority line at check-in, Priority drop-off of luggage, Priority for free cabin upgrade, Priority line assistance, Early access to theatre shows, MSC Voyagers Club Diamond Party, One free picture, Bottle of spumante with macarons, Specialty restaurant dinner, Free bottle of water' },
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
    image: '/images/cruise-lines/norwegian.jpg',
    logo: '/images/cruise-lines/logos/norwegian.png',
    whyChoose: [
      { title: 'Freestyle Cruising', description: 'No set dining times, dress codes, or fixed schedules - cruise your way.', icon: 'freedom' },
      { title: 'The Haven', description: 'Exclusive ship-within-a-ship with private pool, restaurant, and butler service.', icon: 'luxury' },
      { title: 'Great Stirrup Cay', description: 'Private island in the Bahamas with beach villas and water sports.', icon: 'island' },
      { title: 'Award-Winning Entertainment', description: 'Broadway shows, comedy clubs, and world-class performers.', icon: 'entertainment' }
    ],
    highlights: [
      'Freestyle Cruising - no set dining times',
      'The Haven exclusive ship-within-a-ship',
      'Great Stirrup Cay private island',
      'Award-winning entertainment'
    ],
    ships: ['Norwegian Prima', 'Norwegian Viva', 'Norwegian Encore', 'Norwegian Escape'],
    destinations: ['Caribbean', 'Alaska', 'Mediterranean', 'Northern Europe'],
    suitableFor: ['Couples', 'Solo Travellers', 'Families'],
    meta: {
      title: 'Norwegian Cruise Line | Freestyle Cruising Holidays',
      description: 'Experience Freestyle Cruising with Norwegian Cruise Line. Flexible dining, exciting destinations. Book with Limitless Cruises.'
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
    image: '/images/cruise-lines/disney.jpg',
    logo: '/images/cruise-lines/logos/disney.png',
    whyChoose: [
      { title: 'Disney Character Experiences', description: 'Meet beloved characters throughout your voyage with magical moments.', icon: 'magic' },
      { title: 'Broadway-Style Shows', description: 'Award-winning productions including Frozen and Tangled musicals.', icon: 'entertainment' },
      { title: 'Castaway Cay', description: 'Disney\'s private island paradise with family and adults-only beaches.', icon: 'island' },
      { title: 'Adults-Only Areas', description: 'Quiet pools, fine dining, and nightlife exclusively for grown-ups.', icon: 'adults' }
    ],
    highlights: [
      'Disney character experiences',
      'Award-winning Broadway-style shows',
      'Castaway Cay private island',
      'Adults-only areas and dining'
    ],
    ships: ['Disney Wish', 'Disney Fantasy', 'Disney Dream', 'Disney Magic', 'Disney Wonder'],
    destinations: ['Caribbean', 'Bahamas', 'Mediterranean', 'Alaska'],
    suitableFor: ['Families', 'Disney Fans', 'Multi-generational'],
    meta: {
      title: 'Disney Cruise Line | Magical Family Cruise Holidays',
      description: 'Create magical memories with Disney Cruise Line. Character experiences, entertainment & more. Book with Limitless Cruises.'
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
    image: '/images/cruise-lines/celebrity.jpg',
    logo: '/images/cruise-lines/logos/celebrity.png',
    whyChoose: [
      { title: 'Award-Winning Cuisine', description: 'Michelin-starred chefs and innovative dining concepts.', icon: 'dining' },
      { title: 'The Retreat', description: 'Suite-class experience with private lounge, pool, and restaurant.', icon: 'luxury' },
      { title: 'Destination Focus', description: 'Longer stays in port and immersive shore excursions.', icon: 'destination' },
      { title: 'Modern Design', description: 'Stunning Edge Series ships with Magic Carpet and infinite verandas.', icon: 'design' }
    ],
    highlights: [
      'Award-winning cuisine',
      'The Retreat - suite class experience',
      'Destination-focused itineraries',
      'Modern, elegant ship design'
    ],
    ships: ['Celebrity Beyond', 'Celebrity Apex', 'Celebrity Edge', 'Celebrity Eclipse'],
    destinations: ['Caribbean', 'Mediterranean', 'Alaska', 'Galapagos'],
    suitableFor: ['Couples', 'Foodies', 'Luxury Seekers'],
    meta: {
      title: 'Celebrity Cruises | Modern Luxury Cruise Holidays',
      description: 'Experience modern luxury with Celebrity Cruises. Award-winning dining and stunning destinations. Book with Limitless Cruises.'
    }
  },
  {
    id: 'fred-olsen',
    slug: 'fred-olsen-cruises',
    name: 'Fred. Olsen Cruise Lines',
    shortName: 'Fred. Olsen',
    tagline: 'Smaller ships for a more personal experience',
    description: 'Fred. Olsen offers intimate cruising on smaller ships with friendly British service and access to smaller ports that larger ships cannot reach.',
    category: 'traditional',
    featured: false,
    image: '/images/cruise-lines/fred-olsen.jpg',
    logo: '/images/cruise-lines/logos/fred-olsen.png',
    highlights: [
      'Small ship cruising',
      'Access to unique ports',
      'British-style service',
      'Regional UK departures'
    ],
    ships: ['Bolette', 'Borealis', 'Balmoral', 'Braemar'],
    destinations: ['Norwegian Fjords', 'Baltic', 'Mediterranean', 'British Isles'],
    suitableFor: ['Couples', 'Solo Travellers', 'Mature Travellers'],
    meta: {
      title: 'Fred. Olsen Cruises | Small Ship UK Cruising',
      description: 'Discover Fred. Olsen Cruise Lines for intimate small ship cruising from UK ports. Book with Limitless Cruises.'
    }
  },
  {
    id: 'holland-america',
    slug: 'holland-america-line',
    name: 'Holland America Line',
    shortName: 'Holland America',
    tagline: 'A signature of excellence',
    description: 'Holland America Line combines classic elegance with modern amenities, offering enriching destination experiences and refined dining.',
    category: 'premium',
    featured: false,
    image: '/images/cruise-lines/holland-america.jpg',
    logo: '/images/cruise-lines/logos/holland-america.png',
    highlights: [
      'Music Walk entertainment venues',
      'Explorations Central destination experiences',
      'Award-winning Pinnacle Grill',
      'Elegant mid-sized ships'
    ],
    ships: ['Rotterdam', 'Nieuw Statendam', 'Koningsdam', 'Eurodam'],
    destinations: ['Alaska', 'Caribbean', 'Northern Europe', 'World Cruises'],
    suitableFor: ['Mature Travellers', 'Couples', 'Music Lovers'],
    meta: {
      title: 'Holland America Line | Classic Premium Cruising',
      description: 'Experience elegant cruising with Holland America Line. Enriching destinations and refined service. Book with Limitless Cruises.'
    }
  },
  {
    id: 'marella',
    slug: 'marella-cruises',
    name: 'Marella Cruises',
    shortName: 'Marella',
    tagline: 'All-inclusive cruise holidays',
    description: 'Marella Cruises, part of TUI, offers great value all-inclusive cruising with flights included from UK airports.',
    category: 'mainstream',
    featured: false,
    image: '/images/cruise-lines/marella.jpg',
    logo: '/images/cruise-lines/logos/marella.png',
    highlights: [
      'All-inclusive drinks packages',
      'Flights included',
      'Adults-only and family ships',
      'Great value'
    ],
    ships: ['Marella Voyager', 'Marella Discovery', 'Marella Discovery 2', 'Marella Explorer'],
    destinations: ['Mediterranean', 'Caribbean', 'Canary Islands', 'Arabian Gulf'],
    suitableFor: ['Families', 'Couples', 'Budget-conscious'],
    meta: {
      title: 'Marella Cruises | All-Inclusive TUI Cruise Holidays',
      description: 'Book Marella Cruises for all-inclusive cruise holidays with flights. Great value from Limitless Cruises.'
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
    image: '/images/cruise-lines/virgin-voyages.jpg',
    logo: '/images/cruise-lines/logos/virgin-voyages.png',
    whyChoose: [
      { title: 'Adults-Only', description: 'Ships designed exclusively for grown-ups with sophisticated vibes.', icon: 'adults' },
      { title: 'All Restaurants Included', description: '20+ eateries with no main dining room, all included in your fare.', icon: 'dining' },
      { title: 'Rockstar Suites', description: 'Ultimate luxury with private karaoke rooms and champagne on tap.', icon: 'luxury' },
      { title: 'No Buffets', description: 'Fresh, made-to-order food at every venue, no traditional cruise buffets.', icon: 'quality' }
    ],
    highlights: [
      'Adults-only ships',
      'All restaurants included',
      'No main dining room',
      'Rockstar Suites with private karaoke'
    ],
    ships: ['Scarlet Lady', 'Valiant Lady', 'Resilient Lady', 'Brilliant Lady'],
    destinations: ['Caribbean', 'Mediterranean', 'Australia'],
    suitableFor: ['Adults Only', 'Couples', 'Millennials', 'Party Seekers'],
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
    description: 'Viking offers destination-focused ocean and river cruises for curious travellers who want to explore the world thoughtfully.',
    category: 'luxury',
    featured: false,
    image: '/images/cruise-lines/viking.jpg',
    logo: '/images/cruise-lines/logos/viking.png',
    highlights: [
      'Destination-focused itineraries',
      'All-inclusive shore excursions',
      'Adults-only (18+)',
      'Elegant Scandinavian design'
    ],
    ships: ['Viking Neptune', 'Viking Mars', 'Viking Saturn', 'Viking Orion'],
    destinations: ['Northern Europe', 'Mediterranean', 'World Cruises', 'Expeditions'],
    suitableFor: ['Mature Travellers', 'Couples', 'Culture Seekers'],
    meta: {
      title: 'Viking Cruises | Destination-Focused Ocean & River Cruising',
      description: 'Explore with Viking - elegant, destination-focused cruising. Ocean and river voyages. Book with Limitless Cruises.'
    }
  },
  {
    id: 'seabourn',
    slug: 'seabourn-cruises',
    name: 'Seabourn',
    shortName: 'Seabourn',
    tagline: 'Intimate luxury at sea',
    description: 'Seabourn delivers ultra-luxury cruising on intimate ships with exceptional service, all-inclusive luxury, and unique destinations.',
    category: 'ultra-luxury',
    featured: false,
    image: '/images/cruise-lines/seabourn.jpg',
    logo: '/images/cruise-lines/logos/seabourn.png',
    highlights: [
      'All-suite accommodations',
      'Open bars and fine dining included',
      'Intimate ships (up to 600 guests)',
      'Marina with water sports'
    ],
    ships: ['Seabourn Ovation', 'Seabourn Encore', 'Seabourn Quest', 'Seabourn Pursuit'],
    destinations: ['Mediterranean', 'Northern Europe', 'Caribbean', 'Expeditions'],
    suitableFor: ['Luxury Seekers', 'Couples', 'Mature Travellers'],
    meta: {
      title: 'Seabourn Cruises | Ultra-Luxury Small Ship Cruising',
      description: 'Experience Seabourn\'s ultra-luxury all-inclusive cruising. Intimate ships, exceptional service. Book with Limitless Cruises.'
    }
  },
  {
    id: 'princess',
    slug: 'princess-cruises',
    name: 'Princess Cruises',
    shortName: 'Princess',
    tagline: 'Come back new',
    description: 'Princess Cruises offers award-winning MedallionClass technology for a personalised cruise experience with innovative service.',
    category: 'premium',
    featured: false,
    image: '/images/cruise-lines/princess.jpg',
    logo: '/images/cruise-lines/logos/princess.png',
    highlights: [
      'MedallionClass technology',
      'Movies Under the Stars',
      'Discovery at Sea programmes',
      'Private balcony dining'
    ],
    ships: ['Sun Princess', 'Discovery Princess', 'Enchanted Princess', 'Sky Princess'],
    destinations: ['Alaska', 'Caribbean', 'Mediterranean', 'Australia'],
    suitableFor: ['Couples', 'Families', 'Tech-savvy Travellers'],
    meta: {
      title: 'Princess Cruises | MedallionClass Cruise Holidays',
      description: 'Discover Princess Cruises with innovative MedallionClass service. Award-winning cruising. Book with Limitless Cruises.'
    }
  },
  {
    id: 'azamara',
    slug: 'azamara-cruises',
    name: 'Azamara',
    shortName: 'Azamara',
    tagline: 'Destination immersion at sea',
    description: 'Azamara specializes in destination-intensive cruising with longer stays, more overnights, and night touring in unique ports.',
    category: 'luxury',
    featured: false,
    image: '/images/cruise-lines/azamara.jpg',
    logo: '/images/cruise-lines/logos/azamara.png',
    highlights: [
      'Longer stays in port',
      'More overnight calls',
      'AzAmazing Evenings events',
      'Boutique ships (600-700 guests)'
    ],
    ships: ['Azamara Journey', 'Azamara Quest', 'Azamara Pursuit', 'Azamara Onward'],
    destinations: ['Mediterranean', 'British Isles', 'Asia', 'South America'],
    suitableFor: ['Culture Seekers', 'Couples', 'Mature Travellers'],
    meta: {
      title: 'Azamara Cruises | Destination-Intensive Boutique Cruising',
      description: 'Experience Azamara\'s destination-immersive cruising. Longer port stays, unique experiences. Book with Limitless Cruises.'
    }
  },
  {
    id: 'cunard',
    slug: 'cunard-cruises',
    name: 'Cunard',
    shortName: 'Cunard',
    tagline: 'The most famous ocean liners in the world',
    description: 'Cunard offers timeless elegance aboard the world\'s most iconic ocean liners, including Queen Mary 2, Queen Victoria, and Queen Elizabeth.',
    category: 'luxury',
    featured: true,
    image: '/images/cruise-lines/cunard.jpg',
    logo: '/images/cruise-lines/logos/cunard.png',
    whyChoose: [
      { title: 'Legendary Ocean Liners', description: 'Sail on Queen Mary 2, the only true transatlantic ocean liner in service.', icon: 'ship' },
      { title: 'White Star Service', description: 'Impeccable British service with formal evenings and afternoon tea.', icon: 'service' },
      { title: 'Transatlantic Crossings', description: 'Experience the iconic 7-night voyage between Southampton and New York.', icon: 'voyage' },
      { title: 'Grill Dining', description: 'Exclusive Grill Suites with dedicated restaurants and lounges.', icon: 'dining' }
    ],
    highlights: [
      'Iconic Queen Mary 2 transatlantic crossings',
      'White Star service and formal evenings',
      'Grill Suite exclusive experiences',
      'Royal Nights themed events'
    ],
    ships: ['Queen Mary 2', 'Queen Victoria', 'Queen Elizabeth', 'Queen Anne'],
    destinations: ['Transatlantic', 'World Cruises', 'Mediterranean', 'Northern Europe'],
    suitableFor: ['Couples', 'Mature Travellers', 'Luxury Seekers', 'History Enthusiasts'],
    meta: {
      title: 'Cunard Cruises | Luxury Ocean Liner Voyages',
      description: 'Experience Cunard\'s legendary ocean liners. Queen Mary 2 transatlantic crossings and world cruises. Book with Limitless Cruises.'
    }
  },
  {
    id: 'ae-expeditions',
    slug: 'ae-expeditions',
    name: 'Aurora Expeditions',
    shortName: 'Aurora',
    tagline: 'Adventure expedition cruising',
    description: 'Aurora Expeditions offers adventure expedition cruises to remote destinations including Antarctica, Arctic, and beyond.',
    category: 'expedition',
    featured: false,
    image: '/images/cruise-lines/ae-expeditions.jpg',
    logo: '/images/cruise-lines/logos/ae-expeditions.png',
    highlights: [
      'Expedition to remote regions',
      'Expert expedition team',
      'Zodiac excursions',
      'Small expedition vessels'
    ],
    ships: ['Greg Mortimer', 'Sylvia Earle', 'Douglas Mawson'],
    destinations: ['Antarctica', 'Arctic', 'Kimberley', 'Remote Islands'],
    suitableFor: ['Adventure Seekers', 'Wildlife Enthusiasts', 'Photographers'],
    meta: {
      title: 'Aurora Expeditions | Antarctic & Arctic Expedition Cruises',
      description: 'Explore Antarctica and the Arctic with Aurora Expeditions. Adventure expedition cruising. Book with Limitless Cruises.'
    }
  }
];

// Helper functions
export const getCruiseLineBySlug = (slug) => cruiseLines.find(cl => cl.slug === slug);
export const getFeaturedCruiseLines = () => cruiseLines.filter(cl => cl.featured);
export const getCruiseLinesByCategory = (category) => cruiseLines.filter(cl => cl.category === category);
