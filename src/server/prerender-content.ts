/**
 * Server-Side Semantic HTML Pre-renderer for EBM Platform.
 * Injects rich, accessible, high-text-density semantic content inside <div id="root">.
 * Ensures all pages achieve a high text-to-HTML ratio (>25% - 40%+), eliminating "low text-HTML ratio"
 * warnings across SEO audits (Semrush, Ahrefs, Screaming Frog) while ensuring instant indexing by search bots.
 */

interface BlogPostData {
  title: string;
  excerpt?: string;
  content?: string;
  authorName?: string;
  publishedAt?: string;
  category?: string;
  categorySlug?: string;
  slug?: string;
}

export function getPrerenderedHtml(cleanPath: string, blogPost?: BlogPostData | null): string {
  const commonHeader = `
    <header class="ssr-header">
      <div class="ssr-container ssr-header-inner">
        <a href="/" class="ssr-logo">Ejaz Bukhari Method <span class="ssr-accent">| EBM</span></a>
        <nav aria-label="Primary Navigation" class="ssr-nav">
          <a href="/programs">Programs</a>
          <a href="/assessment">Diagnostic Assessment</a>
          <a href="/learning">Learning Portal</a>
          <a href="/analytics">Analytics</a>
          <a href="/pricing">Pricing</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/inspiration">Inspiration</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          <a href="/login" class="ssr-nav-cta">Sign In</a>
        </nav>
      </div>
    </header>
  `;

  const commonFooter = `
    <footer class="ssr-footer">
      <div class="ssr-container ssr-footer-grid">
        <div>
          <h3>Ejaz Bukhari Method (EBM)</h3>
          <p>
            Evidence-based personalized learning platform for Grade 1 through Cambridge O/A Levels. Grounded in cognitive acceleration, adaptive diagnostic baselines, and Socratic pedagogical guidance.
          </p>
          <p class="ssr-subtext">Founded by Syed Ejaz Bukhari. Dedicated to academic mastery, mathematical clarity, and intellectual excellence.</p>
        </div>
        <div>
          <h4>Curricula & Pathways</h4>
          <ul>
            <li><a href="/programs">Academic Programs & Curricula</a></li>
            <li><a href="/programs">Primary Foundation (Grades 1-5)</a></li>
            <li><a href="/programs">Middle School Acceleration (Grades 6-8)</a></li>
            <li><a href="/programs">Cambridge O-Level & IGCSE Prep</a></li>
            <li><a href="/programs">Cambridge A-Level Mathematics & STEM</a></li>
            <li><a href="/pricing">Tuition & Membership Plans</a></li>
            <li><a href="/about">About EBM & Syed Ejaz Bukhari</a></li>
          </ul>
        </div>
        <div>
          <h4>Platform & Insights</h4>
          <ul>
            <li><a href="/assessment">Diagnostic Baseline Evaluation</a></li>
            <li><a href="/learning">Interactive Learning Portal</a></li>
            <li><a href="/analytics">Cognitive Velocity Analytics</a></li>
            <li><a href="/inspiration">Mathematical Discoveries Hub</a></li>
            <li><a href="/case-studies">Student Success Case Studies</a></li>
            <li><a href="/login">Student & Parent Portal Login</a></li>
            <li><a href="/register">Create Student Account</a></li>
          </ul>
        </div>
        <div>
          <h4>Featured Research</h4>
          <ul>
            <li><a href="/blog/how-personalized-learning-supports-students">Personalized Learning Pathways</a></li>
            <li><a href="/blog/how-students-develop-mathematical-thinking">Mathematical Problem-Solving</a></li>
            <li><a href="/blog/understanding-learning-mastery">Diagnostic Baselines & Mastery</a></li>
            <li><a href="/blog/cognitive-acceleration-stem-foundations">Cognitive Acceleration in STEM</a></li>
            <li><a href="/blog/ai-socratic-tutoring-self-directed-learning">Socratic AI Tutoring Framework</a></li>
            <li><a href="/blog">Browse All Publications</a></li>
          </ul>
        </div>
        <div>
          <h4>Admissions & Support</h4>
          <ul>
            <li><a href="/contact">Book Diagnostic Consultation</a></li>
            <li><a href="/privacy">Privacy Policy & Student Data</a></li>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="mailto:syedejazbukari@gmail.com">syedejazbukari@gmail.com</a></li>
            <li><a href="tel:+923334541572">+92 333 4541572</a></li>
          </ul>
        </div>
      </div>
      <div class="ssr-container ssr-mt-md" style="padding-top:16px; border-top:1px solid #334155;">
        <p style="font-size:12px; font-weight:700; color:#cbd5e1; margin-bottom:8px;">Pedagogical Knowledge Hubs:</p>
        <div class="ssr-tag-cloud">
          <a href="/blog/category/personalized-learning" class="ssr-tag">Personalized Learning</a>
          <a href="/blog/category/mathematical-thinking" class="ssr-tag">Mathematical Thinking</a>
          <a href="/blog/category/diagnostic-assessment" class="ssr-tag">Diagnostic Assessment</a>
          <a href="/blog/category/cognitive-acceleration" class="ssr-tag">Cognitive Acceleration</a>
          <a href="/blog/category/ai-edtech" class="ssr-tag">AI & EdTech</a>
        </div>
      </div>
      <div class="ssr-container ssr-footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Ejaz Bukhari Method (EBM). All rights reserved.</p>
        <p>Empowering learners through cognitive scaffolding, diagnostic baselines, and personalized academic mastery.</p>
      </div>
    </footer>
  `;

  let mainContent = "";

  // 1. Individual Blog Post
  if (cleanPath.startsWith("/blog/") && !cleanPath.startsWith("/blog/category/") && blogPost) {
    const rawPostContent = blogPost.content || "";
    const cleanParagraphs = rawPostContent
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0)
      .slice(0, 18)
      .map((p) => `<p class="ssr-article-p">${p.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`)
      .join("");

    const ALL_PUBLICATIONS = [
      {
        slug: "how-personalized-learning-supports-students",
        categorySlug: "personalized-learning",
        categoryName: "Personalized Learning",
        title: "How Personalized Learning Supports Student Progress",
        summary: "Explores why one-size-fits-all instruction fails modern learners and how continuous diagnostic adaptation accelerates conceptual mastery."
      },
      {
        slug: "how-students-develop-mathematical-thinking",
        categorySlug: "mathematical-thinking",
        categoryName: "Mathematical Thinking",
        title: "How Students Develop Mathematical Thinking and Problem Solving",
        summary: "Deconstructs the cognitive shift from mechanical formula memorization to intuitive mathematical reasoning and problem deconstruction."
      },
      {
        slug: "understanding-learning-mastery",
        categorySlug: "diagnostic-assessment",
        categoryName: "Diagnostic Assessment",
        title: "Understanding Learning Mastery: Why Diagnostic Baselines Matter",
        summary: "Details the psychometric principles behind diagnostic baseline evaluation and how identifying root error vectors saves years of unfocused tutoring."
      },
      {
        slug: "cognitive-acceleration-stem-foundations",
        categorySlug: "cognitive-acceleration",
        categoryName: "Cognitive Acceleration",
        title: "Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM",
        summary: "How cognitive conflict and metacognitive reflection transition primary students into top-percentile Cambridge O/A Level STEM scholars."
      },
      {
        slug: "ai-socratic-tutoring-self-directed-learning",
        categorySlug: "ai-edtech",
        categoryName: "AI & EdTech",
        title: "The Role of Socratic AI Tutoring in Self-Directed Learning",
        summary: "How inverse prompting and Socratic dialogue prevent digital cognitive offloading and foster independent student inquiry."
      }
    ];

    const relatedPubs = ALL_PUBLICATIONS.filter((pub) => pub.slug !== blogPost.slug);

    mainContent = `
      <article class="ssr-container ssr-article">
        <nav aria-label="Breadcrumb" class="ssr-breadcrumb">
          <a href="/">Home</a> &gt; 
          <a href="/blog">Blog</a> &gt; 
          <a href="/blog/category/${blogPost.categorySlug || "personalized-learning"}">${blogPost.category || "Pedagogy"}</a> &gt; 
          <span>${blogPost.title}</span>
        </nav>
        <header class="ssr-article-header">
          ${blogPost.category ? `<a href="/blog/category/${blogPost.categorySlug || "personalized-learning"}" class="ssr-badge" style="text-decoration:none;">${blogPost.category}</a>` : ""}
          <h1 class="ssr-h1">${blogPost.title}</h1>
          <div class="ssr-meta">
            <span>By <a href="/about" style="color:inherit; font-weight:700;">${blogPost.authorName || "Syed Ejaz Bukhari"}</a></span>
            <span>&bull;</span>
            <span>Published on ${blogPost.publishedAt ? new Date(blogPost.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Recent"}</span>
          </div>
          ${blogPost.excerpt ? `<p class="ssr-lead-quote">${blogPost.excerpt}</p>` : ""}
        </header>
        <div class="ssr-article-body">
          ${cleanParagraphs || `<p class="ssr-p">Read comprehensive insights and evidence-based analysis by Syed Ejaz Bukhari on pedagogical acceleration and student development.</p>`}
        </div>

        <!-- Academic Ecosystem Internal Hyperlinks -->
        <section class="ssr-card ssr-mt-lg">
          <h2 class="ssr-h3">Academic Pathways & Cognitive Frameworks Connected to This Research</h2>
          <p class="ssr-p">
            The pedagogical principles discussed in this paper are systematically embedded across all EBM operational learning pillars:
          </p>
          <div class="ssr-grid ssr-mt-sm">
            <div>
              <h4 class="ssr-h4"><a href="/assessment">Diagnostic Baseline Assessment</a></h4>
              <p class="ssr-p">Pinpoint prerequisite learning gaps and cognitive baseline speeds using our structured diagnostic evaluation protocol.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/programs">Curriculum Pathways (Grades 1 to A-Levels)</a></h4>
              <p class="ssr-p">Explore individualized study plans designed specifically for Cambridge Primary, Lower Secondary, IGCSE, and O/A Levels.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/analytics">Mastery Telemetry & Cognitive Velocity</a></h4>
              <p class="ssr-p">Track learning retention, error categorization, and mastery milestones in real-time through longitudinal telemetry.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/learning">Interactive Practice & Socratic Portal</a></h4>
              <p class="ssr-p">Engage in guided step-by-step problem deconstruction with instant feedback and structured past paper exercises.</p>
            </div>
          </div>
        </section>

        <!-- Related Research Publications in the Knowledge Network -->
        <section class="ssr-card ssr-mt-lg">
          <h2 class="ssr-h3">Related Research in the EBM Knowledge Network</h2>
          <p class="ssr-p">Deepen your understanding of student cognitive acceleration and curriculum design with related publications by Syed Ejaz Bukhari:</p>
          <div class="ssr-grid ssr-mt-md">
            ${relatedPubs.map((pub) => `
              <div style="border-bottom:1px solid #e2e8f0; padding-bottom:12px; margin-bottom:12px;">
                <span class="ssr-badge" style="font-size:10px; margin-bottom:4px; display:inline-block;">${pub.categoryName}</span>
                <h4 style="margin:4px 0;"><a href="/blog/${pub.slug}" style="color:#0f172a; text-decoration:none; font-weight:700;">${pub.title}</a></h4>
                <p class="ssr-p" style="font-size:13px; margin:4px 0;">${pub.summary}</p>
                <a href="/blog/${pub.slug}" style="font-size:12px; font-weight:700; color:#2563eb;">Read Publication &rarr;</a>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="ssr-card ssr-mt-lg ssr-center">
          <h2 class="ssr-h3">Accelerate Academic Mastery with the Ejaz Bukhari Method</h2>
          <p class="ssr-p">
            Whether your student needs to bridge foundational mathematics learning gaps or aims for a Top in Region distinction in Cambridge examinations, our evidence-based pedagogy unlocks their highest cognitive potential.
          </p>
          <div class="ssr-actions ssr-mt-md">
            <a href="/assessment" class="ssr-btn ssr-btn-primary">Start Diagnostic Assessment &rarr;</a>
            <a href="/programs" class="ssr-btn ssr-btn-secondary">Explore Academic Programs</a>
          </div>
        </section>
      </article>
    `;
  }
  // 2. Blog Category Guides
  else if (cleanPath.startsWith("/blog/category/")) {
    const categorySlug = cleanPath.replace("/blog/category/", "").replace(/\/+$/, "");
    const CATEGORY_DETAILS: Record<string, { name: string; headline: string; intro: string; topics: string[]; deepDive: string; questions: string[] }> = {
      "personalized-learning": {
        name: "Personalized Learning",
        headline: "Adaptive Pedagogical Frameworks & Individualized Student Pacing",
        intro: "Personalized learning recognizes that every student possesses a distinct prior knowledge schema, cognitive processing speed, and conceptual learning curve. The Ejaz Bukhari Method moves beyond traditional one-size-fits-all lecture paradigms by establishing precise diagnostic baselines, continuous micro-assessments, and targeted cognitive interventions. Through customized pacing and mastery learning principles, students transition from passive listeners to self-directed scholars capable of excelling in rigorous academic environments including Cambridge IGCSE and O/A Levels.",
        topics: [
          "Individualized curriculum mapping and adaptive learning trajectories from primary to advanced levels",
          "Solving Bloom's 2 Sigma Problem through personalized coaching and real-time Socratic feedback",
          "Scaffolding complex analytical concepts into manageable, prerequisite-verified mastery units",
          "Empowering metacognitive awareness and active self-assessment in young learners",
          "Transitioning from remedial learning intervention to accelerated cognitive development"
        ],
        deepDive: "In conventional schooling, fixed time constraints force classes to move forward regardless of whether every learner has mastered the underlying material. This structural flaw compounds learning deficits over time: a 70% understanding of fractions becomes severe failure in pre-algebra, which subsequently impairs calculus. EBM reverses this paradigm: the standard of comprehension is held fixed at 85%+ mastery, while time and instructional scaffolding adapt flexibly to the individual student.",
        questions: [
          "How does diagnostic baseline testing determine individual student learning trajectories?",
          "What mechanisms prevent students from developing compounding conceptual learning gaps?",
          "How do adaptive pacing models foster academic self-confidence and intrinsic motivation?"
        ]
      },
      "mathematical-thinking": {
        name: "Mathematical Thinking",
        headline: "Deep Conceptual Problem Solving, Logical Deduction & Mathematical Fluency",
        intro: "True mathematical capability is not rote formula memorization or mechanical calculation; it is the capacity to model real-world phenomena, formulate structured hypotheses, and construct rigorous deductive proofs. At EBM, mathematical instruction emphasizes first-principles derivation, geometric intuition, algebraic dexterity, and algorithmic problem-solving. We train students from early primary through Cambridge A-Level Further Mathematics to view mathematics as an interconnected language of patterns and analytical clarity.",
        topics: [
          "Developing foundational number sense into sophisticated algebraic intuition and abstraction",
          "Heuristics for tackling non-routine mathematical olympiad and competitive problem sets",
          "Geometric proof structures, coordinate systems, and multi-dimensional spatial visualization",
          "Calculus foundations: intuitive limits, rate of change, and continuous dynamical modeling",
          "Eliminating math anxiety through incremental mastery thresholds and systematic error normalization"
        ],
        deepDive: "Mathematical fluency requires balancing conceptual understanding, procedural automaticity, and problem-solving heuristics. When students encounter non-routine problems, rote recall invariably breaks down. EBM equips students with George Pólya's four-stage heuristic framework: understanding the problem deeply, devising a structured plan using analogies or sub-problems, carrying out the derivation with rigorous verification, and reflecting on alternative pathways of solution.",
        questions: [
          "Why is conceptual derivation superior to algorithmic memorization in Cambridge examinations?",
          "How can spatial geometry and visual proofs bridge the gap to abstract algebraic thinking?",
          "What pedagogical techniques effectively eliminate chronic mathematics anxiety in school-age children?"
        ]
      },
      "diagnostic-assessment": {
        name: "Diagnostic Assessment",
        headline: "Precision Baselines, Conceptual Gap Diagnostics & Predictive Mastery Analytics",
        intro: "Effective education begins with comprehensive diagnostic clarity. Rather than assessing students solely on summative percentages, EBM diagnostic evaluations isolate the root causes of academic difficulty. We distinguish between conceptual misunderstandings, procedural calculation slips, working memory overloads, and exam timing challenges. The resulting diagnostic baseline empowers educators and parents with granular visibility, enabling targeted interventions before learning gaps compound.",
        topics: [
          "Diagnostic taxonomy: differentiating conceptual flaws from operational slips and memory fatigue",
          "Real-time item response modeling and adaptive question generation for accurate baseline calibration",
          "Constructing longitudinal learning curves and retention decay projections across academic quarters",
          "Diagnostic baselines as roadmaps for Cambridge O-Level grade acceleration and distinction targeting",
          "Actionable telemetry for parent-teacher progress review meetings and individualized goal setting"
        ],
        deepDive: "Standard examinations merely score correct versus incorrect responses, providing zero insight into why an answer failed. EBM diagnostic baseline assessments decompose every question along cognitive dimensions: Was the error caused by misinterpreting vocabulary? A gap in prerequisite knowledge? An algebraic sign error? Or timing pressure? Pinpointing the exact error vector enables rapid, targeted correction in hours rather than months of unfocused tutoring.",
        questions: [
          "How do diagnostic baseline assessments differ from standard school report cards?",
          "What role does item response theory play in determining student cognitive thresholds?",
          "How does early diagnostic intervention prevent secondary school academic underperformance?"
        ]
      },
      "cognitive-acceleration": {
        name: "Cognitive Acceleration",
        headline: "Bridging Primary Foundations to Advanced STEM Distinctions",
        intro: "Cognitive acceleration draws upon developmental psychology and cognitive science to deliberately elevate students' higher-order reasoning capacities. By exposing learners to cognitive conflict, peer dialectic, and metacognitive reflection, EBM systematically bridges early primary foundational skills with the demanding abstract synthesis required in advanced STEM disciplines, including physics mechanics, organic chemistry mechanisms, and algorithmic computation.",
        topics: [
          "Piagetian developmental stages and cognitive schema restructuring in middle and secondary years",
          "Scaffolding scientific inquiry, experimental design, and hypothesis testing from Grade 3 upward",
          "Mathematical modeling in classical Newtonian mechanics and physical dynamic systems",
          "Developing computational thinking and algorithmic problem deconstruction for modern computer science",
          "Strategies for achieving top percentile distinctions in Cambridge Advanced Level examinations"
        ],
        deepDive: "Children naturally pass through stages of cognitive development, moving from concrete operations to formal abstract reasoning. Conventional curricula wait passively for this transition to occur spontaneously. Cognitive acceleration deliberately accelerates this maturation by presenting curated cognitive anomalies that challenge existing mental schemas, prompting students to formulate more sophisticated explanatory models.",
        questions: [
          "How does cognitive conflict stimulate higher-order critical thinking in students?",
          "What curriculum structures connect primary school arithmetic to Cambridge A-Level mechanics?",
          "Why is metacognitive reflection the most significant predictor of independent study success?"
        ]
      },
      "ai-edtech": {
        name: "AI & Educational Technology",
        headline: "Socratic AI Tutoring, Intelligent Pedagogical Co-Pilots & Ethical EdTech",
        intro: "Modern artificial intelligence holds transformative potential when harnessed to augment—not replace—rigorous human pedagogical mentorship. EBM integrates proprietary Socratic AI tutoring systems designed specifically to challenge students to reason step-by-step rather than passively providing instant solutions. By serving as an always-available cognitive dialogue partner, intelligent tutoring accelerates homework reflection, deepens conceptual clarity, and cultivates resilient self-efficacy.",
        topics: [
          "Designing Socratic AI agents that prompt deductive reflection rather than spoon-feeding answers",
          "Real-time formative assessment and dynamic exercise generation adapted to immediate student response",
          "Balancing automated feedback loops with human pedagogical mentorship and empathetic counseling",
          "Ethical considerations: safeguarding student privacy, data protection, and preventing AI dependency",
          "The future of hybrid digital classrooms in Cambridge syllabus preparation and mastery tracking"
        ],
        deepDive: "The critical danger of generative AI in education is cognitive offloading: when an AI simply answers a student's homework prompt, learning decreases to zero. EBM's Socratic AI co-pilot is built on inverse prompting principles: it never solves a problem outright. Instead, it asks targeted questions: 'What formula relates these two variables?', 'Can you identify which term creates the contradiction?', forcing active neural engagement.",
        questions: [
          "How does Socratic inquiry prevent cognitive offloading in digital learning environments?",
          "What privacy protocols are essential when deploying AI tutoring systems for minors?",
          "How do human educators and AI co-pilots collaborate to deliver optimal academic outcomes?"
        ]
      }
    };

    const details = CATEGORY_DETAILS[categorySlug] || {
      name: categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      headline: "Curated Educational Insights & Pedagogical Perspectives",
      intro: "Explore articles, instructional frameworks, and research-backed perspectives on academic mastery, curriculum design, and cognitive development from Syed Ejaz Bukhari.",
      topics: [
        "Curriculum planning and academic milestones from primary to secondary grades",
        "Diagnostic methodologies, baseline testing, and individualized student intervention",
        "Cambridge O/A Level exam readiness, past paper dissection, and time management",
        "Fostering lifelong intellectual curiosity, mathematical fluency, and analytical discipline"
      ],
      deepDive: "Educational excellence requires aligning cognitive science with practical pedagogical execution. EBM research articles bridge theory and classroom practice, delivering actionable guidance for parents, teachers, and ambitious students.",
      questions: [
        "How does structured pedagogical guidance accelerate student academic trajectory?",
        "What diagnostic indicators signal readiness for advanced Cambridge examination coursework?"
      ]
    };

    mainContent = `
      <main class="ssr-container ssr-main">
        <nav aria-label="Breadcrumb" class="ssr-breadcrumb">
          <a href="/">Home</a> &gt; 
          <a href="/blog">Blog</a> &gt; 
          <span>${details.name}</span>
        </nav>
        <header class="ssr-header-block">
          <span class="ssr-badge">Curated Topic Guide</span>
          <h1 class="ssr-h1">${details.headline}</h1>
          <p class="ssr-lead">${details.intro}</p>
        </header>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Pedagogical Framework: ${details.name}</h2>
          <p class="ssr-p">${details.deepDive}</p>
        </section>

        <section class="ssr-mb-lg">
          <h2 class="ssr-h2">Core Focus Areas in ${details.name}</h2>
          <div class="ssr-grid">
            ${details.topics.map((t) => `
              <div class="ssr-card">
                <h3 class="ssr-h3" style="font-size:16px;">${t}</h3>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Featured Research Publication in This Domain</h2>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-top:12px;">
            <span class="ssr-badge" style="background:#2563eb; color:#fff; font-size:11px;">Primary Academic Paper</span>
            <h3 class="ssr-h3" style="margin-top:8px;">
              <a href="/blog/${categorySlug === 'mathematical-thinking' ? 'how-students-develop-mathematical-thinking' : categorySlug === 'diagnostic-assessment' ? 'understanding-learning-mastery' : categorySlug === 'cognitive-acceleration' ? 'cognitive-acceleration-stem-foundations' : categorySlug === 'ai-edtech' ? 'ai-socratic-tutoring-self-directed-learning' : 'how-personalized-learning-supports-students'}" style="color:#0f172a; text-decoration:none;">
                ${categorySlug === 'mathematical-thinking' ? 'How Students Develop Mathematical Thinking and Problem Solving' : categorySlug === 'diagnostic-assessment' ? 'Understanding Learning Mastery: Why Diagnostic Baselines Matter' : categorySlug === 'cognitive-acceleration' ? 'Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM' : categorySlug === 'ai-edtech' ? 'The Role of Socratic AI Tutoring in Self-Directed Learning' : 'How Personalized Learning Supports Student Progress'}
              </a>
            </h3>
            <p class="ssr-p" style="margin-top:8px;">
              Read the foundational publication by Syed Ejaz Bukhari analyzing theoretical models, classroom observations, and diagnostic strategies within this specific pedagogical dimension.
            </p>
            <a href="/blog/${categorySlug === 'mathematical-thinking' ? 'how-students-develop-mathematical-thinking' : categorySlug === 'diagnostic-assessment' ? 'understanding-learning-mastery' : categorySlug === 'cognitive-acceleration' ? 'cognitive-acceleration-stem-foundations' : categorySlug === 'ai-edtech' ? 'ai-socratic-tutoring-self-directed-learning' : 'how-personalized-learning-supports-students'}" class="ssr-btn ssr-btn-primary" style="display:inline-block; margin-top:8px;">
              Read Full Research Article &rarr;
            </a>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Key Educational Questions Explored in This Series</h2>
          <ul class="ssr-list">
            ${details.questions.map((q) => `<li><strong>${q}</strong></li>`).join("")}
          </ul>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Related Research Publications in the EBM Network</h2>
          <p class="ssr-p">Cross-disciplinary academic papers authored by Syed Ejaz Bukhari across complementary domains:</p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-personalized-learning-supports-students">Personalized Learning Pathways</a></h4>
              <p class="ssr-p">Why customized pacing and continuous formative intervention produce accelerated mastery curves.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-students-develop-mathematical-thinking">Mathematical Problem Solving</a></h4>
              <p class="ssr-p">Cultivating intuition, deductive logic, and Cambridge O/A Level problem-deconstruction fluency.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/understanding-learning-mastery">Diagnostic Baselines & Mastery</a></h4>
              <p class="ssr-p">How granular diagnostic evaluation isolates conceptual, procedural, and cognitive error vectors.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/cognitive-acceleration-stem-foundations">Cognitive Acceleration in STEM</a></h4>
              <p class="ssr-p">Transitioning primary students into top-percentile Cambridge Advanced Level STEM thinkers.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/ai-socratic-tutoring-self-directed-learning">Socratic AI Tutoring Framework</a></h4>
              <p class="ssr-p">Utilizing calibrated dialectic inquiry to deepen independent reasoning and prevent AI dependency.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card">
          <h2 class="ssr-h2">Explore All Core Academic Disciplines</h2>
          <p class="ssr-p">Browse our research archives and pedagogical publications across all core domains.</p>
          <div class="ssr-tag-cloud">
            <a href="/blog/category/personalized-learning" class="ssr-tag">Personalized Learning</a>
            <a href="/blog/category/mathematical-thinking" class="ssr-tag">Mathematical Thinking</a>
            <a href="/blog/category/diagnostic-assessment" class="ssr-tag">Diagnostic Assessment</a>
            <a href="/blog/category/cognitive-acceleration" class="ssr-tag">Cognitive Acceleration</a>
            <a href="/blog/category/ai-edtech" class="ssr-tag">AI & EdTech</a>
          </div>
        </section>
      </main>
    `;
  }
  // 3. Homepage (/)
  else if (cleanPath === "/") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <section class="ssr-hero">
          <span class="ssr-badge">Evidence-Based Pedagogical Mastery</span>
          <h1 class="ssr-h1">Personalized Learning Platform for Grade 1 to Cambridge O/A Levels</h1>
          <p class="ssr-lead">
            The Ejaz Bukhari Method (EBM) combines individualized diagnostic baselines, adaptive mastery pacing, cognitive acceleration, and AI-guided Socratic dialogue to help students build unshakable academic confidence and achieve world-class results.
          </p>
          <div class="ssr-actions">
            <a href="/assessment" class="ssr-btn ssr-btn-primary">Begin Diagnostic Baseline Assessment &rarr;</a>
            <a href="/programs" class="ssr-btn ssr-btn-secondary">Explore Academic Programs</a>
          </div>
        </section>

        <section class="ssr-mb-xl">
          <div class="ssr-center ssr-mb-lg">
            <h2 class="ssr-h2">Five Core Pillars of the Ejaz Bukhari Method</h2>
            <p class="ssr-sub">Rooted in educational psychology, cognitive load theory, and decades of teaching distinctions in Cambridge examinations.</p>
          </div>
          <div class="ssr-grid">
            <div class="ssr-card">
              <h3 class="ssr-h3">1. Diagnostic Baseline Testing</h3>
              <p class="ssr-p">Comprehensive diagnostic evaluations analyze prior learning gaps, conceptual clarity, and procedural fluency. We map precisely what each learner understands before assigning customized practice.</p>
            </div>
            <div class="ssr-card">
              <h3 class="ssr-h3">2. Individualized Mastery Pathways</h3>
              <p class="ssr-p">Students progress at their optimal cognitive velocity. No student is held back by arbitrary classroom pacing, and none are left behind with unaddressed foundational gaps.</p>
            </div>
            <div class="ssr-card">
              <h3 class="ssr-h3">3. Mathematical Thinking & STEM Rigor</h3>
              <p class="ssr-p">We cultivate deep conceptual intuition rather than superficial formula memorization. Students learn to derive principles from first premises and conquer challenging Cambridge exam questions.</p>
            </div>
            <div class="ssr-card">
              <h3 class="ssr-h3">4. Socratic AI Learning Co-Pilot</h3>
              <p class="ssr-p">Our intelligent digital assistant guides students through multi-step reasoning by asking calibrated questions, encouraging active reflection and self-correction instead of spoon-feeding answers.</p>
            </div>
            <div class="ssr-card">
              <h3 class="ssr-h3">5. Real-Time Cognitive Analytics</h3>
              <p class="ssr-p">Parents and educators receive longitudinal insights into mastery velocity, time on task, accuracy retention curves, and syllabus milestone readiness across every academic module.</p>
            </div>
            <div class="ssr-card">
              <h3 class="ssr-h3">6. Cambridge Distinction Track</h3>
              <p class="ssr-p">Tailored syllabi alignment for Cambridge IGCSE, O-Level, and A-Level subjects with past paper dissection, marking scheme decoding, and timed exam simulation practice.</p>
            </div>
          </div>
        </section>

        <!-- Featured Research & Pedagogical Insights -->
        <section class="ssr-card ssr-mb-xl">
          <div class="ssr-center ssr-mb-md">
            <span class="ssr-badge">Research & Publications</span>
            <h2 class="ssr-h2">Featured Educational Research by Syed Ejaz Bukhari</h2>
            <p class="ssr-sub">In-depth analyses on cognitive acceleration, diagnostic assessment methodologies, and mathematical problem-solving.</p>
          </div>
          <div class="ssr-grid">
            <div>
              <span class="ssr-badge" style="font-size:10px;">Personalized Learning</span>
              <h3 class="ssr-h3" style="font-size:16px; margin:6px 0;"><a href="/blog/how-personalized-learning-supports-students">How Personalized Learning Supports Student Progress</a></h3>
              <p class="ssr-p">Why customized pacing and diagnostic adaptation outperform traditional standardized lecture environments.</p>
              <a href="/blog/how-personalized-learning-supports-students" style="font-size:12px; font-weight:700; color:#2563eb;">Read Article &rarr;</a>
            </div>
            <div>
              <span class="ssr-badge" style="font-size:10px;">Mathematical Thinking</span>
              <h3 class="ssr-h3" style="font-size:16px; margin:6px 0;"><a href="/blog/how-students-develop-mathematical-thinking">How Students Develop Mathematical Thinking and Problem Solving</a></h3>
              <p class="ssr-p">Deconstructing cognitive barriers to cultivate mathematical intuition and Cambridge exam distinction readiness.</p>
              <a href="/blog/how-students-develop-mathematical-thinking" style="font-size:12px; font-weight:700; color:#2563eb;">Read Article &rarr;</a>
            </div>
            <div>
              <span class="ssr-badge" style="font-size:10px;">Diagnostic Assessment</span>
              <h3 class="ssr-h3" style="font-size:16px; margin:6px 0;"><a href="/blog/understanding-learning-mastery">Understanding Learning Mastery: Why Diagnostic Baselines Matter</a></h3>
              <p class="ssr-p">Isolating foundational conceptual gaps and cognitive load thresholds before commencing targeted practice.</p>
              <a href="/blog/understanding-learning-mastery" style="font-size:12px; font-weight:700; color:#2563eb;">Read Article &rarr;</a>
            </div>
            <div>
              <span class="ssr-badge" style="font-size:10px;">Cognitive Acceleration</span>
              <h3 class="ssr-h3" style="font-size:16px; margin:6px 0;"><a href="/blog/cognitive-acceleration-stem-foundations">Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM</a></h3>
              <p class="ssr-p">Structuring the mental leap from concrete arithmetic to abstract algebra and physics modeling.</p>
              <a href="/blog/cognitive-acceleration-stem-foundations" style="font-size:12px; font-weight:700; color:#2563eb;">Read Article &rarr;</a>
            </div>
            <div>
              <span class="ssr-badge" style="font-size:10px;">AI & EdTech</span>
              <h3 class="ssr-h3" style="font-size:16px; margin:6px 0;"><a href="/blog/ai-socratic-tutoring-self-directed-learning">The Role of Socratic AI Tutoring in Self-Directed Learning</a></h3>
              <p class="ssr-p">How calibrated inverse questioning fosters independent analytical thinking and prevents homework shortcuts.</p>
              <a href="/blog/ai-socratic-tutoring-self-directed-learning" style="font-size:12px; font-weight:700; color:#2563eb;">Read Article &rarr;</a>
            </div>
            <div style="display:flex; flex-direction:column; justify-content:center; background:#f1f5f9; border-radius:12px; padding:20px; text-align:center;">
              <h3 class="ssr-h3" style="font-size:16px;">Explore All Publications</h3>
              <p class="ssr-p">Browse our complete collection of educational essays, research summaries, and guides.</p>
              <a href="/blog" class="ssr-btn ssr-btn-primary" style="margin-top:8px;">View Blog Archive &rarr;</a>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-mb-xl">
          <h2 class="ssr-h2 ssr-center">Comprehensive Grade Levels & Subject Pathways</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Primary Foundations (Grades 1-5)</h3>
              <p class="ssr-p">Arithmetic fluency, spatial reasoning, reading comprehension, scientific curiosity, and foundational logic.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Middle School Acceleration (Grades 6-8)</h3>
              <p class="ssr-p">Pre-algebra, proportional reasoning, experimental scientific method, and structured essay writing.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Cambridge O-Level & IGCSE</h3>
              <p class="ssr-p">Mathematics D, Additional Mathematics, Physics, Chemistry, Biology, Computer Science, and English Language.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Cambridge A-Level Distinction</h3>
              <p class="ssr-p">Pure Mathematics (P1, P3), Mechanics, Probability & Statistics, Advanced Physics, and Chemistry problem solving.</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  // 4. About (/about)
  else if (cleanPath === "/about") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block">
          <span class="ssr-badge">Our Pedagogical Mission</span>
          <h1 class="ssr-h1">About the Ejaz Bukhari Method (EBM)</h1>
          <p class="ssr-lead">
            Dedicated to solving education's central dilemma: delivering individualized, high-mastery instruction that empowers every learner to achieve their full intellectual potential.
          </p>
        </header>

        <section class="ssr-mb-lg">
          <h2 class="ssr-h2">The Philosophy Behind EBM</h2>
          <p class="ssr-p">
            The Ejaz Bukhari Method was established by Syed Ejaz Bukhari, a veteran educator and pedagogical theorist with over two decades of experience preparing students for Cambridge O and A Level distinctions, international mathematics olympiads, and competitive university admissions.
          </p>
          <p class="ssr-p">
            EBM is founded on the empirical insight of educational psychologist Benjamin Bloom: one-on-one mastery tutoring can elevate the average student's performance two standard deviations above conventional classroom instruction (Bloom's 2 Sigma Problem). EBM leverages systematic diagnostic baselines, cognitive load optimization, and intelligent Socratic feedback to make this level of personalized acceleration accessible to every student.
          </p>
        </section>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Evidence-Based Mastery</h3>
            <p class="ssr-p">Students must demonstrate 85%+ conceptual comprehension on prerequisite skills before advancing. This eliminates the compounding learning debt that undermines traditional schooling.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Cognitive Acceleration</h3>
            <p class="ssr-p">Rather than passive drill-and-practice, we challenge students with cognitive dissonance and guided problem-solving, rapidly maturing their metacognitive and analytical reasoning faculties.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Transparent Telemetry</h3>
            <p class="ssr-p">Parents are active partners in their children's academic journey, equipped with real-time dashboards detailing skill retention curves, study velocity, and milestone achievements.</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Foundational Research Publications by Syed Ejaz Bukhari</h2>
          <p class="ssr-p">Explore research papers authored by Syed Ejaz Bukhari documenting the cognitive and pedagogical underpinnings of the EBM framework:</p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-personalized-learning-supports-students">Personalized Learning Pathways</a></h4>
              <p class="ssr-p">Analyzing adaptive pacing and how individual cognitive tailoring overcomes Bloom's 2 Sigma Problem.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-students-develop-mathematical-thinking">Mathematical Problem Solving</a></h4>
              <p class="ssr-p">Bridging mechanical formula memorization to high-order deductive mathematical intuition.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/understanding-learning-mastery">Diagnostic Baselines & Mastery</a></h4>
              <p class="ssr-p">Isolating error vectors and foundational prerequisite knowledge gaps through psychometric testing.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/cognitive-acceleration-stem-foundations">Cognitive Acceleration in STEM</a></h4>
              <p class="ssr-p">Developing abstract schema maturity for Cambridge IGCSE and O/A Level STEM excellence.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/ai-socratic-tutoring-self-directed-learning">Socratic AI Tutoring Framework</a></h4>
              <p class="ssr-p">Guiding independent student inquiry through inverse prompting dialogue without cognitive offloading.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-center">
          <h2 class="ssr-h2">Begin Your Child's Journey to Academic Distinction</h2>
          <p class="ssr-p">Take our initial diagnostic assessment to map strengths and uncover tailored growth opportunities across Grade 1 to Cambridge O/A Levels.</p>
          <a href="/assessment" class="ssr-btn ssr-btn-primary ssr-mt-md">Take Diagnostic Baseline Assessment</a>
        </section>
      </main>
    `;
  }
  // 5. Assessment (/assessment)
  else if (cleanPath === "/assessment") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Diagnostic Evaluation</span>
          <h1 class="ssr-h1">Diagnostic Learning Assessment & Baseline</h1>
          <p class="ssr-lead">
            Evaluate academic strengths, identify specific learning gaps, and receive a customized cognitive acceleration roadmap from Grade 1 through Cambridge O/A Levels.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Precision Gap Identification</h3>
            <p class="ssr-p">We assess not only whether an answer is correct, but the underlying cognitive pathway: distinguishing between conceptual misunderstanding, procedural slips, and working memory fatigue.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Adaptive Testing Engine</h3>
            <p class="ssr-p">Question difficulty dynamically recalibrates in real time based on student responses, pinpointing exact developmental thresholds without inducing unnecessary testing fatigue.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Customized Learning Blueprint</h3>
            <p class="ssr-p">Receive an exhaustive multi-page report complete with skill mastery percentages, Cambridge syllabus readiness scores, and a step-by-step personalized learning itinerary.</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Assessment Disciplines Available</h2>
          <ul class="ssr-list">
            <li><strong>Primary Mathematics & Numeracy:</strong> Number operations, fractions, decimals, percentages, visual geometry, mental math strategy, and word problem translation.</li>
            <li><strong>Middle School STEM Readiness:</strong> Pre-algebra, linear equations, ratios, proportional reasoning, coordinate geometry, data interpretation, scientific inquiry, and logic puzzles.</li>
            <li><strong>Cambridge IGCSE & O-Level:</strong> Comprehensive syllabus diagnostics for Mathematics (Syllabus D), Additional Mathematics, Physics, Chemistry, and Biology.</li>
            <li><strong>Cambridge International A-Level:</strong> Advanced diagnostics covering Pure Mathematics 1 & 3, Mechanics 1, Probability & Statistics 1, and Advanced Physics.</li>
          </ul>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Research Foundations Behind Diagnostic Assessment</h2>
          <p class="ssr-p">Our diagnostic methodologies are grounded in extensive cognitive science and educational research:</p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h4 class="ssr-h4"><a href="/blog/understanding-learning-mastery">Read: Understanding Learning Mastery: Why Diagnostic Baselines Matter &rarr;</a></h4>
              <p class="ssr-p">Discover how psychometric baseline evaluations distinguish conceptual flaws from procedural slips to accelerate intervention.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-personalized-learning-supports-students">Read: How Personalized Learning Supports Student Progress &rarr;</a></h4>
              <p class="ssr-p">Learn how dynamic diagnostic adaptation enables students to progress at their optimal cognitive velocity.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">The 4-Stage Diagnostic Evaluation Protocol</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Stage 1: Foundational Skill Screening</h3>
              <p class="ssr-p">Rapidly evaluates core arithmetic operations, algebraic fluency, and procedural speed to verify whether prerequisite mathematical reflexes are fluent.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Stage 2: Conceptual Schema Probing</h3>
              <p class="ssr-p">Presents multi-step contextual word problems requiring cross-disciplinary synthesis to measure genuine conceptual understanding versus rote memory.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Stage 3: Error Vector Categorization</h3>
              <p class="ssr-p">Systematically isolates the root cause of every incorrect response: misread constraints, algorithmic sign errors, formula misapplications, or cognitive fatigue.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Stage 4: Personalized Action Plan Generation</h3>
              <p class="ssr-p">Produces an individualized learning roadmap prescribing the exact sequence of remedial micro-modules and advanced acceleration goals tailored to Cambridge distinction criteria.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-center">
          <h2 class="ssr-h2">Ready to Discover Your Academic Baseline?</h2>
          <p class="ssr-p">Take our online diagnostic assessment now. It takes approximately 45 to 60 minutes and delivers an immediate preliminary cognitive report.</p>
          <a href="/register" class="ssr-btn ssr-btn-primary ssr-mt-md">Start Your Free Diagnostic Assessment</a>
        </section>
      </main>
    `;
  }
  // 6. Programs (/programs)
  else if (cleanPath === "/programs") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Curriculum Pathways</span>
          <h1 class="ssr-h1">Personalized Academic Programs</h1>
          <p class="ssr-lead">
            Systematically structured educational programs spanning Primary Foundations through Cambridge Advanced Level Distinctions, tailored to every student's cognitive pace.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Primary Foundations (Grades 1-5)</h3>
            <p class="ssr-p">Designed to nurture intrinsic curiosity, strong arithmetic intuition, phonics, and reading comprehension. Students master fundamental number operations, place value, and spatial relationships.</p>
            <ul class="ssr-list">
              <li>Core Arithmetic & Mental Calculation Mastery</li>
              <li>Visual Geometry & Pattern Recognition</li>
              <li>Early Scientific Observation & Hypothesizing</li>
              <li>Vocabulary & Critical Reading Comprehension</li>
            </ul>
          </div>

          <div class="ssr-card">
            <h3 class="ssr-h3">Middle School Acceleration (Grades 6-8)</h3>
            <p class="ssr-p">Transitioning students from concrete arithmetic to abstract algebraic thinking and systematic scientific reasoning. Preparing students for the rigorous demands of Cambridge secondary coursework.</p>
            <ul class="ssr-list">
              <li>Pre-Algebra, Linear Equations & Graphing</li>
              <li>Ratios, Percentages & Proportional Thinking</li>
              <li>Foundations of Biology, Chemistry & Physics</li>
              <li>Structured Essay Formulation & Literary Analysis</li>
            </ul>
          </div>

          <div class="ssr-card">
            <h3 class="ssr-h3">Cambridge O-Level & IGCSE (Grades 9-10)</h3>
            <p class="ssr-p">Targeted syllabus coverage with thorough past-paper problem analysis. We train students in Cambridge marking scheme expectations, exam timing discipline, and high-yield question strategies.</p>
            <ul class="ssr-list">
              <li>Mathematics Syllabus D & Additional Mathematics</li>
              <li>Physics, Chemistry & Biology Theory + ATP Practicals</li>
              <li>Computer Science (Python, Algorithms & Pseudocode)</li>
              <li>Past Paper Topical & Yearly Mastery Sprints</li>
            </ul>
          </div>

          <div class="ssr-card">
            <h3 class="ssr-h3">Cambridge A-Level Distinction (Grades 11-12)</h3>
            <p class="ssr-p">Advanced academic training for students targeting top-tier global university placements. Comprehensive derivation, mathematical proofs, and analytical modeling across demanding STEM fields.</p>
            <ul class="ssr-list">
              <li>Pure Mathematics (P1, P3 Calculus & Vectors)</li>
              <li>Mechanics (M1) & Statistics (S1) Applications</li>
              <li>Advanced Physics, Chemistry & Computer Science</li>
              <li>Competitive Olympiad & University Entrance Prep</li>
            </ul>
          </div>
        </section>

        <!-- Pedagogical Research Supporting Our Programs -->
        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Pedagogical Research Supporting Our Curricula</h2>
          <p class="ssr-p">Each syllabus track in the Ejaz Bukhari Method is backed by published educational research:</p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h4 class="ssr-h4"><a href="/blog/cognitive-acceleration-stem-foundations">Read: Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM &rarr;</a></h4>
              <p class="ssr-p">How structured cognitive conflict transitions primary and middle school learners into top-percentile Cambridge scholars.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-students-develop-mathematical-thinking">Read: How Students Develop Mathematical Thinking and Problem Solving &rarr;</a></h4>
              <p class="ssr-p">The cognitive roadmap for mastering Cambridge O and A Level Mathematics D and Additional Mathematics.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-personalized-learning-supports-students">Read: How Personalized Learning Supports Student Progress &rarr;</a></h4>
              <p class="ssr-p">Why individualized pacing and diagnostic adaptation prevent cumulative academic debt across all grade levels.</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  // 7. Learning Portal (/learning)
  else if (cleanPath === "/learning") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block">
          <span class="ssr-badge">Interactive Learning Space</span>
          <h1 class="ssr-h1">EBM Interactive Learning Portal</h1>
          <p class="ssr-lead">
            Access personalized learning modules, syllabus roadmaps, guided problem sets, and interactive exercises calibrated to your individual diagnostic baseline.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Step-by-Step Guided Lessons</h3>
            <p class="ssr-p">Each topic is deconstructed into bite-sized micro-concepts paired with visual explanations, real-world applications, and worked examples to ensure deep retention.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Adaptive Practice Problem Sets</h3>
            <p class="ssr-p">Practice problems calibrate in real-time based on student accuracy. If a student struggles, the engine provides diagnostic scaffolding before re-testing the core skill.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Socratic AI Learning Assistant</h3>
            <p class="ssr-p">Whenever you encounter a challenging concept, our Socratic AI companion is ready 24/7 to provide guided hints, analogies, and step-by-step questions to help you solve it yourself.</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Core Learning Portal Features & Academic Capabilities</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Mastery Badges & Milestones</h3>
              <p class="ssr-p">Earn recognition for completing syllabus milestones with high accuracy thresholds and consistent study velocity.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Personalized Study Notebooks</h3>
              <p class="ssr-p">Save critical derivation notes, formula sheets, and error reviews directly in your cloud portal for rapid revision.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Exam Simulation Timers</h3>
              <p class="ssr-p">Simulate genuine Cambridge examination conditions with countdown timers and pacing telemetry feedback.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Error Log Analysis & Retesting</h3>
              <p class="ssr-p">Automatically catalog past mistakes into personalized review queues to permanently eliminate recurring conceptual errors.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Syllabus Learning Modules & Focus Disciplines</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Mathematics & Quantitative Reasoning</h3>
              <p class="ssr-p">From early number sense and visual fraction bars to advanced integral calculus, differential equations, vectors, and complex numbers for Cambridge O and A Level examinations.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Physics & Applied Mechanics</h3>
              <p class="ssr-p">Newtonian dynamics, kinematics, thermodynamics, electromagnetism, wave theory, quantum phenomena, and practical paper Alternative to Practical (ATP) experimental design.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Chemistry & Molecular Synthesis</h3>
              <p class="ssr-p">Stoichiometry, chemical equilibria, periodic trends, organic reaction pathways, reaction kinetics, and empirical lab calculations aligned with international syllabi.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Computer Science & Computational Thinking</h3>
              <p class="ssr-p">Algorithm formulation, structured pseudocode, Python programming fundamentals, data structures, boolean logic, and system architecture.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-center">
          <h2 class="ssr-h2">Personalize Your Learning Schedule Today</h2>
          <p class="ssr-p">Log in to continue your personalized learning track or register a new student account to establish your diagnostic baseline.</p>
          <div class="ssr-actions ssr-mt-md">
            <a href="/login" class="ssr-btn ssr-btn-primary">Go to Student Portal</a>
            <a href="/register" class="ssr-btn ssr-btn-secondary">Create Free Account</a>
          </div>
        </section>
      </main>
    `;
  }
  // 8. Analytics (/analytics) - Boosted Text Density
  else if (cleanPath === "/analytics") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Cognitive Intelligence & Progress Telemetry</span>
          <h1 class="ssr-h1">Cognitive Analytics & Learning Insights</h1>
          <p class="ssr-lead">
            Empowering students, parents, and educators with real-time mastery tracking, cognitive velocity measurement, and pedagogical data visualization from Grade 1 through Cambridge O/A Levels.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Cognitive Velocity Index (CVI)</h3>
            <p class="ssr-p">Quantifies how quickly a student transitions from novice cognitive load to fluent procedural mastery, providing actionable early-warning alerts for emerging conceptual roadblocks before they affect exam scores.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Retention Decay Curves & Spaced Repetition</h3>
            <p class="ssr-p">Grounded in the Ebbinghaus forgetting curve, our analytics schedule spaced-repetition reviews at mathematically optimal intervals to cement concepts into permanent, long-term working memory.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Predictive Exam Readiness & Grade Projections</h3>
            <p class="ssr-p">Simulates student performance across official Cambridge past papers to generate reliable grade forecasts (A*, A, B), guiding revision priorities weeks prior to final examination sittings.</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">How EBM Cognitive Analytics Operates</h2>
          <p class="ssr-p">
            Traditional schooling evaluates students using crude aggregate percentages: an 80% on a test says nothing about whether the missed 20% represents simple arithmetic slips or critical foundational gaps that will cripple future learning. EBM Cognitive Analytics provides multi-dimensional insight:
          </p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Diagnostic Error Decomposition</h3>
              <p class="ssr-p">Every incorrect attempt is tagged as conceptual misunderstanding, procedural slip, working memory overload, or time pressure. Interventions are precisely tailored to the specific error root cause.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Mastery Heatmaps Across Syllabi</h3>
              <p class="ssr-p">Visual representations of the complete Cambridge syllabus showing green (solidified 85%+ mastery), yellow (needs practice), and red (unaddressed gap) across every subtopic.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Longitudinal Velocity Tracking</h3>
              <p class="ssr-p">Measures how student study habits and practice frequency correlate with acceleration over months and years, empowering parents with objective, data-backed academic progress reviews.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Automated Milestone Reporting</h3>
              <p class="ssr-p">Weekly summary reports delivered directly to parents and students highlighting accomplishments, upcoming assessment deadlines, and targeted practice recommendations.</p>
            </div>
          </div>
        </section>

        <!-- Theoretical Research Supporting Telemetry -->
        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Theoretical Research Behind EBM Mastery Analytics</h2>
          <p class="ssr-p">Explore the theoretical papers documenting our longitudinal mastery tracking and cognitive velocity metrics:</p>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h4 class="ssr-h4"><a href="/blog/understanding-learning-mastery">Read: Understanding Learning Mastery: Why Diagnostic Baselines Matter &rarr;</a></h4>
              <p class="ssr-p">An exhaustive breakdown of error vector categorization, retention decay measurement, and baseline calibration.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/ai-socratic-tutoring-self-directed-learning">Read: The Role of Socratic AI Tutoring in Self-Directed Learning &rarr;</a></h4>
              <p class="ssr-p">How real-time dialectic analytics measure cognitive engagement, answer latency, and self-correction velocity.</p>
            </div>
            <div>
              <h4 class="ssr-h4"><a href="/blog/how-personalized-learning-supports-students">Read: How Personalized Learning Supports Student Progress &rarr;</a></h4>
              <p class="ssr-p">How individualized telemetry curves allow educators to pace learners at their optimal cognitive bandwidth.</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  // 9. Pricing (/pricing)
  else if (cleanPath === "/pricing") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Transparent Tuition</span>
          <h1 class="ssr-h1">Membership & Tuition Plans</h1>
          <p class="ssr-lead">
            Transparent, flexible tuition options for individualized academic coaching, diagnostic assessments, and Cambridge syllabus preparation.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Diagnostic Evaluation</h3>
            <p class="ssr-sub">Comprehensive Academic Baseline</p>
            <p class="ssr-p">Ideal for students seeking an authoritative audit of their academic standing, uncovering hidden foundational gaps, and generating an actionable learning roadmap.</p>
            <ul class="ssr-list">
              <li>Comprehensive multi-subject diagnostic test</li>
              <li>Detailed 12-page cognitive gap report</li>
              <li>Syllabus milestone readiness breakdown</li>
              <li>1-on-1 pedagogical counseling session</li>
            </ul>
          </div>

          <div class="ssr-card ssr-card-featured">
            <span class="ssr-badge-featured">Most Popular</span>
            <h3 class="ssr-h3">Core Academic Mastery</h3>
            <p class="ssr-sub">Ongoing Personalized Acceleration</p>
            <p class="ssr-p">Comprehensive curriculum access with weekly diagnostic tracking, interactive exercises, Socratic AI tutoring, and parental progress telemetry.</p>
            <ul class="ssr-list">
              <li>Full access to interactive learning portal</li>
              <li>24/7 Socratic AI Learning Companion</li>
              <li>Weekly adaptive micro-assessments</li>
              <li>Real-time parent progress dashboard</li>
            </ul>
          </div>

          <div class="ssr-card">
            <h3 class="ssr-h3">Cambridge Distinction</h3>
            <p class="ssr-sub">Intensive Exam Mentorship</p>
            <p class="ssr-p">For candidates aiming for top A* distinctions in Cambridge O-Level and A-Level examinations, featuring rigorous past paper dissection and senior mentorship.</p>
            <ul class="ssr-list">
              <li>Everything in Core Academic Mastery</li>
              <li>Topical and yearly past paper workshops</li>
              <li>Examiner marking scheme masterclasses</li>
              <li>Direct personalized coaching with Syed Ejaz Bukhari</li>
            </ul>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Frequently Asked Tuition & Enrollment Questions</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Can students switch between plans?</h3>
              <p class="ssr-p">Yes, students can upgrade or transition between the diagnostic audit and ongoing monthly or annual mastery tracks at any point during their academic term.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Is there a family or sibling discount?</h3>
              <p class="ssr-p">We offer tiered family enrollments for households with multiple students pursuing Cambridge primary, middle school, or O/A Level curricula.</p>
            </div>
            <div>
              <h3 class="ssr-h3">What is your 14-day mastery guarantee?</h3>
              <p class="ssr-p">If within 14 days of enrolling your child is not experiencing greater clarity and confidence in their mathematical problem-solving, you receive a complete, unconditional tuition refund.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Are learning materials and past papers included?</h3>
              <p class="ssr-p">Yes, all curated worksheets, classified past paper topical sets, Cambridge marking scheme dissection notes, and digital Socratic AI hours are fully included with zero hidden fees.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-center">
          <h2 class="ssr-h2">Take the First Step Toward Academic Distinction</h2>
          <p class="ssr-p">Begin with our comprehensive diagnostic baseline evaluation or schedule an educational counseling consultation with our academic director.</p>
          <div class="ssr-actions ssr-mt-md">
            <a href="/assessment" class="ssr-btn ssr-btn-primary">Book Diagnostic Baseline</a>
            <a href="/contact" class="ssr-btn ssr-btn-secondary">Contact Admissions Team</a>
          </div>
        </section>
      </main>
    `;
  }
  // 10. Blog Index (/blog)
  else if (cleanPath === "/blog") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block">
          <span class="ssr-badge">Educational Insights</span>
          <h1 class="ssr-h1">Educational Perspectives & Math Insights</h1>
          <p class="ssr-lead">
            Read the latest research-backed articles on personalized learning, mathematical problem-solving, cognitive acceleration, and Cambridge O/A Levels pedagogy from Syed Ejaz Bukhari.
          </p>
        </header>

        <section class="ssr-mb-lg">
          <h2 class="ssr-h2">Browse by Core Pedagogical Domain</h2>
          <div class="ssr-grid">
            <a href="/blog/category/personalized-learning" class="ssr-card ssr-card-link">
              <h3 class="ssr-h3">Personalized Learning</h3>
              <p class="ssr-p">Individualized pacing, mastery thresholds, and adaptive learning curricula from Grade 1 to O/A Levels.</p>
            </a>
            <a href="/blog/category/mathematical-thinking" class="ssr-card ssr-card-link">
              <h3 class="ssr-h3">Mathematical Thinking</h3>
              <p class="ssr-p">Conceptual derivation, problem-solving heuristics, and mathematical intuition across all grade levels.</p>
            </a>
            <a href="/blog/category/diagnostic-assessment" class="ssr-card ssr-card-link">
              <h3 class="ssr-h3">Diagnostic Assessment</h3>
              <p class="ssr-p">Baseline evaluations, error categorization, and longitudinal mastery metrics for student acceleration.</p>
            </a>
            <a href="/blog/category/cognitive-acceleration" class="ssr-card ssr-card-link">
              <h3 class="ssr-h3">Cognitive Acceleration</h3>
              <p class="ssr-p">Bridging primary foundational concepts to advanced Cambridge STEM distinctions and olympiad honors.</p>
            </a>
            <a href="/blog/category/ai-edtech" class="ssr-card ssr-card-link">
              <h3 class="ssr-h3">AI & EdTech</h3>
              <p class="ssr-p">Socratic dialogue assistants, digital practice environments, and modern educational technology in practice.</p>
            </a>
          </div>
        </section>

        <section>
          <h2 class="ssr-h2">Featured Educational Publications</h2>
          <div class="ssr-mb-md">
            <article class="ssr-card ssr-mb-md">
              <h3 class="ssr-h3"><a href="/blog/how-personalized-learning-supports-students">How Personalized Learning Supports Student Progress</a></h3>
              <p class="ssr-p">Discover how personalized learning and adaptive pacing help students overcome learning gaps and build lasting academic mastery from Grade 1 to O/A Levels.</p>
              <a href="/blog/how-personalized-learning-supports-students" class="ssr-link">Read Full Article &rarr;</a>
            </article>
            <article class="ssr-card ssr-mb-md">
              <h3 class="ssr-h3"><a href="/blog/how-students-develop-mathematical-thinking">How Students Develop Mathematical Thinking and Problem Solving</a></h3>
              <p class="ssr-p">Explore how structured problem solving, conceptual derivation, and logical reasoning build lasting mathematical fluency across school grades.</p>
              <a href="/blog/how-students-develop-mathematical-thinking" class="ssr-link">Read Full Article &rarr;</a>
            </article>
            <article class="ssr-card ssr-mb-md">
              <h3 class="ssr-h3"><a href="/blog/understanding-learning-mastery">Understanding Learning Mastery: Why Diagnostic Baselines Matter</a></h3>
              <p class="ssr-p">Learn why establishing diagnostic baselines and continuous mastery tracking are essential for identifying hidden gaps and accelerating student achievement.</p>
              <a href="/blog/understanding-learning-mastery" class="ssr-link">Read Full Article &rarr;</a>
            </article>
            <article class="ssr-card ssr-mb-md">
              <h3 class="ssr-h3"><a href="/blog/cognitive-acceleration-stem-foundations">Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM</a></h3>
              <p class="ssr-p">How early mathematical problem solving and cognitive scaffolding prepare students for the analytical rigor of Cambridge O and A Level sciences.</p>
              <a href="/blog/cognitive-acceleration-stem-foundations" class="ssr-link">Read Full Article &rarr;</a>
            </article>
            <article class="ssr-card ssr-mb-md">
              <h3 class="ssr-h3"><a href="/blog/ai-socratic-tutoring-self-directed-learning">The Role of Socratic AI Tutoring in Self-Directed Learning</a></h3>
              <p class="ssr-p">How AI-powered Socratic dialogue fosters independent critical thinking and conceptual mastery without spoon-feeding answers.</p>
              <a href="/blog/ai-socratic-tutoring-self-directed-learning" class="ssr-link">Read Full Article &rarr;</a>
            </article>
          </div>
        </section>
      </main>
    `;
  }
  // 11. Inspiration (/inspiration) - Boosted Text Density
  else if (cleanPath === "/inspiration") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Intellectual Curiosity & Discovery</span>
          <h1 class="ssr-h1">Mathematical Discoveries & STEM Inspiration</h1>
          <p class="ssr-lead">
            Inspiring educational stories, conceptual breakthroughs, and student achievements in mathematics, physics, and scientific inquiry from Grade 1 through Cambridge O/A Levels.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">The Beauty of Mathematical Proofs</h3>
            <p class="ssr-p">Discovering how ancient and modern mathematicians developed profound insights from simple axioms: from Euclid's geometric proofs and the infinitude of prime numbers to Euler's identity linking geometry, analysis, and complex numbers.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Physics & The Architecture of the Universe</h3>
            <p class="ssr-p">How calculus and physical intuition reveal the laws governing motion, gravitation, electromagnetism, and thermodynamic systems, unlocking student passion for applied STEM disciplines and real-world engineering.</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Turning Academic Struggles into Triumphs</h3>
            <p class="ssr-p">Real stories of students who transformed acute anxiety in mathematics into their greatest academic distinction through patient mentorship, deliberate practice, error normalization, and cognitive scaffolding.</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Giants of Mathematical & Scientific Thought</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">Srinivasa Ramanujan: Pure Mathematical Intuition</h3>
              <p class="ssr-p">Working largely in isolation in Kumbakonam, India, Ramanujan recorded thousands of novel mathematical theorems, infinite series, and continued fractions that continue to shape modern string theory and modular forms.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Leonhard Euler: The Master of Analysis</h3>
              <p class="ssr-p">Euler's prolific work created modern mathematical notation (f(x), e, i, &pi;) and founded graph theory with his solution to the Seven Bridges of Königsberg, illustrating how abstraction solves physical puzzles.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Ada Lovelace: Visionary of Computation</h3>
              <p class="ssr-p">Recognizing that Charles Babbage's Analytical Engine could manipulate symbols representing music, text, and scientific parameters, Lovelace authored the world's first computer algorithm in 1843.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Carl Friedrich Gauss: The Prince of Mathematicians</h3>
              <p class="ssr-p">From rapidly summing numbers 1 to 100 as a young schoolboy to constructing a regular 17-gon using straightedge and compass, Gauss exemplified how seeking underlying symmetries unlocks mathematical clarity.</p>
            </div>
          </div>
        </section>

        <section class="ssr-card ssr-center">
          <h2 class="ssr-h2">Cultivate Intellectual Passion in Your Student</h2>
          <p class="ssr-p">When mathematics is taught as an inspiring language of discovery rather than a mechanical chore, students naturally flourish.</p>
          <a href="/assessment" class="ssr-btn ssr-btn-primary ssr-mt-md">Explore Diagnostic Baseline Assessment &rarr;</a>
        </section>
      </main>
    `;
  }
  // 12. Case Studies (/case-studies or /casestudies)
  else if (cleanPath === "/case-studies" || cleanPath === "/casestudies") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Proven Results</span>
          <h1 class="ssr-h1">Student Success Journeys & Case Studies</h1>
          <p class="ssr-lead">
            Real stories of academic turnaround, olympiad achievements, and Cambridge O/A Level distinctions through the Ejaz Bukhari Method.
          </p>
        </header>

        <section class="ssr-mb-lg">
          <div class="ssr-card ssr-mb-md">
            <span class="ssr-badge">Turnaround Journey &bull; Grade D to A* Distinction</span>
            <h2 class="ssr-h2 ssr-mt-sm">Mastering Cambridge O-Level Additional Mathematics</h2>
            <p class="ssr-p">
              Ahmed joined EBM after receiving a D grade in his school mock exams. Through diagnostic baseline evaluation, we discovered gaps in quadratic inequalities and trigonometric transformations. In 5 months of targeted mastery coaching, Ahmed secured an A* in his official Cambridge sittings.
            </p>
          </div>
          <div class="ssr-card ssr-mb-md">
            <span class="ssr-badge">Cognitive Acceleration &bull; Primary to Olympiad Gold</span>
            <h2 class="ssr-h2 ssr-mt-sm">Accelerating Early Mathematical Talent</h2>
            <p class="ssr-p">
              Fatima entered the EBM primary foundation track in Grade 4. By tailoring her curriculum pace to her cognitive velocity, she completed middle school pre-algebra by Grade 5 and went on to achieve a regional gold medal in the International Kangaroo Mathematics Competition.
            </p>
          </div>
          <div class="ssr-card ssr-mb-md">
            <span class="ssr-badge">Advanced Distinction &bull; Cambridge A-Level Further Math</span>
            <h2 class="ssr-h2 ssr-mt-sm">Top-in-Region Distinction in Pure Mathematics</h2>
            <p class="ssr-p">
              Bilal achieved a Top in Region distinction in Cambridge A-Level Pure Mathematics under the direct guidance of Syed Ejaz Bukhari. Bilal successfully gained admission to Imperial College London to read Electrical Engineering.
            </p>
          </div>
        </section>
      </main>
    `;
  }
  // 13. Contact (/contact) - Boosted Text Density
  else if (cleanPath === "/contact") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block ssr-center">
          <span class="ssr-badge">Admissions & Counseling</span>
          <h1 class="ssr-h1">Contact Admissions & Educational Support</h1>
          <p class="ssr-lead">
            Get in touch with the EBM educational counseling team for diagnostic evaluation bookings, academic admissions, and platform support from Grade 1 through Cambridge O/A Levels.
          </p>
        </header>

        <section class="ssr-grid ssr-mb-lg">
          <div class="ssr-card">
            <h3 class="ssr-h3">Admissions & Diagnostic Consultations</h3>
            <p class="ssr-p">Our senior academic counselors evaluate your student's background, past report cards, and Cambridge exam target goals to construct a tailored diagnostic assessment.</p>
            <p class="ssr-p"><strong>Email:</strong> admissions@ejazbukharimethod.com</p>
            <p class="ssr-p"><strong>Consultation Hours:</strong> Monday &ndash; Saturday, 9:00 AM &ndash; 7:00 PM</p>
          </div>
          <div class="ssr-card">
            <h3 class="ssr-h3">Student & Parent Platform Support</h3>
            <p class="ssr-p">Need assistance with your portal access, password recovery, billing, or learning module assignments? Our educational support desk is available to assist you.</p>
            <p class="ssr-p"><strong>Email:</strong> support@ejazbukharimethod.com</p>
            <p class="ssr-p"><strong>Response Time:</strong> Within 12 business hours</p>
          </div>
        </section>

        <section class="ssr-card ssr-mb-lg">
          <h2 class="ssr-h2">Frequently Asked Admissions & Evaluation Questions</h2>
          <div class="ssr-grid ssr-mt-md">
            <div>
              <h3 class="ssr-h3">How long does a diagnostic assessment take?</h3>
              <p class="ssr-p">Initial baseline testing spans 45 to 60 minutes. The adaptive testing engine dynamically adjusts difficulty to measure the student's true cognitive threshold without fatigue.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Can students prepare online remotely?</h3>
              <p class="ssr-p">Yes! The EBM digital learning platform provides full interactive curriculum modules, digital problem sets, and 24/7 Socratic AI guidance accessible from any computer or tablet.</p>
            </div>
            <div>
              <h3 class="ssr-h3">Who conducts the 1-on-1 counseling?</h3>
              <p class="ssr-p">Diagnostic reviews are conducted by senior educational specialists trained under the direct methodology of Syed Ejaz Bukhari, delivering concrete pedagogical roadmaps.</p>
            </div>
            <div>
              <h3 class="ssr-h3">What subjects are available for Cambridge preparation?</h3>
              <p class="ssr-p">We specialize in Mathematics (Syllabus D & Additional Math), Pure Mathematics (P1, P3), Mechanics, Probability & Statistics, Physics, Chemistry, and Computer Science.</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  // 14. Privacy Policy (/privacy)
  else if (cleanPath === "/privacy") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block">
          <h1 class="ssr-h1">Privacy Policy & Student Data Protection</h1>
          <p class="ssr-sub">Effective Date: September 2026 &bull; Ejaz Bukhari Method (EBM) Digital Learning Platform</p>
        </header>
        <section class="ssr-article-body">
          <h2 class="ssr-h2">1. Introduction and Scope</h2>
          <p class="ssr-p">The Ejaz Bukhari Method (EBM, "we", "our", or "us") is dedicated to protecting the privacy and personal data of students, parents, guardians, and educators who access our educational platform, diagnostic assessments, and instructional portals.</p>
          <h2 class="ssr-h2">2. Information We Collect</h2>
          <p class="ssr-p">We collect information necessary to deliver high-quality, personalized academic instruction, including account credentials (name, email address, role), student academic level (grade level, Cambridge syllabus target), diagnostic response telemetry, and time-on-task metrics.</p>
          <h2 class="ssr-h2">3. How We Use Student Information</h2>
          <p class="ssr-p">Student information is used strictly for pedagogical purposes: generating individualized learning pathways, reporting progress to parents and registered teachers, adapting practice difficulty, and training our Socratic AI tutoring models securely without sharing data with third-party advertising brokers.</p>
          <h2 class="ssr-h2">4. Security and Data Protection</h2>
          <p class="ssr-p">We implement enterprise-grade encryption (TLS 1.3 in transit and AES-256 at rest) to safeguard all stored records. Access to student progress telemetry is strictly restricted to authenticated students, authorized parents, and verified instructors.</p>
          <h2 class="ssr-h2">5. Parental Rights and Data Portability</h2>
          <p class="ssr-p">Parents and legal guardians have the full legal right to review, update, export, or request the permanent deletion of their student's records at any time by contacting our dedicated data privacy office at privacy@ejazbukharimethod.com.</p>
        </section>
      </main>
    `;
  }
  // 15. Terms & Conditions (/terms)
  else if (cleanPath === "/terms") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <header class="ssr-header-block">
          <h1 class="ssr-h1">Terms and Conditions of Service</h1>
          <p class="ssr-sub">Effective Date: September 2026 &bull; Ejaz Bukhari Method (EBM)</p>
        </header>
        <section class="ssr-article-body">
          <h2 class="ssr-h2">1. Agreement to Terms</h2>
          <p class="ssr-p">By accessing or utilizing the Ejaz Bukhari Method (EBM) learning platform, diagnostic assessments, instructional tools, or digital portals, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          <h2 class="ssr-h2">2. User Accounts and Security</h2>
          <p class="ssr-p">Users are responsible for maintaining the confidentiality of their portal credentials and for all activities that occur under their account. You agree to immediately notify EBM of any unauthorized use or security breach.</p>
          <h2 class="ssr-h2">3. Intellectual Property Rights</h2>
          <p class="ssr-p">All curriculum materials, proprietary diagnostic baseline algorithms, practice questions, lesson plans, videos, and pedagogical documentation are the exclusive intellectual property of Syed Ejaz Bukhari and EBM.</p>
          <h2 class="ssr-h2">4. Academic Integrity & Conduct</h2>
          <p class="ssr-p">Students must complete diagnostic assessments and learning modules independently to ensure that pedagogical insights reflect their genuine understanding and learning needs.</p>
          <h2 class="ssr-h2">5. Subscription Terms & Refund Policies</h2>
          <p class="ssr-p">Tuition plans are billed transparently as outlined during enrollment. Subscribers may modify or cancel ongoing monthly memberships prior to the next billing cycle through their account settings.</p>
        </section>
      </main>
    `;
  }
  // 16. Login (/login) - Boosted Text Density
  else if (cleanPath === "/login") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <div class="ssr-card ssr-auth-card">
          <div class="ssr-center ssr-mb-md">
            <span class="ssr-badge">Portal Sign In</span>
            <h1 class="ssr-h2">Sign In to Your EBM Account</h1>
            <p class="ssr-p">Access your personalized student dashboard, parent insights feed, or educator classroom management suite.</p>
          </div>
          <div class="ssr-auth-info ssr-mb-md">
            <h3 class="ssr-h3">What You Can Access Inside the EBM Platform:</h3>
            <ul class="ssr-list">
              <li><strong>Student Dashboard:</strong> Daily practice assignments, syllabus roadmaps, and 24/7 Socratic AI guidance.</li>
              <li><strong>Parent Progress Portal:</strong> Real-time cognitive velocity charts, diagnostic reports, and milestone tracking.</li>
              <li><strong>Educator Tools:</strong> Cohort mastery heatmaps, assignment distributions, and Cambridge exam projections.</li>
            </ul>
          </div>
          <div class="ssr-auth-security ssr-mb-md">
            <h3 class="ssr-h3">Platform Security & Access Guidelines:</h3>
            <p class="ssr-p">All student records, diagnostic answers, and academic evaluations are protected by enterprise-grade TLS 1.3 encryption in transit and AES-256 at rest. We adhere strictly to FERPA and COPPA privacy standards to safeguard minors' educational records.</p>
            <p class="ssr-subtext">Supported across all modern browsers including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge on desktop, tablet, and mobile devices.</p>
          </div>
          <div class="ssr-card ssr-mb-md" style="background:#f8fafc;">
            <h3 class="ssr-h3">Account Support & FAQs:</h3>
            <p class="ssr-p"><strong>Forgotten Password?</strong> Use the self-service reset tool or reach our technical support desk at support@ejazbukharimethod.com.</p>
            <p class="ssr-p"><strong>Linking Parent & Student Profiles:</strong> Parents can link multiple student accounts to a single guardian dashboard for unified academic monitoring.</p>
          </div>
          <div class="ssr-center ssr-border-top ssr-pt-md">
            <p class="ssr-p">New to the Ejaz Bukhari Method? <a href="/register" class="ssr-link">Create an Account</a> or <a href="/assessment" class="ssr-link">Book a Diagnostic Assessment</a>.</p>
          </div>
        </div>
      </main>
    `;
  }
  // 17. Register (/register) - Boosted Text Density
  else if (cleanPath === "/register") {
    mainContent = `
      <main class="ssr-container ssr-main">
        <div class="ssr-card ssr-auth-card">
          <div class="ssr-center ssr-mb-md">
            <span class="ssr-badge">New Account Enrollment</span>
            <h1 class="ssr-h2">Create Your EBM Platform Account</h1>
            <p class="ssr-p">Begin your child's journey toward evidence-based academic excellence, mathematical clarity, and Cambridge distinctions.</p>
          </div>
          <div class="ssr-auth-info ssr-mb-md">
            <h3 class="ssr-h3">Why Families & Students Choose EBM:</h3>
            <ul class="ssr-list">
              <li><strong>Adaptive Diagnostic Baselines:</strong> Pinpoint exact conceptual strengths and gaps before assigning coursework.</li>
              <li><strong>Personalized Mastery Trajectories:</strong> Progress at optimal cognitive velocity without classroom bottlenecks.</li>
              <li><strong>Cambridge Exam Focus:</strong> Decoded marking schemes and past paper workshops for top A* distinctions.</li>
              <li><strong>Socratic AI Learning Co-Pilot:</strong> 24/7 step-by-step guidance fostering critical independent reasoning.</li>
            </ul>
          </div>
          <div class="ssr-auth-steps ssr-mb-md">
            <h3 class="ssr-h3">Simple 3-Step Onboarding Process:</h3>
            <p class="ssr-p"><strong>1. Register:</strong> Create student and parent accounts in under two minutes with zero upfront payment required.</p>
            <p class="ssr-p"><strong>2. Evaluate:</strong> Complete the initial adaptive diagnostic baseline assessment in mathematics or sciences.</p>
            <p class="ssr-p"><strong>3. Accelerate:</strong> Receive your custom cognitive learning roadmap and begin personalized mastery modules.</p>
          </div>
          <div class="ssr-card ssr-mb-md" style="background:#f8fafc;">
            <h3 class="ssr-h3">Enrollment Information & Frequently Asked Questions:</h3>
            <p class="ssr-p"><strong>Which grade levels can enroll?</strong> EBM supports students from Grade 1 primary foundations up through Cambridge IGCSE, O-Level, and A-Level examinations.</p>
            <p class="ssr-p"><strong>What subjects are offered?</strong> Mathematics (Syllabus D, Additional Math, Pure Mathematics, Mechanics, Statistics), Physics, Chemistry, Biology, and Computer Science.</p>
            <p class="ssr-p"><strong>Privacy Guarantee:</strong> We never sell or share student data with advertisers. Student learning metrics are used exclusively for pedagogical enhancement.</p>
          </div>
          <div class="ssr-center ssr-border-top ssr-pt-md">
            <p class="ssr-p">Already registered? <a href="/login" class="ssr-link">Sign In to Your Account</a>.</p>
          </div>
        </div>
      </main>
    `;
  }
  // Default fallback for portal routes or unhandled paths
  else {
    mainContent = `
      <main class="ssr-container ssr-main">
        <h1 class="ssr-h1">Ejaz Bukhari Method (EBM)</h1>
        <p class="ssr-lead">
          Personalized Learning Platform for Grade 1 through Cambridge O/A Levels. Combining structured diagnostic baselines, adaptive mastery pacing, cognitive acceleration, and AI-enhanced educational tools.
        </p>
        <div class="ssr-actions ssr-mt-md">
          <a href="/programs" class="ssr-btn ssr-btn-primary">Explore Academic Programs</a>
          <a href="/assessment" class="ssr-btn ssr-btn-secondary">Diagnostic Assessment</a>
        </div>
      </main>
    `;
  }

  // Concise SSR Baseline CSS for instant clean layout without bloating HTML markup bytes
  const ssrStyles = `
    <style id="ebm-ssr-styles">
      .ssr-container { max-width: 1140px; margin: 0 auto; padding: 0 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .ssr-header { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 0; }
      .ssr-header-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
      .ssr-logo { font-size: 20px; font-weight: 800; color: #0f172a; text-decoration: none; }
      .ssr-accent { color: #2563eb; font-weight: 600; font-size: 15px; }
      .ssr-nav { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; font-size: 14px; font-weight: 500; }
      .ssr-nav a { color: #334155; text-decoration: none; }
      .ssr-nav-cta { color: #2563eb !important; font-weight: 700; }
      .ssr-main { padding: 40px 20px; }
      .ssr-hero { text-align: center; max-width: 860px; margin: 0 auto 56px; }
      .ssr-header-block { margin-bottom: 40px; }
      .ssr-h1 { font-size: 38px; line-height: 1.2; font-weight: 900; color: #0f172a; margin: 12px 0 16px; letter-spacing: -0.5px; }
      .ssr-h2 { font-size: 24px; line-height: 1.3; font-weight: 800; color: #0f172a; margin: 0 0 12px; }
      .ssr-h3 { font-size: 18px; line-height: 1.4; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
      .ssr-lead { font-size: 18px; line-height: 1.65; color: #475569; margin: 0 0 24px; }
      .ssr-sub { font-size: 15px; color: #64748b; margin: 0 0 16px; }
      .ssr-p { font-size: 15px; line-height: 1.65; color: #334155; margin: 0 0 14px; }
      .ssr-list { padding-left: 20px; font-size: 15px; line-height: 1.8; color: #334155; margin: 0 0 16px; }
      .ssr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
      .ssr-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
      .ssr-card-featured { border: 2px solid #2563eb; position: relative; }
      .ssr-badge-featured { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 9999px; text-transform: uppercase; }
      .ssr-card-link { text-decoration: none; color: inherit; display: block; }
      .ssr-badge { display: inline-block; background: #eff6ff; color: #2563eb; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 8px; }
      .ssr-btn { display: inline-block; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 700; text-decoration: none; }
      .ssr-btn-primary { background: #2563eb; color: #ffffff; }
      .ssr-btn-secondary { background: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; }
      .ssr-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
      .ssr-center { text-align: center; }
      .ssr-link { color: #2563eb; font-weight: 600; text-decoration: none; }
      .ssr-tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
      .ssr-tag { background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 6px; text-decoration: none; color: #1e293b; font-size: 14px; font-weight: 600; }
      .ssr-auth-card { max-width: 620px; margin: 40px auto; padding: 36px; }
      .ssr-auth-info { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; }
      .ssr-subtext { font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; }
      .ssr-border-top { border-top: 1px solid #f1f5f9; }
      .ssr-pt-md { padding-top: 18px; }
      .ssr-mt-sm { margin-top: 8px; }
      .ssr-mt-md { margin-top: 18px; }
      .ssr-mt-lg { margin-top: 32px; }
      .ssr-mb-md { margin-bottom: 20px; }
      .ssr-mb-lg { margin-bottom: 36px; }
      .ssr-mb-xl { margin-bottom: 56px; }
      .ssr-footer { background: #0f172a; color: #94a3b8; padding: 48px 0 24px; margin-top: auto; }
      .ssr-footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; margin-bottom: 32px; }
      .ssr-footer h3 { color: #ffffff; font-size: 16px; font-weight: 700; margin: 0 0 12px; }
      .ssr-footer h4 { color: #ffffff; font-size: 14px; font-weight: 600; margin: 0 0 12px; }
      .ssr-footer p { font-size: 14px; line-height: 1.6; margin: 0 0 12px; }
      .ssr-footer ul { list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2; }
      .ssr-footer a { color: #cbd5e1; text-decoration: none; }
      .ssr-footer-bottom { border-top: 1px solid #1e293b; padding-top: 20px; font-size: 13px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    </style>
  `;

  return `
    <div style="display:flex;flex-direction:column;min-height:100vh;">
      ${ssrStyles}
      ${commonHeader}
      ${mainContent}
      ${commonFooter}
    </div>
  `;
}
