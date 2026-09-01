import React, { useState } from "react";
import { Mail, Phone, Globe, Send, HelpCircle, ChevronDown, MessageSquare, Sparkles } from "lucide-react";
import { SEOHead } from "../SEOHead";
import { useInquiryStore } from "../../services/inquiries.store";
const contactHeroBg = "/contact-hero-bg-opt.webp";

export const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [parentName, setParentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const addInquiry = useInquiryStore((state) => state.addInquiry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !email.trim() || !message.trim()) return;

    addInquiry({
      parentName,
      studentGrade,
      email,
      phone,
      message,
    });

    setSubmitted(true);
    setParentName("");
    setStudentGrade("");
    setEmail("");
    setPhone("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 6000);
  };

  const faqs = [
    {
      question: "How do I enroll my child in the EBM platform?",
      answer: "Enrollment begins with a diagnostic consultation. Once we assess the student's baseline reading velocity and logical comprehension, we deploy their customized 3-year roadmap."
    },
    {
      question: "Is the platform strictly online?",
      answer: "Yes, EBM is a fully digital learning ecosystem. It combines self-paced AI-guided modules with live-streamed milestone assessments and parent-teacher virtual synopses."
    },
    {
      question: "What technical equipment is required?",
      answer: "A standard laptop or desktop with a reliable internet connection, a webcam for biometric attendance verification, and a modern browser (Chrome, Safari, or Edge) are required."
    },
    {
      question: "How do parents track progress?",
      answer: "Parents receive a dedicated 'Parent Portal' credential. This provides real-time access to daily streak metrics, AI session logs, syllabus progression, and automated weekly digests."
    }
  ];

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <SEOHead 
        title="Contact EBM | Admissions, Consultations & Support"
        description="Get in touch with the EBM team for admissions inquiries, diagnostic scheduling, academic consultations, and technical support."
        canonicalUrl="https://ejazbukharimethod.com/contact"
      />
      {/* Header with Background Image & Light Overlay */}
      <header className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-sky-100 shadow-sm">
        {/* Background Image */}
        <img
          src={contactHeroBg}
          alt="Contact & Admissions Background"
          width="1200"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0076a5] mx-auto shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>EBM Admissions & Support Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-slate-900">
            Contact & Admissions
          </h1>
          <p className="text-slate-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to accelerate your educational journey? Our academic advisors are available to answer your questions and guide you through the EBM integration process.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Info Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Get in Touch</h3>
                
                <address className="not-italic space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 p-3 rounded-2xl shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Phone Consultation</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-2">Mon-Fri from 9am to 6pm EST</p>
                      <a href="tel:+923334541572" className="inline-flex items-center min-h-[44px] py-1 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition">+92 333 4541572</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 p-3 rounded-2xl shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Email Direct</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-2">Our team responds within 24 hours</p>
                      <a href="mailto:syedejazbukari@gmail.com" className="inline-flex items-center min-h-[44px] py-1 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition">syedejazbukari@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl shrink-0">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Online Academy</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">100% Virtual & Remote Campus<br />Accessible Worldwide</p>
                    </div>
                  </div>
                </address>


              </div>
            </aside>

            {/* Form Area */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Send an Inquiry</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Fill out the form below and an admissions director will contact you.</p>
                </div>
                
                {submitted ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-2xl p-12 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Inquiry Received Successfully</h3>
                    <p className="text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                      Thank you for your interest in the Ejaz Bukhari Method. A confirmation email has been sent, and our team will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Parent/Guardian Name</label>
                        <input required type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Jane Doe" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Student Age / Target Grade</label>
                        <input required type="text" value={studentGrade} onChange={(e) => setStudentGrade(e.target.value)} placeholder="e.g. 12 years / Grade 6" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Phone Number</label>
                        <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 333 4541572" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">How can we help?</label>
                      <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about the student's current academic standing and goals..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none"></textarea>
                    </div>
                    
                    <button type="submit" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-850 dark:border-slate-700 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md">
                      <Send className="w-5 h-5" /> Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-full mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-200 ${openFaq === index ? "border-amber-500 dark:border-amber-500 bg-amber-50/30 dark:bg-amber-950/10" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white pr-4">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${openFaq === index ? "rotate-180 text-amber-600 dark:text-amber-400" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
