/**
 * EBM Digital Learning Ecosystem Types
 * TypeScript definitions for a production-ready EdTech platform
 */

export enum UserRole {
  STUDENT = "STUDENT",
  PARENT = "PARENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export enum EbmYear {
  YEAR_1 = "YEAR_1", // Grade 5, 6, 7 fundamentals
  YEAR_2 = "YEAR_2", // Grade 8, 9 Pre-O Level
  YEAR_3 = "YEAR_3", // O-Level Syllabus & Exams
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  ebmYear?: EbmYear;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  subject: string;
  year: EbmYear;
  weekNumber: number;
  durationDays: number;
  progress: number; // 0 to 100
  lessons: Lesson[];
  quizzes: Quiz[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questionsCount: number;
  score?: number;
  completed: boolean;
}

export interface DailyPlannerTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: "LESSON" | "QUIZ" | "PRACTICE" | "REVISION";
  status: "PENDING" | "COMPLETED";
  estimatedMinutes: number;
  date: string; // YYYY-MM-DD
}

export interface StudentProgress {
  studentId: string;
  currentYear: EbmYear;
  overallProgress: number; // 0 - 100
  completedModulesCount: number;
  totalModulesCount: number;
  attendanceStreak: number;
  dailyStreak: number;
  totalStudyMinutes: number;
  weeklyProgress: { day: string; minutes: number }[];
}

export interface ParentNotification {
  id: string;
  studentId: string;
  title: string;
  message: string;
  type: "PERFORMANCE" | "COMPLETION" | "ATTENDANCE" | "ALERT";
  isRead: boolean;
  createdAt: string;
}

export interface TeacherClass {
  id: string;
  name: string;
  year: EbmYear;
  studentsCount: number;
  averageProgress: number;
  activeStudentsCount: number;
}

export interface ChatMessage {
  id: string;
  sender: "USER" | "AI";
  text: string;
  timestamp: string;
}

export interface CloudflareR2Upload {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  r2Url: string;
  uploadedBy: string;
  createdAt: string;
}

export * from "./types/blog.types";
