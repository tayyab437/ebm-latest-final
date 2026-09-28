import React from "react";
import { useLearningStore } from "./learning.store";
import { DashboardSidebar } from "../dashboard/DashboardSidebar";
import { LearningHeader } from "./LearningHeader";
import { LearningAssistant } from "./LearningAssistant";
import { SubjectDashboard } from "./SubjectDashboard";
import { SubjectDetail } from "./SubjectDetail";
import { LessonPlayer } from "./LessonPlayer";
import { NotesView } from "./NotesView";
import { BookmarksView } from "./BookmarksView";
import { HistoryView } from "./HistoryView";
import { DownloadsView } from "./DownloadsView";
import { SearchView } from "./SearchView";
import { LearningView } from "./learning.types";
import { SEOHead } from "../../SEOHead";

export function LearningLayout() {
  const { currentView, isAssistantOpen } = useLearningStore();

  return (
    <div className="h-screen w-full flex bg-slate-50 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOHead 
        title="EBM Learning Portal | Interactive Courses & Study Modules"
        description="Access structured learning modules, interactive lessons, syllabus plans, and adaptive practice exercises designed for Grade 1 through Cambridge O/A Levels."
        canonicalUrl="https://ejazbukharimethod.com/learning"
      />
      <DashboardSidebar activeContext="learning" />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <LearningHeader />
        
        <main className="flex-1 overflow-y-auto scroll-smooth relative">
          {currentView === LearningView.DASHBOARD && <SubjectDashboard />}
          {currentView === LearningView.SUBJECTS && <SubjectDashboard />}
          {currentView === LearningView.SUBJECT_DETAIL && <SubjectDetail />}
          {currentView === LearningView.LESSON_PLAYER && <LessonPlayer />}
          {currentView === LearningView.NOTES && <NotesView />}
          {currentView === LearningView.BOOKMARKS && <BookmarksView />}
          {currentView === LearningView.HISTORY && <HistoryView />}
          {currentView === LearningView.DOWNLOADS && <DownloadsView />}
          {currentView === LearningView.SEARCH && <SearchView />}
        </main>
      </div>

      {isAssistantOpen && (
        <LearningAssistant />
      )}
    </div>
  );
}
