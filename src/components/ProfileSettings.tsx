import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  ArrowLeft,
  Settings as SettingsIcon,
  Shield,
  Bell,
  Globe,
  Sliders
} from "lucide-react";
import clsx from "clsx";

interface ProfileSettingsProps {
  onBack?: () => void;
  role: "STUDENT" | "TEACHER" | "PARENT" | "ADMIN";
}

export function ProfileSettings({ onBack, role }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const [successMsg, setSuccessMsg] = useState("");

  // Common Profile State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [email, setEmail] = useState("");

  // Role-Specific Settings
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    // Load user data from localStorage
    const userStr = localStorage.getItem("ebm_user");
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setName(u.name || u.studentName || "");
        setDescription(u.description || u.bio || "No description provided.");
        setProfilePictureUrl(u.profilePictureUrl || u.avatarUrl || "");
        setEmail(u.email || "");
        
        // Load role specific settings
        if (role === "STUDENT") {
          setSettings({
            syllabusMode: localStorage.getItem("ebm_study_mode") || "Standard Accelerated",
            dailyGoalHours: localStorage.getItem("ebm_daily_goal_hours") || "3",
            soundEnabled: localStorage.getItem("ebm_sound_enabled") === "true",
            streakReminders: localStorage.getItem("ebm_streak_reminders") !== "false"
          });
        } else if (role === "TEACHER") {
          setSettings({
            notifySubmissions: localStorage.getItem("ebm_teacher_notify_submissions") !== "false",
            notifyAttendance: localStorage.getItem("ebm_teacher_notify_attendance") !== "false",
            autoGradeEnabled: localStorage.getItem("ebm_teacher_auto_grade") === "true"
          });
        } else if (role === "PARENT") {
          setSettings({
            notifyDaily: localStorage.getItem("ebm_parent_notify_daily") !== "false",
            shareWeeklyReport: localStorage.getItem("ebm_parent_weekly_report") !== "false"
          });
        } else if (role === "ADMIN") {
          setSettings({
            highPriorityAlerts: localStorage.getItem("ebm_admin_alerts") !== "false",
            auditLogsVisible: localStorage.getItem("ebm_admin_logs") !== "false"
          });
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, [role]);

  const handleSave = () => {
    const userStr = localStorage.getItem("ebm_user");
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        u.name = name;
        u.description = description;
        u.profilePictureUrl = profilePictureUrl;
        localStorage.setItem("ebm_user", JSON.stringify(u));

        // Sync profile updates with backend database
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
            profilePictureUrl,
            description,
            role
          })
        }).then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log("Profile synchronized with server successfully.");
            }
          }).catch(err => {
            console.error("Error syncing profile with server:", err);
          });
        
        // Save role settings
        if (role === "STUDENT") {
          localStorage.setItem("ebm_study_mode", settings.syllabusMode);
          localStorage.setItem("ebm_daily_goal_hours", settings.dailyGoalHours);
          localStorage.setItem("ebm_sound_enabled", String(settings.soundEnabled));
          localStorage.setItem("ebm_streak_reminders", String(settings.streakReminders));
        } else if (role === "TEACHER") {
          localStorage.setItem("ebm_teacher_notify_submissions", String(settings.notifySubmissions));
          localStorage.setItem("ebm_teacher_notify_attendance", String(settings.notifyAttendance));
          localStorage.setItem("ebm_teacher_auto_grade", String(settings.autoGradeEnabled));
        } else if (role === "PARENT") {
          localStorage.setItem("ebm_parent_notify_daily", String(settings.notifyDaily));
          localStorage.setItem("ebm_parent_weekly_report", String(settings.shareWeeklyReport));
        } else if (role === "ADMIN") {
          localStorage.setItem("ebm_admin_alerts", String(settings.highPriorityAlerts));
          localStorage.setItem("ebm_admin_logs", String(settings.auditLogsVisible));
        }

        setSuccessMsg("Changes saved successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);

        // Dispatch event for UI updates elsewhere (like sidebars)
        window.dispatchEvent(new Event("user-update"));
      } catch (e) {
        console.error("Failed to save user data", e);
      }
    }
  };

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Role Settings", icon: SettingsIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Profile & Settings</h2>
            <p className="text-slate-500 text-xs mt-0.5">Manage your identity and portal preferences for {role.toLowerCase()} account</p>
          </div>
        </div>
        
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm animate-in slide-in-from-top-2">
            ✨ {successMsg}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="md:w-64 shrink-0 bg-white border border-slate-200/50 rounded-3xl p-3 shadow-sm space-y-1 h-fit">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all",
                  activeTab === tab.id
                    ? "bg-blue-600/10 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex-1 space-y-8">
            {activeTab === "profile" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
                      {profilePictureUrl ? (
                        <img src={profilePictureUrl} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="h-10 w-10 text-slate-400" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Profile Picture URL</label>
                      <input 
                        type="url" 
                        value={profilePictureUrl}
                        onChange={e => setProfilePictureUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Bio / Description</label>
                  <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Sliders className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{role} Specific Preferences</h3>
                </div>

                <div className="space-y-6">
                  {role === "STUDENT" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Syllabus Mode</label>
                          <select 
                            value={settings.syllabusMode}
                            onChange={e => setSettings({...settings, syllabusMode: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                          >
                            <option>Standard Accelerated</option>
                            <option>Intense Booster</option>
                            <option>Focus Sprinter</option>
                            <option>Casual Builder</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Daily Goal (Hours)</label>
                          <input 
                            type="number"
                            value={settings.dailyGoalHours}
                            onChange={e => setSettings({...settings, dailyGoalHours: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-4 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={settings.soundEnabled}
                            onChange={e => setSettings({...settings, soundEnabled: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Enable Sound Effects</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={settings.streakReminders}
                            onChange={e => setSettings({...settings, streakReminders: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Daily Streak Reminders</span>
                        </label>
                      </div>
                    </>
                  )}

                  {role === "TEACHER" && (
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.notifySubmissions}
                          onChange={e => setSettings({...settings, notifySubmissions: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Notify on Assignment Submissions</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.notifyAttendance}
                          onChange={e => setSettings({...settings, notifyAttendance: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Notify on Low Attendance Alerts</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.autoGradeEnabled}
                          onChange={e => setSettings({...settings, autoGradeEnabled: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Enable AI-Assisted Auto-Grading</span>
                      </label>
                    </div>
                  )}

                  {role === "PARENT" && (
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.notifyDaily}
                          onChange={e => setSettings({...settings, notifyDaily: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Receive Daily Progress Summary</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.shareWeeklyReport}
                          onChange={e => setSettings({...settings, shareWeeklyReport: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Email Weekly Performance Report</span>
                      </label>
                    </div>
                  )}

                  {role === "ADMIN" && (
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.highPriorityAlerts}
                          onChange={e => setSettings({...settings, highPriorityAlerts: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Enable High-Priority Infrastructure Alerts</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={settings.auditLogsVisible}
                          onChange={e => setSettings({...settings, auditLogsVisible: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Show Audit Logs in Quick View</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-end">
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
