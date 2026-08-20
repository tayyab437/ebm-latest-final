import React from "react";
import { motion } from "motion/react";
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  DollarSign, 
  Server, 
  BookOpen, 
  HelpCircle, 
  Plus,
  TrendingUp,
  Settings
} from "lucide-react";
import { WidgetCard } from "./WidgetCard";
import { ADMIN_WIDGETS } from "./dashboard.constants";

export const AdminPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/10 dark:border-rose-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Operations & Ecosystem Administration
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            SuperAdmin &bull; EBM Digital Core 🏢
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Integrations, registry audits, subscription loops, and system wellness panels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400 rounded-lg text-xs font-semibold">
            <Server className="h-4 w-4 text-rose-500" />
            <span>Core Servers Online</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-rose-600/10">
            <Settings className="h-4 w-4" />
            <span>Platform Settings</span>
          </button>
        </div>
      </div>

      {/* Grid containing Admin Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ADMIN_WIDGETS.map((widget) => (
          <WidgetCard
            key={widget.id}
            title={widget.title}
            value={widget.value}
            subtitle={widget.subtitle}
            type={widget.type}
            iconName={widget.iconName}
            badge={widget.badge}
          />
        ))}
      </div>

      {/* Grid structure for course management, server status, tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course management and registrations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Courses List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Accelerated Stream Enrollment Management
              </h4>
              <span className="text-xs text-slate-400">10 Active Pathways</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">CIE O-Level 3-Year Accel Math</h5>
                  <p className="text-3xs text-slate-400">420 Active Students enrolled &bull; 8 Core Mentors</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">$18,400 MRR</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Socratic English Language Masterclass</h5>
                  <p className="text-3xs text-slate-400">340 Active Students enrolled &bull; 4 Core Mentors</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">$12,900 MRR</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Gauges */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span>Real-time Resource Micro-telemetry</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-2xs">
                  <span className="font-medium text-slate-500">Database Connection Pool</span>
                  <span className="text-blue-500 font-bold">14/200 active</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "7%" }} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-2xs">
                  <span className="font-medium text-slate-500">Gemini API Ingress / Latency</span>
                  <span className="text-blue-500 font-bold">120ms &bull; Clean</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "12%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Recent tickets, System operations info */}
        <div className="space-y-6">
          {/* Active Support Tickets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" />
              <span>Support Queue (1 Critical)</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-l-4 border-l-rose-500 border border-slate-100 dark:border-slate-800 rounded-r-xl">
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className="font-bold text-rose-600 uppercase">Critical Integration</span>
                  <span className="text-slate-400">12m ago</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                  Socratic voice assistant microphone permission issue on iOS 17.5.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-l-4 border-l-zinc-300 border border-slate-100 dark:border-slate-800 rounded-r-xl">
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className="font-bold text-slate-600 uppercase">Billing Enquiry</span>
                  <span className="text-slate-400">1h ago</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Request for custom multi-sibling invoice generation.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Settings Summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Maintenance Loop
            </h4>
            <ul className="text-2xs text-slate-500 dark:text-slate-400 space-y-2">
              <li>&bull; DB backup executed on June 29th (01:00)</li>
              <li>&bull; Cleaned 1,420 expired cache worksheets</li>
              <li>&bull; 2-Factor Authentication required for all Staff</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
