import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { useCommunicationStore } from "../../communication/communication.store";
import { useBrandingStore, BRANDING_ICONS } from "../../../lib/branding.store";
import { 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  Library, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";
import clsx from "clsx";

const SIDEBAR_ITEMS = [
  { id: DashboardView.OVERVIEW, label: "Dashboard", icon: LayoutDashboard, group: "LEARNING" },
  { id: DashboardView.MY_CLASSES, label: "My Classes", icon: Users, group: "LEARNING" },
  
  { id: DashboardView.MESSAGES, label: "Messages", icon: MessageSquare, group: "COMMUNITY" },

  { id: DashboardView.ASSIGNMENTS, label: "Assignments", icon: FileText, group: "ASSESSMENTS" },
  { id: DashboardView.ASSESSMENTS, label: "Assessments", icon: CheckCircle, group: "ASSESSMENTS" },
  
  { id: DashboardView.AI_TUTOR, label: "AI Tutor", icon: Sparkles, group: "TOOLS" },
  
  { id: DashboardView.ACHIEVEMENTS, label: "Achievements", icon: Trophy, group: "PROGRESS" },
  { id: DashboardView.CERTIFICATES, label: "Certificates", icon: Award, group: "PROGRESS" },
];

export function DashboardSidebar({ activeContext = 'dashboard' }: { activeContext?: string }) {
  const { currentView: dashView, setView: setDashView, isSidebarCollapsed, toggleSidebar } = useDashboardStore();
  const { conversations, fetchConversations } = useCommunicationStore();

  useEffect(() => {
    if (dashView === DashboardView.AI_TUTOR) {
      useDashboardStore.setState({ isSidebarCollapsed: true });
    }
  }, [dashView]);

  useEffect(() => {
    fetchConversations(true);
  }, [fetchConversations]);

  const totalUnreadMessages = conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);

  const { logoText, logoType, logoIcon, logoImageUrl } = useBrandingStore();

  const handleLogout = () => {
    localStorage.removeItem("ebm_token");
    localStorage.removeItem("ebm_user");
    localStorage.removeItem("ebm_onboarding_progress");
    localStorage.removeItem("ebm_dashboard_data_cache");
    window.location.href = "/";
  };

  const groups = [...new Set(SIDEBAR_ITEMS.map(item => item.group))];

  const handleNavClick = (viewId: DashboardView) => {
    if (viewId === DashboardView.OVERVIEW) {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
      setDashView(viewId);
    } else if (viewId === DashboardView.AI_TUTOR) {
      setDashView(viewId);
    } else {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
      setDashView(viewId);
    }
  };

  return (
    <aside 
      className={clsx(
        "h-screen bg-slate-950 text-slate-300 flex flex-col transition-all duration-300 ease-in-out relative border-r border-slate-800 shadow-xl z-20",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-slate-800 text-slate-300 p-1 rounded-full border border-slate-700 hover:text-white hover:bg-slate-700 z-30 transition-transform active:scale-90"
      >
        {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Brand */}
      <Link 
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Return to Home Page"
        className={clsx("p-6 flex items-center gap-3 shrink-0 cursor-pointer group hover:opacity-90 transition-opacity", isSidebarCollapsed && "justify-center px-0")}
      >
        {logoType === "icon" ? (
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
            {(() => {
              const IconComponent = BRANDING_ICONS[logoIcon] || ShieldCheck;
              return <IconComponent className="h-4.5 w-4.5 text-white" />;
            })()}
          </div>
        ) : logoImageUrl ? (
          <div className="w-8 h-8 flex items-center justify-center bg-transparent shrink-0 group-hover:scale-105 transition-transform">
            <img src={logoImageUrl} alt="Logo" className="w-full h-full object-contain bg-transparent" style={{ backgroundColor: 'transparent' }} referrerPolicy="no-referrer" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-4.5 w-4.5 text-white" />
          </div>
        )}
        {!isSidebarCollapsed && (
          <span className="font-bold text-lg tracking-tight text-white line-clamp-1 group-hover:text-blue-400 transition-colors">{logoText}</span>
        )}
      </Link>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700">
        <nav className="p-3 space-y-6">
          {groups.map(group => (
            <div key={group} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold tracking-wider text-slate-500 mb-2 mt-2">
                  {group}
                </div>
              )}
              {SIDEBAR_ITEMS.filter(item => item.group === group).map(item => {
                let isActive = dashView === item.id;
                
                // Dynamic badge for messages
                let badge = (item as any).badge;
                if (item.id === DashboardView.MESSAGES) {
                  badge = totalUnreadMessages > 0 ? totalUnreadMessages : undefined;
                }
                
                const Icon = item.icon;
                return (
                  <React.Fragment key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={clsx(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative outline-none",
                        isActive 
                          ? "bg-amber-500/10 text-amber-500 font-semibold" 
                          : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400 font-medium"
                      )}
                      title={isSidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={clsx("h-5 w-5 shrink-0 transition-colors", isActive ? "text-amber-500" : "group-hover:text-amber-400")} />
                      {!isSidebarCollapsed && (
                        <span className="text-xs truncate text-left flex-1">{item.label}</span>
                      )}
                      {badge && !isSidebarCollapsed && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0">
                          {badge}
                        </span>
                      )}
                      {badge && isSidebarCollapsed && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full"></span>
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-800/50 space-y-1 shrink-0">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
            setDashView(DashboardView.PROFILE);
          }}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group outline-none",
            activeContext === 'dashboard' && dashView === DashboardView.PROFILE 
              ? "bg-amber-500/10 text-amber-500 font-semibold" 
              : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400 font-medium"
          )}
          title={isSidebarCollapsed ? "Profile" : undefined}
        >
          <UserIcon className="h-5 w-5 shrink-0" />
          {!isSidebarCollapsed && <span className="text-xs truncate">Profile</span>}
        </button>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
            setDashView(DashboardView.SUPPORT);
          }}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group outline-none hover:bg-slate-800/50 hover:text-slate-100 text-slate-400 font-medium"
          )}
          title={isSidebarCollapsed ? "Support" : undefined}
        >
          <HelpCircle className="h-5 w-5 shrink-0" />
          {!isSidebarCollapsed && <span className="text-xs truncate">Support</span>}
        </button>
        <button
          onClick={handleLogout}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group outline-none hover:bg-red-500/10 hover:text-red-400 text-slate-400 font-medium mt-2"
          )}
          title={isSidebarCollapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isSidebarCollapsed && <span className="text-xs truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

