export enum ContentStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum ContentType {
  UNIT = "UNIT",
  CHAPTER = "CHAPTER",
  LESSON = "LESSON",
  TOPIC = "TOPIC",
  ACTIVITY = "ACTIVITY",
}

export interface UserSnippet {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface CurriculumNode {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  children: CurriculumNode[];
  createdAt: string;
  updatedAt: string;
  author: UserSnippet;
  order: number;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  body: string; // HTML or JSON blocks
  status: ContentStatus;
  outcomes: string[];
  tags: string[];
  version: number;
  author: UserSnippet;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewRequest {
  id: string;
  lessonId: string;
  lessonTitle: string;
  requester: UserSnippet;
  reviewer?: UserSnippet;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comments: ReviewComment[];
  createdAt: string;
}

export interface ReviewComment {
  id: string;
  author: UserSnippet;
  text: string;
  createdAt: string;
}
