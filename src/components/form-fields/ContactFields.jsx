import { useState } from 'react';
import './FormFields.css';

/**
 * ContactFields - Reusable contact information fields (name, email, phone)
 * Used across all enquiry forms
 */
function ContactFields({ formData, onChange, errors = {}, disabled = false, phoneRequired = false }) {
  const [touched, setTouched] = useState({});

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const validatePhone = (phone) => {
    if (!phone) return phoneRequired ? 'Phone number is required' : '';
    // UK phone format: optional +44, spaces/hyphens allowed
    const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{6}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, '')) ? '' : 'Please enter a valid UK phone number';
  };

  return (
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name <span className="required" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-input ${errors.name || (touched.name && !formData.name) ? 'form-input-error' : ''}`}
          value={formData.name || ''}
          onChange={onChange}
          onBlur={() => handleBlur('name')}
          required
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          autoComplete="name"
        />
        {errors.name && (
          <span id="name-error" className="form-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address <span className="required" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email || (touched.email && !formData.email) ? 'form-input-error' : ''}`}
          value={formData.email || ''}
          onChange={onChange}
          onBlur={() => handleBlur('email')}
          required
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <span id="email-error" className="form-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number {phoneRequired && <span className="required" aria-label="required">*</span>}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={`form-input ${errors.phone || (touched.phone && validatePhone(formData.phone)) ? 'form-input-error' : ''}`}
          value={formData.phone || ''}
          onChange={onChange}
          onBlur={() => handleBlur('phone')}
          required={phoneRequired}
          disabled={disabled}
          aria-required={phoneRequired}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          autoComplete="tel"
          placeholder="07123 456 789"
        />
        {errors.phone && (
          <span id="phone-error" className="form-error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>
    </div>
  );
}

export default ContactFields;

