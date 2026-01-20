-- Seed data for P&O Iona ship guide
-- Comprehensive ship information following the Ship Guide template

INSERT INTO ship_guides (
  slug,
  name,
  display_name,
  cruise_line_slug,
  cruise_line_name,
  
  -- Ship specifications
  year_built,
  gross_tonnage,
  length_meters,
  beam_meters,
  passenger_capacity,
  crew_count,
  deck_count,
  speed_knots,
  
  -- Images
  hero_image_url,
  card_image_url,
  
  -- Overview
  tagline,
  description,
  highlights,
  overview_content,
  
  -- Cabins
  cabins,
  
  -- Deck Plans
  deck_plans,
  
  -- Onboard
  onboard,
  
  -- Dining
  dining,
  
  -- Entertainment
  entertainment,
  
  -- Activities
  activities,
  
  -- Family
  family,
  
  -- Kids
  kids,
  
  -- Accessibility
  accessibility,
  
  -- Wellness
  wellness,
  
  -- FAQ
  faq,
  
  -- SEO
  meta_title,
  meta_description,
  meta_keywords,
  
  -- Status
  status,
  featured
) VALUES (
  'iona',
  'Iona',
  'P&O Iona',
  'p-and-o-cruises',
  'P&O Cruises',
  
  -- Specifications
  2020,
  185000,
  344.5,
  42,
  5200,
  1800,
  17,
  22.6,
  
  -- Images (placeholder - will be updated with actual URLs)
  NULL,
  NULL,
  
  -- Overview
  'Britain''s Largest & Greenest Cruise Ship',
  'Iona is the largest cruise ship ever built for the UK market and the greenest ship in P&O Cruises'' history. Named after the sacred Scottish island, she combines cutting-edge technology with British style and sophistication. With over 30 places to eat and drink, world-class entertainment, and incredible facilities, Iona offers an unforgettable cruise experience.

Powered by liquefied natural gas (LNG), Iona represents a new era in sustainable cruising. Her stunning SkyDome with a retractable glass roof and the largest gin distillery at sea are just some of the innovative features that set her apart.',
  
  '["Britain''s largest cruise ship at 185,000 tonnes", "First P&O ship powered by LNG (cleaner fuel)", "SkyDome - unique glass-roofed entertainment area", "710 Club - first gin distillery at sea", "16 restaurants and 13 bars", "Four swimming pools including infinity pool", "Innovative two-deck high atrium design"]'::jsonb,
  
  '{
    "introduction": "Iona represents the pinnacle of British cruising, combining elegant design with innovative technology. From her LNG propulsion system to her unique SkyDome, every aspect has been designed to deliver an exceptional guest experience.",
    "ideal_for": "Iona is perfect for British families, couples, and solo travellers looking for a sophisticated cruise experience with outstanding entertainment, diverse dining options, and modern amenities. Her large size means there''s something for everyone without feeling crowded."
  }'::jsonb,
  
  -- Cabins
  '{
    "categories": [
      {
        "name": "Inside Cabins",
        "description": "Comfortable and well-appointed inside cabins, perfect for those who spend most of their time enjoying the ship''s facilities.",
        "types": [
          {
            "name": "Inside Single",
            "size": "12 sq m",
            "sleeps": "1",
            "features": ["Single bed", "En-suite bathroom", "Television", "Tea and coffee making facilities", "Safe", "Hairdryer"]
          },
          {
            "name": "Inside Twin/Double",
            "size": "16 sq m",
            "sleeps": "2-4",
            "features": ["Twin beds or double", "En-suite bathroom with shower", "Sofa bed for additional guests", "Television", "Tea and coffee making", "Air conditioning"]
          }
        ]
      },
      {
        "name": "Sea View Cabins",
        "description": "Cabins with a window or porthole offering natural light and ocean views.",
        "types": [
          {
            "name": "Sea View",
            "size": "17-19 sq m",
            "sleeps": "2-4",
            "features": ["Window with sea view", "Twin beds or double", "En-suite bathroom", "Television", "Tea and coffee making", "Air conditioning"]
          }
        ]
      },
      {
        "name": "Balcony Cabins",
        "description": "Enjoy your own private outdoor space with stunning views.",
        "types": [
          {
            "name": "Balcony",
            "size": "20-25 sq m",
            "sleeps": "2-4",
            "features": ["Private balcony with seating", "Floor-to-ceiling windows", "Twin beds or double", "En-suite bathroom with shower", "Television", "Mini-fridge", "Tea and coffee making"]
          },
          {
            "name": "Deluxe Balcony",
            "size": "25-30 sq m",
            "sleeps": "2-4",
            "features": ["Larger private balcony", "Premium location", "Enhanced amenities", "Separate seating area", "Premium toiletries"]
          }
        ]
      },
      {
        "name": "Suites",
        "description": "Experience the ultimate in luxury and space with our suite accommodation.",
        "types": [
          {
            "name": "Suite",
            "size": "35-45 sq m",
            "sleeps": "2-4",
            "features": ["Large private balcony", "Separate living area", "King-size bed", "Walk-in wardrobe", "Luxury bathroom with tub", "Butler service", "Priority embarkation", "Complimentary drinks package"]
          },
          {
            "name": "Penthouse Suite",
            "size": "60+ sq m",
            "sleeps": "2-4",
            "features": ["Wrap-around balcony", "Separate bedroom and living room", "Dining area", "Jacuzzi bath", "Dedicated butler", "Exclusive lounge access", "Complimentary speciality dining"]
          }
        ]
      }
    ],
    "tips": "Book early for the best cabin location. Mid-ship cabins tend to have less motion, while higher decks offer better views but more movement."
  }'::jsonb,
  
  -- Deck Plans
  '[
    {"number": 17, "name": "Sky Deck", "highlights": ["SkyDome", "Infinity Pool", "The Keel and Cow"]},
    {"number": 16, "name": "Lido Deck", "highlights": ["Main Pool", "Whirlpools", "Beach House", "Sunset Bar"]},
    {"number": 15, "name": "Sports Deck", "highlights": ["Sports Court", "Running Track", "Jogging Track"]},
    {"number": 8, "name": "Atrium Upper", "highlights": ["Grand Atrium", "Glass House", "710 Club Gin Distillery"]},
    {"number": 7, "name": "Atrium Lower", "highlights": ["Shops", "Epicurean", "Sindhu"]},
    {"number": 6, "name": "Entertainment Deck", "highlights": ["Headliners Theatre", "The Club House", "Live Lounge"]},
    {"number": 5, "name": "Spa Deck", "highlights": ["Oasis Spa", "Thermal Suite", "Fitness Centre"]}
  ]'::jsonb,
  
  -- Onboard
  '{
    "introduction": "Iona offers an incredible array of facilities spread across her 17 passenger decks. From the innovative SkyDome to the peaceful Retreat, there''s a space for every mood.",
    "amenities": [
      {"name": "SkyDome", "description": "A unique entertainment area with a retractable glass roof, offering poolside relaxation by day and spectacular shows by night.", "location": "Deck 17"},
      {"name": "The Atrium", "description": "A stunning two-deck high space at the heart of the ship, home to the 710 Club and Glass House.", "location": "Decks 7-8"},
      {"name": "The Retreat", "description": "An exclusive adults-only area with premium pool, cabanas, and dedicated bar service.", "location": "Deck 16 forward"},
      {"name": "Library", "description": "A quiet space for reading and relaxation with sea views.", "location": "Deck 7"},
      {"name": "Casino", "description": "Try your luck at the tables or slot machines in our stylish casino.", "location": "Deck 6"}
    ],
    "tips": "Download the P&O app before your cruise to book restaurants, shows, and activities in advance."
  }'::jsonb,
  
  -- Dining
  '{
    "introduction": "With 16 places to eat, Iona offers exceptional dining variety. From British classics to international cuisine, there''s something to satisfy every palate.",
    "restaurants": [
      {"name": "The Meridian", "cuisine": "British Contemporary", "description": "The main dining room serving beautifully prepared British and international dishes.", "dress_code": "Smart Casual / Formal", "cost": "Included"},
      {"name": "The Olive Grove", "cuisine": "Mediterranean", "description": "Fresh Mediterranean flavours in a relaxed setting.", "dress_code": "Smart Casual", "cost": "Included"},
      {"name": "Sindhu", "cuisine": "Indian", "description": "Atul Kochhar''s award-winning Indian restaurant featuring contemporary dishes.", "dress_code": "Smart Casual", "cost": "Surcharge"},
      {"name": "Epicurean", "cuisine": "Fine Dining", "description": "Eric Lanlard''s exquisite tasting menu experience.", "dress_code": "Smart/Formal", "cost": "Surcharge"},
      {"name": "The Glass House", "cuisine": "Wine Bar & Grill", "description": "Premium wines paired with steaks and seafood in an elegant setting.", "dress_code": "Smart Casual", "cost": "Surcharge"},
      {"name": "Beach House", "cuisine": "Caribbean", "description": "Casual poolside dining with Caribbean-inspired dishes.", "dress_code": "Casual", "cost": "Included"},
      {"name": "The Keel and Cow", "cuisine": "Pub Grub", "description": "Traditional British pub food under the SkyDome.", "dress_code": "Casual", "cost": "Included"},
      {"name": "Horizon Buffet", "cuisine": "International Buffet", "description": "All-day buffet with live cooking stations and international options.", "dress_code": "Casual", "cost": "Included"}
    ],
    "bars": [
      {"name": "710 Club", "description": "The first gin distillery at sea, creating exclusive Iona gins.", "specialties": "Craft gin, gin cocktails"},
      {"name": "Anderson''s Bar", "description": "Classic cocktail bar with live music.", "specialties": "Cocktails, whisky"},
      {"name": "The Crow''s Nest", "description": "Observation lounge with panoramic views.", "specialties": "Coffee, afternoon tea, cocktails"},
      {"name": "Sunset Bar", "description": "Pool deck bar perfect for sunset drinks.", "specialties": "Tropical cocktails, beers"},
      {"name": "Brodie''s", "description": "Cosy pub atmosphere with British ales.", "specialties": "Ales, pub drinks"}
    ],
    "room_service": "24-hour room service is available. Continental breakfast is complimentary; other items have a delivery charge.",
    "dietary": "P&O caters to all dietary requirements including vegetarian, vegan, gluten-free, and allergies. Inform your travel agent when booking and speak to the restaurant manager on board."
  }'::jsonb,
  
  -- Entertainment
  '{
    "introduction": "Iona delivers world-class entertainment every evening, from West End-style shows to live music and late-night dancing.",
    "venues": [
      {"name": "Headliners Theatre", "description": "A stunning 936-seat theatre hosting Broadway-style productions.", "capacity": "936 seats"},
      {"name": "SkyDome", "description": "Multi-purpose entertainment space with retractable roof for pool parties and special events.", "capacity": "Varies"},
      {"name": "Live Lounge", "description": "Intimate venue for live bands, jazz, and acoustic performances.", "capacity": "150"},
      {"name": "The Club House", "description": "Sports bar by day, nightclub by evening with DJ sets.", "capacity": "200"},
      {"name": "Limelight Club", "description": "Cabaret-style venue for comedy and magic shows.", "capacity": "250"}
    ],
    "shows": [
      "West End-style musicals",
      "Cirque-style acrobatics",
      "Comedy nights",
      "Magic shows",
      "Live music every evening",
      "Silent disco",
      "Game shows and quizzes"
    ],
    "live_music": "Live music plays throughout the ship each evening, from jazz in Anderson''s Bar to rock in The Club House and acoustic sets in The Crow''s Nest."
  }'::jsonb,
  
  -- Activities
  '{
    "pools": [
      {"name": "Main Pool", "description": "Large central pool surrounded by loungers and whirlpools."},
      {"name": "SkyDome Pool", "description": "Pool under the retractable glass roof - perfect in any weather."},
      {"name": "The Retreat Pool", "description": "Adults-only pool in a serene setting."},
      {"name": "Infinity Pool", "description": "Stunning aft pool with ocean views."}
    ],
    "sports": [
      "Full-size sports court (basketball, football, netball)",
      "Padel tennis",
      "Running track",
      "Deck games (shuffleboard, quoits)",
      "Virtual golf simulator",
      "Table tennis"
    ],
    "enrichment": [
      "Cookery classes with celebrity chefs",
      "Wine tasting sessions",
      "Gin masterclasses at 710 Club",
      "Art classes",
      "Dance lessons",
      "Guest speakers and lectures",
      "Photography workshops"
    ]
  }'::jsonb,
  
  -- Family
  '{
    "introduction": "Iona is designed with families in mind, offering dedicated spaces and activities for all ages.",
    "highlights": [
      "Dedicated kids'' clubs for ages 2-17",
      "Family-friendly pools and splash areas",
      "Kids'' menus in all restaurants",
      "Family entertainment and shows",
      "Interconnecting cabins available",
      "Teen zone with gaming and social space"
    ],
    "dining": "Children are welcome in all restaurants. Kids'' menus feature familiar favourites, and high chairs are available. The buffet is particularly convenient for families with fussy eaters.",
    "cabins": "Family cabins sleep up to 4 guests. Interconnecting cabins are available on request for larger families. Cots can be provided for infants."
  }'::jsonb,
  
  -- Kids
  '{
    "introduction": "P&O''s award-winning Reef kids'' clubs offer age-appropriate activities supervised by trained staff.",
    "clubs": [
      {
        "name": "The Reef - Splashers",
        "ages": "2-4 years",
        "description": "Gentle, supervised activities for toddlers including arts and crafts, story time, and soft play.",
        "activities": ["Arts and crafts", "Story time", "Singing", "Soft play", "Character visits"],
        "hours": "9am-12pm, 2pm-5pm, 7pm-10pm"
      },
      {
        "name": "The Reef - Surfers",
        "ages": "5-8 years",
        "description": "Fun-packed programmes with games, crafts, and themed activities.",
        "activities": ["Treasure hunts", "Pool games", "Creative crafts", "Party nights", "Mini Olympics"],
        "hours": "9am-12pm, 2pm-5pm, 7pm-10pm"
      },
      {
        "name": "The Reef - Scubas",
        "ages": "9-12 years",
        "description": "Active programmes for older children including sports and tech activities.",
        "activities": ["Sports tournaments", "Gaming", "Talent shows", "Science experiments", "Movie nights"],
        "hours": "9am-12pm, 2pm-5pm, 7pm-10pm"
      }
    ],
    "teen_zone": {
      "description": "H2O is the dedicated teen hangout for ages 13-17, offering a cool space to chill with new friends.",
      "features": ["Gaming consoles", "DJ lessons", "Movie screenings", "Silent disco", "Mocktail making", "Social events"]
    },
    "babysitting": "Night Nursery is available for children aged 6 months to 4 years from 6pm-2am (charges apply). Must be booked in advance on board."
  }'::jsonb,
  
  -- Accessibility
  '{
    "introduction": "P&O Cruises is committed to making cruising accessible to all guests. Iona features extensive accessibility provisions throughout the ship.",
    "cabins": "Iona has 35 fully accessible cabins with wider doorways, roll-in showers, grab rails, and lowered fixtures. These must be booked in advance through P&O''s dedicated accessibility team.",
    "mobility": "The ship features wide corridors, accessible lifts to all decks, and level access throughout public areas. Wheelchair and scooter hire is available on board.",
    "visual": "Menus and daily programmes are available in large print and braille. Guide dogs are welcome on board with advance notice.",
    "hearing": "Hearing loops are fitted in the main theatre, reception areas, and meeting rooms. Visual alerts can be provided in cabins.",
    "sensory": "Quiet spaces are available throughout the ship. The Retreat offers a calm environment away from busy areas. Staff are trained in autism awareness.",
    "contact": "Contact P&O''s Special Services team before booking to discuss your specific requirements and ensure appropriate arrangements are made."
  }'::jsonb,
  
  -- Wellness
  '{
    "introduction": "The Oasis Spa on Iona offers a tranquil escape with a range of treatments and facilities.",
    "spa": {
      "description": "A luxurious spa offering massage, facial, and body treatments using premium products.",
      "treatments": ["Hot stone massage", "Deep tissue massage", "Aromatherapy", "Anti-ageing facials", "Body wraps", "Couples'' treatments", "Manicures and pedicures"]
    },
    "thermal": "The Thermal Suite features heated loungers, a hydrotherapy pool, steam room, sauna, and aromatherapy room. Day passes and cruise-long passes available.",
    "gym": {
      "description": "A state-of-the-art fitness centre with ocean views, open 24 hours.",
      "equipment": ["Cardio machines", "Free weights", "Resistance machines", "Stretching area"],
      "classes": "Complimentary classes include yoga, Pilates, spinning, and HIIT sessions."
    },
    "salon": "The Beauty Salon offers hair styling, colouring, manicures, pedicures, and special occasion packages. Book early for formal nights."
  }'::jsonb,
  
  -- FAQ
  '[
    {"question": "What is the dress code on Iona?", "answer": "Daytime is casual. Evenings are smart casual, with formal nights once or twice per cruise where suits/cocktail dresses are encouraged (but not mandatory). Shorts and swimwear are not permitted in restaurants for dinner."},
    {"question": "Is Iona suitable for families?", "answer": "Yes! Iona has excellent facilities for families including dedicated kids'' clubs for ages 2-17, family cabins, and family-friendly dining and entertainment."},
    {"question": "Are drinks included?", "answer": "Tea, coffee, and water are complimentary. Alcoholic drinks and speciality coffees are not included but drinks packages are available for purchase."},
    {"question": "Can I use my mobile phone?", "answer": "Yes, P&O offers WiFi packages for purchase. Mobile signal is available when in port. Note that roaming charges may apply."},
    {"question": "What currency is used on board?", "answer": "All on-board purchases are in GBP and charged to your ship account. You can settle with credit/debit card at the end of the cruise."},
    {"question": "Is Iona wheelchair accessible?", "answer": "Yes, Iona has 35 accessible cabins and the ship features wide corridors, accessible lifts, and adapted facilities throughout."},
    {"question": "What time is dinner?", "answer": "Main dining offers two sittings (typically 6pm and 8:30pm) or Freedom Dining where you choose when to eat between 6pm and 9:30pm."},
    {"question": "Can I bring my own alcohol?", "answer": "No, alcohol cannot be brought on board. Any alcohol purchased in port will be stored and returned on the last night."}
  ]'::jsonb,
  
  -- SEO
  'P&O Iona Ship Guide | Cabins, Dining, Entertainment & Deck Plans',
  'Complete guide to P&O Iona - Britain''s largest cruise ship. Explore cabins, 16 restaurants, SkyDome entertainment, kids'' clubs, spa facilities, and everything you need to know before you sail.',
  ARRAY['P&O Iona', 'Iona cruise ship', 'P&O Cruises ship', 'Iona ship guide', 'Iona cabins', 'Iona restaurants', 'Iona entertainment', 'Iona deck plans', 'Iona reviews', 'British cruise ship'],
  
  -- Status
  'published',
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  overview_content = EXCLUDED.overview_content,
  cabins = EXCLUDED.cabins,
  deck_plans = EXCLUDED.deck_plans,
  onboard = EXCLUDED.onboard,
  dining = EXCLUDED.dining,
  entertainment = EXCLUDED.entertainment,
  activities = EXCLUDED.activities,
  family = EXCLUDED.family,
  kids = EXCLUDED.kids,
  accessibility = EXCLUDED.accessibility,
  wellness = EXCLUDED.wellness,
  faq = EXCLUDED.faq,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  meta_keywords = EXCLUDED.meta_keywords,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured,
  updated_at = NOW();
