export type OnboardingState = any;

export enum DashboardView {
  OVERVIEW = "overview",
  ACHIEVEMENTS = "achievements",
  NOTIFICATIONS = "notifications",
  PROFILE = "profile",
  ASSIGNMENTS = "assignments",
  ASSESSMENTS = "assessments",
  AI_TUTOR = "ai_tutor",
  CERTIFICATES = "certificates",
  MESSAGES = "messages",
  ANNOUNCEMENTS = "announcements",
  SETTINGS = "settings",
  SUPPORT = "support",
  MY_CLASSES = "my_classes"
}

export interface SubjectProgress {
  id: string;
  name: string;
  code: string;
  color: string;
  progressPercentage: number;
  lessonsCompleted: number;
  totalLessons: number;
  nextLessonTitle: string;
  pendingAssignments: number;
  aiMasteryScore: number; // 0-100
}

export interface AssignmentSummary {
  id: string;
  title: string;
  subjectName: string;
  dueDate: string;
  status: "PENDING" | "SUBMITTED" | "REVIEWED" | "LATE";
  score?: number;
  maxScore?: number;
}

export interface AssessmentSummary {
  id: string;
  title: string;
  subjectName: string;
  date: string;
  status: "UPCOMING" | "COMPLETED" | "MISSED";
  score?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "LESSON" | "ASSESSMENT" | "DEADLINE" | "REVISION" | "EVENT";
  subjectName?: string;
}

export interface ActivityTimelineItem {
  id: string;
  type: "LESSON_COMPLETED" | "QUIZ_PASSED" | "BADGE_EARNED" | "WORKSHEET_DOWNLOADED" | "AI_SESSION" | "ASSIGNMENT_SUBMITTED" | "CERTIFICATE_EARNED";
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedAt: string;
  xpAwarded: number;
}

export interface AIRecommendation {
  id: string;
  type: "FOCUS" | "LESSON" | "WEAK_TOPIC" | "REVISION" | "MOTIVATION" | "PRACTICE" | "TIP";
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  gradeLevel: string;
  issuedAt: string;
  title: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "ASSIGNMENT" | "MESSAGE" | "ALERT" | "ACHIEVEMENT" | "SYSTEM";
  timestamp: string;
  read: boolean;
}

export interface LearningStatistics {
  overallCompletionPercentage: number;
  currentAcademicYear: string;
  weeklyStudyHours: number[]; // e.g. [2, 3, 1, 4, 2, 0, 0] for Mon-Sun
  monthlyStudyHours: number;
  learningTrend: "UP" | "DOWN" | "FLAT";
  masteryScore: number; // 0-100
  totalXp: number;
  learningStreakDays: number;
  loginHistory?: string[];
}

export interface StudentDashboardData {
  studentName: string;
  currentGrade: string;
  currentLevel: string;
  statistics: LearningStatistics;
  subjects: SubjectProgress[];
  recentAssignments: AssignmentSummary[];
  upcomingAssessments: AssessmentSummary[];
  calendarEvents: CalendarEvent[];
  recentActivity: ActivityTimelineItem[];
  achievements: Achievement[];
  certificates: Certificate[];
  aiRecommendations: AIRecommendation[];
  notifications: Notification[];
  onboardingData?: OnboardingState;
  isPromotionAvailable?: boolean;
  parentEmail?: string;
  unlockedDiagnostics?: string[];
}
