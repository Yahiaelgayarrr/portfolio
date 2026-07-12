import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import { DATA } from '../data';

gsap.registerPlugin(ScrollTrigger);

function Stat({ value, suffix, label }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    const isFloat = !Number.isInteger(value);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = (isFloat ? value.toFixed(1) : value) + suffix; return; }
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, {
        v: value, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { el.textContent = (isFloat ? obj.v.toFixed(1) : Math.round(obj.v)) + suffix; },
      }),
    });
    return () => st.kill();
  }, [value, suffix]);
  return <div className="stat-value" ref={ref}>0{suffix}</div>;
}

export default function About() {
  const lead = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      lead.current.querySelectorAll('p').forEach((p) => {
        const words = p.querySelectorAll('.word');
        if (reduce) { gsap.set(words, { color: 'var(--text)' }); return; }
        gsap.to(words, {
          color: 'var(--text)', stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: p, start: 'top 80%', end: 'top 40%', scrub: true },
        });
      });
    }, lead);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-pad container-c">
      <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.2rem' }}>01 — About</Reveal>
      <div className="about-wrap">
        <div className="about-lead" ref={lead}>
          {DATA.about.map((para, i) => (
            <p key={i}>
              {para.split(' ').map((w, j) => (
                <span className="word" key={j}>{w} </span>
              ))}
            </p>
          ))}
        </div>
        <aside className="about-stats glass">
          {DATA.stats.map((s, i) => (
            <div className="stat" key={i}>
              <Stat value={s.value} suffix={s.suffix} label={s.label} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
