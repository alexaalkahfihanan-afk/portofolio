import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { ArrowDownRight } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

export function Hero() {
  const container = useRef(null);
  const [typedTitle, setTypedTitle] = useState("");
  const [showSub, setShowSub] = useState(false);
  const fullTitle = "ALEXA";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) {
        clearInterval(interval);
        setShowSub(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  return (
    <section 
      id="hero" 
      ref={container} 
      className="relative h-screen w-full overflow-hidden grain bg-black"
    >
      <motion.div 
        style={{ 
          y,
          opacity,
          scale
        }} 
        className="w-full h-full flex flex-col items-start justify-center pt-20"
      >
        <HeroBackground />
        
        <div className="container relative z-10 mx-auto px-6 lg:px-24">
          <div className="max-w-5xl">
            <div className="flex items-center justify-start gap-4 mb-10">
              <span className="px-4 py-1.5 text-[10px] font-mono bg-white/5 border border-white/10 text-blue-400 rounded-full uppercase tracking-[0.2em] backdrop-blur-md">
                System_Initiated
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black italic tracking-tighter leading-[0.85] mb-10 text-white uppercase center text">
              <span className="relative">
                {typedTitle}
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 md:w-3 h-10 md:h-16 bg-blue-500 ml-2 align-middle" 
                />
              </span>
              <br />
              <AnimatePresence>
                {showSub && (
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-stroke block mt-2"
                    style={{ WebkitTextStroke: '1px white', color: 'transparent', fontFamily: 'system-ui, sans-serif' }}
                  >
                    ALKAHFI
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
            
            <motion.p 
              className="max-w-md text-base md:text-lg text-gray-400 font-light mb-12 leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Crafting <span className="text-white border-b border-purple-500/50">Frontend Developer focused on building responsive and interactive web applications using React and modern web technologies.</span> through technical precision and experimental aesthetics.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Magnetic>
                <button
                  onClick={() => document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-12 py-5 bg-white text-black font-bold text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-transform active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Archive <ArrowDownRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </button>
              </Magnetic>
              
              <Magnetic>
                <button className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors cursor-pointer group">
                  <span className="w-12 h-[1px] bg-white/10 group-hover:w-20 group-hover:bg-blue-400 transition-all" /> Identity protocol
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-12 left-24 flex flex-col items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSub ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4 ml-1">Scroll_Down</span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
