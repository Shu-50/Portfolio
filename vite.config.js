import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Keep the heavy libraries out of the entry chunk so the page paints fast
        // on mobile — three/drei only arrive with the background, supabase with /dev.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/three|@react-three|@react-spring/.test(id)) return 'vendor-three'
          if (/@supabase/.test(id)) return 'vendor-supabase'
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'vendor-motion'
          if (/react-router/.test(id)) return 'vendor-router'
          if (/react-dom|scheduler/.test(id)) return 'vendor-react'
        },
      },
    },
  },
})
