import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
     proxy: {
        '/getImage': {
           target: 'https://matrimony-v2-0.onrender.com',
           changeOrigin: true,
           secure: true,
        },
     },
  },
});