import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  BookOpen,
  Plus,
  Trash2,
  FileText,
  Upload,
  Sparkles,
  Check,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Calculator,
  X,
  FileJson,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Clock,
  Search,
  Filter,
  Edit2,
  Image as ImageIcon,
  Save,
  Book,
  FilePlus,
  Sparkle,
  Zap,
  Copy
} from "lucide-react";
import { useTeacherStore } from "./teacher.store";

export interface Question {
  id: string;
  questionNumber?: string;
  sectionTitle?: string;
  section?: string;
  context?: string;
  question: string;
  type: "MCQ" | "SHORT" | "FIB" | "ACTIVITY";
  options?: string[];
  correctAnswer?: string;
  acceptedAnswers?: string[];
}

export interface CurriculumItem {
  id: string;
  classId?: string;
  title: string;
  testNumber?: string;
  subject: string; // e.g. "MATH", "ENGLISH", "SCIENCE"
  gradeLevel: string; // e.g. "Grade 1", "Grade 2"
  type?: "PRACTICE_QUESTION" | "COMPREHENSION";
  unitTitle?: string;
  skillFocus?: string;
  lifeConnection?: string;
  content: string;
  questions: Question[] | string;
  duration?: number; // duration in minutes
  thumbnailUrl?: string;
  isDiagnostic?: number;
  price?: string;
  whatsappNumber?: string;
  createdAt?: string;
}

export function getQuestionsArray(questions: any): Question[] {
  if (!questions) return [];
  if (Array.isArray(questions)) return questions;
  if (typeof questions === "string") {
    try {
      const parsed = JSON.parse(questions);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

const THUMBNAIL_PRESETS = [
  {
    name: "Mathematics",
    url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Literature & Reading",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Creative Writing",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Classroom / Rules",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Science & Discovery",
    url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Art & Creation",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80"
  }
];

export function CurriculumManager() {
  const classes = useTeacherStore((state) => state.classes);
  const students = useTeacherStore((state) => state.students);
  const fetchStudents = useTeacherStore((state) => state.fetchStudents);
  const setIsSidebarCollapsed = useTeacherStore((state) => state.setIsSidebarCollapsed);

  const [curriculums, setCurriculums] = useState<CurriculumItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CurriculumItem | null>(null);

  // Automatically collapse sidebar when opening a course
  useEffect(() => {
    if (selectedItem) {
      setIsSidebarCollapsed(true);
    }
  }, [selectedItem, setIsSidebarCollapsed]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Submissions and tabs for progress tracking
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [activePaneTab, setActivePaneTab] = useState<"preview" | "progress">("preview");
  const [selectedTeacherReviewSubmission, setSelectedTeacherReviewSubmission] = useState<any | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClassId, setFilterClassId] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterDuration, setFilterDuration] = useState("All");

  // Manual Creation / Edit Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CurriculumItem | null>(null);

  // Dual-section importer states
  const [isDualModalOpen, setIsDualModalOpen] = useState(false);
  const [dualComprehension, setDualComprehension] = useState("");
  const [dualAnswerKey, setDualAnswerKey] = useState("");
  const [isDualParsing, setIsDualParsing] = useState(false);
  const [dualParseError, setDualParseError] = useState<string | null>(null);
  const [isUploadingComp, setIsUploadingComp] = useState(false);
  const [isUploadingAns, setIsUploadingAns] = useState(false);

  // Direct JSON importer states
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [isJsonParsing, setIsJsonParsing] = useState(false);
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formTestNumber, setFormTestNumber] = useState("");
  const [formClassId, setFormClassId] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formType, setFormType] = useState<"PRACTICE_QUESTION" | "COMPREHENSION">("PRACTICE_QUESTION");
  const [formGradeLevel, setFormGradeLevel] = useState("Grade 2");
  const [formUnitTitle, setFormUnitTitle] = useState("");
  const [formSkillFocus, setFormSkillFocus] = useState("");
  const [formLifeConnection, setFormLifeConnection] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formDuration, setFormDuration] = useState<number>(20);
  const [formThumbnailUrl, setFormThumbnailUrl] = useState("");
  const [formIsDiagnostic, setFormIsDiagnostic] = useState(0);
  const [formPrice, setFormPrice] = useState("");
  const [formWhatsappNumber, setFormWhatsappNumber] = useState("+923304541573");
  const [formQuestions, setFormQuestions] = useState<Question[]>([]);

  // Sub-editor fields for adding questions inside form
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState<"MCQ" | "SHORT" | "FIB" | "ACTIVITY">("MCQ");
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>(["", ""]);
  const [newQuestionAnswer, setNewQuestionAnswer] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Quiz interactive practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [aiEvaluations, setAiEvaluations] = useState<Record<string, { status: string; score: number; feedback: string; loading?: boolean }>>({});

  const handleAIEvaluateShort = async (questionId: string, questionText: string, userAnswer: string, correctAnswer: string) => {
    if (!userAnswer || !userAnswer.trim()) return;

    // Set loading state for this question
    setAiEvaluations(prev => ({
      ...prev,
      [questionId]: { status: "", score: 0, feedback: "", loading: true }
    }));

    try {
      const res = await fetch("/api/curriculum/evaluate-short", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          passage: selectedItem?.content || "",
          question: questionText,
          userAnswer: userAnswer,
          correctAnswer: correctAnswer
        })
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setAiEvaluations(prev => ({
          ...prev,
          [questionId]: {
            status: data.evaluation.status,
            score: data.evaluation.score,
            feedback: data.evaluation.feedback,
            loading: false
          }
        }));
      } else {
        throw new Error("Evaluation response invalid.");
      }
    } catch (error: any) {
      console.error("Failed to evaluate with AI:", error);
      setAiEvaluations(prev => ({
        ...prev,
        [questionId]: {
          status: "partially_correct",
          score: 50,
          feedback: "Could not perform AI evaluation. Please verify manually against reference answer.",
          loading: false
        }
      }));
    }
  };

  // Fetch all curriculums
  const fetchCurriculums = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/curriculum");
      const data = await res.json();
      if (data.success) {
        setCurriculums(data.curriculum);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch("/api/teacher/submissions");
      const data = await res.json();
      if (data.success) {
        setAllSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error("Error fetching submissions:", e);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchCurriculums();
    fetchAllSubmissions();
    fetchStudents();
  }, [fetchStudents]);

  // Filter & Search Logic
  const filteredCurriculums = curriculums.filter((item) => {
    // Title search
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.unitTitle && item.unitTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.testNumber && item.testNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Subject filter
    const matchesSubject = filterSubject === "All" || item.subject === filterSubject;
    
    // Grade Level filter
    const matchesClass = filterClassId === "All" || item.classId === filterClassId;

    // Duration filter
    let matchesDuration = true;
    const dur = item.duration || 20;
    if (filterDuration === "short") {
      matchesDuration = dur <= 15;
    } else if (filterDuration === "medium") {
      matchesDuration = dur > 15 && dur <= 30;
    } else if (filterDuration === "long") {
      matchesDuration = dur > 30;
    }

    return matchesSearch && matchesSubject && matchesClass && matchesDuration;
  }).sort((a, b) => {
    const parseTestNum = (str?: string | null) => {
      if (!str) return 999999;
      const match = str.match(/\d+/);
      return match ? parseInt(match[0], 10) : 999999;
    };
    const numA = parseTestNum(a.testNumber);
    const numB = parseTestNum(b.testNumber);
    if (numA !== numB) return numA - numB;
    return (a.testNumber || "").localeCompare(b.testNumber || "", undefined, { numeric: true });
  });

  // Extract unique Grade Levels and Subjects for filters
  const availableGrades = ["All", ...Array.from(new Set(curriculums.map(c => c.gradeLevel).filter(Boolean)))];
  const availableSubjects = ["All", "MATH", "ENGLISH", "SCIENCE", "HISTORY"];

  // Open modal for manual creation
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormTestNumber("");
    setFormClassId(classes.length > 0 ? classes[0].id : "");
    setFormSubject(classes.length > 0 && classes[0].subjects && classes[0].subjects.length > 0 ? classes[0].subjects[0] : (classes.length > 0 ? (classes[0].subject || "ENGLISH") : "ENGLISH"));
    setFormType("PRACTICE_QUESTION");
    setFormGradeLevel("Grade 2");
    setFormUnitTitle("");
    setFormSkillFocus("");
    setFormLifeConnection("");
    setFormContent("");
    setFormDuration(20);
    setFormThumbnailUrl(THUMBNAIL_PRESETS[1].url); // Default to Literature preset
    setFormIsDiagnostic(0);
    setFormPrice("");
    setFormWhatsappNumber("+923304541573");
    setFormQuestions([]);
    setEditingQuestionId(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (item: CurriculumItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormTestNumber(item.testNumber || "");
    setFormClassId(item.classId || "");
    setFormSubject(item.subject);
    setFormType(item.type || "PRACTICE_QUESTION");
    setFormGradeLevel(item.gradeLevel);
    setFormUnitTitle(item.unitTitle || "");
    setFormSkillFocus(item.skillFocus || "");
    setFormLifeConnection(item.lifeConnection || "");
    setFormContent(item.content);
    setFormDuration(item.duration || 20);
    setFormThumbnailUrl(item.thumbnailUrl || THUMBNAIL_PRESETS[0].url);
    setFormIsDiagnostic(item.isDiagnostic || 0);
    setFormPrice(item.price || "");
    setFormWhatsappNumber(item.whatsappNumber || "+923304541573");
    setFormQuestions(getQuestionsArray(item.questions));
    setEditingQuestionId(null);
    setIsModalOpen(true);
  };

  // Add/Update Question in Form List
  const handleAddQuestionToForm = () => {
    if (!newQuestionText.trim()) return;
    
    if (editingQuestionId) {
      setFormQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestionId
            ? {
                ...q,
                question: newQuestionText.trim(),
                type: newQuestionType,
                options: (newQuestionType === "MCQ" || newQuestionType === "FIB") ? newQuestionOptions.filter((o) => o.trim() !== "") : undefined,
                correctAnswer: newQuestionAnswer.trim(),
              }
            : q
        )
      );
      setEditingQuestionId(null);
    } else {
      const newQ: Question = {
        id: "q_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        question: newQuestionText.trim(),
        type: newQuestionType,
        options: (newQuestionType === "MCQ" || newQuestionType === "FIB") ? newQuestionOptions.filter((o) => o.trim() !== "") : undefined,
        correctAnswer: newQuestionAnswer.trim()
      };
      setFormQuestions((prev) => [...prev, newQ]);
    }

    // Reset sub-editor fields
    setNewQuestionText("");
    setNewQuestionOptions(["", ""]);
    setNewQuestionAnswer("");
  };

  const handleEditQuestionInForm = (q: Question) => {
    setNewQuestionText(q.question);
    setNewQuestionType(q.type);
    setNewQuestionOptions(q.options || ["", ""]);
    setNewQuestionAnswer(q.correctAnswer || "");
    setEditingQuestionId(q.id);
  };

  const handleCancelEditQuestion = () => {
    setEditingQuestionId(null);
    setNewQuestionText("");
    setNewQuestionOptions(["", ""]);
    setNewQuestionAnswer("");
  };

  const handleQuestionEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddQuestionToForm();
    }
  };

  // Remove Question from Form List
  const handleRemoveQuestionFromForm = (id: string) => {
    if (editingQuestionId === id) {
      setEditingQuestionId(null);
      setNewQuestionText("");
      setNewQuestionOptions(["", ""]);
      setNewQuestionAnswer("");
    }
    setFormQuestions((prev) => prev.filter(q => q.id !== id));
  };

  // Save manual / edited course
  const handleSaveCurriculum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert("Title and lesson content are required.");
      return;
    }

    const payload = {
      title: formTitle.trim(),
      testNumber: formTestNumber.trim() || undefined,
      classId: formClassId,
      subject: formSubject,
      type: formType,
      gradeLevel: formGradeLevel,
      unitTitle: formUnitTitle.trim() || undefined,
      skillFocus: formSkillFocus.trim() || undefined,
      lifeConnection: formLifeConnection.trim() || undefined,
      content: formContent.trim(),
      duration: formDuration,
      thumbnailUrl: formThumbnailUrl.trim() || THUMBNAIL_PRESETS[0].url,
      isDiagnostic: formIsDiagnostic,
      price: formIsDiagnostic ? formPrice : undefined,
      whatsappNumber: formIsDiagnostic ? formWhatsappNumber : undefined,
      questions: formQuestions
    };

    setIsLoading(true);
    try {
      let response;
      if (editingItem) {
        // Edit mode
        response = await fetch(`/api/curriculum/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        // Create mode
        response = await fetch("/api/curriculum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();
      if (data.success) {
        if (editingItem) {
          setCurriculums((prev) => prev.map((item) => (item.id === editingItem.id ? data.item : item)));
          setSelectedItem(data.item);
          setSaveStatus({
            type: "success",
            message: `"${data.item.title}" changes successfully saved to the database!`
          });
        } else {
          setCurriculums((prev) => [data.item, ...prev]);
          setSelectedItem(data.item);
          setSaveStatus({
            type: "success",
            message: `"${data.item.title}" successfully created and saved to the database!`
          });
        }
        setTimeout(() => setSaveStatus(null), 4000);
        setIsModalOpen(false);
      } else {
        alert(data.error || "Failed to save curriculum item");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Drag & Drop Document parser handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const name = file.name;
      const extension = name.split(".").pop()?.toLowerCase();
      
      let filetype: "docx" | "json" | "md" | "txt" = "txt";
      if (extension === "docx") filetype = "docx";
      else if (extension === "json") filetype = "json";
      else if (extension === "md") filetype = "md";

      let content = "";
      if (filetype === "docx") {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
          };
          reader.readAsDataURL(file);
        });
        content = await base64Promise;
      } else {
        const textPromise = new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsText(file);
        });
        content = await textPromise;
      }

      const response = await fetch("/api/curriculum/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: name, filetype, content }),
      });
      const data = await response.json();

      if (data.success) {
        setCurriculums((prev) => [data.item, ...prev]);
        setSelectedItem(data.item);
        setUserAnswers({});
        setShowResults(false);
      } else {
        setUploadError(data.error || "Failed to parse document with Gemini");
      }
    } catch (e: any) {
      setUploadError(e.message || "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const name = file.name;
    const extension = name.split(".").pop()?.toLowerCase();
    
    let filetype: "docx" | "json" | "md" | "txt" = "txt";
    if (extension === "docx") filetype = "docx";
    else if (extension === "json") filetype = "json";
    else if (extension === "md") filetype = "md";

    let content = "";
    if (filetype === "docx") {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });
      content = await base64Promise;
    } else {
      const textPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(file);
      });
      content = await textPromise;
    }

    const response = await fetch("/api/curriculum/extract-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filetype, content }),
    });
    const data = await response.json();
    if (data.success) {
      return data.text;
    } else {
      throw new Error(data.error || "Failed to extract text from file");
    }
  };

  const handleComprehensionFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingComp(true);
      setDualParseError(null);
      try {
        const text = await extractTextFromFile(e.target.files[0]);
        setDualComprehension(text);
      } catch (err: any) {
        setDualParseError("Failed to extract comprehension text: " + err.message);
      } finally {
        setIsUploadingComp(false);
      }
    }
  };

  const handleAnswerKeyFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingAns(true);
      setDualParseError(null);
      try {
        const text = await extractTextFromFile(e.target.files[0]);
        setDualAnswerKey(text);
      } catch (err: any) {
        setDualParseError("Failed to extract answer key text: " + err.message);
      } finally {
        setIsUploadingAns(false);
      }
    }
  };

  const handleDualParse = async () => {
    if (!dualComprehension.trim()) {
      setDualParseError("Please enter comprehension text and questions first.");
      return;
    }
    setIsDualParsing(true);
    setDualParseError(null);
    try {
      const response = await fetch("/api/curriculum/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comprehensionText: dualComprehension,
          answerKeyText: dualAnswerKey,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setCurriculums((prev) => [data.item, ...prev]);
        setSelectedItem(data.item);
        setUserAnswers({});
        setShowResults(false);
        setIsDualModalOpen(false);
        // Reset fields
        setDualComprehension("");
        setDualAnswerKey("");
      } else {
        setDualParseError(data.error || "Failed to parse dual sections with Gemini");
      }
    } catch (e: any) {
      setDualParseError(e.message || "An error occurred during dual section parse");
    } finally {
      setIsDualParsing(false);
    }
  };

  const loadSampleDualData = () => {
    setDualComprehension(
      `Title: Solar Eclipse Wonder\nSubject: SCIENCE\nGrade Level: Grade 5\nUnit Title: Unit 4: Space and Light\nSkill Focus: Reading Comprehension & Facts Mapping\n\nComprehension:\nA solar eclipse occurs when the Moon passes between Earth and the Sun, thereby totally or partly obscuring the image of the Sun for a viewer on Earth. This can only happen at a new moon. During a total eclipse, the disk of the Sun is fully obscured by the Moon. In partial and annular eclipses, only part of the Sun is obscured.\n\nQuestions:\n1. When does a solar eclipse occur?\n[Options: At full moon, At new moon, At half moon, During the night]\n\n2. What passes between Earth and the Sun during a solar eclipse?\n\n3. During a total eclipse, the disk of the Sun is only partially obscured. (True or False)`
    );
    setDualAnswerKey(
      `ANSWER KEY:\n1. At new moon\n2. The Moon\n3. False`
    );
  };

  const loadSampleJsonData = () => {
    const sample = {
      title: "Mental Maths & Data Handling Drill 58",
      subject: "MATH",
      gradeLevel: "Grade 1",
      unitTitle: "Review & Data Interpretation",
      skillFocus: "Quick Calculation, Missing Numbers, Fractions, Data Handling",
      lifeConnection: "Students solve calculations and read tables from everyday life.",
      duration: 20,
      content: "# Data Handling & Mental Maths\nStudy the tables and answer all sections.",
      questions: [
        {
          questionNumber: "1",
          sectionTitle: "Part A: Quick Addition",
          question: "2 + 3 = ______",
          type: "FIB",
          correctAnswer: "5",
          acceptedAnswers: ["5"]
        },
        {
          questionNumber: "11",
          sectionTitle: "Part B: Quick Subtraction",
          question: "5 - 2 = ______",
          type: "FIB",
          correctAnswer: "3",
          acceptedAnswers: ["3"]
        },
        {
          questionNumber: "21",
          sectionTitle: "Part C: Choose the Correct Fraction",
          question: "One part of a shape divided into 2 equal parts:",
          type: "MCQ",
          options: ["½", "⅓", "¼"],
          correctAnswer: "½",
          acceptedAnswers: ["½", "1/2", "0.5"]
        },
        {
          questionNumber: "31",
          sectionTitle: "Part D: Circle the Correct Answer",
          question: "Which shape has 3 sides?",
          type: "MCQ",
          options: ["Circle", "Triangle", "Square"],
          correctAnswer: "Triangle",
          acceptedAnswers: ["Triangle"]
        },
        {
          questionNumber: "51",
          sectionTitle: "Part E: Mixed Practice",
          question: "Draw a shape with 3 sides.",
          type: "ACTIVITY",
          correctAnswer: "Activity / Teacher Checked",
          acceptedAnswers: ["Activity / Teacher Checked"]
        },
        {
          questionNumber: "79",
          sectionTitle: "Part J: Data Handling",
          context: "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2",
          question: "Which fruit has the highest number? ______",
          type: "FIB",
          correctAnswer: "Mango",
          acceptedAnswers: ["Mango", "mango"]
        },
        {
          questionNumber: "80",
          sectionTitle: "Part J: Data Handling",
          context: "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2",
          question: "How many fruits are there altogether? ______",
          type: "FIB",
          correctAnswer: "14",
          acceptedAnswers: ["14"]
        }
      ]
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setJsonParseError(null);
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          setJsonInput(JSON.stringify(parsed, null, 2));
          setJsonParseError(null);
        } catch (err: any) {
          setJsonParseError("Failed to parse JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDirectJsonImport = async () => {
    if (!jsonInput.trim()) {
      setJsonParseError("Please paste or upload a JSON curriculum schema first.");
      return;
    }

    let parsedJson: any;
    try {
      parsedJson = JSON.parse(jsonInput.trim());
    } catch (e: any) {
      setJsonParseError("JSON Syntax Error: " + e.message);
      return;
    }

    setIsJsonParsing(true);
    setJsonParseError(null);
    try {
      const response = await fetch("/api/curriculum/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filetype: "json", content: JSON.stringify(parsedJson) })
      });
      const data = await response.json();
      if (data.success && data.item) {
        setCurriculums(prev => [data.item, ...prev]);
        setSelectedItem(data.item);
        setIsJsonModalOpen(false);
        setJsonInput("");
        setUserAnswers({});
        setShowResults(false);
        setSaveStatus({ type: "success", message: `Successfully imported "${data.item.title}" with ${getQuestionsArray(data.item.questions).length} questions!` });
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setJsonParseError(data.error || "Failed to process JSON curriculum.");
      }
    } catch (err: any) {
      setJsonParseError(err.message || "An unexpected error occurred while importing JSON.");
    } finally {
      setIsJsonParsing(false);
    }
  };

  // Delete Curriculum Module
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this curriculum module?")) return;

    try {
      const response = await fetch(`/api/curriculum/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setCurriculums((prev) => prev.filter((item) => item.id !== id));
        if (selectedItem?.id === id) {
          const remaining = curriculums.filter((item) => item.id !== id);
          setSelectedItem(remaining.length > 0 ? remaining[0] : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative" id="curriculum-manager">
      
      {/* Database Sync Success Notification Toast */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 max-w-sm"
          >
            <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-500">
              <CheckCircle2 className="h-5 w-5 text-emerald-100 shrink-0 animate-bounce" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold font-sans">Database Synchronized</p>
                <p className="text-[11px] text-emerald-100 font-sans mt-0.5 leading-relaxed">{saveStatus.message}</p>
              </div>
              <button onClick={() => setSaveStatus(null)} className="text-emerald-100 hover:text-white transition-colors shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3 p-1">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
            Curriculum Content Mapper
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Organize courses, set grade targets, customize reading durations, map quiz items and utilize AI upload pipelines.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setDualParseError(null);
              setIsDualModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
            title="Open Dual-Section AI Course Generator"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            AI Course Creator
          </button>
          
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs md:text-sm rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Course Manually
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden px-1">
        
        {/* Left Column (Filters, List, and File Drop) - Fully scrollable */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5 min-h-0 overflow-y-auto pr-1.5 h-full scrollbar-thin">
          
          {/* Filters Pane */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex flex-col gap-2.5 shrink-0">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-blue-600" /> Filter & Categorize
              </span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                {filteredCurriculums.length} courses
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course title or unit..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Grid of dropdowns */}
            <div className="grid grid-cols-3 gap-2">
              {/* Class Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Class</label>
                <select
                  value={filterClassId}
                  onChange={(e) => {
                    setFilterClassId(e.target.value);
                    setFilterSubject("All");
                  }}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                >
                  <option value="All">All Classes</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Subject</label>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                >
                  <option value="All">All Subjects</option>
                  {(() => {
                    let subjectList: string[] = [];
                    if (filterClassId === "All") {
                      // Collect all unique subjects
                      const subSet = new Set<string>();
                      classes.forEach(c => {
                        if (c.subjects) c.subjects.forEach(s => subSet.add(s));
                        if (c.subject) subSet.add(c.subject);
                      });
                      subjectList = Array.from(subSet);
                    } else {
                      const selectedClass = classes.find(c => c.id === filterClassId);
                      if (selectedClass) {
                        subjectList = selectedClass.subjects && selectedClass.subjects.length > 0 
                                      ? selectedClass.subjects 
                                      : (selectedClass.subject ? [selectedClass.subject] : []);
                      }
                    }
                    return subjectList.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ));
                  })()}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Time</label>
                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                >
                  <option value="All">Any Time</option>
                  <option value="short">Quick (≤15m)</option>
                  <option value="medium">Medium (16-30m)</option>
                  <option value="long">Deep (&gt;30m)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Curriculum List Scrollable container */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col min-h-[260px] shadow-sm overflow-hidden shrink-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Active Courses
              </h3>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Showing {filteredCurriculums.length}
              </span>
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredCurriculums.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <BookOpen className="h-12 w-12 mb-3 stroke-1 text-slate-300" />
                <p className="text-sm font-bold text-slate-600">No courses match filters.</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting your search query or dropdowns.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterSubject("All");
                    setFilterClassId("All");
                    setFilterDuration("All");
                  }}
                  className="text-blue-600 font-bold underline text-xs mt-3 hover:text-blue-800 cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 scrollbar-thin">
                {filteredCurriculums.map((item, index) => {
                  const isSelected = selectedItem?.id === item.id;
                  const isMath = item.subject === "MATH";
                  const mappedQ = getQuestionsArray(item.questions);
                  const isEnglish = item.subject === "ENGLISH";

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setUserAnswers({});
                        setShowResults(false);
                      }}
                      className={`group relative rounded-xl border overflow-hidden transition-all cursor-pointer flex flex-col ${
                        isSelected
                          ? "bg-blue-50/50 border-blue-400 shadow-md ring-2 ring-blue-100"
                          : "border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Top banner / Image preview */}
                      <div className="h-20 w-full relative overflow-hidden bg-slate-100 shrink-0">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-r ${isMath ? 'from-amber-500 to-amber-600' : 'from-blue-600 to-indigo-600'}`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Badges on top of thumbnail */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
                          {item.testNumber ? (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-xs border border-indigo-500">
                              Test #{item.testNumber}
                            </span>
                          ) : (
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white shadow-sm ${
                                isMath ? "bg-amber-500" : isEnglish ? "bg-sky-500" : "bg-purple-500"
                              }`}
                            >
                              Module {index + 1}
                            </span>
                          )}
                          <span
                            className="text-[10px] font-extrabold text-slate-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-sm"
                          >
                            {item.subject}
                          </span>
                        </div>

                        {/* Duration banner on top of thumbnail */}
                        <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          <Clock className="h-3 w-3" />
                          {item.duration || 20}m
                        </div>
                      </div>

                      {/* Info body */}
                      <div className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors flex-1">
                            {item.title}
                          </h4>
                          
                          {/* Action hover/tap buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditModal(item);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                              title="Edit course"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                              title="Delete course"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {item.unitTitle && (
                          <p className="text-[11px] text-slate-500 truncate mt-1">
                            Unit: <span className="font-semibold text-slate-700">{item.unitTitle}</span>
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            {mappedQ.length} Questions Mapped
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                            {item.gradeLevel || "Grade 4"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upload and AI parsing Area (Compact) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs shrink-0 flex flex-col gap-2.5" id="curriculum-upload-zone">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" /> AI Upload Channels
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Channel 1: Single File Drop */}
              <div
                className={`p-2.5 rounded-xl border border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                  dragActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center py-1 text-center">
                    <Sparkle className="h-4 w-4 text-blue-500 animate-spin mb-0.5" />
                    <p className="font-bold text-slate-700 text-[10px]">Parsing...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-4 w-4 text-slate-400 mx-auto mb-0.5" />
                    <p className="text-[10px] font-semibold text-slate-700 leading-tight">
                      Drop file or <label className="text-blue-600 hover:underline cursor-pointer">browse<input type="file" className="hidden" accept=".docx,.json,.md,.txt" onChange={handleFileChange} /></label>
                    </p>
                    <p className="text-[8px] text-slate-400">.docx, .md, .txt</p>
                  </div>
                )}
              </div>

              {/* Channel 2: Dual-Section Creator */}
              <button
                onClick={() => {
                  setDualParseError(null);
                  setIsDualModalOpen(true);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-left bg-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-800 leading-tight">Dual AI Creator</h5>
                    <p className="text-[8px] text-slate-400">Passage + Answers</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Channel 3: Direct JSON Importer */}
              <button
                onClick={() => {
                  setJsonParseError(null);
                  setIsJsonModalOpen(true);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left bg-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <FileJson className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-800 leading-tight">JSON Importer</h5>
                    <p className="text-[8px] text-slate-400">Instant • 100% Exact</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </button>
            </div>

            {uploadError && (
              <div className="flex items-start gap-1.5 bg-rose-50 border border-rose-100 p-2 rounded-lg text-[10px] text-rose-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Detailed Reader and practice (7 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0 overflow-hidden">
          {selectedItem ? (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm min-h-0">
              
              {/* Left Pane: Reading Passage & Header image */}
              <div className="flex flex-col border-r border-slate-200 min-h-0 overflow-hidden">
                
                {/* Hero Banner Image */}
                <div className="h-32 w-full relative bg-slate-100 shrink-0">
                  {selectedItem.thumbnailUrl ? (
                    <img
                      src={selectedItem.thumbnailUrl}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-slate-400 to-slate-600" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-black/30" />
                  
                  {/* Floating tags */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
                        {selectedItem.subject} • {selectedItem.gradeLevel} • {selectedItem.type === "COMPREHENSION" ? "COMPREHENSION" : "PRACTICE"}
                      </p>
                      <h2 className="text-base font-extrabold truncate text-white drop-shadow-md leading-tight mt-0.5">
                        {selectedItem.title}
                      </h2>
                    </div>
                    <span className="text-xs font-bold bg-blue-600/90 backdrop-blur-xs px-2 py-1 rounded-lg shrink-0 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {selectedItem.duration || 20}m
                    </span>
                  </div>

                  {/* Header actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(selectedItem)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 hover:bg-white text-slate-700 font-bold text-xs rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-blue-600" /> Edit Details
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      title="Close Course Reader"
                      className="p-1.5 bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 font-bold text-xs rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {/* Metadata Header list */}
                  <div className="pb-3 border-b border-slate-100 space-y-2">
                    {selectedItem.unitTitle && (
                      <p className="text-xs text-slate-500">
                        <span className="font-bold text-slate-700 uppercase tracking-wide text-[10px] block">Unit Title</span> 
                        {selectedItem.unitTitle}
                      </p>
                    )}
                    {selectedItem.testNumber && (
                      <p className="text-xs text-slate-500">
                        <span className="font-bold text-slate-700 uppercase tracking-wide text-[10px] block">Test Number</span> 
                        {selectedItem.testNumber}
                      </p>
                    )}
                    {selectedItem.skillFocus && (
                      <div className="text-xs bg-sky-50/40 p-2.5 rounded-xl border border-sky-100/50 text-sky-800 space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[10px] block text-sky-600">
                          Skill Focus
                        </span>
                        <p className="font-medium">{selectedItem.skillFocus}</p>
                      </div>
                    )}
                    {selectedItem.lifeConnection && (
                      <div className="text-xs bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/50 text-amber-800 space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[10px] block text-amber-600">
                          Life Connection
                        </span>
                        <p className="font-medium">{selectedItem.lifeConnection}</p>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[10px] block text-slate-400 mb-2">Lesson Material</span>
                    <div className="bg-slate-50/70 p-4 md:p-5 rounded-xl border border-slate-200/80 overflow-x-auto shadow-2xs">
                      <article className="prose prose-slate max-w-none">
                        <div className="markdown-body text-slate-800 leading-relaxed font-sans text-sm space-y-3">
                          <Markdown>
                            {selectedItem.content || "*No lesson notes provided.*"}
                          </Markdown>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Pane: Quiz Mode or Student Progress */}
              <div className="flex flex-col min-h-0 bg-slate-50/30">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                  <div className="flex bg-slate-200/50 p-1 rounded-xl">
                    <button
                      onClick={() => setActivePaneTab("preview")}
                      className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${
                        activePaneTab === "preview"
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Quiz Preview
                    </button>
                    <button
                      onClick={() => setActivePaneTab("progress")}
                      className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        activePaneTab === "progress"
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-blue-500" /> Student Progress
                    </button>
                  </div>

                  {activePaneTab === "preview" ? (
                    <button
                      onClick={() => {
                        setShowResults(!showResults);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                        showResults
                          ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      }`}
                    >
                      {showResults ? "Resume Quiz Practice" : "Reveal Answers"}
                    </button>
                  ) : (
                    <button
                      onClick={fetchAllSubmissions}
                      disabled={loadingSubmissions}
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 disabled:opacity-50"
                    >
                      {loadingSubmissions ? "Refreshing..." : "Refresh"}
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {activePaneTab === "preview" ? (
                    getQuestionsArray(selectedItem.questions).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <HelpCircle className="h-10 w-10 mb-2 stroke-1" />
                      <p className="text-sm font-semibold text-slate-600">No questions mapped for this item.</p>
                      <button
                        onClick={() => handleOpenEditModal(selectedItem)}
                        className="text-blue-600 underline text-xs mt-1"
                      >
                        Edit to add custom questions
                      </button>
                    </div>
                  ) : (
                    getQuestionsArray(selectedItem.questions).map((q, idx, arr) => {
                      const currentVal = userAnswers[q.id] || "";
                      
                      // Robust check function for correctness
                      const checkCorrectness = (): boolean => {
                        if (!q.correctAnswer) return false;
                        const valNormalized = currentVal.trim().toLowerCase();
                        const ansNormalized = q.correctAnswer.trim().toLowerCase();
                        if (valNormalized === ansNormalized) return true;

                        // Check MCQ and letter options
                        if (q.type === "MCQ" && q.options) {
                          const selectedIdx = q.options.findIndex(
                            (opt: string) => opt.trim().toLowerCase() === valNormalized
                          );
                          if (selectedIdx !== -1) {
                            const letter = String.fromCharCode(65 + selectedIdx).toLowerCase(); // a, b, c, d
                            if (ansNormalized === letter) return true;
                            if (ansNormalized === `${letter}.` || ansNormalized === `${letter})`) return true;
                            
                            // clean answers like "a. growth" -> "growth"
                            const cleanAns = ansNormalized.replace(/^[a-d][.)\s]+/, "").trim();
                            if (valNormalized === cleanAns) return true;

                            if (ansNormalized.startsWith(`${letter}.`) || ansNormalized.startsWith(`${letter})`)) {
                              const rest = ansNormalized.substring(2).trim();
                              if (rest === valNormalized) return true;
                            }
                          }
                        }

                        if (q.type === "SHORT" || q.type === "FIB") {
                          const cleanVal = valNormalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
                          const cleanAns = ansNormalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
                          if (cleanVal === cleanAns) return true;
                        }

                        return false;
                      };

                      const isCorrect = checkCorrectness();
                      const currentSection = q.sectionTitle || q.section || "";
                      const prevSection = idx > 0 ? (arr[idx - 1].sectionTitle || arr[idx - 1].section || "") : null;
                      const showSectionHeader = currentSection && currentSection !== prevSection;

                      return (
                        <React.Fragment key={q.id}>
                          {showSectionHeader && (
                            <div className="pt-2 pb-1">
                              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-100/90 px-3.5 py-2 rounded-xl shadow-2xs">
                                <BookOpen className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-black text-slate-800 tracking-wide uppercase">
                                  {currentSection}
                                </span>
                              </div>
                            </div>
                          )}
                          {q.context && (idx === 0 || arr[idx - 1]?.context !== q.context) && (
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 my-2 shadow-2xs space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase tracking-wider">
                                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                <span>Reference Data / Context</span>
                              </div>
                              <div className="font-mono text-xs whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed text-slate-800">
                                {q.context}
                              </div>
                            </div>
                          )}
                          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3 relative group">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <span className="h-6 w-6 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border border-blue-100">
                                  {idx + 1}
                                </span>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[9px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded uppercase">
                                      {q.type === "FIB" ? "Fill in Blank" : q.type}
                                    </span>
                                    {(q.sectionTitle || q.section) && (
                                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {q.sectionTitle || q.section}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-bold text-slate-900 leading-snug">
                                    {q.question}
                                  </p>
                                </div>
                              </div>
                            
                            <button
                              onClick={() => {
                                handleOpenEditModal(selectedItem);
                                handleEditQuestionInForm(q);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 bg-slate-50 border border-slate-100 transition-colors shrink-0 cursor-pointer"
                              title="Edit this question"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Options if MCQ */}
                          {q.type === "MCQ" && q.options && (
                            <div className={`grid gap-2 pl-8 ${q.options.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                              {q.options.map((option, oIdx) => {
                                const letter = String.fromCharCode(65 + oIdx);
                                const isSelected = currentVal === option;
                                const isThisCorrect = q.correctAnswer && (
                                  option.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ||
                                  q.correctAnswer.trim().toLowerCase() === letter.toLowerCase() ||
                                  q.correctAnswer.trim().toLowerCase().startsWith(`${letter.toLowerCase()}.`) ||
                                  q.correctAnswer.trim().toLowerCase().startsWith(`${letter.toLowerCase()})`) ||
                                  q.correctAnswer.trim().toLowerCase().includes(option.trim().toLowerCase())
                                );
                                return (
                                  <button
                                    key={option}
                                    onClick={() => handleAnswerChange(q.id, option)}
                                    className={`text-left text-xs p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? isThisCorrect
                                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-black ring-1 ring-emerald-200 shadow-2xs"
                                          : "bg-blue-50 border-blue-300 text-blue-700 font-bold shadow-2xs"
                                        : "border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 text-slate-700 bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center shrink-0 border ${
                                        isSelected
                                          ? isThisCorrect
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-blue-600 text-white border-blue-600"
                                          : "bg-slate-100 text-slate-600 border-slate-200"
                                      }`}>
                                        {letter}
                                      </span>
                                      <span className="font-semibold truncate">{option}</span>
                                    </div>
                                    {isSelected ? (
                                      <Check className="h-4 w-4 text-blue-600 shrink-0 ml-1" />
                                    ) : isThisCorrect && showResults ? (
                                      <span className="text-[9px] font-black text-emerald-600 uppercase shrink-0 ml-1">Correct</span>
                                    ) : null}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Text input if SHORT or FIB */}
                          {(q.type === "SHORT" || q.type === "FIB") && (
                            <div className="pl-8 space-y-3">
                              {q.type === "FIB" && q.options && q.options.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                                  <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Word Bank:</span>
                                  {q.options.map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => handleAnswerChange(q.id, opt)}
                                      className="px-2 py-0.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={currentVal}
                                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                  placeholder={q.type === "FIB" ? "Fill in the blank space..." : "Type test answer..."}
                                  className="flex-1 text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium"
                                />
                                {currentVal.trim() && (
                                  <button
                                    onClick={() => handleAIEvaluateShort(q.id, q.question, currentVal, q.correctAnswer || "")}
                                    disabled={aiEvaluations[q.id]?.loading}
                                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 disabled:bg-slate-100 disabled:text-slate-400 text-xs font-bold rounded-lg border border-indigo-200/50 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                                  >
                                    <Sparkles className={`h-3.5 w-3.5 ${aiEvaluations[q.id]?.loading ? "animate-spin" : ""}`} />
                                    {aiEvaluations[q.id]?.loading ? "Evaluating..." : "AI Evaluate"}
                                  </button>
                                )}
                              </div>

                              {/* AI Evaluation result container */}
                              {aiEvaluations[q.id] && (
                                <div className={`p-3 rounded-lg border text-xs space-y-1.5 transition-all ${
                                  aiEvaluations[q.id].loading 
                                    ? "bg-slate-50 border-slate-200 animate-pulse text-slate-500"
                                    : aiEvaluations[q.id].status === "correct"
                                      ? "bg-emerald-50/50 border-emerald-200 text-slate-700"
                                      : aiEvaluations[q.id].status === "partially_correct"
                                        ? "bg-amber-50/50 border-amber-200 text-slate-700"
                                        : "bg-rose-50/50 border-rose-200 text-slate-700"
                                }`}>
                                  {aiEvaluations[q.id].loading ? (
                                    <div className="flex items-center gap-2">
                                      <Sparkles className="h-4 w-4 text-indigo-500 animate-spin shrink-0" />
                                      <span className="font-semibold text-slate-600">Evaluating your response against the passage...</span>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-between font-bold text-[11px] gap-2">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <Sparkles className={`h-4 w-4 shrink-0 ${
                                            aiEvaluations[q.id].status === "correct" ? "text-emerald-600" :
                                            aiEvaluations[q.id].status === "partially_correct" ? "text-amber-600" : "text-rose-600"
                                          }`} />
                                          <span className={`truncate ${
                                            aiEvaluations[q.id].status === "correct" ? "text-emerald-700" :
                                            aiEvaluations[q.id].status === "partially_correct" ? "text-amber-700" : "text-rose-700"
                                          }`}>
                                            AI Evaluation: {
                                              aiEvaluations[q.id].status === "correct" ? "Correct" :
                                              aiEvaluations[q.id].status === "partially_correct" ? "Partially Correct" : "Incorrect"
                                            }
                                          </span>
                                        </div>
                                        <span className="bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 shrink-0">
                                          Score: {aiEvaluations[q.id].score}/100
                                        </span>
                                      </div>
                                      <p className="text-slate-600 pl-5 leading-relaxed font-medium">{aiEvaluations[q.id].feedback}</p>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Always-visible Mapped Correct Answer Badge */}
                          <div className="pl-8 pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Mapped Answer:
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                {q.correctAnswer ? q.correctAnswer : <em className="text-slate-400 font-normal">Not configured</em>}
                              </span>
                            </div>

                            {currentVal && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-slate-500 font-medium">Input:</span>
                                <span className="font-bold text-slate-800">{currentVal}</span>
                                {isCorrect ? (
                                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Match
                                  </span>
                                ) : (
                                  <span className="text-rose-600 font-bold flex items-center gap-0.5">
                                    <X className="h-3.5 w-3.5" /> Mismatch
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                  )) : (
                    /* Student Progress Results Layout */
                    (() => {
                      // Filter students belonging to this item's class
                      const itemClassId = selectedItem.classId;
                      const classStudents = students.filter(s => 
                        !itemClassId || (s.classIds || []).includes(itemClassId)
                      );
                      
                      // Filter curriculum submissions for this item
                      const itemSubmissions = allSubmissions.filter(s => 
                        (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === selectedItem.id
                      );

                      // Stats calculations
                      const totalStudents = classStudents.length;
                      const completedStudents = classStudents.filter(s => {
                        const subs = itemSubmissions.filter(sub => sub.studentId === s.id);
                        return subs.some(sub => (sub.score || 0) >= 95);
                      }).length;

                      const completionRate = totalStudents > 0 
                        ? Math.round((completedStudents / totalStudents) * 100) 
                        : 0;

                      const highestScore = itemSubmissions.length > 0
                        ? Math.max(...itemSubmissions.map(s => s.score || 0))
                        : null;

                      return (
                        <div className="space-y-4 shrink-0 font-sans">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Completion</span>
                              <span className="text-xs font-black text-slate-800">{completionRate}%</span>
                              <span className="text-[8px] text-slate-400 block mt-0.5">{completedStudents}/{totalStudents} Students</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Highest Score</span>
                              <span className="text-xs font-black text-slate-800 font-sans">
                                {highestScore !== null ? `${highestScore}%` : "—"}
                              </span>
                              <span className="text-[8px] text-slate-400 block mt-0.5 font-sans">Mastery limit: 95%</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5 font-sans">Total Attempts</span>
                              <span className="text-xs font-black text-slate-800 font-sans">{itemSubmissions.length}</span>
                              <span className="text-[8px] text-slate-400 block mt-0.5 font-sans font-sans">Practice attempts</span>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            {totalStudents === 0 ? (
                              <div className="text-center py-10 text-slate-400 font-medium text-xs">
                                No students enrolled in this class roster.
                              </div>
                            ) : (
                              classStudents.map(student => {
                                const studentSubs = itemSubmissions.filter(s => s.studentId === student.id);
                                const maxScore = studentSubs.length > 0 
                                  ? Math.max(...studentSubs.map(s => s.score || 0)) 
                                  : null;
                                const isStudentCompleted = maxScore !== null && maxScore >= 95;

                                return (
                                  <div 
                                    key={student.id}
                                    className="bg-white p-3 rounded-xl border border-slate-150 flex items-center justify-between gap-4 shadow-2xs"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0 font-sans">
                                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                                        {student.name.charAt(0)}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-black text-slate-800 truncate leading-tight">{student.name}</p>
                                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{student.email}</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 font-sans">
                                      <div className="text-right">
                                        {isStudentCompleted ? (
                                          <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 inline-block">
                                            Completed ({maxScore}%)
                                          </span>
                                        ) : maxScore !== null ? (
                                          <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 rounded-full border border-amber-100 inline-block">
                                            Practiced ({maxScore}%)
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 rounded-full border border-slate-100 inline-block">
                                            Not Started
                                          </span>
                                        )}
                                        {studentSubs.length > 0 && (
                                          <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                                            {studentSubs.length} attempt{studentSubs.length > 1 ? "s" : ""}
                                          </span>
                                        )}
                                      </div>

                                      {studentSubs.length > 0 && (
                                        <button
                                          onClick={() => setSelectedTeacherReviewSubmission({
                                            student,
                                            attempts: studentSubs
                                          })}
                                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                          title="View attempt records"
                                        >
                                          <ChevronRight className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <BookOpen className="h-16 w-16 mb-4 text-slate-300 stroke-1" />
              <h3 className="font-bold text-slate-700 text-lg">No Item Selected</h3>
              <p className="text-sm max-w-sm mt-1">
                Select an active curriculum item on the left panel or upload a new syllabus file to get started.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Manual Creation / Edit Curriculum Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
                <div className="flex items-center gap-2">
                  <FilePlus className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-slate-800 text-base">
                    {editingItem ? "Edit Curriculum Details" : "Create Custom Curriculum"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body Scroll Area */}
              <form onSubmit={handleSaveCurriculum} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Section 1: Standard Metadata */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider border-b pb-1">
                    1. Course Identity & Info
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="md:col-span-5">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Course Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Introduction to Subtraction, Solar Systems"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Unit Title */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Unit Title</label>
                      <input
                        type="text"
                        value={formUnitTitle}
                        onChange={(e) => setFormUnitTitle(e.target.value)}
                        placeholder="e.g. Unit 3: Space Exploration"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Test Number */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Test Number</label>
                      <input
                        type="text"
                        value={formTestNumber}
                        onChange={(e) => setFormTestNumber(e.target.value)}
                        placeholder="e.g. Test 1, T-101"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Class Selection */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Class *</label>
                      <select
                        value={formClassId}
                        onChange={(e) => {
                          const classId = e.target.value;
                          setFormClassId(classId);
                          const selectedClass = classes.find((c) => c.id === classId);
                          if (selectedClass) {
                            if (selectedClass.subjects && selectedClass.subjects.length > 0) {
                              setFormSubject(selectedClass.subjects[0]);
                            } else if (selectedClass.subject) {
                              setFormSubject(selectedClass.subject);
                            } else {
                              setFormSubject("ENGLISH");
                            }
                            setFormGradeLevel(selectedClass.gradeLevel || "Grade 2");
                          }
                        }}
                        className="w-full text-xs p-2.5 bg-white rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none"
                      >
                        <option value="" disabled>Select a class</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subject Mapping */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Subject *</label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none"
                      >
                        {(() => {
                          const selectedClass = classes.find(c => c.id === formClassId);
                          if (!selectedClass) {
                            return <option value="ENGLISH">English & Language Arts</option>;
                          }
                          const subs = selectedClass.subjects && selectedClass.subjects.length > 0 ? selectedClass.subjects : (selectedClass.subject ? [selectedClass.subject] : ["ENGLISH"]);
                          return subs.map((sub, idx) => (
                            <option key={idx} value={sub}>{sub}</option>
                          ));
                        })()}
                      </select>
                    </div>

                    {/* Grader Target */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Target Grader *</label>
                      <select
                        value={formGradeLevel}
                        onChange={(e) => setFormGradeLevel(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none"
                      >
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                      </select>
                    </div>

                    {/* Content Type */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Content Type *</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value as any)}
                        className="w-full text-xs p-2.5 bg-white rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none"
                      >
                        <option value="PRACTICE_QUESTION">Practice Question</option>
                        <option value="COMPREHENSION">Comprehension</option>
                      </select>
                    </div>

                    {/* Course Duration (Minutes) */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Duration (Minutes)</label>
                      <input
                        type="number"
                        min="1"
                        max="240"
                        value={formDuration}
                        onChange={(e) => setFormDuration(parseInt(e.target.value) || 20)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Diagnostic Checkbox */}
                    <div className="md:col-span-3 flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${formIsDiagnostic ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formIsDiagnostic === 1}
                            onChange={(e) => setFormIsDiagnostic(e.target.checked ? 1 : 0)}
                          />
                          {formIsDiagnostic === 1 && <Check className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <span className="text-xs font-bold text-slate-700">Diagnostic Lesson?</span>
                      </label>
                    </div>

                    {/* Price (Conditional) */}
                    {formIsDiagnostic === 1 && (
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Price (Tag)</label>
                        <input
                          type="text"
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          placeholder="e.g. $50, FREE, Rs. 1000"
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                    )}

                    {/* WhatsApp (Conditional) */}
                    {formIsDiagnostic === 1 && (
                      <div className="md:col-span-6">
                        <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp Number for Booking</label>
                        <input
                          type="text"
                          value={formWhatsappNumber}
                          onChange={(e) => setFormWhatsappNumber(e.target.value)}
                          placeholder="e.g. +923304541573"
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Thumbnail URL */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-600">
                      2. Course Cover Thumbnail URL
                    </label>
                    <span className="text-[10px] text-slate-400">Select preset or paste custom</span>
                  </div>
                  
                  {/* Presets Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {THUMBNAIL_PRESETS.map((preset) => {
                      const isSelected = formThumbnailUrl === preset.url;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormThumbnailUrl(preset.url)}
                          className={`relative h-12 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center group ${
                            isSelected ? "border-blue-500 ring-2 ring-blue-50" : "border-slate-100"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1">
                            <span className="text-[9px] font-bold text-white text-center leading-tight">
                              {preset.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5">
                              <Check className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual input */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formThumbnailUrl}
                      onChange={(e) => setFormThumbnailUrl(e.target.value)}
                      placeholder="Or paste custom thumbnail image URL..."
                      className="flex-1 text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Section 3: Optional Skill Focus and Connections */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider border-b pb-1">
                    3. Pedagogical Connections (Optional)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Skill Focus / Target Competencies</label>
                      <textarea
                        rows={2}
                        value={formSkillFocus}
                        onChange={(e) => setFormSkillFocus(e.target.value)}
                        placeholder="e.g. Critical Thinking, Addition with carry-over, story analysis"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Everyday / Life Connection</label>
                      <textarea
                        rows={2}
                        value={formLifeConnection}
                        onChange={(e) => setFormLifeConnection(e.target.value)}
                        placeholder="e.g. Helping kids add money at the supermarket, following safety rules on the road"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Course Lesson Content Text */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider border-b pb-1">
                    4. Lesson Material Content *
                  </h4>
                  <textarea
                    required
                    rows={8}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Type or paste the complete core textbook lesson passage, math guide examples, or stories here..."
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-blue-400 focus:outline-none transition-all font-sans leading-relaxed"
                  />
                </div>

                {/* Section 5: Course Quizzing Editor */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider border-b pb-1">
                    5. Match Interactive Quizzing Items
                  </h4>

                  {/* Existing Questions list */}
                  {formQuestions.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-400 font-semibold">
                      No questions added yet. Use the sub-editor below to add quiz questions.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {formQuestions.map((q, qIdx) => {
                        const isEditingThis = editingQuestionId === q.id;
                        if (isEditingThis) {
                          return (
                            <div key={q.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/15 space-y-3 shadow-xs">
                              <div className="flex items-center justify-between border-b border-amber-100 pb-1.5 mb-1">
                                <span className="text-[10px] font-bold text-amber-800 uppercase flex items-center gap-1">
                                  <Sparkle className="h-3.5 w-3.5 text-amber-500 animate-spin [animation-duration:3s]" />
                                  Editing Question {qIdx + 1}
                                </span>
                                <span className="text-[10px] font-medium text-amber-600/80">Inline Editor</span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                {/* Question Text */}
                                <div className="md:col-span-8">
                                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Question Text</label>
                                  <input
                                    type="text"
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                    onKeyDown={handleQuestionEditorKeyDown}
                                    className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    placeholder="e.g. What is 25 + 15?"
                                  />
                                </div>

                                {/* Question Type */}
                                <div className="md:col-span-4">
                                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Response Type</label>
                                  <select
                                    value={newQuestionType}
                                    onChange={(e) => setNewQuestionType(e.target.value as "MCQ" | "SHORT" | "FIB" | "ACTIVITY")}
                                    className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                  >
                                    <option value="MCQ">Multiple Choice (MCQ)</option>
                                    <option value="SHORT">Short text input</option>
                                    <option value="FIB">Fill in the Blanks (FIB)</option>
                                    <option value="ACTIVITY">Drawing / Practical Activity</option>
                                  </select>
                                </div>

                                {newQuestionType === "FIB" && (
                                  <div className="md:col-span-12 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-medium flex items-center gap-1.5">
                                    <span className="font-bold shrink-0">💡 FIB Tip:</span> Use <code className="px-1 py-0.5 bg-white rounded border border-amber-300 font-mono text-amber-900">___</code> or <code className="px-1 py-0.5 bg-white rounded border border-amber-300 font-mono text-amber-900">[blank]</code> in your question text.
                                  </div>
                                )}

                                {/* MCQ or FIB Word Bank Options */}
                                {(newQuestionType === "MCQ" || newQuestionType === "FIB") && (
                                  <div className="md:col-span-12 space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-500">
                                      {newQuestionType === "MCQ" ? "MCQ Options (Minimum 2)" : "Word Bank / Answer Hints (Optional)"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                      {newQuestionOptions.map((opt, idx) => (
                                        <div key={idx} className="relative flex items-center">
                                          <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => {
                                              const next = [...newQuestionOptions];
                                              next[idx] = e.target.value;
                                              setNewQuestionOptions(next);
                                            }}
                                            onKeyDown={handleQuestionEditorKeyDown}
                                            placeholder={newQuestionType === "MCQ" ? `Option ${String.fromCharCode(65 + idx)}` : `Word ${idx + 1}`}
                                            className="w-full text-xs p-2 pr-7 bg-white rounded border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                          />
                                          {newQuestionOptions.length > 2 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setNewQuestionOptions(prev => prev.filter((_, i) => i !== idx));
                                              }}
                                              className="absolute right-2 text-slate-400 hover:text-rose-600 transition-colors"
                                            >
                                              <X className="h-3.5 w-3.5" />
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => setNewQuestionOptions(prev => [...prev, ""])}
                                        className="px-2 py-1.5 border border-dashed border-amber-300 rounded text-xs text-amber-700 font-bold bg-white hover:bg-amber-50 flex items-center justify-center gap-1 transition-colors"
                                      >
                                        <Plus className="h-3 w-3" /> Add Option
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Correct Answer */}
                                <div className="md:col-span-12">
                                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Correct Answer Key *</label>
                                  <input
                                    type="text"
                                    value={newQuestionAnswer}
                                    onChange={(e) => setNewQuestionAnswer(e.target.value)}
                                    onKeyDown={handleQuestionEditorKeyDown}
                                    className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                    placeholder="e.g. 40 or Blue Blocks"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-2 border-t border-amber-100 mt-2">
                                <button
                                  type="button"
                                  onClick={handleAddQuestionToForm}
                                  className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors border border-amber-600 shadow-xs"
                                >
                                  <Save className="h-3.5 w-3.5" /> Save Changes
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEditQuestion}
                                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-lg transition-colors border border-slate-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          );
                        }

                        const currentSection = q.sectionTitle || q.section || "";
                        const prevSection = qIdx > 0 ? (formQuestions[qIdx - 1].sectionTitle || formQuestions[qIdx - 1].section || "") : null;
                        const showSectionHeader = currentSection && currentSection !== prevSection;

                        return (
                          <React.Fragment key={q.id}>
                            {showSectionHeader && (
                              <div className="pt-2 pb-1">
                                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded uppercase tracking-wide">
                                  {currentSection}
                                </span>
                              </div>
                            )}
                            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-start gap-3 justify-between">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-1 text-[10px]">
                                  <span className="font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded text-[9px]">
                                    Q{qIdx + 1}
                                  </span>
                                  <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[9px]">
                                    {q.type}
                                  </span>
                                  {(q.sectionTitle || q.section) && (
                                    <span className="font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[9px]">
                                      {q.sectionTitle || q.section}
                                    </span>
                                  )}
                                  {q.correctAnswer && (
                                    <span className="text-emerald-700 font-semibold">
                                      Correct Answer: {q.correctAnswer}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs font-bold text-slate-700">{q.question}</p>
                                {q.type === "MCQ" && q.options && (
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {q.options.map((opt, oIdx) => {
                                      const cleanOpt = opt.trim().toLowerCase();
                                      const cleanAns = (q.correctAnswer || "").trim().toLowerCase();
                                      const letter = String.fromCharCode(65 + oIdx);
                                      const isOptionCorrect =
                                        cleanOpt === cleanAns ||
                                        cleanAns === letter.toLowerCase() ||
                                        cleanAns.startsWith(`${letter.toLowerCase()}.`) ||
                                        cleanAns.startsWith(`${letter.toLowerCase()})`);

                                      return (
                                        <span
                                          key={oIdx}
                                          className={`text-[10px] border px-2 py-0.5 rounded font-medium flex items-center gap-1.5 transition-colors ${
                                            isOptionCorrect
                                              ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-2xs"
                                              : "bg-white border-slate-200 text-slate-600"
                                          }`}
                                        >
                                          <span>{letter}. {opt}</span>
                                          {isOptionCorrect && <Check className="h-3 w-3 text-emerald-600 font-bold" />}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditQuestionInForm(q)}
                                  className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Edit Question"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuestionFromForm(q.id)}
                                  className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete Question"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}

                  {/* Sub-Editor Panel */}
                  {editingQuestionId ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500 font-medium py-6">
                      <Sparkle className="h-5 w-5 text-amber-500 animate-spin [animation-duration:3s] mx-auto mb-1" />
                      Currently editing Question <span className="font-bold text-slate-700">#{formQuestions.findIndex(q => q.id === editingQuestionId) + 1}</span> above.
                      <p className="text-[11px] text-slate-400 mt-0.5">Please save or cancel your inline edits to add a new question.</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50/30 border border-blue-100 rounded-xl space-y-3">
                      <span className="text-xs font-bold flex items-center gap-1.5 text-blue-800">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Quiz Question Sub-Editor
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {/* Question Text */}
                        <div className="md:col-span-8">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Question Label</label>
                          <input
                            type="text"
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            onKeyDown={handleQuestionEditorKeyDown}
                            placeholder="e.g. What is 25 + 15?"
                            className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none"
                          />
                        </div>

                        {/* Question Type */}
                        <div className="md:col-span-4">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Response Type</label>
                          <select
                            value={newQuestionType}
                            onChange={(e) => setNewQuestionType(e.target.value as "MCQ" | "SHORT" | "FIB")}
                            className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none"
                          >
                            <option value="MCQ">Multiple Choice (MCQ)</option>
                            <option value="SHORT">Short text input</option>
                            <option value="FIB">Fill in the Blanks (FIB)</option>
                          </select>
                        </div>

                        {newQuestionType === "FIB" && (
                          <div className="md:col-span-12 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-medium flex items-center gap-1.5">
                            <span className="font-bold shrink-0">💡 FIB Tip:</span> Use <code className="px-1 py-0.5 bg-white rounded border border-amber-300 font-mono text-amber-900">___</code> or <code className="px-1 py-0.5 bg-white rounded border border-amber-300 font-mono text-amber-900">[blank]</code> in your question text.
                          </div>
                        )}

                        {/* Options (MCQ or FIB Word Bank) */}
                        {(newQuestionType === "MCQ" || newQuestionType === "FIB") && (
                          <div className="md:col-span-12 space-y-2">
                            <label className="block text-[11px] font-bold text-slate-600">
                              {newQuestionType === "MCQ" ? "MCQ Options (Minimum 2)" : "Word Bank / Answer Hints (Optional)"}
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                              {newQuestionOptions.map((opt, idx) => (
                                <div key={idx} className="relative flex items-center">
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const next = [...newQuestionOptions];
                                      next[idx] = e.target.value;
                                      setNewQuestionOptions(next);
                                    }}
                                    onKeyDown={handleQuestionEditorKeyDown}
                                    placeholder={newQuestionType === "MCQ" ? `Option ${String.fromCharCode(65 + idx)}` : `Word ${idx + 1}`}
                                    className="w-full text-xs p-2 pr-7 bg-white rounded border border-slate-200 focus:outline-none"
                                  />
                                  {newQuestionOptions.length > 2 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewQuestionOptions(prev => prev.filter((_, i) => i !== idx));
                                      }}
                                      className="absolute right-2 text-slate-400 hover:text-slate-600"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => setNewQuestionOptions(prev => [...prev, ""])}
                                className="px-2 py-1.5 border border-dashed border-blue-300 rounded text-xs text-blue-600 font-bold bg-white hover:bg-blue-50/50 flex items-center justify-center gap-1"
                              >
                                <Plus className="h-3 w-3" /> Add Option
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Correct Answer */}
                        <div className="md:col-span-12">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Correct Answer Key *</label>
                          <input
                            type="text"
                            value={newQuestionAnswer}
                            onChange={(e) => setNewQuestionAnswer(e.target.value)}
                            onKeyDown={handleQuestionEditorKeyDown}
                            placeholder="e.g. 40 or Blue Blocks"
                            className="w-full text-xs p-2 bg-white rounded border border-slate-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={handleAddQuestionToForm}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 font-bold text-xs rounded-lg transition-colors border"
                        >
                          <Plus className="h-4 w-4" /> Add Question to Curriculum
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </form>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCurriculum}
                  disabled={isLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isLoading ? (
                    <div className="h-3.5 w-3.5 border-b-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Curriculum Course
                </button>
              </div>

            </motion.div>
          </div>
        )}

        {isDualModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-indigo-50/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      Dual-Section AI Creator
                    </h3>
                    <p className="text-xs text-slate-500">Provide comprehension text with questions and matching answer keys to let Gemini compile the lesson.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={loadSampleDualData}
                    className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold text-xs rounded-lg transition-colors border border-indigo-200"
                  >
                    Load Sample Data
                  </button>
                  <button
                    onClick={() => setIsDualModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Comprehension */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        1. Comprehension with Questions & MCQs
                      </label>
                      <label className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer transition-all font-semibold flex items-center gap-1">
                        {isUploadingComp ? (
                          <Sparkle className="h-3 w-3 animate-spin text-indigo-600" />
                        ) : (
                          <Upload className="h-3 w-3" />
                        )}
                        <span>{isUploadingComp ? "Extracting..." : "Upload Document"}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".docx,.json,.md,.txt"
                          disabled={isUploadingComp}
                          onChange={handleComprehensionFileUpload}
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Paste or upload file for reading passage, lesson text, or questions. Supports .docx, .txt, .md, .json.
                    </p>
                    <textarea
                      value={dualComprehension}
                      onChange={(e) => setDualComprehension(e.target.value)}
                      placeholder="e.g. Passage: Long ago, the Romans built amazing roads...&#10;&#10;Question 1: Who built the roads?&#10;Question 2: What materials were used?"
                      className="w-full flex-1 min-h-[350px] p-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-indigo-400 focus:outline-none text-xs leading-relaxed font-sans shadow-inner resize-none"
                    />
                  </div>
 
                  {/* Right Column: Answer Key */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        2. Answer Key
                      </label>
                      <label className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer transition-all font-semibold flex items-center gap-1">
                        {isUploadingAns ? (
                          <Sparkle className="h-3 w-3 animate-spin text-indigo-600" />
                        ) : (
                          <Upload className="h-3 w-3" />
                        )}
                        <span>{isUploadingAns ? "Extracting..." : "Upload Document"}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".docx,.json,.md,.txt"
                          disabled={isUploadingAns}
                          onChange={handleAnswerKeyFileUpload}
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Paste or upload matching answer key file. Supports .docx, .txt, .md, .json.
                    </p>
                    <textarea
                      value={dualAnswerKey}
                      onChange={(e) => setDualAnswerKey(e.target.value)}
                      placeholder="e.g. Answer Key:&#10;1. Romans&#10;2. Stone and concrete"
                      className="w-full flex-1 min-h-[350px] p-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-indigo-400 focus:outline-none text-xs leading-relaxed font-sans shadow-inner resize-none"
                    />
                  </div>
                </div>

                {dualParseError && (
                  <div className="flex items-start gap-1.5 bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{dualParseError}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkle className="h-3.5 w-3.5 text-amber-500 animate-spin" />
                  EBM Curriculum Parser utilizes Gemini 2.5 Flash Model
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDualModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDualParse}
                    disabled={isDualParsing}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    {isDualParsing ? (
                      <>
                        <div className="h-3.5 w-3.5 border-b-2 border-white rounded-full animate-spin"></div>
                        Gemini AI Matching Answers...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        ✨ Map & Generate Course
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}

        {/* MODAL: DIRECT JSON CURRICULUM IMPORTER */}
        {isJsonModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/60 via-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
                    <FileJson className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-black text-slate-900">
                      Direct JSON Curriculum Importer
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Instant, 100% deterministic schema ingestion • Zero AI delay or quota limits
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsJsonModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Actions & Format Toolbar */}
              <div className="px-6 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadSampleJsonData}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                    Load Sample Template (with Part J Table)
                  </button>

                  <label className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs">
                    <Upload className="h-3.5 w-3.5 text-slate-500" />
                    Upload .json File
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleJsonFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {jsonInput.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setJsonInput("");
                      setJsonParseError(null);
                    }}
                    className="text-xs text-slate-400 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                  >
                    Clear Input
                  </button>
                )}
              </div>

              {/* Error banner */}
              {jsonParseError && (
                <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700 font-semibold">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{jsonParseError}</span>
                </div>
              )}

              {/* Textarea Editor Area */}
              <div className="p-6 flex-1 flex flex-col min-h-0 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Paste JSON Curriculum Schema:</span>
                  {(() => {
                    if (!jsonInput.trim()) return <span className="text-slate-400 font-normal">Waiting for input...</span>;
                    try {
                      const p = JSON.parse(jsonInput.trim());
                      const qCount = Array.isArray(p.questions) ? p.questions.length : (Array.isArray(p) ? p.length : 0);
                      const secCount = new Set((p.questions || p || []).map((x: any) => x.sectionTitle || x.section).filter(Boolean)).size;
                      return (
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Valid JSON: {qCount} Questions • {secCount || 1} Sections
                        </span>
                      );
                    } catch (e: any) {
                      return (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
                          Syntax Incomplete...
                        </span>
                      );
                    }
                  })()}
                </div>

                <textarea
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    setJsonParseError(null);
                  }}
                  placeholder='{\n  "title": "Mental Maths Drill 58",\n  "subject": "MATH",\n  "gradeLevel": "Grade 1",\n  "questions": [\n    {\n      "questionNumber": "1",\n      "sectionTitle": "Part A: Quick Addition",\n      "question": "2 + 3 = ______",\n      "type": "FIB",\n      "correctAnswer": "5"\n    }\n  ]\n}'
                  className="w-full flex-1 min-h-[320px] p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  Supports FIB, MCQ (with A, B, C options), Comparisons, Activities, and Data Handling tables.
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsJsonModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDirectJsonImport}
                    disabled={isJsonParsing || !jsonInput.trim()}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isJsonParsing ? (
                      <>
                        <Sparkle className="h-4 w-4 animate-spin" />
                        Importing Schema...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Import & Save Curriculum
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL: TEACHER ATTEMPT REVIEW */}
        {selectedTeacherReviewSubmission && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-2xl max-w-2xl w-full flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 rounded-t-[2rem]">
                <div>
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-0.5 font-sans">Practice Review</span>
                  <h3 className="text-base font-black text-slate-800 leading-tight font-sans">
                    {selectedTeacherReviewSubmission.student.name} — Attempts Log
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
                    Curriculum: {selectedItem?.title}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedTeacherReviewSubmission(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="space-y-3">
                  {selectedTeacherReviewSubmission.attempts
                    .sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                    .map((sub: any, index: number, arr: any[]) => {
                      const attemptNum = arr.length - index;
                      const scoreVal = sub.score !== null ? Number(sub.score) : 0;
                      const isPassing = scoreVal >= 95;

                      let parsedContent: any = null;
                      try {
                        parsedContent = JSON.parse(sub.content || "{}");
                      } catch (e) {}

                      return (
                        <div 
                          key={sub.id} 
                          className="rounded-2xl border bg-white overflow-hidden border-slate-150"
                        >
                          {/* Attempt Title bar */}
                          <div className="p-4 bg-slate-50/40 border-b border-slate-100 flex items-center justify-between">
                            <div className="space-y-0.5 font-sans">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                                Attempt #{attemptNum}
                              </span>
                              <p className="text-xs text-slate-500 font-medium font-sans">
                                {new Date(sub.submittedAt).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short"
                                })}
                              </p>
                            </div>

                            <div className="text-right font-sans">
                              <span className={`text-sm font-black block leading-none ${isPassing ? "text-emerald-600" : "text-amber-500"}`}>
                                {scoreVal}%
                              </span>
                              <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${isPassing ? "text-emerald-500" : "text-amber-400"}`}>
                                {isPassing ? "Completed" : "Incomplete"}
                              </span>
                            </div>
                          </div>

                          {/* Question Breakdown */}
                          {parsedContent && parsedContent.questions && (
                            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                              {parsedContent.questions.map((q: any, qIdx: number) => {
                                return (
                                  <div key={qIdx} className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 font-sans">
                                    <div className="flex justify-between items-start gap-4">
                                      <p className="text-xs font-bold text-slate-800">
                                        Q{qIdx + 1}: {q.question}
                                      </p>
                                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 block ${
                                        q.isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                      }`}>
                                        {q.isCorrect ? "Correct" : "Incorrect"}
                                      </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-x-4 gap-y-0.5 text-[11px] text-slate-500 pt-1">
                                      <p>
                                        Student Answer: <span className={`font-bold ${q.isCorrect ? "text-emerald-600" : "text-rose-500"}`}>
                                          {q.studentAnswer || "(Skipped)"}
                                        </span>
                                      </p>
                                      {!q.isCorrect && q.correctAnswer && (
                                        <p>
                                          Correct Answer: <span className="text-emerald-600 font-bold">{q.correctAnswer}</span>
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50 rounded-b-[2rem]">
                <button 
                  onClick={() => setSelectedTeacherReviewSubmission(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer font-sans"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
