import { create } from "zustand";
import {
  RiskLevel,
  CaseStatus,
  CasePriority,
  StudentRiskProfile,
  InterventionCase,
  ActionPlan,
  TeacherObservation,
  ParentMeeting,
  StudentReferral,
  ProgressHistoryEntry,
} from "./student-success.types";

interface StudentSuccessState {
  currentView:
    | "dashboard"
    | "risk-analysis"
    | "cases"
    | "interventions"
    | "action-plans"
    | "observations"
    | "meetings"
    | "referrals"
    | "progress"
    | "ai-assistant"
    | "student-profile";
  activeStudentId: string | null;
  riskProfiles: StudentRiskProfile[];
  activeCases: InterventionCase[];
  recentObservations: TeacherObservation[];
  upcomingMeetings: ParentMeeting[];
  actionPlans: ActionPlan[];
  referrals: StudentReferral[];
  progressHistories: ProgressHistoryEntry[];
  isLoading: boolean;

  setCurrentView: (view: StudentSuccessState["currentView"]) => void;
  setActiveStudent: (id: string | null) => void;

  fetchDashboardData: () => Promise<void>;
  createCase: (data: Partial<InterventionCase>) => Promise<void>;
  generateAIAnalysis: (studentId: string) => Promise<string>;

  createActionPlan: (plan: Partial<ActionPlan>) => void;
  toggleTask: (planId: string, taskId: string) => void;
  addObservation: (observation: Partial<TeacherObservation>) => void;
  scheduleMeeting: (meeting: Partial<ParentMeeting>) => void;
  createReferral: (referral: Partial<StudentReferral>) => void;
}

const mockRiskProfiles: StudentRiskProfile[] = [
  {
    studentId: "s1",
    studentName: "Alex Mercer",
    grade: "Grade 8",
    riskLevel: RiskLevel.HIGH_RISK,
    riskScore: 78,
    academicScore: 65,
    attendanceScore: 82,
    engagementScore: 40,
    behaviorScore: 90,
    lastUpdated: new Date().toISOString(),
    criticalAlerts: [
      "Missed 3 consecutive physics assignments",
      "AI Engagement dropped by 45%",
    ],
  },
  {
    studentId: "s2",
    studentName: "Emma Watson",
    grade: "Grade 8",
    riskLevel: RiskLevel.MODERATE_RISK,
    riskScore: 45,
    academicScore: 85,
    attendanceScore: 95,
    engagementScore: 70,
    behaviorScore: 88,
    lastUpdated: new Date().toISOString(),
    criticalAlerts: ["Struggling with advanced algebra concepts"],
  },
];

const mockCases: InterventionCase[] = [
  {
    id: "c1",
    studentId: "s1",
    studentName: "Alex Mercer",
    title: "Physics Assignment Drop-off",
    description: "Student has missed 3 assignments in a row.",
    type: "ACADEMIC",
    status: CaseStatus.OPEN,
    priority: CasePriority.HIGH,
    owner: { id: "t1", name: "Dr. Sarah Jenkins", role: "Subject Head" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["Physics", "Assignments", "Engagement"],
  },
];

const mockActionPlans: ActionPlan[] = [
  {
    id: "ap1",
    caseId: "c1",
    title: "Physics Mastery & Attendance Boost Plan",
    description: "Targeted support plan to recover missed tasks and improve engagement in Science class.",
    goals: [
      "Submit all overdue physics assignments by end of week",
      "Increase engagement score back above 75%",
      "Schedule at least one counselor check-in"
    ],
    tasks: [
      {
        id: "apt1",
        title: "Resubmit overdue assignments (Physics homework #3 & #4)",
        assignee: { id: "s1", name: "Alex Mercer", role: "STUDENT" },
        dueDate: "2026-07-16",
        isCompleted: false
      },
      {
        id: "apt2",
        title: "Attend peer tutoring session in Physics Lab",
        assignee: { id: "s1", name: "Alex Mercer", role: "STUDENT" },
        dueDate: "2026-07-18",
        isCompleted: true
      },
      {
        id: "apt3",
        title: "Conduct progress review meeting",
        assignee: { id: "t1", name: "Dr. Sarah Jenkins", role: "TEACHER" },
        dueDate: "2026-07-22",
        isCompleted: false
      }
    ],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    targetDate: "2026-07-25"
  }
];

const mockObservations: TeacherObservation[] = [
  {
    id: "ob1",
    studentId: "s1",
    teacherId: "t1",
    teacherName: "Dr. Sarah Jenkins",
    category: "ACADEMIC",
    observation: "Alex didn't turn in the electricity worksheet and was unresponsive when asked for virtual workspace updates.",
    date: "2026-07-08",
    impactLevel: "CONCERNING"
  },
  {
    id: "ob2",
    studentId: "s1",
    teacherId: "t2",
    teacherName: "Prof. Tariq Mahmood",
    category: "BEHAVIOR",
    observation: "Distracted during group algebra exercises, but showed great effort in 1-on-1 coaching at the end of class.",
    date: "2026-07-10",
    impactLevel: "NEUTRAL"
  },
  {
    id: "ob3",
    studentId: "s2",
    teacherId: "t3",
    teacherName: "Miss Sadia Jamil",
    category: "ACADEMIC",
    observation: "Emma wrote an exceptionally insightful literary analysis on Lord of the Flies. Highly active peer reviews.",
    date: "2026-07-09",
    impactLevel: "POSITIVE"
  }
];

const mockMeetings: ParentMeeting[] = [
  {
    id: "pm1",
    studentId: "s1",
    title: "Alex Mercer: Academic Review & Action Plan Alignment",
    date: "2026-07-20 at 4:30 PM",
    type: "ONLINE",
    status: "SCHEDULED",
    participants: [
      { id: "p1", name: "Mrs. Mercer (Parent)", role: "PARENT" },
      { id: "t1", name: "Dr. Sarah Jenkins", role: "TEACHER" }
    ],
    notes: "Review the electricity homework gaps and set clear routines for virtual tutor assistance.",
    actionItems: ["Parent to monitor homework completion daily", "Teacher to provide additional practice sets"]
  }
];

const mockReferrals: StudentReferral[] = [
  {
    id: "ref1",
    studentId: "s1",
    studentName: "Alex Mercer",
    referredTo: "Counseling Dept",
    reason: "Severe academic fatigue and drop in engagement scores. Needs support with time management.",
    status: "ACCEPTED",
    date: "2026-07-09"
  }
];

const mockProgressHistory: ProgressHistoryEntry[] = [
  { studentId: "s1", week: "Week 1", academicScore: 78, attendanceScore: 90, engagementScore: 80 },
  { studentId: "s1", week: "Week 2", academicScore: 74, attendanceScore: 88, engagementScore: 68 },
  { studentId: "s1", week: "Week 3", academicScore: 70, attendanceScore: 85, engagementScore: 50 },
  { studentId: "s1", week: "Week 4", academicScore: 65, attendanceScore: 82, engagementScore: 40 },
  { studentId: "s2", week: "Week 1", academicScore: 80, attendanceScore: 94, engagementScore: 68 },
  { studentId: "s2", week: "Week 2", academicScore: 82, attendanceScore: 95, engagementScore: 70 },
  { studentId: "s2", week: "Week 3", academicScore: 85, attendanceScore: 95, engagementScore: 72 },
  { studentId: "s2", week: "Week 4", academicScore: 85, attendanceScore: 95, engagementScore: 70 }
];

export const useStudentSuccessStore = create<StudentSuccessState>((set, get) => ({
  currentView: "dashboard",
  activeStudentId: "s1",
  riskProfiles: mockRiskProfiles,
  activeCases: mockCases,
  recentObservations: mockObservations,
  upcomingMeetings: mockMeetings,
  actionPlans: mockActionPlans,
  referrals: mockReferrals,
  progressHistories: mockProgressHistory,
  isLoading: false,

  setCurrentView: (view) => set({ currentView: view }),
  setActiveStudent: (id) => set({ activeStudentId: id }),

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/teacher/students");
      const data = await res.json();
      if (data.success && Array.isArray(data.students)) {
        const dbStudents = data.students;
        
        // Map actual db students to student risk profiles
        const mappedProfiles = dbStudents.map((s: any) => {
          let riskLevel = RiskLevel.LOW_RISK;
          const statusUpper = (s.riskStatus || "LOW").toUpperCase();
          if (statusUpper.includes("CRIT")) {
            riskLevel = RiskLevel.CRITICAL;
          } else if (statusUpper.includes("HIGH")) {
            riskLevel = RiskLevel.HIGH_RISK;
          } else if (statusUpper.includes("MEDIUM") || statusUpper.includes("MODER") || statusUpper.includes("MED")) {
            riskLevel = RiskLevel.MODERATE_RISK;
          } else if (statusUpper.includes("EXCELLENT")) {
            riskLevel = RiskLevel.EXCELLENT;
          }

          const performance = s.performanceScore ?? 80;
          const attendance = s.attendanceRate ?? 100;
          
          let riskScore = 15;
          if (riskLevel === RiskLevel.CRITICAL) {
            riskScore = Math.min(99, Math.max(85, 100 - performance + (100 - attendance)));
          } else if (riskLevel === RiskLevel.HIGH_RISK) {
            riskScore = Math.min(84, Math.max(70, 100 - performance + (100 - attendance)));
          } else if (riskLevel === RiskLevel.MODERATE_RISK) {
            riskScore = Math.min(69, Math.max(40, 100 - performance));
          } else if (riskLevel === RiskLevel.LOW_RISK) {
            riskScore = Math.min(39, Math.max(10, 100 - performance));
          } else {
            riskScore = Math.min(9, Math.max(1, 100 - performance));
          }

          const criticalAlerts: string[] = [];
          if (performance < 75) {
            criticalAlerts.push(`Academic performance is lagging (${performance}%)`);
          }
          if (attendance < 90) {
            criticalAlerts.push(`Attendance rate dropped below standard (${attendance}%)`);
          }
          if (riskLevel === RiskLevel.CRITICAL || riskLevel === RiskLevel.HIGH_RISK) {
            if (criticalAlerts.length === 0) {
              criticalAlerts.push("Flagged for priority behavioral or engagement review");
            }
          }

          return {
            studentId: s.id,
            studentName: s.name,
            grade: s.gradeLevel || "Grade 10",
            riskLevel,
            riskScore,
            academicScore: performance,
            attendanceScore: attendance,
            engagementScore: Math.round((performance + attendance) / 2),
            behaviorScore: riskLevel === RiskLevel.CRITICAL ? 72 : (riskLevel === RiskLevel.HIGH_RISK ? 80 : 92),
            lastUpdated: s.lastActive || new Date().toISOString(),
            criticalAlerts,
          };
        });

        // Generate consistent cases, action plans, observations, meetings, referrals, and histories for these active students
        const generatedCases: InterventionCase[] = [];
        const generatedPlans: ActionPlan[] = [];
        const generatedObservations: TeacherObservation[] = [];
        const generatedMeetings: ParentMeeting[] = [];
        const generatedReferrals: StudentReferral[] = [];
        const generatedHistories: ProgressHistoryEntry[] = [];

        dbStudents.forEach((s: any) => {
          const profile = mappedProfiles.find((p: any) => p.studentId === s.id);
          if (!profile) return;

          // 1. Weekly Progress histories
          for (let weekNum = 1; weekNum <= 4; weekNum++) {
            const performance = s.performanceScore ?? 80;
            const attendance = s.attendanceRate ?? 100;
            generatedHistories.push({
              studentId: s.id,
              week: `Week ${weekNum}`,
              academicScore: Math.max(40, Math.min(100, weekNum === 4 ? performance : performance + (weekNum - 3) * 3)),
              attendanceScore: Math.max(40, Math.min(100, weekNum === 4 ? attendance : attendance + (weekNum - 3) * 2)),
              engagementScore: Math.max(40, Math.min(100, Math.round((performance + attendance) / 2) + (weekNum - 3) * 1)),
            });
          }

          // 2. High/Critical Risk Students Cases
          if (profile.riskLevel === RiskLevel.HIGH_RISK || profile.riskLevel === RiskLevel.CRITICAL) {
            const caseId = `c_${s.id}`;
            const planId = `ap_${s.id}`;

            generatedCases.push({
              id: caseId,
              studentId: s.id,
              studentName: s.name,
              title: "Academic Engagement Drop-off",
              description: `A systematic drop in academic performance (${profile.academicScore}%) and student participation in virtual diagnostic exercises.`,
              type: "ACADEMIC",
              status: CaseStatus.OPEN,
              priority: profile.riskLevel === RiskLevel.CRITICAL ? CasePriority.URGENT : CasePriority.HIGH,
              owner: { id: "tea_1", name: "Dr. Arshad Khan", role: "Senior Physics Instructor" },
              createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ["Urgent Intervention", "Milestones Recovery"],
            });

            generatedPlans.push({
              id: planId,
              caseId: caseId,
              title: "Milestone Restoration Action Plan",
              description: "Targeted support to recover diagnostic modules and improve daily engagement scores.",
              goals: [
                "Improve daily study streak count to at least 5 days",
                "Attend mandatory teacher 1-on-1 coaching session",
                "Complete outstanding diagnostic assessment tasks",
              ],
              tasks: [
                {
                  id: `apt_1_${s.id}`,
                  title: "Submit overdue accelerated physics/math worksheets",
                  assignee: { id: s.id, name: s.name, role: "STUDENT" },
                  dueDate: "2026-07-16",
                  isCompleted: false,
                },
                {
                  id: `apt_2_${s.id}`,
                  title: "Log into EBM AI study-buddy diagnostic simulator",
                  assignee: { id: s.id, name: s.name, role: "STUDENT" },
                  dueDate: "2026-07-18",
                  isCompleted: true,
                },
                {
                  id: `apt_3_${s.id}`,
                  title: "Conduct 1-on-1 performance audit meeting",
                  assignee: { id: "tea_1", name: "Dr. Arshad Khan", role: "TEACHER" },
                  dueDate: "2026-07-20",
                  isCompleted: false,
                },
              ],
              status: "ACTIVE",
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              targetDate: "2026-07-25",
            });

            generatedObservations.push({
              id: `obs_high_${s.id}`,
              studentId: s.id,
              teacherId: "tea_1",
              teacherName: "Dr. Arshad Khan",
              category: "ACADEMIC",
              observation: `${s.name} struggled to complete the virtual electricity worksheet. Showed lower responsiveness in daily forum challenges but completed a 1-on-1 zoom catch-up nicely.`,
              date: "2026-07-10",
              impactLevel: "CONCERNING",
            });

            generatedMeetings.push({
              id: `meet_high_${s.id}`,
              studentId: s.id,
              title: `${s.name}: Study Hours Alignment & Performance Audit`,
              date: "2026-07-20 at 4:30 PM",
              type: "ONLINE",
              status: "SCHEDULED",
              participants: [
                { id: `parent_${s.id}`, name: s.parentEmail ? `Parent (${s.parentEmail})` : `Guardian`, role: "PARENT" },
                { id: "tea_1", name: "Dr. Arshad Khan", role: "TEACHER" },
              ],
              notes: "Address the recent learning gaps and design specific study hours.",
              actionItems: ["Monitor daily streak", "Ensure login to tutor applet"],
            });

            generatedReferrals.push({
              id: `ref_high_${s.id}`,
              studentId: s.id,
              studentName: s.name,
              referredTo: "EBM Academic Counseling Cell",
              reason: "Requires urgent assistance with study schedules, cognitive stamina, and motivation frameworks.",
              status: "PENDING",
              date: "2026-07-11",
            });
          } else {
            // Low/Moderate Risk or Excellent student data to populate the views
            generatedObservations.push({
              id: `obs_low_${s.id}`,
              studentId: s.id,
              teacherId: "tea_1",
              teacherName: "Dr. Arshad Khan",
              category: "ACADEMIC",
              observation: `${s.name} is performing superbly in accelerated lessons. Completed the recent CIE exam simulation successfully.`,
              date: "2026-07-12",
              impactLevel: "POSITIVE",
            });
          }
        });

        const activeStudentId = get().activeStudentId;
        const validActiveStudentId = mappedProfiles.some((p: any) => p.studentId === activeStudentId)
          ? activeStudentId
          : (mappedProfiles.length > 0 ? mappedProfiles[0].studentId : null);

        set({
          riskProfiles: mappedProfiles,
          activeCases: generatedCases,
          actionPlans: generatedPlans,
          recentObservations: generatedObservations,
          upcomingMeetings: generatedMeetings,
          referrals: generatedReferrals,
          progressHistories: generatedHistories,
          activeStudentId: validActiveStudentId,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      console.error("Failed to fetch actual student data for success hub:", e);
      set({ isLoading: false });
    }
  },

  createCase: async (data) => {
    const newCase: InterventionCase = {
      id: "c_" + Date.now(),
      studentId: data.studentId || "s1",
      studentName: data.studentName || "Alex Mercer",
      title: data.title || "Academic Support",
      description: data.description || "Required extra intervention.",
      type: data.type || "ACADEMIC",
      status: data.status || CaseStatus.OPEN,
      priority: data.priority || CasePriority.MEDIUM,
      owner: data.owner || { id: "t1", name: "Dr. Sarah Jenkins", role: "Teacher" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || ["Support"]
    };
    set((state) => ({
      activeCases: [newCase, ...state.activeCases]
    }));
  },

  createActionPlan: (plan) => {
    const newPlan: ActionPlan = {
      id: "ap_" + Date.now(),
      caseId: plan.caseId || "c1",
      title: plan.title || "Custom Intervention Plan",
      description: plan.description || "A custom plan tailored to student goals.",
      goals: plan.goals || ["Improve daily engagement", "Complete study units"],
      tasks: plan.tasks || [],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      targetDate: plan.targetDate || "2026-08-01"
    };
    set((state) => ({
      actionPlans: [newPlan, ...state.actionPlans]
    }));
  },

  toggleTask: (planId, taskId) => {
    set((state) => {
      const updatedPlans = state.actionPlans.map((plan) => {
        if (plan.id === planId) {
          const updatedTasks = plan.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
          });
          return { ...plan, tasks: updatedTasks };
        }
        return plan;
      });
      return { actionPlans: updatedPlans };
    });
  },

  addObservation: (observation) => {
    const newObs: TeacherObservation = {
      id: "ob_" + Date.now(),
      studentId: observation.studentId || "s1",
      teacherId: "t1",
      teacherName: observation.teacherName || "Dr. Sarah Jenkins",
      category: observation.category || "ACADEMIC",
      observation: observation.observation || "",
      date: new Date().toISOString().split("T")[0],
      impactLevel: observation.impactLevel || "NEUTRAL"
    };
    set((state) => ({
      recentObservations: [newObs, ...state.recentObservations]
    }));
  },

  scheduleMeeting: (meeting) => {
    const newMeeting: ParentMeeting = {
      id: "pm_" + Date.now(),
      studentId: meeting.studentId || "s1",
      title: meeting.title || "Parent Advisory Chat",
      date: meeting.date || "2026-07-25 at 2:00 PM",
      type: meeting.type || "ONLINE",
      status: "SCHEDULED",
      participants: meeting.participants || [
        { id: "p1", name: "Parent Liaison", role: "LIAISON" }
      ],
      notes: meeting.notes || "",
      actionItems: meeting.actionItems || []
    };
    set((state) => ({
      upcomingMeetings: [newMeeting, ...state.upcomingMeetings]
    }));
  },

  createReferral: (referral) => {
    const newRef: StudentReferral = {
      id: "ref_" + Date.now(),
      studentId: referral.studentId || "s1",
      studentName: referral.studentName || "Alex Mercer",
      referredTo: referral.referredTo || "Counseling Dept",
      reason: referral.reason || "General support needed",
      status: "PENDING",
      date: new Date().toISOString().split("T")[0]
    };
    set((state) => ({
      referrals: [newRef, ...state.referrals]
    }));
  },

  generateAIAnalysis: async (studentId) => {
    set({ isLoading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ isLoading: false });
        const name = studentId === "s1" ? "Alex Mercer" : "Emma Watson";
        resolve(
          `AI SUCCESS REPORT FOR ${name.toUpperCase()}\n\n` +
          `1. RISK TRIGGERS DETECTED\n` +
          `• Immediate attention needed in evening virtual classroom sessions.\n` +
          `• Assignment drop-off in Science/Mathematics tracks has lowered overall projection metrics.\n\n` +
          `2. PREDICTIVE OUTCOME METRIC\n` +
          `• Without targeted micro-assignments, there is a 65% probability of course completion delays.\n\n` +
          `3. ACTION PLAN RECOMMENDATIONS\n` +
          `• Recommendation A: Restructure homework to focus on sub-topic modules of 10 minutes.\n` +
          `• Recommendation B: Pair student with localized peer tutor group.\n` +
          `• Recommendation C: Establish parent dashboard notifications for engagement spikes.`
        );
      }, 800);
    });
  },
}));
