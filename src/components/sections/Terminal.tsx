import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';

const BIO_LINES = [
  "> INITIALIZING BIOGRAPHY ENTITY...",
  "> NAME: AXEL VOID",
  "> ROLE: CREATIVE TECHNOLOGIST // FULL STACK ARCHITECT",
  "> LOCATION: JAKARTA, INDONESIA",
  "> STATUS: AVAILABLE_FOR_ORBITAL_CONTRACTS",
  "> STACK: [REACT, THREE.JS, RUST, NEXT.JS, TAILWIND]",
  "> MISSION: BRIDGING THE GAP BETWEEN HUMAN AND MACHINE INTERFACE",
  "> HOBBIES: [QUANTUM_PHYSICS, CYBERNETIC_DESIGN, ANALOG_SYNTHS]",
  "> EOF."
];

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BIO_LINES.length) {
        setLines(prev => [...prev, BIO_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="py-24 bg-dark-bg grain flex justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl glass rounded-2xl overflow-hidden shadow-2xl border-blue-500/10"
      >
        <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             <div className="w-[1px] h-4 bg-white/10 mx-2" />
             <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <TerminalIcon className="w-3 h-3" /> Core_Console.exe
             </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-600">80x24</div>
        </div>

        <div 
          ref={scrollRef}
          className="p-8 h-[400px] overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar"
        >
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={(line || '').includes('NAME') ? 'text-blue-400' : (line || '').includes('EOF') ? 'text-purple-500' : 'text-zinc-400'}
            >
              {line}
            </motion.div>
          ))}
          <div className="flex items-center gap-2 text-white mt-4">
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className="bg-transparent border-none focus:outline-none w-full placeholder:text-zinc-700"
            />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-blue-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
