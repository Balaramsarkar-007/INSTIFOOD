import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: 'all', // Your tunnel URL
    // allowedHosts : ['3bcf-2409-40e2-11ec-d6bf-70c1-92d3-711f-1772.ngrok-free.app'],
    host: '0.0.0.0', // ← Add this line explicitly
    port: 5173 // ← Confirm your actual port
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
