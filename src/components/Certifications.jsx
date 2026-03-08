import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const Certifications = () => {
  const driveLink = "https://drive.google.com/drive/folders/15NdMx2iVRpXsF_-LK6iQHgk24skdYcas?usp=drive_link";

  const certifications = [
    {
      id: 1,
      name: "Cyber Security",
      issuer: "Boston Institute of Analytics",
      date: "Completed",
      image: "/certs/Screenshot_20260119_113957_Chrome.jpg",
      skills: ["Cyber Security", "Threat Intel", "Network Security"]
    },
    {
      id: 2,
      name: "Ethical Hacking",
      issuer: "Boston Institute of Analytics",
      date: "Completed",
      image: "/certs/Screenshot_20260119_113927_Chrome.jpg",
      skills: ["Ethical Hacking", "Vulnerability Assessment", "Pen Testing"]
    },
    {
      id: 3,
      name: "Responsible AI Practitioner",
      issuer: "FHCC",
      date: "Beginner Level",
      image: "/certs/FHCC-Supratim-AI.png",
      skills: ["Artificial Intelligence", "AI Ethics", "Responsible AI"]
    },
    {
      id: 4,
      name: "ISMS Practitioner",
      issuer: "FHCC",
      date: "Beginner Level",
      image: "/certs/FHCC-Supratim-ISMS.png",
      skills: ["Information Security", "ISMS", "Compliance"]
    },
    {
      id: 5,
      name: "Cyber Risk Practitioner",
      issuer: "FHCC",
      date: "Beginner Level",
      image: "/certs/FHCC-Supratim-Risk.png",
      skills: ["Risk Management", "Cyber Risk", "Threat Mitigation"]
    },
    {
      id: 6,
      name: "Intro to Cybersecurity Awareness",
      issuer: "HP LIFE",
      date: "Completed",
      image: "/certs/Introduction to Cybersecurity Awareness_copy.png",
      skills: ["Cybersecurity Basics", "Threat Awareness", "Digital Safety"]
    },
    {
      id: 7,
      name: "Effective Leadership",
      issuer: "HP LIFE",
      date: "Completed",
      image: "/certs/Effective Leadership_copy.png",
      skills: ["Leadership", "Team Management", "Communication"]
    },
    {
      id: 8,
      name: "Build with Gemini",
      issuer: "Google",
      date: "Completed",
      image: "/certs/Build with Gemini.png",
      skills: ["Generative AI", "Google Gemini API"]
    },
    {
      id: 9,
      name: "AI for Beginners",
      issuer: "Independent",
      date: "Completed",
      image: "/certs/AI for Beginners_copy.png",
      skills: ["Machine Learning", "AI Fundamentals"]
    },
    {
      id: 10,
      name: "Certificate of Participation",
      issuer: "General",
      date: "Completed",
      image: "/certs/Certificate of Participation_copy.png",
      skills: ["Active Participation", "Continuous Learning"]
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-[#0a0a0a] relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-blue-500">Certifications</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my continuous learning journey. You can view the original high-resolution certificates directly in my <a href={driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">Google Drive folder</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-xl flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-56 md:h-64 w-full overflow-hidden bg-gray-900 group">
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10"></div>
                
                <div className="absolute bottom-4 left-6 right-6 z-10 pointer-events-none">
                  <span className="inline-block px-3 py-1 bg-blue-500/80 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-2">
                    {cert.date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{cert.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{cert.issuer}</p>
                </div>
              </div>

              {/* Skills Body */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-black/40 backdrop-blur-sm z-10 relative">
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
                    Skills Acquired
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="flex items-center text-sm px-3 py-1.5 bg-white/5 border border-white/10 text-gray-200 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300 transition-colors"
                      >
                        <CheckCircle2 size={14} className="mr-1.5 text-blue-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action for full drive */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href={driveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-blue-500/50 hover:bg-blue-500/10 text-blue-400 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Access All Raw Certificates <ExternalLink size={20} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
