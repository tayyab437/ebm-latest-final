import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { InteractiveLessonPlayer } from "./InteractiveLessonPlayer";
import { useDashboardStore } from "./dashboard.store";
import {
  BookOpen,
  Clock,
  ChevronRight,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  X,
  Users,
  GraduationCap,
  CalendarDays,
  Sparkles,
  Trophy,
  Award,
  PlayCircle,
  Check,
  Lock,
  ShieldAlert
} from "lucide-react";
import clsx from "clsx";
import { SubjectCard } from "./SubjectCard";
import { SubjectProgress } from "./dashboard.types";
import { GamifiedLevelsView } from "./GamifiedLevelsView";

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  assignmentId: string | null;
  assessmentId: string | null;
  type: string;
  content: string;
  submittedAt: string;
  status: string;
  score: number | null;
  feedback: string | null;
}

interface ClassData {
  id: string;
  name: string;
  subject?: string;
  subjects?: string[];
  gradeLevel: string;
  schedule: string;
  room: string;
  studentCount?: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  dueDate: string;
  status: string;
}

interface ClassAssessment {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  dueDate: string;
}

const DEFAULT_ASSESSMENTS: Record<string, ClassAssessment[]> = {
  "class_1": [
    {
      id: "ast_1",
      title: "Kinematics & Dynamics Chapter Diagnostic",
      description: "Covers speed, velocity, acceleration, free-fall, and Newton's Laws of Motion.",
      durationMinutes: 30,
      totalPoints: 50,
      passingScore: 35,
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]
    },
    {
      id: "ast_2",
      title: "Thermal Physics Mid-Term Assessment",
      description: "Covers specific heat capacity, latent heat, and kinetic model of matter.",
      durationMinutes: 45,
      totalPoints: 100,
      passingScore: 70,
      dueDate: new Date(Date.now() + 86400000 * 10).toISOString().split("T")[0]
    }
  ],
  "class_2": [
    {
      id: "ast_3",
      title: "Wave Mechanics & Light Diagnostic",
      description: "Covers reflection, refraction, lenses, and electromagnetic spectrum.",
      durationMinutes: 60,
      totalPoints: 100,
      passingScore: 65,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0]
    },
    {
      id: "ast_4",
      title: "Electricity Concept Check",
      description: "Covers charge, current, potential difference, and Ohm's Law.",
      durationMinutes: 20,
      totalPoints: 30,
      passingScore: 21,
      dueDate: new Date(Date.now() + 86400000 * 1).toISOString().split("T")[0]
    }
  ]
};

export function MyClassesView() {
  const { data, viewContext, fetchData: reloadDashboard } = useDashboardStore();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [activeTab, setActiveTab] = useState<"assignments" | "assessments">("assignments");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [viewingLesson, setViewingLesson] = useState<any | null>(null);
  const [selectedHistoryLesson, setSelectedHistoryLesson] = useState<any | null>(null);
  const [expandedHistoryAttemptId, setExpandedHistoryAttemptId] = useState<string | null>(null);
  const [classCurriculums, setClassCurriculums] = useState<any[]>([]);
  const [loadingClassCurriculums, setLoadingClassCurriculums] = useState(false);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchCurriculum();
    }
  }, [selectedClass, selectedSubject]);

  useEffect(() => {
    if (selectedClass) {
      const fetchAllClassCurriculums = async () => {
        setLoadingClassCurriculums(true);
        try {
          const res = await fetch(`/api/curriculum?classId=${selectedClass.id}`);
          const result = await res.json();
          if (result.success) {
            setClassCurriculums(result.curriculum || []);
          }
        } catch (e) {
          console.error("Failed to fetch all class curriculums:", e);
        } finally {
          setLoadingClassCurriculums(false);
        }
      };
      fetchAllClassCurriculums();
    } else {
      setClassCurriculums([]);
    }
  }, [selectedClass]);

  const fetchCurriculum = async () => {
    setLoadingCurriculum(true);
    try {
      const res = await fetch(`/api/curriculum?classId=${selectedClass?.id}&subject=${selectedSubject}`);
      const result = await res.json();
      if (result.success) {
        setCurriculums(result.curriculum || []);
      }
    } catch (e) {
      console.error("Failed to fetch curriculum:", e);
    } finally {
      setLoadingCurriculum(false);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  // Submission Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitType, setSubmitType] = useState<"ASSIGNMENT" | "ASSESSMENT">("ASSIGNMENT");
  const [submitItemId, setSubmitItemId] = useState<string>("");
  const [submitItemTitle, setSubmitItemTitle] = useState<string>("");
  const [submissionText, setSubmissionText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("ebm_token") || "";
      const headers = {
        "Authorization": token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
      };

      // 1. Fetch Classes
      const classesRes = await fetch("/api/student/classes", { headers });
      const classesData = await classesRes.json();
      if (classesData.success) {
        setClasses(classesData.classes);
        if (viewContext?.classId) {
          const cls = classesData.classes.find((c: any) => c.id === viewContext.classId);
          if (cls) {
            setSelectedClass(cls);
            if (viewContext.subject) setSelectedSubject(viewContext.subject);
          }
        } else if (classesData.classes.length > 0 && !selectedClass) {
          setSelectedClass(classesData.classes[0]);
        }
      }

      // 2. Fetch Assignments
      const assignmentsRes = await fetch("/api/teacher/assignments", { headers });
      const assignmentsData = await assignmentsRes.json();
      if (assignmentsData.success) {
        setAssignments(assignmentsData.assignments);
      }

      // 3. Fetch Student Submissions
      const submissionsRes = await fetch("/api/student/submissions", { headers });
      const submissionsData = await submissionsRes.json();
      if (submissionsData.success) {
        setSubmissions(submissionsData.submissions);
      }

      const completedRes = await fetch("/api/student/completed-lessons", { headers });
      const completedData = await completedRes.json();
      if (completedData.success && completedData.completedLessons) {
        setCompletedLessons(completedData.completedLessons.map((cl: any) => cl.lessonId));
      }
    } catch (err) {
      console.error("Failed to fetch student classes and assignments data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [data?.currentGrade]);

  const getSubmissionFor = (itemId: string, type: "ASSIGNMENT" | "ASSESSMENT") => {
    return submissions.find(s => 
      s.type === type && 
      (type === "ASSIGNMENT" ? s.assignmentId === itemId : s.assessmentId === itemId)
    );
  };

  const handleOpenSubmit = (id: string, title: string, type: "ASSIGNMENT" | "ASSESSMENT") => {
    setSubmitItemId(id);
    setSubmitItemTitle(title);
    setSubmitType(type);
    setSelectedFile(null);
    
    // Autofill with existing content if any
    const existing = getSubmissionFor(id, type);
    setSubmissionText(existing ? existing.content : "");
    
    setIsSubmitModalOpen(true);
  };

  const handleSubmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("ebm_token") || "";
      const studentName = localStorage.getItem("user_name") || "Imran Khan";
      
      const payload = {
        classId: selectedClass?.id,
        assignmentId: submitType === "ASSIGNMENT" ? submitItemId : null,
        assessmentId: submitType === "ASSESSMENT" ? submitItemId : null,
        type: submitType,
        content: submissionText,
        studentName,
        fileName: selectedFile ? selectedFile.name : null,
        fileUrl: selectedFile ? `https://storage.googleapis.com/ebm-edu-assets/submissions/${selectedFile.name}` : null
      };

      const response = await fetch("/api/student/submissions", {
        method: "POST",
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setStatusMsg("Your work has been submitted successfully and notified to your teacher!");
        await fetchAllData();
        await reloadDashboard(); // Refresh global student dashboard store to update streak, statistics, and promotion eligibility
        setTimeout(() => {
          setIsSubmitModalOpen(false);
          setStatusMsg("");
          setSubmissionText("");
        }, 2000);
      } else {
        alert("Failed to submit: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error submitting work:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const classAssignments = selectedClass 
    ? assignments.filter(a => a.classId === selectedClass.id && a.status === "PUBLISHED")
    : [];

  const classAssessments = selectedClass
    ? DEFAULT_ASSESSMENTS[selectedClass.id] || []
    : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {isLoading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Loading enrolled syllabus structures...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {!selectedClass ? (
            <div className="space-y-8">
              {/* HUD Metrics Dashboard Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Metric 1 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 flex items-center gap-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">My Classrooms</span>
                    <span className="text-lg font-black text-slate-800 block mt-0.5">{classes.length} Active</span>
                  </div>
                </div>
                {/* Metric 2 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 flex items-center gap-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Modules Mastery</span>
                    <span className="text-lg font-black text-slate-800 block mt-0.5">{completedLessons.length} Cleared</span>
                  </div>
                </div>
                {/* Metric 3 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 flex items-center gap-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-black text-xl">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Submissions</span>
                    <span className="text-lg font-black text-slate-800 block mt-0.5">{submissions.length} Total</span>
                  </div>
                </div>
                {/* Metric 4 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 flex items-center gap-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/5 rounded-bl-full pointer-events-none" />
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-black text-xl">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Rank Index</span>
                    <span className="text-lg font-black text-slate-800 block mt-0.5">Active Scholar</span>
                  </div>
                </div>
              </div>

              {/* Header Title */}
              <div className="pt-2 px-1">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  Interactive Academy Classrooms
                </h3>
              </div>

              {/* Grid lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {classes.map((cls, idx) => {
                  const gradientThemes = [
                    "from-blue-600 to-indigo-700 text-blue-600 bg-blue-50 border-blue-100",
                    "from-emerald-600 to-teal-700 text-emerald-600 bg-emerald-50 border-emerald-100",
                    "from-purple-600 to-violet-700 text-purple-600 bg-purple-50 border-purple-100",
                    "from-amber-600 to-orange-700 text-amber-600 bg-amber-50 border-amber-100"
                  ];
                  const currentTheme = gradientThemes[idx % gradientThemes.length];

                  let subjectList: string[] = [];
                  if (Array.isArray(cls.subjects)) subjectList = cls.subjects;
                  else if (typeof cls.subjects === "string") {
                    try {
                      const p = JSON.parse(cls.subjects);
                      if (Array.isArray(p)) subjectList = p;
                      else subjectList = [cls.subjects];
                    } catch (e) { subjectList = [cls.subjects]; }
                  } else if (cls.subject) {
                    subjectList = [cls.subject];
                  }

                  return (
                    <button
                      key={cls.id}
                      onClick={() => {
                        setSelectedClass(cls);
                        setActiveTab("assignments");
                      }}
                      className="w-full text-left rounded-[2rem] border border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col overflow-hidden relative"
                    >
                      {/* Interactive Card Visual Banner Accent */}
                      <div className={`h-24 w-full bg-gradient-to-r ${currentTheme.split(" ")[0]} ${currentTheme.split(" ")[1]} relative p-6 flex items-end overflow-hidden shrink-0`}>
                        <div className="absolute top-2 right-2 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform duration-500">
                          <BookOpen className="h-24 w-24 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
                        <span className="backdrop-blur-md bg-white/20 border border-white/20 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider relative z-10 shadow-xs">
                          {cls.gradeLevel}
                        </span>
                      </div>

                      {/* Main Card Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between w-full space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors leading-snug tracking-tight">
                            {cls.name}
                          </h4>
                          
                          {/* Subject Badges Row */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {subjectList.slice(0, 3).map((sub, sIdx) => (
                              <span key={sIdx} className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60">
                                {sub}
                              </span>
                            ))}
                            {subjectList.length > 3 && (
                              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 text-slate-400">
                                +{subjectList.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Schedule & Metadata Indicators */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-slate-400" />
                              {cls.schedule.split(',')[0]}...
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="h-4 w-4 text-slate-400" />
                              {cls.studentCount || 0} enrolled
                            </span>
                          </div>

                          {/* CTA Interactive Strip */}
                          <div className="pt-2">
                            <div className="w-full py-2.5 bg-slate-50 group-hover:bg-blue-50 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-600 border border-slate-100/50 group-hover:border-blue-100 transition-all flex items-center justify-center gap-2">
                              Enter Academy Classroom
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Back button and Class Title with a gorgeous dashboard Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Decorative background grid/bubble */}
                <div className="absolute -right-24 -top-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-24 -bottom-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <button 
                    onClick={() => setSelectedClass(null)}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all shadow-sm group cursor-pointer"
                  >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div>
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em] block mb-1">
                      CURRENT ACADEMY CLASSROOM
                    </span>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      {selectedClass.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-100 border border-indigo-400/20 uppercase tracking-wider">
                        {selectedClass.gradeLevel}
                      </span>
                      <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-indigo-300" />
                        {selectedClass.schedule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro Info HUD statistics in the Banner */}
                <div className="flex gap-4 relative z-10 bg-white/5 border border-white/10 p-4 rounded-2xl md:self-stretch items-center">
                  <div className="text-center px-4 border-r border-white/10">
                    <span className="text-[8px] font-black text-indigo-300 uppercase block tracking-widest">DIAGNOSTICS</span>
                    <span className="text-lg font-black block mt-0.5 text-amber-400">
                      {classCurriculums.filter(curr => curr.isDiagnostic === 1).length} Active
                    </span>
                  </div>
                  <div className="text-center px-4">
                    <span className="text-[8px] font-black text-indigo-300 uppercase block tracking-widest">PROGRESSION</span>
                    <span className="text-lg font-black block mt-0.5 text-emerald-400">
                      {classCurriculums.length > 0 ? Math.round((classCurriculums.filter(curr => completedLessons.includes(curr.id)).length / classCurriculums.length) * 100) : 0}% Done
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostics Section */}
              {(() => {
                const diagnosticLessons = classCurriculums.filter(curr => curr.isDiagnostic === 1);
                if (diagnosticLessons.length === 0) return null;

                const unlockedList = data?.unlockedDiagnostics || [];

                return (
                  <div className="space-y-6 mb-10 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 border border-amber-200/40 p-6 md:p-8 rounded-[2.5rem] shadow-xs relative overflow-hidden">
                    {/* Background decorations for a premium look */}
                    <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1 relative z-10">
                      <div>
                        <h3 className="text-xs font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <ShieldAlert className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                          Diagnostic Pre-Assessments & Evaluation
                        </h3>
                        <p className="text-xs text-slate-400 font-bold uppercase mt-1">Assigned to {selectedClass.gradeLevel} • Diagnostic Path</p>
                      </div>
                      <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl uppercase tracking-wider self-start sm:self-auto border border-amber-200/50">
                        {diagnosticLessons.length} Modules Available
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                      {diagnosticLessons.map((lesson) => {
                        const isUnlocked = unlockedList.includes(lesson.id);
                        
                        // Fallback high-quality images based on subject for a premium aesthetic
                        const defaultThumbnails: Record<string, string> = {
                          math: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
                          mathematics: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
                          science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
                          english: "https://images.unsplash.com/photo-1491843384429-171f1f0dca3d?auto=format&fit=crop&q=80&w=400",
                          physics: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400",
                          chemistry: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=400",
                          biology: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400"
                        };
                        const subjectLower = (lesson.subject || "").toLowerCase();
                        const finalThumbnail = lesson.thumbnailUrl || defaultThumbnails[subjectLower] || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400";

                        return (
                          <div 
                            key={lesson.id} 
                            className={clsx(
                              "bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-h-[420px] group",
                              isUnlocked 
                                ? "border-emerald-200 hover:border-emerald-300" 
                                : "border-slate-200/80 hover:border-amber-300/60"
                            )}
                          >
                            {/* Card Media Header */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100">
                              <img 
                                src={finalThumbnail} 
                                alt={lesson.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                              />
                              {/* Overlay for aesthetic depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20" />
                              
                              {/* Floating Badge (Left): Subject */}
                              <div className="absolute top-3.5 left-3.5">
                                <span className="backdrop-blur-md bg-white/90 border border-white/20 text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                                  {lesson.subject}
                                </span>
                              </div>

                              {/* Floating Badge (Right): Locked/Unlocked Status */}
                              <div className="absolute top-3.5 right-3.5">
                                {isUnlocked ? (
                                  <span className="backdrop-blur-md bg-emerald-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs flex items-center gap-1 border border-emerald-400/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="backdrop-blur-md bg-amber-500/95 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs flex items-center gap-1 border border-amber-400/30">
                                    <Lock className="h-3 w-3" /> Locked
                                  </span>
                                )}
                              </div>

                              {/* Floating Fee Tag (Bottom Right) */}
                              {lesson.price && (
                                <div className="absolute bottom-3 right-3">
                                  <span className="bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-700/50 shadow-xs">
                                    {lesson.price}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Card Information Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                              <div className="space-y-1.5">
                                <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug tracking-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                                  {lesson.title}
                                </h4>
                                <p className="text-xs font-semibold text-slate-500 line-clamp-2 leading-relaxed">
                                  {lesson.skillFocus || "Foundational pre-assessment & skill diagnostic evaluation."}
                                </p>
                              </div>

                              <div className="space-y-4">
                                {/* Extra Micro-Metadata for Premium Feel */}
                                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-3">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" /> {lesson.durationMinutes || 45}m Duration
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FileText className="h-3.5 w-3.5 text-slate-400" /> Diagnostic
                                  </span>
                                </div>

                                {/* Call to action button */}
                                {isUnlocked ? (
                                  <button
                                    onClick={() => setViewingLesson(lesson)}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                                  >
                                    <PlayCircle className="h-4.5 w-4.5" /> Start Assessment
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const num = lesson.whatsappNumber || "+923304541573";
                                      const text = encodeURIComponent(`Hi, I want to book the diagnostic lesson: ${lesson.title}`);
                                      window.open(`https://wa.me/${num.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                                    }}
                                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                                  >
                                    <Send className="h-4 w-4" /> Book on WhatsApp
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Subjects Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                    Enrolled Subjects in this Class
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                    let subjectsList: string[] = [];
                    if (Array.isArray(selectedClass.subjects)) {
                      subjectsList = selectedClass.subjects;
                    } else if (typeof selectedClass.subjects === "string") {
                      try {
                        const parsed = JSON.parse(selectedClass.subjects);
                        if (Array.isArray(parsed)) subjectsList = parsed;
                        else if (parsed) subjectsList = [String(parsed)];
                      } catch (e) {
                        subjectsList = [selectedClass.subjects];
                      }
                    } else if (selectedClass.subject) {
                      subjectsList = [selectedClass.subject];
                    }

                    return subjectsList.filter(Boolean).map((subName, idx) => {
                      // Try to find matching subject from dashboard data
                      const existingSubject = data?.subjects.find(s => s.name.toLowerCase() === subName!.toLowerCase());
                      
                      // Calculate real-time stats from database classCurriculums & student submissions (excluding diagnostic lessons)
                      const subjectCurriculums = classCurriculums.filter(
                        curr => curr.subject && curr.subject.toLowerCase() === subName!.toLowerCase() && curr.isDiagnostic !== 1
                      );
                      
                      const totalLessons = subjectCurriculums.length;
                      
                      const lessonsCompleted = subjectCurriculums.filter(curr => completedLessons.includes(curr.id)).length;

                      const progressPercentage = totalLessons > 0 
                        ? Math.round((lessonsCompleted / totalLessons) * 100)
                        : 0;

                      const uncompletedLessons = subjectCurriculums.filter(curr => !completedLessons.includes(curr.id));

                      const nextLessonTitle = uncompletedLessons.length > 0 
                        ? uncompletedLessons[0].title 
                        : (totalLessons > 0 ? "All Modules Completed!" : "no lessons scheduled");

                      if (existingSubject) {
                        const realTimeSubject: SubjectProgress = {
                          ...existingSubject,
                          totalLessons: totalLessons > 0 ? totalLessons : existingSubject.totalLessons,
                          lessonsCompleted: lessonsCompleted,
                          progressPercentage: progressPercentage,
                          nextLessonTitle: nextLessonTitle
                        };
                        return (
                          <SubjectCard 
                            key={existingSubject.id} 
                            subject={realTimeSubject} 
                            onClick={() => setSelectedSubject(subName!)}
                          />
                        );
                      }

                      // Fallback mock subject progress if not in dashboard store
                      const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500", "bg-amber-500"];
                      const codes = ["4024", "5054", "1123", "2210", "3162"];
                      const mockSubject: SubjectProgress = {
                        id: `mock_${subName}_${idx}`,
                        name: subName!,
                        code: codes[idx % codes.length],
                        progressPercentage: progressPercentage,
                        totalLessons: totalLessons > 0 ? totalLessons : 12,
                        lessonsCompleted: lessonsCompleted,
                        nextLessonTitle: nextLessonTitle,
                        pendingAssignments: 0,
                        aiMasteryScore: 0,
                        color: colors[idx % colors.length]
                      };
                      return (
                        <SubjectCard 
                          key={mockSubject.id} 
                          subject={mockSubject} 
                          onClick={() => setSelectedSubject(subName!)}
                        />
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Tab Selector Buttons brought below the Subjects Section */}
              <div className="flex justify-center md:justify-start pt-2">
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                  <button
                    onClick={() => setActiveTab("assignments")}
                    className={clsx(
                      "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      activeTab === "assignments" 
                        ? "bg-white text-blue-600 shadow-sm border border-slate-200" 
                        : "text-slate-500 hover:text-slate-800 cursor-pointer"
                    )}
                  >
                    Assignments
                  </button>
                  <button
                    onClick={() => setActiveTab("assessments")}
                    className={clsx(
                      "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      activeTab === "assessments" 
                        ? "bg-white text-blue-600 shadow-sm border border-slate-200" 
                        : "text-slate-500 hover:text-slate-800 cursor-pointer"
                    )}
                  >
                    Assessments
                  </button>
                </div>
              </div>

              {/* Curriculum View (if subject selected) - Beautiful Gamified Path Level Map */}
              {selectedSubject && (
                <GamifiedLevelsView
                  selectedSubject={selectedSubject}
                  selectedClass={selectedClass}
                  curriculums={curriculums}
                  submissions={submissions}
                  completedLessons={completedLessons}
                  onClose={() => setSelectedSubject(null)}
                  onStartLesson={(lesson) => setViewingLesson(lesson)}
                />
              )}

              {/* Tasks Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      {activeTab === "assignments" ? <FileText className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight">
                        {activeTab === "assignments" ? "Course Assignments" : "Academic Assessments"}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                        {selectedClass.name} • Room {selectedClass.room}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="text-xs font-extrabold text-emerald-500 mt-0.5 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-time Sync Active
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  {activeTab === "assignments" ? (
                    <div className="space-y-6">
                      {classAssignments.length === 0 ? (
                        <div className="py-20 text-center bg-slate-50/30 rounded-3xl border-2 border-dashed border-slate-200">
                          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                          <h4 className="font-bold text-slate-800">No Assignments Yet</h4>
                          <p className="text-xs text-slate-400 mt-1">Your teacher hasn't published any assignments for this class.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {classAssignments.map((asn) => {
                            const sub = getSubmissionFor(asn.id, "ASSIGNMENT");
                            const isSubmitted = !!sub;
                            const isGraded = sub?.status === "REVIEWED";

                            return (
                              <div
                                key={asn.id}
                                className="p-6 rounded-[1.5rem] border border-slate-100 bg-white hover:border-blue-200 transition-all shadow-xs group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                              >
                                <div className="min-w-0 flex-1 space-y-3">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <h5 className="font-black text-slate-800 text-base group-hover:text-blue-600 transition-colors">
                                      {asn.title}
                                    </h5>
                                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-100">
                                      <Clock className="h-3 w-3" />
                                      Due {new Date(asn.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    {asn.description}
                                  </p>

                                  {isSubmitted && (
                                    <div className="pt-2">
                                      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                                          <span>My Submission</span>
                                          <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-700 italic font-medium leading-relaxed">"{sub.content}"</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-4 shrink-0 w-full md:w-auto border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                                  {isGraded ? (
                                    <div className="text-right w-full">
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Graded
                                      </span>
                                      <div className="mt-2">
                                        <p className="text-2xl font-black text-blue-600 tracking-tighter">{sub.score}<span className="text-xs text-slate-300 ml-1 font-bold">/100</span></p>
                                      </div>
                                    </div>
                                  ) : isSubmitted ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-100">
                                      <Clock className="h-3.5 w-3.5" />
                                      Reviewing
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-700 border border-rose-100">
                                      <AlertCircle className="h-3.5 w-3.5" />
                                      Pending
                                    </span>
                                  )}

                                  {!isGraded && (
                                    <button
                                      onClick={() => handleOpenSubmit(asn.id, asn.title, "ASSIGNMENT")}
                                      className={clsx(
                                        "w-full md:w-auto px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer",
                                        isSubmitted 
                                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200" 
                                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                                      )}
                                    >
                                      {isSubmitted ? "Update Work" : "Open Workspace"}
                                      <ArrowRight className="h-4 w-4" />
                                    </button>
                                  )}

                                  {isGraded && sub.feedback && (
                                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 max-w-[240px]">
                                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Teacher Feedback</p>
                                      <p className="text-[11px] font-bold text-blue-700 italic leading-snug">"{sub.feedback}"</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {classAssessments.length === 0 ? (
                        <div className="py-20 text-center bg-slate-50/30 rounded-3xl border-2 border-dashed border-slate-200">
                          <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                          <h4 className="font-bold text-slate-800">No Assessments</h4>
                          <p className="text-xs text-slate-400 mt-1">There are no diagnostic tests or mid-terms scheduled for this class.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {classAssessments.map((ast) => {
                            const sub = getSubmissionFor(ast.id, "ASSESSMENT");
                            const isSubmitted = !!sub;
                            const isGraded = sub?.status === "REVIEWED";

                            return (
                              <div
                                key={ast.id}
                                className="p-6 rounded-[1.5rem] border border-slate-100 bg-white hover:border-purple-200 transition-all shadow-xs group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                              >
                                <div className="min-w-0 flex-1 space-y-3">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <div className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 text-[9px] font-black uppercase tracking-widest">
                                      {ast.durationMinutes} Mins • {ast.totalPoints} Points
                                    </div>
                                    <h5 className="font-black text-slate-800 text-base group-hover:text-purple-600 transition-colors">
                                      {ast.title}
                                    </h5>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    {ast.description}
                                  </p>

                                  {isSubmitted && (
                                    <div className="pt-2">
                                      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                                          <span>My Script Response</span>
                                          <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-700 italic font-medium leading-relaxed">"{sub.content}"</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-4 shrink-0 w-full md:w-auto border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                                  {isGraded ? (
                                    <div className="text-right w-full">
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        <Award className="h-3.5 w-3.5" />
                                        Completed
                                      </span>
                                      <div className="mt-2">
                                        <p className="text-2xl font-black text-purple-600 tracking-tighter">{sub.score}<span className="text-xs text-slate-300 ml-1 font-bold">/{ast.totalPoints}</span></p>
                                      </div>
                                    </div>
                                  ) : isSubmitted ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-100">
                                      <Clock className="h-3.5 w-3.5" />
                                      Marking...
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-700 border border-rose-100">
                                      <AlertCircle className="h-3.5 w-3.5" />
                                      Exam Open
                                    </span>
                                  )}

                                  {!isGraded && (
                                    <button
                                      onClick={() => handleOpenSubmit(ast.id, ast.title, "ASSESSMENT")}
                                      className={clsx(
                                        "w-full md:w-auto px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer",
                                        isSubmitted 
                                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200" 
                                          : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                                      )}
                                    >
                                      {isSubmitted ? "Edit Script" : "Start Exam"}
                                      <ArrowRight className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: SUBMISSION FORM */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className={`h-5 w-5 ${submitType === 'ASSIGNMENT' ? 'text-blue-600' : 'text-purple-600'}`} />
                Submit: {submitItemTitle}
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmissionSubmit} className="p-6 space-y-4">
              
              {statusMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  {statusMsg}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  {submitType === "ASSIGNMENT" ? "Your Submission Content / Answers" : "Your Examination Script Answers"}
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder={
                    submitType === "ASSIGNMENT"
                      ? "Write your assignment answers, descriptions, or online submission responses here..."
                      : "Input your exam answers, question solutions, or analytical essays here for official evaluation..."
                  }
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
                  disabled={isSubmitting || !!statusMsg}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Attach Documents (PDF, Word, Excel)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-3 text-slate-400" />
                      <p className="mb-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">PDF, DOCX, XLSX (MAX. 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 leading-normal flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                <span>
                  After submitting, your instructor will instantly receive this submission for assessment, scoring, and academic profiling.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  disabled={isSubmitting || !!statusMsg}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex items-center gap-2 px-5 py-2.5 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer ${
                    submitType === "ASSIGNMENT"
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
                      : "bg-purple-600 hover:bg-purple-700 shadow-purple-500/10"
                  }`}
                  disabled={isSubmitting || !!statusMsg}
                >
                  {isSubmitting ? "Submitting..." : "Submit Answer"}
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: INTERACTIVE LESSON PLAYER */}
      {viewingLesson && (
        <InteractiveLessonPlayer 
          lesson={viewingLesson}
          onClose={() => setViewingLesson(null)}
          onSubmit={(id, title) => {
            fetchAllData(); // Reload submissions list to reflect completed status and score
            reloadDashboard(); // Refresh global student dashboard store to sync grade, stats and promotion eligibility
            setViewingLesson(null);
          }}
        />
      )}

      {/* MODAL: ATTEMPT HISTORY */}
      {selectedHistoryLesson && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-2xl max-w-2xl w-full flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 rounded-t-[2rem]">
              <div>
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-0.5 font-sans">Practice History</span>
                <h3 className="text-base font-black text-slate-800 leading-tight font-sans">
                  {selectedHistoryLesson.title}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedHistoryLesson(null);
                  setExpandedHistoryAttemptId(null);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 font-sans">
                All Past Submissions
              </p>

              {submissions.filter(s => (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === selectedHistoryLesson.id).length === 0 ? (
                <div className="text-center p-8 text-slate-400">
                  <p className="text-sm font-medium font-sans">No attempts found for this lesson yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions
                    .filter(s => (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === selectedHistoryLesson.id)
                    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                    .map((sub, index, arr) => {
                      const attemptNum = arr.length - index;
                      const isExpanded = expandedHistoryAttemptId === sub.id;
                      const scoreVal = sub.score !== null ? Number(sub.score) : 0;
                      const isPassing = scoreVal >= 95;

                      let parsedContent: any = null;
                      try {
                        parsedContent = JSON.parse(sub.content || "{}");
                      } catch (e) {}

                      return (
                        <div 
                          key={sub.id} 
                          className={clsx(
                            "rounded-2xl border transition-all overflow-hidden bg-white",
                            isPassing ? "border-emerald-100 hover:border-emerald-200" : "border-slate-150 hover:border-slate-300"
                          )}
                        >
                          {/* Attempt Title bar */}
                          <div 
                            onClick={() => setExpandedHistoryAttemptId(isExpanded ? null : sub.id)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="space-y-1 font-sans">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                                Attempt #{attemptNum}
                              </span>
                              <p className="text-xs text-slate-500 font-medium">
                                {new Date(sub.submittedAt).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short"
                                })}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 font-sans">
                              <div className="text-right">
                                <span className={clsx(
                                  "text-sm font-black block leading-none",
                                  isPassing ? "text-emerald-600" : "text-amber-500"
                                )}>
                                  {scoreVal}%
                                </span>
                                <span className={clsx(
                                  "text-[9px] font-black uppercase tracking-wider block mt-0.5",
                                  isPassing ? "text-emerald-500" : "text-amber-400"
                                )}>
                                  {isPassing ? "Completed" : "Practiced"}
                                </span>
                              </div>
                              <ChevronRight className={clsx(
                                "h-4 w-4 text-slate-400 transition-transform",
                                isExpanded && "rotate-90 text-slate-700"
                              )} />
                            </div>
                          </div>

                          {/* Expanded review details */}
                          {isExpanded && parsedContent && parsedContent.questions && (
                            <div className="border-t border-slate-100 bg-slate-50/40 p-4 space-y-3.5 max-h-[250px] overflow-y-auto">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                                Question Breakdown
                              </p>
                              {parsedContent.questions.map((q: any, qIdx: number) => {
                                return (
                                  <div key={qIdx} className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-1 font-sans">
                                    <div className="flex justify-between items-start gap-4">
                                      <p className="text-xs font-bold text-slate-800">
                                        Q{qIdx + 1}: {q.question}
                                      </p>
                                      <span className={clsx(
                                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 block",
                                        q.isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                      )}>
                                        {q.isCorrect ? "Correct" : "Incorrect"}
                                      </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-x-4 gap-y-0.5 text-[11px] text-slate-500 pt-1">
                                      <p>
                                        Your Answer: <span className={clsx("font-bold", q.isCorrect ? "text-emerald-600" : "text-rose-500")}>
                                          {q.studentAnswer || "(Skipped)"}
                                        </span>
                                      </p>
                                      {!q.isCorrect && q.correctAnswer && (
                                        <p>
                                          Correct Answer: <span className="text-emerald-600 font-bold">{q.correctAnswer}</span>
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50 rounded-b-[2rem]">
              <button 
                onClick={() => {
                  setSelectedHistoryLesson(null);
                  setExpandedHistoryAttemptId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer font-sans"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
