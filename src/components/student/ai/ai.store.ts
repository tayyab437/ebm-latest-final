import { create } from "zustand";
import { AIView } from "./ai.types";

interface AIState {
  currentView: AIView;
  setCurrentView: (view: AIView) => void;
  chatHistory: any[];
  addChatMessage: (msg: any) => void;
  setChatHistory: (history: any[] | ((prev: any[]) => any[])) => void;
  isAiLoading: boolean;
  setIsAiLoading: (loading: boolean) => void;
  pendingQuery: string | null;
  setPendingQuery: (query: string | null) => void;
}

export const useAIStore = create<AIState>((set) => ({
  currentView: AIView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  chatHistory: [
    { id: "1", role: "ai", content: "Hello! I'm your EBM AI Tutor. I have access to your learning profile and recent assessment results. How can I help you today?" }
  ],
  addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
  setChatHistory: (history) => set((state) => ({
    chatHistory: typeof history === "function" ? history(state.chatHistory) : history
  })),
  isAiLoading: false,
  setIsAiLoading: (loading) => set({ isAiLoading: loading }),
  pendingQuery: null,
  setPendingQuery: (query) => set({ pendingQuery: query }),
}));
