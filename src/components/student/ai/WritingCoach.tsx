import React, { useState } from "react";
import { PenTool, Check, ArrowRight, Type, List, LayoutTemplate } from "lucide-react";

export function WritingCoach() {
  const [text, setText] = useState("");

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300 h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Writing Coach</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Get immediate, constructive feedback on your essays and paragraphs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col h-full">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col flex-1 shadow-sm">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PenTool className="h-4 w-4 text-indigo-500" /> Your Text
              </h3>
              <div className="text-xs font-medium text-slate-400">{text.split(/\s+/).filter(w => w.length > 0).length} words</div>
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your essay or paragraph here..."
              className="flex-1 w-full bg-slate-50 rounded-xl p-4 resize-none border-none outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-700 leading-relaxed"
            />
            <div className="mt-4 flex gap-3 shrink-0">
               <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                 Analyze Text
               </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-slate-300" />
             </div>
             <h3 className="font-bold text-slate-700 mb-2">No Analysis Yet</h3>
             <p className="text-sm text-slate-500 max-w-sm mb-6">
               Paste your writing on the left and click Analyze. The AI will evaluate grammar, vocabulary, structure, and coherence.
             </p>
             
             <div className="grid grid-cols-2 gap-4 w-full max-w-md text-left">
               <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><LayoutTemplate className="h-4 w-4" /></div>
                 <div><div className="text-xs font-bold text-slate-700">Structure</div></div>
               </div>
               <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><List className="h-4 w-4" /></div>
                 <div><div className="text-xs font-bold text-slate-700">Coherence</div></div>
               </div>
               <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Type className="h-4 w-4" /></div>
                 <div><div className="text-xs font-bold text-slate-700">Vocabulary</div></div>
               </div>
               <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center"><Check className="h-4 w-4" /></div>
                 <div><div className="text-xs font-bold text-slate-700">Grammar</div></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
