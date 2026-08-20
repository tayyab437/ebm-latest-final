import { Controller, Get, Req } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("student/dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() req: any) {
    const userId = req.user?.id || "student-1";
    // In actual app we try to fetch from DB:
    // return this.dashboardService.getStudentDashboard(userId);
    
    // For demo stability, we return mock data
    const data = await this.dashboardService.mockDashboardData();
    return { success: true, data };
  }

  @Get("today")
  async getToday(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("progress")
  async getProgress(@Req() req: any) {
    return { success: true, data: {} };
  }

  @Get("calendar")
  async getCalendar(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("subjects")
  async getSubjects(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("assignments")
  async getAssignments(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("notifications")
  async getNotifications(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("achievements")
  async getAchievements(@Req() req: any) {
    return { success: true, data: [] };
  }

  @Get("search")
  async search(@Req() req: any) {
    return { success: true, data: [] };
  }
}
