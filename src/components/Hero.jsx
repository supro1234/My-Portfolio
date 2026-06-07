import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Terminal, ChevronDown, Lock, Wifi, Cpu } from 'lucide-react';

/* ── Matrix Rain Canvas (lightweight, one canvas max 60fps) ─────── */
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / 18);
    const drops = Array(cols).fill(1);
    const chars = '01アイウエオサイバーセキュリティHACKERROOT>_$#!/';

    let raf;
    let frameCount = 0;
    const draw = () => {
      frameCount++;
      if (frameCount % 2 !== 0) { raf = requestAnimationFrame(draw); return; } // 30fps
      ctx.fillStyle = 'rgba(3,3,3,0.13)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '13px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.9 ? 1 : 0.4;
        ctx.fillStyle = `rgba(0,255,133,${alpha})`;
        ctx.fillText(char, i * 18, y * 18);
        if (y * 18 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" />;
}

/* ── Typewriter ──────────────────────────────────────────────────── */
function Typewriter({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    let timer;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % phrases.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, phrases]);

  return (
    <span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
        {displayed}
      </span>
      <span className="animate-pulse text-green-400">█</span>
    </span>
  );
}

/* ── Floating stat badges ──────────────────────────────────────────── */
const stats = [
  { icon: <Shield size={14} />, label: 'Ethical Hacker', color: 'green' },
  { icon: <Lock size={14} />, label: 'Pentester', color: 'cyan' },
  { icon: <Wifi size={14} />, label: 'Network Security', color: 'emerald' },
  { icon: <Cpu size={14} />, label: 'CTF Player', color: 'green' },
];

const Hero = () => {
  const shouldReduce = useReducedMotion();

  const phrases = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'CTF Competitor',
    'Network Defender',
    'Penetration Tester',
  ];

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Matrix rain — CSS-powered, lightweight */}
      <MatrixRain />

      {/* Radial glow center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,133,0.015) 2px, rgba(0,255,133,0.015) 4px)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full flex flex-col items-center">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          {/* Name */}
          <motion.h1
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black mb-3 leading-tight font-display text-white"
            style={{ textShadow: '0 0 40px rgba(0,255,133,0.3)' }}
          >
            Hi, I'm <span className="text-green-400">Supratim</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.h2
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-200 mb-8 h-10 tracking-wide"
          >
            <Typewriter phrases={phrases} />
          </motion.h2>

          {/* Sub-description */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-block mb-10 px-6 py-4 rounded-xl bg-black/50 backdrop-blur-md border border-green-500/20"
          >
            <p className="text-sm md:text-base text-gray-100 max-w-xl leading-relaxed font-display">
              B.Tech CSE student specializing in <span className="text-cyan-400 font-semibold">ethical hacking</span>, 
              <span className="text-green-400 font-semibold"> network security</span> & 
              <span className="text-emerald-400 font-semibold"> penetration testing</span>.
              Building secure systems by breaking them first.
            </p>
          </motion.div>

          {/* Skill badges */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {stats.map((s, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border
                  ${s.color === 'cyan' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' :
                    s.color === 'emerald' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' :
                    'border-green-500/30 text-green-400 bg-green-500/5'}`}
              >
                {s.icon} {s.label}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pointer-events-auto items-center"
          >
            <a
              href="#about"
              className="group w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-black
                         bg-green-400 hover:bg-green-300
                         transition-all duration-200 transform hover:scale-105
                         shadow-[0_0_25px_rgba(0,255,133,0.4)]
                         text-center flex items-center justify-center gap-2"
            >
              Discover More
            </a>
            <a
              href="#contact"
              className="group w-full sm:w-auto px-8 py-3 rounded-lg font-semibold font-mono text-green-400
                         bg-transparent hover:bg-green-500/10
                         transition-all duration-200
                         border border-green-500/40 hover:border-green-400
                         text-center flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              Contact
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-mono text-green-500/60 tracking-widest">SCROLL</span>
        <ChevronDown size={20} className="text-green-500/60" />
      </motion.div>
    </section>
  );
};

export default Hero;
