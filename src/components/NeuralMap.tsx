import React from 'react';
import { motion } from 'motion/react';

const nodes = [
  { x: 20, y: 20, type: 'verified' },
  { x: 50, y: 50, type: 'verified' },
  { x: 80, y: 30, type: 'pending' },
  { x: 40, y: 80, type: 'pending' },
  { x: 120, y: 20, type: 'pending' },
  { x: 100, y: 60, type: 'verified' },
  { x: 140, y: 50, type: 'rejected' },
  { x: 120, y: 90, type: 'verified' },
  { x: 170, y: 30, type: 'verified' },
  { x: 180, y: 70, type: 'pending' },
];

const connections = [
  [0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [5, 6], [5, 7], [6, 8], [6, 9]
];

export const NeuralMap: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <motion.p 
        className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Reasoning Pathways
      </motion.p>
      
      <div className="flex-grow relative min-h-[140px] flex items-center justify-center">
        <svg className="w-full h-full max-w-[240px]" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          {connections.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="#1e293b"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ 
                duration: 2, 
                delay: 1 + i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Animated data packets travelling along connections */}
          {connections.map(([a, b], i) => (
            <motion.circle
              key={`packet-${i}`}
              r={1}
              fill="#4facfe"
              initial={{ offset: 0, opacity: 0 }}
              animate={{ 
                cx: [nodes[a].x, nodes[b].x],
                cy: [nodes[a].y, nodes[b].y],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
          
          {nodes.map((node, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={node.x} cy={node.y}
                r={node.type === 'pending' ? 3.5 : 2.5}
                fill={
                  node.type === 'verified' ? '#4facfe' : 
                  node.type === 'rejected' ? '#ef4444' : '#ff7f00'
                }
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                  opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                  initial: { duration: 0.5, delay: 0.8 + i * 0.05 }
                }}
                className={node.type === 'pending' ? 'hud-glow-orange' : 'hud-glow-blue'}
              />
              {node.type === 'pending' && (
                <motion.circle
                  cx={node.x} cy={node.y}
                  r={8}
                  fill="transparent"
                  stroke="#ff7f00"
                  strokeWidth="0.5"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </div>

      <motion.div 
        className="flex justify-between items-center mt-4 font-mono text-[9px] text-slate-400 uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-truth-blue" /> Verified</div>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-truth-orange" /> Pending</div>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Rejected</div>
      </motion.div>
    </div>
  );
};

