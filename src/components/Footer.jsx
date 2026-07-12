import { DATA } from '../data';

export default function Footer() {
  return (
    <footer className="footer container-c">
      <p>Designed &amp; built by <span>{DATA.name}</span></p>
      <p className="footer-note">Built with React · Three.js · GSAP · Lenis</p>
    </footer>
  );
}
