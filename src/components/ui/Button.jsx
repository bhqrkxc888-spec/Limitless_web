import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Button Component
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {string} props.href - External link
 * @param {string} props.to - Internal route (React Router)
 * @param {boolean} props.fullWidth - Full width button
 * @param {React.ReactNode} props.children
 */
function Button({
  variant = 'primary',
  size = 'md',
  href,
  to,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    className
  ].filter(Boolean).join(' ');

  // External link
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  // Internal React Router link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;

