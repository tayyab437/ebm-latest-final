import { create } from "zustand";
import { 
  AdaptiveView, 
  LearningProfile, 
  MasteryRecord, 
  Recommendation, 
  LearningGoal, 
  Habit, 
  Prediction, 
  EBMSkillProgress,
  AdaptiveStats
} from "./adaptive.types";

interface AdaptiveState {
  currentView: AdaptiveView;
  setCurrentView: (view: AdaptiveView) => void;
  profile: LearningProfile;
  stats: AdaptiveStats;
  masteryRecords: MasteryRecord[];
  recommendations: Recommendation[];
  goals: LearningGoal[];
  habits: Habit[];
  predictions: Prediction[];
  skills: EBMSkillProgress[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAdaptiveStore = create<AdaptiveState>((set) => ({
  currentView: AdaptiveView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  profile: {
    preferredStudyTime: "06:00 PM - 08:00 PM",
    learningSpeed: "FAST",
    learningStyle: "VISUAL",
    attentionSpan: 45,
    motivationLevel: 9,
    consistencyScore: 88,
  },
  stats: {
    learningScore: 850,
    masteryPercentage: 72,
    velocity: 12,
    predictedExamScore: 94,
    focusScore: 82,
    retentionScore: 78,
  },
  masteryRecords: [
    { id: "m1", subject: "Mathematics", unit: "Algebra", percentage: 88, lastActivity: "2024-06-28", status: "PROFICIENT" },
    { id: "m2", subject: "Physics", unit: "Mechanics", percentage: 45, lastActivity: "2024-06-29", status: "LEARNING" },
    { id: "m3", subject: "English", unit: "Grammar", percentage: 95, lastActivity: "2024-06-25", status: "MASTERED" },
  ],
  recommendations: [
    { id: "r1", type: "VIDEO", title: "Visualizing Quadratic Equations", reason: "Based on recent Algebra practice", priority: "HIGH", estimatedTime: 12 },
    { id: "r2", type: "AI_CONVERSATION", title: "Deep Dive into Newton's First Law", reason: "You missed 2 questions on Mechanics", priority: "HIGH", estimatedTime: 15 },
    { id: "r3", type: "WORKSHEET", title: "Advanced Calculus Practice", reason: "Accelerated Path recommendation", priority: "MEDIUM", estimatedTime: 30 },
  ],
  goals: [
    { id: "g1", title: "Complete Grade 5 Science", type: "ACADEMIC", targetDate: "2024-08-15", progress: 65, isCompleted: false },
    { id: "g2", title: "Read 50 Pages Weekly", type: "HABIT", targetDate: "2024-12-31", progress: 40, isCompleted: false },
  ],
  habits: [
    { id: "h1", title: "Daily AI Review", streak: 12, lastCompleted: "2024-06-29", history: [true, true, true, true, true, true, true] },
    { id: "h2", title: "Morning Reading", streak: 5, lastCompleted: "2024-06-29", history: [false, true, true, true, true, true, false] },
  ],
  predictions: [
    { metric: "Exam Readiness", value: "92%", confidence: 88, description: "Strong performance in simulated assessments." },
    { metric: "Completion Date", value: "Oct 2026", confidence: 75, description: "At current velocity, O-Level track is on schedule." },
  ],
  skills: [
    { skill: "Critical Thinking", score: 82, level: "Advanced" },
    { skill: "Problem Solving", score: 75, level: "Intermediate" },
    { skill: "Communication", score: 90, level: "Advanced" },
    { skill: "Creativity", score: 68, level: "Intermediate" },
    { skill: "AI Literacy", score: 85, level: "Advanced" },
  ],
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
