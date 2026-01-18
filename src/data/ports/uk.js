/**
 * UK Ports Content
 */

export const ukPorts = {
  'southampton': {
    portName: 'Southampton',
    displayName: 'Southampton',
    country: 'United Kingdom',
    
    overview: {
      hook: 'Britain\'s cruise capital and the Titanic\'s departure point, where maritime history meets modern shopping just steps from medieval walls.',
      description: `Southampton is the UK\'s premier cruise hub, handling over two million passengers annually through its five modern terminals. This historic port city served as the departure point for the RMS Titanic in 1912, and that maritime heritage remains central to its identity today. The city seamlessly blends centuries of seafaring history with contemporary shopping and dining experiences.

Walking off your ship at City, Horizon, or Ocean terminals puts you within easy reach of Southampton\'s attractions. The city centre is just a 15 to 20 minute walk from most terminals, with the medieval Old Town, Westquay shopping centre, and excellent museums all accessible on foot. The Bargate, a magnificent medieval gatehouse dating from 1180, stands at the heart of the modern city.

Southampton also serves as an ideal gateway to some of England\'s most iconic attractions. Stonehenge lies just an hour\'s drive away, the New Forest National Park borders the western edge of the city, and the historic city of Winchester is a short journey inland. For those preferring to stay local, the SeaCity Museum\'s Titanic exhibition provides a moving tribute to the tragedy that affected so many Southampton families.`,
      weatherSeasonal: '15 to 20°C in summer, 6 to 10°C in spring and autumn. Pack layers and a waterproof jacket as weather can change quickly. Summers are mild with occasional rain.',
      portInfo: {
        dockLocation: 'Five terminals along Southampton Water (City, Horizon, Ocean, Mayflower, QEII)',
        distanceToTown: '15 to 25 minutes walk depending on terminal',
        shuttleInfo: 'Some cruise lines offer shuttles to town centre for a small fee',
      },
      importantNotes: [
        'Check which terminal your ship uses as distances vary significantly between terminals',
        'Most shops close by 6pm except at Westquay shopping centre',
        'Sunday trading hours are reduced (typically 11am to 5pm)',
      ],
    },
    
    stayLocal: {
      convenienceStores: [
        {
          name: 'Tesco Express',
          location: 'Oxford Street, 10 min from City Terminal',
          type: 'small shop',
          what: 'Water, snacks, toiletries, sandwiches',
          notes: 'Open 7am to 11pm daily',
        },
        {
          name: 'Sainsbury\'s Local',
          location: 'Above Bar Street, 15 min walk',
          type: 'small shop',
          what: 'Groceries, drinks, snacks',
          notes: 'Central location near shops',
        },
        {
          name: 'Marks and Spencer',
          location: 'Westquay Shopping Centre, 20 min walk',
          type: 'supermarket',
          what: 'Quality food hall, snacks, drinks',
          notes: 'Higher quality options',
        },
      ],
      quickWalk: [
        {
          title: 'Town Quay Marina Stroll',
          content: 'Walk along the marina to see yachts and waterfront restaurants',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Mayflower Park Walk',
          content: 'Small park with Titanic memorials and harbour views',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      longerWalk: [
        {
          title: 'Medieval Walls Walk',
          content: 'Follow the 1.25 mile trail around Southampton\'s medieval defences, taking in 13 towers and 6 gates',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'QE2 Mile Heritage Trail',
          content: 'Walk from Ocean Village to Mayflower Park passing Titanic memorials and historic sites',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      parks: [
        {
          title: 'Mayflower Park',
          content: 'Waterfront park with Titanic Engineers Memorial, views of cruise ships',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Palmerston Park',
          content: 'Victorian park near Above Bar Street with gardens and bandstand',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'East Park',
          content: 'War memorials and open green space near the Cenotaph',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      beach: null, // No immediate beach in Southampton
      scenic: [
        'The Bargate medieval gatehouse from the north side showing the two lions',
        'Southampton Town Walls with modern buildings behind',
        'Your cruise ship from Mayflower Park',
        'Tudor House and Garden courtyard',
      ],
      shopping: [
        'Westquay Shopping Centre: Over 100 stores including John Lewis, Zara, H&M across three floors',
        'Above Bar Street: Main pedestrianised shopping street with high street brands',
        'Oxford Street: Smaller independent shops and cafes near the waterfront',
        'Bargate Quarter: Newly redeveloped area with retail and dining',
      ],
      coffee: [
        'Costa Coffee, Westquay: Large branch with seating',
        'Mettricks, Oxford Street: Independent speciality coffee',
      ],
      bars: [
        'The Dancing Man Brewery: Craft brewery in medieval wool house on Town Quay',
        'Revolution, Above Bar Street: Cocktail bar with outdoor terrace',
      ],
      rainyDay: [
        'SeaCity Museum: Titanic exhibition and Southampton history',
        'Westquay Shopping Centre: Three floors of shops, cinema, bowling',
        'Tudor House and Garden: Historic house museum with cafe',
        'Southampton City Art Gallery: Free entry, excellent collection',
      ],
      tip: 'The QE2 Mile links the main attractions and is well signposted with information boards. Start at SeaCity Museum near the Civic Centre, walk through the Old Town past Tudor House, along the medieval walls to Town Quay, and finish at Mayflower Park where you can see your ship from the shore. Allow 2 hours for a leisurely walk with stops.',
    },
    
    goFurther: {
      attractions: [
        {
          name: 'Stonehenge ⭐',
          description: 'One of the world\'s most famous prehistoric monuments, this UNESCO World Heritage Site features massive standing stones arranged in a circle over 5,000 years ago. The excellent visitor centre explains the mystery and history of this remarkable site, with exhibitions on the people who built it.',
          cruiseLineOption: 'Many cruise excursions and private tours available',
          independent: '3 to 4 hours including travel',
          allow: 'Half day',
          cost: 'Check current prices',
          notes: 'Book timed entry tickets in advance, especially in summer. Combine with a stop in Salisbury to see the cathedral and Magna Carta. The visitor centre is a mile from the stones with shuttle buses running regularly.',
        },
        {
          name: 'New Forest National Park ⭐',
          description: 'Ancient woodland and open heathland where wild ponies roam free, just minutes from Southampton. Pretty villages like Lyndhurst and Brockenhurst offer tea rooms, antique shops, and traditional pubs. Perfect for nature lovers wanting an authentic English countryside experience.',
          cruiseLineOption: 'Some cruise excursions available',
          independent: '3 to 5 hours',
          allow: 'Half to full day',
          cost: 'Free to explore, attractions vary',
          notes: 'Wild ponies are everywhere but do not feed or touch them. Lyndhurst is the unofficial capital with a visitor centre. Beaulieu Motor Museum and Palace House make an excellent combined visit.',
        },
        {
          name: 'SeaCity Museum ⭐',
          description: 'Southampton\'s premier museum tells the story of the city\'s connection to the sea and the Titanic. The exhibition includes a 1:25 scale model of the ship, interactive displays, and moving accounts of crew members, most of whom came from Southampton. The Gateway to the World gallery covers 250,000 years of local history.',
          cruiseLineOption: 'Walk from terminals',
          independent: '2 to 3 hours',
          allow: '2-3 hours',
          cost: 'Check current prices',
          notes: 'Your ticket allows free return visits for a year. The Disaster Room recreation is particularly moving. There is a good cafe on the ground floor.',
        },
        {
          name: 'Winchester',
          description: 'England\'s ancient capital features one of Europe\'s finest cathedrals, the Great Hall with its legendary Round Table, and charming medieval streets. Jane Austen spent her final years here and is buried in the cathedral. The city offers excellent independent shops and restaurants.',
          cruiseLineOption: 'Some cruise excursions',
          independent: '4 to 5 hours',
          allow: 'Half day',
          cost: 'Cathedral entry plus transport',
          notes: 'Winchester Cathedral requires a ticket but the close and grounds are free. Walk along the River Itchen for lovely views. The Buttercross in the High Street is a good meeting point.',
        },
        {
          name: 'Tudor House and Garden',
          description: 'Southampton\'s most important historic building reveals over 800 years of history in the heart of the Old Town. The timber-framed house dates from the late 15th century, with King John\'s Palace behind it dating back 300 years earlier. Interactive displays bring the stories of residents through the ages to life.',
          cruiseLineOption: 'Walk from terminals',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Entry fee',
          notes: 'The garden is a peaceful retreat from the busy city. Look for the Tudor graffiti scratched into walls. Combined tickets with SeaCity Museum offer good value.',
        },
        {
          name: 'Beaulieu National Motor Museum',
          description: 'World-famous motor museum set in the grounds of a historic abbey and stately home. Over 250 vehicles from vintage cars to Top Gear favourites. The Palace House, monorail, and abbey ruins are included in the entry. A full day out for car enthusiasts and families alike.',
          cruiseLineOption: 'Some excursions',
          independent: '3 to 5 hours',
          allow: 'Half to full day',
          cost: 'Entry fee',
          notes: 'Allow time for the grounds and abbey as well as the museum. The James Bond exhibition is popular. Good restaurant on site.',
        },
        {
          name: 'Southampton Old Town and Medieval Walls',
          description: 'Explore one of England\'s best-preserved medieval town wall circuits. The 1.25 mile walk takes you past 13 remaining towers, 6 city gates, and half a mile of original walls. The Bargate, dating from 1180, is one of the finest medieval town gates in the country.',
          cruiseLineOption: 'Walk from terminals',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Free',
          notes: 'Information boards along the route explain the history. The Arcades on the western wall are unique in England. God\'s House Tower is one of the first buildings designed for gunpowder weapons.',
        },
        {
          name: 'Solent Sky Museum',
          description: 'Aviation museum celebrating Southampton\'s role in aircraft development, including the legendary Spitfire. Housed in a former aircraft hangar, the collection includes 19 aircraft and tells the story of the Schneider Trophy and flying boat era. The Spitfire Gallery is a highlight.',
          cruiseLineOption: 'Independent visit',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Entry fee',
          notes: 'Look for the cockpit experiences where you can sit in a real aircraft. The Sandringham flying boat is impressive. Free parking available.',
        },
      ],
      ourTake: 'Southampton rewards those who dig beneath the surface. While many passengers use it purely as an embarkation point, the city deserves at least half a day to explore its Titanic heritage and remarkable medieval defences. For a full day excursion, Stonehenge is unmissable for first-time visitors, while the New Forest offers a quintessentially English countryside experience just 15 minutes away.',
    },
    
    withKids: {
      familyFriendly: {
        mcdonalds: {
          name: 'McDonald\'s Above Bar Street',
          location: 'Above Bar Street, city centre',
          walkingTime: '20 minutes from City Terminal',
          notes: 'Large branch with seating, opposite Bargate',
        },
        park: {
          name: 'Mayflower Park',
          location: 'Town Quay, waterfront',
          walkingTime: '10 minutes from City Terminal',
          facilities: 'Open grass, benches, Titanic memorials',
          notes: 'Great views of cruise ships, small but pleasant',
        },
      },
      toddlers: [
        'Mayflower Park for running around and ship watching',
        'SeaCity Museum interactive exhibits',
        'Westquay soft play areas',
      ],
      olderKids: [
        'SeaCity Museum Titanic exhibition with interactive displays',
        'Medieval walls walk hunting for towers and gates',
        'Hollywood Bowl at Westquay',
      ],
      teens: [
        'Westquay shopping and cinema',
        'Escape rooms in the city centre',
        'Southampton FC stadium tour (advance booking)',
        'Laser tag and bowling',
        'Independent coffee shops on Oxford Street',
      ],
      familyFood: [
        'Pizza Express, Westquay: Family-friendly Italian',
        'Wagamama, Westquay: Asian dishes kids love',
        'Westquay food court: Multiple options for fussy eaters',
      ],
      warnings: [
        'The walk from some terminals is too long for young children - consider the shuttle or taxi',
        'Town Quay waterfront has unfenced areas near the water',
      ],
      easyDay: 'For families, walk from your terminal to the SeaCity Museum (taxi if at QEII or Mayflower terminal). Spend 2 hours exploring the Titanic exhibition, then walk through the Old Town to Westquay for lunch and shopping. Younger children will enjoy the soft play, older kids can explore the shops, and teens can catch a movie. Return to the ship via Mayflower Park to see your cruise ship from shore.',
    },
    
    send: {
      wheelchairAccess: {
        portArea: 'City and Horizon terminals are closest to town and mostly flat walking',
        cityCenter: 'The medieval walls walk is mostly accessible but some sections have uneven cobbles',
      },
      mobilityConsiderations: [
        'City and Horizon terminals are closest to town and mostly flat walking',
        'The medieval walls walk is mostly accessible but some sections have uneven cobbles',
        'Westquay shopping centre is fully accessible with lifts and escalators',
        'Taxis are readily available outside all terminals',
      ],
      quietSpots: [
        'Tudor House Garden - peaceful enclosed garden in the Old Town',
        'Palmerston Park - quiet Victorian park away from shopping crowds',
        'Holy Rood Church ruins - atmospheric open-air space',
      ],
      sensoryConsiderations: {
        busyAreas: 'Westquay at weekends, Above Bar Street on Saturday afternoons',
        quieterAlternatives: 'Oxford Street cafes, Old Town area, parks',
        noiseLevels: 'Generally manageable, shopping centres can be noisy at peak times',
      },
    },
    
    medical: {
      pharmacy: {
        name: 'Boots',
        location: 'Above Bar Street, 15 minutes walk from City Terminal',
        notes: 'Large pharmacy with consultation room, open standard retail hours',
      },
      hospital: {
        name: 'Southampton General Hospital',
        location: 'Tremona Road, 3 miles from cruise terminals',
        hasEmergency: true,
        notes: 'Major teaching hospital with full A&E',
      },
      tips: [
        'Pharmacies can advise on minor ailments without prescription',
        'NHS 111 service provides medical advice by phone',
        'Bring European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC) if applicable',
      ],
    },
    
    foodAndDrink: {
      localDish: {
        name: 'Fish and Chips',
        description: 'Classic British dish of battered cod or haddock with chunky chips, served with mushy peas',
        whatToLookFor: 'Fresh fish with crispy batter, proper chip shop chips',
      },
      restaurants: [
        {
          name: 'The Dancing Man Brewery',
          location: 'Town Quay',
          description: 'Craft brewery in medieval wool house with pub food',
        },
        {
          name: 'The Pig in the Wall',
          location: 'Western Esplanade',
          description: 'Boutique hotel restaurant with locally sourced menu',
        },
        {
          name: 'Oxford Brasserie',
          location: 'Oxford Street',
          description: 'French-inspired brasserie near the waterfront',
        },
      ],
      cafes: [
        {
          name: 'Mettricks',
          location: 'Oxford Street',
          description: 'Independent speciality coffee roastery',
        },
        {
          name: 'SeaCity Museum Cafe',
          location: 'Havelock Road',
          description: 'Museum cafe open to non-visitors with harbour views',
        },
        {
          name: 'Tudor House Cafe',
          location: 'Bugle Street',
          description: 'Light lunches in historic setting',
        },
      ],
      bars: [
        {
          name: 'The Dancing Man',
          location: 'Town Quay',
          description: 'Award-winning craft brewery in historic building',
        },
        {
          name: 'Revolution',
          location: 'Above Bar Street',
          description: 'Cocktail bar with outdoor terrace',
        },
        {
          name: 'The Platform Tavern',
          location: 'Town Quay',
          description: 'Traditional pub with part of medieval wall inside',
        },
      ],
      localSpecialties: 'Southampton does not have a signature local cuisine, but the surrounding area is known for New Forest venison, watercress from nearby beds, and excellent local cheeses. Fish and chips remain the classic port town dish, and the city has several excellent fish restaurants along Town Quay.',
      eatingEtiquette: [
        'Tipping is not mandatory but 10 to 15 percent is appreciated for good service',
        'Pubs often have table service apps - check for QR codes on tables',
      ],
    },
    
    practicalInfo: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      emergencyNumbers: {
        police: '999',
        ambulance: '999',
        nonUrgent: '111 for non-urgent medical advice',
      },
      wifiInfo: 'Free WiFi available at terminals and many cafes',
    },
  },

  'dover': {
    portName: 'Dover',
    displayName: 'Dover',
    country: 'United Kingdom',
    
    overview: {
      hook: 'Stand beneath the iconic White Cliffs, explore England\'s largest castle, and glimpse France across the English Channel from Britain\'s historic gateway to Europe.',
      description: `Dover has served as England\'s gateway to the continent for over 2,000 years, and today its dramatic White Cliffs remain one of Britain\'s most recognisable natural landmarks. The port operates three modern cruise terminals at the Western Docks, with most ships arriving early morning and departing in the evening, giving passengers a full day to explore. The chalk cliffs that tower above the harbour have inspired poets and musicians, symbolising homecoming for generations of British travellers.

Dominating the skyline above the port sits Dover Castle, known as the "Key to England" for its strategic importance throughout history. This massive fortress has guarded the shortest sea crossing to Europe since Norman times, and its Secret Wartime Tunnels tell the remarkable story of the Dunkirk evacuation. From the castle battlements and the cliff-top paths, on clear days you can see the French coast just 21 miles away.

While Dover town itself is modest, the surrounding area offers excellent day trip options. Canterbury, with its magnificent UNESCO-listed cathedral, lies just 16 miles away and makes an unmissable excursion. The White Cliffs visitor centre, operated by the National Trust, provides walking trails along the cliff tops with stunning Channel views, while the historic South Foreland Lighthouse marks the spot where Marconi made his first international radio transmission.`,
      weatherSeasonal: '14 to 20°C in summer, 10 to 15°C in spring and autumn. Exposed cliff tops can be windy and cool even in summer. Pack layers and a windproof jacket for walks.',
      portInfo: {
        dockLocation: 'Western Docks, Dover (3 cruise terminals)',
        distanceToTown: '10 to 15 minutes walk to town centre',
        shuttleInfo: 'Most cruise lines offer shuttles to town centre and Dover Castle for around 5 pounds return',
      },
      importantNotes: [
        'Cruise season runs primarily April to October; visits outside this period are rare',
        'The walk to the White Cliffs visitor centre from the port takes 45 to 60 minutes and includes steep steps',
        'Canterbury is a 20 to 30 minute drive or bus ride - allow at least 3 hours for a visit',
      ],
    },
    
    stayLocal: {
      convenienceStores: [
        {
          name: 'Marks and Spencer',
          location: 'Biggin Street, 12 min walk',
          type: 'supermarket',
          what: 'Food hall, snacks, drinks',
          notes: 'Good quality options',
        },
        {
          name: 'Co-op Food',
          location: 'Market Square, 10 min walk',
          type: 'small shop',
          what: 'Groceries, snacks, toiletries',
          notes: 'Convenient location',
        },
        {
          name: 'Poundland',
          location: 'Biggin Street, 12 min walk',
          type: 'small shop',
          what: 'Budget snacks, drinks, toiletries',
          notes: 'Near bus station',
        },
      ],
      quickWalk: [
        {
          title: 'Marina Promenade',
          content: 'Walk along Dover Marina past boats and waterfront cafes',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Seafront to Town',
          content: 'Follow the Esplanade towards the beach and town centre',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      longerWalk: [
        {
          title: 'Port to Town Centre Loop',
          content: 'Walk via marina, along seafront, through town, return via Western Heights',
          terrain: 'moderate',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Dover Beach Promenade',
          content: 'Walk the length of the shingle beach with views of cliffs and ferries',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      parks: [
        {
          title: 'Kearsney Abbey Gardens',
          content: 'Victorian parkland with lake, 15 min drive from port',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Russell Gardens',
          content: 'Small formal gardens in town centre near the seafront',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Connaught Park',
          content: 'Hillside park with views over Dover and castle',
          terrain: 'moderate',
          mapLink: 'https://maps.google.com',
        },
      ],
      beach: {
        name: 'Dover Beach',
        description: 'Long shingle beach stretching along the seafront below the White Cliffs. A working harbour beach with views of ferries and cruise ships, plus the cliffs as a stunning backdrop.',
        beachType: 'Pebbles',
        waterEntry: 'Drops off fairly quickly',
        shelter: 'Partially sheltered by harbour walls',
        crowdLevel: 'Moderate, quieter than resort beaches',
        waterTemperature: '~14°C in summer',
        facilities: 'Toilets on seafront, restaurants/bars along promenade',
        accessNotes: '10 to 15 minutes flat walk from cruise terminal',
        bestFor: 'Walking, views, quick paddle',
        coordinates: { lat: 51.1244, lng: 1.3130 },
        mapLink: 'https://maps.google.com',
      },
      scenic: [
        'White Cliffs from the seafront or port approach',
        'Dover Castle from the Western Heights',
        'Ferries passing through the harbour',
        'South Foreland Lighthouse on the cliff path',
      ],
      shopping: [
        'De Bradelei Wharf: Outlet shopping near the cruise terminal',
        'Biggin Street: Main shopping area with high street stores',
        'Market Square: Historic centre with cafes and local shops',
      ],
      coffee: [
        'The Allotment: Independent cafe on High Street',
        'Costa Coffee: Market Square, reliable chain option',
      ],
      bars: [
        'The White Horse: Traditional pub near the seafront',
        'Cullins Yard: Waterfront restaurant and bar at Dover Marina',
      ],
      rainyDay: [
        'Dover Museum and Bronze Age Boat Gallery: World\'s oldest seagoing vessel',
        'Dover Castle: Extensive indoor areas including wartime tunnels',
        'The Grand Shaft: Unique triple spiral staircase, guided tours available',
        'Shopping at De Bradelei Wharf outlet',
      ],
      tip: 'The shuttle buses offered by cruise lines stop at both the town centre and Dover Castle, saving a steep 40 minute walk uphill to the castle. If you want to see the White Cliffs without the hour-long walk from the port, take the shuttle to the castle and enjoy cliff views from the battlements, or catch bus 80 from Pencester Road to the White Cliffs visitor centre.',
    },
    
    goFurther: {
      attractions: [
        {
          name: 'Dover Castle ⭐',
          description: 'Known as the "Key to England," this is the largest castle in the country and has defended Britain\'s shores for over 900 years. The Great Tower recreates Henry II\'s medieval court, while the Secret Wartime Tunnels reveal the underground headquarters where Operation Dynamo, the evacuation of Dunkirk, was coordinated.',
          cruiseLineOption: 'Ship shuttles available',
          independent: '3 to 4 hours',
          allow: 'Half day',
          cost: 'Entry fee',
          notes: 'The Secret Wartime Tunnels tours book up quickly - head here first. Allow time for the Roman lighthouse, one of only three surviving in the world. The views over the Channel to France are stunning from the battlements.',
        },
        {
          name: 'White Cliffs of Dover ⭐',
          description: 'These iconic chalk cliffs have symbolised Britain for centuries. The National Trust manages the visitor centre and walking trails, which offer stunning views across the Channel to France on clear days. The cliff-top paths lead to the South Foreland Lighthouse where you can tour the tower and enjoy cream teas.',
          cruiseLineOption: 'Bus or taxi',
          independent: '2 to 4 hours',
          allow: 'Half day',
          cost: 'Free, lighthouse separate',
          notes: 'Check visibility before visiting - cloudy days limit views to France. Wear sturdy footwear as paths can be muddy after rain. The cafe at the visitor centre has excellent views.',
        },
        {
          name: 'Canterbury Cathedral ⭐',
          description: 'One of the oldest and most important Christian sites in England, this UNESCO World Heritage cathedral has been a pilgrimage destination since the murder of Archbishop Thomas Becket in 1170. The stunning stained glass windows, atmospheric crypt, and Gothic architecture are awe-inspiring. The medieval city around it offers charming streets, excellent shopping, and punting on the River Stour.',
          cruiseLineOption: 'Ship excursions or bus',
          independent: '3 to 5 hours including travel',
          allow: 'Half day',
          cost: 'Cathedral entry fee',
          notes: 'Check for Evensong times if you want to experience a choral service. The cathedral may close for special services - verify opening times. Allow time to explore the medieval streets and Westgate Towers.',
        },
        {
          name: 'South Foreland Lighthouse',
          description: 'This beautiful Victorian lighthouse perched on the White Cliffs was the first to use electric light and where Marconi conducted pioneering radio experiments. Guided tours take you up the tower for panoramic views, and the tea room in the former keeper\'s cottage serves excellent cream teas.',
          cruiseLineOption: 'Combine with White Cliffs',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Entry fee',
          notes: 'The walk from the White Cliffs visitor centre takes about an hour each way. Cream tea with scones is a must. Check opening times as it\'s not open every day.',
        },
        {
          name: 'Dover Museum and Bronze Age Boat',
          description: 'Home to the world\'s oldest known seagoing vessel, a 3,500-year-old wooden boat discovered during road works in 1992. The museum spans three floors covering the history of Dover from ancient times to the present. Interactive exhibits and the remarkable boat gallery make it suitable for all ages.',
          cruiseLineOption: 'Walk from port',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Free entry',
          notes: 'Free entry makes this excellent value. The boat gallery on the top floor is the highlight. Good wet weather alternative.',
        },
        {
          name: 'Leeds Castle',
          description: 'Often called the loveliest castle in the world, Leeds Castle sits on two islands in a lake surrounded by 500 acres of beautiful parkland. The castle has been home to six medieval queens of England and offers gardens, a maze, birds of prey displays, and elegant interiors to explore.',
          cruiseLineOption: 'Ship excursions available',
          independent: '4 to 5 hours including travel',
          allow: 'Full day',
          cost: 'Entry fee',
          notes: 'The maze and grotto are popular with children. Birds of prey displays run at set times. Consider pre-booking tickets online.',
        },
        {
          name: 'Western Heights',
          description: 'A vast Napoleonic-era fortification carved into the cliffs above Dover, featuring the unique triple spiral staircase of the Grand Shaft. The fortifications offer excellent walking with views over the harbour and town. Less visited than the castle, this provides a quieter historical experience.',
          cruiseLineOption: 'Independent visit',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Free',
          notes: 'The Grand Shaft tours are excellent but run at limited times. The Drop Redoubt is atmospheric and often empty. Good views of cruise ships in the harbour.',
        },
        {
          name: 'St Margaret\'s Bay',
          description: 'A charming village and beach nestled beneath the White Cliffs, where Noel Coward and Ian Fleming once had homes. The pebble beach is quieter than Dover, with a pleasant pub and tea rooms. Access to the cliff-top path to South Foreland Lighthouse.',
          cruiseLineOption: 'Taxi or car',
          independent: '2 to 3 hours',
          allow: '2-3 hours',
          cost: 'Free',
          notes: 'The Coastguard pub has excellent views and food. Park at the top and walk down to the beach. Combine with a lighthouse visit for a full day.',
        },
      ],
      ourTake: 'Dover is best seen as a gateway to Kent\'s riches. Spend the morning at Dover Castle exploring the wartime tunnels and enjoying cliff-top views, then head to Canterbury for the afternoon to see the magnificent cathedral and enjoy lunch in the medieval city. If you prefer outdoor experiences, the White Cliffs walk to South Foreland Lighthouse is unforgettable on a clear day, but check visibility first - if it\'s foggy, the castle is the better choice.',
    },
    
    withKids: {
      familyFriendly: {
        mcdonalds: {
          name: 'McDonald\'s Dover',
          location: 'Biggin Street',
          walkingTime: '12 minutes from cruise terminal',
          notes: 'Near bus station and main shopping area',
        },
        park: {
          name: 'Russell Gardens',
          location: 'Near seafront',
          walkingTime: '10 minutes from cruise terminal',
          facilities: 'Playground, open grass, benches',
          notes: 'Small but pleasant formal gardens',
        },
      },
      toddlers: [
        'Dover beach for paddling and pebble collecting',
        'Dover Castle grounds for running around',
        'Kearsney Abbey Gardens (short drive) with ducks and open spaces',
      ],
      olderKids: [
        'Dover Castle Secret Wartime Tunnels - exciting underground experience',
        'White Cliffs boardwalk for cliff views',
        'Dover Museum Bronze Age Boat discovery',
      ],
      teens: [
        'Dover Castle medieval experiences and wartime history',
        'Cliff-top walk to South Foreland Lighthouse',
        'Canterbury shopping and cathedral',
        'De Bradelei Wharf outlet shopping',
        'Dover beach walk and seafront cafes',
      ],
      familyFood: [
        'Cullins Yard at Dover Marina: Family-friendly waterfront dining',
        'The Allotment: Good cafe with healthy options',
        'Canterbury offers more variety for picky eaters',
      ],
      warnings: [
        'Cliff paths have unfenced edges - supervise children closely',
        'Dover Castle has steep stairs in towers - challenging for very young children',
        'The walk to White Cliffs visitor centre is too long for small children - take taxi or bus',
      ],
      easyDay: 'Take the cruise shuttle to Dover Castle and spend 2 to 3 hours exploring the Great Tower and wartime tunnels. Children love the interactive medieval displays and the spooky underground experience. Afterwards, the shuttle returns you to town where you can grab fish and chips and let the kids run on the beach before returning to the ship. This avoids the long cliff walk while still experiencing Dover\'s best.',
    },
    
    send: {
      wheelchairAccess: {
        portArea: 'Shuttle buses from cruise terminal are the easiest way to reach attractions',
        cityCenter: 'Canterbury is mostly flat in the city centre with some cobbled areas',
      },
      mobilityConsiderations: [
        'Shuttle buses from cruise terminal are the easiest way to reach attractions',
        'Dover Castle has accessible areas on ground level, but tunnels and towers require stairs',
        'White Cliffs visitor centre has a boardwalk viewpoint for limited mobility',
        'Canterbury is mostly flat in the city centre with some cobbled areas',
      ],
      quietSpots: [
        'Kearsney Abbey Gardens - peaceful parkland away from town',
        'St Margaret\'s Bay - quieter beach village',
        'The Pines Garden - tranquil gardens near St Margaret\'s',
      ],
      sensoryConsiderations: {
        busyAreas: 'Dover Castle during school holidays, Canterbury city centre on weekends',
        quieterAlternatives: 'Western Heights fortifications, St Margaret\'s Bay',
        noiseLevels: 'Generally manageable, ferries and ships may be heard near the port',
      },
    },
    
    medical: {
      pharmacy: {
        name: 'Boots',
        location: 'Biggin Street, 12 minutes walk from cruise terminal',
        notes: 'Full pharmacy services, standard retail hours',
      },
      hospital: {
        name: 'William Harvey Hospital',
        location: 'Ashford, approximately 20 miles from Dover',
        hasEmergency: true,
        notes: 'The nearest major hospital; Dover has minor injuries units',
      },
      tips: [
        'Dover\'s medical facilities are limited - most serious issues require travel to Ashford or Canterbury',
        'Call NHS 111 for non-emergency medical advice',
        'Pharmacies can provide advice on minor ailments',
      ],
    },
    
    foodAndDrink: {
      localDish: {
        name: 'Kentish Huffkin',
        description: 'Traditional flat bread roll from Kent, often served with local cheese or filled with cherries for a sweet version',
        whatToLookFor: 'Soft, slightly sweet bread with a dimple in the centre',
      },
      restaurants: [
        {
          name: 'Cullins Yard',
          location: 'Dover Marina',
          description: 'Contemporary waterfront dining with local seafood',
        },
        {
          name: 'The Coastguard',
          location: 'St Margaret\'s Bay',
          description: 'Traditional pub with stunning cliff views',
        },
        {
          name: 'Allotment',
          location: 'High Street',
          description: 'Modern British cafe with fresh local produce',
        },
      ],
      cafes: [
        {
          name: 'The Allotment',
          location: 'High Street',
          description: 'Independent cafe with healthy options',
        },
        {
          name: 'National Trust Cafe',
          location: 'White Cliffs',
          description: 'Cliff-top views and cream teas',
        },
        {
          name: 'Mrs Knott\'s Tea Room',
          location: 'South Foreland Lighthouse',
          description: 'Traditional cream teas in lighthouse cottage',
        },
      ],
      bars: [
        {
          name: 'The White Horse',
          location: 'Castle Street',
          description: 'Historic pub near the castle',
        },
        {
          name: 'Eight Bells',
          location: 'Cannon Street',
          description: 'Traditional town centre pub',
        },
        {
          name: 'Cullins Yard',
          location: 'Dover Marina',
          description: 'Modern bar with waterfront views',
        },
      ],
      localSpecialties: 'Kent is known as the Garden of England, producing excellent apples, cherries, and hops for beer. Sample Kentish cider, locally brewed ales, and Romney Marsh lamb if available. Canterbury offers better restaurant choices than Dover town, with excellent traditional pubs and modern cafes.',
      eatingEtiquette: [
        'Tipping is not mandatory but 10 to 15 percent is appreciated for good service',
        'Many pubs serve food - check if table service or order at bar',
      ],
    },
    
    practicalInfo: {
      currency: 'GBP (£)',
      language: 'English',
      timezone: 'GMT+0',
      emergencyNumbers: {
        police: '999',
        ambulance: '999',
        nonUrgent: '111 for non-urgent medical advice',
      },
      wifiInfo: 'Free WiFi available at terminals',
    },
  },
};
