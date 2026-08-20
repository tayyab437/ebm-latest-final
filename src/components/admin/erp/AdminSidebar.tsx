import React from "react";
import { AdminView } from "./admin.types";
import { useInquiryStore } from "../../../services/inquiries.store";
import { 
  LayoutDashboard, 
  Inbox,
  UserPlus, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  BookOpen, 
  Calendar, 
  Target, 
  ClipboardCheck, 
  MessageSquare, 
  Megaphone, 
  Bell, 
  FileText, 
  BarChart3, 
  History, 
  Activity, 
  ShieldCheck, 
  Key, 
  Settings, 
  UserCircle,
  LogOut
} from "lucide-react";
import clsx from "clsx";
import { useBrandingStore, BRANDING_ICONS } from "../../../lib/branding.store";

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  onLogout?: () => void;
}

export function AdminSidebar({ currentView, setCurrentView, onLogout }: AdminSidebarProps) {
  const { logoText, logoType, logoIcon, logoImageUrl } = useBrandingStore();
  const [user, setUser] = React.useState<any>(null);

  const inquiries = useInquiryStore((state) => state.inquiries);
  const fetchInquiries = useInquiryStore((state) => state.fetchInquiries);

  React.useEffect(() => {
    fetchInquiries();
    const handleUpdate = () => fetchInquiries();
    window.addEventListener("ebm_inquiry_updated", handleUpdate);
    return () => window.removeEventListener("ebm_inquiry_updated", handleUpdate);
  }, [fetchInquiries]);

  const newInquiriesCount = inquiries.filter((i) => i.status === "NEW").length;

  React.useEffect(() => {
    const loadUser = () => {
      const u = localStorage.getItem("ebm_user");
      if (u) setUser(JSON.parse(u));
    };
    loadUser();
    window.addEventListener("user-update", loadUser);
    return () => window.removeEventListener("user-update", loadUser);
  }, []);

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

  const sections: Array<{
    title: string;
    items: Array<{
      id: any;
      label: string;
      icon: any;
      badge?: string;
    }>;
  }> = [
    {
      title: "Core Operations",
      items: [
        { id: AdminView.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
        { id: AdminView.INQUIRIES, label: "Inquiries & Leads", icon: Inbox, badge: newInquiriesCount > 0 ? String(newInquiriesCount) : undefined },
        { id: AdminView.ADMISSIONS, label: "Admissions", icon: UserPlus },
        { id: AdminView.STUDENTS, label: "Students", icon: GraduationCap },
        { id: AdminView.TEACHERS, label: "Teachers", icon: Users },
      ]
    },
    {
      title: "Academic ERP",
      items: [
        { id: "STUDENT_SUCCESS" as any, label: "Student Success Hub", icon: Users },
        { id: AdminView.CLASSES, label: "Classes & Sections", icon: Users },
        { id: AdminView.TIMETABLE, label: "Timetable", icon: Calendar },
        { id: AdminView.EXAMINATIONS, label: "Examinations", icon: Target },
      ]
    },
    {
      title: "Communication",
      items: [
        { id: AdminView.PTM_SCHEDULE, label: "PTM & Conferences", icon: Calendar },
        { id: AdminView.MESSAGES, label: "Messages", icon: MessageSquare },
        { id: AdminView.ANNOUNCEMENTS, label: "Announcements", icon: Megaphone },
        { id: AdminView.PARENTING_ACADEMY, label: "Parenting Academy", icon: BookOpen },
      ]
    },
    {
      title: "Governance & Security",
      items: [
        { id: AdminView.AUDIT_LOGS, label: "Audit Logs", icon: History },
        { id: AdminView.ROLES, label: "Roles & Access", icon: ShieldCheck },
        { id: AdminView.SETTINGS, label: "Platform Settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300">
      <div className="p-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          {logoType === "icon" ? (
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              {(() => {
                const IconComponent = BRANDING_ICONS[logoIcon] || ShieldCheck;
                return <IconComponent className="h-6 w-6 text-white" />;
              })()}
            </div>
          ) : logoImageUrl ? (
            <div className="h-10 flex items-center justify-center bg-transparent shrink-0">
              <img 
                src={logoImageUrl} 
                alt="Logo" 
                className="h-10 max-w-[90px] object-contain bg-transparent" 
                referrerPolicy="no-referrer" 
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-white leading-tight uppercase tracking-wider truncate" title={logoText}>{logoText}</h2>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Enterprise ERP</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "CONTENT_STUDIO") {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'content' }));
                      } else if (item.id === "STUDENT_SUCCESS") {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'student-success' }));
                      } else {
                        setCurrentView(item.id);
                      }
                    }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left",
                      isActive 
                        ? "bg-blue-600/10 text-blue-400 font-bold" 
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium"
                    )}
                  >
                    <Icon className={clsx(
                      "h-4.5 w-4.5 transition-colors",
                      isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    <span className="text-xs uppercase tracking-wider">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto shrink-0 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md">
                        {item.badge}
                      </span>
                    )}
                    {isActive && !item.badge && <div className="ml-auto w-1 h-4 bg-blue-500 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#0c1322] space-y-3 shrink-0">
        <button 
          onClick={() => setCurrentView(AdminView.PROFILE)}
          className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-800/80 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 overflow-hidden shrink-0">
            {user?.profilePictureUrl ? (
              <img src={user.profilePictureUrl} alt="P" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || "Ejaz Bukhari"}</p>
            <p className="text-[10px] text-slate-500 font-bold truncate">Super Admin</p>
          </div>
        </button>

        <button 
          onClick={handleLogoutAction}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900/30 hover:text-rose-300 border border-rose-900/50 hover:border-rose-800 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
