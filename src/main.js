import "./styles.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DATA } from "./data.js";
import { render } from "./modules/render.js";
import { initField } from "./modules/field.js";
import { initMotion } from "./modules/motion.js";

const meta = render(DATA);
initField();
initMotion(meta);

// keep ScrollTrigger honest once web fonts have loaded and shifted layout
if (document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
