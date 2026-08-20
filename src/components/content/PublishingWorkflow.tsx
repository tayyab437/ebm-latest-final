import React from "react";
import { UploadCloud, CheckCircle2, Globe, Clock } from "lucide-react";

export function PublishingWorkflow() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <UploadCloud className="h-6 w-6 text-emerald-500" /> Publishing Hub
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Release Management & Deployment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-white mb-1">12</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Ready to Publish
          </p>
        </div>
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-white mb-1">456</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Live Items
          </p>
        </div>
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-white mb-1">3</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Scheduled Releases
          </p>
        </div>
      </div>

      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 text-center flex flex-col items-center justify-center py-20">
        <UploadCloud className="h-12 w-12 text-slate-600 mb-6" />
        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">
          Publishing Queue Empty
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
          There are no approved items waiting to be published to the live
          environment.
        </p>
        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          View Live Content
        </button>
      </div>
    </div>
  );
}
