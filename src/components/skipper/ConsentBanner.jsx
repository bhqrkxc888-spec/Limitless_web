import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsentBanner.css';

function ConsentBanner({ onAccept }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Pass contact details to parent
    onAccept({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="consent-banner">
      <div className="consent-content">
        <h2>Chat with Captain Cruise</h2>
        
        <div className="consent-info">
          <p><strong>To get started, we need your contact details:</strong></p>
          <p className="consent-info-text">
            This ensures we can send you accurate quotes and follow up on your enquiry. 
            Your information is handled securely and in compliance with GDPR.
          </p>
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

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="optional">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="07700 900123"
            />
            <small className="help-text">For WhatsApp updates (optional)</small>
          </div>

          <div className="consent-disclaimer">
            <p><small>
              <strong>Note:</strong> Captain Cruise provides general travel advice. 
              Final prices, availability, and arrangements confirmed by our consultants. 
              Conversations are not saved after enquiry submission.
            </small></p>
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

