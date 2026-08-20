import React, { useState } from "react";
import { AIView } from "./ai.types";
import { useAIStore } from "./ai.store";
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  BrainCircuit, 
  Calendar, 
  PenTool, 
  BookOpen, 
  Mic, 
  Search, 
  Zap, 
  Award, 
  ChevronRight, 
  Clock,
  TrendingUp,
  Brain
} from "lucide-react";

interface AIDashboardProps {
  onViewChange: (view: AIView) => void;
}

export function AIDashboard({ onViewChange }: AIDashboardProps) {
  const setPendingQuery = useAIStore((state) => state.setPendingQuery);
  const [quickQuery, setQuickQuery] = useState("");

  // Get student name from localStorage if available
  const getStudentName = () => {
    const userStr = localStorage.getItem("ebm_user");
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u && u.name) {
          return u.name.split(" ")[0];
        }
      } catch (e) {}
    }
    return "Scholar";
  };

  const studentName = getStudentName();

  const handleQuickAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    setPendingQuery(quickQuery);
    onViewChange(AIView.CHAT);
  };

  const handlePromptClick = (promptText: string) => {
    setPendingQuery(promptText);
    onViewChange(AIView.CHAT);
  };

  const coaches = [
    { 
      id: AIView.WRITING, 
      title: "Writing Coach", 
      desc: "Paste your essays or notes to receive detailed structural and grammar reviews.", 
      icon: PenTool, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50", 
      borderColor: "hover:border-indigo-200" 
    },
    { 
      id: AIView.READING, 
      title: "Reading Coach", 
      desc: "Upload texts to generate summaries, vocabulary guides, and comprehension keys.", 
      icon: BookOpen, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50", 
      borderColor: "hover:border-emerald-200" 
    },
  ];



  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Glassmorphism Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 md:p-10 text-white border border-slate-800 shadow-xl">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-[10px] font-black uppercase tracking-widest border border-white/5 shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            EBM Cognitive Suite Active
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-100 to-purple-200">{studentName}</span>!
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              I've synthesized your performance data. You are excelling in <strong className="text-indigo-200 font-bold">Algebra</strong>, but your progress indicates we should reinforce your understanding of <strong className="text-amber-200 font-bold">Physics (Kinematics)</strong>.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <form onSubmit={handleQuickAskSubmit} className="relative max-w-xl group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="What topic or homework problem can I explain for you today?"
              className="w-full pl-12 pr-32 py-3.5 bg-white/5 hover:bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 focus:bg-white/10 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-1.5"
            >
              <Zap className="h-3.5 w-3.5" />
              Ask AI
            </button>
          </form>
        </div>
      </div>

      {/* 2. Micro Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Coaching Paths", value: "2 Coaches", sub: "Writing & Reading Coaches", icon: Brain, color: "text-indigo-500", bg: "bg-indigo-500/5" },
          { label: "AI Conversations", value: "24 Sessions", sub: "94% Helpful Rating", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Weekly Interaction Time", value: "2.4 Hours", sub: "+45m since last week", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/5" },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{stat.label}</p>
              <p className="text-base font-black text-slate-800 mt-0.5">{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Redesigned Layout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Coaches & Tools) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AI Interactive Coaches Group */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  Your AI Personal Coaches
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Specialized cognitive trainers configured for real-time practice.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coaches.map((coach) => (
                <button
                  key={coach.id}
                  onClick={() => onViewChange(coach.id)}
                  className={`group flex flex-col p-5 bg-white border border-slate-200/80 rounded-2xl text-left hover:shadow-md hover:border-slate-300 transition-all duration-200 relative overflow-hidden ${coach.borderColor}`}
                >
                  <div className={`p-3 rounded-xl ${coach.bg} ${coach.color} self-start mb-4 group-hover:scale-110 transition-transform`}>
                    <coach.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{coach.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5 flex-1">{coach.desc}</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Launch Coach <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>



          {/* Targeted Focus & Skill Interventions */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Targeted Focus Roster</h2>
                <h3 className="text-base font-black text-slate-800 mt-0.5">Curriculum Gaps Picked by AI</h3>
              </div>
              <button 
                onClick={() => onViewChange(AIView.INSIGHTS)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-xl transition-all"
              >
                Detailed Analytics <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { topic: "Kinematics Equations", subject: "Physics", progress: 45, status: "Critical Attention", statusBg: "bg-rose-50 text-rose-600 border-rose-100", prompt: "Help me practice kinematics formulas and solve dynamic acceleration problems" },
                { topic: "Trigonometric Identities", subject: "Mathematics", progress: 60, status: "Action Recommended", statusBg: "bg-amber-50 text-amber-600 border-amber-100", prompt: "Let's review core trigonometric proofs and double angle identities" },
                { topic: "Essay Thesis Framing", subject: "English Literature", progress: 78, status: "Developing Smoothly", statusBg: "bg-emerald-50 text-emerald-600 border-emerald-100", prompt: "Give me feedback on writing strong, defensible thesis statements for English literature essays" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100/70 hover:border-slate-200 hover:bg-slate-50/40 transition-all gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-800">{item.topic}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border ${item.statusBg}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{item.subject} • Target Mastery: 85%</p>
                  </div>
                  
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold text-slate-500">Current Level: {item.progress}%</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.progress < 50 ? 'bg-rose-500' : item.progress < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => handlePromptClick(item.prompt)}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-xs font-bold text-indigo-700 hover:text-indigo-800 transition-colors"
                    >
                      Tutor Me
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar (Countdown, Revision and Prompts) */}
        <div className="space-y-6">
          
          {/* AI Interactive Chat Welcome */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare className="h-32 w-32" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 border border-indigo-500/20 text-indigo-300 text-[9px] font-black uppercase tracking-widest">
                  AI Assistant
                </span>
                <h2 className="text-lg font-black text-white mt-3">Interactive Tutoring</h2>
                <p className="text-xs text-slate-300 font-medium mt-1">Get instant step-by-step help with homework, essays, and topics.</p>
              </div>

              <button 
                onClick={() => onViewChange(AIView.CHAT)}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Start Chat with AI Tutor
              </button>
            </div>
          </div>

          {/* Quick Smart Sparks Prompts */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Tutor Hot-Sparks</h3>
              <p className="text-[11px] text-slate-500 font-medium">Click any card to load direct tutoring instantly.</p>
            </div>

            <div className="space-y-2">
              {[
                { label: "🔬 Physics Coach", text: "Help me practice kinematics, acceleration formulas, and Newton's laws step-by-step.", desc: "Formula explanation & guide" },
                { label: "🧮 Math Wizard", text: "Explain trigonometric double angle identities with step-by-step proofs.", desc: "Proof breakdowns & identities" },
                { label: "✍️ Thesis Architect", text: "Give me critical analysis feedback on my essay's opening thesis statement.", desc: "Structure & argument reviews" },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(p.text)}
                  className="w-full p-3 bg-slate-50/50 hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-100 rounded-xl text-left transition-all group duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{p.label}</span>
                    <Sparkles className="h-3 w-3 text-slate-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1 line-clamp-1 italic">"{p.text}"</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
