/**
 * HoneypotField - Hidden field for spam prevention
 * Bots typically fill all fields, humans won't see/fill this
 * Server should reject if this field has a value
 */
function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="website"
      value={value || ''}
      onChange={onChange}
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none'
      }}
      tabIndex="-1"
      autoComplete="off"
      aria-hidden="true"
    />
  );
}

export default HoneypotField;

