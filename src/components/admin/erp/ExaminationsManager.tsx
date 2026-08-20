import React, { useState, useEffect } from "react";
import { 
  Calendar, Award, Clock, FileText, CheckCircle2, AlertCircle, Plus, 
  Trash2, Edit3, Users, BookOpen, RefreshCw, ChevronRight, Check, X,
  GraduationCap, Download, MapPin, Search
} from "lucide-react";

interface ExamEntity {
  id: string;
  classId: string;
  name: string;
  subject: string;
  examDate: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: "SCHEDULED" | "COMPLETED" | "PUBLISHED";
  room: string | null;
  syllabus: string | null;
}

interface ClassEntity {
  id: string;
  name: string;
  subjects: string[] | string | null;
  gradeLevel: string;
  room: string;
}

interface StudentEntity {
  id: string;
  name: string;
  email: string;
}

interface ResultEntity {
  id?: string;
  studentId: string;
  studentName?: string;
  marksObtained: number;
  status: string;
  teacherFeedback: string;
}

export function ExaminationsManager() {
  const [classes, setClasses] = useState<ClassEntity[]>([]);
  const [exams, setExams] = useState<ExamEntity[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<ExamEntity | null>(null);
  
  // Results Management
  const [results, setResults] = useState<ResultEntity[]>([]);
  const [classStudents, setClassStudents] = useState<StudentEntity[]>([]);
  
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingResults, setIsSavingResults] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamEntity | null>(null);

  // Form Fields
  const [formClassId, setFormClassId] = useState("");
  const [formName, setFormName] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDuration, setFormDuration] = useState(60);
  const [formTotalMarks, setFormTotalMarks] = useState(100);
  const [formPassingMarks, setFormPassingMarks] = useState(40);
  const [formStatus, setFormStatus] = useState<"SCHEDULED" | "COMPLETED" | "PUBLISHED">("SCHEDULED");
  const [formRoom, setFormRoom] = useState("");
  const [formSyllabus, setFormSyllabus] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Classes
      const classRes = await fetch("/api/teacher/classes");
      const classData = await classRes.json();
      if (classData.success && classData.classes) {
        setClasses(classData.classes);
      }

      // 2. Fetch Exams
      const examRes = await fetch("/api/exams");
      const examData = await examRes.json();
      if (examData.success && examData.exams) {
        setExams(examData.exams);
      }
    } catch (e) {
      triggerError("Failed to fetch database information.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 5000);
  };

  const handleOpenCreateModal = () => {
    setEditingExam(null);
    setFormClassId(selectedClassId || (classes[0]?.id || ""));
    setFormName("Final Examination");
    setFormSubject("");
    setFormDate(new Date().toISOString().substring(0, 16));
    setFormDuration(120);
    setFormTotalMarks(100);
    setFormPassingMarks(40);
    setFormStatus("SCHEDULED");
    setFormSyllabus("");
    
    const activeCls = classes.find(c => c.id === (selectedClassId || classes[0]?.id));
    setFormRoom(activeCls?.room || "");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exam: ExamEntity) => {
    setEditingExam(exam);
    setFormClassId(exam.classId);
    setFormName(exam.name);
    setFormSubject(exam.subject);
    // Format to yyyy-MM-ddThh:mm
    const dateStr = exam.examDate.includes("T") ? exam.examDate.substring(0, 16) : exam.examDate;
    setFormDate(dateStr);
    setFormDuration(exam.durationMinutes);
    setFormTotalMarks(exam.totalMarks);
    setFormPassingMarks(exam.passingMarks);
    setFormStatus(exam.status);
    setFormRoom(exam.room || "");
    setFormSyllabus(exam.syllabus || "");
    setIsModalOpen(true);
  };

  const handleExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClassId || !formName || !formSubject || !formDate) {
      triggerError("Please fill out all required fields.");
      return;
    }

    const payload = {
      classId: formClassId,
      name: formName,
      subject: formSubject,
      examDate: formDate,
      durationMinutes: formDuration,
      totalMarks: formTotalMarks,
      passingMarks: formPassingMarks,
      status: formStatus,
      room: formRoom || null,
      syllabus: formSyllabus || null
    };

    try {
      if (editingExam) {
        const res = await fetch(`/api/exams/${editingExam.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("Exam schedule updated in database.");
          setIsModalOpen(false);
          fetchData();
          if (selectedExam?.id === editingExam.id) {
            setSelectedExam({ ...selectedExam, ...payload });
          }
        } else {
          triggerError(data.error || "Failed to update exam.");
        }
      } else {
        const res = await fetch("/api/exams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("New examination scheduled successfully.");
          setIsModalOpen(false);
          fetchData();
        } else {
          triggerError(data.error || "Failed to create exam.");
        }
      }
    } catch (err: any) {
      triggerError("Network error: " + err.message);
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this exam and all its grading marks from the database?")) {
      try {
        const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("Exam deleted successfully.");
          setSelectedExam(null);
          fetchData();
        } else {
          triggerError("Failed to delete exam.");
        }
      } catch (err: any) {
        triggerError("Error deleting: " + err.message);
      }
    }
  };

  // Select an exam to view/enter marks
  const handleSelectExam = async (exam: ExamEntity) => {
    setSelectedExam(exam);
    setResults([]);
    setClassStudents([]);
    try {
      // 1. Fetch Students in that class
      const studentRes = await fetch(`/api/teacher/students?classId=${exam.classId}`);
      const studentData = await studentRes.json();
      let fetchedStudents: StudentEntity[] = [];
      if (studentData.success && studentData.students) {
        fetchedStudents = studentData.students;
        setClassStudents(fetchedStudents);
      }

      // 2. Fetch existing results
      const resultsRes = await fetch(`/api/exams/${exam.id}/results`);
      const resultsData = await resultsRes.json();
      
      if (resultsData.success && resultsData.results) {
        // Map existing results
        const mapped = fetchedStudents.map(student => {
          const match = resultsData.results.find((r: any) => r.studentId === student.id);
          return {
            studentId: student.id,
            studentName: student.name,
            marksObtained: match ? match.marksObtained : 0,
            status: match ? match.status : "GRADED",
            teacherFeedback: match ? match.teacherFeedback : ""
          };
        });
        setResults(mapped);
      } else {
        // Generate blank sheet
        const blank = fetchedStudents.map(student => ({
          studentId: student.id,
          studentName: student.name,
          marksObtained: 0,
          status: "GRADED",
          teacherFeedback: ""
        }));
        setResults(blank);
      }
    } catch (e) {
      triggerError("Failed to synchronize student gradebook.");
    }
  };

  const handleResultChange = (studentId: string, field: keyof ResultEntity, value: any) => {
    setResults(prev => prev.map(r => {
      if (r.studentId === studentId) {
        return { ...r, [field]: value };
      }
      return r;
    }));
  };

  const handleSaveResults = async () => {
    if (!selectedExam) return;
    setIsSavingResults(true);
    try {
      const res = await fetch(`/api/exams/${selectedExam.id}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results })
      });
      const data = await res.json();
      if (data.success) {
        triggerSuccess("Marksheet updated and published successfully!");
        handleSelectExam(selectedExam); // Refresh
      } else {
        triggerError(data.error || "Failed to save grades.");
      }
    } catch (err: any) {
      triggerError("Network error: " + err.message);
    } finally {
      setIsSavingResults(false);
    }
  };

  const getSubjectsForClass = (clsId: string): string[] => {
    const cls = classes.find(c => c.id === clsId);
    if (!cls) return [];
    if (Array.isArray(cls.subjects)) return cls.subjects;
    if (typeof cls.subjects === "string") {
      try {
        return JSON.parse(cls.subjects);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const activeClass = classes.find(c => c.id === selectedClassId);
  const classExams = selectedClassId ? exams.filter(ex => ex.classId === selectedClassId) : exams;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Notifications */}
      {successMsg && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-black uppercase tracking-widest animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="h-4 w-4" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-rose-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-black uppercase tracking-widest animate-in slide-in-from-bottom duration-300">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Examinations & Marksheets</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">
            Publish Datesheets, Record Scores, and Monitor Subject Gradebooks
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            className="p-3 text-slate-500 hover:text-slate-950 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title="Refresh All"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenCreateModal}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Exam Schedule
          </button>
        </div>
      </div>

      {/* Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Class Structure:</span>
          <select 
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setSelectedExam(null);
            }}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 bg-slate-50/50 hover:bg-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">ALL CLASSES & EXAMS</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name.toUpperCase()} ({cls.gradeLevel})
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-blue-500" />
          <span>{classExams.length} examinations scheduled {selectedClassId ? "for this class" : "system-wide"}</span>
        </div>
      </div>

      {/* Main Grid: Left is Exam list, Right is Student Gradebook entries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Exam List (1-col) */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
            <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Scheduled Exams</span>
            <span className="text-[9px] font-black uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">ERP Sync</span>
          </div>

          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mt-2">Loading Scheduled Exams...</span>
            </div>
          ) : classExams.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400">
              <FileText className="h-10 w-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-black text-slate-700 uppercase tracking-tight">No Exams Scheduled</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase">Click 'Add Exam Schedule' above to create a new datesheet entry.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {classExams.map(ex => {
                const isSelected = selectedExam?.id === ex.id;
                const examClass = classes.find(c => c.id === ex.classId);
                return (
                  <div 
                    key={ex.id}
                    onClick={() => handleSelectExam(ex)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          isSelected ? "bg-amber-400 text-slate-950" : "bg-blue-50 text-blue-700"
                        }`}>
                          {ex.subject.toUpperCase()}
                        </span>
                        {examClass && (
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            isSelected ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"
                          }`}>
                            {examClass.name.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(ex);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected ? "hover:bg-slate-800 text-slate-300 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-950"
                          }`}
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExam(ex.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected ? "hover:bg-slate-800 text-rose-400 hover:text-rose-300" : "hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                          }`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs font-black uppercase tracking-tight mt-3">{ex.name}</h4>
                    
                    <div className="space-y-1.5 mt-4 border-t pt-3 border-slate-200/20 text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span>Date: {new Date(ex.examDate).toLocaleDateString()} at {new Date(ex.examDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>Duration: {ex.durationMinutes} minutes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>Room: {ex.room || "Classroom"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Total: {ex.totalMarks} Marks</span>
                        <span className="text-emerald-500 font-black">Passing: {ex.passingMarks}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200/10">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        ex.status === "PUBLISHED" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                      }`}>
                        {ex.status}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        Gradebook <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Student Marks Entry / Results Sheet (2-cols) */}
        <div className="space-y-4 lg:col-span-2">
          {selectedExam ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
              {/* Exam Title bar */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                      {selectedExam.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grading Marks Registry</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight mt-1">{selectedExam.name}</h3>
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedExam.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value as any;
                      const updated = { ...selectedExam, status: newStatus };
                      try {
                        const res = await fetch(`/api/exams/${selectedExam.id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(updated)
                        });
                        const data = await res.json();
                        if (data.success) {
                          triggerSuccess(`Exam status changed to ${newStatus}`);
                          setSelectedExam(updated);
                          fetchData();
                        }
                      } catch (err) {}
                    }}
                    className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 bg-white"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>

                  <button
                    onClick={handleSaveResults}
                    disabled={isSavingResults}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSavingResults ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : <Check className="h-4 w-4" />}
                    Save Grades
                  </button>
                </div>
              </div>

              {/* Syllabus / Content Section */}
              <div className="p-5 border-b border-slate-100 bg-amber-50/20 text-xs">
                <div className="flex items-center gap-1.5 font-black text-slate-800 uppercase tracking-wider mb-2">
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  <span>Exam Syllabus & Content / Topics Covered:</span>
                </div>
                {selectedExam.syllabus ? (
                  <p className="text-slate-600 font-medium bg-white p-3 rounded-xl border border-amber-100 whitespace-pre-wrap leading-relaxed">
                    {selectedExam.syllabus}
                  </p>
                ) : (
                  <p className="text-slate-400 italic bg-white p-3 rounded-xl border border-dashed border-slate-200">
                    No examination content or syllabus has been specified for this test. Click the edit (pencil) icon on the exam card to add content/syllabus.
                  </p>
                )}
              </div>

              {results.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <Users className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-black uppercase text-slate-700">No Students Enrolled</p>
                  <p className="text-[10px] mt-1 text-slate-500">Add students to {activeClass?.name} to grade them.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="p-4">Student Name</th>
                        <th className="p-4 w-32">Obtained Marks</th>
                        <th className="p-4 w-36">Status</th>
                        <th className="p-4">Remarks / Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {results.map(r => (
                        <tr key={r.studentId} className="hover:bg-slate-50/40 transition-all">
                          <td className="p-4 font-black text-slate-800 uppercase tracking-tight">
                            {r.studentName || "EBM Student"}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <input 
                                type="number"
                                min="0"
                                max={selectedExam.totalMarks}
                                value={r.marksObtained}
                                onChange={(e) => handleResultChange(r.studentId, "marksObtained", parseInt(e.target.value) || 0)}
                                className="w-16 border border-slate-200 rounded-lg p-2 font-bold focus:outline-none focus:border-blue-500 text-center"
                              />
                              <span className="text-slate-400 font-bold">/ {selectedExam.totalMarks}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <select
                              value={r.status}
                              onChange={(e) => handleResultChange(r.studentId, "status", e.target.value)}
                              className="border border-slate-200 rounded-lg p-2 font-bold focus:outline-none focus:border-blue-500 bg-white w-full"
                            >
                              <option value="GRADED">GRADED</option>
                              <option value="ABSENT">ABSENT</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <input 
                              type="text"
                              value={r.teacherFeedback}
                              onChange={(e) => handleResultChange(r.studentId, "teacherFeedback", e.target.value)}
                              placeholder="e.g. Excellent comprehension, needs practice in calculus"
                              className="w-full border border-slate-200 rounded-lg p-2 font-semibold focus:outline-none focus:border-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Published Notice */}
              {selectedExam.status === "PUBLISHED" && (
                <div className="p-4 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-tight">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Gradebook Published: Marks are now visible in Student and Parent panels in real-time.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 flex flex-col items-center justify-center h-full min-h-[300px]">
              <Award className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">No Exam Selected</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto uppercase tracking-wide">
                Select an examination from the left panel to record student marks, publish results, and write teacher feedback.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Modal: Schedule / Edit Exam */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  {editingExam ? "Edit Scheduled Exam" : "Schedule New Examination"}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Publish formal exams, passing criteria, and times
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleExamSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Class */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Class *</label>
                  <select
                    value={formClassId}
                    onChange={(e) => {
                      setFormClassId(e.target.value);
                      const cls = classes.find(c => c.id === e.target.value);
                      setFormRoom(cls?.room || "");
                    }}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white"
                    required
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject *</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white"
                    required
                  >
                    <option value="">Select subject...</option>
                    {getSubjectsForClass(formClassId).map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exam Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Exam Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Midterm Examination, Unit Assessment 2"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Date & Time *</label>
                <input 
                  type="datetime-local"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration (Min)</label>
                  <input 
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                
                {/* Total Marks */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Marks</label>
                  <input 
                    type="number"
                    value={formTotalMarks}
                    onChange={(e) => setFormTotalMarks(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                {/* Passing Marks */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Passing Marks</label>
                  <input 
                    type="number"
                    value={formPassingMarks}
                    onChange={(e) => setFormPassingMarks(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Location / Room */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Exam Location / Room</label>
                  <input 
                    type="text"
                    placeholder="e.g. Main Hall, Room 3B"
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Initial Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                </div>
              </div>

              {/* Syllabus / Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Syllabus / Examination Content & Topics</label>
                <textarea 
                  rows={4}
                  placeholder="e.g. Unit 1: Foundations of Mechanics, Newton's Laws of Motion, Friction and Gravity calculations."
                  value={formSyllabus}
                  onChange={(e) => setFormSyllabus(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                  {editingExam ? "Save Changes" : "Publish Schedule"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
