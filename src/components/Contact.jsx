import { useRef, useState } from 'react';
import Reveal from './Reveal';
import { DATA } from '../data';

const FORM_ENDPOINT = ''; // set a Formspree URL to collect submissions

export default function Contact() {
  const formRef = useRef(null);
  const [note, setNote] = useState({ text: '', type: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = formRef.current;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    if (!name || !email || !message) return setNote({ text: 'Please fill in every field.', type: 'error' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setNote({ text: "That email doesn't look right.", type: 'error' });

    if (FORM_ENDPOINT) {
      try {
        setNote({ text: 'Sending…', type: '' });
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) });
        if (!res.ok) throw new Error();
        setNote({ text: "Thanks — I'll get back to you soon.", type: 'ok' });
        f.reset();
      } catch { setNote({ text: 'Something went wrong. Email me directly instead.', type: 'error' }); }
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
    setNote({ text: 'Opening your email app…', type: 'ok' });
  };

  return (
    <section id="contact" className="section-pad container-c">
      <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.2rem' }}>05 — Contact</Reveal>
      <Reveal as="h2" className="contact-title">Let's build something<br />intelligent together.</Reveal>
      <Reveal as="p" className="contact-text">
        I'm looking for AI / data-science roles and a Master's place in Germany. Have a role, a
        question, or just want to connect? Drop me a line.
      </Reveal>

      <Reveal>
        <form className="contact-form glass" ref={formRef} onSubmit={onSubmit} noValidate>
          <div className="field">
            <input type="text" name="name" id="f-name" required placeholder=" " />
            <label htmlFor="f-name">Your name</label>
          </div>
          <div className="field">
            <input type="email" name="email" id="f-email" required placeholder=" " />
            <label htmlFor="f-email">Email</label>
          </div>
          <div className="field field-full">
            <textarea name="message" id="f-message" rows="4" required placeholder=" " />
            <label htmlFor="f-message">Message</label>
          </div>
          <button type="submit" className="btn btn-primary">Send message</button>
          <p className={`form-note ${note.type}`} role="status">{note.text}</p>
        </form>
      </Reveal>

      <Reveal className="contact-socials">
        {DATA.links.github && <a href={DATA.links.github} target="_blank" rel="noopener">GitHub</a>}
        {DATA.links.linkedin && <a href={DATA.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
        <a href={`mailto:${DATA.email}`}>{DATA.email}</a>
      </Reveal>
    </section>
  );
}
