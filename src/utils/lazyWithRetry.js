/**
 * lazyWithRetry - Enhanced lazy loading with automatic retry
 * 
 * Wraps React.lazy() with retry logic to handle:
 * - Network failures
 * - Chunk loading errors
 * - Browser caching issues
 * 
 * If a chunk fails to load, it will automatically retry up to 3 times
 * with exponential backoff before showing an error.
 */

const lazyWithRetry = (componentImport, retries = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    const attemptImport = (attemptsLeft) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          if (attemptsLeft === 0) {
            // All retries exhausted
            console.error('Failed to load component after retries:', error);
            reject(error);
            return;
          }

          console.warn(`Chunk load failed, retrying... (${attemptsLeft} attempts left)`);
          
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

