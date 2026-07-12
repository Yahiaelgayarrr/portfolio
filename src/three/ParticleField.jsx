import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { mouse } from '../lib/mouse';
import { scrollState } from '../lib/scroll';

/* ---- GLSL: Ashima simplex noise (snoise) ---- */
const NOISE = /* glsl */ `
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform vec2  uMouse;
uniform float uSize;
uniform float uPixelRatio;
attribute vec3 aRand;
attribute float aScale;
varying float vMix;
varying float vGlow;
${NOISE}
void main() {
  vec3 p = position;

  // layered flow field — the "noise storm"
  float t = uTime * 0.05;
  float f = 0.16;
  vec3 flow = vec3(
    snoise(p * f + vec3(0.0, 0.0, t)),
    snoise(p * f + vec3(43.2, 17.1, t)),
    snoise(p * f + vec3(11.7, 91.3, t))
  );

  // scroll increases dispersion + adds a slow swirl (noise -> expansion)
  float disp = 0.9 + uScroll * 1.8;
  vec3 pos = p + flow * disp;

  // swirl around Y, stronger with scroll
  float ang = (uScroll * 1.4) + length(p.xz) * 0.05 + uTime * 0.02;
  float s = sin(ang), c = cos(ang);
  pos.xz = mat2(c, -s, s, c) * pos.xz;

  // mouse repulsion in the xy plane
  vec2 m = uMouse * 6.0;
  vec2 d = pos.xy - m;
  float dist = length(d);
  float push = smoothstep(2.6, 0.0, dist) * 1.4;
  pos.xy += normalize(d + 0.0001) * push;

  vMix = clamp(aRand.x * 0.6 + flow.x * 0.4 + 0.5, 0.0, 1.0);
  vGlow = push * 0.6 + 0.15;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
}
`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
varying float vMix;
varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColorA, uColorB, vMix);
  col += vGlow * 0.8; // brighten near the cursor
  gl_FragColor = vec4(col, alpha * uOpacity);
}
`;

export default function ParticleField({ count = 90000 }) {
  const matRef = useRef();
  const { size, viewport } = useThree();

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // distribute in a sphere with a denser core
      const r = 5.2 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      rand[i * 3] = Math.random();
      rand[i * 3 + 1] = Math.random();
      rand[i * 3 + 2] = Math.random();
      scale[i] = 0.4 + Math.random() * 1.8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color('#38e1ff') },
      uColorB: { value: new THREE.Color('#7c9bff') },
      uOpacity: { value: 0.9 },
    }),
    []
  );

  useFrame((_, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    // smooth mouse
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    u.uMouse.value.set(mouse.x, mouse.y);
    // scroll morph
    u.uScroll.value += (scrollState.progress - u.uScroll.value) * 0.05;
    // fade slightly as the page scrolls so text stays readable
    const target = 0.9 - scrollState.progress * 0.35;
    u.uOpacity.value += (target - u.uOpacity.value) * 0.05;
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
