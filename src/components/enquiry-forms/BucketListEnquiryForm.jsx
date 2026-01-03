import { useState } from 'react';
import { Button } from '../ui';
import {
  ContactFields,
  PartySize,
  BudgetRange,
  AlertSubscriptions,
  ExistingCustomerCheckbox,
  GDPRConsent
} from '../form-fields';
import HoneypotField from '../form-fields/HoneypotField';
import { submitEnquiryToCRM, isRateLimited } from '../../utils/formSubmission';
import { logger } from '../../utils/logger';
import './EnquiryForms.css';

/**
 * BucketListEnquiryForm - Context-aware enquiry form for bucket list experiences
 * Captures rich data for consultative sales
 * 
 * Props:
 * - bucketListItem: Name of the bucket list experience (e.g., "Antarctica Expedition")
 * - bucketListId: ID of the bucket list experience
 * - onSuccess: Callback function when submission succeeds
 * - onCancel: Callback function when user cancels (optional)
 */
function BucketListEnquiryForm({ 
  bucketListItem, 
  bucketListId = null,
  onSuccess = null, 
  onCancel = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    adults: 2,
    children: 0,
    children_ages: [],
    budget_range: '',
    additional_info: '',
    alert_subscriptions: [],
    existing_customer: false,
    consent: false,
    website: '' // Honeypot
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const timeframeOptions = [
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029-plus', label: '2029+' },
    { value: 'flexible', label: 'Flexible' }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.timeframe) newErrors.timeframe = 'Please select a timeframe';
    if (!formData.budget_range) newErrors.budget_range = 'Please select a budget range';
    if (!formData.consent) newErrors.consent = 'Please accept the data processing consent';

    // Validate children ages if children > 0
    if (formData.children > 0 && formData.children_ages.length !== formData.children) {
      newErrors.children_ages = 'Please enter ages for all children';
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
      const enquiryData = {
        lead_type: 'Bucket List Enquiry',
        lead_source: 'Website - Bucket List',
        bucket_list_item: bucketListItem,
        bucket_list_id: bucketListId,

        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          existing_customer: formData.existing_customer
        },

        enquiry_details: {
          timeframe: formData.timeframe,
          party: {
            adults: formData.adults,
            children: formData.children,
            children_ages: formData.children_ages
          },
          budget_range: formData.budget_range,
          additional_info: formData.additional_info
        },

        alert_subscriptions: formData.alert_subscriptions,
        
        // For fallback compatibility
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'Bucket List Enquiry',
        
        website: formData.website // Honeypot check
      };

      await submitEnquiryToCRM(enquiryData, 'Bucket List Enquiry');

      setStatus('success');
      
      // Call success callback if provided
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }

    } catch (error) {
      logger.error('Bucket list enquiry submission error:', error);
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
        <h2 className="enquiry-form-title">Enquire About {bucketListItem}</h2>
        <p className="enquiry-form-subtitle">
          Tell us about your dream voyage and we'll create a personalised itinerary with competitive pricing
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

      {/* Travel Timeframe */}
      <div className="form-group">
        <label htmlFor="timeframe" className="form-label">
          When would you like to travel? <span className="required">*</span>
        </label>
        <select
          id="timeframe"
          name="timeframe"
          className={`form-select ${errors.timeframe ? 'form-input-error' : ''}`}
          value={formData.timeframe}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          aria-required="true"
          aria-invalid={!!errors.timeframe}
        >
          <option value="">Select preferred year...</option>
          {timeframeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.timeframe && (
          <span className="form-error" role="alert">{errors.timeframe}</span>
        )}
      </div>

      {/* Party Size */}
      <PartySize
        formData={formData}
        onChange={handleChange}
        errors={errors}
        disabled={status === 'submitting'}
      />

      {/* Budget Range */}
      <BudgetRange
        formData={formData}
        onChange={handleChange}
        errors={errors}
        disabled={status === 'submitting'}
        helpText="Approximate budget for the complete experience"
      />

      {/* Additional Information */}
      <div className="form-group form-group-full">
        <label htmlFor="additional_info" className="form-label">
          Additional Information (Optional)
        </label>
        <textarea
          id="additional_info"
          name="additional_info"
          className="form-textarea"
          rows="4"
          value={formData.additional_info}
          onChange={handleChange}
          disabled={status === 'submitting'}
          placeholder="Tell us about any specific requirements, dates in mind, or questions you have..."
        />
      </div>

      {/* Alert Subscriptions */}
      <AlertSubscriptions
        formData={formData}
        onChange={handleChange}
        disabled={status === 'submitting'}
      />

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
          <span>Thank you! We'll be in touch within 48 hours to discuss your {bucketListItem} adventure.</span>
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
          {status === 'submitting' ? 'Sending Enquiry...' : 'Send Enquiry'}
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
        We typically respond within 48 hours. For urgent enquiries, please call us.
      </p>
    </form>
  );
}

export default BucketListEnquiryForm;

