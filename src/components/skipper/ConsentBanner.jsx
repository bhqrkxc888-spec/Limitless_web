import { useNavigate } from 'react-router-dom';
import './ConsentBanner.css';

function ConsentBanner({ onAccept }) {
  const navigate = useNavigate();

  return (
    <div className="consent-banner">
      <div className="consent-content">
        <h2>🤖 Chat with The Skipper</h2>
        
        <div className="consent-info">
          <p><strong>By using this chat:</strong></p>
          <ul>
            <li>✅ Your conversation helps us create your perfect package</li>
            <li>✅ You'll provide contact details to receive your quote</li>
            <li>✅ Conversations are NOT saved after enquiry submission</li>
            <li>✅ Your enquiry is sent securely to our team (GDPR compliant)</li>
            <li>⚠️ This is NOT a booking system - prices/availability confirmed by our team</li>
          </ul>
        </div>

        <div className="consent-disclaimer">
          <p><small>
            <strong>Disclaimer:</strong> The Skipper provides general travel advice. 
            Final prices, availability, and arrangements confirmed by Limitless Cruises.
          </small></p>
        </div>

        <div className="consent-buttons">
          <button onClick={onAccept} className="btn-accept">
            Start Chat
          </button>
          <button onClick={() => navigate('/concierge')} className="btn-form">
            Use Form Instead
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;

