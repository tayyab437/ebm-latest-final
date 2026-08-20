export enum LiveView {
  DASHBOARD = "DASHBOARD",
  CALENDAR = "CALENDAR",
  UPCOMING = "UPCOMING",
  HISTORY = "HISTORY",
  CLASS_DETAILS = "CLASS_DETAILS",
  ATTENDANCE = "ATTENDANCE",
  RESOURCES = "RESOURCES",
  HOMEWORK = "HOMEWORK",
  NOTES = "NOTES",
  RECORDINGS = "RECORDINGS",
  AI_SUMMARY = "AI_SUMMARY",
  ANALYTICS = "ANALYTICS",
  SETTINGS = "SETTINGS",
}

export interface LiveClass {
  id: string;
  subject: string;
  title: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  description?: string;
  learningObjectives?: string[];
  maxStudents: number;
  currentStudents: number;
}

export interface AttendanceRecord {
  id: string;
  classId: string;
  studentId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  joinTime?: string;
  leaveTime?: string;
  duration?: number; // minutes
}

export interface ClassResource {
  id: string;
  classId: string;
  title: string;
  type: "PDF" | "VIDEO" | "WORKSHEET" | "LINK";
  url: string;
}

export interface AISummary {
  id: string;
  classId: string;
  summary: string;
  keyPoints: string[];
  vocabulary: { word: string; definition: string }[];
  homeworkSuggestion: string;
}

export interface LiveStats {
  totalClasses: number;
  attendanceRate: number;
  homeworkCompletion: number;
  participationScore: number;
}
