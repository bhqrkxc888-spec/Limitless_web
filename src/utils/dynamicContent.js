/**
 * Dynamic Content Utilities
 * Functions for rotating, shuffling, and refreshing content
 * to keep pages dynamic and engaging
 */

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random items from array
 */
export function getRandomItems(array, count) {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Rotate array with optional seed for consistent rotation
 * Useful for rotating content that changes periodically
 */
export function rotateArray(array, seed = null) {
  if (!array || array.length === 0) return array;
  
  // Use date-based rotation if no seed
  const rotationSeed = seed || Math.floor(Date.now() / (1000 * 60 * 60)); // Changes hourly
  const offset = rotationSeed % array.length;
  
  return [...array.slice(offset), ...array.slice(0, offset)];
}

/**
 * Get content with time-based rotation
 * Content rotates every X hours/days
 */
export function getTimeRotatedContent(array, intervalHours = 24) {
  if (!array || array.length === 0) return array;
  
  const hoursSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60));
  const rotationIndex = Math.floor(hoursSinceEpoch / intervalHours) % array.length;
  
  return rotateArray(array, rotationIndex);
}

/**
 * Get random testimonial from array
 */
export function getRandomTestimonial(testimonials) {
  if (!testimonials || testimonials.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * testimonials.length);
  return testimonials[randomIndex];
}

/**
 * Rotate testimonials (changes every 6 hours)
 */
export function getRotatedTestimonials(testimonials, count = 3) {
  if (!testimonials || testimonials.length === 0) return [];
  
  const rotated = getTimeRotatedContent(testimonials, 6); // Rotate every 6 hours
  return rotated.slice(0, Math.min(count, rotated.length));
}

/**
 * Get seasonal content based on current month
 */
export function getSeasonalContent(items, seasonalMap) {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // Find matching seasonal items
  const seasonalItems = items.filter(item => {
    if (!item.season) return true; // Include items without season restriction
    
    // Simple season matching (can be enhanced)
    if (seasonalMap && seasonalMap[currentMonth]) {
      return seasonalMap[currentMonth].includes(item.season);
    }
    
    return true;
  });
  
  return seasonalItems.length > 0 ? seasonalItems : items;
}

/**
 * Create a rotation key for localStorage/caching
 * Useful for persisting rotation state across page loads
 */
export function getRotationKey(baseKey, intervalHours = 24) {
  const hoursSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60));
  const rotationPeriod = Math.floor(hoursSinceEpoch / intervalHours);
  return `${baseKey}_${rotationPeriod}`;
}

/**
 * Get content with user-specific rotation (based on session)
 * Different users see different rotations
 */
export function getUserRotatedContent(array, userId = null) {
  if (!array || array.length === 0) return array;
  
  // Use userId if provided, otherwise use session-based random
  const seed = userId || Math.floor(Math.random() * 1000);
  return rotateArray(array, seed);
}

/**
 * Mix featured and random items
 * Combines top priority items with random selection for variety
 */
export function getMixedContent(items, featuredCount = 2, randomCount = 1) {
  // Sort by priority if available
  const sorted = [...items].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  
  // Get featured items
  const featured = sorted.slice(0, featuredCount);
  
  // Get random items from the rest
  const remaining = sorted.slice(featuredCount);
  const random = getRandomItems(remaining, randomCount);
  
  // Combine and shuffle lightly
  return shuffleArray([...featured, ...random]);
}

