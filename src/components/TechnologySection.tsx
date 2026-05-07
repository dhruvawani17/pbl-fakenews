import React from 'react';
import { motion } from 'motion/react';
import { HUDPanel } from './HUDPanel';
import { Database, Cpu, Network } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 120 } 
    }
  };

  return (
    <section id="technology" className="w-full mt-12 mb-12 flex-grow [perspective:1000px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <HUDPanel 
          title="CORE INFRASTRUCTURE // TECHNOLOGY" 
          icon={<Cpu size={16} className="animate-spin-slow" />} 
          accent="blue"
          className="p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            
            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(50,150,255,0.2)" }}
              className="border border-truth-blue/20 bg-[#0a1120] p-5 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-truth-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <Network className="text-truth-blue group-hover:animate-pulse" size={20} />
                <h3 className="text-slate-200 font-bold tracking-widest uppercase text-xs">Proprietary LLM Arrays</h3>
              </div>
              <p className="text-slate-400 text-xs font-mono mb-4 leading-relaxed relative z-10">
                Utilizes high-speed inference endpoints (Groq) to query advanced 120B+ parameter open-source models, achieving sub-second latency for complex reasoning tasks.
              </p>
              <div className="text-[10px] text-truth-blue/60 font-mono tracking-widest uppercase flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-truth-blue animate-pulse" />
                Status: Online // Latency: &lt;500ms
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,100,0,0.2)" }}
              className="border border-truth-orange/20 bg-[#120b05] p-5 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-truth-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <Cpu className="text-truth-orange group-hover:animate-spin" size={20} />
                <h3 className="text-slate-200 font-bold tracking-widest uppercase text-xs">FastAPI Middleware</h3>
              </div>
              <p className="text-slate-400 text-xs font-mono mb-4 leading-relaxed relative z-10">
                A robust Python-based asynchronous broker that formats contextual sources, manages web scraping, and handles safe transmission of payload data to semantic engines.
              </p>
              <div className="text-[10px] text-truth-orange/60 font-mono tracking-widest uppercase flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-truth-orange animate-pulse" />
                System: Armed // V 2.4.1
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              className="border border-white/10 bg-[#0d0d12] p-5 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <Database className="text-slate-300 group-hover:animate-bounce" size={20} />
                <h3 className="text-slate-200 font-bold tracking-widest uppercase text-xs">Reactive UI Matrix</h3>
              </div>
              <p className="text-slate-400 text-xs font-mono mb-4 leading-relaxed relative z-10">
                Frontend architecture built on React + Vite, leveraging Framer Motion for high-fidelity 60FPS HUD animations and Tailwind CSS for adaptive component styling.
              </p>
              <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
                Render Sync: Nominal
              </div>
            </motion.div>

          </div>
        </HUDPanel>
      </motion.div>
    </section>
  );
};
