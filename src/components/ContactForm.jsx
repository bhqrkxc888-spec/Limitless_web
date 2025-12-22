import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';
import { Button } from './ui';
// import Turnstile from './Turnstile'; // Disabled temporarily
import './ContactForm.css';

function ContactForm({ context = 'general', offerId = null, offerTitle = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: offerTitle ? `I'm interested in: ${offerTitle}` : '',
    context: context,
    consent: false
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  // const [turnstileToken, setTurnstileToken] = useState(null); // Disabled temporarily
  
  // Check if Turnstile is configured
  // const isTurnstileEnabled = !!import.meta.env.VITE_TURNSTILE_SITE_KEY; // Disabled temporarily
  
  // Turnstile callbacks - Disabled temporarily
  // const handleTurnstileVerify = useCallback((token) => {
  //   setTurnstileToken(token);
  // }, []);
  
  // const handleTurnstileError = useCallback(() => {
  //   logger.warn('Turnstile verification failed');
  //   setTurnstileToken(null);
  // }, []);
  
  // const handleTurnstileExpire = useCallback(() => {
  //   setTurnstileToken(null);
  // }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting: prevent submissions within 3 seconds of last submission
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < 3000) {
      logger.warn('Form submission rate limited');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    // Check consent
    if (!formData.consent) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    // Check if Supabase is configured
    if (!supabase) {
      logger.warn('Supabase not configured - form cannot be submitted');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    // Check Turnstile verification (if enabled and no token yet) - Disabled temporarily
    // if (isTurnstileEnabled && !turnstileToken) {
    //   logger.warn('Turnstile token not received - waiting for verification');
    //   setStatus('error');
    //   setTimeout(() => setStatus('idle'), 5000);
    //   return;
    // }
    
    setStatus('submitting');
    setLastSubmitTime(now);

    try {
      const enquiryData = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: formData.context,
        status: 'new',
        // Include Turnstile token for server-side verification if needed - Disabled temporarily
        // turnstile_token: turnstileToken || null
      };

      // Add offer linking if provided
      if (offerId) {
        enquiryData.offer_id = offerId;
      }
      if (offerTitle) {
        enquiryData.offer_title = offerTitle;
      }

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const { error } = await Promise.race([
        supabase.from('website_enquiries').insert([enquiryData]),
        timeoutPromise
      ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: offerTitle ? `I'm interested in: ${offerTitle}` : '',
        context: context,
        consent: false
      });
      // Reset Turnstile token for next submission - Disabled temporarily
      // setTurnstileToken(null);

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      logger.error('Form submission error:', error);
      setStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={status === 'error' && !formData.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={status === 'error' && !formData.email}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === 'submitting'}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Your Message <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          placeholder="Tell us about your ideal cruise..."
          aria-required="true"
          aria-invalid={status === 'error' && !formData.message}
        />
      </div>

      {status === 'success' && (
        <div 
          className="form-message form-message-success" 
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Thank you! We'll be in touch soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div 
          className="form-message form-message-error" 
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>
            {!formData.consent 
              ? 'Please accept the data processing consent to submit your enquiry.'
              : 'Something went wrong. Please try again or call us.'}
          </span>
        </div>
      )}

      <div className="form-consent">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="form-checkbox"
            aria-required="true"
          />
          <span>
            I consent to my data being stored and processed to respond to my enquiry. 
            See our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> for details.
          </span>
        </label>
      </div>

      {/* Invisible CAPTCHA - Cloudflare Turnstile - Disabled temporarily */}
      {/* <Turnstile
        onVerify={handleTurnstileVerify}
        onError={handleTurnstileError}
        onExpire={handleTurnstileExpire}
        action={`contact_${context}`}
        mode="invisible"
      /> */}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting' || !formData.consent}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
      </Button>

      <p className="form-note">
        We typically respond within 24 hours. For urgent enquiries, please call us.
      </p>
    </form>
  );
}

export default ContactForm;

