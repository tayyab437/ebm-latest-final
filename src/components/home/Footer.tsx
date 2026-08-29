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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
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
              Empowering academic acceleration under the Ejaz Bukhari Method. Delivering high-yielding cognitive frameworks globally.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 text-slate-400 dark:text-slate-550">
              <a 
                href="https://www.facebook.com/syedejazbukhari/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="EBM Facebook Page"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/syedejaz_bukhari/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="EBM Instagram Profile"
                className="hover:text-pink-600 dark:hover:text-pink-400 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
 
          {/* Column: Learning */}
          <div className="text-left space-y-3">
            <h5 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Learning</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/assessment" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Assessment Arena</Link></li>
              <li><Link to="/analytics" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Learning Analytics</Link></li>
              <li><Link to="/inspiration" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Inspiration Hub</Link></li>
              <li><Link to="/case-studies" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Case Studies & Videos</Link></li>
            </ul>
          </div>
 
          {/* Column: Resources */}
          <div className="text-left space-y-3">
            <h5 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Resources</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" onClick={(e) => handleAnchorClick(e, "faq")} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">FAQs</a></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Contact Us</Link></li>
            </ul>
          </div>
 
          {/* Column: Legal & Contact */}
          <div className="text-left space-y-3">
            <h5 className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-wider font-mono">Legal</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Terms of Service</Link></li>
              <li className="pt-2 text-[10px] text-slate-500 dark:text-slate-400 flex flex-col gap-1.5 font-mono">
                <a href="mailto:syedejazbukari@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                  <Mail className="h-3 w-3" /> syedejazbukari@gmail.com
                </a>
                <a href="tel:+923334541572" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                  <Phone className="h-3 w-3" /> +92 333 4541572
                </a>
              </li>
            </ul>
          </div>
        </div>
 
        {/* Footer Bottom Metadata & Accolades */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>&copy; {currentYear} {logoText || "EBM Digital Learning"}. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-550">
              Website created and SEO by{" "}
              <a 
                href="https://wa.me/923176369458" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Tayyab Ashfaq
              </a>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Cambridge Associate Syndicate candidates track</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
