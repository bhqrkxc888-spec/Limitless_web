/**
 * Production-safe logging utility
 * Logs to console in development, sends to Supabase in production
 */

import { logError } from '../services/errorTracking';

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    } else {
      // In production, log warnings to Supabase
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      logError(message, { 
        errorType: 'javascript', 
        severity: 'warning' 
      }).catch(() => {
        // Silently fail if error tracking fails
      });
    }
  },
  
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, send errors to Supabase
      const error = args[0] instanceof Error 
        ? args[0] 
        : new Error(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '));
      
      logError(error, { 
        errorType: 'javascript', 
        severity: 'error' 
      }).catch(() => {
        // Silently fail if error tracking fails
      });
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  }
};

