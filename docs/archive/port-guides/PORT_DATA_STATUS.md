# Port Guide Data Status - Enhanced Attraction Fields

## Summary

**Total Published Ports:** 20

**All 20 ports need the new enhanced fields** for their `mustSeeSights` attractions:
- ✅ `duration` - Some have it (Málaga, Southampton, Dover), most don't
- ❌ `tips` - **NONE have this** (3 tips per attraction)
- ❌ `highlights` - **NONE have this** (tags like Shopping, Food, History)
- ❌ `goodFor` - **NONE have this** (target audience)

---

## Detailed Status

### ✅ Has Duration (Partial - needs tips, highlights, goodFor)

1. **Málaga** - Has duration on all 6 attractions
   - Missing: tips, highlights, goodFor

2. **Southampton** - Has duration on all attractions
   - Missing: tips, highlights, goodFor

3. **Dover** - Has duration on all attractions
   - Missing: tips, highlights, goodFor

---

### ❌ Missing All New Fields (Most Common)

These ports have `mustSeeSights` but **NO duration, tips, highlights, or goodFor**:

4. **Barcelona** - 6 attractions, no enhanced data
5. **Lisbon** - 6 attractions, no enhanced data
6. **Tenerife** - 6 attractions, no enhanced data
7. **Civitavecchia (Rome)** - 6 attractions, no enhanced data
8. **Vigo** - 6 attractions, no enhanced data
9. **Cádiz** - 6 attractions, no enhanced data
10. **Gibraltar** - 6 attractions, no enhanced data
11. **Alicante** - 6 attractions, no enhanced data
12. **Funchal** - 6 attractions, no enhanced data
13. **Las Palmas** - 6 attractions, no enhanced data
14. **Marseille** - 6 attractions, no enhanced data
15. **Venice** - 6 attractions, no enhanced data
16. **Naples** - 6 attractions, no enhanced data
17. **Palma de Mallorca** - 6 attractions, no enhanced data
18. **Porto** - 6 attractions, no enhanced data
19. **A Coruña** - 6 attractions, no enhanced data
20. **Bilbao** - 6 attractions, no enhanced data
21. **Valencia** - 6 attractions, no enhanced data

---

## Required Data Per Attraction

For **EACH of the 6 attractions** in each port, you need:

```javascript
{
  title: 'Attraction Name',
  description: '...', // Already exists ✅
  image: 'image.webp', // Already exists ✅
  
  // NEW FIELDS NEEDED:
  duration: '2 to 3 hours for a relaxed pace', // Format: "X to Y hours for a relaxed pace"
  tips: [ // Array of exactly 3 strings
    'Tip 1 about timing, tickets, or what to prioritize',
    'Tip 2 practical advice',
    'Tip 3 insider knowledge'
  ],
  highlights: ['History', 'Photography', 'Architecture'], // Array of 3-5 tags
  goodFor: ['First-time visitors', 'History buffs', 'Photographers'] // Array of 2-4 audience types
}
```

---

## Data Gathering Requirements

**Per Port:**
- 6 attractions
- 4 new fields per attraction = 24 fields per port
- Total: 20 ports × 24 fields = **480 data points needed**

**Time Estimate:**
- Per port Perplexity query: ~5 minutes
- Formatting per port: ~5 minutes
- **Total: ~200 minutes (~3.5 hours) for all 20 ports**

---

## Priority Order

### High Priority (Most Visited)
1. **Barcelona** - Europe's busiest cruise port
2. **Venice** - Major Mediterranean port
3. **Lisbon** - Major Atlantic port
4. **Naples** - Major Mediterranean port
5. **Marseille** - Major French port

### Medium Priority
6. **Málaga** - Has duration, just needs tips/highlights/goodFor
7. **Palma de Mallorca** - Popular Mediterranean port
8. **Civitavecchia (Rome)** - Major port for Rome visits
9. **Porto** - Popular Atlantic port
10. **Tenerife** - Popular Canary Islands port

### Standard Priority
11. **Gibraltar** - Unique British territory
12. **Alicante** - Costa Blanca
13. **Funchal** - Madeira
14. **Las Palmas** - Canary Islands
15. **Cádiz** - Gateway to Seville
16. **Vigo** - Gateway to Santiago
17. **A Coruña** - Northern Spain
18. **Bilbao** - Northern Spain
19. **Valencia** - Eastern Spain
20. **Southampton** - UK port (has duration)
21. **Dover** - UK port (has duration)

---

## Perplexity Query Template

Use this for each port:

```
For [PORT NAME] cruise port, provide detailed information for the top 6 attractions listed in the mustSeeSights section:

[LIST THE 6 ATTRACTION NAMES HERE]

For EACH attraction provide:
- 2-3 sentence description (what it is, why cruise passengers should visit)
- Visit duration in format: "X to Y hours for a relaxed pace"
- 3 practical insider tips (timing, tickets, what to prioritize, things to know)
- Highlights (3-5 tags from: Shopping, Food, History, Photography, Architecture, Gardens, Views, Culture, Art, Family-friendly, UNESCO World Heritage, Beach, Nature, Religious site)
- Good for (2-4 audience types from: First-time visitors, History buffs, Families, Photographers, Architecture lovers, Foodies, Active travelers, Culture lovers, Art enthusiasts, Families with kids, Couples, Seniors)

Format clearly with British English. No price symbols or emojis.
```

---

## What Happens Next

1. **You run Perplexity queries** for each port (or batches of 5)
2. **Send me the responses**
3. **I format into JavaScript** and update `ports.js`
4. **All ports automatically display** the new enhanced cards with:
   - Duration badges
   - Tips stacked vertically
   - Highlights tags
   - Good For audience
   - Maps button (bottom right)

---

## Current Template Status

✅ **Template is READY** - It will display all new fields as soon as data is added
✅ **CSS is STYLED** - All new elements have proper styling
✅ **Perplexity prompt UPDATED** - Includes all new field requirements

**Status:** Waiting for data input only

---

**Created:** 28 December 2024  
**Last Updated:** 28 December 2024

