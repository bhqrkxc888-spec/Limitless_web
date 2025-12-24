-- Fix website_enquiries table schema
-- The form sends 'full_name' but the table might have 'name' or be missing the column
-- This migration ensures the correct columns exist

-- Add full_name column if it doesn't exist
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Add other columns that the form expects (in case they're missing too)
ALTER TABLE public.website_enquiries 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS source TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- If there's a 'name' column but no 'full_name', copy data over
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

-- Add index on status for filtering
CREATE INDEX IF NOT EXISTS idx_website_enquiries_status 
  ON public.website_enquiries(status);

-- Add index on created_at for sorting (if it exists)
CREATE INDEX IF NOT EXISTS idx_website_enquiries_created_at 
  ON public.website_enquiries(created_at DESC);

