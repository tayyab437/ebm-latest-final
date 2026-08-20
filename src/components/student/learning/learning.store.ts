import { create } from "zustand";
import { LearningState, LearningView } from "./learning.types";

interface LearningStore extends LearningState {
  setView: (view: LearningView) => void;
  setSubject: (subjectId: string) => void;
  setLesson: (lessonId: string, unitId: string, subjectId: string) => void;
  toggleAssistant: () => void;
  setVideoTime: (time: number) => void;
}

export const useLearningStore = create<LearningStore>((set) => ({
  currentView: LearningView.DASHBOARD,
  currentSubjectId: null,
  currentUnitId: null,
  currentLessonId: null,
  videoPlaybackTime: 0,
  isAssistantOpen: false,
  notes: [],
  bookmarks: [],

  setView: (view) => set({ currentView: view }),
  setSubject: (subjectId) => set({ currentSubjectId: subjectId, currentView: LearningView.SUBJECT_DETAIL, currentUnitId: null, currentLessonId: null }),
  setLesson: (lessonId, unitId, subjectId) => set({ 
    currentLessonId: lessonId, 
    currentUnitId: unitId,
    currentSubjectId: subjectId,
    currentView: LearningView.LESSON_PLAYER 
  }),
  toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
  setVideoTime: (time) => set({ videoPlaybackTime: time }),
}));
