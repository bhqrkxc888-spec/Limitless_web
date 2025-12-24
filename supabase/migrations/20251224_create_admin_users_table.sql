-- =============================================================================
-- Migration: Create Admin Users Table
-- Description: Secure admin user management for website admin access
-- Date: 2024-12-24
-- Non-destructive: Yes (creates new table, doesn't modify existing)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Create web.admin_users table
-- Stores admin user credentials and metadata
-- Password hashing should be done at the application level before storage
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS web.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  -- password_hash stores bcrypt or similar hash, NOT plain text
  password_hash text NOT NULL,
  email text,
  display_name text,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  failed_login_attempts int DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for quick username lookups during login
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON web.admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON web.admin_users(is_active) WHERE is_active = true;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON web.admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON web.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION web.update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Grant Permissions
-- Service role needs explicit table access grants
-- -----------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE ON web.admin_users TO service_role;
GRANT USAGE ON SCHEMA web TO service_role;

-- -----------------------------------------------------------------------------
-- RLS Policies
-- Very restrictive - only service_role can access admin users
-- No public access at all
-- -----------------------------------------------------------------------------
ALTER TABLE web.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent migrations)
DROP POLICY IF EXISTS "Service role can read admin users" ON web.admin_users;
DROP POLICY IF EXISTS "Service role can update admin users" ON web.admin_users;
DROP POLICY IF EXISTS "Service role can insert admin users" ON web.admin_users;

-- Only service_role (API endpoints) can read admin users
CREATE POLICY "Service role can read admin users"
  ON web.admin_users FOR SELECT
  TO service_role
  USING (true);

-- Only service_role can update admin users (for last_login, failed_attempts, etc.)
CREATE POLICY "Service role can update admin users"
  ON web.admin_users FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Only service_role can insert admin users
CREATE POLICY "Service role can insert admin users"
  ON web.admin_users FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Note: No DELETE policy - admin users should be deactivated, not deleted

-- -----------------------------------------------------------------------------
-- Comments for documentation
-- -----------------------------------------------------------------------------
COMMENT ON TABLE web.admin_users IS 'Stores admin user accounts for website admin access';
COMMENT ON COLUMN web.admin_users.password_hash IS 'Bcrypt hash of password - NEVER store plain text';
COMMENT ON COLUMN web.admin_users.role IS 'User role: admin (full access), editor (content only), viewer (read only)';
COMMENT ON COLUMN web.admin_users.locked_until IS 'Account locked until this time after too many failed attempts';

-- -----------------------------------------------------------------------------
-- Default admin user
-- Password should be set via environment variable during deployment
-- This creates an empty placeholder that must be configured
-- -----------------------------------------------------------------------------
-- NOTE: Do NOT insert a default user here. Admin setup should be done via:
-- 1. A secure setup script that prompts for password
-- 2. Direct database insertion with proper password hashing
-- 3. Environment variable configuration

-- Example to add admin user (run manually with proper password hash):
-- INSERT INTO web.admin_users (username, password_hash, email, display_name, role)
-- VALUES ('danelawton', '$2b$12$...your_bcrypt_hash...', 'your@email.com', 'Dane Lawton', 'admin');

