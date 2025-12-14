/**
 * Preview Mode Utilities
 * Helper functions for managing preview mode
 */

const PREVIEW_STORAGE_KEY = 'limitless_preview_mode';

/**
 * Enable preview mode
 * Stores flag in localStorage to persist across page loads
 */
export const enablePreviewMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PREVIEW_STORAGE_KEY, 'true');
  }
};

/**
 * Disable preview mode
 * Removes flag from localStorage
 */
export const disablePreviewMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PREVIEW_STORAGE_KEY);
  }
};

/**
 * Check if preview mode is enabled
 */
export const isPreviewModeEnabled = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem(PREVIEW_STORAGE_KEY) === 'true';
};

/**
 * Toggle preview mode
 */
export const togglePreviewMode = () => {
  if (isPreviewModeEnabled()) {
    disablePreviewMode();
  } else {
    enablePreviewMode();
  }
  // Reload page to apply changes
  window.location.reload();
};

