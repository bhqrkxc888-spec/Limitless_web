import { Link } from 'react-router-dom';
import './GuideCard.css';

function GuideCard({ guide }) {
  const imageUrl = guide.thumbnail_image_url || guide.featured_image_url;
  const imageWidth = guide.thumbnail_image_width || guide.featured_image_width || 400;
  const imageHeight = guide.thumbnail_image_height || guide.featured_image_height || 300;

  return (
    <Link to={`/cruise-guides/${guide.slug}`} className="guide-card">
      {imageUrl && (
        <div className="guide-card__image">
          <img
            src={imageUrl}
            alt={guide.title}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
          />
        </div>
      )}
      <div className="guide-card__content">
        {guide.guide_type && (
          <span className="guide-card__type">
            {guide.guide_type.replace('_', ' ')}
          </span>
        )}
        <h3 className="guide-card__title">{guide.title}</h3>
        {guide.excerpt && (
          <p className="guide-card__excerpt">{guide.excerpt}</p>
        )}
        <div className="guide-card__footer">
          <span className="guide-card__link">Read Guide →</span>
        </div>
      </div>
    </Link>
  );
}

export default GuideCard;

