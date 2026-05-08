import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Rocket, Cpu, Layers, Award, Mail, Home } from 'lucide-react';
import { Magnetic } from './Magnetic';

const navLinks = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#profile', icon: Cpu },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Skills', href: '#skills', icon: Rocket },
  { name: 'Certs', href: '#certificates', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Backdrop blur and border visibility
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -70% 0px', // Trigger when section enters top 30% of viewport
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let topMostSection: IntersectionObserverEntry | null = null;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!topMostSection || entry.boundingClientRect.top > topMostSection.boundingClientRect.top) {
            topMostSection = entry;
          }
        }
      });
      
      if (topMostSection) {
        const id = topMostSection.target.id;
        if (navLinks.some(link => link.href === `#${id}`)) {
          setActiveSection(id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sections = ['hero', 'profile', 'projects', 'skills', 'certificates', 'experience', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      setIsMobileMenuOpen(false);
      
      elem.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-dark-bg/60 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(168,85,247,0.05)]' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-center relative">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 glass px-2 py-1.5 rounded-full border-white/5">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeSection === link.href.replace('#', '') ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] mt-1"
                    />
                  )}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="absolute right-6 flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center glass rounded-full border-white/5 text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Anti-gravity particles in navbar background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%'
              }}
            />
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-dark-bg/95 backdrop-blur-3xl flex flex-col p-10 font-sans"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="text-white font-black italic tracking-tighter text-3xl">AV.</div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center glass rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-400 transition-colors">
                    <link.icon size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-3xl font-black italic tracking-tighter group-hover:neon-text-blue transition-all">
                      {link.name.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">Protocol_0{i + 1}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Transmission_Secure</div>
              <div className="flex gap-6">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                {/* Add more social icons if needed */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
