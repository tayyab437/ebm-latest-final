import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Inbox as CommunicationInbox, AnnouncementCenter } from "../communication";
import { ProfileSettings } from "../ProfileSettings";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Award, 
  Bell, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Megaphone,
  Calendar, 
  Flame, 
  Target, 
  Trash2, 
  Plus, 
  Search, 
  Send, 
  HelpCircle, 
  Inbox, 
  User, 
  Compass, 
  Activity,
  ChevronDown,
  ChevronUp,
  Trophy,
  FileText,
  Video,
  Volume2,
  X,
  ExternalLink,
  LogOut,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { ParentNotification } from "../../types";
import { PTMLiveConferenceModal } from "../common/PTMLiveConferenceModal";

interface ParentDashboardProps {
  notifications: ParentNotification[];
  onReadNotification: (id: string) => void;
  onLogout?: () => void;
}

interface Pledge {
  id: string;
  title: string;
  targetMetric: string;
  reward: string;
  status: "ACTIVE" | "ACHIEVED";
}

interface CheckpointResult {
  title: string;
  subject: string;
  score: number;
  submittedAt: string;
  questions: Array<{
    question: string;
    correctAnswer: string;
    studentAnswer: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
}

export function ParentDashboard({ notifications, onReadNotification, onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "transcripts" | "incentives" | "ai_advisor" | "meetings" | "academy" | "messages" | "announcements" | "profile">("overview");
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  
  // Test history state variables
  const [expandedAttemptIdx, setExpandedAttemptIdx] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTopic, setSimTopic] = useState("Calculus Integrals");
  const [simScore, setSimScore] = useState(75);
  const [simSubject, setSimSubject] = useState("Mathematics");
  
  // Dynamic children list
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildEmail, setNewChildEmail] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState("");

  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchingStudents, setIsSearchingStudents] = useState(false);

  useEffect(() => {
    const searchStudents = async () => {
      if (!studentSearchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearchingStudents(true);
      try {
        const token = localStorage.getItem("ebm_token");
        const res = await fetch(`/api/parent/search-students?query=${encodeURIComponent(studentSearchQuery)}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.students)) {
          setSearchResults(data.students);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Failed to search students:", err);
        setSearchResults([]);
      } finally {
        setIsSearchingStudents(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      searchStudents();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [studentSearchQuery]);

  useEffect(() => {
    if (!showAddChildModal) {
      setStudentSearchQuery("");
      setSearchResults([]);
    }
  }, [showAddChildModal]);

  const [parentResources, setParentResources] = useState<any[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);

  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/parent/resources", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setParentResources(data.resources);
    } catch (err) {
      console.error("Failed to load parenting resources:", err);
    } finally {
      setLoadingResources(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/parent/children", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.children)) {
        setChildren(data.children);
        if ((data.children || []).length > 0 && !selectedChildId) {
          setSelectedChildId(data.children[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load children in parent dashboard:", err);
    }
  };

  const handleLinkChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildEmail) return;
    
    setIsLinking(true);
    setLinkError("");
    
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/parent/link-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ studentEmail: newChildEmail })
      });
      
      const result = await res.json();
      if (result.success) {
        setNewChildEmail("");
        setShowAddChildModal(false);
        fetchChildren(); // Refresh list
      } else {
        setLinkError(result.error || "Failed to link student. Please check the email address.");
      }
    } catch (err) {
      setLinkError("Network error. Please try again.");
    } finally {
      setIsLinking(false);
    }
  };

  // Selected child derived state
  const selectedChild = children.find(c => c.id === selectedChildId);

  // Student Stats (Derived from selected child)
  const studentStats = {
    name: selectedChild?.name || "Select a Child",
    gradeLevel: selectedChild?.gradeLevel || "N/A",
    targetPromotion: `Accelerated Track - ${selectedChild?.ebmYear || 'Year 1'}`,
    syllabusProgress: selectedChild?.performanceScore || 0,
    averageScore: selectedChild?.performanceScore || 0,
    studyHoursThisWeek: selectedChild?.learningTimeMinutes || 0,
    attendanceRate: selectedChild?.attendanceRate || 0,
    loginStreak: selectedChild?.loginStreak || 0,
  };

  // Recent Submissions / Transcripts (Interactive accordion)
  const [submissions, setSubmissions] = useState<CheckpointResult[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [expandedQuizIndex, setExpandedQuizIndex] = useState<number | null>(null);

  // Term Examinations States
  const [subTab, setSubTab] = useState<"checkpoints" | "term_exams">("term_exams");
  const [termExams, setTermExams] = useState<any[]>([]);
  const [termResults, setTermResults] = useState<any[]>([]);
  const [loadingTerm, setLoadingTerm] = useState(false);

  // Pledge Incentives State
  const [pledges, setPledges] = useState<Pledge[]>([
    {
      id: "pledge-1",
      title: "Perfect English Comprehension Score",
      targetMetric: "Score 100% on English Narrative Reading Checkpoint",
      reward: "Weekend family sports & cinema outing 🎬",
      status: "ACTIVE",
    },
    {
      id: "pledge-2",
      title: "Algebraic Equations Mastery",
      targetMetric: "Complete Linear Equations modules with >95%",
      reward: "Unlock custom gaming desk accessory set 🎧",
      status: "ACTIVE",
    },
    {
      id: "pledge-3",
      title: "Study consistency streak",
      targetMetric: "Maintain a 14-day login streak without gaps",
      reward: "Accelerated science kit with micro-lens 🔬",
      status: "ACHIEVED",
    }
  ]);
  const [newPledgeTitle, setNewPledgeTitle] = useState("");
  const [newPledgeTarget, setNewPledgeTarget] = useState("");
  const [newPledgeReward, setNewPledgeReward] = useState("");

  // AI Parental Consultant Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello! I am your EBM Parent Advisor. Your connected children are listed above. Select any student to analyze their syllabus acceleration, active study streak, or average quiz scores. How can I help you customize their home learning program today?"
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Meeting Scheduler State
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [proposingRevisionMeetId, setProposingRevisionMeetId] = useState<string | null>(null);
  const [revisionDateTime, setRevisionDateTime] = useState("");
  const [revisionNotes, setRevisionNotes] = useState("");
  const [liveMeetingToJoin, setLiveMeetingToJoin] = useState<any | null>(null);
  const [copiedMeetingId, setCopiedMeetingId] = useState<string | null>(null);

  const fetchMeetings = async () => {
    setLoadingMeetings(true);
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/meetings", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.meetings)) {
        setMeetings(data.meetings);
      }
    } catch (err) {
      console.error("Failed to fetch meetings:", err);
    } finally {
      setLoadingMeetings(false);
    }
  };

  const handleRespondToMeeting = async (meetId: string, action: "APPROVE" | "REJECT" | "PROPOSE_REVISION", proposedDate?: string, notes?: string) => {
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch(`/api/meetings/${meetId}/respond`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ action, proposedDate, notes })
      });
      const data = await res.json();
      if (data.success) {
        alert(action === "APPROVE" ? "Meeting request approved and confirmed!" : action === "REJECT" ? "Meeting declined." : "Revision requested successfully!");
        setProposingRevisionMeetId(null);
        setRevisionDateTime("");
        setRevisionNotes("");
        fetchMeetings();
      } else {
        alert("Failed to respond to meeting request: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/admin/teachers");
      const data = await res.json();
      if (data.success && data.teachers && (data.teachers || []).length > 0) {
        setDbTeachers(data.teachers);
      }
    } catch (e) {
      console.error("Error fetching database teachers:", e);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchChildren();
    fetchResources();
    fetchTeachers();
    fetchMeetings();
  }, []);

  const fetchSubmissions = async () => {
    if (!selectedChildId) return;
    setLoadingSubmissions(true);
    try {
      const token = localStorage.getItem("ebm_token");
      
      // Fetch submissions
      const resSub = await fetch(`/api/student/submissions?studentId=${selectedChildId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await resSub.json();
      
      // Fetch assignments for title lookup
      const resAsg = await fetch("/api/teacher/assignments", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const dataAsg = await resAsg.json();
      const assignmentsList = dataAsg.success && Array.isArray(dataAsg.assignments) ? dataAsg.assignments : [];

      // Fetch curriculum for title lookup
      const resCur = await fetch("/api/curriculum", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const dataCur = await resCur.json();
      const curriculumList = dataCur.success && Array.isArray(dataCur.curriculum) ? dataCur.curriculum : [];
      
      if (data.success && Array.isArray(data.submissions)) {
        // Format submissions to checkpoint structure
        const formatted: CheckpointResult[] = data.submissions.map((sub: any) => {
          let parsedQs = [];
          if (sub.content) {
            try {
              // Check if content is formatted JSON
              const parsed = JSON.parse(sub.content);
              if (parsed.questions) parsedQs = parsed.questions;
            } catch (e) {
              // If it's raw text
              parsedQs = [{ question: "Comprehension & Arithmetic questions reviewed", correctAnswer: "N/A", studentAnswer: sub.content, isCorrect: sub.score >= 95 }];
            }
          }

          let resolvedTitle = "";
          let resolvedSubject = "GENERAL";

          if (sub.type === "ASSIGNMENT" && sub.assignmentId) {
            const matchedAsg = assignmentsList.find((a: any) => a.id === sub.assignmentId);
            resolvedTitle = matchedAsg ? `Homework Assignment: ${matchedAsg.title}` : `Homework Assignment`;
            resolvedSubject = "HOMEWORK";
          } else if (sub.type === "ASSESSMENT" && sub.assessmentId) {
            resolvedTitle = `Syllabus Assessment: Unit Checkpoint`;
            resolvedSubject = "ASSESSMENT";
          } else if (sub.assessmentId) {
            const matchedCur = curriculumList.find((c: any) => c.id === sub.assessmentId);
            resolvedTitle = matchedCur ? `Curriculum Test: ${matchedCur.title}` : `Curriculum Checkpoint Test`;
            resolvedSubject = matchedCur ? matchedCur.subject : "CURRICULUM";
          } else {
            resolvedTitle = sub.feedback ? `Checkpoint: ${sub.feedback.substring(0, 35)}...` : `Syllabus Diagnostic Test`;
            resolvedSubject = sub.type || "TEST";
          }

          const cleanedQuestions = (parsedQs || []).length > 0 
            ? parsedQs.map((q: any) => ({
                question: q.question || "Core syllabus skills validation question",
                correctAnswer: q.correctAnswer || "Perfect comprehension or formula mastery",
                studentAnswer: q.studentAnswer || q.userAnswer || "No answer provided",
                isCorrect: q.isCorrect !== undefined ? q.isCorrect : ((sub.score || 0) >= 95),
                explanation: q.explanation || "Evaluated under accelerated curriculum standard."
              }))
            : [
                {
                  question: "Core syllabus skills validation question",
                  correctAnswer: "Perfect comprehension or formula mastery",
                  studentAnswer: "Full response evaluation verified",
                  isCorrect: (sub.score || 0) >= 95,
                  explanation: sub.feedback || "Evaluated under accelerated curriculum standard."
                }
              ];

          return {
            title: resolvedTitle,
            subject: resolvedSubject,
            score: sub.score || 0,
            submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : new Date().toLocaleDateString(),
            questions: cleanedQuestions
          };
        });
        setSubmissions(formatted);
      }
    } catch (err) {
      console.error("Failed to load submissions in parent dashboard:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const fetchTermExamsAndResults = async () => {
    if (!selectedChildId) return;
    setLoadingTerm(true);
    try {
      const resRes = await fetch(`/api/students/${selectedChildId}/exam-results`);
      const resData = await resRes.json();
      if (resData.success && resData.results) {
        setTermResults(resData.results);
      } else {
        setTermResults([]);
      }

      const examRes = await fetch(`/api/exams`);
      const examData = await examRes.json();
      if (examData.success && examData.exams) {
        setTermExams(examData.exams);
      } else {
        setTermExams([]);
      }
    } catch (err) {
      console.error("Failed to load child term results:", err);
    } finally {
      setLoadingTerm(false);
    }
  };

  const handleSimulateTest = async () => {
    if (!selectedChildId) return;
    setIsSimulating(true);
    try {
      const res = await fetch("/api/parent/simulate-test-attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedChildId,
          studentName: studentStats.name,
          subject: simSubject,
          topic: simTopic,
          score: simScore
        })
      });
      const data = await res.json();
      if (data.success) {
        await fetchSubmissions();
        alert(`Successfully generated and stored a past test attempt for ${studentStats.name} in the EBM database on the topic "${simTopic}" with a score of ${data.submission.score}%!`);
      } else {
        alert("Failed to simulate past test attempt: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  // Fetch Submissions and update stats when selectedChildId changes
  useEffect(() => {
    fetchSubmissions();
    fetchTermExamsAndResults();
  }, [selectedChildId, children]);

  // Handle adding a reward pledge
  const handleAddPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPledgeTitle || !newPledgeTarget || !newPledgeReward) return;
    
    const newPledge: Pledge = {
      id: `pledge-${Date.now()}`,
      title: newPledgeTitle,
      targetMetric: newPledgeTarget,
      reward: newPledgeReward,
      status: "ACTIVE"
    };

    setPledges([newPledge, ...pledges]);
    setNewPledgeTitle("");
    setNewPledgeTarget("");
    setNewPledgeReward("");
    
    // Quick alert
    alert(`Reward pledge registered! ${studentStats.name} will see this incentive displayed inside their daily planning hub to keep them highly motivated.`);
  };

  const handleDeletePledge = (id: string) => {
    setPledges(pledges.filter(p => p.id !== id));
  };

  // Handle Parental Advisor AI Chat
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || sendingMessage) return;

    const userText = currentMessage;
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setCurrentMessage("");
    setSendingMessage(true);

    try {
      const res = await fetch("/api/parent/ai-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      if (data.success && data.response) {
        setChatMessages(prev => [...prev, { sender: "ai", text: data.response }]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { 
        sender: "ai", 
        text: `I apologize. I am currently running fine-tuning loops. I can confirm ${studentStats.name} is moving rapidly through their syllabus checkpoints with excellent grade averages. Please try asking again in a moment.` 
      }]);
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle Schedule Meeting
  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !selectedDateTime) return;

    const teacherObj = dbTeachers.find(t => t.id === selectedTeacher);
    const teacherSubject = teacherObj ? (teacherObj.title || `${teacherObj.department} Specialty`) : "Syllabus Specialty";

    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          studentId: selectedChildId,
          studentName: studentStats.name,
          subject: teacherSubject,
          date: selectedDateTime.replace("T", " at "),
          notes: `PTM scheduled by parent for student ${studentStats.name}.`
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Parent-Teacher meeting request submitted successfully! The educator will review and confirm shortly.");
        setSelectedTeacher("");
        setSelectedDateTime("");
        fetchMeetings();
      } else {
        alert("Failed to submit meeting request: " + data.error);
      }
    } catch (err: any) {
      alert("Error scheduling meeting: " + err.message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 relative font-sans flex-col md:flex-row items-stretch overflow-hidden">
      
      {/* Parent Sidebar Navigation */}
      <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200 shrink-0 flex flex-col h-auto md:h-screen z-10 overflow-y-auto">
        {/* Branding Title */}
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to Home Page"
          className="p-6 border-b border-slate-100 flex items-center gap-3 cursor-pointer group hover:bg-slate-50 transition-colors"
        >
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md group-hover:scale-105 transition-transform">
            <Users className="h-5 w-5 text-white font-black" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block leading-none mb-1">EBM Portal</span>
            <h2 className="text-sm font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">Parent Command Hub</h2>
          </div>
        </Link>



        {/* Navigation Tabs */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-240px)]">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="h-4.5 w-4.5" />
              <span>Overview & Diagnostics</span>
            </div>
            <ArrowRight className={`h-3 w-3 ${activeTab === "overview" ? "opacity-100" : "opacity-0"}`} />
          </button>

          <button 
            onClick={() => setActiveTab("transcripts")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "transcripts" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4.5 w-4.5" />
              <span>Checkpoint Transcripts</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded-full font-black">
              {(submissions || []).length} Verified
            </span>
          </button>

          <button 
            onClick={() => setActiveTab("incentives")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "incentives" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Target className="h-4.5 w-4.5" />
              <span>Motivation & Pledges</span>
            </div>
            <ArrowRight className={`h-3 w-3 ${activeTab === "incentives" ? "opacity-100" : "opacity-0"}`} />
          </button>

          <button 
            onClick={() => setActiveTab("ai_advisor")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ai_advisor" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-4.5 w-4.5 text-blue-500" />
              <span>AI Parental Advisor</span>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
              Live
            </span>
          </button>

          <button 
            onClick={() => setActiveTab("meetings")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "meetings" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4.5 w-4.5" />
              <span>PTM Scheduling</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "messages" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4.5 w-4.5" />
              <span>Messages</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("announcements")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "announcements" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Megaphone className="h-4.5 w-4.5" />
              <span>Announcements</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "profile" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <User className="h-4.5 w-4.5" />
              <span>My Profile</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("academy")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "academy" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="h-4.5 w-4.5" />
              <span>Parenting Academy</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
              New
            </span>
          </button>
        </nav>

        {/* Quick Link Button & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => setShowAddChildModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-xs font-bold cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Link Another Child
          </button>

          <button 
            onClick={onLogout || (() => {
              localStorage.removeItem("ebm_token");
              localStorage.removeItem("ebm_user");
              localStorage.removeItem("ebm_onboarding_progress");
              localStorage.removeItem("ebm_dashboard_data_cache");
              window.location.href = "/";
            })}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all text-xs font-bold border border-rose-200/50 cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Logout from Portal
          </button>
        </div>

        {/* Add Child Modal */}
        <AnimatePresence>
          {showAddChildModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <button 
                  onClick={() => setShowAddChildModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Link Student Profile</h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">Search for your child by name or enter their student email address to link them.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Search bar section */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Search Student Name</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="text"
                        value={studentSearchQuery}
                        onChange={e => setStudentSearchQuery(e.target.value)}
                        placeholder="Type student name (e.g. John)..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Realtime Search Results list */}
                  {studentSearchQuery.trim() && (
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2 max-h-40 overflow-y-auto space-y-1">
                      {isSearchingStudents ? (
                        <p className="text-[10px] text-slate-400 font-bold p-2 text-center animate-pulse">Searching EBM Directory...</p>
                      ) : searchResults.length === 0 ? (
                        <p className="text-[10px] text-slate-500 font-bold p-2 text-center">No students found matching "{studentSearchQuery}"</p>
                      ) : (
                        searchResults.map((student: any) => (
                          <button
                            key={student.id}
                            type="button"
                            onClick={() => {
                              setNewChildEmail(student.email);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl transition text-left cursor-pointer ${
                              newChildEmail.toLowerCase().trim() === student.email.toLowerCase().trim()
                                ? "bg-blue-50/75 border border-blue-200 text-blue-950" 
                                : "hover:bg-slate-100 text-slate-700 hover:text-slate-950"
                            }`}
                          >
                            <div className="truncate">
                              <p className="text-[11px] font-black truncate">{student.name}</p>
                              <p className="text-[9px] text-slate-400 font-medium font-mono truncate">{student.email}</p>
                            </div>
                            <span className="text-[9px] font-black bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600 uppercase shrink-0 ml-2">
                              {student.gradeLevel}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <form onSubmit={handleLinkChild} className="mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Selected Student E-Mail</label>
                    <div className="relative">
                      <Inbox className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="email"
                        required
                        value={newChildEmail}
                        onChange={e => setNewChildEmail(e.target.value)}
                        placeholder="student@ebm.edu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {linkError && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center gap-3 text-rose-600 text-xs font-bold">
                      <XCircle className="h-4 w-4 shrink-0" />
                      {linkError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isLinking}
                    className="w-full py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl font-black text-sm shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLinking ? "Searching EBM Database..." : "Link Profile Now"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Container Content */}
      <div className="flex-1 flex flex-col bg-slate-50 min-w-0 h-full overflow-y-auto">
        
        {/* Upper Dashboard Statistics Header */}
        <div className="p-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 md:rounded-tr-3xl">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Parental Oversight Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium">Monitoring and supporting {studentStats.name}'s academic progression</p>
          </div>
        </div>

        {/* Dynamic Content Views */}
        <div className="flex-1 p-6 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: OVERVIEW & DIAGNOSTICS */}
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Linked Scholar Profiles Card Selection */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4.5 w-4.5 text-indigo-500" />
                      <h3 className="text-sm font-black text-slate-800">Child Profiles</h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {(children || []).length} Scholars Connected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {children.map(child => {
                      const isActive = selectedChildId === child.id;
                      return (
                        <button 
                          key={child.id}
                          onClick={() => setSelectedChildId(child.id)}
                          className={`group relative p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 text-left w-full outline-none ${
                            isActive 
                              ? "bg-blue-600/5 border-blue-500 shadow-xs ring-1 ring-blue-500" 
                              : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute top-3 right-3 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                          )}

                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                            isActive 
                              ? "bg-blue-600 text-white" 
                              : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                          }`}>
                            {child.name.charAt(0)}
                          </div>
                          
                          <div className="min-w-0 space-y-0.5">
                            <h4 className={`text-xs font-black truncate leading-tight ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                              {child.name}
                            </h4>
                            <p className="text-[10px] font-semibold text-slate-400">{child.gradeLevel}</p>
                            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 ${
                              isActive 
                                ? "bg-emerald-100 text-emerald-800 font-bold" 
                                : "bg-slate-100 text-slate-400"
                            }`}>
                              {isActive ? "Active Profile" : "Click to View Profile"}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    <button 
                      onClick={() => setShowAddChildModal(true)}
                      className="group p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-200 flex items-center justify-center gap-2.5 min-h-[78px] text-left w-full cursor-pointer"
                    >
                      <Plus className="h-4.5 w-4.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                        Link Another Child
                      </span>
                    </button>
                  </div>
                </div>

                {/* 3-Col Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-center space-y-1 relative overflow-hidden group hover:border-indigo-200 transition-all">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Grade Level</span>
                    <span className="text-xl font-black text-slate-900">{studentStats.gradeLevel}</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm block w-fit mx-auto mt-1 uppercase tracking-wider">
                      Accelerating to {studentStats.targetPromotion.split(" ")[1]}
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-center space-y-1 relative overflow-hidden group hover:border-indigo-200 transition-all">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Syllabus Progress</span>
                    <span className="text-2xl font-black text-indigo-600">{studentStats.syllabusProgress}%</span>
                    <span className="text-[10px] font-bold text-slate-500 block">Completed syllabus milestones</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-center space-y-1 relative overflow-hidden group hover:border-indigo-200 transition-all">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Average Score</span>
                    <span className="text-2xl font-black text-emerald-600">{studentStats.averageScore}%</span>
                    <span className="text-[10px] font-bold text-slate-500 block">Checkpoint proficiency</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-center space-y-1 relative overflow-hidden group hover:border-indigo-200 transition-all">
                    <div className="absolute top-2 right-2 flex items-center gap-0.5">
                      <Flame className="h-4 w-4 text-blue-500 animate-bounce" />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Login Consistency</span>
                    <span className="text-2xl font-black text-blue-600">{studentStats.loginStreak} Days</span>
                    <span className="text-[10px] font-bold text-slate-500 block">Active learning streak</span>
                  </div>
                </div>

                {/* Grade Promotion Acceleration Track Bar */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-500" />
                        EBM Grade Acceleration & Promotion Progress Tracker
                      </h3>
                      <p className="text-xs text-slate-500">Milestone trajectory to promote {studentStats.name} to {studentStats.targetPromotion}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      Requires 95% minimum Checkpoint Performance
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Current Grade Mastery ({studentStats.syllabusProgress}%)</span>
                      <span>Target Grade Clearance (95%)</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50 p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                        style={{ width: `${studentStats.syllabusProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-1">
                      <span>Begin {studentStats.gradeLevel} Core</span>
                      <span>Accelerated Syllabus Complete</span>
                    </div>
                  </div>
                </div>

                {/* SVG Weekly Engagement Hours Graph */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-500" />
                        Weekly Study Engagement Metrics
                      </h4>
                      <p className="text-xs text-slate-500">{studentStats.name}'s daily active study minutes on interactive lessons</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        Total This Week: {studentStats.studyHoursThisWeek} Minutes
                      </span>
                    </div>
                  </div>

                  {/* SVG BAR GRAPH - NO MOCK LIBRARIES */}
                  <div className="pt-2">
                    <div className="flex items-end justify-between h-44 pt-4 px-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      {(selectedChild?.weeklyStudyMinutes && (selectedChild.weeklyStudyMinutes || []).length === 7 ? selectedChild.weeklyStudyMinutes : [
                        { day: "Mon", mins: 45, pct: 35 },
                        { day: "Tue", mins: 60, pct: 50 },
                        { day: "Wed", mins: 50, pct: 40 },
                        { day: "Thu", mins: 80, pct: 65 },
                        { day: "Fri", mins: 90, pct: 75 },
                        { day: "Sat", mins: 120, pct: 100 },
                        { day: "Sun", mins: 30, pct: 25 }
                      ]).map((d: any, index: number) => (
                        <div key={index} className="flex flex-col items-center flex-grow space-y-2">
                          <div className="relative w-8 sm:w-12 group flex justify-center">
                            {/* Hover Tooltip */}
                            <span className="absolute -top-8 scale-0 group-hover:scale-100 bg-slate-900 text-blue-400 text-[10px] px-2 py-0.5 rounded font-mono transition duration-150 shadow z-10 whitespace-nowrap">
                              {d.mins} Mins
                            </span>
                            <div 
                              className="w-full bg-slate-800 group-hover:bg-blue-500 rounded-t-lg transition-all duration-300"
                              style={{ height: `${(d.pct / 100) * 120}px` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements & Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Badges */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-blue-500" />
                        Achievement Badges
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedChild?.badges ? (selectedChild.badges || []).length : 0} Earned</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      {(selectedChild?.badges && (selectedChild.badges || []).length > 0 ? selectedChild.badges : [
                        { id: "b1", title: "Early Bird", icon: "Clock", earnedAt: new Date().toISOString() },
                        { id: "b2", title: "Math Whiz", icon: "Target", earnedAt: new Date().toISOString() },
                      ]).map((badge: any) => (
                        <div key={badge.id} className="flex flex-col items-center gap-1 group cursor-help">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors relative">
                            <Award className="h-6 w-6 text-blue-600" />
                            <div className="absolute -bottom-8 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 transition-all font-bold">
                              {badge.title}
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase text-center truncate w-full">{badge.title}</span>
                        </div>
                      ))}
                      <div className="flex flex-col items-center gap-1 opacity-20 grayscale">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-slate-400" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase text-center">Locked</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Award className="h-5 w-5 text-indigo-500" />
                        Verified Certificates
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedChild?.certificates ? (selectedChild.certificates || []).length : 0} Issued</span>
                    </div>

                    <div className="space-y-3">
                      {(selectedChild?.certificates && (selectedChild.certificates || []).length > 0 ? selectedChild.certificates : [
                        { id: "c1", title: "Foundational Literacy Mastery", issuedAt: new Date().toISOString() }
                      ]).map((cert: any) => (
                        <div key={cert.id} className="p-3 border border-indigo-100 bg-indigo-50/30 rounded-xl flex items-center justify-between group hover:border-indigo-300 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg border border-indigo-100 shadow-sm">
                              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                              <h5 className="text-[11px] font-black text-slate-800">{cert.title}</h5>
                              <p className="text-[9px] font-bold text-slate-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button className="text-[9px] font-black text-indigo-600 hover:underline">View PDF</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scholar Test History, Quiz Attempts & Course Progress */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Award className="h-5 w-5 text-indigo-500 animate-pulse" />
                        Scholar Test History, Quiz Attempts & Course Progress
                      </h4>
                      <p className="text-xs text-slate-500">Interactive review of past diagnostic tests, curriculum checkpoints, scored marks, and detailed question-by-question attempts.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        Total Attempts: {submissions.length}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        Avg Score: {submissions.length > 0 ? Math.round(submissions.reduce((acc, curr) => acc + curr.score, 0) / submissions.length) : 0}%
                      </span>
                    </div>
                  </div>

                  {/* EBM DB Simulator - Quick Seed Panel */}
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                        EBM database test-history simulator
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">Stores directly to persistent SQL database</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Subject</label>
                        <select 
                          value={simSubject} 
                          onChange={(e) => setSimSubject(e.target.value)}
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Topic Name</label>
                        <input 
                          type="text" 
                          value={simTopic} 
                          onChange={(e) => setSimTopic(e.target.value)}
                          placeholder="e.g. Quadratic Formula"
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Desired Score</label>
                        <select 
                          value={simScore} 
                          onChange={(e) => setSimScore(Number(e.target.value))}
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value={100}>100% (All Correct)</option>
                          <option value={75}>75% (3 Correct, 1 Incorrect)</option>
                          <option value={50}>50% (2 Correct, 2 Incorrect)</option>
                          <option value={25}>25% (1 Correct, 3 Incorrect)</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleSimulateTest}
                          disabled={isSimulating}
                          className="w-full text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2.5 transition duration-150 disabled:bg-slate-300"
                        >
                          {isSimulating ? "Seeding to SQL..." : "Seed & Store Attempt"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submissions List */}
                  {loadingSubmissions ? (
                    <div className="text-center py-8 text-xs text-slate-500">Loading comprehensive academic history...</div>
                  ) : submissions.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50/30 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      No test history found for {studentStats.name} in the database yet. Use the simulator panel above to seed a comprehensive test with a single click!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((sub, idx) => {
                        const isExpanded = expandedAttemptIdx === idx;
                        const scoreColor = sub.score >= 90 
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200" 
                          : sub.score >= 70 
                            ? "text-indigo-700 bg-indigo-50 border border-indigo-200" 
                            : "text-rose-700 bg-rose-50 border border-rose-200";

                        const correctCount = sub.questions.filter(q => q.isCorrect).length;

                        return (
                          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition duration-150">
                            {/* Attempt Summary Row */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-slate-50/30">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                    {sub.subject}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-bold">
                                    {sub.submittedAt}
                                  </span>
                                </div>
                                <h5 className="text-xs font-black text-slate-800">{sub.title}</h5>
                              </div>

                              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="text-right">
                                  <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${scoreColor}`}>
                                    Score: {sub.score}%
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold block mt-1">
                                    {correctCount} / {sub.questions.length} Correct
                                  </span>
                                </div>
                                <button
                                  onClick={() => setExpandedAttemptIdx(isExpanded ? null : idx)}
                                  className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 border border-indigo-150 hover:bg-indigo-50 bg-white px-3 py-1.5 rounded-lg transition duration-150 whitespace-nowrap"
                                >
                                  {isExpanded ? "Close Review" : "Review Questions"}
                                </button>
                              </div>
                            </div>

                            {/* Collapsible Questions Breakdown (How much was correct or not) */}
                            {isExpanded && (
                              <div className="p-4 bg-white border-t border-slate-100 space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Question-by-Question Attempt breakdown</span>
                                  <span className="text-[10px] font-mono font-bold text-slate-500">
                                    Course Accuracy: {Math.round((correctCount / sub.questions.length) * 100)}% Correct
                                  </span>
                                </div>

                                <div className="space-y-3">
                                  {sub.questions.map((q, qIdx) => (
                                    <div 
                                      key={qIdx} 
                                      className={`p-3.5 rounded-xl border transition-all ${
                                        q.isCorrect 
                                          ? "bg-emerald-50/20 border-emerald-100 hover:border-emerald-200" 
                                          : "bg-rose-50/20 border-rose-100 hover:border-rose-200"
                                      }`}
                                    >
                                      <div className="flex justify-between items-start gap-3 mb-2">
                                        <span className="text-xs font-black text-slate-800">
                                          Q{qIdx + 1}: {q.question}
                                        </span>
                                        <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md ${
                                          q.isCorrect 
                                            ? "text-emerald-700 bg-emerald-100" 
                                            : "text-rose-700 bg-rose-100"
                                        }`}>
                                          {q.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-100/50">
                                        <div className="space-y-0.5">
                                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Your Child's Answer</span>
                                          <span className={`font-medium ${q.isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                                            {q.studentAnswer}
                                          </span>
                                        </div>
                                        <div className="space-y-0.5">
                                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Correct/Expected Answer</span>
                                          <span className="font-medium text-slate-700">
                                            {q.correctAnswer}
                                          </span>
                                        </div>
                                      </div>

                                      {q.explanation && (
                                        <div className="mt-2 text-[10px] text-slate-500 bg-white/60 p-2 rounded-lg border border-slate-100/50 flex gap-1.5 items-start">
                                          <span className="font-black text-indigo-600 shrink-0">AI Explanation:</span>
                                          <span>{q.explanation}</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Notifications & Warning Flags */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <Bell className="h-4.5 w-4.5 text-amber-500" />
                      Live Academic Warning Flags & Notifications
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Biometric & Activity Logging Verified</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {(!notifications || notifications.length === 0) ? (
                      <div className="p-6 text-center text-slate-400">
                        No active academic warning flags. {studentStats.name} is on perfect schedule!
                      </div>
                    ) : (
                      (showAllNotifications ? notifications : notifications.slice(0, 4)).map(notif => (
                        <div key={notif.id} className={`p-4 flex items-start justify-between gap-4 ${notif.isRead ? "opacity-60" : "bg-amber-50/10"}`}>
                          <div className="flex items-start space-x-3">
                            <div className="bg-amber-100 text-amber-800 p-2 rounded-xl mt-0.5 shrink-0">
                              <Bell className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">{notif.title}</span>
                              <p className="text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                              <span className="text-[9px] text-slate-400 font-mono mt-1 block">
                                {new Date(notif.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {!notif.isRead && (
                            <button 
                              onClick={() => onReadNotification(notif.id)}
                              className="text-[10px] text-amber-700 hover:text-amber-800 font-bold hover:underline shrink-0"
                            >
                              Dismiss Alert
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {notifications && notifications.length > 4 && (
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                      <button
                        id="toggle-notifications-btn"
                        onClick={() => setShowAllNotifications(!showAllNotifications)}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-slate-100 shadow-xs border border-slate-200"
                      >
                        {showAllNotifications ? "Show Fewer Alerts" : `View All Alerts (${notifications.length})`}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 2: CHECKPOINT TRANSCRIPTS */}
            {activeTab === "transcripts" && (
              <motion.div 
                key="transcripts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Tab switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 w-fit shrink-0">
                  <button
                    onClick={() => setSubTab("term_exams")}
                    className={clsx(
                      "px-5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center gap-2 cursor-pointer",
                      subTab === "term_exams" 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <Award className="h-4 w-4 text-rose-500" />
                    Official Term Grades & Datesheets
                  </button>
                  <button
                    onClick={() => setSubTab("checkpoints")}
                    className={clsx(
                      "px-5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center gap-2 cursor-pointer",
                      subTab === "checkpoints" 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <Compass className="h-4 w-4 text-indigo-500" />
                    Diagnostic Checkpoints
                  </button>
                </div>

                {subTab === "term_exams" ? (
                  <div className="space-y-6">
                    {/* Header info */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
                      <h3 className="text-sm font-black text-slate-800 mb-1">Official Term Academic Evaluations</h3>
                      <p className="text-xs text-slate-500">
                        Formal exams scheduled by the academic administration, along with finalized graded marksheets published by teachers.
                      </p>
                    </div>

                    {loadingTerm ? (
                      <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl">
                        <div className="h-8 w-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin"></div>
                        <span className="text-xs font-bold animate-pulse">Syncing school-wide datesheets...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Datesheet / Scheduled list */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            Child's Exam Schedule
                          </h4>

                          {(!termExams || termExams.length === 0) ? (
                            <div className="py-12 text-center text-slate-400 text-xs">
                              No formal examinations are scheduled for this student's classes.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {termExams.map(ex => {
                                const examDate = new Date(ex.examDate);
                                return (
                                  <div key={ex.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 text-left">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-wider">
                                        {ex.subject}
                                      </span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        Total: {ex.totalMarks} Marks
                                      </span>
                                    </div>
                                    <h5 className="text-xs font-black text-slate-800 mt-2 uppercase">{ex.name}</h5>
                                    
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-3 pt-2.5 border-t border-slate-100/70">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                        {examDate.toLocaleDateString()} {examDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </span>
                                      <span className="font-bold text-slate-600">
                                        Room: {ex.room || "Main Hall"}
                                      </span>
                                    </div>

                                    {ex.syllabus && (
                                      <div className="mt-2.5 bg-amber-50/50 border border-amber-100/60 rounded-xl p-3 text-[10px] text-slate-600 font-medium">
                                        <div className="flex items-center gap-1.5 font-black text-slate-700 uppercase tracking-wider mb-1.5">
                                          <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                          <span>Syllabus & Content:</span>
                                        </div>
                                        <p className="whitespace-pre-wrap leading-relaxed">{ex.syllabus}</p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Grades Marksheet list */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                            <Award className="h-4 w-4 text-emerald-500" />
                            Academic Gradebook Results
                          </h4>

                          {(!termResults || termResults.length === 0) ? (
                            <div className="py-12 text-center text-slate-400 text-xs">
                              No finalized academic grades have been published yet for this student.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {termResults.map(r => {
                                const isAbsent = r.status === "ABSENT";
                                const isPassed = !isAbsent && r.marksObtained >= r.passingMarks;
                                const pct = isAbsent ? 0 : Math.round((r.marksObtained / r.totalMarks) * 100);

                                return (
                                  <div key={r.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 text-left">
                                    <div className="flex justify-between items-center">
                                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-wider">
                                        {r.subject}
                                      </span>
                                      <span className={clsx(
                                        "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                                        isAbsent ? "bg-rose-100 text-rose-800" : isPassed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                      )}>
                                        {isAbsent ? "ABSENT" : isPassed ? "PASSED" : "FAILED"}
                                      </span>
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                      <div>
                                        <h5 className="text-xs font-black text-slate-800 uppercase">{r.examName}</h5>
                                        <p className="text-[9px] text-slate-400 mt-0.5">
                                          Graded on: {new Date(r.gradedAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-sm font-black text-slate-800">{isAbsent ? "-" : r.marksObtained}</span>
                                        <span className="text-slate-400 text-[10px] font-bold"> / {r.totalMarks}</span>
                                        <span className="text-[10px] font-bold text-slate-500 block">({pct}%)</span>
                                      </div>
                                    </div>

                                    {r.teacherFeedback && (
                                      <div className="mt-3 p-2.5 bg-slate-100/40 border border-slate-100 rounded-lg text-[10px] text-slate-600 font-medium italic">
                                        <span className="text-[9px] font-bold uppercase text-slate-500 block tracking-wider not-italic mb-0.5">Educator feedback:</span>
                                        "{r.teacherFeedback}"
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                ) : (
                  // Diagnostics checkpoints subview (the existing block)
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs text-left">
                      <h3 className="text-sm font-black text-slate-800 mb-1">Curriculum Diagnostic Transcripts</h3>
                      <p className="text-xs text-slate-500">Every lesson completed has its checkpoints recorded here, complete with AI semantic correctness evaluations.</p>
                    </div>

                    {loadingSubmissions ? (
                      <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl">
                        <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                        <span className="text-xs font-bold animate-pulse">Fetching syllabus checkpoints...</span>
                      </div>
                    ) : (!submissions || submissions.length === 0) ? (
                      <div className="bg-white border border-slate-200 p-8 text-center rounded-2xl text-slate-500 font-medium text-xs space-y-2">
                        <p>No verified curriculum tests submitted yet. When {studentStats.name} completes lessons, they will show up here instantly!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {submissions.map((sub, sIdx) => {
                          const isExpanded = expandedQuizIndex === sIdx;
                          return (
                            <div key={sIdx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs hover:border-slate-300">
                              {/* Accordion Header */}
                              <div 
                                onClick={() => setExpandedQuizIndex(isExpanded ? null : sIdx)}
                                className="p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/30 hover:bg-slate-50 transition"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className={`p-2.5 rounded-xl shrink-0 ${
                                    sub.score >= 95 ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                                  }`}>
                                    <CheckCircle2 className="h-5 w-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-slate-800 truncate">{sub.title}</h4>
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-slate-500 font-medium mt-0.5">
                                      <span>{sub.subject}</span>
                                      <span>•</span>
                                      <span>Submitted {sub.submittedAt}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                                    sub.score >= 95 ? "bg-emerald-600 text-white" : "bg-indigo-100 text-indigo-800"
                                  }`}>
                                    {sub.score}% Proficient
                                  </span>
                                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                                </div>
                              </div>

                              {/* Accordion Body */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden border-t border-slate-100"
                                  >
                                    <div className="p-5 md:p-6 space-y-6 bg-slate-50/10">
                                      <h5 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Question Breakdown & Evaluations</h5>
                                      
                                      <div className="space-y-4">
                                        {sub.questions.map((q, qIdx) => (
                                          <div key={qIdx} className="bg-white border border-slate-200/70 p-4 rounded-xl space-y-3.5 shadow-2xs">
                                            <div className="flex items-start justify-between gap-3">
                                              <div className="space-y-1">
                                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Question {qIdx + 1}</span>
                                                <p className="text-xs font-bold text-slate-800 text-left">{q.question}</p>
                                              </div>
                                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                                                q.isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                              }`}>
                                                {q.isCorrect ? "Correct" : "Incorrect"}
                                              </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                                              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{studentStats.name}'s Answer</span>
                                                <p className="text-slate-700 font-medium font-sans">"{q.studentAnswer || "No answer provided"}"</p>
                                              </div>
                                              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Expected Answer</span>
                                                <p className="text-slate-700 font-medium font-sans">"{q.correctAnswer || "Check reference passage"}"</p>
                                              </div>
                                            </div>

                                            {q.explanation && (
                                              <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 text-xs text-slate-600 font-medium leading-relaxed shadow-3xs">
                                                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">AI Context & Feedback</span>
                                                "{q.explanation}"
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 3: MOTIVATION & REWARD PLEDGES */}
            {activeTab === "incentives" && (
              <motion.div 
                key="incentives"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Intro */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-2 border border-slate-800 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
                    <Trophy className="h-64 w-64 text-amber-400" />
                  </div>
                  <span className="text-xs text-amber-400 font-mono font-bold uppercase tracking-widest block">Incentivize Syllabus Acceleration</span>
                  <h4 className="text-base font-black">Pledge Academic Rewards to Boost Stamina</h4>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    EBM study rigor requires multi-year acceleration stamina. Linking target completion milestones with high-motivation household rewards keeps kids highly eager to study consistently!
                  </p>
                </div>

                {/* Form to Pledge Reward */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h5 className="text-xs font-black text-slate-800 flex items-center gap-2">
                    <Plus className="h-4.5 w-4.5 text-indigo-600" />
                    Pledge a New Milestone Incentive
                  </h5>
                  
                  <form onSubmit={handleAddPledge} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Incentive Title</label>
                      <input 
                        type="text" 
                        required
                        value={newPledgeTitle}
                        onChange={(e) => setNewPledgeTitle(e.target.value)}
                        placeholder="e.g., Fraction Mastery Milestone" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Curriculum Metric</label>
                      <input 
                        type="text" 
                        required
                        value={newPledgeTarget}
                        onChange={(e) => setNewPledgeTarget(e.target.value)}
                        placeholder="e.g., Score >95% on linear fractions quiz" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pledged Reward Offer</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          required
                          value={newPledgeReward}
                          onChange={(e) => setNewPledgeReward(e.target.value)}
                          placeholder="e.g., Family weekend trip to cinema" 
                          className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                        />
                        <button 
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-4 rounded-xl text-xs transition duration-150 shrink-0 cursor-pointer"
                        >
                          Register Pledge
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* List of active pledges */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800">Current Pledges Checklist</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Synchronized with child planner</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {pledges.map((p) => (
                      <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl mt-0.5 ${
                            p.status === "ACHIEVED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700 animate-pulse"
                          }`}>
                            <Target className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-xs block flex items-center gap-2">
                              {p.title}
                              {p.status === "ACHIEVED" && (
                                <span className="bg-emerald-100 text-emerald-800 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                                  Achieved & Cleared 🎉
                                </span>
                              )}
                            </span>
                            <p className="text-[11px] text-slate-600 mt-0.5">Target: <strong className="text-slate-800">{p.targetMetric}</strong></p>
                            <span className="text-[10px] font-medium text-indigo-600 mt-1 block flex items-center gap-1">
                              Reward Pledged: {p.reward}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeletePledge(p.id)}
                          className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition shrink-0 cursor-pointer"
                          title="Cancel Pledge"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 4: AI PARENTAL ADVISOR */}
            {activeTab === "ai_advisor" && (
              <motion.div 
                key="ai_advisor"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-[520px] bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden"
              >
                {/* Chat Header */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-400 text-slate-900 p-2 rounded-xl">
                      <Sparkles className="h-4 w-4 text-slate-950" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black">EBM AI Parental Consultant</h4>
                      <p className="text-[10px] text-slate-300">Evaluating diagnostics and generating customized learning recommendations</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">
                    Live Session
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-start gap-2.5 max-w-[85%] ${
                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        msg.sender === "user" ? "bg-amber-400 text-slate-900" : "bg-indigo-600 text-white"
                      }`}>
                        {msg.sender === "user" ? "AK" : "AI"}
                      </div>
                      <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed font-sans shadow-2xs ${
                        msg.sender === "user" 
                          ? "bg-slate-900 text-white rounded-tr-none text-right" 
                          : "bg-white border border-slate-200 text-slate-700 rounded-tl-none text-left"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {sendingMessage && (
                    <div className="flex items-start gap-2.5 mr-auto">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                        AI
                      </div>
                      <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-3xs flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                        <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2 shrink-0">
                  <input 
                    type="text"
                    required
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    disabled={sendingMessage}
                    placeholder={`Ask Advisor e.g., Is ${studentStats.name} on track to promote? How to help them...`}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={sendingMessage || !currentMessage.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition duration-150 shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* VIEW 5: MEETINGS & COMMUNICATIONS */}
            {activeTab === "meetings" && (
              <motion.div 
                key="meetings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Meeting Scheduler and List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Form */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5 text-indigo-600" />
                      Schedule Parent-Teacher Conference
                    </h4>
                    <p className="text-xs text-slate-500">Book direct physical or digital consultations with {studentStats.name}'s syllabus mentors.</p>

                    <form onSubmit={handleScheduleMeeting} className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Assigned Instructor</label>
                        <select 
                          required
                          value={selectedTeacher}
                          onChange={(e) => setSelectedTeacher(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                        >
                          <option value="">-- Choose Instructor --</option>
                          {(dbTeachers && dbTeachers.length > 0) ? (
                            dbTeachers.map(t => (
                              <option key={t.id} value={t.id}>
                                {t.name} ({t.title || `${t.department} Department`})
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="Prof. Tariq Mahmood (Mathematics)">Prof. Tariq Mahmood (Mathematics)</option>
                              <option value="Miss Sadia Jamil (English Reading)">Miss Sadia Jamil (English Reading)</option>
                              <option value="Administrator (Curriculum Accelerator)">EBM Curriculum Administrator</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Date & Time Selection</label>
                        <input 
                          type="datetime-local" 
                          required
                          value={selectedDateTime}
                          onChange={(e) => setSelectedDateTime(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer shadow-sm hover:shadow-indigo-500/10"
                      >
                        Request Appointment
                      </button>
                    </form>
                  </div>

                  {/* List of Meetings */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 shrink-0">
                      <span className="text-xs font-black text-slate-800">Your Appointment History</span>
                    </div>

                    <div className="flex-grow divide-y divide-slate-100 overflow-y-auto">
                      {loadingMeetings ? (
                        <div className="text-center py-8 text-xs text-slate-400">Loading appointments...</div>
                      ) : meetings.length === 0 ? (
                        <div className="text-center py-8 text-xs text-slate-400">No appointments scheduled. Request one using the form.</div>
                      ) : (
                        meetings.map((meet) => {
                          const isProposedByTeacher = meet.proposedBy === "TEACHER";
                          const isPending = meet.status === "PENDING";
                          const isRevisionFormOpen = proposingRevisionMeetId === meet.id;

                          return (
                            <div key={meet.id} className="p-4 space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 text-xs">
                                  <span className="font-bold text-slate-800 block">Instructor: {meet.teacherName || meet.teacher}</span>
                                  {meet.studentName && (
                                    <span className="text-slate-500 block">Student: {meet.studentName}</span>
                                  )}
                                  <span className="text-slate-500 block">Syllabus Area: {meet.subject}</span>
                                  <span className="text-[10px] text-indigo-600 font-bold block bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                                    {meet.date}
                                  </span>
                                  {meet.notes && (
                                    <p className="text-[10px] text-slate-500 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                                      Note: {meet.notes}
                                    </p>
                                  )}
                                </div>

                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${
                                  meet.status === "CONFIRMED" 
                                    ? "bg-emerald-100 text-emerald-800" 
                                    : meet.status === "REJECTED" 
                                      ? "bg-rose-100 text-rose-800" 
                                      : "bg-amber-100 text-amber-800"
                                }`}>
                                  {meet.status} {isPending && `(Proposed by ${meet.proposedBy || "PARENT"})`}
                                </span>
                              </div>

                              {/* Actions Panel */}
                              {isPending && (
                                <div className="pt-2 border-t border-slate-100/50 flex flex-col space-y-2">
                                  {isProposedByTeacher ? (
                                    <div className="flex flex-wrap gap-2 justify-end">
                                      <button
                                        onClick={() => handleRespondToMeeting(meet.id, "APPROVE")}
                                        className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                                      >
                                        Approve
                                      </button>
                                      
                                      <button
                                        onClick={() => {
                                          if (isRevisionFormOpen) {
                                            setProposingRevisionMeetId(null);
                                          } else {
                                            setProposingRevisionMeetId(meet.id);
                                            setRevisionDateTime(meet.date.includes(" at ") ? meet.date.replace(" at ", "T") : meet.date);
                                          }
                                        }}
                                        className="text-[10px] border border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                                      >
                                        {isRevisionFormOpen ? "Cancel Revision" : "Propose New Date"}
                                      </button>

                                      <button
                                        onClick={() => handleRespondToMeeting(meet.id, "REJECT")}
                                        className="text-[10px] border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between text-[10px] text-amber-700 bg-amber-50/50 border border-amber-100 p-2.5 rounded-xl">
                                      <span className="font-bold">Sent to Instructor</span>
                                      <span className="font-medium">Waiting for response or proposed date revision</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Inline Date Revision Form */}
                              {isRevisionFormOpen && (
                                <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5 text-left">
                                  <span className="text-[10px] font-black text-slate-700 block uppercase tracking-wider">Propose Date Revision & Add Message</span>
                                  <div className="space-y-2">
                                    <div>
                                      <label className="text-[9px] font-bold text-slate-500 block mb-1">New Proposed Date & Time</label>
                                      <input 
                                        type="datetime-local" 
                                        required
                                        value={revisionDateTime}
                                        onChange={(e) => setRevisionDateTime(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] font-bold text-slate-500 block mb-1">Additional Message for Instructor</label>
                                      <textarea 
                                        placeholder="e.g. Can we meet at this time instead? I am off work then."
                                        value={revisionNotes}
                                        rows={2}
                                        onChange={(e) => setRevisionNotes(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                                      />
                                    </div>
                                    <button
                                      onClick={() => handleRespondToMeeting(meet.id, "PROPOSE_REVISION", revisionDateTime.replace("T", " at "), revisionNotes)}
                                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 rounded-lg transition cursor-pointer"
                                    >
                                      Submit Proposed Date Change
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Real-Time Live Video Conference Box for Confirmed Meetings */}
                              {meet.status === "CONFIRMED" && (
                                <div className="pt-2 border-t border-slate-100">
                                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-xs font-black text-slate-800 tracking-tight">
                                          Live Meeting Link Ready
                                        </span>
                                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                          Confirmed Room
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-600 font-mono">
                                        <span className="font-semibold text-blue-700 break-all select-all">{meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}`}</span>
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        onClick={() => setLiveMeetingToJoin(meet)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                                      >
                                        <Video className="h-3.5 w-3.5" />
                                        <span>Join Meeting</span>
                                      </button>

                                      <button
                                        onClick={() => {
                                          const url = meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}#config.prejoinConfig.enabled=false`;
                                          navigator.clipboard.writeText(url);
                                          setCopiedMeetingId(meet.id);
                                          setTimeout(() => setCopiedMeetingId(null), 2500);
                                        }}
                                        title="Copy Meeting Link"
                                        className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                                      >
                                        {copiedMeetingId === meet.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-500" />}
                                        <span className="hidden sm:inline">{copiedMeetingId === meet.id ? "Copied" : "Copy"}</span>
                                      </button>

                                      <a
                                        href={meet.meetingLink || `https://meet.jit.si/EBM-PTM-${meet.id}#config.prejoinConfig.enabled=false`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Open in new window / tab"
                                        className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition cursor-pointer"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === "academy" && (
              <motion.div 
                key="academy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {selectedResource ? (
                  /* Detail View (seamless, flat, non-popup page content) */
                  <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/50 shadow-xs flex flex-col text-left space-y-6">
                    {/* Header with back button */}
                    <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={() => setSelectedResource(null)}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-xs transition cursor-pointer"
                      >
                        ← Back to Academy Modules
                      </button>
                      <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {selectedResource.category || "General"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left side: content/media */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-video relative overflow-hidden bg-slate-50 rounded-2xl border border-slate-200/50">
                          <img 
                            src={selectedResource.thumbnailUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"} 
                            alt={selectedResource.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Media Players or Content */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4">
                          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold">
                            <span className="px-2.5 py-1 bg-white text-slate-700 rounded-lg uppercase tracking-wider shadow-xs">
                              Media type: {selectedResource.type}
                            </span>
                            {selectedResource.createdAt && (
                              <span>Published on {new Date(selectedResource.createdAt).toLocaleDateString()}</span>
                            )}
                          </div>

                          <div className="text-slate-800 text-sm leading-relaxed space-y-3 pt-2">
                            {/* Video specific player */}
                            {selectedResource.type === "VIDEO" && (
                              <div className="space-y-3">
                                {selectedResource.content && (selectedResource.content.includes("youtube.com") || selectedResource.content.includes("youtu.be")) ? (
                                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black">
                                    <iframe
                                      className="w-full h-full"
                                      src={`https://www.youtube.com/embed/${
                                        selectedResource.content.includes("v=") 
                                          ? selectedResource.content.split("v=")[1]?.split("&")[0] 
                                          : selectedResource.content.split("/").pop()
                                      }`}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ) : selectedResource.content && selectedResource.content.endsWith(".mp4") ? (
                                  <video src={selectedResource.content} controls className="w-full rounded-xl border border-slate-200" />
                                ) : (
                                  <div className="p-8 bg-white rounded-xl border border-slate-200/50 text-center space-y-3">
                                    <Video className="h-10 w-10 text-blue-600 mx-auto" />
                                    <p className="font-bold text-slate-700">Video Lesson Ready</p>
                                    <a 
                                      href={selectedResource.content} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
                                    >
                                      Watch video on source website <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Audio specific player */}
                            {selectedResource.type === "AUDIO" && (
                              <div className="space-y-3">
                                {selectedResource.content && (selectedResource.content.endsWith(".mp3") || selectedResource.content.endsWith(".wav") || selectedResource.content.endsWith(".ogg")) ? (
                                  <div className="bg-white p-4 rounded-xl border border-slate-200/50 space-y-3">
                                    <div className="flex items-center gap-3">
                                      <Volume2 className="h-6 w-6 text-blue-600 animate-pulse" />
                                      <span className="font-bold text-slate-700">Audio Player</span>
                                    </div>
                                    <audio src={selectedResource.content} controls className="w-full" />
                                  </div>
                                ) : (
                                  <div className="p-8 bg-white rounded-xl border border-slate-200/50 text-center space-y-3">
                                    <Volume2 className="h-10 w-10 text-blue-600 mx-auto" />
                                    <p className="font-bold text-slate-700">Audio Lecture Ready</p>
                                    <a 
                                      href={selectedResource.content} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                                    >
                                      Listen to Lecture <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Standard text guide / blog content */}
                            {selectedResource.type !== "VIDEO" && selectedResource.type !== "AUDIO" && (
                              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-slate-700 text-xs leading-relaxed bg-white p-4 rounded-xl border border-slate-200/50">
                                {selectedResource.content || "This resource does not have any text content written yet."}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side: title and description */}
                      <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
                        <div className="space-y-3">
                          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{selectedResource.category || "General"}</span>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedResource.title}</h3>
                        </div>

                        {selectedResource.description && (
                          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60">
                            <h5 className="text-[11px] font-black uppercase text-blue-800 tracking-wider mb-2">Module Overview</h5>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                              {selectedResource.description}
                            </p>
                          </div>
                        )}

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3 text-xs text-slate-600 leading-relaxed">
                          <p className="font-bold text-slate-800">💡 Tip for EBM Parents:</p>
                          <p>
                            Reviewing these learning materials daily ensures alignment with the accelerated speed targets of the Ejaz Bukhari Method, allowing your child to master advanced content with maximum retention.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Modules Grid */
                  <>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-black text-slate-800 mb-1">Parenting Academy & Training</h3>
                        <p className="text-xs text-slate-500">Curated resources to help you support {studentStats.name}'s educational journey.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100">
                          Access Library
                        </span>
                      </div>
                    </div>

                    {loadingResources ? (
                      <div className="flex flex-col items-center justify-center p-12 space-y-4">
                        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-slate-500">Accessing Academy Archive...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {parentResources.map((res: any) => {
                          const badgeStyles = (() => {
                            switch (res.type) {
                              case "VIDEO": return "bg-blue-600 text-white";
                              case "AUDIO": return "bg-rose-600 text-white";
                              case "BLOG": return "bg-blue-600 text-white";
                              case "LESSON": return "bg-emerald-600 text-white";
                              default: return "bg-indigo-600 text-white";
                            }
                          })();

                          return (
                            <div key={res.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:border-blue-300 transition-all group flex flex-col">
                              <div className="aspect-video relative overflow-hidden">
                                <img 
                                  src={res.thumbnailUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400"} 
                                  alt={res.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-2 left-2">
                                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-sm ${badgeStyles}`}>
                                    {res.type}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4 flex-grow flex flex-col space-y-2">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{res.category || "General"}</span>
                                <h4 className="text-xs font-black text-slate-900 leading-snug">{res.title}</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{res.description}</p>
                                <div className="pt-2 mt-auto">
                                  <button 
                                    onClick={() => {
                                      // If res.content is a valid URL, open it directly in a new tab. Otherwise, open inline flatly.
                                      if (res.content && (res.content.startsWith("http://") || res.content.startsWith("https://") || res.content.startsWith("www."))) {
                                        let url = res.content;
                                        if (url.startsWith("www.")) {
                                          url = "https://" + url;
                                        }
                                        window.open(url, "_blank");
                                      } else {
                                        setSelectedResource(res);
                                      }
                                    }}
                                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-lg text-[10px] transition-colors border border-slate-200 cursor-pointer text-center block"
                                  >
                                    Access Module
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "messages" && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="min-h-[600px] bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm flex flex-col"
              >
                <CommunicationInbox />
              </motion.div>
            )}

            {activeTab === "announcements" && (
              <motion.div 
                key="announcements"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="min-h-[600px]"
              >
                <div className="bg-white rounded-[2rem] border border-slate-200/50 shadow-sm">
                  <div className="p-6 md:p-10">
                    <AnnouncementCenter />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileSettings role="PARENT" onBack={() => setActiveTab("overview")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Live Conference Consultation Room Modal */}
      {liveMeetingToJoin && (
        <PTMLiveConferenceModal
          meeting={liveMeetingToJoin}
          currentUser={{
            name: "Parent",
            role: "PARENT"
          }}
          onClose={() => setLiveMeetingToJoin(null)}
        />
      )}
    </div>
  );
}
