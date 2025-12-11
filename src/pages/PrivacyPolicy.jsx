import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <div className="privacy-header">
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </div>

      <div className="container">
        <article className="privacy-content">
          <div className="privacy-intro">
            <p>Your privacy is important to us. This statement explains how we collect, use, transfer and store your personal data. We would encourage you to read this information.</p>
            <p><strong>Limitless Cruises Ltd</strong> (Company Number: 16405644) is a member of Holiday Elite (ABTA P7541).</p>
            <p><strong>Data Protection Manager:</strong> <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></p>
          </div>

          <section>
            <h2>Important Information and Who We Are</h2>

            <h3>About this privacy notice</h3>
            <p>This privacy notice explains how <strong>Limitless Cruises Ltd</strong> collects and processes your personal information. It should be read together with any other privacy/fair processing notice we provide on specific occasions. This notice supplements those and is not intended to override them.</p>

            <h3>Who's responsible for your personal information?</h3>
            <p><strong>Limitless Cruises</strong> is a trading name of <strong>Limitless Cruises Ltd</strong>. Limitless Cruises Ltd is responsible for this website and is the "data controller" for your data (collectively referred to as "Limitless Cruises", "we", "us" or "our").</p>

            <h3>How can you contact us?</h3>
            <p>Questions about this notice or your data? Contact our Data Protection Manager at <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a> or write to: Data Protection Manager, Limitless Cruises Ltd, 51 Fairfields Way, Aston, Sheffield, S26 2HB.</p>
            <p>If you do not think that we have processed your data in accordance with this notice, please tell us first. You can also complain to the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>

            <h3>Changes to this notice &amp; keeping your data up to date</h3>
            <p>We may update this privacy notice from time to time. Please check back for the latest version. It's important that the personal information we hold is accurate and current—please keep us informed of changes.</p>

            <h3>Links to other websites</h3>
            <p>Our site may include links to third-party websites, plug-ins and applications. Clicking those may allow third parties to collect or share data about you. We don't control those sites—please read their privacy notices.</p>
          </section>

          <section>
            <h2>The Kind of Information We Collect About You</h2>
            <p>"Personal data" means any information about an individual from which that person can be identified. It does not include anonymised data. We may collect, use, store and transfer the following:</p>
            <ul className="privacy-list">
              <li><strong>Identity Data</strong> (name, title, date of birth, gender, passport details).</li>
              <li><strong>Contact Data</strong> (address, email, telephone numbers).</li>
              <li><strong>Sensitive Data</strong> (medical conditions, disabilities, religious or philosophical beliefs, criminal convictions/offences).</li>
              <li><strong>Financial Data</strong> (bank account and payment card details).</li>
              <li><strong>Transaction Data</strong> (payments to/from you; products/services purchased).</li>
              <li><strong>Technical Data</strong> (IP address, login data, browser details, time zone, device and platform details).</li>
              <li><strong>Profile Data</strong> (username/password, purchases, interests, preferences, feedback, survey/promotional responses).</li>
              <li><strong>Usage Data</strong> (how you use our website, products and services).</li>
              <li><strong>Marketing &amp; Communications Data</strong> (your marketing preferences).</li>
            </ul>
            <p>We also use Aggregated Data (statistical/demographic) that may be derived from personal data but is not personal data unless combined in a way that identifies you.</p>

            <h3>Information about other people</h3>
            <p>You are responsible for ensuring other members of your travel party are aware of this Privacy Policy and consent to you supplying their personal data to us.</p>

            <h3>If you fail to provide personal data</h3>
            <p>Where we need personal data by law or to perform a contract and you don't provide it, we may be unable to provide the services. We'll tell you if this happens.</p>
          </section>

          <section>
            <h2>How Your Personal Information Is Collected</h2>
            <p><strong>Direct interactions:</strong> you may give us Identity, Contact, Financial, Sensitive and Transaction Data via forms, phone, email, post or otherwise (e.g., buying services, subscribing, requesting marketing, entering competitions, providing feedback).</p>
            <p><strong>Automated technologies:</strong> when you interact with our website we may automatically collect Profile and Usage Data, and Technical Data via cookies and similar technologies. See our <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.</p>
            <p><strong>Third parties/public sources:</strong> we may receive personal data from schools/organisations making bookings, payment/technical providers, data brokers, public sources (including social media), analytics/advertising/search providers.</p>
          </section>

          <section>
            <h2>How We Use Your Personal Information</h2>
            <p>We use your data only when the law allows us to, mainly to: (i) perform a contract with you; (ii) pursue legitimate interests (yours/ours) where your rights don't override those; and (iii) comply with legal/regulatory obligations. We rely on consent for Sensitive Data and certain marketing.</p>

            <h3>Purposes for which we use your data</h3>

            <div className="table-wrapper">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>Purpose/Activity</th>
                    <th>Type of data</th>
                    <th>Lawful basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Perform contracts &amp; booking administration:<br />
                      (a) communicate about bookings/purchases<br />
                      (b) manage payments/fees/charges<br />
                      (c) collect debts<br />
                      (d) resolve complaints/disputes
                    </td>
                    <td>Identity; Contact; Sensitive; Financial; Transaction; Marketing &amp; Comms</td>
                    <td>
                      Contract performance; legal obligations (e.g., AML); legitimate interests (debt recovery); healthcare provision where applicable; consent for Sensitive Data (e.g., beliefs).
                    </td>
                  </tr>
                  <tr>
                    <td>Manage our relationship (policy changes, reviews/surveys, call recording for training/service)</td>
                    <td>Identity; Contact; Profile; Marketing &amp; Comms</td>
                    <td>Contract; legal obligation; legitimate interests (records accuracy, service improvement)</td>
                  </tr>
                  <tr>
                    <td>Newsletter subscriptions, prize draws/promotions, surveys</td>
                    <td>Identity; Contact; Profile; Usage; Marketing &amp; Comms</td>
                    <td>Contract; legitimate interests (develop services and grow business)</td>
                  </tr>
                  <tr>
                    <td>Administer and protect our business/website (troubleshooting, analysis, testing, maintenance, support, hosting)</td>
                    <td>Identity; Contact; Technical</td>
                    <td>Legitimate interests (running business/IT, security, fraud prevention); legal obligation</td>
                  </tr>
                  <tr>
                    <td>Deliver relevant content/ads and measure effectiveness</td>
                    <td>Identity; Contact; Profile; Usage; Marketing &amp; Comms; Technical</td>
                    <td>Legitimate interests (develop services and inform marketing strategy)</td>
                  </tr>
                  <tr>
                    <td>Use analytics to improve site, products, marketing and customer experience</td>
                    <td>Technical; Usage</td>
                    <td>Legitimate interests (keep site relevant and develop business)</td>
                  </tr>
                  <tr>
                    <td>Suggestions/recommendations about goods/services that may interest you</td>
                    <td>Identity; Contact; Technical; Usage; Profile; Marketing &amp; Comms</td>
                    <td>Legitimate interests (develop services and grow business)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Marketing</h3>
            <p>We strive to give you choices around marketing. You'll receive marketing if you requested information, purchased from us, or entered a promotion, unless you opt out.</p>

            <h3>Third-party marketing</h3>
            <p>We'll get your express opt-in consent before sharing your data with third parties for their marketing.</p>

            <h3>Opting out</h3>
            <p>You can stop marketing messages at any time via the unsubscribe link in emails or by contacting us.</p>

            <h3>Cookies</h3>
            <p>You can set your browser to refuse all/ some cookies, or alert you when websites set cookies. Parts of our site may not function without cookies. See our <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.</p>

            <h3>Change of purpose</h3>
            <p>We'll use your data only for the purposes collected unless we reasonably consider we need to use it for a compatible purpose. For unrelated purposes we'll explain the legal basis and, where required, seek consent.</p>
          </section>

          <section>
            <h2>Sharing Your Personal Information</h2>
            <p>We may share your data with:</p>
            <ul className="privacy-list">
              <li>Management service partners (e.g., The Midcounties Co-operative Group) providing administrative services/reporting.</li>
              <li>Travel companies, airlines, hotels, insurers and others involved in performing your contract.</li>
              <li>Regulatory bodies (e.g., Civil Aviation Authority, ABTA) and government authorities (immigration, border control, security, anti-terrorism).</li>
              <li>Foreign exchange providers, print/mailing/distribution vendors, identity/address verification providers, research partners.</li>
              <li>Crime prevention bodies (e.g., National Crime Agency for AML), payment processors/financial organisations.</li>
              <li>Professional advisers (lawyers, bankers, auditors, insurers).</li>
              <li>Business purchasers/merger partners (who may use data as set out in this notice).</li>
            </ul>

            <h3>International transfers</h3>
            <p>To perform your contract we may need to transfer data outside the EEA/UK (e.g., to airlines, hotels, transfer providers). We try to ensure adequate protection is in place for such transfers.</p>
          </section>

          <section>
            <h2>Keeping Your Information Secure</h2>
            <p>We use appropriate security measures to prevent unauthorised access, loss or disclosure. Payment transactions use SSL encryption. If you have a password for parts of our site, please keep it confidential. We have procedures for suspected data breaches and will notify you/authorities where legally required.</p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <h3>How long will you use my personal data for?</h3>
            <p>We keep personal data only as long as necessary to fulfil the purposes collected, including legal, accounting or reporting requirements. Details of retention periods are available on request.</p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>By law you may have the right to request: <strong>access</strong>, <strong>correction</strong>, <strong>erasure</strong>, <strong>restriction</strong>, <strong>objection</strong> (where we rely on legitimate interests) and <strong>data portability</strong>. To exercise these, contact the Data Protection Manager.</p>

            <h3>No fee usually required</h3>
            <p>Access requests are normally free. We may charge a reasonable fee or refuse to act if a request is unfounded or excessive.</p>

            <h3>What we may need from you</h3>
            <p>We may need information to confirm your identity and ensure your right to access (or exercise other rights). This helps prevent unauthorised disclosure.</p>

            <h3>Time limit to respond</h3>
            <p>We aim to respond within one month. Complex or multiple requests may take longer; we'll keep you informed.</p>

            <h3>Complaints to the regulator</h3>
            <p>You can contact the UK ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>, 0303&nbsp;123&nbsp;1113, or by post: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, SK9 5AF.</p>
          </section>
        </article>
      </div>
    </main>
  );
}

export default PrivacyPolicy;

