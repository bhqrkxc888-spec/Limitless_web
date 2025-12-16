import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import './PriceMatchGuarantee.css';

function PriceMatchGuarantee() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Limitless Cruises Price Match Guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you find an identical cruise holiday at a lower price from another ABTA member, we will match that price. The quote must be genuine, in writing, and for the exact same cruise, cabin, and departure date.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I claim a price match?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contact us within 48 hours of receiving your competitor quote with written evidence of the lower price. We will verify the quote and match it if all conditions are met.'
        }
      }
    ]
  };

  return (
    <main className="price-match-page">
      <SEO
        title="Price Match Guarantee"
        description="Limitless Cruises Price Match Guarantee - we'll match any genuine like-for-like cruise quote from an ABTA member. Read our terms and conditions."
        canonical="https://limitlesscruises.com/price-match-guarantee"
        structuredData={structuredData}
      />

      <div className="price-match-header">
        <div className="container">
          <h1>Price Match Guarantee</h1>
          <p className="price-match-strapline">Your assurance of the best value cruise holidays</p>
        </div>
      </div>

      <div className="container">
        <article className="price-match-content">
          <div className="price-match-intro">
            <div className="price-match-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="price-match-intro-text">
              <p>
                At <strong>Limitless Cruises</strong>, we're committed to offering you competitive prices 
                combined with exceptional personal service. If you find a lower price elsewhere for an 
                identical cruise holiday, we'll match it – guaranteed.
              </p>
            </div>
          </div>

          <section className="price-match-summary">
            <h2>How It Works</h2>
            <div className="summary-grid">
              <div className="summary-step">
                <span className="step-number">1</span>
                <h3>Find a Lower Price</h3>
                <p>Discover an identical cruise package at a lower price from another ABTA member agent.</p>
              </div>
              <div className="summary-step">
                <span className="step-number">2</span>
                <h3>Get It In Writing</h3>
                <p>Obtain a written quote showing the price, cruise details, cabin type, and departure date.</p>
              </div>
              <div className="summary-step">
                <span className="step-number">3</span>
                <h3>Contact Us</h3>
                <p>Send us the quote within 48 hours. We'll verify and match the price if conditions are met.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Terms &amp; Conditions</h2>
            <p>
              The following terms apply to our Price Match Guarantee. Please read them carefully 
              before submitting a price match request.
            </p>

            <h3>1. Qualifying Criteria</h3>
            <p>To qualify for our Price Match Guarantee, the following conditions must be met:</p>
            <ul>
              <li>The competitor must be an <strong>ABTA-bonded travel agent</strong> based in the UK</li>
              <li>The quote must be for the <strong>exact same cruise</strong> – same ship, same sailing date, same itinerary</li>
              <li>The quote must be for the <strong>same cabin category and grade</strong> (e.g., Balcony, Oceanview, Suite)</li>
              <li>The quote must include <strong>all applicable taxes, fees, and charges</strong></li>
              <li>If a fly-cruise, the quote must include the <strong>same flights and transfers</strong></li>
              <li>The quote must be <strong>currently available to book</strong> at the stated price</li>
            </ul>

            <h3>2. Quote Requirements</h3>
            <p>Your competitor quote must:</p>
            <ul>
              <li>Be in <strong>written form</strong> (email, letter, or screenshot from an official booking system)</li>
              <li>Be <strong>dated within the last 48 hours</strong></li>
              <li>Clearly show the <strong>total price per person or per cabin</strong></li>
              <li>Include the competitor's <strong>ABTA membership number</strong></li>
              <li>Be for a booking that is <strong>genuinely available</strong> – not sold out or a teaser price</li>
            </ul>

            <h3>3. Exclusions</h3>
            <p>The Price Match Guarantee does not apply to:</p>
            <ul>
              <li><strong>Auction sites</strong> or bidding platforms (e.g., eBay)</li>
              <li><strong>Membership-only discounts</strong> or loyalty scheme prices</li>
              <li><strong>Cashback offers</strong>, voucher codes, or promotional credit</li>
              <li><strong>Trade or industry rates</strong> not available to the general public</li>
              <li><strong>Error prices</strong> or pricing mistakes</li>
              <li><strong>Last-minute or flash sales</strong> with limited availability</li>
              <li><strong>Group bookings</strong> of 8 cabins or more</li>
              <li>Quotes from <strong>non-ABTA agents</strong> or overseas companies</li>
              <li><strong>Cruises departing within 14 days</strong> of the quote date</li>
            </ul>

            <h3>4. How to Claim</h3>
            <p>To submit a price match request:</p>
            <ol>
              <li>Email us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with the subject line "Price Match Request"</li>
              <li>Include your booking reference (if you've already booked with us) or enquiry details</li>
              <li>Attach the competitor's written quote showing all relevant details</li>
              <li>Provide the competitor's ABTA number and contact details</li>
            </ol>
            <p>
              We aim to respond to all price match requests within <strong>24 working hours</strong>. 
              We may contact the competitor directly to verify the quote.
            </p>

            <h3>5. Our Decision</h3>
            <p>
              Limitless Cruises reserves the right to verify all price match claims and to decline 
              requests that do not meet the criteria set out above. Our decision is final.
            </p>
            <p>
              If approved, we will match the competitor's price on your booking. The price match 
              applies to the <strong>base cruise fare only</strong> – not to optional extras, 
              insurance, or add-ons.
            </p>

            <h3>6. Timing</h3>
            <ul>
              <li>Price match requests must be submitted <strong>before final payment</strong> is made</li>
              <li>For new bookings, the request must be made <strong>within 7 days of booking</strong></li>
              <li>For existing bookings approaching balance due, requests must be made <strong>at least 72 hours before payment is due</strong></li>
            </ul>
          </section>

          <section className="price-match-cta">
            <h2>Ready to Book?</h2>
            <p>
              Experience the best of both worlds – competitive prices and personal service from 
              your dedicated cruise consultant.
            </p>
            <div className="cta-buttons">
              <Link to="/find-a-cruise" className="btn btn-primary">
                Find Your Cruise
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </section>

          <div className="price-match-footer">
            <p>
              <em>
                Last updated: December 2024. These terms may be updated from time to time. 
                Please check this page for the latest version.
              </em>
            </p>
            <p>
              <Link to="/booking-terms">View our full Booking Terms &amp; Conditions →</Link>
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}

export default PriceMatchGuarantee;

