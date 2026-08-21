import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "EBM Diagnostic & Digital Learning Platform | Ejaz Bukhari Method",
  description = "EBM Diagnostic creates one connected evidence base for Mathematics and English Comprehension from Grade 1 to O/A Levels. Accelerated academic success powered by the Ejaz Bukhari Method.",
  keywords = "EBM, Ejaz Bukhari Method, EBM Diagnostic, Mathematics, English Comprehension, Cambridge O Levels, A Levels, Accelerated Learning, Assessment, Analytics",
  canonicalUrl,
  ogType = "website",
}) => {
  const location = useLocation();
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://ejazbukharimethod.com";
  const fullCanonical = canonicalUrl || `${currentOrigin}${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or create meta tags
    const setMetaTag = (nameAttr: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper to set or create link tags
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        document.head.appendChild(element);
      }
      element.setAttribute("href", hrefValue);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow");

    // 3. OpenGraph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:site_name", "Ejaz Bukhari Method (EBM)");

    // 4. Canonical Link
    setLinkTag("canonical", fullCanonical);

    // 5. Schema.org Structured Data
    let schemaScript = document.getElementById("ebm-structured-data") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "ebm-structured-data";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Ejaz Bukhari Method (EBM)",
      url: fullCanonical,
      logo: `${currentOrigin}/favicon.ico`,
      description: description,
      sameAs: [
        "https://facebook.com",
        "https://twitter.com",
        "https://linkedin.com"
      ]
    };

    schemaScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, fullCanonical, ogType, location.pathname]);

  return null;
};
