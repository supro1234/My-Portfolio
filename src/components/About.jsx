import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Code2, Database } from 'lucide-react';

// ── Animated count-up number ──────────────────────────────────────
function CountUp({ to, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += 1;
      if (ref.current) ref.current.textContent = start + '%';
      if (start < to) requestAnimationFrame(step);
    };
    // delay for cinematic feel
    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [inView, to]);
  return <span ref={ref}>0%</span>;
}

// ── Hexagonal SVG progress ring ───────────────────────────────────
// r=40, circumference of hexagon perimeter for the stroke-dasharray
function HexRing({ percent, color1, color2, label, delay = 0 }) {


  const size = 100;
  const cx = 50, cy = 50;
  const R = 38;  // hex radius

  // 6 corners of the hexagon
  const hex = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return [cx + R * Math.cos(angle), cy + R * Math.sin(angle)];
  });
  const hexPoints = hex.map(p => p.join(',')).join(' ');

  // Perimeter of regular hexagon = 6 * side = 6 * R (approx)
  const perim = 6 * R;
  const dash  = (percent / 100) * perim;

  const id = `grad-${label.replace(/\s/g, '')}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
            {/* glow filter */}
            <filter id={`glow-${label.replace(/\s/g,'')}`}>
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* dark hex background */}
          <polygon
            points={hexPoints}
            fill="rgba(0,0,0,0.5)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* progress hex outline */}
          <motion.polygon
            points={hexPoints}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${label.replace(/\s/g,'')})`}
            initial={{ strokeDasharray: `0 ${perim}`, strokeDashoffset: 0 }}
            whileInView={{
              strokeDasharray: `${dash} ${perim - dash}`,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
          />

          {/* center percentage */}
          <text
            x={cx} y={cy + 4}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="white"
            fontFamily="system-ui"
          >
            {percent}%
          </text>
        </svg>
      </div>
      <span className="text-xs text-gray-300 text-center font-medium leading-tight">{label}</span>
    </motion.div>
  );
}

// ── Skill category config ─────────────────────────────────────────
const skillCategories = [
  {
    title: 'Frontend Mastery',
    icon: <Code2 className="text-green-400" size={20} />,
    color1: '#00e5ff', color2: '#00ff85',
    skills: [
      { name: 'React.js & Vite', level: 90 },
      { name: 'Tailwind CSS',    level: 95 },
      { name: 'Three.js / 3D',  level: 75 },
      { name: 'Framer Motion',  level: 85 },
    ]
  },
  {
    title: 'Cyber Security & AI',
    icon: <Terminal className="text-green-400" size={20} />,
    color1: '#00ff85', color2: '#ffb74d',
    skills: [
      { name: 'Ethical Hacking',     level: 85 },
      { name: 'Network Security',    level: 80 },
      { name: 'ISMS Compliance',     level: 75 },
      { name: 'Gen AI / LLMs',       level: 80 },
    ]
  },
  {
    title: 'Core CSE & Backend',
    icon: <Database className="text-cyan-400" size={20} />,
    color1: '#00e5ff', color2: '#00ff85',
    skills: [
      { name: 'C / C++',              level: 90 },
      { name: 'Python',               level: 85 },
      { name: 'Data Structures',      level: 85 },
      { name: 'SQL / Databases',      level: 80 },
    ]
  },
];

// ── Main Component ────────────────────────────────────────────────
const About = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Section glass */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-black mb-4 text-white"
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
              Me
            </span>
          </motion.h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Bio card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-4 p-5 sm:p-8 rounded-2xl border border-white/8
                       bg-black/15 backdrop-blur-2xl shadow-xl relative overflow-hidden"
          >
            {/* animated glow orb */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-12 -right-12 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-600/20 rounded-full blur-3xl"
            />

            <BookOpen className="text-green-400 mb-5" size={44} />
            <h3 className="text-xl font-bold mb-4 text-white">B.Tech CSE Student</h3>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Pursuing 2nd Year in B.Tech (Computer Science & Engineering). Passionate about
              web, 3D graphics, cyber security, and AI-driven software.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm">
              Core focus: Data Structures, C++, OOP — while pushing boundaries with cutting-edge
              frontend technologies that blur the line between art and engineering.
            </p>

            {/* Decorative scanline */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            <div className="mt-3 flex flex-wrap gap-2">
              {['React','Three.js','Python','C++','Ethical Hacking','Gen AI'].map(t => (
                <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Skill HUD panels ─────────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.15 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/8
                           bg-black/12 backdrop-blur-xl
                           hover:border-green-500/25 transition-colors duration-500
                           shadow-lg relative overflow-hidden"
              >
                {/* category header */}
                <div className="flex items-center gap-3 mb-6">
                  {cat.icon}
                  <h3 className="text-base font-bold text-white tracking-wide">{cat.title}</h3>
                </div>

                {/* hex ring grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
                  {cat.skills.map((sk, si) => (
                    <HexRing
                      key={si}
                      percent={sk.level}
                      label={sk.name}
                      color1={cat.color1}
                      color2={cat.color2}
                      delay={ci * 0.1 + si * 0.12}
                    />
                  ))}
                </div>

                {/* neon bottom border pulse */}
                <motion.div
                  animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: ci * 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.color1}, ${cat.color2}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
