import { lazy, Suspense } from 'react';
import { useDeviceTier, PARTICLE_COUNT } from '../hooks/useDeviceTier';

// Lazy-load the WebGL scene so three/R3F stay out of the initial bundle.
const Scene = lazy(() => import('./Scene'));

export default function Background() {
  const tier = useDeviceTier();
  const count = PARTICLE_COUNT[tier];

  return (
    <>
      {/* Always-on CSS ambient layer (also the full fallback on low-end devices) */}
      <div className="ambient" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
      </div>

      {/* WebGL particle field on capable devices only */}
      {count > 0 && (
        <Suspense fallback={null}>
          <Scene count={count} />
        </Suspense>
      )}

      <div className="grain" aria-hidden="true" />
    </>
  );
}
