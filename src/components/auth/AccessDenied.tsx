import React from "react";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

interface AccessDeniedProps {
  onBackToHome: () => void;
  requiredRole?: string;
  currentRole?: string;
}

export function AccessDenied({ onBackToHome, requiredRole, currentRole }: AccessDeniedProps) {
  return (
    <div
      id="access-denied-container"
      className="text-center space-y-6 max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl shadow-slate-100/40"
    >
      <div className="flex justify-center">
        <div className="bg-red-50 border border-red-200 p-4 rounded-full text-red-500 shadow-sm">
          <ShieldAlert className="h-12 w-12" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Access Restricted</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your current security clearance level is insufficient to access this administrative portal section. 
          The Ejaz Bukhari Method (EBM) separates Student, Parent, and Teacher dashboards to maintain syllabus integrity.
        </p>
      </div>

      {(requiredRole || currentRole) && (
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-[11px] font-mono text-slate-600 flex flex-col gap-1 text-left">
          {requiredRole && (
            <div>
              <span className="font-bold text-slate-400 uppercase">Required Role:</span>{" "}
              <span className="text-red-600 font-bold">{requiredRole}</span>
            </div>
          )}
          {currentRole && (
            <div>
              <span className="font-bold text-slate-400 uppercase">Your Role:</span>{" "}
              <span className="text-slate-800 font-bold">{currentRole}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 pt-2">
        <button
          id="denied-home-btn"
          type="button"
          onClick={onBackToHome}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          id="denied-back-btn"
          type="button"
          onClick={() => window.history.back()}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-200/60 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back Previous Page</span>
        </button>
      </div>
    </div>
  );
}
