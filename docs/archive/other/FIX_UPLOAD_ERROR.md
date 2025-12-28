# 🔴 URGENT FIX: Port Guide Image Upload Failing

## Error Found
```
"message": "new row for relation \"site_images\" violates check constraint \"site_images_entity_type_check\""
```

## Root Cause
The `site_images` table has a CHECK constraint that only allows these entity types:
- ✅ `'site'`
- ✅ `'destination'`
- ✅ `'cruise-line'`
- ✅ `'ship'`
- ✅ `'category'`
- ✅ `'team'`
- ❌ `'port-guide'` **MISSING**
- ❌ `'bucket-list'` **MISSING**

When you try to upload a port guide image, the admin panel tries to save:
```sql
INSERT INTO site_images (
  entity_type = 'port-guide',  -- ❌ NOT ALLOWED BY CONSTRAINT
  entity_id = 'barcelona',
  image_type = 'hero',
  ...
)
```

Database rejects it because `'port-guide'` is not in the allowed list!

---

## Solution: Run This SQL in Supabase

### Step 1: Go to Supabase Dashboard
1. https://supabase.com/dashboard
2. Select your **Limitless_web** project
3. Click **SQL Editor** in left sidebar
4. Click **"New query"**

### Step 2: Copy & Paste This SQL

```sql
-- Drop the old constraint
ALTER TABLE site_images 
DROP CONSTRAINT IF EXISTS site_images_entity_type_check;

-- Add new constraint with ALL entity types
ALTER TABLE site_images
ADD CONSTRAINT site_images_entity_type_check CHECK (
  entity_type IN (
    'site',
    'destination', 
    'cruise-line',
    'ship',
    'category',
    'team',
    'port-guide',    -- ✅ ADDED
    'bucket-list'    -- ✅ ADDED
  )
);
```

### Step 3: Click "Run" Button

Expected result:
```
Success. No rows returned
```

---

## Verify the Fix

Run this query to check the constraint:

```sql
SELECT 
  conname AS constraint_name,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conname = 'site_images_entity_type_check';
```

Expected output should include `'port-guide'` and `'bucket-list'` in the list.

---

## Then Test Upload Again

1. Go to `/admin/images/port-guides`
2. Select **Barcelona**
3. Upload a **hero** image
4. **Expected:** ✅ Upload should now succeed!

---

## Why This Happened

1. Initial migration created `site_images` table ✅
2. Migration included constraint with limited entity types ⚠️
3. Port guides were added later, but constraint wasn't updated ❌
4. Database correctly rejected invalid entity type ✅

This is good database design - constraints prevent bad data - but we forgot to update the constraint when we added port guides!

---

## What This Fixes

After running this SQL:
- ✅ Port guide images will upload successfully
- ✅ Bucket list images will upload successfully
- ✅ All other image types continue to work
- ✅ Invalid entity types still rejected (security)

---

**Priority:** 🔴 **CRITICAL** - Must be done before any image uploads will work

**Time Required:** 30 seconds (just run the SQL)

**Created:** December 28, 2024

