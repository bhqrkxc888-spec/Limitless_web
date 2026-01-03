import { useState } from 'react';
import { Button } from '../ui';
import {
  ContactFields,
  ExistingCustomerCheckbox,
  GDPRConsent
} from '../form-fields';
import HoneypotField from '../form-fields/HoneypotField';
import { submitEnquiryToCRM, isRateLimited } from '../../utils/formSubmission';
import { logger } from '../../utils/logger';
import './EnquiryForms.css';

/**
 * QuoteRequestForm - Quote request via URL submission or manual entry
 * Customers can paste a cruise URL or manually enter cruise details
 * Priority: 24hr response time
 */
function QuoteRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cruise_url: '',
    // Manual entry fields (if no URL)
    cruise_line: '',
    ship: '',
    sailing_date: '',
    departure_port: '',
    // Package elements
    include_flights: false,
    include_hotels: false,
    include_transfers: false,
    existing_customer: false,
    consent: false,
    website: '' // Honeypot
  });

  const [useManualEntry, setUseManualEntry] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    // If user starts typing in URL field, switch away from manual entry
    if (name === 'cruise_url' && value) {
      setUseManualEntry(false);
    }
  };

  const toggleEntryMode = () => {
    setUseManualEntry(!useManualEntry);
    // Clear errors when switching modes
    setErrors({});
  };

  const validateURL = (url) => {
    if (!url) return { valid: false, error: 'Please enter a cruise URL' };
    
    try {
      const urlObj = new URL(url);
      // Check if it's a valid HTTP/HTTPS URL
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { valid: false, error: 'Please enter a valid web address (starting with http:// or https://)' };
      }
      return { valid: true };
    } catch {
      return { valid: false, error: 'Please enter a valid URL' };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.consent) newErrors.consent = 'Please accept the data processing consent';

    // Validate cruise details (URL or manual entry)
    if (useManualEntry) {
      if (!formData.cruise_line?.trim()) newErrors.cruise_line = 'Cruise line is required';
      if (!formData.ship?.trim()) newErrors.ship = 'Ship name is required';
    } else {
      const urlValidation = validateURL(formData.cruise_url);
      if (!urlValidation.valid) {
        newErrors.cruise_url = urlValidation.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    // Rate limiting
    if (isRateLimited(lastSubmitTime)) {
      logger.warn('Form submission rate limited');
      setStatus('error');
      setErrors({ submit: 'Please wait a moment before submitting again' });
      setTimeout(() => {
        setStatus('idle');
        setErrors({});
      }, 5000);
      return;
    }

    setStatus('submitting');
    setLastSubmitTime(Date.now());

    try {
      // Structure data for CRM
      const cruiseDetails = useManualEntry
        ? {
            manual_entry: {
              cruise_line: formData.cruise_line,
              ship: formData.ship,
              sailing_date: formData.sailing_date || null,
              departure_port: formData.departure_port || null
            }
          }
        : {
            url: formData.cruise_url
          };

      const enquiryData = {
        lead_type: 'Quote Request',
        lead_source: 'Website - Quote Request',
        priority: '24hr response',

        cruise_details: cruiseDetails,

        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          existing_customer: formData.existing_customer
        },

        package_elements: {
          flights: formData.include_flights,
          hotels: formData.include_hotels,
          transfers: formData.include_transfers
        },

        // For fallback compatibility
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'Quote Request',

        website: formData.website // Honeypot check
      };

      await submitEnquiryToCRM(enquiryData, 'Quote Request');

      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          cruise_url: '',
          cruise_line: '',
          ship: '',
          sailing_date: '',
          departure_port: '',
          include_flights: false,
          include_hotels: false,
          include_transfers: false,
          existing_customer: false,
          consent: false,
          website: ''
        });
        setUseManualEntry(false);
        setStatus('idle');
      }, 5000);

    } catch (error) {
      logger.error('Quote request submission error:', error);
      setStatus('error');
      setErrors({ submit: error.message || 'Something went wrong. Please try again or call us.' });

      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrors({});
      }, 5000);
    }
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-form-header">
        <h2 className="enquiry-form-title">Share Your Cruise Details</h2>
        <p className="enquiry-form-subtitle">
          Paste the cruise URL below, or enter the details manually
        </p>
      </div>

      {/* Cruise Details Entry Mode Toggle */}
      <div className="form-group form-group-full">
        <div style={{ 
          padding: '1rem', 
          background: 'var(--bg-light, #f9fafb)', 
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <Button
            type="button"
            variant={useManualEntry ? 'outline' : 'ghost'}
            size="sm"
            onClick={toggleEntryMode}
            disabled={status === 'submitting'}
          >
            {useManualEntry ? 'Switch to URL Entry' : 'Don\'t have a link? Enter details manually'}
          </Button>
        </div>

        {!useManualEntry ? (
          // URL Entry Mode
          <div className="form-group">
            <label htmlFor="cruise_url" className="form-label">
              Cruise URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="cruise_url"
              name="cruise_url"
              className={`form-input ${errors.cruise_url ? 'form-input-error' : ''}`}
              value={formData.cruise_url}
              onChange={handleChange}
              placeholder="https://www.princess.com/cruise-to/alaska/..."
              disabled={status === 'submitting'}
              aria-required="true"
              aria-invalid={!!errors.cruise_url}
              aria-describedby="cruise-url-help"
              style={{ fontSize: '0.95rem' }}
            />
            <span id="cruise-url-help" className="form-help">
              Paste the full URL from any cruise website (Princess, Royal Caribbean, MSC, etc.)
            </span>
            {errors.cruise_url && (
              <span className="form-error" role="alert">{errors.cruise_url}</span>
            )}
          </div>
        ) : (
          // Manual Entry Mode
          <>
            <div className="form-group">
              <label htmlFor="cruise_line" className="form-label">
                Cruise Line <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cruise_line"
                name="cruise_line"
                className={`form-input ${errors.cruise_line ? 'form-input-error' : ''}`}
                value={formData.cruise_line}
                onChange={handleChange}
                placeholder="e.g., Princess Cruises, Royal Caribbean"
                disabled={status === 'submitting'}
                aria-required="true"
                aria-invalid={!!errors.cruise_line}
              />
              {errors.cruise_line && (
                <span className="form-error" role="alert">{errors.cruise_line}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="ship" className="form-label">
                Ship Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="ship"
                name="ship"
                className={`form-input ${errors.ship ? 'form-input-error' : ''}`}
                value={formData.ship}
                onChange={handleChange}
                placeholder="e.g., Sky Princess, Oasis of the Seas"
                disabled={status === 'submitting'}
                aria-required="true"
                aria-invalid={!!errors.ship}
              />
              {errors.ship && (
                <span className="form-error" role="alert">{errors.ship}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="sailing_date" className="form-label">
                Sailing Date (Optional)
              </label>
              <input
                type="date"
                id="sailing_date"
                name="sailing_date"
                className="form-input"
                value={formData.sailing_date}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departure_port" className="form-label">
                Departure Port (Optional)
              </label>
              <input
                type="text"
                id="departure_port"
                name="departure_port"
                className="form-input"
                value={formData.departure_port}
                onChange={handleChange}
                placeholder="e.g., Southampton, Barcelona"
                disabled={status === 'submitting'}
              />
            </div>
          </>
        )}
      </div>

      {/* Contact Information */}
      <ContactFields
        formData={formData}
        onChange={handleChange}
        errors={errors}
        disabled={status === 'submitting'}
        phoneRequired={true}
      />

      {/* Package Elements */}
      <div className="form-group form-group-full">
        <fieldset className="form-fieldset">
          <legend className="form-label">
            Package Add-ons (Optional)
          </legend>
          <p className="form-help" style={{ marginBottom: '0.75rem' }}>
            Would you like us to include any of these in your quote?
          </p>

          <div className="form-checkbox-group">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="include_flights"
                className="form-checkbox"
                checked={formData.include_flights}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <span>Include flights</span>
            </label>

            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="include_hotels"
                className="form-checkbox"
                checked={formData.include_hotels}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <span>Include hotels (pre or post-cruise)</span>
            </label>

            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="include_transfers"
                className="form-checkbox"
                checked={formData.include_transfers}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <span>Include airport/port transfers</span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Existing Customer */}
      <ExistingCustomerCheckbox
        formData={formData}
        onChange={handleChange}
        disabled={status === 'submitting'}
      />

      {/* Status Messages */}
      {status === 'success' && (
        <div className="form-message form-message-success" role="alert" aria-live="polite">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Quote request received! We'll review the cruise and send you a competitive quote within 24 hours.</span>
        </div>
      )}

      {status === 'error' && errors.submit && (
        <div className="form-message form-message-error" role="alert" aria-live="assertive">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{errors.submit}</span>
        </div>
      )}

      {/* GDPR Consent */}
      <GDPRConsent
        formData={formData}
        onChange={handleChange}
        disabled={status === 'submitting'}
        error={errors.consent}
      />

      {/* Honeypot */}
      <HoneypotField
        value={formData.website}
        onChange={handleChange}
      />

      {/* Submit Button */}
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting' || status === 'success'}
          fullWidth
        >
          {status === 'submitting' ? 'Submitting Request...' : 'Request Quote'}
        </Button>
      </div>

      <p className="form-note">
        We will review your cruise and send a competitive quote within 24 hours.
      </p>
    </form>
  );
}

export default QuoteRequestForm;

