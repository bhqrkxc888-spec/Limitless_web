# Bucket List Upload Debug Checklist

## Trace the Upload Path:

### 1. Click Upload on Bucket List Image
- Does the file selector open? ✅ / ❌
- Can you select a file? ✅ / ❌
- Does validation run (green ticks/red errors)? ✅ / ❌

### 2. Click "Upload" Button
- Does button show "Uploading..."? ✅ / ❌
- Does progress bar appear? ✅ / ❌
- Any error in browser console? ✅ / ❌

### 3. Check Browser Console
Open DevTools (F12) → Console tab. Look for:
- ❌ **403 Forbidden** → Policy issue
- ❌ **401 Unauthorized** → Auth issue  
- ❌ **404 Not Found** → Bucket doesn't exist
- ❌ **409 Conflict** → Duplicate entry
- ❌ **500 Server Error** → Database constraint violation

### 4. Check Network Tab
DevTools → Network tab → Try upload → Look for:
- POST to `/storage/v1/object/WEB_categories/...` 
- POST to `/rest/v1/site_images`

Which one fails?

---

## Most Likely Issues:

### Issue A: Gallery Image Type Mismatch
In the code, IMAGE_SPECS uses:
```javascript
{ id: 'gallery-1', type: 'gallery-1', label: 'Gallery Image 1' }
```

But validation might expect just `gallery` not `gallery-1`, `gallery-2`, etc.

**Check:** Does `imageValidation.js` have entries for:
- `bucket-list-gallery-1` ✅
- `bucket-list-gallery-2` ✅
- etc.

### Issue B: Bucket Permissions
`WEB_categories` bucket policies might not cover `bucket-list` entity type.

**SQL to check:**
```sql
SELECT * FROM storage.objects 
WHERE bucket_id = 'WEB_categories' 
AND name LIKE '%bucket%'
LIMIT 5;
```

### Issue C: Database Constraint
The `site_images` table insert might fail if:
- Missing required columns
- Unique constraint violation
- Foreign key constraint

**SQL to check:**
```sql
-- Check table structure
\d site_images

-- Check recent inserts
SELECT * FROM site_images 
WHERE entity_type = 'bucket-list'
ORDER BY created_at DESC
LIMIT 5;
```

---

## Quick Test:

Try uploading to **Categories** (which also use `WEB_categories` bucket).
- ✅ **Works** → Issue is specific to bucket-list logic
- ❌ **Fails** → Issue is with WEB_categories bucket permissions

---

## Console Error Examples:

If you see:
```
Error uploading image: {status: 403, message: "new row violates row-level security policy"}
```
→ Policy issue with `storage.objects`

If you see:
```
Error: null value in column "uploaded_by" violates not-null constraint
```
→ Database schema issue

If you see nothing (silent fail):
→ Check if `onUploadComplete` callback is working

---

## Temporary Diagnostic:

Add console.log to ImageUpload.jsx handleUpload():

```javascript
console.log('🎯 Bucket List Upload Debug:', {
  bucket,
  entityType,
  entityId,
  imageType,
  filePath: generateFilePath(),
  fileSize: file.size,
  fileName: file.name
});
```

This will show what's being sent to Supabase.

---

## Next Step:
**Please share the browser console output** when you try to upload a bucket list image!

That will tell us exactly where it's failing.

