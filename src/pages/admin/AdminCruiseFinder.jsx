/**
 * Admin Cruise Finder Test Page
 * 
 * Tests the Apify CruiseMapper scraper integration
 */

import { useState } from 'react';
import { Anchor, Calendar, Search, Loader } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import useAdminAuth from '../../hooks/useAdminAuth';
import './AdminCruiseFinder.css';

export default function AdminCruiseFinder() {
  const { loading: authLoading } = useAdminAuth();
  
  const [formData, setFormData] = useState({
    shipName: '',
    startDate: '',
    endDate: ''
  });
  
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/cruise-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ship_name: formData.shipName,
          start_date: formData.startDate,
          end_date: formData.endDate
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search cruises');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Cruise search error:', err);
    } finally {
      setSearching(false);
    }
  };

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <Loader className="spin" size={32} />
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-cruise-finder">
        <header className="admin-cruise-finder-header">
          <div className="header-icon">
            <Anchor size={32} />
          </div>
          <div className="header-content">
            <h1>Cruise Finder Test</h1>
            <p className="subtitle">
              Test the Apify CruiseMapper scraper integration
            </p>
          </div>
        </header>

        <div className="cruise-finder-content">
          <div className="search-section">
            <form onSubmit={handleSubmit} className="cruise-search-form">
              <div className="form-group">
                <label htmlFor="shipName">
                  <Anchor size={18} />
                  Ship Name
                </label>
                <input
                  type="text"
                  id="shipName"
                  name="shipName"
                  value={formData.shipName}
                  onChange={handleInputChange}
                  placeholder="e.g. Iona"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">
                    <Calendar size={18} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">
                    <Calendar size={18} />
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="search-button"
                disabled={searching}
              >
                {searching ? (
                  <>
                    <Loader className="spin" size={18} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Search Cruises
                  </>
                )}
              </button>
            </form>
          </div>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {results && (
            <div className="results-section">
              <h2>Search Results</h2>
              
              {results.cruises && results.cruises.length > 0 ? (
                <div className="cruises-list">
                  <p className="results-count">
                    Found {results.cruises.length} cruise{results.cruises.length !== 1 ? 's' : ''}
                  </p>
                  
                  {results.cruises.map((cruise, index) => (
                    <div key={index} className="cruise-card">
                      <div className="cruise-header">
                        <h3>{cruise.title || 'Untitled Cruise'}</h3>
                        <div className="cruise-meta">
                          <span className="ship-name">
                            <Anchor size={16} />
                            {cruise.ship_name || 'Unknown Ship'}
                          </span>
                          {cruise.date && (
                            <span className="cruise-date">
                              <Calendar size={16} />
                              {cruise.date}
                            </span>
                          )}
                        </div>
                      </div>

                      {cruise.stops && cruise.stops.length > 0 && (
                        <div className="cruise-stops">
                          <h4>Itinerary ({cruise.stops.length} stops)</h4>
                          <ul className="stops-list">
                            {cruise.stops.map((stop, stopIndex) => (
                              <li key={stopIndex}>
                                {stop.port || stop.name || stop}
                                {stop.date && <span className="stop-date"> - {stop.date}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {cruise.url && (
                        <a 
                          href={cruise.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="cruise-link"
                        >
                          View on CruiseMapper
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No cruises found for the specified criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
