import React from "react";
import { History, MessageSquare, ArrowRight, Clock, Search, MoreVertical, Trash2 } from "lucide-react";

export function AIHistory() {
  const sessions = [
    { id: 1, title: "Kinematics practice questions", subject: "Physics", date: "Today, 10:30 AM", type: "Chat", messages: 12 },
    { id: 2, title: "Essay structure feedback", subject: "English", date: "Yesterday, 4:15 PM", type: "Writing Coach", messages: 4 },
    { id: 3, title: "Algebra equations review", subject: "Mathematics", date: "Oct 24, 2026", type: "Chat", messages: 24 },
    { id: 4, title: "Newton's laws summary", subject: "Physics", date: "Oct 22, 2026", type: "Chat", messages: 8 },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Conversation History</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Access your previous AI interactions</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search history..." 
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors truncate">{session.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{session.subject}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {session.date}</span>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                  {session.messages} messages
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
