/**
 * Supabase Configuration
 * Centralized configuration for Supabase buckets, tables, and policies
 */

// Storage bucket names
export const STORAGE_BUCKETS = {
  CRUISE_LINES: 'cruise-lines',
  DESTINATIONS: 'destinations',
  CATEGORIES: 'categories'
};

// Database table names (website-specific to avoid conflicts with CRM)
export const TABLES = {
  CRUISE_LINES: 'website_cruise_lines',
  IMAGES: 'website_images',
  ENQUIRIES: 'website_enquiries',
  LATEST_DEALS: 'latest_deals'
};

// Schema name
export const SCHEMA = 'crm';

// Full table paths
export const FULL_TABLES = {
  CRUISE_LINES: `${SCHEMA}.${TABLES.CRUISE_LINES}`,
  IMAGES: `${SCHEMA}.${TABLES.IMAGES}`,
  ENQUIRIES: `${SCHEMA}.${TABLES.ENQUIRIES}`,
  LATEST_DEALS: `${SCHEMA}.${TABLES.LATEST_DEALS}`
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

