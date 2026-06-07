import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = /* glsl */`
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ── COLOR PALETTES ──────────────────────────────────────────────────────────
// "Quantum Void" Hacker Palette: deep abyssal greens and neon cyans
vec3 palette(float t) {
    vec3 a = vec3(0.01, 0.05, 0.02);
    vec3 b = vec3(0.10, 0.60, 0.40);
    vec3 c = vec3(1.00, 1.00, 1.00);
    vec3 d = vec3(0.00, 0.33, 0.67);
    return a + b * cos(6.28318 * (c * t + d));
}

vec3 palette2(float t) {
    vec3 a = vec3(0.02, 0.08, 0.04);
    vec3 b = vec3(0.20, 0.80, 0.50);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.3, 0.20, 0.20);
    return a + b * cos(6.28318 * (c * t + d));
}

// ── NOISE PRIMITIVES ────────────────────────────────────────────────────────
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Minimal simplex replacement for fbm
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = rot(0.37);
    for (int i=0; i<4; i++) {
        v += a * noise(p);
        p = r * p * 2.0 + vec2(100.0);
        a *= 0.5;
    }
    return v;
}

// Incompressible fluid curl
vec2 curl(vec2 p, float t) {
    float e = 0.05;
    float dx = fbm(p + vec2(e, 0.0)) - fbm(p - vec2(e, 0.0));
    float dy = fbm(p + vec2(0.0, e)) - fbm(p - vec2(0.0, e));
    return vec2(dy, -dx);
}

// Distance to line segment
float arc(vec2 p, vec2 a, vec2 b, float w, float seed) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    vec2 d = pa - ba * h;
    float dist = length(d);
    float glow = exp(-dist * dist / w);
    return glow * (0.8 + 0.2 * sin(seed + uTime * 2.0));
}

// Voronoi cell distance and boundaries
vec3 voronoi(vec2 x, float jitter) {
    vec2 n = floor(x);
    vec2 f = fract(x);
    float mDst = 8.0;
    vec2 mPoint, mOffset;
    
    for(int j=-1; j<=1; j++) {
        for(int i=-1; i<=1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = vec2(hash(n+g), hash(n+g+12.33));
            o = 0.5 + 0.5 * sin(uTime * 0.5 + 6.2831 * o) * jitter;
            vec2 r = g + o - f;
            float d = dot(r,r);
            if(d < mDst) {
                mDst = d;
                mPoint = n+g;
                mOffset = o;
            }
        }
    }
    
    float mEdge = 8.0;
    for(int j=-2; j<=2; j++) {
        for(int i=-2; i<=2; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = vec2(hash(mPoint+g), hash(mPoint+g+12.33));
            o = 0.5 + 0.5 * sin(uTime * 0.5 + 6.2831 * o) * jitter;
            vec2 r = mPoint - n + g + o - f;
            if(dot(r-mOffset, r-mOffset) > 0.00001) {
                mEdge = min(mEdge, dot(0.5*(mOffset+r), normalize(r-mOffset)));
            }
        }
    }
    return vec3(sqrt(mDst), mEdge, hash(mPoint));
}

void main(){
  // Normalized screen coords
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t  = uTime * 0.5;   // slow time so motion feels majestic, not frantic

  // Subtle cinematic pointer parallax
  vec2 mp = uPointer * 0.08;
  uv -= mp * 0.04;

  // ── LAYER 0: Curl-swept plasma base ──────────────────────────────────────
  vec2 fl  = curl(uv * 1.6, t);
  vec2 fl2 = curl(uv * 3.2 + fl, t * 1.3);
  float pl = fbm(uv * 1.4 + fl2 * 0.8 + t * 0.04);

  // Deep dark base
  vec3 col = palette(pl * 0.7 + t * 0.05) * 0.45;

  // ── LAYER 1: Macro Voronoi (giant energy cells) ───────────────────────────
  vec3 v1    = voronoi(uv * 2.8 + vec2(t*0.12, t*0.08), 0.5);
  float edge1 = 1.0 - smoothstep(0.0, 0.03, v1.y);   
  float glow1 = exp(-v1.x * 4.0);                     

  col += palette2(v1.z + pl * 0.3) * glow1 * 0.35;    
  col += vec3(0.1, 0.6, 0.7) * edge1 * 0.8;           

  // ── LAYER 2: Micro Voronoi (sub-crystal grain) ───────────────────────────
  vec3 v2    = voronoi(uv * 9.0 + fl * 0.5 + vec2(-t*0.18, t*0.10), 0.8);
  float edge2 = 1.0 - smoothstep(0.0, 0.015, v2.y);
  col += vec3(0.1, 0.5, 0.4) * edge2 * v2.z * 0.25;  

  // ── LAYER 3: Curl flow-field visualization ───────────────────────────────
  float flowMag = length(fl2);
  float flowLine = exp(-flowMag * flowMag * 12.0);    
  col += palette(flowMag * 1.5 + t * 0.08) * flowLine * 0.3;

  // ── LAYER 4: 3 Neural lightning arcs ────────────────────────────────────
  float elec = 0.0;
  for(float i = 0.0; i < 3.0; i++){
    float s  = i * 137.508;
    float si = i / 3.0;
    vec2  a  = vec2(sin(s + t*0.6),  cos(s*0.7 + t*0.5))  * (0.35 + si*0.1);
    vec2  b  = vec2(sin(s*1.3 - t*0.55 + 2.1),
                    cos(s*0.5 - t*0.65)) * (0.38 + si*0.08);
    float w  = 0.003 + 0.002 * sin(t*4.0 + s);   
    float bri= 0.5 + 0.3 * sin(t*5.0 + s*0.8);
    elec    += arc(uv, a, b, w, s) * bri;
  }
  col += vec3(0.1, 0.8, 0.9) * elec * 1.5;   
  col += vec3(0.0, 0.4, 0.2) * elec * 0.8;   

  // ── LAYER 5: Mouse-reactive interactive light bloom ──────────────────────
  vec2  mRel   = uv - uPointer * 0.35;
  float mDist  = length(mRel);
  float mBloom = exp(-mDist * mDist * 8.0) * 0.25;
  col += vec3(0.05, 0.4, 0.8) * mBloom;

  // ── LAYER 6: Subtle time-crystal brightness pulse ────────────────────────
  col *= 0.97 + 0.03 * sin(uTime * 0.35);

  // ── Atmosphere: depth fog from Voronoi cell distance ─────────────────────
  float fog = 1.0 - exp(-0.6 * v1.x * v1.x);
  col = mix(col, vec3(0.01, 0.02, 0.02), fog * 0.6); // Darken the fog to ensure it stays dark

  // ── Radial vignette ───────────────────────────────────────────────────────
  float vig = 1.0 - smoothstep(0.4, 1.1, length(uv));
  col *= mix(0.1, 1.0, vig); // strong vignette

  // ── Skip Reinhard tone mapping to prevent blowing out dark colors ─────────
  // Just standard gamma correction
  col  = pow(max(col, 0.0), vec3(0.8)); 

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = /* glsl */`void main(){ gl_Position = vec4(position, 1.0); }`;

export default function BioMetallicShader() {
  const matRef = useRef();
  const { size, pointer } = useThree();

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uPointer:    { value: new THREE.Vector2() },
  }), []);

  useFrame(({ clock, scene }) => {
    scene.background = null;
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value       = clock.getElapsedTime();
    m.uniforms.uResolution.value.set(size.width, size.height);
    // Very slow pointer tracking = cinematic, not jittery
    m.uniforms.uPointer.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.018
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
