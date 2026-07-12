import { useState } from 'react';
import Reveal from './Reveal';
import { DATA } from '../data';

function Card({ p }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 8}deg`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <a href={p.link} target="_blank" rel="noopener" className="work-card glass" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="work-top">
        <span className="work-cat">{p.category}</span>
        <span className="work-arrow">↗</span>
      </div>
      <h3 className="work-title">{p.title}</h3>
      <p className="work-desc">{p.description}</p>
      <div className="work-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const shown = DATA.projects.filter((p) => filter === 'All' || p.category === filter);

  return (
    <section className="section-pad container-c">
      <Reveal className="filter-bar" role="tablist" aria-label="Filter projects">
        {DATA.filters.map((cat) => (
          <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)} role="tab">
            {cat}
          </button>
        ))}
      </Reveal>
      <div className="work-grid">
        {shown.map((p) => <Card p={p} key={p.title} />)}
      </div>
    </section>
  );
}
