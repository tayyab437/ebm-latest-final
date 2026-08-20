import React, { useEffect, useState } from "react";
import { useLearningStore } from "./learning.store";
import { learningService } from "./learning.service";
import { Subject, LearningProgress } from "./learning.types";
import { BookOpen, Clock, Target, PlayCircle, Sparkles } from "lucide-react";
import clsx from "clsx";

export function SubjectDashboard() {
  const { setSubject } = useLearningStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [progressData, setProgressData] = useState<Record<string, LearningProgress>>({});

  useEffect(() => {
    async function load() {
      const subs = await learningService.getSubjects();
      setSubjects(subs);
      
      const prog: Record<string, LearningProgress> = {};
      for (const s of subs) {
        const p = await learningService.getProgress(s.id);
        if (p) prog[s.id] = p;
      }
      setProgressData(prog);
    }
    load();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Subjects</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const progress = progressData[subject.id];
          const completion = progress?.completionPercentage || 0;
          
          return (
            <div 
              key={subject.id} 
              onClick={() => setSubject(subject.id)}
              className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
            >
              <div className={clsx("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30", subject.color)}></div>
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner", subject.color)}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  {subject.code}
                </div>
              </div>

              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                  {subject.description}
                </p>
              </div>

              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Progress</span>
                  <span className="text-xs font-bold text-slate-700">{completion}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={clsx("h-full rounded-full transition-all duration-1000", subject.color)} 
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 relative z-10 border-t border-slate-100 pt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Lessons</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{subject.totalLessons}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Est. Time</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{subject.estimatedHours}h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
