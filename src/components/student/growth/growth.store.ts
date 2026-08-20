import { create } from 'zustand';
import { 
  GrowthView, 
  GrowthProfile, 
  Badge, 
  Achievement, 
  Mission, 
  Habit, 
  CompetencyData, 
  PortfolioItem,
  GrowthEvent
} from './growth.types';

interface GrowthState {
  currentView: GrowthView;
  setCurrentView: (view: GrowthView) => void;
  profile: GrowthProfile | null;
  badges: Badge[];
  achievements: Achievement[];
  missions: Mission[];
  habits: Habit[];
  competencies: CompetencyData[];
  portfolio: PortfolioItem[];
  history: GrowthEvent[];
  isLoading: boolean;
  
  // Actions
  fetchGrowthData: () => Promise<void>;
  claimMissionReward: (missionId: string) => Promise<void>;
  logHabit: (habitId: string) => Promise<void>;
  addPortfolioItem: (item: Partial<PortfolioItem>) => Promise<void>;
  processGrowthEvent: (event: Partial<GrowthEvent>) => Promise<void>;
}

export const useGrowthStore = create<GrowthState>((set, get) => ({
  currentView: GrowthView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  profile: null,
  badges: [],
  achievements: [],
  missions: [],
  habits: [],
  competencies: [],
  portfolio: [],
  history: [],
  isLoading: false,

  fetchGrowthData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/growth/dashboard");
      const data = await response.json();
      if (data.success) {
        set({
          profile: data.profile,
          badges: data.badges,
          achievements: data.achievements,
          missions: data.missions,
          habits: data.habits,
          competencies: data.competencies,
          portfolio: data.portfolio,
          history: data.history,
        });
      }
    } catch (error) {
      console.error("Failed to fetch growth data", error);
    } finally {
      set({ isLoading: false });
    }
  },

  claimMissionReward: async (missionId) => {
    try {
      const response = await fetch(`/api/growth/missions/${missionId}/claim`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await get().fetchGrowthData();
      }
    } catch (error) {
      console.error("Failed to claim reward", error);
    }
  },

  logHabit: async (habitId) => {
    try {
      const response = await fetch(`/api/growth/habits/${habitId}/log`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await get().fetchGrowthData();
      }
    } catch (error) {
      console.error("Failed to log habit", error);
    }
  },

  addPortfolioItem: async (item) => {
    try {
      const response = await fetch("/api/growth/portfolio", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const data = await response.json();
      if (data.success) {
        await get().fetchGrowthData();
      }
    } catch (error) {
      console.error("Failed to add portfolio item", error);
    }
  },

  processGrowthEvent: async (event) => {
    try {
      const response = await fetch("/api/growth/events", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      if (data.success) {
        await get().fetchGrowthData();
      }
    } catch (error) {
      console.error("Failed to process growth event", error);
    }
  }
}));
