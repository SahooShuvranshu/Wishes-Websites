
import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const MotionButton = motion.button as any;

interface WishFormProps {
  onWishGenerated: (name: string, wish: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

const FAMILY_WISHES = [
  "Wishing your family a year overflowing with peace, shared laughter, and beautiful new memories.",
  "May 2026 be a year of health, kindness, and wonderful surprises for you and your loved ones.",
  "Sending love and light to your home. May every day of the new year be brighter than the last!",
  "Cheers to a fresh start! May your path be clear and your heart be full of joy this year.",
  "May your family adventures in 2026 be the best ones yet. Happy New Year!",
  "Here's to another year of being together. May your bond grow stronger with every sunrise."
];

export const WishForm: React.FC<WishFormProps> = ({ onWishGenerated, onLoadingChange }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onLoadingChange(true);
    
    try {
      // Use standard initialization right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short, heartfelt, and poetic New Year blessing (under 20 words) for a person named "${name}". Mention glowing hopes, prosperity, and the magic of 2026. Do not focus specifically on Chinese New Year.`,
      });
      
      const generatedWish = response.text || FAMILY_WISHES[Math.floor(Math.random() * FAMILY_WISHES.length)];
      onWishGenerated(name, generatedWish);
    } catch (error) {
      console.error("AI Generation failed, falling back to presets:", error);
      const randomWish = FAMILY_WISHES[Math.floor(Math.random() * FAMILY_WISHES.length)];
      onWishGenerated(name, randomWish);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="relative group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your name"
          className="w-full bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl text-lg font-medium text-white border border-white/10 focus:border-red-500/50 focus:outline-none transition-all placeholder:text-slate-500 shadow-sm group-hover:shadow-md"
          maxLength={25}
          required
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none transition-colors group-focus-within:text-red-500/50">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
      
      <MotionButton
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 text-sm font-bold uppercase tracking-widest text-white bg-red-600 transition-all hover:bg-red-500 shadow-lg shadow-red-600/20"
      >
        <span>Send Your Wish</span>
        <Send className="w-4 h-4" />
      </MotionButton>
    </form>
  );
};
