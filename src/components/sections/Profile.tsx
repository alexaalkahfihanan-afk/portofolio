import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Eye, Play, Shield, Award, Calendar, Zap } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Profile() {
  const sectionRef = useRef(null);
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(exitProgress, [0, 1], [0, -100]);

  return (
    <section 
      id="profile" 
      ref={sectionRef} 
      className="py-32 bg-black relative overflow-hidden grain z-10 border-t border-white/5"
    >
      {/* Top Overlap Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-30" />
      
      {/* Top Transition Gradient */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-20" />
      
      {/* Decorative anti-gravity background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y: yParallax }}
        className="container mx-auto px-6 max-w-6xl relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Visual Panel */}
          <div className="lg:col-span-5 relative group">
            <motion.div 
              className="relative aspect-[3.5/4.5] rounded-[2rem] overflow-hidden glass p-3 shadow-[0_0_40px_rgba(168,85,247,0.08)] border-white/5"
            >
              <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden">
                 <motion.img 
                   src="/profile.jpeg" 
                   alt="Profile"
                   className="w-full h-full object-cover grayscale brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
                 
                 {/* Floating internal elements */}
                 <div className="absolute inset-0 pointer-events-none">
                    <motion.div 
                      animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute top-8 right-8 w-16 h-16 glass rounded-xl flex items-center justify-center opacity-30 backdrop-blur-md"
                    >
                      <Zap className="w-6 h-6 text-blue-400" />
                    </motion.div>
                 </div>
              </div>
            </motion.div>
            
            <div className="absolute -inset-8 bg-gradient-to-tr from-neon-purple/5 to-neon-blue/5 blur-3xl -z-10 opacity-40" />
          </div>

          {/* Right Side: Content Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-blue-400 mb-4 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-blue-400" /> Identity_Protocol
              </span>
              
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-[0.9] text-white mb-6">
                WHO IS <br />
                <span className="text-stroke">Alexa/Alex</span>
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-md">
                I'm a beginner developer passionate about building web applications like <span className="text-white italic">CRUD systems</span>. I work with frontend and backend technologies to create functional and user-friendly web experiences.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mb-10">
                <div className="px-5 py-3 glass rounded-xl flex items-center gap-3 hover:border-blue-400/20 transition-all group">
                  <Shield className="w-4 h-4 text-blue-400 opacity-60 group-hover:opacity-100" />
                  <div>
                    <div className="text-[10px] font-bold text-white uppercase">Junior Programmer</div>
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Code Academy</div>
                  </div>
                </div>
                
                <div className="px-5 py-3 glass rounded-xl flex items-center gap-3 hover:border-purple-400/20 transition-all group">
                  <Award className="w-4 h-4 text-purple-400 opacity-60 group-hover:opacity-100" />
                  <div>
                    <div className="text-[10px] font-bold text-white uppercase">Frontend</div>
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Global Hub</div>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-12 items-center mb-10">
                <div>
                  <div className="text-3xl md:text-4xl font-black italic text-white mb-0.5">
                    <Counter value={2} suffix="+" />
                  </div>
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">Years</div>
                </div>
                <div className="w-[1px] h-8 bg-white/5" />
                <div>
                  <div className="text-3xl md:text-4xl font-black italic text-white mb-0.5">
                    <Counter value={4} />
                  </div>
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">Projects</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-6">
                <Magnetic>
                  <button
                    onClick={() => window.open('/cv1.pdf', '_blank')}
                    className="group relative px-8 py-3.5 bg-white text-black font-bold text-[9px] tracking-widest uppercase overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  >
                    <span className="relative z-10 flex items-center gap-2 italic">
                      Lihat CV <Eye className="w-3.5 h-3.5" />
                    </span>
                    <div className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-80" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
