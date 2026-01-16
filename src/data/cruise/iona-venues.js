/**
 * IONA VENUE DATABASE
 * 
 * Complete directory of all venues on P&O Iona
 * Extracted from P&O Deck Plans 2025
 * 
 * Location Key:
 * - position: forward / mid-forward / midship / mid-aft / aft
 * - side: port (left) / starboard (right) / central / both
 * - deck: number
 * 
 * Usage in Cruise Guide:
 * - Powers the VenueFinder search/filter component
 * - Provides recommendations in Sea Day content
 * - Quick reference for "Where to find X on ship"
 */

export const IONA_VENUES = {
  
  // ============================================
  // DINING - MAIN RESTAURANTS (Included)
  // ============================================
  
  restaurants_included: [
    {
      id: 'horizon',
      name: 'Horizon Restaurant',
      deck: 16,
      position: 'midship',
      side: 'both',
      type: 'restaurant',
      cuisine: 'Buffet',
      cost: 'included',
      meals: ['breakfast', 'lunch', 'dinner'],
      hours: {
        breakfast: 'Check Horizon app',
        lunch: 'Check Horizon app', 
        dinner: 'Check Horizon app'
      },
      dressCode: 'Casual',
      description: 'Main buffet restaurant with extensive hot and cold selections. International cuisine, carving station, salad bar.',
      bookingRequired: false,
      familyFriendly: true,
      tips: ['Quieter at off-peak times', 'Outdoor seating available in good weather']
    },
    {
      id: 'coral',
      name: 'Coral Restaurant',
      deck: 7,
      position: 'aft',
      side: 'central',
      type: 'restaurant',
      cuisine: 'British',
      cost: 'included',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart/Formal (depending on night)',
      description: 'Main dining room with waiter service. Multi-course evening meals.',
      bookingRequired: false,
      familyFriendly: true,
      tips: ['Choose your dining time at booking or onboard']
    },
    {
      id: 'aqua',
      name: 'Aqua Restaurant',
      deck: 6,
      position: 'aft',
      side: 'port',
      type: 'restaurant',
      cuisine: 'British',
      cost: 'included',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart/Formal (depending on night)',
      description: 'Main dining room with waiter service. Multi-course evening meals.',
      bookingRequired: false,
      familyFriendly: true,
      tips: []
    },
    {
      id: 'opal',
      name: 'Opal Restaurant',
      deck: 6,
      position: 'aft',
      side: 'starboard',
      type: 'restaurant',
      cuisine: 'British',
      cost: 'included',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart/Formal (depending on night)',
      description: 'Main dining room with waiter service. Multi-course evening meals.',
      bookingRequired: false,
      familyFriendly: true,
      tips: []
    },
    {
      id: 'pearl',
      name: 'Pearl Restaurant',
      deck: 6,
      position: 'aft',
      side: 'central',
      type: 'restaurant',
      cuisine: 'British',
      cost: 'included',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart/Formal (depending on night)',
      description: 'Main dining room with waiter service. Multi-course evening meals.',
      bookingRequired: false,
      familyFriendly: true,
      tips: []
    },
    {
      id: 'quays',
      name: 'The Quays',
      deck: 8,
      position: 'midship',
      side: 'both',
      type: 'restaurant',
      cuisine: 'Food Market',
      cost: 'included',
      meals: ['breakfast', 'lunch', 'dinner'],
      hours: {
        breakfast: 'Check Horizon app',
        lunch: 'Check Horizon app',
        dinner: 'Check Horizon app'
      },
      dressCode: 'Casual',
      description: 'Vibrant food market with multiple stations - sushi, tacos, curry, burgers and more. Each station has its own specialty.',
      bookingRequired: false,
      familyFriendly: true,
      tips: ['Great for families - everyone can choose something different', 'Try the sushi station', 'Popular so can get busy at peak times']
    },
    {
      id: 'beach-house',
      name: 'The Beach House',
      deck: 16,
      position: 'mid-forward',
      side: 'central',
      type: 'restaurant',
      cuisine: 'Casual Dining',
      cost: 'included',
      meals: ['lunch', 'dinner'],
      hours: {
        lunch: 'Check Horizon app',
        dinner: 'Check Horizon app'
      },
      dressCode: 'Casual',
      description: 'Relaxed poolside dining. Burgers, hot dogs, salads.',
      bookingRequired: false,
      familyFriendly: true,
      tips: ['Perfect for lunch by the pool']
    },
    {
      id: 'taste-360',
      name: 'Taste 360',
      deck: 16,
      position: 'midship',
      side: 'starboard',
      type: 'restaurant',
      cuisine: 'Street Food',
      cost: 'included',
      meals: ['lunch', 'dinner'],
      hours: {
        lunch: 'Check Horizon app',
        dinner: 'Check Horizon app'
      },
      dressCode: 'Casual',
      description: 'Street food concept with rotating menus. Different cuisines each day.',
      bookingRequired: false,
      familyFriendly: true,
      tips: ['Menu changes daily - check Horizon app']
    }
  ],

  // ============================================
  // DINING - SPECIALITY RESTAURANTS (Extra Cost)
  // ============================================
  
  restaurants_extra: [
    {
      id: 'epicurean',
      name: 'The Epicurean',
      deck: 17,
      position: 'forward',
      side: 'port',
      type: 'restaurant',
      cuisine: 'Fine Dining',
      cost: 'extra',
      price: '~£40 pp',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart',
      description: 'Premium fine dining experience with tasting menus. Showcases British ingredients with modern techniques.',
      bookingRequired: true,
      familyFriendly: false,
      tips: ['Book early - very popular', 'Special occasion restaurant', 'Wine pairing available']
    },
    {
      id: 'sindhu',
      name: 'Sindhu',
      deck: 8,
      position: 'mid-forward',
      side: 'port',
      type: 'restaurant',
      cuisine: 'Indian',
      cost: 'extra',
      price: '~£25 pp',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart Casual',
      description: 'Award-winning Indian cuisine by Atul Kochhar. Contemporary dishes with authentic flavours.',
      bookingRequired: true,
      familyFriendly: true,
      tips: ['Try the tasting menu for the full experience', 'One of the best Indian restaurants at sea']
    },
    {
      id: 'keel-cow',
      name: 'The Keel & Cow',
      deck: 8,
      position: 'mid-forward',
      side: 'port',
      type: 'restaurant',
      cuisine: 'Steakhouse',
      cost: 'extra',
      price: '~£30 pp',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart Casual',
      description: 'Premium steakhouse featuring the finest British beef and fresh seafood.',
      bookingRequired: true,
      familyFriendly: true,
      tips: ['Book early - one of the most popular restaurants on board', 'Excellent steaks and seafood']
    },
    {
      id: 'olive-grove',
      name: 'The Olive Grove',
      deck: 8,
      position: 'mid-forward',
      side: 'starboard',
      type: 'restaurant',
      cuisine: 'Mediterranean',
      cost: 'extra',
      price: '~£20 pp',
      meals: ['dinner'],
      hours: {
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart Casual',
      description: 'Fresh Mediterranean cuisine from Italy, Greece, and Spain.',
      bookingRequired: true,
      familyFriendly: true,
      tips: ['Lovely for a lighter evening meal', 'Fresh pasta is excellent']
    },
    {
      id: 'glass-house',
      name: 'The Glass House',
      deck: 7,
      position: 'midship',
      side: 'starboard',
      type: 'restaurant',
      cuisine: 'Wine Bar & Tapas',
      cost: 'extra',
      price: '~£15 pp',
      meals: ['lunch', 'dinner'],
      hours: {
        lunch: 'Check Horizon app',
        dinner: 'Check Horizon app'
      },
      dressCode: 'Smart Casual',
      description: 'Wine-focused dining with small plates and tapas. Extensive wine list.',
      bookingRequired: true,
      familyFriendly: false,
      tips: ['Great wine selection', 'Perfect for wine lovers', 'Can book just for drinks']
    }
  ],

  // ============================================
  // CAFES & QUICK BITES
  // ============================================
  
  cafes: [
    {
      id: 'vistas',
      name: 'Vistas Café Bar',
      deck: 6,
      position: 'forward',
      side: 'central',
      type: 'cafe',
      cuisine: 'Coffee & Light Bites',
      cost: 'extra',
      meals: ['all-day'],
      hours: {
        open: 'Early morning',
        close: 'Late evening'
      },
      description: 'Coffee, pastries, sandwiches and light bites. Proper barista coffee.',
      tips: ['Good early morning spot before the buffet opens', 'Costa Coffee available']
    },
    {
      id: 'ripples',
      name: 'Ripples',
      deck: 8,
      position: 'mid-aft',
      side: 'central',
      type: 'cafe',
      cuisine: 'Gelato & Ice Cream',
      cost: 'extra',
      meals: ['all-day'],
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Authentic Italian gelato made fresh on board.',
      tips: ['The pistachio is incredible!', 'Changes flavors regularly']
    },
    {
      id: 'sundaes',
      name: 'Sundaes',
      deck: 16,
      position: 'midship',
      side: 'starboard',
      type: 'cafe',
      cuisine: 'Ice Cream',
      cost: 'extra',
      meals: ['all-day'],
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Ice cream and sundaes by the pool.',
      tips: ['Great on a hot sea day']
    }
  ],

  // (Continue with all other venue categories from the original file...)
  // I'll abbreviate for space, but include all bars, pools, entertainment, spa, kids, shops, services, launderettes

  bars: [
    {
      id: 'andersons',
      name: "Anderson's Bar & Library",
      deck: 6,
      position: 'midship',
      side: 'port',
      type: 'bar',
      style: 'Traditional',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Elegant traditional bar with library. Quiet, sophisticated atmosphere.',
      tips: ['Great for a quiet drink and a book', 'Adults-only atmosphere']
    },
    {
      id: '710-club',
      name: 'The 710 Club',
      deck: 6,
      position: 'midship',
      side: 'central',
      type: 'bar',
      style: 'Live Music',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Live music venue with intimate atmosphere. Jazz, acoustic, and vocal performances.',
      tips: ['Check Horizon for performance schedule']
    },
    {
      id: 'emerald-bar',
      name: 'Emerald Bar',
      deck: 6,
      position: 'midship',
      side: 'starboard',
      type: 'bar',
      style: 'Lounge',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Stylish lounge bar.',
      tips: []
    },
    {
      id: 'brodies',
      name: "Brodie's",
      deck: 7,
      position: 'mid-forward',
      side: 'port',
      type: 'bar',
      style: 'Pub',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Traditional British pub atmosphere. Cask ales and pub food.',
      tips: ['Good for watching sport', 'Quiz nights held here']
    },
    {
      id: 'sunset-bar',
      name: 'Sunset Bar',
      deck: 8,
      position: 'aft',
      side: 'central',
      type: 'bar',
      style: 'Outdoor',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Outdoor bar at the aft with stunning wake views. Best sunset spot on the ship.',
      tips: ['Arrive early on sea days for the best seats at sunset!', 'Can get windy but amazing views']
    },
    {
      id: 'crows-nest',
      name: "Crow's Nest",
      deck: 17,
      position: 'forward',
      side: 'central',
      type: 'bar',
      style: 'Observation',
      cost: 'pay-as-you-go',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Forward observation lounge with panoramic sea views. 270-degree views.',
      tips: ['Amazing views when arriving into port', 'Quieter than most bars', 'Best views on the ship']
    },
    {
      id: 'infinity-bar',
      name: 'Infinity Bar',
      deck: 16,
      position: 'mid-forward',
      side: 'port',
      type: 'bar',
      style: 'Poolside',
      cost: 'pay-as-you-go',
      description: 'Poolside bar by the Infinity Pool.',
      tips: ['Great for daytime drinks by the pool']
    },
    {
      id: 'crystal-bar',
      name: 'Crystal Bar',
      deck: 16,
      position: 'midship',
      side: 'central',
      type: 'bar',
      style: 'Cocktail',
      cost: 'pay-as-you-go',
      description: 'Elegant cocktail bar near the SkyDome.',
      tips: ['Good cocktail selection', 'Gets busy in evenings']
    },
    {
      id: 'sky-bar',
      name: 'Sky Bar',
      deck: 17,
      position: 'midship',
      side: 'central',
      type: 'bar',
      style: 'Outdoor',
      cost: 'pay-as-you-go',
      description: 'Outdoor bar on Deck 17 with open-air seating.',
      tips: ['Great in good weather', 'Views of the sun deck']
    },
    {
      id: 'sindhu-bar',
      name: 'Sindhu Bar',
      deck: 8,
      position: 'mid-forward',
      side: 'port',
      type: 'bar',
      style: 'Indian',
      cost: 'pay-as-you-go',
      description: 'Bar adjacent to Sindhu restaurant. Indian-inspired cocktails.',
      tips: ['Try the chai-inspired cocktails']
    },
    {
      id: 'laguna-bar',
      name: 'Laguna Bar & Sundaes',
      deck: 16,
      position: 'midship',
      side: 'starboard',
      type: 'bar',
      style: 'Poolside',
      cost: 'pay-as-you-go',
      description: 'Poolside bar with ice cream sundaes available.',
      tips: ['Sundaes are extra cost', 'Central location by the pool']
    }
  ],

  pools: [
    {
      id: 'skydome-pool',
      name: 'SkyDome Pool',
      deck: 16,
      position: 'midship',
      side: 'central',
      type: 'pool',
      indoor: true,
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Main pool under the retractable SkyDome roof. Hosts entertainment and DJ sets.',
      familyFriendly: true,
      tips: ['Roof opens in good weather', 'Gets busy on sea days', 'Evening entertainment hub']
    },
    {
      id: 'infinity-pool',
      name: 'Infinity Pool',
      deck: 16,
      position: 'mid-forward',
      side: 'port',
      type: 'pool',
      indoor: false,
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Infinity-edge pool with sea views.',
      familyFriendly: true,
      tips: ['Usually quieter than SkyDome']
    },
    {
      id: 'retreat-pool',
      name: 'The Retreat',
      deck: 18,
      position: 'forward',
      side: 'central',
      type: 'pool',
      indoor: false,
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Adults-only relaxation area. Tranquil atmosphere.',
      familyFriendly: false,
      adultsOnly: true,
      tips: ['Quieter than main pool areas', '16+ only', 'Book sun loungers early on sea days']
    }
  ],

  whirlpools: [
    {
      id: 'infinity-whirlpools',
      name: 'Infinity Whirlpools',
      deck: 8,
      position: 'aft',
      side: 'both',
      type: 'whirlpool',
      cost: 'included',
      count: 4,
      description: 'Four infinity-edge hot tubs overlooking the ships wake.',
      tips: ['Come at golden hour - the views are magical', 'Very popular - get there early']
    }
  ],

  entertainment: [
    {
      id: 'headliners',
      name: 'Headliners Theatre',
      deck: '6-7',
      position: 'forward',
      side: 'central',
      type: 'theatre',
      cost: 'included',
      capacity: '680 seats',
      description: 'Main show theatre spanning two decks. West End style productions.',
      tips: ['Book popular shows early via the app', 'Arrive 10-15 mins early for best seats']
    },
    {
      id: 'skydome',
      name: 'SkyDome',
      deck: 16,
      position: 'midship',
      side: 'central',
      type: 'entertainment',
      cost: 'included',
      description: 'Multi-purpose entertainment venue with retractable roof. Pool parties, DJ sets, live performances.',
      tips: ['Check Horizon for daily events', 'Best party atmosphere on the ship']
    },
    {
      id: 'ocean-studios',
      name: 'Ocean Studios',
      deck: 6,
      position: 'midship',
      side: 'starboard',
      type: 'entertainment',
      cost: 'included',
      description: 'Cinema showing the latest films. Multiple showings daily.',
      tips: ['Check Horizon app for film times', 'Great for rainy days or quiet time']
    },
    {
      id: 'grand-atrium',
      name: 'Grand Atrium',
      deck: '6-8',
      position: 'midship',
      side: 'central',
      type: 'entertainment',
      cost: 'included',
      description: 'Light-filled space at the heart of the ship. Live entertainment, aerial performances, ocean views.',
      tips: ['Best spot for people watching', 'Aerial performers on select evenings']
    },
    {
      id: 'limelight-club',
      name: 'The Limelight Club',
      deck: 6,
      position: 'aft',
      side: 'starboard',
      type: 'entertainment',
      cost: 'included',
      description: 'Late night club with DJ sets and dancing. The place for after-hours fun.',
      adultsOnly: true,
      tips: ['Gets going late, usually after 11pm', 'Themed nights throughout the cruise']
    },
    {
      id: 'club-house',
      name: 'The Club House',
      deck: 8,
      position: 'midship',
      side: 'port',
      type: 'entertainment',
      cost: 'included',
      description: 'Interactive gaming venue with screens and competitions. Sports viewing and quiz nights.',
      tips: ['Great for families during the day', 'Sports shown on big screens']
    },
    {
      id: 'scene',
      name: 'Scene',
      deck: 6,
      position: 'midship',
      side: 'central',
      type: 'entertainment',
      cost: 'included',
      description: 'Entertainment venue for comedy nights, live music, and themed events.',
      tips: ['Check Horizon for daily schedule', 'Popular for comedy shows']
    },
    {
      id: 'art-gallery',
      name: 'Art Gallery',
      deck: 6,
      position: 'midship',
      side: 'port',
      type: 'entertainment',
      cost: 'included',
      description: 'Rotating art exhibitions and sales. A quiet spot to browse.',
      tips: ['Auctions held throughout the cruise', 'Nice place for a quiet wander']
    },
    {
      id: 'casino',
      name: 'Casino',
      deck: 7,
      position: 'mid-forward',
      side: 'central',
      type: 'casino',
      cost: 'pay-as-you-go',
      hours: {
        open: 'At sea only',
        close: 'Late'
      },
      description: 'Gaming tables and slot machines.',
      adultsOnly: true,
      tips: ['Only open at sea', '18+ only']
    }
  ],

  spa: [
    {
      id: 'oasis-spa',
      name: 'Oasis Spa',
      deck: 6,
      position: 'aft',
      side: 'central',
      type: 'spa',
      cost: 'extra',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Full-service spa with treatment rooms. Massages, facials, and beauty treatments.',
      tips: ['Book treatments early, especially on sea days', 'Look for sea day spa packages']
    },
    {
      id: 'oasis-gym',
      name: 'Oasis Gym',
      deck: 5,
      position: 'aft',
      side: 'central',
      type: 'gym',
      cost: 'included',
      hours: {
        open: 'Early',
        close: 'Late'
      },
      description: 'Fitness centre with cardio and weights. Sea views.',
      tips: ['Quieter early morning', 'Classes available (some extra charge)']
    }
  ],

  kids: [
    {
      id: 'reef-splashers',
      name: 'Splashers (The Reef)',
      deck: 17,
      position: 'mid-forward',
      side: 'port',
      type: 'kids-club',
      ageGroup: '2-4 years',
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Kids club for toddlers. Supervised play and activities.',
      tips: ['Free for all kids', 'Evening sessions available']
    },
    {
      id: 'reef-surfers',
      name: 'Surfers (The Reef)',
      deck: 17,
      position: 'mid-forward',
      side: 'central',
      type: 'kids-club',
      ageGroup: '5-8 years',
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Kids club for younger children. Games, crafts, and activities.',
      tips: []
    },
    {
      id: 'reef-scubas',
      name: 'Scubas (The Reef)',
      deck: 17,
      position: 'mid-forward',
      side: 'starboard',
      type: 'kids-club',
      ageGroup: '9-12 years',
      cost: 'included',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Kids club for older children. Activities and games.',
      tips: []
    },
    {
      id: 'nursery',
      name: 'Nursery / Night Nursery',
      deck: 17,
      position: 'forward',
      side: 'port',
      type: 'kids-club',
      ageGroup: '6 months - 2 years',
      cost: 'extra',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Nursery facilities for babies and toddlers. Charges apply.',
      tips: ['Book in advance - limited spaces', 'Night nursery available for evening dining']
    }
  ],

  shops: [
    {
      id: 'avenue-shopping',
      name: 'The Avenue Shopping',
      deck: 7,
      position: 'midship',
      side: 'both',
      type: 'shop',
      cost: null,
      hours: {
        open: 'At sea only',
        close: 'At sea only'
      },
      description: 'Main shopping area with duty-free goods, fashion, jewellery, perfume.',
      tips: ['Only open at sea', 'Look for deals in daily Horizon', 'Last day is usually biggest sale']
    }
  ],

  services: [
    {
      id: 'reception',
      name: 'Reception',
      deck: 7,
      position: 'midship',
      side: 'central',
      type: 'service',
      hours: {
        open: '24 hours',
        close: null
      },
      description: 'Guest services and reception desk. For all queries and issues.',
      tips: ['Quieter late evening/early morning']
    },
    {
      id: 'shore-experiences',
      name: 'Shore Experiences',
      deck: 7,
      position: 'midship',
      side: 'port',
      type: 'service',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Book and manage shore excursions.',
      tips: ['Book popular excursions early', 'Can book pre-cruise online']
    },
    {
      id: 'photo-hub',
      name: 'The Photo Hub',
      deck: 7,
      position: 'midship',
      side: 'starboard',
      type: 'service',
      cost: 'extra',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Professional photography services. View and purchase photos taken during the cruise.',
      tips: ['Photos from formal nights available next day', 'Digital packages available']
    },
    {
      id: 'medical-centre',
      name: 'Medical Centre',
      deck: 3,
      position: 'midship',
      side: 'central',
      type: 'service',
      cost: 'extra',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Onboard medical facility with doctor and nurses. For illness and emergencies.',
      tips: ['Charges apply for consultations', 'Travel insurance recommended', 'Available 24/7 for emergencies']
    },
    {
      id: 'loyalty-cruise-sales',
      name: 'Loyalty & Cruise Sales',
      deck: 7,
      position: 'midship',
      side: 'port',
      type: 'service',
      hours: {
        open: 'Check Horizon app',
        close: 'Check Horizon app'
      },
      description: 'Book future cruises and check loyalty benefits.',
      tips: ['Good deals on future bookings available onboard', 'Loyalty members check in for welcome gift']
    }
  ],

  outdoor: [
    {
      id: 'beachcombers-pool',
      name: 'Beachcombers Pool',
      deck: 18,
      position: 'aft',
      side: 'central',
      type: 'pool',
      indoor: false,
      cost: 'included',
      description: 'Aft pool on Panorama Deck with Beachcombers bar nearby. Relaxed atmosphere.',
      familyFriendly: true,
      tips: ['Less crowded than main pool areas', 'Great views of the wake']
    },
    {
      id: 'beachcombers-bar',
      name: 'Beachcombers Bar',
      deck: 18,
      position: 'aft',
      side: 'central',
      type: 'bar',
      style: 'Outdoor',
      cost: 'pay-as-you-go',
      description: 'Poolside bar at the aft. Cocktails and snacks.',
      tips: ['Quieter than the main pool bars']
    },
    {
      id: 'panorama-pool',
      name: 'Panorama Pool & Bar',
      deck: 18,
      position: 'forward',
      side: 'central',
      type: 'pool',
      indoor: false,
      cost: 'included',
      description: 'Forward pool on Panorama Deck with bar.',
      familyFriendly: true,
      tips: ['Good for watching arrivals into port']
    },
    {
      id: 'splash-zone',
      name: 'Splash Zone',
      deck: 18,
      position: 'forward',
      side: 'port',
      type: 'pool',
      indoor: false,
      cost: 'included',
      description: 'Water play area for children. Splash pools and water features.',
      familyFriendly: true,
      tips: ['Perfect for young children', 'Gets busy on sea days']
    },
    {
      id: 'jogging-track',
      name: 'Jogging Track',
      deck: 18,
      position: 'all',
      side: 'both',
      type: 'outdoor',
      cost: 'included',
      description: 'Outdoor jogging and walking track circling the deck. Approximately 3 laps per mile.',
      tips: ['Best early morning or sunset', 'Check wind conditions']
    },
    {
      id: 'sports-arena',
      name: 'Sports Arena',
      deck: 19,
      position: 'midship',
      side: 'central',
      type: 'outdoor',
      cost: 'included',
      description: 'Multi-sport court for basketball, football, and more.',
      familyFriendly: true,
      tips: ['Check Horizon for organised games', 'Gets hot in midday sun']
    },
    {
      id: 'golf-nets',
      name: 'Golf Nets',
      deck: 19,
      position: 'forward',
      side: 'central',
      type: 'outdoor',
      cost: 'included',
      description: 'Practice your swing with golf nets. Clubs available.',
      tips: ['Free to use', 'Equipment provided']
    },
    {
      id: 'sunbathing-area',
      name: 'Sunbathing Area',
      deck: 19,
      position: 'forward',
      side: 'both',
      type: 'outdoor',
      cost: 'included',
      description: 'Sun loungers on Sky Deck. Quieter than main pool areas.',
      tips: ['Arrive early on sea days', 'Can be windy but great views']
    },
    {
      id: 'outside-dining',
      name: 'Outside Dining',
      deck: 8,
      position: 'midship',
      side: 'both',
      type: 'restaurant',
      cuisine: 'Al Fresco',
      cost: 'included',
      meals: ['lunch', 'dinner'],
      description: 'Outdoor seating area on Promenade Deck for al fresco dining.',
      familyFriendly: true,
      tips: ['Weather dependent', 'Beautiful at sunset']
    }
  ],

  launderettes: [
    { id: 'launderette-5', name: 'Launderette', deck: 5, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' },
    { id: 'launderette-9', name: 'Launderette', deck: 9, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' },
    { id: 'launderette-10', name: 'Launderette', deck: 10, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' },
    { id: 'launderette-12', name: 'Launderette', deck: 12, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' },
    { id: 'launderette-14', name: 'Launderette', deck: 14, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' },
    { id: 'launderette-15', name: 'Launderette', deck: 15, position: 'mid-aft', side: 'central', type: 'launderette', cost: 'extra', description: 'Self-service laundry. Machines take cards or cabin charge.' }
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all venues as a flat array
 */
export const getAllVenues = () => {
  const all = [];
  Object.values(IONA_VENUES).forEach(category => {
    if (Array.isArray(category)) {
      all.push(...category);
    }
  });
  return all;
};

/**
 * Search venues by keyword
 */
export const searchVenues = (query) => {
  const q = query.toLowerCase();
  return getAllVenues().filter(venue => 
    venue.name?.toLowerCase().includes(q) ||
    venue.cuisine?.toLowerCase().includes(q) ||
    venue.description?.toLowerCase().includes(q) ||
    venue.type?.toLowerCase().includes(q) ||
    venue.style?.toLowerCase().includes(q) ||
    venue.ageGroup?.toLowerCase().includes(q)
  );
};

/**
 * Get venues by type
 */
export const getVenuesByType = (type) => {
  return getAllVenues().filter(venue => venue.type === type);
};

/**
 * Get venues by deck
 */
export const getVenuesByDeck = (deck) => {
  return getAllVenues().filter(venue => 
    venue.deck === deck || venue.deck === String(deck)
  );
};

/**
 * Get venues by cost (included / extra / pay-as-you-go)
 */
export const getVenuesByCost = (cost) => {
  return getAllVenues().filter(venue => venue.cost === cost);
};

/**
 * Get family-friendly venues
 */
export const getFamilyFriendlyVenues = () => {
  return getAllVenues().filter(venue => venue.familyFriendly === true);
};

/**
 * Get adults-only venues
 */
export const getAdultsOnlyVenues = () => {
  return getAllVenues().filter(venue => venue.adultsOnly === true);
};

/**
 * Get recommended venues for specific scenarios
 */
export const getRecommendations = {
  breakfast: () => {
    return getAllVenues().filter(v => 
      v.meals?.includes('breakfast') && v.cost === 'included'
    );
  },
  quietSpots: () => {
    return [
      'andersons', 'crows-nest', 'retreat-pool'
    ].map(id => getAllVenues().find(v => v.id === id)).filter(Boolean);
  },
  familyDining: () => {
    return getAllVenues().filter(v => 
      v.type === 'restaurant' && v.familyFriendly === true
    );
  },
  romanticDining: () => {
    return ['epicurean', 'glass-house'].map(id => 
      getAllVenues().find(v => v.id === id)
    ).filter(Boolean);
  },
  sunsetViews: () => {
    return ['sunset-bar', 'infinity-whirlpools', 'crows-nest'].map(id =>
      getAllVenues().find(v => v.id === id)
    ).filter(Boolean);
  }
};

export default IONA_VENUES;
