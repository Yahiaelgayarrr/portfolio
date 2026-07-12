// Global pointer tracker. The WebGL canvas has pointer-events:none (it sits
// behind the DOM), so R3F can't read pointer events itself — we track them here
// and smooth toward the target inside useFrame.
export const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
