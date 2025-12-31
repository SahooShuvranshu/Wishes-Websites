
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionSpan = motion.span as any;

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = +target - +now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeSegment = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <div className="relative w-20 h-28 md:w-36 md:h-48 bg-white/[0.03] backdrop-blur-md rounded-2xl md:rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
        {/* Glow behind numbers */}
        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
        
        <AnimatePresence mode="popLayout">
          <MotionSpan
            key={value}
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{ 
              type: 'spring', 
              stiffness: 150, 
              damping: 18,
              opacity: { duration: 0.15 } 
            }}
            className="font-serif text-5xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {value.toString().padStart(2, '0')}
          </MotionSpan>
        </AnimatePresence>

        {/* Decorative horizontal line */}
        <div className="absolute w-full h-[1px] bg-white/5 top-1/2 -translate-y-1/2" />
      </div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-red-500/80 drop-shadow-sm transition-colors hover:text-red-400">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3 md:gap-8 px-4 py-8 md:p-12 rounded-[4rem]">
      <TimeSegment value={timeLeft.days} label="Days" />
      <div className="flex flex-col gap-3 md:gap-5 mb-8 md:mb-12 opacity-30">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
      </div>
      <TimeSegment value={timeLeft.hours} label="Hours" />
      <div className="flex flex-col gap-3 md:gap-5 mb-8 md:mb-12 opacity-30">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
      </div>
      <TimeSegment value={timeLeft.minutes} label="Mins" />
      <div className="flex flex-col gap-3 md:gap-5 mb-8 md:mb-12 opacity-30">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
      </div>
      <TimeSegment value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
