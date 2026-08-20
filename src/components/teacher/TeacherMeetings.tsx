import React, { useEffect, useState } from "react";
import { Calendar, User, Clock, Check, X, Edit3, MessageSquare, Plus, AlertCircle, Video, ExternalLink, Copy } from "lucide-react";
import { PTMLiveConferenceModal } from "../common/PTMLiveConferenceModal";

export function TeacherMeetings() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [liveMeetingToJoin, setLiveMeetingToJoin] = useState<any | null>(null);
  const [copiedMeetingId, setCopiedMeetingId] = useState<string | null>(null);

  // New Meeting Form State
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Revision Form State
  const [revisingMeetId, setRevisingMeetId] = useState<string | null>(null);
  const [revisionDate, setRevisionDate] = useState("");
  const [revisionNotes, setRevisionNotes] = useState("");

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/meetings", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.meetings)) {
        setMeetings(data.meetings);
      }
    } catch (e) {
      console.error("Error fetching meetings:", e);
    }
  };

  const fetchStudentsAndParents = async () => {
    try {
      const token = localStorage.getItem("ebm_token");
      // Fetch students
      const resStud = await fetch("/api/teacher/students", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const dataStud = await resStud.json();
      if (dataStud.success && Array.isArray(dataStud.students)) {
        setStudents(dataStud.students);
      }

      // Fetch parents
      const resPar = await fetch("/api/meetings/parents", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const dataPar = await resPar.json();
      if (dataPar.success && Array.isArray(dataPar.parents)) {
        setParents(dataPar.parents);
      }
    } catch (e) {
      console.error("Error fetching students/parents:", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMeetings(), fetchStudentsAndParents()]).finally(() => setLoading(false));
  }, []);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!selectedParentId || !date) {
      setFormError("Parent and Date/Time are required.");
      return;
    }

    const studentObj = students.find(s => s.id === selectedStudentId);
    const parentObj = parents.find(p => p.id === selectedParentId);

    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          parentId: selectedParentId,
          studentId: selectedStudentId || null,
          studentName: studentObj ? studentObj.name : null,
          subject: subject || "General Academic Review",
          date: date.replace("T", " at "),
          notes: notes || "Parent-Teacher Meeting requested by Instructor."
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess("Meeting request successfully sent to parent!");
        setSelectedParentId("");
        setSelectedStudentId("");
        setSubject("");
        setDate("");
        setNotes("");
        fetchMeetings();
      } else {
        setFormError(data.error || "Failed to create meeting.");
      }
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    }
  };

  const handleRespond = async (meetId: string, action: "APPROVE" | "REJECT" | "PROPOSE_REVISION", proposedDate?: string, proposedNotes?: string) => {
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch(`/api/meetings/${meetId}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          action,
          proposedDate,
          notes: proposedNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(action === "APPROVE" ? "Meeting approved & confirmed!" : action === "REJECT" ? "Meeting declined." : "New date proposed successfully!");
        setRevisingMeetId(null);
        setRevisionDate("");
        setRevisionNotes("");
        fetchMeetings();
      } else {
        alert("Failed to respond: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // Helper: auto-select parent if a student is chosen and has parentEmail matching parent's email
  const handleStudentChange = (studentId: string) => {
    setSelectedStudentId(studentId);
    if (!studentId) return;
    const student = students.find(s => s.id === studentId);
    if (student && student.parentEmail) {
      const matchingParent = parents.find(p => p.email?.toLowerCase() === student.parentEmail?.toLowerCase());
      if (matchingParent) {
        setSelectedParentId(matchingParent.id);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6" id="teacher-meetings-hub">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Parent-Teacher Meeting (PTM) Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Propose, schedule, approve, or request date revisions for meetings with parents. Fully persistent and bidirectionally linked.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule a PTM Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs h-fit space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Plus className="h-4 w-4 text-blue-500" />
            Request PTM Consultation
          </h3>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2 text-xs text-emerald-700">
              <Check className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreateMeeting} className="space-y-3 text-xs">
            {/* Student Picker */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">Select Student (Optional)</label>
              <select
                value={selectedStudentId}
                onChange={(e) => handleStudentChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              >
                <option value="">-- No Specific Student --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (Grade {s.gradeLevel})</option>
                ))}
              </select>
            </div>

            {/* Parent Picker */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">Target Parent *</label>
              <select
                required
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition animate-pulse-once"
              >
                <option value="">-- Select Parent --</option>
                {parents.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                ))}
              </select>
            </div>

            {/* Focus/Subject area */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">Meeting Focus / Subject Area</label>
              <input
                type="text"
                placeholder="e.g. Advanced Math, Syllabus Progress"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
              />
            </div>

            {/* Date Picker */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="font-bold text-slate-600 block">Invitation Message / Details</label>
              <textarea
                rows={3}
                placeholder="Details of the agenda or focus..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
            >
              Send PTM Invitation
            </button>
          </form>
        </div>

        {/* Appointment Feed & Statuses */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Clock className="h-4 w-4 text-indigo-500" />
            Active Meeting Schedule & Requests
          </h3>

          {loading ? (
            <div className="text-center py-12 text-xs text-slate-400">Loading scheduled meetings...</div>
          ) : meetings.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">No Parent-Teacher meetings scheduled yet.</div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto pr-1">
              {meetings.map((meet) => {
                const isPending = meet.status === "PENDING";
                const isProposedByParent = meet.proposedBy === "PARENT";
                const isRevisionFormOpen = revisingMeetId === meet.id;

                return (
                  <div key={meet.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm">Parent: {meet.parentName}</span>
                          {meet.studentName && (
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-medium">
                              Student: {meet.studentName}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 font-medium">Focus Subject: {meet.subject}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md">
                            {meet.date}
                          </span>
                        </div>
                        {meet.notes && (
                          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 italic">
                            Message: "{meet.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          meet.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-800"
                            : meet.status === "REJECTED"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                        }`}>
                          {meet.status} {isPending && `(Proposed by ${meet.proposedBy})`}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Response Board for Pending Meetings */}
                    {isPending && (
                      <div className="pt-2 border-t border-slate-100/50 flex flex-col space-y-2">
                        {isProposedByParent ? (
                          <div className="flex flex-wrap gap-2 justify-end">
                            <button
                              onClick={() => handleRespond(meet.id, "APPROVE")}
                              className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Check className="h-3 w-3" /> Approve Request
                            </button>

                            <button
                              onClick={() => {
                                if (isRevisionFormOpen) {
                                  setRevisingMeetId(null);
                                } else {
                                  setRevisingMeetId(meet.id);
                                  setRevisionDate(meet.date.includes(" at ") ? meet.date.replace(" at ", "T") : meet.date);
                                }
                              }}
                              className="text-[10px] border border-blue-200 hover:bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Edit3 className="h-3 w-3" /> {isRevisionFormOpen ? "Cancel Revision" : "Propose New Date"}
                            </button>

                            <button
                              onClick={() => handleRespond(meet.id, "REJECT")}
                              className="text-[10px] border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <X className="h-3 w-3" /> Decline
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-[10px] text-amber-700 bg-amber-50/50 border border-amber-100 p-2.5 rounded-xl">
                            <span className="font-bold">Sent to Parent</span>
                            <span className="font-medium">Waiting for response or proposed date revision</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Propose Revision Inline Form */}
                    {isRevisionFormOpen && (
                      <div className="mt-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs text-left">
                        <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                          Propose a Revision to Parent & Add Message
                        </span>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-1">New Proposed Date & Time</label>
                            <input
                              type="datetime-local"
                              required
                              value={revisionDate}
                              onChange={(e) => setRevisionDate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-1">Additional Message for Parent</label>
                            <textarea
                              placeholder="e.g. Can we move it to this time due to my classes?"
                              value={revisionNotes}
                              rows={2}
                              onChange={(e) => setRevisionNotes(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleRespond(meet.id, "PROPOSE_REVISION", revisionDate.replace("T", " at "), revisionNotes)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-lg transition cursor-pointer"
                        >
                          Submit Proposed Change to Parent
                        </button>
                      </div>
                    )}
                    {/* Real-Time Live Video Conference Box for Confirmed Meetings */}
                    {meet.status === "CONFIRMED" && (
                      <div className="pt-2 border-t border-slate-100">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-xs font-black text-slate-800 tracking-tight">
                                Live Video Conference Link Active
                              </span>
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                Ready to Join
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-mono">
                              <span className="font-semibold text-blue-700 break-all select-all">{meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}`}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setLiveMeetingToJoin(meet)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                              <Video className="h-3.5 w-3.5" />
                              <span>Join Live Meeting</span>
                            </button>

                            <button
                              onClick={() => {
                                const url = meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}#config.prejoinConfig.enabled=false`;
                                navigator.clipboard.writeText(url);
                                setCopiedMeetingId(meet.id);
                                setTimeout(() => setCopiedMeetingId(null), 2500);
                              }}
                              title="Copy Meeting Link"
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                            >
                              {copiedMeetingId === meet.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-500" />}
                              <span className="hidden sm:inline">{copiedMeetingId === meet.id ? "Copied" : "Copy"}</span>
                            </button>

                            <a
                              href={meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}#config.prejoinConfig.enabled=false`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open in new window / tab"
                              className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition cursor-pointer"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Live Conference Consultation Room Modal */}
      {liveMeetingToJoin && (
        <PTMLiveConferenceModal
          meeting={liveMeetingToJoin}
          currentUser={{
            name: "Faculty Instructor",
            role: "TEACHER"
          }}
          onClose={() => setLiveMeetingToJoin(null)}
        />
      )}
    </div>
  );
}
