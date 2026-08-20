import React, { useState, useEffect } from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Award, 
  Flame, 
  Zap, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  BookOpen, 
  Edit, 
  Save, 
  ChevronRight, 
  ArrowLeft,
  Camera,
  Star,
  GraduationCap,
  Target,
  Brain,
  Monitor,
  Calendar,
  Globe,
  Volume2,
  CheckCircle2,
  Users,
  Settings as SettingsIcon,
  Link as LinkIcon
} from "lucide-react";
type AcademicProfile = any;
type LearningPreference = any;
type StudyAvailability = any;
type TechnologyProfile = any;

// Pre-defined avatars to choose from
const AVATARS = [
  { id: "owl", emoji: "🦉", name: "Smart Owl", bg: "from-amber-400 to-orange-500" },
  { id: "astronaut", emoji: "👩‍🚀", name: "Space Ranger", bg: "from-blue-500 to-indigo-600" },
  { id: "goggles", emoji: "🥽", name: "STEM Pioneer", bg: "from-teal-400 to-emerald-500" },
  { id: "wizard", emoji: "🧙", name: "Math Wizard", bg: "from-purple-500 to-pink-500" },
  { id: "lightbulb", emoji: "💡", name: "Spark Mind", bg: "from-yellow-400 to-amber-500" },
  { id: "fox", emoji: "🦊", name: "Clever Fox", bg: "from-red-400 to-orange-500" },
];

export function UserProfile() {
  const { data, setView, updateStudentData, updateOnboardingData } = useDashboardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"overview" | "onboarding">("overview");

  // Basic Profile State
  const [name, setName] = useState(data?.studentName || "Student");
  const [grade, setGrade] = useState(data?.currentGrade || "Grade 1");
  const [level, setLevel] = useState(data?.currentLevel || "Primary (Year 1)");
  const [bio, setBio] = useState("Accelerating through standard secondary curriculum to target early CIE O-Level exam entries. Passionate about CS and Physics!");
  const [parentEmail, setParentEmail] = useState(data?.onboardingData?.profile?.parentEmail || "");

  // Onboarding Data State
  const [academicData, setAcademicData] = useState<Partial<AcademicProfile>>(data?.onboardingData?.academic || {});
  const [preferenceData, setPreferenceData] = useState<Partial<LearningPreference>>(data?.onboardingData?.preferences || {});
  const [goalsData, setGoalsData] = useState<string[]>(data?.onboardingData?.goals || []);
  const [availabilityData, setAvailabilityData] = useState<Partial<StudyAvailability>>(data?.onboardingData?.availability || {});
  const [techData, setTechData] = useState<Partial<TechnologyProfile>>(data?.onboardingData?.technology || {});
  
  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  
  useEffect(() => {
    if (data && !isEditing) {
      setName(data.studentName || "Student");
      setGrade(data.currentGrade || "Grade 1");
      setLevel(data.currentLevel || "Primary (Year 1)");
      
      if (data.onboardingData) {
        setParentEmail(data.onboardingData.profile?.parentEmail || "");
        setAcademicData(data.onboardingData.academic || {});
        setPreferenceData(data.onboardingData.preferences || {});
        setGoalsData(data.onboardingData.goals || []);
        setAvailabilityData(data.onboardingData.availability || {});
        setTechData(data.onboardingData.technology || {});
      }
    }
  }, [data, isEditing]);
  
  // Avatar selection state
  const [currentAvatar, setCurrentAvatar] = useState(() => {
    return localStorage.getItem("ebm_avatar_id") || "owl";
  });
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const activeAvatar = AVATARS.find(a => a.id === currentAvatar) || AVATARS[0];

  const handleSave = async () => {
    // Update basic student data
    updateStudentData({
      studentName: name,
      currentGrade: grade,
      currentLevel: level
    });
    
    // Update onboarding/personalization data
    const updatedOnboarding = {
      profile: { 
        ...(data?.onboardingData?.profile || {
          preferredName: name,
          dateOfBirth: "",
          country: "",
          city: "",
          preferredLanguage: "English",
          timezone: "UTC"
        }),
        preferredName: name, 
        parentEmail: parentEmail 
      },
      academic: { ...academicData, currentGrade: grade } as AcademicProfile,
      preferences: preferenceData as LearningPreference,
      goals: goalsData,
      availability: availabilityData as StudyAvailability,
      technology: techData as TechnologyProfile
    };

    await updateOnboardingData(updatedOnboarding);
    
    // Also save email/metadata to ebm_user if available
    const userStr = localStorage.getItem("ebm_user");
    let profilePicToSave = "";
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        u.name = name;
        u.parentEmail = parentEmail;
        u.profilePictureUrl = u.profilePictureUrl || activeAvatar.emoji;
        profilePicToSave = u.profilePictureUrl;
        localStorage.setItem("ebm_user", JSON.stringify(u));

        // Sync with backend database
        const token = localStorage.getItem("ebm_token");
        fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: u.id || u.userId,
            name,
            profilePictureUrl: profilePicToSave,
            role: "STUDENT"
          })
        }).then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log("Student profile synchronized with server");
            }
          }).catch(err => {
            console.error("Error syncing student profile with server:", err);
          });
      } catch (e) {}
    }
    
    localStorage.setItem("ebm_avatar_id", currentAvatar);
    localStorage.setItem("ebm_parent_email", parentEmail);
    
    setSuccessMsg("Profile successfully updated!");
    setIsEditing(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Level XP calculations (e.g. level 12)
  const xp = data?.statistics?.totalXp || 12450;
  const currentLvlNum = Math.floor(xp / 1000) || 12;
  const xpInCurrentLvl = xp % 1000;
  const xpNeededForNext = 1000;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLvl / xpNeededForNext) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Back button and title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView(DashboardView.OVERVIEW)}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all hover:scale-105 active:scale-95"
            title="Back to Overview"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Profile</h2>
            <p className="text-slate-500 text-xs mt-0.5">Manage your digital academy credentials and review analytics</p>
          </div>
        </div>
        
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm animate-fade-in">
            ✨ {successMsg}
          </div>
        )}
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 absolute top-0 left-0 right-0 z-0"></div>
        
        <div className="pt-16 pb-6 px-6 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar frame */}
          <div className="relative">
            <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${activeAvatar.bg} flex items-center justify-center text-5xl shadow-lg border-4 border-white`}>
              {activeAvatar.emoji}
            </div>
            <button 
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
              className="absolute bottom-0 right-0 p-2 bg-slate-800 hover:bg-slate-950 text-white rounded-xl shadow-md transition-transform hover:scale-110 active:scale-95"
              title="Change Avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Profile basic info */}
          <div className="flex-1 text-center md:text-left space-y-2 mt-2">
            {isEditing ? (
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Grade</label>
                    <input 
                      type="text" 
                      value={grade} 
                      onChange={e => setGrade(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">EBM Accelerated Year</label>
                    <input 
                      type="text" 
                      value={level} 
                      onChange={e => setLevel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Parent Email Address (Linked for Dashboard Access)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                      type="email" 
                      value={parentEmail} 
                      onChange={e => setParentEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
                  {name}
                  <span title="Academic Verified Profile">
                    <ShieldCheck className="h-5 w-5 text-amber-500" />
                  </span>
                </h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1 text-xs text-slate-500 font-medium">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-bold">{grade}</span>
                  <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold">{level}</span>
                  <span className="text-slate-400">•</span>
                  <span>student@ebm.edu</span>
                  {parentEmail && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        <Mail className="h-3 w-3" /> {parentEmail}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {isEditing ? (
              <div className="pt-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bio</label>
                <textarea 
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 outline-none focus:border-amber-500 focus:bg-white resize-none"
                />
              </div>
            ) : (
              <p className="text-slate-600 text-xs leading-relaxed max-w-xl">
                {bio}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="shrink-0 self-center md:self-start mt-2">
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" /> Save Changes
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 border border-slate-200/50"
              >
                <Edit className="h-3.5 w-3.5" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Avatar selector modal/panel overlay */}
        {showAvatarSelector && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 animate-slide-up">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Choose Your Study Persona</h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {AVATARS.map(avatar => (
                <button 
                  key={avatar.id}
                  onClick={() => {
                    setCurrentAvatar(avatar.id);
                    setShowAvatarSelector(false);
                    localStorage.setItem("ebm_avatar_id", avatar.id);
                  }}
                  className={`p-3 rounded-2xl border bg-white flex flex-col items-center gap-2 transition hover:border-amber-400 group hover:shadow-md ${currentAvatar === avatar.id ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200/60"}`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{avatar.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-600 truncate max-w-full">{avatar.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Section Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button 
          onClick={() => setActiveProfileTab("overview")}
          className={`pb-3 text-xs font-bold transition-all relative ${activeProfileTab === "overview" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          Performance Overview
          {activeProfileTab === "overview" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveProfileTab("onboarding")}
          className={`pb-3 text-xs font-bold transition-all relative ${activeProfileTab === "onboarding" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          Learning Profile (Onboarding)
          {activeProfileTab === "onboarding" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></div>}
        </button>
      </div>

      {activeProfileTab === "overview" ? (
        <>
          {!parentEmail && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 animate-pulse-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Connect Parent Account</h5>
                  <p className="text-[10px] text-slate-500 font-medium">Link your parent's email to share your progress and unlock rewards.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsEditing(true);
                  // Optionally scroll to input or just let them see it at the top
                }}
                className="px-3 py-1.5 bg-amber-500 text-slate-900 text-[10px] font-black rounded-lg hover:bg-amber-600 transition shadow-sm"
              >
                Connect Now
              </button>
            </div>
          )}
          {/* Level and Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level Info (Left Panel) */}
        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-black block mb-1">Experience Matrix</span>
            <h4 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Level {currentLvlNum}
              <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-bold">Advanced Spark</span>
            </h4>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>{xpInCurrentLvl} / {xpNeededForNext} XP</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal">
            Earn <strong>{1000 - xpInCurrentLvl} more XP</strong> by completing daily revision tasks, submitting assignments, or consulting the Gemini AI Advisor.
          </p>
        </div>

        {/* Quick Analytics Counters */}
        <div className="md:col-span-2 bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm">
          <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-black block mb-4">Academic Speedometer</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 text-center space-y-1">
              <Flame className="h-5 w-5 text-orange-500 mx-auto fill-orange-500/10" />
              <span className="text-xl font-black text-slate-900 block">{data?.statistics?.learningStreakDays || 0}</span>
              <span className="text-[10px] text-slate-500 block font-bold">Active Streak</span>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 text-center space-y-1">
              <Clock className="h-5 w-5 text-blue-500 mx-auto fill-blue-500/10" />
              <span className="text-xl font-black text-slate-900 block">{data?.statistics?.monthlyStudyHours || 0}h</span>
              <span className="text-[10px] text-slate-500 block font-bold">Study Hours</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-center space-y-1">
              <TrendingUp className="h-5 w-5 text-emerald-500 mx-auto" />
              <span className="text-xl font-black text-slate-900 block">{data?.statistics?.masteryScore || 0}%</span>
              <span className="text-[10px] text-slate-500 block font-bold">Mastery index</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-center space-y-1">
              <Award className="h-5 w-5 text-purple-500 mx-auto fill-purple-500/10" />
              <span className="text-xl font-black text-slate-900 block">{data?.achievements?.length || 0}</span>
              <span className="text-[10px] text-slate-500 block font-bold">Achievements</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" /> Syllabus Speed: +12% above benchmark
            </span>
          </div>
        </div>
      </div>

      {/* Subject Mastery Panel & achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Mastery Levels */}
        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Syllabus Subject Mastery</h4>
            <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-full">Automated Indexing</span>
          </div>
          
          <div className="space-y-4">
            {(data?.subjects || []).map(sub => (
              <div key={sub.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${sub.color}`}></span>
                    {sub.name}
                  </span>
                  <span>{sub.aiMasteryScore}% Mastery</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${sub.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${sub.aiMasteryScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Recent Digital Badges</h4>
            <span className="text-xs text-amber-500 font-bold cursor-pointer hover:underline" onClick={() => setView(DashboardView.ACHIEVEMENTS)}>
              View All ({data?.achievements?.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(data?.achievements || []).slice(0, 4).map(badge => (
              <div 
                key={badge.id} 
                className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-3 hover:shadow-sm hover:border-slate-200 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500/80 flex items-center justify-center text-xl shadow-inner shrink-0">
                  {badge.iconUrl || "🏆"}
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-xs text-slate-800 truncate">{badge.title}</h5>
                  <p className="text-[9px] text-slate-500 truncate mt-0.5">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Onboarding Detailed Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Profile */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Academic Profile</h4>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Target Qualification</label>
                    <input 
                      type="text"
                      disabled={!isEditing}
                      value={academicData.targetQualification || "CIE O-Levels"}
                      onChange={e => setAcademicData({...academicData, targetQualification: e.target.value})}
                      className={`w-full text-xs font-bold text-slate-700 bg-transparent outline-none ${isEditing ? "border-b border-slate-200 pb-1 focus:border-amber-500" : ""}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">English Proficiency</label>
                    {isEditing ? (
                      <select 
                        value={academicData.englishProficiency || "FLUENT"}
                        onChange={e => setAcademicData({...academicData, englishProficiency: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="FLUENT">Fluent</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block">{academicData.englishProficiency || "FLUENT"}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Favorite Subjects</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={(academicData.favoriteSubjects || []).join(", ")}
                      onChange={e => setAcademicData({...academicData, favoriteSubjects: e.target.value.split(",").map(s => s.trim())})}
                      placeholder="Math, Physics, Computer Science"
                      className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(Array.isArray(academicData.favoriteSubjects) ? academicData.favoriteSubjects : ["Mathematics", "Physics", "Computer Science"]).map((sub: string) => (
                        <span key={sub} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{sub}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current School</label>
                  <input 
                    type="text"
                    disabled={!isEditing}
                    value={academicData.currentSchool || "EBM Digital Academy"}
                    onChange={e => setAcademicData({...academicData, currentSchool: e.target.value})}
                    className={`w-full text-xs font-bold text-slate-700 bg-transparent outline-none ${isEditing ? "border-b border-slate-200 pb-1 focus:border-amber-500" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Learning Style & Preferences */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-amber-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Learning Preferences</h4>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Preferred Format</label>
                    {isEditing ? (
                      <select 
                        value={preferenceData.preferredFormat || "MIXED"}
                        onChange={e => setPreferenceData({...preferenceData, preferredFormat: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="VIDEO">Video</option>
                        <option value="READING">Reading</option>
                        <option value="PRACTICE">Practice</option>
                        <option value="MIXED">Mixed</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block">{preferenceData.preferredFormat || "MIXED"}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Learning Pace</label>
                    {isEditing ? (
                      <select 
                        value={preferenceData.learningPace || "ACCELERATED"}
                        onChange={e => setPreferenceData({...preferenceData, learningPace: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="STEADY">Steady</option>
                        <option value="ACCELERATED">Accelerated</option>
                        <option value="FAST_TRACK">Fast Track</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block">{preferenceData.learningPace || "ACCELERATED"}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Study Time</label>
                    {isEditing ? (
                      <select 
                        value={preferenceData.preferredStudyTime || "MORNING"}
                        onChange={e => setPreferenceData({...preferenceData, preferredStudyTime: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="MORNING">Morning</option>
                        <option value="AFTERNOON">Afternoon</option>
                        <option value="EVENING">Evening</option>
                        <option value="NIGHT">Night</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block capitalize">{preferenceData.preferredStudyTime || "Morning"}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Explanation Style</label>
                    {isEditing ? (
                      <select 
                        value={preferenceData.explanationStyle || "STEP_BY_STEP"}
                        onChange={e => setPreferenceData({...preferenceData, explanationStyle: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="ANALOGICAL">Analogical</option>
                        <option value="DEDUCTIVE">Deductive</option>
                        <option value="VISUAL">Visual</option>
                        <option value="STEP_BY_STEP">Step-by-Step</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block">{preferenceData.explanationStyle || "STEP_BY_STEP"}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-rose-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Personalized Goals</h4>
              </div>
              
              <div className="space-y-3">
                {isEditing ? (
                  <textarea 
                    value={Array.isArray(goalsData) ? goalsData.join("\n") : ""}
                    onChange={e => setGoalsData(e.target.value.split("\n").filter(g => g.trim()))}
                    rows={4}
                    placeholder="Enter one goal per line"
                    className="w-full text-xs font-bold text-slate-700 bg-transparent border border-slate-200 rounded-xl p-3 outline-none focus:border-amber-500"
                  />
                ) : (
                  <div className="space-y-2">
                    {(Array.isArray(goalsData) && goalsData.length > 0 ? goalsData : ["Enter university early", "Master O-Level Physics", "Build AI applications"]).map((goal: string) => (
                      <div key={goal} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs font-medium text-slate-700">{goal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Study Availability */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-emerald-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Study Availability</h4>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available Days</label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {daysOfWeek.map(day => {
                      const isSelected = (availabilityData.availableDays || []).includes(day);
                      return (
                        <button
                          key={day}
                          disabled={!isEditing}
                          onClick={() => {
                            const current = availabilityData.availableDays || [];
                            const updated = isSelected 
                              ? current.filter((d: string) => d !== day)
                              : [...current, day];
                            setAvailabilityData({...availabilityData, availableDays: updated});
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                            isSelected 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          } ${!isEditing ? "cursor-default" : "cursor-pointer"}`}
                        >
                          {day.substring(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Start Time</label>
                    <input 
                      type="time"
                      disabled={!isEditing}
                      value={availabilityData.availableHoursStart || "09:00"}
                      onChange={e => setAvailabilityData({...availabilityData, availableHoursStart: e.target.value})}
                      className={`w-full text-xs font-bold text-slate-700 bg-transparent outline-none ${isEditing ? "border-b border-slate-200 pb-1" : ""}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">End Time</label>
                    <input 
                      type="time"
                      disabled={!isEditing}
                      value={availabilityData.availableHoursEnd || "17:00"}
                      onChange={e => setAvailabilityData({...availabilityData, availableHoursEnd: e.target.value})}
                      className={`w-full text-xs font-bold text-slate-700 bg-transparent outline-none ${isEditing ? "border-b border-slate-200 pb-1" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Parental Access Section */}
            <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-amber-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Parental Dashboard Connection</h4>
              </div>
              
              <div className="space-y-4">
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Linking a parent email allows them to view your syllabus progress, quiz results, and set achievement rewards from their own dashboard.
                </p>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Parent Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-2.5 h-4 w-4 ${isEditing ? "text-amber-500" : "text-slate-400"}`} />
                    <input 
                      type="email"
                      disabled={!isEditing}
                      placeholder="parent@example.com"
                      value={parentEmail}
                      onChange={e => setParentEmail(e.target.value)}
                      className={`w-full text-xs font-bold text-slate-700 bg-transparent outline-none pl-10 ${isEditing ? "border-b border-amber-300 bg-white/50 rounded-t-lg p-2.5" : ""}`}
                    />
                  </div>
                  {!parentEmail && !isEditing && (
                    <p className="text-[10px] text-amber-600 font-bold mt-1">⚠️ Not linked. Your parents cannot see your progress.</p>
                  )}
                  {parentEmail && !isEditing && (
                    <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Linked to Parent Dashboard
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Technology Profile */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="h-5 w-5 text-blue-500" />
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Technology Profile</h4>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Primary Device</label>
                    {isEditing ? (
                      <select 
                        value={techData.primaryDevice || "LAPTOP"}
                        onChange={e => setTechData({...techData, primaryDevice: e.target.value as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value="LAPTOP">Laptop</option>
                        <option value="DESKTOP">Desktop</option>
                        <option value="TABLET">Tablet</option>
                        <option value="PHONE">Phone</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-700 block">{techData.primaryDevice || "LAPTOP"}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Digital Confidence</label>
                    {isEditing ? (
                      <select 
                        value={techData.digitalConfidence || 4}
                        onChange={e => setTechData({...techData, digitalConfidence: parseInt(e.target.value) as any})}
                        className="w-full text-xs font-bold text-slate-700 bg-transparent border-b border-slate-200 outline-none"
                      >
                        <option value={1}>1 - Novice</option>
                        <option value={2}>2 - Beginner</option>
                        <option value={3}>3 - Intermediate</option>
                        <option value={4}>4 - Advanced</option>
                        <option value={5}>5 - Expert</option>
                      </select>
                    ) : (
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className={`h-3 w-3 ${i <= (techData.digitalConfidence || 4) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${techData.cameraAvailable ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                    <Camera className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-bold uppercase">Camera</span>
                  </div>
                  <div className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${techData.microphoneAvailable ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                    <Zap className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-bold uppercase">Mic</span>
                  </div>
                  <div className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${techData.headphonesAvailable ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-bold uppercase">Audio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
