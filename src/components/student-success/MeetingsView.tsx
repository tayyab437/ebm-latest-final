import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { 
  Users, Plus, Calendar, Clock, MapPin, Phone, Video, 
  CheckCircle, ChevronRight, MessageSquare, AlertTriangle, AlertCircle
} from "lucide-react";

export function MeetingsView() {
  const { upcomingMeetings, riskProfiles, scheduleMeeting, activeStudentId } = useStudentSuccessStore();
  const [showForm, setShowForm] = useState(false);

  const [studentId, setStudentId] = useState(activeStudentId || "s1");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-07-20");
  const [time, setTime] = useState("16:30");
  const [type, setType] = useState<any>("ONLINE");
  const [parentName, setParentName] = useState("Mrs. Mercer");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const formattedDate = `${date} at ${time}`;

    scheduleMeeting({
      studentId,
      title,
      date: formattedDate,
      type,
      participants: [
        { id: "p_" + Date.now(), name: `${parentName} (Parent)`, role: "PARENT" },
        { id: "t1", name: "Dr. Sarah Jenkins", role: "TEACHER" }
      ],
      notes,
    });

    // Reset Form
    setTitle("");
    setNotes("");
    setShowForm(false);
  };

  const getMeetingIcon = (t: string) => {
    switch (t) {
      case "ONLINE":
        return <Video className="h-5 w-5 text-emerald-400" />;
      case "PHONE":
        return <Phone className="h-5 w-5 text-blue-400" />;
      default:
        return <MapPin className="h-5 w-5 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Users className="h-6 w-6 text-rose-500" /> Parent-Teacher Advisory Council
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Coordinated Consultations, Homework Alignment & Feedback Sessions
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Close Scheduler" : "Schedule Parent Advisory"}
        </button>
      </div>

      {/* Schedule meeting form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0A1120] border border-white/5 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
            Propose Advisory Council Meeting
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Student Subject</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              >
                {riskProfiles.map(p => (
                  <option key={p.studentId} value={p.studentId}>
                    {p.studentName} ({p.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meeting Medium</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                >
                  <option value="ONLINE">ONLINE (VIDEO CHAT)</option>
                  <option value="IN_PERSON">IN PERSON</option>
                  <option value="PHONE">TELEPHONE CALL</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Parent Contact</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Mercer"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Time Slot</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Agenda Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Alex Mercer: Routine Homework Gaps & AI Coaching Setup"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meeting Prep / Notes</label>
              <textarea
                rows={2}
                placeholder="Write specific focus areas or materials parents should prepare..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Dispatch Schedule Request
            </button>
          </div>
        </form>
      )}

      {/* Scheduled parent meetings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {upcomingMeetings.map(meeting => {
          const profile = riskProfiles.find(p => p.studentId === meeting.studentId);
          return (
            <div key={meeting.id} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 space-y-6 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getMeetingIcon(meeting.type)}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{profile?.studentName || "Alex Mercer"}</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{meeting.type} Meeting</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {meeting.status}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meeting Agenda</h4>
                <p className="text-xs text-white font-bold uppercase tracking-wider leading-snug">{meeting.title}</p>
              </div>

              {meeting.notes && (
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Coordinator Notes</h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{meeting.notes}</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confirmed Attendees</h4>
                <div className="flex flex-wrap gap-2">
                  {meeting.participants.map(p => (
                    <span key={p.id} className="px-2.5 py-1 rounded-lg bg-black/40 text-[9px] font-bold text-slate-300 uppercase border border-white/5">
                      {p.name} ({p.role})
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <Clock className="h-4 w-4 text-rose-500" /> {meeting.date}
                </span>
              </div>
            </div>
          );
        })}

        {upcomingMeetings.length === 0 && (
          <div className="col-span-2 text-center py-20 bg-[#0A1120] rounded-[2rem] border border-white/5">
            <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">No meetings scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
