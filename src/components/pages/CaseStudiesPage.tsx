import React, { useState } from "react";
import { 
  Play, 
  Video, 
  School, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Award, 
  Search, 
  Clock, 
  Quote, 
  X, 
  Sparkles, 
  Building2,
  ArrowRight,
  Filter
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  schoolName: string;
  speaker: string;
  speakerRole: string;
  category: "District-Wide" | "Elementary" | "Middle School" | "High School" | "STEM & AI" | "Special Ed";
  subject: string;
  videoDuration: string;
  thumbnail: string;
  videoUrl: string; // Embed or HTML5 video
  statNumber: string;
  statLabel: string;
  quote: string;
  summary: string;
  keyOutcomes: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "oakridge-math",
    title: "Oakridge Academy Achieves 35% Math Growth in One Academic Year",
    schoolName: "Oakridge Academy District",
    speaker: "Dr. Sarah Jenkins",
    speakerRole: "District Principal & Curriculum Director",
    category: "District-Wide",
    subject: "Mathematics & MAP Growth",
    videoDuration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "+35%",
    statLabel: "MAP® Math Growth",
    quote: "EBM transformed our entire district's math curriculum in less than two semesters with real-time diagnostic insights.",
    summary: "Faced with stagnant math proficiency scores, Oakridge Academy deployed EBM across 8 schools. Within 12 months, 82% of students met or exceeded their yearly growth targets.",
    keyOutcomes: [
      "82% of students exceeded targeted NWEA MAP growth goals",
      "Teacher prep time reduced by 4.5 hours per week",
      "100% adoption across K-8 math departments"
    ]
  },
  {
    id: "lincoln-reading",
    title: "Bridging the Reading & Language Gap for ELL Students",
    schoolName: "Lincoln Middle School",
    speaker: "Marcus Vance",
    speakerRole: "7th Grade ELA Lead Teacher",
    category: "Middle School",
    subject: "Reading & English Language Arts",
    videoDuration: "3:40",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "89%",
    statLabel: "Reading On-Grade Level",
    quote: "The adaptive diagnostic pinpointed exact reading bottlenecks for my ELL students before they fell behind.",
    summary: "Lincoln Middle School integrated EBM's multi-level reading modules to support English Language Learners, resulting in rapid vocabulary expansion and grade-level fluency.",
    keyOutcomes: [
      "89% of ELL students achieved grade-level reading fluency",
      "Interactive audio scaffolding increased daily reading stamina",
      "Parents received translated progress reports automatically"
    ]
  },
  {
    id: "st-jude-stem",
    title: "Pioneering AI Literacy & Robotics in High School STEM",
    schoolName: "St. Jude STEM Innovation Hub",
    speaker: "Elena Rostova",
    speakerRole: "Innovation & Technology Director",
    category: "STEM & AI",
    subject: "Computer Science & AI Literacy",
    videoDuration: "5:10",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "100%",
    statLabel: "AP Pass Rate",
    quote: "Our students built real AI models and coding projects using EBM's interactive tech modules.",
    summary: "St. Jude integrated EBM's AI & Digital Literacy path into their high school curriculum, inspiring students to publish original software projects and excel in national robotics competitions.",
    keyOutcomes: [
      "100% pass rate in AP Computer Science Principles",
      "45% increase in female enrollment in STEM electives",
      "Student projects featured at Regional Tech Showcase"
    ]
  },
  {
    id: "green-valley-elementary",
    title: "Differentiated Small Group Stations that Actually Work",
    schoolName: "Green Valley Primary School",
    speaker: "Patricia Alvarez",
    speakerRole: "3rd Grade Educator",
    category: "Elementary",
    subject: "Foundational Literacy & Numeracy",
    videoDuration: "3:12",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "2.4x",
    statLabel: "Yearly Learning Rate",
    quote: "Small group stations are now effortless. Every child receives tailored practice while I work with guided groups.",
    summary: "Green Valley implemented 20-minute daily EBM rotation stations, providing personalized skill practice to elementary students while teachers delivered targeted intervention.",
    keyOutcomes: [
      "Students progressed at 2.4x the national average growth rate",
      "Zero prep time needed for station differentiation",
      "Student engagement ratings climbed to 96%"
    ]
  },
  {
    id: "metro-district-recovery",
    title: "District-Wide Learning Recovery & Post-Pandemic Acceleration",
    schoolName: "Metro Unified District (22 Schools)",
    speaker: "Superintendent David Chen",
    speakerRole: "District Superintendent",
    category: "District-Wide",
    subject: "Systemic Learning Recovery",
    videoDuration: "6:05",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "14,000+",
    statLabel: "Active District Learners",
    quote: "EBM gave our 22 schools a unified, data-driven framework for rapid learning recovery and equitable growth.",
    summary: "Metro Unified implemented EBM across 14,000 students to recover lost instructional time. EBM's real-time dashboard provided school board members and principals with instant transparency.",
    keyOutcomes: [
      "14,000+ students actively logging daily progress",
      "Gap between highest and lowest performing schools narrowed by 40%",
      "Awarded State Educational Excellence Grant"
    ]
  },
  {
    id: "horizon-algebra",
    title: "Mastery-Based High School Algebra & Geometry Success",
    schoolName: "Horizon Charter Academy",
    speaker: "Rachel Thorne",
    speakerRole: "High School Math Dept Chair",
    category: "High School",
    subject: "Algebra I & Geometry",
    videoDuration: "4:30",
    thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "94%",
    statLabel: "Algebra Mastery Rate",
    quote: "Students take true ownership of their learning path. Math anxiety dropped significantly across freshman cohorts.",
    summary: "Horizon Charter shifted from rigid pacing to EBM's mastery-based progression in Algebra I. Students retook practice checkpoints until achieving 90%+ mastery.",
    keyOutcomes: [
      "94% of freshmen passed Algebra I on first attempt",
      "Substantial decrease in math remediation course requirements",
      "Student confidence self-ratings increased by 68%"
    ]
  },
  {
    id: "pinecrest-parents",
    title: "Empowering Parents as Co-Educators at Home",
    schoolName: "Pinecrest Elementary",
    speaker: "Maria Santos",
    speakerRole: "Family Engagement Liaison",
    category: "Elementary",
    subject: "Home & School Partnership",
    videoDuration: "3:55",
    thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "92%",
    statLabel: "Parent Portal Engagement",
    quote: "Parents receive clear weekly growth updates, turning home time into active, meaningful support.",
    summary: "Pinecrest leveraged EBM's Parent Feed to keep families informed of daily skill achievements, weekly goals, and home practice activities.",
    keyOutcomes: [
      "92% active monthly parent log-ins on mobile portal",
      "Parent-teacher conference satisfaction reached an all-time high of 98%",
      "Home practice completion rates tripled"
    ]
  },
  {
    id: "westlake-sat",
    title: "SAT/ACT Readiness & College Board Success",
    schoolName: "Westlake High School",
    speaker: "James O'Connor",
    speakerRole: "College & Guidance Director",
    category: "High School",
    subject: "SAT & College Readiness",
    videoDuration: "4:45",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "+180",
    statLabel: "Avg SAT Score Increase",
    quote: "EBM's targeted test prep gave our seniors the score boost needed to qualify for merit scholarships.",
    summary: "Westlake High embedded EBM test prep modules into junior year advisory periods. Personalized skill recommendations helped students eliminate targeted weak spots.",
    keyOutcomes: [
      "Average SAT score gain of 180 points per student",
      "$1.2M in total college merit scholarships awarded to graduating class",
      "88% of seniors accepted to 1st-choice universities"
    ]
  },
  {
    id: "summit-life-skills",
    title: "Embedding Financial Literacy & Life Skills in Middle School",
    schoolName: "Summit Leadership Academy",
    speaker: "Amanda Brooks",
    speakerRole: "Life Skills & EQ Coordinator",
    category: "Middle School",
    subject: "Financial Literacy & Character",
    videoDuration: "3:25",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "1,200+",
    statLabel: "Life Skill Badges Earned",
    quote: "EBM's practical life skills curriculum equips students with real-world financial independence and ethics.",
    summary: "Summit Academy introduced EBM's financial literacy and EQ badges. Students learned budgeting, responsible decision making, and teamwork in interactive simulations.",
    keyOutcomes: [
      "100% of 8th graders completed Financial Foundations certificate",
      "Behavioral discipline referrals dropped by 38%",
      "Voted #1 favorite elective by student body"
    ]
  },
  {
    id: "beacon-special-ed",
    title: "Inclusive Learning & IEP Goal Mastery",
    schoolName: "Beacon Special Education Center",
    speaker: "Dr. Robert Taylor",
    speakerRole: "Special Education Specialist",
    category: "Special Ed",
    subject: "Inclusive & Adaptive Pathways",
    videoDuration: "5:00",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    statNumber: "100%",
    statLabel: "IEP Goal Tracking",
    quote: "The granular skill breakdown allows every child with unique learning needs to celebrate micro-wins every single day.",
    summary: "Beacon Center customized EBM's adaptive interface for neurodivergent learners, enabling real-time IEP goal tracking and self-paced progress.",
    keyOutcomes: [
      "100% automated tracking for IEP goal documentation",
      "Customizable visual contrast and text-to-speech tools",
      "Significantly improved student independence"
    ]
  }
];

const CATEGORIES = ["All", "District-Wide", "Elementary", "Middle School", "High School", "STEM & AI", "Special Ed"];

export function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<CaseStudy | null>(null);

  const filteredStudies = CASE_STUDIES.filter((study) => {
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory;
    const matchesSearch = 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-sky-200">
            <Video className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>Success Stories & Video Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            See How Educators & Schools Succeed with EBM
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real stories, real classrooms, and proven outcomes. Watch video interviews with district leaders, principals, and teachers who transformed learning with Evidence-Based Methodologies.
          </p>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-sky-400">+35%</div>
              <div className="text-xs text-slate-300 mt-1">Average Growth Gain</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">10 Videos</div>
              <div className="text-xs text-slate-300 mt-1">In-Depth Case Studies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">14,000+</div>
              <div className="text-xs text-slate-300 mt-1">District Students Covered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">98%</div>
              <div className="text-xs text-slate-300 mt-1">Teacher Approval Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search school, teacher, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-800"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 hidden lg:block mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <main className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-600" />
            <span>Featured Case Studies ({filteredStudies.length})</span>
          </h2>
          {searchQuery || selectedCategory !== "All" ? (
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div 
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveVideo(study)}>
                <img 
                  src={study.thumbnail} 
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>{study.videoDuration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-sky-600/90 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                  {study.category}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-sky-500 transition-all duration-300 border-2 border-white/50 backdrop-blur-xs">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sky-600">
                    <School className="w-4 h-4" />
                    <span>{study.schoolName}</span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg leading-snug group-hover:text-sky-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {study.summary}
                  </p>
                </div>

                {/* Impact Stat Banner */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-sky-600 leading-none">{study.statNumber}</div>
                    <div className="text-[11px] font-medium text-slate-600 mt-0.5">{study.statLabel}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">{study.speaker}</div>
                    <div className="text-[10px] text-slate-500">{study.speakerRole}</div>
                  </div>
                </div>

                {/* Quote Snippet */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 relative">
                  <Quote className="w-4 h-4 text-sky-300 absolute top-2 left-2 opacity-50" />
                  <p className="text-[11px] text-slate-700 italic pl-5 leading-relaxed">
                    "{study.quote}"
                  </p>
                </div>

                {/* Watch Video Button */}
                <button
                  onClick={() => setActiveVideo(study)}
                  className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer group/btn"
                >
                  <Play className="w-4 h-4 fill-current text-sky-400 group-hover/btn:text-white" />
                  <span>Watch Case Study ({study.videoDuration})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <div className="aspect-video bg-black relative">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 space-y-4 max-h-[40vh] overflow-y-auto">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                    {activeVideo.category} • {activeVideo.subject}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                    {activeVideo.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Featuring <strong>{activeVideo.speaker}</strong> ({activeVideo.speakerRole}) — {activeVideo.schoolName}
                  </div>
                </div>

                <div className="text-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 shrink-0">
                  <div className="text-2xl font-black text-emerald-600 leading-none">{activeVideo.statNumber}</div>
                  <div className="text-[10px] font-semibold text-emerald-800 mt-1">{activeVideo.statLabel}</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Outcomes:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeVideo.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
