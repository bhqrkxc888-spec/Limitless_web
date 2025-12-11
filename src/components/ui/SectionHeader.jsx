import './SectionHeader.css';

/**
 * SectionHeader Component
 * Consistent section titles with optional subtitle and centered/left alignment
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.eyebrow - Optional small text above title
 * @param {string} props.align - 'left' | 'center'
 * @param {boolean} props.dark - For use on dark backgrounds
 */
function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  dark = false,
  className = '',
  children
}) {
  const classes = [
    'section-header',
    `section-header-${align}`,
    dark && 'section-header-dark',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      {eyebrow && (
        <span className="section-header-eyebrow">{eyebrow}</span>
      )}
      <h2 className="section-header-title">{title}</h2>
      {subtitle && (
        <p className="section-header-subtitle">{subtitle}</p>
      )}
      {children}
    </header>
  );
}

export default SectionHeader;

