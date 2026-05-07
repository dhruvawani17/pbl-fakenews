/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './Dashboard';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TechnologySection } from './components/TechnologySection';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#03050a] flex flex-col relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(50,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(50,150,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#03050a]/50 to-[#03050a]" />
        </div>

        <div className="max-w-[1800px] w-full mx-auto flex-grow flex flex-col px-8 py-8 relative z-10">
          <Navigation />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/technology" element={<TechnologySection />} />
            <Route path="/how-it-works" element={<HowItWorksSection />} />
          </Routes>
        </div>

        {/* Extreme Decorative Scanlines */}
        <div className="fixed inset-0 pointer-events-none z-[100] bg-scanlines opacity-[0.03]" />
      </div>
    </Router>
  );
}
