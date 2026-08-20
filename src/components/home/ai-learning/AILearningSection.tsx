import React, { useState, useEffect } from "react";
import { Sparkles, BrainCircuit, ShieldCheck, HeartHandshake, Compass, Laptop, Database, Globe } from "lucide-react";
import { AIChatPreview } from "./AIChatPreview";
import { AIFeatureGrid } from "./AIFeatureGrid";
import { AIStudyDashboard } from "./AIStudyDashboard";
import { AIWorkflow } from "./AIWorkflow";
import { AIPersonalization } from "./AIPersonalization";
import { AIResources } from "./AIResources";
import { AISecurityPanel } from "./AISecurityPanel";
import { aiLearningService } from "./ai-learning.data";
import { 
  AIFeature, 
  QuickPrompt, 
  AIWorkflowStep, 
  StudentProfile, 
  AIResource, 
  SecurityItem,
  StudyDashboard 
} from "./ai-learning.types";

export const AILearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "capabilities" | "workflow" | "resources">("chat");

  const [features, setFeatures] = useState<AIFeature[]>([]);
  const [workflowSteps, setWorkflowSteps] = useState<AIWorkflowStep[]>([]);
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [resources, setResources] = useState<AIResource[]>([]);
  const [securityItems, setSecurityItems] = useState<SecurityItem[]>([]);
  const [studyDashboard, setStudyDashboard] = useState<StudyDashboard | null>(null);

  useEffect(() => {
    let active = true;
    const loadAll = async () => {
      const [feat, flow, prof, res, sec, dash] = await Promise.all([
        aiLearningService.getFeatures(),
        aiLearningService.getWorkflow(),
        aiLearningService.getStudentProfiles(),
        aiLearningService.getResources(),
        aiLearningService.getSecurityItems(),
        aiLearningService.getStudyDashboard()
      ]);

      if (active) {
        setFeatures(feat);
        setWorkflowSteps(flow);
        setProfiles(prof);
        setResources(res);
        setSecurityItems(sec);
        setStudyDashboard(dash);
      }
    };
    loadAll();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="ai-learning"
      className="relative py-24 bg-slate-950 overflow-hidden text-slate-100 border-t border-slate-900"
    >
      {/* SaaS Background Accents & Particle Highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 font-sans tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Empower With Intelligent Mentoring
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Meet Your AI Learning Companion
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-sans font-normal">
            Your personal AI mentor is available every day to explain concepts, generate worksheets,
            create revision plans, answer questions, evaluate writing, prepare quizzes, and help you learn
            faster while understanding concepts deeply.
          </p>
        </div>

        {/* Modular Navigation Bar */}
        <div className="flex border-b border-slate-900/60 pb-px font-sans font-bold text-xs justify-center sm:justify-start overflow-x-auto scrollbar-none gap-2">
          {[
            { id: "chat", label: "Simulate Companion Chat" },
            { id: "capabilities", label: "Specialized AI Modules" },
            { id: "workflow", label: "How Socratic Loops Work" },
            { id: "resources", label: "On-Demand Resource Prep" }
          ].map((tab) => (
            <button
              id={`nav-tab-ai-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 border-b-2 whitespace-nowrap transition-all duration-250 select-none ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-400 font-extrabold shadow-[0_4px_12px_rgba(168,85,247,0.05)]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Screen Area */}
        <div className="space-y-12">
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              {/* Left Side: Large AI Chat Preview */}
              <div className="lg:col-span-7">
                <AIChatPreview />
              </div>

              {/* Right Side: Study telemetry and info summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                    <BrainCircuit className="w-3.5 h-3.5" /> EBM AI Engine
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Simulate Your Socratic Dialogue
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    This isn't a simple shortcut bot. By asking probing, socratic questions, EBM's Companion
                    helps students construct complex logic maps on their own, cementing conceptual mastery forever.
                  </p>
                </div>

                {/* Simulated Study Dashboard */}
                {studyDashboard && <AIStudyDashboard dashboard={studyDashboard} />}
              </div>
            </div>
          )}

          {activeTab === "capabilities" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="max-w-2xl text-left space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Ten Premium Academic Modules
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Our custom Gemini core acts as multiple specialized mentors—assessing spelling, compiling formulas,
                  shaping essays, or monitoring speaking fluency on-demand.
                </p>
              </div>

              <AIFeatureGrid features={features} />
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-10 animate-fade-in">
              {/* Loop explanation */}
              <div className="max-w-2xl text-left space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  The Complete Socratic Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  EBM replaces boring lectures with a cycle of questions, custom worksheet generation, and instant feedback.
                </p>
              </div>

              <AIWorkflow steps={workflowSteps} />

              <AIPersonalization profiles={profiles} />
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-12 animate-fade-in">
              <div className="max-w-2xl text-left space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Generated Resource Showrooms
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Preview downloadable worksheets, flashcard sets, and study maps dynamically generated during EBM study cycles.
                </p>
              </div>

              <AIResources resources={resources} />

              <AISecurityPanel items={securityItems} />
            </div>
          )}
        </div>

        {/* Future Architecture Blueprint Info */}
        <div className="border-t border-slate-900/60 pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-slate-600" />
            <span>Schema Prep: ai_features, ai_conversations, ai_resources, ai_recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>API Handlers: GET /ai/features &bull; GET /ai/resources</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AILearningSection;
