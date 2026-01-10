import SEO, { getBreadcrumbSchema } from '../components/SEO';
import PackageConciergeForm from '../components/enquiry-forms/PackageConciergeForm';
import { Button } from '../components/ui';
import { siteConfig } from '../config/siteConfig';
import './PackageConciergePage.css';

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: 'https://www.limitlesscruises.com/' },
  { name: 'Bespoke Packages', url: 'https://www.limitlesscruises.com/concierge' }
]);

function PackageConciergePage() {
  return (
    <main className="package-concierge-page">
      <SEO
        title="Bespoke Cruise Packages | Limitless Cruises"
        description="Complete travel packages expertly crafted. Flights, hotels, and your perfect cruise - all coordinated for you."
        canonical="https://www.limitlesscruises.com/concierge"
        keywords="bespoke cruise packages, luxury cruise concierge, custom cruise holidays, complete travel packages"
        structuredData={breadcrumbSchema}
      />

      {/* Page Header */}
      <section className="concierge-page-header">
        <div className="container">
          <h1>Bespoke Cruise Packages</h1>
          <p>Complete travel packages expertly crafted for you</p>
        </div>
      </section>

      {/* What This Service Offers */}
      <section className="concierge-intro-section">
        <div className="container">
          <div className="concierge-intro-content">
            <h2>Let Us Do the Work</h2>
            <p>
              Planning a cruise holiday can involve coordinating flights, hotels, transfers, and the cruise itself. 
              That's where our bespoke package service comes in. We handle every detail, so you don't have to.
            </p>
            
            <div className="concierge-benefits">
              <div className="benefit-item">
                <h3>Complete Package Planning</h3>
                <p>We coordinate your flights, pre- and post-cruise hotels, transfers, and cruise booking - all arranged to work seamlessly together.</p>
              </div>
              
              <div className="benefit-item">
                <h3>Market Monitoring</h3>
                <p>Looking for something specific? We'll monitor the market for you and notify you when your ideal package becomes available or reaches the right price.</p>
              </div>
              
              <div className="benefit-item">
                <h3>Multi-Leg Itineraries</h3>
                <p>Want to combine destinations? We specialise in complex itineraries - back-to-back cruises, multi-city stays, or extended voyages with stopovers.</p>
              </div>
              
              <div className="benefit-item">
                <h3>Tailored to You</h3>
                <p>Whether you're after a specific cabin grade, particular flight times, or certain hotel standards, we build your package around your preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Form */}
      <section className="concierge-form-section">
        <div className="container">
          <div className="form-intro">
            <h2>Tell Us What You're Looking For</h2>
            <p>Complete the form below with as much detail as you'd like. The more we know about your preferences, the better we can tailor your package.</p>
          </div>
          <PackageConciergeForm />
        </div>
      </section>

      {/* Prefer to Speak Section */}
      <section className="prefer-to-speak-section">
        <div className="container">
          <div className="prefer-to-speak-content">
            <h2>Prefer to Speak With Us?</h2>
            <p>
              Sometimes it's easier to discuss your plans over the phone or via WhatsApp. 
              We're here to help you plan your perfect cruise package.
            </p>
            <div className="contact-options">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button 
                href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} 
                variant="secondary" 
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PackageConciergePage;
