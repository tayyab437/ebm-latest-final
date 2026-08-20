import { create } from 'zustand';
import { ExamView, Exam, Question, StudentAttempt, Certificate } from './exam.types';

interface ExamState {
  currentView: ExamView;
  setCurrentView: (view: ExamView) => void;
  exams: Exam[];
  questionBank: Question[];
  selectedExamId: string | null;
  setSelectedExamId: (id: string | null) => void;
  activeAttempt: StudentAttempt | null;
  certificates: Certificate[];
  isLoading: boolean;
  
  // Actions
  fetchExams: () => Promise<void>;
  fetchQuestionBank: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
  startExam: (examId: string) => Promise<void>;
  submitExam: (attemptId: string, answers: any) => Promise<void>;
  createExam: (examData: any) => Promise<void>;
  generateAIQuestions: (params: any) => Promise<void>;
}

export const useExamStore = create<ExamState>((set, get) => ({
  currentView: ExamView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  exams: [],
  questionBank: [],
  selectedExamId: null,
  setSelectedExamId: (id) => set({ selectedExamId: id }),
  activeAttempt: null,
  certificates: [],
  isLoading: false,

  fetchExams: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/exams");
      const data = await response.json();
      if (data.success) set({ exams: data.exams });
    } catch (error) {
      console.error("Failed to fetch exams", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchQuestionBank: async () => {
    try {
      const response = await fetch("/api/exams/question-bank");
      const data = await response.json();
      if (data.success) set({ questionBank: data.questions });
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  },

  fetchCertificates: async () => {
    try {
      const response = await fetch("/api/exams/certificates");
      const data = await response.json();
      if (data.success) set({ certificates: data.certificates });
    } catch (error) {
      console.error("Failed to fetch certificates", error);
    }
  },

  startExam: async (examId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/exams/${examId}/start`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        set({ activeAttempt: data.attempt, currentView: ExamView.PLAYER });
      }
    } catch (error) {
      console.error("Failed to start exam", error);
    } finally {
      set({ isLoading: false });
    }
  },

  submitExam: async (attemptId, answers) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/exams/attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await response.json();
      if (data.success) {
        set({ activeAttempt: null, currentView: ExamView.RESULTS });
        await get().fetchExams();
      }
    } catch (error) {
      console.error("Failed to submit exam", error);
    } finally {
      set({ isLoading: false });
    }
  },

  createExam: async (examData) => {
    try {
      const response = await fetch("/api/exams", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData)
      });
      const data = await response.json();
      if (data.success) await get().fetchExams();
    } catch (error) {
      console.error("Failed to create exam", error);
    }
  },

  generateAIQuestions: async (params) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/exams/generate-ai", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      if (data.success) {
        // AI logic would return generated questions to be added to bank or draft
        await get().fetchQuestionBank();
      }
    } catch (error) {
      console.error("Failed to generate AI questions", error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
