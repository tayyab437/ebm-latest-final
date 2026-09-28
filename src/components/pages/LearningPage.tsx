import React, { useState, useEffect } from "react";
import { SEOHead } from "../SEOHead";
const learningHeaderBg = "/learning-hero-bg-opt.webp";
import {
  Search,
  BookOpen,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  Plus,
  Sparkles,
  ChevronRight,
  X,
  Clock,
  Award,
  GraduationCap,
  Filter,
  Loader2,
  BookMarked,
  ArrowRight,
  Check
} from "lucide-react";

export interface DBClass {
  id: string;
  name: string;
  subjects: string[];
  gradeLevel: string;
  studentCount: number;
  schedule: string;
  room: string;
  status?: string;
  teacherName?: string;
}

interface LearningPageProps {
  onSignIn?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  userRole?: string;
  token?: string | null;
}

export function LearningPage({ onSignIn, onNavigateToTab, userRole, token }: LearningPageProps) {
  const [classes, setClasses] = useState<DBClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedGrade, setSelectedGrade] = useState<string>("ALL");
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>([]);
  
  // Selected class for Syllabus Modal
  const [selectedClassForSyllabus, setSelectedClassForSyllabus] = useState<DBClass | null>(null);
  const [curriculumLessons, setCurriculumLessons] = useState<any[]>([]);
  const [allCurriculums, setAllCurriculums] = useState<any[]>([]);
  const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(false);

  // New Class Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newGradeLevel, setNewGradeLevel] = useState("Grade 10");
  const [newSubjects, setNewSubjects] = useState("Mathematics, Science");
  const [newSchedule, setNewSchedule] = useState("Mon, Wed, Fri • 10:00 AM - 11:30 AM");
  const [newRoom, setNewRoom] = useState("Interactive Room 2");
  const [isSubmittingClass, setIsSubmittingClass] = useState(false);
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchDatabaseClasses();
    fetchAllCurriculums();
    if (token) {
      fetchEnrolledClasses();
    }
  }, [token]);

  const fetchAllCurriculums = async () => {
    try {
      const res = await fetch("/api/curriculum");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.curriculum)) {
          setAllCurriculums(data.curriculum);
        }
      }
    } catch (err) {
      console.error("Error fetching all curriculums:", err);
    }
  };

  const fetchDatabaseClasses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/classes");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.classes)) {
          setClasses(data.classes);
        }
      }
    } catch (err) {
      console.error("Error fetching classes from database:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEnrolledClasses = async () => {
    try {
      const res = await fetch("/api/student/classes", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.classes)) {
          setEnrolledClassIds(data.classes.map((c: any) => c.id));
        }
      }
    } catch (err) {
      console.error("Error fetching enrolled classes:", err);
    }
  };

  const handleEnroll = async (classId: string, className: string) => {
    if (!token) {
      if (onSignIn) onSignIn();
      return;
    }

    try {
      const res = await fetch("/api/student/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ classId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setEnrolledClassIds((prev) => Array.from(new Set([...prev, classId])));
          setEnrollSuccessMsg(`Successfully enrolled in "${className}"!`);
          setTimeout(() => setEnrollSuccessMsg(null), 4000);
          fetchDatabaseClasses();
        }
      }
    } catch (err) {
      console.error("Error enrolling in class:", err);
    }
  };

  const handleOpenSyllabus = async (cls: DBClass) => {
    setSelectedClassForSyllabus(cls);
    setIsLoadingCurriculum(true);
    try {
      const res = await fetch(`/api/curriculum?gradeLevel=${encodeURIComponent(cls.gradeLevel)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.curriculum)) {
          setCurriculumLessons(data.curriculum);
        } else {
          setCurriculumLessons([]);
        }
      }
    } catch (err) {
      console.error("Error fetching curriculum:", err);
      setCurriculumLessons([]);
    } finally {
      setIsLoadingCurriculum(false);
    }
  };

  const handleCreateClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    setIsSubmittingClass(true);
    try {
      const subjectArray = newSubjects.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClassName,
          gradeLevel: newGradeLevel,
          subjects: subjectArray,
          schedule: newSchedule,
          room: newRoom
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setShowCreateModal(false);
          setNewClassName("");
          fetchDatabaseClasses();
        }
      }
    } catch (err) {
      console.error("Error creating class:", err);
    } finally {
      setIsSubmittingClass(false);
    }
  };

  // Extract unique subjects & grades for filters
  const allSubjects = Array.from(
    new Set(classes.flatMap((c) => (Array.isArray(c.subjects) ? c.subjects : [])))
  ).filter(Boolean);

  const allGrades = Array.from(new Set(classes.map((c) => c.gradeLevel))).filter(Boolean);

  // Filter classes based on search query, subject, and grade
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(cls.subjects) && cls.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesSubject =
      selectedSubject === "ALL" ||
      (Array.isArray(cls.subjects) && cls.subjects.includes(selectedSubject));

    const matchesGrade = selectedGrade === "ALL" || cls.gradeLevel === selectedGrade;

    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <div id="learning-page-container" className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16">
      <SEOHead 
        title="EBM Learning Portal | Interactive Courses & Study Modules"
        description="Access structured learning modules, interactive lessons, syllabus plans, and adaptive practice exercises designed for Grade 1 through Cambridge O/A Levels."
        canonicalUrl="https://ejazbukharimethod.com/learning"
      />
      {/* Top Banner Header with Background Image & Light Overlay */}
      <div className="relative overflow-hidden shadow-sm py-14 px-4 sm:px-6 lg:px-8 border-b border-sky-100">
        {/* Background Image */}
        <img
          src={learningHeaderBg}
          alt="Learning Classroom Background"
          width="1200"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0076a5]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>EBM Database Classes & Learning Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-slate-900">
              Class Directory & Active Courses
            </h1>
            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Explore all official classes stored in the EBM database. Discover grade-specific syllabi, enroll in live sessions, and track master curriculum units.
            </p>
          </div>

          {/* Action Button for Teachers/Admins only */}
          {(userRole?.toUpperCase() === "ADMIN" || userRole?.toUpperCase() === "TEACHER") && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                id="create-class-modal-btn"
                onClick={() => setShowCreateModal(true)}
                className="bg-[#00a3e0] hover:bg-[#008cc0] text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Class to Database</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification Banner */}
      {enrollSuccessMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold">{enrollSuccessMsg}</span>
            </div>
            <button onClick={() => setEnrollSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Search & Filtering Controls */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes by name, subject, grade..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-[#00a3e0] bg-white cursor-pointer"
              >
                <option value="ALL">All Subjects</option>
                {allSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              {/* Grade Filter */}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-[#00a3e0] bg-white cursor-pointer"
              >
                <option value="ALL">All Grade Levels</option>
                {allGrades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {(selectedSubject !== "ALL" || selectedGrade !== "ALL" || searchQuery !== "") && (
                <button
                  onClick={() => {
                    setSelectedSubject("ALL");
                    setSelectedGrade("ALL");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#0076a5] hover:underline font-semibold cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Classes List / Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>Database Classes</span>
              <span className="text-xs font-semibold bg-sky-100 text-[#0076a5] px-2.5 py-0.5 rounded-full">
                {filteredClasses.length} Available
              </span>
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3 bg-white rounded-2xl border border-slate-200">
              <Loader2 className="w-8 h-8 text-[#00a3e0] animate-spin" />
              <p className="text-sm font-semibold text-slate-600">Loading database classes...</p>
            </div>
          ) : filteredClasses.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 space-y-4">
              <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No classes found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No database classes matched your search filter. Try clearing filters or create a new class.
              </p>
              <button
                onClick={() => {
                  setSelectedSubject("ALL");
                  setSelectedGrade("ALL");
                  setSearchQuery("");
                }}
                className="bg-[#00a3e0] hover:bg-[#008cc0] text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Show All Classes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => {
                const isEnrolled = enrolledClassIds.includes(cls.id);
                const classCurriculums = allCurriculums.filter(
                  (curr) =>
                    (curr.classId && curr.classId === cls.id) ||
                    (curr.gradeLevel && curr.gradeLevel.toLowerCase() === cls.gradeLevel.toLowerCase()) ||
                    (Array.isArray(cls.subjects) && cls.subjects.some((s) => s.toLowerCase() === curr.subject?.toLowerCase()))
                );
                const availableLessonsCount = classCurriculums.length > 0
                  ? classCurriculums.length
                  : (Array.isArray(cls.subjects) && cls.subjects.length > 0 ? cls.subjects.length * 6 : 6);
                const actualSubjectsList = Array.isArray(cls.subjects) && cls.subjects.length > 0
                  ? cls.subjects
                  : ["General Core"];

                return (
                  <div
                    key={cls.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-6 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-sky-50 text-[#0076a5] border border-sky-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                          {cls.gradeLevel}
                        </span>

                        {isEnrolled ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>Enrolled</span>
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
                            {cls.status || "ACTIVE"}
                          </span>
                        )}
                      </div>

                      {/* Class Title */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00a3e0] transition-colors leading-snug">
                        {cls.name}
                      </h3>

                      {/* Subjects List */}
                      {Array.isArray(cls.subjects) && cls.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cls.subjects.map((s, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Info Metadata */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        {/* Actual Subjects Count & List */}
                        <div className="flex items-start space-x-2">
                          <Award className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                          <div className="leading-tight">
                            <span className="font-semibold text-slate-900">{actualSubjectsList.length} {actualSubjectsList.length === 1 ? "Subject" : "Subjects"}:</span>{" "}
                            <span className="text-slate-600 font-medium">{actualSubjectsList.join(", ")}</span>
                          </div>
                        </div>

                        {/* Available Lessons Sum */}
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#00a3e0] shrink-0" />
                          <span>
                            <strong className="text-slate-900 font-bold">{availableLessonsCount}</strong> Available Lessons / Modules
                          </span>
                        </div>

                        {/* Enrolled Students */}
                        <div className="flex items-center space-x-2">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            <strong className="text-slate-900 font-bold">{cls.studentCount || 0}</strong> students enrolled
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenSyllabus(cls)}
                        className="text-xs font-bold text-slate-700 hover:text-[#00a3e0] transition cursor-pointer flex items-center space-x-1"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#00a3e0]" />
                        <span>View Syllabus</span>
                      </button>

                      {isEnrolled ? (
                        <button
                          onClick={() => {
                            if (onNavigateToTab) onNavigateToTab("dashboard");
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center space-x-1"
                        >
                          <span>Go to Class</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(cls.id, cls.name)}
                          className="bg-[#00a3e0] hover:bg-[#008cc0] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-2xs"
                        >
                          <span>Enroll Now</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* SYLLABUS & CURRICULUM MODAL */}
      {selectedClassForSyllabus && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0081b0] to-[#00a3e0] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                  {selectedClassForSyllabus.gradeLevel} Syllabus
                </span>
                <h3 className="text-xl font-bold">{selectedClassForSyllabus.name}</h3>
              </div>
              <button
                onClick={() => setSelectedClassForSyllabus(null)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <strong>Schedule:</strong> {selectedClassForSyllabus.schedule}
                </div>
                <div>
                  <strong>Room:</strong> {selectedClassForSyllabus.room}
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Curriculum Lessons & Modules ({curriculumLessons.length})
              </h4>

              {isLoadingCurriculum ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#00a3e0] animate-spin" />
                </div>
              ) : curriculumLessons.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>Standard EBM core curriculum active for {selectedClassForSyllabus.gradeLevel}.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {curriculumLessons.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50/50 transition flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#00a3e0] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Lesson {index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{item.title}</span>
                        </div>
                        {item.skillFocus && (
                          <p className="text-xs text-slate-600 line-clamp-2">{item.skillFocus}</p>
                        )}
                        <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-1">
                          {item.duration && (
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{item.duration} mins</span>
                            </span>
                          )}
                          {item.subject && <span>Subject: {item.subject}</span>}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedClassForSyllabus(null);
                          if (onNavigateToTab) onNavigateToTab("assessment");
                        }}
                        className="bg-[#00a3e0] hover:bg-[#008cc0] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap"
                      >
                        Practice
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedClassForSyllabus(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cls = selectedClassForSyllabus;
                  setSelectedClassForSyllabus(null);
                  handleEnroll(cls.id, cls.name);
                }}
                className="bg-[#00a3e0] hover:bg-[#008cc0] text-white text-xs font-bold px-5 py-2 rounded-xl cursor-pointer"
              >
                Enroll in Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW CLASS MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#00a3e0]" />
                <h3 className="text-lg font-bold text-slate-900">Add New Class to Database</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClassSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Advanced Mechanics & Physics 102"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#00a3e0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Grade Level</label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-[#00a3e0]"
                >
                  <option value="Grade 5 (Year 1)">Grade 5 (Year 1)</option>
                  <option value="Grade 6 (Year 1)">Grade 6 (Year 1)</option>
                  <option value="Grade 7 (Year 1)">Grade 7 (Year 1)</option>
                  <option value="Grade 8 (Year 2)">Grade 8 (Year 2)</option>
                  <option value="Grade 9 (Year 2)">Grade 9 (Year 2)</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11 (O-Level)">Grade 11 (O-Level)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subjects (Comma separated)
                </label>
                <input
                  type="text"
                  value={newSubjects}
                  onChange={(e) => setNewSubjects(e.target.value)}
                  placeholder="e.g. Mathematics, Algebra"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#00a3e0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="e.g. Mon, Wed, Fri • 10:00 AM"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#00a3e0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Room / Location</label>
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  placeholder="e.g. Interactive Lab 2"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#00a3e0]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingClass}
                  className="bg-[#00a3e0] hover:bg-[#008cc0] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer flex items-center space-x-2"
                >
                  {isSubmittingClass ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Create Class</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
