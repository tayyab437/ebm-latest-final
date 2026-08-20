export interface AIMessage {
  id: string;
  sender: "student" | "ai";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface AIConversation {
  id: string;
  studentId: string;
  messages: AIMessage[];
  subjectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIFeature {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badge?: string;
  category: "tutor" | "generator" | "coach" | "assistant";
}

export interface AIWorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface AIResource {
  id: string;
  title: string;
  type: "Worksheet" | "Quiz" | "Notes" | "Flash Cards" | "Mind Map" | "Practice Paper" | "Speaking Exercise" | "Writing Feedback";
  subjectName: string;
  downloadsCount: number;
  estimatedStudyTime: string;
  description: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  needsPracticeIn: string[];
  excelsIn: string[];
  academicTarget: string;
  aiPersonaAdaptation: string;
}

export interface QuickPrompt {
  id: string;
  label: string;
  promptText: string;
  responseText: string;
  iconName?: string;
}

export interface StudyDashboard {
  id: string;
  todayGoal: string;
  lessonsRemaining: number;
  quizReminder: string;
  revisionTime: string;
  aiRecommendation: string;
  studyStreak: number;
  focusScore: number;
  productivityScore: number;
}

export interface SecurityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AIRecommendation {
  id: string;
  studentId: string;
  targetArea: string;
  recommendationText: string;
  priority: "high" | "medium" | "low";
  suggestedResourceIds: string[];
}

// FUTURE API Typed Service Interfaces
export interface IAILearningService {
  getFeatures(): Promise<AIFeature[]>;
  getPrompts(): Promise<QuickPrompt[]>;
  getResources(): Promise<AIResource[]>;
  getWorkflow(): Promise<AIWorkflowStep[]>;
  getRecommendations(studentId: string): Promise<AIRecommendation[]>;
}
