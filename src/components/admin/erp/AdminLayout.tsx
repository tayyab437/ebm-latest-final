import React, { useState, useEffect } from "react";
import { AdminView } from "./admin.types";
import { useAdminStore } from "./admin.store";
import { AdminSidebar } from "./AdminSidebar";
import { AdminDashboard } from "./AdminDashboard";
import { InquiriesManager } from "./InquiriesManager";
import { AdmissionsManager } from "./AdmissionsManager";
import { StudentManager } from "./StudentManager";
import { TeacherManager } from "./TeacherManager";
import { EmployeeManager } from "./EmployeeManager";
import { AcademicStructure } from "./AcademicStructure";
import { ClassesManager } from "./ClassesManager";
import { TimetableManager } from "./TimetableManager";
import { Inbox, AnnouncementCenter } from "../../communication";
import { ReportsDashboard } from "./ReportsDashboard";
import { AuditLogViewer } from "./AuditLogViewer";
import { RoleManager } from "./RoleManager";
import { PlatformSettings } from "./PlatformSettings";
import { SystemHealth } from "./SystemHealth";
import { ParentingAcademyManager } from "./ParentingAcademyManager";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { ExaminationsManager } from "./ExaminationsManager";
import { PTMSchedulerManager } from "./PTMSchedulerManager";
import { ProfileSettings } from "../../ProfileSettings";
import { Menu, Bell, Search, Settings, HelpCircle, LogOut } from "lucide-react";

interface AdminLayoutProps {
  onLogout?: () => void;
}

export function AdminLayout({ onLogout }: AdminLayoutProps = {}) {
  const currentView = useAdminStore((state) => state.currentView);
  const setCurrentView = useAdminStore((state) => state.setCurrentView);
  const fetchStudents = useAdminStore((state) => state.fetchStudents);
  const fetchTeachers = useAdminStore((state) => state.fetchTeachers);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, [fetchStudents, fetchTeachers]);

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("ebm_token");
      localStorage.removeItem("ebm_user");
      localStorage.removeItem("ebm_onboarding_progress");
      localStorage.removeItem("ebm_dashboard_data_cache");
      window.location.reload();
    }
  };

  return (
    <div className="flex h-full bg-[#F8FAFC] overflow-hidden relative rounded-3xl border border-slate-200 shadow-2xl">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/80 z-40 md:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0F172A] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <AdminSidebar currentView={currentView} onLogout={onLogout} setCurrentView={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Modern Admin Header */}
        <header className="h-20 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 w-80">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources, students, or logs..."
                className="bg-transparent border-none focus:outline-none text-xs font-medium text-slate-600 w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">v2.4 Enterprise</span>
            </div>
            
            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            
            <button className="hidden sm:flex p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
            
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors">Ejaz Bukhari</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                EB
              </div>
            </button>

            <button 
              onClick={handleLogoutAction}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/50 transition-all duration-200 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Log Out</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Switcher */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto">
            {currentView === AdminView.DASHBOARD && <AdminDashboard />}
            {currentView === AdminView.INQUIRIES && <InquiriesManager />}
            {currentView === AdminView.ADMISSIONS && <AdmissionsManager />}
            {currentView === AdminView.STUDENTS && <StudentManager />}
            {currentView === AdminView.TEACHERS && <TeacherManager />}
            {currentView === AdminView.EMPLOYEES && <EmployeeManager />}
            {currentView === AdminView.ACADEMIC_STRUCTURE && <AcademicStructure />}
            {currentView === AdminView.CLASSES && <ClassesManager />}
            {currentView === AdminView.TIMETABLE && <TimetableManager />}
            {currentView === AdminView.EXAMINATIONS && <ExaminationsManager />}
            {currentView === AdminView.MESSAGES && (
              <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
                <Inbox />
              </div>
            )}
            {currentView === AdminView.ANNOUNCEMENTS && (
              <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
                <div className="h-full bg-white rounded-[2rem] border border-slate-200/50 shadow-sm overflow-y-auto custom-scrollbar">
                  <div className="p-6 md:p-10">
                    <AnnouncementCenter />
                  </div>
                </div>
              </div>
            )}
            {currentView === AdminView.REPORTS && <ReportsDashboard />}
            {currentView === AdminView.AUDIT_LOGS && <AuditLogViewer />}
            {currentView === AdminView.ROLES && <RoleManager />}
            {currentView === AdminView.SETTINGS && <PlatformSettings />}
            {currentView === AdminView.SYSTEM_HEALTH && <SystemHealth />}
            {currentView === AdminView.ANALYTICS && <AnalyticsDashboard />}
            {currentView === AdminView.PARENTING_ACADEMY && <ParentingAcademyManager />}
            {currentView === AdminView.PTM_SCHEDULE && <PTMSchedulerManager />}
            {currentView === AdminView.PROFILE && (
              <ProfileSettings role="ADMIN" onBack={() => setCurrentView(AdminView.DASHBOARD)} />
            )}
            
            {/* Catch-all for construction modules */}
            {[
              AdminView.CURRICULUM,
              AdminView.ATTENDANCE,
              AdminView.NOTIFICATIONS,
              AdminView.PERMISSIONS,
            ].includes(currentView) && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 animate-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
                  <Settings className="h-10 w-10 text-slate-300 animate-spin-slow" />
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Module Initializing</h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Connecting to Enterprise ERP Backbone...</p>
                <div className="mt-8 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
