/**
 * Status Indicator Component
 * 
 * Displays validation status with icon and optional warnings list
 * Used throughout admin image management interface
 */

import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import './StatusIndicator.css';

function StatusIndicator({ status, warnings = [], showDetails = false, size = 'medium' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pass':
      case 'complete':
        return {
          icon: CheckCircle,
          className: 'status-pass',
          label: 'Compliant',
          color: 'var(--color-success, #10b981)'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          className: 'status-warning',
          label: 'Warnings',
          color: 'var(--color-warning, #f59e0b)'
        };
      case 'error':
      case 'missing':
        return {
          icon: XCircle,
          className: 'status-error',
          label: status === 'missing' ? 'Missing' : 'Error',
          color: 'var(--color-error, #ef4444)'
        };
      case 'optional':
      case 'info':
        return {
          icon: HelpCircle,
          className: 'status-optional',
          label: 'Optional',
          color: 'var(--color-gray-400, #6b7280)'
        };
      default:
        return {
          icon: HelpCircle,
          className: 'status-unknown',
          label: 'Unknown',
          color: 'var(--color-gray-400, #9ca3af)'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const iconSize = size === 'small' ? 13 : size === 'large' ? 32 : 24;

  return (
    <div className={`status-indicator status-${size} ${config.className}`}>
      <div className="status-icon-wrapper">
        <Icon size={iconSize} className="status-icon" />
        <span className="status-label">{config.label}</span>
      </div>
      
      {showDetails && warnings && warnings.length > 0 && (
        <div className="status-warnings">
          <ul className="warnings-list">
            {warnings.map((warning, index) => (
              <li 
                key={index} 
                className={`warning-item warning-${warning.severity || 'warning'}`}
              >
                <AlertTriangle size={14} />
                <span>{warning.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StatusIndicator;

