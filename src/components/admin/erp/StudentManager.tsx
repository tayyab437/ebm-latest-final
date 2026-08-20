import React, { useState, useEffect } from "react";
import { useAdminStore } from "./admin.store";
import { 
  Search, 
  Filter, 
  Plus, 
  GraduationCap, 
  Mail, 
  MoreVertical, 
  Download, 
  X, 
  Check, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Award 
} from "lucide-react";

export function StudentManager() {
  const { students, fetchStudents, updateStudentDiagnostics, isLoading } = useAdminStore();
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  
  // Modal State
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);

  // Fetch student records on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Fetch EBM curriculums to filter out diagnostic items
  useEffect(() => {
    fetch("/api/curriculum")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.curriculum)) {
          const filtered = data.curriculum.filter((item: any) => item.isDiagnostic === 1);
          setDiagnostics(filtered);
        }
      })
      .catch((err) => console.error("Error loading curriculum diagnostics:", err));
  }, []);

  // Sync selectedStudent state with updated store data when diagnostics toggled
  useEffect(() => {
    if (selectedStudent) {
      const updated = students.find((s) => s.id === selectedStudent.id);
      if (updated) {
        setSelectedStudent(updated);
      }
    }
  }, [students]);

  // Handle Toggling Diagnostic Unlock
  const handleToggleDiagnostic = async (lessonId: string) => {
    if (!selectedStudent) return;
    
    const currentUnlocked = Array.isArray(selectedStudent.unlockedDiagnostics)
      ? selectedStudent.unlockedDiagnostics
      : [];
      
    let newUnlocked: string[];
    if (currentUnlocked.includes(lessonId)) {
      newUnlocked = currentUnlocked.filter((id) => id !== lessonId);
    } else {
      newUnlocked = [...currentUnlocked, lessonId];
    }
    
    await updateStudentDiagnostics(selectedStudent.id, newUnlocked);
  };

  // Filter students based on search and grade dropdown selection
  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesGrade = 
      selectedGrade === "All Grades" || 
      s.gradeLevel === selectedGrade;
      
    return matchesSearch && matchesGrade;
  });

  // Extract all unique grade levels from loaded students for the dropdown
  const uniqueGrades = Array.from(new Set(students.map((s) => s.gradeLevel))).filter(Boolean);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Student Management</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">
            Centralized Records, Diagnostics & Enrollment Control
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" /> Bulk Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase tracking-widest text-slate-800"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest focus:outline-none"
            >
              <option value="All Grades">All Grades</option>
              {uniqueGrades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading student base...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <GraduationCap className="h-12 w-12 mx-auto stroke-1 text-slate-300 mb-3" />
            <span className="text-xs font-bold uppercase tracking-widest block">No students found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  <th className="px-6 py-5">Student Name</th>
                  <th className="px-6 py-5">Grade Level</th>
                  <th className="px-6 py-5 text-center">Diagnostics Status</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Profile Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const unlockedCount = Array.isArray(student.unlockedDiagnostics)
                    ? student.unlockedDiagnostics.length
                    : 0;

                  return (
                    <tr 
                      key={student.id} 
                      onClick={() => setSelectedStudent(student)}
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 border border-blue-100">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</div>
                            <div className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5 lowercase">
                              <Mail className="h-3 w-3 text-slate-400" /> {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {student.gradeLevel || "Grade 1"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          unlockedCount > 0 
                            ? "bg-amber-50 text-amber-700 border border-amber-200" 
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {unlockedCount} Unlocked
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border bg-emerald-100 text-emerald-700 border-emerald-200">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT PROFILE & DIAGNOSTICS CONFIGURATION MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#0F172A]/80 flex items-center justify-center p-4 md:p-6 z-[100] backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-100 scale-in duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{selectedStudent.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Info Sub-Bar */}
            <div className="px-6 py-4 bg-blue-50/50 border-b border-slate-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Grade Level</span>
                <span className="text-xs font-black text-slate-800 uppercase">{selectedStudent.gradeLevel || "Grade 1"}</span>
              </div>
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Attendance</span>
                <span className="text-xs font-black text-emerald-600">{selectedStudent.attendanceRate || 100}%</span>
              </div>
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Average Score</span>
                <span className="text-xs font-black text-indigo-600">{selectedStudent.performanceScore || 80}%</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                  Diagnostic Activation Dashboard
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Diagnostic evaluation modules assess this student's performance before enrollment. Checked diagnostics are unlocked for the student immediately. Unchecked items remain locked with their default purchase tag.
                </p>

                {diagnostics.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
                    <BookOpen className="h-8 w-8 mx-auto stroke-1 text-slate-300 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wide">No diagnostic lessons created yet</p>
                    <p className="text-[10px] mt-1 text-slate-500">Add or edit curriculum lessons in the Teacher Portal and check 'Diagnostic Lesson?' to populate this list.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {diagnostics.map((lesson) => {
                      const isUnlocked = Array.isArray(selectedStudent.unlockedDiagnostics) && 
                        selectedStudent.unlockedDiagnostics.includes(lesson.id);

                      return (
                        <div 
                          key={lesson.id}
                          className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                            isUnlocked 
                              ? "bg-amber-50/50 border-amber-300 shadow-xs" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="space-y-1 pr-4 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase tracking-widest">
                                {lesson.subject}
                              </span>
                              {lesson.price && (
                                <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                  {lesson.price}
                                </span>
                              )}
                            </div>
                            <h5 className="text-xs font-bold text-slate-900 truncate">{lesson.title}</h5>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{lesson.skillFocus || "Foundational pre-assessment evaluation."}</p>
                          </div>

                          <button
                            onClick={() => handleToggleDiagnostic(lesson.id)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                              isUnlocked 
                                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm" 
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            {isUnlocked ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5" /> Checked
                              </>
                            ) : (
                              "Unlock"
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Control Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
