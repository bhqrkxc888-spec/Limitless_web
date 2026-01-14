/**
 * Destinations Data
 * Cruise destination information for the site
 */

export const destinations = [
  {
    id: 'mediterranean',
    slug: 'mediterranean-cruises',
    name: 'Mediterranean',
    tagline: 'Sun-soaked ports and iconic cities',
    description: 'Mediterranean cruises combine historic cities, island-hopping and beach time in one trip, with easy access from UK airports. They appeal to couples, families and culture lovers who want varied ports with relatively short sea days.',
    image: 'null',
    featured: true,
    // Coordinates for API integration (Barcelona as primary port)
    coordinates: {
      lat: 41.3851,
      lon: 2.1734,
      ports: [
        { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734 },
        { name: 'Civitavecchia (Rome)', country: 'Italy', lat: 42.0930, lon: 11.7960 },
        { name: 'Piraeus (Athens)', country: 'Greece', lat: 37.9420, lon: 23.6460 },
        { name: 'Venice (Marghera area)', country: 'Italy', lat: 45.4450, lon: 12.3130 },
        { name: 'Dubrovnik', country: 'Croatia', lat: 42.6507, lon: 18.0944 }
      ]
    },
    regions: [
      'Western Mediterranean',
      'Eastern Mediterranean',
      'Greek Isles',
      'Adriatic & Dalmatian Coast'
    ],
    highlights: [
      'Explore Western Mediterranean classics such as Barcelona, Rome and the French Riviera with short sailings between ports and plenty of time ashore.',
      'Cruise the Greek Isles to visit islands like Santorini and Mykonos, combining whitewashed villages, beaches and archaeological sites.',
      'Sail the Adriatic to visit Dubrovnik, Kotor and Split, where walled cities and dramatic coastlines are the main draw.',
      'Link multiple countries in one trip, often visiting Spain, France, Italy and Greece on a single itinerary with convenient fly-cruise options from UK airports.',
      'Enjoy warm to hot summer weather, with shoulder-season sailings in spring and autumn that offer fewer crowds and milder temperatures.'
    ],
    bestTime: 'April - October (peak June - September for hot weather, April-May and late September-October for cooler temperatures and fewer crowds)',
    cruiseLines: [
      'Royal Caribbean',
      'MSC Cruises',
      'Norwegian Cruise Line',
      'P&O Cruises',
      'Princess Cruises',
      'Celebrity Cruises'
    ],
    meta: {
      title: 'Mediterranean Cruises | Iconic Cities & Islands | Limitless Cruises',
      description: 'Book Mediterranean cruises from the UK. Discover Greek islands, Spanish and Italian ports, the French Riviera and Adriatic gems with expert help from Limitless Cruises.'
    },
    whyCruise: 'Cruising the Mediterranean allows guests to visit several countries and major cities in one holiday without constant packing, unpacking or internal flights, which is especially appealing for UK travellers with limited annual leave. Itineraries often include a mix of headline ports such as Barcelona, Rome and Athens alongside smaller islands or coastal towns, giving a balance of big sights and more relaxed days. Compared with land-based trips, cruising also simplifies logistics around ferries, train tickets and language barriers, as everything is coordinated and pre-arranged.\n\nMediterranean cruises appeal to a wide range of travellers, from first-time cruisers and families to culture-focused guests and food lovers. The variety of itineraries means guests can choose port-intensive weeks with minimal sea days or longer voyages that incorporate more time on board. For UK travellers, the region is well served by regional flights and some no-fly departures, making it one of the most accessible cruise choices.\n\nThe Mediterranean is one of the most popular cruise regions worldwide, with a long sailing season from spring to late autumn and a mix of culture, beaches, history and food that works well for UK guests. Cruises range from classic week-long loops to longer voyages that link Western and Eastern Mediterranean ports in a single itinerary.',
    signatureExperiences: [
      {
        title: 'Classic Western Mediterranean circuit',
        description: 'Visit Barcelona, Marseille or Cannes, Florence/Pisa (La Spezia or Livorno) and Rome on a one-week voyage, often with an island stop in Palma or Corsica.',
        ports: ['Barcelona', 'Marseille', 'Civitavecchia (Rome)', 'La Spezia']
      },
      {
        title: 'Greek Isles island-hopping',
        description: 'Combine Athens with islands such as Santorini, Mykonos and Rhodes, focusing on beaches, sunsets and historic sites like the Acropolis and ancient Delos.',
        ports: ['Piraeus (Athens)', 'Santorini', 'Mykonos']
      },
      {
        title: 'Adriatic and Dalmatian coast',
        description: 'Sail between Venice area ports, Split, Dubrovnik and Kotor, with a focus on medieval walled towns, UNESCO sites and scenic coastal sailing.',
        ports: ['Venice (Marghera area)', 'Split', 'Dubrovnik', 'Kotor']
      },
      {
        title: 'Eastern Mediterranean with Holy Land',
        description: 'Longer voyages may include Greek ports combined with visits to Israeli or Cypriot ports, focusing on religious and historic landmarks.',
        ports: ['Piraeus (Athens)', 'Limassol']
      }
    ],
    whatToExpect: {
      weather: 'Summers in the Mediterranean are typically hot and dry, especially from June to August, with temperatures often in the mid to high twenties or higher in southern areas. Spring and autumn offer milder temperatures, more comfortable sightseeing and generally fewer crowds while still providing good sunshine.',
      portDays: 'Most Mediterranean cruises are port-intensive, often with a port call almost every day or with only one or two full sea days on a seven-night itinerary. Longer itineraries or repositioning voyages may include more sea days, particularly when linking Western and Eastern Mediterranean regions.',
      cultural: 'Guests encounter a mix of languages and customs across countries, but English is widely spoken in major tourist areas and cruise ports. Dress codes in churches and religious sites often require shoulders and knees to be covered, so modest clothing is recommended for certain excursions.',
      cruiseLength: 'Typical Mediterranean cruise durations are 7, 10 or 14 nights, with seven-night loops focused on either Western or Eastern sections. Longer itineraries often combine Western, Eastern, Greek Isles and Adriatic ports or form part of grand voyages linking to the Atlantic or Northern Europe.'
    },
    popularItineraries: [
      {
        name: 'Western Mediterranean Highlights',
        duration: '7 nights',
        ports: ['Barcelona', 'Marseille', 'La Spezia (Florence/Pisa)', 'Civitavecchia (Rome)', 'Naples', 'Palma de Mallorca'],
        overview: 'A classic Western Mediterranean loop linking Spain, France and Italy, focused on big-name cities, coastal scenery and short overnight flights from the UK.'
      },
      {
        name: 'Greek Isles & Eastern Mediterranean',
        duration: '7 - 10 nights',
        ports: ['Piraeus (Athens)', 'Santorini', 'Mykonos', 'Rhodes', 'Heraklion'],
        overview: 'Island-hop between some of Greece\'s best-known ports with time in Athens, combining beaches, villages and archaeological sites.'
      },
      {
        name: 'Adriatic & Dalmatian Coast Voyage',
        duration: '7 - 10 nights',
        ports: ['Venice (Marghera area)', 'Split', 'Dubrovnik', 'Kotor', 'Zadar'],
        overview: 'Focus on the Adriatic shoreline, visiting walled cities and historic ports with scenic sailing through bays and island-studded coastlines.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Mediterranean?',
        answer: 'The main Mediterranean cruise season runs from April to October, with June to September offering the hottest weather and the most sailings. Spring and autumn are popular for cooler temperatures, slightly lower prices and fewer crowds.'
      },
      {
        question: 'Is the Mediterranean good for first-time cruisers?',
        answer: 'Yes, the Mediterranean is one of the most popular choices for first-time cruisers, thanks to short flights from the UK, varied ports and relatively calm seas in summer. Itineraries are port-heavy, so guests see a lot in one holiday without complex logistics.'
      },
      {
        question: 'How long should I cruise the Mediterranean?',
        answer: 'Seven nights is enough for a focused Western or Eastern Mediterranean loop visiting several key ports. For a more relaxed pace or to combine regions, 10 to 14 nights allows time for extra stops and a better balance of sea days and port days.'
      },
      {
        question: 'What are the must-see ports in the Mediterranean?',
        answer: 'Popular ports include Barcelona, Rome (Civitavecchia), Athens (Piraeus), Venice area ports, Dubrovnik and Greek islands such as Santorini and Mykonos. Many itineraries also include Florence/Pisa via La Spezia or Livorno and French Riviera ports.'
      },
      {
        question: 'Is the Mediterranean suitable for families and couples?',
        answer: 'The Mediterranean works well for both families and couples, with beach days, city sightseeing and child-friendly excursions in many ports. A wide choice of ships, from resort-style to more premium lines, makes it easy to match the holiday style to different travellers.'
      },
      {
        question: 'Can I cruise the Mediterranean from the UK?',
        answer: 'There are some no-fly Mediterranean cruises departing from UK ports, usually on longer itineraries that take a few days to reach the region. Most guests choose fly-cruise options from UK airports to Barcelona, Rome and other hubs, which maximises time in the Mediterranean itself.'
      }
    ]
  },
  {
    id: 'caribbean',
    slug: 'caribbean-cruises',
    name: 'Caribbean',
    tagline: 'Tropical islands and turquoise seas',
    description: 'Caribbean cruises focus on white-sand beaches, clear water and relaxed island ports, with itineraries that suit families, couples and winter sun seekers. Guests can visit several islands in one holiday with convenient fly-cruise options from UK airports.',
    image: 'null',
    featured: true,
    // Coordinates for API integration (San Juan, Puerto Rico as primary port)
    coordinates: {
      lat: 18.4663,
      lon: -66.1057,
      ports: [
        { name: 'San Juan', country: 'Puerto Rico', lat: 18.4663, lon: -66.1057 },
        { name: 'Bridgetown', country: 'Barbados', lat: 13.0975, lon: -59.6145 },
        { name: 'Miami', country: 'United States', lat: 25.7743, lon: -80.1937 },
        { name: 'Cozumel', country: 'Mexico', lat: 20.4220, lon: -86.9223 },
        { name: 'St Thomas (Charlotte Amalie)', country: 'US Virgin Islands', lat: 18.3419, lon: -64.9307 }
      ]
    },
    regions: [
      'Eastern Caribbean',
      'Western Caribbean',
      'Southern Caribbean',
      'Bahamas'
    ],
    highlights: [
      'Island-hop between white-sand beaches and coral reefs, with popular stops such as Barbados, St Lucia, Antigua and St Maarten offering classic Caribbean scenery.',
      'Choose Eastern Caribbean routes for a mix of beaches and duty-free shopping, often including ports like St Thomas, St Maarten and San Juan.',
      'Opt for Western Caribbean itineraries featuring Cozumel, Grand Cayman and Jamaican ports, with options for snorkelling, Mayan ruins and active shore excursions.',
      'Explore the Southern Caribbean for a more port-intensive feel, visiting islands such as Barbados, St Lucia, Grenada and Aruba with longer sunshine hours in winter.',
      'Enjoy warm tropical weather during the UK winter, with many ships repositioning to the Caribbean between autumn and spring for extended seasons.'
    ],
    bestTime: 'December - April (dry season, lower humidity, peak for UK winter sun). Hurricane season typically runs June - November, with the highest risk from August to October.',
    cruiseLines: [
      'Royal Caribbean',
      'Carnival Cruise Line',
      'Norwegian Cruise Line',
      'MSC Cruises',
      'P&O Cruises',
      'Princess Cruises'
    ],
    meta: {
      title: 'Caribbean Cruises | Island-Hopping & Winter Sun | Limitless Cruises',
      description: 'Book Caribbean cruises from the UK. Explore white-sand beaches, clear reefs and Eastern, Western and Southern Caribbean islands. Expert advice from Limitless Cruises.'
    },
    whyCruise: 'Cruising is one of the simplest ways to see multiple Caribbean islands in one trip without organising inter-island flights or ferries. Guests unpack once and wake up to a new island most days, with easy access to beaches, water sports and local towns straight from the port. For UK travellers, the Caribbean is especially attractive in winter, combining reliable warmth with ships that are geared towards families, couples and multigenerational groups.\n\nCruise itineraries also make it easier to manage budgets, as many sailings are full board with drinks packages available, and activities can be tailored port by port. The choice of homeports such as Miami, Fort Lauderdale and Barbados provides flexibility on flights, and some UK-based ships operate no-fly options that sail across the Atlantic before beginning Caribbean loops.\n\nThe Caribbean is one of the most in-demand cruise regions for UK guests, offering year-round warmth, beach-focused ports and a wide choice of mainstream and premium ships. Itineraries range from short island-hopping cruises to longer voyages that combine Eastern, Western and Southern Caribbean routes in a single trip.',
    signatureExperiences: [
      {
        title: 'Eastern Caribbean island-hopping',
        description: 'Visit classic Eastern Caribbean ports such as St Thomas, St Maarten and San Juan, combining beach time, shopping and historic old towns.',
        ports: ['St Thomas (Charlotte Amalie)', 'Philipsburg (St Maarten)', 'San Juan']
      },
      {
        title: 'Western Caribbean with Mayan ruins',
        description: 'Sail from Florida to Cozumel, Grand Cayman and Jamaican ports, with excursions to Mayan archaeological sites alongside snorkelling and beach breaks.',
        ports: ['Miami', 'Cozumel', 'George Town (Grand Cayman)', 'Falmouth (Jamaica)']
      },
      {
        title: 'Southern Caribbean from Barbados',
        description: 'Use Barbados as a turnaround port for a port-heavy itinerary visiting islands such as St Lucia, Grenada and Antigua, ideal for scenic cruising and beach days.',
        ports: ['Bridgetown', 'Castries (St Lucia)', 'St George\'s (Grenada)', 'St John\'s (Antigua)']
      },
      {
        title: 'Private island beach days',
        description: 'Many lines include a stop at their private islands or beach resorts, offering controlled environments with water sports, food venues and family-friendly facilities.',
        ports: ['CocoCay (Royal Caribbean private island)', 'Ocean Cay (MSC Cruises private island)']
      }
    ],
    whatToExpect: {
      weather: 'The Caribbean has a tropical climate with warm temperatures for most of the year, making it a prime choice for winter sun. The dry season from December to April usually brings lower humidity and less rainfall, while the wet and hurricane season from June to November can mean higher heat, more showers and the potential for itinerary changes.',
      portDays: 'Most seven-night Caribbean cruises are port-focused, with three to five port calls and one or two full sea days, especially on round-trips from Florida. Longer itineraries or sailings starting in the Southern Caribbean may include additional sea days to cover longer distances between islands or to and from the mainland.',
      cultural: 'Island cultures vary but share relaxed attitudes, with English widely spoken in many ports, especially in former British territories and main tourist hubs. Guests should be mindful of local customs, tipping expectations and safety advice, particularly when exploring independently away from the port.',
      cruiseLength: 'Typical Caribbean cruises are 7 nights, particularly those sailing round-trip from Florida, but 10, 11 and 14-night itineraries are common for Southern Caribbean or combination routes. UK-based no-fly Caribbean seasons usually involve longer voyages, often 14 nights or more, including Atlantic crossings or extended island chains.'
    },
    popularItineraries: [
      {
        name: 'Eastern Caribbean Highlights',
        duration: '7 nights',
        ports: ['Miami', 'St Thomas (Charlotte Amalie)', 'Philipsburg (St Maarten)', 'San Juan', 'Line private island'],
        overview: 'A classic Eastern Caribbean route from Florida, balancing beach days, shopping and historic old towns, plus a private island stop for watersports and relaxation.'
      },
      {
        name: 'Western Caribbean & Mexico',
        duration: '7 nights',
        ports: ['Miami', 'Cozumel', 'George Town (Grand Cayman)', 'Falmouth (Jamaica)', 'Line private island'],
        overview: 'Focuses on Western Caribbean ports with snorkelling, Mayan ruins excursions and relaxed beach bars, often combined with a private island beach day.'
      },
      {
        name: 'Southern Caribbean from Barbados',
        duration: '10 - 14 nights',
        ports: ['Bridgetown', 'Castries (St Lucia)', 'St George\'s (Grenada)', 'St John\'s (Antigua)', 'Basseterre (St Kitts)'],
        overview: 'A port-intensive Southern Caribbean itinerary with scenic sailing between lush islands, ideal for guests who want fewer sea days and more island time.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Caribbean?',
        answer: 'The most popular time for Caribbean cruises is December to April when the weather is typically drier and less humid, making it ideal for UK winter sun. Sailings operate year-round, but the main hurricane period is June to November.'
      },
      {
        question: 'Is the Caribbean good for first-time cruisers?',
        answer: 'Yes, the Caribbean is one of the easiest destinations for first-time cruisers, with resort-style ships, familiar facilities and straightforward shore excursions. Warm weather and plenty of beach-focused ports make it appealing for families and couples alike.'
      },
      {
        question: 'How long should I cruise the Caribbean?',
        answer: 'Seven-night itineraries are common and work well for first-timers or those tied to school holidays. Longer 10 to 14-night cruises allow guests to see more islands and often include Southern Caribbean or combination Eastern and Western routes.'
      },
      {
        question: 'What are the must-see ports in the Caribbean?',
        answer: 'Popular ports include Barbados, St Lucia, Antigua, St Thomas, St Maarten and Cozumel, each offering a mix of beaches, water sports and local culture. Many itineraries also feature private island stops that are tailored for cruise guests.'
      },
      {
        question: 'Is the Caribbean suitable for families and couples?',
        answer: 'The Caribbean is very well suited to both families and couples, with family-friendly ships, kids\' clubs and plenty of beach days for younger travellers. Couples can focus on quieter beaches, spa days and more premium ships or adult-focused areas.'
      },
      {
        question: 'Can I cruise the Caribbean from the UK?',
        answer: 'Most Caribbean cruises for UK guests are fly-cruise holidays using flights to Florida, Barbados or other gateway ports. A smaller number of no-fly options sail from UK ports, usually as longer itineraries that include an Atlantic crossing before beginning Caribbean island visits.'
      }
    ]
  },
  {
    id: 'norwegian-fjords',
    slug: 'norwegian-fjords-cruises',
    name: 'Norwegian Fjords',
    tagline: 'Dramatic fjords and coastal villages',
    description: 'Norwegian Fjords cruises showcase steep cliffs, waterfalls and traditional coastal towns, with many itineraries sailing directly from UK ports. They suit nature lovers, photographers and guests who prefer cooler summer temperatures and scenic cruising over beach days.',
    image: 'null',
    featured: true,
    // Coordinates for API integration (Bergen as primary port)
    coordinates: {
      lat: 60.3971,
      lon: 5.3245,
      ports: [
        { name: 'Bergen', country: 'Norway', lat: 60.3971, lon: 5.3245 },
        { name: 'Geiranger', country: 'Norway', lat: 62.1015, lon: 7.2050 },
        { name: 'Flåm', country: 'Norway', lat: 60.8610, lon: 7.1130 },
        { name: 'Ålesund', country: 'Norway', lat: 62.4723, lon: 6.1549 },
        { name: 'Stavanger', country: 'Norway', lat: 58.9690, lon: 5.7331 }
      ]
    },
    regions: [
      'Western Fjords',
      'Geirangerfjord & Hjørundfjord',
      'Sognefjord & Nærøyfjord',
      'North Cape & Arctic Norway'
    ],
    highlights: [
      'Sail through deep fjords such as Geirangerfjord and Sognefjord, where sheer cliffs, waterfalls and small farms create some of Europe\'s most dramatic coastal scenery.',
      'Visit traditional ports like Bergen, Ålesund and Stavanger, combining colourful wooden houses and fish markets with easy access to surrounding viewpoints.',
      'Experience long summer days and, on some itineraries further north, the midnight sun, with extended light for scenic cruising and shore excursions.',
      'Choose convenient no-fly cruises from UK ports to the Fjords, reducing airport time and making the region accessible for guests who prefer sailing from closer to home.',
      'Enjoy active excursions such as hiking, kayaking, RIB boat trips and scenic railway journeys, alongside more relaxed sightseeing tours and viewpoint visits.'
    ],
    bestTime: 'May - September (peak season June - August for warmer temperatures and long daylight; May and September are cooler but often quieter)',
    cruiseLines: [
      'P&O Cruises',
      'Princess Cruises',
      'Royal Caribbean',
      'MSC Cruises',
      'Cunard',
      'Norwegian Cruise Line'
    ],
    meta: {
      title: 'Norwegian Fjords Cruises | Scenic Sailing from the UK | Limitless Cruises',
      description: 'Book Norwegian Fjords cruises from UK ports. Sail past waterfalls and cliffs, visit Bergen and Geiranger, and enjoy Norway\'s spectacular fjord scenery.'
    },
    whyCruise: 'Cruising is one of the most effective ways to see the Norwegian Fjords, as many of the most impressive views are only accessible from the water and the ship sails directly into the fjords themselves. Guests can enjoy extended scenic cruising from open decks and lounges, with commentary and photo opportunities without needing to arrange separate boat trips. For UK travellers, the availability of no-fly departures from UK ports makes Fjords itineraries particularly convenient and attractive.\n\nNorwegian Fjords cruises appeal to travellers who value scenery, fresh air and outdoor activities over hot weather and beach time. Ships visiting the region range from family-friendly mainstream vessels to more traditional or premium lines, so guests can match the onboard style to their preferences while still enjoying similar port calls.\n\nNorwegian Fjords cruises focus on dramatic scenery, long summer daylight and easy access to small coastal towns, making them particularly appealing for UK guests who want a no-fly or short-flight holiday with a strong sense of place. Itineraries often combine famous fjords with charming ports, offering scenic cruising directly from the ship as well as shore excursions to viewpoints, waterfalls and glaciers.',
    signatureExperiences: [
      {
        title: 'Sailing into Geirangerfjord',
        description: 'Cruise along one of Norway\'s most famous fjords, passing waterfalls and steep cliffs before arriving in the small village of Geiranger, with excursions to viewpoints such as Dalsnibba.',
        ports: ['Geiranger']
      },
      {
        title: 'Flåm Railway and Sognefjord',
        description: 'Take the Flåm Railway from the fjord up into the mountains, combining a scenic train journey with time in the small village of Flåm and surrounding viewpoints.',
        ports: ['Flåm']
      },
      {
        title: 'Historic Bryggen in Bergen',
        description: 'Stroll along Bergen\'s historic Bryggen wharf, explore the fish market and take the funicular to Mount Fløyen for panoramic views over the city and surrounding islands.',
        ports: ['Bergen']
      },
      {
        title: 'Lysefjord and Pulpit Rock views',
        description: 'From Stavanger, join boat trips or hikes for views of Lysefjord and the famous Preikestolen (Pulpit Rock) cliff, a highlight for active guests and photographers.',
        ports: ['Stavanger']
      }
    ],
    whatToExpect: {
      weather: 'The Norwegian Fjords region has a cool maritime climate, with summer temperatures typically in the low to mid-teens Celsius, occasionally warmer on sunny days. Weather can change quickly, so guests should expect a mix of sun, cloud and showers even in peak season and pack layers, waterproofs and sturdy footwear.',
      portDays: 'Fjords itineraries are often quite port-focused, with scenic cruising within fjords counted as part of port days or as dedicated scenic periods alongside calls in nearby towns. No-fly cruises from the UK usually include sea days at the beginning and end of the voyage while crossing the North Sea, with multiple port or fjord days in the middle.',
      cultural: 'Norway is relaxed and welcoming, with high levels of English spoken in ports and on excursions. Prices ashore can feel higher than in the UK, particularly for food and drink, so many guests choose to eat on board and focus spending on key excursions or attractions.',
      cruiseLength: 'Typical Norwegian Fjords cruises from the UK are 7 nights, giving time for two North Sea crossings and several fjord ports. Longer 10 to 14-night itineraries may add extra ports, more distant fjords or extend further north towards the Arctic Circle and North Cape.'
    },
    popularItineraries: [
      {
        name: 'Classic Norwegian Fjords from the UK',
        duration: '7 nights',
        ports: ['Southampton or other UK port', 'Bergen', 'Flåm', 'Geiranger', 'Stavanger'],
        overview: 'A well-balanced Fjords itinerary from a UK departure port, combining scenic fjord cruising with visits to classic ports such as Bergen, Flåm and Geiranger.'
      },
      {
        name: 'Western Fjords and Ålesund',
        duration: '7 - 9 nights',
        ports: ['UK port', 'Bergen', 'Ålesund', 'Geiranger', 'Olden or Nordfjord'],
        overview: 'Adds Ålesund and additional fjords to the classic route, with a focus on varied landscapes, glaciers and coastal towns.'
      },
      {
        name: 'Norwegian Fjords and North Cape',
        duration: '10 - 14 nights',
        ports: ['UK port', 'Bergen', 'Ålesund', 'Tromsø', 'Honningsvåg (North Cape)'],
        overview: 'Extends north beyond the traditional fjord region towards the Arctic, suitable for guests seeking midnight sun and more remote landscapes in addition to classic fjords.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Norwegian Fjords?',
        answer: 'The main season for Norwegian Fjords cruises runs from May to September, with June, July and August offering the warmest temperatures and longest days. May and September are cooler but often quieter, which can appeal to guests who prefer fewer crowds.'
      },
      {
        question: 'Are Norwegian Fjords cruises good for first-time cruisers?',
        answer: 'Yes, Fjords cruises work well for first-time cruisers who value scenery and cooler temperatures rather than hot weather. Many itineraries depart from UK ports, so guests can avoid flying and experience a relatively gentle introduction to cruising.'
      },
      {
        question: 'How long should I cruise the Norwegian Fjords?',
        answer: 'Seven nights is a common length and provides enough time to visit several fjords and ports on a round-trip from the UK. Longer itineraries of 10 nights or more allow ships to reach more remote areas or combine fjords with Arctic Norway or Iceland.'
      },
      {
        question: 'What are the must-see ports in the Norwegian Fjords?',
        answer: 'Key ports and fjord villages include Bergen, Geiranger, Flåm, Ålesund and Stavanger, each offering access to viewpoints, scenic railways or fjord excursions. Many itineraries are built around a selection of these ports combined with additional fjords or small towns.'
      },
      {
        question: 'Are Norwegian Fjords cruises suitable for families and couples?',
        answer: 'Norwegian Fjords cruises suit both couples and families who enjoy outdoor activities, scenic views and cooler summer weather. Family-friendly ships offer kids\' clubs and pools, while couples often choose itineraries for photography, hiking and quieter evenings on board.'
      },
      {
        question: 'Can I cruise the Norwegian Fjords from the UK?',
        answer: 'Yes, many Norwegian Fjords cruises depart directly from UK ports such as Southampton, making them popular no-fly options. These sailings usually include North Sea sea days at the start and end, with several days spent in fjords and coastal ports in between.'
      }
    ]
  },
  // NEW DESTINATIONS BELOW
  {
    id: 'alaska',
    slug: 'alaska-cruises',
    name: 'Alaska',
    tagline: 'Glaciers, wildlife and frontier towns',
    description: 'Alaska cruises offer glacier viewing, whale watching and visits to frontier-style towns in one trip, usually from Seattle, Vancouver or Anchorage. They suit nature lovers, photographers and guests who prefer cooler summers and dramatic scenery over beach-focused holidays.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 58.3019,
      lon: -134.4197,
      ports: [
        { name: 'Juneau', country: 'United States', lat: 58.3019, lon: -134.4197 },
        { name: 'Ketchikan', country: 'United States', lat: 55.3422, lon: -131.6461 },
        { name: 'Skagway', country: 'United States', lat: 59.4583, lon: -135.3139 },
        { name: 'Sitka', country: 'United States', lat: 57.0531, lon: -135.3300 },
        { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207 }
      ]
    },
    regions: [
      'Inside Passage',
      'Glacier Bay',
      'Gulf of Alaska',
      'Southeast Alaska'
    ],
    highlights: [
      'Sail the Inside Passage, a sheltered coastal route lined with forests and islands, with opportunities to see whales, eagles and other wildlife from the ship.',
      'Spend a day cruising Glacier Bay or another glacier area, watching tidewater glaciers calve and learning about the region from park rangers on board.',
      'Visit frontier-style ports such as Juneau, Skagway and Ketchikan, combining gold rush history, Native culture and access to mountains, fjords and forests.',
      'Join shore excursions including whale watching, dog sledding (on snowfields in season), glacier walks, ziplines, hiking and scenic rail journeys.',
      'Combine Alaska with a land tour before or after the cruise, adding time in Anchorage, Denali National Park or the Yukon on certain itineraries.'
    ],
    bestTime: 'May - September (peak season June - August for warmer temperatures and long daylight; May and September can be cooler, with fewer crowds and lower prices)',
    cruiseLines: [
      'Princess Cruises',
      'Holland America Line',
      'Royal Caribbean',
      'Norwegian Cruise Line',
      'Celebrity Cruises',
      'Carnival Cruise Line'
    ],
    meta: {
      title: 'Alaska Cruises | Glaciers, Wildlife & Inside Passage | Limitless Cruises',
      description: 'Book Alaska cruises from the UK. Sail the Inside Passage, see glaciers and whales, and visit Juneau, Skagway and Ketchikan with expert help from Limitless Cruises.'
    },
    whyCruise: 'Cruising is one of the most efficient ways to experience Alaska\'s coastal scenery, as many of the fjords, glaciers and small communities are easier to reach by ship than by road. Guests can enjoy extended scenic cruising days where the ship slows near glaciers and wildlife-rich areas, allowing time on deck or in lounges without extra transfers. For UK travellers, cruise itineraries also simplify logistics around internal flights, long driving distances and limited hotel options in smaller towns.\n\nAlaska cruises appeal to travellers who value wildlife, landscapes and outdoor activities, including multi-generational groups where some guests may prefer gentle sightseeing while others choose more active excursions. The variety of ships, from large resort-style vessels to more premium or smaller ships, allows guests to choose the onboard experience that best matches their style while seeing similar highlights.\n\nAlaska cruises focus on glaciers, wildlife and remote coastal scenery, with most itineraries sailing through protected passages rather than open ocean, which works well for UK guests who enjoy nature and cooler climates. Typical routes link Inside Passage ports with glacier viewing days, giving a balance of small towns, First Nations culture and big landscape moments from the ship.',
    signatureExperiences: [
      {
        title: 'Glacier Bay National Park cruising',
        description: 'Spend a day in Glacier Bay, watching multiple glaciers and listening for the crack and splash of calving ice, often with park rangers providing commentary on board.',
        ports: ['Glacier Bay (scenic cruising)']
      },
      {
        title: 'White Pass & Yukon Route Railway',
        description: 'From Skagway, ride the historic mountain railway into the coastal mountains, with steep drops, bridges and gold rush history.',
        ports: ['Skagway']
      },
      {
        title: 'Whale watching from Juneau',
        description: 'Join a dedicated whale-watching excursion from Juneau, with good chances to see humpback whales and sometimes orcas during the main season.',
        ports: ['Juneau']
      },
      {
        title: 'Misty Fjords and Ketchikan',
        description: 'Explore the rainforest landscape around Ketchikan, with options for floatplane tours over Misty Fjords, kayak trips or strolls along historic Creek Street.',
        ports: ['Ketchikan']
      }
    ],
    whatToExpect: {
      weather: 'Alaska\'s cruise season has cool to mild temperatures, with typical daytime highs from single digits to mid-teens Celsius depending on month and location. Rain is common, especially in Southeast Alaska, so guests should pack waterproof layers, hats and gloves, even for summer sailings.',
      portDays: 'Most round-trip Inside Passage cruises include three to four port days plus at least one dedicated scenic cruising day in a glacier area. One-way Gulf of Alaska itineraries between Vancouver and Whittier or Seward may add extra scenic days or different ports, with slightly more open-water sailing across the Gulf.',
      cultural: 'Alaskan ports blend Native heritage, Russian and American frontier history, with museums, totem parks and cultural centres in many towns. Tipping is customary in restaurants, bars and on tours, similar to the rest of the United States and Canada, and prices can feel higher in remote areas due to logistics.',
      cruiseLength: 'Typical Alaska cruises are 7 nights, either round-trip from Vancouver or Seattle, or one-way between Vancouver and an Alaskan port near Anchorage. Many guests add a pre or post-cruise land tour of 3 to 7 nights to visit Denali or the interior, often arranged through the cruise line.'
    },
    popularItineraries: [
      {
        name: 'Inside Passage round-trip from Vancouver',
        duration: '7 nights',
        ports: ['Vancouver', 'Juneau', 'Skagway', 'Ketchikan', 'Glacier Bay (scenic cruising)'],
        overview: 'A classic Inside Passage itinerary combining three key ports with a full day of glacier viewing, ideal for first-time visitors to Alaska.'
      },
      {
        name: 'Seattle to Alaska Inside Passage',
        duration: '7 nights',
        ports: ['Seattle', 'Juneau', 'Skagway or Sitka', 'Ketchikan', 'Scenic cruising day'],
        overview: 'Round-trip from Seattle, convenient for combining with a city break and popular with guests who prefer US flights and turnaround ports.'
      },
      {
        name: 'Gulf of Alaska with Denali option',
        duration: '7 nights cruise plus optional 3 - 7 nights land',
        ports: ['Vancouver', 'Ketchikan', 'Juneau', 'Skagway', 'College Fjord or Hubbard Glacier', 'Whittier or Seward'],
        overview: 'One-way cruise paired with optional rail and coach tours into Alaska\'s interior, including Denali National Park and other wilderness areas.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise Alaska?',
        answer: 'The main Alaska cruise season is May to September, with June, July and August offering the warmest temperatures and most frequent whale sightings. May and September are cooler and can be quieter, sometimes with better value.'
      },
      {
        question: 'Is Alaska good for first-time cruisers?',
        answer: 'Yes, Alaska is a strong choice for first-time cruisers who prioritise scenery and wildlife over hot weather. The mix of sheltered Inside Passage sailing and well-developed ports makes it accessible while still feeling adventurous.'
      },
      {
        question: 'How long should I cruise Alaska?',
        answer: 'Seven nights is standard and provides a good introduction to key ports and at least one glacier day. Guests who want to add Denali or more wilderness time often choose a cruise-tour that adds several nights on land before or after the cruise.'
      },
      {
        question: 'What are the must-see ports in Alaska?',
        answer: 'Juneau, Skagway and Ketchikan are the core ports on many itineraries, offering glacier access, historic railways and rainforest scenery. Sitka, Icy Strait Point and Hubbard Glacier or Glacier Bay are also highly rated when included.'
      },
      {
        question: 'Is Alaska suitable for families and couples?',
        answer: 'Alaska works well for both families and couples who enjoy wildlife, scenery and outdoor activities. Family-friendly ships add kids\' clubs and pools, while couples may opt for more premium lines or balcony cabins for private glacier viewing.'
      },
      {
        question: 'Can I cruise Alaska from the UK?',
        answer: 'Most Alaska cruises for UK guests are fly-cruise holidays via Vancouver, Seattle or Anchorage-area ports. Some longer repositioning and grand voyages sail from the UK to Alaska, but these are less common and usually take several weeks.'
      }
    ]
  },
  {
    id: 'baltics-northern-europe',
    slug: 'baltics-northern-europe-cruises',
    name: 'Baltics & Northern Europe',
    tagline: 'Culture-rich cities and cooler summers',
    description: 'Baltics and Northern Europe cruises visit capital cities, medieval ports and Scandinavian hubs in one itinerary, often on no-fly sailings from UK ports. They suit guests who enjoy history, architecture and cooler summer temperatures rather than beach days.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 59.3293,
      lon: 18.0686,
      ports: [
        { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
        { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
        { name: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384 },
        { name: 'Tallinn', country: 'Estonia', lat: 59.4370, lon: 24.7536 },
        { name: 'Riga', country: 'Latvia', lat: 56.9496, lon: 24.1052 }
      ]
    },
    regions: [
      'Baltic Capitals',
      'Scandinavia & Fjords',
      'North Sea & Low Countries',
      'Arctic & North Cape'
    ],
    highlights: [
      'Explore Baltic capitals such as Stockholm, Tallinn, Riga and Helsinki, with a mix of medieval old towns, waterfront districts and modern Nordic culture.',
      'Visit Scandinavian cities including Copenhagen and Oslo, often combined with nearby castles, palaces and scenic coastal areas.',
      'Choose itineraries that mix Baltic ports with Norwegian fjords or North Cape for extended scenic cruising and midnight sun on longer summer sailings.',
      'Enjoy comfortable summer temperatures that are ideal for sightseeing, with long daylight hours that extend time ashore and on deck.',
      'Benefit from convenient departures from UK ports on many itineraries, reducing or removing the need for flights and simplifying travel logistics.'
    ],
    bestTime: 'May - September (peak season June - August for warmer temperatures and long days; May and September are cooler and often quieter)',
    cruiseLines: [
      'P&O Cruises',
      'Princess Cruises',
      'Royal Caribbean',
      'MSC Cruises',
      'Cunard',
      'Norwegian Cruise Line'
    ],
    meta: {
      title: 'Baltics & Northern Europe Cruises | Capitals & Coastal Cities | Limitless Cruises',
      description: 'Book Baltics and Northern Europe cruises from UK ports. Explore capital cities, medieval old towns and Scandinavian ports with expert help from Limitless Cruises.'
    },
    whyCruise: 'Cruising brings together multiple Baltic and Northern European capitals in one trip, avoiding complex overland journeys, border crossings and multiple hotel stays. Ships often dock close to city centres or provide straightforward transfers, allowing guests to focus on museums, old towns and waterfront districts rather than logistics. For UK travellers, the availability of no-fly departures from British ports makes these itineraries particularly appealing.\n\nThis region is well suited to guests who enjoy city breaks, history and culture but prefer to see several places in one holiday. The cooler summer climate is comfortable for walking tours and long days of sightseeing, while the long daylight hours in mid-summer enhance both time ashore and scenic evening sailing.\n\nBaltics and Northern Europe cruises focus on culture-rich cities, medieval old towns and cooler summer weather, often combined with convenient no-fly options from UK ports. Typical itineraries link Baltic capitals with Scandinavian cities and sometimes Norwegian fjords on longer sailings.',
    signatureExperiences: [
      {
        title: 'Baltic capitals circuit',
        description: 'Visit Stockholm, Tallinn, Riga and Helsinki on one itinerary, combining medieval streets, waterfront promenades and grand squares.',
        ports: ['Stockholm', 'Tallinn', 'Riga', 'Helsinki']
      },
      {
        title: 'Scandinavia and Northern cities',
        description: 'Sail to Copenhagen, Oslo and other North Sea ports, with visits to royal palaces, harbours and modern waterfront districts.',
        ports: ['Copenhagen', 'Oslo']
      },
      {
        title: 'Baltics with Norwegian fjords',
        description: 'Longer itineraries that add Norwegian fjords or North Cape to Baltic capitals, appealing to guests who want both city and scenic cruising.',
        ports: ['Stockholm', 'Tallinn', 'Bergen', 'Geiranger']
      },
      {
        title: 'North Sea and Low Countries',
        description: 'Shorter cruises visiting ports like Amsterdam, Bruges (Zeebrugge) and Hamburg, focused on canal cities, historic centres and museums.',
        ports: ['Amsterdam', 'Zeebrugge (for Bruges)', 'Hamburg']
      }
    ],
    whatToExpect: {
      weather: 'Northern Europe and Baltic cruises typically feature mild summer temperatures that are comfortable for walking and city touring. Rain is possible in any month, so guests should pack light layers, a waterproof jacket and comfortable footwear for cobbled streets.',
      portDays: 'Itineraries are often port-intensive, with many days spent in different cities and relatively few long stretches at sea. No-fly cruises from the UK usually include sea days at the start and end of the voyage for North Sea crossings, with frequent port calls in the middle.',
      cultural: 'Ports span several countries and languages, but English is widely spoken in tourist areas across Scandinavia and the Baltic capitals. Local currencies vary between eurozone ports and Scandinavian countries, though card payments are widely accepted and contactless is common.',
      cruiseLength: 'Typical Baltics and Northern Europe cruises range from 7 to 14 nights, depending on how many cities and regions are included. Shorter 3 to 5-night sailings focus on North Sea and nearby ports, while longer itineraries add Baltic capitals, fjords or the Arctic.'
    },
    popularItineraries: [
      {
        name: 'Baltic Capitals & Scandinavia',
        duration: '7 - 10 nights',
        ports: ['UK port', 'Copenhagen', 'Stockholm', 'Tallinn', 'Helsinki'],
        overview: 'A classic Baltics and Scandinavia itinerary linking major capitals and medieval old towns, usually round-trip from a UK port or a Northern homeport.'
      },
      {
        name: 'Northern Europe Short Break',
        duration: '3 - 5 nights',
        ports: ['UK port', 'Amsterdam', 'Zeebrugge (for Bruges)'],
        overview: 'A shorter cruise ideal for first-time guests or those wanting a city-break style sailing focused on canal cities and historic centres.'
      },
      {
        name: 'Baltics with Norwegian Fjords',
        duration: '10 - 14 nights',
        ports: ['UK port', 'Copenhagen', 'Stockholm', 'Tallinn', 'Bergen', 'Geiranger'],
        overview: 'Combines Baltic capitals with Norwegian fjords, offering a mix of city days and dramatic scenic cruising in one longer holiday.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Baltics and Northern Europe?',
        answer: 'The main season runs from May to September, with June to August offering the warmest temperatures and longest days. May and September are cooler but can be less crowded and may offer better value.'
      },
      {
        question: 'Is Baltics and Northern Europe good for first-time cruisers?',
        answer: 'Yes, this region is well suited to first-time cruisers who enjoy city breaks and sightseeing. Many itineraries depart from UK ports, and seas are often relatively calm in summer compared with winter conditions.'
      },
      {
        question: 'How long should I cruise Baltics and Northern Europe?',
        answer: 'Seven to ten nights works well for visiting several capitals and key ports without feeling rushed. Shorter 3 to 5-night cruises suit guests wanting a taster, while longer sailings add fjords or Arctic ports.'
      },
      {
        question: 'What are the must-see ports in Baltics and Northern Europe?',
        answer: 'Stockholm, Copenhagen, Tallinn and Helsinki are core ports on many itineraries, offering a mix of old towns, harbours and museums. Amsterdam, Riga, Oslo and Bruges via Zeebrugge are also highly regarded when included.'
      },
      {
        question: 'Is Baltics and Northern Europe suitable for families and couples?',
        answer: 'These cruises suit couples and families who like city exploring, museums and easy walking rather than beach time. Family-friendly ships add kids\' facilities, while couples often focus on culture, food and evening city ambience.'
      },
      {
        question: 'Can I cruise Baltics and Northern Europe from the UK?',
        answer: 'Yes, many Baltics and Northern Europe itineraries depart from UK ports, making them popular no-fly options. Cruises usually include North Sea crossings plus multiple port days in Baltic and Scandinavian cities.'
      }
    ]
  },
  {
    id: 'british-isles',
    slug: 'british-isles-cruises',
    name: 'British Isles',
    tagline: 'No-fly coastal scenery and historic ports',
    description: 'British Isles cruises explore the coastlines of England, Scotland, Wales and Ireland, often sailing round-trip from UK ports. They suit guests who prefer no-fly holidays, cooler summers, castles and historic towns over beach-focused itineraries.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 51.5074,
      lon: -0.1278,
      ports: [
        { name: 'Southampton', country: 'United Kingdom', lat: 50.9097, lon: -1.4044 },
        { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
        { name: 'Belfast', country: 'United Kingdom', lat: 54.5970, lon: -5.9301 },
        { name: 'Liverpool', country: 'United Kingdom', lat: 53.4084, lon: -2.9916 },
        { name: 'Greenock (for Glasgow)', country: 'United Kingdom', lat: 55.9565, lon: -4.7635 }
      ]
    },
    regions: [
      'England & Channel Coast',
      'Scotland & Highlands',
      'Ireland & Celtic Coast',
      'Islands (Orkney, Shetland, Hebrides)'
    ],
    highlights: [
      'Circle the British Isles on a no-fly cruise from a UK port, visiting a mix of capital cities, regional hubs and smaller coastal towns.',
      'Explore Scottish highlights such as Edinburgh (via nearby ports), the Highlands and island calls that showcase cliffs, lochs and wildlife.',
      'Visit Irish ports including Dublin, Cork or Cobh and Belfast, combining city time with countryside and coastal scenery.',
      'Experience historic sites such as castles, cathedrals and UNESCO-listed old towns without long-haul flights or major time changes.',
      'Enjoy cooler summer temperatures that are comfortable for walking tours and countryside excursions, with varied scenery from cliffs to gentle estuaries.'
    ],
    bestTime: 'May - September (milder temperatures and longer days; weather is changeable year-round, so layers and waterproofs are recommended)',
    cruiseLines: [
      'P&O Cruises',
      'Princess Cruises',
      'Cunard',
      'Fred. Olsen Cruise Lines',
      'Celebrity Cruises',
      'MSC Cruises'
    ],
    meta: {
      title: 'British Isles Cruises | No-Fly Coastal Voyages | Limitless Cruises',
      description: 'Book British Isles cruises from UK ports. Discover Scottish Highlands, Irish cities and historic English and Welsh ports on convenient no-fly sailings.'
    },
    whyCruise: 'Cruising the British Isles allows guests to see multiple regions of the UK and Ireland in one holiday without the need for flights, complex rail itineraries or frequent hotel changes. Ships link together ports that might be time-consuming to visit by land, especially islands and more remote Scottish or Irish locations. For many UK guests, this offers a fresh way to rediscover familiar countries with the convenience of unpacking once.\n\nBritish Isles cruises appeal to guests who enjoy history, gardens, traditional pubs and countryside scenery rather than hot-weather beach days. They are also popular with guests who prefer to avoid airports, either for convenience or accessibility reasons, and who value shorter travel times from home to the departure port.\n\nThe British Isles work very well for cruises that focus on history, coastal scenery and convenient no-fly departures from UK ports, with itineraries that appeal to both first-time and experienced cruisers. Sailings often circle the British and Irish coasts, calling at harbour towns, islands and capital cities with relatively short distances between ports.',
    signatureExperiences: [
      {
        title: 'Edinburgh and the Scottish Lowlands',
        description: 'Visit ports that provide access to Edinburgh for its castle, Royal Mile and festival atmosphere in season, often combined with lowland countryside tours.',
        ports: ['South Queensferry or Rosyth (for Edinburgh)']
      },
      {
        title: 'Irish cities and countryside',
        description: 'Call at Dublin, Belfast and sometimes Cork or Cobh, combining city sightseeing with excursions to countryside, coastal cliffs or sites such as Giant\'s Causeway.',
        ports: ['Dublin', 'Belfast', 'Cobh (for Cork)']
      },
      {
        title: 'Scottish islands and Highlands',
        description: 'Some itineraries include Orkney, Shetland or Hebridean ports, highlighting rugged coastlines, wildlife and ancient archaeological sites.',
        ports: ['Kirkwall (Orkney)', 'Lerwick (Shetland)']
      },
      {
        title: 'Historic English and Welsh ports',
        description: 'Calls to ports such as Liverpool, Holyhead or Falmouth give access to maritime history, castles and coastal walking routes.',
        ports: ['Liverpool', 'Holyhead', 'Falmouth']
      }
    ],
    whatToExpect: {
      weather: 'Weather around the British Isles is famously changeable, even in summer, with a mix of sunshine, cloud and showers likely over the course of a cruise. Daytime temperatures in the main season are typically mild rather than hot, so layers, a waterproof jacket and comfortable walking shoes are essential.',
      portDays: 'British Isles cruises are usually port-intensive, with frequent calls and relatively short distances between many ports. There may be one or two longer sea days on itineraries that include more remote islands or extended repositioning, but most days feature time ashore.',
      cultural: 'Guests will encounter a variety of local accents, regional cultures and Gaelic heritage in parts of Scotland, Ireland and Wales, but English is spoken widely throughout. Local pubs, cafes and independent shops are a common feature in many ports, and tipping practices generally follow usual UK and Irish norms.',
      cruiseLength: 'Typical British Isles cruises range from 7 to 14 nights depending on how many regions and islands are included. Shorter sailings may focus on a slice of the coast or a mix of nearby North Sea and Channel ports, while longer voyages attempt a full circuit.'
    },
    popularItineraries: [
      {
        name: 'British Isles Discovery from the UK',
        duration: '10 - 14 nights',
        ports: ['UK departure port', 'Dublin', 'Belfast', 'Greenock (for Glasgow)', 'Kirkwall (Orkney)', 'Liverpool'],
        overview: 'A classic circuit of the British Isles visiting key Scottish, Irish and English ports, often including at least one Scottish island call.'
      },
      {
        name: 'Ireland and Scottish Highlands',
        duration: '7 - 10 nights',
        ports: ['UK departure port', 'Dublin', 'Belfast', 'Greenock (for Glasgow)', 'Invergordon (for Inverness and Highlands)'],
        overview: 'Focuses on Ireland and Scotland with a mix of cities, Highlands scenery and historic sites, ideal for guests interested in Celtic culture and landscapes.'
      },
      {
        name: 'Short UK and Ireland escape',
        duration: '5 - 7 nights',
        ports: ['UK departure port', 'Dublin', 'Liverpool or another regional port'],
        overview: 'A shorter itinerary offering a taster of British Isles cruising with a handful of ports and minimal sea days.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the British Isles?',
        answer: 'The main season is May to September, when days are longer and temperatures are generally milder. Weather is still changeable, so guests should prepare for sun, cloud and rain on most itineraries.'
      },
      {
        question: 'Are British Isles cruises good for first-time cruisers?',
        answer: 'Yes, British Isles cruises work well for first-time cruisers who prefer to avoid flying and want familiar languages and currency. Port-heavy itineraries make them feel more like an extended series of city and countryside breaks.'
      },
      {
        question: 'How long should I cruise the British Isles?',
        answer: 'Ten to fourteen nights allows time for a fuller circuit including Scotland, Ireland, England and some islands. Shorter 5 to 7-night cruises can provide a good introduction focused on a particular region.'
      },
      {
        question: 'What are the must-see ports on a British Isles cruise?',
        answer: 'Dublin, Belfast, Greenock for Glasgow, Liverpool and at least one Scottish island port such as Kirkwall are often considered highlights. Many guests also value access to Edinburgh via nearby ports when included.'
      },
      {
        question: 'Are British Isles cruises suitable for families and couples?',
        answer: 'These cruises suit couples and families who enjoy history, countryside and coastal scenery more than hot-weather pool days. Family-friendly ships offer kids\' clubs, while adults can focus on castles, whisky tastings and coastal walks.'
      },
      {
        question: 'Can I cruise the British Isles from the UK?',
        answer: 'Yes, almost all British Isles itineraries depart from UK ports, making them straightforward no-fly options. This is a major appeal for guests looking for an easy start and end to their cruise holiday.'
      }
    ]
  },
  {
    id: 'hawaii',
    slug: 'hawaii-cruises',
    name: 'Hawaii',
    tagline: 'Island-hopping in the Pacific',
    description: 'Hawaii cruises link several islands in one holiday, visiting volcanic landscapes, beaches and small coastal towns without repeated flights between islands. They suit guests who want a slower-paced, scenic trip with a focus on nature, culture and warm weather.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 21.3069,
      lon: -157.8583,
      ports: [
        { name: 'Honolulu (Oahu)', country: 'United States', lat: 21.3069, lon: -157.8583 },
        { name: 'Kahului (Maui)', country: 'United States', lat: 20.8893, lon: -156.4729 },
        { name: 'Nawiliwili (Kauai)', country: 'United States', lat: 21.9630, lon: -159.3540 },
        { name: 'Hilo (Hawaii Island)', country: 'United States', lat: 19.7070, lon: -155.0885 },
        { name: 'Kona (Hawaii Island)', country: 'United States', lat: 19.6390, lon: -155.9969 }
      ]
    },
    regions: [
      'Oahu (Honolulu)',
      'Maui',
      'Kauai',
      'Hawaii Island (Big Island)'
    ],
    highlights: [
      'Visit multiple islands in one itinerary, typically including Oahu, Maui, Kauai and Hawaii Island, without the need for separate inter-island flights.',
      'See volcanic landscapes, black-sand or lava-rock beaches and, on some itineraries, views of active volcanic areas from sea or shore excursions.',
      'Enjoy classic Hawaiian experiences such as luaus, hula performances and visits to surf beaches, waterfalls and scenic coastal viewpoints.',
      'Combine beach time and snorkelling with gentle hiking, whale watching in season and cultural visits to sites such as Pearl Harbor on Oahu.',
      'Benefit from warm, generally reliable weather that makes Hawaii an attractive option for winter or shoulder-season escapes from cooler climates.'
    ],
    bestTime: 'Year-round, with drier conditions and more settled weather typically from April to October; winter months can bring more rain but also good whale-watching opportunities',
    cruiseLines: [
      'Norwegian Cruise Line',
      'Princess Cruises',
      'Royal Caribbean',
      'Carnival Cruise Line',
      'Holland America Line'
    ],
    meta: {
      title: 'Hawaii Cruises | Pacific Islands & Volcanic Landscapes | Limitless Cruises',
      description: 'Book Hawaii cruises from the UK. Island-hop between Oahu, Maui, Kauai and Hawaii Island, combining beaches, volcanoes and culture in one warm holiday.'
    },
    whyCruise: 'Cruising Hawaii lets guests sample several islands without repeatedly packing, checking in and flying between them, which is often the alternative for land-based trips. Ships typically spend full days and sometimes overnights in key ports, giving ample time for excursions to beaches, scenic drives and cultural sites. For UK travellers, cruises that start or finish in Hawaii can also be combined with stays in California or other US cities, turning the trip into a larger holiday.\n\nHawaii itineraries appeal to guests who prefer relaxed days with a mix of gentle activity and downtime, rather than very port-intensive city cruises. Onboard atmospheres are generally informal and resort-style, with plenty of outdoor deck space used thanks to the warm climate.\n\nHawaii cruises combine island-hopping, volcanic landscapes and Pacific beaches in one itinerary, usually using Honolulu as a key turnaround or overnight port. They appeal to guests who want a mix of scenery, culture and relaxed beach time rather than intensive city sightseeing.',
    signatureExperiences: [
      {
        title: 'Pearl Harbor and Honolulu highlights',
        description: 'From Honolulu, visit the Pearl Harbor historic sites alongside Waikiki Beach and viewpoints such as Diamond Head, combining history and coastal scenery.',
        ports: ['Honolulu (Oahu)']
      },
      {
        title: 'Road to Hana and Haleakalā (Maui)',
        description: 'From Kahului, join excursions along the Road to Hana for waterfalls and rainforest scenery, or travel up Haleakalā volcano for sunrise or crater views.',
        ports: ['Kahului (Maui)']
      },
      {
        title: 'Na Pali Coast and Kauai landscapes',
        description: 'Calls at Kauai often feature helicopter, boat or viewpoint tours showcasing the dramatic cliffs and valleys of the Na Pali Coast and island interior.',
        ports: ['Nawiliwili (Kauai)']
      },
      {
        title: 'Volcanic and coastal experiences on Hawaii Island',
        description: 'Ports at Hilo and Kona offer access to volcanic landscapes, coffee plantations, black-sand beaches and snorkelling spots with clear water and marine life.',
        ports: ['Hilo (Hawaii Island)', 'Kona (Hawaii Island)']
      }
    ],
    whatToExpect: {
      weather: 'Hawaii has a tropical climate with warm temperatures throughout the year, moderated by trade winds, so conditions are generally comfortable rather than extreme. Showers are possible at any time, especially on windward slopes, so light waterproofs and sun protection are both useful.',
      portDays: 'Dedicated Hawaii round-trips that start in the islands tend to be port-heavy with frequent island calls and limited sea days. Longer voyages from mainland North America involve several consecutive sea days to reach Hawaii, followed by a cluster of port days before the return crossing.',
      cultural: 'Hawaii has a distinctive local culture with strong Native Hawaiian traditions blended with wider US influences. Visitors are encouraged to respect local customs, sacred sites and environmental guidelines, particularly around marine life and volcanic areas.',
      cruiseLength: 'Pure Hawaii itineraries that sail only among the islands are commonly around 7 nights, especially those starting and ending in Honolulu. Longer cruises of 10 to 15 nights or more often combine sea days from the US West Coast with a series of island calls.'
    },
    popularItineraries: [
      {
        name: 'Hawaii Inter-Island from Honolulu',
        duration: '7 nights',
        ports: ['Honolulu (Oahu)', 'Kahului (Maui)', 'Hilo (Hawaii Island)', 'Kona (Hawaii Island)', 'Nawiliwili (Kauai)'],
        overview: 'A classic island-hopping itinerary that focuses entirely on Hawaii, with multiple islands in a week and minimal open-ocean sailing.'
      },
      {
        name: 'Hawaii from the US West Coast',
        duration: '14 - 15 nights',
        ports: ['Los Angeles or San Francisco', 'Honolulu (Oahu)', 'Kahului (Maui)', 'Hilo (Hawaii Island)', 'Nawiliwili (Kauai)'],
        overview: 'A longer voyage including several sea days to and from Hawaii, appealing to guests who enjoy extended time at sea as well as island visits.'
      },
      {
        name: 'Hawaii and South Pacific combination',
        duration: '15+ nights',
        ports: ['Honolulu (Oahu)', 'Other Hawaiian ports', 'Selected South Pacific islands'],
        overview: 'Selected itineraries combine Hawaii with South Pacific islands, creating a broader Pacific voyage for guests with more time.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise Hawaii?',
        answer: 'Hawaii is a year-round destination, with many guests favouring the drier period from spring to early autumn. Winter months can see more rain but are popular for whale watching and escaping colder weather elsewhere.'
      },
      {
        question: 'Is Hawaii good for first-time cruisers?',
        answer: 'Yes, Hawaii works well for first-time cruisers who want warm weather, beaches and gentle sightseeing rather than very busy city itineraries. Inter-island cruises involve limited open-ocean sailing compared with longer repositioning routes.'
      },
      {
        question: 'How long should I cruise Hawaii?',
        answer: 'Seven nights is typical for inter-island itineraries that focus on Hawaii only. Guests who enjoy sea days or want to combine California and Hawaii often choose longer 14 to 15-night cruises from the US West Coast.'
      },
      {
        question: 'What are the must-see ports on a Hawaii cruise?',
        answer: 'Honolulu, Maui, Kauai and at least one port on Hawaii Island are usually considered the core stops. Together they offer city experiences, beaches, volcanic landscapes and Kauai\'s distinctive green scenery.'
      },
      {
        question: 'Is Hawaii suitable for families and couples?',
        answer: 'Hawaii cruises suit both families and couples, with family-friendly ships offering pools and kids\' clubs and plenty of beach and snorkelling options. Couples often focus on scenic drives, sunsets, spas and more relaxed evenings on board.'
      },
      {
        question: 'Can I cruise Hawaii from the UK?',
        answer: 'Most Hawaii cruises for UK guests are fly-cruise holidays, usually involving flights to Honolulu or a US West Coast port such as Los Angeles. Some longer world or segment cruises from the UK include Hawaii as part of a wider Pacific itinerary.'
      }
    ]
  },
  {
    id: 'australia',
    slug: 'australia-cruises',
    name: 'Australia',
    tagline: 'Coastal cities and Great Barrier Reef',
    description: 'Australia cruises visit Sydney, Melbourne, Brisbane and island ports along the east coast, often with scenic sailing and beach-focused days. They suit guests who want city experiences, wildlife and warm weather in one itinerary, typically via fly-cruise from UK airports.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: -33.8688,
      lon: 151.2093,
      ports: [
        { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
        { name: 'Brisbane', country: 'Australia', lat: -27.4698, lon: 153.0251 },
        { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631 },
        { name: 'Adelaide', country: 'Australia', lat: -34.9285, lon: 138.6007 },
        { name: 'Fremantle (Perth)', country: 'Australia', lat: -32.0564, lon: 115.7452 }
      ]
    },
    regions: [
      'East Coast & Great Barrier Reef',
      'Tasmania',
      'South Australia & Kangaroo Island',
      'Western Australia'
    ],
    highlights: [
      'Sail past Sydney Harbour\'s iconic Opera House and bridge, often with overnight stays that allow evening city lights and fireworks experiences.',
      'Visit the Great Barrier Reef area via ports such as Cairns and Airlie Beach, with opportunities for snorkelling, reef tours and tropical island days.',
      'Explore Melbourne\'s culture, food scene and nearby wildlife areas, alongside Adelaide\'s wine regions and Kangaroo Island nature reserves.',
      'Experience Australia\'s varied coastal scenery from city harbours to rugged Tasmania cliffs and the red landscapes of Western Australia.',
      'Join excursions for Australian wildlife such as kangaroos, koalas, penguins and whales, alongside urban attractions and beach time.'
    ],
    bestTime: 'September - April (warmer weather and longer days; southern Australia cooler May - August, tropical north best in dry season May - October)',
    cruiseLines: [
      'P&O Cruises Australia',
      'Royal Caribbean',
      'Carnival Cruise Line',
      'Princess Cruises',
      'Celebrity Cruises',
      'Norwegian Cruise Line'
    ],
    meta: {
      title: 'Australia Cruises | Sydney, Reef & Coastal Cities | Limitless Cruises',
      description: 'Book Australia cruises from the UK. Visit Sydney, Great Barrier Reef ports, Melbourne and Tasmania on fly-cruise holidays with expert guidance from Limitless Cruises.'
    },
    whyCruise: 'Cruising provides an efficient way to sample Australia\'s distant coastal cities and regions without long internal flights or drives between destinations. Guests can enjoy overnight stays in Sydney and other major ports, maximising city time while the ship handles logistics to beach destinations and smaller towns. For UK travellers, fly-cruise packages simplify the long-haul journey, often including direct flights to Sydney or Brisbane.\n\nAustralia appeals to guests seeking a mix of urban sophistication, wildlife encounters and beach relaxation in warm climates. Cruise ships cater to varied interests with city tours, reef excursions and nature experiences, while onboard facilities suit families, couples and multi-generational groups.\n\nAustralia cruises offer diverse coastal scenery, vibrant cities and island destinations, often combined with repositioning voyages between Australia and other regions. Popular itineraries focus on the east coast from Sydney to Queensland, with some sailings exploring Tasmania, South Australia and Western Australia ports.',
    signatureExperiences: [
      {
        title: 'Sydney Harbour overnight',
        description: 'Spend a full day and evening in Sydney with time for the Opera House, Harbour Bridge, harbour cruises and city nightlife, often enhanced by fireworks.',
        ports: ['Sydney']
      },
      {
        title: 'Great Barrier Reef and islands',
        description: 'From Cairns or Airlie Beach, join snorkelling, scuba or scenic flights over the world\'s largest reef system, plus beach time on tropical islands.',
        ports: ['Cairns', 'Airlie Beach']
      },
      {
        title: 'Melbourne culture and wildlife',
        description: 'Explore Melbourne\'s laneways, markets and arts scene alongside Phillip Island for fairy penguins or Great Ocean Road scenery.',
        ports: ['Melbourne']
      },
      {
        title: 'Kangaroo Island and wine country',
        description: 'From Adelaide, visit wildlife-rich Kangaroo Island and nearby Barossa or McLaren Vale wine regions for nature and gourmet experiences.',
        ports: ['Adelaide']
      }
    ],
    whatToExpect: {
      weather: 'Australia\'s climate varies significantly by region, with the popular east coast enjoying warm to hot summers and mild winters. Tropical Queensland ports have a distinct wet season, while southern cities experience cooler, more temperate conditions year-round.',
      portDays: 'East coast Australia cruises tend to be port-intensive with shorter distances between major cities, though Tasmania or full circumnavigations include longer sea passages. Repositioning cruises to Asia, New Zealand or Pacific islands add extended sea days.',
      cultural: 'Australia has a relaxed, outdoor lifestyle with English as the main language and British-influenced tipping customs. Sun protection is essential due to strong UV levels, and visitors should respect Aboriginal cultural sites and marine conservation guidelines.',
      cruiseLength: 'Typical domestic Australia cruises range from 7 to 14 nights, focusing on the east coast or adding Tasmania. Longer 20+ night repositioning voyages connect Australia with New Zealand, Asia or the South Pacific.'
    },
    popularItineraries: [
      {
        name: 'East Coast Australia & Barrier Reef',
        duration: '7 - 10 nights',
        ports: ['Sydney', 'Brisbane', 'Cairns', 'Airlie Beach', 'Melbourne'],
        overview: 'A popular east coast route combining city ports with Great Barrier Reef access and scenic sailing along Australia\'s most populated coastline.'
      },
      {
        name: 'Australia Circumnavigation',
        duration: '20 - 28 nights',
        ports: ['Sydney', 'Melbourne', 'Adelaide', 'Fremantle (Perth)', 'Broome', 'Darwin', 'Cairns'],
        overview: 'A comprehensive voyage around Australia visiting all mainland state capitals plus northern and tropical ports.'
      },
      {
        name: 'Tasmania Short Escape',
        duration: '7 nights',
        ports: ['Sydney or Melbourne', 'Hobart', 'Burnie', 'Port Arthur'],
        overview: 'Focuses on Tasmania\'s rugged scenery, convict history and cool-climate wine regions alongside mainland ports.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise Australia?',
        answer: 'September to April offers warm weather across most of Australia, ideal for beach ports and city sightseeing. Queensland\'s Great Barrier Reef is best May to October during the drier season.'
      },
      {
        question: 'Is Australia good for first-time cruisers?',
        answer: 'Yes, Australia works well for first-timers who enjoy warm weather, cities and beach days. English-speaking ports, resort-style ships and straightforward shore excursions make it accessible.'
      },
      {
        question: 'How long should I cruise Australia?',
        answer: 'Seven to ten nights covers the popular east coast ports and reef area effectively. Longer cruises of two weeks or more allow full state coverage or repositioning to other destinations.'
      },
      {
        question: 'What are the must-see ports in Australia?',
        answer: 'Sydney, Cairns (for the Great Barrier Reef), Melbourne and Brisbane form the core of most itineraries. Adelaide, Airlie Beach and Hobart add regional highlights when included.'
      },
      {
        question: 'Is Australia suitable for families and couples?',
        answer: 'Australia cruises suit both groups well, with family-friendly ships offering kids\' clubs and reef/beach activities. Couples enjoy city dining, wine regions and more premium vessels.'
      },
      {
        question: 'Can I cruise Australia from the UK?',
        answer: 'Most Australia cruises for UK guests are fly-cruise packages with flights to Sydney, Brisbane or Melbourne. Some world cruise segments include Australia as part of longer voyages.'
      }
    ]
  },
  {
    id: 'greek-islands',
    slug: 'greek-islands-cruises',
    name: 'Greek Islands',
    tagline: 'Sunlit isles and ancient heritage',
    description: 'Greek Islands cruises visit Cyclades gems like Santorini and Mykonos alongside lesser-known ports, often bookended by Athens. They suit couples, culture seekers and beach lovers who want whitewashed villages, tavernas and archaeological sites in warm Mediterranean weather.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 37.9420,
      lon: 23.6460,
      ports: [
        { name: 'Piraeus (Athens)', country: 'Greece', lat: 37.9420, lon: 23.6460 },
        { name: 'Santorini (Thira)', country: 'Greece', lat: 36.3932, lon: 25.4615 },
        { name: 'Mykonos', country: 'Greece', lat: 37.4467, lon: 25.3283 },
        { name: 'Rhodes', country: 'Greece', lat: 36.4510, lon: 28.2278 },
        { name: 'Patmos', country: 'Greece', lat: 37.3092, lon: 26.5511 }
      ]
    },
    regions: [
      'Cyclades Islands',
      'Dodecanese Islands',
      'Sporades & Northeast Aegean',
      'Ionian Islands'
    ],
    highlights: [
      'Visit iconic Cyclades islands such as Santorini for caldera sunsets and Mykonos for windmills and beaches, with short hops between whitewashed villages.',
      'Explore Rhodes\' medieval old town and Lindos Acropolis, alongside quieter Dodecanese ports like Patmos and Kos that offer history and relaxed island life.',
      'Sail from Athens to island clusters, combining the Acropolis and ancient sites with sea views of blue-domed churches and cliffside towns.',
      'Enjoy hot summer weather ideal for swimming, beach tavernas and late evenings ashore, with most ports featuring clear water and waterfront dining.',
      'Taste authentic Greek food and culture directly from small ports, often more affordable and less crowded than major tourist resorts.'
    ],
    bestTime: 'May - October (peak July - August for hottest weather; May-June and September-October offer milder temperatures and fewer crowds)',
    cruiseLines: [
      'Celestyal Cruises',
      'Royal Caribbean',
      'MSC Cruises',
      'Norwegian Cruise Line',
      'P&O Cruises',
      'Princess Cruises'
    ],
    meta: {
      title: 'Greek Islands Cruises | Cyclades & Dodecanese | Limitless Cruises',
      description: 'Book Greek Islands cruises from the UK. Island-hop to Santorini, Mykonos, Rhodes and Athens for sunsets, beaches and ancient sites with Limitless Cruises.'
    },
    whyCruise: 'Cruising lets guests visit multiple islands without ferry schedules, luggage transfers or booking separate hotels on each stop. Ships anchor or tender into small harbours where larger ferries cannot reach, providing access to picturesque bays and villages directly from tenders. For UK travellers, fly-cruise options via Athens make the hop to dozens of islands straightforward compared with independent island-hopping.\n\nGreek Islands itineraries balance iconic postcard ports with quieter gems, appealing to guests who want both famous photo spots and authentic local experiences. The short distances between islands mean more time ashore and relaxed pacing, with evenings often spent in harbourfront tavernas.\n\nGreek Islands cruises centre on island-hopping between Cyclades, Dodecanese and other archipelagos, combining sun-drenched ports, ancient sites and relaxed beach days with Athens as a frequent start or end point. These itineraries offer short sea passages and appeal to UK guests seeking summer warmth, history and variety without long flights between destinations.',
    signatureExperiences: [
      {
        title: 'Santorini caldera and sunsets',
        description: 'Tender into Santorini\'s cliffside towns for Oia sunset views, black-sand beaches and ancient Akrotiri excavations, often with overnight stays.',
        ports: ['Santorini (Thira)']
      },
      {
        title: 'Mykonos beaches and nightlife',
        description: 'Explore Mykonos\' windmills, Little Venice and Paradise Beach, with time for shopping, beach clubs or quieter northern island corners.',
        ports: ['Mykonos']
      },
      {
        title: 'Rhodes medieval city',
        description: 'Walk Rhodes\' UNESCO-listed old town with its Street of the Knights, Palace of the Grand Master and nearby Lindos Acropolis.',
        ports: ['Rhodes']
      },
      {
        title: 'Athens Acropolis and ports',
        description: 'Spend time in Athens for the Parthenon, Plaka district and National Archaeology Museum before or after island calls.',
        ports: ['Piraeus (Athens)']
      }
    ],
    whatToExpect: {
      weather: 'Greek Islands summers are hot and dry with long sunny days, perfect for beaches and outdoor tavernas. Shoulder seasons bring milder temperatures comfortable for sightseeing, though evenings can feel cooler on deck.',
      portDays: 'Itineraries feature near-daily island calls with short overnight or daytime sailings between ports. Few full sea days occur unless combining with Turkey or further east, keeping focus on maximum island time.',
      cultural: 'Greek island ports share Orthodox Christian traditions, relaxed dress codes ashore and tavern-style dining. English works well in tourist areas, though basic Greek phrases enhance interactions with locals.',
      cruiseLength: 'Typical Greek Islands cruises run 7 nights from Athens or nearby, covering 6-8 islands. Longer 10-14 night voyages combine Cyclades and Dodecanese or add Turkish ports.'
    },
    popularItineraries: [
      {
        name: 'Cyclades Islands from Athens',
        duration: '7 nights',
        ports: ['Piraeus (Athens)', 'Mykonos', 'Santorini', 'Paros', 'Naxos', 'Syros'],
        overview: 'Classic Cyclades loop featuring the most photographed Greek islands alongside quieter traditional ports.'
      },
      {
        name: 'Greek Islands & Turkish Coast',
        duration: '7 nights',
        ports: ['Piraeus (Athens)', 'Santorini', 'Mykonos', 'Kusadasi (for Ephesus)', 'Patmos', 'Rhodes'],
        overview: 'Combines top Greek islands with Turkey\'s ancient sites, tendering into smaller Greek harbours.'
      },
      {
        name: 'Idyllic Aegean Extended',
        duration: '10 - 14 nights',
        ports: ['Piraeus (Athens)', 'Mykonos', 'Santorini', 'Crete (Heraklion)', 'Rhodes', 'Kos', 'Patmos'],
        overview: 'Longer cruise covering Cyclades, Dodecanese and Crete for comprehensive Greek island coverage.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Greek Islands?',
        answer: 'May to October offers reliably warm weather, with July-August hottest for beach time. May-June and September-October balance good weather with fewer crowds and lower prices.'
      },
      {
        question: 'Are Greek Islands cruises good for first-time cruisers?',
        answer: 'Yes, the short island hops, warm weather and resort-style ships make Greek Islands ideal for first-timers. Athens provides easy fly-cruise access from the UK.'
      },
      {
        question: 'How long should I cruise the Greek Islands?',
        answer: 'Seven nights covers the Cyclades highlights effectively. Ten to fourteen nights allows combining island groups or adding Turkey for more variety.'
      },
      {
        question: 'What are the must-see Greek Islands on cruises?',
        answer: 'Santorini, Mykonos and Rhodes top most lists for their distinctive scenery and sights. Athens, Patmos and Kusadasi (for Ephesus) add major historical highlights.'
      },
      {
        question: 'Are Greek Islands cruises suitable for families and couples?',
        answer: 'Greek Islands suit both well, with family ships offering kids\' clubs and beach days. Couples enjoy sunset tendering, romantic tavernas and island nightlife.'
      },
      {
        question: 'Can I cruise the Greek Islands from the UK?',
        answer: 'Most guests fly to Athens for Greek Islands cruises. Some Mediterranean sailings include Greek ports as part of longer Western Med itineraries from UK departure ports.'
      }
    ]
  },
  {
    id: 'adriatic',
    slug: 'adriatic-cruises',
    name: 'Adriatic',
    tagline: 'Walled cities and island coasts',
    description: 'Adriatic cruises visit Croatia\'s Dalmatian Coast, Montenegro\'s Bay of Kotor and Italian ports, often starting from Venice or Ravenna. They suit history lovers, photographers and couples who enjoy compact port days with UNESCO sites and scenic sailing.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 45.4450,
      lon: 12.3130,
      ports: [
        { name: 'Venice (Marghera or Fusina)', country: 'Italy', lat: 45.4450, lon: 12.3130 },
        { name: 'Dubrovnik', country: 'Croatia', lat: 42.6507, lon: 18.0944 },
        { name: 'Split', country: 'Croatia', lat: 43.5144, lon: 16.4393 },
        { name: 'Kotor', country: 'Montenegro', lat: 42.4284, lon: 18.7764 },
        { name: 'Zadar', country: 'Croatia', lat: 44.1194, lon: 15.2311 }
      ]
    },
    regions: [
      'Dalmatian Coast (Croatia)',
      'Bay of Kotor (Montenegro)',
      'Venetian Lagoon & Istria',
      'Slovenian Coast'
    ],
    highlights: [
      'Walk Dubrovnik\'s city walls and explore Split\'s Diocletian\'s Palace, both UNESCO sites featured on most Adriatic itineraries.',
      'Sail into the narrow Bay of Kotor, Europe\'s southernmost fjord, with steep mountains rising directly from the water.',
      'Experience Venice\'s canals and St Mark\'s Square, often as an overnight port allowing evening gondola rides and quieter streets.',
      'Visit smaller Croatian ports such as Zadar, Sibenik or Korcula for sea organ installations, cathedrals and island charm.',
      'Enjoy hot summer weather perfect for terrace dining, coastal walks and swimming in clear Adriatic waters.'
    ],
    bestTime: 'May - September (peak July - August for warmest weather; May-June and September offer milder temperatures and fewer day-trippers)',
    cruiseLines: [
      'MSC Cruises',
      'Royal Caribbean',
      'Norwegian Cruise Line',
      'P&O Cruises',
      'Princess Cruises',
      'Celebrity Cruises'
    ],
    meta: {
      title: 'Adriatic Cruises | Croatia, Montenegro & Venice | Limitless Cruises',
      description: 'Book Adriatic cruises from the UK. Discover Dubrovnik, Split, Kotor and Venice on Dalmatian Coast voyages with expert advice from Limitless Cruises.'
    },
    whyCruise: 'Cruising efficiently connects Croatia\'s walled coastal cities with Montenegro\'s dramatic bay and Venice without complex overland transfers or ferry schedules. Ships tender into photogenic small harbours and dock near historic centres, maximising sightseeing time. For UK travellers, fly-cruise options via Venice or Italian airports make this compact region\'s highlights accessible.\n\nAdriatic itineraries appeal to guests prioritising history, architecture and scenery over beach time, with walkable ports and evening harbour atmospheres. The region\'s summer warmth and short sea passages create relaxed pacing with ample deck time for coastal views.\n\nAdriatic cruises showcase medieval walled cities, dramatic coastlines and island ports along Croatia, Montenegro, Slovenia and Italy, with Venice as a traditional hub. These itineraries offer a mix of history, scenery and culture in warm summer weather, appealing to UK guests seeking accessible Mediterranean variety.',
    signatureExperiences: [
      {
        title: 'Dubrovnik city walls',
        description: 'Walk the complete 2km circuit of Dubrovnik\'s medieval walls for panoramic views over terracotta rooftops and Adriatic islands.',
        ports: ['Dubrovnik']
      },
      {
        title: 'Bay of Kotor sailing',
        description: 'Cruise through the steep-sided fjord-like bay to reach Kotor\'s old town, with time for fortress climbs and waterfront cafes.',
        ports: ['Kotor']
      },
      {
        title: 'Venice gondolas and canals',
        description: 'Overnight in Venice allows gondola rides at dusk, visits to quieter sestieri and Rialto market exploration beyond daytime crowds.',
        ports: ['Venice (Marghera or Fusina)']
      },
      {
        title: 'Split\'s Diocletian Palace',
        description: 'Explore the 1700-year-old Roman palace that forms Split\'s living heart, with underground halls, cathedral and seaside promenade.',
        ports: ['Split']
      }
    ],
    whatToExpect: {
      weather: 'Adriatic summers are hot and sunny with low rainfall, ideal for rooftop terrace dining and coastal walking. Shoulder months bring comfortable sightseeing temperatures, though evenings cool enough for light jackets.',
      portDays: 'Itineraries feature frequent port calls with overnight sails averaging 8-12 hours between destinations. Minimal full sea days occur unless combining with Greek Islands or Italy.',
      cultural: 'Ports blend Italian, Slavic and Venetian influences with Catholic and Orthodox traditions. English works well in tourist areas; euros accepted in Montenegro, Croatia uses euro officially.',
      cruiseLength: 'Standard Adriatic cruises run 7 nights from Venice/Ravenna, covering Croatia-Montenegro highlights. 10-14 night voyages extend to Greek Islands, Sicily or full Eastern Mediterranean.'
    },
    popularItineraries: [
      {
        name: 'Dalmatian Coast from Venice',
        duration: '7 nights',
        ports: ['Venice', 'Split', 'Dubrovnik', 'Kotor', 'Zadar'],
        overview: 'Classic Croatia-Montenegro route featuring walled cities, Kotor Bay and return to Venice.'
      },
      {
        name: 'Adriatic & Greek Islands',
        duration: '10 nights',
        ports: ['Venice', 'Dubrovnik', 'Corfu', 'Santorini', 'Athens'],
        overview: 'Extends west-east through Adriatic into Ionian and Cyclades islands.'
      },
      {
        name: 'Croatian Islands Extended',
        duration: '7 - 10 nights',
        ports: ['Ravenna or Trieste', 'Zadar', 'Sibenik', 'Split', 'Hvar', 'Dubrovnik'],
        overview: 'Focuses exclusively on Croatian coast and islands from northern Adriatic ports.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise the Adriatic?',
        answer: 'May to September offers warm reliable weather, with July-August peak season. May-June and September balance heat, crowds and pricing effectively.'
      },
      {
        question: 'Are Adriatic cruises good for first-time cruisers?',
        answer: 'Yes, short sea passages, walkable medieval ports and resort ships make Adriatic ideal for first-timers seeking history over beaches.'
      },
      {
        question: 'How long should I cruise the Adriatic?',
        answer: 'Seven nights covers Croatia, Montenegro and Venice highlights perfectly. Ten nights adds Greek Islands for broader Mediterranean variety.'
      },
      {
        question: 'What are the must-see Adriatic ports?',
        answer: 'Dubrovnik, Kotor, Split and Venice form the core experience. Zadar, Korcula and Ravenna add distinctive island and northern highlights.'
      },
      {
        question: 'Are Adriatic cruises suitable for families and couples?',
        answer: 'Adriatic suits couples loving history and scenery; family ships add pools for kids while parents enjoy old towns and evening harbour strolls.'
      },
      {
        question: 'Can I cruise the Adriatic from the UK?',
        answer: 'Fly-cruise via Venice or Italian airports serves most guests. Some UK departures include Adriatic ports within longer Baltic/Northern Europe itineraries.'
      }
    ]
  },
  {
    id: 'canada-new-england',
    slug: 'canada-new-england-cruises',
    name: 'Canada & New England',
    tagline: 'Autumn foliage and coastal heritage',
    description: 'Canada and New England cruises visit Boston, Bar Harbor, Quebec City and Halifax during peak fall colours, combining historic towns, lobster shacks and whale watching. They suit couples, history buffs and nature lovers who enjoy cooler autumn temperatures.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 42.3601,
      lon: -71.0589,
      ports: [
        { name: 'Boston', country: 'United States', lat: 42.3601, lon: -71.0589 },
        { name: 'Bar Harbor (Acadia)', country: 'United States', lat: 44.3876, lon: -68.2039 },
        { name: 'Halifax', country: 'Canada', lat: 44.6488, lon: -63.5752 },
        { name: 'Quebec City', country: 'Canada', lat: 46.8139, lon: -71.2080 },
        { name: 'Saint John (Bay of Fundy)', country: 'Canada', lat: 45.2708, lon: -66.0636 }
      ]
    },
    regions: [
      'New England Coast',
      'Acadia National Park',
      'Bay of Fundy',
      'Quebec & Maritime Provinces'
    ],
    highlights: [
      'Experience peak autumn foliage along coastal Maine, with vibrant reds, oranges and golds visible from ship decks and shore excursions.',
      'Visit classic New England ports like Boston\'s Freedom Trail, Newport mansions and charming Bar Harbor gateway to Acadia National Park.',
      'Explore French-Canadian Quebec City\'s Old Town and Château Frontenac alongside maritime Halifax\'s waterfront and Citadel Hill.',
      'Join whale watching excursions in season, spotting humpbacks, fin whales and harbour porpoises off Maine and Nova Scotia.',
      'Enjoy crisp fall temperatures perfect for walking tours, lobster feasts and scenic drives through forested coastal landscapes.'
    ],
    bestTime: 'September - October (peak foliage late September - early October; whale watching best June - October)',
    cruiseLines: [
      'Holland America Line',
      'Princess Cruises',
      'Royal Caribbean',
      'Celebrity Cruises',
      'Norwegian Cruise Line',
      'Cunard'
    ],
    meta: {
      title: 'Canada & New England Cruises | Fall Foliage & History | Limitless Cruises',
      description: 'Book Canada New England cruises from the UK. See autumn colours in Boston, Bar Harbor, Quebec City and Halifax on fall foliage voyages.'
    },
    whyCruise: 'Cruising connects distant coastal ports efficiently, avoiding long drives along winding roads between charming towns and cities. Ships position perfectly for foliage viewing from upper decks while docking near historic districts and trailheads. For UK travellers, fly-cruise packages via Boston or New York simplify access to this compact autumn destination.\n\nThese itineraries appeal to guests who prioritise seasonal scenery, quaint villages and gentle sightseeing over warm-weather beach time. The fall timing coincides nicely with UK half-term breaks, making family travel feasible alongside couples seeking romantic coastal escapes.\n\nCanada and New England cruises offer spectacular autumn foliage, historic coastal towns and whale watching along the US and Canadian Atlantic seaboard, typically sailing from Boston, New York or Quebec City. These itineraries blend charming New England villages with French-speaking Canadian ports, appealing to UK guests seeking fall colour and culture without Caribbean heat.',
    signatureExperiences: [
      {
        title: 'Boston Freedom Trail',
        description: 'Follow the red-brick trail through Boston\'s revolutionary history, visiting Paul Revere House, Old North Church and Faneuil Hall marketplace.',
        ports: ['Boston']
      },
      {
        title: 'Acadia National Park from Bar Harbor',
        description: 'Explore carriage roads, Cadillac Mountain summit and rocky coastline of Acadia via park shuttles, kayaks or scenic drives.',
        ports: ['Bar Harbor (Acadia)']
      },
      {
        title: 'Quebec City Old Town',
        description: 'Wander cobblestone streets around Château Frontenac, Notre-Dame Basilica and Terrasse Dufferin with French patisserie and café culture.',
        ports: ['Quebec City']
      },
      {
        title: 'Bay of Fundy tides and whales',
        description: 'Witness world\'s highest tides and join whale watching tours spotting humpbacks feeding in nutrient-rich Fundy waters.',
        ports: ['Saint John (Bay of Fundy)']
      }
    ],
    whatToExpect: {
      weather: 'Fall brings crisp temperatures (10-20°C daytime) ideal for sightseeing, though layers needed for cool evenings and possible showers. Peak foliage transforms coastal forests into spectacular colour displays viewable from ship and shore.',
      portDays: 'Roundtrip itineraries from Boston feature frequent port calls with 1-2 sea days; one-way Boston-Quebec voyages add scenic Gulf of St Lawrence sailing. Most days offer time ashore in walkable towns.',
      cultural: 'Ports blend early American history, French-Canadian culture and maritime traditions with English widely spoken. Expect hearty seafood meals, craft breweries and tipping similar to US/Canada norms.',
      cruiseLength: 'Classic itineraries run 7 nights roundtrip from Boston or New York; 10-11 nights one-way Boston to Quebec/Montreal most popular. Extended versions combine with Bermuda or Canada interior.'
    },
    popularItineraries: [
      {
        name: 'Fall Foliage Roundtrip Boston',
        duration: '7 nights',
        ports: ['Boston', 'Portland', 'Bar Harbor', 'Saint John', 'Halifax'],
        overview: 'Classic New England loop maximising Maine foliage, Acadia access and Maritime ports during peak autumn colour.'
      },
      {
        name: 'Boston to Quebec City',
        duration: '10 - 11 nights',
        ports: ['Boston', 'Portland', 'Bar Harbor', 'Halifax', 'Sydney (Nova Scotia)', 'Quebec City'],
        overview: 'One-way autumn voyage through prime foliage areas ending in French-Canadian Quebec City.'
      },
      {
        name: 'New England & Canada Extended',
        duration: '14 nights',
        ports: ['New York', 'Newport', 'Boston', 'Bar Harbor', 'Saint John', 'Halifax', 'Corner Brook', 'Quebec City'],
        overview: 'Comprehensive itinerary from NYC including Rhode Island mansions and additional Canadian Maritime ports.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time for Canada New England cruises?',
        answer: 'Late September to early October hits peak fall foliage across New England and Maritime provinces. Whale watching extends June-October.'
      },
      {
        question: 'Are these cruises good for first-time cruisers?',
        answer: 'Excellent choice for first-timers loving history and scenery. Sheltered coastal routes, resort ships and easy US/Canada ports make accessible autumn introduction.'
      },
      {
        question: 'How long should I cruise Canada and New England?',
        answer: 'Seven nights covers New England highlights; 10-11 nights one-way to Quebec adds Canadian Maritime ports and French culture.'
      },
      {
        question: 'What are must-see Canada New England ports?',
        answer: 'Boston, Bar Harbor (Acadia gateway), Quebec City and Halifax form core experience. Portland, Saint John and Newport add regional charm.'
      },
      {
        question: 'Suitable for families and couples?',
        answer: 'Perfect for couples seeking romantic fall foliage; family ships add kids\' programs while parents enjoy lobster bakes and whale watches.'
      },
      {
        question: 'Can I cruise from the UK?',
        answer: 'Fly-cruise via Boston, NYC or Quebec City most common. Some transatlantic repositioning cruises include these ports en route to Europe.'
      }
    ]
  },
  {
    id: 'panama-central-america',
    slug: 'panama-central-america-cruises',
    name: 'Panama & Central America',
    tagline: 'Canal transit and rainforest ports',
    description: 'Panama and Central America cruises feature the Panama Canal crossing plus Costa Rica, Mexico and Colombia ports with zip-lining, wildlife and beaches. They suit adventure seekers, nature lovers and couples wanting varied itineraries from the Caribbean to Pacific coasts.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 9.0711,
      lon: -79.9365,
      ports: [
        { name: 'Panama City (Balboa)', country: 'Panama', lat: 9.0711, lon: -79.9365 },
        { name: 'Puerto Limon (Costa Rica Caribbean)', country: 'Costa Rica', lat: 10.0000, lon: -83.0176 },
        { name: 'Puntarenas (Costa Rica Pacific)', country: 'Costa Rica', lat: 9.9773, lon: -84.8281 },
        { name: 'Cartagena', country: 'Colombia', lat: 10.3910, lon: -75.4800 },
        { name: 'Cabo San Lucas', country: 'Mexico', lat: 22.8907, lon: -109.9126 }
      ]
    },
    regions: [
      'Panama Canal & surrounds',
      'Costa Rica Caribbean & Pacific',
      'Colombia Caribbean coast',
      'Mexico Pacific (Baja & mainland)'
    ],
    highlights: [
      'Transit the full Panama Canal from ocean to ocean, watching massive locks raise and lower the ship through 80km of engineering marvel.',
      'Experience Costa Rica\'s biodiversity with rainforest zip-lines, sloth spotting, volcano hikes and hanging bridges in national parks.',
      'Explore Cartagena\'s colourful colonial old town, UNESCO forts and salsa dancing alongside white-sand Rosario Islands beaches.',
      'Visit Mexico\'s Pacific ports for whale watching, desert landscapes and beach resorts, often as endpoints of full canal transits.',
      'Enjoy tropical weather with a mix of beach days, wildlife encounters and cultural immersion across multiple Central American countries.'
    ],
    bestTime: 'November - April (dry season across most ports; drier Caribbean side December - April, Pacific side January - May)',
    cruiseLines: [
      'Princess Cruises',
      'Holland America Line',
      'Royal Caribbean',
      'Celebrity Cruises',
      'Norwegian Cruise Line',
      'Viking Ocean Cruises'
    ],
    meta: {
      title: 'Panama Canal & Central America Cruises | Canal Transit & Wildlife | Limitless Cruises',
      description: 'Book Panama Canal cruises from the UK. Transit the canal, explore Costa Rica rainforests and Cartagena on full ocean-to-ocean voyages.'
    },
    whyCruise: 'The Panama Canal transit is a bucket-list experience best appreciated from a cruise ship positioned perfectly in the locks and Gatun Lake. Itineraries efficiently connect diverse destinations across four countries without complex internal flights or road transfers through remote areas. For UK travellers, fly-cruise packages via Miami, Los Angeles or Panama City simplify the long-haul access.\n\nThese cruises appeal to guests prioritising nature adventures, wildlife and engineering history over city sightseeing, with active excursions balanced by beach relaxation. Full transits create natural one-way journeys between Caribbean and Pacific cruise regions.\n\nPanama and Central America cruises highlight the Panama Canal transit alongside Costa Rica\'s rainforests, beach ports and colonial towns, offering nature-focused itineraries with a signature engineering marvel. These voyages appeal to UK guests seeking wildlife, scenery and history beyond mainstream Caribbean routes, often sailing coast-to-coast between oceans.',
    signatureExperiences: [
      {
        title: 'Full Panama Canal transit',
        description: 'Experience the complete 8-10 hour journey from Caribbean to Pacific through locks, Gaillard Cut and Gatun Lake with expert narration.',
        ports: ['Panama City (Balboa)', 'Colon (Caribbean entrance)']
      },
      {
        title: 'Costa Rica rainforest adventures',
        description: 'Choose zip-lining through cloud forest canopies, sloth and monkey spotting, hanging bridges or Arenal Volcano hikes.',
        ports: ['Puerto Limon', 'Puntarenas']
      },
      {
        title: 'Cartagena colonial city',
        description: 'Tour the walled old town\'s plazas, cathedrals and forts, followed by beach time on nearby Rosario Islands.',
        ports: ['Cartagena']
      },
      {
        title: 'Baja California whale watching',
        description: 'Spot humpback and grey whales from Cabo San Lucas during migration season, often combined with desert coastal scenery.',
        ports: ['Cabo San Lucas']
      }
    ],
    whatToExpect: {
      weather: 'Tropical climate with warm temperatures year-round, though wet season (May-November) brings afternoon showers. Dry season offers better wildlife viewing and smoother excursions.',
      portDays: 'Partial canal itineraries feature frequent ports; full transits include 2-3 sea days positioning between Florida and California. Canal day itself combines scenic cruising with port calls.',
      cultural: 'Spanish primary language though English common in ports; US dollars widely accepted alongside local currencies. Expect vibrant Latin culture, hearty cuisine and moderate tipping similar to Caribbean norms.',
      cruiseLength: 'Full Panama Canal transits typically 14-20 nights between Florida and West Coast; partial canal roundtrips 7-10 nights. Shorter segments focus on Central America cluster.'
    },
    popularItineraries: [
      {
        name: 'Full Panama Canal Miami to LA',
        duration: '15 - 18 nights',
        ports: ['Miami', 'Cartagena', 'Panama Canal', 'Puntarenas', 'Cabo San Lucas', 'Los Angeles'],
        overview: 'Classic ocean-to-ocean transit with key Central American ports bookending the canal experience.'
      },
      {
        name: 'Partial Canal Caribbean Roundtrip',
        duration: '7 - 10 nights',
        ports: ['Miami', 'Puerto Limon', 'Colon (partial canal)', 'Cartagena', 'Cozumel'],
        overview: 'Shorter itinerary experiencing canal locks from Caribbean side plus nearby beach/nature ports.'
      },
      {
        name: 'Central America Intensive',
        duration: '10 - 14 nights',
        ports: ['Miami', 'Roatan', 'Belmopan', 'Puerto Limon', 'Colon (partial canal)', 'Cartagena'],
        overview: 'Focuses on Central American ports with partial canal transit rather than full ocean crossing.'
      }
    ],
    faqs: [
      {
        question: 'When is best time for Panama Canal cruises?',
        answer: 'November to April dry season offers smoothest weather and best wildlife viewing across Central America ports.'
      },
      {
        question: 'Good for first-time cruisers?',
        answer: 'Excellent for adventure-loving first-timers. Canal transit thrills, resort ships and nature excursions balance excitement with relaxation.'
      },
      {
        question: 'How long should I cruise Panama Canal?',
        answer: '14-18 nights for full ocean-to-ocean transit; 7-10 nights sufficient for partial canal plus nearby ports experience.'
      },
      {
        question: 'Must-see Panama Central America ports?',
        answer: 'Panama Canal transit, Costa Rica (both coasts), Cartagena and Cabo San Lucas form core highlights across itineraries.'
      },
      {
        question: 'Suitable for families/couples?',
        answer: 'Families love wildlife excursions and pools; couples enjoy romantic Cartagena evenings and balcony canal viewing.'
      },
      {
        question: 'Can I cruise from UK?',
        answer: 'Fly-cruise via Miami, LA or Panama City most practical. World cruise segments occasionally include canal from UK departures.'
      }
    ]
  },
  {
    id: 'south-east-asia',
    slug: 'south-east-asia-cruises',
    name: 'South East Asia',
    tagline: 'Exotic ports and ancient cultures',
    description: 'South East Asia cruises visit Singapore, Bangkok, Ho Chi Minh City and Bali alongside smaller island ports, offering temples, markets and beaches. They suit culture enthusiasts, food lovers and couples wanting warm weather and overnight city stays without constant repacking.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 1.3521,
      lon: 103.8198,
      ports: [
        { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
        { name: 'Laem Chabang (Bangkok)', country: 'Thailand', lat: 13.4350, lon: 100.7853 },
        { name: 'Ho Chi Minh City (Phu My)', country: 'Vietnam', lat: 10.8230, lon: 106.6297 },
        { name: 'Phuket', country: 'Thailand', lat: 7.8804, lon: 98.3923 },
        { name: 'Bali (Benoa)', country: 'Indonesia', lat: -8.7432, lon: 115.2593 }
      ]
    },
    regions: [
      'Thailand & Andaman Sea',
      'Vietnam Coast',
      'Indonesia (Bali & Borneo)',
      'Malaysian Peninsula & Borneo'
    ],
    highlights: [
      'Overnight in Singapore, Bangkok and Ho Chi Minh City for evening street food, temples and nightlife alongside daytime sightseeing.',
      'Visit Thailand\'s temple complexes, floating markets and Phuket beaches, blending culture with classic beach resort experiences.',
      'Explore Vietnam\'s colonial architecture, Cu Chi tunnels and Halong Bay scenery on cruises that extend northwards.',
      'Discover Bali\'s rice terraces, Ubud culture and beach clubs alongside Malaysian ports with colonial forts and jungle excursions.',
      'Enjoy consistently warm tropical weather perfect for deck time between exotic, photogenic destinations.'
    ],
    bestTime: 'November - March (cooler, drier weather across most ports; avoid June-October rainy/monsoon season)',
    cruiseLines: [
      'Royal Caribbean',
      'Celebrity Cruises',
      'Norwegian Cruise Line',
      'Princess Cruises',
      'Silversea',
      'Viking Ocean Cruises'
    ],
    meta: {
      title: 'South East Asia Cruises | Singapore, Thailand & Vietnam | Limitless Cruises',
      description: 'Book South East Asia cruises from the UK. Visit Singapore, Bangkok, Ho Chi Minh City and Bali on exotic cultural voyages with overnight port stays.'
    },
    whyCruise: 'Cruising efficiently links distant cities and islands that would require multiple flights and visas for independent travel. Overnight port stays allow genuine city immersion beyond daytime tours, with ships handling logistics between countries. For UK travellers, fly-cruise packages via Singapore or Hong Kong simplify long-haul access to multiple destinations.\n\nThese itineraries suit guests wanting cultural depth, street food experiences and beach relaxation in warm climates, with sophisticated onboard dining complementing local cuisines. Short sea passages maximise port time across diverse cultures and landscapes.\n\nSouth East Asia cruises deliver exotic ports, colonial history and island cultures across Singapore, Thailand, Vietnam and Malaysia, often with overnights in bustling hubs like Bangkok and Ho Chi Minh City. These itineraries blend vibrant street markets, temple visits and beach escapes, appealing to UK guests seeking warm-weather cultural immersion.',
    signatureExperiences: [
      {
        title: 'Singapore city immersion',
        description: 'Overnight allows Gardens by the Bay, Chinatown street food, Marina Bay Sands and Little India alongside colonial Raffles Hotel area.',
        ports: ['Singapore']
      },
      {
        title: 'Bangkok temples and markets',
        description: 'Full day excursion to Grand Palace, Wat Arun and floating markets, with evening Khao San road or Chinatown dining.',
        ports: ['Laem Chabang (Bangkok)']
      },
      {
        title: 'Ho Chi Minh City and Mekong',
        description: 'Tour colonial Notre Dame Basilica, Central Post Office, Ben Thanh Market and Cu Chi tunnels or Mekong Delta boat trip.',
        ports: ['Ho Chi Minh City (Phu My)']
      },
      {
        title: 'Phuket beaches and islands',
        description: 'Phi Phi Islands boat trips, beach club days or Big Buddha temple visits showcase Andaman Sea tropical paradise.',
        ports: ['Phuket']
      }
    ],
    whatToExpect: {
      weather: 'Tropical heat (28-33°C) with high humidity year-round; dry season November-March most comfortable for sightseeing. Frequent short tropical showers possible even in dry season.',
      portDays: 'Regional cruises feature frequent ports with overnight stays; longer itineraries to Australia/Japan include sea days. Maximum 1-2 consecutive sea days typical.',
      cultural: 'Dress modestly for temples (cover shoulders/knees); remove shoes entering sacred spaces. English widely spoken in tourist areas; USD accepted alongside local currencies.',
      cruiseLength: '7-12 nights common for regional loops; 14-21 nights for Australia, Japan or India combinations. Shorter 3-5 night Singapore taster cruises available.'
    },
    popularItineraries: [
      {
        name: 'Southeast Asia Highlights',
        duration: '7 - 10 nights',
        ports: ['Singapore', 'Phuket', 'Ho Chi Minh City', 'Laem Chabang (Bangkok)'],
        overview: 'Classic loop covering Thailand, Vietnam and Singapore with full-day port calls.'
      },
      {
        name: 'Best of Southeast Asia Extended',
        duration: '12 - 14 nights',
        ports: ['Singapore', 'Bali', 'Phuket', 'Ho Chi Minh City', 'Da Nang (for Hoi An)', 'Bangkok'],
        overview: 'Comprehensive itinerary adding central Vietnam and Indonesia to core Thailand-Vietnam-Singapore route.'
      },
      {
        name: 'Southeast Asia to Australia',
        duration: '14 - 18 nights',
        ports: ['Singapore', 'Phuket', 'Bali', 'Darwin', 'Cairns', 'Sydney'],
        overview: 'Repositioning cruise linking Southeast Asia with Australia featuring multiple sea days.'
      }
    ],
    faqs: [
      {
        question: 'When is best time for Southeast Asia cruises?',
        answer: 'November to March dry season offers comfortable temperatures and minimal rain across Thailand, Vietnam and Singapore.'
      },
      {
        question: 'Good for first-time cruisers?',
        answer: 'Excellent choice combining resort ships, warm weather, exotic culture and easy English-speaking ports like Singapore.'
      },
      {
        question: 'How long should I cruise Southeast Asia?',
        answer: '7-10 nights covers regional highlights perfectly; 14 nights allows broader coverage or Australia positioning.'
      },
      {
        question: 'Must-see Southeast Asia cruise ports?',
        answer: 'Singapore, Bangkok, Ho Chi Minh City and Phuket form core experience; Bali, Da Nang and Penang add variety.'
      },
      {
        question: 'Suitable for families/couples?',
        answer: 'Families love beach ports and kids clubs; couples enjoy overnight city stays, cultural immersion and balcony dining.'
      },
      {
        question: 'Can I cruise Southeast Asia from UK?',
        answer: 'Fly-cruise via Singapore, Bangkok or Hong Kong most practical for UK guests. World cruise segments occasionally include region.'
      }
    ]
  },
  {
    id: 'atlantic-canary-islands',
    slug: 'atlantic-canary-islands-cruises',
    name: 'Atlantic & Canary Islands',
    tagline: 'Winter sun from UK ports',
    description: 'Atlantic Islands cruises visit Tenerife, Gran Canaria, Madeira and Funchal, featuring volcanic beaches, levada walks and wine tasting. They suit winter sun seekers, couples and guests preferring no-fly holidays with year-round mild temperatures and short sea days.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: 28.2916,
      lon: -16.6291,
      ports: [
        { name: 'Santa Cruz de Tenerife', country: 'Spain', lat: 28.2916, lon: -16.6291 },
        { name: 'Funchal (Madeira)', country: 'Portugal', lat: 32.7897, lon: -16.9097 },
        { name: 'Las Palmas (Gran Canaria)', country: 'Spain', lat: 28.1250, lon: -15.4300 },
        { name: 'Santa Cruz de La Palma', country: 'Spain', lat: 28.6672, lon: -17.7652 },
        { name: 'Arrecife (Lanzarote)', country: 'Spain', lat: 28.9650, lon: -13.5524 }
      ]
    },
    regions: [
      'Canary Islands',
      'Madeira',
      'Azores',
      'Cape Verde'
    ],
    highlights: [
      'Enjoy guaranteed mild temperatures (18-25°C) throughout winter when UK weather turns cold.',
      'Explore volcanic landscapes from Teide National Park (Tenerife) to Timanfaya craters (Lanzarote) and Madeira levada walks.',
      'Choose convenient no-fly cruises from Southampton and other UK ports, avoiding airports entirely.',
      'Visit multiple sunny islands in one trip with frequent port calls and minimal sea days between destinations.',
      'Taste island specialities including Madeiran wine, Canarian mojo sauces and fresh seafood across harbourfront restaurants.'
    ],
    bestTime: 'Year-round (peak December - April for UK winter sun escapes)',
    cruiseLines: [
      'P&O Cruises',
      'Fred. Olsen Cruise Lines',
      'Princess Cruises',
      'MSC Cruises',
      'Saga Cruises'
    ],
    meta: {
      title: 'Canary Islands Cruises | No-Fly Winter Sun | Limitless Cruises',
      description: 'Book Canary Islands cruises from UK ports. Visit Tenerife, Funchal, Gran Canaria and La Palma on sunny Atlantic island voyages all year round.'
    },
    whyCruise: 'No-fly departures from UK ports make Atlantic Islands cruises one of the most convenient winter sun options, with direct sailings to sunny destinations without airport queues or flight delays. Itineraries efficiently connect multiple islands that would require complex flights and ferries for independent travel, whilst ships dock close to beach resorts and town centres. The consistent mild climate provides welcome relief from UK winter without the extreme heat of Caribbean or Mediterranean summer peaks.\n\nThese cruises appeal to guests seeking relaxed beach time, gentle walks and island exploration rather than intensive sightseeing, with port-intensive schedules maximising sunshine hours. Year-round availability suits last-minute bookings and shoulder-season value.\n\nAtlantic Islands and Canary Islands cruises provide reliable winter sunshine and volcanic scenery from UK departure ports, making them popular no-fly options for UK guests seeking mild weather and relaxed island ports. Itineraries typically combine the Canaries with Madeira, sometimes extending to the Azores or Cape Verde for diverse Atlantic island experiences.',
    signatureExperiences: [
      {
        title: 'Teide National Park (Tenerife)',
        description: 'Ride cable car to Spain\'s highest peak for volcanic crater views, lunar landscapes and Mount Teide summit hikes.',
        ports: ['Santa Cruz de Tenerife']
      },
      {
        title: 'Madeira levada walks',
        description: 'Follow historic irrigation channels through laurel forests to waterfalls, mountain viewpoints and traditional villages.',
        ports: ['Funchal (Madeira)']
      },
      {
        title: 'Timanfaya National Park (Lanzarote)',
        description: 'Bus tour through volcanic moonscape with geothermal demonstrations and Fire Mountains crater viewpoints.',
        ports: ['Arrecife (Lanzarote)']
      },
      {
        title: 'Gran Canaria dunes and beaches',
        description: 'Visit Maspalomas sand dunes, Playa del Inglés beach clubs and Las Palmas old town harbourfront.',
        ports: ['Las Palmas (Gran Canaria)']
      }
    ],
    whatToExpect: {
      weather: 'Subtropical climate delivers mild temperatures year-round, rarely below 18°C even in winter, with minimal rainfall compared to northern Europe. Summer months slightly warmer but never extreme; perfect for deck time and beach days.',
      portDays: 'Highly port-intensive itineraries with calls most days and short overnight passages between islands. No-fly UK departures include North Atlantic positioning days at voyage start/end.',
      cultural: 'Spanish/Portuguese languages with good English in tourist areas; euros used throughout. Relaxed island culture emphasises long lunches, beach time and evening promenades.',
      cruiseLength: 'Typical 12-14 nights from UK ports covering multiple islands; shorter 7-night fly-cruises from Tenerife focus on Canaries only. Some world cruise segments include Atlantic Islands en route.'
    },
    popularItineraries: [
      {
        name: 'Canary Islands from UK',
        duration: '12 - 14 nights',
        ports: ['Southampton', 'Funchal (Madeira)', 'Santa Cruz de Tenerife', 'Las Palmas', 'Arrecife (Lanzarote)', 'Lisbon'],
        overview: 'Classic no-fly winter sun cruise visiting key Canary Islands plus Madeira and Portuguese return.'
      },
      {
        name: 'Canary Islands Intensive',
        duration: '7 nights',
        ports: ['Santa Cruz de Tenerife', 'Las Palmas', 'Arrecife', 'Santa Cruz de La Palma', 'Funchal'],
        overview: 'Fly-cruise loop covering all main Canary Islands plus Madeira from Tenerife hub.'
      },
      {
        name: 'Atlantic Isles Extended',
        duration: '16 - 18 nights',
        ports: ['UK port', 'Funchal', 'Canary Islands', 'Ponta Delgada (Azores)', 'Lisbon', 'Porto'],
        overview: 'Longer voyage adding Azores volcanic islands to classic Canaries/Madeira circuit.'
      }
    ],
    faqs: [
      {
        question: 'When is the best time to cruise Canary Islands?',
        answer: 'Year-round sunshine makes Canaries perfect anytime, but December-April delivers best value escaping UK winter whilst avoiding European summer crowds.'
      },
      {
        question: 'Are Canary Islands cruises good for first-timers?',
        answer: 'Excellent choice with no-fly UK departures, resort-style ships, beach-focused ports and familiar euro currency/language in Spanish islands.'
      },
      {
        question: 'How long should I cruise Canary Islands?',
        answer: '12-14 nights from UK covers multiple islands perfectly; 7 nights fly-cruise suits shorter holidays focused on Canaries only.'
      },
      {
        question: 'What are must-see Canary Islands ports?',
        answer: 'Tenerife (Teide), Funchal (Madeira levadas), Las Palmas (beaches) and Lanzarote (volcanoes) form core highlights across itineraries.'
      },
      {
        question: 'Suitable for families and couples?',
        answer: 'Perfect for both - families love beach days and pools, couples enjoy romantic levada walks, wine tasting and sunset harbour dinners.'
      },
      {
        question: 'Can I cruise Canary Islands from UK?',
        answer: 'Yes, multiple weekly no-fly departures from Southampton and regional UK ports make Canaries most accessible winter sun destination.'
      }
    ]
  },
  {
    id: 'south-america',
    slug: 'south-america-cruises',
    name: 'South America',
    tagline: 'Patagonian fjords and Brazilian beaches',
    description: 'South America cruises explore Chilean fjords, Buenos Aires tango culture and Rio de Janeiro beaches, featuring glacier viewing and colonial cities. They suit adventure travellers, couples and culture enthusiasts wanting dramatic scenery and warm coastal ports.',
    image: 'null',
    featured: true,
    coordinates: {
      lat: -33.4489,
      lon: -70.6693,
      ports: [
        { name: 'San Antonio (Santiago)', country: 'Chile', lat: -33.4489, lon: -70.6693 },
        { name: 'Puerto Montt', country: 'Chile', lat: -41.4713, lon: -72.9377 },
        { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
        { name: 'Montevideo', country: 'Uruguay', lat: -34.9011, lon: -56.1645 },
        { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 }
      ]
    },
    regions: [
      'Chilean Fjords & Patagonia',
      'Brazilian Coast',
      'Rio Plata & Uruguay',
      'Peruvian Coast'
    ],
    highlights: [
      'Sail Chilean fjords between Puerto Montt and Punta Arenas, passing glaciers, waterfalls and forested channels.',
      'Overnight in Buenos Aires for tango shows, steak dinners and La Boca neighbourhood colour.',
      'Visit Rio de Janeiro during carnival season or for Christ the Redeemer and Sugarloaf cable car views.',
      'Experience Montevideo\'s historic old town, markets and nearby Colonia del Sacramento UNESCO site.',
      'Enjoy varied climates from cool fjord sailing to Rio\'s tropical beaches in one comprehensive voyage.'
    ],
    bestTime: 'November - March (Southern Hemisphere summer; Brazilian carnival February-March)',
    cruiseLines: [
      'Princess Cruises',
      'Holland America Line',
      'Celebrity Cruises',
      'Silversea',
      'Viking Ocean Cruises'
    ],
    meta: {
      title: 'South America Cruises | Fjords, Rio & Buenos Aires | Limitless Cruises',
      description: 'Book South America cruises from UK. Sail Chilean fjords, visit Buenos Aires and Rio de Janeiro on Patagonian coastal voyages.'
    },
    whyCruise: 'Cruising efficiently connects distant Patagonian fjords with Rio and Buenos Aires that would require multiple long-haul flights and complex overland logistics. Ships provide perfect vantage points for glacier and coastal scenery whilst docking near city centres and beach districts. For UK travellers, fly-cruise packages via Santiago or Buenos Aires simplify access to this expansive continent.\n\nSouth America appeals to guests seeking dramatic nature alongside vibrant cultures, with active excursions balanced by city sophistication and beach relaxation. Extended port stays maximise cultural immersion in iconic destinations.\n\nSouth America cruises deliver dramatic Patagonian fjords, Brazilian beaches and Andean city ports, offering adventurous itineraries for UK guests seeking bucket-list coastal exploration. Voyages typically link Chile, Argentina and Brazil with scenic sailing through glacier channels and vibrant carnival-season calls.',
    signatureExperiences: [
      {
        title: 'Chilean fjord sailing',
        description: 'Navigate narrow channels past hanging glaciers, Reloncavi Sound and Chonos Archipelago with expert navigation commentary.',
        ports: ['Puerto Montt']
      },
      {
        title: 'Buenos Aires tango nights',
        description: 'Evening tango shows in San Telmo, steak dinner at parrilla and La Boca Caminito street art exploration.',
        ports: ['Buenos Aires']
      },
      {
        title: 'Rio de Janeiro icons',
        description: 'Christ the Redeemer train, Sugarloaf cable car and Copacabana Beach people-watching with caipirinhas.',
        ports: ['Rio de Janeiro']
      },
      {
        title: 'Montevideo & Colonia',
        description: 'Historic old town walking tour plus ferry to UNESCO-listed Colonia del Sacramento with cobblestone streets.',
        ports: ['Montevideo']
      }
    ],
    whatToExpect: {
      weather: 'Southern Hemisphere summer brings mild fjord sailing (10-18°C) warming to Rio\'s tropical heat (25-35°C). Pack layers for Patagonia chill and light clothes for Brazilian ports.',
      portDays: 'Fjords section port-intensive; Brazil-Argentina legs include longer ocean passages between Rio Plata and southern Chile. Full continent voyages balance both.',
      cultural: 'Spanish/Portuguese primary with English in tourist areas; US dollars often accepted alongside local currencies. Vibrant Latin culture emphasises late dinners, dancing and beach life.',
      cruiseLength: 'Roundtrip Chile 14-21 nights; full continent Buenos Aires-Rio-Santiago 25-30 nights; segments 10-14 nights.'
    },
    popularItineraries: [
      {
        name: 'Chilean Fjords Roundtrip',
        duration: '14 - 17 nights',
        ports: ['San Antonio (Santiago)', 'Puerto Montt', 'Puerto Chacabuco', 'Punta Arenas', 'Puerto Natales'],
        overview: 'Patagonian fjords intensive focusing on glacier channels and southern Chile scenery.'
      },
      {
        name: 'South America Grand Voyage',
        duration: '25 - 30 nights',
        ports: ['Buenos Aires', 'Montevideo', 'Rio de Janeiro', 'Santos (Sao Paulo)', 'San Antonio (Santiago)'],
        overview: 'Comprehensive continent coverage from Argentina through Brazil to Chilean Pacific coast.'
      },
      {
        name: 'Brazil & Rio Carnival',
        duration: '10 - 14 nights',
        ports: ['Buenos Aires', 'Montevideo', 'Rio de Janeiro', 'Ilheus', 'Salvador'],
        overview: 'Brazil-focused itinerary timed for carnival with multiple Bahia state beach ports.'
      }
    ],
    faqs: [
      {
        question: 'When is best time for South America cruises?',
        answer: 'November-March Southern Hemisphere summer offers mild fjord sailing and warm Brazilian beaches; February-March coincides with Rio carnival.'
      },
      {
        question: 'Good for first-time cruisers?',
        answer: 'Best for experienced cruisers seeking adventure. Long-haul flights, varied climates and active excursions suit seasoned travellers.'
      },
      {
        question: 'How long should I cruise South America?',
        answer: '14 nights covers Chilean fjords; 25+ nights needed for full continent experience from Argentina to Chile.'
      },
      {
        question: 'Must-see South America cruise ports?',
        answer: 'Buenos Aires, Rio de Janeiro, Puerto Montt fjords and Montevideo form core highlights across itineraries.'
      },
      {
        question: 'Suitable for families/couples?',
        answer: 'Couples love cultural immersion and fjord balconies; families better suited to shorter Brazil segments with beach time.'
      },
      {
        question: 'Can I cruise South America from UK?',
        answer: 'Fly-cruise via Santiago, Buenos Aires or Rio most practical. World cruise segments occasionally include South America from UK ports.'
      }
    ]
  }
];

// Helper functions
export const getDestinationBySlug = (slug) => destinations.find(d => d.slug === slug);
export const getFeaturedDestinations = () => destinations.filter(d => d.featured);
export const getAllDestinations = () => destinations;
