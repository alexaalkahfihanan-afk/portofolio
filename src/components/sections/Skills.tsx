import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { 
  Code2, 
  Cpu, 
  Figma, 
  Globe, 
  Layers, 
  Layout, 
  Palette, 
  Terminal,
  Zap,
  Video,
  LucideIcon,
  Database
} from 'lucide-react';

interface SkillData {
  name: string;
  icon: LucideIcon;
  desc: string;
  color: string;
  position: [number, number, number];
  speed: number;
}

const skills: SkillData[] = [
  { name: "Frontend", icon: Layout, desc: "React, javascript, Next.js", color: "text-blue-400", position: [-1.8, 1.2, 0], speed: 1 },
  { name: "Animation", icon: Zap, desc: "Framer Motion, GSAP", color: "text-yellow-400", position: [1.8, 1.5, -0.5], speed: 1.2 },
  { name: "Backend", icon: Terminal, desc: "Node.js, Laravel", color: "text-emerald-400", position: [1.8, -1.2, 0.5], speed: 1.1 },
  { name: "Design", icon: Figma, desc: "figma", color: "text-pink-400", position: [-1.2, -1.8, -0.2], speed: 1.3 },
  { name: "Video Editing", icon: Video, desc: "Capcut", color: "text-red-400", position: [0, 0.5, 1.5], speed: 1 },
  { name: "Databases", icon: Database, desc: "laragon, MySQL", color: "text-blue-400", position: [-3.2, -1.3, -0.1], speed: 1.3 },
];

function FloatingSkill({ skill }: { skill: SkillData }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Stop floating motion on hover, but allow smooth forward movement
    if (!hovered) {
      // Sine wave motion
      meshRef.current.position.y = skill.position[1] + Math.sin(t * skill.speed + skill.position[0]) * 0.3;
      meshRef.current.position.x = skill.position[0] + Math.cos(t * skill.speed * 0.5) * 0.2;
      
      // Rotation
      meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
      
      // Scale and Z-depth back to normal
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, skill.position[2], 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
    } else {
      // Forward push and scale on hover for "front" feel
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, skill.position[2] + 2, 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.15, 0.1));
    }
  });

  return (
    <group ref={meshRef} position={skill.position}>
      <Html 
        center 
        distanceFactor={10}
        zIndexRange={[0, hovered ? 1000 : 10]}
        style={{
          zIndex: hovered ? 100 : 1,
          pointerEvents: 'auto'
        }}
      >
        <motion.div
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}
           className="relative flex items-center justify-center cursor-pointer group"
           style={{ zIndex: hovered ? 100 : 1 }}
        >
          {/* Detailed Info Panel */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -80, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute w-48 p-4 glass rounded-2xl pointer-events-none z-50 text-center"
              >
                <div className={`text-xs font-mono uppercase tracking-[0.2em] mb-1 ${skill.color}`}>
                  {skill.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-light italic">
                  {skill.desc}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/5 backdrop-blur-md rotate-45 border-r border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Node Icon */}
          <div className="relative">
            <div className={`p-5 rounded-full glass group-hover:border-white/40 transition-colors ${skill.color} shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]`}>
              <skill.icon className="w-6 h-6" />
            </div>
            
            {/* Pulsing Aura */}
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
               transition={{ duration: 3, repeat: Infinity }}
               className={`absolute inset-0 rounded-full border border-current opacity-20 ${skill.color}`}
            />
          </div>

          <div className="absolute top-full mt-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500 opacity-60 pointer-events-none">
            {skill.name}
          </div>
        </motion.div>
      </Html>
    </group>
  );
}

const SkillCard = ({ skill, index }: { skill: SkillData, index: number }) => (
  <div className="flex-shrink-0 w-[260px] sm:w-[320px]">
    <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 p-5 sm:p-7 overflow-hidden group hover:border-white/20 transition-all duration-500">
      {/* Animated Glow Background based on skill color */}
      <div className={`absolute -top-16 -right-16 w-32 h-32 bg-current opacity-10 blur-[40px] group-hover:opacity-30 transition-opacity duration-700 ${skill.color}`} />
      <div className={`absolute -bottom-16 -left-16 w-32 h-32 bg-current opacity-10 blur-[40px] group-hover:opacity-20 transition-opacity duration-700 ${skill.color}`} />
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] tech-grid pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500" />

      {/* Scanning line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: index * 0.15 }}
        className={`absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${skill.color}`}
      />

      {/* Card Header */}
      <div className="relative flex items-start justify-between mb-8 sm:mb-10">
        <div className="relative">
          {/* Rotating Dashed Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-2 sm:-inset-3 border border-current opacity-20 rounded-full border-dashed ${skill.color}`}
          />
          {/* Inner Solid Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-1 border border-current opacity-10 rounded-full ${skill.color}`}
          />
          <div className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 ${skill.color} shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md`}>
            <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_10px_currentColor]" />
          </div>
        </div>
        
        {/* Tech ID / Serial */}
        <div className="flex flex-col items-end">
          <div className="text-[8px] sm:text-[9px] font-mono text-zinc-500 tracking-widest uppercase mb-2">
            SYS.ID // 0{((index % skills.length) + 1)}
          </div>
          {/* Signal Bars */}
          <div className="flex gap-[3px] items-end h-3 sm:h-4">
            {[1, 2, 3, 4].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: ['40%', '100%', '40%'] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                className={`w-1 rounded-sm bg-current opacity-60 ${skill.color}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white tracking-tighter mb-2 drop-shadow-md">
          {skill.name}
        </h3>
        
        {/* Tech Description */}
        <div className="h-8 sm:h-10 overflow-hidden">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-light leading-relaxed whitespace-pre-wrap">
              {skill.desc.split(', ').join(' • ')}
            </p>
        </div>
      </div>
      
      {/* Status Footer */}
      <div className="relative mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[7px] sm:text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Module_Status</div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-pulse shadow-[0_0_10px_currentColor] ${skill.color}`} />
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${skill.color}`}>Online</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
            <div className="text-[7px] sm:text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Integrity</div>
            <div className="px-2 sm:px-3 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="text-[8px] sm:text-[9px] font-mono text-white/70 uppercase tracking-widest">
                100%
              </span>
            </div>
        </div>
      </div>
    </div>
  </div>
);

function SkillsMarquee() {
  const displaySkills = [...skills, ...skills, ...skills];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    const children = containerRef.current.children;
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    // Initial calculation after a brief delay to ensure DOM is ready
    const timeout = setTimeout(() => handleScroll(), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full py-10 relative flex flex-col gap-6">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200px] bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Fade masks for left/right edges */}
      <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

      {/* Swipeable Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden w-full px-[calc(50vw-130px)] sm:px-[calc(50vw-160px)] snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20 pb-8 pt-4"
      >
        {displaySkills.map((skill, index) => {
          const isActive = index === activeIndex;
          return (
            <div 
              key={index} 
              className={`snap-center shrink-0 transition-all duration-500 ease-out origin-center ${
                isActive 
                  ? "scale-100 opacity-100 z-10 drop-shadow-[0_0_30px_rgba(96,165,250,0.3)]" 
                  : "scale-[0.8] sm:scale-[0.85] opacity-30 z-0 blur-[2px]"
              }`}
            >
              <SkillCard skill={skill} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="h-auto md:h-[105vh] w-full bg-dark-bg relative overflow-hidden tech-grid flex flex-col justify-center">
      {/* Smooth Background Transition Gradients */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Title / Background layer */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-10 pointer-events-none select-none">
         <h2 className="text-[20vw] font-black italic tracking-tighter text-white/10 leading-none">TECH</h2>
         <h2 className="text-[15vw] font-black italic tracking-tighter text-white/5 leading-none">STACK</h2>
      </div>

      <div className="md:absolute md:top-20 md:left-10 relative z-10 max-w-xl p-6 pointer-events-none pt-20 md:pt-6">
         <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-blue-400" /> Tech Stack
         </h2>
         <h3 className="text-5xl font-black italic tracking-tighter mb-6">
           Built with the<br />
           <span className="text-gray-600">right tools.</span>
         </h3>
         <p className="text-sm text-gray-500 max-w-sm font-light">
           A curated set of technologies I use to design, build, and ship products that work.
         </p>
      </div>

      {/* Desktop 3D Canvas */}
      <div className="hidden md:block relative h-full w-full z-10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
          <spotLight position={[-10, 10, 5]} intensity={0.5} color="#8b5cf6" />
          
          <group position={[0, 0, 0]}>
            {skills.map((skill, index) => (
              <FloatingSkill key={index} skill={skill} />
            ))}
          </group>

          <Environment preset="night" />
          <ContactShadows opacity={0.4} scale={20} blur={24} far={10} resolution={256} color="#000000" />
        </Canvas>
      </div>

      {/* Mobile Marquee */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-center px-4 pb-10">
        <div className="w-full">
          <SkillsMarquee />
        </div>
      </div>

      {/* Depth UI HUD elements */}
      <div className="absolute bottom-10 right-10 z-20 text-right pointer-events-none hidden md:block">
        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Navigation</div>
        <div className="text-xs font-bold text-white uppercase italic">3D Orbital Preview_3.0</div>
      </div>
    </section>
  );
}
