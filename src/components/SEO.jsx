import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { analyzePageSEO } from '../services/seoMonitoring';

/**
 * SEO Component
 * Updates document title and meta tags dynamically
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.type - Open Graph type (default: 'website')
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.author - Page author (default: 'Limitless Cruises')
 * @param {string} props.robots - Robots meta (default: 'index, follow')
 * @param {boolean} props.noindex - Set to true to add 'noindex' to robots meta
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
function SEO({
  title,
  description,
  canonical,
  keywords,
  type = 'website',
  image,
  author = 'Limitless Cruises',
  robots = 'index, follow',
  noindex = false,
  structuredData
}) {
  const siteName = siteConfig.siteName;
  const siteUrl = siteConfig.siteUrl;
  const defaultDescription = 'Your personal cruise consultant. Book cruise holidays with preferential rates, exclusive offers and expert advice from Limitless Cruises.';
  const defaultImage = 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/categories/about/About2.webp';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const fullCanonical = canonical || siteUrl;
  const fullImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update meta description
    updateMetaTag('description', fullDescription);

    // Update meta keywords (if provided)
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update meta author
    updateMetaTag('author', author);

    // Update meta robots (respect noindex override)
    const robotsMeta = noindex ? 'noindex, nofollow' : robots;
    updateMetaTag('robots', robotsMeta);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullCanonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', fullCanonical);
      document.head.appendChild(canonicalLink);
    }

    // Update Open Graph tags (skip if noindex)
    if (!noindex) {
      const ogTags = {
        'og:title': fullTitle,
        'og:description': fullDescription,
        'og:url': fullCanonical,
        'og:type': type,
        'og:image': fullImage,
        'og:site_name': siteName,
        'og:locale': 'en_GB'
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        updateMetaTag(property, content, 'property');
      });

      // Update Twitter Card tags
      const twitterTags = {
        'twitter:card': 'summary_large_image',
        'twitter:title': fullTitle,
        'twitter:description': fullDescription,
        'twitter:image': fullImage
      };

      Object.entries(twitterTags).forEach(([name, content]) => {
        if (content) {
          updateMetaTag(name, content, 'name');
        }
      });
    }

    // Trigger SEO analysis after meta tags are updated
    // Wait a bit to ensure all tags are in place
    const timeoutId = setTimeout(() => {
      if (!import.meta.env.DEV) {
        analyzePageSEO().catch(() => {
          // Silently fail if SEO analysis fails
        })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [fullTitle, fullDescription, fullCanonical, type, fullImage, keywords, author, robots, noindex, siteName]);

  // Render structured data if provided (supports single object or array)
  if (structuredData) {
    // Handle both single object and array of objects
    const dataToRender = Array.isArray(structuredData) ? structuredData : [structuredData];
    
    return (
      <>
        {dataToRender.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </>
    );
  }

  return null;
}

export default SEO;

