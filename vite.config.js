import { defineConfig } from 'vite';

// base: './' keeps asset paths relative so the built site works whether it's
// served from a domain root (Netlify/Vercel/Cloudflare Pages) or a subpath
// like username.github.io/portfolio (GitHub Pages).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
});
