import React from "react";
import { useLiveStore } from "./live.store";
import { 
  Sparkles, 
  Brain, 
  FileText, 
  Zap, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Download,
  Share2,
  ChevronRight,
  Lightbulb,
  MessageSquare
} from "lucide-react";
import clsx from "clsx";

export function AISummaryPanel() {
  const summaries = [
    {
      id: "s1",
      date: "Jun 28, 2024",
      subject: "Mathematics",
      title: "Complex Numbers & Argand Diagrams",
      keyConcepts: [
        "Imaginary unit (i) definition",
        "Operations with complex numbers",
        "Conjugate pairs and division",
        "Modulus and Argument visualization"
      ],
      vocabulary: [
        { word: "Imaginary Unit", def: "The number i, where i² = -1." },
        { word: "Argand Diagram", def: "A geometric representation of complex numbers as points in a 2D plane." }
      ],
      aiInsights: "Your engagement peaked during the visualization segment. Focus on practicing conjugate division, as you asked 3 questions there."
    }
  ];

  const selectedSummary = summaries[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">AI Post-Class Intelligence</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Automated Summaries, Insights & Adaptive Reinforcement</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2">
             <Zap className="h-4 w-4" /> Process Latest Class
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Detailed Summary View */}
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                 <Sparkles className="w-80 h-80 text-rose-500" />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                          <Brain className="h-8 w-8" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{selectedSummary.subject}</p>
                          <h3 className="text-xl font-black text-white tracking-tight">{selectedSummary.title}</h3>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all"><Download className="h-4 w-4" /></button>
                       <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all"><Share2 className="h-4 w-4" /></button>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div>
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Target className="h-3.5 w-3.5 text-rose-500" /> Key Concepts Mastered
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedSummary.keyConcepts.map((concept, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                               <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                               <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{concept}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-8">
                       <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Lightbulb className="h-3.5 w-3.5" /> Neural Link Insights
                       </h4>
                       <p className="text-sm font-bold text-slate-300 leading-relaxed italic">
                          "{selectedSummary.aiInsights}"
                       </p>
                    </div>

                    <div>
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-rose-500" /> Vocabulary Drill
                       </h4>
                       <div className="space-y-3">
                          {selectedSummary.vocabulary.map((v, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                               <span className="text-xs font-black text-white uppercase tracking-widest">{v.word}</span>
                               <span className="text-[10px] font-bold text-slate-500 leading-relaxed md:max-w-md md:text-right">{v.def}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           {/* Sidebar: AI Generated Materials */}
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-rose-400">AI Study Kit</h3>
              <div className="space-y-4 relative z-10">
                 {[
                   { label: "Revision Flashcards", icon: Zap, count: "12 Cards" },
                   { label: "Practice Worksheet", icon: FileText, count: "PDF Export" },
                   { label: "Concept Mind Map", icon: Sparkles, count: "Interactive" },
                   { label: "AI Mock Quiz", icon: MessageSquare, count: "10 MCQs" },
                 ].map((kit, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <kit.icon className="h-5 w-5" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">{kit.label}</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{kit.count}</p>
                         </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-700" />
                   </div>
                 ))}
              </div>
           </div>

           {/* History of AI Summaries */}
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Summary History</h3>
              <div className="space-y-4">
                 {["Quantum Physics", "Organic Chemistry", "The Renaissance", "Linear Equations"].map((title, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest truncate">{title}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Last Week</p>
                   </div>
                 ))}
                 <button className="w-full py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-400 transition-colors">
                    View All Summaries
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
