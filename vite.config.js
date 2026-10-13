import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 6's default browser support. Vite 7 raised it to 2022-era browsers,
    // which would leave phones stuck on older versions (e.g. iOS 15) behind.
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  server: {
    port: 5173,
    host: true,
  },
})
