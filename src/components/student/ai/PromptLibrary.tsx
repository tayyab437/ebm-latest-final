import React, { useState } from "react";
import { Lightbulb, Search, Copy, Star, Play, Check } from "lucide-react";

export function PromptLibrary() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const prompts = [
    { id: 1, title: "Explain like I'm 5", category: "General", text: "Explain [topic] in simple terms, as if you were talking to a 5-year-old. Use everyday analogies.", uses: 1240 },
    { id: 2, title: "Check Essay Structure", category: "Writing", text: "Analyze this essay structure. Point out strengths and weaknesses in the introduction, body paragraphs, and conclusion.", uses: 850 },
    { id: 3, title: "Math Step-by-Step", category: "Mathematics", text: "Solve this math problem step-by-step. Don't just give the answer, explain the reasoning behind each step.", uses: 2100 },
    { id: 4, title: "Generate Quiz Questions", category: "Revision", text: "Generate 5 multiple-choice questions on [topic] at a high school difficulty level.", uses: 1560 },
    { id: 5, title: "Debate Opponent", category: "Critical Thinking", text: "I will present an argument. I want you to act as my debate opponent and counter my points logically.", uses: 420 },
    { id: 6, title: "Vocabulary Context", category: "English", text: "Give me 3 examples of how to use the word [word] in different contexts (formal, informal, academic).", uses: 680 },
  ];

  const categories = ["All", "General", "Mathematics", "Writing", "Revision", "Critical Thinking", "English"];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Prompt Library</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Discover expertly crafted prompts to get the best out of your AI Tutor.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search prompts..." 
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              i === 0 
                ? "bg-slate-800 text-white" 
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map(prompt => (
          <div key={prompt.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                {prompt.category}
              </span>
              <button className="text-slate-300 hover:text-amber-500 transition-colors">
                <Star className="h-4 w-4" />
              </button>
            </div>
            
            <h3 className="font-bold text-slate-800 mb-2">{prompt.title}</h3>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 font-mono mb-4 flex-1 line-clamp-3">
              {prompt.text}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">{prompt.uses.toLocaleString()} uses</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(prompt.id, prompt.text)}
                  className="p-1.5 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center"
                  title="Copy Prompt"
                >
                  {copiedId === prompt.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <button 
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Play className="h-3 w-3" /> Use
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
