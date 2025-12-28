# Perplexity Prompt for Cruise Line Data Collection

## Quick Use Prompt

Copy and paste this into Perplexity, replacing `[CRUISE_LINE_NAME]` with the actual cruise line name:

---

**I need comprehensive data about [CRUISE_LINE_NAME] cruise line for a UK cruise booking website. Provide detailed information in JSON format about:**

**Ships:**
- Current fleet overview (size, capacity, ship types)
- List of current ships with capacity, year built, and key features
- Key ship highlights

**Dining:**
- Overview of dining philosophy
- Included dining venues (name, description, cuisine type)
- Specialty dining venues (name, description, cost if applicable)
- Dining highlights

**Entertainment:**
- Overview of entertainment approach
- Shows and productions (name and description)
- Activities (name and description)
- Nightlife venues (name and description)
- Entertainment highlights

**Value:**
- What's included in the cruise fare
- Pricing approach and structure
- Value proposition highlights

**Target Audience:**
- Whether it's adults-only or family-friendly
- Description of who it appeals to
- Best for (target audience types)

**Destinations:**
- Top destination regions with descriptions
- Destination highlights
- UK departure ports information (if applicable)

**Kids Club (if family-friendly):**
- Kids club name
- Introduction and overview
- Quick facts
- Age groups with schedules (club name, age range, morning/afternoon/evening hours, typical activities)
- Cost information and booking details
- Feature highlights
- Additional notes

**Cabin Types:**
- Overview of accommodation options
- Cabin categories (name, description, typical size, amenities)
- Cabin highlights

**Accessibility:**
- Introduction about accessibility support
- Accessible cabin information
- Tips covering: accessible cabins, mobility equipment, boarding assistance, dietary needs
- Mobility support details
- Dietary accommodations information

**Loyalty Program:**
- Program name
- Introduction
- How points/credits are earned
- Tier structure with benefits (tier name, points required, key benefits)
- Additional notes

**FAQs:**
- 5-10 common questions with detailed answers

**Why Choose:**
- 4-6 key benefits (title and 2-3 sentence description each)

**Highlights:**
- 6-8 key selling points as single sentence fragments

**UK Market Focus:**
Where relevant, mention:
- UK departure ports
- No-fly cruise options
- Pounds sterling onboard
- ABTA protection
- Regional UK ports

**Format the response as JSON matching this structure:**

```json
{
  "tagline": "Marketing tagline",
  "description": "2-3 sentence overview for UK customers",
  "category": "mainstream|premium|luxury|ultra-luxury|expedition|traditional",
  "ships": {
    "fleetOverview": "Brief overview",
    "currentFleet": [
      {
        "name": "Ship Name",
        "capacity": "Guest capacity",
        "yearBuilt": "Year",
        "keyFeatures": ["Feature 1", "Feature 2"]
      }
    ],
    "shipHighlights": ["Highlight 1", "Highlight 2"]
  },
  "dining": {
    "overview": "Dining philosophy",
    "includedDining": [
      {
        "name": "Restaurant Name",
        "description": "Description"
      }
    ],
    "specialtyDining": [
      {
        "name": "Restaurant Name",
        "description": "Description",
        "cuisineType": "Cuisine type"
      }
    ],
    "diningHighlights": ["Highlight 1", "Highlight 2"]
  },
  "entertainment": {
    "overview": "Entertainment approach",
    "shows": [
      {
        "name": "Show Name",
        "description": "Description"
      }
    ],
    "activities": [
      {
        "name": "Activity Name",
        "description": "Description"
      }
    ],
    "nightlife": [
      {
        "name": "Venue Name",
        "description": "Description"
      }
    ],
    "entertainmentHighlights": ["Highlight 1", "Highlight 2"]
  },
  "value": {
    "whatsIncluded": ["Item 1", "Item 2"],
    "pricingApproach": "Pricing structure description",
    "valueHighlights": ["Highlight 1", "Highlight 2"]
  },
  "targetAudience": {
    "adultsOnly": false,
    "familyFriendly": true,
    "description": "Who it appeals to",
    "bestFor": ["Type 1", "Type 2"]
  },
  "destinations": {
    "topDestinations": [
      {
        "name": "Destination",
        "description": "Why popular"
      }
    ],
    "destinationHighlights": ["Highlight 1"],
    "ukDepartures": "UK port information"
  },
  "kidsClub": {
    "available": true,
    "name": "Club Name",
    "intro": "Introduction",
    "quickFacts": ["Fact 1", "Fact 2"],
    "ageGroups": [
      {
        "club": "Club Name",
        "age": "Age range",
        "morning": "Hours",
        "afternoon": "Hours",
        "evening": "Hours",
        "activities": "Activity description"
      }
    ],
    "costsInfo": "Cost information",
    "highlights": [
      {
        "title": "Feature",
        "description": "Description"
      }
    ],
    "note": "Additional notes"
  },
  "cabinTypes": {
    "overview": "Accommodation overview",
    "categories": [
      {
        "name": "Cabin Type",
        "description": "Description",
        "typicalSize": "Size",
        "amenities": ["Amenity 1"]
      }
    ],
    "highlights": ["Highlight 1"]
  },
  "accessibility": {
    "intro": "Introduction",
    "accessibleCabins": "Cabin information",
    "tips": [
      {
        "title": "Tip category",
        "description": "Tip details"
      }
    ],
    "mobilitySupport": "Mobility information",
    "dietaryNeeds": "Dietary information"
  },
  "loyaltyProgram": {
    "name": "Program Name",
    "intro": "Introduction",
    "pointsInfo": "How points earned",
    "tiers": [
      {
        "tier": "Tier Name",
        "points": "Points required",
        "benefits": "Benefits"
      }
    ]
  },
  "faqs": [
    {
      "question": "Question",
      "answer": "Answer"
    }
  ],
  "whyChoose": [
    {
      "title": "Benefit title",
      "description": "2-3 sentence description"
    }
  ],
  "highlights": [
    "Highlight 1",
    "Highlight 2"
  ]
}
```

**Please ensure all information is current as of 2024-2025 and accurate. Focus on what makes this cruise line unique and appealing to UK customers. Include specific ship names, restaurant names, and concrete details.**

---

## Cruise Lines to Collect Data For

1. P&O Cruises
2. Royal Caribbean
3. MSC Cruises
4. Norwegian Cruise Line
5. Disney Cruise Line
6. Celebrity Cruises
7. Fred. Olsen Cruise Lines
8. Holland America Line
9. Marella Cruises
10. Virgin Voyages
11. Viking
12. Seabourn
13. Princess Cruises
14. Azamara
15. Cunard
16. Aurora Expeditions
17. Hurtigruten
18. Silversea Cruises
19. Ponant

---

## Tips for Best Results

1. **Be Specific**: Include the cruise line name in your request
2. **Request Updates**: Ask for "current 2024-2025 information"
3. **Verify**: Cross-check fleet information and program details
4. **UK Focus**: Remind Perplexity to emphasize UK market relevance
5. **Format**: Request JSON format explicitly
6. **Completeness**: Ask for all sections even if some may not apply (set available flags to false)
