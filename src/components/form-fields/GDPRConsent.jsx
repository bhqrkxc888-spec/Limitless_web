import { Link } from 'react-router-dom';
import './FormFields.css';

/**
 * GDPRConsent - Reusable GDPR consent checkbox (required)
 * Used across all enquiry forms
 */
function GDPRConsent({ formData, onChange, disabled = false, error = null }) {
  return (
    <div className="form-consent">
      <label className="form-checkbox-label">
        <input
          type="checkbox"
          name="consent"
          className="form-checkbox"
          checked={formData.consent || false}
          onChange={onChange}
          required
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'consent-error' : undefined}
        />
        <span>
          I consent to my data being stored and processed to respond to my enquiry. 
          See our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> for details. <span className="required" aria-label="required">*</span>
        </span>
      </label>
      {error && (
        <span id="consent-error" className="form-error" role="alert" style={{ marginTop: '0.5rem', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default GDPRConsent;

