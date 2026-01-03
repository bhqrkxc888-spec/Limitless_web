import './FormFields.css';

/**
 * ExistingCustomerCheckbox - Reusable checkbox for identifying existing customers
 * Used across all enquiry forms
 */
function ExistingCustomerCheckbox({ formData, onChange, disabled = false }) {
  return (
    <div className="form-group">
      <label className="form-checkbox-label">
        <input
          type="checkbox"
          name="existing_customer"
          className="form-checkbox"
          checked={formData.existing_customer || false}
          onChange={onChange}
          disabled={disabled}
          aria-label="I'm an existing Limitless Cruises customer"
        />
        <span>I'm an existing Limitless Cruises customer</span>
      </label>
      <span className="form-help" style={{ marginTop: '0.25rem', display: 'block', paddingLeft: '1.75rem' }}>
        Check this if you've booked with us before
      </span>
    </div>
  );
}

export default ExistingCustomerCheckbox;

