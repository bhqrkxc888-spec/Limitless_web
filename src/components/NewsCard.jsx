import { Link } from 'react-router-dom';
import { Card } from './ui';
import OptimizedImage from './OptimizedImage';
import './NewsCard.css';

/**
 * NewsCard Component
 * Displays a single travel news article in card format
 * @param {Object} props
 * @param {Object} props.article - News article object
 * @param {string} props.variant - 'default' | 'featured' | 'compact' | 'horizontal' | 'hero'
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

  // Hero variant - Full-width horizontal layout for featured article
  if (variant === 'hero') {
    return (
      <Link to={`/travel-news/${article.slug}`} className="news-card-hero">
        <div className="news-card-hero__image">
          {(article.featured_image_url || article.thumbnail_image_url) ? (
            <OptimizedImage 
              src={article.featured_image_url || article.thumbnail_image_url}
              alt={article.title}
              width={article.featured_image_width || article.thumbnail_image_width || 800}
              height={article.featured_image_height || article.thumbnail_image_height || 450}
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="news-card-hero__placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="news-card-hero__content">
          <div className="news-card-hero__meta-top">
            {article.category && (
              <span className="news-card-hero__category">
                {formatCategory(article.category)}
              </span>
            )}
            {article.published_at && (
              <span className="news-card-hero__date">
                {formatDate(article.published_at)}
              </span>
            )}
          </div>
          <h2 className="news-card-hero__title">{article.title}</h2>
          {article.excerpt && (
            <p className="news-card-hero__excerpt">{article.excerpt}</p>
          )}
          {article.tags && article.tags.length > 0 && (
            <div className="news-card-hero__tags">
              {article.tags.slice(0, 4).map((tag, index) => (
                <span key={index} className="news-card-hero__tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="news-card-hero__cta">
            <span>Read Full Article</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  // Horizontal variant - Image left, content right
  if (variant === 'horizontal') {
    return (
      <Link to={`/travel-news/${article.slug}`} className="news-card-horizontal">
        <div className="news-card-horizontal__image">
          {(article.featured_image_url || article.thumbnail_image_url) ? (
            <OptimizedImage
              src={article.featured_image_url || article.thumbnail_image_url}
              alt={article.title}
              width={article.featured_image_width || article.thumbnail_image_width || 600}
              height={article.featured_image_height || article.thumbnail_image_height || 400}
              priority={false}
              sizes="(max-width: 768px) 100vw, 400px"
              srcsetWidths={[400, 600, 800]}
              quality={85}
              objectFit="cover"
            />
          ) : (
            <div className="news-card-horizontal__placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="news-card-horizontal__content">
          <div className="news-card-horizontal__meta-top">
            {article.category && (
              <span className="news-card-horizontal__category">
                {formatCategory(article.category)}
              </span>
            )}
          </div>
          <h3 className="news-card-horizontal__title">{article.title}</h3>
          {article.excerpt && (
            <p className="news-card-horizontal__excerpt">{article.excerpt}</p>
          )}
          <div className="news-card-horizontal__meta-bottom">
            {article.published_at && (
              <span className="news-card-horizontal__date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatDate(article.published_at)}
              </span>
            )}
            <span className="news-card-horizontal__cta">
              Read More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default Card variant (and compact, featured)
  return (
    <Card
      to={`/travel-news/${article.slug}`}
      variant="default"
      className={`news-card news-card--${variant}`}
    >
      {(article.featured_image_url || article.thumbnail_image_url) && (
        <Card.Image
          src={article.featured_image_url || article.thumbnail_image_url}
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

