import React, { useState, useRef, useEffect } from "react";
import { useDashboardStore } from "./dashboard.store";
import { Search, Bell, Menu, Flame, Zap, Check, CheckCheck, BookOpen, AlertCircle, Trophy, Info } from "lucide-react";
import clsx from "clsx";

export function DashboardHeader() {
  const { data, toggleMobileNav, markNotificationRead, markAllNotificationsRead } = useDashboardStore();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificationsList = data?.notifications || [];
  const unreadCount = notificationsList.filter(n => !n.read).length;

  // Current date formatting
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-6 h-16 flex items-center justify-between shrink-0">
      {/* Mobile Toggle & Welcome */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileNav}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-slate-900">
            Welcome back, {data?.studentName || (() => {
              const userStr = localStorage.getItem("ebm_user");
              if (userStr) {
                try {
                  const user = JSON.parse(userStr);
                  return user.name || "Student";
                } catch (e) {}
              }
              return "Student";
            })()} 👋
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            {dateString} • {data?.currentGrade || "Grade 1"}
          </p>
        </div>
      </div>

      {/* Center Search (Hidden on small mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className={clsx(
          "w-full flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
          isSearchFocused ? "border-amber-400 bg-white shadow-[0_0_0_4px_rgba(251,191,36,0.1)]" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
        )}>
          <Search className={clsx("h-4 w-4 shrink-0 transition-colors", isSearchFocused ? "text-amber-500" : "text-slate-400")} />
          <input 
            type="text" 
            placeholder="Search subjects, topics, or files..." 
            className="bg-transparent border-none outline-none w-full text-xs font-medium text-slate-800 placeholder-slate-400"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className="hidden lg:flex items-center justify-center px-1.5 py-0.5 rounded bg-slate-200/60 text-[9px] font-bold text-slate-500 shrink-0">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Stats & Actions */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        
        {/* Streak & XP - Hidden on tiny screens */}
        <div className="hidden min-[400px]:flex items-center gap-3">
          <div className="flex items-center gap-1.5" title="Learning Streak">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500/20" />
            <span className="text-xs font-bold text-slate-700">{data?.statistics?.learningStreakDays || 0}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Total XP">
            <Zap className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            <span className="text-xs font-bold text-slate-700">{data?.statistics?.totalXp?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <button 
            id="notifications-bell-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={clsx(
              "relative p-2 rounded-full transition-colors focus:outline-none cursor-pointer flex items-center justify-center",
              isNotificationsOpen ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            )}
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 border border-white"></span>
              </span>
            )}
          </button>

          {/* Floating Dropdown */}
          {isNotificationsOpen && (
            <div 
              id="notifications-dropdown-panel"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/65 shadow-xl z-[90] overflow-hidden animate-fade-in text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-[9px] font-black px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    id="mark-all-read-btn"
                    onClick={() => { markAllNotificationsRead(); }}
                    className="text-[10px] text-blue-600 hover:text-blue-800 font-extrabold transition flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                  >
                    <CheckCheck className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                {notificationsList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <div className="p-3 bg-slate-50 rounded-full mb-3 text-slate-300">
                      <Check className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 mb-1">All Caught Up!</p>
                    <p className="text-[11px] text-slate-500 leading-normal max-w-[200px]">
                      You have no notifications. Keep studying to earn achievements!
                    </p>
                  </div>
                ) : (
                  notificationsList.map((notif) => {
                    // Type styling & icon selection
                    let Icon = Info;
                    let iconBg = "bg-blue-50 text-blue-600";
                    if (notif.type === "ASSIGNMENT") {
                      Icon = BookOpen;
                      iconBg = "bg-emerald-50 text-emerald-600";
                    } else if (notif.type === "ACHIEVEMENT" || notif.type === "SYSTEM" && notif.title.includes("Streak")) {
                      Icon = Trophy;
                      iconBg = "bg-amber-50 text-amber-600";
                    } else if (notif.type === "ALERT") {
                      Icon = AlertCircle;
                      iconBg = "bg-red-50 text-red-600";
                    }

                    return (
                      <div 
                        key={notif.id} 
                        className={clsx(
                          "p-4 transition-colors flex gap-3 items-start relative group",
                          notif.read ? "bg-white hover:bg-slate-50/30" : "bg-amber-50/20 hover:bg-amber-50/40"
                        )}
                      >
                        {/* Status Icon */}
                        <div className={clsx("p-2 rounded-xl shrink-0", iconBg)}>
                          <Icon className="h-4 w-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-baseline justify-between gap-1.5 mb-1">
                            <h4 className={clsx("text-xs font-bold truncate leading-tight", notif.read ? "text-slate-700" : "text-slate-900 font-extrabold")}>
                              {notif.title}
                            </h4>
                            <span className="text-[9px] text-slate-400 shrink-0">
                              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            {notif.message}
                          </p>
                        </div>

                        {/* Mark Read Individual Hover Button */}
                        {!notif.read && (
                          <button 
                            id={`mark-read-btn-${notif.id}`}
                            onClick={() => { markNotificationRead(notif.id); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 bg-white border border-slate-200 rounded-lg hover:border-slate-300 text-slate-500 hover:text-slate-800 transition-all shadow-xs cursor-pointer focus:opacity-100 flex items-center justify-center h-6 w-6"
                            title="Mark as read"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                        )}

                        {/* Unread dot */}
                        {!notif.read && (
                          <span className="absolute right-3 top-4 w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:hidden"></span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  EBM Notification Hub
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-base overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">
          <span>
            {(() => {
              const avatarId = localStorage.getItem("ebm_avatar_id") || "owl";
              const emojis: Record<string, string> = {
                owl: "🦉",
                astronaut: "👩‍🚀",
                goggles: "🥽",
                wizard: "🧙",
                lightbulb: "💡",
                fox: "🦊"
              };
              return emojis[avatarId] || "🦉";
            })()}
          </span>
        </button>
      </div>
    </header>
  );
}
