/**
 * Legal Page Template Component
 * 
 * Simple template for rendering legal documents (hardcoded content)
 * Includes structured data for WebPage and BreadcrumbList schemas
 */

import { useLocation } from 'react-router-dom';
import SEO, { getBreadcrumbSchema } from './SEO';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import './LegalPageTemplate.css';

function LegalPageTemplate({ fallbackTitle, fallbackDescription, fallbackContent }) {
  const location = useLocation();
  
  // Get canonical URL
  const canonicalUrl = `https://www.limitlesscruises.com${location.pathname}`;

  // Breadcrumb schema for legal pages
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.limitlesscruises.com/' },
    { name: fallbackTitle, url: canonicalUrl }
  ]);

  // WebPage schema for legal documents
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fallbackTitle,
    description: fallbackDescription,
    url: canonicalUrl,
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Limitless Cruises',
      url: 'https://www.limitlesscruises.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Limitless Cruises',
      url: 'https://www.limitlesscruises.com'
    }
  };

  return (
    <main className="legal-page">
      <SEO
        title={fallbackTitle}
        description={fallbackDescription}
        canonical={canonicalUrl}
        noindex={false}
        structuredData={[webPageSchema, breadcrumbSchema]}
      />

      <div className="legal-header">
        <div className="container">
          <h1>{fallbackTitle}</h1>
        </div>
      </div>

      <div className="container">
        <article 
          className="legal-content"
          dangerouslySetInnerHTML={createSanitizedMarkup(fallbackContent)}
        />
      </div>
    </main>
  );
}

export default LegalPageTemplate;

