import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Shield, Cpu, Network, Zap } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { HUDPanel } from './components/HUDPanel';
import { VeritasSphere } from './components/VeritasSphere';
import { WaveformScan } from './components/WaveformScan';
import { SystemStatus } from './components/SystemStatus';
import { ThreatAnalysis } from './components/ThreatAnalysis';
import { NeuralMap } from './components/NeuralMap';
import { ScannerProgress } from './components/ScannerProgress';
import { VerificationMetrics } from './components/VerificationMetrics';
import { AnalysisDetails } from './components/AnalysisDetails';

export const Dashboard: React.FC = () => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleVerify = async (content: string, youtubeUrl: string) => {
    setIsVerifying(true);
    setError(null);
    try {
      // Contact our new Python FastAPI Backend
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: content + (youtubeUrl ? ` (Context URL: ${youtubeUrl})` : ''),
          base_url: "https://api.groq.com/openai/v1",
          model_name: "openai/gpt-oss-120b"
        }),
      });
      
      const analysisJson = await response.json();
      if (!response.ok) throw new Error(analysisJson.detail || analysisJson.error || 'Context gathering failed');
      
      setAnalysisResult({
        ...analysisJson,
        sources: analysisJson.sources || []
      });
    } catch (err: any) {
      console.error('Verification Error:', err);
      let errorMsg = err.message || 'An unexpected error occurred during verification.';
      if (errorMsg.includes('NOT_FOUND') || errorMsg.includes('404')) {
        errorMsg = 'AI Verification Service unreachable or model quota exceeded. Please try again soon.';
      }
      setError(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      {/* Analysis Result Modal */}
      <AnimatePresence>
        {analysisResult && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#03050a]/80 backdrop-blur-sm">
             <AnalysisDetails 
               data={analysisResult} 
               onClose={() => setAnalysisResult(null)} 
             />
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow grid grid-cols-12 gap-8 mt-12 mb-8 items-stretch pt-4">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-8 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             <HeroSection onVerify={handleVerify} isLoading={isVerifying} />
             {error && (
               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest text-center"
               >
                 Error: {error}
               </motion.p>
             )}
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HUDPanel title="Real-Time Scan Feed" icon={<Activity size={14} />} accent="orange">
              <WaveformScan />
            </HUDPanel>
          </motion.div>
        </div>

        {/* CENTER COLUMN (Sphere) */}
        <div className="col-span-12 lg:col-span-6 relative flex items-center justify-center">
           <motion.div 
             className="w-full h-full max-h-[700px]"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
           >
             <VeritasSphere />
           </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 justify-center">
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HUDPanel title="System Status" icon={<Cpu size={14} />} accent="blue">
              <SystemStatus />
            </HUDPanel>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HUDPanel title="Threat Analysis" icon={<Shield size={14} />} accent="orange">
              <ThreatAnalysis />
            </HUDPanel>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex-grow"
          >
            <HUDPanel title="Neural Network Map" icon={<Network size={14} />} accent="blue" className="h-full">
              <NeuralMap />
            </HUDPanel>
          </motion.div>
        </div>
      </main>

      {/* BOTTOM SECTION */}
      <motion.footer 
        className="grid grid-cols-12 gap-8 items-end"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="col-span-12 lg:col-span-4 self-center">
          <HUDPanel title="Verification Metrics" icon={<Zap size={14} />} accent="orange">
            <VerificationMetrics />
          </HUDPanel>
        </div>
        <div className="col-span-12 lg:col-span-8 flex justify-end">
          <div className="w-full max-w-2xl">
            <ScannerProgress />
          </div>
        </div>
      </motion.footer>
    </>
  );
};