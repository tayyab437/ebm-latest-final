import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Headphones,
  Zap,
  CheckCircle2
} from "lucide-react";

import techDiagram from "../../../assets/images/tech_isometric_diagram_1785743151280.jpg";
import officeBg from "../../../assets/images/blurred_office_background_1785743168497.jpg";

interface TabItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  metric: { value: string; label: string };
  icon: React.ElementType;
  color: string;
}

const WHY_CHOOSE_US_TABS: TabItem[] = [
  {
    id: "tech",
    title: "Innovative Technology",
    subtitle: "Advanced digital ecosystems",
    description: "Leveraging state-of-the-art AI systems, advanced heuristic learning pipelines, and highly modern interactive dashboards to create an unprecedented accelerative environment.",
    features: ["Adaptive AI Tutors", "Heuristic Learning Progress Tracking", "Interactive Virtual Workspace"],
    metric: { value: "10x", label: "Learning Speedup" },
    icon: Cpu,
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: "team",
    title: "Expert Team",
    subtitle: "World-class guides",
    description: "Our core curriculum and educational strategies are led by certified senior Cambridge tutors, veteran systems architects, and deep learning engineers committed to student success.",
    features: ["Cambridge Certified Educators", "Veteran Software Architects", "1-on-1 Dedicated Guidance"],
    metric: { value: "15+", label: "Avg. Years Exp." },
    icon: Users,
    color: "from-indigo-400 to-purple-600"
  },
  {
    id: "scalable",
    title: "Scalable Solutions",
    subtitle: "Grows with your needs",
    description: "From individual diagnostic assessments to comprehensive institutional portals, our server infrastructure and curriculum models expand seamlessly to support any scale.",
    features: ["Multi-tenant School Portals", "Dynamic Class Sizing", "Robust Cloud Scalability"],
    metric: { value: "99.9%", label: "Uptime SLA" },
    icon: TrendingUp,
    color: "from-teal-400 to-emerald-600"
  },
  {
    id: "secure",
    title: "Secure Infrastructure",
    subtitle: "Privacy & protection first",
    description: "Backed by enterprise-grade secure databases, sandboxed virtual environments, and encrypted biometric authentication metrics to ensure ultimate privacy.",
    features: ["AES-256 Data Encryption", "Encrypted Session Keys", "GDPR & FERPA Compliant"],
    metric: { value: "Zero", label: "Security Breaches" },
    icon: ShieldCheck,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "support",
    title: "Client-Centric Support",
    subtitle: "Here for you 24/7",
    description: "Providing 24/7 hyper-personalized assistance through AI tutors, real-time parent monitoring dashboards, and direct, responsive support channels.",
    features: ["Round-the-clock Helpdesk", "Direct Teacher Channels", "Instant Diagnostic Reports"],
    metric: { value: "< 5m", label: "Response Time" },
    icon: Headphones,
    color: "from-pink-500 to-rose-600"
  }
];

export const WhyChooseUs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("tech");

  const currentTab = WHY_CHOOSE_US_TABS.find(tab => tab.id === activeTabId) || WHY_CHOOSE_US_TABS[0];
  const CurrentIcon = currentTab.icon;

  return (
    <div className="py-20 rounded-[40px] px-8 sm:px-16 md:px-24 border border-slate-200/50 dark:border-slate-800/50 shadow-xs relative overflow-hidden select-none transition-all duration-500">
      
      {/* Background office blurred picture overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center select-none" 
        style={{ backgroundImage: `url(${officeBg})` }} 
      />
      {/* Soft light-gray frosted backdrop matching photo */}
      <div className="absolute inset-0 bg-white/75 dark:bg-slate-950/85 backdrop-blur-[2px] pointer-events-none" />

      {/* Grid Pattern overlay for tech/office feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header Section */}
      <div className="mb-16 text-left space-y-3 relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
          WHY CHOOSE US
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-sans font-normal tracking-wide">
          Leveraging cutting-edge solutions for your success
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Vertical Tab Selector (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {WHY_CHOOSE_US_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative w-full rounded-full py-4.5 pl-14 pr-8 text-left text-lg font-bold font-sans tracking-wide transition-all duration-300 select-none cursor-pointer outline-none border transition-colors ${
                  isActive
                    ? "bg-[#0b1329] text-white border-slate-950/20 shadow-lg shadow-blue-950/20"
                    : "bg-white/50 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/65 text-[#1e293b] dark:text-slate-200 border-slate-200/30 dark:border-slate-800/10 shadow-xs"
                }`}
              >
                {/* Left Accent Indicator Pill Bar */}
                <div
                  className={`absolute left-1.5 top-1.5 bottom-1.5 w-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)]"
                      : "bg-[#cbd5e1] dark:bg-slate-600"
                  }`}
                />
                
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Right Glassmorphic Panel with Dynamic Info & Futuristic Image Background */}
        <div className="lg:col-span-7 h-[420px] sm:h-[480px] md:h-[540px] w-full rounded-[32px] relative overflow-hidden border border-white/40 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.06)] bg-white/20 dark:bg-slate-950/15 backdrop-blur-xl flex flex-col justify-between select-none transition-all duration-500">
          
          {/* Futuristic Diagram Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={techDiagram} 
              alt="Futuristic Tech Diagram" 
              className="w-full h-full object-cover opacity-80 mix-blend-lighten dark:mix-blend-screen"
            />
            {/* Subtle Gradient Overlays for Visual Blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-slate-950/15 pointer-events-none" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-10"
            >
              {/* Top HUD Stats/Info Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 dark:bg-slate-900/30 border border-white/20 dark:border-white/5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    <CurrentIcon className="w-3.5 h-3.5" />
                    {currentTab.subtitle}
                  </div>
                </div>

                {/* Micro Metric Card */}
                <div className="text-right bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-2xl px-4 py-2.5 shadow-xs">
                  <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${currentTab.color} bg-clip-text text-transparent`}>
                    {currentTab.metric.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">
                    {currentTab.metric.label}
                  </div>
                </div>
              </div>

              {/* Bottom Transparent HUD Info Panel */}
              <div className="bg-slate-950/80 dark:bg-slate-950/85 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                    {currentTab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {currentTab.description}
                  </p>
                </div>

                {/* Sub Features list inside HUD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  {currentTab.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};

export default WhyChooseUs;
