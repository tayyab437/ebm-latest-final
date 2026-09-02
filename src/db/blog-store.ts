import fs from "fs";
import path from "path";
import { getDb } from "./index.js";
import * as schema from "./schema.js";
import { eq, and, desc, asc, like, or, sql } from "drizzle-orm";
import type { BlogPost, BlogCategory, BlogAuthor, BlogRedirect, PostStatus, BlogFilterOptions } from "../types/blog.types.js";
import { parseTags } from "../types/blog.types.js";

const DEFAULT_AUTHOR: BlogAuthor = {
  id: "author-ejaz-bukhari",
  name: "Syed Ejaz Bukhari",
  slug: "syed-ejaz-bukhari",
  role: "Founder & Director of Pedagogy",
  bio: "Senior educator, Cambridge syllabus specialist, and creator of the Ejaz Bukhari Method (EBM) dedicated to personalized cognitive acceleration and STEM excellence.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  email: "admin@ebm.edu",
  socialLinks: {
    facebook: "https://www.facebook.com/syedejazbukhari/",
    instagram: "https://www.instagram.com/syedejaz_bukhari/",
    website: "https://ejazbukharimethod.com"
  },
  postCount: 5,
  createdAt: new Date().toISOString()
};

const DEFAULT_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-personalized-learning",
    name: "Personalized Learning",
    slug: "personalized-learning",
    description: "Pedagogical frameworks and data-driven methods for tailored student academic acceleration.",
    seoTitle: "Personalized Learning Articles & Guides | EBM Blog",
    seoDescription: "Explore evidence-based research and practical strategies on personalized learning and differentiated instruction.",
    color: "blue",
    icon: "Sparkles",
    postCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "cat-mathematical-thinking",
    name: "Mathematical Thinking",
    slug: "mathematical-thinking",
    description: "Strategies for deep conceptual problem solving, calculus logic, and analytical derivation.",
    seoTitle: "Mathematical Thinking & Problem Solving | EBM Blog",
    seoDescription: "Guidance on developing logical derivation, spatial visualization, and O-Level math mastery.",
    color: "emerald",
    icon: "Brain",
    postCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "cat-diagnostic-assessment",
    name: "Diagnostic Assessment",
    slug: "diagnostic-assessment",
    description: "Using adaptive diagnostics and mastery baselines to guide targeted learning interventions.",
    seoTitle: "Diagnostic Learning Assessment Insights | EBM Blog",
    seoDescription: "Learn how adaptive diagnostic assessments uncover student learning gaps and accelerate mastery.",
    color: "amber",
    icon: "Target",
    postCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "cat-cognitive-acceleration",
    name: "Cognitive Acceleration",
    slug: "cognitive-acceleration",
    description: "Structured pathways connecting primary foundational skills to advanced O/A Level STEM mastery.",
    seoTitle: "Cognitive Acceleration & STEM Learning | EBM Blog",
    seoDescription: "Pedagogical blueprints for transitioning students into independent, high-speed problem solvers.",
    color: "purple",
    icon: "Zap",
    postCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "cat-ai-edtech",
    name: "AI & EdTech",
    slug: "ai-edtech",
    description: "The thoughtful integration of Socratic AI co-pilots, diagnostic tools, and modern digital learning.",
    seoTitle: "AI & Educational Technology in Practice | EBM Blog",
    seoDescription: "Insights on using Socratic AI and intelligent analytics to foster genuine critical thinking.",
    color: "cyan",
    icon: "Bot",
    postCount: 1,
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "post-personalized-learning",
    title: "How Personalized Learning Supports Student Progress",
    slug: "how-personalized-learning-supports-students",
    excerpt: "Personalized learning transforms educational outcomes by adapting pacing, curriculum pathways, and diagnostic feedback to every student's cognitive baseline.",
    content: `
<h2>What Is Personalized Learning?</h2>
<p>In traditional classroom environments, instruction is structured around a one-size-fits-all model. Every student is expected to assimilate complex mathematical and scientific concepts at the exact same pace, regardless of their prior cognitive baselines or individual learning speed. <strong>Personalized learning</strong> fundamentally reconfigures this paradigm by tailoring the learning pace, instructional approach, and syllabus sequence to the unique needs of each learner.</p>

<p>Rather than advancing students based on arbitrary calendar schedules, personalized education utilizes mastery-based progression: learners demonstrate genuine competence in a foundational concept before progressing to more demanding material.</p>

<h2>Why Personalized Learning Matters for Modern Learners</h2>
<p>Students often experience educational plateaus when foundational gaps go unnoticed. In subjects like Mathematics and Physics, a minor misunderstanding in algebraic factoring or vector resolution can cascade into severe conceptual hurdles during O-Level preparation.</p>

<blockquote>
  "True educational mastery occurs when a learner is neither overwhelmed by premature complexity nor slowed down by redundant repetition. Adaptive pacing creates the optimal zone of proximal development."
</blockquote>

<p>Key advantages of structured personalized learning include:</p>
<ul>
  <li><strong>Targeted Gap Identification:</strong> Continuous diagnostic checkpoints pinpoint exact concept gaps before they compound.</li>
  <li><strong>Self-Directed Ownership:</strong> Learners set milestones, evaluate their own problem-solving methods, and develop intrinsic academic discipline.</li>
  <li><strong>Optimal Cognitive Load:</strong> Bite-sized, modular learning units reduce cognitive fatigue while sustaining high retention rates.</li>
</ul>

<h2>Supporting Different Learning Needs</h2>
<p>Every student exhibits distinct strengths. Some grasp geometric properties visually through interactive 3D simulations, while others excel through step-by-step Socratic verbal derivations. Personalized learning systems recognize these differences and offer adaptive modalities, ensuring that high achievers are continually challenged with olympiad-level problems while students needing reinforcement receive targeted mini-drills.</p>

<h2>How EBM Applies Personalized Learning</h2>
<p>At EBM, personalized learning is implemented through a robust three-stage cognitive framework:</p>
<ol>
  <li><strong>Adaptive Diagnostic Baselines:</strong> Students begin with the <a href="/assessment">EBM Diagnostic Assessment</a> to identify specific strengths and learning needs across core subjects.</li>
  <li><strong>Dynamic Analytics & Milestones:</strong> Real-time performance tracking in our <a href="/analytics">Learning Analytics Arena</a> reveals cognitive velocity and mastery percentages.</li>
  <li><strong>Structured Academic Programs:</strong> Our multi-year <a href="/programs">Academic Programs</a> provide structured roadmaps from Grade 1 foundations through Cambridge O/A Levels.</li>
</ol>

<h2>Conclusion</h2>
<p>Personalized learning is not simply a digital convenience; it is a scientifically validated methodology that empowers every student to achieve intellectual autonomy and academic excellence.</p>
`,
    categoryId: "cat-personalized-learning",
    categoryName: "Personalized Learning",
    categorySlug: "personalized-learning",
    secondaryCategoryIds: ["cat-cognitive-acceleration"],
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: "Student studying with organized notebooks and digital learning materials in a focused workspace",
    featuredImageCaption: "Adaptive pacing allows learners to build deep conceptual competence without undue pressure.",
    authorId: "author-ejaz-bukhari",
    authorName: "Syed Ejaz Bukhari",
    authorRole: "Founder & Director of Pedagogy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    authorSlug: "syed-ejaz-bukhari",
    status: "published",
    isFeatured: true,
    publishedAt: "2026-08-20T08:00:00.000Z",
    updatedAt: "2026-08-25T10:30:00.000Z",
    createdAt: "2026-08-15T09:00:00.000Z",
    seoTitle: "How Personalized Learning Supports Student Progress | EBM",
    seoDescription: "Discover how personalized learning and adaptive pacing help students overcome learning gaps and build lasting academic mastery from Grade 1 to O/A Levels.",
    ogImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    canonicalUrl: "https://ejazbukharimethod.com/blog/how-personalized-learning-supports-students",
    readingTime: 4,
    tags: ["Personalized Learning", "Pedagogy", "Student Progress", "Adaptive Pacing"],
    relatedPostIds: ["post-mathematical-thinking", "post-learning-mastery"],
    noindex: false,
    views: 0,
    ctaType: "assessment",
    ctaLink: "/assessment",
    ctaText: "Explore the EBM Diagnostic Assessment"
  },
  {
    id: "post-mathematical-thinking",
    title: "How Students Develop Mathematical Thinking and Problem Solving",
    slug: "how-students-develop-mathematical-thinking",
    excerpt: "Moving beyond rote memorization: how conceptual derivation, visualization, and Socratic feedback build lasting mathematical intuition in O-Level candidates.",
    content: `
<h2>The Limit of Rote Formula Memorization</h2>
<p>One of the most persistent hurdles in secondary mathematics education is the reliance on mechanical formula memorization. When students simply memorize algorithms without understanding the underlying geometric or algebraic relationships, they struggle when presented with non-routine, multi-step exam questions.</p>

<p>Mathematical thinking is not the ability to recall formulas; it is the cognitive capacity to deconstruct unfamiliar problems, establish logical hypotheses, and derive solutions through structured reasoning.</p>

<h2>Core Pillars of Mathematical Thinking</h2>
<p>To cultivate robust mathematical intuition, learners must transition through three key developmental stages:</p>

<h3>1. Concrete Visualization</h3>
<p>Before manipulating abstract symbols, students should visualize mathematical relationships. Whether exploring the geometric meaning of quadratic roots or interpreting velocity-time integrals, visual models provide the mental anchors necessary for deep comprehension.</p>

<h3>2. Socratic Deconstruction</h3>
<p>When a learner makes an error in a calculation, directly providing the final answer suppresses cognitive growth. Instead, guided questioning—such as <em>"What assumption did we make about the signs?"</em> or <em>"How does this balance equation change if the variable is negative?"</em>—prompts the learner to locate and correct their own misconceptions.</p>

<h3>3. Logical Derivation and Transfer</h3>
<p>Once a principle is mastered in a pure mathematical context, students apply it to physical and computational scenarios, strengthening neural connections and conceptual agility.</p>

<h2>Practical Strategies for Educators and Parents</h2>
<p>Parents and mentors can foster mathematical confidence with actionable daily practices:</p>
<ul>
  <li><strong>Praise the Reasoning, Not Just the Speed:</strong> Ask students to explain <em>how</em> they arrived at a solution rather than prioritizing rapid calculations.</li>
  <li><strong>Encourage Multiple Solution Paths:</strong> Celebrate when a learner solves a trigonometry or algebraic problem using an alternative, creative route.</li>
  <li><strong>Track Skill Progression:</strong> Use the <a href="/analytics">EBM Learning Analytics</a> dashboard to monitor precision trends across different mathematical sub-domains.</li>
</ul>

<h2>How the Ejaz Bukhari Method Builds Elite STEM Competence</h2>
<p>Through our dedicated <a href="/learning">EBM Learning Portal</a>, students engage with interactive problem banks, guided Socratic feedback loops, and rigorous Cambridge O-Level past paper analyses designed to produce confident, independent mathematical thinkers.</p>
`,
    categoryId: "cat-mathematical-thinking",
    categoryName: "Mathematical Thinking",
    categorySlug: "mathematical-thinking",
    secondaryCategoryIds: ["cat-cognitive-acceleration"],
    featuredImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: "Mathematical equations, geometrical calculations, and analytical diagrams on chalkboard",
    featuredImageCaption: "Logical derivation transforms mathematics from a set of rules into an intuitive problem-solving language.",
    authorId: "author-ejaz-bukhari",
    authorName: "Syed Ejaz Bukhari",
    authorRole: "Founder & Director of Pedagogy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    authorSlug: "syed-ejaz-bukhari",
    status: "published",
    isFeatured: true,
    publishedAt: "2026-08-22T09:15:00.000Z",
    updatedAt: "2026-08-26T14:00:00.000Z",
    createdAt: "2026-08-18T11:00:00.000Z",
    seoTitle: "How Students Develop Mathematical Thinking | EBM Blog",
    seoDescription: "Learn how conceptual derivation, visualization, and Socratic questioning build lasting mathematical reasoning and problem-solving skills in students.",
    ogImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop",
    canonicalUrl: "https://ejazbukharimethod.com/blog/how-students-develop-mathematical-thinking",
    readingTime: 5,
    tags: ["Mathematics", "Problem Solving", "O-Level", "STEM", "Critical Thinking"],
    relatedPostIds: ["post-personalized-learning", "post-learning-mastery"],
    noindex: false,
    views: 0,
    ctaType: "learning",
    ctaLink: "/learning",
    ctaText: "Explore EBM Mathematics Modules"
  },
  {
    id: "post-learning-mastery",
    title: "Understanding Learning Mastery: Why Diagnostic Baselines Matter",
    slug: "understanding-learning-mastery",
    excerpt: "Why standardized tests fail to capture learning gaps, and how continuous diagnostic assessment provides actionable roadmaps for academic mastery.",
    content: `
<h2>The Difference Between Testing and Diagnostic Assessment</h2>
<p>Traditional examinations are primarily summative: they occur at the end of an instructional period to assign a rank or grade. While summative tests measure outcome, they provide little actionable guidance on <em>where</em> the student faltered or <em>what</em> specific sub-skills require intervention.</p>

<p><strong>Diagnostic assessment</strong>, by contrast, is formative and predictive. It evaluates a learner's present cognitive mastery across granular skill nodes, distinguishing between minor computational slips and fundamental conceptual deficits.</p>

<h2>Why Diagnostic Baselines Are Essential</h2>
<p>When students enter a new academic year or embark on Cambridge O/A Level curricula, assuming uniform readiness invariably causes learning gaps to widen. Establishing a clear diagnostic baseline yields three critical benefits:</p>

<ul>
  <li><strong>Precision Remediation:</strong> Instead of re-teaching an entire syllabus unit, educators target the specific prerequisite concepts that were missing.</li>
  <li><strong>Reduced Academic Anxiety:</strong> Students understand exactly what they know and what they need to learn, eliminating the intimidation of ambiguous exam preparation.</li>
  <li><strong>Evidence-Based Pacing:</strong> Parents and teachers make informed decisions supported by empirical mastery metrics rather than subjective estimates.</li>
</ul>

<h2>Connecting Diagnostics to Daily Practice</h2>
<p>A diagnostic baseline is only valuable when linked directly to active learning. Once gaps are identified, the student is routed into targeted practice drills with instant feedback loops, ensuring that mastery is attained before advancement.</p>

<p>To establish your learner's baseline in Mathematics and English Comprehension, complete the <a href="/assessment">EBM Diagnostic Assessment</a> and review their customized learning profile.</p>
`,
    categoryId: "cat-diagnostic-assessment",
    categoryName: "Diagnostic Assessment",
    categorySlug: "diagnostic-assessment",
    secondaryCategoryIds: ["cat-personalized-learning"],
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: "Educator reviewing detailed analytical charts and diagnostic metrics on a modern dashboard",
    featuredImageCaption: "Formative diagnostics provide a transparent blueprint for individualized academic acceleration.",
    authorId: "author-ejaz-bukhari",
    authorName: "Syed Ejaz Bukhari",
    authorRole: "Founder & Director of Pedagogy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    authorSlug: "syed-ejaz-bukhari",
    status: "published",
    isFeatured: true,
    publishedAt: "2026-08-24T11:00:00.000Z",
    updatedAt: "2026-08-27T08:20:00.000Z",
    createdAt: "2026-08-20T10:00:00.000Z",
    seoTitle: "Understanding Learning Mastery & Diagnostic Baselines | EBM",
    seoDescription: "Learn why diagnostic baselines are the cornerstone of academic mastery and how formative analytics help educators and parents support student growth.",
    ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    canonicalUrl: "https://ejazbukharimethod.com/blog/understanding-learning-mastery",
    readingTime: 4,
    tags: ["Diagnostic Assessment", "Learning Mastery", "Formative Analytics", "EdTech"],
    relatedPostIds: ["post-personalized-learning", "post-mathematical-thinking"],
    noindex: false,
    views: 0,
    ctaType: "assessment",
    ctaLink: "/assessment",
    ctaText: "Take the Diagnostic Assessment"
  },
  {
    id: "post-cognitive-acceleration",
    title: "Cognitive Acceleration: Bridging Primary Foundations to Advanced STEM",
    slug: "cognitive-acceleration-stem-foundations",
    excerpt: "A structured methodology for transitioning young learners from basic arithmetic to multi-step analytical STEM thinking without cognitive fatigue.",
    content: `
<h2>The Transition Challenge in Early Secondary STEM</h2>
<p>The step from Grade 5 primary foundations to early secondary science and mathematics is notoriously steep. Students are abruptly expected to synthesize multi-variable equations, interpret scientific graphs, and construct rigorous deductive arguments.</p>

<p>Without deliberate cognitive scaffolding, this transition frequently triggers frustration. <strong>Cognitive Acceleration</strong> is the pedagogical process of systematically expanding a student's working memory, pattern-recognition abilities, and conceptual abstraction capacity through structured, incremental challenges.</p>

<h2>Key Strategies for Smooth STEM Transition</h2>
<ol>
  <li><strong>Bridging Concrete to Symbolic:</strong> Ensure physical and visual intuition precedes purely symbolic algebraic manipulation.</li>
  <li><strong>Metacognitive Reflection:</strong> Prompt students to reflect on their problem-solving approaches: <em>"Which method was more efficient, and why?"</em></li>
  <li><strong>Cross-Disciplinary Connections:</strong> Connect mathematical proportionality directly to physics velocity, chemical dilution, and real-world engineering models.</li>
  </ol>

<p>Explore how EBM's <a href="/programs">Academic Programs</a> systematically guide students through these transition years.</p>
`,
    categoryId: "cat-cognitive-acceleration",
    categoryName: "Cognitive Acceleration",
    categorySlug: "cognitive-acceleration",
    secondaryCategoryIds: ["cat-mathematical-thinking"],
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: "Young student interacting with digital STEM educational simulation and structured curriculum",
    featuredImageCaption: "Systematic scaffolding transforms complex STEM transitions into confident learning leaps.",
    authorId: "author-ejaz-bukhari",
    authorName: "Syed Ejaz Bukhari",
    authorRole: "Founder & Director of Pedagogy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    authorSlug: "syed-ejaz-bukhari",
    status: "published",
    isFeatured: false,
    publishedAt: "2026-08-25T14:30:00.000Z",
    updatedAt: "2026-08-28T09:00:00.000Z",
    createdAt: "2026-08-22T13:00:00.000Z",
    seoTitle: "Cognitive Acceleration: Primary Foundations to STEM | EBM",
    seoDescription: "Discover how cognitive acceleration bridges primary school fundamentals to advanced O/A Level STEM problem solving without burnout.",
    ogImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    canonicalUrl: "https://ejazbukharimethod.com/blog/cognitive-acceleration-stem-foundations",
    readingTime: 4,
    tags: ["Cognitive Acceleration", "STEM", "Primary Education", "Pedagogy"],
    relatedPostIds: ["post-personalized-learning", "post-mathematical-thinking"],
    noindex: false,
    views: 0,
    ctaType: "programs",
    ctaLink: "/programs",
    ctaText: "Discover EBM Academic Programs"
  },
  {
    id: "post-ai-socratic-tutoring",
    title: "The Role of Socratic AI Tutoring in Self-Directed Learning",
    slug: "ai-socratic-tutoring-self-directed-learning",
    excerpt: "How guided inquiry and step-by-step questioning empower students to solve complex problems independently rather than relying on automated answers.",
    content: `
<h2>The Pitfall of Instant Solutions</h2>
<p>Modern generative AI tools can provide instant answers to homework questions. However, passively consuming answers undermines genuine cognitive development and creates intellectual dependence. When students are handed final solutions, the critical cognitive struggle required for deep learning is lost.</p>

<p>The <strong>Socratic Method</strong>, by contrast, uses structured questioning to guide students toward discovering principles on their own. When applied through educational AI, it becomes a patient, 24/7 co-pilot that facilitates self-directed discovery.</p>

<h2>How Socratic AI Works in Practice</h2>
<ul>
  <li><strong>Identifying the Precise Point of Confusion:</strong> Instead of re-explaining the entire topic, the AI asks diagnostic questions to locate the exact premise the student misinterpreted.</li>
  <li><strong>Providing Hints, Not Answers:</strong> The system offers tiered hints and analogical examples that encourage the learner to take the next analytical step.</li>
  <li><strong>Reinforcing Self-Efficacy:</strong> Because the student reaches the solution through their own reasoning, they build authentic intellectual self-confidence.</li>
</ul>

<p>Discover real-world outcomes in our <a href="/case-studies">Student Case Studies</a> and see how Socratic guidance accelerates academic independence.</p>
`,
    categoryId: "cat-ai-edtech",
    categoryName: "AI & EdTech",
    categorySlug: "ai-edtech",
    secondaryCategoryIds: ["cat-personalized-learning"],
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: "Modern digital interface illustrating AI-assisted learning and Socratic interaction",
    featuredImageCaption: "Socratic inquiry guides students to deduce solutions independently through structured questioning.",
    authorId: "author-ejaz-bukhari",
    authorName: "Syed Ejaz Bukhari",
    authorRole: "Founder & Director of Pedagogy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    authorSlug: "syed-ejaz-bukhari",
    status: "published",
    isFeatured: false,
    publishedAt: "2026-08-27T10:00:00.000Z",
    updatedAt: "2026-08-28T16:00:00.000Z",
    createdAt: "2026-08-26T08:00:00.000Z",
    seoTitle: "Socratic AI Tutoring & Self-Directed Learning | EBM Blog",
    seoDescription: "Explore how Socratic AI tutoring guides students to discover solutions independently, building lasting critical thinking and academic autonomy.",
    ogImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    canonicalUrl: "https://ejazbukharimethod.com/blog/ai-socratic-tutoring-self-directed-learning",
    readingTime: 4,
    tags: ["AI in Education", "Socratic Method", "Self-Directed Learning", "EdTech"],
    relatedPostIds: ["post-personalized-learning", "post-mathematical-thinking"],
    noindex: false,
    views: 0,
    ctaType: "analytics",
    ctaLink: "/analytics",
    ctaText: "Learn More About EBM Analytics"
  }
];

// Fallback in-memory cache synchronized with JSON persistence for resiliency
let memoryPosts: BlogPost[] = [...DEFAULT_POSTS];
let memoryCategories: BlogCategory[] = [...DEFAULT_CATEGORIES];
let memoryAuthors: BlogAuthor[] = [DEFAULT_AUTHOR];
let memoryRedirects: BlogRedirect[] = [];

// Helper to generate a clean, URL-safe slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-")  // Replace spaces/underscores with single hyphens
    .replace(/^-+|-+$/g, "");   // Trim leading/trailing hyphens
}

// Calculate reading time from content text (avg 200 wpm)
export function calculateReadingTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Initialize tables and seed defaults in MySQL / memory
export async function initBlogTables() {
  try {
    const db = await getDb();
    
    // Seed Categories
    for (const cat of DEFAULT_CATEGORIES) {
      const existing = await db.select().from(schema.blog_categories).where(eq(schema.blog_categories.id, cat.id));
      if (existing.length === 0) {
        await db.insert(schema.blog_categories).values({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          seoTitle: cat.seoTitle || null,
          seoDescription: cat.seoDescription || null,
          color: cat.color || "blue",
          icon: cat.icon || "Sparkles",
          createdAt: new Date()
        });
      }
    }

    // Seed Author
    const existingAuthor = await db.select().from(schema.blog_authors).where(eq(schema.blog_authors.id, DEFAULT_AUTHOR.id));
    if (existingAuthor.length === 0) {
      await db.insert(schema.blog_authors).values({
        id: DEFAULT_AUTHOR.id,
        name: DEFAULT_AUTHOR.name,
        slug: DEFAULT_AUTHOR.slug,
        bio: DEFAULT_AUTHOR.bio,
        role: DEFAULT_AUTHOR.role,
        avatarUrl: DEFAULT_AUTHOR.avatarUrl || null,
        email: DEFAULT_AUTHOR.email || null,
        socialLinks: JSON.stringify(DEFAULT_AUTHOR.socialLinks),
        createdAt: new Date()
      });
    }

    // Seed Posts
    for (const post of DEFAULT_POSTS) {
      const existingPost = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.id, post.id));
      if (existingPost.length === 0) {
        await db.insert(schema.blog_posts).values({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          categoryId: post.categoryId,
          secondaryCategoryIds: JSON.stringify(post.secondaryCategoryIds || []),
          featuredImage: post.featuredImage,
          featuredImageAlt: post.featuredImageAlt,
          featuredImageCaption: post.featuredImageCaption || null,
          authorId: post.authorId,
          status: post.status,
          isFeatured: post.isFeatured ? 1 : 0,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
          updatedAt: new Date(post.updatedAt),
          createdAt: new Date(post.createdAt),
          seoTitle: post.seoTitle || null,
          seoDescription: post.seoDescription || null,
          ogImage: post.ogImage || null,
          canonicalUrl: post.canonicalUrl || null,
          readingTime: post.readingTime,
          tags: JSON.stringify(parseTags(post.tags)),
          relatedPostIds: JSON.stringify(post.relatedPostIds || []),
          noindex: post.noindex ? 1 : 0,
          views: post.views,
          ctaType: post.ctaType || "assessment",
          ctaLink: post.ctaLink || "/assessment",
          ctaText: post.ctaText || "Explore the EBM Diagnostic Assessment"
        });
      }
    }
    console.log("Blog schema tables and seed data synchronized successfully.");
  } catch (err: any) {
    console.warn("DB init notice for blog (using memory store fallback):", err.message);
  }
}

// Unified Get Posts
export async function getAllPosts(options: BlogFilterOptions = {}): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const db = await getDb();
    const allDbPosts = await db.select().from(schema.blog_posts).orderBy(desc(schema.blog_posts.publishedAt), desc(schema.blog_posts.createdAt));
    const allCategories = await db.select().from(schema.blog_categories);
    const allAuthors = await db.select().from(schema.blog_authors);

    const catMap = new Map<string, any>(allCategories.map((c: any) => [c.id, c]));
    const authMap = new Map<string, any>(allAuthors.map((a: any) => [a.id, a]));

    let posts: BlogPost[] = allDbPosts.map((p: any) => {
      const cat = catMap.get(p.categoryId);
      const auth = p.authorId ? authMap.get(p.authorId) : null;
      let secondaryCategoryIds: string[] = [];
      let relatedPostIds: string[] = [];

      const tags = parseTags(p.tags);
      try { secondaryCategoryIds = typeof p.secondaryCategoryIds === "string" ? JSON.parse(p.secondaryCategoryIds) : (Array.isArray(p.secondaryCategoryIds) ? p.secondaryCategoryIds : []); } catch (e) {}
      try { relatedPostIds = typeof p.relatedPostIds === "string" ? JSON.parse(p.relatedPostIds) : (Array.isArray(p.relatedPostIds) ? p.relatedPostIds : []); } catch (e) {}

      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content: p.content,
        categoryId: p.categoryId,
        categoryName: cat?.name || "General",
        categorySlug: cat?.slug || "general",
        secondaryCategoryIds,
        featuredImage: p.featuredImage || "",
        featuredImageAlt: p.featuredImageAlt || "",
        featuredImageCaption: p.featuredImageCaption || undefined,
        authorId: p.authorId || "",
        authorName: auth?.name || "EBM Faculty",
        authorRole: auth?.role || "Editorial Team",
        authorAvatar: auth?.avatarUrl || undefined,
        authorSlug: auth?.slug || undefined,
        status: p.status as PostStatus,
        isFeatured: Boolean(p.isFeatured),
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
        updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
        seoTitle: p.seoTitle || undefined,
        seoDescription: p.seoDescription || undefined,
        ogImage: p.ogImage || undefined,
        canonicalUrl: p.canonicalUrl || `https://ejazbukharimethod.com/blog/${p.slug}`,
        readingTime: p.readingTime || 5,
        tags,
        relatedPostIds,
        noindex: Boolean(p.noindex),
        views: p.views || 0,
        ctaType: (p.ctaType as any) || "assessment",
        ctaLink: p.ctaLink || "/assessment",
        ctaText: p.ctaText || "Explore the EBM Diagnostic Assessment"
      };
    });

    // Filtering
    if (options.status && options.status !== "all") {
      posts = posts.filter(p => p.status === options.status);
    }
    if (options.category) {
      const catSlugOrId = options.category.toLowerCase();
      posts = posts.filter(p => p.categoryId === catSlugOrId || p.categorySlug === catSlugOrId || (p.secondaryCategoryIds && p.secondaryCategoryIds.includes(catSlugOrId)));
    }
    if (options.tag) {
      const tagLower = options.tag.toLowerCase();
      posts = posts.filter(p => parseTags(p.tags).some(t => t.toLowerCase() === tagLower));
    }
    if (options.isFeatured !== undefined) {
      posts = posts.filter(p => p.isFeatured === options.isFeatured);
    }
    if (options.authorId) {
      posts = posts.filter(p => p.authorId === options.authorId || p.authorSlug === options.authorId);
    }
    if (options.search) {
      const q = options.search.toLowerCase().trim();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        parseTags(p.tags).some(t => t.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (options.sortBy === "oldest") {
      posts.sort((a, b) => new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime());
    } else if (options.sortBy === "title") {
      posts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (options.sortBy === "popular") {
      posts.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (options.sortBy === "reading_time") {
      posts.sort((a, b) => a.readingTime - b.readingTime);
    } else {
      // Default: latest
      posts.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
    }

    const total = posts.length;
    if (options.page && options.limit) {
      const start = (options.page - 1) * options.limit;
      posts = posts.slice(start, start + options.limit);
    }

    return { posts, total };
  } catch (err) {
    // Memory fallback
    let posts = [...memoryPosts];
    if (options.status && options.status !== "all") {
      posts = posts.filter(p => p.status === options.status);
    }
    if (options.category) {
      const catSlugOrId = options.category.toLowerCase();
      posts = posts.filter(p => p.categoryId === catSlugOrId || p.categorySlug === catSlugOrId);
    }
    if (options.search) {
      const q = options.search.toLowerCase().trim();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    const total = posts.length;
    if (options.page && options.limit) {
      const start = (options.page - 1) * options.limit;
      posts = posts.slice(start, start + options.limit);
    }
    return { posts, total };
  }
}

// Get single post by slug (handles redirects check)
export async function getPostBySlug(slug: string): Promise<{ post?: BlogPost; redirect?: BlogRedirect } | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const db = await getDb();
    
    // 1. Check direct post match
    const dbPosts = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.slug, normalizedSlug));
    if (dbPosts.length > 0) {
      const p = dbPosts[0];
      const categories = await db.select().from(schema.blog_categories).where(eq(schema.blog_categories.id, p.categoryId));
      const authors = p.authorId ? await db.select().from(schema.blog_authors).where(eq(schema.blog_authors.id, p.authorId)) : [];

      const cat = categories[0];
      const auth = authors[0];

      let secondaryCategoryIds: string[] = [];
      let relatedPostIds: string[] = [];
      const tags = parseTags(p.tags);
      try { secondaryCategoryIds = typeof p.secondaryCategoryIds === "string" ? JSON.parse(p.secondaryCategoryIds) : (Array.isArray(p.secondaryCategoryIds) ? p.secondaryCategoryIds : []); } catch (e) {}
      try { relatedPostIds = typeof p.relatedPostIds === "string" ? JSON.parse(p.relatedPostIds) : (Array.isArray(p.relatedPostIds) ? p.relatedPostIds : []); } catch (e) {}

      const post: BlogPost = {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content: p.content,
        categoryId: p.categoryId,
        categoryName: cat?.name || "General",
        categorySlug: cat?.slug || "general",
        secondaryCategoryIds,
        featuredImage: p.featuredImage || "",
        featuredImageAlt: p.featuredImageAlt || "",
        featuredImageCaption: p.featuredImageCaption || undefined,
        authorId: p.authorId || "",
        authorName: auth?.name || "EBM Faculty",
        authorRole: auth?.role || "Editorial Team",
        authorAvatar: auth?.avatarUrl || undefined,
        authorSlug: auth?.slug || undefined,
        status: p.status as PostStatus,
        isFeatured: Boolean(p.isFeatured),
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
        updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
        seoTitle: p.seoTitle || undefined,
        seoDescription: p.seoDescription || undefined,
        ogImage: p.ogImage || undefined,
        canonicalUrl: p.canonicalUrl || `https://ejazbukharimethod.com/blog/${p.slug}`,
        readingTime: p.readingTime || 5,
        tags,
        relatedPostIds,
        noindex: Boolean(p.noindex),
        views: p.views || 0,
        ctaType: (p.ctaType as any) || "assessment",
        ctaLink: p.ctaLink || "/assessment",
        ctaText: p.ctaText || "Explore the EBM Diagnostic Assessment"
      };
      return { post };
    }

    // 2. Check redirects table
    const redirects = await db.select().from(schema.blog_redirects).where(eq(schema.blog_redirects.sourceSlug, normalizedSlug));
    if (redirects.length > 0) {
      const r = redirects[0];
      return {
        redirect: {
          id: r.id,
          sourceSlug: r.sourceSlug,
          targetSlug: r.targetSlug,
          statusCode: r.statusCode || 301,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString()
        }
      };
    }

    return null;
  } catch (err) {
    // Memory fallback
    const post = memoryPosts.find(p => p.slug === normalizedSlug);
    if (post) return { post };
    const redir = memoryRedirects.find(r => r.sourceSlug === normalizedSlug);
    if (redir) return { redirect: redir };
    return null;
  }
}

// Get single post by ID (for admin editor)
export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const db = await getDb();
    const dbPosts = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.id, id));
    if (dbPosts.length === 0) return null;
    const p = dbPosts[0];

    const categories = await db.select().from(schema.blog_categories).where(eq(schema.blog_categories.id, p.categoryId));
    const authors = p.authorId ? await db.select().from(schema.blog_authors).where(eq(schema.blog_authors.id, p.authorId)) : [];
    const cat = categories[0];
    const auth = authors[0];

    let secondaryCategoryIds: string[] = [];
    let relatedPostIds: string[] = [];
    const tags = parseTags(p.tags);
    try { secondaryCategoryIds = typeof p.secondaryCategoryIds === "string" ? JSON.parse(p.secondaryCategoryIds) : (Array.isArray(p.secondaryCategoryIds) ? p.secondaryCategoryIds : []); } catch (e) {}
    try { relatedPostIds = typeof p.relatedPostIds === "string" ? JSON.parse(p.relatedPostIds) : (Array.isArray(p.relatedPostIds) ? p.relatedPostIds : []); } catch (e) {}

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content,
      categoryId: p.categoryId,
      categoryName: cat?.name || "General",
      categorySlug: cat?.slug || "general",
      secondaryCategoryIds,
      featuredImage: p.featuredImage || "",
      featuredImageAlt: p.featuredImageAlt || "",
      featuredImageCaption: p.featuredImageCaption || undefined,
      authorId: p.authorId || "",
      authorName: auth?.name || "EBM Faculty",
      authorRole: auth?.role || "Editorial Team",
      authorAvatar: auth?.avatarUrl || undefined,
      authorSlug: auth?.slug || undefined,
      status: p.status as PostStatus,
      isFeatured: Boolean(p.isFeatured),
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
      seoTitle: p.seoTitle || undefined,
      seoDescription: p.seoDescription || undefined,
      ogImage: p.ogImage || undefined,
      canonicalUrl: p.canonicalUrl || `https://ejazbukharimethod.com/blog/${p.slug}`,
      readingTime: p.readingTime || 5,
      tags,
      relatedPostIds,
      noindex: Boolean(p.noindex),
      views: p.views || 0,
      ctaType: (p.ctaType as any) || "assessment",
      ctaLink: p.ctaLink || "/assessment",
      ctaText: p.ctaText || "Explore the EBM Diagnostic Assessment"
    };
  } catch (e) {
    return memoryPosts.find(p => p.id === id) || null;
  }
}

// Create new post
export async function createPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const id = data.id || `post_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  let slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title || "untitled-post");
  if (!slug) slug = `post-${Date.now()}`;

  // Ensure unique slug
  slug = await makeSlugUnique(slug);

  const readingTime = calculateReadingTime(data.content || "");
  const now = new Date();
  const publishedAt = data.status === "published" ? (data.publishedAt ? new Date(data.publishedAt) : now) : null;

  const newPost: BlogPost = {
    id,
    title: data.title || "Untitled Post",
    slug,
    excerpt: data.excerpt || "",
    content: data.content || "<p></p>",
    categoryId: data.categoryId || "cat-personalized-learning",
    secondaryCategoryIds: data.secondaryCategoryIds || [],
    featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    featuredImageAlt: data.featuredImageAlt || data.title || "EBM Blog post featured visual",
    featuredImageCaption: data.featuredImageCaption,
    authorId: data.authorId || "author-ejaz-bukhari",
    status: data.status || "draft",
    isFeatured: Boolean(data.isFeatured),
    publishedAt: publishedAt ? publishedAt.toISOString() : null,
    updatedAt: now.toISOString(),
    createdAt: now.toISOString(),
    seoTitle: data.seoTitle || `${data.title} | EBM`,
    seoDescription: data.seoDescription || data.excerpt || "Educational insights from the Ejaz Bukhari Method.",
    ogImage: data.ogImage || data.featuredImage,
    canonicalUrl: data.canonicalUrl || `https://ejazbukharimethod.com/blog/${slug}`,
    readingTime,
    tags: data.tags || [],
    relatedPostIds: data.relatedPostIds || [],
    noindex: Boolean(data.noindex),
    views: 0,
    ctaType: data.ctaType || "assessment",
    ctaLink: data.ctaLink || "/assessment",
    ctaText: data.ctaText || "Explore the EBM Diagnostic Assessment"
  };

  try {
    const db = await getDb();
    await db.insert(schema.blog_posts).values({
      id: newPost.id,
      title: newPost.title,
      slug: newPost.slug,
      excerpt: newPost.excerpt,
      content: newPost.content,
      categoryId: newPost.categoryId,
      secondaryCategoryIds: JSON.stringify(newPost.secondaryCategoryIds),
      featuredImage: newPost.featuredImage,
      featuredImageAlt: newPost.featuredImageAlt,
      featuredImageCaption: newPost.featuredImageCaption || null,
      authorId: newPost.authorId,
      status: newPost.status,
      isFeatured: newPost.isFeatured ? 1 : 0,
      publishedAt: publishedAt,
      updatedAt: now,
      createdAt: now,
      seoTitle: newPost.seoTitle || null,
      seoDescription: newPost.seoDescription || null,
      ogImage: newPost.ogImage || null,
      canonicalUrl: newPost.canonicalUrl || null,
      readingTime: newPost.readingTime,
      tags: JSON.stringify(parseTags(newPost.tags)),
      relatedPostIds: JSON.stringify(newPost.relatedPostIds),
      noindex: newPost.noindex ? 1 : 0,
      views: 0,
      ctaType: newPost.ctaType || "assessment",
      ctaLink: newPost.ctaLink || "/assessment",
      ctaText: newPost.ctaText || "Explore the EBM Diagnostic Assessment"
    });
  } catch (err) {
    console.warn("Saving to memory cache:", err);
  }

  memoryPosts.unshift(newPost);
  return newPost;
}

// Update existing post (creates 301 redirect if slug changes on published post)
export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const existing = await getPostById(id);
  if (!existing) return null;

  let newSlug = data.slug ? generateSlug(data.slug) : existing.slug;
  if (newSlug !== existing.slug) {
    newSlug = await makeSlugUnique(newSlug, id);
    
    // If post was published and had a valid slug, record 301 redirect
    if (existing.status === "published" && existing.slug) {
      await createRedirect(existing.slug, newSlug, 301);
    }
  }

  const readingTime = data.content !== undefined ? calculateReadingTime(data.content) : existing.readingTime;
  const now = new Date();
  
  let publishedAt = existing.publishedAt;
  if (data.status === "published" && !existing.publishedAt) {
    publishedAt = now.toISOString();
  } else if (data.publishedAt !== undefined) {
    publishedAt = data.publishedAt;
  }

  const updated: BlogPost = {
    ...existing,
    ...data,
    slug: newSlug,
    readingTime,
    publishedAt,
    updatedAt: now.toISOString(),
    canonicalUrl: data.canonicalUrl || `https://ejazbukharimethod.com/blog/${newSlug}`,
    seoTitle: data.seoTitle || `${data.title || existing.title} | EBM`,
    seoDescription: data.seoDescription || data.excerpt || existing.excerpt || "Educational insights from the Ejaz Bukhari Method."
  };

  try {
    const db = await getDb();
    await db.update(schema.blog_posts)
      .set({
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content: updated.content,
        categoryId: updated.categoryId,
        secondaryCategoryIds: JSON.stringify(updated.secondaryCategoryIds || []),
        featuredImage: updated.featuredImage,
        featuredImageAlt: updated.featuredImageAlt,
        featuredImageCaption: updated.featuredImageCaption || null,
        authorId: updated.authorId,
        status: updated.status,
        isFeatured: updated.isFeatured ? 1 : 0,
        publishedAt: updated.publishedAt ? new Date(updated.publishedAt) : null,
        updatedAt: now,
        seoTitle: updated.seoTitle || null,
        seoDescription: updated.seoDescription || null,
        ogImage: updated.ogImage || null,
        canonicalUrl: updated.canonicalUrl || null,
        readingTime: updated.readingTime,
        tags: JSON.stringify(parseTags(updated.tags)),
        relatedPostIds: JSON.stringify(updated.relatedPostIds || []),
        noindex: updated.noindex ? 1 : 0,
        ctaType: updated.ctaType || "assessment",
        ctaLink: updated.ctaLink || "/assessment",
        ctaText: updated.ctaText || "Explore the EBM Diagnostic Assessment"
      })
      .where(eq(schema.blog_posts.id, id));
  } catch (err) {
    console.warn("DB update failed, updated memory cache:", err);
  }

  const idx = memoryPosts.findIndex(p => p.id === id);
  if (idx !== -1) memoryPosts[idx] = updated;
  else memoryPosts.unshift(updated);

  return updated;
}

// Delete post
export async function deletePost(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    await db.delete(schema.blog_posts).where(eq(schema.blog_posts.id, id));
  } catch (err) {
    console.warn("DB delete error:", err);
  }
  memoryPosts = memoryPosts.filter(p => p.id !== id);
  return true;
}

// Increment Post Views
export async function incrementPostViews(idOrSlug: string): Promise<number> {
  try {
    const db = await getDb();
    const isId = idOrSlug.startsWith("post_") || idOrSlug.startsWith("post-");
    const whereClause = isId ? eq(schema.blog_posts.id, idOrSlug) : eq(schema.blog_posts.slug, idOrSlug);
    
    const post = await db.select().from(schema.blog_posts).where(whereClause);
    if (post.length > 0) {
      const newViews = (post[0].views || 0) + 1;
      await db.update(schema.blog_posts).set({ views: newViews }).where(whereClause);
      return newViews;
    }
  } catch (e) {}

  const mem = memoryPosts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  if (mem) {
    mem.views = (mem.views || 0) + 1;
    return mem.views;
  }
  return 0;
}

// Categories Management
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const db = await getDb();
    const dbCats = await db.select().from(schema.blog_categories).orderBy(asc(schema.blog_categories.name));
    const allPosts = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.status, "published"));

    return dbCats.map(c => {
      const count = allPosts.filter(p => p.categoryId === c.id || p.categoryId === c.slug).length;
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        seoTitle: c.seoTitle || `${c.name} | EBM Blog`,
        seoDescription: c.seoDescription || c.description || `Articles on ${c.name} from the Ejaz Bukhari Method.`,
        color: c.color || "blue",
        icon: c.icon || "Sparkles",
        postCount: count,
        createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString()
      };
    });
  } catch (err) {
    return memoryCategories.map(c => ({
      ...c,
      postCount: memoryPosts.filter(p => p.status === "published" && (p.categoryId === c.id || p.categoryId === c.slug)).length
    }));
  }
}

export async function createCategory(data: Partial<BlogCategory>): Promise<BlogCategory> {
  const id = data.id || `cat-${generateSlug(data.name || "category")}-${Date.now()}`;
  const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.name || "category");

  const newCat: BlogCategory = {
    id,
    name: data.name || "New Category",
    slug,
    description: data.description || "",
    seoTitle: data.seoTitle || `${data.name} | EBM Blog`,
    seoDescription: data.seoDescription || data.description || `Articles on ${data.name} from EBM.`,
    color: data.color || "blue",
    icon: data.icon || "Sparkles",
    postCount: 0,
    createdAt: new Date().toISOString()
  };

  try {
    const db = await getDb();
    await db.insert(schema.blog_categories).values({
      id: newCat.id,
      name: newCat.name,
      slug: newCat.slug,
      description: newCat.description,
      seoTitle: newCat.seoTitle || null,
      seoDescription: newCat.seoDescription || null,
      color: newCat.color || "blue",
      icon: newCat.icon || "Sparkles",
      createdAt: new Date()
    });
  } catch (e) {}

  memoryCategories.push(newCat);
  return newCat;
}

export async function updateCategory(id: string, data: Partial<BlogCategory>): Promise<BlogCategory | null> {
  const existing = memoryCategories.find(c => c.id === id);
  const updated: BlogCategory = {
    ...(existing || { id, name: "", slug: "", description: "" }),
    ...data,
    slug: data.slug ? generateSlug(data.slug) : (existing?.slug || id)
  };

  try {
    const db = await getDb();
    await db.update(schema.blog_categories)
      .set({
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        seoTitle: updated.seoTitle || null,
        seoDescription: updated.seoDescription || null,
        color: updated.color,
        icon: updated.icon
      })
      .where(eq(schema.blog_categories.id, id));
  } catch (e) {}

  const idx = memoryCategories.findIndex(c => c.id === id);
  if (idx !== -1) memoryCategories[idx] = updated;
  else memoryCategories.push(updated);

  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    await db.delete(schema.blog_categories).where(eq(schema.blog_categories.id, id));
  } catch (e) {}
  memoryCategories = memoryCategories.filter(c => c.id !== id);
  return true;
}

// Authors Management
export async function getAllAuthors(): Promise<BlogAuthor[]> {
  try {
    const db = await getDb();
    const dbAuthors = await db.select().from(schema.blog_authors);
    const allPosts = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.status, "published"));

    return dbAuthors.map(a => {
      let socialLinks = {};
      try { socialLinks = typeof a.socialLinks === "string" ? JSON.parse(a.socialLinks) : (a.socialLinks || {}); } catch (e) {}
      const postCount = allPosts.filter(p => p.authorId === a.id).length;

      return {
        id: a.id,
        name: a.name,
        slug: a.slug,
        bio: a.bio || "",
        role: a.role || "Educator",
        avatarUrl: a.avatarUrl || undefined,
        email: a.email || undefined,
        socialLinks,
        postCount,
        createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString()
      };
    });
  } catch (e) {
    return memoryAuthors;
  }
}

// Redirects Management
export async function getAllRedirects(): Promise<BlogRedirect[]> {
  try {
    const db = await getDb();
    const dbRedirs = await db.select().from(schema.blog_redirects).orderBy(desc(schema.blog_redirects.createdAt));
    return dbRedirs.map(r => ({
      id: r.id,
      sourceSlug: r.sourceSlug,
      targetSlug: r.targetSlug,
      statusCode: r.statusCode || 301,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString()
    }));
  } catch (e) {
    return memoryRedirects;
  }
}

export async function createRedirect(sourceSlug: string, targetSlug: string, statusCode = 301): Promise<BlogRedirect> {
  const id = `redir_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const redir: BlogRedirect = {
    id,
    sourceSlug: sourceSlug.toLowerCase().trim(),
    targetSlug: targetSlug.toLowerCase().trim(),
    statusCode,
    createdAt: new Date().toISOString()
  };

  try {
    const db = await getDb();
    // Delete any old redirect for this source to prevent loops
    await db.delete(schema.blog_redirects).where(eq(schema.blog_redirects.sourceSlug, redir.sourceSlug));
    await db.insert(schema.blog_redirects).values({
      id: redir.id,
      sourceSlug: redir.sourceSlug,
      targetSlug: redir.targetSlug,
      statusCode: redir.statusCode,
      createdAt: new Date()
    });
  } catch (e) {}

  memoryRedirects = memoryRedirects.filter(r => r.sourceSlug !== redir.sourceSlug);
  memoryRedirects.unshift(redir);
  return redir;
}

export async function deleteRedirect(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    await db.delete(schema.blog_redirects).where(eq(schema.blog_redirects.id, id));
  } catch (e) {}
  memoryRedirects = memoryRedirects.filter(r => r.id !== id);
  return true;
}

// Helper: Ensure slug uniqueness
async function makeSlugUnique(baseSlug: string, excludeId?: string): Promise<string> {
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    try {
      const db = await getDb();
      const existing = await db.select().from(schema.blog_posts).where(eq(schema.blog_posts.slug, candidate));
      const conflict = existing.find(p => p.id !== excludeId);
      if (!conflict) return candidate;
      candidate = `${baseSlug}-${counter++}`;
    } catch (e) {
      const conflict = memoryPosts.find(p => p.slug === candidate && p.id !== excludeId);
      if (!conflict) return candidate;
      candidate = `${baseSlug}-${counter++}`;
    }
  }
}
