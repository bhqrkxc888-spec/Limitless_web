import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui';
import './ContactForm.css';

function ContactForm({ context = 'general' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    context: context
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { data, error } = await supabase
        .from('website_enquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: formData.context,
          status: 'new'
        }]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        context: context
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
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
        />
      </div>

      {status === 'success' && (
        <div className="form-message form-message-success">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Thank you! We'll be in touch soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="form-message form-message-error">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>Something went wrong. Please try again or call us.</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
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

