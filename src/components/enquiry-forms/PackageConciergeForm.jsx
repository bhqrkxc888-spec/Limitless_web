import { useState } from 'react';
import { Button } from '../ui';
import {
  ContactFields,
  PartySize,
  AlertSubscriptions,
  ExistingCustomerCheckbox,
  GDPRConsent
} from '../form-fields';
import HoneypotField from '../form-fields/HoneypotField';
import { submitEnquiryToCRM, isRateLimited } from '../../utils/formSubmission';
import { logger } from '../../utils/logger';
import './EnquiryForms.css';

/**
 * PackageConciergeForm - Premium multi-step enquiry form for complex packages
 * 4 Steps: Vision → Components → Inspiration → Contact
 * Captures comprehensive data for high-value consultative sales
 */
function PackageConciergeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Vision
    destinations: [],
    timeframe_year: '',
    timeframe_flexibility: '',
    specific_dates: '', // If "specific dates in mind" selected
    adults: 2,
    children: 0,
    children_ages: [],
    special_occasion: '',
    budget: '',

    // Step 2: Components
    include_flights: false,
    include_pre_cruise_hotel: false,
    include_post_cruise_hotel: false,
    include_transfers: false,
    include_shore_excursions: false,
    preferred_cruise_line: '',
    cabin_type: '',
    preferred_ship_location: '',
    preferred_deck: '',
    special_requirements: '',

    // Step 3: Inspiration
    inspiration_links: '',
    additional_notes: '',

    // Step 4: Contact & Subscriptions
    name: '',
    email: '',
    phone: '',
    best_time_to_call: '',
    need_quote_asap: false,
    alert_subscriptions: [],
    existing_customer: false,
    consent: false,
    website: '' // Honeypot
  });

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const destinationOptions = [
    'Mediterranean',
    'Caribbean',
    'Alaska',
    'Northern Europe',
    'Asia',
    'South America',
    'Antarctica',
    'World Cruise',
    'Not sure - surprise me'
  ];

  const flexibilityOptions = [
    { value: 'specific-dates', label: 'Specific dates in mind' },
    { value: 'flexible-season', label: 'Flexible within season' },
    { value: 'fully-flexible', label: 'Fully flexible' }
  ];

  const budgetOptions = [
    { value: '10-15k', label: '£10-15k' },
    { value: '15-20k', label: '£15-20k' },
    { value: '20-30k', label: '£20-30k' },
    { value: '30-50k', label: '£30-50k' },
    { value: '50k-plus', label: '£50k+' },
    { value: 'prefer-discuss', label: 'Prefer to discuss' }
  ];

  const shipLocationOptions = [
    { value: '', label: 'No preference' },
    { value: 'front', label: 'Front (Forward)' },
    { value: 'mid', label: 'Midship' },
    { value: 'aft', label: 'Aft (Rear)' }
  ];

  const cabinTypeOptions = [
    { value: 'inside', label: 'Inside' },
    { value: 'oceanview', label: 'Oceanview' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'suite', label: 'Suite' },
    { value: 'not-sure', label: 'Not sure' }
  ];

  const callTimeOptions = [
    { value: 'morning', label: 'Morning (9am-12pm)' },
    { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
    { value: 'evening', label: 'Evening (5pm-8pm)' },
    { value: 'anytime', label: 'Anytime' }
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

  const handleMultiSelect = (name, value) => {
    const currentValues = formData[name] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    setFormData(prev => ({
      ...prev,
      [name]: newValues
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (formData.destinations.length === 0) newErrors.destinations = 'Please select at least one destination';
        if (!formData.timeframe_year) newErrors.timeframe_year = 'Please select a year';
        if (!formData.timeframe_flexibility) newErrors.timeframe_flexibility = 'Please select flexibility';
        if (formData.timeframe_flexibility === 'specific-dates' && !formData.specific_dates) {
          newErrors.specific_dates = 'Please enter your preferred travel dates';
        }
        if (!formData.budget) newErrors.budget = 'Please select a budget range';
        if (formData.children > 0 && formData.children_ages.length !== formData.children) {
          newErrors.children_ages = 'Please enter ages for all children';
        }
        break;

      case 2:
        // Step 2 is optional but validate cabin type if selected
        break;

      case 3:
        // Step 3 is optional - no required fields
        break;

      case 4:
        if (!formData.name?.trim()) newErrors.name = 'Name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        // Phone is optional
        if (!formData.consent) newErrors.consent = 'Please accept the data processing consent';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...new Set([...completedSteps, currentStep])]);
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (step) => {
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const extractURLs = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate final step
    if (!validateStep(4)) {
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
      // Extract URLs from inspiration text
      const inspirationLinks = extractURLs(formData.inspiration_links);

      // Structure data for CRM
      const enquiryData = {
        lead_type: 'Package Concierge',
        lead_source: 'Website - Premium Package',
        priority: formData.need_quote_asap ? 'Urgent' : 'High Value',

        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          best_time_to_call: formData.best_time_to_call || null,
          existing_customer: formData.existing_customer,
          need_quote_asap: formData.need_quote_asap
        },

        package_vision: {
          destinations: formData.destinations,
          timeframe: {
            year: formData.timeframe_year,
            flexibility: formData.timeframe_flexibility,
            specific_dates: formData.specific_dates || null
          },
          travelers: {
            adults: formData.adults,
            children: formData.children,
            children_ages: formData.children_ages,
            special_occasion: formData.special_occasion || null
          },
          budget: formData.budget
        },

        package_components: {
          flights: formData.include_flights,
          pre_cruise_hotel: formData.include_pre_cruise_hotel,
          post_cruise_hotel: formData.include_post_cruise_hotel,
          transfers: formData.include_transfers,
          shore_excursions: formData.include_shore_excursions
        },

        preferences: {
          preferred_cruise_line: formData.preferred_cruise_line || null,
          cabin_type: formData.cabin_type || null,
          preferred_ship_location: formData.preferred_ship_location || null,
          preferred_deck: formData.preferred_deck || null,
          special_requirements: formData.special_requirements || null
        },

        inspiration: {
          links: inspirationLinks,
          notes: formData.additional_notes || null
        },

        alert_subscriptions: formData.alert_subscriptions,

        // For fallback compatibility
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        source: 'Package Concierge',

        website: formData.website // Honeypot check
      };

      await submitEnquiryToCRM(enquiryData, 'Package Concierge');

      setStatus('success');

    } catch (error) {
      logger.error('Package concierge submission error:', error);
      setStatus('error');
      setErrors({ submit: error.message || 'Something went wrong. Please try again or call us.' });

      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrors({});
      }, 5000);
    }
  };

  // Render step indicator
  const stepLabels = ['Vision', 'Components', 'Details', 'Contact'];
  
  const renderStepIndicator = () => (
    <div className="form-step-indicator" role="navigation" aria-label="Form progress">
      {[1, 2, 3, 4].map((step, index) => (
        <>
          <div
            key={step}
            className={`form-step ${step === currentStep ? 'active' : ''} ${completedSteps.includes(step) ? 'completed' : ''}`}
            onClick={() => goToStep(step)}
            style={{ cursor: step <= currentStep || completedSteps.includes(step - 1) ? 'pointer' : 'default' }}
            role="button"
            tabIndex={0}
            aria-current={step === currentStep ? 'step' : undefined}
          >
            <div className="form-step-number">
              {completedSteps.includes(step) ? '✓' : step}
            </div>
            <span className="form-step-label">{stepLabels[index]}</span>
          </div>
          {step < 4 && <div key={`conn-${step}`} className="form-step-connector" />}
        </>
      ))}
    </div>
  );

  return (
    <form className="enquiry-form multi-step-form" onSubmit={handleSubmit}>
      {renderStepIndicator()}

      {/* Step 1: Your Vision */}
      {currentStep === 1 && (
        <div className="form-step-content">
          <h3 className="form-section-title">Your Vision</h3>

          {/* Destinations */}
          <div className="form-group form-group-full">
            <label className="form-label">
              Destination(s) <span className="required">*</span>
            </label>
            <div className="checkbox-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {destinationOptions.map(dest => (
                <label key={dest} className="form-checkbox-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.destinations.includes(dest)}
                    onChange={() => handleMultiSelect('destinations', dest)}
                  />
                  <span>{dest}</span>
                </label>
              ))}
            </div>
            {errors.destinations && (
              <span className="form-error" role="alert">{errors.destinations}</span>
            )}
          </div>

          {/* Timeframe */}
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="timeframe_year" className="form-label">
                Preferred Year <span className="required">*</span>
              </label>
              <select
                id="timeframe_year"
                name="timeframe_year"
                className={`form-select ${errors.timeframe_year ? 'form-input-error' : ''}`}
                value={formData.timeframe_year}
                onChange={handleChange}
                required
              >
                <option value="">Select year...</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
              {errors.timeframe_year && (
                <span className="form-error" role="alert">{errors.timeframe_year}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="timeframe_flexibility" className="form-label">
                Flexibility <span className="required">*</span>
              </label>
              <select
                id="timeframe_flexibility"
                name="timeframe_flexibility"
                className={`form-select ${errors.timeframe_flexibility ? 'form-input-error' : ''}`}
                value={formData.timeframe_flexibility}
                onChange={handleChange}
                required
              >
                <option value="">Select flexibility...</option>
                {flexibilityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.timeframe_flexibility && (
                <span className="form-error" role="alert">{errors.timeframe_flexibility}</span>
              )}
            </div>
          </div>

          {/* Specific Dates - shown if "Specific dates in mind" selected */}
          {formData.timeframe_flexibility === 'specific-dates' && (
            <div className="form-group">
              <label htmlFor="specific_dates" className="form-label">
                Preferred Travel Dates <span className="required">*</span>
              </label>
              <input
                type="text"
                id="specific_dates"
                name="specific_dates"
                className={`form-input ${errors.specific_dates ? 'form-input-error' : ''}`}
                value={formData.specific_dates}
                onChange={handleChange}
                placeholder="e.g., 15-30 June 2027, or early September 2026"
              />
              <span className="form-help">
                Enter your preferred dates or date range
              </span>
              {errors.specific_dates && (
                <span className="form-error" role="alert">{errors.specific_dates}</span>
              )}
            </div>
          )}

          {/* Party Size */}
          <PartySize
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />

          {/* Special Occasion */}
          <div className="form-group">
            <label htmlFor="special_occasion" className="form-label">
              Special Occasion (Optional)
            </label>
            <input
              type="text"
              id="special_occasion"
              name="special_occasion"
              className="form-input"
              value={formData.special_occasion}
              onChange={handleChange}
              placeholder="e.g., Anniversary, Honeymoon, Birthday"
            />
          </div>

          {/* Budget */}
          <div className="form-group form-group-full">
            <label htmlFor="budget" className="form-label">
              Budget Indication <span className="required">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              className={`form-select ${errors.budget ? 'form-input-error' : ''}`}
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="">Select your budget...</option>
              {budgetOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="form-help">
              Total budget for complete package including flights, hotels, cruise
            </span>
            {errors.budget && (
              <span className="form-error" role="alert">{errors.budget}</span>
            )}
          </div>

          <div className="form-step-actions">
            <Button type="button" variant="primary" size="lg" onClick={nextStep} fullWidth>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Package Components */}
      {currentStep === 2 && (
        <div className="form-step-content">
          <h3 className="form-section-title">Package Components</h3>

          {/* Package Components */}
          <div className="form-group form-group-full">
            <label className="form-label">Package Elements</label>
            <div className="form-checkbox-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="include_flights"
                  className="form-checkbox"
                  checked={formData.include_flights}
                  onChange={handleChange}
                />
                <span>Flights</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="include_pre_cruise_hotel"
                  className="form-checkbox"
                  checked={formData.include_pre_cruise_hotel}
                  onChange={handleChange}
                />
                <span>Pre-cruise hotel(s)</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="include_post_cruise_hotel"
                  className="form-checkbox"
                  checked={formData.include_post_cruise_hotel}
                  onChange={handleChange}
                />
                <span>Post-cruise hotel(s)</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="include_transfers"
                  className="form-checkbox"
                  checked={formData.include_transfers}
                  onChange={handleChange}
                />
                <span>Airport transfers</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="include_shore_excursions"
                  className="form-checkbox"
                  checked={formData.include_shore_excursions}
                  onChange={handleChange}
                />
                <span>Shore excursions</span>
              </label>
            </div>
          </div>

          {/* Cruise Preferences */}
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="preferred_cruise_line" className="form-label">
                Preferred Cruise Line(s) (Optional)
              </label>
              <input
                type="text"
                id="preferred_cruise_line"
                name="preferred_cruise_line"
                className="form-input"
                value={formData.preferred_cruise_line}
                onChange={handleChange}
                placeholder="e.g., Princess, Cunard, Viking"
              />
              <span className="form-help">
                List any preferred cruise lines (you can list multiple)
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="cabin_type" className="form-label">
                Cabin Type (Optional)
              </label>
              <select
                id="cabin_type"
                name="cabin_type"
                className="form-select"
                value={formData.cabin_type}
                onChange={handleChange}
              >
                <option value="">Select cabin type...</option>
                {cabinTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ship Location & Deck Preferences */}
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="preferred_ship_location" className="form-label">
                Preferred Ship Location (Optional)
              </label>
              <select
                id="preferred_ship_location"
                name="preferred_ship_location"
                className="form-select"
                value={formData.preferred_ship_location}
                onChange={handleChange}
              >
                {shipLocationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preferred_deck" className="form-label">
                Preferred Deck Level (Optional)
              </label>
              <input
                type="text"
                id="preferred_deck"
                name="preferred_deck"
                className="form-input"
                value={formData.preferred_deck}
                onChange={handleChange}
                placeholder="e.g., Upper decks, Deck 8-10"
              />
              <span className="form-help">Subject to cabin type availability</span>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="form-group form-group-full">
            <label htmlFor="special_requirements" className="form-label">
              Special Requirements (Optional)
            </label>
            <textarea
              id="special_requirements"
              name="special_requirements"
              className="form-textarea"
              rows="4"
              value={formData.special_requirements}
              onChange={handleChange}
              placeholder="Any dietary needs, accessibility requirements, celebrations we should know about?"
            />
          </div>

          <div className="form-step-actions">
            <Button type="button" variant="outline" size="lg" onClick={prevStep}>
              Back
            </Button>
            <Button type="button" variant="primary" size="lg" onClick={nextStep}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Inspiration & Details */}
      {currentStep === 3 && (
        <div className="form-step-content">
          <h3 className="form-section-title">Additional Details</h3>

          {/* Inspiration Links */}
          <div className="form-group form-group-full">
            <label htmlFor="inspiration_links" className="form-label">
              Found Any Cruises You Like? (Optional)
            </label>
            <textarea
              id="inspiration_links"
              name="inspiration_links"
              className="form-textarea"
              rows="3"
              value={formData.inspiration_links}
              onChange={handleChange}
              placeholder="Paste any cruise links, blog posts, or Pinterest boards that inspire you"
            />
            <span className="form-help">
              Multiple URLs supported - paste them on separate lines
            </span>
          </div>

          {/* Additional Notes */}
          <div className="form-group form-group-full">
            <label htmlFor="additional_notes" className="form-label">
              Anything Else We Should Know? (Optional)
            </label>
            <textarea
              id="additional_notes"
              name="additional_notes"
              className="form-textarea"
              rows="4"
              value={formData.additional_notes}
              onChange={handleChange}
              placeholder="Share any other details, preferences, or questions"
            />
            <span className="form-help">
              Please include any dates to avoid, special requests, or other preferences
            </span>
          </div>

          <div className="form-step-actions">
            <Button type="button" variant="outline" size="lg" onClick={prevStep}>
              Back
            </Button>
            <Button type="button" variant="primary" size="lg" onClick={nextStep}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Contact & Subscriptions */}
      {currentStep === 4 && (
        <div className="form-step-content">
          <h3 className="form-section-title">Your Contact Details</h3>

          {/* Contact Details */}
          <ContactFields
            formData={formData}
            onChange={handleChange}
            errors={errors}
            disabled={status === 'submitting'}
            phoneRequired={false}
          />
          <span className="form-help" style={{ marginTop: '-0.75rem', display: 'block' }}>
            Phone number is optional but helps us provide faster service
          </span>

          {/* Best Time to Call - Optional */}
          <div className="form-group">
            <label htmlFor="best_time_to_call" className="form-label">
              Best Time to Call (Optional)
            </label>
            <select
              id="best_time_to_call"
              name="best_time_to_call"
              className="form-select"
              value={formData.best_time_to_call}
              onChange={handleChange}
              disabled={status === 'submitting'}
            >
              <option value="">No preference</option>
              {callTimeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Existing Customer */}
          <ExistingCustomerCheckbox
            formData={formData}
            onChange={handleChange}
            disabled={status === 'submitting'}
          />

          {/* Quote Priority */}
          <div className="form-group form-group-full" style={{ marginTop: 'var(--space-4, 1rem)' }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="need_quote_asap"
                className="form-checkbox"
                checked={formData.need_quote_asap}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <span>I am looking for a quote as soon as possible</span>
            </label>
          </div>

          {/* Alert Subscriptions */}
          <div className="form-group form-group-full" style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
            <label className="form-label" style={{ marginBottom: 'var(--space-3, 0.75rem)' }}>
              Keep Me Updated (Optional)
            </label>
            <span className="form-help" style={{ marginBottom: 'var(--space-3, 0.75rem)', display: 'block' }}>
              Get notified when we have deals matching your preferences
            </span>
            <div className="form-checkbox-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="alert_2026"
                  className="form-checkbox"
                  checked={formData.alert_subscriptions.includes('2026')}
                  onChange={() => {
                    const newSubs = formData.alert_subscriptions.includes('2026')
                      ? formData.alert_subscriptions.filter(s => s !== '2026')
                      : [...formData.alert_subscriptions, '2026'];
                    setFormData(prev => ({ ...prev, alert_subscriptions: newSubs }));
                  }}
                  disabled={status === 'submitting'}
                />
                <span>Email me when deals match my plans for 2026</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="alert_2027"
                  className="form-checkbox"
                  checked={formData.alert_subscriptions.includes('2027')}
                  onChange={() => {
                    const newSubs = formData.alert_subscriptions.includes('2027')
                      ? formData.alert_subscriptions.filter(s => s !== '2027')
                      : [...formData.alert_subscriptions, '2027'];
                    setFormData(prev => ({ ...prev, alert_subscriptions: newSubs }));
                  }}
                  disabled={status === 'submitting'}
                />
                <span>Email me when deals match my plans for 2027</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="alert_2028"
                  className="form-checkbox"
                  checked={formData.alert_subscriptions.includes('2028')}
                  onChange={() => {
                    const newSubs = formData.alert_subscriptions.includes('2028')
                      ? formData.alert_subscriptions.filter(s => s !== '2028')
                      : [...formData.alert_subscriptions, '2028'];
                    setFormData(prev => ({ ...prev, alert_subscriptions: newSubs }));
                  }}
                  disabled={status === 'submitting'}
                />
                <span>Email me when deals match my plans for 2028</span>
              </label>
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="alert_lastminute"
                  className="form-checkbox"
                  checked={formData.alert_subscriptions.includes('last-minute')}
                  onChange={() => {
                    const newSubs = formData.alert_subscriptions.includes('last-minute')
                      ? formData.alert_subscriptions.filter(s => s !== 'last-minute')
                      : [...formData.alert_subscriptions, 'last-minute'];
                    setFormData(prev => ({ ...prev, alert_subscriptions: newSubs }));
                  }}
                  disabled={status === 'submitting'}
                />
                <span>I am interested in last-minute deals to my preferences</span>
              </label>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="form-message form-message-success" role="alert" aria-live="polite">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Thank you! We will review your package vision and be in touch within 48 hours.</span>
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

          <div className="form-step-actions">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={status === 'submitting'}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'submitting' || status === 'success'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </div>

        </div>
      )}
    </form>
  );
}

export default PackageConciergeForm;

