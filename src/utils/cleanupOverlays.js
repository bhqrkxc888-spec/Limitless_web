/**
 * Utility to clean up any lingering overlays or body styles
 * that might block user interaction after navigation
 */

export function cleanupOverlays() {
  // Reset body overflow
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
  
  // Remove any orphaned modal overlays
  const overlays = document.querySelectorAll('.enquiry-modal-overlay, .modal-overlay');
  overlays.forEach(overlay => {
    // Only remove if it's not actively being used
    if (!overlay.querySelector('.enquiry-modal, .modal')) {
      overlay.remove();
    }
  });
}

// Auto-cleanup on route changes
if (typeof window !== 'undefined') {
  // Listen for route changes (works with React Router)
  let lastPath = window.location.pathname;
  
  const checkRouteChange = () => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      lastPath = currentPath;
      cleanupOverlays();
    }
  };
  
  // Check on popstate (browser back/forward)
  window.addEventListener('popstate', cleanupOverlays);
  
  // Check periodically (lightweight)
  setInterval(checkRouteChange, 500);
}
