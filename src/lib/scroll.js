// Shared scroll state, updated by Lenis in App and read inside useFrame so the
// WebGL scene can react to scroll without React re-renders.
export const scrollState = {
  progress: 0, // 0..1 over the whole page
  velocity: 0,
};
