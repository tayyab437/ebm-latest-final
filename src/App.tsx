import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Users, 
  FileUp, 
  CheckCircle, 
  Clock, 
  Compass, 
  AlertCircle, 
  Send, 
  Award, 
  Bell, 
  BookMarked, 
  GraduationCap, 
  Activity,
  ArrowRight,
  UploadCloud,
  Layers,
  CheckCircle2,
  Lock,
  MessageSquare,
  HelpCircle,
  FileText,
  Briefcase,
  ShieldCheck,
  Video,
  Brain,
  Trophy,
  Flame,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { UserRole, EbmYear, CourseModule, DailyPlannerTask, StudentProgress, ParentNotification, TeacherClass, ChatMessage, CloudflareR2Upload } from "./types";
import { EBM_ROADMAP_DETAILS, INITIAL_COURSES, MOCK_DAILY_TASKS, MOCK_STUDENTS_PROGRESS } from "./constants";
import { 
  AnnouncementBar, 
  EBMHomepage,
  Hero, 
  HeroSlider,
  Journey, 
  WhyChooseEBM, 
  StudentSuccess, 
  AdmissionsSection, 
  CTA, 
  Footer as HomeFooter 
} from "./components/home";
import { TeacherTestimonials } from "./components/home/success/TeacherTestimonials";
import {
  AuthLayout,
  AuthCard,
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  VerifyEmail,
  AccessDenied,
} from "./components/auth";

import { useBrandingStore, BRANDING_ICONS } from "./lib/branding.store";


import {
  DashboardLayout,
  Overview,
  useDashboardStore,
  AssignmentWidget,
  AchievementsWidget,
  UserProfile,
  UserSettings,
  CertificatesView,
  PromotionCelebration,
  CoursePerformanceHub
} from "./components/student/dashboard";
import { ExamDashboard, CertificateCenter } from "./components/student/exams";

import { LearningLayout } from "./components/student/learning";
import { AILayout } from "./components/student/ai";
import { AdaptiveLayout } from "./components/student/adaptive";
import { LiveLayout } from "./components/student/live";
import { GrowthLayout } from "./components/student/growth";
import { AssessmentLayout } from "./components/student/exams";
import { CurriculumLayout } from "./components/admin/curriculum";
import { AdminLayout as AdminErpLayout } from "./components/admin/erp";
import { TeacherLayout } from "./components/teacher";
import { ParentDashboard } from "./components/parent/ParentDashboard";

import { Inbox, AnnouncementCenter } from "./components/communication";
import { ContentLayout } from "./components/content";
import { SuccessLayout } from "./components/student-success";
import { MyClassesView } from "./components/student/dashboard/MyClassesView";

import { ProfileSettings } from "./components/ProfileSettings";
import { ContactUs, PrivacyPolicy, TermsConditions, AssessmentPage, AnalyticsPage, InspirationPage, CaseStudiesPage } from "./components/pages";

function StudentDashboardView() {
  const { currentView, showCelebration, setShowCelebration, newGrade, setView } = useDashboardStore();

  return (
    <DashboardLayout>
      {showCelebration && (
        <PromotionCelebration 
          newGrade={newGrade} 
          onClose={() => { setShowCelebration(false); setView('my_classes' as any); }} 
        />
      )}
      {currentView === "overview" && <Overview />}
      {currentView === "my_classes" && <MyClassesView />}
      {currentView === "achievements" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-800">Your Achievements</h2>
            <p className="text-slate-500 text-sm mt-1">Track your progress and earned badges</p>
          </div>
          <AchievementsWidget />
        </div>
      )}
      {currentView === "assignments" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-slate-800">Assignments & Tasks</h2>
            <p className="text-slate-500 text-sm mt-1">Manage your pending work and track completion status</p>
          </div>
          <AssignmentWidget />
        </div>
      )}
      {currentView === "assessments" && (
        <div className="space-y-6">
           <ExamDashboard />
        </div>
      )}
      {currentView === "certificates" && (
        <div className="space-y-6">
           <CertificatesView />
        </div>
      )}
      {currentView === "ai_tutor" && (
        <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
           <AILayout />
        </div>
      )}
      {currentView === "profile" && (
        <ProfileSettings role="STUDENT" onBack={() => setView('overview' as any)} />
      )}
      {currentView === "settings" && (
        <ProfileSettings role="STUDENT" onBack={() => setView('overview' as any)} />
      )}
      {currentView === "messages" && (
        <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
          <Inbox />
        </div>
      )}
      {currentView === "announcements" && (
        <div className="h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)]">
          <div className="h-full bg-white rounded-[2rem] border border-slate-200/50 shadow-sm overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10">
              <AnnouncementCenter />
            </div>
          </div>
        </div>
      )}
      
      {/* Placeholder for other views */}
      {currentView !== "overview" && currentView !== "messages" && currentView !== "announcements" && currentView !== "my_classes" && currentView !== "achievements" && currentView !== "assignments" && currentView !== "assessments" && currentView !== "certificates" && currentView !== "ai_tutor" && currentView !== "profile" && currentView !== "settings" && (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-slate-200/50">
          <p className="text-slate-500 font-medium">Coming soon...</p>
        </div>
      )}
    </DashboardLayout>
  );
}


const getInitialUser = () => {
  try {
    const saved = localStorage.getItem("ebm_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getInitialRole = (initialUser: any) => {
  if (initialUser && initialUser.role) {
    return initialUser.role as UserRole;
  }
  return UserRole.STUDENT;
};

const getInitialActiveTab = (initialUser: any) => {
  if (!localStorage.getItem("ebm_token") || !initialUser) {
    return "home";
  }
  const role = initialUser.role;
  if (role === UserRole.STUDENT) return "dashboard";
  if (role === UserRole.PARENT) return "parent-feed";
  if (role === UserRole.TEACHER) return "teacher-panel";
  if (role === UserRole.ADMIN) return "admin-erp";
  return "home";
};


export default function App() {
  const { logoText, logoType, logoIcon, logoImageUrl, showThemeToggle, updateBranding } = useBrandingStore();
  const initialUser = getInitialUser();

  // Sync latest branding config from backend database on mount
  useEffect(() => {
    fetch("/api/branding")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.branding) {
          updateBranding(data.branding);
        }
      })
      .catch((err) => console.log("Branding initial sync skipped:", err));
  }, [updateBranding]);

  const [isDarkMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const root = document.getElementById("ebm-root");
      document.documentElement.classList.remove("dark");
      if (root) root.classList.remove("dark");
      localStorage.removeItem("ebm_theme");
    } catch (e) {
      console.error("Error setting light mode:", e);
    }
  }, []);

  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>(getInitialRole(initialUser));
  const [selectedYear, setSelectedYear] = useState<EbmYear>(initialUser?.ebmYear || EbmYear.YEAR_1);
  const [activeTab, setActiveTab] = useState<"home" | "auth" | "contact" | "privacy" | "terms" | "assessment" | "analytics" | "inspiration" | "casestudies" | "dashboard" | "planner" | "ai-tutor" | "parent-feed" | "teacher-panel" | "admin-erp" | "r2-storage" | "curriculum" | "adaptive" | "communication" | "content" | "student-success" | "live" | "growth" | "exams" | "learning">(getInitialActiveTab(initialUser));
  const [authSubView, setAuthSubView] = useState<"login" | "register" | "forgot-password" | "reset-password" | "verify-email" | "verify-otp" | "access-denied">("login");
  const [authEmailState, setAuthEmailState] = useState("");

  
  // Auth state
  const [token, setToken] = useState<string | null>(localStorage.getItem("ebm_token"));
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: UserRole; ebmYear?: EbmYear; onboardingComplete?: boolean } | null>(initialUser);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState("student@ebm.edu");
  const [authError, setAuthError] = useState<string | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(true);

  // When user changes, update onboardingComplete
  useEffect(() => {
    setOnboardingComplete(true);
  }, [user]);
  
  // App functional states
  const [courses, setCourses] = useState<CourseModule[]>(INITIAL_COURSES);
  const [dailyTasks, setDailyTasks] = useState<DailyPlannerTask[]>([]);
  const [notifications, setNotifications] = useState<ParentNotification[]>([]);
  const [teacherClasses, setTeacherClasses] = useState<TeacherClass[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "AI", text: "Assalam-o-Alaikum! I am your EBM AI Tutor. I can help you accelerate from Grade 5 topics all the way to CIE O-Levels in just 3 years! Ask me any concept in Math, Science, or English.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Storage State
  const [uploadedFiles, setUploadedFiles] = useState<CloudflareR2Upload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  // Add task Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("");
  const [newTaskType, setNewTaskType] = useState<"LESSON" | "QUIZ" | "PRACTICE" | "REVISION">("LESSON");
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  // Assign homework Form State (Teacher)
  const [assignTitle, setAssignTitle] = useState("");
  const [assignSubject, setAssignSubject] = useState("");
  const [assignClass, setAssignClass] = useState("class-1");
  const [assignMinutes, setAssignMinutes] = useState(40);
  const [teacherSuccessMsg, setTeacherSuccessMsg] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        let dest = customEvent.detail;
        if (dest === "dashboard") {
          if (currentRole === UserRole.ADMIN) {
            dest = "admin-erp";
          } else if (currentRole === UserRole.TEACHER) {
            dest = "teacher-panel";
          } else if (currentRole === UserRole.PARENT) {
            dest = "parent-feed";
          }
        }
        setActiveTab(dest as any);
      }
    };
    const handleNavigationBack = () => {
      if (currentRole === UserRole.STUDENT) setActiveTab("dashboard");
      else if (currentRole === UserRole.PARENT) setActiveTab("parent-feed");
      else if (currentRole === UserRole.ADMIN) setActiveTab("admin-erp");
      else setActiveTab("teacher-panel");
    };
    window.addEventListener('navigate', handleNavigation);
    window.addEventListener('navigate-back', handleNavigationBack);
    return () => {
      window.removeEventListener('navigate', handleNavigation);
      window.removeEventListener('navigate-back', handleNavigationBack);
    };
  }, [currentRole]);

  // Load global branding from backend on mount
  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const response = await fetch(`/api/branding?t=${Date.now()}`, {
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.branding && Object.keys(data.branding).length > 0) {
            useBrandingStore.getState().updateBranding(data.branding);
          }
        }
      } catch (err) {
        console.error("Error loading branding from backend:", err);
      }
    };
    fetchBranding();
  }, []);

  // Load Initial API Data
  useEffect(() => {
    fetchPlannerTasks();
    fetchNotifications();
    fetchTeacherClasses();
    fetchR2Files();
    verifySession();
  }, [token]);

  // Sync role & view tabs appropriately
  useEffect(() => {
    if (["auth", "home", "contact", "privacy", "terms", "assessment", "analytics", "inspiration", "casestudies"].includes(activeTab)) return;
    if (currentRole === UserRole.STUDENT) {
      setActiveTab("dashboard");
    } else if (currentRole === UserRole.PARENT) {
      setActiveTab("parent-feed");
    } else if (currentRole === UserRole.TEACHER) {
      setActiveTab("teacher-panel");
    } else if (currentRole === UserRole.ADMIN) {
      setActiveTab("admin-erp");
    }
  }, [currentRole]);

  // Redirect unauthenticated users to the login page if they try to access protected views
  useEffect(() => {
    const publicTabs = ["home", "auth", "contact", "privacy", "terms", "assessment", "analytics", "inspiration", "casestudies"];
    if (!token && !publicTabs.includes(activeTab)) {
      setAuthSubView("login");
      setActiveTab("auth");
    }
  }, [activeTab, token]);


  // API Call: Verify Auth
  const verifySession = async () => {
    if (!token) {
      setIsInitialLoading(false);
      return;
    }
    
    setIsInitialLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
      const res = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setCurrentRole(data.user.role);
        localStorage.setItem("ebm_user", JSON.stringify(data.user));
        if (data.user?.id) {
          setOnboardingComplete(true);
        }
        if (data.user.ebmYear) {
          setSelectedYear(data.user.ebmYear);
        }
        // Force redirect to appropriate dashboard on reload
        const targetTab = data.user.role === UserRole.STUDENT ? "dashboard" : data.user.role === UserRole.PARENT ? "parent-feed" : data.user.role === UserRole.ADMIN ? "admin-erp" : "teacher-panel";
        setActiveTab(targetTab);
      } else {
        // Clear expired token
        localStorage.removeItem("ebm_token");
        localStorage.removeItem("ebm_user");
        localStorage.removeItem("ebm_onboarding_progress");
        localStorage.removeItem("ebm_dashboard_data_cache");
        setToken(null);
      }
    } catch (err: any) {
      console.error("Session verification failed", err);
      if (err.name === 'AbortError') {
        console.error("Verification timed out after 8s");
      }
      // If we have a token but verification fails due to network/server, 
      // we don't necessarily want to logout, but we should stop loading
    } finally {
      setIsInitialLoading(false);
    }
  };

  // API Call: Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: "EbmPassword!123" })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("ebm_token", data.token);
        setUser(data.user);
        setCurrentRole(data.user.role);
        localStorage.setItem("ebm_user", JSON.stringify(data.user));
        if (data.user?.id) {
          setOnboardingComplete(true);
        }
        if (data.user.ebmYear) {
          setSelectedYear(data.user.ebmYear);
        }
        setActiveTab(data.user.role === UserRole.STUDENT ? "dashboard" : data.user.role === UserRole.PARENT ? "parent-feed" : data.user.role === UserRole.ADMIN ? "admin-erp" : "teacher-panel");
      } else {
        setAuthError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setAuthError("Failed to connect to full-stack server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ebm_token");
    localStorage.removeItem("ebm_user");
    localStorage.removeItem("ebm_onboarding_progress"); // Clear progress
    localStorage.removeItem("ebm_dashboard_data_cache"); // Clear dashboard cache
    setOnboardingComplete(true);
    setToken(null);
    setUser(null);
    window.location.reload();
  };


  // API Call: Fetch Daily Planner Tasks
  const fetchPlannerTasks = async () => {
    try {
      const res = await fetch("/api/student/planner");
      const data = await res.json();
      if (data.success) {
        setDailyTasks(data.tasks);
      } else {
        setDailyTasks(MOCK_DAILY_TASKS as any);
      }
    } catch (e) {
      setDailyTasks(MOCK_DAILY_TASKS as any);
    }
  };

  // API Call: Toggle task status
  const handleToggleTask = async (taskId: string) => {
    try {
      const res = await fetch("/api/student/planner/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId })
      });
      const data = await res.json();
      if (data.success) {
        setDailyTasks(data.tasks);
      }
    } catch (err) {
      // Fallback local update
      setDailyTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: t.status === "COMPLETED" ? "PENDING" : "COMPLETED" } : t));
    }
  };

  // API Call: Create new Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskSubject) return;
    try {
      const res = await fetch("/api/student/planner/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          description: "Manually added learning objective",
          subject: newTaskSubject,
          type: newTaskType,
          estimatedMinutes: newTaskMinutes
        })
      });
      const data = await res.json();
      if (data.success) {
        setDailyTasks(data.tasks);
        setNewTaskTitle("");
        setNewTaskSubject("");
        setTaskFormOpen(false);
      }
    } catch (err) {
      // Fallback local create
      const localTask: DailyPlannerTask = {
        id: `local-${Date.now()}`,
        title: newTaskTitle,
        description: "Manually added objective",
        subject: newTaskSubject,
        type: newTaskType,
        status: "PENDING",
        estimatedMinutes: newTaskMinutes,
        date: new Date().toISOString().split("T")[0]
      };
      setDailyTasks(prev => [...prev, localTask]);
      setNewTaskTitle("");
      setNewTaskSubject("");
      setTaskFormOpen(false);
    }
  };

  // API Call: Fetch notifications (Parent)
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/parent/notifications");
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (e) {
      console.log("No notification server response.");
    }
  };

  const handleReadNotification = async (notifId: string) => {
    try {
      const res = await fetch("/api/parent/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifId })
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
    }
  };

  // API Call: Fetch Teacher classes
  const fetchTeacherClasses = async () => {
    try {
      const res = await fetch("/api/teacher/classes");
      const data = await res.json();
      if (data.success) {
        setTeacherClasses(data.classes);
      }
    } catch (e) {
      console.log("Failed to fetch teacher classes.");
    }
  };

  // API Call: Teacher assign homework
  const handleAssignHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle || !assignSubject) return;
    setTeacherSuccessMsg("");
    try {
      const res = await fetch("/api/student/planner/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Assignment: ${assignTitle}`,
          description: `Assigned by teacher to class: ${assignClass}`,
          subject: assignSubject,
          type: "PRACTICE",
          estimatedMinutes: assignMinutes
        })
      });
      const data = await res.json();
      if (data.success) {
        setDailyTasks(data.tasks);
        setTeacherSuccessMsg(`Successfully assigned '${assignTitle}' to class!`);
        setAssignTitle("");
        setAssignSubject("");
        // Auto-clear message
        setTimeout(() => setTeacherSuccessMsg(""), 4000);
      }
    } catch (err) {
      setTeacherSuccessMsg("Offline fallback: Added assignment task to student stream!");
    }
  };

  // API Call: Fetch R2 uploads
  const fetchR2Files = async () => {
    try {
      const res = await fetch("/api/storage/files");
      const data = await res.json();
      if (data.success) {
        setUploadedFiles(data.files);
      }
    } catch (e) {
      console.log("R2 file fetch error.");
    }
  };

  // API Call: Upload files to Cloudflare R2
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(10);
    
    // Smooth simulated upload progress bar
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    try {
      const res = await fetch("/api/storage/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          uploadedBy: user?.name || "Anonymous Guest"
        })
      });
      const data = await res.json();
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (data.success) {
        setTimeout(() => {
          setUploadedFiles(prev => [data.upload, ...prev]);
          setIsUploading(false);
          setUploadProgress(0);
        }, 300);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
      alert("Storage service offline. Unable to complete R2 upload.");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // API Call: Gemini AI Chat request
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "USER",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          userRole: currentRole,
          ebmYear: selectedYear
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setChatMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          sender: "AI",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        // Safe graceful fallback prompt when Gemini Key isn't populated yet
        setChatMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          sender: "AI",
          text: data.fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        id: `ai-err-${Date.now()}`,
        sender: "AI",
        text: "I experienced difficulties connecting to the EBM AI Tutor servers. Please check if the environment variables are configured.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Helper metrics for dynamic dashboard calculations
  const studentStats: StudentProgress = MOCK_STUDENTS_PROGRESS[selectedYear === EbmYear.YEAR_1 ? "student-y1" : selectedYear === EbmYear.YEAR_2 ? "student-y2" : "student-y3"];
  
  const completedTasksCount = dailyTasks.filter(t => t.status === "COMPLETED").length;
  const totalTasksCount = dailyTasks.length;
  const dailyPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Student Dashboard Layout (replaces the standard website wrapper)
  if (activeTab === "dashboard" && token && user?.role === UserRole.STUDENT) {
    return <StudentDashboardView />;
  }

  // Student Learning Layout
  if (activeTab === "learning" && token && user?.role === UserRole.STUDENT) {
    return <LearningLayout />;
  }

  // Content Studio Layout
  if (activeTab === "content" && token) {
    return <ContentLayout />;
  }

  // Student Success Hub Layout
  if (activeTab === "student-success" && token) {
    return <SuccessLayout />;
  }

  if (activeTab === "ai-tutor" && token && user?.role !== UserRole.STUDENT) {
    return <AILayout />;
  }

  if (activeTab === "adaptive" && token) {
    return <AdaptiveLayout />;
  }
  if (activeTab === "live" && token) {
    return <LiveLayout />;
  }
  if (activeTab === "growth" && token) {
    return <GrowthLayout />;
  }
  if (activeTab === "exams" && token) {
    return <AssessmentLayout />;
  }
  if (activeTab === "admin-erp" && token && user?.role === UserRole.ADMIN) {
    return <AdminErpLayout onLogout={handleLogout} />;
  }
  if (activeTab === "curriculum" && token && user?.role === UserRole.ADMIN) {
    return <CurriculumLayout />;
  }
  if (activeTab === "teacher-panel" && token && user?.role === UserRole.TEACHER) {
    return <TeacherLayout />;
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-sans">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-amber-50 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="mt-8 text-center space-y-2">
          <h1 className="text-amber-500 font-black text-xl tracking-tighter">EBM ECOSYSTEM</h1>
          <p className="text-slate-400 text-xs font-mono animate-pulse">Authenticating Heuristic Access...</p>
        </div>
      </div>
    );
  }

  return (

    <div id="ebm-root" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-100 dark:selection:bg-amber-900/50 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300">
      <AnnouncementBar />
      
      {/* ================== GLOBAL BRAND TOPBAR ================== */}
      <header id="ebm-header" className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md backdrop-saturate-150 border-b border-white/60 dark:border-slate-800/60 text-slate-800 dark:text-slate-100 sticky top-0 z-50 shadow-xs select-none transition-all duration-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`tracking-tighter hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2 ${
                (logoType === "image" || logoImageUrl)
                  ? "bg-transparent p-0 shadow-none border-none"
                  : "text-[#00a3e0] font-black text-2xl sm:text-3xl"
              }`}
            >
              {(logoType === "image" || logoImageUrl) && logoImageUrl ? (
                <img 
                  src={logoImageUrl} 
                  alt={logoText || "EBM Logo"} 
                  className="h-9 md:h-10 max-h-12 max-w-[220px] object-contain bg-transparent border-none outline-none shadow-none" 
                  style={{ backgroundColor: 'transparent' }}
                  referrerPolicy="no-referrer" 
                />
              ) : logoType === "icon" && logoIcon && BRANDING_ICONS[logoIcon] ? (
                (() => {
                  const IconComp = BRANDING_ICONS[logoIcon] || BRANDING_ICONS.GraduationCap;
                  return (
                    <div className="flex items-center gap-2">
                      <IconComp className="h-7 w-7 text-[#00a3e0]" />
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{logoText || "EBM"}</span>
                    </div>
                  );
                })()
              ) : (
                <span className="text-2xl sm:text-3xl font-black text-[#00a3e0]">{logoText || "EBM"}</span>
              )}
            </a>

            {/* Digital learning platform tagline */}
            <div className="hidden sm:flex items-center pl-3.5 border-l border-slate-300/80">
              <span className="text-slate-700 dark:text-slate-300 font-bold tracking-tight text-xs sm:text-sm leading-tight">
                Digital learning<br />platform
              </span>
            </div>
          </div>

          {/* Navigation Menus Centered */}
          <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8">
            {[
              { id: "home", label: "Home", action: () => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { id: "assessment", label: "Assessment", action: () => { setActiveTab("assessment"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { id: "analytics", label: "Analytics", action: () => { setActiveTab("analytics"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { id: "inspiration", label: "Inspiration", action: () => { setActiveTab("inspiration"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { id: "contact", label: "Contact", action: () => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); } }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-btn-${tab.id}`}
                  onClick={(e) => { e.preventDefault(); tab.action(); }}
                  className={`relative py-1.5 transition-colors duration-200 cursor-pointer select-none text-sm font-bold ${
                    isActive ? "text-[#00a3e0]" : "text-slate-600 dark:text-slate-300 hover:text-[#00a3e0]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderTabUnderline"
                      className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#00a3e0] rounded-full shadow-[0_2px_8px_rgba(0,163,224,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions - Slanted parallelogram buttons in blue theme */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {!token ? (
              <>
                <button
                  id="header-signin-btn"
                  onClick={() => { setAuthSubView("login"); setActiveTab("auth"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="relative inline-flex items-center justify-center px-5 sm:px-6 py-1.5 sm:py-2 transform -skew-x-[18deg] bg-[#00a3e0] hover:bg-[#0089bd] text-white text-xs sm:text-sm font-bold rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5 transform skew-x-[18deg]">
                    <User className="w-3.5 h-3.5 fill-current" />
                    Sign in
                  </span>
                </button>
                <button
                  id="header-register-btn"
                  onClick={() => { setAuthSubView("register"); setActiveTab("auth"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="relative inline-flex items-center justify-center px-5 sm:px-6 py-1.5 sm:py-2 transform -skew-x-[18deg] border-2 border-[#00a3e0] text-[#00a3e0] hover:bg-[#00a3e0]/10 text-xs sm:text-sm font-bold rounded-md transition-all cursor-pointer bg-white/90 backdrop-blur-xs"
                >
                  <span className="inline-block transform skew-x-[18deg]">
                    Registration
                  </span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden lg:inline">{user?.name} ({user?.role})</span>
                <button 
                  id="btn-logout"
                  onClick={handleLogout} 
                  className="relative inline-flex items-center justify-center px-5 py-1.5 transform -skew-x-[18deg] border-2 border-[#00a3e0] text-[#00a3e0] hover:bg-[#00a3e0]/10 text-xs sm:text-sm font-bold rounded-md transition-all cursor-pointer bg-white/90 backdrop-blur-xs"
                >
                  <span className="inline-block transform skew-x-[18deg]">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav Header */}
      <div className="bg-white/85 backdrop-blur-md text-slate-700 md:hidden flex justify-around py-2 border-t border-slate-200/60 text-xs font-semibold shadow-xs overflow-x-auto whitespace-nowrap px-2 gap-1.5">
        {[
          { id: "home", label: "Home", action: () => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
          { id: "assessment", label: "Assessment", action: () => { setActiveTab("assessment"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
          { id: "analytics", label: "Analytics", action: () => { setActiveTab("analytics"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
          { id: "inspiration", label: "Inspiration", action: () => { setActiveTab("inspiration"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
          { id: "contact", label: "Contact", action: () => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); } }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mob-nav-${tab.id}`}
              onClick={() => tab.action()}
              className={`relative px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                isActive ? "text-[#00a3e0]" : "text-slate-600 hover:text-[#00a3e0]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobTabPill"
                  className="absolute inset-0 bg-[#00a3e0]/15 rounded-full border border-[#00a3e0]/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>



      {/* ================== HOMEPAGE VIEWPORT ================== */}
      {activeTab === "home" && (
        <div id="ebm-homepage" className="flex-grow animate-fade-in">
          <EBMHomepage 
            onSignIn={() => { setAuthSubView("login"); setActiveTab("auth"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onJoinNow={() => { setAuthSubView("register"); setActiveTab("auth"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onNavigateToTab={(tabId) => { setActiveTab(tabId as any); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onSelectSkill={(subject, grade) => {
              setAuthSubView("login");
              setActiveTab("auth");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* ================== AUTH PAGE VIEWPORT ================== */}
      {activeTab === "auth" && (
        <div id="ebm-auth-page" className="flex-grow animate-fade-in">
          <AuthLayout 
            onNavigateRegister={() => setAuthSubView("register")}
            onNavigateTab={(tab) => { setActiveTab(tab as any); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {authSubView === "login" && (
              <AuthCard title="Sign in">
                <LoginForm
                  onSuccess={() => {
                    const updatedToken = localStorage.getItem("ebm_token");
                    const updatedUser = JSON.parse(localStorage.getItem("ebm_user") || "null");
                    setToken(updatedToken);
                    setUser(updatedUser);
                    if (updatedUser) {
                      setCurrentRole(updatedUser.role);
                      if (updatedUser.role === UserRole.STUDENT) {
                        setActiveTab("dashboard");
                      } else if (updatedUser.role === UserRole.PARENT) {
                        setActiveTab("parent-feed");
                      } else if (updatedUser.role === UserRole.ADMIN) {
                        setActiveTab("admin-erp");
                      } else {
                        setActiveTab("teacher-panel");
                      }
                    }
                  }}
                  onNavigateRegister={() => setAuthSubView("register")}
                  onNavigateForgotPassword={() => setAuthSubView("forgot-password")}
                />
              </AuthCard>
            )}

            {authSubView === "register" && (
              <AuthCard title="Sign up">
                <RegisterForm
                  onSuccess={(registeredUser) => {
                    const updatedToken = localStorage.getItem("ebm_token") || "demo-token-123";
                    setToken(updatedToken);
                    setUser(registeredUser);
                    setCurrentRole(registeredUser.role);
                    
                    if (registeredUser.role === UserRole.STUDENT) {
                      setActiveTab("dashboard");
                    } else if (registeredUser.role === UserRole.PARENT) {
                      setActiveTab("parent-feed");
                    } else if (registeredUser.role === UserRole.ADMIN) {
                      setActiveTab("admin-erp");
                    } else {
                      setActiveTab("teacher-panel");
                    }
                  }}
                  onNavigateLogin={() => setAuthSubView("login")}
                />
              </AuthCard>
            )}

            {authSubView === "forgot-password" && (
              <AuthCard 
                title="Recover Password" 
                subtitle="We will help you regain secure access to your portal"
              >
                <ForgotPasswordForm
                  onSuccess={(email) => {
                    setAuthEmailState(email);
                    setAuthSubView("reset-password");
                  }}
                  onNavigateLogin={() => setAuthSubView("login")}
                />
              </AuthCard>
            )}

            {authSubView === "reset-password" && (
              <AuthCard 
                title="Set New Password" 
                subtitle="Choose a highly robust credential to safeguard your metrics"
              >
                <ResetPasswordForm
                  email={authEmailState}
                  onSuccess={() => {
                    setAuthSubView("login");
                  }}
                  onNavigateLogin={() => setAuthSubView("login")}
                />
              </AuthCard>
            )}

            {authSubView === "verify-email" && (
              <AuthCard 
                title="Email Verification" 
                subtitle="Let's authenticate your contact channel"
              >
                <VerifyEmail
                  email={authEmailState}
                  onNavigateLogin={() => setAuthSubView("login")}
                />
              </AuthCard>
            )}

            {authSubView === "access-denied" && (
              <AccessDenied
                onBackToHome={() => setActiveTab("home")}
                requiredRole="ADMIN"
                currentRole={user?.role}
              />
            )}
          </AuthLayout>
        </div>
      )}

      {/* ================== MAIN VIEWPORT ================== */}
      {!["home", "auth", "contact", "privacy", "terms", "assessment", "analytics", "inspiration"].includes(activeTab) && (
        <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ================== GENERAL MAIN PORTAL PORTLETS (WHEN LOGGED IN) ================== */}
        {token && (
          <div className={currentRole === UserRole.PARENT || currentRole === UserRole.TEACHER || activeTab === "ai-tutor" ? "w-full" : "grid grid-cols-1 lg:grid-cols-4 gap-8"}>
            
            {/* LEFT COLUMN: CONTEXT METRICS & NAV RAIL */}
            {currentRole !== UserRole.PARENT && currentRole !== UserRole.TEACHER && activeTab !== "ai-tutor" && (
              <div className="lg:col-span-1 space-y-6">
              
              {/* CURRENT ACTIVE USER PROFILE INFO */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-400 text-slate-900 w-11 h-11 rounded-full font-black flex items-center justify-center shadow-inner">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">{user?.name}</h4>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{user?.role} Portal</span>
                  </div>
                </div>

                {user?.role === UserRole.STUDENT && (
                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Curriculum Status:</span>
                      <span className="font-bold text-amber-400">{selectedYear.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Study Streak:</span>
                      <span className="font-bold text-amber-400">{studentStats.dailyStreak} Days 🔥</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Total Learning Time:</span>
                      <span className="font-bold text-amber-400">{studentStats.totalStudyMinutes} Mins</span>
                    </div>
                  </div>
                )}

                {user?.role === UserRole.PARENT && (
                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <p className="leading-relaxed">Monitoring child progress for <strong>Imran Khan</strong> (Accelerating Year 1 Grade 5-7 syllabus).</p>
                  </div>
                )}

                {user?.role === UserRole.TEACHER && (
                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <p className="leading-relaxed">Assigned Syllabus: <strong>EBM Year 1 Accelerated Math, English</strong> & <strong>Year 3 CIE Physics 5054</strong></p>
                  </div>
                )}
              </div>

              {/* RAIL NAVIGATION */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm flex flex-col space-y-1">
                <span className="text-[10px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Ecosystem Modules</span>
                
                {currentRole === UserRole.STUDENT && (
                  <>
                    <button 
                      id="rail-btn-student-dashboard"
                      onClick={() => setActiveTab("dashboard")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "dashboard" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <Layers className="h-4 w-4 text-amber-500" />
                      <span>Syllabus Checklist</span>
                    </button>
                    <button 
                      id="rail-btn-student-planner"
                      onClick={() => setActiveTab("planner")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "planner" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Daily Planner ({dailyTasks.filter(t => t.status === "PENDING").length} left)</span>
                    </button>
                    <button 
                      id="rail-btn-student-chat"
                      onClick={() => setActiveTab("ai-tutor")}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition text-slate-600 hover:bg-slate-50"
                    >
                      <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                      <span>Gemini AI Tutor Chat</span>
                    </button>
                    <button 
                      id="rail-btn-adaptive-engine"
                      onClick={() => setActiveTab("adaptive")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "adaptive" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <Brain className="h-4 w-4 text-indigo-600" />
                      <span>Adaptive Engine</span>
                    </button>
                    <button 
                      id="rail-btn-live-learning"
                      onClick={() => setActiveTab("live")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "live" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <Video className="h-4 w-4 text-rose-500" />
                      <span>Live Learning</span>
                    </button>
                    <button 
                      id="rail-btn-growth-system"
                      onClick={() => setActiveTab("growth")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "growth" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span>Growth Engine</span>
                    </button>
                    <button 
                      id="rail-btn-assessment-hub"
                      onClick={() => setActiveTab("exams")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "exams" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <ShieldCheck className="h-4 w-4 text-rose-500" />
                      <span>Assessment Hub</span>
                    </button>
                  </>
                )}

                {currentRole === UserRole.ADMIN && (
                  <>
                    <button 
                      id="rail-btn-admin-erp"
                      onClick={() => setActiveTab("admin-erp")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "admin-erp" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>Enterprise ERP</span>
                    </button>
                    <button 
                      id="rail-btn-curriculum-cms"
                      onClick={() => setActiveTab("curriculum")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "curriculum" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <BookOpen className="h-4 w-4 text-emerald-500" />
                      <span>Curriculum CMS</span>
                    </button>
                    <button 
                      id="rail-btn-r2-storage"
                      onClick={() => setActiveTab("r2-storage")}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${activeTab === "r2-storage" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <FileUp className="h-4 w-4 text-emerald-500" />
                      <span>Cloudflare R2 Storage</span>
                    </button>
                  </>
                )}
              </div>

              {/* ACCELERATED ACADEMIC CALENDAR RADAR */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-700 font-bold">
                  <BookMarked className="h-4 w-4 text-amber-600" />
                  <span>EBM Schedule Core</span>
                </div>
                <div className="space-y-2 font-mono text-slate-600 text-[11px]">
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg">
                    <span>Year 1 Essentials:</span>
                    <span className="text-amber-700 font-bold">Months 1 - 12</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg">
                    <span>Year 2 Scientific:</span>
                    <span className="text-amber-700 font-bold">Months 13 - 24</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg">
                    <span>Year 3 O-Level:</span>
                    <span className="text-amber-700 font-bold">Months 25 - 36</span>
                  </div>
                </div>
              </div>

            </div>
            )}

            {/* RIGHT COLUMN: CORE APP CONTENT PORTLETS */}
            <div className={currentRole === UserRole.PARENT || currentRole === UserRole.TEACHER || activeTab === "ai-tutor" ? "w-full" : "lg:col-span-3 space-y-8"}>
              
              {/* TAB CONTAINER 1: SYLLABUS CHECKLIST (STUDENT PORTAL MAIN) */}
              {activeTab === "dashboard" && currentRole === UserRole.STUDENT && (
                <div className="space-y-6 animate-fade-in">
                  <CoursePerformanceHub
                    courses={courses}
                    selectedYear={selectedYear}
                    onSelectYear={setSelectedYear}
                    onUpdateCourses={setCourses}
                    studentStats={studentStats}
                  />

                  {/* Curated AI Helper prompt banner */}
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Stuck on a scientific equation?</span>
                      <h5 className="text-base font-black">Consult EBM Heuristic AI Study-Buddy</h5>
                      <p className="text-xs text-indigo-200">Our tutor understands exact Year 1, 2, and 3 high-yield CIE syllabus problems.</p>
                    </div>
                    <button 
                      id="btn-trigger-ai-tutor"
                      onClick={() => setActiveTab("ai-tutor")} 
                      className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs transition duration-150 shadow"
                    >
                      Chat with AI Tutor
                    </button>
                  </div>

                </div>
              )}


              {/* TAB CONTAINER 2: STUDENT DAILY PLANNER */}
              {activeTab === "planner" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Daily Progress Tracker Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-base font-black">Daily Heuristic Learning Checklist</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Ejaz Bukhari Method rewards complete closure of diagnostic points daily.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase block font-mono">Today's Completion</span>
                        <span className="text-lg font-black text-slate-900">{completedTasksCount} / {totalTasksCount} tasks ({dailyPercent}%)</span>
                      </div>
                      <div className="w-16 h-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center font-black text-amber-600">
                        {dailyPercent}%
                      </div>
                    </div>
                  </div>

                  {/* Checklist Elements */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Pending & Complete Assignments</span>
                      <button 
                        id="btn-open-task-form"
                        onClick={() => setTaskFormOpen(!taskFormOpen)}
                        className="text-xs bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        {taskFormOpen ? "Cancel" : "+ Add Personal Goal"}
                      </button>
                    </div>

                    {/* New Task Add Form Inline toggle */}
                    {taskFormOpen && (
                      <form onSubmit={handleAddTask} className="bg-slate-50/50 p-4 border-b border-slate-100 space-y-4 text-xs animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Goal / Task Title</label>
                            <input 
                              id="input-task-title"
                              type="text" 
                              required
                              placeholder="e.g., Solve 5 equations on Chemistry atomic bonding" 
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Academic Subject</label>
                            <input 
                              id="input-task-subject"
                              type="text" 
                              required
                              placeholder="e.g., General Chemistry Essentials" 
                              value={newTaskSubject}
                              onChange={(e) => setNewTaskSubject(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Task Type</label>
                            <select 
                              id="select-task-type"
                              value={newTaskType}
                              onChange={(e) => setNewTaskType(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                            >
                              <option value="LESSON">Lesson Review</option>
                              <option value="PRACTICE">Homework Practice</option>
                              <option value="QUIZ">Diagnostic Checkpoint Quiz</option>
                              <option value="REVISION">Spaced Repetition Revision</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Estimated Duration</label>
                            <select 
                              id="select-task-minutes"
                              value={newTaskMinutes}
                              onChange={(e) => setNewTaskMinutes(Number(e.target.value))}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                            >
                              <option value="15">15 Minutes</option>
                              <option value="30">30 Minutes</option>
                              <option value="45">45 Minutes</option>
                              <option value="60">60 Minutes</option>
                              <option value="90">90 Minutes</option>
                            </select>
                          </div>
                          <div className="flex items-end">
                            <button 
                              id="btn-submit-task"
                              type="submit" 
                              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2 rounded-lg transition"
                            >
                              Create Goal
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* Task checklist entries */}
                    <div className="divide-y divide-slate-100">
                      {dailyTasks.map(task => (
                        <div 
                          key={task.id} 
                          className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                            task.status === "COMPLETED" ? "bg-emerald-50/20" : "bg-white hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-start space-x-3.5">
                            <button 
                              id={`btn-toggle-task-${task.id}`}
                              onClick={() => handleToggleTask(task.id)}
                              className="mt-0.5 outline-none text-slate-400 hover:text-emerald-600 transition"
                            >
                              {task.status === "COMPLETED" ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-slate-300 hover:border-emerald-600"></div>
                              )}
                            </button>
                            <div>
                              <span className={`font-bold text-xs ${task.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-800"}`}>
                                {task.title}
                              </span>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 uppercase font-sans font-bold">{task.type}</span>
                                <span>•</span>
                                <span>{task.subject}</span>
                                <span>•</span>
                                <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {task.estimatedMinutes} mins</span>
                              </div>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            task.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Streaks gamified block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-center space-x-4">
                      <div className="text-3xl">🔥</div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">{studentStats.dailyStreak} Day Active Streak</h5>
                        <p className="text-xs text-slate-600 leading-normal">Your parent is tracking your consecutive study days. Keep the streak going to earn final certificate rewards!</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-center space-x-4">
                      <div className="text-3xl">🎯</div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">Attendance Standard Validated</h5>
                        <p className="text-xs text-slate-600 leading-normal">Your automated biometrics login record registers 100% attendance over the last {studentStats.attendanceStreak} days.</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}


              {/* TAB CONTAINER 3: GEMINI AI TUTOR CHAT ZONE */}
              {activeTab === "ai-tutor" && (
                <div className="animate-fade-in -m-6 md:-m-12 h-[calc(100vh-4rem)] md:h-screen">
                  <AILayout />
                </div>
              )}

              {/* TAB CONTAINER 11: ADAPTIVE LEARNING ENGINE */}
              {activeTab === "adaptive" && (
                <div className="h-[calc(100vh-140px)] animate-fade-in">
                  <AdaptiveLayout />
                </div>
              )}

              {/* TAB CONTAINER 12: LIVE LEARNING HUB */}
              {activeTab === "live" && (
                <div className="h-[calc(100vh-140px)] animate-fade-in overflow-hidden -m-6 md:-m-12">
                  <LiveLayout />
                </div>
              )}

              {/* TAB CONTAINER 13: EBM GROWTH HUB */}
              {activeTab === "growth" && (
                <div className="h-[calc(100vh-140px)] animate-fade-in overflow-hidden -m-6 md:-m-12">
                  <GrowthLayout />
                </div>
              )}

              {/* TAB CONTAINER 14: ASSESSMENT INTELLIGENCE */}
              {activeTab === "exams" && (
                <div className="h-[calc(100vh-140px)] animate-fade-in overflow-hidden -m-6 md:-m-12">
                  <AssessmentLayout />
                </div>
              )}


              {/* TAB CONTAINER 4: PARENT MONITORING DIAGNOSTICS */}
              {activeTab === "parent-feed" && currentRole === UserRole.PARENT && (
                <div className="min-h-[calc(100vh-140px)] animate-fade-in -m-6 md:-m-12">
                  <ParentDashboard 
                    notifications={notifications} 
                    onReadNotification={handleReadNotification} 
                    onLogout={handleLogout}
                  />
                </div>
              )}


              {/* TAB CONTAINER 5: TEACHER COURSE MANAGER PANEL */}
              {activeTab === "teacher-panel" && currentRole === UserRole.TEACHER && (
                <div className="h-[calc(100vh-140px)] animate-fade-in">
                  <TeacherLayout />
                </div>
              )}


              {/* TAB CONTAINER 6: CLOUDFLARE R2 ASSETS & WRITTEN WORK UPLOAD */}
              {activeTab === "r2-storage" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Cloudflare R2 Explanation banner */}
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                      <UploadCloud className="h-5 w-5 text-emerald-600 animate-pulse" />
                      <h4>Cloudflare R2 Digital Asset Manager</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All educational materials—curriculum PDFs, homework worksheets, biometric login tokens, and video lectures—are designed around a globally distributed <strong>Cloudflare R2 storage architecture</strong>. Drag and drop student deliverables directly to experience the upload integration flow.
                    </p>
                  </div>

                  {/* Drag-and-drop file upload zone */}
                  <div 
                    id="r2-upload-zone"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                      dragActive 
                        ? "border-amber-500 bg-amber-50/40" 
                        : "border-slate-300 hover:border-slate-400 bg-white"
                    }`}
                  >
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="bg-slate-100 text-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <FileText className="h-6 w-6 text-slate-700" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black">Upload PDF, Image, Worksheet, or Audio Answers</h4>
                        <p className="text-[11px] text-slate-500">Supports files up to 10MB to replicate actual CIE grading uploads.</p>
                      </div>

                      {isUploading ? (
                        <div className="space-y-2 pt-2 text-xs">
                          <span className="font-bold text-slate-700">Simulating Secure Cloudflare R2 Uploading Heuristics...</span>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">{uploadProgress}%</span>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <label className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer inline-block transition">
                            Choose Student File
                            <input 
                              id="input-file-uploader"
                              type="file" 
                              className="hidden" 
                              onChange={onFileChange} 
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Uploaded assets log list */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-black">R2 Object Bucket Manifest Log</span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">Bucket Status: Active</span>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {uploadedFiles.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                          <span className="block text-sm font-bold">No assets in the R2 Bucket yet</span>
                          <span className="text-[11px] block mt-1">Files uploaded in this workspace session will appear here in chronological order.</span>
                        </div>
                      ) : (
                        uploadedFiles.map(file => (
                          <div key={file.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white hover:bg-slate-50/50">
                            <div>
                              <span className="font-bold text-slate-900 block">{file.fileName}</span>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-sans font-bold uppercase">{file.mimeType}</span>
                                <span>•</span>
                                <span>{(file.fileSize / 1024).toFixed(1)} KB</span>
                                <span>•</span>
                                <span>Uploaded by: {file.uploadedBy}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <input 
                                type="text" 
                                readOnly 
                                value={file.r2Url} 
                                onClick={(e) => {
                                  (e.target as HTMLInputElement).select();
                                }}
                                className="bg-slate-50 border border-slate-200 text-[10px] font-mono rounded px-2 py-1 w-full sm:w-60 focus:outline-none" 
                              />
                              <button 
                                id={`btn-open-r2-${file.id}`}
                                onClick={() => {
                                  window.open(file.r2Url, "_blank");
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2 py-1 rounded text-[10px] transition shrink-0"
                              >
                                View Url
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB CONTAINER 6: ADMIN ERP PANEL */}
              {activeTab === "admin-erp" && (
                <div className="h-[calc(100vh-140px)] animate-fade-in">
                  <AdminErpLayout onLogout={handleLogout} />
                </div>
              )}

              {/* TAB CONTAINER 7: CURRICULUM CMS (ADMIN PORTAL) */}
              {activeTab === "curriculum" && (
                <div className="h-[800px] w-full">
                  <CurriculumLayout />
                </div>
              )}
            </div>

          </div>
        )}

      </main>
      )}

      {/* NEW PAGES */}
      {activeTab === "contact" && (
        <main className="flex-grow">
          <ContactUs />
        </main>
      )}
      {activeTab === "privacy" && (
        <main className="flex-grow">
          <PrivacyPolicy />
        </main>
      )}
      {activeTab === "terms" && (
        <main className="flex-grow">
          <TermsConditions />
        </main>
      )}
      {activeTab === "assessment" && (
        <main className="flex-grow animate-fade-in">
          <AssessmentPage />
        </main>
      )}
      {activeTab === "analytics" && (
        <main className="flex-grow animate-fade-in">
          <AnalyticsPage />
        </main>
      )}
      {activeTab === "inspiration" && (
        <main className="flex-grow animate-fade-in">
          <InspirationPage />
        </main>
      )}
      {activeTab === "casestudies" && (
        <main className="flex-grow animate-fade-in">
          <CaseStudiesPage />
        </main>
      )}

      {/* FOOTER */}
      <HomeFooter onNavigate={(target) => {
        if (target.startsWith("#")) {
          const anchor = target.substring(1);
          if (activeTab !== "home") {
            setActiveTab("home");
            setTimeout(() => {
              const element = document.getElementById(anchor);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 150);
          } else {
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        } else {
          setActiveTab(target as any);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }} />

    </div>
  );
}
