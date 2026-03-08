import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const RotatingBackground = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 2]}>
          <RotatingBackground />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <span className="text-blue-400 font-semibold tracking-widest uppercase text-sm mb-4 block">Welcome to my universe</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">A Software Developer</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Crafting immersive digital experiences and building the future of the web. Explore my journey and projects.
          </p>
          <div className="pointer-events-auto flex justify-center space-x-4">
            <a 
              href="#about"
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Discover More
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium transition-all border border-white/20"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
