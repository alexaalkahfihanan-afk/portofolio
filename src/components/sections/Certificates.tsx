import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'motion/react';
import { X, Scan, ShieldCheck } from 'lucide-react';
import { certs } from '../../data/certificateData';

interface CertificateCardProps {
  cert: typeof certs[0];
  onClick: () => void;
}

function CertificateCard({ cert, onClick }: CertificateCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      layoutId={`cert-${cert.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group aspect-[3508/2481] w-full rounded-[1.5rem] md:rounded-[2.5rem] glass p-1 cursor-pointer overflow-hidden shadow-2xl"
    >
      <div className={`relative h-full w-full rounded-[1.4rem] md:rounded-[2.3rem] overflow-hidden bg-gradient-to-br ${cert.color}`}>
        <motion.img
          src={cert.image}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1589330694653-96b6f9a94943?auto=format&fit=crop&q=80&w=1200";
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 bg-zinc-900"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-transparent to-transparent opacity-90 group-hover:opacity-30 transition-opacity" />

        <div className="relative h-full p-6 md:p-8 flex flex-col justify-end z-10 font-sans">
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <motion.div layoutId={`icon-${cert.id}`} className="p-2 md:p-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
              <cert.icon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          </div>

          <div className="absolute top-6 right-6 md:top-8 md:right-8 text-right">
            <span className="text-[9px] md:text-[10px] font-mono text-white/60 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">{cert.date}</span>
          </div>

          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <motion.h4 layoutId={`title-${cert.id}`} className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter mb-1 md:mb-2 leading-tight drop-shadow-lg">
              {cert.title}
            </motion.h4>
            <motion.div layoutId={`issuer-${cert.id}`} className="text-[9px] md:text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.2em] drop-shadow-md">
              {cert.issuer}
            </motion.div>
          </div>

          <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 text-white bg-blue-500/80 p-2 rounded-full backdrop-blur-md">
            <Scan className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof certs)[0] | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCert]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="py-24 bg-dark-bg relative overflow-hidden flex flex-col items-center"
    >
      {/* Smooth Background Transition Gradients */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ y: yParallax }}
        className="container mx-auto px-6 max-w-6xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-20 font-sans">
          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-purple-400 mb-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-purple-400" /> Validation_Vault
          </span>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight text-white uppercase">
            CERTIFIED <br />
            <span className="text-stroke">EXPERTISE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {certs.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onClick={() => setSelectedCert(cert)} />
          ))}
        </div>

        <div className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 transition-opacity font-sans">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">End-to-End Authentication</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">All credentials verified via cryptographic hashing and blockchain pinning.</div>
            </div>
          </div>
          <button className="px-8 py-3 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all">
            Audit Full Records
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-dark-bg/95 backdrop-blur-2xl cursor-zoom-out"
            />

            <motion.div
              layoutId={`cert-${selectedCert.id}`}
              className="relative w-full max-w-6xl h-[85vh] md:h-[85vh] lg:h-[90vh] glass rounded-[1.5rem] md:rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/10 font-sans z-10 overflow-hidden flex flex-col md:flex-row"
            >
              {/* IMAGE SECTION */}
              <div className="relative w-full md:w-[55%] lg:w-[65%] shrink-0 h-[250px] sm:h-[300px] md:h-full bg-black/60 flex items-center justify-center p-4 md:p-6 lg:p-10">
                <motion.img
                  src={selectedCert.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1589330694653-96b6f9a94943?auto=format&fit=crop&q=80&w=1200";
                  }}
                  className="w-full h-full object-contain drop-shadow-2xl md:bg-zinc-900 rounded-lg md:rounded-none"
                />
                <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none" />
              </div>

              {/* TEXT SECTION (SCROLLABLE) */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-dark-bg/60 backdrop-blur-3xl md:border-l border-t md:border-t-0 border-white/5">
                <div className="p-6 md:p-8 lg:p-10 flex flex-col min-h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8 md:mb-12">
                      <motion.div layoutId={`icon-${selectedCert.id}`} className="p-4 md:p-5 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 ring-1 ring-white/5">
                        <selectedCert.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                      </motion.div>
                      <button
                        onClick={() => setSelectedCert(null)}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all group/close"
                      >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover/close:text-white transition-colors" />
                      </button>
                    </div>

                    <motion.h4 layoutId={`title-${selectedCert.id}`} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic text-white leading-[0.9] uppercase tracking-tighter mb-4 md:mb-6">
                      {selectedCert.title}
                    </motion.h4>

                    <motion.div layoutId={`issuer-${selectedCert.id}`} className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                      <span className="text-[9px] md:text-[10px] font-mono text-blue-400/80 uppercase tracking-[0.2em]">{selectedCert.issuer}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{selectedCert.id}</span>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-lg"
                    >
                      {selectedCert.details}
                    </motion.p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8 pt-8 md:pt-10 border-t border-white/10 mt-10">
                    <div className="flex gap-6 md:gap-10 w-full sm:w-auto justify-between sm:justify-start">
                      <div>
                        <div className="text-[8px] md:text-[9px] font-mono text-zinc-700 uppercase tracking-widest mb-2">Auth_Status</div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                          <span className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-tighter">Live_Verified</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[8px] md:text-[9px] font-mono text-zinc-700 uppercase tracking-widest mb-2">Issue_Stamp</div>
                        <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-tighter">{selectedCert.date}</div>
                      </div>
                    </div>

                    <a href={selectedCert.image} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto mt-4 sm:mt-0">
                      <button className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-black font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        Access Link
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-0 opacity-10 pointer-events-none">
        <h2 className="text-[30vw] font-black italic tracking-tighter text-white/5 leading-none">ARCHIVE</h2>
      </div>
    </section>
  );
}
