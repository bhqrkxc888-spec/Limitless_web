import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { safeStringify } from '../utils/safeStringify';
import { getSEOPolicy } from '../utils/seoPolicy';
import { SITE_ASSETS } from '../config/assetUrls';

/**
 * SEO Component - SSG/Prerender Compatible
 * 
 * Updates document head with SEO meta tags. Works with:
 * - Client-side rendering (useEffect updates)
 * - Prerendering/SSG (Puppeteer captures after useEffect runs)
 * 
 * For prerendering to work correctly, the prerender script waits for
 * the page to fully render before capturing HTML.
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (without site name suffix)
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Override canonical URL
 * @param {string} props.type - Open Graph type (default: 'website')
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.author - Page author (default: 'Limitless Cruises')
 * @param {string} props.robots - Override robots meta
 * @param {boolean} props.noindex - Force noindex
 * @param {Object|Array} props.structuredData - JSON-LD structured data
 * @param {string} props.publishedTime - Article published date (ISO 8601)
 * @param {string} props.modifiedTime - Article modified date (ISO 8601)
 */
function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image,
  author = 'Limitless Cruises',
  robots,
  noindex = false,
  structuredData,
  publishedTime,
  modifiedTime,
}) {
  const location = useLocation();
  
  // Site configuration
  const siteName = siteConfig.siteName || 'Limitless Cruises';
  const siteUrl = siteConfig.siteUrl || 'https://www.limitlesscruises.com';
  const defaultDescription = 'Your dedicated cruise consultant. Book cruise holidays with preferential rates, exclusive offers and expert advice from Limitless Cruises.';
  const defaultImage = SITE_ASSETS.ogImage || `${siteUrl}/og-image.jpg`;

  // Get SEO policy for current path
  const policy = useMemo(() => {
    return getSEOPolicy(location.pathname, {
      searchParams: new URLSearchParams(location.search),
      noindex,
    });
  }, [location.pathname, location.search, noindex]);

  // Computed values
  // Don't add site name suffix if title already includes it
  const fullTitle = title
    ? (title.includes(siteName) ? title : `${title} | ${siteName}`)
    : siteName;
  const fullDescription = description || defaultDescription;
  const fullCanonical = canonical || policy.canonical;
  const fullImage = image || defaultImage;
  const robotsMeta = robots || policy.robots;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, content, createFn) => {
      if (!content) return null;
      
      let meta = document.querySelector(selector);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = createFn();
        document.head.appendChild(meta);
      }
      return meta;
    };

    // Helper to create meta tag with name attribute
    const createNameMeta = (name) => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      return meta;
    };

    // Helper to create meta tag with property attribute
    const createPropertyMeta = (property) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      return meta;
    };

    // Track created elements for cleanup
    const createdElements = [];

    // === Basic Meta Tags ===
    updateMetaTag('meta[name="description"]', fullDescription, () => createNameMeta('description'));
    updateMetaTag('meta[name="author"]', author, () => createNameMeta('author'));
    updateMetaTag('meta[name="robots"]', robotsMeta, () => createNameMeta('robots'));

    // === Canonical Link ===
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullCanonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', fullCanonical);
      document.head.appendChild(canonicalLink);
      createdElements.push(canonicalLink);
    }

    // === Open Graph Tags ===
    const ogTags = {
      'og:title': fullTitle,
      'og:description': fullDescription,
      'og:url': fullCanonical,
      'og:type': type,
      'og:image': fullImage,
      'og:site_name': siteName,
      'og:locale': 'en_GB',
    };

    // Add article-specific OG tags
    if (type === 'article') {
      if (publishedTime) ogTags['article:published_time'] = publishedTime;
      if (modifiedTime) ogTags['article:modified_time'] = modifiedTime;
      ogTags['article:author'] = author;
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      if (content) {
        updateMetaTag(
          `meta[property="${property}"]`,
          content,
          () => createPropertyMeta(property)
        );
      }
    });

    // === Twitter Card Tags ===
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': fullDescription,
      'twitter:image': fullImage,
      'twitter:site': '@LimitlessCruise', // Add if you have Twitter handle
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      if (content) {
        updateMetaTag(
          `meta[name="${name}"]`,
          content,
          () => createNameMeta(name)
        );
      }
    });

    // === JSON-LD Structured Data ===
    // Remove any existing dynamic JSON-LD (keep the static one from index.html)
    const existingDynamicJsonLd = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
    existingDynamicJsonLd.forEach(el => el.remove());

    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      
      dataArray.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-dynamic', 'true');
        script.textContent = safeStringify(data);
        document.head.appendChild(script);
        createdElements.push(script);
      });
    }

    // Mark page as SEO-ready for prerender script
    document.documentElement.setAttribute('data-seo-ready', 'true');

    // Cleanup function (optional - mainly for SPA navigation)
    return () => {
      // We don't remove meta tags on cleanup since they should persist
      // and be updated by the next page's SEO component
      document.documentElement.removeAttribute('data-seo-ready');
    };
  }, [
    fullTitle,
    fullDescription,
    fullCanonical,
    type,
    fullImage,
    author,
    robotsMeta,
    siteName,
    structuredData,
    publishedTime,
    modifiedTime,
  ]);

  // For prerendering, we also render the structured data as actual script tags
  // This ensures they're captured even if useEffect hasn't run
  if (structuredData) {
    const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
    
    return (
      <>
        {dataArray.map((data, index) => (
          <script
            key={`json-ld-${index}`}
            type="application/ld+json"
            data-dynamic="true"
            dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
          />
        ))}
      </>
    );
  }

  return null;
}

export default SEO;

// Export helper functions for structured data generation
// These are used by other components and the sitemap generator
// eslint-disable-next-line react-refresh/only-export-components
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Limitless Cruises',
    description: 'Your personal cruise consultant. Book cruise holidays with preferential rates, exclusive offers and expert advice.',
    url: 'https://www.limitlesscruises.com',
    telephone: '+44 114 321 3208',
    email: 'travel@limitlesscruises.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61570469572535',
      'https://www.linkedin.com/company/limitless-cruises/',
      'https://www.youtube.com/@LimitlessCruises',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'ABTA',
      identifier: 'P7541',
    },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Limitless Cruises',
    url: 'https://www.limitlesscruises.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.limitlesscruises.com/find-a-cruise?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function getArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.description,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: 'Limitless Cruises',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Limitless Cruises',
      logo: {
        '@type': 'ImageObject',
        url: SITE_ASSETS.logo,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}
