import React from "react";
import { Brain, BookOpen, Users, Heart, Coins, Cpu, MessageSquare, Compass, ShieldCheck, Briefcase } from "lucide-react";

export const SKILL_PLAN_CARDS = [
  {
    id: "thinking_intelligence",
    title: "Thinking & Intelligence",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Brain className="w-5 h-5 text-white animate-pulse" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Cognitive
        </span>
      </div>
    )
  },
  {
    id: "academic_foundation",
    title: "Academic Foundation",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Core Prep
        </span>
      </div>
    )
  },
  {
    id: "social_skills",
    title: "Social Skills",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -right-2 -top-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Users className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Teamwork
        </span>
      </div>
    )
  },
  {
    id: "emotional_intelligence",
    title: "Emotional Intelligence",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-rose-500 via-pink-600 to-red-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -left-2 -top-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          EQ Mastery
        </span>
      </div>
    )
  },
  {
    id: "financial_literacy",
    title: "Financial Literacy",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Coins className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Wealth & Money
        </span>
      </div>
    )
  },
  {
    id: "digital_ai_literacy",
    title: "Digital & AI Literacy",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          AI & Tech
        </span>
      </div>
    )
  },
  {
    id: "communication",
    title: "Communication",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -right-2 -top-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Expression
        </span>
      </div>
    )
  },
  {
    id: "life_skills",
    title: "Life Skills",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -left-2 -top-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Autonomy
        </span>
      </div>
    )
  },
  {
    id: "character_ethics",
    title: "Character & Ethics",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-700 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Integrity
        </span>
      </div>
    )
  },
  {
    id: "career_entrepreneurship",
    title: "Career & Entrepreneurship",
    icon: (
      <div className="w-full h-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-800 rounded-xl p-2 flex flex-col items-center justify-between text-white shadow-md relative overflow-hidden group">
        <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full blur-xs" />
        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mt-1 border border-white/30 shadow-2xs">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/25">
          Leadership
        </span>
      </div>
    )
  }
];

export const GRADES_DATA = [
  {
    id: "1",
    badge: "1",
    title: "First Grade",
    borderColor: "border-[#2e7d32]",
    badgeBg: "bg-[#2e7d32]",
    titleColor: "text-[#1b5e20]",
    description: "Adding and subtracting, tens and ones, short and long vowel words, phonics, reading foundations, and more.",
    subjects: [
      { name: "Math", skills: "357 skills", videos: "347 videos", tag: "Foundations" },
      { name: "English", skills: "228 skills", videos: "129 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "2",
    badge: "2",
    title: "Second Grade",
    borderColor: "border-[#d84315]",
    badgeBg: "bg-[#d84315]",
    titleColor: "text-[#bf360c]",
    description: "Place-value models, contractions, irregular plurals, reading comprehension, arithmetic fluency, and more.",
    subjects: [
      { name: "Math", skills: "354 skills", videos: "339 videos", tag: "Arithmetic" },
      { name: "English", skills: "270 skills", videos: "139 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "3",
    badge: "3",
    title: "Third Grade",
    borderColor: "border-[#0288d1]",
    badgeBg: "bg-[#0288d1]",
    titleColor: "text-[#01579b]",
    description: "Multiplying and dividing, bar graphs, grammar, pronouns, reading analysis, mental math, and more.",
    subjects: [
      { name: "Math", skills: "413 skills", videos: "365 videos", tag: "Multiplication" },
      { name: "English", skills: "251 skills", videos: "124 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "4",
    badge: "4",
    title: "Fourth Grade",
    borderColor: "border-[#7b1fa2]",
    badgeBg: "bg-[#7b1fa2]",
    titleColor: "text-[#6a1b9a]",
    description: "Fractions and decimals, synonyms and antonyms, multi-step problem solving, paragraph composition, and more.",
    subjects: [
      { name: "Math", skills: "401 skills", videos: "390 videos", tag: "Fractions" },
      { name: "English", skills: "260 skills", videos: "109 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "5",
    badge: "5",
    title: "Fifth Grade",
    borderColor: "border-[#00796b]",
    badgeBg: "bg-[#00796b]",
    titleColor: "text-[#005a4e]",
    description: "Multiplying fractions and decimals, idioms, prepositions, geometry, advanced vocabulary, and more.",
    subjects: [
      { name: "Math", skills: "392 skills", videos: "389 videos", tag: "Decimals" },
      { name: "English", skills: "224 skills", videos: "98 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "6",
    badge: "6",
    title: "Sixth Grade",
    borderColor: "border-[#c2410c]",
    badgeBg: "bg-[#c2410c]",
    titleColor: "text-[#b43403]",
    description: "Ratios and percentages, variable expressions, reading analysis, grammar mastery, and more.",
    subjects: [
      { name: "Math", skills: "393 skills", videos: "375 videos", tag: "Pre-Algebra" },
      { name: "English", skills: "204 skills", videos: "88 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "7",
    badge: "7",
    title: "Seventh Grade",
    borderColor: "border-[#2e7d32]",
    badgeBg: "bg-[#2e7d32]",
    titleColor: "text-[#1b5e20]",
    description: "Proportional relationships, rational numbers, phrases and clauses, analytical writing, algebra, and more.",
    subjects: [
      { name: "Math", skills: "366 skills", videos: "348 videos", tag: "Algebra" },
      { name: "English", skills: "193 skills", videos: "87 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "8",
    badge: "8",
    title: "Eighth Grade",
    borderColor: "border-[#b45309]",
    badgeBg: "bg-[#b45309]",
    titleColor: "text-[#92400e]",
    description: "Linear functions, the Pythagorean theorem, active and passive voice, essay development, and foundational Cambridge prep.",
    subjects: [
      { name: "Math", skills: "371 skills", videos: "334 videos", tag: "Functions" },
      { name: "English", skills: "197 skills", videos: "87 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "olevel",
    badge: "O",
    title: "O Levels (IGCSE)",
    borderColor: "border-[#ad1457]",
    badgeBg: "bg-[#ad1457]",
    titleColor: "text-[#880e4f]",
    description: "Cambridge & Edexcel O Level / IGCSE core curriculum: Mathematics, Statistics, English Language, Literature, and Comprehension.",
    subjects: [
      { name: "O Level Mathematics (4024 / 0580)", skills: "420 skills", videos: "310 videos", tag: "Cambridge" },
      { name: "O Level English Language & Literature", skills: "195 skills", videos: "140 videos", tag: "Comprehension" },
    ],
  },
  {
    id: "alevel",
    badge: "A",
    title: "A Levels (AS & A2)",
    borderColor: "border-[#1565c0]",
    badgeBg: "bg-[#1565c0]",
    titleColor: "text-[#0d47a1]",
    description: "Advanced Level AS & A2 preparation: Pure Mathematics, Mechanics, Statistics, and English Academic Writing.",
    subjects: [
      { name: "A Level Pure Mathematics & Mechanics (9709)", skills: "380 skills", videos: "290 videos", tag: "Calculus" },
      { name: "A Level English & General Paper", skills: "145 skills", videos: "95 videos", tag: "Comprehension" },
    ],
  },
];
