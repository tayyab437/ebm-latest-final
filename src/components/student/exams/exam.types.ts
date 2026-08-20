export enum ExamView {
  DASHBOARD = "DASHBOARD",
  CALENDAR = "CALENDAR",
  QUESTION_BANK = "QUESTION_BANK",
  CREATE = "CREATE",
  TEMPLATES = "TEMPLATES",
  AI_GENERATOR = "AI_GENERATOR",
  LIVE = "LIVE",
  RESULTS = "RESULTS",
  ANALYTICS = "ANALYTICS",
  CERTIFICATES = "CERTIFICATES",
  MODERATION = "MODERATION",
  RUBRICS = "RUBRICS",
  SETTINGS = "SETTINGS",
  PLAYER = "PLAYER"
}

export enum QuestionType {
  MCQ = "MCQ",
  MRQ = "MRQ",
  TRUE_FALSE = "TRUE_FALSE",
  FILL_BLANKS = "FILL_BLANKS",
  SHORT_ANSWER = "SHORT_ANSWER",
  LONG_ANSWER = "LONG_ANSWER",
  ESSAY = "ESSAY",
  MATCHING = "MATCHING",
  ORDERING = "ORDERING",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  READING = "READING",
  WRITING = "WRITING",
  SPEAKING = "SPEAKING"
}

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[]; // For MCQ/MRQ
  correctAnswer?: string | string[];
  points: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  subject: string;
  topic?: string;
  learningOutcome?: string;
  rubricId?: string;
  explanation?: string;
  hints?: string[];
  bloomLevel?: string;
  competency?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  type: "DIAGNOSTIC" | "CHAPTER" | "UNIT" | "MOCK" | "FINAL" | "CERTIFICATION";
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  startTime?: string;
  endTime?: string;
  questions: Question[];
  sections?: ExamSection[];
}

export interface ExamSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  questions: Question[];
}

export interface StudentAttempt {
  id: string;
  examId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  status: "IN_PROGRESS" | "COMPLETED" | "MARKED";
  score?: number;
  feedback?: string;
  answers: Record<string, any>; // questionId -> answer
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  studentName: string;
  courseName: string;
  verificationId: string;
  qrCodeUrl: string;
  pdfUrl: string;
}
