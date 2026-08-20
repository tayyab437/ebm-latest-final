import React from "react";
import { CheckCircle2, ShieldAlert, Sparkles, MonitorPlay } from "lucide-react";
import { ADMISSION_REQUIREMENTS_DATA } from "./admissions.data";

export const RequirementsChecklist: React.FC = () => {
  const categories = Array.from(
    new Set(ADMISSION_REQUIREMENTS_DATA.map((item) => item.category))
  );

  const getStatusBadge = (status: "required" | "optional" | "recommended") => {
    switch (status) {
      case "required":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-mono font-medium text-rose-400 uppercase">
            Required
          </span>
        );
      case "recommended":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono font-medium text-amber-400 uppercase">
            Recommended
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[9px] font-mono font-medium text-slate-400 uppercase">
            Optional
          </span>
        );
    }
  };

  return (
    <div className="py-12" id="admission-requirements-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Design/Header */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
            System Pre-Requisites
          </span>
          <h3 className="text-2xl font-sans font-medium text-white tracking-tight">
            Academic & Technical Entry Requirements
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            To maintain high cohort speeds and ensure the Socratic AI model adapts properly, students must satisfy standard tech and diagnostic entry baseline criteria.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex gap-3.5">
            <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-sans font-semibold text-slate-200">Have an older setup?</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                EBM renders lightweight vector visuals optimized specifically to run inside basic Chromebook configurations and low-bandwidth channels.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Checklist Categories */}
        <div className="lg:col-span-7 space-y-8">
          {categories.map((category) => (
            <div key={category} className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                {category}
              </h4>
              <div className="space-y-3">
                {ADMISSION_REQUIREMENTS_DATA.filter((item) => item.category === category).map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-slate-900/20 border border-slate-800/50 hover:border-slate-800 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${req.status === 'required' ? 'text-blue-500' : 'text-slate-500'}`} />
                        <span className="text-sm font-sans font-semibold text-slate-200">
                          {req.title}
                        </span>
                      </div>
                      <div className="self-start sm:self-auto shrink-0">
                        {getStatusBadge(req.status)}
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed pl-6.5">
                      {req.description}
                    </p>

                    {/* Devices list if available */}
                    {req.devices && req.devices.length > 0 && (
                      <div className="mt-3 pl-6.5 flex flex-wrap gap-1.5">
                        {req.devices.map((device, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-slate-400"
                          >
                            <MonitorPlay className="w-3 h-3 text-slate-500" />
                            {device}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequirementsChecklist;
