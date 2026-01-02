/**
 * LazyBucketListMap - Intersection Observer Wrapper
 * 
 * Lazy-loads the heavy Mapbox bundle only when map section is near viewport.
 * Map is interactive by default - scroll zoom is disabled to prevent hijacking.
 * Maintains fixed height placeholder to prevent CLS.
 */

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './LazyBucketListMap.css';

const BucketListMap = lazy(() => import('./BucketListMap'));

function LazyBucketListMap({ itinerary, className = '' }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const observerRef = useRef(null);

  // Intersection Observer to trigger load when near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    // Load when map is 600px away from viewport (early load for smooth UX)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Clean up observer after triggering
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '600px', // Start loading 600px before visible
        threshold: 0
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [shouldLoad]);

  return (
    <div 
      ref={containerRef} 
      className={`lazy-bucket-list-map ${className}`}
      data-map-loaded={shouldLoad}
    >
      {!shouldLoad && (
        // Placeholder before load (same height as map to prevent CLS)
        <div className="lazy-map-placeholder">
          <div className="lazy-map-placeholder-content">
            <div className="lazy-map-placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <p className="lazy-map-placeholder-text">Interactive map loading...</p>
            <noscript>
              <p className="lazy-map-noscript">
                Interactive map requires JavaScript. Please enable JavaScript to view the map.
              </p>
            </noscript>
          </div>
        </div>
      )}

      {shouldLoad && (
        <div className="lazy-map-loaded-wrapper">
          {/* Map Component - Interactive by default, scroll zoom disabled */}
          <div className="lazy-map-content interactive">
            <Suspense fallback={
              <div className="lazy-map-suspense-fallback">
                <div className="lazy-map-loading-spinner" />
                <span>Loading map component...</span>
              </div>
            }>
              <BucketListMap itinerary={itinerary} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default LazyBucketListMap;
