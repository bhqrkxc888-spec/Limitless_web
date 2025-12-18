import { Link } from 'react-router-dom';
import { Card } from './ui';
import './RelatedLinks.css';

/**
 * RelatedLinks Component
 * Displays related content links for SEO internal linking
 * Used on cruise line, destination, and cruise type pages
 */
function RelatedLinks({ title, subtitle, links, columns = 3 }) {
  if (!links || links.length === 0) return null;

  const gridClass = `related-links-grid related-links-grid--${columns}`;

  return (
    <section className="related-links-section">
      <div className="related-links-header">
        {title && <h2 className="related-links-title">{title}</h2>}
        {subtitle && <p className="related-links-subtitle">{subtitle}</p>}
      </div>
      
      <div className={gridClass}>
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="related-link-card">
            <Card>
              <Card.Content>
                {link.icon && <span className="related-link-icon">{link.icon}</span>}
                <h3 className="related-link-title">{link.title}</h3>
                {link.description && (
                  <p className="related-link-description">{link.description}</p>
                )}
                <span className="related-link-arrow">→</span>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedLinks;

