/**
 * Utility to clean up any lingering overlays or body styles
 * that might block user interaction after navigation
 * 
 * Note: This is called from ScrollToTop in App.jsx on every route change.
 * No need for polling - React Router handles navigation events.
 */

export function cleanupOverlays() {
  // Reset body overflow if it's stuck
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
  
  // Reset html overflow as well (some modals set both)
  if (document.documentElement.style.overflow === 'hidden') {
    document.documentElement.style.overflow = '';
  }
  
  // Remove any orphaned modal overlays
  const overlays = document.querySelectorAll('.enquiry-modal-overlay, .modal-overlay, [data-modal-overlay]');
  overlays.forEach(overlay => {
    // Only remove if it's not actively being used (no visible modal inside)
    const hasActiveModal = overlay.querySelector('.enquiry-modal, .modal, [data-modal-content]');
    if (!hasActiveModal) {
      overlay.remove();
    }
  });
  
  // Remove any stuck backdrop elements
  const backdrops = document.querySelectorAll('.modal-backdrop, .cookie-settings-overlay');
  backdrops.forEach(backdrop => {
    // Check if there's an associated modal that's open
    const isStuck = !document.querySelector('.modal.is-open, .cookie-settings.is-open');
    if (isStuck) {
      backdrop.remove();
    }
  });
}

// Only listen for popstate (browser back/forward) - no polling needed
// Route changes are handled by ScrollToTop component in App.jsx
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', cleanupOverlays);
}
