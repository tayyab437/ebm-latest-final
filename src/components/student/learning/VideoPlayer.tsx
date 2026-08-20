import React from "react";
import { useLearningStore } from "./learning.store";
import { Play, Pause, Volume2, Maximize, Settings, SkipForward, SkipBack, Subtitles } from "lucide-react";
import clsx from "clsx";

export function VideoPlayer({ url }: { url?: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  
  // Custom video player UI - simulated for now
  return (
    <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-xl group border border-slate-800">
      {/* Video Element Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all hover:scale-110 active:scale-95" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="h-8 w-8 text-white fill-white" /> : <Play className="h-8 w-8 text-white fill-white ml-1" />}
        </div>
      </div>

      {/* Top Controls Gradient */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Bottom Controls Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer hover:h-2 transition-all group/progress relative">
          <div className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full w-1/3"></div>
          <div className="absolute top-1/2 -mt-1.5 left-1/3 -ml-1.5 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400 transition-colors focus:outline-none">
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none hidden sm:block"><SkipBack className="h-5 w-5 fill-current" /></button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none hidden sm:block"><SkipForward className="h-5 w-5 fill-current" /></button>
            <div className="flex items-center gap-2 group/volume relative">
              <button className="hover:text-indigo-400 transition-colors focus:outline-none"><Volume2 className="h-5 w-5" /></button>
              <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                <div className="w-20 h-1 bg-white/30 rounded-full mt-2"><div className="w-2/3 h-full bg-white rounded-full"></div></div>
              </div>
            </div>
            <span className="text-xs font-medium ml-2 font-mono">04:20 / 15:00</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hover:text-indigo-400 transition-colors focus:outline-none" title="Captions"><Subtitles className="h-5 w-5" /></button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none text-xs font-bold" title="Playback Speed">1x</button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none" title="Settings"><Settings className="h-5 w-5" /></button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none" title="Fullscreen"><Maximize className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
