/**
 * Supabase Configuration
 * Centralized configuration for Supabase buckets, tables, and policies
 */

// Storage bucket names
export const STORAGE_BUCKETS = {
  CRUISE_LINES: 'cruise-lines',
  DESTINATIONS: 'destinations',
  CATEGORIES: 'categories',
  PRICE_MATCH_DOCS: 'price-match-documents'
};

// Database table names (website-specific to avoid conflicts with CRM)
export const TABLES = {
  CRUISE_LINES: 'website_cruise_lines',
  IMAGES: 'website_images',
  ENQUIRIES: 'website_enquiries',
  LATEST_DEALS: 'latest_deals',
  SITE_SETTINGS: 'site_settings',
  SITE_DOCUMENTS: 'site_documents',
  SITE_ASSETS: 'site_assets',
  DESTINATION_CATALOG: 'destination_catalog'
};

// Schema names
export const SCHEMA = {
  CRM: 'crm',
  WEB: 'web'
};

// Full table paths
export const FULL_TABLES = {
  CRUISE_LINES: `${SCHEMA.CRM}.${TABLES.CRUISE_LINES}`,
  IMAGES: `${SCHEMA.CRM}.${TABLES.IMAGES}`,
  ENQUIRIES: `${SCHEMA.CRM}.${TABLES.ENQUIRIES}`,
  LATEST_DEALS: `${SCHEMA.CRM}.${TABLES.LATEST_DEALS}`,
  SITE_SETTINGS: `${SCHEMA.WEB}.${TABLES.SITE_SETTINGS}`,
  SITE_DOCUMENTS: `${SCHEMA.WEB}.${TABLES.SITE_DOCUMENTS}`,
  SITE_ASSETS: `${SCHEMA.WEB}.${TABLES.SITE_ASSETS}`,
  DESTINATION_CATALOG: `${SCHEMA.WEB}.${TABLES.DESTINATION_CATALOG}`
};

// Entity types for image associations
export const ENTITY_TYPES = {
  CRUISE_LINE: 'cruise_line',
  DESTINATION: 'destination',
  CATEGORY: 'category',
  DEAL: 'deal'
};

// Enquiry status values
export const ENQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CONVERTED: 'converted',
  CLOSED: 'closed'
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
};

// Price match document upload constraints (supports PDFs)
export const PRICE_MATCH_UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB (larger for PDFs)
  ALLOWED_TYPES: [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/webp',
    'application/pdf'
  ],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.pdf']
};

