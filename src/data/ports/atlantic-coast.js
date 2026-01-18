/**
 * Atlantic Coast Ports Content
 */

export const atlanticCoastPorts = {
  'vigo': {portName: 'Vigo', displayName: 'Vigo', country: 'Spain', overview: {description: 'Galicia coast port. Gateway to Santiago de Compostela.', weatherSeasonal: '10-16°C', portInfo: {dockLocation: 'Port of Vigo', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Beaches nearby', content: 'Galician coast'}, scenic: [], shopping: [], coffee: [], bars: [], rainyDay: [], tip: 'Real Galician town'}, goFurther: {attractions: [{name: 'Santiago de Compostela', description: 'Pilgrimage destination', cruiseLineOption: 'Full day tours', independent: 'Bus or train', allow: 'Full day', cost: 'Variable'}], ourTake: 'Historic city'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Wander town'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'porto': {portName: 'Porto', displayName: 'Porto', country: 'Portugal', overview: {description: 'Portuguese second city. Wine region, Douro River.', weatherSeasonal: '8-16°C', portInfo: {dockLocation: 'Port of Porto', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Ribeira waterfront', content: 'Historic riverside'}, scenic: ['Dom Luís Bridge'], shopping: ['City center'], coffee: [], bars: ['Port wine bars'], rainyDay: ['Museums'], tip: 'Charming old city'}, goFurther: {attractions: [{name: 'Douro Valley', description: 'Wine region', cruiseLineOption: 'Full day wine tours', independent: 'Train/tour', allow: 'Full day', cost: 'Variable'}], ourTake: 'Beautiful valley'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: ['Steep hills'], easyDay: 'Ribeira wander'}, send: {wheelchairAccess: {}, mobilityConsiderations: ['Hills']}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Good'}},

  'bilbao': {
    portName: 'Bilbao',
    displayName: 'Bilbao',
    country: 'Spain',
    
    overview: {
      hook: 'Walk off the ship straight into Getxo\'s seaside charm, then metro into a city transformed by titanium curves and Basque gastronomy. The Guggenheim effect turned this industrial heartland into Spain\'s most exciting cultural destination.',
      description: `Bilbao is northern Spain's largest city and the capital of the Basque Country's Bizkaia province. Once an industrial powerhouse built on iron and shipbuilding, the city underwent a dramatic transformation in the 1990s with the opening of Frank Gehry's Guggenheim Museum. This shimmering titanium masterpiece sparked what urbanists call "the Bilbao Effect" - a complete reinvention of the city's identity from post-industrial decline to cutting-edge cultural destination.

Your ship actually docks in Getxo, an affluent seaside suburb about 15 kilometres north of Bilbao's city centre. This is no hardship - Getxo itself offers the UNESCO-listed Vizcaya Bridge (the world's oldest transporter bridge), beautiful Ereaga Beach right beside the cruise terminal, and charming old fishing ports. The excellent metro system whisks you into Bilbao in about 25 minutes, depositing you within easy walking distance of both the Guggenheim and the atmospheric Old Town.

The Basque Country is renowned as one of Europe's great gastronomic regions, and Bilbao delivers magnificently. The Old Town's seven original streets overflow with pintxos bars - the Basque answer to tapas - where you can hop from bar to bar sampling everything from the famous Gilda (anchovy, olive and pepper on a stick) to innovative modern bites. This is a city that rewards wandering, whether along the riverside promenade, up the funicular to Mount Artxanda's panoramic viewpoint, or through the elegant Ensanche district's boutiques and cafes.`,
      weatherSeasonal: '13 to 16°C | Expect rain - this is Green Spain! Pack layers and a waterproof jacket. Bilbao has an oceanic climate with mild but wet conditions year-round.',
      portInfo: {
        dockLocation: 'Getxo cruise terminal, beside Ereaga Beach and the marina',
        distanceToTown: 'Getxo town centre is walkable (10 to 15 minutes). Bilbao city centre is 15 km (about 25 minutes by metro or shuttle)',
        shuttleInfo: 'Most cruise lines offer paid shuttles to Plaza Moyua in Bilbao (around 15 to 20 euros return). Free port authority shuttle to metro stations',
      },
      importantNotes: [
        'The Guggenheim is closed on Mondays (except summer months and holidays) - plan accordingly',
        'Siesta is less observed in the Basque Country than southern Spain, but some small shops may close 14:00 to 17:00',
        'Pintxos bars are busiest 13:00 to 15:00 and 19:00 to 21:00',
        'Museums generally close on Mondays - verify opening times before visiting',
      ],
    },
    
    stayLocal: {
      convenienceStores: [
        {
          name: 'Supermarket near Marina',
          location: '5 minutes walk along Ereaga promenade',
          type: 'supermarket',
          what: 'Water, snacks, sunscreen, essentials',
          notes: 'Near the marina area',
        },
        {
          name: 'Shops along Basagoiti Avenue',
          location: '10 to 15 minutes walk via Algorta',
          type: 'small shops',
          what: 'Various essentials, souvenirs',
          notes: 'Main shopping street in Getxo',
        },
      ],
      quickWalk: [
        {
          title: 'Ereaga Beach Stroll',
          content: 'Walk directly from the cruise terminal along the sandy Ereaga Beach (800 metres) with views of the estuary and marina',
          terrain: 'easy',
          mapLink: 'https://maps.google.com/?q=Playa+de+Ereaga,+Getxo',
        },
        {
          title: 'Marina and Arriluze Walk',
          content: 'Short loop around the marina with cafes, restaurants and views of the cruise ships and bay',
          terrain: 'easy',
          mapLink: 'https://maps.google.com/?q=Puerto+Deportivo+de+Getxo',
        },
      ],
      longerWalk: [
        {
          title: 'Puerto Viejo (Old Fishing Port)',
          content: 'Walk along the promenade to Algorta\'s charming old fishing port with narrow streets, colourful houses and excellent pintxos bars',
          terrain: 'easy to moderate',
          mapLink: 'https://maps.google.com/?q=Puerto+Viejo+de+Algorta',
        },
        {
          title: 'Vizcaya Bridge Walk',
          content: 'Head south along the estuary to see the UNESCO World Heritage transporter bridge, ride the gondola across or take the lift to the walkway',
          terrain: 'easy',
          mapLink: 'https://maps.google.com/?q=Puente+de+Vizcaya',
        },
        {
          title: 'Stately Homes Promenade',
          content: 'Walk through Neguri to see the grand 19th century mansions built by wealthy industrialists along the waterfront',
          terrain: 'easy',
          mapLink: 'https://maps.google.com/?q=Neguri,+Getxo',
        },
      ],
      parks: [
        {
          title: 'La Galea Cliffs',
          content: 'Dramatic clifftop area with old fort, windmill (Aixerrota) and lighthouse - spectacular coastal views',
          terrain: 'moderate',
          mapLink: 'https://maps.google.com/?q=La+Galea,+Getxo',
        },
      ],
      beach: {
        name: 'Playa de Ereaga (Ereaga Beach)',
        description: 'A beautiful 800-metre urban beach of fine golden sand right next to the cruise terminal. Sheltered by the estuary, it offers calm waters and excellent facilities. Popular with locals for beach football and watersports.',
        beachType: 'Sand (fine golden sand)',
        waterEntry: 'Shallow entry',
        shelter: 'Sheltered - protected from northwest winds by the estuary',
        crowdLevel: 'Moderate in summer, quiet in spring',
        waterTemperature: 'Around 14 to 16°C in spring',
        facilities: 'Lifeguards (seasonal, summer), sunbeds/umbrellas available in summer, showers, toilets, restaurants/bars along promenade, changing rooms',
        accessNotes: 'Immediate walk from cruise terminal (under 5 minutes)',
        bestFor: 'Beach stroll, cafe culture, watersports enthusiasts',
        coordinates: { lat: 43.3485, lng: -3.0135 },
        mapLink: 'https://maps.google.com/?q=Playa+de+Ereaga,+Getxo',
        additionalBeaches: [
          'Arrigunaga Beach - wilder beach with cliffs, 15 minutes walk',
          'La Bola Beach - smaller cove beach',
        ],
      },
      scenic: [
        'Vizcaya Bridge (Puente Colgante) - UNESCO World Heritage transporter bridge, especially dramatic from the walkway 50 metres up',
        'Puerto Viejo de Algorta - colourful fishing village houses and harbour',
        'Ereaga Beach with cruise ship backdrop - classic holiday shot',
      ],
      shopping: [
        'Basagoiti Avenue in Algorta - main shopping street with boutiques and local stores',
        'Algorta Market - local produce and specialty foods',
        'Shops near the marina - tourist oriented souvenirs and gifts',
      ],
      coffee: [
        'Cafes along Ereaga promenade - multiple options with sea views',
        'Puerto Viejo bars - traditional atmosphere in the old fishing quarter',
      ],
      bars: [
        'Puerto Viejo de Algorta - cluster of excellent pintxos bars in the old fishing port',
        'Bars on Basagoiti Avenue - local favourites for txakoli wine and pintxos',
      ],
      rainyDay: [
        'Cross the Vizcaya Bridge by gondola and explore Portugalete\'s old town',
        'Take the metro to Bilbao for museums (Guggenheim, Fine Arts Museum)',
        'Pintxos crawl in Puerto Viejo\'s covered bar areas',
      ],
      tip: 'If you prefer to stay local rather than head into Bilbao, Getxo offers a wonderful half-day experience. Take the panoramic lift at the Vizcaya Bridge for stunning views, then walk to Puerto Viejo de Algorta for a proper Basque pintxos crawl. The old fishing port has excellent bars serving traditional fare at lower prices than Bilbao\'s tourist areas. Finish with a coffee on Ereaga\'s promenade watching the cruise ships come and go.',
    },
    
    goFurther: {
      attractions: [
        {
          name: 'Guggenheim Museum ⭐',
          description: 'Frank Gehry\'s masterpiece of titanium curves and glass revolutionised modern architecture and transformed Bilbao. The building itself is the star - a shimmering, undulating sculpture beside the Nervion River. The outdoor sculptures - Jeff Koons\' flower-covered Puppy and Louise Bourgeois\' Maman spider - are iconic.',
          cruiseLineOption: 'Ship shuttle or independent metro',
          independent: '2 to 3 hours',
          allow: 'Half day',
          cost: 'Entry fee (book online in advance)',
          notes: 'Closed on Mondays (except summer and holidays). Book tickets online to skip queues. Don\'t miss the outdoor sculptures - Puppy and Maman are free to see.',
        },
        {
          name: 'Casco Viejo (Old Town) ⭐',
          description: 'Bilbao\'s atmospheric medieval heart, known as Las Siete Calles (The Seven Streets), is a labyrinth of narrow lanes packed with pintxos bars, traditional shops and historic buildings. The 14th century Santiago Cathedral anchors the district, while Plaza Nueva provides perfect setting for al fresco dining.',
          cruiseLineOption: 'Metro to Casco Viejo station',
          independent: '2 to 3 hours',
          allow: 'Half day',
          cost: 'Free (pintxos cost 2-3 euros each)',
          notes: 'Visit Plaza Nueva for highest concentration of pintxos bars - Gure Toki, Sorginzulo and Cafe Bar Bilbao are local favourites. Flea market in Plaza Nueva on Sunday mornings. Ribera Market in the morning for freshest produce.',
        },
        {
          name: 'Mount Artxanda Funicular ⭐',
          description: 'This historic funicular railway (operating since 1915) whisks you up to Mount Artxanda in just 3 minutes for spectacular panoramic views over Bilbao. From the viewpoint (marked by the famous red "BILBAO" letters), you can see the Guggenheim, Old Town, mountains and on clear days, the Bay of Biscay.',
          cruiseLineOption: 'Independent visit',
          independent: '1 to 1.5 hours',
          allow: '1-2 hours',
          cost: 'Funicular ticket',
          notes: 'Bottom station is about 15 minutes walk from Casco Viejo (near City Hall). Restaurants at the top for scenic lunch. Guided tours on first Saturday of each month.',
        },
        {
          name: 'Mercado de la Ribera',
          description: 'One of Europe\'s largest covered markets, this Art Deco gem sits beside the river in the Old Town. Three floors overflow with fresh fish, meat, produce and Basque specialties. The ground floor gastro market offers pintxos and drinks in lively atmosphere.',
          cruiseLineOption: 'Walk from Old Town',
          independent: '1 to 1.5 hours',
          allow: '1-2 hours',
          cost: 'Free to browse',
          notes: 'Market stalls open Monday to Friday 08:00 to 14:30 and 17:00 to 20:00, Saturday 08:00 to 15:00. Pintxos bars have longer hours including Sundays. Look for beautiful stained glass windows and Art Deco details.',
        },
        {
          name: 'Vizcaya Bridge (Puente Colgante)',
          description: 'This UNESCO World Heritage Site is the world\'s oldest transporter bridge, built in 1893 by a disciple of Gustave Eiffel. The ingenious design carries passengers and vehicles across the Nervion estuary on a suspended gondola. Take the lift to the 50-metre-high pedestrian walkway for spectacular views.',
          cruiseLineOption: 'Walk from port',
          independent: '1 to 1.5 hours',
          allow: '1-2 hours',
          cost: 'Gondola and walkway tickets',
          notes: 'Walk along Getxo\'s promenade to reach it from cruise terminal (about 20 minutes). Gondola crossing takes 90 seconds and costs just a couple of euros. Walkway experience includes lift access and panoramic views.',
        },
        {
          name: 'San Juan de Gaztelugatxe',
          description: 'This dramatic islet topped by a medieval hermitage became world-famous as Dragonstone in Game of Thrones. A winding stone bridge connects it to the mainland, leading to 241 steps up to the chapel. The views of the rugged Basque coastline are breathtaking. Located 35 km east of Bilbao.',
          cruiseLineOption: 'Ship excursion or local tour',
          independent: 'Half day (4 to 5 hours including travel)',
          allow: 'Half day',
          cost: 'Free entry (advance booking), plus transport',
          notes: 'Book free entry tickets in advance during peak season (required Easter, summer, weekends March to October). Wear sturdy shoes - path is steep and can be slippery. Combine with visits to fishing village of Bermeo or historic Gernika.',
        },
        {
          name: 'Bilbao Fine Arts Museum',
          description: 'Often overlooked in favour of its flashy neighbour, this excellent museum houses outstanding collection spanning from medieval to contemporary art. Basque artists feature prominently alongside Spanish masters and international works. Set in beautiful park.',
          cruiseLineOption: 'Walk from Guggenheim',
          independent: '1.5 to 2 hours',
          allow: '2 hours',
          cost: 'Entry fee (free on certain days)',
          notes: 'Just 10 minutes walk from the Guggenheim through Doña Casilda Park. Check website for free entry days. Museum cafe has lovely terrace in the park.',
        },
        {
          name: 'Pintxos Crawl Experience',
          description: 'Experience Bilbao\'s legendary pintxos culture with a self-guided bar hop through the Old Town. The ritual involves ordering one or two pintxos and a drink at each bar before moving to the next - standing at the bar, of course, never sitting down. This is how Bilbainos socialise.',
          cruiseLineOption: 'Independent',
          independent: '2 to 3 hours',
          allow: '2-3 hours',
          cost: '2-3 euros per pintxo',
          notes: 'Start in Plaza Nueva where Gure Toki, Sorginzulo and Cafe Bar Bilbao cluster together. Try the signature Gilda (anchovy, olive and guindilla pepper) and bacalao al pil-pil. Pair with txakoli (local sparkling white wine) or zurito (small beer).',
        },
      ],
      ourTake: 'For a standard cruise day of 8 to 10 hours, prioritise the Guggenheim Museum and the Old Town (Casco Viejo) in Bilbao - these two areas capture the essence of modern and traditional Bilbao respectively. Take the shuttle or metro to Moyua station, walk to the Guggenheim (allow 2 to 3 hours including photos outside), then head to Casco Viejo for a pintxos lunch in Plaza Nueva. If time permits, ride the Artxanda funicular for panoramic views. For those who prefer to stay closer to the ship, the Vizcaya Bridge and Puerto Viejo de Algorta offer an excellent half-day in Getxo without the city commute.',
    },
    
    withKids: {
      familyFriendly: {
        mcdonalds: {
          name: 'McDonald\'s Bilbao Gran Via',
          location: 'Gran Via in Bilbao city centre',
          walkingTime: 'Near Moyua metro station',
          notes: 'Central location, good for a familiar break during sightseeing',
        },
        park: {
          name: 'Doña Casilda Park (Parque de Doña Casilda Iturrizar)',
          location: 'Between Guggenheim and Fine Arts Museum',
          walkingTime: '5 minutes from Guggenheim',
          facilities: 'Large open spaces, fountains, duck pond, playground areas',
          notes: 'Perfect for letting children run around between museum visits. Cybernetic fountain puts on light and water shows.',
        },
        beach: {
          name: 'Ereaga Beach',
          location: 'Right beside cruise terminal',
          notes: 'Perfect for families - shallow entry, calm waters, facilities including toilets and showers. Beach football is popular here.',
        },
      },
      toddlers: [
        'Ereaga Beach beside the ship',
        'Doña Casilda Park playground and duck pond',
        'Vizcaya Bridge gondola ride (quick and exciting)',
      ],
      olderKids: [
        'Guggenheim Museum - building fascinates all ages',
        'Mount Artxanda funicular ride',
        'Vizcaya Bridge walkway (50 metres above river)',
      ],
      teens: [
        'Guggenheim Museum - architecture impresses even non-art fans',
        'San Juan de Gaztelugatxe - Game of Thrones filming location (book in advance)',
        'Artxanda Funicular - Instagram-worthy views from BILBAO sign',
        'Vizcaya Bridge walkway - engineering marvel',
        'Pintxos crawl - teens can join with non-alcoholic drinks',
      ],
      familyFood: [
        'Pintxos bars - children can pick what looks interesting',
        'Mercado de la Ribera - food stalls with variety',
        'Ereaga promenade cafes',
      ],
      warnings: [
        'Guggenheim can be busy with limited seating',
        'Old Town has cobblestones and narrow streets',
        'San Juan de Gaztelugatxe involves 241 steps',
      ],
      easyDay: 'Stay in Getxo for a relaxed family day. Beach time at Ereaga right beside the ship, then take the Vizcaya Bridge gondola for a quick adventure. Walk to Puerto Viejo for pintxos lunch where kids can point at what looks good. Return to ship with plenty of time to spare.',
    },
    
    send: {
      wheelchairAccess: {
        portArea: 'Getxo\'s promenade is flat and accessible',
        cityCenter: 'Old Town has some cobblestones but main plazas are manageable',
      },
      mobilityConsiderations: [
        'Guggenheim is fully accessible with lifts, ramps, audio guides and tactile models',
        'Metro stations have lifts and system is well-designed for wheelchair users',
        'Getxo\'s promenade is flat and accessible',
        'Vizcaya Bridge gondola and walkway lift are wheelchair accessible',
        'Old Town has cobblestones in parts but main areas manageable',
      ],
      quietSpots: [
        'Doña Casilda Park - green oasis between museums',
        'Bilbao Fine Arts Museum - much quieter than Guggenheim',
        'Morning at Mercado de la Ribera before lunch crowds',
        'Ereaga Beach early morning',
      ],
      sensoryConsiderations: {
        busyAreas: 'Old Town pintxos bars especially 13:00 to 15:00 and 19:00 to 21:00. Guggenheim atrium has dramatic acoustics.',
        quieterAlternatives: 'Fine Arts Museum, Doña Casilda Park, funicular is relatively quiet',
        noiseLevels: 'Plaza Nueva is lively but surrounding covered arcades offer some shelter from noise',
      },
    },
    
    medical: {
      pharmacy: {
        name: 'Pharmacy',
        location: 'Available in Getxo town centre and throughout Bilbao',
        notes: 'Look for green cross sign',
      },
      hospital: {
        name: 'Hospital Universitario Cruces',
        location: 'Main hospital for the region',
        hasEmergency: true,
        notes: 'Full emergency services',
      },
      tips: [
        'European Health Insurance Card (EHIC) valid in Spain',
        '112 is the pan-European emergency number',
        'Pharmacies can provide advice on minor ailments',
      ],
    },
    
    foodAndDrink: {
      localDish: {
        name: 'Pintxos',
        description: 'Basque tapas, served on bread with a toothpick. The Gilda (anchovy, olive, guindilla pepper) is the classic. Other must-tries: bacalao al pil-pil (salt cod in garlic-oil sauce), marmitako (tuna and potato stew), txangurro (spider crab), kokotxas (cod cheeks), and tarta de queso (Basque burnt cheesecake).',
        whatToLookFor: 'Order at the bar, point at what you want, keep your toothpicks (used to tally your bill). Normal to have just one or two items per bar, then move to the next.',
      },
      restaurants: [
        {
          name: 'Plaza Nueva pintxos bars',
          location: 'Casco Viejo',
          description: 'Gure Toki, Sorginzulo, Cafe Bar Bilbao - highest concentration of quality pintxos',
        },
        {
          name: 'Mercado de la Ribera',
          location: 'Old Town',
          description: 'Market gastro bars for fresh seafood and pintxos',
        },
        {
          name: 'Puerto Viejo de Algorta',
          location: 'Getxo',
          description: 'Excellent local pintxos without tourist crowds',
        },
      ],
      cafes: [
        {
          name: 'Ereaga promenade cafes',
          location: 'Getxo',
          description: 'Sea views and coffee beside the ship',
        },
      ],
      bars: [
        {
          name: 'Calle Ledesma',
          location: 'Near Guggenheim',
          description: 'Good pintxos options closer to the museum',
        },
      ],
      localSpecialties: 'The Basque Country is one of Europe\'s great gastronomic regions. Try txakoli (slightly sparkling local white wine, poured from height), Rioja red wine, and kalimotxo (red wine and cola - surprisingly good!). Coffee culture is strong - "cafe con leche" is milky coffee, "cortado" is espresso with splash of milk.',
      eatingEtiquette: [
        'Pintxos bars busiest 13:00 to 15:00 and 19:00 to 21:00',
        'Stand at the bar, don\'t sit down for pintxos crawl',
        'Tipping not obligatory - rounding up or small change appreciated',
      ],
    },
    
    practicalInfo: {
      currency: 'EUR (€)',
      language: 'Spanish and Basque (Euskara). English widely spoken in tourist areas.',
      timezone: 'CET (GMT+1)',
      emergencyNumbers: {
        all: '112 (pan-European emergency number)',
      },
      wifiInfo: 'Available at terminals, cafes, and restaurants',
    },
  },
};
