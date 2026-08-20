export interface DashboardWidget {
  id: string;
  title: string;
  value?: string | number;
  subtitle?: string;
  type: "metric" | "list" | "chart" | "alert" | "custom";
  iconName?: string;
  badge?: string;
}

export interface ChartData {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface Certificate {
  id: string;
  title: string;
  subject: string;
  issueDate: string;
  badgeUrl?: string;
  credentialId: string;
}

export interface CommunityCard {
  id: string;
  author: string;
  role: "Student" | "Mentor" | "Parent" | "Admin";
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export interface LibraryResource {
  id: string;
  title: string;
  format: "PDF" | "Video" | "Quiz" | "Interactive";
  subject: string;
  sizeOrDuration: string;
}

export interface AssessmentSummary {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "completed" | "graded";
  score?: string;
}

export interface StudentProgress {
  weeklyHours: number;
  streak: number;
  completedQuizzes: number;
  xpPoints: number;
}

export interface ParentInsight {
  studentName: string;
  attendanceRate: number;
  avgScore: number;
  focusScore: number;
  recentActivity: string;
}

export interface TeacherStatistic {
  activeClasses: number;
  pendingReviews: number;
  averageClassPerformance: number;
}

export interface AdminStatistic {
  totalUsers: number;
  systemUptime: string;
  activeSessions: number;
}

// FUTURE API Service Interfaces
export interface IDashboardService {
  getNavigationItems(): Promise<NavigationItem[]>;
  getStudentPreview(): Promise<{ progress: StudentProgress; widgets: DashboardWidget[] }>;
  getParentPreview(): Promise<{ insight: ParentInsight; widgets: DashboardWidget[] }>;
  getTeacherPreview(): Promise<{ stat: TeacherStatistic; widgets: DashboardWidget[] }>;
  getAdminPreview(): Promise<{ stat: AdminStatistic; widgets: DashboardWidget[] }>;
  getLibrary(): Promise<LibraryResource[]>;
  getAnalytics(): Promise<ChartData[]>;
  getCommunity(): Promise<CommunityCard[]>;
  getCertificates(): Promise<Certificate[]>;
}
