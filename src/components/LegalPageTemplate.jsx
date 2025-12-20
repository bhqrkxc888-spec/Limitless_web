/**
 * Legal Page Template Component
 * 
 * Simple template for rendering legal documents (hardcoded content)
 */

import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import './LegalPageTemplate.css';

function LegalPageTemplate({ fallbackTitle, fallbackDescription, fallbackContent }) {
  const location = useLocation();
  
  // Get canonical URL
  const canonicalUrl = `https://www.limitlesscruises.com${location.pathname}`;

  return (
    <main className="legal-page">
      <SEO
        title={fallbackTitle}
        description={fallbackDescription}
        canonical={canonicalUrl}
        noindex={false}
      />

      <div className="legal-header">
        <div className="container">
          <h1>{fallbackTitle}</h1>
        </div>
      </div>

      <div className="container">
        <article 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: fallbackContent }}
        />
      </div>
    </main>
  );
}

export default LegalPageTemplate;

