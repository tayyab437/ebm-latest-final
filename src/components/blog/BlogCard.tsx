import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import type { BlogPost } from "../../types/blog.types";
import { getCardThumbnailAttrs, getAvatarImageAttrs } from "../../utils/image-optimizer";

interface BlogCardProps {
  post: BlogPost;
  variant?: "standard" | "compact" | "featured";
}

export function BlogCard({ post, variant = "standard" }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Recently Published";

  const readingTimeText = post.readingTime ? `${post.readingTime} min read` : "4 min read";

  // Category Color Map
  const categoryColor = post.categoryColor || "blue";
  const badgeClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/50",
    cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/50",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/50",
  };

  const badgeClass = badgeClasses[categoryColor] || badgeClasses.blue;

  if (variant === "compact") {
    const compactImgAttrs = getCardThumbnailAttrs(post.featuredImage, 80, 80);
    return (
      <article className="group flex gap-4 items-start p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition">
        {post.featuredImage && (
          <Link to={`/blog/${post.slug}`} className="shrink-0 overflow-hidden rounded-xl w-20 h-20 bg-slate-100 dark:bg-slate-800">
            <img
              src={compactImgAttrs.src}
              srcSet={compactImgAttrs.srcSet}
              width={80}
              height={80}
              alt={post.featuredImageAlt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider mb-1 ${badgeClass}`}>
            {post.categoryName || "Education"}
          </span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
            <span>{readingTimeText}</span>
          </div>
        </div>
      </article>
    );
  }

  const standardImgAttrs = getCardThumbnailAttrs(post.featuredImage, 400, 225);
  const cardAvatarAttrs = getAvatarImageAttrs(post.authorAvatar, 28);

  return (
    <article className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
      {/* Card Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {post.featuredImage ? (
          <img
            src={standardImgAttrs.src}
            srcSet={standardImgAttrs.srcSet}
            sizes="(max-width: 768px) 100vw, 400px"
            width={400}
            height={225}
            alt={post.featuredImageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 to-blue-900 text-white/40 text-xs font-bold">
            EBM Publication
          </div>
        )}

        {/* Badges on top of image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs pointer-events-auto ${badgeClass}`}>
            {post.categoryName || "Education"}
          </span>
          {post.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
              ★ Featured
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTimeText}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link to={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Footer / Author Row */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {post.authorAvatar ? (
              <img
                src={cardAvatarAttrs.src}
                srcSet={cardAvatarAttrs.srcSet}
                width={28}
                height={28}
                alt={post.authorName || "Author"}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block line-clamp-1">
                {post.authorName || "Syed Ejaz Bukhari"}
              </span>
              <span className="text-[10px] text-slate-400 block line-clamp-1">
                {post.authorRole || "Founder & Director"}
              </span>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 gap-1 group/btn"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
