/**
 * Safe JSON.stringify that handles circular references
 * 
 * This prevents the "Converting circular structure to JSON" error
 * that can crash React applications when serializing complex objects.
 */

/**
 * Safely stringify an object, handling circular references
 * @param {*} obj - Object to stringify
 * @param {number} space - Number of spaces for indentation (default: 0)
 * @returns {string} JSON string or error message
 */
export function safeStringify(obj, space = 0) {
  if (obj === null || obj === undefined) {
    return JSON.stringify(obj);
  }

  // For primitive types, use regular stringify
  if (typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  const seen = new WeakSet();
  
  try {
    return JSON.stringify(obj, (key, value) => {
      // Handle null/undefined
      if (value === null || value === undefined) {
        return value;
      }

      // Handle primitive types
      if (typeof value !== 'object') {
        return value;
      }

      // Detect circular reference
      if (seen.has(value)) {
        return '[Circular Reference]';
      }

      seen.add(value);
      return value;
    }, space);
  } catch (error) {
    console.error('[safeStringify] Error stringifying object:', error);
    
    // Return a minimal safe representation
    return JSON.stringify({
      error: 'Failed to stringify object',
      type: typeof obj,
      constructor: obj?.constructor?.name || 'Unknown'
    });
  }
}

/**
 * Safely parse JSON string
 * @param {string} str - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails (default: null)
 * @returns {*} Parsed object or fallback
 */
export function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('[safeParse] Error parsing JSON:', error);
    return fallback;
  }
}

/**
 * Check if an object can be safely stringified
 * @param {*} obj - Object to check
 * @returns {boolean} True if object can be stringified
 */
export function canStringify(obj) {
  try {
    JSON.stringify(obj);
    return true;
  } catch {
    return false;
  }
}

