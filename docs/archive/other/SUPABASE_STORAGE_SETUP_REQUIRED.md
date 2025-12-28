# ⚠️ URGENT: Supabase Storage Buckets Not Created

## Problem
Images are **disappearing** because the **Supabase Storage Buckets do not exist yet**.

When you upload an image:
1. ✅ The upload component works
2. ❌ Supabase returns an error: "Bucket does not exist"
3. ❌ The image disappears (upload fails silently)
4. ❌ No metadata is saved to `site_images` table

---

## Solution: Create Storage Buckets in Supabase Dashboard

### Required Buckets (4 total)

You need to create **4 public storage buckets** for the website image system to work:

| Bucket Name | Purpose | Required |
|-------------|---------|----------|
| `WEB_cruise-lines` | Cruise line logos, cards, heroes | ✅ YES |
| `WEB_destinations` | Destination images (heroes, cards) | ✅ YES |
| `WEB_categories` | Category cards, bucket list images, **PORT GUIDES** | ✅ YES |
| `WEB_site` | Site-wide assets (home hero, logo, favicon) | ✅ YES |

**IMPORTANT:** Port guide images are stored in `WEB_categories` bucket!

---

## Step-by-Step Setup Instructions

### Step 1: Log into Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your **Limitless_web** project
3. Click **Storage** in the left sidebar

---

### Step 2: Create Each Bucket

For **EACH** of the 4 buckets below, repeat these steps:

#### Bucket 1: `WEB_cruise-lines`

1. Click **"New bucket"** button
2. Enter settings:
   - **Name:** `WEB_cruise-lines`
   - **Public bucket:** ✅ **CHECKED** (must be public for website)
   - **File size limit:** `10485760` (10MB)
   - **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`
3. Click **"Create bucket"**

#### Bucket 2: `WEB_destinations`

1. Click **"New bucket"** button
2. Enter settings:
   - **Name:** `WEB_destinations`
   - **Public bucket:** ✅ **CHECKED**
   - **File size limit:** `10485760` (10MB)
   - **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`
3. Click **"Create bucket"**

#### Bucket 3: `WEB_categories` ⭐ **CRITICAL FOR PORT GUIDES**

1. Click **"New bucket"** button
2. Enter settings:
   - **Name:** `WEB_categories`
   - **Public bucket:** ✅ **CHECKED**
   - **File size limit:** `10485760` (10MB)
   - **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp`
3. Click **"Create bucket"**

**Note:** This bucket stores:
- Category card images
- Bucket list experience images
- **Port guide images** (hero, card, attractions, beach, food)

#### Bucket 4: `WEB_site`

1. Click **"New bucket"** button
2. Enter settings:
   - **Name:** `WEB_site`
   - **Public bucket:** ✅ **CHECKED**
   - **File size limit:** `10485760` (10MB)
   - **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/webp, image/svg+xml`
3. Click **"Create bucket"**

---

### Step 3: Verify Buckets Are Public

After creating all 4 buckets:

1. Go to **Storage** in Supabase Dashboard
2. You should see all 4 buckets listed
3. Click on each bucket
4. Verify the **lock icon** is **unlocked** (public)
5. If locked, click the lock icon and select **"Make public"**

---

### Step 4: Set Storage Policies (Automatic)

Supabase should automatically create these policies for public buckets:

**For Each Bucket:**
- ✅ Public read access (anyone can view)
- ✅ Authenticated write access (admin can upload)
- ✅ Authenticated update access (admin can replace)
- ✅ Authenticated delete access (admin can delete)

**If policies are missing:**

Go to **Storage > Policies** and add:

```sql
-- Public SELECT (required for website to display images)
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'WEB_cruise-lines'); -- Repeat for each bucket

-- Authenticated INSERT (admin can upload)
CREATE POLICY "Authenticated can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_cruise-lines'); -- Repeat for each bucket

-- Authenticated UPDATE (admin can replace)
CREATE POLICY "Authenticated can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines')
WITH CHECK (bucket_id = 'WEB_cruise-lines'); -- Repeat for each bucket

-- Authenticated DELETE (admin can delete)
CREATE POLICY "Authenticated can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines'); -- Repeat for each bucket
```

---

## How to Test After Setup

### Test 1: Upload a Port Guide Image

1. Go to `/admin/images/port-guides`
2. Select **Barcelona**
3. Try uploading a **hero** image
4. **Expected result:** ✅ Image uploads successfully and displays immediately

### Test 2: Upload a Destination Image

1. Go to `/admin/images/destinations`
2. Select **Mediterranean**
3. Try uploading a **card** image
4. **Expected result:** ✅ Image uploads and shows in preview

### Test 3: Upload a Cruise Line Logo

1. Go to `/admin/images/cruise-lines`
2. Select **Royal Caribbean**
3. Try uploading a **logo** image
4. **Expected result:** ✅ Logo uploads and displays

---

## What Happens After Setup

Once buckets are created:

1. ✅ **Images will upload successfully**
2. ✅ **Images will be stored in Supabase Storage**
3. ✅ **Metadata will be saved to `site_images` table**
4. ✅ **Images will display on the website**
5. ✅ **Admin panel will show image compliance**

---

## Current Architecture

```
Admin Panel Upload Flow:
┌─────────────────────────────────────────────────────────────┐
│ 1. User selects file in admin panel                         │
│    └─> /admin/images/port-guides/barcelona                  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. ImageUpload component validates file                     │
│    ├─> File size < 10MB                                     │
│    ├─> Format: webp, jpg, jpeg, png                         │
│    └─> ALT text required                                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Upload to Supabase Storage                               │
│    ├─> Bucket: WEB_categories                               │
│    ├─> Path: barcelona/hero.webp                            │
│    └─> ❌ FAILS IF BUCKET DOESN'T EXIST                     │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Save metadata to site_images table                       │
│    ├─> entity_type: 'port-guide'                            │
│    ├─> entity_id: 'barcelona'                               │
│    ├─> image_type: 'hero'                                   │
│    ├─> bucket: 'WEB_categories'                             │
│    ├─> path: 'barcelona/hero.webp'                          │
│    ├─> alt_text: 'Barcelona cruise port'                    │
│    ├─> width, height, file_size, format                     │
│    └─> seo_compliant: true/false                            │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Image is accessible at public URL                        │
│    └─> https://<project>.supabase.co/storage/v1/object/    │
│        public/WEB_categories/barcelona/hero.webp            │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Status: ✅ READY

The `site_images` table **already exists** and is ready to use:

```sql
-- ✅ Table created by migration: 20251228_create_site_images_table.sql

SELECT * FROM site_images;

-- Columns:
-- - id (UUID)
-- - bucket (TEXT) - e.g., 'WEB_categories'
-- - path (TEXT) - e.g., 'barcelona/hero.webp'
-- - entity_type (TEXT) - e.g., 'port-guide', 'destination', 'cruise-line'
-- - entity_id (TEXT) - e.g., 'barcelona', 'mediterranean'
-- - image_type (TEXT) - e.g., 'hero', 'card', 'logo'
-- - alt_text (TEXT)
-- - width, height, file_size, format
-- - uploaded_at, uploaded_by
-- - seo_compliant (BOOLEAN)
-- - validation_warnings (JSONB)
```

---

## Why Buckets Must Be Created Manually

Supabase does not allow SQL migrations to create storage buckets due to security restrictions. This is intentional - buckets must be created through the Supabase Dashboard UI or CLI.

**From Supabase docs:**
> Storage buckets require special permissions and cannot be created via standard SQL migrations. Use the Dashboard or `supabase storage create` command.

---

## Alternative: Supabase CLI (Advanced)

If you prefer command line:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref <your-project-id>

# Create buckets
supabase storage create WEB_cruise-lines --public
supabase storage create WEB_destinations --public
supabase storage create WEB_categories --public
supabase storage create WEB_site --public
```

---

## Summary Checklist

- [ ] Log into Supabase Dashboard
- [ ] Navigate to Storage section
- [ ] Create `WEB_cruise-lines` bucket (public, 10MB limit)
- [ ] Create `WEB_destinations` bucket (public, 10MB limit)
- [ ] Create `WEB_categories` bucket (public, 10MB limit) ⭐ **Critical for ports**
- [ ] Create `WEB_site` bucket (public, 10MB limit)
- [ ] Verify all buckets are public (unlocked icon)
- [ ] Test upload in admin panel
- [ ] ✅ Images should now upload and save successfully!

---

**Estimated Time:** 5-10 minutes

**Priority:** 🔴 **URGENT** - Required before any images can be uploaded

**Created:** December 28, 2024  
**Last Updated:** December 28, 2024

