import React from "react";
import { GraduationCap, Sparkles, BookOpen, Clock, Award } from "lucide-react";

export function AuthIllustration() {
  return (
    <div
      id="auth-illustration"
      className="hidden lg:flex flex-col justify-between w-1/2 bg-slate-950 text-white p-12 relative overflow-hidden select-none"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Header Info */}
      <div className="relative z-10 flex items-center space-x-3">
        <div className="bg-blue-600 text-white p-2.5 rounded-xl font-bold flex items-center justify-center shadow-lg">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">EBM Digital Learning</h2>
          <p className="text-xs text-slate-400 font-mono">Ejaz Bukhari Method • Fast-Track Pathway</p>
        </div>
      </div>

      {/* Main Feature Showcase */}
      <div className="relative z-10 my-auto max-w-lg space-y-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="h-3 w-3" />
            <span>Grade 5 to O-Level in 3 Years</span>
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Unlock the Ultimate Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Acceleration Engine</span>.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            By shifting from passive passive memorization to deep logic-first concepts, EBM enables students to master the entire Cambridge O-Level curriculum with ease.
          </p>
        </div>

        {/* 3-Year Roadmap Visualization */}
        <div className="space-y-4 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-sm font-semibold text-slate-300 font-mono tracking-wider uppercase">
            Your 3-Year Milestones
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600/10 text-blue-400 p-1.5 rounded-lg shrink-0 border border-blue-500/20 text-xs font-bold">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Year 1: Foundation Accelerated</h4>
                <p className="text-xs text-slate-400 mt-0.5">Grades 5-7 fundamentals, rapid logical mathematics, speed comprehension & reading drills.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500/10 text-blue-400 p-1.5 rounded-lg shrink-0 border border-blue-500/20 text-xs font-bold">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Year 2: Pre-O Level Synthesis</h4>
                <p className="text-xs text-slate-400 mt-0.5">Grades 8-9 synthesis, advanced sciences, complex algebra, and past paper diagnosis.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-500/20 text-xs font-bold">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Year 3: CIE Mastery & Exams</h4>
                <p className="text-xs text-slate-400 mt-0.5">Full syllabus drills, high-yield examination tips, mock simulations, and real papers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex justify-between items-center border-t border-slate-900 pt-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>Save up to 4 Years of Schooling</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="h-4 w-4" />
          <span>Cambridge curriculum standards</span>
        </div>
      </div>
    </div>
  );
}
