import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate, Link } from "react-router-dom";
import { SEOHead } from "./components/SEOHead";
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
import { ContactUs, PrivacyPolicy, TermsConditions, AssessmentPage, AnalyticsPage, InspirationPage, CaseStudiesPage, AboutUs, PricingPage, ProgramsPage, LearningPage, NotFoundPage } from "./components/pages";
import { BlogList, BlogPostView, BlogCategoryView } from "./components/blog";

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
  const navigate = useNavigate();
  const location = useLocation();
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

  // Sync URL location.pathname to activeTab state for reverse compatibility
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    if (p === "/") setActiveTab("home");
    else if (p === "/about") setActiveTab("about" as any);
    else if (p === "/pricing") setActiveTab("pricing" as any);
    else if (p === "/programs") setActiveTab("programs" as any);
    else if (p === "/learning") setActiveTab("learning" as any);
    else if (p === "/assessment") setActiveTab("assessment");
    else if (p === "/analytics") setActiveTab("analytics");
    else if (p === "/inspiration") setActiveTab("inspiration");
    else if (p === "/case-studies" || p === "/casestudies") setActiveTab("casestudies");
    else if (p === "/contact") setActiveTab("contact");
    else if (p === "/privacy") setActiveTab("privacy");
    else if (p === "/terms") setActiveTab("terms");
    else if (p === "/login") { setActiveTab("auth"); setAuthSubView("login"); }
    else if (p === "/register") { setActiveTab("auth"); setAuthSubView("register"); }
    else if (p === "/forgot-password") { setActiveTab("auth"); setAuthSubView("forgot-password"); }
    else if (p === "/reset-password") { setActiveTab("auth"); setAuthSubView("reset-password"); }
    else if (p === "/verify-email") { setActiveTab("auth"); setAuthSubView("verify-email"); }
    else if (p === "/access-denied") { setActiveTab("auth"); setAuthSubView("access-denied"); }
    else if (p.startsWith("/dashboard")) {
      if (p === "/dashboard/planner") setActiveTab("planner");
      else if (p === "/dashboard/ai-tutor") setActiveTab("ai-tutor");
      else if (p === "/dashboard/adaptive") setActiveTab("adaptive");
      else if (p === "/dashboard/live") setActiveTab("live");
      else if (p === "/dashboard/growth") setActiveTab("growth");
      else if (p === "/dashboard/assessments" || p === "/dashboard/exams") setActiveTab("exams");
      else setActiveTab("dashboard");
    } else if (p.startsWith("/parent")) setActiveTab("parent-feed");
    else if (p.startsWith("/teacher")) setActiveTab("teacher-panel");
    else if (p.startsWith("/admin")) {
      if (p === "/admin/curriculum") setActiveTab("curriculum");
      else if (p === "/admin/r2-storage") setActiveTab("r2-storage");
      else setActiveTab("admin-erp");
    }
  }, [location.pathname]);

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
        const map: Record<string, string> = {
          home: "/",
          about: "/about",
          pricing: "/pricing",
          programs: "/programs",
          learning: "/learning",
          assessment: "/assessment",
          analytics: "/analytics",
          inspiration: "/inspiration",
          casestudies: "/case-studies",
          contact: "/contact",
          privacy: "/privacy",
          terms: "/terms",
          login: "/login",
          register: "/register",
          dashboard: "/dashboard",
          planner: "/dashboard/planner",
          "ai-tutor": "/dashboard/ai-tutor",
          adaptive: "/dashboard/adaptive",
          live: "/dashboard/live",
          growth: "/dashboard/growth",
          exams: "/dashboard/assessments",
          "parent-feed": "/parent",
          "teacher-panel": "/teacher",
          "admin-erp": "/admin",
          curriculum: "/admin/curriculum",
          "r2-storage": "/admin/r2-storage",
        };
        if (dest === "dashboard") {
          if (currentRole === UserRole.ADMIN) dest = "admin-erp";
          else if (currentRole === UserRole.TEACHER) dest = "teacher-panel";
          else if (currentRole === UserRole.PARENT) dest = "parent-feed";
        }
        const targetUrl = map[dest] || `/${dest}`;
        navigate(targetUrl);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const handleNavigationBack = () => {
      if (currentRole === UserRole.STUDENT) navigate("/dashboard");
      else if (currentRole === UserRole.PARENT) navigate("/parent");
      else if (currentRole === UserRole.ADMIN) navigate("/admin");
      else navigate("/teacher");
    };
    window.addEventListener('navigate', handleNavigation);
    window.addEventListener('navigate-back', handleNavigationBack);
    return () => {
      window.removeEventListener('navigate', handleNavigation);
      window.removeEventListener('navigate-back', handleNavigationBack);
    };
  }, [currentRole, navigate]);


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
    setCurrentRole(UserRole.STUDENT);
    setActiveTab("home");
    navigate("/");
    window.location.href = "/";
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

  // Header navigation links configuration
  const headerNavTabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "assessment", label: "Assessment", path: "/assessment" },
    { id: "analytics", label: "Analytics", path: "/analytics" },
    { id: "inspiration", label: "Inspiration", path: "/inspiration" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const handleNavigatePath = (path: string) => {
    if (path.startsWith("#")) {
      const anchor = path.substring(1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pathLower = location.pathname.toLowerCase();
  const isPortalPage = 
    pathLower.startsWith("/admin") ||
    pathLower.startsWith("/teacher") ||
    pathLower.startsWith("/parent") ||
    pathLower.startsWith("/dashboard") ||
    pathLower.startsWith("/curriculum") ||
    pathLower.startsWith("/ai-tutor") ||
    pathLower.startsWith("/learning") ||
    pathLower.startsWith("/content") ||
    pathLower.startsWith("/student-success") ||
    pathLower.startsWith("/adaptive") ||
    pathLower.startsWith("/live") ||
    pathLower.startsWith("/growth") ||
    pathLower.startsWith("/exams") ||
    pathLower === "/admin-erp" ||
    pathLower === "/teacher-panel" ||
    pathLower === "/parent-feed";

  return (

    <div id="ebm-root" className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-100 dark:selection:bg-amber-900/50 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300 ${isPortalPage ? "h-screen w-screen overflow-hidden" : ""}`}>
      {!isPortalPage && <AnnouncementBar />}
      
      {/* ================== GLOBAL BRAND TOPBAR ================== */}
      {!isPortalPage && (
        <>
          <header id="ebm-header" className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md backdrop-saturate-150 border-b border-white/60 dark:border-slate-800/60 text-slate-800 dark:text-slate-100 sticky top-0 z-50 shadow-xs select-none transition-all duration-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            </Link>

            {/* Digital learning platform tagline */}
            <div className="hidden sm:flex items-center pl-3.5 border-l border-slate-300/80">
              <span className="text-slate-700 dark:text-slate-300 font-bold tracking-tight text-xs sm:text-sm leading-tight">
                Digital learning<br />platform
              </span>
            </div>
          </div>

          {/* Navigation Menus Centered */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6">
            {headerNavTabs.map((tab) => {
              const isActive = location.pathname === tab.path || (tab.path !== "/" && location.pathname.startsWith(tab.path));
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  id={`nav-btn-${tab.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className={`relative py-1.5 transition-colors duration-200 cursor-pointer select-none text-xs lg:text-sm font-bold inline-block ${
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
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {!token ? (
              <>
                <Link
                  id="header-signin-btn"
                  to="/login"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="relative inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 transform -skew-x-[18deg] bg-[#00a3e0] hover:bg-[#0089bd] text-white text-xs sm:text-sm font-bold rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5 transform skew-x-[18deg]">
                    <User className="w-3.5 h-3.5 fill-current" />
                    Sign in
                  </span>
                </Link>
                <Link
                  id="header-register-btn"
                  to="/register"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="relative inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 transform -skew-x-[18deg] border-2 border-[#00a3e0] text-[#00a3e0] hover:bg-[#00a3e0]/10 text-xs sm:text-sm font-bold rounded-md transition-all cursor-pointer bg-white/90 backdrop-blur-xs"
                >
                  <span className="inline-block transform skew-x-[18deg]">
                    Registration
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  id="btn-goto-portal"
                  onClick={() => {
                    if (user?.role === UserRole.ADMIN) handleNavigatePath("/admin");
                    else if (user?.role === UserRole.TEACHER) handleNavigatePath("/teacher");
                    else if (user?.role === UserRole.PARENT) handleNavigatePath("/parent");
                    else handleNavigatePath("/dashboard");
                  }}
                  className="text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition"
                >
                  My Portal ({user?.role})
                </button>
                <button 
                  id="btn-logout"
                  onClick={handleLogout} 
                  className="relative inline-flex items-center justify-center px-4 py-1.5 transform -skew-x-[18deg] border-2 border-[#00a3e0] text-[#00a3e0] hover:bg-[#00a3e0]/10 text-xs font-bold rounded-md transition-all cursor-pointer bg-white/90"
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
      <nav aria-label="Mobile navigation" className="bg-white/85 backdrop-blur-md text-slate-700 md:hidden flex justify-around py-2 border-t border-slate-200/60 text-xs font-semibold shadow-xs overflow-x-auto whitespace-nowrap px-2 gap-1.5">
        {headerNavTabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path !== "/" && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.id}
              to={tab.path}
              id={`mob-nav-${tab.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`relative px-3 py-1 rounded-full text-xs font-bold transition-colors inline-block ${
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
            </Link>
          );
        })}
      </nav>
      </>
    )}



      {/* ================== MAIN CONTENT ROUTER ================== */}
      <main className={`flex-grow flex flex-col ${isPortalPage ? "h-screen w-full overflow-hidden" : ""}`}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={
            <div id="ebm-homepage" className="flex-grow animate-fade-in">
              <EBMHomepage 
                onSignIn={() => handleNavigatePath("/login")}
                onJoinNow={() => handleNavigatePath("/register")}
                onNavigateToTab={(tabId) => handleNavigatePath(tabId === "home" ? "/" : `/${tabId}`)}
                onSelectSkill={() => handleNavigatePath("/login")}
              />
            </div>
          } />

          <Route path="/about" element={
            <div id="ebm-about-page" className="flex-grow animate-fade-in">
              <AboutUs />
            </div>
          } />

          {/* Authentication Pages */}
          <Route path="/login" element={
            <div id="ebm-auth-page" className="flex-grow animate-fade-in">
              <AuthLayout 
                onNavigateRegister={() => handleNavigatePath("/register")}
                onNavigateTab={(tab) => handleNavigatePath(`/${tab}`)}
              >
                <AuthCard title="Sign in">
                  <LoginForm
                    onSuccess={() => {
                      const updatedToken = localStorage.getItem("ebm_token");
                      const updatedUser = JSON.parse(localStorage.getItem("ebm_user") || "null");
                      setToken(updatedToken);
                      setUser(updatedUser);
                      if (updatedUser) {
                        setCurrentRole(updatedUser.role);
                        if (updatedUser.role === UserRole.STUDENT) handleNavigatePath("/dashboard");
                        else if (updatedUser.role === UserRole.PARENT) handleNavigatePath("/parent");
                        else if (updatedUser.role === UserRole.ADMIN) handleNavigatePath("/admin");
                        else handleNavigatePath("/teacher");
                      } else {
                        handleNavigatePath("/dashboard");
                      }
                    }}
                    onNavigateRegister={() => handleNavigatePath("/register")}
                    onNavigateForgotPassword={() => handleNavigatePath("/forgot-password")}
                  />
                </AuthCard>
              </AuthLayout>
            </div>
          } />

          <Route path="/register" element={
            <div id="ebm-auth-page" className="flex-grow animate-fade-in">
              <AuthLayout 
                onNavigateRegister={() => handleNavigatePath("/register")}
                onNavigateTab={(tab) => handleNavigatePath(`/${tab}`)}
              >
                <AuthCard title="Sign up">
                  <RegisterForm
                    onSuccess={(registeredUser) => {
                      const updatedToken = localStorage.getItem("ebm_token") || "demo-token-123";
                      setToken(updatedToken);
                      setUser(registeredUser);
                      setCurrentRole(registeredUser.role);
                      handleNavigatePath("/dashboard");
                    }}
                    onNavigateLogin={() => handleNavigatePath("/login")}
                  />
                </AuthCard>
              </AuthLayout>
            </div>
          } />

          <Route path="/forgot-password" element={
            <div id="ebm-auth-page" className="flex-grow animate-fade-in">
              <AuthLayout 
                onNavigateRegister={() => handleNavigatePath("/register")}
                onNavigateTab={(tab) => handleNavigatePath(`/${tab}`)}
              >
                <AuthCard 
                  title="Recover Password" 
                  subtitle="We will help you regain secure access to your portal"
                >
                  <ForgotPasswordForm
                    onSuccess={(email) => {
                      setAuthEmailState(email);
                      handleNavigatePath("/reset-password");
                    }}
                    onNavigateLogin={() => handleNavigatePath("/login")}
                  />
                </AuthCard>
              </AuthLayout>
            </div>
          } />

          <Route path="/reset-password" element={
            <div id="ebm-auth-page" className="flex-grow animate-fade-in">
              <AuthLayout 
                onNavigateRegister={() => handleNavigatePath("/register")}
                onNavigateTab={(tab) => handleNavigatePath(`/${tab}`)}
              >
                <AuthCard 
                  title="Set New Password" 
                  subtitle="Choose a highly robust credential to safeguard your metrics"
                >
                  <ResetPasswordForm
                    email={authEmailState}
                    onSuccess={() => handleNavigatePath("/login")}
                    onNavigateLogin={() => handleNavigatePath("/login")}
                  />
                </AuthCard>
              </AuthLayout>
            </div>
          } />

          <Route path="/verify-email" element={
            <div id="ebm-auth-page" className="flex-grow animate-fade-in">
              <AuthLayout 
                onNavigateRegister={() => handleNavigatePath("/register")}
                onNavigateTab={(tab) => handleNavigatePath(`/${tab}`)}
              >
                <AuthCard 
                  title="Email Verification" 
                  subtitle="Let's authenticate your contact channel"
                >
                  <VerifyEmail
                    email={authEmailState}
                    onNavigateLogin={() => handleNavigatePath("/login")}
                  />
                </AuthCard>
              </AuthLayout>
            </div>
          } />

          {/* Marketing & Content Pages */}
          <Route path="/assessment" element={<div className="flex-grow animate-fade-in"><AssessmentPage /></div>} />
          <Route path="/analytics" element={<div className="flex-grow animate-fade-in"><AnalyticsPage /></div>} />
          <Route path="/inspiration" element={<div className="flex-grow animate-fade-in"><InspirationPage /></div>} />
          <Route path="/blog" element={<div className="flex-grow animate-fade-in"><BlogList /></div>} />
          <Route path="/blog/category/:slug" element={<div className="flex-grow animate-fade-in"><BlogCategoryView /></div>} />
          <Route path="/blog/:slug" element={<div className="flex-grow animate-fade-in"><BlogPostView /></div>} />
          <Route path="/casestudies" element={<div className="flex-grow animate-fade-in"><CaseStudiesPage /></div>} />
          <Route path="/case-studies" element={<div className="flex-grow animate-fade-in"><CaseStudiesPage /></div>} />
          <Route path="/contact" element={<div className="flex-grow"><ContactUs /></div>} />
          <Route path="/privacy" element={<div className="flex-grow"><PrivacyPolicy /></div>} />
          <Route path="/terms" element={<div className="flex-grow"><TermsConditions /></div>} />
          <Route path="/about" element={<div className="flex-grow animate-fade-in"><AboutUs /></div>} />
          <Route path="/programs" element={
            <div className="flex-grow animate-fade-in">
              <ProgramsPage 
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                onEnterWorkspace={() => handleNavigatePath("/dashboard")}
              />
            </div>
          } />
          <Route path="/pricing" element={
            <div className="flex-grow animate-fade-in">
              <PricingPage 
                onNavigateToTab={(tabId) => handleNavigatePath(tabId === "home" ? "/" : `/${tabId}`)}
              />
            </div>
          } />

          {/* Portal Layouts */}
          <Route path="/dashboard" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><StudentDashboardView /></div>} />
          <Route path="/learning" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><LearningLayout /></div>} />
          <Route path="/content" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><ContentLayout /></div>} />
          <Route path="/student-success" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><SuccessLayout /></div>} />
          <Route path="/ai-tutor" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><AILayout /></div>} />
          <Route path="/adaptive" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><AdaptiveLayout /></div>} />
          <Route path="/live" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><LiveLayout /></div>} />
          <Route path="/growth" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><GrowthLayout /></div>} />
          <Route path="/exams" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><AssessmentLayout /></div>} />
          <Route path="/parent" element={
            <div className="w-full h-screen overflow-hidden animate-fade-in">
              <ParentDashboard 
                notifications={notifications} 
                onReadNotification={handleReadNotification} 
                onLogout={handleLogout}
              />
            </div>
          } />
          <Route path="/admin" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><AdminErpLayout onLogout={handleLogout} /></div>} />
          <Route path="/curriculum" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><CurriculumLayout /></div>} />
          <Route path="/teacher" element={<div className="w-full h-screen overflow-hidden animate-fade-in"><TeacherLayout onLogout={handleLogout} /></div>} />

          {/* Legacy Redirects */}
          <Route path="/admin-erp" element={<Navigate to="/admin" replace />} />
          <Route path="/teacher-panel" element={<Navigate to="/teacher" replace />} />
          <Route path="/parent-feed" element={<Navigate to="/parent" replace />} />

          {/* 404 Catch-All Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>



      {/* FOOTER */}
      {!isPortalPage && (
        <HomeFooter onNavigate={(target) => {
          if (target === "home") handleNavigatePath("/");
          else if (target.startsWith("/")) handleNavigatePath(target);
          else if (target.startsWith("#")) handleNavigatePath(target);
          else handleNavigatePath(`/${target}`);
        }} />
      )}

    </div>
  );
}
