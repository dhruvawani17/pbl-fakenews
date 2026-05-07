import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <header className="flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div 
               className="absolute inset-0 border border-slate-700 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-1.5 h-1.5 bg-white rounded-full hud-glow-blue" />
        </div>
        <span className="text-white font-bold tracking-[0.4em] text-lg">VERITAS AI</span>
      </div>

      <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
        <a href="#" className="text-white flex items-center gap-2 relative group">
          <motion.div 
            className="w-1.5 h-1.5 bg-truth-orange rotate-45 hud-glow-orange"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="group-hover:text-truth-orange transition-colors duration-300">Home</span>
          <motion.div 
            className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-truth-orange" 
            layoutId="nav-underline"
          />
        </a>
        <a href="#" className="hover:text-white hover:hud-glow-blue transition-all duration-300">How It Works</a>
        <a href="#" className="hover:text-white hover:hud-glow-blue transition-all duration-300">Technology</a>
        <a href="#" className="hover:text-white hover:hud-glow-blue transition-all duration-300">About</a>
        <span className="tracking-widest animate-pulse">...</span>
      </nav>

      <button className="group border border-slate-800 hover:border-slate-600 bg-slate-900/40 text-slate-300 px-6 py-2.5 rounded-sm text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-3 font-bold">
        Access Terminal
        <div className="w-1 h-1 bg-truth-orange rounded-full group-hover:animate-ping" />
      </button>
    </header>
  );
};
