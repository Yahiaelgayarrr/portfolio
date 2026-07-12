/* Builds the DOM from DATA. Keeps all content editable in one file. */

const $ = (sel) => document.querySelector(sel);

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

/* wrap each word in a span so motion.js can reveal them individually */
function toWords(text) {
  return text
    .split(" ")
    .map((w) => `<span class="word">${escapeHtml(w)}</span>`)
    .join(" ");
}

export function render(DATA) {
  /* theme accent */
  const root = document.documentElement;
  if (DATA.accent) root.style.setProperty("--accent", DATA.accent);
  if (DATA.accent2) root.style.setProperty("--accent-2", DATA.accent2);

  /* ---- hero ---- */
  $("#hero-name").textContent = DATA.name;
  $("#hero-tagline").textContent = DATA.tagline;

  const actions = [];
  actions.push(`<a href="#work" class="btn btn-primary">View my work</a>`);
  if (DATA.links?.resume) actions.push(`<a href="${DATA.links.resume}" class="btn btn-ghost" target="_blank" rel="noopener">Résumé</a>`);
  actions.push(`<a href="mailto:${DATA.email}" class="btn btn-ghost">Email me</a>`);
  $("#hero-actions").innerHTML = actions.join("");

  /* ---- about ---- */
  $("#about-lead").innerHTML = DATA.about
    .map((p) => `<p>${toWords(p)}</p>`)
    .join("");

  $("#about-stats").innerHTML = DATA.stats
    .map(
      (s) => `
      <div class="stat">
        <div class="stat-value" data-count="${s.value}">0<span class="suffix">${escapeHtml(s.suffix || "")}</span></div>
        <div class="stat-label">${escapeHtml(s.label)}</div>
      </div>`
    )
    .join("");

  /* ---- skills ---- */
  $("#skills-grid").innerHTML = DATA.skills
    .map(
      (g) => `
      <div class="skill-card reveal">
        <div class="skill-group">${escapeHtml(g.group)}</div>
        <div class="skill-tags">${g.items.map((i) => `<span>${escapeHtml(i)}</span>`).join("")}</div>
      </div>`
    )
    .join("");

  /* ---- timelines ---- */
  const tl = (items) =>
    items
      .map(
        (it) => `
      <div class="tl-item reveal">
        <div class="tl-period">${escapeHtml(it.period)}</div>
        <div class="tl-title">${escapeHtml(it.title)}</div>
        <div class="tl-org">${escapeHtml(it.org)}</div>
        <div class="tl-detail">${escapeHtml(it.detail)}</div>
      </div>`
      )
      .join("");
  $("#experience-list").innerHTML = tl(DATA.experience);
  $("#education-list").innerHTML = tl(DATA.education);

  /* ---- featured ---- */
  const f = DATA.featured;
  $("#featured").innerHTML = `
    <div class="featured-body">
      <p class="featured-label">${escapeHtml(f.label)}</p>
      <h3 class="featured-title">${escapeHtml(f.title)}</h3>
      <p class="featured-desc">${escapeHtml(f.description)}</p>
      <ul class="featured-highlights">
        ${f.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
      </ul>
      <div class="featured-tags">${f.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      <a href="${f.link}" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
    </div>
    <div class="featured-side" aria-hidden="true">
      <div class="featured-visual">${escapeHtml(f.category)}</div>
    </div>`;

  /* ---- filters ---- */
  $("#filter-bar").innerHTML = DATA.filters
    .map(
      (cat, i) =>
        `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${escapeHtml(cat)}" role="tab">${escapeHtml(cat)}</button>`
    )
    .join("");

  /* ---- projects ---- */
  $("#work-grid").innerHTML = DATA.projects
    .map(
      (p) => `
      <a href="${p.link}" class="work-card reveal" data-cat="${escapeHtml(p.category)}" target="_blank" rel="noopener">
        <div class="work-top">
          <span class="work-cat">${escapeHtml(p.category)}</span>
          <span class="work-arrow">↗</span>
        </div>
        <h3 class="work-title">${escapeHtml(p.title)}</h3>
        <p class="work-desc">${escapeHtml(p.description)}</p>
        <div class="work-tags">${p.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      </a>`
    )
    .join("");

  /* ---- contact ---- */
  $("#contact-text").textContent =
    "I'm looking for AI / data-science roles and a Master's place in Germany. Have a role, a question, or just want to connect? Drop me a line.";

  const socials = [];
  if (DATA.links?.github) socials.push(`<a href="${DATA.links.github}" target="_blank" rel="noopener">GitHub</a>`);
  if (DATA.links?.linkedin) socials.push(`<a href="${DATA.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`);
  socials.push(`<a href="mailto:${DATA.email}">${escapeHtml(DATA.email)}</a>`);
  $("#contact-socials").innerHTML = socials.join("");

  /* ---- footer ---- */
  $("#footer-name").textContent = DATA.name;

  /* expose roles + email for motion.js */
  return { roles: DATA.roles, email: DATA.email };
}
