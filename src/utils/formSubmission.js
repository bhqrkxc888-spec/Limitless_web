import { supabase } from '../lib/supabase';
import { logger } from './logger';

/**
 * Submit enquiry to CRM with fallback to local database
 * @param {Object} enquiryData - The enquiry data to submit
 * @param {string} leadType - Type of lead (e.g., "Bucket List Enquiry")
 * @returns {Promise<Object>} - Result object with success status
 */
export async function submitEnquiryToCRM(enquiryData, leadType = 'Website Enquiry') {
  // Check for honeypot spam
  if (enquiryData.website) {
    logger.warn('Honeypot field filled - spam detected');
    throw new Error('Invalid submission');
  }

  const crmUrl = import.meta.env.VITE_CRM_API_URL || 'https://crm.limitlesscruises.com';
  const webhookSecret = import.meta.env.VITE_WEBSITE_WEBHOOK_SECRET || 'change-me-in-production';

  // Structure data for CRM
  const payload = {
    ...enquiryData,
    lead_type: leadType,
    created_at: new Date().toISOString()
  };

  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timeout')), 10000);
  });

  try {
    const response = await Promise.race([
      fetch(`${crmUrl}/api/website-enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${webhookSecret}`
        },
        body: JSON.stringify(payload)
      }),
      timeoutPromise
    ]);

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const result = await response.json();
    logger.info('Enquiry sent to CRM successfully:', { leadType, result });
    return { success: true, data: result };

  } catch (err) {
    clearTimeout(timeoutId);
    logger.error('Failed to send enquiry to CRM:', err);

    // Fallback: Save to local database if CRM API fails
    try {
      const fallbackData = {
        full_name: payload.contact?.name || payload.full_name,
        email: payload.contact?.email || payload.email,
        phone: payload.contact?.phone || payload.phone,
        message: formatEnquiryAsMessage(payload, leadType),
        source: leadType,
        status: 'new'
      };

      const { error: dbError } = await supabase
        .from('website_enquiries')
        .insert([fallbackData]);

      if (dbError) throw dbError;
      logger.warn('Enquiry saved to local DB as fallback');
      return { success: true, fallback: true };
    } catch (dbErr) {
      logger.error('Fallback to local DB also failed:', dbErr);
      throw new Error('Failed to submit enquiry. Please try again or call us directly.');
    }
  }
}

/**
 * Format enquiry data as a human-readable message for fallback
 */
function formatEnquiryAsMessage(payload, leadType) {
  let message = `${leadType}\n\n`;

  // Add all relevant fields
  Object.entries(payload).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      message += `\n${key}:\n`;
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue) {
          message += `  ${subKey}: ${JSON.stringify(subValue)}\n`;
        }
      });
    } else if (value && key !== 'website' && key !== 'consent' && key !== 'created_at') {
      message += `${key}: ${JSON.stringify(value)}\n`;
    }
  });

  return message;
}

/**
 * Validate UK phone number format
 */
export function validateUKPhone(phone) {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  
  // UK phone formats:
  // Mobile: 07xxx xxxxxx or +447xxx xxxxxx
  // Landline: 01xxx xxxxxx, 02x xxxx xxxx, etc.
  const ukPhoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{6}$/;
  
  if (!ukPhoneRegex.test(phone)) {
    return { valid: false, error: 'Please enter a valid UK phone number' };
  }
  
  return { valid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email) return { valid: false, error: 'Email address is required' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  return { valid: true };
}

/**
 * Validate required fields
 */
export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

/**
 * Rate limiting check (client-side)
 * Returns true if submission should be blocked
 */
export function isRateLimited(lastSubmitTime, minIntervalMs = 3000) {
  if (!lastSubmitTime) return false;
  
  const now = Date.now();
  const timeSinceLastSubmit = now - lastSubmitTime;
  
  return timeSinceLastSubmit < minIntervalMs;
}

