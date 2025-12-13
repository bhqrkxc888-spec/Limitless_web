import { useEffect } from 'react';

/**
 * SEO Component
 * Updates document title and meta tags dynamically
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.type - Open Graph type (default: 'website')
 * @param {string} props.image - Open Graph image URL
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image,
  structuredData
}) {
  const siteName = 'Limitless Cruises';
  const siteUrl = 'https://limitlesscruises.com';
  const defaultDescription = 'Your personal cruise consultant. Book cruise holidays with preferential rates, exclusive offers and expert advice from Limitless Cruises.';
  const defaultImage = 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/categories/about/About2.webp';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const fullCanonical = canonical || siteUrl;
  const fullImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', fullDescription);
    }

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

    // Update Open Graph tags
    const ogTags = {
      'og:title': fullTitle,
      'og:description': fullDescription,
      'og:url': fullCanonical,
      'og:type': type,
      'og:image': fullImage,
      'og:site_name': siteName
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Update Twitter Card tags
    const twitterTags = {
      'twitter:title': fullTitle,
      'twitter:description': fullDescription,
      'twitter:image': fullImage
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

  }, [fullTitle, fullDescription, fullCanonical, type, fullImage]);

  // Render structured data if provided
  if (structuredData) {
    return (
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    );
  }

  return null;
}

export default SEO;

