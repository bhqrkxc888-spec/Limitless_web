import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<p>At Limitless Cruises, we endeavor to offer you the best value cruise holidays. If you find a better price, we'll match it.</p>

<section>
  <h2>Our Promise</h2>
  <p>We want you to book with confidence knowing you're getting the best price available.</p>
</section>

<section>
  <h2>How It Works</h2>
  <ol>
    <li>Find a lower price for the same cruise</li>
    <li>Submit a price match request with details</li>
    <li>We verify the quote meets our criteria</li>
    <li>We match the price or explain why we can't</li>
  </ol>
</section>

<section>
  <h2>Eligibility Criteria</h2>
  <p>The quote must be:</p>
  <ul>
    <li>For the identical cruise (same ship, same date, same itinerary)</li>
    <li>The same cabin category and grade</li>
    <li>From a UK-based, ABTA-registered travel agent</li>
    <li>Available to book at the time of your request</li>
    <li>A genuine public price (not staff rates, group bookings, or errors)</li>
  </ul>
</section>

<section>
  <h2>Exclusions</h2>
  <p>We cannot price match:</p>
  <ul>
    <li>Staff or industry rates</li>
    <li>Group bookings (10+ cabins)</li>
    <li>Quotes from non-ABTA agents</li>
    <li>Prices from auction sites</li>
    <li>Obvious pricing errors</li>
    <li>Packages with significantly different inclusions</li>
  </ul>
</section>

<section>
  <h2>Terms</h2>
  <ul>
    <li>One price match per booking</li>
    <li>Must be requested before final payment</li>
    <li>Cannot be combined with other offers</li>
    <li>Subject to availability</li>
  </ul>
</section>

<section>
  <h2>Contact</h2>
  <p>To submit a price match request:</p>
  <ul>
    <li>Email: <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></li>
    <li>Phone: 01246 823815</li>
  </ul>
  <p>See our full Booking Terms & Conditions for additional information.</p>
</section>
`;

function PriceMatchGuarantee() {
  return (
    <LegalPageTemplate
      fallbackTitle="Price Match Guarantee"
      fallbackDescription="Found a better price for your cruise? Limitless Cruises offers a price match guarantee. Learn about our promise and how to claim."
      fallbackContent={fallbackContent}
    />
  );
}

export default PriceMatchGuarantee;
