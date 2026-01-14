import './SkipperInfo.css';

/**
 * SkipperInfo - Modal showing detailed information about Captain Cruise
 */
function SkipperInfo({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="skipper-info-overlay" onClick={onClose}>
      <div className="skipper-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        
        <div className="modal-header">
          <span className="modal-icon">⛴️</span>
          <h2>About Captain Cruise</h2>
        </div>

        <div className="modal-content">
          <section className="info-section">
            <h3>🤖 What is Captain Cruise?</h3>
            <p>
              Captain Cruise is your personal AI assistant for Limitless Cruises. Available 24/7, 
              I help you explore cruise options and gather your preferences at your own pace.
            </p>
          </section>

          <section className="info-section">
            <h3>✨ How It Works</h3>
            <ul>
              <li>Chat naturally about your cruise requirements</li>
              <li>I'll learn your preferences, budget, and requirements</li>
              <li>Your conversation is summarised and sent to your personal cruise consultant</li>
              <li>Your consultant will contact you with tailored options</li>
            </ul>
          </section>

          <section className="info-section">
            <h3>🎯 Here to Assist, Not Replace</h3>
            <p>
              Limitless Cruises is built on personal, expert service. Captain Cruise assists your consultant 
              by giving you the flexibility to explore at your own pace before speaking with someone.
            </p>
            <p>
              Your personal cruise consultant is always available when you're ready to speak directly 
              – just ask at any point and we'll arrange a call.
            </p>
          </section>

          <section className="info-section">
            <h3>🔒 Your Privacy</h3>
            <p>
              Your conversation is private and secure. We only use it to understand your requirements 
              and provide better service. You can review what we've discussed in the summary panel.
            </p>
          </section>

          <section className="info-section">
            <h3>📞 Prefer to Speak Directly?</h3>
            <p>
              Call us anytime at <strong>0114 321 3208</strong> or click "Switch to Form" to use 
              our traditional enquiry form instead.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SkipperInfo;

