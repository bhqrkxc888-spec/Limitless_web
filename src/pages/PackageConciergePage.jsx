import SEO, { getBreadcrumbSchema } from '../components/SEO';
import PackageConciergeForm from '../components/enquiry-forms/PackageConciergeForm';
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
          <h1>Create Your Perfect Package</h1>
          <p>Flights, hotels, cruise - we handle every detail. Tell us your vision.</p>
        </div>
      </section>

      {/* The Form */}
      <section className="concierge-form-section">
        <div className="container">
          <PackageConciergeForm />
        </div>
      </section>
    </main>
  );
}

export default PackageConciergePage;
