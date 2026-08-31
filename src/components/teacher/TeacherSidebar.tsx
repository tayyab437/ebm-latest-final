import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TeacherView } from "./teacher.types";
import { useTeacherStore } from "./teacher.store";
import { useCommunicationStore } from "../communication/communication.store";
import {
  LayoutDashboard,
  Users,
  UserSquare,
  CalendarCheck,
  FileEdit,
  Target,
  Award,
  Map,
  BookOpen,
  FolderOpen,
  Calendar,
  MessageSquare,
  Megaphone,
  LineChart,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { useBrandingStore, BRANDING_ICONS } from "../../lib/branding.store";

interface TeacherSidebarProps {
  currentView: TeacherView;
  setCurrentView: (view: TeacherView) => void;
  onLogout?: () => void;
}

export function TeacherSidebar({
  currentView,
  setCurrentView,
  onLogout
}: TeacherSidebarProps) {
  const { logoText, logoType, logoIcon, logoImageUrl } = useBrandingStore();
  const isSidebarCollapsed = useTeacherStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useTeacherStore((state) => state.toggleSidebar);
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const loadUser = () => {
      const u = localStorage.getItem("ebm_user");
      if (u) setUser(JSON.parse(u));
    };
    loadUser();
    window.addEventListener("user-update", loadUser);
    return () => window.removeEventListener("user-update", loadUser);
  }, []);

  const mainItems = [
    { id: TeacherView.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { id: TeacherView.CLASSES, label: "My Classes", icon: Users },
    { id: TeacherView.STUDENTS, label: "Students", icon: UserSquare },
    { id: TeacherView.ATTENDANCE, label: "Attendance", icon: CalendarCheck },
  ];

  const academicItems = [
    { id: TeacherView.ASSIGNMENTS, label: "Assignments", icon: FileEdit },
    { id: TeacherView.ASSESSMENTS, label: "Assessments", icon: Target },
    { id: TeacherView.GRADEBOOK, label: "Gradebook", icon: Award },
    { id: TeacherView.CURRICULUM, label: "Curriculum", icon: BookOpen },
  ];

  const communicationItems = [
    { id: TeacherView.MESSAGES, label: "Messages", icon: MessageSquare },
    { id: TeacherView.ANNOUNCEMENTS, label: "Announcements", icon: Megaphone },
    { id: TeacherView.MEETINGS, label: "Meetings / PTM", icon: Calendar },
  ];

  const insightsItems = [
    {
      id: TeacherView.AI_ASSISTANT,
      label: "AI Assistant",
      icon: Sparkles,
      highlight: true,
    },
    { id: TeacherView.SETTINGS, label: "Settings", icon: Settings },
  ];

  const { conversations, fetchConversations } = useCommunicationStore();

  useEffect(() => {
    fetchConversations(true);
  }, [fetchConversations]);

  const totalUnreadMessages = conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);

  const NavItem = ({ item }: { item: any; key?: React.Key }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    
    // Dynamic badge for messages
    let badge = item.badge;
    if (item.id === TeacherView.MESSAGES) {
      badge = totalUnreadMessages > 0 ? totalUnreadMessages : undefined;
    }

    return (
      <button
        onClick={() => {
          if (item.id === "CONTENT_STUDIO") {
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'content' }));
          } else if (item.id === "STUDENT_SUCCESS") {
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'student-success' }));
          } else {
            setCurrentView(item.id);
          }
        }}
        title={isSidebarCollapsed ? item.label : undefined}
        className={clsx(
          "w-full flex items-center rounded-xl transition-all duration-200 group text-left relative",
          isSidebarCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
          isActive
            ? item.highlight
              ? "bg-amber-100 text-amber-800 font-bold"
              : "bg-blue-50 text-blue-700 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium",
        )}
      >
        <div className={clsx("flex items-center gap-3 min-w-0", isSidebarCollapsed && "justify-center")}>
          <Icon
            className={clsx(
              "h-4 w-4 transition-colors shrink-0",
              isActive
                ? item.highlight
                  ? "text-amber-600"
                  : "text-blue-600"
                : item.highlight
                  ? "text-amber-500 group-hover:text-amber-600"
                  : "text-slate-400 group-hover:text-blue-500",
            )}
          />
          {!isSidebarCollapsed && <span className="text-sm truncate">{item.label}</span>}
        </div>
        {badge && (
          <span className={clsx(
            "bg-amber-500 text-slate-950 font-bold rounded-md shrink-0",
            isSidebarCollapsed 
              ? "absolute -top-1 -right-1 text-[9px] px-1 py-0.2 shadow-xs" 
              : "text-[10px] px-1.5 py-0.5"
          )}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className={clsx("p-4 shrink-0 border-b border-slate-100 flex items-center", isSidebarCollapsed ? "justify-center" : "justify-between")}>
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to Home Page"
          className={clsx("flex items-center gap-3 min-w-0 cursor-pointer group hover:opacity-90 transition-opacity", isSidebarCollapsed && "justify-center")}
        >
          {logoType === "icon" ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0 group-hover:scale-105 transition-transform">
              {(() => {
                const IconComponent = BRANDING_ICONS[logoIcon] || BookOpen;
                return <IconComponent className="h-5 w-5 text-white" />;
              })()}
            </div>
          ) : logoImageUrl ? (
            <div className="w-10 h-10 flex items-center justify-center bg-transparent shrink-0 group-hover:scale-105 transition-transform">
              <img src={logoImageUrl} alt="Logo" className="w-full h-full object-contain bg-transparent" style={{ backgroundColor: 'transparent' }} referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5 text-slate-500" />
            </div>
          )}
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 leading-tight truncate group-hover:text-blue-600 transition-colors" title={logoText}>
                {logoText}
              </h2>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                Teacher Portal
              </p>
            </div>
          )}
        </Link>

        {/* Toggle Collapse Button */}
        <button
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors hidden md:flex items-center justify-center shrink-0 ml-1 cursor-pointer"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        <div>
          {!isSidebarCollapsed ? (
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </h3>
          ) : (
            <div className="h-px bg-slate-100 my-2 mx-1" />
          )}
          <div className="space-y-1">
            {mainItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          {!isSidebarCollapsed ? (
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Communication
            </h3>
          ) : (
            <div className="h-px bg-slate-100 my-2 mx-1" />
          )}
          <div className="space-y-1">
            {communicationItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          {!isSidebarCollapsed ? (
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Academics
            </h3>
          ) : (
            <div className="h-px bg-slate-100 my-2 mx-1" />
          )}
          <div className="space-y-1">
            {academicItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          {!isSidebarCollapsed ? (
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Insights & Tools
            </h3>
          ) : (
            <div className="h-px bg-slate-100 my-2 mx-1" />
          )}
          <div className="space-y-1">
            {insightsItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Sidebar Footer containing Profile and Logout */}
      <div className={clsx("p-3 border-t border-slate-100 bg-slate-50/50 shrink-0 space-y-2", isSidebarCollapsed && "p-2")}>
        <button 
          onClick={() => setCurrentView(TeacherView.SETTINGS)}
          title={isSidebarCollapsed ? user?.name || "Teacher Settings" : undefined}
          className={clsx(
            "w-full flex items-center rounded-xl hover:bg-white transition-all text-left group",
            isSidebarCollapsed ? "justify-center p-2" : "gap-3 p-2"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            {user?.profilePictureUrl ? (
              <img src={user.profilePictureUrl} alt="P" className="w-full h-full object-cover" />
            ) : (
              <UserSquare className="h-5 w-5" />
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate">{user?.name || "Mr. Bukhari"}</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Teacher Account</p>
            </div>
          )}
        </button>

        {confirmLogout ? (
          <div className="space-y-2.5 p-1">
            {!isSidebarCollapsed && (
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider text-center">Are you sure you want to log out?</p>
            )}
            <div className={clsx("grid gap-2", isSidebarCollapsed ? "grid-cols-1" : "grid-cols-2")}>
              <button
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  } else {
                    localStorage.removeItem("ebm_token");
                    localStorage.removeItem("ebm_user");
                    localStorage.removeItem("ebm_onboarding_progress");
                    localStorage.removeItem("ebm_dashboard_data_cache");
                    window.location.href = "/";
                  }
                }}
                className="py-2 px-2 bg-red-600 text-white font-extrabold text-xs rounded-xl hover:bg-red-700 transition-colors cursor-pointer text-center truncate"
              >
                Log out
              </button>
              {!isSidebarCollapsed && (
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="py-2 px-3 bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl hover:bg-slate-300 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmLogout(true)}
            title={isSidebarCollapsed ? "Logout" : undefined}
            className={clsx(
              "w-full flex items-center rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold text-sm transition-all duration-200 cursor-pointer group",
              isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
            )}
          >
            <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors shrink-0" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}
