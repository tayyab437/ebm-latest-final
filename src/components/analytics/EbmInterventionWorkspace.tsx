import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Clock, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Activity, 
  Zap, 
  GraduationCap, 
  Check, 
  FileText,
  HelpCircle
} from "lucide-react";
import { LearnerNode } from "./EbmLearningGroups";

export interface EbmInterventionWorkspaceProps {
  selectedLearner?: LearnerNode | null;
  onFocusQuestionAnalysis?: (questionId: string) => void;
}

export const EbmInterventionWorkspace: React.FC<EbmInterventionWorkspaceProps> = ({
  selectedLearner,
  onFocusQuestionAnalysis
}) => {
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(2); // 0: Attempt, 1: Error, 2: Correction, 3: Reflection, 4: Reattempt, 5: Mastery
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState<boolean>(true);
  const [isReflectionOpen, setIsReflectionOpen] = useState<boolean>(false);
  const [activeDecisionStep, setActiveDecisionStep] = useState<number>(2); // 0: Evidence, 1: Identify, 2: Select Support, 3: Guide, 4: Correct, 5: Recheck

  // Dynamic student identity based on prop or approved demonstration default (Ali, Grade 9)
  const studentName = selectedLearner?.name || "Ali";
  const studentInitial = studentName.charAt(0);
  const masteryStatus = selectedLearner?.groupId === "A" ? "Secure" : selectedLearner?.groupId === "B" ? "Practising" : selectedLearner?.groupId === "C" ? "Needs Reteaching" : "Developing";

  // Decision Path steps
  const DECISION_PATH = [
    {
      id: "evidence",
      num: "01",
      name: "EVIDENCE",
      title: "Observe Demonstrated Work",
      desc: "Review questions attempted, time per question, and recurring execution error points.",
      callout: "Identified: Multi-step equation arithmetic slip at step 2."
    },
    {
      id: "identify",
      num: "02",
      name: "IDENTIFY NEED",
      title: "Diagnose Cognitive Obstacle",
      desc: "Distinguish between conceptual misunderstanding, execution slips, or missing prerequisites.",
      callout: "Diagnosis: Method is understood; execution precision is developing."
    },
    {
      id: "support",
      num: "03",
      name: "SELECT SUPPORT",
      title: "Determine Teacher Response",
      desc: "Choose appropriate pedagogical scaffolding rather than assigning arbitrary generic tasks.",
      callout: "Prescription: Guided step-by-step modelling on inverse operations."
    },
    {
      id: "guide",
      num: "04",
      name: "GUIDE",
      title: "Model & Explain",
      desc: "Engage the learner in 1:1 dialogue to clarify the exact transition where error occurred.",
      callout: "Dialogue: 'Let's verify what happens when we divide both sides by 3.'"
    },
    {
      id: "correct",
      num: "05",
      name: "CORRECT",
      title: "Learner Executes Repair",
      desc: "The student re-works the problem independently, actively repairing their cognitive path.",
      callout: "Learner Action: Self-identifies arithmetic division and corrects response."
    },
    {
      id: "recheck",
      num: "06",
      name: "RECHECK",
      title: "Verify Transfer & Fluency",
      desc: "Present a novel parallel problem without prompts to confirm secure independent mastery.",
      callout: "Verification: Successfully completed 3x + 7 = 22 & 4x + 6 = 26."
    }
  ];

  // Timeline stages
  const TIMELINE_EVENTS = [
    {
      num: "01",
      label: "ATTEMPTED",
      badge: "Completed",
      badgeColor: "bg-slate-100 text-slate-700",
      detail: "Attempted Question #18 (3x + 7 = 22) in 1m 24s.",
      work: "Subtracted 7 correctly to reach 3x = 15."
    },
    {
      num: "02",
      label: "INITIAL RESULT",
      badge: "Incorrect (Execution)",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      detail: "Final step division error: recorded x = 4 instead of x = 5.",
      work: "Method was structurally sound; calculation slip occurred."
    },
    {
      num: "03",
      label: "CORRECTION",
      badge: "In Progress",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      detail: "Guided diagnostic feedback provided. Learner is actively repairing the solution.",
      work: "Prompt: 'Check division of 15 by 3.' Re-calculating with visual check."
    },
    {
      num: "04",
      label: "REFLECTION",
      badge: "Recorded",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      detail: "Learner articulated error: 'I subtracted 7 correctly, but divided 15 ÷ 3 as 4.'",
      work: "Metacognitive awareness verified by teacher."
    },
    {
      num: "05",
      label: "REATTEMPT",
      badge: "Verified Correct",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      detail: "Parallel question #19 solved independently: 4x + 6 = 26 → x = 5.",
      work: "Independent execution confirmed without hints."
    },
    {
      num: "06",
      label: "MASTERY GATE",
      badge: "Secure Status",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      detail: "Progresses from Developing to Secure on Multi-Step Equations.",
      work: "Ready to advance to equations with fractional coefficients."
    }
  ];

  const handleLaunchQuestionDeepDive = () => {
    if (onFocusQuestionAnalysis) {
      onFocusQuestionAnalysis("Q18");
    }
    const el = document.getElementById("analytics-question-analysis");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="analytics-1on1-intervention" className="space-y-12">
      
      {/* Header & Framing */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]">
          <Target className="w-3.5 h-3.5 text-[#764dbd]" />
          <span>1:1 Diagnostic Workspace</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          What Exactly Is Blocking This Learner?
        </h2>

        <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-medium max-w-2xl mx-auto">
          Open an individual learner profile to see far beyond an average grade. The <strong className="text-slate-900 font-black">EBM Student Learning Record</strong> synthesizes the precise evidence a teacher needs to diagnose the real difficulty and intervene with surgical clarity.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3D EBM STUDENT LEARNING RECORD (PREMIUM DIAGNOSTIC WORKSPACE)            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Top Profile Header Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00a3e0] to-[#764dbd] flex items-center justify-center font-mono font-black text-xl text-white shadow-md">
              {studentInitial}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 block">
                EBM STUDENT LEARNING RECORD
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <h3 className="text-xl font-black text-white">Student: {studentName}</h3>
                <span className="text-slate-400">•</span>
                <span className="text-sm font-semibold text-slate-300">Grade 9</span>
                <span className="text-slate-400">•</span>
                <span className="text-sm font-semibold text-slate-300">Mathematics</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Mastery:</span>
            <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border ${
              masteryStatus === "Secure"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                : masteryStatus === "Practising"
                ? "bg-sky-500/20 text-sky-300 border-sky-400/30"
                : "bg-amber-500/20 text-amber-300 border-amber-400/30"
            }`}>
              {masteryStatus}
            </span>
          </div>
        </div>

        {/* 3-Column Diagnostic Layout (Left: Identity/Stats, Center: Evidence Timeline, Right: Next Action) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Identity & Core Evidence Metrics (3.5 cols) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Attempted</span>
                <span className="text-lg font-black text-slate-900 mt-0.5 block">42</span>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200/70">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Correct</span>
                <span className="text-lg font-black text-emerald-700 mt-0.5 block">35</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Time</span>
                <span className="text-lg font-black text-slate-900 mt-0.5 block">48m</span>
              </div>
            </div>

            {/* Strengths Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Areas of Strength</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400">Verified Secure</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-800">Fractions & Number Sense</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">94% Fluency</span>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-800">Problem Interpretation</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Consistent</span>
                </div>
              </div>
            </div>

            {/* Recurring Challenge Card */}
            <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center justify-between border-b border-rose-200/60 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Recurring Challenge</span>
                </span>
                <span className="text-[9px] font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-200">
                  7 Questions Observed
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <h4 className="font-black text-slate-900">Multi-Step Equations (Arithmetic Slippage)</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Understands variable isolation conceptually, but makes repeated arithmetic errors when dividing final coefficients.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                    Correction: In Progress
                  </span>
                  <button
                    type="button"
                    onClick={handleLaunchQuestionDeepDive}
                    className="text-[11px] font-bold text-[#0076a5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Question #18</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Teacher Support Provided Card */}
            <div className="bg-purple-50/40 rounded-2xl p-4 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#764dbd] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#764dbd]" />
                  <span>Teacher Support Provided</span>
                </span>
                <span className="text-[9px] font-bold text-purple-700">1:1 Session</span>
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                Step-by-step inverse operation modeling provided during class clinic. Re-check pending on novel task.
              </p>
            </div>

          </div>

          {/* CENTER COLUMN: Interactive Learning Evidence Timeline (4.5 cols) */}
          <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4 flex flex-col justify-between">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#0076a5]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Learning Evidence Timeline
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Interactive Log</span>
              </div>

              <p className="text-xs text-slate-600">
                Click any milestone to inspect verified learner evidence and repair state:
              </p>
            </div>

            {/* Vertical Timeline Stepper */}
            <div className="space-y-2.5 my-2">
              {TIMELINE_EVENTS.map((event, idx) => {
                const isActive = activeTimelineStage === idx;
                return (
                  <button
                    key={event.num}
                    type="button"
                    onClick={() => setActiveTimelineStage(idx)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start space-x-3 ${
                      isActive 
                        ? "bg-white border-slate-900 shadow-md ring-1 ring-slate-900/10" 
                        : "bg-white/70 hover:bg-white border-slate-200/70"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                      isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {event.num}
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 tracking-tight">
                          {event.label}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${event.badgeColor}`}>
                          {event.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">
                        {event.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Deep-Dive Box */}
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0076a5]">
                  Stage {TIMELINE_EVENTS[activeTimelineStage].num} Verified Work Log
                </span>
                <Eye className="w-3.5 h-3.5 text-[#0076a5]" />
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {TIMELINE_EVENTS[activeTimelineStage].work}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Dominant Next Action Panel (3.5 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0076a5] via-[#006087] to-[#0a425c] text-white rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>DATA SHOULD LEAD TO ACTION</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-200 block">
                  RECOMMENDED NEXT ACTION
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                  Targeted Correction + Reattempt
                </h3>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-200 block">
                  Prescribed Pedagogical Step
                </span>
                <p className="text-xs sm:text-sm text-cyan-50 font-medium leading-relaxed">
                  Provide guided arithmetic feedback on division step of Question #18. Verify retention with parallel task #19 before unlocking quadratic equations.
                </p>
              </div>

              <div className="space-y-2 text-xs text-cyan-100">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Assigned practice set: 4 linear equation items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Reflection prompt: Self-check arithmetic slips</span>
                </div>
              </div>

            </div>

            {/* Launch Question Analysis CTA Button */}
            <button
              type="button"
              onClick={handleLaunchQuestionDeepDive}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer relative z-10"
            >
              <span>INSPECT QUESTION #18 EVIDENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Teacher Role Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-blue-50 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#764dbd] text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#764dbd] block">
                TEACHER ROLE IN EBM ANALYTICS
              </span>
              <p className="text-sm font-black text-slate-900">
                "Observe carefully. Guide patiently."
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Technology supports the teacher's professional judgement—it does not replace human guidance.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-purple-700 bg-white border border-purple-200 px-3 py-1.5 rounded-xl shrink-0 shadow-2xs">
            Teacher-Led Precision
          </span>
        </div>

        {/* Interactive Decision Path / Intervention Flow */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              Pedagogical Decision Engine
            </span>
            <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">
              6-Step EBM Intervention Flow
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5" role="tablist" aria-label="Intervention decision steps">
            {DECISION_PATH.map((step, idx) => {
              const isSelected = activeDecisionStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveDecisionStep(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] focus-visible:ring-2 focus-visible:ring-[#00a3e0] focus-visible:outline-none ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md transform -translate-y-0.5"
                      : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-mono font-black ${isSelected ? "text-cyan-300" : "text-slate-400"}`}>
                      {step.num}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                  </div>

                  <div>
                    <h4 className={`text-xs font-black uppercase tracking-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {step.name}
                    </h4>
                    <p className={`text-[10px] leading-tight mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Decision Step Explanation Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900">
                Step {DECISION_PATH[activeDecisionStep].num}: {DECISION_PATH[activeDecisionStep].title}
              </span>
              <p className="text-slate-600">
                {DECISION_PATH[activeDecisionStep].desc}
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-mono font-bold text-[#0076a5] shrink-0">
              {DECISION_PATH[activeDecisionStep].callout}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
