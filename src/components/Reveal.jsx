import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade + rise as the element enters the viewport (expo.out — premium curve).
export default function Reveal({ children, as: Tag = 'div', y = 24, delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
    );
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, [y, delay]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }} {...rest}>
      {children}
    </Tag>
  );
}
