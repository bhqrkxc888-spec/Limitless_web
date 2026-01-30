import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';
import { Button } from './ui';
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
  
  // Spam protection: honeypot field (bots fill it, humans don't see it)
  const [honeypot, setHoneypot] = useState('');
  // Spam protection: track when form loaded (submissions too fast = bot)
  const formLoadTime = useRef(Date.now());
  
  // Reset load time when form mounts or resets
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

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
    
    // Spam check 1: Honeypot - if filled, it's a bot
    if (honeypot) {
      logger.info('Spam blocked: honeypot triggered');
      // Show fake success so bot doesn't know it was caught
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    // Spam check 2: Time-based - humans take at least 3 seconds to fill a form
    const timeToFill = Date.now() - formLoadTime.current;
    if (timeToFill < 3000) {
      logger.info('Spam blocked: submitted too fast (' + timeToFill + 'ms)');
      // Show fake success so bot doesn't know it was caught
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    setStatus('submitting');
    setLastSubmitTime(now);

    try {
      const enquiryData = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: formData.context
      };

      // Add offer linking if provided
      if (offerId) {
        enquiryData.offer_id = offerId;
      }
      if (offerTitle) {
        enquiryData.offer_title = offerTitle;
      }

      // Primary: Send to CRM API (this triggers email notification)
      const crmUrl = import.meta.env.VITE_CRM_API_URL || 'https://crm.limitlesscruises.com';
      const webhookSecret = import.meta.env.VITE_WEBSITE_WEBHOOK_SECRET || 'change-me-in-production';
      
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
            body: JSON.stringify(enquiryData)
          }),
          timeoutPromise
        ]);

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const result = await response.json();
        logger.info('Enquiry sent to CRM successfully:', result);

      } catch (err) {
        clearTimeout(timeoutId);
        logger.error('Failed to send enquiry to CRM:', err);
        
        // Fallback: Save to local database if CRM API fails
        try {
          const fallbackData = { ...enquiryData, status: 'new' };
          const { error: dbError } = await supabase
            .from('website_enquiries')
            .insert([fallbackData]);
          
          if (dbError) throw dbError;
          logger.warn('Enquiry saved to local DB as fallback');
        } catch (dbErr) {
          logger.error('Fallback to local DB also failed:', dbErr);
          throw new Error('Failed to submit enquiry. Please try again or call us directly.');
        }
      }
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: offerTitle ? `I'm interested in: ${offerTitle}` : '',
        context: context,
        consent: false
      });
      setHoneypot('');
      formLoadTime.current = Date.now(); // Reset for next submission

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

      {/* Honeypot field - hidden from humans, bots fill it */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">
          Leave this field empty
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

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

