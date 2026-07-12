import Reveal from './Reveal';
import { DATA } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="section-pad container-c">
      <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.2rem' }}>02 — Skills &amp; Tools</Reveal>
      <Reveal as="h2" className="section-title">The stack I build with.</Reveal>
      <div className="skills-grid">
        {DATA.skills.map((g, i) => (
          <Reveal className="skill-card glass" key={i} delay={i * 0.05}>
            <div className="skill-group">{g.group}</div>
            <div className="skill-tags">
              {g.items.map((it) => <span key={it}>{it}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
