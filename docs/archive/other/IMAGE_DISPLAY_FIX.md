# Image Display Issue - Root Cause & Fix

## Issue Summary
Destination and bucket list images that have been uploaded through the admin interface are not displaying on the live site.

## Root Causes

### 1. Build Cache (MOST LIKELY)
The code changes removing destinations/bucket list items have been pushed but Vercel may still be building or the browser has cached the old admin interface.

**Evidence:**
- Admin still shows "Amazon River", "Polynesian Islands", "Atlantic Islands", "Africa", "Black Sea", "Pacific Islands"
- These were removed in commit `b932deb`

**Fix:** Wait for Vercel deployment to complete, then hard refresh browser (Cmd+Shift+R)

### 2. Image URL Construction
Images are constructed using the pattern:
```
https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_destinations/{slug}/{type}.webp
```

For example:
- Caribbean card: `WEB_destinations/caribbean/card.webp`
- Canary Islands card: `WEB_destinations/canary-islands/card.webp`

**Important:** The `slug` used must match **exactly** what's in `config/destinations.js`:
- ✅ Correct: `canary-islands`
- ❌ Wrong: `canary-islands-cruises`

### 3. Uploaded Images Must Match Slug Pattern
When uploading images in admin, the `entity_id` must match the slug from `config/destinations.js`:

Current slugs (26 destinations after cleanup):
1. caribbean
2. mediterranean
3. alaska
4. norway
5. baltic
6. british-isles
7. canary-islands
8. greek-islands
9. adriatic
10. transatlantic
11. iceland
12. antarctica
13. south-america
14. hawaii
15. asia
16. japan
17. australia-new-zealand
18. dubai-middle-east
19. panama-canal
20. canada-new-england
21. northern-europe
22. western-mediterranean
23. eastern-mediterranean
24. world-cruise
25. bermuda
26. mexico

Bucket list slugs (15 experiences after cleanup):
1. world-cruises
2. antarctica-expeditions
3. galapagos-islands
4. northern-lights-arctic
5. japan-asia-cruises
6. transatlantic-crossings
7. south-america-cruises
8. european-river-cruises
9. middle-east-arabian-peninsula
10. midnight-sun-voyages
11. great-barrier-reef-australia
12. iceland-circumnavigation
13. rocky-mountaineer-alaska
14. pacific-islands-new-zealand
15. grand-voyages

## How to Verify Images Are Uploaded Correctly

### Check Database:
```sql
-- Check destination images
SELECT entity_id, image_type, path 
FROM site_images 
WHERE entity_type = 'destination'
ORDER BY entity_id, image_type;

-- Check bucket list images  
SELECT entity_id, image_type, path
FROM site_images
WHERE entity_type = 'bucket-list'
ORDER BY entity_id, image_type;
```

### Check Storage:
Images should exist at:
- `WEB_destinations/{slug}/card.webp`
- `WEB_destinations/{slug}/hero.webp`
- `WEB_categories/{slug}/card.webp` (bucket list)
- `WEB_categories/{slug}/hero.webp` (bucket list)

## Immediate Actions Required

1. **Wait for Vercel Build**
   - Check https://vercel.com/dashboard for deployment status
   - Current commit: `b932deb`
   
2. **Clear Browser Cache**
   - Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
   - Or clear cache in Settings
   
3. **Verify Admin Shows Updated List**
   - Should show 26 destinations (not 30)
   - Should show 15 bucket list items (not 17)
   - Removed items should NOT appear
   
4. **Re-upload Images if Needed**
   - If images still don't show after cache clear
   - Check the entity_id in database matches slug exactly
   - Re-upload through admin interface

## Testing Checklist

- [ ] Vercel deployment shows "Ready" status
- [ ] Admin panel shows 26 destinations
- [ ] Admin panel shows 15 bucket list experiences
- [ ] No "Amazon River" or "Polynesian Islands" in admin
- [ ] No "Atlantic Islands", "Africa", "Black Sea", or "Pacific Islands" in admin
- [ ] Homepage destination cards show images (not blue placeholders)
- [ ] Bucket list page shows images
- [ ] All image URLs return 200 (not 404)

## If Images Still Don't Show

Run this diagnostic:
```javascript
// Check what URL is being generated
import { getDestinationCard } from './utils/assetHelpers';
console.log(getDestinationCard('caribbean'));
// Should output: https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_destinations/caribbean/card.webp

// Verify the image exists by pasting URL in browser
// If 404: image not uploaded OR wrong path
// If 200: caching issue
```

## Reference Files
- Destinations config: `src/config/destinations.js`
- Bucket list data: `src/data/bucketList.js`  
- Image URL helpers: `src/config/assetUrls.js`
- Asset helpers: `src/utils/assetHelpers.js`

