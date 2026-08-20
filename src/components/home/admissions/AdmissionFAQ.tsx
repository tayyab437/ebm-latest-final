import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ADMISSION_FAQS_DATA } from "./admissions.data";

export const AdmissionFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-12" id="faq">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2 font-semibold">
          Admissions Knowledge base
        </span>
        <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          Frequently Asked Questions
        </h3>
        <p className="max-w-2xl mx-auto text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
          Everything parents and students need to know about academic parameters, tech setups, and Socratic evaluation structures.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {ADMISSION_FAQS_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/20 overflow-hidden transition-colors duration-200"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(faq.id)}
                id={`faq-btn-${faq.id}`}
                className="w-full flex items-center justify-between p-5 text-left text-slate-850 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-sm font-sans font-semibold">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                />
              </button>

              {/* Answer Box */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[300px] border-t border-slate-200 dark:border-slate-800/50" : "max-h-0"
                } overflow-hidden`}
              >
                <div className="p-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900/10">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdmissionFAQ;
