import React from "react";
import { BookOpen, Upload, Search, List, Activity } from "lucide-react";

export function ReadingCoach() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Reading Coach</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Upload texts to generate vocabulary lists, summaries, and comprehension questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 border-dashed hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Upload Document</h3>
            <p className="text-xs text-slate-500">PDF, DOCX, or paste text</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Recent Texts</h3>
            <div className="space-y-3">
              {[
                { title: "Photosynthesis Article", date: "Oct 24" },
                { title: "Hamlet Act 1 Scene 1", date: "Oct 20" }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                    <div>
                      <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.date}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
           <div className="bg-slate-50 rounded-2xl border border-slate-200 h-[500px] flex flex-col items-center justify-center text-center p-8">
             <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300"><List className="h-5 w-5" /></div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300"><Search className="h-5 w-5" /></div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300"><Activity className="h-5 w-5" /></div>
             </div>
             <h3 className="font-bold text-slate-700 mb-2">Ready to Analyze</h3>
             <p className="text-sm text-slate-500 max-w-sm">
               Upload a document or paste text. The AI will extract key vocabulary, determine reading level, and generate comprehension checks.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
