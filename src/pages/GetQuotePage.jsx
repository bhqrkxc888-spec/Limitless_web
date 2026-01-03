import SEO, { getBreadcrumbSchema } from '../components/SEO';
import QuoteRequestForm from '../components/enquiry-forms/QuoteRequestForm';
import { siteConfig } from '../config/siteConfig';
import './GetQuotePage.css';

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: 'https://www.limitlesscruises.com/' },
  { name: 'Get a Quote', url: 'https://www.limitlesscruises.com/get-a-quote' }
]);

function GetQuotePage() {
  return (
    <main className="get-quote-page">
      <SEO
        title="Get a Competitive Cruise Quote | Often Beat Published Prices | Limitless Cruises"
        description="Found your perfect cruise? Get a competitive quote from Limitless Cruises. We often beat published prices through our exclusive cruise line relationships."
        canonical="https://www.limitlesscruises.com/get-a-quote"
        keywords="cruise quote, cruise price match, competitive cruise pricing, cruise deals"
        structuredData={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="quote-hero">
        <div className="container">
          <div className="quote-hero-content">
            <h1 className="quote-hero-title">
              Found Your Perfect Cruise? Let's Get You the Best Price
            </h1>
            <p className="quote-hero-subtitle">
              Paste a link to any cruise you've found, and we'll provide a competitive quote - often beating published prices through our exclusive cruise line relationships.
            </p>

            {/* Trust Indicators */}
            <div className="quote-trust-indicators">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>24-Hour Turnaround</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Competitive Pricing</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <span>ABTA Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="quote-how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Share the Details</h3>
              <p>Paste the cruise URL or enter the details manually if you don't have a link</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>We Review</h3>
              <p>Our team checks availability and pricing through our exclusive cruise line partnerships</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Get Your Quote</h3>
              <p>Receive a competitive quote within 24 hours, often beating the published price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="quote-form-section">
        <div className="container">
          <QuoteRequestForm />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="quote-why-choose">
        <div className="container">
          <h2 className="section-title">Why Get a Quote From Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Better Prices</h3>
              <p>Through our relationships with cruise lines, we often secure better pricing than published rates</p>
            </div>

            <div className="benefit-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Added Value</h3>
              <p>Complimentary upgrades, onboard credit, and perks you won't find booking direct</p>
            </div>

            <div className="benefit-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Expert Support</h3>
              <p>Personal service from booking through to embarkation - we're here when you need us</p>
            </div>

            <div className="benefit-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Protected Booking</h3>
              <p>Full ABTA protection and financial security for complete peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="quote-contact-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Prefer to Speak to Someone?</h2>
            <p>Call us directly and we'll discuss your cruise and provide a quote over the phone</p>
            <div className="cta-buttons">
              <a href={`tel:${siteConfig.phone}`} className="btn btn-primary btn-lg">
                Call {siteConfig.phone}
              </a>
              <a href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GetQuotePage;

