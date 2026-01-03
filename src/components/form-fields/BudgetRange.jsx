import './FormFields.css';

/**
 * BudgetRange - Reusable budget range selector
 * Used in bucket list and package concierge forms
 */
function BudgetRange({ formData, onChange, errors = {}, disabled = false, helpText = null }) {
  const budgetOptions = [
    { value: 'under-10k', label: 'Under £10k' },
    { value: '10-15k', label: '£10-15k' },
    { value: '15-20k', label: '£15-20k' },
    { value: '20-30k', label: '£20-30k' },
    { value: '30k-plus', label: '£30k+' },
    { value: 'prefer-discuss', label: 'Prefer to discuss' }
  ];

  return (
    <div className="form-group">
      <label htmlFor="budget_range" className="form-label">
        Budget Range <span className="required" aria-label="required">*</span>
      </label>
      <select
        id="budget_range"
        name="budget_range"
        className={`form-select ${errors.budget_range ? 'form-input-error' : ''}`}
        value={formData.budget_range || ''}
        onChange={onChange}
        required
        disabled={disabled}
        aria-required="true"
        aria-invalid={!!errors.budget_range}
        aria-describedby={helpText ? 'budget-help' : errors.budget_range ? 'budget-error' : undefined}
      >
        <option value="">Select your budget range...</option>
        {budgetOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <span id="budget-help" className="form-help">
          {helpText}
        </span>
      )}
      {errors.budget_range && (
        <span id="budget-error" className="form-error" role="alert">
          {errors.budget_range}
        </span>
      )}
    </div>
  );
}

export default BudgetRange;

