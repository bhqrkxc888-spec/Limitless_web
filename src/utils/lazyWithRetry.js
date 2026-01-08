/**
 * lazyWithRetry - Enhanced lazy loading with automatic retry
 * 
 * Wraps React.lazy() with retry logic to handle:
 * - Network failures
 * - Chunk loading errors
 * - Browser caching issues
 * - Stale cache after deployments
 * 
 * If a chunk fails to load, it will automatically retry up to 3 times
 * with exponential backoff. On the final retry, it will force a cache
 * bust by reloading the page if needed (max once per session).
 * 
 * Usage:
 *   const MyComponent = lazy(() => lazyWithRetry(() => import('./MyComponent')))
 */

const RELOAD_KEY = 'lazyRetry_hasReloaded';
const RELOAD_TIMESTAMP_KEY = 'lazyRetry_timestamp';
const RELOAD_COOLDOWN = 30000; // 30 seconds cooldown between reloads

// Check if we've already reloaded recently (prevent reload loops)
function hasRecentlyReloaded() {
  try {
    const hasReloaded = sessionStorage.getItem(RELOAD_KEY) === 'true';
    const timestamp = parseInt(sessionStorage.getItem(RELOAD_TIMESTAMP_KEY) || '0', 10);
    const now = Date.now();
    
    // If we reloaded recently (within cooldown period), don't reload again
    if (hasReloaded && (now - timestamp) < RELOAD_COOLDOWN) {
      return true;
    }
    
    // Clear old reload flag if cooldown has passed
    if (hasReloaded && (now - timestamp) >= RELOAD_COOLDOWN) {
      sessionStorage.removeItem(RELOAD_KEY);
      sessionStorage.removeItem(RELOAD_TIMESTAMP_KEY);
    }
    
    return false;
  } catch (_e) {
    // sessionStorage might not be available - ignore error
    return false;
  }
}

function markAsReloaded() {
  try {
    sessionStorage.setItem(RELOAD_KEY, 'true');
    sessionStorage.setItem(RELOAD_TIMESTAMP_KEY, Date.now().toString());
  } catch (_e) {
    // sessionStorage might not be available - ignore error
  }
}

const lazyWithRetry = (componentImport, retries = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    const attemptImport = (attemptsLeft) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          // Check if this is a chunk loading error
          const isChunkError = error?.name === 'ChunkLoadError' || 
                               error?.message?.includes('Loading chunk') ||
                               error?.message?.includes('Failed to fetch');
          
          if (attemptsLeft === 0) {
            // All retries exhausted
            console.error('Failed to load component after retries:', error);
            
            // If it's a chunk error and we haven't reloaded recently, try a page reload
            // This handles the case where a new deployment has invalidated old chunks
            if (isChunkError && !hasRecentlyReloaded()) {
              console.warn('Chunk load failed after retries - reloading page to clear cache');
              markAsReloaded();
              window.location.reload();
              return;
            }
            
            // If we've already reloaded, reject to show error instead of infinite loop
            console.error('Chunk load failed even after page reload - deployment might be incomplete');
            reject(error);
            return;
          }

          console.warn(`Chunk load failed, retrying... (${attemptsLeft} attempts left)`, error.message);
          
          // Exponential backoff: wait longer between each retry
          const delay = interval * (retries - attemptsLeft + 1);
          
          setTimeout(() => {
            attemptImport(attemptsLeft - 1);
          }, delay);
        });
    };

    attemptImport(retries);
  });
};

export default lazyWithRetry;

