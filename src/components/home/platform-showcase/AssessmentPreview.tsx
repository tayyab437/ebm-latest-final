import React from "react";
import { motion } from "motion/react";
import { 
  FileSpreadsheet, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Award,
  BookOpen
} from "lucide-react";
import { ASSESSMENTS_DATA } from "./dashboard.constants";

export const AssessmentPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Header Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/10 dark:border-blue-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            EBM Testing & Standardized Verification
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Cambridge CIE Assessment Centre 📝
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor mock examinations, timed past papers, and progressive Socratic evaluation scorecards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-400 rounded-lg text-xs font-semibold">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>Avg Mock: 91.2%</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-blue-600/10">
            <span>Launch Timed Mock Exam</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column lists active assessment centers */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4">
              Your Testing Roster
            </h4>
            <div className="space-y-4">
              {ASSESSMENTS_DATA.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.title}</h5>
                      <p className="text-xs text-slate-400">{item.subject} &bull; {item.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.status === "graded" ? (
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.score}</span>
                        <span className="block text-3xs text-slate-400">Graded &bull; Feedback ready</span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 rounded-lg text-2xs font-semibold uppercase tracking-wider">
                        Pending
                      </span>
                    )}
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Papers Database card info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4">
              Access Timed CIE Past Papers
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Math 9709 Specimen Paper 1</h5>
                <p className="text-3xs text-slate-400">Timed 1h 45m &bull; Automated AI Step Analytics</p>
                <button className="text-3xs text-blue-600 font-bold hover:underline block pt-2">
                  Initialize Past Paper &rarr;
                </button>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Chemistry 9701 Paper 22 Mock</h5>
                <p className="text-3xs text-slate-400">Timed 1h 15m &bull; Continuous Recitation Grading</p>
                <button className="text-3xs text-blue-600 font-bold hover:underline block pt-2">
                  Initialize Past Paper &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: score distribution & certificates info */}
        <div className="space-y-6">
          {/* Socratic quiz score breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span>Assessment Milestones</span>
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Pure Mathematics</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">A* (94%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "94%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Organic Chemistry</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">A (88%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "88%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">English Comprehension</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">A* (92%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Practice and readiness tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cambridge Readiness</h4>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Your overall readiness coefficient is <strong className="text-blue-500 font-extrabold">91%</strong> based on 12 mock papers solved. You are ready for the accelerated O-Level examinations.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
