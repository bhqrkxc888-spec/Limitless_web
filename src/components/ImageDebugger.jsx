/**
 * Image Debugger Component
 * Dev-only tool for QA of Admin→Site image mapping
 * 
 * Usage: Add ?debugImages=1 to any page URL
 * Or navigate to /debug/images (if route added)
 */

import { useState, useEffect, useCallback } from 'react';
import { getImageResolutionLog, getImageResolutionStats, clearImageResolutionLog } from '../utils/imageResolver';
import './ImageDebugger.css';

function ImageDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [log, setLog] = useState([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, empty: 0, invalid: 0 });
  const [filter, setFilter] = useState('all'); // 'all', 'invalid', 'empty'
  const [autoRefresh, setAutoRefresh] = useState(true);

  const updateLog = useCallback(() => {
    setLog(getImageResolutionLog());
    setStats(getImageResolutionStats());
  }, []);

  useEffect(() => {
    // Check if dev mode and debugImages query param is present
    const isDev = import.meta.env?.DEV;
    const params = new URLSearchParams(window.location.search);
    const shouldShow = isDev && params.get('debugImages') === '1';
    
    setIsVisible(shouldShow);
    
    if (!shouldShow) return;
    
    // Initial load
    updateLog();
    
    // Auto-refresh every 2 seconds if enabled
    let interval;
    if (autoRefresh) {
      interval = setInterval(updateLog, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, updateLog]);
  
  const handleClear = () => {
    clearImageResolutionLog();
    updateLog();
  };
  
  const handleRefresh = () => {
    updateLog();
  };
  
  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };
  
  if (!isVisible) return null;
  
  // Filter log entries
  const filteredLog = log.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'invalid') return entry.status === 'invalid';
    if (filter === 'empty') return entry.status === 'empty';
    return true;
  });
  
  return (
    <div className="image-debugger">
      <div className="image-debugger-header">
        <h3>🔍 Image Resolution Debugger</h3>
        <div className="image-debugger-controls">
          <button onClick={handleRefresh} className="btn-debug">
            🔄 Refresh
          </button>
          <button onClick={handleToggleAutoRefresh} className={`btn-debug ${autoRefresh ? 'active' : ''}`}>
            {autoRefresh ? '⏸ Pause' : '▶ Auto'}
          </button>
          <button onClick={handleClear} className="btn-debug btn-clear">
            🗑 Clear Log
          </button>
        </div>
      </div>
      
      <div className="image-debugger-stats">
        <div className="stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat stat-success">
          <span className="stat-label">Resolved:</span>
          <span className="stat-value">{stats.resolved}</span>
        </div>
        <div className="stat stat-warning">
          <span className="stat-label">Empty:</span>
          <span className="stat-value">{stats.empty}</span>
        </div>
        <div className="stat stat-error">
          <span className="stat-label">Invalid:</span>
          <span className="stat-value">{stats.invalid}</span>
        </div>
      </div>
      
      <div className="image-debugger-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({log.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'invalid' ? 'active' : ''}`}
          onClick={() => setFilter('invalid')}
        >
          Invalid ({log.filter(e => e.status === 'invalid').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'empty' ? 'active' : ''}`}
          onClick={() => setFilter('empty')}
        >
          Empty ({log.filter(e => e.status === 'empty').length})
        </button>
      </div>
      
      <div className="image-debugger-log">
        {filteredLog.length === 0 ? (
          <div className="no-entries">
            {filter === 'all' 
              ? 'No image resolutions yet. Navigate pages to populate log.' 
              : `No ${filter} entries.`
            }
          </div>
        ) : (
          filteredLog.map((entry, index) => (
            <div key={index} className={`log-entry log-entry-${entry.status}`}>
              <div className="log-entry-header">
                <span className="log-entry-status">{entry.status}</span>
                <span className="log-entry-time">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="log-entry-entity">
                <strong>{entry.entityType}</strong> / {entry.entityId} / <em>{entry.imageType}</em>
              </div>
              <div className="log-entry-value">
                <span className="label">Raw:</span>
                <code>{entry.rawValue || '(empty)'}</code>
              </div>
              <div className="log-entry-value">
                <span className="label">Resolved:</span>
                <code>{entry.resolvedValue}</code>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ImageDebugger;

