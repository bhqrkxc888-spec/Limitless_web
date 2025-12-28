# Norwegian Fjords & Arctic Circle Port Guides - Next Batch

**Status:** Ready to create  
**Port Character Type:** `fjord-nature` and `expedition`  
**Region:** New `norwegian-fjords` region to be added

---

## 🏔️ PHASE 1: Classic Norwegian Fjords (4 Ports)

These are the core fjord ports mentioned in Batch 2 plan:

| Port | Port Character | Highlights | Priority |
|------|----------------|------------|----------|
| **Bergen** | `fjord-nature` | Gateway city, Bryggen wharf, Fløyen cable car, fish market | 🔴 HIGH |
| **Geiranger** | `fjord-nature` | UNESCO Geirangerfjord, Seven Sisters waterfall, scenic viewpoints | 🔴 HIGH |
| **Flåm** | `fjord-nature` | Flåm Railway, Sognefjord, waterfalls, hiking | 🔴 HIGH |
| **Stavanger** | `fjord-nature` | Pulpit Rock (Preikestolen), old town (Gamle Stavanger), museums | 🟡 MEDIUM |

**Why these first:**
- Most popular with UK cruisers
- Core fjord experience
- High search volume
- Summer season (May-September)

---

## 🌌 PHASE 2: Arctic Circle & Northern Norway (5-6 Ports)

Extended fjord/Arctic coverage up to the Arctic Circle:

| Port | Port Character | Highlights | Priority |
|------|----------------|------------|----------|
| **Tromsø** | `expedition` | Northern Lights, Arctic Cathedral, midnight sun, whale watching | 🔴 HIGH |
| **Lofoten Islands** (Leknes/Svolvær) | `fjord-nature` | Dramatic peaks, fishing villages, hiking, Northern Lights | 🔴 HIGH |
| **Honningsvåg** (North Cape) | `expedition` | Northernmost point of Europe, midnight sun, Arctic views | 🟡 MEDIUM |
| **Ålesund** | `fjord-nature` | Art Nouveau architecture, fjord views, Atlantic Road nearby | 🟡 MEDIUM |
| **Bodø** | `fjord-nature` | Saltstraumen (strongest maelstrom), Saltfjellet mountains | 🟢 LOW |
| **Hammerfest** | `expedition` | Northern Lights, reindeer, Arctic culture | 🟢 LOW |

**Why extend to Arctic:**
- Growing expedition cruise market
- Northern Lights season (winter)
- Midnight sun season (summer)
- Unique bucket list destinations
- High-value market segment

---

## 📋 RECOMMENDED APPROACH

### Option A: All 10 Ports (Complete Coverage)
**Phase 1:** 4 Classic Fjords (Bergen, Geiranger, Flåm, Stavanger)  
**Phase 2:** 6 Arctic/Northern (Tromsø, Lofoten, Honningsvåg, Ålesund, Bodø, Hammerfest)

### Option B: Priority 6 Ports (Most Popular)
**Phase 1:** 4 Classic Fjords (as above)  
**Phase 2:** 2 Arctic (Tromsø, Lofoten)

**Recommendation:** Start with Option B (6 ports), add Arctic ports later if needed.

---

## 🌍 Port Character Types

**`fjord-nature` ports:**
- Bergen, Geiranger, Flåm, Stavanger, Ålesund, Bodø, Lofoten
- Focus: Scenic nature, hiking, viewpoints, fjord cruises
- **NO BEACH SECTION** (set `nearestBeach: null`)

**`expedition` ports:**
- Tromsø, Honningsvåg, Hammerfest
- Focus: Northern Lights, Arctic culture, wildlife, unique experiences
- **NO BEACH SECTION** (set `nearestBeach: null`)

---

## 📍 Region Setup Required

Need to add to `src/data/ports.js`:

```javascript
export const portRegions = [
  // ... existing regions ...
  {
    id: 'norwegian-fjords',
    slug: 'norwegian-fjords',
    name: 'Norwegian Fjords',
    description: 'Dramatic fjords, Arctic Circle and Northern Lights destinations',
    image: null, // Will use WEB_categories/ports/norwegian-fjords/hero.webp
  },
];
```

---

## 🔍 FAQ Considerations for These Ports

### For Fjord Ports:
- "What's the best way to see the fjords?"
- "Is [PORT] good for hiking?"
- "Can you see Northern Lights from [PORT]?" (seasonal)
- "What wildlife can you see?"

### For Arctic Ports (Tromsø, etc.):
- "When is the best time to see Northern Lights?"
- "What wildlife can you see?"
- "Is Tromsø above the Arctic Circle?"
- "What's the weather like?"
- "Can you see the midnight sun?"

---

## 📅 Suggested Timeline

**Now:** Create the 4 Classic Fjord ports (Bergen, Geiranger, Flåm, Stavanger)  
**Later:** Add Arctic ports (Tromsø, Lofoten) when ready

**Status for all:** `status: 'draft'` initially (keep hidden until content/images ready)

---

## ✅ Next Steps

1. Add `norwegian-fjords` region to `portRegions` in `ports.js`
2. Create 4 Classic Fjord ports (Bergen, Geiranger, Flåm, Stavanger) using Perplexity prompt v4.0
3. Set `portCharacter: 'fjord-nature'` for all
4. Set `nearestBeach: null` (no beaches in fjords!)
5. Use v4.0 attraction categories (landmark, historic, nature, active, excursion)
6. Focus FAQ on fjords, hiking, Northern Lights, wildlife

---

**Created:** 28 December 2024  
**Based on:** User request for fjords "all the way up to Tromsø and Arctic Circle"

