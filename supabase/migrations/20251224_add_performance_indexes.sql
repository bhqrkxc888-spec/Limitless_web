-- =============================================================================
-- Migration: Add Performance Indexes
-- Description: Add missing indexes to improve query performance
-- Date: 2024-12-24
-- Non-destructive: Yes (adds indexes, doesn't modify existing data)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Site Documents: Composite index for published content queries
-- Optimizes: SELECT * FROM site_documents WHERE status = 'published' ORDER BY published_at DESC
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_site_documents_published 
ON web.site_documents(status, published_at DESC) 
WHERE status = 'published';

-- -----------------------------------------------------------------------------
-- Lighthouse: Composite index for analytics queries by URL and strategy
-- Optimizes: SELECT * FROM website_lighthouse WHERE url = ? AND strategy = ? ORDER BY created_at DESC
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_lighthouse_url_strategy_created 
ON website_lighthouse(url, strategy, created_at DESC);

-- -----------------------------------------------------------------------------
-- Site Assets: Index for quick lookups by asset type
-- Optimizes: SELECT * FROM site_assets WHERE asset_type = 'destination_hero'
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_site_assets_type_only 
ON web.site_assets(asset_type);

-- -----------------------------------------------------------------------------
-- Comments for documentation
-- -----------------------------------------------------------------------------
COMMENT ON INDEX web.idx_site_documents_published IS 'Optimizes queries for published documents with date ordering';
COMMENT ON INDEX idx_lighthouse_url_strategy_created IS 'Optimizes Lighthouse result lookups by URL and strategy';
COMMENT ON INDEX web.idx_site_assets_type_only IS 'Optimizes asset type lookups without entity filtering';

