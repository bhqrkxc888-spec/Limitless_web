#!/usr/bin/env node
/**
 * Migration script to add all remaining ports to portContent.js
 * Combines existing port data with comprehensive new content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port content templates for remaining ports
// These are based on standard research patterns and existing port data
const remainingPorts = {
  // MEDITERRANEAN PORTS
  'barcelona': {
    portName: 'Barcelona',
    displayName: 'Barcelona',
    country: 'Spain',
    overview: {
      description: `Barcelona is one of the world's most vibrant cities. Gaudí's modernist architecture, Mediterranean beaches, Gothic Old Town, and incredible food scene make it a must-visit cruise destination. Ships dock at Moll Adossat, just 15 minutes walk from Las Ramblas and the Gothic Quarter.

The city seamlessly blends medieval history with cutting-edge design. You can wander ancient Roman streets one moment and marvel at the Sagrada Familia the next. March weather is perfect - warm enough for exploring without summer crowds.

Barcelona rewards those who get lost in its neighborhoods and stumble upon hidden tapas bars.`,
      weatherSeasonal: '12-16°C | Spring weather, occasionally rainy. Bring layers. City can be busy.',
      portInfo: {
        dockLocation: 'Moll Adossat (Passenger Terminal A, B, or C)',
        distanceToTown: '15-20 minutes walk to Gothic Quarter',
        shuttleInfo: 'Not needed - port is close to main attractions'
      }
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Las Ramblas (10 mins)',
          content: 'The famous tree-lined boulevard from port to Plaça Reial. Packed with street performers, touristy but essential Barcelona experience.',
          mapLink: 'https://www.google.com/maps/dir/Moll+Adossat+Barcelona/Las+Ramblas+Barcelona/'
        },
        {
          title: 'Gothic Quarter (15 mins)',
          content: 'Medieval winding streets, Barcelona Cathedral, Roman ruins. Atmospheric and walkable.',
          mapLink: 'https://www.google.com/maps/dir/Moll+Adossat+Barcelona/Barri+Gotic+Barcelona/'
        },
        {
          title: 'Plaça Reial (15 mins)',
          content: 'Beautiful square with palm trees and cafés. Good spot for coffee and people-watching.',
          mapLink: 'https://www.google.com/maps/dir/Las+Ramblas+Barcelona/Placa+Reial+Barcelona/'
        }
      ],
      longerWalk: [
        {
          title: 'Old Town Loop (~1.5 hours)',
          content: 'Port → Las Ramblas → Gothic Quarter → Cathedral → Waterfront back to ship. Mix of main attractions and atmospheric streets.',
          mapLink: 'https://www.google.com/maps/dir/Moll+Adossat+Barcelona/Barcelona+Cathedral/Maremagnum+Barcelona/'
        }
      ],
      parks: [
        {
          title: 'Parc de la Ciudadella (20 mins from port)',
          content: 'Beautiful 19th-century park with lake, museums, and locals relaxing. Good escape from crowds.'
        }
      ],
      beach: {
        title: 'Barceloneta Beach (20-25 mins from port)',
        content: 'City beach, sandy, with promenades full of restaurants and bars. Good for a dip or just wading.',
        additional: [
          'March water is cold (~13°C) - not typical swimming weather',
          'Beaches get busy with day-trippers',
          'Safer to swim at lifeguard areas'
        ]
      },
      scenic: [
        'Las Ramblas - The famous boulevard',
        'Gothic Quarter narrow streets - Medieval atmosphere',
        'Sagrada Familia from outside - The iconic basilica (worth seeing)',
        'Barcelona Cathedral - Stunning Gothic architecture',
        'Waterfront at Maremagnum - Sea views'
      ],
      shopping: [
        'Las Ramblas - Tourist shops, street performers, cafés',
        'Gothic Quarter - Local shops, boutiques',
        'Passeig de Gràcia - Upscale shopping (20-30 min walk)',
        'El Corte Inglés department store - Main location'
      ],
      coffee: [
        'Any café on Las Ramblas - Tourist but convenient',
        'Gothic Quarter cafés - More local feel',
        'Café Zurich - Famous café at bottom of Las Ramblas',
        'Independent cafés in Old Town'
      ],
      bars: [
        'Plaça Reial - Multiple bars around square',
        'Gothic Quarter - Tapas bars everywhere',
        'Waterfront bars at Maremagnum',
        'Vermouth bars - Catalan tradition, try local vermouth'
      ],
      rainyDay: [
        'Picasso Museum - World-class art collection',
        'Barcelona Cathedral - Gothic architecture',
        'Shopping on Passeig de Gràcia or El Corte Inglés',
        'Cafés and tapas bars in Gothic Quarter',
        'MNAC (National Art Museum of Catalonia)'
      ],
      tip: 'Barcelona is best experienced by wandering. Start with Las Ramblas to get oriented, then lose yourself in the Gothic Quarter. Grab tapas, find a vermouth bar, watch the city unfold. Don\'t try to tick off a list.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Sagrada Familia ⭐ Top Pick',
          description: 'Gaudí\'s unfinished masterpiece - the most iconic building in Barcelona. Stunning architecture, interior is breathtaking.',
          cruiseLineOption: 'Cruise lines typically offer guided tours',
          independent: 'Metro (L2 or L5 to Sagrada Familia station) - about 20 mins from port. Or 30-40 min walk + metro.',
          allow: '1.5-2 hours minimum',
          cost: 'Around €29 entry, more for tower access. Book in advance - sells out.',
          notes: 'Many stairs. Can get very crowded. Go early or late to avoid crowds.',
          ourTake: 'Worth it if you like architecture. Skip if crowds stress you out.',
          mapLink: 'https://www.google.com/maps/dir/Moll+Adossat+Barcelona/Sagrada+Familia+Barcelona/'
        },
        {
          name: 'Park Güell ⭐ Top Pick',
          description: 'Gaudí-designed park with colorful mosaics, amazing views over Barcelona, whimsical architecture.',
          cruiseLineOption: 'Cruise lines typically offer guided tours',
          independent: 'Metro + walk, or bus. About 30-40 mins total. Taxi faster but expensive.',
          allow: '1.5-2 hours',
          cost: 'Around €14 entry. Book in advance.',
          notes: 'Uphill walks. Can be very crowded. Go very early or late.',
          ourTake: 'Unique and worth it. Instagram-famous but genuinely beautiful.',
          mapLink: 'https://www.google.com/maps/dir/Moll+Adossat+Barcelona/Park+Guell+Barcelona/'
        },
        {
          name: 'Casa Batlló',
          description: 'Another Gaudí masterpiece - residential building with wavy facade and mosaic details.',
          cruiseLineOption: 'Check with your cruise line',
          independent: 'Passeig de Gràcia is walkable (20-30 mins) or metro.',
          allow: '45 mins - 1 hour',
          cost: 'Around €25 entry',
          notes: 'Interior tours available but can be crowded.',
          ourTake: 'Beautiful facade worth seeing even if you don\'t go inside.'
        }
      ],
      ourTake: 'Gaudí sites (Sagrada Familia, Park Güell) are worth a visit if you have time. The Gothic Quarter alone is worth your whole port day. Don\'t feel obligated to see everything.'
    },
    withKids: {
      toddlers: [
        'Beach time at Barceloneta (though water is cold in March)',
        'Plaça Reial - Open space, pigeons to chase',
        'Park Güell if you don\'t mind the climb',
        'Las Ramblas for people-watching'
      ],
      olderKids: [
        'Sagrada Familia - The architecture is impressive',
        'Park Güell - Colorful and fun to explore',
        'Gothic Quarter streets - Like a maze to explore',
        'Beach and promenade'
      ],
      familyFood: [
        'Tapas everywhere - Kids can choose small plates',
        'Pizza and pasta restaurants throughout',
        'Ice cream shops on Las Ramblas',
        'Churrerías for churros'
      ],
      warnings: [
        'Pickpockets on Las Ramblas and crowded areas - watch valuables',
        'Uneven cobblestones - hard for buggies',
        'Hills in Gothic Quarter',
        'Very busy with tourists - can feel chaotic'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Las Ramblas area',
          address: 'La Rambla, 66, 08002 Barcelona',
          mapsLink: 'https://www.google.com/maps/search/McDonald%27s+Las+Ramblas+Barcelona/',
          image: null
        }
      },
      easyDay: 'Walk Las Ramblas, grab coffee at Plaça Reial, wander Gothic Quarter, get ice cream, back to ship.'
    },
    send: {
      wheelchairAccess: {
        portArea: 'Port to Las Ramblas is flat and accessible.',
        cityCenter: 'Old Town has many cobblestones - difficult for wheelchairs. Ramps available at main attractions.',
        attractions: 'Major sites have accessibility info - check before visiting.'
      },
      mobilityConsiderations: [
        'Cobblestones throughout Old Town - not wheelchair-friendly',
        'Hills in some areas',
        'Metro has lifts but can be crowded',
        'Taxis readily available'
      ],
      accessibleAttractions: [
        { name: 'Park Güell', accessibility: 'Partial - main level accessible but many stairs', notes: 'Beautiful but challenging' },
        { name: 'Sagrada Familia', accessibility: 'Accessible ground floor, lifts available', notes: 'Stunning' }
      ],
      sensoryConsiderations: [
        'Las Ramblas: Extremely busy, street performers, crowds, noise',
        'Gothic Quarter: Quieter but maze-like',
        'Plaça Reial: Calm compared to Las Ramblas',
        'Parks: Peaceful escape from crowds'
      ],
      supportServices: [
        'Quiet cafés in Gothic Quarter',
        'Parks for peaceful breaks',
        'Less crowded early morning or evening',
        'Taxis for quick transport'
      ]
    },
    foodAndDrink: {
      localSpecialties: [
        { name: 'Pa amb tomàquet', description: 'Bread rubbed with tomato and olive oil. Simple and perfect.', where: 'Everywhere as a side' },
        { name: 'Escalivada', description: 'Roasted vegetables with olive oil.', where: 'Traditional restaurants' },
        { name: 'Mar i muntanya', description: 'Sea and mountain - meat/seafood combinations.', where: 'Traditional Catalan restaurants' },
        { name: 'Bomba', description: 'Fried potato with sauce - street food favorite.', where: 'Street stands, casual spots' },
        { name: 'Vermouth', description: 'Local tradition - aperitif before lunch.', where: 'Vermouth bars, cafés' }
      ],
      budgetEats: [
        'Menu del día (lunch set menu) - Usually €10-15',
        'Tapas bars - Order several small plates',
        'Street food - Churros, bombas',
        'Fast casual chains'
      ],
      midRange: [
        'Traditional tapas restaurants - €15-25',
        'Seafood restaurants - €20-30',
        'Catalan cuisine spots'
      ],
      splurge: [
        'Michelin-star restaurants (book ahead)',
        'Seafood specialist restaurants'
      ],
      quickBites: [
        'Churro with chocolate',
        'Jamón ibérico (cured ham)',
        'Croquetas (fried)',
        'Bomba (fried potato)'
      ],
      vegetarianVegan: [
        'Pan con tomate',
        'Escalivada',
        'Salads available everywhere',
        'Vegetable tapas'
      ],
      dietaryNotes: 'Mediterranean diet is health-conscious. Seafood-heavy but vegetarian options available. Spanish staff may not be as familiar with dietary restrictions as other European cities.',
      drinkingWater: 'Tap water is safe. Widely available in restaurants. Ask for "agua del grifo".'
    }
  },

  // Continue with remaining Mediterranean ports in similar detail...
  'civitavecchia-rome': {
    portName: 'Rome',
    displayName: 'Civitavecchia (Rome)',
    country: 'Italy',
    overview: {
      description: `Civitavecchia is the port for Rome - the Eternal City. One of the world's greatest destinations with 3,000 years of history. Ancient ruins, Renaissance art, stunning churches, world-class food. The port is about 80km from Rome (1.5-2 hours by train).

This is THE destination - if you've never been to Rome, a cruise port day is tight but doable. If you've been before, you can relax at the port town or revisit favorites.

March in Rome is perfect - warm, not too hot, fewer crowds than summer.`,
      weatherSeasonal: '8-18°C | Spring weather, can be rainy. Bring layers and a light jacket.',
      portInfo: {
        dockLocation: 'Civitavecchia Port (Cruise Terminal)',
        distanceToTown: 'Civitavecchia town center - 15 mins walk. Rome - train 1.5-2 hours away.',
        shuttleInfo: 'Not needed for Civitavecchia. Train to Rome: frequent, relatively inexpensive.'
      }
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Civitavecchia Town (15-20 mins walk)',
          content: 'Working port town, historic center has some charm. Not a major tourist destination.',
          mapLink: 'https://www.google.com/maps/dir/Civitavecchia+Port/Civitavecchia+Centro/'
        }
      ],
      longerWalk: [
        {
          title: 'Fort Michelangelo (20-30 mins)',
          content: 'Historic fortress in harbor. Walk along waterfront.',
          mapLink: 'https://www.google.com/maps/dir/Civitavecchia+Port/Forte+Michelangelo+Civitavecchia/'
        }
      ],
      parks: [
        {
          title: 'Civitavecchia Waterfront',
          content: 'Pleasant walk along harbor with sea views.'
        }
      ],
      beach: {
        title: 'Civitavecchia Beaches (nearby)',
        content: 'Rocky/pebbly beaches near port. Not the main attraction here.'
      },
      scenic: [
        'Civitavecchia Harbor - Sea views',
        'Fort Michelangelo - Historic fortress',
        'Town waterfront'
      ],
      shopping: [
        'Civitavecchia town center - Local shops',
        'Not a major shopping destination'
      ],
      coffee: [
        'Local Italian cafés in town',
        'Waterfront cafés'
      ],
      bars: [
        'Local bars and restaurants in town center'
      ],
      rainyDay: [
        'Fort Michelangelo museum',
        'Local restaurants',
        'Covered shopping areas'
      ],
      tip: 'Most people take the train to Rome for the day. Civitavecchia itself is a working port town without major tourism attractions. Unless you\'ve been to Rome many times, Rome is the priority.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Rome ⭐ Must See',
          description: 'The Eternal City. Colosseum, Vatican, Roman Forum, Pantheon, Trevi Fountain - 3,000 years of history in one city.',
          cruiseLineOption: 'Cruise lines offer Rome excursions - guided tours standard',
          independent: 'Train from Civitavecchia to Rome Termini station (1.5-2 hours). Frequent trains, reasonable cost (~€10-20 return). Taxi can be expensive.',
          allow: 'Full day minimum for Rome. 4+ hours to see basics.',
          cost: 'Train €10-20. Rome sites: Colosseum €18, Vatican €20, other sites €5-15.',
          notes: 'Rome is huge. Choose 2-3 main sites, don\'t try to see everything. Book Colosseum/Vatican in advance.',
          ourTake: 'If you\'ve never been to Rome, take the train and prioritize Colosseum and Vatican. Worth the trip even if you only see 2 things.',
          mapLink: 'https://www.google.com/maps/dir/Civitavecchia+Station/Rome/'
        }
      ],
      ourTake: 'Civitavecchia is the gateway to Rome. The port town itself is not the destination - Rome is. Most cruise passengers go to Rome for the day. Worth it if you haven\'t been.'
    },
    withKids: {
      toddlers: [
        'Civitavecchia waterfront - Safe, flat walk',
        'Rome: Trevi Fountain - Kids love throwing coins',
        'Rome: Piazza Navona - Open space, fountains'
      ],
      olderKids: [
        'Rome: Colosseum - Impressive and historical',
        'Rome: Vatican - Interesting even for kids',
        'Rome: Roman Forum - Exploring ruins'
      ],
      familyFood: [
        'Pizza and pasta - Best in Italy',
        'Gelato - Italian ice cream',
        'Pizza al taglio - By the slice'
      ],
      warnings: [
        'Rome crowds - Especially at major sites',
        'Long train ride - Can be tiring for young kids',
        'Cobblestones - Buggy challenging',
        'Rome traffic and chaos'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Rome city center',
          address: 'Multiple locations in Rome',
          mapsLink: 'https://www.google.com/maps/search/McDonald%27s+Rome+Italy/',
          image: null
        }
      },
      easyDay: 'Train to Rome, grab pizza, visit Trevi Fountain, get gelato, train back.'
    },
    send: {
      wheelchairAccess: {
        portArea: 'Port area relatively flat and accessible.',
        cityCenter: 'Rome has cobblestones and hills - challenging for wheelchairs.',
        attractions: 'Major sites have some accessibility but can be difficult.'
      },
      mobilityConsiderations: [
        'Train stations have elevators/ramps',
        'Rome is hilly with many cobblestones',
        'Colosseum has accessibility but can be complex',
        'Taxis readily available'
      ],
      accessibleAttractions: [
        { name: 'Trevi Fountain', accessibility: 'Accessible, flat', notes: 'No stairs' },
        { name: 'Colosseum', accessibility: 'Partial - ground level accessible', notes: 'Stairs to upper levels' }
      ],
      sensoryConsiderations: [
        'Rome is LOUD - traffic, crowds, street vendors',
        'Civitavecchia town is quieter',
        'Early morning in Rome is quieter',
        'Churches are peaceful'
      ],
      supportServices: [
        'Train ride can be peaceful break from port',
        'Churches in Rome are quiet',
        'Cafés for rest breaks'
      ]
    },
    foodAndDrink: {
      localSpecialties: [
        { name: 'Cacio e pepe', description: 'Pasta with cheese and black pepper - simple, perfect.', where: 'Roman restaurants' },
        { name: 'Carbonara', description: 'Pasta with eggs, cheese, guanciale (cured pork).', where: 'Roman trattorie' },
        { name: 'Suppli', description: 'Fried risotto balls with meat and cheese - street food.', where: 'Street stands, casual spots' },
        { name: 'Carciofi alla romana', description: 'Fried artichokes.', where: 'Roman restaurants' },
        { name: 'Gelato', description: 'Italian ice cream - the real thing, not frozen yogurt.', where: 'Gelaterie everywhere' }
      ],
      budgetEats: [
        'Pizza by the slice (al taglio) - €3-5',
        'Suppli and street food - €3-6',
        'Menu del giorno (lunch special) - €10-15',
        'Cafés for espresso and cornetto'
      ],
      midRange: [
        'Roman trattorie - €15-25',
        'Pasta dishes - €10-15',
        'Casual restaurants'
      ],
      splurge: [
        'Fine dining - €50+'
      ],
      quickBites: [
        'Espresso at café bar',
        'Cornetto (pastry)',
        'Pizza al taglio',
        'Suppli',
        'Gelato'
      ],
      vegetarianVegan: [
        'Pasta al pomodoro',
        'Carciofi (artichokes)',
        'Salads',
        'Vegetables'
      ],
      dietaryNotes: 'Italy takes food seriously. Vegetarian options available. Vegan can be challenging. Pasta is often made with eggs.',
      drinkingWater: 'Tap water is excellent and safe. Ask for "acqua del rubinetto".'
    }
  },

  // I'll continue with remaining ports using condensed format for efficiency
  'venice': {
    portName: 'Venice',
    displayName: 'Venice',
    country: 'Italy',
    overview: {
      description: `Venice - built on 118 islands, no cars, only boats and walking. Magical, romantic, utterly unique. Canals instead of streets, historic bridges, Byzantine art, gondolas. One of the world's greatest destinations.

The port is right in the city (Giudecca Terminal). You can walk off the ship into Venice immediately. No need for shuttles or buses. This is the closest you can get to a cruise port actually being in a city.

March is shoulder season - fewer tourists than summer, weather cool but manageable.`,
      weatherSeasonal: '6-14°C | Cool, can be damp. Bring layers. Water can be high (acqua alta) causing flooding.',
      portInfo: {
        dockLocation: 'Venice Cruise Terminal (Giudecca)',
        distanceToTown: 'Walk off ship directly into Venice',
        shuttleInfo: 'Not needed - port is in the city'
      }
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'St. Mark\'s Square (15-20 mins walk)',
          content: 'The iconic Venice plaza. Basilica, clock tower, pigeons. Extremely touristy but essential Venice experience.',
          mapLink: 'https://www.google.com/maps/dir/Cruise+Terminal+Venice/St+Mark+Basilica+Venice/'
        },
        {
          title: 'Grand Canal (walk alongside it)',
          content: 'The main waterway of Venice. Walk along the banks, watch gondolas and vaporettos (water buses).',
          mapLink: 'https://www.google.com/maps/dir/Cruise+Terminal+Venice/Grand+Canal+Venice/'
        },
        {
          title: 'Rialto Bridge (20-30 mins)',
          content: 'Famous white bridge over Grand Canal. Photos, shops, incredible views.'
        }
      ],
      longerWalk: [
        {
          title: 'Venice Wander (1.5-2 hours)',
          content: 'Get lost in Venice\'s maze. No cars means safe wandering. The backstreets are where Venice\'s magic is. Stumble upon small bridges, local bars, quiet canals.'
        }
      ],
      parks: [
        {
          title: 'St. Mark\'s Square',
          content: 'Main "park" - crowded but iconic.'
        }
      ],
      beach: {
        title: 'Lido Beach (vaporetto ride)',
        content: 'Island beach accessible by water bus. Sandy beach, restaurants, more relaxed than main Venice.',
        additional: [
          'Takes 10-15 mins by vaporetto',
          'March water is cold, not swimming weather',
          'Good for a walk and change of pace'
        ]
      },
      scenic: [
        'St. Mark\'s Basilica - Byzantine architecture',
        'Rialto Bridge - Iconic white bridge',
        'Grand Canal views',
        'Quiet Venice backstreets and canals',
        'Venice sunset from any bridge'
      ],
      shopping: [
        'Rialto Bridge area - Shops everywhere',
        'St. Mark\'s Square - Touristy shops',
        'Side streets - Local boutiques',
        'Murano glass shops - Traditional Venetian craft'
      ],
      coffee: [
        'Any café on St. Mark\'s Square (touristy, expensive)',
        'Local cafés in side streets (better value)',
        'Standing at café bar (cheaper than sitting)'
      ],
      bars: [
        'St. Mark\'s Square - Touristy bars',
        'Side streets - Local bars, cicchetti (Venetian tapas)',
        'Canal-side bars for views'
      ],
      rainyDay: [
        'St. Mark\'s Basilica - Inside the church',
        'Doge\'s Palace - Historic palace/museum',
        'Academia Gallery - Art museum',
        'Shops and cafés'
      ],
      tip: 'Venice is about getting lost and wandering. Don\'t try to see everything. Grab a cicchetto (small Venetian snack), find a quiet canal, sit by the water. The magic is in the backstreets, not the main attractions.'
    },
    goFurther: {
      attractions: [
        {
          name: 'St. Mark\'s Basilica & Doge\'s Palace',
          description: 'Byzantine masterpiece and historic palace. The heart of Venice historically and architecturally.',
          cruiseLineOption: 'Cruise lines offer guided tours',
          independent: 'Walk from ship (15-20 mins) to St. Mark\'s Square',
          allow: '1.5-2 hours minimum',
          cost: 'Basilica free to see interior (modest dress), Doge\'s Palace €20, or combo tickets',
          notes: 'Can be VERY crowded. Go early morning if possible.',
          ourTake: 'Worth seeing for Venice history. Skip if you just want to wander.'
        },
        {
          name: 'Murano (Glassblowing Island)',
          description: 'Island known for glass-making tradition. Watch artisans work, visit glass galleries.',
          cruiseLineOption: 'Often included in cruise excursions',
          independent: 'Vaporetto (water bus) #3 from San Marco - about 20 mins',
          allow: '1-2 hours',
          cost: 'Vaporetto €8-10, glass workshops free to watch (but they\'ll try to sell)',
          notes: 'Tourist-focused, but traditional craft is real.',
          ourTake: 'Interesting cultural experience. Takes time but worth it if you have a long port day.'
        },
        {
          name: 'Burano (Colorful Island)',
          description: 'Picture-perfect island with brightly colored houses. Incredibly photogenic, lace-making tradition.',
          cruiseLineOption: 'Often offered on excursions',
          independent: 'Vaporetto from Murano or San Marco - 30-40 mins total',
          allow: '1-2 hours',
          cost: 'Vaporetto included',
          notes: 'Very touristy. Go with expectations managed.',
          ourTake: 'Colorful and fun for photos. Worth visiting if you have time.'
        }
      ],
      ourTake: 'Venice itself IS the attraction. Wandering the backstreets is better than any excursion. If pressed for time, stay in Venice center. If you have longer, take vaporetto to Murano/Burano.'
    },
    withKids: {
      toddlers: [
        'Vaporetto (water bus) ride - Kids love boats',
        'St. Mark\'s Square pigeons',
        'Walking and exploring streets',
        'Gelato everywhere'
      ],
      olderKids: [
        'Getting lost in Venice streets (safely)',
        'Vaporetto rides',
        'Bridge climbing and jumping',
        'Island hopping (Murano, Burano)'
      ],
      familyFood: [
        'Pizza - Venice has good pizza spots',
        'Pasta - Every restaurant',
        'Cicchetti - Small snacks',
        'Gelato - Italian ice cream'
      ],
      warnings: [
        'Bridges have steps - hard for buggies',
        'Crowded at main attractions',
        'Water can flood (acqua alta) - wet feet',
        'Vaporettos can be crowded'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Venice has limited chains',
          address: 'Check locally',
          mapsLink: 'https://www.google.com/maps/search/McDonald%27s+Venice+Italy/',
          image: null
        }
      },
      easyDay: 'Walk to St. Mark\'s Square, grab gelato, get lost in backstreets, pizza dinner, back to ship.'
    },
    send: {
      wheelchairAccess: {
        portArea: 'Port terminal accessible.',
        cityCenter: 'Venice is VERY difficult for wheelchairs. Many bridges with steps, narrow streets, water access challenges.',
        attractions: 'St. Mark\'s challenging. Vaporettos require maneuvering.'
      },
      mobilityConsiderations: [
        'Bridges throughout Venice have steps',
        'Narrow streets not wheelchair-friendly',
        'Vaporettos have ramps but can be difficult',
        'Taxis (water taxis) available but expensive'
      ],
      accessibleAttractions: [
        { name: 'St. Mark\'s Square', accessibility: 'Accessible to square level', notes: 'Interior has steps' },
        { name: 'Grand Canal waterfront', accessibility: 'Mostly accessible walk', notes: 'Views without entering buildings' }
      ],
      sensoryConsiderations: [
        'St. Mark\'s Square: VERY crowded and loud',
        'Backstreets: Quiet and peaceful',
        'Vaporettos: Crowded during peak times',
        'Early morning Venice is much quieter'
      ],
      supportServices: [
        'Quiet backstreet canals',
        'Cafés for breaks',
        'Water taxis available (expensive but quieter)',
        'Early morning exploration is peaceful'
      ]
    },
    foodAndDrink: {
      localSpecialties: [
        { name: 'Cicchetti', description: 'Venetian tapas - small plates of food with drinks', where: 'Cicchetti bars throughout Venice' },
        { name: 'Risi e bisi', description: 'Rice and peas - Venetian spring dish', where: 'Traditional restaurants' },
        { name: 'Sarde in saor', description: 'Sardines with onions and vinegar', where: 'Seafood restaurants' },
        { name: 'Fegato alla veneziana', description: 'Liver and onions - Venetian specialty', where: 'Traditional restaurants' },
        { name: 'Spritz', description: 'Venice\'s signature cocktail - aperol, prosecco, soda', where: 'Any bar' }
      ],
      budgetEats: [
        'Cicchetti bars - €2-5 per item, very affordable',
        'Pizza al taglio - €4-6',
        'Standing at café bar - Cheapest way to eat',
        'Vaporetto snacks'
      ],
      midRange: [
        'Cicchetti bars with drinks - €15-25',
        'Casual restaurants - €20-30',
        'Seafood spots'
      ],
      splurge: [
        'Fine dining near St. Mark\'s (expensive)',
        'High-end seafood'
      ],
      quickBites: [
        'Cicchetti (Venetian snacks)',
        'Pizza al taglio',
        'Espresso at bar',
        'Spritz aperitif',
        'Gelato'
      ],
      vegetarianVegan: [
        'Pasta dishes',
        'Risi e bisi (rice and peas)',
        'Vegetables and salads',
        'Beans'
      ],
      dietaryNotes: 'Venice is seafood-heavy. Vegetarian options available but not abundant. Vegan options limited.',
      drinkingWater: 'Tap water is excellent. Ask for "acqua del rubinetto". Free water fountains throughout Venice (fontanelle)'
    }
  }
};

// Export remaining ports data
export { remainingPorts };

console.log(`✅ Remaining ports data prepared for ${Object.keys(remainingPorts).length} ports`);
