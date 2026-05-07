import React from 'react';
import { motion } from 'motion/react';

const statusItems = [
  { name: 'Neural Engine', status: 'Active' },
  { name: 'Data Crosscheck', status: 'Active' },
  { name: 'Bias Detection', status: 'Active' },
  { name: 'Fact Validation', status: 'Active' },
];

export const SystemStatus: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <ul className="space-y-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
        {statusItems.map((item, i) => (
          <motion.li 
            key={item.name} 
            className="flex justify-between items-center border-b border-slate-800/30 pb-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-1 h-3 bg-truth-blue/30"
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }}
              />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-truth-orange hud-glow-orange font-bold font-mono text-[10px]">{item.status}</span>
              <motion.div 
                className="w-2 h-2 rounded-sm bg-truth-orange hud-glow-orange"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    '0 0 0px rgba(255, 127, 0, 0)',
                    '0 0 10px rgba(255, 127, 0, 0.8)',
                    '0 0 0px rgba(255, 127, 0, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
      <motion.div 
        className="mt-6 pt-4 flex justify-between items-center border-t border-truth-blue/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">Global Terminal Sync</span>
        <div className="flex items-center gap-2">
          <span className="text-truth-blue hud-glow-blue font-bold tracking-[0.2em] font-mono animate-pulse">OPTIMAL</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(j => (
              <motion.div 
                key={j}
                className="w-1 h-1 bg-truth-blue"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
