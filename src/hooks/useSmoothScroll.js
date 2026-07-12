import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

// Sets up Lenis smooth scroll, wires it into GSAP's ticker + ScrollTrigger,
// and publishes normalized scroll progress for the WebGL scene.
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = max > 0 ? e.scroll / max : 0;
      scrollState.velocity = e.velocity || 0;
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // in-page anchor links use Lenis
    const onClick = (ev) => {
      const a = ev.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          ev.preventDefault();
          document.body.classList.remove('menu-open');
          lenis.scrollTo(target, { offset: -40 });
        }
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);
}
