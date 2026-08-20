import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { HOME_FAQS } from "./constants";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq_how");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-xs font-mono tracking-widest uppercase font-extrabold px-3 py-1 bg-blue-600/10 dark:bg-blue-500/10 rounded-full">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Find immediate answers on the Ejaz Bukhari Method, student acceleration milestones, safety safeguards, and general Cambridge O-Level credentials.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {HOME_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id} 
                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition duration-200 hover:border-blue-300 dark:hover:border-blue-500/30"
              >
                {/* Accordion Trigger */}
                <button
                  id={`btn-faq-trigger-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shadow-sm">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {/* Accordion Body with Framer Motion AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-150 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed bg-white dark:bg-slate-900/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Helpdesk CTA footer */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <h4 className="font-bold text-slate-900 dark:text-white">Have a custom question about EBM syllabus credentials?</h4>
              <p className="text-slate-550 dark:text-slate-400">Ask our 24/7 Socratic AI Tutor or schedule a physical consultation.</p>
            </div>
          </div>
          <a
            href="#admissions-pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition shrink-0 uppercase tracking-wider text-[10px]"
          >
            Enroll Now
          </a>
        </div>

      </div>
    </section>
  );
}
