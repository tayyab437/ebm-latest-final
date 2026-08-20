export enum RiskLevel {
  EXCELLENT = "EXCELLENT",
  LOW_RISK = "LOW_RISK",
  MODERATE_RISK = "MODERATE_RISK",
  HIGH_RISK = "HIGH_RISK",
  CRITICAL = "CRITICAL",
}

export enum CaseStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  UNDER_REVIEW = "UNDER_REVIEW",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum CasePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface UserSnippet {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface StudentRiskProfile {
  studentId: string;
  studentName: string;
  grade: string;
  riskLevel: RiskLevel;
  riskScore: number;
  academicScore: number;
  attendanceScore: number;
  engagementScore: number;
  behaviorScore: number;
  lastUpdated: string;
  criticalAlerts: string[];
}

export interface InterventionCase {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  type:
    | "ACADEMIC"
    | "ATTENDANCE"
    | "BEHAVIOR"
    | "LEARNING_DIFFICULTY"
    | "PARENT_CONCERN"
    | "AI_RECOMMENDATION"
    | "OTHER";
  status: CaseStatus;
  priority: CasePriority;
  owner: UserSnippet;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
}

export interface ActionPlan {
  id: string;
  caseId: string;
  title: string;
  description: string;
  goals: string[];
  tasks: ActionTask[];
  status: "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  targetDate: string;
}

export interface ActionTask {
  id: string;
  title: string;
  assignee: UserSnippet;
  dueDate: string;
  isCompleted: boolean;
}

export interface TeacherObservation {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  category: "ACADEMIC" | "BEHAVIOR" | "EMOTIONAL" | "SOCIAL" | "OTHER";
  observation: string;
  date: string;
  impactLevel: "POSITIVE" | "NEUTRAL" | "CONCERNING" | "CRITICAL";
}

export interface ParentMeeting {
  id: string;
  studentId: string;
  title: string;
  date: string;
  type: "ONLINE" | "IN_PERSON" | "PHONE";
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  participants: UserSnippet[];
  notes?: string;
  actionItems?: string[];
}

export interface StudentReferral {
  id: string;
  studentId: string;
  studentName: string;
  referredTo: string;
  reason: string;
  status: "PENDING" | "ACCEPTED" | "COMPLETED";
  date: string;
}

export interface ProgressHistoryEntry {
  studentId: string;
  week: string;
  academicScore: number;
  attendanceScore: number;
  engagementScore: number;
}
