import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Command as CommandIcon, Home, Mail, User } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="fixed bottom-8 left-8 z-[100]">
        <button 
          onClick={() => setOpen(true)}
          className="p-3 glass rounded-full hover:bg-white/10 transition-colors group relative"
        >
          <CommandIcon className="w-5 h-5" />
          <span className="absolute left-full ml-4 whitespace-nowrap px-2 py-1 bg-black/80 rounded border border-white/10 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ctrl + K
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
           <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setOpen(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             />
             
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="w-full max-w-xl glass rounded-3xl overflow-hidden shadow-2xl relative"
             >
                <Command className="h-full bg-transparent flex flex-col">
                  <div className="flex items-center border-b border-white/10 p-4">
                    <Command.Input 
                      placeholder="Search for sections, projects..." 
                      className="w-full bg-transparent border-none focus:outline-none text-white text-lg placeholder:text-zinc-500"
                    />
                  </div>
                  
                  <Command.List className="p-4 max-h-[400px] overflow-y-auto space-y-2">
                    <Command.Empty className="text-sm text-zinc-500 p-4">No results found.</Command.Empty>
                    
                    <Command.Group heading="Navigation" className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2 mt-4 first:mt-0">
                      <Command.Item 
                        onSelect={() => setOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <Home className="w-4 h-4 text-neon-purple" />
                        <span>Home</span>
                      </Command.Item>
                      <Command.Item 
                        onSelect={() => setOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-neon-blue" />
                        <span>Projects</span>
                      </Command.Item>
                      <Command.Item 
                        onSelect={() => setOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <User className="w-4 h-4 text-neon-purple" />
                        <span>Experience</span>
                      </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Contact" className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2 mt-4">
                      <Command.Item 
                        onSelect={() => setOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <Mail className="w-4 h-4 text-neon-blue" />
                        <span>Send an Email</span>
                      </Command.Item>
                    </Command.Group>
                  </Command.List>
                </Command>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </>
  );
}
