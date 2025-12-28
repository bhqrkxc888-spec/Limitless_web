# Cruise Line Data Collection Prompt

## Instructions for Perplexity

Provide comprehensive data for each cruise line listed below. Focus on UK market relevance. Return data in JSON format matching the template structure.

---

## Cruise Lines (UK Market Focus)

1. **P&O Cruises**
2. **Royal Caribbean**
3. **MSC Cruises**
4. **Norwegian Cruise Line**
5. **Disney Cruise Line**
6. **Celebrity Cruises**
7. **Fred. Olsen Cruise Lines**
8. **Holland America Line**
9. **Marella Cruises**
10. **Virgin Voyages**
11. **Viking**
12. **Seabourn**
13. **Princess Cruises**
14. **Azamara**
15. **Cunard**
16. **Aurora Expeditions**
17. **Hurtigruten**
18. **Silversea Cruises**
19. **Ponant**

---

## Data Template

For each cruise line, provide ONLY the following information in JSON format:

```json
{
  "tagline": "Marketing tagline or slogan",
  "description": "2-3 sentence overview of the cruise line's positioning and key appeal for UK customers",
  "category": "mainstream|premium|luxury|ultra-luxury|expedition|traditional",
  
  "ships": {
    "fleetOverview": "Brief overview of the fleet (size, capacity, ship types)",
    "currentFleet": [
      {
        "name": "Ship Name",
        "capacity": "Guest capacity",
        "yearBuilt": "Year built or refurbished",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"]
      }
    ],
    "shipHighlights": [
      "Key ship feature 1",
      "Key ship feature 2",
      "Key ship feature 3"
    ]
  },
  
  "dining": {
    "overview": "Overview of dining philosophy and approach",
    "includedDining": [
      {
        "name": "Restaurant/Venue Name",
        "description": "Description of cuisine, atmosphere, and what's included"
      }
    ],
    "specialtyDining": [
      {
        "name": "Restaurant Name",
        "description": "Description and typical cost if applicable",
        "cuisineType": "Type of cuisine"
      }
    ],
    "diningHighlights": [
      "Dining highlight 1",
      "Dining highlight 2",
      "Dining highlight 3"
    ]
  },
  
  "entertainment": {
    "overview": "Overview of entertainment philosophy and variety",
    "shows": [
      {
        "name": "Show/Production Name",
        "description": "Description of the show or entertainment type"
      }
    ],
    "activities": [
      {
        "name": "Activity Name",
        "description": "Description of the activity"
      }
    ],
    "nightlife": [
      {
        "name": "Venue Name",
        "description": "Description of the nightlife venue"
      }
    ],
    "entertainmentHighlights": [
      "Entertainment highlight 1",
      "Entertainment highlight 2",
      "Entertainment highlight 3"
    ]
  },
  
  "value": {
    "whatsIncluded": [
      "Inclusion 1",
      "Inclusion 2",
      "Inclusion 3"
    ],
    "pricingApproach": "Description of pricing structure and what's included/excluded",
    "valueHighlights": [
      "Value proposition 1",
      "Value proposition 2",
      "Value proposition 3"
    ]
  },
  
  "targetAudience": {
    "adultsOnly": false,
    "familyFriendly": true,
    "description": "Description of who this cruise line appeals to",
    "bestFor": [
      "Target audience type 1",
      "Target audience type 2",
      "Target audience type 3"
    ]
  },
  
  "destinations": {
    "topDestinations": [
      {
        "name": "Destination Region",
        "description": "Why this destination is popular with this line"
      }
    ],
    "destinationHighlights": [
      "Destination highlight 1",
      "Destination highlight 2"
    ],
    "ukDepartures": "Information about UK departure ports if applicable"
  },
  
  "kidsClub": {
    "available": true,
    "name": "Kids Club Name",
    "intro": "2-3 sentence introduction about the kids club program",
    "quickFacts": [
      "Fact 1",
      "Fact 2",
      "Fact 3"
    ],
    "ageGroups": [
      {
        "club": "Club Name",
        "age": "Age range",
        "morning": "Morning hours or '-'",
        "afternoon": "Afternoon hours or '-'",
        "evening": "Evening hours or '-'",
        "activities": "Description of typical activities"
      }
    ],
    "costsInfo": "Information about costs, booking, and any charges",
    "highlights": [
      {
        "title": "Feature title",
        "description": "Description of feature"
      }
    ],
    "note": "Additional notes about scheduling, capacity, etc."
  },
  
  "cabinTypes": {
    "overview": "Overview of accommodation options",
    "categories": [
      {
        "name": "Cabin Category Name",
        "description": "Description of the cabin type, size, amenities",
        "typicalSize": "Size in square feet/metres if available",
        "amenities": ["Amenity 1", "Amenity 2"]
      }
    ],
    "highlights": [
      "Cabin highlight 1",
      "Cabin highlight 2"
    ]
  },
  
  "accessibility": {
    "intro": "2-3 sentence introduction about accessibility support",
    "accessibleCabins": "Information about accessible cabin availability and features",
    "tips": [
      {
        "title": "Tip category",
        "description": "Detailed tip information"
      }
    ],
    "mobilitySupport": "Information about mobility equipment, boarding assistance, etc.",
    "dietaryNeeds": "Information about dietary accommodations"
  },
  
  "loyaltyProgram": {
    "name": "Loyalty Program Name",
    "intro": "2-3 sentence introduction about the loyalty program",
    "pointsInfo": "How points/credits are earned",
    "tiers": [
      {
        "tier": "Tier Name",
        "points": "Points/credits required",
        "benefits": "Key benefits for this tier"
      }
    ],
    "note": "Optional additional notes"
  },
  
  "faqs": [
    {
      "question": "Frequently asked question",
      "answer": "Detailed answer"
    }
  ],
  
  "whyChoose": [
    {
      "title": "Benefit title (4-6 words)",
      "description": "2-3 sentence explanation of this benefit"
    }
  ],
  
  "highlights": [
    "Key highlight 1",
    "Key highlight 2",
    "Key highlight 3",
    "Key highlight 4",
    "Key highlight 5",
    "Key highlight 6"
  ]
}
```

---

## Data Collection Guidelines

### Required Sections
- **Ships**: Current fleet, capacities, key ship features
- **Dining**: Included and specialty restaurants, cuisine types, dining philosophy
- **Entertainment**: Shows, activities, nightlife venues
- **Value**: What's included, pricing approach, value propositions
- **Target Audience**: Adults-only vs family-friendly, who it appeals to
- **Destinations**: Top destinations, UK departure info if applicable
- **Kids Club**: Full details if family-friendly (age groups, schedules, costs)
- **Cabin Types**: Accommodation categories, sizes, amenities
- **Accessibility**: Full accessibility support information
- **Loyalty Program**: Program details, tiers, benefits
- **FAQs**: 5-10 common questions and answers
- **Why Choose**: 4-6 key benefits
- **Highlights**: 6-8 key selling points

### UK Market Focus
- Emphasize UK departure ports where applicable
- Mention no-fly cruise options
- Reference pounds sterling onboard if applicable
- Highlight ABTA protection where relevant
- Note regional UK ports if available

### Writing Style
- **Professional but accessible**: Informative, not overly salesy
- **Specific details**: Include concrete information (ship names, restaurant names, etc.)
- **UK perspective**: Frame information for UK customers
- **Current information**: Ensure all data is accurate as of 2024-2025

### Optional Fields
- If a cruise line doesn't have kids clubs, set `kidsClub.available` to `false` and omit other kids club fields
- If information isn't available for a section, use empty arrays or omit the field
- Be thorough but don't make up information

---

## Example Request Format

**For Perplexity:**

"I need comprehensive data about [CRUISE_LINE_NAME] cruise line for a UK cruise booking website. Provide detailed information about:

- Current fleet and ship features
- Dining options (included and specialty)
- Entertainment (shows, activities, nightlife)
- Value proposition and what's included
- Target audience (adults-only vs family-friendly)
- Top destinations and UK departure options
- Kids club details (if applicable)
- Cabin types and accommodation options
- Accessibility support
- Loyalty program details
- Common FAQs
- Key selling points and highlights

Format the response as JSON matching the provided template structure. Focus on UK market relevance and ensure all information is current as of 2024-2025."

---

## Notes

- Provide fresh, current data for ALL cruise lines listed
- Focus on factual information that helps UK customers make informed decisions
- Include specific names, details, and concrete information
- Ensure accuracy - verify fleet information, program details, and current offerings
- If information is not available or doesn't apply, note it clearly
