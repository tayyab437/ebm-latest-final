import React, { useState } from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Sliders, 
  Save, 
  ArrowLeft,
  Lock,
  Phone,
  Mail,
  Users,
  CheckCircle,
  HelpCircle,
  Volume2,
  Moon,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export function UserSettings() {
  const { data, setView, updateStudentData } = useDashboardStore();
  
  // Tabs configuration
  const [activeTab, setActiveTab] = useState<"preferences" | "notifications" | "security" | "parent-link">("preferences");
  const [successMsg, setSuccessMsg] = useState("");

  // States for preferences
  const [studyMode, setStudyMode] = useState("Standard Accelerated");
  const [dailyGoalHours, setDailyGoalHours] = useState(3);
  const [accentColor, setAccentColor] = useState("amber");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  // States for notifications
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [notifyParentFeedback, setNotifyParentFeedback] = useState(true);
  const [notifyAIAlerts, setNotifyAIAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // States for security
  const [twoFactor, setTwoFactor] = useState(false);
  const [password, setPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for parent-link
  const [parentEmail, setParentEmail] = useState(() => {
    return localStorage.getItem("ebm_parent_email") || "parent@example.com";
  });
  const [shareProgress, setShareProgress] = useState(true);
  const [diagnosticInterval, setDiagnosticInterval] = useState("Real-time");

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("ebm_parent_email", parentEmail);
    localStorage.setItem("ebm_study_mode", studyMode);
    localStorage.setItem("ebm_daily_goal_hours", dailyGoalHours.toString());
    
    setSuccessMsg("Settings saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const tabs = [
    { id: "preferences", label: "Preferences", icon: Sliders },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Login", icon: Shield },
    { id: "parent-link", label: "Parent Integration", icon: Users },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header and Title */}
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
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portal Settings</h2>
            <p className="text-slate-500 text-xs mt-0.5">Configure your custom learning rules, privacy controls, and notifications</p>
          </div>
        </div>
        
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm animate-fade-in">
            ✨ {successMsg}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="md:w-64 shrink-0 bg-white border border-slate-200/50 rounded-3xl p-3 shadow-sm space-y-1 h-fit">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="flex-1 bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Learning Speed & Preferences</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Customize your adaptive syllabus pacing model</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Syllabus Mode</label>
                    <select 
                      value={studyMode} 
                      onChange={e => setStudyMode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                    >
                      <option value="Standard Accelerated">Standard Accelerated (3-Year CIE Goal)</option>
                      <option value="Intense Booster">Intense Booster (2.5-Year Super accelerated)</option>
                      <option value="Focus Sprinter">Focus Sprinter (Single-term crash mode)</option>
                      <option value="Casual Builder">Casual Builder (Slower grade 5-7 transition)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Daily Revision Target (Hours)</label>
                    <input 
                      type="number" 
                      min={1} 
                      max={12} 
                      value={dailyGoalHours} 
                      onChange={e => setDailyGoalHours(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  {/* Streak toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Volume2 className="h-4 w-4 text-amber-500" />
                        Aural Sound FX
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Play rewards audio clips upon badge unlocks and checklist completes</p>
                    </div>
                    <button onClick={() => setSoundEnabled(!soundEnabled)}>
                      {soundEnabled ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>

                  {/* Daily reminds toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Daily Streak Reminders</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Send a quick morning diagnostic notice so you never snap your Study Streak</p>
                    </div>
                    <button onClick={() => setStreakReminders(!streakReminders)}>
                      {streakReminders ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Notification Channels</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dictate how the platform connects with you and your parent</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Assignments and Submissions</h4>
                      <p className="text-[10px] text-slate-500">Alerts when teachers post assignments or issue worksheet critiques</p>
                    </div>
                    <button onClick={() => setNotifyAssignments(!notifyAssignments)}>
                      {notifyAssignments ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Parent Diagnostic Feedback</h4>
                      <p className="text-[10px] text-slate-500">Alerts when your parent issues consecutive streak boosts or diagnostic reviews</p>
                    </div>
                    <button onClick={() => setNotifyParentFeedback(!notifyParentFeedback)}>
                      {notifyParentFeedback ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Gemini Advisor Intelligence Recommendations</h4>
                      <p className="text-[10px] text-slate-500">Alerts when the AI engine finds micro-weaknesses and drafts focus plans</p>
                    </div>
                    <button onClick={() => setNotifyAIAlerts(!notifyAIAlerts)}>
                      {notifyAIAlerts ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Weekly Performance Report</h4>
                      <p className="text-[10px] text-slate-500">Receive an elegant email progress chart breakdown every Sunday evening</p>
                    </div>
                    <button onClick={() => setWeeklyReport(!weeklyReport)}>
                      {weeklyReport ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Security & Portal Access</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Secure your EBM intelligence profile</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Current Password</label>
                    <input 
                      type="password" 
                      value={password}
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 outline-none cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 block">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Min 8 characters"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 block">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-center justify-between bg-amber-50/40 border border-amber-200/50 rounded-2xl p-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Lock className="h-4 w-4 text-amber-500" />
                      Two-Factor Authentication (2FA)
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Require an automated OTP from email or authenticator upon logging in</p>
                  </div>
                  <button onClick={() => setTwoFactor(!twoFactor)}>
                    {twoFactor ? (
                      <ToggleRight className="h-8 w-8 text-amber-500" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-slate-300" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Parent Integration Tab */}
            {activeTab === "parent-link" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Parent Linkage Center</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Link your parent's email to authorize diagnostic and streak updates</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Linked Parent Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" 
                        value={parentEmail}
                        onChange={e => setParentEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">Your parent will receive invites to monitor logs, attendance metrics, and verify streak points</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Real-time Progress Syncing</h4>
                      <p className="text-[10px] text-slate-500">Allow parent feeds to view syllabus progress, quizzes passed, and mock exams completed</p>
                    </div>
                    <button onClick={() => setShareProgress(!shareProgress)}>
                      {shareProgress ? (
                        <ToggleRight className="h-8 w-8 text-amber-500" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-slate-300" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Diagnostic Interval Report</label>
                    <select 
                      value={diagnosticInterval} 
                      onChange={e => setDiagnosticInterval(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-amber-500"
                    >
                      <option value="Real-time">Real-time (Immediate push feed)</option>
                      <option value="Daily">Daily Summary</option>
                      <option value="Weekly">Weekly Digest</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Auto-saved to local memory
            </span>
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <Save className="h-3.5 w-3.5" /> Save Configuration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
