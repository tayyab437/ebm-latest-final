export enum LearningView {
  DASHBOARD = "dashboard",
  SUBJECTS = "subjects",
  SUBJECT_DETAIL = "subject_detail",
  LESSON_PLAYER = "lesson_player",
  NOTES = "notes",
  BOOKMARKS = "bookmarks",
  HISTORY = "history",
  DOWNLOADS = "downloads",
  SEARCH = "search"
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  totalUnits: number;
  totalLessons: number;
  estimatedHours: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export interface Unit {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  orderIndex: number;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: "VIDEO" | "TEXT" | "INTERACTIVE" | "ASSESSMENT";
  durationMinutes: number;
  orderIndex: number;
  videoUrl?: string;
  content?: string;
  isCompleted?: boolean;
  isDiagnostic?: number;
  price?: string;
  whatsappNumber?: string;
  thumbnailUrl?: string;
}

export interface StudentNote {
  id: string;
  lessonId: string;
  content: string;
  timestamp: number; // Video timestamp in seconds
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  targetId: string;
  targetType: "LESSON" | "VIDEO" | "NOTE" | "RESOURCE";
  title: string;
  createdAt: string;
}

export interface LearningResource {
  id: string;
  lessonId: string;
  title: string;
  type: "PDF" | "SLIDES" | "WORKSHEET" | "LINK";
  url: string;
  sizeBytes?: number;
}

export interface LearningProgress {
  subjectId: string;
  completionPercentage: number;
  completedLessons: string[]; // Lesson IDs
  currentLessonId?: string;
  timeSpentMinutes: number;
  lastActive: string;
}

export interface LearningState {
  currentView: LearningView;
  currentSubjectId: string | null;
  currentUnitId: string | null;
  currentLessonId: string | null;
  videoPlaybackTime: number;
  isAssistantOpen: boolean;
  notes: StudentNote[];
  bookmarks: Bookmark[];
}
