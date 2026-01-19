import { useState, useRef, useCallback } from 'react';
import { getOptimizedImageUrl, generateSrcSet, isSupabaseUrl } from '../utils/imageHelpers';
import { isVercelBlobUrl } from '../lib/vercelBlob';
import { resolveImageSrc } from '../utils/imageResolver';
import { SITE_ASSETS } from '../config/assetUrls';
import './OptimizedImage.css';

const LOGO_URL = SITE_ASSETS.logo;

/**
 * OptimizedImage Component
 * Automatically optimizes images from Vercel Blob or Supabase Storage.
 * "Image Coming Soon" is shown only when there is no image (invalid/empty src or load error).
 * Never shown while loading or when a valid image is available.
 * 
 * Features:
 * - Vercel Blob: Automatic WebP conversion via Vercel CDN
 * - Supabase Storage: Manual transforms for CMS content
 * - Responsive srcset generation
 * - Proper loading/priority attributes for LCP optimization
 * - Maintains aspect ratio
 * - "Image Coming Soon" only when there is no image
 * - CSS-only fade-in (bypasses React render cycle for zero flash)
 */
function OptimizedImage({
  src,
  alt,
  width: _width,
  height: _height,
  priority = false,
  className = '',
  sizes = '100vw',
  srcsetWidths = [400, 600],
  quality = 85,
  objectFit = 'cover',
  style = {},
  showComingSoon: _showComingSoon = true,
  entityType = 'unknown',
  entityId = 'unknown',
  imageType = 'unknown',
  ...props
}) {
  // width/height accepted but ignored - parent controls size via container; avoids stretching small images
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Callback ref - if image is already cached, add 'loaded' class immediately
  const setImgRef = useCallback((node) => {
    if (node) {
      if (node.complete && node.naturalHeight !== 0) {
        node.classList.add('loaded', 'no-transition');
      }
      imgRef.current = node;
    }
  }, []);

  const handleLoad = (e) => {
    e.target.classList.add('loaded');
  };

  // Resolve image source; empty/invalid -> '' so we know there is no image
  const resolvedSrc = resolveImageSrc(src, {
    entityType,
    entityId,
    imageType,
    fallback: '',
    silent: true
  });

  // On load error: there is no working image -> "Image Coming Soon" on next render
  const handleError = () => {
    if (!hasError) setHasError(true);
  };

  // "Image Coming Soon" only when there is no image: invalid/empty src or load failed
  if (hasError || !resolvedSrc || resolvedSrc === 'null' || resolvedSrc === 'undefined') {
    return (
      <div
        className={`optimized-image-placeholder ${className}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#2C344C',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '32px',
          ...style
        }}
        {...props}
      >
        <img
          src={LOGO_URL}
          alt="Limitless Cruises"
          style={{
            width: 'auto',
            height: 'min(80px, 30%)',
            opacity: 0.6,
            objectFit: 'contain'
          }}
          loading="lazy"
        />
        <div style={{
          color: '#B9953C',
          fontSize: '16px',
          fontWeight: '500',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Image Coming Soon
        </div>
        <div style={{
          color: '#8892a8',
          fontSize: '12px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          High-quality imagery will be added shortly
        </div>
      </div>
    );
  }

  const isVercelBlob = isVercelBlobUrl(resolvedSrc);
  const isSupabase = isSupabaseUrl(resolvedSrc);
  // Use max of srcsetWidths for main src; don't request larger than needed (avoids stretching small images)
  const maxWidth = srcsetWidths.length > 0 ? Math.max(...srcsetWidths) : 600;
  
  const optimizedSrc = (isVercelBlob || isSupabase)
    ? getOptimizedImageUrl(resolvedSrc, { width: maxWidth, quality })
    : resolvedSrc;
  
  const srcSet = isSupabase && srcsetWidths.length > 0
    ? generateSrcSet(resolvedSrc, srcsetWidths, { quality })
    : undefined;

  // Generate alt text from src if not provided
  const generateAltFromSrc = (imageSrc) => {
    if (!imageSrc) return 'Image';
    try {
      const url = new URL(imageSrc);
      const filename = url.pathname.split('/').pop() || '';
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      return nameWithoutExt.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim() || 'Image';
    } catch {
      const match = imageSrc.match(/\/([^/]+)\.(webp|jpg|jpeg|png|gif|svg)/i);
      return match ? match[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Image';
    }
  };

  const finalAlt = alt && alt.trim() !== '' ? alt.trim() : generateAltFromSrc(resolvedSrc);

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      <img
        ref={setImgRef}
        className="optimized-image"
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={finalAlt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={{ width: '100%', height: '100%', objectFit, objectPosition: 'center' }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;
