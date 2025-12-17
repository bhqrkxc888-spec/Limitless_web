import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<h1>Website Terms</h1>

<p>
  This website is operated by <strong>Limitless Cruises Ltd</strong> (Company Number: <strong>16405644</strong>).
  Limitless Cruises Ltd is a member of <strong>Holiday Elite</strong> (ABTA <strong>P7541</strong>).
</p>

<p>
  By accessing, using or browsing this website, you confirm that you have read, understood and agree to be bound by these Website Terms.
</p>

<p>
  <strong>No bookings are taken or completed on this website.</strong> Any prices, offers or travel information shown are for guidance only and are subject to
  availability and confirmation. If you choose to proceed, your booking (if any) will be arranged separately via communication with us, and you will enter into
  a contract with the relevant travel supplier(s) (for example: tour operator, cruise line, airline, hotel or accommodation provider).
</p>

<hr />

<h2>1. Eligibility, Jurisdiction and Use</h2>
<p>
  This website is intended for users aged <strong>18 or over</strong>, accessing the site from within the <strong>UK</strong>.
</p>
<p>
  Our business and these Website Terms are governed by the laws of <strong>England and Wales</strong>.
</p>

<h2>2. Your Obligations</h2>
<p>When using this website, you agree that:</p>
<ul>
  <li>You will not use this website to submit false, misleading or fraudulent enquiries.</li>
  <li>You warrant that all information you provide via forms or enquiries is true, accurate and complete.</li>
  <li>You will keep any account or login details (if applicable) confidential.</li>
</ul>

<h2>3. Website Content and Disclaimers</h2>
<p>
  While we aim to keep information on this website accurate and up to date, we do not guarantee that all content is complete, current or error-free.
  Travel information, availability and prices can change quickly and must be confirmed at the time of enquiry.
</p>
<p>
  No warranties, promises or representations of any kind, express or implied, are given as to the nature, standard, suitability or otherwise of any
  travel services referred to on this website.
</p>

<h2>4. Changes to These Website Terms</h2>
<p>
  We may change or update these Website Terms from time to time without notice.
  Your continued use of the website following any changes constitutes acceptance of the updated terms.
</p>

<h2>5. Intellectual Property</h2>
<p>
  All intellectual property rights in this website and its content are owned by us or our licensors.
  You may not copy, reproduce, distribute, publish, adapt or modify any part of this website without our prior written permission.
</p>

<h2>6. Contact</h2>
<p>
  If you have any questions about these Website Terms, please contact us:
</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:travel@limitlesscruises.com">travel@limitlesscruises.com</a></li>
  <li><strong>Phone:</strong> <a href="tel:01143213208">0114 321 3208</a></li>
</ul>
`;

function WebsiteTerms() {
  return (
    <LegalPageTemplate
      fallbackTitle="Website Terms & Conditions"
      fallbackDescription="Read the terms and conditions for using the Limitless Cruises website. Understanding your obligations and our disclaimers."
      fallbackContent={fallbackContent}
    />
  );
}

export default WebsiteTerms;
