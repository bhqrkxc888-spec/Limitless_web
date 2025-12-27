-- Create site_images table if it doesn't exist
-- This table stores metadata for all website images

CREATE TABLE IF NOT EXISTS site_images (
    id SERIAL PRIMARY KEY,
    bucket TEXT NOT NULL,
    path TEXT NOT NULL,
    entity_type TEXT NOT NULL, -- 'site', 'destination', 'cruise-line', 'ship', 'category', 'bucket-list'
    entity_id TEXT NOT NULL,   -- slug or ID of the entity
    image_type TEXT NOT NULL,  -- 'hero', 'card', 'logo', 'gallery-1', 'card-p-and-o-cruises', etc.
    alt_text TEXT,
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    format TEXT,
    seo_compliant BOOLEAN DEFAULT false,
    validation_warnings JSONB,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint: one image per entity+type combination
    UNIQUE(entity_type, entity_id, image_type)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_site_images_entity ON site_images(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_site_images_bucket ON site_images(bucket, path);

-- Enable RLS (already disabled for website uploads, but good practice)
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON site_images;
DROP POLICY IF EXISTS "Enable insert for all users" ON site_images;
DROP POLICY IF EXISTS "Enable update for all users" ON site_images;
DROP POLICY IF EXISTS "Enable delete for all users" ON site_images;

-- Create new public policies (to work with cookie auth)
CREATE POLICY "Enable read access for all users" ON site_images FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert for all users" ON site_images FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON site_images FOR UPDATE TO public USING (true);
CREATE POLICY "Enable delete for all users" ON site_images FOR DELETE TO public USING (true);

-- Verify table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'site_images'
ORDER BY ordinal_position;

