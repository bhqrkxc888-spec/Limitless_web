/**
 * Production-safe logging utility
 * Only logs in development, silent in production
 */

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
    }
    // In production, only log critical warnings
    // (can be extended to send to error tracking service)
  },
  
  error: (...args) => {
    // Always log errors, but in production could send to error tracking
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, could send to error tracking service (e.g., Sentry)
      // For now, silently fail to avoid console noise
      // console.error(...args); // Uncomment if you want errors in production
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  }
};

