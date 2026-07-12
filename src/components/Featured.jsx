import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import { DATA } from '../data';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { key: 'frame', label: 'Raw frame', note: 'CCTV-style video in' },
  { key: 'detect', label: 'Head localization', note: 'FIDTM point detection' },
  { key: 'heatmap', label: 'Density heatmap', note: 'Crowd distribution' },
  { key: 'risk', label: 'Zone risk', note: 'LOW · MED · HIGH · CRITICAL' },
];

function StageVisual({ stage }) {
  // four layered CSS visualizations, cross-faded by the active stage
  return (
    <div className="pipe-visual">
      <div className={`pl pl-frame ${stage === 0 ? 'on' : ''}`} />
      <div className={`pl pl-detect ${stage === 1 ? 'on' : ''}`}>
        {Array.from({ length: 36 }).map((_, i) => <span key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }} />)}
      </div>
      <div className={`pl pl-heat ${stage === 2 ? 'on' : ''}`} />
      <div className={`pl pl-risk ${stage === 3 ? 'on' : ''}`}>
        <span className="zone z-low" /><span className="zone z-med" /><span className="zone z-high" />
      </div>
      <div className="pipe-caption">
        <span className="pipe-i">{String(stage + 1).padStart(2, '0')}</span>
        <strong>{STAGES[stage].label}</strong>
        <em>{STAGES[stage].note}</em>
      </div>
    </div>
  );
}

export default function Featured() {
  const section = useRef(null);
  const [stage, setStage] = useState(0);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: 'top 65%',
      end: 'bottom 60%',
      onUpdate: (self) => {
        const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
        setStage(idx);
      },
    });
    return () => st.kill();
  }, []);

  const f = DATA.featured;
  return (
    <section id="work" className="section-pad container-c" ref={section}>
      <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.2rem' }}>04 — Selected Work</Reveal>
      <div className="featured glass">
        <div className="featured-body">
          <p className="featured-label">{f.label}</p>
          <h3 className="featured-title">{f.title}</h3>
          <p className="featured-desc">{f.description}</p>
          <ul className="featured-highlights">
            {f.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
          <div className="featured-tags">{f.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <a href={f.link} className="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
        </div>
        <div className="featured-side">
          <StageVisual stage={stage} />
          <div className="pipe-steps">
            {STAGES.map((s, i) => (
              <div key={s.key} className={`pipe-step ${i === stage ? 'active' : ''} ${i < stage ? 'done' : ''}`}>
                <i />{s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
