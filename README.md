# Portfolio — Yahia Elgayar

A dark, cinematic personal portfolio for data science & AI, built with **Vite +
GSAP + Lenis**. Smooth inertia scrolling, scroll-triggered reveals, a word-by-word
"brighten" text effect, animated counters, and a particle/neural background —
the motion language of high-end agency sites, adapted to a personal portfolio.

## ✏️ Edit your content

Everything you'd change lives in **`src/data.js`** — name, roles, tagline, about,
skills, experience, education, projects, achievements, links, and the accent color.
Save and the dev server hot-reloads instantly.

## 🧑‍💻 Develop locally

```bash
npm install       # first time only
npm run dev        # start dev server with hot reload → http://localhost:5173
```

## 📦 Build & preview production

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the built dist/ locally
```

## 🚀 Deploy for free

The build in `dist/` is plain static files — host anywhere free:

- **GitHub Pages** — deploy the `dist/` folder (or use an action). `vite.config.js`
  already sets `base: './'` so it works from a repo subpath.
- **Netlify / Vercel / Cloudflare Pages** — build command `npm run build`,
  publish directory `dist`.

## ✉️ Contact form

The form works with **no backend**: it opens the visitor's email app pre-filled.
To collect submissions instead, create a free [Formspree](https://formspree.io)
form and set `FORM_ENDPOINT` at the top of `src/modules/motion.js`.

## 📁 Structure

```
index.html            Page markup (sections are filled from data.js)
vite.config.js        Build config (relative base for flexible hosting)
src/
  data.js             👈 YOUR CONTENT — edit this
  styles.css          Design system + layout
  main.js             Entry point
  modules/
    render.js         Builds the DOM from data.js
    field.js          Particle / neural background canvas
    motion.js         Lenis smooth scroll + GSAP animations + form
public/
  favicon.svg
assets/               Put resume.pdf / images here
```

## 🎬 The motion primitives

The scroll effects reuse five reusable techniques:

1. **Smooth scroll** — Lenis, wired into GSAP's ticker.
2. **Reveal on scroll** — fade + rise as elements enter the viewport.
3. **Word-by-word brighten** — the About paragraph lightens as you scroll (scrub).
4. **Scale/counter on enter** — stats count up when they appear.
5. **Cursor-reactive detail** — particle field leans toward the cursor; work cards glow.
