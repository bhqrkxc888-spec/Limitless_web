/**
 * TEMPORARY DEBUG PAGE - Delete after testing
 * Check if API keys are loaded
 */

import { apiConfig } from '../config/apiConfig';

function ApiDebugPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Configuration Debug</h1>
      
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h2>Weather API (OpenWeatherMap)</h2>
        <p><strong>Enabled:</strong> {apiConfig.weather.enabled ? '✅ YES' : '❌ NO'}</p>
        <p><strong>Has API Key:</strong> {apiConfig.weather.apiKey ? `✅ YES (${apiConfig.weather.apiKey.substring(0, 8)}...)` : '❌ NO'}</p>
        <p><strong>Base URL:</strong> {apiConfig.weather.baseUrl}</p>
        <p><strong>Env Variable Name:</strong> VITE_OPENWEATHER_API_KEY</p>
        <p><strong>Raw Env Value:</strong> {import.meta.env.VITE_OPENWEATHER_API_KEY || 'NOT SET'}</p>
      </div>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h2>Marine API (StormGlass)</h2>
        <p><strong>Enabled:</strong> {apiConfig.marine.enabled ? '✅ YES' : '❌ NO'}</p>
        <p><strong>Has API Key:</strong> {apiConfig.marine.apiKey ? `✅ YES (${apiConfig.marine.apiKey.substring(0, 8)}...)` : '❌ NO'}</p>
        <p><strong>Base URL:</strong> {apiConfig.marine.baseUrl}</p>
        <p><strong>Env Variable Name:</strong> VITE_STORMGLASS_API_KEY</p>
        <p><strong>Raw Env Value:</strong> {import.meta.env.VITE_STORMGLASS_API_KEY || 'NOT SET'}</p>
      </div>

      <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h3>⚠️ All Environment Variables (VITE_ prefix only)</h3>
        <pre style={{ background: '#fff', padding: '1rem', overflow: 'auto' }}>
          {JSON.stringify(import.meta.env, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h3>📝 Instructions</h3>
        <p>1. Check if VITE_OPENWEATHER_API_KEY is shown above</p>
        <p>2. If "NOT SET", the .env file isn't being read</p>
        <p>3. Make sure .env or .env.local has: <code>VITE_OPENWEATHER_API_KEY=your_key</code></p>
        <p>4. Restart the dev server after adding the key</p>
      </div>
    </div>
  );
}

export default ApiDebugPage;

