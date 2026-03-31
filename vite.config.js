import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',  // Cloudflare Pages očekuje dist
  },
})