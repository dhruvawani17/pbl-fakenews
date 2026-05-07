import React from 'react';
import { motion } from 'motion/react';
import { HUDPanel } from './HUDPanel';
import { Search, Zap, ShieldCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Search className="text-truth-blue" size={24} />,
      title: "1. Ingest & Target",
      desc: "Input raw text, URLs, or claim fragments. The system ingests the data, normalizing it for analysis.",
      accent: "blue"
    },
    {
      icon: <Zap className="text-truth-orange" size={24} />,
      title: "2. Neural Scanning",
      desc: "Advanced LLM arrays cross-reference the data against verified databases and real-time knowledge graphs.",
      accent: "orange"
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: "3. Threat Mitigation",
      desc: "Results are scored for truthfulness. Falsehoods are isolated as active threats and presented with reliable sources.",
      accent: "emerald"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="how-it-works" className="w-full mt-12 mb-12 flex-grow">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <HUDPanel 
          title="OPERATIONAL SEQUENCING // HOW IT WORKS" 
          icon={<Zap size={16} className="animate-pulse" />} 
          accent="orange"
          className="p-8"
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className={`border border-white/5 bg-white/5 p-6 rounded-sm relative overflow-hidden group hover:border-${step.accent === 'orange' ? 'truth-orange' : step.accent === 'emerald' ? 'emerald-500' : 'truth-blue'}/40 transition-colors duration-300`}
              >
                <motion.div 
                  className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity`}
                  whileHover={{ rotate: 15, scale: 1.2 }}
                >
                  {step.icon}
                </motion.div>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className={`w-10 h-10 border rounded-sm flex items-center justify-center bg-black/40 ${step.accent === 'orange' ? 'border-truth-orange/30' : step.accent === 'emerald' ? 'border-emerald-500/30' : 'border-truth-blue/30'}`}
                    animate={{ boxShadow: ['0px 0px 0px rgba(0,0,0,0)', `0px 0px 10px ${step.accent === 'orange' ? 'var(--color-truth-orange)' : step.accent === 'emerald' ? '#34d399' : 'var(--color-truth-blue)'}`, '0px 0px 0px rgba(0,0,0,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className={`font-bold tracking-widest uppercase text-sm ${step.accent === 'orange' ? 'text-truth-orange' : step.accent === 'emerald' ? 'text-emerald-400' : 'text-truth-blue'}`}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-400 font-mono text-xs leading-relaxed relative z-10">
                  {step.desc}
                </p>
                <div className="mt-4 flex gap-1 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className={`h-1 flex-grow ${i < 3 ? (step.accent === 'orange' ? 'bg-truth-orange/50' : step.accent === 'emerald' ? 'bg-emerald-400/50' : 'bg-truth-blue/50') : 'bg-white/10'}`} 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
                
                {/* Scanline effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full opacity-0 group-hover:opacity-100"
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </HUDPanel>
      </motion.div>
    </section>
  );
};
