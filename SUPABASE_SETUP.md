# Supabase Setup Complete ✅

## Code Updates Applied

The following files have been updated to use the new `website_` prefixed tables:

### ✅ Updated Files:
- **`src/components/ContactForm.jsx`**
  - Changed from: `web_enquiries`
  - Changed to: `website_enquiries`
  
- **`src/config/supabaseConfig.js`**
  - Updated table names to website-specific versions
  - Changed: `cruise_lines` → `website_cruise_lines`
  - Changed: `images` → `website_images`
  - Changed: `web_enquiries` → `website_enquiries`

### ✅ Build Status:
- Build successful
- No errors
- Ready for deployment

---

## Database Tables Created in Supabase

Your Supabase database now has these **website-specific** tables (separate from existing CRM):

```
crm.website_enquiries        ← Contact form submissions
crm.website_images           ← Image metadata for website
crm.website_cruise_lines     ← Public cruise line content
```

**Security (RLS enabled):**
- ✅ Public can INSERT enquiries (but not read them back)
- ✅ Public can READ cruise lines (published only)
- ✅ Public can READ images
- ✅ Authenticated users (CRM admins) have full access

---

## Next Steps - Complete Supabase Setup

### Step 1: Create Storage Buckets

In **Supabase Dashboard → Storage**, create these 3 public buckets:

1. **Bucket: `cruise-lines`**
   - Click "New bucket"
   - Name: `cruise-lines`
   - ✅ Check "Public bucket"
   - Click Create

2. **Bucket: `destinations`**
   - Click "New bucket"
   - Name: `destinations`
   - ✅ Check "Public bucket"
   - Click Create

3. **Bucket: `categories`**
   - Click "New bucket"
   - Name: `categories`
   - ✅ Check "Public bucket"
   - Click Create

---

### Step 2: Add Storage Policies

For **EACH bucket**, add these 3 policies:

#### For `cruise-lines` bucket:

Go to **Storage → cruise-lines → Policies** and add:

**Policy 1: Public Read**
```sql
CREATE POLICY "public_read_cruise_lines"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cruise-lines');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "auth_upload_cruise_lines"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cruise-lines');
```

**Policy 3: Authenticated Delete**
```sql
CREATE POLICY "auth_delete_cruise_lines"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'cruise-lines');
```

**Repeat for `destinations` and `categories`** (change bucket_id in each policy)

---

### Step 3: Get Environment Variables

In **Supabase Dashboard → Settings → API**:

Copy these two values:

1. **Project URL** (example: `https://abcdefgh.supabase.co`)
2. **anon public** key (long key starting with `eyJ...`)

**⚠️ IMPORTANT:** Copy the **anon** key, NOT the service_role key!

---

### Step 4: Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your **limitless-web** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

```
Name: VITE_SUPABASE_URL
Value: [paste your Project URL]
Environments: ✅ Production ✅ Preview ✅ Development

Name: VITE_SUPABASE_ANON_KEY
Value: [paste your anon key]
Environments: ✅ Production ✅ Preview ✅ Development
```

5. Click **Save**

---

### Step 5: Deploy to Vercel

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** menu on latest deployment
3. Click **Redeploy**
4. Wait for build to complete

---

### Step 6: Test Contact Form

1. Visit `new.limitlesscruises.com`
2. Fill out the contact form
3. Submit
4. Should see "Thank you! We'll be in touch soon." ✅

**Verify in Supabase:**
1. Go to **Table Editor** → `crm.website_enquiries`
2. Your test enquiry should appear!

---

## Security Summary 🔒

### What's Safe to Expose:
- ✅ `VITE_SUPABASE_URL` - Public project URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Protected by Row Level Security

### What's Protected:
- ✅ Customers table (public cannot access)
- ✅ Other enquiries (public cannot read back their own submissions)
- ✅ Admin functions (require authentication)
- ✅ Image uploads (require authentication)

### What Public Website CAN Do:
- ✅ Submit contact forms
- ✅ Read cruise line content (when published)
- ✅ View images

### What Public Website CANNOT Do:
- ❌ View customer data
- ❌ View other enquiries
- ❌ Modify any data
- ❌ Delete anything
- ❌ Upload files

**This is the industry-standard security model** used by:
- Supabase's own website
- Linear, Notion, and other modern web apps
- Protected by Row Level Security (RLS)

---

## Database Schema Overview

```
┌─────────────────────────────────────────────────────┐
│          YOUR EXISTING CRM TABLES                   │
│  (Untouched - no conflicts)                         │
├─────────────────────────────────────────────────────┤
│  crm.customers                                      │
│  crm.bookings                                       │
│  crm.[other existing tables]                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│          NEW WEBSITE TABLES                         │
│  (Clear separation from CRM)                        │
├─────────────────────────────────────────────────────┤
│  crm.website_enquiries                              │
│  - Contact form submissions from public site        │
│  - RLS: anon can INSERT only                        │
│                                                      │
│  crm.website_images                                 │
│  - Image metadata for website display               │
│  - RLS: anon can SELECT, auth can all               │
│                                                      │
│  crm.website_cruise_lines                           │
│  - Public cruise line content                       │
│  - RLS: anon can SELECT (published), auth can all   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│          STORAGE BUCKETS (TO CREATE)                │
├─────────────────────────────────────────────────────┤
│  cruise-lines/ (public read, auth write)            │
│  destinations/ (public read, auth write)            │
│  categories/   (public read, auth write)            │
└─────────────────────────────────────────────────────┘
```

---

## Current Status

### ✅ Completed:
- [x] SQL script run in Supabase
- [x] Database tables created
- [x] Row Level Security enabled
- [x] Security policies configured
- [x] Code updated to use new table names
- [x] Build verified successful

### 🔄 Next (Manual Steps):
- [ ] Create 3 storage buckets (cruise-lines, destinations, categories)
- [ ] Add storage policies to each bucket
- [ ] Copy Supabase URL and anon key
- [ ] Add environment variables to Vercel
- [ ] Redeploy to Vercel
- [ ] Test contact form submission

---

## Testing Checklist

After completing all setup steps:

### Homepage Test:
- [ ] Visit new.limitlesscruises.com
- [ ] See "Coming Soon" message with countdown
- [ ] See trust badges (ABTA, ATOL)
- [ ] Navigation shows: Home, Find a Cruise, Contact

### Contact Form Test:
- [ ] Fill out form on homepage
- [ ] Submit enquiry
- [ ] See success message
- [ ] Check Supabase → website_enquiries table
- [ ] Enquiry appears with status "new"

### Find a Cruise Test:
- [ ] Navigate to /find-a-cruise
- [ ] See enquiry-based interface
- [ ] Contact form present
- [ ] Can submit enquiry

### Contact Page Test:
- [ ] Navigate to /contact
- [ ] See contact options (phone, email)
- [ ] Contact form present
- [ ] Can submit enquiry

### Footer Test:
- [ ] Footer shows ABTA/ATOL info
- [ ] Legal links work (Terms, Privacy, Booking Terms)

---

## Environment Variables Reference

### Local Development:
Create `.env.local` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Production (Vercel):
Add in Vercel Dashboard → Settings → Environment Variables (as described in Step 4 above)

---

## Support

If you encounter issues:

1. **"supabaseUrl is required" error**
   - Environment variables not set in Vercel
   - Follow Step 4 above

2. **"Failed to insert" error**
   - Check RLS policies are created
   - Check table name is `website_enquiries`

3. **"Bucket not found" error**
   - Storage buckets not created
   - Follow Step 1 above

4. **Build fails**
   - Clear node_modules and reinstall: `npm ci`
   - Check all imports are correct

---

## Ready to Launch! 🚀

Once all steps are complete:
1. ✅ Website will accept enquiries
2. ✅ Data flows into Supabase
3. ✅ Ready to build CRM enquiry manager (Phase 3)
4. ✅ Ready to transfer to main domain (limitlesscruises.com)

**Next Phase:** Build CRM system to view and manage website enquiries!

