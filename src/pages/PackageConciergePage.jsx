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

      {/* Simple Page Header */}
      <section className="concierge-page-header">
        <div className="container">
          <h1>Bespoke Packages</h1>
          <p>From flights to hotels to your perfect cruise, tell us your vision and we will handle every detail.</p>
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
