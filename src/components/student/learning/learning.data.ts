import { Subject, Unit, Lesson, LearningProgress } from "./learning.types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "sub-eng",
    code: "1123",
    name: "English Language",
    description: "Cambridge O Level English Language syllabus.",
    color: "bg-blue-500",
    icon: "book-open",
    totalUnits: 8,
    totalLessons: 45,
    estimatedHours: 60,
    difficulty: "INTERMEDIATE"
  },
  {
    id: "sub-math",
    code: "4024",
    name: "Mathematics",
    description: "Cambridge O Level Mathematics (Syllabus D).",
    color: "bg-emerald-500",
    icon: "calculator",
    totalUnits: 12,
    totalLessons: 80,
    estimatedHours: 120,
    difficulty: "INTERMEDIATE"
  },
  {
    id: "sub-phy",
    code: "5054",
    name: "Physics",
    description: "Cambridge O Level Physics syllabus.",
    color: "bg-amber-500",
    icon: "zap",
    totalUnits: 10,
    totalLessons: 60,
    estimatedHours: 90,
    difficulty: "ADVANCED"
  }
];

export const MOCK_UNITS: Record<string, Unit[]> = {
  "sub-math": [
    {
      id: "unit-math-1",
      subjectId: "sub-math",
      title: "Number",
      description: "Number concepts and operations.",
      orderIndex: 1,
      totalLessons: 8
    },
    {
      id: "unit-math-2",
      subjectId: "sub-math",
      title: "Set Language and Notation",
      description: "Set theory and Venn diagrams.",
      orderIndex: 2,
      totalLessons: 5
    },
    {
      id: "unit-math-3",
      subjectId: "sub-math",
      title: "Algebra",
      description: "Algebraic representation and manipulation.",
      orderIndex: 3,
      totalLessons: 12
    }
  ]
};

export const MOCK_LESSONS: Record<string, Lesson[]> = {
  "unit-math-1": [
    {
      id: "les-math-1-1",
      unitId: "unit-math-1",
      title: "Types of Numbers",
      description: "Identify and use natural numbers, integers, prime numbers, etc.",
      type: "VIDEO",
      durationMinutes: 15,
      orderIndex: 1,
      videoUrl: "https://example.com/video1.mp4",
      isCompleted: true
    },
    {
      id: "les-math-1-2",
      unitId: "unit-math-1",
      title: "Prime Factors",
      description: "Find prime factors, HCF and LCM.",
      type: "VIDEO",
      durationMinutes: 20,
      orderIndex: 2,
      videoUrl: "https://example.com/video2.mp4",
      isCompleted: false
    }
  ]
};

export const MOCK_PROGRESS: Record<string, LearningProgress> = {
  "sub-math": {
    subjectId: "sub-math",
    completionPercentage: 12,
    completedLessons: ["les-math-1-1"],
    currentLessonId: "les-math-1-2",
    timeSpentMinutes: 145,
    lastActive: "2026-06-29T10:00:00Z"
  }
};
