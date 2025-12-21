/**
 * HTML Sanitizer Utility
 * 
 * Uses DOMPurify to sanitize HTML content before rendering.
 * Prevents XSS attacks from malicious content in CMS data.
 */

import DOMPurify from 'dompurify';

// Configure DOMPurify with safe defaults for blog/article content
const ALLOWED_TAGS = [
  // Text formatting
  'p', 'br', 'hr', 'span', 'div',
  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Lists
  'ul', 'ol', 'li',
  // Links and media
  'a', 'img', 'figure', 'figcaption', 'picture', 'source',
  // Tables
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  // Text styling
  'strong', 'em', 'b', 'i', 'u', 's', 'sub', 'sup', 'mark',
  // Quotes and code
  'blockquote', 'pre', 'code', 'kbd',
  // Other semantic elements
  'article', 'section', 'aside', 'details', 'summary',
  // Embedded content (iframe for videos, etc.)
  'iframe'
];

const ALLOWED_ATTR = [
  // General
  'class', 'id', 'style', 'title', 'role', 'aria-*', 'data-*',
  // Links
  'href', 'target', 'rel',
  // Images
  'src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding',
  // Tables
  'colspan', 'rowspan', 'scope',
  // Iframes (for YouTube, Vimeo embeds)
  'src', 'frameborder', 'allow', 'allowfullscreen', 'name'
];

// Only allow iframes from trusted sources
const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;

/**
 * Sanitize HTML content for safe rendering
 * @param {string} html - Raw HTML string from CMS
 * @param {Object} options - Optional DOMPurify configuration overrides
 * @returns {string} Sanitized HTML string
 */
export function sanitizeHtml(html, options = {}) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Configure DOMPurify
  const config = {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: true,
    // Allow safe URL schemes
    ALLOWED_URI_REGEXP,
    // Keep safe YouTube/Vimeo iframes
    ADD_TAGS: ['iframe'],
    // Force target="_blank" links to have rel="noopener noreferrer"
    FORCE_BODY: false,
    ...options
  };

  // Add hook to ensure external links are secure
  DOMPurify.addHook('afterSanitizeAttributes', function(node) {
    // Set external links to open in new tab safely
    if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
      node.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Only allow iframes from trusted video sources
    if (node.tagName === 'IFRAME') {
      const src = node.getAttribute('src') || '';
      const allowedSources = [
        'youtube.com',
        'youtube-nocookie.com',
        'vimeo.com',
        'player.vimeo.com',
        'www.youtube.com',
        'www.vimeo.com'
      ];
      
      const isAllowed = allowedSources.some(source => 
        src.includes(source)
      );
      
      if (!isAllowed) {
        node.remove();
      }
    }
  });

  const result = DOMPurify.sanitize(html, config);
  
  // Clean up hook to avoid memory leaks
  DOMPurify.removeHook('afterSanitizeAttributes');
  
  return result;
}

/**
 * Create sanitized props for dangerouslySetInnerHTML
 * @param {string} html - Raw HTML string
 * @returns {Object} Object with __html property for React
 */
export function createSanitizedMarkup(html) {
  return {
    __html: sanitizeHtml(html)
  };
}

export default sanitizeHtml;

