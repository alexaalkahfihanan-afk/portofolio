import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2, X, Plus } from 'lucide-react';

const projects = [
  {
    title: "Mindful Journal",
    category: "Laravel CRUD",
    image: "https://img.sanishtech.com/u/869ea724d6b0c5509689bb42f4b6663f.png",
    description: "Simple blog application with create, read, update, and delete functionality. Perfect for learning Laravel fundamentals.",
    tags: ["NextJS", "Vite", "Tailwind"],
    liveUrl: "https://min-ful-journal.vercel.app/",
    githubUrl: "https://github.com/alexaalkahfihanan-afk/MinFul-Journal"
  },
  {
    title: "Amanah ToTheList",
    category: "Task Management",
    image: "https://specific-red-ctrmamxcxr.edgeone.app/Screenshot%202026-04-29%20192449.png",
    description: "Basic todo application to manage daily tasks. Learn routing, controllers, and database operations.",
    tags: ["NextJS", "Vite", "Tailwind"],
    liveUrl: "https://amanah-to-the-list.vercel.app/",
    githubUrl: "https://github.com/alexaalkahfihanan-afk/amanah-ToTheList"
  },
  {
    title: "Website Tamu-Kopi",
    category: "CRUD System",
    image: "https://images.unsplash.com/photo-1516321318423-6f1f3e128b4d?auto=format&fit=crop&q=80&w=800",
    description: "Student management system with registration, data management, and basic authentication features.",
    tags: ["Laravel", "MySQL", "Tailwind", "React"],
    liveUrl: "https://example.com/student-portal",
    githubUrl: "https://github.com/yourusername/student-portal"
  },
  {
    title: "Contact Directory",
    category: "Database App",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    description: "Contact management system to store, organize, and manage your contacts easily.",
    tags: ["Laravel", "MySQL", "HTML/CSS"],
    liveUrl: "https://example.com/contact-directory",
    githubUrl: "https://github.com/yourusername/contact-directory"
  }
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-play logic
  useEffect(() => {
    if (isPreviewOpen) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPreviewOpen]);

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isPreviewOpen]);

  const activeProject = projects[activeIndex];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen bg-dark-bg py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Smooth Background Transition Gradients */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-blue-500/5 blur-[150px] scale-150 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl text-left font-sans">
             <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-400 mb-6 flex items-center gap-3">
                <div className="w-12 h-[1px] bg-blue-400" /> System_Archive
             </h2>
             <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] text-white uppercase">
               PROJECT <br />
               <span className="text-stroke">STACKS.</span>
             </h3>
          </div>
          
          <div className="text-xs font-mono text-zinc-500 hidden md:block">
            {activeIndex + 1} <span className="opacity-30">/</span> {projects.length}
          </div>
        </div>

        {/* Stacked Cards Container with Buttons */}
        <div className="relative w-full mx-auto flex items-center justify-center gap-8 perspective-[2000px]">
          <button 
            onClick={prevProject}
            className="hidden md:flex p-5 rounded-full glass border-white/5 hover:bg-white hover:text-black transition-all group flex-shrink-0 z-30"
          >
            <ChevronLeft className="w-6 h-6 group-active:scale-75 transition-transform" />
          </button>

          <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] perspective-[2000px]">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const rotate = (index - activeIndex) * 5;
              const xOffset = (index - activeIndex) * 40;
              const zIndex = projects.length - Math.abs(index - activeIndex);
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
                    <img 
                      src={project.image} 
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-20'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />
                    
                    {isActive && (
                      <div className="relative h-full p-8 md:p-14 flex flex-col justify-between z-10 font-sans">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">
                              0{index + 1}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                              {project.category}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsPreviewOpen(true); }}
                            className="p-3 bg-white hover:bg-blue-400 text-black hover:text-white rounded-full transition-all group/expand"
                          >
                            <Maximize2 className="w-5 h-5 group-hover/expand:scale-110 transition-transform" />
                          </button>
                        </div>
                        
                        <div className="max-w-2xl">
                          <h3 className="text-4xl md:text-6xl font-black italic mb-6 text-white leading-tight uppercase tracking-tighter">
                            {project.title}
                          </h3>
                          <p className="text-zinc-400 mb-10 text-base md:text-lg font-light leading-relaxed max-w-lg">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-10">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="px-3 py-1 text-[9px] bg-white/5 backdrop-blur-md rounded border border-white/10 uppercase tracking-widest text-zinc-500">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-8">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:text-blue-400 transition-colors group/btn">
                                <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" /> Live Architecture
                              </button>
                            </a>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:text-purple-400 transition-colors group/btn">
                                <Github className="w-4 h-4" /> Code Matrix
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>

          <button 
            onClick={nextProject}
            className="hidden md:flex p-5 rounded-full glass border-white/5 hover:bg-white hover:text-black transition-all group flex-shrink-0 z-30"
          >
            <ChevronRight className="w-6 h-6 group-active:scale-75 transition-transform" />
          </button>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <button 
            onClick={prevProject}
            className="p-5 rounded-full glass border-white/5 hover:bg-white hover:text-black transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-active:scale-75 transition-transform" />
          </button>
          <button 
            onClick={nextProject}
            className="p-5 rounded-full glass border-white/5 hover:bg-white hover:text-black transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-active:scale-75 transition-transform" />
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-dark-bg/95 backdrop-blur-3xl cursor-zoom-out"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -20 }}
              className="relative w-full max-w-7xl h-fit glass rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/10 flex flex-col pointer-events-auto"
            >
              <div className="p-4 md:p-6 flex justify-between items-center bg-white/5 border-b border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{activeProject.category}</span>
                  <span className="text-lg font-black italic text-white uppercase tracking-tighter">{activeProject.title}</span>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative aspect-video w-full bg-black flex items-center justify-center p-4 md:p-10 group">
                <img 
                  src={activeProject.image} 
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  alt={activeProject.title}
                />
                <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
                
                {/* Visual accents */}
                <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-blue-400/30 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-purple-400/30 rounded-br-3xl pointer-events-none" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pagination Footer */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-500 rounded-full ${i === activeIndex ? 'w-12 h-1.5 bg-blue-400' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
