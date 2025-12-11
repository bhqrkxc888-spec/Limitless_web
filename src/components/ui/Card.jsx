import { Link } from 'react-router-dom';
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
 */
function CardImage({ src, alt, aspectRatio = '16/9', className = '' }) {
  return (
    <div 
      className={`card-image ${className}`}
      style={{ aspectRatio }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
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
function CardTitle({ as: Tag = 'h3', className = '', children }) {
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

