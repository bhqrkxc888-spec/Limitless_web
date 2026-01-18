/**
 * Atlantic Islands Ports Content
 */

export const atlanticIslandsPorts = {
  'funchal-madeira': {
    portName: 'Funchal, Madeira',
    displayName: 'Funchal, Madeira',
    country: 'Portugal',
    
    overview: {
      hook: 'The Floating Garden of the Atlantic where cable cars soar above hillside gardens, wicker toboggans race down mountain streets, and subtropical flowers bloom year-round.',
      description: `Funchal, the capital of Portugal's Madeira archipelago, rises dramatically from the harbour in a natural amphitheatre of lush green hills dotted with white houses and red roofs. Cruise ships dock at the modern terminal on Pontinha Pier, just 15 to 20 minutes' walk from the historic city centre, where colourful cobbled streets, flower markets, and centuries-old churches await. Named after the wild fennel (funcho) that Portuguese explorers found growing here in the 15th century, Funchal has charmed visitors ever since, including Winston Churchill who came to paint its landscapes.

The city is most famous for its extraordinary gardens and the unique experience of riding a wicker toboggan down steep streets from Monte, the hillside parish 550 metres above the harbour. A scenic cable car journey connects the seafront to Monte, where the Monte Palace Tropical Garden spreads across 70,000 square metres of exotic plants, oriental architecture, and stunning bay views. The toboggan ride, controlled by "carreiros" in traditional white clothing and straw hats using their rubber-soled boots as brakes, has thrilled visitors since the 1850s.

Madeira's mild year-round climate, unique flora, and dramatic volcanic landscapes have earned it the title of Europe's Best Cruise Destination. Beyond Funchal, the island offers levada walks along ancient irrigation channels, dramatic cliffs at Cabo Girão (Europe's highest sea cliff skywalk), and charming fishing villages like Câmara de Lobos where Churchill painted. The island's fortified Madeira wine has been prized for centuries and remains a must-try experience.`,
      weatherSeasonal: '18 to 25°C throughout the year with little seasonal variation. The mountains can be cooler and cloudier. Pack layers and a light rain jacket for higher altitudes.',
      portInfo: {
        dockLocation: 'Pontinha Pier, International Maritime Passenger Terminal',
        distanceToTown: '15 to 20 minutes walk along the seafront',
        shuttleInfo: 'Some cruise lines offer shuttles (around 9 euros return); taxis available for approximately 7 to 8 euros',
      },
      importantNotes: [
        'The cable car to Monte can have long queues when multiple cruise ships are in port - go early or later afternoon',
        'Monte toboggans end halfway down the hill at Livramento, not at the port - you\'ll need a taxi or bus back',
        'Many shops close during siesta (roughly 1pm to 3pm), though tourist areas often stay open',
      ],
    },
    
    stayLocal: {
      convenienceStores: [
        {
          name: 'Pingo Doce',
          location: 'Near Marina, 10 min walk',
          type: 'supermarket',
          what: 'Full groceries, drinks, snacks',
          notes: 'Excellent value',
        },
        {
          name: 'Mini Mercado',
          location: 'Rua de Santa Maria, 18 min',
          type: 'small shop',
          what: 'Water, snacks, basics',
          notes: 'In Old Town',
        },
        {
          name: 'Various vendors',
          location: 'Mercado dos Lavradores, 20 min',
          type: 'market',
          what: 'Fresh fruit, flowers, local products',
          notes: 'Morning best',
        },
      ],
      quickWalk: [
        {
          title: 'Marina Promenade',
          content: 'Walk along the seafront promenade with yacht views',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'CR7 Museum Visit',
          content: 'Short walk to Cristiano Ronaldo museum at the marina',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      longerWalk: [
        {
          title: 'Port to Old Town',
          content: 'Walk the seafront promenade to the colourful Zona Velha with painted doors',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Seafront to Cable Car',
          content: 'Walk along Avenida do Mar to the cable car station, passing gardens and seafront',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      parks: [
        {
          title: 'Santa Catarina Park',
          content: 'Beautiful gardens overlooking the harbour with views of cruise ships',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Municipal Garden',
          content: 'Formal gardens in the city centre with exotic plants',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Almirante Reis Garden',
          content: 'Seafront park near the marina with tropical plants',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      beach: {
        name: 'Praia Formosa',
        description: 'Madeira\'s largest beach complex with dark pebbles and small sandy sections. Several beach clubs and facilities make this a popular spot for locals and visitors.',
        beachType: 'Pebbles with some sand',
        waterEntry: 'Varies, generally easy',
        shelter: 'Partially sheltered',
        crowdLevel: 'Busy in summer, moderate at other times',
        waterTemperature: '~20°C year-round (remarkably stable sea temperatures)',
        facilities: 'Lifeguards (seasonal), sunbeds, umbrellas, showers, toilets, restaurants/bars, changing rooms',
        accessNotes: 'Short bus or taxi ride from port (approximately 10 minutes), not walkable',
        bestFor: 'Swimming, sunbathing, facilities',
        coordinates: { lat: 32.6401, lng: -16.9344 },
        mapLink: 'https://maps.google.com',
        additionalBeaches: [
          'Lido: Public and private pool complexes with sea access, closer to port',
          'Barreirinha: Small beach in the Old Town with natural pools',
        ],
      },
      scenic: [
        'The painted doors of Rua de Santa Maria in Old Town',
        'Funchal from Monte cable car',
        'Harbour view from Santa Catarina Park',
        'Mercado dos Lavradores flower stalls',
        'Sé Cathedral facade',
      ],
      shopping: [
        'Rua Dr Fernão Ornelas: Main shopping street with local and international stores',
        'Mercado dos Lavradores: Traditional market with flowers, fruits, and handicrafts',
        'Forum Madeira: Modern shopping centre (taxi required)',
      ],
      coffee: [
        'Ritz Madeira: Historic cafe in the city centre with traditional atmosphere',
        'Armazém do Mercado: Trendy spot near the market with excellent coffee',
      ],
      bars: [
        'Galáxia Skybar at Savoy Palace: Rooftop bar with stunning views and galaxy theme',
        'Copacabana: Lively bar on the seafront',
        'Venda Velha: Traditional tavern in Old Town',
      ],
      rainyDay: [
        'Madeira Story Centre: Interactive history museum',
        'CR7 Museum: Dedicated to Cristiano Ronaldo, born in Funchal',
        'Blandy\'s Wine Lodge: Wine tasting and tours',
        'Sé Cathedral: Beautiful 16th-century church',
      ],
      tip: 'The best way to experience Funchal\'s highlights is to take the cable car up to Monte in the morning, explore the Monte Palace Tropical Garden (allow 2 hours as it\'s steep and extensive), then take the toboggan ride halfway down. From Livramento, catch a taxi back to the Old Town for lunch at one of the traditional restaurants on Rua de Santa Maria. The painted doors make this street incredibly photogenic.',
    },
    
    goFurther: {
      attractions: [
        {
          name: 'Monte Cable Car and Toboggan Ride ⭐',
          description: 'The iconic Funchal experience combines a spectacular 15-minute cable car ride soaring 550 metres above the city with the unique wicker toboggan descent. The traditional sledges, guided by two "carreiros" using their boots as brakes, have been thrilling visitors since the 1850s. The 2km toboggan ride reaches speeds of up to 30mph and ends in Livramento.',
          cruiseLineOption: 'Independent or ship excursion',
          independent: '2 to 3 hours including gardens',
          allow: 'Half day',
          cost: 'Cable car and toboggan combo tickets available',
          notes: 'Go early morning or late afternoon to avoid cruise ship crowds. The toboggan ends at Livramento, not the bottom - you\'ll need a taxi (approximately 10 euros) back to town. One-way cable car ticket works best if taking the toboggan down.',
        },
        {
          name: 'Monte Palace Tropical Garden ⭐',
          description: 'Stunning 70,000 square metre garden featuring exotic plants from around the world, oriental architecture, decorative tile panels, and a museum of semi-precious stones. The garden cascades down the hillside with lakes, sculptures, and African art. The Church of Nossa Senhora do Monte, resting place of Emperor Charles I of Austria, is nearby.',
          cruiseLineOption: 'Reached by Monte cable car',
          independent: '2 to 3 hours',
          allow: 'Half day',
          cost: 'Entry fee',
          notes: 'The gardens are steep - start at the top and work your way down. Comfortable walking shoes essential. Allow extra time if visiting the museums inside.',
        },
        {
          name: 'Cabo Girão Skywalk ⭐',
          description: 'Europe\'s highest sea cliff skywalk at 580 metres above the Atlantic Ocean. The glass platform juts out over the sheer cliff face, providing vertigo-inducing views down to the terraced vineyards and tiny beach below. A cable car descends to the base where you can swim.',
          cruiseLineOption: 'Ship excursion or hop-on bus',
          independent: '2 to 3 hours including travel',
          allow: 'Half day',
          cost: 'Free viewpoint',
          notes: 'Early morning offers clearest views and fewer crowds. Not for those with fear of heights - the glass floor is intimidating. Combine with nearby Câmara de Lobos fishing village.',
        },
        {
          name: 'Câmara de Lobos',
          description: 'Picturesque fishing village made famous by Winston Churchill, who painted its colourful boats and harbour. The traditional fishing boats still line the small harbour, and cliff-top viewpoints offer stunning panoramas. The village has excellent seafood restaurants and authentic local atmosphere.',
          cruiseLineOption: 'Hop-on bus or taxi',
          independent: '2 to 3 hours',
          allow: '2-3 hours',
          cost: 'Free',
          notes: 'The hop-on hop-off bus stops here. Try the local poncha drink at a harbourside bar. The Churchill viewpoint has an information board about his painting.',
        },
        {
          name: 'Madeira Botanical Garden',
          description: 'Nine acres of stunning gardens featuring over 2,500 exotic and rare plants, with panoramic views over Funchal. The garden includes a natural history museum, bird park, and themed sections from succulents to tropical flowers. A separate cable car connects from Monte.',
          cruiseLineOption: 'Cable car or taxi',
          independent: '2 to 3 hours',
          allow: 'Half day',
          cost: 'Entry fee plus cable car',
          notes: 'Can be combined with Monte via the Botanical Garden cable car. Entry to garden is separate from cable car tickets. Less steep than Monte Palace and more traditional garden layout.',
        },
        {
          name: 'Blandy\'s Wine Lodge',
          description: 'Discover the history and production of Madeira wine at this historic lodge founded in 1811. Guided tours take you through the 200-year-old cellars, explaining the unique heating process that creates Madeira\'s distinctive flavour. Tours conclude with tastings of different wine styles from dry to sweet.',
          cruiseLineOption: 'Walk from port',
          independent: '1 to 2 hours',
          allow: '1-2 hours',
          cost: 'Tour and tasting fee',
          notes: 'Book tours in advance, especially when multiple ships are in port. The vintage room has wines dating back 150 years. Tours run in multiple languages.',
        },
        {
          name: 'Old Town (Zona Velha)',
          description: 'Funchal\'s historic quarter features narrow cobbled streets, the 15th-century Sé Cathedral, traditional tavernas, and the famous painted doors art project on Rua de Santa Maria. The Fortaleza de São Tiago fortress offers panoramic harbour views. Local restaurants serve authentic Madeiran cuisine in atmospheric settings.',
          cruiseLineOption: 'Walk from port',
          independent: '2 to 3 hours',
          allow: '2-3 hours',
          cost: 'Free',
          notes: 'The painted doors make every street a photo opportunity. Evening atmosphere is magical with lit doorways. Look for espetada (beef skewers) on restaurant menus.',
        },
        {
          name: 'Mercado dos Lavradores',
          description: 'Funchal\'s famous farmers\' market is a feast for the senses, with flowers, exotic fruits, vegetables, and fish displayed in a beautiful Art Deco building. Local vendors in traditional costume offer samples of unfamiliar tropical fruits. The fish hall displays the distinctive black scabbard fish unique to Madeira.',
          cruiseLineOption: 'Walk from port',
          independent: '1 hour',
          allow: '1 hour',
          cost: 'Free',
          notes: 'Morning is best for atmosphere and freshest produce. Try the exotic fruits but agree on price before accepting samples. The flower vendors offer great value on pre-made bouquets.',
        },
      ],
      ourTake: 'Funchal offers something magical for every visitor. First-timers must experience the cable car to Monte and, if feeling adventurous, the toboggan ride - it\'s genuinely thrilling and utterly unique. The Old Town with its painted doors deserves at least an hour of wandering. For repeat visitors, the island excursions to Cabo Girão skywalk or levada walks through laurisilva forest reveal Madeira\'s dramatic natural beauty. Don\'t miss sampling Madeira wine - the fortified varieties are unlike anything else.',
    },
    
    withKids: {
      familyFriendly: {
        mcdonalds: {
          name: 'McDonald\'s Funchal',
          location: 'Rua do Aljube, near Municipal Garden',
          walkingTime: '18 minutes from cruise terminal',
          notes: 'Standard international menu',
        },
        park: {
          name: 'Santa Catarina Park',
          location: 'Above the marina',
          walkingTime: '12 minutes from cruise terminal',
          facilities: 'Playground, swan lake, cafe, extensive grounds',
          notes: 'Excellent views of harbour and cruise ships, children\'s play area',
        },
      },
      toddlers: [
        'Santa Catarina Park playground and duck pond',
        'Cable car ride (views will fascinate young children)',
        'Lido swimming pools (safer than beach for small children)',
      ],
      olderKids: [
        'Monte toboggan ride - exciting and unique experience',
        'CR7 Museum - Cristiano Ronaldo memorabilia',
        'Cable car and gardens exploration',
      ],
      teens: [
        'Toboggan ride - genuinely thrilling',
        'CR7 Museum for football fans',
        'Old Town exploration and photography',
        'Poncha sampling (with parental supervision, traditional drink)',
        'Water activities at the Lido',
      ],
      familyFood: [
        'Hard Rock Cafe: Familiar menu at the marina',
        'Pizzeria Portuguesa: Family-friendly near Old Town',
        'Cafe do Teatro: Cakes and light meals in pleasant setting',
      ],
      warnings: [
        'Monte Palace Gardens are extremely steep - not suitable for pushchairs',
        'Toboggan has minimum height requirements and may frighten nervous children',
        'Exotic fruit sellers at the market can be pushy - establish interest before accepting samples',
      ],
      easyDay: 'Take a taxi to the cable car station (avoiding the uphill walk) and ride to Monte together - the views are spectacular for all ages. Children love the toboggan ride (suitable from around age 6), while younger children can take the cable car back down. Return to the seafront for lunch at a family-friendly restaurant, then let kids run in Santa Catarina Park with its playground while parents enjoy the harbour views and coffee.',
    },
    
    send: {
      wheelchairAccess: {
        portArea: 'The seafront promenade from port to town is flat and accessible',
        cityCenter: 'Old Town has cobbled streets that can be challenging',
      },
      mobilityConsiderations: [
        'The cable car is wheelchair accessible but Monte gardens are extremely steep',
        'Old Town has cobbled streets that can be challenging',
        'The seafront promenade from port to town is flat and accessible',
        'Taxis are readily available and affordable',
      ],
      quietSpots: [
        'Municipal Garden - peaceful formal gardens in the city centre',
        'Santa Catarina Park - large enough to find quiet corners',
        'Almirante Reis Garden - seafront gardens often overlooked by tourists',
      ],
      sensoryConsiderations: {
        busyAreas: 'Cable car station when ships are in, Mercado dos Lavradores in morning',
        quieterAlternatives: 'Municipal Garden, upper areas of Santa Catarina Park',
        noiseLevels: 'Generally calm city, market can be busy and loud',
      },
    },
    
    medical: {
      pharmacy: {
        name: 'Farmácia do Infante',
        location: 'Near Sé Cathedral, 15 minutes walk from port',
        notes: 'Portuguese pharmacies display green cross and can advise on minor ailments',
      },
      hospital: {
        name: 'Hospital Dr Nélio Mendonça',
        location: 'Approximately 3km from port',
        hasEmergency: true,
        notes: 'Main hospital for Madeira with full emergency services',
      },
      tips: [
        'European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC) valid here',
        'Pharmacies can provide advice and some medications without prescription',
        'Tap water is safe to drink in Funchal',
      ],
    },
    
    foodAndDrink: {
      localDish: {
        name: 'Espetada',
        description: 'Cubes of marinated beef grilled on a bay leaf skewer over an open flame, traditionally hung from a stand at your table. Served with bolo do caco (garlic bread) and local accompaniments.',
        whatToLookFor: 'Authentic restaurants hang the skewer from a hook, letting juices drip onto the bread',
      },
      restaurants: [
        {
          name: 'Gavião Novo',
          location: 'Old Town',
          description: 'Traditional Madeiran cuisine with espetada specialty',
        },
        {
          name: 'Armazém do Sal',
          location: 'Near Marina',
          description: 'Modern Madeiran food in converted salt warehouse',
        },
        {
          name: 'A Muralha',
          location: 'Rua de Santa Maria',
          description: 'Authentic local restaurant in historic building',
        },
      ],
      cafes: [
        {
          name: 'Ritz Madeira',
          location: 'City Centre',
          description: 'Historic cafe with traditional pastries',
        },
        {
          name: 'Armazém do Mercado',
          location: 'Near Market',
          description: 'Trendy food hall with multiple vendors',
        },
        {
          name: 'Golden Gate Grand Cafe',
          location: 'Avenida Arriaga',
          description: 'Art Deco cafe since 1814',
        },
      ],
      bars: [
        {
          name: 'Galáxia Skybar',
          location: 'Savoy Palace Hotel',
          description: 'Galaxy-themed rooftop bar with mountain views',
        },
        {
          name: 'Venda Velha',
          location: 'Old Town',
          description: 'Traditional poncha and local atmosphere',
        },
        {
          name: 'Mini Eco Bar',
          location: 'Old Town',
          description: 'Sustainable cocktails in creative space',
        },
      ],
      localSpecialties: 'Madeira\'s cuisine combines Portuguese traditions with island influences. Try espetada (beef skewers), espada com banana (black scabbard fish with banana), bolo do caco (garlic bread), and lapas (limpets). Madeira wine ranges from dry Sercial to sweet Malmsey, and poncha, a cocktail of sugar cane spirit, honey, and citrus, is the island\'s signature drink.',
      eatingEtiquette: [
        'Lunch is typically 12pm to 3pm, dinner from 7pm onwards',
        'Service charge is rarely included - tip 5 to 10 percent for good service',
        'Many restaurants offer tourist menus, but authentic local spots have better food',
      ],
    },
    
    practicalInfo: {
      currency: 'EUR (€)',
      language: 'Portuguese',
      timezone: 'GMT+0',
      emergencyNumbers: {
        all: '112 for all emergencies',
      },
      wifiInfo: 'Available at cafes and restaurants',
    },
  },

  'fuerteventura': {
    portName: 'Fuerteventura',
    displayName: 'Puerto del Rosario',
    country: 'Spain (Canary Islands)',
    
    overview: {
      hook: 'Golden dunes meeting turquoise Atlantic waters on the Canary Islands\' most unspoilt island, where windswept beaches stretch for miles and volcanic landscapes create an otherworldly playground.',
      description: `Fuerteventura is the second largest of Spain's Canary Islands but feels remarkably undeveloped compared to its neighbours. Cruise ships dock at Puerto del Rosario, the small capital city on the east coast, where the port sits just a short walk from the town beach and pedestrianised centre. While Puerto del Rosario itself is modest, it serves as the gateway to some of the most spectacular beaches in Europe, including Corralejo's famous dunes recently named the best beach in the world by National Geographic.

The island's appeal lies in its raw natural beauty. Just 100 miles off the African coast, Fuerteventura receives constant trade winds that make it a world-class destination for windsurfing and kiteboarding. The Corralejo Natural Park in the north features vast golden sand dunes backed by turquoise lagoons, while the historic village of Betancuria, nestled in volcanic hills, reveals the island's 15th-century Spanish colonial past. The ancient goat-herding traditions continue, producing the award-winning Majorero cheese.

Puerto del Rosario may lack the polish of purpose-built resorts, but it offers an authentic slice of Canarian life with colourful street art, local markets, and friendly locals who have seen their capital transform from a quiet goat-shipping port (the town was called Puerto de Cabras or "Port of Goats" until 1956) into an increasingly popular cruise destination. The island's low-key atmosphere and genuine character reward independent exploration.`,
      weatherSeasonal: '20 to 28°C year-round with constant sunshine and trade winds. Bring sun protection and something windproof for beach days. The island is notably windier than other Canary Islands.',
      portInfo: {
        dockLocation: 'Muelle de Cruceros, Puerto del Rosario',
        distanceToTown: '5 minutes walk to beach, 10 minutes to town centre',
        shuttleInfo: 'Limited - most passengers walk or use taxis',
      },
      importantNotes: [
        'Puerto del Rosario has limited attractions - the real Fuerteventura lies beyond the capital',
        'Many shops close for siesta (roughly 2pm to 5pm)',
        'Bus services exist but can be infrequent - consider a taxi or rental car for island exploration',
        'The island is large (100km long) - focus on the north if time is limited',
      ],
    },
    
    stayLocal: {
      convenienceStores: [
        {
          name: 'Spar',
          location: 'Near town centre, 12 min walk',
          type: 'small shop',
          what: 'Groceries, water, snacks',
          notes: 'Good basics',
        },
        {
          name: 'Various vendors',
          location: 'Primero de Mayo street, 15 min',
          type: 'small shops',
          what: 'Local goods, souvenirs',
          notes: 'Main pedestrian street',
        },
        {
          name: 'Las Rotondas',
          location: '20 min walk',
          type: 'shopping centre',
          what: 'Everything, many stores',
          notes: 'No siesta closure',
        },
      ],
      quickWalk: [
        {
          title: 'Port to Playa Chica',
          content: 'Walk left from the port along the promenade to the town beach',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Marina Stroll',
          content: 'Walk around the small marina area near the port',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      longerWalk: [
        {
          title: 'Beach to Town Centre Loop',
          content: 'From port to Playa Chica, along promenade, up through town, return via Primero de Mayo',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Boardwalk North',
          content: 'Walk north along the coastal boardwalk towards the lime kilns',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      parks: [
        {
          title: 'Plaza de la Paz',
          content: 'Small town square near the church with benches',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Seafront Gardens',
          content: 'Palm trees and gardens along the promenade',
          terrain: 'easy',
          mapLink: 'https://maps.google.com',
        },
      ],
      beach: {
        name: 'Playa Chica',
        description: 'A charming, sheltered urban beach with golden sand right in the heart of Puerto del Rosario. The calm, clear waters are perfect for swimming, and the beach is well-maintained with good facilities. Views of your cruise ship from the beach make for memorable photos.',
        beachType: 'Sand',
        waterEntry: 'Shallow entry, calm waters',
        shelter: 'Sheltered by breakwaters',
        crowdLevel: 'Moderate, can be busy when cruise ships are in',
        waterTemperature: '~20°C year-round',
        facilities: 'Lifeguards, sunbeds/umbrellas for hire, showers, toilets, nearby restaurants/bars',
        accessNotes: '5 minutes flat walk from cruise port',
        bestFor: 'Swimming, families, relaxation, quick beach stop',
        coordinates: { lat: 28.4995, lng: -13.8600 },
        mapLink: 'https://maps.google.com',
        additionalBeaches: [
          'Playa Blanca: Larger sandy beach 3km south, good facilities',
          'Caleta de Fuste: Resort beach 10km south with calm lagoon, ideal for families',
        ],
      },
      scenic: [
        'Playa Chica with your cruise ship in the background',
        'Street art murals throughout Puerto del Rosario',
        'Church of Nuestra Señora del Rosario',
        'Whale skeleton sculpture on the seafront',
        'Barbary ground squirrels (often found on beaches)',
      ],
      shopping: [
        'Primero de Mayo: Main pedestrianised shopping street',
        'Las Rotondas Shopping Centre: Modern mall with 100 stores (20 min walk)',
        'Local handicraft stalls in town centre',
      ],
      coffee: [
        'Huga Restaurant: Good coffee and gastrotapas on pedestrian street',
        'Cafe terraces on Primero de Mayo',
      ],
      bars: [
        'Waterfront cafes near Playa Chica',
        'Bar terraces on Primero de Mayo street',
      ],
      rainyDay: [
        'Casa Museo Unamuno: Home of exiled Spanish writer (check opening times)',
        'Las Rotondas Shopping Centre',
        'Explore the street art throughout the town',
        'Church of Nuestra Señora del Rosario',
      ],
      tip: 'Puerto del Rosario is small and can be explored in an hour or two. If you have a full day, the real Fuerteventura experience is the Corralejo dunes in the north. Bus 6 runs regularly from Puerto del Rosario bus station (20 minute walk from port) to Corralejo (40 minutes, around 3.40 euros). Get off at the Grandes Playas stop for the best dune beaches. Alternatively, share a taxi with other passengers for approximately 35 euros each way.',
    },
    
    goFurther: {
      attractions: [
        {
          name: 'Corralejo Natural Park and Dunes ⭐',
          description: 'Vast golden sand dunes stretching along the coast, backed by turquoise lagoons and views of Lobos Island. Recently named the best beach in the world by National Geographic, this protected natural park offers miles of pristine beaches, from developed areas near Corralejo town to remote stretches accessible only on foot.',
          cruiseLineOption: 'Ship excursions or Bus 6',
          independent: '4 to 6 hours including travel',
          allow: 'Half day',
          cost: 'Bus ~3.40 euros, taxi ~35 euros each way',
          notes: 'Bus 6 from Puerto del Rosario runs regularly to Corralejo via the dunes. The Grandes Playas stop is best for beach access. Bring everything you need - facilities are limited in the dunes themselves.',
        },
        {
          name: 'Betancuria ⭐',
          description: 'The island\'s original capital, founded in 1405 by Norman conqueror Jean de Béthencourt, is a beautifully preserved colonial village nestled in a volcanic valley. White-washed buildings, the Santa María church, local craft shops, and traditional restaurants serve authentic Canarian cuisine. The location was chosen to hide from pirate attacks.',
          cruiseLineOption: 'Ship excursions or taxi',
          independent: '2 to 3 hours including travel',
          allow: 'Half day',
          cost: 'Taxi or tour',
          notes: 'The mountain drive is scenic but winding. Try goat\'s cheese (queso majorero) in local restaurants. Visit the church with its impressive wooden ceiling.',
        },
        {
          name: 'Corralejo Town',
          description: 'The island\'s main tourist town in the north offers a lively harbour, excellent restaurants, craft markets, and a traditional old town with pedestrianised streets. Ferries depart for Lobos Island and Lanzarote. The beaches in and around town are excellent, and the atmosphere is relaxed and welcoming.',
          cruiseLineOption: 'Bus 6 or taxi',
          independent: '2 to 4 hours',
          allow: 'Half day',
          cost: 'Bus ~3.40 euros',
          notes: 'The old town has more character than the newer tourist areas. Ferry trips to Lobos Island offer wildlife watching. Market days bring extra atmosphere.',
        },
        {
          name: 'Caleta de Fuste',
          description: 'Purpose-built resort area 10km south of Puerto del Rosario, featuring a calm horseshoe-shaped beach perfect for families, a marina, shopping, and water sports. The 18th-century Castillo de Caleta de Fuste tower stands guard over the bay. More developed than other areas but convenient for a beach day.',
          cruiseLineOption: 'Taxi or bus',
          independent: '3 to 4 hours',
          allow: 'Half day',
          cost: 'Taxi or bus',
          notes: 'The beach is excellent for children with shallow, calm water. The castle tower is worth a quick look. Good restaurant selection along the marina.',
        },
        {
          name: 'Oasis Wildlife Fuerteventura',
          description: 'Large zoo and botanical garden near La Lajita in the south, home to exotic animals including giraffes, lions, elephants, and camels. The park includes bird shows, sea lion encounters, camel rides through a cactus garden, and a botanical collection. A full day experience for families.',
          cruiseLineOption: 'Ship excursions recommended',
          independent: '4 to 5 hours including travel',
          allow: 'Full day',
          cost: 'Entry fee + transport',
          notes: 'Animal shows run at set times - check the schedule on arrival. The camel safari through the cactus garden is popular. Consider a ship excursion as it\'s quite far south.',
        },
        {
          name: 'Ajuy Caves',
          description: 'Dramatic sea caves carved into the oldest rock formations in the Canary Islands, located on the rugged west coast. A trail from the small fishing village of Ajuy leads to the caves along striking black volcanic cliffs. The village itself has traditional fish restaurants overlooking a black sand beach.',
          cruiseLineOption: 'Taxi or tour',
          independent: '3 to 4 hours including travel',
          allow: 'Half day',
          cost: 'Taxi or tour',
          notes: 'Wear sturdy footwear for the cave trail. The caves are best visited at low tide. Fresh fish at the village restaurants is excellent.',
        },
        {
          name: 'El Cotillo',
          description: 'Laid-back fishing village in the northwest known for its stunning lagoon beaches (perfect for families) and wilder surf beaches (popular with surfers). The village has excellent seafood restaurants, a ruined castle tower, and a relaxed bohemian atmosphere. Less touristy than Corralejo.',
          cruiseLineOption: 'Taxi or tour',
          independent: '3 to 4 hours including travel',
          allow: 'Half day',
          cost: 'Taxi or tour',
          notes: 'The lagoon beaches are best for swimming and families. The north beaches attract surfers and have stronger currents. Sunset views from the castle tower are spectacular.',
        },
        {
          name: 'Mirador Morro Velosa',
          description: 'Spectacular viewpoint designed by renowned Canarian artist César Manrique, perched high in the central mountains above Betancuria. The modern building houses a small museum about the landscape, while the terrace offers 360-degree views across Fuerteventura\'s dramatic volcanic terrain.',
          cruiseLineOption: 'Combine with Betancuria tour',
          independent: '2 to 3 hours including travel',
          allow: '2-3 hours',
          cost: 'Entry fee + transport',
          notes: 'Combine with a visit to nearby Betancuria. The cafe has stunning views. Check opening times (closed Mondays).',
        },
      ],
      ourTake: 'Fuerteventura rewards those who venture beyond Puerto del Rosario. The Corralejo dunes are genuinely spectacular and worth the trip for any beach lover - take Bus 6 or share a taxi with fellow passengers. If you prefer history and culture, the scenic drive to Betancuria through volcanic landscapes reveals the island\'s heritage. For a relaxed beach day without travelling far, Caleta de Fuste offers excellent facilities just 15 minutes south. Puerto del Rosario itself is pleasant for a couple of hours but the island\'s magic lies beyond its capital.',
    },
    
    withKids: {
      familyFriendly: {
        mcdonalds: {
          name: 'McDonald\'s',
          location: 'Las Rotondas Shopping Centre',
          walkingTime: '20 minutes from cruise port',
          notes: 'Inside shopping centre with play area',
        },
        aleHop: {
          name: 'Ale-Hop',
          location: 'Las Rotondas Shopping Centre',
          walkingTime: '20 minutes from cruise port',
          notes: 'Fun novelty store with toys, gifts, gadgets',
        },
        park: {
          name: 'Seafront Promenade Area',
          location: 'Along coast near Playa Chica',
          walkingTime: '5 minutes from cruise port',
          facilities: 'Open space, benches, beach access',
          notes: 'Not a formal park but good for walking and beach play',
        },
      },
      toddlers: [
        'Playa Chica beach - calm shallow water, safe swimming',
        'Barbary ground squirrel spotting (bring carrots or cucumber)',
        'Walk along the seafront promenade',
      ],
      olderKids: [
        'Corralejo dunes - endless sandy playground',
        'Oasis Wildlife Park (day trip)',
        'Caleta de Fuste lagoon beach - calm water for swimming',
      ],
      teens: [
        'Corralejo beaches and town exploration',
        'Water sports in Corralejo or Caleta de Fuste',
        'Street art hunt in Puerto del Rosario',
        'Surfing lessons (various locations)',
        'Shopping at Las Rotondas or Corralejo',
      ],
      familyFood: [
        'Huga Restaurant: Good for tapas style sharing',
        'Beach cafes at Playa Chica',
        'Las Rotondas food court: Multiple options for different tastes',
      ],
      warnings: [
        'The island is very windy - bring windbreaks and sun protection',
        'Ocean currents can be strong on west coast beaches',
        'Bus services can be infrequent - check return times carefully',
      ],
      easyDay: 'For families, spend the morning at Playa Chica beach right by the port - the calm water is perfect for children and you can see your cruise ship. After lunch in town, take a taxi to Caleta de Fuste (10 minutes south) for the afternoon at the larger lagoon beach with more facilities. The shallow, protected waters are ideal for younger children. Return by taxi allowing plenty of time to get back to the ship.',
    },
    
    send: {
      wheelchairAccess: {
        portArea: 'Puerto del Rosario town centre is largely flat and accessible',
        cityCenter: 'Caleta de Fuste resort area is purpose-built and accessible',
      },
      mobilityConsiderations: [
        'Puerto del Rosario town centre is largely flat and accessible',
        'Playa Chica beach has boardwalk access to the sand',
        'Corralejo dunes are soft sand - not suitable for wheelchairs',
        'Caleta de Fuste resort area is purpose-built and accessible',
      ],
      quietSpots: [
        'Playa Chica early morning before crowds',
        'Northern section of seafront promenade',
        'Church of Nuestra Señora del Rosario (usually quiet)',
      ],
      sensoryConsiderations: {
        busyAreas: 'Primero de Mayo on cruise ship days, Corralejo in high season',
        quieterAlternatives: 'Northern beaches, Betancuria village',
        noiseLevels: 'Generally calm, wind can be loud on beaches',
      },
    },
    
    medical: {
      pharmacy: {
        name: 'Farmacia',
        location: 'Near Primero de Mayo pedestrian street',
        notes: 'Look for green cross sign, can advise on minor ailments',
      },
      hospital: {
        name: 'Hospital General de Fuerteventura',
        location: 'Puerto del Rosario, approximately 2km from port',
        hasEmergency: true,
        notes: 'Main hospital for the island',
      },
      tips: [
        'European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC) valid in Spain',
        'Pharmacies can provide advice and some medications without prescription',
        'Sun protection is essential - the UV is strong year-round',
        'Stay hydrated - the constant wind masks heat',
      ],
    },
    
    foodAndDrink: {
      localDish: {
        name: 'Papas Arrugadas with Mojo',
        description: 'Small wrinkled potatoes boiled in heavily salted water until the skin puckers, served with red (spicy) and green (herb) mojo sauces. A Canarian staple found everywhere.',
        whatToLookFor: 'Authentic versions use local new potatoes and homemade mojo',
      },
      restaurants: [
        {
          name: 'Huga Restaurant',
          location: 'Primero de Mayo',
          description: 'Modern gastrotapas with local ingredients',
        },
        {
          name: 'Casa Santa Maria',
          location: 'Betancuria',
          description: 'Traditional Canarian in historic setting',
        },
        {
          name: 'El Caleton',
          location: 'Corralejo',
          description: 'Seafood overlooking the harbour',
        },
      ],
      cafes: [
        {
          name: 'Cafe terraces',
          location: 'Primero de Mayo',
          description: 'Multiple options on pedestrian street',
        },
        {
          name: 'Beach cafes',
          location: 'Playa Chica',
          description: 'Casual waterfront coffee and snacks',
        },
      ],
      bars: [
        {
          name: 'Waterfront bars',
          location: 'Puerto del Rosario',
          description: 'Casual drinks with sea views',
        },
        {
          name: 'Corralejo old town',
          location: 'Corralejo',
          description: 'Livelier bar scene in the evening',
        },
      ],
      localSpecialties: 'Fuerteventura is famous for goat\'s cheese (queso majorero), which has Protected Designation of Origin status. Other Canarian specialities include papas arrugadas (wrinkled potatoes) with mojo sauces, gofio (toasted grain flour used in many dishes), and fresh fish including vieja (parrotfish). Local wines from volcanic soils are distinctive, and try a barraquito coffee layered with Licor 43.',
      eatingEtiquette: [
        'Lunch is typically 1pm to 4pm, dinner from 8pm onwards',
        'Many places close for siesta, roughly 2pm to 5pm',
        'Tipping 5 to 10 percent is appreciated but not mandatory',
      ],
    },
    
    practicalInfo: {
      currency: 'EUR (€)',
      language: 'Spanish',
      timezone: 'GMT+0',
      emergencyNumbers: {
        all: '112 for all emergencies',
      },
      wifiInfo: 'Available at cafes and restaurants',
    },
  },
};
