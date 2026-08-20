import React, { useState, useEffect } from "react";
import { useTeacherStore } from "./teacher.store";
import { TeacherStudent, TeacherClass } from "./teacher.types";
import {
  Search,
  Filter,
  Mail,
  Activity,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  BookOpen,
  GraduationCap,
  Sparkles,
  X,
  CheckCircle,
  UserCheck,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export function StudentDirectory() {
  const students = useTeacherStore((state) => state.students);
  const classes = useTeacherStore((state) => state.classes);
  const createStudent = useTeacherStore((state) => state.createStudent);
  const updateStudent = useTeacherStore((state) => state.updateStudent);
  const deleteStudent = useTeacherStore((state) => state.deleteStudent);
  const fetchStudents = useTeacherStore((state) => state.fetchStudents);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassTab, setSelectedClassTab] = useState<string>("ALL"); // "ALL" or class.id
  const [riskFilter, setRiskFilter] = useState<string>("ALL"); // "ALL", "LOW", "MEDIUM", "HIGH"
  const [performanceFilter, setPerformanceFilter] = useState<string>("ALL"); // "ALL", "HIGH", "MED", "LOW"

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudent | null>(null);
  const [selectedSubmissionsStudent, setSelectedSubmissionsStudent] = useState<any | null>(null);
  const [expandedCurriculumId, setExpandedCurriculumId] = useState<string | null>(null);

  // Curriculum & Submissions data
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [allCurriculums, setAllCurriculums] = useState<any[]>([]);

  const fetchAllSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch("/api/teacher/submissions");
      const data = await res.json();
      if (data.success) {
        setAllSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error("Error fetching submissions:", e);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const fetchAllCurriculums = async () => {
    try {
      const res = await fetch("/api/curriculum");
      const data = await res.json();
      if (data.success) {
        setAllCurriculums(data.curriculum || []);
      }
    } catch (e) {
      console.error("Error fetching curriculums:", e);
    }
  };

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formGrade, setFormGrade] = useState("Grade 10");
  const [formClassId, setFormClassId] = useState("");
  const [formPerformance, setFormPerformance] = useState(80);
  const [formAttendance, setFormAttendance] = useState(100);

  // Status notifications
  const [statusMsg, setStatusMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch updated records on mount
  useEffect(() => {
    fetchStudents();
    fetchAllSubmissions();
    fetchAllCurriculums();
  }, [fetchStudents]);

  // Set default form class on load
  useEffect(() => {
    if (classes.length > 0 && !formClassId) {
      setFormClassId(classes[0].id);
    }
  }, [classes, formClassId]);

  // Only get students enrolled in the teacher's active classes
  const teacherClassIds = classes.map((c) => c.id);
  const enrolledStudents = students.filter((s) => (s.classIds || []).some(id => teacherClassIds.includes(id)));

  // Handle class tab selection & filtering
  const activeEnrolledStudents = enrolledStudents.filter((student) => {
    // 1. Class Tab Filter
    if (selectedClassTab !== "ALL" && !(student.classIds || []).includes(selectedClassTab)) {
      return false;
    }
    // 2. Search Text Filter
    if (
      searchTerm &&
      !student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !student.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    // 3. Risk Status Filter
    if (riskFilter !== "ALL" && student.riskStatus !== riskFilter) {
      return false;
    }
    // 4. Performance Filter
    if (performanceFilter !== "ALL") {
      if (performanceFilter === "HIGH" && student.performanceScore < 85) return false;
      if (performanceFilter === "MED" && (student.performanceScore < 70 || student.performanceScore >= 85)) return false;
      if (performanceFilter === "LOW" && student.performanceScore >= 70) return false;
    }
    return true;
  });

  // Calculate live statistics based on the currently selected class or all enrolled
  const statsBase = selectedClassTab === "ALL" 
    ? enrolledStudents 
    : enrolledStudents.filter(s => (s.classIds || []).includes(selectedClassTab));

  const totalEnrolledCount = statsBase.length;
  
  const avgPerformance = totalEnrolledCount > 0 
    ? Math.round(statsBase.reduce((sum, s) => sum + s.performanceScore, 0) / totalEnrolledCount)
    : 0;

  const avgAttendance = totalEnrolledCount > 0
    ? Math.round(statsBase.reduce((sum, s) => sum + s.attendanceRate, 0) / totalEnrolledCount)
    : 0;

  const attentionNeededCount = statsBase.filter(
    (s) => s.riskStatus === "HIGH" || s.performanceScore < 75
  ).length;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "bg-emerald-50 text-emerald-700 border border-emerald-150";
      case "MEDIUM":
        return "bg-amber-50 text-amber-700 border border-amber-150";
      case "HIGH":
        return "bg-rose-50 text-rose-700 border border-rose-150";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-150";
    }
  };

  // Student Actions
  const handleOpenAddModal = () => {
    setFormName("");
    setFormEmail("");
    setFormGrade("Grade 10");
    if (classes.length > 0) {
      setFormClassId(classes[0].id);
    }
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (student: TeacherStudent) => {
    setSelectedStudent(student);
    setFormName(student.name);
    setFormEmail(student.email);
    setFormGrade(student.gradeLevel || "Grade 10");
    setFormClassId(student.classIds?.[0] || "");
    setFormPerformance(student.performanceScore);
    setFormAttendance(student.attendanceRate);
    setIsEditModalOpen(true);
  };

  const handleCreateStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formClassId) return;

    setIsSaving(true);
    try {
      const success = await createStudent({
        name: formName,
        email: formEmail,
        gradeLevel: formGrade,
        classIds: [formClassId],
      });

      if (success) {
        setStatusMsg("Student enrolled successfully!");
        setTimeout(() => setStatusMsg(""), 3000);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !formName.trim() || !formEmail.trim() || !formClassId) return;

    setIsSaving(true);
    try {
      // Re-evaluate risk level
      let calculatedRisk: "LOW" | "MEDIUM" | "HIGH" = "LOW";
      if (formAttendance < 80 || formPerformance < 70) {
        calculatedRisk = "HIGH";
      } else if (formAttendance < 90 || formPerformance < 80) {
        calculatedRisk = "MEDIUM";
      }

      const success = await updateStudent(selectedStudent.id, {
        name: formName,
        email: formEmail,
        gradeLevel: formGrade,
        classIds: [formClassId],
        performanceScore: Number(formPerformance),
        attendanceRate: Number(formAttendance),
        riskStatus: calculatedRisk,
      });

      if (success) {
        setStatusMsg("Student records synchronized successfully!");
        setTimeout(() => setStatusMsg(""), 3000);
        setIsEditModalOpen(false);
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to unenroll and delete ${studentName} from your roster? This cannot be undone.`)) {
      return;
    }

    try {
      const success = await deleteStudent(studentId);
      if (success) {
        setStatusMsg("Student removed successfully.");
        setTimeout(() => setStatusMsg(""), 3000);
        if (isEditModalOpen) {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Title Header with action button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            Class rosters & Directory
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Analyze grades, synchronize biometric attendance rates, and manage class enrollments.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4" />
          Enroll New Student
        </button>
      </div>

      {/* Success Notification Bubble */}
      {statusMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm animate-bounce">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          {statusMsg}
        </div>
      )}

      {/* Top statistics summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enrolled */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Total Enrolled
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalEnrolledCount}</span>
            <span className="text-xs font-semibold text-slate-500">students</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Active in current filtered segment
          </div>
          <div className="absolute right-4 bottom-4 opacity-5 text-slate-900">
            <BookOpen className="w-16 h-16" />
          </div>
        </div>

        {/* Average Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Class Avg Performance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgPerformance}%</span>
            <span className={`text-xs font-bold ${avgPerformance >= 80 ? "text-emerald-600" : "text-amber-500"}`}>
              {avgPerformance >= 80 ? "Satisfactory" : "Review Needed"}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${avgPerformance >= 80 ? "bg-emerald-500" : "bg-amber-400"}`}
              style={{ width: `${avgPerformance}%` }}
            />
          </div>
          <div className="absolute right-4 bottom-4 opacity-5 text-slate-900">
            <TrendingUp className="w-16 h-16" />
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Avg Attendance Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgAttendance}%</span>
            <span className={`text-xs font-bold ${avgAttendance >= 90 ? "text-emerald-600" : "text-rose-500"}`}>
              {avgAttendance >= 90 ? "Excellent" : "Irregular"}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${avgAttendance >= 90 ? "bg-emerald-500" : "bg-rose-500"}`}
              style={{ width: `${avgAttendance}%` }}
            />
          </div>
          <div className="absolute right-4 bottom-4 opacity-5 text-slate-900">
            <UserCheck className="w-16 h-16" />
          </div>
        </div>

        {/* Academic Attention Required */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 relative overflow-hidden">
          <span className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            Attention Needed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">{attentionNeededCount}</span>
            <span className="text-xs font-semibold text-slate-500">at risk</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Risk status High OR grades below 75%
          </div>
          <div className="absolute right-4 bottom-4 opacity-5 text-rose-600">
            <Sparkles className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Main filterable body card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Class Wise Segmented Tabs - "Arranged class wise like above there are tabs" */}
        <div className="border-b border-slate-200 bg-slate-50/50 p-1 flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedClassTab("ALL")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
              selectedClassTab === "ALL"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            All Enrolled Students ({enrolledStudents.length})
          </button>
          
          {classes.map((c) => {
            const classStudentCount = enrolledStudents.filter((s) => (s.classIds || []).includes(c.id)).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedClassTab(c.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                  selectedClassTab === c.id
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {c.name} ({classStudentCount})
              </button>
            );
          })}
        </div>

        {/* Detailed Controls bar (Search & Sub-Filters) */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-white">
          
          {/* Search box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Risk filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1.5">
                Risk:
              </span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL">All Risks</option>
                <option value="LOW">Low Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="HIGH">High Risk</option>
              </select>
            </div>

            {/* Performance filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1.5">
                Performance:
              </span>
              <select
                value={performanceFilter}
                onChange={(e) => setPerformanceFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL">All Scores</option>
                <option value="HIGH">High Achievers (≥85%)</option>
                <option value="MED">Average (70% - 84%)</option>
                <option value="LOW">At Risk (&lt;70%)</option>
              </select>
            </div>

            {/* Reset button */}
            {(searchTerm || riskFilter !== "ALL" || performanceFilter !== "ALL" || selectedClassTab !== "ALL") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRiskFilter("ALL");
                  setPerformanceFilter("ALL");
                  setSelectedClassTab("ALL");
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Student List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Class Enrollment</th>
                <th className="px-6 py-4">Grade Level</th>
                <th className="px-6 py-4 text-center">Performance Score</th>
                <th className="px-6 py-4 text-center">Biometric Attendance</th>
                <th className="px-6 py-4 text-center">Risk Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeEnrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="max-w-md mx-auto space-y-2">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                        <UserCheck className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">No Enrolled Students Found</h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        No students enrolled in your classes match the current search filters. Try selecting another tab or clear filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                activeEnrolledStudents.map((student) => {
                  const studentClass = classes.find((c) => (student.classIds || []).includes(c.id));
                  const className = studentClass ? studentClass.name : "Unassigned Class";

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/30 transition-colors group"
                    >
                      {/* Name / Email avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-extrabold text-sm shrink-0 border border-blue-200/50 overflow-hidden">
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
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                              {student.name}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Mail className="h-3 w-3 shrink-0 text-slate-400" /> 
                              <span className="truncate">{student.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-md border border-slate-200">
                          {className}
                        </span>
                      </td>

                      {/* Grade Level */}
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        {student.gradeLevel || "Grade 10"}
                      </td>

                      {/* Performance */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1 text-xs font-black text-slate-800">
                          {student.performanceScore}%
                          {student.performanceScore >= 85 ? (
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          ) : student.performanceScore < 70 ? (
                            <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                          ) : (
                            <Activity className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="px-6 py-4 text-center">
                        <div className="text-xs font-extrabold text-slate-800">
                          {student.attendanceRate}%
                        </div>
                      </td>

                      {/* Risk */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${getRiskColor(student.riskStatus)}`}
                        >
                          {student.riskStatus}
                          {student.riskStatus === "HIGH" && (
                            <AlertCircle className="h-3 w-3 ml-1 text-rose-600 animate-pulse" />
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedSubmissionsStudent(student)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="View practice & completion progress"
                          >
                            <GraduationCap className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(student)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit student record"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id, student.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Unenroll student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD STUDENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                Enroll New Student
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudentSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Imran Khan"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. imran@ebm.edu"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Grid: Grade and Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Grade Level
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10 (O-Level)</option>
                    <option value="O Level Accelerator">O Level Accelerator</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Assign Class
                  </label>
                  <select
                    value={formClassId}
                    onChange={(e) => setFormClassId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                    required
                  >
                    <option value="">Select a class...</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-700 leading-normal">
                New students start with a 100% Biometric Attendance rate and a baseline academic performance score of 80% automatically.
              </div>

              {/* Submit footer */}
              <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Enroll Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDENT */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-blue-600" />
                Edit Student Details
              </h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudentSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Imran Khan"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. imran@ebm.edu"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Grid: Grade and Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Grade Level
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10 (O-Level)</option>
                    <option value="O Level Accelerator">O Level Accelerator</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Class Enrollment
                  </label>
                  <select
                    value={formClassId}
                    onChange={(e) => setFormClassId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                    required
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scores: Performance and Attendance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Performance Score (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formPerformance}
                    onChange={(e) => setFormPerformance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Attendance Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formAttendance}
                    onChange={(e) => setFormAttendance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Submit footer with delete option */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDeleteStudent(selectedStudent.id, selectedStudent.name)}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Unenroll
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedStudent(null);
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PRACTICE PROGRESS & ATTEMPTS REVIEW */}
      {selectedSubmissionsStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm border border-emerald-100">
                  {selectedSubmissionsStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-base leading-tight">
                    {selectedSubmissionsStudent.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium font-sans">
                    {selectedSubmissionsStudent.email} • {selectedSubmissionsStudent.gradeLevel || "Grade 10"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedSubmissionsStudent(null);
                  setExpandedCurriculumId(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer font-sans"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Summary stats */}
              {(() => {
                const studentCurriculums = allCurriculums.filter(c => 
                  !c.classId || (selectedSubmissionsStudent.classIds || []).includes(c.classId)
                );
                
                const studentSubs = allSubmissions.filter(s => 
                  s.studentId === selectedSubmissionsStudent.id && (s.type === "CURRICULUM" || s.type === "curriculum_practice")
                );

                const completedCount = studentCurriculums.filter(curr => {
                  const currSubs = studentSubs.filter(s => s.assessmentId === curr.id);
                  return currSubs.some(s => (s.score || 0) >= 95);
                }).length;

                return (
                  <div className="grid grid-cols-3 gap-3 font-sans">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Assigned Courses</span>
                      <span className="text-base font-black text-slate-800">{studentCurriculums.length}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Curriculum modules</span>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Completed (95%+)</span>
                      <span className="text-base font-black text-emerald-600">{completedCount}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-sans">Mastered courses</span>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5 font-sans">Practice Sessions</span>
                      <span className="text-base font-black text-blue-600 font-sans">{studentSubs.length}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-sans">Total attempts</span>
                    </div>
                  </div>
                );
              })()}

              {/* Course items */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 font-sans">
                  Assigned Curriculum Lessons & Progress
                </h4>

                {(() => {
                  const studentCurriculums = allCurriculums.filter(c => 
                    !c.classId || (selectedSubmissionsStudent.classIds || []).includes(c.classId)
                  );

                  const studentSubs = allSubmissions.filter(s => 
                    s.studentId === selectedSubmissionsStudent.id && (s.type === "CURRICULUM" || s.type === "curriculum_practice")
                  );

                  if (studentCurriculums.length === 0) {
                    return (
                      <p className="text-center py-6 text-xs text-slate-400 font-medium font-sans">
                        No curriculum modules mapped to this student's class enrollment.
                      </p>
                    );
                  }

                  return studentCurriculums.map(curr => {
                    const currSubs = studentSubs.filter(s => s.assessmentId === curr.id);
                    const maxScore = currSubs.length > 0 
                      ? Math.max(...currSubs.map(s => s.score || 0)) 
                      : null;
                    const isCompleted = maxScore !== null && maxScore >= 95;
                    const isExpanded = expandedCurriculumId === curr.id;

                    return (
                      <div 
                        key={curr.id}
                        className="border border-slate-150 rounded-2xl bg-white overflow-hidden transition-all font-sans"
                      >
                        {/* Course header line */}
                        <div 
                          onClick={() => {
                            if (currSubs.length > 0) {
                              setExpandedCurriculumId(isExpanded ? null : curr.id);
                            }
                          }}
                          className={`p-4 flex items-center justify-between gap-4 transition-colors ${currSubs.length > 0 ? "cursor-pointer hover:bg-slate-50/50" : "cursor-default"}`}
                        >
                          <div className="min-w-0">
                            <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 rounded-md border border-slate-200">
                              {curr.subject || "No Subject"}
                            </span>
                            <p className="text-xs font-extrabold text-slate-800 truncate mt-1">
                              {curr.title}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              {isCompleted ? (
                                <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-block font-sans">
                                  Completed ({maxScore}%)
                                </span>
                              ) : maxScore !== null ? (
                                <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 rounded-full border border-amber-100 inline-block font-sans">
                                  Practiced ({maxScore}%)
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 rounded-full border border-slate-100 inline-block font-sans">
                                  Not Started
                                </span>
                              )}
                              {currSubs.length > 0 && (
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                                  {currSubs.length} attempt{currSubs.length > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>

                            {currSubs.length > 0 && (
                              <button className="text-slate-400 hover:text-slate-600 p-1">
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded attempts */}
                        {isExpanded && currSubs.length > 0 && (
                          <div className="p-4 bg-slate-50/40 border-t border-slate-100 space-y-3">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 font-sans">
                              Practice Attempt History
                            </h5>
                            {currSubs
                              .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                              .map((sub, idx, arr) => {
                                const attemptNum = arr.length - idx;
                                const subScore = sub.score !== null ? Number(sub.score) : 0;
                                const subPassed = subScore >= 95;

                                let parsed: any = null;
                                try {
                                  parsed = JSON.parse(sub.content || "{}");
                                } catch (e) {}

                                return (
                                  <div 
                                    key={sub.id}
                                    className="bg-white rounded-xl border border-slate-150 overflow-hidden font-sans"
                                  >
                                    <div className="p-3 bg-slate-100/50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold">
                                      <div className="space-y-0.5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                          Attempt #{attemptNum}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-medium font-sans">
                                          {new Date(sub.submittedAt).toLocaleString()}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <span className={`font-black font-sans ${subPassed ? "text-emerald-600" : "text-amber-600"}`}>
                                          Score: {subScore}%
                                        </span>
                                      </div>
                                    </div>

                                    {parsed && parsed.questions && (
                                      <div className="p-3 space-y-2.5 max-h-[220px] overflow-y-auto">
                                        {parsed.questions.map((q: any, qIdx: number) => (
                                          <div key={qIdx} className="text-xs space-y-0.5 font-sans border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start gap-3">
                                              <p className="font-bold text-slate-800">
                                                Q{qIdx + 1}: {q.question}
                                              </p>
                                              <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                                                q.isCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                                              }`}>
                                                {q.isCorrect ? "Correct" : "Incorrect"}
                                              </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 pt-0.5">
                                              Student Answer: <span className={`font-extrabold ${q.isCorrect ? "text-emerald-600" : "text-rose-500"}`}>
                                                {q.studentAnswer || "(Skipped)"}
                                              </span>
                                            </p>
                                            {!q.isCorrect && q.correctAnswer && (
                                              <p className="text-[11px] text-slate-400">
                                                Correct Answer: <span className="font-bold text-slate-600">{q.correctAnswer}</span>
                                              </p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50">
              <button
                onClick={() => {
                  setSelectedSubmissionsStudent(null);
                  setExpandedCurriculumId(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs hover:bg-black transition-colors cursor-pointer font-sans"
              >
                Close Progress Sheet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
