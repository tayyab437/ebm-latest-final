import {
  IDashboardService,
  NavigationItem,
  StudentProgress,
  DashboardWidget,
  ParentInsight,
  TeacherStatistic,
  AdminStatistic,
  LibraryResource,
  ChartData,
  CommunityCard,
  Certificate
} from "./dashboard.types";

import {
  NAVIGATION_ITEMS,
  STUDENT_WIDGETS,
  PARENT_WIDGETS,
  TEACHER_WIDGETS,
  ADMIN_WIDGETS,
  LIBRARY_DATA,
  ANALYTICS_DATA,
  COMMUNITY_DATA,
  CERTIFICATE_DATA
} from "./dashboard.constants";

/**
 * Reusable data class which prepares EBM for future integration with databases (like PostgreSQL).
 * All data fetching operates as asynchronous promises mimicking actual endpoint responses.
 */
export class PlatformShowcaseService implements IDashboardService {
  async getNavigationItems(): Promise<NavigationItem[]> {
    // In production, this can query: SELECT * FROM dashboard_navigation WHERE active = true;
    return NAVIGATION_ITEMS;
  }

  async getStudentPreview(): Promise<{ progress: StudentProgress; widgets: DashboardWidget[] }> {
    // In production, this can query: SELECT * FROM student_progress WHERE user_id = ?;
    const progress: StudentProgress = {
      weeklyHours: 18.5,
      streak: 12,
      completedQuizzes: 47,
      xpPoints: 14850
    };
    return { progress, widgets: STUDENT_WIDGETS };
  }

  async getParentPreview(): Promise<{ insight: ParentInsight; widgets: DashboardWidget[] }> {
    // In production: SELECT * FROM parent_insights WHERE child_id = ?;
    const insight: ParentInsight = {
      studentName: "Danya Malik",
      attendanceRate: 98.6,
      avgScore: 91.2,
      focusScore: 94,
      recentActivity: "Completed 'Organic Cell Structure' active recall workbook"
    };
    return { insight, widgets: PARENT_WIDGETS };
  }

  async getTeacherPreview(): Promise<{ stat: TeacherStatistic; widgets: DashboardWidget[] }> {
    // In production: SELECT * FROM teacher_stats WHERE mentor_id = ?;
    const stat: TeacherStatistic = {
      activeClasses: 4,
      pendingReviews: 8,
      averageClassPerformance: 88.4
    };
    return { stat, widgets: TEACHER_WIDGETS };
  }

  async getAdminPreview(): Promise<{ stat: AdminStatistic; widgets: DashboardWidget[] }> {
    // In production: SELECT * FROM admin_metrics;
    const stat: AdminStatistic = {
      totalUsers: 1420,
      systemUptime: "99.98%",
      activeSessions: 348
    };
    return { stat, widgets: ADMIN_WIDGETS };
  }

  async getLibrary(): Promise<LibraryResource[]> {
    // In production: SELECT * FROM library_resources ORDER BY created_at DESC LIMIT 10;
    return LIBRARY_DATA;
  }

  async getAnalytics(): Promise<ChartData[]> {
    // In production: SELECT label, value, secondary_value FROM weekly_analytics WHERE user_id = ?;
    return ANALYTICS_DATA;
  }

  async getCommunity(): Promise<CommunityCard[]> {
    // In production: SELECT * FROM community_posts WHERE moderation_status = 'approved' ORDER BY time_stamp DESC;
    return COMMUNITY_DATA;
  }

  async getCertificates(): Promise<Certificate[]> {
    // In production: SELECT * FROM user_certificates WHERE user_id = ?;
    return CERTIFICATE_DATA;
  }
}

export const showcaseService = new PlatformShowcaseService();
