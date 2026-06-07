import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2, Terminal, Cpu } from 'lucide-react';

const githubUsername = 'supro1234';

const langMeta = {
  JavaScript: { color: '#f1e05a', glow: '#f1e05a55' },
  Python:     { color: '#3572A5', glow: '#3572A555' },
  Java:       { color: '#b07219', glow: '#b0721955' },
  'C++':      { color: '#f34b7d', glow: '#f34b7d55' },
  HTML:       { color: '#e34c26', glow: '#e34c2655' },
  CSS:        { color: '#563d7c', glow: '#563d7c55' },
  TypeScript: { color: '#3178c6', glow: '#3178c655' },
};

// ── typewriter for repo name ──────────────────────────────────────
function Typewriter({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, 30);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(id);
  }, [inView, text, delay]);

  return <span ref={ref}>{displayed}<span className="animate-pulse text-green-400">_</span></span>;
}

// ── corner bracket SVG on each card ──────────────────────────────
function CornerBrackets({ color }) {
  const s = 12;
  const w = 2;
  const corners = [
    // top-left
    { x: 4,  y: 4,  d: `M${4+s},${4} L${4},${4} L${4},${4+s}` },
    // top-right  (right side – need opposite)
    { x: -4, y: 4,  d: `M${-4-s},${4} L${-4},${4} L${-4},${4+s}`, r: true },
    // bottom-left
    { x: 4,  y: -4, d: `M${4},${-4-s} L${4},${-4} L${4+s},${-4}` },
    // bottom-right
    { x: -4, y: -4, d: `M${-4-s},${-4} L${-4},${-4} L${-4},${-4-s}`, r: true, br: true },
  ];
  return (
    <>
      {/* top-left */}
      <svg className="absolute top-0 left-0 w-6 h-6" viewBox="0 0 20 20" fill="none">
        <path d={`M${s},2 L2,2 L2,${s}`} stroke={color} strokeWidth={w} strokeLinecap="round"/>
      </svg>
      {/* top-right */}
      <svg className="absolute top-0 right-0 w-6 h-6" viewBox="0 0 20 20" fill="none">
        <path d={`M${20-s},2 L18,2 L18,${s}`} stroke={color} strokeWidth={w} strokeLinecap="round"/>
      </svg>
      {/* bottom-left */}
      <svg className="absolute bottom-0 left-0 w-6 h-6" viewBox="0 0 20 20" fill="none">
        <path d={`M2,${20-s} L2,18 L${s},18`} stroke={color} strokeWidth={w} strokeLinecap="round"/>
      </svg>
      {/* bottom-right */}
      <svg className="absolute bottom-0 right-0 w-6 h-6" viewBox="0 0 20 20" fill="none">
        <path d={`M${20-s},18 L18,18 L18,${20-s}`} stroke={color} strokeWidth={w} strokeLinecap="round"/>
      </svg>
    </>
  );
}

// ── project card ─────────────────────────────────────────────────
function ProjectCard({ repo, index }) {
  const [hovered, setHovered] = useState(false);
  const lang = langMeta[repo.language] || { color: '#8b949e', glow: '#8b949e33' };
  const name = repo.name.replace(/-/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.34,1.56,0.64,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative p-6 rounded-2xl flex flex-col justify-between overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(10,5,25,0.55) 100%)',
        boxShadow: hovered ? `0 0 40px ${lang.glow}, inset 0 0 30px ${lang.glow}22` : 'none',
        border: `1px solid ${hovered ? lang.color + '55' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.4s ease',
      }}
    >
      {/* corner brackets */}
      <CornerBrackets color={lang.color} />

      {/* scan sweep on hover */}
      {hovered && (
        <motion.div
          className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${lang.color}, transparent)` }}
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* header row */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="p-2 rounded-xl"
            style={{ background: lang.color + '22', border: `1px solid ${lang.color}44` }}
          >
            <Code2 size={20} style={{ color: lang.color }} />
          </motion.div>

          <div className="flex gap-3 text-gray-500 text-xs">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
            )}
          </div>
        </div>

        {/* typewriter name */}
        <h3 className="text-base font-black text-white mb-2 font-mono min-h-[1.4rem]">
          <Typewriter text={name} delay={index * 0.15} />
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
          {repo.description || 'A project pushing the boundaries of software engineering.'}
        </p>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        {/* language pill */}
        {repo.language && (
          <div
            className="flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded-full"
            style={{ background: lang.color + '18', color: lang.color, border: `1px solid ${lang.color}44` }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: lang.color }}
            />
            {repo.language}
          </div>
        )}

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: lang.color + '18',
            color: lang.color,
            border: `1px solid ${lang.color}33`,
          }}
        >
          <Github size={14} /> Repo
        </a>
      </div>
    </motion.div>
  );
}

// ── skeleton loader ───────────────────────────────────────────────
function Skeleton({ i }) {
  return (
    <div className="h-56 rounded-2xl border border-white/5 animate-pulse relative overflow-hidden"
         style={{ background: 'rgba(0,0,0,0.5)' }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: 'linear' }}
      />
    </div>
  );
}

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`)
      .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
      .then(data => setRepos(data.filter(r => !r.fork && r.name !== githubUsername).slice(0, 6)))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-md pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.35em] text-green-400 uppercase mb-3"
          >
            ◈ Live GitHub Data ◈
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
              Projects
            </span>
          </motion.h2>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <Terminal size={14} className="text-green-400" />
            Streaming from{' '}
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
               className="text-green-400 hover:text-green-300 font-semibold underline underline-offset-2">
              {githubUsername}
            </a>
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} i={i} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-400/10 p-6 rounded-xl border border-red-400/20 max-w-md mx-auto">
            <Cpu size={32} className="mx-auto mb-2 opacity-50" />
            Failed to fetch: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {repos.map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} />)}
          </div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-green-500/40
                         bg-green-500/10 text-green-300 font-semibold text-sm uppercase tracking-widest"
            >
              <Github size={16} /> View All on GitHub <ExternalLink size={14} />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
