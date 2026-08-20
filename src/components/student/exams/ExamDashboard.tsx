import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/auth.store";
import { useExamStore } from "./exam.store";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Award, 
  MapPin,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import clsx from "clsx";

interface ScheduledExam {
  id: string;
  classId: string;
  className?: string;
  name: string;
  subject: string;
  examDate: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: string;
  room: string | null;
  syllabus?: string | null;
}

interface TermResult {
  id: string;
  examId: string;
  marksObtained: number;
  status: string;
  teacherFeedback: string | null;
  gradedAt: string;
  examName: string;
  subject: string;
  examDate: string;
  totalMarks: number;
  passingMarks: number;
}

export function ExamDashboard() {
  const { user } = useAuth();
  const { startExam } = useExamStore();

  // Term Exam States
  const [termExams, setTermExams] = useState<ScheduledExam[]>([]);
  const [termResults, setTermResults] = useState<TermResult[]>([]);
  const [isLoadingTerm, setIsLoadingTerm] = useState(true);

  const fetchTermData = async () => {
    if (!user) return;
    setIsLoadingTerm(true);
    try {
      // 1. Fetch Student Classes
      const classesRes = await fetch("/api/student/classes", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("ebm_token")}`
        }
      });
      const classesData = await classesRes.json();
      let classList = [];
      if (classesData.success && classesData.classes) {
        classList = classesData.classes;
      }

      // 2. Fetch Scheduled Exams for each Class
      const examPromises = classList.map(async (cls: any) => {
        const res = await fetch(`/api/exams?classId=${cls.id}`);
        const data = await res.json();
        if (data.success && data.exams) {
          return data.exams.map((ex: any) => ({
            ...ex,
            className: cls.name
          }));
        }
        return [];
      });

      const examResultsArray = await Promise.all(examPromises);
      const flattenedExams: ScheduledExam[] = examResultsArray.flat();
      setTermExams(flattenedExams);

      // 3. Fetch Student Graded Results
      const resultsRes = await fetch(`/api/students/${user.id}/exam-results`);
      const resultsData = await resultsRes.json();
      if (resultsData.success && resultsData.results) {
        setTermResults(resultsData.results);
      }
    } catch (e) {
      console.error("Error loading term exams:", e);
    } finally {
      setIsLoadingTerm(false);
    }
  };

  useEffect(() => {
    fetchTermData();
  }, [user]);

  // Term Stats
  const averagePercentage = termResults.length > 0 
    ? Math.round((termResults.reduce((acc, r) => acc + (r.status === "ABSENT" ? 0 : r.marksObtained), 0) / termResults.reduce((acc, r) => acc + r.totalMarks, 0)) * 100) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Official Real-time Scheduled Term Exams & Academic Gradebook */}
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Scheduled Formal Exams", val: termExams.length, icon: Calendar, color: "blue" },
            { label: "Graded Assessments", val: termResults.length, icon: CheckCircle2, color: "rose" },
            { label: "Overall GPA Ratio", val: termResults.length > 0 ? `${averagePercentage}%` : "Not Graded", icon: Trophy, color: "amber" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1120] rounded-3xl border border-white/5 p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white tracking-tight">{stat.val}</p>
              </div>
              <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Col: Term Datesheet (Upcoming Term Exams) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-rose-500" />
                  Scheduled Datesheet
                </h3>
                <button onClick={fetchTermData} className="p-1.5 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                  <RefreshCw className={clsx("h-3.5 w-3.5", isLoadingTerm && "animate-spin")} />
                </button>
              </div>

              {isLoadingTerm ? (
                <div className="py-12 text-center text-slate-500">
                  <RefreshCw className="h-6 w-6 text-rose-500 animate-spin mx-auto mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Syncing Datesheets...</span>
                </div>
              ) : termExams.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <FileText className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider">No term exams scheduled</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {termExams.map(ex => {
                    const examDate = new Date(ex.examDate);
                    return (
                      <div key={ex.id} className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all">
                        <div className="flex justify-between items-start gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest">
                            {ex.subject}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase">
                            Max: {ex.totalMarks} Marks
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-black text-white uppercase tracking-tight mt-3">{ex.name}</h4>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[9px] font-bold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                            <span>{examDate.toLocaleDateString()} at {examDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                            <span>{ex.room || "Assigned Hall"}</span>
                          </div>
                        </div>

                        {ex.syllabus && (
                          <div className="mt-3 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[9px] text-slate-300 font-medium leading-relaxed text-left">
                            <div className="flex items-center gap-1 font-black text-slate-200 uppercase tracking-wider mb-1">
                              <FileText className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                              <span>Exam Syllabus / Content:</span>
                            </div>
                            <p className="whitespace-pre-wrap">{ex.syllabus}</p>
                          </div>
                        )}

                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                          <button
                            onClick={() => startExam(ex.id)}
                            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/10 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                          >
                            Take Live Test <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Official Grad Sheets (Real-time Gradebook) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Academic Marksheet
              </h3>

              {isLoadingTerm ? (
                <div className="py-12 text-center text-slate-500">
                  <RefreshCw className="h-6 w-6 text-emerald-500 animate-spin mx-auto mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Loading Official Scores...</span>
                </div>
              ) : termResults.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <Award className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider">No graded records published</span>
                  <p className="text-[8px] mt-1 text-slate-600">Marks cards will appear here once teachers publish them.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {termResults.map(r => {
                    const isAbsent = r.status === "ABSENT";
                    const pct = isAbsent ? 0 : Math.round((r.marksObtained / r.totalMarks) * 100);
                    const isPassed = !isAbsent && r.marksObtained >= r.passingMarks;

                    return (
                      <div key={r.id} className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest">
                            {r.subject}
                          </span>
                          <span className={clsx(
                            "text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md",
                            isAbsent ? "bg-rose-500 text-white" : isPassed ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                          )}>
                            {isAbsent ? "ABSENT" : isPassed ? "PASSED" : "FAILED"}
                          </span>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <h4 className="text-xs font-black text-white uppercase tracking-tight">{r.examName}</h4>
                            <p className="text-[9px] font-semibold text-slate-500 uppercase mt-0.5">
                              Graded on: {new Date(r.gradedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black text-white">{isAbsent ? "-" : r.marksObtained}</span>
                            <span className="text-slate-500 text-xs font-bold"> / {r.totalMarks}</span>
                            <div className="text-[9px] font-black text-slate-400 mt-0.5">({pct}%)</div>
                          </div>
                        </div>

                        {/* Remarks */}
                        {r.teacherFeedback && (
                          <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-semibold text-slate-400">
                            <span className="text-slate-300 font-bold uppercase tracking-wider block mb-1">Teacher Feedback:</span>
                            "{r.teacherFeedback}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
