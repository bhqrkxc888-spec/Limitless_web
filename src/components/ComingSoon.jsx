import { Link } from 'react-router-dom';
import SEO from './SEO';
import { Button } from './ui';
import './ComingSoon.css';

/**
 * ComingSoon Component
 * 
 * Displays a "coming soon" message for draft/unpublished content.
 * Automatically sets noindex meta tag via SEO component.
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (e.g., "Destinations")
 * @param {string} props.section - Section name for messaging
 * @param {string} props.backLink - Link to return to (default: '/')
 * @param {string} props.backLabel - Label for back link (default: 'Return Home')
 */
function ComingSoon({ 
  title = 'Coming Soon',
  section = 'this section',
  backLink = '/',
  backLabel = 'Return Home'
}) {
  return (
    <main className="coming-soon-page">
      {/* SEO - noindex for draft content */}
      <SEO
        title={title}
        description={`${section} is currently under development and will be available soon.`}
        noindex={true}
      />
      
      <div className="container">
        <div className="coming-soon-content">
          {/* Icon */}
          <div className="coming-soon-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          
          {/* Heading */}
          <h1>Coming Soon</h1>
          
          {/* Message */}
          <p className="coming-soon-message">
            {section} is currently under development. 
            We're working hard to bring you an exceptional experience.
          </p>
          
          <p className="coming-soon-submessage">
            In the meantime, you can explore our cruise finder, get in touch with us, 
            or learn more about what we offer.
          </p>
          
          {/* CTAs */}
          <div className="coming-soon-cta">
            <Button to="/find-a-cruise" variant="primary" size="lg">
              Find a Cruise
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
            <Button to={backLink} variant="secondary" size="lg">
              {backLabel}
            </Button>
          </div>
          
          {/* Additional info */}
          <div className="coming-soon-info">
            <p>
              Want to be notified when we launch? 
              <Link to="/contact"> Get in touch</Link> and we'll keep you updated.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ComingSoon;

