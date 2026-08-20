import React, { useEffect, useState } from "react";
import { useLearningStore } from "./learning.store";
import { learningService } from "./learning.service";
import { Subject, Unit, Lesson } from "./learning.types";
import { PlayCircle, CheckCircle, Clock, FileText, ChevronDown, ChevronRight, Lock } from "lucide-react";
import { useDashboardStore } from "../dashboard/dashboard.store";
import clsx from "clsx";

export function SubjectDetail() {
  const { currentSubjectId, setLesson } = useLearningStore();
  const { data: dashboardData } = useDashboardStore();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  const unlockedDiagnostics = dashboardData?.unlockedDiagnostics || [];

  useEffect(() => {
    async function load() {
      if (!currentSubjectId) return;
      const sub = await learningService.getSubjectDetails(currentSubjectId);
      if (sub) setSubject(sub);

      const un = await learningService.getUnits(currentSubjectId);
      setUnits(un);

      const lmap: Record<string, Lesson[]> = {};
      const exp: Record<string, boolean> = {};
      for (const u of un) {
        lmap[u.id] = await learningService.getLessons(u.id);
        exp[u.id] = true; // expand all by default for demo
      }
      setLessonsMap(lmap);
      setExpandedUnits(exp);
    }
    load();
  }, [currentSubjectId]);

  if (!subject) return null;

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Subject Header */}
      <div className={clsx("rounded-3xl p-8 text-white shadow-lg mb-8 relative overflow-hidden", subject.color)}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                {subject.code}
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                {subject.difficulty}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{subject.name}</h1>
            <p className="text-white/80 font-medium max-w-2xl">{subject.description}</p>
          </div>
          <div className="flex gap-4 shrink-0 bg-black/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black">{subject.totalUnits}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Units</span>
            </div>
            <div className="w-px bg-white/20 my-2"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black">{subject.totalLessons}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Lessons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum CurriculumTree */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Curriculum Structure</h3>
        
        <div className="space-y-3">
          {units.map(unit => {
            const isExpanded = expandedUnits[unit.id];
            const unitLessons = lessonsMap[unit.id] || [];
            
            return (
              <div key={unit.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 font-bold text-xs shrink-0">
                      {unit.orderIndex}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{unit.title}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{unit.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-flex text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white px-2 py-1 rounded border border-slate-200">
                      {unit.totalLessons} Lessons
                    </span>
                    {isExpanded ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="p-2 border-t border-slate-200 bg-white">
                    {unitLessons.map(lesson => {
                      const isDiag = lesson.isDiagnostic === 1;
                      const isUnlocked = !isDiag || unlockedDiagnostics.includes(lesson.id);

                      return (
                        <button 
                          key={lesson.id}
                          onClick={() => {
                            if (!isUnlocked) {
                              const num = lesson.whatsappNumber || "+923304541573";
                              const text = encodeURIComponent(`Hi, I want to book the diagnostic lesson: ${lesson.title}`);
                              window.open(`https://wa.me/${num.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                              return;
                            }
                            setLesson(lesson.id, unit.id, currentSubjectId!);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                        >
                          <div className="shrink-0 mt-0.5">
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
                            ) : !isUnlocked ? (
                              <Lock className="h-5 w-5 text-amber-500" />
                            ) : (
                              <PlayCircle className="h-5 w-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            )}
                          </div>
                          {isDiag && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 shadow-xs">
                              <img 
                                src={lesson.thumbnailUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=100"} 
                                alt={lesson.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h5 className={clsx(
                                "text-sm font-semibold truncate transition-colors",
                                lesson.isCompleted ? "text-slate-700" : "text-slate-900 group-hover:text-indigo-600",
                                !isUnlocked && "text-slate-500"
                              )}>
                                {lesson.orderIndex}. {lesson.title}
                              </h5>
                              {isDiag && (
                                <span className={clsx(
                                  "text-[9px] font-black px-1.5 py-0.5 rounded-md border uppercase tracking-tighter",
                                  isUnlocked 
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                )}>
                                  Diagnostic {lesson.price && `• ${lesson.price}`} {isUnlocked ? "(Unlocked)" : "(Locked)"}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                                <Clock className="h-3 w-3" /> {lesson.durationMinutes}m
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                                <FileText className="h-3 w-3" /> {lesson.type}
                              </span>
                            </div>
                          </div>
                          {isDiag && !isUnlocked && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const num = lesson.whatsappNumber || "+923304541573";
                                const text = encodeURIComponent(`Hi, I want to book the diagnostic lesson: ${lesson.title}`);
                                window.open(`https://wa.me/${num.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              Book on WhatsApp
                            </button>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
