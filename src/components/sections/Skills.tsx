import { useRef, useState, useMemo } from 'react';
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

function SkillsMarquee() {
  return (
    <div className="w-full overflow-hidden py-12 px-4">
      <motion.div
        animate={{ x: [0, -1400] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <div className="h-full glass rounded-3xl border border-white/10 p-6 shadow-[0_0_20px_rgba(96,165,250,0.1)] hover:border-white/20 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-4 rounded-2xl glass ${skill.color} shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)] transition-all`}>
                  <skill.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase text-white tracking-widest mb-1">{skill.name}</h3>
                  <p className={`text-xs font-mono uppercase tracking-[0.15em] ${skill.color}`}>Skill</p>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                Specialized in {skill.desc.toLowerCase()}
              </p>
              
              <div className="flex items-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${skill.color}`} />
                <span className="text-zinc-500">Available</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="h-[105vh] w-full bg-dark-bg relative overflow-hidden tech-grid flex flex-col justify-center">
      {/* Smooth Background Transition Gradients */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Title / Background layer */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-10 pointer-events-none select-none">
         <h2 className="text-[20vw] font-black italic tracking-tighter text-white/10 leading-none">TECH</h2>
         <h2 className="text-[15vw] font-black italic tracking-tighter text-white/5 leading-none">STACK</h2>
      </div>

      <div className="absolute top-20 left-10 z-10 max-w-xl p-6 pointer-events-none">
         <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-blue-400" /> Abilities
         </h2>
         <h3 className="text-5xl font-black italic tracking-tighter mb-6">
           Floating in the<br />
           <span className="text-gray-600">Digital Void.</span>
         </h3>
         <p className="text-sm text-gray-500 max-w-sm font-light">
           My skillset exists in a state of constant evolution, defying standard constraints.
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
      <div className="md:hidden relative z-10 flex flex-col items-center justify-center px-4 pb-20">
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
