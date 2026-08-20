import React, { useMemo, useState, useEffect } from "react";
import { useCommunicationStore } from "./communication.store";
import { Megaphone, Pin, Search, Filter, X, Calendar, PlusCircle, Check } from "lucide-react";
import clsx from "clsx";

export function AnnouncementCenter() {
  const { announcements, createAnnouncement, contacts, fetchAnnouncements, fetchContacts } = useCommunicationStore();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTarget, setNewTarget] = useState<"ALL" | "STUDENT" | "TEACHER" | "PARENT" | "SPECIFIC">("ALL");
  const [selectedContactId, setSelectedContactId] = useState("");

  useEffect(() => {
    fetchAnnouncements();
    fetchContacts();
  }, [fetchAnnouncements, fetchContacts]);

  const activeUser = useMemo(() => {
    try {
      const saved = localStorage.getItem("ebm_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          id: parsed.id || parsed.userId || "u1",
          name: parsed.name || "You",
          role: parsed.role || "STUDENT"
        };
      }
    } catch (e) {}
    return { id: "u1", name: "You", role: "STUDENT" };
  }, []);

  const studentsList = useMemo(() => {
    return contacts.filter(c => c.role === "STUDENT");
  }, [contacts]);

  // Handle creating announcement
  const handleSubmitAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const finalAudience = newTarget === "SPECIFIC" ? [selectedContactId] : [newTarget];
    
    await createAnnouncement({
      title: newTitle.trim(),
      content: newContent.trim(),
      targetAudience: finalAudience,
      priority: "INFO" as any
    });

    setNewTitle("");
    setNewContent("");
    setNewTarget("ALL");
    setSelectedContactId("");
    setIsCreateOpen(false);
  };

  // Filter announcements based on logged-in user role/ID & search query
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(ann => {
      // 1. Audience Filter
      let isRecipient = false;
      if (activeUser.role === "ADMIN") {
        isRecipient = true; // Admin sees everything
      } else if (activeUser.role === "TEACHER") {
        // Teacher sees all, teacher-targeted, or those they created themselves
        isRecipient = ann.targetAudience.includes("ALL") || 
                      ann.targetAudience.includes("TEACHER") || 
                      ann.author.id === activeUser.id;
      } else if (activeUser.role === "STUDENT") {
        // Student sees all, student-targeted, or specific student IDs
        isRecipient = ann.targetAudience.includes("ALL") || 
                      ann.targetAudience.includes("STUDENT") || 
                      ann.targetAudience.includes(activeUser.id);
      } else if (activeUser.role === "PARENT") {
        // Parent sees all, parent-targeted, or specific parent IDs
        isRecipient = ann.targetAudience.includes("ALL") || 
                      ann.targetAudience.includes("PARENT") || 
                      ann.targetAudience.includes(activeUser.id);
      }

      if (!isRecipient) return false;

      // 2. Search query filter
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return ann.title.toLowerCase().includes(q) || 
             ann.content.toLowerCase().includes(q) ||
             ann.author.name.toLowerCase().includes(q);
    });
  }, [announcements, activeUser, search]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Announcements</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Official Broadcasts & Updates</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH..."
              className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 uppercase tracking-widest w-48 shadow-sm"
            />
          </div>
          
          {(activeUser.role === "TEACHER" || activeUser.role === "ADMIN") && (
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="px-4 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-rose-200"
            >
              <PlusCircle className="h-4 w-4" /> Create Broadcast
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pinned Announcement */}
        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-rose-50 to-white rounded-[2rem] border border-rose-100 p-8 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-3xl rounded-full -z-10" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Pin className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">Featured</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Just now</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">EBM Term 2 Examination Schedule</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                The final schedule for the upcoming Term 2 examinations has been released. Please review the dates carefully. All exams will be conducted via the EBM Assessment platform. Ensure your systems are updated before the first exam on Monday.
              </p>
              <div className="mt-6 flex items-center gap-3">
                 <button className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors shadow-md shadow-rose-200">
                    View Schedule
                 </button>
              </div>
            </div>
          </div>
        </div>

        {filteredAnnouncements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 hover:border-rose-200 transition-colors flex flex-col relative group shadow-sm hover:shadow-md transition-all">
            {ann.targetAudience.includes(activeUser.id) && (
              <span className="absolute top-4 right-4 text-[8px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                For You Only
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <Megaphone className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{ann.author.name}</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{ann.author.role}</p>
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">{ann.title}</h3>
            
            <div className="flex flex-wrap gap-1 mt-1 mb-3">
              {ann.targetAudience.map(t => {
                let label = t;
                let colorClass = "bg-slate-100 text-slate-500 border-slate-200";
                if (t === "ALL") {
                  label = "All Users";
                  colorClass = "bg-blue-50 text-blue-600 border-blue-100";
                } else if (t === "STUDENT") {
                  label = "Students";
                  colorClass = "bg-emerald-50 text-emerald-600 border-emerald-100";
                } else if (t === "TEACHER") {
                  label = "Teachers";
                  colorClass = "bg-purple-50 text-purple-600 border-purple-100";
                } else if (t === "PARENT") {
                  label = "Parents";
                  colorClass = "bg-amber-50 text-amber-600 border-amber-100";
                } else {
                  const matched = contacts.find(c => c.id === t);
                  label = matched ? `Direct: ${matched.name}` : `Direct User`;
                  colorClass = "bg-rose-50 text-rose-600 border-rose-100";
                }
                return (
                  <span key={t} className={`text-[8px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-md ${colorClass}`}>
                    {label}
                  </span>
                );
              })}
            </div>

            <p className="text-xs text-slate-600 line-clamp-3 mb-6 flex-1 whitespace-pre-wrap leading-relaxed">
              {ann.content}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {new Date(ann.createdAt).toLocaleDateString()}
              </span>
              <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:text-rose-700">
                Read More
              </button>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-slate-400 text-xs uppercase font-bold tracking-widest">
            No announcements found.
          </div>
        )}
      </div>

      {/* Create Broadcast Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="text-sm font-black text-rose-600 uppercase tracking-widest">Create Official Broadcast</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Publish announcement to the community</p>
              </div>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitAnnouncement} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Announcement Title</label>
                <input 
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Physics Revision Class Time Change"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Target Audience</label>
                  <select 
                    value={newTarget}
                    onChange={(e: any) => setNewTarget(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500/50 shadow-sm"
                  >
                    <option value="ALL">All Users</option>
                    <option value="STUDENT">All Students</option>
                    <option value="TEACHER">All Teachers</option>
                    <option value="PARENT">All Parents</option>
                    <option value="SPECIFIC">Specific Contact Only</option>
                  </select>
                </div>

                {newTarget === "SPECIFIC" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Select Contact</label>
                    <select 
                      required
                      value={selectedContactId}
                      onChange={(e) => setSelectedContactId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500/50 shadow-sm"
                    >
                      <option value="" disabled>Select Contact...</option>
                      
                      <optgroup label="Teachers" className="text-rose-600">
                        {contacts.filter(c => c.role === "TEACHER" || c.role === "ADMIN").map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.role})</option>
                        ))}
                      </optgroup>

                      <optgroup label="Students" className="text-rose-600">
                        {contacts.filter(c => c.role === "STUDENT").map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.gradeLevel || "Student"})</option>
                        ))}
                      </optgroup>

                      <optgroup label="Parents" className="text-rose-600">
                        {contacts.filter(c => c.role === "PARENT").map(c => (
                          <option key={c.id} value={c.id}>{c.name} (Parent Partner)</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Announcement Message</label>
                <textarea 
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Type official update message here..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 resize-none shadow-sm"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-rose-200"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
