import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  XCircle, 
  CheckCircle2, 
  TrendingUp, 
  Brain,
  Zap,
  Gauge,
  SlidersHorizontal,
  LineChart,
  Cpu,
  Timer,
  Check,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COMPARISON_ITEMS, HOMEPAGE_STATS } from "./why-ebm.constants";

// Map item IDs to beautiful metadata for rich visual cards
const CARD_METADATA: Record<string, {
  icon: React.ComponentType<any>;
  category: "focus" | "tech";
  traditionalPercentage: number;
  ebmPercentage: number;
  traditionalIndexLabel: string;
  ebmIndexLabel: string;
  accentColor: string;
}> = {
  "c-1": {
    icon: Brain,
    category: "focus",
    traditionalPercentage: 25,
    ebmPercentage: 96,
    traditionalIndexLabel: "Rote Memory Focus",
    ebmIndexLabel: "Logical & Derivation Mastery",
    accentColor: "from-amber-400 via-yellow-500 to-amber-600"
  },
  "c-2": {
    icon: Zap,
    category: "focus",
    traditionalPercentage: 30,
    ebmPercentage: 98,
    traditionalIndexLabel: "Fixed Calendar Speed",
    ebmIndexLabel: "3-Year Completion Velocity",
    accentColor: "from-blue-400 via-indigo-500 to-purple-600"
  },
  "c-3": {
    icon: Gauge,
    category: "tech",
    traditionalPercentage: 15,
    ebmPercentage: 97,
    traditionalIndexLabel: "Terminal Stress Exams",
    ebmIndexLabel: "Immediate Diagnostic Step Corrections",
    accentColor: "from-teal-400 via-emerald-500 to-green-600"
  },
  "c-4": {
    icon: SlidersHorizontal,
    category: "focus",
    traditionalPercentage: 20,
    ebmPercentage: 94,
    traditionalIndexLabel: "Rigid Class Flow",
    ebmIndexLabel: "Adaptive Micro-Remediation",
    accentColor: "from-purple-400 via-pink-500 to-rose-600"
  },
  "c-5": {
    icon: LineChart,
    category: "tech",
    traditionalPercentage: 10,
    ebmPercentage: 95,
    traditionalIndexLabel: "Delayed Paper Cards",
    ebmIndexLabel: "Live Performance Dashboard",
    accentColor: "from-rose-400 via-red-500 to-orange-600"
  },
  "c-6": {
    icon: Cpu,
    category: "tech",
    traditionalPercentage: 22,
    ebmPercentage: 96,
    traditionalIndexLabel: "Passive Videos & Slides",
    ebmIndexLabel: "Socratic AI Active Dialogue",
    accentColor: "from-cyan-400 via-blue-500 to-indigo-600"
  },
  "c-7": {
    icon: Timer,
    category: "tech",
    traditionalPercentage: 35,
    ebmPercentage: 99,
    traditionalIndexLabel: "Term Finals",
    ebmIndexLabel: "Continuous Micro-Transcripts",
    accentColor: "from-amber-400 via-[#dfb76c] to-[#b7791f]"
  }
};

export const WhyEBMSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "focus" | "tech">("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Enriched items for layout binding
  const enrichedItems = COMPARISON_ITEMS.map((item) => {
    const meta = CARD_METADATA[item.id] || {
      icon: Brain,
      category: "focus",
      traditionalPercentage: 30,
      ebmPercentage: 90,
      traditionalIndexLabel: "Standard Mode",
      ebmIndexLabel: "Optimized Mode",
      accentColor: "from-blue-400 to-indigo-600"
    };
    return {
      ...item,
      ...meta
    };
  });

  // Filter items based on active sub tab
  const filteredItems = enrichedItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section id="why-choose-ebm" className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-slate-850/80 transition-colors duration-300">
      
      {/* SaaS Background grids and ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.06] dark:opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none animate-[pulse_8s_infinite]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs font-semibold text-blue-700 dark:text-blue-400 font-sans tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Unmatched Educational Standards
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-tight">
            Why Thousands of Students <br className="hidden sm:inline" /> Choose EBM Over Schooling
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-650 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto font-medium">
            Traditional systems rely on rote repetition and uniform paces. The Ejaz Bukhari Method introduces responsive Socratic AI tutors, 3-year complete curriculum acceleration, and continuous diagnostics.
          </p>
        </div>

        {/* ================== REDESIGNED FILTER TABS ================== */}
        <div className="flex justify-center">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-inner max-w-lg w-full">
            {(["all", "focus", "tech"] as const).map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`relative flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer ${
                    isActive ? "text-[#03050a] dark:text-slate-950" : "text-slate-500 hover:text-slate-950 dark:text-slate-450 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-[#dfb76c] to-[#b7791f] shadow-md rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5 font-bold">
                    {tab === "all" && "All Dimensions"}
                    {tab === "focus" && "Focus & Velocity"}
                    {tab === "tech" && "AI & Technology"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================== REDESIGNED CARDS GRID ================== */}
        <div className="relative min-h-[500px]">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                const isHovered = hoveredCardId === item.id;
                
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -20 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredCardId(item.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-[28px] border bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group select-none ${
                      isHovered
                        ? "border-[#dfb76c]/40 dark:border-[#dfb76c]/40 -translate-y-1.5"
                        : "border-slate-150 dark:border-slate-800"
                    }`}
                  >
                    {/* Hover gold/blue shine effect */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-tr ${item.accentColor} opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-500`} 
                    />
                    
                    {/* Top Segment: Dimension Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        {/* Custom visual index bubble */}
                        <span className="text-[10px] font-black font-mono tracking-widest text-[#dfb76c] bg-[#dfb76c]/10 dark:bg-[#dfb76c]/15 border border-[#dfb76c]/25 px-3 py-1 rounded-full uppercase">
                          DIMENSION 0{index + 1}
                        </span>
                        
                        {/* Dimension Icon */}
                        <div 
                          className={isHovered ? `p-2.5 rounded-2xl text-white shadow-lg bg-gradient-to-tr ${item.accentColor} transition-all duration-300` : `p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-750 dark:text-slate-300 transition-all duration-300`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase font-sans">
                        {item.featureName}
                      </h3>
                    </div>

                    {/* Middle Segment: Dual Comparative Blocks */}
                    <div className="space-y-4 my-5">
                      
                      {/* Traditional block */}
                      <div className="p-4 rounded-2xl border border-rose-100/70 bg-rose-50/20 dark:border-red-950/40 dark:bg-red-950/10 space-y-2 relative">
                        <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wider">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Traditional Classrooms</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                          {item.traditionalValue}
                        </p>
                        <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 pt-1.5 border-t border-rose-200/20 dark:border-red-900/10">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-rose-400" /> {item.traditionalIndexLabel}
                          </span>
                          <span className="text-rose-600 dark:text-rose-400 font-black">{item.traditionalPercentage}% Effective</span>
                        </div>
                      </div>

                      {/* EBM block */}
                      <div className="p-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/15 dark:border-emerald-950/40 dark:bg-emerald-950/10 space-y-2 relative overflow-hidden transition-all duration-300">
                        {/* Gold background tint on card hover */}
                        <div className="absolute inset-0 bg-[#dfb76c]/[0.02] dark:bg-[#dfb76c]/[0.03] pointer-events-none" />
                        
                        <div className="relative space-y-2">
                          <div className="flex items-center gap-1.5 text-[#dfb76c] font-black text-[10px] uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb76c]" />
                            <span>The EBM Protocol</span>
                          </div>
                          <p className="text-xs text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {item.ebmValue}
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-bold text-[#dfb76c] pt-1.5 border-t border-emerald-200/20 dark:border-emerald-900/10">
                            <span className="flex items-center gap-1 font-extrabold uppercase">
                              <Check className="w-3 h-3" /> {item.ebmIndexLabel}
                            </span>
                            <span className="font-black text-[#dfb76c]">{item.ebmPercentage}% Mastery</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Segment: Efficiency Progress Bars */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <span>Traditional ({item.traditionalPercentage}%)</span>
                        <span className="text-[#dfb76c]">EBM ({item.ebmPercentage}%)</span>
                      </div>
                      
                      {/* Interactive Dual Track Bar */}
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden flex">
                        {/* Traditional Share */}
                        <div 
                          className="h-full bg-rose-400 dark:bg-rose-500/80" 
                          style={{ width: `${item.traditionalPercentage}%` }}
                        />
                        {/* Gap space / Mid range */}
                        <div 
                          className="h-full bg-slate-200 dark:bg-slate-700/50" 
                          style={{ width: `${item.ebmPercentage - item.traditionalPercentage}%` }}
                        >
                          {/* Animate load effect on EBM */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${item.accentColor}`}
                          />
                        </div>
                        {/* Untapped / Remaining */}
                        <div 
                          className="h-full bg-slate-100 dark:bg-slate-850" 
                          style={{ width: `${100 - item.ebmPercentage}%` }}
                        />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dynamic success statistics row */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Academic Ledger</span>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">Socratic Learning Volume & Diagnostics</h4>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {HOMEPAGE_STATS.map((stat) => {
              return (
                <div
                  key={stat.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-between shadow-xs hover:border-blue-100 dark:hover:border-blue-900/50 hover:shadow-sm transition-all"
                >
                  <div className="text-blue-500 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/40 p-2 rounded-xl mb-3">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                      {stat.value}
                      <span className="text-blue-600 dark:text-blue-400 text-base font-extrabold">{stat.suffix}</span>
                    </div>
                    
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 font-sans leading-tight uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-500 dark:text-slate-450 mt-3 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyEBMSection;
