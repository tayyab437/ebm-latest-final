import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Home, Search, ArrowLeft, GraduationCap } from "lucide-react";
import { SEOHead } from "../SEOHead";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 bg-slate-50 text-slate-800 font-sans">
      <SEOHead 
        title="404 Page Not Found | Ejaz Bukhari Method Learning Portal"
        description="The page you are looking for could not be found. Return to the EBM homepage to explore Mathematics, English Comprehension, and diagnostic learning tools."
      />

      <div className="max-w-lg w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00a3e0]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-20 h-20 bg-[#00a3e0]/15 text-[#00a3e0] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00a3e0] uppercase bg-[#00a3e0]/10 px-3 py-1 rounded-full">
            Error 404
          </span>
          <h1 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            We couldn't locate the learning resource or URL you requested. It might have been moved or updated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#00a3e0] hover:bg-[#008bc2] text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            EBM Homepage
          </Link>
        </div>

        <div className="border-t border-slate-100 pt-6 mt-6 text-left space-y-2">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Popular Navigation Destinations
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link to="/assessment" className="text-[#00a3e0] hover:underline flex items-center gap-1">
              • Diagnostic Assessment
            </Link>
            <Link to="/analytics" className="text-[#00a3e0] hover:underline flex items-center gap-1">
              • Diagnostic Evidence
            </Link>
            <Link to="/pricing" className="text-[#00a3e0] hover:underline flex items-center gap-1">
              • Pricing & Plans
            </Link>
            <Link to="/about" className="text-[#00a3e0] hover:underline flex items-center gap-1">
              • EBM Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
