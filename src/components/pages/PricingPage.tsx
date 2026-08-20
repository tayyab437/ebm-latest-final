import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  Zap, 
  Info, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  HeartHandshake, 
  GraduationCap,
  MessageSquare,
  PhoneCall,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRICING_PLANS_DATA, FEATURE_COMPARISON_DATA, SCHOLARSHIPS_DATA } from "../home/admissions/admissions.data";

interface PricingPageProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigateToTab }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Filter main plans to display in the primary spotlight grid
  const primaryPlans = useMemo(() => {
    return PRICING_PLANS_DATA.filter(plan => 
      plan.id === "starter" || plan.id === "student" || plan.id === "premium"
    );
  }, []);

  // Filter auxiliary plans for the bento section below
  const auxiliaryPlans = useMemo(() => {
    return PRICING_PLANS_DATA.filter(plan => 
      plan.id === "family" || plan.id === "institution"
    );
  }, []);

  const handleSelectPlan = (planId: string) => {
    if (onNavigateToTab) {
      onNavigateToTab("contact");
    }
  };

  return (
    <article className="min-h-screen bg-[#03050a] text-slate-100 selection:bg-blue-600 selection:text-white antialiased">
      
      {/* ================== PREMIUM ADMISSIONS HEADER ================== */}
      <header className="relative pt-32 pb-20 overflow-hidden border-b border-blue-500/10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[125px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[125px] pointer-events-none -z-10 animate-pulse" />
        
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.6px,transparent_0.6px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-400" /> Transparent Academic Investment
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-sans">
            Clear, Predictable <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              Syllabus Subscriptions
            </span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Select the membership tier that matches your student's learning momentum. Every enrollment includes our certified Cambridge-mapped curriculum, unlimited diagnostic progression charts, and live Socratic feedback.
          </p>
        </div>
      </header>

      {/* ================== MAIN INVESTMENT GRID ================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Billing Toggle Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-400">SELECT FREQUENCY</span>
          
          <div className="relative flex items-center bg-[#050812] p-1.5 rounded-2xl border border-blue-500/15">
            {/* Sliding Accent Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[140px] bg-blue-600 rounded-xl shadow-lg"
              initial={false}
              animate={{
                x: isAnnual ? 140 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
            
            <button
              id="btn-billing-toggle-monthly"
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 w-[140px] py-2.5 text-center text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                !isAnnual ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monthly Billing
            </button>
            
            <button
              id="btn-billing-toggle-annual"
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 w-[140px] py-2.5 text-center text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                isAnnual ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Annual Prepay
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
            <span>🎉 Recieve up to 25% discount with annual commitments</span>
          </div>
        </div>

        {/* Primary Spotlight Cards (3 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {primaryPlans.map((plan) => {
            const isRec = plan.recommended;
            const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const cycleText = isAnnual ? "/ mo, billed annually" : "/ month";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[32px] border-2 transition-all duration-300 overflow-hidden p-8 sm:p-10 ${
                  isRec
                    ? "bg-gradient-to-b from-[#09152b] to-[#03050a] border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.03] z-10"
                    : "bg-[#03050a] border-blue-500/10 hover:border-blue-500/25 shadow-md hover:scale-[1.01]"
                }`}
              >
                {/* Visual Flair Glow for popular plan */}
                {isRec && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-5 right-5 flex items-center gap-1 px-3 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-[8px] font-black uppercase tracking-widest text-blue-300">
                    <Sparkles className="w-2.5 h-2.5" />
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">Syllabus Track</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-sans">{plan.name}</h3>
                    <p className="text-xs text-slate-350 leading-relaxed min-h-[48px]">{plan.description}</p>
                  </div>

                  {/* Pricing block */}
                  <div className="pt-4 border-t border-slate-900 flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-white font-sans">{displayPrice}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{cycleText}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-900/80" />

                  {/* Core Deliverables list */}
                  <div className="space-y-3.5">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Primary Deliverables</span>
                    <ul className="space-y-3">
                      {plan.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Socratic AI Modules */}
                  <div className="pt-5 border-t border-slate-900 space-y-2.5">
                    <span className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Socratic AI Engine
                    </span>
                    <ul className="space-y-1.5">
                      {plan.aiFeatures.map((aiFeat, index) => (
                        <li key={index} className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{aiFeat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-8 border-t border-slate-900 mt-8">
                  <button
                    id={`btn-select-main-plan-${plan.id}`}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                      isRec 
                        ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.03]" 
                        : "bg-slate-950 border border-blue-500/10 hover:border-blue-500/30 text-slate-300 hover:text-white"
                    }`}
                  >
                    Initiate Enrollment Journey
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auxiliary Plans Section: Family & School Partners (Bento style, 2 columns) */}
        <div className="space-y-6 max-w-5xl mx-auto pt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">SPECIALIZED MEMBERSHIPS</span>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">Family & Institutional Formats</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {auxiliaryPlans.map((plan) => {
              const displayPrice = plan.monthlyPrice === "Custom" ? "Custom Rates" : isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const cycleText = plan.monthlyPrice === "Custom" ? "" : isAnnual ? "/ mo, billed annually" : "/ month";
              
              return (
                <div 
                  key={plan.id}
                  className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded uppercase">
                          {plan.id === "family" ? "Unified Households" : "Partner Academies"}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-white uppercase mt-1">{plan.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-black text-white block">{displayPrice}</span>
                        {cycleText && <span className="text-[9px] font-mono text-slate-500 uppercase">{cycleText}</span>}
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>
                    
                    {/* Divider */}
                    <div className="h-px bg-slate-900/60" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Core Benefits</span>
                        <ul className="space-y-1 text-[10px] text-slate-350">
                          {plan.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Interactive SLA</span>
                        <div className="space-y-1 text-[10px] font-mono text-slate-400">
                          <div>Advisor: <span className="text-slate-200">{plan.supportLevel.split(" ")[0]}</span></div>
                          <div>Resources: <span className="text-slate-200 truncate block max-w-[150px]" title={plan.learningResources}>{plan.learningResources}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-900/60 mt-6">
                    <button
                      id={`btn-select-aux-plan-${plan.id}`}
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-blue-500/10 hover:border-blue-500/35 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white rounded-xl cursor-pointer transition-all"
                    >
                      {plan.id === "family" ? "Request Multi-Profile Access" : "Configure School Portal"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ================== DETAILED CURRICULUM SIDE-BY-SIDE COMPARE MATRIX ================== */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">GRANULAR AUDITING</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Full Curriculum Comparison</h2>
          <p className="text-sm text-slate-400">Analyze touchpoints, AI quotas, diagnostics, and advisor support levels side-by-side.</p>
        </div>

        <div className="border border-blue-500/15 rounded-3xl overflow-hidden bg-[#03050a] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-900 uppercase text-[9px] font-black tracking-widest">
                <tr>
                  <th className="py-4 px-6">Features & Specifications</th>
                  <th className="py-4 px-6 text-slate-300">Starter</th>
                  <th className="py-4 px-6 text-blue-400 bg-blue-500/5 border-l border-r border-slate-900">Accelerated Track</th>
                  <th className="py-4 px-6 text-slate-300">Socratic Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {FEATURE_COMPARISON_DATA.map((feat) => (
                  <tr key={feat.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-white max-w-[200px]">{feat.name}</td>
                    
                    {/* Starter */}
                    <td className="py-4.5 px-6 text-slate-400 text-xs">
                      {typeof feat.starter === "boolean" ? (
                        feat.starter ? <Check className="w-4.5 h-4.5 text-blue-500" /> : <span className="text-slate-600">-</span>
                      ) : (
                        feat.starter
                      )}
                    </td>

                    {/* Accelerated */}
                    <td className="py-4.5 px-6 text-slate-200 font-extrabold text-xs bg-blue-500/5 border-l border-r border-slate-900">
                      {typeof feat.student === "boolean" ? (
                        feat.student ? <Check className="w-4.5 h-4.5 text-blue-400" /> : <span className="text-slate-600">-</span>
                      ) : (
                        feat.student
                      )}
                    </td>

                    {/* Premium */}
                    <td className="py-4.5 px-6 text-slate-300 text-xs">
                      {typeof feat.premium === "boolean" ? (
                        feat.premium ? <Check className="w-4.5 h-4.5 text-blue-500" /> : <span className="text-slate-600">-</span>
                      ) : (
                        feat.premium
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================== SCHOLARSHIPS & MERIT AID OPPORTUNITIES ================== */}
      <section className="py-20 bg-[#050812] border-t border-b border-blue-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">INCLUSIVITY DECREES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Active Merit Scholarships & Financial Aid</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              EBM believes exceptional cognitive capacity should never be limited by geographical or household economic boundaries. Explore active financial support models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SCHOLARSHIPS_DATA.map((sch) => (
              <div 
                key={sch.id}
                className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/25 p-6 sm:p-8 rounded-[24px] flex flex-col justify-between group transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-md uppercase">
                      {sch.discountPercentage} Credit
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-base font-black text-white uppercase tracking-tight">{sch.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{sch.description}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-900/60 text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <span className="font-bold uppercase text-slate-500">Eligibility Window:</span>
                  <span className="font-medium">{sch.eligibility}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sibling Aid Apply Banner */}
          <div className="bg-[#03050a] border-2 border-blue-500/15 p-6 sm:p-8 rounded-[24px] flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                <HeartHandshake className="w-4.5 h-4.5 text-blue-400" /> Apply For Financial Support
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Does your household fit standard merit or economic assistance windows? Start your submission profile, and academic advisors will audit potential scholarship credits within 48 hours.
              </p>
            </div>
            <button
              id="btn-apply-for-aid"
              onClick={() => onNavigateToTab && onNavigateToTab("contact")}
              className="px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-blue-500/20 hover:border-blue-500/40 text-xs font-black uppercase tracking-wider text-slate-200 hover:text-white rounded-lg shrink-0 transition-colors"
            >
              Consult Advisory Desk
            </button>
          </div>

        </div>
      </section>

      {/* ================== DYNAMIC PLAN DISCLOSURES FAQ ================== */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">MEMBERSHIP DETAILS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Investment Plans FAQ</h2>
          <p className="text-sm text-slate-400">Answers to key logistical queries regarding memberships, upgrades, and cancellations.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Can I upgrade or downgrade my plan at any time?",
              a: "Yes. All Socratic subscriptions are calculated on a self-directed cycle. You can transition from Starter to Accelerated or Socratic Premium directly inside your student dashboard. Sibling or prepayment promotional rates are updated instantly."
            },
            {
              q: "Are there any registration fees or hidden charges?",
              a: "None. EBM values absolute transparency. There are no surprise admissions levies, enrollment structural fees, or assessment grading charges. Everything is covered within the predictable subscription values."
            },
            {
              q: "Is there a money-back satisfaction guarantee?",
              a: "Absolutely. We offer a completely risk-free 14-day satisfied learning guarantee. If your student does not experience an immediate increase in critical STEM retention or learning momentum within the first two weeks, contact our advisors for a prompt 100% refund."
            },
            {
              q: "How are recurring payments handled?",
              a: "Subscriptions are safely authorized through our enterprise-grade billing gateways, accepting international debit/credit cards. Billed options can be toggled, updated, or paused at any point with instant email confirmations."
            }
          ].map((item, idx) => {
            const isExpanded = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/25 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  id={`btn-pricing-faq-toggle-${idx}`}
                  onClick={() => setActiveFaq(isExpanded ? null : idx)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="text-sm font-black uppercase text-white tracking-tight">{item.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-900">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================== CALL TO ACTION BLOCK ================== */}
      <section className="py-24 bg-gradient-to-b from-[#050812] to-[#03050a] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.6px,transparent_0.6px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-2 animate-bounce">
            <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase font-sans">
            Secure Your Child's Future <br />
            <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              With Deliberate Pedagogy
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate tedious cycles. Introduce accelerated mathematics, Speed Reading, and continuous Socratic dialogue. Schedule their diagnostic audit or begin an enrollment track.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              id="btn-pricing-cta-diagnostic"
              onClick={() => onNavigateToTab && onNavigateToTab("contact")}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              <span>Schedule Diagnostic Interview</span>
              <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
            </button>
            <button
              id="btn-pricing-cta-advisor"
              onClick={() => onNavigateToTab && onNavigateToTab("contact")}
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 border-2 border-blue-500/20 hover:border-blue-500/45 text-slate-200 hover:text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Speak to Academic Advisor</span>
            </button>
          </div>
        </div>
      </section>

    </article>
  );
};

export default PricingPage;
