import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Linkedin, ChevronRight, Terminal, Shield } from 'lucide-react';

/* ── Matrix Rain (lightweight, throttled to 30fps) ─────────────── */
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const cols = Math.floor(W / 20);
    const drops = Array(cols).fill(1);
    const chars = '01アイウHACKERROOT>_$#CTRL+ALT+DEL';
    let raf;
    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { raf = requestAnimationFrame(draw); return; }
      ctx.fillStyle = 'rgba(3,3,3,0.14)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '14px JetBrains Mono, monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.9;
        ctx.fillStyle = bright ? 'rgba(0,255,133,0.9)' : 'rgba(0,255,133,0.28)';
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
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
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
}

/* ── Blink cursor ───────────────────────────────────────────────── */
function BlinkCursor() {
  return <span className="inline-block w-[3px] h-[1.1em] bg-green-400 align-middle ml-0.5 animate-pulse" />;
}

/* ── Social links data ─────────────────────────────────────────── */
const socials = [
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    href: 'https://github.com/supro1234',
    color: 'hover:text-white hover:border-white/60',
  },
  {
    icon: <Instagram size={22} />,
    label: 'Instagram',
    href: 'https://www.instagram.com/marvel_gallen1000/?hl=en',
    color: 'hover:text-pink-400 hover:border-pink-400/60',
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/supratim-mukherjee-5319b1194',
    color: 'hover:text-blue-400 hover:border-blue-400/60',
  },
];

/* ── Landing Page Component ─────────────────────────────────────── */
const Landing = ({ onEnter }) => {
  const [bootText, setBootText] = useState('');
  const bootLines = 'SYSTEM BOOT... ACCESS GRANTED';

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setBootText(bootLines.slice(0, i + 1));
      i++;
      if (i >= bootLines.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030303]"
      style={{ userSelect: 'none' }}
    >
      {/* Matrix background */}
      <MatrixRain />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-green-600/8 blur-[150px]" />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,133,0.018) 3px, rgba(0,255,133,0.018) 4px)',
        }}
      />

      {/* Content card */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg w-full">

        {/* Shield emblem */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8 relative"
        >
          <div className="w-20 h-20 rounded-2xl border border-green-500/40 bg-green-500/5 flex items-center justify-center"
            style={{ boxShadow: '0 0 40px rgba(0,255,133,0.15)' }}>
            <Shield size={36} className="text-green-400" />
          </div>
          {/* Ping rings */}
          <span className="absolute inset-0 rounded-2xl border border-green-500/30 animate-ping" style={{ animationDuration: '2.5s' }} />
        </motion.div>

        {/* Eliminated boot text to maintain professional portfolio vibe */}

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-2"
          style={{ textShadow: '0 0 60px rgba(0,255,133,0.25)' }}
        >
          Supratim
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-display font-medium text-green-400 text-base sm:text-xlt tracking-wide uppercase mb-2"
        >
          Cybersecurity Student
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="font-display font-medium text-gray-200 text-sm tracking-wider uppercase mb-10"
        >
          Ethical Hacker · CTF Player · Pentester
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className={`w-12 h-12 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center
                text-gray-400 transition-all duration-200 ${s.color}
                hover:bg-white/8 hover:shadow-[0_0_20px_rgba(0,255,133,0.1)]`}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Discover More button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="group relative flex items-center gap-3 px-10 py-4 font-display font-bold text-sm rounded-xl
                     bg-green-400 text-black
                     shadow-[0_0_30px_rgba(0,255,133,0.4)] hover:shadow-[0_0_50px_rgba(0,255,133,0.65)]
                     transition-all duration-200"
        >
          Discover More
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>

        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-green-500/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-green-500/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-500/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan-500/30 rounded-br-lg" />
      </div>
    </motion.div>
  );
};

export default Landing;
