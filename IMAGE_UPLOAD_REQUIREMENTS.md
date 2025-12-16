# Image Upload Requirements - Vercel Blob Migration
**Last Updated:** December 16, 2024  
**Total Images Needed:** ~150+  
**Currently on Supabase:** 132 URLs to replace  
**Priority:** HIGH (performance impact)

---

## 📸 How to Upload & Provide References

### Upload Process
1. **Upload to Vercel Blob** via your CRM/Admin dashboard
2. **Copy the Vercel Blob URL** (format: `https://xxxxx.public.blob.vercel-storage.com/...`)
3. **Give me the reference + URL** like this:
   ```
   REF: cruise-lines.po.hero
   URL: https://xxxxx.public.blob.vercel-storage.com/cruise-lines/po-hero.webp
   ```
4. I'll update `src/data/imageReferences.js` for you

### Image Specifications
- **Format:** WebP (preferred) or JPEG
- **Quality:** 85-90
- **Max File Size:** 200KB for heroes, 100KB for cards
- **Optimization:** Use https://squoosh.app before uploading

---

## 🔥 **PRIORITY 1: Critical Images (Performance Impact)**

### Homepage Hero
**Must have** - Affects LCP score

| Reference | Size | Current Status | Description |
|-----------|------|----------------|-------------|
| `site.heroHome` | 1920x1080px | ✅ Already Vercel | Homepage hero image |

---

## 🎯 **PRIORITY 2: Cruise Line Heroes (15 images)**

These are main cruise line page images - high visibility

| Cruise Line | Reference | Size | Status |
|-------------|-----------|------|--------|
| P&O Cruises | `cruiseLines.po.hero` | 1920x1080px | ❌ Need Vercel URL |
| P&O Cruises Logo | `cruiseLines.po.logo` | PNG transparent | ❌ Need upload |
| MSC Cruises | `cruiseLines.msc.hero` | 1920x1080px | ❌ Need Vercel URL |
| MSC Logo | `cruiseLines.msc.logo` | PNG transparent | ❌ Need upload |
| Royal Caribbean | `cruiseLines.royalCaribbean.hero` | 1920x1080px | ❌ Need Vercel URL |
| Royal Caribbean Logo | `cruiseLines.royalCaribbean.logo` | PNG transparent | ❌ Need upload |
| Celebrity Cruises | `cruiseLines.celebrity.hero` | 1920x1080px | ❌ Need Vercel URL |
| Celebrity Logo | `cruiseLines.celebrity.logo` | PNG transparent | ❌ Need upload |
| Norwegian | `cruiseLines.norwegian.hero` | 1920x1080px | ❌ Need Vercel URL |
| Norwegian Logo | `cruiseLines.norwegian.logo` | PNG transparent | ❌ Need upload |
| Disney Cruise Line | `cruiseLines.disney.hero` | 1920x1080px | ❌ Need Vercel URL |
| Disney Logo | `cruiseLines.disney.logo` | PNG transparent | ❌ Need upload |
| Princess Cruises | `cruiseLines.princess.hero` | 1920x1080px | ❌ Need Vercel URL |
| Princess Logo | `cruiseLines.princess.logo` | PNG transparent | ❌ Need upload |
| Holland America | `cruiseLines.hollandAmerica.hero` | 1920x1080px | ❌ Need Vercel URL |
| Holland America Logo | `cruiseLines.hollandAmerica.logo` | PNG transparent | ❌ Need upload |
| Fred. Olsen | `cruiseLines.fredOlsen.hero` | 1920x1080px | ❌ Need Vercel URL |
| Fred. Olsen Logo | `cruiseLines.fredOlsen.logo` | PNG transparent | ❌ Need upload |
| Marella Cruises | `cruiseLines.marella.hero` | 1920x1080px | ❌ Need Vercel URL |
| Marella Logo | `cruiseLines.marella.logo` | PNG transparent | ❌ Need upload |
| Virgin Voyages | `cruiseLines.virgin.hero` | 1920x1080px | ❌ Need Vercel URL |
| Virgin Logo | `cruiseLines.virgin.logo` | PNG transparent | ❌ Need upload |
| Viking Ocean | `cruiseLines.viking.hero` | 1920x1080px | ❌ Need Vercel URL |
| Viking Logo | `cruiseLines.viking.logo` | PNG transparent | ❌ Need upload |
| Seabourn | `cruiseLines.seabourn.hero` | 1920x1080px | ❌ Need Vercel URL |
| Seabourn Logo | `cruiseLines.seabourn.logo` | PNG transparent | ❌ Need upload |
| Cunard | `cruiseLines.cunard.hero` | 1920x1080px | ❌ Need Vercel URL |
| Cunard Logo | `cruiseLines.cunard.logo` | PNG transparent | ❌ Need upload |
| Azamara | `cruiseLines.azamara.hero` | 1920x1080px | ❌ Need Vercel URL |
| Azamara Logo | `cruiseLines.azamara.logo` | PNG transparent | ❌ Need upload |

---

## 🌍 **PRIORITY 3: Bucket List Experiences (30 images)**

These are your premium content pages

### Hero Images (1920x1080px)
| Experience | Reference | Status |
|------------|-----------|--------|
| Japan & Asia | `bucketList.japanAsia.hero` | ❌ Need Vercel URL |
| Rocky Mountaineer & Alaska | `bucketList.rockyMountaineerAlaska.hero` | ❌ Need Vercel URL |
| Northern Lights | `bucketList.northernLights.hero` | ❌ Need Vercel URL |
| Antarctica | `bucketList.antarctica.hero` | ❌ Need Vercel URL |
| Galápagos Islands | `bucketList.galapagos.hero` | ❌ Need Vercel URL |
| World Cruise | `bucketList.worldCruise.hero` | ❌ Need Vercel URL |
| South America | `bucketList.southAmerica.hero` | ❌ Need Vercel URL |
| Middle East | `bucketList.middleEast.hero` | ❌ Need Vercel URL |
| Pacific & New Zealand | `bucketList.pacificNewZealand.hero` | ❌ Need Vercel URL |
| Transatlantic | `bucketList.transatlantic.hero` | ❌ Need Vercel URL |
| Amazon River | `bucketList.amazon.hero` | ❌ Need Vercel URL |
| Iceland | `bucketList.iceland.hero` | ❌ Need Vercel URL |
| European Rivers | `bucketList.rivers.hero` | ❌ Need Vercel URL |
| Great Barrier Reef | `bucketList.greatBarrierReef.hero` | ❌ Need Vercel URL |
| Bora Bora | `bucketList.boraBora.hero` | ❌ Need Vercel URL |
| Midnight Sun | `bucketList.midnightSun.hero` | ❌ Need Vercel URL |
| Grand Voyages | `bucketList.grandVoyages.hero` | ❌ Need Vercel URL |

### Card Images (800x600px)
Same list as above, but `.card` instead of `.hero`
Example: `bucketList.japanAsia.card`

---

## 🗺️ **PRIORITY 4: Cruise Line Destinations (50+ images)**

Destination images for cruise line pages (800x600px each)

### P&O Cruises Destinations (6 images)
- `cruiseLines.po.destinations.caribbean`
- `cruiseLines.po.destinations.mediterranean`
- `cruiseLines.po.destinations.fjords` ✅ Already Vercel
- `cruiseLines.po.destinations.northernEurope`
- `cruiseLines.po.destinations.canaryIslands`
- `cruiseLines.po.destinations.scandinavia`

### Celebrity Cruises Destinations (6 images)
- `cruiseLines.celebrity.destinations.caribbean`
- `cruiseLines.celebrity.destinations.mediterranean`
- `cruiseLines.celebrity.destinations.middleEast`
- `cruiseLines.celebrity.destinations.northernEurope`
- `cruiseLines.celebrity.destinations.asiaJapan`
- `cruiseLines.celebrity.destinations.grandVoyages`

### Holland America Destinations (6 images)
- `cruiseLines.hollandAmerica.destinations.alaska`
- `cruiseLines.hollandAmerica.destinations.caribbean`
- `cruiseLines.hollandAmerica.destinations.northernEurope`
- `cruiseLines.hollandAmerica.destinations.mediterranean`
- `cruiseLines.hollandAmerica.destinations.worldCruises` ✅ Already Vercel
- `cruiseLines.hollandAmerica.destinations.australiaNewZealand`

### Fred. Olsen Destinations (6 images)
- `cruiseLines.fredOlsen.destinations.fjords` ✅ Already Vercel
- `cruiseLines.fredOlsen.destinations.britishIsles`
- `cruiseLines.fredOlsen.destinations.balticCapitals`
- `cruiseLines.fredOlsen.destinations.canaryIslands`
- `cruiseLines.fredOlsen.destinations.arcticIceland`
- `cruiseLines.fredOlsen.destinations.mediterranean`

### Marella Cruises Destinations (5 images)
- `cruiseLines.marella.destinations.mediterranean`
- `cruiseLines.marella.destinations.caribbean`
- `cruiseLines.marella.destinations.canaryIslands`
- `cruiseLines.marella.destinations.arabianGulf`
- `cruiseLines.marella.destinations.adriatic`

### Viking Ocean Destinations (5 images)
- `cruiseLines.viking.destinations.northernEurope`
- `cruiseLines.viking.destinations.mediterranean`
- `cruiseLines.viking.destinations.britishIsles`
- `cruiseLines.viking.destinations.worldCruises` ✅ Already Vercel
- `cruiseLines.viking.destinations.expeditions`

### Seabourn Destinations (5 images)
- `cruiseLines.seabourn.destinations.mediterranean`
- `cruiseLines.seabourn.destinations.northernEurope`
- `cruiseLines.seabourn.destinations.caribbean`
- `cruiseLines.seabourn.destinations.worldCruises` ✅ Already Vercel
- `cruiseLines.seabourn.destinations.arcticExpeditions`

---

## 📖 **PRIORITY 5: Bucket List Gallery Images**

Additional gallery images for bucket list experiences (800x600px each)

### Japan & Asia Gallery (3 images)
- `bucketList.japanAsia.gallery[0]` - Downtown Tokyo
- `bucketList.japanAsia.gallery[1]` - Mt. Fuji
- `bucketList.japanAsia.gallery[2]` - South Korea

### South America Gallery (4 images)
- `bucketList.southAmerica.gallery[0]` - Machu Picchu
- `bucketList.southAmerica.gallery[1]` - Rio Christ statue
- `bucketList.southAmerica.gallery[2]` - Rio beach
- `bucketList.southAmerica.gallery[3]` - Peru city

### Middle East Gallery (3 images)
- `bucketList.middleEast.gallery[0]` - Abu Dhabi
- `bucketList.middleEast.gallery[1]` - Muscat
- `bucketList.middleEast.gallery[2]` - Petra

### Pacific & New Zealand Gallery (2 images)
- `bucketList.pacificNewZealand.gallery[0]` - Sydney Opera House
- `bucketList.pacificNewZealand.gallery[1]` - Sydney Harbour Bridge

---

## 🎨 **PRIORITY 6: Cruise Types (7 images)**

Category hero images (1920x1080px each)

| Type | Reference | Status |
|------|-----------|--------|
| Family Cruises | `cruiseTypes.family` | ❌ Need Vercel URL |
| Adults Only | `cruiseTypes.adultsOnly` | ❌ Need Vercel URL |
| Luxury Cruises | `cruiseTypes.luxury` | ❌ Need Vercel URL |
| UK Sailings | `cruiseTypes.ukSailings` | ❌ Need Vercel URL |
| River Cruises | `cruiseTypes.river` | ❌ Need Vercel URL |
| Expedition Cruises | `cruiseTypes.expedition` | ❌ Need Vercel URL |
| Solo Cruises | `cruiseTypes.solo` | ❌ Need Vercel URL |

---

## 📊 Summary by Priority

| Priority | Category | Count | Timeline |
|----------|----------|-------|----------|
| **P1** | Homepage Hero | 1 | ✅ Done |
| **P2** | Cruise Line Heroes + Logos | 30 | This week |
| **P3** | Bucket List Heroes + Cards | 34 | This week |
| **P4** | Cruise Line Destinations | 50+ | Next week |
| **P5** | Bucket List Galleries | 12 | Next week |
| **P6** | Cruise Types | 7 | Next week |

**Total:** ~134 images minimum

---

## 🚀 Quick Start Guide

### For This Week (Highest Impact)
Upload these first for maximum performance improvement:

1. **15 Cruise Line Heroes** (P2) - Most visible pages
2. **17 Bucket List Heroes** (P3) - Premium content
3. **15 Cruise Line Logos** (P2) - Branding

### Image Naming Convention
Suggested naming for Vercel Blob:
```
/cruise-lines/[name]-hero.webp
/cruise-lines/logos/[name]-logo.png
/bucket-list/[name]-hero.webp
/bucket-list/[name]-card.webp
/destinations/[name]-[description].webp
```

Example:
```
/cruise-lines/po-cruises-hero.webp
/cruise-lines/logos/po-cruises-logo.png
/bucket-list/antarctica-hero.webp
```

---

## 💡 Tips for Best Performance

### Image Optimization
1. **Use WebP format** - 30-50% smaller than JPEG
2. **Compress before upload** - Use https://squoosh.app
3. **Target file sizes:**
   - Heroes (1920x1080px): <200KB
   - Cards (800x600px): <100KB
   - Logos (PNG): <50KB

### Quality Settings
- **Heroes:** 85-90 quality
- **Cards:** 80-85 quality
- **Logos:** PNG-8 if possible (fewer colors = smaller file)

### Testing
After uploading, test load time:
1. Open page in Incognito
2. Chrome DevTools > Network tab
3. Image should load in <1 second

---

## 📝 How to Give Me References

### Option 1: Batch Upload List
Send me a list like this:
```
REF: cruiseLines.po.hero
URL: https://xxxxx.public.blob.vercel-storage.com/cruise-lines/po-hero.webp

REF: cruiseLines.po.logo
URL: https://xxxxx.public.blob.vercel-storage.com/cruise-lines/logos/po-logo.png

REF: bucketList.antarctica.hero
URL: https://xxxxx.public.blob.vercel-storage.com/bucket-list/antarctica-hero.webp
```

### Option 2: Spreadsheet
Create a Google Sheet with columns:
- Reference (e.g., `cruiseLines.po.hero`)
- Vercel Blob URL
- Status (Uploaded/Pending)
- Notes

---

## ⚠️ Current Issues

### Performance Impact
**132 Supabase URLs** are currently:
- ❌ Slowing down page loads (external domain lookups)
- ❌ Not optimized by Vercel CDN
- ❌ Inconsistent image quality

### After Migration
- ✅ Vercel CDN automatic optimization
- ✅ Faster DNS resolution (same domain)
- ✅ Better caching
- ✅ WebP conversion if needed
- ✅ Responsive image sizing

---

## 🆘 Need Help?

### Can't find good images?
Let me know which ones you're struggling with. I can suggest:
- Stock photo sources
- AI-generated alternatives
- Placeholder strategies

### Technical issues?
Contact me with:
- Which reference you're uploading
- Error message (if any)
- File size and format

---

**Next Steps:**
1. Start with Priority 2 (Cruise Line Heroes)
2. Upload to Vercel Blob via your CRM
3. Send me the reference + URL list
4. I'll update the codebase

**Expected Timeline:**
- Week 1 (This week): P1 + P2 + P3 (Performance critical)
- Week 2: P4 + P5 (Content completion)
- Week 3: P6 (Nice to have)

---

**Last Updated:** December 16, 2024  
**Status:** Ready for uploads  
**Contact:** Send reference list when ready

