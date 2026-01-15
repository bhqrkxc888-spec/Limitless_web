// motion is used in JSX as <motion.div>
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useWeather } from '../../hooks/useWeather';
import { getWeatherIconUrl } from '../../services/weatherAPI';
import './PortWeather.css';

/**
 * PortWeather - Weather display for cruise ports
 * 
 * Uses existing Limitless Cruises weather infrastructure:
 * - useWeather hook with caching
 * - weatherAPI service
 * - OpenWeatherMap API
 * 
 * Props:
 * - portName: Display name of the port
 * - lat: Latitude
 * - lon: Longitude
 * - compact: Boolean - smaller inline display
 */
const PortWeather = ({ 
  portName,
  lat,
  lon,
  compact = false
}) => {
  const { current, loading, error } = useWeather(lat, lon);

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
  const main = current.main;
  const wind = current.wind || {};

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
      className="port-weather"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
          <span className="detail-value">{current.clouds?.all || 0}%</span>
          <span className="detail-label">Cloud cover</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortWeather;
