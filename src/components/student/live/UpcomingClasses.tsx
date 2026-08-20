import React from "react";
import { useLiveStore } from "./live.store";
import { LiveClassCard } from "./LiveClassCard";
import { Clock, Filter, Search, Grid, List, Plus, Video } from "lucide-react";

export function UpcomingClasses() {
  const { classes, setSelectedClassId, workspaceUser, createClassWithMeet } = useLiveStore();
  const upcomingClasses = classes.filter(c => c.status === "SCHEDULED" || c.status === "LIVE");

  const handleScheduleTest = async () => {
    const testClass = {
      title: "Google Meet Test Session",
      description: "Auto-generated session to test Google Meet integration.",
      subject: "Technology",
      teacherId: workspaceUser?.uid || "teacher-1",
      teacherName: workspaceUser?.displayName || "Authorized Teacher",
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + 7200000).toISOString(),
    };
    await createClassWithMeet(testClass);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Upcoming Classes</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Your Scheduled Learning Sessions & Live Events</p>
        </div>
        <div className="flex items-center gap-3">
            {workspaceUser && (
              <button 
                onClick={handleScheduleTest}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Schedule Class (Meet)
              </button>
            )}
           <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1">
              <button className="p-2 bg-rose-500 text-white rounded-lg shadow-lg shadow-rose-500/20"><Grid className="h-4 w-4" /></button>
              <button className="p-2 text-slate-500 hover:text-white transition-all"><List className="h-4 w-4" /></button>
           </div>
           <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 w-64 group focus-within:border-rose-500/30 transition-all">
              <Search className="h-3.5 w-3.5 text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Find a session..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
           <button className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
             <Filter className="h-4 w-4" /> All Subjects
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingClasses.map((c) => (
          <LiveClassCard 
            key={c.id} 
            classItem={c} 
            onClick={() => {
              setSelectedClassId(c.id);
              // In a real app, navigate to Class Details view
            }}
          />
        ))}
        
        {/* Placeholder for "Add Class" for authorized roles could go here */}
        <div className="bg-white/[0.01] rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center p-8 min-h-[300px] group hover:bg-white/[0.02] hover:border-rose-500/30 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-8 w-8 text-slate-700 group-hover:text-rose-400" />
           </div>
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center max-w-[200px]">
             Stay tuned for more classes. Your AI tutor is currently optimizing your schedule.
           </p>
        </div>
      </div>
    </div>
  );
}
