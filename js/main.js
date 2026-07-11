/* =============================================================
   Renders content from data.js and powers all interactions.
   You normally don't need to edit this file.
   ============================================================= */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Theme + identity ---- */
  const root = document.documentElement;
  root.style.setProperty('--accent', DATA.accent);
  root.style.setProperty('--accent2', DATA.accent2 || DATA.accent);
  root.style.setProperty('--accent3', DATA.accent3 || DATA.accent2 || DATA.accent);
  root.style.setProperty('--accent-t', hexToRgba(DATA.accent, 0.10));
  document.title = DATA.name + " — AI & Data Science Portfolio";
  $('#hero-name').textContent = DATA.name;
  $('#hero-tagline').textContent = DATA.tagline;
  $('#footer-name').textContent = DATA.name;

  /* ---- Hero CTA + socials ---- */
  const cta = $('#hero-cta');
  if (DATA.links.resume) cta.appendChild(link(DATA.links.resume, 'View Resume', 'btn btn-primary', true));
  cta.appendChild(link('#projects', 'See My Work', 'btn btn-ghost'));
  buildSocials($('#hero-socials'));
  buildSocials($('#contact-socials'));
  $('#contact-email-btn').href = 'mailto:' + DATA.email;

  /* ---- About ---- */
  const aboutText = $('#about-text');
  DATA.about.forEach((p) => aboutText.appendChild(el('p', null, p)));
  const statsBox = $('#about-stats');
  (DATA.stats || []).forEach((s) => {
    statsBox.appendChild(el('div', 'stat-card reveal',
      `<div class="stat-value" data-target="${s.value}" data-suffix="${s.suffix || ''}">0</div>
       <div class="stat-label">${s.label}</div>`));
  });

  /* ---- Skills ---- */
  const skillsGrid = $('#skills-grid');
  DATA.skills.forEach((g) => {
    const tags = g.items.map((i) => `<span class="skill-tag">${i}</span>`).join('');
    skillsGrid.appendChild(el('div', 'skill-card reveal', `<h3>${g.group}</h3><div class="skill-tags">${tags}</div>`));
  });

  /* ---- Timelines ---- */
  fillTimeline('#experience-timeline', DATA.experience);
  fillTimeline('#education-timeline', DATA.education);

  /* ---- Featured ---- */
  if (DATA.featured) {
    const f = DATA.featured;
    const hl = (f.highlights || []).map((h) => `<li>${h}</li>`).join('');
    const tg = (f.tags || []).map((t) => `<span>${t}</span>`).join('');
    const links = [];
    if (f.link) links.push(`<a href="${f.link}" target="_blank" rel="noopener" class="btn btn-primary">View Code</a>`);
    if (f.demo) links.push(`<a href="${f.demo}" target="_blank" rel="noopener" class="btn btn-ghost">Live Demo</a>`);
    $('#featured').innerHTML = `
      <p class="featured-label">★ Featured · ${f.label}</p>
      <h3 class="featured-title">${f.title}</h3>
      <p class="featured-desc">${f.description}</p>
      <ul class="featured-highlights">${hl}</ul>
      <div class="featured-tags">${tg}</div>
      <div class="featured-links">${links.join('')}</div>`;
  } else { $('#featured').remove(); }

  /* ---- Projects + category filter ---- */
  const projectsGrid = $('#projects-grid');
  DATA.projects.forEach((p) => {
    const links = [];
    if (p.link) links.push(`<a href="${p.link}" target="_blank" rel="noopener" title="Source">↗ Code</a>`);
    if (p.demo) links.push(`<a href="${p.demo}" target="_blank" rel="noopener" title="Live demo">◎ Demo</a>`);
    const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join('');
    const card = el('div', 'project-card reveal', `
      <div class="project-top">
        <span class="project-icon">▦</span>
        <div class="project-links">${links.join('')}</div>
      </div>
      ${p.category ? `<div class="project-cat">${p.category}</div>` : ''}
      <h3>${p.title}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-tags">${tags}</div>`);
    card.dataset.category = p.category || '';
    projectsGrid.appendChild(card);
  });
  buildFilters();
  if (!reduceMotion) enableTilt();

  /* ---- Achievements ---- */
  const achList = $('#achievements-list');
  (DATA.achievements || []).forEach((a) => achList.appendChild(el('li', 'reveal', a)));
  if (!DATA.achievements || !DATA.achievements.length) $('#achievements').style.display = 'none';

  /* ---- Typing ---- */
  typeRoles($('#typed'), DATA.roles);

  /* ---- Nav: scroll state + mobile toggle + scrollspy ---- */
  const nav = $('#nav');
  const navLinks = $('#nav-links');
  const toggle = $('.nav-toggle');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    navLinks.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));
  setupScrollSpy();

  /* ---- Scroll progress ---- */
  const progress = $('#scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  });

  /* ---- Spotlight ---- */
  const spot = $('#spotlight');
  if (!reduceMotion) window.addEventListener('mousemove', (e) => {
    spot.style.opacity = '1'; spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px';
  });

  /* ---- Reveal + counters ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const counter = e.target.querySelector && e.target.querySelector('.stat-value');
        if (counter) animateCount(counter);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  requestAnimationFrame(() => $$('.reveal').forEach((r) => io.observe(r)));

  initBackground();

  /* =================== helpers =================== */
  function buildSocials(box) {
    const map = { github: 'GitHub', linkedin: 'LinkedIn', scholar: 'Scholar', twitter: 'Twitter' };
    Object.keys(map).forEach((k) => { if (DATA.links[k]) box.appendChild(link(DATA.links[k], map[k], '', true)); });
    if (DATA.email) box.appendChild(link('mailto:' + DATA.email, 'Email', ''));
  }
  function link(href, text, cls, external) {
    const a = el('a', cls || null, text);
    a.href = href;
    if (external) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function fillTimeline(sel, items) {
    const box = $(sel);
    (items || []).forEach((it) => {
      box.appendChild(el('div', 'timeline-item reveal', `
        <div class="timeline-period">${it.period}</div>
        <div class="timeline-title">${it.title}</div>
        <div class="timeline-org">${it.org}</div>
        <div class="timeline-detail">${it.detail}</div>`));
    });
  }
  function buildFilters() {
    const bar = $('#filter-bar');
    const cats = DATA.filters || ['All'];
    cats.forEach((c, i) => {
      const btn = el('button', 'filter-btn' + (i === 0 ? ' active' : ''), c);
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        $$('.project-card').forEach((card) => {
          const show = c === 'All' || card.dataset.category === c;
          card.classList.toggle('hidden', !show);
        });
      });
      bar.appendChild(btn);
    });
    if (cats.length <= 1) bar.remove();
  }
  function setupScrollSpy() {
    const links = $$('#nav-links a');
    const map = {};
    links.forEach((a) => { map[a.dataset.sec] = a; });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove('active'));
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'skills', 'experience', 'projects', 'contact'].forEach((id) => {
      const s = document.getElementById(id); if (s) spy.observe(s);
    });
  }
  function typeRoles(node, roles) {
    if (!roles || !roles.length) return;
    if (reduceMotion) { node.textContent = roles[0]; return; }
    let r = 0, c = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      c += deleting ? -1 : 1;
      node.textContent = word.slice(0, c);
      let delay = deleting ? 40 : 85;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
      setTimeout(tick, delay);
    })();
  }
  function animateCount(node) {
    const target = parseFloat(node.dataset.target);
    const suffix = node.dataset.suffix || '';
    const isFloat = !Number.isInteger(target);
    if (reduceMotion) { node.textContent = (isFloat ? target.toFixed(1) : target) + suffix; return; }
    const dur = 1400, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = target * (1 - Math.pow(1 - p, 3));
      node.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  function enableTilt() {
    $$('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
  function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((x) => x + x).join('') : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  function initBackground() {
    if (reduceMotion) return;
    const canvas = $('#bg-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const accent = DATA.accent;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(80, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.4
      }));
    }
    const mouse = { x: -999, y: -999 };
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('resize', resize);
    resize();
    (function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent; ctx.globalAlpha = 0.5; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = accent; ctx.globalAlpha = (1 - d / 120) * 0.14; ctx.lineWidth = 0.6; ctx.stroke(); }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 160) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.strokeStyle = accent; ctx.globalAlpha = (1 - dm / 160) * 0.22; ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    })();
  }
})();
