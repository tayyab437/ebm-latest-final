export enum TeacherView {
  DASHBOARD = "DASHBOARD",
  CLASSES = "CLASSES",
  STUDENTS = "STUDENTS",
  ATTENDANCE = "ATTENDANCE",
  ASSIGNMENTS = "ASSIGNMENTS",
  ASSESSMENTS = "ASSESSMENTS",
  GRADEBOOK = "GRADEBOOK",
  LESSON_PLANNER = "LESSON_PLANNER",
  CURRICULUM = "CURRICULUM",
  RESOURCES = "RESOURCES",
  CALENDAR = "CALENDAR",
  MESSAGES = "MESSAGES",
  ANNOUNCEMENTS = "ANNOUNCEMENTS",
  ANALYTICS = "ANALYTICS",
  AI_ASSISTANT = "AI_ASSISTANT",
  SETTINGS = "SETTINGS",
  MEETINGS = "MEETINGS",
}

export interface TeacherClass {
  id: string;
  name: string;
  subjects?: string[];
  subject?: string; // Keep for backward compatibility temporarily
  gradeLevel: string;
  studentCount: number;
  schedule: string;
  room: string;
  status: "ACTIVE" | "ARCHIVED";
}

export interface TeacherStudent {
  id: string;
  name: string;
  email: string;
  gradeLevel: string;
  performanceScore: number;
  attendanceRate: number;
  riskStatus: "LOW" | "MEDIUM" | "HIGH";
  lastActive: string;
  classIds: string[];
  profilePictureUrl?: string;
}

export interface TeacherAssignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  submissionCount: number;
  totalStudents: number;
}

export interface TeacherAttendance {
  id: string;
  classId: string;
  date: string; // YYYY-MM-DD
  statuses: { [studentId: string]: "PRESENT" | "ABSENT" | "TARDY" };
  notes?: { [studentId: string]: string };
  submittedAt: string;
}

