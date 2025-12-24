/**
 * API Input Validation Utilities
 * 
 * Provides validation functions for API route inputs.
 * Helps prevent injection attacks and ensures data integrity.
 */

/**
 * Validate that a value is a non-empty string
 * @param {*} value 
 * @param {string} fieldName 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateString(value, fieldName, options = {}) {
  const { minLength = 1, maxLength = 10000, required = true } = options;
  
  if (value === undefined || value === null) {
    if (required) {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  }
  
  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be a string` };
  }
  
  if (value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} must be at most ${maxLength} characters` };
  }
  
  return { valid: true };
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  const result = validateString(email, 'email', { minLength: 5, maxLength: 254 });
  if (!result.valid) return result;
  
  // Basic email regex - not too strict
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
}

/**
 * Validate phone number (UK format preferred)
 * @param {string} phone 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePhone(phone, options = { required: true }) {
  if (!phone && !options.required) {
    return { valid: true };
  }
  
  const result = validateString(phone, 'phone', { minLength: 10, maxLength: 20 });
  if (!result.valid) return result;
  
  // Allow digits, spaces, +, -, ()
  const phoneRegex = /^[\d\s+\-()]+$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: 'Phone number contains invalid characters' };
  }
  
  return { valid: true };
}

/**
 * Validate that a value is one of allowed options
 * @param {*} value 
 * @param {string} fieldName 
 * @param {Array} allowedValues 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEnum(value, fieldName, allowedValues, options = { required: true }) {
  if (value === undefined || value === null) {
    if (options.required) {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  }
  
  if (!allowedValues.includes(value)) {
    return { valid: false, error: `${fieldName} must be one of: ${allowedValues.join(', ')}` };
  }
  
  return { valid: true };
}

/**
 * Validate a positive integer
 * @param {*} value 
 * @param {string} fieldName 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePositiveInt(value, fieldName, options = { required: true, max: 1000000 }) {
  if (value === undefined || value === null) {
    if (options.required) {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  }
  
  const num = parseInt(value, 10);
  if (isNaN(num) || num < 0) {
    return { valid: false, error: `${fieldName} must be a positive number` };
  }
  
  if (num > options.max) {
    return { valid: false, error: `${fieldName} exceeds maximum value` };
  }
  
  return { valid: true };
}

/**
 * Validate a URL
 * @param {string} url 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateUrl(url, options = { required: true }) {
  if (!url && !options.required) {
    return { valid: true };
  }
  
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Sanitize string input (basic XSS prevention)
 * @param {string} input 
 * @returns {string}
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

/**
 * Validate multiple fields at once
 * @param {Object} data - Object with field values
 * @param {Object} schema - Validation schema
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateFields(data, schema) {
  const errors = {};
  let valid = true;
  
  for (const [fieldName, validator] of Object.entries(schema)) {
    const result = validator(data[fieldName]);
    if (!result.valid) {
      valid = false;
      errors[fieldName] = result.error;
    }
  }
  
  return { valid, errors };
}

/**
 * Middleware-style validation helper for API routes
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} schema - Validation schema
 * @returns {boolean} - True if valid, false if response was sent
 */
export function validateRequest(req, res, schema) {
  const data = req.body || {};
  const { valid, errors } = validateFields(data, schema);
  
  if (!valid) {
    res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
    return false;
  }
  
  return true;
}

export default {
  validateString,
  validateEmail,
  validatePhone,
  validateEnum,
  validatePositiveInt,
  validateUrl,
  sanitizeString,
  validateFields,
  validateRequest
};

