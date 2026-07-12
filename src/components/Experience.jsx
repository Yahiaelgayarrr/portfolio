import Reveal from './Reveal';
import { DATA } from '../data';

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <Reveal className="tl-item" key={i} delay={i * 0.05}>
          <div className="tl-period">{it.period}</div>
          <div className="tl-title">{it.title}</div>
          <div className="tl-org">{it.org}</div>
          <div className="tl-detail">{it.detail}</div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad container-c">
      <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.2rem' }}>03 — Experience &amp; Education</Reveal>
      <div className="timeline-cols">
        <div>
          <Reveal as="h3" className="timeline-head">Experience</Reveal>
          <Timeline items={DATA.experience} />
        </div>
        <div>
          <Reveal as="h3" className="timeline-head">Education</Reveal>
          <Timeline items={DATA.education} />
        </div>
      </div>
    </section>
  );
}
