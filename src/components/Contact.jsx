import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal, Zap, Radio } from 'lucide-react';

// ── animated electromagnetic ring around icon ─────────────────────
function EMRing({ color }) {
  return (
    <span className="absolute inset-0 rounded-2xl pointer-events-none">
      {[1, 1.6, 2.3].map((scale, i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${color}` }}
          animate={{ scale: [1, scale], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
        />
      ))}
    </span>
  );
}

// ── terminal-style input ──────────────────────────────────────────
function TermInput({ label, type = 'text', placeholder, value, onChange, multiline = false }) {
  const [focused, setFocused] = useState(false);
  const base =
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-white font-mono text-sm ' +
    'focus:outline-none transition-all duration-300 placeholder-gray-600 ';
  const border = focused
    ? 'border-green-500 ring-1 ring-green-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
    : 'border-white/10';

  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest mb-2">
        <Terminal size={10} /> {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          className={base + border + ' resize-none'}
          placeholder={`> ${placeholder}`}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          className={base + border}
          placeholder={`> ${placeholder}`}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

// ── particle burst on send ────────────────────────────────────────
function ParticleBurst({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (360 / 16) * i;
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-green-400"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 60,
                  y: Math.sin((angle * Math.PI) / 180) * 60,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleSend = () => {
    setBurst(true);
    setTimeout(() => { setBurst(false); setSent(true); }, 700);
    setTimeout(() => setSent(false), 3500);
  };

  const links = [
    { icon: Mail,     label: 'Email',     sub: 'supratimmukherjee015@gmail.com', href: 'mailto:supratimmukherjee015@gmail.com', color: '#a855f7', glow: '#a855f7' },
    { icon: Linkedin, label: 'LinkedIn',  sub: 'Professional Network',            href: '#',                                      color: '#3b82f6', glow: '#3b82f6' },
    { icon: Github,   label: 'GitHub',    sub: 'supro1234',                       href: `https://github.com/supro1234`,           color: '#e2e8f0', glow: '#ffffff' },
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
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
            ◈ Open Channel ◈
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Touch
            </span>
          </motion.h2>
          <div className="h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ── contact links ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Let's Connect</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Always open for interesting conversations, collaborations, and new opportunities.
                My signal is always on.
              </p>
            </div>

            {links.map((l, i) => (
              <motion.a
                key={i}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ x: 6 }}
                className="relative flex items-center gap-4 p-4 rounded-2xl group overflow-visible"
                style={{
                  background: l.color + '0d',
                  border: `1px solid ${l.color}33`,
                }}
              >
                {/* EM rings */}
                <div className="relative shrink-0">
                  <div className="p-3 rounded-2xl relative" style={{ background: l.color + '22' }}>
                    <EMRing color={l.color} />
                    <l.icon size={20} style={{ color: l.color }} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: l.color }}>
                    {l.label}
                  </p>
                  <p className="text-sm font-medium text-white">{l.sub}</p>
                </div>
                {/* hover glow line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${l.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* pulse status */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Radio size={12} className="text-green-400" />
              System online — avg response &lt; 24h
            </div>
          </motion.div>

          {/* ── terminal form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-6 rounded-3xl border border-white/10
                       bg-black/30 backdrop-blur-xl shadow-2xl"
          >
            {/* terminal top bar */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500 font-mono">~/send-message</span>
            </div>

            <div className="space-y-5">
              <TermInput
                label="Your Name"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <TermInput
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <TermInput
                label="Message"
                placeholder="What's on your mind?"
                multiline
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />

              <div className="relative">
                <ParticleBurst active={burst} />
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full py-4 rounded-xl flex items-center justify-center gap-2
                                 font-bold text-green-400 border border-green-500/40 bg-green-500/10"
                    >
                      <Zap size={18} /> Transmission Sent!
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      onClick={handleSend}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16,185,129,0.5)' }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2
                                 bg-gradient-to-r from-green-600 to-emerald-600
                                 hover:from-green-500 hover:to-emerald-500
                                 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Send size={18} /> Send Message
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* footer */}
      <div className="text-center mt-24 text-gray-600 text-xs border-t border-white/5 pt-8 font-mono">
        © {new Date().getFullYear()} ∙ B.Tech CSE Portfolio ∙ Built with React + Three.js + AI
      </div>
    </section>
  );
};

export default Contact;
