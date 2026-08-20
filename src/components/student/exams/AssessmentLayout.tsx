import React from "react";
import { useExamStore } from "./exam.store";
import { ExamSidebar } from "./ExamSidebar";
import { ExamView } from "./exam.types";
import { ExamDashboard } from "./ExamDashboard";
import { QuestionBank } from "./QuestionBank";
import { AIQuestionGenerator } from "./AIQuestionGenerator";
import { ExamBuilder } from "./ExamBuilder";
import { ExamPlayer } from "./ExamPlayer";
import { CertificateCenter } from "./CertificateCenter";
import { ResultViewer } from "./ResultViewer";
import { ExamAnalytics } from "./ExamAnalytics";
import { AIMarkingPanel } from "./AIMarkingPanel";
import { RubricManager } from "./RubricManager";
import { 
  Menu, 
  Bell, 
  Search, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Info,
  Activity
} from "lucide-react";

export function AssessmentLayout() {
  const { currentView, setCurrentView, fetchExams } = useExamStore();

  React.useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="flex h-full bg-[#030712] overflow-hidden">
      {currentView === ExamView.PLAYER && <ExamPlayer />}
      <ExamSidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-10 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white uppercase tracking-tight">Assessment Intelligence</h1>
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Evaluation & Examination System</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-2xl px-5 py-2.5 w-80 group focus-within:border-rose-500/30 transition-all">
              <Search className="h-4 w-4 text-slate-500 mr-3" />
              <input 
                type="text" 
                placeholder="Search exams, questions, results..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 rounded-xl border border-rose-500/20">
                 <ShieldAlert className="h-4 w-4 text-rose-500" />
                 <span className="text-xs font-black text-rose-500">Examiner Status</span>
              </div>
              <button className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {currentView === ExamView.DASHBOARD && <ExamDashboard />}
            {currentView === ExamView.QUESTION_BANK && <QuestionBank />}
            {currentView === ExamView.AI_GENERATOR && <AIQuestionGenerator />}
            {currentView === ExamView.CREATE && <ExamBuilder />}
            {currentView === ExamView.CERTIFICATES && <CertificateCenter />}
            {currentView === ExamView.RESULTS && <ResultViewer />}
            {currentView === ExamView.ANALYTICS && <ExamAnalytics />}
            {currentView === ExamView.MODERATION && <AIMarkingPanel />}
            {currentView === ExamView.RUBRICS && <RubricManager />}
            
            {/* Catch-all for modules being implemented */}
            {[
              ExamView.CALENDAR,
              ExamView.TEMPLATES,
              ExamView.LIVE,
              ExamView.SETTINGS,
            ].includes(currentView) && ![ExamView.DASHBOARD, ExamView.QUESTION_BANK, ExamView.AI_GENERATOR, ExamView.CREATE, ExamView.CERTIFICATES, ExamView.RESULTS, ExamView.ANALYTICS, ExamView.MODERATION, ExamView.RUBRICS].includes(currentView) && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 relative group">
                   <div className="absolute inset-0 bg-rose-500/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Sparkles className="h-10 w-10 text-slate-800 group-hover:text-rose-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-3">{currentView.replace(/_/g, ' ')} Module</h3>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest max-w-sm text-center leading-relaxed">
                  The Assessment Intelligence Engine is currently processing data for this segment. Please check back shortly.
                </p>
                <button 
                  onClick={() => setCurrentView(ExamView.DASHBOARD)}
                  className="mt-10 px-8 py-3 bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all rounded-xl"
                >
                   Return to Hub
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
