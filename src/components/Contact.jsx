import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-purple-500">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <a href="mailto:supratimmukherjee015@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/50 backdrop-blur-sm group">
                <div className="bg-purple-500/20 p-3 rounded-xl mr-4 group-hover:bg-purple-500 transition-colors">
                  <Mail className="text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Email Me</span>
                  <span className="text-lg font-medium">supratimmukherjee015@gmail.com</span>
                </div>
              </a>

              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/50 backdrop-blur-sm group">
                <div className="bg-blue-500/20 p-3 rounded-xl mr-4 group-hover:bg-blue-500 transition-colors">
                  <Linkedin className="text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Professional Profile</span>
                  <span className="text-lg font-medium">LinkedIn Network</span>
                </div>
              </a>
              
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-gray-500/50 backdrop-blur-sm group">
                <div className="bg-gray-500/20 p-3 rounded-xl mr-4 group-hover:bg-gray-500 transition-colors">
                  <Github className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Code Portfolio</span>
                  <span className="text-lg font-medium">GitHub Projects</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  placeholder="What's on your mind?"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex justify-center items-center"
              >
                Send Message <Send size={18} className="ml-2" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="text-center mt-24 text-gray-600 text-sm border-t border-white/5 pt-8">
        © {new Date().getFullYear()} B.Tech CSE Portfolio. Designed with React & Three.js.
      </div>
    </section>
  );
};

export default Contact;
