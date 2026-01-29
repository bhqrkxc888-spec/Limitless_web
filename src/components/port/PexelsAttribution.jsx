/**
 * Pexels Attribution Component
 * 
 * Displays photographer attribution for Pexels-sourced images.
 * Required by Pexels API terms of service.
 * 
 * Usage:
 * <PexelsAttribution images={pexelsImages} />
 * 
 * or for a single image:
 * <PexelsAttribution 
 *   photographerName="John Smith" 
 *   photographerUrl="https://pexels.com/@johnsmith" 
 * />
 */

import './PexelsAttribution.css';

function PexelsAttribution({ 
  images = [], 
  photographerName = null, 
  photographerUrl = null,
  compact = false,
  className = ''
}) {
  // Single photographer mode
  if (photographerName) {
    return (
      <div className={`pexels-attribution ${compact ? 'compact' : ''} ${className}`}>
        <span className="attribution-text">
          Photo by{' '}
          {photographerUrl ? (
            <a 
              href={photographerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="photographer-link"
            >
              {photographerName}
            </a>
          ) : (
            <span className="photographer-name">{photographerName}</span>
          )}
          {' '}on{' '}
          <a 
            href="https://www.pexels.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pexels-link"
          >
            Pexels
          </a>
        </span>
      </div>
    );
  }

  // Multiple images mode - show unique photographers
  const pexelsImages = images.filter(img => img.source === 'pexels' && img.photographerName);
  
  if (pexelsImages.length === 0) {
    return null;
  }

  // Get unique photographers
  const uniquePhotographers = [];
  const seen = new Set();
  
  for (const img of pexelsImages) {
    const key = img.photographerUrl || img.photographerName;
    if (!seen.has(key)) {
      seen.add(key);
      uniquePhotographers.push({
        name: img.photographerName,
        url: img.photographerUrl
      });
    }
  }

  if (uniquePhotographers.length === 0) {
    return null;
  }

  return (
    <div className={`pexels-attribution ${compact ? 'compact' : ''} ${className}`}>
      <span className="attribution-text">
        {uniquePhotographers.length === 1 ? 'Photo by ' : 'Photos by '}
        {uniquePhotographers.map((photographer, index) => (
          <span key={photographer.url || photographer.name}>
            {index > 0 && index === uniquePhotographers.length - 1 && ' and '}
            {index > 0 && index < uniquePhotographers.length - 1 && ', '}
            {photographer.url ? (
              <a 
                href={photographer.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="photographer-link"
              >
                {photographer.name}
              </a>
            ) : (
              <span className="photographer-name">{photographer.name}</span>
            )}
          </span>
        ))}
        {' '}on{' '}
        <a 
          href="https://www.pexels.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pexels-link"
        >
          Pexels
        </a>
      </span>
    </div>
  );
}

export default PexelsAttribution;
