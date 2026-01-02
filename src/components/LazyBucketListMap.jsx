/**
 * LazyBucketListMap - Intersection Observer Wrapper
 * 
 * Lazy-loads the heavy Mapbox bundle only when map section is near viewport.
 * Prevents scroll hijack with "Enable map interaction" toggle.
 * Maintains fixed height placeholder to prevent CLS.
 */

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './LazyBucketListMap.css';

const BucketListMap = lazy(() => import('./BucketListMap'));

function LazyBucketListMap({ itinerary, className = '' }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMapInteractive, setIsMapInteractive] = useState(false);
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

  // Toggle map interaction handler
  const handleToggleInteraction = () => {
    setIsMapInteractive(!isMapInteractive);
  };

  // Keyboard accessibility for toggle
  const handleToggleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleInteraction();
    }
  };

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
          {/* Map Interaction Toggle */}
          <div className="map-interaction-toggle">
            <button
              type="button"
              onClick={handleToggleInteraction}
              onKeyDown={handleToggleKeyDown}
              className={`map-interaction-button ${isMapInteractive ? 'active' : ''}`}
              aria-pressed={isMapInteractive}
              aria-label={isMapInteractive ? 'Disable map interaction' : 'Enable map interaction'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isMapInteractive ? (
                  // Unlocked icon
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="currentColor"/>
                ) : (
                  // Locked icon
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                )}
              </svg>
              <span>{isMapInteractive ? 'Disable' : 'Enable'} Map Interaction</span>
            </button>
            {!isMapInteractive && (
              <span className="map-interaction-hint">
                Enable to pan, zoom and explore the map
              </span>
            )}
          </div>

          {/* Actual Map Component */}
          <div 
            className={`lazy-map-content ${isMapInteractive ? 'interactive' : 'locked'}`}
            data-interactive={isMapInteractive}
          >
            <Suspense fallback={
              <div className="lazy-map-suspense-fallback">
                <div className="lazy-map-loading-spinner" />
                <span>Loading map component...</span>
              </div>
            }>
              <BucketListMap 
                itinerary={itinerary}
                isInteractive={isMapInteractive}
              />
            </Suspense>

            {/* Overlay when locked (prevents scroll hijack) */}
            {!isMapInteractive && (
              <div 
                className="map-lock-overlay"
                onClick={handleToggleInteraction}
                role="button"
                tabIndex={0}
                onKeyDown={handleToggleKeyDown}
                aria-label="Click to enable map interaction"
              >
                <div className="map-lock-overlay-message">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                  </svg>
                  <p>Click to enable map interaction</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LazyBucketListMap;

