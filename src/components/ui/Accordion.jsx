import { useState } from 'react';
import './Accordion.css';

/**
 * Accordion Component
 * Collapsible content sections with smooth animations
 * 
 * Supports two usage patterns:
 * 1. Array of items: <Accordion items={[...]} />
 * 2. Single item with title/children: <Accordion title="...">content</Accordion>
 */
function Accordion({ 
  items, 
  title,
  children,
  allowMultiple = false, 
  defaultOpen = false,
  variant = 'default' 
}) {
  // State must be declared at the top level before any conditionals
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [openItems, setOpenItems] = useState(
    defaultOpen && items?.[0]?.id ? [items[0].id] : []
  );
  
  // Single item mode (title + children)
  if (title && !items) {
    return (
      <div className={`accordion accordion-${variant}`}>
        <div className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="accordion-title">{title}</span>
            <svg 
              className="accordion-chevron" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </button>
          
          <div 
            className="accordion-content"
            aria-hidden={!isOpen}
          >
            <div className="accordion-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multi-item mode (items array)

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

  const isItemOpen = (id) => openItems.includes(id);

  return (
    <div className={`accordion accordion-${variant}`}>
      {(items || []).map((item) => (
        <div 
          key={item.id} 
          className={`accordion-item ${isItemOpen(item.id) ? 'is-open' : ''}`}
        >
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleItem(item.id)}
            aria-expanded={isItemOpen(item.id)}
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
            aria-hidden={!isItemOpen(item.id)}
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

