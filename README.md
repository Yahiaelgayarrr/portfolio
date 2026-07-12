# Portfolio — Yahia Elgayar

A cinematic, WebGL-driven personal portfolio for data science & AI. Concept:
**"From Noise to Knowledge"** — a GPU particle field is the connective tissue of
the whole site and morphs as you scroll, telling the story of raw data becoming
intelligence.

Built with **React · Three.js (react-three-fiber) + custom GLSL shaders · GSAP /
ScrollTrigger · Lenis smooth scroll · Tailwind · Vite.**

## ✏️ Edit your content

All copy lives in **`src/data.js`** — name, roles, about, skills, experience,
education, projects, achievements, links, accent colors.

## 🧑‍💻 Develop

```bash
npm install
npm run dev      # http://localhost:5173  (hot reload, incl. shaders)
```

## 📦 Build & preview

```bash
npm run build    # → dist/ (static)
npm run preview
```

## 🚀 Deploy for free

`dist/` is static — host on GitHub Pages, Netlify, Vercel, or Cloudflare Pages.
`vite.config.js` uses `base: './'` so it works from a domain root or a repo
subpath. Build command `npm run build`, publish directory `dist`.

## 🎬 What's inside

- **Particle field** (`src/three/`) — custom shader (simplex-noise flow field,
  cursor repulsion, scroll-reactive dispersion + swirl), additive-blended points.
- **Adaptive fallback** (`src/hooks/useDeviceTier.js`) — full particle count on
  capable devices, reduced on mid, CSS-only ambient background on phones /
  low-end / reduced-motion.
- **Two cinematic scroll moments** — the pinned *manifesto* and the scroll-driven
  *thesis pipeline* (frame → detection → heatmap → risk).
- **Motion primitives** — Lenis smooth scroll, expo.out reveals, word-by-word
  brighten, animated counters, 3D-tilt project cards with cursor glow.

## 📁 Structure

```
index.html
src/
  data.js            👈 YOUR CONTENT
  App.jsx            layout + section order
  index.css          design tokens, glass, ambient blobs
  sections.css       component styles
  three/             WebGL: Background, Scene, ParticleField (+ shaders)
  components/         Nav, Hero, Manifesto, About, Skills, Featured,
                      Projects, Experience, Contact, Footer, Reveal
  hooks/             useSmoothScroll, useDeviceTier
  lib/               mouse + scroll shared state
public/favicon.svg
```
