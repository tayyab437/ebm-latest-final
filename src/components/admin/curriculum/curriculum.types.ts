export enum CurriculumView {
  DASHBOARD = "DASHBOARD",
  PROGRAMS = "PROGRAMS",
  SUBJECTS = "SUBJECTS",
  UNITS = "UNITS",
  CHAPTERS = "CHAPTERS",
  LESSONS = "LESSONS",
  TOPICS = "TOPICS",
  RESOURCES = "RESOURCES",
  OUTCOMES = "OUTCOMES",
  EBM_SKILLS = "EBM_SKILLS",
  VERSION_HISTORY = "VERSION_HISTORY",
  PUBLISHING = "PUBLISHING",
  SETTINGS = "SETTINGS",
}

export interface AcademicProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  targetAudience: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: string;
  language: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  programId: string;
  code: string;
  name: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  recommendedAge: string;
  estimatedHours: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: string;
  publishDate?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  unitId?: string;
  chapterId?: string;
  title: string;
  description: string;
  lessonType: "VIDEO" | "INTERACTIVE" | "READING" | "WORKSHEET" | "ASSESSMENT";
  estimatedDuration: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED";
  version: string;
}
