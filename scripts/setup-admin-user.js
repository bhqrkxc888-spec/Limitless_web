#!/usr/bin/env node

/**
 * Admin User Setup Script
 * 
 * Creates or updates an admin user in the web.admin_users table.
 * Uses bcrypt for secure password hashing.
 * 
 * Usage:
 *   node scripts/setup-admin-user.js
 * 
 * Required environment variables:
 *   SUPABASE_URL - Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key
 * 
 * Optional environment variables (if not provided, will prompt):
 *   ADMIN_USERNAME - Username for admin account
 *   ADMIN_PASSWORD - Password for admin account
 *   ADMIN_EMAIL - Email for admin account
 */

import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes, scryptSync } from 'crypto';
import { createInterface } from 'readline';

// Check required environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('   - SUPABASE_URL');
  if (!supabaseServiceKey) console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nSet these in your environment or .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Hash password using scrypt (Node.js built-in, no external deps)
 * Format: salt:hash (both hex encoded)
 */
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against hash
 */
function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':');
  const testHash = scryptSync(password, salt, 64).toString('hex');
  return hash === testHash;
}

/**
 * Prompt for user input
 */
function prompt(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n🔐 Admin User Setup\n');
  console.log('This script will create or update an admin user.\n');
  
  // Get user details
  const username = process.env.ADMIN_USERNAME || await prompt('Username: ');
  const email = process.env.ADMIN_EMAIL || await prompt('Email (optional): ');
  const password = process.env.ADMIN_PASSWORD || await prompt('Password: ');
  const displayName = await prompt('Display Name (optional): ');
  
  if (!username || !password) {
    console.error('❌ Username and password are required.');
    process.exit(1);
  }
  
  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters.');
    process.exit(1);
  }
  
  console.log('\n📝 Creating admin user...');
  
  // Hash the password
  const passwordHash = hashPassword(password);
  
  // Check if user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('admin_users')
    .select('id, username')
    .eq('username', username)
    .maybeSingle();
  
  if (checkError && !checkError.message.includes('does not exist')) {
    console.error('❌ Error checking existing user:', checkError.message);
    process.exit(1);
  }
  
  if (existingUser) {
    // Update existing user
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({
        password_hash: passwordHash,
        email: email || null,
        display_name: displayName || null,
        failed_login_attempts: 0,
        locked_until: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingUser.id);
    
    if (updateError) {
      console.error('❌ Error updating user:', updateError.message);
      process.exit(1);
    }
    
    console.log(`✅ Updated admin user: ${username}`);
  } else {
    // Create new user
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert({
        username,
        password_hash: passwordHash,
        email: email || null,
        display_name: displayName || username,
        role: 'admin',
        is_active: true
      });
    
    if (insertError) {
      console.error('❌ Error creating user:', insertError.message);
      console.error('   Make sure the migration has been run first.');
      process.exit(1);
    }
    
    console.log(`✅ Created admin user: ${username}`);
  }
  
  console.log('\n🎉 Admin setup complete!');
  console.log(`   You can now log in at /admin/login with username: ${username}\n`);
}

main().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});

// Export for use in API routes
export { hashPassword, verifyPassword };

