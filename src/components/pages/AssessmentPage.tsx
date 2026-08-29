import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../SEOHead";
import { AssessmentFAQ } from "./AssessmentFAQ";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  GraduationCap, 
  ChevronRight, 
  Play, 
  Users, 
  User,
  BookOpen, 
  Award, 
  Compass, 
  X, 
  Check, 
  Flame, 
  ChevronLeft, 
  Activity, 
  MessageSquare,
  Sparkle,
  HelpCircle,
  TrendingUp,
  Target,
  Brain,
  Lightbulb,
  Building2,
  BarChart3
} from "lucide-react";

/* ================= ONE DIAGNOSTIC. THREE PERSPECTIVES. SECTION ================= */
export function AudiencePerspectiveSection({ onSignIn }: { onSignIn?: () => void }) {
  const [activeAudience, setActiveAudience] = useState<"student" | "parent" | "educator">("student");

  return (
    <section id="ebm-diagnostic-perspectives" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white relative overflow-hidden px-4">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#00a3e0]/15 border border-[#00a3e0]/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#38bdf8]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ONE DIAGNOSTIC. THREE PERSPECTIVES.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-white">
            See learning from your perspective.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            EBM helps learners, parents, and educators understand progress in Mathematics and English Comprehension—with clear diagnostic results and meaningful next steps.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 shadow-xl flex flex-wrap justify-center gap-1 max-w-2xl w-full">
            {[
              { id: "student", label: "For Students", icon: User },
              { id: "parent", label: "For Parents", icon: Users },
              { id: "educator", label: "For Educators & Schools", icon: GraduationCap },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAudience(tab.id as any)}
                  className={`relative flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 select-none ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAudienceTabBg"
                      className="absolute inset-0 bg-[#00a3e0] rounded-xl shadow-lg shadow-cyan-500/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <IconComp className={`w-4 h-4 relative z-10 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tab Content View */}
        <AnimatePresence mode="wait">
          {activeAudience === "student" && (
            <motion.div
              key="student-perspective"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Messages & CTA */}
              <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    <User className="w-3.5 h-3.5" />
                    <span>Student Perspective</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Understand where you are. Know where to improve.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Clear diagnostic levels show exactly how you are performing in Mathematics and English Comprehension. Discover your strengths and unlock a targeted roadmap of your next best practice steps.
                  </p>

                  {/* EBM Insight Callout */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-start space-x-3">
                      <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">EBM Student Insight</span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed mt-1">
                          "You've mastered Grade 6 Fractions &amp; Decimals and top-tier Inferencing! Tackling 2 recommended practice sets will boost your Math level past 800."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic focus badge */}
                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
                    <span className="bg-slate-700/60 px-3 py-1 rounded-lg border border-slate-600/50">🔢 Mathematics Focus</span>
                    <span className="bg-slate-700/60 px-3 py-1 rounded-lg border border-slate-600/50">📖 English Comprehension</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60">
                  <button 
                    onClick={onSignIn}
                    className="w-full bg-[#00a3e0] hover:bg-cyan-400 text-white font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Start the EBM Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Dashboard Preview */}
              <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                        780
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Student Personal Dashboard</h4>
                        <p className="text-xs text-slate-400 font-medium">Math &amp; English Comprehension Diagnostic</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      Level Updated
                    </span>
                  </div>

                  {/* Two Main Academic Subjects Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Math Card */}
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Mathematics</span>
                        <span className="text-sm font-black text-white">Level 780</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: "78%" }} />
                      </div>
                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-emerald-400 font-semibold">✓ Performing Well:</span>
                          <span className="font-bold text-slate-200">Fractions &amp; Decimals</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-amber-400 font-semibold">🎯 Next Focus:</span>
                          <span className="font-bold text-slate-200">Improper Fractions</span>
                        </div>
                      </div>
                    </div>

                    {/* English Comprehension Card */}
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">English Comprehension</span>
                        <span className="text-sm font-black text-white">Level 810</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: "81%" }} />
                      </div>
                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-emerald-400 font-semibold">✓ Performing Well:</span>
                          <span className="font-bold text-slate-200">Making Inferences</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-amber-400 font-semibold">🎯 Next Focus:</span>
                          <span className="font-bold text-slate-200">Implicit Theme Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Action Items */}
                  <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400">Recommended Next Steps</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/50">
                        <div className="flex items-center space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="font-semibold text-slate-200">Convert improper fractions to decimals on number lines</span>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded">Mathematics</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/50">
                        <div className="flex items-center space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="font-semibold text-slate-200">Determine central theme from supporting evidence in text</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded">English</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeAudience === "parent" && (
            <motion.div
              key="parent-perspective"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Messages & CTA */}
              <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    <span>Parent Perspective</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    See your child's progress more clearly.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Gain a clear, reassuring overview of your child's growth in Mathematics and English Comprehension. Track achievements and growth opportunities without stress or confusing jargon.
                  </p>

                  {/* EBM Insight Callout */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl shrink-0 mt-0.5">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">EBM Parent Insight</span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed mt-1">
                          "Your child has shown consistent growth across the past 3 diagnostic checks, demonstrating strong critical thinking in English inferencing and solid command of fraction operations."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic focus badge */}
                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
                    <span className="bg-slate-700/60 px-3 py-1 rounded-lg border border-slate-600/50">📊 Multi-Check Growth Tracking</span>
                    <span className="bg-slate-700/60 px-3 py-1 rounded-lg border border-slate-600/50">💙 Encouraging Terminology</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60">
                  <button 
                    onClick={onSignIn}
                    className="w-full bg-[#00a3e0] hover:bg-cyan-400 text-white font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Start Your Child's Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Dashboard Preview */}
              <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                        MB
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Parent Overview: Molly Brady</h4>
                        <p className="text-xs text-slate-400 font-medium">Diagnostic Progress • Mathematics &amp; English</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full">
                      3 Assessments Tracked
                    </span>
                  </div>

                  {/* Progress Across Multiple Assessments */}
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 mb-6 space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                      <span>Diagnostic Level History</span>
                      <span className="text-emerald-400 font-bold normal-case">+90 pts overall growth 📈</span>
                    </h5>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                      <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] font-bold text-slate-400 block">Check 1</span>
                        <span className="text-base font-black text-slate-300">710 Math</span>
                        <span className="text-xs font-bold text-slate-400 block">740 ELA</span>
                      </div>
                      <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] font-bold text-slate-400 block">Check 2</span>
                        <span className="text-base font-black text-cyan-400">750 Math</span>
                        <span className="text-xs font-bold text-purple-400 block">785 ELA</span>
                      </div>
                      <div className="bg-slate-800/90 p-3 rounded-xl border border-cyan-500/40 bg-cyan-950/20">
                        <span className="text-[10px] font-bold text-cyan-300 block">Current</span>
                        <span className="text-base font-black text-cyan-300">780 Math</span>
                        <span className="text-xs font-bold text-purple-300 block">810 ELA</span>
                      </div>
                    </div>
                  </div>

                  {/* Strengths and Growth Opportunities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                      <h6 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Doing Well (Strengths)</span>
                      </h6>
                      <ul className="text-xs space-y-1.5 text-slate-200">
                        <li className="flex items-center space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>Fractions &amp; Decimals (Math)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>Making Inferences (English)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-900/60 border border-blue-500/30 rounded-2xl p-4 space-y-2">
                      <h6 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <Target className="w-4 h-4" />
                        <span>Growth Opportunities</span>
                      </h6>
                      <ul className="text-xs space-y-1.5 text-slate-200">
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>Multi-step Decimal Conversion (Math)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>Comparative Non-Fiction Analysis (English)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeAudience === "educator" && (
            <motion.div
              key="educator-perspective"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Messages & CTA */}
              <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Educators &amp; Schools Perspective</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Understand learning. Support progress.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Class and school-level diagnostic analytics for Mathematics and English Comprehension. Identify cohort patterns, target intervention groups, and optimize curriculum planning.
                  </p>

                  {/* EBM Insight Callout */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl shrink-0 mt-0.5">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">EBM Educator Insight</span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed mt-1">
                          "Diagnostic patterns across 35 enrolled students indicate strong foundational reading fluency, with 82% ready for advanced inference. In Mathematics, targeting 15-minute daily guided practice on rational fractions will elevate 8 students into strong proficiency."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Teaching Focus */}
                  <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs text-purple-200">
                    <span className="font-extrabold block mb-1">💡 Recommended Teaching Strategy:</span>
                    <span>15-min targeted small-group intervention on rational fraction conversions + enrichment tracks in inferencing.</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={onSignIn}
                    className="flex-1 bg-[#00a3e0] hover:bg-cyan-400 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-4 rounded-2xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Explore EBM for Educators</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Dashboard Preview */}
              <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-black">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Grade 6 Cohort Analytics</h4>
                        <p className="text-xs text-slate-400 font-medium">35 Students Enrolled • Math &amp; English Diagnostic</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full">
                      School View
                    </span>
                  </div>

                  {/* Class Averages & Learner Cohort Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4">
                      <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">Class Mathematics Average</span>
                      <div className="text-2xl font-black text-white mt-1">Level 750</div>
                      <p className="text-[11px] text-emerald-400 font-bold mt-1">✓ Grade Benchmark Met</p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4">
                      <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">Class English Average</span>
                      <div className="text-2xl font-black text-white mt-1">Level 790</div>
                      <p className="text-[11px] text-emerald-400 font-bold mt-1">✓ Exceeding Benchmark</p>
                    </div>
                  </div>

                  {/* Learner Distribution Bars */}
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400">Cohort Proficiency Distribution</h5>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-400">Performing Strongly (68%)</span>
                          <span className="text-slate-300">24 Math • 28 English</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: "68%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-cyan-400">Progressing Steady (24%)</span>
                          <span className="text-slate-300">9 Math • 7 English</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: "24%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-amber-400">Requiring Additional Support (8%)</span>
                          <span className="text-slate-300">3 Math • 1 English</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: "8%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curriculum Focus Areas */}
                  <div className="mt-4 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 text-xs space-y-2">
                    <span className="font-extrabold uppercase tracking-wider text-slate-400 block">Major Curriculum Attention Areas</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-cyan-950 border border-cyan-800 text-cyan-300 px-2.5 py-1 rounded-lg font-semibold">
                        Math: Rational Fractions &amp; Word Problems
                      </span>
                      <span className="bg-purple-950 border border-purple-800 text-purple-300 px-2.5 py-1 rounded-lg font-semibold">
                        English: Contextual Vocabulary &amp; Comparative Analysis
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export function AssessmentPage({ onSignIn, onNavigateToTab }: { onSignIn?: () => void; onNavigateToTab?: (tab: string) => void }) {
  const navigate = useNavigate();
  // Real active state to toggle subject in the Arena mockup (Math vs Language Arts)
  const [selectedSubject, setSelectedSubject] = useState<"math" | "ela">("math");
  
  // Interactive list of recommended skills inside Molly's Action Plan
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({
    "skill-1": false,
    "skill-2": false,
    "skill-3": false,
  });

  // State for Video Demo Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Cooper",
      role: "9th grade student",
      location: "Pittsburgh, Pennsylvania",
      avatarBg: "bg-emerald-100 text-emerald-700",
      initial: "C",
      quote: "I appreciate EBM for allowing me to work at my own pace and allowing me to advance through math as fast as I want to. It has been a tremendous help for me, and I have learned many skills I would not have learned in school. The Diagnostic is one of my favorite parts as it allows me to see where I am now in math, and how to move forwards."
    },
    {
      name: "Alex",
      role: "Middle school RTI math teacher",
      location: "Kingston, New York",
      avatarBg: "bg-blue-100 text-blue-700",
      initial: "A",
      quote: "EBM is straightforward for students and I love the Diagnostic. When a student comes to me to accomplish a specific goal, I create a sequence of EBM skills for them to go through. When a student comes in, they use the Diagnostic to identify skills for them to work on. It helps pinpoint gaps with absolute precision."
    },
    {
      name: "Gonia Onyenagacha",
      role: "Parent",
      location: "Maro, Oklahoma",
      avatarBg: "bg-purple-100 text-purple-700",
      initial: "G",
      quote: "I like your Diagnostic and personalized recommendations. Since signing my kids up for EBM, they have gained a love for studying outside of the classroom. I have also noticed my kids' test scores increase significantly across both math and literacy."
    }
  ];

  const toggleSkill = (id: string) => {
    setCompletedSkills(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Video Demo slides mimicking diagnostic progression
  const videoSlides = [
    {
      title: "1. Adaptable Questions",
      description: "Students enter the diagnostic arena. Questions automatically adapt in real-time, becoming harder or easier based on every answer given.",
      icon: <Sparkles className="w-10 h-10 text-amber-500" />,
      preview: (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Question 4 of 15</div>
          <div className="text-lg font-semibold text-slate-800 mb-4">Find the area of a right triangle with base 6cm and height 8cm.</div>
          <div className="space-y-2">
            {["14 cm²", "24 cm²", "48 cm²", "10 cm²"].map((opt, i) => (
              <div key={i} className={`p-3 rounded-lg border text-sm font-medium transition cursor-pointer ${opt === "24 cm²" ? "border-emerald-500 bg-emerald-50/50 text-emerald-800" : "border-slate-200 hover:bg-slate-100"}`}>
                {opt}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-emerald-600 font-semibold">
            <span>✨ Adapting difficulty based on previous correct answers</span>
            <span>Math Level: ~750</span>
          </div>
        </div>
      )
    },
    {
      title: "2. Real-Time Tracking",
      description: "As the student answers, the diagnostic updates overall scores and strand scores continuously to show precise proficiency curves.",
      icon: <Activity className="w-10 h-10 text-[#00a3e0]" />,
      preview: (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-bold text-slate-700 mb-3 text-left">Your Overall Math Score</div>
          <div className="flex items-end justify-between mb-4">
            <span className="text-4xl font-extrabold text-[#00a3e0]">770</span>
            <span className="text-xs text-slate-500 font-bold bg-slate-200/50 py-1 px-2.5 rounded-full">📊 High Proficiency</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Fractions</span>
                <span className="text-emerald-600">800 (Mastery)</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Geometry</span>
                <span className="text-amber-500">760 (Highly Capable)</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "76%" }} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Interactive Action Plan",
      description: "Generates a complete roadmap list of targeted next-step skills to close learning gaps and accelerate individual growth.",
      icon: <Trophy className="w-10 h-10 text-emerald-500" />,
      preview: (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm mb-4">
            <CheckCircle2 className="w-5 h-5" />
            <span>Recommended Next Steps Created!</span>
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start space-x-2.5 p-2 bg-slate-50 rounded">
              <span className="text-emerald-500 font-bold">1.</span>
              <div>
                <p className="font-semibold text-slate-800">Identify equivalent fractions on number lines</p>
                <p className="text-slate-500">Grade 4 • Focus Area</p>
              </div>
            </li>
            <li className="flex items-start space-x-2.5 p-2 bg-slate-50 rounded">
              <span className="text-emerald-500 font-bold">2.</span>
              <div>
                <p className="font-semibold text-slate-800">Graph points on a coordinate plane</p>
                <p className="text-slate-500">Grade 5 • Extension</p>
              </div>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen">
      <SEOHead 
        title="EBM Diagnostic Assessment | Adaptive Learning & Skill Evaluation"
        description="Discover EBM Diagnostic Assessment, an adaptive learning and skill evaluation solution that helps educators identify student strengths, learning needs, and personalized next steps."
        canonicalUrl="https://ejazbukharimethod.com/assessment"
      />
      
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-sky-100 shadow-sm">
        {/* Background Image */}
        <img
          src="/src/assets/images/assessment_hero_bg_1786524997986.jpg"
          alt="Assessment Diagnostic Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0076a5] mx-auto shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Real-Time Diagnostic Assessment Suite</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-slate-900"
          >
            EBM Diagnostic Assessment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Understand where every learner is in Mathematics and English Comprehension—and know what to focus on next.
          </motion.p>


        </div>
      </section>

      {/* ================= HEADER SEPARATOR / STATEMENT ================= */}
      <section className="py-12 bg-white text-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Centered title with horizontal side accent lines */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="hidden sm:block h-px bg-slate-200 flex-grow max-w-[150px]" />
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#00a3e0] tracking-tight text-center">
              Unlock every child's full potential
            </h2>
            <div className="hidden sm:block h-px bg-slate-200 flex-grow max-w-[150px]" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            The EBM Diagnostic gives you a clear, up-to-date picture of where each learner shines, plus personalized next steps to help them achieve more with confidence.
          </p>
        </div>
      </section>

      {/* ================= ROW 1: STEP INTO THE EBM DIAGNOSTIC ================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Section Eyebrow Header */}
          <div className="flex items-center space-x-3">
            <div className="h-0.5 w-8 bg-[#00a3e0]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#00a3e0] uppercase tracking-widest">
              Step Into the EBM Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Key Details & Subject Breakdown */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
                  01
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Understand performance with one continuous diagnostic
                </h3>
              </div>

              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                <p>
                  The EBM Diagnostic evaluates a learner's current level in Mathematics and English Comprehension through an adaptive assessment experience designed to provide meaningful evidence without unnecessary testing pressure.
                </p>
                <p className="text-sm sm:text-base text-slate-500">
                  The diagnostic is designed for learners from Grade 1 through O/A Levels, helping EBM understand learning across different stages of academic development.
                </p>
              </div>

              {/* Two Academic Subject Cards: Mathematics & English Comprehension */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Mathematics Focus Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 hover:border-cyan-300 transition-colors">
                  <div className="flex items-center space-x-2 text-[#00a3e0]">
                    <div className="p-1.5 bg-cyan-100/80 rounded-lg">
                      <BarChart3 className="w-4 h-4 text-[#00a3e0]" />
                    </div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                      Mathematics
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] shrink-0" />
                      <span>Grade 1–5 Fundamentals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] shrink-0" />
                      <span>Grade 6–8 Pre-Algebra &amp; Decimals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] shrink-0" />
                      <span>Pre-O Algebra &amp; Geometry</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] shrink-0" />
                      <span>O/A Level Pure &amp; Applied Mathematics</span>
                    </li>
                  </ul>
                </div>

                {/* English Comprehension Focus Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 hover:border-purple-300 transition-colors">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <div className="p-1.5 bg-purple-100/80 rounded-lg">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                      English Comprehension
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>Reading Fluency</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>Contextual Vocabulary</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>Inferential Thinking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>Textual Evidence Analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>O/A Level English Literature &amp; Language</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Badge Footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center space-x-3 text-slate-800 font-extrabold text-sm sm:text-base">
                <div className="bg-[#00a3e0]/10 text-[#00a3e0] p-2 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span>Covers Grade 1 to O/A Levels</span>
              </div>
            </div>

            {/* Right Column: Interactive Diagnostic Arena Preview */}
            <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Interactive Preview</span>
                  <h4 className="text-base sm:text-lg font-black text-slate-800">EBM Diagnostic Arena</h4>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-full">
                  <button 
                    onClick={() => setSelectedSubject("math")}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${selectedSubject === "math" ? "bg-[#00a3e0] text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Math
                  </button>
                  <button 
                    onClick={() => setSelectedSubject("ela")}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${selectedSubject === "ela" ? "bg-purple-600 text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <p className="text-center text-xs font-bold text-slate-600 bg-emerald-50 text-emerald-800 py-2.5 px-4 rounded-xl border border-emerald-100/80">
                🎉 Real-time level evaluation active across Grade 1 to O/A Levels
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category stats mock container */}
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/25 transition group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-600">
                        {selectedSubject === "math" ? "Fractions & Decimals" : "Inferential Thinking"}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded">Highest Level</span>
                    </div>
                    <div className="text-xl font-black text-[#00a3e0]">
                      {selectedSubject === "math" ? "800" : "810"}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/25 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-600">
                        {selectedSubject === "math" ? "Pre-Algebra" : "Contextual Vocabulary"}
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded">1 rec focus</span>
                    </div>
                    <div className="text-xl font-black text-[#00a3e0]">
                      {selectedSubject === "math" ? "770" : "790"}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/25 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-600">
                        {selectedSubject === "math" ? "Pure Math Fundamentals" : "Textual Evidence"}
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded">2 rec focus</span>
                    </div>
                    <div className="text-xl font-black text-[#00a3e0]">
                      {selectedSubject === "math" ? "750" : "780"}
                    </div>
                  </div>
                </div>

                {/* Graphical radar / spoke representation with central overall score */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 min-h-[220px] relative">
                  
                  {/* SVG Visual Radar Indicator */}
                  <svg className="w-36 h-36 animate-spin-slow text-slate-300" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" />
                    <line x1="18" y1="18" x2="82" y2="82" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="18" y1="82" x2="82" y2="18" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="50,20 72,32 80,50 65,70 50,85 30,68 22,50 35,32" fill="url(#blueGrad)" fillOpacity="0.4" stroke={selectedSubject === "math" ? "#00a3e0" : "#9333ea"} strokeWidth="1.5" />
                    
                    <defs>
                      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor={selectedSubject === "math" ? "#00a3e0" : "#9333ea"} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Central overall score indicator */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      {selectedSubject === "math" ? "Math Level" : "English Level"}
                    </span>
                    <span className="text-3xl font-black text-slate-800 tracking-tight">
                      {selectedSubject === "math" ? "780" : "810"}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded mt-0.5">
                      {selectedSubject === "math" ? "Proficient" : "Advanced"}
                    </span>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>

      {/* ================= ROW 2: TURN ASSESSMENT EVIDENCE INTO MEANINGFUL NEXT STEPS ================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200/80 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Eyebrow Header */}
          <div className="flex items-center space-x-3">
            <div className="h-0.5 w-8 bg-[#00a3e0]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#00a3e0] uppercase tracking-widest">
              Step Into the EBM Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Key Details & Features List */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-[#00a3e0] text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
                  02
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Turn assessment evidence into meaningful next steps
                </h3>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  A diagnostic result should be more than a number.
                </p>
                <p className="text-base sm:text-lg text-slate-600">
                  EBM uses assessment evidence to identify areas that may need further attention and recommend appropriate learning support based on the learner's current performance.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3.5">
                {[
                  "Personalized learning support",
                  "Clear areas of strength and development",
                  "Evidence-based learning recommendations",
                  "Learning support connected to the learner's current level",
                  "Progress information that helps guide the next step"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-slate-800 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>


            </div>

            {/* Right Column: EBM Diagnostic Action Plan Container */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden space-y-6 p-6 sm:p-8">
              
              {/* Action Plan Top Bar */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 text-[#00a3e0] flex items-center justify-center font-black">
                    MB
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00a3e0]">Student Overview</span>
                    <h4 className="text-base font-black text-slate-900">Student: Molly Brady</h4>
                  </div>
                </div>
                
                <div className="bg-cyan-50 border border-cyan-200/80 px-3.5 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Latest Mathematics Level</span>
                  <span className="text-lg font-black text-[#00a3e0]">770</span>
                </div>
              </div>

              {/* Action Plan Title */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <h5 className="text-sm font-black tracking-wide">EBM Diagnostic Action Plan</h5>
                </div>
                <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                  Evidence-Based
                </span>
              </div>

              {/* Subject Areas: Mathematics & English Comprehension */}
              <div className="space-y-4">
                
                {/* Mathematics Section */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#00a3e0] uppercase tracking-wider flex items-center space-x-1.5">
                      <BarChart3 className="w-4 h-4" />
                      <span>Mathematics</span>
                    </span>
                    <span className="text-xs font-extrabold bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-md">
                      Current Focus: Fractions &amp; Decimals
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    The latest diagnostic evidence suggests that Molly would benefit from strengthening her understanding of relationships between fractions and decimals.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 text-xs text-slate-800 font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Recommended Support:</strong> Practice activities and lessons matched to her current level.</span>
                  </div>
                </div>

                {/* English Comprehension Section */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-600 uppercase tracking-wider flex items-center space-x-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>English Comprehension</span>
                    </span>
                    <span className="text-xs font-extrabold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-md">
                      Current Focus: Inferential Thinking
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    Molly demonstrates confidence in identifying information directly stated in a text. Her next area for development is interpreting information that is implied rather than directly stated.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 text-xs text-slate-800 font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><strong>Recommended Support:</strong> Guided comprehension activities focused on inference and textual evidence.</span>
                  </div>
                </div>

              </div>

              {/* EBM Learning Recommendation Banner */}
              <div className="bg-gradient-to-r from-cyan-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>EBM Learning Recommendation</span>
                  </span>
                  <p className="text-sm font-black text-white">Next Focus: Fractions &amp; Decimals</p>
                  <p className="text-xs text-slate-300 font-medium">Recommended based on recent diagnostic evidence.</p>
                </div>
                <button 
                  onClick={onSignIn}
                  className="bg-[#00a3e0] hover:bg-cyan-400 text-white text-xs font-extrabold py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  View Recommendation
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= ROW 3: GET INSIGHTS THAT GROW WITH THE LEARNER ================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Eyebrow Header */}
          <div className="flex items-center space-x-3">
            <div className="h-0.5 w-8 bg-purple-600" />
            <span className="text-xs sm:text-sm font-extrabold text-purple-600 uppercase tracking-widest">
              Step Into the EBM Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Headline, Narrative & Call to Action */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/20">
                  03
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Get insights that grow with the learner
                </h3>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Learning changes over time—and diagnostic information should change with it.
                </p>
                <p className="text-base sm:text-lg text-slate-600">
                  EBM continuously updates its understanding of a learner's performance as they complete learning activities and demonstrate new evidence of understanding.
                </p>
                <p className="text-base sm:text-lg text-slate-600">
                  This means learners, parents, and educators can work with a more current picture of progress rather than relying only on an old assessment result.
                </p>
              </div>

              {/* Takeaway Highlight Box */}
              <div className="bg-purple-50/80 border border-purple-200/80 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Real-Time Diagnostic Evidence</span>
                </div>
                <p className="text-sm font-bold text-purple-950 leading-relaxed">
                  "Your diagnostic picture should reflect where the learner is now—not only where they were when they last took a test."
                </p>
              </div>


            </div>

            {/* Right Column: Visual Continuous Updating Flow & Live Dashboard Preview */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl shadow-xl border border-slate-800 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-purple-400">Continuous Updating</span>
                </div>
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
                  Live Adaptive Loop
                </span>
              </div>

              {/* Continuous Flow Pipeline: Assessment -> Learning -> New Evidence -> Updated Insight */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  How Diagnostic Information Evolves:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {[
                    { step: "01", title: "Assessment", desc: "Diagnostic Baseline", icon: Target, color: "border-cyan-500/50 text-cyan-400" },
                    { step: "02", title: "Learning", desc: "Targeted Practice", icon: BookOpen, color: "border-emerald-500/50 text-emerald-400" },
                    { step: "03", title: "New Evidence", desc: "Active Tasks", icon: BarChart3, color: "border-amber-500/50 text-amber-400" },
                    { step: "04", title: "Updated Insight", desc: "Real-Time Level", icon: Sparkles, color: "border-purple-500/50 text-purple-400" }
                  ].map((node, i) => {
                    const IconComp = node.icon;
                    return (
                      <div key={i} className={`bg-slate-800/80 border ${node.color} p-3 rounded-xl flex flex-col items-center text-center space-y-1 relative`}>
                        <IconComp className="w-4 h-4 mb-0.5" />
                        <span className="text-xs font-black text-white">{node.title}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{node.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Progress Card Representation */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Student Live Record</span>
                    <h5 className="text-sm font-black text-white">Mathematics &amp; English Progress</h5>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    Real-time synced
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div>
                      <p className="font-bold text-slate-200">Mathematics Level</p>
                      <p className="text-[10px] text-slate-400">Updated after 3 practice sets completed</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-cyan-400">770 → 810</span>
                      <span className="text-[10px] text-emerald-400 block font-bold">+40 pts growth</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div>
                      <p className="font-bold text-slate-200">English Comprehension Level</p>
                      <p className="text-[10px] text-slate-400">Updated after inferential reading exercise</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-purple-400">810 → 850</span>
                      <span className="text-[10px] text-emerald-400 block font-bold">+40 pts growth</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= ROW 4: MAKE PROGRESS VISIBLE AND MOTIVATING ================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Eyebrow Header */}
          <div className="flex items-center space-x-3">
            <div className="h-0.5 w-8 bg-amber-500" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-600 uppercase tracking-widest">
              Step Into the EBM Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Key Details */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20">
                  04
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Make progress visible and motivating
                </h3>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Assessment should help learners understand progress—not create unnecessary pressure.
                </p>
                <p className="text-base sm:text-lg text-slate-600">
                  EBM presents progress in a way that encourages learners to recognise improvement, work toward meaningful academic goals, and stay engaged with their learning journey.
                </p>
              </div>

              {/* Progress & Achievement Highlight Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-amber-600">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Progress &amp; Achievement
                  </h4>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Celebrate meaningful milestones as learners make progress in:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-cyan-50/80 border border-cyan-200/80 p-3.5 rounded-xl flex items-center space-x-3">
                    <div className="p-2 bg-[#00a3e0] text-white rounded-lg shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Subject Pillar</span>
                      <span className="text-sm font-black text-slate-900">Mathematics</span>
                    </div>
                  </div>

                  <div className="bg-purple-50/80 border border-purple-200/80 p-3.5 rounded-xl flex items-center space-x-3">
                    <div className="p-2 bg-purple-600 text-white rounded-lg shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Subject Pillar</span>
                      <span className="text-sm font-black text-slate-900">English Comprehension</span>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Right Column: EBM Achievement Interactive Card Showcase */}
            <div className="lg:col-span-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/5 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[380px]">
              
              {/* Decorative Background Confetti/Star SVG Icons */}
              <div className="absolute top-6 left-8 w-8 h-8 text-amber-400/40 pointer-events-none">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="absolute bottom-8 right-8 w-10 h-10 text-orange-400/30 pointer-events-none">
                <Award className="w-full h-full" />
              </div>

              {/* Main EBM Achievement Card */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xl max-w-md w-full relative z-10 space-y-5 text-center"
              >
                {/* Trophy Badge Header */}
                <div className="inline-flex items-center space-x-2 bg-amber-100/80 text-amber-900 border border-amber-200 py-1.5 px-4 rounded-full text-xs font-black">
                  <Trophy className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>EBM Achievement</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    You've made progress in Mathematics.
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Your latest results show improvement in your understanding of <strong className="text-slate-900">Fractions &amp; Decimals</strong>.
                  </p>
                </div>

                {/* Stars visual */}
                <div className="flex justify-center space-x-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="p-1 bg-amber-50 rounded-lg border border-amber-100">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button 
                    onClick={onSignIn}
                    className="w-full bg-[#00a3e0] hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>View My Progress</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>





      {/* ================= TESTIMONIALS SECTIONS ================= */}
      <section className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden px-4 border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,163,224,0.08),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 text-[#00a3e0] bg-cyan-50 border border-cyan-200/80 py-1.5 px-4 rounded-full font-black uppercase text-xs tracking-widest">
            <Users className="w-4 h-4" />
            <span>Success Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Loved by students, parents, and educators
          </h2>

          {/* Carousel container */}
          <div className="bg-white border border-slate-200/90 p-6 sm:p-10 rounded-3xl shadow-xl min-h-[250px] flex flex-col justify-between relative">
            
            {/* Big quote mark icon */}
            <span className="absolute -top-6 left-6 text-7xl font-serif text-slate-200 select-none pointer-events-none">“</span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed text-left font-medium">
                  {testimonials[activeTestimonial].quote}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg ${testimonials[activeTestimonial].avatarBg}`}>
                      {testimonials[activeTestimonial].initial}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Sparkle key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonials controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
              <button 
                onClick={() => setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
              <button 
                onClick={() => setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 pt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${idx === activeTestimonial ? "bg-[#00a3e0] w-6" : "bg-slate-300 hover:bg-slate-400 w-2.5"}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ================= ASSESSMENT FAQ SECTION ================= */}
      <AssessmentFAQ />

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="bg-gradient-to-br from-cyan-50/90 via-white to-blue-50/80 text-slate-900 py-16 sm:py-24 text-center px-4 relative overflow-hidden border-t border-slate-200/80">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,163,224,0.1),transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Every learner deserves a clear path forward.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            The EBM Diagnostic provides evidence-based insight into Mathematics and English Comprehension, helping learners understand their progress and helping parents and educators provide the right support at the right time.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">


            <button 
              onClick={() => {
                if (onSignIn) onSignIn();
                navigate("/register");
              }}
              className="w-full sm:w-auto bg-[#00a3e0] hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-2xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Explore EBM</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE WALKTHROUGH SIMULATOR MODAL ================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="text-sm font-extrabold text-slate-800">EBM Diagnostic Simulation</h4>
                </div>
                <button 
                  onClick={() => { setIsVideoModalOpen(false); setVideoStep(0); }}
                  className="p-1.5 hover:bg-slate-200 rounded-full transition text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Simulated screen box */}
                <div className="min-h-[220px] flex items-center justify-center bg-slate-900 rounded-2xl p-4 text-white relative border border-slate-800">
                  <div className="absolute top-3 left-3 bg-white/10 text-[10px] font-bold py-1 px-2.5 rounded-full backdrop-blur-md">
                    Screen Walkthrough
                  </div>
                  <div className="w-full">
                    {videoSlides[videoStep].preview}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    {videoSlides[videoStep].icon}
                    <h5 className="font-extrabold text-slate-950 text-lg">
                      {videoSlides[videoStep].title}
                    </h5>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {videoSlides[videoStep].description}
                  </p>
                </div>

                {/* Simulated controls / steps */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div className="flex space-x-1">
                    {videoSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setVideoStep(idx)}
                        className={`h-2.5 rounded-full transition-all ${idx === videoStep ? "bg-[#00a3e0] w-6" : "bg-slate-200 hover:bg-slate-300 w-2.5"}`}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    {videoStep > 0 && (
                      <button 
                        onClick={() => setVideoStep(prev => prev - 1)}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                      >
                        Back
                      </button>
                    )}
                    {videoStep < videoSlides.length - 1 ? (
                      <button 
                        onClick={() => setVideoStep(prev => prev + 1)}
                        className="bg-[#00a3e0] hover:bg-[#008bc0] text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm cursor-pointer"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setIsVideoModalOpen(false); setVideoStep(0); }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm cursor-pointer"
                      >
                        Finish Walkthrough
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
