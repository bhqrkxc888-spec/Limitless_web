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
 * OfferEnquiryForm - Context-aware enquiry form for special offers
 * Captures offer-specific data and cabin preferences
 * 
 * Props:
 * - offer: Offer object with id, title, cruise_line, ship, dates, price
 * - onSuccess: Callback function when submission succeeds
 * - onCancel: Callback function when user cancels (optional)
 */
function OfferEnquiryForm({ 
  offer,
  onSuccess = null, 
  onCancel = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cabin_preference: '',
    adults: 2,
    children: 0,
    package_interest: false,
    existing_customer: false,
    consent: false,
    website: '' // Honeypot
  });

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const cabinOptions = [
    { value: 'inside', label: 'Inside' },
    { value: 'oceanview', label: 'Oceanview' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'suite', label: 'Suite' },
    { value: 'not-sure', label: 'Not sure' }
  ];

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
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [name]: Math.max(0, Math.min(20, numValue))
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.cabin_preference) newErrors.cabin_preference = 'Please select a cabin preference';
    if (!formData.consent) newErrors.consent = 'Please accept the data processing consent';

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
      const enquiryData = {
        lead_type: 'Offer Enquiry',
        lead_source: 'Website - Special Offer',

        offer_details: {
          offer_id: offer?.id || null,
          offer_title: offer?.title || 'Unknown',
          cruise_line: offer?.cruise_line || null,
          ship: offer?.ship || null,
          dates: offer?.sailing_date || offer?.dates || null,
          starting_price: offer?.price_from || offer?.starting_price || null
        },

        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          existing_customer: formData.existing_customer
        },

        preferences: {
          cabin_preference: formData.cabin_preference,
          party: {
            adults: formData.adults,
            children: formData.children
          }
        },

        package_interest: formData.package_interest,

        // For fallback compatibility
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'Offer Enquiry',
        offer_id: offer?.id,
        offer_title: offer?.title,

        website: formData.website // Honeypot check
      };

      await submitEnquiryToCRM(enquiryData, 'Offer Enquiry');

      setStatus('success');

      // Call success callback if provided
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }

    } catch (error) {
      logger.error('Offer enquiry submission error:', error);
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
        <h2 className="enquiry-form-title">
          Enquire About This Offer
        </h2>
        {offer?.title && (
          <p className="enquiry-form-subtitle" style={{ fontWeight: 600, color: 'var(--primary-color, #1e40af)' }}>
            {offer.title}
          </p>
        )}
        <p className="enquiry-form-subtitle">
          We'll provide personalised information and check availability for your preferred cabin type
        </p>
      </div>

      {/* Contact Information */}
      <ContactFields
        formData={formData}
        onChange={handleChange}
        errors={errors}
        disabled={status === 'submitting'}
        phoneRequired={true}
      />

      {/* Cabin Preference */}
      <div className="form-group form-group-full">
        <label htmlFor="cabin_preference" className="form-label">
          Cabin Preference <span className="required">*</span>
        </label>
        <select
          id="cabin_preference"
          name="cabin_preference"
          className={`form-select ${errors.cabin_preference ? 'form-input-error' : ''}`}
          value={formData.cabin_preference}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          aria-required="true"
          aria-invalid={!!errors.cabin_preference}
        >
          <option value="">Select your cabin preference...</option>
          {cabinOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.cabin_preference && (
          <span className="form-error" role="alert">{errors.cabin_preference}</span>
        )}
      </div>

      {/* Party Size */}
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="adults" className="form-label">
            Adults (18+) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="adults"
            name="adults"
            className="form-input form-input-number"
            value={formData.adults}
            onChange={handleNumberChange}
            min="1"
            max="20"
            required
            disabled={status === 'submitting'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="children" className="form-label">
            Children (0-17)
          </label>
          <input
            type="number"
            id="children"
            name="children"
            className="form-input form-input-number"
            value={formData.children}
            onChange={handleNumberChange}
            min="0"
            max="10"
            disabled={status === 'submitting'}
          />
        </div>
      </div>

      {/* Package Upsell */}
      <div className="form-group form-group-full">
        <label className="form-checkbox-label" style={{ padding: '1rem', background: 'var(--bg-light, #f9fafb)', borderRadius: '8px' }}>
          <input
            type="checkbox"
            name="package_interest"
            className="form-checkbox"
            checked={formData.package_interest}
            onChange={handleChange}
            disabled={status === 'submitting'}
          />
          <span style={{ fontWeight: 500 }}>
            I'd like you to quote flights and hotels too (complete package)
          </span>
        </label>
        <span className="form-help" style={{ marginTop: '0.5rem', display: 'block' }}>
          We can create a complete travel package including flights, hotels, and transfers
        </span>
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
          <span>Thank you! We'll check availability and be in touch within 24 hours.</span>
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

      {/* Submit Buttons */}
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting' || status === 'success'}
          fullWidth
        >
          {status === 'submitting' ? 'Sending Enquiry...' : 'Check Availability'}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={onCancel}
            disabled={status === 'submitting'}
            fullWidth
          >
            Cancel
          </Button>
        )}
      </div>

      <p className="form-note">
        We typically respond within 24 hours. For urgent enquiries, please call us.
      </p>
    </form>
  );
}

export default OfferEnquiryForm;

