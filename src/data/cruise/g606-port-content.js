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
      description: `La Coruña (A Coruña in Galician) is one of the easiest cruise ports in Spain. The ship docks at Muelle de Trasatlánticos, literally a 5-minute walk from the city centre. No shuttles needed, no taxis required – just walk off and you're there.

The city sits on a peninsula with the Atlantic on three sides. It's known as the "City of Glass" thanks to the distinctive galería buildings – white wooden-framed glass balconies that line the waterfront. You'll spot them from the ship before you even disembark.

La Coruña is a real working city, not a tourist resort. It has an authentic, relaxed feel without the crowds you'd find in Barcelona or Lisbon. Perfect for a wander without feeling like you're in a tourist trap.`,
      weatherSeasonal: '14-16°C | Chance of rain (this is Galicia!) Pack layers and a waterproof jacket. March can be unpredictable.',
      portInfo: {
        dockLocation: 'Muelle de Trasatlánticos (Transatlantic Dock)',
        distanceToTown: '5 minutes walk',
        shuttleInfo: 'Not needed – it\'s right there'
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
          content: 'The main square and heart of the city. Named after a local heroine who defended the city against English attack in 1589. The impressive town hall building dominates one side. Surrounded by cafés – good spot for your first coffee.'
        },
        {
          title: 'Los Cantones Village (2 mins)',
          content: 'Shopping centre right by the port. Useful for toilets, coffee, or if you need anything. Free WiFi.'
        },
        {
          title: 'Rúa Real (10 mins)',
          content: 'Main pedestrian shopping street. Turn left from the port, cross Avenida de la Marina, and you\'re on it. Standard Spanish high street – Zara, Mango, etc.'
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
          content: 'The famous 13km seafront promenade. You won\'t do all of it, but even 30 minutes along is lovely – flat, scenic, sea views. Good for walking, running, or cycling (hire bikes available).'
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
          'Playa del Orzán (next to Riazor) – Slightly quieter, good for surfing. Same promenade connects both.',
          'Praia de Santo Amaro (further along coast) – Popular swimming spot with an outdoor pool overlooking the beach. Kiosk for drinks.',
          '💡 March reality: Water will be cold. Nice for a walk along the sand, probably not for swimming.'
        ]
      },
      scenic: [
        'Avenida de la Marina – The galería buildings from the waterfront',
        'Plaza María Pita – The town hall facade',
        'Jardín de San Carlos – Harbour views',
        'Octopus Sculpture – Along the coastal path towards Tower of Hercules (iconic La Coruña symbol)',
        'Tower of Hercules – If you make it there (see Go Further section)'
      ],
      shopping: [
        'Rúa Real / Calle San Andrés – Main pedestrian shopping streets. 10 min from port. Spanish high street brands – nothing you can\'t get at home, but pleasant for a wander.',
        'Mercado de San Agustín – Covered food market. Local produce, fish, fruit. Morning is best. Good for browsing even if you don\'t buy.',
        'Los Cantones Village – Shopping centre right by port. Convenient for basics.'
      ],
      coffee: [
        'Plaza María Pita – Several cafés with outdoor seating around the square. Any will do.',
        'Café Derby – Traditional café, been there forever. Local institution.',
        'Sucre (Calle Franja 54) – Contemporary patisserie, excellent coffee, gorgeous cakes and pastries.',
        'El Timón – Charming café near the port, known for coffee and pastries.'
      ],
      bars: [
        'Calle de la Franja / Calle Olmos – The tapas street. Wander until you find somewhere that looks good.',
        'O\'Connor\'s Irish Pub – Yes, there\'s one. Near the marina. If you need a Guinness.',
        'Any bar on Plaza María Pita – Good for people-watching with a beer.',
        'Vermutería Martínez – Small, charming, great for vermouth before lunch (vermouth is trendy in Spain).'
      ],
      rainyDay: [
        'Aquarium Finisterrae (20 min walk or taxi towards Tower of Hercules) – Good aquarium, seals swimming outside. Has a lift for wheelchair/buggy access. Couple of hours\' entertainment.',
        'Domus – Casa del Hombre (15 min walk) – Interactive science museum. "House of Mankind" – covers human body and biology. Good for a couple of hours. Mostly aimed at families but interesting for adults too.',
        'Museo de Bellas Artes (10 mins from port) – Fine arts museum. Free entry. Over 5,000 pieces from 15th century to present day – Rubens, Picasso, Tintoretto. Impressive for a free museum.',
        'Mercado de San Agustín – Covered, wander and snack while staying dry.',
        'Los Cantones Village – Shopping centre right by port. Coffee, shops, toilets.',
        'Find a tapas bar – Duck in and wait it out with local wine and octopus.'
      ],
      tip: 'La Coruña rewards a slow wander. Don\'t try to tick off a list – just stroll the waterfront, find a tapas bar, sit in the main square with a coffee. It\'s a proper Spanish city, not a cruise-ship theme park. Enjoy the authenticity.\n\nIf the weather is good: Walk to Plaza María Pita, grab coffee, wander the Old Town, walk along the promenade towards the beaches, find somewhere for tapas.\n\nIf the weather is bad: Museums, covered market, tapas bars. The rain won\'t last all day.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Tower of Hercules ⭐ Top Pick',
          description: 'UNESCO World Heritage Site. The oldest functioning lighthouse in the world – Roman, nearly 2,000 years old. Still working. The views from the headland are spectacular.',
          poOption: 'P&O may offer excursion – check onboard',
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
          poOption: 'P&O will likely offer full-day excursion – check onboard',
          independent: 'Train from La Coruña station (about 30 mins) – station is 2.5km from cruise terminal. Taxi possible but expensive for the distance.',
          allow: 'Full day commitment',
          cost: 'Check current prices',
          notes: 'Beautiful historic centre, incredible cathedral, lots of pilgrims. But it\'s a big commitment for a port day – you\'ll miss La Coruña itself entirely.',
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
        'Parque de Santa Margarita (20 min walk uphill or quick taxi) – Playground, ducks, space to run around. Good for burning off energy.',
        'Playa de Riazor (30 min walk or taxi) – Sandy beach – even in March, good for sandcastles and running around. Ice cream available.',
        'Plaza María Pita – Open space, pigeons to chase, cafés for parents to sit while kids run around.',
        'Aquarium Finisterrae – Seals, fish, interactive bits. Lift access. Couple of hours entertainment.'
      ],
      olderKids: [
        'Aquarium Finisterrae – Good for a couple of hours',
        'Domus – Casa del Hombre – Interactive science museum. Human body focus. Interesting enough for teens.',
        'Tower of Hercules – The climb (234 steps) could be an adventure. Sculpture park around it is fun to explore.',
        'Beach + ice cream – Always works',
        'Bike hire – Cycling along the Paseo Marítimo promenade. Flat, scenic, dedicated cycle lanes. Good for active families.'
      ],
      familyFood: [
        '100 Montaditos – Cheap small sandwiches, choose your own. Kids love the choice and independence.',
        'Any plaza café – Pizza, pasta usually available',
        'Ice cream – Lots of heladerías in town centre',
        'Churros – Several churrerías in the old town. Spanish kids\' favourite.'
      ],
      warnings: [
        'Cobblestones in Old Town – buggy unfriendly in places',
        'Hills – La Coruña has some steep bits, especially towards parks',
        'Spanish lunch hours – Restaurants may close 4-8pm. Plan around this or eat early.',
        'Weather – March can be rainy. Pack layers and waterproofs for kids too.'
      ],
      easyDay: 'Walk to main square → Coffee/juice → Taxi to Aquarium (or Santa Margarita park for playground) → Taxi to beach for an hour → Ice cream → Walk back to ship.'
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
        'Taxis: Available at port. Can accommodate wheelchairs – ask.'
      ],
      quietSpots: [
        'Jardín de San Carlos – Small, peaceful garden. Benches, shade, harbour views. Away from crowds.',
        'Jardines de Méndez Núñez – Central but peaceful. Good for a quiet break.',
        'Azcárraga Square – Small leafy square in the Old Town, quieter feel than María Pita, benches and partial shade.',
        'Stretches of seafront promenade – Away from the main beach accesses, much quieter.',
        'Best timing: Early morning soon after docking, or later afternoon once ship excursions have returned. Weekends and local events increase footfall around María Pita.'
      ],
      sensory: [
        'Busy areas to be aware of: Plaza María Pita at lunch time, Rúa Real (main shopping street) – can be crowded, Market mid-morning (10am-12pm) – busy, noisy, fish smells',
        'Quieter alternatives: Gardens and parks, Promenade away from centre, Museums mid-afternoon, Old Town backstreets (quieter than main plazas)',
        'Noise levels: Generally calm city. Not overwhelming like Barcelona or Madrid.'
      ]
    },
    foodAndDrink: {
      restaurants: [
        {
          name: 'A Pulpeira de Melide',
          location: 'Plaza de España',
          description: 'Four generations making Galician octopus. Arguably the best in the city. Octopus cooked in copper pots, served with olive oil, sea salt, paprika and potatoes. Affordable. Gets busy – arrive early.'
        },
        {
          name: 'La Bombilla',
          location: 'Rua Torreiro',
          description: 'Classic standing tapas bar. Simple but perfect – tortilla de patata, chorizo, croquetas, calamares. Local atmosphere, very affordable. You\'ll probably stand. Vibrant, slightly intense – embrace it.'
        },
        {
          name: 'O Viñedo de Tito',
          location: 'wine region area',
          description: 'Traditional Galician tavern since 1977. Roasted ham, seafood (octopus, scallops, mussels, grilled sardines). Charming setting with wine barrels. Terrace in good weather.'
        },
        {
          name: 'A Taberna de Cunqueiro',
          location: 'Calle de la Estrella',
          description: 'Lively cellar bar. Pulpo con cachelos (octopus with potatoes), mussels, meatballs. Book ahead or arrive early – it fills up.'
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
      localSpeciality: 'Pulpo a la Gallega – Galician-style octopus. Boiled, served on wooden plate with paprika, olive oil, salt. THE thing to try here.\n\nPercebes – Goose barnacles. Weird looking, expensive, delicious. Caught from dangerous cliffs. A Galician delicacy.\n\nPimientos de Padrón – Small green peppers, fried, salted. Most are mild, occasional one is spicy. Russian roulette tapas.\n\nEmpanada Gallega – Galician pie, usually filled with tuna, meat, or vegetables.\n\nAlbariño wine – Local white wine from Rías Baixas region. Perfect with seafood.\n\nEstrella Galicia – The local beer. Ask for "una caña" (small draft).',
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

The city is flat, easy to navigate, and surprisingly walkable. Most attractions are within 20 minutes of the port on foot. But the real draw of Tenerife is what lies beyond the city – Mount Teide, the beaches, and the stunning volcanic landscapes.

March means you're here for "winter sun" – expect pleasant temperatures perfect for exploring without the summer heat.`,
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
          content: 'Pretty square with the Triunfo de la Candelaria monument. Surrounded by cafés – good for people-watching.'
        },
        {
          title: 'Calle del Castillo (starts at Plaza de la Candelaria)',
          content: 'Main pedestrian shopping street. All the usual brands plus local shops. Tax-free status means electronics and perfume are cheaper here.'
        }
      ],
      longerWalk: [
        {
          title: 'Option 1: Waterfront to Auditorio (~30 mins one way)',
          content: 'Plaza de España → Waterfront promenade → Parque Marítimo → Auditorio de Tenerife. The Auditorio is the iconic wave-shaped concert hall (think Sydney Opera House vibes). Designed by Santiago Calatrava. Even if you don\'t go inside, it\'s worth the walk for photos. Look down at the sea wall – music legends\' faces are painted on the boulders.',
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
          content: 'Botanical garden built on a former rubbish dump – now home to the largest collection of palm trees in Europe. Over 3,000 plant species. Great views over the city from the viewpoint. Peaceful escape.'
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
        content: 'The famous golden sand beach – sand imported from the Sahara! Protected by breakwater so calm water. Palm-fringed promenade with cafés. This is the one to visit. Getting there: Bus #910 from Plaza de España or Intercambiador (main bus station). Runs regularly. Tell driver "Las Teresitas." March reality: Water around 19°C – swimmable for the brave. Perfect for a beach walk and lunch at one of the beachfront restaurants.',
        additional: [],
        mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/Playa+de+Las+Teresitas/'
      },
      scenic: [
        'Auditorio de Tenerife – The iconic wave-shaped building',
        'Plaza de España – The "Santa Cruz" letters and reflective pool',
        'Palmetum viewpoint – City and harbour views',
        'Mercado de Nuestra Señora de África – Colourful colonial-style market building',
        'Las Teresitas – Golden beach with mountain backdrop'
      ],
      shopping: [
        'Calle del Castillo – Main pedestrian shopping street. Spanish and international brands.',
        'El Corte Inglés – Large department store. Good for everything. About 15 mins walk from port.',
        'Mercado de Nuestra Señora de África (15 mins walk) – The main market in a beautiful salmon-pink colonial building. Fresh produce, flowers, local cheese, fruit, handmade jewellery from lava rock. Morning is best. Worth visiting even just to look.',
        'Tax-free note: Canary Islands have lower taxes than mainland Spain. Electronics, perfume, tobacco, and alcohol are noticeably cheaper.'
      ],
      coffee: [
        'Palmelita (Calle del Castillo) – Sweet café since 1968. Cakes, ice cream, coffee. Vintage tile décor. Local institution.',
        'La Huella Café-Bistro (Calle Pérez Galdós) – Smart café, good for coffee and cake or a light lunch.',
        'Strasse Park (near Parque García Sanabria) – Stylish spot for brunch, cocktails, coffee. Tropical garden vibes.',
        'Any café on Plaza de la Candelaria – Good for people-watching.'
      ],
      bars: [
        'Taberna Ramón (Calle Clavel) – Local favourite – packed with locals, which is always a good sign. Serrano ham, cured meats, tapas. Lively atmosphere. Arrive early or wait.',
        'La Bodeguita Canaria (Calle Imeldo Serís) – Authentic Canarian spot. Traditional dishes, best mojo sauce in town according to some.',
        'Bars around Plaza de España and Calle del Castillo – Plenty of options for a cold beer.'
      ],
      rainyDay: [
        'TEA – Tenerife Espacio de las Artes (10 mins walk) – Contemporary art museum. Interesting building, rotating exhibitions.',
        'Mercado de Nuestra Señora de África – Covered market. Wander, snack, stay dry.',
        'El Corte Inglés – Department store. Hours of browsing.',
        'Parque Marítimo César Manrique (near Auditorio) – Saltwater swimming pool complex. Even if weather\'s not beach-perfect, the pools are lovely. Designed by César Manrique.'
      ],
      tip: 'Santa Cruz rewards those who slow down. It\'s not a "tick the sights" kind of place – it\'s a "wander, find a café, try some tapas, soak up the sunshine" place.\n\nIf you only have a few hours and want to stay local: Plaza de España → Market → Walk to Auditorio → Coffee overlooking the sea → Back to ship.\n\nIf you have longer: Take the bus to Las Teresitas beach for a few hours, then explore the city on your return.'
    },
    goFurther: {
      attractions: [
        {
          name: 'Mount Teide ⭐ Top Pick',
          description: 'Spain\'s highest peak (3,718m). UNESCO World Heritage Site. Volcanic landscapes that look like another planet – lunar, otherworldly, unforgettable. This is THE thing to do in Tenerife if you haven\'t been before.',
          poOption: 'P&O will likely offer half-day or full-day excursion – check onboard',
          independent: 'Independent tour operators run from Santa Cruz (half-day trips available). Hire car possible but winding mountain roads. About 1.5 hours drive from port.',
          allow: 'Half-day minimum (4-5 hours). Full day if combining with other stops.',
          cost: 'Check current prices',
          notes: 'The journey up is spectacular – you pass through different climate zones, from coast to pine forests to volcanic desert. At the top, it\'s cold (bring layers, even in March – can be near freezing). The cable car takes you near the summit. **Book cable car tickets in advance** – they sell out. Note: Cable car can close due to wind, which is common.',
          ourTake: 'If you\'ve never been to Tenerife before and have a full day in port, Mount Teide is unmissable. The landscapes are genuinely extraordinary. But it\'s a commitment – you\'ll miss the city entirely.',
          mapLink: null
        },
        {
          name: 'La Laguna (San Cristóbal de La Laguna)',
          description: 'UNESCO World Heritage Site. Tenerife\'s former capital and best-preserved colonial town. Colourful mansions, cobbled streets, beautiful churches. Feels very different from Santa Cruz.',
          poOption: 'Check P&O app for current options',
          independent: 'Tram Line 1 from Santa Cruz (near Plaza de España) – about 35-40 mins. Trams run every 5-10 mins. Get off at La Trinidad (end of the line) for the old town.',
          allow: 'Easy half-day trip',
          cost: 'Check tram prices',
          notes: 'Charming historic centre, good for a wander. Nice cafés and restaurants. More relaxed than Santa Cruz.',
          ourTake: 'Easy half-day trip if you don\'t want to commit to Mount Teide. Combine with the city – morning in Santa Cruz, afternoon in La Laguna, or vice versa.',
          mapLink: 'https://www.google.com/maps/dir/Plaza+de+Espana,+Santa+Cruz+de+Tenerife/La+Laguna,+Santa+Cruz+de+Tenerife/'
        },
        {
          name: 'Loro Parque',
          description: 'Famous zoo/animal park in Puerto de la Cruz (about 40 mins drive). Parrots, orcas, dolphins, penguins, gorillas. Popular with families.',
          poOption: 'P&O may offer excursion – check onboard',
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
        'Playa de Las Teresitas (bus #910) – Calm water (protected by breakwater), golden sand, space to run. Cafés for parents.',
        'Parque Marítimo César Manrique (20 min walk from port) – Saltwater swimming pools. Good value. Beautifully designed. Changing facilities.',
        'Palmetum – Wide paths, interesting plants, viewpoints. Buggy-friendly.',
        'Plaza de España – Big open space, fountain to watch (don\'t let them fall in the pool!).'
      ],
      olderKids: [
        'Loro Parque – The big one. Orcas, dolphins, parrots, penguins. Full day.',
        'Mount Teide – The cable car is an adventure. The volcanic landscape is like being on Mars. Older kids will love it.',
        'Las Teresitas – Beach time, maybe kayak or paddleboard hire.',
        'Parque Marítimo – Swimming pools if beach feels too far.'
      ],
      familyFood: [
        'Papas arrugadas – Wrinkly potatoes with mojo sauce. Kids usually love them.',
        'Any café on Plaza de España – Pizza, pasta, sandwiches available.',
        'Beachfront restaurants at Las Teresitas – Fish and chips, simple grilled fish, standard tourist fare.',
        'Ice cream – Plenty of heladerías on Calle del Castillo.'
      ],
      warnings: [
        'Mount Teide temperature – It\'s COLD at the top. Even if it\'s 22°C at sea level, it can be near freezing up there. Bring proper layers for kids.',
        'Bus to Las Teresitas – Can get busy. Keep kids close.',
        'Siesta hours – Some shops/restaurants close 1-4pm. Plan around it.',
        'Sun – Stronger than you think. Sunscreen and hats essential.'
      ],
      easyDay: '**Option 1 (Beach day):** Bus to Las Teresitas → Beach morning → Lunch at beachfront restaurant → Bus back → Ice cream in town → Ship\n\n**Option 2 (City day):** Plaza de España → Market (kids love the colours) → Walk to Parque Marítimo for a swim → Ice cream → Ship'
    },
    send: {
      mobility: [
        'Port to town: Flat. If docking at Muelle Sur (long pier), free shuttle available to Plaza de España. Muelle Norte is only 5 mins walk.',
        'City centre: Santa Cruz is flat and generally wheelchair-friendly. Main streets and plazas are accessible. Some older streets have uneven surfaces.',
        'Plaza de España: Fully accessible, flat, paved.',
        'Auditorio walk: Flat promenade all the way. Accessible.',
        'Palmetum: Accessible paths, though some areas hillier than others.',
        'Market: Accessible ground floor. Can get crowded.',
        'Las Teresitas: Promenade accessible. Beach access may be challenging – check locally for accessible beach facilities.',
        'Mount Teide: Cable car station is accessible. The cable car itself can accommodate wheelchairs with advance notice – contact the operator. Summit trails are not accessible.',
        'Taxis: Available at port. Discuss requirements when booking.'
      ],
      quietSpots: [
        'Palmetum – Peaceful botanical garden, away from crowds.',
        'Parque García Sanabria – Large park, quiet corners.',
        'Plaza del Príncipe de Asturias – Small, leafy, calm.',
        'Las Teresitas early morning – Before the crowds arrive.',
        'Best timing: Early morning (just after ship arrives) or late afternoon. Midday can be busier in main squares.'
      ],
      sensory: [
        'Busy areas to be aware of: Plaza de España midday, Calle del Castillo (main shopping street) – can be crowded, Market mid-morning – busy, noisy, lots of smells, Bus to Las Teresitas – can be crowded',
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
      localSpeciality: 'Papas arrugadas – THE Canarian dish. Small potatoes boiled in very salty water until wrinkled. Served with mojo sauces. Absolutely must try.\n\nMojo sauces – Red (mojo rojo, spicy with chilli) and green (mojo verde, with coriander/parsley). Dip everything in them.\n\nCarne fiesta – Marinated pork cubes, garlicky and peppery. Delicious.\n\nGofio – Roasted grain flour, traditional Canarian staple. Used in everything from desserts to stews.\n\nQueso asado con mojo – Grilled local cheese with mojo. Simple, perfect.\n\nBarraquito – Layered coffee with Licor 43, condensed milk, and cinnamon. Sweet treat.\n\nLocal wines – Tenerife has excellent wines. Try a local white with seafood.',
      tips: [
        'Lunch timing: Lunch is typically 1:30-4pm. Some places close mid-afternoon then reopen for dinner.',
        'Tapas style: Order a few dishes to share. "Ración" = full portion, "media ración" = half.',
        'The market: Mercado de Nuestra Señora de África is great for grazing – try local cheese, fruits, and snacks from the stalls.',
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

Las Canteras beach is the star here – a gorgeous golden sand urban beach with a buzzing promenade lined with cafés, restaurants, and bars. It's the kind of place where you can happily spend an entire day doing nothing but soaking up the sun.`,
      weatherSeasonal: '21°C daytime, 14°C evening | Sea temperature ~19°C. Around 7 hours of sunshine, very little rain. Perfect beach weather.',
      portInfo: {
        dockLocation: 'Muelle Santa Catalina',
        distanceToTown: 'You\'re already there – mall and park within 2 mins walk',
        shuttleInfo: 'Not needed – everything is right there'
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
          content: 'The main event. Golden sand beach with a palm-lined promenade. One of the best urban beaches in Spain – possibly Europe. Walk through Santa Catalina Park and keep going.'
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
        content: '10-15 minute flat walk from the ship. Golden sand, calm water (protected by a natural reef), palm-lined promenade. Consistently rated among the best urban beaches in the world. March conditions: 21°C air, 19°C sea. Absolutely worth a beach visit – sunbathing, walking, or swimming if you\'re feeling brave. Facilities: Sunbeds and umbrellas for hire. Cafés and restaurants right on the promenade. Toilets available. Our take: This is the reason to visit Las Palmas. Don\'t overthink it – grab a spot on the beach, order a coffee or beer from a promenade café, and enjoy.',
        additional: [],
        mapLink: null
      },
      scenic: [
        'Las Canteras promenade – Bay views, surfers, city skyline, sunset shots',
        'Port waterfront – View back to the cruise ships',
        'La Puntilla – The northern end of Las Canteras, rocky outcrop with views'
      ],
      shopping: [
        'El Muelle Shopping Centre (2 mins from ship) – Modern mall right by the dock. Fashion, electronics, cafés. Weather-proof option.',
        'Streets around Las Canteras – More local shops, beachwear, souvenirs along the streets behind the promenade.',
        'Mesa y López area (15-20 mins walk) – The main shopping street for locals. Spanish high street brands, El Corte Inglés department store.',
        'Vegueta (bus or taxi – see Go Further) – Traditional shops, markets, more authentic souvenirs in the historic quarter.'
      ],
      coffee: [
        'Santa Catalina Park area – Several cafés within minutes of the ship',
        'Paseo de Las Canteras – Endless seafront cafés. Grab a cortado with an ocean view. Hard to go wrong.',
        'Any café with beach views – The whole point of Las Palmas is sitting with a coffee watching the waves.'
      ],
      bars: [
        'Las Canteras promenade – Bars all along the seafront. Casual cervecerías to cocktail bars with sea views.',
        'Santa Catalina area – Cluster of bars near the park.',
        'Irish/British pubs – A few scattered around Las Canteras area if you need a familiar fix.',
        'Sunset drinks: The promenade faces west. Find a bar, order a drink, watch the sunset. Perfect end to the day.'
      ],
      rainyDay: [
        'El Muelle Shopping Centre – Right by the dock. Covered shopping and cafés.',
        'Vegueta museums (bus or taxi) – Casa de Colón (Columbus House), CAAM (modern art). Indoor options in the historic quarter.'
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
          notes: '**Casa de Colón** – Columbus House museum. Christopher Columbus allegedly stayed here. Interesting history. **Santa Ana Cathedral** – Impressive cathedral on the main square. **CAAM** – Centro Atlántico de Arte Moderno. Contemporary art museum. **Wandering** – The streets themselves are the attraction. Balconies, courtyards, cafés.',
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
        'Playa de Las Canteras – Calm water (natural reef protects the beach), golden sand, space to play. The promenade has ice cream, snacks, toilets. Perfect for little ones.',
        'Santa Catalina Park – Space to run around, close to the ship. Trees for shade.',
        'The promenade – Flat, pushchair-friendly. Ice cream stops everywhere.'
      ],
      olderKids: [
        'Surfing/bodyboarding at Las Canteras – Lessons available. The beach has good waves at the southern end.',
        'Vegueta – Pirates-and-explorers history vibes. Columbus connections. Casa de Colón museum has interesting exhibits.',
        'El Muelle mall – Shops, food court, cinema if they need a break from the sun.'
      ],
      familyFood: [
        'Everywhere on Las Canteras promenade – Pizza, burgers, ice cream, tapas. Picky eaters easily accommodated.',
        'El Muelle mall – Food court with familiar options.',
        'Beach cafés – Simple grilled fish, chips, sandwiches.'
      ],
      warnings: [
        'Sun – It\'s strong even in March. Sunscreen, hats, shade breaks.',
        'Bikes/scooters on promenade – Keep little ones close.',
        'Waves at southern end of Las Canteras – Calmer in the middle where the reef protects.'
      ],
      easyDay: 'Walk to Las Canteras → Beach morning → Ice cream → Lunch on promenade → More beach or paddle → Walk back via Santa Catalina Park → Ship'
    },
    send: {
      mobility: [
        'Port to beach: Flat, wide pavements, easy crossings. Suitable for wheelchairs and mobility scooters.',
        'Las Canteras promenade: Largely step-free and smooth. Some side streets have short ramps or kerbs.',
        'Santa Catalina Park: Accessible, flat paths.',
        'El Muelle mall: Fully accessible.',
        'Beach access: Some access points to the sand. Check locally for accessible beach facilities/beach wheelchairs.',
        'Vegueta: Cobbled streets – more challenging for wheelchairs. Some uneven surfaces.'
      ],
      quietSpots: [
        'Northern/southern ends of Las Canteras – Away from the busiest central stretch.',
        'Ciudad Jardín – Leafy residential area, calmer than the beach zone.',
        'Santa Catalina Park corners – Quieter spots away from any events.',
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
          description: 'Dozens of options right on the seafront. Fish, paella, tapas, international. Hard to go wrong – look for busy places with locals.'
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
      localSpeciality: 'Papas arrugadas – Same as Tenerife. Wrinkled potatoes with mojo sauces. Must try.\n\nMojo sauces – Red (spicy) and green (herby). Dip everything.\n\nFresh Atlantic fish – Grilled simply. Whatever\'s fresh that day.\n\nGofio – Traditional roasted grain. Used in various dishes and desserts.\n\nCanarian wines – Local wines worth trying, especially whites with seafood.',
      tips: [
        'Lunch timing: 1pm-3:30pm typically. Beach area serves food all day.',
        'Menu del día: Look for set lunch menus for good value.',
        'Fish restaurants: Point at what looks good in the display. Simple grilled = delicious.',
        'Cards: Widely accepted. Small beach bars may prefer cash.'
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
