import React, { useState, useEffect, useRef } from "react";
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
import { BlogAdminManager } from "../blog/BlogAdminManager";
import { ProfileSettings } from "../../ProfileSettings";
import {
  Menu,
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  CheckCheck,
  ArrowRight,
  UserCheck,
  FileText,
  Calendar,
  X,
  User,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  Zap
} from "lucide-react";

interface AdminLayoutProps {
  onLogout?: () => void;
}

interface AdminNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: "admission" | "inquiry" | "system" | "blog" | "ptm";
  targetView: AdminView;
}

const INITIAL_ADMIN_NOTIFICATIONS: AdminNotificationItem[] = [
  {
    id: "notif-1",
    title: "New Admission Application",
    description: "Zayd Ahmed submitted Grade 9 O-Level diagnostic admission.",
    time: "10m ago",
    isRead: false,
    type: "admission",
    targetView: AdminView.ADMISSIONS
  },
  {
    id: "notif-2",
    title: "New Student Inquiry",
    description: "Tariq Mehmood requested curriculum details for Advanced Math.",
    time: "45m ago",
    isRead: false,
    type: "inquiry",
    targetView: AdminView.INQUIRIES
  },
  {
    id: "notif-3",
    title: "PTM Schedule Confirmed",
    description: "14 parent-teacher conference slots confirmed for Friday.",
    time: "2h ago",
    isRead: false,
    type: "ptm",
    targetView: AdminView.PTM_SCHEDULE
  },
  {
    id: "notif-4",
    title: "Blog Publication Live",
    description: "New article 'Evidence-Based Learning in Mathematics' is published.",
    time: "5h ago",
    isRead: true,
    type: "blog",
    targetView: AdminView.BLOG_MANAGER
  },
  {
    id: "notif-5",
    title: "System Health Status",
    description: "Cloud database backup & cache optimization completed successfully.",
    time: "1d ago",
    isRead: true,
    type: "system",
    targetView: AdminView.SYSTEM_HEALTH
  }
];

export function AdminLayout({ onLogout }: AdminLayoutProps = {}) {
  const currentView = useAdminStore((state) => state.currentView);
  const setCurrentView = useAdminStore((state) => state.setCurrentView);
  const fetchStudents = useAdminStore((state) => state.fetchStudents);
  const fetchTeachers = useAdminStore((state) => state.fetchTeachers);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>(INITIAL_ADMIN_NOTIFICATIONS);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, [fetchStudents, fetchTeachers]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("ebm_token");
      localStorage.removeItem("ebm_user");
      localStorage.removeItem("ebm_onboarding_progress");
      localStorage.removeItem("ebm_dashboard_data_cache");
      window.location.href = "/";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: AdminNotificationItem) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    setCurrentView(notif.targetView);
    setIsNotificationsOpen(false);
  };

  const searchableViews = [
    { name: "Dashboard Overview", view: AdminView.DASHBOARD, category: "Core" },
    { name: "Admissions Pipeline", view: AdminView.ADMISSIONS, category: "Admissions" },
    { name: "Student Inquiries", view: AdminView.INQUIRIES, category: "Admissions" },
    { name: "Student Directory", view: AdminView.STUDENTS, category: "Academic" },
    { name: "Faculty & Teachers", view: AdminView.TEACHERS, category: "Staff" },
    { name: "Employee Directory", view: AdminView.EMPLOYEES, category: "Staff" },
    { name: "Academic Structure", view: AdminView.ACADEMIC_STRUCTURE, category: "Academic" },
    { name: "Classes & Batches", view: AdminView.CLASSES, category: "Academic" },
    { name: "Timetable & Schedules", view: AdminView.TIMETABLE, category: "Academic" },
    { name: "Examinations & Grading", view: AdminView.EXAMINATIONS, category: "Academic" },
    { name: "PTM & Conferences", view: AdminView.PTM_SCHEDULE, category: "Communication" },
    { name: "Blog & Publications", view: AdminView.BLOG_MANAGER, category: "Content" },
    { name: "Parenting Academy", view: AdminView.PARENTING_ACADEMY, category: "Academic" },
    { name: "Analytics & KPI Hub", view: AdminView.ANALYTICS, category: "Reports" },
    { name: "Audit Trail & Logs", view: AdminView.AUDIT_LOGS, category: "System" },
    { name: "System Health & DB", view: AdminView.SYSTEM_HEALTH, category: "System" },
    { name: "Platform Settings", view: AdminView.SETTINGS, category: "System" },
    { name: "Profile Settings", view: AdminView.PROFILE, category: "Account" }
  ];

  const searchResults = searchQuery.trim()
    ? searchableViews.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex w-full h-screen bg-[#F8FAFC] overflow-hidden relative">
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
        <header className="h-20 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between px-4 sm:px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Quick Navigation Search Bar */}
            <div ref={searchRef} className="relative hidden lg:block">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 w-80 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search ERP modules, resources, logs..."
                  className="bg-transparent border-none focus:outline-none text-xs font-medium text-slate-600 w-full placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Navigation
                  </div>
                  {searchResults.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setCurrentView(item.view);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-blue-50 flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">v2.4 Enterprise</span>
            </div>
            
            {/* Notifications Popover Toggle */}
            <div ref={notificationsRef} className="relative">
              <button 
                id="admin-notifications-btn"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl transition-all relative cursor-pointer ${
                  isNotificationsOpen 
                    ? "bg-blue-50 text-blue-600 shadow-xs" 
                    : "text-slate-500 hover:text-blue-600 hover:bg-slate-100"
                }`}
                title="System Notifications & Alerts"
                aria-label="View Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in duration-200">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Admin Alerts
                      </h4>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 space-y-2">
                        <Bell className="w-8 h-8 mx-auto text-slate-300 stroke-1" />
                        <p className="text-xs font-bold text-slate-600">All caught up!</p>
                        <p className="text-[11px]">No pending administrative notifications.</p>
                      </div>
                    ) : (
                      notifications.map((notif) => {
                        const iconMap = {
                          admission: <UserCheck className="w-4 h-4 text-emerald-600" />,
                          inquiry: <Mail className="w-4 h-4 text-blue-600" />,
                          ptm: <Calendar className="w-4 h-4 text-purple-600" />,
                          blog: <FileText className="w-4 h-4 text-amber-600" />,
                          system: <ShieldCheck className="w-4 h-4 text-slate-600" />
                        };

                        const bgMap = {
                          admission: "bg-emerald-50 border-emerald-100",
                          inquiry: "bg-blue-50 border-blue-100",
                          ptm: "bg-purple-50 border-purple-100",
                          blog: "bg-amber-50 border-amber-100",
                          system: "bg-slate-100 border-slate-200"
                        };

                        return (
                          <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-all flex items-start gap-3.5 relative ${
                              !notif.isRead ? "bg-blue-50/30" : ""
                            }`}
                          >
                            <div className={`p-2 rounded-xl border shrink-0 ${bgMap[notif.type] || "bg-slate-100 border-slate-200"}`}>
                              {iconMap[notif.type] || <Bell className="w-4 h-4 text-slate-600" />}
                            </div>

                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className={`text-xs ${!notif.isRead ? "font-black text-slate-900" : "font-bold text-slate-700"} line-clamp-1`}>
                                  {notif.title}
                                </h5>
                                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                                  {notif.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                {notif.description}
                              </p>
                            </div>

                            {!notif.isRead && (
                              <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-slate-50/70 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setCurrentView(AdminView.AUDIT_LOGS);
                        setIsNotificationsOpen(false);
                      }}
                      className="text-xs font-bold text-slate-600 hover:text-blue-600 transition flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <span>View Full System Audit Trail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Help & Support Button */}
            <button 
              id="admin-help-btn"
              onClick={() => setIsHelpOpen(true)}
              className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              title="Help & System Documentation"
              aria-label="Open System Help"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
            
            {/* Profile Avatar / Quick Menu Button */}
            <div ref={profileMenuRef} className="relative">
              <button 
                id="admin-profile-btn"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-3 pl-2 pr-1.5 py-1 rounded-2xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                title="Super Admin Profile Menu"
              >
                <div className="text-right hidden xl:block">
                  <p className="text-xs font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors">Ejaz Bukhari</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  EB
                </div>
              </button>

              {/* Profile Quick Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <p className="text-xs font-black text-slate-900">Syed Ejaz Bukhari</p>
                    <p className="text-[10px] text-slate-400 font-mono">admin@ejazbukharimethod.com</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Full Access Administrator</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView(AdminView.PROFILE);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-2.5 transition cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Credentials</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView(AdminView.SETTINGS);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-2.5 transition cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Platform Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView(AdminView.SYSTEM_HEALTH);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-2.5 transition cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-slate-400" />
                    <span>System Health & Diagnostics</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={handleLogoutAction}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-rose-50 text-xs font-bold text-rose-600 flex items-center gap-2.5 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Logout Quick Button */}
            <button 
              onClick={handleLogoutAction}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/50 transition-all duration-200 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Log Out</span>
            </button>
          </div>
        </header>

        {/* Help & Support Modal */}
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-700">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">EBM ERP Help & Support</h3>
                    <p className="text-xs text-slate-500 font-medium">Enterprise Administrator Reference & Documentation</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Quick Access Guides
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => { setCurrentView(AdminView.ADMISSIONS); setIsHelpOpen(false); }}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition group cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-blue-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Admissions Pipeline</div>
                      <div className="text-[10px] text-slate-500">Manage applicant evaluations & status</div>
                    </button>

                    <button
                      onClick={() => { setCurrentView(AdminView.BLOG_MANAGER); setIsHelpOpen(false); }}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition group cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Blog Manager</div>
                      <div className="text-[10px] text-slate-500">Author & publish SEO-rich articles</div>
                    </button>

                    <button
                      onClick={() => { setCurrentView(AdminView.ANALYTICS); setIsHelpOpen(false); }}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Learning Analytics</div>
                      <div className="text-[10px] text-slate-500">Analyze performance & pacing metrics</div>
                    </button>

                    <button
                      onClick={() => { setCurrentView(AdminView.SYSTEM_HEALTH); setIsHelpOpen(false); }}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition group cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">System Diagnostics</div>
                      <div className="text-[10px] text-slate-500">Review server & database latency</div>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                  <div className="text-xs font-bold text-blue-900">Technical Support & Urgent Escalations</div>
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    Need technical assistance or database rollbacks? Contact the EBM DevOps engineering unit.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-blue-900">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-600" /> support@ejazbukharimethod.com</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-600" /> +92 (51) 843-2000</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  Close Reference
                </button>
              </div>
            </div>
          </div>
        )}

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
            {currentView === AdminView.BLOG_MANAGER && <BlogAdminManager />}
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
