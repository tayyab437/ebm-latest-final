import React, { useState } from "react";
import { 
  Download, 
  FileText, 
  Sparkles, 
  Check, 
  Clock, 
  Eye, 
  ChevronRight 
} from "lucide-react";
import { AIResource } from "./ai-learning.types";

interface AIResourcesProps {
  resources: AIResource[];
}

export const AIResources: React.FC<AIResourcesProps> = ({ resources }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownloadTrigger = (id: string) => {
    if (downloadingId || downloadedIds.includes(id)) return;
    setDownloadingId(id);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, id]);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            On-Demand Socratic Resources
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Click download to simulate retrieving dynamically generated exam prep assets compiled by our AI mentor.
          </p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 font-mono self-start sm:self-center">
          Instant Compile
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {resources.map((res) => {
          const isDownloading = downloadingId === res.id;
          const isDownloaded = downloadedIds.includes(res.id);

          return (
            <div
              key={res.id}
              className="relative p-5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-full group"
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {res.type}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{res.estimatedStudyTime}</span>
                  </div>
                </div>

                <h5 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                  {res.title}
                </h5>

                <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-normal">
                  {res.description}
                </p>
              </div>

              {/* Action and stats footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-900/60 flex items-center justify-between gap-4">
                <span className="text-[9px] text-slate-500 font-mono">
                  Downloads: <strong className="text-slate-400">{res.downloadsCount + (isDownloaded ? 1 : 0)}</strong>
                </span>

                <button
                  id={`btn-resource-dl-${res.id}`}
                  onClick={() => handleDownloadTrigger(res.id)}
                  disabled={isDownloading}
                  className={`flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 select-none ${
                    isDownloaded
                      ? "bg-blue-500/10 border-blue-500/20 text-blue-400 cursor-default"
                      : isDownloading
                      ? "bg-slate-900 border-slate-800 text-slate-400"
                      : "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white"
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                      <span>Ready</span>
                    </>
                  ) : isDownloading ? (
                    <>
                      <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-500 group-hover:animate-bounce shrink-0" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AIResources;
