import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ConsentBanner.css';

function ConsentBanner({ onAccept }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate consent
    if (!formData.consent) {
      newErrors.consent = 'Please accept the data processing consent';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Pass contact details to parent
    onAccept({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      consent: true,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/checking
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange(name, checked);
  };

  return (
    <div className="consent-banner">
      <div className="consent-content">
        <h2>Chat with Captain Cruise</h2>
        
        <div className="consent-info">
          <p>This ensures we can send you accurate quotes and follow up on your enquiry.</p>
        </div>

        <form onSubmit={handleSubmit} className="consent-form">
          <div className="form-group">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="consent-disclaimer">
            <p>
              <strong>Note:</strong> Captain Cruise provides general travel advice. 
              Final prices and availability confirmed by your consultant.
            </p>
          </div>

          {/* GDPR Consent Checkbox */}
          <div className="form-consent">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="consent"
                className="form-checkbox"
                checked={formData.consent}
                onChange={handleCheckboxChange}
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
              <span>
                I consent to my data being stored and processed to respond to my enquiry. 
                See our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> for details. <span className="required">*</span>
              </span>
            </label>
            {errors.consent && (
              <span id="consent-error" className="error-message" role="alert">
                {errors.consent}
              </span>
            )}
          </div>

          <div className="consent-buttons">
            <button type="submit" className="btn-accept">
              Start Chat
            </button>
            <button type="button" onClick={() => navigate('/concierge')} className="btn-form">
              Use Form Instead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConsentBanner;

