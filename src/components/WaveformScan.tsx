import React from 'react';
import { motion } from 'motion/react';

export const WaveformScan: React.FC = () => {
  const bars = 24;
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest animate-pulse">
        Analyzing Information Stream...
      </p>
      
      <div className="h-24 w-full flex items-center justify-between gap-1 px-2 border border-truth-blue/10 bg-slate-900/30 rounded-sm relative overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,172,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,172,254,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-truth-blue/20" />
        
        {/* Animated Bars */}
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-truth-blue rounded-full"
            animate={{ 
              height: [`${20 + Math.random() * 60}%`, `${10 + Math.random() * 40}%`, `${30 + Math.random() * 60}%`]
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Signal Strength</span>
        <div className="flex items-center gap-3">
          <div className="flex gap-[2px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className={i < 9 ? "w-1.5 h-2 bg-truth-orange" : "w-1.5 h-2 bg-slate-700"} 
              />
            ))}
          </div>
          <span className="font-mono text-xs text-truth-blue font-bold">78.2%</span>
        </div>
      </div>
    </div>
  );
};
