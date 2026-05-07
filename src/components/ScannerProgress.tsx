import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Box } from 'lucide-react';

export const ScannerProgress: React.FC = () => {
  const [progress, setProgress] = useState(63);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 63; // Reset loosely for demo feel
        return prev + Math.floor(Math.random() * 2);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hud-panel p-4 rounded-sm flex items-center gap-6 border-truth-blue/20">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-truth-blue/60" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-truth-blue/60" />
      
      <div className="w-10 h-10 border border-truth-blue/30 bg-truth-blue/5 rounded flex justify-center items-center shadow-[0_0_15px_rgba(79,172,254,0.1)] flex-shrink-0">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Box size={20} className="text-truth-blue" />
        </motion.div>
      </div>

      <div className="flex-grow flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="font-mono text-xs font-bold tracking-[0.15em] text-truth-blue hud-glow-blue uppercase">Scanning...</h3>
            <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-none">Evaluating Content in Real-Time</p>
          </div>
          <motion.span 
            key={progress}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-truth-orange font-bold hud-glow-orange"
          >
            {progress}%
          </motion.span>
        </div>
        
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-truth-blue via-truth-orange to-truth-orange shadow-[0_0_10px_rgba(255,127,0,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};
