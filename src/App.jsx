import { useEffect, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Background from './three/Background';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Skills from './components/Skills';
import Featured from './components/Featured';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Progress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setW(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: `${w}%` }} />;
}

export default function App() {
  useSmoothScroll();

  return (
    <>
      <a href="#hero" className="skip-link">Skip to content</a>
      <Progress />
      <Background />

      <Nav />
      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <About />
        <Skills />
        <Featured />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
