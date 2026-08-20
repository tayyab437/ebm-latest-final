import { create } from "zustand";
import {
  ContentStatus,
  ContentType,
  CurriculumNode,
  LessonContent,
  ReviewRequest,
} from "./content.types";

interface ContentState {
  currentView:
    | "dashboard"
    | "curriculum"
    | "editor"
    | "review"
    | "publishing"
    | "version-history"
    | "ai-generator"
    | "analytics"
    | "templates"
    | "resources"
    | "outcomes";
  curriculumTree: CurriculumNode[];
  activeLesson: LessonContent | null;
  pendingReviews: ReviewRequest[];
  isLoading: boolean;

  setCurrentView: (view: ContentState["currentView"]) => void;
  setActiveLesson: (lesson: LessonContent | null) => void;

  fetchCurriculum: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  generateAIContent: (prompt: string, type: string) => Promise<string>;
}

const mockCurriculum: CurriculumNode[] = [
  {
    id: "unit-1",
    title: "Unit 1: Algebra Fundamentals",
    type: ContentType.UNIT,
    status: ContentStatus.PUBLISHED,
    order: 1,
    author: { id: "a1", name: "Dr. Sarah Jenkins", role: "Subject Head" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [
      {
        id: "chap-1",
        title: "Chapter 1: Linear Equations",
        type: ContentType.CHAPTER,
        status: ContentStatus.PUBLISHED,
        order: 1,
        author: { id: "a1", name: "Dr. Sarah Jenkins", role: "Subject Head" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: "less-1",
            title: "Solving Single Variable Equations",
            type: ContentType.LESSON,
            status: ContentStatus.PUBLISHED,
            order: 1,
            author: {
              id: "a2",
              name: "Mr. Roberts",
              role: "Curriculum Designer",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [],
          },
          {
            id: "less-2",
            title: "Solving Equations with Fractions",
            type: ContentType.LESSON,
            status: ContentStatus.IN_REVIEW,
            order: 2,
            author: {
              id: "a2",
              name: "Mr. Roberts",
              role: "Curriculum Designer",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [],
          },
        ],
      },
    ],
  },
];

const mockReviews: ReviewRequest[] = [
  {
    id: "rev-1",
    lessonId: "less-2",
    lessonTitle: "Solving Equations with Fractions",
    requester: { id: "a2", name: "Mr. Roberts", role: "Curriculum Designer" },
    status: "PENDING",
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

export const useContentStore = create<ContentState>((set) => ({
  currentView: "dashboard",
  curriculumTree: [],
  activeLesson: null,
  pendingReviews: [],
  isLoading: false,

  setCurrentView: (view) => set({ currentView: view }),
  setActiveLesson: (lesson) => set({ activeLesson: lesson }),

  fetchCurriculum: async () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ curriculumTree: mockCurriculum, isLoading: false });
    }, 500);
  },

  fetchReviews: async () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ pendingReviews: mockReviews, isLoading: false });
    }, 500);
  },

  generateAIContent: async (prompt, type) => {
    set({ isLoading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ isLoading: false });
        resolve(
          `Generated content for: ${prompt}\n\nThis is a mock AI response for ${type}.`,
        );
      }, 1500);
    });
  },
}));
