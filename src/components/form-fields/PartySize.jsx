import { useState } from 'react';
import './FormFields.css';

/**
 * PartySize - Reusable party size fields (adults, children, children ages)
 * Used in bucket list and package concierge forms
 */
function PartySize({ formData, onChange, errors = {}, disabled = false, showChildrenAges = true }) {
  const adults = formData.adults || 2;
  const children = formData.children || 0;
  const childrenAges = formData.children_ages || [];

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    onChange({
      target: {
        name: 'adults',
        value: Math.max(1, Math.min(20, value))
      }
    });
  };

  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const newValue = Math.max(0, Math.min(10, value));
    
    onChange({
      target: {
        name: 'children',
        value: newValue
      }
    });

    // Reset children ages if children count reduced
    if (newValue < childrenAges.length) {
      onChange({
        target: {
          name: 'children_ages',
          value: childrenAges.slice(0, newValue)
        }
      });
    }
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = parseInt(age) || 0;
    onChange({
      target: {
        name: 'children_ages',
        value: newAges
      }
    });
  };

  return (
    <div className="form-section">
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="adults" className="form-label">
            Adults (18+) <span className="required" aria-label="required">*</span>
          </label>
          <input
            type="number"
            id="adults"
            name="adults"
            className="form-input form-input-number"
            value={adults}
            onChange={handleAdultsChange}
            min="1"
            max="20"
            required
            disabled={disabled}
            aria-required="true"
            aria-describedby="adults-help"
          />
          <span id="adults-help" className="form-help">
            Number of adults traveling
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="children" className="form-label">
            Children (0-17)
          </label>
          <input
            type="number"
            id="children"
            name="children"
            className="form-input form-input-number"
            value={children}
            onChange={handleChildrenChange}
            min="0"
            max="10"
            disabled={disabled}
            aria-describedby="children-help"
          />
          <span id="children-help" className="form-help">
            Number of children traveling
          </span>
        </div>
      </div>

      {showChildrenAges && children > 0 && (
        <div className="form-group">
          <label className="form-label">
            Children's Ages <span className="required" aria-label="required">*</span>
          </label>
          <div className="children-ages-grid">
            {Array.from({ length: children }).map((_, index) => (
              <div key={index} className="child-age-input">
                <label htmlFor={`child-age-${index}`} className="form-label-small">
                  Child {index + 1}
                </label>
                <input
                  type="number"
                  id={`child-age-${index}`}
                  className="form-input form-input-number"
                  value={childrenAges[index] || ''}
                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
                  min="0"
                  max="17"
                  required
                  disabled={disabled}
                  aria-label={`Age of child ${index + 1}`}
                  placeholder="Age"
                />
              </div>
            ))}
          </div>
          <span className="form-help">
            Enter the age of each child at the time of travel
          </span>
        </div>
      )}
    </div>
  );
}

export default PartySize;

