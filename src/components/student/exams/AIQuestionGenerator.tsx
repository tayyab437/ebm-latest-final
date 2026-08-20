import React, { useState } from "react";
import { useExamStore } from "./exam.store";
import { 
  Sparkles, 
  Brain, 
  Target, 
  Layers, 
  MessageSquare, 
  Wand2, 
  CheckCircle2, 
  Loader2,
  Settings2,
  FileText,
  AlertCircle
} from "lucide-react";
import clsx from "clsx";

export function AIQuestionGenerator() {
  const { generateAIQuestions, isLoading } = useExamStore();
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [count, setCount] = useState(5);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    await generateAIQuestions({ subject, topic, difficulty, count });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">AI Question Generator</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Leveraging Gemini for High-Order Thinking Assessments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Settings2 className="h-4 w-4 text-rose-500" /> Configuration
            </h3>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Area</label>
                  <select 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-rose-500/50 transition-all"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English Literature</option>
                    <option value="EBM Methodology">EBM Methodology</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Topic</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Quantum Mechanics, Algebra..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-rose-500/50 transition-all placeholder:text-slate-700"
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</label>
                     <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-rose-500/50 transition-all"
                     >
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                        <option value="ADAPTIVE">Adaptive</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Count</label>
                     <input 
                        type="number" 
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-rose-500/50 transition-all"
                     />
                  </div>
               </div>
            </div>

            <button 
               onClick={handleGenerate}
               disabled={isLoading || !topic}
               className={clsx(
                  "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3",
                  isLoading ? "bg-white/5 text-slate-500 cursor-wait" : "bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/20"
               )}
            >
               {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
               {isLoading ? "Consulting Gemini..." : "Generate Questions"}
            </button>

            {success && (
               <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Assets synced to Question Bank</p>
               </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-[2rem] border border-white/5 p-8">
             <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain className="h-4 w-4" /> AI Capability Note
             </h4>
             <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-widest">
                Our AI engine doesn't just generate facts; it builds questions aligned with Bloom's Taxonomy, 
                focusing on Evaluation and Creation phases for EBM learners.
             </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 h-full flex flex-col items-center justify-center text-center opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                 <FileText className="w-64 h-64 text-rose-500" />
              </div>
              <div className="relative z-10 max-w-lg">
                 <div className="w-20 h-20 rounded-[2rem] bg-rose-500/10 flex items-center justify-center text-rose-500 mb-8 mx-auto">
                    <Sparkles className="h-10 w-10" />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Live Preview Console</h3>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-10">
                    Generated questions will appear here for your review and moderation before they are added to the live assessment engine.
                 </p>
                 <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="h-24 bg-white/5 rounded-3xl border border-white/5 border-dashed" />
                    <div className="h-24 bg-white/5 rounded-3xl border border-white/5 border-dashed" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
