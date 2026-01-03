import { useEffect } from 'react';
import OfferEnquiryForm from './OfferEnquiryForm';
import './EnquiryForms.css';

/**
 * OfferEnquiryModal - Modal wrapper for Offer Enquiry Form
 * Can be triggered from CTAs on offer pages
 */
function OfferEnquiryModal({ 
  isOpen, 
  onClose, 
  offer
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSuccess = () => {
    // Auto-close modal after 3 seconds on success
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div 
      className="enquiry-modal-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-enquiry-modal-title"
    >
      <div className="enquiry-modal">
        <button
          className="enquiry-modal-close"
          onClick={onClose}
          aria-label="Close enquiry form"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <OfferEnquiryForm
          offer={offer}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default OfferEnquiryModal;

