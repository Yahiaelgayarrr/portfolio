import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  'Every model begins as noise.',
  'Intelligence is structure — learned, not given.',
  'I build the systems that find the signal.',
];

export default function Manifesto() {
  const section = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = section.current.querySelectorAll('.mline');
    if (reduce) {
      gsap.set(lines, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: `+=${lines.length * 500}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      lines.forEach((l, i) => {
        tl.fromTo(l, { opacity: 0.1, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
        if (i < lines.length - 1) tl.to(l, { opacity: 0.1, y: -40, duration: 1, ease: 'power2.in' }, '+=0.6');
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" ref={section} aria-label="Manifesto">
      <div className="manifesto-stack">
        {LINES.map((l, i) => (
          <h2 className="mline" key={i}>{l}</h2>
        ))}
      </div>
    </section>
  );
}
