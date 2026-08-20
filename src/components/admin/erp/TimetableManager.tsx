import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, Users, Download, Plus, Filter, Search, 
  MoreHorizontal, LayoutGrid, Check, X, Trash2, Edit2, Loader2, 
  RefreshCw, AlertCircle, CheckCircle2, HelpCircle, BookOpen, User
} from "lucide-react";

interface TimetableSlot {
  id: string;
  classId: string;
  day: string;
  timeSlot: string;
  subject: string;
  topic: string | null;
  teacherId: string | null;
  room: string | null;
}

interface ClassEntity {
  id: string;
  name: string;
  subjects: string[] | string | null;
  gradeLevel: string;
  room: string;
}

interface TeacherEntity {
  id: string;
  name: string;
  department: string;
}

export function TimetableManager() {
  const times = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // States
  const [classes, setClasses] = useState<ClassEntity[]>([]);
  const [teachers, setTeachers] = useState<TeacherEntity[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  
  // Modal Fields
  const [targetDay, setTargetDay] = useState("");
  const [targetTimeSlot, setTargetTimeSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [room, setRoom] = useState("");

  // Auto-fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch classes
      const classRes = await fetch("/api/teacher/classes");
      const classData = await classRes.json();
      let fetchedClasses: ClassEntity[] = [];
      if (classData.success && classData.classes) {
        fetchedClasses = classData.classes;
        setClasses(fetchedClasses);
      }

      // 2. Fetch teachers
      const teacherRes = await fetch("/api/admin/teachers");
      const teacherData = await teacherRes.json();
      if (teacherData.success && teacherData.teachers) {
        setTeachers(teacherData.teachers);
      }

      // 3. Fetch current timetable slots
      const timetableRes = await fetch("/api/timetable");
      const timetableData = await timetableRes.json();
      if (timetableData.success && timetableData.timetable) {
        setTimetable(timetableData.timetable);
      }

      // Automatically select first class if none selected
      if (fetchedClasses.length > 0 && !selectedClassId) {
        setSelectedClassId(fetchedClasses[0].id);
      }
    } catch (e: any) {
      triggerError("Failed to synchronize timetable from database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 5000);
  };

  // Clicked on a timeslot cell
  const handleCellClick = (day: string, timeSlot: string, existingSlot?: TimetableSlot) => {
    if (!selectedClassId) {
      triggerError("Please select a class first using the dropdown filter.");
      return;
    }

    if (existingSlot) {
      setEditingSlot(existingSlot);
      setTargetDay(existingSlot.day);
      setTargetTimeSlot(existingSlot.timeSlot);
      setSubject(existingSlot.subject);
      setTopic(existingSlot.topic || "");
      setTeacherId(existingSlot.teacherId || "");
      setRoom(existingSlot.room || "");
    } else {
      // Empty cell clicked -> Create mode
      setEditingSlot(null);
      setTargetDay(day);
      setTargetTimeSlot(timeSlot);
      
      // Auto pre-populate class room if available
      const currentClass = classes.find(c => c.id === selectedClassId);
      setRoom(currentClass?.room || "");
      
      // Get first subject offered by class if available
      let subjectsList: string[] = [];
      if (currentClass) {
        if (Array.isArray(currentClass.subjects)) {
          subjectsList = currentClass.subjects;
        } else if (typeof currentClass.subjects === "string") {
          try {
            subjectsList = JSON.parse(currentClass.subjects);
          } catch (e) {
            subjectsList = [];
          }
        }
      }
      setSubject(subjectsList[0] || "");
      setTopic("");
      setTeacherId("");
    }
    setIsModalOpen(true);
  };

  // Submit create or update slot
  const handleSlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      triggerError("Academic Subject is required.");
      return;
    }

    const payload = {
      classId: selectedClassId,
      day: targetDay,
      timeSlot: targetTimeSlot,
      subject,
      topic: topic.trim() || null,
      teacherId: teacherId || null,
      room: room.trim() || null
    };

    try {
      if (editingSlot) {
        // PUT update
        const res = await fetch(`/api/timetable/${editingSlot.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess(`Timetable slot updated successfully.`);
          setIsModalOpen(false);
          fetchData();
        } else {
          triggerError(data.error || "Conflict detected or failed to save.");
        }
      } else {
        // POST create
        const res = await fetch("/api/timetable", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("New lecture slot scheduled successfully!");
          setIsModalOpen(false);
          fetchData();
        } else {
          triggerError(data.error || "Conflict detected or failed to create.");
        }
      }
    } catch (err: any) {
      triggerError("Connection error while scheduling: " + err.message);
    }
  };

  // Delete slot
  const handleDeleteSlot = async (id: string) => {
    if (confirm("Are you sure you want to remove this timetable slot from the schedule?")) {
      try {
        const res = await fetch(`/api/timetable/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("Scheduled slot removed.");
          setIsModalOpen(false);
          fetchData();
        } else {
          triggerError("Failed to delete slot.");
        }
      } catch (err: any) {
        triggerError("Error removing slot: " + err.message);
      }
    }
  };

  const getSubjectsListForSelectedClass = (): string[] => {
    const currentClass = classes.find(c => c.id === selectedClassId);
    if (!currentClass) return [];
    if (Array.isArray(currentClass.subjects)) {
      return currentClass.subjects;
    } else if (typeof currentClass.subjects === "string") {
      try {
        return JSON.parse(currentClass.subjects);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  // Export Timetable as simple text summary for download/share
  const handleExportText = () => {
    const activeClass = classes.find(c => c.id === selectedClassId);
    if (!activeClass) return;

    let output = `========================================\n`;
    output += `OFFICIAL SCHEDULE: ${activeClass.name.toUpperCase()}\n`;
    output += `GENERATED: ${new Date().toLocaleDateString()}\n`;
    output += `========================================\n\n`;

    days.forEach(day => {
      output += `--- ${day.toUpperCase()} ---\n`;
      const daySlots = timetable.filter(slot => slot.classId === selectedClassId && slot.day === day);
      if (daySlots.length === 0) {
        output += `  No lectures scheduled\n`;
      } else {
        // Sort day slots by timeslot order
        const sorted = [...daySlots].sort((a, b) => times.indexOf(a.timeSlot) - times.indexOf(b.timeSlot));
        sorted.forEach(s => {
          const teacher = teachers.find(t => t.id === s.teacherId);
          output += `  [${s.timeSlot}] ${s.subject}${s.topic ? ` (${s.topic})` : ""}\n`;
          output += `    Instructor: ${teacher ? teacher.name : "Unassigned"}\n`;
          output += `    Location: ${s.room || "Unassigned room"}\n\n`;
        });
      }
      output += `\n`;
    });

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timetable_${activeClass.name.replace(/\s+/g, "_").toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    triggerSuccess("Timetable exported successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Academic Timetable</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">
            Real-Time Resource Allocation, Room Assignment & Conflict Protection
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            className="p-3 text-slate-500 hover:text-slate-950 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title="Force Database Sync"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleExportText}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4" /> Export Text Schedule
          </button>
        </div>
      </div>

      {/* Floating notifications */}
      {successMsg && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-black uppercase tracking-widest animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="h-4 w-4" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-rose-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-black uppercase tracking-widest animate-in slide-in-from-bottom duration-300">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </div>
      )}

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Class Structure:</span>
          <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 bg-slate-50/50 hover:bg-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
          >
            {classes.length === 0 ? (
              <option value="">No Classes Loaded</option>
            ) : (
              classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name.toUpperCase()} ({cls.gradeLevel})
                </option>
              ))
            )}
          </select>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-100 border border-blue-300" /> Planned Lecture
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200 border-dashed" /> Hover to Add
          </div>
        </div>
      </div>

      {/* Timetable Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-4">Syncing Timetable Scheduler Database...</p>
          </div>
        ) : !selectedClassId ? (
          <div className="text-center py-24 text-slate-400 px-4">
            <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">No Class Selected</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Create a class section in the admin dashboard to start scheduling.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              
              {/* Day headers */}
              <div className="grid grid-cols-6 border-b border-slate-200 bg-slate-50/50">
                <div className="p-4 bg-slate-100/50 border-r border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center flex items-center justify-center">
                  Time / Day
                </div>
                {days.map(day => (
                  <div key={day} className="p-4 text-[10px] font-black text-slate-800 uppercase tracking-widest text-center border-r border-slate-100 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {times.map((time, timeIdx) => (
                  <div key={timeIdx} className="grid grid-cols-6 min-h-[110px] hover:bg-slate-50/20 transition-all">
                    
                    {/* Time slot indicator */}
                    <div className="p-4 border-r border-slate-200 bg-slate-50/30 flex flex-col items-center justify-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-600 tracking-tight">{time}</span>
                    </div>

                    {/* Day columns */}
                    {days.map((day, dayIdx) => {
                      // Find matched slot
                      const slot = timetable.find(
                        s => s.classId === selectedClassId && s.day === day && s.timeSlot === time
                      );

                      const teacher = slot ? teachers.find(t => t.id === slot.teacherId) : null;

                      return (
                        <div 
                          key={dayIdx} 
                          className="p-1 border-r border-slate-100 last:border-r-0 relative group flex items-stretch"
                        >
                          {slot ? (
                            <div 
                              onClick={() => handleCellClick(day, time, slot)}
                              className="w-full bg-blue-50/70 hover:bg-blue-50 border border-blue-200 rounded-2xl p-3 flex flex-col justify-between shadow-xs cursor-pointer hover:scale-[1.01] hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-blue-600 text-white">
                                  {slot.subject}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                                  EDIT
                                </span>
                              </div>

                              <div className="my-2">
                                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">
                                  {slot.topic || "Regular Lecture"}
                                </h4>
                              </div>

                              <div className="space-y-1 border-t border-blue-100/45 pt-1.5 mt-auto">
                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                  <Users className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                                  <span>{teacher ? teacher.name.toUpperCase() : "Unassigned Faculty"}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                  <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                                  <span>{slot.room || "Unassigned Room"}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleCellClick(day, time)}
                              className="w-full h-full border border-dashed border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/20 transition-all flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-blue-500 cursor-pointer"
                            >
                              <Plus className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                              <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Schedule</span>
                            </button>
                          )}
                        </div>
                      );
                    })}

                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* MODAL: Add/Edit schedule slot */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  {editingSlot ? "Edit Scheduled Lecture" : "Schedule New Lecture"}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Assign time, room, and instructor protecting conflicts
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSlotSubmit} className="p-6 space-y-4">
              
              {/* Day & Timeslot Readonly Indicator */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Scheduled Day</p>
                  <p className="text-xs font-black text-slate-800 uppercase mt-0.5">{targetDay}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Scheduled Time Slot</p>
                  <p className="text-xs font-black text-slate-800 uppercase mt-0.5">{targetTimeSlot}</p>
                </div>
              </div>

              {/* Subject Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> Subject *
                </label>
                {getSubjectsListForSelectedClass().length > 0 ? (
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select a subject...</option>
                    {getSubjectsListForSelectedClass().map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Physics, Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                )}
              </div>

              {/* Topic Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lecture Topic / Unit (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g. Newton's Second Law, Chapter 4"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Faculty Instructor */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <User className="h-3 w-3" /> Assigned Instructor
                </label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">No Teacher assigned</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name.toUpperCase()} ({t.department})</option>
                  ))}
                </select>
              </div>

              {/* Room / Lab */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Room / Classroom Location
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Room 102, Lab-A"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 gap-2">
                {editingSlot ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteSlot(editingSlot.id)}
                    className="px-4 py-2.5 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                ) : <div />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
                  >
                    {editingSlot ? "Update" : "Schedule"}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
