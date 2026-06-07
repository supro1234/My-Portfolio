import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ShieldCheck, Cpu, Brain } from 'lucide-react';

const driveLink = "https://drive.google.com/drive/folders/15NdMx2iVRpXsF_-LK6iQHgk24skdYcas?usp=drive_link";

const certifications = [
  { id:1,  name:"Cyber Security",                issuer:"Boston Institute of Analytics", image:"/certs/Screenshot_20260119_113957_Chrome.jpg",  skills:["Threat Intel","Network Security","SIEM"],          color:"#00e5ff", icon:"shield" },
  { id:2,  name:"Ethical Hacking",               issuer:"Boston Institute of Analytics", image:"/certs/Screenshot_20260119_113927_Chrome.jpg",  skills:["Pen Testing","Exploit Dev","Vuln Assessment"],    color:"#f43f5e", icon:"cpu"    },
  { id:3,  name:"Responsible AI Practitioner",   issuer:"FHCC",                          image:"/certs/FHCC-Supratim-AI.png",                   skills:["AI Ethics","Governance","Responsible AI"],        color:"#a855f7", icon:"brain"  },
  { id:4,  name:"ISMS Practitioner",             issuer:"FHCC",                          image:"/certs/FHCC-Supratim-ISMS.png",                 skills:["ISO 27001","Compliance","Security Mgmt"],         color:"#06b6d4", icon:"shield" },
  { id:5,  name:"Cyber Risk Practitioner",       issuer:"FHCC",                          image:"/certs/FHCC-Supratim-Risk.png",                 skills:["Risk Assessment","Threat Modelling","Mitigation"],color:"#f59e0b", icon:"shield" },
  { id:6,  name:"Cybersecurity Awareness",       issuer:"HP LIFE",                       image:"/certs/Introduction to Cybersecurity Awareness_copy.png", skills:["Digital Safety","Threat Awareness","Hygiene"], color:"#10b981", icon:"shield" },
  { id:7,  name:"Effective Leadership",          issuer:"HP LIFE",                       image:"/certs/Effective Leadership_copy.png",           skills:["Leadership","Team Mgmt","Communication"],         color:"#f97316", icon:"brain"  },
  { id:8,  name:"Build with Gemini",             issuer:"Google",                        image:"/certs/Build with Gemini.png",                  skills:["Gemini API","Gen AI","Prompt Eng"],               color:"#6366f1", icon:"brain"  },
  { id:9,  name:"AI for Beginners",              issuer:"Independent",                   image:"/certs/AI for Beginners_copy.png",              skills:["ML Basics","Neural Nets","AI Fundamentals"],      color:"#ec4899", icon:"brain"  },
  { id:10, name:"Certificate of Participation",  issuer:"General",                       image:"/certs/Certificate of Participation_copy.png",  skills:["Active Learning","Growth Mindset"],               color:"#84cc16", icon:"shield" },
];

// ── rotating gradient border (impossible to hand-write CSS) ──────
function HoloBorder({ color, active }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl pointer-events-none"
      style={{ padding: '1.5px' }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{ rotate: active ? [0, 360] : 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${color}, transparent 70%)`,
          borderRadius: 'inherit',
        }}
      />
    </motion.div>
  );
}

// ── glitch scanline overlay ───────────────────────────────────────
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-20"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
      }}
    />
  );
}

// ── animated verify checkmark ────────────────────────────────────
function VerifyBadge({ color }) {
  return (
    <motion.div
      className="absolute top-3 right-3 z-20"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
    >
      <motion.div
        animate={{ boxShadow: [`0 0 0px ${color}`, `0 0 12px ${color}`, `0 0 0px ${color}`] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: color + '22', border: `1.5px solid ${color}` }}
      >
        <ShieldCheck size={14} style={{ color }} />
      </motion.div>
    </motion.div>
  );
}

// ── skill neural dots ─────────────────────────────────────────────
function NeuralSkills({ skills, color }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {skills.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="relative text-[11px] px-2.5 py-1 rounded-full font-semibold tracking-wide"
          style={{
            background: color + '18',
            border: `1px solid ${color}55`,
            color,
          }}
        >
          {/* pulsing dot */}
          <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ background: color }} />
          {s}
        </motion.span>
      ))}
    </div>
  );
}

// ── single cert card ─────────────────────────────────────────────
function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ background: 'rgba(5,3,15,0.55)' }}
    >
      {/* rotating gradient border */}
      <HoloBorder color={cert.color} active={hovered} />

      {/* static thin border always visible */}
      <div className="absolute inset-0 rounded-3xl border border-white/8 pointer-events-none z-20" />

      {/* cert image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={cert.image}
          alt={cert.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
        />
        {/* scan overlay */}
        <ScanLines />
        {/* gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent z-10" />

        {/* animated scan line sweeping down on hover */}
        {hovered && (
          <motion.div
            className="absolute left-0 right-0 h-px z-30"
            style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
            initial={{ top: 0 }}
            animate={{ top: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <VerifyBadge color={cert.color} />
      </div>

      {/* content */}
      <div className="p-5 relative z-10">
        {/* issuer */}
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: cert.color }}>
          {cert.issuer}
        </p>
        <h3 className="text-sm font-bold text-white leading-snug mb-3">{cert.name}</h3>

        <NeuralSkills skills={cert.skills} color={cert.color} />

        {/* bottom meter line */}
        <div className="mt-4 h-px w-full bg-white/5 overflow-hidden rounded">
          <motion.div
            className="h-full rounded"
            style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.05 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const Certifications = () => (
  <section id="certifications" className="py-24 bg-transparent relative">
    {/* glass backing */}
    <div className="absolute inset-0 bg-black/25 backdrop-blur-md pointer-events-none" />

    <div className="container mx-auto px-6 md:px-12 relative z-10">
      {/* heading */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          className="text-[10px] font-bold tracking-[0.35em] text-green-400 uppercase mb-3"
        >
          ◈ Verified Credentials ◈
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-4"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-400">
            Certifications
          </span>
        </motion.h2>
        <div className="h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {certifications.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <motion.a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-green-500/40
                     bg-green-500/10 text-green-300 font-semibold text-sm uppercase tracking-widest
                     transition-colors hover:bg-green-500/20"
        >
          View All Raw Certificates <ExternalLink size={16} />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default Certifications;
