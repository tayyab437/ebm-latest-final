import React, { useState } from "react";
import {
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Smartphone,
  Monitor,
  Sparkles,
  Link2,
  Eye,
  ShieldCheck
} from "lucide-react";

interface SEOPreviewPanelProps {
  title: string;
  seoTitle: string;
  slug: string;
  excerpt: string;
  seoDescription: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  categoryName: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function SEOPreviewPanel({
  title,
  seoTitle,
  slug,
  excerpt,
  seoDescription,
  content,
  featuredImage,
  featuredImageAlt,
  categoryName,
  canonicalUrl,
  noindex = false
}: SEOPreviewPanelProps) {
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");
  const [socialTab, setSocialTab] = useState<"google" | "facebook" | "twitter">("google");

  const displayTitle = seoTitle.trim() || (title ? `${title.trim()} | EBM Blog` : "EBM Educational Article | Ejaz Bukhari Method");
  const displayDescription = seoDescription.trim() || excerpt.trim() || "Read pedagogical research and problem-solving strategies from the Ejaz Bukhari Method.";
  const displayUrl = canonicalUrl || `https://ejazbukharimethod.com/blog/${slug || "article-slug"}`;

  // Analyze word count and headings
  const textContent = content.replace(/<[^>]*>/g, " ").trim();
  const words = textContent ? textContent.split(/\s+/).filter(Boolean).length : 0;
  const h1Matches = (content.match(/<h1[^>]*>/gi) || []).length;
  const h2Matches = (content.match(/<h2[^>]*>/gi) || []).length;
  const linkMatches = (content.match(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi) || []).length;
  const internalLinkMatches = (content.match(/<a[^>]*href=["'](\/|https?:\/\/ejazbukharimethod\.com)[^"']*["'][^>]*>/gi) || []).length;

  // SEO Score Criteria
  const checks = [
    {
      id: "title-length",
      label: "SEO Title Length",
      status: displayTitle.length >= 40 && displayTitle.length <= 65 ? "pass" : displayTitle.length > 0 ? "warn" : "fail",
      detail: `${displayTitle.length} chars (Recommended: 40–65 characters)`
    },
    {
      id: "desc-length",
      label: "Meta Description Length",
      status: displayDescription.length >= 120 && displayDescription.length <= 165 ? "pass" : displayDescription.length > 0 ? "warn" : "fail",
      detail: `${displayDescription.length} chars (Recommended: 120–160 characters)`
    },
    {
      id: "slug-format",
      label: "URL Slug Optimization",
      status: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? "pass" : "fail",
      detail: slug ? `/blog/${slug}` : "Slug cannot be empty and must be clean lowercase with hyphens"
    },
    {
      id: "h1-hierarchy",
      label: "Heading Structure",
      status: h1Matches === 0 ? "pass" : "fail",
      detail: h1Matches === 0 ? `Valid (Article body uses H2/H3; Page title is the single H1)` : `Found ${h1Matches} H1 in body. Avoid H1 in body text.`
    },
    {
      id: "content-depth",
      label: "Article Content Depth",
      status: words >= 600 ? "pass" : words >= 250 ? "warn" : "fail",
      detail: `${words} words (Recommended: 600+ words for educational authority)`
    },
    {
      id: "featured-image",
      label: "Featured Image & Alt Text",
      status: featuredImage && featuredImageAlt ? "pass" : featuredImage ? "warn" : "fail",
      detail: featuredImage ? (featuredImageAlt ? "Image & Alt text configured" : "Image added, missing descriptive Alt text") : "No featured image provided"
    },
    {
      id: "internal-links",
      label: "Internal Contextual Links",
      status: internalLinkMatches >= 1 ? "pass" : "warn",
      detail: `${internalLinkMatches} internal EBM links detected in body`
    },
    {
      id: "indexing",
      label: "Search Engine Indexing",
      status: noindex ? "warn" : "pass",
      detail: noindex ? "Flagged as NOINDEX (Search engines will not index this post)" : "Indexable (Follow, Index)"
    }
  ];

  const passCount = checks.filter(c => c.status === "pass").length;
  const scorePercent = Math.round((passCount / checks.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* SEO Health Score Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">SEO Readiness Audit</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
              scorePercent >= 80 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
              scorePercent >= 50 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
              "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
            }`}>
              {scorePercent}% Ready
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              scorePercent >= 80 ? "bg-emerald-500" : scorePercent >= 50 ? "bg-amber-500" : "bg-rose-500"
            }`}
            style={{ width: `${scorePercent}%` }}
          />
        </div>

        {/* Checks Checklist */}
        <div className="space-y-2.5 text-xs">
          {checks.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2">
                {c.status === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                {c.status === "warn" && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                {c.status === "fail" && <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{c.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live SERP & Social Previews */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        
        {/* Preview Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSocialTab("google")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                socialTab === "google"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Google SERP
            </button>
            <button
              type="button"
              onClick={() => setSocialTab("facebook")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                socialTab === "facebook"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              OpenGraph (Facebook / LinkedIn)
            </button>
            <button
              type="button"
              onClick={() => setSocialTab("twitter")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                socialTab === "twitter"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Twitter / X Card
            </button>
          </div>

          {socialTab === "google" && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => setDevicePreview("desktop")}
                className={`p-1 rounded ${devicePreview === "desktop" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs" : "text-slate-500"}`}
                title="Desktop Google Preview"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevicePreview("mobile")}
                className={`p-1 rounded ${devicePreview === "mobile" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs" : "text-slate-500"}`}
                title="Mobile Google Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 1. Google SERP Preview */}
        {socialTab === "google" && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                E
              </div>
              <div className="text-[12px] leading-tight text-slate-800 dark:text-slate-200">
                <div className="font-semibold">Ejaz Bukhari Method (EBM)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-sm">
                  {displayUrl}
                </div>
              </div>
            </div>

            <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-base hover:underline font-medium cursor-pointer leading-snug line-clamp-2">
              {displayTitle}
            </div>

            <div className="text-xs text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed">
              {displayDescription}
            </div>
          </div>
        )}

        {/* 2. OpenGraph Card Preview */}
        {socialTab === "facebook" && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950 max-w-md mx-auto shadow-sm">
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={featuredImageAlt || "Preview image"}
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-40 bg-gradient-to-r from-blue-900 to-slate-900 flex items-center justify-center text-white/50 text-xs font-bold">
                No Featured Image Selected
              </div>
            )}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                EJAZBUKHARIMETHOD.COM
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                {displayTitle}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {displayDescription}
              </div>
            </div>
          </div>
        )}

        {/* 3. Twitter / X Card Preview */}
        {socialTab === "twitter" && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950 max-w-md mx-auto shadow-sm">
            {featuredImage ? (
              <div className="relative">
                <img
                  src={featuredImage}
                  alt={featuredImageAlt || "Preview image"}
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  ejazbukharimethod.com
                </div>
              </div>
            ) : (
              <div className="w-full h-40 bg-slate-900 flex items-center justify-center text-white/50 text-xs font-bold">
                No Featured Image Selected
              </div>
            )}
            <div className="p-3.5 bg-white dark:bg-slate-900">
              <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                {displayTitle}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {displayDescription}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
