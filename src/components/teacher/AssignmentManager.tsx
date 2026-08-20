import React, { useState, useEffect } from "react";
import { useTeacherStore } from "./teacher.store";
import { TeacherAssignment } from "./teacher.types";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Calendar,
  X,
  AlertCircle,
  BookOpen,
  CalendarDays,
  Sparkles,
  Users,
  GraduationCap,
  Award,
  Send,
  Eye
} from "lucide-react";

interface TeacherSubmission {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  assignmentId: string | null;
  assessmentId: string | null;
  type: "ASSIGNMENT" | "ASSESSMENT" | "CURRICULUM" | string;
  content: string;
  submittedAt: string;
  status: string;
  score: number | null;
  feedback: string | null;
  fileUrl?: string;
  fileName?: string;
}

interface ClassAssessment {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  dueDate: string;
  classId: string;
}

const DEFAULT_ASSESSMENTS: ClassAssessment[] = [
  {
    id: "ast_1",
    title: "Kinematics & Dynamics Chapter Diagnostic",
    description: "Covers speed, velocity, acceleration, free-fall, and Newton's Laws of Motion.",
    durationMinutes: 30,
    totalPoints: 50,
    passingScore: 35,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    classId: "class_1"
  },
  {
    id: "ast_2",
    title: "Thermal Physics Mid-Term Assessment",
    description: "Covers specific heat capacity, latent heat, and kinetic model of matter.",
    durationMinutes: 45,
    totalPoints: 100,
    passingScore: 70,
    dueDate: new Date(Date.now() + 86400000 * 10).toISOString().split("T")[0],
    classId: "class_1"
  },
  {
    id: "ast_3",
    title: "Wave Mechanics & Light Diagnostic",
    description: "Covers reflection, refraction, lenses, and electromagnetic spectrum.",
    durationMinutes: 60,
    totalPoints: 100,
    passingScore: 65,
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
    classId: "class_2"
  },
  {
    id: "ast_4",
    title: "Electricity Concept Check",
    description: "Covers charge, current, potential difference, and Ohm's Law.",
    durationMinutes: 20,
    totalPoints: 30,
    passingScore: 21,
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString().split("T")[0],
    classId: "class_2"
  }
];

export function AssignmentManager() {
  const assignments = useTeacherStore((state) => state.assignments);
  const classes = useTeacherStore((state) => state.classes);
  const students = useTeacherStore((state) => state.students);
  const createAssignment = useTeacherStore((state) => state.createAssignment);
  const updateAssignment = useTeacherStore((state) => state.updateAssignment);
  const deleteAssignment = useTeacherStore((state) => state.deleteAssignment);
  const fetchAssignments = useTeacherStore((state) => state.fetchAssignments);
  const fetchStudents = useTeacherStore((state) => state.fetchStudents);

  // Search & Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [activeTab, setActiveTab] = useState<"assignments" | "assessments" | "tests">("assignments");

  // Curriculums & Detailed reviews
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [selectedSubmissionToReview, setSelectedSubmissionToReview] = useState<TeacherSubmission | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<TeacherSubmission[]>([]);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; title: string; classId: string; totalPoints?: number } | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<"ASSIGNMENT" | "ASSESSMENT">("ASSIGNMENT");

  // Grading Form State
  const [gradingScore, setGradingScore] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});
  const [gradingStatusMsg, setGradingStatusMsg] = useState("");

  // Modals States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAsn, setSelectedAsn] = useState<TeacherAssignment | null>(null);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formClassId, setFormClassId] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED" | "CLOSED">("PUBLISHED");

  // Actions Notification State
  const [statusMsg, setStatusMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch from DB on mount
  const loadSubmissions = async () => {
    try {
      const res = await fetch("/api/teacher/submissions");
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error("Failed to load submissions:", err);
    }
  };

  const loadCurriculum = async () => {
    try {
      const res = await fetch("/api/curriculum");
      const data = await res.json();
      if (data.success && Array.isArray(data.curriculum)) {
        setCurriculums(data.curriculum);
      }
    } catch (err) {
      console.error("Failed to load curriculums:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchStudents();
    loadSubmissions();
    loadCurriculum();
  }, [fetchAssignments, fetchStudents]);

  // Set default class in form
  useEffect(() => {
    if (classes.length > 0 && !formClassId) {
      setFormClassId(classes[0].id);
    }
  }, [classes, formClassId]);

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || !formClassId || !formDueDate) return;

    setIsSaving(true);
    try {
      const success = await createAssignment({
        title: formTitle,
        description: formDescription,
        classId: formClassId,
        dueDate: new Date(formDueDate).toISOString(),
      });

      if (success) {
        setStatusMsg("Assignment successfully published and sent to students!");
        setTimeout(() => setStatusMsg(""), 4000);
        setIsAddModalOpen(false);
        // Reset form
        setFormTitle("");
        setFormDescription("");
        setFormDueDate("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsn || !formTitle.trim() || !formDescription.trim() || !formClassId || !formDueDate) return;

    setIsSaving(true);
    try {
      const success = await updateAssignment(selectedAsn.id, {
        title: formTitle,
        description: formDescription,
        classId: formClassId,
        dueDate: new Date(formDueDate).toISOString(),
        status: formStatus,
      });

      if (success) {
        setStatusMsg("Assignment updated successfully.");
        setTimeout(() => setStatusMsg(""), 4000);
        setIsEditModalOpen(false);
        setSelectedAsn(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete assignment: "${title}"?`)) {
      return;
    }

    try {
      const success = await deleteAssignment(id);
      if (success) {
        setStatusMsg("Assignment successfully deleted.");
        setTimeout(() => setStatusMsg(""), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open modals with pre-fill
  const openAddModal = () => {
    setFormTitle("");
    setFormDescription("");
    setFormDueDate("");
    if (classes.length > 0) {
      setFormClassId(classes[0].id);
    }
    setIsAddModalOpen(true);
  };

  const openEditModal = (asn: TeacherAssignment) => {
    setSelectedAsn(asn);
    setFormTitle(asn.title);
    setFormDescription(asn.description);
    setFormClassId(asn.classId);
    const formattedDate = asn.dueDate ? asn.dueDate.split("T")[0] : "";
    setFormDueDate(formattedDate);
    setFormStatus(asn.status);
    setIsEditModalOpen(true);
  };

  // Open Submissions Modal
  const openSubmissionsModal = (item: any, type: "ASSIGNMENT" | "ASSESSMENT") => {
    setSelectedItem(item);
    setSelectedItemType(type);
    
    // Clear previous grading inputs
    setGradingScore({});
    setGradingFeedback({});
    setGradingStatusMsg("");
    
    setIsSubmissionsModalOpen(true);
  };

  // Submit Grade
  const handleGradeSubmission = async (submissionId: string, maxScore: number) => {
    const scoreVal = gradingScore[submissionId];
    const feedbackVal = gradingFeedback[submissionId] || "";

    if (!scoreVal || isNaN(Number(scoreVal))) {
      alert("Please enter a valid numerical score.");
      return;
    }

    const scoreNum = Number(scoreVal);
    if (scoreNum < 0 || scoreNum > maxScore) {
      alert(`Score must be between 0 and ${maxScore}.`);
      return;
    }

    try {
      const response = await fetch(`/api/teacher/submissions/${submissionId}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: scoreNum,
          feedback: feedbackVal
        })
      });

      const data = await response.json();
      if (data.success) {
        setGradingStatusMsg("Grade submitted successfully and dispatched to student profile!");
        await loadSubmissions();
        setTimeout(() => setGradingStatusMsg(""), 3000);
      } else {
        alert("Failed to save grade: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error grading submission:", err);
    }
  };

  // Filter lists based on class selection and search
  const teacherClassIds = classes.map((c) => c.id);
  
  const activeTeacherAssignments = assignments.filter((a) => teacherClassIds.includes(a.classId));
  const filteredAssignments = activeTeacherAssignments.filter((asn) => {
    if (searchTerm && !asn.title.toLowerCase().includes(searchTerm.toLowerCase()) && !asn.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedClassId !== "ALL" && asn.classId !== selectedClassId) return false;
    if (selectedStatus !== "ALL" && asn.status !== selectedStatus) return false;
    return true;
  });

  const activeAssessments = DEFAULT_ASSESSMENTS.filter((a) => teacherClassIds.includes(a.classId));
  const filteredAssessments = activeAssessments.filter((ast) => {
    if (searchTerm && !ast.title.toLowerCase().includes(searchTerm.toLowerCase()) && !ast.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedClassId !== "ALL" && ast.classId !== selectedClassId) return false;
    return true;
  });

  const getTestName = (sub: any) => {
    if (sub.type === "ASSIGNMENT" && sub.assignmentId) {
      const matched = assignments.find(a => a.id === sub.assignmentId);
      return matched ? matched.title : "Homework Assignment";
    }
    if (sub.type === "ASSESSMENT" && sub.assessmentId) {
      const matched = DEFAULT_ASSESSMENTS.find(a => a.id === sub.assessmentId);
      return matched ? matched.title : "Syllabus Assessment";
    }
    if (sub.assessmentId) {
      const matched = curriculums.find(c => c.id === sub.assessmentId);
      return matched ? `Curriculum Test: ${matched.title}` : "Curriculum Checkpoint Test";
    }
    return "Syllabus Diagnostic Test";
  };

  const filteredTests = submissions.filter((sub) => {
    if (selectedClassId !== "ALL" && sub.classId !== selectedClassId) {
      return false;
    }
    if (selectedStatus !== "ALL") {
      if (selectedStatus === "SUBMITTED" && sub.status !== "SUBMITTED" && sub.status !== "COMPLETED") {
        return false;
      }
      if (selectedStatus === "REVIEWED" && sub.status !== "REVIEWED") {
        return false;
      }
    }
    if (searchTerm.trim() !== "") {
      const sName = (sub.studentName || "").toLowerCase();
      const tName = getTestName(sub).toLowerCase();
      const sVal = searchTerm.toLowerCase();
      if (!sName.includes(sVal) && !tName.includes(sVal)) {
        return false;
      }
    }
    return true;
  });

  // Helper to count submissions
  const getSubmissionsFor = (itemId: string, type: "ASSIGNMENT" | "ASSESSMENT") => {
    return submissions.filter((s) => s.type === type && (type === "ASSIGNMENT" ? s.assignmentId === itemId : s.assessmentId === itemId));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-600" />
            Curriculum Assignments & Assessments
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage student workflows, grade examination scripts, and evaluate coursework outputs.
          </p>
        </div>
        
        {activeTab === "assignments" && (
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer self-start sm:self-auto animate-in zoom-in-95"
          >
            <Plus className="h-4.5 w-4.5" />
            Create Assignment
          </button>
        )}
      </div>

      {/* TABS Toggles */}
      <div className="flex gap-1.5 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-5 py-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "assignments"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800 cursor-pointer"
          }`}
        >
          <FileText className="h-4 w-4" />
          Homework Assignments
        </button>
        <button
          onClick={() => setActiveTab("assessments")}
          className={`px-5 py-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "assessments"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-slate-500 hover:text-slate-800 cursor-pointer"
          }`}
        >
          <Award className="h-4 w-4" />
          Syllabus Assessments
        </button>
        <button
          onClick={() => setActiveTab("tests")}
          className={`px-5 py-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "tests"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800 cursor-pointer"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          All Student Taken Tests
        </button>
      </div>

      {/* Action success prompt */}
      {statusMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Main Filterable Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Top filter toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={activeTab === 'assignments' ? "Search assignments..." : activeTab === 'assessments' ? "Search assessments..." : "Search taken tests by student or title..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>

          {/* Inline dropdown filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Filter by class */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1.5 rounded-xl">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1.5">
                Class:
              </span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL">All Classes</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === "assignments" && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1.5 rounded-xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1.5">
                  Status:
                </span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            )}

            {(searchTerm || selectedClassId !== "ALL" || selectedStatus !== "ALL") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedClassId("ALL");
                  setSelectedStatus("ALL");
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Lists */}
        {activeTab === "assignments" && (
          <div className="overflow-x-auto animate-in fade-in duration-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Assignment & Instructions</th>
                  <th className="px-6 py-4">Class Target</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4 text-center">Student Submissions</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="max-w-md mx-auto space-y-2">
                        <FileText className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <h4 className="font-bold text-slate-800 text-sm">No Assignments Found</h4>
                        <p className="text-xs text-slate-400">Create an assignment to distribute coursework materials and track student responses.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((assignment) => {
                    const targetClass = classes.find((c) => c.id === assignment.classId);
                    const className = targetClass ? targetClass.name : "Unassigned Class";
                    
                    const subCount = getSubmissionsFor(assignment.id, "ASSIGNMENT").length;
                    const classStudentsCount = students.filter(s => (s.classIds || []).includes(assignment.classId)).length;

                    return (
                      <tr key={assignment.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4 max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-extrabold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                {assignment.title}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {assignment.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            {className}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "No due date"}
                          </div>
                        </td>

                        {/* Submission calculation based on our dynamic JSON database */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => openSubmissionsModal(assignment, "ASSIGNMENT")}
                            className="inline-flex flex-col items-center hover:bg-blue-50 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-100 group/sub"
                          >
                            <span className="text-xs font-black text-blue-600 flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              {subCount} / {classStudentsCount}
                            </span>
                            <div className="w-20 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                              <div
                                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${classStudentsCount > 0 ? (subCount / classStudentsCount) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-wider group-hover/sub:text-blue-600">Review Work</span>
                          </button>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1 justify-center px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                            assignment.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                              : assignment.status === "DRAFT"
                              ? "bg-slate-100 text-slate-600 border border-slate-200"
                              : "bg-rose-50 text-rose-700 border border-rose-150"
                          }`}>
                            {assignment.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditModal(assignment)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(assignment.id, assignment.title)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete"
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
        )}

        {activeTab === "assessments" && (
          <div className="overflow-x-auto animate-in fade-in duration-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Assessment & Modules</th>
                  <th className="px-6 py-4">Class Target</th>
                  <th className="px-6 py-4">Duration & Weight</th>
                  <th className="px-6 py-4 text-center">Evaluated Submissions</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssessments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="max-w-md mx-auto space-y-2">
                        <Award className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <h4 className="font-bold text-slate-800 text-sm">No Class Assessments Configured</h4>
                        <p className="text-xs text-slate-400">Class diagnostics are pre-mapped based on secondary exam registration structures.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAssessments.map((assessment) => {
                    const targetClass = classes.find((c) => c.id === assessment.classId);
                    const className = targetClass ? targetClass.name : "Unassigned Class";

                    const subCount = getSubmissionsFor(assessment.id, "ASSESSMENT").length;
                    const classStudentsCount = students.filter(s => (s.classIds || []).includes(assessment.classId)).length;

                    return (
                      <tr key={assessment.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4 max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                              <Award className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-extrabold text-slate-800 truncate group-hover:text-purple-600 transition-colors">
                                {assessment.title}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {assessment.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            {className}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-slate-700 space-y-0.5">
                            <div>{assessment.durationMinutes} Minutes Exam</div>
                            <div className="text-[10px] text-slate-400 font-extrabold">Total Weight: {assessment.totalPoints} pts</div>
                          </div>
                        </td>

                        {/* Submission evaluation panel trigger */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => openSubmissionsModal(assessment, "ASSESSMENT")}
                            className="inline-flex flex-col items-center hover:bg-purple-50 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-purple-100 group/sub"
                          >
                            <span className="text-xs font-black text-purple-600 flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              {subCount} / {classStudentsCount}
                            </span>
                            <div className="w-20 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                              <div
                                className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${classStudentsCount > 0 ? (subCount / classStudentsCount) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-wider group-hover/sub:text-purple-600">Review Papers</span>
                          </button>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 justify-center px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-150">
                            PUBLISHED
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exam Controlled</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "tests" && (
          <div className="overflow-x-auto animate-in fade-in duration-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Test Title</th>
                  <th className="px-6 py-4">Assessment Category</th>
                  <th className="px-6 py-4">Date Completed</th>
                  <th className="px-6 py-4 text-center">Score achieved</th>
                  <th className="px-6 py-4 text-right">Review Answers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="max-w-md mx-auto space-y-2">
                        <CheckCircle2 className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <h4 className="font-extrabold text-slate-800 text-sm">No Student Tests Found</h4>
                        <p className="text-xs text-slate-400">
                          We couldn't find any student checkpoints matching the search query or class filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTests.map((sub) => {
                    const testName = getTestName(sub);
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-extrabold text-xs flex items-center justify-center border border-indigo-100">
                              {sub.studentName ? sub.studentName[0] : "?"}
                            </div>
                            <div>
                              <div className="text-xs font-extrabold text-slate-800">{sub.studentName || "Unknown Student"}</div>
                              <div className="text-[10px] text-slate-400 font-bold">Class ID: {sub.classId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">{testName}</div>
                          <div className="text-[10px] text-slate-400 font-medium">Submission ID: {sub.id.substring(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                            sub.type === "ASSIGNMENT"
                              ? "bg-blue-50 text-blue-600 border-blue-150"
                              : sub.type === "ASSESSMENT"
                              ? "bg-purple-50 text-purple-600 border-purple-150"
                              : "bg-indigo-50 text-indigo-600 border-indigo-150"
                          }`}>
                            {sub.type === "ASSIGNMENT"
                              ? "Homework"
                              : sub.type === "ASSESSMENT"
                              ? "Syllabus Assessment"
                              : "Curriculum Checkpoint"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-slate-600">
                            {new Date(sub.submittedAt).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold">
                            {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {sub.score !== null ? (
                            <span className={`inline-flex items-center gap-1 justify-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              sub.score >= 85
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                                : sub.score >= 60
                                ? "bg-amber-50 text-amber-700 border border-amber-150"
                                : "bg-rose-50 text-rose-700 border border-rose-150"
                            }`}>
                              {sub.score}% {sub.score >= 70 ? "Pass" : "Fail"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 justify-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                              Awaiting Grade
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedSubmissionToReview(sub)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 border border-slate-200"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Review Answers
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: CREATE ASSIGNMENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Publish New Assignment
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. O-Level Physics: Kinematics Worksheet 2"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Select Target Class
                </label>
                <select
                  value={formClassId}
                  onChange={(e) => setFormClassId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                  required
                >
                  <option value="">Select class...</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Instructions & Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide objectives and instructions..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-700 flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                <span>
                  Once published, this assignment triggers instantly inside the daily planning checklist of all enrolled class students.
                </span>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-slate-150">
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
                  {isSaving ? "Publishing..." : "Publish Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ASSIGNMENT */}
      {isEditModalOpen && selectedAsn && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-blue-600" />
                Modify Published Assignment
              </h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedAsn(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Assignment Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Instructions & Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide precise instructions..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedAsn.id, selectedAsn.title)}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedAsn(null);
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

      {/* MODAL: SUBMISSIONS LIST AND GRADING FORM */}
      {isSubmissionsModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-3xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[85vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                  selectedItemType === "ASSIGNMENT" ? "bg-blue-50 text-blue-600 border border-blue-150" : "bg-purple-50 text-purple-600 border border-purple-150"
                }`}>
                  Evaluating: {selectedItemType}
                </span>
                <h3 className="font-extrabold text-slate-950 text-base mt-1 flex items-center gap-2">
                  Reviewing Papers: {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsSubmissionsModalOpen(false);
                  setSelectedItem(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable list of students and their submissions */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {gradingStatusMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                  {gradingStatusMsg}
                </div>
              )}

              <div className="space-y-4">
                {students.filter(s => {
                  const sClassIds = Array.isArray(s.classIds) ? s.classIds : [];
                  return sClassIds.includes(selectedItem.classId);
                }).length === 0 ? (
                  <div className="text-center py-12 text-slate-400 font-bold">
                    No students currently registered in this target class.
                  </div>
                ) : (
                  students.filter(s => {
                    const sClassIds = Array.isArray(s.classIds) ? s.classIds : [];
                    return sClassIds.includes(selectedItem.classId);
                  }).map((student) => {
                    const sub = submissions.find(s => 
                      s.studentId === student.id && 
                      (selectedItemType === "ASSIGNMENT" ? s.assignmentId === selectedItem.id : s.assessmentId === selectedItem.id)
                    );
                    const isSubmitted = !!sub;
                    const isGraded = sub?.status === "REVIEWED";
                    const maxPossibleScore = selectedItemType === "ASSESSMENT" ? selectedItem.totalPoints || 100 : 100;

                    return (
                      <div key={student.id} className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-xs space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-extrabold text-xs flex items-center justify-center">
                              {student.name[0]}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-800 text-sm">{student.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold">{student.email}</p>
                            </div>
                          </div>

                          <div>
                            {isGraded ? (
                              <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                                Graded ({sub.score} / {maxPossibleScore})
                              </span>
                            ) : isSubmitted ? (
                              <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wider">
                                Submitted - Awaiting Grade
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100 uppercase tracking-wider">
                                Missing Submission
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Submission answer detail */}
                        {isSubmitted ? (
                          <div className="space-y-4">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                              <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                                <span>Answer Sheet/Response:</span>
                                <span>Submitted on {new Date(sub.submittedAt).toLocaleString()}</span>
                              </div>
                              <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap leading-relaxed italic">
                                "{sub.content}"
                              </p>
                            </div>

                            {/* File Attachment Display */}
                            {sub.fileUrl && (
                              <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                  <FileText className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Attached Resource</p>
                                  <p className="text-xs font-bold text-slate-700 truncate mt-0.5">{sub.fileName || "document.pdf"}</p>
                                </div>
                                <a 
                                  href={sub.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                                >
                                  <Eye className="h-3 w-3" />
                                  View File
                                </a>
                              </div>
                            )}

                            {/* Evaluation Form / display */}
                            {isGraded ? (
                              <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Final Awarded Score:</span>
                                  <span className="text-base font-black text-blue-600">{sub.score} / {maxPossibleScore} Points</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Feedback Provided:</span>
                                  <p className="text-xs font-semibold text-slate-600">"{sub.feedback || "Good work!"}"</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-3">
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Evaluate & Input Grade</h5>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                  <div className="sm:col-span-3 space-y-1">
                                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Score (Max: {maxPossibleScore})</label>
                                    <input
                                      type="number"
                                      placeholder="e.g. 85"
                                      value={gradingScore[sub.id] || ""}
                                      onChange={(e) => setGradingScore({ ...gradingScore, [sub.id]: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>

                                  <div className="sm:col-span-7 space-y-1">
                                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Feedback & Comments</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Well organized answers, outstanding conceptual clarity."
                                      value={gradingFeedback[sub.id] || ""}
                                      onChange={(e) => setGradingFeedback({ ...gradingFeedback, [sub.id]: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>

                                  <div className="sm:col-span-2 flex items-end">
                                    <button
                                      type="button"
                                      onClick={() => handleGradeSubmission(sub.id, maxPossibleScore)}
                                      className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all cursor-pointer flex justify-center items-center gap-1 shadow-sm shadow-blue-500/10"
                                    >
                                      Grade
                                      <Send className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="py-2 text-center text-xs font-semibold text-slate-400 italic">
                            Student has not uploaded or finished their script for this deliverable yet.
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsSubmissionsModalOpen(false);
                  setSelectedItem(null);
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Evaluator
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: INDIVIDUAL TEST DETAILED REVIEW */}
      {selectedSubmissionToReview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[85vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-150">
                  Checkpoint Review
                </span>
                <h3 className="font-extrabold text-slate-950 text-base mt-1">
                  {selectedSubmissionToReview.studentName}'s Test Answers
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {getTestName(selectedSubmissionToReview)}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmissionToReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              
              {/* Submission Metadata */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Student Name</span>
                  <span className="text-xs font-extrabold text-slate-800">{selectedSubmissionToReview.studentName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Submitted On</span>
                  <span className="text-xs font-extrabold text-slate-800">
                    {new Date(selectedSubmissionToReview.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Questions/Answers Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Question-by-Question Analysis</h4>
                
                {(() => {
                  let parsedQs = [];
                  if (selectedSubmissionToReview.content) {
                    try {
                      const parsed = JSON.parse(selectedSubmissionToReview.content);
                      if (parsed.questions) parsedQs = parsed.questions;
                    } catch (e) {
                      // fallback
                    }
                  }

                  if (parsedQs.length === 0) {
                    return (
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Raw Answer Sheet</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                          "{selectedSubmissionToReview.content || "No textual response available."}"
                        </p>
                      </div>
                    );
                  }

                  return parsedQs.map((q: any, idx: number) => (
                    <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs font-sans">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
                          Q{idx + 1}
                        </span>
                        {q.isCorrect !== undefined && (
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            q.isCorrect 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}>
                            {q.isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 leading-snug">{q.question}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Student Answer</span>
                          <span className="text-xs font-bold text-slate-700">{q.studentAnswer || "No Answer"}</span>
                        </div>
                        <div className="p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl space-y-1">
                          <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wider block">Correct Solution</span>
                          <span className="text-xs font-bold text-emerald-800">{q.correctAnswer || "N/A"}</span>
                        </div>
                      </div>

                      {q.explanation && (
                        <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl mt-2">
                          <span className="text-[8px] font-black text-indigo-500 uppercase tracking-wider block">Concept Explanation</span>
                          <p className="text-[11px] text-indigo-800 font-medium leading-relaxed mt-0.5">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>

              {/* Grading / Feedback Override Form */}
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Evaluation Override</h4>
                
                {gradingStatusMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                    {gradingStatusMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Assigned Score (%)</label>
                    <input
                      type="number"
                      placeholder="e.g. 90"
                      value={gradingScore[selectedSubmissionToReview.id] ?? (selectedSubmissionToReview.score ?? "")}
                      onChange={(e) => setGradingScore({ ...gradingScore, [selectedSubmissionToReview.id]: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-8 space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Feedback Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Great progress, review kinematics formulas."
                      value={gradingFeedback[selectedSubmissionToReview.id] ?? (selectedSubmissionToReview.feedback ?? "")}
                      onChange={(e) => setGradingFeedback({ ...gradingFeedback, [selectedSubmissionToReview.id]: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const scoreVal = gradingScore[selectedSubmissionToReview.id] ?? selectedSubmissionToReview.score;
                      const feedbackVal = gradingFeedback[selectedSubmissionToReview.id] ?? selectedSubmissionToReview.feedback;
                      
                      if (scoreVal === null || scoreVal === undefined || isNaN(Number(scoreVal))) {
                        alert("Please enter a valid numerical score.");
                        return;
                      }

                      try {
                        const response = await fetch(`/api/teacher/submissions/${selectedSubmissionToReview.id}/grade`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            score: Number(scoreVal),
                            feedback: feedbackVal || ""
                          })
                        });
                        const data = await response.json();
                        if (data.success) {
                          setGradingStatusMsg("Evaluation override saved successfully!");
                          await loadSubmissions();
                          // Update active selection with latest values
                          setSelectedSubmissionToReview({
                            ...selectedSubmissionToReview,
                            score: Number(scoreVal),
                            feedback: feedbackVal || "",
                            status: "REVIEWED"
                          });
                          setTimeout(() => setGradingStatusMsg(""), 3000);
                        } else {
                          alert("Failed to grade: " + (data.message || "Unknown error"));
                        }
                      } catch (err) {
                        console.error("Error override grading:", err);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Evaluation
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubmissionToReview(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
