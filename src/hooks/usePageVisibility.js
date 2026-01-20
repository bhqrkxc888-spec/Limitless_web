import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to detect page visibility changes and refresh data when tab becomes visible
 * 
 * This fixes the "stale state" issue where data doesn't load after the tab has been
 * inactive for a while.
 * 
 * @param {Function} onVisible - Callback to run when page becomes visible
 * @param {number} staleThreshold - Time in ms after which data is considered stale (default: 5 minutes)
 */
export function usePageVisibility(onVisible, staleThreshold = 5 * 60 * 1000) {
  const lastVisibleRef = useRef(Date.now());
  const onVisibleRef = useRef(onVisible);
  
  // Keep callback ref updated
  useEffect(() => {
    onVisibleRef.current = onVisible;
  }, [onVisible]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const timeSinceVisible = now - lastVisibleRef.current;
        
        // If page was hidden for longer than threshold, refresh data
        if (timeSinceVisible > staleThreshold && onVisibleRef.current) {
          onVisibleRef.current();
        }
      } else {
        // Page is being hidden, record the time
        lastVisibleRef.current = Date.now();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [staleThreshold]);
}

/**
 * Custom hook to refresh data when page becomes visible after being stale
 * 
 * @param {Function} refetch - Function to refetch data
 * @param {Array} dependencies - Dependencies that trigger a reset of the stale timer
 */
export function useRefreshOnFocus(refetch, dependencies = []) {
  const lastFetchRef = useRef(Date.now());

  // Update last fetch time when dependencies change (data was fetched)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    lastFetchRef.current = Date.now();
  }, dependencies);

  usePageVisibility(
    useCallback(() => {
      if (refetch) {
        refetch();
      }
    }, [refetch]),
    5 * 60 * 1000 // 5 minute threshold
  );
}

export default usePageVisibility;
