import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const VerificationMetrics: React.FC = () => {
  const [sources, setSources] = useState(24987532);
  const [claims, setClaims] = useState(12452889);
  const [accuracy, setAccuracy] = useState(99.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSources(s => s + Math.floor(Math.random() * 5));
      setClaims(c => c + Math.floor(Math.random() * 3));
      setAccuracy(a => {
        const change = (Math.random() - 0.5) * 0.1;
        const newVal = Math.min(99.9, Math.max(99.5, a + change));
        return parseFloat(newVal.toFixed(1));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Sources Analyzed', value: sources.toLocaleString() },
    { label: 'Claims Verified', value: claims.toLocaleString() },
    { label: 'Accuracy Rate', value: `${accuracy}%` },
  ];

  return (
    <div className="grid grid-cols-3 gap-8">
      {metrics.map((m, i) => (
        <motion.div 
          key={m.label} 
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest leading-none">
            {m.label}
          </p>
          <motion.p 
            key={m.value}
            className="font-mono text-xl text-white tracking-wide font-bold"
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {m.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};
