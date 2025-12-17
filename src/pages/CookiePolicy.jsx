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

<h2>Managing Cookies</h2>
<p>You can control cookies through your browser settings:</p>
<ul>
  <li>Accept or reject cookies</li>
  <li>Delete existing cookies</li>
  <li>Set preferences for different types</li>
</ul>
<p><strong>Note:</strong> Blocking cookies may affect website functionality.</p>

<h2>Third-Party Cookies</h2>
<p>We use third-party services that may set their own cookies:</p>
<ul>
  <li>Google Analytics</li>
  <li>Social media platforms</li>
  <li>Payment processors</li>
</ul>

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
