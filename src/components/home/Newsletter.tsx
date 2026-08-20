import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "subscribed">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    // Simple robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please provide a valid student or parent email address.");
      return;
    }

    // Simulate database / API logging
    setStatus("subscribed");
    setMessage("Success! You've joined the EBM newsletter lists. Dynamic syllabi alerts will land in your inbox.");
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/80 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Stay Updated on Syllabus Accelerated Releases
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            Subscribe to our EBM news briefs. Get the latest Cambridge past paper breakdowns, speed reading strategies, and digital learning tool alerts directly.
          </p>

          <div className="pt-4">
            {status === "subscribed" ? (
              <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30 p-4 rounded-2xl flex items-center gap-3 text-left text-xs sm:text-sm animate-fade-in max-w-lg mx-auto shadow-sm">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <p className="font-semibold">{message}</p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <div className="flex-grow relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter parent or student email..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition shadow-inner"
                  />
                </div>
                <button
                  id="btn-newsletter-subscribe"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer shrink-0"
                >
                  Join List 
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-red-500 text-xs font-semibold pt-2.5 animate-fade-in">
                ⚠️ {message}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
