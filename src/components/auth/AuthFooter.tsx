import React from "react";

export function AuthFooter() {
  return (
    <footer
      id="auth-footer"
      className="mt-8 text-center text-xs text-slate-400 space-y-2 border-t border-slate-100 pt-4"
    >
      <div className="flex justify-center space-x-4">
        <a
          href="#terms"
          id="auth-footer-terms"
          className="hover:text-slate-600 transition-colors underline underline-offset-2"
        >
          Terms of Service
        </a>
        <span>•</span>
        <a
          href="#privacy"
          id="auth-footer-privacy"
          className="hover:text-slate-600 transition-colors underline underline-offset-2"
        >
          Privacy Policy
        </a>
        <span>•</span>
        <a
          href="#support"
          id="auth-footer-support"
          className="hover:text-slate-600 transition-colors underline underline-offset-2"
        >
          Student Support
        </a>
      </div>
      <p className="font-mono text-[10px]">
        Protected by enterprise-grade AES-256 Multi-Factor Authentication & Rate-Limiting.
      </p>
    </footer>
  );
}
