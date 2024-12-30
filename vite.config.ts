import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['gif.js'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gif.worker': ['gif.js/dist/gif.worker.js'],
        },
      },
    },
  },
})