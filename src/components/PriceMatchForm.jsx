import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, uploadDocument } from '../lib/supabase';
import { logger } from '../utils/logger';
import { Button } from './ui';
import { STORAGE_BUCKETS, PRICE_MATCH_UPLOAD_CONSTRAINTS } from '../config/supabaseConfig';
import './PriceMatchForm.css';

function PriceMatchForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bookingReference: '',
    competitorName: '',
    competitorABTA: '',
    competitorContact: '',
    quoteDetails: '',
    consent: false
  });
  
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError('');
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > PRICE_MATCH_UPLOAD_CONSTRAINTS.MAX_FILE_SIZE) {
      setFileError(`File size must be less than ${PRICE_MATCH_UPLOAD_CONSTRAINTS.MAX_FILE_SIZE / (1024 * 1024)}MB`);
      setFile(null);
      return;
    }

    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    if (!PRICE_MATCH_UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setFileError('Please upload a PDF, JPG, PNG, or WebP file');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check consent
    if (!formData.consent) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    // Check file
    if (!file) {
      setFileError('Please upload the competitor quote document');
      return;
    }
    
    // Check if Supabase is configured
    if (!supabase) {
      logger.warn('Supabase not configured - form cannot be submitted');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    setStatus('submitting');
    setFileError('');

    try {
      // Upload file to Supabase Storage
      const timestamp = Date.now();
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const fileName = `price-match-${timestamp}${fileExtension}`;
      const filePath = `${new Date().toISOString().split('T')[0]}/${fileName}`;

      const { error: uploadError } = await uploadDocument(
        file,
        STORAGE_BUCKETS.PRICE_MATCH_DOCS,
        filePath
      );

      if (uploadError) throw uploadError;

      // Build message with all details (file path stored for CRM to access via signed URL)
      const message = `PRICE MATCH REQUEST

Booking Reference: ${formData.bookingReference || 'N/A'}

Competitor Details:
- Travel Agent: ${formData.competitorName}
- ABTA Number: ${formData.competitorABTA}
- Contact: ${formData.competitorContact || 'Not provided'}

Quote Details:
${formData.quoteDetails}

---
Attachment: ${STORAGE_BUCKETS.PRICE_MATCH_DOCS}/${filePath}`;

      const enquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: message,
        source: 'price-match',
        status: 'new'
      };

      const { error } = await supabase
        .from('website_enquiries')
        .insert([enquiryData]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        bookingReference: '',
        competitorName: '',
        competitorABTA: '',
        competitorContact: '',
        quoteDetails: '',
        consent: false
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Reset success message after 8 seconds
      setTimeout(() => setStatus('idle'), 8000);

    } catch (error) {
      logger.error('Price match form submission error:', error);
      setStatus('error');
      setFileError('Failed to submit request. Please try again or call us.');
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form className="price-match-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="pm-name" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="pm-name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pm-email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="pm-email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pm-phone" className="form-label">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="pm-phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            autoComplete="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pm-bookingReference" className="form-label">
            Your Booking Reference (if applicable)
          </label>
          <input
            type="text"
            id="pm-bookingReference"
            name="bookingReference"
            className="form-input"
            value={formData.bookingReference}
            onChange={handleChange}
            disabled={status === 'submitting'}
            placeholder="If you've already booked with us"
          />
        </div>
      </div>

      <div className="form-section-divider">
        <h3>Competitor Quote Details</h3>
      </div>

      <div className="form-grid form-grid-thirds">
        <div className="form-group">
          <label htmlFor="pm-competitorName" className="form-label">
            Competitor Travel Agent <span className="required">*</span>
          </label>
          <input
            type="text"
            id="pm-competitorName"
            name="competitorName"
            className="form-input"
            value={formData.competitorName}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            placeholder="Name of the travel agent"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pm-competitorABTA" className="form-label">
            ABTA Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="pm-competitorABTA"
            name="competitorABTA"
            className="form-input"
            value={formData.competitorABTA}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            placeholder="e.g., ABTA12345"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pm-competitorContact" className="form-label">
            Contact Details
          </label>
          <input
            type="text"
            id="pm-competitorContact"
            name="competitorContact"
            className="form-input"
            value={formData.competitorContact}
            onChange={handleChange}
            disabled={status === 'submitting'}
            placeholder="Email or phone"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pm-quoteDetails" className="form-label">
          Quote Details <span className="required">*</span>
        </label>
        <textarea
          id="pm-quoteDetails"
          name="quoteDetails"
          className="form-textarea"
          rows="4"
          value={formData.quoteDetails}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          placeholder="Please include: cruise line, ship name, sailing date, cabin category, total price, and any other relevant details..."
          aria-required="true"
        />
      </div>

      <div className="form-group">
        <label htmlFor="pm-quoteDocument" className="form-label">
          Upload Competitor Quote <span className="required">*</span>
        </label>
        <div className="file-upload-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            id="pm-quoteDocument"
            name="quoteDocument"
            className="form-file-input"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            disabled={status === 'submitting'}
            aria-required="true"
          />
          <div className="file-upload-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17,8 12,3 7,8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span>{file ? file.name : 'Click to select or drag and drop'}</span>
          </div>
        </div>
        <p className="form-help-text">
          Accepted formats: PDF, JPG, PNG, WebP (max 10MB)
        </p>
        {file && (
          <div className="file-preview">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span className="file-name">{file.name}</span>
            <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button 
              type="button" 
              className="file-remove" 
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        )}
        {fileError && (
          <div className="form-error-text" role="alert">
            {fileError}
          </div>
        )}
        <div className="form-privacy-note">
          <strong>Privacy Note:</strong> Your document will be securely stored and only accessible 
          to our team. Please redact any sensitive personal data (such as passport numbers, 
          full addresses, or payment details) before uploading. Include the customer name 
          from the quote for reference purposes.
        </div>
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
          <span>Thank you! We've received your price match request and will respond within 24 working hours.</span>
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
              ? 'Please accept the data processing consent to submit your request.'
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
            I consent to my data being stored and processed to respond to my price match request. 
            See our <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> for details.
          </span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting' || !formData.consent || !file}
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Price Match Request'}
      </Button>

      <p className="form-note">
        We aim to respond to all price match requests within <strong>24 working hours</strong>. 
        We may contact the competitor directly to verify the quote.
      </p>
    </form>
  );
}

export default PriceMatchForm;

