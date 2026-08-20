import React, { useState, useEffect } from "react";
import { 
  Award, Search, RefreshCw, Download, FileSpreadsheet, 
  TrendingUp, Users, ChevronRight, CheckCircle2, HelpCircle 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, Legend 
} from "recharts";

interface ClassEntity {
  id: string;
  name: string;
  gradeLevel: string;
}

interface ExamEntity {
  id: string;
  name: string;
  subject: string;
  totalMarks: number;
}

interface StudentEntity {
  id: string;
  name: string;
  email: string;
}

interface ScoreMap {
  [studentId: string]: {
    marksObtained: number;
    status: string;
  };
}

export function TeacherGradebook() {
  const [classes, setClasses] = useState<ClassEntity[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [exams, setExams] = useState<ExamEntity[]>([]);
  const [students, setStudents] = useState<StudentEntity[]>([]);
  const [allResults, setAllResults] = useState<{ [examId: string]: ScoreMap }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch Classes
      const classRes = await fetch("/api/teacher/classes");
      const classData = await classRes.json();
      if (classData.success && classData.classes) {
        setClasses(classData.classes);
        if (classData.classes.length > 0 && !selectedClassId) {
          setSelectedClassId(classData.classes[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedClassId) return;

    const fetchClassGradebook = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Students
        const studRes = await fetch(`/api/teacher/students?classId=${selectedClassId}`);
        const studData = await studRes.json();
        const fetchedStudents = studData.success ? studData.students : [];
        setStudents(fetchedStudents);

        // 2. Fetch Exams for this class
        const examRes = await fetch(`/api/exams?classId=${selectedClassId}`);
        const examData = await examRes.json();
        const fetchedExams = examData.success ? examData.exams : [];
        setExams(fetchedExams);

        // 3. For each exam, fetch its results
        const resultsMap: { [examId: string]: ScoreMap } = {};
        for (const ex of fetchedExams) {
          const resRes = await fetch(`/api/exams/${ex.id}/results`);
          const resData = await resRes.json();
          const scoreMap: ScoreMap = {};
          if (resData.success && resData.results) {
            resData.results.forEach((r: any) => {
              scoreMap[r.studentId] = {
                marksObtained: r.marksObtained,
                status: r.status
              };
            });
          }
          resultsMap[ex.id] = scoreMap;
        }
        setAllResults(resultsMap);
      } catch (err) {
        console.error("Error loading gradebook data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassGradebook();
  }, [selectedClassId]);

  // Calculate stats
  const getStudentAverage = (studentId: string) => {
    let scoreSum = 0;
    let totalMaxSum = 0;
    let gradedExamsCount = 0;

    exams.forEach(ex => {
      const scoreObj = allResults[ex.id]?.[studentId];
      if (scoreObj && scoreObj.status === "GRADED") {
        scoreSum += scoreObj.marksObtained;
        totalMaxSum += ex.totalMarks;
        gradedExamsCount++;
      }
    });

    if (totalMaxSum === 0) return null;
    return Math.round((scoreSum / totalMaxSum) * 100);
  };

  const getExamAverage = (examId: string) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return 0;
    let sum = 0;
    let count = 0;

    students.forEach(s => {
      const scoreObj = allResults[examId]?.[s.id];
      if (scoreObj && scoreObj.status === "GRADED") {
        sum += scoreObj.marksObtained;
        count++;
      }
    });

    if (count === 0) return 0;
    return Math.round((sum / (count * exam.totalMarks)) * 100);
  };

  // Generate Chart Data
  const getChartData = () => {
    return exams.map(ex => ({
      name: ex.name.length > 15 ? ex.name.substring(0, 15) + "..." : ex.name,
      "Average Score %": getExamAverage(ex.id),
      Subject: ex.subject
    }));
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Teacher Gradebook Analytics</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">
            Perform grade analysis and monitor student exam performance curves
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            className="p-3 text-slate-500 hover:text-slate-950 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Selector & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Class:</span>
          <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 bg-slate-50/50 hover:bg-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
          >
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search student grades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
          <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="text-xs font-bold uppercase text-slate-400 mt-2 tracking-wider">Syncing Gradebook...</span>
        </div>
      ) : exams.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400">
          <Award className="h-12 w-12 mx-auto text-slate-200 mb-2" />
          <p className="text-sm font-black text-slate-700 uppercase tracking-tight">No Exams Available For This Class</p>
          <p className="text-xs text-slate-500 mt-1 uppercase">Please schedule an exam in the Assessments module first.</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Performance Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Class Exam Average Comparison (%)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: "bold" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fontWeight: "bold" }} />
                  <Tooltip />
                  <Bar dataKey="Average Score %" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pivot Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Grade Matrix Sheet</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class Size: {students.length} Pupils</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="p-4 border-r border-slate-200 sticky left-0 bg-slate-100 min-w-[200px]">Student Name</th>
                    {exams.map(ex => (
                      <th key={ex.id} className="p-4 border-r border-slate-200 text-center min-w-[120px]">
                        <div className="truncate" title={ex.name}>{ex.name.toUpperCase()}</div>
                        <div className="text-[8px] font-normal text-slate-400 mt-0.5">{ex.subject} (Max {ex.totalMarks})</div>
                      </th>
                    ))}
                    <th className="p-4 text-center min-w-[100px] bg-slate-100/80">Average Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs font-bold text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={exams.length + 2} className="p-8 text-center text-slate-400 uppercase text-[10px]">
                        No matching students found
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => {
                      const avg = getStudentAverage(student.id);
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="p-4 border-r border-slate-200 sticky left-0 bg-white shadow-xs font-black text-slate-800 uppercase tracking-tight">
                            {student.name}
                          </td>
                          {exams.map(ex => {
                            const score = allResults[ex.id]?.[student.id];
                            const isAbsent = score?.status === "ABSENT";
                            const marks = score?.marksObtained ?? "-";
                            const ratio = score ? Math.round((score.marksObtained / ex.totalMarks) * 100) : null;
                            
                            return (
                              <td key={ex.id} className="p-4 border-r border-slate-200 text-center">
                                {isAbsent ? (
                                  <span className="text-rose-500 text-[10px] bg-rose-50 px-2 py-0.5 rounded-md font-black">ABSENT</span>
                                ) : score ? (
                                  <div>
                                    <span className="text-slate-900">{marks}</span>
                                    <span className="text-slate-400 text-[10px] font-normal"> / {ex.totalMarks}</span>
                                    <div className={`text-[9px] font-bold mt-1 ${
                                      ratio && ratio >= 75 ? "text-emerald-500" : ratio && ratio >= 50 ? "text-amber-500" : "text-rose-500"
                                    }`}>
                                      {ratio}%
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-slate-300 font-normal">-</span>
                                )}
                              </td>
                            );
                          })}
                          <td className="p-4 text-center bg-slate-50/30">
                            {avg !== null ? (
                              <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                                avg >= 75 ? "bg-emerald-50 text-emerald-700" : avg >= 50 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                              }`}>
                                {avg}%
                              </span>
                            ) : (
                              <span className="text-slate-300 font-normal">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
