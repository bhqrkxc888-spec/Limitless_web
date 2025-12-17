import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<p>These Booking Terms & Conditions apply to all bookings made through Limitless Cruises Ltd, a member of Holiday Elite (ABTA P7541).</p>

<section>
  <h2>Important Notice</h2>
  <p>Limitless Cruises Ltd acts as an agent for cruise line principals. Your contract is with the cruise line, not with us. The cruise line's own booking conditions will apply.</p>
</section>

<section>
  <h2>Making a Booking</h2>
  <p>When you make a booking with us, you confirm that you have authority to accept these terms on behalf of all members of your party.</p>
</section>

<section>
  <h2>Payment Terms</h2>
  <ul>
    <li>A deposit is required at time of booking</li>
    <li>Full payment is typically due 90 days before departure</li>
    <li>Payment can be made by bank transfer or credit/debit card</li>
    <li>Card processing fees may apply</li>
  </ul>
</section>

<section>
  <h2>Cancellations</h2>
  <p>Cancellation charges apply as per the cruise line's terms:</p>
  <ul>
    <li>More than 90 days: Lose deposit</li>
    <li>90-60 days: 50% of total cost</li>
    <li>60-30 days: 75% of total cost</li>
    <li>Less than 30 days: 100% of total cost</li>
  </ul>
</section>

<section>
  <h2>Travel Insurance</h2>
  <p>We strongly recommend comprehensive travel insurance for all bookings. Insurance should be purchased at time of booking.</p>
</section>

<section>
  <h2>ABTA Protection</h2>
  <p>As a member of Holiday Elite (ABTA P7541), your booking is protected by ABTA.</p>
</section>

<section>
  <h2>Contact</h2>
  <p>For booking enquiries, contact us at <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a> or call 01246 823815.</p>
</section>
`;

function BookingTerms() {
  return (
    <LegalPageTemplate
      slug="booking-terms"
      fallbackTitle="Booking Terms & Conditions"
      fallbackDescription="Read the booking terms and conditions for cruises with Limitless Cruises. Understand payment terms, cancellation policies, and your rights."
      fallbackContent={fallbackContent}
    />
  );
}

export default BookingTerms;
