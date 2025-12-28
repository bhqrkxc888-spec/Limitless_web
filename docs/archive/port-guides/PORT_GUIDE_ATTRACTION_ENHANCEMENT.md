# Port Guide Attraction Enhancement Plan

## Current Status

**Ports with complete data (duration + tips):**
- Málaga ✅

**Ports needing enhancement (20 ports):**
- Barcelona
- Lisbon
- Tenerife
- Civitavecchia
- Vigo
- Cádiz
- Gibraltar
- Alicante
- Funchal
- Las Palmas
- Southampton
- Dover
- Marseille
- Venice
- Naples
- Palma de Mallorca
- Porto
- A Coruña
- Bilbao
- Valencia

---

## New Data Structure for Attractions

Each `mustSeeSights` attraction should have:

```javascript
{
  title: 'Attraction Name',
  description: '2-3 sentence description of what it is and why to visit.',
  duration: '2 to 3 hours for a relaxed pace', // REQUIRED - Always include "for a relaxed pace"
  tips: [ // REQUIRED - Exactly 3 tips
    'Book tickets online in advance to skip queues, especially in summer.',
    'Best visited early morning before cruise ship crowds arrive.',
    'Allow extra time to explore the surrounding neighbourhood.'
  ],
  highlights: ['History', 'Architecture', 'Photography', 'Shopping'], // NEW - Key features
  goodFor: ['History buffs', 'Families', 'Photographers'], // NEW - Target audience
  image: 'attraction-name.webp'
}
```

---

## Updated Perplexity Prompt

Use this enhanced prompt to get complete attraction data:

```
For each of the 6 top attractions in [PORT NAME], provide:

1. Name
2. Description (2-3 sentences about what it is and why cruise passengers should visit)
3. Suggested visit duration (format: "X to Y hours for a relaxed pace")
4. 3 insider tips (practical advice about timing, tickets, what to prioritize, or things to know)
5. Highlights (list 3-5 key features like: Shopping, Food, History, Photography, Architecture, Gardens, Beach, Views, Culture, Art, Family-friendly)
6. Good for (who will enjoy it: History buffs, Families, Foodies, Photographers, First-time visitors, Active travelers, Culture lovers, etc.)

Example format:
**La Sagrada Familia**
- Description: Gaudí's iconic, still-unfinished basilica is Barcelona's most famous landmark. The interior is breathtaking with coloured light filtering through stained glass, and the facades tell biblical stories in stone. Pre-book timed entry if at all possible.
- Duration: 2 to 3 hours for a relaxed pace
- Tips:
  1. Book skip-the-line tickets online at least 48 hours in advance
  2. Visit early morning (9am opening) to avoid crowds
  3. Consider adding the tower climb for spectacular city views
- Highlights: Architecture, Photography, History, Art, UNESCO World Heritage
- Good for: First-time visitors, Architecture lovers, Photographers, Families
```

---

## Implementation Steps

### Step 1: Gather Missing Data
For each of the 20 ports, run this Perplexity query:

```
For [PORT NAME] cruise port, provide detailed information for the top 6 attractions:

For EACH attraction include:
- Name
- 2-3 sentence description
- Visit duration (format: "X to Y hours for a relaxed pace")
- 3 practical insider tips
- Highlights (3-5 tags: Shopping, Food, History, Photography, Architecture, Views, etc.)
- Good for (audience: Families, History buffs, Foodies, Photographers, etc.)

Port: [PORT NAME]
```

### Step 2: Update ports.js Data Structure
Add new fields to all attractions:
- `duration` - If missing
- `tips` - Array of 3 strings
- `highlights` - Array of strings
- `goodFor` - Array of strings

### Step 3: Update Template Display
Modify `PortGuidePage.jsx` to:
- Display duration prominently on each card
- Show all 3 tips stacked vertically (1 per row, never side-by-side)
- Display highlights as tags/badges
- Show "Good for" audience tags

---

## CSS Requirements

Attraction cards should display:
1. **Duration badge** - Top right or below title
2. **Tips section** - Stacked list (vertical only)
3. **Highlights** - Horizontal tag row
4. **Good for** - Horizontal tag row

All cards must maintain consistent height and alignment.

---

## Priority Order

1. **Barcelona** - Most complete, just needs tips + highlights
2. **Lisbon** - Major port
3. **Venice** - Major port
4. **Marseille** - Major port
5. **Naples** - Major port
6. Rest of Mediterranean
7. UK ports
8. Atlantic Islands

---

**Created:** 28 December 2024  
**Status:** Ready for implementation  
**Estimated time:** 2-3 hours for data gathering + 1 hour for template updates

