import React, { useState, useEffect } from "react";
import { ShieldCheck, FileText, Lock, Eye } from "lucide-react";
import { SEOHead } from "../SEOHead";

export const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "data-collection", "ai-processing", "data-usage", "security", "user-rights"];
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
      <SEOHead 
        title="Privacy Policy | EBM Digital Learning Platform"
        description="Review how EBM handles and safeguards student, parent, and institutional data with strict educational privacy protocols."
        canonicalUrl="https://ejazbukharimethod.com/privacy"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
            <ShieldCheck className="w-4 h-4" /> Compliance Document
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 font-mono text-xs sm:text-sm">
            <span>Effective Date: August 1, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Last Updated: July 15, 2026</span>
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 relative">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4 shrink-0 hidden md:block">
            <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Contents
              </h3>
              <nav className="space-y-1">
                {[
                  { id: "introduction", label: "1. Introduction" },
                  { id: "data-collection", label: "2. Data Collection" },
                  { id: "ai-processing", label: "3. AI Processing & Privacy" },
                  { id: "data-usage", label: "4. How We Use Data" },
                  { id: "security", label: "5. Data Security" },
                  { id: "user-rights", label: "6. Your Rights" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeSection === item.id 
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-750 dark:text-amber-400 font-bold" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
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
              <div className="prose prose-slate dark:prose-invert prose-amber max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-slate-900 dark:prose-h2:text-white prose-p:text-slate-650 dark:prose-p:text-slate-350 prose-p:leading-relaxed prose-li:text-slate-650 dark:prose-li:text-slate-350 prose-li:marker:text-amber-500">
                
                <section id="introduction" className="scroll-mt-28">
                  <h2>1. Introduction</h2>
                  <p>
                    Welcome to the Ejaz Bukhari Method (EBM) educational platform. We are committed to protecting the privacy and security of our students, parents, and educators. This Privacy Policy details the types of information we collect, how it is used, and the steps we take to ensure your personal and academic data remains strictly confidential.
                  </p>
                  <p>
                    Because our platform deals with minors and educational records, we adhere to strict standards compliant with global educational privacy regulations, including FERPA (Family Educational Rights and Privacy Act) and COPPA (Children's Online Privacy Protection Act) standards where applicable.
                  </p>
                </section>

                <section id="data-collection" className="scroll-mt-28">
                  <h2>2. Data Collection</h2>
                  <p>We collect information in the following categories to operate the EBM platform effectively:</p>
                  <ul>
                    <li><strong>Account & Registration Data:</strong> Names, email addresses, phone numbers, and encrypted passwords.</li>
                    <li><strong>Academic Metrics:</strong> Assessment scores, reading velocity, curriculum progression, and interaction logs with syllabus nodes.</li>
                    <li><strong>Biometric Integrity Data:</strong> We utilize localized, browser-based biometric checks (such as webcam presence verification) strictly for attendance logging. <em>Note: Biometric face maps are processed locally and are NEVER transmitted to or stored on our cloud servers.</em></li>
                    <li><strong>Device & Usage Data:</strong> IP addresses, browser types, and session duration to ensure platform stability and security.</li>
                  </ul>
                </section>

                <section id="ai-processing" className="scroll-mt-28">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl my-6 not-prose">
                    <h4 className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 mb-2">
                      <Lock className="w-5 h-5 text-amber-600 dark:text-amber-450" /> Secure AI Sandbox
                    </h4>
                    <p className="text-sm text-amber-800 dark:text-amber-350 leading-relaxed">
                      All Socratic dialogues initiated between students and the EBM AI Tutor (powered by Gemini) undergo strict pre-processing. Personal Identifiable Information (PII) is automatically redacted before prompts reach the LLM. 
                    </p>
                  </div>
                  <h2>3. AI Processing & Privacy</h2>
                  <p>
                    EBM heavily utilizes AI to generate personalized learning paths. The data sent to our AI engines consists solely of academic context (e.g., "Student struggled with algebra equation X"). We do not use your child's data to train generic foundational AI models. All AI endpoints operate within secure, enterprise-grade cloud environments.
                  </p>
                </section>

                <section id="data-usage" className="scroll-mt-28">
                  <h2>4. How We Use Data</h2>
                  <p>Your data is strictly utilized to:</p>
                  <ul>
                    <li>Personalize the student's daily learning roadmap and pacing.</li>
                    <li>Generate analytical dashboards for parental oversight.</li>
                    <li>Verify mandatory attendance for academic compliance.</li>
                    <li>Communicate essential administrative and academic updates.</li>
                  </ul>
                  <p>
                    <strong>We never sell, rent, or trade student data to third-party marketing or advertising agencies under any circumstances.</strong>
                  </p>
                </section>

                <section id="security" className="scroll-mt-28">
                  <h2>5. Data Security</h2>
                  <p>
                    We employ industry-standard cryptographic protocols (TLS 1.3) for data in transit and AES-256 encryption for data at rest. Access to backend databases is strictly role-based, restricted to authorized academic administrators, and subject to regular third-party security audits.
                  </p>
                </section>

                <section id="user-rights" className="scroll-mt-28">
                  <h2>6. Your Rights</h2>
                  <p>Parents and legal guardians maintain full ownership of their child's data. You have the right to:</p>
                  <ul>
                    <li>Access and export a complete digital ledger of the student's academic history.</li>
                    <li>Request corrections to administrative records.</li>
                    <li>Request full deletion of the account and associated records (subject to necessary compliance retention periods).</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact our Data Protection Officer via the Parent Portal settings or by emailing <strong>privacy@ebm.edu</strong>.
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
