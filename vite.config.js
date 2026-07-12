import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps assets relative so the build works from a domain root or a
// GitHub Pages subpath. manualChunks splits three/R3F out so the initial
// bundle stays lean and the WebGL code can be lazy-loaded.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
