import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.endsWith('.lottie')) {
        res.setHeader('Content-Type', 'application/json')
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.endsWith('.lottie')) {
        res.setHeader('Content-Type', 'application/json')
      }
      next()
    })
  }
})