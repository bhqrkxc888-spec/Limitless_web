/**
 * G606 Port Content
 * Actual content for each port day
 * Structure matches section templates in PortDayContent.jsx
 */

export const g606PortContent = {
  'la-coruna': {
    portName: 'La Coruña',
    displayName: 'La Coruña',
    country: 'Spain',
    overview: {
      description: `La Coruña (A Coruña in Galician) is one of the easiest cruise ports in Spain. The ship docks at Muelle de Trasatlánticos, literally a 5-minute walk from the city centre. No shuttles needed, no taxis required - just walk off and you're there.

The city sits on a peninsula with the Atlantic on three sides. It's known as the "City of Glass" thanks to the distinctive galería buildings - white wooden-framed glass balconies that line the waterfront. You'll spot them from the ship before you even disembark.

La Coruña is a real working city, not a tourist resort. It has an authentic, relaxed feel without the crowds you'd find in Barcelona or Lisbon. Perfect for a wander without feeling like you're in a tourist trap.`,
      weatherSeasonal: '14-16°C | Chance of rain (this is Galicia!) Pack layers and a waterproof jacket. March can be unpredictable.',
      portInfo: {
        dockLocation: 'Muelle de Trasatlánticos (Transatlantic Dock)',
        distanceToTown: '5 minutes walk',
        shuttleInfo: 'Not needed - it\'s right there'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'From the ship, you\'re immediately on Avenida de la Marina',
          content: 'The famous waterfront with those iconic glass-fronted galería buildings. Fishermen used to live here with boats tied up in the arcades below. Worth a few photos before you go anywhere.'
        },
        {
          title: 'Plaza de María Pita (10 mins)',
          content: 'The main square and heart of the city. Named after a local heroine who defended the city against English attack in 1589. The impressive town hall building dominates one side. Surrounded by cafés - good spot for your first coffee.'
        },
        {
          title: 'Los Cantones Village (2 mins)',
          content: 'Shopping centre right by the port. Useful for toilets, coffee, or if you need anything. Free WiFi.'
        },
        {
          title: 'Rúa Real (10 mins)',
          content: 'Main pedestrian shopping street. Turn left from the port, cross Avenida de la Marina, and you\'re on it. Standard Spanish high street - Zara, Mango, etc.'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Old Town Loop (~1 hour)',
          content: 'Ship → Marina → Plaza María Pita → Wander Old Town streets → San Antón Castle (outside view, 15 min walk) → Waterfront back to ship. The Old Town is compact with narrow winding streets, historic churches, and small plazas. Look for: Colegiata de Santa María del Campo (12th century Romanesque church), Iglesia de San Jorge (Baroque church near the main square), Various tapas bars tucked into side streets.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+Trasatlanticos,+A+Coruna/Plaza+de+Maria+Pita,+A+Coruna/Castillo+de+San+Anton,+A+Coruna/Muelle+de+Trasatlanticos,+A+Coruna/'
        },
        {
          title: 'Option 2: Beach Walk (~45 mins one way)',
          content: 'Ship → Promenade west → Playa de Riazor (30 mins). Sandy city beach with cafés behind. Walk back or taxi return. March = probably not swimming weather, but nice to see.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+Trasatlanticos,+A+Coruna/Praia+de+Riazor,+A+Coruna/'
        },
        {
          title: 'Option 3: Paseo Marítimo',
          content: 'The famous 13km seafront promenade. You won\'t do all of it, but even 30 minutes along is lovely - flat, scenic, sea views. Good for walking, running, or cycling (hire bikes available).'
        }
      ],
      parks: [
        {
          title: 'Jardines de Méndez Núñez (10 mins from port)',
          content: 'Peaceful gardens right in the city centre. Good for sitting, shade, and a break from walking. 750 metres from the cruise terminal.'
        },
        {
          title: 'Jardín de San Carlos (10 mins)',
          content: 'Small romantic garden overlooking the harbour. Contains the tomb of Sir John Moore (British general). Peaceful, benches, nice views.'
        },
        {
          title: 'Parque de Santa Margarita (20 mins walk, uphill, or quick taxi)',
          content: 'Larger park with playground, duck pond, and café. Good if you want green space away from the centre.'
        }
      ],
      beach: {
        title: 'Playa de Riazor (30 mins walk or 10 min taxi)',
        content: 'City beach, sandy, clean. Home ground of Deportivo La Coruña football club visible at one end. Cafés and restaurants behind the beach.',
        additional: [
          'Playa del Orzán (next to Riazor) - Slightly quieter, good for surfing. Same promenade connects both.',
          'Praia de Santo Amaro (further along coast) - Popular swimming spot with an outdoor pool overlooking the beach. Kiosk for drinks.',
          '💡 March reality: Water will be cold. Nice for a walk along the sand, probably not for swimming.'
        ]
      },
      scenic: [
        'Avenida de la Marina - The galería buildings from the waterfront',
        'Plaza María Pita - The town hall facade',
        'Jardín de San Carlos - Harbour views',
        'Octopus Sculpture - Along the coastal path towards Tower of Hercules (iconic La Coruña symbol)',
        'Tower of Hercules - If you make it there (see Go Further section)'
      ],
      shopping: [
        'Rúa Real / Calle San Andrés - Main pedestrian shopping streets. 10 min from port. Spanish high street brands - nothing you can\'t get at home, but pleasant for a wander.',
        'Mercado de San Agustín - Covered food market. Local produce, fish, fruit. Morning is best. Good for browsing even if you don\'t buy.',
        'Los Cantones Village - Shopping centre right by port. Convenient for basics.'
      ],
      coffee: [
        'Plaza María Pita - Several cafés with outdoor seating around the square. Any will do.',
        'Café Derby - Traditional café, been there forever. Local institution.',
        'Sucre (Calle Franja 54) - Contemporary patisserie, excellent coffee, gorgeous cakes and pastries.',
        'El Timón - Charming café near the port, known for coffee and pastries.'
      ],
      bars: [
        'Calle de la Franja / Calle Olmos - The tapas street. Wander until you find somewhere that looks good.',
        'O\'Connor\'s Irish Pub - Yes, there\'s one. Near the marina. If you need a Guinness.',
        'Any bar on Plaza María Pita - Good for people-watching with a beer.',
        'Vermutería Martínez - Small, charming, great for vermouth before lunch (vermouth is trendy in Spain).'
      ],
      rainyDay: [
        'Aquarium Finisterrae (20 min walk or taxi towards Tower of Hercules) - Good aquarium, seals swimming outside. Has a lift for wheelchair/buggy access. Couple of hours\' entertainment.',
        'Domus - Casa del Hombre (15 min walk) - Interactive science museum. "House of Mankind" - covers human body and biology. Good for a couple of hours. Mostly aimed at families but interesting for adults too.',
        'Museo de Bellas Artes (10 mins from port) - Fine arts museum. Free entry. Over 5,000 pieces from 15th century to present day - Rubens, Picasso, Tintoretto. Impressive for a free museum.',
        'Mercado de San Agustín - Covered, wander and snack while staying dry.',
        'Los Cantones Village - Shopping centre right by port. Coffee, shops, toilets.',
        'Find a tapas bar - Duck in and wait it out with local wine and octopus.'
      ],
      tip: 'La Coruña rewards a slow wander. Don\'t try to tick off a list - just stroll the waterfront, find a tapas bar, sit in the main square with a coffee. It\'s a proper Spanish city, not a cruise-ship theme park. Enjoy the authenticity.\n\nIf the weather is good: Walk to Plaza María Pita, grab coffee, wander the Old Town, walk along the promenade towards the beaches, find somewhere for tapas.\n\nIf the weather is bad: Museums, covered market, tapas bars. The rain won\'t last all day.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Tower of Hercules ⭐ Top Pick',
          description: 'UNESCO World Heritage Site. The oldest functioning lighthouse in the world - Roman, nearly 2,000 years old. Still working. The views from the headland are spectacular.',
          poOption: 'P&O may offer excursion - check onboard',
          independent: '40 min walk along the scenic coastal promenade, 10 min taxi from port, or Bus #3 or #5 from near the terminal',
          allow: 'Plan 1.5-2 hours for the visit including the walk around',
          cost: 'Check current prices',
          notes: '234 steps to the top (no lift). Worth it for the views. Surrounding sculpture park is free to wander and interesting.',
          ourTake: 'If you\'ve got the time and energy, absolutely worth it. Walk there along the promenade (coastal path), taxi back. Or vice versa. You\'ll see the Octopus sculpture and coastal scenery along the way.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+Trasatlanticos,+A+Coruna/Torre+de+Hercules,+A+Coruna/'
        },
        {
          name: 'Santiago de Compostela',
          description: 'Famous pilgrimage city. Final destination of the Camino de Santiago. Stunning Romanesque cathedral (UNESCO). About 1 hour by road or 30 mins by train.',
          poOption: 'P&O will likely offer full-day excursion - check onboard',
          independent: 'Train from La Coruña station (about 30 mins) - station is 2.5km from cruise terminal. Taxi possible but expensive for the distance.',
          allow: 'Full day commitment',
          cost: 'Check current prices',
          notes: 'Beautiful historic centre, incredible cathedral, lots of pilgrims. But it\'s a big commitment for a port day - you\'ll miss La Coruña itself entirely.',
          ourTake: 'Lovely if you\'ve never been, but only if you have a long port day. If you\'ve got 6-8 hours in port, it\'s doable with careful timing. Less than that, stay in La Coruña and explore locally.'
        },
        {
          name: 'Monte de San Pedro',
          description: 'Panoramic viewpoint over La Coruña and coastline. Former coastal military battery, now a park. Has remnants of old military guns and a bubble-shaped panoramic elevator (Ascensor Panorámico).',
          poOption: 'Check P&O app for current options',
          independent: 'About 4km from cruise port. Taxi is most practical. Local buses connect but slower.',
          allow: 'Allow 1-1.5 hours to enjoy the views and walk around',
          cost: 'Check current prices',
          notes: '',
          ourTake: 'Nice views but not essential. Tower of Hercules is more impressive and easier to combine with other things.'
        }
      ],
      ourTake: 'Unless you\'ve done La Coruña before, the city itself has plenty. Tower of Hercules is the only "go further" we\'d prioritise for first-timers. Save Santiago for another trip unless you\'ve got a long day and it\'s on your bucket list.\n\nFor P&O excursions: Check the P&O app or Reception onboard for current options and availability.'
    },
    withKids: {
      toddlers: [
        'Parque de Santa Margarita (20 min walk uphill or quick taxi) - Playground, ducks, space to run around. Good for burning off energy.',
        'Playa de Riazor (30 min walk or taxi) - Sandy beach - even in March, good for sandcastles and running around. Ice cream available.',
        'Plaza María Pita - Open space, pigeons to chase, cafés for parents to sit while kids run around.',
        'Aquarium Finisterrae - Seals, fish, interactive bits. Lift access. Couple of hours entertainment.'
      ],
      olderKids: [
        'Aquarium Finisterrae - Good for a couple of hours',
        'Domus - Casa del Hombre - Interactive science museum. Human body focus. Interesting enough for teens.',
        'Tower of Hercules - The climb (234 steps) could be an adventure. Sculpture park around it is fun to explore.',
        'Beach + ice cream - Always works',
        'Bike hire - Cycling along the Paseo Marítimo promenade. Flat, scenic, dedicated cycle lanes. Good for active families.'
      ],
      familyFood: [
        '100 Montaditos - Cheap small sandwiches, choose your own. Kids love the choice and independence.',
        'Any plaza café - Pizza, pasta usually available',
        'Ice cream - Lots of heladerías in town centre',
        'Churros - Several churrerías in the old town. Spanish kids\' favourite.'
      ],
      warnings: [
        'Cobblestones in Old Town - buggy unfriendly in places',
        'Hills - La Coruña has some steep bits, especially towards parks',
        'Spanish lunch hours - Restaurants may close 4-8pm. Plan around this or eat early.',
        'Weather - March can be rainy. Pack layers and waterproofs for kids too.'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Calle Real 40, about 10 min walk from port. Near the main shopping street.',
          mapsLink: 'https://maps.google.com/?q=McDonald%27s+A+Coruna+Calle+Real'
        }
      },
      easyDay: 'Walk to main square, grab a coffee/juice, taxi to Aquarium (or Santa Margarita park for playground), taxi to beach for an hour, ice cream, then walk back to ship.'
    },
    send: {
      mobility: [
        'Port to town: Flat, paved, easy. The 5-minute walk from ship to city centre is accessible.',
        'Promenade (Paseo Marítimo): Flat, paved, accessible. Good for wheelchairs and scooters. 13km total but any section is pleasant.',
        'Old Town: Mostly flat but some cobblestones. Main streets fine, narrow side streets can be tricky.',
        'Plaza María Pita: Accessible, flat, paved.',
        'Beaches: Promenade behind beaches is accessible. Sand access may be challenging. Check locally for accessible beach facilities.',
        'Tower of Hercules: The area around is accessible but the tower itself has 234 steps and no lift. Sculpture park around it is mostly accessible.',
        'Aquarium Finisterrae: Has lift to all levels. Wheelchair accessible.',
        'Domus museum: Accessible.',
        'Taxis: Available at port. Can accommodate wheelchairs - ask.'
      ],
      quietSpots: [
        'Jardín de San Carlos - Small, peaceful garden. Benches, shade, harbour views. Away from crowds.',
        'Jardines de Méndez Núñez - Central but peaceful. Good for a quiet break.',
        'Azcárraga Square - Small leafy square in the Old Town, quieter feel than María Pita, benches and partial shade.',
        'Stretches of seafront promenade - Away from the main beach accesses, much quieter.',
        'Best timing: Early morning soon after docking, or later afternoon once ship excursions have returned. Weekends and local events increase footfall around María Pita.'
      ],
      sensory: [
        'Busy areas to be aware of: Plaza María Pita at lunch time, Rúa Real (main shopping street) - can be crowded, Market mid-morning (10am-12pm) - busy, noisy, fish smells',
        'Quieter alternatives: Gardens and parks, Promenade away from centre, Museums mid-afternoon, Old Town backstreets (quieter than main plazas)',
        'Noise levels: Generally calm city. Not overwhelming like Barcelona or Madrid.'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'A Pulpeira de Melide',
          location: 'Plaza de España',
          description: 'Four generations making Galician octopus. Arguably the best in the city. Octopus cooked in copper pots, served with olive oil, sea salt, paprika and potatoes. Affordable. Gets busy - arrive early.'
        },
        {
          name: 'La Bombilla',
          location: 'Rua Torreiro',
          description: 'Classic standing tapas bar. Simple but perfect - tortilla de patata, chorizo, croquetas, calamares. Local atmosphere, very affordable. You\'ll probably stand. Vibrant, slightly intense - embrace it.'
        },
        {
          name: 'O Viñedo de Tito',
          location: 'wine region area',
          description: 'Traditional Galician tavern since 1977. Roasted ham, seafood (octopus, scallops, mussels, grilled sardines). Charming setting with wine barrels. Terrace in good weather.'
        },
        {
          name: 'A Taberna de Cunqueiro',
          location: 'Calle de la Estrella',
          description: 'Lively cellar bar. Pulpo con cachelos (octopus with potatoes), mussels, meatballs. Book ahead or arrive early - it fills up.'
        },
        {
          name: 'El Tequeño',
          location: 'Plaza María Pita',
          description: 'On the main square. Great for people-watching. Cheap tapas (€1.50 each). Try their namesake tequeños (Venezuelan fried cheese sticks) alongside Galician classics.'
        }
      ],
      cafes: [
        {
          name: 'Sucre',
          location: 'Calle Franja 54',
          description: 'Gorgeous patisserie, excellent coffee, cakes, empanadas'
        },
        {
          name: 'Café Derby',
          description: 'Traditional, local institution'
        },
        {
          name: 'Migas Dulces Bocados',
          description: 'Sweet treats, friendly service'
        },
        {
          name: 'Café de Macondo',
          description: 'Literary-themed, cosy atmosphere, good for a quiet coffee'
        }
      ],
      bars: [
        {
          name: 'Charlatán Coruña',
          location: 'Calle Galera',
          description: 'Wine bar, 200+ wines, grilled meat, pizzas'
        },
        {
          name: 'Vinoteca Jaleo',
          description: 'Laid-back tapas bar, run by former Michelin-starred restaurant staff'
        },
        {
          name: 'Any bar on Calle de la Franja',
          description: 'The tapas street. Wander until you find one you like.'
        }
      ],
      localSpeciality: 'Pulpo a la Gallega - Galician-style octopus. Boiled, served on wooden plate with paprika, olive oil, salt. THE thing to try here.\n\nPercebes - Goose barnacles. Weird looking, expensive, delicious. Caught from dangerous cliffs. A Galician delicacy.\n\nPimientos de Padrón - Small green peppers, fried, salted. Most are mild, occasional one is spicy. Russian roulette tapas.\n\nEmpanada Gallega - Galician pie, usually filled with tuna, meat, or vegetables.\n\nAlbariño wine - Local white wine from Rías Baixas region. Perfect with seafood.\n\nEstrella Galicia - The local beer. Ask for "una caña" (small draft).',
      tips: [
        'Lunch timing: Spanish lunch is 2-4pm. Many restaurants close 4-8pm then reopen for dinner. Plan accordingly.',
        'Tapas culture: Standing at the bar is normal and often cheaper than sitting at a table.',
        'Portion sizes: "Ración" = full portion (to share). "Media ración" = half. "Tapa" = small plate.',
        'Tipping: Not expected, but round up if happy. 5-10% for good service is generous.',
        'Cards: Widely accepted but small tapas bars may prefer cash.',
        'Water: Tap water is safe. Ask for "agua del grifo" if you want free tap water.'
      ]
    }
  },
  'tenerife': {
    portName: 'Tenerife',
    displayName: 'Tenerife (Santa Cruz)',
    country: 'Spain',
    overview: {
      description: `Santa Cruz de Tenerife is the capital of Tenerife and co-capital of the Canary Islands. It's a proper working city with a relaxed atmosphere, not a tourist resort. The locals are friendly, English is widely spoken, and it's very safe.

The city is flat, easy to navigate, and surprisingly walkable. Most attractions are within 20 minutes of the port on foot. But the real draw of Tenerife is what lies beyond the city - Mount Teide, the beaches, and the stunning volcanic landscapes.

March means you're here for "winter sun" - expect pleasant temperatures perfect for exploring without the summer heat.`,
      weatherSeasonal: '20-22°C | Mostly sunny, occasional clouds. Much warmer than mainland Spain. Light layers, sunscreen, sunglasses.',
      portInfo: {
        dockLocation: 'Either Muelle Sur (long breakwater, 15-25 min walk) or Muelle Norte (newer terminal, 5 min walk)',
        distanceToTown: '5-25 mins depending on berth',
        shuttleInfo: 'Free shuttle usually runs from Muelle Sur to Plaza de España'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Plaza de España (5-10 mins from shuttle drop-off)',
          content: 'The largest square in the Canary Islands. Modern design with a huge reflective pool and fountain. Underground, you can see the remains of Castillo de San Cristóbal (free). Good starting point for exploring.'
        },
        {
          title: 'Plaza de la Candelaria (2 mins from Plaza de España)',
          content: 'Pretty square with the Triunfo de la Candelaria monument. Surrounded by cafés - good for people-watching.'
        },
        {
          title: 'Calle del Castillo (starts at Plaza de la Candelaria)',
          content: 'Main pedestrian shopping street. All the usual brands plus local shops. Tax-free status means electronics and perfume are cheaper here.'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Waterfront to Auditorio (~30 mins one way)',
          content: 'Plaza de España → Waterfront promenade → Parque Marítimo → Auditorio de Tenerife. The Auditorio is the iconic wave-shaped concert hall (think Sydney Opera House vibes). Designed by Santiago Calatrava. Even if you don\'t go inside, it\'s worth the walk for photos. Look down at the sea wall - music legends\' faces are painted on the boulders.',
          mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/Auditorio+de+Tenerife/'
        },
        {
          title: 'Option 2: City Highlights Loop (~1.5 hours)',
          content: 'Plaza de España → Plaza de la Candelaria → Mercado de Nuestra Señora de África → TEA (art museum, exterior) → Back via Calle del Castillo',
          mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/Mercado+de+Nuestra+Senora+de+Africa,+Santa+Cruz+de+Tenerife/TEA+Tenerife+Espacio+de+las+Artes,+Santa+Cruz+de+Tenerife/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/'
        }
      ],
      parks: [
        {
          title: 'Palmetum (20 mins walk from Plaza de España, near Auditorio)',
          content: 'Botanical garden built on a former rubbish dump - now home to the largest collection of palm trees in Europe. Over 3,000 plant species. Great views over the city from the viewpoint. Peaceful escape.'
        },
        {
          title: 'Parque García Sanabria (15 mins walk northwest of centre)',
          content: 'Large urban park with sculptures, fountains, and shady paths. Free to enter. Nice for a wander.'
        },
        {
          title: 'Plaza del Príncipe de Asturias (10 mins from port)',
          content: 'Small leafy square with benches. Good for a quiet break between sightseeing.'
        }
      ],
      beach: {
        title: 'Playa de Las Teresitas (20-25 mins by bus)',
        content: 'The famous golden sand beach - sand imported from the Sahara! Protected by breakwater so calm water. Palm-fringed promenade with cafés. This is the one to visit. Getting there: Bus #910 from Plaza de España or Intercambiador (main bus station). Runs regularly. Tell driver "Las Teresitas." March reality: Water around 19°C - swimmable for the brave. Perfect for a beach walk and lunch at one of the beachfront restaurants.',
        additional: [],
        mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/Playa+de+Las+Teresitas/'
      },
      scenic: [
        'Auditorio de Tenerife - The iconic wave-shaped building',
        'Plaza de España - The "Santa Cruz" letters and reflective pool',
        'Palmetum viewpoint - City and harbour views',
        'Mercado de Nuestra Señora de África - Colourful colonial-style market building',
        'Las Teresitas - Golden beach with mountain backdrop'
      ],
      shopping: [
        'Calle del Castillo - Main pedestrian shopping street. Spanish and international brands.',
        'El Corte Inglés - Large department store. Good for everything. About 15 mins walk from port.',
        'Mercado de Nuestra Señora de África (15 mins walk) - The main market in a beautiful salmon-pink colonial building. Fresh produce, flowers, local cheese, fruit, handmade jewellery from lava rock. Morning is best. Worth visiting even just to look.',
        'Tax-free note: Canary Islands have lower taxes than mainland Spain. Electronics, perfume, tobacco, and alcohol are noticeably cheaper.'
      ],
      coffee: [
        'Palmelita (Calle del Castillo) - Sweet café since 1968. Cakes, ice cream, coffee. Vintage tile décor. Local institution.',
        'La Huella Café-Bistro (Calle Pérez Galdós) - Smart café, good for coffee and cake or a light lunch.',
        'Strasse Park (near Parque García Sanabria) - Stylish spot for brunch, cocktails, coffee. Tropical garden vibes.',
        'Any café on Plaza de la Candelaria - Good for people-watching.'
      ],
      bars: [
        'Taberna Ramón (Calle Clavel) - Local favourite - packed with locals, which is always a good sign. Serrano ham, cured meats, tapas. Lively atmosphere. Arrive early or wait.',
        'La Bodeguita Canaria (Calle Imeldo Serís) - Authentic Canarian spot. Traditional dishes, best mojo sauce in town according to some.',
        'Bars around Plaza de España and Calle del Castillo - Plenty of options for a cold beer.'
      ],
      rainyDay: [
        'TEA - Tenerife Espacio de las Artes (10 mins walk) - Contemporary art museum. Interesting building, rotating exhibitions.',
        'Mercado de Nuestra Señora de África - Covered market. Wander, snack, stay dry.',
        'El Corte Inglés - Department store. Hours of browsing.',
        'Parque Marítimo César Manrique (near Auditorio) - Saltwater swimming pool complex. Even if weather\'s not beach-perfect, the pools are lovely. Designed by César Manrique.'
      ],
      tip: 'Santa Cruz rewards those who slow down. It\'s not a "tick the sights" kind of place - it\'s a "wander, find a café, try some tapas, soak up the sunshine" place.\n\nIf you only have a few hours and want to stay local: Plaza de España → Market → Walk to Auditorio → Coffee overlooking the sea → Back to ship.\n\nIf you have longer: Take the bus to Las Teresitas beach for a few hours, then explore the city on your return.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Mount Teide ⭐ Top Pick',
          description: 'Spain\'s highest peak (3,718m). UNESCO World Heritage Site. Volcanic landscapes that look like another planet - lunar, otherworldly, unforgettable. This is THE thing to do in Tenerife if you haven\'t been before.',
          poOption: 'P&O will likely offer half-day or full-day excursion - check onboard',
          independent: 'Independent tour operators run from Santa Cruz (half-day trips available). Hire car possible but winding mountain roads. About 1.5 hours drive from port.',
          allow: 'Half-day minimum (4-5 hours). Full day if combining with other stops.',
          cost: 'Check current prices',
          notes: 'The journey up is spectacular - you pass through different climate zones, from coast to pine forests to volcanic desert. At the top, it\'s cold (bring layers, even in March - can be near freezing). The cable car takes you near the summit. **Book cable car tickets in advance** - they sell out. Note: Cable car can close due to wind, which is common.',
          ourTake: 'If you\'ve never been to Tenerife before and have a full day in port, Mount Teide is unmissable. The landscapes are genuinely extraordinary. But it\'s a commitment - you\'ll miss the city entirely.',
          mapLink: null
        },
        {
          name: 'La Laguna (San Cristóbal de La Laguna)',
          description: 'UNESCO World Heritage Site. Tenerife\'s former capital and best-preserved colonial town. Colourful mansions, cobbled streets, beautiful churches. Feels very different from Santa Cruz.',
          poOption: 'Check P&O app for current options',
          independent: 'Tram Line 1 from Santa Cruz (near Plaza de España) - about 35-40 mins. Trams run every 5-10 mins. Get off at La Trinidad (end of the line) for the old town.',
          allow: 'Easy half-day trip',
          cost: 'Check tram prices',
          notes: 'Charming historic centre, good for a wander. Nice cafés and restaurants. More relaxed than Santa Cruz.',
          ourTake: 'Easy half-day trip if you don\'t want to commit to Mount Teide. Combine with the city - morning in Santa Cruz, afternoon in La Laguna, or vice versa.',
          mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/La+Laguna,+Santa+Cruz+de+Tenerife/'
        },
        {
          name: 'Loro Parque',
          description: 'Famous zoo/animal park in Puerto de la Cruz (about 40 mins drive). Parrots, orcas, dolphins, penguins, gorillas. Popular with families.',
          poOption: 'P&O may offer excursion - check onboard',
          independent: 'Taxi or organised tour',
          allow: 'Full half-day commitment',
          cost: 'Check current prices',
          notes: '',
          ourTake: 'Good for families with kids. Full half-day commitment. Not our personal priority but very popular.',
          mapLink: null
        }
      ],
      ourTake: '**First time in Tenerife?** Mount Teide if you have a full day. La Laguna if you want something easier.\n\n**Been before / short day?** Stay in Santa Cruz, visit the market, walk to Auditorio, maybe bus to Las Teresitas.\n\n**With kids?** Loro Parque or Las Teresitas beach.\n\n**For P&O excursions:** Check the P&O app or Reception onboard for current options and availability.'
    },
    withKids: {
      toddlers: [
        'Playa de Las Teresitas (bus #910) - Calm water (protected by breakwater), golden sand, space to run. Cafés for parents.',
        'Parque Marítimo César Manrique (20 min walk from port) - Saltwater swimming pools. Good value. Beautifully designed. Changing facilities.',
        'Palmetum - Wide paths, interesting plants, viewpoints. Buggy-friendly.',
        'Plaza de España - Big open space, fountain to watch (don\'t let them fall in the pool!).'
      ],
      olderKids: [
        'Loro Parque - The big one. Orcas, dolphins, parrots, penguins. Full day.',
        'Mount Teide - The cable car is an adventure. The volcanic landscape is like being on Mars. Older kids will love it.',
        'Las Teresitas - Beach time, maybe kayak or paddleboard hire.',
        'Parque Marítimo - Swimming pools if beach feels too far.'
      ],
      familyFood: [
        'Papas arrugadas - Wrinkly potatoes with mojo sauce. Kids usually love them.',
        'Any café on Plaza de España - Pizza, pasta, sandwiches available.',
        'Beachfront restaurants at Las Teresitas - Fish and chips, simple grilled fish, standard tourist fare.',
        'Ice cream - Plenty of heladerías on Calle del Castillo.'
      ],
      warnings: [
        'Mount Teide temperature - It\'s COLD at the top. Even if it\'s 22°C at sea level, it can be near freezing up there. Bring proper layers for kids.',
        'Bus to Las Teresitas - Can get busy. Keep kids close.',
        'Siesta hours - Some shops/restaurants close 1-4pm. Plan around it.',
        'Sun - Stronger than you think. Sunscreen and hats essential.'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Calle del Castillo (main shopping street), about 15 min walk from port',
          mapsLink: 'https://maps.google.com/?q=McDonald%27s+Santa+Cruz+de+Tenerife'
        },
        aleHop: {
          location: 'Calle del Castillo 43. The famous Spanish gift shop with toys, jokes, and novelties. Kids love it.',
          mapsLink: 'https://maps.google.com/?q=Ale+Hop+Santa+Cruz+de+Tenerife'
        }
      },
      easyDay: 'Option 1 (Beach): Bus to Las Teresitas, beach morning, lunch at beachfront, bus back, ice cream in town, back to ship. Option 2 (City): Plaza de España, Market (kids love the colours), walk to Parque Marítimo for a swim, ice cream, back to ship.'
    },
    send: {
      mobility: [
        'Port to town: Flat. If docking at Muelle Sur (long pier), free shuttle available to Plaza de España. Muelle Norte is only 5 mins walk.',
        'City centre: Santa Cruz is flat and generally wheelchair-friendly. Main streets and plazas are accessible. Some older streets have uneven surfaces.',
        'Plaza de España: Fully accessible, flat, paved.',
        'Auditorio walk: Flat promenade all the way. Accessible.',
        'Palmetum: Accessible paths, though some areas hillier than others.',
        'Market: Accessible ground floor. Can get crowded.',
        'Las Teresitas: Promenade accessible. Beach access may be challenging - check locally for accessible beach facilities.',
        'Mount Teide: Cable car station is accessible. The cable car itself can accommodate wheelchairs with advance notice - contact the operator. Summit trails are not accessible.',
        'Taxis: Available at port. Discuss requirements when booking.'
      ],
      quietSpots: [
        'Palmetum - Peaceful botanical garden, away from crowds.',
        'Parque García Sanabria - Large park, quiet corners.',
        'Plaza del Príncipe de Asturias - Small, leafy, calm.',
        'Las Teresitas early morning - Before the crowds arrive.',
        'Best timing: Early morning (just after ship arrives) or late afternoon. Midday can be busier in main squares.'
      ],
      sensory: [
        'Busy areas to be aware of: Plaza de España midday, Calle del Castillo (main shopping street) - can be crowded, Market mid-morning - busy, noisy, lots of smells, Bus to Las Teresitas - can be crowded',
        'Quieter alternatives: Waterfront promenade towards Auditorio (calmer than city centre), Palmetum, Parque García Sanabria, Las Teresitas at quieter ends of the beach',
        'Noise levels: Generally relaxed city. Not overwhelming compared to larger Spanish cities.'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'Taberna Ramón',
          location: 'Calle Clavel',
          description: 'The local favourite. Packed with locals daily. Serrano ham, cured meats, tapas. Authentic, lively, affordable. Expect to queue or stand.'
        },
        {
          name: 'La Bodeguita Canaria',
          location: 'Calle Imeldo Serís',
          description: 'Traditional Canarian cuisine. Excellent papas arrugadas with what many say is the best mojo in town. Try the carne fiesta (marinated pork). Warm atmosphere.'
        },
        {
          name: 'Bodegón El Puntero',
          location: 'Calle San Clemente',
          description: 'Rustic charm, welcoming atmosphere. Known for papas arrugadas and roasted pork. Fresh local ingredients. Good for families.'
        },
        {
          name: 'El Porrón Tasca Andaluza',
          location: 'Calle Antonio Domínguez Alfonso',
          description: 'Andalusian-style tapas. Seafood dishes, Spanish wines. Cosy and authentic.'
        },
        {
          name: 'Panzaburro Gastrotasca',
          location: 'central Santa Cruz',
          description: 'Local and organic produce. Traditional dishes plus creative fusion. Good vegetarian/vegan options.'
        }
      ],
      cafes: [
        {
          name: 'Palmelita',
          location: 'Calle del Castillo',
          description: 'Classic since 1968. Cakes, ice cream, coffee.'
        },
        {
          name: 'La Huella Café-Bistro',
          location: 'Calle Pérez Galdós',
          description: 'Smart, good midweek menu.'
        },
        {
          name: 'Strasse Park',
          location: 'near municipal park',
          description: 'Stylish, tropical vibes, brunch and cocktails.'
        }
      ],
      bars: [
        {
          name: 'Taberna Ramón',
          description: 'Also great for drinks and tapas at the bar.'
        },
        {
          name: 'Bars around Plaza de España',
          description: 'Plenty of options for cold beer and snacks.'
        },
        {
          name: 'La Bodeguita Canaria',
          description: 'Wine and tapas in traditional setting.'
        }
      ],
      localSpeciality: 'Papas arrugadas - THE Canarian dish. Small potatoes boiled in very salty water until wrinkled. Served with mojo sauces. Absolutely must try.\n\nMojo sauces - Red (mojo rojo, spicy with chilli) and green (mojo verde, with coriander/parsley). Dip everything in them.\n\nCarne fiesta - Marinated pork cubes, garlicky and peppery. Delicious.\n\nGofio - Roasted grain flour, traditional Canarian staple. Used in everything from desserts to stews.\n\nQueso asado con mojo - Grilled local cheese with mojo. Simple, perfect.\n\nBarraquito - Layered coffee with Licor 43, condensed milk, and cinnamon. Sweet treat.\n\nLocal wines - Tenerife has excellent wines. Try a local white with seafood.',
      tips: [
        'Lunch timing: Lunch is typically 1:30-4pm. Some places close mid-afternoon then reopen for dinner.',
        'Tapas style: Order a few dishes to share. "Ración" = full portion, "media ración" = half.',
        'The market: Mercado de Nuestra Señora de África is great for grazing - try local cheese, fruits, and snacks from the stalls.',
        'Cards: Widely accepted. Small tapas bars may prefer cash.',
        'Tipping: Not expected, but round up or leave 5-10% for good service.'
      ]
    }
  },
  'gran-canaria': {
    portName: 'Gran Canaria',
    displayName: 'Gran Canaria (Las Palmas)',
    country: 'Spain',
    overview: {
      description: `Las Palmas de Gran Canaria is one of the easiest cruise ports you'll visit. The ship docks at Muelle Santa Catalina, right next to a shopping mall, bus station, park, and one of Spain's best urban beaches. You literally walk off the gangway and you're there.

No shuttles needed. No taxis required for the main attractions. Just step off and start exploring.

Las Canteras beach is the star here - a gorgeous golden sand urban beach with a buzzing promenade lined with cafés, restaurants, and bars. It's the kind of place where you can happily spend an entire day doing nothing but soaking up the sun.`,
      weatherSeasonal: '21°C daytime, 14°C evening | Sea temperature ~19°C. Around 7 hours of sunshine, very little rain. Perfect beach weather.',
      portInfo: {
        dockLocation: 'Muelle Santa Catalina',
        distanceToTown: 'You\'re already there - mall and park within 2 mins walk',
        shuttleInfo: 'Not needed - everything is right there'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'El Muelle Shopping Centre (2 mins)',
          content: 'Right next to the dock. Modern mall with fashion, electronics, cafés. Good for a browse or air conditioning.'
        },
        {
          title: 'Santa Catalina Park (5 mins)',
          content: 'The "centre" for cruise passengers. Trees, benches, kiosks, often hosts events. More lively than peaceful, but good for orientation and a shaded sit-down.'
        },
        {
          title: 'Playa de Las Canteras (10-15 mins)',
          content: 'The main event. Golden sand beach with a palm-lined promenade. One of the best urban beaches in Spain - possibly Europe. Walk through Santa Catalina Park and keep going.'
        }
      ],
      longerWalk: [
        {
          title: 'The Las Canteras Loop',
          content: 'Ship → El Muelle → Santa Catalina Park → Las Canteras beach → Stroll along Paseo de Las Canteras promenade → Cut back through streets to Santa Catalina → Ship. This gives you harbour views, café-lined squares, the beach, the promenade with bars and surfers, and a feel for the city. Perfect morning or afternoon.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Santa+Catalina,+Las+Palmas+de+Gran+Canaria/Parque+Santa+Catalina,+Las+Palmas+de+Gran+Canaria/Playa+de+Las+Canteras,+Las+Palmas+de+Gran+Canaria/Muelle+Santa+Catalina,+Las+Palmas+de+Gran+Canaria/'
        }
      ],
      parks: [
        {
          title: 'Santa Catalina Park (5 mins)',
          content: 'Right by the port. Trees, benches, kiosks. Often has events. More of a social hub than a peaceful retreat, but convenient.'
        },
        {
          title: 'Ciudad Jardín (further inland)',
          content: 'A leafy residential district if you want a calmer wander away from the beach crowds. Not a formal park, just pleasant green streets.'
        }
      ],
      beach: {
        title: 'Playa de Las Canteras ⭐ The main attraction',
        content: '10-15 minute flat walk from the ship. Golden sand, calm water (protected by a natural reef), palm-lined promenade. Consistently rated among the best urban beaches in the world. March conditions: 21°C air, 19°C sea. Absolutely worth a beach visit - sunbathing, walking, or swimming if you\'re feeling brave. Facilities: Sunbeds and umbrellas for hire. Cafés and restaurants right on the promenade. Toilets available. Our take: This is the reason to visit Las Palmas. Don\'t overthink it - grab a spot on the beach, order a coffee or beer from a promenade café, and enjoy.',
        additional: [],
        mapLink: null
      },
      scenic: [
        'Las Canteras promenade - Bay views, surfers, city skyline, sunset shots',
        'Port waterfront - View back to the cruise ships',
        'La Puntilla - The northern end of Las Canteras, rocky outcrop with views'
      ],
      shopping: [
        'El Muelle Shopping Centre (2 mins from ship) - Modern mall right by the dock. Fashion, electronics, cafés. Weather-proof option.',
        'Streets around Las Canteras - More local shops, beachwear, souvenirs along the streets behind the promenade.',
        'Mesa y López area (15-20 mins walk) - The main shopping street for locals. Spanish high street brands, El Corte Inglés department store.',
        'Vegueta (bus or taxi - see Go Further) - Traditional shops, markets, more authentic souvenirs in the historic quarter.'
      ],
      coffee: [
        'Santa Catalina Park area - Several cafés within minutes of the ship',
        'Paseo de Las Canteras - Endless seafront cafés. Grab a cortado with an ocean view. Hard to go wrong.',
        'Any café with beach views - The whole point of Las Palmas is sitting with a coffee watching the waves.'
      ],
      bars: [
        'Las Canteras promenade - Bars all along the seafront. Casual cervecerías to cocktail bars with sea views.',
        'Santa Catalina area - Cluster of bars near the park.',
        'Irish/British pubs - A few scattered around Las Canteras area if you need a familiar fix.',
        'Sunset drinks: The promenade faces west. Find a bar, order a drink, watch the sunset. Perfect end to the day.'
      ],
      rainyDay: [
        'El Muelle Shopping Centre - Right by the dock. Covered shopping and cafés.',
        'Vegueta museums (bus or taxi) - Casa de Colón (Columbus House), CAAM (modern art). Indoor options in the historic quarter.'
      ],
      tip: 'Las Palmas is blissfully simple. Don\'t overcomplicate it.\n\n**The perfect day:** Walk to Las Canteras → Find a spot on the beach → Swim or sunbathe → Lunch at a promenade restaurant → More beach → Sunset drink → Walk back to ship.\n\nIf you want culture, take a quick bus to Vegueta in the morning, then spend the afternoon on the beach.\n\nThis port is about relaxation, not sightseeing.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Vegueta (Old Town) ⭐ Worth It',
          description: 'The historic quarter of Las Palmas. Cobbled streets, colonial architecture, cathedral, Columbus connections. A different vibe from the beach area.',
          poOption: 'Check P&O app for current options',
          independent: 'Bus #12 from near the port (runs every ~20 mins) or Taxi (10-15 mins)',
          allow: '2-3 hours to wander, visit a museum, have a drink',
          cost: 'Check bus/taxi prices',
          notes: '**Casa de Colón** - Columbus House museum. Christopher Columbus allegedly stayed here. Interesting history. **Santa Ana Cathedral** - Impressive cathedral on the main square. **CAAM** - Centro Atlántico de Arte Moderno. Contemporary art museum. **Wandering** - The streets themselves are the attraction. Balconies, courtyards, cafés.',
          ourTake: 'Worth doing if you want more than just beach. Go in the morning, back to Las Canteras for afternoon.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Santa+Catalina,+Las+Palmas+de+Gran+Canaria/Vegueta,+Las+Palmas+de+Gran+Canaria/'
        },
        {
          name: 'Bandama Caldera',
          description: 'Volcanic crater with panoramic views over the island. Impressive landscape.',
          poOption: 'Check P&O app for current options',
          independent: 'Best via organised excursion or pre-booked taxi. Not easily done by public transport.',
          allow: 'Half-day round trip',
          cost: 'Check excursion/taxi prices',
          notes: '',
          ourTake: 'Nice if you\'ve done Las Palmas before and want something different. For first-timers, the beach is the priority.',
          mapLink: null
        },
        {
          name: 'Maspalomas Dunes / Playa del Inglés',
          description: 'The famous sand dunes in the south of Gran Canaria. Iconic desert-like landscape. Resort beaches.',
          poOption: 'Check P&O app for current options',
          independent: '50-60 mins by bus from San Telmo station (reachable by bus from port). Taxi faster but expensive for the distance.',
          allow: 'Realistically a long half-day from a cruise call',
          cost: 'Check bus/taxi prices',
          notes: '',
          ourTake: 'Beautiful, but it\'s a commitment. You\'ll spend a lot of time travelling for a cruise day. Only worth it if you have a full day and really want to see the dunes. Most people are happier staying in Las Palmas.',
          mapLink: null
        }
      ],
      ourTake: '**8-10 hour day, suggested plan:**\nMorning: Bus to Vegueta, wander the old town, coffee\nLunch: Back to Santa Catalina or Las Canteras\nAfternoon: Beach time on Las Canteras\nEvening: Sunset drink on the promenade, back to ship\n\n**Or just:** Beach all day. No shame in that. It\'s a really good beach.\n\n**For P&O excursions:** Check the P&O app or Reception onboard for current options and availability.'
    },
    withKids: {
      toddlers: [
        'Playa de Las Canteras - Calm water (natural reef protects the beach), golden sand, space to play. The promenade has ice cream, snacks, toilets. Perfect for little ones.',
        'Santa Catalina Park - Space to run around, close to the ship. Trees for shade.',
        'The promenade - Flat, pushchair-friendly. Ice cream stops everywhere.'
      ],
      olderKids: [
        'Surfing/bodyboarding at Las Canteras - Lessons available. The beach has good waves at the southern end.',
        'Vegueta - Pirates-and-explorers history vibes. Columbus connections. Casa de Colón museum has interesting exhibits.',
        'El Muelle mall - Shops, food court, cinema if they need a break from the sun.'
      ],
      familyFood: [
        'Everywhere on Las Canteras promenade - Pizza, burgers, ice cream, tapas. Picky eaters easily accommodated.',
        'El Muelle mall - Food court with familiar options.',
        'Beach cafés - Simple grilled fish, chips, sandwiches.'
      ],
      warnings: [
        'Sun - It\'s strong even in March. Sunscreen, hats, shade breaks.',
        'Bikes/scooters on promenade - Keep little ones close.',
        'Waves at southern end of Las Canteras - Calmer in the middle where the reef protects.'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Calle Triana 75, about 15 min walk or quick bus from Las Canteras',
          mapsLink: 'https://maps.google.com/?q=McDonald%27s+Las+Palmas+Triana'
        },
        aleHop: {
          location: 'Calle Mayor de Triana 48. Fun Spanish gift shop with novelties and toys.',
          mapsLink: 'https://maps.google.com/?q=Ale+Hop+Las+Palmas'
        }
      },
      easyDay: 'Walk to Las Canteras, beach morning, ice cream, lunch on promenade, more beach or paddle, walk back via Santa Catalina Park, back to ship.'
    },
    send: {
      mobility: [
        'Port to beach: Flat, wide pavements, easy crossings. Suitable for wheelchairs and mobility scooters.',
        'Las Canteras promenade: Largely step-free and smooth. Some side streets have short ramps or kerbs.',
        'Santa Catalina Park: Accessible, flat paths.',
        'El Muelle mall: Fully accessible.',
        'Beach access: Some access points to the sand. Check locally for accessible beach facilities/beach wheelchairs.',
        'Vegueta: Cobbled streets - more challenging for wheelchairs. Some uneven surfaces.'
      ],
      quietSpots: [
        'Northern/southern ends of Las Canteras - Away from the busiest central stretch.',
        'Ciudad Jardín - Leafy residential area, calmer than the beach zone.',
        'Santa Catalina Park corners - Quieter spots away from any events.',
        'Best timing: Earlier morning or mid-afternoon. Evenings and weekends busier with locals.'
      ],
      sensory: [
        'Busy areas: Central Las Canteras promenade midday/afternoon, Santa Catalina Park during events, El Muelle mall on weekends',
        'Quieter alternatives: Ends of Las Canteras beach, Early morning promenade walk, Ciudad Jardín residential area',
        'Noise levels: Generally relaxed. Beach/promenade has happy buzz but not overwhelming.'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'Las Canteras promenade restaurants',
          description: 'Dozens of options right on the seafront. Fish, paella, tapas, international. Hard to go wrong - look for busy places with locals.'
        },
        {
          name: 'Santa Catalina area',
          description: 'More casual tapas bars and restaurants near the park.'
        },
        {
          name: 'Vegueta (if you go)',
          description: 'More traditional tapas bars in the old town. Good for authentic Canarian food.'
        }
      ],
      cafes: [
        {
          name: 'Paseo de Las Canteras',
          description: 'Endless options with sea views. Pick one you like the look of.'
        },
        {
          name: 'Santa Catalina Park',
          description: 'Kiosks and cafés for quick coffee.'
        }
      ],
      bars: [
        {
          name: 'Promenade sunset bars',
          description: 'The west-facing promenade is perfect for sunset drinks.'
        },
        {
          name: 'Santa Catalina',
          description: 'Lively bar scene near the park.'
        }
      ],
      localSpeciality: 'Papas arrugadas - Same as Tenerife. Wrinkled potatoes with mojo sauces. Must try.\n\nMojo sauces - Red (spicy) and green (herby). Dip everything.\n\nFresh Atlantic fish - Grilled simply. Whatever\'s fresh that day.\n\nGofio - Traditional roasted grain. Used in various dishes and desserts.\n\nCanarian wines - Local wines worth trying, especially whites with seafood.',
      tips: [
        'Lunch timing: 1pm-3:30pm typically. Beach area serves food all day.',
        'Menu del día: Look for set lunch menus for good value.',
        'Fish restaurants: Point at what looks good in the display. Simple grilled = delicious.',
        'Cards: Widely accepted. Small beach bars may prefer cash.'
      ]
    }
  },
  'lanzarote': {
    portName: 'Lanzarote',
    displayName: 'Arrecife de Lanzarote',
    country: 'Spain',
    overview: {
      description: `Arrecife is the capital of Lanzarote, a working port city rather than a tourist resort. It's compact, walkable, and authentic - you'll see real Canarian life here, not just cruise ship crowds.

The city sits on the east coast of Lanzarote, with a natural harbour that's been used for centuries. The old town is charming with narrow streets, while the newer areas have modern amenities. Arrecife itself is pleasant for a wander, but Lanzarote's real magic lies beyond - the volcanic landscapes created by César Manrique, the black sand beaches, and the otherworldly Timanfaya National Park.

March weather is perfect for exploring - warm enough for beaches but not the intense summer heat. The island's volcanic nature means it's drier than the other Canaries, with more sunshine hours.`,
      weatherSeasonal: '19-21°C | Mostly sunny, very little rain. Drier than other Canaries. Light layers, sunscreen essential. Sea temperature ~18°C.',
      portInfo: {
        dockLocation: 'Muelle de los Mármoles (main cruise terminal) or Muelle de Naos',
        distanceToTown: '15-20 minutes walk to city centre',
        shuttleInfo: 'Shuttle bus usually available from terminal to city centre (5 mins)'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Castillo de San Gabriel (10 mins from port)',
          content: '16th-century fortress on a small islet connected by a bridge. Now houses the Ethnographic Museum. Good views over the harbour. Free entry to the bridge and exterior, small fee for museum.'
        },
        {
          title: 'Charco de San Ginés (5 mins)',
          content: 'The old fishing harbour, now a lagoon surrounded by restaurants and bars. Very picturesque, especially at sunset. This is where locals go for seafood. Authentic atmosphere.'
        },
        {
          title: 'Calle Real (10 mins)',
          content: 'Main shopping street in the old town. Mix of local shops, cafés, and some tourist-oriented stores. Not as polished as resort areas - this is real Arrecife.'
        },
        {
          title: 'Playa del Reducto (15 mins)',
          content: 'City beach with golden sand imported from the Sahara. Protected by breakwater so calm water. Promenade with cafés. March reality: Nice for a walk, probably not swimming weather (water ~18°C).'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Old Town Loop (~1 hour)',
          content: 'Port → Charco de San Ginés → Calle Real → Castillo de San Gabriel → Playa del Reducto → Back to port. Gives you a good feel for the city, its history, and the harbour.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Charco+de+San+Gines,+Arrecife/Castillo+de+San+Gabriel,+Arrecife/Playa+del+Reducto,+Arrecife/'
        },
        {
          title: 'Option 2: Harbour and Beach Walk (~45 mins)',
          content: 'Port → Charco de San Ginés → Follow waterfront → Playa del Reducto → Promenade walk → Return. Flat, scenic, good for photos.'
        }
      ],
      parks: [
        {
          title: 'Parque Islas Canarias (10 mins from port)',
          content: 'Small park near the harbour with benches, shade, and views. Good for a quiet break.'
        }
      ],
      beach: {
        title: 'Playa del Reducto (15 mins walk)',
        content: 'The main city beach. Golden sand (imported), calm water (protected by breakwater), palm-lined promenade with cafés and restaurants. Facilities: Sunbeds for hire, toilets, showers. March reality: 19°C air, 18°C sea. Perfect for a beach walk, sunbathing if weather is good, swimming for the brave.',
        additional: [
          'Playa de las Cucharas (Puerto del Carmen, 15km) - Resort beach, more facilities, but requires transport.',
          '💡 Arrecife beaches are pleasant but Lanzarote\'s best beaches are on the south coast (Playa Blanca area) - need transport to reach.'
        ],
        mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Playa+del+Reducto,+Arrecife/'
      },
      scenic: [
        'Charco de San Ginés - The old fishing harbour lagoon, especially at sunset',
        'Castillo de San Gabriel - Views from the fortress bridge',
        'Harbour views - Looking back at the cruise ships from the waterfront',
        'Playa del Reducto promenade - Beach and palm-lined walkway'
      ],
      shopping: [
        'Calle Real - Main shopping street in old town. Mix of local and tourist shops.',
        'Marina Lanzarote (near port) - Modern shopping complex with boutiques, restaurants, and cafés.',
        'Local products: Aloe vera products (Lanzarote is famous for aloe), volcanic salt, local wines, ceramics.',
        'Note: Arrecife is not a major shopping destination - most shopping is in resort areas like Puerto del Carmen.'
      ],
      coffee: [
        'Cafés around Charco de San Ginés - Several options with harbour views',
        'Marina Lanzarote - Modern cafés and restaurants',
        'Calle Real - Local cafés for authentic atmosphere',
        'Any café on Playa del Reducto promenade - Beach views'
      ],
      bars: [
        'Bars around Charco de San Ginés - Where locals go. Seafood-focused, authentic atmosphere.',
        'Marina Lanzarote - More tourist-oriented bars and restaurants',
        'Playa del Reducto area - Beachfront bars'
      ],
      rainyDay: [
        'Museo Internacional de Arte Contemporáneo (MIAC) - Contemporary art museum in Castillo de San José (10 mins taxi). Free entry.',
        'Museo Arqueológico de Arrecife - Archaeological museum (15 mins walk). Small but interesting.',
        'Marina Lanzarote - Shopping centre, covered, restaurants, cafés.',
        'Find a restaurant around Charco de San Ginés - Wait it out with local wine and seafood.'
      ],
      tip: 'Arrecife is pleasant but not the main draw of Lanzarote. If you only have a few hours: Walk to Charco de San Ginés, have coffee or lunch, wander the old town, maybe visit the beach. But if you have a full day, consider exploring beyond - Timanfaya, Jameos del Agua, or César Manrique sites are what make Lanzarote special.\n\nArrecife rewards a slow wander. Don\'t expect polished tourist attractions - this is a working port city with authentic charm.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Timanfaya National Park ⭐ Top Pick',
          description: 'The "Fire Mountains" - a volcanic landscape that looks like another planet. Active geothermal activity (guides demonstrate by pouring water into holes, creating steam geysers). The drive through the park is spectacular - black volcanic rock, craters, and otherworldly formations. This is Lanzarote\'s signature attraction.',
          poOption: 'P&O will likely offer full-day or half-day excursion - check onboard',
          independent: 'Organised tours available from Arrecife (book in advance). Car rental possible but you must join guided bus tour inside park (private cars not allowed on most routes). About 30km, 30-40 mins drive.',
          allow: 'Half-day minimum (4-5 hours including travel). Full day if combining with other stops.',
          cost: 'Check current prices - park entry + guided tour required',
          notes: 'The park is strictly controlled - you must join official guided tours inside. The geothermal demonstrations are fascinating. Bring layers - it can be windy and cooler at higher elevations. The restaurant uses geothermal heat to cook food - worth seeing.',
          ourTake: 'If you\'ve never been to Lanzarote before, Timanfaya is unmissable. The landscapes are genuinely extraordinary and unlike anywhere else. But it\'s a commitment - you\'ll spend most of your day there. Worth it for first-timers.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Timanfaya+National+Park/'
        },
        {
          name: 'Jameos del Agua',
          description: 'One of César Manrique\'s most famous creations. A volcanic tunnel transformed into a cultural centre with an underground lake (home to unique blind albino crabs), restaurant, and auditorium. Beautifully designed, combining nature and art. Part of the César Manrique route.',
          poOption: 'P&O may offer excursion - check onboard',
          independent: 'Car rental or organised tour. About 25km from port, 30 mins drive. Can combine with Cueva de los Verdes (next door).',
          allow: '2-3 hours for visit',
          cost: 'Check current prices',
          notes: 'Very popular, can get busy. The underground lake with the crabs is unique. The restaurant is beautiful but pricey. Part of a combined ticket with other César Manrique sites available.',
          ourTake: 'Beautiful and unique. If you\'re interested in César Manrique\'s work or want to see something genuinely different, it\'s worth it. Can be combined with other north-coast attractions.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Jameos+del+Agua/'
        },
        {
          name: 'César Manrique Foundation',
          description: 'The artist\'s former home, built into volcanic bubbles. Now a museum showcasing his work and vision. Beautiful architecture that blends with the landscape. Essential for understanding Lanzarote\'s artistic heritage.',
          poOption: 'Check P&O app for current options',
          independent: 'Car rental or taxi. About 10km from port, 15 mins drive. In Tahíche.',
          allow: '1-2 hours',
          cost: 'Check current prices',
          notes: 'The house itself is the main attraction - built into natural volcanic formations. Beautiful gardens. Good gift shop with Manrique-inspired items.',
          ourTake: 'If you\'re interested in art, architecture, or César Manrique, this is essential. If not, you might prefer Timanfaya or Jameos del Agua for more dramatic landscapes.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Fundacion+Cesar+Manrique/'
        },
        {
          name: 'Cueva de los Verdes',
          description: 'A 6km lava tube (only 1km accessible to visitors). Guided tours through the cave system, showing how lava flows created these formations. Atmospheric and interesting.',
          poOption: 'Check P&O app for current options',
          independent: 'Car rental or organised tour. Right next to Jameos del Agua, so can combine. About 25km from port.',
          allow: '1 hour for tour',
          cost: 'Check current prices',
          notes: 'Guided tours only (included in entry). The cave is impressive but less "designed" than Jameos del Agua - more natural.',
          ourTake: 'Interesting if you like geology or caves. Often combined with Jameos del Agua visit. Less essential than Timanfaya or Jameos, but good if you have time.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+de+los+Marmoles,+Arrecife/Cueva+de+los+Verdes/'
        }
      ],
      ourTake: '**First time in Lanzarote?** Timanfaya is the must-see. If you have a full day, combine with one César Manrique site (Jameos del Agua or Foundation).\n\n**Been before / short day?** Stay in Arrecife, explore the old town, Charco de San Ginés, have lunch, maybe visit the beach.\n\n**With kids?** Timanfaya is fascinating for all ages. Jameos del Agua is also good - the underground lake with crabs is memorable.\n\n**For P&O excursions:** Check the P&O app or Reception onboard for current options and availability. Timanfaya excursions are very popular - book early if interested.'
    },
    withKids: {
      toddlers: [
        'Playa del Reducto - Calm water (protected), golden sand, space to play. Promenade has cafés and toilets nearby.',
        'Parque Islas Canarias - Small park near port, space to run around.',
        'Charco de San Ginés - Interesting to see the boats and lagoon (supervised - it\'s a working harbour).'
      ],
      olderKids: [
        'Timanfaya National Park - The volcanic landscape is like being on Mars. The geothermal demonstrations are fascinating. Older kids will love it.',
        'Jameos del Agua - The underground lake with blind crabs is unique and memorable.',
        'Cueva de los Verdes - Cave exploration is always exciting for kids.',
        'Playa del Reducto - Beach time, maybe paddle or swim if brave enough in March.'
      ],
      familyFood: [
        'Restaurants around Charco de San Ginés - Seafood, usually kid-friendly options available.',
        'Marina Lanzarote - More tourist-oriented, familiar food options.',
        'Beachfront restaurants at Playa del Reducto - Simple grilled fish, chips, standard fare.',
        'Ice cream - Available at various spots in town.'
      ],
      warnings: [
        'Timanfaya can be windy and cooler - bring layers for kids.',
        'Volcanic rock is sharp - supervise kids closely at Timanfaya.',
        'Charco de San Ginés is a working harbour - keep kids away from water edge.',
        'Sun is strong even in March - sunscreen and hats essential.'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Calle León y Castillo in Arrecife centre, about 20 min walk from port',
          mapsLink: 'https://maps.google.com/?q=McDonald%27s+Arrecife+Lanzarote'
        }
      },
      easyDay: 'Option 1 (Local): Walk to Charco de San Ginés, coffee, wander old town, Playa del Reducto for beach time, lunch, back to ship. Option 2 (Timanfaya): Book excursion or tour to Timanfaya, spend day exploring volcanic landscapes, return to ship.'
    },
    send: {
      mobility: [
        'Port to town: Mostly flat, paved. 15-20 min walk is manageable but can be tiring. Shuttle bus available.',
        'Charco de San Ginés: Accessible, flat paths around the lagoon.',
        'Calle Real: Main street is accessible, some side streets have kerbs.',
        'Playa del Reducto: Promenade is accessible, flat. Beach access may be challenging - check locally for accessible beach facilities.',
        'Timanfaya: Accessible visitor centre and restaurant. The guided bus tour through the park is accessible. Some walking areas may have uneven surfaces.',
        'Jameos del Agua: Has accessible routes, though some areas may be challenging. Contact in advance to confirm.',
        'Taxis: Available at port. Discuss requirements when booking.'
      ],
      quietSpots: [
        'Parque Islas Canarias - Small, peaceful park near harbour.',
        'Playa del Reducto (early morning) - Before crowds arrive.',
        'Charco de San Ginés (early morning) - Quieter before restaurants get busy.',
        'Best timing: Early morning (just after ship arrives) or late afternoon. Midday can be busier around Charco de San Ginés.'
      ],
      sensory: [
        'Busy areas to be aware of: Charco de San Ginés at lunch/dinner time - restaurants get busy, Calle Real during shopping hours - can be crowded, Marina Lanzarote on weekends',
        'Quieter alternatives: Parque Islas Canarias, Playa del Reducto at quieter ends, Early morning harbour walk',
        'Noise levels: Generally calm city. Not overwhelming. Timanfaya can be windy (noise from wind).'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'Restaurants around Charco de San Ginés',
          location: 'Charco de San Ginés',
          description: 'Several seafood restaurants around the old harbour. This is where locals go. Fresh fish, traditional Canarian dishes. Authentic atmosphere. Look for busy places with locals.'
        },
        {
          name: 'Marina Lanzarote restaurants',
          location: 'Marina Lanzarote (near port)',
          description: 'More tourist-oriented but good quality. Mix of Spanish, Canarian, and international options. More polished than Charco area.'
        },
        {
          name: 'Beachfront restaurants',
          location: 'Playa del Reducto promenade',
          description: 'Several options along the beach promenade. Good for lunch with sea views. Simple grilled fish, tapas, standard tourist fare.'
        }
      ],
      cafes: [
        {
          name: 'Cafés around Charco de San Ginés',
          location: 'Charco de San Ginés',
          description: 'Several options with harbour views. Good for coffee and people-watching.'
        },
        {
          name: 'Marina Lanzarote',
          location: 'Marina Lanzarote',
          description: 'Modern cafés, good coffee, pastries.'
        },
        {
          name: 'Calle Real',
          location: 'Main shopping street',
          description: 'Local cafés for authentic atmosphere.'
        }
      ],
      bars: [
        {
          name: 'Bars around Charco de San Ginés',
          description: 'Where locals go. Seafood-focused, authentic atmosphere. Good for local wine and tapas.'
        },
        {
          name: 'Marina Lanzarote',
          description: 'More tourist-oriented bars and restaurants.'
        },
        {
          name: 'Beachfront bars',
          location: 'Playa del Reducto',
          description: 'Bars along the promenade, good for sunset drinks.'
        }
      ],
      localSpeciality: 'Papas arrugadas - Same as other Canaries. Wrinkled potatoes with mojo sauces. Must try.\n\nMojo sauces - Red (spicy) and green (herby). Dip everything.\n\nFresh fish - Grilled or fried. Local varieties like vieja (parrotfish), cherne (wreckfish).\n\nAloe vera products - Lanzarote is famous for aloe. Try aloe vera drinks or products.\n\nLanzarote wine - Unique wines from grapes grown in volcanic soil (La Geria region). White wines are particularly good. Try with seafood.\n\nGofio - Traditional Canarian roasted grain flour, used in various dishes.',
      tips: [
        'Lunch timing: Spanish lunch is 2-4pm. Many restaurants close 4-8pm then reopen for dinner.',
        'Charco de San Ginés: This is the authentic area. Look for restaurants with locals, not just tourists.',
        'Seafood: Point at what looks good. Simple grilled fish is usually delicious.',
        'Cards: Widely accepted. Small local places may prefer cash.',
        'Tipping: Not expected, but round up or leave 5-10% for good service.'
      ]
    }
  },
  'cadiz': {
    portName: 'Cádiz',
    displayName: 'Cádiz',
    country: 'Spain',
    overview: {
      description: `Cádiz is one of the oldest continuously inhabited cities in Western Europe, founded by the Phoenicians around 1100 BC. It's a historic port city on a narrow peninsula, surrounded by the Atlantic on three sides. The old town is compact, walkable, and full of character - narrow streets, plazas, and historic buildings.

The city has a relaxed, authentic Andalusian atmosphere. It's not a tourist resort - this is a real Spanish city where people live and work. The locals are friendly, and while English is spoken in tourist areas, you'll hear Spanish everywhere. It's very safe and perfect for exploring on foot.

Cádiz is famous for its connection to sherry wine (it's part of the "Sherry Triangle"), its seafood, and its role in Spanish history. The city played a key role in the Spanish Constitution of 1812. March weather is pleasant - mild temperatures perfect for walking, though it can be breezy (it's on the Atlantic coast).`,
      weatherSeasonal: '16-18°C | Mild, can be breezy (Atlantic coast). Occasional rain possible. Layers recommended, light waterproof jacket useful.',
      portInfo: {
        dockLocation: 'Alfonso XIII Pier (Muelle Alfonso XIII)',
        distanceToTown: '5 minutes walk to old town',
        shuttleInfo: 'Not needed - it\'s right there'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Plaza de San Juan de Dios (5 mins from port)',
          content: 'The main square and heart of the old town. Surrounded by impressive buildings including the City Hall (Ayuntamiento). Cafés with outdoor seating, good for people-watching. This is where you start exploring.'
        },
        {
          title: 'Cádiz Cathedral (10 mins)',
          content: 'The iconic golden-domed cathedral. Baroque and neoclassical mix. You can climb the Torre de Poniente for panoramic views (small fee). The cathedral square (Plaza de la Catedral) is lovely. Entry fee for cathedral, free to admire exterior.'
        },
        {
          title: 'Mercado Central (8 mins)',
          content: 'The main market in a beautiful 19th-century building. Fresh produce, seafood, local products. Morning is best (closes around 2pm). Even if you don\'t buy, worth a wander to see the atmosphere and the building itself.'
        },
        {
          title: 'Torre Tavira (10 mins)',
          content: '18th-century watchtower with camera obscura. Great views over the city. The camera obscura show is interesting (small fee). One of Cádiz\'s 126 watchtowers - the city was full of them for spotting ships.'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Old Town Highlights Loop (~1.5 hours)',
          content: 'Port → Plaza de San Juan de Dios → Mercado Central → Cádiz Cathedral → Torre Tavira → Wander narrow streets → La Caleta beach → Back to port. This covers the main sights and gives you a feel for the old town.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Alfonso+XIII,+Cadiz/Plaza+de+San+Juan+de+Dios,+Cadiz/Catedral+de+Cadiz,+Cadiz/La+Caleta,+Cadiz/'
        },
        {
          title: 'Option 2: Seafront Walk (~45 mins one way)',
          content: 'Port → Follow seafront promenade north → Parque Genovés (botanical garden) → Continue along coast. Flat, scenic, sea views. Can return same way or cut through old town.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Alfonso+XIII,+Cadiz/Parque+Genoves,+Cadiz/'
        }
      ],
      parks: [
        {
          title: 'Parque Genovés (15 mins walk north)',
          content: 'Beautiful botanical garden by the sea. Palm trees, fountains, sculptures, and a famous "Cave of the Bats" (artificial grotto). Peaceful escape from the city. Free entry.'
        },
        {
          title: 'Alameda Apodaca (10 mins walk)',
          content: 'Seafront promenade with gardens, benches, and sea views. Good for a stroll or sit-down. Free.'
        }
      ],
      beach: {
        title: 'La Caleta (15 mins walk)',
        content: 'The city\'s main beach, located between two historic castles (Castillo de Santa Catalina and Castillo de San Sebastián). Small but picturesque, with a promenade. March reality: 16-18°C air, ~15°C sea. Nice for a walk, probably not swimming weather. The setting between the castles is what makes it special.',
        additional: [
          'Playa de la Victoria (further north, 20-25 mins walk) - Longer beach, more facilities, but further from old town.',
          '💡 La Caleta is the iconic Cádiz beach, but it\'s small. The walk there is part of the experience.'
        ],
        mapLink: 'https://www.google.com/maps/dir/Muelle+Alfonso+XIII,+Cadiz/La+Caleta,+Cadiz/'
      },
      scenic: [
        'Cádiz Cathedral - The golden dome, especially in afternoon light',
        'Torre Tavira views - Panoramic views over the old town and sea',
        'La Caleta - The beach between the two castles',
        'Seafront promenades - Atlantic views, especially at sunset',
        'Narrow streets of old town - Authentic Andalusian atmosphere',
        'Plaza de San Juan de Dios - The main square with City Hall'
      ],
      shopping: [
        'Calle Ancha (starts at Plaza de San Juan de Dios) - Main shopping street. Mix of local and chain stores.',
        'Mercado Central - The market for local products, but closes around 2pm.',
        'Old town streets - Small local shops, ceramics, souvenirs.',
        'Local products: Sherry wine, local ceramics, Andalusian products.'
      ],
      coffee: [
        'Plaza de San Juan de Dios - Several cafés with outdoor seating around the square. Good for people-watching.',
        'Plaza de la Catedral - Cafés near the cathedral, nice atmosphere.',
        'Calle Ancha - Various cafés along the main shopping street.',
        'Any café in the old town - Authentic Spanish café culture.'
      ],
      bars: [
        'Tapas bars in old town - Wander and find one that looks good. Look for places with locals.',
        'Bars around Plaza de San Juan de Dios - Good for people-watching with a drink.',
        'Seafront bars - Along the promenades, good for sunset drinks.',
        'Sherry bars - Cádiz is sherry country. Look for places serving local sherry.'
      ],
      rainyDay: [
        'Cádiz Cathedral - Can spend time inside, climb the tower (if weather allows).',
        'Torre Tavira - Camera obscura show is indoors, views from tower (covered areas).',
        'Museo de Cádiz (15 mins walk) - Archaeology and fine arts museum. Free entry. Good for a couple of hours.',
        'Mercado Central - Covered market, wander and snack while staying dry.',
        'Find a tapas bar - Duck in and wait it out with local wine and tapas. This is what locals do.'
      ],
      tip: 'Cádiz is perfect for a slow wander. Don\'t try to tick off a list - just stroll the old town, find a tapas bar, sit in a plaza with a coffee. It\'s a real Spanish city, not a cruise-ship theme park.\n\nIf you only have a few hours: Plaza de San Juan de Dios → Mercado Central (if morning) → Cádiz Cathedral → Torre Tavira → Find a tapas bar for lunch → Back to ship.\n\nIf you have longer: Add La Caleta beach, Parque Genovés, more wandering in the old town. The city rewards exploration.\n\nNote: Cádiz is very close to Jerez (sherry country) and Seville - both are popular day trips, but you\'ll miss Cádiz itself if you go. Cádiz is worth exploring in its own right.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Seville ⭐ Popular Day Trip',
          description: 'One of Spain\'s most beautiful cities. Stunning cathedral, Alcázar palace, historic centre, flamenco, tapas culture. About 1.5 hours by road or train.',
          poOption: 'P&O will likely offer full-day excursion to Seville - check onboard',
          independent: 'Train from Cádiz station (about 1.5 hours, regular services) or organised tour. Station is about 1km from cruise port. Taxi to station, then train.',
          allow: 'Full day commitment (8-10 hours)',
          cost: 'Check current train/tour prices',
          notes: 'Seville is beautiful but it\'s a big commitment for a cruise day. You\'ll spend 3 hours travelling (round trip) and miss Cádiz entirely. Only worth it if you\'ve never been to Seville and have a full day in port.',
          ourTake: 'Seville is stunning, but Cádiz is also wonderful and much closer. If you have a full day and Seville is on your bucket list, go for it. But don\'t underestimate how much time you\'ll spend travelling. Cádiz itself has plenty to offer.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Alfonso+XIII,+Cadiz/Seville,+Spain/'
        },
        {
          name: 'Jerez de la Frontera',
          description: 'The heart of sherry country. Bodegas (sherry wineries) for tours and tastings, historic centre, flamenco shows. About 30-40 mins by road or train.',
          poOption: 'P&O may offer excursion - check onboard',
          independent: 'Train from Cádiz (about 30-40 mins, regular services) or organised tour. Easier than Seville.',
          allow: 'Half-day to full day',
          cost: 'Check current prices',
          notes: 'Great if you\'re interested in sherry or want to see a traditional Andalusian town. Less touristy than Seville.',
          ourTake: 'Good option if you want to go further but don\'t want the full Seville commitment. Jerez is charming and the sherry connection is interesting.',
          mapLink: 'https://www.google.com/maps/dir/Muelle+Alfonso+XIII,+Cadiz/Jerez+de+la+Frontera,+Spain/'
        }
      ],
      ourTake: '**First time in Andalusia?** Cádiz itself has plenty. Seville is beautiful but it\'s a full-day commitment and you\'ll miss Cádiz entirely.\n\n**Been to Seville before / short day?** Stay in Cádiz, explore the old town, enjoy the atmosphere, try the tapas.\n\n**With kids?** Cádiz is more manageable than Seville for a cruise day. The old town is compact and walkable.\n\n**For P&O excursions:** Check the P&O app or Reception onboard for current options and availability. Seville excursions are popular - book early if interested.'
    },
    withKids: {
      toddlers: [
        'Parque Genovés - Botanical garden with space to run, interesting plants, the "Cave of the Bats".',
        'La Caleta - Small beach, space to play (supervised - it\'s the Atlantic). Promenade for walking.',
        'Plaza de San Juan de Dios - Open space, pigeons, cafés for parents to sit.',
        'Seafront promenades - Flat, good for pushchairs, sea views.'
      ],
      olderKids: [
        'Torre Tavira - Climbing the tower and the camera obscura show is interesting for kids.',
        'Cádiz Cathedral - Impressive building, can climb the tower (if old enough).',
        'La Caleta - Beach time, exploring the castles (exterior).',
        'Old town wandering - The narrow streets and plazas are fun to explore.',
        'Museo de Cádiz - If they\'re interested in history/archaeology.'
      ],
      familyFood: [
        'Tapas bars - Kids can try small portions of different things.',
        'Plaza de San Juan de Dios - Cafés with familiar options (pizza, pasta usually available).',
        'Beachfront restaurants at La Caleta - Simple grilled fish, standard fare.',
        'Ice cream - Available at various spots.'
      ],
      warnings: [
        'Cobblestones in old town - Can be tricky for pushchairs in places.',
        'La Caleta - Atlantic beach, supervise kids closely.',
        'Spanish lunch hours - Restaurants may close 4-8pm. Plan around this.',
        'Narrow streets - Keep kids close, some streets are very narrow.'
      ],
      familiarChains: {
        mcDonalds: {
          location: 'Calle Columela near the main shopping area, about 10 min walk from port',
          mapsLink: 'https://maps.google.com/?q=McDonald%27s+Cadiz'
        },
        aleHop: {
          location: 'Calle Ancha (main shopping street). Fun Spanish gift shop with toys and novelties.',
          mapsLink: 'https://maps.google.com/?q=Ale+Hop+Cadiz'
        }
      },
      easyDay: 'Option 1 (City): Plaza de San Juan de Dios, Mercado Central (kids love the colours), Torre Tavira (camera obscura), lunch, La Caleta beach, ice cream, back to ship. Option 2 (Park): Walk to Parque Genovés, explore gardens, seafront promenade, lunch, back to ship.'
    },
    send: {
      mobility: [
        'Port to old town: Flat, paved, easy. The 5-minute walk is accessible.',
        'Old town: Mostly flat but cobblestones in places. Main streets (Calle Ancha, around plazas) are accessible. Narrow side streets can be challenging.',
        'Plaza de San Juan de Dios: Accessible, flat, paved.',
        'Cádiz Cathedral: Ground floor accessible. Tower climb has steps (not accessible).',
        'Torre Tavira: Has lift to camera obscura level. Views from top may require steps.',
        'Mercado Central: Accessible ground floor. Can get crowded.',
        'La Caleta: Promenade accessible. Beach access may be challenging - check locally for accessible beach facilities.',
        'Parque Genovés: Accessible paths, though some areas may have steps.',
        'Taxis: Available at port. Can accommodate wheelchairs - ask.'
      ],
      quietSpots: [
        'Parque Genovés - Peaceful botanical garden, away from crowds.',
        'Alameda Apodaca - Seafront promenade, quieter than city centre.',
        'Early morning old town - Before crowds arrive.',
        'Seafront promenades (away from main areas) - Quieter stretches.',
        'Best timing: Early morning (just after ship arrives) or late afternoon. Midday can be busier in main plazas.'
      ],
      sensory: [
        'Busy areas to be aware of: Plaza de San Juan de Dios at lunch time, Calle Ancha (main shopping street) - can be crowded, Mercado Central mid-morning - busy, noisy, lots of smells, La Caleta on nice days - can be busy',
        'Quieter alternatives: Parque Genovés, Seafront promenades away from centre, Early morning old town, Museums',
        'Noise levels: Generally calm city. Not overwhelming like larger Spanish cities. Atlantic breeze can be noisy on seafront.'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'Tapas bars in old town',
          location: 'Various locations in old town',
          description: 'Wander and find one that looks good. Look for places with locals. Traditional tapas, seafood, local specialities. Authentic atmosphere.'
        },
        {
          name: 'Restaurants around Plaza de San Juan de Dios',
          location: 'Plaza de San Juan de Dios',
          description: 'Several options around the main square. Mix of traditional and more tourist-oriented. Good for people-watching.'
        },
        {
          name: 'Seafront restaurants',
          location: 'Along seafront promenades',
          description: 'Several options with sea views. Good for lunch or dinner. Seafood-focused.'
        },
        {
          name: 'La Caleta area',
          location: 'Near La Caleta beach',
          description: 'Restaurants near the beach. Simple grilled fish, standard tourist fare.'
        }
      ],
      cafes: [
        {
          name: 'Cafés around Plaza de San Juan de Dios',
          location: 'Plaza de San Juan de Dios',
          description: 'Several options with outdoor seating. Good for coffee and people-watching.'
        },
        {
          name: 'Plaza de la Catedral',
          location: 'Near cathedral',
          description: 'Cafés near the cathedral, nice atmosphere.'
        },
        {
          name: 'Calle Ancha',
          location: 'Main shopping street',
          description: 'Various cafés along the street.'
        }
      ],
      bars: [
        {
          name: 'Tapas bars',
          location: 'Old town',
          description: 'Where locals go. Traditional tapas, local wine, sherry. Authentic atmosphere.'
        },
        {
          name: 'Sherry bars',
          location: 'Old town',
          description: 'Cádiz is sherry country. Look for places serving local sherry. Great for trying different types.'
        },
        {
          name: 'Bars around Plaza de San Juan de Dios',
          description: 'Good for people-watching with a drink.'
        }
      ],
      localSpeciality: 'Tortillitas de camarones - Shrimp fritters, a Cádiz speciality. Thin, crispy, delicious.\n\nPescaíto frito - Assorted fried fish. Very fresh, very local. The way to eat fish in Cádiz.\n\nSherry wine - Cádiz is part of the "Sherry Triangle". Try fino (dry), manzanilla (very dry, from Sanlúcar), oloroso (sweet). Perfect with tapas.\n\nTapas culture - Cádiz has excellent tapas. Small plates, share several. Look for places with locals.\n\nLocal seafood - Very fresh. Grilled or fried. Point at what looks good.\n\nChurros - Spanish fried dough, often eaten for breakfast with hot chocolate.',
      tips: [
        'Lunch timing: Spanish lunch is 2-4pm. Many restaurants close 4-8pm then reopen for dinner.',
        'Tapas style: Order several small plates to share. "Ración" = full portion, "media ración" = half, "tapa" = small plate.',
        'Sherry: Try it! It\'s what Cádiz is famous for. Fino or manzanilla with tapas is perfect.',
        'The market: Mercado Central is great for seeing local produce and seafood. Morning is best (closes around 2pm).',
        'Cards: Widely accepted. Small tapas bars may prefer cash.',
        'Tipping: Not expected, but round up or leave 5-10% for good service.'
      ]
    }
  },
  'lisbon': {
    portName: 'Lisbon',
    displayName: 'Lisbon',
    country: 'Portugal',
    overview: {
      description: `Lisbon is Portugal's capital and one of Europe's most charming cities. Built on seven hills overlooking the Tagus River, it's a city of colourful tiled buildings, historic trams, and stunning viewpoints. The old town (Alfama) is a maze of narrow streets, while the newer areas have wide boulevards and grand squares.

The city has a relaxed, slightly faded elegance. It's not as polished as some European capitals - and that's part of its charm. The locals are friendly, English is widely spoken in tourist areas, and it's very safe. Lisbon is famous for its fado music, its pastéis de nata (custard tarts), and its role in the Age of Discovery.

March weather is pleasant - mild temperatures perfect for walking, though it can be rainy (this is Portugal's wettest month). The hills can be challenging, but there are trams, funiculars, and elevators to help. This is an overnight stay, so you have the evening to explore - fado shows, dinner, or just wandering the illuminated streets.`,
      weatherSeasonal: '15-17°C | Mild, but March is Portugal\'s wettest month. Expect some rain. Layers, waterproof jacket essential. Umbrella recommended.',
      portInfo: {
        dockLocation: 'Santa Apolónia or Jardim do Tabaco terminal (both near each other)',
        distanceToTown: '1.5km to Alfama (old town), 20 mins walk',
        shuttleInfo: 'Shuttle bus usually available to city centre (Praça do Comércio)'
      },
      arriveTime: 'TBC',
      departTime: 'TBC'
    },
    stayLocal: {
      quickWalk: [
        {
          title: 'Praça do Comércio (20 mins walk or shuttle)',
          content: 'The grand square by the river. Huge open space surrounded by yellow buildings. The "doorway to Lisbon" - this is where you enter the city. Cafés, restaurants, good starting point.'
        },
        {
          title: 'Alfama District (25 mins walk from port)',
          content: 'The old town - narrow winding streets, historic buildings, fado music. This is the heart of old Lisbon. Get lost in the streets, find viewpoints (miradouros), discover small squares. The Sé (cathedral) is here.'
        },
        {
          title: 'Sé (Lisbon Cathedral) (25 mins walk)',
          content: 'The city\'s cathedral, dating from the 12th century. Romanesque architecture, survived the 1755 earthquake. Free to enter, small fee for cloisters. In the Alfama district.'
        },
        {
          title: 'Miradouro de Santa Luzia (30 mins walk)',
          content: 'One of Lisbon\'s famous viewpoints. Overlooks Alfama and the river. Beautiful tiled walls, benches, often has musicians. Free. In Alfama.'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Alfama Exploration (~2 hours)',
          content: 'Port → Praça do Comércio → Walk up into Alfama → Sé (cathedral) → Miradouro de Santa Luzia → Wander narrow streets → Miradouro das Portas do Sol (another viewpoint) → Back down. This is the classic Lisbon old town experience.',
          mapLink: 'https://www.google.com/maps/dir/Santa+Apolonia,+Lisbon/Praca+do+Comercio,+Lisbon/Alfama,+Lisbon/'
        },
        {
          title: 'Option 2: Baixa and Chiado (~1.5 hours)',
          content: 'Port → Praça do Comércio → Rua Augusta (pedestrian street) → Rossio Square → Elevador de Santa Justa (art nouveau elevator) → Chiado district. More modern, shopping, cafés.',
          mapLink: 'https://www.google.com/maps/dir/Santa+Apolonia,+Lisbon/Praca+do+Comercio,+Lisbon/Rossio,+Lisbon/'
        }
      ],
      parks: [
        {
          title: 'Jardim Botânico (Chiado area, 30 mins walk or tram)',
          content: 'Botanical garden, peaceful escape. Not essential but nice if you want green space.'
        }
      ],
      beach: {
        title: 'No beach within walking distance',
        content: 'Lisbon is on the river, not the ocean. The nearest beaches are in Cascais (30km, train ride) or Costa da Caparica (south of the river). For a cruise day, not practical. Focus on the city itself.',
        additional: [],
        mapLink: null
      },
      scenic: [
        'Miradouro de Santa Luzia - Views over Alfama and river, beautiful tiles',
        'Miradouro das Portas do Sol - Another Alfama viewpoint, even better views',
        'Praça do Comércio - The grand square by the river',
        'Alfama streets - The narrow, winding streets themselves',
        'Tram 28 route - The famous tram through old town (ride it or photograph it)',
        'Sé (cathedral) - The historic cathedral',
        'Tagus River views - From various viewpoints'
      ],
      shopping: [
        'Rua Augusta (starts at Praça do Comércio) - Main pedestrian shopping street. Mix of local and international brands.',
        'Chiado district - More upmarket shopping, boutiques, bookshops.',
        'Alfama - Small local shops, ceramics, fado-related items.',
        'Local products: Portuguese tiles (azulejos), cork products, port wine, pastéis de nata, fado CDs.'
      ],
      coffee: [
        'Cafés around Praça do Comércio - Several options with square views.',
        'Cafés in Alfama - Small, authentic, good for a break while exploring.',
        'A Brasileira (Chiado) - Historic café, touristy but iconic.',
        'Any pastelaria - Portuguese pastry shops, excellent coffee and pastries.'
      ],
      bars: [
        'Bars in Alfama - Small, authentic, often have fado music in evening.',
        'Bars around Praça do Comércio - More tourist-oriented but good atmosphere.',
        'Wine bars - Portugal has excellent wine. Look for wine bars serving local wines.',
        'Fado houses - For evening fado shows (usually with dinner, book ahead).'
      ],
      rainyDay: [
        'Sé (cathedral) - Can spend time inside, visit cloisters.',
        'Museu do Fado (Alfama) - Fado museum, interesting if you like music. Small fee.',
        'Museu Nacional do Azulejo (tiles museum, 15 mins taxi) - Beautiful tile collection. Worth it if you like tiles/art.',
        'Shopping centres - Amoreiras or Colombo (both require transport).',
        'Find a pastelaria - Duck in, have coffee and pastéis de nata, wait it out. This is very Portuguese.',
        'Fado house - Book a fado show (usually evening, includes dinner). Indoor, cultural experience.'
      ],
      tip: 'Lisbon is a city to explore slowly. Don\'t try to see everything - pick a few areas and really explore them. The Alfama is the heart of old Lisbon and rewards getting lost.\n\n**First day:** Focus on Alfama and Baixa. Walk up into Alfama, find viewpoints, explore the streets, visit the cathedral. Have lunch, maybe ride Tram 28.\n\n**Evening (overnight stay):** This is special. Fado show in Alfama, dinner, or just wander the illuminated streets. Lisbon is beautiful at night.\n\n**Second day (if you have it):** Belém (tower, monastery) or more exploring. The hills are challenging - use trams, funiculars, and the metro. Don\'t try to walk everywhere.\n\n**Note:** Lisbon has seven hills. It\'s hilly. Comfortable shoes essential. Use public transport (trams, funiculars, elevators) - they\'re part of the experience anyway.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Belém Tower & Jerónimos Monastery ⭐ Top Pick',
          description: 'Two UNESCO World Heritage sites. Belém Tower is the iconic 16th-century fortress on the river. Jerónimos Monastery is stunning Manueline architecture, where Vasco da Gama is buried. These are Lisbon\'s signature attractions.',
          poOption: 'P&O will likely offer excursion - check onboard',
          independent: 'Tram 15 from Praça do Comércio (about 20-25 mins) or taxi (15 mins). Tram is part of the experience. Get off at Belém stop.',
          allow: 'Half-day (3-4 hours) to see both properly',
          cost: 'Check current prices - both have entry fees',
          notes: 'Very popular, can get busy. The monastery is stunning - don\'t miss the cloisters. Belém Tower has great views. There\'s also the Pastéis de Belém shop nearby (the original pastéis de nata).',
          ourTake: 'If you have time, these are unmissable. The monastery is one of Europe\'s most beautiful buildings. Tram 15 is an easy way to get there and part of the Lisbon experience. Can combine with the Pastéis de Belém shop.',
          mapLink: 'https://www.google.com/maps/dir/Praca+do+Comercio,+Lisbon/Torre+de+Belem,+Lisbon/Mosteiro+dos+Jeronymos,+Lisbon/'
        },
        {
          name: 'Sintra',
          description: 'Fairytale town with palaces and castles in the mountains. Pena Palace (colourful, romantic), Moorish Castle, Quinta da Regaleira. About 40 mins by train from Lisbon.',
          poOption: 'P&O may offer excursion - check onboard',
          independent: 'Train from Rossio station (about 40 mins, regular services). Then local buses or taxis to palaces. Can be complex.',
          allow: 'Full day commitment',
          cost: 'Check current prices - train + palace entry fees',
          notes: 'Sintra is beautiful but it\'s a full day and you\'ll miss Lisbon. The palaces are spread out, require transport between them. Very popular, can be crowded.',
          ourTake: 'Sintra is stunning but it\'s a big commitment for a cruise day, especially with an overnight in Lisbon (you might want to explore Lisbon in the evening). Only worth it if you have a full day and Sintra is a priority. Lisbon itself has plenty.',
          mapLink: 'https://www.google.com/maps/dir/Santa+Apolonia,+Lisbon/Sintra,+Portugal/'
        },
        {
          name: 'Cascais',
          description: 'Coastal resort town, beaches, marina, charming old town. About 30 mins by train from Cais do Sodré station.',
          poOption: 'Check P&O app for current options',
          independent: 'Train from Cais do Sodré (about 30-40 mins, regular services). Easy day trip.',
          allow: 'Half-day to full day',
          cost: 'Check train prices',
          notes: 'Nice if you want to see the coast and beaches. Charming town, good for a wander. Less essential than Belém but pleasant.',
          ourTake: 'Good option if you want to see the coast or have been to Lisbon before. Less essential than Belém, but pleasant for a change of pace.',
          mapLink: 'https://www.google.com/maps/dir/Cais+do+Sodre,+Lisbon/Cascais,+Portugal/'
        }
      ],
      ourTake: '**First time in Lisbon?** Focus on the city itself - Alfama, Baixa, maybe Belém if you have time. The city has plenty to offer.\n\n**Been before / overnight stay?** Use the evening for fado, dinner, or night wandering. Second day could be Belém or Sintra if you want to go further.\n\n**With kids?** Belém is good - the tower and monastery are impressive. Alfama can be tiring with hills. Use trams - kids love Tram 28.\n\n**For P&O excursions:** Check the P&O app or Reception onboard for current options and availability.'
    },
    withKids: {
      toddlers: [
        'Praça do Comércio - Huge open space, space to run, river views.',
        'Tram 28 - Kids love trams. Ride it (or just watch it go by).',
        'Alfama (supervised) - The narrow streets can be fun to explore, but keep kids close.',
        'Elevador de Santa Justa - The art nouveau elevator is exciting for kids (small fee).'
      ],
      olderKids: [
        'Belém Tower - Climbing the tower is an adventure. Great views.',
        'Jerónimos Monastery - Impressive building, interesting history (Age of Discovery).',
        'Tram 28 - Ride the famous tram through old town.',
        'Miradouros (viewpoints) - Kids enjoy the views and the tiled walls.',
        'Pastéis de Belém - The original pastéis de nata shop is an experience (and delicious).'
      ],
      familyFood: [
        'Pastéis de nata - Kids (and adults) love these. Available everywhere.',
        'Pastelarias - Portuguese pastry shops, lots of options for picky eaters.',
        'Restaurants around Praça do Comércio - Usually have familiar options.',
        'Grilled chicken (frango) - Very popular in Portugal, usually kid-friendly.'
      ],
      warnings: [
        'Hills - Lisbon is hilly. Can be tiring for kids (and adults). Use trams and funiculars.',
        'Narrow streets in Alfama - Keep kids close, some streets are very narrow.',
        'Tram 28 - Can be very crowded. Hold kids close.',
        'Cobblestones - Can be tricky for little feet and pushchairs.'
      ],
      easyDay: '**Option 1 (City day):** Praça do Comércio → Ride Tram 28 (or part of it) → Alfama exploration → Lunch → Miradouro de Santa Luzia → Back to ship\n\n**Option 2 (Belém day):** Tram 15 to Belém → Belém Tower → Jerónimos Monastery → Pastéis de Belém → Tram back → Ship'
    },
    send: {
      mobility: [
        'Port to city: 1.5km walk, mostly flat along river. Shuttle bus available to Praça do Comércio.',
        'Alfama: Very hilly, cobblestones, narrow streets. Challenging for wheelchairs. Some areas accessible via taxi drop-off at viewpoints.',
        'Praça do Comércio: Fully accessible, flat, paved.',
        'Baixa: Mostly accessible, flat, main streets are wide.',
        'Belém: Accessible via Tram 15 (low-floor trams). Belém Tower has steps (not fully accessible). Jerónimos Monastery has accessible routes - check in advance.',
        'Trams: Tram 28 is historic (not accessible). Tram 15 to Belém has low-floor accessible trams.',
        'Metro: Accessible, has lifts.',
        'Taxis: Available at port. Can accommodate wheelchairs - ask.'
      ],
      quietSpots: [
        'Jardim Botânico - Peaceful botanical garden.',
        'Early morning Alfama - Before crowds arrive.',
        'Miradouros (viewpoints) - Can be peaceful if not crowded.',
        'Seafront areas (if you go to Belém) - Quieter than city centre.',
        'Best timing: Early morning (just after ship arrives) or late afternoon. Midday and weekends can be busier.'
      ],
      sensory: [
        'Busy areas to be aware of: Praça do Comércio midday, Rua Augusta (main shopping street) - can be crowded, Tram 28 - very crowded, popular viewpoints - can be busy',
        'Quieter alternatives: Early morning exploration, Jardim Botânico, Less popular viewpoints, Museums',
        'Noise levels: Generally calm city, but trams can be noisy, and fado shows (evening) are intentionally atmospheric (music).'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'Restaurants in Alfama',
          location: 'Alfama district',
          description: 'Traditional Portuguese restaurants, often with fado music in evening. Seafood, grilled meats, local specialities. Authentic atmosphere. Book ahead for fado shows.'
        },
        {
          name: 'Restaurants around Praça do Comércio',
          location: 'Praça do Comércio',
          description: 'Several options around the square. Mix of traditional and more tourist-oriented. Good for people-watching.'
        },
        {
          name: 'Time Out Market',
          location: 'Cais do Sodré area',
          description: 'Food hall with various vendors. Good for trying different things. Can get busy.'
        },
        {
          name: 'Restaurants in Chiado',
          location: 'Chiado district',
          description: 'More upmarket options, mix of Portuguese and international.'
        }
      ],
      cafes: [
        {
          name: 'Pastelarias (pastry shops)',
          location: 'Everywhere',
          description: 'Portuguese pastry shops. Excellent coffee, pastéis de nata, other pastries. This is where locals go for coffee.'
        },
        {
          name: 'A Brasileira',
          location: 'Chiado',
          description: 'Historic café, touristy but iconic. Good for the experience.'
        },
        {
          name: 'Cafés around Praça do Comércio',
          location: 'Praça do Comércio',
          description: 'Several options with square views.'
        }
      ],
      bars: [
        {
          name: 'Wine bars',
          location: 'Various locations',
          description: 'Portugal has excellent wine. Look for wine bars serving local wines. Great for trying different varieties.'
        },
        {
          name: 'Bars in Alfama',
          location: 'Alfama',
          description: 'Small, authentic, often have fado music in evening.'
        },
        {
          name: 'Fado houses',
          location: 'Alfama',
          description: 'For evening fado shows (usually with dinner, book ahead). Cultural experience.'
        }
      ],
      localSpeciality: 'Pastéis de nata - THE Portuguese pastry. Custard tarts with flaky crust, sprinkled with cinnamon. The original is Pastéis de Belém (in Belém). Must try.\n\nBacalhau - Salted cod, prepared in hundreds of ways. Portugal\'s national dish. Try bacalhau à brás (with potatoes and eggs) or bacalhau com natas (with cream).\n\nGrilled sardines - Very popular in summer, but available year-round. Simple, delicious.\n\nPort wine - Portugal\'s famous fortified wine. Try it as an aperitif or dessert wine.\n\nGinjinha - Cherry liqueur, often served in chocolate cups. A Lisbon speciality.\n\nPortuguese wine - Excellent and underrated. Try local reds and whites.\n\nPasteis de bacalhau - Cod fritters, popular snack.\n\nBifana - Marinated pork sandwich, very popular.',
      tips: [
        'Lunch timing: Portuguese lunch is typically 12:30-2:30pm. Many restaurants close mid-afternoon then reopen for dinner (7:30pm onwards).',
        'Pastéis de nata: Try them everywhere, but the original is Pastéis de Belém (in Belém). Worth the trip.',
        'Fado: If you want to see fado, book ahead. Many fado houses require dinner reservations. Evening shows are atmospheric.',
        'Tipping: Not expected, but round up or leave 5-10% for good service.',
        'Cards: Widely accepted. Small local places may prefer cash.',
        'The hills: Lisbon is hilly. Use trams, funiculars, elevators, and the metro. Don\'t try to walk everywhere.',
        'Overnight stay: Use the evening! Fado shows, dinner, or just wander the illuminated streets. Lisbon is beautiful at night.'
      ]
    }
  }
};

/**
 * Get content for a specific port
 */
export function getPortContent(portName) {
  if (!portName) return null;
  // Normalize port name: lowercase, remove accents, replace spaces with hyphens
  const key = portName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (e.g., ñ -> n, à -> a)
    .replace(/\s+/g, '-')
    .replace(/'/g, '');
  return g606PortContent[key] || null;
}
