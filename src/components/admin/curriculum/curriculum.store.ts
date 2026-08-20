import { create } from "zustand";
import { CurriculumView, AcademicProgram, Subject, Lesson } from "./curriculum.types";

interface CurriculumState {
  currentView: CurriculumView;
  setCurrentView: (view: CurriculumView) => void;
  programs: AcademicProgram[];
  subjects: Subject[];
  lessons: Lesson[];
  isLoading: boolean;
  setPrograms: (programs: AcademicProgram[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setLessons: (lessons: Lesson[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCurriculumStore = create<CurriculumState>((set) => ({
  currentView: CurriculumView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  programs: [
    {
      id: "prog_1",
      name: "EBM Accelerated Program",
      description: "Complete Grade 5 to O Level in 3 years",
      duration: "3 Years",
      targetAudience: "Grades 5-11",
      status: "PUBLISHED",
      version: "1.0",
      language: "English",
      createdAt: new Date().toISOString(),
    }
  ],
  subjects: [
    {
      id: "subj_1",
      programId: "prog_1",
      code: "PHY-5054",
      name: "O Level Physics",
      description: "Cambridge O Level Physics 5054",
      difficulty: "ADVANCED",
      recommendedAge: "14-16",
      estimatedHours: 120,
      status: "PUBLISHED",
      version: "1.2",
    }
  ],
  lessons: [],
  isLoading: false,
  setPrograms: (programs) => set({ programs }),
  setSubjects: (subjects) => set({ subjects }),
  setLessons: (lessons) => set({ lessons }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
