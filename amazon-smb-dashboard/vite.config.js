import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specifies the output directory for production builds
  },
  server: {
    proxy: {
      "/api": {
        target: "https://keen-unicorn-487a0d.netlify.app/.netlify/functions/api", // Proxy to your Netlify function endpoint
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL(path, "https://keen-unicorn-487a0d.netlify.app/.netlify/functions/api")
          return `${url.pathname}`; // Strips `/api` and keeps the original path
        },
      },
    },
  },
})
