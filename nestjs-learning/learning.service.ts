import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class LearningService {
  constructor(private prisma: any) {} // Replace with actual Prisma service

  async getSubjects() {
    return this.prisma.subject.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    });
  }

  async getSubjectDetails(subjectId: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId }
    });
    if (!subject) throw new NotFoundException("Subject not found");
    return subject;
  }

  async getUnits(subjectId: string) {
    return this.prisma.unit.findMany({
      where: { subjectId, deletedAt: null },
      orderBy: { orderIndex: "asc" }
    });
  }

  async getLessons(unitId: string) {
    return this.prisma.lesson.findMany({
      where: { unitId, deletedAt: null },
      orderBy: { orderIndex: "asc" }
    });
  }

  async getProgress(userId: string, subjectId: string) {
    // In production, aggregate from lesson_progress
    return {
      subjectId,
      completionPercentage: 15,
      completedLessons: [],
      timeSpentMinutes: 120,
      lastActive: new Date().toISOString()
    };
  }

  async createNote(userId: string, dto: any) {
    return this.prisma.studentNote.create({
      data: {
        studentProfileId: userId,
        lessonId: dto.lessonId,
        content: dto.content,
        timestampSeconds: dto.timestampSeconds
      }
    });
  }

  async getNotes(userId: string, lessonId: string) {
    return this.prisma.studentNote.findMany({
      where: { studentProfileId: userId, lessonId },
      orderBy: { timestampSeconds: "asc" }
    });
  }
}
