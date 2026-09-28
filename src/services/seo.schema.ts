/**
 * Centralized, Route-Aware Schema.org JSON-LD Structured Data System
 * Domain: https://ejazbukharimethod.com/
 */

import { parseTags } from "../types/blog.types";

export const BASE_URL = "https://ejazbukharimethod.com";
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export interface RouteMetaConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  breadcrumbName: string;
  pageType: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}

/**
 * 8 Verbatim visible FAQs for the EBM Diagnostic Assessment Page
 */
export const ASSESSMENT_VISIBLE_FAQS = [
  {
    question: "What is the EBM Diagnostic Assessment?",
    answer:
      "The EBM Diagnostic Assessment helps identify where a learner currently stands in Mathematics and English Comprehension. It provides insight into strengths, learning needs, and areas that may require further support."
  },
  {
    question: "Which subjects does the EBM Diagnostic Assessment cover?",
    answer:
      "The EBM Diagnostic Assessment covers Mathematics and English Comprehension, helping provide a clearer picture of a learner's academic skills across these areas."
  },
  {
    question: "Which grade levels does the EBM Diagnostic Assessment support?",
    answer:
      "The assessment is designed to support learners from Grade 1 through O/A Levels, with assessment content aligned to the learner's level and learning needs."
  },
  {
    question: "How does the EBM Diagnostic Assessment work?",
    answer:
      "The assessment uses an adaptive approach to evaluate a learner's current skills. As the learner responds to questions, the assessment helps identify areas of strength and areas where additional learning support may be needed."
  },
  {
    question: "What happens after a learner completes the assessment?",
    answer:
      "The assessment results provide meaningful learning insights that can help identify appropriate next steps. These insights can support more focused and personalized learning."
  },
  {
    question: "How does the assessment support personalized learning?",
    answer:
      "By identifying a learner's current strengths and learning needs, the EBM Diagnostic Assessment helps provide a clearer starting point for personalized learning and targeted skill development."
  },
  {
    question: "Can parents and educators use the assessment insights?",
    answer:
      "Yes. Assessment insights can help parents and educators better understand a learner's current performance and identify areas where additional learning support may be beneficial."
  },
  {
    question: "Does the assessment measure both foundational and advanced skills?",
    answer:
      "Yes. The EBM Diagnostic Assessment supports learners across different stages of development, from foundational skills in earlier grades through more advanced Mathematics and English Comprehension skills at O/A Levels."
  }
];

/**
 * Sanitizes and guarantees that page meta titles strictly adhere
 * to length requirements: between 50 and 60 characters inclusive.
 */
export function sanitizeMetaTitle(rawTitle?: string): string {
  if (!rawTitle) return "EBM Personalized Learning Platform | Grade 1 to O/A Level";
  let title = rawTitle.trim();
  if (title.length >= 50 && title.length <= 60) return title;

  if (title.length < 50) {
    const clean = title.replace(/\s*\|.*$/, "").trim();
    const suffixes = [
      " | Ejaz Bukhari Method (EBM)", // 28 chars
      " | EBM Digital Learning Platform", // 32 chars
      " | EBM Learning Ecosystem", // 25 chars
      " | EBM Learning Platform", // 24 chars
      " | EBM Academic Portal", // 22 chars
      " | EBM Digital Learning", // 23 chars
      " | EBM Portal", // 13 chars
      " | EBM Blog", // 11 chars
      " | EBM" // 6 chars
    ];
    for (const s of suffixes) {
      const combined = clean + s;
      if (combined.length >= 50 && combined.length <= 60) return combined;
    }
    for (const s of suffixes) {
      const combined = title + s;
      if (combined.length >= 50 && combined.length <= 60) return combined;
    }
    let combined = title + " - Ejaz Bukhari Method Academic Portal";
    if (combined.length > 60) combined = combined.slice(0, 60).trim();
    if (combined.length < 50) combined = combined.padEnd(50, " ");
    return combined;
  }

  // title.length > 60
  const clean = title.replace(/\s*\|.*$/, "").trim();
  if (clean.length >= 50 && clean.length <= 60) return clean;
  if ((clean + " | EBM").length >= 50 && (clean + " | EBM").length <= 60) return clean + " | EBM";

  let trimmed = title.slice(0, 60).trim();
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace >= 50) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  if (trimmed.length < 50) trimmed = title.slice(0, 58).trim();
  if (trimmed.length > 60) trimmed = trimmed.slice(0, 60);
  if (trimmed.length < 50) trimmed = trimmed.padEnd(50, " ");
  return trimmed;
}

/**
 * Sanitizes and guarantees that page meta descriptions strictly adhere
 * to length requirements: between 120 and 160 characters inclusive.
 */
export function sanitizeMetaDescription(rawDesc?: string): string {
  if (!rawDesc) {
    return "Personalized learning platform for students from Grade 1 to O/A Levels, featuring structured curricula, diagnostic assessments, and AI-powered tutoring.";
  }
  let desc = rawDesc.trim().replace(/\s+/g, " ");
  if (desc.length >= 120 && desc.length <= 160) return desc;

  if (desc.length < 120) {
    const extensions = [
      " Discover personalized learning pathways, diagnostic skill evaluations, and Cambridge exam prep with EBM.",
      " Explore diagnostic assessments, structured curricula, and individualized learning support with EBM.",
      " Learn more with the Ejaz Bukhari Method personalized learning platform.",
      " Empowering students from Grade 1 to O/A Levels with EBM."
    ];
    for (const ext of extensions) {
      const combined = desc.replace(/\.$/, "") + "." + ext;
      if (combined.length >= 120 && combined.length <= 160) return combined;
    }
    let combined = desc.replace(/\.$/, "") + ". Learn more about diagnostic skill evaluations, curriculum pathways, and academic coaching at EBM.";
    if (combined.length > 160) {
      let cut = combined.slice(0, 157).trim();
      const lastSpace = cut.lastIndexOf(" ");
      if (lastSpace >= 120) cut = cut.slice(0, lastSpace) + "...";
      else cut = cut + "...";
      return cut;
    }
    if (combined.length < 120) {
      combined = combined.padEnd(120, ".");
    }
    return combined;
  }

  // desc.length > 160
  let cut = desc.slice(0, 157).trim();
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace >= 120) {
    cut = cut.slice(0, lastSpace);
  }
  if (!cut.endsWith(".")) {
    cut += "...";
  }
  if (cut.length > 160) cut = cut.slice(0, 157) + "...";
  if (cut.length < 120) cut = desc.slice(0, 156).trim() + "...";
  return cut;
}

/**
 * Site-wide master registry of public routes
 */
export const ROUTE_REGISTRY: Record<string, RouteMetaConfig> = {
  "/": {
    title: "EBM Personalized Learning Platform | Grade 1 to O/A Level",
    description:
      "Personalized learning platform for students from Grade 1 to O/A Levels, featuring structured curricula, diagnostic assessments, and AI-powered tutoring.",
    canonicalUrl: `${BASE_URL}/`,
    breadcrumbName: "Home",
    pageType: "WebPage"
  },
  "/about": {
    title: "About EBM & Syed Ejaz Bukhari | Academic Pedagogy & Vision",
    description:
      "Discover the Ejaz Bukhari Method (EBM) educational philosophy, foundational mastery frameworks, and our mission to empower every learner across all grades.",
    canonicalUrl: `${BASE_URL}/about`,
    breadcrumbName: "About Us",
    pageType: "AboutPage"
  },
  "/assessment": {
    title: "EBM Diagnostic Assessment | Adaptive Evaluation for K-12",
    description:
      "Evaluate core skills, pinpoint knowledge gaps, and get personalized academic learning pathways from Grade 1 to Cambridge O/A Levels with EBM diagnostics.",
    canonicalUrl: `${BASE_URL}/assessment`,
    breadcrumbName: "Assessment",
    pageType: "WebPage"
  },
  "/analytics": {
    title: "EBM Learning Analytics | Real-Time Student Mastery Insights",
    description:
      "Track student learning curves, cognitive velocity, and concept mastery with actionable data analytics and diagnostic dashboards from the EBM ecosystem.",
    canonicalUrl: `${BASE_URL}/analytics`,
    breadcrumbName: "Analytics",
    pageType: "WebPage"
  },
  "/programs": {
    title: "Academic Programs & Curriculum | Grade 1 to O/A Levels EBM",
    description:
      "Explore personalized academic programs from Grade 1 through Cambridge O/A Levels, covering mathematics, English comprehension, and STEM skill milestones.",
    canonicalUrl: `${BASE_URL}/programs`,
    breadcrumbName: "Programs",
    pageType: "WebPage"
  },
  "/learning": {
    title: "EBM Learning Portal | Interactive Courses & Study Modules",
    description:
      "Access structured learning modules, interactive lessons, syllabus plans, and adaptive practice exercises designed for Grade 1 through Cambridge O/A Levels.",
    canonicalUrl: `${BASE_URL}/learning`,
    breadcrumbName: "Learning",
    pageType: "WebPage"
  },
  "/inspiration": {
    title: "EBM Inspiration & STEM Resources | Educator & Parent Tools",
    description:
      "Access curated teaching strategies, downloadable learning toolkits, printable exercises, and classroom implementation guides from the EBM ecosystem.",
    canonicalUrl: `${BASE_URL}/inspiration`,
    breadcrumbName: "Inspiration",
    pageType: "CollectionPage"
  },
  "/case-studies": {
    title: "EBM Case Studies | Student Turnarounds & Academic Success",
    description:
      "Explore real school success stories, student grade turnarounds, Cambridge O/A Level distinctions, and Olympiad wins achieved through the Ejaz Bukhari Method.",
    canonicalUrl: `${BASE_URL}/case-studies`,
    breadcrumbName: "Case Studies",
    pageType: "CollectionPage"
  },
  "/casestudies": {
    title: "EBM Case Studies | Student Turnarounds & Academic Success",
    description:
      "Explore real school success stories, student grade turnarounds, Cambridge O/A Level distinctions, and Olympiad wins achieved through the Ejaz Bukhari Method.",
    canonicalUrl: `${BASE_URL}/case-studies`,
    breadcrumbName: "Case Studies",
    pageType: "CollectionPage"
  },
  "/blog": {
    title: "EBM Educational Blog | Math Insights & Pedagogical Guides",
    description:
      "Read research-backed educational perspectives, mathematical problem-solving strategies, and personalized learning insights from the Ejaz Bukhari Method.",
    canonicalUrl: `${BASE_URL}/blog`,
    breadcrumbName: "Blog",
    pageType: "CollectionPage"
  },
  "/pricing": {
    title: "EBM Pricing & Membership Plans | Flexible Tuition Options",
    description:
      "Find the right EBM membership plan for your academic journey, with transparent pricing for individual learners, families, and partner school institutions.",
    canonicalUrl: `${BASE_URL}/pricing`,
    breadcrumbName: "Pricing",
    pageType: "WebPage"
  },
  "/contact": {
    title: "Contact EBM | Admissions Inquiries & Academic Consultations",
    description:
      "Get in touch with the EBM counseling team for admissions guidance, diagnostic test scheduling, academic consultations, and dedicated student support.",
    canonicalUrl: `${BASE_URL}/contact`,
    breadcrumbName: "Contact Us",
    pageType: "ContactPage"
  },
  "/privacy": {
    title: "Privacy Policy & Data Protection | EBM Learning Platform",
    description:
      "Learn how EBM safeguards student, parent, and institutional data with strict educational security protocols, transparent compliance, and privacy protections.",
    canonicalUrl: `${BASE_URL}/privacy`,
    breadcrumbName: "Privacy Policy",
    pageType: "WebPage"
  },
  "/terms": {
    title: "Terms and Conditions of Service | EBM Learning Ecosystem",
    description:
      "Review the terms of service, acceptable use policies, code of conduct, and educational service agreements governing the Ejaz Bukhari Method digital platform.",
    canonicalUrl: `${BASE_URL}/terms`,
    breadcrumbName: "Terms & Conditions",
    pageType: "WebPage"
  },
  "/login": {
    title: "Sign In to EBM Portal | Student, Parent & Teacher Access",
    description:
      "Access your personalized EBM student dashboard, parent insights feed, teacher gradebook, and coursework by logging in to your registered educational account.",
    canonicalUrl: `${BASE_URL}/login`,
    breadcrumbName: "Sign In",
    pageType: "WebPage"
  },
  "/register": {
    title: "Create an EBM Account | Student & Parent Portal Sign Up",
    description:
      "Register for the Ejaz Bukhari Method learning platform to start diagnostic skill assessments, individualized learning plans, and Cambridge exam preparation.",
    canonicalUrl: `${BASE_URL}/register`,
    breadcrumbName: "Register",
    pageType: "WebPage"
  },
  "/forgot-password": {
    title: "Reset Your EBM Password | Secure Portal Account Recovery",
    description:
      "Recover access to your EBM student, parent, or teacher portal account. Submit your registered email address to receive immediate password reset instructions.",
    canonicalUrl: `${BASE_URL}/forgot-password`,
    breadcrumbName: "Recover Password",
    pageType: "WebPage"
  },
  "/reset-password": {
    title: "Set New Secure Password | EBM Account Recovery & Security",
    description:
      "Create a new secure password for your EBM account to protect your student learning records, diagnostic assessments, and academic portfolio details.",
    canonicalUrl: `${BASE_URL}/reset-password`,
    breadcrumbName: "Set New Password",
    pageType: "WebPage"
  },
  "/verify-email": {
    title: "Verify Your Email Address | EBM Account Activation Portal",
    description:
      "Confirm and verify your registered email address to complete your EBM account setup and begin exploring your personalized learning roadmap today.",
    canonicalUrl: `${BASE_URL}/verify-email`,
    breadcrumbName: "Verify Email",
    pageType: "WebPage"
  },
  "/dashboard": {
    title: "Student Learning Dashboard | EBM Academic Mastery Portal",
    description:
      "View personalized learning roadmap milestones, daily diagnostic tasks, concept mastery progress, and cognitive speed metrics on your EBM student portal.",
    canonicalUrl: `${BASE_URL}/dashboard`,
    breadcrumbName: "Dashboard",
    pageType: "WebPage"
  },
  "/parent": {
    title: "Parent Portal & Academic Progress | EBM Learning Insights",
    description:
      "Monitor your child's real-time diagnostic performance, cognitive mastery pace, study attendance, and homework progress on the EBM parent insights portal.",
    canonicalUrl: `${BASE_URL}/parent`,
    breadcrumbName: "Parent Portal",
    pageType: "WebPage"
  },
  "/teacher": {
    title: "Teacher & Classroom Management | EBM Educator Workspace",
    description:
      "Manage student cohorts, assign diagnostic skill tests, review real-time learning metrics, and guide personalized coursework with the EBM teacher portal.",
    canonicalUrl: `${BASE_URL}/teacher`,
    breadcrumbName: "Teacher Workspace",
    pageType: "WebPage"
  },
  "/admin": {
    title: "Admin ERP & Educational Management | EBM System Portal",
    description:
      "Enterprise administration portal for managing student registrations, curriculum frameworks, institutional reporting, and system settings across EBM.",
    canonicalUrl: `${BASE_URL}/admin`,
    breadcrumbName: "Admin ERP",
    pageType: "WebPage"
  },
  "/curriculum": {
    title: "Comprehensive Curriculum Map | Grade 1 to O/A Level EBM",
    description:
      "Explore structured syllabus frameworks, core subject modules, and adaptive learning benchmarks from Grade 1 through Cambridge O/A Levels with EBM.",
    canonicalUrl: `${BASE_URL}/curriculum`,
    breadcrumbName: "Curriculum Map",
    pageType: "WebPage"
  },
  "/content": {
    title: "EBM Interactive Learning Modules & Digital Study Content",
    description:
      "Explore comprehensive study lessons, diagnostic exercise banks, and structured learning units designed for Grade 1 through Cambridge O/A Levels.",
    canonicalUrl: `${BASE_URL}/content`,
    breadcrumbName: "Study Content",
    pageType: "WebPage"
  }
};

/**
 * Generates the master Organization entity
 */
export const getOrganizationSchema = () => ({
  "@type": "EducationalOrganization",
  "@id": ORGANIZATION_ID,
  name: "Ejaz Bukhari Method",
  alternateName: "EBM",
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "EBM is a personalized learning platform for students from Grade 1 to O/A Levels, combining structured learning, skill development, personalized guidance, and AI-enhanced educational tools.",
  sameAs: [
    "https://www.facebook.com/syedejazbukhari/",
    "https://www.instagram.com/syedejaz_bukhari/"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+92-333-4541572",
      contactType: "admissions and customer support",
      email: "syedejazbukari@gmail.com",
      availableLanguage: ["English", "Urdu"]
    }
  ]
});

/**
 * Generates the master WebSite entity
 */
export const getWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Ejaz Bukhari Method",
  url: `${BASE_URL}/`,
  publisher: {
    "@id": ORGANIZATION_ID
  }
});

/**
 * Generates the complete JSON-LD graph tailored to the given route and meta overrides
 */
export function generateRouteStructuredData(
  pathname: string,
  overrides?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  }
) {
  const normalizedPath = pathname === "" ? "/" : pathname.toLowerCase().replace(/\/$/, "") || "/";
  const routeConfig = ROUTE_REGISTRY[normalizedPath] || {
    title: overrides?.title || "EBM Personalized Learning Platform | Grade 1 to O/A Level",
    description: overrides?.description || "Personalized learning platform for students from Grade 1 to O/A Levels, featuring structured curricula, diagnostic assessments, and AI-powered tutoring.",
    canonicalUrl: overrides?.canonicalUrl || (normalizedPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`),
    breadcrumbName: normalizedPath.replace(/^\//, "").replace(/-/g, " ") || "Home",
    pageType: "WebPage"
  };

  const currentTitle = sanitizeMetaTitle(overrides?.title || routeConfig.title);
  const currentDesc = sanitizeMetaDescription(overrides?.description || routeConfig.description);
  const currentCanonical = overrides?.canonicalUrl || routeConfig.canonicalUrl;
  const isHome = normalizedPath === "/";

  const webpageId = `${currentCanonical}#webpage`;
  const breadcrumbId = `${currentCanonical}#breadcrumb`;

  // 1. WebPage entity
  const webPageEntity: Record<string, any> = {
    "@type": routeConfig.pageType,
    "@id": webpageId,
    url: currentCanonical,
    name: currentTitle,
    description: currentDesc,
    isPartOf: {
      "@id": WEBSITE_ID
    },
    about: {
      "@id": ORGANIZATION_ID
    }
  };

  if (!isHome) {
    webPageEntity.breadcrumb = {
      "@id": breadcrumbId
    };
  }

  // 2. Build graph array
  const graph: any[] = [];

  if (isHome) {
    // Homepage includes full definitions of Organization, WebSite, and WebPage
    graph.push(getOrganizationSchema());
    graph.push(getWebSiteSchema());
    graph.push(webPageEntity);
  } else {
    // Secondary pages include the WebPage and BreadcrumbList, referencing Organization & WebSite by ID
    graph.push(webPageEntity);

    // BreadcrumbList
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${BASE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": routeConfig.breadcrumbName,
          "item": currentCanonical
        }
      ]
    });

    // On /assessment, include FAQPage in the graph matching the 8 verbatim visible Q&As
    if (normalizedPath === "/assessment") {
      graph.push({
        "@type": "FAQPage",
        "@id": `${currentCanonical}#faq`,
        isPartOf: {
          "@id": webpageId
        },
        mainEntity: ASSESSMENT_VISIBLE_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

/**
 * Generates valid Schema.org JSON-LD graph specifically for an individual BlogPosting article
 */
export function generateBlogPostStructuredData(post: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  categoryName?: string;
  categorySlug?: string;
  authorName?: string;
  authorRole?: string;
  authorSlug?: string;
  publishedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  readingTime?: number;
  tags?: string[];
  canonicalUrl?: string;
}) {
  const postUrl = post.canonicalUrl || `${BASE_URL}/blog/${post.slug}`;
  const webpageId = `${postUrl}#webpage`;
  const articleId = `${postUrl}#article`;
  const breadcrumbId = `${postUrl}#breadcrumb`;

  const datePub = post.publishedAt || post.createdAt || new Date().toISOString();
  const dateMod = post.updatedAt || post.publishedAt || post.createdAt || new Date().toISOString();
  const safeTags = parseTags(post.tags);
  const sanitizedTitle = sanitizeMetaTitle(`${post.title} | EBM Blog`);
  const sanitizedDesc = sanitizeMetaDescription(post.excerpt || "Educational article from the Ejaz Bukhari Method.");

  const graph: any[] = [
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: postUrl,
      name: sanitizedTitle,
      description: sanitizedDesc,
      isPartOf: {
        "@id": WEBSITE_ID
      },
      breadcrumb: {
        "@id": breadcrumbId
      },
      mainEntity: {
        "@id": articleId
      }
    },
    {
      "@type": "BlogPosting",
      "@id": articleId,
      isPartOf: {
        "@id": webpageId
      },
      headline: post.title,
      description: sanitizedDesc,
      mainEntityOfPage: postUrl,
      url: postUrl,
      datePublished: datePub,
      dateModified: dateMod,
      articleSection: post.categoryName || "Education",
      timeRequired: post.readingTime ? `PT${post.readingTime}M` : "PT5M",
      ...(post.featuredImage ? { image: [post.featuredImage] } : {}),
      ...(safeTags.length > 0 ? { keywords: safeTags.join(", ") } : {}),
      author: {
        "@type": "Person",
        name: post.authorName || "Syed Ejaz Bukhari",
        jobTitle: post.authorRole || "Founder & Director of Pedagogy",
        url: post.authorSlug ? `${BASE_URL}/blog/author/${post.authorSlug}` : `${BASE_URL}/about`
      },
      publisher: {
        "@id": ORGANIZATION_ID
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${BASE_URL}/blog`
        },
        ...(post.categoryName && post.categorySlug
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: post.categoryName,
                item: `${BASE_URL}/blog/category/${post.categorySlug}`
              },
              {
                "@type": "ListItem",
                position: 4,
                name: post.title,
                item: postUrl
              }
            ]
          : [
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: postUrl
              }
            ])
      ]
    }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

/**
 * Generates valid Schema.org JSON-LD graph specifically for a Blog Category page
 */
export function generateBlogCategoryStructuredData(category: {
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}) {
  const catUrl = `${BASE_URL}/blog/category/${category.slug}`;
  const webpageId = `${catUrl}#webpage`;
  const breadcrumbId = `${catUrl}#breadcrumb`;
  const sanitizedTitle = sanitizeMetaTitle(`${category.name} Articles & Guides | EBM Education`);
  const sanitizedDesc = sanitizeMetaDescription(category.description || `Read research-backed educational perspectives and strategies in ${category.name} from the Ejaz Bukhari Method.`);

  const graph: any[] = [
    {
      "@type": "CollectionPage",
      "@id": webpageId,
      url: catUrl,
      name: sanitizedTitle,
      description: sanitizedDesc,
      isPartOf: {
        "@id": WEBSITE_ID
      },
      breadcrumb: {
        "@id": breadcrumbId
      },
      about: {
        "@id": ORGANIZATION_ID
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${BASE_URL}/blog`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: catUrl
        }
      ]
    }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
