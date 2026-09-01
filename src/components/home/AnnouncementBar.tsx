import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

interface AnnouncementData {
  id: string;
  text: string;
  ctaText?: string;
  ctaUrl?: string;
  isActive: number;
  targetRole: string; // "ALL", "PARENT", "STUDENT", "TEACHER"
  scheduledStart?: string;
  scheduledUntil?: string;
}

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchAnnouncement = async (retries = 3, delay = 1000) => {
    try {
      const response = await fetch("/api/announcement-bar");
      if (!response.ok) {
        setIsVisible(false);
        return;
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setIsVisible(false);
        return;
      }
      const data = await response.json();
      if (data.success && data.announcement) {
        const ann = data.announcement as AnnouncementData;
        
        // 1. Check if active in settings
        if (ann.isActive !== 1 || !ann.text) {
          setIsVisible(false);
          return;
        }

        // 2. Check scheduling times
        const now = new Date();
        if (ann.scheduledStart) {
          const startDate = new Date(ann.scheduledStart);
          if (startDate > now) {
            setIsVisible(false);
            return;
          }
        }
        if (ann.scheduledUntil) {
          const endDate = new Date(ann.scheduledUntil);
          if (endDate < now) {
            setIsVisible(false);
            return;
          }
        }

        // 3. Check role target audience
        let userRole = "ALL";
        try {
          const savedUser = localStorage.getItem("ebm_user");
          if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (parsed && parsed.role) {
              userRole = parsed.role;
            }
          }
        } catch (e) {
          console.error("Error reading ebm_user role:", e);
        }

        // If targetRole is specific, compare with active role
        if (ann.targetRole !== "ALL" && ann.targetRole !== userRole) {
          setIsVisible(false);
          return;
        }

        // 4. Check if dismissed for this specific text/id
        const dismissedKey = `ebm_announcement_dismissed_${ann.id}_${encodeURIComponent(ann.text)}`;
        const dismissed = localStorage.getItem(dismissedKey);
        if (dismissed === "true") {
          setIsVisible(false);
          return;
        }

        setAnnouncement(ann);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (err) {
      if (retries > 0) {
        setTimeout(() => {
          fetchAnnouncement(retries - 1, delay * 2);
        }, delay);
      } else {
        console.warn("Error loading announcement in bar (handled gracefully):", err);
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    const handleUpdate = () => {
      fetchAnnouncement(1, 1000);
    };

    // Set up listeners for announcement updates & login/role change events
    window.addEventListener("ebm_announcement_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("ebm_announcement_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleDismiss = () => {
    if (announcement) {
      const dismissedKey = `ebm_announcement_dismissed_${announcement.id}_${encodeURIComponent(announcement.text)}`;
      localStorage.setItem(dismissedKey, "true");
    }
    setIsVisible(false);
  };

  if (!isVisible || !announcement) return null;

  return (
    <div id="ebm-announcement" className="bg-blue-700 text-white font-sans border-b border-blue-800 transition-all duration-300 shrink-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center space-x-2 mx-auto text-center font-bold">
          <span className="bg-white text-blue-900 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-xs">
            <Sparkles className="h-3 w-3 inline" /> 
            {announcement.targetRole === "ALL" ? "Admissions Open" : `${announcement.targetRole} Alert`}
          </span>
          <span className="text-white font-medium">{announcement.text}</span>
          {announcement.ctaText && announcement.ctaUrl && (
            <a 
              href={announcement.ctaUrl} 
              className="underline underline-offset-2 text-white hover:text-blue-100 transition font-black ml-2"
            >
              {announcement.ctaText} &rarr;
            </a>
          )}
        </div>
        <button 
          id="btn-dismiss-announcement"
          onClick={handleDismiss} 
          className="text-white hover:text-blue-100 p-1 rounded-full transition focus:outline-none shrink-0"
          aria-label="Dismiss Announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
