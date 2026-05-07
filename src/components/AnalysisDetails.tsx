import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, XCircle, Info, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface Source {
  title: string;
  url: string;
  snippet: string;
}

interface AnalysisResultsProps {
  data: {
    score: number;
    verdict: string;
    reasoning: string;
    redFlags: string[];
    bias: string;
    confidence: number;
    sources: Source[];
  };
  onClose: () => void;
}

export const AnalysisDetails: React.FC<AnalysisResultsProps> = ({ data, onClose }) => {
  const getVerdictStyles = () => {
    switch (data.verdict) {
      case 'VERIFIED': return { icon: <ShieldCheck className="text-green-400" />, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
      case 'MISLEADING': return { icon: <AlertCircle className="text-yellow-400" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      case 'FALSE': return { icon: <XCircle className="text-red-400" />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      default: return { icon: <Info className="text-blue-400" />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    }
  };

  const styles = getVerdictStyles();

  return (
    <motion.div 
      className="hud-panel p-6 w-full max-w-4xl mx-auto border-truth-blue/30 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-truth-blue" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-truth-blue" />
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="font-mono text-xs font-bold tracking-[0.3em] text-truth-blue mb-2 uppercase">Analysis Report</h2>
          <div className={cn("inline-flex items-center gap-3 px-4 py-2 rounded-sm border uppercase font-bold tracking-widest", styles.bg, styles.color, styles.border)}>
            {styles.icon}
            {data.verdict}
          </div>
        </div>
        <div className="text-right flex items-center gap-6">
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
            <p className="text-xl font-bold font-mono text-truth-blue">{(data.confidence * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">Veracity Score</p>
            <p className="text-4xl font-bold font-mono hud-glow-blue">{data.score}/100</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-[10px] text-truth-orange uppercase tracking-widest mb-3">Reasoning</h3>
            <p className="text-sm leading-relaxed text-slate-300">{data.reasoning}</p>
          </div>
          
          <div>
            <h3 className="font-mono text-[10px] text-truth-orange uppercase tracking-widest mb-3">Bias Profile</h3>
            <p className="text-sm text-slate-400 italic">{data.bias}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-3">Red Flags Detected</h3>
            <ul className="space-y-2">
              {data.redFlags.map((flag, i) => (
                <li key={i} className="text-xs flex items-start gap-2 text-slate-400">
                  <span className="w-1 h-3 bg-red-500 mt-0.5" />
                  {flag}
                </li>
              ))}
              {data.redFlags.length === 0 && <li className="text-xs text-slate-500 italic">No significant flags detected.</li>}
            </ul>
          </div>

          <div>
             <h3 className="font-mono text-[10px] text-truth-blue uppercase tracking-widest mb-3">Evidence Sources</h3>
             <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                {data.sources.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block p-3 bg-slate-900/50 border border-slate-800 hover:border-truth-blue/30 transition-all rounded-sm group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-300 truncate max-w-[80%]">{s.title}</span>
                      <ExternalLink size={10} className="text-slate-500 group-hover:text-truth-blue" />
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">{s.snippet}</p>
                  </a>
                ))}
             </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="mt-8 w-full border border-slate-800 hover:border-slate-700 py-3 font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 hover:text-white transition-all"
      >
        Dismiss Report
      </button>
    </motion.div>
  );
};
