import React, { useEffect, useState } from "react";
import { useLearningStore } from "./learning.store";
import { learningService } from "./learning.service";
import { Lesson } from "./learning.types";
import { VideoPlayer } from "./VideoPlayer";
import { NotesPanel } from "./NotesPanel";
import { Sparkles, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export function LessonPlayer() {
  const { currentLessonId, currentUnitId, toggleAssistant, setView } = useLearningStore();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    async function load() {
      if (currentUnitId && currentLessonId) {
        const lessons = await learningService.getLessons(currentUnitId);
        const l = lessons.find(x => x.id === currentLessonId);
        if (l) setLesson(l);
      }
    }
    load();
  }, [currentLessonId, currentUnitId]);

  if (!lesson) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto animate-in fade-in flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{lesson.title}</h2>
            {lesson.isDiagnostic === 1 && (
              <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-lg border border-amber-200 uppercase tracking-tight">
                Diagnostic Module {lesson.price && `• ${lesson.price}`}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-slate-500 mt-0.5">{lesson.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {lesson.isDiagnostic === 1 && (
            <button 
              onClick={() => {
                const num = lesson.whatsappNumber || "+923304541573";
                const text = encodeURIComponent(`Hi, I want to book the diagnostic lesson: ${lesson.title}`);
                window.open(`https://wa.me/${num.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
              }}
              className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Book on WhatsApp
            </button>
          )}
          <button 
            onClick={toggleAssistant}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-indigo-100"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Ask AI Tutor</span>
          </button>
        </div>
      </div>

      <VideoPlayer url={lesson.videoUrl} />

      <div className="mt-6 flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors rounded-xl hover:bg-slate-100">
          Mark as Incomplete
        </button>
        <button className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md">
          Next Lesson <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-20">
        <div className="lg:col-span-2">
          {/* Transcript/Overview Space */}
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" /> Lesson Objectives
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                Understand the difference between natural numbers, integers, and rational numbers.
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                Identify prime numbers up to 100.
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                Apply rules of divisibility to simplify fractions.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <NotesPanel />
        </div>
      </div>
    </div>
  );
}
