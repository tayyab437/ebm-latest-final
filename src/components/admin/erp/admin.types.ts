export enum AdminView {
  DASHBOARD = "DASHBOARD",
  INQUIRIES = "INQUIRIES",
  ADMISSIONS = "ADMISSIONS",
  STUDENTS = "STUDENTS",
  TEACHERS = "TEACHERS",
  EMPLOYEES = "EMPLOYEES",
  CLASSES = "CLASSES",
  ACADEMIC_STRUCTURE = "ACADEMIC_STRUCTURE",
  CURRICULUM = "CURRICULUM",
  TIMETABLE = "TIMETABLE",
  EXAMINATIONS = "EXAMINATIONS",
  ATTENDANCE = "ATTENDANCE",
  MESSAGES = "MESSAGES",
  COMMUNICATION = "COMMUNICATION",
  ANNOUNCEMENTS = "ANNOUNCEMENTS",
  NOTIFICATIONS = "NOTIFICATIONS",
  REPORTS = "REPORTS",
  ANALYTICS = "ANALYTICS",
  AUDIT_LOGS = "AUDIT_LOGS",
  SYSTEM_HEALTH = "SYSTEM_HEALTH",
  ROLES = "ROLES",
  PERMISSIONS = "PERMISSIONS",
  SETTINGS = "SETTINGS",
  PROFILE = "PROFILE",
  PARENTING_ACADEMY = "PARENTING_ACADEMY",
  PTM_SCHEDULE = "PTM_SCHEDULE",
}

export interface Admission {
  id: string;
  studentName: string;
  email: string;
  gradeLevel: string;
  status: "PENDING" | "REVIEWING" | "INTERVIEWED" | "OFFERED" | "ENROLLED" | "REJECTED";
  appliedDate: string;
}

export interface AdminStats {
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  totalEmployees: number;
  totalRevenue: string;
  systemHealth: "HEALTHY" | "DEGRADED" | "CRITICAL";
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: "ACTIVE" | "SUSPENDED" | "GRADUATED";
  enrollmentDate: string;
}

export interface AdminTeacher {
  id: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  status: "ACTIVE" | "ON_LEAVE" | "INACTIVE";
}

export interface AdminEmployee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "ACTIVE" | "INACTIVE";
}
