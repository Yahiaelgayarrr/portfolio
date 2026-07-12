/* Lightweight particle / neural-network field on a canvas.
   This is our on-brand replacement for Elypt's cinematic video:
   nodes drift, link to nearby nodes, and lean toward the cursor.
   Kept cheap so it stays smooth on mobile (fewer nodes, capped DPR). */

export function initField() {
  const canvas = document.getElementById("field");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent").trim() || "#38e1ff";

  let w, h, dpr, nodes, mouse = { x: -9999, y: -9999 }, raf;

  function count() {
    // scale node count with area, but keep it modest
    const area = window.innerWidth * window.innerHeight;
    return Math.min(90, Math.max(28, Math.round(area / 22000)));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }

  function makeNodes() {
    nodes = Array.from({ length: count() }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      r: (Math.random() * 1.4 + 0.6) * dpr
    }));
  }

  const linkDist = () => 130 * dpr;

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const LD = linkDist();

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      // subtle cursor attraction
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const d2 = dx * dx + dy * dy;
      const R = 160 * dpr;
      if (d2 < R * R) {
        const f = (1 - Math.sqrt(d2) / R) * 0.02;
        n.vx += dx * f * 0.02;
        n.vy += dy * f * 0.02;
      }
      // clamp speed
      n.vx = Math.max(-0.6 * dpr, Math.min(0.6 * dpr, n.vx));
      n.vy = Math.max(-0.6 * dpr, Math.min(0.6 * dpr, n.vy));

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();
    }

    // links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LD) {
          const alpha = (1 - dist / LD) * 0.22;
          ctx.strokeStyle = hexToRgba(accent, alpha);
          ctx.lineWidth = dpr * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function hexToRgba(hex, a) {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map((x) => x + x).join("");
    const n = parseInt(c, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function start() {
    resize();
    makeNodes();
    if (reduce) {
      // draw a single static frame, no loop
      frame();
      cancelAnimationFrame(raf);
      return;
    }
    cancelAnimationFrame(raf);
    frame();
  }

  window.addEventListener("resize", () => { resize(); makeNodes(); });
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX * dpr;
    mouse.y = e.clientY * dpr;
  });
  window.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });

  // pause when tab hidden to save battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!reduce) frame();
  });

  start();
}
