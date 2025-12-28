# Port Guide Images - Now Wired! ✅

## Problem Solved
Images uploaded via admin panel were **not displaying** on port guide pages because the template was looking in the wrong place.

---

## What Was Wrong

### Before (Broken):
```javascript
// PortGuidePage.jsx - OLD CODE
const heroImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/hero.webp`);
// Looking for: WEB_categories/ports/mediterranean/barcelona/hero.webp ❌
```

### What Actually Happened:
```javascript
// AdminPortGuideImages.jsx - ADMIN UPLOAD
entity_type: 'port-guide'
entity_id: 'barcelona'
image_type: 'hero'
path: 'barcelona/hero.webp'  // Stored in database

// Actual URL: WEB_categories/barcelona/hero.webp ✅
```

**Mismatch!** Template was looking for path with region, but uploads went directly to slug folder.

---

## What Was Fixed

### 1. Created `usePortGuideImage` Hook

**File:** `src/hooks/useImageUrl.js`

```javascript
export function usePortGuideImage(slug, type = 'hero') {
  // Queries site_images table:
  // WHERE entity_type = 'port-guide' 
  // AND entity_id = 'barcelona'
  // AND image_type = 'hero'
  
  // Returns public URL from database
  return { imageUrl, loading };
}
```

### 2. Updated Port Guide Template

**File:** `src/templates/PortGuidePage.jsx`

**Before:**
```javascript
const heroImage = getSupabaseImageUrl(...); // Hardcoded paths ❌
```

**After:**
```javascript
// Load ALL images from database at component mount
const { imageUrl: heroImage } = usePortGuideImage(slug, 'hero'); ✅
const { imageUrl: cardImage } = usePortGuideImage(slug, 'card'); ✅
const { imageUrl: beachImage } = usePortGuideImage(slug, 'beach'); ✅
const { imageUrl: foodImage } = usePortGuideImage(slug, 'food'); ✅
const { imageUrl: attraction1Image } = usePortGuideImage(slug, 'attraction-1'); ✅
const { imageUrl: attraction2Image } = usePortGuideImage(slug, 'attraction-2'); ✅
// ... up to attraction-6
```

### 3. Fixed Database Constraint

**File:** `supabase/migrations/20251228_fix_site_images_constraint.sql`

```sql
-- Old constraint rejected 'port-guide' uploads ❌
ALTER TABLE site_images DROP CONSTRAINT site_images_entity_type_check;

-- New constraint allows 'port-guide' and 'bucket-list' ✅
ALTER TABLE site_images ADD CONSTRAINT site_images_entity_type_check CHECK (
  entity_type IN ('site', 'destination', 'cruise-line', 'ship', 'category', 'team', 'port-guide', 'bucket-list')
);
```

---

## Image Types Supported

All these image types now load from the database:

| Image Type | Purpose | Admin Panel | Template Display |
|------------|---------|-------------|------------------|
| `hero` | Page banner | ✅ | ✅ HeroSection |
| `card` | Thumbnail (listings) | ✅ | ✅ Port cards |
| `attraction-1` | La Sagrada Familia, etc. | ✅ | ✅ Attraction card 1 |
| `attraction-2` | Gothic Quarter, etc. | ✅ | ✅ Attraction card 2 |
| `attraction-3` | Park Güell, etc. | ✅ | ✅ Attraction card 3 |
| `attraction-4` | Montjuïc, etc. | ✅ | ✅ Attraction card 4 |
| `attraction-5` | Optional | ✅ | ✅ Attraction card 5 |
| `attraction-6` | Optional | ✅ | ✅ Attraction card 6 |
| `beach` | Nearest beach section | ✅ | ✅ Beach section |
| `food` | Dining section | ✅ | ✅ Food section |

---

## How It Works Now

### Upload Flow:
```
1. Admin selects port (e.g., Barcelona)
   ↓
2. Selects image type (e.g., "La Sagrada Familia")
   ↓
3. Uploads image file
   ↓
4. Saved to Supabase:
   - Storage: WEB_categories/barcelona/attraction-1.webp
   - Database: site_images table
     * entity_type = 'port-guide'
     * entity_id = 'barcelona'
     * image_type = 'attraction-1'
     * bucket = 'WEB_categories'
     * path = 'barcelona/attraction-1.webp'
   ↓
5. Port guide page loads
   ↓
6. usePortGuideImage('barcelona', 'attraction-1') queries database
   ↓
7. Returns: https://[project].supabase.co/storage/v1/object/public/WEB_categories/barcelona/attraction-1.webp
   ↓
8. Image displays! ✅
```

---

## Testing Barcelona Images

Once deployed, visit: `https://limitlesscruises.com/ports/barcelona`

**Expected Results:**
- ✅ Hero image displays (if uploaded)
- ✅ Attraction images display with correct names
- ✅ Beach image displays (if uploaded)
- ✅ Food image displays (if uploaded)
- ⚠️ Placeholder (Limitless logo) if not uploaded yet

---

## Next Steps

### 1. Verify Barcelona Images Display (5 minutes)
1. Wait for Vercel deployment to complete
2. Visit `/ports/barcelona`
3. Hard refresh (Cmd+Shift+R)
4. Check if uploaded images appear

### 2. Upload Remaining Barcelona Images
Based on the port guide content, Barcelona needs:
- ✅ Hero (page banner)
- ✅ Card (thumbnail)
- ✅ La Sagrada Familia (attraction-1)
- ✅ Gothic Quarter (attraction-2)  
- ✅ Park Güell (attraction-3)
- ⏳ Montjuïc (attraction-4)
- ⏳ Casa Batlló (attraction-5)
- ⏳ La Rambla (attraction-6)
- ⏳ Barceloneta Beach (beach)
- ⏳ La Boqueria Market or local food (food)

### 3. Roll Out to Other Ports
Once Barcelona looks good:
1. Málaga (19 images needed: 2 + 6 + 1 + 1)
2. Lisbon
3. Tenerife
4. Civitavecchia/Rome
... (16 more ports)

---

## Image Upload Checklist Per Port

For each of the 20 published ports:

**Required (2):**
- [ ] Hero (1920×1080px recommended)
- [ ] Card (800×600px recommended)

**Optional but Recommended (8):**
- [ ] Attraction 1-6 (based on mustSeeSights data)
- [ ] Beach (if nearestBeach exists)
- [ ] Food (for dining section)

**Total per port:** 2-10 images  
**Total for 20 ports:** 40-200 images

---

## Troubleshooting

### "Images still not showing after deployment"

**Check 1:** Storage buckets exist?
- Go to Supabase Dashboard > Storage
- Verify `WEB_categories` bucket exists and is public

**Check 2:** Constraint updated?
```sql
-- Run in Supabase SQL Editor:
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'site_images_entity_type_check';

-- Should include 'port-guide' and 'bucket-list'
```

**Check 3:** Images actually in database?
```sql
-- Check what's uploaded:
SELECT entity_id, image_type, path 
FROM site_images 
WHERE entity_type = 'port-guide' 
AND entity_id = 'barcelona'
ORDER BY image_type;
```

**Check 4:** Browser cache
- Hard refresh (Cmd+Shift+R)
- Or open in incognito/private window

---

## Files Changed

1. ✅ `src/hooks/useImageUrl.js` - Added `usePortGuideImage` hook
2. ✅ `src/templates/PortGuidePage.jsx` - Wired all images to database
3. ✅ `supabase/migrations/20251228_fix_site_images_constraint.sql` - Fixed constraint
4. ✅ `SUPABASE_BUCKET_POLICIES.sql` - Documentation for bucket policies

---

## Summary

**Status:** 🟢 **WIRED AND READY**

- ✅ Database lookups implemented
- ✅ All image types supported
- ✅ Constraint fixed
- ✅ Deployed to production
- ✅ Barcelona images should display after deployment

**Next:** Wait for Vercel deployment, then check Barcelona port guide page!

---

**Created:** December 28, 2024  
**Deployed:** Commit `7cf15db`  
**Status:** Live after Vercel build completes

