import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const experience = [
  {
    year: "2026",
    role: "Pengembangan Website Tamu Kopi",
    company: "Project Uji level kelas 11",
    desc: "Membangun website promosi kedai kopi 'Tamu Kopi' dengan landing page, manajemen stok menu CRUD, katalog produk, dan sistem promo CRUD untuk dukung penjualan online."
  },
  {
    year: "2025",
    role: "Web Framework & Laravel",
    company: "Materi Kelas 11 RPL",
    desc: "Mempelajari penggunaan framework web seperti Laravel dan arsitektur MVC, membangun API sederhana, routing, template Blade, serta integrasi database untuk aplikasi web dinamis."
  },
  {
    year: "2024",
    role: "Dasar Pengembangan Website",
    company: "Materi Kelas 10 RPL",
    desc: "Belajar struktur HTML, styling CSS, layout grid/flexbox, serta konsep web design untuk membangun halaman statis yang rapi dan modern."
  },
  {
    year: "2024",
    role: "Keterampilan Praktik IT",
    company: "Ototidak",
    desc: "Mulai tertarik dengan dunia pemrograman lalu mempelajari logika Pemrograman, penggunaan alat development, serta integrasi dasar tools seperti Git dan VS Code untuk workflow yang lebih profesional."
  }
];

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const blueLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-neon-purple mb-4 text-shadow-neon-purple">Journey</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Journey.</span>
            </h3>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline central line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
            <motion.div
              style={{ height: blueLineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-blue shadow-neon-blue"
            />
          </div>

          <div className="space-y-32">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Card Section */}
                  <div className="w-full md:w-5/12 ml-10 md:ml-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-neon-blue/50 hover:bg-white/[0.05] transition-all duration-500"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest">{exp.year}</span>
                        <div className="h-[1px] flex-1 mx-4 bg-white/10 group-hover:bg-neon-blue/30 transition-colors" />
                      </div>
                      
                      <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors duration-300">
                        {exp.role}
                      </h4>
                      
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                        {exp.company}
                      </p>
                      
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {exp.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Dot Section */}
                  <div className="absolute left-0 md:relative md:left-auto md:mx-auto z-10 w-[42px] md:w-2/12 flex items-center justify-center translate-y-8 md:translate-y-0">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="relative flex items-center justify-center"
                    >
                      <div className="w-4 h-4 bg-black border-2 border-neon-blue rounded-full z-20 shadow-neon-blue ring-8 ring-neon-blue/10" />
                      <div className="absolute w-12 h-12 bg-neon-blue/20 rounded-full blur-xl group-hover:bg-neon-blue/40 transition-all duration-1000" />
                    </motion.div>
                  </div>

                  {/* Empty space for zig-zag */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
