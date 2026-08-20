import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Award, Star, Zap, ChevronRight, X } from 'lucide-react';

interface PromotionCelebrationProps {
  newGrade: string;
  onClose: () => void;
}

export const PromotionCelebration: React.FC<PromotionCelebrationProps> = ({ newGrade, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative p-8 text-center space-y-6">
              <button 
                onClick={() => setShow(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex p-5 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-[32px] text-yellow-600 shadow-inner"
              >
                <Award className="h-16 w-16" />
              </motion.div>

              <div className="space-y-2">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-black text-slate-900 leading-tight"
                >
                  Grade Promotion!
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-500 font-medium"
                >
                  Your hard work has paid off. You've been promoted to:
                </motion.p>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white text-3xl font-black shadow-xl shadow-blue-200"
              >
                {newGrade}
              </motion.div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-1"
                >
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
                  <span className="text-sm font-bold text-slate-800">100% Achieved</span>
                </motion.div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-1"
                >
                  <Zap className="h-5 w-5 text-blue-500 fill-blue-500" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Content</span>
                  <span className="text-sm font-bold text-slate-800">Unlocked!</span>
                </motion.div>
              </div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  setShow(false);
                  onClose();
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-3xl font-bold text-lg hover:bg-slate-800 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                Explore New Grade Content
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <p className="text-xs text-slate-400 font-medium pb-2">
                Your official certificate has been added to your profile.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
