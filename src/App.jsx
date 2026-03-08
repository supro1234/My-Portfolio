import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Certifications />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
