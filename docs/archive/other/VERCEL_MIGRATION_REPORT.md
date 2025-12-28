# Vercel Blob → Supabase Storage Migration Report

This report identifies all Vercel Blob URLs that need to be migrated to Supabase Storage.

**Project ID:** `xrbusklskmeaamwynfmm`  
**Base URL:** `https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/`

---

## ⚠️ CRITICAL: Files Using Automatic URL Generation

These files now use automatic URL generation, so hardcoded URLs are **deprecated**:
- `src/config/assetUrls.js` - DESTINATION_HEROES, CRUISE_LINE_LOGOS (deprecated - use helpers)
- `src/data/imageReferences.js` - Legacy file, being phased out

**Action:** These files can be cleaned up, but URLs listed below are for reference.

---

## 📋 URLs Requiring Migration

### 1. SITE-WIDE IMAGES (WEB_site bucket)

| Current Vercel URL | Supabase Path | Status |
|-------------------|---------------|--------|
| `jl2lrfef2mjsop6t.../site/HERO-home.webp` | `WEB_site/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../site/OG.webp` | `WEB_site/og-image.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../categories/home/hero.webp` | `WEB_site/hero.webp` | ⚠️ **DUPLICATE OF ABOVE** |

**Files to Update:**
- `src/config/assetUrls.js` (lines 28, 30) - `SITE_ASSETS.homeHero`, `SITE_ASSETS.ogImage`
- `src/data/imageReferences.js` (line 22) - `heroHome`

---

### 2. ABOUT PAGE IMAGES (WEB_site bucket - katherine photos)

**Already migrated via admin:** ✅ These should already be in Supabase as `katherine1.webp`, `katherine2.webp`, `katherine3.webp`

| Current Vercel URL | Supabase Path | Status |
|-------------------|---------------|--------|
| `jl2lrfef2mjsop6t.../categories/about/About1.webp` | `WEB_site/katherine1.webp` | ✅ **ALREADY MIGRATED** (check admin) |
| `jl2lrfef2mjsop6t.../categories/about/About2.webp` | `WEB_site/katherine2.webp` | ✅ **ALREADY MIGRATED** (check admin) |
| `jl2lrfef2mjsop6t.../categories/about/About3.webp` | `WEB_site/katherine3.webp` | ✅ **ALREADY MIGRATED** (check admin) |
| `jl2lrfef2mjsop6t.../categories/about/HolidayEliteLogo.png` | `WEB_site/holiday-elite-logo.png` | ⚠️ **NEEDS MIGRATION** (if still used) |

**Files to Update:**
- `src/data/imageReferences.js` (lines 74-77) - `katherine1`, `katherine2`, `katherine3`, `holidayEliteLogo`
- `src/utils/imageHelpers.js` (line 140) - `holidayEliteLogo`

---

### 3. CRUISE TYPE/CATEGORY IMAGES (WEB_categories bucket)

| Current Vercel URL | Supabase Path | Category Slug | Status |
|-------------------|---------------|---------------|--------|
| `jl2lrfef2mjsop6t.../site/Cruise%20Type/family.webp` | `WEB_categories/family-cruises/card.webp` | `family-cruises` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../site/Cruise%20Type/Adult-Only.webp` | `WEB_categories/adults-only/card.webp` | `adults-only` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../site/Cruise%20Type/no-fly.webp` | `WEB_categories/uk-sailings/card.webp` | `uk-sailings` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../site/Cruise%20Type/luxury.webp` | `WEB_categories/luxury-cruises/card.webp` | `luxury-cruises` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../site/Cruise%20Type/expedition.webp` | `WEB_categories/expedition-cruises/card.webp` | `expedition-cruises` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Europe-river/danube-river.webp` | `WEB_categories/river-cruises/card.webp` | `river-cruises` | ⚠️ **NEEDS MIGRATION** |

**Files to Update:**
- `src/data/cruiseTypes.js` (lines 14, 46, 78, 110, 142, 174) - All `image` fields

**Note:** These should use `getCategoryCard(slug)` automatically, but the data file still has hardcoded URLs.

---

### 4. DESTINATION HERO IMAGES (WEB_destinations bucket)

These are in `destinations.js` `image` field - should use automatic URL generation but currently hardcoded.

| Current Vercel URL | Destination Slug | Supabase Path | Status |
|-------------------|------------------|---------------|--------|
| `jl2lrfef2mjsop6t.../destinations/Europe/Med-coast.webp` | `mediterranean-cruises` | `WEB_destinations/mediterranean-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/caribbean/nassau-bahamas.webp` | `caribbean-cruises` | `WEB_destinations/caribbean-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Fjords/northernlights-hero.webp` | `norwegian-fjords-cruises` | `WEB_destinations/norwegian-fjords-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/canary-islands/tenerife-beach.webp` | `atlantic-islands-cruises` | `WEB_destinations/atlantic-islands-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Alaska/alaska-hero.jpg` | `alaska-cruises` | `WEB_destinations/alaska-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Baltics/Copenhagen.webp` | `baltic-cruises` | `WEB_destinations/baltic-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/British-islands/Scotland-1.webp` | `british-isles-cruises` | `WEB_destinations/british-isles-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/worldcruise-hero.webp` | `transatlantic-cruises` | `WEB_destinations/transatlantic-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/hawaii/hawaii.webp` | `hawaii-cruises` | `WEB_destinations/hawaii-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Australia/Australia.webp` | `australia-cruises` | `WEB_destinations/australia-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Adriatic/Adriatic.webp` | `adriatic-cruises` | `WEB_destinations/adriatic-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Scandanavia/scandanavia.webp` | `scandinavia-cruises` | `WEB_destinations/scandinavia-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/caribbean/caribbean-1.webp` | `panama-canal-cruises` | `WEB_destinations/panama-canal-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/singapore/singapore.webp` | `southeast-asia-cruises` | `WEB_destinations/southeast-asia-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |

**Files to Update:**
- `src/data/destinations.js` - All `image` fields (16 destinations)
- `src/config/assetUrls.js` - `DESTINATION_HEROES` object (deprecated but still there)

**Note:** Frontend now uses `getDestinationHero(slug)` automatically, so these `image` fields in data files can be removed or updated to reference the automatic URLs.

---

### 5. CRUISE LINE DESTINATION IMAGES (WEB_destinations bucket)

These are used in `cruiseLines.js` for destination image grids. Should use automatic destination URLs.

| Current Vercel URL | Destination | Supabase Path | Status |
|-------------------|-------------|---------------|--------|
| `jl2lrfef2mjsop6t.../destinations/caribbean/nassau-bahamas.webp` | Caribbean | `WEB_destinations/caribbean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Europe/med-card.webp` | Mediterranean | `WEB_destinations/mediterranean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Fjords/northernlights-hero.webp` | Norwegian Fjords | `WEB_destinations/norwegian-fjords-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Baltics/Copenhagen.webp` | Baltic/Northern Europe | `WEB_destinations/baltic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/canary-islands/tenerife-beach.webp` | Canary Islands | `WEB_destinations/atlantic-islands-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/British-islands/britishislands-1.webp` | British Isles | `WEB_destinations/british-isles-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/grandvoyage.webp` | World Cruises | `WEB_destinations/transatlantic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Australia/Australia.webp` | Australia | `WEB_destinations/australia-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/Abu-Dhabi.webp` | Middle East | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/Japan/Japan-card.webp` | Japan | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/caribbean/caribbean-2.webp` | Caribbean variant | `WEB_destinations/caribbean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/caribbean/caribbean-3.webp` | Caribbean variant | `WEB_destinations/caribbean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/caribbean/caribbean-4.webp` | Caribbean variant | `WEB_destinations/caribbean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/caribbean/us-virgin-islands.webp` | Caribbean variant | `WEB_destinations/caribbean-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/canary-islands/canary-1.webp` | Canary Islands variant | `WEB_destinations/atlantic-islands-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/canary-islands/tenerife-tiede.webp` | Canary Islands variant | `WEB_destinations/atlantic-islands-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Iceland/iceland.webp` | Iceland | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/Baltics/tallin-oldtown.webp` | Baltic variant | `WEB_destinations/baltic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Baltics/copenhagen-2.webp` | Baltic variant | `WEB_destinations/baltic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Baltics/tallin-skyline.webp` | Baltic variant | `WEB_destinations/baltic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Baltics/Stockholm.webp` | Baltic variant | `WEB_destinations/baltic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Scandanavia/scandanavia.webp` | Scandinavia | `WEB_destinations/scandinavia-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/muscat.webp` | Middle East variant | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/middle-east/Petra.webp` | Middle East variant | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/Adriatic/Adriatic.webp` | Adriatic | `WEB_destinations/adriatic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/British-islands/ireland.webp` | British Isles variant | `WEB_destinations/british-isles-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/antarctica/antarctica-hero.webp` | Antarctica | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/Australia/westernaustralia.webp` | Australia variant | `WEB_destinations/australia-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/patagonia.webp` | South America | - | ⚠️ **NEEDS MIGRATION** (destination not in current list) |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/worldcruise.webp` | World Cruise | `WEB_destinations/transatlantic-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |

**Files to Update:**
- `src/data/cruiseLines.js` - `destinationImages` arrays (multiple cruise lines)

---

### 6. BUCKET LIST EXPERIENCES (WEB_categories/bucket-list bucket)

| Current Vercel URL | Experience | Supabase Path | Status |
|-------------------|------------|---------------|--------|
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/worldcruise-hero.webp` | World Cruise | `WEB_categories/bucket-list/world-cruise/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/worldcruise.webp` | World Cruise | `WEB_categories/bucket-list/world-cruise/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/antarctica/antarctica-hero.webp` | Antarctica | `WEB_categories/bucket-list/antarctica/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/antarctica/Northernlights.webp` | Antarctica | `WEB_categories/bucket-list/antarctica/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Japan/japan-hero.webp` | Japan | `WEB_categories/bucket-list/japan/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Japan/Japan-card.webp` | Japan | `WEB_categories/bucket-list/japan/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Japan/DowntownTokyo%20.webp` | Japan (gallery) | `WEB_categories/bucket-list/japan/gallery-1.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Japan/southkorea.webp` | Japan (gallery) | `WEB_categories/bucket-list/japan/gallery-2.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Alaska/alaska-hero.jpg` | Alaska | `WEB_categories/bucket-list/alaska/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Canada/rockymountains.webp` | Alaska | `WEB_categories/bucket-list/alaska/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/galapagos/galapagos-hero.webp` | Galapagos | `WEB_categories/bucket-list/galapagos/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/galapagos/galapagos-hero.webp` | Galapagos | `WEB_categories/bucket-list/galapagos/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Fjords/northernlights-hero.webp` | Northern Lights | `WEB_categories/bucket-list/northern-lights/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Fjords/Northernlights.webp` | Northern Lights | `WEB_categories/bucket-list/northern-lights/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/hero-iguazu-falls.webp` | South America | `WEB_categories/bucket-list/south-america/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/Patagonian-glaciers.webp` | South America | `WEB_categories/bucket-list/south-america/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/Machu-Picchu.webp` | South America (gallery) | `WEB_categories/bucket-list/south-america/gallery-1.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/rio-christ.webp` | South America (gallery) | `WEB_categories/bucket-list/south-america/gallery-2.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/Rio-beech.webp` | South America (gallery) | `WEB_categories/bucket-list/south-america/gallery-3.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/south-america/city-in-Peru.webp` | South America (gallery) | `WEB_categories/bucket-list/south-america/gallery-4.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/hero-dubai.webp` | Dubai & Middle East | `WEB_categories/bucket-list/dubai-middle-east/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/Abu-Dhabi.webp` | Dubai & Middle East | `WEB_categories/bucket-list/dubai-middle-east/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/Abu-Dhabi.webp` | Dubai & Middle East (gallery) | `WEB_categories/bucket-list/dubai-middle-east/gallery-1.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/muscat.webp` | Dubai & Middle East (gallery) | `WEB_categories/bucket-list/dubai-middle-east/gallery-2.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/middle-east/Petra.webp` | Dubai & Middle East (gallery) | `WEB_categories/bucket-list/dubai-middle-east/gallery-3.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Pacific/NewZealand-hero.webp` | Australia & New Zealand | `WEB_categories/bucket-list/australia-new-zealand/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/pacific/newzealand.webp` | Australia & New Zealand | `WEB_categories/bucket-list/australia-new-zealand/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Pacific/Sydney.webp` | Australia & New Zealand (gallery) | `WEB_categories/bucket-list/australia-new-zealand/gallery-1.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Pacific/sydneybridge.webp` | Australia & New Zealand (gallery) | `WEB_categories/bucket-list/australia-new-zealand/gallery-2.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Iceland/iceland.webp` | Iceland | `WEB_categories/bucket-list/iceland/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Iceland/iceland.webp` | Iceland | `WEB_categories/bucket-list/iceland/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Europe-river/europe-river-hero.webp` | European River Cruises | `WEB_categories/bucket-list/european-river-cruises/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Europe-river/danube-river.webp` | European River Cruises | `WEB_categories/bucket-list/european-river-cruises/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Greatbarrierreef/greatbarrierreef-hero.webp` | Great Barrier Reef | `WEB_categories/bucket-list/great-barrier-reef/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Australia/Great-barrier-reef.webp` | Great Barrier Reef | `WEB_categories/bucket-list/great-barrier-reef/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Midnight-sun/midnightsun-hero.webp` | Midnight Sun | `WEB_categories/bucket-list/midnight-sun/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Midnight-sun/midnight-sun.webp` | Midnight Sun | `WEB_categories/bucket-list/midnight-sun/card.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/grandvoyage.webp` | Grand Voyages | `WEB_categories/bucket-list/grand-voyages/hero.webp` | ⚠️ **NEEDS MIGRATION** |
| `jl2lrfef2mjsop6t.../destinations/Worldcruise/grandvoyage.webp` | Grand Voyages | `WEB_categories/bucket-list/grand-voyages/card.webp` | ⚠️ **NEEDS MIGRATION** |

**Files to Update:**
- `src/data/bucketList.js` - All `heroImage` and `cardImage` fields, plus gallery arrays

---

### 7. CRUISE LINE IMAGES (WEB_cruise-lines bucket)

**Note:** These are deprecated in `assetUrls.js` since we now use automatic URL generation, but listed for reference.

| Current Vercel URL | Cruise Line | Type | Supabase Path | Status |
|-------------------|-------------|------|---------------|--------|
| `jl2lrfef2mjsop6t.../cruise-lines/logos/royal-caribbean.webp` | Royal Caribbean | Logo | `WEB_cruise-lines/royal-caribbean/logo.webp` | ✅ **USE AUTO URL** |
| `jl2lrfef2mjsop6t.../cruise-lines/heroes/royal-caribbean-HERO.webp` | Royal Caribbean | Hero | `WEB_cruise-lines/royal-caribbean/hero.webp` | ✅ **USE AUTO URL** |
| `jl2lrfef2mjsop6t.../cruise-lines/cards/royal-caribbean-CARD.webp` | Royal Caribbean | Card | `WEB_cruise-lines/royal-caribbean/card.webp` | ✅ **USE AUTO URL** |

**Files to Update:**
- `src/config/assetUrls.js` - `CRUISE_LINE_LOGOS`, `CRUISE_LINE_HEROES`, `CRUISE_LINE_CARDS` (deprecated - can be removed)

---

## 📊 Summary by File

### Files That Need Updates:

1. **`src/config/assetUrls.js`**
   - `SITE_ASSETS.homeHero` - Line 28
   - `SITE_ASSETS.ogImage` - Line 30
   - `DESTINATION_HEROES` - Lines 39-40 (deprecated, but still there)
   - `CRUISE_LINE_LOGOS/HEROES/CARDS` - Lines 50, 55, 60 (deprecated, can be removed)

2. **`src/data/destinations.js`**
   - All 16 `image` fields (should use auto URLs instead)

3. **`src/data/cruiseTypes.js`**
   - All 6 `image` fields (should use auto URLs instead)

4. **`src/data/bucketList.js`**
   - All `heroImage` and `cardImage` fields (17 experiences)
   - Gallery image arrays

5. **`src/data/cruiseLines.js`**
   - `destinationImages` arrays (multiple cruise lines)

6. **`src/data/imageReferences.js`**
   - Legacy file - can be removed or cleaned up

7. **`src/utils/imageHelpers.js`**
   - `holidayEliteLogo` - Line 140 (if still used)

---

## ✅ Recommended Approach

Since we've implemented **automatic URL generation**, the best approach is:

1. **Remove hardcoded URLs from data files** - They'll automatically use Supabase URLs via helpers
2. **Upload images via admin** - Use the admin interface to upload all images
3. **Clean up deprecated code** - Remove old URL objects from `assetUrls.js`

**However**, for backwards compatibility during migration, you may want to:
- Keep the URLs until all images are uploaded
- Or update them to Supabase URLs immediately

---

## 🎯 Priority List (Upload via Admin First)

### HIGH PRIORITY (Site-Wide):
1. ✅ Home Hero (`WEB_site/hero.webp`)
2. ✅ OG Image (`WEB_site/og-image.webp`)

### MEDIUM PRIORITY (Categories):
3. ✅ Family Cruises card
4. ✅ Adults-Only card
5. ✅ UK Sailings card
6. ✅ Luxury Cruises card
7. ✅ Expedition Cruises card
8. ✅ River Cruises card

### HIGH PRIORITY (Destinations - 16):
9-24. ✅ All destination heroes and cards (upload via admin)

### MEDIUM PRIORITY (Bucket List - 17):
25-58. ✅ All bucket list hero/card images (upload via admin)

---

**Total Images to Migrate:** ~80+ unique images (some are duplicates)

