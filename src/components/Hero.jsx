import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { DATA } from '../data';

function useTyping(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (!words?.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setText(words[0]); return; }
    let i = 0, j = 0, deleting = false, timer;
    const tick = () => {
      const word = words[i];
      setText(word.slice(0, j));
      let d = 70;
      if (!deleting && j < word.length) j++;
      else if (!deleting && j === word.length) { deleting = true; d = 1400; }
      else if (deleting && j > 0) { j--; d = 35; }
      else { deleting = false; i = (i + 1) % words.length; d = 250; }
      timer = setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

export default function Hero() {
  const ref = useRef(null);
  const typed = useTyping(DATA.roles);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = ref.current.querySelectorAll('[data-stagger]');
    if (reduce) { gsap.set(els, { opacity: 1, y: 0 }); return; }
    const tl = gsap.fromTo(
      els,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 0.2 }
    );
    return () => tl.kill();
  }, []);

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero-inner">
        <p className="hero-eyebrow eyebrow" data-stagger>Data Science &amp; AI · Cairo</p>
        <h1 className="hero-name" data-stagger>{DATA.name}</h1>
        <p className="hero-roles" data-stagger>
          <span>{typed}</span><span className="caret" />
        </p>
        <p className="hero-tagline" data-stagger>{DATA.tagline}</p>
        <div className="hero-actions" data-stagger>
          <a href="#work" className="btn btn-primary">View my work</a>
          <a href={`mailto:${DATA.email}`} className="btn btn-ghost">Email me</a>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll down"><span />Scroll</a>
    </section>
  );
}
