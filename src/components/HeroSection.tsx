import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, Youtube, Loader2 } from 'lucide-react';

interface HeroSectionProps {
  onVerify: (content: string, url: string) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onVerify, isLoading }) => {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !url) return;
    onVerify(content, url);
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <motion.p 
          className="font-mono text-xs font-bold tracking-[0.2em] text-truth-orange hud-glow-orange uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Verification System
        </motion.p>
        <motion.h1 
          className="text-5xl xl:text-6xl font-bold leading-tight tracking-wide text-white uppercase"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Detect Fake News.<br />
          <span className="text-slate-400">Restore Truth.</span>
        </motion.h1>
      </div>

      <div className="max-w-md w-full relative">
        <AnimatePresence mode="wait">
          {!showInputs ? (
            <motion.button 
              key="cta"
              onClick={() => setShowInputs(true)}
              className="group relative border border-truth-orange/50 hover:bg-truth-orange/10 text-truth-orange px-8 py-4 rounded-sm text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-6 overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-truth-orange/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 font-bold">Initiate Verification</span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ) : (
            <motion.form 
              key="inputs"
              onSubmit={handleSubmit}
              className="space-y-4 hud-panel p-5 bg-slate-900/60 border-truth-blue/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest pl-1">Article Content / Headline</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-slate-600" size={14} />
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste text or claim here..."
                    className="w-full bg-black/40 border border-slate-800 focus:border-truth-blue/50 p-2.5 pl-10 text-xs text-white placeholder:text-slate-700 outline-none rounded-sm min-h-[100px] transition-all"
                  />
                </div>
              </div>

              {/* <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-500 uppercase tracking-widest pl-1">YouTube URL (Verified Analysis)</label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-2.5 text-slate-600" size={14} />
                  <input 
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-black/40 border border-slate-800 focus:border-truth-blue/50 p-2.5 pl-10 text-xs text-white placeholder:text-slate-700 outline-none rounded-sm transition-all"
                  />
                </div>
              </div> */}

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-grow flex items-center justify-center gap-3 bg-truth-orange/90 hover:bg-truth-orange text-black px-4 py-2.5 rounded-sm font-bold text-[10px] tracking-widest uppercase transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : "Verify Claims"}
                  {!isLoading && <ShieldCheck size={14} />}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowInputs(false)}
                  className="px-4 py-2.5 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 transition-all text-[10px] tracking-widest font-bold uppercase rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

