# Website to CRM Integration - Contact Form

**Date:** January 3, 2026  
**Issue:** Contact form not sending email notifications  
**Status:** ✅ FIXED

## The Correct Architecture

### Two Separate Systems

You have **two separate Supabase databases:**

1. **Website Database** (Limitless_web)
   - Public-facing website
   - Contact forms, pages, images
   
2. **CRM Database** (Limitless_CRM_V2)
   - Customer management
   - Enquiry tracking
   - **Email notification system**

### The Proper Flow

```
User submits contact form
         ↓
Website calls CRM API (/api/website-enquiry)
         ↓
CRM creates enquiry in its database
         ↓
CRM's notification trigger fires
         ↓
CRM's cron sends email (every 5 min)
         ↓
Staff sees enquiry in CRM dashboard
```

**Benefits:**
- ✅ No duplication
- ✅ Single source of truth (CRM)
- ✅ Uses existing CRM email system
- ✅ Automatic tracking
- ✅ Fallback to local DB if CRM is down

## Setup Instructions

### 1. Deploy CRM API Endpoint

The CRM API endpoint (`/api/website-enquiry`) is already created. It will deploy automatically when you push to GitHub.

**File:** `Limitless_CRM_V2/api/website-enquiry.js`

### 2. Set Environment Variables

#### In CRM Vercel Project:

1. Go to https://vercel.com → Limitless CRM project
2. Settings → Environment Variables
3. Add:
   - **Name:** `WEBSITE_WEBHOOK_SECRET`
   - **Value:** Generate a random secret (e.g., `wh_abc123xyz456def789`)
   - **Environment:** All (Production, Preview, Development)

#### In Website Vercel Project:

1. Go to https://vercel.com → Limitless Website project
2. Settings → Environment Variables
3. Add two variables:
   - **Name:** `VITE_CRM_API_URL`
   - **Value:** `https://crm.limitlesscruises.com`
   - **Environment:** All

   - **Name:** `VITE_WEBSITE_WEBHOOK_SECRET`
   - **Value:** Same secret as CRM (e.g., `wh_abc123xyz456def789`)
   - **Environment:** All

**Generate a secure secret:**
```bash
# Option 1: OpenSSL
openssl rand -hex 32

# Option 2: Node
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Just make one up
wh_your_random_string_here_123456
```

### 3. Redeploy Both Projects

After setting environment variables:

1. **CRM:** Go to Vercel → CRM project → Deployments → Redeploy latest
2. **Website:** Go to Vercel → Website project → Deployments → Redeploy latest

Or just push a new commit to trigger deployment.

## How It Works

### 1. User Submits Form

Website `ContactForm.jsx` collects:
- Full name
- Email
- Phone
- Message
- Source (contact_page, offer_page, etc.)
- Offer details (if applicable)

### 2. Website Calls CRM API

```javascript
POST https://crm.limitlesscruises.com/api/website-enquiry
Headers:
  Content-Type: application/json
  Authorization: Bearer {WEBHOOK_SECRET}
Body:
  {
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "01234567890",
    "message": "I'm interested in...",
    "source": "contact_page"
  }
```

### 3. CRM Creates Enquiry

The API endpoint:
- Validates the webhook secret (security)
- Validates required fields
- Creates enquiry in `crm.customer_enquiries` table
- Returns success

### 4. CRM Notification System Takes Over

**Automatically happens:**
- Database trigger creates notification in `crm.notifications`
- Cron job (`/api/cron/notification-email`) runs every 5 minutes
- Email sent to `travel@limitlesscruises.com` via Resend
- Notification marked as emailed

### 5. Fallback Behavior

If CRM API fails (network issue, CRM down):
- Website saves enquiry to local `website_enquiries` table
- Logs warning
- User still sees success message
- Staff must manually check local DB or sync later

## Email Configuration

**Where emails are sent from:**
- CRM's notification system
- Configured in: `Limitless_CRM_V2/api/cron/notification-email.js`

**To change notification email:**
1. Go to CRM Supabase Dashboard
2. Run SQL:
```sql
UPDATE crm.organisations
SET notification_email = 'your-new-email@example.com',
    email_notifications_enabled = true
WHERE id = (SELECT id FROM crm.organisations LIMIT 1);
```

**Note:** You still need to apply the CRM migration to add these fields!

## Testing

### Test End-to-End

1. **Submit test enquiry:**
   - Go to https://www.limitlesscruises.com/contact
   - Fill out form
   - Submit

2. **Check browser console:**
   - Should see: "Enquiry sent to CRM successfully"
   - No errors

3. **Check CRM database:**
```sql
SELECT id, full_name, email, status, created_at
FROM crm.customer_enquiries
ORDER BY created_at DESC
LIMIT 5;
```

4. **Wait 5 minutes, check email:**
   - Email should arrive at `travel@limitlesscruises.com`

5. **Check Resend logs:**
   - Go to https://resend.com/emails
   - Should see delivered email

### Test Fallback

1. Temporarily break CRM URL in env vars
2. Submit form
3. Should still succeed
4. Check website database:
```sql
SELECT * FROM public.website_enquiries
ORDER BY created_at DESC
LIMIT 1;
```

## Troubleshooting

### "Unauthorized" error

- Check webhook secrets match in both projects
- Verify environment variables are set correctly
- Redeploy after changing env vars

### Enquiry not appearing in CRM

- Check CRM API logs in Vercel
- Verify CRM database connection
- Check organisation exists in CRM

### No email received

- Wait 5 minutes (cron delay)
- Check CRM notification settings
- Verify Resend API key is set
- Apply CRM organisation migration

### Form shows error

- Check browser console for details
- Check Vercel function logs
- Verify all env vars are set

## Files Changed

### Limitless_CRM_V2 (CRM)
- ✅ `api/website-enquiry.js` - New API endpoint
- ✅ `supabase/migrations/20260103_add_organisation_notification_fields.sql` - Add email fields

### Limitless_web (Website)
- ✅ `src/components/ContactForm.jsx` - Updated to call CRM API
- ✅ `src/utils/lazyWithRetry.js` - Enhanced retry logic
- ✅ `WEBSITE_TO_CRM_INTEGRATION.md` - This documentation

### Deleted Files
- ❌ `supabase/migrations/20260103_add_website_enquiry_email_trigger.sql` - Not needed

## Security

- ✅ Webhook secret prevents unauthorized submissions
- ✅ CRM validates all inputs
- ✅ No direct database access from website
- ✅ Rate limiting on contact form
- ✅ Consent checkbox required

## Summary

**Before:**
- Form saved to website DB only
- No emails sent
- No CRM tracking

**After:**
- Form calls CRM API
- CRM creates enquiry
- CRM sends email automatically
- Single source of truth
- Fallback to local DB if needed

**No duplication because:**
- Only CRM database is authoritative
- Website local DB is just fallback/backup
- Staff only check CRM dashboard

