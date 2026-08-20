import React, { useState } from "react";
import { useExamStore } from "./exam.store";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Settings, 
  Eye, 
  Save, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Target,
  Clock,
  Layers,
  FileText,
  Search
} from "lucide-react";
import clsx from "clsx";

function SortableQuestionItem({ question, onRemove }: { question: any, onRemove: () => void, key?: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-6 group hover:border-rose-500/30 transition-all">
       <button {...attributes} {...listeners} className="p-2 text-slate-700 hover:text-slate-400 cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5" />
       </button>
       <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
             <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-[8px] font-black uppercase tracking-widest">{question.type}</span>
             <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{question.points} Points</span>
          </div>
          <p className="text-xs font-bold text-white line-clamp-1">{question.content}</p>
       </div>
       <button onClick={onRemove} className="p-2 text-slate-700 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 className="h-4 w-4" />
       </button>
    </div>
  );
}

export function ExamBuilder() {
  const { questionBank } = useExamStore();
  const [title, setTitle] = useState("Draft Assessment");
  const [examQuestions, setExamQuestions] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setExamQuestions((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addQuestion = (q: any) => {
    if (examQuestions.find(eq => eq.id === q.id)) return;
    setExamQuestions([...examQuestions, q]);
  };

  const removeQuestion = (id: string) => {
    setExamQuestions(examQuestions.filter(eq => eq.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <BookOpen className="h-8 w-8 text-rose-500" />
           </div>
           <div>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent border-none outline-none text-2xl font-black text-white tracking-tight uppercase w-96 focus:text-rose-400 transition-all"
              />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Building Visual Assessment Framework</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5">
             <Eye className="h-4 w-4" /> Preview
          </button>
          <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2">
             <Save className="h-4 w-4" /> Save Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Building Canvas */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                 <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <Layers className="h-5 w-5 text-rose-500" /> Assessment Structure
                 </h3>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <Target className="h-4 w-4" /> {examQuestions.reduce((acc, q) => acc + q.points, 0)} Total Points
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <Clock className="h-4 w-4" /> 45 Mins Est.
                    </div>
                 </div>
              </div>

              <div className="flex-1">
                 <DndContext 
                   sensors={sensors}
                   collisionDetection={closestCenter}
                   onDragEnd={handleDragEnd}
                 >
                   <SortableContext 
                     items={examQuestions.map(q => q.id)}
                     strategy={verticalListSortingStrategy}
                   >
                     <div className="space-y-3">
                       {examQuestions.map((q) => (
                         <SortableQuestionItem 
                           key={q.id} 
                           question={q} 
                           onRemove={() => removeQuestion(q.id)} 
                         />
                       ))}
                       {examQuestions.length === 0 && (
                          <div className="h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all group">
                             <Plus className="h-12 w-12 text-slate-600 mb-4 group-hover:text-rose-500 transition-colors" />
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Drag questions from the bank or use AI to start building</p>
                          </div>
                       )}
                     </div>
                   </SortableContext>
                 </DndContext>
              </div>
           </div>
        </div>

        {/* Right: Question Bank / AI Sidepanel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 flex flex-col h-[700px] overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Repository</h3>
                 <button className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Quick AI Add
                 </button>
              </div>
              <div className="p-4 border-b border-white/5">
                 <div className="flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 group focus-within:border-rose-500/30 transition-all">
                    <Search className="h-4 w-4 text-slate-700 mr-3" />
                    <input type="text" placeholder="Filter bank..." className="bg-transparent border-none outline-none text-[10px] font-bold text-white w-full" />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 {questionBank.map((q) => (
                    <div 
                      key={q.id} 
                      onClick={() => addQuestion(q)}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group"
                    >
                       <div className="flex items-center justify-between mb-2">
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-500 text-[7px] font-black uppercase tracking-widest">{q.type}</span>
                          <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">{q.points}p</span>
                       </div>
                       <p className="text-[10px] font-bold text-slate-300 leading-tight line-clamp-2">{q.content}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
