import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { useCommunicationStore } from "../../communication/communication.store";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Trophy, 
  Award, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import clsx from "clsx";

export function MobileNavigation() {
  const { currentView, setView, isMobileNavOpen, toggleMobileNav, data } = useDashboardStore();
  const { conversations } = useCommunicationStore();

  const totalUnreadMessages = conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);

  const handleNavClick = (viewId: DashboardView) => {
    setView(viewId);
    if (isMobileNavOpen) toggleMobileNav();
  };

  const handleLogout = () => {
    localStorage.removeItem("ebm_token");
    localStorage.removeItem("ebm_user");
    localStorage.removeItem("ebm_onboarding_progress");
    localStorage.removeItem("ebm_dashboard_data_cache");
    window.location.href = "/";
  };

  const mainTabs = [
    { id: DashboardView.OVERVIEW, label: "Home", icon: LayoutDashboard },
    { id: DashboardView.MY_CLASSES, label: "Classes", icon: Users },
    { id: DashboardView.ASSIGNMENTS, label: "Tasks", icon: FileText },
    { id: DashboardView.MESSAGES, label: "Inbox", icon: MessageSquare, badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined },
  ];

  const drawerSections = [
    {
      title: "LEARNING",
      items: [
        { id: DashboardView.OVERVIEW, label: "Dashboard Overview", icon: LayoutDashboard },
        { id: DashboardView.MY_CLASSES, label: "My Classes & Subjects", icon: Users },
      ]
    },
    {
      title: "COMMUNITY",
      items: [
        { id: DashboardView.MESSAGES, label: "Messages & Chat", icon: MessageSquare, badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined },
      ]
    },
    {
      title: "ASSESSMENTS",
      items: [
        { id: DashboardView.ASSIGNMENTS, label: "Assignments & Tasks", icon: FileText },
        { id: DashboardView.ASSESSMENTS, label: "Exams & Practice", icon: CheckCircle },
      ]
    },
    {
      title: "PROGRESS & REWARDS",
      items: [
        { id: DashboardView.ACHIEVEMENTS, label: "Achievements & Badges", icon: Trophy },
        { id: DashboardView.CERTIFICATES, label: "Certificates & Diplomas", icon: Award },
      ]
    },
    {
      title: "ACCOUNT",
      items: [
        { id: DashboardView.PROFILE, label: "My Profile", icon: User },
        { id: DashboardView.SETTINGS, label: "Account Settings", icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-1.5 flex justify-around items-center z-40 pb-safe shadow-2xl">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={clsx(
                "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl touch-manipulation cursor-pointer active:scale-90 transition-all relative min-w-[56px]",
                isActive ? "text-amber-400 font-extrabold bg-amber-500/10" : "text-slate-400 font-medium hover:text-slate-200"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-slate-900">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight leading-none">{tab.label}</span>
            </button>
          );
        })}

        <button 
          onClick={toggleMobileNav}
          className={clsx(
            "flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl touch-manipulation cursor-pointer active:scale-90 transition-all relative min-w-[56px]",
            isMobileNavOpen ? "text-amber-400 font-extrabold bg-amber-500/10" : "text-slate-400 font-medium hover:text-slate-200"
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] tracking-tight leading-none">More</span>
        </button>
      </nav>

      {/* Mobile Drawer Slide-over */}
      {isMobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
            onClick={toggleMobileNav} 
          />

          {/* Drawer Container */}
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-slate-950 border-l border-slate-800 text-slate-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-white text-sm truncate leading-tight">
                    {data?.studentName || "Student"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">
                    {data?.currentGrade || "Grade 1"} Student
                  </p>
                </div>
              </div>
              <button 
                onClick={toggleMobileNav} 
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Navigation Groups */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
              {drawerSections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 px-3">
                    {section.title}
                  </span>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={clsx(
                            "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-[0.98]",
                            isActive 
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" 
                              : "text-slate-300 hover:bg-slate-900 hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className={clsx("h-4 w-4 shrink-0", isActive ? "text-amber-400" : "text-slate-400")} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.badge && (
                              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-slate-600" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 shrink-0">
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/20 transition-all cursor-pointer active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
