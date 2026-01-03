import './ProgressIndicator.css';

function ProgressIndicator({ collectedData }) {
  const fields = [
    { key: 'destinations', label: 'Destination', icon: '📍' },
    { key: 'timeframe', label: 'When', icon: '📅' },
    { key: 'travelers', label: 'Travelers', icon: '👥' },
    { key: 'budget', label: 'Budget', icon: '💰' },
    { key: 'name', label: 'Name', icon: '✍️' },
    { key: 'email', label: 'Email', icon: '📧' },
  ];

  const hasValue = (key) => {
    const value = collectedData[key];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value.toString().trim().length > 0;
  };

  return (
    <div className="progress-indicator">
      <h3>Progress</h3>
      <div className="progress-list">
        {fields.map(field => (
          <div 
            key={field.key} 
            className={`progress-item ${hasValue(field.key) ? 'completed' : 'pending'}`}
          >
            <span className="progress-icon">
              {hasValue(field.key) ? '✅' : '⏳'}
            </span>
            <span className="progress-label">
              {field.icon} {field.label}
            </span>
            {hasValue(field.key) && (
              <div className="progress-value">
                {Array.isArray(collectedData[field.key]) 
                  ? collectedData[field.key].join(', ')
                  : collectedData[field.key]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;

