import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '00:00', value: 70 },
  { time: '03:00', value: 60 },
  { time: '06:00', value: 85 },
  { time: '09:00', value: 75 },
  { time: '12:00', value: 65 },
  { time: '15:00', value: 80 },
  { time: '18:00', value: 70 },
  { time: '21:00', value: 90 },
  { time: '24:00', value: 85 },
];

export const ThreatAnalysis: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">Misinformation Risk Level</p>
        <div className="flex items-baseline gap-3">
          <p className="font-mono text-xl text-truth-blue font-bold tracking-widest mb-4 hud-glow-blue">LOW</p>
          <motion.div 
            className="w-1.5 h-1.5 bg-truth-blue rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="h-28 w-full"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: 'bottom' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              hide={false} 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#334155', fontSize: 8, fontFamily: 'Share Tech Mono' }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }}
              itemStyle={{ color: '#4facfe' }}
              cursor={{ stroke: '#4facfe', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4facfe" 
              strokeWidth={2} 
              dot={{ fill: '#4facfe', r: 2 }}
              activeDot={{ r: 4, fill: '#ff7f00', stroke: '#fff', strokeWidth: 1 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
