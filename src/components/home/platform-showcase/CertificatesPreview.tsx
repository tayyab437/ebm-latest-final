import React from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Download, 
  ExternalLink, 
  FileCheck, 
  Sparkles, 
  Badge, 
  Star, 
  Zap, 
  Compass, 
  Share2 
} from "lucide-react";
import { CERTIFICATE_DATA } from "./dashboard.constants";

export const CertificatesPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/10 dark:border-amber-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            EBM Credentials & Milestones
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Verified Achievements & Badges 🏆
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Display your verified academic certificates, milestone completion badges, and community leaderboard placements.
          </p>
        </div>
      </div>

      {/* Main interactive grid containing digital certificate previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns - Certificates List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATE_DATA.map((cert) => (
              <div 
                key={cert.id}
                className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-56 hover:border-amber-500 dark:hover:border-amber-400 transition-colors"
              >
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/5 dark:bg-amber-400/5" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-4xs font-mono uppercase text-slate-400 tracking-widest">{cert.credentialId}</span>
                    <Award className="h-6 w-6 text-amber-500" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                    {cert.subject}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-3xs text-slate-400">Issued: {cert.issueDate}</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-500 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-500 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: digital badges and leaderboard ranking stats */}
        <div className="space-y-6">
          {/* Active achievements badge collection card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4">
              Milestone Badge Gallery
            </h4>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-lg shadow-sm" title="Super Scholar Streak Badge">
                  🔥
                </div>
                <span className="text-4xs text-slate-500 mt-1 block">Streak x10</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-lg shadow-sm" title="Socratic Philosopher Prompt Badge">
                  🧠
                </div>
                <span className="text-4xs text-slate-500 mt-1 block">Explorer</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-950/40 flex items-center justify-center text-lg shadow-sm" title="Golden Exam Merit Badge">
                  ⭐
                </div>
                <span className="text-4xs text-slate-500 mt-1 block">High Merit</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-lg shadow-sm" title="Fast Learner Accelerator Badge">
                  ⚡
                </div>
                <span className="text-4xs text-slate-500 mt-1 block">Accel</span>
              </div>
            </div>
          </div>

          {/* Socratic Leaderboard placement widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
              National Leaderboard Rank
            </h4>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl">
              <div>
                <span className="text-3xs text-slate-400">Current Position</span>
                <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400">Rank #14 / 1,420</p>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg text-2xs font-bold uppercase tracking-wider">
                Elite Tier
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
