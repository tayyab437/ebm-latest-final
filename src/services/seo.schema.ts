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
 * Site-wide master registry of public routes
 */
export const ROUTE_REGISTRY: Record<string, RouteMetaConfig> = {
  "/": {
    title: "EBM | Personalized Learning Platform for Grade 1 to O/A Levels",
    description:
      "EBM is a personalized learning platform for students from Grade 1 to O/A Levels, combining structured learning, skill development, personalized guidance, and AI-enhanced educational tools.",
    canonicalUrl: `${BASE_URL}/`,
    breadcrumbName: "Home",
    pageType: "WebPage"
  },
  "/about": {
    title: "About EBM | Mission, Pedagogy & Methodology",
    description:
      "Learn about the Ejaz Bukhari Method (EBM) — empowering students with deep foundational mastery, cognitive speed, and conceptual learning.",
    canonicalUrl: `${BASE_URL}/about`,
    breadcrumbName: "About Us",
    pageType: "AboutPage"
  },
  "/assessment": {
    title: "EBM Diagnostic Assessment | Adaptive Learning & Skill Evaluation",
    description:
      "Discover EBM Diagnostic Assessment, an adaptive learning and skill evaluation solution that helps educators identify student strengths, learning needs, and personalized next steps.",
    canonicalUrl: `${BASE_URL}/assessment`,
    breadcrumbName: "Assessment",
    pageType: "WebPage"
  },
  "/analytics": {
    title: "EBM Learning Analytics: Turn Student Data Into Action",
    description:
      "Actionable analytics that uncover student learning curves, mastery tracking, and skill progression with EBM's reporting dashboard.",
    canonicalUrl: `${BASE_URL}/analytics`,
    breadcrumbName: "Analytics",
    pageType: "WebPage"
  },
  "/programs": {
    title: "EBM Academic Programs | Grade 1 to O/A Level Curriculum",
    description:
      "Explore the comprehensive EBM learning paths from primary grades through O/A Levels, covering mathematics, critical comprehension, and diagnostic milestones.",
    canonicalUrl: `${BASE_URL}/programs`,
    breadcrumbName: "Programs",
    pageType: "WebPage"
  },
  "/learning": {
    title: "EBM Learning Portal | Courses, Curriculum & Practice",
    description:
      "Access EBM learning modules, interactive lessons, syllabus plans, and diagnostic practice tools across grade levels.",
    canonicalUrl: `${BASE_URL}/learning`,
    breadcrumbName: "Learning",
    pageType: "WebPage"
  },
  "/inspiration": {
    title: "EBM Inspiration & Resources | Toolkits for Educators & Parents",
    description:
      "Explore curated teaching strategies, downloadable toolkits, printable resources, and classroom implementation guides from the EBM ecosystem.",
    canonicalUrl: `${BASE_URL}/inspiration`,
    breadcrumbName: "Inspiration",
    pageType: "CollectionPage"
  },
  "/case-studies": {
    title: "EBM Case Studies & School Success Stories",
    description:
      "Discover how schools and districts achieve measurable academic growth, test score gains, and classroom efficiency with EBM.",
    canonicalUrl: `${BASE_URL}/case-studies`,
    breadcrumbName: "Case Studies",
    pageType: "CollectionPage"
  },
  "/casestudies": {
    title: "EBM Case Studies & School Success Stories",
    description:
      "Discover how schools and districts achieve measurable academic growth, test score gains, and classroom efficiency with EBM.",
    canonicalUrl: `${BASE_URL}/case-studies`,
    breadcrumbName: "Case Studies",
    pageType: "CollectionPage"
  },
  "/blog": {
    title: "EBM Blog | Educational Perspectives, Mathematics & Learning Insights",
    description:
      "Explore research-backed educational perspectives, mathematical problem-solving strategies, and personalized learning insights from the Ejaz Bukhari Method.",
    canonicalUrl: `${BASE_URL}/blog`,
    breadcrumbName: "Blog",
    pageType: "CollectionPage"
  },
  "/pricing": {
    title: "EBM Pricing & Memberships | Flexible Learning Plans",
    description:
      "Choose the right EBM plan for your learning journey. Transparent pricing for individual students, families, and academic institutions.",
    canonicalUrl: `${BASE_URL}/pricing`,
    breadcrumbName: "Pricing",
    pageType: "WebPage"
  },
  "/contact": {
    title: "Contact EBM | Admissions, Consultations & Support",
    description:
      "Get in touch with the EBM team for admissions inquiries, diagnostic scheduling, academic consultations, and technical support.",
    canonicalUrl: `${BASE_URL}/contact`,
    breadcrumbName: "Contact Us",
    pageType: "ContactPage"
  },
  "/privacy": {
    title: "Privacy Policy | EBM Digital Learning Platform",
    description:
      "Review how EBM handles and safeguards student, parent, and institutional data with strict educational privacy protocols.",
    canonicalUrl: `${BASE_URL}/privacy`,
    breadcrumbName: "Privacy Policy",
    pageType: "WebPage"
  },
  "/terms": {
    title: "Terms and Conditions | EBM Digital Learning Platform",
    description:
      "Review the terms of service, acceptable use policies, and user agreements for the EBM platform.",
    canonicalUrl: `${BASE_URL}/terms`,
    breadcrumbName: "Terms & Conditions",
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
    title: overrides?.title || "EBM | Personalized Learning Platform for Grade 1 to O/A Levels",
    description: overrides?.description || "EBM is a personalized learning platform for students from Grade 1 to O/A Levels.",
    canonicalUrl: overrides?.canonicalUrl || (normalizedPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`),
    breadcrumbName: normalizedPath.replace(/^\//, "").replace(/-/g, " ") || "Home",
    pageType: "WebPage"
  };

  const currentTitle = overrides?.title || routeConfig.title;
  const currentDesc = overrides?.description || routeConfig.description;
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

  const graph: any[] = [
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: postUrl,
      name: `${post.title} | EBM Blog`,
      description: post.excerpt || "Educational article from the Ejaz Bukhari Method.",
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
      description: post.excerpt,
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

  const graph: any[] = [
    {
      "@type": "CollectionPage",
      "@id": webpageId,
      url: catUrl,
      name: `${category.name} Articles | EBM Blog`,
      description: category.description || `Explore articles on ${category.name} from the Ejaz Bukhari Method.`,
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
