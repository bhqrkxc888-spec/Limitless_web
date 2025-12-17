import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<p>This website is operated by <strong>Limitless Cruises Ltd</strong> (Company Number: 16405644). Limitless Cruises Ltd is a member of <strong>Holiday Elite (ABTA P7541)</strong>.</p>

<p>By accessing, using, browsing or booking on this website you agree you have read, understood and are bound by these Website Conditions and by the booking conditions of the principal with whom you contract.</p>

<section>
  <h2>Eligibility, Jurisdiction and Use</h2>
  <p>The holidays and services on this website are only available for purchase by those aged 18 or over, making the purchase from within the UK and with a UK address for booking documentation. Our business and the services we offer are governed by the laws of England and Wales.</p>
</section>

<section>
  <h2>Your Obligations</h2>
  <ul>
    <li>You accept financial responsibility for all transactions made under your name or account.</li>
    <li>You confirm you are 18+ and have legal capacity to make a booking.</li>
    <li>You warrant all information you provide is true and accurate.</li>
    <li>You will not use this site for speculative, false or fraudulent bookings.</li>
    <li>You will use our security features and keep passwords secret.</li>
  </ul>
</section>

<section>
  <h2>Disclaimers and Liability</h2>
  <p>No warranties, promises or representations of any kind, express or implied, are given as to the nature, standard, suitability or otherwise of any services offered via this website.</p>
</section>

<section>
  <h2>Changes to These Conditions</h2>
  <p>We may change or update these Website Conditions from time to time without notice. Continued use of the site following changes constitutes acceptance.</p>
</section>

<section>
  <h2>Intellectual Property</h2>
  <p>All intellectual property rights in the website and its content are owned by us or our licensors. You may not copy, reproduce, distribute or modify any content without permission.</p>
</section>
`;

function WebsiteTerms() {
  return (
    <LegalPageTemplate
      slug="website-terms"
      fallbackTitle="Website Terms & Conditions"
      fallbackDescription="Read the terms and conditions for using the Limitless Cruises website. Understanding your obligations and our disclaimers."
      fallbackContent={fallbackContent}
    />
  );
}

export default WebsiteTerms;
