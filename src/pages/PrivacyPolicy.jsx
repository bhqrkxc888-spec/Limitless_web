import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<p>Your privacy is important to us. This statement explains how we collect, use, transfer and store your personal data.</p>

<p><strong>Limitless Cruises Ltd</strong> (Company Number: 16405644) is a member of Holiday Elite (ABTA P7541).</p>

<p><strong>Data Protection Manager:</strong> <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></p>

<section>
  <h2>Important Information</h2>
  <p>Limitless Cruises Ltd is responsible for this website and is the "data controller" for your data.</p>
</section>

<section>
  <h2>The Information We Collect</h2>
  <p>We may collect, use, store and transfer the following types of personal data:</p>
  <ul>
    <li><strong>Identity Data</strong> (name, title, date of birth, gender, passport details)</li>
    <li><strong>Contact Data</strong> (address, email, telephone numbers)</li>
    <li><strong>Sensitive Data</strong> (medical conditions, disabilities, dietary requirements)</li>
    <li><strong>Financial Data</strong> (bank account and payment card details)</li>
    <li><strong>Transaction Data</strong> (payments and services purchased)</li>
    <li><strong>Technical Data</strong> (IP address, browser details, device information)</li>
  </ul>
</section>

<section>
  <h2>How We Use Your Information</h2>
  <p>We use your data to:</p>
  <ul>
    <li>Perform contracts and process bookings</li>
    <li>Manage payments and collect debts</li>
    <li>Provide customer service</li>
    <li>Improve our website and services</li>
    <li>Send marketing communications (with consent)</li>
    <li>Comply with legal obligations</li>
  </ul>
</section>

<section>
  <h2>Your Rights</h2>
  <p>You have the right to:</p>
  <ul>
    <li>Access your personal data</li>
    <li>Correct inaccurate data</li>
    <li>Request deletion of your data</li>
    <li>Object to processing</li>
    <li>Request data portability</li>
    <li>Withdraw consent</li>
  </ul>
</section>

<section>
  <h2>Contact</h2>
  <p>For questions about this policy or your data, contact our Data Protection Manager at <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a> or write to: Data Protection Manager, Limitless Cruises Ltd, 51 Fairfields Way, Aston, Sheffield, S26 2HB.</p>
</section>
`;

function PrivacyPolicy() {
  return (
    <LegalPageTemplate
      fallbackTitle="Privacy Policy"
      fallbackDescription="Learn how Limitless Cruises collects, uses, and protects your personal data. Your privacy matters to us."
      fallbackContent={fallbackContent}
    />
  );
}

export default PrivacyPolicy;
