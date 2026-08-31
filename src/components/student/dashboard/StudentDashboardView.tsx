import React from "react";
import {
  DashboardLayout,
  Overview,
  useDashboardStore,
  AssignmentWidget,
  AchievementsWidget,
  CertificatesView,
  PromotionCelebration,
} from "./index";
import { MyClassesView } from "./MyClassesView";
import { ExamDashboard } from "../exams";
import { AILayout } from "../ai";
import { ProfileSettings } from "../../ProfileSettings";
import { Inbox, AnnouncementCenter } from "../../communication";

export default function StudentDashboardView() {
  const { currentView, showCelebration, setShowCelebration, newGrade, setView } = useDashboardStore();

  return (
    <DashboardLayout>
      {showCelebration && (
        <PromotionCelebration 
          newGrade={newGrade} 
          onClose={() => { setShowCelebration(false); setView('my_classes' as any); }} 
        />
      )}
      {currentView === "overview" && <Overview />}
      {currentView === "my_classes" && <MyClassesView />}
      {currentView === "achievements" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-800">Your Achievements</h2>
            <p className="text-slate-500 text-sm mt-1">Track your progress and earned badges</p>
          </div>
          <AchievementsWidget />
        </div>
      )}
      {currentView === "assignments" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-800">Assignments & Tasks</h2>
            <p className="text-slate-500 text-sm mt-1">Manage your pending work and track completion status</p>
          </div>
          <AssignmentWidget />
        </div>
      )}
      {currentView === "assessments" && (
        <div className="space-y-6">
           <ExamDashboard />
        </div>
      )}
      {currentView === "certificates" && (
        <div className="space-y-6">
           <CertificatesView />
        </div>
      )}
      {currentView === "ai_tutor" && (
        <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
           <AILayout />
        </div>
      )}
      {currentView === "profile" && (
        <ProfileSettings role="STUDENT" onBack={() => setView('overview' as any)} />
      )}
      {currentView === "settings" && (
        <ProfileSettings role="STUDENT" onBack={() => setView('overview' as any)} />
      )}
      {currentView === "messages" && (
        <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
          <Inbox />
        </div>
      )}
      {currentView === "announcements" && (
        <div className="h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)]">
          <div className="h-full bg-white rounded-[2rem] border border-slate-200/50 shadow-sm overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10">
              <AnnouncementCenter />
            </div>
          </div>
        </div>
      )}
      
      {/* Placeholder for other views */}
      {currentView !== "overview" && currentView !== "messages" && currentView !== "announcements" && currentView !== "my_classes" && currentView !== "achievements" && currentView !== "assignments" && currentView !== "assessments" && currentView !== "certificates" && currentView !== "ai_tutor" && currentView !== "profile" && currentView !== "settings" && (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-slate-200/50">
          <p className="text-slate-500 font-medium">Coming soon...</p>
        </div>
      )}
    </DashboardLayout>
  );
}
