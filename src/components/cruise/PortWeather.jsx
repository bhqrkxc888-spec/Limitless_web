// motion is used in JSX as <motion.div>
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useWeather } from '../../hooks/useWeather';
import { getWeatherIconUrl } from '../../services/weatherAPI';
import './PortWeather.css';

/**
 * PortWeather - Enhanced weather display with One Call API 3.0
 * 
 * Features:
 * - Current conditions
 * - 48-hour hourly forecast (scrollable strip)
 * - 8-day daily forecast
 * - Weather alerts
 * 
 * Props:
 * - portName: Display name of the port
 * - lat: Latitude
 * - lon: Longitude
 * - compact: Boolean - smaller inline display (legacy mode)
 * - showHourly: Boolean - show hourly forecast strip (default: true)
 * - showDaily: Boolean - show daily forecast cards (default: true)
 * - hourlyCount: Number of hours to show (default: 12)
 */
const PortWeather = ({ 
  portName,
  lat,
  lon,
  compact = false,
  showHourly = true,
  showDaily = true,
  hourlyCount = 12
}) => {
  const { current, hourly, daily, alerts, loading, error } = useWeather(lat, lon);

  // Weather icon mapping to emoji (fallback)
  const getWeatherEmoji = (iconCode) => {
    const emojiMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return emojiMap[iconCode] || '🌤️';
  };

  // Wind direction to compass
  const getWindDirection = (deg) => {
    if (deg === undefined || deg === null) return '';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <div className={`port-weather ${compact ? 'port-weather-compact' : ''}`}>
        <div className="port-weather-loading">
          <span className="loading-spinner"></span>
          <span>Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error || !current || !current.weather || !current.weather[0]) {
    return (
      <div className={`port-weather port-weather-error ${compact ? 'port-weather-compact' : ''}`}>
        <span>Weather unavailable</span>
      </div>
    );
  }

  const weather = current.weather[0];
  // One Call API 3.0 returns temp/humidity/etc directly on current, not nested in main
  const main = {
    temp: current.temp,
    feels_like: current.feels_like,
    humidity: current.humidity
  };
  const wind = {
    speed: current.wind_speed,
    deg: current.wind_deg
  };

  if (compact) {
    return (
      <motion.div 
        className="port-weather port-weather-compact"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="weather-emoji">{getWeatherEmoji(weather.icon)}</span>
        <span className="weather-temp">{Math.round(main.temp)}°C</span>
        <span className="weather-desc">{weather.description}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="port-weather port-weather-enhanced"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Weather Alerts */}
      {alerts && alerts.length > 0 && (
        <div className="weather-alerts">
          {alerts.map((alert, idx) => (
            <div key={idx} className="weather-alert">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <strong>{alert.event}</strong>
                <p>{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Conditions */}
      <div className="port-weather-header">
        <h4 className="port-weather-title">{portName}</h4>
        <span className="port-weather-subtitle">Current conditions</span>
      </div>

      <div className="port-weather-main">
        <div className="weather-icon-container">
          <img 
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="weather-icon"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block';
              }
            }}
          />
          <span className="weather-emoji-fallback" style={{ display: 'none' }}>
            {getWeatherEmoji(weather.icon)}
          </span>
        </div>
        
        <div className="weather-temp-container">
          <span className="weather-temp-main">{Math.round(main.temp)}°</span>
          <span className="weather-temp-feels">Feels like {Math.round(main.feels_like)}°</span>
        </div>
      </div>

      <p className="weather-description">{weather.description}</p>

      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-icon">💨</span>
          <span className="detail-value">{Math.round((wind.speed || 0) * 3.6)} km/h</span>
          <span className="detail-label">{getWindDirection(wind.deg)}</span>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">💧</span>
          <span className="detail-value">{main.humidity}%</span>
          <span className="detail-label">Humidity</span>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">☁️</span>
          <span className="detail-value">{current.clouds || 0}%</span>
          <span className="detail-label">Cloud cover</span>
        </div>
        {current.uvi !== undefined && (
          <div className="weather-detail">
            <span className="detail-icon">☀️</span>
            <span className="detail-value">{Math.round(current.uvi)}</span>
            <span className="detail-label">UV Index</span>
          </div>
        )}
      </div>

      {/* Hourly Forecast Strip */}
      {showHourly && hourly && hourly.length > 0 && (
        <div className="weather-hourly-section">
          <h5 className="weather-section-title">Next {hourlyCount} hours</h5>
          <div className="weather-hourly-strip">
            {hourly.slice(0, hourlyCount).map((hour, idx) => (
              <div key={idx} className="hourly-item">
                <span className="hourly-time">
                  {hour.time.getHours() === 0 
                    ? hour.time.toLocaleDateString('en-GB', { weekday: 'short' })
                    : hour.time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                  }
                </span>
                <img 
                  src={getWeatherIconUrl(hour.icon)}
                  alt={hour.description}
                  className="hourly-icon"
                />
                <span className="hourly-temp">{hour.temp}°</span>
                {hour.pop > 20 && (
                  <span className="hourly-rain">{hour.pop}%</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Forecast */}
      {showDaily && daily && daily.length > 0 && (
        <div className="weather-daily-section">
          <h5 className="weather-section-title">8-day forecast</h5>
          <div className="weather-daily-grid">
            {daily.slice(0, 8).map((day, idx) => (
              <div key={idx} className="daily-card">
                <span className="daily-day">
                  {idx === 0 ? 'Today' : day.date.toLocaleDateString('en-GB', { weekday: 'short' })}
                </span>
                <img 
                  src={getWeatherIconUrl(day.icon)}
                  alt={day.description}
                  className="daily-icon"
                />
                <div className="daily-temps">
                  <span className="daily-high">{day.tempMax}°</span>
                  <span className="daily-low">{day.tempMin}°</span>
                </div>
                {day.pop > 20 && (
                  <span className="daily-rain">
                    <span className="rain-icon">💧</span>
                    {day.pop}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PortWeather;
