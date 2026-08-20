import { create } from "zustand";
import { AdminView, Admission, AdminStats, AuditLog, AdminStudent, AdminTeacher, AdminEmployee } from "./admin.types";

interface AdminState {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  stats: AdminStats;
  admissions: Admission[];
  students: any[];
  teachers: any[];
  employees: AdminEmployee[];
  auditLogs: AuditLog[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setAdmissions: (admissions: Admission[]) => void;
  setAuditLogs: (logs: AuditLog[]) => void;
  fetchStudents: () => Promise<void>;
  updateStudentDiagnostics: (studentId: string, unlockedDiagnostics: string[]) => Promise<void>;
  fetchTeachers: () => Promise<void>;
  addTeacher: (teacher: any) => Promise<boolean>;
  updateTeacher: (id: string, teacher: any) => Promise<boolean>;
  deleteTeacher: (id: string) => Promise<boolean>;
  fetchAuditLogs: () => Promise<void>;
  fetchAdmissions: () => Promise<void>;
  addAdmission: (admission: any) => Promise<boolean>;
  updateAdmission: (id: string, admission: any) => Promise<boolean>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  currentView: AdminView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  stats: {
    totalStudents: 1250,
    activeStudents: 1220,
    totalTeachers: 85,
    totalEmployees: 110,
    totalRevenue: "$1.2M",
    systemHealth: "HEALTHY",
  },
  admissions: [],
  students: [],
  teachers: [],
  employees: [
    { id: "emp_1", name: "John Doe", email: "john.d@ebm.edu", position: "IT Admin", department: "IT", status: "ACTIVE" },
    { id: "emp_2", name: "Jane Smith", email: "jane.s@ebm.edu", position: "Accountant", department: "Finance", status: "ACTIVE" },
  ],
  auditLogs: [
    {
      id: "log_1",
      userId: "admin_1",
      userName: "Ejaz Bukhari",
      action: "UPDATE_CURRICULUM",
      module: "Curriculum CMS",
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.1",
    },
  ],
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  setAdmissions: (admissions) => set({ admissions }),
  setAuditLogs: (logs) => set({ auditLogs: logs }),
  fetchStudents: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/teacher/students");
      const data = await res.json();
      if (data.success) {
        set({ students: data.students });
      }
    } catch (e) {
      console.error("Failed to fetch students in admin store:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  updateStudentDiagnostics: async (studentId, unlockedDiagnostics) => {
    try {
      const res = await fetch(`/api/teacher/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unlockedDiagnostics }),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          students: state.students.map((s) =>
            s.id === studentId ? { ...s, unlockedDiagnostics } : s
          ),
        }));
      }
    } catch (e) {
      console.error("Failed to update student diagnostics:", e);
    }
  },
  fetchTeachers: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/admin/teachers");
      const data = await res.json();
      if (data.success) {
        set((state) => ({ 
          teachers: data.teachers,
          stats: {
            ...state.stats,
            totalTeachers: data.teachers.length
          }
        }));
      }
    } catch (e) {
      console.error("Failed to fetch teachers in admin store:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  addTeacher: async (teacher) => {
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchTeachers();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to add teacher:", e);
      return false;
    }
  },
  updateTeacher: async (id, teacher) => {
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchTeachers();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to update teacher:", e);
      return false;
    }
  },
  deleteTeacher: async (id) => {
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchTeachers();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to delete teacher:", e);
      return false;
    }
  },
  fetchAuditLogs: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/admin/audit-logs");
      const data = await res.json();
      if (data.success) {
        // Map backend schema to frontend type
        const mappedLogs = data.logs.map((log: any) => ({
          id: log.id,
          userId: log.actor || "System",
          userName: log.actor || "System",
          action: log.action,
          module: log.role || "System",
          timestamp: log.timestamp,
          ipAddress: log.ip || "0.0.0.0",
        }));
        set({ auditLogs: mappedLogs });
      }
    } catch (e) {
      console.error("Failed to fetch audit logs:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAdmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/admin/admissions");
      const data = await res.json();
      if (data.success) {
        set({ admissions: data.admissions });
      }
    } catch (e) {
      console.error("Failed to fetch admissions:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  addAdmission: async (admission) => {
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admission),
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchAdmissions();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to add admission:", e);
      return false;
    }
  },
  updateAdmission: async (id, admission) => {
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admission),
      });
      const data = await res.json();
      if (data.success) {
        await get().fetchAdmissions();
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to update admission:", e);
      return false;
    }
  },
}));
