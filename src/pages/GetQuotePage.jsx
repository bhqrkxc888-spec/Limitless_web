/**
 * GET A QUOTE PAGE
 * 
 * NOTE: This page is intentionally hidden from navigation (not linked from menu).
 * 
 * Reason: The simple "paste a link" approach doesn't collect enough details
 * (passengers, cabin type/location, preferred deck) needed for proper quotes.
 * May also attract price-shoppers rather than premium clientele.
 * 
 * Route kept functional (/get-a-quote) for potential future use.
 * See: src/data/navigation.js and src/App.jsx for implementation notes.
 */

import SEO, { getBreadcrumbSchema } from '../components/SEO';
import QuoteRequestForm from '../components/enquiry-forms/QuoteRequestForm';
import './GetQuotePage.css';

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: 'https://www.limitlesscruises.com/' },
  { name: 'Get a Quote', url: 'https://www.limitlesscruises.com/get-a-quote' }
]);

function GetQuotePage() {
  return (
    <main className="get-quote-page">
      <SEO
        title="Get a Competitive Cruise Quote | Limitless Cruises"
        description="Found your perfect cruise? Get a competitive quote. We often beat published prices through our exclusive cruise line relationships."
        canonical="https://www.limitlesscruises.com/get-a-quote"
        keywords="cruise quote, cruise price match, competitive cruise pricing, cruise deals"
        structuredData={breadcrumbSchema}
      />

      {/* Page Header */}
      <section className="quote-page-header">
        <div className="container">
          <h1>Get a Competitive Quote</h1>
          <p>Found a cruise you love? Share the details and we will provide a quote within 24 hours.</p>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="quote-form-section">
        <div className="container">
          <QuoteRequestForm />
        </div>
      </section>
    </main>
  );
}

export default GetQuotePage;
