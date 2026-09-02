import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  UserCheck, 
  ArrowUpRight, 
  Filter, 
  Layers, 
  ChevronRight,
  Info,
  Maximize2,
  Activity,
  Zap,
  Target
} from "lucide-react";

export interface LearnerNode {
  id: string;
  code: string;
  name?: string;
  groupId: "A" | "B" | "C" | "D";
  currentNeed: string;
  currentEvidence: string;
  nextSupport: string;
  topic: string;
  accuracy: string;
  x: number; // coordinate percentage (0-100)
  y: number; // coordinate percentage (0-100)
  z: number; // depth offset in px
}

const INITIAL_LEARNERS: LearnerNode[] = [
  // Group A - Ready to Progress (Blue / Emerald focus)
  { id: "L01", code: "A1", name: "Lucas M.", groupId: "A", topic: "Fractions & Decimals", accuracy: "94%", currentNeed: "Readiness for extension & multi-step problems", currentEvidence: "Consistent independent accuracy on non-routine questions", nextSupport: "Higher-order algebraic application & proof tasks", x: 18, y: 24, z: 20 },
  { id: "L02", code: "A2", name: "Sophie C.", groupId: "A", topic: "Fractions & Decimals", accuracy: "92%", currentNeed: "Readiness for extension", currentEvidence: "Completed complex multi-tier operations without prompting", nextSupport: "Accelerated extension challenge set", x: 26, y: 32, z: 10 },
  { id: "L03", code: "A3", name: "Tariq K.", groupId: "A", topic: "Fractions & Decimals", accuracy: "90%", currentNeed: "Application transfer to novel contexts", currentEvidence: "Explains reasoning clearly in written reflection", nextSupport: "Cross-topic synthesis projects", x: 14, y: 40, z: 15 },
  { id: "L04", code: "A4", name: "Elena R.", groupId: "A", topic: "Linear Relations", accuracy: "95%", currentNeed: "Readiness for extension", currentEvidence: "Zero execution mistakes across 12 consecutive items", nextSupport: "Advanced linear inequality modeling", x: 24, y: 16, z: 25 },

  // Group B - Needs More Practice (Cyan / Indigo focus)
  { id: "L05", code: "B1", name: "Noah W.", groupId: "B", topic: "Linear Equations", accuracy: "78%", currentNeed: "Fluency requirement", currentEvidence: "Concept understood but speed and precision fluctuate", nextSupport: "Targeted fluency drills with instant feedback", x: 42, y: 28, z: 12 },
  { id: "L06", code: "B2", name: "Amira Z.", groupId: "B", topic: "Linear Equations", accuracy: "76%", currentNeed: "Execution consistency", currentEvidence: "Solves standard forms accurately; slows on multi-step forms", nextSupport: "Structured scaffolded problem sets", x: 50, y: 20, z: 18 },
  { id: "L07", code: "B3", name: "Liam P.", groupId: "B", topic: "Decimal Operations", accuracy: "74%", currentNeed: "Fluency & arithmetic precision", currentEvidence: "Method secure, occasional calculation slip on final step", nextSupport: "Targeted practice and step-by-step verification", x: 44, y: 42, z: 8 },
  { id: "L08", code: "B4", name: "Zoe T.", groupId: "B", topic: "Fractions Addition", accuracy: "80%", currentNeed: "Fluency requirement", currentEvidence: "Correct common denominator choice, needs fluency practice", nextSupport: "Timed fluency check & self-monitoring check", x: 52, y: 36, z: 22 },

  // Group C - Needs Reteaching (Amber focus)
  { id: "L09", code: "C1", name: "Hassan S.", groupId: "C", topic: "Equations with Negatives", accuracy: "58%", currentNeed: "Concept misconception on sign rules", currentEvidence: "Consistently drops negative sign when dividing both sides", nextSupport: "Teacher re-explains with visual number line model", x: 70, y: 26, z: 16 },
  { id: "L10", code: "C2", name: "Chloe V.", groupId: "C", topic: "Two-Step Equations", accuracy: "62%", currentNeed: "Reasoning difficulty / inverse operations", currentEvidence: "Performs addition before isolating variable term", nextSupport: "Model balance method with concrete visual representations", x: 78, y: 34, z: 24 },
  { id: "L11", code: "C3", name: "Devon K.", groupId: "C", topic: "Fraction Multiplication", accuracy: "55%", currentNeed: "Missing prerequisite on cross-cancellation", currentEvidence: "Multiplies large numerators without simplifying first", nextSupport: "Prerequisite refresher on factors and multiples", x: 68, y: 46, z: 10 },
  { id: "L12", code: "C4", name: "Priya M.", groupId: "C", topic: "Equation Word Problems", accuracy: "60%", currentNeed: "Application difficulty (translating language)", currentEvidence: "Struggles to identify unknown variable from word prompt", nextSupport: "Guided syntax parsing & keyword mapping guide", x: 82, y: 20, z: 14 },

  // Group D - Needs Individual Intervention (Supportive Warm / Indigo-Rose)
  { id: "L13", code: "D1", name: "Ali H.", groupId: "D", topic: "Multi-Step Equations", accuracy: "48%", currentNeed: "Correction requirement / persistent execution barrier", currentEvidence: "Difficulty remains after initial guided correction; errors in inverse steps", nextSupport: "1:1 diagnostic conference and step-by-step diagnostic modeling", x: 60, y: 68, z: 28 },
  { id: "L14", code: "D2", name: "Maya J.", groupId: "D", topic: "Equations with Fractions", accuracy: "44%", currentNeed: "Multiple layered misconceptions", currentEvidence: "Confusion between clearing fractions and distributing terms", nextSupport: "1:1 tactile algebraic tile demonstration & re-check", x: 48, y: 74, z: 20 },
  { id: "L15", code: "D3", name: "Ethan B.", groupId: "D", topic: "Algebraic Reasoning", accuracy: "50%", currentNeed: "Missing prerequisite & reasoning gap", currentEvidence: "Struggles with equality preservation across equal sign", nextSupport: "1:1 targeted intervention on equation balance concept", x: 68, y: 76, z: 16 },
  { id: "L16", code: "D4", name: "Nia S.", groupId: "D", topic: "Linear Functions", accuracy: "46%", currentNeed: "Correction requirement", currentEvidence: "Recurring error pattern across 5 consecutive diagnostic items", nextSupport: "Individualized error-repair sequence & recorded reflection", x: 38, y: 70, z: 22 },
];

export interface EbmLearningGroupsProps {
  onSelectLearnerForIntervention?: (learner: LearnerNode) => void;
}

export const EbmLearningGroups: React.FC<EbmLearningGroupsProps> = ({
  onSelectLearnerForIntervention
}) => {
  const [activeGroup, setActiveGroup] = useState<"ALL" | "A" | "B" | "C" | "D">("ALL");
  const [hoveredGroup, setHoveredGroup] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<LearnerNode | null>(null);
  const [isEvidenceChanged, setIsEvidenceChanged] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  // Group meta configurations
  const GROUPS_CONFIG = {
    A: {
      id: "A",
      code: "GROUP A",
      name: "Ready to Progress",
      color: "emerald",
      badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
      accentBg: "bg-emerald-600",
      lightBorder: "hover:border-emerald-400",
      activeBorder: "border-emerald-500 ring-2 ring-emerald-500/20",
      clusterBg: "bg-emerald-50/40 border-emerald-200/60",
      icon: ArrowUpRight,
      learningNeed: "Secure understanding and independent performance across target standards.",
      teacherResponse: "Move forward to next unit or provide higher-order extension & transfer tasks.",
      pedagogicalFocus: "Extension & Challenge"
    },
    B: {
      id: "B",
      code: "GROUP B",
      name: "Needs More Practice",
      color: "sky",
      badgeBg: "bg-[#00a3e0]/10 text-[#0076a5] border-[#00a3e0]/25",
      accentBg: "bg-[#00a3e0]",
      lightBorder: "hover:border-sky-400",
      activeBorder: "border-[#00a3e0] ring-2 ring-sky-500/20",
      clusterBg: "bg-sky-50/40 border-sky-200/60",
      icon: RefreshCw,
      learningNeed: "Concept is understood conceptually, but fluency and execution consistency are not yet secure.",
      teacherResponse: "Targeted practice, fluency reinforcement, and structured scaffolded feedback.",
      pedagogicalFocus: "Fluency & Precision"
    },
    C: {
      id: "C",
      code: "GROUP C",
      name: "Needs Reteaching",
      color: "amber",
      badgeBg: "bg-amber-500/10 text-amber-800 border-amber-500/25",
      accentBg: "bg-amber-500",
      lightBorder: "hover:border-amber-400",
      activeBorder: "border-amber-500 ring-2 ring-amber-500/20",
      clusterBg: "bg-amber-50/40 border-amber-200/60",
      icon: Compass,
      learningNeed: "A specific concept misconception, missing prerequisite, or reasoning barrier is evident.",
      teacherResponse: "Re-explain, model alternative representations, and check understanding before reattempt.",
      pedagogicalFocus: "Re-teaching & Modeling"
    },
    D: {
      id: "D",
      code: "GROUP D",
      name: "Needs Individual Intervention",
      color: "purple",
      badgeBg: "bg-[#764dbd]/10 text-[#764dbd] border-[#764dbd]/25",
      accentBg: "bg-[#764dbd]",
      lightBorder: "hover:border-purple-400",
      activeBorder: "border-[#764dbd] ring-2 ring-purple-500/20",
      clusterBg: "bg-purple-50/40 border-purple-200/60",
      icon: UserCheck,
      learningNeed: "Difficulty remains after guided correction. Requires diagnosis of root obstacle.",
      teacherResponse: "1:1 diagnostic inquiry, targeted scaffolding, and structured re-check verification.",
      pedagogicalFocus: "1:1 Precision Support"
    }
  };

  // Dynamic coordinates when "Evidence Changes" is active (Demonstrating flexible groupings)
  const getLearnerPosition = (learner: LearnerNode) => {
    if (!isEvidenceChanged) {
      return { x: learner.x, y: learner.y, z: learner.z, currentGroup: learner.groupId };
    }
    // Shift some learners to show flexible progression
    if (learner.id === "L07") {
      // Liam P (B3) progressed to Group A
      return { x: 30, y: 22, z: 22, currentGroup: "A" as const };
    }
    if (learner.id === "L10") {
      // Chloe V (C2) corrected & moved to Group B
      return { x: 46, y: 30, z: 15, currentGroup: "B" as const };
    }
    if (learner.id === "L13") {
      // Ali H (D1) after 1:1 intervention moved to Group B for practice
      return { x: 54, y: 44, z: 18, currentGroup: "B" as const };
    }
    return { x: learner.x, y: learner.y, z: learner.z, currentGroup: learner.groupId };
  };

  const handleSelectLearner = (learner: LearnerNode) => {
    setSelectedLearner(learner);
  };

  const handleLaunchIntervention = (learner: LearnerNode) => {
    if (onSelectLearnerForIntervention) {
      onSelectLearnerForIntervention(learner);
    }
    // Smooth scroll down to 1:1 Intervention Workspace
    const el = document.getElementById("analytics-1on1-intervention");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="ebm-learning-groups-root" className="space-y-10">
      
      {/* Header Banner & Pedagogical Framing */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]">
          <Users className="w-3.5 h-3.5 text-[#764dbd]" />
          <span>EBM Learning Need Diagnostics</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          Group Learners by Need, Not Just by Score
        </h2>

        <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-medium max-w-2xl mx-auto">
          EBM Analytics helps teachers answer the central instructional question: <strong className="text-slate-900 font-black">"Who needs the same kind of support?"</strong> Groups are created around specific learning obstacles—and remain flexible as evidence changes.
        </p>

        {/* Core Pedagogical Rules Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
            ✨ No Static Rankings or Leaderboards
          </span>
          <span className="text-xs font-bold text-[#0076a5] bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
            🎯 Grouped by Cognitive Obstacle
          </span>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
            🔄 Fluid Transition as Mastery Evolves
          </span>
        </div>
      </div>

      {/* Control Bar: Flexible Grouping Toggle + Group Selectors */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Group Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter:</span>
          </span>

          <button
            type="button"
            onClick={() => setActiveGroup("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeGroup === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Classes (16 Nodes)
          </button>

          {(["A", "B", "C", "D"] as const).map((gId) => {
            const conf = GROUPS_CONFIG[gId];
            const isActive = activeGroup === gId;
            return (
              <button
                key={gId}
                type="button"
                onClick={() => setActiveGroup(isActive ? "ALL" : gId)}
                onMouseEnter={() => setHoveredGroup(gId)}
                onMouseLeave={() => setHoveredGroup(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer border ${
                  isActive
                    ? `${conf.activeBorder} ${conf.badgeBg} shadow-xs`
                    : `border-slate-200 bg-white text-slate-700 hover:bg-slate-50`
                }`}
              >
                <span className="font-mono text-[11px] font-black">{gId}</span>
                <span className="hidden sm:inline">{conf.name}</span>
              </button>
            );
          })}
        </div>

        {/* Demonstration Action: "EVIDENCE CHANGES" Animation trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIs3DMode(!is3DMode)}
            className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              is3DMode 
                ? "bg-purple-50 text-[#764dbd] border-purple-200" 
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Spatial Depth: {is3DMode ? "ON" : "OFF"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEvidenceChanged(!isEvidenceChanged)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-md ${
              isEvidenceChanged
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20"
                : "bg-gradient-to-r from-[#0076a5] to-[#764dbd] text-white shadow-blue-500/20 hover:opacity-95"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEvidenceChanged ? "rotate-180" : ""} transition-transform duration-500`} />
            <span>{isEvidenceChanged ? "RESET DEMONSTRATION" : "DEMO: EVIDENCE CHANGES"}</span>
          </button>
        </div>
      </div>

      {isEvidenceChanged && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-3.5 text-xs font-medium flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Flexible Grouping Demonstrated:</strong> Notice learner nodes <strong>B3</strong>, <strong>C2</strong>, and <strong>D1</strong> smoothly transitioning as formative correction and diagnostic intervention provide fresh evidence of mastery!
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 shrink-0 ml-2">
            Dynamic EBM Flow
          </span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 3D INTERACTIVE LEARNING NEED MAP (WORKSPACE)                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Columns: The 3D Cluster Canvas with 16 Learner Nodes */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 text-white relative overflow-hidden min-h-[520px] flex flex-col justify-between">
          
          {/* Subtle Canvas Backdrop Grid & Ambient Glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
          <div className="absolute top-10 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Canvas Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
                Live Classroom Learning Need Map
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-3">
              <span>Hover node for diagnostic evidence</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline font-mono text-cyan-200">16 Active Nodes</span>
            </div>
          </div>

          {/* Spatial Node Field Area */}
          <div 
            className="relative z-10 w-full h-[380px] my-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 overflow-hidden"
            style={{
              perspective: is3DMode ? "1000px" : "none"
            }}
          >
            {/* 4 Quadrant Background Regions with Subtle Spatial Labels */}
            <div className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider text-emerald-400/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Ready to Progress</span>
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider text-amber-400/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Needs Reteaching</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 text-[10px] font-black uppercase tracking-wider text-sky-400/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0]" />
              <span>Needs More Practice</span>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-purple-400/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#764dbd]" />
              <span>Needs Individual Intervention</span>
            </div>

            {/* Connecting Subtle Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line x1="20%" y1="30%" x2="50%" y2="30%" stroke="#00a3e0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="30%" x2="75%" y2="30%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="30%" x2="55%" y2="70%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* 16 Interactive Learner Nodes */}
            {INITIAL_LEARNERS.map((learner) => {
              const pos = getLearnerPosition(learner);
              const groupConf = GROUPS_CONFIG[pos.currentGroup];
              const isFiltered = activeGroup !== "ALL" && activeGroup !== pos.currentGroup;
              const isGroupHovered = hoveredGroup !== null && hoveredGroup !== pos.currentGroup;
              const isSelected = selectedLearner?.id === learner.id;

              return (
                <motion.div
                  key={learner.id}
                  layout
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: is3DMode 
                      ? `translate(-50%, -50%) translateZ(${pos.z}px)` 
                      : `translate(-50%, -50%)`,
                    zIndex: isSelected ? 40 : Math.round(pos.z)
                  }}
                  className={`transition-opacity duration-300 ${
                    isFiltered || isGroupHovered ? "opacity-20 scale-90" : "opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectLearner(learner)}
                    onMouseEnter={() => setSelectedLearner(learner)}
                    className={`group relative flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${
                      isSelected ? "scale-125" : "hover:scale-115"
                    }`}
                  >
                    {/* Pulsing ring on selection */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping" />
                    )}

                    {/* Node Core Bubble */}
                    <div 
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-xs shadow-lg backdrop-blur-md border transition-all ${
                        pos.currentGroup === "A"
                          ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-emerald-900/50"
                          : pos.currentGroup === "B"
                          ? "bg-sky-950/80 border-sky-400 text-sky-200 shadow-sky-900/50"
                          : pos.currentGroup === "C"
                          ? "bg-amber-950/80 border-amber-400 text-amber-200 shadow-amber-900/50"
                          : "bg-purple-950/80 border-purple-400 text-purple-200 shadow-purple-900/50"
                      } ${isSelected ? "ring-2 ring-white" : ""}`}
                    >
                      <span className="text-[11px] font-black">{learner.code}</span>
                      <span className="text-[7px] opacity-70 uppercase font-sans font-bold">
                        {learner.name?.split(" ")[0]}
                      </span>
                    </div>

                    {/* Mini Accuracy Indicator Pill */}
                    <span 
                      className={`absolute -bottom-1.5 -right-1 text-[8px] font-mono font-bold px-1 rounded-full border ${
                        pos.currentGroup === "A"
                          ? "bg-emerald-900 border-emerald-500 text-emerald-200"
                          : pos.currentGroup === "B"
                          ? "bg-sky-900 border-sky-500 text-sky-200"
                          : pos.currentGroup === "C"
                          ? "bg-amber-900 border-amber-500 text-amber-200"
                          : "bg-purple-900 border-purple-500 text-purple-200"
                      }`}
                    >
                      {learner.accuracy}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Canvas Bottom Legend Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-300 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-500 inline-block" />
                Group A (Progress)
              </span>
              <span className="flex items-center gap-1.5 text-sky-300 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-md bg-[#00a3e0] inline-block" />
                Group B (Practice)
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-md bg-amber-500 inline-block" />
                Group C (Reteach)
              </span>
              <span className="flex items-center gap-1.5 text-purple-300 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-md bg-[#764dbd] inline-block" />
                Group D (1:1 Intervention)
              </span>
            </div>

            <span className="text-[10px] text-slate-400 font-mono">
              Click any node to zoom into 1:1 Diagnostic Record
            </span>
          </div>

        </div>

        {/* Right 4 Columns: Dynamic Node Diagnostic Inspector / Group Focus */}
        <div className="lg:col-span-4 space-y-4">
          
          {selectedLearner ? (
            <motion.div
              key={selectedLearner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl space-y-5"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center space-x-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-black text-sm text-white ${
                    selectedLearner.groupId === "A"
                      ? "bg-emerald-600"
                      : selectedLearner.groupId === "B"
                      ? "bg-[#00a3e0]"
                      : selectedLearner.groupId === "C"
                      ? "bg-amber-600"
                      : "bg-[#764dbd]"
                  }`}>
                    {selectedLearner.code}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      Learner Diagnostic Node
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {selectedLearner.name}
                    </h3>
                  </div>
                </div>

                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  GROUPS_CONFIG[selectedLearner.groupId].badgeBg
                }`}>
                  {GROUPS_CONFIG[selectedLearner.groupId].code}
                </span>
              </div>

              {/* Learning Need Block */}
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Identified Learning Need
                </span>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {selectedLearner.currentNeed}
                </p>
                <p className="text-[11px] text-slate-500 font-medium pt-1">
                  Topic: <strong className="text-slate-700">{selectedLearner.topic}</strong>
                </p>
              </div>

              {/* Current Evidence Block */}
              <div className="space-y-1 bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0076a5] block">
                  Current Diagnostic Evidence
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {selectedLearner.currentEvidence}
                </p>
              </div>

              {/* Next Pedagogical Support Block */}
              <div className="space-y-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3.5 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
                    Recommended Teacher Support
                  </span>
                  <Zap className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedLearner.nextSupport}
                </p>
              </div>

              {/* Action Button: Connect to 1:1 Intervention Workspace */}
              <button
                type="button"
                onClick={() => handleLaunchIntervention(selectedLearner)}
                className="w-full py-3 px-4 rounded-xl bg-[#0076a5] hover:bg-[#006087] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>OPEN 1:1 LEARNING RECORD FOR {selectedLearner.name?.toUpperCase()}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm text-center space-y-4 py-12">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#764dbd] flex items-center justify-center mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Select Any Learner Node</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  Click or hover any student node in the 3D map to inspect their current obstacle, verified evidence trace, and targeted support prescription.
                </p>
              </div>
            </div>
          )}

          {/* Quick Group Breakdown Summary Cards */}
          <div className="grid grid-cols-2 gap-2.5" role="tablist" aria-label="Learning group selection">
            {(["A", "B", "C", "D"] as const).map((gKey) => {
              const conf = GROUPS_CONFIG[gKey];
              const isActive = activeGroup === gKey;
              return (
                <button
                  key={gKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveGroup(gKey)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#00a3e0] focus-visible:outline-none ${
                    isActive ? "bg-white border-slate-900 shadow-md" : "bg-slate-50 hover:bg-white border-slate-200/80"
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${conf.badgeBg}`}>
                    {conf.code}
                  </span>
                  <h4 className="text-xs font-black text-slate-900 mt-1.5 leading-tight">{conf.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{conf.pedagogicalFocus}</p>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Group Cards Detailed Grid (4 Connected Group Architecture) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {(["A", "B", "C", "D"] as const).map((gId) => {
          const group = GROUPS_CONFIG[gId];
          const IconComp = group.icon;
          const isCurrentActive = activeGroup === gId;

          return (
            <div
              key={gId}
              onMouseEnter={() => setHoveredGroup(gId)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between bg-white ${
                isCurrentActive
                  ? `${group.activeBorder} shadow-lg`
                  : `border-slate-200/90 ${group.lightBorder} hover:shadow-md`
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md font-mono border ${group.badgeBg}`}>
                    {group.code}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${group.badgeBg}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {group.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    {group.learningNeed}
                  </p>
                </div>
              </div>

              <div className={`pt-3.5 border-t border-slate-100 mt-4 space-y-1 rounded-xl p-3 ${group.clusterBg}`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 block">
                  Teacher Response
                </span>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {group.teacherResponse}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
