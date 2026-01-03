import SEO, { getBreadcrumbSchema } from '../components/SEO';
import PackageConciergeForm from '../components/enquiry-forms/PackageConciergeForm';
import { siteConfig } from '../config/siteConfig';
import './PackageConciergePage.css';

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: 'https://www.limitlesscruises.com/' },
  { name: 'Package Concierge', url: 'https://www.limitlesscruises.com/concierge' }
]);

function PackageConciergePage() {
  return (
    <main className="package-concierge-page">
      <SEO
        title="Bespoke Cruise Packages | Complete Travel Concierge | Limitless Cruises"
        description="Your dream package, expertly crafted. From flights to hotels to your perfect cruise - we handle every detail. Consultative service for complex, high-value travel."
        canonical="https://www.limitlesscruises.com/concierge"
        keywords="bespoke cruise packages, luxury cruise concierge, custom cruise holidays, complete travel packages"
        structuredData={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="concierge-hero">
        <div className="container">
          <div className="concierge-hero-content">
            <span className="concierge-badge">Premium Service</span>
            <h1 className="concierge-hero-title">
              Your Dream Package, Expertly Crafted
            </h1>
            <p className="concierge-hero-subtitle">
              From flights to hotels to your perfect cruise - we handle every detail. Tell us your vision and let our expertise bring it to life.
            </p>

            {/* Trust Indicators */}
            <div className="concierge-trust-indicators">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Personal Attention</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Years of Experience</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                <span>Bespoke Itineraries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="concierge-testimonial">
        <div className="container">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {'★'.repeat(5)}
            </div>
            <blockquote className="testimonial-quote">
              "From Antarctica to the Mediterranean, Dane crafted our dream multi-destination package. Every detail was perfect - flights, hotels, excursions. Worth every penny for the peace of mind."
            </blockquote>
            <cite className="testimonial-author">— Sarah & Michael, World Cruise 2023</cite>
          </div>
        </div>
      </section>

      {/* What We Create */}
      <section className="concierge-examples">
        <div className="container">
          <h2 className="section-title">Sample Packages We've Created</h2>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Antarctica Expedition + Patagonia</h3>
              <p>
                18-day package: UK flights, Santiago hotel, Ushuaia stopover, expedition cruise, return via Buenos Aires
              </p>
              <span className="example-value">£28,500 for 2</span>
            </div>

            <div className="example-card">
              <div className="example-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Mediterranean Grand Tour</h3>
              <p>
                21-night journey: Barcelona, 14-night cruise (Italy, Greece, Turkey), 5 nights Venice & Rome post-cruise
              </p>
              <span className="example-value">£12,800 for 2</span>
            </div>

            <div className="example-card">
              <div className="example-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Alaska & Canadian Rockies</h3>
              <p>
                16-day adventure: Seattle flight, 7-night Alaska cruise, Rocky Mountaineer train, Banff/Jasper exploration
              </p>
              <span className="example-value">£18,200 for 2</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Form */}
      <section className="concierge-form-section">
        <div className="container">
          <PackageConciergeForm />
        </div>
      </section>

      {/* Why Choose Our Concierge Service */}
      <section className="concierge-benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Concierge Service?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <h3>Personal Service</h3>
              <p>You'll work directly with Dane - no call centers, no handoffs. Personal attention from inquiry to embarkation.</p>
            </div>

            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <h3>Stress-Free Planning</h3>
              <p>We coordinate every element - flights, hotels, transfers, excursions. One point of contact, complete peace of mind.</p>
            </div>

            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              <h3>Insider Access</h3>
              <p>Exclusive cruise line relationships mean better pricing, complimentary upgrades, and perks unavailable elsewhere.</p>
            </div>

            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3>Value for Money</h3>
              <p>Through our supplier relationships and volume, we often beat DIY booking prices while providing superior service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="concierge-contact-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Planning?</h2>
            <p>Or prefer to discuss your vision over the phone? Give us a call</p>
            <div className="cta-buttons">
              <a href={`tel:${siteConfig.phone}`} className="btn btn-primary btn-lg">
                Call {siteConfig.phone}
              </a>
              <a href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                WhatsApp Dane
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PackageConciergePage;

