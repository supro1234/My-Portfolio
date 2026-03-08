import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Code2, Database } from 'lucide-react';

const About = () => {
  const skillCategories = [
    {
      title: 'Frontend Mastery',
      icon: <Code2 className="text-blue-400 mb-2" size={24} />,
      skills: [
        { name: 'React.js & Vite', level: '90%' },
        { name: 'Tailwind CSS', level: '95%' },
        { name: 'Three.js / 3D', level: '75%' },
        { name: 'Framer Motion', level: '85%' },
      ]
    },
    {
      title: 'Cyber Security & AI',
      icon: <Terminal className="text-red-400 mb-2" size={24} />,
      skills: [
        { name: 'Ethical Hacking', level: '85%' },
        { name: 'Network Security', level: '80%' },
        { name: 'Security Compliance (ISMS)', level: '75%' },
        { name: 'Generative AI / LLMs', level: '80%' },
      ]
    },
    {
      title: 'Core CSE & Backend',
      icon: <Database className="text-purple-400 mb-2" size={24} />,
      skills: [
        { name: 'C / C++', level: '90%' },
        { name: 'Python', level: '85%' },
        { name: 'Data Structures & Algos', level: '85%' },
        { name: 'SQL / Databases', level: '80%' },
      ]
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About <span className="text-blue-500">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card - Left Side (Spans 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <BookOpen className="text-blue-400 mb-6" size={48} />
            <h3 className="text-2xl font-semibold mb-4 text-white">B.Tech CSE Student</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I am currently pursuing my 2nd Year in Bachelor of Technology (Computer Science and Engineering). I have a strong passion for web development, interactive 3D graphics, and building robust software solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My core academic focus revolves around mastering low-level concepts like Data Structures, C++, and Object-Oriented Programming, while my project work pushes boundaries using cutting-edge frontend web technologies.
            </p>
          </motion.div>

          {/* Skills Section - Right Side (Spans 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            {skillCategories.map((category, idx) => (
              <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                        <span className="text-gray-500 text-xs">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" 
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level }}
                          transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
