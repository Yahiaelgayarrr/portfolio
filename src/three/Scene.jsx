import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import { mouse } from '../lib/mouse';

// Gentle camera parallax toward the cursor for depth.
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({ count }) {
  return (
    <Canvas
      className="webgl-layer"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 55 }}
    >
      <Suspense fallback={null}>
        <ParticleField count={count} />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
