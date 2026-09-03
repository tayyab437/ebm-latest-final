import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "./design-system/EbmMotion";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  GraduationCap,
  Zap,
  ArrowRight,
  RefreshCw,
  Activity,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
  Check,
  Layers,
  Sparkle
} from "lucide-react";
import { EbmSurface } from "./design-system/EbmSurface";

// --- Types & Data ---

export interface MasteryStage {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  tag: string;
  description: string;
  criteria: string[];
  depthZ: number; // in px
  accentColor: "sky" | "blue" | "amber" | "emerald" | "purple";
  statusType: "introduced" | "practising" | "developing" | "secure" | "mastered";
  evidenceSample: string;
  nextAction: string;
}

const MASTERY_STAGES: MasteryStage[] = [
  {
    id: "introduced",
    num: "01",
    name: "INTRODUCED",
    subtitle: "First Exposure",
    tag: "Cognitive Modeling",
    description: "The learner has encountered the concept or skill. Initial cognitive modeling and direct instruction provide the foundational framing.",
    criteria: ["First concept exposure", "Teacher modeled examples", "Guided discovery"],
    depthZ: 5,
    accentColor: "sky",
    statusType: "introduced",
    evidenceSample: "1st encounter observed · Initial baseline mapped",
    nextAction: "Guided structured practice with scaffolded cues"
  },
  {
    id: "practising",
    num: "02",
    name: "PRACTISING",
    subtitle: "Active Fluency",
    tag: "Scaffolded Work",
    description: "The learner is building accuracy, fluency and understanding through repeated structured tasks with scaffolded guidance.",
    criteria: ["Active repetition", "Scaffolded prompts", "Fluency building"],
    depthZ: 15,
    accentColor: "blue",
    statusType: "practising",
    evidenceSample: "6 attempts logged · 72% preliminary accuracy",
    nextAction: "Reinforce sub-step accuracy before removing scaffolds"
  },
  {
    id: "developing",
    num: "03",
    name: "CORRECTING",
    subtitle: "Misconception Repair",
    tag: "Active Learning in Progress",
    description: "Errors or misconceptions are being repaired. The learner receives immediate diagnostic feedback and actively executes corrective steps.",
    criteria: ["Error diagnosis", "Misconception repair", "Re-attempt verification"],
    depthZ: 25,
    accentColor: "amber",
    statusType: "developing",
    evidenceSample: "Sign error identified on inverse operations · Active repair",
    nextAction: "Targeted correction task + immediate re-attempt check"
  },
  {
    id: "secure",
    num: "04",
    name: "SECURE",
    subtitle: "Independent Performance",
    tag: "Standard Proficiency",
    description: "The learner performs accurately and independently without prompts or aids across standard benchmark assessments.",
    criteria: ["Independent execution", "Consistent accuracy", "No teacher prompts"],
    depthZ: 35,
    accentColor: "emerald",
    statusType: "secure",
    evidenceSample: "5/5 unassisted correct answers on standard items",
    nextAction: "Consolidate fluency and prepare for transfer challenges"
  },
  {
    id: "mastered",
    num: "05",
    name: "MASTERED",
    subtitle: "Deep Understanding",
    tag: "Transfer & Extension Ready",
    description: "The learner can understand, apply, explain and transfer the skill with confidence across novel problems and interdisciplinary contexts.",
    criteria: ["Deep conceptual understanding", "Skill transfer to novel contexts", "Can articulate & explain reasoning"],
    depthZ: 45,
    accentColor: "purple",
    statusType: "mastered",
    evidenceSample: "Multi-step non-routine problem solved + reasoning explained",
    nextAction: "Unlock advanced extension task & cross-topic application"
  }
];

export interface SkillNode {
  id: string;
  name: string;
  domain: string;
  status: "Mastered" | "Secure" | "Developing";
  statusColor: "emerald" | "sky" | "amber";
  nextActionText: string;
  nextActionCategory: "Progress" | "Extension" | "Correct + Practice";
  evidenceText: string;
  posX: number; // percentage in field
  posY: number;
}

const SKILL_NODES: SkillNode[] = [
  {
    id: "fractions",
    name: "Fractions",
    domain: "Number Operations",
    status: "Mastered",
    statusColor: "emerald",
    nextActionText: "Multi-Step Applications",
    nextActionCategory: "Progress",
    evidenceText: "Mastery demonstrated across mixed operations & real-world scaling",
    posX: 50,
    posY: 18,
  },
  {
    id: "decimals",
    name: "Decimals",
    domain: "Place Value & Models",
    status: "Secure",
    statusColor: "sky",
    nextActionText: "Decimal Division Extension",
    nextActionCategory: "Extension",
    evidenceText: "Consistent independent accuracy on 3-decimal place problems",
    posX: 82,
    posY: 45,
  },
  {
    id: "equations",
    name: "Equations",
    domain: "Algebraic Thinking",
    status: "Developing",
    statusColor: "amber",
    nextActionText: "Inverse Operations Repair",
    nextActionCategory: "Correct + Practice",
    evidenceText: "Sign inversion error diagnosed on two-step linear models",
    posX: 18,
    posY: 45,
  },
  {
    id: "ratios",
    name: "Ratios & Rates",
    domain: "Proportional Reasoning",
    status: "Secure",
    statusColor: "sky",
    nextActionText: "Compound Proportions",
    nextActionCategory: "Extension",
    evidenceText: "Verified unit rate conversion across non-standard ratios",
    posX: 32,
    posY: 80,
  },
  {
    id: "geometry",
    name: "Area & Perimeter",
    domain: "Measurement & Geometry",
    status: "Mastered",
    statusColor: "emerald",
    nextActionText: "Composite Figures",
    nextActionCategory: "Progress",
    evidenceText: "Full retention verified across complex multi-polygon layouts",
    posX: 68,
    posY: 80,
  }
];

export const EbmMasteryExperience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  // Active states
  const [activeStageIdx, setActiveStageIdx] = useState<number>(2); // Default to Developing/Correcting (stage 3)
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);
  
  // Mastery Field active skill
  const [selectedSkillId, setSelectedSkillId] = useState<string>("equations");
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Score vs Evidence comparison view state
  const [comparisonMode, setComparisonMode] = useState<"score" | "evidence">("evidence");

  // Active diagnostic dimension state
  const [activeDimension, setActiveDimension] = useState<number | null>(null);

  // Active stage helper
  const currentStage = hoveredStageIdx !== null ? MASTERY_STAGES[hoveredStageIdx] : MASTERY_STAGES[activeStageIdx];
  const selectedSkill = SKILL_NODES.find(s => s.id === selectedSkillId) || SKILL_NODES[2];

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ========================================================================= */}
      {/* 1. VISUAL TRANSITION LINE FROM HERO */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center -mt-8 sm:-mt-10 mb-4" aria-hidden="true">
        <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-[#00a3e0] via-[#00a3e0]/60 to-transparent relative">
          {!shouldReduceMotion && (
            <motion.div
              animate={{ y: [0, 48, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 -left-[2px] rounded-full bg-[#00a3e0] shadow-[0_0_8px_#00a3e0] absolute"
            />
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION INTRO: GO BEYOND SCORES */}
      {/* ========================================================================= */}
      <div className="text-center max-w-4xl mx-auto space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]"
        >
          <Brain className="w-3.5 h-3.5 text-[#764dbd]" />
          <span>Visible Learning Diagnostics</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3.5xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.08]"
        >
          Go Beyond Scores. <br className="hidden sm:inline" />
          <span className="text-[#00a3e0]">See the Learning Process.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Every answer becomes evidence. Every mistake becomes an opportunity. EBM Analytics helps you understand what learners know, where they are struggling, whether learning has been corrected, what has been mastered, and what should happen next.
        </motion.p>

        {/* Visual Editorial Anchor Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="pt-2"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200/80 px-5 py-2.5 rounded-2xl shadow-xs">
            <span className="text-xs font-black tracking-wider uppercase text-slate-500">
              A SCORE TELLS YOU WHERE.
            </span>
            <span className="hidden sm:inline text-sky-300 font-bold">•</span>
            <span className="text-xs font-black tracking-wider uppercase text-[#0076a5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              EBM ANALYTICS SHOWS YOU WHY AND WHAT TO DO NEXT.
            </span>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE "SCORE VS EVIDENCE" COMPARISON BAR */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4">
        <EbmSurface level="3" className="p-4 sm:p-6 overflow-hidden relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                EBM Core Distinction
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>A SCORE IS ONLY ONE SIGNAL.</span>
              </h3>
            </div>

            {/* Toggle Switch */}
            <div 
              role="radiogroup" 
              aria-label="Score versus Evidence comparison toggle"
              className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70"
            >
              <button
                type="button"
                role="radio"
                aria-checked={comparisonMode === "score"}
                onClick={() => setComparisonMode("score")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#00a3e0] focus-visible:outline-none ${
                  comparisonMode === "score"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Isolated Score (78%)
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={comparisonMode === "evidence"}
                onClick={() => setComparisonMode("evidence")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00a3e0] focus-visible:outline-none ${
                  comparisonMode === "evidence"
                    ? "bg-[#00a3e0] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>EBM Evidence Profile</span>
              </button>
            </div>
          </div>

          {/* Dynamic Comparison Card Output */}
          <AnimatePresence mode="wait">
            {comparisonMode === "score" ? (
              <motion.div
                key="score-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80"
              >
                <div className="sm:col-span-4 text-center sm:text-left flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-black text-slate-800">78%</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Single Score</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Unit Test Result</span>
                    <span className="text-[11px] text-slate-500 font-medium">Traditional grading signal</span>
                  </div>
                </div>
                <div className="sm:col-span-8 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-black uppercase text-[10px] text-amber-800 tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>The Pedagogical Gap</span>
                  </div>
                  <p className="text-slate-700 leading-snug">
                    A raw score cannot tell a teacher <em>why</em> 22% was lost: Was it a simple careless slip, a foundational misconception, or an unattempted question? What should the next lesson be?
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="evidence-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-left">
                  <span className="text-[9px] font-black uppercase tracking-wider text-sky-700 block">What Was Attempted</span>
                  <span className="text-xs font-black text-slate-900 block mt-1">100% of Core Tasks</span>
                  <span className="text-[9px] text-slate-500 mt-0.5 block">Zero skipped items</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-left">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 block">What Was Understood</span>
                  <span className="text-xs font-black text-slate-900 block mt-1">Fractions & Decimals</span>
                  <span className="text-[9px] text-slate-500 mt-0.5 block">Independent fluency secure</span>
                </div>
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-left">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block">Where It Broke Down</span>
                  <span className="text-xs font-black text-slate-900 block mt-1">Equation Signs (2-step)</span>
                  <span className="text-[9px] text-amber-800 mt-0.5 block font-medium">Specific misconception</span>
                </div>
                <div className="bg-gradient-to-r from-[#00a3e0] to-[#0076a5] text-white rounded-xl p-3 text-left shadow-xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-cyan-200 block">What Happens Next</span>
                  <span className="text-xs font-black text-white block mt-1">Targeted Error Repair</span>
                  <span className="text-[9px] text-cyan-100 mt-0.5 block">Automated prescription</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </EbmSurface>
      </div>

      {/* ========================================================================= */}
      {/* 4. THE 6 LEARNING PROCESS DIAGNOSTIC CARDS (WITH CARD 06 DOMINANT) */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Complete Diagnostic Trace
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              6 Dimensions of Visible Learning
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full hidden sm:inline-block">
            Evidence-Driven Framework
          </span>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 01 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 group-hover:text-[#00a3e0] transition-colors font-mono">01</span>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a3e0]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">What Was Attempted</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                See the questions, activities and learning tasks a learner has completed.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-200/60 mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Activity & Engagement Trace</span>
            </div>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors font-mono">02</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">What Was Understood</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Identify demonstrated understanding and independent performance.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-200/60 mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demonstrated Comprehension</span>
            </div>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-rose-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 group-hover:text-rose-500 transition-colors font-mono">03</span>
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Where Learning Broke Down</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Find recurring errors, misconceptions and learning barriers.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-200/60 mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Error Diagnostic & Gaps</span>
            </div>
          </motion.div>

          {/* Card 04 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 group-hover:text-[#764dbd] transition-colors font-mono">04</span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#764dbd]">
                  <Sparkle className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">What Was Corrected</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                See whether mistakes were simply marked or genuinely repaired.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-200/60 mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Metacognitive Repair & Feedback</span>
            </div>
          </motion.div>

          {/* Card 05 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 group-hover:text-indigo-600 transition-colors font-mono">05</span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">What Has Been Mastered</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Distinguish completed work from secure, independent mastery.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-200/60 mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Validated Retention & Fluency</span>
            </div>
          </motion.div>

          {/* Card 06 — VISUALLY DOMINANT */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#008fc7] via-[#0076a5] to-[#0b5171] text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-cyan-900/20 border-2 border-cyan-300/40 relative overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Background ambient accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-cyan-200 font-mono">06</span>
                <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Ultimate Purpose</span>
                </div>
              </div>
              
              <h4 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>What Happens Next</span>
                <ChevronRight className="w-5 h-5 text-cyan-200 shrink-0" />
              </h4>
              
              <p className="text-cyan-50/95 text-sm sm:text-base leading-relaxed font-medium">
                Turn evidence into the next teaching or learning action.
              </p>
            </div>

            <div className="pt-5 border-t border-white/20 mt-4 relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-200">Actionable Pedagogical Decisions</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MAIN EXPERIENCE: SPATIAL MASTERY PROGRESSION & INTELLIGENCE FIELD */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Experience Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>EBM Mastery Progression Engine</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Know What Has Truly Been Mastered
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl">
              EBM distinguishes between encountering a skill, practising it, correcting mistakes, performing independently and truly mastering it.
            </p>
          </div>

          <div className="shrink-0 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl text-left sm:text-right">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
              Core Principle
            </span>
            <span className="text-xs font-black text-[#0076a5]">
              SEE THE LEARNING, NOT JUST THE NUMBER.
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART A & B: 3D MASTERY PATHWAY + EBM MASTERY PROFILE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Pathway Column (~58% desktop) */}
          <div className="lg:col-span-7 space-y-6">
            
            <EbmSurface level="3" className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Spatial Mastery Matrix
                  </span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mt-0.5">
                    5 Connected Mastery States
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Interactive 3D Pathway
                  </span>
                </div>
              </div>

              {/* 3D Mastery Pathway Container */}
              <div 
                className="relative min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-2 ebm-preserve-3d"
                style={{ perspective: "1400px" }}
                aria-label="5-Stage 3D Mastery Progression Pathway: Introduced, Practising, Correcting, Secure, Mastered."
              >
                {/* SVG Connecting Spatial Pathway with Dynamic Traveling Particles */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 200"
                >
                  <defs>
                    <linearGradient id="masteryPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00a3e0" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="80%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#764dbd" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Connecting S-Curved Track */}
                  <path
                    d="M 50 100 C 130 60, 170 140, 250 100 C 330 60, 370 140, 450 100"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                    strokeDasharray="4 6"
                  />
                  <path
                    d="M 50 100 C 130 60, 170 140, 250 100 C 330 60, 370 140, 450 100"
                    fill="none"
                    stroke="url(#masteryPathGrad)"
                    strokeWidth="2"
                    opacity="0.8"
                  />

                  {/* Traveling Evidence Pulse along the curve */}
                  {!shouldReduceMotion && (
                    <circle r="4" fill="#00a3e0" className="shadow-sm">
                      <animateMotion
                        path="M 50 100 C 130 60, 170 140, 250 100 C 330 60, 370 140, 450 100"
                        dur="4.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </svg>

                {/* 5 Spatial Mastery Nodes positioned along the pathway */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full relative z-10">
                  {MASTERY_STAGES.map((stage, idx) => {
                    const isActive = activeStageIdx === idx;
                    const isHovered = hoveredStageIdx === idx;
                    const isDeveloping = stage.statusType === "developing";
                    const isMastered = stage.statusType === "mastered";

                    // Calculate subtle floating vertical offset for visual rhythm
                    const floatY = shouldReduceMotion ? 0 : Math.sin(idx * 1.2) * 6;

                    return (
                      <div
                        key={stage.id}
                        className="relative flex flex-col items-center"
                        style={{
                          transform: `translateZ(${isActive ? stage.depthZ + 20 : isHovered ? stage.depthZ + 12 : stage.depthZ}px) translateY(${floatY}px)`,
                          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredStageIdx(idx)}
                          onMouseLeave={() => setHoveredStageIdx(null)}
                          onFocus={() => setHoveredStageIdx(idx)}
                          onBlur={() => setHoveredStageIdx(null)}
                          onClick={() => {
                            setActiveStageIdx(idx);
                          }}
                          aria-label={`Mastery Stage ${stage.num}: ${stage.name}. ${stage.subtitle}. Click to explore diagnostic evidence.`}
                          className={`group w-full relative rounded-2xl p-2.5 sm:p-3.5 text-left flex flex-col justify-between h-28 sm:h-36 transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#00a3e0] focus:ring-offset-2 ${
                            isActive
                              ? isDeveloping
                                ? "bg-amber-900 text-white border-2 border-amber-400 shadow-[0_12px_28px_-6px_rgba(245,158,11,0.4)] scale-105"
                                : isMastered
                                ? "bg-slate-950 text-white border-2 border-purple-400 shadow-[0_16px_36px_-6px_rgba(118,77,189,0.4)] scale-108"
                                : "bg-slate-900 text-white border-2 border-cyan-400 shadow-[0_12px_28px_-6px_rgba(0,163,224,0.35)] scale-105"
                              : "bg-white/95 hover:bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md"
                          }`}
                        >
                          {/* Top Tag & Number */}
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`text-[9px] sm:text-[10px] font-black font-mono tracking-wider ${
                                isActive
                                  ? isDeveloping
                                    ? "text-amber-300"
                                    : isMastered
                                    ? "text-purple-300"
                                    : "text-cyan-300"
                                  : "text-slate-400"
                              }`}
                            >
                              {stage.num}
                            </span>

                            {/* Active pulse ring */}
                            {isActive && (
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isDeveloping
                                    ? "bg-amber-400 animate-pulse"
                                    : isMastered
                                    ? "bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]"
                                    : "bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]"
                                }`}
                              />
                            )}
                          </div>

                          {/* Center / Bottom Labels */}
                          <div className="space-y-0.5">
                            <span
                              className={`text-[9px] sm:text-[11px] font-black uppercase tracking-tight block leading-tight ${
                                isActive ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {stage.name}
                            </span>
                            <span
                              className={`text-[8px] sm:text-[9px] font-medium block truncate ${
                                isActive
                                  ? isDeveloping
                                    ? "text-amber-200"
                                    : isMastered
                                    ? "text-purple-200"
                                    : "text-slate-300"
                                  : "text-slate-500"
                              }`}
                            >
                              {stage.subtitle}
                            </span>
                          </div>

                          {/* Subtle Status Pill Indicator on Bottom */}
                          <div className="pt-1 border-t border-slate-100/30">
                            <span
                              className={`text-[7.5px] font-bold uppercase tracking-wider block truncate ${
                                isActive
                                  ? "text-white/80"
                                  : isDeveloping
                                  ? "text-amber-700"
                                  : isMastered
                                  ? "text-purple-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {isDeveloping ? "In Progress" : isMastered ? "Verified" : "Mapped"}
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Stage Deep-Dive Panel (Inline Expansion) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-2xl p-5 sm:p-6 space-y-4 border transition-all duration-300 ${
                    currentStage.statusType === "developing"
                      ? "bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-amber-200/90 shadow-sm"
                      : currentStage.statusType === "mastered"
                      ? "bg-gradient-to-br from-purple-50/90 via-white to-sky-50/40 border-purple-200/90 shadow-sm"
                      : "bg-gradient-to-br from-slate-50 via-white to-sky-50/40 border-sky-200/80 shadow-sm"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          currentStage.statusType === "developing"
                            ? "bg-amber-500"
                            : currentStage.statusType === "mastered"
                            ? "bg-purple-600"
                            : "bg-[#00a3e0]"
                        }`}
                      />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-800">
                        Stage {currentStage.num}: {currentStage.name} — {currentStage.tag}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-white/90 border border-slate-200 px-2 py-0.5 rounded-md">
                      EBM Criterion
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-3">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {currentStage.description}
                    </p>

                    {/* Criteria Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentStage.criteria.map((crit, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{crit}</span>
                        </span>
                      ))}
                    </div>

                    {/* Diagnostic Evidence & Next Action Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-white/90 border border-slate-200 rounded-xl p-3 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                          Demonstrated Evidence
                        </span>
                        <p className="text-xs font-bold text-slate-800">
                          {currentStage.evidenceSample}
                        </p>
                      </div>

                      <div
                        className={`rounded-xl p-3 space-y-1 border ${
                          currentStage.statusType === "developing"
                            ? "bg-amber-100/60 border-amber-300/80 text-amber-950"
                            : "bg-sky-100/60 border-sky-300/80 text-slate-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#0076a5] block">
                            Prescribed Next Action
                          </span>
                          <Activity className="w-3.5 h-3.5 text-[#00a3e0]" />
                        </div>
                        <p className="text-xs font-bold">
                          {currentStage.nextAction}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </EbmSurface>

          </div>

          {/* Part B: EBM MASTERY PROFILE & INTERACTIVE SKILL FIELD (~42% desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            <EbmSurface level="3" className="p-6 sm:p-7 space-y-5">
              
              {/* Profile Card Header */}
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Diagnostic Intelligence Plan
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mt-1">
                    EBM MASTERY PROFILE
                  </h4>
                </div>
                <div className="bg-sky-50 border border-sky-100 text-[#0076a5] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Live Field Map
                </div>
              </div>

              {/* Interactive Mastery Field (Central Core with orbiting skill nodes) */}
              <div 
                className="relative w-full aspect-16/10 bg-gradient-to-b from-slate-50/80 to-sky-50/40 rounded-2xl border border-slate-200/80 p-4 flex items-center justify-center overflow-hidden"
                aria-label="Interactive Mastery Field showing interconnected domain skills around the learner's active diagnostic state."
              >
                {/* SVG Connections radiating from center to skill nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {SKILL_NODES.map((node) => {
                    const isSelected = selectedSkillId === node.id;
                    return (
                      <g key={node.id}>
                        <line
                          x1="50"
                          y1="50"
                          x2={node.posX}
                          y2={node.posY}
                          stroke={isSelected ? "#00a3e0" : "#cbd5e1"}
                          strokeWidth={isSelected ? "1.75" : "1"}
                          strokeDasharray={isSelected ? "none" : "2 3"}
                          opacity={isSelected ? 1 : 0.6}
                          className="transition-all duration-300"
                        />
                        {isSelected && !shouldReduceMotion && (
                          <circle r="1.5" fill="#00a3e0">
                            <animateMotion
                              path={`M 50 50 L ${node.posX} ${node.posY}`}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Central Learner State Hub */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-white/95 backdrop-blur-md border-2 border-sky-200 shadow-[0_8px_24px_-6px_rgba(0,163,224,0.25)] flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#00a3e0]">
                    LEARNER
                  </span>
                  <span className="text-[11px] font-black text-slate-900 leading-tight">
                    MASTERY<br />PROFILE
                  </span>
                  <span className="text-[7.5px] font-bold text-slate-400 uppercase mt-0.5">
                    Multi-Skill
                  </span>
                </div>

                {/* Orbiting Interactive Skill Buttons */}
                {SKILL_NODES.map((node) => {
                  const isSelected = selectedSkillId === node.id;
                  const isDeveloping = node.status === "Developing";

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedSkillId(node.id)}
                      onMouseEnter={() => setHoveredSkillId(node.id)}
                      onMouseLeave={() => setHoveredSkillId(null)}
                      style={{
                        left: `${node.posX}%`,
                        top: `${node.posY}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`absolute z-20 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#00a3e0] ${
                        isSelected
                          ? isDeveloping
                            ? "bg-amber-500 text-white shadow-md scale-110 border border-amber-300 ring-2 ring-amber-400/40"
                            : "bg-[#00a3e0] text-white shadow-md scale-110 border border-cyan-200 ring-2 ring-[#00a3e0]/40"
                          : isDeveloping
                          ? "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-2xs hover:scale-105"
                      }`}
                      aria-label={`${node.name}: ${node.status}. Click to view evidence.`}
                    >
                      <span className="flex items-center gap-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            node.status === "Mastered"
                              ? "bg-emerald-400"
                              : node.status === "Secure"
                              ? "bg-sky-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span>{node.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Skill Intelligence Breakdown */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                      {selectedSkill.domain}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{selectedSkill.name}</h4>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      selectedSkill.status === "Mastered"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : selectedSkill.status === "Secure"
                        ? "bg-sky-100 text-sky-800 border border-sky-200"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}
                  >
                    {selectedSkill.status}
                  </span>
                </div>

                {/* Evidence statement */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {selectedSkill.evidenceText}
                </p>

                {/* Next Action Pill */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Next Pedagogical Action:
                  </span>
                  <span
                    className={`inline-flex items-center space-x-1 font-bold text-[11px] px-2.5 py-1 rounded-lg ${
                      selectedSkill.status === "Developing"
                        ? "text-amber-900 bg-amber-100/80 border border-amber-200"
                        : "text-[#0076a5] bg-sky-50 border border-sky-200"
                    }`}
                  >
                    <span>{selectedSkill.nextActionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Structured Status Hierarchy Summary */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2">
                  <span className="font-bold text-emerald-700 block">2 SECURE</span>
                  <span className="text-[8px] text-slate-400 uppercase">Independent</span>
                </div>
                <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2">
                  <span className="font-bold text-amber-800 block">1 DEVELOPING</span>
                  <span className="text-[8px] text-slate-400 uppercase">Repair Cue</span>
                </div>
                <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-2">
                  <span className="font-bold text-purple-800 block">2 MASTERED</span>
                  <span className="text-[8px] text-slate-400 uppercase">Transfer Ready</span>
                </div>
              </div>

            </EbmSurface>

          </div>

        </div>

      </div>

    </div>
  );
};
