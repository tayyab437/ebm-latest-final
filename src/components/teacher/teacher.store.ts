import { create } from "zustand";
import {
  TeacherView,
  TeacherClass,
  TeacherStudent,
  TeacherAssignment,
  TeacherAttendance,
} from "./teacher.types";

const DEFAULT_CLASSES: TeacherClass[] = [];

const DEFAULT_STUDENTS: TeacherStudent[] = [];

const DEFAULT_ASSIGNMENTS: TeacherAssignment[] = [];

function loadLocalClasses(): TeacherClass[] {
  const cached = localStorage.getItem("ebm_teacher_classes_cache");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return DEFAULT_CLASSES;
}

function loadLocalStudents(): TeacherStudent[] {
  const cached = localStorage.getItem("ebm_teacher_students_cache");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return parsed.map((s: any) => ({
        ...s,
        classIds: typeof s.classIds === 'string' ? JSON.parse(s.classIds) : (s.classIds || [])
      }));
    } catch (e) {}
  }
  return DEFAULT_STUDENTS;
}

function loadLocalAssignments(): TeacherAssignment[] {
  const cached = localStorage.getItem("ebm_teacher_assignments_cache");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return DEFAULT_ASSIGNMENTS;
}

function loadLocalAttendance(): TeacherAttendance[] {
  const cached = localStorage.getItem("ebm_teacher_attendance_cache");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return [];
}

interface TeacherState {
  currentView: TeacherView;
  setCurrentView: (view: TeacherView) => void;
  classes: TeacherClass[];
  students: TeacherStudent[];
  assignments: TeacherAssignment[];
  isLoading: boolean;
  setClasses: (classes: TeacherClass[]) => void;
  setStudents: (students: TeacherStudent[]) => void;
  setAssignments: (assignments: TeacherAssignment[]) => void;
  setLoading: (loading: boolean) => void;
  fetchClasses: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  createClass: (newClass: Omit<TeacherClass, "id" | "studentCount" | "status">) => Promise<boolean>;
  updateClass: (id: string, updates: Partial<TeacherClass>) => Promise<boolean>;
  deleteClass: (id: string) => Promise<boolean>;
  createStudent: (newStudent: Omit<TeacherStudent, "id" | "performanceScore" | "attendanceRate" | "riskStatus" | "lastActive">) => Promise<boolean>;
  updateStudent: (id: string, updates: Partial<TeacherStudent>) => Promise<boolean>;
  deleteStudent: (id: string) => Promise<boolean>;
  createAssignment: (newAssignment: Omit<TeacherAssignment, "id" | "submissionCount" | "status" | "totalStudents">) => Promise<boolean>;
  updateAssignment: (id: string, updates: Partial<TeacherAssignment>) => Promise<boolean>;
  deleteAssignment: (id: string) => Promise<boolean>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  attendance: TeacherAttendance[];
  fetchAttendance: () => Promise<void>;
  submitAttendance: (
    classId: string,
    date: string,
    statuses: { [studentId: string]: "PRESENT" | "ABSENT" | "TARDY" },
    notes?: { [studentId: string]: string }
  ) => Promise<boolean>;
}

export const useTeacherStore = create<TeacherState>((set, get) => ({
  currentView: TeacherView.DASHBOARD,
  setCurrentView: (view) => set({ currentView: view }),
  classes: loadLocalClasses(),
  students: loadLocalStudents(),
  assignments: loadLocalAssignments(),
  attendance: loadLocalAttendance(),
  isLoading: false,
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setClasses: (classes) => {
    localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(classes));
    set({ classes });
  },

  setStudents: async (students) => {
    const parsedStudents = students.map((s: any) => ({
      ...s,
      classIds: Array.isArray(s.classIds) ? s.classIds : (typeof s.classIds === 'string' ? JSON.parse(s.classIds) : (s.classIds || []))
    }));
    localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(parsedStudents));
    set({ students: parsedStudents });
    try {
      await fetch("/api/teacher/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: parsedStudents }),
      });
    } catch (e) {
      console.warn("Failed to sync students to backend, saved locally:", e);
    }
  },

  setAssignments: async (assignments) => {
    localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(assignments));
    set({ assignments });
    try {
      await fetch("/api/teacher/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignments }),
      });
    } catch (e) {
      console.warn("Failed to sync assignments to backend, saved locally:", e);
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  fetchClasses: async () => {
    try {
      const response = await fetch("/api/teacher/classes");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.classes) {
          localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(data.classes));
          set({ classes: data.classes });
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch teacher classes from server, using local storage:", e);
    }
    set({ classes: loadLocalClasses() });
  },

  fetchStudents: async () => {
    try {
      const response = await fetch("/api/teacher/students");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.students) {
          const parsedStudents = data.students.map((s: any) => ({
            ...s,
            classIds: Array.isArray(s.classIds) ? s.classIds : (typeof s.classIds === 'string' ? JSON.parse(s.classIds) : [])
          }));
          localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(parsedStudents));
          set({ students: parsedStudents });
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch students from server, using local storage:", e);
    }
    set({ students: loadLocalStudents() });
  },

  fetchAssignments: async () => {
    try {
      const response = await fetch("/api/teacher/assignments");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.assignments) {
          localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(data.assignments));
          set({ assignments: data.assignments });
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch assignments from server, using local storage:", e);
    }
    set({ assignments: loadLocalAssignments() });
  },

  fetchAttendance: async () => {
    try {
      const response = await fetch("/api/teacher/attendance");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.attendance) {
          localStorage.setItem("ebm_teacher_attendance_cache", JSON.stringify(data.attendance));
          set({ attendance: data.attendance });
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch attendance from server, using local storage:", e);
    }
    set({ attendance: loadLocalAttendance() });
  },

  submitAttendance: async (classId, date, statuses, notes) => {
    const tempId = "att_" + Date.now();
    const newRecord: TeacherAttendance = {
      id: tempId,
      classId,
      date,
      statuses,
      notes,
      submittedAt: new Date().toISOString(),
    };

    const filteredAttendance = get().attendance.filter(
      (r) => !(r.classId === classId && r.date === date)
    );
    const updatedAttendance = [...filteredAttendance, newRecord];

    localStorage.setItem("ebm_teacher_attendance_cache", JSON.stringify(updatedAttendance));
    set({ attendance: updatedAttendance });

    try {
      const response = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.record) {
          const serverRecord: TeacherAttendance = data.record;
          const finalAttendance = get().attendance.map((r) =>
            r.id === tempId ? serverRecord : r
          );
          localStorage.setItem("ebm_teacher_attendance_cache", JSON.stringify(finalAttendance));
          set({ attendance: finalAttendance });
          
          get().fetchStudents();
          return true;
        }
      }
    } catch (e) {
      console.warn("Failed to submit attendance to server, saved locally:", e);
    }
    return true;
  },

  createClass: async (newClassData) => {
    const tempId = "class_" + Date.now();
    const newClass: TeacherClass = {
      ...newClassData,
      id: tempId,
      studentCount: 0,
      status: "ACTIVE"
    };

    const updatedClasses = [...get().classes, newClass];
    localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(updatedClasses));
    set({ classes: updatedClasses });

    try {
      const response = await fetch("/api/teacher/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClassData)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.class) {
          const serverClass: TeacherClass = data.class;
          const finalClasses = get().classes.map(c => c.id === tempId ? serverClass : c);
          localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(finalClasses));
          set({ classes: finalClasses });
          return true;
        }
      }
    } catch (e) {
      console.warn("Failed to persist new class to backend, saved locally:", e);
    }
    return true;
  },

  updateClass: async (id, updates) => {
    const updatedClasses = get().classes.map(c => c.id === id ? { ...c, ...updates } : c);
    localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(updatedClasses));
    set({ classes: updatedClasses });

    try {
      const response = await fetch(`/api/teacher/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.class) {
          const finalClasses = get().classes.map(c => c.id === id ? data.class : c);
          localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(finalClasses));
          set({ classes: finalClasses });
        }
        return true;
      }
    } catch (e) {
      console.warn("Failed to persist class updates to backend, saved locally:", e);
    }
    return true;
  },

  deleteClass: async (id) => {
    const updatedClasses = get().classes.filter(c => c.id !== id);
    localStorage.setItem("ebm_teacher_classes_cache", JSON.stringify(updatedClasses));
    set({ classes: updatedClasses });

    try {
      const response = await fetch(`/api/teacher/classes/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.warn("Failed to delete class from backend, deleted locally:", e);
    }
    return true;
  },

  createStudent: async (newStudentData) => {
    const tempId = "stu_" + Date.now();
    const newStudent: TeacherStudent = {
      id: tempId,
      name: newStudentData.name,
      email: newStudentData.email,
      gradeLevel: newStudentData.gradeLevel,
      classIds: newStudentData.classIds || [],
      performanceScore: 80,
      attendanceRate: 100,
      riskStatus: "LOW",
      lastActive: new Date().toISOString()
    };

    const updatedStudents = [...get().students, newStudent];
    localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(updatedStudents));
    set({ students: updatedStudents });

    try {
      const response = await fetch("/api/teacher/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudentData)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.student) {
          const serverStudent: TeacherStudent = data.student;
          const finalStudents = get().students.map(s => s.id === tempId ? serverStudent : s);
          localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(finalStudents));
          set({ students: finalStudents });
          return true;
        }
      }
    } catch (e) {
      console.warn("Failed to persist new student to backend, saved locally:", e);
    }
    return true;
  },

  updateStudent: async (id, updates) => {
    const updatedStudents = get().students.map(s => s.id === id ? { ...s, ...updates } : s);
    localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(updatedStudents));
    set({ students: updatedStudents });

    try {
      const response = await fetch(`/api/teacher/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.student) {
          const finalStudents = get().students.map(s => s.id === id ? data.student : s);
          localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(finalStudents));
          set({ students: finalStudents });
        }
        return true;
      }
    } catch (e) {
      console.warn("Failed to persist student updates to backend, saved locally:", e);
    }
    return true;
  },

  deleteStudent: async (id) => {
    const updatedStudents = get().students.filter(s => s.id !== id);
    localStorage.setItem("ebm_teacher_students_cache", JSON.stringify(updatedStudents));
    set({ students: updatedStudents });

    try {
      const response = await fetch(`/api/teacher/students/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.warn("Failed to delete student from backend, deleted locally:", e);
    }
    return true;
  },

  createAssignment: async (newAssignmentData) => {
    const tempId = "asn_" + Date.now();
    
    // Calculate total students in the selected class for this assignment
    const classStudents = get().students.filter(s => (s.classIds || []).includes(newAssignmentData.classId));
    const totalStudentsCount = classStudents.length;

    const newAssignment: TeacherAssignment = {
      ...newAssignmentData,
      id: tempId,
      status: "PUBLISHED",
      submissionCount: 0,
      totalStudents: totalStudentsCount
    };

    const updatedAssignments = [...get().assignments, newAssignment];
    localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(updatedAssignments));
    set({ assignments: updatedAssignments });

    try {
      const response = await fetch("/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignmentData)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.assignment) {
          const serverAssignment: TeacherAssignment = data.assignment;
          const finalAssignments = get().assignments.map(a => a.id === tempId ? serverAssignment : a);
          localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(finalAssignments));
          set({ assignments: finalAssignments });
          return true;
        }
      }
    } catch (e) {
      console.warn("Failed to persist new assignment to backend, saved locally:", e);
    }
    return true;
  },

  updateAssignment: async (id, updates) => {
    const updatedAssignments = get().assignments.map(a => a.id === id ? { ...a, ...updates } : a);
    localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(updatedAssignments));
    set({ assignments: updatedAssignments });

    try {
      const response = await fetch(`/api/teacher/assignments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.assignment) {
          const finalAssignments = get().assignments.map(a => a.id === id ? data.assignment : a);
          localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(finalAssignments));
          set({ assignments: finalAssignments });
        }
        return true;
      }
    } catch (e) {
      console.warn("Failed to persist assignment updates to server, saved locally:", e);
    }
    return true;
  },

  deleteAssignment: async (id) => {
    const updatedAssignments = get().assignments.filter(a => a.id !== id);
    localStorage.setItem("ebm_teacher_assignments_cache", JSON.stringify(updatedAssignments));
    set({ assignments: updatedAssignments });

    try {
      const response = await fetch(`/api/teacher/assignments/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.warn("Failed to delete assignment from server, deleted locally:", e);
    }
    return true;
  }
}));
