import { useEffect, useState } from 'react';

const LINKS = [
  ['about', '01', 'About'],
  ['skills', '02', 'Skills'],
  ['experience', '03', 'Experience'],
  ['work', '04', 'Work'],
  ['contact', '05', 'Contact'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={() => setOpen(false)}>YE<span>.</span></a>
      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {LINKS.map(([id, num, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
            <span>{num}</span> {label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav-cta">Get in touch</a>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
      </button>
    </header>
  );
}
