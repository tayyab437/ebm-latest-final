import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Eye,
  ListOrdered
} from "lucide-react";
import type { BlogPost } from "../../types/blog.types";
import { BlogService } from "../../services/blog.service";
import { generateBlogPostStructuredData } from "../../services/seo.schema";
import { SEOHead } from "../SEOHead";
import { BlogCard } from "./BlogCard";

export function BlogPostView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [tocHeadings, setTocHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await BlogService.getPostBySlug(slug);
        
        if (!res) {
          setPost(null);
          setIsLoading(false);
          return;
        }

        // Handle 301 Permanent Redirect
        if (res.redirect && res.targetSlug) {
          navigate(`/blog/${res.targetSlug}`, { replace: true });
          return;
        }

        if (res.post) {
          setPost(res.post);
          setRelatedPosts(res.relatedPosts || []);
          
          // Track view count
          BlogService.trackView(res.post.id);

          // Extract table of contents from content H2/H3
          const parser = new DOMParser();
          const doc = parser.parseFromString(res.post.content, "text/html");
          const headings = Array.from(doc.querySelectorAll("h2, h3"));
          const toc = headings.map((h, i) => {
            const id = h.id || `section-${i + 1}`;
            return {
              id,
              text: h.textContent || `Section ${i + 1}`,
              level: h.tagName.toLowerCase() === "h2" ? 2 : 3
            };
          });
          setTocHeadings(toc);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareTwitter = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post.title} | EBM Blog`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-8">
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="w-48 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="w-full h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="space-y-4">
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Article Not Found
          </h1>
          <p className="text-xs text-slate-500">
            The pedagogical article you requested could not be found, or has been archived.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to EBM Blog Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  // Generate complete Schema.org JSON-LD BlogPosting graph
  const structuredData = generateBlogPostStructuredData({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    categoryName: post.categoryName,
    categorySlug: post.categorySlug,
    authorName: post.authorName,
    authorRole: post.authorRole,
    authorSlug: post.authorSlug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    createdAt: post.createdAt,
    readingTime: post.readingTime,
    tags: post.tags,
    canonicalUrl: post.canonicalUrl
  });

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    : "Recently Published";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Route-Aware Dynamic Article SEO */}
      <SEOHead
        title={post.seoTitle || `${post.title} | EBM Blog`}
        description={post.seoDescription || post.excerpt}
        canonicalUrl={post.canonicalUrl || `https://ejazbukharimethod.com/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featuredImage}
        ogImageAlt={post.featuredImageAlt || post.title}
        noindex={post.noindex}
        articleMeta={{
          publishedTime: post.publishedAt || post.createdAt,
          modifiedTime: post.updatedAt || post.publishedAt || post.createdAt,
          author: post.authorName || "Syed Ejaz Bukhari",
          section: post.categoryName || "Education",
          tags: post.tags
        }}
        customSchema={structuredData}
      />

      {/* Article Header & Breadcrumbs */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-10 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Blog</Link>
            {post.categoryName && post.categorySlug && (
              <>
                <span>/</span>
                <Link to={`/blog/category/${post.categorySlug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {post.categoryName}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold truncate max-w-[200px]" aria-current="page">
              {post.title}
            </span>
          </nav>

          {/* Category Badge & Meta Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            {post.categoryName && (
              <Link
                to={post.categorySlug ? `/blog/category/${post.categorySlug}` : "/blog"}
                className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition"
              >
                {post.categoryName}
              </Link>
            )}
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime || 5} min read
            </span>
          </div>

          {/* Article Title (Single H1) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Excerpt / Lead Paragraph */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-serif italic border-l-4 border-blue-600 pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Author Byline & Social Share Row */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <img
                  src={post.authorAvatar}
                  alt={post.authorName || "Author"}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  EB
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {post.authorName || "Syed Ejaz Bukhari"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {post.authorRole || "Founder & Director of Pedagogy"}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Share:
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition relative"
                title="Copy Article Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
                {copiedLink && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={handleShareTwitter}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Share on Twitter / X"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
              </button>
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Featured Image */}
        {post.featuredImage && (
          <figure className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="w-full h-auto max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            {post.featuredImageAlt && (
              <figcaption className="p-3 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                {post.featuredImageAlt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Table of Contents (if at least 2 headings present) */}
        {tocHeadings.length >= 2 && (
          <nav aria-label="Table of contents" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <ListOrdered className="w-4 h-4" />
              <span>In This Article</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {tocHeadings.map((heading, idx) => (
                <li key={idx} className={heading.level === 3 ? "pl-4 text-slate-500" : "font-semibold"}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(heading.id) || Array.from(document.querySelectorAll("h2, h3"))[idx];
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body Typography */}
        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs leading-relaxed text-slate-800 dark:text-slate-200">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-6"
          />
        </article>

        {/* Tags Bar */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {post.authorAvatar ? (
            <img
              src={post.authorAvatar}
              alt={post.authorName || "Syed Ejaz Bukhari"}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0">
              EB
            </div>
          )}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  About {post.authorName || "Syed Ejaz Bukhari"}
                </h3>
                <span className="text-xs text-blue-600 font-semibold">
                  {post.authorRole || "Founder & Director of Pedagogy"}
                </span>
              </div>
              <Link
                to="/about"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 justify-center sm:justify-start"
              >
                <span>Learn about EBM Pedagogy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {post.authorBio || "Educator, mathematician, and founder of the Ejaz Bukhari Method (EBM). Dedicated to engineering personalized learning pathways that transform foundational student curiosity into high-speed conceptual mastery."}
            </p>
          </div>
        </div>

        {/* Diagnostic Assessment Banner CTA */}
        <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Learning Evaluation</span>
            </div>
            <h3 className="text-xl font-black tracking-tight">
              Evaluate Your Student's Personalized Learning Baseline
            </h3>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Take the EBM Diagnostic Assessment to identify exact conceptual gaps, cognitive speed, and receive a tailored learning roadmap.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              to="/assessment"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/analytics"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs text-center border border-slate-700 transition"
            >
              <span>View Analytics</span>
            </Link>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Related Educational Perspectives
              </h3>
              <Link to="/blog" className="text-xs font-bold text-blue-600 hover:underline">
                View All Articles
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} variant="standard" />
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
