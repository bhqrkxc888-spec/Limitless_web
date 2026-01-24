import { Facebook, Twitter, Link as LinkIcon, Mail } from 'lucide-react';
import { useState } from 'react';
import './SocialShare.css';

/**
 * Social Share Component
 * Compact share buttons for guides, offers, and content
 * 
 * @param {string} url - URL to share
 * @param {string} title - Title for share text
 * @param {string} description - Description for email sharing
 * @param {string} label - Custom label text (default: no label shown)
 * @param {boolean} showLabel - Whether to show the label (default: false)
 */
function SocialShare({ url, title, description, label, showLabel = false }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareText = description || '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  };

  return (
    <div className="social-share">
      {showLabel && label && <span className="social-share-label">{label}</span>}
      <div className="social-share-buttons">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button facebook"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button twitter"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </a>
        <a
          href={shareLinks.email}
          className="social-share-button email"
          aria-label="Share via email"
        >
          <Mail size={18} />
        </a>
        <button
          onClick={handleCopyLink}
          className="social-share-button copy"
          aria-label="Copy link"
        >
          {copied ? (
            <span className="copied-check">✓</span>
          ) : (
            <LinkIcon size={18} />
          )}
        </button>
      </div>
      {copied && <span className="social-share-copied">Link copied!</span>}
    </div>
  );
}

export default SocialShare;
