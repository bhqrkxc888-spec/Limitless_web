# TODO - Limitless Cruises

**Last Updated:** December 19, 2025  
**Status:** Production Live - Ongoing Optimization

---

## 🔴 High Priority

### 1. Image Requirements - Bucket List Hero Images

**Status:** In Progress  
**Priority:** High  
**Format:** 1920x1080px (16:9 aspect ratio)  
**Location:** Upload to Vercel Blob Storage

#### Missing Hero Images (5 needed):

**1. Rocky Mountaineer & Alaska**
- **Current:** Using card image as placeholder
- **Needed:** Hero image (1920x1080px)
- **Suggested content:** Rocky Mountaineer train in Canadian Rockies, OR Alaska Inside Passage with glaciers, OR combination showing both experiences
- **Supabase path:** `/destinations/Canada/` or `/destinations/Alaska/`
- **File location:** `src/data/bucketList.js` line 229

**2. World Cruises**
- **Current:** Has image (`worldcruise.jpeg`) but may need higher quality
- **Needed:** High-quality hero image (1920x1080px)
- **Suggested content:** Cruise ship at iconic port (Singapore, Sydney, Cape Town), OR world map with ship route overlay
- **Supabase path:** `/destinations/Worldcruise/`
- **File location:** `src/data/bucketList.js` line 13

**3. Antarctica Expeditions**
- **Current:** Using card image (`antartica-card.jpeg`) as hero
- **Needed:** Proper hero image (1920x1080px)
- **Suggested content:** Dramatic icebergs, penguins on ice, OR expedition ship in Antarctic waters, OR Zodiac landing
- **Supabase path:** `/destinations/antarctica/`
- **File location:** `src/data/bucketList.js` line 85

**4. Galápagos Islands**
- **Current:** Has image (`Galapagos.jpeg`) but may need better quality
- **Needed:** High-quality hero image (1920x1080px)
- **Suggested content:** Giant tortoises, marine iguanas, OR blue-footed boobies, OR Galápagos landscape with unique wildlife
- **Supabase path:** `/destinations/galapagos/`
- **File location:** `src/data/bucketList.js` line 304

**5. Northern Lights & Arctic**
- **Current:** Has image (`northern-lights.jpeg`) - verify quality
- **Needed:** Verify/upgrade hero image (1920x1080px)
- **Suggested content:** Aurora Borealis over Arctic landscape, OR Northern Lights over Norwegian fjords
- **Supabase path:** `/destinations/Fjords/`
- **File location:** `src/data/bucketList.js` line 372

---

### 2. Image Requirements - Cruise Line Destination Images

**Status:** In Progress  
**Priority:** High  
**Format:** 800x600px (4:3 aspect ratio)  
**Location:** Upload to Vercel Blob Storage

#### P&O Cruises - Missing Destination Images (4 needed):
- **Caribbean** - Tropical beach with turquoise waters
- **Northern Europe** - Northern European waterfront/cityscape
- **Canary Islands** - Volcanic landscape, beaches
- **Scandinavia** - Scandinavian landscape (midnight sun or fjords)
- **File location:** `src/data/cruiseLines.js` lines 71-76

#### Celebrity Cruises - Missing Destination Images (5 needed):
- **Caribbean** - Caribbean beach and turquoise sea
- **Middle East** - Dubai skyline or Middle Eastern architecture
- **Northern Europe** - Northern Europe skyline and waterfront
- **Asia & Japan** - Cherry blossom path in Japan or Asian temple
- **Grand Voyages** - Sunset over ocean on extended voyage
- **File location:** `src/data/cruiseLines.js` lines 235-240

#### Fred. Olsen - Missing Destination Images (4 needed):
- **British Isles** - British Isles coastline (cliffs, coastline)
- **Baltic Capitals** - Colorful Baltic waterfront (Tallinn, Riga, etc.)
- **Canary Islands** - Canary Islands volcanic landscape
- **Arctic & Iceland** - Iceland glacier scenery or Arctic landscape
- **File location:** `src/data/cruiseLines.js` lines 459-462

#### Norwegian Cruise Line - Missing Destination Images (4 needed):
- **Alaska** - Alaska glacier and mountains
- **Caribbean** - Caribbean turquoise waters
- **Northern Europe** - Northern Europe colorful waterfront
- **Australia & New Zealand** - Sydney Opera House or NZ landscape
- **File location:** `src/data/cruiseLines.js` lines 555-560

#### MSC Cruises - Missing Destination Images (4 needed):
- **Caribbean** - Caribbean palm tree beach
- **Canary Islands** - Canary Islands volcanic landscape
- **Arabian Gulf** - Dubai skyline or Middle Eastern architecture
- **Adriatic** - Croatian coastline or Adriatic port
- **File location:** `src/data/cruiseLines.js` lines 672-675

#### Princess Cruises - Missing Destination Images (3 needed):
- **Northern Europe** - Baltic capital waterfront
- **British Isles** - Scottish coastline or British coastal scenery
- **Expeditions** - Arctic expedition landscape
- **File location:** `src/data/cruiseLines.js` lines 802-806

#### Cunard - Missing Destination Images (3 needed):
- **Northern Europe** - Baltic luxury destination
- **Caribbean** - Caribbean paradise
- **Arabia** - Arabian luxury destination
- **File location:** `src/data/cruiseLines.js` lines 895-898

#### Royal Caribbean - Missing Destination Images (4 needed):
- **Alaska** - Alaska glacier scenery
- **Caribbean** - Caribbean beach paradise
- **Australia** - Sydney Opera House or Australian landscape
- **Hawaii** - Hawaiian volcanic coastline
- **File location:** `src/data/cruiseLines.js` lines 988-992

#### Holland America - Missing Destination Images (3 needed):
- **British Isles** - Scottish coastline or British coastal scenery
- **Asia** - Asian temple at sunset or Asian landscape
- **South America** - South American coastline
- **File location:** `src/data/cruiseLines.js` lines 1099-1101

#### Seabourn - Missing Destination Images (3 needed):
- **Arctic** - Arctic polar landscape
- **Kimberley** - Australian Kimberley coastline
- **Patagonia** - Patagonian mountains or glaciers
- **File location:** `src/data/cruiseLines.js` lines 1221-1223

**Total Cruise Line Destination Images Needed:** ~37 images

---

### 3. Image Requirements - Cruise Type Images

**Status:** In Progress  
**Priority:** High  
**Format:** 800x600px (4:3 aspect ratio)  
**Location:** Upload to Vercel Blob Storage

#### Missing Cruise Type Images (6 needed):
- **Family Cruises** - Families enjoying cruise activities
- **Adults-Only Cruises** - Adults-only pool or relaxation area
- **UK Sailings** - UK port or British coastline
- **Luxury Cruises** - Luxury ship interior or elegant dining
- **River Cruises** - European river cruise ship on river
- **Expedition Cruises** - Expedition ship in remote location
- **File location:** `src/data/cruiseTypes.js`

---

### 4. Content Updates

**Status:** Ongoing  
**Priority:** High

- [ ] Add real testimonials (currently draft/coming soon)
- [ ] Update cruise offers in Supabase CMS
- [ ] Add travel news articles
- [ ] Review and update destination descriptions

---

## 🟡 Medium Priority

### 5. Monitoring & Analytics
**Status:** Setup Required  
**Priority:** Medium

- [ ] Review performance monitoring data in Supabase
- [ ] Set up external uptime monitoring (optional)
- [ ] Configure analytics dashboard
- [ ] Review error tracking reports

### 6. SEO Enhancements
**Status:** Ongoing  
**Priority:** Medium

- [ ] Monitor search engine indexing
- [ ] Review PageSpeed Insights regularly
- [ ] Add internal linking strategy
- [ ] Update sitemap as content grows

---

## 🟢 Low Priority

### 7. Feature Enhancements
**Status:** Future  
**Priority:** Low

- [ ] Enable sea conditions feature (StormGlass API)
- [ ] Add FAQ section expansion
- [ ] Product schema for offers
- [ ] Link checking automation

---

## 📊 Current Status

**Site Status:** ✅ Live and Operational  
**Performance:** 80+ PageSpeed Score  
**Accessibility:** 95+ Score (WCAG AA)  
**SEO:** 100/100 Score  

**Documentation:** All in `.markdown/` folder (gitignored)  
**Repository:** Clean and organized

---

## ✅ Completed (December 19, 2025)

### Repository Cleanup & Organization
- ✅ Consolidated documentation into single `docs/` folder
- ✅ Removed duplicate `.docs/` folder
- ✅ Organized 97 documentation files into 9 categories
- ✅ Moved all markdown files to `.markdown/` folder
- ✅ Updated `.gitignore` to prevent documentation publishing
- ✅ Cleaned root directory (only essential files)

### Performance & Accessibility Optimizations
- ✅ Darkened gold accent color for better contrast
- ✅ Increased touch target sizes (news carousel indicators)
- ✅ Fixed layout shift (CLS) in footer
- ✅ Optimized image loading (client-side and server-side)
- ✅ Fixed Supabase 400 error for offers endpoint
- ✅ Removed unused JavaScript
- ✅ Updated build configuration for better chunking

---

## 📝 Notes

- All documentation is in `.markdown/` folder (local only)
- Repository structure is clean and professional
- Performance optimizations completed this morning
- Site is production-ready and live
- **Image Priority:** Focus on bucket list hero images first, then cruise line destination images

---

**For detailed documentation, see `.markdown/docs/` folder.**
