import React, { useState } from "react";
import { TeacherView } from "./teacher.types";
import { useTeacherStore } from "./teacher.store";
import { TeacherSidebar } from "./TeacherSidebar";
import { TeacherDashboard } from "./TeacherDashboard";
import { ClassManager } from "./ClassManager";
import { StudentDirectory } from "./StudentDirectory";
import { AssignmentManager } from "./AssignmentManager";
import { AITeacherAssistant } from "./AITeacherAssistant";
import { AttendanceManager } from "./AttendanceManager";
import { CurriculumManager } from "./CurriculumManager";
import { TeacherMeetings } from "./TeacherMeetings";
import { Inbox, AnnouncementCenter } from "../communication";
import { ExaminationsManager } from "../admin/erp/ExaminationsManager";
import { TeacherGradebook } from "./TeacherGradebook";
import { ProfileSettings } from "../ProfileSettings";
import { Menu } from "lucide-react";

interface TeacherLayoutProps {
  onLogout?: () => void;
}

export function TeacherLayout({ onLogout }: TeacherLayoutProps = {}) {
  const currentView = useTeacherStore((state) => state.currentView);
  const setCurrentView = useTeacherStore((state) => state.setCurrentView);
  const fetchClasses = useTeacherStore((state) => state.fetchClasses);
  const fetchStudents = useTeacherStore((state) => state.fetchStudents);
  const fetchAssignments = useTeacherStore((state) => state.fetchAssignments);
  const isSidebarCollapsed = useTeacherStore((state) => state.isSidebarCollapsed);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    fetchClasses();
    fetchStudents();
    fetchAssignments();
  }, [fetchClasses, fetchStudents, fetchAssignments]);

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transform transition-all duration-300 ease-in-out flex flex-col shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isSidebarCollapsed ? "w-20" : "w-72"}
      `}
      >
        <TeacherSidebar
          currentView={currentView}
          onLogout={onLogout}
          setCurrentView={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative">
        {/* Mobile Header for Sidebar Toggle */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-slate-200 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-2 font-bold text-slate-800">Teacher Portal</span>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
          {currentView === TeacherView.DASHBOARD && <TeacherDashboard />}
          {currentView === TeacherView.CLASSES && <ClassManager />}
          {currentView === TeacherView.STUDENTS && <StudentDirectory />}
          {currentView === TeacherView.ASSIGNMENTS && <AssignmentManager />}
          {currentView === TeacherView.AI_ASSISTANT && <AITeacherAssistant />}
          {currentView === TeacherView.ATTENDANCE && <AttendanceManager />}
          {currentView === TeacherView.CURRICULUM && <CurriculumManager />}
          {currentView === TeacherView.MESSAGES && (
            <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
              <Inbox />
            </div>
          )}
          {currentView === TeacherView.ANNOUNCEMENTS && (
            <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
              <div className="h-full bg-white rounded-[2rem] border border-slate-200/50 shadow-sm overflow-y-auto custom-scrollbar">
                <div className="p-6 md:p-10">
                  <AnnouncementCenter />
                </div>
              </div>
            </div>
          )}
          {currentView === TeacherView.ASSESSMENTS && <ExaminationsManager />}
          {currentView === TeacherView.GRADEBOOK && <TeacherGradebook />}
          {currentView === TeacherView.MEETINGS && <TeacherMeetings />}
          {currentView === TeacherView.SETTINGS && (
            <ProfileSettings role="TEACHER" onBack={() => setCurrentView(TeacherView.DASHBOARD)} />
          )}

          {/* Placeholder for other views */}
          {[
            TeacherView.LESSON_PLANNER,
            TeacherView.RESOURCES,
            TeacherView.CALENDAR,
            TeacherView.ANALYTICS,
          ].includes(currentView) && (
            <div className="flex items-center justify-center h-full text-slate-400 font-medium">
              Module under construction
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
