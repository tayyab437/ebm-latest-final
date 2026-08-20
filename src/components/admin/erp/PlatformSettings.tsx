import React, { useState, useEffect, useRef } from "react";
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Sparkles, 
  Save, 
  Sliders, 
  Monitor, 
  Cloud, 
  RefreshCw,
  Check,
  Eye,
  GraduationCap,
  Image,
  Plus,
  Trash2,
  Clock,
  Users,
  UploadCloud,
  FileUp,
  X,
  Upload,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useBrandingStore, BRANDING_ICONS, HeroSlide, applyFavicon } from "../../../lib/branding.store";
import { FeaturedJourneysConfig } from "./FeaturedJourneysConfig";
import { ParentsJourneyConfig } from "./ParentsJourneyConfig";

export function PlatformSettings() {
  const [activeSection, setActiveSection] = useState("general");
  
  // Load Branding State
  const { 
    logoText, 
    logoType, 
    logoIcon, 
    logoImageUrl, 
    faviconUrl, 
    heroBackgroundImage,
    heroSlides,
    showThemeToggle,
    updateBranding, 
    resetBranding 
  } = useBrandingStore();

  // Local state for forms to allow "Save" flow
  const [localLogoText, setLocalLogoText] = useState(logoText);
  const [localLogoType, setLocalLogoType] = useState(logoType);
  const [localLogoIcon, setLocalLogoIcon] = useState(logoIcon);
  const [localLogoImageUrl, setLocalLogoImageUrl] = useState(logoImageUrl);
  const [localFaviconUrl, setLocalFaviconUrl] = useState(faviconUrl);
  const [localHeroBackgroundImage, setLocalHeroBackgroundImage] = useState(heroBackgroundImage || "");
  const [localHeroSlides, setLocalHeroSlides] = useState<HeroSlide[]>(heroSlides || []);
  const [localShowThemeToggle, setLocalShowThemeToggle] = useState(showThemeToggle);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [heroBgSaveSuccess, setHeroBgSaveSuccess] = useState(false);

  // Logo & Favicon Upload States
  const [logoDragActive, setLogoDragActive] = useState(false);
  const [faviconDragActive, setFaviconDragActive] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const [faviconUploadError, setFaviconUploadError] = useState<string | null>(null);
  const [logoUploadSuccess, setLogoUploadSuccess] = useState<string | null>(null);
  const [faviconUploadSuccess, setFaviconUploadSuccess] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // File upload handlers
  const handleLogoFile = (file: File) => {
    setLogoUploadError(null);
    setLogoUploadSuccess(null);

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setLogoUploadError("Logo file must be smaller than 5MB.");
      return;
    }

    // Validate image format
    if (!file.type.startsWith("image/")) {
      setLogoUploadError("Please select a valid image file (PNG, JPG, SVG, WEBP, GIF, ICO).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setLocalLogoImageUrl(dataUrl);
        setLocalLogoType("image");
        setLogoUploadSuccess(`Loaded ${file.name} successfully!`);
        setTimeout(() => setLogoUploadSuccess(null), 4000);
      }
    };
    reader.onerror = () => {
      setLogoUploadError("Failed to read the uploaded logo image.");
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconFile = (file: File) => {
    setFaviconUploadError(null);
    setFaviconUploadSuccess(null);

    // Validate size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setFaviconUploadError("Favicon file must be smaller than 2MB.");
      return;
    }

    // Validate image format
    if (!file.type.startsWith("image/") && !file.name.endsWith(".ico")) {
      setFaviconUploadError("Please select a valid favicon image (.ico, .png, .svg, .jpg).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setLocalFaviconUrl(dataUrl);
        applyFavicon(dataUrl);
        setFaviconUploadSuccess(`Loaded ${file.name} as browser favicon!`);
        setTimeout(() => setFaviconUploadSuccess(null), 4000);
      }
    };
    reader.onerror = () => {
      setFaviconUploadError("Failed to read the uploaded favicon file.");
    };
    reader.readAsDataURL(file);
  };

  // Sync state with store updates
  useEffect(() => {
    if (logoText) setLocalLogoText(logoText);
  }, [logoText]);

  useEffect(() => {
    if (logoType) setLocalLogoType(logoType);
  }, [logoType]);

  useEffect(() => {
    if (logoIcon) setLocalLogoIcon(logoIcon);
  }, [logoIcon]);

  useEffect(() => {
    if (logoImageUrl !== undefined) setLocalLogoImageUrl(logoImageUrl);
  }, [logoImageUrl]);

  useEffect(() => {
    if (faviconUrl) setLocalFaviconUrl(faviconUrl);
  }, [faviconUrl]);

  useEffect(() => {
    if (heroBackgroundImage !== undefined) setLocalHeroBackgroundImage(heroBackgroundImage);
  }, [heroBackgroundImage]);

  useEffect(() => {
    if (heroSlides && heroSlides.length > 0) {
      setLocalHeroSlides(heroSlides);
    }
  }, [heroSlides]);

  useEffect(() => {
    if (showThemeToggle !== undefined) {
      setLocalShowThemeToggle(showThemeToggle);
    }
  }, [showThemeToggle]);

  // State for Global Announcement Bar
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementCtaText, setAnnouncementCtaText] = useState("");
  const [announcementCtaUrl, setAnnouncementCtaUrl] = useState("");
  const [announcementIsActive, setAnnouncementIsActive] = useState(true);
  const [announcementTargetRole, setAnnouncementTargetRole] = useState("ALL");
  const [announcementScheduledStart, setAnnouncementScheduledStart] = useState("");
  const [announcementScheduledUntil, setAnnouncementScheduledUntil] = useState("");
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const [announcementSaveSuccess, setAnnouncementSaveSuccess] = useState(false);

  // Other platform settings local state (to make the form functional)
  const [schoolName, setSchoolName] = useState("Ejaz Bukhari Method Accelerated School");
  const [shortName, setShortName] = useState("EBM Platform");
  const [supportEmail, setSupportEmail] = useState("admin@ebm.edu");
  const [domain, setDomain] = useState("ebm.edu");
  const [currency, setCurrency] = useState("PKR (Rs.)");
  const [timeZone, setTimeZone] = useState("Asia/Karachi (GMT+5)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  
  const [switches, setSwitches] = useState([
    { id: "reg", label: "Public Self-Registration", desc: "Allow students to create accounts manually", active: true },
    { id: "tutor", label: "AI Tutor Engine", desc: "Enable Gemini-powered learning assistance", active: true },
    { id: "bio", label: "Biometric Session Verification", desc: "Enforce biometric identity checks for students", active: false },
    { id: "grade", label: "Automatic Grading", desc: "Enable AI-driven assessment scoring", active: true },
  ]);

  // Math Test Slider Settings
  const [splitPercentage, setSplitPercentage] = useState(40);
  const [mathSlides, setMathSlides] = useState<Array<{ id: string; imageUrl: string; duration: number; title: string }>>([]);
  const [loadingMath, setLoadingMath] = useState(false);
  const [mathSaveSuccess, setMathSaveSuccess] = useState(false);

  // Welcome Modal Settings State
  const [welcomeShow, setWelcomeShow] = useState(true);
  const [welcomeTitle, setWelcomeTitle] = useState("First time here?");
  const [welcomeHighlightText, setWelcomeHighlightText] = useState("1 in 4 students");
  const [welcomeMiddleText, setWelcomeMiddleText] = useState("uses EBM Digital Learning for academic");
  const [welcomeBoldText, setWelcomeBoldText] = useState("help and enrichment.");
  const [welcomeGradeRangeText, setWelcomeGradeRangeText] = useState("Pre-K through 12th grade");
  const [welcomeCtaText, setWelcomeCtaText] = useState("Sign up now");
  const [welcomeCtaUrl, setWelcomeCtaUrl] = useState("auth-register");
  const [welcomeExploreText, setWelcomeExploreText] = useState("Keep exploring");
  const [welcomeGradientStart, setWelcomeGradientStart] = useState("#05c4a6");
  const [welcomeGradientEnd, setWelcomeGradientEnd] = useState("#00a3e0");
  const [loadingWelcome, setLoadingWelcome] = useState(false);
  const [welcomeSaveSuccess, setWelcomeSaveSuccess] = useState(false);

  // Load Welcome Modal Settings
  useEffect(() => {
    const fetchWelcomeSettings = async () => {
      try {
        const res = await fetch("/api/welcome-modal-settings");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setWelcomeShow(data.showWelcomeModal ?? true);
            setWelcomeTitle(data.title ?? "First time here?");
            setWelcomeHighlightText(data.highlightText ?? "1 in 4 students");
            setWelcomeMiddleText(data.middleText ?? "uses EBM Digital Learning for academic");
            setWelcomeBoldText(data.boldText ?? "help and enrichment.");
            setWelcomeGradeRangeText(data.gradeRangeText ?? "Pre-K through 12th grade");
            setWelcomeCtaText(data.ctaText ?? "Sign up now");
            setWelcomeCtaUrl(data.ctaUrl ?? "auth-register");
            setWelcomeExploreText(data.exploreText ?? "Keep exploring");
            setWelcomeGradientStart(data.headerBgGradientStart ?? "#05c4a6");
            setWelcomeGradientEnd(data.headerBgGradientEnd ?? "#00a3e0");
          }
        }
      } catch (err) {
        console.error("Error loading welcome modal settings:", err);
      }
    };
    fetchWelcomeSettings();
  }, []);

  const handleSaveWelcomeSettings = async () => {
    try {
      setLoadingWelcome(true);
      const res = await fetch("/api/admin/welcome-modal-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          showWelcomeModal: welcomeShow,
          title: welcomeTitle,
          highlightText: welcomeHighlightText,
          middleText: welcomeMiddleText,
          boldText: welcomeBoldText,
          gradeRangeText: welcomeGradeRangeText,
          ctaText: welcomeCtaText,
          ctaUrl: welcomeCtaUrl,
          exploreText: welcomeExploreText,
          headerBgGradientStart: welcomeGradientStart,
          headerBgGradientEnd: welcomeGradientEnd,
        })
      });
      if (res.ok) {
        setWelcomeSaveSuccess(true);
        setTimeout(() => setWelcomeSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving welcome settings:", err);
    } finally {
      setLoadingWelcome(false);
    }
  };

  // Load math test slider settings on mount
  useEffect(() => {
    const fetchMathSettings = async () => {
      try {
        setLoadingMath(true);
        const res = await fetch("/api/math-test-settings");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setSplitPercentage(data.splitPercentage ?? 40);
            setMathSlides(data.slides ?? []);
          }
        }
      } catch (err) {
        console.error("Error loading math settings:", err);
      } finally {
        setLoadingMath(false);
      }
    };
    fetchMathSettings();
  }, []);

  const handleSaveMathSettings = async () => {
    try {
      setLoadingMath(true);
      const res = await fetch("/api/admin/math-test-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          splitPercentage,
          slides: mathSlides
        })
      });
      if (res.ok) {
        setMathSaveSuccess(true);
        setTimeout(() => setMathSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving math settings:", err);
    } finally {
      setLoadingMath(false);
    }
  };

  const handleAddMathSlide = () => {
    setMathSlides([
      ...mathSlides,
      {
        id: `slide-${Date.now()}`,
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        duration: 10,
        title: "New Reference Slide"
      }
    ]);
  };

  const handleRemoveMathSlide = (id: string) => {
    setMathSlides(mathSlides.filter(s => s.id !== id));
  };

  const handleUpdateMathSlide = (id: string, field: string, value: any) => {
    setMathSlides(mathSlides.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Fetch Announcement Bar Settings on Mount
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setAnnouncementLoading(true);
        const response = await fetch("/api/announcement-bar");
        if (!response.ok) {
          return;
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return;
        }
        const data = await response.json();
        if (data.success && data.announcement) {
          const ann = data.announcement;
          setAnnouncementText(ann.text || "");
          setAnnouncementCtaText(ann.ctaText || "");
          setAnnouncementCtaUrl(ann.ctaUrl || "");
          setAnnouncementIsActive(ann.isActive === 1);
          setAnnouncementTargetRole(ann.targetRole || "ALL");
          setAnnouncementScheduledStart(ann.scheduledStart || "");
          setAnnouncementScheduledUntil(ann.scheduledUntil || "");
        }
      } catch (err) {
        console.warn("Could not load announcement settings (handled gracefully):", err);
      } finally {
        setAnnouncementLoading(false);
      }
    };
    fetchAnnouncement();
  }, []);

  const toggleSwitch = (id: string) => {
    setSwitches(prev => prev.map(sw => sw.id === id ? { ...sw, active: !sw.active } : sw));
  };

  const handleSaveAll = async () => {
    // Save branding
    const brandingData = {
      logoText: localLogoText,
      logoType: localLogoType,
      logoIcon: localLogoIcon,
      logoImageUrl: localLogoImageUrl,
      faviconUrl: localFaviconUrl,
      heroBackgroundImage: localHeroBackgroundImage,
      heroSlides: localHeroSlides,
      showThemeToggle: localShowThemeToggle,
    };

    updateBranding(brandingData);

    // Save branding configuration to backend
    try {
      await fetch("/api/admin/branding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });
    } catch (err) {
      console.error("Error saving branding settings to backend:", err);
    }

    // Save Announcement Bar configuration to DB
    try {
      await fetch("/api/admin/announcement-bar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: announcementText,
          ctaText: announcementCtaText,
          ctaUrl: announcementCtaUrl,
          isActive: announcementIsActive,
          targetRole: announcementTargetRole,
          scheduledStart: announcementScheduledStart,
          scheduledUntil: announcementScheduledUntil,
        })
      });
      // Fire custom event to refresh header announcement instantly
      window.dispatchEvent(new Event("ebm_announcement_updated"));
    } catch (err) {
      console.error("Error saving announcement settings:", err);
    }

    // Save Welcome Modal Settings inside Save All
    try {
      await fetch("/api/admin/welcome-modal-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          showWelcomeModal: welcomeShow,
          title: welcomeTitle,
          highlightText: welcomeHighlightText,
          middleText: welcomeMiddleText,
          boldText: welcomeBoldText,
          gradeRangeText: welcomeGradeRangeText,
          ctaText: welcomeCtaText,
          ctaUrl: welcomeCtaUrl,
          exploreText: welcomeExploreText,
          headerBgGradientStart: welcomeGradientStart,
          headerBgGradientEnd: welcomeGradientEnd,
        })
      });
    } catch (err) {
      console.error("Error saving welcome settings inside Save All:", err);
    }
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveAnnouncementOnly = async () => {
    try {
      const res = await fetch("/api/admin/announcement-bar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: announcementText,
          ctaText: announcementCtaText,
          ctaUrl: announcementCtaUrl,
          isActive: announcementIsActive,
          targetRole: announcementTargetRole,
          scheduledStart: announcementScheduledStart,
          scheduledUntil: announcementScheduledUntil,
        })
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("ebm_announcement_updated"));
        setAnnouncementSaveSuccess(true);
        setTimeout(() => setAnnouncementSaveSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Error saving announcement bar settings:", err);
    }
  };

  const handleClearAnnouncement = async () => {
    setAnnouncementText("");
    setAnnouncementCtaText("");
    setAnnouncementCtaUrl("");
    setAnnouncementIsActive(false);
    setAnnouncementScheduledStart("");
    setAnnouncementScheduledUntil("");
    
    try {
      await fetch("/api/admin/announcement-bar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "",
          ctaText: "",
          ctaUrl: "",
          isActive: false,
          targetRole: announcementTargetRole,
          scheduledStart: "",
          scheduledUntil: "",
        })
      });
      window.dispatchEvent(new Event("ebm_announcement_updated"));
      setAnnouncementSaveSuccess(true);
      setTimeout(() => setAnnouncementSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Error clearing announcement:", err);
    }
  };

  const handleResetBranding = () => {
    resetBranding();
    // Reset local states to defaults
    setLocalLogoText("EBM Digital Learning");
    setLocalLogoType("icon");
    setLocalLogoIcon("GraduationCap");
    setLocalLogoImageUrl("");
    setLocalFaviconUrl("https://cdn-icons-png.flaticon.com/512/2201/2201552.png");
    setLocalHeroBackgroundImage("");
    setLocalShowThemeToggle(true);
    setLocalHeroSlides([
      {
        id: "slide-1",
        title: "Start Your O-Level Journey Today",
        subtitle: "Accelerated 3-year structured paths guided by the Ejaz Bukhari Method learning methodology.",
        ctaText: "Start Learning Now",
        ctaUrl: "auth-login",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "slide-2",
        title: "AI-Powered Socratic Tutoring",
        subtitle: "Continuous diagnostics, custom study plans, and live chat co-pilots helping students build elite STEM confidence.",
        ctaText: "Explore Education",
        ctaUrl: "roadmap",
        imageUrl: "/src/assets/images/academic_portal_mockup_1784360050225.jpg"
      },
      {
        id: "slide-3",
        title: "Parent Dashboard & Live Analytics",
        subtitle: "Real-time cognitive progress, detailed class attendance, and direct mentor alignment tracking.",
        ctaText: "Contact Admissions",
        ctaUrl: "contact",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
      }
    ]);
  };

  const handleSaveHeroBackgroundOnly = async () => {
    const brandingData = {
      logoText: localLogoText,
      logoType: localLogoType,
      logoIcon: localLogoIcon,
      logoImageUrl: localLogoImageUrl,
      faviconUrl: localFaviconUrl,
      heroBackgroundImage: localHeroBackgroundImage,
      heroSlides: localHeroSlides,
      showThemeToggle: localShowThemeToggle,
    };

    updateBranding(brandingData);

    try {
      await fetch("/api/admin/branding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });
      setHeroBgSaveSuccess(true);
      setTimeout(() => setHeroBgSaveSuccess(false), 2500);
    } catch (err) {
      console.error("Error saving hero background setting:", err);
    }
  };

  // High quality sample favicon options
  const faviconPresets = [
    { name: "Blue Cap", url: "https://cdn-icons-png.flaticon.com/512/2201/2201552.png" },
    { name: "Gold Star", url: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" },
    { name: "Blue Shield", url: "https://cdn-icons-png.flaticon.com/512/1067/1067357.png" },
    { name: "Purple Book", url: "https://cdn-icons-png.flaticon.com/512/2702/2702134.png" },
  ];

  // Preset background options for Hero Section
  const heroBackgroundPresets = [
    { 
      name: "Default Artwork", 
      url: "", 
      thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300&auto=format&fit=crop",
      desc: "Original illustrated learning atmosphere" 
    },
    { 
      name: "University Campus", 
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop", 
      thumb: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
      desc: "Historic brick academy architecture"
    },
    { 
      name: "Digital Education", 
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop", 
      thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop",
      desc: "Modern digital technology workspace"
    },
    { 
      name: "Academic Library", 
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600&auto=format&fit=crop", 
      thumb: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&auto=format&fit=crop",
      desc: "Grand book stacks & study desks"
    },
    { 
      name: "STEM Classroom", 
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop", 
      thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=300&auto=format&fit=crop",
      desc: "Science & active student workshop"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Platform Configuration</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Global Parameters, Brand Identity & System Policies</p>
        </div>
        <button 
          onClick={handleSaveAll}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-200 flex items-center gap-2 self-start md:self-auto"
        >
          {saveSuccess ? (
            <>
              <Check className="h-4 w-4 text-emerald-300 animate-bounce" /> Saved Successfully!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Global Config
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 sticky top-8 space-y-1">
            {[
              { id: "general", label: "General Settings", icon: Settings },
              { id: "branding", label: "Brand Identity", icon: Monitor },
              { id: "welcomeModal", label: "Welcome Popup", icon: Sparkles },
              { id: "journeys", label: "Featured Journeys", icon: GraduationCap },
              { id: "parents_journey", label: "Parents Journey", icon: Users },
              { id: "mathSlider", label: "Math Test Slider", icon: Image },
              { id: "academic", label: "Academic Cycle", icon: Sliders },
              { id: "notifications", label: "Notification Rules", icon: Bell },
              { id: "security", label: "Security & Privacy", icon: Shield },
              { id: "infrastructure", label: "Infrastructure", icon: Cloud },
              { id: "ai", label: "AI Engine Config", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive 
                      ? "bg-slate-900 text-white font-bold" 
                      : "text-slate-500 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Form Container */}
        <div className="lg:col-span-3 space-y-8">
          {activeSection === "general" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
              {/* Logo and Favicon Section (Requested Feature) */}
              <div className="pb-8 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Image className="h-4 w-4 text-blue-600" /> Website Logo & Favicon Upload
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Upload your institution's custom logo and favicon to appear across the header, portal tabs, and mobile views.</p>
                  </div>
                  <button 
                    onClick={handleResetBranding}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Reset Defaults
                  </button>
                </div>

                {/* Notifications */}
                {logoUploadSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{logoUploadSuccess}</span>
                  </div>
                )}
                {logoUploadError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-rose-800 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>{logoUploadError}</span>
                  </div>
                )}
                {faviconUploadSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{faviconUploadSuccess}</span>
                  </div>
                )}
                {faviconUploadError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-rose-800 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>{faviconUploadError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Form Controls (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Site Title */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Institution / Site Name</label>
                      <input 
                        type="text" 
                        value={localLogoText}
                        onChange={(e) => setLocalLogoText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="e.g. EBM Academy"
                      />
                    </div>

                    {/* Logo Source Mode */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Logo Asset Type & Upload</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setLocalLogoType("image")}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            localLogoType === "image"
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <UploadCloud className="h-3.5 w-3.5" /> Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setLocalLogoType("icon")}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            localLogoType === "icon"
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Sparkles className="h-3.5 w-3.5" /> System Icon
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalLogoType("image");
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            localLogoType === "image" && localLogoImageUrl && !localLogoImageUrl.startsWith("data:")
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Globe className="h-3.5 w-3.5" /> Image URL
                        </button>
                      </div>

                      {/* Upload Box for Image Mode */}
                      {localLogoType === "image" && (
                        <div className="space-y-3">
                          {/* Drag and drop upload zone */}
                          <input 
                            ref={logoInputRef}
                            type="file" 
                            accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif,image/x-icon" 
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoFile(file);
                            }}
                          />
                          <div 
                            onDragOver={(e) => { e.preventDefault(); setLogoDragActive(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setLogoDragActive(false); }}
                            onDrop={(e) => {
                              e.preventDefault();
                              setLogoDragActive(false);
                              const file = e.dataTransfer.files?.[0];
                              if (file) handleLogoFile(file);
                            }}
                            onClick={() => logoInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                              logoDragActive 
                                ? "border-blue-500 bg-blue-50/50 scale-[1.01]" 
                                : "border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/20"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center">
                                <UploadCloud className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-slate-800">
                                  Click to upload logo or drag & drop
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                  PNG, SVG, JPG, WEBP, GIF (Max 5MB)
                                </p>
                              </div>
                              <button 
                                type="button"
                                className="mt-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
                              >
                                Browse Files
                              </button>
                            </div>
                          </div>

                          {/* Image preview / URL box */}
                          {localLogoImageUrl && (
                            <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                                  <img 
                                    src={localLogoImageUrl} 
                                    alt="Logo preview" 
                                    className="max-h-full max-w-full object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-800 truncate">
                                    {localLogoImageUrl.startsWith("data:") ? "Custom Uploaded Logo" : localLogoImageUrl}
                                  </p>
                                  <p className="text-[9px] text-slate-500 font-medium">Active Logo Image</p>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => setLocalLogoImageUrl("")}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                title="Remove Logo Image"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {/* Direct URL input fallback */}
                          <div className="space-y-1 pt-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Or Paste Direct Image URL</label>
                            <input 
                              type="text" 
                              value={localLogoImageUrl}
                              onChange={(e) => setLocalLogoImageUrl(e.target.value)}
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              placeholder="https://example.com/school-logo.png"
                            />
                          </div>
                        </div>
                      )}

                      {/* Lucide Icon Picker */}
                      {localLogoType === "icon" && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Academy Emblem Icon</label>
                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {Object.entries(BRANDING_ICONS).map(([key, Icon]) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setLocalLogoIcon(key)}
                                className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                                  localLogoIcon === key
                                    ? "bg-slate-900 border-slate-900 text-white shadow-md scale-110"
                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                }`}
                                title={key}
                              >
                                <Icon className="h-5 w-5" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Favicon Upload Section */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Browser Favicon Icon</label>
                          <p className="text-[9px] text-slate-500 font-medium">Upload a .ico, .png, or .svg to change the browser tab icon in real-time.</p>
                        </div>
                        {localFaviconUrl && (
                          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1">
                            <img src={localFaviconUrl} alt="Favicon" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>

                      {/* Favicon File Upload Box */}
                      <input 
                        ref={faviconInputRef}
                        type="file" 
                        accept="image/x-icon,image/png,image/svg+xml,image/jpeg,image/webp" 
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFaviconFile(file);
                        }}
                      />
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setFaviconDragActive(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setFaviconDragActive(false); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setFaviconDragActive(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleFaviconFile(file);
                        }}
                        onClick={() => faviconInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer ${
                          faviconDragActive 
                            ? "border-blue-500 bg-blue-50/50" 
                            : "border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/20"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                            <FileUp className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-black text-slate-800">
                              Upload Favicon (.ico, .png, .svg)
                            </p>
                            <p className="text-[9px] text-slate-500 font-medium">
                              Click or drop image file (Max 2MB)
                            </p>
                          </div>
                          <button 
                            type="button"
                            className="ml-auto px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-700 shadow-xs"
                          >
                            Browse
                          </button>
                        </div>
                      </div>

                      {/* Favicon URL Input */}
                      <input 
                        type="text" 
                        value={localFaviconUrl}
                        onChange={(e) => {
                          setLocalFaviconUrl(e.target.value);
                          applyFavicon(e.target.value);
                        }}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="https://example.com/favicon.ico"
                      />

                      {/* Favicon Preset Templates */}
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Preset Favicon Icons</p>
                        <div className="flex flex-wrap gap-2">
                          {faviconPresets.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setLocalFaviconUrl(preset.url);
                                applyFavicon(preset.url);
                              }}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                                localFaviconUrl === preset.url
                                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              <img src={preset.url} alt="" className="h-3.5 w-3.5 object-contain" referrerPolicy="no-referrer" />
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Theme Toggle Master Switch */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="max-w-[75%]">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Display Theme Toggle Icon</label>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Show or hide the dark/light mode button on the website header</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setLocalShowThemeToggle(!localShowThemeToggle)}
                          className={`w-12 h-6 rounded-full relative transition-colors shrink-0 cursor-pointer ${localShowThemeToggle ? "bg-blue-600" : "bg-slate-300"}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${localShowThemeToggle ? "right-1" : "left-1"}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Branding Live Preview (5 Cols) */}
                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-400" />
                          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Real-Time Portal Preview</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-wider rounded-md border border-emerald-500/30">
                          Live Sync
                        </span>
                      </div>

                      {/* Header Navbar Preview */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Top Header Navigation Bar</p>
                        <div className="bg-[#00a3e0] text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {/* Logo Badge */}
                            <div className={`flex items-center justify-center ${
                              (localLogoType === "image" || localLogoImageUrl) && localLogoImageUrl
                                ? "bg-transparent min-w-[32px] min-h-[32px]"
                                : "bg-white rounded-lg p-1.5 shadow-xs min-w-[32px] min-h-[32px]"
                            }`}>
                              {localLogoType === "icon" ? (
                                (() => {
                                  const IconComponent = BRANDING_ICONS[localLogoIcon] || BRANDING_ICONS.GraduationCap;
                                  return <IconComponent className="h-4.5 w-4.5 text-[#00a3e0]" />;
                                })()
                              ) : localLogoImageUrl ? (
                                <img 
                                  src={localLogoImageUrl} 
                                  alt="Logo" 
                                  className="h-6 w-auto max-w-[80px] object-contain bg-transparent" 
                                  referrerPolicy="no-referrer" 
                                />
                              ) : (
                                <span className="text-[10px] font-black text-[#00a3e0] tracking-tighter">EBM</span>
                              )}
                            </div>
                            <div>
                              <h5 className="text-xs font-black tracking-tight leading-none text-white drop-shadow-xs">
                                {localLogoText || "EBM Academy"}
                              </h5>
                              <p className="text-[8px] text-white/80 font-semibold mt-0.5">Online Learning Portal</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="w-7 h-2 rounded-full bg-white/30" />
                            <span className="w-7 h-2 rounded-full bg-white/20" />
                          </div>
                        </div>
                      </div>

                      {/* Browser Tab Preview */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Browser Tab Icon & Title</p>
                        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
                          <div className="w-5 h-5 flex items-center justify-center bg-white rounded-md p-0.5 overflow-hidden shrink-0">
                            <img 
                              src={localFaviconUrl} 
                              alt="Favicon" 
                              className="h-full w-full object-contain" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold text-slate-200 truncate">
                              {localLogoText || "EBM Academy"} &bull; Portal
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold shrink-0">✕</span>
                        </div>
                      </div>

                      {/* Mobile Header Preview */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mobile View Representation</p>
                        <div className="bg-slate-800/80 rounded-2xl p-2.5 border border-slate-700/60 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 flex items-center justify-center overflow-hidden p-0.5 ${
                              (localLogoType === "image" || localLogoImageUrl) && localLogoImageUrl ? "bg-transparent" : "rounded bg-white"
                            }`}>
                              {localLogoType === "icon" ? (
                                (() => {
                                  const IconComponent = BRANDING_ICONS[localLogoIcon] || BRANDING_ICONS.GraduationCap;
                                  return <IconComponent className="h-3 w-3 text-[#00a3e0]" />;
                                })()
                              ) : localLogoImageUrl ? (
                                <img src={localLogoImageUrl} alt="" className="h-full w-full object-contain bg-transparent" referrerPolicy="no-referrer" />
                              ) : (
                                <span className="text-[7px] font-bold text-[#00a3e0]">EBM</span>
                              )}
                            </div>
                            <span className="text-[9px] font-black text-slate-300 truncate max-w-[120px]">
                              {localLogoText || "EBM Academy"}
                            </span>
                          </div>
                          <div className="w-3.5 h-2.5 flex flex-col justify-between">
                            <span className="w-full h-0.5 bg-slate-500 rounded" />
                            <span className="w-full h-0.5 bg-slate-500 rounded" />
                            <span className="w-full h-0.5 bg-slate-500 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] font-medium text-slate-400">
                      Uploaded assets are saved and synchronized globally across all modules when you click <strong className="text-blue-400 font-bold">Save Global Config</strong>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Section Background Image (Requested Feature) */}
              <div className="pb-8 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Hero Section Background Image</h3>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200/60 rounded-md text-[9px] font-black uppercase tracking-wider">Homepage Hero</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Customize the background image displayed on the public EBM homepage hero section.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setLocalHeroBackgroundImage("")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" /> Default Vector Artwork
                    </button>
                    <button 
                      type="button"
                      onClick={handleSaveHeroBackgroundOnly}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      {heroBgSaveSuccess ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-300" /> Saved!
                        </>
                      ) : (
                        <>
                          <Save className="h-3 w-3" /> Save Background
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                  {/* Left Column: Input and Presets */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Custom Background Image URL
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text" 
                            value={localHeroBackgroundImage}
                            onChange={(e) => setLocalHeroBackgroundImage(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            placeholder="https://images.unsplash.com/... or /src/assets/..."
                          />
                        </div>
                        {localHeroBackgroundImage && (
                          <button
                            type="button"
                            onClick={() => setLocalHeroBackgroundImage("")}
                            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors"
                            title="Clear Image URL"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Enter any valid image URL or choose from the curated educational preset scenes below. Leave empty to use default vector illustration.
                      </p>
                    </div>

                    {/* Preset Gallery */}
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Curated Atmosphere Presets
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {heroBackgroundPresets.map((preset) => {
                          const isSelected = localHeroBackgroundImage === preset.url;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setLocalHeroBackgroundImage(preset.url)}
                              className={`group relative overflow-hidden rounded-2xl border text-left p-2.5 transition-all cursor-pointer ${
                                isSelected 
                                  ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20" 
                                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/80"
                              }`}
                            >
                              <div className="h-16 w-full rounded-xl overflow-hidden mb-2 bg-slate-200 relative">
                                <img 
                                  src={preset.thumb} 
                                  alt={preset.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />
                                {isSelected && (
                                  <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                                    <Check className="h-3 w-3" />
                                  </div>
                                )}
                              </div>
                              <p className="text-[11px] font-black text-slate-800 leading-snug">{preset.name}</p>
                              <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">{preset.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Hero Preview */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 rounded-3xl p-5 text-white overflow-hidden relative shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-400" />
                          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Live Hero Preview</h4>
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md">
                          {localHeroBackgroundImage ? "Custom Backend Image" : "Default Graphic"}
                        </span>
                      </div>

                      {/* Preview Canvas Container */}
                      <div 
                        className="w-full rounded-2xl min-h-[160px] bg-cover bg-center bg-no-repeat relative overflow-hidden flex flex-col items-center justify-center p-4 border border-white/10 shadow-inner"
                        style={{
                          backgroundImage: localHeroBackgroundImage && localHeroBackgroundImage.trim() !== ""
                            ? `url("${localHeroBackgroundImage}")`
                            : `url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop")`
                        }}
                      >
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px]" />
                        
                        <div className="relative z-10 text-center space-y-2 max-w-[90%]">
                          <h5 className="text-xs font-serif text-[#00a3e0] font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
                            EBM <span className="italic">is</span> personalized learning
                          </h5>
                          
                          {/* Mini Cloud Indicators */}
                          <div className="grid grid-cols-3 gap-1.5 pt-1">
                            <div className="bg-white/95 rounded-lg p-1.5 border border-sky-400 shadow-xs text-center">
                              <span className="text-[7px] font-black text-sky-800 block uppercase">Comprehensive</span>
                            </div>
                            <div className="bg-white/95 rounded-lg p-1.5 border border-sky-400 shadow-xs text-center">
                              <span className="text-[7px] font-black text-sky-800 block uppercase">Continuous</span>
                            </div>
                            <div className="bg-white/95 rounded-lg p-1.5 border border-sky-400 shadow-xs text-center">
                              <span className="text-[7px] font-black text-sky-800 block uppercase">Targeted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-medium text-slate-400">
                      Syncs automatically to the backend DB via <span className="text-blue-400 font-mono text-[9px]">/api/branding</span> and is loaded dynamically on the public portal.
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Announcement Bar Config */}
              <div className="pb-8 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Top Announcement Banner</h3>
                    <p className="text-xs text-slate-500 font-medium">Configure a global, role-targeted notification bar displayed at the very top of the portal.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleClearAnnouncement}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors"
                    >
                      Remove Content
                    </button>
                    <button 
                      onClick={handleSaveAnnouncementOnly}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors"
                    >
                      {announcementSaveSuccess ? "Updated!" : "Update Banner"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Announcement Content Text</label>
                      <textarea 
                        rows={2}
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                        placeholder="e.g. Admissions Open for Session 2026 — Start your O Level Journey Today!"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">CTA Action Text</label>
                        <input 
                          type="text" 
                          value={announcementCtaText}
                          onChange={(e) => setAnnouncementCtaText(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="e.g. Apply Now"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">CTA URL / Path</label>
                        <input 
                          type="text" 
                          value={announcementCtaUrl}
                          onChange={(e) => setAnnouncementCtaUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="e.g. #pricing"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Target Audience Role</label>
                        <select 
                          value={announcementTargetRole}
                          onChange={(e) => setAnnouncementTargetRole(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="ALL">Everyone (ALL)</option>
                          <option value="PARENT">Parents Only</option>
                          <option value="STUDENT">Students Only</option>
                          <option value="TEACHER">Teachers Only</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Banner Status</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setAnnouncementIsActive(true)}
                            className={`flex-1 py-2.5 px-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${
                              announcementIsActive
                                ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            Enabled
                          </button>
                          <button
                            type="button"
                            onClick={() => setAnnouncementIsActive(false)}
                            className={`flex-1 py-2.5 px-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${
                              !announcementIsActive
                                ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            Disabled
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduling and Interactive Live Preview */}
                  <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Timing & Delivery Settings</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Start Time</label>
                          <input 
                            type="datetime-local" 
                            value={announcementScheduledStart}
                            onChange={(e) => setAnnouncementScheduledStart(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-800 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Expiration (Scheduled Until)</label>
                          <input 
                            type="datetime-local" 
                            value={announcementScheduledUntil}
                            onChange={(e) => setAnnouncementScheduledUntil(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4 space-y-1.5">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Live Banner View Preview</p>
                        {announcementIsActive && announcementText ? (
                          <div className="bg-amber-500 text-slate-950 px-3 py-2 rounded-xl text-xs font-black flex items-center justify-between shadow-xs border border-amber-600">
                            <span className="truncate flex items-center gap-1.5">
                              <span className="bg-slate-950 text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                                {announcementTargetRole === "ALL" ? "Global" : announcementTargetRole}
                              </span>
                              <span>{announcementText}</span>
                            </span>
                            {announcementCtaText && (
                              <span className="underline ml-2 text-[10px] shrink-0 font-black">
                                {announcementCtaText} &rarr;
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="bg-slate-100 text-slate-400 border border-dashed border-slate-300 p-4 rounded-xl text-center text-xs font-bold italic">
                            Banner is currently disabled or empty. It will not be shown to any role.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[9px] font-medium text-slate-400 mt-2">
                      Leave scheduling empty to display the banner unconditionally. Scheduled banners will activate automatically when start is reached and hide when expired.
                    </div>
                  </div>
                </div>
              </div>

              {/* Institution Identity */}
              <div className="pb-8 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Institution Identity</h3>
                <p className="text-xs text-slate-500 font-medium">Define how the school is represented across the platform.</p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School Full Name</label>
                    <input 
                      type="text" 
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Short Name</label>
                    <input 
                      type="text" 
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email Alias</label>
                    <input 
                      type="email" 
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Domain</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic & Localization */}
              <div className="pb-8 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Academic & Localization</h3>
                <p className="text-xs text-slate-500 font-medium">Configure timezone, currency and date formatting.</p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Currency</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none"
                    >
                      <option>PKR (Rs.)</option>
                      <option>USD ($)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Zone</label>
                    <select 
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none"
                    >
                      <option>Asia/Karachi (GMT+5)</option>
                      <option>UTC (GMT+0)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Format</label>
                    <select 
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Master Switches */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Master Switches</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {switches.map((sw) => (
                    <div key={sw.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{sw.label}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{sw.desc}</p>
                      </div>
                      <button 
                        onClick={() => toggleSwitch(sw.id)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${sw.active ? "bg-blue-600" : "bg-slate-300"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${sw.active ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "journeys" && (
            <FeaturedJourneysConfig />
          )}

          {activeSection === "parents_journey" && (
            <ParentsJourneyConfig />
          )}

          {activeSection === "branding" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Interactive Home Slider Config</h3>
                  <p className="text-xs text-slate-500 font-medium">Manage the slides, text overlays, high-fidelity images, and action buttons for the primary Home Hero Slider.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => {
                      const newId = `slide-${Date.now()}`;
                      setLocalHeroSlides([
                        ...localHeroSlides,
                        {
                          id: newId,
                          title: "New Interactive Learning Node",
                          subtitle: "Custom-configured super accelerated educational path for ambitious STEM students.",
                          ctaText: "Start Node Now",
                          ctaUrl: "auth-login",
                          imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop"
                        }
                      ]);
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    + Add New Slide
                  </button>
                  <button 
                    type="button"
                    onClick={handleResetBranding}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {localHeroSlides.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 italic font-medium text-xs">
                  No slides configured. Add a slide or reset to defaults.
                </div>
              ) : (
                <div className="space-y-8">
                  {localHeroSlides.map((slide, index) => (
                    <div key={slide.id} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 relative group">
                      <div className="absolute top-6 right-6 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-750 text-[9px] font-mono font-bold uppercase rounded-lg">Slide {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalHeroSlides(localHeroSlides.filter(s => s.id !== slide.id));
                          }}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Slide"
                        >
                          <span className="text-[10px] font-black font-mono">✕</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Slide Inputs (Title, Subtitle, CTA text/URL) */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Slide Title</label>
                            <input 
                              type="text" 
                              value={slide.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setLocalHeroSlides(localHeroSlides.map(s => s.id === slide.id ? { ...s, title: val } : s));
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-950 focus:outline-none"
                              placeholder="e.g. Master STEM subjects accelerated"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Slide Subtitle / Description</label>
                            <textarea 
                              rows={2}
                              value={slide.subtitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                setLocalHeroSlides(localHeroSlides.map(s => s.id === slide.id ? { ...s, subtitle: val } : s));
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-950 focus:outline-none resize-none"
                              placeholder="A comprehensive short explanation of this educational pathway..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Button Text (CTA)</label>
                              <input 
                                type="text" 
                                value={slide.ctaText}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setLocalHeroSlides(localHeroSlides.map(s => s.id === slide.id ? { ...s, ctaText: val } : s));
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-950 focus:outline-none"
                                placeholder="e.g. Start Learning"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Button URL / Trigger Action</label>
                              <select 
                                value={slide.ctaUrl}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setLocalHeroSlides(localHeroSlides.map(s => s.id === slide.id ? { ...s, ctaUrl: val } : s));
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-950 focus:outline-none"
                              >
                                <option value="auth-login">Login / Sign Up Flow (auth-login)</option>
                                <option value="roadmap">Education Roadmap (roadmap)</option>
                                <option value="contact">Contact Admissions (contact)</option>
                                <option value="about">About Method (about)</option>
                                <option value="journey">Dynamic Learning Node scroll (journey)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Slide Image Backdrop URL & Preview */}
                        <div className="md:col-span-1 space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Image URL / Backdrop</label>
                            <input 
                              type="text" 
                              value={slide.imageUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setLocalHeroSlides(localHeroSlides.map(s => s.id === slide.id ? { ...s, imageUrl: val } : s));
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-mono text-slate-800 focus:outline-none"
                              placeholder="https://images.unsplash.com/photo-..."
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Backdrop Live Thumbnail</label>
                            <div className="relative rounded-2xl h-24 overflow-hidden bg-slate-950 border border-slate-200 shadow-inner group">
                              {slide.imageUrl ? (
                                <img 
                                  src={slide.imageUrl} 
                                  alt="Slide Preview" 
                                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono text-[9px] font-bold">NO IMAGE URL</div>
                              )}
                              <div className="absolute inset-0 bg-slate-900/60 p-2.5 flex flex-col justify-end">
                                <span className="text-[10px] text-white font-black truncate">{slide.title || "Untitled Title"}</span>
                                <span className="text-[8px] text-amber-400 font-black tracking-widest uppercase mt-0.5">{slide.ctaText || "CTA BUTTON"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "welcomeModal" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-emerald-500" /> Welcome Popup Configuration
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Configure the beautiful modal that greets first-time visitors of the platform to drive sign-ups.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveWelcomeSettings}
                    disabled={loadingWelcome}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition cursor-pointer shadow-sm"
                  >
                    {welcomeSaveSuccess ? "Saved!" : loadingWelcome ? "Saving..." : "Save Popup Config"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="space-y-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Enable Welcome Popup</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Show this popup to users visiting the site for the first time.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setWelcomeShow(!welcomeShow)}
                        className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${welcomeShow ? "bg-emerald-500" : "bg-slate-300"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${welcomeShow ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Modal Title</label>
                      <input 
                        type="text" 
                        value={welcomeTitle}
                        onChange={(e) => setWelcomeTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="e.g. First time here?"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Highlight Text (Colored)</label>
                      <input 
                        type="text" 
                        value={welcomeHighlightText}
                        onChange={(e) => setWelcomeHighlightText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="e.g. 1 in 4 students"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Middle Text (Regular)</label>
                      <input 
                        type="text" 
                        value={welcomeMiddleText}
                        onChange={(e) => setWelcomeMiddleText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="e.g. uses EBM Digital Learning for academic"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ending Bold Highlight Text (Colored)</label>
                      <input 
                        type="text" 
                        value={welcomeBoldText}
                        onChange={(e) => setWelcomeBoldText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="e.g. help and enrichment."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Grade Range Subheading</label>
                      <input 
                        type="text" 
                        value={welcomeGradeRangeText}
                        onChange={(e) => setWelcomeGradeRangeText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="e.g. Pre-K through 12th grade"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary CTA Text</label>
                        <input 
                          type="text" 
                          value={welcomeCtaText}
                          onChange={(e) => setWelcomeCtaText(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary CTA URL</label>
                        <input 
                          type="text" 
                          value={welcomeCtaUrl}
                          onChange={(e) => setWelcomeCtaUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Secondary Explore Button Text</label>
                      <input 
                        type="text" 
                        value={welcomeExploreText}
                        onChange={(e) => setWelcomeExploreText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Header Gradient Start</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={welcomeGradientStart}
                            onChange={(e) => setWelcomeGradientStart(e.target.value)}
                            className="w-10 h-10 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input 
                            type="text" 
                            value={welcomeGradientStart}
                            onChange={(e) => setWelcomeGradientStart(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700 uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Header Gradient End</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={welcomeGradientEnd}
                            onChange={(e) => setWelcomeGradientEnd(e.target.value)}
                            className="w-10 h-10 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input 
                            type="text" 
                            value={welcomeGradientEnd}
                            onChange={(e) => setWelcomeGradientEnd(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-4 w-4 text-slate-400" />
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Dynamic Preview</h4>
                    </div>

                    {/* Interactive Modal Wrapper */}
                    <div className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto transition-all">
                      {/* Modal Header */}
                      <div 
                        className="relative p-6 text-center text-white"
                        style={{
                          background: `linear-gradient(135deg, ${welcomeGradientStart}, ${welcomeGradientEnd})`
                        }}
                      >
                        <button className="absolute top-3 right-3 text-white/70 hover:text-white text-sm font-bold">✕</button>
                        <h4 className="text-lg font-black tracking-tight">{welcomeTitle}</h4>
                        
                        {/* Wavy bottom border accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-white" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }} />
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 text-center space-y-5 bg-white relative">
                        {/* Fake Left & Right illustrations for visualization */}
                        <div className="absolute left-1 top-12 opacity-30 pointer-events-none text-xl">🏆📜</div>
                        <div className="absolute right-1 top-12 opacity-30 pointer-events-none text-xl">🧪📚</div>

                        <p className="text-xs text-slate-700 font-bold leading-relaxed px-2">
                          <span className="text-[#ff5c5c] font-black">{welcomeHighlightText}</span>{' '}
                          {welcomeMiddleText}{' '}
                          <span className="text-[#ff5c5c] font-black">{welcomeBoldText}</span>
                        </p>

                        <div className="flex items-center justify-center gap-2">
                          <span className="h-px bg-slate-200 w-8" />
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 shrink-0">{welcomeGradeRangeText}</span>
                          <span className="h-px bg-slate-200 w-8" />
                        </div>

                        <div className="space-y-2 px-4">
                          <button 
                            type="button"
                            className="w-full py-2 bg-[#05c4a6] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition shadow-md shadow-[#05c4a6]/10"
                            style={{ backgroundColor: welcomeGradientStart }}
                          >
                            {welcomeCtaText}
                          </button>
                          <button 
                            type="button"
                            className="w-full py-2 border text-slate-600 border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-xl transition"
                          >
                            {welcomeExploreText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-medium text-slate-400 leading-normal text-center pt-4 border-t border-slate-200/60">
                    This popup utilizes local storage tracking to guarantee it only appears during a visitor&apos;s very first session, remaining non-intrusive for returning accounts.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "mathSlider" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Image className="h-5 w-5 text-blue-600" /> Math Exam Reference Slider Configuration
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Set reference sheets, diagrams, and formula cheat sheets shown automatically on the right-hand side of live Mathematics tests.
                </p>
              </div>

              {/* Layout Split Ratio Option */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Layout Division Split Ratio</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Define how much of the screen space is dedicated to the reference slider vs the question text.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-black text-blue-600">{100 - splitPercentage}%</span>
                    <span className="text-[10px] text-slate-400 font-bold">/</span>
                    <span className="text-xs font-black text-amber-500">{splitPercentage}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question ({100 - splitPercentage}%)</span>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={splitPercentage}
                    onChange={(e) => setSplitPercentage(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slider ({splitPercentage}%)</span>
                </div>

                {/* Split Visual Preview */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Division Preview</span>
                  <div className="h-8 rounded-xl overflow-hidden flex text-[10px] font-black uppercase text-center text-white select-none border border-slate-300 shadow-inner">
                    <div 
                      className="bg-blue-600 flex items-center justify-center transition-all duration-300" 
                      style={{ width: `${100 - splitPercentage}%` }}
                    >
                      Question Area ({100 - splitPercentage}%)
                    </div>
                    <div 
                      className="bg-amber-500 flex items-center justify-center transition-all duration-300" 
                      style={{ width: `${splitPercentage}%` }}
                    >
                      Slider ({splitPercentage}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Slides Configuration List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Slider Images & Display Timings</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Manage slides. Each slide will display consecutively for its allotted time.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMathSlide}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Reference Slide
                  </button>
                </div>

                {mathSlides.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                    <Image className="h-10 w-10 text-slate-300 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">No slides configured</p>
                    <p className="text-[11px] text-slate-400">Click &ldquo;Add Reference Slide&rdquo; above to start adding reference materials.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mathSlides.map((slide, idx) => (
                      <div 
                        key={slide.id} 
                        className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition duration-150 grid grid-cols-1 md:grid-cols-12 gap-5 items-start relative group"
                      >
                        {/* Drag indicator/Index */}
                        <div className="md:col-span-1 flex items-center justify-center h-full">
                          <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Fields */}
                        <div className="md:col-span-7 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Slide Title</label>
                              <input
                                type="text"
                                value={slide.title || ""}
                                onChange={(e) => handleUpdateMathSlide(slide.id, "title", e.target.value)}
                                placeholder="e.g. Geometry Formula Sheet"
                                className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition shadow-xs"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" /> Display Time (seconds)
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="300"
                                value={slide.duration || 10}
                                onChange={(e) => handleUpdateMathSlide(slide.id, "duration", Math.max(1, Number(e.target.value)))}
                                className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition shadow-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Image URL</label>
                            <input
                              type="text"
                              value={slide.imageUrl || ""}
                              onChange={(e) => handleUpdateMathSlide(slide.id, "imageUrl", e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 transition shadow-xs font-mono truncate"
                            />
                          </div>
                        </div>

                        {/* Real-time image preview */}
                        <div className="md:col-span-3 space-y-1">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Live Preview</label>
                          <div className="aspect-video rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative shadow-sm">
                            {slide.imageUrl ? (
                              <img
                                src={slide.imageUrl}
                                alt="Slide Preview"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as any).src = "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200";
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">No Image</div>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="md:col-span-1 flex justify-end md:justify-center items-center h-full">
                          <button
                            type="button"
                            onClick={() => handleRemoveMathSlide(slide.id)}
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Remove slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveMathSettings}
                  disabled={loadingMath}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {mathSaveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 animate-bounce" /> Configuration Saved!
                    </>
                  ) : loadingMath ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Math Config
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeSection !== "general" && activeSection !== "journeys" && activeSection !== "parents_journey" && activeSection !== "branding" && activeSection !== "mathSlider" && activeSection !== "welcomeModal" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
                <Sliders className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                {activeSection.toUpperCase()} configuration
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 max-w-md">
                This configuration group is currently inherited from the central Enterprise ERP policies. Edits can be locked or managed via direct database hooks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
