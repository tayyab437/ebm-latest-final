/**
 * Semantic Server-Side Pre-Rendering for AI Crawlers, LLMs, and Search Engines
 * Domain: https://ejazbukharimethod.com
 *
 * Fully synchronous, non-blocking, zero-layout-shift SSR template generator.
 * Perfectly mirrors the displayed version of all pages without physical address conflicts.
 */

import { ROUTE_REGISTRY, ASSESSMENT_VISIBLE_FAQS } from "../services/seo.schema.js";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getPreRenderedHtml(reqPath: string, blogPostPayload?: any): string {
  const cleanPath = reqPath.split("?")[0].replace(/\/+$/, "") || "/";
  const routeMeta = ROUTE_REGISTRY[cleanPath] || {
    title: "EBM: A Personalized Learning Platform for Every Student",
    description: "EBM combines structured learning, personalized guidance, and AI-enhanced tools to help students build strong academic foundations and progress with confidence.",
    canonicalUrl: `https://ejazbukharimethod.com${cleanPath}`,
    breadcrumbName: "Home"
  };

  // 1. Single Blog Post View
  if (cleanPath.startsWith("/blog/") && blogPostPayload) {
    const post = blogPostPayload;
    const cleanContent = post.content || post.excerpt || "";
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-article">
      <article>
        <header class="ebm-article-header">
          <p class="ebm-article-category">${escapeHtml(post.category || "Educational Insights")}</p>
          <h1 class="ebm-article-title">${escapeHtml(post.title)}</h1>
          <div class="ebm-article-meta">
            <span>By <strong>${escapeHtml(post.authorName || "Syed Ejaz Bukhari")}</strong></span>
            <span>Published on <strong>${escapeHtml(post.publishedAt || post.createdAt || "Recent")}</strong></span>
            <span>Category: <strong>${escapeHtml(post.category || "Personalized Learning")}</strong></span>
          </div>
        </header>

        ${post.excerpt ? `<p class="ebm-article-excerpt">${escapeHtml(post.excerpt)}</p>` : ""}

        <div class="ebm-article-body">
          ${cleanContent}
        </div>

        <footer class="ebm-article-footer">
          <div class="ebm-author-card">
            <div class="ebm-author-avatar">EB</div>
            <div>
              <h3 class="ebm-author-name">About the Author: Syed Ejaz Bukhari</h3>
              <p class="ebm-author-bio">Founder &amp; Director of Pedagogy of the Ejaz Bukhari Method. Syed Ejaz Bukhari has pioneered diagnostic learning models and conceptual mathematics frameworks for students from Grade 1 through Cambridge O/A Levels for over 25 years.</p>
            </div>
          </div>
          <p class="ebm-article-back-link">
            <a href="/blog">&larr; Back to all educational articles and guides</a>
          </p>
        </footer>
      </article>
    </main>
    ${renderFooter()}
    `;
  }

  // 2. Blog Index Page
  if (cleanPath === "/blog" || cleanPath.startsWith("/blog/category")) {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Educational Research &amp; Insights Blog</h1>
        <p class="ebm-lead-sub">
          Pedagogical analyses, cognitive learning strategies, Cambridge syllabus breakdowns, and exam preparation frameworks authored by educational experts.
        </p>
      </section>

      <section class="ebm-metrics-grid">
        <article class="ebm-curriculum-card">
          <span class="ebm-case-study-tag">Personalized Learning</span>
          <h2 class="ebm-curriculum-title">How Diagnostic Testing Unlocks Hidden Student Potential</h2>
          <p class="ebm-curriculum-desc">Standardized tests measure performance retrospectively. Adaptive diagnostic evaluation identifies the root conceptual misunderstandings in real time.</p>
        </article>
        <article class="ebm-curriculum-card">
          <span class="ebm-case-study-tag">Cambridge O &amp; A Levels</span>
          <h2 class="ebm-curriculum-title">Mastering Cambridge Mathematics: Pure Math &amp; Mechanics Guide</h2>
          <p class="ebm-curriculum-desc">A structured breakdown of Cambridge CAIE 9709 and 4024 exam questions, command words, marking schemes, and past paper derivation techniques.</p>
        </article>
        <article class="ebm-curriculum-card">
          <span class="ebm-case-study-tag">Parenting &amp; Guidance</span>
          <h2 class="ebm-curriculum-title">Overcoming Math Anxiety in Middle School Learners</h2>
          <p class="ebm-curriculum-desc">Proven methods to build mathematical intuition, celebrate small problem-solving milestones, and foster a lifelong growth mindset.</p>
        </article>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 3. About Us Page
  if (cleanPath === "/about") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">About the Ejaz Bukhari Method &amp; Syed Ejaz Bukhari</h1>
        <p class="ebm-page-lead">
          The Ejaz Bukhari Method (EBM) is a transformative academic pedagogy founded on personalized diagnostic evaluations, concept mastery, and cognitive acceleration for learners from Grade 1 through Cambridge O/A Levels.
        </p>
      </section>

      <section class="ebm-card-feature">
        <h2 class="ebm-card-feature-title">Our Educational Philosophy: Beyond Rote Memorization</h2>
        <p class="ebm-curriculum-desc">Traditional classrooms operate under a standardized one-size-fits-all model that inevitably leaves learning gaps unaddressed. EBM replaces passive rote memorization with Socratic inquiry, analytical deduction, and granular mastery checkpoints. Each student is evaluated as an individual learner with unique cognitive strengths, learning velocity, and targeted growth areas.</p>
      </section>

      <section class="ebm-curricula-sec">
        <h2 class="ebm-section-h2">Key Pedagogical Principles</h2>
        <ul class="ebm-article-body">
          <li><strong>Granular Diagnostic Baseline:</strong> Every student begins with an adaptive diagnostic evaluation pinpointing their exact conceptual boundaries across mathematics and comprehension.</li>
          <li><strong>Personalized Learning Trajectories:</strong> Curriculum pacing is customized to the learner's cognitive velocity rather than arbitrary calendar schedules.</li>
          <li><strong>Conceptual Derivation Over Formula Memorization:</strong> Students understand why mathematical principles hold true, building durable problem-solving intuition.</li>
          <li><strong>Continuous Real-Time Feedback:</strong> Parents and teachers receive transparent mastery reports tracking progress against international Cambridge standards.</li>
        </ul>
      </section>

      <section class="ebm-card-callout">
        <h3 class="ebm-card-callout-title">Over 25 Years of Proven Academic Excellence</h3>
        <p class="ebm-card-callout-desc">With over 10,000 students accelerated, a 98% grade turnaround rate, and dozens of Cambridge O/A Level high-achiever distinctions, the Ejaz Bukhari Method stands as a proven benchmark in personalized education globally.</p>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 4. Assessment Page
  if (cleanPath === "/assessment") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Diagnostic Assessment Platform</h1>
        <p class="ebm-page-lead">
          Adaptive academic diagnostic evaluations designed to measure core foundational mastery in Mathematics and English Comprehension from Grade 1 through Cambridge O/A Levels.
        </p>
      </section>

      <section class="ebm-curricula-sec">
        <h2 class="ebm-section-h2">Frequently Asked Questions About the EBM Diagnostic Assessment</h2>
        <div class="ebm-faq-list">
          ${ASSESSMENT_VISIBLE_FAQS.map(
            (faq) => `
          <div class="ebm-faq-item">
            <h3 class="ebm-faq-dt">${escapeHtml(faq.question)}</h3>
            <p class="ebm-faq-dd">${escapeHtml(faq.answer)}</p>
          </div>`
          ).join("")}
        </div>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 5. Case Studies Page
  if (cleanPath === "/case-studies" || cleanPath === "/casestudies") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Case Studies: Student Turnarounds &amp; Academic Distinctions</h1>
        <p class="ebm-page-lead">
          Real academic transformations documenting how students overcome cognitive bottlenecks, achieve Cambridge distinctions, and master foundational concepts with the Ejaz Bukhari Method.
        </p>
      </section>

      <section class="ebm-case-study-grid">
        <article class="ebm-case-study-card">
          <span class="ebm-case-study-tag">Cambridge O Level Mathematics</span>
          <h2 class="ebm-case-study-title">From Grade D to Cambridge A* Distinction in 5 Months</h2>
          <p class="ebm-case-study-p">A high school student entered with acute gaps in algebraic manipulation and coordinate geometry. Through EBM's diagnostic assessment, specific cognitive bottlenecks were identified and remediated using targeted derivation exercises and weekly past-paper analysis. The student achieved an A* distinction in Cambridge O Level Mathematics 4024.</p>
        </article>

        <article class="ebm-case-study-card">
          <span class="ebm-case-study-tag">Primary to Middle School Transition</span>
          <h2 class="ebm-case-study-title">Overcoming Math Anxiety &amp; Building Intuition in Grade 6</h2>
          <p class="ebm-case-study-p">By replacing mechanical memorization with visual fraction models, deductive geometry puzzles, and Socratic questioning, a Grade 6 learner shifted from math anxiety to scoring in the 99th percentile on standardized regional assessments.</p>
        </article>

        <article class="ebm-case-study-card">
          <span class="ebm-case-study-tag">Cambridge A Level STEM</span>
          <h2 class="ebm-case-study-title">Mastering Pure Mathematics &amp; Mechanics (9709)</h2>
          <p class="ebm-case-study-p">An A Level student aiming for engineering admissions mastered complex integration, vectors, and differential equations through individualized tutoring sessions led by Syed Ejaz Bukhari, securing top grades and engineering university scholarships.</p>
        </article>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 6. Learning & Programs Portal Page
  if (cleanPath === "/learning" || cleanPath === "/programs" || cleanPath === "/curriculum") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Interactive Learning Modules &amp; Academic Programs</h1>
        <p class="ebm-page-lead">
          Structured instructional modules, derivation walk-throughs, and interactive problem sets calibrated to individual mastery velocity from Grade 1 to Cambridge O/A Levels.
        </p>
      </section>

      <section class="ebm-curricula-grid">
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Primary Foundation (Grades 1–5)</h2>
          <p class="ebm-curriculum-desc">Core numeracy, early mathematical logic, arithmetic fluency, and foundational English comprehension.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Middle School Mastery (Grades 6–8)</h2>
          <p class="ebm-curriculum-desc">Pre-algebra, fractions, spatial geometry, data interpretation, and analytical reading strategies.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Cambridge O Level &amp; IGCSE (Grades 9–11)</h2>
          <p class="ebm-curriculum-desc">Complete syllabus mastery for Mathematics (4024/0580), Add Math (4037/0606), Physics, Chemistry, and past paper drills.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Cambridge A Level (Grades 12–13)</h2>
          <p class="ebm-curriculum-desc">Advanced Pure Mathematics (P1/P3), Mechanics (M1), Statistics (S1), Physics, and university entrance prep.</p>
        </div>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 7. Analytics Page
  if (cleanPath === "/analytics") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Real-Time Student Mastery &amp; Cognitive Velocity Analytics</h1>
        <p class="ebm-page-lead">
          Transparent performance dashboards providing parents, teachers, and school leaders with real-time insight into syllabus completion, retention rates, and Cambridge readiness scores.
        </p>
      </section>

      <section class="ebm-curricula-grid">
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Topic-by-Topic Mastery Index</h2>
          <p class="ebm-curriculum-desc">Tracks mastery percentages across algebra, calculus, mechanics, geometry, and comprehension.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Cognitive Learning Velocity</h2>
          <p class="ebm-curriculum-desc">Measures problem-solving speed, accuracy curves, and conceptual retention over 30, 60, and 90-day intervals.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Cambridge Exam Readiness Forecast</h2>
          <p class="ebm-curriculum-desc">Predictive diagnostic scoring calibrated against historical Cambridge CAIE threshold grade boundaries.</p>
        </div>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 8. Inspiration & Resources Page
  if (cleanPath === "/inspiration") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-narrow">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">EBM Inspiration: Educator Toolkits &amp; Teaching Excellence</h1>
        <p class="ebm-page-lead">
          Pedagogical resources, teaching strategies, and cognitive frameworks curated for educators dedicated to personalized student acceleration.
        </p>
      </section>

      <section class="ebm-curricula-grid">
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Socratic Inquiry Models</h2>
          <p class="ebm-curriculum-desc">Frameworks for guiding students to deduce mathematical principles through targeted questioning.</p>
        </div>
        <div class="ebm-curriculum-card">
          <h2 class="ebm-curriculum-title">Cognitive Remediation Protocols</h2>
          <p class="ebm-curriculum-desc">Actionable playbooks for quickly bridging persistent grade gaps in middle and high school learners.</p>
        </div>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 9. Contact Us Page
  if (cleanPath === "/contact") {
    return `
    ${renderHeader()}
    <main id="main-content" class="ebm-ssr-main-article">
      <section class="ebm-hero-sec">
        <h1 class="ebm-page-h1">Contact &amp; Admissions</h1>
        <p class="ebm-page-lead">
          Ready to accelerate your educational journey? Our academic advisors are available to answer your questions and guide you through the EBM integration process.
        </p>
      </section>

      <section class="ebm-info-box">
        <h2 class="ebm-info-title">Get in Touch</h2>
        
        <div class="ebm-info-row">
          <strong>Phone Consultation:</strong> Mon-Fri from 9am to 6pm EST &bull; <a href="tel:+923334541572">+92 333 4541572</a>
        </div>
        
        <div class="ebm-info-row">
          <strong>Email Direct:</strong> Our team responds within 24 hours &bull; <a href="mailto:syedejazbukari@gmail.com">syedejazbukari@gmail.com</a>
        </div>
        
        <div class="ebm-info-row">
          <strong>Online Academy:</strong> 100% Virtual &amp; Remote Campus (Accessible Worldwide)
        </div>

        <div class="ebm-info-row">
          <strong>Official Web Portal:</strong> <a href="https://ejazbukharimethod.com">https://ejazbukharimethod.com</a>
        </div>
      </section>

      <section class="ebm-curricula-sec">
        <h2 class="ebm-section-h2">Send an Inquiry</h2>
        <p class="ebm-pillar-desc">Fill out our online inquiry form or schedule an initial diagnostic consultation for your child.</p>
      </section>
    </main>
    ${renderFooter()}
    `;
  }

  // 10. Default Homepage: Complete Rich Semantic Structure matching EBMHomepage.tsx verbatim
  return `
  ${renderHeader()}
  <main id="main-content" class="ebm-ssr-main">
    <!-- ================= HERO BANNER ================= -->
    <section aria-labelledby="ebm-hero-title" class="ebm-hero-sec">
      <h1 id="ebm-hero-title" class="ebm-hero-h1">
        EBM: A Personalized Learning Platform for Every Student
      </h1>
      <p id="ebm-hero-subtitle" class="ebm-hero-p">
        EBM combines structured learning, personalized guidance, and AI-enhanced tools to help students build strong academic foundations and progress with confidence.
      </p>

      <!-- Three Core Pillars Clouds -->
      <div class="ebm-metrics-grid">
        <div class="ebm-metric-card">
          <h2 class="ebm-pillar-title">Learning Support from Grade 1 to O/A Levels</h2>
          <p class="ebm-curriculum-tag">Mathematics &bull; English</p>
          <p class="ebm-pillar-desc">Comprehensive curriculum coverage with structured learning checkpoints.</p>
        </div>
        <div class="ebm-metric-card">
          <h2 class="ebm-pillar-title">Build Skills for Academic and Real-World Success</h2>
          <p class="ebm-curriculum-tag">Practical Methods &bull; Educator Support &bull; Learner Growth</p>
          <p class="ebm-pillar-desc">Develop critical thinking, problem-solving, and cognitive intuition.</p>
        </div>
        <div class="ebm-metric-card">
          <h2 class="ebm-pillar-title">AI Diagnostics &amp; Adaptive Learning</h2>
          <p class="ebm-curriculum-tag">Adaptive Practice &bull; Targeted Guidance &bull; Real-Time Insights</p>
          <p class="ebm-pillar-desc">Identify learning bottlenecks and adapt pacing dynamically.</p>
        </div>
      </div>

      <div class="ebm-cta-group">
        <a href="/assessment" class="ebm-btn-primary">Take Free Diagnostic Assessment</a>
        <a href="/about" class="ebm-btn-secondary">Discover Our Pedagogy</a>
      </div>
    </section>

    <!-- ================= CURRICULUM PREVIEW & GRADE PATHWAYS ================= -->
    <section aria-labelledby="curriculum-heading" class="ebm-curricula-sec">
      <h2 id="curriculum-heading" class="ebm-section-h2">
        Explore EBM Curricula Across Grade Levels
      </h2>
      <p class="ebm-lead-sub">
        Explore detailed course outlines, lesson progressions, and skill benchmarks tailored for each stage of development.
      </p>

      <div class="ebm-curricula-grid">
        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 1 Mathematics</h3>
          <p class="ebm-curriculum-desc">Foundational numeracy, addition &amp; subtraction within 20, place value, shapes, and early measurement concepts.</p>
          <span class="ebm-curriculum-tag">Grade 1 &bull; Core Numeracy</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 1 English Comprehension</h3>
          <p class="ebm-curriculum-desc">Phonics decoding, sight word mastery, sentence formation, and guided comprehension stories.</p>
          <span class="ebm-curriculum-tag">Grade 1 &bull; Phonics &amp; Reading</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 2 Mathematics</h3>
          <p class="ebm-curriculum-desc">Two-digit arithmetic, introduction to multiplication, simple fractions, data tables, and time.</p>
          <span class="ebm-curriculum-tag">Grade 2 &bull; Arithmetic &amp; Logic</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 2 English Comprehension</h3>
          <p class="ebm-curriculum-desc">Grammar fundamentals, punctuation, vocabulary expansion, and reading fluency exercises.</p>
          <span class="ebm-curriculum-tag">Grade 2 &bull; Vocabulary &amp; Grammar</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 3 Mathematics</h3>
          <p class="ebm-curriculum-desc">Multiplication tables, division fundamentals, fractions comparison, area, and word problem modeling.</p>
          <span class="ebm-curriculum-tag">Grade 3 &bull; Problem Solving</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 3 English Comprehension</h3>
          <p class="ebm-curriculum-desc">Paragraph comprehension, narrative writing, inferencing, and contextual vocabulary.</p>
          <span class="ebm-curriculum-tag">Grade 3 &bull; Critical Reading</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 4 Mathematics</h3>
          <p class="ebm-curriculum-desc">Multi-digit multiplication, long division, decimals, fractions operations, and geometric angles.</p>
          <span class="ebm-curriculum-tag">Grade 4 &bull; Advanced Arithmetic</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Grade 4 English Comprehension</h3>
          <p class="ebm-curriculum-desc">Textual analysis, expository writing, grammar synthesis, and analytical reading strategies.</p>
          <span class="ebm-curriculum-tag">Grade 4 &bull; Textual Analysis</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Middle School Mastery (Grades 6–8)</h3>
          <p class="ebm-curriculum-desc">Pre-algebra, proportional reasoning, spatial geometry, and introductory algebraic derivations.</p>
          <span class="ebm-curriculum-tag">Grades 6–8 &bull; Pre-Algebra</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Cambridge O Level &amp; IGCSE (Grades 9–11)</h3>
          <p class="ebm-curriculum-desc">Exhaustive CAIE syllabus coverage for Cambridge Mathematics (4024/0580), Add Math (4037/0606), and past papers.</p>
          <span class="ebm-curriculum-tag">Grades 9–11 &bull; Cambridge O Level</span>
        </article>

        <article class="ebm-curriculum-card">
          <h3 class="ebm-curriculum-title">Cambridge A Levels (Grades 12–13)</h3>
          <p class="ebm-curriculum-desc">Advanced Pure Mathematics (P1/P3), Mechanics (M1), Probability &amp; Statistics (S1), and STEM rigor.</p>
          <span class="ebm-curriculum-tag">Grades 12–13 &bull; Cambridge A Level</span>
        </article>
      </div>
    </section>

    <!-- ================= METHODOLOGY & SKILLS ROADMAP ================= -->
    <section aria-labelledby="skills-heading" class="ebm-curricula-sec">
      <h2 id="skills-heading" class="ebm-section-h2">
        A Comprehensive 10-Pillar Skill Development Ecosystem
      </h2>
      <p class="ebm-lead-sub">
        Beyond standardized memorization: building foundational capabilities for academic mastery and life.
      </p>

      <div class="ebm-pillars-grid">
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">1. Thinking &amp; Intelligence</h3>
          <p class="ebm-pillar-desc">First-principles deduction, cognitive modeling, and logical reasoning frameworks.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">2. Academic Foundation</h3>
          <p class="ebm-pillar-desc">Uncompromising mastery of core mathematics and English language standards.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">3. Social Skills</h3>
          <p class="ebm-pillar-desc">Collaborative problem-solving, active listening, and constructive team engagement.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">4. Emotional Intelligence</h3>
          <p class="ebm-pillar-desc">Resilience against exam anxiety, growth mindset reinforcement, and emotional self-regulation.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">5. Financial Literacy</h3>
          <p class="ebm-pillar-desc">Applied practical mathematics, resource allocation, and value comprehension.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">6. Digital &amp; AI Literacy</h3>
          <p class="ebm-pillar-desc">Responsible utilization of computational tools, algorithmic thinking, and AI interfaces.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">7. Communication</h3>
          <p class="ebm-pillar-desc">Clear verbal and written articulation of mathematical derivations and conceptual ideas.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">8. Leadership &amp; Strategy</h3>
          <p class="ebm-pillar-desc">Independent study discipline, time management, and goal-oriented execution.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">9. Ethics &amp; Values</h3>
          <p class="ebm-pillar-desc">Academic integrity, honesty in diagnostics, and respectful classroom citizenship.</p>
        </div>
        <div class="ebm-pillar-card">
          <h3 class="ebm-pillar-title">10. Global Awareness</h3>
          <p class="ebm-pillar-desc">International Cambridge benchmarking, real-world context application, and curiosity.</p>
        </div>
      </div>
    </section>

    <!-- ================= PROVEN OUTCOMES & REVIEWS ================= -->
    <section aria-labelledby="outcomes-heading" class="ebm-curricula-sec">
      <h2 id="outcomes-heading" class="ebm-section-h2">
        Documented Academic Impact &amp; Parent Endorsements
      </h2>
      <div class="ebm-testimonials-grid">
        <blockquote class="ebm-testimonial-quote">
          <p class="ebm-testimonial-text">
            "Before EBM, my son struggled with Cambridge O Level Additional Math and had lost confidence. Within three months of personalized diagnostic instruction, his grades moved from a D to an A*."
          </p>
          <cite class="ebm-testimonial-cite">- Parent of Cambridge Distinction Scholar</cite>
        </blockquote>
        <blockquote class="ebm-testimonial-quote">
          <p class="ebm-testimonial-text">
            "The diagnostic assessment pinpointed gaps that our school teachers missed for two years. EBM gave our daughter clear mastery milestones and she now excels in advanced calculus."
          </p>
          <cite class="ebm-testimonial-cite">- Dr. Farhan K., Parent of A Level Student</cite>
        </blockquote>
      </div>
    </section>

    <!-- ================= FAQS SECTION ================= -->
    <section aria-labelledby="faq-title" class="ebm-curricula-sec">
      <h2 id="faq-title" class="ebm-section-h2">
        Frequently Asked Questions
      </h2>
      <dl class="ebm-faq-list">
        <div class="ebm-faq-item">
          <dt class="ebm-faq-dt">How does EBM personalize learning for each student?</dt>
          <dd class="ebm-faq-dd">EBM uses initial adaptive diagnostic testing to identify exact skill proficiencies. An individualized learning trajectory is generated, adjusting question difficulty and pace according to the student's mastery rate.</dd>
        </div>
        <div class="ebm-faq-item">
          <dt class="ebm-faq-dt">What grade levels are supported?</dt>
          <dd class="ebm-faq-dd">EBM supports students from Grade 1 through Cambridge O Levels (IGCSE) and A Levels (AS/A2), covering foundational numeracy, high school mathematics, sciences, and English comprehension.</dd>
        </div>
        <div class="ebm-faq-item">
          <dt class="ebm-faq-dt">How can parents track student progress?</dt>
          <dd class="ebm-faq-dd">Parents have access to a dedicated real-time dashboard displaying diagnostic scores, topic mastery percentages, attendance, cognitive velocity, and teacher notes.</dd>
        </div>
        <div class="ebm-faq-item">
          <dt class="ebm-faq-dt">How can I start with the EBM Diagnostic Assessment?</dt>
          <dd class="ebm-faq-dd">You can take the initial assessment online directly at <a href="/assessment" class="ebm-curriculum-tag">ejazbukharimethod.com/assessment</a> or contact our academic admissions team for personalized guidance.</dd>
        </div>
      </dl>
    </section>
  </main>
  ${renderFooter()}
  `;
}

function renderHeader(): string {
  return `
  <header class="ebm-ssr-header">
    <div class="ebm-ssr-header-inner">
      <a href="/" class="ebm-ssr-logo">Ejaz Bukhari Method (EBM)</a>
      <nav aria-label="Main Navigation" class="ebm-ssr-nav">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/assessment">Assessment</a>
        <a href="/learning">Learning</a>
        <a href="/case-studies">Case Studies</a>
        <a href="/analytics">Analytics</a>
        <a href="/inspiration">Inspiration</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>
  `;
}

function renderFooter(): string {
  return `
  <footer class="ebm-ssr-footer">
    <div class="ebm-ssr-footer-inner">
      <div>
        <h4 class="ebm-footer-heading-brand">Ejaz Bukhari Method (EBM)</h4>
        <p class="ebm-footer-p">Personalized academic learning platform from Grade 1 to Cambridge O/A Levels integrating adaptive diagnostics, cognitive velocity tracking, and personalized pedagogy.</p>
        <p class="ebm-footer-p"><strong>Online Academy:</strong> 100% Virtual &amp; Remote Campus (Accessible Worldwide)</p>
        <p class="ebm-footer-p">Admissions &amp; Support: <a href="mailto:syedejazbukari@gmail.com">syedejazbukari@gmail.com</a> | Phone: <a href="tel:+923334541572">+92 333 4541572</a></p>
      </div>
      <div>
        <h4 class="ebm-footer-heading">Academic Programs</h4>
        <ul class="ebm-footer-list">
          <li><a href="/programs">Primary Foundation (Grades 1–5)</a></li>
          <li><a href="/programs">Middle School Mastery (Grades 6–8)</a></li>
          <li><a href="/programs">Cambridge O Level / IGCSE (Grades 9–11)</a></li>
          <li><a href="/programs">Cambridge A Level (Grades 12–13)</a></li>
        </ul>
      </div>
      <div>
        <h4 class="ebm-footer-heading">Platform &amp; Portals</h4>
        <ul class="ebm-footer-list">
          <li><a href="/assessment">Diagnostic Assessment</a></li>
          <li><a href="/learning">Interactive Courses</a></li>
          <li><a href="/analytics">Mastery Analytics</a></li>
          <li><a href="/case-studies">Turnaround Case Studies</a></li>
          <li><a href="/blog">Educational Research Blog</a></li>
        </ul>
      </div>
      <div>
        <h4 class="ebm-footer-heading">Legal &amp; Accreditation</h4>
        <p class="ebm-footer-copy">Accredited international curriculum delivery following Cambridge Assessment International Education (CAIE) syllabus standards.</p>
        <p class="ebm-footer-copy">&copy; 2026 Ejaz Bukhari Method (EBM). All rights reserved.</p>
      </div>
    </div>
  </footer>
  `;
}
