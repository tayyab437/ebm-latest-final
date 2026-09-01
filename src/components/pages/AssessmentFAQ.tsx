import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const ASSESSMENT_FAQS: FAQItem[] = [
  {
    id: "ebm-faq-1",
    question: "What is the EBM Diagnostic Assessment?",
    answer:
      "The EBM Diagnostic Assessment helps identify where a learner currently stands in Mathematics and English Comprehension. It provides insight into strengths, learning needs, and areas that may require further support."
  },
  {
    id: "ebm-faq-2",
    question: "Which subjects does the EBM Diagnostic Assessment cover?",
    answer:
      "The EBM Diagnostic Assessment covers Mathematics and English Comprehension, helping provide a clearer picture of a learner's academic skills across these areas."
  },
  {
    id: "ebm-faq-3",
    question: "Which grade levels does the EBM Diagnostic Assessment support?",
    answer:
      "The assessment is designed to support learners from Grade 1 through O/A Levels, with assessment content aligned to the learner's level and learning needs."
  },
  {
    id: "ebm-faq-4",
    question: "How does the EBM Diagnostic Assessment work?",
    answer:
      "The assessment uses an adaptive approach to evaluate a learner's current skills. As the learner responds to questions, the assessment helps identify areas of strength and areas where additional learning support may be needed."
  },
  {
    id: "ebm-faq-5",
    question: "What happens after a learner completes the assessment?",
    answer:
      "The assessment results provide meaningful learning insights that can help identify appropriate next steps. These insights can support more focused and personalized learning."
  },
  {
    id: "ebm-faq-6",
    question: "How does the assessment support personalized learning?",
    answer:
      "By identifying a learner's current strengths and learning needs, the EBM Diagnostic Assessment helps provide a clearer starting point for personalized learning and targeted skill development."
  },
  {
    id: "ebm-faq-7",
    question: "Can parents and educators use the assessment insights?",
    answer:
      "Yes. Assessment insights can help parents and educators better understand a learner's current performance and identify areas where additional learning support may be beneficial."
  },
  {
    id: "ebm-faq-8",
    question: "Does the assessment measure both foundational and advanced skills?",
    answer:
      "Yes. The EBM Diagnostic Assessment supports learners across different stages of development, from foundational skills in earlier grades through more advanced Mathematics and English Comprehension skills at O/A Levels."
  }
];

export function AssessmentFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="assessment-faqs" 
      aria-label="Frequently Asked Questions About EBM Diagnostic Assessment"
      className="relative py-16 sm:py-24 bg-[#eaf6f9] overflow-hidden border-t border-b border-[#ccebf2]"
    >
      {/* Atmospheric faint background SVG pattern (text-free to ensure 100% WCAG color contrast compliance) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none select-none opacity-40 overflow-hidden"
      >
        <svg className="w-full h-full text-[#007ba8]/15" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ================= LEFT COLUMN (Design matched to reference image) ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-24">
            
            {/* Two floating graphic bubbles */}
            <div className="flex items-center gap-3.5 mb-8">
              {/* Question bubble */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#0091c7] to-[#00c0f3] text-white flex items-center justify-center shadow-lg shadow-sky-500/25 ring-[5px] ring-white">
                <span className="text-3xl sm:text-4xl font-black font-serif">?</span>
              </div>
              
              {/* Speech dots bubble */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#00b3e6] to-[#40dcfb] text-white flex items-center justify-center shadow-md shadow-sky-500/20 ring-[4px] ring-white">
                <span className="text-2xl sm:text-3xl font-black tracking-widest leading-none pb-1">...</span>
              </div>
            </div>

            {/* Display Typography FAQ */}
            <div className="mb-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0f2742] tracking-tighter block font-sans">
                FAQ
              </span>
            </div>

            {/* H2 Heading */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0f2742] tracking-tight leading-snug mb-4">
              Frequently Asked Questions About EBM Diagnostic Assessment
            </h2>

            {/* Introduction */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-medium">
              Find answers to common questions about the EBM Diagnostic Assessment, including how it works, what subjects and levels it covers, and how assessment insights support personalized learning.
            </p>

            {/* View All Pill Action (matches image) */}
            <a
              href="#assessment-faqs"
              onClick={(e) => {
                e.preventDefault();
                setOpenId(openId ? null : ASSESSMENT_FAQS[0].id);
              }}
              className="inline-flex items-center gap-2.5 bg-[#0f233e] hover:bg-[#1a385f] text-white text-xs font-black tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md shadow-slate-900/10 transition-all cursor-pointer group"
              id="btn-faq-view-all"
            >
              <span>{openId ? "COLLAPSE" : "VIEW ALL"}</span>
              <span className="w-5 h-5 rounded-full bg-[#00a3e0] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3 h-3 stroke-[3]" />
              </span>
            </a>

          </div>

          {/* ================= RIGHT COLUMN (Interactive Accordions) ================= */}
          <div className="lg:col-span-7 space-y-3.5 w-full">
            {ASSESSMENT_FAQS.map((faq, idx) => {
              const isOpen = openId === faq.id;
              const questionId = `faq-q-${faq.id}`;
              const answerId = `faq-a-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  id={`faq-card-${faq.id}`}
                  className={`bg-white transition-all duration-200 border ${
                    isOpen 
                      ? "rounded-2xl sm:rounded-3xl border-sky-300 shadow-md shadow-sky-900/5 ring-1 ring-sky-200" 
                      : "rounded-full sm:rounded-full border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-sm"
                  } overflow-hidden`}
                >
                  {/* Semantic H3 for SEO wrapping button */}
                  <h3 className="m-0 p-0 text-inherit font-inherit">
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleFaq(faq.id)}
                      className={`w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00709d] cursor-pointer transition-colors min-h-[44px] ${
                        isOpen 
                          ? "px-5 sm:px-7 pt-4 sm:pt-5 pb-2" 
                          : "px-5 sm:px-7 py-3.5 sm:py-4"
                      }`}
                    >
                      <span className="text-xs sm:text-sm md:text-[14.5px] font-bold text-[#0f2742] leading-snug pr-3 select-none">
                        {faq.question}
                      </span>
                      
                      <span 
                        aria-hidden="true" 
                        className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          isOpen
                            ? "bg-[#00709d] text-white shadow-xs rotate-180"
                            : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-[#00709d]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-4 sm:pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 mt-1 font-medium">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
