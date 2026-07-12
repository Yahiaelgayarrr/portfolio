import { useMemo } from 'react';

// Classifies the device so we can scale the WebGL work (the adaptive fallback).
//  'high' → full particle count + shaders
//  'mid'  → reduced particle count
//  'low'  → skip WebGL entirely (CSS ambient background only)
export function detectTier() {
  if (typeof window === 'undefined') return 'high';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return 'low';

  // WebGL support check
  let gl = null;
  try {
    const c = document.createElement('canvas');
    gl = c.getContext('webgl2') || c.getContext('webgl');
  } catch (e) {
    gl = null;
  }
  if (!gl) return 'low';

  const mem = navigator.deviceMemory || 4; // GB, Chrome only
  const cores = navigator.hardwareConcurrency || 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 600;

  // Phones / low-power: keep it light
  if ((coarse && smallScreen) || mem <= 2 || cores <= 2) return 'low';
  if (mem <= 4 || cores <= 4 || coarse) return 'mid';
  return 'high';
}

export function useDeviceTier() {
  return useMemo(() => detectTier(), []);
}

export const PARTICLE_COUNT = { high: 90000, mid: 32000, low: 0 };
