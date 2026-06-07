import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BioMetallicShader from './components/BioMetallicShader';
import { Canvas } from '@react-three/fiber';
import Landing from './components/Landing';

function App() {
  const [showMain, setShowMain] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#000000]">

      {/* Landing splash — shown first */}
      <AnimatePresence>
        {!showMain && <Landing onEnter={() => setShowMain(true)} />}
      </AnimatePresence>

      {/* Main portfolio */}
      {showMain && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 3D BioMetallic Shader */}
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <Canvas
              camera={{ position: [0, 0, 1], fov: 75 }}
              dpr={[0.5, Math.min(window.devicePixelRatio, 0.75)]}
              gl={{
                antialias: false,
                powerPreference: 'high-performance',
                alpha: true,
              }}
            >
              <BioMetallicShader />
            </Canvas>
          </div>

          {/* Subtle CSS radial glow overlaid on top of 3D canvas */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background: `
                radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0,255,133,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,229,255,0.04) 0%, transparent 60%)
              `,
            }}
          />

          {/* Scanline overlay */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 2,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,133,0.010) 3px, rgba(0,255,133,0.010) 4px)',
            }}
          />

          {/* Content above all */}
          <div className="relative" style={{ zIndex: 3 }}>
            <Navbar />
            <Hero />
            <About />
            <Certifications />
            <Projects />
            <Contact />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
