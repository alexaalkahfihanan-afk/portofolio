import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUpRight, Cpu, Layers, Rocket, Award, ExternalLink } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

const navLinks = [
  { name: 'Home', href: '#hero', icon: Rocket },
  { name: 'About', href: '#profile', icon: Cpu },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Skills', href: '#skills', icon: Rocket },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const socials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/alexaalkahfihanan-afk' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/alexa-alkafi-2633a5373/' },
];

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-black pt-32 pb-12 overflow-hidden">
      {/* Background Lighting & Particles */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neon-purple/5 blur-[150px] rounded-full -z-10" />
      
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-neon-purple rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${10 + i * 5}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          
          {/* Column 1: Branding & Statement */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-black italic tracking-tighter text-white mb-8">
              AV.
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-sans">
              Forging the next generation of <span className="text-zinc-300">immersive digital experiences</span> through experimental code and visionary design.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">System_Active_2026</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-10">Directory</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-blue-400 transition-all opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Connect */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-10">Transmissions</h4>
            <div className="flex flex-col gap-6">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between group p-4 rounded-2xl glass border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                      <social.icon size={18} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">{social.name}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-blue-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: CTA & Stats */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-10">Initiate</h4>
            <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h5 className="text-xl font-black italic text-white uppercase tracking-tighter mb-4 leading-tight">
                Let's evolve <br />together.
              </h5>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-white text-black font-black text-[10px] tracking-widest uppercase hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-lg"
              >
                Send Signal
              </button>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Projects</div>
                <div className="text-lg font-black text-white italic tracking-tighter">4</div>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Frontend</div>
                <div className="text-lg font-black text-white italic tracking-tighter">Frontend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">© 2026 AXEL VOID</span>
            <div className="w-[1px] h-3 bg-white/10" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">DESIGNED FOR THE FUTURE</span>
          </div>

          <div className="flex gap-8">
             <a href="#" className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Privacy_Policy</a>
             <a href="#" className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Security_Audit</a>
             <a href="#" className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Terminals</a>
          </div>
          
          <Magnetic>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Back to Top <div className="w-8 h-8 rounded-full glass border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Rocket size={14} className="-rotate-45" />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
