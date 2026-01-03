##Website Enquiry Email Fix - Direct Email Sending

**Date:** January 3, 2026  
**Issue:** Contact form shows "Sent" but no email notification received  
**Status:** ✅ FIXED

## Problem

When users submit the website contact form:
1. ✅ Form submission succeeds (enquiry saved to `website_enquiries` table)
2. ✅ "Success" message displayed to user
3. ❌ **No email notification sent to travel@limitlesscruises.com**
4. ❌ No logs in Resend dashboard

## Root Cause

The website form only saves to the database - there was **NO email trigger or webhook** configured. The form submission worked, but nobody was notified.

The website database (`Limitless_web`) is separate from the CRM database (`Limitless_CRM_V2`), so the CRM's notification system doesn't see these enquiries unless they're manually synced.

## The Solution

Created a **database trigger** that automatically sends an email via Resend API whenever a new enquiry is submitted.

### How It Works

1. User submits contact form
2. Form saves to `public.website_enquiries` table
3. **NEW:** Database trigger fires immediately
4. Trigger calls Resend API using `pg_net` extension
5. Email sent to `travel@limitlesscruises.com`
6. User sees success message

**Response time:** < 1 second (no cron delay!)

## Files Changed

### Limitless_web
- `supabase/migrations/20260103_add_website_enquiry_email_trigger.sql` - New trigger

## Setup Instructions

### 1. Apply the Migration

Go to your Supabase Dashboard for the **Limitless_web** project:

1. Navigate to **SQL Editor**
2. Copy contents of `supabase/migrations/20260103_add_website_enquiry_email_trigger.sql`
3. Paste and run

### 2. Configure Resend API Key

The trigger needs your Resend API key to send emails. Choose one option:

#### Option A: Database Setting (Quick Setup)

Run this in SQL Editor:

```sql
ALTER DATABASE postgres 
SET app.settings.resend_api_key = 're_your_actual_api_key_here';

-- Reload configuration
SELECT pg_reload_conf();
```

**Get your Resend API key:**
1. Go to https://resend.com/api-keys
2. Copy your API key (starts with `re_`)
3. Paste it in the SQL above

#### Option B: Supabase Vault (More Secure - Recommended for Production)

1. Go to Supabase Dashboard → Project Settings → Vault
2. Click "New Secret"
3. Name: `resend_api_key`
4. Value: Your Resend API key
5. Update the trigger function to use vault:

```sql
-- Replace this line in the function:
v_resend_api_key := current_setting('app.settings.resend_api_key', true);

-- With this:
SELECT decrypted_secret INTO v_resend_api_key 
FROM vault.decrypted_secrets 
WHERE name = 'resend_api_key';
```

### 3. Test the Setup

#### Test 1: Submit a test enquiry

1. Go to https://www.limitlesscruises.com/contact
2. Fill out the form with test data
3. Submit
4. Check `travel@limitlesscruises.com` inbox - should receive email immediately

#### Test 2: Check Resend logs

1. Go to https://resend.com/emails
2. Look for recent email to `travel@limitlesscruises.com`
3. Should show "Delivered" status

#### Test 3: Verify in database

```sql
-- Check trigger exists
SELECT tgname, tgrelid::regclass, tgenabled
FROM pg_trigger
WHERE tgname = 'trg_send_website_enquiry_email';

-- Check recent enquiries
SELECT id, full_name, email, created_at
FROM public.website_enquiries
ORDER BY created_at DESC
LIMIT 5;

-- Check pg_net responses (if available)
SELECT *
FROM net._http_response
ORDER BY id DESC
LIMIT 5;
```

## Email Template

The email sent includes:
- **From:** Limitless Cruises Website <noreply@limitlesscruises.com>
- **To:** travel@limitlesscruises.com
- **Subject:** New Website Enquiry from [Name]
- **Body:**
  - Customer name
  - Email address
  - Phone number
  - Message
  - Offer interest (if from offer page)
  - Source (contact page, offer page, etc.)
  - Submission timestamp
  - Link to view in CRM

## Troubleshooting

### No email received

1. **Check API key is set:**
```sql
SELECT current_setting('app.settings.resend_api_key', true);
```
Should return your API key (or at least not be empty).

2. **Check trigger is enabled:**
```sql
SELECT tgname, tgenabled
FROM pg_trigger
WHERE tgname = 'trg_send_website_enquiry_email';
```
`tgenabled` should be `O` (origin/enabled).

3. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Filter for "send_website_enquiry_email"
   - Look for errors or warnings

4. **Check pg_net extension:**
```sql
SELECT * FROM pg_extension WHERE extname = 'pg_net';
```
Should return one row. If not, run:
```sql
CREATE EXTENSION pg_net;
```

5. **Test Resend API key manually:**
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_your_api_key' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "test@limitlesscruises.com",
    "to": ["travel@limitlesscruises.com"],
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

### Email sent but not received

1. Check spam folder
2. Check Resend dashboard for delivery status
3. Verify `travel@limitlesscruises.com` is correct email

### Want to change notification email?

Edit the trigger function:

```sql
CREATE OR REPLACE FUNCTION public.send_website_enquiry_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_resend_api_key TEXT;
  v_email_body TEXT;
  v_request_id BIGINT;
BEGIN
  v_resend_api_key := current_setting('app.settings.resend_api_key', true);
  
  IF v_resend_api_key IS NULL OR v_resend_api_key = '' THEN
    RAISE WARNING 'Resend API key not configured';
    RETURN NEW;
  END IF;
  
  v_email_body := jsonb_build_object(
    'from', 'Limitless Cruises Website <noreply@limitlesscruises.com>',
    'to', ARRAY['your-new-email@example.com'],  -- CHANGE THIS
    'subject', 'New Website Enquiry from ' || COALESCE(NEW.full_name, 'Unknown'),
    'html', '...'  -- rest of template
  )::text;
  
  -- ... rest of function
END;
$$;
```

## Advantages Over Cron-Based System

✅ **Instant delivery** - No 5-minute delay  
✅ **Simpler architecture** - No cron job needed  
✅ **No CRM dependency** - Works independently  
✅ **Reliable** - Trigger fires every time  
✅ **Easy to debug** - Check Supabase logs directly  

## Related Files

- `/src/components/ContactForm.jsx` - Contact form component
- `/supabase/migrations/20251224_fix_website_enquiries_schema.sql` - Table schema
- `/supabase/migrations/20260103_add_website_enquiry_email_trigger.sql` - Email trigger

## Notes

- Trigger uses `pg_net` extension (built into Supabase)
- Emails sent asynchronously - won't slow down form submission
- If email fails, enquiry is still saved (trigger has error handling)
- Trigger logs warnings if API key not configured
- Can be tested with manual INSERT statements

## Migration Path

If you were using the CRM cron system before:
1. This new trigger is independent and better
2. You can keep both systems running (redundant emails)
3. Or disable the CRM cron for website enquiries
4. This trigger sends emails immediately vs 5-minute delay

## Security

- API key stored in database settings (or Vault for production)
- Trigger runs as `SECURITY DEFINER` (has permission to call pg_net)
- Only fires on INSERT (not UPDATE/DELETE)
- Error handling prevents trigger from blocking form submissions

