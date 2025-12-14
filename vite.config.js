import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // For local dev, we'll need to handle this differently
        // If using vercel dev, this will work
        // Otherwise, we can add a mock or use the API directly with a fallback
      }
    }
  }
})
