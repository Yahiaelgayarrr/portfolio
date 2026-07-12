/* Motion layer: smooth scroll (Lenis) + scroll-triggered reveals (GSAP),
   plus nav state, hero role typing, counters, filters, card glow, form.
   Motion level: "tasteful" — reveals + a few standout moments, mobile-safe. */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion({ roles, email }) {
  initSmoothScroll();
  initNav();
  initReveals();
  initAboutWords();
  initCounters();
  initHeroType(roles);
  initFilters();
  initCardGlow();
  initForm(email);
  initProgress();
}

/* ---- Lenis smooth scroll, wired into GSAP's ticker ---- */
function initSmoothScroll() {
  if (reduce) return;
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // let in-page anchor links use Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          document.body.classList.remove("menu-open");
          lenis.scrollTo(target, { offset: -40 });
        }
      }
    });
  });
  window.__lenis = lenis;
}

/* ---- Nav: scrolled bg, active section link, mobile menu ---- */
function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector(".nav-toggle");
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // active link via IntersectionObserver
  const links = [...document.querySelectorAll(".nav-links a")];
  const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(en.target.id)?.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
}

/* ---- Reveal on scroll: fade + rise ---- */
function initReveals() {
  const items = gsap.utils.toArray(".reveal");
  items.forEach((el) => {
    if (reduce) { gsap.set(el, { opacity: 1, y: 0 }); return; }
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out", // cubic-bezier(0.16,1,0.3,1) — premium entrance curve
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      }
    );
  });
}

/* ---- About: word-by-word brighten (Elypt's line-reveal primitive) ---- */
function initAboutWords() {
  document.querySelectorAll("#about-lead p").forEach((p) => {
    const words = p.querySelectorAll(".word");
    if (reduce) { words.forEach((w) => (w.style.color = "var(--text)")); return; }
    gsap.to(words, {
      color: "var(--text)",
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top 80%",
        end: "top 40%",
        scrub: true
      }
    });
  });
}

/* ---- Animated stat counters ---- */
function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const isFloat = !Number.isInteger(target);
    const suffix = el.querySelector(".suffix")?.outerHTML || "";
    const obj = { v: 0 };
    const run = () =>
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          const val = isFloat ? obj.v.toFixed(1) : Math.round(obj.v);
          el.innerHTML = val + suffix;
        }
      });
    if (reduce) { el.innerHTML = (isFloat ? target.toFixed(1) : target) + suffix; return; }
    ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: run });
  });
}

/* ---- Hero: cycle roles with a typing effect ---- */
function initHeroType(roles) {
  const el = document.getElementById("hero-roles");
  if (!el || !roles?.length) return;
  const caret = document.createElement("span");
  caret.className = "caret";
  el.after(caret);

  if (reduce) { el.textContent = roles[0]; return; }

  let i = 0, j = 0, deleting = false;
  const tick = () => {
    const word = roles[i];
    el.textContent = word.slice(0, j);
    if (!deleting && j < word.length) { j++; setTimeout(tick, 70); }
    else if (!deleting && j === word.length) { deleting = true; setTimeout(tick, 1400); }
    else if (deleting && j > 0) { j--; setTimeout(tick, 35); }
    else { deleting = false; i = (i + 1) % roles.length; setTimeout(tick, 250); }
  };
  tick();
}

/* ---- Project category filter ---- */
function initFilters() {
  const bar = document.getElementById("filter-bar");
  const cards = [...document.querySelectorAll(".work-card")];
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((c) => {
      const show = f === "All" || c.dataset.cat === f;
      if (reduce) { c.style.display = show ? "" : "none"; return; }
      if (show) {
        c.style.display = "";
        gsap.fromTo(c, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45, ease: "expo.out" });
      } else {
        gsap.to(c, { opacity: 0, scale: 0.96, duration: 0.25, onComplete: () => (c.style.display = "none") });
      }
    });
    ScrollTrigger.refresh();
  });
}

/* ---- Cursor-follow glow on work cards ---- */
function initCardGlow() {
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---- Contact form: mailto fallback (works with zero backend / free) ----
   If you add a Formspree endpoint, set FORM_ENDPOINT below and it posts there. */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

function initForm(email) {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const from = form.email.value.trim();
    const message = form.message.value.trim();
    note.className = "form-note";

    if (!name || !from || !message) {
      note.textContent = "Please fill in every field.";
      note.classList.add("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      note.textContent = "That email doesn't look right.";
      note.classList.add("error");
      return;
    }

    if (FORM_ENDPOINT) {
      try {
        note.textContent = "Sending…";
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        if (res.ok) {
          note.textContent = "Thanks — I'll get back to you soon.";
          note.classList.add("ok");
          form.reset();
        } else throw new Error();
      } catch {
        note.textContent = "Something went wrong. Email me directly instead.";
        note.classList.add("error");
      }
      return;
    }

    // No backend configured → open the user's mail client, pre-filled.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    note.textContent = "Opening your email app…";
    note.classList.add("ok");
  });
}

/* ---- Scroll progress bar ---- */
function initProgress() {
  const bar = document.getElementById("progress");
  if (!bar) return;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
