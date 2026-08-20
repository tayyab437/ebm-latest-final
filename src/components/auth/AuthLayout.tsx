import React from "react";
import { BookOpen, Target, Compass, BarChart3 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToHome?: () => void;
  onNavigateRegister?: () => void;
  onNavigateLogin?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function AuthLayout({
  children,
  onNavigateRegister,
  onNavigateTab,
}: AuthLayoutProps) {
  return (
    <div
      id="auth-layout"
      className="w-full bg-white text-[#4b4b4b] font-sans antialiased flex flex-col justify-between"
    >
      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-grow">
        {/* HERO SECTION WITH BACKGROUND GRADIENT & BOTTOM CURVE */}
        <section className="relative bg-[linear-gradient(to_bottom,#c2e9fb_0%,#e0f2fe_50%,#00a3e0_100%)] w-full overflow-hidden flex flex-col items-center justify-center pt-10 pb-16 [border-radius:0_0_50%_50%_/_0_0_40px_40px]">
          {/* Background Decorative SVG Graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center overflow-hidden">
            <svg
              className="w-full h-full min-w-[1200px]"
              viewBox="0 0 1200 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sun & Rays */}
              <circle cx="300" cy="120" r="45" fill="#FCD34D" opacity="0.8" />
              <g stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" opacity="0.6">
                <line x1="300" y1="55" x2="300" y2="35" />
                <line x1="300" y1="185" x2="300" y2="205" />
                <line x1="235" y1="120" x2="215" y2="120" />
                <line x1="365" y1="120" x2="385" y2="120" />
                <line x1="254" y1="74" x2="240" y2="60" />
                <line x1="346" y1="166" x2="360" y2="180" />
                <line x1="254" y1="166" x2="240" y2="180" />
                <line x1="346" y1="74" x2="360" y2="60" />
              </g>

              {/* Clouds */}
              <path
                d="M150 180 C150 160, 180 150, 200 165 C215 150, 250 150, 260 170 C280 170, 290 190, 275 205 C275 220, 150 220, 150 180 Z"
                fill="white"
                opacity="0.85"
              />
              <path
                d="M900 120 C900 100, 930 90, 950 105 C965 90, 1000 90, 1010 110 C1030 110, 1040 130, 1025 145 C1025 160, 900 160, 900 120 Z"
                fill="white"
                opacity="0.8"
              />

              {/* Hot Air Balloon */}
              <g transform="translate(180, 220)">
                <ellipse cx="30" cy="30" rx="25" ry="32" fill="#00AEEF" />
                <path d="M15 30 Q30 50 45 30 Q30 10 15 30 Z" fill="#F59E0B" opacity="0.8" />
                <rect x="25" y="68" width="10" height="10" rx="2" fill="#B45309" />
                <line x1="22" y1="62" x2="26" y2="68" stroke="#374151" strokeWidth="1" />
                <line x1="38" y1="62" x2="34" y2="68" stroke="#374151" strokeWidth="1" />
              </g>

              {/* Ferris Wheel Silhouette */}
              <g transform="translate(80, 280)" stroke="#0284C7" strokeWidth="2.5" fill="none" opacity="0.6">
                <circle cx="60" cy="60" r="50" />
                <line x1="60" y1="10" x2="60" y2="110" />
                <line x1="10" y1="60" x2="110" y2="60" />
                <line x1="25" y1="25" x2="95" y2="95" />
                <line x1="25" y1="95" x2="95" y2="25" />
                <line x1="60" y1="60" x2="35" y2="140" />
                <line x1="60" y1="60" x2="85" y2="140" />
              </g>

              {/* Rolling Blue Hills Background */}
              <path
                d="M-50 420 Q200 320 450 400 T950 360 Q1100 340 1250 410 L1250 500 L-50 500 Z"
                fill="#00A3E0"
                opacity="0.3"
              />
              <path
                d="M-50 450 Q300 370 600 440 T1250 430 L1250 500 L-50 500 Z"
                fill="#0084B4"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Centered Auth Card Area */}
          <div className="relative z-10 w-full max-w-md mx-4 flex flex-col">
            {children}
          </div>
        </section>

        {/* ================= FEATURE SECTION ================= */}
        <section className="py-16 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl text-[#00a3e0] font-serif mb-3">
            Not a member yet?
          </h2>
          <p className="text-lg text-gray-600 mb-12 font-serif">
            Experience personalized learning with EBM!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 text-left">
            {/* Feature 1 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center bg-sky-50 border-2 border-sky-100 text-[#00a3e0]">
                <BookOpen className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl text-[#00a3e0] mb-2 font-semibold">
                  Comprehensive Grade 1 to O/A Levels Curriculum
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  More than 20,000 adaptive skills designed to support and challenge every learner.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center bg-cyan-50 border-2 border-cyan-100 text-[#0084b4]">
                <Target className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl text-[#0084b4] mb-2 font-semibold">
                  Real-Time Diagnostic
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Up-to-date, accurate assessment of students' knowledge levels in math and language arts.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center bg-purple-50 border-2 border-purple-100 text-purple-600">
                <Compass className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl text-purple-600 mb-2 font-semibold">
                  Personalized Guidance
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Targeted skill recommendations help address learning gaps and accelerate growth.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center bg-orange-50 border-2 border-orange-100 text-orange-500">
                <BarChart3 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl text-orange-500 mb-2 font-semibold">
                  Actionable Analytics
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Easy-to-use reports provide real-time insight into student progress.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl text-gray-500 font-serif mb-8">
              Plus, celebrate success with fun awards, and much more!
            </p>
            <button
              onClick={() => onNavigateRegister?.()}
              className="inline-block bg-[#00a3e0] hover:bg-[#008cc0] text-white font-bold py-3 px-12 rounded text-lg transition-colors shadow cursor-pointer"
            >
              Join EBM today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
