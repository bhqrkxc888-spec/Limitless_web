import { useState } from 'react';
import './Accordion.css';

/**
 * Accordion Component
 * Collapsible content sections with smooth animations
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of { id, title, content } objects
 * @param {boolean} props.allowMultiple - Allow multiple items open at once
 * @param {string} props.defaultOpen - ID of item to open by default
 * @param {string} props.variant - 'default' | 'bordered' | 'separated'
 */
function Accordion({ 
  items = [], 
  allowMultiple = false, 
  defaultOpen = null,
  variant = 'default' 
}) {
  const [openItems, setOpenItems] = useState(
    defaultOpen ? [defaultOpen] : []
  );

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  const isOpen = (id) => openItems.includes(id);

  return (
    <div className={`accordion accordion-${variant}`}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`accordion-item ${isOpen(item.id) ? 'is-open' : ''}`}
        >
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleItem(item.id)}
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="accordion-title">{item.title}</span>
            <svg 
              className="accordion-chevron" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </button>
          
          <div 
            id={`accordion-content-${item.id}`}
            className="accordion-content"
            aria-hidden={!isOpen(item.id)}
          >
            <div className="accordion-body">
              {typeof item.content === 'string' ? (
                <p>{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;

