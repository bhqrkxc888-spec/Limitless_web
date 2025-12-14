import SEO from '../components/SEO';
import './CookiePolicy.css';

function CookiePolicy() {
  return (
    <main className="cookie-policy-page">
      <SEO
        title="Cookie Policy"
        description="Learn about how Limitless Cruises uses cookies on our website to enhance your browsing experience."
        canonical="https://limitlesscruises.com/cookie-policy"
        noindex={false}
      />

      <div className="cookie-policy-header">
        <div className="container">
          <h1>Cookie Policy</h1>
          <p className="cookie-policy-intro">
            This Cookie Policy explains how Limitless Cruises uses cookies and similar technologies 
            on our website to recognise you when you visit and how we use that information.
          </p>
        </div>
      </div>

      <div className="container">
        <article className="cookie-policy-content">
          <section>
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p>
              Cookies allow a website to recognise your device and store some information about your preferences or past actions.
            </p>
          </section>

          <section>
            <h2>How We Use Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website, including:
            </p>
            <ul>
              <li>Remembering your preferences and settings</li>
              <li>Understanding how you use our website</li>
              <li>Improving our website's functionality and performance</li>
              <li>Providing personalised content and recommendations</li>
            </ul>
          </section>

          <section>
            <h2>Types of Cookies We Use</h2>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality 
              such as security, network management, and accessibility. You cannot opt-out of these cookies.
            </p>
            <ul>
              <li><strong>Session cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
              <li><strong>Security cookies:</strong> Help protect against fraud and maintain security</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting 
              information anonymously. This helps us improve the website's performance and user experience.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Tracks website usage and visitor behaviour (if enabled)</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalisation. They may be set by us or by 
              third-party providers whose services we have added to our pages.
            </p>
            <ul>
              <li><strong>Preference cookies:</strong> Remember your choices and preferences</li>
              <li><strong>Cookie consent:</strong> Remember your cookie preferences</li>
            </ul>

            <h3>Third-Party Cookies</h3>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
            </p>
            <ul>
              <li><strong>Widgety:</strong> Cruise search functionality (Find a Cruise page)</li>
              <li><strong>Google Maps/Places:</strong> Location and attraction information (if enabled)</li>
              <li><strong>Weather APIs:</strong> Weather and sea condition data (if enabled)</li>
            </ul>
          </section>

          <section>
            <h2>Managing Your Cookie Preferences</h2>
            <p>
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking 
              cookies can impact your user experience and parts of our website may no longer be fully accessible.
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to refuse or accept cookies. You can also delete cookies that have already 
              been set. The methods for doing so vary from browser to browser. Please refer to your browser's help 
              menu for instructions:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>

            <h3>Cookie Consent Banner</h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner. You can choose to accept or reject 
              non-essential cookies. Your preference will be saved for future visits.
            </p>
            <p>
              You can change your cookie preferences at any time by clearing your browser cookies or contacting us.
            </p>
          </section>

          <section>
            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed 
              about our use of cookies.
            </p>
            <p>
              <strong>Last updated:</strong> December 2024
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:travel@limitlesscruises.com">travel@limitlesscruises.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:01143213208">0114 321 3208</a></li>
              <li><strong>Data Protection Manager:</strong> <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}

export default CookiePolicy;

