import React, { useState } from "react";
import { Sparkles, Compass, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { StudentProfile } from "./ai-learning.types";

interface AIPersonalizationProps {
  profiles: StudentProfile[];
}

export const AIPersonalization: React.FC<AIPersonalizationProps> = ({ profiles }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProfile = profiles[selectedIdx] || profiles[0];

  return (
    <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 text-left space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Hyper-Personalized Adaptive Mentoring
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            See how EBM AI customizes its Socratic dialogue and module pace based on student diagnostic models.
          </p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono self-start sm:self-center">
          Adaptive Persona
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Profile Selector list (Left 5/12) */}
        <div className="md:col-span-5 space-y-2.5">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider px-0.5 block">
            Select A Demonstration Student Profile
          </span>

          <div className="space-y-2">
            {profiles.map((prof, index) => {
              const isActive = index === selectedIdx;
              return (
                <button
                  id={`btn-profile-${prof.id}`}
                  key={prof.id}
                  onClick={() => setSelectedIdx(index)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 select-none ${
                    isActive
                      ? "bg-purple-500/10 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.1)]"
                      : "bg-slate-950/40 border-slate-900/80 hover:border-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Circle initials placeholder */}
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[10px] text-purple-400 font-mono shrink-0">
                      {prof.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    <div className="min-w-0">
                      <h5 className={`text-xs font-bold truncate ${isActive ? "text-purple-300" : "text-slate-300"}`}>
                        {prof.name}
                      </h5>
                      <p className="text-[10px] text-slate-500 truncate">{prof.academicTarget}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Adaptive Response View card (Right 7/12) */}
        <div className="md:col-span-7 bg-slate-950/40 border border-slate-900 rounded-xl p-4.5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>AI Diagnostic Adaptation Profile</span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              ID: {activeProfile.id.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Needs focus */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500/80" /> Adaptive Focus Target Gaps
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProfile.needsPracticeIn.map((item, idx) => (
                  <span key={idx} className="bg-rose-500/10 text-rose-400 text-[10px] font-medium px-2 py-0.5 rounded border border-rose-500/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Confirmed Cognitive Strengths
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProfile.excelsIn.map((item, idx) => (
                  <span key={idx} className="bg-blue-500/10 text-blue-400 text-[10px] font-medium px-2 py-0.5 rounded border border-blue-500/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Persona Adaptive response mechanism */}
            <div className="p-3 bg-purple-500/5 border border-purple-500/15 rounded-lg space-y-1">
              <div className="text-[10px] font-mono font-bold text-purple-400 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Companion Persona Adjustments
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-normal">
                {activeProfile.aiPersonaAdaptation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIPersonalization;
