import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { LayoutDashboard, FileText, Menu, X } from "lucide-react";
import clsx from "clsx";

export function MobileNavigation() {
  const { currentView, setView, isMobileNavOpen, toggleMobileNav } = useDashboardStore();

  const handleNavClick = (viewId: DashboardView) => {
    if (viewId === DashboardView.OVERVIEW) {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
      setView(viewId);
    } else if (viewId === DashboardView.MESSAGES) {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'communication' }));
    } else if (viewId === DashboardView.AI_TUTOR) {
      setView(viewId);
    } else {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
      setView(viewId);
    }
    if (isMobileNavOpen) toggleMobileNav();
  };

  return (
    <>
      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40 pb-safe">
        <button 
          onClick={() => handleNavClick(DashboardView.OVERVIEW)}
          className={clsx("flex flex-col items-center gap-1", currentView === DashboardView.OVERVIEW ? "text-amber-500" : "text-slate-500")}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => handleNavClick(DashboardView.ASSIGNMENTS)}
          className={clsx("flex flex-col items-center gap-1", currentView === DashboardView.ASSIGNMENTS ? "text-amber-500" : "text-slate-500")}
        >
          <FileText className="h-5 w-5" />
          <span className="text-[10px] font-medium">Tasks</span>
        </button>
        <button 
          onClick={toggleMobileNav}
          className={clsx("flex flex-col items-center gap-1", isMobileNavOpen ? "text-amber-500" : "text-slate-500")}
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={toggleMobileNav} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-slate-800 text-sm">Menu</span>
              <button onClick={toggleMobileNav} className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               {/* Just a few key links for the drawer */}
              <button onClick={() => handleNavClick(DashboardView.PROFILE)} className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50">Profile</button>
              <div className="h-px bg-slate-100 my-2"></div>
              <button 
                onClick={() => {
                  localStorage.removeItem("ebm_token");
                  localStorage.removeItem("ebm_user");
                  localStorage.removeItem("ebm_onboarding_progress");
                  localStorage.removeItem("ebm_dashboard_data_cache");
                  window.location.reload();
                }} 
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
