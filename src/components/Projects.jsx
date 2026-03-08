import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const githubUsername = 'supro1234';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const data = await response.json();
        // Filter out forks and empty repositories
        const filteredRepos = data.filter(repo => !repo.fork && repo.name !== githubUsername).slice(0, 6);
        setRepos(filteredRepos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Language color mapper
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      HTML: '#e34c26',
      CSS: '#563d7c',
      TypeScript: '#3178c6',
    };
    return colors[lang] || '#8b949e';
  };

  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-blue-500">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg flex items-center justify-center">
            <Github className="mr-2 text-white" size={20} /> 
            Pulled directly from my <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-300 ml-1 font-semibold">GitHub Profile</a>
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div key={skeleton} className="h-64 bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-400/10 p-6 rounded-xl border border-red-400/20 max-w-2xl mx-auto">
            Failed to load projects: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group flex flex-col justify-between bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 transition-all shadow-lg hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Code2 size={24} />
                    </div>
                    <div className="flex space-x-3 text-gray-400 text-sm">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center"><Star size={14} className="mr-1" /> {repo.stargazers_count}</span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center"><GitFork size={14} className="mr-1" /> {repo.forks_count}</span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 h-[60px]">
                    {repo.description || "A project exploring software engineering concepts and clean code architecture."}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <div className="flex items-center">
                    {repo.language && (
                      <div className="flex items-center text-xs font-medium text-gray-300">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        {repo.language}
                      </div>
                    )}
                  </div>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center"
                    aria-label={`View ${repo.name} source code on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && !error && (
          <div className="text-center mt-12">
            <a 
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-white rounded-full font-medium transition-all"
            >
              View More on GitHub <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
