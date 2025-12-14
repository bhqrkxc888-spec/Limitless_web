/**
 * WeatherWidget Component
 * Sophisticated weather display with current conditions and 5-day forecast
 */

import { useWeather } from '../hooks/useWeather';
import { getWeatherIconUrl, formatTemperature, groupForecastByDay } from '../services/weatherAPI';
import { apiConfig, apiMessages } from '../config/apiConfig';
import './WeatherWidget.css';

function WeatherWidget({ lat, lon, destinationName }) {
  const { current, forecast, loading, error } = useWeather(lat, lon);

  // Not configured
  if (!apiConfig.weather.enabled) {
    return (
      <div className="weather-widget">
        <div className="weather-widget-header">
          <h3>Weather</h3>
        </div>
        <div className="weather-widget-content">
          <p className="weather-message">{apiMessages.weatherNotConfigured}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-widget-header">
          <h3>Weather</h3>
        </div>
        <div className="weather-widget-content">
          <div className="weather-loading">Loading weather data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !current) {
    return (
      <div className="weather-widget">
        <div className="weather-widget-header">
          <h3>Weather</h3>
        </div>
        <div className="weather-widget-content">
          <p className="weather-error">Weather data temporarily unavailable</p>
        </div>
      </div>
    );
  }

  const weather = current.weather[0];
  const main = current.main;
  const wind = current.wind;

  return (
    <div className="weather-widget">
      <div className="weather-widget-header">
        <div className="weather-header-content">
          <svg className="weather-icon-header" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
          <h3>Current Weather</h3>
        </div>
        {destinationName && <p className="weather-location">{destinationName}</p>}
      </div>

      {/* Current Weather */}
      <div className="weather-current">
        <div className="weather-main">
          <div className="weather-icon-temp">
            <img 
              src={getWeatherIconUrl(weather.icon)} 
              alt={weather.description}
              className="weather-icon-large"
            />
            <div className="weather-temp-group">
              <span className="weather-temp">{formatTemperature(main.temp)}</span>
              <span className="weather-feels-like">Feels like {formatTemperature(main.feels_like)}</span>
            </div>
          </div>
          <div className="weather-condition">
            <p className="weather-description">{weather.description}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M12 3v6m0 6v6"/>
            </svg>
            <div>
              <span className="weather-detail-label">Humidity</span>
              <span className="weather-detail-value">{main.humidity}%</span>
            </div>
          </div>
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <div>
              <span className="weather-detail-label">Wind</span>
              <span className="weather-detail-value">{Math.round(wind.speed * 3.6)} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="weather-forecast">
          <h4 className="weather-forecast-title">5-Day Forecast</h4>
          <div className="weather-forecast-grid">
            {forecast.map((day, index) => (
              <div key={index} className="weather-forecast-day">
                <div className="forecast-date">
                  {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                </div>
                <img 
                  src={getWeatherIconUrl(day.icon)} 
                  alt={day.condition}
                  className="forecast-icon"
                />
                <div className="forecast-temps">
                  <span className="forecast-high">{formatTemperature(day.high)}</span>
                  <span className="forecast-low">{formatTemperature(day.low)}</span>
                </div>
                <div className="forecast-condition">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;

