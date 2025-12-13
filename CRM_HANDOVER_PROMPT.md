# CRM System Handover - Limitless Cruises

## Context

This prompt is for the **Limitless_CRM** repository. The **Limitless_web** (customer-facing website) is now live at `https://limitlesscruises.com` and is sending enquiries to Supabase.

---

## Current Supabase Setup

### Project Details
- **Project URL**: `https://xrbusklskmeaamwynfmm.supabase.co`
- **Project Name**: Limitless Cruises (shared between Web and CRM)

### Existing Table: `public.website_enquiries`

This table receives contact form submissions from the website.

**Schema:**
```sql
CREATE TABLE public.website_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  assigned_to UUID,
  notes TEXT
);
```

**Current RLS Policy:**
- Anonymous users can INSERT (submit enquiries from website)
- Only authenticated users can SELECT/UPDATE/DELETE (CRM access)

**Test Data:**
There are 2 test enquiries already submitted and waiting in the table.

---

## Task 1: Display Website Enquiries in CRM

### Requirements
1. Create a page in the CRM to view all website enquiries
2. Display enquiries in a table with columns:
   - Date/Time (created_at)
   - Name (full_name)
   - Email
   - Phone
   - Message (truncated, expandable)
   - Status (new, contacted, converted, closed)
   - Assigned To
3. Add ability to:
   - View full enquiry details
   - Update status (dropdown)
   - Add notes
   - Assign to a team member
   - Mark as contacted/converted/closed
4. Filter by status, date range, assigned user
5. Sort by date (newest first by default)

### Suggested Component Structure
```
/src/pages/enquiries/
  ├── EnquiriesPage.jsx      # Main list view
  ├── EnquiryDetail.jsx      # Single enquiry view/edit
  └── EnquiriesPage.css
```

### Supabase Query Examples
```javascript
// Fetch all enquiries (newest first)
const { data, error } = await supabase
  .from('website_enquiries')
  .select('*')
  .order('created_at', { ascending: false });

// Update enquiry status
const { error } = await supabase
  .from('website_enquiries')
  .update({ status: 'contacted', notes: 'Called customer' })
  .eq('id', enquiryId);
```

---

## Task 2: Image/Document Upload Facility

### Existing Supabase Storage Buckets
The following buckets are already created:
- `cruise-lines` - Cruise line logos and images
- `destinations` - Destination photos
- `categories` - Category images (about page images are here)
- `ships` - Ship photos
- `hero-images` - Homepage/banner images

### Requirements
1. Create an image management page in the CRM
2. Features needed:
   - Browse existing images by bucket
   - Upload new images (drag & drop preferred)
   - View image details (size, dimensions, URL)
   - Copy public URL to clipboard
   - Delete images
   - Organize into folders within buckets

### Image Upload Rules (enforce in UI)
- **Max file size**: 2MB
- **Allowed formats**: .jpg, .jpeg, .png, .webp
- **Naming convention**: lowercase, hyphens (e.g., `caribbean-sunset.webp`)
- **Recommended dimensions**:
  - Hero images: 1920x1080
  - Thumbnails: 400x300
  - Logos: 200x200 (PNG with transparency)

### Suggested Component Structure
```
/src/pages/media/
  ├── MediaLibrary.jsx       # Main gallery view
  ├── ImageUploader.jsx      # Upload component
  ├── ImageCard.jsx          # Individual image display
  └── MediaLibrary.css
```

### Supabase Storage Examples
```javascript
// List files in a bucket
const { data, error } = await supabase.storage
  .from('cruise-lines')
  .list('logos', { limit: 100 });

// Upload a file
const { data, error } = await supabase.storage
  .from('cruise-lines')
  .upload('logos/new-logo.png', file, {
    cacheControl: '3600',
    upsert: false
  });

// Get public URL
const { data } = supabase.storage
  .from('cruise-lines')
  .getPublicUrl('logos/new-logo.png');
// Returns: https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/cruise-lines/logos/new-logo.png

// Delete a file
const { error } = await supabase.storage
  .from('cruise-lines')
  .remove(['logos/old-logo.png']);
```

---

## Task 3: Link Enquiries to Customers (Future)

When an enquiry comes in, the CRM should:
1. Check if the email already exists in the customers table
2. If yes, link the enquiry to that customer
3. If no, offer to create a new customer record

This requires:
- A `customers` table (may already exist in your CRM)
- A `customer_id` foreign key on `website_enquiries` (optional field)

---

## Supabase Connection

The CRM should use the same Supabase project. Environment variables needed:

```env
VITE_SUPABASE_URL=https://xrbusklskmeaamwynfmm.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

For admin operations (if needed), you may use the service role key server-side only (never expose in frontend).

---

## Authentication

The CRM should require authentication. Supabase Auth is already set up. The CRM users should:
1. Log in via email/password or magic link
2. Have appropriate roles (admin, agent)
3. Only see enquiries assigned to them (or all if admin)

---

## Summary of Work

### Immediate Tasks
1. **Enquiries Page**: Display and manage website enquiries from `public.website_enquiries`
2. **Media Library**: Upload, browse, and manage images in Supabase Storage buckets

### Future Tasks
3. **Customer Linking**: Connect enquiries to customer records
4. **Cruise Offers**: Post special offers to the website (Phase 6)
5. **Notifications**: Alert when new enquiry arrives

---

## Files in Website Repo for Reference

If you need to see how the website submits enquiries:
- `Limitless_web/src/components/ContactForm.jsx` - Form submission logic
- `Limitless_web/src/lib/supabase.js` - Supabase client setup
- `Limitless_web/src/utils/imageHelpers.js` - Image URL helper functions

---

## Questions to Confirm Before Starting

1. Does the CRM already have a Supabase client configured?
2. Is authentication already set up in the CRM?
3. Do you have a `customers` table, and what's its schema?
4. Any specific UI framework/component library used in the CRM?

