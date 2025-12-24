-- ============================================================================
-- Fix website_enquiries table schema
-- This ensures all columns expected by the website form and CRM exist
-- ============================================================================

-- Core columns for website form submission
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS source TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- CRM integration columns
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS assigned_to UUID,
  ADD COLUMN IF NOT EXISTS customer_id UUID;

-- Offer linking columns (for enquiries from offer pages)
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS offer_id UUID,
  ADD COLUMN IF NOT EXISTS offer_title TEXT;

-- Ensure created_at exists
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Ensure updated_at exists
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- If there's a 'name' column but no data in 'full_name', copy data over
-- (This is safe - it only runs if 'name' exists and 'full_name' is empty)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'website_enquiries' 
    AND column_name = 'name'
  ) THEN
    UPDATE public.website_enquiries 
    SET full_name = name 
    WHERE full_name IS NULL AND name IS NOT NULL;
  END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_website_enquiries_status 
  ON public.website_enquiries(status);

CREATE INDEX IF NOT EXISTS idx_website_enquiries_created_at 
  ON public.website_enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_website_enquiries_email 
  ON public.website_enquiries(email);

-- ============================================================================
-- Verification query (run this after to check)
-- ============================================================================
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns 
-- WHERE table_name = 'website_enquiries' 
-- ORDER BY ordinal_position;

