import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['firebase', 'firebase/app', 'firebase/firestore']
  },
  build: {
    rollupOptions: {
      external: ['firebase', 'firebase/app', 'firebase/firestore']
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
