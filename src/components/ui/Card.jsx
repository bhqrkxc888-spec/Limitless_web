import { Link } from 'react-router-dom';
import { logger } from '../../utils/logger';
import OptimizedImage from '../OptimizedImage';
import './Card.css';

/**
 * Card Component
 * @param {Object} props
 * @param {string} props.variant - 'default' | 'elevated' | 'outlined' | 'interactive'
 * @param {string} props.to - Internal route (makes card clickable)
 * @param {string} props.href - External link (makes card clickable)
 * @param {React.ReactNode} props.children
 */
function Card({
  variant = 'default',
  to,
  href,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'card',
    `card-${variant}`,
    (to || href) && 'card-clickable',
    className
  ].filter(Boolean).join(' ');

  // Internal React Router link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  // Regular card
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Image Component
 * Uses OptimizedImage for automatic Supabase transforms
 */
function CardImage({ 
  src, 
  alt = '', 
  aspectRatio = '16/9', 
  className = '', 
  priority = false, 
  objectFit,
  // Entity metadata for image debugging/tracing
  entityType,
  entityId,
  imageType
}) {
  // Ensure alt text is provided for accessibility
  if (src && !alt) {
    logger.warn('Card.Image: alt text is recommended for accessibility');
  }
  
  // Handle 'auto' aspect ratio (no forced ratio)
  const isAutoRatio = aspectRatio === 'auto';
  
  // For auto aspect ratio, default to no cropping (contain or undefined to let image determine)
  // For fixed aspect ratio, default to cover to fill the container
  const defaultObjectFit = isAutoRatio ? undefined : (objectFit || 'cover');
  
  // Calculate dimensions from aspect ratio for image optimization
  let calculatedHeight = 450; // default
  if (!isAutoRatio) {
    const [widthRatio, heightRatio] = aspectRatio.split('/').map(Number);
    const baseWidth = 800;
    calculatedHeight = Math.round((baseWidth * heightRatio) / widthRatio);
  }
  
  const containerStyle = isAutoRatio ? {} : { aspectRatio };
  
  return (
    <div 
      className={`card-image ${className} ${isAutoRatio ? 'card-image--auto' : ''}`}
      style={containerStyle}
    >
      {src ? (
        <OptimizedImage
          src={src}
          alt={alt || 'Card image'}
          width={800}
          height={calculatedHeight}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          srcsetWidths={[400, 600, 800]}
          quality={85}
          objectFit={defaultObjectFit}
          entityType={entityType}
          entityId={entityId}
          imageType={imageType}
        />
      ) : (
        <div className="card-image-placeholder">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * Card Content Component
 */
function CardContent({ className = '', children }) {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Title Component
 */
function CardTitle({ as = 'h3', className = '', children }) {
  const Tag = as;
  return (
    <Tag className={`card-title ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Card Description Component
 */
function CardDescription({ className = '', children }) {
  return (
    <p className={`card-description ${className}`}>
      {children}
    </p>
  );
}

/**
 * Card Footer Component
 */
function CardFooter({ className = '', children }) {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
}

// Export all components
Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Footer = CardFooter;

export default Card;

