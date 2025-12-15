import { Card } from './ui';
import './NewsCard.css';

/**
 * NewsCard Component
 * Displays a single travel news article in card format
 * @param {Object} props
 * @param {Object} props.article - News article object
 * @param {string} props.variant - 'default' | 'featured' | 'compact'
 */
function NewsCard({ article, variant = 'default' }) {
  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card
      to={`/travel-news/${article.slug}`}
      variant="default"
      className={`news-card news-card--${variant}`}
    >
      {article.thumbnail_image_url && (
        <Card.Image
          src={article.thumbnail_image_url}
          alt={article.title}
          aspectRatio="16/10"
        />
      )}
      
      <Card.Content>
        {/* Category Badge */}
        {article.category && (
          <span className="news-category-badge">
            {formatCategory(article.category)}
          </span>
        )}

        {/* Featured Badge */}
        {article.featured && variant !== 'featured' && (
          <span className="news-featured-badge">
            Featured
          </span>
        )}

        <Card.Title as="h3">{article.title}</Card.Title>
        
        {article.excerpt && (
          <Card.Description>{article.excerpt}</Card.Description>
        )}

        {/* Meta Information */}
        <div className="news-meta">
          {article.published_at && (
            <div className="news-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{formatDate(article.published_at)}</span>
            </div>
          )}

          {article.view_count !== undefined && article.view_count > 0 && (
            <div className="news-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{article.view_count} views</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && variant !== 'compact' && (
          <div className="news-tags">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="news-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="news-card-cta">
          <span className="news-card-cta-text">Read Article</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </Card.Content>
    </Card>
  );
}

export default NewsCard;

