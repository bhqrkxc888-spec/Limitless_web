-- Migration: Delete published legal documents to use updated fallback content
-- Description: Remove published records from web.site_documents so the updated
-- fallback content in the code files (PrivacyPolicy.jsx, BookingTerms.jsx, WebsiteTerms.jsx) is used

-- Delete published legal documents
-- The LegalPageTemplate component will fall back to the hardcoded content
-- when no Supabase record exists

DELETE FROM web.site_documents
WHERE slug IN ('privacy-policy', 'booking-terms', 'website-terms')
  AND status = 'published';

-- Note: If you want to keep the records but unpublish them instead, use:
-- UPDATE web.site_documents
-- SET status = 'draft'
-- WHERE slug IN ('privacy-policy', 'booking-terms', 'website-terms')
--   AND status = 'published';

