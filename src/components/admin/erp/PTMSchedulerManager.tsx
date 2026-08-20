import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  X,
  Sparkles,
  Video,
  ExternalLink,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PTMLiveConferenceModal } from "../../common/PTMLiveConferenceModal";

interface Meeting {
  id: string;
  parentId: string;
  parentName?: string;
  teacherId: string;
  teacherName?: string;
  studentId?: string;
  studentName?: string;
  subject: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  proposedBy?: string;
  notes?: string;
  meetingLink?: string;
  createdAt?: string;
}

interface TeacherOption {
  id: string;
  name: string;
  title?: string;
  department?: string;
  email?: string;
}

interface ParentOption {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface StudentOption {
  id: string;
  name: string;
  gradeLevel?: string;
  parentId?: string;
}

export function PTMSchedulerManager() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "CONFIRMED" | "PENDING" | "REJECTED">("ALL");
  const [originFilter, setOriginFilter] = useState<"ALL" | "TEACHER" | "PARENT" | "ADMIN">("ALL");
  const [teacherFilter, setTeacherFilter] = useState<string>("ALL");

  // Admin options for scheduling
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [parents, setParents] = useState<ParentOption[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);

  // Create Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTeacherId, setFormTeacherId] = useState("");
  const [formParentId, setFormParentId] = useState("");
  const [formStudentId, setFormStudentId] = useState("");
  const [formSubject, setFormSubject] = useState("Academic Progress & Curriculum Review");
  const [formDate, setFormDate] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formError, setFormError] = useState("");

  // Reschedule / Action modal state
  const [actionMeeting, setActionMeeting] = useState<Meeting | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | "ADMIN_RESCHEDULE" | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Live Conference Modal State
  const [liveMeetingToJoin, setLiveMeetingToJoin] = useState<Meeting | null>(null);
  const [copiedMeetingId, setCopiedMeetingId] = useState<string | null>(null);

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
    } catch (err) {
      console.error("Failed to load meetings:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/meetings/admin-options", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTeachers(data.teachers || []);
        setParents(data.parents || []);
        setStudents(data.students || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin PTM options:", err);
    }
  };

  useEffect(() => {
    fetchMeetings();
    fetchOptions();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMeetings();
    fetchOptions();
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTeacherId || !formParentId || !formDate) {
      setFormError("Please select an instructor, parent, and scheduled date/time.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const token = localStorage.getItem("ebm_token");
      const selectedStudent = students.find(s => s.id === formStudentId);
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          teacherId: formTeacherId,
          parentId: formParentId,
          studentId: formStudentId || null,
          studentName: selectedStudent ? selectedStudent.name : null,
          subject: formSubject,
          date: formDate,
          notes: formNotes
        })
      });

      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setFormTeacherId("");
        setFormParentId("");
        setFormStudentId("");
        setFormNotes("");
        setFormDate("");
        fetchMeetings();
      } else {
        setFormError(data.error || "Failed to schedule conference");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExecuteAction = async () => {
    if (!actionMeeting || !actionType) return;
    setIsProcessingAction(true);

    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch(`/api/meetings/${actionMeeting.id}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          action: actionType,
          proposedDate: rescheduleDate || actionMeeting.date,
          notes: actionNotes
        })
      });

      const data = await res.json();
      if (data.success) {
        setActionMeeting(null);
        setActionType(null);
        setActionNotes("");
        setRescheduleDate("");
        fetchMeetings();
      } else {
        alert(data.error || "Failed to update meeting");
      }
    } catch (err: any) {
      alert(err.message || "Failed to update meeting");
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    if (!window.confirm("Are you sure you want to cancel and remove this PTM conference record? Both teacher and parent will be notified.")) {
      return;
    }

    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch(`/api/meetings/${meetingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchMeetings();
      } else {
        alert(data.error || "Failed to delete meeting");
      }
    } catch (err) {
      console.error("Failed to delete meeting:", err);
    }
  };

  // Metrics Calculation
  const totalCount = meetings.length;
  const confirmedCount = meetings.filter(m => m.status === "CONFIRMED").length;
  const pendingCount = meetings.filter(m => m.status === "PENDING").length;
  const rejectedCount = meetings.filter(m => m.status === "REJECTED").length;

  // Filtered List
  const filteredMeetings = meetings.filter(m => {
    // Status filter
    if (statusFilter !== "ALL" && m.status !== statusFilter) return false;

    // Origin filter
    if (originFilter !== "ALL" && m.proposedBy !== originFilter) return false;

    // Teacher filter
    if (teacherFilter !== "ALL" && m.teacherId !== teacherFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTeacher = (m.teacherName || "").toLowerCase().includes(q);
      const matchParent = (m.parentName || "").toLowerCase().includes(q);
      const matchStudent = (m.studentName || "").toLowerCase().includes(q);
      const matchSubject = (m.subject || "").toLowerCase().includes(q);
      const matchNotes = (m.notes || "").toLowerCase().includes(q);
      return matchTeacher || matchParent || matchStudent || matchSubject || matchNotes;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Parent-Teacher Meetings (PTM) & Conferences
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized supervisory hub for scheduling, bidirectional requests, and response tracking between faculty and parents.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition flex items-center gap-2 text-xs font-semibold ${
              refreshing ? "opacity-60 cursor-not-allowed" : ""
            }`}
            title="Refresh Meetings"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-indigo-600" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => {
              setFormError("");
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm hover:shadow cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule School PTM</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Scheduled</span>
            <div className="text-2xl font-black text-slate-900">{totalCount}</div>
            <span className="text-[10px] text-slate-400">All registered conferences</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Confirmed & Active</span>
            <div className="text-2xl font-black text-emerald-600">{confirmedCount}</div>
            <span className="text-[10px] text-emerald-600/80">Approved by both parties</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pending Response</span>
            <div className="text-2xl font-black text-amber-600">{pendingCount}</div>
            <span className="text-[10px] text-amber-600/80">Awaiting mutual agreement</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Declined / Reschedule</span>
            <div className="text-2xl font-black text-rose-600">{rejectedCount}</div>
            <span className="text-[10px] text-rose-600/80">Declined invitations</span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, teacher, parent, or agenda topic..."
            className="w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(["ALL", "CONFIRMED", "PENDING", "REJECTED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition text-[11px] ${
                  statusFilter === st
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st === "ALL" ? "All Status" : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Origin Filter */}
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Origins</option>
            <option value="TEACHER">Proposed by Teacher</option>
            <option value="PARENT">Requested by Parent</option>
            <option value="ADMIN">Scheduled by Admin</option>
          </select>

          {/* Teacher Dropdown */}
          <select
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[180px] truncate"
          >
            <option value="ALL">All Instructors</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Meetings Schedule List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800">
              Active Parent-Teacher Conferences ({filteredMeetings.length})
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Live synchronization with Teacher & Parent portals
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading conference schedules...</div>
        ) : filteredMeetings.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="p-3 bg-slate-100 text-slate-400 rounded-full w-fit mx-auto">
              <Calendar className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-slate-600">No Parent-Teacher meetings match the selected criteria.</p>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Teachers and parents can request conferences directly from their portals, or Super Admin can initiate official meetings using the button above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredMeetings.map((meet) => {
              const isPending = meet.status === "PENDING";
              const isTeacherOrigin = meet.proposedBy === "TEACHER";
              const isParentOrigin = meet.proposedBy === "PARENT";
              const isAdminOrigin = meet.proposedBy === "ADMIN";

              return (
                <div key={meet.id} className="p-5 hover:bg-slate-50/70 transition space-y-4">
                  {/* Top Bar: Date, Status, Origin */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-black">
                        <Clock className="h-3.5 w-3.5 text-indigo-600" />
                        <span>{meet.date.replace("T", " at ")}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        meet.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : meet.status === "REJECTED"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}>
                        {meet.status}
                      </span>

                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-600">
                        {isTeacherOrigin && "Initiated by Teacher"}
                        {isParentOrigin && "Requested by Parent"}
                        {isAdminOrigin && "Admin Scheduled"}
                      </span>
                    </div>

                    {/* Admin Action Controls */}
                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <>
                          <button
                            onClick={() => {
                              setActionMeeting(meet);
                              setActionType("APPROVE");
                              setActionNotes("Confirmed on behalf of school administration.");
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition shadow-2xs cursor-pointer"
                            title="Confirm meeting immediately"
                          >
                            <Check className="h-3 w-3" />
                            <span>Confirm</span>
                          </button>

                          <button
                            onClick={() => {
                              setActionMeeting(meet);
                              setActionType("ADMIN_RESCHEDULE");
                              setRescheduleDate(meet.date.includes(" at ") ? meet.date.replace(" at ", "T") : meet.date);
                              setActionNotes("");
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="Reschedule / Propose new time"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>Reschedule</span>
                          </button>

                          <button
                            onClick={() => {
                              setActionMeeting(meet);
                              setActionType("REJECT");
                              setActionNotes("Declined / Cancelled by administration.");
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="Decline conference"
                          >
                            <X className="h-3 w-3" />
                            <span>Decline</span>
                          </button>
                        </>
                      )}

                      {!isPending && (
                        <button
                          onClick={() => {
                            setActionMeeting(meet);
                            setActionType("ADMIN_RESCHEDULE");
                            setRescheduleDate(meet.date.includes(" at ") ? meet.date.replace(" at ", "T") : meet.date);
                            setActionNotes("");
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition cursor-pointer"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Update Date</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteMeeting(meet.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Conference"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid: Teacher, Parent, Student, Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs">
                    {/* Teacher Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <User className="h-3.5 w-3.5 text-indigo-600" />
                        <span>Faculty Instructor</span>
                      </div>
                      <div className="font-bold text-slate-800">{meet.teacherName || "Assigned Teacher"}</div>
                      <span className="text-[10px] text-slate-500">Instructor ID: {meet.teacherId}</span>
                    </div>

                    {/* Parent Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <Users className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Parent / Guardian</span>
                      </div>
                      <div className="font-bold text-slate-800">{meet.parentName || "Parent"}</div>
                      <span className="text-[10px] text-slate-500">Parent ID: {meet.parentId}</span>
                    </div>

                    {/* Student & Focus Area */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                        <span>Student & Subject Focus</span>
                      </div>
                      <div className="font-bold text-slate-800">
                        {meet.studentName ? meet.studentName : "General Child Consultation"}
                      </div>
                      <span className="text-[10px] text-indigo-600 font-semibold">{meet.subject}</span>
                    </div>
                  </div>

                  {/* Notes & Interaction Thread */}
                  {meet.notes && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <MessageSquare className="h-3 w-3 text-slate-400" />
                        <span>Conference Agenda & Response Notes</span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {meet.notes}
                      </p>
                    </div>
                  )}

                  {/* Real-Time Live Video Conference Box for Confirmed Meetings */}
                  {meet.status === "CONFIRMED" && (
                    <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-emerald-900/10 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-xs font-black text-slate-800 tracking-tight">
                            Real-Time Video Conference Room Active
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            Ready for Parent & Teacher
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 flex items-center gap-1.5 font-mono">
                          <span className="text-slate-400">Meeting Link:</span>
                          <span className="font-semibold text-blue-700 break-all select-all">{meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}`}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setLiveMeetingToJoin(meet)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 cursor-pointer"
                        >
                          <Video className="h-4 w-4" />
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
                          className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          {copiedMeetingId === meet.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                          <span className="hidden md:inline">{copiedMeetingId === meet.id ? "Copied!" : "Copy Link"}</span>
                        </button>

                        <a
                          href={meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}#config.prejoinConfig.enabled=false`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open in new window / tab"
                          className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: Schedule School PTM */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Schedule School Parent-Teacher Meeting</h3>
                    <p className="text-[11px] text-slate-500">Initiate an official conference linking teacher and parent</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateMeeting} className="p-6 space-y-4">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Teacher Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Select Instructor *
                  </label>
                  <select
                    required
                    value={formTeacherId}
                    onChange={(e) => setFormTeacherId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">-- Choose Instructor --</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} {t.title ? `(${t.title})` : t.department ? `(${t.department})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Parent Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Select Parent / Guardian *
                  </label>
                  <select
                    required
                    value={formParentId}
                    onChange={(e) => setFormParentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">-- Choose Parent --</option>
                    {parents.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.email ? `(${p.email})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Student Selection (Optional) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Associated Student (Optional)
                  </label>
                  <select
                    value={formStudentId}
                    onChange={(e) => setFormStudentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">-- General / No Specific Student --</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.gradeLevel ? `(${s.gradeLevel})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject / Agenda Focus */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Consultation Subject / Academic Focus *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="e.g. Mathematics Accelerated Track & Syllabus Review"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Conference Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Agenda Notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Official Agenda / Admin Invitation Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Provide meeting purpose, venue, or online conference link..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Scheduling..." : "Confirm & Dispatch Invitation"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Action / Reschedule Modal */}
      <AnimatePresence>
        {actionMeeting && actionType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${
                    actionType === "APPROVE" 
                      ? "bg-emerald-50 text-emerald-600" 
                      : actionType === "REJECT" 
                        ? "bg-rose-50 text-rose-600" 
                        : "bg-indigo-50 text-indigo-600"
                  }`}>
                    {actionType === "APPROVE" && <CheckCircle2 className="h-5 w-5" />}
                    {actionType === "REJECT" && <XCircle className="h-5 w-5" />}
                    {actionType === "ADMIN_RESCHEDULE" && <Edit3 className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {actionType === "APPROVE" && "Confirm Conference"}
                      {actionType === "REJECT" && "Decline Conference"}
                      {actionType === "ADMIN_RESCHEDULE" && "Reschedule Conference Date"}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {actionMeeting.teacherName} & {actionMeeting.parentName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActionMeeting(null);
                    setActionType(null);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {actionType === "ADMIN_RESCHEDULE" && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      New Proposed Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Administrative Remarks / Note
                  </label>
                  <textarea
                    rows={3}
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Add an official note explaining the status change or schedule adjustment..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActionMeeting(null);
                      setActionType(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isProcessingAction}
                    onClick={handleExecuteAction}
                    className={`px-5 py-2 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50 ${
                      actionType === "APPROVE"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : actionType === "REJECT"
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isProcessingAction ? "Saving..." : "Apply & Notify Parties"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Conference Consultation Room Modal */}
      {liveMeetingToJoin && (
        <PTMLiveConferenceModal
          meeting={liveMeetingToJoin}
          currentUser={{
            name: "Super Admin",
            role: "ADMIN"
          }}
          onClose={() => setLiveMeetingToJoin(null)}
        />
      )}
    </div>
  );
}
