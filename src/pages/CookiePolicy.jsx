import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<h1>Cookie Policy</h1>

<p>This Cookie Policy explains how <strong>Limitless Cruises Ltd</strong> uses cookies and similar technologies on our website.</p>

<h2>What Are Cookies?</h2>
<p>
  Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
</p>

<h2>Types of Cookies We Use</h2>

<p><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</p>

<p><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</p>

<p><strong>Functionality Cookies:</strong> Remember your preferences and personalize your experience.</p>

<p><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</p>

<h2>Cookie Expiry</h2>
<p>Essential cookies expire when you close your browser. Performance, functionality and marketing cookies expire after 12 months, after which we will ask for your consent again.</p>

<h2>Third-Party Services</h2>
<p>We use the following third-party services that may set cookies:</p>
<ul>
  <li><strong>Google Analytics:</strong> Tracks website usage (anonymised data)</li>
  <li><strong>Cloudflare:</strong> Security and performance (essential)</li>
  <li><strong>Supabase:</strong> Database and storage (essential)</li>
</ul>

<h2>Managing Cookies</h2>
<p>You can control cookies through your browser settings:</p>
<ul>
  <li>Accept or reject cookies</li>
  <li>Delete existing cookies</li>
  <li>Set preferences for different types</li>
</ul>
<p><strong>Note:</strong> Blocking cookies may affect website functionality.</p>
<p>You can also change your cookie preferences at any time using our <a href="/cookie-settings">Cookie Settings</a> page.</p>

<h2>Contact</h2>
<p>
  For questions about our use of cookies, contact <a href="mailto:travel@limitlesscruises.com">travel@limitlesscruises.com</a>
</p>
`;

function CookiePolicy() {
  return (
    <LegalPageTemplate
      fallbackTitle="Cookie Policy"
      fallbackDescription="Learn about how Limitless Cruises uses cookies and similar technologies on our website. Manage your cookie preferences."
      fallbackContent={fallbackContent}
    />
  );
}

export default CookiePolicy;
