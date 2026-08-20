import { Controller, Get, Post, Body, Param, Req } from "@nestjs/common";
import { LearningService } from "./learning.service";

@Controller("student/learning")
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get("subjects")
  async getSubjects() {
    // Replace with actual DB call in production
    // return this.learningService.getSubjects();
    return { success: true, data: [] }; // Mocked out in frontend anyway for demo
  }

  @Get("subjects/:id")
  async getSubjectDetails(@Param("id") id: string) {
    return { success: true, data: {} };
  }

  @Get("units/:subjectId")
  async getUnits(@Param("subjectId") subjectId: string) {
    return { success: true, data: [] };
  }

  @Get("lessons/:unitId")
  async getLessons(@Param("unitId") unitId: string) {
    return { success: true, data: [] };
  }

  @Get("progress/:subjectId")
  async getProgress(@Req() req: any, @Param("subjectId") subjectId: string) {
    const userId = req.user?.id || "student-1";
    return { success: true, data: await this.learningService.getProgress(userId, subjectId) };
  }

  @Post("notes")
  async createNote(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || "student-1";
    return { success: true, data: await this.learningService.createNote(userId, body) };
  }
}
