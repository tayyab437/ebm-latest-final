import React, { useState } from "react";
import { useTeacherStore } from "./teacher.store";
import { TeacherClass, TeacherStudent } from "./teacher.types";
import {
  Plus,
  Users,
  Calendar,
  MoreVertical,
  FolderOpen,
  UserPlus,
  UserMinus,
  X,
  BookOpen,
  Edit,
  Trash2,
  Check,
  Award,
  Activity,
  FileText,
  Mail,
  PlusCircle,
  Percent,
  TrendingUp,
  Clock,
  ArrowLeft,
  School,
  Search,
} from "lucide-react";

export function ClassManager() {
  const classes = useTeacherStore((state) => state.classes);
  const students = useTeacherStore((state) => state.students);
  const assignments = useTeacherStore((state) => state.assignments);
  const createClass = useTeacherStore((state) => state.createClass);
  const updateClass = useTeacherStore((state) => state.updateClass);
  const deleteClass = useTeacherStore((state) => state.deleteClass);
  const setStudents = useTeacherStore((state) => state.setStudents);
  const setAssignments = useTeacherStore((state) => state.setAssignments);

  // Active Dropdown Menu
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Create Class Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState<string[]>(["General"]);
  const [newSubject, setNewSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Grade 1");
  const [schedule, setSchedule] = useState("Mon-Fri");
  const [room, setRoom] = useState("Room 101");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Class Modal State
  const [editingClass, setEditingClass] = useState<TeacherClass | null>(null);
  const [editName, setEditName] = useState("");
  const [editSubjects, setEditSubjects] = useState<string[]>([]);
  const [editNewSubject, setEditNewSubject] = useState("");
  const [editGradeLevel, setEditGradeLevel] = useState("");
  const [editSchedule, setEditSchedule] = useState("");
  const [editRoom, setEditRoom] = useState("");

  // Delete Confirmation State
  const [deletingClass, setDeletingClass] = useState<TeacherClass | null>(null);

  // Add Student Modal State
  const [addStudentToClass, setAddStudentToClass] = useState<TeacherClass | null>(null);
  const [studentSource, setStudentSource] = useState<"existing" | "new">("existing");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPerformance, setNewStudentPerformance] = useState(85);
  const [newStudentAttendance, setNewStudentAttendance] = useState(95);
  const [selectedExistingStudentIds, setSelectedExistingStudentIds] = useState<string[]>([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const [modalSearchEnrolled, setModalSearchEnrolled] = useState("");
  const [modalSearchUnenrolled, setModalSearchUnenrolled] = useState("");
  const [modalSelectedEnrolledIds, setModalSelectedEnrolledIds] = useState<string[]>([]);
  const [modalSelectedUnenrolledIds, setModalSelectedUnenrolledIds] = useState<string[]>([]);
  const [modalTab, setModalTab] = useState<"roster" | "register">("roster");

  React.useEffect(() => {
    setSelectedExistingStudentIds([]);
    setStudentSearchQuery("");
    setModalSearchEnrolled("");
    setModalSearchUnenrolled("");
    setModalSelectedEnrolledIds([]);
    setModalSelectedUnenrolledIds([]);
    setModalTab("roster");
  }, [addStudentToClass?.id]);

  // Opened/Active Class Detail View
  const [openedClass, setOpenedClass] = useState<TeacherClass | null>(null);
  const [studentToRemove, setStudentToRemove] = useState<TeacherStudent | null>(null);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [newAsnTitle, setNewAsnTitle] = useState("");
  const [newAsnDesc, setNewAsnDesc] = useState("");
  const [newAsnDueDate, setNewAsnDueDate] = useState("");

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await createClass({
        name,
        subjects,
        gradeLevel,
        schedule,
        room,
      });
      setName("");
      setSubjects(["Physics"]);
      setGradeLevel("Grade 10");
      setSchedule("Mon, Wed");
      setRoom("Room 101");
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass || !editName.trim()) return;

    setIsSubmitting(true);
    try {
      await updateClass(editingClass.id, {
        name: editName,
        subjects: editSubjects,
        gradeLevel: editGradeLevel,
        schedule: editSchedule,
        room: editRoom,
      });
      setEditingClass(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deletingClass) return;
    try {
      await deleteClass(deletingClass.id);
      if (openedClass?.id === deletingClass.id) {
        setOpenedClass(null);
      }
      setDeletingClass(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to sync class student count in store and backend
  const syncClassStudentCount = async (classId: string, currentStudents: TeacherStudent[]) => {
    const count = currentStudents.filter((s) => s.classIds?.includes(classId)).length;
    await updateClass(classId, { studentCount: count });
    if (openedClass && openedClass.id === classId) {
      setOpenedClass(prev => prev ? { ...prev, studentCount: count } : null);
    }
    if (addStudentToClass && addStudentToClass.id === classId) {
      setAddStudentToClass(prev => prev ? { ...prev, studentCount: count } : null);
    }
  };

  // Immediate enroll action
  const handleEnrollStudent = async (studentId: string, classId: string) => {
    const updatedStudents = students.map((s) =>
      s.id === studentId ? { ...s, classIds: Array.from(new Set([...(s.classIds || []), classId])) } : s
    );
    await setStudents(updatedStudents);
    await syncClassStudentCount(classId, updatedStudents);
  };

  // Immediate unenroll action
  const handleUnenrollStudent = async (studentId: string, classId: string) => {
    const updatedStudents = students.map((s) =>
      s.id === studentId ? { ...s, classIds: (s.classIds || []).filter(id => id !== classId) } : s
    );
    await setStudents(updatedStudents);
    await syncClassStudentCount(classId, updatedStudents);
  };

  // Batch enroll actions
  const handleBatchEnroll = async (studentIds: string[], classId: string) => {
    if (studentIds.length === 0) return;
    const updatedStudents = students.map((s) =>
      studentIds.includes(s.id) ? { ...s, classIds: Array.from(new Set([...(s.classIds || []), classId])) } : s
    );
    await setStudents(updatedStudents);
    await syncClassStudentCount(classId, updatedStudents);
  };

  // Batch unenroll actions
  const handleBatchUnenroll = async (studentIds: string[], classId: string) => {
    if (studentIds.length === 0) return;
    const updatedStudents = students.map((s) =>
      studentIds.includes(s.id) ? { ...s, classIds: (s.classIds || []).filter(id => id !== classId) } : s
    );
    await setStudents(updatedStudents);
    await syncClassStudentCount(classId, updatedStudents);
  };

  // Handle Student Remove Confirm
  const handleRemoveStudentConfirm = async () => {
    if (!studentToRemove || !openedClass) return;
    try {
      await handleUnenrollStudent(studentToRemove.id, openedClass.id);
      setStudentToRemove(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Add Student Submit
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addStudentToClass) return;

    try {
      if (!newStudentName.trim() || !newStudentEmail.trim()) return;

      const newStudent: TeacherStudent = {
        id: "stu_" + Date.now(),
        name: newStudentName,
        email: newStudentEmail,
        gradeLevel: addStudentToClass.gradeLevel,
        performanceScore: Number(newStudentPerformance),
        attendanceRate: Number(newStudentAttendance),
        riskStatus: Number(newStudentPerformance) < 70 ? "HIGH" : (Number(newStudentPerformance) < 80 ? "MEDIUM" : "LOW"),
        lastActive: new Date().toISOString(),
        classIds: [addStudentToClass.id],
      };

      const updatedStudents = [...students, newStudent];
      await setStudents(updatedStudents);
      await syncClassStudentCount(addStudentToClass.id, updatedStudents);

      // Clear states
      setNewStudentName("");
      setNewStudentEmail("");
      setNewStudentPerformance(85);
      setNewStudentAttendance(95);
      setModalTab("roster");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Create Assignment Submit
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openedClass || !newAsnTitle.trim()) return;

    const newAsn = {
      id: "asn_" + Date.now(),
      classId: openedClass.id,
      title: newAsnTitle,
      description: newAsnDesc,
      dueDate: newAsnDueDate || new Date(Date.now() + 86400000 * 3).toISOString(),
      status: "PUBLISHED" as const,
      submissionCount: 0,
      totalStudents: openedClass.studentCount || 1,
    };

    setAssignments([...assignments, newAsn]);
    setNewAsnTitle("");
    setNewAsnDesc("");
    setNewAsnDueDate("");
    setIsCreatingAssignment(false);
  };

  // Open Edit Dialog
  const triggerEdit = (c: TeacherClass) => {
    setEditingClass(c);
    setEditName(c.name || "");
    
    // Safely parse subjects into an array of strings
    let parsedSubjects: string[] = [];
    if (Array.isArray(c.subjects)) {
      parsedSubjects = c.subjects;
    } else if (typeof c.subjects === "string") {
      try {
        const parsed = JSON.parse(c.subjects);
        parsedSubjects = Array.isArray(parsed) ? parsed : [c.subjects];
      } catch (_) {
        parsedSubjects = (c.subjects as string).includes(",")
          ? (c.subjects as string).split(",").map((s) => s.trim()).filter(Boolean)
          : [(c.subjects as string).trim()].filter(Boolean);
      }
    } else if ((c as any).subject) {
      parsedSubjects = [(c as any).subject];
    }

    setEditSubjects(parsedSubjects);
    setEditNewSubject("");
    setEditGradeLevel(c.gradeLevel || "");
    setEditSchedule(c.schedule || "");
    setEditRoom(c.room || "");
    setActiveMenuId(null);
  };

  // Get enrolled students for a class
  const getEnrolledStudents = (classId: string, gradeLevel: string) => {
    return students.filter((s) => s.classIds?.includes(classId));
  };

  // Get assignments for a class
  const getClassAssignments = (classId: string) => {
    return assignments.filter((a) => a.classId === classId);
  };

  // Calculate stats for a class
  const getClassStats = (classId: string, grade: string) => {
    const enrolled = getEnrolledStudents(classId, grade);
    if (enrolled.length === 0) return { avgPerf: 82, avgAtt: 94 };

    const avgPerf = Math.round(
      enrolled.reduce((sum, s) => sum + s.performanceScore, 0) / enrolled.length
    );
    const avgAtt = Math.round(
      enrolled.reduce((sum, s) => sum + s.attendanceRate, 0) / enrolled.length
    );

    return { avgPerf, avgAtt };
  };

  // Get list of existing students who are not already in this class
  const getUnregisteredStudents = (classId: string) => {
    return students.filter((s: any) => !s.classIds?.includes(classId));
  };

  if (openedClass) {
    const enrolled = getEnrolledStudents(openedClass.id, openedClass.gradeLevel);
    const classAsns = getClassAssignments(openedClass.id);
    const { avgPerf, avgAtt } = getClassStats(openedClass.id, openedClass.gradeLevel);

    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Class Details Banner */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold mb-2">
          <button
            onClick={() => setOpenedClass(null)}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to My Classes
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-6 md:p-8 text-white relative shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider uppercase">
                {Array.isArray(openedClass.subjects) && openedClass.subjects.length > 0 ? openedClass.subjects.join(", ") : (typeof openedClass.subjects === "string" ? openedClass.subjects : openedClass.subject)}
              </span>
              <h1 className="text-3xl font-black tracking-tight">{openedClass.name}</h1>
              <p className="text-white/80 text-sm font-semibold flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <School className="h-4 w-4 text-amber-400" /> Room: {openedClass.room}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-emerald-300" /> Schedule: {openedClass.schedule}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-cyan-300" /> Grade: {openedClass.gradeLevel}
                </span>
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => triggerEdit(openedClass)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Edit className="h-4 w-4" /> Edit Class Details
              </button>
              <button
                onClick={() => setAddStudentToClass(openedClass)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="h-4 w-4" /> Add Students
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled</p>
              <h4 className="text-2xl font-black text-slate-800">{enrolled.length}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Performance</p>
              <h4 className="text-2xl font-black text-slate-800">{avgPerf}%</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Attendance</p>
              <h4 className="text-2xl font-black text-slate-800">{avgAtt}%</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assignments</p>
              <h4 className="text-2xl font-black text-slate-800">{classAsns.length}</h4>
            </div>
          </div>
        </div>

        {/* Content Tabs: Students and Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Students Roster */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-blue-500" /> Enrolled Students ({enrolled.length})
              </h3>
              <button
                onClick={() => setAddStudentToClass(openedClass)}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Quick Enroll
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
              {enrolled.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  No students assigned to this class yet. Click "Add Students" to enroll them.
                </div>
              ) : (
                enrolled.map((student) => (
                  <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 overflow-hidden">
                        {student.profilePictureUrl ? (
                          student.profilePictureUrl.length <= 4 ? (
                            <span className="text-xl">{student.profilePictureUrl}</span>
                          ) : (
                            <img src={student.profilePictureUrl} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )
                        ) : (
                          student.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                        <p className="text-xs text-slate-400 font-semibold">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-semibold">Performance</span>
                        <span className={`text-xs font-bold ${
                          student.performanceScore >= 80 ? "text-emerald-600" : student.performanceScore >= 70 ? "text-amber-600" : "text-rose-600"
                        }`}>
                          {student.performanceScore}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-semibold">Attendance</span>
                        <span className="text-xs font-bold text-slate-700">{student.attendanceRate}%</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        student.riskStatus === "LOW" ? "bg-emerald-50 text-emerald-700" : student.riskStatus === "MEDIUM" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        {student.riskStatus} Risk
                      </span>
                      <button
                        onClick={() => setStudentToRemove(student)}
                        title="Remove student from class"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors ml-1 cursor-pointer shrink-0"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Assignments Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-violet-500" /> Assignments ({classAsns.length})
              </h3>
              {!isCreatingAssignment && (
                <button
                  onClick={() => setIsCreatingAssignment(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> New Task
                </button>
              )}
            </div>

            <div className="flex-1 p-4 space-y-4 max-h-[420px] overflow-y-auto">
              {isCreatingAssignment && (
                <form onSubmit={handleCreateAssignment} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-700">Add New Assignment</span>
                    <button
                      type="button"
                      onClick={() => setIsCreatingAssignment(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Physics Lab Report"
                      value={newAsnTitle}
                      onChange={(e) => setNewAsnTitle(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                    <textarea
                      placeholder="Enter details..."
                      value={newAsnDesc}
                      onChange={(e) => setNewAsnDesc(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none resize-none h-16"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Due Date</label>
                    <input
                      type="date"
                      value={newAsnDueDate}
                      onChange={(e) => setNewAsnDueDate(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Publish Assignment
                  </button>
                </form>
              )}

              {classAsns.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  No assignments published yet. Click "New Task" to create one.
                </div>
              ) : (
                classAsns.map((asn) => (
                  <div key={asn.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-violet-300 transition-all">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-slate-800 text-xs">{asn.title}</h4>
                      <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-[9px] font-bold">
                        {asn.status}
                      </span>
                    </div>
                    {asn.description && <p className="text-slate-500 text-[11px] line-clamp-2">{asn.description}</p>}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Due: {new Date(asn.dueDate).toLocaleDateString()}
                      </span>
                      <span>{asn.submissionCount} / {asn.totalStudents} Submissions</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Edit Class Modal */}
        {editingClass && renderEditModal()}

        {/* Add Student Modal */}
        {addStudentToClass && renderAddStudentModal()}

        {/* Student Removal Confirmation Modal */}
        {studentToRemove && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden p-6 space-y-4 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserMinus className="h-5 w-5 text-red-500" />
                Unenroll Student?
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Are you sure you want to remove <strong className="text-slate-800">{studentToRemove.name}</strong> from this class? They will no longer be listed under this class's roster.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStudentToRemove(null)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveStudentConfirm}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Unenroll
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Classes</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage your assigned classes, students, and schedules.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-300 transition-all duration-200 relative group"
          >
            {/* Dropdown Menu Trigger */}
            <div className="absolute top-4 right-4 z-10">
              <div className="relative">
                <button
                  onClick={() => setActiveMenuId(activeMenuId === c.id ? null : c.id)}
                  className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {activeMenuId === c.id && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-20 animate-in fade-in duration-100">
                    <button
                      onClick={() => {
                        setOpenedClass(c);
                        setActiveMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <FolderOpen className="h-4 w-4 text-blue-500" /> Open Class
                    </button>
                    <button
                      onClick={() => triggerEdit(c)}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Edit className="h-4 w-4 text-amber-500" /> Edit Details
                    </button>
                    <button
                      onClick={() => {
                        setAddStudentToClass(c);
                        setActiveMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="h-4 w-4 text-emerald-500" /> Add Students
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setDeletingClass(c);
                        setActiveMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" /> Delete Class
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Gradient Top Header */}
            <div className="h-28 bg-gradient-to-br from-blue-600 to-indigo-700 p-5 relative flex flex-col justify-end">
              <span className="text-[10px] font-black tracking-widest text-white/70 uppercase">
                {Array.isArray(c.subjects) && c.subjects.length > 0 ? c.subjects.join(", ") : (typeof c.subjects === "string" ? c.subjects : c.subject)}
              </span>
              <h3 className="font-extrabold text-white text-lg tracking-tight line-clamp-1 mt-0.5">{c.name}</h3>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Users className="h-4 w-4 text-blue-500 shrink-0" />
                  {getEnrolledStudents(c.id, c.gradeLevel).length} Students
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Calendar className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span className="truncate">{c.schedule}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 mb-6 flex-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5 text-[9px] uppercase font-bold tracking-wider">
                    Grade Level
                  </span>
                  {c.gradeLevel}
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5 text-[9px] uppercase font-bold tracking-wider">
                    Room / Lab
                  </span>
                  {c.room}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <button
                  onClick={() => setOpenedClass(c)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FolderOpen className="h-4 w-4" /> Open Class
                </button>
                <button
                  onClick={() => setAddStudentToClass(c)}
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" /> Add Students
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Create New Class
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Class Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. O Level Physics - Sec 4C"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subjects
                </label>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {subjects.map((s, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 animate-in zoom-in-95">
                      {s}
                      <button 
                        type="button" 
                        onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {subjects.length === 0 && (
                    <span className="text-[10px] text-slate-400 italic">No subjects added yet.</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add subject (e.g. Physics)"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newSubject.trim()) {
                          setSubjects([...subjects, newSubject.trim()]);
                          setNewSubject("");
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSubject.trim()) {
                        setSubjects([...subjects, newSubject.trim()]);
                        setNewSubject("");
                      }
                    }}
                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Grade Level
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={`Grade ${i + 1}`}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Schedule / Days
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mon, Wed or Tue, Thu"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Room
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Room 101 or Lab 3"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {editingClass && renderEditModal()}

      {/* Add Student Modal */}
      {addStudentToClass && renderAddStudentModal()}

      {/* Delete Confirmation Modal */}
      {deletingClass && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Delete Class?
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Are you sure you want to delete <strong className="text-slate-800">{deletingClass.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeletingClass(null)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Helper render for edit modal
  function renderEditModal() {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit Class Details
            </h3>
            <button
              onClick={() => setEditingClass(null)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Class Name
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subjects
              </label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {(Array.isArray(editSubjects) ? editSubjects : []).map((s, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 animate-in zoom-in-95">
                    {s}
                    <button 
                      type="button" 
                      onClick={() => setEditSubjects((Array.isArray(editSubjects) ? editSubjects : []).filter((_, i) => i !== idx))}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {(!Array.isArray(editSubjects) || editSubjects.length === 0) && (
                  <span className="text-[10px] text-slate-400 italic">No subjects added yet.</span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add subject (e.g. Physics)"
                  value={editNewSubject}
                  onChange={(e) => setEditNewSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (editNewSubject.trim()) {
                        const current = Array.isArray(editSubjects) ? editSubjects : [];
                        setEditSubjects([...current, editNewSubject.trim()]);
                        setEditNewSubject("");
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editNewSubject.trim()) {
                      const current = Array.isArray(editSubjects) ? editSubjects : [];
                      setEditSubjects([...current, editNewSubject.trim()]);
                      setEditNewSubject("");
                    }
                  }}
                  className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all cursor-pointer"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Grade Level
                </label>
                <select
                  value={editGradeLevel}
                  onChange={(e) => setEditGradeLevel(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Schedule / Days
              </label>
              <input
                type="text"
                required
                value={editSchedule}
                onChange={(e) => setEditSchedule(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Room
              </label>
              <input
                type="text"
                required
                value={editRoom}
                onChange={(e) => setEditRoom(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingClass(null)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Helper render for add student modal
  function renderAddStudentModal() {
    if (!addStudentToClass) return null;

    const enrolled = getEnrolledStudents(addStudentToClass.id, addStudentToClass.gradeLevel);
    const available = getUnregisteredStudents(addStudentToClass.id);

    const filteredEnrolled = enrolled.filter(s =>
      s.name.toLowerCase().includes(modalSearchEnrolled.toLowerCase()) ||
      s.email.toLowerCase().includes(modalSearchEnrolled.toLowerCase())
    );

    const filteredAvailable = available.filter(s =>
      s.name.toLowerCase().includes(modalSearchUnenrolled.toLowerCase()) ||
      s.email.toLowerCase().includes(modalSearchUnenrolled.toLowerCase())
    );

    const allEnrolledFilteredIds = filteredEnrolled.map(s => s.id);
    const allAvailableFilteredIds = filteredAvailable.map(s => s.id);

    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Roster Manager: {addStudentToClass.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Manage student enrollment. Click any student to instantly enroll or unenroll them from this class.
              </p>
            </div>
            <button
              onClick={() => setAddStudentToClass(null)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/20 px-6 shrink-0">
            <button
              onClick={() => setModalTab("roster")}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                modalTab === "roster"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Roster Management ({enrolled.length} Enrolled)
            </button>
            <button
              onClick={() => setModalTab("register")}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                modalTab === "register"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Register New Student
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-white">
            {modalTab === "roster" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Left Pane: Enrolled Students */}
                <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/20 p-4 space-y-4">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                      Enrolled Students ({filteredEnrolled.length})
                    </span>
                    {filteredEnrolled.length > 0 && (
                      <button
                        onClick={() => handleBatchUnenroll(allEnrolledFilteredIds, addStudentToClass.id)}
                        className="text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Unenroll All Filtered
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search enrolled students..."
                      value={modalSearchEnrolled}
                      onChange={(e) => setModalSearchEnrolled(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Scrollable list */}
                  <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[340px] border border-slate-100 rounded-xl bg-white p-1 space-y-1 divide-y divide-slate-100 shadow-inner">
                    {filteredEnrolled.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                        <Users className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-xs text-slate-500 font-semibold">No students enrolled</p>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Click any available student on the right to instantly enroll them here.</p>
                      </div>
                    ) : (
                      filteredEnrolled.map((s) => {
                        return (
                          <div
                            key={s.id}
                            className="flex items-center justify-between p-2.5 rounded-lg transition-colors gap-3 hover:bg-rose-50/25 group"
                          >
                            <label 
                              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                              onClick={() => handleUnenrollStudent(s.id, addStudentToClass.id)}
                            >
                              <input
                                type="checkbox"
                                checked={true}
                                readOnly
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-800 truncate group-hover:text-rose-700 transition-colors">{s.name}</div>
                                <div className="text-[10px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                                  <span>{s.gradeLevel}</span>
                                  <span>•</span>
                                  <span>Perf: {s.performanceScore}%</span>
                                </div>
                              </div>
                            </label>
                            <button
                              onClick={() => handleUnenrollStudent(s.id, addStudentToClass.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                              title="Unenroll student"
                            >
                              <UserMinus className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Pane: Available Students */}
                <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/20 p-4 space-y-4">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Available Students ({filteredAvailable.length})
                    </span>
                    {filteredAvailable.length > 0 && (
                      <button
                        onClick={() => handleBatchEnroll(allAvailableFilteredIds, addStudentToClass.id)}
                        className="text-[11px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Enroll All Filtered
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search available students..."
                      value={modalSearchUnenrolled}
                      onChange={(e) => setModalSearchUnenrolled(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Scrollable list */}
                  <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[340px] border border-slate-100 rounded-xl bg-white p-1 space-y-1 divide-y divide-slate-100 shadow-inner">
                    {filteredAvailable.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                        <Users className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-xs text-slate-500 font-semibold">No available students</p>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">All registered students are already enrolled in this class.</p>
                      </div>
                    ) : (
                      filteredAvailable.map((s) => {
                        const otherClassIds = (s.classIds || []).filter(id => id !== addStudentToClass.id);
                        const enrolledInOther = otherClassIds.length > 0;
                        const otherClass = enrolledInOther ? classes.find(c => c.id === otherClassIds[0]) : null;

                        return (
                          <div
                            key={s.id}
                            className="flex items-center justify-between p-2.5 rounded-lg transition-colors gap-3 hover:bg-emerald-50/25 group"
                          >
                            <label 
                              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                              onClick={() => handleEnrollStudent(s.id, addStudentToClass.id)}
                            >
                              <input
                                type="checkbox"
                                checked={false}
                                readOnly
                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5 cursor-pointer"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">{s.name}</div>
                                <div className="text-[10px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5 flex-wrap">
                                  <span>{s.gradeLevel}</span>
                                  <span>•</span>
                                  {otherClass ? (
                                    <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[9px] truncate">
                                      Class: {otherClass.name}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 italic">Unassigned</span>
                                  )}
                                </div>
                              </div>
                            </label>
                            <button
                              onClick={() => handleEnrollStudent(s.id, addStudentToClass.id)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
                              title="Enroll student"
                            >
                              <UserPlus className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Register New Student Pane */
              <form onSubmit={handleAddStudentSubmit} className="space-y-4 max-w-lg mx-auto py-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Khan"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Student Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@ebm.edu"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Performance Score (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={newStudentPerformance}
                      onChange={(e) => setNewStudentPerformance(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Attendance Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={newStudentAttendance}
                      onChange={(e) => setNewStudentAttendance(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Register & Enroll Student
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50">
            <button
              onClick={() => setAddStudentToClass(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}
