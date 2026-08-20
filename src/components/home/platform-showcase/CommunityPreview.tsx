import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Award,
  Globe
} from "lucide-react";
import { COMMUNITY_DATA } from "./dashboard.constants";

export const CommunityPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-sky-500/10 via-sky-500/5 to-transparent border border-sky-500/10 dark:border-sky-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            EBM Academic Networks
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            The Socratic Community Forum 🌐
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exchange study plans, answer homework threads, explore collaborative journals, and sync with fellow accelerated scholars.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-sky-600/10">
            <Plus className="h-4 w-4" />
            <span>Create Discussion Topic</span>
          </button>
        </div>
      </div>

      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns - Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
          {COMMUNITY_DATA.map((post) => (
            <div 
              key={post.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-200">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">{post.author}</h5>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-4xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {post.role}
                    </span>
                  </div>
                </div>
                <span className="text-3xs text-slate-400">{post.timeAgo}</span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {post.content}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-4 items-center text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-red-500 text-3xs transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-sky-500 text-3xs transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments} Comments</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-500 text-3xs ml-auto transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right column: study groups and community challenges */}
        <div className="space-y-6">
          {/* Active study groups list card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
              Active Socratic Circles
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-zinc-350"># Mathematics-Circle-1</span>
                <span className="text-3xs text-slate-400">12 online</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-zinc-350"># Chemistry-Drill-Club</span>
                <span className="text-3xs text-slate-400">8 online</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-zinc-350"># OLevel-English-Scribes</span>
                <span className="text-3xs text-slate-400">18 online</span>
              </div>
            </div>
          </div>

          {/* Active Community Challenges */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
              Weekly Community Challenge
            </h4>
            <div className="p-3 bg-sky-500/5 rounded-xl border border-sky-500/10 space-y-1.5">
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                <Award className="h-4 w-4 text-sky-600" />
                <span>The Polynomial Scribe Marathon</span>
              </h5>
              <p className="text-3xs text-slate-500 leading-relaxed">
                Complete 15 consecutive Socratic factoring drills with no errors. Winner gets <strong className="text-sky-600">500 XP bonus</strong> and the Golden Scribe milestone profile badge!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
