-- ============================================================================
-- Trigger: Send email notification when website enquiry is submitted
-- Uses Supabase's pg_net extension to call Resend API directly
-- ============================================================================

-- Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send email notification via Resend API
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
  -- Get Resend API key from Supabase secrets/vault
  -- You'll need to set this in Supabase Dashboard → Project Settings → Vault
  -- For now, we'll use an environment variable approach
  -- TODO: Move to Supabase Vault for better security
  v_resend_api_key := current_setting('app.settings.resend_api_key', true);
  
  -- If no API key configured, log and skip
  IF v_resend_api_key IS NULL OR v_resend_api_key = '' THEN
    RAISE WARNING 'Resend API key not configured - skipping email notification';
    RETURN NEW;
  END IF;
  
  -- Build email body
  v_email_body := jsonb_build_object(
    'from', 'Limitless Cruises Website <noreply@limitlesscruises.com>',
    'to', ARRAY['travel@limitlesscruises.com'],
    'subject', 'New Website Enquiry from ' || COALESCE(NEW.full_name, NEW.name, 'Unknown'),
    'html', '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' ||
            '<h2 style="color: #0D1B2A;">New Website Enquiry</h2>' ||
            '<p><strong>Name:</strong> ' || COALESCE(NEW.full_name, NEW.name, 'Not provided') || '</p>' ||
            '<p><strong>Email:</strong> ' || COALESCE(NEW.email, 'Not provided') || '</p>' ||
            '<p><strong>Phone:</strong> ' || COALESCE(NEW.phone, 'Not provided') || '</p>' ||
            CASE WHEN NEW.offer_title IS NOT NULL THEN 
              '<p><strong>Interested in:</strong> ' || NEW.offer_title || '</p>'
            ELSE '' END ||
            '<p><strong>Message:</strong></p>' ||
            '<p style="white-space: pre-wrap;">' || COALESCE(NEW.message, 'No message') || '</p>' ||
            '<p><strong>Source:</strong> ' || COALESCE(NEW.source, 'contact_page') || '</p>' ||
            '<p><strong>Submitted:</strong> ' || TO_CHAR(NEW.created_at, 'DD/MM/YYYY HH24:MI') || '</p>' ||
            '<hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">' ||
            '<p style="color: #666; font-size: 14px;">View in CRM: <a href="https://crm.limitlesscruises.com/website-enquiries/' || NEW.id || '">Open Enquiry</a></p>' ||
            '</div>'
  )::text;
  
  -- Send email via Resend API using pg_net
  SELECT net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_resend_api_key
    ),
    body := v_email_body::jsonb
  ) INTO v_request_id;
  
  -- Log the request
  RAISE LOG 'Website enquiry email sent via Resend, request_id: %', v_request_id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send website enquiry email: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger on website_enquiries table
DROP TRIGGER IF EXISTS trg_send_website_enquiry_email ON public.website_enquiries;
CREATE TRIGGER trg_send_website_enquiry_email
  AFTER INSERT ON public.website_enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.send_website_enquiry_email();

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.send_website_enquiry_email() TO anon;
GRANT EXECUTE ON FUNCTION public.send_website_enquiry_email() TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_website_enquiry_email() TO service_role;

COMMENT ON FUNCTION public.send_website_enquiry_email() IS 'Sends email notification via Resend API when website enquiry form is submitted';

-- ============================================================================
-- SETUP INSTRUCTIONS
-- ============================================================================
-- 
-- After running this migration, you need to set the Resend API key:
--
-- Option 1: Using Supabase Vault (Recommended for production)
-- 1. Go to Supabase Dashboard → Project Settings → Vault
-- 2. Create new secret: resend_api_key = re_xxxxx
-- 3. Update function to use: SELECT vault.decrypted_secret('resend_api_key')
--
-- Option 2: Using Database Settings (Quick setup)
-- Run this SQL:
-- ALTER DATABASE postgres SET app.settings.resend_api_key = 're_your_api_key_here';
-- 
-- Then reconnect or run:
-- SELECT pg_reload_conf();
--
-- ============================================================================
-- TESTING
-- ============================================================================
--
-- Test the trigger:
-- INSERT INTO public.website_enquiries (full_name, email, phone, message, source)
-- VALUES ('Test User', 'test@example.com', '01234567890', 'Test message', 'test');
--
-- Check if email was sent:
-- SELECT * FROM net._http_response ORDER BY id DESC LIMIT 1;
--
-- ============================================================================

