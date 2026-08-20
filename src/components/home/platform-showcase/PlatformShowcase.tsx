import React, { useState } from "react";
import { ShowcaseNavigation } from "./ShowcaseNavigation";
import { DashboardPreview } from "./DashboardPreview";
import { Sparkles, Terminal } from "lucide-react";

const PlatformShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <section 
      id="platform-showcase" 
      className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading with high contrast refined typography */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 rounded-full text-2xs font-extrabold uppercase tracking-widest">
            <Sparkles className="h-3 w-3 fill-blue-500/10" />
            <span>Interactive Platform Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight leading-none">
            Experience the EBM Learning Platform Before You Join
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
            Explore the powerful dashboards, learning tools, analytics, AI features, assessments, and parent monitoring system that make EBM a complete digital learning ecosystem.
          </p>
        </div>

        {/* Triple column main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left panel selector */}
          <div className="lg:col-span-1 space-y-4">
            <ShowcaseNavigation 
              activeTab={activeTab} 
              onTabChange={(id) => setActiveTab(id)} 
            />
          </div>

          {/* Right Preview container card simulating a modern macOS browser frame */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Mock browser header frame bar */}
            <div className="bg-slate-100/70 dark:bg-slate-900/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 dark:bg-rose-500/30 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/30 inline-block" />
                <span className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-500/30 inline-block" />
              </div>

              {/* URL bar indicator */}
              <div className="bg-slate-200/50 dark:bg-slate-950/60 px-4 py-1.5 rounded-xl text-3xs font-mono text-slate-500 dark:text-slate-400 w-1/2 text-center select-none truncate">
                https://portal.ebm.edu/dashboard/{activeTab}
              </div>

              {/* Status lights */}
              <div className="flex items-center gap-1 text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="hidden sm:inline">Portal Active</span>
              </div>
            </div>

            {/* Inner Dashboard View Screen */}
            <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950/20 flex-1 min-h-[500px] overflow-y-auto scrollbar-thin">
              <DashboardPreview activeTab={activeTab} />
            </div>
          </div>
        </div>

        {/* Micro-telemetry details explaining the production readiness */}
        <div className="text-center text-3xs font-mono text-slate-400 pt-6">
          <span>Simulation Active &bull; Database Adapter models mapped &bull; API Service schema prepared</span>
        </div>

      </div>
    </section>
  );
};

export default PlatformShowcase;
