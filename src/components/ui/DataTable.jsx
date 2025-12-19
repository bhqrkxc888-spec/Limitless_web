import './DataTable.css';

/**
 * DataTable Component
 * Responsive tables with modern styling
 * 
 * @param {Object} props
 * @param {Array} props.columns - Array of { key, label, align?, width? } objects
 * @param {Array} props.rows - Array of data objects matching column keys
 * @param {string} props.variant - 'default' | 'striped' | 'bordered'
 * @param {boolean} props.compact - Use smaller padding
 * @param {string} props.caption - Optional table caption for accessibility
 */
function DataTable({ 
  columns = [], 
  rows = [], 
  variant = 'striped',
  compact = false,
  caption = null
}) {
  return (
    <div className="table-wrapper">
      <table className={`data-table data-table-${variant} ${compact ? 'data-table-compact' : ''}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                style={{ 
                  textAlign: col.align || 'left',
                  width: col.width || 'auto'
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((col) => (
                <td 
                  key={col.key}
                  style={{ textAlign: col.align || 'left' }}
                  data-label={col.label}
                >
                  {typeof row[col.key] === 'object' && row[col.key] !== null ? (
                    row[col.key]
                  ) : (
                    row[col.key] ?? '-'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

