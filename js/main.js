/* =============================================================
   Renders content from data.js and powers all interactions.
   You normally don't need to edit this file.
   ============================================================= */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- Apply accent color + name ---- */
  document.documentElement.style.setProperty('--accent', DATA.accent);
  document.documentElement.style.setProperty('--accent-t', hexToRgba(DATA.accent, 0.1));
  document.title = DATA.name + " — Portfolio";
  $('#hero-name').textContent = DATA.name;
  $('#hero-tagline').textContent = DATA.tagline;
  $('#footer-name').textContent = DATA.name;

  /* ---- Hero CTA buttons ---- */
  const cta = $('#hero-cta');
  if (DATA.links.resume) cta.appendChild(link(DATA.links.resume, 'View Resume', 'btn btn-primary', true));
  cta.appendChild(link('#projects', 'See My Work', 'btn btn-ghost'));

  /* ---- Contact ---- */
  $('#contact-email-btn').href = 'mailto:' + DATA.email;
  const socials = $('#contact-socials');
  const socialMap = { github: 'GitHub', linkedin: 'LinkedIn', scholar: 'Scholar', twitter: 'Twitter' };
  Object.keys(socialMap).forEach((k) => {
    if (DATA.links[k]) socials.appendChild(link(DATA.links[k], socialMap[k], '', true));
  });
  if (DATA.email) socials.appendChild(link('mailto:' + DATA.email, 'Email', ''));

  /* ---- About ---- */
  const aboutText = $('#about-text');
  DATA.about.forEach((p) => aboutText.appendChild(el('p', null, p)));
  const statsBox = $('#about-stats');
  (DATA.stats || []).forEach((s) => {
    statsBox.appendChild(el('div', 'stat-card',
      `<div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div>`));
  });

  /* ---- Skills ---- */
  const skillsGrid = $('#skills-grid');
  DATA.skills.forEach((g) => {
    const tags = g.items.map((i) => `<span class="skill-tag">${i}</span>`).join('');
    skillsGrid.appendChild(el('div', 'skill-card', `<h3>${g.group}</h3><div class="skill-tags">${tags}</div>`));
  });

  /* ---- Timelines ---- */
  fillTimeline('#experience-timeline', DATA.experience);
  fillTimeline('#education-timeline', DATA.education);

  /* ---- Projects ---- */
  const projectsGrid = $('#projects-grid');
  DATA.projects.forEach((p) => {
    const links = [];
    if (p.link) links.push(`<a href="${p.link}" target="_blank" rel="noopener" title="Source">⌥ Code</a>`);
    if (p.demo) links.push(`<a href="${p.demo}" target="_blank" rel="noopener" title="Live demo">↗ Demo</a>`);
    const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join('');
    const card = el('div', 'project-card', `
      <div class="project-top">
        <span class="project-icon">▧</span>
        <div class="project-links">${links.join('')}</div>
      </div>
      <h3>${p.title}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-tags">${tags}</div>`);
    projectsGrid.appendChild(card);
  });

  /* ---- Achievements ---- */
  const achList = $('#achievements-list');
  (DATA.achievements || []).forEach((a) => achList.appendChild(el('li', null, a)));
  if (!DATA.achievements || !DATA.achievements.length) $('#achievements').style.display = 'none';

  /* ---- Typing effect ---- */
  typeRoles($('#typed'), DATA.roles);

  /* ---- Nav: scroll state + mobile toggle ---- */
  const nav = $('#nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  const toggle = $('.nav-toggle');
  const navLinks = $('.nav-links');
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  requestAnimationFrame(() => document.querySelectorAll('.reveal').forEach((r) => io.observe(r)));

  /* ---- Particle background ---- */
  initBackground();

  /* =================== helpers =================== */
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
  function typeRoles(node, roles) {
    if (!roles || !roles.length) return;
    let r = 0, c = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      c += deleting ? -1 : 1;
      node.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 90;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
      setTimeout(tick, delay);
    })();
  }
  function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((x) => x + x).join('') : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  function initBackground() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = $('#bg-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const accent = DATA.accent;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(90, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = (1 - d / 120) * 0.15;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dm / 160) * 0.25;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    })();
  }
})();
