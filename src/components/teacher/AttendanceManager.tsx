import React, { useState, useEffect } from "react";
import { useTeacherStore } from "./teacher.store";
import { TeacherClass, TeacherStudent, TeacherAttendance } from "./teacher.types";
import {
  Calendar,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardCheck,
  History,
  Check,
  Edit2,
  FileText,
  RefreshCw,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export function AttendanceManager() {
  const classes = useTeacherStore((state) => state.classes);
  const students = useTeacherStore((state) => state.students);
  const attendanceHistory = useTeacherStore((state) => state.attendance);
  const submitAttendance = useTeacherStore((state) => state.submitAttendance);
  const fetchAttendance = useTeacherStore((state) => state.fetchAttendance);
  const fetchStudents = useTeacherStore((state) => state.fetchStudents);

  const [activeTab, setActiveTab] = useState<"take" | "history">("take");
  
  // Selection state
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Take Attendance State
  const [localStatuses, setLocalStatuses] = useState<Record<string, "PRESENT" | "ABSENT" | "TARDY">>({});
  const [localNotes, setLocalNotes] = useState<Record<string, string>>({});
  const [noteToggles, setNoteToggles] = useState<Record<string, boolean>>({});
  const [studentSearch, setStudentSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load initial class
  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  // Fetch histories on mount
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // Sync / Load existing attendance record if it exists in the history
  useEffect(() => {
    if (!selectedClassId || !selectedDate) return;

    const existingRecord = attendanceHistory.find(
      (r) => r.classId === selectedClassId && r.date === selectedDate
    );

    // Get all students enrolled in this class
    const enrolledStudents = students.filter((s) => (s.classIds || []).includes(selectedClassId));

    const initialStatuses: Record<string, "PRESENT" | "ABSENT" | "TARDY"> = {};
    const initialNotes: Record<string, string> = {};

    enrolledStudents.forEach((student) => {
      if (existingRecord && existingRecord.statuses[student.id]) {
        initialStatuses[student.id] = existingRecord.statuses[student.id];
        initialNotes[student.id] = existingRecord.notes?.[student.id] || "";
      } else {
        // Default to undefined (unmarked) to encourage intentional marking
        // or can be empty so they are prompted to mark them
      }
    });

    setLocalStatuses(initialStatuses);
    setLocalNotes(initialNotes);
    setNoteToggles({});
    setSubmitSuccess(false);
  }, [selectedClassId, selectedDate, attendanceHistory, students]);

  const activeClass = classes.find((c) => c.id === selectedClassId);
  const enrolledStudents = students.filter((s) => (s.classIds || []).includes(selectedClassId));
  const filteredStudents = enrolledStudents.filter((s) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Live count computations
  const totalEnrolled = enrolledStudents.length;
  const presentCount = Object.keys(localStatuses).filter(
    (id) => localStatuses[id] === "PRESENT" && localStatuses[id] !== undefined
  ).length;
  const absentCount = Object.keys(localStatuses).filter(
    (id) => localStatuses[id] === "ABSENT" && localStatuses[id] !== undefined
  ).length;
  const tardyCount = Object.keys(localStatuses).filter(
    (id) => localStatuses[id] === "TARDY" && localStatuses[id] !== undefined
  ).length;
  const unmarkedCount = totalEnrolled - (presentCount + absentCount + tardyCount);

  // Bulk actions
  const markAll = (status: "PRESENT" | "ABSENT" | "TARDY") => {
    const updated: Record<string, "PRESENT" | "ABSENT" | "TARDY"> = {};
    enrolledStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setLocalStatuses(updated);
  };

  const clearAllStatuses = () => {
    setLocalStatuses({});
    setLocalNotes({});
  };

  const handleStatusChange = (studentId: string, status: "PRESENT" | "ABSENT" | "TARDY") => {
    setLocalStatuses((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleNoteChange = (studentId: string, text: string) => {
    setLocalNotes((prev) => ({
      ...prev,
      [studentId]: text,
    }));
  };

  const toggleNoteInput = (studentId: string) => {
    setNoteToggles((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId) return;

    // Check if any student remains unmarked
    if (unmarkedCount > 0) {
      if (!confirm(`You have ${unmarkedCount} unmarked student(s). Do you want to submit anyway? Unmarked students won't have their historical rate updated.`)) {
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const success = await submitAttendance(
        selectedClassId,
        selectedDate,
        localStatuses,
        localNotes
      );
      if (success) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert histories into chronological card rows
  const getSortedHistory = () => {
    return [...attendanceHistory].sort((a, b) => b.date.localeCompare(a.date));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Attendance Register
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Track, mark, and analyze student daily attendance with persistent cloud sync.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setActiveTab("take")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "take"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ClipboardCheck className="h-4 w-4" />
            Take Attendance
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "history"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <History className="h-4 w-4" />
            Past Records
          </button>
        </div>
      </div>

      {activeTab === "take" ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
          {/* Main List and Controls */}
          <div className="xl:col-span-3 space-y-6">
            {/* Control Bar Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                {/* Class Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Select Class
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 transition-all cursor-pointer"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 transition-all cursor-pointer"
                  />
                </div>

                {/* Search Bar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Search Student
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student by name..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Roster Checklist Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/40">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    Student Roster
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                      {filteredStudents.length} of {totalEnrolled}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeClass ? `${activeClass.subject} • ${activeClass.room}` : "No class selected"}
                  </p>
                </div>

                {/* Bulk Actions Pill Buttons */}
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Mark All:
                  </span>
                  <button
                    type="button"
                    onClick={() => markAll("PRESENT")}
                    className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50 transition-all cursor-pointer"
                  >
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => markAll("TARDY")}
                    className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1.5 rounded-lg border border-amber-200/50 transition-all cursor-pointer"
                  >
                    Tardy
                  </button>
                  <button
                    type="button"
                    onClick={() => markAll("ABSENT")}
                    className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-lg border border-rose-200/50 transition-all cursor-pointer"
                  >
                    Absent
                  </button>
                  <button
                    type="button"
                    onClick={clearAllStatuses}
                    className="text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Checklist Row List */}
              <div className="divide-y divide-slate-100">
                {totalEnrolled === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                      <Users className="h-7 w-7" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">No Students Enrolled</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      This class does not have any students assigned yet. Use the Class Manager tab to enroll students.
                    </p>
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <h4 className="font-semibold text-slate-800 text-sm">No match found</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      No students found matching your search term.
                    </p>
                  </div>
                ) : (
                  filteredStudents.map((s) => {
                    const status = localStatuses[s.id];
                    const note = localNotes[s.id] || "";
                    const hasNote = note.trim().length > 0;
                    const showNoteInput = noteToggles[s.id];

                    return (
                      <div
                        key={s.id}
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors"
                      >
                        {/* Student Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-800 truncate">
                              {s.name}
                            </h4>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span>{s.email}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 font-medium text-slate-600">
                                <TrendingUp className="h-3 w-3 text-slate-400" />
                                Rate: {s.attendanceRate}%
                              </span>
                              {hasNote && (
                                <>
                                  <span>•</span>
                                  <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold">
                                    <FileText className="h-2.5 w-2.5" />
                                    Has Note
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Controls (Toggles & Notes) */}
                        <div className="flex items-center gap-4 shrink-0">
                          {/* Note toggler bubble button */}
                          <button
                            type="button"
                            onClick={() => toggleNoteInput(s.id)}
                            className={`p-2 rounded-lg border transition-all hover:bg-slate-50 cursor-pointer ${
                              showNoteInput || hasNote
                                ? "text-blue-600 bg-blue-50 border-blue-200"
                                : "text-slate-400 border-slate-200"
                            }`}
                            title="Add internal attendance note"
                          >
                            <FileText className="h-4 w-4" />
                          </button>

                          {/* Triple Segmented Toggle */}
                          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(s.id, "PRESENT")}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                status === "PRESENT"
                                  ? "bg-emerald-600 text-white shadow-sm"
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(s.id, "TARDY")}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                status === "TARDY"
                                  ? "bg-amber-500 text-white shadow-sm"
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Tardy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(s.id, "ABSENT")}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                status === "ABSENT"
                                  ? "bg-rose-600 text-white shadow-sm"
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Note Input */}
                        {showNoteInput && (
                          <div className="w-full md:hidden mt-2">
                            <input
                              type="text"
                              value={note}
                              onChange={(e) => handleNoteChange(s.id, e.target.value)}
                              placeholder={`Note for ${s.name}...`}
                              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Save Footer */}
              {totalEnrolled > 0 && (
                <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-semibold hidden md:block">
                    {unmarkedCount > 0 ? (
                      <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        {unmarkedCount} student(s) remain unmarked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="h-4 w-4" />
                        All student rosters configured
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 w-full md:w-auto justify-end">
                    <button
                      type="button"
                      onClick={clearAllStatuses}
                      className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
                    >
                      Reset Form
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm text-white shadow-sm transition-all cursor-pointer ${
                        submitSuccess
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <Check className="h-4 w-4" />
                          Saved successfully!
                        </>
                      ) : (
                        "Submit Attendance"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Statistics Sidebar Panel */}
          <div className="space-y-6">
            {/* Live Stats Panel Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Live Stats Today
              </h3>

              <div className="space-y-4">
                {/* Total Enrolled */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Total Enrolled</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800">{totalEnrolled}</span>
                </div>

                {/* Present counter */}
                <div className="flex items-center justify-between p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Present Today</span>
                  </div>
                  <span className="text-base font-extrabold text-emerald-700">{presentCount}</span>
                </div>

                {/* Tardy counter */}
                <div className="flex items-center justify-between p-3.5 bg-amber-50/40 rounded-xl border border-amber-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 font-bold text-xs">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Tardy</span>
                  </div>
                  <span className="text-base font-extrabold text-amber-700">{tardyCount}</span>
                </div>

                {/* Absent counter */}
                <div className="flex items-center justify-between p-3.5 bg-rose-50/40 rounded-xl border border-rose-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 font-bold text-xs">
                      <XCircle className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Absent</span>
                  </div>
                  <span className="text-base font-extrabold text-rose-700">{absentCount}</span>
                </div>

                {/* Unmarked counter */}
                {unmarkedCount > 0 && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-100/60 rounded-xl border border-slate-200/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">Unmarked</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-600">{unmarkedCount}</span>
                  </div>
                )}
              </div>

              {/* Progress bar ratio visual */}
              {totalEnrolled > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Fill Rate</span>
                    <span>{Math.round(((totalEnrolled - unmarkedCount) / totalEnrolled) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 transition-all duration-300"
                      style={{ width: `${(presentCount / totalEnrolled) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all duration-300"
                      style={{ width: `${(tardyCount / totalEnrolled) * 100}%` }}
                    />
                    <div
                      className="bg-rose-500 transition-all duration-300"
                      style={{ width: `${(absentCount / totalEnrolled) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Attendance Guideline Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                System Guidance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attendance rate calculations are synchronized in real-time. Marking a student Present or Tardy contributes positively, while Absences reduce their overall rating.
              </p>
              <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                <span>Active Sync Mode</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  Live Connection
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab View */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Historical Logs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review past rosters, check aggregate attendance rates, or load/edit records.
              </p>
            </div>
            <button
              onClick={() => fetchAttendance()}
              className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh History
            </button>
          </div>

          {attendanceHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                <History className="h-7 w-7" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No Attendance Logged Yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Submit your first roster under the "Take Attendance" tab. Records will appear here chronologically.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {getSortedHistory().map((record) => {
                const classItem = classes.find((c) => c.id === record.classId);
                const classLabel = classItem ? classItem.name : "Unknown Class";

                // Count ratios
                const statuses = Object.values(record.statuses);
                const pres = statuses.filter((s) => s === "PRESENT").length;
                const abs = statuses.filter((s) => s === "ABSENT").length;
                const tar = statuses.filter((s) => s === "TARDY").length;
                const total = statuses.length;
                const attendancePercentage = total > 0 ? Math.round(((pres + tar) / total) * 100) : 0;

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">
                          {classLabel}
                        </span>
                        <span className="text-xs bg-slate-200/60 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                          {record.date}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2.5">
                        <span className="text-emerald-700 font-bold">{pres} Present</span>
                        <span>•</span>
                        <span className="text-amber-700 font-bold">{tar} Tardy</span>
                        <span>•</span>
                        <span className="text-rose-700 font-bold">{abs} Absent</span>
                        <span>•</span>
                        <span>Total Marked: {total}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Metric Circle */}
                      <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-100 shadow-sm shrink-0">
                        <span className="text-xs font-semibold text-slate-500">Present Rate:</span>
                        <span
                          className={`text-sm font-extrabold ${
                            attendancePercentage >= 90
                              ? "text-emerald-600"
                              : attendancePercentage >= 80
                              ? "text-amber-600"
                              : "text-rose-600"
                          }`}
                        >
                          {attendancePercentage}%
                        </span>
                      </div>

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setSelectedClassId(record.classId);
                          setSelectedDate(record.date);
                          setActiveTab("take");
                        }}
                        className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100/70 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" />
                        Edit Roster
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
