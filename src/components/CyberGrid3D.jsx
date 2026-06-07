import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * CyberGrid3D — Implements the "Protocol Zero" design system background:
 * - Infinite 3D perspective grid floor (receding to horizon, neon green glow)
 * - Floating particle nodes in 3D space (network dots)
 * - Canvas blends over pure #030303 body for a real 3D depth effect
 * - Performance-tuned: ~30 FPS target, minimal draw calls
 */
const CyberGrid3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    const W = el.clientWidth;
    const H = el.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 3.5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    // ── Perspective Grid ──────────────────────────────────────────
    const gridSize = 80;
    const divisions = 30;
    const gridGeom = new THREE.BufferGeometry();
    const positions = [];
    const step = gridSize / divisions;
    const half = gridSize / 2;

    // Z lines (going into horizon)
    for (let i = 0; i <= divisions; i++) {
      const x = -half + i * step;
      positions.push(x, 0, -half, x, 0, half);
    }
    // X lines (horizontal)
    for (let j = 0; j <= divisions; j++) {
      const z = -half + j * step;
      positions.push(-half, 0, z, half, 0, z);
    }

    gridGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const gridMat = new THREE.LineBasicMaterial({
      color: 0x00ff85,
      transparent: true,
      opacity: 0.18,
    });
    const grid = new THREE.LineSegments(gridGeom, gridMat);
    grid.position.y = -2;
    grid.position.z = -5;
    scene.add(grid);

    // Bright center line highlight
    const centerLineGeom = new THREE.BufferGeometry();
    centerLineGeom.setAttribute('position', new THREE.Float32BufferAttribute([
      0, 0, -half,  0, 0, half
    ], 3));
    const centerLineMat = new THREE.LineBasicMaterial({ color: 0x00ff85, transparent: true, opacity: 0.6 });
    const centerLine = new THREE.LineSegments(centerLineGeom, centerLineMat);
    centerLine.position.copy(grid.position);
    scene.add(centerLine);

    // ── Particle nodes ────────────────────────────────────────────
    const particleCount = 120;
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 30;
      pPositions[i * 3 + 1] = Math.random() * 12 - 1;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      pSpeeds.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.005,
      });
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Two-size particles for depth feel
    const pMat = new THREE.PointsMaterial({
      color: 0x00ff85,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Cyan accent particles
    const cPositions = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      cPositions[i * 3]     = (Math.random() - 0.5) * 25;
      cPositions[i * 3 + 1] = Math.random() * 8;
      cPositions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    const cGeom = new THREE.BufferGeometry();
    cGeom.setAttribute('position', new THREE.BufferAttribute(cPositions, 3));
    const cMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(cGeom, cMat));

    // ── Connection lines between close particles ──────────────────
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x00ff85,
      transparent: true,
      opacity: 0.06,
    });
    const linesGeom = new THREE.BufferGeometry();
    const linePositions = [];
    const threshold = 7;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pPositions[i*3] - pPositions[j*3];
        const dy = pPositions[i*3+1] - pPositions[j*3+1];
        const dz = pPositions[i*3+2] - pPositions[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < threshold && linePositions.length < 6000) {
          linePositions.push(
            pPositions[i*3], pPositions[i*3+1], pPositions[i*3+2],
            pPositions[j*3], pPositions[j*3+1], pPositions[j*3+2]
          );
        }
      }
    }
    linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    scene.add(new THREE.LineSegments(linesGeom, linesMat));

    // ── Mouse parallax ────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────────────
    let raf;
    let frame = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;
      // Throttle to ~30fps
      if (frame % 2 !== 0) return;

      const t = frame * 0.016;

      // Slow camera drift
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.8 + 3.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Animate particles
      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i*3]   += pSpeeds[i].x;
        pos[i*3+1] += pSpeeds[i].y;
        pos[i*3+2] += pSpeeds[i].z;
        // Wrap
        if (pos[i*3]   >  15) pos[i*3]   = -15;
        if (pos[i*3]   < -15) pos[i*3]   =  15;
        if (pos[i*3+1] >  11) pos[i*3+1] = -1;
        if (pos[i*3+1] < -1)  pos[i*3+1] =  11;
        if (pos[i*3+2] >  10) pos[i*3+2] = -25;
        if (pos[i*3+2] < -25) pos[i*3+2] =  10;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Pulse grid opacity
      gridMat.opacity = 0.12 + Math.sin(t * 0.4) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default CyberGrid3D;
