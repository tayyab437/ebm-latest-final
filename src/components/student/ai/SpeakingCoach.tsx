import React from "react";
import { Mic, Play, Settings, Waves, Lock } from "lucide-react";

export function SpeakingCoach() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Speaking Coach</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Practice pronunciation, fluency, and spoken responses.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-slate-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            <Waves className="h-full w-full text-indigo-500" />
          </div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 border border-indigo-500/30">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <Mic className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Ready to Record</h3>
            <p className="text-indigo-200 text-sm max-w-sm mb-6">
              Click the microphone to start recording your response. Speak clearly.
            </p>
            
            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
              Start Recording
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
             <h4 className="font-bold text-slate-800 text-sm">Current Prompt:</h4>
             <p className="text-slate-600 text-sm mt-1">"Describe a time when you had to overcome a difficult challenge."</p>
           </div>
           <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
             Change Prompt
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
             <div className="text-xl font-black">--</div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Fluency Score</h4>
            <p className="text-xs text-slate-500 mt-0.5">Pacing and pauses</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
             <div className="text-xl font-black">--</div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Pronunciation</h4>
            <p className="text-xs text-slate-500 mt-0.5">Clarity and accent</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
             <div className="text-xl font-black">--</div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Vocabulary</h4>
            <p className="text-xs text-slate-500 mt-0.5">Lexical resource</p>
          </div>
        </div>
      </div>
    </div>
  );
}
