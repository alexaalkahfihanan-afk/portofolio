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
  <div className="flex-shrink-0 w-full max-w-sm mx-auto">
    <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-[1.5rem] border border-white/5 p-6 overflow-hidden group hover:border-white/20 transition-all duration-500">
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
      <div className="relative flex items-start justify-between mb-6">
        <div className="relative">
          {/* Rotating Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-2 border border-current opacity-20 rounded-full border-dashed ${skill.color}`}
          />
          {/* Inner Solid Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-1 border border-current opacity-10 rounded-full ${skill.color}`}
          />
          <div className={`relative p-3 rounded-xl bg-white/5 border border-white/10 ${skill.color} shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md`}>
            <skill.icon className="w-5 h-5 drop-shadow-[0_0_10px_currentColor]" />
          </div>
        </div>

        {/* Tech ID / Serial */}
        <div className="flex flex-col items-end">
          <div className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase mb-2">
            SYS.ID // 0{((index % skills.length) + 1)}
          </div>
          {/* Signal Bars */}
          <div className="flex gap-[3px] items-end h-3">
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
        <h3 className="text-xl font-black italic uppercase text-white tracking-tighter mb-2 drop-shadow-md">
          {skill.name}
        </h3>

        {/* Tech Description */}
        <div className="h-8 overflow-hidden">
            <p className="text-[10px] text-zinc-400 font-light leading-relaxed whitespace-pre-wrap">
              {skill.desc.split(', ').join(' • ')}
            </p>
        </div>
      </div>

      {/* Status Footer */}
      <div className="relative mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Module_Status</div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_10px_currentColor] ${skill.color}`} />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${skill.color}`}>Online</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
            <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Integrity</div>
            <div className="px-2 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="text-[8px] font-mono text-white/70 uppercase tracking-widest">
                100%
              </span>
            </div>
        </div>
      </div>
    </div>
  </div>
);

function MobileSkillsStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSkill = () => {
    setActiveIndex((prev) => (prev + 1) % skills.length);
  };

  const prevSkill = () => {
    setActiveIndex((prev) => (prev - 1 + skills.length) % skills.length);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSkill();
    }
    if (isRightSwipe) {
      prevSkill();
    }
  };

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto flex items-center justify-center gap-8 perspective-[2000px]">
      <div
        className="relative w-full max-w-4xl h-[500px] perspective-[2000px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout">
          {skills.map((skill, index) => {
            const rotate = (index - activeIndex) * 3;
            const xOffset = (index - activeIndex) * 30;
            const zIndex = skills.length - Math.abs(index - activeIndex);
            const isPrev = index < activeIndex;
            const isActive = index === activeIndex;

            if (index < activeIndex - 1 || index > activeIndex + 2) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 200, scale: 0.8, rotate: 10 }}
                animate={{
                  opacity: isActive ? 1 : (isPrev ? 0 : 0.5),
                  x: isPrev ? -200 : xOffset,
                  scale: isActive ? 1 : 0.9,
                  rotate: isActive ? 0 : rotate,
                  zIndex: isActive ? 50 : 20 - index,
                }}
                exit={{ opacity: 0, x: -200, scale: 0.8, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                onClick={() => index !== activeIndex && setActiveIndex(index)}
              >
                <div className={`h-full w-full glass rounded-[2.5rem] p-1 border-white/5 overflow-hidden shadow-2xl relative group ${!isActive && 'pointer-events-none'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />

                  {isActive && (
                    <div className="relative h-full p-8 flex flex-col justify-center z-10 font-sans">
                      <SkillCard skill={skill} index={index} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
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

      {/* Mobile Stacked Cards */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-center px-4 pb-10">
        <div className="w-full">
          <MobileSkillsStack />
        </div>

        {/* Pagination Footer */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {skills.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 rounded-full ${i === 0 ? 'w-12 h-1.5 bg-blue-400' : 'w-1.5 h-1.5 bg-white/20'}`}
            />
          ))}
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
