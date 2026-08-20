import React from "react";
import { useTeacherStore } from "./teacher.store";
import {
  Users,
  AlertCircle,
  FileEdit,
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  UserSquare,
  Sparkles,
} from "lucide-react";
import { TeacherView } from "./teacher.types";

export function TeacherDashboard() {
  const classes = useTeacherStore((state) => state.classes);
  const students = useTeacherStore((state) => state.students);
  const assignments = useTeacherStore((state) => state.assignments);
  const setCurrentView = useTeacherStore((state) => state.setCurrentView);

  const highRiskStudents = students.filter((s) => s.riskStatus === "HIGH");

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Good morning, Mr. Bukhari
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here is what is happening in your classes today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {classes.length}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Classes
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {highRiskStudents.length}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              At-Risk Students
            </div>
          </div>
        </div>

        <div
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-300 transition-colors"
          onClick={() => setCurrentView(TeacherView.ASSIGNMENTS)}
        >
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <FileEdit className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">12</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              To Grade
            </div>
          </div>
        </div>

        <div
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-300 transition-colors"
          onClick={() => setCurrentView(TeacherView.AI_ASSISTANT)}
        >
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">2h</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Saved by AI
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Today's Schedule</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                <div className="w-16 text-center shrink-0">
                  <div className="text-sm font-bold text-blue-900">09:00</div>
                  <div className="text-xs font-medium text-blue-600">AM</div>
                </div>
                <div className="w-1 bg-blue-200 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">
                    O Level Physics - Sec 4A
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Topic: Kinematics (Equations of Motion)
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      <BookOpen className="h-3 w-3" /> Lab 2
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                      <CheckCircle2 className="h-3 w-3" /> Lesson Plan Ready
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                <div className="w-16 text-center shrink-0">
                  <div className="text-sm font-bold text-slate-700">11:30</div>
                  <div className="text-xs font-medium text-slate-500">AM</div>
                </div>
                <div className="w-1 bg-slate-200 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">
                    O Level Physics - Sec 4B
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Topic: Free Fall & Gravity
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                      <BookOpen className="h-3 w-3" /> Lab 3
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                      <AlertCircle className="h-3 w-3" /> Plan Needs Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Recent Assignments</h3>
              <button
                onClick={() => setCurrentView(TeacherView.ASSIGNMENTS)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FileEdit className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {assignment.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {assignment.submissionCount} / {students.filter(s => (s.classIds || []).includes(assignment.classId)).length}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Submitted
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-rose-500" />
              Students Requiring Attention
            </h3>

            <div className="space-y-4">
              {highRiskStudents.map((student) => (
                <div key={student.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <UserSquare className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {student.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Score dropped to {student.performanceScore}%
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
                        Message
                      </button>
                      <button className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded hover:bg-amber-100 transition-colors">
                        Intervention Plan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-indigo-100 flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              AI Teaching Insights
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Based on recent quiz results, 40% of Sec 4A is struggling with
              velocity-time graphs. Would you like me to generate a
              differentiated worksheet for them?
            </p>
            <button
              onClick={() => setCurrentView(TeacherView.AI_ASSISTANT)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-colors shadow-inner border border-indigo-500"
            >
              Generate Worksheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
