import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export function AttendanceMarkingPrompt() {
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [markedStatus, setMarkedStatus] = useState<Record<string, "PRESENT" | "ABSENT" | "TARDY">>({});
  const [successMsg, setSuccessMsg] = useState("");

  const userStr = localStorage.getItem("ebm_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const studentId = user?.id || "student-1"; 
  const studentClassId = user?.classIds && user.classIds.length > 0 ? user.classIds[0] : "class_1"; 

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch teacher classes to match class labels
      const classesRes = await fetch("/api/teacher/classes");
      const classesData = await classesRes.json();
      if (classesData.success) {
        setClasses(classesData.classes || []);
      }

      // Fetch attendance history to check for active checklists
      const attendanceRes = await fetch("/api/teacher/attendance");
      const attendanceData = await attendanceRes.json();
      if (attendanceData.success) {
        const todayStr = new Date().toISOString().split("T")[0];
        
        // Find today's attendance sessions that are relevant to this student's class
        const relevant = (attendanceData.attendance || []).filter(
          (r: any) => r.classId === studentClassId && r.date === todayStr
        );
        setActiveSessions(relevant);

        // Pre-fill marked statuses if already marked by teacher or student
        const initialMarked: Record<string, "PRESENT" | "ABSENT" | "TARDY"> = {};
        relevant.forEach((record: any) => {
          if (record.statuses && record.statuses[studentId]) {
            initialMarked[record.id] = record.statuses[studentId];
          }
        });
        setMarkedStatus(initialMarked);
      }
    } catch (e) {
      console.warn("Error fetching student attendance prompts:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkAttendance = async (record: any, status: "PRESENT" | "ABSENT" | "TARDY") => {
    setIsLoading(true);
    setSuccessMsg("");
    try {
      // Merge new status into existing record statuses
      const updatedStatuses = {
        ...(record.statuses || {}),
        [studentId]: status,
      };

      // Also support notes
      const updatedNotes = {
        ...(record.notes || {}),
        [studentId]: `Self-marked via student portal at ${new Date().toLocaleTimeString()}`,
      };

      const updatedRecord = {
        ...record,
        statuses: updatedStatuses,
        notes: updatedNotes,
      };

      const response = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord),
      });

      const resData = await response.json();
      if (resData.success) {
        setMarkedStatus((prev) => ({
          ...prev,
          [record.id]: status,
        }));
        setSuccessMsg(`Perfect! You've marked your attendance as ${status}.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        // Refresh local data
        await fetchData();
      }
    } catch (e) {
      console.error("Failed to submit student self-attendance", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (activeSessions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent rounded-2xl border border-indigo-500/20 p-5 md:p-6 shadow-sm relative overflow-hidden animate-in fade-in duration-300">
      <div className="absolute right-0 top-0 opacity-[0.03] text-indigo-950 pointer-events-none transform translate-x-4 -translate-y-4">
        <ClipboardCheck className="w-48 h-48" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
        <div className="space-y-1 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 rounded-md uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            Attendance Roll-Call
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-2">
            Mark Your Attendance For Today
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Your instructor has sent an attendance session. Confirm your status below to preserve your active streaks and records.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {activeSessions.map((session) => {
            const classItem = classes.find((c) => c.id === session.classId);
            const className = classItem ? classItem.name : "Active Class";
            const currentMark = markedStatus[session.id];

            return (
              <div key={session.id} className="space-y-3">
                <div className="text-xs font-bold text-slate-600 flex items-center gap-1 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-100">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0"></span>
                  {className}
                </div>

                {currentMark ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border ${
                        currentMark === "PRESENT"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : currentMark === "TARDY"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {currentMark === "PRESENT" && <CheckCircle2 className="h-4 w-4" />}
                      {currentMark === "TARDY" && <Clock className="h-4 w-4" />}
                      {currentMark === "ABSENT" && <XCircle className="h-4 w-4" />}
                      Marked: {currentMark}
                    </div>

                    <button
                      onClick={() => handleMarkAttendance(session, "PRESENT")}
                      disabled={isLoading}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold bg-white/40 border border-indigo-200 hover:bg-white px-2.5 py-2 rounded-lg cursor-pointer transition-all shrink-0"
                    >
                      Change status
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleMarkAttendance(session, "PRESENT")}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Present
                    </button>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleMarkAttendance(session, "TARDY")}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      Late
                    </button>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleMarkAttendance(session, "ABSENT")}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Absent
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {successMsg && (
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1 transition-all">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              {successMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
