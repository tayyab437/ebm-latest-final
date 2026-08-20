import React from "react";
import { useContentStore } from "./content.store";
import { CheckSquare, X, Check, Eye } from "lucide-react";

export function ContentReview() {
  const { pendingReviews } = useContentStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <CheckSquare className="h-6 w-6 text-amber-500" /> Review & QA
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Quality Assurance Workflow
          </p>
        </div>
      </div>

      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">
            Pending Requests
          </span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">
            Actions
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {pendingReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {review.lessonTitle}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      By {review.requester.name}
                    </span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="h-9 w-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors border border-white/5 bg-black/20"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="h-9 w-9 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-500 flex items-center justify-center text-slate-400 transition-colors border border-white/5 bg-black/20"
                  title="Approve"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  className="h-9 w-9 rounded-lg hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center text-slate-400 transition-colors border border-white/5 bg-black/20"
                  title="Reject"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {pendingReviews.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
              No pending reviews.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
