import React from 'react';
import { motion } from 'motion/react';
import { HUDPanel } from './HUDPanel';
import { Info } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const boxVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="w-full mt-12 mb-12 flex-grow">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <HUDPanel 
          title="ABOUT VERITAS AI" 
          icon={<Info size={16} className="animate-pulse" />} 
          accent="blue"
          className="p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 text-slate-400 font-mono text-sm leading-relaxed">
            <motion.div variants={textVariants}>
              <h3 className="text-truth-blue font-bold tracking-widest uppercase mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-truth-blue inline-block animate-ping" /> 
                Mission Parameters
              </h3>
              <p className="mb-6 relative">
                <motion.span 
                  className="absolute -left-4 top-1 bottom-1 w-[2px] bg-truth-blue/30"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                VERITAS AI is an advanced threat-detection and verification engine designed to counteract misinformation in real-time. By leveraging high-density neural map processing and deep semantic analysis, this platform provides unprecedented fidelity in identifying compromised data streams.
              </p>
              <p className="relative">
                <motion.span 
                  className="absolute -left-4 top-1 bottom-1 w-[2px] bg-truth-blue/30"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                Our objective is to maintain the integrity of the truth sphere across multiple vectors, ensuring that verifiable intelligence is decoupled from noise, manipulation, and synthetic hallucinations.
              </p>
            </motion.div>
            
            <div className="flex flex-col gap-6">
              <motion.div 
                variants={boxVariants}
                whileHover={{ scale: 1.02 }}
                className="border border-truth-blue/20 bg-truth-blue/5 p-4 rounded-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-truth-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-truth-blue hud-glow-blue animate-pulse" />
                  <h4 className="text-slate-300 font-bold tracking-widest uppercase text-xs group-hover:text-white transition-colors">Core Architecture</h4>
                </div>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  Built on a robust stack integrating React, Framer Motion, and a Python FastAPI backend capable of parsing massive open-source models natively.
                </p>
              </motion.div>

              <motion.div 
                variants={boxVariants}
                whileHover={{ scale: 1.02 }}
                className="border border-truth-orange/20 bg-truth-orange/5 p-4 rounded-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-truth-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-truth-orange hud-glow-orange animate-pulse" />
                  <h4 className="text-slate-300 font-bold tracking-widest uppercase text-xs group-hover:text-white transition-colors">Security Protocol</h4>
                </div>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  Operates strict cross-examination of assertions against live intelligence feeds. Threat vectors are immediately flagged and isolated in the neural lattice.
                </p>
              </motion.div>
            </div>
          </div>
        </HUDPanel>
      </motion.div>
    </section>
  );
};
