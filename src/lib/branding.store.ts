import { create } from "zustand";
import { GraduationCap, ShieldCheck, Sparkles, BookOpen, Crown, Star, Heart } from "lucide-react";
import academicPortalMockup from "../assets/images/academic_portal_mockup_1784360050225.jpg";

declare global {
  interface Window {
    __INITIAL_BRANDING__?: any;
  }
}

export const BRANDING_ICONS: Record<string, React.ComponentType<any>> = {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Crown,
  Star,
  Heart,
};

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
}

interface BrandingState {
  logoText: string;
  logoType: "icon" | "image";
  logoIcon: string;
  logoImageUrl: string;
  faviconUrl: string;
  heroBackgroundImage: string;
  heroSlides: HeroSlide[];
  showThemeToggle: boolean;
  updateBranding: (updates: {
    logoText?: string;
    logoType?: "icon" | "image";
    logoIcon?: string;
    logoImageUrl?: string;
    faviconUrl?: string;
    heroBackgroundImage?: string;
    heroSlides?: HeroSlide[];
    showThemeToggle?: boolean;
  }) => void;
  resetBranding: () => void;
}

const DEFAULT_LOGO_TEXT = "EBM Digital Learning";
const DEFAULT_LOGO_TYPE = "image";
const DEFAULT_LOGO_ICON = "GraduationCap";
const DEFAULT_LOGO_IMAGE_URL = "/uploads/branding-logo.png";
const DEFAULT_FAVICON_URL = "/uploads/branding-favicon.png";
const DEFAULT_HERO_BG_IMAGE = "/ebm-hero-bg-opt.webp";

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
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
    imageUrl: academicPortalMockup
  },
  {
    id: "slide-3",
    title: "Parent Dashboard & Live Analytics",
    subtitle: "Real-time cognitive progress, detailed class attendance, and direct mentor alignment tracking.",
    ctaText: "Contact Admissions",
    ctaUrl: "contact",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
  }
];

export const useBrandingStore = create<BrandingState>((set) => {
  const isClient = typeof window !== "undefined";
  const initBranding = isClient ? (window.__INITIAL_BRANDING__ || null) : null;
  
  const storedLogoText = initBranding?.logoText || (isClient ? localStorage.getItem("ebm_logo_text") : null) || DEFAULT_LOGO_TEXT;
  const storedLogoType = (initBranding?.logoType || (isClient ? localStorage.getItem("ebm_logo_type") : null) || (initBranding?.logoImageUrl ? "image" : DEFAULT_LOGO_TYPE)) as "icon" | "image";
  const storedLogoIcon = initBranding?.logoIcon || (isClient ? localStorage.getItem("ebm_logo_icon") : null) || DEFAULT_LOGO_ICON;
  const storedLogoImageUrl = initBranding?.logoImageUrl || (isClient ? localStorage.getItem("ebm_logo_image_url") : null) || DEFAULT_LOGO_IMAGE_URL;
  let storedFaviconUrl = initBranding?.faviconUrl || (isClient ? localStorage.getItem("ebm_favicon_url") : null) || DEFAULT_FAVICON_URL;
  
  if (isClient && (storedFaviconUrl.includes("flaticon") || !storedFaviconUrl)) {
    storedFaviconUrl = DEFAULT_FAVICON_URL;
    try {
      localStorage.setItem("ebm_favicon_url", DEFAULT_FAVICON_URL);
    } catch (_) {}
  }
  
  const storedHeroBackgroundImage = initBranding?.heroBackgroundImage || (isClient ? localStorage.getItem("ebm_hero_bg_image") : null) || DEFAULT_HERO_BG_IMAGE;
  const storedShowThemeToggle = initBranding?.showThemeToggle !== undefined 
    ? !!initBranding.showThemeToggle 
    : (isClient ? (localStorage.getItem("ebm_show_theme_toggle") !== "false") : true);
  
  let storedHeroSlides = DEFAULT_HERO_SLIDES;
  if (initBranding?.heroSlides && Array.isArray(initBranding.heroSlides) && initBranding.heroSlides.length > 0) {
    storedHeroSlides = initBranding.heroSlides;
  } else if (isClient) {
    try {
      const stored = localStorage.getItem("ebm_hero_slides");
      if (stored) {
        let parsed = JSON.parse(stored);
        while (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
        if (Array.isArray(parsed) && parsed.length > 0) {
          storedHeroSlides = parsed;
        }
      }
    } catch (e) {
      console.error("Error parsing stored hero slides", e);
    }
  }

  if (isClient && storedFaviconUrl) {
    setTimeout(() => {
      applyFavicon(storedFaviconUrl);
    }, 50);
  }

  return {
    logoText: storedLogoText,
    logoType: storedLogoType,
    logoIcon: storedLogoIcon,
    logoImageUrl: storedLogoImageUrl,
    faviconUrl: storedFaviconUrl,
    heroBackgroundImage: storedHeroBackgroundImage,
    heroSlides: storedHeroSlides,
    showThemeToggle: storedShowThemeToggle,
    updateBranding: (updates) => {
      set((state) => {
        let processedHeroSlides = updates.heroSlides;
        if (processedHeroSlides !== undefined) {
          try {
            while (typeof processedHeroSlides === "string") {
              processedHeroSlides = JSON.parse(processedHeroSlides);
            }
          } catch (e) {
            console.error("Error parsing updates.heroSlides", e);
          }
          if (!Array.isArray(processedHeroSlides)) {
            processedHeroSlides = [];
          }
        }

        const finalUpdates = {
          ...updates,
          ...(processedHeroSlides !== undefined ? { heroSlides: processedHeroSlides } : {})
        };

        const next = { ...state, ...finalUpdates };
        if (isClient) {
          try {
            if (updates.logoText !== undefined) localStorage.setItem("ebm_logo_text", next.logoText);
            if (updates.logoType !== undefined) localStorage.setItem("ebm_logo_type", next.logoType);
            if (updates.logoIcon !== undefined) localStorage.setItem("ebm_logo_icon", next.logoIcon);
            if (updates.logoImageUrl !== undefined) localStorage.setItem("ebm_logo_image_url", next.logoImageUrl);
            if (updates.faviconUrl !== undefined) {
              localStorage.setItem("ebm_favicon_url", next.faviconUrl);
              applyFavicon(next.faviconUrl);
            }
            if (updates.heroBackgroundImage !== undefined) {
              localStorage.setItem("ebm_hero_bg_image", next.heroBackgroundImage);
            }
            if (processedHeroSlides !== undefined) {
              localStorage.setItem("ebm_hero_slides", JSON.stringify(processedHeroSlides));
            }
            if (updates.showThemeToggle !== undefined) {
              localStorage.setItem("ebm_show_theme_toggle", next.showThemeToggle ? "true" : "false");
            }
          } catch (_) {}
        }
        return next;
      });
    },
    resetBranding: () => {
      if (isClient) {
        try {
          localStorage.removeItem("ebm_logo_text");
          localStorage.removeItem("ebm_logo_type");
          localStorage.removeItem("ebm_logo_icon");
          localStorage.removeItem("ebm_logo_image_url");
          localStorage.removeItem("ebm_favicon_url");
          localStorage.removeItem("ebm_hero_bg_image");
          localStorage.removeItem("ebm_hero_slides");
          localStorage.removeItem("ebm_show_theme_toggle");
        } catch (_) {}
      }
      set({
        logoText: DEFAULT_LOGO_TEXT,
        logoType: DEFAULT_LOGO_TYPE,
        logoIcon: DEFAULT_LOGO_ICON,
        logoImageUrl: DEFAULT_LOGO_IMAGE_URL,
        faviconUrl: DEFAULT_FAVICON_URL,
        heroBackgroundImage: DEFAULT_HERO_BG_IMAGE,
        heroSlides: DEFAULT_HERO_SLIDES,
        showThemeToggle: true,
      });
      if (isClient) {
        applyFavicon(DEFAULT_FAVICON_URL);
      }
    },
  };
});

/**
 * Universal global favicon applicator for all browsers, devices, and tabs
 */
export function applyFavicon(url: string) {
  if (typeof window === "undefined" || !url) return;
  try {
    const cleanUrl = url && !url.includes("flaticon") ? url.trim() : DEFAULT_FAVICON_URL;
    if (!cleanUrl) return;

    let mimeType = "image/png";
    if (cleanUrl.endsWith(".svg") || cleanUrl.startsWith("data:image/svg")) {
      mimeType = "image/svg+xml";
    } else if (cleanUrl.endsWith(".ico") || cleanUrl.startsWith("data:image/x-icon") || cleanUrl.startsWith("data:image/vnd.microsoft.icon")) {
      mimeType = "image/x-icon";
    } else if (cleanUrl.endsWith(".webp")) {
      mimeType = "image/webp";
    } else if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) {
      mimeType = "image/jpeg";
    }

    const rels = ["icon", "shortcut icon", "apple-touch-icon"];
    rels.forEach((rel) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.type = mimeType;
      link.href = cleanUrl;
    });
  } catch (e) {
    console.error("Failed to apply favicon globally:", e);
  }
}

/**
 * Global synchronization helper: fetches latest authoritative branding from database
 */
export async function syncGlobalBranding(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/branding", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.success && data.branding && Object.keys(data.branding).length > 0) {
      useBrandingStore.getState().updateBranding(data.branding);
      if (data.branding.faviconUrl) {
        applyFavicon(data.branding.faviconUrl);
      }
    }
  } catch (err) {
    console.warn("Could not sync branding from server:", err);
  }
}

// Auto-trigger sync on client boot
if (typeof window !== "undefined") {
  syncGlobalBranding();
}
