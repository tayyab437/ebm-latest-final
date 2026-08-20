export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface TransformationStage {
  id: string;
  stageName: string;
  timeframe: string;
  confidence: string;
  habits: string;
  growth: string;
  skill: string;
  aiUsage: string;
  parentFeedback: string;
  achievement: string;
}

export interface StudentStory {
  id: string;
  name: string;
  avatarUrl?: string;
  currentGrade: string;
  previousSchool: string;
  goals: string[];
  challenges: string[];
  journey: string;
  achievements: string[];
  favouriteSubject: string;
  favouriteAITool: string;
  futureDream: string;
  parentComment: string;
  teacherComment: string;
}

export interface ParentTestimonial {
  id: string;
  name: string;
  avatarUrl?: string;
  occupation: string;
  childGrade: string;
  rating: number;
  review: string;
  location: string;
  childrenEnrolled: number;
}

export interface TeacherTestimonial {
  id: string;
  name: string;
  avatarUrl?: string;
  subject: string;
  experience: string;
  philosophy: string;
  whyJoined: string;
  favouriteAIFeature: string;
  studentImpact: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badgeType: "streak" | "academic" | "creative" | "science" | "ai" | "critical" | "community" | "attendance";
}

export interface Outcome {
  id: string;
  title: string;
  description: string;
  percentage: number;
  colorClass: string;
}

export interface CareerSkill {
  id: string;
  title: string;
  description: string;
  benefit: string;
  iconName: string;
}

export interface CommunityMetric {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName: string;
}

export interface Award {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
}

// FUTURE API Service Interface
export interface ISuccessService {
  getStatistics(): Promise<Statistic[]>;
  getTransformationStages(): Promise<TransformationStage[]>;
  getStudentStories(): Promise<StudentStory[]>;
  getParentTestimonials(): Promise<ParentTestimonial[]>;
  getTeacherTestimonials(): Promise<TeacherTestimonial[]>;
  getAchievements(): Promise<Achievement[]>;
  getOutcomes(): Promise<Outcome[]>;
  getCareerSkills(): Promise<CareerSkill[]>;
  getCommunityMetrics(): Promise<CommunityMetric[]>;
  getAwards(): Promise<Award[]>;
}
