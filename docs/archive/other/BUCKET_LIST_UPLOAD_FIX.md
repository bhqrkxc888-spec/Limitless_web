# Bucket List Upload Issue - DIAGNOSIS & FIX

## Problem:
Bucket List images not saving when uploaded.

## Root Cause:
Bucket List images are configured to use `STORAGE_BUCKETS.CATEGORIES` (which is `WEB_categories` bucket), but:

1. **Path Structure Issue:**
   - Current path: `${entityId}/${imageType}.webp`
   - Example: `amazon-river-expeditions/hero.webp`
   - This is correct!

2. **Bucket Configuration:**
   - Using: `WEB_categories` ✅ (has policies)
   - Entity type: `bucket-list` ✅
   - Entity ID: Experience ID (e.g., `amazon-river-expeditions`) ✅

3. **Potential Issues:**

### A. Entity ID Mismatch
The `entityId` being passed might not match the experience slug. Let me check:

```javascript
// In AdminBucketListImages.jsx
entityId={selectedExperience.id}  // ← PROBLEM!
```

**This should be `.slug` not `.id`!**

If `id` is a number like `1` instead of `amazon-river-expeditions`, the path becomes:
- `1/hero.webp` instead of `amazon-river-expeditions/hero.webp`

### B. Database uniqueness constraint
The `site_images` table might have a unique constraint on `(entity_type, entity_id, image_type)`.

If you're using `.id` (number) and it's trying to insert multiple times, it could fail.

---

## THE FIX:

### Change 1: Use .slug instead of .id

```javascript
// AdminBucketListImages.jsx - Line ~196
<ImageUpload
  bucket={STORAGE_BUCKETS.CATEGORIES}
  entityType="bucket-list"
  entityId={selectedExperience.slug}  // ← CHANGE FROM .id to .slug
  imageType={imageSpec.type}
  ...
/>
```

### Change 2: Verify the path structure
Should create paths like:
- `amazon-river-expeditions/hero.webp`
- `antarctica-expeditions/card.webp`
- `galapagos-islands/gallery-1.webp`

This matches the pattern used for destinations and cruise lines.

---

## Why This Matters:

1. **Consistency**: Destinations use slug, cruise lines use slug, bucket list should too
2. **URLs**: Easier to construct public URLs with slugs
3. **Human-readable**: `amazon-river-expeditions/hero.webp` vs `1/hero.webp`
4. **Database**: Slug is unique and won't change, ID might

---

## Test After Fix:

1. Go to Bucket List Images
2. Select "Amazon River Expeditions"
3. Upload a hero image
4. Check Supabase Storage → WEB_categories → should see `amazon-river-expeditions/` folder
5. Check `site_images` table → should have entry with:
   - `entity_type`: 'bucket-list'
   - `entity_id`: 'amazon-river-expeditions'
   - `image_type`: 'hero'
   - `bucket`: 'WEB_categories'
   - `path`: 'amazon-river-expeditions/hero.webp'

---

## Additional Consideration:

Should bucket list have its own bucket? Currently sharing with categories.

**Current:** `WEB_categories/amazon-river-expeditions/hero.webp`
**Alternative:** Create `WEB_bucket-list/amazon-river-expeditions/hero.webp`

**Recommendation:** Keep using `WEB_categories` for now. It's fine to share as long as slugs don't collide (which they won't - categories use different naming).

