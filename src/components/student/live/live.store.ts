import { create } from "zustand";
import { 
  LiveView, 
  LiveClass, 
  AttendanceRecord, 
  ClassResource, 
  AISummary,
  LiveStats 
} from "./live.types";

interface LiveState {
  currentView: LiveView;
  setCurrentView: (view: LiveView) => void;
  selectedClassId: string | null;
  setSelectedClassId: (id: string | null) => void;
  classes: LiveClass[];
  attendance: AttendanceRecord[];
  resources: ClassResource[];
  summaries: AISummary[];
  stats: LiveStats;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  workspaceUser: any | null;
  workspaceToken: string | null;
  setWorkspaceAuth: (user: any, token: string | null) => void;
  fetchClasses: () => Promise<void>;
  fetchStats: () => Promise<void>;
  joinClass: (classId: string, studentId: string) => Promise<void>;
  createClassWithMeet: (classData: any) => Promise<void>;
}

export const useLiveStore = create<LiveState>((set, get) => ({
  currentView: LiveView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  selectedClassId: null,
  setSelectedClassId: (id) => set({ selectedClassId: id }),
  classes: [],
  attendance: [],
  resources: [],
  summaries: [],
  stats: {
    totalClasses: 0,
    attendanceRate: 0,
    homeworkCompletion: 0,
    participationScore: 0,
  },
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  workspaceUser: null,
  workspaceToken: null,
  setWorkspaceAuth: (user, token) => set({ workspaceUser: user, workspaceToken: token }),
  
  fetchClasses: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/live/classes");
      const data = await response.json();
      if (data.success) set({ classes: data.classes });
    } catch (error) {
      console.error("Failed to fetch live classes", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const response = await fetch("/api/live/stats");
      const data = await response.json();
      if (data.success) set({ stats: data.stats });
    } catch (error) {
      console.error("Failed to fetch live stats", error);
    }
  },

  joinClass: async (classId, studentId) => {
    try {
      await fetch("/api/live/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, studentProfileId: studentId, status: "PRESENT", joinTime: new Date().toISOString() })
      });
    } catch (error) {
      console.error("Failed to record attendance", error);
    }
  },

  createClassWithMeet: async (classData) => {
    const { workspaceToken } = get();
    if (!workspaceToken) {
      console.error("No workspace token available");
      return;
    }

    set({ isLoading: true });
    try {
      // 1. Create Meet Space
      const meetResult = await fetch('https://meet.googleapis.com/v2/spaces', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${workspaceToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
      });

      if (!meetResult.ok) throw new Error("Failed to create Meet space");
      const meetData = await meetResult.json();
      
      // 2. Save to our backend
      const response = await fetch("/api/live/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...classData,
          meetLink: meetData.meetingUri,
        })
      });

      const data = await response.json();
      if (data.success) {
        await get().fetchClasses();
      }
    } catch (error) {
      console.error("Failed to create class with Meet", error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
