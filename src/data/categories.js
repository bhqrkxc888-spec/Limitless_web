/**
 * Categories Data (DEPRECATED)
 * This file is kept for backwards compatibility.
 * Use cruiseTypes.js for new code.
 */

// Re-export from cruiseTypes for backwards compatibility
export { 
  cruiseTypes as categories,
  getCruiseTypeBySlug as getCategoryBySlug,
  getAllCruiseTypes,
  getFeaturedCruiseTypes
} from './cruiseTypes';
