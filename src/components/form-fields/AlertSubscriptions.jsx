import './FormFields.css';

/**
 * AlertSubscriptions - Reusable alert subscription checkboxes
 * Allows customers to opt-in to deal notifications for specific years
 */
function AlertSubscriptions({ formData, onChange, disabled = false, includeLuxury = false }) {
  const subscriptions = formData.alert_subscriptions || [];

  const handleToggle = (year) => {
    const newSubscriptions = subscriptions.includes(year)
      ? subscriptions.filter(y => y !== year)
      : [...subscriptions, year];
    
    onChange({
      target: {
        name: 'alert_subscriptions',
        value: newSubscriptions
      }
    });
  };

  return (
    <div className="form-group">
      <fieldset className="form-fieldset">
        <legend className="form-label">
          Keep Me Updated (Optional)
        </legend>
        <p className="form-help" style={{ marginBottom: '0.75rem' }}>
          Get notified when we have deals matching your preferences:
        </p>
        
        <div className="form-checkbox-group">
          <label className="form-checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={subscriptions.includes('2026')}
              onChange={() => handleToggle('2026')}
              disabled={disabled}
              aria-label="Email me about 2026 cruises"
            />
            <span>Email me when deals match my plans for 2026</span>
          </label>

          <label className="form-checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={subscriptions.includes('2027')}
              onChange={() => handleToggle('2027')}
              disabled={disabled}
              aria-label="Email me about 2027 cruises"
            />
            <span>Email me when deals match my plans for 2027</span>
          </label>

          <label className="form-checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={subscriptions.includes('2028')}
              onChange={() => handleToggle('2028')}
              disabled={disabled}
              aria-label="Email me about 2028 cruises"
            />
            <span>Email me when deals match my plans for 2028</span>
          </label>

          {includeLuxury && (
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={subscriptions.includes('luxury_last_minute')}
                onChange={() => handleToggle('luxury_last_minute')}
                disabled={disabled}
                aria-label="Email me about luxury last-minute deals"
              />
              <span>Email me about luxury last-minute deals</span>
            </label>
          )}
        </div>
      </fieldset>
    </div>
  );
}

export default AlertSubscriptions;

