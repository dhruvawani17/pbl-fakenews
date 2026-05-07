import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';

export const VeritasSphere: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Outer Atmosphere Glow - Pulse and Rotate independently */}
      <motion.div 
        className="absolute w-[95%] h-[95%] border-2 border-truth-blue/5 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main Spherical Container for Spline */}
      <div className="relative w-full max-w-[700px] aspect-square rounded-full flex items-center justify-center overflow-hidden group">
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4 z-20">
            <div className="w-12 h-12 border-2 border-truth-blue border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(79,172,254,0.5)]" />
            <span className="font-mono text-[10px] text-truth-blue animate-pulse uppercase tracking-[0.3em] font-bold">Initialising Core...</span>
          </div>
        }>
          <div className="w-full h-full scale-[1.1] md:scale-[1.2]">
            <Spline 
              scene="https://prod.spline.design/0uAFCUdluaqoovUg/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </Suspense>

        {/* Global Sphere Shadow Overlay - Provides depth and focuses attention */}
        <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] rounded-full" />
        
        {/* Subtle Edge Rim Light to blend with HUD border */}
        <div className="absolute inset-0 z-30 pointer-events-none border-[1px] border-truth-blue/10 rounded-full" />
      </div>

      {/* Extreme Orbiting Rings (3D simulated) */}
      <motion.div 
        className="absolute w-[110%] h-[110%] border border-truth-blue/10 rounded-full"
        animate={{ rotateX: 75, rotateZ: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div 
        className="absolute w-[115%] h-[115%] border border-truth-orange/5 rounded-full"
        animate={{ rotateX: -75, rotateZ: [360, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  );
};

