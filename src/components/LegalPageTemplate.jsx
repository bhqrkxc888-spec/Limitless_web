/**
 * Legal Page Template Component
 * 
 * Generic template for rendering legal documents from Supabase
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';
import './LegalPageTemplate.css';

function LegalPageTemplate({ slug, fallbackTitle, fallbackDescription, fallbackContent }) {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);

        if (!supabase) {
          // Supabase not configured, use fallback content
          logger.warn(`Supabase not configured, using fallback content for ${slug}`);
          setDocument({
            title: fallbackTitle,
            content: fallbackContent
          });
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('web.site_documents')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // No matching row found, use fallback
            logger.warn(`No document found for slug: ${slug}, using fallback`);
            setDocument({
              title: fallbackTitle,
              content: fallbackContent
            });
          } else {
            throw fetchError;
          }
        } else {
          setDocument(data);
        }
      } catch (err) {
        logger.error(`Error fetching legal document ${slug}:`, err);
        // Still show fallback on error
        setDocument({
          title: fallbackTitle,
          content: fallbackContent
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [slug, fallbackTitle, fallbackContent]);

  if (loading) {
    return (
      <main className="legal-page">
        <div className="legal-header">
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </div>
        <div className="container">
          <div className="legal-loading">
            <div className="loading-spinner"></div>
            <p>Loading document...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="legal-page">
        <div className="legal-header">
          <div className="container">
            <h1>Document Not Found</h1>
          </div>
        </div>
        <div className="container">
          <div className="legal-error">
            <p>The requested legal document could not be found.</p>
          </div>
        </div>
      </main>
    );
  }

  // Get canonical URL
  const canonicalUrl = `https://limitlesscruises.com${location.pathname}`;

  return (
    <main className="legal-page">
      <SEO
        title={document.title}
        description={fallbackDescription}
        canonical={canonicalUrl}
        noindex={false}
      />

      <div className="legal-header">
        <div className="container">
          <h1>{document.title}</h1>
        </div>
      </div>

      <div className="container">
        <article 
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: document.content }}
        />
      </div>
    </main>
  );
}

export default LegalPageTemplate;

