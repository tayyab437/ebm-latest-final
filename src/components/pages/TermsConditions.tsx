import React, { useState, useEffect } from "react";
import { Gavel, FileText, AlertTriangle } from "lucide-react";

export const TermsConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["acceptance", "academic-integrity", "account-access", "service-availability", "liability", "termination"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-20 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
            <Gavel className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Terms and Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 font-mono text-xs sm:text-sm">
            <span>Effective Date: August 1, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Version: 2.4.0</span>
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 relative">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4 shrink-0 hidden md:block">
            <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Sections
              </h3>
              <nav className="space-y-1">
                {[
                  { id: "acceptance", label: "1. Acceptance of Terms" },
                  { id: "academic-integrity", label: "2. Academic Integrity" },
                  { id: "account-access", label: "3. Account Access" },
                  { id: "service-availability", label: "4. Service Availability" },
                  { id: "liability", label: "5. Limitation of Liability" },
                  { id: "termination", label: "6. Termination" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeSection === item.id 
                        ? "bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 font-bold" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Legal Content */}
          <div className="md:w-3/4">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-slate-900 dark:prose-h2:text-white prose-p:text-slate-650 dark:prose-p:text-slate-350 prose-p:leading-relaxed prose-li:text-slate-650 dark:prose-li:text-slate-350">
                
                <section id="acceptance" className="scroll-mt-28">
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By registering an account, accessing, or using the Ejaz Bukhari Method (EBM) digital platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms govern the relationship between EBM Education Inc. ("EBM", "we", "us") and the enrolled student, their parents, or legal guardians ("User", "you").
                  </p>
                </section>

                <section id="academic-integrity" className="scroll-mt-28">
                  <h2>2. Academic Integrity & AI Usage</h2>
                  <p>
                    The EBM platform is designed to facilitate active learning through Socratic dialogue and structured logic nodes. Users agree to the following academic standards:
                  </p>
                  <ul>
                    <li>The integrated AI Tutor is to be used exclusively for guidance, conceptual breakdown, and study assistance.</li>
                    <li>Utilizing the AI, or any other external tool, to generate direct answers for assessments, milestone exams, or certification gateways constitutes academic dishonesty.</li>
                    <li>Attempting to bypass, spoof, or manipulate the biometric attendance verification systems is strictly prohibited.</li>
                  </ul>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-5 rounded-2xl my-6 not-prose flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                      Violation of the Academic Integrity policy may result in immediate suspension of access to the platform and invalidation of accrued academic credits without refund.
                    </p>
                  </div>
                </section>

                <section id="account-access" className="scroll-mt-28">
                  <h2>3. Account Access and Security</h2>
                  <p>
                    You are solely responsible for maintaining the confidentiality of your login credentials. EBM accounts are strictly provisioned on a per-user basis. Sharing account credentials between multiple students to bypass tuition fees violates our licensing agreements and will trigger automated account lockouts.
                  </p>
                </section>

                <section id="service-availability" className="scroll-mt-28">
                  <h2>4. Service Availability & Modifications</h2>
                  <p>
                    We continually strive to optimize the EBM platform, implementing rolling updates to the curriculum and AI logic engines. While we target 99.9% uptime, we reserve the right to temporarily suspend the platform for critical maintenance. Planned maintenance windows will be communicated via the Parent Feed at least 48 hours in advance. We do not guarantee uninterrupted access and are not liable for disruptions caused by external network failures or local device incompatibilities.
                  </p>
                </section>

                <section id="liability" className="scroll-mt-28">
                  <h2>5. Limitation of Liability</h2>
                  <p>
                    EBM provides a highly optimized structural framework to accelerate learning. However, we do not legally guarantee specific examination results, grades on Cambridge CIE assessments, or university admissions. The accelerated timeline (e.g., 3 years instead of 5) is dependent on the student's consistent daily effort, cognitive engagement, and adherence to the personalized roadmap. EBM Education Inc. shall not be liable for any indirect, incidental, or consequential damages arising from the use of the platform.
                  </p>
                </section>

                <section id="termination" className="scroll-mt-28">
                  <h2>6. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your account at any time, with or without cause, including but not limited to breach of these Terms, failure to pay tuition fees, or prolonged periods of inactivity that violate our academic enrollment policies.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
