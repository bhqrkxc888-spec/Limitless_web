/**
 * Environment Variable Validation
 * 
 * Validates required environment variables at application startup.
 * Provides clear error messages for missing configuration.
 */

import { logger } from './logger';

// Environment variable definitions with metadata
const ENV_CONFIG = {
  // Required for core functionality
  required: [
    {
      key: 'VITE_SUPABASE_URL',
      description: 'Supabase project URL',
      example: 'https://xxxxx.supabase.co'
    },
    {
      key: 'VITE_SUPABASE_ANON_KEY',
      description: 'Supabase anonymous/public key',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  ],
  
  // Optional but recommended
  optional: [
    {
      key: 'VITE_MAPBOX_TOKEN',
      description: 'Mapbox access token for interactive maps',
      fallback: 'Uses default token'
    },
    {
      key: 'VITE_OPENWEATHER_API_KEY',
      description: 'OpenWeatherMap API key for weather widgets',
      fallback: 'Weather features disabled'
    },
    {
      key: 'VITE_STORMGLASS_API_KEY',
      description: 'StormGlass API key for marine conditions',
      fallback: 'Marine conditions disabled'
    }
  ]
};

/**
 * Validate all required environment variables
 * @returns {{ valid: boolean, missing: string[], warnings: string[] }}
 */
export function validateEnv() {
  const result = {
    valid: true,
    missing: [],
    warnings: []
  };

  // Check required variables
  for (const envVar of ENV_CONFIG.required) {
    const value = import.meta.env[envVar.key];
    if (!value) {
      result.valid = false;
      result.missing.push(envVar.key);
    }
  }

  // Check optional variables and log warnings
  for (const envVar of ENV_CONFIG.optional) {
    const value = import.meta.env[envVar.key];
    if (!value) {
      result.warnings.push(`${envVar.key} not set - ${envVar.fallback}`);
    }
  }

  return result;
}

/**
 * Initialize environment validation
 * Logs errors/warnings and can optionally throw on missing required vars
 * 
 * @param {{ throwOnMissing?: boolean }} options
 */
export function initEnvValidation(options = {}) {
  const { throwOnMissing = false } = options;
  const result = validateEnv();

  // Log missing required variables
  if (result.missing.length > 0) {
    const message = `Missing required environment variables: ${result.missing.join(', ')}`;
    logger.error(`[Env Validation] ${message}`);
    
    // Also log how to fix
    logger.error('[Env Validation] Add these to your .env.local file or Vercel Environment Variables');
    
    if (throwOnMissing) {
      throw new Error(message);
    }
  }

  // Log optional variable warnings (only in development)
  if (import.meta.env.DEV && result.warnings.length > 0) {
    result.warnings.forEach(warning => {
      logger.info(`[Env Validation] ${warning}`);
    });
  }

  return result;
}

/**
 * Get environment info for debugging (safe to expose)
 * @returns {Object}
 */
export function getEnvInfo() {
  return {
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    hasSupabase: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
    hasMapbox: !!import.meta.env.VITE_MAPBOX_TOKEN,
    hasWeather: !!import.meta.env.VITE_OPENWEATHER_API_KEY,
    hasMarine: !!import.meta.env.VITE_STORMGLASS_API_KEY
  };
}

export default {
  validateEnv,
  initEnvValidation,
  getEnvInfo
};

