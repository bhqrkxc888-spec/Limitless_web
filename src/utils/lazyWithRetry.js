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
 * bust by reloading the page if needed.
 * 
 * Usage:
 *   const MyComponent = lazy(() => lazyWithRetry(() => import('./MyComponent')))
 */

let hasReloaded = false; // Prevent infinite reload loops

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
            
            // If it's a chunk error and we haven't reloaded yet, try a page reload
            // This handles the case where a new deployment has invalidated old chunks
            if (isChunkError && !hasReloaded) {
              console.warn('Chunk load failed after retries - reloading page to clear cache');
              hasReloaded = true;
              window.location.reload();
              return;
            }
            
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

