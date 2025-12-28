# Port Guide Data Update Instructions (For AI Agents)

**Version:** 4.0 (Categorised Attractions + Enhanced Beach)  
**Updated:** 28 December 2024

**Purpose:** This guide is for AI agents (Auto/Agent mode) to update port guide content in `/src/data/ports.js`. Follow these instructions to add or update port data WITHOUT modifying any code structure.

---

## 📁 WHICH FILES TO USE

| File | Purpose | Who Uses It |
|------|---------|-------------|
| **`PERPLEXITY_PORT_GUIDE_PROMPT.md`** | Copy/paste into Perplexity to get port data | USER (in Perplexity) |
| **`PORT_GUIDE_UPDATE_INSTRUCTIONS.md`** | Instructions for AI agent to update ports.js | AI AGENT (this file) |

---

## ⚡ QUICK START (AI Agent TL;DR)

**Your mission:** Update port data in `/src/data/ports.js` when user provides Perplexity data.

**Fast track:**
1. Open `/src/data/ports.js`
2. Find port by slug (e.g., `slug: 'vigo'`)
3. Replace all content in that port object with new data
4. Each attraction MUST have: `title`, `category`, `description`, `duration`, `tips` (array of 3), `highlights`, `goodFor`
5. Beach section: If port has beaches, include full v4 format with `type`, `waterEntry`, `shelter`, `facilities`, `access`, `bestFor`. If no beach, set `nearestBeach: null`
6. FAQ: Include 10 questions (8 core + 2 conditional based on port type)
7. Clean data: escape apostrophes (`\'`), remove price symbols/emojis/em-dashes, use British English
8. Set `status: 'published'` and update `lastUpdated: 'YYYY-MM-DD'`
9. Save and confirm

**Reference:** Look at Barcelona (line ~479) for complete example structure.

---

## 🤖 INSTRUCTIONS FOR AI AGENT

**Your Task:** When given port data from Perplexity (or other sources), update the corresponding port object in `/src/data/ports.js` with the new content.

**Process:**
1. Read the port data provided by the user
2. Open `/src/data/ports.js`
3. Search for the port using its slug (e.g., `slug: 'vigo'`)
4. Update ALL sections with the new data following the structure below
5. Change `status: 'template'` to `status: 'published'`
6. Update `lastUpdated` to today's date (YYYY-MM-DD format)
7. Save the file
8. Confirm completion to the user

---

## 🎯 EXPECTED INPUT FORMAT

The user will provide you with:
1. **Port name** (e.g., "Vigo")
2. **Raw data from Perplexity** or structured data covering all sections below

**Example user message:**
```
Update the Vigo port guide with this data:

Port: Vigo, Spain
Region: Atlantic Coast
Currency: EUR (€)
Language: Spanish & Galician
[... all other data ...]
```

---

## 🚨 CRITICAL RULES (DO NOT SKIP)

**MUST DO:**
1. ✅ **ONLY UPDATE DATA** - Do not change JavaScript code structure, function definitions, or imports
2. ✅ **MAINTAIN FORMATTING** - Keep all commas, brackets, quotes, and indentation exactly as in the original
3. ✅ **USE BRITISH ENGLISH** - "centre" not "center", "organised" not "organized", "colour" not "color"
4. ✅ **NO PRICE SYMBOLS** - Remove ALL £, ££, €, $, USD, GBP symbols from descriptions
5. ✅ **NO EMOJIS** - Remove ALL emojis (🌊, ⛱️, 🍴, etc.)
6. ✅ **NO EM-DASHES** - Replace em-dashes (–, —) with "to" (e.g., "2 to 3 hours" not "2–3 hours")
7. ✅ **ESCAPE APOSTROPHES** - Use `\'` for apostrophes inside single-quoted strings (e.g., `'Don\'t miss'`)
8. ✅ **CHANGE STATUS** - Update `status: 'template'` to `status: 'published'` when complete
9. ✅ **UPDATE DATE** - Set `lastUpdated` to today's date in `'YYYY-MM-DD'` format
10. ✅ **PRESERVE ARRAYS** - Keep array structures with proper commas between elements

**MUST NOT DO:**
1. ❌ **DO NOT CHANGE** - `id`, `slug`, `region` fields (these are system identifiers)
2. ❌ **DO NOT CHANGE** - `relatedDestinations` array (leave as is)
3. ❌ **DO NOT ADD** - New fields that don't exist in the template
4. ❌ **DO NOT REMOVE** - Required sections (even if empty, keep the structure)
5. ❌ **DO NOT USE** - Double quotes for strings (use single quotes to match existing code)
6. ❌ **DO NOT MODIFY** - The JavaScript syntax, only the content values

---

## 📍 STEP-BY-STEP PROCESS

### Step 1: Locate the Port
1. Open `/src/data/ports.js`
2. Search for the port slug (e.g., search for `slug: 'vigo'` or `slug: 'cadiz'`)
3. Find the opening `{` of that port object
4. Find the closing `},` of that port object (usually marked with a comment like `// End of Vigo`)

### Step 2: Parse the User's Data
Extract all required information from the user's message:
- Basic info (name, country, coordinates, tagline, description)
- Quick facts (6 items)
- About port details
- Getting around information
- Transport connections
- 6 attractions (mustSeeSights)
- Beach information
- 4 food venues
- 5-7 insider tips
- Weather data (12 months)
- 3-5 FAQs
- Practical info
- Meta data (SEO)

### Step 3: Update Each Section
Following the structure guide below, update EVERY section with the new data.
**Important:** If data is missing for a section, leave the structure but use empty arrays `[]` or placeholder text.

### Step 4: Clean the Data
As you update, ensure:
- All apostrophes are escaped (`\'`)
- No price symbols (£, €, $)
- No emojis
- No em-dashes (use "to")
- British English spelling
- Proper commas after each array element and object

### Step 5: Update Status and Date
- Change `status: 'template'` to `status: 'published'`
- Update `lastUpdated: 'YYYY-MM-DD'` to today's date

### Step 6: Verify and Save
- Check that all brackets and commas are in place
- Ensure no syntax errors
- Save the file
- Confirm completion to the user

---

## 📂 FILE STRUCTURE

**File to modify:** `/src/data/ports.js`

**Location in file:**
- Regions defined at top (lines 10-40)
- Individual ports start around line 45
- Each port is a complete JavaScript object in the `PORTS` array

---

## 📝 Port Data Structure

Each port has these sections (in order):

```javascript
{
  id: 'port-id',                    // DO NOT CHANGE
  slug: 'port-slug',                // DO NOT CHANGE
  name: 'Port Name',                // Update if needed
  country: 'Country',               // Update if needed
  region: 'region-slug',            // DO NOT CHANGE (must match existing region)
  coordinates: { lat: 0.0, lon: 0.0 },  // Update with correct coordinates
  tagline: 'Short catchy phrase',   // Update
  description: 'Hero description',  // Update
  
  quickFacts: { /* ... */ },        // Update 6 facts
  aboutPort: { /* ... */ },         // Update port overview
  gettingAround: { /* ... */ },     // Update transport info
  transportConnections: { /* ... */ }, // Update airport, trains, cruise lines
  mustSeeSights: [ /* ... */ ],     // Update 6 attractions
  nearestBeach: { /* ... */ },      // Update beach info
  foodAndDrink: [ /* ... */ ],      // Update 4 food venues
  insiderTips: [ /* ... */ ],       // Update 5-7 tips
  weather: { /* ... */ },           // Update weather data
  faq: [ /* ... */ ],               // Update 3-5 FAQs
  practicalInfo: { /* ... */ },     // Update practical details
  relatedDestinations: [ /* ... */ ], // DO NOT CHANGE
  meta: { /* ... */ },              // Update SEO meta data
  status: 'template',               // Update to 'published' when complete
  lastUpdated: 'YYYY-MM-DD',        // Update to today's date
}
```

---

## 📋 Section-by-Section Update Guide

### 1. BASIC INFORMATION

```javascript
name: 'Vigo',
country: 'Spain',
coordinates: { lat: 42.2406, lon: -8.7207 },
tagline: 'Gateway to Galicia and Santiago de Compostela',
description: 'Vigo is Spain\'s largest fishing port on the Atlantic coast, offering access to Santiago de Compostela, beautiful Galician cuisine, and stunning coastal scenery.',
```

**What to update:**
- `coordinates`: Use the latitude and longitude from the data
- `tagline`: Short, catchy phrase (max 60 characters)
- `description`: 2-3 sentences for the hero section (appears at the top)

---

### 2. QUICK FACTS (6 items)

```javascript
quickFacts: {
  currency: 'EUR (€)',
  language: 'Spanish & Galician',
  timezone: 'CET/CEST',
  portType: 'Home Port & Port of Call',
  walkable: true,
  tenderRequired: false,
},
```

**What to update:**
- `currency`: Currency code and symbol
- `language`: Languages spoken
- `timezone`: Timezone abbreviation
- `portType`: "Home Port", "Port of Call", or "Home Port & Port of Call"
- `walkable`: `true` or `false` (is city centre walkable from port?)
- `tenderRequired`: `true` or `false` (do passengers need to tender?)

---

### 3. ABOUT PORT

```javascript
aboutPort: {
  overview: 'Barcelona is one of Europe\'s biggest and easiest cruise ports, with terminals close to the city centre and excellent links to the airport and trains.',
  terminals: 'World Trade Centre, Moll Adossat (terminals A, B, C, D), Moll de Barcelona, and Terminal Norte. Most large cruise ships use Moll Adossat.',
  shuttleServices: 'Free or low-cost shuttle buses run from most terminals to the Las Ramblas/Columbus Monument area.',
  walkability: 'World Trade Centre and Moll de Barcelona are walkable to the city (15 to 20 minutes). Moll Adossat terminals are 3km from centre; shuttle or taxi recommended.',
},
```

**What to update:**
- `overview`: Paragraph about the cruise port itself
- `terminals`: Which terminals exist and their names
- `shuttleServices`: Shuttle bus information
- `walkability`: How far to walk, is it pleasant?

---

### 4. GETTING AROUND

```javascript
gettingAround: {
  fromPort: 'Shuttle buses drop you at Las Ramblas. From there, you can walk, take the metro, hop-on-hop-off bus, or taxi.',
  publicTransport: 'Metro is fast and cheap. L3 (green line) connects centre to many Gaudi sites. T10 ticket gives 10 journeys.',
  taxis: 'Plentiful and metered. Expect €10 to €15 from port to city, more for Sagrada Família or Park Güell. Agree fare for day hire.',
  walkingDistance: 'Old Town, Gothic Quarter and La Rambla are compact and walkable. Gaudi sights are spread out; combine walking with metro or taxi.',
  sightseeingBus: 'Two routes (red and blue) cover all major sights. Expensive but convenient for cruise day.',
  accessibility: 'Barcelona is fairly accessible. Metro has lifts at many stations. Sagrada Família and major museums have good access.',
},
```

**What to update:**
- `fromPort`: How to get from ship to city
- `publicTransport`: Metro, buses, trams available
- `taxis`: Availability, metered or flat rate, approximate costs (NO £ symbols)
- `walkingDistance`: Can you walk places? How far?
- `sightseeingBus`: Hop-on hop-off bus info
- `accessibility`: Wheelchair access and mobility info

---

### 5. TRANSPORT CONNECTIONS

```javascript
transportConnections: {
  airport: {
    name: 'Barcelona El Prat (BCN)',
    distance: '25 to 35 minutes from cruise port by taxi',
    options: 'Aerobus express shuttle to city (€5.90), then port shuttle or taxi. Direct taxi €30 to €40. Metro possible but awkward with luggage.',
  },
  trains: {
    mainStation: 'Barcelona Sants',
    description: 'High-speed AVE trains to Madrid (3 hours), Valencia, and France. Regional trains along the coast.',
    localHubs: 'Passeig de Gràcia and França stations also serve cruise passengers.',
  },
  cruiseLines: ['P&O Cruises', 'Royal Caribbean', 'MSC Cruises', 'Norwegian Cruise Line', 'Celebrity Cruises', 'Princess Cruises', 'Cunard', 'Azamara', 'Oceania Cruises'],
},
```

**What to update:**
- `airport.name`: Airport name and code
- `airport.distance`: Time/distance from port
- `airport.options`: Transport options (taxi, bus, train) with journey times (NO £ symbols)
- `trains.mainStation`: Main railway station name
- `trains.description`: Where trains go to/from
- `trains.localHubs`: Other important stations
- `cruiseLines`: Array of cruise line names that use this port (keep as array with quotes and commas)

---

### 6. MUST-SEE SIGHTS (6-9 attractions with categories)

```javascript
mustSeeSights: [
  {
    title: 'Sagrada Família',
    category: 'landmark', // REQUIRED: landmark | historic | nature | markets | stroll | active | excursion | family | beach
    description: 'Gaudí\'s unfinished masterpiece and Barcelona\'s most iconic sight. The interior is breathtaking. Book tickets weeks ahead for cruise day.',
    duration: '2 to 3 hours for a relaxed pace',
    tips: [
      'Book tickets at least 2 weeks ahead for popular times',
      'Morning visits have better light for interior photos',
      'The Passion facade is more dramatic than the Nativity side'
    ],
    highlights: ['Architecture', 'Photography', 'Religious', 'Art'],
    goodFor: ['First-time visitors', 'Architecture lovers', 'Photographers'],
  },
  {
    title: 'Gothic Quarter',
    description: 'Medieval heart of Barcelona with narrow streets, Roman remains, and the Cathedral. Easy to explore on foot.',
    image: 'gothic-quarter.webp',
    duration: '1 to 2 hours',
  },
  // ... up to 6 total
],
```

**What to update:**
- Create array with **6-9 attractions** covering required categories
- **REQUIRED categories** (at least 1 from each): `landmark`, `historic`, `stroll`
- **OPTIONAL categories**: `nature`, `markets`, `active`, `excursion`, `family`, `beach`
- Each attraction needs:
  - `title`: Attraction name
  - `category`: One of: `landmark`, `historic`, `nature`, `markets`, `stroll`, `active`, `excursion`, `family`, `beach`
  - `description`: 2-3 sentences about it
  - `duration`: Format as "X to Y hours for a relaxed pace"
  - `tips`: Array of 3 practical insider tips
  - `highlights`: Array from: Shopping, Food, History, Photography, Architecture, Gardens, Views, Culture, Art, Family-friendly, Religious, Museums, Markets, Beaches, Nature, Wildlife, Scenic
  - `goodFor`: Array from: First-time visitors, History buffs, Families, Photographers, Architecture lovers, Foodies, Active travelers, Art lovers, Culture seekers, Couples, Solo travelers
- **IMPORTANT:** Keep the array structure with `[` `]` and commas between objects

---

### 7. NEAREST BEACH (Conditional - v4 Format)

**IMPORTANT:** Only include beach section for `beach-city` and `island` port types.
For `fjord-nature`, `expedition`, `city-culture`, or `gateway` ports, set: `nearestBeach: null,`

```javascript
// For beach ports (Mediterranean, Caribbean, Islands):
nearestBeach: {
  name: 'Barceloneta Beach',
  description: 'Wide sandy beach right in the city, 10 minutes from the port. Busy in summer but convenient for a quick swim or stroll.',
  type: 'sand', // sand | pebbles | rocky | mixed
  waterEntry: 'shallow entry', // shallow entry | drops off quickly | varies
  shelter: 'exposed', // sheltered | exposed | partially sheltered
  crowdLevel: 'busy in summer', // quiet | moderate | busy in summer | very busy
  facilities: {
    lifeguards: true,
    lifeguardsSeasonal: true, // true if only in summer
    sunbeds: true,
    umbrellas: true,
    showers: true,
    toilets: true,
    restaurants: true,
    changingRooms: false,
  },
  access: {
    walkTime: '20 to 25 minutes from Columbus Monument',
    taxiTime: '10 to 15 minutes from port',
    busRoute: 'Bus 59 from Plaça Catalunya',
    notes: 'Flat promenade walk, no steep paths',
  },
  bestFor: ['swimming', 'sunbathing', 'people watching'],
  tip: 'Arrive before 11am for a good spot in peak season.',
},

// For non-beach ports (fjords, northern, city-only):
nearestBeach: null,
```

**What to update:**
- `name`: Beach name
- `description`: 2-3 sentences about the beach
- `type`: sand / pebbles / rocky / mixed
- `waterEntry`: shallow entry / drops off quickly / varies
- `shelter`: sheltered / exposed / partially sheltered
- `crowdLevel`: quiet / moderate / busy in summer / very busy
- `facilities`: Object with boolean values for each facility
- `access`: Object with walkTime, taxiTime, busRoute, notes
- `bestFor`: Array from: families with children, swimming, watersports, quiet relaxation, people watching, snorkelling
- `tip`: One insider tip sentence

---

### 8. FOOD AND DRINK (4 venues MAXIMUM)

```javascript
foodAndDrink: [
  {
    name: 'La Boqueria Market',
    type: 'Market',
    description: 'Legendary food market just off Las Ramblas. Try jamón, fresh seafood, and fruit juices. Can be touristy but still excellent.',
  },
  {
    name: 'El Xampanyet',
    type: 'Tapas Bar',
    description: 'Iconic old tapas bar near the Picasso Museum. Standing room only, great atmosphere, classic tapas and cava.',
  },
  // ... up to 4 total
],
```

**What to update:**
- Create array with **4 venues maximum**
- Each venue needs:
  - `name`: Restaurant/venue name
  - `type`: "Market", "Restaurant", "Tapas Bar", "Food Hall", "Cafe", etc.
  - `description`: What they're known for, atmosphere, specialties (NO £ symbols)
- Keep the array structure with `[` `]` and commas between objects

---

### 9. INSIDER TIPS (5-7 tips)

```javascript
insiderTips: [
  'Book Sagrada Família and Park Güell tickets online weeks in advance. Same-day tickets sell out.',
  'Watch your valuables on Las Ramblas and in the Gothic Quarter. Pickpockets target cruise passengers.',
  'Allow 90 minutes to get back to your ship from the furthest Gaudi sites.',
  'Skip the overpriced restaurants on Las Ramblas. Walk one street back for better value.',
  'Download the metro map. T10 ticket is great value if visiting multiple sights.',
  'Taxis are metered and honest. Agree fare in advance for private tours.',
  'Sagrada Família towers have long queues. If time is tight, the interior is the highlight.',
],
```

**What to update:**
- Create array with **5 to 7 tips**
- Each tip is a single string (in quotes)
- Practical advice for cruise passengers:
  - Booking tickets in advance
  - Safety and pickpockets
  - Timing and all-aboard time
  - Transport advice
  - Tourist traps to avoid
  - Money-saving tips
- **IMPORTANT:** Each tip ends with a comma (except the last one)

---

### 10. WEATHER (12 months data)

```javascript
weather: {
  intro: 'Barcelona has a Mediterranean climate with hot, dry summers and mild winters. Spring and autumn are ideal for sightseeing.',
  months: [
    { month: 'Jan', highC: 13, lowC: 5, rainMm: 40, sunDays: 18, seaTempC: 14 },
    { month: 'Feb', highC: 14, lowC: 6, rainMm: 35, sunDays: 18, seaTempC: 13 },
    { month: 'Mar', highC: 16, lowC: 8, rainMm: 40, sunDays: 20, seaTempC: 13 },
    { month: 'Apr', highC: 18, lowC: 10, rainMm: 45, sunDays: 21, seaTempC: 14 },
    { month: 'May', highC: 21, lowC: 13, rainMm: 50, sunDays: 23, seaTempC: 17 },
    { month: 'Jun', highC: 26, highC: 18, rainMm: 40, sunDays: 24, seaTempC: 21 },
    { month: 'Jul', highC: 29, lowC: 21, rainMm: 25, sunDays: 27, seaTempC: 24 },
    { month: 'Aug', highC: 29, lowC: 21, rainMm: 60, sunDays: 26, seaTempC: 25 },
    { month: 'Sep', highC: 26, lowC: 18, rainMm: 85, sunDays: 22, seaTempC: 23 },
    { month: 'Oct', highC: 22, lowC: 14, rainMm: 90, sunDays: 21, seaTempC: 20 },
    { month: 'Nov', highC: 17, lowC: 10, rainMm: 55, sunDays: 18, seaTempC: 18 },
    { month: 'Dec', highC: 14, lowC: 6, rainMm: 45, sunDays: 17, seaTempC: 15 },
  ],
  bestTime: {
    overall: 'April to June and September to October',
    hottest: 'July and August (very hot, very busy, but great for beaches)',
    quietest: 'November to March (cooler, fewer tourists, still pleasant)',
    recommendation: 'May or September offer the best balance of weather and crowds for first-time visitors.',
  },
},
```

**What to update:**
- `intro`: 1-2 sentences about the climate
- `months`: Array of 12 months with data:
  - `month`: Three-letter abbreviation (Jan, Feb, Mar, etc.)
  - `highC`: Average high temperature in Celsius
  - `lowC`: Average low temperature in Celsius
  - `rainMm`: Average rainfall in millimetres
  - `sunDays`: Number of sunny days per month
  - `seaTempC`: Sea temperature in Celsius
- `bestTime.overall`: Which months are best overall? Why?
- `bestTime.hottest`: Hottest months - pros and cons
- `bestTime.quietest`: Cooler months - pros and cons
- `bestTime.recommendation`: For first-time cruise visitors, what's the sweet spot?

**IMPORTANT:** All 12 months must be included in order (Jan to Dec)

---

### 11. FAQ (10 questions - v4 Format)

```javascript
faq: [
  // 8 CORE questions (always include):
  { question: 'Is Barcelona walkable from the cruise port?', answer: '...' },
  { question: 'How long do you need in Barcelona?', answer: '...' },
  { question: 'Is English widely spoken in Barcelona?', answer: '...' },
  { question: 'Is Barcelona safe for tourists?', answer: '...' },
  { question: 'Is Barcelona expensive?', answer: '...' },
  { question: 'Do I need cash in Barcelona or can I use card?', answer: '...' },
  { question: 'Should I book a ship excursion or explore independently?', answer: '...' },
  { question: 'What is the best thing to do in Barcelona on a cruise day?', answer: '...' },
  
  // 2 CONDITIONAL questions (pick based on port type):
  // For beach ports:
  { question: 'Is Barcelona good for swimming?', answer: '...' },
  { question: 'Is Barcelona family-friendly?', answer: '...' },
  
  // For gateway ports (e.g., Civitavecchia):
  // { question: 'Can you do Rome from Civitavecchia on a cruise day?', answer: '...' },
  // { question: 'Is Rome worth visiting from the cruise port?', answer: '...' },
  
  // For fjord/nature ports:
  // { question: 'What\'s the best way to see the fjords?', answer: '...' },
  // { question: 'Is Bergen good for hiking?', answer: '...' },
  
  // For expedition ports:
  // { question: 'What wildlife can you see?', answer: '...' },
  // { question: 'What\'s the weather like?', answer: '...' },
],
```

**What to update:**
- Create array with **10 FAQs** (8 core + 2 conditional)
- Each FAQ needs:
  - `question`: Common question cruise passengers search for
  - `answer`: 2-3 sentence helpful answer

**8 CORE questions (always include):**
1. Is [PORT] walkable from the cruise port?
2. How long do you need in [PORT]?
3. Is English widely spoken in [PORT]?
4. Is [PORT] safe for tourists?
5. Is [PORT] expensive?
6. Do I need cash in [PORT] or can I use card?
7. Should I book a ship excursion or explore independently?
8. What is the best thing to do in [PORT] on a cruise day?

**2 CONDITIONAL questions (pick based on port type):**
- Beach ports: swimming quality, family-friendly
- Gateway ports: day trip feasibility (e.g., Can you do Rome from Civitavecchia?)
- Fjord ports: hiking, best way to see fjords
- Expedition ports: wildlife, weather
  - What should I book in advance?

---

### 12. PRACTICAL INFO

```javascript
practicalInfo: {
  bestTimeToVisit: 'April to June and September to October for pleasant weather and fewer crowds',
  cruiseTerminals: ['World Trade Centre', 'Moll Adossat (A, B, C, D)', 'Moll de Barcelona', 'Terminal Norte'],
  nearbyAirport: 'Barcelona El Prat (BCN) - 30 minutes',
  visaInfo: 'Schengen visa requirements apply',
},
```

**What to update:**
- `bestTimeToVisit`: One sentence summary of best months
- `cruiseTerminals`: Array of terminal names (keep as array with quotes and commas)
- `nearbyAirport`: Airport name, code, and distance
- `visaInfo`: "Schengen visa requirements apply" or "UK visa requirements apply" or "No visa required for most nationalities"

---

### 13. META DATA (SEO)

```javascript
meta: {
  title: 'Barcelona Cruise Port Guide | Gaudí, Beaches & Tapas',
  description: 'Complete Barcelona cruise port guide. Visit Sagrada Família, explore the Gothic Quarter, enjoy tapas at La Boqueria, and discover insider tips for your Mediterranean cruise.',
  keywords: ['Barcelona cruise port', 'Barcelona shore excursions', 'Barcelona things to do', 'Barcelona from cruise ship', 'Barcelona Moll Adossat', 'Barcelona cruise terminal'],
},
```

**What to update:**
- `title`: SEO page title (max 60 characters) - Format: "[Port] Cruise Port Guide | [Key Attractions]"
- `description`: SEO meta description (max 160 characters) - Summarise what the guide covers
- `keywords`: Array of relevant keywords (6-8 keywords, keep as array with quotes and commas)

---

### 14. STATUS & DATE

```javascript
status: 'published',
lastUpdated: '2025-12-28',
```

**What to update:**
- `status`: Change from `'template'` to `'published'` when the guide is complete
  - `'template'` = Shows "Coming Soon" banner
  - `'published'` = Full guide live, no banner
- `lastUpdated`: Today's date in format `'YYYY-MM-DD'`

---

## 🔧 Common Mistakes to Avoid

### ❌ WRONG:
```javascript
description: "It's a beautiful port"  // Wrong quote type
insiderTips: [
  'Book ahead'  // Missing comma
  'Watch valuables'
]
mustSeeSights: [
  { title: 'Cathedral' }  // Missing comma after closing brace
  { title: 'Museum' }
]
taxis: 'Available. Cost €15-€20'  // Has em-dash
foodAndDrink: 'Great tapas ££'  // Has price symbols
```

### ✅ CORRECT:
```javascript
description: 'It\'s a beautiful port'  // Escaped apostrophe
insiderTips: [
  'Book ahead',  // Comma after each tip
  'Watch valuables',
]
mustSeeSights: [
  { title: 'Cathedral' },  // Comma after closing brace
  { title: 'Museum' },
]
taxis: 'Available. Cost 15 to 20 euros'  // Uses "to" instead of dash, no symbols
foodAndDrink: 'Great tapas'  // No price symbols
```

---

## ✅ Checklist Before Saving

**AI Agent - Verify ALL of these before saving:**

- [ ] Found correct port by slug
- [ ] Updated ALL 14 sections (basic info → status & date)
- [ ] All apostrophes escaped with `\'` (e.g., `'don\'t'`, `'it\'s'`)
- [ ] All commas in correct places (after each array element)
- [ ] Removed ALL price symbols (£, ££, €, $, USD, GBP)
- [ ] Removed ALL emojis (🌊, ⛱️, 🍴, etc.)
- [ ] Replaced ALL em-dashes (–, —) with "to"
- [ ] Used British English spelling throughout
- [ ] 6-9 attractions in `mustSeeSights` array with `category`, `duration`, `tips`, `highlights`, `goodFor`
- [ ] Each attraction has one of: `landmark`, `historic`, `nature`, `markets`, `stroll`, `active`, `excursion`, `family`, `beach`
- [ ] Beach section: Full v4 format for beach ports, or `nearestBeach: null` for non-beach ports
- [ ] 4 food venues maximum in `foodAndDrink` array
- [ ] 6-8 tips in `insiderTips` array
- [ ] All 12 months present in `weather.months` array (Jan through Dec)
- [ ] 10 questions in `faq` array (8 core + 2 conditional)
- [ ] Changed `status: 'template'` to `status: 'published'`
- [ ] Updated `lastUpdated` to today's date (`'YYYY-MM-DD'`)
- [ ] Did NOT change `id`, `slug`, `region`, or `relatedDestinations`
- [ ] Did NOT modify JavaScript structure, only content values
- [ ] All brackets balanced `{ }` and `[ ]`
- [ ] Proper indentation maintained

**After completing checklist, save the file and confirm to user.**

---

## 🎯 Quick Example: Updating Vigo

**Given Data from Perplexity:**
"Vigo is Spain's largest fishing port. Currency is Euro. Main sights: Cíes Islands, Monte do Castro, Old Town..."

**Update in ports.js:**

1. Find: `slug: 'vigo'`
2. Update the data:

```javascript
{
  id: 'vigo',
  slug: 'vigo',  // DO NOT CHANGE
  name: 'Vigo',
  country: 'Spain',
  region: 'atlantic-coast',  // DO NOT CHANGE
  coordinates: { lat: 42.2406, lon: -8.7207 },
  tagline: 'Gateway to Galicia and Santiago de Compostela',
  description: 'Vigo is Spain\'s largest fishing port on the Atlantic coast, offering access to Santiago de Compostela, beautiful Galician cuisine, and stunning coastal scenery.',
  
  quickFacts: {
    currency: 'EUR (€)',
    language: 'Spanish & Galician',
    // ... etc
  },
  
  mustSeeSights: [
    {
      title: 'Cíes Islands',
      description: 'Pristine islands with white beaches, often called the Galician Caribbean. Accessible by ferry from Vigo port.',
      image: 'cies-islands.webp',
      duration: 'Half day to full day',
    },
    // ... up to 6 total
  ],
  
  status: 'published',  // Change from 'template'
  lastUpdated: '2025-12-28',  // Update to today
}
```

3. Save the file
4. The banner will automatically disappear
5. Images can be uploaded separately via admin panel

---

## 📞 After Completion

Once you've updated the port guide and saved the file, provide the user with:

1. ✅ **Confirmation message:**
   ```
   ✅ Port guide for [PORT NAME] has been successfully updated!
   
   Changes made:
   - Updated all 14 sections with new content
   - Changed status from 'template' to 'published'
   - Updated lastUpdated to [DATE]
   - Removed price symbols, emojis, and em-dashes
   - Used British English throughout
   
   The port guide is now live at:
   https://www.limitlesscruises.com/ports/[slug]
   
   The "Coming Soon" banner will no longer appear.
   
   Next steps:
   - Upload images via /admin/port-guide-images
   - Review the live page
   - Repeat for next port if needed
   ```

2. 📊 **Summary of changes:**
   - Number of attractions added
   - Number of food venues added
   - Number of tips added
   - Any issues or missing data

3. ⚠️ **Warnings (if any):**
   - Missing data sections
   - Data that couldn't be parsed
   - Any manual review needed

---

## 🔄 READY FOR NEXT PORT

After completing one port, you're ready to receive data for the next port. The user can simply provide:

```
Update [PORT NAME] with this data:
[PASTE DATA HERE]
```

And you'll repeat the process.

---

## 📚 QUICK REFERENCE: Port Regions

**Regions in the system:**
- `'uk'` - United Kingdom ports (Southampton, Dover)
- `'mediterranean'` - Mediterranean Sea ports (Barcelona, Málaga, Alicante, Gibraltar, Civitavecchia)
- `'atlantic-coast'` - Atlantic Coast ports (Lisbon, Vigo, Cádiz)
- `'atlantic-islands'` - Atlantic Island ports (Tenerife, Madeira, Las Palmas/Gran Canaria)

**DO NOT change the region value** - it's part of the site structure and affects URLs.

---

**Remember:** You're updating DATA, not CODE. Keep all JavaScript syntax exactly as it is, only change the content values within the strings and arrays.

