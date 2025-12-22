/**
 * Admin Lighthouse Page
 * 
 * View Lighthouse audit results and run new audits
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gauge,
  Smartphone,
  Monitor,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminLighthouse() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [strategy, setStrategy] = useState('desktop');
  const [selectedResult, setSelectedResult] = useState(null);

  const fetchResults = useCallback(async () => {
    if (!supabase) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('website_lighthouse')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      setResults(data || []);
      if (data && data.length > 0 && !selectedResult) {
        setSelectedResult(data[0]);
      }
    } catch (error) {
      console.error('Error fetching Lighthouse results:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedResult]);

  const runLighthouse = async () => {
    setIsRunning(true);
    
    try {
      const response = await fetch('/api/admin/lighthouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://www.limitlesscruises.com',
          strategy: strategy
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to run Lighthouse');
      }

      const result = await response.json();
      
      // Refresh results
      await fetchResults();
      
      // Select the new result
      if (result.id) {
        const { data } = await supabase
          .from('website_lighthouse')
          .select('*')
          .eq('id', result.id)
          .single();
        
        if (data) {
          setSelectedResult(data);
        }
      }
    } catch (error) {
      console.error('Error running Lighthouse:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchResults();
  }, [isAuthenticated, authLoading, navigate, fetchResults]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle size={20} />;
    if (score >= 50) return <AlertCircle size={20} />;
    return <AlertCircle size={20} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || isLoading) {
    return (
      <AdminLayout onLogout={logout}>
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading Lighthouse results...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      onLogout={logout}
      onRefresh={fetchResults}
      isRefreshing={isLoading}
    >
      <div className="admin-lighthouse">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Lighthouse Audits</h1>
            <p className="admin-page-subtitle">
              Performance, accessibility, best practices, and SEO scores
            </p>
          </div>
          <div className="admin-lighthouse-actions">
            <select 
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="admin-select"
              disabled={isRunning}
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
            <button
              onClick={runLighthouse}
              disabled={isRunning}
              className="btn btn-primary"
            >
              {isRunning ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  Running...
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Run Audit
                </>
              )}
            </button>
          </div>
        </header>

        {results.length === 0 ? (
          <div className="admin-empty-state">
            <Gauge size={48} />
            <h2>No Lighthouse results yet</h2>
            <p>Run your first audit to see performance scores</p>
            <button onClick={runLighthouse} className="btn btn-primary" disabled={isRunning}>
              <Zap size={16} />
              Run First Audit
            </button>
          </div>
        ) : (
          <div className="admin-lighthouse-content">
            {/* Results List */}
            <div className="admin-lighthouse-sidebar">
              <h3>Recent Audits</h3>
              <div className="admin-lighthouse-list">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`admin-lighthouse-item ${
                      selectedResult?.id === result.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedResult(result)}
                  >
                    <div className="admin-lighthouse-item-header">
                      <div className="admin-lighthouse-item-strategy">
                        {result.strategy === 'desktop' ? (
                          <Monitor size={14} />
                        ) : (
                          <Smartphone size={14} />
                        )}
                        <span>{result.strategy}</span>
                      </div>
                      <div className="admin-lighthouse-item-date">
                        {formatDate(result.created_at)}
                      </div>
                    </div>
                    <div className="admin-lighthouse-item-scores">
                      <div className={`admin-lighthouse-score ${getScoreColor(result.performance_score)}`}>
                        <span>P</span>
                        {result.performance_score}
                      </div>
                      <div className={`admin-lighthouse-score ${getScoreColor(result.accessibility_score)}`}>
                        <span>A</span>
                        {result.accessibility_score}
                      </div>
                      <div className={`admin-lighthouse-score ${getScoreColor(result.best_practices_score)}`}>
                        <span>BP</span>
                        {result.best_practices_score}
                      </div>
                      <div className={`admin-lighthouse-score ${getScoreColor(result.seo_score)}`}>
                        <span>SEO</span>
                        {result.seo_score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Result Details */}
            {selectedResult && (
              <div className="admin-lighthouse-details">
                <div className="admin-lighthouse-details-header">
                  <div>
                    <h2>
                      {selectedResult.strategy === 'desktop' ? (
                        <Monitor size={20} />
                      ) : (
                        <Smartphone size={20} />
                      )}
                      {selectedResult.strategy.charAt(0).toUpperCase() + selectedResult.strategy.slice(1)} Audit
                    </h2>
                    <p className="admin-lighthouse-details-date">
                      {formatDate(selectedResult.created_at)}
                    </p>
                  </div>
                </div>

                {/* Scores Grid */}
                <div className="admin-lighthouse-scores-grid">
                  <div className={`admin-lighthouse-score-card ${getScoreColor(selectedResult.performance_score)}`}>
                    <div className="admin-lighthouse-score-header">
                      {getScoreIcon(selectedResult.performance_score)}
                      <span>Performance</span>
                    </div>
                    <div className="admin-lighthouse-score-value">
                      {selectedResult.performance_score}
                    </div>
                  </div>

                  <div className={`admin-lighthouse-score-card ${getScoreColor(selectedResult.accessibility_score)}`}>
                    <div className="admin-lighthouse-score-header">
                      {getScoreIcon(selectedResult.accessibility_score)}
                      <span>Accessibility</span>
                    </div>
                    <div className="admin-lighthouse-score-value">
                      {selectedResult.accessibility_score}
                    </div>
                  </div>

                  <div className={`admin-lighthouse-score-card ${getScoreColor(selectedResult.best_practices_score)}`}>
                    <div className="admin-lighthouse-score-header">
                      {getScoreIcon(selectedResult.best_practices_score)}
                      <span>Best Practices</span>
                    </div>
                    <div className="admin-lighthouse-score-value">
                      {selectedResult.best_practices_score}
                    </div>
                  </div>

                  <div className={`admin-lighthouse-score-card ${getScoreColor(selectedResult.seo_score)}`}>
                    <div className="admin-lighthouse-score-header">
                      {getScoreIcon(selectedResult.seo_score)}
                      <span>SEO</span>
                    </div>
                    <div className="admin-lighthouse-score-value">
                      {selectedResult.seo_score}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="admin-lighthouse-metrics">
                  <h3>Core Web Vitals</h3>
                  <div className="admin-lighthouse-metrics-grid">
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">LCP</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.lcp ? `${(selectedResult.lcp / 1000).toFixed(2)}s` : '-'}
                      </div>
                      <div className="admin-lighthouse-metric-status">
                        {selectedResult.lcp <= 2500 ? 'Good' : selectedResult.lcp <= 4000 ? 'Needs improvement' : 'Poor'}
                      </div>
                    </div>
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">FID</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.fid ? `${selectedResult.fid.toFixed(0)}ms` : '-'}
                      </div>
                      <div className="admin-lighthouse-metric-status">
                        {selectedResult.fid <= 100 ? 'Good' : selectedResult.fid <= 300 ? 'Needs improvement' : 'Poor'}
                      </div>
                    </div>
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">CLS</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.cls ? selectedResult.cls.toFixed(3) : '-'}
                      </div>
                      <div className="admin-lighthouse-metric-status">
                        {selectedResult.cls <= 0.1 ? 'Good' : selectedResult.cls <= 0.25 ? 'Needs improvement' : 'Poor'}
                      </div>
                    </div>
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">FCP</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.fcp ? `${(selectedResult.fcp / 1000).toFixed(2)}s` : '-'}
                      </div>
                    </div>
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">Speed Index</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.speed_index ? `${(selectedResult.speed_index / 1000).toFixed(2)}s` : '-'}
                      </div>
                    </div>
                    <div className="admin-lighthouse-metric">
                      <div className="admin-lighthouse-metric-label">TBT</div>
                      <div className="admin-lighthouse-metric-value">
                        {selectedResult.tbt ? `${selectedResult.tbt.toFixed(0)}ms` : '-'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CLS Analysis */}
                {selectedResult.cls > 0.1 && (
                  <div className="admin-lighthouse-cls-analysis">
                    <h3>⚠️ Layout Shift Issues (CLS: {selectedResult.cls.toFixed(3)})</h3>
                    <p className="admin-lighthouse-cls-description">
                      Your CLS is above the recommended 0.1 threshold. This means elements are shifting after the page loads, 
                      which creates a poor user experience. Common causes:
                    </p>
                    <div className="admin-lighthouse-cls-causes">
                      <div className="admin-lighthouse-cls-cause">
                        <strong>• Images without dimensions</strong>
                        <p>Add explicit width/height attributes to all images</p>
                      </div>
                      <div className="admin-lighthouse-cls-cause">
                        <strong>• Dynamic content loading</strong>
                        <p>Reserve space for ads, embeds, and dynamic content</p>
                      </div>
                      <div className="admin-lighthouse-cls-cause">
                        <strong>• Web fonts causing FOIT/FOUT</strong>
                        <p>Use font-display: swap and preload fonts</p>
                      </div>
                      <div className="admin-lighthouse-cls-cause">
                        <strong>• Footer min-height may need adjustment</strong>
                        <p>Check Footer.css min-height settings for different screen sizes</p>
                      </div>
                    </div>
                    <div className="admin-lighthouse-cls-action">
                      <strong>Quick Fix:</strong> Run Chrome DevTools → Performance → Record page load → 
                      Look for red "Layout Shift" bars to see exactly which elements are shifting.
                    </div>
                  </div>
                )}

                {/* Opportunities */}
                {selectedResult.opportunities && selectedResult.opportunities.length > 0 && (
                  <div className="admin-lighthouse-opportunities">
                    <h3>Optimization Opportunities</h3>
                    <div className="admin-lighthouse-opportunities-list">
                      {selectedResult.opportunities.map((opp, index) => (
                        <div key={index} className="admin-lighthouse-opportunity">
                          <div className="admin-lighthouse-opportunity-header">
                            <h4>{opp.title}</h4>
                            {opp.savings && (
                              <span className="admin-lighthouse-opportunity-savings">
                                Save {opp.savings.toFixed(0)}{opp.savingsUnit}
                              </span>
                            )}
                          </div>
                          <p>{opp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diagnostics */}
                {selectedResult.diagnostics && selectedResult.diagnostics.length > 0 && (
                  <div className="admin-lighthouse-diagnostics">
                    <h3>Diagnostic Information</h3>
                    <div className="admin-lighthouse-diagnostics-list">
                      {selectedResult.diagnostics.map((diag, index) => (
                        <div key={index} className="admin-lighthouse-diagnostic">
                          <h4>{diag.title}</h4>
                          <p>{diag.description}</p>
                          {diag.displayValue && (
                            <span className="admin-lighthouse-diagnostic-value">{diag.displayValue}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminLighthouse;

