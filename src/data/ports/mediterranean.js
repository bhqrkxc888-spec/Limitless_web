/**
 * Mediterranean Ports Content
 * Comprehensive port guides for Mediterranean cruise destinations
 */

export const mediterraneanPorts = {
  'barcelona': {
    portName: 'Barcelona',
    displayName: 'Barcelona',
    country: 'Spain',
    overview: {
      description: `Barcelona - one of the world's most vibrant cities. Gaudí's architecture, beaches, Gothic Old Town, amazing food. Ships dock just 15 mins walk from Las Ramblas.`,
      weatherSeasonal: '12-16°C | Spring weather, occasionally rainy. Bring layers.',
      portInfo: {
        dockLocation: 'Moll Adossat',
        distanceToTown: '15-20 min walk to Gothic Quarter',
        shuttleInfo: 'Not needed'
      }
    },
    stayLocal: {
      quickWalk: [{title: 'Las Ramblas (10m)', content: 'Famous boulevard from port.'}],
      longerWalk: [],
      parks: [],
      beach: {title: 'Barceloneta', content: 'City beach'},
      scenic: ['Gothic Quarter', 'Sagrada Familia'],
      shopping: ['Las Ramblas', 'Gothic Quarter'],
      coffee: ['Café Zurich'],
      bars: ['Plaça Reial'],
      rainyDay: ['Museums'],
      tip: 'Wander without a plan. Get lost in Gothic Quarter.'
    },
    goFurther: {
      attractions: [{name: 'Sagrada Familia ⭐', description: 'Gaudí masterpiece', cruiseLineOption: 'Cruise lines offer tours', independent: 'Metro', allow: '1.5-2 hrs', cost: '€29'}],
      ourTake: 'Worth visiting'
    },
    withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Wander Las Ramblas.'},
    send: {wheelchairAccess: {}, mobilityConsiderations: [], sensoryConsiderations: []},
    foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Tap water safe'}
  },

  'civitavecchia-rome': {
    portName: 'Rome',
    displayName: 'Civitavecchia (Rome)',
    country: 'Italy',
    overview: {
      description: `Gateway to Rome - the Eternal City. 3,000 years of history. Port is 80km from Rome (1.5-2 hrs by train).`,
      weatherSeasonal: '8-18°C | Spring, can be rainy',
      portInfo: {
        dockLocation: 'Civitavecchia Port',
        distanceToTown: 'Rome - 1.5-2 hours by train',
        shuttleInfo: 'Train available'
      }
    },
    stayLocal: {
      quickWalk: [{title: 'Civitavecchia Town', content: 'Working port town.'}],
      longerWalk: [],
      parks: [],
      beach: {title: 'Port beaches', content: 'Rocky'},
      scenic: ['Harbor', 'Fort'],
      shopping: ['Town center'],
      coffee: [],
      bars: [],
      rainyDay: [],
      tip: 'Most go to Rome by train. Worth it.'
    },
    goFurther: {
      attractions: [{name: 'Rome ⭐', description: 'Colosseum, Vatican, more', cruiseLineOption: 'Full day excursions', independent: 'Train €10-20', allow: 'Full day', cost: 'Variable'}],
      ourTake: 'Rome is the destination'
    },
    withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Train to Rome'},
    send: {wheelchairAccess: {}, mobilityConsiderations: []},
    foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Good quality'}
  },

  'venice': {
    portName: 'Venice',
    displayName: 'Venice',
    country: 'Italy',
    overview: {
      description: `Venice - built on 118 islands. No cars, only boats and walking. Magical and unique. Port is right in the city.`,
      weatherSeasonal: '6-14°C | Cool, can be damp. Water may flood.',
      portInfo: {
        dockLocation: 'Giudecca Terminal',
        distanceToTown: 'Walk directly into Venice',
        shuttleInfo: 'Not needed'
      }
    },
    stayLocal: {
      quickWalk: [{title: 'St. Marks Square', content: 'Main plaza.'}],
      longerWalk: [{title: 'Get lost in Venice', content: 'Wander the maze.'}],
      parks: [],
      beach: {title: 'Lido Beach', content: 'Island accessible by boat'},
      scenic: ['St. Marks', 'Rialto Bridge'],
      shopping: ['Rialto area'],
      coffee: [],
      bars: ['Cicchetti bars'],
      rainyDay: ['Museums'],
      tip: 'Get lost wandering. Magic is in backstreets.'
    },
    goFurther: {
      attractions: [{name: 'St. Marks Basilica', description: 'Byzantine masterpiece', cruiseLineOption: 'Guided tours available', independent: 'Walk', allow: '1.5-2 hrs', cost: 'Free to see, 20 euros for Doges Palace'}],
      ourTake: 'Venice itself is the attraction'
    },
    withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: ['Bridges have steps'], easyDay: 'Wander streets'},
    send: {wheelchairAccess: {portArea: 'Accessible', cityCenter: 'VERY difficult with wheels'}, mobilityConsiderations: ['Many bridges with steps']},
    foodAndDrink: {localSpecialties: [], budgetEats: ['Cicchetti'], vegetarianVegan: [], drinkingWater: 'Excellent'}
  },

  // Continue with: naples, malaga, marseille, palma, alicante, gibraltar (23 more ports)
  'naples': {portName: 'Naples', displayName: 'Naples', country: 'Italy', overview: {description: 'Naples - gateway to Pompeii and Amalfi', weatherSeasonal: '10-18°C', portInfo: {dockLocation: 'Naples Port', distanceToTown: 'City center nearby', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Waterfront', content: 'Bay views'}, scenic: [], shopping: [], coffee: [], bars: [], rainyDay: [], tip: 'Real working city'}, goFurther: {attractions: [{name: 'Pompeii', description: 'Ancient Roman ruins', cruiseLineOption: 'Full day excursions', independent: 'Train available', allow: 'Half day minimum', cost: 'Variable'}], ourTake: 'Worth visiting'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Walk waterfront'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'malaga': {portName: 'Málaga', displayName: 'Málaga', country: 'Spain', overview: {description: 'Gateway to Amalfi and Andalusia. Beach town with culture.', weatherSeasonal: '13-20°C | Sunny', portInfo: {dockLocation: 'Puerto de Málaga', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Playa de la Malagueta', content: 'Main beach'}, scenic: [], shopping: [], coffee: [], bars: [], rainyDay: [], tip: 'Beach and culture'}, goFurther: {attractions: [{name: 'Amalfi Coast', description: 'Spectacular coastline', cruiseLineOption: 'Full day tours', independent: 'Difficult', allow: 'Full day', cost: 'Variable'}], ourTake: 'Beautiful'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Beach day'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'marseille': {portName: 'Marseille', displayName: 'Marseille', country: 'France', overview: {description: 'Gateway to Provence. Historic port city.', weatherSeasonal: '8-15°C', portInfo: {dockLocation: 'Port of Marseille', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Calanques', content: 'Nearby beaches'}, scenic: ['Old Port'], shopping: ['City center'], coffee: [], bars: [], rainyDay: [], tip: 'Provence gateway'}, goFurther: {attractions: [{name: 'Provence', description: 'Lavender fields, charm', cruiseLineOption: 'Full day tours', independent: 'Train/car', allow: 'Full day', cost: 'Variable'}], ourTake: 'Beautiful'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Old Port wander'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'palma-de-mallorca': {portName: 'Palma de Mallorca', displayName: 'Palma de Mallorca', country: 'Spain', overview: {description: 'Balearic Islands capital. Beach and culture.', weatherSeasonal: '12-18°C', portInfo: {dockLocation: 'Port de Palma', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'City beaches', content: 'Sandy beaches nearby'}, scenic: ['Cathedral'], shopping: ['City center'], coffee: [], bars: [], rainyDay: [], tip: 'Beach destination'}, goFurther: {attractions: [{name: 'Old Town', description: 'Medieval streets', cruiseLineOption: 'Walking tours', independent: 'Walk', allow: '2 hrs', cost: 'Free'}], ourTake: 'Worth wandering'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Beach time'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'alicante': {portName: 'Alicante', displayName: 'Alicante', country: 'Spain', overview: {description: 'Spanish beach city with castle.', weatherSeasonal: '12-19°C | Sunny', portInfo: {dockLocation: 'Port of Alicante', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Playa del Postiguet', content: 'Main beach'}, scenic: ['Castle Santa Bárbara'], shopping: ['Promenade'], coffee: [], bars: [], rainyDay: [], tip: 'Beach and castle'}, goFurther: {attractions: [{name: 'Castle', description: 'Hilltop fortress', cruiseLineOption: 'Included in some tours', independent: 'Cable car or walk', allow: '1-2 hrs', cost: 'Cable car €4'}], ourTake: 'Good views'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Beach walk'}, send: {wheelchairAccess: {}, mobilityConsiderations: []}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},

  'gibraltar': {portName: 'Gibraltar', displayName: 'Gibraltar', country: 'Gibraltar (British Territory)', overview: {description: 'Unique British territory in Spain. The Rock is iconic.', weatherSeasonal: '12-18°C', portInfo: {dockLocation: 'Port of Gibraltar', distanceToTown: 'Walking distance', shuttleInfo: 'Not needed'}}, stayLocal: {quickWalk: [], longerWalk: [], parks: [], beach: {title: 'Catalan Bay', content: 'Sandy beach'}, scenic: ['The Rock'], shopping: ['Main Street'], coffee: [], bars: [], rainyDay: [], tip: 'Unique British enclave'}, goFurther: {attractions: [{name: 'Rock of Gibraltar', description: 'Famous landmark', cruiseLineOption: 'Cable car tours', independent: 'Cable car', allow: '1-2 hrs', cost: 'Cable car €15'}], ourTake: 'Worth seeing'}, withKids: {toddlers: [], olderKids: [], familyFood: [], warnings: [], easyDay: 'Cable car up Rock'}, send: {wheelchairAccess: {}, mobilityConsiderations: ['Cable car available']}, foodAndDrink: {localSpecialties: [], budgetEats: [], vegetarianVegan: [], drinkingWater: 'Safe'}},
};
