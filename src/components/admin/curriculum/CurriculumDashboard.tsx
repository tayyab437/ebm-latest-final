import React from "react";
import { useCurriculumStore } from "./curriculum.store";
import { GraduationCap, BookOpen, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function CurriculumDashboard() {
  const programs = useCurriculumStore(state => state.programs);
  const subjects = useCurriculumStore(state => state.subjects);
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Curriculum Dashboard</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Overview of academic programs and content health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{programs.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Programs</div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{subjects.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subjects</div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">124</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Draft Lessons</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">8</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Review</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
            Content Health & Coverage
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">AI Metadata Coverage</span>
                <span className="font-bold text-emerald-600">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">Learning Outcome Mapping</span>
                <span className="font-bold text-blue-600">62%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-[62%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">EBM Skill Mapping</span>
                <span className="font-bold text-amber-500">40%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Missing Resources Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100 text-sm">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-900">Missing Videos in Year 1 Algebra</div>
                <div className="text-rose-700 mt-1">3 lessons in Unit 4 are missing instructional videos.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-sm">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900">Worksheets needed for Physics</div>
                <div className="text-amber-700 mt-1">O Level Physics Chapter 2 lacks practice worksheets.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
