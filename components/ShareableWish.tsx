
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowLeft, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface ShareableWishProps {
  name: string;
  wish: string;
  onBack: () => void;
}

export const ShareableWish: React.FC<ShareableWishProps> = ({ name, wish, onBack }) => {
  useEffect(() => {
    const end = Date.now() + 1500;
    const colors = ['#dc2626', '#fbbf24', '#fef3c7', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const handleShare = async () => {
    const shareText = `New Year Wish for 2026: "${wish}" - From ${name} ✨`;
    if (navigator.share) {
      try {
        await navigator.share({ title: '2026 New Year Greeting', text: shareText, url: window.location.href });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Greeting copied! Send it to your loved ones.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
      <MotionDiv
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full aspect-[4/5] md:aspect-square bg-slate-900/80 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-red-500/20 flex flex-col justify-between overflow-hidden backdrop-blur-xl"
      >
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl opacity-60" />

        <header className="space-y-2">
           <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-red-500/10" />
           </div>
           <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-red-400">Festive Blessing</h3>
           <div className="w-10 h-[1px] bg-red-500/20 mx-auto mt-4" />
        </header>

        <div className="space-y-8">
           <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight text-glow">
             For {name}
           </h2>
           <p className="font-serif text-xl md:text-2xl text-slate-300 leading-relaxed italic font-light max-w-md mx-auto">
             "{wish}"
           </p>
        </div>

        <footer className="space-y-4">
           <div className="w-10 h-[1px] bg-red-500/20 mx-auto" />
           <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600">Twenty Twenty Six</div>
        </footer>
      </MotionDiv>

      <div className="flex items-center gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors uppercase text-xs font-bold tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Another Wish
        </button>
        
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="bg-red-600 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-red-500 shadow-xl shadow-red-600/20"
        >
          Share Blessing
        </MotionButton>
      </div>
    </div>
  );
};
