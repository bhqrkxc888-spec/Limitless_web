/**
 * Breadcrumbs Component
 * Provides navigation breadcrumbs for SEO and user experience
 * 
 * @param {Array} items - Array of { label, path } objects
 */

import { Link } from 'react-router-dom';
import './Breadcrumbs.css';
import { safeStringify } from '../utils/safeStringify';

function Breadcrumbs({ items = [] }) {
  // Don't render if no items or only one item (homepage)
  if (!items || items.length <= 1) {
    return null;
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `https://limitlesscruises.com${item.path}` : undefined
    }))
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="breadcrumbs-item">
                {isLast ? (
                  <span className="breadcrumbs-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="breadcrumbs-link">
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json">
        {safeStringify(structuredData)}
      </script>
    </>
  );
}

export default Breadcrumbs;

