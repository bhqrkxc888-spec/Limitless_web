import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCruiseGuides } from '../hooks/useCruiseGuides';
import SEO from '../components/SEO';
import { Button } from '../components/ui';
import GuideCard from '../components/GuideCard';
import './CruiseGuidesPage.css';

const GUIDE_TYPES = [
  { value: null, label: 'All Guides' },
  { value: 'cruise_line', label: 'Cruise Lines' },
  { value: 'how_to', label: 'How-To & Tips' },
  { value: 'comparison', label: 'Comparisons' }
];

function CruiseGuidesPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { guides, total, loading, error } = useCruiseGuides({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    guideType: selectedType
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cruise Guides',
    description: 'Comprehensive cruise guides and expert advice from Limitless Cruises covering cruise lines, how-to tips, comparisons, and port guides.',
    url: 'https://www.limitlesscruises.com/cruise-guides',
  };

  return (
    <main className="cruise-guides-page">
      <SEO
        title="Cruise Guides | Expert Tips & Travel Guides | UK Consultant"
        description="Comprehensive cruise guides from your personal UK cruise consultant. Cruise line guides, port guides, how-to tips, and expert comparisons to help plan your perfect cruise."
        canonical="https://www.limitlesscruises.com/cruise-guides"
        keywords="cruise guides, cruise line guides, port guides, cruise tips, how to cruise, cruise planning, UK cruise consultant"
        structuredData={structuredData}
      />

      <section className="guides-page-header">
        <div className="container">
          <div className="guides-page-header__content">
            <span className="guides-page-header__eyebrow">Expert Resources</span>
            <h1 className="guides-page-header__title">Cruise Guides</h1>
            <p className="guides-page-header__subtitle">
              Your complete resource for cruise planning. Expert guides covering cruise lines, port guides, how-to tips, and comparisons to help you plan the perfect voyage.
            </p>
          </div>
        </div>
      </section>

      <section className="guides-filter-section">
        <div className="container">
          <div className="guides-filter-pills">
            {GUIDE_TYPES.map((type) => (
              <button
                key={type.value || 'all'}
                className={`guides-filter-pill ${selectedType === type.value ? 'guides-filter-pill--active' : ''}`}
                onClick={() => {
                  setSelectedType(type.value);
                  setCurrentPage(1);
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <section className="section">
          <div className="container">
            <div className="guides-loading">
              <div className="guides-loading__spinner"></div>
              <p>Loading cruise guides...</p>
            </div>
          </div>
        </section>
      )}

      {error && !loading && (
        <section className="section">
          <div className="container">
            <div className="guides-error">
              <h3>Unable to Load Guides</h3>
              <p>Sorry, we couldn't load the guides at this time. Please try again later or contact us directly.</p>
              <Button to="/contact" variant="primary">Contact Us</Button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && guides.length === 0 && (
        <section className="section">
          <div className="container">
            <div className="guides-empty">
              <h3>Coming Soon</h3>
              <p>We're currently creating comprehensive cruise guides for you. Our expert guides covering cruise lines, port guides, and travel tips will be available soon.</p>
              <p>In the meantime, feel free to <a href="/contact">contact us</a> for personalised cruise advice.</p>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && guides.length > 0 && (
        <section className="guides-grid-section">
          <div className="container">
            <div className="guides-grid">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="guides-pagination">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </Button>
                <span className="guides-pagination__info">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default CruiseGuidesPage;

