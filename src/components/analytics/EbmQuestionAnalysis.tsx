import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Clock, 
  Eye, 
  ChevronRight, 
  RefreshCw, 
  RotateCcw, 
  Check, 
  ArrowRight, 
  Zap, 
  Activity, 
  Compass, 
  Layers, 
  Play, 
  Pause,
  BookOpen
} from "lucide-react";

export const EbmQuestionAnalysis: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<"QUESTION" | "RESPONSE" | "ERROR" | "CORRECTION" | "REFLECTION" | "REATTEMPT">("ERROR");
  const [activeChainStep, setActiveChainStep] = useState<number>(3); // 0-6 (0: Question, 1: Attempt, 2: Response, 3: Error, 4: Correction, 5: Reflection, 6: Reattempt)
  const [activeCorrectionStep, setActiveCorrectionStep] = useState<number>(2); // 0-5
  const [isAutoPlayingCycle, setIsAutoPlayingCycle] = useState<boolean>(false);

  // Auto playback for the Correction Cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlayingCycle) {
      interval = setInterval(() => {
        setActiveCorrectionStep((prev) => (prev + 1) % 6);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlayingCycle]);

  // 7-Stage Chain Data
  const CHAIN_STAGES = [
    { num: "01", id: "QUESTION", label: "Question", prompt: "What was being assessed?", desc: "Multi-step linear equation standard with integer coefficients.", color: "sky" },
    { num: "02", id: "ATTEMPT", label: "Attempt", prompt: "What did the learner do?", desc: "Applied subtraction property of equality (22 - 7 = 15).", color: "blue" },
    { num: "03", id: "RESPONSE", label: "Response", prompt: "What work was recorded?", desc: "Final written solution entered: x = 4.", color: "indigo" },
    { num: "04", id: "ERROR", label: "Error", prompt: "Where did performance break down?", desc: "Division slip on final arithmetic step (15 ÷ 3 recorded as 4).", color: "amber" },
    { num: "05", id: "CORRECTION", label: "Correction", prompt: "Was the error understood and repaired?", desc: "Prompted to re-check division; student actively re-calculated to x = 5.", color: "purple" },
    { num: "06", id: "REFLECTION", label: "Reflection", prompt: "What did the learner recognise?", desc: "Metacognitive awareness recorded: 'I made the slip during the final division step.'", color: "teal" },
    { num: "07", id: "REATTEMPT", label: "Reattempt", prompt: "Can the learner perform independently?", desc: "Solved parallel task 4x + 6 = 26 → x = 5 with zero teacher cues.", color: "emerald" },
  ];

  // 6-Step Correction Cycle Data
  const CORRECTION_CYCLE_STEPS = [
    {
      num: "01",
      name: "ATTEMPT",
      title: "Active Problem Engagement",
      meaning: "Learner attempts authentic problem without hints.",
      evidence: "Solved 3x + 7 = 22 and arrived at x = 4.",
      stateLabel: "INITIAL ATTEMPT",
      badgeColor: "bg-slate-100 text-slate-700"
    },
    {
      num: "02",
      name: "IDENTIFY",
      title: "Pinpoint The Exact Breakdown",
      meaning: "Teacher & student isolate the specific step where the mistake occurred.",
      evidence: "Step 1 (3x = 15) is correct; Step 2 (15 ÷ 3 = 4) is arithmetic error.",
      stateLabel: "DIAGNOSTIC PINPOINT",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      num: "03",
      name: "UNDERSTAND",
      title: "Clarify Cognitive Cause",
      meaning: "Distinguish execution slips from conceptual misunderstandings or missing prerequisites.",
      evidence: "Identified as execution slip; algebraic concept is solid.",
      stateLabel: "COGNITIVE CLARITY",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      num: "04",
      name: "CORRECT",
      title: "Learner-Driven Repair",
      meaning: "Learner re-works the operation actively rather than just copying a correct answer.",
      evidence: "Student writes 15 ÷ 3 = 5, corrects equation solution to x = 5.",
      stateLabel: "ACTIVE REPAIR",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      num: "05",
      name: "REATTEMPT",
      title: "Novel Parallel Task",
      meaning: "Verify that learning has occurred by testing on a fresh problem.",
      evidence: "Assigned 4x + 6 = 26 without teacher intervention.",
      stateLabel: "INDEPENDENT CHECK",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200"
    },
    {
      num: "06",
      name: "DEMONSTRATE",
      title: "Secure Mastery Retained",
      meaning: "New formative evidence demonstrates reliable independent understanding.",
      evidence: "Successfully solved x = 5; ready for fractional coefficients.",
      stateLabel: "MASTERY DEMONSTRATED",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  return (
    <div id="analytics-question-analysis" className="space-y-14">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#0076a5]/10 border border-[#0076a5]/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#0076a5]">
          <HelpCircle className="w-3.5 h-3.5 text-[#0076a5]" />
          <span>EBM Question-Level Analysis</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          See What the Learner's Work Reveals
        </h2>

        <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-medium max-w-2xl mx-auto">
          A score only shows whether an answer was right or wrong. <strong className="text-slate-900 font-black">Question-level evidence reveals the learning process:</strong> where understanding broke down, what kind of difficulty occurred, whether correction took place, and what should happen next.
        </p>

        <div className="pt-2">
          <p className="text-xs sm:text-sm font-bold text-[#764dbd] bg-purple-50 border border-purple-200/80 px-4 py-2 rounded-xl inline-block">
            Question-level evidence helps teachers distinguish between conceptual misunderstandings, execution errors, and missing prerequisites.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MAIN VISUAL: QUESTION EVIDENCE EXPLORER                                */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Explorer Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-[#764dbd] font-black text-lg">
              M
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                QUESTION EVIDENCE EXPLORER
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs">
                <span className="font-black text-slate-900">Student: Maya</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-slate-600">Mathematics</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-slate-600">Standard: Solving Linear Equations</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              Item #18
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
              Correction Required
            </span>
          </div>
        </div>

        {/* 3D Layered Evidence Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): The Central Question Object & Student Artifact */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Question Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#0076a5]" />
                  <span>Target Question 18</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-bold">1 Mark</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Solve for x:</span>
                <p className="text-2xl font-mono font-black text-slate-900 tracking-wider">
                  3x + 7 = 22
                </p>
              </div>

              {/* Student Response vs Expected */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                    Learner Answer
                  </span>
                  <span className="text-lg font-mono font-black text-rose-700 block">x = 4</span>
                  <span className="text-[10px] text-rose-600 block">Initial Attempt</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                    Expected Answer
                  </span>
                  <span className="text-lg font-mono font-black text-emerald-700 block">x = 5</span>
                  <span className="text-[10px] text-emerald-600 block">15 ÷ 3 = 5</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Interpretation Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                  WHAT DOES THIS REVEAL?
                </span>
                <Activity className="w-4 h-4 text-cyan-300" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <span className="text-[9px] text-slate-300 uppercase block font-bold">Method</span>
                  <span className="font-black text-emerald-300 text-xs">Understood</span>
                </div>
                <div className="bg-amber-400/20 p-2.5 rounded-xl border border-amber-400/30">
                  <span className="text-[9px] text-amber-200 uppercase block font-bold">Execution</span>
                  <span className="font-black text-amber-300 text-xs">Developing</span>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <span className="text-[9px] text-slate-300 uppercase block font-bold">Prerequisite</span>
                  <span className="font-black text-cyan-200 text-xs">Secure</span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium pt-1">
                Identified as an <strong className="text-white">execution error</strong> rather than a conceptual breakdown. The student subtracted 7 accurately (3x = 15), but calculated 15 ÷ 3 as 4.
              </p>
            </div>

          </div>

          {/* Right Column (7 cols): Layered Evidence Ring / Interactive Deep-Dive */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Layer Selection Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Evidence Layers:</span>
              </span>

              {[
                { id: "QUESTION", label: "01 Item Standard" },
                { id: "RESPONSE", label: "02 Work Trace" },
                { id: "ERROR", label: "03 Error Diagnostic" },
                { id: "CORRECTION", label: "04 Active Repair" },
                { id: "REFLECTION", label: "05 Self-Reflection" },
                { id: "REATTEMPT", label: "06 Verified Reattempt" },
              ].map((layer) => {
                const isSelected = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayer(layer.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>

            {/* Active Layer Deep-Dive Display Card */}
            <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/90 space-y-4 min-h-[300px] flex flex-col justify-between">
              
              {activeLayer === "QUESTION" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-[#0076a5]">
                      Layer 1: Item Curriculum Alignment
                    </span>
                    <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">Algebra Strand</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Solving Two-Step Linear Equations with Integers</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    This task assesses whether the student can apply inverse operations symmetrically to isolate the unknown variable in equations of the form <code className="bg-white px-2 py-0.5 rounded border text-slate-900 font-mono">ax + b = c</code>.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">Prerequisite: One-step inverse operations</span>
                    <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">Prerequisite: Basic integer division</span>
                  </div>
                </div>
              )}

              {activeLayer === "RESPONSE" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-700">
                      Layer 2: Student Work Trace
                    </span>
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Trace Log</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Step-by-Step Computational Progression</h4>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 font-mono text-xs text-slate-800">
                    <div className="flex justify-between border-b pb-1">
                      <span>Step 1: 3x + 7 - 7 = 22 - 7</span>
                      <span className="text-emerald-600 font-bold">✓ 3x = 15 (Correct)</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Step 2: x = 15 ÷ 3</span>
                      <span className="text-rose-600 font-bold">✗ x = 4 (Arithmetic Slip)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    The work trace confirms that algebraic reasoning was maintained throughout step 1; error occurred solely during numerical quotient calculation.
                  </p>
                </div>
              )}

              {activeLayer === "ERROR" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-800">
                      Layer 3: Diagnostic Error Categorization
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">Execution Error</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Distinguishing "Execution Slip" vs "Misconception"</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Because the student correctly subtracted 7 from both sides, the core concept of inverse operations was preserved. The error occurred on the final integer division (15 ÷ 3).
                  </p>
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <strong className="block">Pedagogical Implication:</strong>
                    <span>Do NOT force the student to repeat the entire introductory equation lesson. Instead, provide targeted arithmetic feedback and prompt self-monitoring checks.</span>
                  </div>
                </div>
              )}

              {activeLayer === "CORRECTION" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-700">
                      Layer 4: Active Cognitive Repair
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Guided Correction</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Repairing the Computational Slip</h4>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Diagnostic Prompt:</span>
                      <span className="font-bold text-[#0076a5]">"Recalculate 15 ÷ 3."</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono font-bold">
                      Learner Action: 15 ÷ 3 = 5 → Solution corrected to x = 5.
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Mistake was not simply flagged as wrong; the learner actively performed the correction step to reinforce accuracy.
                  </p>
                </div>
              )}

              {activeLayer === "REFLECTION" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-purple-700">
                      Layer 5: Learner Reflection & Metacognition
                    </span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Self-Awareness</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">"What Did I Need to Do Differently?"</h4>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">Recorded Student Reflection:</span>
                    <p className="text-sm italic text-slate-900 font-serif font-medium">
                      "I subtracted 7 correctly to get 15, but then divided 15 by 3 in a rush and wrote 4 instead of 5. Next time I will substitute my answer back into 3(5) + 7 to verify."
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Recording reflections deepens self-monitoring and prevents repetitive calculation mistakes.
                  </p>
                </div>
              )}

              {activeLayer === "REATTEMPT" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
                      Layer 6: Verified Independent Reattempt
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Independent Mastery</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Parallel Verification Item #19</h4>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                    <div className="flex justify-between font-mono font-bold text-slate-900">
                      <span>Problem: 4x + 6 = 26</span>
                      <span className="text-emerald-700">Learner: x = 5 ✓</span>
                    </div>
                    <p className="text-slate-600">
                      Completed independently in 42 seconds with zero hints. Verification check successfully demonstrated.
                    </p>
                  </div>
                  <p className="text-xs text-emerald-800 font-bold">
                    ✓ Mastery status updated to Secure for two-step equations.
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Diagnostic Principle: Evidence informs teacher response</span>
                <span className="font-mono font-bold text-slate-700">EBM Criterion #18</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. 7-STAGE QUESTION-LEVEL LEARNING CHAIN (INTERACTIVE PIPELINE)           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0076a5] block">
            Continuous Evidence Pipeline
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7-Stage Question-Level Learning Chain
          </h3>
          <p className="text-slate-600 text-sm font-medium">
            Watch how evidence travels through the complete learning cycle—from initial assessment to validated independent mastery.
          </p>
        </div>

        {/* 7-Stage Interactive Pipeline Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative">
          {CHAIN_STAGES.map((stage, idx) => {
            const isActive = activeChainStep === idx;
            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => setActiveChainStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 sm:h-48 relative overflow-hidden ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl transform -translate-y-1 ring-2 ring-[#00a3e0]/40"
                    : idx === 3
                    ? "bg-rose-50/40 hover:bg-rose-50 border-rose-200/80 text-slate-800"
                    : idx === 6
                    ? "bg-emerald-50/40 hover:bg-emerald-50 border-emerald-200/80 text-slate-800"
                    : "bg-slate-50/80 hover:bg-white border-slate-200/80 text-slate-800"
                }`}
              >
                {/* Active Glowing Pulse */}
                {isActive && (
                  <span className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl pointer-events-none" />
                )}

                <div className="flex items-center justify-between w-full relative z-10">
                  <span className={`text-xs font-mono font-black ${isActive ? "text-cyan-300" : "text-slate-400"}`}>
                    {stage.num}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>

                <div className="relative z-10 space-y-1">
                  <h4 className={`text-sm font-black uppercase tracking-tight ${isActive ? "text-white" : "text-slate-900"}`}>
                    {stage.label}
                  </h4>
                  <p className={`text-[11px] font-medium leading-tight ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                    {stage.prompt}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/15 relative z-10">
                  <span className={`text-[9px] font-black uppercase tracking-wider block ${
                    isActive ? "text-cyan-200" : "text-slate-400"
                  }`}>
                    {idx === 0 && "Assessment"}
                    {idx === 1 && "Engagement"}
                    {idx === 2 && "Artifact"}
                    {idx === 3 && "Diagnosis"}
                    {idx === 4 && "Repair"}
                    {idx === 5 && "Metacognition"}
                    {idx === 6 && "Mastery"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Chain Stage Deep-Dive Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
                Stage {CHAIN_STAGES[activeChainStep].num}: {CHAIN_STAGES[activeChainStep].label} in Action
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-100">
              {CHAIN_STAGES[activeChainStep].desc}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveChainStep((prev) => (prev > 0 ? prev - 1 : 6))}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              ← Previous Stage
            </button>
            <button
              type="button"
              onClick={() => setActiveChainStep((prev) => (prev < 6 ? prev + 1 : 0))}
              className="px-3 py-1.5 rounded-xl bg-[#00a3e0] hover:bg-[#0092c9] text-xs font-black text-white transition-colors shadow-md"
            >
              Next Stage →
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. EBM CORRECTION CYCLE: "ERROR → LEARNING" TRANSFORMATION                */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-800">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Formative Repair Engine</span>
          </span>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The EBM Correction Cycle
          </h3>

          <p className="text-slate-600 leading-relaxed text-base font-medium max-w-2xl mx-auto">
            EBM does not reduce assessment to a binary "Right vs Wrong." Instead, <strong className="text-slate-900 font-black">mistakes become the starting point of deep learning</strong> through a structured 6-stage repair loop.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsAutoPlayingCycle(!isAutoPlayingCycle)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-sm ${
                isAutoPlayingCycle
                  ? "bg-amber-500 text-slate-950 shadow-amber-500/20"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {isAutoPlayingCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoPlayingCycle ? "PAUSE INTERACTION" : "AUTO-PLAY LEARNING CYCLE"}</span>
            </button>
          </div>
        </div>

        {/* Circular / Orbital Visual Workspace (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (6 cols): 6-Step Stepper Cards */}
          <div className="lg:col-span-6 space-y-3">
            {CORRECTION_CYCLE_STEPS.map((step, idx) => {
              const isCurrent = activeCorrectionStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    setActiveCorrectionStep(idx);
                    setIsAutoPlayingCycle(false);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-4 ${
                    isCurrent
                      ? "bg-white border-slate-900 shadow-xl ring-2 ring-[#00a3e0]/30 transform -translate-y-0.5"
                      : "bg-slate-50/70 hover:bg-white border-slate-200/80"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                    isCurrent ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {step.num}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {step.name} • {step.title}
                      </h5>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${step.badgeColor}`}>
                        {step.stateLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {step.meaning}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (6 cols): Circular "ERROR → LEARNING" Transformation Arena */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                TRANSFORMATION ENGINE
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                Stage {CORRECTION_CYCLE_STEPS[activeCorrectionStep].num} Active
              </span>
            </div>

            {/* Central Animated Core */}
            <div className="relative z-10 py-6 text-center space-y-4">
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00a3e0] via-[#764dbd] to-emerald-500 flex items-center justify-center mx-auto shadow-xl shadow-cyan-900/40">
                <RotateCcw className="w-10 h-10 text-white" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 block">
                  CORE EBM PEDAGOGICAL AXIOM
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  ERROR SHOULD PRODUCE LEARNING
                </h4>
              </div>

              {/* Active Step Verified Evidence Callout */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-left space-y-1.5 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    Live Formative Trace:
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-mono">
                  {CORRECTION_CYCLE_STEPS[activeCorrectionStep].evidence}
                </p>
              </div>

            </div>

            <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Classroom Evidence Loop</span>
              <span className="text-cyan-300 font-bold">100% Diagnostic Retention</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
