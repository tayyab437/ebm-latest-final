import React, { useEffect } from "react";
import { useContentStore } from "./content.store";
import {
  FileText,
  CheckSquare,
  Clock,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";

export function ContentDashboard() {
  const { fetchCurriculum, fetchReviews, pendingReviews, setCurrentView } =
    useContentStore();

  useEffect(() => {
    fetchCurriculum();
    fetchReviews();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Content Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            EBM Curriculum Management Hub
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView("editor")}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
          >
            <FileText className="h-4 w-4" /> Create Lesson
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Draft Lessons",
            val: 12,
            icon: FileText,
            color: "slate",
            action: () => setCurrentView("curriculum"),
          },
          {
            label: "Pending Review",
            val: pendingReviews.length,
            icon: CheckSquare,
            color: "amber",
            action: () => setCurrentView("review"),
          },
          {
            label: "Recently Edited",
            val: 8,
            icon: Clock,
            color: "blue",
            action: () => setCurrentView("version-history"),
          },
          {
            label: "Published Items",
            val: 456,
            icon: TrendingUp,
            color: "emerald",
            action: () => setCurrentView("publishing"),
          },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={stat.action}
            className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group cursor-pointer hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div
                className={clsx(
                  "p-4 rounded-2xl",
                  `bg-${stat.color}-500/10 text-${stat.color}-400`,
                )}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-4xl font-black text-white tracking-tighter mb-1 relative z-10">
              {stat.val}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-purple-500" /> Action
                Required
              </h3>
            </div>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:border-purple-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {review.lessonTitle}
                    </h4>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                      Submitted by {review.requester.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView("review")}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
              {pendingReviews.length === 0 && (
                <div className="text-center p-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  No pending reviews
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles className="w-24 h-24 text-purple-500" />
            </div>
            <h3 className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] mb-4 relative z-10 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> AI Insights
            </h3>
            <p className="text-xs font-medium text-slate-300 leading-relaxed relative z-10 italic">
              "The Grade 8 Science curriculum is missing 3 key topics required
              by the latest Cambridge syllabus. I suggest generating drafts for
              'Chemical Reactions', 'Ecosystems', and 'Force Vectors'."
            </p>
            <button
              onClick={() => setCurrentView("ai-generator")}
              className="mt-6 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              Generate Drafts <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
