import React, { useEffect } from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MobileNavigation } from "./MobileNavigation";
import { incrementStudyTime } from "./studyTracker";
import { Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { fetchData, updateStudyHoursLocally, data, promoteStudent } = useDashboardStore();
  const isPromotionAvailable = data?.isPromotionAvailable;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time study hours active session tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const { weeklyHours, monthlyHours } = incrementStudyTime(1);
      updateStudyHoursLocally(weeklyHours, monthlyHours);
    }, 1000);

    return () => clearInterval(interval);
  }, [updateStudyHoursLocally]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <DashboardHeader />
        
        <main id="dashboard-main" className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth p-4 md:p-6 lg:p-8 flex items-start justify-center">
          {/* Constrain width for main content and reduce bottom padding */}
          <div className="w-full max-w-5xl 2xl:max-w-7xl relative mx-auto pb-12 md:pb-4 flex flex-col gap-6 lg:gap-8">
            <div className="flex-1 min-w-0">
               {children}
            </div>
          </div>
        </main>

        <AnimatePresence>
          {isPromotionAvailable && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-24 right-8 z-[90] md:bottom-12"
            >
              <button
                onClick={promoteStudent}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-2xl shadow-orange-200 font-bold hover:scale-105 active:scale-95 transition-all group"
              >
                <div className="bg-white/20 p-2 rounded-full">
                  <Award className="h-6 w-6 animate-bounce" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase tracking-widest opacity-80">Achievement Unlocked</span>
                  <span className="text-lg">Promote to Next Grade</span>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform ml-2" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
