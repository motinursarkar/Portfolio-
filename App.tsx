
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, SKILLS, PROJECTS } from './constants';
import { RadarChart } from './components/RadarChart';
import { ChatAssistant } from './components/ChatAssistant';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-card py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-display text-2xl font-bold tracking-tighter">
            MOTINUR<span className="text-primary">.</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <a href="#contact" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              Available for Internships
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Designing the <span className="gradient-text">Future</span> of Electronics.
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              I am <span className="text-white font-medium">Motinur Sarkar</span>, an EEE student at University of Chittagong. 
              Bridging the gap between hardware and software through innovative engineering.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:translate-y-[-2px] transition-transform shadow-xl shadow-primary/20">
                View Projects
              </button>
              <button className="glass-card px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                About Me
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden relative z-10 border border-white/10 group">
              <img src="https://picsum.photos/seed/motinur/800/800" alt="Motinur" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-display font-bold mb-4">Academic <br/>Foundations</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-slate-400 italic">
                "Learning at University of Chittagong has broadened my horizons in electrical sciences."
              </p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <i className="fa-solid fa-graduation-cap text-primary text-3xl mb-4"></i>
                <h4 className="font-bold mb-2">B.Sc. in EEE</h4>
                <p className="text-sm text-slate-400">University of Chittagong. Focus on Control Systems and Microelectronics.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <i className="fa-solid fa-microchip text-secondary text-3xl mb-4"></i>
                <h4 className="font-bold mb-2">Research Focus</h4>
                <p className="text-sm text-slate-400">Deep interest in sustainable energy solutions and smart automation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Technical Expertise</h2>
            <p className="text-slate-400">A data-driven view of my core competencies.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RadarChart skills={SKILLS.filter(s => s.category === 'Core EEE')} />
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Key Disciplines</h3>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map(skill => (
                  <div key={skill.name} className="glass-card p-4 rounded-xl border-l-4 border-primary/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">{skill.name}</span>
                      <span className="text-xs text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Featured Works</h2>
              <p className="text-slate-400">Selected academic and personal engineering projects.</p>
            </div>
            <button className="text-primary hover:underline font-semibold flex items-center gap-2">
              View All <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map(project => (
              <div key={project.id} className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-dark/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto glass-card p-10 rounded-3xl border-primary/20 relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-400">Have a project in mind or want to discuss opportunities?</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                <input type="text" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input type="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
              <textarea rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"></textarea>
            </div>
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Send Message
            </button>
          </form>
          <div className="mt-12 flex justify-center space-x-6 text-slate-400">
            <a href="#" className="hover:text-primary transition-colors text-2xl"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="hover:text-primary transition-colors text-2xl"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="hover:text-primary transition-colors text-2xl"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Motinur Sarkar. Built with React & Gemini AI.</p>
      </footer>

      {/* AI Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;
