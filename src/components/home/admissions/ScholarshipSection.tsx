import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { SCHOLARSHIPS_DATA } from "./admissions.data";
import { STAGGER_CONTAINER_VARIANTS, FADE_IN_UP_VARIANTS } from "./animations";

const ScholarshipIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Award className={className} />;
  return <IconComponent className={className} />;
};

export const ScholarshipSection: React.FC = () => {
  const [activeApplyModal, setActiveApplyModal] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleApplyClick = (id: string) => {
    setActiveApplyModal(id);
    setSubmittedId(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeApplyModal) {
      setSubmittedId(activeApplyModal);
      setTimeout(() => {
        setActiveApplyModal(null);
      }, 1500);
    }
  };

  return (
    <div className="py-12" id="scholarships-section">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
          Equal Opportunity Access
        </span>
        <h3 className="text-2xl font-sans font-medium text-white tracking-tight mb-3">
          Scholarships & Financial Assistance
        </h3>
        <p className="max-w-2xl mx-auto text-sm text-slate-400 leading-relaxed">
          We believe absolute genius should not be limited by geographic or financial boundaries.
          Explore our subsidized assistance streams.
        </p>
      </div>

      <motion.div
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {SCHOLARSHIPS_DATA.map((sch) => (
          <motion.div
            key={sch.id}
            variants={FADE_IN_UP_VARIANTS}
            className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/50 transition-all duration-300"
          >
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-[10px] font-mono font-semibold tracking-wider text-indigo-300">
              {sch.discountPercentage}
            </div>

            {/* Icon Column */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 shrink-0">
              <ScholarshipIcon name={sch.iconName} className="w-5 h-5" />
            </div>

            {/* Content Column */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-base font-sans font-semibold text-slate-100 mb-1 group-hover:text-white transition-colors">
                  {sch.title}
                </h4>
                <div className="mb-3 text-[11px] font-mono text-indigo-300">
                  <span className="text-slate-500">Eligibility: </span>
                  {sch.eligibility}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {sch.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleApplyClick(sch.id)}
                  id={`apply-scholarship-${sch.id}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-200 border border-slate-700 hover:border-indigo-500/30 rounded-xl text-xs font-sans font-medium text-slate-300 transition-all cursor-pointer"
                >
                  Initiate Pre-Application
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Simplified, elegant micro-modal for Scholarship requests inside the preview */}
      <AnimatePresence>
        {activeApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveApplyModal(null)}
            />

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h4 className="text-lg font-sans font-semibold text-white mb-2">
                Scholarship Evaluation Request
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Submit details below. Our community aid division will evaluate your submission alongside the diagnostic assessment score.
              </p>

              {submittedId === activeApplyModal ? (
                <div className="py-8 text-center">
                  <Icons.CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm font-sans font-medium text-slate-200">Request Registered Successfully</p>
                  <p className="text-xs text-slate-500 mt-1">Check your inbox for diagnostic registration parameters.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Guardian Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Contact Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Brief Support Context / Rationale</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Detail current scholastic or financial parameters..."
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveApplyModal(null)}
                      className="flex-1 py-2 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-sans text-slate-400 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-sans font-medium transition-colors cursor-pointer"
                    >
                      Submit Context
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScholarshipSection;
