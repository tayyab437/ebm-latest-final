/**
 * TypeScript Interfaces for EBM Curriculum & Subjects Explorer
 * Fully typed and prepared for future relational database mapping.
 */

export interface SkillLevel {
  id: string;
  name: string;
  percentage: number; // 0 to 100
}

export interface SubjectStatistic {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  iconName: string;
  countLabel: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface Topic {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonCount: number;
}

export interface TopicGroup {
  id: string;
  groupTitle: string;
  estimatedDuration: string;
  topics: Topic[];
}

export interface CurriculumStage {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SubjectOverview {
  overview: string;
  learningObjectives: string[];
  skillsDeveloped: SkillLevel[];
  studyPlan: {
    weeklyCommitment: string;
    assessmentFrequency: string;
    revisionStructure: string;
  };
  careerPathways: string[];
  prerequisites: string[];
  certificationName: string;
}

export interface SubjectData {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  difficultyLevel: "Foundation" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  lessonCount: number;
  worksheetCount: number;
  quizCount: number;
  overview: SubjectOverview;
  statistics: SubjectStatistic[];
  resources: LearningResource[];
  aiTools: AITool[];
  topicGroups: TopicGroup[];
  stages: CurriculumStage[];
}
