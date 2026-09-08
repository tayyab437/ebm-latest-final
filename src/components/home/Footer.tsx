import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Shield, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useBrandingStore, BRANDING_ICONS } from "../../lib/branding.store";

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { logoText, logoType, logoIcon, logoImageUrl } = useBrandingStore();
  
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="ebm-footer" className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-16 border-t border-slate-200 dark:border-slate-800/80 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand Bio */}
          <div className="col-span-2 space-y-4 text-left">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              {logoType === "icon" ? (
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-500/15 shrink-0">
                  {(() => {
                    const IconComponent = BRANDING_ICONS[logoIcon] || GraduationCap;
                    return <IconComponent className="h-5 w-5 text-white" />;
                  })()}
                </div>
              ) : logoImageUrl ? (
                <div className="h-9 flex items-center justify-center bg-transparent shrink-0">
                  <img 
                    src={logoImageUrl} 
                    alt="Logo" 
                    width="160"
                    height="36"
                    className="h-9 max-h-10 max-w-[160px] object-contain bg-transparent" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              )}
              <span className="text-slate-900 dark:text-white font-black tracking-tight text-lg">
                {logoText || "EBM Learning"}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Empowering academic acceleration under the Ejaz Bukhari Method. Delivering high-yielding cognitive frameworks, diagnostic baselines, and Cambridge syllabus mastery globally.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 text-slate-400 dark:text-slate-550 pt-1">
              <a 
                href="https://www.facebook.com/syedejazbukhari/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="EBM Facebook Page"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition w-11 h-11 flex items-center justify-center rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/syedejaz_bukhari/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="EBM Instagram Profile"
                className="hover:text-pink-600 dark:hover:text-pink-400 transition w-11 h-11 flex items-center justify-center rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column: Academic Curricula */}
          <div className="text-left space-y-3">
            <h3 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Curricula & Pathways</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/programs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 font-medium">Academic Programs</Link></li>
              <li><Link to="/assessment" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Diagnostic Assessment</Link></li>
              <li><Link to="/learning" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Interactive Portal</Link></li>
              <li><Link to="/pricing" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Tuition & Plans</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">About EBM Pedagogy</Link></li>
            </ul>
          </div>

          {/* Column: Learning & Analytics */}
          <div className="text-left space-y-3">
            <h3 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Telemetry & Insights</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/analytics" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Cognitive Analytics</Link></li>
              <li><Link to="/inspiration" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Inspiration Hub</Link></li>
              <li><Link to="/case-studies" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Student Success Cases</Link></li>
              <li><Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Student Portal Login</Link></li>
              <li><Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Enroll Student</Link></li>
            </ul>
          </div>

          {/* Column: Featured Research Publications (Incoming Links for All Core Articles) */}
          <div className="text-left space-y-3">
            <h3 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Featured Research</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/blog/how-personalized-learning-supports-students" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 text-left">Personalized Learning Pathways</Link></li>
              <li><Link to="/blog/how-students-develop-mathematical-thinking" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 text-left">Mathematical Problem-Solving</Link></li>
              <li><Link to="/blog/understanding-learning-mastery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 text-left">Diagnostic Baselines & Mastery</Link></li>
              <li><Link to="/blog/cognitive-acceleration-stem-foundations" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 text-left">Cognitive Acceleration in STEM</Link></li>
              <li><Link to="/blog/ai-socratic-tutoring-self-directed-learning" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5 text-left">Socratic AI Tutoring Framework</Link></li>
            </ul>
          </div>

          {/* Column: Resources & Legal */}
          <div className="text-left space-y-3">
            <h3 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Resources & Contact</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer font-medium text-blue-600 dark:text-blue-400 inline-flex items-center min-h-[44px] py-1.5">All Publications</Link></li>
              <li><a href="#faq" onClick={(e) => handleAnchorClick(e, "faq")} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Curriculum FAQs</a></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Admissions Contact</Link></li>
              <li><Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center min-h-[44px] py-1.5">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Research Topic Hubs Strip (Contextual Knowledge Network Links for AI Search Engines) */}
        <div className="py-8 border-b border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
              Pedagogical Knowledge Hubs:
            </span>
            <span className="text-xs text-slate-500">
              Explore specialized educational frameworks and cognitive research archives
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/blog/category/personalized-learning"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="min-h-[44px] inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            >
              Personalized Learning
            </Link>
            <Link
              to="/blog/category/mathematical-thinking"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="min-h-[44px] inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            >
              Mathematical Thinking
            </Link>
            <Link
              to="/blog/category/diagnostic-assessment"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="min-h-[44px] inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            >
              Diagnostic Assessment
            </Link>
            <Link
              to="/blog/category/cognitive-acceleration"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="min-h-[44px] inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            >
              Cognitive Acceleration
            </Link>
            <Link
              to="/blog/category/ai-edtech"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="min-h-[44px] inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition"
            >
              AI & EdTech
            </Link>
          </div>
        </div>
 
        {/* Footer Bottom Metadata & Accolades */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-700 dark:text-slate-300 font-sans">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>&copy; {currentYear} {logoText || "EBM Digital Learning"}. All Rights Reserved.</p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Website created and SEO by{" "}
              <a 
                href="https://wa.me/923176369458" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-700 dark:text-blue-400 underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-semibold cursor-pointer inline-flex items-center min-h-[44px] py-1"
              >
                Tayyab Ashfaq
              </a>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
            <Shield className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0" />
            <span>Cambridge Associate Syndicate candidates track</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
