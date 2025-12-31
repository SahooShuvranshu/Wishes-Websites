
import React, { useState, Suspense } from 'react';
import { Scene3D } from './components/Scene3D';
import { Countdown } from './components/Countdown';
import { WishForm } from './components/WishForm';
import { ShareableWish } from './components/ShareableWish';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [showStory, setShowStory] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [wish, setWish] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Target Jan 1st, 2026 for the countdown
  const countdownTarget = "2026-01-01T00:00:00";

  const handleWishGenerated = (name: string, selectedWish: string) => {
    setUserName(name);
    setWish(selectedWish);
  };

  const resetWish = () => {
    setUserName(null);
    setWish(null);
    setShowStory(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-slate-100">
      {/* 3D Visual Experience */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#020617]" />}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Modern UI Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Minimal Navigation */}
        <nav className="flex justify-between items-center px-8 md:px-16 py-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={resetWish}
          >
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 transition-transform group-hover:rotate-12">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">Wishes</span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowStory(!showStory)}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors"
            >
              About Wishes
            </button>
          </div>
        </nav>

        {/* Core Content View */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <AnimatePresence mode="wait">
            {showStory ? (
              <motion.div
                key="story"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card max-w-xl p-12 md:p-16 rounded-[3rem] space-y-8 text-center"
              >
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl font-bold text-red-500 italic">Happy New Year 2026</h2>
                  <p className="text-slate-300 leading-relaxed text-lg font-light">
                    As we welcome a new chapter, "Wishes" is a space for us to share our hopes, dreams, and joy for the year ahead. 
                    May this year bring you closer to your goals and fill your life with lasting happiness.
                  </p>
                </div>
                <div className="w-12 h-[1px] bg-red-500/20 mx-auto" />
                <button 
                  onClick={() => setShowStory(false)}
                  className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400"
                >
                  Close Vision
                </button>
              </motion.div>
            ) : !wish ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl text-center"
              >
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-red-500/80"
                  >
                    <Sparkles className="w-3 h-3" />
                    Launching Hopes Together
                  </motion.div>
                  <h1 className="font-serif text-7xl md:text-[8rem] font-bold text-white leading-none tracking-tighter text-glow">
                    Happy <span className="italic font-light text-red-500">2026</span>
                  </h1>
                </div>

                <div className="w-full">
                  <Countdown targetDate={countdownTarget} />
                </div>

                <div className="w-full pt-4">
                  <WishForm onWishGenerated={handleWishGenerated} onLoadingChange={setIsProcessing} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="wish-result" className="w-full flex justify-center">
                <ShareableWish name={userName!} wish={wish} onBack={resetWish} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Minimalist Footer */}
        <footer className="p-10 flex flex-col items-center gap-2 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 flex-wrap leading-relaxed">
             <span>Made With ❤️ ☕ By Shuvranshu &amp; Crystal Studio Development</span>
          </div>
          <div className="text-[8px] uppercase tracking-widest text-slate-600">© 2026 Crystal Studio Development</div>
        </footer>

        {/* Elegant Loading Experience */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-3xl"
            >
              <div className="w-20 h-20 relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-red-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
              </div>
              <p className="mt-8 font-serif italic text-xl text-red-200">Releasing your wish...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
