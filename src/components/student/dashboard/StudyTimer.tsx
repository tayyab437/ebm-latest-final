import React, { useState, useEffect } from "react";
import { Play, Square, RefreshCcw } from "lucide-react";

export function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins Pomodoro
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Focus Timer</h3>
        
        <div className="text-4xl font-mono font-light tracking-tight mb-4 text-amber-400">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTimer}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 flex items-center justify-center transition-transform active:scale-95"
          >
            {isActive ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>
          <button 
            onClick={resetTimer}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-transform active:scale-95"
          >
            <RefreshCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
